// WidgetFeature Toggle Feature.min.js
var DOMAIN = "https://weatherauthority.co";
/* let close = document.getElementsByClassName('newsWrap__header--closebtn')[0];
let bottompopup = document.getElementsByClassName('weather-news-box')[0];

close.addEventListener('click',function(e){
    e.preventDefault();
    $('.weather-news').removeClass('active');
    bottompopup.classList.remove('active');
}) */

function _toConsumableArray(t) {
    return _arrayWithoutHoles(t) || _iterableToArray(t) || _nonIterableSpread()
}

function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance")
}

function _iterableToArray(t) {
    if (Symbol.iterator in Object(t) || "[object Arguments]" === Object.prototype.toString.call(t)) return Array.from(t)
}

function _arrayWithoutHoles(t) {
    if (Array.isArray(t)) {
        for (var e = 0, o = new Array(t.length); e < t.length; e++) o[e] = t[e];
        return o
    }
}

window.Widget = function (t) {
    this.queryP = t || {}, this.doc = {
        n_click: "n-widgetclick",
        n_action: "n-widgetaction",
        n_target: "n-widgettarget"
    }, this.toggleClassName = this.queryP.toggleClassName || "active", this.n_clicks = document.querySelectorAll("[".concat(this.doc.n_click, "]")), this.n_actions = document.querySelectorAll("[".concat(this.doc.n_action, "]")), window.old_target_value = null, window.mouseOnWidgetFlag = !1
}, Widget.prototype.removeClass = function (t, e) {
    try {
        t && this.filter(t, function (t, o) {
            t && t.classList.remove(e)
        })
    } catch (t) {
        console.log(t)
    }
}, Widget.prototype.addClass = function (t, e) {
    try {
        t && this.filter(t, function (t, o) {
            t && t.classList.add(e)
        })
    } catch (t) {
        console.log(t)
    }
}, Widget.prototype.toggleClass = function (t, e) {
    try {
        t && this.filter(t, function (t, o) {
            t && t.classList.toggle(e)
        })
    } catch (t) {
        console.log(t)
    }
}, Widget.prototype.filter = function (t, e) {
    var o = 0;
    try {
        if (t.length > 0) for (; o < t.length;) e(t[o], o), o++
    } catch (t) {
        console.log("error@ filter Function" + t)
    }
}, Widget.prototype.widgetHideOn = function () {
    try {
        var t = this;
        t.queryP.widgetHideOn.forEach(function (e) {
            var o = "document" == e.event ? [document] : document.querySelectorAll(e.event);
            t.filter(o, function (o, n) {
                o.addEventListener("click", function (o) {
                    e.target.forEach(function (e) {
                        t.removeClass(document.querySelectorAll(e.event), t.toggleClassName)
                    })
                })
            })
        })
    } catch (t) {
        console.log(t)
    }
}, Widget.prototype.firstLoadRender = function (t) {
    var e = this;
    if (e.queryP.firstLoad.attribute) {
        window.old_target_value = e.queryP.firstLoad.attribute;
        var o = e.queryP.firstLoad.storage.item, n = e.queryP.firstLoad.storage.value;
        try {
            var c = document.querySelectorAll("[n-widgetclick=".concat(window.old_target_value, "],[n-widgetaction=").concat(window.old_target_value, "],[n-widgettarget=").concat(window.old_target_value, "]"));
            storageReplacer.getLocalStorageItem(o) ? "function" == typeof t && t(!1) : (storageReplacer.setLocalStorageItem(o, n), e.filter(c, function (t, o) {
                t.classList.toggle(e.toggleClassName)
            }), "function" == typeof t && t(!0))
        } catch (e) {
            "function" == typeof t && t(!1), console.error("Error finding the first load attribute at Widget Feature")
        }
    }
}, Widget.prototype.init = function (t) {
    var e = this;
    try {
        e.filter(e.n_clicks, function (o, n) {
            o.addEventListener("click", function (o) {
                var n = {}, c = o.currentTarget, a = c.getAttribute(e.doc.n_target);
                if (n.clickElement = c, n.hasTarget = !!a, n.hasTarget && (n.targetValue = a), n.hasClickValue = !!c.getAttribute(e.doc.n_click), n.clickValue = c.getAttribute(e.doc.n_click) || "", n.hasAction = !!c.parentElement.querySelector("[".concat(e.doc.n_action, "]")), n.hasAction && (n.actionElement = c.parentElement.querySelector("[".concat(e.doc.n_action, "]")), n.actionValue = n.actionElement.getAttribute(e.doc.n_action)), a && (c = document.querySelector("[".concat(e.doc.n_click, "=").concat(a, "]"))), e.queryP.hasOwnProperty("activateTarget") && e.queryP.activateTarget) {
                    var r = c.getAttribute(e.doc.n_click), i = c.hasAttribute(e.doc.n_target),
                        l = r ? document.querySelectorAll("[".concat(e.doc.n_target, "=").concat(r, "]")) : document.querySelectorAll("[".concat(e.doc.n_target, "=").concat(a, "]"));
                    r && (i || window.old_target_value == r) || e.removeClass(document.querySelectorAll("[".concat(e.doc.n_target, "]")), e.toggleClassName), e.toggleClass(l, e.toggleClassName), window.old_target_value = r
                }
                e.filter(e.n_clicks, function (t) {
                    c != t && t.parentElement.querySelector("[".concat(e.doc.n_action, "]")) && e.removeClass([t, t.parentElement.querySelector("[".concat(e.doc.n_action, "]"))], e.toggleClassName)
                }), e.toggleClass([c, c.parentElement.querySelector("[".concat(e.doc.n_action, "]")) ? c.parentElement.querySelector("[".concat(e.doc.n_action, "]")) : ""], e.toggleClassName), c.classList.contains(e.toggleClassName) ? n.clickIsActive = !0 : n.clickIsActive = !1, c.parentElement.querySelector("[".concat(e.doc.n_action, "]")) && c.parentElement.querySelector("[".concat(e.doc.n_action, "]")).classList.contains(e.toggleClassName) ? n.actionIsActive = !0 : n.actionIsActive = !1, "function" == typeof t && t(n)
            })
        }), e.filter([].concat(_toConsumableArray(e.n_clicks), _toConsumableArray(e.n_actions)), function (t, e) {
            t.addEventListener("mouseover", function (t) {
                mouseOnWidgetFlag = !1
            }), t.addEventListener("mouseout", function (t) {
                mouseOnWidgetFlag = !0
            })
        }), document.addEventListener("click", function (o) {
            var n = { actionElement: null, actionIsActive: !1, actionValue: null };
            n.clickElement = o.target, n.clickIsActive = !1, n.clickValue = "document", n.hasAction = !1, n.hasClickValue = !1, n.hasTarget = !1, mouseOnWidgetFlag && (e.removeClass(e.n_clicks, e.toggleClassName), e.removeClass(e.n_actions, e.toggleClassName), "function" == typeof t && t(n))
        }), e.queryP.hasOwnProperty("widgetHideOn") && e.widgetHideOn()
    } catch (t) {
        console.log(t)
    }
};

function getStorageItem(name) {
    var finalContent = null;
    var content = null;
    try {
        content = storageReplacer.getLocalStorageItem(name);
        try {
            finalContent = JSON.parse(content);
        } catch (err) {
            finalContent = content;
        }
    } catch (err) {
        console.debug(err);
    }
    return finalContent;
}

function setStorageItem(name, data) {
    try {
        storageReplacer.setLocalStorageItem(name, JSON.stringify(data));
    } catch (err) {}
}

(function () {
    var imgs = $('[data-src]');
    $.each(imgs, function (i, e) {
        if ($(e).attr('data-src')) {
            var dataSrc = $(e).attr('data-src');
            $(e).attr('src', dataSrc);
        }
    });
})();



var defaultLatitude = '40.71';
var defaultLongitude = '-74.01';

hideWeatherView();

function showWeatherView() {
    $('.weatherdata').css({
        opacity: '1',
        'pointer-events': 'auto'
    });
    $('.replacement-linkout').hide();
    $('.widget-blck,.weather-pill-wrap').show();
    document.dispatchEvent(new Event('weatherVisibleToUi'));
}

function hideWeatherView() {
    $('.weatherdata').css({
        opacity: '0',
        'pointer-events': 'none'
    });
}

function getKey(lat, long, suffix) {
    suffix = suffix || '';
    return lat + ',' + long + suffix;
}



function getDataFromNetwork(url, timeout) {
    timeout = timeout || 1500;
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: url,
            success: function(data) {
                var result = {
                    status: true
                };
                Object.assign(result, data);
                resolve(result);
            },
            error: function(err) {
                resolve({
                    status: false
                });
            },
            timeout: timeout
        });
    });
}

function getCityPillText(data) {
    var text = data.city;
    if (data.state) text += ', ' + data.state;
    else if (data.country) text += ', ' + data.country;
    return text;
}

var localCityObj = {};

var localCityDetails = 'localCityDetails';

var dataExpiryTime = '15';

function checkTimePassed(dataExpiryTime) {
    var localDataTime = storageReplacer.getLocalStorageItem(localCityDetails)
        ? JSON.parse(storageReplacer.getLocalStorageItem(localCityDetails))
        : '';

    var checkTime = function(myDate) {
        var timer = 15 * 60 * 1000;
        return new Date() - myDate > timer;
    };
    // If not present on load set it
    // Onload this will load and set a timer from the first minute;
    if (checkTime(new Date(localDataTime.timestamp))) {
        localCityObj.timestamp = new Date();
        storageReplacer.setLocalStorageItem(localCityDetails, JSON.stringify(localCityObj));
        return false;
    }

    return true;
}

