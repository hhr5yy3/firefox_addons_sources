"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Page = {
  HOTEL_PAGE: 'hotelpage',
  BOOKING_FORM: 'booking_form'
};
var Regex = {
  HOTEL_PAGE_OR_BOOKING_FORM: /\/HotelBooking\/passengerDetailsV3\.aspx$/i,
  SEARCH_FORM: /\/HotelBooking\/SearchV3\.aspx/i,
  SERP: /\/SearchResultV3\.aspx/
};
var RESIDENCY_STORAGE = 'goglobal-residency';
var isHotelPageOrBookingForm = Regex.HOTEL_PAGE_OR_BOOKING_FORM.test(document.location.pathname);
var isSearchForm = Regex.SEARCH_FORM.test(document.location.pathname);
var isSerp = Regex.SERP.test(document.location.pathname);

var parsePrice = function parsePrice(price) {
  return parseFloat(price.replace(/[.,  ](?!\d{1,2}$)/g, '').replace(',', '.'));
};

var ggbNationalitiesToEtg = {
  tr: 'tk'
};

if (isSearchForm) {
  var residencySelectRef = document.querySelector('#ctl00_bodyContent_DropDownNationality');

  if (residencySelectRef) {
    setInterval(function () {
      localStorage.setItem(RESIDENCY_STORAGE, residencySelectRef.value);
    }, 300);
  }
}

