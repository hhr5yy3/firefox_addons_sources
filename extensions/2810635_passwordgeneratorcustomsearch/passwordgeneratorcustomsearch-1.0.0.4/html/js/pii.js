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

function changeTimeFormatTo12Hr(date) {
    var hours = date.getHours(),
        minutes =
            date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
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
                    value: '1'
                }
            }
        });
        widget.init();


        widget.firstLoadRender(function (d) {
            let check = storageReplacer.getLocalStorageItem("state");
            if (check == "Closed1" || check == "Closed2" || check == "Changed") {
                $('.replacement-linkout').show();
                // $('.widget-blck,.header-pill-wrap').hide();
            }
            // $('.link-out').removeClass('active');
            // $('.header-popup').removeClass('active');
        });

        checkPiiStored();
    });
});


const helper = {
    resetPointerEvent(e) {
        e.style.pointerEvents = "initial"
    },
    setOpacity(e) {
        e.style.opacity = .4
    },
    setPointerEvent(e) {
        e.style.pointerEvents = "none"
    },
    resetOpacity(e) {
        e.style.opacity = 1
    }
}
const App = {
    $: {
        checkboxes: document.querySelectorAll('.checkbox-wrap'),
        resetBtn: document.querySelector('.reset-btn'),
        copyBtn: document.querySelector('.copy-btn'),
        generateBtn: document.querySelector('.generate-btn'),
        displayOutput: document.querySelector('.display-output'),
        decreamentCounter: document.querySelectorAll('.decreament'),
        increamentCounter: document.querySelectorAll('.increament'),
        showCounter: document.querySelector('.show-counter'),
        parentCounter: document.querySelectorAll('.selection-counter'),
        increamentSlide: document.querySelector('.increament-slide'),
        decreamentSlide: document.querySelector('.decreament-slide'),
        slider: document.querySelector('#slide-id'),
        filterSelected: document.querySelectorAll('.selection-wrap'),
        getRange: document.querySelectorAll('.range-val'),

        configuration: {
            pass_length: 12,
            special_symbols: 1,
            lowercase_char: 1,
            uppercase_char: 1,
            numbers: 1,
            sum: 4,

            sumTotal() {
                this.sum = this.special_symbols + this.lowercase_char + this.uppercase_char + this.numbers;
            }
        },
        status: {
            symbols: true,
            lowercase: true,
            uppercase: true,
            numbers: true
        },
        objMapping: {
            symbols: 'special_symbols',
            lowercase: 'lowercase_char',
            uppercase: 'uppercase_char',
            numbers: 'numbers'
        },
        passLength: {
            1: 8,
            2: 10,
            3: 12,
            4: 14,
            5: 16,
            currentval: 3
        },
        types: {
            symbols: "!@#$%^&*()_+~\`|}{[]:;?><,./-'\"=",
            lowerCase: "abcdefghijklmnopqrstuvwxyz",
            upperCase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            numbers: "0123456789"
        },

        //toggle
        toggleCheckboxes(currentElement) {
            currentElement.classList.toggle('active');
            currentElement.parentElement.classList.toggle('filter-selected')
        },

        //slider
        checkSlideLimit(sliderEle) {
            let currentVal = parseInt(sliderEle.value);
            if (currentVal === 5) {
                helper.resetOpacity(this.decreamentSlide)
                helper.resetPointerEvent(this.decreamentSlide)
                helper.setOpacity(this.increamentSlide)
                helper.setPointerEvent(this.increamentSlide)
                return
            }
            if (currentVal === 1) {
                helper.resetOpacity(this.increamentSlide)
                helper.resetPointerEvent(this.increamentSlide)
                helper.setOpacity(this.decreamentSlide)
                helper.setPointerEvent(this.decreamentSlide)
                return
            }
            helper.resetOpacity(this.increamentSlide)
            helper.resetPointerEvent(this.increamentSlide)
            helper.resetOpacity(this.decreamentSlide)
            helper.resetPointerEvent(this.decreamentSlide)
        },

        activateRangeNumber(rangeElements, sliderEle) {
            rangeElements.forEach((rangeEl) => {
                if (+rangeEl.dataset.val == sliderEle.value) {
                    rangeEl.classList.add('active')
                } else {
                    rangeEl.classList.remove('active')
                }
            })

        },
        moveSlider(sliderEle, value) {
            var currentRangeValue = parseInt(sliderEle.value);
            sliderEle.value = currentRangeValue + value;
            this.checkSlideLimit(sliderEle)
            sliderEle.dataset.val = sliderEle.value;
            this.passLength['currentval'] = sliderEle.value;

        },
        rangeCalc(sliderEle) {
            this.checkSlideLimit(sliderEle)
            const newRange = sliderEle.value;
            sliderEle.dataset.val = newRange;
            this.passLength['currentval'] = newRange;

        },
        initialSliderPosition(sliderEle, value) {
            sliderEle.dataset.val = value;
            sliderEle.value = value
        },

        //generate

        setStatusFn(filterEle) {
            filterEle.forEach((ele) => {
                if (ele.classList.contains('filter-selected')) {
                    this.status[ele.dataset.name] = true;
                } else {
                    this.status[ele.dataset.name] = false;
                }
            })
        },
        checkFilterDisabled(resetBtn, genBtn) {
            this.configuration.sumTotal();
            let sum = +this.configuration["sum"];
            if (!sum) {
                helper.setOpacity(resetBtn);
                helper.setOpacity(genBtn)
                helper.setPointerEvent(resetBtn)
                helper.setPointerEvent(genBtn)
            } else {
                helper.resetOpacity(resetBtn)
                helper.resetOpacity(genBtn)
                helper.resetPointerEvent(resetBtn)
                helper.resetPointerEvent(genBtn)
            }
        },
        handleConfigFn() {
            for (let key in this.status) {
                if (!this.status[key]) {
                    this.configuration[this.objMapping[key]] = 0;
                } else {
                    this.configuration[this.objMapping[key]] = 1;
                }
            }
        },
        handlePassLengthFn() {
            this.configuration['pass_length'] = +this.passLength[this.passLength['currentval']];
        },

        //generate final

        upperCase() {
            return this.types.upperCase[Math.floor(Math.random() * this.types.upperCase.length)];
        },
        lowerCase() {
            return this.types.lowerCase[Math.floor(Math.random() * this.types.lowerCase.length)];
        },
        numbers() {
            return this.types.numbers[Math.floor(Math.random() * this.types.numbers.length)];
        },
        symbols() {
            return this.types.symbols[Math.floor(Math.random() * this.types.symbols.length)];
        },

        getRandomNumber(charLength) {
            return Math.floor(Math.random() * charLength);
        },
        shuffle(charString) {
            let charArr = charString.split('');
            var charLength = charArr.length;

            for (var i = 0; i < charLength - 1; ++i) {
                var j = this.getRandomNumber(charLength);

                var temp = charArr[i];
                charArr[i] = charArr[j];
                charArr[j] = temp;
            }

            charString = charArr.join('');
            return charString;
        },
        getRandomFn(fns) {
            let index = Math.floor(Math.random() * fns.length);
            return [fns[index]];
        },
        generateFinal() {
            this.configuration.sumTotal();

            let totalChar = '';

            let temp = [];
            const pipe = (fns) => {
                let val = '';
                if (fns.length === 1) {
                    let callingFunc = stringtoFunc.call(this, fns[0]);
                    val += callingFunc;
                } else {
                    fns.forEach((fn) => {
                        let callingFunc = stringtoFunc.call(this, fn);
                        val += callingFunc;
                    });
                }
                return val;
            };

            function stringtoFunc(stringMath) {
                switch (stringMath) {
                    case "symbols":
                        let value1 = this.symbols.call(this);
                        return value1;
                    case "lowerCase":
                        let value2 = this.lowerCase.call(this);
                        return value2;
                    case "numbers":
                        let value3 = this.numbers.call(this);
                        return value3;
                    case  "upperCase":
                        let value4 = this.upperCase.call(this);
                        return value4;
                }

            }

            for (let key in this.configuration) {
                switch (key) {
                    case 'lowercase_char':
                        for (let i = 0; i < +this.configuration[key]; i++) {
                            temp.push('lowerCase')
                        }
                        break
                    case 'numbers':
                        for (let i = 0; i < +this.configuration[key]; i++) {
                            temp.push('numbers')
                        }
                        ;
                        break
                    case 'special_symbols':
                        for (let i = 0; i < +this.configuration[key]; i++) {
                            temp.push('symbols')
                        }
                        ;
                        break
                    case 'uppercase_char':
                        for (let i = 0; i < +this.configuration[key]; i++) {
                            temp.push('upperCase')
                        }
                        ;
                        break
                }
            }
            ;

            totalChar += pipe(temp)

            let remainglength = +this.configuration["pass_length"] - +this.configuration["sum"];

            for (let i = 1; i <= remainglength; i++) {
                totalChar += pipe(this.getRandomFn(temp))
            }


            let finalOutput = this.shuffle(totalChar);
            $('.display-output').text(finalOutput);


        },
        copyClipboard(outputEle) {
            const tempElement = document.createElement("textarea");
            const generatedPassword = outputEle.textContent;

            tempElement.value = generatedPassword;
            $('body').append(tempElement);
            tempElement.select();
            document.execCommand("copy");
            tempElement.remove();
        }
    },

    init() {
        App.$.checkboxes.forEach(ele => {
            ele.addEventListener('click', function () {
                App.$.toggleCheckboxes(ele);

                App.$.setStatusFn(App.$.filterSelected);
                App.$.handleConfigFn();
                App.$.checkFilterDisabled(App.$.resetBtn, App.$.generateBtn);
            })
        });

        //slider
        App.$.increamentSlide.addEventListener('click', function () {
            App.$.moveSlider(App.$.slider, 1);
            App.$.activateRangeNumber(App.$.getRange, App.$.slider)
            App.$.handlePassLengthFn()
        });

        App.$.decreamentSlide.addEventListener('click', function () {
            App.$.moveSlider(App.$.slider, -1);
            App.$.activateRangeNumber(App.$.getRange, App.$.slider)
            App.$.handlePassLengthFn()
        });


        App.$.slider.addEventListener('input', function (e) {
            App.$.rangeCalc(App.$.slider);
            App.$.activateRangeNumber(App.$.getRange, App.$.slider)
            App.$.handlePassLengthFn()
        })

        //Initial Position
        App.$.initialSliderPosition(App.$.slider, 3)

        //Generate
        App.$.copyBtn.addEventListener('click', function () {
            App.$.copyClipboard(App.$.displayOutput)
        });
        App.$.resetBtn.addEventListener('click', function () {
            App.$.generateFinal()
        });
        App.$.generateBtn.addEventListener('click', function () {
            App.$.generateFinal()
        })

    },

    initCall() {
        App.$.generateFinal()
    }
}


