// alert('blacklist init');

function Panel() {
    'use strict';

    this.panel = $('<div class="blacklistPanel"></div>');
    this.phoneBlock = $('.link-phone.big');
    this.updatePanel = function(xml, css) {
        if (!xml) {
            xml = this.phoneBlock.find('strong').text();
        }
        if (!css) {
            css = {
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
        }
        if (xml.statusText == "error") {
            css.color = 'red';
        }
        if (xml.statusText == "success") {
            css.color = 'green';
        }
        window.panelCheck = {
            xml: xml,
            css: css
        };
        console.log(xml, css);
        this.panel.css(css).html(xml.responseText || 'error');
    };
    this.init = function () {
        this.panel.appendTo('body');
        this.updatePanel();
    };
    this.sendData = function () {
        var transferData = {
            phone: this.phoneBlock.find('strong').text(),
            url: location.href
        };
        // alert(transferData.phone + '\n' + transferData.url);
        var me = this;
        $.ajax({
            crossOrigin: true,
            type: "GET",
            url: "http://stlist.vergo.space/api/v1/estate/advertisement/search/phone.json",
            data: transferData,
            dataType: "json",
            success: function (xml) {
                me.updatePanel(xml);
            },
            error: function (xml) {
                me.updatePanel(xml);
            }
        });
    };
    //run
    if (this.phoneBlock.size()) {
        this.init();
        this.phoneBlock.find('.spoiler').click();
    }

    var me = this;
    $('body').bind('adPageShowContact', function(){
        me.updatePanel();
        me.sendData();
    });
}

window.blacklist = new Panel();
