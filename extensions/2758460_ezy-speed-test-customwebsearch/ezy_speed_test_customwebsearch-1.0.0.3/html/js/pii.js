if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, 'includes', {
        value: function (searchElement, fromIndex) {

            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }

            var o = Object(this);

            var len = o.length >>> 0;

            if (len === 0) {
                return false;
            }
            var n = fromIndex | 0;
            var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

            function sameValueZero(x, y) {
                return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
            }

            while (k < len) {
                if (sameValueZero(o[k], searchElement)) {
                    return true;
                }
                k++;
            }
            return false;
        }
    });
}

if (typeof Object.values !== 'function') {
    Object.values = function (obj) {
        var keys = Object.keys(obj);
        var values = [];
        for (var i = 0; i < keys.length; i++) {
            values.push(obj[keys[i]]);
        }
        return values;
    }
}
if (typeof window.Event !== 'function') {
    function CustomEvent(event, params) {
        params = params || {bubbles: false, cancelable: false, detail: undefined};
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;
    window.Event = CustomEvent;
}

if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (searchString, position) {
        position = position || 0;
        return this.substr(position, searchString.length) === searchString;
    };
}

if (typeof Object.assign != 'function') {
    Object.assign = function (target, varArgs) { // .length of function is 2
        'use strict';
        if (target == null) { // TypeError if undefined or null
            throw new TypeError('Cannot convert undefined or null to object');
        }

        var to = Object(target);

        for (var index = 1; index < arguments.length; index++) {
            var nextSource = arguments[index];

            if (nextSource != null) { // Skip over if undefined or null
                for (var nextKey in nextSource) {
                    // Avoid bugs when hasOwnProperty is shadowed
                    if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
        }
        return to;
    };
}

if (!Array.isArray) {
    Array.isArray = function (arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };
}

//custom implementation
function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(escapeRegExp(search), 'g'), replacement);
};

String.prototype.capitalize = function () {
    return this.replace(/(^|\s)([a-z])/g, function (m, p1, p2) {
        return p1 + p2.toUpperCase();
    });
};

String.prototype.escapeQuotes = function () {
    var target = this;
    if (!target) return target;
    return target.replace(/'/g, '&apos;').replace(/"/g, '&quot;');
};

String.format = function () {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i + 1]);
    }
    return s;
};

function isEmptyObject(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false;
    }
    return true;
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

window.setAnimationUtils = SetAnimationUtils();

var BODY = {
    $stepone: $("[step-attribute=step1]"),
    $steptwo: $("[step-attribute=step2]"),
    $stepthree: $("[step-attribute=step3]"),
    $gotoStep: $("#gostep"),
    $loader: $('#loader'),
    $download: $(".download-content"),
    $upload: $(".upload-content")
};

var steps = function () {
    return {
        step1: function () {
            $('.pn_spd').text('---');
            $('.dw_spd').text('----');
            $('.up_spd').text('----');
            $('.jtr_spd').text('---');
            $(BODY.$gotoStep, BODY.$steptwo, BODY.$stepthree).addClass('hide');
            // Testing Loader is shown
            $(BODY.$loader).removeClass('hide');
        },
        step3: function () {
            $('[step-attribute=step1]').addClass('hide');
            $('[step-attribute=step2]').addClass('hide');
            $('.step3wrap').removeClass('hide');
        },
        step4: function () {
            $('[step-attribute=step1]').addClass('hide');
            $('[step-attribute=step3]').addClass('hide');
            $('[step-attribute=step2]').removeClass('hide');
            $('.download-content').removeClass('hide');
            $(BODY.$upload).addClass('hide');
            $('#upload-content').addClass('upload-dashed');
            $('#download-content').addClass('download-dashed');
        }
    };
};

function SetAnimationUtils() {
    var speedmeter = document.querySelector('.meter-fill'),
        spd_pointer = document.querySelector('.spd_ptr'),
        flag__first_dwld = false,
        flag__first_upld = false,
        testParams = null;
    defaultParams = {
        dw_interval: null,
        up_interval: null,
        dw_time: 0,
        up_time: 0,
        dw_spend: 0,
        up_spend: 0,
        dw_i: 0,
        up_i: 0,
        dw_done: false,
        up_done: false,
    };

    window.spParams = Object.assign({}, defaultParams);

    function downloadAction(speed) {
        if (!flag__first_dwld) {
            $(speedmeter).css({
                stroke: '#7fc753',
            });
            resetAnimation();

            flag__first_dwld = true;

        }
        setTimerCommon();

    }

    function uploadAction(speed) {
        if (!flag__first_upld) {
            setTimeout(function () {
                callUploadTimer(speed);
            }, 0);
            flag__first_upld = true;
        }
    }

    function setTimerCommon() {
        $(BODY.$stepone).addClass('hide');
        $(BODY.$steptwo).removeClass('hide');
    }

    function resetAnimation() {

    }

    function resetEverything() {

        flag__first_dwld = false;
        flag__first_upld = false;
        resetAnimation();
        window.spParams = Object.assign({}, defaultParams);
        // spParams.up_done = true;
    }

    function completeTest() {
        if (testParams) {
            $('.dw_spd').text(testParams.download);
            $('.up_spd').text(testParams.upload);
            $('.pn_spd').text(testParams.latency);
            $('.jtr_spd').text(testParams.jitter);
        }
        resetEverything();
        setTimeout(() => {
            steps().step3();
        }, 1 * 2000);

    }

    function callUploadTimer(speed) {
        $(BODY.$download).addClass('hide');
        $(BODY.$upload).removeClass('hide');
        $('#upload-content').removeClass('upload-dashed');
        $('.up_spd').text(speed);
    }

    return {

        downloadProgress: function (speed) {
            testParams = null;
            downloadAction(speed);
        },
        uploadProgress: function (speed) {
            spParams.dw_done = true;
            uploadAction(speed);
        },

        resetAnimationFlag: function (res) {
            testParams = res;
            spParams.up_done = true;
            completeTest();
        },
        errorHandler: function () {
            resetEverything();
            $('[step-attribute=step2]').addClass('hide');
            $('[step-attribute=step3]').addClass('hide');
            $('[step-attribute=step1]').removeClass('hide');
            $(BODY.$gotoStep).removeClass('hide');
            $(BODY.$loader).addClass('hide');
            $('.step2wrap, .step3wrap').hide();
            $('.step1wrap').fadeIn();
        }
    };

}

