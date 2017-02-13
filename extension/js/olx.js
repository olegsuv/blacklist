function Panel() {
    'use strict';

    var self = this;

    this.config = {
        host: 'https://blacklist.gooffline.org.ua',
        add: '/api/v1/estate/advertisement/add.json',
        phones: '/api/v1/estate/advertisement/phones.json',
        search: '/api/v1/estate/advertisement/search.json',
        siteEvent: 'adPageShowContact'
    };

    this.selectors = {
        phoneBlock: '.contact-button.link-phone',
        getPhone: '.spoiler',
        message: '.message',
        addToBlacklist: '.addToBlacklist'
    };

    this.labels = {
        notFound: 'Телефона и адреса в базе блеклиста нет, можно звонить',
        found: 'Найдена информация в базе: ',
        adding: 'Добавляется...',
        added: 'Телефон добавлен в базу, спасибо',
        error: 'Ошибка скрипта',
        enterComment: 'Введите комментарий',
        emptyComment: 'Вы не ввели комментарий, добавления в базу не будет'
    };

    this.updatePanel = function (text) {
        $(this.selectors.message).html(text);
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
            $(this.selectors.addToBlacklist).hide();
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
        this.panel.find(this.selectors.addToBlacklist).attr('disabled', true).val(this.labels.adding);
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

    this.init = function () {
        this.panel = $('<div class="blacklistPanel"><div class="message"></div><input type="button" value="Добавить в базу" class="addToBlacklist"></div>');
        this.defaultCSS = {
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            lineHeight: '40px',
            background: 'white',
            color: 'black',
            borderTop: '1px solid #ccc',
            zIndex: 10000
        };
        this.panel.css(this.defaultCSS).appendTo('body');
        this.phoneBlock = $(this.selectors.phoneBlock);
        this.phoneBlock.find(this.selectors.getPhone).click();
    };

    this.init();
}

window.blacklist = new Panel();

$(document).on('click', window.blacklist.selectors.addToBlacklist, function () {
    window.blacklist.addToBlacklist();
});

$('body').bind(window.blacklist.config.siteEvent, function () {
    window.blacklist.getData();
});
