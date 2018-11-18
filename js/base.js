/**
 * Created by olegsuv on 18.11.2018.
 */
class ListUpdater {
    getSize() {}
    getTextForLink () {}
    getForEachText () {}
    getForAllText () {}

    init() {
        const linkSelector = '.listHandler .link.detailsLink';
        for (let i = 0; i < $(linkSelector).length; i++) {
            let url = $(linkSelector).eq(i).attr('href');
            $.get(url, (response) => this.successGet(response, i)).fail(this.failedGet);
        }
    }

    successGet(response, i) {
        const size = this.getSize(response);
        const description = this.getDescription(response);
        this.processLink(i, size, description);
        this.processPrice(i, size);
    }

    static failedGet(response) {
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
        $(linkSelector).eq(i).append(node);
        $(linkSelector).eq(i).attr('title', description);
    }

    processPrice(i, size) {
        const currentCurrency = $('.currencySelector .selected').text();
        const priceSelector = '.offer .price';
        const currentPrice = parseInt($(priceSelector).eq(i).find('strong').text().match(/\d/ig).join(''));
        const forEachText = this.getForEachText(size, currentPrice, currentCurrency);
        const forEachNode = this.getNode(forEachText, 'price-per-size');
        const forAllText = this.getForAllText(size, currentPrice, currentCurrency);
        const forAllNode = this.getNode(forAllText, 'price-for-all');
        forEachNode && $(priceSelector).eq(i).append(forEachNode);
        forAllNode && $(priceSelector).eq(i).append(forAllNode);
    }
}