"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var parse = function parse() {
  var Page = {
    HOTEL_PAGE: 'hotelpage',
    BOOKING_FORM: 'booking_form'
  };
  var Regex = {
    HOTEL_PAGE: /\/factsheet?/,
    BOOKING_FORM: /\/cart/
  };

  var parsePrice = function parsePrice(price) {
    return parseFloat(price.replace(/[.,  ](?!\d{1,2}$)/g, '').replace(',', '.'));
  };

  var currencies = {
    AUD: 'AUD',
    CAD: 'CAD',
    CLP: 'CL$',
    CNY: 'CNY',
    COP: 'COP',
    CZK: 'Kč',
    DKK: 'DKK',
    DOP: 'DOP',
    EUR: '€',
    GBP: '£',
    HKD: 'HKD',
    IDR: 'Rp',
    JPY: '¥',
    MXN: 'MXN',
    MYR: 'MYR',
    NOK: 'NOK',
    PLN: 'PLN',
    PEN: 'PEN',
    PHP: 'PHP',
    RUB: 'RUB',
    SEK: 'SEK',
    THB: 'THB',
    TRY: 'TL',
    USD: 'US$'
  };
  var Language = {
    EN: 'en'
  };

  var mealTypes = _defineProperty({}, Language.EN, {
    'room only': 'room-only',
    'continental breakfast': 'continental-breakfast',
    'english breakfast': 'english-breakfast',
    'half board': 'half-board',
    'full board': 'full-board',
    'all inclusive': 'all-inclusive',
    'bed and breakfast': 'breakfast',
    'dinner included': 'dinner',
    'self catering': 'self-catering',
    'lunch included': 'lunch',
    'american breakfast': 'american-breakfast',
    'breakfast for two guests': 'breakfast-for-2',
    'buffet breakfast': 'breakfast-buffet',
    'light breakfast': 'light-breakfast'
  });

  var MAX_ROOMS = 10;
  var MAX_CHILDREN = 4;
  var DEFAULT_CHILDREN_AGE = 10;
  var isHotelPage = Regex.HOTEL_PAGE.test(document.location.pathname);
  var isBookingForm = Regex.BOOKING_FORM.test(document.location.pathname);

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

    var getCheckin = function getCheckin(hotel) {
      if (isHotelPage) {
        var date = document.querySelector('#s-startdate').value;
        var prettyDate = date.split('/').reverse().join('-');

        if (prettyDate) {
          return prettyDate;
        }
      }

      if (isBookingForm) {
        var _date = hotel.querySelector('strong.QA_hotel_dateFrom').textContent;

        var _prettyDate = _date.split('/').reverse().join('-');

        if (_prettyDate) {
          return _prettyDate;
        }
      }

      return null;
    };

    var getCheckout = function getCheckout(hotel) {
      if (isHotelPage) {
        var date = document.querySelector('#s-enddate').value;
        var prettyDate = date.split('/').reverse().join('-');

        if (prettyDate) {
          return prettyDate;
        }
      }

      if (isBookingForm) {
        var _date2 = hotel.querySelector('strong.QA_hotel_dateTo').textContent;

        var _prettyDate2 = _date2.split('/').reverse().join('-');

        if (_prettyDate2) {
          return _prettyDate2;
        }
      }

      return null;
    };

    var getExternalHotelName = function getExternalHotelName(hotel) {
      if (isHotelPage) {
        var hotelName = document.querySelector('em.QA_hotelname');

        if (hotelName) {
          return hotelName.textContent.trim();
        }
      }

      if (isBookingForm) {
        var _hotelName = hotel.querySelector('[data-qa="hotel-name-shopping-cart"]');

        if (_hotelName) {
          return _hotelName.textContent.trim();
        }
      }

      return null;
    };

    var getExternalId = function getExternalId(hotel) {
      if (isHotelPage) {
        var searchParams = new URLSearchParams(window.location.search);
        var id = searchParams.get('id');

        if (id) {
          return id;
        }
      }

      if (isBookingForm) {
        var hotelId = hotel.querySelector('a.popup-detail.open-modal');

        if (hotelId) {
          return hotelId.dataset.code;
        }
      }

      return null;
    };

    var getCheapestRoom = function getCheapestRoom() {
      if (isHotelPage) {
        var roomsData = _toConsumableArray(document.querySelectorAll('.hotel-pricing div .item-line')).map(function (item) {
          var _item$querySelector, _item$querySelector$t, _item$querySelector$t2;

          var price = parsePrice(((_item$querySelector = item.querySelector('[data-qa=room-price-text] span')) === null || _item$querySelector === void 0 ? void 0 : (_item$querySelector$t = _item$querySelector.textContent) === null || _item$querySelector$t === void 0 ? void 0 : (_item$querySelector$t2 = _item$querySelector$t.match(/(\S+)/)) === null || _item$querySelector$t2 === void 0 ? void 0 : _item$querySelector$t2[0]) || '0');
          return {
            roomRef: item.parentElement,
            price: price
          };
        });

        roomsData.sort(function (a, b) {
          return a.price - b.price;
        });
        return roomsData[0];
      }

      return null;
    };

    var getLanguage = function getLanguage() {
      return 'en';
    };

    var getMealType = function getMealType(hotel) {
      var language = getLanguage();
      var roomsNumber = getRoomsNumber(hotel);

      if (isHotelPage) {
        var _getCheapestRoom, _getCheapestRoom$room, _getCheapestRoom$room2, _getCheapestRoom$room3, _mealTypes$language;

        var mealTypeMessage = (_getCheapestRoom = getCheapestRoom()) === null || _getCheapestRoom === void 0 ? void 0 : (_getCheapestRoom$room = _getCheapestRoom.roomRef) === null || _getCheapestRoom$room === void 0 ? void 0 : (_getCheapestRoom$room2 = _getCheapestRoom$room.querySelector('.board-shortname')) === null || _getCheapestRoom$room2 === void 0 ? void 0 : (_getCheapestRoom$room3 = _getCheapestRoom$room2.getAttribute('data-tooltip-content')) === null || _getCheapestRoom$room3 === void 0 ? void 0 : _getCheapestRoom$room3.toLowerCase();
        var mealType = (_mealTypes$language = mealTypes[language]) === null || _mealTypes$language === void 0 ? void 0 : _mealTypes$language[mealTypeMessage];
        return roomsNumber && Array(roomsNumber).fill(mealType) || null;
      }

      if (isBookingForm) {
        var hotelMealTypes = Array.from(hotel.querySelectorAll('.QA_hotel_boardtype')).map(function (meal) {
          var _meal$textContent, _mealTypes$language2;

          var mealTypeMessage = meal === null || meal === void 0 ? void 0 : (_meal$textContent = meal.textContent) === null || _meal$textContent === void 0 ? void 0 : _meal$textContent.trim().toLowerCase();
          return mealTypeMessage && ((_mealTypes$language2 = mealTypes[language]) === null || _mealTypes$language2 === void 0 ? void 0 : _mealTypes$language2[mealTypeMessage]) || null;
        });
        return roomsNumber ? hotelMealTypes.slice(0, roomsNumber) : hotelMealTypes[0];
      }

      return null;
    };

    var getHasMeal = function getHasMeal(hotel) {
      var hotelMealTypes = getMealType(hotel);
      var falsyMealTypes = ['room-only', 'self-catering'];

      if (hotelMealTypes) {
        if (Array.isArray(hotelMealTypes)) {
          return hotelMealTypes.map(function (mealType) {
            return !falsyMealTypes.includes(mealType);
          });
        }

        return !falsyMealTypes.includes(hotelMealTypes);
      }

      return null;
    };

    var getCancellationBefore = function getCancellationBefore(hotel) {
      var dateRegEx = /(\d{2}\/\d{2}\/\d{4})/;

      if (isHotelPage) {
        var rooms = document.querySelector('#s-rooms-qty');
        var roomsNumber = +(rooms === null || rooms === void 0 ? void 0 : rooms.value);

        if (roomsNumber) {
          var _getCheapestRoom2, _getCheapestRoom2$roo, _getCheapestRoom2$roo2, _getCheapestRoom2$roo3, _getCheapestRoom2$roo4, _getCheapestRoom2$roo5;

          var date = (_getCheapestRoom2 = getCheapestRoom()) === null || _getCheapestRoom2 === void 0 ? void 0 : (_getCheapestRoom2$roo = _getCheapestRoom2.roomRef) === null || _getCheapestRoom2$roo === void 0 ? void 0 : (_getCheapestRoom2$roo2 = _getCheapestRoom2$roo.querySelector('span[data-tl=no-fees-until]')) === null || _getCheapestRoom2$roo2 === void 0 ? void 0 : (_getCheapestRoom2$roo3 = _getCheapestRoom2$roo2.textContent) === null || _getCheapestRoom2$roo3 === void 0 ? void 0 : (_getCheapestRoom2$roo4 = _getCheapestRoom2$roo3.match(dateRegEx)) === null || _getCheapestRoom2$roo4 === void 0 ? void 0 : (_getCheapestRoom2$roo5 = _getCheapestRoom2$roo4[0]) === null || _getCheapestRoom2$roo5 === void 0 ? void 0 : _getCheapestRoom2$roo5.split('/').reverse().join('-');
          return Array(roomsNumber).fill(date || null);
        }
      }

      if (isBookingForm) {
        var firstPack = hotel.querySelector('div.charges-detail');

        var _roomsNumber = firstPack.querySelectorAll('span.QA_hotel_quantity');

        var cancellationInfo = firstPack.querySelectorAll('div[data-qa=hotel-cancellation-charges] div.cancellation-table-description.highlights');
        var roomsNumberArr = Array.from(_roomsNumber);
        var cancellationInfoArr = Array.from(cancellationInfo);
        var result = cancellationInfoArr.map(function (item, index) {
          var cancellationInfoForEachRoom = [];
          cancellationInfoForEachRoom.length = +roomsNumberArr[index].textContent;
          var dateMatch = item.textContent.match(dateRegEx);

          if (dateMatch) {
            var _date3 = dateMatch[0];

            var prettyDate = _date3.split('/').reverse().join('-');

            cancellationInfoForEachRoom.fill(prettyDate);
          } else {
            cancellationInfoForEachRoom.fill(null);
          }

          return cancellationInfoForEachRoom;
        });
        return result.flat()[0];
      }

      return null;
    };

    var getRoomName = function getRoomName(hotel) {
      if (isHotelPage) {
        var roomsNumber = getRoomsNumber(hotel);

        if (roomsNumber) {
          var _getCheapestRoom3, _getCheapestRoom3$roo;

          var roomsNames = Array.from(((_getCheapestRoom3 = getCheapestRoom()) === null || _getCheapestRoom3 === void 0 ? void 0 : (_getCheapestRoom3$roo = _getCheapestRoom3.roomRef) === null || _getCheapestRoom3$roo === void 0 ? void 0 : _getCheapestRoom3$roo.querySelectorAll('.magnifier')) || []).map(function (roomNameRef) {
            return roomNameRef === null || roomNameRef === void 0 ? void 0 : roomNameRef.getAttribute('data-room-title');
          });
          return roomsNames.length < roomsNumber ? Array(roomsNumber).fill(roomsNames[0]) : roomsNames;
        }
      }

      if (isBookingForm) {
        var firstPack = hotel.querySelector('div.charges-detail');
        var rooms = firstPack.querySelectorAll('div.added-details');
        var roomsArr = Array.from(rooms);
        var roomNames = roomsArr.map(function (item) {
          var multiplier = +item.querySelector('span.QA_hotel_quantity').textContent;
          var roomName = item.querySelector('span.QA_hotel_roomtype').textContent.trim();
          var identicalRooms = [];
          identicalRooms.length = multiplier;
          identicalRooms.fill(roomName);
          return identicalRooms;
        });

        if (roomNames.length) {
          return roomNames.flat();
        }
      }

      return null;
    };

    var getPrice = function getPrice(hotel) {
      if (isHotelPage) {
        var _getCheapestRoom4;

        return ((_getCheapestRoom4 = getCheapestRoom()) === null || _getCheapestRoom4 === void 0 ? void 0 : _getCheapestRoom4.price) || null;
      }

      if (isBookingForm) {
        var priceElement = hotel.querySelector('div.price-module').textContent.trim();
        var prettyPrice = parsePrice(priceElement.match(/(\d\S+)/)[0]);

        if (prettyPrice) {
          return prettyPrice;
        }
      }

      return null;
    };

    var getRoomsNumber = function getRoomsNumber(hotel) {
      if (isHotelPage) {
        var roomsNumber = document.querySelector('#s-rooms-qty');

        if (roomsNumber) {
          return +roomsNumber.value;
        }
      }

      if (isBookingForm) {
        var firstPack = hotel.querySelector('div.charges-detail');
        var rooms = firstPack.querySelectorAll('div.added-details');
        var roomsArr = Array.from(rooms);
        var result = roomsArr.reduce(function (sum, current, index, array) {
          current = +array[index].querySelector('span.QA_hotel_quantity').textContent;
          return sum + current;
        }, 0);

        if (result) {
          return result;
        }
      }

      return null;
    };

    var getTaxes = function getTaxes(hotel) {
      if (isHotelPage) {
        var rooms = document.querySelector('#s-rooms-qty');
        var roomsNumber = +rooms.value;

        if (roomsNumber) {
          return new Array(roomsNumber).fill(0)[0];
        }
      }

      if (isBookingForm) {
        var _roomsNumber2 = getRoomsNumber(hotel);

        if (_roomsNumber2) {
          return new Array(_roomsNumber2).fill(0)[0];
        }
      }

      return null;
    };

    var getAdults = function getAdults(hotel) {
      if (isHotelPage) {
        var firstRoomAdults = document.querySelector('#s-adults_1');
        var adults = [];

        if (firstRoomAdults) {
          for (var i = 1; i <= MAX_ROOMS; i += 1) {
            var selector = "#s-adults_".concat(i);
            var adultsPerRoom = document.querySelector(selector);

            if (!adultsPerRoom) {
              break;
            }

            adults.push(+adultsPerRoom.value);
          }
        }

        return adults;
      }

      if (isBookingForm) {
        var firstPack = hotel.querySelector('div.charges-detail');
        var rooms = firstPack.querySelectorAll('div.added-details');
        var roomsArr = Array.from(rooms);

        var _adults = roomsArr.map(function (item) {
          var multiplier = +item.querySelector('span.QA_hotel_quantity').textContent;
          var adultsPerRoom = +item.querySelector('span.QA_adults').textContent;
          var adultsPerRoomArr = [];
          adultsPerRoomArr.length = multiplier;
          adultsPerRoomArr.fill(adultsPerRoom);
          return adultsPerRoomArr;
        });

        if (_adults) {
          return _adults.flat();
        }
      }

      return null;
    };

    var getChildrenYears = function getChildrenYears(hotel) {
      if (isHotelPage) {
        var firstRoomChildren = document.querySelector('#s-children_1');
        var children = [];

        if (firstRoomChildren) {
          for (var i = 1; i <= MAX_ROOMS; i += 1) {
            var childrenSelector = "#s-children_".concat(i);
            var childrenPerRoom = document.querySelector(childrenSelector);

            if (!childrenPerRoom) {
              break;
            }

            if (+childrenPerRoom.value === 0) {
              children.push([]);
            } else {
              var childrenAge = [];

              for (var k = 1; k <= MAX_CHILDREN; k += 1) {
                var childrenAgeSelector = "#s-children_age_".concat(i, "_").concat(k);
                var childrenAgePerRoom = document.querySelector(childrenAgeSelector);

                if (!childrenAgePerRoom) {
                  break;
                }

                childrenAge.push(+childrenAgePerRoom.value);
              }

              children.push(childrenAge);
            }
          }
        }

        return children;
      }

      if (isBookingForm) {
        var firstPack = hotel.querySelector('div.charges-detail');
        var rooms = firstPack.querySelectorAll('div.added-details');
        var roomsArr = Array.from(rooms);

        var _children = roomsArr.map(function (item) {
          var multiplier = +item.querySelector('span.QA_hotel_quantity').textContent;
          var childrenPerSameRooms = +item.querySelector('span.QA_hotel_children').textContent;
          var childrenPerSameRoomsArr = [];
          childrenPerSameRoomsArr.length = multiplier;

          if (childrenPerSameRooms === 0) {
            childrenPerSameRoomsArr.fill([]);
          } else {
            var childrenPerEachRoomArr = [];
            childrenPerEachRoomArr.length = childrenPerSameRooms;
            childrenPerEachRoomArr.fill(DEFAULT_CHILDREN_AGE);
            childrenPerSameRoomsArr.fill(childrenPerEachRoomArr);
          }

          return childrenPerSameRoomsArr;
        });

        return _children.flat();
      }

      return null;
    };

    var getPostPay = function getPostPay(hotel) {
      if (isHotelPage) {
        var rooms = document.querySelector('#s-rooms-qty');
        var roomsNumber = +rooms.value;

        if (roomsNumber) {
          return new Array(roomsNumber).fill(false)[0];
        }
      }

      if (isBookingForm) {
        var _roomsNumber3 = getRoomsNumber(hotel);

        if (_roomsNumber3) {
          return new Array(_roomsNumber3).fill(false)[0];
        }
      }

      return null;
    };

    var getCurrency = function getCurrency(hotel) {
      if (isHotelPage) {
        var spans = document.querySelectorAll('[data-qa=room-price-text]');
        var spansArr = Array.from(spans);
        var prices = spansArr.map(function (item) {
          return item.childNodes[1].textContent;
        });
        prices.sort(function (a, b) {
          return parsePrice(a.match(/(\S+)/)[0]) - parsePrice(b.match(/(\S+)/)[0]);
        });
        var cheapestPrice = prices[0];
        var cheapestPriceString = prices.find(function (item) {
          return item.includes(cheapestPrice);
        });
        var currency;
        var currenciesArr = Object.entries(currencies);

        for (var i = 0; i < currenciesArr.length; i += 1) {
          if (cheapestPriceString.includes(currenciesArr[i][1])) {
            if (cheapestPriceString && cheapestPriceString.includes(currenciesArr[i][1])) {
              var _currenciesArr$i = _slicedToArray(currenciesArr[i], 1);

              currency = _currenciesArr$i[0];
              break;
            }
          }
        }

        if (currency) {
          return currency;
        }
      }

      if (isBookingForm) {
        var priceDiv = hotel.querySelector('div.price-module').textContent.trim();

        var _currency;

        var _currenciesArr = Object.entries(currencies);

        for (var _i2 = 0; _i2 < _currenciesArr.length; _i2 += 1) {
          if (priceDiv.includes(_currenciesArr[_i2][1])) {
            var _currenciesArr$_i = _slicedToArray(_currenciesArr[_i2], 1);

            _currency = _currenciesArr$_i[0];
            break;
          }
        }

        if (_currency) {
          return _currency;
        }
      }

      return null;
    };

    var getData = function getData() {
      var hotel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
      return {
        adults: getAdults(hotel),
        cancellation_before: getCancellationBefore(hotel),
        checkin: getCheckin(hotel),
        checkout: getCheckout(hotel),
        children_years: getChildrenYears(hotel),
        competitor: 'BDO',
        currency: getCurrency(hotel),
        external_hotel_name: getExternalHotelName(hotel),
        external_id: getExternalId(hotel),
        funnel_step: getFunnelStep(),
        has_meal: getHasMeal(hotel),
        meal_type: getMealType(hotel),
        html: document.body.outerHTML,
        is_postpay: getPostPay(hotel),
        language: getLanguage(),
        price: getPrice(hotel),
        residency: 'gb',
        room_name: getRoomName(hotel),
        rooms_number: getRoomsNumber(hotel),
        taxes: getTaxes(hotel)
      };
    };

    if (isBookingForm) {
      document.querySelector('#payButton').addEventListener('click', function () {
        var hotels = Array.from(document.querySelectorAll('.module'));
        var data = hotels.map(function (hotel) {
          return getData(hotel);
        });
        chrome.runtime.sendMessage({
          command: 'GET_COMPETITOR_ORDER_DATA',
          data: data
        });
      });
    }

    chrome.runtime.sendMessage({
      command: 'SHOW_OFFER',
      data: getData()
    });
  } else {
    chrome.runtime.sendMessage({
      command: 'SHOW_OFFER',
      data: null
    });
  }
};

var intervalId = setInterval(function () {
  var priceHP = document.querySelector('.markup-price');
  var priceBF = document.querySelector('div.charges-detail');

  if (priceHP || priceBF) {
    parse();
    clearInterval(intervalId);
  }
}, 250);