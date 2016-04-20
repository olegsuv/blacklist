// alert('blacklist init');

function Panel() {
    'use strict';

    this.panel = $('<div class="blacklistPanel"></div>');
    this.phoneBlock = $('.link-phone.big');
    this.updatePanel = function(text, css) {
        if (!text) {
            text = this.phoneBlock.find('strong').text();
        }
        if (!css) {
            css = {
                position: 'fixed',
                bottom: 0,
                left: 0,
                width: '100%',
                lineHeight: '40px',
                background: 'white',
                borderTop: '1px solid #ccc',
                zIndex: 1000000
            };
        }
        this.panel.css(css).html(text);
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
                console.log('success: ' + xml);
                me.updatePanel('success: ' + xml);
            },
            error: function (xml) {
                console.log('error: ' + xml);
                me.updatePanel('error: ' + xml);
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
