"use strict";

var _months, _cancellationDateRege, _hasMealMessages;

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
  HOTEL_PAGE: /\/[a-z]{0,2}\/hotel\/((?!(.php)).)*$/,
  BOOKING_FORM: /\/[a-z]{0,2}\/guest|client\/book|book_form.php/,
  DIGITS: /\d+/g,
  SPACES: /\s+/g,
  PRICE: /[\d,.]+/g,
  LANGUAGE: /^\/(\w{1,2})\//
};
var Language = {
  RU: 'ru',
  EN: 'en'
};
var months = (_months = {}, _defineProperty(_months, Language.RU, ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']), _defineProperty(_months, Language.EN, ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']), _months);
var cancellationDateRegexps = (_cancellationDateRege = {}, _defineProperty(_cancellationDateRege, Language.RU, new RegExp("(\\d{1,2}) (".concat(months[Language.RU].join('|'), ") (\\d{4})"), 'i')), _defineProperty(_cancellationDateRege, Language.EN, new RegExp("(\\d{1,2}) (".concat(months[Language.EN].join('|'), ") (\\d{4})"), 'i')), _cancellationDateRege);
var hasMealMessages = (_hasMealMessages = {}, _defineProperty(_hasMealMessages, Language.RU, ['Включено в стоимость: Завтрак шведский стол', 'Завтрак шведский стол включен']), _defineProperty(_hasMealMessages, Language.EN, ['Included in the price: Buffet Breakfast', 'Included in the price: Continental Breakfast', 'Buffet Breakfast included']), _hasMealMessages);

var getMonthNumber = function getMonthNumber(language, monthName) {
  var month = (months[language] || months[Language.EN]).indexOf(monthName.toLowerCase()) + 1;
  return "".concat(month).padStart(2, '0');
};

var parsePrice = function parsePrice(price) {
  return parseFloat(price.replace(/[.,  ](?!\d{1,2}$)/g, '').replace(',', '.'));
};

var isHotelPage = Regex.HOTEL_PAGE.test(document.location.pathname);
var isBookingForm = Regex.BOOKING_FORM.test(document.location.pathname);

