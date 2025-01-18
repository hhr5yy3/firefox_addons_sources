
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

function removeTags(text) {
    return text.replace("<b>","").replace("</b>");
}

function setStorageItem(name, data) {
    try {
        storageReplacer.setLocalStorageItem(name, JSON.stringify(data));
    } catch (err) {}
}

function replaceUrlParam(url, paramName, paramValue) {
    var pattern = new RegExp('\\b(' + paramName + '=).*?(&|$)');
    var hash = window.location.hash;
    if (url.indexOf(hash) > -1) {
        url = url.replace(hash, '');
    }
    if (url.search(pattern) >= 0) {
        return url.replace(pattern, '$1' + paramValue + '$2');
    }
    return (
        url + (url.indexOf('?') > 0 ? '&' : '?') + paramName + '=' + paramValue
    );
}

function getShareUrl(data, type, templateName) {
    var newTemplateName;
    var shareUrl =
        typeof specificConstants !== 'undefined' &&
        !!specificConstants['newtab_theme']
            ? specificConstants['newtab_theme']
            : "https://mapsassist.com/newtab/v1/jvbufu.html";
    if (shareUrl.indexOf('newtab') > -1) {
        if (type == 'print') {
            newTemplateName = templateName ? templateName : 'print_pii_v5bj.html';
        } else if (type == 'results') {
            newTemplateName = templateName
                ? templateName
                : 'newtab_results_v5bj.html';
        }
    }

    if (newTemplateName) shareUrl = folderURL + '/' + newTemplateName;

    var refType = !!type ? type : 'share';
    shareUrl = replaceUrlParam(shareUrl, 'ref', refType);

    if (!!data) {
        var newData = btoa(encodeURIComponent(JSON.stringify(data)));
        shareUrl = replaceUrlParam(shareUrl, 'd', newData);
    }

    return shareUrl;
}


document.addEventListener('keepChangesNewTab', keepchangesActive);

function keepchangesActive() {
    $('.firefox_cust_overlay').show();
    $("#search-text").blur();
    setTimeout(function () {
        $('.firefox_cust_overlay').hide();
    }, 10000);
}

function attachKeepChangesOverlayListener() {
    $('body').on('click', '.firefox_cust_overlay', function (e) {
        e.preventDefault();
        e.stopPropagation();
    });
}

function attachKeepChangesCloseListener() {
    $(".close-ff-arrow").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('.firefox_cust_overlay').hide();
    });
}

function customDate(date) {
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        wekdayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    if($('body').hasClass('newtab_v5')){
        return wekdayName[(date.getDay() + 0)] + ", " + monthNames[(date.getMonth() + 0)] + ' ' + date.getDate();
    }else{
        return wekdayName[(date.getDay() + 0)] + ", " + monthNames[(date.getMonth() + 0)] + " " + ordinal_suffix_of(date.getDate());
    }
}

function ordinal_suffix_of(i) {
    var j = i % 10, k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

function changeTimeFormatTo12Hr(date) {
    var hours = date.getHours(),
        minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var unit = getMeridianFromHour(hours);
    hours = hours % 12;
    hours = hours == 0 ? 12 : hours;

    return {hours: hours, minutes: minutes, unit: unit};
}

function getMeridianFromHour(hour) {
    hour = hour % 24;
    return hour < 12 ? 'am' : "pm";
}

function updateCurrentDateTime() {
    var date = getCurrentTime();
    $('#custtime').text(date.value + ' ' + date.unit);
    $('#custdate').text(customDate(new Date()));
    $('.currenttime .sep').css('display', 'inline-block');
}

function getCurrentTime(val) {
    var date = val || new Date();
    var format = {value: "", unit: ""};
    var tempDate = changeTimeFormatTo12Hr(date);
    format.value = tempDate.hours + ":" + tempDate.minutes;
    format.unit = tempDate.unit;
    format.hours = tempDate.hours;
    format.minutes = tempDate.minutes;
    return format;
}

var mapIdMapping = {};

function zoomIn(id) {
    var map = mapIdMapping[id];
    var currZoom = map.getCamera().zoom;
    map.setCamera({
        zoom: currZoom + 1
    });
}

function zoomOut(id) {
    var map = mapIdMapping[id];
    var currZoom = map.getCamera().zoom;
    map.setCamera({
        zoom: currZoom - 1
    });

}



var API = specificConstants.API;
var userCoordinates = [];
var routeDetails = {}
var currentMapId = 'map-enlarge';

var params = {};
var upDownEvent = false;
var selectedfrom = false;
var selectedto = false;

function handleUrl() {

    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        params[key] = value;
    });
    try {
        if (params["ref"] == "print") {
            $('body').addClass('print-direction');
        }
        if (!!params["d"]) {
            var dataStr = "";
            if (!!params["d"]){
                dataStr = atob(params["d"]);
            }
        }

    } catch (err) {
        console.log(err);
    }
}

