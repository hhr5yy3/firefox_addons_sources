"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// @ts-ignore
var Regex = {
  SERP: /HotelResult/
}; // @ts-ignore

var isSerp = Regex.SERP.test(window.location.pathname);

if (isSerp) {
  var reverseDate = function reverseDate(date, separator) {
    return date.split(separator).reverse().join('-');
  };

  var getEmptyArr = function getEmptyArr(length) {
    return Array(length).fill(null);
  };

  var getHotelName = function getHotelName(hotel) {
    var _hotel$querySelector, _hotel$querySelector$;

    return ((_hotel$querySelector = hotel.querySelector('.mb5.mt15')) === null || _hotel$querySelector === void 0 ? void 0 : (_hotel$querySelector$ = _hotel$querySelector.textContent) === null || _hotel$querySelector$ === void 0 ? void 0 : _hotel$querySelector$.trim()) || null;
  };

  var getHotelId = function getHotelId(hotel) {
    var _hotel$querySelector2;

    return ((_hotel$querySelector2 = hotel.querySelector('.mb5.mt15')) === null || _hotel$querySelector2 === void 0 ? void 0 : _hotel$querySelector2.getAttribute('hotelcode')) || null;
  };

  var getStarRating = function getStarRating(hotel) {
    var stars = hotel.querySelectorAll('i[class="fa fa-star colored"]').length;
    return stars || null;
  };

  var getHotelKind = function getHotelKind(hotel) {
    var _hotel$querySelector3, _hotel$querySelector4;

    var hotelKindIcon = hotel.querySelector('.hotel-header span .fa.fa-building-o');
    var hotelKindText = (_hotel$querySelector3 = hotel.querySelector('.hotel-header span')) === null || _hotel$querySelector3 === void 0 ? void 0 : (_hotel$querySelector4 = _hotel$querySelector3.textContent) === null || _hotel$querySelector4 === void 0 ? void 0 : _hotel$querySelector4.trim();
    return hotelKindIcon && hotelKindText;
  };

  var getAddress = function getAddress(hotel) {
    var _hotel$querySelector5;

    return ((_hotel$querySelector5 = hotel.querySelector('.mt5.mb5')) === null || _hotel$querySelector5 === void 0 ? void 0 : _hotel$querySelector5.textContent) || null;
  };

  var getGeo = function getGeo() {
    var _document$querySelect;

    return ((_document$querySelect = document.querySelector('#Name')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.value) || null;
  };

  var getCity = function getCity() {
    var _getGeo, _getGeo$match;

    return ((_getGeo = getGeo()) === null || _getGeo === void 0 ? void 0 : (_getGeo$match = _getGeo.match(/(\S+),/)) === null || _getGeo$match === void 0 ? void 0 : _getGeo$match[1]) || null;
  };

  var getCheckIn = function getCheckIn() {
    var _document$querySelect2;

    var rowDate = ((_document$querySelect2 = document.querySelector('#CheckInDate')) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.value) || null;
    return rowDate && reverseDate(rowDate, '.');
  };

  var getCheckOut = function getCheckOut() {
    var _document$querySelect3;

    var rowDate = ((_document$querySelect3 = document.querySelector('#CheckOutDate')) === null || _document$querySelect3 === void 0 ? void 0 : _document$querySelect3.value) || null;
    return rowDate && reverseDate(rowDate, '.');
  };

  var getPrice = function getPrice(hotel) {
    var _hotel$querySelector6;

    var price = (_hotel$querySelector6 = hotel.querySelector('.cur-price')) === null || _hotel$querySelector6 === void 0 ? void 0 : _hotel$querySelector6.getAttribute('data-amount');
    return price && +price || null;
  };

  var getCurrency = function getCurrency(hotel) {
    var _hotel$querySelector7;

    return ((_hotel$querySelector7 = hotel.querySelector('.cur-price')) === null || _hotel$querySelector7 === void 0 ? void 0 : _hotel$querySelector7.getAttribute('data-code')) || null;
  };

  var getGuests = function getGuests() {
    var _document$querySelect4, _document$querySelect5;

    var fullInfo = (_document$querySelect4 = document.querySelector('.form-control.btn-hotel-room-paxinfo')) === null || _document$querySelect4 === void 0 ? void 0 : (_document$querySelect5 = _document$querySelect4.textContent) === null || _document$querySelect5 === void 0 ? void 0 : _document$querySelect5.match(/\d+/g);

    if (fullInfo) {
      var _fullInfo = _slicedToArray(fullInfo, 3),
          roomsNumber = _fullInfo[0],
          adultsNumber = _fullInfo[1],
          childrenNumber = _fullInfo[2];

      if (roomsNumber) {
        var adultsArr = [];
        var childrenArr = [];

        if (adultsNumber) {
          adultsArr = getEmptyArr(+roomsNumber).map(function (_, i) {
            var _document$querySelect6;

            var adults = (_document$querySelect6 = document.querySelector("select[name=\"HotelSearchFilterRooms[".concat(i, "].Paxes[0].Count\"] option[selected]"))) === null || _document$querySelect6 === void 0 ? void 0 : _document$querySelect6.value;
            return adults && +adults || null;
          });
        }

        if (childrenNumber) {
          var MAX_NUMBER_OF_CHILDREN_IN_ONE_ROOM = 3;
          childrenArr = getEmptyArr(+roomsNumber).map(function (_, i) {
            var childrenLocalArr = [];
            getEmptyArr(MAX_NUMBER_OF_CHILDREN_IN_ONE_ROOM).forEach(function (_a, j) {
              var childAgeElement = document.querySelector("select[name=\"HotelSearchFilterRooms[".concat(i, "].Paxes[1].ChildAges[").concat(j, "]\"] option[selected]"));

              if (childAgeElement !== null && childAgeElement !== void 0 && childAgeElement.value && !childAgeElement.disabled && +childAgeElement.value) {
                childrenLocalArr.push(+childAgeElement.value);
              }
            });
            return childrenLocalArr;
          });
        }

        return Array(+roomsNumber).fill(null).map(function (_, i) {
          return {
            adults: adultsArr[i],
            children: childrenArr[i] || []
          };
        });
      }
    }

    return null;
  };

  var getData = function getData() {
    return Array.from(document.querySelectorAll('.hotel-list-view')).map(function (hotel) {
      return {
        hotel_name: getHotelName(hotel),
        external_hotel_id: getHotelId(hotel),
        latitude: null,
        longitude: null,
        star_rating: getStarRating(hotel),
        kind: getHotelKind(hotel),
        address: getAddress(hotel),
        phone: null,
        city: getCity(),
        geo: getGeo(),
        checkin: getCheckIn(),
        checkout: getCheckOut(),
        guests: getGuests(),
        room_name: null,
        meal_type: null,
        has_meal: null,
        cancellation_before: null,
        price: getPrice(hotel),
        currency: getCurrency(hotel)
      };
    });
  };

  chrome.runtime.sendMessage({
    command: 'GET_COMPETITOR_SERP_DATA',
    data: getData()
  });
}