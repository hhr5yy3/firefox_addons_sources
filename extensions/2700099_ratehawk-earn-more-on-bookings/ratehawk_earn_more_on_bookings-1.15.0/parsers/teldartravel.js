"use strict";

// @ts-ignore
var Regex = {
  SERP: /\/booking\/results\//
};
var DATA_FROM_WINDOW = 'DATA_FROM_WINDOW'; // @ts-ignore

var isSerp = Regex.SERP.test(document.location.pathname);

if (isSerp) {
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

  var injectScript = function injectScript() {
    var script = document.createElement('script');
    script.textContent = "window.postMessage({\n      type: '".concat(DATA_FROM_WINDOW, "',\n      data: {\n        list: window.filter.initial_list,\n        boardTypes: window.boardTypes,\n        roomTypes: window.roomTypes,\n        checkin: window.checkin,\n        checkout: window.checkout,\n        currency: window.currency,\n        accommodationTypesMap: window.accommodationTypesMap,\n        cities: window.cities,\n        supplierCodes: window.supplierCodes\n      }\n    }, \"*\");");
    document.body.appendChild(script);
  };

  var getGuests = function getGuests(rooms) {
    var guests = [];

    for (var i = 0; i < rooms; i += 1) {
      var _document$querySelect, _document$querySelect2;

      guests.push({
        adults: 0,
        children: []
      });
      var adultsNumber = ((_document$querySelect = document.querySelector("select[name=adults".concat(i + 1, "]"))) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.value) || 0;
      guests[i].adults = +adultsNumber;
      var childrenAmount = (_document$querySelect2 = document.querySelector("select[name=children".concat(i + 1, "]"))) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.value;

      if (childrenAmount) {
        for (var k = 0; k < +childrenAmount; k += 1) {
          var _document$querySelect3;

          var childAge = ((_document$querySelect3 = document.querySelector("select[name=child_".concat(i + 1, "_").concat(k + 1, "]"))) === null || _document$querySelect3 === void 0 ? void 0 : _document$querySelect3.value) || 0;
          guests[i].children.push(+childAge);
        }
      }
    }

    return guests;
  };

  var hasMeal = function hasMeal(mealType) {
    if (mealType === 'RONL' || mealType === 'NONE') {
      return false;
    }

    return true;
  };

  var getData = function getData(_ref) {
    var _document$querySelect4;

    var list = _ref.list,
        boardTypes = _ref.boardTypes,
        roomTypes = _ref.roomTypes,
        checkin = _ref.checkin,
        checkout = _ref.checkout,
        currency = _ref.currency,
        accommodationTypesMap = _ref.accommodationTypesMap,
        supplierCodes = _ref.supplierCodes,
        cities = _ref.cities;
    var roomsNumber = ((_document$querySelect4 = document.querySelector('select[name=rooms_no]')) === null || _document$querySelect4 === void 0 ? void 0 : _document$querySelect4.value) || 0;
    var guests = getGuests(+roomsNumber);
    var checkIn = checkin.split('/').reverse().join('-');
    var checkOut = checkout.split('/').reverse().join('-');

    var getCancellationBefore = function getCancellationBefore(roomName) {
      var nonRefundable = roomName.match(/Non Refundable|Non Remboursable|No reembolsable|Não reembolsável|Niet-Restitueerbaar|Non Rimborsabile/);

      if (nonRefundable) {
        return null;
      }

      if (checkIn) {
        var checkinDate = new Date(checkIn);
        var millisecsPerDay = 86400000;
        var dayBeforeCheckin = new Date(checkinDate.getTime() - millisecsPerDay);
        return "".concat(dayBeforeCheckin.getFullYear(), "-").concat("".concat(dayBeforeCheckin.getMonth() + 1).padStart(2, '0'), "-").concat("".concat(dayBeforeCheckin.getDate()).padStart(2, '0'));
      }

      return null;
    };

    return list.map(function (hotel, i) {
      return hotel.off.map(function (offer) {
        return {
          competitor: 'TLD',
          hotel_name: hotel.hd.nm,
          external_hotel_id: hotel.hd.id,
          latitude: "".concat(hotel.hd.lat),
          longitude: "".concat(hotel.hd.lon),
          star_rating: hotel.hd.rt,
          hotel_kind: accommodationTypesMap[hotel.hd.at],
          address: hotel.hd.a,
          phone: null,
          city: Object.values(cities[hotel.hd.cid])[0],
          geo: Object.values(cities[hotel.hd.cid]).join(', '),
          checkin: checkIn,
          checkout: checkOut,
          guests: guests,
          competitor_currency: currency,
          room_name: offer.rp.map(function (roomInfo) {
            return roomTypes[roomInfo.rt].d;
          }),
          meal_type: new Array(+roomsNumber).fill(boardTypes[offer.bt].d),
          has_meal: new Array(+roomsNumber).fill(hasMeal(boardTypes[offer.bt].c)),
          cancellation_before: offer.rp.map(function (roomInfo) {
            return getCancellationBefore(roomTypes[roomInfo.rt].d);
          }),
          competitor_price: offer.bp.end,
          competitor_net_price: offer.bp.rack,
          sup_price: offer.bp.net,
          num_in_page: i + 1,
          sup_name: supplierCodes[offer.spId],
          language: 'en',
          residency: 'gb'
        };
      });
    }).flat();
  };

  var sendDataAfterContentIsLoaded = function sendDataAfterContentIsLoaded(isLoaded) {
    var _document$querySelect5, _document$querySelect6, _document$querySelect7;

    if (isLoaded) {
      injectScript();
      return;
    }

    if (((_document$querySelect5 = document.querySelector('#please_wait')) === null || _document$querySelect5 === void 0 ? void 0 : (_document$querySelect6 = _document$querySelect5.style) === null || _document$querySelect6 === void 0 ? void 0 : _document$querySelect6.display) === 'none' && (_document$querySelect7 = document.querySelector('#list_results_wrapper')) !== null && _document$querySelect7 !== void 0 && _document$querySelect7.children.length) {
      sendDataAfterContentIsLoaded(true);
    } else {
      setTimeout(function () {
        sendDataAfterContentIsLoaded(false);
      }, 1000);
    }
  };

  sendDataAfterContentIsLoaded(false);
}