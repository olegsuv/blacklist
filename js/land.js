/**
 * Created by olegsuv on 17.11.2018.
 */
class Land extends ListUpdater {
    getSize(response) {
        const description = $(response).find('.descriptioncontent');
        const td = description.find('td.value strong');
        for (let i = 0; i < td.length; i++) {
            let text = td[i].innerText.trim();
            if (text.indexOf('соток') !== -1) {
                return parseInt(text.split(' ')[0], 10);
            }
        }
    }

    getTextForLink(size) {
        return `${size} соток`;
    }

    getForEachText(size, currentPrice, currentCurrency) {
        const currentPricePerSize = parseInt(currentPrice / size).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return `<span>за сотку</span> ${currentPricePerSize} ${currentCurrency}`;
    }

    getForAllText(size, currentPrice, currentCurrency) {
        const currentPriceForAll = parseInt(currentPrice * size).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return `<span>за все</span> ${currentPriceForAll} ${currentCurrency}`;
    }
}

const landMask = 'https://www.olx.ua/nedvizhimost/zemlya/';
if (location.href.indexOf(landMask) !== -1) {
    const land = new Land();
    land.init();
}

