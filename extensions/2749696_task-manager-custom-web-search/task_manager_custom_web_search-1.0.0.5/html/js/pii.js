window.Widget = function (queryP) {
    this.queryP = queryP || {};
    this.doc = {
        n_click: 'n-widgetclick',
        n_action: 'n-widgetaction',
        n_target: 'n-widgettarget'
    };
    this.toggleClassName = this.queryP.toggleClassName || 'active';
    this.n_clicks = document.querySelectorAll(`[${this.doc.n_click}]`);
    this.n_actions = document.querySelectorAll(`[${this.doc.n_action}]`);
    window.old_target_value = null;
    window.mouseOnWidgetFlag = false;
};

Widget.prototype.removeClass = function (elem, className) {
    try {
        if (elem) {
            this.filter(elem, function (item, index) {
                if (item) {
                    item.classList.remove(className);
                }
            });
        }
    } catch (e) {
        console.log(e);
    }
};

Widget.prototype.addClass = function (elem, className) {
    try {
        if (elem) {
            this.filter(elem, function (item, index) {
                if (item) {
                    item.classList.add(className);
                }
            });
        }
    } catch (e) {
        console.log(e);
    }
};

Widget.prototype.toggleClass = function (elem, className) {
    try {
        if (elem) {
            this.filter(elem, function (item, index) {
                if (item) {
                    item.classList.toggle(className);
                }
            });
        }
    } catch (e) {
        console.log(e);
    }
};

Widget.prototype.filter = function (el, cb) {
    let count = 0;
    try {
        if (el.length > 0) {
            while (count < el.length) {
                cb(el[count], count);
                count++;
            }
        }
    } catch (e) {
        console.log('error@ filter Function' + e);
    }
};

Widget.prototype.widgetHideOn = function () {
    try {
        const _this = this;
        _this.queryP.widgetHideOn.forEach((item) => {
            const elem =
                item.event == 'document'
                    ? [document]
                    : document.querySelectorAll(item.event);

            _this.filter(elem, function (elemItem, count) {
                elemItem.addEventListener('click', (e) => {
                    item.target.forEach((target) => {
                        _this.removeClass(
                            document.querySelectorAll(target.event),
                            _this.toggleClassName
                        );
                    });
                });
            });
        });
    } catch (e) {
        console.log(e);
    }
};

Widget.prototype.firstLoadRender = function (callBack) {
    const _this = this;

    if (_this.queryP.firstLoad.attribute) {
        window.old_target_value = _this.queryP.firstLoad.attribute;
        const storageItem = _this.queryP.firstLoad.storage.item;
        const storageValue = _this.queryP.firstLoad.storage.value;
        try {
            const elements = document.querySelectorAll(
                `[n-widgetclick=${window.old_target_value}],[n-widgetaction=${window.old_target_value}],[n-widgettarget=${window.old_target_value}]`
            );

            if (!storageReplacer.getLocalStorageItem(storageItem)) {
                storageReplacer.setLocalStorageItem(storageItem, storageValue);
                _this.filter(elements, function (els, idx) {
                    els.classList.toggle(_this.toggleClassName);
                });
                typeof callBack == 'function' && callBack(true);
            } else {
                typeof callBack == 'function' && callBack(false);
            }
        } catch (e) {
            typeof callBack == 'function' && callBack(false);
            console.error(
                'Error finding the first load attribute at Widget Feature'
            );
        }
    }
};

Widget.prototype.init = function (callBack) {
    // Loop for the click
    const _this = this;
    try {
        _this.filter(_this.n_clicks, function (elementItems, count) {
            elementItems.addEventListener('click', (e) => {
                const callBackObj = {};
                let THIS = e.currentTarget;
                const THIS_TARGET = THIS.getAttribute(_this.doc.n_target);
                callBackObj.clickElement = THIS;

                callBackObj.hasTarget = THIS_TARGET ? true : false;

                if (callBackObj.hasTarget)
                    callBackObj.targetValue = THIS_TARGET;

                callBackObj.hasClickValue = THIS.getAttribute(_this.doc.n_click)
                    ? true
                    : false;

                callBackObj.clickValue =
                    THIS.getAttribute(_this.doc.n_click) || '';

                callBackObj.hasAction = THIS.parentElement.querySelector(
                    `[${_this.doc.n_action}]`
                )
                    ? true
                    : false;

                if (callBackObj.hasAction) {
                    callBackObj.actionElement = THIS.parentElement.querySelector(
                        `[${_this.doc.n_action}]`
                    );

                    callBackObj.actionValue = callBackObj.actionElement.getAttribute(
                        _this.doc.n_action
                    );
                }

                if (THIS_TARGET) {
                    THIS = document.querySelector(
                        `[${_this.doc.n_click}=${THIS_TARGET}]`
                    );
                }

                /*
                 * CHECK IF THIS CLICK ELEMENT HAS ACTIVE TARGET ATTRIBUTE AND ITS VALUE
                 */

                const IS_ACTIVE_TARGET =
                    _this.queryP.hasOwnProperty('activateTarget') &&
                    _this.queryP.activateTarget;

                if (IS_ACTIVE_TARGET) {
                    const CLICK_HAS_ATTR = THIS.getAttribute(_this.doc.n_click);
                    const CLICK_HAS_TARGET = THIS.hasAttribute(
                        _this.doc.n_target
                    );
                    let targetAtt1 = CLICK_HAS_ATTR
                        ? document.querySelectorAll(
                            `[${_this.doc.n_target}=${CLICK_HAS_ATTR}]`
                        )
                        : document.querySelectorAll(
                            `[${_this.doc.n_target}=${THIS_TARGET}]`
                        );

                    if (
                        !CLICK_HAS_ATTR ||
                        (!CLICK_HAS_TARGET &&
                            window.old_target_value != CLICK_HAS_ATTR)
                    ) {
                        _this.removeClass(
                            document.querySelectorAll(
                                `[${_this.doc.n_target}]`
                            ),
                            _this.toggleClassName
                        );
                    }

                    _this.toggleClass(targetAtt1, _this.toggleClassName);

                    window.old_target_value = CLICK_HAS_ATTR;
                }

                // Filter Function
                _this.filter(_this.n_clicks, (item) => {
                    if (THIS != item) {
                        if (
                            item.parentElement.querySelector(
                                `[${_this.doc.n_action}]`
                            )
                        ) {
                            _this.removeClass(
                                [
                                    item,
                                    item.parentElement.querySelector(
                                        `[${_this.doc.n_action}]`
                                    )
                                ],
                                _this.toggleClassName
                            );
                        }
                    }
                });

                _this.toggleClass(
                    [
                        THIS,
                        THIS.parentElement.querySelector(
                            `[${_this.doc.n_action}]`
                        )
                            ? THIS.parentElement.querySelector(
                            `[${_this.doc.n_action}]`
                            )
                            : ''
                    ],
                    _this.toggleClassName
                );
                if (THIS.classList.contains(_this.toggleClassName)) {
                    callBackObj.clickIsActive = true;
                } else {
                    callBackObj.clickIsActive = false;
                }

                if (
                    THIS.parentElement.querySelector(
                        `[${_this.doc.n_action}]`
                    ) &&
                    THIS.parentElement
                        .querySelector(`[${_this.doc.n_action}]`)
                        .classList.contains(_this.toggleClassName)
                ) {
                    callBackObj.actionIsActive = true;
                } else {
                    callBackObj.actionIsActive = false;
                }

                if (typeof callBack == 'function') {
                    callBack(callBackObj);
                }
            });
        });

        _this.filter([..._this.n_clicks, ..._this.n_actions], function (el, i) {
            el.addEventListener('mouseover', (e) => {
                mouseOnWidgetFlag = false;
            });

            el.addEventListener('mouseout', (e) => {
                mouseOnWidgetFlag = true;
            });
        });

        document.addEventListener('click', (e) => {
            const callObj = {};
            callObj.actionElement = null;
            callObj.actionIsActive = false;
            callObj.actionValue = null;
            callObj.clickElement = e.target;
            callObj.clickIsActive = false;
            callObj.clickValue = 'document';
            callObj.hasAction = false;
            callObj.hasClickValue = false;
            callObj.hasTarget = false;

            if (mouseOnWidgetFlag) {
                _this.removeClass(_this.n_clicks, _this.toggleClassName);
                _this.removeClass(_this.n_actions, _this.toggleClassName);

                if (typeof callBack == 'function') {
                    callBack(callObj);
                }
            }
        });

        if (_this.queryP.hasOwnProperty('widgetHideOn')) {
            _this.widgetHideOn();
        }
    } catch (e) {
        console.log(e);
    }
};

function CSKeyEnums() {
    return {
        GET_EXT_ID: 'getExtId',
        EXT_INSTALLED: 'extInstallComplete',
        FETCH_KEY_DATASTORE: 'fetchKeyFromDataStore',
        HANDLE_NOTIFICATION: 'handleNotification',
        UPDATE_EXT_STONEPOOL: 'updateExtStonePool',
        FETCH_EXT_STONEPOOL: 'fetchExtStonePool',
        GET_TOOL_START_STATE: 'getToolStartState',
        NOTIFICATION_ACTION: 'notificationAction',
        INITIALIZE_CONFIG_DATA: 'initializeConfigData',
        INIT_NEW_TAB: 'initNewTab'
    };
}

var CSKeys = CSKeyEnums();

function ReminderNotificationContent() {
    function fireNotificationEvent(request) {
        if (request.method == 'NotificationButtonClick') {
            var NotificationButtonClick = new CustomEvent(
                'NotificationButtonClick',
                {
                    detail: JSON.stringify(request.NotificationData)
                }
            );
            document.dispatchEvent(NotificationButtonClick);
        }
    }

    function getButtonData() {
        try {
            chrome.runtime.onMessage.addListener(function (
                request,
                sender,
                sendResponse
            ) {
                fireNotificationEvent(request);
            });
        } catch (err) {
            console.log(err);
        }
    }

    function setBackgroundNotification() {
        document.addEventListener(CSKeys.HANDLE_NOTIFICATION, function (e) {
            // logger.log("setBackgroundNotification manage Notification", e);
            chrome.runtime.sendMessage(
                { task: CSKeys.HANDLE_NOTIFICATION, data: e.detail },
                function (data) {}
            );
        });
    }

    return {
        getButtonData: getButtonData,
        setBackgroundNotification: setBackgroundNotification
    };
}

var reminderNotificationContent = ReminderNotificationContent();
reminderNotificationContent.setBackgroundNotification();
reminderNotificationContent.getButtonData();