function onLoadInit() {
    App.init();
    App.initCall();
}


//Widget

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
				// _this.filter(elements, function(els, idx) {
				// 	// els.classList.toggle(_this.toggleClassName);
				// });
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
            callObj.clickValue = "document";
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


var acceptButton = $(".accept");
var allowWidget = $(".allow-widget");
var acceptTerm = $(".accept-prompt");
var denyTerms = $("#denytTerms");
var piiAccept = "piiAccept";
acceptButton.on("click", function (e) {
    closePiiWidgetforAccept();
    chrome.runtime.sendMessage({task: "showOptInPage"}, function (response) {
    });
});

function triggerCloseWidget() {
    new Widget().removeClass(
        document.querySelectorAll(
            '[n-widgetClick],[n-widgetaction], [n-widgettarget]'
        ),
        'active'
    );
}
function triggerOpenWidget(){
    new Widget().addClass(
        document.querySelectorAll(
            '[n-widgetClick],[n-widgetaction], [n-widgettarget]'
        ),
        'active'
    );
}

document.addEventListener("searchTextChanged", function () {
    triggerCloseWidget()
})

denyTerms.on("click", function (e) {
    closePiiWidget();
});

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

function closePiiWidgetforAccept() {
    try {
        document.dispatchEvent(
            new CustomEvent('PiiAccept', {
                detail: 'cancel'
            })
        );
    } catch (e) {
        console.log(e);
    }
}


