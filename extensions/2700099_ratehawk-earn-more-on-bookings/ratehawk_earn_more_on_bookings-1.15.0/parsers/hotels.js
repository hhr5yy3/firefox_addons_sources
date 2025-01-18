"use strict";

// @ts-ignore
var Regex = {
  BOOKING_FORM: /bookingInitialise/,
  HOTEL_PAGE: /\/ho\d+/,
  SERP: /search.do/
}; // @ts-ignore

var isBookingForm = Regex.BOOKING_FORM.test(window.location.pathname); // @ts-ignore

var isHotelPage = Regex.HOTEL_PAGE.test(window.location.pathname); // @ts-ignore

var isSerp = Regex.SERP.test(window.location.pathname); // @ts-ignore

var parsePrice = function parsePrice(price) {
  return parseFloat(price.replace(/[.,  ](?!\d{1,2}$)/g, '').replace(',', '.'));
};

var getHiddenInputValue = function getHiddenInputValue(name) {
  var _document$querySelect, _document$querySelect2;

  return (_document$querySelect = (_document$querySelect2 = document.querySelector("input[name=\"".concat(name, "\"]"))) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.value) !== null && _document$querySelect !== void 0 ? _document$querySelect : null;
}; // @ts-ignore


var reverseDate = function reverseDate(date, separator) {
  return date === null || date === void 0 ? void 0 : date.split(separator).reverse().join('-');
};

