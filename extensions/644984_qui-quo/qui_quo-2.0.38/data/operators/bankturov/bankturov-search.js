window.OPERATOR_NAME = "Банк горящих туров";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function _getCityFrom() {
    const select = $1("select.departures");
    if (select && select.selectedOptions) {
        return getText(document.querySelector("select.departures").selectedOptions[0]);
    }
    return "";
}

function _getOccupancy() {
    const selectAdults = $1("select.adults");
    const adultsCount = selectAdults ? extractIntFromStr(selectAdults.value) : 0;
    const selectChildren = $1("select.children");
    const childrenCount = selectChildren ? extractIntFromStr(selectChildren.value) : 0;
    const childAges = $$(".child-ages .jump select.child-age")
        .slice(0, childrenCount)
        .map((s) => s.value)
        .join(",");
    if (adultsCount || childrenCount) {
        const result = {};
        if (adultsCount) result.adultsCount = adultsCount;
        if (childrenCount) result.childrenCount = childrenCount;
        if (childAges) result.childAges = childAges;
        return result;
    }
    return null;
}

function _getCountryRegion() {
    const els = $$(".b-tour-search-form .search-choice");
    if (els.length != 1) return null;
    const countryRegion = getText(els[0]) || "";
    const l = countryRegion.split(/:\s*/);
    return {
        country: l[0] || countryRegion,
        region: l[1] || ""
    };
}

function _getTourCheckin(tour) {
    try {
        const [_, ...dtMatch] = getText(tour.querySelector(".date") || "").match(
            /(\d{1,2}).(\d{1,2}).(\d{2,4})/
        );
        return dayMonthYearToString.apply(null, dtMatch);
    } catch (e) {
        console.error(e);
        return "";
    }
}

function _getTourOptions(tour) {
    const hotelInfoTd = tour.querySelector(".main");

    return {
        checkinDt: _getTourCheckin(tour),
        nights: parseNightsUtil(getNodeData(".nights", tour)),
        hotelName: getText(hotelInfoTd.querySelector("a")),
        href: getNodeProperty(hotelInfoTd.querySelector("a"), null, "href"),
        roomType: getText(hotelInfoTd.querySelector(".meal")),
        boardType: ((e) =>
            getText(Array.from(e.childNodes).filter((n) => n.nodeType === 3)[0]).replace(
                /^,\s*/,
                ""
            ))(hotelInfoTd),
        price: extractIntFromStr(getText(tour.querySelector(".cost")).replace(/\s/, "")),
        currency: mapCurrencyUtil(getText(tour.querySelector(".cost")))
    };
}

function initializeSearchCriteria() {
    return {
        city_from: _getCityFrom(),
        occupancy: _getOccupancy(),
        ..._getCountryRegion()
    };
}

function getSearchButton() {
    return document.querySelector(".b-form input[type=submit]");
}

function injectData() {
    $$(".resultsTable .offer").forEach((tr) => {
        if (!tr.querySelector(".qq")) {
            const td = document.createElement("td");
            td.style.verticalAlign = "top";
            td.append(qqBtns({ align: "qq-horizontal" }));
            tr.append(td);
        }
    });
}

function createOption(img) {
    const tour = getHotelRowByImage(img);

    return {
        ...SEARCH_CRITERIA,
        ..._getTourOptions(tour)
    };
}

function getHotelRowByImage(img) {
    return img.closest("tr");
}