function checkIsLander() {
    return typeof specificConstants.isLander !== 'undefined';
}

var optionSelectedfrom = false;
var optionSelectedto = false;
var selectionOptionsCustom = {
    optionSelectedFrom : false,
    optionSelectedTo: false
}
$(function () {
    var cache = {};
    var mapping = {};
    var res = [];
    var autoFlag = true;
    $("#search-text-from").on('input', function(){
        selectionOptionsCustom.optionSelectedFrom = false;
    });

    $("#search-text-from").autocomplete({
        autoFocus: false,
        minLength: 0,
        delay: 50,
        appendTo: $("#searchform-location .search-text-from-wrap"),
        source: function (request, response) {
            var term = request.term.toLowerCase().split(",")[0];
            if (term.length == 0) {
                var defaultLocations = getDefaultLocationsList(5, $("#search-text-to").val());
                var locationSet = [];
                for (var i = 0; i < defaultLocations.length; i++) {
                    var defaultLocName = getDisplayLocationName(defaultLocations[i]);
                    mapping[defaultLocName] = defaultLocations[i]
                    locationSet.push(defaultLocName);
                }
                response(locationSet);
            } else {
                if (term in cache) {
                    response(cache[term]);
                    return;
                }
                var url = getLocationAutosuggestUrl();
                $.getJSON(url, {
                    q: term
                }, function (data, status, xhr) {
                    if(res.length>0){
                        while(res.length>0){
                            res.pop();
                        }
                    }
                    data = removeDuplicateLocations(data);
                    for (var i = 0; i < data.length; i++) {
                        var queryData = data[i];
                        var locationName = getDisplayLocationName(queryData);
                        res.push(locationName);
                        mapping[locationName] = data[i];
                    }
                    cache[term] = res;
                    response(res);
                });
            }
        },
        select: function (event, ui) {
            event.preventDefault();
            // selectedfrom = true;
            var locationName = ui.item.value;
            if (mapping[locationName]) {
                routeDetails.searchFrom = mapping[locationName];
                incrementLocationClickCount(mapping[locationName]);
            }
            $("#search-text-from").val(removeTags(locationName));
            displayDirectionBtn();
            $(".direction-icon .circle").css('background', '#474747');
            $("#search-text-to").focus();
            setTimeout(function(){
                optionSelectedfrom = true;
                selectedfrom = true;
                // console.log("optionSelectedfrom done", optionSelectedfrom)
            }, 100);
            selectionOptionsCustom.optionSelectedFrom = true;
            $('#search-text-from').autocomplete('close')
        },
        focus: function (event, ui) {
            event.preventDefault();
            // $("#search-text-from").val(removeTags(ui.item.value));
        },
        open: function () {
            $("ul.ui-menu").width(($("#search-text-from").innerWidth() - 1));
        },
        change: function (event , ui) {
            optionSelectedfrom = false;
            // console.log("optionSelectedfrom done-", optionSelectedfrom);
            if (ui.item === null) {
                selectedfrom = false;
           }
            $('#search-text-from').autocomplete('close');
            $("#search-text-to").focus();
        }

    })
        .autocomplete("instance")._renderItem = function (ul, item) {
        var label = item.label.split(',');
        var locationName = escapeHtml(removeTags(label.shift()));
        var locationAddress = escapeHtml(removeTags(label.join(", ")));

        return $("<li>")
            .append("<div><span>" + locationName + "</span>," + locationAddress + "</div>")
            .appendTo(ul);
    }
    $("#search-text-from").keydown(function (event) {
        if(event.keyCode == 38 || event.keyCode == 40){
            autoFlag = false;
            upDownEvent= true;
        }

        if (event.keyCode == 13) {

            if(upDownEvent){
                autoFlag= false;
                upDownEvent= false;
            }else{
                autoFlag = true;
            }

            if ($("#search-text-from").val().length !== 0 && autoFlag) {
                event.preventDefault();
                $("#search-text-from").val(removeTags(res[0]));
                $('#search-text-from').autocomplete('close')
                if (mapping[res[0]]) {
                    routeDetails.searchFrom = mapping[res[0]];
                    incrementLocationClickCount(mapping[res[0]]);
                }
                $("#search-text-to").focus();
                autoFlag = true;
                return false;
            }
        }
    })

});

