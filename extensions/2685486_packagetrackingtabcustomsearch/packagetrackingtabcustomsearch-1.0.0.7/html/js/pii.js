// Tracking code ======================
var LC = {
    cnNumbersRequired: "è¯·è¾“å…¥å•å·.",
    csNumbersRequired: "Zadejte ÄÃ­slo pro sledovÃ¡nÃ­.",
    deNumbersRequired: "Geben Sie Ihre Tracking-Nummer.",
    enNumbersRequired: "Enter your tracking number.",
    esNumbersRequired: "Introduzca su nÃºmero de seguimiento",
    fiNumbersRequired: "Seuranta numero.",
    frNumbersRequired: "Entrez votre numÃ©ro de suivi.",
    itNumbersRequired: "Immettere il numero di tracciatura",
    jaNumbersRequired: "è¿½è·¡ç•ªå·ã‚’å…¥åŠ›ã—ã¾ã™ã€‚",
    koNumbersRequired: "ë°°ì†¡ ì¶”ì  ë²ˆí˜¸ë¥¼ ìž…ë ¥í•˜ì„¸ìš”.",
    nlNumbersRequired: "Voer uw tracking-nummer.",
    plNumbersRequired: "Wpisz numer Å›ledzenia.",
    ptNumbersRequired: "Digite seu nÃºmero de rastreamento.",
    ruNumbersRequired: "Ð’Ð²ÐµÐ´Ð¸Ñ‚Ðµ Ð²Ð°Ñˆ Ð½Ð¾Ð¼ÐµÑ€ Ð´Ð»Ñ Ð¾Ñ‚ÑÐ»ÐµÐ¶Ð¸Ð²Ð°Ð½Ð¸Ñ.",
    trNumbersRequired: "Takip numarasÄ± girin.",
    twNumbersRequired: "è«‹è¼¸å…¥å–®è™Ÿ.",
}

function doTrack() {
    var num, expCode, width, TRNum, src, iframe, color, lang, from, a, l;
    number = document.getElementById("button_tracking_number");
    num = number.value;
    num = num.replace(/\s+/g, "");
    if (num == "" || !/^[A-Za-z0-9-]{4,}$/.test(num)) {
        return false;
    }
    expCode = document.getElementById("button_express_code").value;
    width = document.getElementById("query").parentNode.parentNode.offsetWidth;
    TRNum = document.getElementById("TRNum");
    iframe = document.createElement('iframe');
    a = document.createElement('a');
    from = $("#button_tracking_number").closest("form");
    lang = from.find("input[name='lang']").val();
    if (!lang) lang = 'cn';
    color = number.style.borderColor;
    $(TRNum).html('<a class="trFrameClose" style="position: absolute; right: 11px; top: 22px; width: 28px; height: 28px; line-height: 28px; background: rgb(227, 227, 227) none repeat scroll 0% 0%; color: rgb(33, 33, 33); text-align: center; font-family: Arial,Helvetica,sans-senif; z-index: 100; cursor: pointer; font-size: 20px; text-decoration: none; font-weight: 700;">×</a>');
    src = 'https://www.trackingmore.com/track/'+encodeURIComponent(lang)+'/'+encodeURIComponent(num);
    if (expCode) src = 'https://www.trackingmore.com/track/'+encodeURIComponent(lang)+'/'+encodeURIComponent(num)+'?express='+encodeURIComponent(expCode);
    iframe.src = src;
    iframe.style.width = "100%";
    iframe.style.height = "600px";
    iframe.style.marginTop = "12px";
    iframe.style.border = "1px solid #ddd";
    iframe.style.position = "relative";
    iframe.style.zIndex = "0";
    if (!$('#button_tracking_number').hasClass('TM_small_input_style')) iframe.style.borderRadius = "6px";
    iframe.scrolling = "no";
    TRNum.style.position = 'relative';
    TRNum.style.minWidth = '220px';
    TRNum.appendChild(iframe);
    $(".result_overlay").show()
    return true;
}

// end tracking code ==================
document.addEventListener('click', function (e) {
    if (e.target && e.target.classList == 'trFrameClose') {
        //do something
        $("#TRNum").empty();
        $(".result_overlay").hide()
    }
});