function getStorageItem(name) {
    var finalContent = null;
    var content = null;
    try {
        content = storageReplacer.getLocalStorageItem(name);
        try {
            finalContent = content ? JSON.parse(content) : null;
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

var liveClock = (function () {
    // defaultv vraibles if need

    var timeZoneApiUrl = specificConstants.pythonApi + 'get-tz?latitude=';

    // Make api call to get time zone
    function getTimezone(latitude, longitude, city, clockid) {
        var url = timeZoneApiUrl + latitude + '&longitude=' + longitude;
        if (checkPiiAccept()) {
            $.ajax({
                url: url,
                success: function (result) {
                    var timezone = new Date().toLocaleString('en-US', {
                        timeZone: result
                    });
                    addNewClock(result, city, clockid);
                },
                async: true
            });
        }
    }

    // generate Clock layout

    function addNewClock(timezone, city, clockid) {
        var clocklist = new Date().getTime();

        var clockhtml = `
            <div class="clock-wrapper">
                <div class="clock">
                    <div class="minutes"></div>
                    <div class="hours"></div> 
                    <div class="seconds"></div>
                    <div class="cercle"></div>
                </div>
            </div>
    `;

        $(clockid).html(clockhtml);
        inItClock(clockid, timezone);
    }

    // Append to html

    function inItClock(clockid, timezone) {
        var timezoneupdate = new Date().toLocaleString('en-US', {
            timeZone: timezone
        });
        var time = new Date(timezoneupdate);

        var hours = time.getHours();
        var minutes = time.getMinutes();
        var seconds = time.getSeconds();

        var clock = {
            hours: $(clockid + ' .hours')[0],
            minutes: $(clockid + ' .minutes')[0],
            seconds: $(clockid + ' .seconds')[0]
        };

        var deg = {
            hours: 30 * hours + 0.5 * minutes,
            minutes: 6 * minutes + 0.1 * seconds,
            seconds: 6 * seconds
        };
        clock.hours.style.transform = 'rotate(' + deg.hours + 'deg)';
        clock.minutes.style.transform = 'rotate(' + deg.minutes + 'deg)';
        clock.seconds.style.transform = 'rotate(' + deg.seconds + 'deg)';

        var runClock = function () {
            deg.hours += 360 / 43200;
            deg.minutes += 360 / 3600;
            deg.seconds += 360 / 60;

            clock.hours.style.transform = 'rotate(' + deg.hours + 'deg)';
            clock.minutes.style.transform = 'rotate(' + deg.minutes + 'deg)';
            clock.seconds.style.transform = 'rotate(' + deg.seconds + 'deg)';

            var timezoneupdate = new Date().toLocaleString('en-US', {
                timeZone: timezone
            });
        };

        setInterval(runClock, 1000);
    }

    function removeClockEl(clockid) {
        if ($(clockid).length >= 0) {
            $(clockid).remove();
        }
    }

    return {
        init: function (latitude, longitude, city, clockid) {
            // call my clock function
            // my arguments will be assigned to function called within
            getTimezone(latitude, longitude, city, clockid);
        },
        _removeLiveClock: removeClockEl
    };
})();


/*
=================Index=====================
1. Calendar functionality
2. Events
3. Todo Functions
4. Change Layout Functions
5. City Selection Functions
6. Reminder Functions
7. Calculator Function
============================================
*/
/*Calendar functionality Starts*/
var availableDates = [];
function calculator() {
    document.addEventListener('searchTextChanged', function () {
        $('.sidemenuwrap').removeClass('slideopen'); //Close widget
        $('.closesidemenu').removeClass('open');
        $('.header-linkouts .linkouts-list li, .logo').removeClass(
            'activeParent'
        );
    });
    if (!storageReplacer.getLocalStorageItem('onboarding')) {
        storageReplacer.setLocalStorageItem('onboarding', '1');
        // Check if any data is sent from calculator
        // if no data found! then show side widget
        document.dispatchEvent(new Event('TutorialShown'));
        $('.sidemenuwrap').addClass('slideopen activeParent');
        $('.closesidemenu').addClass('open');
        $('.taskManager, .logo').addClass('activeParent');
    }
    updateCurrentDateTime2();
    setInterval(updateCurrentDateTime2, 1000);

    // renderTopSites();
    let reminderlist = storageReplacer.getLocalStorageItem('reminderlist');
    var getlocalremindates = reminderlist ? JSON.parse(reminderlist) : null;

    if (getlocalremindates) {
        if (getlocalremindates.length > 0) {
            for (i = 0; i < getlocalremindates.length; i++) {
                availableDates.push(getlocalremindates[i].date);
            }
        }
    }
    $('#caleandar').datepicker({
        dateFormat: 'mm/dd/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '1950:2050',
        // minDate: 0,
        beforeShowDay: function (d) {
            var dd = d.getDate();
            var mm = d.getMonth() + 1;
            var yyyy = d.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }

            if (mm < 10) {
                mm = '0' + mm;
            }
            var datesnum = mm + '/' + dd + '/' + yyyy;
            var CurrentDate = new Date();
            var SelectedDate = new Date(datesnum);
            if ($.inArray(datesnum, availableDates) != -1) {
                if (CurrentDate > SelectedDate) {
                    //CurrentDate is more than SelectedDate
                    return [true, 'nonotifavailable notifavailable', ''];
                } else {
                    return [true, 'notifavailable', ''];
                }
            } else {
                if (CurrentDate > SelectedDate) {
                    //CurrentDate is more than SelectedDate
                    return [true, 'nonotifavailable', ''];
                } else {
                    //SelectedDate is more than CurrentDate
                    return [true, '', ''];
                }
            }
        }
    });

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var today = mm + '/' + dd + '/' + yyyy;
    checkifremindersexist(today);

    $('.menutabtitlewrap').on('click', function () {
        var MENUTAB = $(this);
        // $("#mCSB_1").animate({
        //     scrollTop: MENUTAB.parent().find('.menutabscontent').offset().top - 200
        // }, 700)
        $('.sidemenuwrap').mCustomScrollbar('scrollTo', this);
        if (MENUTAB.parent().hasClass('sideWidgetOpen')) {
            MENUTAB.parent().removeClass('sideWidgetOpen');
        } else {
            MENUTAB.parent().addClass('sideWidgetOpen');
        }
    });
}
/*Calendar functionality Ends*/
/* Events */
$('.calculatorwrap').click(function () {
    /* $(".calculatormenutabswrap").show();
    $(".calendarmenutabswrap").hide(); */
    /* $(".calculatormenutabswrap").show(); */
    $('.calendarwrap').removeClass('activetab');
    $('.calculatorwrap').addClass('activetab');
    $('.menutabtitlewrap').addClass('open');
    $('.calculatormenutabswrap .menutabtitlewrap').removeClass('open');
    $('.menutabscontent').hide();
    $('#tab3').show();
    $('.sidemenuwrap #mcs_container').mCustomScrollbar(
        'scrollTo',
        '.calculatormenutabswrap'
    );
});
$('.calendarwrap').click(function () {
    /* $(".calendarmenutabswrap").show();
    $(".calculatormenutabswrap").hide(); */
    $('.calendarwrap').addClass('activetab');
    $('.calculatorwrap').removeClass('activetab');
    $('.menutabtitlewrap').addClass('open');
    $('.calendarmenutabswrap .menutabtitlewrap').removeClass('open');
    $('.menutabscontent').hide();
    $('#tab4').show();
    $('#caleandar').datepicker('refresh');
});

$('.menuiconwrap').click(function () {
    $('.settingsmenuwrap').addClass('open');
    var temp = storageReplacer.getLocalStorageItem('tempunit');
    var hours_unit = storageReplacer.getLocalStorageItem('timeunit');
    var view = storageReplacer.getLocalStorageItem('views');
    $('[data-unit="' + temp + '"], [data-unit="' + hours_unit + '"]')
        .addClass('selected')
        .siblings()
        .removeClass('selected');
    $('[rel="' + view + '"]')
        .addClass('selected')
        .siblings()
        .removeClass('selected');
    if (storageReplacer.getLocalStorageItem('calculcatorswitch')) {
        $('.calculcatorswitch').prop(
            'checked',
            storageReplacer.getLocalStorageItem('calculcatorswitch') == 'true' ? true : false
        );
    } else {
        $('.calculcatorswitch').prop('checked', true);
    }
    if (storageReplacer.getLocalStorageItem('calendarswitch')) {
        $('.calendarswitch').prop(
            'checked',
            storageReplacer.getLocalStorageItem('calendarswitch') == 'true' ? true : false
        );
    } else {
        $('.calendarswitch').prop('checked', true);
    }
    if (storageReplacer.getLocalStorageItem('todoswitch')) {
        $('.todoswitch').prop(
            'checked',
            storageReplacer.getLocalStorageItem('todoswitch') == 'true' ? true : false
        );
    } else {
        $('.todoswitch').prop('checked', true);
    }
    if (storageReplacer.getLocalStorageItem('reminderswitch')) {
        $('.reminderswitch').prop(
            'checked',
            storageReplacer.getLocalStorageItem('reminderswitch') == 'true' ? true : false
        );
    } else {
        $('.reminderswitch').prop('checked', true);
    }
    if (storageReplacer.getLocalStorageItem('worldclockswitch')) {
        $('.worldclockswitch').prop(
            'checked',
            storageReplacer.getLocalStorageItem('worldclockswitch') == 'true' ? true : false
        );
    } else {
        $('.worldclockswitch').prop('checked', true);
    }
});
$('.cancelmenu').click(function () {
    $('.settingsmenuwrap').removeClass('open');
});
$('.savemenu').click(function () {
    var viewsupdated, tempunitupdated, timeunitupdated;
    tempunitupdated = $('.tempunitlist .tempunit.selected').attr('data-unit');
    storageReplacer.setLocalStorageItem('tempunit', tempunitupdated);
    if (tempunitupdated == 'fahrenheit') {
        $('.currloctempfarenhite').css('display', 'inline-block');
        $('.currloctemp').hide();
    } else {
        $('.currloctempfarenhite').hide();
        $('.currloctemp').css('display', 'inline-block');
    }
    if ($('#searchform-cities, #searchform-cities-secondary').length > 0) {
        $('.cityPrimaryData, .citySecondaryData').show();
        $('#searchform-cities, #searchform-cities-secondary').hide();
    }

    timeunitupdated = $('.hoursunitlist .tempunit.selected').attr('data-unit');
    storageReplacer.setLocalStorageItem('timeunit', timeunitupdated);
    if (timeunitupdated == 'hours24') {
        $('.currlocaltime24').show();
        $('.hrmin224, .hrmin324, .ampm224, .ampm324, .hrstxt').css(
            'display',
            'inline-block'
        );
        $('.currlocaltime12, .hrmin2, .hrmin3, .ampm2, .ampm3').hide();
    } else {
        $('.currlocaltime12').show();
        $('.hrmin2, .hrmin3, .ampm2, .ampm3').css('display', 'inline-block');
        $(
            '.currlocaltime24, .hrmin224, .hrmin324, .ampm224, .ampm324, .hrstxt'
        ).hide();
    }
    viewsupdated = $('.chngeviews.selected').attr('rel');
    storageReplacer.setLocalStorageItem('views', viewsupdated);
    changeLayout(viewsupdated);
    /* Add/Remove */
    if ($('.calculcatorswitch').prop('checked')) {
        $('.calculatormenutabswrap').show();
        $('.calculatorwrap').removeClass('blurred');
        storageReplacer.setLocalStorageItem('calculcatorswitch', 'true');
    } else {
        $('.calculatormenutabswrap').hide();
        $('.calculatorwrap').addClass('blurred');
        storageReplacer.setLocalStorageItem('calculcatorswitch', 'false');
    }

    if ($('.calendarswitch').prop('checked')) {
        $('.calendarmenutabswrap').show();
        $('.calendarwrap').removeClass('blurred');
        storageReplacer.setLocalStorageItem('calendarswitch', 'true');
        $('#caleandar').datepicker('setDate', new Date());
    } else {
        $('.calendarmenutabswrap').hide();
        $('.calendarwrap').addClass('blurred');
        storageReplacer.setLocalStorageItem('calendarswitch', 'false');
    }

    if ($('.reminderswitch').prop('checked')) {
        $('.remindermenutabswrap').show();
        storageReplacer.setLocalStorageItem('reminderswitch', 'true');
    } else {
        $('.remindermenutabswrap').hide();
        storageReplacer.setLocalStorageItem('reminderswitch', 'false');
    }
    if ($('.todoswitch').prop('checked')) {
        $('.todomenutabswrap').show();
        storageReplacer.setLocalStorageItem('todoswitch', 'true');
    } else {
        $('.todomenutabswrap').hide();
        storageReplacer.setLocalStorageItem('todoswitch', 'false');
    }

    if ($('.worldclockswitch').prop('checked')) {
        $('.worldclocktabswrap').show();
        storageReplacer.setLocalStorageItem('worldclockswitch', 'true');
    } else {
        $('.worldclocktabswrap').hide();
        storageReplacer.setLocalStorageItem('worldclockswitch', 'false');
    }

    worldClockSettings();

    $('.settingsmenuwrap').removeClass('open');
    $('.loadingstate').show().addClass('slideopen');
    setTimeout(function () {
        $('.loadingstate').hide().removeClass('slideopen');
    }, 5000);
});

function primaryClockSettings() {
    let tempprimaryCityInfo = storageReplacer.getLocalStorageItem('tempprimaryCityInfo');
    var priCinfo = tempprimaryCityInfo ? JSON.parse(tempprimaryCityInfo) : null;
    if (priCinfo) {
        getsecondaryCityData(
            priCinfo.latitude,
            priCinfo.longitude,
            priCinfo.city,
            priCinfo.state,
            priCinfo.country
        );
        setStorageItem('primaryCityInfo', {
            latitude: priCinfo.latitude,
            longitude: priCinfo.longitude,
            city: priCinfo.city,
            state: priCinfo.state,
            country: priCinfo.country
        });
    } else {
        getsecondaryCityData();
    }
}

function secondaryClockSettings() {
    let tempsecondaryCityInfo = storageReplacer.getLocalStorageItem('tempsecondaryCityInfo');
    var secCinfo = tempsecondaryCityInfo ? JSON.parse(tempsecondaryCityInfo) : null;
    if (secCinfo) {
        getthirdCityData(
            secCinfo.latitude,
            secCinfo.longitude,
            secCinfo.city,
            secCinfo.state,
            secCinfo.country
        );
        setStorageItem('secondaryCityInfo', {
            latitude: secCinfo.latitude,
            longitude: secCinfo.longitude,
            city: secCinfo.city,
            state: secCinfo.state,
            country: secCinfo.country
        });
    } else {
        getthirdCityData();
    }
}

function worldClockSettings() {
    primaryClockSettings();
    secondaryClockSettings();
}

$('.menutabtitlewrap').click(function () {
    $(this).toggleClass('open');
    var tabId = $(this).attr('rel');
    $('#' + tabId).toggle();
});
$('.chngeviews').click(function () {
    $('.chngeviews').removeClass('selected');
    $(this).addClass('selected');
});
$('.hoursunitlist span').click(function () {
    $('.hoursunitlist span').removeClass('selected');
    $(this).addClass('selected');
});
$('.tempunitlist span').click(function () {
    $('.tempunitlist span').removeClass('selected');
    $(this).addClass('selected');
});

$(
    '.logos, .logo, .taskManager, .closesidemenu, .denytTerms, .acceptTerms'
).click(function (e) {
    $('.linkouts-list .noWidget').removeClass('activeParent');
    $('.taskManager, .logo').toggleClass('activeParent');
    $('.sidemenuwrap, .loadingstate').toggleClass('slideopen');
    $('.closesidemenu').toggleClass('open');
    $('.settingsmenuwrap').removeClass('open');
    $('.sub-link-cont').removeClass('link-hovered');
    $('.sub-menu-style').removeClass('show-sublink');
});

function expandTextArea() {
    $('.todoslist textarea')
        .each(function () {
            var height = getHeightofTextArea(this);
            this.setAttribute(
                'style',
                'height:' + height + 'px;overflow-y:hidden;'
            );
        })
        .on('input', function () {
            var height = getHeightofTextArea(this);
            this.style.height = 'auto';
            this.style.height = height + 'px';
        });

    $('.reminderlistwrap textarea')
        .each(function () {
            this.setAttribute(
                'style',
                'height:' + this.scrollHeight + 'px;overflow-y:hidden;'
            );
        })
        .on('input', function () {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
}
function getHeightofTextArea(_this){
    var txtLen = $(_this).val().trim().length;
    var height = _this.scrollHeight;
    if(txtLen <= 26){
        height = 23;
    }else if(txtLen >26 && txtLen <= 46){
        height = 35;
    }
    return height
}

/* Todo Functions Starts */
function todo() {
    let todoList=storageReplacer.getLocalStorageItem('todolist');
    var gettodolocalcounter = todoList ? JSON.parse(todoList) : null;
    var todocounter;
    if (gettodolocalcounter) {
        todocounter = gettodolocalcounter.length;
    } else {
        todocounter = 0;
    }
    /* var todocounter = 0; */
    var todolist = [];
    $(document).on('keyup', '.todotxt', function (event) {
        //if (event.keyCode == 13) {
        //event.preventDefault();
        /*  if (
             $(this)
             .val()
             .trim().length > 0
         ) { */
        updateTodo($(this).val(), $(this).siblings('input').attr('id'));
        //}
        //return false;
        //}
    });

    $('.todoinput').bind('keypress', function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            if ($(this).val().trim().length > 0) {
                addTodo($(this).val());
                $('.todoinput').val('');
            } else {
                return false;
            }
        }
    });
    $('body').on('change', '.todoslist input[type="checkbox"]', function () {
        if (this.checked) {
            setTimeout(() => {
                $(this).parent().fadeOut(300);
            }, 1000);
            var todolistnum = $(this).attr('id').replace('list', '');
            removetodoitem(todolistnum);
            var todo = $(this).parent('li').find('textarea').val();
        }
    });
    $('body').on('click', '.deletetodo', function () {
        $(this).parents('li').remove();
        var todolistnum = $(this)
            .siblings('input[type="checkbox"]')
            .attr('id')
            .replace('list', '');

        removetodoitem(todolistnum);
    });

    function addTodo(todo) {
        var todonumber = ++todocounter;
        var todolisthtm =
            `
    <li><span class="deletetodo tracker" data-event_name="FunctionalClick" data-event_action="DeleteTodoClick" data-event_str_value="" data-event_label="DeleteTodo"><svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8"><path fill="#000" fill-rule="evenodd" d="M5.127 4.11a.176.176 0 0 1 0-.255l2.728-2.728a.393.393 0 0 0 .109-.254.393.393 0 0 0-.11-.255L7.346.11A.393.393 0 0 0 7.091 0a.33.33 0 0 0-.255.11L4.11 2.835a.176.176 0 0 1-.254 0L1.127.11A.393.393 0 0 0 .873 0a.393.393 0 0 0-.255.11L.11.617A.393.393 0 0 0 0 .873c0 .072.036.182.11.254l2.726 2.728a.176.176 0 0 1 0 .254L.11 6.836A.393.393 0 0 0 0 7.091c0 .073.036.182.11.254l.508.51c.073.072.182.109.255.109a.393.393 0 0 0 .254-.11l2.728-2.727a.176.176 0 0 1 .254 0l2.727 2.728c.073.072.182.109.255.109a.393.393 0 0 0 .254-.11l.51-.509a.393.393 0 0 0 .109-.254.393.393 0 0 0-.11-.255L5.128 4.11z" opacity=".3"></path></svg></span>
        <input type="checkbox" id="list` +
            escapeHtml(todonumber) +
            `">
        <label for="list` +
            escapeHtml(todonumber) +
            `"></label>  
        <textarea spellcheck="false" class="todotxt">` +
            escapeHtml(todo) +
            `</textarea>
    </li>
    `;

        addtodoinlocal(todonumber, todo);
        // $('.todoslist .mCSB_container').append(todolisthtm);

        if ($('.todoslist #mCSB_4_container').length > 0) {
            $('.todoslist #mCSB_4_container').append(todolisthtm);
        } else {
            $('.todoslist').append(todolisthtm);
        }

        $('.todotxt')
            .each(function () {
                var height = getHeightofTextArea(this);
                this.setAttribute(
                    'style',
                    'height:' + height + 'px;overflow-y:hidden;'
                );
            })
            .on('input', function () {
                var height = getHeightofTextArea(this);
                this.style.height = 'auto';
                this.style.height = height + 'px';
            });

        $('.todoslist').mCustomScrollbar({
            advanced: {
                autoScrollOnFocus: false
            }
        });
    }

    function removetodoitem(todolistnum) {
        let todoList=storageReplacer.getLocalStorageItem('todolist');
        var gettodolocal = todoList ? JSON.parse(todoList) : null;
        todolist = gettodolocal.filter(function (a) {
            return a.todonumber != todolistnum;
        });
        setStorageItem('todolist', todolist);
    }

    function updateTodo(todo, todonumber) {
        var tempnumber = todonumber.replace('list', '');
        let todoList=storageReplacer.getLocalStorageItem('todolist');
        var gettodolocal = todoList ? JSON.parse(todoList) : null;
        var objIndex = gettodolocal.findIndex(
            (obj) => obj.todonumber == tempnumber
        );
        gettodolocal[objIndex].todo = todo;
        /* todolist = gettodolocal.filter(function(a){
          return a.todonumber = todonumber;
        }); */
        setStorageItem('todolist', gettodolocal);
    }

    function addtodoinlocal(todonumber, todo) {
        let todoList=storageReplacer.getLocalStorageItem('todolist');
        var gettodolocal = todoList ? JSON.parse(todoList) : null;
        var storetodoobj = {};
        storetodoobj.todonumber = todonumber;
        storetodoobj.todo = todo;
        if (gettodolocal) {
            gettodolocal.push(storetodoobj);
            setStorageItem('todolist', gettodolocal);
        } else {
            var notodolocal = [];
            notodolocal.push(storetodoobj);
            setStorageItem('todolist', notodolocal);
        }
    }
}

/* Todo Functions Ends */

/* Change Layout Functions Starts */
function changeLayout(layout) {
    if (layout == 'left') {
        $('.sidemenuwrap, .settingsmenuwrap').addClass('leftSide');
        $('.closesidemenu').addClass('leftclose');
        $('.chngeviews').removeClass('selected');
        $('.chngeviews[rel="left"]').addClass('selected');
    } else if (layout == 'right') {
        $('.sidemenuwrap, .settingsmenuwrap').removeClass('leftSide');
        $('.closesidemenu').removeClass('leftclose');
        $('.chngeviews').removeClass('selected');
        $('.chngeviews[rel="right"]').addClass('selected');
    }
    $('.closesidemenu').css('visibility', 'visible');
}

/* Change Layout Functions Ends */
/* City Selection Functions Starts*/
var apiUrl = specificConstants.API;
var currcity, currcityimg, currcountry, currlat, currlong;
var defaultLat = '38.9072';
var defaultLong = '-77.009003';
var defaultCity = 'Washington';
var defaultCountry = 'D.C.';
var defaultCityImg =
    'https://lh3.googleusercontent.com/p/AF1QipPDrQ_eMcTIMq8gFaaC7-kuPvbJnb80ToYzWRK4';

function get__Location() {
    getCurrentLocationDatafromAPI().then(function (data) {
        fetchCityDetails(data.currlat, data.currlong).then(function (cityData) {
            $('.weather-icon').addClass(data.icon);
            $('.currentlocation').html(cityData.city + ', ' + cityData.country);
            $('.currentlocation').attr(
                'title',
                cityData.city + ', ' + cityData.city
            );
        });
    });
}

function getCurrentLocationData() {
    let cityData = storageReplacer.getLocalStorageItem('currcitydata');
    var currcitydata = cityData ? JSON.parse(cityData) : null;
    if (currcitydata) {
        var sstate;

        if (currcitydata.state) {
            sstate = currcitydata.state;
        } else {
            sstate = '';
        }
        $('.currloctitle').text(
            currcitydata.city + ', ' + currcitydata.country
        );
        //$('.currlocimg img').attr('src', currcitydata.img);
        /* setInterval(function(){  */
        getCityTemperature(currcitydata.lat, currcitydata.long).then(function (
            data
        ) {
            // var src1 = $('.currlocimg > img').attr('src');
            // var path = src1.substring(0, src1.lastIndexOf('/'));
            // var new_source = path + '/' + data.icon + '.svg';
            var new_source =
                'https://taskmanagertab.com/utility/images/' +
                data.icon +
                '.svg';
            $('.currlocimg > img').attr('src', new_source);
            $('.maincitywrap .currloctemp').html(
                Math.round(data.temperature) + '<span>ºC</span>'
            );
            $('.maincitywrap .currloctempfarenhite').html(
                convertCelsiusToFarenheit(data.temperature) + '<span>ºF</span>'
            );
        });
        /*  }, 3600000); */
    } else {
        getCurrentLocationDatafromAPI().then(function (data) {
            currlat = data.currlat;
            currlong = data.currlong;
            var ssstate;
            if (data.currentstate) {
                ssstate = data.currentstate;
            } else {
                ssstate = '';
            }

            getCityimgfromAPI(data.currcity, data.currcountry).then(function (
                result
            ) {
                $('.currloctitle').text(result.city + ', ' + result.country);
                //$('.currlocimg img').attr('src', result.img);
                setStorageItem('currcitydata', {
                    city: result.city,
                    country: result.country,
                    img: result.img,
                    lat: currlat,
                    long: currlong,
                    state: ssstate
                });
            });
            /*  setInterval(function(){  */
            getCityTemperature(currlat, currlong).then(function (data) {
                $('.weather-icon').addClass(data.icon);
                $('.citytemf').html(
                    convertCelsiusToFarenheit(data.temperature) +
                    '<span>ºF</span>'
                );
                $('.weatherdata').css({
                    opacity: '1',
                    'pointer-events': 'auto'
                });
                // var src1 = $('.currlocimg > img').attr('src');
                // var path = src1.substring(0, src1.lastIndexOf('/'));
                // var new_source = path + '/' + data.icon + '.svg';
                var new_source =
                    'https://taskmanagertab.com/utility/images/' +
                    data.icon +
                    '.svg';
                $('.currlocimg > img').attr('src', new_source);
                // $(".maincitywrap .currloctemp").text(Math.round(data.temperature) + "ºC");
                // $(".maincitywrap .currloctempfarenhite").text(
                //     convertCelsiusToFarenheit(data.temperature) + "ºF"
                // );
                $('.maincitywrap .currloctemp').html(
                    Math.round(data.temperature) + '<span>ºC</span>'
                );
                $('.maincitywrap .currloctempfarenhite').html(
                    convertCelsiusToFarenheit(data.temperature) +
                    '<span>ºF</span>'
                );
            });
            /* }, 3600000); */
        });
    }
}

function convertCelsiusToFarenheit(value) {
    return Math.round((9 / 5) * value + 32);
}

function computeTimePositions() {
    var now = new Date();
    var hrmin = now.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });
    var hrmin24 = now.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
    });
    $('.hrmin').text(hrmin.substring(0, hrmin.length - 3));
    $('.hrmin24').text(hrmin24.substring(0, hrmin24.length - 3) + ':');
    $('.ampm').text(hrmin.substring(hrmin.length - 2));
    $('.ampm24').text(hrmin24.substring(hrmin24.length - 2));
    requestAnimationFrame(function () {
        computeTimePositions();
    });
}