$("#search-text-from").focus(function (e) {
    if (!e.isTrigger) {
        $(this).autocomplete("search", $(this).val());
    }
});

function getDisplayLocationName(queryData) {
    var locationName;
    if(removeTags(queryData.uiLocationName) == queryData.address){
        locationName = queryData.uiLocationName;
    }else{
        locationName = queryData.uiLocationName + ", " + queryData.address;
    }
    locationName = locationName.replaceAll('<br/>', ', ');
    return locationName;
}

function removeTags(locationName) {
    var modifiedLoc = locationName.replaceAll("<b>", '').replaceAll("</b>", '').trim();
    return modifiedLoc;
}


$(function () {
    var cache = {};
    var mapping = {};
    var res = [];
    var autoFlag = true;
    $("#search-text-to").on('input', function(){
        selectionOptionsCustom.optionSelectedTo = false;
    });
    $("#search-text-to").autocomplete({
        autoFocus: false,
        minLength: 0,
        delay: 50,
        appendTo: $("#searchform-location .search-text-to-wrap"),
        source: function (request, response) {
            var term = request.term.toLowerCase().split(",")[0];
            if (term.length == 0) {
                var defaultLocations = getDefaultLocationsList(5, $("#search-text-from").val());
                var locationSet = [];
                for (var i = 0; i < defaultLocations.length; i++) {
                    var defaultLocName = getDisplayLocationName(defaultLocations[i]);
                    mapping[defaultLocName] = defaultLocations[i]
                    locationSet.push(defaultLocName);
                }
                cache[term] = locationSet;
                response(locationSet);
            } else {
                if (term in cache) {
                    response(cache[term]);
                    return;
                }
                var url = getLocationAutosuggestUrl()
                $.getJSON(url, {
                    q: term
                }, function (data, status, xhr) {
                    if (res.length > 0) {
                        while (res.length > 0) {
                            res.pop();
                        }
                    }
                    data = removeDuplicateLocations(data);
                    for (var i = 0; i < data.length; i++) {
                        var queryData = data[i];
                        var locationName = getDisplayLocationName(queryData);
                        res.push(locationName);
                        mapping[locationName] = data[i];
                    }
                    cache[term] = res;
                    response(res);
                });
            }
        },
        select: function (event, ui) {
            event.preventDefault();
            // selectedto = true;
            setTimeout(function(){
                optionSelectedto = true;
                selectedto = true;
                // console.log("optionSelectedto done", optionSelectedto)
            }, 100);
            selectionOptionsCustom.optionSelectedTo = true;
            var locationName = ui.item.value;
            // console.log(locationName)
            if (mapping[locationName]) {
                routeDetails.searchTo = mapping[locationName];
                incrementLocationClickCount(mapping[locationName]);
            }
            $("#search-text-to").val(removeTags(locationName));
            displayDirectionBtn();
            $(".direction-icon .square").css('background', '#474747');
            $("#get-directions").focus();
            $('#search-text-to').autocomplete('close')
        },
        focus: function (event, ui) {
            event.preventDefault();
            // $("#search-text-to").val(removeTags(ui.item.value));
        },
        open: function () {
            $("ul.ui-menu").width($("#search-text-to").innerWidth() - 1);
        },
        change: function (event, ui) {
            optionSelectedto = false;
            // console.log("optionSelectedto done-", optionSelectedto);
            if (ui.item === null) {
                selectedto = false;
           }
            $('#search-text-to').autocomplete('close');
            
        }
    })
        .autocomplete("instance")._renderItem = function (ul, item) {
        var label = item.label.split(',');
        var locationName = escapeHtml(removeTags(label.shift()));
        var locationAddress = escapeHtml(removeTags(label.join(", ")));
        return $("<li>")
            .append("<div><span>" + locationName + "</span>," + locationAddress + "</div>")
            .appendTo(ul);
    };
    $("#search-text-to").keydown(function (event) {
        if(event.keyCode == 38 || event.keyCode == 40){
            autoFlag = false;
            upDownEvent= true;
        }

        if (event.keyCode == 13) {

            if(upDownEvent){
                autoFlag= false;
                upDownEvent= false;
            }else{
                autoFlag = true;
            }

            if ($("#search-text-to").val().length !== 0 && autoFlag) {
                event.preventDefault();
                $("#search-text-to").val(removeTags(res[0]));
                $('#search-text-to').autocomplete('close')
                if (mapping[res[0]]) {
                    routeDetails.searchTo = mapping[res[0]];
                    incrementLocationClickCount(mapping[res[0]]);
                }

                autoFlag = true;
                return false;
            }
        }
    })

});


