function Panel() {
    'use strict';

    var self = this;

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

    this.processData = function (json, status, methodName) {
        var showText;
        var css = this.defaultCSS;
        if (status == 'success' && json.success == true) {
            this.renderData(json, status, methodName);
        } else {
            css.color = 'red';
            showText = this.labels.error;
        }
        this.updatePanel(showText, css);
    };

    this.renderData = function (json, status, methodName) {
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
        } else {
            css.color = 'green';
            showText = this.labels.added;
        }
        this.updatePanel(showText, css);
    };

    this.getData = function () {
        var $phones = this.phoneBlock.find('strong');
        var phones = [];
        for (var i = 0; i < $phones.length; i++) {
            phones.push($($phones).eq(i).text().replace(/\s/ig, ''));
        }
        var transferData = {
            phones: phones,
            url: location.href
        };
        $.ajax({
            crossOrigin: true,
            type: 'get',
            url: this.config.host + this.config.search,
            data: transferData,
            dataType: 'json',
            success: function (json) {
                self.processData(json, 'success', 'getData');
            },
            error: function (json) {
                self.processData(json, 'error', 'getData');
            }
        });
    };

    this.setData = function (comment) {
        var transferData = {
            phones: this.phoneBlock.find('strong').text().replace(/\s/ig, '').split('\n'),
            url: location.href,
            comment: comment || ''
        };
        $.ajax({
            crossOrigin: true,
            type: 'post',
            url: this.config.host + this.config.add,
            data: transferData,
            dataType: 'json',
            success: function (json) {
                self.processData(json, 'success', 'setData');
            },
            error: function (json) {
                self.processData(json,  'error', 'setData');
            }
        });
    };

    this.addToBlacklist = function () {
        var comment = prompt(this.labels.enterComment);
        if (!comment) {
            alert(this.labels.emptyComment);
        }
        else {
            this.setData(comment);
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
