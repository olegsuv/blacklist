/**
 * Created by Oleg on 14.02.2017.
 */

function sendMessage(message, options, responseCallback) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message, options || {}, responseCallback || null);
    });
}

function setCurrentIcon() {
    if (data.content.items.length) {
        chrome.browserAction.setIcon({path: icons.error});
    } else {
        chrome.browserAction.setIcon({path: icons.checked});
    }

    if (!data || !data.phones) {
        chrome.browserAction.setIcon({path: icons.warning});
    }
}

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
            console.log('success', json);
            data.content.items.push(getTransferData(comment));
            $(selectors.addButton).prop('disabled', false).val('');
            renderData(data);
        },
        error: function (json) {
            console.log('error', json);
        }
    });
}

function getData(dataObject) {
    if (dataObject && dataObject.phones) {
        data.phones = dataObject.phones;
        data.url = dataObject.url;
    } else {
        return false;
    }

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
            setCurrentIcon();
        }
    });
}

function processData(receivedData) {
    data.content = receivedData;
    if (receivedData.items.length) {
        data.message = labels.found + receivedData.items.length;
        data.status = 'danger';
    } else {
        data.message = labels.notFound + data.phones.join(', ');
        data.status = 'success';
    }
    setCurrentIcon();
    renderData(data);
}

function renderData(data) {
    $(selectors.renderElement).html($.templates(selectors.templateId).render(data));
}

const icons = {
    error: 'images/ic_error_black_24dp_1x.png',
    checked: 'images/ic_check_black_24dp_1x.png',
    warning: 'images/ic_warning_black_24dp_1x.png'
};

const labels = {
    notFound: 'Жалоб еще не было, можно звонить: ',
    found: 'Найдены жалобы: ',
    adding: 'Добавляется...',
    added: 'Телефон добавлен в базу, спасибо',
    error: 'Ошибка скрипта',
    enterComment: 'Введите комментарий',
    emptyComment: 'Вы не ввели комментарий, добавления в базу не будет',
    pending: 'Загрузка данных...',
    placeholder: 'Введите текст жалобы',
    clickToAction: 'Пожаловаться',
    noPhones: 'Телефонные номера не загружены'
};

const config = {
    host: 'https://blacklist.gooffline.org.ua',
    add: '/api/v1/estate/advertisement/add.json',
    phones: '/api/v1/estate/advertisement/phones.json',
    search: '/api/v1/estate/advertisement/search.json',
    siteEvent: 'adPageShowContact'
};

const selectors = {
    addButton: '.js-claim-button',
    addText: '.js-claim-text',
    renderElement: '#result',
    templateId: '#panelView'
};

var data = {
    labels: labels,
    message: labels.pending,
    status: 'info'
};

$(document.body).on('click', selectors.addButton, function () {
    var comment = $(selectors.addText).val();
    if (comment) {
        $(selectors.addButton).prop('disabled', true);
        setData(comment);
    }
    else {
        alert(labels.emptyComment);
    }
});

// Once the DOM is ready...
window.addEventListener('DOMContentLoaded', function () {
    console.log('DOMContentLoaded');
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            from: 'popup',
            resolve: 'phones'
        }, getData);
    });
});