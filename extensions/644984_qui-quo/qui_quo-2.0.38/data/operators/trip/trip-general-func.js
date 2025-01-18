function injectData() {
    const selector = $1(".price-explain")
        ? $$(".price-explain")
        : $$("div[class*='priceInfo_saleRoomItemBox-priceBox-priceExplain");
    selector.forEach(div => {

        if (!div.querySelector(".qq") && getNodeProperty(div, '').includes('Итого')) {
            return div.prepend(qqBtns({align: "qq-horizontal"}));
        }

        if (!div.firstElementChild?.querySelector(".qq") && getNodeProperty(div, '').includes('Итого')) {
            return div.firstElementChild.prepend(qqBtns({align: "qq-horizontal"}));
        }

        if (!div.previousElementSibling.querySelector(".qq")
            && !getNodeProperty(div, '').includes('Итого')
            && div.classList.length === 1) {
            return div.previousElementSibling.prepend(qqBtns({align: "qq-horizontal"}));
        }
    });
}

function getPriceAndCurrency (tour, nights, hasHotelFind, selector) {
    let price;
    if (parseInt(nights) > 1 && hasHotelFind) {
        const priceElement = $1('.price-explain', tour);
        const innerHTML = priceElement.innerHTML;
        const brIndex = innerHTML.indexOf('<br>');
        const priceText = innerHTML.slice(0, brIndex).trim();
        price = priceText.split('Итого:')[1];
    } else if (parseInt(nights) > 1 && !hasHotelFind) {
        const priceElement = $1('div[class*=priceInfo_saleRoomItemBox-priceBox-priceExplain]', tour);
        const divsInPrise = $$('div', priceElement)
            .find(item => item.textContent.includes('Итого'));
        price = getText(divsInPrise).split(':')[1];
    } else {
        price = getText(selector);
    }

    price = price || getNodeData('#meta-real-price', tour)
    return {
        price: parseInt(price.replace(/\D/g, '')),
        currency: mapCurrencyUtil(price.replace(/\d/g, '').trim())
    }
}

function getOccupancy () {
    const childrenCount = parseInt(getParameterByName('children'));
    return {
        adultsCount: parseInt(getParameterByName('adult')),
        childrenCount,
        childAges: childrenCount > 0 ? getParameterByName("ages") : ""
    }
}
