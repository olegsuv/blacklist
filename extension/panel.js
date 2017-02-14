/**
 * Created by Oleg on 14.02.2017.
 */

// Update the relevant fields with the new data
function updateData(newData) {
    data = newData;
    renderData();
}

// Once the DOM is ready...
window.addEventListener('DOMContentLoaded', function () {
    // ...query for the active tab...
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        // ...and send a request for the DOM info...
        chrome.tabs.sendMessage(
            tabs[0].id,
            {from: 'popup', subject: 'DOMInfo'},
            // ...also specifying a callback to be called
            //    from the receiving end (content script)
            updateData);
    });
});

var data = {
    "message": "Hello world",
    "status": "info",
    "items": [{
        "comment": "1",
        "url": "\/obyavlenie\/bez-predoplaty-smartfon-bluboo-maya-god-garantii-IDnWPuA.html",
        "phones": ["380504641717"]
    }],
    "success": true
};

function renderData() {
    $("#result").html($.templates("#panelView").render(data));
}

var getTransferData = function (comment) {
    var $phones = this.phoneBlock.find('strong span'), phones = [];
    for (var i = 0; i < $phones.length; i++) {
        phones.push($($phones).eq(i).text().replace(/\s/ig, ''));
    }
    return {
        phones: phones,
        url: location.pathname,
        comment: comment || null
    };
};

var setData = function (comment) {
    this.panel.find(this.selectors.addToBlacklist).attr('disabled', true).val(this.labels.adding);
    var sendingData = getTransferData(comment);
    $.ajax({
        crossOrigin: true,
        type: 'post',
        url: this.config.host + this.config.add,
        data: sendingData,
        dataType: 'json',
        success: function (json) {
            data.status = "success";
            data.items.push(sendingData);
            renderData();
        },
        error: function (json) {
            self.renderError(json, 'setData');
        }
    });
};

$('.js-add').click(function (element) {
    element.currentTarget.prop('disabled', true);
    chrome.tabs.getSelected(null, function (tab) {
        chrome.tabs.sendRequest(tab.id, {method: 'getPhone'}, function (response) {
            alert(response.data);
        });
    });
    // setData();
});

renderData();