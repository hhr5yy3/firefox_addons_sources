"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
  HOTEL_PAGE: /HotelRooms.aspx/,
  BOOKING_FORM: /HotelPaxDetails.aspx/,
  SEARCH_FORM: /Search.aspx/,
  BOOKING_FORM_FINAL_STEP: /ReviewHotelBooking.aspx/
};
var Month = {
  '01': /Jan|Янв|janv\.|ene|Gen|Oca/,
  '02': /Feb|Фев|Fev|févr\.|feb|Feb|Şub/,
  '03': /Mar|Мар|mars|mar/,
  '04': /Apr|Апр|Abr|avr\.|abr|Nis/,
  '05': /May|Май|Mai|mai|may|Mag/,
  '06': /Jun|Июн|juin|jun|Giu|Haz/,
  '07': /Jul|Июл|juil\.|jul|Lug|Tem/,
  '08': /Aug|Авг|Ago|août|ago|Ağu/,
  '09': /Sep|Сен|Set|sept\.|sep|Eyl/,
  10: /Oct|Окт|Out|oct\.|oct|Ott|Eki/,
  11: /Nov|Ноя|nov\.|nov|Kas/,
  12: /Dec|Дек|Dez|déc\.|dic|Dic|Ara/
};

var formatDate = function formatDate(date) {
  var _date$split = date.split('-'),
      _date$split2 = _slicedToArray(_date$split, 3),
      day = _date$split2[0],
      month = _date$split2[1],
      year = _date$split2[2];

  var monthArr = Object.entries(Month);

  for (var i = 0; i < monthArr.length; i += 1) {
    if (month !== null && month !== void 0 && month.match(monthArr[i][1])) {
      return "".concat(year, "-").concat(monthArr[i][0], "-").concat(day);
    }
  }

  return "".concat(year, "-").concat(month, "-").concat(day);
};

var parsePrice = function parsePrice(price) {
  return parseFloat(price.replace(/[.,  ](?!\d{1,2}$)/g, '').replace(',', '.'));
};

var isHotelPage = Regex.HOTEL_PAGE.test(document.location.pathname);
var isBookingForm = Regex.BOOKING_FORM.test(document.location.pathname);
var isSearchForm = Regex.SEARCH_FORM.test(document.location.pathname);
var isBookingFormFinalStep = Regex.BOOKING_FORM_FINAL_STEP.test(document.location.pathname);

if (isSearchForm) {
  var nationalityRef = document.querySelector('#nationality');
  var modNationalityRef = document.querySelector('#modNationality');

  if (nationalityRef) {
    var _nationalityRef$value;

    nationalityRef.addEventListener('change', function (_ref) {
      var _target$value;

      var target = _ref.target;
      localStorage.setItem('tboholidaysNationality', ((_target$value = target.value) === null || _target$value === void 0 ? void 0 : _target$value.toLowerCase()) || 'en');
    });
    localStorage.setItem('tboholidaysNationality', ((_nationalityRef$value = nationalityRef.value) === null || _nationalityRef$value === void 0 ? void 0 : _nationalityRef$value.toLowerCase()) || 'en');
  }

  if (modNationalityRef) {
    modNationalityRef.addEventListener('change', function (_ref2) {
      var _target$value2;

      var target = _ref2.target;
      localStorage.setItem('tboholidaysNationality', ((_target$value2 = target.value) === null || _target$value2 === void 0 ? void 0 : _target$value2.toLowerCase()) || 'en');
    });
  }
}

