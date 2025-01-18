//Система подбра туров "Megatec Мастер-WEB"

var OPERATOR_NAME = "АэроТрэвел";

function initializeSearchCriteria() {
    var doc = typeof getDoc !== 'undefined' ? getDoc("searchFrame") : null;
    if ( !doc ) {
        return null;
    }
    var country = getCountry(doc);
    var city = getCity(doc);

    return { "country" : country,
        "city": city,
        "occupancy": getOccupancy(doc)};
}

function getCity(doc) {
    return getNodeProperty(doc.querySelector('#select-city .city-name'), null);
}

function getOccupancy(doc) {
    var occupancy = {
        adultsCount: extractIntFromStr(getNodeProperty(doc.querySelector('.tourist-content .adults-count'), "0")),
        childrenCount: extractIntFromStr(getNodeProperty(doc.querySelector('.tourist-content .children-count'), "0")),
        childAges: null
    };

    if ( occupancy.childrenCount > 0 ) {
        occupancy.childAges = querySelectorAll(doc, ".ages  select[class*='child']").reduce((prev, select) => {
            const text =  selectedOption(select);
            text && parseInt(text) ? prev.push(text) : null;
            return prev;
        }, []).join()
    }
    return occupancy;
}
