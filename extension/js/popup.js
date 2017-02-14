/**
 * Created by Oleg on 14.02.2017.
 */

function getTransferData(comment) {
    var dataObject = {
        phones: data.phones,
        url: data.url
    };
    if (comment) {
        dataObject.comment = comment;
    }
    return dataObject;
}

function setData(comment) {
    $.ajax({
        crossOrigin: true,
        type: 'post',
        url: config.host + config.add,
        data: getTransferData(comment),
        dataType: 'json',
        success: function (json) {
            self.renderData(json, 'setData');
        },
        error: function (json) {
            self.renderError(json, 'setData');
        }
    });
}

function getData(dataObject) {
    data.phones = dataObject.phones;
    data.url = dataObject.url;

    $.ajax({
        crossOrigin: true,
        type: 'get',
        url: config.host + config.search,
        data: getTransferData(),
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
    data.content = receivedData;
    if (receivedData.items.length) {
        data.message = labels.found + receivedData.items.length;
        data.status = 'danger';
    } else {
        data.message = labels.notFound;
        data.status = 'success';
    }
    renderData(data);
}

function renderData(data) {
    $("#result").html($.templates("#panelView").render(data));
}

const labels = {
    notFound: 'Жалобы не найдены, можно звонить',
    found: 'Найдены жалобы: ',
    adding: 'Добавляется...',
    added: 'Телефон добавлен в базу, спасибо',
    error: 'Ошибка скрипта',
    enterComment: 'Введите комментарий',
    emptyComment: 'Вы не ввели комментарий, добавления в базу не будет',
    pending: 'Загрузка данных...',
    placeholder: 'Введите текст жалобы',
    clickToAction: 'Пожаловаться'
};

const config = {
    host: 'https://blacklist.gooffline.org.ua',
    add: '/api/v1/estate/advertisement/add.json',
    phones: '/api/v1/estate/advertisement/phones.json',
    search: '/api/v1/estate/advertisement/search.json',
    siteEvent: 'adPageShowContact'
};

var data = {
    message: labels.pending,
    status: 'info',
    placeholder: labels.placeholder,
    clickToAction: labels.clickToAction,
    content: {},
    phones: [],
    url: ''
};

$('.js-claim-button').click(function (element) {
    element.currentTarget.prop('disabled', true);
    var comment = $('.js-claim-text').val();
    if (comment) {
        setData(comment);
    }
    else {
        alert(labels.emptyComment);
    }
});

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