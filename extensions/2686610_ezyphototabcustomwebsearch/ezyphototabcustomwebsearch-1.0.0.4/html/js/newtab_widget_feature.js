window.Widget = function(queryP) {
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

Widget.prototype.removeClass = function(elem, className) {
    try {
        if (elem) {
            this.filter(elem, function(item, index) {
                if (item) {
                    item.classList.remove(className);
                }
            });
        }
    } catch (e) {
        console.log(e);
    }
};

Widget.prototype.addClass = function(elem, className) {
    try {
        if (elem) {
            this.filter(elem, function(item, index) {
                if (item) {
                    item.classList.add(className);
                }
            });
        }
    } catch (e) {
        console.log(e);
    }
};

Widget.prototype.toggleClass = function(elem, className) {
    try {
        if (elem) {
            this.filter(elem, function(item, index) {
                if (item) {
                    item.classList.toggle(className);
                }
            });
        }
    } catch (e) {
        console.log(e);
    }
};

Widget.prototype.filter = function(el, cb) {
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

Widget.prototype.widgetHideOn = function() {
    try {
        const _this = this;
        _this.queryP.widgetHideOn.forEach((item) => {
            const elem =
                item.event == 'document'
                    ? [document]
                    : document.querySelectorAll(item.event);

            _this.filter(elem, function(elemItem, count) {
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

Widget.prototype.firstLoadRender = function(callBack) {
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
                _this.filter(elements, function(els, idx) {
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

Widget.prototype.init = function(callBack) {
    // Loop for the click
    const _this = this;
    try {
        _this.filter(_this.n_clicks, function(elementItems, count) {
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

        _this.filter([..._this.n_clicks, ..._this.n_actions], function(el, i) {
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
