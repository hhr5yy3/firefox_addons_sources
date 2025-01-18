"use strict";

var _Month, _cancellationDateRege, _postPayMessages, _mealTypes;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

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

// @ts-ignore
var Page = {
  HOTEL_PAGE: 'hotelpage',
  BOOKING_FORM: 'booking_form'
};
var MAX_ADULTS = 6; // @ts-ignore

var Regex = {
  HOTEL_PAGE: /\/hotel\/[a-z]{0,2}\/(.*)\.html/,
  BOOKING_FORM: /\/book\.[a-z.-]*html/,
  SERP: /\/searchresults/,
  COLON: /;/g,
  COMMA: /,/g,
  DIGITS: /[\d]+/g,
  SPACES: /[\s]+/g,
  PRICE: /[\d,.]+/g
}; // @ts-ignore

var Language = {
  RU: 'ru',
  EN: 'en',
  DE: 'de',
  FR: 'fr',
  US: 'us',
  ES: 'es',
  IT: 'it'
}; // @ts-ignore

var Month = (_Month = {}, _defineProperty(_Month, Language.RU, ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']), _defineProperty(_Month, Language.EN, ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']), _defineProperty(_Month, Language.DE, ['januar', 'februar', 'märz', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'dezember']), _defineProperty(_Month, Language.FR, ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'décembre']), _defineProperty(_Month, Language.ES, ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']), _defineProperty(_Month, Language.IT, ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'lugio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre']), _Month); // @ts-ignore

var cancellationDateRegexps = (_cancellationDateRege = {}, _defineProperty(_cancellationDateRege, Language.RU, new RegExp("(\\d{1,2}) (".concat(Month[Language.RU].join('|'), ") (\\d{4})"), 'i')), _defineProperty(_cancellationDateRege, Language.EN, new RegExp("(\\d+) (".concat(Month[Language.EN].join('|'), ") (\\d{4})"), 'i')), _defineProperty(_cancellationDateRege, Language.DE, new RegExp("(\\d{1,2}).? (".concat(Month[Language.DE].join('|'), ") (\\d{4})"), 'i')), _defineProperty(_cancellationDateRege, Language.FR, new RegExp("(\\d+) (".concat(Month[Language.FR].join('|'), ") (\\d{4})"), 'i')), _defineProperty(_cancellationDateRege, Language.US, new RegExp("(".concat(Month[Language.EN].join('|'), ") (\\d), (\\d{4})"), 'i')), _defineProperty(_cancellationDateRege, Language.ES, new RegExp("(\\d+) de (".concat(Month[Language.ES].join('|'), ") (\\d{4})"), 'i')), _defineProperty(_cancellationDateRege, Language.IT, new RegExp("del (\\d+) (".concat(Month[Language.IT].join('|'), ") (\\d{4})"), 'i')), _cancellationDateRege);
var postPayMessages = (_postPayMessages = {}, _defineProperty(_postPayMessages, Language.RU, 'Сегодня оплата не требуется. Вы платите во время проживания.'), _defineProperty(_postPayMessages, Language.EN, "No payment needed today. You'll pay when you stay."), _defineProperty(_postPayMessages, Language.DE, 'Heute ist noch keine Zahlung erforderlich. Sie zahlen erst während Ihres Aufenthalts.'), _defineProperty(_postPayMessages, Language.FR, "Aucun paiement n'est nécessaire aujourd'hui. Vous paierez pendant votre séjour."), _defineProperty(_postPayMessages, Language.US, "No payment needed today. You'll pay when you stay."), _defineProperty(_postPayMessages, Language.ES, 'IN PAGO POR ADELANTADO - Pagarás en el alojamiento'), _defineProperty(_postPayMessages, Language.IT, 'SENZA PAGAMENTO ANTICIPATO – Paga in struttura'), _postPayMessages); // @ts-ignore

var currencies = {
  AED: 'AED',
  ARS: 'AR$',
  AUD: 'AUD',
  AZN: 'AZN',
  BGN: 'BGN',
  BHD: 'BHD',
  BRL: 'R$',
  CAD: 'CAD',
  CHF: 'CHF',
  CLP: 'CL$',
  CNY: 'CNY',
  COP: 'COP',
  CZK: 'Kč',
  DKK: 'DKK',
  EGP: 'EGP',
  EUR: '€',
  FJD: 'FJD',
  GBP: '£',
  GEL: 'GEL',
  HKD: 'HK$',
  HUF: 'HUF',
  IDR: 'Rp',
  ILS: '₪',
  INR: 'Rs.',
  JOD: 'JOD',
  JPY: '¥',
  KRW: 'KRW',
  KWD: 'KWD',
  KZT: 'KZT',
  MDL: 'MDL',
  MXN: 'MXN',
  MYR: 'MYR',
  NAD: 'NAD',
  NOK: 'NOK',
  NZD: 'NZD',
  OMR: 'OMR',
  PLN: 'zł',
  QAR: 'QAR',
  RON: 'lei',
  RUB: 'руб.',
  SAR: 'SAR',
  SEK: 'SEK',
  SGD: 'S$',
  THB: 'THB',
  TRY: 'TL',
  TWD: 'TWD',
  UAH: 'UAH',
  USD: 'US$',
  XOF: 'XOF',
  ZAR: 'ZAR',
  hotel_currency: '€£$'
}; // @ts-ignore

var mealTypes = (_mealTypes = {}, _defineProperty(_mealTypes, Language.EN, {
  'buffet breakfast': 'buffet-breakfast',
  'breakfast & dinner': 'half-board-dinner',
  'half board': 'half-board',
  'all-inclusive': 'all-inclusive',
  'breakfast, lunch & dinner': 'full-board',
  'full board': 'full-board',
  breakfast: 'breakfast'
}), _defineProperty(_mealTypes, Language.RU, {
  'завтрак и ужин': 'half-board-dinner',
  'все включено': 'all-inclusive',
  'завтрак, обед и ужин': 'full-board',
  завтрак: 'breakfast'
}), _defineProperty(_mealTypes, Language.ES, {
  'desayuno y cena': 'half-board-dinner',
  'todo incluido': 'all-inclusive',
  'desayuno, almuerzo y cena': 'full-board',
  desayuno: 'breakfast'
}), _defineProperty(_mealTypes, Language.IT, {
  'colazione e cena': 'half-board-dinner',
  'all inclusive': 'all-inclusive',
  'colazione, pranzo e cena': 'full-board',
  colazione: 'breakfast'
}), _mealTypes);
var mealTypesForSerp = {
  nomeal: /С собственной кухней|Self catering|Kitchen facilities|Selbstverpflegung|Con cocina|Fai da te: cucina\/angolo cottura|Logement avec cuisine|Własne wyżywienie|Kendinden mutfaklı|Самообслужване|Δυνατότητα προετοιμασίας γευμάτων|Önellátó|Samostalna priprema hrane|Autossuficiente|Com cozinha/,
  breakfast: /Завтрак включен|Breakfast included|Frühstück inbegriffen|Desayuno incluido|Colazione inclusa|Petit-déjeuner compris|Śniadanie wliczone w cenę|Kahvaltı dahil|Със закуска|Με πρωινό|Mic dejun inclus|Reggeli az árban|Doručak uključen|Pequeno-almoço incluído|Café da manhã incluído/,
  'full-board': /Трехразовое питание|All meals included|Alle Mahlzeiten inbegriffen|Todas las comidas incluidas|Tutti i pasti inclusi|Tous les repas sont compris|Wszystkie posiłki wliczone w cenę|Tüm öğünler dahil|Включва всички хранения|Περιλαμβάνονται όλα τα γεύματα|Toate mesele incluse|Minden étkezés benne van az árban|Uključeni svi obroci|Todas as refeições incluídas/,
  'all-inclusive': /Все включено|All-inclusive|All-Inclusive|Todo incluido|Formula all inclusive|Tout compris|All Inclusive|Her şey dahil|Ол инклузив|All inclusive|Tudo incluído/,
  'half-board-lunch': /Включен завтрак и обед|Breakfast & lunch included|Frühstück & Mittagessen inbegriffen|Desayuno y almuerzo incluidos|Colazione e pranzo inclusi|Petit-déjeuner et déjeuner compris|Śniadanie i obiad wliczone w cenę|Kahvaltı & öğle yemeği dahil|Περιλαμβάνεται πρωινό & μεσημεριανό|Mic dejun și prânz incluse|Reggeli és ebéd az árban|Doručak i ručak uključeni|Pequeno-almoço e almoço incluídos|Café da manhã e almoço incluídos/,
  'half-board-dinner': /Включен завтрак и ужин|Breakfast & dinner included|Frühstück & Abendessen inbegriffen|Desayuno y cena incluidos|Colazione e cena incluse|Petit-déjeuner et dîner compris|Śniadanie i kolacja wliczone w cenę|Kahvaltı & akşam yemeği dahil|Περιλαμβάνεται πρωινό & δείπνο|Mic dejun și cină incluse|Reggeli és vacsora az árban|Doručak i večera uključeni|Pequeno-almoço e jantar incluídos|Café da manhã e jantar incluídos/
};
var bookingNationalitiesToEtg = {
  en: 'gb',
  tr: 'tk'
}; // @ts-ignore

var isHotelPage = Regex.HOTEL_PAGE.test(document.location.pathname); // @ts-ignore

var isBookingForm = Regex.BOOKING_FORM.test(document.location.pathname); // @ts-ignore

var isSerp = Regex.SERP.test(document.location.pathname);
var bookingButton = document.querySelector('.js-bp-submit-button--complete-booking'); // @ts-ignore

var parsePrice = function parsePrice(price) {
  return parseFloat(price.replace(/[.,  ](?!\d{1,2}$)/g, '').replace(',', '.'));
};

if (isHotelPage || isBookingForm) {
  // @ts-ignore
  var searchString = window.location.search.replace(Regex.COLON, '&');

  var searchParams = _toConsumableArray(new URLSearchParams(searchString)).reduce(function (params, currParam) {
    var _currParam = _slicedToArray(currParam, 2),
        key = _currParam[0],
        value = _currParam[1];

    params[key] = value;
    return params;
  }, {});

  var getLanguage = function getLanguage() {
    var lang = document.documentElement.lang;

    if (lang) {
      return lang.split('-')[0];
    }

    var inputRef = document.querySelector('input[name="lang"]');

    if (inputRef) {
      return inputRef.value.split('-')[0];
    }

    var dataRef = document.querySelector('[data-lang]');

    if (dataRef && dataRef.classList.contains('selected_country')) {
      var _dataRef$dataset$lang;

      return (_dataRef$dataset$lang = dataRef.dataset.lang) === null || _dataRef$dataset$lang === void 0 ? void 0 : _dataRef$dataset$lang.split('-')[0];
    }

    return null;
  };

  var getFunnelStep = function getFunnelStep() {
    if (isHotelPage) {
      // @ts-ignore
      return Page.HOTEL_PAGE;
    }

    if (isBookingForm) {
      return Page.BOOKING_FORM;
    }

    return null;
  };

  var getExternalHotelName = function getExternalHotelName() {
    if (isHotelPage) {
      var hotelNameRef = document.querySelector('.hp__hotel-name');

      if (hotelNameRef) {
        return _toConsumableArray(hotelNameRef.childNodes).reduce(function (a, b) {
          return a + (b.nodeType === 3 ? b.textContent : '');
        }, '').trim();
      }
    }

    if (isBookingForm) {
      var _hotelNameRef = document.querySelector('h1.js-property-details__name');

      if (_hotelNameRef) {
        var _hotelNameRef$textCon;

        return _hotelNameRef === null || _hotelNameRef === void 0 ? void 0 : (_hotelNameRef$textCon = _hotelNameRef.textContent) === null || _hotelNameRef$textCon === void 0 ? void 0 : _hotelNameRef$textCon.trim();
      }
    }

    return null;
  };

  var getExternalId = function getExternalId() {
    if (searchParams.hotel_id) {
      return searchParams.hotel_id;
    }

    var inputRef = document.querySelector('input[name="hotel_id"]');

    if (inputRef) {
      return inputRef.value;
    }

    var bookmarkRef = document.querySelector('[data-hotel-id]');

    if (bookmarkRef && bookmarkRef.dataset.hotelId) {
      return bookmarkRef.dataset.hotelId;
    }

    return null;
  };

  var getCheckin = function getCheckin() {
    if (searchParams.checkin) {
      return searchParams.checkin;
    }

    var inputRef = document.querySelector('input[name="checkin"]');

    if (inputRef) {
      return inputRef.value;
    }

    if (isHotelPage) {
      var _document$querySelect, _document$querySelect2;

      return ((_document$querySelect = document.querySelector('.lp-faq-hotel')) === null || _document$querySelect === void 0 ? void 0 : (_document$querySelect2 = _document$querySelect.dataset) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.paramB_checkin_date) || null;
    }

    if (isBookingForm) {
      var dataRef = document.querySelector('[data-checkin]');

      if (dataRef && dataRef.dataset.checkin) {
        return dataRef.dataset.checkin;
      }
    }

    return null;
  };

  var getCheckout = function getCheckout() {
    if (searchParams.checkout) {
      return searchParams.checkout;
    }

    var inputRef = document.querySelector('input[name="checkout"]');

    if (inputRef) {
      return inputRef.value;
    }

    if (isHotelPage) {
      var _document$querySelect3, _document$querySelect4;

      return ((_document$querySelect3 = document.querySelector('.lp-faq-hotel')) === null || _document$querySelect3 === void 0 ? void 0 : (_document$querySelect4 = _document$querySelect3.dataset) === null || _document$querySelect4 === void 0 ? void 0 : _document$querySelect4.paramB_checkout_date) || null;
    }

    if (isBookingForm) {
      var dataRef = document.querySelector('[data-checkout]');

      if (dataRef && dataRef.dataset.checkout) {
        return dataRef.dataset.checkout;
      }
    }

    return null;
  };

  var getRoomsInfo = function getRoomsInfo() {
    var children = [];
    var adults = [];
    var rooms = 0;

    for (var i = 1; i <= MAX_ADULTS; i += 1) {
      var roomParam = "room".concat(i);
      var roomString = null;

      if (searchParams[roomParam]) {
        roomString = searchParams[roomParam];
      } else {
        var inputRef = document.querySelector("input[name=\"room".concat(i, "\"]"));

        if (!inputRef) {
          break;
        }

        roomString = inputRef.value;
      }

      if (roomString) {
        (function () {
          rooms += 1;
          var childrenAges = [];
          var adultsPerRoom = 0;
          roomString.split(',').forEach(function (room) {
            if (room === 'A') {
              adultsPerRoom += 1;
            } else {
              childrenAges.push(parseInt(room, 10));
            }
          });
          adults.push(adultsPerRoom);
          children.push(childrenAges);
        })();
      }

      roomString = null;
    }

    return {
      rooms: rooms,
      children: children,
      adults: adults
    };
  };

  var getMonthNumber = function getMonthNumber(language, monthName) {
    var month = (Month[language] || Month[Language.EN]).indexOf(monthName.toLowerCase()) + 1;
    return "".concat(month).padStart(2, '0');
  };

  var getCancellationBefore = function getCancellationBefore() {
    if (isHotelPage) {
      return null;
    }

    if (isBookingForm) {
      var cancellationRef = document.querySelector('.cancellation-message');

      if (!cancellationRef) {
        return null;
      }

      var timeLimitRef = cancellationRef.querySelector('.cancellation-time-limit');

      if (!timeLimitRef) {
        return getCheckin();
      }

      var _language = getLanguage();

      var regexp = cancellationDateRegexps[_language];

      if (regexp) {
        var _timeLimitRef$textCon;

        var cancellationString = timeLimitRef === null || timeLimitRef === void 0 ? void 0 : (_timeLimitRef$textCon = timeLimitRef.textContent) === null || _timeLimitRef$textCon === void 0 ? void 0 : _timeLimitRef$textCon.trim();
        var matchArr = cancellationString === null || cancellationString === void 0 ? void 0 : cancellationString.match(regexp);

        if (!matchArr) {
          return null;
        }

        var _matchArr = _slicedToArray(matchArr, 1),
            dateString = _matchArr[0];

        return dateString.replace(regexp, function (_match, $1, $2, $3) {
          if (_language === Language.RU || _language === Language.EN || _language === Language.DE || _language === Language.FR) {
            var month = getMonthNumber(_language, $2);
            return "".concat($3, "-").concat(month, "-").concat($1.padStart(2, '0'));
          }

          if (_language === Language.US) {
            var _month = getMonthNumber(_language, $1);

            return "".concat($3, "-").concat(_month, "-").concat($2.padStart(2, '0'));
          }

          return '';
        }) || null;
      }
    }

    return null;
  };

  var getPostPay = function getPostPay() {
    if (isHotelPage) {
      return null;
    }

    if (isBookingForm) {
      var messageRefs = document.querySelectorAll('.fe_banner__message');

      if (!messageRefs.length) {
        return null;
      }

      var _language2 = getLanguage();

      return _toConsumableArray(messageRefs).some(function (messageRef) {
        var _messageRef$textConte;

        return (messageRef === null || messageRef === void 0 ? void 0 : (_messageRef$textConte = messageRef.textContent) === null || _messageRef$textConte === void 0 ? void 0 : _messageRef$textConte.trim()) === postPayMessages[_language2];
      }) || null;
    }

    return null;
  };

  var getPriceInfo = function getPriceInfo(guests, rooms) {
    if (isHotelPage) {
      var _currencyRef$textCont;

      var currencyRef = document.querySelector('button.bui-button span.bui-button__text span');
      var currency = currencyRef && ((_currencyRef$textCont = currencyRef.textContent) === null || _currencyRef$textCont === void 0 ? void 0 : _currencyRef$textCont.trim());
      var roomNameContainer = null;

      var prices = _toConsumableArray(document.querySelectorAll('tbody tr')).reduce(function (accum, rowRef) {
        var _priceRef$textContent2;

        var priceRef = rowRef.querySelector('.bui-price-display__value');

        if (!priceRef) {
          return accum;
        }

        var taxesRef = rowRef.querySelector('.prd-taxes-and-fees-under-price');
        var occupancyAdultsRef = rowRef.querySelector('.c-occupancy-icons__adults');
        var occupancyChildrenRef = rowRef.querySelector('.c-occupancy-icons__children');
        var roomNameRef = rowRef.querySelector('.hprt-roomtype-name .hprt-roomtype-icon-link') || rowRef.querySelector('.room_link a');

        if (roomNameRef && roomNameRef.textContent) {
          roomNameContainer = roomNameRef.textContent.trim();
        }

        var guestsAmount = 0; // @ts-ignore

        if (!currency || currency === currencies.hotel_currency) {
          var _priceRef$textContent;

          var sortedCurrencies = Object.entries(currencies).sort(function (a, b) {
            return b.length - a.length;
          });
          var rateCurrency = priceRef === null || priceRef === void 0 ? void 0 : (_priceRef$textContent = priceRef.textContent) === null || _priceRef$textContent === void 0 ? void 0 : _priceRef$textContent.replace(/[\d,.]+/g, '').trim(); // eslint-disable-next-line no-restricted-syntax

          var _iterator = _createForOfIteratorHelper(sortedCurrencies),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var _ref3 = _step.value;

              var _ref2 = _slicedToArray(_ref3, 2);

              var key = _ref2[0];
              var value = _ref2[1];

              if (rateCurrency === value) {
                currency = key;
                break;
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }

        if (occupancyAdultsRef) {
          var multiplier = occupancyAdultsRef.querySelector('.c-occupancy-icons__multiplier-number');

          if (multiplier) {
            var _multiplier$textConte;

            guestsAmount += parseInt((multiplier === null || multiplier === void 0 ? void 0 : (_multiplier$textConte = multiplier.textContent) === null || _multiplier$textConte === void 0 ? void 0 : _multiplier$textConte.trim()) || '', 10);
          } else {
            var iconsRef = occupancyAdultsRef.querySelectorAll('.bicon:not(.bicon-occupancyghost)');
            guestsAmount += iconsRef.length;
          }
        }

        if (occupancyChildrenRef) {
          var _multiplier = occupancyChildrenRef.querySelector('.c-occupancy-icons__multiplier-number');

          if (_multiplier) {
            var _multiplier$textConte2;

            guestsAmount += parseInt((_multiplier === null || _multiplier === void 0 ? void 0 : (_multiplier$textConte2 = _multiplier.textContent) === null || _multiplier$textConte2 === void 0 ? void 0 : _multiplier$textConte2.trim()) || '', 10);
          } else {
            var _iconsRef = occupancyChildrenRef.querySelectorAll('.bicon:not(.bicon-occupancyghost)');

            guestsAmount += _iconsRef.length;
          }
        }

        var _ref4 = (priceRef === null || priceRef === void 0 ? void 0 : (_priceRef$textContent2 = priceRef.textContent) === null || _priceRef$textContent2 === void 0 ? void 0 : _priceRef$textContent2.trim() // @ts-ignore
        .replace(Regex.SPACES, '') // @ts-ignore
        .match(Regex.PRICE)) || [],
            _ref5 = _slicedToArray(_ref4, 1),
            price = _ref5[0];

        var language = getLanguage();

        if (price && language === 'en') {
          // @ts-ignore
          price = price.replace(Regex.COMMA, '');
        }

        var taxes = 0;

        if (taxesRef) {
          var exclChargesRaw = taxesRef.dataset.exclChargesRaw;

          if (exclChargesRaw) {
            var match = exclChargesRaw // @ts-ignore
            .replace(Regex.SPACES, '') // @ts-ignore
            .match(Regex.PRICE);

            if (match) {
              var tax = +(match === null || match === void 0 ? void 0 : match[0]) || 0;
              taxes = +tax.toFixed();
            }
          }
        }

        if (rooms === 1) {
          if (guestsAmount >= guests) {
            accum.push({
              currency: currency,
              price: price,
              roomName: roomNameContainer,
              taxes: taxes
            });
          }
        } else {
          accum.push({
            price: price,
            roomName: roomNameContainer,
            taxes: taxes,
            currency: currency
          });
        }

        return accum;
      }, []);

      return prices.length ? prices.sort(function (a, b) {
        return parseFloat(a.price) - parseFloat(b.price);
      })[0] : {
        currency: currency,
        price: null,
        roomName: null,
        taxes: null
      };
    }

    if (isBookingForm) {
      var _document$querySelect5, _roomNameRef$textCont;

      var priceRef = document.querySelector('.bp-price-details__total-line .bp-price-details__charge-value span');
      var taxesRef = (_document$querySelect5 = document.querySelectorAll('.bp-price-details__charges')) === null || _document$querySelect5 === void 0 ? void 0 : _document$querySelect5[1];
      var taxes = 0;

      if (taxesRef) {
        var taxesElements = taxesRef.querySelectorAll('li div.bp-price-details__charge-value');
        Array.from(taxesElements).forEach(function (el) {
          var _el$textContent, _el$textContent$trim$;

          var tax = parsePrice((el === null || el === void 0 ? void 0 : (_el$textContent = el.textContent) === null || _el$textContent === void 0 ? void 0 : (_el$textContent$trim$ = _el$textContent.trim() // @ts-ignore
          .replace(Regex.SPACES, '') // @ts-ignore
          .match(Regex.PRICE)) === null || _el$textContent$trim$ === void 0 ? void 0 : _el$textContent$trim$[0]) || '0');
          taxes += tax;
        });
      }

      var roomNameRef = document.querySelector('.room-name-pure') || document.querySelector('.bp_pricedetails_room_name');
      var price = priceRef && priceRef.dataset.value;

      var _language3 = getLanguage();

      if (price && _language3 === 'en') {
        // @ts-ignore
        price = price.replace(Regex.COMMA, '');
      }

      var hotelCurrency = priceRef === null || priceRef === void 0 ? void 0 : priceRef.dataset.currency;

      var _currency;
      /* eslint-disable-next-line */


      for (var _i2 = 0, _Object$entries = Object.entries(currencies); _i2 < _Object$entries.length; _i2++) {
        var _ref8 = _Object$entries[_i2];

        var _ref7 = _slicedToArray(_ref8, 2);

        var key = _ref7[0];
        var value = _ref7[1];

        if (value === hotelCurrency) {
          _currency = key;
          break;
        }
      }

      return {
        currency: _currency || hotelCurrency,
        price: price,
        roomName: roomNameRef && (roomNameRef === null || roomNameRef === void 0 ? void 0 : (_roomNameRef$textCont = roomNameRef.textContent) === null || _roomNameRef$textCont === void 0 ? void 0 : _roomNameRef$textCont.trim()),
        taxes: taxes
      };
    }

    return {
      currency: null,
      price: null,
      taxes: null
    };
  };

  var roomsInfo = getRoomsInfo();
  var adultsAmount = roomsInfo.adults.reduce(function (accum, it) {
    return accum + it;
  }, 0);
  var childrenAmount = roomsInfo.children.reduce(function (accum, it) {
    return accum + it.length;
  }, 0);
  var guestsAmount = adultsAmount + childrenAmount;
  var roomsAmount = roomsInfo.rooms;
  var priceInfo = getPriceInfo(guestsAmount, roomsAmount);
  var language = getLanguage() || 'en';

  var getCheapestRoom = function getCheapestRoom() {
    var prices = _toConsumableArray(document.querySelectorAll('tbody tr')).reduce(function (accum, rowRef) {
      var _priceRef$textContent3;

      var priceRef = rowRef.querySelector('.bui-price-display__value');

      if (!priceRef) {
        return accum;
      }

      var _ref9 = (priceRef === null || priceRef === void 0 ? void 0 : (_priceRef$textContent3 = priceRef.textContent) === null || _priceRef$textContent3 === void 0 ? void 0 : _priceRef$textContent3.trim() // @ts-ignore
      .replace(Regex.SPACES, '') // @ts-ignore
      .match(Regex.PRICE)) || [],
          _ref10 = _slicedToArray(_ref9, 1),
          price = _ref10[0];

      if (price && language === 'en') {
        // @ts-ignore
        price = price.replace(Regex.COMMA, '');
      }

      accum.push({
        price: price,
        room: rowRef
      });
      return accum;
    }, []);

    return prices.sort(function (a, b) {
      return parseFloat(a.price) - parseFloat(b.price);
    })[0];
  };

  var getAdditionalInfo = function getAdditionalInfo() {
    // @ts-ignore
    if (mealTypes[language]) {
      // @ts-ignore
      var mealTypesArr = Object.keys(mealTypes[language]);

      if (isHotelPage) {
        var _getCheapestRoom = getCheapestRoom(),
            room = _getCheapestRoom.room;

        if (room) {
          var _room$querySelector, _room$querySelector$t;

          // @ts-ignore
          var hotelMealType = room === null || room === void 0 ? void 0 : (_room$querySelector = room.querySelector('ul.hprt-conditions .hprt-green-condition.rt_clean_up_options')) === null || _room$querySelector === void 0 ? void 0 : (_room$querySelector$t = _room$querySelector.textContent) === null || _room$querySelector$t === void 0 ? void 0 : _room$querySelector$t.trim().toLowerCase();
          var mealType = mealTypesArr === null || mealTypesArr === void 0 ? void 0 : mealTypesArr.find(function (mt) {
            return hotelMealType === null || hotelMealType === void 0 ? void 0 : hotelMealType.includes(mt);
          });
          return {
            hasMeal: !!mealType,
            // @ts-ignore
            mealType: mealTypes[language][mealType] || null,
            bathroomType: null,
            hasBalcony: null
          };
        }
      }

      if (isBookingForm) {
        var rooms = document.querySelectorAll('.bp_form_box__content.js-unit__container');

        if (rooms.length) {
          var roomsArr = Array.from(rooms);
          var hotelMealTypesArr = roomsArr.map(function (room) {
            var _room$querySelector2, _room$querySelector2$;

            var hotelMealType = (_room$querySelector2 = room.querySelector('.bp-form-group__checkbox_breakfast_included label span')) === null || _room$querySelector2 === void 0 ? void 0 : (_room$querySelector2$ = _room$querySelector2.textContent) === null || _room$querySelector2$ === void 0 ? void 0 : _room$querySelector2$.trim().split('\n')[0].toLowerCase(); // @ts-ignore

            var mealType = mealTypesArr === null || mealTypesArr === void 0 ? void 0 : mealTypesArr.find(function (mt) {
              return hotelMealType === null || hotelMealType === void 0 ? void 0 : hotelMealType.includes(mt);
            }); // @ts-ignore

            return mealTypes[language][mealType] || null;
          });
          var bathroomType = roomsArr.map(function (item) {
            var isBath = item.querySelector('[data-name-en="Private bathroom"]');

            if (isBath) {
              var _isBath$textContent;

              return isBath === null || isBath === void 0 ? void 0 : (_isBath$textContent = isBath.textContent) === null || _isBath$textContent === void 0 ? void 0 : _isBath$textContent.trim();
            }

            return null;
          });
          var hasBalcony = roomsArr.map(function (item) {
            return !!item.querySelector('[data-name-en="Balcony"]');
          });
          return {
            hasMeal: hotelMealTypesArr.map(function (mt) {
              return !!mt;
            }),
            mealType: hotelMealTypesArr,
            bathroomType: bathroomType,
            hasBalcony: hasBalcony
          };
        }
      }
    }

    return {
      hasMeal: null,
      mealType: null,
      bathroomType: null,
      hasBalcony: null
    };
  };

  var additionalInfo = getAdditionalInfo();

  var getBedType = function getBedType() {
    if (isBookingForm) {
      var bedOptions = document.querySelector('.bed_preference_holder');

      if (bedOptions) {
        var _Array$from$find;

        var inputs = bedOptions.querySelectorAll('input');
        var id = (_Array$from$find = Array.from(inputs).find(function (input) {
          return input.checked;
        })) === null || _Array$from$find === void 0 ? void 0 : _Array$from$find.id;
        var label = bedOptions.querySelector("label[for=".concat(id, "]"));

        if (label) {
          var _label$textContent, _label$textContent$ma;

          return label === null || label === void 0 ? void 0 : (_label$textContent = label.textContent) === null || _label$textContent === void 0 ? void 0 : (_label$textContent$ma = _label$textContent.match(/(?<=\d)(.+)/)) === null || _label$textContent$ma === void 0 ? void 0 : _label$textContent$ma[0].trim();
        }
      }
    }

    return null;
  };

  var getRoomName = function getRoomName() {
    if (isHotelPage) {
      return priceInfo.roomName;
    }

    if (isBookingForm) {
      var rooms = document.querySelectorAll('.bp_form_box__content.js-unit__container');

      if (rooms.length) {
        var roomsArr = Array.from(rooms);
        return roomsArr.map(function (item) {
          var _item$querySelector, _item$querySelector$t;

          return item === null || item === void 0 ? void 0 : (_item$querySelector = item.querySelector('.room-name-pure')) === null || _item$querySelector === void 0 ? void 0 : (_item$querySelector$t = _item$querySelector.textContent) === null || _item$querySelector$t === void 0 ? void 0 : _item$querySelector$t.trim();
        });
      }
    }

    return null;
  };

  var getRoomsNumber = function getRoomsNumber() {
    if (isBookingForm) {
      var rooms = document.querySelectorAll('.bp_form_box__content.js-unit__container');

      if (rooms.length !== roomsInfo.rooms) {
        return rooms.length;
      }
    }

    return roomsInfo.rooms;
  };

  var getAdults = function getAdults() {
    if (isBookingForm) {
      var rooms = document.querySelectorAll('.bp_form_box__content.js-unit__container');

      if (rooms.length !== roomsInfo.rooms && roomsInfo.rooms === 1) {
        var roomsNumber = rooms.length;
        var adults = roomsInfo.adults[0];
        var adultsPerRoom = Math.floor(adults / roomsNumber);
        var remainder = adults % roomsNumber;
        var adultsArr = new Array(roomsNumber).fill(null).map(function () {
          return adultsPerRoom;
        });

        if (remainder !== 0) {
          for (var i = 1; i <= remainder; i += 1) {
            adultsArr[i - 1] += 1;
          }
        }

        return adultsArr;
      }
    }

    return roomsInfo.adults;
  };

  var getChildrenYears = function getChildrenYears() {
    if (isBookingForm) {
      var rooms = document.querySelectorAll('.bp_form_box__content.js-unit__container');

      if (rooms.length !== roomsInfo.rooms && roomsInfo.rooms === 1) {
        var roomsNumber = rooms.length;
        var children = roomsInfo.children[0];

        if (children.length) {
          var splitArr = function splitArr(arr, chunks) {
            return _toConsumableArray(Array(chunks)).map(function (_, c) {
              return arr.filter(function (_n, i) {
                return i % chunks === c;
              });
            });
          };

          return splitArr(children, roomsNumber);
        }

        return new Array(roomsNumber).fill([]);
      }
    }

    return roomsInfo.children;
  };

  var cheapestPrice = priceInfo.price;

  var getResidency = function getResidency() {
    var convertedNationality = bookingNationalitiesToEtg[language];
    return convertedNationality || language;
  };

  var data = {
    competitor: 'BOO',
    funnel_step: getFunnelStep(),
    external_hotel_name: getExternalHotelName(),
    external_id: getExternalId(),
    checkin: getCheckin(),
    checkout: getCheckout(),
    adults: getAdults(),
    children_years: getChildrenYears(),
    rooms_number: getRoomsNumber(),
    has_meal: additionalInfo.hasMeal,
    cancellation_before: getCancellationBefore(),
    is_postpay: getPostPay(),
    price: cheapestPrice && parsePrice("".concat(cheapestPrice)),
    taxes: priceInfo.taxes,
    currency: priceInfo.currency,
    room_name: getRoomName(),
    residency: getResidency(),
    language: language,
    html: document.body.outerHTML,
    meal_type: additionalInfo.mealType,
    bed_type: getBedType(),
    bathroom_type: additionalInfo.bathroomType,
    has_balcony: additionalInfo.hasBalcony
  };

  if (!bookingButton) {
    chrome.runtime.sendMessage({
      command: 'SHOW_OFFER',
      data: data
    });
  }

  if (isBookingForm) {
    if (bookingButton) {
      bookingButton.addEventListener('click', function () {
        chrome.runtime.sendMessage({
          command: 'GET_COMPETITOR_ORDER_DATA',
          data: JSON.parse(sessionStorage.getItem('parsedDataFromBOO') || '{}')
        });
      });
    } else {
      sessionStorage.setItem('parsedDataFromBOO', JSON.stringify(_objectSpread(_objectSpread({}, data), {}, {
        html: undefined
      })));
    }
  }
} else if (isSerp) {
  var DATA_FROM_WINDOW = 'DATA_FROM_WINDOW';
  var dayBeforeCheckIn = '';

  var getDayBeforeCheckIn = function getDayBeforeCheckIn(date) {
    var millisecsPerDay = 86400000;
    var targetDate = new Date(new Date(date).getTime() - millisecsPerDay);
    var prettyTargetDate = "".concat(targetDate.getFullYear(), "-").concat("".concat(targetDate.getMonth() + 1).padStart(2, '0'), "-").concat("".concat(targetDate.getDate()).padStart(2, '0'));
    return prettyTargetDate;
  };

  window.addEventListener('message', function (event) {
    if (event.source !== window) {
      return;
    }

    if (event.data.type === DATA_FROM_WINDOW) {
      dayBeforeCheckIn = getDayBeforeCheckIn(event.data.data.date_in);
      chrome.runtime.sendMessage({
        command: 'GET_COMPETITOR_SERP_DATA',
        data: getData(event.data.data)
      });
    }
  }, false);

  var getHotelName = function getHotelName(hotel) {
    var _hotel$querySelector$, _hotel$querySelector, _hotel$querySelector$2;

    return (_hotel$querySelector$ = (_hotel$querySelector = hotel.querySelector('.sr-hotel__name')) === null || _hotel$querySelector === void 0 ? void 0 : (_hotel$querySelector$2 = _hotel$querySelector.textContent) === null || _hotel$querySelector$2 === void 0 ? void 0 : _hotel$querySelector$2.trim()) !== null && _hotel$querySelector$ !== void 0 ? _hotel$querySelector$ : null;
  };

  var getExternalHotelId = function getExternalHotelId(hotel) {
    var _hotel$getAttribute;

    return (_hotel$getAttribute = hotel.getAttribute('data-hotelid')) !== null && _hotel$getAttribute !== void 0 ? _hotel$getAttribute : null;
  };

  var getStarRating = function getStarRating(hotel) {
    var starRating = (hotel === null || hotel === void 0 ? void 0 : hotel.getAttribute('data-class')) || null;
    return starRating && +starRating;
  };

  var getAddress = function getAddress(hotel) {
    var _hotel$querySelector2, _hotel$querySelector3, _hotel$querySelector4;

    return ((_hotel$querySelector2 = hotel.querySelector('.sr_card_address_line__item')) === null || _hotel$querySelector2 === void 0 ? void 0 : (_hotel$querySelector3 = _hotel$querySelector2.previousSibling) === null || _hotel$querySelector3 === void 0 ? void 0 : (_hotel$querySelector4 = _hotel$querySelector3.textContent) === null || _hotel$querySelector4 === void 0 ? void 0 : _hotel$querySelector4.trim()) || null;
  };

  var getLatitude = function getLatitude(hotel) {
    var _hotel$querySelector5, _hotel$querySelector6;

    return ((_hotel$querySelector5 = hotel.querySelector('.bui-link')) === null || _hotel$querySelector5 === void 0 ? void 0 : (_hotel$querySelector6 = _hotel$querySelector5.getAttribute('data-coords')) === null || _hotel$querySelector6 === void 0 ? void 0 : _hotel$querySelector6.split(',')[1]) || null;
  };

  var getLongitude = function getLongitude(hotel) {
    var _hotel$querySelector7, _hotel$querySelector8;

    return ((_hotel$querySelector7 = hotel.querySelector('.bui-link')) === null || _hotel$querySelector7 === void 0 ? void 0 : (_hotel$querySelector8 = _hotel$querySelector7.getAttribute('data-coords')) === null || _hotel$querySelector8 === void 0 ? void 0 : _hotel$querySelector8.split(',')[0]) || null;
  };

  var _getRoomName = function _getRoomName(hotel) {
    var oneRoom = hotel.querySelector('.room_link strong');

    if (oneRoom) {
      var _oneRoom$textContent;

      return [(_oneRoom$textContent = oneRoom.textContent) === null || _oneRoom$textContent === void 0 ? void 0 : _oneRoom$textContent.trim()];
    }

    var roomsTable = hotel.querySelector('.sr_room_table');

    if (roomsTable) {
      var rooms = roomsTable.querySelectorAll('.room_link');

      if (rooms.length) {
        var roomsArr = Array.from(rooms);
        return roomsArr.map(function (room) {
          var _room$textContent, _room$textContent2, _room$textContent2$ma;

          var multiplier = 1;
          var matchMultiplier = (_room$textContent = room.textContent) === null || _room$textContent === void 0 ? void 0 : _room$textContent.match(/\d\s×/);

          if (matchMultiplier && matchMultiplier[0]) {
            multiplier = +matchMultiplier[0].charAt(0);
          }

          var matchRoomName = (_room$textContent2 = room.textContent) === null || _room$textContent2 === void 0 ? void 0 : (_room$textContent2$ma = _room$textContent2.match(/(?<=×).+/)) === null || _room$textContent2$ma === void 0 ? void 0 : _room$textContent2$ma[0];
          var identicalRooms = [];
          identicalRooms.length = multiplier;
          identicalRooms.fill((matchRoomName === null || matchRoomName === void 0 ? void 0 : matchRoomName.trim()) || '');
          return identicalRooms;
        }).flat();
      }
    }

    return null;
  };

  var getPrice = function getPrice(hotel) {
    var priceBlock = hotel.querySelector('.bui-price-display__value');

    if (priceBlock) {
      var _priceBlock$textConte;

      var priceMatch = (_priceBlock$textConte = priceBlock.textContent) === null || _priceBlock$textConte === void 0 ? void 0 : _priceBlock$textConte.match(/[\d ,.]+/);

      if (priceMatch && priceMatch[0]) {
        return parsePrice(priceMatch[0].replace(' ', ''));
      }
    }

    return null;
  };

  var getGuests = function getGuests(roomsNumber) {
    var _document$querySelect6, _document$querySelect7;

    var adults = Number(((_document$querySelect6 = document.querySelector('#group_adults')) === null || _document$querySelect6 === void 0 ? void 0 : _document$querySelect6.value) || 0);
    var children = Number(((_document$querySelect7 = document.querySelector('#group_children')) === null || _document$querySelect7 === void 0 ? void 0 : _document$querySelect7.value) || 0);
    var adultsPerRoom = Math.floor(adults / roomsNumber);
    var remainder = adults % roomsNumber;
    var adultsArr = new Array(roomsNumber).fill(null).map(function () {
      return adultsPerRoom;
    });

    if (remainder !== 0) {
      for (var i = 1; i <= remainder; i += 1) {
        adultsArr[i - 1] += 1;
      }
    }

    var childrenAgesArr = [];

    for (var _i3 = 0; _i3 < children; _i3 += 1) {
      var _document$querySelect8;

      var childAge = Number(((_document$querySelect8 = document.querySelector("[data-group-child-age=\"".concat(_i3, "\"]"))) === null || _document$querySelect8 === void 0 ? void 0 : _document$querySelect8.value) || 0);
      childrenAgesArr.push(childAge);
    }

    var splitArr = function splitArr(arr, chunks) {
      return _toConsumableArray(Array(chunks)).map(function (_, c) {
        return arr.filter(function (_n, i) {
          return i % chunks === c;
        });
      });
    };

    var childrenArr = splitArr(childrenAgesArr, roomsNumber);
    var guests = [];

    for (var _i4 = 0; _i4 < roomsNumber; _i4 += 1) {
      guests.push({
        adults: adultsArr[_i4],
        children: childrenArr[_i4]
      });
    }

    return guests;
  };

  var getCancellationBeforeDate = function getCancellationBeforeDate(hotel) {
    var cancellationDate = null;
    var oneRoom = hotel.querySelector('.room_link strong');
    var freeCancellation = hotel.querySelector('.e2e-free-cancellation');

    if (freeCancellation) {
      cancellationDate = dayBeforeCheckIn;
    }

    if (oneRoom) {
      return [cancellationDate];
    }

    var roomsTable = hotel.querySelector('.sr_room_table');

    if (roomsTable) {
      var rooms = roomsTable.querySelectorAll('.roomName');

      if (rooms.length) {
        var roomsArr = Array.from(rooms);
        return roomsArr.map(function (room) {
          var _room$childNodes$, _room$childNodes$$chi, _room$childNodes$$chi2;

          var multiplier = 1; // eslint-disable-next-line max-len

          var matchMultiplier = (_room$childNodes$ = room.childNodes[1]) === null || _room$childNodes$ === void 0 ? void 0 : (_room$childNodes$$chi = _room$childNodes$.childNodes[1]) === null || _room$childNodes$$chi === void 0 ? void 0 : (_room$childNodes$$chi2 = _room$childNodes$$chi.textContent) === null || _room$childNodes$$chi2 === void 0 ? void 0 : _room$childNodes$$chi2.match(/\d\s×/);

          if (matchMultiplier && matchMultiplier[0]) {
            multiplier = +matchMultiplier[0].charAt(0);
          }

          var cancellationBefore = room.querySelector('.e2e-cancel-later');

          if (cancellationBefore) {
            cancellationDate = dayBeforeCheckIn;
          } else {
            cancellationDate = null;
          }

          var identicalRooms = [];
          identicalRooms.length = multiplier;
          identicalRooms.fill(cancellationDate || '');
          return identicalRooms;
        }).flat();
      }
    }

    return null;
  };

  var getMeal = function getMeal(hotel) {
    var _hotel$querySelector9, _hotel$querySelector10;

    var mealInfo = (_hotel$querySelector9 = hotel.querySelector('.sr_card_room_policies__container')) === null || _hotel$querySelector9 === void 0 ? void 0 : (_hotel$querySelector10 = _hotel$querySelector9.textContent) === null || _hotel$querySelector10 === void 0 ? void 0 : _hotel$querySelector10.trim();
    var hasMeal = false;

    if (mealInfo) {
      var mealTypesArr = Object.entries(mealTypesForSerp);

      for (var i = 0; i <= mealTypesArr.length - 1; i += 1) {
        if (mealTypesArr[i][0] !== 'nomeal') {
          var matchMeal = mealTypesArr[i][1].test(mealInfo);

          if (matchMeal) {
            hasMeal = true;
            break;
          }
        }
      }
    }

    return [hasMeal];
  };

  var getMealType = function getMealType(hotel) {
    var _hotel$querySelector11, _hotel$querySelector12;

    var mealInfo = (_hotel$querySelector11 = hotel.querySelector('.sr_card_room_policies__container')) === null || _hotel$querySelector11 === void 0 ? void 0 : (_hotel$querySelector12 = _hotel$querySelector11.textContent) === null || _hotel$querySelector12 === void 0 ? void 0 : _hotel$querySelector12.trim();
    var mealType = null;

    if (mealInfo) {
      var mealTypesArr = Object.entries(mealTypesForSerp);

      for (var i = 0; i <= mealTypesArr.length - 1; i += 1) {
        var matchMeal = mealTypesArr[i][1].test(mealInfo);

        if (matchMeal) {
          var _mealTypesArr$i = _slicedToArray(mealTypesArr[i], 1);

          mealType = _mealTypesArr$i[0];
          break;
        }
      }
    }

    return [mealType];
  };

  var getData = function getData(data) {
    var _document$querySelect9, _document$querySelect10, _document$querySelect11, _document$querySelect12, _document$querySelect13;

    var hotels = Array.from(document.querySelectorAll('#hotellist_inner .sr_item'));
    var roomsNumber = Number(((_document$querySelect9 = document.querySelector('#no_rooms')) === null || _document$querySelect9 === void 0 ? void 0 : _document$querySelect9.value) || 0);
    var guests = getGuests(roomsNumber);
    var country = ((_document$querySelect10 = document.querySelector('[data-google-track="Click/Breadcrumb/searchresults -> country/2"]')) === null || _document$querySelect10 === void 0 ? void 0 : (_document$querySelect11 = _document$querySelect10.textContent) === null || _document$querySelect11 === void 0 ? void 0 : _document$querySelect11.trim()) || // @ts-ignore
    data.country_name || null;
    var city = ((_document$querySelect12 = document.querySelector('[data-google-track="Click/Breadcrumb/searchresults -> city/3"]')) === null || _document$querySelect12 === void 0 ? void 0 : (_document$querySelect13 = _document$querySelect12.textContent) === null || _document$querySelect13 === void 0 ? void 0 : _document$querySelect13.trim()) || // @ts-ignore
    data.city_name || null;
    return hotels.map(function (hotel) {
      return {
        hotel_name: getHotelName(hotel),
        external_hotel_id: getExternalHotelId(hotel),
        latitude: getLatitude(hotel),
        longitude: getLongitude(hotel),
        star_rating: getStarRating(hotel),
        hotel_kind: null,
        address: getAddress(hotel),
        phone: null,
        city: city,
        geo: "".concat(city, ", ").concat(country),
        // @ts-ignore
        check_in: data.date_in,
        // @ts-ignore
        check_out: data.date_out,
        guests: guests,
        room_name: _getRoomName(hotel),
        meal_type: roomsNumber === 1 ? getMealType(hotel) : new Array(roomsNumber).fill(null),
        has_meal: roomsNumber === 1 ? getMeal(hotel) : new Array(roomsNumber).fill(null),
        cancellation_before: getCancellationBeforeDate(hotel),
        competitor_price: getPrice(hotel),
        // @ts-ignore
        competitor_currency: data.currency
      };
    });
  };

  var injectScript = function injectScript() {
    var script = document.createElement('script');
    script.textContent = "window.postMessage({\n      type: '".concat(DATA_FROM_WINDOW, "',\n      data: window.utag_data}, \"*\");");
    document.body.appendChild(script);
  };

  injectScript();
}