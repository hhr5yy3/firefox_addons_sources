"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// @ts-ignore
var Page = {
  HOTEL_PAGE: 'hotelpage',
  BOOKING_FORM: 'booking_form'
}; // @ts-ignore

var Regex = {
  SERP: /resultadosBusqueda/,
  HOTEL_PAGE: /detallesConDispo/,
  BOOKING_FORM: /formularioReserva/
};
var language = {
  SPA: 'es',
  ITA: 'it',
  CHI: 'zh_CN',
  FRE: 'fr',
  ENG: 'en',
  GER: 'de',
  PT: 'pt_PT',
  CZE: 'cz',
  POL: 'pl',
  RUS: 'ru',
  RUM: 'ro',
  DUT: 'en',
  ARA: 'ar'
};
var residency = {
  '1': 'ad',
  '2': 'ae',
  '3': 'at',
  '4': 'be',
  '5': 'bg',
  '6': 'ch',
  '7': 'cr',
  '8': 'cy',
  '9': 'cz',
  '10': 'de',
  '11': 'dk',
  '12': 'do',
  '13': 'ee',
  '14': 'eg',
  '15': 'es',
  '16': 'fi',
  '17': 'fr',
  '18': 'gr',
  '19': 'hu',
  '20': 'ie',
  '21': 'it',
  '22': 'jo',
  '23': 'li',
  '24': 'lt',
  '25': 'lu',
  '26': 'lv',
  '27': 'ma',
  '28': 'mc',
  '29': 'mt',
  '30': 'mx',
  '31': 'nl',
  '32': 'no',
  '33': 'pl',
  '34': 'pt',
  '35': 'ru',
  '36': 'se',
  '37': 'sk',
  '38': 'tn',
  '39': 'tr',
  '40': 'gb',
  '41': 'us',
  '42': 'al',
  '43': 'ao',
  '44': 'ai',
  '45': 'ag',
  '47': 'sa',
  '48': 'dz',
  '49': 'ar',
  '50': 'am',
  '51': 'aw',
  '52': 'au',
  '53': 'az',
  '55': 'bs',
  '56': 'bh',
  '57': 'bd',
  '58': 'bb',
  '59': 'by',
  '60': 'bz',
  '61': 'bj',
  '62': 'bm',
  '63': 'bt',
  '64': 'mm',
  '65': 'bo',
  '66': 'bq',
  '67': 'ba',
  '68': 'bw',
  '69': 'br',
  '70': 'bn',
  '71': 'bf',
  '72': 'bi',
  '73': 'cv',
  '74': 'kh',
  '75': 'cm',
  '76': 'ca',
  '77': 'td',
  '78': 'cl',
  '79': 'cn',
  '80': 'va',
  '81': 'co',
  '82': 'cg',
  '83': 'kr',
  '85': 'ci',
  '87': 'dj',
  '88': 'dm',
  '89': 'ec',
  '90': 'sv',
  '91': 'er',
  '93': 'et',
  '94': 'fj',
  '95': 'ph',
  '96': 'ga',
  '97': 'gm',
  '98': 'ge',
  '99': 'gh',
  '100': 'gd',
  '101': 'gl',
  '102': 'gp',
  '103': 'gt',
  '104': 'gy',
  '105': 'gf',
  '106': 'gn',
  '107': 'gw',
  '108': 'gq',
  '109': 'ht',
  '110': 'hn',
  '111': 'hk',
  '112': 'in',
  '113': 'id',
  '114': 'ir',
  '115': 'gu',
  '117': 'ky',
  '118': 'ck',
  '119': 'fo',
  '120': 'mh',
  '121': 'io',
  '122': 'vi',
  '123': 'il',
  '124': 'jm',
  '125': 'jp',
  '126': 'kz',
  '127': 'ke',
  '128': 'kw',
  '129': 'kg',
  '130': 'ls',
  '131': 'lb',
  '132': 'lr',
  '133': 'mo',
  '134': 'mk',
  '135': 'mg',
  '136': 'my',
  '137': 'mw',
  '138': 'mv',
  '139': 'ml',
  '140': 'mq',
  '141': 'mu',
  '142': 'mr',
  '143': 'fm',
  '144': 'md',
  '145': 'mn',
  '146': 'ms',
  '147': 'mz',
  '148': 'na',
  '149': 'np',
  '150': 'ni',
  '151': 'ne',
  '152': 'ng',
  '153': 'nc',
  '154': 'pg',
  '155': 'nz',
  '156': 'om',
  '157': 'pk',
  '158': 'pw',
  '159': 'pa',
  '160': 'py',
  '161': 'pe',
  '162': 'pf',
  '163': 'pr',
  '166': 'cf',
  '167': 're',
  '169': 'rw',
  '170': 'ws',
  '171': 'ws',
  '172': 'nr',
  '173': 'nu',
  '174': 'kn',
  '175': 'vc',
  '176': 'lc',
  '177': 'sn',
  '178': 'sc',
  '179': 'sl',
  '180': 'sg',
  '181': 'sy',
  '182': 'lk',
  '183': 'za',
  '184': 'sd',
  '185': 'sr',
  '186': 'sz',
  '187': 'th',
  '188': 'tw',
  '189': 'tz',
  '190': 'tg',
  '191': 'tt',
  '192': 'tm',
  '193': 'tc',
  '194': 'ua',
  '195': 'ug',
  '196': 'uy',
  '197': 'uz',
  '198': 'vu',
  '199': 've',
  '200': 'vn',
  '201': 'wf',
  '202': 'ye',
  '203': 'cd',
  '204': 'zm',
  '205': 'zw',
  '207': 'la',
  '208': 'af',
  '209': 'ly',
  '210': 'tj',
  '211': 'iq',
  '212': 'so',
  '214': 'ki',
  '215': 'km',
  '216': 'st',
  '217': 'to',
  '218': 'tv',
  '219': 'sb',
  '220': 'eh',
  '221': 'sm',
  '222': 'tl',
  '223': 'ps',
  '224': 'cu',
  '225': 'hr',
  '226': 'is',
  '227': 'cy',
  '228': 'ro',
  '229': 'sl',
  '230': 'rs',
  '232': 'me',
  '233': 'mf'
};
var residencyStorageName = 'veturis-residency'; // @ts-ignore