function getLiveLocation() {
    $('.replacement-linkout').show();
    $('.widget-blck,.weather-pill-wrap').hide();
    // try {
    //     if (getBrowser().name == 'Firefox') return;
    // } catch (err) {}
    if (
        checkTimePassed(dataExpiryTime) &&
        !!storageReplacer.getLocalStorageItem(localCityDetails)
    ) {
        getDataFromLocal();
    } else {
        return new Promise(function(resolve, reject) {
            getLocationCoordinates()
                .then(function(locationInfo) {
                    localCityObj.timestamp = new Date();
                    storageReplacer.setLocalStorageItem(localCityDetails, JSON.stringify(localCityObj));
                    getCityDetails(locationInfo).then(function(data) {
                        if (data.city) {
                            var cityPillText = getCityPillText(data);
                            $('.currentlocation').text(cityPillText);
                            $('.currentlocation').attr('title', cityPillText);
                            localCityObj.city = cityPillText;
                            storageReplacer.setLocalStorageItem(
                                localCityDetails,
                                JSON.stringify(localCityObj)
                            );
                        }
                    });
                    getCityTemperature(locationInfo.latitude, locationInfo.longitude);

                    /* Promise.all([getCityDetails(locationInfo), getCityTemperature(locationInfo.latitude, locationInfo.longitude)]).then((values) => {
                    showWeatherView();
                }); */
                })
                .catch(function(err) {});
        });
    }
}

function getDataFromLocal() {
    var localData = storageReplacer.getLocalStorageItem(localCityDetails)
        ? JSON.parse(storageReplacer.getLocalStorageItem(localCityDetails))
        : '';
    $('.currentlocation').text(localData.city);
    $('.currentlocation').attr('title', localData.city);
    var tempround = localData.hasOwnProperty("cityTemperature") ? localData.cityTemperature.currently.temperature.toFixed(1) : 0 ;
    $('.weather-icon').addClass(localData.cityTemperature.currently.icon);
    $('.citytemf').text(convertCelsiusToFarenheit(tempround) + '°; F');
    // NT specific
    document.dispatchEvent(new Event('linkOutTemperatureUpdate'));
    showWeatherView();
}

function getLocationCoordinates() {
    return new Promise(function(resolve, reject) {
        var locationData = null;
        if (locationData && locationData.length === 2) {
            resolve({
                longitude: locationData[0],
                latitude: locationData[1]
            });
        } else {
            getDataFromNetwork(specificConstants.API + 'getLocationData', 5000)
                .then(function(data) {
                    if (data.status) {
                        if (
                            data.location &&
                            data.location.longitude &&
                            data.location.latitude
                        ) {
                            resolve({
                                longitude: data.location.longitude,
                                latitude: data.location.latitude,
                                city: data.city.names ? data.city.names.en : '',
                                state:
                                    !!data &&
                                    data.subdivisions.length > 0 &&
                                    data.subdivisions[0].names
                                        ? data.subdivisions[0].names.en
                                        : ''
                            });
                        }
                    }
                    resolve({
                        longitude: defaultLongitude,
                        latitude: defaultLatitude
                    });
                })
                .catch(function() {
                    resolve({
                        longitude: defaultLongitude,
                        latitude: defaultLatitude
                    });
                });
        }
    });
}

function getCityDetails(locationInfo) {
    return new Promise(function(resolve, reject) {
        var latitude = locationInfo.latitude;
        var longitude = locationInfo.longitude;
        var city = locationInfo.city;
        if (city) {
            resolve(locationInfo);
        } else {
            fetchCityDetails(latitude, longitude)
                .then(function(cityData) {
                    locationInfo = Object.assign(locationInfo || {}, cityData || {});
                    resolve(locationInfo);
                })
                .catch(function(err) {
                    reject(err);
                });
        }
    });
}

function fetchCityDetails(latitude, longitude) {
    if (!!latitude && !!longitude) {
        var cityPromise;
        if (!!getStorageItem(getKey(latitude, longitude, 'CityInfo'))) {
            cityPromise = Promise.resolve(
                getStorageItem(getKey(latitude, longitude, 'CityInfo'))
            );
        } else {
            cityPromise = new Promise(function(cityResolve, cityReject) {
                $.getJSON(
                    specificConstants.API +
                    'getReverseGeocoding?latitude=' +
                    latitude +
                    '&longitude=' +
                    longitude,
                    function(data) {
                        var city = data.location.split(',');
                        var cityInfo = {
                            latitude: latitude,
                            longitude: longitude,
                            city: city[0],
                            country: city[1]
                        };
                        setStorageItem(getKey(latitude, longitude, 'CityInfo'), cityInfo);
                        cityResolve(cityInfo);
                    }
                );
            });
        }
        return cityPromise;
    }
    return Promise.reject();
}

function convertCelsiusToFarenheit(value) {
    return Math.round((9 / 5) * value + 32);
}

function getCityTemperature(lat, long) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            type: 'GET',
            url:
                specificConstants.API +
                'temperatureData?latitude=' +
                lat +
                '&longitude=' +
                long,
            success: function(data) {
                var tempround = data.currently.temperature.toFixed(1);
                $('.weather-icon').addClass(data.currently.icon);
                $('.citytemf').text(convertCelsiusToFarenheit(tempround) + '°; F');
                localCityObj.cityTemperature = data;
                storageReplacer.setLocalStorageItem(localCityDetails, JSON.stringify(localCityObj));
                // NT specific
                document.dispatchEvent(new Event('linkOutTemperatureUpdate'));
                showWeatherView();
                resolve(data);
            },
            error: function(error) {
                ////console.log(error);
                $('.citytemf').text('Not found');
                showWeatherView();
            }
        });
    });
}


var acceptButton = $('.acceptTerms');
var allowWidget = $('.allow-widget');
var acceptTerm = $('.accept-prompt');

var piiAccept = 'piiAccept';

acceptButton.on('click', function (e) {
    chrome.runtime.sendMessage({task: "showOptInPage"}, function (response) {});
    document.dispatchEvent(new Event('showOptInPage'));
});

var denyButton =  $('.denyTerms');

denyButton.on('click', function (e) {
    closePiiWidget();
});


var widgetElement = $('link-out');

widgetElement.on('click', function (e) {
    checkPiiStored();
});

function checkPiiStored() {
    var accepted = storageReplacer.getLocalStorageItem('piiAccept');
    if (accepted && accepted == 1) {
        allowWidget.show();
        acceptTerm.hide();

        document.dispatchEvent(new CustomEvent('PiiAccept', {
            detail: true
        }));
    } else if (!accepted || accepted == -1) {
        allowWidget.hide();
        acceptTerm.show();

        document.dispatchEvent(new CustomEvent('PiiAccept', {
            detail: false
        }));
    }
}

function closePiiWidget() {
    try {
        document.dispatchEvent(new Event("searchTextChanged"));
        document.dispatchEvent(
            new CustomEvent('PiiAccept', {
                detail: 'cancel'
            })
        );
    } catch (e) {
        console.log(e);
    }
}

var defaultLatitude = '40.71';
var defaultLongitude = '-74.01';



function formatCountryName(name) {
    name = name.toLowerCase();
    var words = name.split(" ");
    if (words.includes("united") && words.includes("states") && words.includes("america")) {
        return "USA";
    } else if (words.includes("united") && words.includes("arab") && words.includes("emirates")) {
        return "UAE";
    } else if (words.includes("united") && words.includes("kingdom")) {
        return "UK";
    } else if (words.includes("united") && words.includes("states")) {
        return "US";
    }
    return titleCase(name);
}





function convertCelsiusToFarenheit(value) {
    return Math.round(9 / 5 * value + 32);
}

function getMeridianFromHour(hour) {
    hour = hour % 24;
    return hour < 12 ? 'am' : "pm";
}



function getDataFromNetwork(url, timeout) {
    timeout = timeout || 1500;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: url,
            success: function (data) {
                var result = {
                    status: true
                };
                Object.assign(result, data);
                resolve(result);
            },
            error: function (err) {
                resolve({
                    status: false
                });
            },
            timeout: timeout
        });
    })
}

function getFallbackLocation() {
    return new Promise(function (resolve, reject) {
        var locationData = null;
        if (locationData && locationData.length === 2) {
            resolve({
                longitude: locationData[0],
                latitude: locationData[1]
            });
        } else {
            getDataFromNetwork(specificConstants.API + "getLocationData", 5000).then(function (data) {
                if (data.status) {
                    if (data.location && data.location.longitude && data.location.latitude) {
                        resolve({
                            longitude: data.location.longitude,
                            latitude: data.location.latitude,
                            city: data.city.names ? data.city.names.en : "",
                            state: (!!data && data.subdivisions.length > 0 && data.subdivisions[0].names)
                                ? data.subdivisions[0].names.en : ""
                        });
                    }
                }
                resolve({
                    longitude: defaultLongitude,
                    latitude: defaultLatitude
                });
            }).catch(function () {
                resolve({
                    longitude: defaultLongitude,
                    latitude: defaultLatitude
                });
            });
        }
    });
}

function titleCase(string) {
    var words = string.split(" ");
    for (var i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1)
    }
    return words.join(" ");
}

function changeTimeFormatTo12Hr(date) {
    var hours = date.getHours(),
        minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var unit = getMeridianFromHour(hours);
    hours = hours % 12;
    hours = hours == 0 ? 12 : hours;

    return {
        hours: hours,
        minutes: minutes,
        unit: unit
    };
}

function getCityImage(index) {
    var suffix = !!index ? index : "";
    var cityImage = getStorageItem("cityImage" + suffix);
    if (cityImage) return cityImage;
    else return folderURL + "/images/dummy.jpg";
}


function cacheCityImage(cityInfo) {
    try {
        var lat = cityInfo.latitude,
            long = cityInfo.longitude;
        if (!!lat && !!long && !!getStorageItem(getCityImage(getKey(lat, long, "Image"))))
            return;
        $.getJSON(specificConstants.API + 'getGeoImage?city=' + cityInfo.city.split(" ").join("").toLowerCase() +
            '&country=' + cityInfo.country.split(" ").join("").toLowerCase() + '&width=100&height=100',
            function (json) {
                setStorageItem(getKey(lat, long, "Image"), json.img);
            });
    } catch (err) {
        //console.log(err);
    }
}