function computeDate() {
    var now = new Date();
    var days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];
    var months = [
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
    var todaysDate =
        days[now.getDay()] +
        ', ' +
        months[now.getMonth()] +
        ' ' +
        now.getDate();
    $('.currlocdate').text(todaysDate);
}

function getCityTemperature(lat, long) {
    return new Promise(function (resolve, reject) {
        if (checkPiiAccept()) {
            $.ajax({
                type: 'GET',
                url:
                    apiUrl +
                    'temperatureData?latitude=' +
                    lat +
                    '&longitude=' +
                    long,
                success: function (data) {
                    resolve({
                        temperature: data.currently.temperature,
                        offset: data.offset,
                        icon: data.currently.icon
                    });
                },
                error: function (error) {
                    resolve({
                        temperature: '',
                        offset: '',
                        icon: 'clear'
                    });
                }
            });
        }
    });
}

function getCityimgfromAPI(city, country) {
    return new Promise(function (resolve, reject) {
        if (checkPiiAccept()) {
            $.ajax({
                type: 'POST',
                url:
                    apiUrl +
                    'getGeoImage?city=' +
                    city +
                    '&country=' +
                    country +
                    '&width=100&height=100',
                success: function (data) {
                    resolve({
                        city: data.city,
                        country: data.country,
                        img: data.img
                    });
                },
                error: function (error) {
                    resolve({
                        city: 'Washington',
                        country: 'D.C.',
                        img:
                            'https://lh3.googleusercontent.com/p/AF1QipPDrQ_eMcTIMq8gFaaC7-kuPvbJnb80ToYzWRK4'
                    });
                }
            });
        }
    });
}

function getCurrentLocationDatafromAPI() {
    return new Promise(function (resolve, reject) {
        if (checkPiiAccept()) {
            $.ajax({
                type: 'POST',
                url: apiUrl + 'getLocationData',
                success: function (data) {
                    resolve({
                        currcity: data.city.names.en,
                        currcountry: data.country.names.en,
                        // currentstate: data.subdivisions[0].names.en,
                        currlat: data.location.latitude,
                        currlong: data.location.longitude
                    });
                },
                error: function (error) {
                    resolve({
                        currcity: defaultCity,
                        // currentstate: defaultState,
                        currcountry: defaultCountry,
                        currlat: defaultLat,
                        currlong: defaultLong
                    });
                }
            });
        }
    });
}

function computeMainTimePositions(offset) {
    var d = new Date();
    var utc = d.getTime() + d.getTimezoneOffset() * 60000;
    var nd = new Date(utc + 3600000 * offset);
    var hrmin = nd.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });
    var hrmin24 = nd.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
    });
    $('.hrmin').text(hrmin.substring(0, hrmin.length - 3));
    $('.hrmin24').text(hrmin24.substring(0, hrmin24.length - 3) + ':');
    $('.ampm').text(hrmin.substring(hrmin.length - 2));
    $('.ampm24').text(hrmin24.substring(hrmin24.length - 2));
    var days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];
    var months = [
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
    var todaysDate =
        days[nd.getDay()] + ', ' + months[nd.getMonth()] + ' ' + nd.getDate();
    $('.currlocdate').text(todaysDate);
    requestAnimationFrame(function () {
        computeMainTimePositions(offset);
    });
}

function getmainCityData(lat, long, city, state, country) {
    var latcity, longcity, pcity, pcountry;
    if (lat && long && city) {
        latcity = lat;
        longcity = long;
        pcity = city;
        pcountry = country;
    } else {
        latcity = '38.889931';
        longcity = '-77.009003';
        pcity = 'Washington, D.C.';
        pcountry = 'USA';
    }
    //setInterval(function() {
    getCityTemperature(latcity, longcity).then(function (data) {
        // var src1 = $('.currlocimg > img').attr('src');
        // var path = src1.substring(0, src1.lastIndexOf('/'));
        // var new_source = path + '/' + data.icon + '.svg';
        var new_source =
            'https://taskmanagertab.com/utility/images/' + data.icon + '.svg';
        $('.currlocimg > img').attr('src', new_source);
        $('.maincitywrap .currloctitle').html(pcity + ', ' + pcountry);
        $('.maincitywrap .currloctemp').html(
            Math.round(data.temperature) + '<span>ºC</span>'
        );
        $('.maincitywrap .currloctempfarenhite').html(
            convertCelsiusToFarenheit(data.temperature) + '<span>ºF</span>'
        );

        computeMainTimePositions(data.offset);
        //$(".othercitieswrap").append(htm);
        var timeunit = storageReplacer.getLocalStorageItem('timeunit');
        if (timeunit == 'hours24') {
            $('.hrmin24, .ampm24').css('display', 'inline-block');
            $('.hrmin, .ampm').hide();
        } else {
            $('.hrmin, .ampm').css('display', 'inline-block');
            $('.hrmin24, .ampm24').hide();
        }
        $('.loadingstate').hide().removeClass('slideopen');
    });
    //}, 3600000);
}

function computeSecondaryTimePositions(offset) {
    var d = new Date();
    var utc = d.getTime() + d.getTimezoneOffset() * 60000;
    var nd = new Date(utc + 3600000 * offset);
    var hrmin = nd.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });
    var hrmin24 = nd.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
    });
    $('.hrmin2').text(hrmin.substring(0, hrmin.length - 3));
    $('.hrmin224').text(hrmin24.substring(0, hrmin24.length - 3) + ':');
    $('.ampm2').text(hrmin.substring(hrmin.length - 2));
    $('.ampm224').text(hrmin24.substring(hrmin24.length - 2));
    requestAnimationFrame(function () {
        computeSecondaryTimePositions(offset);
    });
}

function getsecondaryCityData(lat, long, city, state, country) {
    var latcity, longcity, pcity, pcountry;
    if (lat && long && city) {
        latcity = lat;
        longcity = long;
        pcity = city;
        pcountry = country;
        getCityTemperature(latcity, longcity).then(function (data) {
            // check for clock element if prensent
            liveClock._removeLiveClock('.clock-primary');

            $('.primarycity').remove();
            var htm =
                '<div class="clock-primary live-clock"></div><p class="othercity primarycity"><span class="pcity">' +
                escapeHtml(pcity) +
                '</span><span class="hrmin2"></span> <span class="ampm2"></span><span class="hrmin224"></span><span class="ampm224"></span> <span class="hrstxt">hrs</span><strong class="currloctemp">' +
                escapeHtml(Math.round(data.temperature)) +
                'ºC</strong><strong class="currloctempfarenhite">' +
                escapeHtml(convertCelsiusToFarenheit(data.temperature)) +
                'ºF</strong><span class="editCity editCity1"></span></p>';
            computeSecondaryTimePositions(data.offset);
            $('.cityPrimaryData').append(htm);
            var timeunit = storageReplacer.getLocalStorageItem('timeunit');
            if (timeunit == 'hours24') {
                $('.hrmin224, .ampm224, .hrstxt').css(
                    'display',
                    'inline-block'
                );
                $('.hrmin2, .ampm2').hide();
            } else {
                $('.hrmin2, .ampm2').css('display', 'inline-block');
                $('.hrmin224, .ampm224, .hrstxt').hide();
            }
            var tempunit = storageReplacer.getLocalStorageItem('tempunit');
            if (tempunit) {
                if (tempunit == 'fahrenheit') {
                    $('.currloctempfarenhite').css('display', 'inline-block');
                    $('.currloctemp').hide();
                } else {
                    $('.currloctempfarenhite').hide();
                    $('.currloctemp').css('display', 'inline-block');
                }
            }

            liveClock.init(latcity, longcity, pcity, '.clock-primary');
            showClock('primary');
        });
    } else {
        hideClock('primary');
    }
    //setInterval(function() {
    //}, 3600000);
}

function computethirdTimePositions(offset) {
    var d = new Date();
    var utc = d.getTime() + d.getTimezoneOffset() * 60000;
    var nd = new Date(utc + 3600000 * offset);
    var hrmin = nd.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });
    var hrmin24 = nd.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
    });
    $('.hrmin3').text(hrmin.substring(0, hrmin.length - 3));
    $('.hrmin324').text(hrmin24.substring(0, hrmin24.length - 3) + ':');
    $('.ampm3').text(hrmin.substring(hrmin.length - 2));
    $('.ampm324').text(hrmin24.substring(hrmin24.length - 2));
    requestAnimationFrame(function () {
        computethirdTimePositions(offset);
    });
}

function getthirdCityData(lat, long, city, state, country) {
    var latcity, longcity, pcity;
    if (lat && long && city) {
        latcity = lat;
        longcity = long;
        pcity = city;
        pcountry = country;

        getCityTemperature(latcity, longcity).then(function (data) {
            $('.secondarycity').remove();

            liveClock._removeLiveClock('.clock-secondary');

            var htm =
                '<div class="clock-secondary live-clock"></div><p class="othercity secondarycity"><span class="pcity">' +
                escapeHtml(pcity) +
                '</span><span class="hrmin3"></span> <span class="ampm3"></span><span class="hrmin324"></span><span class="ampm324"></span> <span class="hrstxt">hrs</span><strong class="currloctemp">' +
                escapeHtml(Math.round(data.temperature)) +
                'ºC</strong><strong class="currloctempfarenhite">' +
                escapeHtml(convertCelsiusToFarenheit(data.temperature)) +
                'ºF</strong><span class="editCity editCity2"></span></p>';
            computethirdTimePositions(data.offset);
            $('.citySecondaryData').append(htm);
            var timeunit = storageReplacer.getLocalStorageItem('timeunit');
            if (timeunit == 'hours24') {
                $('.hrmin324, .ampm324, .hrstxt').css(
                    'display',
                    'inline-block'
                );
                $('.hrmin3, .ampm3').hide();
            } else {
                $('.hrmin3, .ampm3').css('display', 'inline-block');
                $('.hrmin324, .ampm324, .hrstxt').hide();
            }
            var tempunit = storageReplacer.getLocalStorageItem('tempunit');
            if (tempunit) {
                if (tempunit == 'fahrenheit') {
                    $('.currloctempfarenhite').css('display', 'inline-block');
                    $('.currloctemp').hide();
                } else {
                    $('.currloctempfarenhite').hide();
                    $('.currloctemp').css('display', 'inline-block');
                }
            }

            liveClock.init(latcity, longcity, pcity, '.clock-secondary');

            showClock('secondary');
        });
    } else {
        hideClock('secondary');
    }
    //setInterval(function() {

    //}, 3600000);
}