var reverseDate = function reverseDate(date, separator) {
  return date.split(separator).reverse().join('-');
}; // @ts-ignore


var parsePrice = function parsePrice(price) {
  return parseFloat(price.replace(/[.,  ](?!\d{1,2}$)/g, '').replace(',', '.'));
}; // @ts-ignore


var DEFAULT_CHILDREN_AGE = 10; // @ts-ignore

var isSerp = Regex.SERP.test(document.location.pathname); // @ts-ignore

var isHotelPage = Regex.HOTEL_PAGE.test(document.location.pathname); // @ts-ignore

var isBookingForm = Regex.BOOKING_FORM.test(document.location.pathname); // @ts-ignore

var mealTypes = {
  BB: /Alojamiento y desayuno|Alloggio e prima colazione|Hébergement et petit déjeuner|Bed and breakfast|Unterkunft \+ frühstück|Alojamento e pequeno almoço|Ubytování se snídaní|Nocleg i śniadanie|Проживание и завтрак|Cazare și mic dejun|Logies en ontbijt/i,
  HB: /Media pensión|Mezza pensione|Demi pension|Half-board|Halbpension|Meia pensão|Polopenze|Śniadanie i obiadokolacja|Полупансион|Demipensiune|Halfpension/i,
  FB: /Full-board|Pensión completa|Pensione completa|Pension complète|Vollpension|Pensão completa|Plná penze|Pełne wyżywienie|Полный пaнсион|Pensiune completă|Volpension/i,
  Dinner: /Dinner|Cena|Dîner|Abendessen|Jantar|Večeře|Kolacja|Ужин|Cină|Diner/i,
  HBWD: /Half-board with drinks|Media pensión con bebidas|Mezza pensione con bevande|Demi-pension avec boissons|Halbpension mit getränken|Meia pensão com bebidas|Полупансион с напитками|Demi-pensiune cu bauturi|Halfpension met drankjes/i,
  FBWD: /Full-board with drinks|Pensión completa con bebidas|Pensione completa con bevande|Pension complète avec boissons|Vollpension mit getränken|Pensão completa com bebidas|Полный пансион с напитками|Pensiune completa cu bauturi|Volpension met drankjes/i,
  AI: /All-inclusive|Todo incluido|Tutto compreso|Tout inclus|Tudo incluído|All inclusive|Wszystko w cenie|Всё включено|All inclusive \/ totul inclus/i,
  Lunch: /Lunch|Almuerzo|Pranzo|Déjeuner|Mittagessen|Almoço|Oběd|Obiad|Обед|Prânz/i,
  RO: /Alojamiento|Alojamento|Alloggio|Hébergement|Accommodation only|Unterkunft|Ubytování|Nocleg|Только проживание|Numai cazare|Logies/i
};

