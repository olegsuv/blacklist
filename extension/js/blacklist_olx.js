// alert('blacklist init');

function Panel() {
    'use strict';

    this.panel = $('<div class="blacklistPanel"></div>');
    this.phoneBlock = $('.link-phone.big');
    this.updatePanel = function() {
        this.panel.css({
                position: 'fixed',
                bottom: 0,
                left: 0,
                width: '100%',
                lineHeight: '40px',
                background: 'white',
                borderTop: '1px solid #ccc',
                zIndex: 1000000
            })
            .html(this.phoneBlock.find('strong').text());
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
        alert(transferData.phone + '\n' + transferData.url);
        $.ajax({
            crossOrigin: true,
            type: "GET",
            url: "http://10.211.2.219:8080/SampleWebService/sample.do",
            data: transferData,
            dataType: "jsonp",
            jsonp: "getBlacklist",
            success: function (xml) {
                alert('success: ' + xml);
            },
            error: function (xml) {
                alert('error: ' + xml);
            }
        });
    };
    //run
    if (this.phoneBlock.size()) {
        this.init();
        //this.phoneBlock.find('.spoiler').click();
    }

    var me = this;
    $('body').bind('adPageShowContact', function(){
        me.updatePanel();
        me.sendData();
    });
}

window.blacklist = new Panel();

window.getBlacklist = function (data) {
    alert('getBlacklist: ' + data);
};