// fixing late transitions
function checklocaldata() {
    let mainCityInfo = storageReplacer.getLocalStorageItem('mainCityInfo');
    var maincitypresent = mainCityInfo ? JSON.parse(mainCityInfo) : null;
    let primaryCityInfo = storageReplacer.getLocalStorageItem('primaryCityInfo');
    var primcitypresent = primaryCityInfo ? JSON.parse(primaryCityInfo) : null;
    let secondaryCityInfo = storageReplacer.getLocalStorageItem('secondaryCityInfo');
    var secondarycitypresent = secondaryCityInfo ? JSON.parse(secondaryCityInfo) : null;
    let todolist = storageReplacer.getLocalStorageItem('todolist');
    var todolocallist = todolist ? JSON.parse(todolist) : null;
    var views = storageReplacer.getLocalStorageItem('views');
    var tempunit = storageReplacer.getLocalStorageItem('tempunit');
    var timeunit = storageReplacer.getLocalStorageItem('timeunit');
    var todoswitch = storageReplacer.getLocalStorageItem('todoswitch');
    var reminderswitch = storageReplacer.getLocalStorageItem('reminderswitch');
    var calculcatorswitch = storageReplacer.getLocalStorageItem('calculcatorswitch');
    var calendarswitch = storageReplacer.getLocalStorageItem('calendarswitch');
    var currcitydata = storageReplacer.getLocalStorageItem('currcitydata');
    var clockswitch = storageReplacer.getLocalStorageItem('worldclockswitch');
    if (todolocallist) {
        if (todolocallist.length > 0) {
            for (i = 0; i < todolocallist.length; i++) {
                var todolisthtm =
                    `
                    <li><span class="deletetodo"><svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8"><path fill="#000" fill-rule="evenodd" d="M5.127 4.11a.176.176 0 0 1 0-.255l2.728-2.728a.393.393 0 0 0 .109-.254.393.393 0 0 0-.11-.255L7.346.11A.393.393 0 0 0 7.091 0a.33.33 0 0 0-.255.11L4.11 2.835a.176.176 0 0 1-.254 0L1.127.11A.393.393 0 0 0 .873 0a.393.393 0 0 0-.255.11L.11.617A.393.393 0 0 0 0 .873c0 .072.036.182.11.254l2.726 2.728a.176.176 0 0 1 0 .254L.11 6.836A.393.393 0 0 0 0 7.091c0 .073.036.182.11.254l.508.51c.073.072.182.109.255.109a.393.393 0 0 0 .254-.11l2.728-2.727a.176.176 0 0 1 .254 0l2.727 2.728c.073.072.182.109.255.109a.393.393 0 0 0 .254-.11l.51-.509a.393.393 0 0 0 .109-.254.393.393 0 0 0-.11-.255L5.128 4.11z" opacity=".3"></path></svg></span>
                        <input type="checkbox" id="list` +
                    escapeHtml(todolocallist[i].todonumber) +
                    `">
                        <label for="list` +
                    escapeHtml(todolocallist[i].todonumber) +
                    `"></label>  
                        <textarea spellcheck="false" class="todotxt">` +
                    escapeHtml(todolocallist[i].todo) +
                    `</textarea>
                    </li>
                    `;
                if ($('.todoslist #mCSB_4_container').length > 0) {
                    $('.todoslist #mCSB_4_container').append(todolisthtm);
                } else {
                    $('.todoslist').append(todolisthtm);
                }
            }
        } else {
            $('.todoslist').empty();
        }
    }
    if (calendarswitch == 'true' || calendarswitch == undefined) {
        $('.calendarswitch').prop('checked', true);
        $('.calendarmenutabswrap').show();
        $('.calendarwrap').removeClass('blurred');
    } else {
        $('.calendarswitch').prop('checked', false);
        $('.calendarmenutabswrap').hide();
        $('.calendarwrap').addClass('blurred');
    }
    if (reminderswitch == 'true' || reminderswitch == undefined) {
        $('.reminderswitch').prop('checked', true);
        $('.remindermenutabswrap').show();
    } else {
        $('.reminderswitch').prop('checked', false);
        $('.remindermenutabswrap').hide();
    }
    if (calculcatorswitch == 'true' || calculcatorswitch == undefined) {
        $('.calculcatorswitch').prop('checked', true);
        $('.calculatormenutabswrap').show();
        $('.calculatorwrap').removeClass('blurred');
    } else {
        $('.calculcatorswitch').prop('checked', false);
        $('.calculatormenutabswrap').hide();
        $('.calculatorwrap').addClass('blurred');
    }
    if (todoswitch == 'true' || todoswitch == undefined) {
        $('.todoswitch').prop('checked', true);
        $('.todomenutabswrap').show();
    } else {
        $('.todoswitch').prop('checked', false);
        $('.todomenutabswrap').hide();
    }
    if (clockswitch == 'true' || clockswitch == undefined) {
        $('.worldclockswitch').prop('checked', true);
        $('.worldclocktabswrap').show();
    } else {
        $('.worldclockswitch').prop('checked', false);
        $('.worldclocktabswrap').hide();
    }
    if (tempunit) {
        $('.tempunitlist .tempunit').removeClass('selected');
        $('.tempunitlist .tempunit[data-unit="' + tempunit + '"]').addClass(
            'selected'
        );
        if (tempunit == 'fahrenheit') {
            $('.currloctempfarenhite').css('display', 'inline-block');
            $('.currloctemp').hide();
        } else {
            $('.currloctempfarenhite').hide();
            $('.currloctemp').css('display', 'inline-block');
        }
    }
    if (timeunit) {
        $('.hoursunitlist .tempunit').removeClass('selected');
        $('.hoursunitlist .tempunit[data-unit="' + timeunit + '"]').addClass(
            'selected'
        );
        if (timeunit == 'hours24') {
            $('.currlocaltime24').show();
            $('.hrmin224, .hrmin324, .ampm224, .ampm324, .hrstxt').css(
                'display',
                'inline-block'
            );
            $('.currlocaltime12, .hrmin2, .hrmin3, .ampm2, .ampm3').hide();
        } else {
            $('.currlocaltime12').show();
            $('.hrmin2, .hrmin3, .ampm2, .ampm3').css(
                'display',
                'inline-block'
            );
            $(
                '.currlocaltime24, .hrmin224, .hrmin324, .ampm224, .ampm324, .hrstxt'
            ).hide();
        }
    }
    // if (views) {
    //     changeLayout(views);
    // }
    changeLayout(views);
    if (maincitypresent) {
        $('#search-current-cities').val(
            maincitypresent.city +
            ', ' +
            maincitypresent.state +
            ', ' +
            maincitypresent.country
        );
        getmainCityData(
            maincitypresent.latitude,
            maincitypresent.longitude,
            maincitypresent.city,
            maincitypresent.state,
            maincitypresent.country
        );
    } else if (currcitydata) {
        var currcitydata = JSON.parse(currcitydata);

        $('.currloctitle').text(
            currcitydata.city + ', ' + currcitydata.country
        );
        $('#search-current-cities').val(
            currcitydata.city +
            ', ' +
            currcitydata.state +
            ', ' +
            currcitydata.country
        );
        //$('.currlocimg img').attr('src', currcitydata.img);
        //setInterval(function() {
        getCityTemperature(currcitydata.lat, currcitydata.long).then(function (
            data
        ) {
            $('.weather-icon').addClass(data.icon);
            $('.citytemf').html(
                convertCelsiusToFarenheit(data.temperature) + '<span>ºF</span>'
            );
            $('.weatherdata').css({
                opacity: '1',
                'pointer-events': 'auto'
            });
            // var src1 = $('.currlocimg > img').attr('src');
            // var path = src1.substring(0, src1.lastIndexOf('/'));

            var new_source =
                'https://taskmanagertab.com/utility/images/' +
                data.icon +
                '.svg';
            $('.currlocimg > img').attr('src', new_source);
            $('.maincitywrap .currloctemp').html(
                Math.round(data.temperature) + '<span>ºC</span>'
            );
            $('.maincitywrap .currloctempfarenhite').html(
                convertCelsiusToFarenheit(data.temperature) + '<span>ºF</span>'
            );
        });
        //}, 3600000);
    } else {
        getCurrentLocationData();
    }
    if (!primcitypresent && !secondarycitypresent) {
        hideClock('primary');
        hideClock('secondary');
        $('.citywraptwo').hide();
    } else {
        if (primcitypresent) {
            var priVal =
                primcitypresent.city +
                ', ' +
                primcitypresent.state +
                ', ' +
                primcitypresent.country;
            $('#search-primary-cities').val(priVal).attr('data-val', priVal);
            getsecondaryCityData(
                primcitypresent.latitude,
                primcitypresent.longitude,
                primcitypresent.city,
                primcitypresent.state,
                primcitypresent.country
            );
        } else {
            $('.citywrapone').insertAfter($('.citywraptwo'));
            hideClock('primary');
        }

        if (secondarycitypresent) {
            var secVal =
                secondarycitypresent.city +
                ', ' +
                secondarycitypresent.state +
                ', ' +
                secondarycitypresent.country;
            $('#search-secondary-cities').val(secVal).attr('data-val', secVal);
            getthirdCityData(
                secondarycitypresent.latitude,
                secondarycitypresent.longitude,
                secondarycitypresent.city,
                secondarycitypresent.state,
                secondarycitypresent.country
            );
        } else {
            $('.citywraptwo').insertAfter($('.citywrapone'));
            hideClock('secondary');
        }
    }

    $('.loadingstate').hide().removeClass('slideopen');
}
// fixing late transitions end

var dateAsString;
var dateselectedfrompicker = false;

function getAutocompleteDisplay(cityData) {
    return (
        titleCase(cityData.city) +
        ', ' +
        cityData.state +
        ', ' +
        formatCountryName(cityData.country)
    );
}

function titleCase(string) {
    var words = string.split(' ');
    for (var i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return words.join(' ');
}

function formatCountryName(name) {
    name = name.toLowerCase();
    var words = name.split(' ');
    if (
        words.includes('united') &&
        words.includes('states') &&
        words.includes('america')
    ) {
        return 'USA';
    } else if (
        words.includes('united') &&
        words.includes('arab') &&
        words.includes('emirates')
    ) {
        return 'UAE';
    } else if (words.includes('united') && words.includes('kingdom')) {
        return 'UK';
    } else if (words.includes('united') && words.includes('states')) {
        return 'US';
    }
    return titleCase(name);
}

var primarycityupdated = false,
    secondarycityupdated = false;
var index = 0;

$('.cityformwrap form').on('submit', function (e) {
    e.preventDefault();
});

function checkEmptyInputCity(res) {
    var finalData;
    if (
        $('#search-primary-cities').val() !== '' &&
        $('#search-secondary-cities').val() !== ''
    ) {
        finalData = excludeCurrentCity(res, true);
    } else {
        finalData = excludeCurrentCity(res, false);
    }
    return finalData;
}

function excludeCurrentCity(res, flag) {
    var excludeCity = [],
        currcitydataStr;
    currcitydataStr = getLocationString('currcitydata', true);
    for (var i = 0; i < res.length; i++) {
        if (res[i].indexOf(currcitydataStr) === -1) {
            excludeCity.push(res[i]);
        } else {
        }
    }
    if (!!flag) {
        excludeCity = excludeCities(excludeCity);
    }

    return excludeCity;
}

function getLocationString(data, flag) {
    let currCityDataStorage= storageReplacer.getLocalStorageItem(data);
    var currcitydata = currCityDataStorage ? JSON.parse(currCityDataStorage): null;
    var currcitydataStr;
    var countryName = flag
        ? formatCountryName(currcitydata.country)
        : currcitydata.country;

    if (currcitydata.state) {
        currcitydataStr =
            currcitydata.city + ', ' + currcitydata.state + ', ' + countryName;
    } else {
        currcitydataStr = currcitydata.city + ', ' + countryName;
    }
    return currcitydataStr;
}

/* City Selection Functions Ends*/
/* Reminder Functions Starts*/

/*function to send reminder data*/
function sendReminderData(type, storereminderobj) {
    // var reminderlocaldata = JSON.parse(storageReplacer.getLocalStorageItem("reminderlist"));
    //document.dispatchEvent('setNotification', reminderlocaldata);
    storereminderobj.title = 'This reminder is due now';
    storereminderobj.buttons = [
        {
            title: 'Dismiss'
        },
        {
            title: 'Snooze',
            behaviour: 'updateSnoozeButtons',
            snoozeDuration: '300000'
        }
    ];
    document.dispatchEvent(
        new CustomEvent('handleNotification', {
            detail: Object.assign(
                {
                    type: type
                },
                storereminderobj,
                {
                    faviconUrl: faviconUrl
                }
            )
        })
    );
    storereminderobj.buttons = [
        {
            title: 'Got it'
        }
    ];
    if (storereminderobj.timestampbefore5min >= new Date().getTime()) {
        storereminderobj.title = 'This reminder is due in 5 minutes';
        storereminderobj.timestamp = storereminderobj.timestampbefore5min;
        storereminderobj.NotificationIdentifier =
            storereminderobj.NotificationIdentifier + '-5min';
        document.dispatchEvent(
            new CustomEvent('handleNotification', {
                detail: Object.assign(
                    {
                        type: type
                    },
                    storereminderobj,
                    {
                        faviconUrl: faviconUrl
                    }
                )
            })
        );
    }
}

$('body').on('click', '.deletereminder', function () {
    if ($('.reminderlistwrap .reminders').length == 1) {
        $('.ui-datepicker-current-day').removeClass('notifavailable');
    }
    $(this).parent('.reminders').remove();
    if ($('.addingReminders').is(':hidden')) {
        $('.addReminders').show();
    }

    var mnth = Number($('.ui-datepicker-month :selected').val()) + 1;
    var calendardatesobj =
        $('.ui-state-active').text() +
        '/' +
        mnth +
        '/' +
        $('.ui-datepicker-year :selected').text();

    var remindertext = $(this)
        .parent('.reminders')
        .find('.reminderdesc')
        .text();
    var reminderIdentifier = $(this).parent('.reminders').attr('data-id');
    let reminderlist = storageReplacer.getLocalStorageItem('reminderlist');
    var templocalstorage = reminderlist ? JSON.parse(reminderlist): null;
    storereminder = templocalstorage.filter(function (rem) {
        return rem.NotificationIdentifier != reminderIdentifier;
    });
    /* availableDates = availableDates.filter(function(rem) {
      return rem.reminder != remindertext;
    }); */
    var objIndex = templocalstorage.findIndex(
        (rem) => rem.NotificationIdentifier == reminderIdentifier
    );
    setStorageItem('reminderlist', storereminder);
    /*function to send reminder data*/

    sendReminderData('delete', templocalstorage[objIndex]);
    availableDates = [];
    var getlocalremindates = reminderlist ? JSON.parse(reminderlist) : null;
    if (getlocalremindates) {
        if (getlocalremindates.length > 0) {
            for (i = 0; i < getlocalremindates.length; i++) {
                availableDates.push(getlocalremindates[i].date);
            }
        }
    }
    $('#caleandar').datepicker('refresh');

    /* var filterreminder = availableDates.filter(function(rem) {
      return rem.date == reminderdate;
    }); */
    /** :empty selector to work making div empty */
    if ($('.reminderlistwrap .reminders').length == 0) {
        $('.reminderlistwrap').empty();
    }
});
/* $('.deletereminder').click(function(){
  $(this).parent('.reminders').remove();
}); */
$('.addReminders').click(function () {
    $(this).hide();
    $('.addingReminders').show();
    $('.reminderinputwrap textarea').focus();
    setTimeout(function () {
        $('.reminderwrap').mCustomScrollbar('scrollTo', '.addingReminders');
        $('.sidemenuwrap').mCustomScrollbar(
            'scrollTo',
            '.remindermenutabswrap'
        );
    }, 100);
    var checkpm = new Date().getHours();
    if (checkpm > 12) {
        $("#format option[value='am']")
            .removeAttr('selected')
            .attr('disabled', 'disabled');
        $('#format option[value="pm"]').attr('selected', 'selected');
    }
    $('#dateinput').datepicker('setDate', new Date());
    dateselectedfrompicker = false;
});
$('.dateinputwraper, .remindertyminwrap, .reminderinputwrap #format').click(
    function () {
        setTimeout(function () {
            $('.reminderwrap').mCustomScrollbar('scrollTo', '.addingReminders');
            $('.sidemenuwrap').mCustomScrollbar(
                'scrollTo',
                '.remindermenutabswrap'
            );
        }, 100);
    }
);
$('.cancel').click(function () {
    $('.addreminderform')[0].reset();
    $('.addingReminders').hide();
    $('.addreminderform .errorlabel').hide();
    $('.addReminders').show();
});
var storereminder = [];

function getcurrendate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var today = mm + '/' + dd + '/' + yyyy;
    return today;
}

var reminderArray = [];

function reminderexpired() {
    if ($('.reminderlistwrap .reminders').length > 0) {
        $('.reminderlistwrap .reminders').each(function () {
            var dts = Number($(this).attr('data-timestamp'));
            var cts = Number(new Date().getTime());

            if (dts + 60000 < cts) {
                $(this).addClass('reminderexpired');

                $(this).removeClass('highlighted');
            } else if (dts < cts && dts + 15000 > cts) {
                $(this).addClass('highlighted');
                $(this).find('.editremindericon').hide();
                $(this).children().find('.actionbtns').hide();
                if ($('.addingReminders').css('display') == 'none') {
                    $('.addReminders').show();
                }
                $('audio')[0].play();

                /*  setTimeout(function() {
                $("audio")[0].pause();
                 }, 500); */
            }
            if (!$(this).hasClass('reminderexpired')) {
                if (new Date().getTime() < $(this).attr('data-timestamp')) {
                    var timestamps = Number($(this).attr('data-timestamp'));

                    if (
                        new Date().getDate() == new Date(timestamps).getDate()
                    ) {
                        $('.ui-datepicker-today').addClass('reminderavailable');
                        /* if(reminderArray.indexOf($(this).attr('data-timestamp')) === -1){
                            reminderArray.push($(this).attr('data-timestamp'));
                        } */
                    }
                }
            }
        });
    }
    setInterval(function () {
        reminderArray = [];
        if ($('.reminderlistwrap .reminders').length > 0) {
            $('.reminderlistwrap .reminders').each(function () {
                var dts = Number($(this).attr('data-timestamp'));
                var cts = Number(new Date().getTime());

                if (dts + 60000 < cts) {
                    $(this).addClass('reminderexpired');

                    $(this).removeClass('highlighted');
                } else if (dts < cts && dts + 15000 > cts) {
                    $(this).addClass('highlighted');
                    $(this).find('.editremindericon').hide();
                    $(this).children().find('.actionbtns').hide();
                    if ($('.addingReminders').css('display') == 'none') {
                        $('.addReminders').show();
                    }
                    $('audio')[0].play();

                    /*  setTimeout(function() {
                         $("audio")[0].pause();
                     }, 500); */
                }
                if (!$(this).hasClass('reminderexpired')) {
                    if (new Date().getTime() < $(this).attr('data-timestamp')) {
                        var timestamps = Number($(this).attr('data-timestamp'));

                        if (
                            new Date().getDate() ==
                            new Date(timestamps).getDate()
                        ) {
                            $('.ui-datepicker-today').addClass(
                                'reminderavailable'
                            );
                            if (
                                reminderArray.indexOf(
                                    $(this).attr('data-timestamp')
                                ) === -1
                            ) {
                                reminderArray.push(
                                    $(this).attr('data-timestamp')
                                );
                            }
                        }
                    }
                }
            });
        }

        if (reminderArray.length == 0) {
            $('.ui-datepicker-today').removeClass('reminderavailable');
        }
    }, 5000);
}

function getcurrenttime() {
    var dt = new Date();
    /* var time = dt.getHours() + ":" + dt.getMinutes(); */
    var time = dt.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });
    return time;
}

function validationIsTrue() {
    var mmm = $('#mm :selected').text();
    var ddd = $('#hh :selected').text();
    /* if (mmm < 10 && mmm.length == 1) {
        mmm = '0' + mmm
    }
    if (ddd < 10 && ddd.length == 1) {
        ddd = '0' + ddd
    } */
    var tyimginput = ddd + ':' + mmm;
    var a = new RegExp('^([0-9]|0[0-9]|1[0-2]):[0-5][0-9]?$');
    var validated = a.test(tyimginput);

    var dateinputval = $('.dateinput').val();
    var todaydate = getcurrendate();
    var ampm = $('#format :selected').text();
    if (ampm == 'PM') {
        // var part1 = tyimginput.substring(0, tyimginput.indexOf(":"));
        var part2 = $('#mm :selected').text();
        var part3 = Number($('#hh :selected').text()) + 12;
        if (part3 == '24') {
            tyimginput = '12:' + part2;
        } else {
            tyimginput = part3 + ':' + part2;
        }
    } else {
        if (Number($('#hh :selected').text()) == '12') {
            var part2 = $('#mm :selected').text();
            tyimginput = '00:' + part2;
        }
    }
    if (validated) {
        /*  if(ddd == '0' || ddd =='00'){
             $(".addreminderform .errorlabel").text('Enter valid 12 hour time format (eg: 07:20)').show();
             return false;
         }else{ */
        if (dateinputval == todaydate) {
            var currenttime = getcurrenttime();
            var a = new Date(todaydate + ' ' + currenttime).getTime();
            var b = new Date(dateinputval + ' ' + tyimginput).getTime();
            var currenttimeupdated = a > b;
            if (currenttimeupdated) {
                $('.addreminderform .errorlabel')
                    .text('Reminder time cannot be less than current time')
                    .show();
                return false;
            } else {
                $('.addreminderform .errorlabel').hide();
                return true;
            }
        } else {
            $('.addreminderform .errorlabel').hide();
            return true;
        }
        //}
    } else {
        $('.addreminderform .errorlabel')
            .text('Enter valid 12 hour time format (eg: 07:20)')
            .show();
        return false;
    }
    /* if (validated && dateinputval != todaydate ) {
      $(".errorlabel").hide();
      return true;
    } else {
      var currenttime = getcurrenttime();
      var a = todaydate + ' ' + currenttime;
      var b = dateinputval + ' ' + tyimginput;
     var currenttimeupdated = a > b;

      if((dateinputval == todaydate) && currenttimeupdated){
        $(".errorlabel").text('Enter valid time format (eg: 07:20) and reminder time cannot be less than current time').show();
        return false;
      } else {
        $(".errorlabel").hide();
        return true;
      }

    } */
}