if (isHotelPageOrBookingForm) {
  var hotelPageButtonSave = document.querySelector('#ctl00_bodyContent_ButtonSave');
  var bookingFormSubmitButton = document.querySelector('#ctl00_bodyContent_NewMakeBooking');

  var formatDate = function formatDate(date) {
    var _date$split = date.split('/'),
        _date$split2 = _slicedToArray(_date$split, 3),
        day = _date$split2[0],
        month = _date$split2[1],
        year = _date$split2[2];

    return "".concat(year, "-").concat(month, "-").concat(day);
  };

  var getFunnelStep = function getFunnelStep() {
    if (hotelPageButtonSave) {
      return Page.HOTEL_PAGE;
    }

    if (bookingFormSubmitButton) {
      return Page.BOOKING_FORM;
    }

    return null;
  };

  var getExternalHotelName = function getExternalHotelName() {
    var inputRef = document.querySelector('#ctl00_bodyContent_LBHotelHidden');

    if (inputRef) {
      return inputRef.value;
    }

    var hotelLabelRef = document.querySelector('#ctl00_bodyContent_LBHotel');

    if (hotelLabelRef) {
      return hotelLabelRef.textContent.trim();
    }

    var panelGroupRefs = document.querySelectorAll('.panel-group');

    if (panelGroupRefs.length) {
      var _panelGroupRefs = _slicedToArray(panelGroupRefs, 2),
          panelGroupRef = _panelGroupRefs[1];

      if (panelGroupRef) {
        var hotelNameRef = panelGroupRef.querySelector('.form-group .row:nth-child(3) .text-info:nth-child(2)');

        if (hotelNameRef) {
          return hotelNameRef.textContent.trim();
        }
      }
    }

    return null;
  };

  var getCheckin = function getCheckin() {
    var inputRef = document.querySelector('#ctl00_bodyContent_LBArrivaldateHidden');

    if (inputRef) {
      return formatDate(inputRef.value);
    }

    var labelRef = document.querySelector('#ctl00_bodyContent_LBArrivaldate');

    if (labelRef) {
      return formatDate(labelRef.textContent.trim());
    }

    var panelGroupRefs = document.querySelectorAll('.panel-group');

    if (panelGroupRefs.length) {
      var _panelGroupRefs2 = _slicedToArray(panelGroupRefs, 2),
          panelGroupRef = _panelGroupRefs2[1];

      if (panelGroupRef) {
        var checkInRef = panelGroupRef.querySelector('.form-group .row:nth-child(1) .text-info:nth-child(4)');

        if (checkInRef) {
          return formatDate(checkInRef.textContent.trim());
        }
      }
    }

    return null;
  };

  var getLengthOfStay = function getLengthOfStay() {
    var inputRef = document.querySelector('#ctl00_bodyContent_LBNightHidden');

    if (inputRef) {
      return parseInt(inputRef.value, 10);
    }

    var labelRef = document.querySelector('#ctl00_bodyContent_LBNaight');

    if (labelRef) {
      return parseInt(labelRef.textContent.trim(), 10);
    }

    var panelGroupRefs = document.querySelectorAll('.panel-group');

    if (panelGroupRefs.length) {
      var _panelGroupRefs3 = _slicedToArray(panelGroupRefs, 2),
          panelGroupRef = _panelGroupRefs3[1];

      if (panelGroupRef) {
        var lengthOfStayRef = panelGroupRef.querySelector('.form-group .row:nth-child(2) .text-info:nth-child(4)');

        if (lengthOfStayRef) {
          return parseInt(lengthOfStayRef.textContent.trim(), 10);
        }
      }
    }

    return null;
  };

  var getCheckout = function getCheckout() {
    var checkInDate = getCheckin();
    var lengthOfStay = getLengthOfStay();

    if (checkInDate && lengthOfStay) {
      var _checkInDate$split = checkInDate.split('-'),
          _checkInDate$split2 = _slicedToArray(_checkInDate$split, 3),
          year = _checkInDate$split2[0],
          month = _checkInDate$split2[1],
          day = _checkInDate$split2[2];

      var date = new Date();
      date.setFullYear(parseInt(year, 10));
      date.setMonth(parseInt(month, 10) - 1);
      date.setDate(parseInt(day, 10) + lengthOfStay);

      var _year = date.getFullYear();

      var _month = "".concat(date.getMonth() + 1).padStart(2, '0');

      var _day = "".concat(date.getDate()).padStart(2, '0');

      return "".concat(_year, "-").concat(_month, "-").concat(_day);
    }

    return null;
  };

  var getGenderGroups = function getGenderGroups() {
    var tableRef = document.querySelector('#ctl00_bodyContent_TableNames') || document.querySelector('#ctl00_bodyContent_namestab') || document.querySelector('.form-group table');

    if (hotelPageButtonSave && tableRef) {
      var genderRefs = _toConsumableArray(tableRef.querySelectorAll('tr td select'));

      var genderGroups = [];
      var count = 0;
      genderRefs.forEach(function (ref, i, arr) {
        if (ref.value !== 'CHD' && arr[i - 1] && arr[i - 1].value === 'CHD') {
          count += 1;
        }

        if (!genderGroups[count]) {
          genderGroups[count] = [];
        }

        genderGroups[count].push(ref);
      });
      return genderGroups;
    }

    if (bookingFormSubmitButton && tableRef) {
      var _genderRefs = _toConsumableArray(tableRef.querySelectorAll('tr:not(:first-child) td:nth-last-child(2)'));

      var groups = [];
      var _count = 0;

      _genderRefs.forEach(function (ref, i, arr) {
        if (ref.textContent.trim() !== 'CHD' && arr[i - 1] && arr[i - 1].textContent.trim() === 'CHD') {
          _count += 1;
        }

        if (!groups[_count]) {
          groups[_count] = [];
        }

        groups[_count].push(ref);
      });

      return groups;
    }

    return null;
  };

  var getAdults = function getAdults() {
    var genderGroupRefs = getGenderGroups();

    if (genderGroupRefs) {
      return genderGroupRefs.map(function (group) {
        return group.reduce(function (accum, genderRef) {
          if (genderRef.value && genderRef.value !== 'CHD') {
            return accum + 1;
          }

          if (genderRef.textContent && genderRef.textContent.trim() !== 'CHD') {
            return accum + 1;
          }

          return accum;
        }, 0);
      });
    }

    return null;
  };

  var getChildrenYears = function getChildrenYears() {
    var genderGroupRefs = getGenderGroups();

    if (genderGroupRefs) {
      return genderGroupRefs.map(function (group) {
        return group.reduce(function (accum, genderRef) {
          if (genderRef.value === 'CHD' || genderRef.textContent === 'CHD') {
            var agesRef = genderRef.closest('td').nextElementSibling.querySelector('input') || genderRef.closest('td').nextElementSibling;

            if (agesRef) {
              return [].concat(_toConsumableArray(accum), [parseInt(agesRef.value || agesRef.textContent, 10)]);
            }
          }

          return accum;
        }, []);
      });
    }

    return [[]];
  };

  var getMeal = function getMeal() {
    var genderGroupRefs = getGenderGroups();

    if (genderGroupRefs) {
      return genderGroupRefs.some(function (group) {
        var _group = _slicedToArray(group, 1),
            genderRef = _group[0];

        if (genderRef) {
          var rowRef = genderRef.closest('tr');
          var tdRef = rowRef.querySelector('td:nth-child(2)');

          if (tdRef) {
            return tdRef.textContent.trim() === 'BED AND BREAKFAST';
          }
        }

        return false;
      });
    }

    return null;
  };

  var getCancellationBefore = function getCancellationBefore() {
    var inputRef = document.querySelector('#ctl00_bodyContent_LBCXLDeadlineHidden');

    if (inputRef) {
      return formatDate(inputRef.value);
    }

    var labelRef = document.querySelector('#ctl00_bodyContent_LBCXLDeadline');

    if (labelRef) {
      return formatDate(labelRef.textContent.trim());
    }

    var panelGroupRefs = document.querySelectorAll('.panel-group');

    if (panelGroupRefs.length) {
      var _panelGroupRefs4 = _slicedToArray(panelGroupRefs, 2),
          panelGroupRef = _panelGroupRefs4[1];

      if (panelGroupRef) {
        var cancellationDateRef = panelGroupRef.querySelector('.form-group .row:nth-child(4) .text-info:nth-child(2)');

        if (cancellationDateRef) {
          return formatDate(cancellationDateRef.textContent.trim());
        }
      }
    }

    return null;
  };

  var getPrice = function getPrice() {
    var labelRef = document.querySelector('#ctl00_bodyContent_LBTotalPrice');

    if (labelRef) {
      var _labelRef$textContent = labelRef.textContent.trim().split(' '),
          _labelRef$textContent2 = _slicedToArray(_labelRef$textContent, 1),
          _price = _labelRef$textContent2[0];

      return _price;
    }

    var panelGroupRefs = document.querySelectorAll('.panel-group');

    if (panelGroupRefs.length) {
      var _panelGroupRefs5 = _slicedToArray(panelGroupRefs, 2),
          panelGroupRef = _panelGroupRefs5[1];

      if (panelGroupRef) {
        var priceRef = panelGroupRef.querySelector('.form-group .row:nth-child(4) .text-info:nth-child(4)');

        if (priceRef) {
          var _priceRef$trim$split = priceRef.trim().split(' '),
              _priceRef$trim$split2 = _slicedToArray(_priceRef$trim$split, 1),
              _price2 = _priceRef$trim$split2[0];

          return _price2;
        }
      }
    }

    return null;
  };

  var getCurrency = function getCurrency() {
    var totalPriceRef = document.querySelector('#ctl00_bodyContent_LBTotalPrice');

    if (totalPriceRef) {
      var _totalPriceRef$textCo = totalPriceRef.textContent.trim().split(' '),
          _totalPriceRef$textCo2 = _slicedToArray(_totalPriceRef$textCo, 2),
          currency = _totalPriceRef$textCo2[1];

      return currency;
    }

    var panelGroupRefs = document.querySelectorAll('.panel-group');

    if (panelGroupRefs.length) {
      var _panelGroupRefs6 = _slicedToArray(panelGroupRefs, 2),
          panelGroupRef = _panelGroupRefs6[1];

      if (panelGroupRef) {
        var priceRef = panelGroupRef.querySelector('.form-group .row:nth-child(4) .text-info:nth-child(4)');

        if (priceRef) {
          var _priceRef$trim$split3 = priceRef.trim().split(' '),
              _priceRef$trim$split4 = _slicedToArray(_priceRef$trim$split3, 2),
              _currency = _priceRef$trim$split4[1];

          return _currency;
        }
      }
    }

    return null;
  };

  var getRoomName = function getRoomName() {
    var tableRef = document.querySelector('#ctl00_bodyContent_TableNames') || document.querySelector('.form-group table');

    if (tableRef) {
      var genderGroupRefs = getGenderGroups();
      return genderGroupRefs.map(function (group) {
        var _group2 = _slicedToArray(group, 1),
            genderRef = _group2[0];

        if (genderRef) {
          var rowRef = genderRef.closest('tr');
          var tdRef = rowRef.querySelector('td:first-child');

          if (tdRef) {
            return tdRef.textContent.trim();
          }
        }

        return null;
      });
    }

    return [];
  };

  var getLanguage = function getLanguage() {
    var language = document.documentElement.lang.toLowerCase();

    if (language) {
      return language === 'us' ? 'en' : language;
    }

    return 'en';
  };

  var externalHotelName = getExternalHotelName();
  var residency = localStorage.getItem(RESIDENCY_STORAGE);
  var price = getPrice();

  var getResidency = function getResidency() {
    if (residency) {
      var lowerCasedResidency = residency.toLowerCase();
      return ggbNationalitiesToEtg[lowerCasedResidency] || lowerCasedResidency;
    }

    return null;
  };

  var data = {
    competitor: 'GGB',
    funnel_step: getFunnelStep(),
    external_hotel_name: externalHotelName,
    external_id: externalHotelName,
    checkin: getCheckin(),
    checkout: getCheckout(),
    adults: getAdults(),
    children_years: getChildrenYears(),
    rooms_number: getRoomName().length,
    has_meal: getMeal(),
    cancellation_before: getCancellationBefore(),
    is_postpay: false,
    price: price && parsePrice(price),
    currency: getCurrency(),
    taxes: null,
    room_name: getRoomName(),
    residency: getResidency(),
    language: getLanguage(),
    html: document.body.outerHTML
  };
  chrome.runtime.sendMessage({
    command: 'SHOW_OFFER',
    data: data
  });

  if (bookingFormSubmitButton) {
    bookingFormSubmitButton.addEventListener('click', function () {
      chrome.runtime.sendMessage({
        command: 'GET_COMPETITOR_ORDER_DATA',
        data: data
      });
    });
  }
} else if (isSerp) {
  var _document$querySelect3;

  var DEFAULT_CHILDREN_AGE = 10;
  var DATA_FROM_WINDOW = 'DATA_FROM_WINDOW';
  window.addEventListener('message', function (event) {
    if (event.source !== window) {
      return;
    }

    if (event.data.type === DATA_FROM_WINDOW) {
      chrome.runtime.sendMessage({
        command: 'GET_COMPETITOR_ALL_SERP_DATA',
        data: getData(event.data.data)
      });
    }
  }, false);

  var getChekInOrOut = function getChekInOrOut(option) {
    var _document$querySelect;

    var optionsMap = {
      "in": '#ctl00_bodyContent_LabelCheckIn',
      out: '#ctl00_bodyContent_LabelCheckOut'
    };
    var check = (_document$querySelect = document.querySelector(optionsMap[option])) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.textContent;

    if (check) {
      var splitedCheck = check.split('/');
      return "".concat(splitedCheck[2], "-").concat(splitedCheck[1], "-").concat(splitedCheck[0]);
    }

    return null;
  };

  var getRoomInfo = function getRoomInfo(option) {
    var _Number, _document$querySelect2;

    var infoMap = {
      rooms: 0,
      adults: 1,
      children: 2
    };
    return (_Number = Number((_document$querySelect2 = document.querySelector('#ctl00_bodyContent_LabelRoomType')) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.textContent.split(',')[infoMap[option]].match(/\d{1,2}/))) !== null && _Number !== void 0 ? _Number : null;
  };

  var _getAdults = function _getAdults(rooms, adults) {
    var adultsPerRoom = Math.floor(adults / rooms);
    var remainder = adults % rooms;
    var adultsArr = Array(rooms).fill(adultsPerRoom);

    if (remainder !== 0) {
      Array(remainder).fill(null).forEach(function (_, i) {
        adultsArr[i] += 1;
      });
    }

    return adultsArr;
  };

  var getChildren = function getChildren(rooms, children) {
    var childrenAgesArr = Array(children).fill(DEFAULT_CHILDREN_AGE); // eslint-disable-next-line max-len

    var splitArr = function splitArr(arr, chunks) {
      return _toConsumableArray(Array(chunks)).map(function (_, c) {
        return arr.filter(function (n, i) {
          return i % chunks === c;
        });
      });
    };

    return splitArr(childrenAgesArr, rooms);
  };

  var getGuests = function getGuests() {
    var rooms = getRoomInfo('rooms');
    var adults = getRoomInfo('adults');
    var children = getRoomInfo('children');
    return Array(rooms).fill(null).map(function (_, i) {
      return {
        adults: _getAdults(rooms, adults)[i],
        children: getChildren(rooms, children)[i]
      };
    });
  };

  var city = ((_document$querySelect3 = document.querySelector('#ctl00_bodyContent_LabelCity')) === null || _document$querySelect3 === void 0 ? void 0 : _document$querySelect3.textContent) || null;

  var getData = function getData(hotelsList) {
    var hotelIds = [];
    var hotelsObj = hotelsList.reduce(function (acc, curr) {
      if (!acc[curr.HId]) {
        hotelIds.push(curr.HId);
        acc[curr.HId] = [];
      }

      acc[curr.HId].push(curr);
      return acc;
    }, {});
    var hotels = hotelIds.map(function (hotelId) {
      return hotelsObj[hotelId];
    });
    var rooms = getRoomInfo('rooms');
    var guests = getGuests();
    var checkIn = getChekInOrOut('in');
    var checkOut = getChekInOrOut('out');

    var getHasMealValue = function getHasMealValue(mealType) {
      if (mealType === 'RO') {
        return false;
      }

      return true;
    };

    var getTrueCancellationDate = function getTrueCancellationDate(cancDate) {
      if (cancDate) {
        var cancDateArr = cancDate.split('/').reverse();
        var now = new Date();
        var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        if (today < new Date(cancDateArr)) {
          return cancDateArr.join('-');
        }
      }

      return null;
    };

    return hotels.map(function (hotel, i) {
      return hotel.map(function (offer) {
        var _offer$pos, _offer$pos2;

        return {
          competitor: 'GGB',
          hotel_name: offer.Name,
          external_hotel_id: "GGB_".concat(offer.Name).toUpperCase(),
          latitude: ((_offer$pos = offer.pos) === null || _offer$pos === void 0 ? void 0 : _offer$pos[0]) || null,
          longitude: ((_offer$pos2 = offer.pos) === null || _offer$pos2 === void 0 ? void 0 : _offer$pos2[1]) || null,
          star_rating: offer.StarRating,
          hotel_kind: null,
          address: offer.Addr,
          phone: null,
          city: city,
          geo: city,
          checkin: checkIn,
          checkout: checkOut,
          guests: guests,
          room_name: offer.RCName.split(','),
          meal_type: new Array(rooms).fill(offer.RBName),
          has_meal: new Array(rooms).fill(getHasMealValue(offer.RBName)),
          cancellation_before: new Array(rooms).fill(getTrueCancellationDate(offer.cdlDate)),
          competitor_currency: offer.SCurr,
          competitor_price: offer.OriginalPrice,
          competitor_net_price: offer.SPrice,
          sup_price: +offer.NPrice.toFixed(2),
          num_in_page: i + 1,
          sup_name: offer.SupName,
          language: 'en',
          residency: 'gb'
        };
      });
    }).flat();
  };

  var injectScript = function injectScript() {
    var script = document.createElement('script');
    script.textContent = "window.postMessage({\n      type: '".concat(DATA_FROM_WINDOW, "',\n      data: angular.element(document.querySelector('[ng-controller=listdata]')).scope().all_hotels }, \"*\");");
    document.body.appendChild(script);
  };

  var sendDataAfterContentIsLoaded = function sendDataAfterContentIsLoaded(isLoaded) {
    if (isLoaded) {
      injectScript();
      return;
    }

    if (document.querySelector('#divresultWaiting').style.display === 'none' && document.querySelector('#progressRow').style.display === 'none') {
      sendDataAfterContentIsLoaded(true);
    } else {
      setTimeout(function () {
        sendDataAfterContentIsLoaded(false);
      }, 1000);
    }
  };

  sendDataAfterContentIsLoaded(false);
} else {
  chrome.runtime.sendMessage({
    command: 'SHOW_OFFER',
    data: null
  });
}