$("#search-text-to").focus(function (e) {
    if (!e.isTrigger) {
        $(this).autocomplete("search", $(this).val());
    }
});

function removeDuplicateLocations(data) {
    var locationsCovered = [];
    var uniqueLocations = [];
    var i = 0;
    while (i < data.length && uniqueLocations.length < 5) {
        var location = (data[i].locationName + data[i].address).toLowerCase();
        if (locationsCovered.indexOf(location) == -1) {
            locationsCovered.push(location);
            uniqueLocations.push(data[i]);
        }
        i++;
    }
    return uniqueLocations;
}

function getDefaultLocationsList(numLocations, locationSelected) {
    var locationCountThreshold = 3;
    var topLocations = getTopLocationsFromStorage();
    var defaultLocations = [];
    try {
        if (!!topLocations) {
            var locationList = Object.values(topLocations);
            locationList = locationList.sort(function (a, b) {
                return b.count - a.count;
            })
            var i = 0;
            while (defaultLocations.length < numLocations && i < locationList.length) {
                if (locationList[i].count >= locationCountThreshold) {
                    if (!locationSelected || locationSelected != removeTags(getDisplayLocationName(locationList[i]))) {
                        defaultLocations.push(locationList[i]);
                    }
                }
                i++;
            }
            if (!!numLocations && numLocations > 0)
                defaultLocations = defaultLocations.slice(0, numLocations - 1);
        }
    } catch (err) {
    } finally {
        return defaultLocations;
    }
}


function incrementLocationClickCount(data) {
    var maxLocationsStored = 30;
    var maxLocationCount = 10;
    var goodLocationThreshold = 7;
    var topLocations = getTopLocationsFromStorage();
    if (!topLocations) topLocations = {};
    try {
        if (!topLocations[data.id]) {
            data['count'] = 1;
            topLocations[data.id] = data;
        } else {
            var newCount = topLocations[data.id]['count'] + 1;
            if (newCount > goodLocationThreshold && newCount <= maxLocationCount) {
                topLocations = weighDownLocations(topLocations);
            }
            topLocations[data.id]['count'] = Math.min(newCount, maxLocationCount);
        }
        setStorageItem('topLocations', JSON.stringify(topLocations));
        if (Object.values(topLocations).length == maxLocationsStored) {
            removeLowCountLocations(10, data);
        }
    } catch (err) {
        // console.log(err);
    }
}