$('#hh,#mm, .hhinput, .mminput').keydown(function (e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if (
        $.inArray(e.keyCode, [46, 8, 9, 27, 13]) !== -1 ||
        // Allow: Ctrl+A, Command+A
        (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: home, end, left, right, down, up
        (e.keyCode >= 35 && e.keyCode <= 40)
    ) {
        // let it happen, don't do anything
        return;
    }
    // Ensure that it is a number and stop the keypress
    if (
        (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
        (e.keyCode < 96 || e.keyCode > 105)
    ) {
        e.preventDefault();
    }
});
//$("#hh, .hhinput").keyup(function(e) {
$(document).on('keyup', '#hh', function (e) {
    var a = new RegExp('^([0-9]|0[0-9]|1[0-2])?$');

    var hhinp = $(this).val();
    if (hhinp.length >= 1) {
        if (!a.test(hhinp)) {
            e.preventDefault();
            $(this)
                .parents('form')
                .children()
                .find('.errorlabel')
                .text('Enter valid 12 hour format')
                .show();
        } else {
            $(this).parents('form').children().find('.errorlabel').hide();
        }
    }
});
$(document).on('keyup', '#mm', function (e) {
    var a = new RegExp('^([0-9]|[0-5][0-9])?$');
    var hhinp = $(this).val();
    if (hhinp.length >= 1) {
        if (!a.test(hhinp)) {
            e.preventDefault();
            $(this)
                .parents('form')
                .children()
                .find('.errorlabel')
                .text('Enter valid 12 hour format')
                .show();
        } else {
            $(this).parents('form').children().find('.errorlabel').hide();
        }
    }
});
var flagvalidatedformat = false;
$(document).on('keyup', '.hhinput', function (e) {
    var a = new RegExp('^([0-9]|0[0-9]|1[0-2])?$');

    var hhinp = $(this).val();
    if (hhinp.length >= 1) {
        if (!a.test(hhinp)) {
            e.preventDefault();
            $(this)
                .parents('form')
                .children('.errorlabel')
                .text('Enter valid 12 hour format')
                .show();
            flagvalidatedformat = false;
            return false;
        } else {
            $(this).parents('form').children('.errorlabel').hide();
            flagvalidatedformat = true;
        }
    }
});
$(document).on('keyup', '.mminput', function (e) {
    var a = new RegExp('^([0-9]|[0-5][0-9])?$');
    var hhinp = $(this).val();
    if (hhinp.length >= 1) {
        if (!a.test(hhinp)) {
            e.preventDefault();
            $(this)
                .parents('form')
                .children('.errorlabel')
                .text('Enter valid 12 hour format')
                .show();
            flagvalidatedformat = false;
            return false;
        } else {
            $(this).parents('form').children('.errorlabel').hide();
            flagvalidatedformat = true;
        }
    }
});

$('.addreminderform').submit(function (evt) {
    evt.preventDefault();

    if (validationIsTrue()) {
        let reminderList= storageReplacer.getLocalStorageItem('reminderlist');
        var templocalstorage = reminderList ? JSON.parse(reminderList) : null;
        if (templocalstorage) {
            storereminder = templocalstorage;
        }
        var tyimginput =
            $('#hh :selected').text() +
            ':' +
            $('#mm :selected').text() +
            ' ' +
            $('#format :selected').text();
        var remindertext = $('.reminderinputwrap textarea').val();
        /* var remindertym =
          $("#hh :selected").text() +
          ":" +
          $("#mm :selected").text() +
          " " +
          $("#format :selected").val(); */
        if (dateAsString == null) {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!

            var yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            dateAsString = mm + '/' + dd + '/' + yyyy;
        } else if (dateAsString != null && !dateselectedfrompicker) {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!

            var yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            dateAsString = mm + '/' + dd + '/' + yyyy;
        }
        var timestampremindertemp =
            dateAsString.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$1/$2/$3') +
            ', ' +
            tyimginput;

        var timestampreminder = new Date(timestampremindertemp);

        var uniqueId =
            timestampreminder.getTime() +
            '-' +
            Math.random().toString(36).substring(7);
        var mmm = $('#mm :selected').text();
        var ddd = $('#hh :selected').text();
        if (mmm < 10 && mmm.length == 1) {
            mmm = '0' + mmm;
        }
        if (ddd < 10 && ddd.length == 1) {
            ddd = '0' + ddd;
        }
        var ampmhtm;
        var timenotifformat;
        if ($('#format :selected').text() == 'AM') {
            ampmhtm =
                '<select disabled name="formatinput" class="formatinput"><option value="am" selected>AM</option><option value="pm">PM</option></select>';
            timenotifformat = 'AM';
        } else {
            ampmhtm =
                '<select disabled name="formatinput" class="formatinput"><option value="am">AM</option><option value="pm" selected>PM</option></select>';
            timenotifformat = 'PM';
        }
        var randstring = Math.random().toString(36).substring(7);
        var hhselect =
            `
        <select class="hhinput" required disabled id="hhinput` +
            timestampreminder.getTime() +
            `">
            
            <option value="">01</option>
            <option value="">02</option>
            <option value="">03</option>
            <option value="">04</option>
            <option value="">05</option>
            <option value="">06</option>
            <option value="">07</option>
            <option value="">08</option>
            <option value="">09</option>
            <option value="">10</option>
            <option value="">11</option>
            <option value="">12</option>
        </select>
        `;
        var mmselect =
            `
        <select class="mminput" required disabled id="mminput` +
            timestampreminder.getTime() +
            `">
                                            
                                            <option value="">00</option>
                                            <option value="">01</option>
                                            <option value="">02</option>
                                            <option value="">03</option>
                                            <option value="">04</option>
                                            <option value="">05</option>
                                            <option value="">06</option>
                                            <option value="">07</option>
                                            <option value="">08</option>
                                            <option value="">09</option>
                                            <option value="">10</option>
                                            <option value="">11</option>
                                            <option value="">12</option>
                                            <option value="">13</option>
                                            <option value="">14</option>
                                            <option value="">15</option>
                                            <option value="">16</option>
                                            <option value="">17</option>
                                            <option value="">18</option>
                                            <option value="">19</option>
                                            <option value="">20</option>
                                            <option value="">21</option>
                                            <option value="">22</option>
                                            <option value="">23</option>
                                            <option value="">24</option>
                                            <option value="">25</option>
                                            <option value="">26</option>
                                            <option value="">27</option>
                                            <option value="">28</option>
                                            <option value="">29</option>
                                            <option value="">30</option>
                                            <option value="">31</option>
                                            <option value="">32</option>
                                            <option value="">33</option>
                                            <option value="">34</option>
                                            <option value="">35</option>
                                            <option value="">36</option>
                                            <option value="">37</option>
                                            <option value="">38</option>
                                            <option value="">39</option>
                                            <option value="">40</option>
                                            <option value="">41</option>
                                            <option value="">42</option>
                                            <option value="">43</option>
                                            <option value="">44</option>
                                            <option value="">45</option>
                                            <option value="">46</option>
                                            <option value="">47</option>
                                            <option value="">48</option>
                                            <option value="">49</option>
                                            <option value="">50</option>
                                            <option value="">51</option>
                                            <option value="">52</option>
                                            <option value="">53</option>
                                            <option value="">54</option>
                                            <option value="">55</option>
                                            <option value="">56</option>
                                            <option value="">57</option>
                                            <option value="">58</option>
                                            <option value="">59</option>
                                        </select>
        `;
        var htm =
            '<div class="reminders" data-timestamp="' +
            escapeHtml(timestampreminder.getTime()) +
            '" data-id="' +
            uniqueId +
            '"><span class="editremindericon tracker" data-event_name="FunctionalClick" data-event_action="EditReminderIconClick"><svg width="11" height="10" viewBox="0 0 11 10"><path fill="#2B81F1" fill-rule="evenodd" d="M6.24 1.68l2.04 2.042L3.115 8.89l-2.04-2.041L6.24 1.68zm3.59-.491l-.91-.91c-.352-.352-.924-.352-1.277 0l-.872.871 2.042 2.042L9.83 2.174c.273-.272.273-.713 0-.985zM.006 9.717c-.037.167.113.317.28.276l2.275-.551L.521 7.4.006 9.717z"/></svg></span><span class="deletereminder tracker" data-event_name="FunctionalClick" data-event_action="DeleteReminderClick" data-event_str_value="" data-event_label="DeleteReminder"><svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8"><path fill="#000" fill-rule="evenodd" d="M5.127 4.11a.176.176 0 0 1 0-.255l2.728-2.728a.393.393 0 0 0 .109-.254.393.393 0 0 0-.11-.255L7.346.11A.393.393 0 0 0 7.091 0a.33.33 0 0 0-.255.11L4.11 2.835a.176.176 0 0 1-.254 0L1.127.11A.393.393 0 0 0 .873 0a.393.393 0 0 0-.255.11L.11.617A.393.393 0 0 0 0 .873c0 .072.036.182.11.254l2.726 2.728a.176.176 0 0 1 0 .254L.11 6.836A.393.393 0 0 0 0 7.091c0 .073.036.182.11.254l.508.51c.073.072.182.109.255.109a.393.393 0 0 0 .254-.11l2.728-2.727a.176.176 0 0 1 .254 0l2.727 2.728c.073.072.182.109.255.109a.393.393 0 0 0 .254-.11l.51-.509a.393.393 0 0 0 .109-.254.393.393 0 0 0-.11-.255L5.128 4.11z" opacity=".3"/></svg></span><form class="editformwrap" name="editformwrap" id="editformwrap"><h3 class="remindertime"><span class="remdate"><input type="text" readonly="true" class="remdateinput" value="' +
            dateAsString +
            '">,</span><span class="remtime">' +
            hhselect +
            ':' +
            mmselect +
            ' ' +
            ampmhtm +
            '</span></h3><span class="dividerline"></span><textarea spellcheck="false" required   readonly="true"  name="reminderdesc" id="reminderdesc" class="reminderdesc">' +
            remindertext +
            '</textarea><span class="errorlabel">Enter valid time format (eg: 07:20)</span><div class="actionbtns" style="display:none"><button class="canceledit tracker" data-event_name="FunctionalClick" data-event_action="CancelEditReminderClick" data-event_str_value="" data-event_label="CancelEditReminder" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><circle cx="12" cy="12" r="11.5" fill="#FFF" fill-rule="nonzero" stroke="#4285F5"/><path fill="#4285F5" d="M17.306 15.397l-1.909 1.907s-3.02-3.24-3.245-3.24c-.222 0-3.242 3.24-3.242 3.24L7 15.397s3.243-2.976 3.243-3.24C10.243 11.887 7 8.91 7 8.91L8.91 7s3.045 3.242 3.242 3.242c.2 0 3.245-3.242 3.245-3.242l1.91 1.91s-3.245 3.02-3.245 3.247c0 .215 3.244 3.24 3.244 3.24z"/></g></svg></button><button class="addremedit" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#4285F5" fill-rule="nonzero" d="M20.445 20.445c4.678-4.678 4.678-12.259 0-16.937-4.678-4.677-12.259-4.677-16.937 0-4.677 4.678-4.677 12.26 0 16.937 4.678 4.678 12.264 4.678 16.937 0zM7.683 10.146l2.693 2.694 5.9-5.895 2.087 2.087-5.895 5.895-2.092 2.087-2.087-2.087-2.693-2.694 2.087-2.087z"/></svg></button></form></div></div>';
        $('.reminderlistwrap').append(htm);

        /*  $('.hhinput').find('option[text="'+ddd+'"]').prop("selected", true);
         $('.mminput').find('option[text="'+mmm+'"]').prop("selected", true); */
        $(
            '[data-id=' +
            uniqueId +
            '] #hhinput' +
            timestampreminder.getTime() +
            ' option:contains(' +
            ddd +
            ')'
        ).prop('selected', true);
        $(
            '[data-id=' +
            uniqueId +
            '] #mminput' +
            timestampreminder.getTime() +
            ' option:contains(' +
            mmm +
            ')'
        ).prop('selected', true);
        $('.reminderdesc')
            .each(function () {
                this.setAttribute(
                    'style',
                    'height:' + this.scrollHeight + 'px;overflow-y:hidden;'
                );
            })
            .on('input', function () {
                this.style.height = 'auto';
                this.style.height = this.scrollHeight + 'px';
            });
        //$(this).closest('form').find("textarea").val("");
        $(this)[0].reset();
        $('.addingReminders').hide();
        $('.addReminders').show();

        var storereminderobj = {};
        var mnth = Number($('.ui-datepicker-month :selected').val()) + 1;
        var calendardatesobj =
            $('.ui-state-active').text() +
            '/' +
            mnth +
            '/' +
            $('.ui-datepicker-year :selected').text();

        var before5Mins = new Date(timestampreminder.getTime() - 5 * 60000);
        var timeObj = changeTimeFormatTo12Hr(before5Mins);
        storereminderobj.timestamp = timestampreminder.getTime();
        storereminderobj.time = ddd + ':' + mmm + ' ' + ampmhtm;
        storereminderobj.timenotification =
            ddd + ':' + mmm + ' ' + timenotifformat;
        storereminderobj.timestampbefore5min = before5Mins.getTime();
        storereminderobj.timebefore5min =
            timeObj.hours + ':' + timeObj.minutes + ' ' + timeObj.unit;
        storereminderobj.timenotificationbefore5min =
            timeObj.hours + ':' + timeObj.minutes + ' ' + timenotifformat;
        storereminderobj.date = dateAsString;
        storereminderobj.reminder = remindertext;
        storereminderobj.NotificationIdentifier = uniqueId;
        storereminder.push(storereminderobj);

        setStorageItem('reminderlist', storereminder);
        /*function to send reminder data*/

        sendReminderData('set', storereminderobj);

        var getlocalremindates =reminderList ? JSON.parse(reminderList) : null;
        if (getlocalremindates) {
            if (getlocalremindates.length > 0) {
                for (i = 0; i < getlocalremindates.length; i++) {
                    availableDates.push(getlocalremindates[i].date);
                }
            }
        }

        $('#caleandar').datepicker('refresh');
        //$(".ui-datepicker-current-day").addClass("notifavailable");
        var myArray = $('.reminderlistwrap .reminders');
        myArray.sort(function (a, b) {
            // convert to integers from strings
            a = parseInt($(a).attr('data-timestamp'));
            b = parseInt($(b).attr('data-timestamp'));

            if (a > b) {
                return 1;
            } else if (a < b) {
                return -1;
            } else {
                return 0;
            }
        });

        // put sorted results back on page
        $('.reminderlistwrap').append(myArray);

        //$("#caleandar").datepicker("refresh")
    }
});

$(document).on('change', '#caleandar', function () {
    var calendardates = $(this).val();

    var srcolltodiv;
    $('.reminderlistwrap .reminders').each(function () {
        var ts = $(this).children().find('.remdateinput').val();

        if (calendardates == ts) {
            srcolltodiv = $(this).attr('data-timestamp');
            $('.sidemenuwrap #mcs_container').mCustomScrollbar(
                'scrollTo',
                ".reminders[data-timestamp='" + srcolltodiv + "']"
            );
            $(this).addClass('highlighted');
            setTimeout(function () {
                $('.reminders').removeClass('highlighted');
            }, 10000);
        }
    });
    // $(this).addClass('abc')
    var dateParts = calendardates.split('/');
    var remindercalendardate =
        dateParts[1] + '/' + dateParts[0] + '/' + dateParts[2];

    //checkifremindersexist(calendardates);
});

function checkifremindersexist(reminderdate) {
    let storageReminderList= storageReplacer.getLocalStorageItem('reminderlist');
    var getreminderfromlocal = storageReminderList ? JSON.parse(storageReminderList): null;
    if (getreminderfromlocal) {
        var filterreminder = getreminderfromlocal.filter(function (rem) {
            return rem.date == reminderdate;
        });

        var htm = '';
        $('.reminderlistwrap').empty();
        //var timetsmpid ;
        if (getreminderfromlocal.length > 0) {
            for (i = 0; i < getreminderfromlocal.length; i++) {
                var tt = getreminderfromlocal[i].timenotification;
                var timetsmpid = getreminderfromlocal[i].timestamp;
                var uniqueId = getreminderfromlocal[i].NotificationIdentifier;
                var getSnoozeTimeStamp =
                    getreminderfromlocal[i].snoozetimestamp;
                var getUpdatedTimeStamp = getSnoozeTimeStamp
                    ? getSnoozeTimeStamp
                    : getreminderfromlocal[i].timestamp;
                var h = tt.substr(0, tt.indexOf(':'));
                var m = tt.substr(tt.indexOf(':') + 1, 2);
                var ampmhtm;

                if (tt.indexOf('AM') > -1) {
                    ampmhtm =
                        '<select disabled name="formatinput" class="formatinput"><option value="am" selected>AM</option><option value="pm">PM</option></select>';
                } else {
                    ampmhtm =
                        '<select disabled name="formatinput" class="formatinput"><option value="am">AM</option><option value="pm" selected>PM</option></select>';
                }

                var hhselect =
                    `
        <select class="hhinput" required disabled id="hhinput` +
                    timetsmpid +
                    `">
            
            <option value="">01</option>
            <option value="">02</option>
            <option value="">03</option>
            <option value="">04</option>
            <option value="">05</option>
            <option value="">06</option>
            <option value="">07</option>
            <option value="">08</option>
            <option value="">09</option>
            <option value="">10</option>
            <option value="">11</option>
            <option value="">12</option>
        </select>
        `;

                var mmselect =
                    `
        <select class="mminput" required disabled id="mminput` +
                    timetsmpid +
                    `">
                                            
                                            <option value="">00</option>
                                            <option value="">01</option>
                                            <option value="">02</option>
                                            <option value="">03</option>
                                            <option value="">04</option>
                                            <option value="">05</option>
                                            <option value="">06</option>
                                            <option value="">07</option>
                                            <option value="">08</option>
                                            <option value="">09</option>
                                            <option value="">10</option>
                                            <option value="">11</option>
                                            <option value="">12</option>
                                            <option value="">13</option>
                                            <option value="">14</option>
                                            <option value="">15</option>
                                            <option value="">16</option>
                                            <option value="">17</option>
                                            <option value="">18</option>
                                            <option value="">19</option>
                                            <option value="">20</option>
                                            <option value="">21</option>
                                            <option value="">22</option>
                                            <option value="">23</option>
                                            <option value="">24</option>
                                            <option value="">25</option>
                                            <option value="">26</option>
                                            <option value="">27</option>
                                            <option value="">28</option>
                                            <option value="">29</option>
                                            <option value="">30</option>
                                            <option value="">31</option>
                                            <option value="">32</option>
                                            <option value="">33</option>
                                            <option value="">34</option>
                                            <option value="">35</option>
                                            <option value="">36</option>
                                            <option value="">37</option>
                                            <option value="">38</option>
                                            <option value="">39</option>
                                            <option value="">40</option>
                                            <option value="">41</option>
                                            <option value="">42</option>
                                            <option value="">43</option>
                                            <option value="">44</option>
                                            <option value="">45</option>
                                            <option value="">46</option>
                                            <option value="">47</option>
                                            <option value="">48</option>
                                            <option value="">49</option>
                                            <option value="">50</option>
                                            <option value="">51</option>
                                            <option value="">52</option>
                                            <option value="">53</option>
                                            <option value="">54</option>
                                            <option value="">55</option>
                                            <option value="">56</option>
                                            <option value="">57</option>
                                            <option value="">58</option>
                                            <option value="">59</option>
                                        </select>
        `;

                htm +=
                    '<div class="reminders" data-timestamp="' +
                    getUpdatedTimeStamp +
                    '" data-id="' +
                    uniqueId +
                    '"><span class="editremindericon tracker" data-event_name="FunctionalClick" data-event_action="EditReminderIconClick"><svg width="11" height="10" viewBox="0 0 11 10"><path fill="#2B81F1" fill-rule="evenodd" d="M6.24 1.68l2.04 2.042L3.115 8.89l-2.04-2.041L6.24 1.68zm3.59-.491l-.91-.91c-.352-.352-.924-.352-1.277 0l-.872.871 2.042 2.042L9.83 2.174c.273-.272.273-.713 0-.985zM.006 9.717c-.037.167.113.317.28.276l2.275-.551L.521 7.4.006 9.717z"/></svg></span><span class="deletereminder tracker" data-event_name="FunctionalClick" data-event_action="DeleteReminderClick" data-event_str_value="" data-event_label="DeleteReminder"><svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8"><path fill="#000" fill-rule="evenodd" d="M5.127 4.11a.176.176 0 0 1 0-.255l2.728-2.728a.393.393 0 0 0 .109-.254.393.393 0 0 0-.11-.255L7.346.11A.393.393 0 0 0 7.091 0a.33.33 0 0 0-.255.11L4.11 2.835a.176.176 0 0 1-.254 0L1.127.11A.393.393 0 0 0 .873 0a.393.393 0 0 0-.255.11L.11.617A.393.393 0 0 0 0 .873c0 .072.036.182.11.254l2.726 2.728a.176.176 0 0 1 0 .254L.11 6.836A.393.393 0 0 0 0 7.091c0 .073.036.182.11.254l.508.51c.073.072.182.109.255.109a.393.393 0 0 0 .254-.11l2.728-2.727a.176.176 0 0 1 .254 0l2.727 2.728c.073.072.182.109.255.109a.393.393 0 0 0 .254-.11l.51-.509a.393.393 0 0 0 .109-.254.393.393 0 0 0-.11-.255L5.128 4.11z" opacity=".3"/></svg></span><form class="editformwrap" name="editformwrap"><h3 class="remindertime"><span class="remdate"><input type="text" readonly="true" class="remdateinput" value="' +
                    getreminderfromlocal[i].date +
                    '">,</span><span class="remtime">' +
                    hhselect +
                    ':' +
                    mmselect +
                    ampmhtm +
                    '</span></h3><span class="dividerline"></span><textarea spellcheck="false" name="reminderdesc" id="reminderdesc" class="reminderdesc" required readonly>' +
                    getreminderfromlocal[i].reminder +
                    '</textarea><span class="errorlabel">Enter valid time format (eg: 07:20)</span><div class="actionbtns" style="display:none"><button class="canceledit tracker" data-event_name="FunctionalClick" data-event_action="CancelEditReminderClick" data-event_str_value="" data-event_label="CancelEditReminder" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><circle cx="12" cy="12" r="11.5" fill="#FFF" fill-rule="nonzero" stroke="#4285F5"/><path fill="#4285F5" d="M17.306 15.397l-1.909 1.907s-3.02-3.24-3.245-3.24c-.222 0-3.242 3.24-3.242 3.24L7 15.397s3.243-2.976 3.243-3.24C10.243 11.887 7 8.91 7 8.91L8.91 7s3.045 3.242 3.242 3.242c.2 0 3.245-3.242 3.245-3.242l1.91 1.91s-3.245 3.02-3.245 3.247c0 .215 3.244 3.24 3.244 3.24z"/></g></svg></button><button class="addremedit" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#4285F5" fill-rule="nonzero" d="M20.445 20.445c4.678-4.678 4.678-12.259 0-16.937-4.678-4.677-12.259-4.677-16.937 0-4.677 4.678-4.677 12.26 0 16.937 4.678 4.678 12.264 4.678 16.937 0zM7.683 10.146l2.693 2.694 5.9-5.895 2.087 2.087-5.895 5.895-2.092 2.087-2.087-2.087-2.693-2.694 2.087-2.087z"/></svg></button></form></div></div>';
                if (tt.indexOf('AM') == -1) {
                    document.getElementById('format').selectedIndex = 1;
                } else {
                    document.getElementById('format').selectedIndex = 0;
                }

                //$("#hhinput"+timetsmpid+" option:contains("+h+")").addClass('selected');
                //$("#mminput"+timetsmpid+" option:contains("+m+")").addClass('selected');
            }
            $('.reminderlistwrap').append(htm).show();
            $('.reminderlistwrap .reminders').each(function () {
                var tstamp = $(this).data('timestamp');
                var hours = new Date(tstamp).getHours();
                var minutes = new Date(tstamp).getMinutes();
                hours = hours % 12;
                var temphours = hours ? hours : 12;

                if (temphours < 10) {
                    hours = '0' + hours;
                }
                minutes = minutes < 10 ? '0' + minutes : minutes;

                if (hours == '0') {
                    hours = temphours;
                }

                $(this)
                    .children()
                    .find('.hhinput')
                    .find('option')
                    .each(function () {
                        if ($(this).text() == hours) {
                            $(this).prop('selected', 'selected');
                        }
                    });
                $(this)
                    .children()
                    .find('.mminput')
                    .find('option')
                    .each(function () {
                        if ($(this).text() == minutes) {
                            $(this).prop('selected', 'selected');
                        }
                    });
                //$(this).children().find('.hhinput').find(':selected').addClass('abc')
                //$("#hhinput"+tstamp+" option:contains("+hours+")").attr('selected','selected').addClass('abc');
                //$("#mminput"+tstamp+" option:contains("+minutes+")").attr('selected','selected').addClass('abc');
            });

            function format_two_digits(n) {
                return n < 10 ? '0' + n : n;
            }

            var myArray = $('.reminderlistwrap .reminders');
            myArray.sort(function (a, b) {
                // convert to integers from strings
                a = parseInt($(a).attr('data-timestamp'));
                b = parseInt($(b).attr('data-timestamp'));

                if (a > b) {
                    return 1;
                } else if (a < b) {
                    return -1;
                } else {
                    return 0;
                }
            });

            // put sorted results back on page
            $('.reminderlistwrap').append(myArray);
            // $("textarea")
            //     .each(function() {
            //         this.setAttribute(
            //             "style",
            //             "height:" + this.scrollHeight + "px;overflow-y:hidden;"
            //         );
            //     })
            //     .on("input", function() {
            //         this.style.height = "auto";
            //         this.style.height = this.scrollHeight + "px";
            //     });
        }
    }
}

function updateReminder(time, date, reminder) {
    let reminderlist = storageReplacer.getLocalStorageItem('reminderlist');
    var getriminderlocal = reminderlist ? JSON.parse(reminderlist) : null;

    var objIndex = getriminderlocal.findIndex((obj) => obj.time == time);

    getriminderlocal[objIndex].reminder = reminder;

    /* todolist = getriminderlocal.filter(function(a){
      return a.todonumber = todonumber;
    });*/
    setStorageItem('reminderlist', getriminderlocal);
    /*function to send reminder data*/
    sendReminderData('edit', getriminderlocal[objIndex]);
}

$(document).on('keypress', '.reminderdesc', function (event) {
    /* if (event.keyCode == 13) {
      event.preventDefault();

      return false;
    } */
});
$('body').on('click', '.editremindericon', function () {
    $(this).hide();
    $(this).siblings('form').children('textarea').removeAttr('readonly');
    $(this).siblings('form').children().find('select').removeAttr('disabled');
    $(this).siblings('form').children().find('.hhinput').removeAttr('readonly');
    $(this).siblings('form').children().find('.mminput').removeAttr('readonly');
    $(this).siblings('form').children('.actionbtns').show();
    var setdate = $(this)
        .siblings('form')
        .children()
        .find('.remdateinput')
        .val();

    $(this).siblings('form').children().find('.remdateinput').datepicker({
        minDate: 0
    });
    $('.addReminders, .addingReminders').hide();
    /* var time = $(this).siblings('form').children().find(".remindertime").children('.remtime').text();
    var reminder = $(this).siblings('form').children().find('textarea').val();
    var datetotal =  $(this).siblings('form').children().find(".remindertime").children('.remdate').text().replace(',','').trim() */
    //updateReminder(time, datetotal, reminder);
});
$('body').on('click', '.addremedit', function (evt) {
    evt.preventDefault();
    //if ($(this).parents('form').children('.errorlabel').css("display") == "none") {
    var timestampedit = $(this).parents('.reminders').attr('data-timestamp');
    var formdate = $(this)
        .parents('form')
        .children()
        .find('.remdateinput')
        .val();
    var formtimehrs = $(this)
        .parents('form')
        .children()
        .find('.hhinput')
        .find(':selected')
        .text();
    var formtimemin = $(this)
        .parents('form')
        .children()
        .find('.mminput')
        .find(':selected')
        .text();
    var formtimeam = $(this)
        .parents('form')
        .children()
        .find('.formatinput')
        .find(':selected')
        .text();
    var tyimginput = formtimehrs + ':' + formtimemin;
    var textareainput = $(this).parents('form').find('textarea').val();
    var flag = false;
    var a = new RegExp('^([0-9]|0[0-9]|1[0-2]):[0-5][0-9]?$');
    var validated = a.test(tyimginput);

    var dateinputval = formdate;
    var todaydate = getcurrendate();
    var ampm = formtimeam;
    if (ampm == 'PM') {
        // var part1 = tyimginput.substring(0, tyimginput.indexOf(":"));
        var part2 = formtimemin;
        var part3 = Number(formtimehrs) + 12;
        if (part3 == '24') {
            tyimginput = '12:' + part2;
        } else {
            tyimginput = part3 + ':' + part2;
        }
    } else {
        if (Number(formtimehrs) == '12') {
            var part2 = formtimemin;
            tyimginput = '00:' + part2;
        }
    }
    if (validated) {
        /*  if(formtimehrs == '0' || formtimehrs =='00'){
             $(this).parents('form').children(".errorlabel").text('Enter valid 12 hour time format (eg: 07:20)').show();
             flag = false;
         }else{ */
        if (dateinputval == todaydate) {
            var currenttime = getcurrenttime();
            var a = new Date(todaydate + ' ' + currenttime).getTime();
            var b = new Date(dateinputval + ' ' + tyimginput).getTime();
            var currenttimeupdated = a > b;
            if (currenttimeupdated) {
                $(this)
                    .parents('form')
                    .children('.errorlabel')
                    .text('Reminder time cannot be less than current time')
                    .show();
                flag = false;
            } else {
                $(this).parents('form').children('.errorlabel').hide();
                flag = true;
            }
        } else {
            $(this).parents('form').children('.errorlabel').hide();
            flag = true;
        }
        //}
    } else {
        $(this)
            .parents('form')
            .children('.errorlabel')
            .text('Enter valid 12 hour time format (eg: 07:20)')
            .show();
        flag = false;
    }
    if (flag) {
        let reminderlist = storageReplacer.getLocalStorageItem('reminderlist');
        var templocalstorage = reminderlist ? JSON.parse(reminderlist) : null;
        if (templocalstorage) {
            storereminder = templocalstorage;
        }
        var tyimginput = formtimehrs + ':' + formtimemin + ' ' + formtimeam;
        var remindertext = textareainput;

        var getriminderlocal = reminderlist ? JSON.parse(reminderlist) : null;

        var objIndex = getriminderlocal.findIndex(
            (obj) => obj.timestamp == timestampedit
        );

        getriminderlocal[objIndex].reminder = remindertext;
        getriminderlocal[objIndex].time = tyimginput;
        getriminderlocal[objIndex].timenotification = tyimginput;
        getriminderlocal[objIndex].date = formdate;
        var timestampremindertemp = formdate + ', ' + tyimginput;

        var timestampreminder = new Date(timestampremindertemp);
        getriminderlocal[objIndex].timestamp = timestampreminder.getTime();

        var before5Mins = new Date(timestampreminder.getTime() - 5 * 60000);
        var timeObj = changeTimeFormatTo12Hr(before5Mins);
        getriminderlocal[objIndex].timestampbefore5min = before5Mins.getTime();
        getriminderlocal[objIndex].timebefore5min =
            timeObj.hours + ':' + timeObj.minutes + ' ' + timeObj.unit;
        getriminderlocal[objIndex].timenotificationbefore5min =
            timeObj.hours + ':' + timeObj.minutes + ' ' + timeObj.unit;

        $(this)
            .parents('.reminders')
            .attr('data-timestamp', timestampreminder.getTime());
        setStorageItem('reminderlist', getriminderlocal);
        /*function to send reminder data*/

        sendReminderData('edit', getriminderlocal[objIndex]);
        // $(".reminderlistwrap").append(htm);
        //$( "#caleandar" ).datepicker("refresh");
        availableDates = [];
        var getlocalremindates = reminderlist ? JSON.parse(reminderlist) : null;
        if (getlocalremindates) {
            if (getlocalremindates.length > 0) {
                for (i = 0; i < getlocalremindates.length; i++) {
                    availableDates.push(getlocalremindates[i].date);
                }
            }
        }
        var myArray = $('.reminderlistwrap .reminders');
        myArray.sort(function (a, b) {
            // convert to integers from strings
            a = parseInt($(a).attr('data-timestamp'));
            b = parseInt($(b).attr('data-timestamp'));

            if (a > b) {
                return 1;
            } else if (a < b) {
                return -1;
            } else {
                return 0;
            }
        });

        // put sorted results back on page
        $('.reminderlistwrap').append(myArray);

        $(this).parents('form').children('textarea').attr('readonly', true);
        $(this).parents('.reminders').find('.editremindericon').show();
        $(this)
            .parents('form')
            .children()
            .find('select')
            .attr('disabled', true);
        $(this).parents('form').children().find('input').attr('readonly', true);
        $(this).parents('form').find('.actionbtns').hide();
        $('.addReminders').show();
        $(this)
            .parents('form')
            .children()
            .find('.remdateinput')
            .datepicker('destroy');
        $('#caleandar').datepicker('refresh');
    }
    //}
});
$('body').on('click', '.canceledit', function () {
    var timestampedit = $(this).parents('.reminders').attr('data-timestamp');
    let reminderList = storageReplacer.getLocalStorageItem('reminderlist');
    var getriminderlocal = reminderList ? JSON.parse(reminderList) : null;
    var objIndex = getriminderlocal.findIndex(
        (obj) => obj.timestamp == timestampedit
    );
    $(this)
        .parents('form')
        .children('textarea')
        .val(getriminderlocal[objIndex].reminder);
    $(this)
        .parents('form')
        .children()
        .find('.remdateinput')
        .val(getriminderlocal[objIndex].date);

    var dateld = getriminderlocal[objIndex].time;
    var hh = dateld.substring(0, dateld.indexOf(':'));
    var mm = dateld.substr(dateld.indexOf(':') + 1, 2);
    //var ampm;
    if (dateld.indexOf('PM') > -1) {
        $(this)
            .parents('form')
            .children()
            .find('select')
            .find('option[value="am"]')
            .prop('selected', true);
    } else {
        $(this)
            .parents('form')
            .children()
            .find('select')
            .find('option[value="pm"]')
            .prop('selected', true);
    }
    $(this)
        .parents('form')
        .children()
        .find('.hhinput option:contains(' + hh + ')')
        .prop('selected', true);
    $(this)
        .parents('form')
        .children()
        .find('.mminput option:contains(' + mm + ')')
        .prop('selected', true);
    $(this).parents('form').children('textarea').attr('readonly', true);
    $(this).parents('.reminders').find('.editremindericon').show();
    $(this).parents('form').children().find('select').attr('disabled', true);
    $(this).parents('form').children().find('input').attr('readonly', true);
    $(this).parents('form').find('.actionbtns').hide();
    $('.addReminders').show();
    $(this).parents('form').children('.errorlabel').hide();
    $(this)
        .parents('form')
        .children()
        .find('.remdateinput')
        .datepicker('destroy');
});
/* Reminder Functions Ends*/

/*New Calculator*/
function disableCtrlKeyCombination(e) {
    //list all CTRL + key combinations you want to disable
    var forbiddenKeys = ['c', 'x', 'v'];
    var key;
    var isCtrl;
    if (window.event) {
        key = window.event.keyCode; //IE
        if (window.event.ctrlKey) isCtrl = true;
        else isCtrl = false;
    } else {
        key = e.which; //firefox
        if (e.ctrlKey) isCtrl = true;
        else isCtrl = false;
    }
    //if ctrl is pressed check if other key is in forbidenKeys array
    if (isCtrl) {
        for (i = 0; i < forbiddenKeys.length; i++) {
            //case-insensitive comparation
            if (
                forbiddenKeys[i].toLowerCase() ==
                String.fromCharCode(key).toLowerCase()
            ) {
                //alert('Key combination CTRL + '+String.fromCharCode(key) +' has been disabled.');
                return false;
            }
        }
    }
    return true;
}

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null
        ? ''
        : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function showReminder() {
    var reminderVal = getUrlParameter('reminder');
    if (reminderVal) {
        $('.sidemenuwrap').addClass('slideopen');
        $('.closesidemenu').addClass('open');
        $('.taskManager, .logo').addClass('activeParent');
        $('.remindermenutabswrap .menutabtitlewrap').removeClass('open');
        $('#tab5').show();
        setTimeout(function () {
            $('.reminderwrap').mCustomScrollbar(
                'scrollTo',
                "[data-id='" + reminderVal + "']"
            );
        }, 1000);
    }
}

function updateCurrentDateTime2() {
    var date = getCurrentTime();
    $('#cust_time').html(date.value + ' ' + date.unit);
    $('#cust_date').html(customDate2(new Date()));
    $('.currenttime .sep').css('display', 'inline-block');
}

function getCurrentTime(val) {
    var date = val || new Date();
    var format = {
        value: '',
        unit: ''
    };
    var tempDate = changeTimeFormatTo12Hr(date);
    format.value = tempDate.hours + ':' + tempDate.minutes;
    format.unit = tempDate.unit;
    format.hours = tempDate.hours;
    format.minutes = tempDate.minutes;
    return format;
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
        unit: unit
    };
}

function getMeridianFromHour(hour) {
    hour = hour % 24;
    return hour < 12 ? 'am' : 'pm';
}

function customDate2(date) {
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
        ],
        wekdayName = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ];
    return (
        wekdayName[date.getDay() + 0] +
        ', ' +
        monthNames[date.getMonth() + 0] +
        ' ' +
        date.getDate()
    );
}

