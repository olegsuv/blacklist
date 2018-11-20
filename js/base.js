/**
 * Created by olegsuv on 18.11.2018.
 */
class ListUpdater {
    getSize() {}
    getTextForLink () {}
    getForEachText () {}
    getForAllText () {}

    constructor() {
        this.ajaxLoads = 0;
        this.localStorageLoads = 0;
        this.modified = 0;
    }

    init() {
        this.VDOM = $('#listContainer');
        const linkSelector = '.listHandler .link.detailsLink';
        for (let i = 0; i < $(linkSelector).length; i++) {
            let url = $(linkSelector).eq(i).attr('href').split('#')[0];
            if (localStorage.getItem(url)) {
                this.localStorageLoads++;
                this.readLocalStorage(i, url);
            } else {
                this.ajaxLoads++;
                $.get(url, (response) => this.ajaxGetSuccess(response, i, url)).fail(this.ajaxGetFail);
            }
            this.linkCounter = i;
        }
        $(window).bind('ajaxReady', function() {
            alert('ajaxReady2');
        });
    }

    checkLoads() {
        this.modified++;
        if (this.linkCounter === this.modified) {
            $('#listContainer').html(this.VDOM);
            console.log(`localStorageLoads: ${this.localStorageLoads}, ajaxLoads: ${this.ajaxLoads}`);
        }
    }

    ajaxGetSuccess(response, i, url) {
        const size = this.getSize(response);
        const description = this.getDescription(response);
        localStorage.setItem(url, JSON.stringify({
            size,
            description
        }));
        this.modifyDOM(i, size, description);
    }

    readLocalStorage(i, url) {
        const {size, description} = JSON.parse(localStorage.getItem(url));
        this.modifyDOM(i, size, description);
    }

    modifyDOM(i, size, description) {
        this.processLink(i, size, description);
        this.processPrice(i, size);
        this.checkLoads();
    }

    static ajaxGetFail(response) {
        console.log('fail', response);
    }

    getDescription(response) {
        return $(response).find('#textContent').text().trim();
    }

    getNode(text, className) {
        return text ? $(`<div class="list-updater-label list-updater-label-${className}">${text}</div>`) : null;
    }

    processLink(i, size, description) {
        const linkSelector = '.listHandler .link.detailsLink';
        const text = this.getTextForLink(size);
        const node = this.getNode(text, 'size');
        this.VDOM.find(linkSelector).eq(i).append(node);
        this.VDOM.find(linkSelector).eq(i).attr('title', description);
    }

    processPrice(i, size) {
        const currentCurrency = this.VDOM.find('.currencySelector .selected').text();
        const priceSelector = '.offer .price';
        const currentPrice = parseInt(this.VDOM.find(priceSelector).eq(i).find('strong').text().match(/\d/ig).join(''));
        const forEachText = this.getForEachText(size, currentPrice, currentCurrency);
        const forEachNode = this.getNode(forEachText, 'price-per-size');
        const forAllText = this.getForAllText(size, currentPrice, currentCurrency);
        const forAllNode = this.getNode(forAllText, 'price-for-all');
        forEachNode && this.VDOM.find(priceSelector).eq(i).append(forEachNode);
        forAllNode && this.VDOM.find(priceSelector).eq(i).append(forAllNode);
    }
}