function getKey(lat, long, suffix) {
    suffix = suffix || "";
    return lat + "," + long + suffix;
}

var temperatureMainData = {},
    index = 0;

function getAutocompleteDisplay(cityData) {
    return (
        titleCase(cityData.city) +
        ', ' +
        cityData.state +
        ', ' +
        formatCountryName(cityData.country)
    );
}

function excludeCities(res) {
    var orignalArray = res;
    var excludeCity = [];
    var card = $('.card-info-top .city-name');
    var city1 = card[0].textContent + ',';
    var city2 = card.length > 1 ? card[1].textContent + ',' : null;
    for (var i = 0; i < orignalArray.length; i++) {
        if (!orignalArray[i].includes(city1) && !orignalArray[i].includes(city2)) {
            excludeCity.push(orignalArray[i]);
        } else {
        }
    }
    return excludeCity;
}

function onLoadInit(){
    var cache = {};
    var mapping = {};
    $('#search-text-cities').autocomplete({
        autofocus: false,
        delay: 150,
        appendTo: $('#searchform-cities'),
        source: function (request, response) {
            var term = request.term.toLowerCase().split(',')[0];
            if (term in cache) {
                response(excludeCities(cache[term]));
                return;
            }
            response(['Fetching Cities . . .'],$('.ui-menu').addClass('disable-click'));
            $.getJSON(
                specificConstants.API + 'searchCity',
                {
                    city: term
                },
                function (data, status, xhr) {
                    var zips = {};
                    var res = [];
                    for (var i = 0; i < Math.min(data.length, 30); i++) {
                        var cityData = data[i];
                        zips[cityData.city] = zips[cityData.city] + 1 || 0;
                        var cityName = isNaN(term)
                            ? getAutocompleteDisplay(cityData)
                            : titleCase(cityData.city) +
                            ', ' +
                            titleCase(cityData.state) +
                            ', ' +
                            titleCase(formatCountryName(cityData.country));
                        res.push(cityName);

                        mapping[cityName] = {
                            longitude: cityData.longitude,
                            latitude: cityData.latitude,
                            city: {
                                cityName: titleCase(cityData.city),
                                countryName: formatCountryName(cityData.country),
                                countryCode: cityData.countryCode
                            }
                        };
                    }
                    cache[term] = res;
                    $('.ui-menu').removeClass('disable-click')
                    response(excludeCities(res));
                }
            );
        },
        select: function (event, ui) {
            var cityName = ui.item.value;
            $('#search-text-cities').val(ui.item.value);

            if (mapping[cityName]) {
                var lat = mapping[cityName].latitude,
                    long = mapping[cityName].longitude;
                setStorageItem('index' + index, [lat, long]);
                setStorageItem(getKey(lat, long, 'CityInfo'), {
                    latitude: mapping[cityName]['latitude'],
                    longitude: mapping[cityName]['longitude'],
                    city: mapping[cityName]['city']['cityName'],
                    country: mapping[cityName]['city']['countryName']
                });
                //cacheCityImage(mapping[cityName]);
                showCard(index);
                showCardDiv();
                $('#card-info > ul').addClass('blur');
                $('.add-city1 a').addClass('blur');
                $('.add-city2 a').addClass('blur');
                $('.add-city-block').addClass('blur');
                $('.close-card1').addClass('blur');
                $('.close-card2').addClass('blur');
                $('.switch').addClass('blur');
            }
        },
        change: function (event, ui) {
            if (ui.item == null || ui.item == undefined) {
                $('#search-text-cities').val('');
            }
        },
        open: function( event, ui ) {
            $('#search-text-cities').addClass('search-text-city-add');
        },
        close: function( event, ui ) {
            $('#search-text-cities').removeClass('search-text-city-add');
        }
    });
}


$('#submit-btn-cities').click(function () {
    if ($('#search-text-cities').val() === '') {
        return false;
    }
});

$('#submit-btn-cities').on('click', function () {
    event.preventDefault();
    document.getElementById('search-text-cities').value = '';
});

function showCard(index) {
    return new Promise(function (resolve, reject) {
        var locationPromise;
        if (index === 0 && !getStorageItem('index' + index)) {
            locationPromise = getFallbackLocation();
        } else if (
            !!getStorageItem('index' + index) &&
            getStorageItem('index' + index).length === 2
        ) {
            var latlong = getStorageItem('index' + index);
            locationPromise = Promise.resolve({
                latitude: latlong[0],
                longitude: latlong[1]
            });
        } else {
            locationPromise = Promise.reject();
        }
        locationPromise.then(function (data) {
            var lat = data.latitude,
                long = data.longitude;
            if (!!lat && !!long) {
                var cityPromise;
                if (!!getStorageItem(getKey(lat, long, 'CityInfo')))
                    cityPromise = Promise.resolve(
                        getStorageItem(getKey(lat, long, 'CityInfo'))
                    );
                else if (data.city && data.state) {
                    cityPromise = Promise.resolve(data);
                } else
                    cityPromise = new Promise(function (cityResolve, cityReject) {
                        $.getJSON(
                            specificConstants.API +
                            'getReverseGeocoding?latitude=' +
                            lat +
                            '&longitude=' +
                            long,
                            function (data) {
                                var city = (!!data && !!data.location
                                        ? data.location
                                        : ','
                                ).split(',');
                                var cityInfo = {
                                    latitude: lat,
                                    longitude: long,
                                    city: city[0],
                                    country: city[1]
                                };
                                setStorageItem(getKey(lat, long, 'CityInfo'), cityInfo);
                                cityResolve(cityInfo);
                            }
                        );
                    });
                cityPromise.then(function (cityInfo) {
                    //cacheCityImage(cityInfo);
                    $.getJSON(
                        specificConstants.API +
                        'temperatureData?latitude=' +
                        cityInfo.latitude +
                        '&longitude=' +
                        cityInfo.longitude,
                        function (data) {
                            var cardHtml = getCardHtml(data, cityInfo, index);
                            if (index === 1) {
                                setStorageItem('nextCard', true);
                                $('#card-info').addClass('close-active');
                            }
                            manipulateCard(cardHtml, index);
                            renderContent(data, cityInfo,index);
                            changePointerPoint();
                            resolve();
                        }
                    );
                });
            }
        });
    });
}

function changePointerPoint() {
    val = new Date().getMinutes() == 0 ? 4 : 8;
    $('.card-info li .range-wrap .range-box .pointer').css('left', val + '%');
    $('.card-info li:nth-child(2) .range-wrap .range-box .pointer').css(
        'left',
        val + '%'
    );
}

function getTemperature(val) {
    var result = {
        value: '',
        unit: '',
    };
    if (getStorageItem('tempUnitPref') == 'c') {
        result.value = val;
        result.unit = 'c';
    } else {
        result.value = convertCelsiusToFarenheit(val);
        result.unit = 'f';
    }
    return result;
}

function manipulateCard(cardHtml, index) {
    index = index || 0;
    var cardHolder = $('#card-info > ul');
    var cardGroup = $('#card-info ul li.needed');
    if(index == 1){
        $(cardGroup.get(index)).html($(cardHtml).html());

        $('.add-city-hide .add-city-block').addClass('hide-option');
        $('.add-city-block1').removeClass('cursor-dis');
        $('.add-city-block2').removeClass('cursor-dis');
        $('.card-info li:eq(0)').addClass('border-change');
        $('.card-info li:eq(1)').removeClass('border-change');
        $('.add-city2 a').removeClass('highlight2');
        $('.add-city1 a').removeClass('highlight');
        $('.add-city2 a').addClass('active-tab')
        $('.weather-popup-inner').addClass('show');
        $('.close-card1').addClass('include');
        $('.close-card2').removeClass('include');
        storageReplacer.setLocalStorageItem("state","Changed")
    }
    if (cardGroup.length !== 2 && index !== 1) {
        cardHolder.html('');
    }

    if (cardGroup.length === 2) {
        $(cardGroup.get(index)).html($(cardHtml).html());
        activeState();
        $('.add-city-block1').removeClass('remove-card1');
        $('.add-city-block2').removeClass('remove-card2');
        $('.close-card1').removeClass('hide');
        $('.close-card2').removeClass('hide');
        $('.weather-popup.active').removeClass('edit-city-block');

    } else {
        cardHolder.append(cardHtml);
        if(index==0 && cardGroup.length==1){
            let check = storageReplacer.getLocalStorageItem("state");
            if(check){
                $('.card-info li').addClass('border-change');
            }
        }
        if(index==0 && cardGroup.length==0){
            let check = storageReplacer.getLocalStorageItem("state");
            if(check == "Closed1" || check == "Closed2"){
                $('.card-info li').addClass('border-change');
            }
        }
        if (index === 1) {
            activeState();
            cardHolder.addClass('item2');
            $('.add-city-hide .add-city-block1').addClass('new-city');
            $('.add-city-hide .add-city-block2').addClass('new-city');
            $('.add-city-block1').removeClass('remove-card1');
            $('.add-city-block2').removeClass('remove-card2');
            $('.close-card1').removeClass('hide');
            $('.close-card2').removeClass('hide');
            $('.weather-popup.active').removeClass('edit-city-block');
            $('.weather-popup').addClass('item2');
        }
    }
    cardHolder.removeClass('blur');
    $('#card-info > ul').removeClass('blur');
    $('.add-city1 a').removeClass('blur');
    $('.add-city2 a').removeClass('blur');
    $('.add-city-block').removeClass('blur');
    $('.switch').removeClass('blur');
    $('.close-card1').removeClass('blur');
    $('.close-card2').removeClass('blur');
}

