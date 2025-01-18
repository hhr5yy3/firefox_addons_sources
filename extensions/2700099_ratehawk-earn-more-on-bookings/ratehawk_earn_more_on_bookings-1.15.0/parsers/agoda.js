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

var parse = function parse() {
  var Page = {
    HOTEL_PAGE: 'hotelpage',
    BOOKING_FORM: 'booking_form'
  };
  var Regex = {
    HOTEL_PAGE: /\/hotel\//,
    BOOKING_FORM: /\/book\//
  };

  var parsePrice = function parsePrice(price) {
    return parseFloat(price.replace(/[.,  ](?!\d{1,2}$)/g, '').replace(',', '.'));
  };

  var currencies = {
    AED: 'AED',
    AFN: 'AFN',
    ARS: 'AR$',
    AUD: 'AUD',
    BDT: 'Tk',
    BGN: 'лв',
    BHD: 'BHD',
    BRL: 'R$',
    CAD: 'CAD',
    CHF: 'CHF',
    CNY: 'RMB',
    CZK: 'Kč',
    DKK: 'DKK',
    EGP: 'EGP',
    EUR: '€',
    FJD: 'FJ$',
    GBP: '£',
    HKD: 'HKD',
    HUF: 'Ft',
    IDR: 'Rp',
    ILS: '₪',
    INR: 'Rs.',
    JOD: 'JOD',
    JPY: '¥',
    KHR: '៛',
    KRW: '₩',
    KWD: 'KWD',
    KZT: '₸',
    LAK: '₭',
    MVR: 'Rf',
    MXN: 'MXN',
    MYR: 'RM',
    NGN: '₦',
    NOK: 'NOK',
    NZD: 'NZD',
    OMR: 'OMR',
    PHP: '₱',
    PKR: 'PKR',
    PLN: 'zł',
    QAR: 'QAR',
    RON: 'lei',
    RUB: '₽',
    SAR: 'SAR',
    SEK: 'SEK',
    SGD: 'SGD',
    THB: '฿',
    TRY: 'TL',
    TWD: 'NT$',
    UAH: 'грн',
    USD: '$',
    VND: '₫',
    XPF: 'XPF',
    ZAR: 'R'
  };

  var scripts = _toConsumableArray(document.querySelectorAll('script'));

  var targetScript = scripts.find(function (script) {
    return script.textContent.includes('rtag_hotelid');
  });
  var scriptContent = targetScript.textContent;

  var getDataFromScript = function getDataFromScript(rtag) {
    var match = scriptContent.match(new RegExp("var ".concat(rtag, " = (.+);")));

    if (match) {
      var value = match[1].replace(/['"]/g, '');

      if (value === 'false') {
        return false;
      }

      if (value === 'true') {
        return true;
      }

      if (value.match(/^\d+$/)) {
        return +value;
      }

      return value;
    }

    return null;
  };

  var DEFAULT_CHILDREN_AGE = 10;
  var isHotelPage = Regex.HOTEL_PAGE.test(document.location.pathname);
  var isBookingForm = Regex.BOOKING_FORM.test(document.location.pathname) && document.location.host.includes('secure');

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

    var getCheckin = function getCheckin() {
      if (isHotelPage) {
        var checkInBox = document.querySelector('[data-selenium="checkInBox"]');

        if (checkInBox) {
          return checkInBox.dataset.date;
        }
      }

      if (isBookingForm) {
        return getDataFromScript('rtag_checkin');
      }

      return null;
    };

    var getCheckout = function getCheckout() {
      if (isHotelPage) {
        var checkOutBox = document.querySelector('[data-selenium="checkOutBox"]');

        if (checkOutBox) {
          return checkOutBox.dataset.date;
        }
      }

      if (isBookingForm) {
        return getDataFromScript('rtag_checkout');
      }

      return null;
    };

    var getExternalHotelName = function getExternalHotelName() {
      if (isHotelPage) {
        var hotelName = document.querySelector('h1.HeaderCerebrum__Name');

        if (hotelName) {
          return hotelName.textContent;
        }
      }

      if (isBookingForm) {
        var _hotelName = document.querySelector('span.hotel-name');

        if (_hotelName) {
          return _hotelName.getAttribute('title');
        }
      }

      return null;
    };

    var getExternalId = function getExternalId() {
      if (isHotelPage) {
        var hotelId = document.querySelector('input[name="hotel_id"]');

        if (hotelId) {
          return hotelId.value;
        }
      }

      if (isBookingForm) {
        return "".concat(getDataFromScript('rtag_hotelid'));
      }

      return null;
    };

    var getMeal = function getMeal() {
      if (isHotelPage) {
        return null;
      }

      if (isBookingForm) {
        return getDataFromScript('rtag_is_breakfast_included');
      }

      return null;
    };

    var getCancellationBefore = function getCancellationBefore() {
      if (isHotelPage) {
        return null;
      }

      if (isBookingForm) {
        var rooms = getDataFromScript('rtag_searchqty');
        var isFreeCancellation = getDataFromScript('rtag_is_free_cancellation');

        if (!rooms) {
          return null;
        }

        if (isFreeCancellation) {
          var meta = document.querySelector('meta[name="pageData"]');
          var jsonData = meta.getAttribute('data-json-vm');
          var date = jsonData.match(/(?<=freeCancellationDateTime":")\d{4}-\d{2}-\d{2}/)[0];
          return new Array(rooms).fill(date)[0];
        }

        return new Array(rooms).fill(null)[0];
      }

      return null;
    };

    var getPostPay = function getPostPay() {
      if (isHotelPage) {
        return null;
      }

      if (isBookingForm) {
        var rooms = getDataFromScript('rtag_searchqty');

        if (rooms) {
          return new Array(rooms).fill(false)[0];
        }
      }

      return null;
    };

    var getRoomName = function getRoomName() {
      if (isHotelPage) {
        return null;
      }

      if (isBookingForm) {
        var rooms = getDataFromScript('rtag_searchqty');
        var roomDesc = document.querySelector('div.room-details-panel strong');

        if (roomDesc && rooms) {
          if (roomDesc.textContent.includes('(')) {
            var _roomName = roomDesc.textContent.match(/(?<=\().+(?=\))/)[0];
            return new Array(rooms).fill(_roomName);
          }

          var roomName = roomDesc.textContent.match(/(?<=x\s).+/)[0];
          return new Array(rooms).fill(roomName);
        }
      }

      return null;
    };

    var getPrice = function getPrice() {
      if (isHotelPage) {
        var cheapestPrice = document.querySelector('[data-selenium ="cheapest-price"]');

        if (cheapestPrice) {
          var priceSpan = cheapestPrice.querySelector('.price');
          var price = parsePrice(priceSpan.textContent.replace(/\u00a0/g, ''));
          var roomValue = document.querySelector('[data-selenium="roomValue"]');
          var rooms = +roomValue.dataset.value;
          var checkInBox = document.querySelector('[data-selenium="checkInBox"]');
          var checkInDate = checkInBox.dataset.date;
          var checkOutBox = document.querySelector('[data-selenium="checkOutBox"]');
          var checkOutDate = checkOutBox.dataset.date;
          var millisecsPerDay = 86400000;
          var lengthOfStay = (new Date(checkOutDate) - new Date(checkInDate)) / millisecsPerDay;
          var totalPrice = price * rooms * lengthOfStay;

          if (totalPrice) {
            return totalPrice;
          }
        }
      }

      if (isBookingForm) {
        return getDataFromScript('rtag_totalprice_lcl_taxinc');
      }

      return null;
    };

    var getTaxes = function getTaxes() {
      if (isHotelPage) {
        return null;
      }

      if (isBookingForm) {
        var rooms = getDataFromScript('rtag_searchqty');

        if (rooms) {
          return new Array(rooms).fill(0)[0];
        }
      }

      return null;
    };

    var getRoomsNumber = function getRoomsNumber() {
      if (isHotelPage) {
        var roomValue = document.querySelector('[data-selenium="roomValue"]');
        var rooms = +roomValue.dataset.value;

        if (rooms) {
          return rooms;
        }
      }

      if (isBookingForm) {
        var _rooms = getDataFromScript('rtag_searchqty');

        if (_rooms) {
          return _rooms;
        }
      }

      return null;
    };

    var getAdults = function getAdults() {
      if (isHotelPage) {
        var roomValue = document.querySelector('[data-selenium="roomValue"]');
        var rooms = +roomValue.dataset.value;
        var adultValue = document.querySelector('[data-selenium="adultValue"]');
        var adults = +adultValue.dataset.value;
        var adultsPerRoom = Math.floor(adults / rooms);
        var remainder = adults % rooms;
        var adultsArr = new Array(rooms).fill(null).map(function () {
          return adultsPerRoom;
        });

        if (remainder !== 0) {
          for (var i = 1; i <= remainder; i += 1) {
            adultsArr[i - 1] += 1;
          }
        }

        return adultsArr;
      }

      if (isBookingForm) {
        var _rooms2 = getDataFromScript('rtag_searchqty');

        var _adults = getDataFromScript('rtag_searchadult');

        if (_rooms2 && _adults) {
          var _adultsPerRoom = Math.floor(_adults / _rooms2);

          var _remainder = _adults % _rooms2;

          var _adultsArr = new Array(_rooms2).fill(null).map(function () {
            return _adultsPerRoom;
          });

          if (_remainder !== 0) {
            for (var _i = 1; _i <= _remainder; _i += 1) {
              _adultsArr[_i - 1] += 1;
            }
          }

          return _adultsArr;
        }
      }

      return null;
    };

    var getChildrenYears = function getChildrenYears() {
      if (isHotelPage) {
        var roomValue = document.querySelector('[data-selenium="roomValue"]');
        var rooms = +roomValue.dataset.value;
        var childValue = document.querySelector('[data-selenium="childValue"]');

        if (childValue) {
          var children = +childValue.dataset.value;
          var searchParams = new URLSearchParams(window.location.search);
          var childrenAges = searchParams.get('childAges');
          var childrenAgesArr = [];

          if (childrenAges !== null) {
            childrenAgesArr = childrenAges.split(',').map(function (item) {
              return parseInt(item, 10);
            });

            if (childrenAgesArr.length < children) {
              var difference = children - childrenAgesArr;
              var appendix = new Array(difference).fill(DEFAULT_CHILDREN_AGE);
              childrenAgesArr.push(appendix);
              childrenAgesArr.flat();
            }
          } else {
            childrenAgesArr = new Array(children).fill(DEFAULT_CHILDREN_AGE);
          }

          var splitArr = function splitArr(arr, chunks) {
            return _toConsumableArray(Array(chunks)).map(function (_, c) {
              return arr.filter(function (n, i) {
                return i % chunks === c;
              });
            });
          };

          return splitArr(childrenAgesArr, rooms);
        }

        return new Array(rooms).fill([]);
      }

      if (isBookingForm) {
        var _rooms3 = getDataFromScript('rtag_searchqty');

        var _children = getDataFromScript('rtag_searchchild');

        if (!_rooms3) {
          return null;
        }

        if (_children) {
          var meta = document.querySelector('meta[name="pageData"]');
          var jsonData = meta.getAttribute('data-json-vm');
          var childrenAgesString = jsonData.match(/(?<=childages=)(\d+,*)+/)[0];

          var _childrenAgesArr = childrenAgesString.split(',').map(function (item) {
            return +item;
          }); // eslint-disable-next-line max-len


          var _splitArr = function _splitArr(arr, chunks) {
            return _toConsumableArray(Array(chunks)).map(function (_, c) {
              return arr.filter(function (n, i) {
                return i % chunks === c;
              });
            });
          };

          return _splitArr(_childrenAgesArr, _rooms3);
        }

        return new Array(_rooms3).fill([]);
      }

      return null;
    };

    var getCurrency = function getCurrency() {
      if (isHotelPage) {
        var cheapestPrice = document.querySelector('[data-selenium ="cheapest-price"]');

        if (cheapestPrice) {
          var currencySpan = cheapestPrice.querySelector('span.currency');
          var currency;
          var currenciesArr = Object.entries(currencies);

          for (var i = 0; i < currenciesArr.length; i += 1) {
            if (currencySpan.textContent.includes(currenciesArr[i][1])) {
              var _currenciesArr$i = _slicedToArray(currenciesArr[i], 1);

              currency = _currenciesArr$i[0];
              break;
            }
          }

          return currency;
        }
      }

      if (isBookingForm) {
        var priceBox = document.querySelector('#totalAmount');

        if (priceBox) {
          var price = priceBox.textContent;

          var _currency;

          var _currenciesArr = Object.entries(currencies);

          for (var _i2 = 0; _i2 < _currenciesArr.length; _i2 += 1) {
            if (price.includes(_currenciesArr[_i2][1])) {
              var _currenciesArr$_i = _slicedToArray(_currenciesArr[_i2], 1);

              _currency = _currenciesArr$_i[0];
              break;
            }
          }

          if (_currency) {
            return _currency;
          }
        }
      }

      return null;
    };

    var getResidency = function getResidency() {
      var urlPathname = document.location.pathname;
      var residencyRegex = /\/\w{2}-(\w{2})\//;
      var residencyMatch = urlPathname.match(residencyRegex);
      return residencyMatch ? residencyMatch[1] : 'gb';
    };

    var data = {
      adults: getAdults(),
      cancellation_before: getCancellationBefore(),
      checkin: getCheckin(),
      checkout: getCheckout(),
      children_years: getChildrenYears(),
      competitor: 'AGD',
      currency: getCurrency(),
      external_hotel_name: getExternalHotelName(),
      external_id: getExternalId(),
      funnel_step: getFunnelStep(),
      has_meal: getMeal(),
      html: document.body.outerHTML,
      is_postpay: getPostPay(),
      language: 'en',
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
  var priceHP = document.querySelector('[data-selenium="cheapest-price"]');
  var externalHotelId = document.querySelector('input[name="hotel_id"]');
  var priceBF = document.querySelector('#totalAmount');

  if (priceHP && externalHotelId || priceBF) {
    parse();
    clearInterval(intervalId);
  }
}, 250);