$('.linkouts-list .noWidget').click(function () {
    if (
        !$(event.target).closest('.calculator_dropdown').length ||
        $(event.target).closest('.sub-menu-style').length
    ) {
        $(this)
            .toggleClass('activeParent')
            .siblings()
            .removeClass('activeParent');
    }

    $('.logo').removeClass('activeParent');
    $('.sidemenuwrap').removeClass('slideopen');
    $('.closesidemenu').removeClass('open');
});

$('body').click(function (event) {
    if ($(event.target).closest('.header-linkouts').length == false) {
        if (!$('.taskManager, .logo').hasClass('activeParent')) {
            $('.linkouts-list .noWidget').removeClass('activeParent');
        }
    }
    if ($(event.target).closest('.cityformwrapone').length == false) {
        exitInput('one');
    }
    if ($(event.target).closest('.cityformwraptwo').length == false) {
        exitInput('two');
    }
    if (
        !$(event.target).closest('.closesidemenu').length &&
        !$(event.target).closest('.sidemenuwrap').length &&
        !$(event.target).closest('.settingsmenuwrap').length &&
        !$(event.target).closest('.taskManager, .logo').length &&
        !$(event.target).closest('.deletereminder').length &&
        !$(event.target).closest('#ui-datepicker-div').length &&
        !$(event.target).closest(
            '.ui-datepicker-next, .ui-datepicker-prev, .ui-datepicker-year, .ui-datepicker-month, .deletetodo'
        ).length
    ) {
        $('.sidemenuwrap').removeClass('slideopen');
        $('.closesidemenu, .settingsmenuwrap').removeClass('open');
        $('.taskManager, .logo').removeClass('activeParent');
    }
    $('.citywrap .ui-widget-content').hide();
    $('.sub-link-cont').removeClass('link-hovered');
    $('.sub-menu-style').removeClass('show-sublink');
    $('.sub-menu-style li').removeClass('link-highlight');
});
$('.header-search, .searchformwrap').click(function () {
    $('.linkouts-list li, .logo').removeClass('activeParent');
    $('.sidemenuwrap').removeClass('slideopen');
    $('.closesidemenu').removeClass('open');
});