function speed_chk_start() {
    steps().step1();
    setTimeout(function () {
        startSpeedTest();
    }, 1 * 1000);
}

function customDate(date) {
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
            'December',
        ],
        wekdayName = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ];
    return (
        wekdayName[date.getDay() + 0] +
        ', ' +
        monthNames[date.getMonth() + 0] +
        ' ' +
        date.getDate()
    );
}

function changeTimeFormatTo12Hr(date) {
    var hours = date.getHours(),
        minutes =
            date.getMinutes() < 10
                ? '0' + date.getMinutes()
                : date.getMinutes();
    var unit = getMeridianFromHour(hours);
    hours = hours % 12;
    hours = hours == 0 ? 12 : hours;

    return {
        hours: hours,
        minutes: minutes,
        unit: unit,
    };
}

function getMeridianFromHour(hour) {
    hour = hour % 24;
    return hour < 12 ? 'am' : 'pm';
}

function updateCurrentDateTime() {
    var date = getCurrentTime();
    $('#custtime').html(escapeHtml(date.value + ' ' + date.unit));
    $('#custdate').html(escapeHtml(customDate(new Date())));
    $('.currenttime .sep').css('display', 'inline-block');
}

function getCurrentTime(val) {
    var date = val || new Date();
    var format = {
        value: '',
        unit: '',
    };
    var tempDate = changeTimeFormatTo12Hr(date);
    format.value = tempDate.hours + ':' + tempDate.minutes;
    format.unit = tempDate.unit;
    format.hours = tempDate.hours;
    format.minutes = tempDate.minutes;
    return format;
}

function displayLocationDetails(city, country, countryCode) {
    //$('.cnt_cd').text(countryCode);
}

function displayIspDetails(isp) {
    $('.nw').text(isp);
    $('.nw').attr('title', isp);
}

function displayIP(ip) {
    $('.ip_adr').text(ip);
    $('.ip_adr').attr('title', ip);
}


function getIPInfo() {
    var timeKey = 'ipsUpdateTime';
    var dataKey = 'ispData';

    var data = storageReplacer.getLocalStorageItem(dataKey);
    var lastUpdateTime = storageReplacer.getLocalStorageItem(timeKey);
    var curTime = new Date().getTime();
    var timeLapsed = curTime - lastUpdateTime;

    if (data && timeLapsed < 2 * 60 * 1000) {
        var info = JSON.parse(data);
        route(info);
    } else {
        updateIPInfo();
    }

    function route(ipInfo) {
        displayLocationDetails(ipInfo.city, ipInfo.country, ipInfo.countryCode);
        displayIspDetails(ipInfo.isp);
        displayIP(ipInfo.query);
    }

    function updateIPInfo() {
        var createCORSRequest = function (method, url) {
            var xhr = new XMLHttpRequest();
            if ('withCredentials' in xhr) {
                xhr.open(method, url, true);
            } else if (typeof XDomainRequest != 'undefined') {
                xhr = new XDomainRequest();
                xhr.open(method, url);
            } else {
                xhr = null;
            }
            return xhr;
        };
        var url = specificConstants.API + 'getISPInfo';
        var method = 'GET';
        var xhr = createCORSRequest(method, url);
        xhr.onload = function () {
            var rawResponse = xhr.response;
            var resp = JSON.parse(rawResponse);
            storageReplacer.removeLocalStorageItem(timeKey);
            storageReplacer.removeLocalStorageItem(dataKey);
            storageReplacer.setLocalStorageItem(timeKey, new Date().getTime());
            storageReplacer.setLocalStorageItem(dataKey, rawResponse);
            route(resp);
        };
        xhr.onerror = function (error) {
            //console.log(error);
        };
        xhr.send();
    }
}

