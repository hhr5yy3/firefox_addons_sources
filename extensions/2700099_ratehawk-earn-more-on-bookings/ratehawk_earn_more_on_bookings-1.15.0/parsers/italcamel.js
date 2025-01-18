"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// @ts-ignore
var Page = {
  BOOKING_FORM: 'booking_form'
}; // @ts-ignore

var Regex = {
  BOOKING_FORM: /BookingHotel/
}; // @ts-ignore

var isBookingForm = Regex.BOOKING_FORM.test(document.location.pathname); // @ts-ignore

var parsePrice = function parsePrice(price) {
  return parseFloat(price.replace(/[.,  ](?!\d{1,2}$)/g, '').replace(',', '.'));
}; // @ts-ignore


var DEFAULT_CHILDREN_AGE = 10; // @ts-ignore

var currencies = {
  AED: 'AED',
  AFN: 'AFN',
  ARS: 'AR$',
  AUD: 'AUD',
  BDT: 'Tk',
  BGN: 'лв',
  BHD: 'BHD',
  BRL: 'R$',
  CAD: 'CAD',
  CHF: 'CHF',
  CNY: 'RMB',
  CZK: 'Kč',
  DKK: 'DKK',
  EGP: 'EGP',
  EUR: '€',
  FJD: 'FJ$',
  GBP: '£',
  HKD: 'HKD',
  HUF: 'Ft',
  IDR: 'Rp',
  ILS: '₪',
  INR: 'Rs.',
  JOD: 'JOD',
  JPY: '¥',
  KHR: '៛',
  KRW: '₩',
  KWD: 'KWD',
  KZT: '₸',
  LAK: '₭',
  MVR: 'Rf',
  MXN: 'MXN',
  MYR: 'RM',
  NGN: '₦',
  NOK: 'NOK',
  NZD: 'NZD',
  OMR: 'OMR',
  PHP: '₱',
  PKR: 'PKR',
  PLN: 'zł',
  QAR: 'QAR',
  RON: 'lei',
  RUB: '₽',
  SAR: 'SAR',
  SEK: 'SEK',
  SGD: 'SGD',
  THB: '฿',
  TRY: 'TL',
  TWD: 'NT$',
  UAH: 'грн',
  USD: '$',
  VND: '₫',
  XPF: 'XPF',
  ZAR: 'R'
};