function excludeCities(orignalArray) {
    var excludeCity = [],
        city2,
        city3;
    let primaryCityInfo = storageReplacer.getLocalStorageItem('primaryCityInfo');
    var primcitypresent = primaryCityInfo ? JSON.parse(primaryCityInfo) : null;
    let secondaryCityInfo= storageReplacer.getLocalStorageItem('secondaryCityInfo');
    var secondarycitypresent = secondaryCityInfo ? JSON.parse(secondaryCityInfo) : null;
    if (primcitypresent) {
        city2 = getLocationString('primaryCityInfo');
    }
    if (secondarycitypresent) {
        city3 = getLocationString('secondaryCityInfo');
    }

    for (var i = 0; i < orignalArray.length; i++) {
        if (
            !orignalArray[i].includes(city2) &&
            !orignalArray[i].includes(city3)
        ) {
            excludeCity.push(orignalArray[i]);
        } else {
        }
    }
    return excludeCity;
}

$(document).on('click', '.editCity', function () {
    if ($(this).hasClass('editCity1')) {
        hideClock('primary');
        exitInput('two');
    } else if ($(this).hasClass('editCity2')) {
        hideClock('secondary');
        exitInput('one');
    }
});

$('.chngecitywrap [rel=tab6]').on('click', function () {
    $('.chngecitiescontent').toggle();
});

function showClock(clockName) {
    $('.citywrap .ui-widget-content').hide();
    if (clockName === 'primary') {
        $('.cityPrimaryData').removeClass('blurred').show();
        $('#searchform-cities').hide();
        if ($('.citywraptwo').css('display') == 'none') {
            $('.citywraptwo').insertAfter($('.citywrapone')).show();
        }
    } else if (clockName === 'secondary') {
        $('.citySecondaryData').removeClass('blurred').show();
        $('#searchform-cities-secondary').hide();
        if ($('.citywrapone').css('display') == 'none') {
            $('.citywrapone').insertAfter($('.citywraptwo')).show();
        }
    }
}

function showClockBlurred(clockName) {
    if (clockName === 'primary') {
        $('#searchform-cities').hide();
        $('.cityPrimaryData').addClass('blurred').show();
    } else if (clockName === 'secondary') {
        $('#searchform-cities-secondary').hide();
        $('.citySecondaryData').addClass('blurred').show();
    }
}

function hideClock(clockName) {
    var search1 = $('#search-primary-cities');
    var search2 = $('#search-secondary-cities');
    if (clockName === 'primary') {
        $('.cityPrimaryData').hide();
        $('#searchform-cities').show();
        search1.val(search1.attr('data-val'));
    } else if (clockName === 'secondary') {
        $('.citySecondaryData').hide();
        $('#searchform-cities-secondary').show();
        search2.val(search2.attr('data-val'));
    }
}

$(document).on('click', '.cityformwrap .removeTxt', function () {
    var search1 = $('#search-primary-cities');
    var search2 = $('#search-secondary-cities');
    var removeEle = $(this);
    removeEle.siblings('input').val('');
    $('.ui-autocomplete').hide();
    // removeEle.parents(".citywrap").hide();
    if (removeEle.attr('data-contentOf') == 'primary') {
        storageReplacer.removeLocalStorageItem('tempprimaryCityInfo');
        storageReplacer.removeLocalStorageItem('primaryCityInfo');
        $('.citywrapone').insertAfter($('.citywraptwo')).show();
        search1.attr('data-val', '');
    }
    if (removeEle.attr('data-contentOf') == 'secondary') {
        storageReplacer.removeLocalStorageItem('tempsecondaryCityInfo');
        storageReplacer.removeLocalStorageItem('secondaryCityInfo');
        $('.citywraptwo').insertAfter($('.citywrapone')).show();
        search2.attr('data-val', '');
    }
    if (
        $('#search-primary-cities').val() === '' &&
        $('#search-secondary-cities').val() === ''
    ) {
        $('.citywrapone').show();

        $('.citywraptwo').hide();
    }
});

$(document).on('mouseover click keyup', '.search-text2', function () {
    if (
        (!$(this).val().length > 0 && $(this).attr('data-val') == undefined) ||
        $(this).attr('data-val') == ''
    ) {
        $(this).siblings('.cityformwrap .removeTxt').hide();
    } else {
        $(this).siblings('.cityformwrap .removeTxt').show();
    }
});

function exitInput(clockName) {
    let primaryCityInfo = storageReplacer.getLocalStorageItem('primaryCityInfo');
    var primcitypresent = primaryCityInfo ? JSON.parse(primaryCityInfo) : null;
    let secondaryCityInfo= storageReplacer.getLocalStorageItem('secondaryCityInfo');
    var secondarycitypresent = secondaryCityInfo ? JSON.parse(secondaryCityInfo) : null;
    if (primcitypresent && clockName == 'one') {
        showClock('primary');
    }
    if (secondarycitypresent && clockName == 'two') {
        showClock('secondary');
    }
}

function fetchCityDetails(latitude, longitude) {
    if (!!latitude && !!longitude) {
        var cityPromise;
        cityPromise = new Promise(function (cityResolve, cityReject) {
            $.getJSON(
                specificConstants.API +
                'getReverseGeocoding?latitude=' +
                latitude +
                '&longitude=' +
                longitude,
                function (data) {
                    var city = data.location.split(',');
                    var cityInfo = {
                        latitude: latitude,
                        longitude: longitude,
                        city: city[0],
                        country: city[1]
                    };
                    cityResolve(cityInfo);
                }
            );
        });
        return cityPromise;
    }
    return Promise.reject();
}


document.addEventListener('NotificationButtonClick', function (e) {
    var snoozeElementDetails = JSON.parse(e.detail);
    var snoozeElId = snoozeElementDetails.NotificationIdentifier;

    let reminderlist = storageReplacer.getLocalStorageItem('reminderlist');
    var reminderData = reminderlist ? JSON.parse(reminderlist) : null;

    if (snoozeElementDetails.selectedButtonIndex == 1) {
        // if localstorage of reminders id has snoozeTimestamp
        var checkForKey = checkForId(reminderData, snoozeElId);
        // update value from localstorage
        if (checkForKey.isPresent) {
            // var snoozeElNewTime = checkForKey.itemSnoozeTimeStamp + 300000;
            _mainTimeUpdateFunc(
                checkForKey.itemSnoozeTimeStamp,
                snoozeElId,
                reminderData
            );
        } else {
            // else update value from backend data
            _mainTimeUpdateFunc(
                snoozeElementDetails.timestamp,
                snoozeElId,
                reminderData
            );
        }
    }
});

function checkForId(list, id) {
    var returnedItem;
    $.each(list, function (item) {
        var reminderItem = list[item];
        var reminderItemId = reminderItem.NotificationIdentifier;
        if (reminderItemId == id) {
            var isPresent = reminderItem.hasOwnProperty('snoozetimestamp');
            var itemSnoozeTimeStamp =
                new Date().getTime() + 1000 * 60 * 5 ||
                (reminderItem = list[item].snoozetimestamp) ||
                false;
            returnedItem = {
                isPresent,
                itemSnoozeTimeStamp
            };
        }
    });
    return returnedItem;
}

function _mainTimeUpdateFunc(tStamp, id, list) {
    var snoozeElNewTime = tStamp + 300000;
    //         Update timestamp attribute for HTML
    $('[data-id=' + id + ']').attr('data-timestamp', snoozeElNewTime);

    $.each(list, function (item) {
        var reminderItem = list[item];
        var reminderItemId = reminderItem.NotificationIdentifier;

        if (reminderItemId == id) {
            reminderItem.snoozetimestamp = snoozeElNewTime;

            storageReplacer.setLocalStorageItem('reminderlist', JSON.stringify(list));
        }
    });
}

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
    document.dispatchEvent(new Event('showOptInPage'));
});

denyTerms.on('click', function (e) {
    closePiiWidget();
});