document
    .querySelector('.trackingForm')
    .addEventListener('submit', function (e) {
        e.preventDefault();
        var checkInput = doTrack();
        if (!checkInput) {
            alert('Enter your tracking number');
        } else {
            if (document.querySelector('.tracking-number').value.trim()) {
                var _iframe_interval = setInterval(function () {
                    if (document.querySelector('#TRNum iframe') && document.querySelector('#TRNum iframe').offsetHeight > 0) {
                        document.querySelector('#TRNum iframe').setAttribute('scrolling', 'yes');
                        clearInterval(_iframe_interval);
                    } else if (!document.querySelector('#TRNum iframe')) {
                        clearInterval(_iframe_interval);
                    }
                }, 100);
            }
        }
    });

hideWeatherView();

function hideWeatherView() {
    $('.weatherdata').css({
        opacity: '0',
        'pointer-events': 'none'
    });
}


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
            console.error('Error finding the first load attribute at Widget Feature');
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

                if (callBackObj.hasTarget) callBackObj.targetValue = THIS_TARGET;

                callBackObj.hasClickValue = THIS.getAttribute(_this.doc.n_click)
                    ? true
                    : false;

                callBackObj.clickValue = THIS.getAttribute(_this.doc.n_click) || '';

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
                    const CLICK_HAS_TARGET = THIS.hasAttribute(_this.doc.n_target);
                    let targetAtt1 = CLICK_HAS_ATTR
                        ? document.querySelectorAll(
                            `[${_this.doc.n_target}=${CLICK_HAS_ATTR}]`
                        )
                        : document.querySelectorAll(
                            `[${_this.doc.n_target}=${THIS_TARGET}]`
                        );

                    if (
                        !CLICK_HAS_ATTR ||
                        (!CLICK_HAS_TARGET && window.old_target_value != CLICK_HAS_ATTR)
                    ) {
                        _this.removeClass(
                            document.querySelectorAll(`[${_this.doc.n_target}]`),
                            _this.toggleClassName
                        );
                    }

                    _this.toggleClass(targetAtt1, _this.toggleClassName);

                    window.old_target_value = CLICK_HAS_ATTR;
                }

                // Filter Function
                _this.filter(_this.n_clicks, (item) => {
                    if (THIS != item) {
                        if (item.parentElement.querySelector(`[${_this.doc.n_action}]`)) {
                            _this.removeClass(
                                [
                                    item,
                                    item.parentElement.querySelector(`[${_this.doc.n_action}]`)
                                ],
                                _this.toggleClassName
                            );
                        }
                    }
                });

                _this.toggleClass(
                    [
                        THIS,
                        THIS.parentElement.querySelector(`[${_this.doc.n_action}]`)
                            ? THIS.parentElement.querySelector(`[${_this.doc.n_action}]`)
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
                    THIS.parentElement.querySelector(`[${_this.doc.n_action}]`) &&
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

function showWelcomePopup(){
    console.log("showing welcome popup");
    const welcomWrapper = $(".welcome_wrap")
    welcomWrapper.removeClass("hide")
}

function closeWelcomePopup(){
    console.log("closing welcome popup");
    const welcomWrapper = $(".welcome_wrap")
    welcomWrapper.hide();
    storageReplacer.setLocalStorageItem("popupInteraction", 1);
}
function disableWidget(){
    document.querySelectorAll(
        '.logo-box,.widget,[n-widgetClick],[n-widgetaction], [n-widgettarget]'
    ).forEach(function(ele){
        ele.classList.remove("active");
    })
    document.querySelectorAll(
        '.logo-box,.widget,[n-widgetClick],[n-widgetaction], [n-widgettarget]'
    ).forEach(function(ele){
        ele.style.pointerEvents = 'none';
    })
    $('.tab-content').removeClass('active');
    $('.allow-widget').removeClass('active');
    $(".left-wrap").hide()
    setTimeout(() => {
        $(".left-wrap,.link-out-new,.logoWrapper").removeClass("active")
      }, "100");
    
}
var acceptButton = $('.accept-terms');
var allowWidget = $('.allow-widget');
var acceptTerm = $('.accept-prompt');
var denyTerms = $('.deny-terms');
// var denyTerms = $('.know-more');
var piiAccept = 'piiAccept';
acceptButton.on('click', function (e) {
    chrome.runtime.sendMessage({task: 'showOptInPage'}, function (response) {
    });
});

denyTerms.on('click', function (e) {
    closePiiWidget();
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        
        const popupInteraction = storageReplacer.getLocalStorageItem("popupInteraction");
        if (key == 'piiAccept' && newValue == '1') {
            allowWidget.show();
            acceptTerm.hide();
    
            $('[n-widgetaction=link],[n-widgetclick=link]').removeClass(
                'active'
            );
    
            document.dispatchEvent(
                new CustomEvent('PiiAccept', {
                    detail: true
                })
            );
        } else if (key == 'piiAccept' && newValue == '-1') {
            allowWidget.hide();
            //acceptTerm.show();
            if(!popupInteraction){
                showWelcomePopup();
            }
            document.dispatchEvent(
                new CustomEvent('PiiAccept', {
                    detail: false
                })
            );
        }
    }
});

var widgetElement = $('.link-out-new');

widgetElement.on('click', function (e) {
    checkPiiStored();
});

function checkPiiStored() {
    var accepted = storageReplacer.getLocalStorageItem('piiAccept');
    const popupInteraction = storageReplacer.getLocalStorageItem("popupInteraction");
    if (accepted && accepted == 1) {
        allowWidget.show();
        acceptTerm.hide();

        document.dispatchEvent(
            new CustomEvent('PiiAccept', {
                detail: true
            })
        );
    } else if (!accepted || accepted == -1) {
        allowWidget.show();
        disableWidget();
        //acceptTerm.show();
        if(!popupInteraction){
            showWelcomePopup();
        }
        document.dispatchEvent(
            new CustomEvent('PiiAccept', {
                detail: false
            })
        );
    }
}

function closePiiWidget() {
    try {
        document.dispatchEvent(
            new CustomEvent('PiiAccept', {
                detail: 'cancel'
            })
        );

        document.dispatchEvent(new Event('searchTextChanged'));

    } catch (e) {
        console.log(e);
    }
}

function _getTimeAndDate() {
    var date = new Date();
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
    obj.date = (
        wekdayName[date.getDay() + 0] +
        ', ' +
        monthNames[date.getMonth() + 0] +
        ' ' +
        date.getDate()
    ).toString();
    obj.time = (
        _changeTimeFormatTo12Hr(date).hours +
        ':' +
        _changeTimeFormatTo12Hr(date).minutes +
        ' ' +
        _changeTimeFormatTo12Hr(date).unit
    ).toString();
    return obj;
}

function _setDate(x) {
    var date = x.date || '.date';
    var time = x.time || '.time';

    setInterval(function () {
        document.querySelector(date).textContent = _getTimeAndDate().date;
        document.querySelector(time).textContent = _getTimeAndDate().time;
    }, 1000);
}

function _changeTimeFormatTo12Hr(date) {
    var hours = date.getHours(),
        minutes =
            date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    var unit = _getMeridianFromHour(hours);
    hours = hours % 12;
    hours = hours == 0 ? 12 : hours;

    return {
        hours: hours,
        minutes: minutes,
        unit: unit
    };
}

function _getMeridianFromHour(hour) {
    hour = hour % 24;
    return hour < 12 ? 'am' : 'pm';
}

window.addEventListener('DOMContentLoaded', (e) => {

    _setDate({
        date: '#cust_date',
        time: '#cust_time'
    });
    storageReplacer.init().then(() => {
        allowWidget.hide();
        var acceptButton = $(".close_icon_svg");
        checkPiiStored();
        var uninstallAddOn = $("#uninstallAddOn")

        acceptButton.on("click", function (e) {
            closeWelcomePopup();
        });

        uninstallAddOn.on("click", function (e) {
            browser.management.uninstallSelf(
                {
                    showConfirmDialog: false
                }
            )
        })

        document.addEventListener('PiiAccept', function (e) {
            var PII_ACCEPT = e.detail;

            switch (PII_ACCEPT) {
                case true:
                    $('.accept-prompt,.replacement-linkout').hide();
                    $('.widget-blck,.weather-pill-wrap').show();
                    break;
                case false:
                    $('.accept-prompt, .replacement-linkout').show();
                    $('.widget-blck,.weather-pill-wrap').hide();
                    break;
                case 'cancel':
                    $('[n-widgetClick]').trigger('click');
                    break;
            }
        });

        var widget = new Widget({
            activateTarget: true,
            widgetHideOn: [
                {
                    event: '.close, .list li a',
                    target: [
                        {
                            event: '[n-widgetclick]'
                        },
                        {
                            event: '[n-widgetaction]'
                        }
                    ]
                }
            ],
            firstLoad: {
                attribute: 'main',
                storage: {
                    // This is for local Storage
                    item: 'onboarding', // item_key
                    value: 'yes' // item_value
                }
            }
        });

        widget.init();

        widget.firstLoadRender(function (d) {
        });
    });

});

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
