"use strict";

var _Month, _cancellationDateRege, _mealTypes;

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

// @ts-ignore
var Page = {
  HOTEL_PAGE: 'hotelpage',
  BOOKING_FORM: 'booking_form'
}; // @ts-ignore

var Regex = {
  HOTEL_PAGE: /Hotel-Information|Hotel-Beschreibung|Informazioni-Hotel|Informacion-Hotel|Hotelinfo|Description-Hotel|Hotellbeskrivning|Hotellinformasjon|Hotel-Reservas|Thong-tin-khach-san|hotellitiedot/,
  BOOKING_FORM: /\/HotelCheckout/,
  BOOKING_FORM_POSTPAY: /\/Checkout/
}; // @ts-ignore

var Language = {
  EN: 'en',
  ES: 'es',
  DE: 'de',
  IT: 'it',
  FR: 'fr'
}; // @ts-ignore

var Month = (_Month = {}, _defineProperty(_Month, Language.EN, ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']), _defineProperty(_Month, Language.DE, ['januar', 'februar', 'märz', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'dezember']), _defineProperty(_Month, Language.FR, ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'décembre']), _defineProperty(_Month, Language.ES, ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']), _defineProperty(_Month, Language.IT, ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'lugio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre']), _Month); // @ts-ignore

var cancellationDateRegexps = (_cancellationDateRege = {}, _defineProperty(_cancellationDateRege, Language.EN, new RegExp('(\\d+) (.+)', 'i')), _defineProperty(_cancellationDateRege, Language.DE, new RegExp('(\\d+). (.+)', 'i')), _defineProperty(_cancellationDateRege, Language.ES, new RegExp('(\\d+) de (.+)\\.', 'i')), _defineProperty(_cancellationDateRege, Language.FR, new RegExp('(\\d+) (.+)', 'i')), _defineProperty(_cancellationDateRege, Language.IT, new RegExp('(\\d+) (.+)', 'i')), _cancellationDateRege); // @ts-ignore

var parsePrice = function parsePrice(price) {
  return parseFloat(price.replace(/[.,  ](?!\d{1,2}$)/g, '').replace(',', '.'));
}; // @ts-ignore


var reverseDate = function reverseDate(date, separator) {
  return date.split(separator).reverse().join('-');
};

var MAX_ROOMS = 8; // @ts-ignore

var isHotelPage = Regex.HOTEL_PAGE.test(document.location.pathname); // @ts-ignore

var isBookingForm = Regex.BOOKING_FORM.test(document.location.pathname); // @ts-ignore

var isPostpayBookingForm = Regex.BOOKING_FORM_POSTPAY.test(document.location.pathname); // @ts-ignore

var mealTypes = (_mealTypes = {}, _defineProperty(_mealTypes, Language.EN, {
  'breakfast for 2': 'breakfast-for-2',
  'breakfast included': 'breakfast',
  'continental breakfast': 'continental-breakfast',
  'breakfast buffet': 'breakfast-buffet',
  'lunch included': 'lunch',
  'dinner included': 'dinner',
  'all inclusive': 'all-inclusive',
  'half board': 'half-board',
  'full board': 'full-board',
  breakfast: 'breakfast'
}), _defineProperty(_mealTypes, Language.ES, {
  'desayuno incluido': 'breakfast',
  'todo incluido': 'all-inclusive',
  'cena incluida': 'dinner',
  'almuerzo incluido': 'lunch',
  'media pensión': 'half-board',
  'pensión completa': 'full-board',
  desayuno: 'breakfast',
  'desayuno, almuerzo y cena': 'full-board',
  'desayuno y cena': 'half-board-dinner',
  'desayuno estilo bufé': 'breakfast-buffet'
}), _defineProperty(_mealTypes, Language.DE, {
  'frühstück inbegriffen': 'breakfast',
  'mittagessen inbegriffen': 'lunch',
  frühstücksbuffet: 'breakfast-buffet',
  frühstück: 'breakfast',
  'abendessen inbegriffen': 'dinner',
  'all-inclusive': 'all-inclusive',
  halbpension: 'half-board',
  vollpension: 'full-board'
}), _defineProperty(_mealTypes, Language.IT, {
  'colazione inclusa': 'breakfast',
  'Colazione a buffet': 'breakfast-buffet',
  colazione: 'breakfast',
  'pranzo incluso': 'lunch',
  'cena inclusa': 'dinner',
  'all inclusive': 'all-inclusive',
  'mezza pensione': 'half-board',
  'pensione completa': 'full-board'
}), _defineProperty(_mealTypes, Language.FR, {
  'petit-déjeuner compris': 'breakfast',
  'déjeuner inclus': 'lunch',
  'dîner inclus': 'dinner',
  'tout compris': 'all-inclusive',
  'pension complète': 'full-board',
  'demi-pension': 'half-board',
  'Petit-déjeuner buffet': 'breakfast-buffet',
  'petit-déjeuner': 'breakfast'
}), _mealTypes);

