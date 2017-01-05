function Panel() {
    'use strict';

    var self = this;

    this.init = function () {
        this.panel.appendTo('body');
        this.updatePanel('Panel started');
        this.getData();
    };

    this.panel = $('<div class="blacklistPanel"></div>');
    this.phoneBlock = $('.link-phone');
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
    this.addToBlacklist = $('<input type="button" value="Добавить в базу" class="addToBlacklist">');
    $(document).on('click', '.addToBlacklist', function () {
        var comment = prompt('Введите комментарий');
        if (!comment) {
            alert('Вы не ввели комментарий, добавления в базу не будет');
        }
        else {
            self.setData(comment);
        }
    });

    this.updatePanel = function (showText, css) {
        css = css || this.defaultCSS;
        this.panel.css(css).html(showText);
    };

    this.processData = function (json, status, methodName) {
        var css = this.defaultCSS;
        if (status == "success" && json.success == true) {
            var showText;
            if (methodName == 'getData') {
                if (json.items.length) {
                    css.color = 'red';
                    showText = 'Найдена информация в базе: ';
                    for (var i = 0; i < json.items.length; i++) {
                        var item = json.items[i];
                        showText += '<br>' + item.phones.join('; ') + '. Комментарий: ' + item.comment;
                    }
                } else {
                    css.color = 'green';
                    showText = $('<div/>').html('Телефона и адреса в базе блеклиста нет, можно звонить\t').append(this.addToBlacklist);
                }
            } else {
                css.color = 'green';
                showText = 'Телефон добавлен в базу, спасибо'
            }
        } else {
            css.color = 'red';
            showText = 'Ошибка скрипта';
        }
        this.updatePanel(showText, css);
    };

    this.getData = function () {
        var $phones = this.phoneBlock.find('strong span');
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
            type: "GET",
            url: "http://stlist.vergo.space/api/v1/estate/advertisement/search.json",
            data: transferData,
            dataType: "json",
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
            type: "POST",
            url: "http://stlist.vergo.space/api/v1/estate/advertisement/add.json",
            data: transferData,
            dataType: "json",
            success: function (json) {
                self.processData(json, 'success', 'setData');
            },
            error: function (json) {
                self.processData(json,  'error', 'setData');
            }
        });
    };

    if (this.phoneBlock.size()) {
        this.init();
        this.phoneBlock.find('.spoiler').click();
    }

    $('body').bind('adPageShowContact', function () {
        self.getData();
    });
}

window.blacklist = new Panel();
window.blacklist.init();