function convertToDesiredFormat(tempData) {
    function getHourlyData(tempData) {
        var currentHourSeconds =
            Math.round(getCurrentHourDate().getTime() / 1000) - 3600;
        var hourlyData = [];
        tempData.hourly.data.forEach(function (a) {
            if (a.time >= currentHourSeconds) {
                hourlyData.push(Object.assign({}, a));
            }
        });
        return hourlyData;
    }


    function getDailyData(tempData) {
        var currentDate = getCurrentHourDate();
        currentDate.setHours(0);
        var currentDateInSeconds = Math.round(currentDate.getTime() / 1000);
        var dailyData = [];
        tempData.daily.data.forEach(function (a) {
            if (a.time >= currentDateInSeconds) {
                dailyData.push(a);
            }
        });
        return dailyData;
    }

    tempData.daily.data = getDailyData(tempData);
    tempData.hourly.data = getHourlyData(tempData);
    return tempData;
}

function getCardHtml(temperatureData, cityInfo, identifier) {
    temperatureData = convertToDesiredFormat(temperatureData);
    if (temperatureData && temperatureData.currently)
        return showCurrentConditionData(temperatureData, cityInfo, identifier);
    return null;
}

function convertMpsToMph(value) {
    var wind__Speed = value * 2.237;
    return Math.round(wind__Speed * 10) / 10;
}

function renderContent(mainData,cityInfo,identifier){
    let check = storageReplacer.getLocalStorageItem("state");

    if((identifier == 0) && (check == "Closed1")){
        $('.currentlocation1').html(escapeHtml(cityInfo.city));
        $('.needed').addClass('border-change');
        $('.add-city-block2').removeClass('hide2');
        $('.add-city-block1').addClass('hide1');
        $('.add-city2 a').addClass('active-tab');
        $('.add-city-block2').addClass('add-sp');
        $('.close-card2').removeClass('include');
        $('.add-city-block2').addClass('cursor-dis');
        $('.replacement-linkout').hide();
        $('.widget-blck,.weather-pill-wrap').show();
        //getCurrentLocation(identifier);
        newCard(mainData,identifier);
    }
    else if((identifier == 0) && (check == "Closed2")){
        $('.currentlocation-city').html(escapeHtml(cityInfo.city));
        $('.needed').addClass('border-change');
        $('.close-card1').removeClass('include');
        $('.add-city-block1').removeClass('hide1');
        $('.add-city-block2').addClass('hide2');
        $('.add-city1 a').addClass('active-tab');
        $('.add-city-block1').addClass('add-sp');
        $('.replacement-linkout').hide();
        $('.widget-blck,.weather-pill-wrap').show();
        $('.add-city-block1').addClass('cursor-dis');
        //getCurrentLocation(identifier);
        newCard(mainData,identifier);
    }
    else if((identifier == 0) && (check=="Changed")){
        $('.add-city-block1').removeClass('cursor-dis');
        $('.add-city-block2').removeClass('cursor-dis');
        $('.replacement-linkout').hide();
        $('.widget-blck,.weather-pill-wrap').show();
        $('.currentlocation-city').html(escapeHtml(cityInfo.city));
        newCard(mainData,identifier);
    }
    else if(identifier == 0){
        $('.replacement-linkout').hide();
        $('.widget-blck,.weather-pill-wrap').show();
        $('.currentlocation-city').html(escapeHtml(cityInfo.city));
        //getCurrentLocation(identifier);
        newCard(mainData,identifier);
    }
    else{
        $('.replacement-linkout').hide();
        $('.widget-blck,.weather-pill-wrap').show();
        newCard(mainData,identifier);
        $('.currentlocation1').html(escapeHtml(cityInfo.city));

    }
}