if (isSerp || isHotelPage) {
  var residencyRef = document.querySelector('#paisSel');

  var saveResidency = function saveResidency() {
    var resindencyCode = residencyRef === null || residencyRef === void 0 ? void 0 : residencyRef.value;

    if (resindencyCode) {
      var currentResidency = residency[resindencyCode];

      if (currentResidency) {
        localStorage.setItem(residencyStorageName, currentResidency);
      }
    }
  };

  residencyRef === null || residencyRef === void 0 ? void 0 : residencyRef.addEventListener('change', function () {
    return saveResidency();
  });
  saveResidency();
}

if (isHotelPage || isBookingForm) {
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

  var getCheapestRoom = function getCheapestRoom() {
    var tds = document.querySelectorAll('tr .precio:nth-of-type(3)');
    var tdsArr = Array.from(tds);
    var cheapestRoom;

    if (tdsArr.length) {
      var prices = tdsArr.map(function (item) {
        var _item$textContent;

        var priceMatch = (_item$textContent = item.textContent) === null || _item$textContent === void 0 ? void 0 : _item$textContent.match(/[\d.]{2,}/);

        if (priceMatch && priceMatch[0]) {
          return priceMatch[0];
        }

        return 0;
      });
      prices.sort(function (a, b) {
        return +a - +b;
      });
      var cheapestPrice = prices[0];

      if (cheapestPrice) {
        for (var i = 0; i <= tdsArr.length - 1; i += 1) {
          var _tdsArr$i, _tdsArr$i$textContent;

          if ((_tdsArr$i = tdsArr[i]) !== null && _tdsArr$i !== void 0 && (_tdsArr$i$textContent = _tdsArr$i.textContent) !== null && _tdsArr$i$textContent !== void 0 && _tdsArr$i$textContent.includes(cheapestPrice)) {
            cheapestRoom = tdsArr[i].parentNode;
            break;
          }
        }

        return cheapestRoom;
      }
    }

    return null;
  };

  var getRoomsNumber = function getRoomsNumber() {
    if (isHotelPage) {
      var roomsNumber = document.querySelector('#H');

      if (roomsNumber) {
        return +roomsNumber.value;
      }
    }

    if (isBookingForm) {
      var scripts = _toConsumableArray(document.querySelectorAll('script'));

      var targetScript = scripts.find(function (script) {
        var _script$textContent;

        return script === null || script === void 0 ? void 0 : (_script$textContent = script.textContent) === null || _script$textContent === void 0 ? void 0 : _script$textContent.includes('jsonRescue');
      });
      var scriptContent = targetScript === null || targetScript === void 0 ? void 0 : targetScript.textContent;
      var roomInfoMatch = scriptContent === null || scriptContent === void 0 ? void 0 : scriptContent.match(/(?<=Occupancy":).+(?=,"HotelCode)/);

      if (roomInfoMatch && roomInfoMatch[0]) {
        var roomInfoArr = JSON.parse(roomInfoMatch[0]);

        var _roomsNumber = roomInfoArr.reduce(function (acc, curr) {
          return acc + +curr.Rooms;
        }, 0);

        if (_roomsNumber) {
          return _roomsNumber;
        }
      }
    }

    return null;
  };

  var getCheckin = function getCheckin() {
    if (isHotelPage) {
      var _document$querySelect;

      var checkIn = (_document$querySelect = document.querySelector('#datetimepicker1')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.value;

      if (checkIn) {
        return reverseDate(checkIn, '/');
      }
    }

    if (isBookingForm) {
      var _document$querySelect2;

      var _checkIn = (_document$querySelect2 = document.querySelector('#fechaEntradaHotel')) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.value;

      if (_checkIn) {
        return reverseDate(_checkIn, '/');
      }

      var bookingInfoTableRows = document.querySelectorAll('.table-striped.table-condensed.mb0 tbody tr');

      if (bookingInfoTableRows.length) {
        var _bookingInfoTableRows, _bookingInfoTableRows2;

        var matchCheckIn = (_bookingInfoTableRows = bookingInfoTableRows[0]) === null || _bookingInfoTableRows === void 0 ? void 0 : (_bookingInfoTableRows2 = _bookingInfoTableRows.textContent) === null || _bookingInfoTableRows2 === void 0 ? void 0 : _bookingInfoTableRows2.match(/\d{2}\/\d{2}\/\d{4}/);

        if (matchCheckIn && matchCheckIn[0]) {
          return reverseDate(matchCheckIn[0], '/');
        }
      }
    }

    return null;
  };

  var getCheckout = function getCheckout() {
    if (isHotelPage) {
      var _document$querySelect3;

      var checkOut = (_document$querySelect3 = document.querySelector('#datetimepicker2')) === null || _document$querySelect3 === void 0 ? void 0 : _document$querySelect3.value;

      if (checkOut) {
        return reverseDate(checkOut, '/');
      }
    }

    if (isBookingForm) {
      var _document$querySelect4;

      var _checkOut = (_document$querySelect4 = document.querySelector('#fechaSalidaHotel')) === null || _document$querySelect4 === void 0 ? void 0 : _document$querySelect4.value;

      if (_checkOut) {
        return reverseDate(_checkOut, '/');
      }

      var bookingInfoTableRows = document.querySelectorAll('.table-striped.table-condensed.mb0 tbody tr');

      if (bookingInfoTableRows.length) {
        var _bookingInfoTableRows3, _bookingInfoTableRows4;

        var matchCheckIn = (_bookingInfoTableRows3 = bookingInfoTableRows[1]) === null || _bookingInfoTableRows3 === void 0 ? void 0 : (_bookingInfoTableRows4 = _bookingInfoTableRows3.textContent) === null || _bookingInfoTableRows4 === void 0 ? void 0 : _bookingInfoTableRows4.match(/\d{2}\/\d{2}\/\d{4}/);

        if (matchCheckIn && matchCheckIn[0]) {
          return reverseDate(matchCheckIn[0], '/');
        }
      }
    }

    return null;
  };

  var getExternalHotelName = function getExternalHotelName() {
    if (isHotelPage) {
      var hotelName = document.querySelector('.tit24.tit-hotel');

      if (hotelName) {
        var _hotelName$textConten;

        return (_hotelName$textConten = hotelName.textContent) === null || _hotelName$textConten === void 0 ? void 0 : _hotelName$textConten.trim();
      }
    }

    if (isBookingForm) {
      var _hotelName = document.querySelector('#nombreHotel');

      if (_hotelName) {
        return _hotelName.value;
      }
    }

    return null;
  };

  var getExternalId = function getExternalId() {
    if (isHotelPage) {
      var searchParams = new URLSearchParams(window.location.search);
      var hotelId = searchParams.get('IDE');

      if (hotelId) {
        return hotelId;
      }
    }

    if (isBookingForm) {
      var _hotelId = document.querySelector('#IDHotel');

      if (_hotelId) {
        return _hotelId.value;
      }
    }

    return null;
  };

  var getMeal = function getMeal() {
    if (isHotelPage || isBookingForm) {
      var roomsNumber = getRoomsNumber();
      var mealInfo;

      if (isHotelPage) {
        var _cheapestRoom$childNo, _cheapestRoom$childNo2, _cheapestRoom$childNo3;

        var cheapestRoom = getCheapestRoom();
        mealInfo = cheapestRoom === null || cheapestRoom === void 0 ? void 0 : (_cheapestRoom$childNo = cheapestRoom.childNodes[1]) === null || _cheapestRoom$childNo === void 0 ? void 0 : (_cheapestRoom$childNo2 = _cheapestRoom$childNo.firstChild) === null || _cheapestRoom$childNo2 === void 0 ? void 0 : (_cheapestRoom$childNo3 = _cheapestRoom$childNo2.textContent) === null || _cheapestRoom$childNo3 === void 0 ? void 0 : _cheapestRoom$childNo3.trim();
      }

      if (isBookingForm) {
        var _document$querySelect5, _document$querySelect6;

        mealInfo = (_document$querySelect5 = document.querySelector('.table.table-striped.table-condensed.mb0 tr:nth-of-type(4) td')) === null || _document$querySelect5 === void 0 ? void 0 : (_document$querySelect6 = _document$querySelect5.textContent) === null || _document$querySelect6 === void 0 ? void 0 : _document$querySelect6.trim();
      }

      if (mealInfo && roomsNumber) {
        var hasMeal = false;
        var mealTypesArr = Object.entries(mealTypes);
        mealTypesArr.forEach(function (item) {
          if (item[0] !== 'RO') {
            // @ts-ignore
            var matchMeal = item[1].test(mealInfo);

            if (matchMeal) {
              hasMeal = true;
            }
          }
        });
        return new Array(roomsNumber).fill(hasMeal)[0];
      }
    }

    return null;
  };

  var getMealType = function getMealType() {
    if (isHotelPage || isBookingForm) {
      var roomsNumber = getRoomsNumber();
      var mealInfo;

      if (isHotelPage) {
        var _cheapestRoom$childNo4, _cheapestRoom$childNo5, _cheapestRoom$childNo6;

        var cheapestRoom = getCheapestRoom();
        mealInfo = cheapestRoom === null || cheapestRoom === void 0 ? void 0 : (_cheapestRoom$childNo4 = cheapestRoom.childNodes[1]) === null || _cheapestRoom$childNo4 === void 0 ? void 0 : (_cheapestRoom$childNo5 = _cheapestRoom$childNo4.firstChild) === null || _cheapestRoom$childNo5 === void 0 ? void 0 : (_cheapestRoom$childNo6 = _cheapestRoom$childNo5.textContent) === null || _cheapestRoom$childNo6 === void 0 ? void 0 : _cheapestRoom$childNo6.trim();
      }

      if (isBookingForm) {
        var _document$querySelect7, _document$querySelect8;

        mealInfo = (_document$querySelect7 = document.querySelector('.table.table-striped.table-condensed.mb0 tr:nth-of-type(4) td')) === null || _document$querySelect7 === void 0 ? void 0 : (_document$querySelect8 = _document$querySelect7.textContent) === null || _document$querySelect8 === void 0 ? void 0 : _document$querySelect8.trim();
      }

      if (mealInfo && roomsNumber) {
        return new Array(roomsNumber).fill(mealInfo)[0];
      }
    }

    return null;
  };

  var getCancellationBefore = function getCancellationBefore() {
    if (isHotelPage) {
      var roomsNumber = getRoomsNumber();

      if (roomsNumber) {
        return new Array(roomsNumber).fill(null)[0];
      }
    }

    if (isBookingForm) {
      var _roomsNumber2 = getRoomsNumber();

      if (_roomsNumber2) {
        var cancellInfoTables = document.querySelectorAll('#divPoliticasCancelacion table');

        if (cancellInfoTables.length === 2) {
          var targetTable = cancellInfoTables[0];
          var tableCells = targetTable.querySelectorAll('td');

          if (tableCells.length === 3) {
            var targetCell = tableCells[1];

            if (targetCell.textContent) {
              var freeCancellationDate = reverseDate(targetCell.textContent, '/');
              return new Array(_roomsNumber2).fill(freeCancellationDate)[0];
            }
          }
        }

        return new Array(_roomsNumber2).fill(null)[0];
      }
    }

    return null;
  };

  var getPostPay = function getPostPay() {
    if (isHotelPage || isBookingForm) {
      var roomsNumber = getRoomsNumber();

      if (roomsNumber) {
        return new Array(roomsNumber).fill(false)[0];
      }
    }

    return null;
  };

  var getRoomName = function getRoomName() {
    if (isHotelPage) {
      var roomsNumber = getRoomsNumber();
      var cheapestRoom = getCheapestRoom();

      if (roomsNumber && cheapestRoom) {
        var _cheapestRoom$parentN, _cheapestRoom$parentN2;

        // eslint-disable-next-line max-len
        var roomNames = (_cheapestRoom$parentN = cheapestRoom.parentNode) === null || _cheapestRoom$parentN === void 0 ? void 0 : (_cheapestRoom$parentN2 = _cheapestRoom$parentN.previousElementSibling) === null || _cheapestRoom$parentN2 === void 0 ? void 0 : _cheapestRoom$parentN2.querySelectorAll('h4');

        if (roomNames.length === roomsNumber) {
          var roomNamesArr = Array.from(roomNames);
          return roomNamesArr.map(function (item) {
            var _item$textContent2;

            return ((_item$textContent2 = item.textContent) === null || _item$textContent2 === void 0 ? void 0 : _item$textContent2.trim()) || null;
          });
        }

        if (roomNames.length) {
          var _roomNames$0$textCont;

          var roomName = ((_roomNames$0$textCont = roomNames[0].textContent) === null || _roomNames$0$textCont === void 0 ? void 0 : _roomNames$0$textCont.trim()) || null;
          return new Array(roomsNumber).fill(roomName);
        }
      }
    }

    if (isBookingForm) {
      var _roomsNumber3 = getRoomsNumber();

      var _roomNames = document.querySelectorAll('#presupuestoInfoAdicional tr td:nth-of-type(3)');

      if (_roomsNumber3 && _roomNames.length) {
        var _roomNamesArr = Array.from(_roomNames);

        return _roomNamesArr.map(function (item) {
          var _targetString, _targetString2;

          var targetString = item.textContent;

          if ((_targetString = targetString) !== null && _targetString !== void 0 && _targetString.startsWith('1')) {
            targetString = targetString.slice(1);
          }

          return (_targetString2 = targetString) === null || _targetString2 === void 0 ? void 0 : _targetString2.trim();
        }).slice(0, _roomsNumber3);
      }
    }

    return null;
  };

  var getPrice = function getPrice() {
    if (isHotelPage) {
      var cheapestRoom = getCheapestRoom();

      if (cheapestRoom) {
        var _cheapestRoom$querySe, _cheapestRoom$querySe2;

        var priceMatch = (_cheapestRoom$querySe = cheapestRoom.querySelector('.precio:nth-of-type(3)')) === null || _cheapestRoom$querySe === void 0 ? void 0 : (_cheapestRoom$querySe2 = _cheapestRoom$querySe.textContent) === null || _cheapestRoom$querySe2 === void 0 ? void 0 : _cheapestRoom$querySe2.match(/[\d.,]{2,}/);

        if (priceMatch && priceMatch[0]) {
          return priceMatch[0];
        }

        return null;
      }
    }

    if (isBookingForm) {
      var _price = document.querySelector('#precioPvp');

      if (_price) {
        return _price.value;
      }
    }

    return null;
  };

  var getTaxes = function getTaxes() {
    if (isHotelPage || isBookingForm) {
      var roomsNumber = getRoomsNumber();

      if (roomsNumber) {
        return new Array(roomsNumber).fill(null)[0];
      }
    }

    return null;
  };

  var getAdults = function getAdults() {
    if (isHotelPage) {
      var roomsNumber = getRoomsNumber();

      if (roomsNumber) {
        var adults = [];

        for (var i = 0; i < roomsNumber; i += 1) {
          var _document$querySelect9, _document$querySelect10;

          var adultsAmount = ((_document$querySelect9 = document.querySelector("#habitacion".concat(i + 1, " select"))) === null || _document$querySelect9 === void 0 ? void 0 : (_document$querySelect10 = _document$querySelect9.value) === null || _document$querySelect10 === void 0 ? void 0 : _document$querySelect10.match(/\d/)) || 0;
          adults.push(+adultsAmount);
        }

        return adults;
      }
    }

    if (isBookingForm) {
      var _roomsNumber4 = getRoomsNumber();

      if (_roomsNumber4) {
        var _document$querySelect11;

        var guestsInfo = (_document$querySelect11 = document.querySelector('.col-sm-9.datos-container div:nth-of-type(2) p')) === null || _document$querySelect11 === void 0 ? void 0 : _document$querySelect11.textContent;

        if (guestsInfo) {
          var matchAdults = guestsInfo.match(/\d+/g);

          if (matchAdults && matchAdults[0]) {
            var _adults = +matchAdults[0];

            var adultsPerRoom = Math.floor(_adults / _roomsNumber4);
            var remainder = _adults % _roomsNumber4;
            var adultsArr = new Array(_roomsNumber4).fill(null).map(function () {
              return adultsPerRoom;
            });

            if (remainder !== 0) {
              for (var _i = 1; _i <= remainder; _i += 1) {
                adultsArr[_i - 1] += 1;
              }
            }

            return adultsArr;
          }
        }
      }
    }

    return null;
  };

  var getChildrenYears = function getChildrenYears() {
    if (isHotelPage) {
      var roomsNumber = getRoomsNumber();

      if (roomsNumber) {
        var childrenAges = [];

        for (var i = 0; i < roomsNumber; i += 1) {
          var _document$querySelect12, _document$querySelect13, _document$querySelect14;

          var childrenAmount = ((_document$querySelect12 = document.querySelector("#habitacion".concat(i + 1, " select"))) === null || _document$querySelect12 === void 0 ? void 0 : (_document$querySelect13 = _document$querySelect12.value) === null || _document$querySelect13 === void 0 ? void 0 : (_document$querySelect14 = _document$querySelect13.match(/\d/g)) === null || _document$querySelect14 === void 0 ? void 0 : _document$querySelect14[1]) || 0;

          if (+childrenAmount) {
            var childrenAgesPerRoom = [];

            for (var k = 0; k < +childrenAmount; k += 1) {
              var _document$querySelect15;

              var childAge = (_document$querySelect15 = document.querySelector("#edadNino".concat(i + 1, "_").concat(k + 1))) === null || _document$querySelect15 === void 0 ? void 0 : _document$querySelect15.value;

              if (childAge) {
                childrenAgesPerRoom.push(+childAge);
              }
            }

            childrenAges.push(childrenAgesPerRoom);
          } else {
            childrenAges.push([]);
          }
        }

        return childrenAges;
      }
    }

    if (isBookingForm) {
      var _roomsNumber5 = getRoomsNumber();

      if (_roomsNumber5) {
        var _document$querySelect16;

        var guestsInfo = (_document$querySelect16 = document.querySelector('.col-sm-9.datos-container div:nth-of-type(2) p')) === null || _document$querySelect16 === void 0 ? void 0 : _document$querySelect16.textContent;

        if (guestsInfo) {
          var childrenMatch = guestsInfo.match(/\d+/g);

          if (childrenMatch && childrenMatch[1]) {
            var children = +childrenMatch[1];
            var childrenAgesArr = new Array(children).fill(DEFAULT_CHILDREN_AGE);

            var splitArr = function splitArr(arr, chunks) {
              return _toConsumableArray(Array(chunks)).map(function (_, c) {
                return arr.filter(function (_n, i) {
                  return i % chunks === c;
                });
              });
            };

            return splitArr(childrenAgesArr, _roomsNumber5);
          }

          return new Array(_roomsNumber5).fill([]);
        }
      }
    }

    return null;
  };

  var getLanguage = function getLanguage() {
    if (isHotelPage || isBookingForm) {
      var _document$querySelect17;

      var lang = (_document$querySelect17 = document.querySelector('#selIdioma')) === null || _document$querySelect17 === void 0 ? void 0 : _document$querySelect17.value;

      if (lang) {
        var matchedLang = language[lang];
        return matchedLang || 'ru';
      }
    }

    return null;
  };

  var price = getPrice();
  var data = {
    adults: getAdults(),
    cancellation_before: getCancellationBefore(),
    checkin: getCheckin(),
    checkout: getCheckout(),
    children_years: getChildrenYears(),
    competitor: 'VTR',
    currency: 'EUR',
    external_hotel_name: getExternalHotelName(),
    external_id: getExternalId(),
    funnel_step: getFunnelStep(),
    has_meal: getMeal(),
    meal_type: getMealType(),
    is_postpay: getPostPay(),
    language: getLanguage(),
    price: price && parsePrice(price),
    residency: localStorage.getItem(residencyStorageName) || null,
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