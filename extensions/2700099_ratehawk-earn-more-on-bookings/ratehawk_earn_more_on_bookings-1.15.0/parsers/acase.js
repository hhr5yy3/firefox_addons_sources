"use strict";

var _mealTypeMessages, _cancellationMessages, _cancellationStartMes, _taxesMessages, _roomTypeMessages, _hotelNameMessages, _checkInMessages, _adultsMessages;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

var Page = {
  HOTEL_PAGE: 'hotelpage',
  BOOKING_FORM: 'booking_form'
};
var Regex = {
  HOTEL_PAGE: /bookagentX.jsp$/,
  BOOKING_FORM: /editorder.jsp$/,
  DIGITS: /\d+/g,
  SPACES: /\s+/g,
  PRICE: /[\d,.]+/g,
  CURRENCY: /(\w{1,3})$/
};
var Language = {
  RU: 'ru',
  EN: 'en'
};
var mealTypeMessages = (_mealTypeMessages = {}, _defineProperty(_mealTypeMessages, Language.RU, {
  'Завтрак "Шведский стол"': 'breakfast-buffet',
  'Завтрак "Континентальный"': 'continental-breakfast',
  'Завтрак по меню': 'breakfast',
  'Завтрак "А ля карт"': 'breakfast',
  'Полный пансион': 'full-board',
  Полупансион: 'half-board',
  'Все включено': 'all-inclusive',
  'Завтрак "Сет меню"': 'breakfast',
  'Завтрак Комплексное меню': 'breakfast',
  'Ланч-бокс завтрак': 'breakfast'
}), _defineProperty(_mealTypeMessages, Language.EN, {
  'Buffet breakfast': 'breakfast-buffet',
  'Continental breakfast': 'continental-breakfast',
  'Breakfast a la carte': 'breakfast',
  'Breakfast "A la carte"': 'breakfast',
  'Full Board': 'full-board',
  'Half board': 'half-board',
  'All inclusive': 'all-inclusive',
  'Set menu breakfast': 'breakfast',
  'Breakfast Set menu': 'breakfast',
  'Lunch-Box breakfast': 'breakfast'
}), _mealTypeMessages);
var cancellationMessages = (_cancellationMessages = {}, _defineProperty(_cancellationMessages, Language.RU, 'БЕСПЛАТНАЯ отмена заявки возможна до'), _defineProperty(_cancellationMessages, Language.EN, 'FREE cancellations are possible up to'), _cancellationMessages);
var cancellationStartMessages = (_cancellationStartMes = {}, _defineProperty(_cancellationStartMes, Language.RU, 'Штрафные санкции наступают с'), _defineProperty(_cancellationStartMes, Language.EN, ''), _cancellationStartMes);
var taxesMessages = (_taxesMessages = {}, _defineProperty(_taxesMessages, Language.RU, 'В том числе НДС'), _defineProperty(_taxesMessages, Language.EN, 'VAT included in price'), _taxesMessages);
var roomTypeMessages = (_roomTypeMessages = {}, _defineProperty(_roomTypeMessages, Language.RU, 'Тип номера:'), _defineProperty(_roomTypeMessages, Language.EN, 'Room Type:'), _roomTypeMessages);
var hotelNameMessages = (_hotelNameMessages = {}, _defineProperty(_hotelNameMessages, Language.RU, 'Размещение в гостинице'), _defineProperty(_hotelNameMessages, Language.EN, ''), _hotelNameMessages);
var checkInMessages = (_checkInMessages = {}, _defineProperty(_checkInMessages, Language.RU, 'Период:'), _defineProperty(_checkInMessages, Language.EN, ''), _checkInMessages);
var adultsMessages = (_adultsMessages = {}, _defineProperty(_adultsMessages, Language.RU, 'господин|госпожа'), _defineProperty(_adultsMessages, Language.EN, ''), _adultsMessages);

var parsePrice = function parsePrice(price) {
  return parseFloat(price.replace(/[.,  ](?!\d{1,2}$)/g, '').replace(',', '.'));
};

var isHotelPage = Regex.HOTEL_PAGE.test(document.location.pathname);
var isBookingForm = Regex.BOOKING_FORM.test(document.location.pathname);

