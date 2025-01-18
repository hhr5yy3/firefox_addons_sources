"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// @ts-ignore
var Regex = {
  BOOKING_FORM: /\/booking/
}; // @ts-ignore

var isBookingForm = Regex.BOOKING_FORM.test(window.location.pathname); // @ts-ignore

var parsePrice = function parsePrice(price) {
  return parseFloat(price.replace(/[.,  ](?!\d{1,2}$)/g, '').replace(',', '.'));
}; // @ts-ignore


var reverseDate = function reverseDate(date, separator) {
  return date.split(separator).reverse().join('-');
};

if (isBookingForm) {
  var getExternalHotelName = function getExternalHotelName() {
    if (isBookingForm) {
      var _document$querySelect, _document$querySelect2;

      return ((_document$querySelect = document.querySelector('.bookingSummaryAbodeInfo-hotelName')) === null || _document$querySelect === void 0 ? void 0 : (_document$querySelect2 = _document$querySelect.textContent) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.trim()) || null;
    }

    return null;
  };

  var getId = function getId() {
    if (isBookingForm) {
      var name = getExternalHotelName();
      return name && name.toUpperCase();
    }

    return null;
  };

  var getCheckin = function getCheckin() {
    if (isBookingForm) {
      var _document$querySelect3, _document$querySelect4, _document$querySelect5;

      var date = ((_document$querySelect3 = document.querySelector('.bookingSummaryAbodeInfo-descCell')) === null || _document$querySelect3 === void 0 ? void 0 : (_document$querySelect4 = _document$querySelect3.textContent) === null || _document$querySelect4 === void 0 ? void 0 : (_document$querySelect5 = _document$querySelect4.match(/\d{2}.\d{2}.\d{4}/g)) === null || _document$querySelect5 === void 0 ? void 0 : _document$querySelect5[0]) || null;
      return date && reverseDate(date, '.');
    }

    return null;
  };

  var getCheckout = function getCheckout() {
    if (isBookingForm) {
      var _document$querySelect6, _document$querySelect7, _document$querySelect8;

      var date = ((_document$querySelect6 = document.querySelector('.bookingSummaryAbodeInfo-descCell')) === null || _document$querySelect6 === void 0 ? void 0 : (_document$querySelect7 = _document$querySelect6.textContent) === null || _document$querySelect7 === void 0 ? void 0 : (_document$querySelect8 = _document$querySelect7.match(/\d{2}.\d{2}.\d{4}/g)) === null || _document$querySelect8 === void 0 ? void 0 : _document$querySelect8[1]) || null;
      return date && reverseDate(date, '.');
    }

    return null;
  };

  var getAdults = function getAdults() {
    if (isBookingForm) {
      var adults = [];
      Array.from(document.querySelectorAll('.bookingSummaryAbodeInfoPlacing-tourist')).forEach(function (el) {
        var _el$textContent;

        if (!((_el$textContent = el.textContent) !== null && _el$textContent !== void 0 && _el$textContent.includes('Турист без места'))) {
          adults.push.apply(adults, _toConsumableArray(el.querySelectorAll('.fa-male')));
        }
      });
      return [adults.length];
    }

    return null;
  };

  var getChildrenYears = function getChildrenYears() {
    if (isBookingForm) {
      var DEFAULT_CHILDREN_AGE = 10;
      var children = [];
      Array.from(document.querySelectorAll('.bookingSummaryAbodeInfoPlacing-tourist')).forEach(function (el) {
        children.push.apply(children, _toConsumableArray(el.querySelectorAll('.fa-child')));
      });
      return [Array(children.length).fill(DEFAULT_CHILDREN_AGE)];
    }

    return null;
  };

  var getCancellationBefore = function getCancellationBefore() {
    if (isBookingForm) {
      var _document$querySelect9, _document$querySelect10, _document$querySelect11, _document$querySelect12;

      var date = ((_document$querySelect9 = document.querySelectorAll('.bookingPaymentSchedule-date')) === null || _document$querySelect9 === void 0 ? void 0 : (_document$querySelect10 = _document$querySelect9[1]) === null || _document$querySelect10 === void 0 ? void 0 : (_document$querySelect11 = _document$querySelect10.textContent) === null || _document$querySelect11 === void 0 ? void 0 : (_document$querySelect12 = _document$querySelect11.match(/\d{2}.\d{2}.\d{4}/)) === null || _document$querySelect12 === void 0 ? void 0 : _document$querySelect12[0]) || null;
      return date && reverseDate(date, '.');
    }

    return null;
  };

  var getRoomName = function getRoomName() {
    if (isBookingForm) {
      var _document$querySelect13;

      return [((_document$querySelect13 = document.querySelector('.bookingSummaryAbodeInfo-roomName')) === null || _document$querySelect13 === void 0 ? void 0 : _document$querySelect13.textContent) || null];
    }

    return null;
  };

  var getPrice = function getPrice() {
    var _priceElement$textCon, _priceElement$textCon2;

    var priceElement = document.querySelector('.bookingTotalCost-value') || document.querySelector('.bookingTotalCost-sumValue');
    var price = priceElement === null || priceElement === void 0 ? void 0 : (_priceElement$textCon = priceElement.textContent) === null || _priceElement$textCon === void 0 ? void 0 : (_priceElement$textCon2 = _priceElement$textCon.match(/[\d,.]+/g)) === null || _priceElement$textCon2 === void 0 ? void 0 : _priceElement$textCon2.join('');
    return price && parsePrice(price);
  };

  var getData = function getData() {
    return {
      competitor: 'ALN',
      funnel_step: 'booking_form',
      external_hotel_name: getExternalHotelName(),
      external_id: getId(),
      checkin: getCheckin(),
      checkout: getCheckout(),
      adults: getAdults(),
      children_years: getChildrenYears(),
      residency: 'ru',
      meal_type: null,
      has_meal: null,
      cancellation_before: getCancellationBefore(),
      is_postpay: [false],
      taxes: [0],
      room_name: getRoomName(),
      price: getPrice(),
      currency: 'RUB',
      language: 'ru'
    };
  };

  var interval = setInterval(function () {
    if (document.querySelector('.bookingSummaryAbodeInfo-hotelName') && !document.querySelector('.grandLoader')) {
      clearInterval(interval);
      chrome.runtime.sendMessage({
        command: 'SHOW_OFFER',
        data: getData()
      });
    }
  }, 2000);
}