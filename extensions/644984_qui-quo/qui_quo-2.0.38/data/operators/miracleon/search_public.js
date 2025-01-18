window.OPERATOR_NAME = "MIRACLEON";
window.showTopHotelsRating = true;


function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    const hotelName = getNodeData('.active .hotel-class');
    if (hotelName) {
        setStorageDataAsync({'hotelNameMiracleon': hotelName})
    }
    const items = $$('[id*="room-stay-id"]');
    if ( items.length > 0 ) {
        items.forEach(div => {
            if ( !div.querySelector(".qq") ) {
                div.append(qqBtns({align: "qq-horizontal"}));
            }
        });
    }
}

async function createOption(img) {
    const tariff = getHotelRowByImage(img);
    const room = tariff.closest('content');
    const {hotelNameMiracleon} = await getStorageDataAsync('hotelNameMiracleon')
    let option = {
        checkinDt: new Date(getParameterByName('date')).toLocaleDateString(),
        nights: getParameterByName('nights'),
        hotelName: hotelNameMiracleon,
        href: window.location.href,
        country: "Россия",
        region: "Анапа",
        roomType: getNodeData('[tl-message="roomType.name"]', room),
        boardType: getNodeData('[ng-if="::inclusiveMealPlan"]', tariff),
        price: extractIntFromStr(lastElement($$('.amount .numeric', tariff).extractNodesText()).split(/\s*,\s*/)[0].replace(/\D+/g, '')),
        currency: "RUB",
        city_from: "",
        operator: window.OPERATOR_NAME,
        thumbnail: getBackgroundImageUrl($1('.x-fit-image-container')),
        occupancy: getOccupancy()
    };
    console.log(option)
    return option;
}

function getOccupancy() {
    const ages = getUrlSearchParameters('childrenAge');
    return {
        adultsCount: parseInt(getUrlSearchParameters('adults')),
        childrenCount: ages ? ages.split(';').length : 0,
        childAges: ages ?  ages.split(';').join(",") : null
    }
}

function getHotelRowByImage(img) {
    return img.closest('.plate');
}
