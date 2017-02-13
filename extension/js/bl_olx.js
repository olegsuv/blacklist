function Panel() {
    'use strict';

    var self = this;

    this.init = function () {
        this.phoneBlock = $();
        this.phoneBlock.find('.spoiler').click();
        alert('init');
    };

    this.config = {
        phoneBlockSelector: '.contact-button.link-phone',
        host: 'https://blacklist.gooffline.org.ua',
        add: '/api/v1/estate/advertisement/add.json',
        phones: '/api/v1/estate/advertisement/phones.json',
        search: '/api/v1/estate/advertisement/search.json'
    };

    this.labels = {
        notFound: 'Телефона и адреса в базе блеклиста нет, можно звонить',
        found: 'Найдена информация в базе: ',
        added: 'Телефон добавлен в базу, спасибо',
        error: 'Ошибка скрипта',
        enterComment: 'Введите комментарий',
        emptyComment: 'Вы не ввели комментарий, добавления в базу не будет'
    };

    this.updatePanel = function (text) {
        console.log('updatePanel', text);
        $('.message').html(text);
    };

    this.renderError = function (json) {
        this.updatePanel(this.labels.error + json);
    };

    this.renderData = function (json, methodName) {
        var text;

        if (methodName === 'getData') {
            if (json.items.length) {
                text = this.labels.found;
                for (var i = 0; i < json.items.length; i++) {
                    var item = json.items[i];
                    text += '<br>' + item.phones.join('; ') + '. Комментарий: ' + item.comment;
                }
            } else {
                text = this.labels.notFound;
            }
        }

        if (methodName === 'setData')  {
            text = this.labels.added;
            $('.addToBlacklist').hide();
        }

        this.updatePanel(text);
    };

    this.getTransferData = function (comment) {
        var $phones = this.phoneBlock.find('strong'), phones = [];
        for (var i = 0; i < $phones.length; i++) {
            phones.push($($phones).eq(i).text().replace(/\s/ig, ''));
        }
        return {
            phones: phones,
            url: location.pathname,
            comment: comment || null
        };
    };

    this.getData = function () {
        $.ajax({
            crossOrigin: true,
            type: 'get',
            url: this.config.host + this.config.search,
            data: this.getTransferData(),
            dataType: 'json',
            success: function (json) {
                self.renderData(json, 'getData');
            },
            error: function (json) {
                self.renderError(json, 'getData');
            }
        });
    };

    this.setData = function (comment) {
        $('.addToBlacklist').attr('disabled', true).val('Добавляется...');
        $.ajax({
            crossOrigin: true,
            type: 'post',
            url: this.config.host + this.config.add,
            data: this.getTransferData(comment),
            dataType: 'json',
            success: function (json) {
                self.renderData(json, 'setData');
            },
            error: function (json) {
                self.renderError(json, 'setData');
            }
        });
    };

    //TODO replace to html form
    this.addToBlacklist = function () {
        var comment = prompt(this.labels.enterComment);
        if (comment) {
            this.setData(comment);
        }
        else {
            alert(this.labels.emptyComment);
        }
    };

    this.init();
}

window.blacklist = new Panel();

$(document).on('click', '.addToBlacklist', function () {
    window.blacklist.addToBlacklist();
});

$('body').bind('adPageShowContact', function () {
    window.blacklist.getData();
});