function weighDownLocations(topLocations) {
    for (var locId in topLocations) {
        topLocations[locId].count = Math.max(topLocations[locId].count - 1, 1);
    }
    return topLocations;
}

function removeLowCountLocations(numLocations, data) {
    var defaultLocations = getDefaultLocationsList(30 - numLocations);
    var topLocations = {};
    for (var i = 0; i < defaultLocations.length; i++) {
        topLocations[defaultLocations[i].id] = defaultLocations[i];
    }
    if (!!data) {
        topLocations[data.id] = data;
    }
    setStorageItem('topLocations', JSON.stringify(topLocations));
}

function getTopLocationsFromStorage() {
    try {
        return JSON.parse(getStorageItem('topLocations', true));
    } catch (err) {
    }
    return null;
}

function getLocationAutosuggestUrl() {
    var coord = getUserCoordinates();
    var url = API + "getSearchLocations?";
    url += "at=" + coord[1] + "," + coord[0];
    url += "&size=" + 20;
    return url;
}

$(document).on('click', '.zoom-in-btn', function (e) {
    e.preventDefault();
    zoomIn(currentMapId);
})

$(document).on('click', '.zoom-out-btn', function (e) {
    e.preventDefault();
    zoomOut(currentMapId);
})


function displayDirectionBtn() {
    if ($("#search-text-from").val() && $("#search-text-to").val()) $('.get-direction-btn').addClass('get-direction-btn-active');
    else $('.get-direction-btn').removeClass('get-direction-btn-active');
}

function swapValues() {
    var from = $('#search-text-from').val();
    $('#search-text-from').val($('#search-text-to').val());
    $('#search-text-to').val(from);
    var temp = routeDetails.searchFrom;
    routeDetails.searchFrom = routeDetails.searchTo;
    routeDetails.searchTo = temp;
    var validTemp = selectedfrom;
    selectedfrom = selectedto;
    selectedto = validTemp;
}

function getUserCoordinates() {
    var defaultCoordinates = ['-95.712891', '37.090240'];
    if (userCoordinates.length == 2)
    return userCoordinates;
    else{
        try {
            var coord = [];
            getLocationCoordinates().then(function(data){
                coord[0] = data.latitude;
                coord[1] = data.longitude;
                userCoordinates = [coord[1], coord[0]];
                return userCoordinates;
            });
        } catch (err) {
            userCoordinates = defaultCoordinates;
            return userCoordinates;
        }
    }
}

$('.panelTrigger').on('click', function (e) {
    e.preventDefault();
    $('.main-widget-wrap, .panelTrigger .siteName ').toggleClass("active");
    if ($('.main-widget-wrap').hasClass('active')) {
        $('.panelTrigger .siteName').addClass('active');
    }
    $('body').toggleClass('map-Driection-active');
});
if ($('.main-widget-wrap').hasClass('active')) {
    $('.panelTrigger .siteName').addClass('active');
    $('.close-widget-wrap').show();
} else {
    $('.panelTrigger .siteName').removeClass('active');
}

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

if (getUrlParameter('shareCheck') == '1') {
    $('.main-widget-wrap, .panelTrigger .siteName ').addClass("active");
}

$('.close-widget-wrap').on('click', function () {
    $('.main-widget-wrap, .panelTrigger .siteName').removeClass("active");
    if ($(window).width() > 700) {
        $('.direction-routes-wrap').fadeOut();
        $('#map-enlarge').css({
            visibility: 'hidden',
            'z-index': '-1'
        });
        $('body').removeClass('map-Driection-active map-gen');
    }
});

$(document).on("click", ".travel-share .social-icons .share", function () {
    if (checkIsLander()) {
        skipLanderBtn();
        return;
    }
    $('.travel-share .social-icons').toggleClass('active');
});