function startSpeedTest() {
    downloadSmoothing = [];
    uploadSmoothing = [];
    setAnimationUtils && setAnimationUtils.resetAnimationFlag();
    startStop();
    setAnimationUtils && setAnimationUtils.resetAnimationFlag();
}

var downloadSmoothing = [];
var uploadSmoothing = [];

function getBrowserInfo() {
    function browserInfo() {
        return 'Firefox';
    }

    var browserName = browserInfo();
    if (browserName) {
        $('.newtab2 .ip_top .li2 .bws').text(browserName);
        $('.newtab1 .ip_top .li2 span').text(browserName);
    }
}

getBrowserInfo();

var acceptButton = $('.acceptTerms');
var allowWidget = $('.allow-widget');
var acceptTerm = $('.accept-prompt');
var denyTerms = $('.know-more');
var piiAccept = 'piiAccept';
acceptButton.on('click', function (e) {
    chrome.runtime.sendMessage(
        {task: 'showOptInPage'},
        function (response) {
        }
    );
    // document.dispatchEvent(new Event('showOptInPage'));
});

denyTerms.on('click', function (e) {
    closePiiWidget();
});

var widgetElement = $('.link-out');

widgetElement.on('click', function (e) {
    checkPiiStored();
});

function checkPiiStored() {
    var accepted = storageReplacer.getLocalStorageItem('piiAccept');
    if (accepted && accepted == 1) {
        getIPInfo();
        allowWidget.show();
        acceptTerm.hide();

        document.dispatchEvent(
            new CustomEvent('PiiAccept', {
                detail: true
            })
        );
    } else if (!accepted || accepted == -1) {
        allowWidget.hide();
        acceptTerm.show();

        document.dispatchEvent(
            new CustomEvent('PiiAccept', {
                detail: false
            })
        );
    }
}

function closePiiWidget() {
    try {
        document.dispatchEvent(new Event('searchTextChanged'));
        document.dispatchEvent(
            new CustomEvent('PiiAccept', {
                detail: 'cancel'
            })
        );
    } catch (e) {
        console.log(e);
    }
}

var widgetCustFeature = WidgetCustomFeatures();
var firstTimeNTOpen = FirstTimeNTOpen();
var addUtilsForActions = AddUtilsForActions();


document.addEventListener('DOMContentLoaded', function () {
    storageReplacer.init().then(function () {
        setInterval(updateCurrentDateTime, 1000);
        allowWidget.hide();
        checkPiiStored();
        // calling first time nt open actions
        firstTimeNTOpen.init();
        // calling nt init actions
        addUtilsForActions.init();
    });
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (let [key, {oldValue, newValue}] of Object.entries(changes)) {
        if (key === 'piiAccept' && newValue === '1') {
            allowWidget.show();
            acceptTerm.hide();
            getIPInfo();

            $('[n-widgetaction=linkout1],[n-widgetclick=linkout1]').removeClass(
                'activeParent'
            );

            document.dispatchEvent(
                new CustomEvent('PiiAccept', {
                    detail: true
                })
            );
        } else if (key === 'piiAccept' && newValue === '-1') {
            allowWidget.hide();
            acceptTerm.show();

            document.dispatchEvent(
                new CustomEvent('PiiAccept', {
                    detail: false
                })
            );
        }
    }
});


function WidgetCustomFeatures() {
    return {
        widgetClose: function () {
            window.widgetFeature &&
            widgetFeature.removeClass(
                document.querySelectorAll(
                    '[n-widgetaction],[n-widgetclick]'
                ),
                'active'
            );
        },
        widgetToggle: function () {
            window.widgetFeature &&
            widgetFeature.toggleClass(
                document.querySelectorAll(
                    "[n-widgetaction='main'],[n-widgetclick='main']"
                ),
                'active'
            );
        },
        widgetOpen: function () {
            window.widgetFeature &&
            widgetFeature.firstLoadRender(function (res) {
                if (res) {
                    $('.main-content .search-text').focus();
                }
            });
        },
    };
}

function FirstTimeNTOpen() {
    window.kcVisibleFlag = false;

    function searchTextWidgetHandler() {
        document.addEventListener('searchTextChanged', function () {
            widgetCustFeature && widgetCustFeature.widgetClose();
        });
    }

    return {
        init: function () {
            searchTextWidgetHandler();
        },
    };
}

function AddUtilsForActions() {
    function _getUrlParam(_url, _param) {
        var vars = {};
        _url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
            key = decodeURIComponent(key);
            value = decodeURIComponent(value);
            if (key && value) {
                vars[key] = value;
            }
        });
        if (!!vars[_param]) {
            return vars[_param];
        }
        return null;
    }

    return {
        init: function () {
            $('#speed_chk_start_id').on('click', function () {
                speed_chk_start();
            });
            $('.test-again-btn').on('click', function () {
                steps().step4();
                speed_chk_start();
            });
            $('#isp-km-btn').on('click', function () {
                widgetCustFeature && widgetCustFeature.widgetClose();
                var _url = $('#isp-km-btn').attr('href');
                var vars = _getUrlParam(_url, 'netinfo');
            });
        },
    };
}