if (isHotelPage || isBookingForm || isPostpayBookingForm) {
  var getFunnelStep = function getFunnelStep() {
    if (isHotelPage) {
      // @ts-ignore
      return Page.HOTEL_PAGE;
    }

    if (isBookingForm || isPostpayBookingForm) {
      return Page.BOOKING_FORM;
    }

    return null;
  };

  var getCheckin = function getCheckin() {
    if (isHotelPage) {
      var inputRef = document.querySelector('#hotels-check-in');

      if (inputRef) {
        return inputRef.value;
      }

      var searchParams = new URLSearchParams(window.location.search);
      var date = searchParams.get('chkin');

      if (date) {
        return date.includes('/') ? reverseDate(date, '/') : date;
      }
    }

    if (isBookingForm) {
      var _document$querySelect, _rateInfo$match;

      var rateInfo = (_document$querySelect = document.querySelector('#platform-analytics-prime')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.outerHTML;

      var _date = rateInfo === null || rateInfo === void 0 ? void 0 : (_rateInfo$match = rateInfo.match(/checkindate":"(\d{4}-\d{2}-\d{2})"/i)) === null || _rateInfo$match === void 0 ? void 0 : _rateInfo$match[1];

      if (!_date) {
        var _rateInfo$replaceAll$;

        _date = rateInfo === null || rateInfo === void 0 ? void 0 : (_rateInfo$replaceAll$ = rateInfo.replaceAll('&quot;', '').match(/checkindate:(\d{4}-\d{2}-\d{2})/i)) === null || _rateInfo$replaceAll$ === void 0 ? void 0 : _rateInfo$replaceAll$[1];
      }

      return _date || null;
    }

    if (isPostpayBookingForm) {
      var _document$querySelect2, _document$querySelect3, _document$querySelect4;

      return ((_document$querySelect2 = document.querySelector('#app + script')) === null || _document$querySelect2 === void 0 ? void 0 : (_document$querySelect3 = _document$querySelect2.textContent) === null || _document$querySelect3 === void 0 ? void 0 : (_document$querySelect4 = _document$querySelect3.match(/\d{4}-\d{2}-\d{2}/g)) === null || _document$querySelect4 === void 0 ? void 0 : _document$querySelect4[1]) || null;
    }

    return null;
  };

  var getCheckout = function getCheckout() {
    if (isHotelPage) {
      var inputRef = document.querySelector('#hotels-check-out');

      if (inputRef) {
        return inputRef.value;
      }

      var searchParams = new URLSearchParams(window.location.search);
      var date = searchParams.get('chkout');

      if (date) {
        return date.includes('/') ? reverseDate(date, '/') : date;
      }
    }

    if (isBookingForm) {
      var _document$querySelect5, _rateInfo$match2;

      var rateInfo = (_document$querySelect5 = document.querySelector('#platform-analytics-prime')) === null || _document$querySelect5 === void 0 ? void 0 : _document$querySelect5.outerHTML;

      var _date2 = rateInfo === null || rateInfo === void 0 ? void 0 : (_rateInfo$match2 = rateInfo.match(/checkoutdate":"(\d{4}-\d{2}-\d{2})"/i)) === null || _rateInfo$match2 === void 0 ? void 0 : _rateInfo$match2[1];

      if (!_date2) {
        var _rateInfo$replaceAll$2;

        _date2 = rateInfo === null || rateInfo === void 0 ? void 0 : (_rateInfo$replaceAll$2 = rateInfo.replaceAll('&quot;', '').match(/checkoutdate:(\d{4}-\d{2}-\d{2})/i)) === null || _rateInfo$replaceAll$2 === void 0 ? void 0 : _rateInfo$replaceAll$2[1];
      }

      return _date2 || null;
    }

    if (isPostpayBookingForm) {
      var _document$querySelect6, _document$querySelect7, _document$querySelect8;

      return ((_document$querySelect6 = document.querySelector('#app + script')) === null || _document$querySelect6 === void 0 ? void 0 : (_document$querySelect7 = _document$querySelect6.textContent) === null || _document$querySelect7 === void 0 ? void 0 : (_document$querySelect8 = _document$querySelect7.match(/\d{4}-\d{2}-\d{2}/g)) === null || _document$querySelect8 === void 0 ? void 0 : _document$querySelect8[0]) || null;
    }

    return null;
  };

  var getExternalHotelName = function getExternalHotelName() {
    if (isHotelPage) {
      var hotelName = document.querySelector('h1');

      if (hotelName) {
        var _hotelName$textConten;

        return hotelName === null || hotelName === void 0 ? void 0 : (_hotelName$textConten = hotelName.textContent) === null || _hotelName$textConten === void 0 ? void 0 : _hotelName$textConten.trim();
      }
    }

    if (isBookingForm) {
      var _document$querySelect9;

      return ((_document$querySelect9 = document.querySelector('.hotel-summary-name')) === null || _document$querySelect9 === void 0 ? void 0 : _document$querySelect9.textContent) || null;
    }

    if (isPostpayBookingForm) {
      var _document$querySelect10;

      return ((_document$querySelect10 = document.querySelector('h2.uitk-heading-5')) === null || _document$querySelect10 === void 0 ? void 0 : _document$querySelect10.textContent) || null;
    }

    return null;
  };

  var getExternalId = function getExternalId() {
    if (isHotelPage) {
      var id = window.location.pathname.match(/\/.+.h(\d+)./);

      if (id) {
        return "".concat(id[1]);
      }
    }

    if (isBookingForm) {
      var _document$querySelect11, _rateInfo$match3;

      var rateInfo = (_document$querySelect11 = document.querySelector('#platform-analytics-prime')) === null || _document$querySelect11 === void 0 ? void 0 : _document$querySelect11.outerHTML;
      var date = rateInfo === null || rateInfo === void 0 ? void 0 : (_rateInfo$match3 = rateInfo.match(/"hotelid":(\d+)/i)) === null || _rateInfo$match3 === void 0 ? void 0 : _rateInfo$match3[1];

      if (!date) {
        var _rateInfo$replaceAll$3;

        date = rateInfo === null || rateInfo === void 0 ? void 0 : (_rateInfo$replaceAll$3 = rateInfo.replaceAll('&quot;', '').match(/hotelid:(\d+)/i)) === null || _rateInfo$replaceAll$3 === void 0 ? void 0 : _rateInfo$replaceAll$3[1];
      }

      return date || null;
    }

    if (isPostpayBookingForm) {
      var _document$querySelect12, _document$querySelect13, _document$querySelect14;

      return ((_document$querySelect12 = document.querySelector('#app + script')) === null || _document$querySelect12 === void 0 ? void 0 : (_document$querySelect13 = _document$querySelect12.textContent) === null || _document$querySelect13 === void 0 ? void 0 : (_document$querySelect14 = _document$querySelect13.match(/Hotel:(\d+)/)) === null || _document$querySelect14 === void 0 ? void 0 : _document$querySelect14[1]) || null;
    }

    return null;
  };

  var getHasMeal = function getHasMeal() {
    var _getMealType;

    return (_getMealType = getMealType()) === null || _getMealType === void 0 ? void 0 : _getMealType.map(function (mt) {
      return !!mt;
    });
  };

  var getLanguage = function getLanguage() {
    var _document$querySelect15;

    return ((_document$querySelect15 = document.querySelector('html')) === null || _document$querySelect15 === void 0 ? void 0 : _document$querySelect15.getAttribute('lang')) || 'en';
  };

  var language = getLanguage();

  var getCancellationBefore = function getCancellationBefore() {
    var cancellationRef = document.querySelector(isBookingForm ? '.free-cancellation-details a' : 'h4.uitk-messaging-card-section-header');

    if (isHotelPage) {
      var _getCheapestRate, _getCheapestRate$rate;

      cancellationRef = ((_getCheapestRate = getCheapestRate()) === null || _getCheapestRate === void 0 ? void 0 : (_getCheapestRate$rate = _getCheapestRate.rate) === null || _getCheapestRate$rate === void 0 ? void 0 : _getCheapestRate$rate.querySelector('h4 + div + div')) || null;
    }

    if (cancellationRef) {
      var _cancellationRef, _cancellationRef$text;

      var _ref = ((_cancellationRef = cancellationRef) === null || _cancellationRef === void 0 ? void 0 : (_cancellationRef$text = _cancellationRef.textContent) === null || _cancellationRef$text === void 0 ? void 0 : _cancellationRef$text.match(cancellationDateRegexps[language])) || [],
          _ref2 = _slicedToArray(_ref, 3),
          date = _ref2[1],
          month = _ref2[2];

      if (date && month) {
        var _Month$language;

        var beautifiedMonth = ((_Month$language = Month[language]) === null || _Month$language === void 0 ? void 0 : _Month$language.find(function (fullMonth) {
          return fullMonth.includes(month.toLowerCase());
        })) || '';
        return "".concat(new Date().getFullYear(), "-").concat("".concat(Month[language].indexOf(beautifiedMonth) + 1).padStart(2, '0'), "-").concat(date.padStart(2, '0'));
      }
    }

    return null;
  };

  var getPostPay = function getPostPay() {
    if (isHotelPage) {
      var _getCheapestRate2, _getCheapestRate2$rat;

      var isPostPay = false;
      (_getCheapestRate2 = getCheapestRate()) === null || _getCheapestRate2 === void 0 ? void 0 : (_getCheapestRate2$rat = _getCheapestRate2.rate) === null || _getCheapestRate2$rat === void 0 ? void 0 : _getCheapestRate2$rat.querySelectorAll('[data-stid="room-score-text"] + ul li').forEach(function (infoItem) {
        var _infoItem$textContent;

        if ((_infoItem$textContent = infoItem.textContent) !== null && _infoItem$textContent !== void 0 && _infoItem$textContent.includes('pay later')) {
          isPostPay = true;
        }
      });
      return isPostPay;
    }

    if (isPostpayBookingForm || isBookingForm) {
      return !!document.querySelector('.no-charge-statement');
    }

    if (isBookingForm) {
      return false;
    }

    return null;
  };

  var getRoomName = function getRoomName() {
    if (isHotelPage) {
      var _getCheapestRate3, _getCheapestRate3$rat, _getCheapestRate3$rat2;

      return Array(roomsNumber).fill(((_getCheapestRate3 = getCheapestRate()) === null || _getCheapestRate3 === void 0 ? void 0 : (_getCheapestRate3$rat = _getCheapestRate3.rate) === null || _getCheapestRate3$rat === void 0 ? void 0 : (_getCheapestRate3$rat2 = _getCheapestRate3$rat.querySelector('.uitk-heading-6')) === null || _getCheapestRate3$rat2 === void 0 ? void 0 : _getCheapestRate3$rat2.textContent) || null);
    }

    if (isBookingForm) {
      var _document$querySelect16, _document$querySelect17, _document$querySelect18;

      var roomNameRef = ((_document$querySelect16 = document.querySelector('.room-description')) === null || _document$querySelect16 === void 0 ? void 0 : (_document$querySelect17 = _document$querySelect16.textContent) === null || _document$querySelect17 === void 0 ? void 0 : _document$querySelect17.trim()) || ((_document$querySelect18 = document.querySelector('.hotel-summary-name')) === null || _document$querySelect18 === void 0 ? void 0 : _document$querySelect18.textContent);

      if (roomNameRef) {
        return Array(roomsNumber).fill(roomNameRef === null || roomNameRef === void 0 ? void 0 : roomNameRef.trim());
      }
    }

    if (isPostpayBookingForm) {
      var _roomsNumber = getRoomsNumber();

      if (_roomsNumber) {
        var _document$querySelect19, _document$querySelect20, _document$querySelect21;

        var roomName = (_document$querySelect19 = document.querySelector('[data-stid="room-type-0"]')) === null || _document$querySelect19 === void 0 ? void 0 : (_document$querySelect20 = _document$querySelect19.textContent) === null || _document$querySelect20 === void 0 ? void 0 : (_document$querySelect21 = _document$querySelect20.match(/\d Rooms?: (.+)/)) === null || _document$querySelect21 === void 0 ? void 0 : _document$querySelect21[1];
        return Array(_roomsNumber).fill(roomName);
      }
    }

    return null;
  };

  var getCheapestRate = function getCheapestRate() {
    var rates = _toConsumableArray(document.querySelectorAll('[data-stid="section-room-list"] div div.uitk-flex[data-stid]'));

    if (rates.length) {
      var prices = rates.map(function (item) {
        var _item$querySelectorAl, _item$querySelectorAl2, _item$querySelectorAl3, _item$querySelectorAl4;

        var roomsNumber = getRoomsNumber();
        var priceMatch = (_item$querySelectorAl = item.querySelectorAll('div.uitk-text-emphasis-theme')) === null || _item$querySelectorAl === void 0 ? void 0 : (_item$querySelectorAl2 = _item$querySelectorAl[1]) === null || _item$querySelectorAl2 === void 0 ? void 0 : (_item$querySelectorAl3 = _item$querySelectorAl2.textContent) === null || _item$querySelectorAl3 === void 0 ? void 0 : (_item$querySelectorAl4 = _item$querySelectorAl3.match(/\d+[.,\d]+/)) === null || _item$querySelectorAl4 === void 0 ? void 0 : _item$querySelectorAl4[0];

        if (priceMatch && roomsNumber) {
          return {
            rate: item,
            price: parsePrice(priceMatch.replace(/\s/, ' '))
          };
        }

        return {
          rate: null,
          price: null
        };
      }).filter(function (rate) {
        return typeof rate.price === 'number';
      });
      return prices.sort(function (a, b) {
        return a.price - b.price;
      })[0];
    }

    return null;
  };

  var getPrice = function getPrice() {
    if (isHotelPage) {
      var cheapestRate = getCheapestRate();

      if (cheapestRate) {
        return cheapestRate.price;
      }

      var offerList = document.querySelector('[data-stid*="section-room-list"]');

      if (offerList) {
        var netPriceSpans = offerList.querySelectorAll('[data-stid*="content-hotel-lead-price"]');
        var netPricesArr = Array.from(netPriceSpans);

        if (netPricesArr.length) {
          var netPrices = netPricesArr.map(function (item) {
            var _item$textContent;

            var priceMatch = (_item$textContent = item.textContent) === null || _item$textContent === void 0 ? void 0 : _item$textContent.match(/[\d,.\s]+/);

            if (priceMatch && priceMatch[0]) {
              return parsePrice(priceMatch[0].replace(/\s/, ' '));
            }

            return null;
          });
          netPrices.sort(function (a, b) {
            return (a || 0) - (b || 0);
          });
          var cheapestPrice = netPrices[0];

          if (cheapestPrice) {
            return cheapestPrice;
          }
        }
      }

      var offers = document.querySelector('#Offers');

      if (offers) {
        var _netPriceSpans = offers.querySelectorAll('.uitk-lockup-price');

        var _netPricesArr = Array.from(_netPriceSpans);

        if (_netPricesArr.length) {
          var _netPrices = _netPricesArr.map(function (item) {
            var _item$textContent2;

            var priceMatch = (_item$textContent2 = item.textContent) === null || _item$textContent2 === void 0 ? void 0 : _item$textContent2.match(/[\d,.\s]+/);

            if (priceMatch && priceMatch[0]) {
              return parsePrice(priceMatch[0].replace(/\s/, ' '));
            }

            return null;
          });

          _netPrices.sort(function (a, b) {
            return (a || 0) - (b || 0);
          });

          var _cheapestPrice = _netPrices[0];

          if (_cheapestPrice) {
            return _cheapestPrice;
          }
        }
      }
    }

    if (isBookingForm) {
      var priceRef = document.querySelector('[data-price-update="roomsTotalPriceSum"]');

      if (priceRef) {
        var _priceRef$textContent, _priceRef$textContent2;

        var price = priceRef === null || priceRef === void 0 ? void 0 : (_priceRef$textContent = priceRef.textContent) === null || _priceRef$textContent === void 0 ? void 0 : (_priceRef$textContent2 = _priceRef$textContent.match(/\d+[.,\d]+/)) === null || _priceRef$textContent2 === void 0 ? void 0 : _priceRef$textContent2[0];
        return price && parsePrice(price);
      }
    }

    if (isPostpayBookingForm) {
      var _document$querySelect22, _document$querySelect23, _document$querySelect24;

      var _price = ((_document$querySelect22 = document.querySelector('.experimental-pricing tr td + td')) === null || _document$querySelect22 === void 0 ? void 0 : (_document$querySelect23 = _document$querySelect22.textContent) === null || _document$querySelect23 === void 0 ? void 0 : (_document$querySelect24 = _document$querySelect23.match(/\d+[.,\d]+/)) === null || _document$querySelect24 === void 0 ? void 0 : _document$querySelect24[0]) || null;

      return _price && parsePrice(_price);
    }

    return null;
  };

  var getTaxes = function getTaxes() {
    var _getCheapestRate4;

    var cheapestRate = (_getCheapestRate4 = getCheapestRate()) === null || _getCheapestRate4 === void 0 ? void 0 : _getCheapestRate4.rate;
    var priceWithoutTaxes = getPrice();

    if (priceWithoutTaxes) {
      var _cheapestRate$querySe, _cheapestRate$querySe2, _cheapestRate$querySe3;

      var priceWithTaxes = parsePrice((cheapestRate === null || cheapestRate === void 0 ? void 0 : (_cheapestRate$querySe = cheapestRate.querySelectorAll('.uitk-menu-container .uitk-type-bold')[1]) === null || _cheapestRate$querySe === void 0 ? void 0 : (_cheapestRate$querySe2 = _cheapestRate$querySe.textContent) === null || _cheapestRate$querySe2 === void 0 ? void 0 : (_cheapestRate$querySe3 = _cheapestRate$querySe2.match(/[\d,.\s]+/)) === null || _cheapestRate$querySe3 === void 0 ? void 0 : _cheapestRate$querySe3[0]) || '0');

      if (isHotelPage && priceWithTaxes) {
        return priceWithTaxes - priceWithoutTaxes;
      }

      if (isBookingForm) {
        var priceWithTaxesRef = document.querySelector('[data-price-update="total"]');

        if (priceWithTaxesRef) {
          var _priceWithTaxesRef$te, _priceWithTaxesRef$te2;

          priceWithTaxes = parsePrice((priceWithTaxesRef === null || priceWithTaxesRef === void 0 ? void 0 : (_priceWithTaxesRef$te = priceWithTaxesRef.textContent) === null || _priceWithTaxesRef$te === void 0 ? void 0 : (_priceWithTaxesRef$te2 = _priceWithTaxesRef$te.match(/\d+[.,\d]+/)) === null || _priceWithTaxesRef$te2 === void 0 ? void 0 : _priceWithTaxesRef$te2[0]) || '0');

          if (priceWithTaxes) {
            return +(priceWithTaxes - priceWithoutTaxes).toFixed(2);
          }
        }
      }

      if (isPostpayBookingForm) {
        var _document$querySelect25, _document$querySelect26, _document$querySelect27;

        priceWithTaxes = parsePrice(((_document$querySelect25 = document.querySelectorAll('.experimental-pricing')[1].querySelector('tr td + td')) === null || _document$querySelect25 === void 0 ? void 0 : (_document$querySelect26 = _document$querySelect25.textContent) === null || _document$querySelect26 === void 0 ? void 0 : (_document$querySelect27 = _document$querySelect26.match(/\d+[.,\d]+/)) === null || _document$querySelect27 === void 0 ? void 0 : _document$querySelect27[0]) || '0');

        if (priceWithTaxes) {
          return +(priceWithTaxes - priceWithoutTaxes).toFixed(2);
        }

        return null;
      }
    }

    return null;
  };

  var getRoomsNumber = function getRoomsNumber() {
    if (isHotelPage) {
      var searchParams = new URLSearchParams(window.location.search);
      var rooms = 0;

      if (searchParams.get('rm1')) {
        for (var i = 1; i < MAX_ROOMS; i += 1) {
          var roomParam = searchParams.get("rm".concat(i));

          if (roomParam) {
            rooms += 1;
          }
        }
      }

      if (rooms) {
        return rooms;
      }
    }

    if (isBookingForm) {
      var roomRefs = document.querySelectorAll('.room-index');
      return roomRefs.length;
    }

    if (isPostpayBookingForm) {
      var _document$querySelect28, _document$querySelect29;

      return (_document$querySelect28 = document.querySelector('section.uitk-card-text-segment h2 + h3 + p + div')) === null || _document$querySelect28 === void 0 ? void 0 : (_document$querySelect29 = _document$querySelect28.parentElement) === null || _document$querySelect29 === void 0 ? void 0 : _document$querySelect29.querySelectorAll('h4').length;
    }

    return null;
  };

  var getGuests = function getGuests() {
    if (isHotelPage) {
      var _roomsNumber2 = getRoomsNumber();

      var searchParams = new URLSearchParams(window.location.search);
      var adults = [];
      var children = [];

      if (searchParams.get('rm1') && _roomsNumber2) {
        for (var i = 1; i < MAX_ROOMS; i += 1) {
          var _roomParam$match;

          var roomParam = searchParams.get("rm".concat(i));

          if (!roomParam) {
            break;
          }

          var adult = (_roomParam$match = roomParam.match(/a(\d+)/)) === null || _roomParam$match === void 0 ? void 0 : _roomParam$match[1];
          adults.push(adult && +adult || null);
          var childMatch = roomParam.match(/(?<=c)(\d+)/g);

          if (childMatch) {
            children.push(childMatch);
          } else {
            children.push([]);
          }
        }

        children = children.map(function (item) {
          return item.map(function (innerItem) {
            return parseInt(innerItem, 10);
          });
        });
        return Array(+_roomsNumber2).fill(null).map(function (_, i) {
          return {
            adults: adults[i],
            children: children[i]
          };
        });
      }
    }

    if (isBookingForm) {
      var roomRefs = document.querySelectorAll('.room-details');
      var adultRefs = document.querySelectorAll('.adult-count');

      var _adults = _toConsumableArray(adultRefs).map(function (adult) {
        var _adult$textContent, _adult$textContent$ma;

        var adultsInOneRoom = ((_adult$textContent = adult.textContent) === null || _adult$textContent === void 0 ? void 0 : (_adult$textContent$ma = _adult$textContent.match(/\d/)) === null || _adult$textContent$ma === void 0 ? void 0 : _adult$textContent$ma[0]) || null;
        return adultsInOneRoom && +adultsInOneRoom || null;
      });

      var _children = _toConsumableArray(roomRefs).map(function (ref) {
        var childRef = ref.querySelector('.child-count');

        if (childRef) {
          var _childRef$textContent, _childRef$textContent2;

          var child = ((_childRef$textContent = childRef.textContent) === null || _childRef$textContent === void 0 ? void 0 : (_childRef$textContent2 = _childRef$textContent.match(/\d/)) === null || _childRef$textContent2 === void 0 ? void 0 : _childRef$textContent2[0]) || null;
          var childCount = child && +child;
          return new Array(childCount).fill(10);
        }

        return [];
      });

      return Array(roomRefs.length).fill(null).map(function (_, i) {
        return {
          adults: _adults[i],
          children: _children[i]
        };
      });
    }

    if (isPostpayBookingForm) {
      var _document$querySelect30, _document$querySelect31;

      return Array.from(((_document$querySelect30 = document.querySelector('section.uitk-card-text-segment h2 + h3 + p + div')) === null || _document$querySelect30 === void 0 ? void 0 : (_document$querySelect31 = _document$querySelect30.parentElement) === null || _document$querySelect31 === void 0 ? void 0 : _document$querySelect31.querySelectorAll('h4')) || []).map(function (roomInfo) {
        var _roomInfo$textContent, _roomInfo$textContent2, _roomInfo$textContent3, _roomInfo$textContent4;

        var adults = (_roomInfo$textContent = roomInfo.textContent) === null || _roomInfo$textContent === void 0 ? void 0 : (_roomInfo$textContent2 = _roomInfo$textContent.match(/(\d+) Adult/)) === null || _roomInfo$textContent2 === void 0 ? void 0 : _roomInfo$textContent2[1];
        var children = (_roomInfo$textContent3 = roomInfo.textContent) === null || _roomInfo$textContent3 === void 0 ? void 0 : (_roomInfo$textContent4 = _roomInfo$textContent3.match(/(\d+) Child/)) === null || _roomInfo$textContent4 === void 0 ? void 0 : _roomInfo$textContent4[1];
        return {
          adults: adults && +adults || 0,
          children: children && Array(+children).fill(10) || []
        };
      });
    }

    return null;
  };

  var roomsNumber = getRoomsNumber() || 1;

  var getMealType = function getMealType() {
    // @ts-ignore
    var mealTypeArr = Object.keys(mealTypes[language]);

    if (isHotelPage) {
      var _getCheapestRate5, _getCheapestRate5$rat;

      var rateFeatures = (_getCheapestRate5 = getCheapestRate()) === null || _getCheapestRate5 === void 0 ? void 0 : (_getCheapestRate5$rat = _getCheapestRate5.rate) === null || _getCheapestRate5$rat === void 0 ? void 0 : _getCheapestRate5$rat.querySelectorAll('[data-stid="room-score-text"] + ul li');

      if (rateFeatures) {
        var _rateFeatures, _rateFeatures$textCon;

        var mealInfo = (_rateFeatures = rateFeatures[rateFeatures.length - +"".concat(getPostPay() ? 2 : 1)]) === null || _rateFeatures === void 0 ? void 0 : (_rateFeatures$textCon = _rateFeatures.textContent) === null || _rateFeatures$textCon === void 0 ? void 0 : _rateFeatures$textCon.toLowerCase();
        console.log(mealInfo);
        var hotelMealType = mealTypeArr.find(function (mt) {
          var _mealInfo$toLowerCase;

          return mealInfo === null || mealInfo === void 0 ? void 0 : (_mealInfo$toLowerCase = mealInfo.toLowerCase()) === null || _mealInfo$toLowerCase === void 0 ? void 0 : _mealInfo$toLowerCase.includes(mt);
        });
        return Array(roomsNumber).fill( // @ts-ignore
        mealTypes[language][hotelMealType || ''] || null);
      }
    }

    if (isBookingForm) {
      var _document$querySelect32, _document$querySelect33;

      var _mealInfo = (_document$querySelect32 = document.querySelector('.display-freebies .freebies-text')) === null || _document$querySelect32 === void 0 ? void 0 : (_document$querySelect33 = _document$querySelect32.textContent) === null || _document$querySelect33 === void 0 ? void 0 : _document$querySelect33.toLowerCase();

      if (_mealInfo) {
        var _hotelMealType = mealTypeArr.find(function (mt) {
          return _mealInfo.includes(mt);
        });

        return Array(roomsNumber).fill( // @ts-ignore
        mealTypes[language][_hotelMealType || ''] || null);
      }
    }

    if (isPostpayBookingForm) {
      var _document$querySelect34, _document$querySelect35, _document$querySelect36, _document$querySelect37;

      var _hotelMealType2 = (_document$querySelect34 = document.querySelector('section.uitk-card-text-segment h2 + h3 + p + div')) === null || _document$querySelect34 === void 0 ? void 0 : (_document$querySelect35 = _document$querySelect34.parentElement) === null || _document$querySelect35 === void 0 ? void 0 : (_document$querySelect36 = _document$querySelect35.querySelector('ul li')) === null || _document$querySelect36 === void 0 ? void 0 : (_document$querySelect37 = _document$querySelect36.textContent) === null || _document$querySelect37 === void 0 ? void 0 : _document$querySelect37.trim().toLowerCase();

      return Array(roomsNumber).fill( // @ts-ignore
      mealTypes[language][_hotelMealType2 || ''] || null);
    }

    return null;
  };

  var getCurrency = function getCurrency() {
    if (isHotelPage) {
      var _targetScript$textCon, _targetScript$textCon2;

      var scripts = _toConsumableArray(document.querySelectorAll('script'));

      var targetScript = scripts.find(function (script) {
        var _script$textContent;

        return script === null || script === void 0 ? void 0 : (_script$textContent = script.textContent) === null || _script$textContent === void 0 ? void 0 : _script$textContent.includes('currencyCode');
      });
      var currCode = targetScript === null || targetScript === void 0 ? void 0 : (_targetScript$textCon = targetScript.textContent) === null || _targetScript$textCon === void 0 ? void 0 : (_targetScript$textCon2 = _targetScript$textCon.match(/(?<=currencyCode\\":\\")\w+/)) === null || _targetScript$textCon2 === void 0 ? void 0 : _targetScript$textCon2[0];

      if (currCode) {
        return currCode;
      }

      var searchParams = new URLSearchParams(window.location.search);
      var currency = searchParams.get('top_cur');

      if (currency) {
        return currency.toUpperCase();
      }

      var curr = searchParams.get('exp_curr');

      if (curr) {
        return curr.toUpperCase();
      }

      var currencyRef = document.querySelector('[name="currencyCode"]');

      if (currencyRef) {
        return currencyRef.value;
      }
    }

    if (isBookingForm) {
      var _document$querySelect38, _rateInfo$match4, _rateInfo$match4$;

      var rateInfo = (_document$querySelect38 = document.querySelector('#platform-analytics-prime')) === null || _document$querySelect38 === void 0 ? void 0 : _document$querySelect38.outerHTML;
      var date = rateInfo === null || rateInfo === void 0 ? void 0 : (_rateInfo$match4 = rateInfo.match(/"currency":"(.{3})"/i)) === null || _rateInfo$match4 === void 0 ? void 0 : (_rateInfo$match4$ = _rateInfo$match4[1]) === null || _rateInfo$match4$ === void 0 ? void 0 : _rateInfo$match4$.toUpperCase();

      if (!date) {
        var _rateInfo$replaceAll, _rateInfo$replaceAll$4;

        date = rateInfo === null || rateInfo === void 0 ? void 0 : (_rateInfo$replaceAll = rateInfo.replaceAll('&quot;', '')) === null || _rateInfo$replaceAll === void 0 ? void 0 : (_rateInfo$replaceAll$4 = _rateInfo$replaceAll.match(/currencyCode:(.{3})/i)) === null || _rateInfo$replaceAll$4 === void 0 ? void 0 : _rateInfo$replaceAll$4[1];
      }

      return date || null;
    }

    if (isPostpayBookingForm) {
      var _document$querySelect39, _document$querySelect40, _document$querySelect41;

      return ((_document$querySelect39 = document.querySelector('#app + script')) === null || _document$querySelect39 === void 0 ? void 0 : (_document$querySelect40 = _document$querySelect39.textContent) === null || _document$querySelect40 === void 0 ? void 0 : (_document$querySelect41 = _document$querySelect40.match(/currencyCode\\":\\"(\S{3})/)) === null || _document$querySelect41 === void 0 ? void 0 : _document$querySelect41[1]) || null;
    }

    return null;
  };

  var getResidency = function getResidency() {
    var _document, _document$querySelect42, _document$querySelect43, _residency;

    var residency = (_document = document) === null || _document === void 0 ? void 0 : (_document$querySelect42 = _document.querySelector('html')) === null || _document$querySelect42 === void 0 ? void 0 : (_document$querySelect43 = _document$querySelect42.dataset.language) === null || _document$querySelect43 === void 0 ? void 0 : _document$querySelect43.toLowerCase();

    if (((_residency = residency) === null || _residency === void 0 ? void 0 : _residency.length) === 5) {
      residency = residency.slice(3);
    }

    if (residency === 'us' || residency === 'ie') {
      return 'gb';
    }

    return residency;
  };

  var guests = getGuests() || [];
  var data = {
    adults: guests.map(function (guest) {
      return guest.adults;
    }),
    cancellation_before: getCancellationBefore(),
    checkin: getCheckin(),
    checkout: getCheckout(),
    children_years: guests.map(function (guest) {
      return guest.children;
    }),
    competitor: 'ERA',
    currency: getCurrency(),
    external_hotel_name: getExternalHotelName(),
    external_id: getExternalId(),
    funnel_step: getFunnelStep(),
    has_meal: getHasMeal(),
    meal_type: getMealType(),
    html: document.body.outerHTML,
    is_postpay: getPostPay(),
    language: language,
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