$(document).on("click", ".travel-share .social-icons .whatsapp", function () {
    if (checkIsLander()) {
        skipLanderBtn();
        return;
    }
    var url = 'https://web.whatsapp.com/send?text=' + encodeURIComponent("Link for map directions: " + getShareUrl(routeDetails) + "&shareCheck=1" + " - " + specificConstants.domain);
    window.open(url);
});

$(document).on("click", "#overlay-msg .close", function () {
    $('#overlay-msg').hide();
});

var elmt1 = document.querySelector('#search-text-from');
elmt1.addEventListener('keydown', function (event) {
    if (elmt1.value.length === 0 && event.which === 32) {
        event.preventDefault();
    }
});
var elmt2 = document.querySelector('#search-text-to');
elmt2.addEventListener('keydown', function (event) {
    if (elmt2.value.length === 0 && event.which === 32) {
        event.preventDefault();
    }
});

$(document).on('click', '.get-direction-btn', function (e) {
    e.preventDefault();
})

$('#search-text-from, #search-text-to').on('change', function () {
    if (($('#search-text-from').val() && $('#search-text-to').val()) == '') {
        $('.get-direction-btn').removeClass('get-direction-btn-active');
        $('.validation-check').css('visibility', 'hidden');
    }
});

var defaultLatitude = "40.71";
var defaultLongitude = "-74.01";

function getKey(lat, long, suffix) {
    suffix = suffix || "";
    return lat + "," + long + suffix;
}

function getLocationFromCookie() {
    var res = null;
    try {
        res = null;
    } catch (err) {
    }
    return res;
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
    });
}

function getCityPillText(data) {
    var text = data.city;
    if (data.state) text += ", " + data.state;
    else if (data.country) text += ", " + data.country;
    return text;
}

function getCurrentLocation() {
    try {
        return;
    } catch (err) {
    }
    return new Promise(function (resolve, reject) {
        getLocationCoordinates().then(function (locationInfo) {
            getCityDetails(locationInfo).then(function (data) {
                if (data.city) {
                    var cityPillText = getCityPillText(data);
                    $('.currentlocation').text(cityPillText);
                    $('.currentlocation').attr("title", cityPillText);
                }
            });
            var temperatureInfo = getCityTemperature(locationInfo.latitude, locationInfo.longitude);
        }).catch(function (err) {

        });
    });

}

