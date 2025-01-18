"use strict";

var _checkInLabels, _checkOutLabels, _mealLabels, _cancellationLabels, _roomNameLabels, _roomNumbersRegexps;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Page = {
  BOOKING_FORM: 'booking_form'
};
var Regex = {
  BOOKING_FORM: /reservation\/book.jsf$/,
  RESULTS_PAGE: /hotels\/results.jsf$/,
  SEARCH_FORM: /hotels\/search.jsf$/
};
var Residency = {
  Afghanistan: 'af',
  Albania: 'al',
  Algeria: 'dz',
  Andorra: 'ad',
  Angola: 'ao',
  Anguilla: 'ai',
  'Antigua and Barbuda': 'ag',
  Argentina: 'ar',
  Armenia: 'am',
  Aruba: 'aw',
  Australia: 'au',
  Austria: 'at',
  Azerbaijan: 'az',
  Bahamas: 'bs',
  Bahrain: 'bh',
  Bangladesh: 'bd',
  Barbados: 'bb',
  Belarus: 'by',
  Belgium: 'be',
  Belize: 'bz',
  Benin: 'bj',
  Bermuda: 'bm',
  Bhutan: 'bt',
  Bolivia: 'bo',
  Bonaire: 'bq',
  'Bosnia and Herzegovina': 'ba',
  Botswana: 'bw',
  Brazil: 'br',
  'British Virgin Islands': 'io',
  Brunei: 'bn',
  Bulgaria: 'bg',
  'Burkina Faso': 'bf',
  Burundi: 'bi',
  Cambodia: 'kh',
  Cameroon: 'cm',
  Canada: 'ca',
  Canaries: 'ic',
  'Cape Verde': 'cv',
  'Cayman Islands': 'ky',
  'Central African Republic': 'cf',
  Chad: 'td',
  Chile: 'cl',
  China: 'cn',
  'Cocos (Keeling) Islands': 'cc',
  Colombia: 'co',
  Comoros: 'km',
  Congo: 'cg',
  'Cook Islands': 'ck',
  'Costa Rica': 'cr',
  "Cote d'Ivoire": 'ci',
  Croatia: 'hr',
  Cuba: 'cu',
  Curacao: 'cw',
  Cyprus: 'cy',
  'Czech Republic': 'cz',
  'DR Congo': 'cd',
  Denmark: 'dk',
  Djibouti: 'dj',
  Dominica: 'dm',
  'Dominican Republic': 'do',
  Ecuador: 'ec',
  Egypt: 'eg',
  'El Salvador': 'sv',
  'Equatorial Guinea': 'gq',
  Eritrea: 'er',
  Estonia: 'ee',
  Ethiopia: 'et',
  'Falkland Islands': 'fk',
  'Faroe Islands': 'fo',
  Fiji: 'fj',
  Finland: 'fi',
  France: 'fr',
  'French Guyana': 'gf',
  'French Polynesia': 'pf',
  Gabon: 'ga',
  Gambia: 'gm',
  Georgia: 'ge',
  Germany: 'de',
  Ghana: 'gh',
  Gibraltar: 'gi',
  Greece: 'gr',
  Greenland: 'gl',
  Grenada: 'gd',
  Guadeloupe: 'gp',
  Guam: 'gu',
  Guatemala: 'gt',
  Guinea: 'gn',
  'Guinea-Bissau': 'gw',
  Guyana: 'gy',
  Haiti: 'ht',
  Honduras: 'hn',
  'Hong Kong': 'hk',
  Hungary: 'hu',
  Iceland: 'is',
  India: 'in',
  Indonesia: 'id',
  Iran: 'ir',
  Iraq: 'iq',
  Ireland: 'ie',
  Israel: 'il',
  Italy: 'it',
  Jamaica: 'jm',
  Japan: 'jp',
  Jordan: 'jo',
  Kazakhstan: 'kz',
  Kenya: 'ke',
  Kosovo: 'xk',
  Kuwait: 'kw',
  Kyrgyzstan: 'kg',
  Laos: 'la',
  Latvia: 'lv',
  Lebanon: 'lb',
  Lesotho: 'ls',
  Liberia: 'lr',
  Libya: 'ly',
  Liechtenstein: 'li',
  Lithuania: 'lt',
  Luxembourg: 'lu',
  Macau: 'mo',
  Madagascar: 'mg',
  Malawi: 'mw',
  Malaysia: 'my',
  Maldives: 'mv',
  Mali: 'ml',
  Malta: 'mt',
  'Mariana Islands': 'mp',
  Martinique: 'mq',
  Mauritania: 'mr',
  Mauritius: 'mu',
  Mayotte: 'yt',
  Mexico: 'mx',
  Micronesia: 'fm',
  Moldova: 'md',
  Monaco: 'mc',
  Mongolia: 'mn',
  Montenegro: 'me',
  Morocco: 'ma',
  Mozambique: 'mz',
  Myanmar: 'mm',
  Namibia: 'na',
  Nauru: 'nr',
  Nepal: 'np',
  Netherlands: 'nl',
  'New Caledonia': 'nc',
  'New Zealand': 'nz',
  Nicaragua: 'ni',
  Niger: 'ne',
  Nigeria: 'ng',
  Niue: 'nu',
  'Norfolk Island': 'nf',
  Norway: 'no',
  Oman: 'om',
  Pakistan: 'pk',
  Palau: 'pw',
  'Palestinian Authorities': 'ps',
  Panama: 'pa',
  'Papua New Guinea': 'pg',
  Paraguay: 'py',
  Peru: 'pe',
  Philippines: 'ph',
  'Pitcairn Islands': 'pn',
  Poland: 'pl',
  Portugal: 'pt',
  'Puerto Rico': 'pr',
  Qatar: 'qa',
  'Republic of North Macedonia': 'mk',
  Reunion: 're',
  Romania: 'ro',
  Russia: 'ru',
  Rwanda: 'rw',
  'Saint Barthelemy': 'bl',
  'Saint Helena': 'sh',
  'Saint Kitts and Nevis': 'kn',
  'Saint Lucia': 'lc',
  'Saint Martin': 'mf',
  'Saint Vincent And The Grenadines': 'vc',
  Samoa: 'ws',
  'San Marino': 'sm',
  'Sao Tome and Principe': 'st',
  'Saudi Arabia': 'sa',
  Senegal: 'sn',
  Serbia: 'rs',
  Seychelles: 'sc',
  'Sierra Leone': 'sl',
  Singapore: 'sg',
  Slovakia: 'sk',
  Slovenia: 'sl',
  'Solomon Islands': 'sb',
  'South Africa': 'za',
  'South Korea': 'kr',
  'South Sudan': 'ss',
  Spain: 'es',
  'Sri Lanka': 'lk',
  Sudan: 'sd',
  Suriname: 'sr',
  'Svalbard And Jan Mayen Islands': 'sj',
  Swaziland: 'sz',
  Sweden: 'se',
  Switzerland: 'ch',
  Syria: 'sy',
  Taiwan: 'tw',
  Tajikistan: 'tj',
  Tanzania: 'tz',
  Thailand: 'th',
  Togo: 'tg',
  Tonga: 'to',
  'Trinidad and Tobago': 'tt',
  Tunisia: 'tn',
  Turkey: 'tr',
  Turkmenistan: 'tm',
  'Turks and Caicos Islands': 'tc',
  'US Virgin Islands': 'vi',
  USA: 'us',
  Uganda: 'ug',
  Ukraine: 'ua',
  'United Arab Emirates': 'ae',
  'United Kingdom': 'gb',
  Uruguay: 'uy',
  Uzbekistan: 'uz',
  Vanuatu: 'vu',
  'Vatican City State': 'va',
  Venezuela: 've',
  Vietnam: 'vn',
  'Wallis And Futuna Islands': 'wf',
  Yemen: 'ye',
  Zambia: 'zm',
  Zimbabwe: 'zw'
};
var Language = {
  RU: 'ru',
  EN: 'en',
  IT: 'it',
  PL: 'pl',
  LT: 'lt',
  LV: 'lv',
  EE: 'ee',
  FI: 'fi',
  BG: 'bg',
  FR: 'fr',
  ES: 'es',
  SE: 'se',
  DK: 'dk',
  GR: 'gr'
};
var checkInLabels = (_checkInLabels = {}, _defineProperty(_checkInLabels, Language.RU, 'Дата заезда:'), _defineProperty(_checkInLabels, Language.EN, 'Check-in date:'), _defineProperty(_checkInLabels, Language.IT, 'Data di check-in:'), _defineProperty(_checkInLabels, Language.PL, 'Data przybycia:'), _defineProperty(_checkInLabels, Language.LT, 'Atvykimo data:'), _defineProperty(_checkInLabels, Language.LV, 'Atbraukšanas datums:'), _defineProperty(_checkInLabels, Language.EE, 'Saabumise kuupäev:'), _defineProperty(_checkInLabels, Language.FI, 'Check-in pvm:'), _defineProperty(_checkInLabels, Language.BG, 'Дата на Check-in:'), _defineProperty(_checkInLabels, Language.FR, 'Date de check-in:'), _defineProperty(_checkInLabels, Language.ES, 'Fecha de check-in:'), _defineProperty(_checkInLabels, Language.SE, 'Check-in datum:'), _defineProperty(_checkInLabels, Language.DK, 'Check-in dato:'), _defineProperty(_checkInLabels, Language.GR, 'Ημερομηνία Check-in:'), _checkInLabels);
var checkOutLabels = (_checkOutLabels = {}, _defineProperty(_checkOutLabels, Language.RU, 'Дата отъезда:'), _defineProperty(_checkOutLabels, Language.EN, 'Check-out date:'), _defineProperty(_checkOutLabels, Language.IT, 'Data di check-out:'), _defineProperty(_checkOutLabels, Language.PL, 'Data odjazdu:'), _defineProperty(_checkOutLabels, Language.LT, 'Išvykimo data:'), _defineProperty(_checkOutLabels, Language.LV, 'Izbraukšanas datums:'), _defineProperty(_checkOutLabels, Language.EE, 'Lahkumise kuupäev:'), _defineProperty(_checkOutLabels, Language.FI, 'Check-out pvm:'), _defineProperty(_checkOutLabels, Language.BG, 'Дата на Check-out:'), _defineProperty(_checkOutLabels, Language.FR, 'Date de check-out:'), _defineProperty(_checkOutLabels, Language.ES, 'Fecha de check-out:'), _defineProperty(_checkOutLabels, Language.SE, 'Check-out datum:'), _defineProperty(_checkOutLabels, Language.DK, 'Check-out dato:'), _defineProperty(_checkOutLabels, Language.GR, 'Ημερομηνία Check-out:'), _checkOutLabels);
var mealLabels = (_mealLabels = {}, _defineProperty(_mealLabels, Language.RU, 'Тип питания:'), _defineProperty(_mealLabels, Language.EN, 'Board type:'), _defineProperty(_mealLabels, Language.IT, 'Trattamento:'), _defineProperty(_mealLabels, Language.PL, 'Wyżywienie:'), _defineProperty(_mealLabels, Language.LT, 'Maitinimo tipas:'), _defineProperty(_mealLabels, Language.LV, 'Ēdināšanas veids:'), _defineProperty(_mealLabels, Language.EE, 'Toitlustamise tüüp:'), _defineProperty(_mealLabels, Language.FI, 'Ateriat:'), _defineProperty(_mealLabels, Language.BG, 'Тип хранене:'), _defineProperty(_mealLabels, Language.FR, 'Type de nourriture:'), _defineProperty(_mealLabels, Language.ES, 'Régimen:'), _defineProperty(_mealLabels, Language.SE, 'Rätter:'), _defineProperty(_mealLabels, Language.DK, 'Board typen:'), _defineProperty(_mealLabels, Language.GR, 'Τύπος Αεροσκάφους:'), _mealLabels);
var cancellationLabels = (_cancellationLabels = {}, _defineProperty(_cancellationLabels, Language.RU, 'Правила отмены бронирования:'), _defineProperty(_cancellationLabels, Language.EN, 'Cancellation rules:'), _defineProperty(_cancellationLabels, Language.IT, 'Regole di cancellazione:'), _defineProperty(_cancellationLabels, Language.PL, 'Zasady anulowania:'), _defineProperty(_cancellationLabels, Language.LT, 'Atšaukimo taisyklės:'), _defineProperty(_cancellationLabels, Language.LV, 'Cancellation rules:'), _defineProperty(_cancellationLabels, Language.EE, 'Cancellation rules:'), _defineProperty(_cancellationLabels, Language.FI, 'Cancellation rules:'), _defineProperty(_cancellationLabels, Language.BG, 'Cancellation rules:'), _defineProperty(_cancellationLabels, Language.FR, 'Cancellation rules:'), _defineProperty(_cancellationLabels, Language.ES, 'Política de cancelación:'), _defineProperty(_cancellationLabels, Language.SE, 'Cancellation rules:'), _defineProperty(_cancellationLabels, Language.DK, 'Cancellation rules:'), _defineProperty(_cancellationLabels, Language.GR, 'Cancellation rules:'), _cancellationLabels);
var roomNameLabels = (_roomNameLabels = {}, _defineProperty(_roomNameLabels, Language.RU, 'Тип номера:'), _defineProperty(_roomNameLabels, Language.EN, 'Room type:'), _defineProperty(_roomNameLabels, Language.IT, 'Tipologia camera:'), _defineProperty(_roomNameLabels, Language.PL, 'Typ pokoju:'), _defineProperty(_roomNameLabels, Language.LT, 'Kambario tipas:'), _defineProperty(_roomNameLabels, Language.LV, 'Numura tips:'), _defineProperty(_roomNameLabels, Language.EE, 'Ruumi tüüp:'), _defineProperty(_roomNameLabels, Language.FI, 'Huonetyyppi:'), _defineProperty(_roomNameLabels, Language.BG, 'Тип Стая:'), _defineProperty(_roomNameLabels, Language.FR, 'Type de chambre:'), _defineProperty(_roomNameLabels, Language.ES, 'Tipo de habitación:'), _defineProperty(_roomNameLabels, Language.SE, 'Rumstyp:'), _defineProperty(_roomNameLabels, Language.DK, 'Værelses type:'), _defineProperty(_roomNameLabels, Language.GR, 'Τύπος Δωματίου:'), _roomNameLabels);
var roomNumbersRegexps = (_roomNumbersRegexps = {}, _defineProperty(_roomNumbersRegexps, Language.RU, /\d+ номер(а)*$/), _defineProperty(_roomNumbersRegexps, Language.EN, /Room \d+$/), _defineProperty(_roomNumbersRegexps, Language.IT, /Camera \d+$/), _defineProperty(_roomNumbersRegexps, Language.PL, /\d+ pokój*$/), _defineProperty(_roomNumbersRegexps, Language.LT, /\d+ kambarys*$/), _defineProperty(_roomNumbersRegexps, Language.LV, /\d+ numurs*$/), _defineProperty(_roomNumbersRegexps, Language.EE, /Ruum1\d+/), _defineProperty(_roomNumbersRegexps, Language.FI, /Huone \d+/), _defineProperty(_roomNumbersRegexps, Language.BG, /Стая \d+/), _defineProperty(_roomNumbersRegexps, Language.FR, /Chambre \d+/), _defineProperty(_roomNumbersRegexps, Language.ES, /Habitación \d+/), _defineProperty(_roomNumbersRegexps, Language.SE, /Rum \d+/), _defineProperty(_roomNumbersRegexps, Language.DK, /Værelse \d+/), _defineProperty(_roomNumbersRegexps, Language.GR, /Δωμάτιο \d+/), _roomNumbersRegexps);
var noMealMessage = 'Room Only';
var residencyStorageName = 'hotelston-residency';
var isResultsPage = Regex.RESULTS_PAGE.test(document.location.pathname);
var isSearchForm = Regex.SEARCH_FORM.test(document.location.pathname);
var isBookingForm = Regex.BOOKING_FORM.test(document.location.pathname);