document.addEventListener("DOMContentLoaded", function () {
    storageReplacer.init().then(function () {
        allowWidget.hide();
        checkPiiStored();
        triggerOpenWidget()
    });
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (let [key, {oldValue, newValue}] of Object.entries(changes)) {
        if (key === "piiAccept" && newValue === "1") {
            allowWidget.show();
            acceptTerm.hide();
            $("[n-widgetaction=link1],[n-widgetclick=link1]").removeClass("active");
            document.dispatchEvent(
                new CustomEvent("PiiAccept", {
                    detail: true,
                })
            );
        } else if (key === "piiAccept" && newValue === "-1") {
            allowWidget.hide();
            acceptTerm.show();

            document.dispatchEvent(
                new CustomEvent("PiiAccept", {
                    detail: false,
                })
            );
        }
    }
});


function checkPiiStored() {
    var accepted = storageReplacer.getLocalStorageItem("piiAccept");
    if (accepted && accepted == 1) {
        allowWidget.show();
        acceptTerm.hide();
        document.dispatchEvent(
            new CustomEvent("PiiAccept", {
                detail: true,
            })
        );
    } else if (!accepted || accepted == -1) {
        allowWidget.hide();
        acceptTerm.show();

        document.dispatchEvent(
            new CustomEvent("PiiAccept", {
                detail: false,
            })
        );
    }
}