if (isHotelPage || isBookingForm) {
  var getFunnelStep = function getFunnelStep() {
    if (isHotelPage) {
      return Page.HOTEL_PAGE;
    }

    if (isBookingForm) {
      return Page.BOOKING_FORM;
    }

    return null;
  };

  var getExternalHotelName = function getExternalHotelName() {
    if (isHotelPage) {
      var inputRef = document.querySelector('input[name="hotelName"');

      if (inputRef) {
        return inputRef.value.trim();
      }

      var breadcrumbRef = document.querySelector('.bredcrum .active');

      if (breadcrumbRef) {
        return breadcrumbRef.textContent.trim();
      }
    }

    if (isBookingForm) {
      var possibleHotelNamesArr = [];
      var breadcrumbs = document.querySelectorAll('.bredcrum span');

      if (breadcrumbs.length >= 3) {
        var breadcrumbsArr = Array.from(breadcrumbs);
        possibleHotelNamesArr.push(breadcrumbsArr.slice(breadcrumbsArr.length - 3, breadcrumbsArr.length - 1).map(function (item) {
          return item.textContent;
        }));
      }

      var hotelNameRef = document.querySelector('.hotel_name');

      if (hotelNameRef) {
        var commaIndex = hotelNameRef.textContent.trim().indexOf(',');

        if (commaIndex !== -1) {
          possibleHotelNamesArr.push(hotelNameRef.textContent.trim().slice(0, commaIndex));
        } else {
          possibleHotelNamesArr.push(hotelNameRef.textContent.trim());
        }
      }

      return possibleHotelNamesArr.flat();
    }

    return null;
  };

  var getExternalId = function getExternalId() {
    var inputGiataHotelRef = document.querySelector('input[name="giataHotelCode"]');

    if (inputGiataHotelRef) {
      return inputGiataHotelRef.value;
    }

    return null;
  };

  var getCheckin = function getCheckin() {
    var inputRef = document.querySelector('input[name="checkInDate"]');

    if (inputRef) {
      return formatDate(inputRef.value);
    }

    var checkinRef = document.querySelector('#chkindate');

    if (checkinRef) {
      var date = checkinRef.textContent.trim();
      return formatDate(date);
    }

    var hotelSearchRefs = document.querySelectorAll('.hotel_search_change b');

    if (hotelSearchRefs.length) {
      var _date = hotelSearchRefs[0].textContent.trim();

      return formatDate(_date);
    }

    return null;
  };

  var getCheckout = function getCheckout() {
    var inputRef = document.querySelector('input[name="checkOutDate"]');

    if (inputRef) {
      return formatDate(inputRef.value);
    }

    var checkoutRef = document.querySelector('#chkoutdate');

    if (checkoutRef) {
      var date = checkoutRef.textContent.trim();
      return formatDate(date);
    }

    var hotelSearchRefs = document.querySelectorAll('.hotel_search_change b');

    if (hotelSearchRefs.length) {
      var _date2 = hotelSearchRefs[1].textContent.trim();

      return formatDate(_date2);
    }

    return null;
  };

  var getAdults = function getAdults() {
    if (isHotelPage) {
      var inputRef = document.querySelector('input[name="noOfRooms"]');

      if (inputRef) {
        var roomsAmount = Number(inputRef.value);
        return _toConsumableArray(Array(roomsAmount).keys()).reduce(function (accum, it) {
          var inputAdultRef = document.querySelector("input[name=\"nAdultCount-".concat(it + 1, "\"]"));

          if (inputAdultRef) {
            accum.push(Number(inputAdultRef.value));
          }

          return accum;
        }, []);
      }
    }

    if (isBookingForm) {
      var roomCountInputRef = document.querySelector('#roomCount');

      if (roomCountInputRef) {
        var _roomsAmount = Number(roomCountInputRef.value);

        return _toConsumableArray(Array(_roomsAmount).keys()).reduce(function (accum, it) {
          var inputAdultRef = document.querySelector("#Room".concat(it + 1, "AdultCount"));

          if (inputAdultRef) {
            accum.push(Number(inputAdultRef.value));
          }

          return accum;
        }, []);
      }
    }

    return null;
  };

  var getChildrenYears = function getChildrenYears() {
    if (isHotelPage) {
      var inputRef = document.querySelector('input[name="noOfRooms"]');

      if (inputRef) {
        var roomsAmount = Number(inputRef.value);
        return _toConsumableArray(Array(roomsAmount).keys()).reduce(function (accum, it) {
          var inputAdultRef = document.querySelector("input[name=\"nChildCount-".concat(it + 1, "\"]"));

          if (inputAdultRef) {
            var childAmount = Number(inputAdultRef.value);

            var ages = _toConsumableArray(Array(childAmount).keys()).reduce(function (agesAccum, child) {
              var inputAgeRef = document.querySelector("input[name=\"nChildAge-".concat(it + 1, "-").concat(child + 1, "\"]"));

              if (inputAgeRef) {
                var age = Number(inputAgeRef.value);
                agesAccum.push(age);
              }

              return agesAccum;
            }, []);

            accum.push(ages);
          }

          return accum;
        }, []);
      }
    }

    if (isBookingForm) {
      var roomsNumber = document.querySelector('#roomCount');

      if (roomsNumber) {
        var rooms = +roomsNumber.value;
        var children = [];

        for (var i = 0; i < rooms; i += 1) {
          children.push([]);
        }

        var roomInfoBoxes = document.querySelectorAll('.details_bx.chldbx .header-bg');

        if (roomInfoBoxes.length) {
          var roomInfoBoxArr = Array.from(roomInfoBoxes); // eslint-disable-next-line array-callback-return

          roomInfoBoxArr.map(function (item) {
            var roomInfo = item.textContent;
            var match = roomInfo.match(/(\d{1,2})/g);

            if (match && match[2]) {
              var room = +match[0];
              var childAge = +match[2];
              children[room - 1].push(childAge);
            }
          });
        }

        return children;
      }
    }

    return null;
  };

  var getRoomsNumber = function getRoomsNumber() {
    if (isHotelPage) {
      var inputRef = document.querySelector('input[name="noOfRooms"]');

      if (inputRef) {
        return Number(inputRef.value);
      }
    }

    if (isBookingForm) {
      var roomCountInputRef = document.querySelector('#roomCount');

      if (roomCountInputRef) {
        return Number(roomCountInputRef.value);
      }
    }

    return null;
  };

  var getMeal = function getMeal() {
    if (isHotelPage) {
      var mealRef = document.querySelector('.singleroom_amint');

      if (mealRef) {
        return mealRef.textContent.trim() !== 'Room Only';
      }

      return null;
    }

    if (isBookingForm) {
      return null;
    }

    return null;
  };

  var getCancellationBefore = function getCancellationBefore() {
    if (isHotelPage) {
      var freeCanRef = document.querySelector('.room_main_panel tr:first-of-type .freeCan_Link');

      if (freeCanRef) {
        var match = freeCanRef.textContent.match(/\d{2}-[\w.]{3,5}-\d{4}/);

        if (match) {
          var _match = _slicedToArray(match, 1),
              date = _match[0];

          return formatDate(date);
        }
      }
    }

    if (isBookingForm) {
      var _freeCanRef = document.querySelector('.alrtmsg span');

      if (_freeCanRef) {
        var _match2 = _freeCanRef.textContent.match(/\d{2}-[\w.]{3,5}-\d{4}/);

        if (_match2) {
          var _match3 = _slicedToArray(_match2, 1),
              _date3 = _match3[0];

          return formatDate(_date3);
        }
      }
    }

    return null;
  };

  var getPrice = function getPrice() {
    if (isHotelPage) {
      var priceRef = document.querySelector('#totalPriceDiv b');

      if (priceRef) {
        var match = priceRef.textContent.match(/[\d,.]+/g);

        if (match.length === 1) {
          var prettyPrice = parsePrice(match[0]);

          if (!Number.isNaN(prettyPrice)) {
            return prettyPrice;
          }
        }

        if (match.length === 2) {
          var _prettyPrice = parsePrice(match[1]);

          if (!Number.isNaN(_prettyPrice)) {
            return _prettyPrice;
          }
        }
      }
    }

    if (isBookingForm) {
      var _document$querySelect, _document$querySelect2;

      var _priceRef = (_document$querySelect = document.querySelector('#prefTotalAmount')) === null || _document$querySelect === void 0 ? void 0 : (_document$querySelect2 = _document$querySelect.textContent) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.trim();

      if (!_priceRef) {
        var _document$querySelect3, _document$querySelect4;

        _priceRef = (_document$querySelect3 = document.querySelector('#TotalAmount')) === null || _document$querySelect3 === void 0 ? void 0 : (_document$querySelect4 = _document$querySelect3.textContent) === null || _document$querySelect4 === void 0 ? void 0 : _document$querySelect4.trim();
      }

      if (_priceRef) {
        var _prettyPrice2 = parsePrice(_priceRef);

        if (!Number.isNaN(_prettyPrice2)) {
          return _prettyPrice2;
        }
      }
    }

    return null;
  };

  var getCurrency = function getCurrency() {
    if (isHotelPage || isBookingForm) {
      return 'USD';
    }

    return null;
  };

  var getRoomName = function getRoomName() {
    if (isHotelPage) {
      var inputRef = document.querySelector('input[name="noOfRooms"]');

      if (inputRef) {
        var roomsAmount = Number(inputRef.value);
        return _toConsumableArray(Array(roomsAmount).keys()).map(function (it) {
          var roomRef = document.querySelector("#roomName-".concat(it));
          return roomRef.textContent.trim();
        }, []);
      }
    }

    if (isBookingForm) {
      var roomNameRef = document.querySelectorAll('.reviewroomname');
      return _toConsumableArray(roomNameRef).map(function (it) {
        return it.textContent.replace(/\s+/g, ' ').trim();
      });
    }

    return null;
  };

  if (isHotelPage) {
    var intervalId = setInterval(function () {
      var loaderRef = document.querySelector('#roomsLoader');

      if (loaderRef) {
        if (loaderRef.style.display === 'none' && !!getPrice()) {
          clearInterval(intervalId);
          var residency = localStorage.getItem('tboholidaysNationality');
          var data = {
            competitor: 'TBO',
            funnel_step: getFunnelStep(),
            external_hotel_name: getExternalHotelName(),
            external_id: getExternalId(),
            checkin: getCheckin(),
            checkout: getCheckout(),
            adults: getAdults(),
            children_years: getChildrenYears(),
            rooms_number: getRoomsNumber(),
            has_meal: getMeal(),
            cancellation_before: getCancellationBefore(),
            is_postpay: false,
            price: getPrice(),
            currency: getCurrency(),
            taxes: 0,
            room_name: getRoomName(),
            residency: residency,
            language: residency,
            html: document.body.outerHTML
          };
          chrome.runtime.sendMessage({
            command: 'SHOW_OFFER',
            data: data
          });
        }
      }
    }, 250);
    setTimeout(function () {
      return clearInterval(intervalId);
    }, 60000);
  }

  if (isBookingForm) {
    var residency = localStorage.getItem('tboholidaysNationality');
    var externalHotelName = getExternalHotelName();
    var data = {
      competitor: 'TBO',
      funnel_step: getFunnelStep(),
      external_hotel_name: externalHotelName,
      external_id: null,
      checkin: getCheckin(),
      checkout: getCheckout(),
      adults: getAdults(),
      children_years: getChildrenYears(),
      rooms_number: getRoomsNumber(),
      has_meal: getMeal(),
      cancellation_before: getCancellationBefore(),
      is_postpay: false,
      price: getPrice(),
      currency: getCurrency(),
      taxes: 0,
      room_name: getRoomName(),
      residency: residency,
      language: residency,
      html: document.body.outerHTML
    };
    chrome.runtime.sendMessage({
      command: 'SHOW_TBO_BF_OFFER',
      data: data
    });
    sessionStorage.setItem('parsedDataFromTBO', JSON.stringify(_objectSpread(_objectSpread({}, data), {}, {
      html: undefined
    })));
  }
} else if (isBookingFormFinalStep) {
  var payLaterBFBtn = document.querySelector('#btn_confirm_booking');
  var payNowBFBtn = document.querySelector('#btn_confirm_and_voucher_booking');

  var getOrderData = function getOrderData() {
    chrome.runtime.sendMessage({
      command: 'GET_TBO_ORDER_DATA',
      data: JSON.parse(sessionStorage.getItem('parsedDataFromTBO') || '{}')
    });
  };

  var interval;

  var getOrderDataAfterBtnIsLoaded = function getOrderDataAfterBtnIsLoaded() {
    if (interval) {
      clearInterval(interval);
    }

    interval = setInterval(function () {
      var yesButton = document.querySelector('#CP');

      if (yesButton) {
        clearInterval(interval);
        yesButton.addEventListener('click', getOrderData);
      }
    }, 200);
  };

  payLaterBFBtn === null || payLaterBFBtn === void 0 ? void 0 : payLaterBFBtn.addEventListener('click', getOrderDataAfterBtnIsLoaded);
  payNowBFBtn === null || payNowBFBtn === void 0 ? void 0 : payNowBFBtn.addEventListener('click', getOrderDataAfterBtnIsLoaded);
} else if (isSearchForm) {
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

  var getGuests = function getGuests(rooms) {
    var guests = [];

    for (var i = 0; i < rooms; i += 1) {
      var _document$querySelect5, _document$querySelect6;

      guests.push({
        adults: 0,
        children: []
      });
      guests[i].adults = +((_document$querySelect5 = document.querySelector("#modAdultCount-".concat(i + 1))) === null || _document$querySelect5 === void 0 ? void 0 : _document$querySelect5.value) || 0;
      var childrenAmount = +((_document$querySelect6 = document.querySelector("#modChildCount-".concat(i + 1))) === null || _document$querySelect6 === void 0 ? void 0 : _document$querySelect6.value);

      if (childrenAmount) {
        for (var k = 0; k < childrenAmount; k += 1) {
          var _document$querySelect7;

          var childAge = +((_document$querySelect7 = document.querySelector("#modChildAge-".concat(i + 1, "-").concat(k + 1))) === null || _document$querySelect7 === void 0 ? void 0 : _document$querySelect7.value) || 0;
          guests[i].children.push(childAge);
        }
      }
    }

    return guests;
  };

  var getDates = function getDates() {
    var _datesBox$textContent;

    var datesBox = document.querySelector('#dispNights span');
    var datesMatch = datesBox === null || datesBox === void 0 ? void 0 : (_datesBox$textContent = datesBox.textContent) === null || _datesBox$textContent === void 0 ? void 0 : _datesBox$textContent.match(/\S{2,}/g);

    if (datesMatch) {
      return datesMatch;
    }

    return null;
  };

  var getData = function getData(hotels) {
    var _document$querySelect8, _document$querySelect9, _document$querySelect10;

    var roomsNumber = +((_document$querySelect8 = document.querySelector('#modNoOfRooms')) === null || _document$querySelect8 === void 0 ? void 0 : _document$querySelect8.value) || 0;
    var guests = getGuests(roomsNumber);
    var city = ((_document$querySelect9 = document.querySelector('.bredtext.active')) === null || _document$querySelect9 === void 0 ? void 0 : _document$querySelect9.textContent) || null;
    var geo = ((_document$querySelect10 = document.querySelector('#dispDestination')) === null || _document$querySelect10 === void 0 ? void 0 : _document$querySelect10.textContent) || null;
    return hotels.map(function (hotel, i) {
      return {
        competitor: 'TBO',
        hotel_name: hotel.Name,
        external_hotel_id: "TBO_".concat(hotel.Name).toUpperCase(),
        latitude: hotel.Latitude,
        longitude: hotel.Longitude,
        star_rating: hotel.StarRating,
        hotel_kind: hotel.PropertyType,
        address: hotel.Address,
        phone: null,
        city: city,
        geo: geo,
        checkin: formatDate(getDates()[0]),
        checkout: formatDate(getDates()[1]),
        guests: guests,
        room_name: new Array(roomsNumber).fill(null),
        meal_type: new Array(roomsNumber).fill(null),
        has_meal: new Array(roomsNumber).fill(null),
        cancellation_before: new Array(roomsNumber).fill(null),
        competitor_price: +hotel.SupplierPrice.toFixed(2),
        competitor_currency: hotel.SupplierCurrency,
        sup_name: hotel.Sources,
        num_in_page: i + 1,
        language: 'en',
        residency: 'gb'
      };
    });
  };

  var injectScript = function injectScript() {
    var script = document.createElement('script');
    script.textContent = "window.postMessage({\n      type: '".concat(DATA_FROM_WINDOW, "',\n      data: window.lastSelected}, \"*\");");
    document.body.appendChild(script);
  };

  var sendDataAfterContentIsLoaded = function sendDataAfterContentIsLoaded(isLoaded) {
    if (isLoaded) {
      injectScript();
      return;
    }

    if (document.querySelector('#resultBlock').style.display === 'table' && document.querySelector('#stillLoading').style.display === 'none' && document.querySelector('#resultLoading').style.display === 'none') {
      sendDataAfterContentIsLoaded(true);
    } else {
      setTimeout(function () {
        sendDataAfterContentIsLoaded(false);
      }, 2000);
    }
  };

  sendDataAfterContentIsLoaded(false);
}