function showCurrentConditionData(mainData, cityInfo, identifier) {


    if (!mainData.currently.temperature) mainData.currently.temperature = '';
    mainData.currently.precipType = identifyPrecipType(mainData.currently).label;
    if (!mainData.daily.data) mainData.daily.data = '';

    var tempnumber = mainData.currently.temperature;
    if (tempnumber && tempnumber != '') {
        tempnumber = Math.round(mainData.currently.temperature);
    } else {
        tempnumber = 0;
    }
    //var highLowTemperatureData = getLowHighTemperature(mainData.daily.data ,mainData.timezone);
    var str = '';

    str =`<li class='needed'>
    <div class="weather-box box-number-id`+ identifier + `">
            <div class="wb-input-wrap wb-input-id` +
        identifier +
        `">
                <span class="wb-input-icon">
                    <svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.2041 6.64189C14.2041 8.21259 13.6483 9.65598 12.7192 10.793H12.7231C12.7231 10.793 10.3703 13.882 8.54766 16.0693C7.96612 16.7671 6.90246 16.7668 6.32134 16.0687C4.50442 13.8863 2.15461 10.7997 2.15461 10.7997L2.14914 10.793C1.22004 9.65598 0.664307 8.21259 0.664307 6.64189C0.664307 2.97367 3.69528 0 7.43421 0C11.1731 0 14.2041 2.97367 14.2041 6.64189ZM9.962 6.61312C9.962 7.98278 8.83035 9.09304 7.43429 9.09304C6.03823 9.09304 4.90658 7.98278 4.90658 6.61312C4.90658 5.2435 6.03823 4.1332 7.43429 4.1332C8.83035 4.1332 9.962 5.2435 9.962 6.61312Z" fill="#738CC9"/>
                    </svg>
                </span>
                <span class="wb-input-icon-2">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.7796 16.7216L13.4522 12.3943C14.5249 11.0865 15.1714 9.41143 15.1714 7.58571C15.1714 3.39796 11.7735 0 7.58571 0C3.39429 0 0 3.39796 0 7.58571C0 11.7735 3.39429 15.1714 7.58571 15.1714C9.41143 15.1714 11.0829 14.5286 12.3906 13.4559L16.718 17.7796C17.0118 18.0735 17.4857 18.0735 17.7796 17.7796C18.0735 17.4894 18.0735 17.0118 17.7796 16.7216ZM7.58571 13.6616C4.23184 13.6616 1.50612 10.9359 1.50612 7.58571C1.50612 4.23551 4.23184 1.50612 7.58571 1.50612C10.9359 1.50612 13.6653 4.23551 13.6653 7.58571C13.6653 10.9359 10.9359 13.6616 7.58571 13.6616Z" fill="#2B8EC6"/>
                    </svg>
                </span>
                <div class='blank-layout blank-lay` +
        identifier +
        `'></div>
                <input type="text" class="wb-input wb-add wb-ind-input` +
        identifier +
        `" placeholder="` +
        escapeHtml(titleCase(cityInfo.city)) +
        `">
                 <div class="card-info-top city-details-wrap">
                <p class="city-name" title="` +
        escapeHtml(titleCase(cityInfo.city)) +
        `">` +
        escapeHtml(titleCase(cityInfo.city)) +
        `</p> </div>
            </div>
            <div class="wb-main-part">
                <div class="wb-main-pleft">
                    <p class="wb-pleft-heading">TODAY</p>
                    <div class="wb-pleft-details temp-label">
                        <div class="wb-pleft-icon temp-icon ` +
        escapeHtml(mainData.currently.icon) +
        `"></div>
                        <div class="wb-pleft-temp"  ><span class=" temp-value"  data-tempval="` +
        escapeHtml(tempnumber) +
        `">` +
        escapeHtml(getTemperature(tempnumber).value) +
        `</span><span class="wp-temp-deg">o</span></div>
          
                    </div>
                </div>
                <div class="wb-main-pright">
                    <div class="wb-pright-max">
                        <span class="wb-pright-icon">
                            <svg width="7" height="14" viewBox="0 0 7 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.5 0.5L0.613249 5.5L6.38675 5.5L3.5 0.5ZM3 5L3 14L4 14L4 5L3 5Z" fill="#738CC9"/>
                            </svg>  
                        
                        
                        </span>
                        <p class="wb-pright-detail">
                            <span class="wb-pright-txt">Max</span>
                        </p>
                        <p class="wb-pright-temp " >
                        <span class=" temp-value"  data-tempval="` +
        escapeHtml(mainData.daily.data[0].temperatureHigh.toFixed(0)) +
        `">` +
        escapeHtml(getTemperature(mainData.daily.data[0].temperatureHigh.toFixed(0)).value) +
        `</span><span class="wp-rtemp-deg">o</span></p>
                    </div>
                        <div class="wb-pright-min">
                             <span class="wb-pright-icon">
                             <svg width="7" height="14" viewBox="0 0 7 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path d="M3.5 14L6.38675 9H0.613249L3.5 14ZM4 9.5L4 0.5L3 0.5L3 9.5H4Z" fill="#738CC9"/>
                             </svg>                     
                            </span>
                            <p class="wb-pright-detail"> 
                            <span class="wb-pright-txt">Min</span>
                        </p>
                        <p class="wb-pright-temp " ><span class=" temp-value"  data-tempval="` +
        escapeHtml(mainData.daily.data[0].temperatureLow.toFixed(0)) +
        `">` +
        escapeHtml(getTemperature(mainData.daily.data[0].temperatureLow.toFixed(0)).value) +
        `</span><span class="wp-rtemp-deg">o</span></p>
                        </div>
                </div>
            </div>
            <p class="wb-divider1"></p>
            <div class="wb-info-part">
                <div class="wb-ip-detail wb-ip-detail1 wind-direction ">
                    <div class="wb-ip-icon">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_12_615)">
                            <path d="M0.851201 6.58025H9.42381C10.6667 6.58025 11.6778 5.56911 11.6778 4.32629C11.6778 3.08529 10.6696 2.07531 9.4292 2.07237C9.30701 2.07052 8.51357 2.0815 7.9211 2.65917C7.52416 3.04617 7.32295 3.57794 7.32295 4.23962C7.32295 4.5318 7.55977 4.76864 7.85197 4.76864C8.14414 4.76864 8.38095 4.53178 8.38095 4.23962C8.38095 3.87723 8.47304 3.60205 8.65457 3.4218C8.9375 3.14082 9.37761 3.1307 9.41281 3.13035C9.41775 3.1305 9.41712 3.13043 9.42379 3.13043C10.0832 3.13043 10.6197 3.6669 10.6197 4.32629C10.6197 4.98572 10.0833 5.52219 9.42379 5.52219H0.851201C0.559025 5.52219 0.322182 5.75905 0.322182 6.05121C0.322182 6.34339 0.559025 6.58025 0.851201 6.58025Z" fill="#738DC9"/>
                            <path d="M0.851213 4.50799H4.93735C6.18015 4.50799 7.19127 3.49686 7.19127 2.25403C7.19127 1.01295 6.18313 0.00293468 4.9427 0.00011115C4.81906 -0.00161434 4.02688 0.00940529 3.43457 0.586915C3.03766 0.973954 2.83641 1.50572 2.83641 2.16741C2.83641 2.45958 3.07323 2.69646 3.36543 2.69646C3.65762 2.69646 3.89441 2.4596 3.89441 2.16741C3.89441 1.80501 3.98651 1.52984 4.16804 1.34958C4.45092 1.06864 4.89104 1.05844 4.92635 1.05809C4.93129 1.05825 4.93062 1.05817 4.93733 1.05817C5.59672 1.05817 6.13323 1.59464 6.13323 2.25403C6.13323 2.91346 5.59676 3.44993 4.93733 3.44993H0.851213C0.559036 3.44993 0.322193 3.6868 0.322193 3.97899C0.322193 4.27119 0.559036 4.50799 0.851213 4.50799Z" fill="#738DC9"/>
                            <path d="M9.42381 7.49202H0.851201C0.559025 7.49202 0.322182 7.72888 0.322182 8.02104C0.322182 8.31318 0.559005 8.55006 0.851201 8.55006H9.42381C10.0832 8.55006 10.6198 9.08653 10.6198 9.74592C10.6198 10.4054 10.0833 10.9418 9.42381 10.9418C9.41716 10.9418 9.41777 10.9417 9.41283 10.9419C9.37759 10.9415 8.93748 10.9314 8.65459 10.6505C8.47306 10.4702 8.38097 10.195 8.38097 9.83259C8.38097 9.54041 8.14416 9.30353 7.85198 9.30353C7.55981 9.30353 7.32297 9.54039 7.32297 9.83259C7.32297 10.4943 7.52418 11.0261 7.92112 11.4131C8.48973 11.9675 9.24283 12 9.4112 12C9.41828 12 9.42428 12 9.42922 11.9999C10.6696 11.9969 11.6778 10.987 11.6778 9.74596C11.6778 8.50312 10.6667 7.49202 9.42381 7.49202Z" fill="#738DC9"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_12_615">
                            <rect width="12" height="12" fill="white"/>
                            </clipPath>
                            </defs>
                        </svg>
                    
                    </div>
                    <div class="wb-ip-body">
                        <p class="wb-ip-heading">Wind Direction</p>
                        <p class="wb-ip-subheading">` +
        escapeHtml(convertMpsToMph(mainData.currently.windSpeed)) +
        ` mph</p>
                    </div>
                </div>
                <div class="wb-ip-detail wb-ip-detail2 precipitation">
                    <div class="wb-ip-icon">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.31416 3.94843C4.31416 3.80369 4.31416 3.36318 3.55956 2.17222C3.20516 1.61284 2.85609 1.15722 2.8414 1.13809L2.5626 0.77504L2.2838 1.13809C2.26911 1.15722 1.92007 1.61286 1.56564 2.17222C0.811066 3.36318 0.811066 3.80369 0.811066 3.94843C0.811066 4.91424 1.59679 5.69997 2.5626 5.69997C3.52841 5.69997 4.31416 4.91424 4.31416 3.94843Z" fill="#738CC9"/>
                            <path d="M10.6252 1.12229C10.3652 0.711831 10.1087 0.377114 10.0979 0.363052L9.81915 0L9.54035 0.363052C9.52957 0.377114 9.27313 0.711831 9.01305 1.12229C8.77105 1.50424 8.44934 2.05902 8.44934 2.4655C8.44934 3.22083 9.06384 3.83531 9.81915 3.83531C10.5745 3.83531 11.189 3.22081 11.189 2.4655C11.189 2.059 10.8672 1.50424 10.6252 1.12229Z" fill="#738CC9"/>
                            <path d="M6.84017 3.54971L6.56137 3.18666L6.28257 3.54971C6.25398 3.58695 5.5744 4.47404 4.88331 5.56479C3.93065 7.06837 3.4476 8.18586 3.4476 8.88621C3.4476 10.6032 4.84445 12 6.5614 12C8.27834 12 9.67517 10.6032 9.67517 8.88621C9.67517 8.18586 9.19212 7.06837 8.23946 5.56479C7.54835 4.47404 6.86879 3.58695 6.84017 3.54971Z" fill="#738CC9"/>
                        </svg>
                        
                    </div>
                    <div class="wb-ip-body">
                        <p class="wb-ip-heading">Precipitation</p>
                        <p class="wb-ip-subheading">` +
        escapeHtml(mainData.currently.precipIntensity.toFixed(2)) +
        ` mm/hr</p>
                    </div>
                </div>
                <div class="wb-ip-detail wb-ip-detail3 cloud-cover">
                    <div class="wb-ip-icon">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.5523 5.48689C10.5571 5.41824 10.56 5.34961 10.56 5.28C10.56 3.4272 9.05231 1.92 7.2 1.92C5.86273 1.92 4.65839 2.71727 4.12608 3.92881C3.95423 3.86977 3.77808 3.84 3.6 3.84C2.74223 3.84 2.03231 4.48608 1.93392 5.33616C0.818391 5.55554 0 6.52944 0 7.68001C0 9.00336 1.07665 10.08 2.4 10.08H9.6C10.9229 10.08 12 9.00336 12 7.68001C12 6.72385 11.4254 5.86465 10.5523 5.48689Z" fill="#738CC9"/>
                        </svg>
                    
                    </div>
                    <div class="wb-ip-body">
                        <p class="wb-ip-heading">Cloud Cover</p>
                        <p class="wb-ip-subheading">
                        ` +
      escapeHtml(Math.round(mainData.currently.cloudCover * 100)) +
        `%</p>
                    </div>
                </div>
            </div>
            <div class="wb-info-part">
                <div class="wb-ip-detail wb-ip-detail1 humidity ">
                    <div class="wb-ip-icon">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_12_633)">
                            <path d="M6.19451 0.09325C6.12801 0.0105001 6.01626 -0.0212498 5.91676 0.0145001C5.83726 0.0425001 5.77851 0.10825 5.75801 0.18725C5.70626 0.28525 5.45176 0.631749 5.18276 0.997999C3.94226 2.68725 1.633 5.83174 1.633 7.63249C1.633 10.0407 3.59201 12 5.99976 12C8.40801 12 10.367 10.0407 10.367 7.63249C10.367 5.29749 6.36501 0.3045 6.19451 0.09325Z" fill="#738CC9"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_12_633">
                            <rect width="12" height="12" fill="white"/>
                            </clipPath>
                            </defs>
                        </svg>
                    
                    </div>
                    <div class="wb-ip-body">
                        <p class="wb-ip-heading">Humidity</p>
                        <p class="wb-ip-subheading">` +
        escapeHtml(Math.round(mainData.currently.humidity * 100)) +
        `%</p>
                    </div>
                </div>
                <div class="wb-ip-detail wb-ip-detail2 dew-point">
                    <div class="wb-ip-icon">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.33332 7.89121V2.33332C9.33332 1.04467 8.28866 0 7 0C5.71134 0 4.66668 1.04467 4.66668 2.33332V7.89119C3.95063 8.53207 3.5 9.46343 3.5 10.5C3.5 12.433 5.06702 14 7 14C8.93298 14 10.5 12.433 10.5 10.5C10.5 9.46343 10.0494 8.53207 9.33332 7.89121ZM7 12.8333C5.71134 12.8333 4.66668 11.7887 4.66668 10.5C4.66668 9.82633 4.95217 9.20139 5.44474 8.76053L5.83335 8.41271V2.33332C5.83335 1.689 6.3557 1.16665 7.00003 1.16665C7.64436 1.16665 8.1667 1.68897 8.1667 2.33332V8.41271L8.55531 8.76053C9.04788 9.20139 9.33338 9.8263 9.33338 10.5C9.33332 11.7887 8.28866 12.8333 7 12.8333Z" fill="#738CC9"/>
                        <path d="M7.58335 4.66668H6.41667V11.6667H7.58335V4.66668Z" fill="#738CC9"/>
                        <path d="M7 12.25C7.9665 12.25 8.75 11.4665 8.75 10.5C8.75 9.5335 7.9665 8.75 7 8.75C6.0335 8.75 5.25 9.5335 5.25 10.5C5.25 11.4665 6.0335 12.25 7 12.25Z" fill="#738CC9"/>
                    </svg>
                    
                    </div>
                    <div class="wb-ip-body">
                        <p class="wb-ip-heading">Dew Point</p>
                        <p class="wb-ip-subheading">` +
        escapeHtml(getTemperature(mainData.currently.dewPoint.toFixed(0)).value) +
        ` &#176;F</p>
                    </div>
                </div>
                <div class="wb-ip-detail wb-ip-detail3 visibility">
                    <div class="wb-ip-icon">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_12_648)">
                        <path d="M6 2.42345C3.70727 2.42345 1.62811 3.67782 0.0938938 5.71525C-0.0312979 5.88217 -0.0312979 6.11537 0.0938938 6.2823C1.62811 8.32218 3.70727 9.57655 6 9.57655C8.29273 9.57655 10.3719 8.32218 11.9061 6.28475C12.0313 6.11783 12.0313 5.88463 11.9061 5.71771C10.3719 3.67782 8.29273 2.42345 6 2.42345ZM6.16447 8.51856C4.64253 8.6143 3.3857 7.35992 3.48144 5.83553C3.55999 4.57871 4.57871 3.55999 5.83553 3.48144C7.35747 3.3857 8.6143 4.64007 8.51856 6.16447C8.43756 7.41884 7.41884 8.43755 6.16447 8.51856ZM6.08837 7.35502C5.26849 7.40656 4.59098 6.73151 4.64498 5.91163C4.68671 5.23412 5.23658 4.68672 5.91408 4.64253C6.73397 4.59098 7.41148 5.26603 7.35747 6.08592C7.31329 6.76588 6.76342 7.31328 6.08837 7.35502Z" fill="#738CC9"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_12_648">
                        <rect width="12" height="12" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>
                    
                    </div>
                    <div class="wb-ip-body">
                        <p class="wb-ip-heading">Visibility</p>
                        <p class="wb-ip-subheading">` +
        escapeHtml((mainData.currently.visibility / 1.6).toFixed(0)) +
        ` mi</p>
                    </div>
                </div>
            </div>
            <p class="wb-divider2"></p>
            <div class="forecast-wrap">
                <div class="bottom-data">
                    <h2 class="forecast-title">
                        7 Day Forecast
                    </h2>
                        <div class="forecast-data">
                            <div class="day-data-wrap">
                                <div class="day-data-innr-wrap" id="daily-data">

                                </div>
                            </div>
                        </div>
                 </div>
                  
              
            </div>
        </div>
    </li>
            `;

    return str;

}

