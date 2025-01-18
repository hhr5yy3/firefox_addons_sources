"use strict";

var _months;

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Page = {
  HOTEL_PAGE: 'hotelpage'
};
var Regex = {
  HOTEL_PAGE: /\/\w{2}\/hotel\/\d+\//
};
var Language = {
  EN: 'en',
  RU: 'ru'
};
var Currency = {
  $: 'USD',
  '€': 'EUR',
  '₽': 'RUB'
};
var months = (_months = {}, _defineProperty(_months, Language.RU, ['янв.', 'фев.', 'мар.', 'апр.', 'мая', 'июн.', 'июл.', 'авг.', 'сент.', 'окт.', 'нояб.', 'дек.']), _defineProperty(_months, Language.EN, ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']), _months);

var parsePrice = function parsePrice(price) {
  return parseFloat(price.replace(/[.,  ](?!\d{1,2}$)/g, '').replace(',', '.'));
};

var formatDate = function formatDate(date, language) {
  var _date$split = date.split(' '),
      _date$split2 = _slicedToArray(_date$split, 3),
      day = _date$split2[0],
      month = _date$split2[1],
      year = _date$split2[2];

  return "".concat(year, "-").concat("".concat(months[language].findIndex(function (val) {
    return val === month;
  }) + 1).padStart(2, '0'), "-").concat(day);
};

var isHotelPage = Regex.HOTEL_PAGE.test(document.location.pathname);

if (isHotelPage) {
  var parse = function parse() {
    var _, _cheapestRate$querySe;

    var language = (_ = (document.location.pathname.match(/^\/(\w{2})\//) || [])[1]) !== null && _ !== void 0 ? _ : 'ru';
    var roomCards = document.querySelectorAll('.room-offer-card');

    var cheapestRate = _toConsumableArray(roomCards).sort(function (card1, card2) {
      var price1Ref = card1.querySelector('.offer-detail__price');
      var price2Ref = card2.querySelector('.offer-detail__price');

      if (price1Ref && price2Ref) {
        var price1 = (price1Ref.textContent.match(/\((.+)\)/) || [])[1] || price1Ref.textContent;
        var price2 = (price2Ref.textContent.match(/\((.+)\)/) || [])[1] || price2Ref.textContent;
        return parseInt(price1.replace(/\s+/g, ''), 10) - parseInt(price2.replace(/\s+/g, ''), 10);
      }

      return 0;
    })[0];

    var externalHotelName = cheapestRate === null || cheapestRate === void 0 ? void 0 : (_cheapestRate$querySe = cheapestRate.querySelector('.room-offer-card-header__title')) === null || _cheapestRate$querySe === void 0 ? void 0 : _cheapestRate$querySe.textContent.trim();

    var getCheckin = function getCheckin() {
      var inputRef = document.querySelectorAll('.daterange-form-field__input')[0];

      if (inputRef) {
        return formatDate(inputRef.value.toLowerCase(), language);
      }

      return null;
    };

    var getCheckout = function getCheckout() {
      var inputRef = document.querySelectorAll('.daterange-form-field__input')[1];

      if (inputRef) {
        return formatDate(inputRef.value.toLowerCase(), language);
      }

      return null;
    };

    var getAdults = function getAdults() {
      var priceRef = cheapestRate === null || cheapestRate === void 0 ? void 0 : cheapestRate.querySelector('.offer-detail__guests');

      if (priceRef) {
        return [parseInt(cheapestRate.querySelector('.offer-detail__guests').textContent.split(',')[1], 10)];
      }

      return null;
    };

    var getPrice = function getPrice() {
      var priceRef = cheapestRate === null || cheapestRate === void 0 ? void 0 : cheapestRate.querySelector('.offer-detail__price');

      if (priceRef) {
        return parseInt(priceRef.textContent.replace(/\s+/g, ''), 10);
      }

      return null;
    };

    var getCurrency = function getCurrency() {
      var priceRef = cheapestRate === null || cheapestRate === void 0 ? void 0 : cheapestRate.querySelector('.offer-detail__price');

      if (priceRef) {
        var _price = priceRef.textContent.split('(')[0];
        var currency = (_price.replace(/\s+/g, '').match(/[^\d. ]/) || [])[0];
        return Currency[currency];
      }

      return null;
    };

    var price = getPrice();
    var data = {
      adults: getAdults(),
      cancellation_before: null,
      checkin: getCheckin(),
      checkout: getCheckout(),
      children_years: [[]],
      competitor: 'HTB',
      currency: getCurrency(),
      external_hotel_name: externalHotelName,
      external_id: +(document.location.pathname.match(/\/\w{2}\/hotel\/(\d+)\//) || [])[1],
      funnel_step: Page.HOTEL_PAGE,
      has_meal: null,
      html: document.body.outerHTML,
      is_postpay: false,
      language: 'ru',
      price: price && parsePrice("".concat(price)),
      residency: 'ru',
      room_name: null,
      rooms_number: 1,
      taxes: 0
    };
    chrome.runtime.sendMessage({
      command: 'SHOW_OFFER',
      data: data
    });
  };

  var timerId = setInterval(function () {
    if (document.querySelector('.room-offer-card')) {
      clearInterval(timerId);
      parse();
    }
  }, 250);
} else {
  chrome.runtime.sendMessage({
    command: 'SHOW_OFFER',
    data: null
  });
}