if (isHotelPage || isBookingForm) {
  var getLanguage = function getLanguage() {
    var langRefs = document.querySelectorAll('[data-target-lang]');

    if (langRefs) {
      var activeLangRef = _toConsumableArray(langRefs).find(function (it) {
        return it.classList.contains('active');
      });

      if (activeLangRef) {
        return activeLangRef.dataset.targetLang;
      }
    }

    return 'ru';
  };

  var language = getLanguage();

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
      var photoRef = document.querySelector('.foto img');

      if (photoRef) {
        var alt = photoRef.alt;

        if (alt) {
          return alt.replace('Гостиница ', '').trim();
        }
      }

      var hotelLabelRef = document.querySelector('#hotelLabel');

      if (hotelLabelRef) {
        var _hotelLabelRef$textCo = hotelLabelRef.textContent.split('('),
            _hotelLabelRef$textCo2 = _slicedToArray(_hotelLabelRef$textCo, 1),
            hotelName = _hotelLabelRef$textCo2[0];

        return hotelName.replace('Гостиница ', '').trim();
      }
    }

    if (isBookingForm) {
      var summaryTableRef = document.querySelector('.rowSegmentMain');

      if (summaryTableRef) {
        var row = summaryTableRef.querySelector('tr:nth-child(1) td:nth-child(2)');

        if (row) {
          var regex = new RegExp("".concat(hotelNameMessages[language], " (.+?)(?=\\()"));
          var match = row.textContent.match(regex);

          if (match && match[1]) {
            return match[1].trim();
          }
        }
      }
    }

    return null;
  };

  var getExternalId = function getExternalId() {
    if (isHotelPage) {
      var inputRef = document.querySelector('#hcode');

      if (inputRef) {
        return inputRef.value.trim();
      }

      var hintRef = document.querySelector('div[id*="hinthtl_"]');

      if (hintRef) {
        var match = hintRef.id.match(Regex.DIGITS);

        if (match) {
          return match[0];
        }
      }
    }

    if (isBookingForm) {// ...
    }

    return null;
  };

  var getCheckin = function getCheckin() {
    if (isHotelPage) {
      var inputRef = document.querySelector('#arr');

      if (inputRef) {
        var _inputRef$value$split = inputRef.value.split('.'),
            _inputRef$value$split2 = _slicedToArray(_inputRef$value$split, 3),
            day = _inputRef$value$split2[0],
            month = _inputRef$value$split2[1],
            year = _inputRef$value$split2[2];

        return "".concat(year, "-").concat(month, "-").concat(day);
      }

      var labelRef = document.querySelector('#ba_head table tr:nth-child(2) td:first-child label:nth-of-type(1)');

      if (labelRef) {
        var _labelRef$textContent = labelRef.textContent.trim().split('.'),
            _labelRef$textContent2 = _slicedToArray(_labelRef$textContent, 3),
            _day = _labelRef$textContent2[0],
            _month = _labelRef$textContent2[1],
            _year = _labelRef$textContent2[2];

        return "".concat(_year, "-").concat(_month, "-").concat(_day);
      }
    }

    if (isBookingForm) {
      var cartTableRowRef = document.querySelector('.cart_table tr:nth-child(1)');

      if (cartTableRowRef) {
        var _cartTableRowRef$quer = cartTableRowRef.querySelectorAll('td'),
            _cartTableRowRef$quer2 = _slicedToArray(_cartTableRowRef$quer, 2),
            title = _cartTableRowRef$quer2[0],
            content = _cartTableRowRef$quer2[1];

        if (title && title.textContent === checkInMessages[language] && content) {
          var checkin = content.textContent.split('—')[0].trim();

          if (checkin) {
            var _checkin$split = checkin.split('.'),
                _checkin$split2 = _slicedToArray(_checkin$split, 3),
                _day2 = _checkin$split2[0],
                _month2 = _checkin$split2[1],
                _year2 = _checkin$split2[2];

            return "".concat(_year2, "-").concat(_month2, "-").concat(_day2);
          }
        }
      }
    }

    return null;
  };

  var getCheckout = function getCheckout() {
    if (isHotelPage) {
      var inputRef = document.querySelector('#dep');

      if (inputRef) {
        var _inputRef$value$split3 = inputRef.value.split('.'),
            _inputRef$value$split4 = _slicedToArray(_inputRef$value$split3, 3),
            day = _inputRef$value$split4[0],
            month = _inputRef$value$split4[1],
            year = _inputRef$value$split4[2];

        return "".concat(year, "-").concat(month, "-").concat(day);
      }

      var labelRef = document.querySelector('#ba_head table tr:nth-child(2) td:first-child label:nth-of-type(2)');

      if (labelRef) {
        var _labelRef$textContent3 = labelRef.textContent.trim().split('.'),
            _labelRef$textContent4 = _slicedToArray(_labelRef$textContent3, 3),
            _day3 = _labelRef$textContent4[0],
            _month3 = _labelRef$textContent4[1],
            _year3 = _labelRef$textContent4[2];

        return "".concat(_year3, "-").concat(_month3, "-").concat(_day3);
      }
    }

    if (isBookingForm) {
      var cartTableRowRef = document.querySelector('.cart_table tr:nth-child(1)');

      if (cartTableRowRef) {
        var _cartTableRowRef$quer3 = cartTableRowRef.querySelectorAll('td'),
            _cartTableRowRef$quer4 = _slicedToArray(_cartTableRowRef$quer3, 2),
            title = _cartTableRowRef$quer4[0],
            content = _cartTableRowRef$quer4[1];

        if (title && title.textContent === checkInMessages[language] && content) {
          var checkout = content.textContent.split('—')[1].trim();

          if (checkout) {
            var _checkout$split = checkout.split('.'),
                _checkout$split2 = _slicedToArray(_checkout$split, 3),
                _day4 = _checkout$split2[0],
                _month4 = _checkout$split2[1],
                _year4 = _checkout$split2[2];

            return "".concat(_year4, "-").concat(_month4, "-").concat(_day4);
          }
        }
      }
    }

    return null;
  };

  var getAdults = function getAdults() {
    if (isHotelPage) {
      var _document$querySelect;

      var inputRef = document.querySelector('input[name="nguests"]');
      var extraBedsNumber = ((_document$querySelect = document.querySelector('input[name="numberofextrabedsadult_input"]')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.value) || 0;

      if (inputRef) {
        var value = inputRef.value;
        return [+value + +extraBedsNumber];
      }

      var anotherInputRef = document.querySelector('input[name="nguests_input"]');

      if (anotherInputRef) {
        var _value = anotherInputRef.value;
        return [+_value + +extraBedsNumber];
      }
    }

    if (isBookingForm) {
      var summaryTableRef = document.querySelector('.rowSegmentMain');

      if (summaryTableRef) {
        var row = summaryTableRef.querySelector('tr:nth-child(1) td:nth-child(2)');

        if (row) {
          var regex = new RegExp("".concat(adultsMessages[language]), 'gi');
          var matches = row.textContent.match(regex);

          if (matches && matches.length) {
            return matches.length;
          }
        }
      }
    }

    return null;
  };

  var getMealType = function getMealType() {
    if (isHotelPage) {
      var inputRef = document.querySelector('input[name="mealcode"]');

      if (inputRef) {
        var text = inputRef.previousSibling;

        if (text) {
          var mealType = Object.keys(mealTypeMessages[language]).find(function (mt) {
            return text.textContent.includes(mt);
          });
          return mealTypeMessages[language][mealType] || null;
        }
      }

      inputRef = document.querySelector('input[name="mealcode_input"]');

      if (inputRef) {
        var _mealType = Object.keys(mealTypeMessages[language]).find(function (mt) {
          return inputRef.value.includes(mt);
        });

        return mealTypeMessages[language][_mealType] || null;
      }

      var roomRef = document.querySelector('#ba_head table tbody tr td strong + span');

      if (roomRef) {
        var _mealType2 = Object.keys(mealTypeMessages[language]).find(function (mt) {
          return roomRef.textContent.includes(mt);
        });

        return mealTypeMessages[language][_mealType2] || null;
      }
    }

    return null;
  };

  var getHasMeal = function getHasMeal() {
    return !!getMealType();
  };

  var getCancellationBefore = function getCancellationBefore() {
    if (isHotelPage) {
      var commentRefs = document.querySelectorAll('.comment');

      if (commentRefs) {
        var cancellationCommentRef = _toConsumableArray(commentRefs).find(function (it) {
          return it.textContent.includes(cancellationMessages[language]);
        });

        if (cancellationCommentRef) {
          var regex = new RegExp("".concat(cancellationMessages[language], " (\\d{2}.\\d{2}.\\d{4})"));
          var match = cancellationCommentRef.textContent.match(regex);

          if (match && match[1]) {
            var _match$1$split = match[1].split('.'),
                _match$1$split2 = _slicedToArray(_match$1$split, 3),
                day = _match$1$split2[0],
                month = _match$1$split2[1],
                year = _match$1$split2[2];

            return "".concat(year, "-").concat(month, "-").concat(day);
          }
        }
      }
    }

    if (isBookingForm) {
      var summaryTableRef = document.querySelector('.rowSegmentMain');

      if (summaryTableRef) {
        var row = summaryTableRef.querySelector('tr:nth-child(1) td:nth-child(2)');

        if (row) {
          var _regex = new RegExp("".concat(cancellationStartMessages[language], " (\\d{2}.\\d{2}.\\d{4})"));

          var _match = row.textContent.match(_regex);

          if (_match && _match[1]) {
            var _match$1$split3 = _match[1].split('.'),
                _match$1$split4 = _slicedToArray(_match$1$split3, 3),
                _day5 = _match$1$split4[0],
                _month5 = _match$1$split4[1],
                _year5 = _match$1$split4[2];

            return "".concat(_year5, "-").concat(_month5, "-").concat(_day5);
          }
        }
      }
    }

    return null;
  };

  var getPrice = function getPrice() {
    if (isHotelPage) {
      var priceRef = document.querySelector('#ba_body b label');

      if (priceRef) {
        return priceRef.textContent.trim();
      }
    }

    if (isBookingForm) {
      var summaryTableRef = document.querySelector('.rowSegmentMain');

      if (summaryTableRef) {
        var row = summaryTableRef.querySelector('tr:nth-child(1) td:nth-child(4)');

        if (row) {
          return row.textContent.trim();
        }
      }
    }

    return null;
  };

  var getCurrency = function getCurrency() {
    var priceWrapperRef = document.querySelector('#ba_body td:nth-child(2) b');

    if (priceWrapperRef) {
      var match = priceWrapperRef.innerText.match(Regex.CURRENCY);

      if (match) {
        return match[0];
      }
    }

    return 'RUB';
  };

  var getTaxes = function getTaxes() {
    if (isHotelPage) {
      var wrapperRef = document.querySelector('#ba_body td:nth-child(2) div');

      if (wrapperRef) {
        var regex = new RegExp("".concat(taxesMessages[language], " (\\d+.\\d+)"));
        var match = wrapperRef.innerText.replace(Regex.SPACES, ' ').match(regex);

        if (match) {
          return match[1];
        }
      }
    }

    if (isBookingForm) {
      var summaryTableRef = document.querySelector('.rowSegmentMain');

      if (summaryTableRef) {
        var row = summaryTableRef.querySelector('tr:nth-child(1) td:nth-child(5)');

        if (row) {
          return row.textContent.trim();
        }
      }
    }

    return null;
  };

  var getRoomName = function getRoomName() {
    var headRowRefs = document.querySelectorAll('#ba_head tr');

    if (headRowRefs) {
      var rowRef = _toConsumableArray(headRowRefs).find(function (it) {
        var strongRef = it.querySelector('strong');
        return strongRef && strongRef.textContent.trim() === roomTypeMessages[language];
      });

      if (rowRef) {
        var spanRef = rowRef.querySelector('span');

        if (spanRef) {
          return spanRef.textContent.trim();
        }
      }
    }

    return null;
  };

  var getResidency = function getResidency() {
    return 'ru';
  };

  var price = getPrice();

  if (isHotelPage) {
    var data = {
      competitor: 'ACS',
      funnel_step: getFunnelStep(),
      external_hotel_name: getExternalHotelName(),
      external_id: getExternalId(),
      checkin: getCheckin(),
      checkout: getCheckout(),
      adults: getAdults(),
      children_years: [[]],
      rooms_number: 1,
      has_meal: getHasMeal(),
      meal_type: getMealType(),
      cancellation_before: getCancellationBefore(),
      is_postpay: false,
      price: price && parsePrice(price),
      currency: getCurrency(),
      taxes: getTaxes(),
      room_name: getRoomName(),
      residency: getResidency(),
      language: language,
      html: document.body.outerHTML
    };
    chrome.runtime.sendMessage({
      command: 'SHOW_OFFER',
      data: data
    });
    sessionStorage.setItem('hpDataFromAcase', JSON.stringify(data));
  }

  if (isBookingForm) {
    var dataFromStorage = sessionStorage.getItem('hpDataFromAcase');
    var _data = null;

    if (dataFromStorage) {
      _data = _objectSpread(_objectSpread({}, JSON.parse(dataFromStorage)), {}, {
        funnel_step: 'booking_form'
      });
    }

    chrome.runtime.sendMessage({
      command: 'SHOW_OFFER',
      data: _data
    });
    document.querySelector('#SAVEORDER').addEventListener('click', function () {
      chrome.runtime.sendMessage({
        command: 'GET_COMPETITOR_ORDER_DATA',
        data: _data
      });
    });
  }
} else {
  chrome.runtime.sendMessage({
    command: 'SHOW_OFFER',
    data: null
  });
}