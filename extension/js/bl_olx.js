function Panel() {
    'use strict';

    var self = this;

    //TODO move to template
    this.panel = $('<div class="blacklistPanel"><div class="message"></div><input type="button" value="Добавить в базу" class="addToBlacklist"></div>');

    //TODO move to styles
    this.defaultCSS = {
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        lineHeight: '40px',
        background: 'white',
        color: 'black',
        borderTop: '1px solid #ccc',
        zIndex: 1000000
    };

    this.config = {
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

    this.updatePanel = function (showText, css) {
        css = css || this.defaultCSS;
        this.panel.css(css);
        this.panel.find('.message').html(showText);
    };

    this.renderError = function (json) {
        var css = this.defaultCSS;
        css.color = 'red';
        var showText = this.labels.error + json;
        this.updatePanel(showText, css);
    };

    this.renderData = function (json, methodName) {
        var showText;
        var css = this.defaultCSS;

        if (methodName == 'getData') {
            if (json.items.length) {
                css.color = 'red';
                showText = this.labels.found;
                for (var i = 0; i < json.items.length; i++) {
                    var item = json.items[i];
                    showText += '<br>' + item.phones.join('; ') + '. Комментарий: ' + item.comment;
                }
            } else {
                css.color = 'green';
                showText = this.labels.notFound;
            }
        }

        if (methodName == 'setData')  {
            css.color = 'green';
            showText = this.labels.added;
            this.panel.find('.addToBlacklist').hide();
        }

        this.updatePanel(showText, css);
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
        this.panel.find('.addToBlacklist').attr('disabled', true).val('Добавляется...');
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
        this.panel.css(this.defaultCSS).appendTo('body');
        this.phoneBlock = $('.contact-button.link-phone');
        this.phoneBlock.find('.spoiler').click();
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