document.addEventListener('DOMContentLoaded', function () {
    storageReplacer.init().then(function () {
        allowWidget.hide();
        checkPiiStored();
        onLoadInit();
    });
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (let [key, {oldValue, newValue}] of Object.entries(changes)) {
        if (key === 'piiAccept' && newValue === '1') {
            allowWidget.show();
            acceptTerm.hide();

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

var widgetElement = $('.link-out');

widgetElement.on('click', function (e) {
    checkPiiStored();
});

function checkPiiStored() {
    var accepted = storageReplacer.getLocalStorageItem('piiAccept');
    if (accepted && accepted == 1) {
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

function onLoadInit(){
    calculator();
    todo();
    checklocaldata();

    $('body').removeClass('preload');
    $('.sidemenuwrap').mCustomScrollbar({
        advanced: {
            autoScrollOnFocus: false
        }
    });
    $('.reminderwrap').mCustomScrollbar({
        advanced: {
            autoScrollOnFocus: false
        }
    });
    $('.todoslist').mCustomScrollbar({
        advanced: {
            autoScrollOnFocus: false
        }
    });
    /* Get Location */
    computeTimePositions();
    computeDate();
    // checklocaldata();
    reminderexpired();
    // triggerAsperLanderValues();
    //getCurrentLocation();
    $('#dateinput')
        .datepicker({
            dateFormat: 'mm/dd/yy',
            changeMonth: true,
            changeYear: true,
            minDate: 0,
            onSelect: function (dateText, inst) {
                dateAsString = dateText; //the first parameter of this function
                dateselectedfrompicker = true;
                var todaysdate = new Date().getDate();
                var selecteddate = dateAsString.split('/')[1].trim();
                if (todaysdate == selecteddate) {
                    $("#format option[value='am']")
                        .removeAttr('selected')
                        .attr('disabled', 'disabled');
                    $('#format option[value="pm"]').attr(
                        'selected',
                        'selected'
                    );
                } else {
                    $("#format option[value='am']")
                        .removeAttr('disabled')
                        .attr('selected', 'selected');
                    $('#format option[value="pm"]').removeAttr(
                        'selected',
                        'selected'
                    );
                }
            }
        })
        .datepicker('setDate', new Date());
    /* Calculator Function Starts */
    $('.calculator').on('click', function (e) {
        $('#display').focus();
    });

    /* Calculator Function Ends */
    expandTextArea();
    $('.menutabtitlewrap').addClass('open');
    $('.menutabscontent').hide();

    $('.calculator_dropdown').mouseleave(function (e) {
        if ($('.sub-link-cont').hasClass('link-hovered')) {
            $('.sub-link-cont').removeClass('link-hovered');
        }
    });
    $('.sub-link-cont').hover(function (e) {
        $('.sub-link-cont').removeClass('link-hovered');
        $(this).addClass('link-hovered');
    });

    showReminder();

    var cache = {};
    var mapping = {};
    $('#search-primary-cities').autocomplete({
        autofocus: false,
        delay: 150,
        appendTo: $('#searchform-cities'),
        source: function (request, response) {
            var term = request.term.toLowerCase().split(',')[0];
            /*  if (term in cache) {
                response(excludeCities(cache[term]));
                return;
             } */
            response(['Fetching Cities . . .']);
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
                            : cityData.keys[zips[cityData.city]] +
                            ', ' +
                            titleCase(cityData.city);
                        res.push(cityName);

                        mapping[cityName] = {
                            longitude: cityData.longitude,
                            latitude: cityData.latitude,
                            city: {
                                cityName: titleCase(cityData.city),
                                countryName: formatCountryName(
                                    cityData.country
                                ),
                                countryCode: cityData.countryCode,
                                stateName: cityData.state
                            }
                        };
                    }
                    cache[term] = res;

                    // response(res);
                    var finalData = checkEmptyInputCity(res);
                    // Limit search result
                    response(finalData.slice(0, 8));
                }
            );
        },
        select: function (event, ui) {
            event.preventDefault();
            var cityName = ui.item.value;

            $('#search-primary-cities')
                .val(ui.item.value)
                .attr('data-val', ui.item.value);
            if (mapping[cityName]) {
                primarycityupdated = true;

                setStorageItem('tempprimaryCityInfo', {
                    latitude: mapping[cityName]['latitude'],
                    longitude: mapping[cityName]['longitude'],
                    city: mapping[cityName]['city']['cityName'],
                    country: mapping[cityName]['city']['countryName'],
                    state: mapping[cityName]['city']['stateName']
                });
                showClockBlurred('primary');
                primaryClockSettings();
            } else {
                primarycityupdated = false;
            }
        },
        change: function (event, ui) {
            if (ui.item == null || ui.item == undefined) {
                $('#search-primary-cities').val('');
            }
        }
    });
    $('#search-secondary-cities').autocomplete({
        autofocus: false,
        delay: 150,
        appendTo: $('#searchform-cities-secondary'),
        source: function (request, response) {
            var term = request.term.toLowerCase().split(',')[0];
            /* if (term in cache) {
                response(excludeCities(cache[term]));
                return;
            } */
            response(['Fetching Cities . . .']);
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
                            : cityData.keys[zips[cityData.city]] +
                            ', ' +
                            titleCase(cityData.city);
                        res.push(cityName);

                        mapping[cityName] = {
                            longitude: cityData.longitude,
                            latitude: cityData.latitude,
                            city: {
                                cityName: titleCase(cityData.city),
                                countryName: formatCountryName(
                                    cityData.country
                                ),
                                countryCode: cityData.countryCode,
                                state: cityData.state
                            }
                        };
                    }
                    cache[term] = res;

                    // response(res);
                    var finalData = checkEmptyInputCity(res);
                    response(finalData.slice(0, 8));
                }
            );
        },
        select: function (event, ui) {
            event.preventDefault();
            var cityName = ui.item.value;

            $('#search-secondary-cities')
                .val(ui.item.value)
                .attr('data-val', ui.item.value);

            if (mapping[cityName]) {
                secondarycityupdated = true;

                setStorageItem('tempsecondaryCityInfo', {
                    latitude: mapping[cityName]['latitude'],
                    longitude: mapping[cityName]['longitude'],
                    city: mapping[cityName]['city']['cityName'],
                    country: mapping[cityName]['city']['countryName'],
                    state: cityName.split(',')[1].trim()
                });
                showClockBlurred('secondary');
                secondaryClockSettings();
            } else {
                secondarycityupdated = false;
            }
        },
        change: function (event, ui) {
            if (ui.item == null || ui.item == undefined) {
                $('#search-secondary-cities').val('');
            }
        }
    });

    var displayBox = document.getElementById('display');
    // var evaluateExpresion;
    var hasEvaluated = false;
    var clickedAC = true;

    // CHECK IF 0 IS PRESENT. IF IT IS, OVERRIDE IT, ELSE APPEND VALUE TO DISPLAY
    function clickNumbers(val) {
        if (
            displayBox.value === '0' ||
            (hasEvaluated === true && !isNaN(displayBox.value))
        ) {
            displayBox.value = val;
        } else {
            displayBox.value += val;
        }
        hasEvaluated = false;
    }

    $('#display').keydown(function (e) {
        checkLength(displayBox.value);
        if (clickedAC) {
            $('#display').val('');
        }
        clickedAC = false;
        //evaluate()
        // Allow: backspace, delete, tab, escape, enter and .
        if (
            $.inArray(e.keyCode, [46, 8, 9, 27, 110, 106, 107, 109, 111]) !==
            -1 ||
            // Allow: Ctrl/cmd+A
            (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
            // Allow: Ctrl/cmd+C
            (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
            // Allow: Ctrl/cmd+X
            (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
            // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)
        ) {
            // let it happen, don't do anything
            return;
        }
        if ($.inArray(e.keyCode, [13]) !== -1) {
            evaluate();
            hasEvaluated = true;
        }
        // Ensure that it is a number and stop the keypress
        if (
            (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
            (e.keyCode < 96 || e.keyCode > 105)
        ) {
            e.preventDefault();
        }

        // shift + operator
        if (e.keyCode == 53 && (e.shiftKey === true || e.metaKey === true)) {
            e.preventDefault();

            // %
            percentClicked();
        } else if (
            e.keyCode == 56 &&
            (e.shiftKey === true || e.metaKey === true)
        ) {
            e.preventDefault();

            // *
            multiplyClicked();
        } else if (
            e.keyCode == 187 &&
            (e.shiftKey === true || e.metaKey === true)
        ) {
            e.preventDefault();

            // +
            addClicked();
        } else if (e.keyCode == 189) {
            e.preventDefault();

            // -
            subtractClicked();
        } else if (e.keyCode == 191) {
            e.preventDefault();

            //  /
            divideClicked();
        } else if (e.keyCode == 187) {
            e.preventDefault();

            evaluate();
        } else if (e.keyCode == 190) {
            e.preventDefault();

            //  .
            decimalPointClicked();
        }
    });

    function customExpressionCalculator(input) {

        var f = { add : '+'
            , sub : '-'
            , div : '/'
            , mlt : '*' };

        // Create array for Order of Operation and precedence
        f.ooo = [[ [f.mlt] , [f.div] ],
            [ [f.add] , [f.sub] ]];

        input = input.replace(/[^0-9%^*\/()\-+.]/g,'');           // clean up unnecessary characters

        var output;
        for(var i=0, n=f.ooo.length; i<n; i++ ){

            // Regular Expression to look for operators between floating numbers or integers
            var re = new RegExp('(\\d+\\.?\\d*)([\\'+f.ooo[i].join('\\')+'])(\\d+\\.?\\d*)');
            re.lastIndex = 0;                                     // be cautious and reset re start pos

            // Loop while there is still calculation for level of precedence
            while( re.test(input) ){
                //document.write('<div>' + input + '</div>');
                output = calc_internal(RegExp.$1,RegExp.$2,RegExp.$3);
                if (isNaN(output) || !isFinite(output)) return output;   // exit early if not a number
                input  = input.replace(re,output);
            }
        }

        return output;

        function calc_internal(a,op,b){
            a=a*1; b=b*1;
            switch(op){
                case f.add: return a+b; break;
                case f.sub: return a-b; break;
                case f.div: return a/b; break;
                case f.mlt: return a*b; break;
                default: null;
            }
        }
    }

    // EVAL FUNCTION
    function evaluate() {
        // isDecimal(displayBox.value.slice(-1) pending
        var lastIsPercent = displayBox.value.slice(-1) == '%';
        if (
            (isNumber(displayBox.value.slice(-1)) || lastIsPercent) &&
            /[\+,\-,\%,\×,\÷]/g.test(displayBox.value)
        ) {
            var evaluateExpresion = displayBox.value;
            var evaluateExpresion1 = addBracletRegex(evaluateExpresion);
            evaluateExpresion1 = evaluateExpresion1
                .split('÷')
                .join('/')
                .split('×')
                .join('*')
                .split('%')
                .join('/100');

            $('.operand-operator').text(displayBox.value + '=');

            var computedValue = customExpressionCalculator(evaluateExpresion1);
            displayBox.value = +(Math.round(computedValue + "e+6") + "e-6");

            hasEvaluated = true;

            var localData = storageReplacer.getLocalStorageItem('calculatorHis');
            if (localData == undefined) {
                var historyData = [];
                var hisObject = {};
                historyData.push({
                    query: evaluateExpresion,
                    output: displayBox.value,
                });
                storageReplacer.setLocalStorageItem(
                    'calculatorHis',
                    JSON.stringify(historyData)
                );
            } else {
                // console.log(JSON.parse(localData));
                var localArray = JSON.parse(localData);
                localArray.unshift({
                    query: evaluateExpresion,
                    output: displayBox.value,
                });
                var newLocalData = [];
                if (localArray.length < 4) {
                    storageReplacer.setLocalStorageItem(
                        'calculatorHis',
                        JSON.stringify(localArray)
                    );
                } else {
                    for (var i = 0; i < 5; i++) {
                        newLocalData.push(localArray[i]);
                    }
                    storageReplacer.setLocalStorageItem(
                        'calculatorHis',
                        JSON.stringify(newLocalData)
                    );
                }
            }
        }
    }

    // CHECK FOR LENGTH & DISABLING BUTTONS
    function checkLength(num) {
        if (num.toString().length > 17) {
            num = 'Infinity';
            $('#display').prop('disabled', true);
            $('.calc-btn').css('pointer-events', 'none');
            $('.clear-btn,.delete-btn,.equal-btn').css(
                'pointer-events',
                'auto'
            );
        } else {
            $('#display').prop('disabled', false);
            $('.calc-btn').css('pointer-events', 'auto');
        }
    }

    $('.calc-btn').click(function (e) {
        clickedAC = false;

        var buttonAttr = $(this).attr('btn-attr');
        if (buttonAttr.slice(-1) >= 0 && buttonAttr.slice(-1) <= 9) {
            if (displayBox.value.length > 17) {
                checkLength(displayBox.value);
            } else {
                checkLength(displayBox.value);
                clickNumbers(
                    (displayBox.value.slice(-1) == '%' ? '×' : '') +
                    buttonAttr.slice(-1)
                );
            }
        } else if (buttonAttr.slice(0, 2) == 'op') {
            operatorClicked(buttonAttr.slice(3), e);
        } else if (buttonAttr == 'clear') {
            displayBox.value = '0';
            $('#display').prop('disabled', false);
            $('.calc-btn').css('pointer-events', 'auto');
            afterAC();
        } else if (buttonAttr == 'delete') {
            deleteByOne();
        } else if (buttonAttr == 'point') {
            decimalPointClicked();
        } else {
            evaluate();
        }
    });

    function afterAC() {
        var preExpression = $('.operand-operator').text();
        if (preExpression.trim() != '' && preExpression.slice(0, 3) != 'Ans') {
            var resultOfPreExpression = evaluateExpressionForAC(
                preExpression.slice(0, preExpression.length - 1)
            );
            $('.operand-operator').html(
                escapeHtml('Ans = ' + resultOfPreExpression)
            );
        }
        clickedAC = true;
    }

    function evaluateExpressionForAC(exp) {
        return customExpressionCalculator(
            exp
                .split('÷')
                .join('/')
                .split('×')
                .join('*')
                .split('%')
                .join('/100')
        );
    }

    function addBracletRegex(exp) {
        const r = new RegExp('([0-9]*%)+', 'ig');

        return exp.replace(r, function (match) {
            return `(${match})`;
        });
    }

    function deleteByOne() {
        if (displayBox.value.length > 1) {
            displayBox.value = displayBox.value.slice(
                0,
                displayBox.value.length - 1
            );
            checkLength(displayBox.value);
        } else {
            displayBox.value = 0;
            checkLength(displayBox.value);
        }
    }

    function operatorClicked(operator, e) {
        switch (operator) {
            case 'add':
                addClicked();
                break;
            case 'subtract':
                subtractClicked();
                break;
            case 'multiply':
                multiplyClicked();
                break;
            case 'divide':
                divideClicked();
                break;
            case 'percent':
                percentClicked();
                break;
            default:
            // default
        }
    }
    function decimalPointClicked() {
        if (!decimalExistInLastOperand()) {
            clickNumbers('.');
        }
    }
    function decimalExistInLastOperand() {
        var expression = displayBox.value.split(/[\+,\-,\%,\×,\÷]+/);
        var lastEle = expression[expression.length - 1];
        if (lastEle.indexOf('.') == -1) {
            return false;
        } else {
            return true;
        }
    }

    function isNumber(num) {
        if (num != '' && num >= 0 && num <= 9) {
            return true;
        } else {
            return false;
        }
    }
    function isDecimal(num) {
        if (num != '' && num == '.') {
            return true;
        } else {
            return false;
        }
    }
    function isOperator(op) {
        if (op == '+' || op == '-' || op == '×' || op == '÷' || op == '%') {
            return true;
        } else {
            return false;
        }
    }

    function isNegativeNumber() {
        if (['×', '÷'].indexOf(displayBox.value.slice(-1)) != -1) {
            return true;
        } else {
            return false;
        }
        // displayExpression == "0" ? return true : return false;
    }

    function addClicked() {
        if (
            isNumber(displayBox.value.slice(-1)) ||
            displayBox.value.slice(-1) == '%'
        ) {
            checkLength(displayBox.value);
            displayBox.value += '+';
        } else if (isDecimal(displayBox.value.slice(-1))) {
            checkLength(displayBox.value);
            displayBox.value += '0+';
        } else if (isOperator(displayBox.value.slice(-1))) {
            if (displayBox.value.slice(-1) != '+') {
                displayBox.value =
                    displayBox.value.slice(0, displayBox.value.length - 1) +
                    '+';
            }
        }
    }

    function subtractClicked() {
        if (displayBox.value == '0') {
            // negative number
            checkLength(displayBox.value);
            displayBox.value = '-';
        } else if (isNegativeNumber()) {
            // * / by negative no
            checkLength(displayBox.value);
            displayBox.value += '-';
        } else if (
            isNumber(displayBox.value.slice(-1)) ||
            displayBox.value.slice(-1) == '%'
        ) {
            checkLength(displayBox.value);
            displayBox.value += '-';
        } else if (isDecimal(displayBox.value.slice(-1))) {
            checkLength(displayBox.value);
            displayBox.value += '0-';
        } else if (isOperator(displayBox.value.slice(-1))) {
            if (displayBox.value.slice(-1) != '-') {
                displayBox.value =
                    displayBox.value.slice(0, displayBox.value.length - 1) +
                    '-';
            }
        }
    }
    function multiplyClicked() {
        if (
            isNumber(displayBox.value.slice(-1)) ||
            displayBox.value.slice(-1) == '%'
        ) {
            checkLength(displayBox.value);
            displayBox.value += '×';
        } else if (isDecimal(displayBox.value.slice(-1))) {
            checkLength(displayBox.value);
            displayBox.value += '0×';
        } else if (isOperator(displayBox.value.slice(-1))) {
            if (displayBox.value.slice(-1) != '×') {
                displayBox.value =
                    displayBox.value.slice(0, displayBox.value.length - 1) +
                    '×';
            }
        }
    }
    function divideClicked() {
        if (
            isNumber(displayBox.value.slice(-1)) ||
            displayBox.value.slice(-1) == '%'
        ) {
            checkLength(displayBox.value);
            displayBox.value += '÷';
        } else if (isDecimal(displayBox.value.slice(-1))) {
            checkLength(displayBox.value);
            displayBox.value += '0÷';
        } else if (isOperator(displayBox.value.slice(-1))) {
            if (displayBox.value.slice(-1) != '÷') {
                displayBox.value =
                    displayBox.value.slice(0, displayBox.value.length - 1) +
                    '÷';
            }
        }
    }
    function percentClicked() {
        if (isNumber(displayBox.value.slice(-1))) {
            checkLength(displayBox.value);
            displayBox.value += '%';
        } else if (isDecimal(displayBox.value.slice(-1))) {
            checkLength(displayBox.value);
            displayBox.value += '0%';
        } else if (isOperator(displayBox.value.slice(-1))) {
            if (displayBox.value.slice(-1) != '%') {
                displayBox.value =
                    displayBox.value.slice(0, displayBox.value.length - 1) +
                    '%';
            }
        }
    }

    $('.hitory-btn').click(function () {
        $('.calculator').hide();
        $('.history').show();
        displayLastHistory();
    });
    $('.go-back').click(function () {
        $('.calculator').show();
        $('.history').hide();
    });
    function displayLastHistory() {
        var localData = storageReplacer.getLocalStorageItem('calculatorHis');
        if (localData) {
            var historyBox = $('.last-calc-body');
            var historyStr = '';
            var hisData = localData ? JSON.parse(localData) : null;
            for (var i = 0; i < hisData.length; i++) {
                var splitExp = hisData[i];
                historyStr +=
                    "<div class='l-cal-warp'>" +
                    "<p class='l-cacl' >" +
                    "<span class='part1'>" +
                    escapeHtml(splitExp.query) +
                    '&nbsp;&nbsp;=&nbsp;&nbsp;</span>' +
                    "<span class='part2' >" +
                    escapeHtml(splitExp.output) +
                    '</span>  ' +
                    '</p >' +
                    '</div >';
            }
            historyBox.html(historyStr);
        }
    }
}


// calculator js END

// PII accept
document.addEventListener('PiiAccept', function (e) {
    var PII_ACCEPT = e.detail;

    switch (PII_ACCEPT) {
        case true:
            $('.accept-prompt').hide();
            // get__Location();
            getCurrentLocationData();
            break;
        case false:
            $('.accept-prompt').show();
            break;
        case 'cancel':
            $('.triggerWidget').trigger('click');
            break;
    }
});

function checkPiiAccept() {
    return parseInt(storageReplacer.getLocalStorageItem('piiAccept')) == 1;
}

// search text input issues
$('.search-text').on('focus', function () {
    $(this).attr('placeholder', '');
});

$('.search-text').on('blur', function () {
    var placeholder = $(this).attr('data-placeholder');
    $(this).attr('placeholder', placeholder);
});

var widget = new Widget({
    activateTarget: true,
    toggleClassName: 'activeParent'
});

widget.init(function (e) {
    if (
        e.clickValue == 'linkout' &&
        !!storageReplacer.getLocalStorageItem('piiAccept') &&
        storageReplacer.getLocalStorageItem('piiAccept') == 1
    ) {
        e.clickElement.classList.remove('activeParent');
        e.clickElement.classList.remove('active');
    }
});

document.addEventListener('PiiAccept', function (e) {
    var PII_ACCEPT = e.detail;

    switch (PII_ACCEPT) {
        case 'cancel':
            $('.linkouts-list *').removeClass('activeParent');
            break;
    }
});

(function () {
    var linkOuts = document.querySelectorAll('[link-out-pii]');
    var performClickAction = (function () {
        return function (currentAttr) {
            var isPiiAccepted = getStorageItem('piiAccept');
            if (isPiiAccepted && isPiiAccepted == 1)
                window.open(currentAttr);
        };
    })();

    var renderEvent = (function () {
        if (linkOuts.length > 0) {
            for (var i = 0, len = linkOuts.length; i < len; i++) {
                linkOuts[i].addEventListener('click', function (e) {
                    var currentAttr = e.currentTarget.getAttribute(
                        'link-out-pii'
                    );
                    performClickAction(currentAttr);
                });
            }
        }
    })();
})();
