browser = typeof browser === 'undefined' ? chrome : browser;

const LOG_FILL_FIELDS_HAS_FAILED_ENDPOINT = '/api/v1/log/addon';
const LOG_FILL_FIELDS_AFTER_TIMEOUT = 10;

const HAS_MUTATED_EVENT = 'hasMutatedEvent';

function emitEvent(eventName, params) {
    $('body').trigger(eventName, params);
}

function bindListener(eventName, callback) {
    $('body').on(eventName, callback);
}

class P24ContentScript {

    /**
     * @param applicationUrl
     */
    constructor(applicationUrl) {
        this._scenario = {};
        this._regex = /.*:\/\/(rc-go|rc|go|secure).przelewy24.pl\/[^/]+\/[^/]+.*$/;
        this._methodRegex = /.*:\/\/(rc-go|rc|go|secure).przelewy24.pl\/[^/]+\/[^/]*/;
        this._applicationUrl = applicationUrl;
        this._context = top.document;
        this._sleep = 0;
    }

    get sleep() {
        return this._sleep;
    }

    set sleep(value) {
        this._sleep = value;
    }

    set context(value) {
        this._context = value;
    }

    get context() {
        return this._context;
    }

    set methodId(value) {
        this._methodId = value;
    }

    get methodId() {
        return this._methodId;
    }

    get scenario() {
        return this._scenario;
    }

    set scenario(value) {
        this._scenario = value;
    }

    get values() {
        return this._values;
    }

    set values(value) {
        this._values = value;
    }

    get p24Url() {
        return this._p24Url;
    }

    get p24BaseUrl() {
        const protocol = this._p24Url.split('//')[0];
        const hostname = this._p24Url.split('/')[2];
        const baseUrl = protocol + '//' + hostname;
        return baseUrl.replace('go.', 'secure.');
    }

    get p24LogFillFieldsUrl() {
        return this.p24BaseUrl + LOG_FILL_FIELDS_HAS_FAILED_ENDPOINT;
    }

    get transactionToken() {
        const indexOfTrnRequest = this.p24Url.lastIndexOf('trnRequest/');
        const indexOfTrnRequestSlash = indexOfTrnRequest + 11;
        const tokenLength = 35

        return this.p24Url.substring(indexOfTrnRequestSlash, indexOfTrnRequestSlash + tokenLength);
    }

    set p24Url(p24Url) {
        this._p24Url = p24Url;
    }

    get bankObserverRunning() {
        return this._bankObserverRunning;
    }

    set bankObserverRunning(value) {
        this._bankObserverRunning = value;
    }

    get applicationUrl() {
        return this._applicationUrl;
    }

    get regex() {
        return this._regex;
    }

    get methodRegex() {
        return this._methodRegex;
    }

    set applicationUrl(value) {
        this._applicationUrl = value;
    }

    /**
     *
     * @param url
     * @returns {Promise<any>}
     */
    static async getConfig(url) {
        const response = await fetch(url, {
            method: 'GET'
        });
        return await response.json();
    };