function getDailyTemp(mainData,identifier) {
    var tempType = (getStorageItem('tempUnitPref') || 'f').toUpperCase();
    var limit = mainData.length < 8 ? mainData.length : 7;
    var str = '';
    for (var i = 0; i < limit; i++) {
        var dayName = updateTime(mainData[i].time);
        str +=
            "<div class='day-rslt-box'><div class='rslt-box-innr-wrap'><p class='day'>" +
            escapeHtml(dayName) +
            '</p>' +
            "<div class='" +
            escapeHtml(mainData[i].icon) +
            " temp-icon weather-icon temperature-icon'></div>" +
            "<p class='day-w-rslt'><span class='day-temp'><span class='data degree1 temp-value' data-tempval='" +
            escapeHtml(mainData[i].temperatureHigh.toFixed(0)) +
            "'>" +
            escapeHtml(getTemperature(mainData[i].temperatureHigh.toFixed(0)).value) +
			'</span>&#176;</span></p>' +
			"<p class='day-w-rslt'><span class='day-temp'><span class='data degree1 temp-value' data-tempval='" +
            escapeHtml(mainData[i].temperatureLow.toFixed(0)) +
			"'>" +
            getTemperature(mainData[i].temperatureLow.toFixed(0)).value +
            '</span>&#176;</span></p>' +
            '</div></div>';
    }
    if(identifier==0){
        $('.box-number-id0 .day-data-innr-wrap').html('');
        $('.box-number-id0 .day-data-innr-wrap').append(str);
    }
    else{
        $('.box-number-id1 .day-data-innr-wrap').html('');
        $('.box-number-id1 .day-data-innr-wrap').append(str);

    }
}

function updateTime(dTime) {
    var currentTime = new Date(dTime * 1000);
    var currday = new Date();
    var days = [
        'SUN',
        'MON',
        'TUE',
        'WED',
        'THU',
        'FRI',
        'SAT'
    ];
    var dayName = days[currentTime.getDay()];
    return dayName;
}



function getLowHighTemperature(mainData, timezone) {
    var currDate = new Date().getDate(),
        tempData = {},
        highTemp,
        lowTemp;
    for (var i = 0; i < mainData.length; i++) {
        let custTime = new Date(mainData[i].time * 1000);
        let dateObj=new Date(custTime.toLocaleString('en-US', { timeZone: timezone }));
        if (dateObj.getDate() == currDate) {
            highTemp = mainData[i].temperatureHigh;
            lowTemp = mainData[i].temperatureLow;
        }
        else{
            highTemp = mainData[i].temperatureHigh;
            lowTemp = mainData[i].temperatureLow;
        }
    }
    tempData = {
        highTemp: highTemp.toFixed(0),
        lowTemp: lowTemp.toFixed(0)
    };
    return tempData;
}

function identifyPrecipType(a) {
    var timestamp = new Date(a.time * 1000);
    var result = 0;
    var summary;
    if (a.summary) {
        summary = a.summary.toLowerCase();
    } else {
        summary = '';
    }

    if (summary.indexOf('light rain') > -1) {
        result = 2;
    } else if (summary.indexOf('rain') > -1) {
        result = 3;
    } else if (
        summary.indexOf('overcast') > -1 ||
        summary.indexOf('cloud') > -1
    ) {
        result = 1;
    }
    return {
        timestamp: timestamp.getDay() + ':' + timestamp.getHours(),
        value: result,
        label: titleCase(typeString(result))
    };
}

function getTemperature(val) {
    var result = {
        value: '',
        unit: ''
    };
    if (getStorageItem('tempUnitPref') == 'c') {
        result.value = Math.round(val);
        result.unit = 'c';
    } else {
        result.value = convertCelsiusToFarenheit(val);
        result.unit = 'f';
    }
    return result;
}

function getTemperatureDetails(mainData,identifier) {
    getDailyTemp(mainData.daily.data,identifier);
}

function newCard(mainData,identifier){
    getTemperatureDetails(mainData,identifier);
}


function convertCelsiusToFarenheit(value) {
    return Math.round((9 / 5) * value + 32);
}

function setMenuUserPref() {
    var tempId = getStorageItem('tempUnitPref') || 'f';
    $('label[for="' + tempId + '"]')
        .addClass('active')
        .siblings('.switch-label')
        .removeClass('active');
}

function showCardDiv() {
    setTimeout(function () {
        $('.search-text-cities').val('');
        hideCitySearch();
    }, 100);
}

function openWidget(openFor) {
    $('.weather-popup')
        .attr('data-val', openFor)
        .toggleClass('active');
    $('.link-out.weather-wid')
        .attr('data-for', openFor)
        .toggleClass('active');
}

function showCitySearch() {
    $('.weather-inner-top, .weather-inner-bottom').addClass('vishid');
    $('.card-search-wrap').fadeIn();
    $('#search-text-cities').focus();
}

function hideCitySearch() {
    $('.card-search-wrap').hide();
    $('.weather-inner-top, .weather-inner-bottom').removeClass('vishid');
}

function getCurrentHourDate(date) {
    date = date || new Date();
    date.setMilliseconds(0);
    date.setSeconds(0);
    date.setMinutes(0);
    return date;
}

function typeString(x) {
    switch (x) {
        case 0:
            return 'clear';
        case 1:
            return 'cloudy';
        case 2:
            return 'drizzle';
        case 3:
            return 'rain';
    }
}


function setInitialSwitches() {
    var tempId = getStorageItem('tempUnitPref') || 'f';
    $('label[for="' + tempId + '"]')
        .addClass('active')
        .siblings('.switch-label')
        .removeClass('active');
}

$('.weather-popup').on('click', '.switch-label', function () {
    setStorageItem('tempUnitPref', $(this).attr('for'));
    $(this)
        .addClass('active')
        .siblings('.switch-label')
        .removeClass('active');
    var temperatureFeilds = $('.temp-value');
    for (var i in temperatureFeilds) {
        if (!isNaN(i))
            temperatureFeilds[i].innerText = getTemperature(
                temperatureFeilds[i].dataset.tempval
            ).value;
    }
    linkOutTemperatureUpdate();
});

function linkOutTemperatureUpdate() {
    var linktempEl = document.querySelector('.citytemf');
    var linkTemp = linkOutTemperature();
    var toConvert = getStorageItem('tempUnitPref')
        ? getStorageItem('tempUnitPref')
        : 'f';
    if (toConvert == 'f') {
        linkTemp = convertCelsiusToFarenheit(linkTemp);
    }
    linktempEl.textContent = linkTemp + '° ' + toConvert.toUpperCase();
}

function linkOutTemperature() {

    var localData = getStorageItem(localCityDetails)
        ? getStorageItem(localCityDetails)
        : {};
    var tempround = Object.keys(localData).length ? Math.round(localData.cityTemperature.currently.temperature) : 0;
    return tempround;
}

$('.add-city').on('click', function () {
    index = 1;
    $('#search-text-cities').val('');
    showCitySearch();
});
$('.weather-popup').on('click', '.change-cities', function () {
    $('#search-text-cities').val('');
    var t = $(this).closest('li');
    (index = $('#card-info ul li').index(t)), showCitySearch();
});
$('.cities-btn-wrap #cities-cancel').on('click', function () {
    hideCitySearch();
});

$('.weather-popup').on('click', '.close-card', function () {
    $('#card-info ul, .weather-popup').removeClass('item2');
    $('.add-city-hide').removeClass('hide-yes');
    if (
        $(this)
            .parent()
            .is(':first-child')
    ) {
        setStorageItem('index0', getStorageItem('index1'));
        var latlog = getStorageItem('index0');
        updateLinkoutToPrimaryLocation(latlog[0], latlog[1]);
        changeClassOfFirstCard();
    }
    $('#card-info ul li').removeClass('active');
    setStorageItem('nextCard', false);
    $(this)
    // .parent('#card-info ul li')
    // .remove();
});