if (isBookingForm) {
  var getFunnelStep = function getFunnelStep() {
    if (isBookingForm) {
      return Page.BOOKING_FORM;
    }

    return null;
  };

  var getCheckin = function getCheckin() {
    if (isBookingForm) {
      var _dates$textContent;

      var dates = document.querySelector('.booking-recap-body-room div.ng-binding');
      var dateMatch = dates === null || dates === void 0 ? void 0 : (_dates$textContent = dates.textContent) === null || _dates$textContent === void 0 ? void 0 : _dates$textContent.match(/(\d{2}\/\d{2}\/\d{4})/g);

      if (dateMatch && dateMatch[0]) {
        return dateMatch[0].split('/').reverse().join('-');
      }
    }

    return null;
  };

  var getCheckout = function getCheckout() {
    if (isBookingForm) {
      var _dates$textContent2;

      var dates = document.querySelector('.booking-recap-body-room div.ng-binding');
      var dateMatch = dates === null || dates === void 0 ? void 0 : (_dates$textContent2 = dates.textContent) === null || _dates$textContent2 === void 0 ? void 0 : _dates$textContent2.match(/(\d{2}\/\d{2}\/\d{4})/g);

      if (dateMatch && dateMatch[1]) {
        return dateMatch[1].split('/').reverse().join('-');
      }
    }

    return null;
  };

  var getExternalHotelName = function getExternalHotelName() {
    if (isBookingForm) {
      var hotelNameBox = document.querySelector('.booking-recap-body-hotel h5.ng-binding');

      if (hotelNameBox) {
        return hotelNameBox.textContent;
      }
    }

    return null;
  };

  var getExternalId = function getExternalId() {
    if (isBookingForm) {
      var _img$getAttribute;

      var img = document.querySelector('.booking-recap-body-hotel img');
      var idMatch = img === null || img === void 0 ? void 0 : (_img$getAttribute = img.getAttribute('ng-src')) === null || _img$getAttribute === void 0 ? void 0 : _img$getAttribute.match(/(?<=structures\/)(.+)(?=\/)/);
      return idMatch && idMatch[0];
    }

    return null;
  };

  var getMeal = function getMeal() {
    if (isBookingForm) {
      var roomInfo = document.querySelectorAll('div.booking-room-body-occupation');

      if (roomInfo.length) {
        var roomInfoArr = Array.from(roomInfo);
        var mealInfoArr = roomInfoArr.map(function (item) {
          var infoRows = item.querySelectorAll('span.ng-binding');

          if (infoRows[3]) {
            var mealType = infoRows[3].textContent;
            return ['завтраки', 'полупансион', 'alojamiento y desayuno', 'média pensión', 'bett & frühstück', 'halb pension', 'bed & breakfast', 'half board', 'chambre & petit déjeune', 'demi pension', 'camera e prima colazione', 'mezza pensione'].some(function (meal) {
              return mealType === null || mealType === void 0 ? void 0 : mealType.toLowerCase().includes(meal);
            });
          }

          return null;
        });
        return mealInfoArr[0];
      }
    }

    return null;
  };

  var getMealType = function getMealType() {
    if (isBookingForm) {
      var roomInfo = document.querySelectorAll('div.booking-room-body-occupation');

      if (roomInfo.length) {
        var roomInfoArr = Array.from(roomInfo);
        return roomInfoArr.map(function (item) {
          var infoRows = item.querySelectorAll('span.ng-binding');

          if (infoRows[3]) {
            return infoRows[3].textContent;
          }

          return null;
        });
      }
    }

    return null;
  };

  var getCancellationBefore = function getCancellationBefore() {
    if (isBookingForm) {
      var roomHeaders = document.querySelectorAll('div.booking-room-head');

      if (roomHeaders.length) {
        var _strongs$, _strongs$$textContent;

        var strongs = document.querySelectorAll('.booking-status-timelimit strong.ng-binding');

        if (strongs[4] && !strongs[4].classList.contains('ng-hide')) {
          return new Array(roomHeaders.length).fill(null)[0];
        }

        var dateMatch = (_strongs$ = strongs[3]) === null || _strongs$ === void 0 ? void 0 : (_strongs$$textContent = _strongs$.textContent) === null || _strongs$$textContent === void 0 ? void 0 : _strongs$$textContent.match(/(\d{2}\/\d{2}\/\d{4})/g);

        if (dateMatch && dateMatch[0]) {
          var prettyDate = dateMatch[0].split('/').reverse().join('-');
          return new Array(roomHeaders.length).fill(prettyDate)[0];
        }
      }
    }

    return null;
  };

  var getPostPay = function getPostPay() {
    if (isBookingForm) {
      var roomHeaders = document.querySelectorAll('div.booking-room-head');

      if (roomHeaders.length) {
        return new Array(roomHeaders.length).fill(false)[0];
      }
    }

    return null;
  };

  var getRoomName = function getRoomName() {
    if (isBookingForm) {
      var roomInfo = document.querySelectorAll('div.booking-room-body-occupation');

      if (roomInfo.length) {
        var roomInfoArr = Array.from(roomInfo);
        return roomInfoArr.map(function (item) {
          var infoRows = item.querySelectorAll('span.ng-binding');

          if (infoRows[1]) {
            return infoRows[1].textContent;
          }

          return null;
        });
      }
    }

    return null;
  };

  var getPrice = function getPrice() {
    if (isBookingForm) {
      var priceBlock = document.querySelector('div.booking-recap-body-total td.ng-binding');

      if (priceBlock) {
        var _priceBlock$textConte;

        var priceMatch = (_priceBlock$textConte = priceBlock.textContent) === null || _priceBlock$textConte === void 0 ? void 0 : _priceBlock$textConte.match(/[\d,.]+/);

        if (priceMatch) {
          return parsePrice(priceMatch[0]);
        }
      }
    }

    return null;
  };

  var getTaxes = function getTaxes() {
    if (isBookingForm) {
      var roomHeaders = document.querySelectorAll('div.booking-room-head');

      if (roomHeaders.length) {
        return new Array(roomHeaders.length).fill(0)[0];
      }
    }

    return null;
  };

  var getRoomsNumber = function getRoomsNumber() {
    if (isBookingForm) {
      var roomHeaders = document.querySelectorAll('div.booking-room-head');

      if (roomHeaders.length) {
        return roomHeaders.length;
      }
    }

    return null;
  };

  var getAdults = function getAdults() {
    if (isBookingForm) {
      var roomInfo = document.querySelectorAll('div.booking-room-body-occupation');

      if (roomInfo.length) {
        var roomInfoArr = Array.from(roomInfo);
        return roomInfoArr.map(function (item) {
          var infoRows = item.querySelectorAll('span.ng-binding');

          if (infoRows[5]) {
            var guestsInfo = infoRows[5].textContent;
            var match = guestsInfo === null || guestsInfo === void 0 ? void 0 : guestsInfo.match(/(\d)/g);

            if (match && match[0]) {
              return +match[0];
            }
          }

          return null;
        });
      }
    }

    return null;
  };

  var getChildrenYears = function getChildrenYears() {
    if (isBookingForm) {
      var roomInfo = document.querySelectorAll('div.booking-room-body-occupation');

      if (roomInfo.length) {
        var roomInfoArr = Array.from(roomInfo);
        return roomInfoArr.map(function (item) {
          var infoRows = item.querySelectorAll('span.ng-binding');

          if (infoRows[5]) {
            var guestsInfo = infoRows[5].textContent;
            var match = guestsInfo === null || guestsInfo === void 0 ? void 0 : guestsInfo.match(/(\d)/g);

            if (match && match[1]) {
              return new Array(+match[1]).fill(DEFAULT_CHILDREN_AGE);
            }

            return [];
          }

          return null;
        });
      }
    }

    return null;
  };

  var getCurrency = function getCurrency() {
    if (isBookingForm) {
      var priceBlock = document.querySelector('div.booking-recap-body-total td.ng-binding');

      if (priceBlock) {
        var _priceBlock$textConte2;

        if ((_priceBlock$textConte2 = priceBlock.textContent) !== null && _priceBlock$textConte2 !== void 0 && _priceBlock$textConte2.includes('€')) {
          return 'EUR';
        }

        var currency;
        var currenciesArr = Object.entries(currencies);

        for (var i = 0; i < currenciesArr.length; i += 1) {
          var _priceBlock$textConte3;

          if ((_priceBlock$textConte3 = priceBlock.textContent) !== null && _priceBlock$textConte3 !== void 0 && _priceBlock$textConte3.includes(currenciesArr[i][1])) {
            var _currenciesArr$i = _slicedToArray(currenciesArr[i], 1);

            currency = _currenciesArr$i[0];
            break;
          }
        }

        return currency;
      }
    }

    return null;
  };

  var data = {
    adults: getAdults(),
    cancellation_before: getCancellationBefore(),
    checkin: getCheckin(),
    checkout: getCheckout(),
    children_years: getChildrenYears(),
    competitor: 'ITC',
    currency: getCurrency(),
    external_hotel_name: getExternalHotelName(),
    external_id: getExternalId(),
    funnel_step: getFunnelStep(),
    has_meal: getMeal(),
    html: document.body.outerHTML,
    is_postpay: getPostPay(),
    language: 'en',
    meal_type: getMealType(),
    price: getPrice(),
    residency: 'it',
    room_name: getRoomName(),
    rooms_number: getRoomsNumber(),
    taxes: getTaxes()
  };
  chrome.runtime.sendMessage({
    command: 'SHOW_OFFER',
    data: data
  });
} else {
  chrome.runtime.sendMessage({
    command: 'SHOW_OFFER',
    data: null
  });
}