/**
 * Created by Oleg on 14.02.2017.
 */

function getData(phones) {
    $.ajax({
        crossOrigin: true,
        type: 'get',
        url: config.host + config.search,
        data: {
            phones: phones
        },
        dataType: 'json',
        success: function (receivedData) {
            processData(receivedData);
        },
        error: function (json) {
            console.log('error', json);
        }
    });
}

function processData(receivedData) {
    data = receivedData;
    if (receivedData.items.length) {
        data.message = 'Found ' + receivedData.items.length + ' issues';
        data.status = 'danger';
    } else {
        data.message = 'No reports yet';
        data.status = 'success';
    }
    renderData(data);
}

function renderData(data) {
    $("#result").html($.templates("#panelView").render(data));
}

const config = {
    host: 'https://blacklist.gooffline.org.ua',
    add: '/api/v1/estate/advertisement/add.json',
    phones: '/api/v1/estate/advertisement/phones.json',
    search: '/api/v1/estate/advertisement/search.json',
    siteEvent: 'adPageShowContact'
};

var data = {
    "message": "Pending data",
    "status": "info"
}, phones = [];

/*function getTransferData(comment) {
    return {
        phones: phones,
        url: location.pathname,
        comment: comment || null
    };
}

var setData = function (comment) {
    $.ajax({
        crossOrigin: true,
        type: 'post',
        url: config.host + config.add,
        data: getTransferData(),
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
});*/

// Once the DOM is ready...
window.addEventListener('DOMContentLoaded', function () {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {}, getData);
    });
});

// Lets run render by default
renderData(data);