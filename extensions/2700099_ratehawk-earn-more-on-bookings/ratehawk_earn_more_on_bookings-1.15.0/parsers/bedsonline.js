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
  BOOKING_FORM: 'booking_form'
};
var Regex = {
  BOOKING_FORM: /\/personal\/basket/
};

var parsePrice = function parsePrice(price) {
  return parseFloat(price.replace(/[.,  ](?!\d{1,2}$)/g, '').replace(',', '.'));
};

var isBookingForm = Regex.BOOKING_FORM.test(document.location.pathname);

if (isBookingForm) {
  var parseHotel = function parseHotel(roomRef) {
    var detailRef = roomRef.querySelector('.detail');

    if (!detailRef) {
      return null;
    }

    var rateKey = detailRef.dataset.ratekey;

    var _rateKey$split = rateKey.split('|'),
        _rateKey$split2 = _slicedToArray(_rateKey$split, 11),
        checkIn = _rateKey$split2[0],
        checkOut = _rateKey$split2[1],
        externalId = _rateKey$split2[4],
        type = _rateKey$split2[7],
        childrenYears = _rateKey$split2[10];

    var getExternalHotelName = function getExternalHotelName() {
      var hotelNameRef = roomRef.querySelector('.basket-hotel-name');
      return hotelNameRef && hotelNameRef.textContent.trim();
    };

    var getCheckin = function getCheckin() {
      var year = checkIn.slice(0, 4);
      var month = checkIn.slice(4, 6);
      var day = checkIn.slice(6);
      return "".concat(year, "-").concat(month, "-").concat(day);
    };

    var getCheckout = function getCheckout() {
      var year = checkOut.slice(0, 4);
      var month = checkOut.slice(4, 6);
      var day = checkOut.slice(6);
      return "".concat(year, "-").concat(month, "-").concat(day);
    };

    var getAdults = function getAdults() {
      var adults = detailRef.dataset.adults;
      return [parseInt(adults, 10)];
    };

    var getChildrenYears = function getChildrenYears() {
      var children = childrenYears.split('~');
      return [children.filter(function (child) {
        return child;
      }).map(function (year) {
        return parseInt(year, 10);
      })];
    };

    var getMeal = function getMeal() {
      return type === 'BB';
    };

    var getCancellationBefore = function getCancellationBefore() {
      var cancellationRef = roomRef.querySelector('span[style="color: red"]');

      if (cancellationRef) {
        var content = cancellationRef.textContent.trim();
        var match = content.match(/\d{2}\.\d{2}\.\d{4}/);

        if (match) {
          var _match$0$split = match[0].split('.'),
              _match$0$split2 = _slicedToArray(_match$0$split, 3),
              day = _match$0$split2[0],
              month = _match$0$split2[1],
              year = _match$0$split2[2];

          return "".concat(year, "-").concat(month, "-").concat(day);
        }
      }

      return null;
    };

    var getPrice = function getPrice() {
      var inputRef = roomRef.querySelector('input[name="total"]');
      return inputRef && inputRef.value;
    };

    var getRoomName = function getRoomName() {
      var spanRefs = roomRef.querySelectorAll('span');

      var roomNameRef = _toConsumableArray(spanRefs).find(function (ref) {
        return ref.textContent.trim().startsWith('1 номер X');
      });

      if (roomNameRef) {
        var index = '1 номер X '.length;
        return roomNameRef.textContent.slice(index);
      }

      return null;
    };

    var price = getPrice();
    return {
      competitor: 'BDO',
      funnel_step: Page.BOOKING_FORM,
      external_hotel_name: getExternalHotelName(),
      external_id: externalId,
      checkin: getCheckin(),
      checkout: getCheckout(),
      adults: getAdults(),
      children_years: getChildrenYears(),
      rooms_number: 1,
      has_meal: getMeal(),
      cancellation_before: getCancellationBefore(),
      is_postpay: false,
      price: price && parsePrice(price),
      currency: 'RUB',
      taxes: 0,
      room_name: getRoomName(),
      residency: 'ru',
      language: 'ru',
      html: document.body.outerHTML
    };
  };

  var roomRefs = document.querySelectorAll('.room-div');

  var data = _toConsumableArray(roomRefs).map(parseHotel);

  chrome.runtime.sendMessage({
    command: 'SHOW_OFFER',
    data: data[0]
  });
}