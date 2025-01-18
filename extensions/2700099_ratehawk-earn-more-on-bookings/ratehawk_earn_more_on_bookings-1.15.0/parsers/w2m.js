"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var parse = function parse() {
  var _roomOnly, _selfCatering, _bedAndBreakfast, _halfBoard;

  var Page = {
    HOTEL_PAGE: 'hotelpage',
    BOOKING_FORM: 'booking_form'
  };
  var Regex = {
    HOTEL_PAGE: /hotels\/details/,
    BOOKING_FORM: /booking/
  };
  var Language = {
    EN: 'en',
    ES: 'es',
    IT: 'it',
    PT: 'pt',
    FR: 'fr',
    DE: 'de'
  };
  var roomOnly = (_roomOnly = {}, _defineProperty(_roomOnly, Language.EN, 'RO'), _defineProperty(_roomOnly, Language.ES, 'SA'), _defineProperty(_roomOnly, Language.IT, 'SA'), _defineProperty(_roomOnly, Language.PT, 'SA'), _defineProperty(_roomOnly, Language.FR, 'CS'), _defineProperty(_roomOnly, Language.DE, 'Ü'), _roomOnly);
  var selfCatering = (_selfCatering = {}, _defineProperty(_selfCatering, Language.EN, 'SC'), _defineProperty(_selfCatering, Language.ES, 'SC'), _defineProperty(_selfCatering, Language.IT, 'SP'), _defineProperty(_selfCatering, Language.PT, 'SA'), _defineProperty(_selfCatering, Language.FR, 'LS'), _defineProperty(_selfCatering, Language.DE, 'SV'), _selfCatering);
  var bedAndBreakfast = (_bedAndBreakfast = {}, _defineProperty(_bedAndBreakfast, Language.EN, 'BB'), _defineProperty(_bedAndBreakfast, Language.ES, 'AD'), _defineProperty(_bedAndBreakfast, Language.IT, 'AD'), _defineProperty(_bedAndBreakfast, Language.PT, 'APA'), _defineProperty(_bedAndBreakfast, Language.FR, 'PDJ'), _defineProperty(_bedAndBreakfast, Language.DE, 'ÜF'), _bedAndBreakfast);
  var halfBoard = (_halfBoard = {}, _defineProperty(_halfBoard, Language.EN, 'HB'), _defineProperty(_halfBoard, Language.ES, 'MP'), _defineProperty(_halfBoard, Language.IT, 'MP'), _defineProperty(_halfBoard, Language.PT, 'MP'), _defineProperty(_halfBoard, Language.FR, 'DP'), _defineProperty(_halfBoard, Language.DE, 'HP'), _halfBoard);
  var isHotelPage = Regex.HOTEL_PAGE.test(document.location.pathname);
  var isBookingForm = Regex.BOOKING_FORM.test(document.location.pathname);

  var parsePrice = function parsePrice(price) {
    return parseFloat(price.replace(/[.,  ](?!\d{1,2}$)/g, '').replace(',', '.'));
  };

  var scripts = _toConsumableArray(document.querySelectorAll('script'));

  var targetScript = scripts === null || scripts === void 0 ? void 0 : scripts.find(function (script) {
    return script.textContent.includes('produt_id') || script.textContent.includes('product_id');
  });
  var scriptContent = targetScript === null || targetScript === void 0 ? void 0 : targetScript.textContent;

  var getDataFromScript = function getDataFromScript(key) {
    if (key === 'produt_id') {
      var _match = scriptContent.match(/"produt_id":"(\w+)"/);

      if (_match) {
        return _match[1];
      }

      var possibleMatch = scriptContent.match(/"product_id":"(\w+)"/);

      if (possibleMatch) {
        return possibleMatch[1];
      }
    }

    if (key === 'price') {
      var _match2 = scriptContent.match(/"price":([\d.]+)/);

      return _match2 && _match2[1];
    }

    var match = scriptContent.match(new RegExp("\"".concat(key, "\":(\\w+),")));

    if (match) {
      var value = match[1];

      if (value.match(/^\d+$/)) {
        return +value;
      }

      return value;
    }

    return null;
  };

  if (isHotelPage || isBookingForm) {
    var getLanguage = function getLanguage() {
      var lang = document.documentElement.lang;

      if (lang) {
        if (lang.length > 2) {
          return lang.slice(0, 2);
        }

        return lang;
      }

      var langBox = document.querySelector('.text-uppercase.visible-xs-inline');

      if (langBox) {
        return langBox.textContent;
      }

      return null;
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

    var getCheckin = function getCheckin() {
      if (isHotelPage) {
        var datesBox = document.querySelector('span.search-summary__dates');
        var dates = datesBox.innerText.trim();
        var dateMatch = dates === null || dates === void 0 ? void 0 : dates.match(/(\d{2}\/\d{2}\/\d{4})/g);

        if (dateMatch && dateMatch[0]) {
          return dateMatch[0].split('/').reverse().join('-');
        }
      }

      if (isBookingForm) {
        var _dates = document.querySelector('div.shopping-basket__line-product-dates');

        var _dateMatch = _dates === null || _dates === void 0 ? void 0 : _dates.textContent.match(/(\d{2}\/\d{2}\/\d{4})/g);

        if (_dateMatch && _dateMatch[0]) {
          return _dateMatch[0].split('/').reverse().join('-');
        }
      }

      return null;
    };

    var getCheckout = function getCheckout() {
      if (isHotelPage) {
        var datesBox = document.querySelector('span.search-summary__dates');
        var dates = datesBox.innerText.trim();
        var dateMatch = dates === null || dates === void 0 ? void 0 : dates.match(/(\d{2}\/\d{2}\/\d{4})/g);

        if (dateMatch && dateMatch[1]) {
          return dateMatch[1].split('/').reverse().join('-');
        }
      }

      if (isBookingForm) {
        var _dates2 = document.querySelector('div.shopping-basket__line-product-dates');

        var _dateMatch2 = _dates2 === null || _dates2 === void 0 ? void 0 : _dates2.textContent.match(/(\d{2}\/\d{2}\/\d{4})/g);

        if (_dateMatch2 && _dateMatch2[1]) {
          return _dateMatch2[1].split('/').reverse().join('-');
        }
      }

      return null;
    };

    var getExternalHotelName = function getExternalHotelName() {
      if (isHotelPage) {
        var hotelName = document.querySelector('h2.details-card__title');

        if (hotelName) {
          return hotelName.textContent;
        }
      }

      if (isBookingForm) {
        var _hotelName = document.querySelector('h2.shopping-basket__line-product-details-name');

        if (_hotelName) {
          return _hotelName.textContent.trim();
        }
      }

      return null;
    };

    var getExternalId = function getExternalId() {
      if (isHotelPage) {
        var searchParams = new URLSearchParams(window.location.search);
        var hotelId = searchParams.get('UID');

        if (hotelId) {
          return hotelId.match(/(?<=GHU@).+/)[0];
        }
      }

      if (isBookingForm) {
        return getDataFromScript('produt_id');
      }

      return null;
    };

    var getRoomsNumber = function getRoomsNumber() {
      if (isHotelPage) {
        var roomsNumber = document.querySelector('span.counter.room-counter .amount');

        if (roomsNumber) {
          return +roomsNumber.textContent;
        }
      }

      if (isBookingForm) {
        return getDataFromScript('rooms');
      }

      return null;
    };

    var getMeal = function getMeal() {
      if (isHotelPage) {
        var mealTypeBox = document.querySelector('.result-option__subtitle');
        var roomsNumber = getRoomsNumber();
        var language = getLanguage();

        if (!roomsNumber) {
          return null;
        }

        if (mealTypeBox) {
          var mealType = mealTypeBox.textContent;

          if (mealType === roomOnly[language] || mealType === selfCatering[language]) {
            return new Array(roomsNumber).fill(false)[0];
          }

          return new Array(roomsNumber).fill(true)[0];
        }
      }

      if (isBookingForm) {
        var _mealTypeBox = document.querySelector('span.board');

        var rooms = getDataFromScript('rooms');

        if (!rooms) {
          return null;
        }

        if (_mealTypeBox) {
          var _mealType = _mealTypeBox.textContent;
          var hasMeal = ['breakfast', 'half board'].some(function (meal) {
            return _mealType.toLowerCase().includes(meal);
          });
          return new Array(rooms).fill(hasMeal)[0];
        }
      }

      return null;
    };

    var getMealType = function getMealType() {
      if (isHotelPage) {
        var mealTypeBox = document.querySelector('.result-option__subtitle');
        var roomsNumber = getRoomsNumber();
        var language = getLanguage();

        if (!roomsNumber) {
          return null;
        }

        if (mealTypeBox) {
          var mealType = mealTypeBox.textContent.trim();
          var mealTypeEng;

          switch (mealType) {
            case roomOnly[language]:
              mealTypeEng = 'RO';
              break;

            case selfCatering[language]:
              mealTypeEng = 'SC';
              break;

            case bedAndBreakfast[language]:
              mealTypeEng = 'BB';
              break;

            case halfBoard[language]:
              mealTypeEng = 'HB';
              break;

            default:
              mealTypeEng = null;
          }

          return new Array(roomsNumber).fill(mealTypeEng);
        }
      }

      if (isBookingForm) {
        var _mealTypeBox2 = document.querySelector('span.board');

        var rooms = getDataFromScript('rooms');

        if (!rooms) {
          return null;
        }

        if (_mealTypeBox2) {
          var _mealType2 = _mealTypeBox2.textContent;

          var _mealTypeEng;

          if (_mealType2.includes('room only')) {
            _mealTypeEng = 'RO';
          } else if (_mealType2.includes('self catering')) {
            _mealTypeEng = 'SC';
          } else if (_mealType2.includes('half board')) {
            _mealTypeEng = 'HB';
          } else if (_mealType2.includes('bed & breakfast') || _mealType2.includes('bed + continental breakfast') || _mealType2.includes('english breakfast')) {
            _mealTypeEng = 'BB';
          } else {
            _mealTypeEng = null;
          }

          return new Array(rooms).fill(_mealTypeEng);
        }
      }

      return null;
    };

    var getCancellationBefore = function getCancellationBefore() {
      if (isHotelPage) {
        var roomsNumber = getRoomsNumber();
        var firstPack = document.querySelector('div.result-option');
        var nonRefundable = firstPack.querySelector('btn.offer-info__item.offer-info__item--exclamation');

        if (nonRefundable) {
          return new Array(roomsNumber).fill(null)[0];
        }

        var checkin = getCheckin();

        if (checkin) {
          var checkinDate = new Date(checkin);
          var millisecsPerDay = 86400000;
          var dayBeforeCheckin = new Date(checkinDate - millisecsPerDay); // eslint-disable-next-line max-len

          var prettyFreeCancellationDate = "".concat(dayBeforeCheckin.getFullYear(), "-").concat("".concat(dayBeforeCheckin.getMonth() + 1).padStart(2, '0'), "-").concat("".concat(dayBeforeCheckin.getDate()).padStart(2, '0'));
          return new Array(roomsNumber).fill(prettyFreeCancellationDate)[0];
        }
      }

      if (isBookingForm) {
        var rooms = getDataFromScript('rooms');
        var cancellationPolicy = document.querySelector('.shopping-basket__cancel-deadline');

        if (cancellationPolicy) {
          var match = cancellationPolicy.textContent.match(/\d{2}\/\d{2}\/\d{4}/);

          if (match) {
            var prettyDate = match[0].split('/').reverse().join('-');
            return new Array(rooms).fill(prettyDate)[0];
          }
        }

        return new Array(rooms).fill(null)[0];
      }

      return null;
    };

    var getPostPay = function getPostPay() {
      if (isHotelPage) {
        var roomsNumber = getRoomsNumber();

        if (roomsNumber) {
          return new Array(roomsNumber).fill(false)[0];
        }
      }

      if (isBookingForm) {
        var rooms = getDataFromScript('rooms');
        return new Array(rooms).fill(false)[0];
      }

      return null;
    };

    var getRoomName = function getRoomName() {
      if (isHotelPage) {
        var firstPack = document.querySelector('div.result-option');
        var rooms = firstPack.querySelectorAll('div.result-option__title');
        var roomsArr = Array.from(rooms);
        var roomNames = roomsArr.map(function (item) {
          var multiplier = 1;
          var matchMultiplier = item.textContent.match(/x \d/);

          if (matchMultiplier) {
            var multiplierBox = matchMultiplier[0];
            multiplier = multiplierBox[multiplierBox.length - 1];
          }

          var roomName = item.getAttribute('title').trim();
          var identicalRooms = [];
          identicalRooms.length = multiplier;
          identicalRooms.fill(roomName);
          return identicalRooms;
        });

        if (roomNames.length) {
          return roomNames.flat();
        }
      }

      if (isBookingForm) {
        var parent = document.querySelector('div.shopping-basket__line-product-details');

        var _rooms = parent === null || parent === void 0 ? void 0 : parent.querySelectorAll('span.room');

        var _roomsArr = Array.from(_rooms);

        var _roomNames = _roomsArr.map(function (item) {
          if (item.textContent.includes('/')) {
            var roomName = item.textContent.match(/(?<=\/)(.+)/);
            return roomName && roomName[1];
          }

          return item.textContent;
        });

        if (_roomNames.length) {
          return _roomNames;
        }
      }

      return null;
    };

    var getPrice = function getPrice() {
      if (isHotelPage) {
        var spans = document.querySelectorAll('.result-option .result-option-price__amount');
        var spansArr = Array.from(spans);
        var prices = spansArr.map(function (price) {
          var textContent = price.textContent.trim();
          var match = textContent.match(/\S+/);
          return match && parsePrice(match[0]);
        }).sort(function (a, b) {
          return a - b;
        });
        var cheapestPrice = prices[0];

        if (cheapestPrice) {
          return cheapestPrice;
        }
      }

      if (isBookingForm) {
        return getDataFromScript('price');
      }

      return null;
    };

    var getTaxes = function getTaxes() {
      if (isHotelPage) {
        var roomsNumber = getRoomsNumber();

        if (roomsNumber) {
          return new Array(roomsNumber).fill(0)[0];
        }
      }

      if (isBookingForm) {
        var rooms = getDataFromScript('rooms');
        return new Array(rooms).fill(0)[0];
      }

      return null;
    };

    var getAdults = function getAdults() {
      if (isHotelPage) {
        var roomsNumber = +document.querySelector('span.counter.room-counter .amount').textContent;
        var roomsContainer = document.querySelector('div.rooms-container');
        var rooms = roomsContainer.querySelectorAll('.room');
        var roomsArr = Array.from(rooms);
        var adultsPerRoom = roomsArr.map(function (item) {
          return +item.querySelector('.adults-container .form-control').value;
        }).slice(0, roomsNumber);

        if (adultsPerRoom.length) {
          return adultsPerRoom;
        }
      }

      if (isBookingForm) {
        var _containers$;

        var containers = document.querySelectorAll('.shopping-basket__column');
        var firstContainer = (_containers$ = containers[1]) === null || _containers$ === void 0 ? void 0 : _containers$.innerText.split('\n');

        if (firstContainer) {
          var adults = firstContainer.map(function (item) {
            var match = item.match(/(\d{1,2})/g);
            return match && +match[1];
          });

          if (adults.length) {
            return adults;
          }
        }
      }

      return null;
    };

    var getChildrenYears = function getChildrenYears() {
      if (isHotelPage) {
        var roomsNumber = +document.querySelector('span.counter.room-counter .amount').textContent;
        var roomsContainer = document.querySelector('div.rooms-container');
        var rooms = roomsContainer.querySelectorAll('.room');
        var roomsArr = Array.from(rooms);
        var children = [];

        for (var i = 0; i < roomsNumber; i += 1) {
          var childrenPerRoom = +roomsArr[i].querySelector('.children-container .form-control').value;

          if (childrenPerRoom === 0) {
            children.push([]);
          } else {
            var childrenAges = [];
            var childrenAgePerRoom = roomsArr[i].querySelectorAll('.children-option-group .form-control.age');

            for (var k = 0; k < childrenPerRoom; k += 1) {
              var childAge = +childrenAgePerRoom[k].value;
              childrenAges.push(childAge);
            }

            children.push(childrenAges);
          }
        }

        return children;
      }

      if (isBookingForm) {
        var _containers$2;

        var containers = document.querySelectorAll('.shopping-basket__column');
        var firstContainer = (_containers$2 = containers[1]) === null || _containers$2 === void 0 ? void 0 : _containers$2.innerText.split('\n');

        if (firstContainer) {
          var _children = firstContainer.map(function (item) {
            var matchString = item.match(/(.+)(?=\))/);

            if (matchString) {
              var targetString = matchString[0];

              if (targetString.match(/(\d{1,2})/g)[2]) {
                var allNumbers = targetString.match(/\d{1,2}/g);
                return allNumbers.slice(3).map(function (age) {
                  return +age;
                });
              }
            }

            return [];
          });

          if (_children.length) {
            return _children;
          }
        }
      }

      return null;
    };

    var getCurrency = function getCurrency() {
      var currency = document.querySelector('#currency-selector-btn');

      if (currency) {
        return currency.textContent.trim();
      }

      return null;
    };

    var getResidency = function getResidency() {
      if (isHotelPage) {
        var residency = document.querySelector('#hotel-searcher-nationality');

        if (residency) {
          return residency.value.toLowerCase();
        }
      }

      if (isBookingForm) {
        var _residency = document.querySelector('select[name="country"]');

        if (_residency) {
          return _residency.value.toLowerCase();
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
      competitor: 'W2M',
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
      residency: getResidency(),
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
};

var intervalId = setInterval(function () {
  var pricesHP = document.querySelector('#results-list');
  var priceBF = document.querySelector('.shopping-basket__total');

  if (pricesHP || priceBF) {
    parse();
    clearInterval(intervalId);
  }
}, 250);