function changeClassOfFirstCard() {
    $('.wb-input-id1')
        .addClass('wb-input-id0')
        .removeClass('wb-input-id1');

    $('.blank-lay1')
        .addClass('blank-lay0')
        .removeClass('blank-lay1');

    $('.wb-ind-input1')
        .addClass('wb-ind-input0')
        .removeClass('wb-ind-input1');

    $('.box-number-id1').
    addClass('box-number-id0')
    .removeClass('box-number-id1');

    $('.blank-lay0').show();
}

function updateLinkoutToPrimaryLocation(lat, long) {
    var cityInfo = {};
    cityInfo = getStorageItem(lat + ',' + long + 'CityInfo');
    if (!cityInfo) {
        $.getJSON(
            specificConstants.API +
            'getReverseGeocoding?latitude=' +
            lat +
            '&longitude=' +
            long,
            function (data) {
                // console.log(data);
                var city = data.location.split(',');
                cityInfo = {
                    latitude: latitude,
                    longitude: longitude,
                    city: city[0],
                    country: city[1]
                };
                setStorageItem(getKey(latitude, longitude, 'CityInfo'), cityInfo);
            }
        );
    }
    var cityPillText = escapeHtml(getCityDisplayText(cityInfo));
    $('.currentlocation-city').html(escapeHtml(cityInfo.city));
    $('.currentlocation').attr('title', cityPillText);
    $('.currentlocation').html(cityPillText);
    $('.wb-ind-input0').val(escapeHtml(cityInfo.city));

    var localCityObj1 = {};

    $.ajax({
        type: 'GET',
        url:
            specificConstants.API +
            'temperatureData?latitude=' +
            lat +
            '&longitude=' +
            long,
        success: function (data) {
            var tempround = Math.round(data.currently.temperature);
            $('.weatherdata .weather-icon')
                .removeClass()
                .addClass('weather-icon')
                .addClass(data.currently.icon);
            $('.citytemf').text(convertCelsiusToFarenheit(tempround) + '°; F');
            localCityObj1.cityTemperature = data;
            localCityObj1.city = cityInfo.city + ', ' + cityInfo.country;
            localCityObj1.timestamp = new Date();
            setStorageItem('localCityDetails', localCityObj1);
            document.dispatchEvent(new Event('linkOutTemperatureUpdate'));
            // functon from getWeatherData.js
            showWeatherView();
        },
        error: function (error) {
            console.log(error);
        },
    });
}

function getCityDisplayText(data) {
    var text = data.city;
    if (data.state) text += ', ' + data.state;
    else if (data.country) text += ', ' + data.country;
    return text;
}

function setDate(x) {
    var date = x.date || '.date';
    var time = x.time || '.time';

    setInterval(function () {
        document.querySelector(date).textContent = getTimeAndDate().date;
        document.querySelector(time).textContent = getTimeAndDate().time;
    }, 1000);
}

function getTimeAndDate() {
    var obj = {};
    var monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    var wekdayName = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];
    var date = new Date();
    obj.date = (
        wekdayName[date.getDay() + 0] +
        ', ' +
        monthNames[date.getMonth() + 0] +
        ' ' +
        date.getDate()
    ).toString();
    obj.time = (
        changeTimeFormatTo12Hr(date).hours +
        ':' +
        changeTimeFormatTo12Hr(date).minutes +
        ' ' +
        changeTimeFormatTo12Hr(date).unit
    ).toString();
    return obj;
}


document.addEventListener('searchTextChanged', function () {
    triggerCloseWidget();
});

function triggerCloseWidget() {
    new Widget().removeClass(
        document.querySelectorAll(
            '[n-widgetClick],[n-widgetaction], [n-widgettarget]'
        ),
        'active'
    );
}

function autoCompInput0() {
    var cache = {};
    var mapping = {};
    $('.wb-ind-input0').autocomplete({
        autofocus: false,
        delay: 150,
        appendTo: $('.wb-input-id0'),
        source: function (request, response) {
            var term = request.term.toLowerCase().split(',')[0];
            if (term in cache) {
                response(excludeCities(cache[term]));
                return;
            }
            response(['Fetching Cities . . .'],$('.ui-menu').addClass('disable-click'));
            $.getJSON(
                specificConstants.API + 'searchCity',
                {
                    city: term
                },
                function (data, status, xhr) {
                    var zips = {};
                    var res = [];
                    for (var i = 0; i < Math.min(data.length, 30); i++) {
                        var cityData = data[i];
                        zips[cityData.city] = zips[cityData.city] + 1 || 0;

                        var cityName = isNaN(term)
                            ? getAutocompleteDisplay(cityData)
                            : titleCase(cityData.city) +
                            ', ' +
                            titleCase(cityData.state) +
                            ', ' +
                            titleCase(formatCountryName(cityData.country));
                        res.push(cityName);

                        mapping[cityName] = {
                            longitude: cityData.longitude,
                            latitude: cityData.latitude,
                            city: {
                                cityName: titleCase(cityData.city),
                                countryName: formatCountryName(cityData.country),
                                countryCode: cityData.countryCode
                            }
                        };
                    }
                    cache[term] = res;
                    $('.ui-menu').removeClass('disable-click');
                    response(excludeCities(res));
                }
            );
        },
        select: function (event, ui) {
            var cityName = ui.item.value;
            $('.wb-ind-input0').val(ui.item.value);
            index = 0;
            if (mapping[cityName]) {
                var lat = mapping[cityName].latitude,
                    long = mapping[cityName].longitude;
                setStorageItem('index' + index, [lat, long]);
                setStorageItem(getKey(lat, long, 'CityInfo'), {
                    latitude: mapping[cityName]['latitude'],
                    longitude: mapping[cityName]['longitude'],
                    city: mapping[cityName]['city']['cityName'],
                    country: mapping[cityName]['city']['countryName']
                });
                //cacheCityImage(mapping[cityName]);
                showCard(index);
                showCardDiv();

                $('.close-card1').addClass('blur');
                $('.close-card2').addClass('blur');
                $('#card-info > ul').addClass('blur');
                $('.add-city1 a').addClass('blur');
                $('.add-city2 a').addClass('blur');
                $('.add-city-block').addClass('blur');
                $('.switch').addClass('blur');
                updateLinkoutToPrimaryLocation(lat, long);

            }
        },
        change: function (event, ui) {
            if (ui.item == null || ui.item == undefined) {
                $('.wb-ind-input0').val('');
            }
        },
        open: function( event, ui ) {
            $('.wb-input.wb-ind-input0').addClass('search-text-city-add1');

        },
        close: function( event, ui ) {
            $('.wb-input.wb-ind-input0').removeClass('search-text-city-add1');
            $('.wb-input-id0 > ul li').remove();
        }
    });
}

function autoCompInput1() {
    // var check = $(".wb-ind-input1").data('ui-autocomplete') != undefined ? $(".wb-ind-input1").autocomplete("destroy") : "";
    // $(".wb-ind-input1" ).autocomplete( "destroy" );
    index = 1;
    var cache = {};
    var mapping = {};
    $('.wb-ind-input1').autocomplete({
        autofocus: false,
        delay: 150,
        appendTo: $('.wb-input-id1'),
        source: function (request, response) {
            var term = request.term.toLowerCase().split(',')[0];
            if (term in cache) {
                response(excludeCities(cache[term]));
                return;
            }
            response(['Fetching Cities . . .'],$('.ui-menu').addClass('disable-click'));
            $.getJSON(
                specificConstants.API + 'searchCity',
                {
                    city: term
                },
                function (data, status, xhr) {
                    var zips = {};
                    var res = [];
                    for (var i = 0; i < Math.min(data.length, 30); i++) {
                        var cityData = data[i];
                        zips[cityData.city] = zips[cityData.city] + 1 || 0;
                        var cityName = isNaN(term)
                            ? getAutocompleteDisplay(cityData)
                            : titleCase(cityData.city) +
                            ', ' +
                            titleCase(cityData.state) +
                            ', ' +
                            titleCase(formatCountryName(cityData.country));
                        res.push(cityName);

                        mapping[cityName] = {
                            longitude: cityData.longitude,
                            latitude: cityData.latitude,
                            city: {
                                cityName: titleCase(cityData.city),
                                countryName: formatCountryName(cityData.country),
                                countryCode: cityData.countryCode
                            }
                        };
                    }
                    cache[term] = res;
                    $('.ui-menu').removeClass('disable-click');
                    response(excludeCities(res));
                }
            );
        },
        select: function (event, ui) {
            index = 1;
            var cityName = ui.item.value;
            $('.wb-ind-input1').val(ui.item.value);

            index = noOfCard() - 1;
            if (mapping[cityName]) {
                var lat = mapping[cityName].latitude,
                    long = mapping[cityName].longitude;
                setStorageItem('index' + index, [lat, long]);
                setStorageItem(getKey(lat, long, 'CityInfo'), {
                    latitude: mapping[cityName]['latitude'],
                    longitude: mapping[cityName]['longitude'],
                    city: mapping[cityName]['city']['cityName'],
                    country: mapping[cityName]['city']['countryName']
                });
                //cacheCityImage(mapping[cityName]);
                showCard(index);
                showCardDiv();

                $('#card-info > ul').addClass('blur');
                $('.add-city1 a').addClass('blur');
                $('.add-city2 a').addClass('blur');
                $('.add-city-block').addClass('blur');
                $('.switch').addClass('blur');
                $('.close-card1').addClass('blur');
                $('.close-card2').addClass('blur');
                if (!getStorageItem('nextCard')) {
                    updateLinkoutToPrimaryLocation(lat, long);
                }

                // fix focus
                // $(this).trigger('blur');
            }
        },
        change: function (event, ui) {
            if (ui.item == null || ui.item == undefined) {
                $('.wb-ind-input1').val('');
            }
        },
        open: function( event, ui ) {
            $('.wb-input.wb-ind-input1').addClass('search-text-city-add1');
        },
        close: function( event, ui ) {
            $('.wb-input.wb-ind-input1').removeClass('search-text-city-add1');
            $('.wb-input-id0 > ul li').remove();
        }
    });
}