function getLocationCoordinates() {
    return new Promise(function (resolve, reject) {
        var locationData = getLocationFromCookie();
        if (locationData && locationData.length === 2) {
            resolve({
                longitude: locationData[0],
                latitude: locationData[1]
            });
        } else {
            getDataFromNetwork(specificConstants.API + "getLocationData", 5000)
                .then(function (data) {
                    if (data.status) {
                        if (
                            data.location &&
                            data.location.longitude &&
                            data.location.latitude
                        ) {
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
                })
                .catch(function () {
                    resolve({
                        longitude: defaultLongitude,
                        latitude: defaultLatitude
                    });
                });
        }
    });
}

function getCityDetails(locationInfo) {
    return new Promise(function (resolve, reject) {
        var latitude = locationInfo.latitude;
        var longitude = locationInfo.longitude;
        var city = locationInfo.city;
        if (city) {
            resolve(locationInfo);
        } else {
            fetchCityDetails(latitude, longitude).then(function (cityData) {
                locationInfo = Object.assign(locationInfo || {}, cityData || {});
                resolve(locationInfo);
            }).catch(function (err) {
                reject(err);
            });
        }
    });
}

function fetchCityDetails(latitude, longitude) {
    if (!!latitude && !!longitude) {
        var cityPromise;
        if (!!getStorageItem(getKey(latitude, longitude, "CityInfo"))) {
            cityPromise = Promise.resolve(getStorageItem(getKey(latitude, longitude, "CityInfo")));
        } else {
            cityPromise = new Promise(function (cityResolve, cityReject) {
                $.getJSON(
                    specificConstants.API + "getReverseGeocoding?latitude=" + latitude + "&longitude=" + longitude,
                    function (data) {
                        var city = data.location.split(",");
                        var cityInfo = {
                            latitude: latitude,
                            longitude: longitude,
                            city: city[0],
                            country: city[1]
                        };
                        setStorageItem(getKey(latitude, longitude, "CityInfo"), cityInfo);
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
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: 'POST',
            url:
                specificConstants.API +
                'temperatureData?latitude=' +
                lat +
                '&longitude=' +
                long,
            success: function (data) {
                // console.log('tempdata' + data);
                var tempround = data.currently.temperature.toFixed(1);
                $('.weather-icon').addClass(data.currently.icon);
                $('.citytemf').text(convertCelsiusToFarenheit(tempround) + '&deg; F')
            },
            error: function (error) {
                $('.citytemf').text('Not found');
            }
        });
    });
}


var acceptButton = document.getElementById('acceptTerms');
var allowWidget = document.getElementsByClassName('allow-widget')[0];
var acceptTerm = document.getElementsByClassName('accept-prompt')[0];

var piiAccept = 'piiAccept';
acceptButton.addEventListener('click', function (e) {
    closePiiWidget();
    chrome.runtime.sendMessage({task: 'showOptInPage'});
});

document.getElementById('denytTerms').addEventListener('click', function (e) {
    closePiiWidget();
});
document.addEventListener('DOMContentLoaded', function () {
    storageReplacer.init().then(function () {

        if (!($('body').hasClass('newtab_v5'))) {
            setTimeout(function () {
                $("#search-text").focus();
            }, 300)
        }
        document.getElementById("search-text-from").value = "";
        document.getElementById("search-text-to").value = "";
        updateCurrentDateTime();
        setInterval(updateCurrentDateTime, 1000);
        if (!checkIsLander()) {
            handleUrl();
        }

        allowWidget.style.display = 'none';
        checkPiiStored();

        getCurrentLocation();
        if (!storageReplacer.getLocalStorageItem('onboarding')) {
            storageReplacer.setLocalStorageItem('onboarding', '1');
            $('[data-val="get_directions"], .link-out:first-child, .logo').addClass("active");
        } else {
            $('[data-val="get_directions"], .link-out:first-child, .logo').removeClass("active");
        }

        attachKeepChangesOverlayListener();
        attachKeepChangesCloseListener();

    })

});

chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        if (key === 'piiAccept' && newValue === '1') {
            allowWidget.style.display = 'block';
            acceptTerm.style.display = 'none';

            document.dispatchEvent(new CustomEvent('PiiAccept', {detail: true}));
        } else if (key === 'piiAccept' && newValue === '-1') {
            allowWidget.style.display = 'none';
            acceptTerm.style.display = 'block';

            document.dispatchEvent(new CustomEvent('PiiAccept', {detail: false}));
        }
    }
});

var widgetElement = document.getElementsByClassName('link-out')[0];

widgetElement.addEventListener('click', function (e) {
    checkPiiStored();
});

function checkPiiStored() {
    var accepted = storageReplacer.getLocalStorageItem('piiAccept');
    if (accepted && accepted == 1) {
        allowWidget.style.display = 'block';
        acceptTerm.style.display = 'none';

        document.dispatchEvent(new CustomEvent('PiiAccept', {detail: true}));
    } else if (!accepted || accepted == -1) {
        allowWidget.style.display = 'none';
        acceptTerm.style.display = 'block';

        document.dispatchEvent(new CustomEvent('PiiAccept', {detail: false}));
    }
}

function closePiiWidget() {
    try {
        document.dispatchEvent(
            new CustomEvent('PiiAccept', {detail: 'cancel'})
        );

        var link1 = document.getElementsByClassName('link_1');
        var link3 = document.getElementsByClassName('customPop-firefox');
        var link2 = document.getElementsByClassName('directions-popup');
        var link4 = document.getElementsByClassName('newtab-logo-v5jb');

        if (link1[0] && link1[0].classList.contains('activeLink')) {
            link1[0].classList.remove('activeLink');
        } else if (link1[0] && link1[0].classList.contains('active_link')) {
            link1[0].classList.remove('active_link');
        } else if (link1[0] && link1[0].classList.contains('active')) {
            link1[0].classList.remove('active');
        }
        if (link2[0]) {
            if (link2[0].classList.contains('active')) {
                link2[0].classList.remove('active');
            } else {
                link2[0].style.display = 'none';
            }
        }

        if (link3[0] && link3[0].classList.contains('logo-toggle')) {
            link3[0].classList.remove('__show');
        }

        if (link4[0] && link4[0].classList.contains('active')) {
			link4[0].classList.remove('active');
		}

    } catch (e) {
        console.log(e);
    }
}

function openWidget(openFor) {
    $('.directions-popup').attr('data-val', openFor).toggleClass('active');
    $('.link-out').attr('data-for', openFor).toggleClass('active');
    $('.logo').toggleClass("active");
}

function checkValidation() {
    var searchFromVal = $('#search-text-from').val(),
        searchToVal = $('#search-text-to').val(),
        $validationCheck = $('.validation-check');
    $gdbtn = $('.get-directions-btn');
    if (searchFromVal == '' && searchToVal == '') {
        $validationCheck.text('Please enter source and destination.');
        $validationCheck.css('visibility', 'visible');
        return false;
    } else if (searchFromVal == '') {
        $validationCheck.text('Please enter source.');
        $validationCheck.css('visibility', 'visible');
        return false;
    } else if (searchToVal == '') {
        $validationCheck.text('Please enter destination.');
        $validationCheck.css('visibility', 'visible');
        return false;
    }
    else if (searchFromVal == searchToVal) {
        $validationCheck.text('Source and destination cannot be same.');
        $validationCheck.css('visibility', 'visible');
        return false;
    }
    return true;
}

$('.link-out').on('click', function () {
    var dataFor = $(this).attr('data-for');
    openWidget(dataFor);
});


$('#v5_getdirections').click(function () {
    var a = $('#search-text-from');
    var b = $('#search-text-to');
    var searchFromVal = $('#search-text-from').val().replace(/ /g, ''),
        searchToVal = $('#search-text-to').val().replace(/ /g, ''),
        $validationCheck = $('.validation-check');
    $gdbtn = $('.get-directions-btn');

    if (checkValidation()) {
        if (selectedfrom && selectedto) {
            $('.validation-check').css('visibility', 'hidden');
            // $('.get-direction-btn').prop('disabled',false);
            if ($('body').hasClass('newtab_v6')) {
                window.open(getShareUrl(routeDetails, 'results', 'newtab_results_v2_pii.html'));
                var textData = 'From:- ' + $('#search-text-from').val() + ' To:-' + $('#search-text-to').val();

            }
            else {
                window.open(getShareUrl(routeDetails, 'results'));
            }
        }
        else {
            $validationCheck.text('Please enter valid Locations.').css('visibility', 'visible');
        }
    }
});

$('.logo').on('click', function () {
    $('[data-val="get_directions"],[data-for="get_directions"]').toggleClass("active");
    $(this).toggleClass("active");
});

$(document).click(function (event) {
    if ($(event.target).closest('[data-for="get_directions"],[data-val="get_directions"], .logo').length == false) {
        $('[data-val="get_directions"],[data-for="get_directions"], .logo').removeClass("active");
    }
});



document.addEventListener("searchTextChanged", function () {
    $('[data-val="get_directions"],[data-for="get_directions"], .logo').removeClass("active");
});

document.getElementsByClassName("reverse")[0].addEventListener("click", swapValues);

document.addEventListener('PiiAccept', function (e) {
    var PII_ACCEPT = e.detail;
    if(PII_ACCEPT === true) {
        // console.log("inside...", PII_ACCEPT);
        getUserCoordinates();
    }
});
