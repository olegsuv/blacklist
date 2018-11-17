/**
 * Created by olegsuv on 17.11.2018.
 */
const urlMask = 'https://www.olx.ua/nedvizhimost/zemlya/prodazha-zemli';
if (location.href.indexOf(urlMask) !== -1) {
    init();
}

function init() {
    const linkSelector = '.listHandler .link.detailsLink';
    for (let i = 0; i < $(linkSelector).length; i++) {
        let url = $(linkSelector).eq(i).attr('href');
        $.get(url, function (response) {
            successGet(response, i);
        }).fail(failedGet)
    }
}

function getSize(response) {
    const description = $(response).find('.descriptioncontent');
    const td = description.find('td.value strong');
    for (let i = 0; i < td.length; i++) {
        let text = td[i].innerText.trim();
        if (text.indexOf('соток') !== -1) {
            return parseInt(text.split(' ')[0], 10);
        }
    }
}

function getDescription(response) {
    return $(response).find('#textContent').text().trim();
}

function successGet(response, i) {
    const size = getSize(response);
    const description = getDescription(response);
    processLink(i, size, description);
    processPrice(i, size);
}

function processLink(i, size, description) {
    const linkSelector = '.listHandler .link.detailsLink';
    $(linkSelector).eq(i).append($(`<div class="zemlya zemlya-size">${size} соток</div>`));
    $(linkSelector).eq(i).attr('title', description);
}

function processPrice(i, size) {
    const currentCurrency = $('.currencySelector .selected').text();
    const priceSelector = '.offer .price';
    const currentPrice = parseInt($(priceSelector).eq(i).find('strong').text().match(/\d/ig).join(''));
    const currentPricePerSize = parseInt(currentPrice / size, 10);
    const currentPriceForAll = parseInt(currentPrice * size, 10);
    $(priceSelector).eq(i).append($(`<div class="zemlya zemlya-price-per-size">${currentPricePerSize} ${currentCurrency} за сотку</div>`));
    $(priceSelector).eq(i).append($(`<div class="zemlya zemlya-price-for-all">${currentPriceForAll} ${currentCurrency} за все</div>`));
}

function failedGet(response) {
    console.log('fail', response);
}