if (isBookingForm || isHotelPage) {
  var getHotelName = function getHotelName() {
    var _document$querySelect3;

    return ((_document$querySelect3 = document.querySelector('h1')) === null || _document$querySelect3 === void 0 ? void 0 : _document$querySelect3.textContent) || null;
  };

  var getCheckIn = function getCheckIn() {
    if (isBookingForm) {
      var date = getHiddenInputValue("checkInDate");
      return date && reverseDate(date, '-');
    }

    if (isHotelPage) {
      var _document$querySelect4;

      var checkIn = ((_document$querySelect4 = document.querySelector('#totpq-localised-check-in')) === null || _document$querySelect4 === void 0 ? void 0 : _document$querySelect4.value) || null;
      return checkIn && reverseDate(checkIn, '/');
    }

    return null;
  };

  var getCheckOut = function getCheckOut() {
    if (isBookingForm) {
      var date = getHiddenInputValue("checkOutDate");
      return date && reverseDate(date, '-');
    }

    if (isHotelPage) {
      var _document$querySelect5;

      var checkOut = ((_document$querySelect5 = document.querySelector('#totpq-localised-check-out')) === null || _document$querySelect5 === void 0 ? void 0 : _document$querySelect5.value) || null;
      return checkOut && reverseDate(checkOut, '/');
    }

    return null;
  };

  var getRoomsNumber = function getRoomsNumber() {
    if (isBookingForm) {
      return document.querySelectorAll('.room-details-room').length;
    }

    if (isHotelPage) {
      var _document$querySelect6, _document$querySelect10, _document$querySelect11, _document$querySelect12;

      var searchedRoomsNumber = (_document$querySelect6 = document.querySelector('#totpq-rooms option[selected]')) === null || _document$querySelect6 === void 0 ? void 0 : _document$querySelect6.value;

      if (searchedRoomsNumber && +searchedRoomsNumber === 1) {
        var _document$querySelect7, _document$querySelect8, _document$querySelect9;

        var _roomsNumber2 = (_document$querySelect7 = document.querySelector('.price-info')) === null || _document$querySelect7 === void 0 ? void 0 : (_document$querySelect8 = _document$querySelect7.textContent) === null || _document$querySelect8 === void 0 ? void 0 : (_document$querySelect9 = _document$querySelect8.match(/\d/)) === null || _document$querySelect9 === void 0 ? void 0 : _document$querySelect9[0];

        return _roomsNumber2 && +_roomsNumber2 || null;
      }

      var _roomsNumber = (_document$querySelect10 = document.querySelector('.price-info strong')) === null || _document$querySelect10 === void 0 ? void 0 : (_document$querySelect11 = _document$querySelect10.textContent) === null || _document$querySelect11 === void 0 ? void 0 : (_document$querySelect12 = _document$querySelect11.match(/\d+/)) === null || _document$querySelect12 === void 0 ? void 0 : _document$querySelect12[0];

      return _roomsNumber && +_roomsNumber || null;
    }

    return null;
  };

  var getAdults = function getAdults() {
    var roomsNames = getRoomsNames();
    var areRoomsTheSame = roomsNames && roomsNames.every(function (roomName) {
      return roomName === roomsNames[0];
    });

    if (roomsNumber) {
      if (isBookingForm) {
        return Array(+roomsNumber).fill(null).map(function (_, i) {
          var adults = getHiddenInputValue(areRoomsTheSame ? "shoppingCartOrderDetails.travelDetails[0].hotelData.roomDetails[0].roomType.roomOccupations[".concat(i, "].numberOfAdults") : "shoppingCartOrderDetails.travelDetails[".concat(i, "].hotelData.roomDetails[0].roomType.roomOccupations[0].numberOfAdults"));
          return adults && +adults;
        });
      }

      if (isHotelPage) {
        var formElement = document.querySelector('.cont-bd');
        var allRooms = formElement && Array.from(formElement.querySelectorAll('.widget-query-group.widget-query-room-options'));

        if (allRooms) {
          return allRooms.map(function (roomEl, i) {
            var _roomEl$querySelector;

            var adults = (roomEl === null || roomEl === void 0 ? void 0 : (_roomEl$querySelector = roomEl.querySelector("select[name=\"q-room-".concat(i, "-adults\"] option[selected]"))) === null || _roomEl$querySelector === void 0 ? void 0 : _roomEl$querySelector.textContent) || null;
            return adults && +adults;
          });
        }
      }
    }

    return null;
  };

  var getChildren = function getChildren() {
    var roomsNames = getRoomsNames();
    var areRoomsTheSame = roomsNames && roomsNames.every(function (roomName) {
      return roomName === roomsNames[0];
    });

    if (roomsNumber) {
      if (isBookingForm) {
        return Array(+roomsNumber).fill(null).map(function (_, i) {
          var childrenYears = getHiddenInputValue(areRoomsTheSame ? "shoppingCartOrderDetails.travelDetails[0].hotelData.roomDetails[0].roomType.roomOccupations[".concat(i, "].childrenAges") : "shoppingCartOrderDetails.travelDetails[".concat(i, "].hotelData.roomDetails[0].roomType.roomOccupations[0].childrenAges"));
          return childrenYears ? childrenYears.split(',').map(function (child) {
            return +child;
          }) : [];
        });
      }

      if (isHotelPage) {
        var formElement = document.querySelector('.cont-bd');
        var allRooms = formElement && Array.from(formElement.querySelectorAll('.widget-query-group.widget-query-room-options'));

        if (allRooms) {
          return allRooms.map(function (roomEl, i) {
            var _roomEl$querySelector2;

            var childrenNumber = (roomEl === null || roomEl === void 0 ? void 0 : (_roomEl$querySelector2 = roomEl.querySelector("select[name=\"q-room-".concat(i, "-children\"] option[selected]"))) === null || _roomEl$querySelector2 === void 0 ? void 0 : _roomEl$querySelector2.textContent) || null;

            if (!childrenNumber || +childrenNumber <= 0) {
              return [];
            }

            return Array.from(roomEl === null || roomEl === void 0 ? void 0 : roomEl.querySelectorAll('.widget-query-room-options-children select option[selected]')).map(function (child) {
              return +child.value;
            });
          });
        }
      }
    }

    return null;
  };

  var getCancellationDate = function getCancellationDate() {
    if (isBookingForm) {
      var cancellationMessages = document.querySelectorAll('.cancellation-item-caption');
      var cancellationDates = [];

      if (cancellationMessages.length) {
        cancellationDates = Array.from(cancellationMessages).map(function (messageNode) {
          var date = messageNode.textContent && messageNode.textContent.match(/\d+/g);

          if (date) {
            var year = date[2];

            if (year.length === 2) {
              date[2] = "20".concat(year);
            }

            return date.reverse().join('-');
          }

          return null;
        });
      }

      if (roomsNumber && cancellationDates.length < roomsNumber) {
        return Array(roomsNumber).fill(cancellationDates[0]);
      }

      return cancellationDates.length ? cancellationDates : null;
    }

    if (isHotelPage) {
      var _document$querySelect13, _document$querySelect14, _document$querySelect15, _document$querySelect16;

      var cancellationDate = (_document$querySelect13 = document.querySelector('.cancellation-additional-info')) === null || _document$querySelect13 === void 0 ? void 0 : (_document$querySelect14 = _document$querySelect13.textContent) === null || _document$querySelect14 === void 0 ? void 0 : (_document$querySelect15 = _document$querySelect14.match(/\d+/g)) === null || _document$querySelect15 === void 0 ? void 0 : (_document$querySelect16 = _document$querySelect15.reverse()) === null || _document$querySelect16 === void 0 ? void 0 : _document$querySelect16.join('-');

      if (cancellationDate) {
        return Array(roomsNumber).fill(null).map(function () {
          return cancellationDate;
        });
      }

      return null;
    }

    return null;
  };

  var getRoomsNames = function getRoomsNames() {
    if (isBookingForm) {
      return Array.from(document.querySelectorAll('.property-description')).map(function (room) {
        return (room === null || room === void 0 ? void 0 : room.textContent) || null;
      });
    }

    if (isHotelPage) {
      var _document$querySelect17;

      var roomName = (_document$querySelect17 = document.querySelectorAll('.rooms-and-rates-container li.room .room-name')[0]) === null || _document$querySelect17 === void 0 ? void 0 : _document$querySelect17.textContent;
      return Array(roomsNumber).fill(null).map(function () {
        return roomName || null;
      });
    }

    return null;
  };

  var getArrayWithLengthOfRoomsNumber = function getArrayWithLengthOfRoomsNumber(item) {
    return roomsNumber && Array.from({
      length: +roomsNumber
    }, function () {
      return item;
    });
  };

  var getResidency = function getResidency() {
    var _window$location$host;

    var residency = (_window$location$host = window.location.host.match(/\S{2}/)) === null || _window$location$host === void 0 ? void 0 : _window$location$host[0];
    return residency === 'ww' ? 'gb' : residency || null;
  };

  var getPrice = function getPrice() {
    if (isBookingForm) {
      var price = getHiddenInputValue('payments.submittedPayments[0].paymentAmount');
      return price && parseFloat(price);
    }

    if (isHotelPage) {
      var _document$querySelect18, _document$querySelect19, _document$querySelect20;

      var _price = ((_document$querySelect18 = document.querySelector('.current-price')) === null || _document$querySelect18 === void 0 ? void 0 : (_document$querySelect19 = _document$querySelect18.textContent) === null || _document$querySelect19 === void 0 ? void 0 : (_document$querySelect20 = _document$querySelect19.match(/[\d,.]+/g)) === null || _document$querySelect20 === void 0 ? void 0 : _document$querySelect20[0]) || null;

      return _price && parsePrice(_price);
    }

    return null;
  };

  var getHasMeal = function getHasMeal() {
    if (isBookingForm) {
      return Array.from(document.querySelectorAll('.room-amenities')).map(function (textNode) {
        var _textNode$textContent;

        return !!((_textNode$textContent = textNode.textContent) !== null && _textNode$textContent !== void 0 && _textNode$textContent.match(/\S+? \d+ \S+?/));
      });
    }

    if (isHotelPage) {
      return Array(roomsNumber).fill(null).map(function () {
        var mealElement = document.querySelectorAll('.rooms-and-rates-container li.room li.breakfast.offer')[0];

        if (mealElement) {
          return !mealElement.classList.contains('premium');
        }

        return false;
      });
    }

    return null;
  };

  var getMealType = function getMealType() {
    var hasMealArr = getHasMeal();

    if (hasMealArr) {
      return hasMealArr.map(function (hasMeal) {
        return hasMeal ? 'Breakfast' : null;
      });
    }

    return null;
  };

  var getId = function getId() {
    if (isBookingForm) {
      return getHiddenInputValue('shoppingCartOrderDetails.travelDetails[0].hotelData.hotelId');
    }

    if (isHotelPage) {
      return getHiddenInputValue('bookingRequest.hotelId');
    }

    return null;
  };

  var getIsPostPay = function getIsPostPay() {
    if (isBookingForm) {
      return getArrayWithLengthOfRoomsNumber(false);
    }

    if (isHotelPage) {
      var room = document.querySelectorAll('.rooms-and-rates-container li.room')[0];

      if (room) {
        var isPostPay = room.querySelector('.mvt7870v3') || room.querySelector('.no-cc-message');
        return Array(roomsNumber).fill(null).map(function () {
          return !!isPostPay;
        });
      }
    }

    return null;
  };

  var getCurrency = function getCurrency() {
    return isBookingForm ? getHiddenInputValue('bookingStateData.shownDisplayCurrency') : getHiddenInputValue('bookingRequest.currency');
  };

  var roomsNumber = getRoomsNumber();
  var data = {
    competitor: 'HTC',
    funnel_step: isBookingForm ? 'booking_form' : 'hotelpage',
    external_hotel_name: getHotelName(),
    external_id: getId(),
    checkin: getCheckIn(),
    checkout: getCheckOut(),
    adults: getAdults(),
    children_years: getChildren(),
    rooms_number: roomsNumber && +roomsNumber,
    meal_type: getMealType(),
    has_meal: getHasMeal(),
    cancellation_before: getCancellationDate(),
    is_postpay: getIsPostPay(),
    price: getPrice(),
    currency: getCurrency(),
    taxes: getArrayWithLengthOfRoomsNumber(0),
    room_name: getRoomsNames(),
    residency: getResidency(),
    language: document.documentElement.lang
  };
  chrome.runtime.sendMessage({
    command: 'SHOW_OFFER',
    data: data
  });
} else if (isSerp) {
  var _getHotelName = function _getHotelName(hotel) {
    return hotel.getAttribute('data-title');
  };

  var getExternalHotelId = function getExternalHotelId(hotel) {
    return hotel.getAttribute('data-hotel-id');
  };

  var getStarRating = function getStarRating(hotel) {
    var _hotel$querySelector, _hotel$querySelector$;

    var starRating = ((_hotel$querySelector = hotel.querySelector('.star-rating')) === null || _hotel$querySelector === void 0 ? void 0 : (_hotel$querySelector$ = _hotel$querySelector.textContent) === null || _hotel$querySelector$ === void 0 ? void 0 : _hotel$querySelector$.match(/\d/)) || null;
    return starRating && +starRating;
  };

  var getKind = function getKind(hotel) {
    var _hotel$querySelector2;

    return ((_hotel$querySelector2 = hotel.querySelector('.vr-badge')) === null || _hotel$querySelector2 === void 0 ? void 0 : _hotel$querySelector2.textContent) || null;
  };

  var getAddress = function getAddress(hotel) {
    var _hotel$querySelector3;

    return ((_hotel$querySelector3 = hotel.querySelector('.address')) === null || _hotel$querySelector3 === void 0 ? void 0 : _hotel$querySelector3.textContent) || null;
  };

  var getGeo = function getGeo() {
    return getHiddenInputValue('q-destination');
  };

  var getCity = function getCity() {
    var _getGeo, _getGeo$match;

    return ((_getGeo = getGeo()) === null || _getGeo === void 0 ? void 0 : (_getGeo$match = _getGeo.match(/(.+),/)) === null || _getGeo$match === void 0 ? void 0 : _getGeo$match[1]) || null;
  };

  var getCheckInOrOut = function getCheckInOrOut(option) {
    var date = getHiddenInputValue("q-localised-check-".concat(option));
    return date && reverseDate(date, '/');
  };

  var _getRoomsNumber = function _getRoomsNumber() {
    var roomsNumber = getHiddenInputValue('q-rooms');
    return roomsNumber && +roomsNumber;
  };

  var getGuests = function getGuests() {
    var roomsNumber = _getRoomsNumber();

    if (roomsNumber) {
      return Array.from({
        length: roomsNumber
      }, function (_, i) {
        var adults = 0;
        var children = [];
        var adultsInOneRoom = getHiddenInputValue("q-room-".concat(i, "-adults"));

        if (adultsInOneRoom) {
          adults += +adultsInOneRoom;
        }

        var childrenInOneRoom = getHiddenInputValue("q-room-".concat(i, "-children"));

        if (childrenInOneRoom) {
          Array(+childrenInOneRoom).fill(null).forEach(function (_c, j) {
            var age = getHiddenInputValue("q-room-".concat(i, "-child-").concat(j, "-age"));

            if (age) {
              children.push(+age);
            }
          });
        }

        return {
          adults: adults,
          children: children
        };
      });
    }

    return null;
  };

  var getCancellationBefore = function getCancellationBefore(hotel) {
    var roomsNumber = _getRoomsNumber();

    if (roomsNumber) {
      var isCancellationBeforeMessage = !!hotel.querySelector('li[class="deals-item"]');

      if (isCancellationBeforeMessage) {
        var checkIn = getCheckInOrOut('in');

        if (checkIn) {
          var millisecondsInOneDay = 86400000;
          var cancellationDate = new Date(+new Date(checkIn) - millisecondsInOneDay);
          var finalDate = "".concat(cancellationDate.getFullYear(), "-").concat("".concat(cancellationDate.getMonth() + 1).padStart(2, '0'), "-").concat("".concat(cancellationDate.getDate()).padStart(2, '0'));
          return Array(roomsNumber).fill(finalDate);
        }
      }
    }

    return null;
  };

  var _getPrice = function _getPrice(hotel) {
    var _priceElement, _priceElement$textCon, _priceElement$textCon2;

    var priceLink = hotel.querySelector('.price-link');
    var isSpecialPrice = !!(priceLink !== null && priceLink !== void 0 && priceLink.querySelector('.strike-tooltip-block'));
    var priceElement;

    if (isSpecialPrice) {
      priceElement = (priceLink === null || priceLink === void 0 ? void 0 : priceLink.querySelector('ins')) || null;
    } else {
      priceElement = (priceLink === null || priceLink === void 0 ? void 0 : priceLink.querySelector('strong')) || null;
    }

    var price = (_priceElement = priceElement) === null || _priceElement === void 0 ? void 0 : (_priceElement$textCon = _priceElement.textContent) === null || _priceElement$textCon === void 0 ? void 0 : (_priceElement$textCon2 = _priceElement$textCon.replace(' ', '.').match(/[\d,.]+/g)) === null || _priceElement$textCon2 === void 0 ? void 0 : _priceElement$textCon2[0];
    return price && parsePrice(price);
  };

  var _getCurrency = function _getCurrency() {
    var _document$querySelect21;

    return ((_document$querySelect21 = document.querySelector('#header-toggle-currency')) === null || _document$querySelect21 === void 0 ? void 0 : _document$querySelect21.textContent) || null;
  };

  var getData = function getData() {
    var hotels = Array.from(document.querySelectorAll('.hotel'));
    return hotels.map(function (hotel) {
      return {
        hotel_name: _getHotelName(hotel),
        external_hotel_id: getExternalHotelId(hotel),
        latitude: null,
        longitude: null,
        star_rating: getStarRating(hotel),
        kind: getKind(hotel),
        address: getAddress(hotel),
        phone: null,
        city: getCity(),
        geo: getGeo(),
        checkin: getCheckInOrOut('in'),
        checkout: getCheckInOrOut('out'),
        guests: getGuests(),
        room_name: null,
        meal_type: null,
        has_meal: null,
        cancellation_before: getCancellationBefore(hotel),
        price: _getPrice(hotel),
        currency: _getCurrency()
      };
    });
  };

  chrome.runtime.sendMessage({
    command: 'GET_COMPETITOR_SERP_DATA',
    data: getData()
  });
}