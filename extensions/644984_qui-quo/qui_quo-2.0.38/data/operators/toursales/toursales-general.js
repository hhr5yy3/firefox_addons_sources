function isSortingEnabled (hotelsOrOperators) {
    const selectedSort = getText($1('.lsfw-grouping__link.active')).toLowerCase();
    return selectedSort === hotelsOrOperators;
}

function getOccupancy () {
    const occupancyElement = $1('#lsfppl');
    const adultsCount = $$('i.fa-user', occupancyElement).length;
    const childAgesElement = $1('i.fa-child', occupancyElement);
    let childrenCount = null;
    let childAges = null;
    if (childAgesElement) {
        const childAgesArray = $$('span', childAgesElement.nextElementSibling);
        childrenCount = childAgesArray.length;
        childAges = childAgesArray.map(item => getText(item).match(/\d+/g)).join(', ');
    }

    return {
        adultsCount,
        childrenCount,
        childAges
    }
}

function getPriceAndCurrency (str) {
    return {
        price: parseInt(str.replace(/\D/g, '')),
        currency: mapCurrencyUtil(str.split(' ')[0])
    }
}