if (isHotelPage || isBookingForm) {
  var bookingFormSubmitButton = document.querySelector('#makeReservation');

  var searchParams = _toConsumableArray(new URLSearchParams(window.location.search)).reduce(function (map, curr) {
    var _curr = _slicedToArray(curr, 2),
        key = _curr[0],
        value = _curr[1]; // eslint-disable-next-line no-param-reassign


    map[key] = value;
    return map;
  }, {});

  var getExternalId = function getExternalId() {
    var inputTargetRef = document.querySelector('input[name="target"]');

    if (inputTargetRef) {
      return inputTargetRef.value.replace('hotel_', '');
    }

    var inputHotelRef = document.querySelector('input[name="hotel"');

    if (inputHotelRef) {
      return inputHotelRef.value;
    }

    var scriptsRefs = document.querySelectorAll('script');

    var externalIdString = _toConsumableArray(scriptsRefs).reduce(function (acc, it) {
      if (acc) {
        return acc;
      }

      var match = it.textContent.match(/hotel_id = ['"](\d+)['"]/);
      return match && match[1];
    }, null);

    if (externalIdString) {
      return externalIdString;
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

  var getExternalHotelName = function getExternalHotelName() {
    var inputRef = document.querySelector('input[name="target_show"');

    if (inputRef) {
      return inputRef.value.trim();
    }

    if (isHotelPage) {
      var hotelNameRef = document.querySelectorAll('.caption-main')[0];

      if (hotelNameRef) {
        return hotelNameRef.textContent.trim();
      }
    }

    if (isBookingForm) {
      var linkRef = document.querySelector('.bookform-head .blue_link');

      if (linkRef) {
        return linkRef.textContent.trim();
      }

      var nameFromBreadcrumbs = document.querySelector('.breadcrumb li:nth-last-child(2) a');

      if (nameFromBreadcrumbs) {
        return nameFromBreadcrumbs.textContent;
      }
    }

    return document.title;
  };

  var getCheckin = function getCheckin() {
    if (searchParams.sd) {
      return searchParams.sd;
    }

    var inputRef = document.querySelector('input[name="sd"]');

    if (inputRef) {
      return inputRef.value;
    }

    return null;
  };

  var getCheckout = function getCheckout() {
    if (searchParams.ed) {
      return searchParams.ed;
    }

    var inputRef = document.querySelector('input[name="ed"]');

    if (inputRef) {
      return inputRef.value;
    }

    return null;
  };

  var getAdults = function getAdults() {
    if (isHotelPage) {
      var referrerUrlParams = new URLSearchParams(document.referrer);
      var guestsParam = referrerUrlParams.get('guests');

      if (guestsParam) {
        return [Number(guestsParam)];
      }

      return [1];
    }

    if (isBookingForm) {
      if (searchParams.num_rooms) {
        var amount = Number(searchParams.num_rooms);
        return Array(amount).fill(1);
      }

      var inputRef = document.querySelector('input[name="num_rooms"');

      if (inputRef) {
        var _amount = Number(inputRef.value);

        return Array(_amount).fill(1);
      }
    }

    return null;
  };

  var getChildrenYears = function getChildrenYears() {
    if (isHotelPage) {
      var referrerUrlParams = new URLSearchParams(document.referrer);
      var guestsParam = referrerUrlParams.get('guests');

      if (guestsParam) {
        var amount = Number(guestsParam);
        return Array(amount).fill([]);
      }

      return [];
    }

    if (isBookingForm) {
      if (searchParams.num_rooms) {
        var _amount2 = Number(searchParams.num_rooms);

        return Array(_amount2).fill([]);
      }

      var inputRef = document.querySelector('input[name="num_rooms"');

      if (inputRef) {
        var _amount3 = Number(inputRef.value);

        return Array(_amount3).fill([]);
      }
    }

    return null;
  };

  var getRoomsNumber = function getRoomsNumber() {
    if (isHotelPage) {
      return 1;
    }

    if (isBookingForm) {
      if (searchParams.num_rooms) {
        return Number(searchParams.num_rooms);
      }

      var input = document.querySelector('input[name="num_rooms"');

      if (input) {
        return Number(input.value);
      }

      return 1;
    }

    return null;
  };

  var getLanguage = function getLanguage() {
    var pathname = window.location.pathname;
    var match = pathname.match(Regex.LANGUAGE);
    return match ? match[1] : Language.EN;
  };

  var getGuestsCount = function getGuestsCount() {
    var referrerUrlParams = new URLSearchParams(document.referrer);
    var guestsParam = referrerUrlParams.get('guests');
    return guestsParam ? Number(guestsParam) : 1;
  };

  var getHotelInfo = function getHotelInfo() {
    var hasMeal = null;
    var cancellationBefore = null;
    var price = null;
    var roomName = null;
    var taxes = null;

    if (isHotelPage) {
      var cheapestRoomRef = document.querySelector('.room_offer.with-border');

      if (cheapestRoomRef) {
        var _cheapestRoomRef$quer, _cheapestRoomRef$quer2;

        var priceDiv = cheapestRoomRef.querySelector('.actual-price');

        if (priceDiv) {
          var _priceDiv$textContent, _priceDiv$textContent2, _priceDiv$textContent3;

          price = +((_priceDiv$textContent = priceDiv.textContent) === null || _priceDiv$textContent === void 0 ? void 0 : (_priceDiv$textContent2 = _priceDiv$textContent.match(/[\d\s.]+/)) === null || _priceDiv$textContent2 === void 0 ? void 0 : (_priceDiv$textContent3 = _priceDiv$textContent2[0]) === null || _priceDiv$textContent3 === void 0 ? void 0 : _priceDiv$textContent3.replaceAll(/\s/g, ''));
        }

        roomName = (_cheapestRoomRef$quer = cheapestRoomRef.querySelector('.bed_name')) === null || _cheapestRoomRef$quer === void 0 ? void 0 : (_cheapestRoomRef$quer2 = _cheapestRoomRef$quer.textContent) === null || _cheapestRoomRef$quer2 === void 0 ? void 0 : _cheapestRoomRef$quer2.trim();
        var servicesDiv = cheapestRoomRef.parentNode.previousElementSibling;

        if (servicesDiv && servicesDiv.childNodes.length > 1) {
          var _servicesDiv$lastChil;

          hasMeal = (_servicesDiv$lastChil = servicesDiv.lastChild.classList) === null || _servicesDiv$lastChil === void 0 ? void 0 : _servicesDiv$lastChil.contains('free');
        }

        return {
          cancellationBefore: cancellationBefore,
          hasMeal: hasMeal,
          price: price,
          roomName: roomName,
          taxes: taxes
        };
      }

      var cheapestHotelRef = document.querySelector('.cheapest');

      if (cheapestHotelRef) {
        var cardRef = cheapestHotelRef.closest('.content-block');
        hasMeal = _toConsumableArray(cardRef.querySelectorAll('.option-supper')).some(function (it) {
          return it.classList.contains('free');
        });
        price = parseFloat(cheapestHotelRef.dataset.price);
        roomName = cardRef.querySelector('.title').textContent.trim();
        return {
          cancellationBefore: cancellationBefore,
          hasMeal: hasMeal,
          price: price,
          roomName: roomName,
          taxes: taxes
        };
      }

      var offerRefs = document.querySelectorAll('.hotel-offers tbody');

      if (offerRefs && offerRefs.length) {
        var _offerRefs = _slicedToArray(offerRefs, 1),
            offerRef = _offerRefs[0];

        var guestsCount = getGuestsCount();
        var mealRef = offerRef.querySelector('.breakfast');
        var priceRefs = offerRef.querySelectorAll('.client-price a');
        var roomNameRef = offerRef.querySelector('td:nth-child(1) a');
        var cancellationBeforeRef = offerRef.querySelector('td:nth-child(1) .rate-notice');
        var language = getLanguage();

        if (mealRef) {
          hasMeal = Boolean(hasMealMessages[language].includes(mealRef.textContent.trim()));
        }

        if (cancellationBeforeRef) {
          var date = cancellationBeforeRef.dataset.content;
          var regexp = cancellationDateRegexps[language];
          var match = date.match(regexp);

          if (match) {
            cancellationBefore = match[0].replace(regexp, function (m, $1, $2, $3) {
              var month = getMonthNumber(language, $2);
              var d = $1 < 10 ? "0".concat($1) : $1;
              return "".concat($3, "-").concat(month, "-").concat(d);
            });
          }
        }

        if (priceRefs && priceRefs.length) {
          if (guestsCount === 1) {
            var content = priceRefs[0].textContent.trim();
            price = Number(content.replace(',', ''));
          } else if (guestsCount === 2) {
            _toConsumableArray(priceRefs).slice(1, 3).forEach(function (it) {
              var content = it.textContent.trim();

              if (content) {
                price = Number(content.replace(',', ''));
              }
            });
          }
        }

        if (roomNameRef) {
          roomName = [roomNameRef.textContent.trim()];
        }

        return {
          hasMeal: hasMeal,
          cancellationBefore: cancellationBefore,
          price: price,
          roomName: roomName,
          taxes: taxes
        };
      }
    }

    if (isBookingForm) {
      var bookingFormHeadRefs = document.querySelectorAll('.bookform-head-block b');
      var priceRef = document.querySelector('.bookform-price-total-value');
      var priceWithoutTaxesRef = document.querySelector('.bookform-price-item-value');

      var _language = getLanguage();

      if (bookingFormHeadRefs) {
        hasMeal = _toConsumableArray(bookingFormHeadRefs).some(function (it) {
          return hasMealMessages[_language].includes(it.textContent.trim());
        });
      }

      if (priceRef) {
        price = parseFloat(priceRef.textContent.match(Regex.DIGITS)[0]);

        if (priceWithoutTaxesRef) {
          var priceWithoutTaxes = parseFloat(priceWithoutTaxesRef.textContent.match(Regex.DIGITS)[0]);
          taxes = price - priceWithoutTaxes;
        }
      }

      if (!price) {
        var totalPriceRef = document.querySelector('.total .big');

        if (totalPriceRef) {
          var _match = totalPriceRef.textContent.trim().replace(Regex.SPACES, '').match(Regex.DIGITS);

          if (_match) {
            price = Number(_match[0]);
          }
        }
      }

      if (!hasMeal) {
        var foodRef = document.querySelector('.food .free');
        hasMeal = Boolean(foodRef);
      }

      if (!roomName) {
        var imageRef = document.querySelector('.round_photo');

        if (imageRef) {
          roomName = imageRef.alt.trim();
        }

        var _roomNameRef = document.querySelector('.accommodation .row p');

        if (_roomNameRef) {
          roomName = _roomNameRef.textContent.trim();
        }
      }

      if (!taxes) {
        var taxesRef = document.querySelector('.text-orange .pull-right');

        if (taxesRef) {
          var _match2 = taxesRef.textContent.trim().replace(Regex.SPACES, '').match(Regex.DIGITS);

          if (_match2) {
            taxes = Number(_match2[0]);
          }
        }
      }

      if (!cancellationBefore) {
        var _cancellationBeforeRef = document.querySelector('.free-cancellation-deadline');

        if (_cancellationBeforeRef) {
          var _date = _cancellationBeforeRef.textContent.trim();

          var _regexp = cancellationDateRegexps[_language];

          var _match3 = _date.match(_regexp);

          if (_match3) {
            cancellationBefore = _match3[0].replace(_regexp, function (m, $1, $2, $3) {
              var month = getMonthNumber(_language, $2);
              var d = $1 < 10 ? "0".concat($1) : $1;
              return "".concat($3, "-").concat(month, "-").concat(d);
            });
          }
        }
      }

      return {
        hasMeal: hasMeal,
        cancellationBefore: cancellationBefore,
        price: price,
        roomName: roomName,
        taxes: taxes
      };
    }

    return {
      price: price,
      hasMeal: hasMeal,
      roomName: roomName,
      taxes: taxes,
      cancellationBefore: cancellationBefore
    };
  };

  var getCurrency = function getCurrency() {
    var currencyRef = document.querySelector('.currency_code');

    if (currencyRef) {
      return currencyRef.textContent.trim();
    }

    var dropdownCurrencyRef = document.querySelector('#dLabelCurrencies');

    if (dropdownCurrencyRef) {
      return dropdownCurrencyRef.textContent.trim();
    }

    var currDropdown = document.querySelector('.dropdown-bvk_toggle .text-bvk-info.text-bvk-uppercase');

    if (currDropdown) {
      var _currDropdown$textCon;

      return (_currDropdown$textCon = currDropdown.textContent) === null || _currDropdown$textCon === void 0 ? void 0 : _currDropdown$textCon.trim();
    }

    return null;
  };

  setTimeout(function () {
    var hotelInfo = getHotelInfo();
    var cheapestPrice = hotelInfo.price;
    var data = {
      competitor: 'BVK',
      funnel_step: getFunnelStep(),
      external_hotel_name: getExternalHotelName(),
      external_id: getExternalId(),
      checkin: getCheckin(),
      checkout: getCheckout(),
      adults: getAdults(),
      children_years: getChildrenYears(),
      rooms_number: getRoomsNumber(),
      has_meal: hotelInfo.hasMeal,
      cancellation_before: hotelInfo.cancellationBefore,
      is_postpay: false,
      price: cheapestPrice && parsePrice("".concat(cheapestPrice)),
      currency: getCurrency(),
      taxes: hotelInfo.taxes,
      room_name: hotelInfo.roomName,
      language: document.documentElement.lang,
      residency: 'ru',
      html: document.body.outerHTML
    };
    chrome.runtime.sendMessage({
      command: 'SHOW_OFFER',
      data: data
    });

    if (bookingFormSubmitButton) {
      bookingFormSubmitButton.addEventListener('click', function () {
        chrome.runtime.sendMessage({
          command: 'GET_COMPETITOR_ORDER_DATA',
          data: data
        });
      });
    }
  }, 3000);
} else {
  chrome.runtime.sendMessage({
    command: 'SHOW_OFFER',
    data: null
  });
}