window.OPERATOR_NAME = "Kazunion";
window.showTopHotelsRating = true;

function initializeSearchCriteria() {
    const occupancy = getOccupancy();
    return {occupancy};
}

function getSearchButton() {
    return $first("#SearchButton")
}

function injectData() {
    $$("tr.grid-success, tr.grid-warning").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(createCell());
        }
    });
    const headRow = $first('#example thead tr');
    if ( headRow && !$first('.qq', headRow) ) {
        headRow.append(createHeadCell());
    }
}

function createHeadCell() {
    const newTd = document.createElement("th");
    newTd.classList.add('qq');
    newTd.append(document.createTextNode("QQ"));
    return newTd;
}


function createCell() {
    const newTd = document.createElement("td");
    newTd.className = "qq";
    newTd.appendChild(qqBtns());
    return newTd;
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const dateNode = getElementByXpath('.//span[contains(@data-i18n, "checkInDate")]/following-sibling::span', tour);
    const hotelNode = getElementByXpath('.//span[@data-i18n="pages.searchresult.hotelName"]/following-sibling::span', tour);
    let [hotelName, region] = getText(hotelNode).split(/\s*\)\s*|\s*\(\s*/);
    const starsNode = $first('.five-stars', hotelNode);
    if ( starsNode && starsNode.style.width ) {
        hotelName = hotelName +' '+(parseInt(starsNode.style.width)/20).toString()+'*';
    }

    const price = $first('[data-price]', tour);
    let option = {
        checkinDt: getText(dateNode),
        nights: getText(getElementByXpath('.//span[@data-i18n="pages.searchresult.nigths"]/following-sibling::span', tour)),
        hotelName,
        href: null,
        country: getNodeProperty($first('#ArrivalCountryId_chosen .chosen-single span')) || selectedOption($first('#ArrivalCountryId')),
        region,
        roomType: getText(getElementByXpath('.//span[@data-i18n="pages.searchresult.roomCategory_placement"]/following-sibling::span', tour)),
        boardType: getText(getElementByXpath('.//span[@data-i18n="pages.searchresult.mealPlan"]/following-sibling::span', tour)),
        price: parseInt(price.dataset.price),
        currency: price.dataset.currency,
        city_from: getNodeProperty($first('#DepartCityCountryId_chosen .chosen-single span'), "") || selectedOption($first('#DepartCityCountryId')),
        operator: OPERATOR_NAME,
        thumbnail: null,
        occupancy: SEARCH_CRITERIA.occupancy
    };
    const showBookingDetails = tour.querySelector('a[onclick*="ShowBookingDetails"]');
    if ( showBookingDetails ) {
        const funcText = showBookingDetails.getAttribute('onclick');
        if ( funcText ) {
            const tourId = funcText.match(/ShowBookingDetails.+?(\d+)/);
            if ( tourId ) {
                let tours = JSON.parse(localStorage.getItem('tours') || '[]').filter(t => Date.now() - t.timestamp < 48 * 60 * 60 * 1000 );
                if ( !Array.isArray(tours) ) {
                    tours = [];
                }
                tours.push(shortify(option, tourId[1]));
                localStorage.setItem('tours', JSON.stringify(tours));
            }
        }

    }

    return option;
}

function shortify(option, id) {
    return Object.assign({
        id, timestamp: Date.now(), city_from: option.city_from, country: option.country, region: option.region
    });
}

function getHotelRowByImage(img) {
    return img.closest('tr');
}

function getOccupancy() {
    let occupancy = {
        adultsCount: parseInt(getNodeProperty($first('#Adults_chosen .chosen-single span'), null) || selectedOption($first('#Adults'))),
        childrenCount: parseInt(getNodeProperty($first('#Children_chosen .chosen-single span'), null) || selectedOption($first('#Children'))),
        childAges: null
    };
  if ( isNaN(occupancy.adultsCount) ) {
      return;
  }
  if ( occupancy.childrenCount > 0) {
      occupancy.childAges = $$('div[id*="ChildAge"] .chosen-single span, [id*="ChildAge"]')
          .filter(div => div.clientHeight > 0)
          .map(div => selectedOption(div) || getNodeProperty(div)).join();
  }
  return occupancy;
}
