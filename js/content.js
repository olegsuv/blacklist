/**
 * Created by Oleg on 14.02.2017.
 */

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
    add: '/api/v1/platform/add.json',
    phones: '/api/v1/platform/phones.json',
    search: '/api/v1/platform/search.json',
    getPhone: 'https://www.olx.ua/ajax/misc/contact/phone/',
    siteEvent: 'adPageShowContact'
};

const selectors = {
    addButton: '.js-claim-button',
    addText: '.js-claim-text',
    addForm: '.js-claim-form',
    renderElement: '#result',
    templateId: '#panelView',
    phoneBlock: '.contact-button.link-phone',
    getPhone: '.spoiler',
    textOnePhone: 'strong',
    textPhones: 'strong span',
    layout: '/layout/layout.stache',
    installPlace: '#offeractions'
};

var data = {
    labels: labels,
    url: location.pathname
};

function grabPhones() {
    var phonesDom = $(selectors.phoneBlock).find(selectors.textPhones);
    if (!phonesDom.length) {
        phonesDom = $(selectors.phoneBlock).find(selectors.textOnePhone);
    }
    var phones = [];
    for (var i = 0; i < phonesDom.length; i++) {
        var currentPhone = $(phonesDom).eq(i).text();
        currentPhone = '38' + currentPhone.replace(/\+380/ig, '0').replace(/\s/ig, '').replace(/-/ig, '');
        phones.push(currentPhone);
    }
    return phones;
}

function sendData() {
    return {
        phones: grabPhones(),
        url: location.pathname
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

function getData() {
    $.ajax({
        crossOrigin: true,
        type: 'get',
        url: config.host + config.search,
        data: getTransferData(),
        dataType: 'json',
        success: function (receivedData) {
            data.content = receivedData;
            renderData(data);
        },
        error: function (json) {
            console.log('error', json);
        }
    });
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

function renderData(data) {
    console.log('renderData', data);
    $(selectors.renderElement).html($.templates(selectors.templateId).render(data));
}

function parsePhones(phones) {
    data.phones = phones.match(/[0-9\s-]{10,}/ig).map(function (item) {
        return item.replace(/\s|-|\(|\)|/ig, '').replace('+38', '');
    });
    getData();
}

function getPhone() {
    var id = location.href.split('-ID')[1].split('.html')[0];
    var url = config.getPhone + '/' + id + '/white/';

    $.ajax({
        crossOrigin: true,
        type: 'get',
        url: url,
        dataType: 'json',
        success: function (json) {
            parsePhones(json.value);
        },
        error: function (json) {
            console.log('error', json);
        }
    });
}

function init () {
    //temporary support for popup
    $(selectors.phoneBlock).find(selectors.getPhone).click();
    chrome.runtime.onMessage.addListener(function (msg, sender, response) {
        response(sendData());
    });

    //ajax phone
    getPhone();

    //install panel into body
    $.get(chrome.extension.getURL(selectors.layout), function (response) {
        $(selectors.installPlace).append($(response));
        $(selectors.installPlace).on('submit', selectors.addForm, function (element) {
            element.preventDefault();

            var comment = $(selectors.addText).val();
            if (comment) {
                $(selectors.addButton).prop('disabled', true);
                setData(comment);
            }
            else {
                alert(labels.emptyComment);
            }
        });
    });
}

init(); //run this