var parsePrice = function parsePrice(price) {
  return parseFloat(price.replace(/[.,  ](?!\d{1,2}$)/g, '').replace(',', '.'));
};

if (isResultsPage || isSearchForm) {
  var residencyRef = document.querySelector('.ClientNationality');

  var saveResidency = function saveResidency() {
    var residency = residencyRef.options[residencyRef.selectedIndex].text;
    localStorage.setItem(residencyStorageName, Residency[residency]);
  };

  residencyRef.addEventListener('change', function () {
    return saveResidency();
  });
  saveResidency();
}

if (isBookingForm) {
  var getLanguage = function getLanguage() {
    var urlParams = new URLSearchParams(window.location.search);
    var langParam = urlParams.get('lang');

    if (langParam) {
      return langParam;
    }

    var selectedLanguageRef = document.querySelector('#Languages option[selected]');
    return selectedLanguageRef && selectedLanguageRef.value;
  };

  var language = getLanguage();

  var getExternalHotelName = function getExternalHotelName() {
    var hotelNameRef = document.querySelector('.PHotelDescription');
    return hotelNameRef && hotelNameRef.textContent.trim();
  };

  var getExternalId = function getExternalId() {
    var hotelNameRef = document.querySelector('.PHotelDescription');

    if (hotelNameRef) {
      var href = hotelNameRef.href;
      var params = href.split('?')[1];
      var searchParams = new URLSearchParams(params);

      if (searchParams.has('hotel')) {
        return searchParams.get('hotel');
      }
    }

    return null;
  };

  var getCheckin = function getCheckin() {
    var infoRowRefs = document.querySelectorAll('.Fieldset:first-of-type .RoomInfoRow');

    var checkInRef = _toConsumableArray(infoRowRefs).find(function (it) {
      var label = it.querySelector('label');
      return label && label.textContent.trim() === checkInLabels[language];
    });

    return checkInRef && checkInRef.querySelector('span').textContent.trim();
  };

  var getCheckout = function getCheckout() {
    var infoRowRefs = document.querySelectorAll('.Fieldset:first-of-type .RoomInfoRow');

    var checkOutRef = _toConsumableArray(infoRowRefs).find(function (it) {
      var label = it.querySelector('label');
      return label && label.textContent.trim() === checkOutLabels[language];
    });

    return checkOutRef && checkOutRef.querySelector('span').textContent.trim();
  };

  var getAdults = function getAdults() {
    var legends = document.querySelectorAll('.Fieldset legend');
    return _toConsumableArray(legends).reduce(function (accum, it) {
      var match = it.innerText.trim().match(roomNumbersRegexps[language]);

      if (match) {
        var adults = it.parentNode.querySelectorAll('.fillTitle').length;
        return [].concat(_toConsumableArray(accum), [adults]);
      }

      return accum;
    }, []);
  };

  var getChildren = function getChildren() {
    var legends = document.querySelectorAll('.Fieldset legend');
    return _toConsumableArray(legends).reduce(function (accum, it) {
      var match = it.innerText.trim().match(roomNumbersRegexps[language]);

      if (match) {
        var children = _toConsumableArray(it.parentNode.querySelectorAll('.Age')).map(function (child) {
          var ageMatch = child.textContent.trim().match(/\d+/);
          return Number(ageMatch[0]);
        });

        return [].concat(_toConsumableArray(accum), [children]);
      }

      return accum;
    }, []);
  };

  var getRoomsNumber = function getRoomsNumber() {
    var legends = document.querySelectorAll('.Fieldset legend');
    return _toConsumableArray(legends).reduce(function (accum, it) {
      var match = it.textContent.trim().match(roomNumbersRegexps[language]);

      if (match) {
        // eslint-disable-next-line no-param-reassign
        accum += 1;
        return accum;
      }

      return accum;
    }, 0);
  };

  var getMeal = function getMeal() {
    var infoRowRefs = document.querySelectorAll('.Fieldset .RoomInfo div');

    var mealRef = _toConsumableArray(infoRowRefs).find(function (it) {
      var label = it.querySelector('label');
      return label && label.textContent.trim() === mealLabels[language];
    });

    return mealRef && mealRef.querySelector('span').textContent.trim() !== noMealMessage;
  };

  var getCancellationBefore = function getCancellationBefore() {
    var roomTermRefs = document.querySelectorAll('.RoomTerms');

    var cancellationRef = _toConsumableArray(roomTermRefs).find(function (it) {
      var label = it.querySelector('label');
      return label && label.textContent.trim() === cancellationLabels[language];
    });

    if (cancellationRef) {
      var content = cancellationRef.textContent.trim();
      var match = content.match(/\d{4}-\d{2}-\d{2}/);
      return match && match[0];
    }

    return null;
  };

  var getPrice = function getPrice() {
    var totalPriceRef = document.querySelector('#TotalPrice');

    if (totalPriceRef) {
      var match = totalPriceRef.textContent.trim().match(/\d+\.\d+/);
      return match && match[0];
    }

    var totalPriceEurRef = document.querySelector('#TotalPriceEur');

    if (totalPriceEurRef) {
      var _match = totalPriceEurRef.textContent.trim().match(/\d+\.\d+/);

      return _match && _match[0];
    }

    return null;
  };

  var getCurrency = function getCurrency() {
    var totalPriceRef = document.querySelector('#TotalPrice');

    if (totalPriceRef) {
      var match = totalPriceRef.textContent.trim().match(/\w{1,4}$/);
      return match && match[0];
    }

    var totalPriceEurRef = document.querySelector('#TotalPriceEur');

    if (totalPriceEurRef) {
      var _match2 = totalPriceEurRef.textContent.trim().match(/\w{1,4}$/);

      return _match2 && _match2[0];
    }

    var selectedCurrencyRef = document.querySelector('#CurrenciesMenu option[selected]');
    return selectedCurrencyRef && selectedCurrencyRef.value;
  };

  var getRoomName = function getRoomName() {
    var infoRowRefs = document.querySelectorAll('.Fieldset .RoomInfo div');
    return _toConsumableArray(infoRowRefs).reduce(function (accum, it) {
      var label = it.querySelector('label');
      var match = label && label.textContent.trim() === roomNameLabels[language];

      if (match) {
        var content = it.querySelector('span');
        return [].concat(_toConsumableArray(accum), [content.textContent.trim()]);
      }

      return accum;
    }, []);
  };

  var price = getPrice();
  var data = {
    competitor: 'HST',
    funnel_step: Page.BOOKING_FORM,
    external_hotel_name: getExternalHotelName(),
    external_id: getExternalId(),
    checkin: getCheckin(),
    checkout: getCheckout(),
    rooms_number: getRoomsNumber(),
    adults: getAdults(),
    children_years: getChildren(),
    has_meal: getMeal(),
    cancellation_before: getCancellationBefore(),
    is_postpay: false,
    price: price && parsePrice(price),
    currency: getCurrency(),
    taxes: 0,
    room_name: getRoomName(),
    residency: localStorage.getItem(residencyStorageName) || null,
    language: language,
    html: document.body.outerHTML
  };
  chrome.runtime.sendMessage({
    command: 'SHOW_OFFER',
    data: data
  });
} else if (isResultsPage) {
  var DATA_FROM_WINDOW = 'DATA_FROM_WINDOW';
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

  var getGuests = function getGuests() {
    var rooms = document.querySelectorAll('.Rooms .Room');
    var roomsArr = Array.from(rooms);
    return roomsArr.map(function (item) {
      var _item$querySelector;

      var guests = {
        adults: 0,
        children: []
      };
      guests.adults = +((_item$querySelector = item.querySelector('.Adults select')) === null || _item$querySelector === void 0 ? void 0 : _item$querySelector.value) || 0;
      var childrenAges = item.querySelectorAll('.ChildrenAges select');

      if (childrenAges.length) {
        var childrenAgesArr = Array.from(childrenAges);
        guests.children = childrenAgesArr.map(function (age) {
          return +age.value || 0;
        });
      }

      return guests;
    });
  };

  var getData = function getData(hotels) {
    var _document$querySelect, _document$querySelect2, _document$querySelect3, _document$querySelect4;

    var roomsNumber = +((_document$querySelect = document.querySelector('.RoomCount select')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.value) || 0;
    var guests = getGuests();
    var destination = ((_document$querySelect2 = document.querySelector('.Destinations input:nth-of-type(2)')) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.value) || null;
    var city = null;
    var geo = null;

    if (destination) {
      city = destination.split('-')[0].trim();
      geo = destination.split('-').join(',');
    }

    var checkIn = ((_document$querySelect3 = document.querySelector('.StartDate input')) === null || _document$querySelect3 === void 0 ? void 0 : _document$querySelect3.value) || null;
    var checkOut = ((_document$querySelect4 = document.querySelector('.EndDate input')) === null || _document$querySelect4 === void 0 ? void 0 : _document$querySelect4.value) || null;
    return hotels.map(function (hotel) {
      return {
        competitor: 'HST',
        hotel_name: hotel.name,
        external_hotel_id: "HST_".concat(hotel.id),
        latitude: hotel.latitude,
        longitude: hotel.longitude,
        star_rating: null,
        hotel_kind: null,
        address: null,
        phone: null,
        city: city,
        geo: geo,
        checkin: checkIn,
        checkout: checkOut,
        guests: guests,
        room_name: new Array(roomsNumber).fill(null),
        meal_type: new Array(roomsNumber).fill(null),
        has_meal: new Array(roomsNumber).fill(null),
        cancellation_before: new Array(roomsNumber).fill(null),
        competitor_price: hotel.price,
        competitor_currency: hotel.currencyStr,
        num_in_page: hotel.seqNo,
        language: 'en',
        residency: 'gb'
      };
    });
  };

  var injectScript = function injectScript() {
    var script = document.createElement('script');
    script.textContent = "\n      window.HotelResults.getMapHotels((data) => {\n         window.postMessage({\n           type: '".concat(DATA_FROM_WINDOW, "',\n           data,\n         }, \"*\");\n      });");
    document.body.appendChild(script);
  };

  injectScript();
} else {
  chrome.runtime.sendMessage({
    command: 'SHOW_OFFER',
    data: null
  });
}