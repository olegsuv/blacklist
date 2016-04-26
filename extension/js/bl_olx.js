// alert('blacklist init');

function Panel() {
    'use strict';

    this.panel = $('<div class="blacklistPanel"></div>');
    this.phoneBlock = $('.link-phone.big');
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
    this.updatePanel = function (xml, css, status) {
        this.answers.push({
            xml: xml || {},
            css: css || {},
            status: status || ''
        });
        xml = xml || this.phoneBlock.find('strong').text();
        css = css || this.defaultCSS;

        if (status == "success") {
            var showText;
            if (xml.items.length) {
                css.color = 'red';
                showText = 'Найдена информация в базе: ' + xml.items.join('; ');
                showText = 'Найдена информация в базе: ' + xml.items.join('; ');
            } else {
                css.color = 'green';
                showText = 'Телефона и адреса в базе блеклиста нет, можно звонить'
            }
        }
        if (status == "error") {
            css.color = 'red';
            showText = 'Ошибка скрипта';
        }
        this.panel.css(css).html(showText);
    };
    this.init = function () {
        this.panel.appendTo('body');
    };
    this.sendData = function () {
        var transferData = {
            phone: this.phoneBlock.find('strong').text(),
            url: location.href
        };
        var me = this;
        $.ajax({
            crossOrigin: true,
            type: "GET",
            url: "http://stlist.vergo.space/api/v1/estate/advertisement/search/phone.json",
            data: transferData,
            dataType: "json",
            success: function (xml) {
                me.updatePanel(xml, undefined, 'success');
            },
            error: function (xml) {
                me.updatePanel(xml, undefined, 'error');
            }
        });
    };
    this.answers = [];
    //run
    if (this.phoneBlock.size()) {
        this.init();
        this.phoneBlock.find('.spoiler').click();
    }

    var me = this;
    $('body').bind('adPageShowContact', function () {
        me.sendData();
    });
}

window.blacklist = new Panel();
