"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// @ts-ignore
var Regex = {
  SERP: /Accommodation\/Search/,
  HOTEL_PAGE: /Accommodation\/Details/,
  BOOKING_FORM: /\/UserBasket\/FillDocuments/
}; // @ts-ignore

var isSerp = Regex.SERP.test(document.location.pathname); // @ts-ignore

var isHotelPage = Regex.HOTEL_PAGE.test(document.location.pathname); // @ts-ignore

var isBookingForm = Regex.BOOKING_FORM.test(document.location.pathname); // @ts-ignore

var reverseDate = function reverseDate(date, separator) {
  return date.split(separator).reverse().join('-');
}; // @ts-ignore


var parsePrice = function parsePrice(price) {
  return parseFloat(price.replace(/[.,  ](?!\d{1,2}$)/g, '').replace(',', '.'));
};

var validMealTypes = /breakfast|half board|full board|all inclusive/i;

var getCheckIn = function getCheckIn() {
  if (isHotelPage || isSerp) {
    var _document$querySelect;

    var date = (_document$querySelect = document.querySelector('input[name="Stay.Arrival"]')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.value;
    return date && reverseDate(date, '/');
  }

  if (isBookingForm) {
    var rooms = Array.from(document.querySelectorAll('.row-details'));
    var checkin = rooms.filter(function (_, i) {
      return !(i % 2);
    })[0].querySelectorAll('tbody tr td strong')[0].textContent || null;
    return checkin && reverseDate(checkin, '/');
  }

  return null;
};

var getCheckOut = function getCheckOut() {
  if (isHotelPage || isSerp) {
    var _document$querySelect2;

    var date = (_document$querySelect2 = document.querySelector('input[name="Stay.Departure"]')) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.value;
    return date && reverseDate(date, '/');
  }

  if (isBookingForm) {
    var rooms = Array.from(document.querySelectorAll('.row-details'));
    var checkout = rooms.filter(function (_, i) {
      return !(i % 2);
    })[0].querySelectorAll('tbody tr td strong')[1].textContent || null;
    return checkout && reverseDate(checkout, '/');
  }

  return null;
};

var getHotelName = function getHotelName() {
  var hotel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

  if (isHotelPage || isSerp) {
    var _hotel$querySelector, _hotel$querySelector$;

    var hotelName = (_hotel$querySelector = hotel.querySelector('.info-name')) === null || _hotel$querySelector === void 0 ? void 0 : (_hotel$querySelector$ = _hotel$querySelector.textContent) === null || _hotel$querySelector$ === void 0 ? void 0 : _hotel$querySelector$.trim();
    return hotelName !== null && hotelName !== void 0 ? hotelName : null;
  }

  if (isBookingForm) {
    var _hotel$querySelector2, _hotel$querySelector3, _hotel$querySelector4, _hotel$querySelector5;

    return ((_hotel$querySelector2 = hotel.querySelector('.summary-subsystem-type + div')) === null || _hotel$querySelector2 === void 0 ? void 0 : (_hotel$querySelector3 = _hotel$querySelector2.textContent) === null || _hotel$querySelector3 === void 0 ? void 0 : (_hotel$querySelector4 = _hotel$querySelector3.match(/.+(?::)/)) === null || _hotel$querySelector4 === void 0 ? void 0 : (_hotel$querySelector5 = _hotel$querySelector4[0]) === null || _hotel$querySelector5 === void 0 ? void 0 : _hotel$querySelector5.slice(0, -1)) || null;
  }

  return null;
};

var getExternalHotelId = function getExternalHotelId() {
  var hotel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

  if (isHotelPage) {
    var _hotel$querySelector6;

    return ((_hotel$querySelector6 = hotel.querySelector('.info-name')) === null || _hotel$querySelector6 === void 0 ? void 0 : _hotel$querySelector6.dataset.accommodationid) || null;
  }

  if (isSerp) {
    var _hotel$querySelector7;

    var hotelId = ((_hotel$querySelector7 = hotel.querySelector('.info-name')) === null || _hotel$querySelector7 === void 0 ? void 0 : _hotel$querySelector7.dataset.accommodationid) || null;
    return hotelId && "SXT_".concat(hotelId);
  }

  if (isBookingForm) {
    var _JSON$parse;

    var data = sessionStorage.getItem('6tourHotelData');
    return data && ((_JSON$parse = JSON.parse(data)) === null || _JSON$parse === void 0 ? void 0 : _JSON$parse.hotel_id);
  }

  return null;
};

var getRoomsNumber = function getRoomsNumber() {
  if (isHotelPage || isSerp) {
    var _document$querySelect3;

    var roomsNumber = (_document$querySelect3 = document.querySelector('.occupancy-pax-groups option[selected]')) === null || _document$querySelect3 === void 0 ? void 0 : _document$querySelect3.value;
    return roomsNumber && +roomsNumber || null;
  }

  if (isBookingForm) {
    return Array.from(document.querySelectorAll('.row-details')).filter(function (_, i) {
      return !(i % 2);
    }).length;
  }

  return null;
};

var guestsElements = Array.from(document.querySelectorAll('.item-row.pax-row-block')).filter(function (element) {
  return element.style.display !== 'none';
});

var getGuests = function getGuests() {
  var adults = [];
  var childrenYears = [];

  if (isHotelPage || isSerp) {
    guestsElements.forEach(function (guestsElem) {
      var _guestsElem$querySele;

      var adultsInOneRoom = (_guestsElem$querySele = guestsElem.querySelector('.occupancy-adults-select option[selected]')) === null || _guestsElem$querySele === void 0 ? void 0 : _guestsElem$querySele.value;
      adults.push(adultsInOneRoom && +adultsInOneRoom || null);
      var childrenYearsInOneRoom = Array.from(guestsElem.querySelectorAll('span select')).filter(function (elem) {
        return elem.style.display !== 'none';
      }).map(function (elem) {
        var _elem$querySelector;

        var age = (_elem$querySelector = elem.querySelector('option[selected]')) === null || _elem$querySelector === void 0 ? void 0 : _elem$querySelector.textContent;
        return age && +age || null;
      });
      childrenYears.push(childrenYearsInOneRoom);
    });
  }

  if (isBookingForm) {
    var infoRows = Array.from(document.querySelectorAll('.row-details')).filter(function (_, i) {
      return i % 2;
    });
    infoRows.forEach(function (info) {
      var adultsInOneRoom = Array.from(info.querySelectorAll('input[type="hidden"]')).filter(function (input) {
        return input.name.includes('Adults');
      })[0].value;
      adults.push(adultsInOneRoom && +adultsInOneRoom || null);
    });
    infoRows.forEach(function (info) {
      childrenYears.push(Array.from(info.querySelectorAll('input[type="hidden"]')).filter(function (input) {
        return input.name.includes('ChildrenAges');
      })[0].value.split(',').map(function (years) {
        return +years;
      }).filter(function (years) {
        return !!years;
      }));
    });
  }

  return {
    adults: adults,
    childrenYears: childrenYears
  };
};

var getResidency = function getResidency() {
  if (isHotelPage || isSerp) {
    var _document$querySelect4;

    var residency = ((_document$querySelect4 = document.querySelector('select[name="Occ.NationalityCode"]')) === null || _document$querySelect4 === void 0 ? void 0 : _document$querySelect4.getAttribute('data-selected')) || null;
    return residency === '--' ? null : residency;
  }

  if (isBookingForm) {
    var _JSON$parse2;

    var data = sessionStorage.getItem('6tourHotelData');
    return data && ((_JSON$parse2 = JSON.parse(data)) === null || _JSON$parse2 === void 0 ? void 0 : _JSON$parse2.residency) || 'en';
  }

  return null;
};

if (isSerp) {
  var _document$querySelect5, _document$querySelect6, _document$querySelect7, _document$querySelect8;

  var hotels = Array.from(document.querySelectorAll('.accommodation-result-block'));
  var city = (_document$querySelect5 = (_document$querySelect6 = document.querySelector('.location-name')) === null || _document$querySelect6 === void 0 ? void 0 : _document$querySelect6.textContent) !== null && _document$querySelect5 !== void 0 ? _document$querySelect5 : null;
  var geo = (_document$querySelect7 = (_document$querySelect8 = document.querySelector('.geo-name')) === null || _document$querySelect8 === void 0 ? void 0 : _document$querySelect8.textContent) !== null && _document$querySelect7 !== void 0 ? _document$querySelect7 : null;

  var getStarRating = function getStarRating(hotel) {
    var _hotel$querySelectorA;

    return (_hotel$querySelectorA = hotel.querySelectorAll('.starrating i').length) !== null && _hotel$querySelectorA !== void 0 ? _hotel$querySelectorA : null;
  };

  var getAddress = function getAddress(hotel) {
    var _hotel$querySelectorA2 = hotel.querySelectorAll('.info-address'),
        _hotel$querySelectorA3 = _slicedToArray(_hotel$querySelectorA2, 2),
        addressElement = _hotel$querySelectorA3[0],
        zipCodeElement = _hotel$querySelectorA3[1];

    var address = addressElement ? addressElement.textContent : '';
    var zipCode = zipCodeElement ? zipCodeElement.textContent : '';
    return "".concat(address, " ").concat(zipCode).trim() || null;
  };

  var getRoomsNames = function getRoomsNames(rate) {
    var _rate$querySelector;

    return ((_rate$querySelector = rate.querySelector('input.params')) === null || _rate$querySelector === void 0 ? void 0 : _rate$querySelector.getAttribute('data-description')) || null;
  };

  var getMealType = function getMealType(rate) {
    var _rate$querySelector2, _rate$querySelector2$, _rate$querySelector2$2;

    return ((_rate$querySelector2 = rate.querySelector('td .b + div')) === null || _rate$querySelector2 === void 0 ? void 0 : (_rate$querySelector2$ = _rate$querySelector2.textContent) === null || _rate$querySelector2$ === void 0 ? void 0 : (_rate$querySelector2$2 = _rate$querySelector2$.match(validMealTypes)) === null || _rate$querySelector2$2 === void 0 ? void 0 : _rate$querySelector2$2[0]) || null;
  };

  var getCancellationDate = function getCancellationDate(rate) {
    var _rate$querySelector3, _rate$querySelector3$, _rate$querySelector3$2, _rate$querySelector3$3;

    return ((_rate$querySelector3 = rate.querySelector('td.col3 span.small')) === null || _rate$querySelector3 === void 0 ? void 0 : (_rate$querySelector3$ = _rate$querySelector3.textContent) === null || _rate$querySelector3$ === void 0 ? void 0 : (_rate$querySelector3$2 = _rate$querySelector3$.match(/\d+/g)) === null || _rate$querySelector3$2 === void 0 ? void 0 : (_rate$querySelector3$3 = _rate$querySelector3$2.splice(0, 3)) === null || _rate$querySelector3$3 === void 0 ? void 0 : _rate$querySelector3$3.reverse().join('-')) || null;
  };

  var getPrice = function getPrice(rate) {
    var _rate$querySelector4, _rate$querySelector4$;

    var price = ((_rate$querySelector4 = rate.querySelector('.main-price span')) === null || _rate$querySelector4 === void 0 ? void 0 : (_rate$querySelector4$ = _rate$querySelector4.textContent) === null || _rate$querySelector4$ === void 0 ? void 0 : _rate$querySelector4$.replace(',', '.')) || null;
    return price && parsePrice(price);
  };

  var getCurrency = function getCurrency(rate) {
    var _rate$querySelector5;

    return ((_rate$querySelector5 = rate.querySelector('.params')) === null || _rate$querySelector5 === void 0 ? void 0 : _rate$querySelector5.getAttribute('data-currency')) || null;
  };

  var getData = function getData() {
    var checkIn = getCheckIn();
    var checkOut = getCheckOut();
    var result = [];
    hotels.forEach(function (hotel) {
      var _hotel$querySelector8, _hotel$querySelector$2, _hotel$querySelector9;

      if (hotel.classList.contains('info-disabled')) {
        return;
      }

      var coordinates = (_hotel$querySelector8 = hotel.querySelector('.show-accommodation-on-map')) === null || _hotel$querySelector8 === void 0 ? void 0 : _hotel$querySelector8.dataset;
      var hotelName = getHotelName(hotel);
      var externalHotelId = getExternalHotelId(hotel);
      var starRating = getStarRating(hotel);
      var hotelKind = (_hotel$querySelector$2 = (_hotel$querySelector9 = hotel.querySelector('.info-accommodation-type')) === null || _hotel$querySelector9 === void 0 ? void 0 : _hotel$querySelector9.textContent) !== null && _hotel$querySelector$2 !== void 0 ? _hotel$querySelector$2 : null;
      var address = getAddress(hotel);

      var _getGuests = getGuests(),
          adults = _getGuests.adults,
          childrenYears = _getGuests.childrenYears;

      var guests = Array(getRoomsNumber()).fill(null).map(function (_, i) {
        return {
          adults: adults[i],
          children: childrenYears[i]
        };
      });
      var rates = hotel.querySelectorAll('.result-row');
      Array.from(rates).forEach(function (rate) {
        var _coordinates$lat, _coordinates$lon;

        result.push({
          hotel_name: hotelName,
          external_hotel_id: externalHotelId,
          latitude: (_coordinates$lat = coordinates === null || coordinates === void 0 ? void 0 : coordinates.lat) !== null && _coordinates$lat !== void 0 ? _coordinates$lat : null,
          longitude: (_coordinates$lon = coordinates === null || coordinates === void 0 ? void 0 : coordinates.lon) !== null && _coordinates$lon !== void 0 ? _coordinates$lon : null,
          star_rating: starRating,
          hotel_kind: hotelKind,
          address: address,
          phone: null,
          city: city,
          geo: geo,
          checkin: checkIn,
          checkout: checkOut,
          guests: guests,
          room_name: getRoomsNames(rate),
          meal_type: getMealType(rate),
          has_meal: !!getMealType(rate),
          cancellation_before: getCancellationDate(rate),
          price: getPrice(rate),
          currency: getCurrency(rate)
        });
      });
    });
    return result;
  };

  document.addEventListener('click', function (e) {
    var target = e.target;

    if (target !== null && target !== void 0 && target.classList.contains('add-to-userbasket')) {
      var _JSON$parse3;

      var data = sessionStorage.getItem('6tourHotelData');
      var savedId = data && ((_JSON$parse3 = JSON.parse(data)) === null || _JSON$parse3 === void 0 ? void 0 : _JSON$parse3.hotel_id); // @ts-ignore

      var currentId = Array.from(e.path).filter(function (el) {
        var _classList;

        return (_classList = el.classList) === null || _classList === void 0 ? void 0 : _classList.contains('result-row');
      })[0].getAttribute('data-accid');

      if (currentId && savedId !== currentId) {
        sessionStorage.setItem('6tourHotelData', JSON.stringify({
          hotel_id: currentId,
          residency: getResidency()
        }));
      }
    }
  });
  chrome.runtime.sendMessage({
    command: 'GET_COMPETITOR_SERP_DATA',
    data: getData()
  });
} else if (isHotelPage || isBookingForm) {
  var getLanguage = function getLanguage() {
    var _document$querySelect9, _document$querySelect10;

    var language = ((_document$querySelect9 = document.querySelector('#languages option[selected]')) === null || _document$querySelect9 === void 0 ? void 0 : (_document$querySelect10 = _document$querySelect9.value) === null || _document$querySelect10 === void 0 ? void 0 : _document$querySelect10.slice(0, 2)) || null;
    return language === 'ru' ? 'ru' : 'en';
  };

  var _getCurrency = function _getCurrency() {
    if (isHotelPage) {
      var _document$querySelect11;

      return ((_document$querySelect11 = document.querySelector('.params')) === null || _document$querySelect11 === void 0 ? void 0 : _document$querySelect11.getAttribute('data-currency')) || null;
    }

    if (isBookingForm) {
      var _document$querySelect12;

      var currency = ((_document$querySelect12 = document.querySelector('#cbTotalPriceCurrency')) === null || _document$querySelect12 === void 0 ? void 0 : _document$querySelect12.textContent) || null;
      return currency === '€' ? 'EUR' : currency;
    }

    return null;
  };

  var getChosenRoomsIds = function getChosenRoomsIds() {
    var _getGuests2 = getGuests(),
        adults = _getGuests2.adults,
        children = _getGuests2.childrenYears;

    var roomsNumber = getRoomsNumber();
    var rooms = document.querySelectorAll('.result-row');

    if (roomsNumber) {
      var ids = [];
      Array(roomsNumber).fill(null).forEach(function (_, i) {
        for (var room = 0; room < rooms.length; room += 1) {
          var _rooms$room$querySele, _rooms$room$querySele2;

          var roomCapacity = (_rooms$room$querySele = rooms[room].querySelector('.occupancy')) === null || _rooms$room$querySele === void 0 ? void 0 : (_rooms$room$querySele2 = _rooms$room$querySele.getAttribute('title')) === null || _rooms$room$querySele2 === void 0 ? void 0 : _rooms$room$querySele2.match(/\d+/g);
          var adultsInRoom = roomCapacity && +roomCapacity[0] || 0;
          var childrenInRoom = roomCapacity && +roomCapacity[1] || 0;
          var id = rooms[room].getAttribute('id');
          var searchedAdults = adults[i];
          var searchedChildren = children[i].length;

          if (searchedAdults && adultsInRoom >= searchedAdults && childrenInRoom >= searchedChildren) {
            ids.push(id);
            return;
          }
        }
      });
      return ids;
    }

    return null;
  };

  var _getMealType = function _getMealType() {
    if (isHotelPage) {
      var roomsNumber = getRoomsNumber();
      var roomsIds = getChosenRoomsIds();

      if (roomsNumber && roomsIds) {
        return Array(roomsNumber).fill(null).map(function (_, i) {
          var _document$querySelect13, _document$querySelect14, _document$querySelect15;

          return ((_document$querySelect13 = document.querySelector("tr[id=\"".concat(roomsIds[i], "\"] td .b + div"))) === null || _document$querySelect13 === void 0 ? void 0 : (_document$querySelect14 = _document$querySelect13.textContent) === null || _document$querySelect14 === void 0 ? void 0 : (_document$querySelect15 = _document$querySelect14.match(validMealTypes)) === null || _document$querySelect15 === void 0 ? void 0 : _document$querySelect15[0]) || null;
        });
      }
    }

    if (isBookingForm) {
      var rooms = Array.from(document.querySelectorAll('.row-details'));
      return rooms.filter(function (_, i) {
        return !(i % 2);
      }).map(function (room) {
        var _room$querySelectorAl, _room$querySelectorAl2;

        return ((_room$querySelectorAl = room.querySelectorAll('tbody tr td + td')[2].textContent) === null || _room$querySelectorAl === void 0 ? void 0 : (_room$querySelectorAl2 = _room$querySelectorAl.match(validMealTypes)) === null || _room$querySelectorAl2 === void 0 ? void 0 : _room$querySelectorAl2[0]) || null;
      });
    }

    return null;
  };

  var getHasMealValue = function getHasMealValue() {
    var mealType = _getMealType();

    if (mealType) {
      return mealType.map(function (meal) {
        return !!meal;
      });
    }

    return null;
  };

  var _getCancellationDate = function _getCancellationDate() {
    if (isHotelPage) {
      var roomsNumber = getRoomsNumber();
      var roomsIds = getChosenRoomsIds();

      if (roomsNumber && roomsIds) {
        var res = Array(roomsNumber).fill(null).map(function (_, i) {
          var _document$querySelect16, _document$querySelect17, _document$querySelect18, _document$querySelect19;

          return (_document$querySelect16 = document.querySelector("tr[id=\"".concat(roomsIds[i], "\"] td.col3 span.small"))) === null || _document$querySelect16 === void 0 ? void 0 : (_document$querySelect17 = _document$querySelect16.textContent) === null || _document$querySelect17 === void 0 ? void 0 : (_document$querySelect18 = _document$querySelect17.match(/\d+/g)) === null || _document$querySelect18 === void 0 ? void 0 : (_document$querySelect19 = _document$querySelect18.splice(0, 3)) === null || _document$querySelect19 === void 0 ? void 0 : _document$querySelect19.reverse().join('-');
        });
        return res;
      }
    }

    if (isBookingForm) {
      var rooms = Array.from(document.querySelectorAll('.row-details'));
      return rooms.filter(function (_, i) {
        return !(i % 2);
      }).map(function (room) {
        var info = room.querySelectorAll('tbody tr');
        var cancellationDateElement = info[info.length - 1].querySelector('td span.free');

        if (cancellationDateElement) {
          var _info$querySelector, _info$querySelector$t, _info$querySelector$t2;

          var cancellationDate = ((_info$querySelector = info[info.length - 1].querySelector('td + td')) === null || _info$querySelector === void 0 ? void 0 : (_info$querySelector$t = _info$querySelector.textContent) === null || _info$querySelector$t === void 0 ? void 0 : (_info$querySelector$t2 = _info$querySelector$t.trim().match(/\d+\/\d+\/\d+/)) === null || _info$querySelector$t2 === void 0 ? void 0 : _info$querySelector$t2[0]) || null;
          return cancellationDate && reverseDate(cancellationDate, '/');
        }

        return null;
      });
    }

    return null;
  };

  var getTaxes = function getTaxes() {
    var roomsNumber = getRoomsNumber();

    if (roomsNumber) {
      return Array(roomsNumber).fill(0);
    }

    return null;
  };

  var _getRoomsNames = function _getRoomsNames() {
    if (isHotelPage) {
      var roomsNumber = getRoomsNumber();
      var roomsIds = getChosenRoomsIds();

      if (roomsNumber && roomsIds) {
        return Array(roomsNumber).fill(null).map(function (_, i) {
          var _document$querySelect20;

          return ((_document$querySelect20 = document.querySelector("tr[id=\"".concat(roomsIds[i], "\"] input.params"))) === null || _document$querySelect20 === void 0 ? void 0 : _document$querySelect20.getAttribute('data-description')) || null;
        });
      }
    }

    if (isBookingForm) {
      return Array.from(document.querySelectorAll('div.b.big')).map(function (name) {
        var _name$textContent, _name$textContent$mat;

        return (name === null || name === void 0 ? void 0 : (_name$textContent = name.textContent) === null || _name$textContent === void 0 ? void 0 : (_name$textContent$mat = _name$textContent.match(/x (.+) -/)) === null || _name$textContent$mat === void 0 ? void 0 : _name$textContent$mat[1].trim()) || null;
      });
    }

    return null;
  };

  var _getPrice = function _getPrice() {
    if (isHotelPage) {
      var roomsIds = getChosenRoomsIds();

      if (roomsIds) {
        var finalSum = 0;
        roomsIds.forEach(function (roomId) {
          var _document$querySelect21, _document$querySelect22;

          var oneRoomPrice = ((_document$querySelect21 = document.querySelector("tr[id=\"".concat(roomId, "\"] .main-price span"))) === null || _document$querySelect21 === void 0 ? void 0 : (_document$querySelect22 = _document$querySelect21.textContent) === null || _document$querySelect22 === void 0 ? void 0 : _document$querySelect22.replace(',', '.')) || null;

          if (oneRoomPrice) {
            finalSum += +oneRoomPrice;
          }
        });
        return finalSum;
      }
    }

    if (isBookingForm) {
      var _document$querySelect23, _document$querySelect24, _document$querySelect25;

      var price = ((_document$querySelect23 = document.querySelector('.summaryTotalPriceWithMarkup')) === null || _document$querySelect23 === void 0 ? void 0 : (_document$querySelect24 = _document$querySelect23.textContent) === null || _document$querySelect24 === void 0 ? void 0 : (_document$querySelect25 = _document$querySelect24.match(/[\d,.]+/)) === null || _document$querySelect25 === void 0 ? void 0 : _document$querySelect25[0]) || null;
      return price && parsePrice(price);
    }

    return null;
  };

  var getIsPostpay = function getIsPostpay() {
    var roomsNumber = getRoomsNumber();

    if (roomsNumber) {
      return Array(roomsNumber).fill(false);
    }

    return null;
  };

  var getFunnelStep = function getFunnelStep() {
    return isHotelPage ? 'hotelpage' : 'booking_form';
  };

  var _getData = function _getData() {
    var _getGuests3 = getGuests(),
        adults = _getGuests3.adults,
        childrenYears = _getGuests3.childrenYears;

    return {
      competitor: 'SXT',
      funnel_step: getFunnelStep(),
      external_hotel_name: getHotelName(),
      external_id: getExternalHotelId(),
      checkin: getCheckIn(),
      checkout: getCheckOut(),
      adults: adults,
      children_years: childrenYears,
      residency: getResidency(),
      meal_type: _getMealType(),
      has_meal: getHasMealValue(),
      cancellation_before: _getCancellationDate(),
      is_postpay: getIsPostpay(),
      taxes: getTaxes(),
      room_name: _getRoomsNames(),
      price: _getPrice(),
      currency: _getCurrency(),
      language: getLanguage()
    };
  };

  if (isBookingForm) {
    var interval = setInterval(function () {
      var _document$querySelect26, _document$querySelect27, _document$querySelect28;

      var price = (_document$querySelect26 = document.querySelector('.summaryTotalPriceWithMarkup')) === null || _document$querySelect26 === void 0 ? void 0 : (_document$querySelect27 = _document$querySelect26.textContent) === null || _document$querySelect27 === void 0 ? void 0 : (_document$querySelect28 = _document$querySelect27.match(/[\d,.]+/)) === null || _document$querySelect28 === void 0 ? void 0 : _document$querySelect28[0];

      if (price && +price !== 0) {
        clearInterval(interval);
        chrome.runtime.sendMessage({
          command: 'SHOW_OFFER',
          data: _getData()
        });
      }
    }, 1000);
  }

  if (isHotelPage) {
    var sendDataAfterContentIsLoaded = function sendDataAfterContentIsLoaded(isLoaded) {
      var _document$querySelect29;

      if (isLoaded) {
        var id = getExternalHotelId();
        var residency = getResidency();

        if (id || residency) {
          sessionStorage.setItem('6tourHotelData', JSON.stringify({
            hotel_id: id,
            residency: residency
          }));
        }

        chrome.runtime.sendMessage({
          command: 'SHOW_OFFER',
          data: _getData()
        });
        return;
      }

      if (((_document$querySelect29 = document.querySelector('#results')) === null || _document$querySelect29 === void 0 ? void 0 : _document$querySelect29.style.display) !== 'none') {
        sendDataAfterContentIsLoaded(true);
      } else {
        setTimeout(function () {
          sendDataAfterContentIsLoaded(false);
        }, 3000);
      }
    };

    sendDataAfterContentIsLoaded(false);
  }
}