$('.weather-popup').on('click', '.blank-lay0', function (event) {
    event.preventDefault();


    window.setTimeout(function () {
        $('.wb-ind-input0').focus();
    }, 100);
    autoCompInput0();

    $(this).hide();
});

$('.weather-popup').on('click', '.blank-lay1', function (event) {
    event.preventDefault();


    window.setTimeout(function () {
        $('.wb-ind-input1').focus();
    }, 100);
    autoCompInput1();

    $(this).hide();
});

function noOfCard() {
    return $('ul li.needed').length;
}

function showLocationBasedOnIndex() {
    var latlog = getStorageItem('index0');
    if (!latlog) {
        getLiveLocation();
    } else {
        updateLinkoutToPrimaryLocation(latlog[0], latlog[1]);
    }
}

document.addEventListener('linkOutTemperatureUpdate', function (e) {
    linkOutTemperatureUpdate();
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        if (key === 'piiAccept' && newValue === '1') {
            allowWidget.show();
            acceptTerm.hide();

            document.dispatchEvent(new CustomEvent('PiiAccept', {
                detail: true
            }));
        } else if (key === 'piiAccept' && newValue === '-1') {
            allowWidget.hide();
            acceptTerm.show();

            document.dispatchEvent(new CustomEvent('PiiAccept', {
                detail: false
            }));
        }
    }
});

window.addEventListener('DOMContentLoaded', (e) => {
    storageReplacer.init().then(function () {
        onLoadInit();
        setDate({
            date: '#custdate',
            time: '#custtime'
        });
        var widget = new Widget({
            activateTarget: true,
            firstLoad: {
                attribute: 'mainWidget',
                storage: {
                    item: 'onboarding',
                    value: 'yes'
                }
            }
        });
        widget.init();


        document.addEventListener('PiiAccept', function (e) {
            var PII_ACCEPT = e.detail;

            switch (PII_ACCEPT) {
                case true:
                    loadOnAcceptPII();
                    break;
                case false:
                    break;
                case 'cancel':
                    break;
            }
        });

        widget.firstLoadRender(function (d) {
            let check = storageReplacer.getLocalStorageItem("state");
            if (check == "Closed1" || check == "Closed2" || check == "Changed") {
                $('.replacement-linkout').show();
                $('.widget-blck,.weather-pill-wrap').hide();
            }
            if (d) {
                document.dispatchEvent(new Event('TutorialShown'));
                setMenuUserPref();
            }
            $('.link-out').removeClass('active');
            $('.weather-popup').removeClass('active');
        });

        checkPiiStored();
    });
});

function loadOnAcceptPII() {
    //displayWeatherNews();
    showLocationBasedOnIndex();
    setInitialSwitches();
    setTimeout(() => { $('#slider_container').slick('refresh'); }, 2000);
    showCard(0).then(function () {
        if (!!getStorageItem('nextCard')) {
            showCard(1).then(function () {

            });
        }

        // linkOutTemperatureUpdate();
    });
}

function displayWeatherNews() {
    $.ajax({
        url:
            'https://weatherauthority.co/hapi/getApiArticles?ldesc=152&visitid=&actno=104&maxno=104&term=weather&maxAge=2&acTypeId=2&origin=web&v=1.0&d=newsprompt.co',
        success: function(result) {

            if (result.status) {
                var data = result.resultSet;
                var newsData = '';
                var limit = 15;

                for (var news = 0; news < limit; news++) {

                    newsData +=
                        '<a href = "' +
                        escapeHtml(data[news].u) +
                        '" class="tracker wnews-wrap" target = "_blank" data-event_name="LinkOutClick" data-event_action="NewsLinkOut"  data-event_str_value="' +
                        escapeHtml(data[news].u) +
                        '" >' +
                        '<div class="wnews-left">' +
                        '<img src="' +
                        escapeHtml(data[news].imgr) +
                        '" alt="' +
                        escapeHtml(data[news].t) +
                        '">' +
                        '</div>' +
                        '<div class="wnews-right">' +
                        '<p class="wnews-heading">' +
                        escapeHtml(data[news].t) +
                        '</p>' +
                        '</div>' +
                        '</a>';
                }


                $('.weather-news-da').append(newsData);
                sliderInit()
            }
        }
    });

}


function sliderInit(){
    try{
        $('#slider_container').slick({
            arrows: true,
            prevArrow: '<div class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"><svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 14L1.5 7.5L8 1" stroke="#0E1539" stroke-width="1.85714"/></svg></i></div>',
            nextArrow: '<div class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"><svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7.5 7.5L0.999998 14" stroke="#0E1539" stroke-width="1.85714"/></svg></i></div>',
            dots: false,
            slidesToShow: 8,
            slidesToScroll: 1,
            infinite: false,
            autoplay: true,
            responsive: [{
                breakpoint: 1367,
                settings: {
                    slidesToShow: 8,
                    slidesToScroll: 1
                }
            },
                {
                    breakpoint: 1025,
                    settings: {
                        slidesToShow: 4
                    }
                }
            ],
            onAfterChange: function(slide, index) {
                if (index == response.length) {
                    elems.sliderNextNav.css({ 'pointer-events': 'none', opacity: 0.4 });
                } else {
                    elems.sliderNextNav.css({ 'pointer-events': 'all', opacity: 1 });
                }
            }

        });

    }
    catch(err){

    }

}


let currentOne = document.getElementsByClassName('needed')[0];
$('.add-city-block1').click(function(){
    $('.add-city1 a').addClass('active-tab');
    $('.add-city2 a').removeClass('active-tab');
    $('.close-card1').addClass('include');
    $('.close-card2').removeClass('include');
    $('.new-city').parent().parent().removeClass('show');
})
$('.add-city-block2').click(function(){
    $('.add-city2 a').addClass('active-tab');
    $('.add-city1 a').removeClass('active-tab');
    $('.close-card2').addClass('include');
    $('.close-card1').removeClass('include');
    $('.new-city').parent().parent().addClass('show');
})


$('.close-card1').click(function(){
    $('.card-info li:eq(0)').remove();
    $('.add-city2 a').addClass('highlight2');
    $('.add-city1 a').removeClass('highlight');
    $('.add-city-hide .add-city-block').removeClass('hide-option');
    $('.card-info li').addClass('border-change');
    $('.add-city-block2').addClass('cursor-dis');
    $('.add-city-block1').addClass('remove-card1');
    $('.close-card2').addClass('hide');
    $('.new-city').parent().parent().addClass('display1');
    $('.weather-popup-inner').removeClass('show');
    $('.add-city-block2').addClass('add-sp')
    storageReplacer.setLocalStorageItem("state","Closed1")

})

$('.close-card2').click(function(){
    $('.card-info li:eq(1)').remove();
    $('.add-city1 a').addClass('highlight');
    $('.add-city2 a').removeClass('highlight2');
    $('.add-city-hide .add-city-block').removeClass('hide-option');
    $('.add-city-block1').addClass('cursor-dis');
    $('.add-city-block2').addClass('remove-card2');
    $('.close-card1').addClass('hide');
    $('.new-city').parent().parent().addClass('display2');
    $('.weather-popup-inner.widget-blck').removeClass('show');
    $('.add-city-block1').addClass('add-sp')
    $('.card-info li').addClass('border-change');
    storageReplacer.setLocalStorageItem("state","Closed2")
})


$('.add-city-block').click(function(){
    $('.weather-popup.active').addClass('edit-city-block');
    $('.new-city').parent().parent().removeClass('display1');
    $('.new-city').parent().parent().removeClass('display2');
    $('#search-text-cities').removeClass('search-text-city-add')
    $('.add-city-block1').removeClass('add-sp');
    $('.add-city-block2').removeClass('add-sp')
})
$('.cities-Cancel').click(function(){
    $('.weather-popup.active').removeClass('edit-city-block');
    $('#search-text-cities').removeClass('search-text-city-add')
    $('.new-city').parent().parent().addClass('display1');
    $('.new-city').parent().parent().addClass('display2');
    $('.add-city-block1').addClass('add-sp');
    $('.add-city-block2').addClass('add-sp')

})

function activeState(){
    if($('.currentlocation1').hasClass('active-tab')){
        $('.add-city1 a').removeClass('active-tab');
        $('.close-card2').addClass('include');
        $('.close-card1').removeClass('include');
    }
    if($('.currentlocation-city').hasClass('active-tab')){
        $('.add-city2 a').removeClass('active-tab');
    }
}



$('.weather-wid').click(function(){
    let status = storageReplacer.getLocalStorageItem('citysearch');
    var cardGroup = $('#card-info ul li.needed')
    if(status == "active" && cardGroup.length == 2){
        $('.weather-popup').removeClass('edit-city-block');
        hideCitySearch()
        storageReplacer.setLocalStorageItem('citysearch','reset');
        $('.weather-popup-inner').removeClass('show');
        $('.add-city1 a').addClass('active-tab');
        $('.add-city2 a').removeClass('active-tab');
        $('.close-card1').addClass('include');
        $('.close-card2').removeClass('include');
        $('.add-city-block1').addClass('add-sp');
        $('.add-city-block2').addClass('add-sp');

    }
    else if(cardGroup.length == 2 ){
        $('.weather-popup').removeClass('edit-city-block');
        $('.add-city1 a').addClass('active-tab');
        $('.weather-popup-inner').removeClass('show');
        $('.add-city2 a').removeClass('active-tab');
        $('.close-card1').addClass('include');
        $('.close-card2').removeClass('include');
        hideCitySearch()
    }
    else{
        $('.weather-popup').removeClass('edit-city-block');
        $('.add-city-block1').addClass('add-sp');
        $('.add-city-block2').addClass('add-sp');
        $('.weather-popup-inner').removeClass('show');
        hideCitySearch()
    }
})