    /**
     *
     * @returns {Promise<any>}
     */
    static async postScriptFillingFieldsHasFailed() {
        const response = await fetch(p24ContentScript.p24LogFillFieldsUrl, {
            method: 'POST',
            body: JSON.stringify({
                'token': p24ContentScript.transactionToken,
                'data': p24ContentScript.methodId
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await response.json();
    };

    /**
     *
     * @returns {*|jQuery}
     */
    getScenariosUrl() {
        return $('meta[name=addonConfigUrl]').attr('content');
    };

    /**
     *
     * @param url
     * @returns {string}
     */
    getMethodFromUrl(url) {
        let parsedUri = url.split('/');
        return parsedUri[parsedUri.length - 1];
    };

    /**
     *
     * @param scenario
     * @returns {Promise<*>}
     */
    static async saveScenario(scenario) {
        browser.runtime.sendMessage({
            'action': 'saveScenario',
            'payload': scenario
        });
    };

    /**
     *
     * @param values
     * @returns {Promise<void>}
     */
    static async saveValues(values) {
        browser.runtime.sendMessage({
            'action': 'saveValues',
            'payload': values
        })
    }

    /**
     *
     * @param methodId
     * @returns {Promise<void>}
     */
    static async saveMethodId(methodId) {
        browser.runtime.sendMessage({
            'action': 'saveMethodId',
            'payload': methodId
        })
    }

    /**
     *
     * @param token
     * @returns {Promise<void>}
     */
    static async saveP24Url(token) {
        browser.runtime.sendMessage({
            'action': 'saveP24Url',
            'payload': token
        })
    }

    /**
     *
     * @returns {Promise<any>}
     */
    async getValues() {
        let promise = new Promise((resolve) => {
            browser.runtime.sendMessage({
                'action': 'getValues'
            }, function(response) {
                resolve(response)
            });
        });
        return await promise;
    }

    /**
     *
     * @returns {Promise<any>}
     */
    async getP24Url() {
        let promise = new Promise((resolve) => {
            browser.runtime.sendMessage({
                'action': 'getP24Url'
            }, function(response) {
                resolve(response)
            });
        });
        return await promise;
    }

    /**
     *
     * @returns {Promise<any>}
     */
    async getMethodId() {
        let promise = new Promise((resolve) => {
            browser.runtime.sendMessage({
                'action': 'getMethodId'
            }, function(response) {
                resolve(response)
            });
        });
        return await promise;
    }

    /**
     *
     * @returns {Promise<*>}
     */
    async getScenario() {
        let promise = new Promise((resolve) => {
            browser.runtime.sendMessage({
                'action': 'getScenario'
            }, function(response) {
                resolve(response)
            })
        });
        return await promise;
    };

    /**
     * @param url
     * @param regex
     * @returns {boolean}
     */
    static checkUrlInRegex(url, regex) {
        return url.match(regex) !== null && url.match(regex)[0] !== '';
    };

    get isDefaultScenarioCompleted() {
        return this.scenario.default.reduce(function(carry, step) {
            return carry && step !== undefined && step.completed !== undefined && step.completed === 'true'
        }, true);
    }

    get hasFillStep() {
        return this.scenario.default.reduce(function(carry, step) {
            return carry || (step !== undefined && step.fill !== undefined)
        }, false);
    }
}

let sent = false;
const publishErrors = (e) => {
    if (sent || (!p24ContentScript.hasFillStep) || p24ContentScript.isDefaultScenarioCompleted) {
        return;
    }

    P24ContentScript.postScriptFillingFieldsHasFailed().then((response) => {
    }).catch((err) => {
    });
    sent = true;
}

let publishErrorListenersHasBeenBound = false;
bindListener(HAS_MUTATED_EVENT, () => {
    if (publishErrorListenersHasBeenBound) {
        return;
    }
    window.setTimeout(publishErrors, LOG_FILL_FIELDS_AFTER_TIMEOUT * 1000);
    window.addEventListener('beforeunload', publishErrors);
    publishErrorListenersHasBeenBound = true;
});


/**
 * @type {MutationObserver}
 */
let obs = new MutationObserver(function(mutations) {
    function triggerMutation() {
        window.setTimeout(function() {
            $('body').attr('p24attr', Math.random().toString());
        }, 0);
    }

    emitEvent(HAS_MUTATED_EVENT);

    mutations.forEach(function() {
        if (!p24ContentScript.values || p24ContentScript.values.length <= 0) {
            p24ContentScript.getValues().then((response) => {
                p24ContentScript.values = response;
            })
            p24ContentScript.getP24Url().then((response) => {
                p24ContentScript.p24Url = response;
            })
            p24ContentScript.getMethodId().then((response) => {
                p24ContentScript.methodId = response;
            })
        }
        switch (true) {
            case false === jQuery.isEmptyObject(p24ContentScript.scenario):
                try {
                    p24ContentScript.scenario.default.forEach(function(step) {

                        if (!p24ContentScript.scenario.default.p24values) {
                            p24ContentScript.scenario.default.p24values = p24ContentScript.values;
                        }
                        step.completed = typeof step.completed === 'undefined' ? 'false' : step.completed;

                        if ('false' === step.completed) {

                            switch (Object.keys(step).find((element) => {
                                return element !== 'completed'
                            })) {
                                case 'fill':
                                    step.fill.forEach(function(selector) {
                                        let value = p24ContentScript.scenario.default.p24values.filter(value => {
                                            return value.equivalent === selector.equivalent;
                                        })[0].value;
                                        let input = $(`${selector.selector}`, p24ContentScript.context);
                                        let replace = typeof selector.replace !== 'undefined' ? selector.replace : {
                                            'substr': '',
                                            'newSubStr': ''
                                        };
                                        value = value.replace(replace.substr, replace.newSubStr);
                                        let inputType = selector.type || 'value';
                                        if (input.length > 0) {
                                            step.completed = 'true';
                                            switch (inputType) {
                                                case 'value':
                                                    input.val(value);
                                                    break;
                                                case 'html':
                                                    input.html(value);
                                                    break;
                                                default:
                                                    input.val(value);
                                                    break;
                                            }
                                        }
                                    });
                                    break;
                                case 'append':
                                    let append = $(`${step.append.selector}`, p24ContentScript.context);
                                    append.append(step.append.content);
                                    step.completed = 'true';
                                    break;
                                case 'click':
                                    let click = $(`${step.click}`, p24ContentScript.context);
                                    if (click.length > 0) {
                                        step.completed = 'true';
                                        click[0].click();
                                    }
                                    break;
                                case 'context':
                                    let newContext = $(`${step.context}`, p24ContentScript.context);
                                    if (newContext.length > 0) {
                                        p24ContentScript.context = newContext.contents();
                                        step.completed = 'true';
                                    }
                                    break;
                                case 'wait':
                                    let wait = $(`${step.wait}`, p24ContentScript.context);
                                    switch (step.x_action) {
                                        case 'disappear':
                                            if (wait.length <= 0) {
                                                step.completed = 'true';
                                            }
                                            break;
                                        default:
                                            if (wait.length > 0) {
                                                step.completed = 'true';
                                            }
                                            break;
                                    }
                                    break;
                                case 'trigger':
                                    let trigger = $(`${step.trigger.selector}`, p24ContentScript.context);
                                    let event = jQuery.Event(step.trigger.event, step.trigger.data);
                                    if (trigger.length > 0) {
                                        step.completed = 'true';
                                        trigger.trigger(event);
                                    }
                                    break;
                                case 'event':
                                    let obj = $(`${step.event.selector}`, p24ContentScript.context);
                                    let jsEvent = new Event(step.event.event, step.event.data);
                                    if (obj.length > 0) {
                                        step.completed = 'true';
                                        obj[0].dispatchEvent(jsEvent);
                                    }
                                    break;
                                case 'sleep':
                                    if (p24ContentScript.sleep === 0) {
                                        p24ContentScript.sleep = 1;
                                        window.setTimeout(function() {
                                            p24ContentScript.sleep = 2;
                                            triggerMutation();
                                        }, step.sleep);
                                    }
                                    if (p24ContentScript.sleep === 2) {
                                        step.completed = 'true';
                                        p24ContentScript.sleep = 0;
                                    }
                                    break;
                                case 'changeScenario':
                                    if ($(`${step.changeScenario.condition}`, p24ContentScript.context).length > 0) {
                                        p24ContentScript.scenario.default = p24ContentScript.scenario[step.changeScenario.scenario];
                                    }
                                    step.completed = 'true';
                                    break;
                                default:
                                    stepProps = stepProps.reverse();
                            }
                            if (step.completed === 'true') {
                                triggerMutation();
                            }
                            P24ContentScript.saveScenario(p24ContentScript.scenario);
                            throw {};
                        }
                    });
                } catch (error) {
                }
                break;
        }
    });
});

let p24ContentScript = new P24ContentScript(window.location.href);

window.addEventListener('customUrlChanged', () => {
    p24ContentScript.applicationUrl = window.location.href;
    if (!p24ContentScript.applicationUrl.includes('change') &&
        P24ContentScript.checkUrlInRegex(p24ContentScript.applicationUrl, p24ContentScript.methodRegex)
    ) {
        P24ContentScript.getConfig(p24ContentScript.getScenariosUrl()).then((response) => {
            let fields = [];
            let p24Selectors = $('[data-etransfer]');
            p24ContentScript.methodId = p24Selectors.filter((selector) => {
                return p24Selectors[selector].dataset.etransfer === 'method';
            })[0].lastChild.nodeValue;

            for (let field of p24Selectors) {
                fields.push({
                    'value': (field.innerText).replace(' PLN', ''),
                    'equivalent': $(field).data('etransfer'),
                });
            }
            p24ContentScript.values = fields;
            const scenario = response[p24ContentScript.methodId];
            if (scenario && typeof scenario !== 'undefined') {
                $('#p24_ext').remove();
            }

            P24ContentScript.saveMethodId(p24ContentScript.methodId).then(() => {
            });
            P24ContentScript.saveValues(fields)
                .then(() => {
                    p24ContentScript.values = fields;
                });
            P24ContentScript.saveScenario(scenario)
                .then(
                    p24ContentScript.scenario = scenario
                );

            const p24Url = p24ContentScript.applicationUrl;
            P24ContentScript.saveP24Url(p24Url)
                .then(() => {
                    p24ContentScript.p24Url = p24Url;
                });
        });
    }
});

switch (true) {
    case jQuery.isEmptyObject(p24ContentScript.scenario) &&
    !P24ContentScript.checkUrlInRegex(p24ContentScript.applicationUrl, p24ContentScript.regex):
        p24ContentScript.getScenario().then(function(response) {
            p24ContentScript.scenario = response;
            if (!P24ContentScript.checkUrlInRegex(p24ContentScript.applicationUrl, p24ContentScript.scenario.url)) {
                if (window.bankObserverRunning) {
                    obs.disconnect();
                }
                p24ContentScript.scenario.default.filter(function(step) {
                    return Object.keys(step)[0] === 'fill'
                }).forEach(function(step) {
                    step.fill.forEach(function(field) {
                        let filteredField = fields.filter(function(selector) {
                            return selector.equivalent === field.equivalent
                        });
                        field.value = filteredField[0].value;
                    })
                });
                P24ContentScript.saveScenario(p24ContentScript.scenario);
                return false;
            }
            if (!window.bankObserverRunning) {
                obs.observe(document.body, {
                    subtree: true,
                    attributes: true,
                    childList: true
                });
            }
            P24ContentScript.saveScenario(p24ContentScript.scenario);
        });
        break;
}

browser.runtime.onMessage.addListener(function(message) {
    switch (message.action) {
        case 'getScenariosUrl':
            let configUrl = getScenariosUrl();
            browser.runtime.sendMessage({
                action: 'downloadConfig',
                payload: {
                    urlConfig: configUrl
                }
            });
            break;
        case 'getConfig':
            p24ContentScript.scenario = message.payload;
            p24ContentScript.scenario.sleep = 0;
            break;
        case 'getValues':
            p24ContentScript.values = message.payload;
            break;
        default:
            p24ContentScript.scenario = message;
            p24ContentScript.scenario.sleep = 0;
            break;
    }
});
