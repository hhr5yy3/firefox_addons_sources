"use strict";

var _mealLabels;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Page = {
  HOTEL_PAGE: 'hotelpage',
  BOOKING_FORM: 'booking_form'
};
var Regex = {
  HOTEL_PAGE: /\/hotel\/hotels/,
  BOOKING_FORM: /\/checkout/
};
var months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
var shortMonths = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
var Language = {
  RU: 'ru',
  EN: 'en'
};
var mealLabels = (_mealLabels = {}, _defineProperty(_mealLabels, Language.EN, ['Breakfast Continental', 'Breakfast English']), _defineProperty(_mealLabels, Language.RU, ['Завтрак Континентальный']), _mealLabels);

var parsePrice = function parsePrice(price) {
  return parseFloat(price.replace(/[.,  ](?!\d{1,2}$)/g, '').replace(',', '.'));
};

var isHotelPage = Regex.HOTEL_PAGE.test(document.location.pathname);
var isBookingForm = Regex.BOOKING_FORM.test(document.location.pathname);

if (isHotelPage || isBookingForm) {
  var getLanguage = function getLanguage() {
    return document.documentElement.lang.toLowerCase() || 'en';
  };

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
      var titleRef = document.querySelector('h1') || document.querySelector('[class^="style__Title-"]') || document.querySelector('[class^="style__Place-"]');

      if (titleRef) {
        return titleRef.textContent.trim();
      }
    }

    if (isBookingForm) {
      var _titleRef = document.querySelector('[class^="style__Title-"]');

      if (_titleRef) {
        return _titleRef.textContent.trim();
      }
    }

    return null;
  };

  var getCheckin = function getCheckin() {
    if (isHotelPage) {
      var urlSearchParams = new URLSearchParams(window.location.search);
      var checkIn = urlSearchParams.get('checkin');

      if (checkIn) {
        return checkIn;
      }
    }

    if (isBookingForm) {
      var dateRef = document.querySelectorAll('.reservation-info-wrapper .wrapper__item:nth-child(1) .info__dates span')[0];

      if (dateRef) {
        var dateString = dateRef.textContent.trim();

        var _dateString$split = dateString.split(' '),
            _dateString$split2 = _slicedToArray(_dateString$split, 3),
            day = _dateString$split2[0],
            month = _dateString$split2[1],
            year = _dateString$split2[2];

        var formattedMonth = "".concat(months.indexOf(month.toLowerCase()) + 1);
        return "".concat(year, "-").concat(formattedMonth.padStart(2, '0'), "-").concat(day.padStart(2, '0'));
      }
    }

    return null;
  };

  var getCheckout = function getCheckout() {
    if (isHotelPage) {
      var urlSearchParams = new URLSearchParams(window.location.search);
      var checkOut = urlSearchParams.get('checkout');

      if (checkOut) {
        return checkOut;
      }
    }

    if (isBookingForm) {
      var dateRef = document.querySelectorAll('.reservation-info-wrapper .wrapper__item:nth-child(2) .info__dates span')[0];

      if (dateRef) {
        var dateString = dateRef.textContent.trim();

        var _dateString$split3 = dateString.split(' '),
            _dateString$split4 = _slicedToArray(_dateString$split3, 3),
            day = _dateString$split4[0],
            month = _dateString$split4[1],
            year = _dateString$split4[2];

        var formattedMonth = "".concat(months.indexOf(month.toLowerCase()) + 1);
        return "".concat(year, "-").concat(formattedMonth.padStart(2, '0'), "-").concat(day.padStart(2, '0'));
      }
    }

    return null;
  };

  var getAdults = function getAdults() {
    if (isHotelPage) {
      var urlSearchParams = new URLSearchParams(window.location.search);
      var paxes = urlSearchParams.getAll('pax');

      if (paxes.length) {
        return paxes.map(function (paxString) {
          var _paxString$split = paxString.split(','),
              _paxString$split2 = _slicedToArray(_paxString$split, 1),
              adults = _paxString$split2[0];

          return parseInt(adults, 10);
        });
      }
    }

    if (isBookingForm) {
      var dateRef = document.querySelectorAll('.reservation-info-wrapper .wrapper__item:nth-child(3) .info__dates span')[0];

      if (dateRef) {
        var match = dateRef.textContent.match(/\d+/g);

        if (match && match[1]) {
          return [parseInt(match[1], 10)];
        }
      }
    }

    return null;
  };

  var getChildrenYears = function getChildrenYears() {
    if (isHotelPage) {
      var urlSearchParams = new URLSearchParams(window.location.search);
      var paxes = urlSearchParams.getAll('pax');

      if (paxes.length) {
        return paxes.map(function (paxString) {
          var _paxString$split3 = paxString.split(','),
              _paxString$split4 = _toArray(_paxString$split3),
              children = _paxString$split4.slice(1);

          return children.map(function (child) {
            return parseInt(child, 10);
          });
        });
      }
    }

    if (isBookingForm) {
      var dateRef = document.querySelectorAll('.reservation-info-wrapper .wrapper__item:nth-child(3) .info__dates span')[0];

      if (dateRef) {
        var match = dateRef.textContent.match(/\d+/g);

        if (match && match[2]) {
          var children = parseInt(match[2], 10);
          return [Array(children).fill(12)];
        }
      }
    }

    return [[]];
  };

  var getRoomsNumber = function getRoomsNumber() {
    if (isHotelPage) {
      var urlSearchParams = new URLSearchParams(window.location.search);
      return urlSearchParams.getAll('pax').length;
    }

    if (isBookingForm) {
      return 1;
    }

    return null;
  };

  var getMeal = function getMeal() {
    if (isBookingForm) {
      var mealRef = document.querySelector('.room-info-spec');

      if (mealRef) {
        var language = getLanguage();
        var mealString = mealRef.textContent.trim();
        return mealLabels[language].includes(mealString);
      }
    }

    return null;
  };

  var getCancellationBefore = function getCancellationBefore() {
    if (isBookingForm) {
      var dateRef = document.querySelector('.spec-date');

      if (dateRef) {
        var dateString = dateRef.textContent.trim();

        var _dateString$split$rev = dateString.split(' ').reverse(),
            _dateString$split$rev2 = _slicedToArray(_dateString$split$rev, 3),
            year = _dateString$split$rev2[0],
            month = _dateString$split$rev2[1],
            day = _dateString$split$rev2[2];

        var formattedMonth = "".concat(shortMonths.indexOf(month.toLowerCase()) + 1).padStart(2, '0');
        var formattedDay = day.padStart(2, '0');
        return "".concat(year, "-").concat(formattedMonth, "-").concat(formattedDay);
      }
    }

    return null;
  };

  var getPostPay = function getPostPay() {
    if (isBookingForm) {
      return false;
    }

    return null;
  };

  var getPrice = function getPrice() {
    if (isHotelPage) {
      var priceRefs = document.querySelectorAll('[class^="style__TotalPriceDetails"] [class^="style__Currency"]');

      if (priceRefs.length) {
        var prices = _toConsumableArray(priceRefs).map(function (priceRef) {
          var priceString = priceRef.textContent.trim();

          var _priceString$split = priceString.split(' '),
              _priceString$split2 = _slicedToArray(_priceString$split, 2),
              price = _priceString$split2[1];

          return parseInt(price, 10);
        });

        return prices.sort(function (a, b) {
          return a - b;
        })[0];
      }
    }

    if (isBookingForm) {
      var priceRef = document.querySelector('.total-cost-value');

      if (priceRef) {
        var priceString = priceRef.textContent.trim();

        var _priceString$split3 = priceString.split(' '),
            _priceString$split4 = _slicedToArray(_priceString$split3, 2),
            _price = _priceString$split4[1];

        return parseInt(_price, 10);
      }
    }

    return null;
  };

  var getCurrency = function getCurrency() {
    if (isHotelPage) {
      var urlSearchParams = new URLSearchParams(window.location.search);
      var currencyParam = urlSearchParams.get('currency');

      if (currencyParam) {
        return currencyParam;
      }

      var priceRefs = document.querySelectorAll('[class^="style__TotalPriceDetails-"] [class^="style__Currency-"]');

      if (priceRefs.length) {
        var priceString = priceRefs[0].textContent.trim();

        var _priceString$split5 = priceString.split(' '),
            _priceString$split6 = _slicedToArray(_priceString$split5, 1),
            currency = _priceString$split6[0];

        return currency;
      }
    }

    if (isBookingForm) {
      var priceRef = document.querySelector('.total-cost-value');

      if (priceRef) {
        var _priceString = priceRef.textContent.trim();

        var _priceString$split7 = _priceString.split(' '),
            _priceString$split8 = _slicedToArray(_priceString$split7, 1),
            _currency = _priceString$split8[0];

        return _currency;
      }
    }

    return null;
  };

  var getRoomName = function getRoomName() {
    if (isHotelPage) {
      var priceRefs = document.querySelectorAll('[class^="style__TotalPriceDetails-"] [class^="style__Currency-"]');

      if (priceRefs.length) {
        var prices = _toConsumableArray(priceRefs).map(function (priceRef) {
          var priceString = priceRef.textContent.trim();

          var _priceString$split9 = priceString.split(' '),
              _priceString$split10 = _slicedToArray(_priceString$split9, 2),
              price = _priceString$split10[1];

          var roomNameRef = priceRef.closest('[class^="style__Room-"]').querySelector('[class^="style__RoomTitle-"] span').innerText.trim().split('\n').map(function (name) {
            return name.replace(/Room \d+ - /, '');
          });
          return {
            price: parseInt(price, 10),
            roomName: roomNameRef
          };
        });

        var sortedPrice = prices.sort(function (a, b) {
          return a.price - b.price;
        });
        return sortedPrice[0].roomName;
      }
    }

    if (isBookingForm) {
      var roomNameRef = document.querySelector('.room-info-room-name');

      if (roomNameRef) {
        return roomNameRef.textContent.trim();
      }
    }

    return null;
  };

  var getResidency = function getResidency() {
    if (isHotelPage) {
      var urlSearchParams = new URLSearchParams(window.location.search);
      var residency = urlSearchParams.get('client_nationality');

      if (residency) {
        localStorage.setItem('hotelspro-residency', residency.toLowerCase());
        return residency.toLowerCase();
      }
    }

    if (isBookingForm) {
      return localStorage.getItem('hotelspro-residency');
    }

    return null;
  };

  var price = getPrice();
  var intervalId = setInterval(function () {
    var externalHotelName = getExternalHotelName();

    if (externalHotelName) {
      clearInterval(intervalId);
      var data = {
        competitor: 'HTP',
        funnel_step: getFunnelStep(),
        external_hotel_name: externalHotelName,
        external_id: externalHotelName,
        checkin: getCheckin(),
        checkout: getCheckout(),
        adults: getAdults(),
        children_years: getChildrenYears(),
        rooms_number: getRoomsNumber(),
        has_meal: getMeal(),
        cancellation_before: getCancellationBefore(),
        is_postpay: getPostPay(),
        price: price && parsePrice("".concat(price)),
        currency: getCurrency(),
        taxes: 0,
        room_name: getRoomName(),
        residency: getResidency(),
        language: getLanguage(),
        html: document.body.outerHTML
      };
      chrome.runtime.sendMessage({
        command: 'SHOW_OFFER',
        data: data
      });
    }
  }, 250);
  setTimeout(function () {
    return clearInterval(intervalId);
  }, 10000);
}