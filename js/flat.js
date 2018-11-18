/**
 * Created by olegsuv on 19.11.2018.
 */
class Flat extends ListUpdater {
    getSize(response) {
        const description = $(response).find('.descriptioncontent');
        const th = description.find('th');
        for (let i = 0; i < th.length; i++) {
            let text = th[i].innerText.trim();
            if (text.indexOf('Общая площадь') !== -1) {
                let td = th.eq(i).next().find('strong').text();
                return parseInt(td.split(' ')[0], 10);
            }
        }
    }

    getTextForLink(size) {
        return `${size} м²`;
    }

    getForEachText(size, currentPrice, currentCurrency) {
        const currentPricePerSize = parseInt(currentPrice / size).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return `<span>за м²</span> ${currentPricePerSize} ${currentCurrency}`;
    }

    getForAllText(size, currentPrice, currentCurrency) {
        return null;
    }
}

const flatMask = 'https://www.olx.ua/nedvizhimost/kvartiry-komnaty/';
if (location.href.indexOf(flatMask) !== -1) {
    const flat = new Flat();
    flat.init();
}

