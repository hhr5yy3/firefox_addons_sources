(function() {'use strict';
    //for dev record
    const TAG = '[PS][Facebook.Scanner]';
    const DEV = false;
    const withDelay = (func, interval = 1000) => {
        return new Promise((resolve) => {
            setTimeout(() => { resolve(func()) }, interval)
        })
    }

    const withDelayAsync = (func, interval = 1000) => {
        return new Promise((resolve) => {
            setTimeout(async () => { resolve(await func()) }, interval)
        })
    }

    const withRetry = async (func, time = 3) => {
        if (time > 0) {
          const result = await func();

          if (!result) {
            return await withRetry(func, time-1);
          }
        }

        return true;
    };

    const getAllOptions = controlItems => (
        Array.from(controlItems).map(controlItem => (
            controlItem.textContent
        )).reduce((acc, curr, index) => ({
            ...acc,
            [index]: curr
        }), {})
    );

    const getPartialOptions = ({ controlItems, activeIndex }) => (
        Array.from(controlItems).map((controlItem, index) => {
            const active = activeIndex.indexOf(index) > -1;

            return active ? controlItem.children[0].textContent : null;
        }).filter(option => (
            !!option
        )).reduce((acc, curr, index) => ({
            ...acc,
            [index]: curr
        }), {})
    );

    const getSelectedOption = ({ id, controlItems, allOptions }) => {
        for (let i = 0; i < controlItems.length; i++) {
            if (controlItems[i].getAttribute('aria-checked')) {
                return (id === 20) ?
                    Object.values(allOptions).indexOf(controlItems[i].firstChild.textContent) :
                    Object.values(allOptions).indexOf(controlItems[i].textContent);
            }
        }

        return null;
    };

    const initialScanResult = (id) => {
        const scanResultTemplate = FacebookScanResultsTemplate.find(scanResultTemplate => scanResultTemplate.ID === id);
        return {
            ...scanResultTemplate,
            'PossibleValue' : {},
            'Current' : null,
            'Title' : '',
            'Desc' : '',
            'id': id
        };
    }

    const settingsPages = {
        'Privacy': 'a[href="https://www.facebook.com/settings?tab=privacy"]',
        'ProfileAndTagging': 'a[href="https://www.facebook.com/settings?tab=timeline"]'
    };

    const openSettingsPage = async (pageName) => {
        const pagePath = settingsPages[pageName];
        if(!pagePath) {
            return;
        }
        
        await withDelay(() => {
            document.querySelector(pagePath).click();
        });
    };

    const getDialogOptions = () => {
        let options = {
            possibleOptions: {},
            selectedOption: 0
        };

        do {
            let dialog = document.querySelector('[role="dialog"]');
            if(!dialog) {
                break;
            }

            let radios = dialog.querySelectorAll('[role="radio"]');
            if(radios.length === 0) {
                break;
            }

            for(let index = 0; index < radios.length; index++) {
                options.possibleOptions[index.toString()] = radios[index].querySelector('span').innerText;
                if(radios[index].getAttribute('aria-checked') === 'true') {
                    options.selectedOption = index;
                }
            }

            let buttons = dialog.querySelectorAll('[role="button"]');
            if(buttons.length > 0) {
                buttons[0].click();
            }

        } while(false);

        DEV && console.log('getDialogOptions: options = ' + JSON.stringify(options));

        return options;
    };

    const getSettingOptionsInfo = async (options) => {
        let ret = {
            result: false,
            possibleOptions: { 0: null, 1: null },
            selectedOption: 0,
            title: ''
        };

        let { optionType, optionIndex, titleIndex, descIndex, buttonIndex ,switchIndex } = options;

        do {
            let mainElement = document.querySelector('[role="main"]');
            if(!mainElement) {
                DEV && console.log('failed to get mainElement');
                break;
            }

            // Get title
            let divs = mainElement.querySelectorAll('div[style]');
            if(divs.length < 3) {
                break;
            }

            let spans = divs[optionIndex].querySelectorAll('span[dir="auto"]');
            ret.title = spans[titleIndex].innerText;
            ret.desc = (descIndex && spans[descIndex]) ? spans[descIndex].innerText : spans[titleIndex].innerText;

            switch (optionType) {
                case 'radio':
                    // Click button and get raios contents in popup
                    let buttons = mainElement.querySelectorAll('[role="button"]');
                    // if(buttons.length < 4) {
                    //     break;
                    // }
                    buttons[buttonIndex].click();

                    ret.result = await withDelay(() => {
                        
                        let options = getDialogOptions();
                        if(Object.keys(options.possibleOptions).length === 0) {
                            return false;
                        }

                        ret.possibleOptions = options.possibleOptions;
                        ret.selectedOption = options.selectedOption;

                        return true;
                    });
                    break;
                case 'switch':
                    // Get selectedOption
                    let switchs = mainElement.querySelectorAll('[role="switch"]');
                    if(switchs.length === 0) {
                        DEV && console.log('failed to get switchs');
                        break;
                    }
                    ret.selectedOption = switchs[switchIndex].checked ? 1 : 0;
                    ret.result = true;
                    break;
            }

        } while(false);

        return ret;

    };

    var Scanner = function() {
        this.PROTOCOL_DOMAIN = PUtil.checkPage.IsFacebook() ? window.location.protocol + '//' + window.location.host : 'https://www.facebook.com';
        this.responseHeaderScanSingle = FPScanSingleResponse;
        this.responseHeaderScan = FPScanResponse;
        
        this.UserInfo = {
            hasUserInfo : false,
            userID : null,
            token: null,
            isUnder18 : null
        }
    };

    var scanList = [{
        id: 20,
        category: 'privacy',
        path: 'a[href="/settings?tab=privacy&section=composer"]',
        newSettingPath: 'a[href="https://www.facebook.com/settings/?tab=posts"]',
        automation: true,
        isNewSettings: function() {
            if(document.querySelector(this.newSettingPath)){
                return true;
            }
            return false;
        },
        getOptionInfo: controlItems => {
            /**
             * When selected option is `friends; except ...`, it will be classified into `specific friends` option
             * and `specific friends` option will be added into `allOptions`. Then, We can not find `friends; except ...`
             * option in `allOptions` when `getSelectedOption()`. Hence, use flag to handle this situation.
             */
            let isExceptOption = false;
            const activeIndex = new Set([0, 1]);

            // Update active options index
            for (let i = 0; i < controlItems.length; i++) {
                if (controlItems[i].getAttribute('aria-checked')) {
                    const addedIndex = (i === 2) ? 5 : i;
                    isExceptOption = i === 2;

                    activeIndex.add(addedIndex);
                    break;
                }
            }

            // Add specific friends to option list
            if (activeIndex.size === 2) {
                activeIndex.add(5);
            }

            const allOptions =  getPartialOptions({
                controlItems,
                activeIndex: Array.from(activeIndex.values()),
            });

            return {
                possibleOptions: allOptions,
                selectedOption: isExceptOption ?
                    (activeIndex.size - 1) :
                    getSelectedOption({ id: 20, controlItems, allOptions }),
            };
        },
        newSettingAutomationProcess: async function(callback) {
            await withDelay(() => {
                let tab = document.querySelector(this.newSettingPath);
                tab && tab.click();
            });

            let scanResult = initialScanResult(this.id);
            await withRetry(async () => {    
                return await withDelay(async() => {
                    let options = {
                        optionType: 'radio',
                        optionIndex: 1,
                        titleIndex: 0,
                        descIndex: 1,
                        buttonIndex: 0,
                        switchIndex: null
                    }

                    let getOptionInfoRet = await getSettingOptionsInfo(options);
                    if(!getOptionInfoRet.result) {
                        return false;
                    }

                    scanResult = {
                        ...scanResult,
                        PossibleValue: getOptionInfoRet.possibleOptions,
                        Current: getOptionInfoRet.selectedOption,
                        Title: getOptionInfoRet.title,
                        Desc: getOptionInfoRet.desc
                    };

                    return true;
                });
            });
                        
            DEV && console.log('scanResult = ' + JSON.stringify(scanResult));
            callback(scanResult);

        }
    }, {
        id: 22,
        category: 'privacy',
        path: 'a[href="/settings?tab=privacy&section=findemail"]',
        newSettingPath: 'a[href="https://www.facebook.com/settings/?tab=how_people_find_and_contact_you"]',
        automation: true,
        isNewSettings: function() {
            if(document.querySelector(this.newSettingPath)){
                return true;
            }
            return false;
        },
        getOptionInfo: controlItems => {
            const allOptions =  getAllOptions(controlItems);

            return {
                possibleOptions: allOptions,
                selectedOption: getSelectedOption({ id: 22, controlItems, allOptions }),
            };
        },
        newSettingAutomationProcess: async function(callback) {
            await withDelay(() => {
                let tab = document.querySelector(this.newSettingPath);
                tab && tab.click();
            });

            let scanResult = initialScanResult(this.id);
            await withRetry(async () => {    
                return await withDelay(async() => {
                    let options = {
                        optionType: 'radio',
                        optionIndex: 3,
                        titleIndex: 0,
                        descIndex: 1,
                        buttonIndex: 3,
                        switchIndex: null
                    }

                    let getOptionInfoRet = await getSettingOptionsInfo(options);

                    if(!getOptionInfoRet.result) {
                        return false;
                    }

                    scanResult = {
                        ...scanResult,
                        PossibleValue: getOptionInfoRet.possibleOptions,
                        Current: getOptionInfoRet.selectedOption,
                        Title: getOptionInfoRet.title,
                        Desc: getOptionInfoRet.desc
                    };

                    return true;
                });
            });
                        
            DEV && console.log('scanResult = ' + JSON.stringify(scanResult));
            callback(scanResult);

        }
    } , {
        id: 23,
        category: 'privacy',
        path: 'a[href="/settings?tab=privacy&section=findphone"]',
        newSettingPath: 'a[href="https://www.facebook.com/settings/?tab=how_people_find_and_contact_you"]',
        automation: true,
        isNewSettings: function() {
            if(document.querySelector(this.newSettingPath)){
                return true;
            }
            return false;
        },
        getOptionInfo: controlItems => {
            const allOptions =  getAllOptions(controlItems);

            return {
                possibleOptions: allOptions,
                selectedOption: getSelectedOption({ id: 23, controlItems, allOptions }),
            }
        },
        newSettingAutomationProcess: async function(callback) {
            await withDelay(() => {
                let tab = document.querySelector(this.newSettingPath);
                tab && tab.click();
            });

            let scanResult = initialScanResult(this.id);
            await withRetry(async () => {    
                return await withDelay(async() => {
                    let options = {
                        optionType: 'radio',
                        optionIndex: 4,
                        titleIndex: 0,
                        descIndex: 1,
                        buttonIndex: 3,
                        switchIndex: null
                    }

                    let getOptionInfoRet = await getSettingOptionsInfo(options);

                    if(!getOptionInfoRet.result) {
                        return false;
                    }

                    scanResult = {
                        ...scanResult,
                        PossibleValue: getOptionInfoRet.possibleOptions,
                        Current: getOptionInfoRet.selectedOption,
                        Title: getOptionInfoRet.title,
                        Desc: getOptionInfoRet.desc
                    };

                    return true;
                });
            });
                        
            DEV && console.log('scanResult = ' + JSON.stringify(scanResult));
            callback(scanResult);

        }
    }, {
        id: 24,
        category: 'privacy',
        path: 'a[href="/settings?tab=privacy&section=search"]',
        newSettingPath: 'a[href="https://www.facebook.com/settings/?tab=how_people_find_and_contact_you"]',
        automation: true,
        isNewSettings: function() {
            if(document.querySelector(this.newSettingPath)){
                return true;
            }
            return false;
        },
        getOptionInfo: isChecked => ({
            possibleOptions: { 0: null, 1: null },
            selectedOption: isChecked ? 1 : 0,
        }),
        newSettingAutomationProcess: async function(callback) {
            await withDelay(() => {
                let tab = document.querySelector(this.newSettingPath);
                tab && tab.click();
            });

            let scanResult = initialScanResult(this.id);
            await withRetry(async () => {    
                return await withDelay(async () => {
                    let options = {
                        optionType: 'switch',
                        optionIndex: 5,
                        titleIndex: 0,
                        descIndex: 1,
                        buttonIndex: null,
                        switchIndex: 0
                    }

                    let getOptionInfoRet = await getSettingOptionsInfo(options);


                    if(!getOptionInfoRet.result) {
                        return false;
                    }

                    scanResult = {
                        ...scanResult,
                        PossibleValue: getOptionInfoRet.possibleOptions,
                        Current: getOptionInfoRet.selectedOption,
                        Title: getOptionInfoRet.title,
                        Desc: getOptionInfoRet.desc
                    };

                    return true;
                });
            });
                        
            DEV && console.log('scanResult = ' + JSON.stringify(scanResult));
            callback(scanResult);

        }
    }, {
        id: 31,
        category: 'profile and tagging',
        path: 'a[href="/settings?tab=timeline&section=timeline_review"]',
        newSettingPath: 'a[href="https://www.facebook.com/settings/?tab=profile_and_tagging"]',
        automation: true,
        isNewSettings: function() {
            if(document.querySelector(this.newSettingPath)){
                return true;
            }
            return false;
        },
        automation: true,
        commonAutomation: async function(options, callback) {
            DEV && console.log('automation scan start: id = ' + this.id);

            let scanResult = initialScanResult(this.id);
            await withRetry(async () => {    
                return await withDelay(async () => {
                    let getOptionInfoRet = await getSettingOptionsInfo(options);

                    if(!getOptionInfoRet.result) {
                        return false;
                    }

                    scanResult = {
                        ...scanResult,
                        PossibleValue: getOptionInfoRet.possibleOptions,
                        Current: getOptionInfoRet.selectedOption,
                        Title: getOptionInfoRet.title,
                        Desc: getOptionInfoRet.desc
                    };

                    return true;
                });
            });
            
            DEV && console.log('scanResult = ' + JSON.stringify(scanResult));
            callback(scanResult);
        },
        automationProcess: async function(callback) {
            await withRetry(async () => {
                await openSettingsPage('ProfileAndTagging');
            });
            let options = {
                optionType: 'switch',
                optionIndex: 2,
                titleIndex: 1,
                buttonIndex: null,
                switchIndex: 2
            }

            this.commonAutomation(options, callback);
        },
        newSettingAutomationProcess: async function(callback) {
            await withDelay(() => {
                let tab = document.querySelector(this.newSettingPath);
                tab && tab.click();
            });
            let options = {
                optionType: 'switch',
                optionIndex: 10,
                titleIndex: 0,
                descIndex: 1,
                buttonIndex: null,
                switchIndex: 2
            }
            this.commonAutomation(options, callback);
        }
    }, {
        id: 33,
        category: 'profile and tagging',
        path: 'a[href="/settings?tab=timeline&section=tagging"]',
        newSettingPath: 'a[href="https://www.facebook.com/settings/?tab=profile_and_tagging"]',
        automation: true,
        isNewSettings: function() {
            if(document.querySelector(this.newSettingPath)){
                return true;
            }
            return false;
        },
        commonAutomation: async function(options, callback) {
            DEV && console.log('automation scan start: id = ' + this.id);
            
            let scanResult = initialScanResult(this.id);
            await withRetry(async () => {
                return await withDelayAsync(async () => {
                    let getOptionInfoRet = await getSettingOptionsInfo(options);
                    if(!getOptionInfoRet.result) {
                        return false;
                    }

                    scanResult = {
                        ...scanResult,
                        PossibleValue: getOptionInfoRet.possibleOptions,
                        Current: getOptionInfoRet.selectedOption,
                        Title: getOptionInfoRet.title,
                        Desc: getOptionInfoRet.desc
                    };

                    return true;
                });
            });
            DEV && console.log('scanResult = ' + JSON.stringify(scanResult));
            callback(scanResult);
        },
        automationProcess: async function(callback) {
            await withRetry(async () => {
                await openSettingsPage('ProfileAndTagging');
            });
            let options = {
                optionType: 'radio',
                optionIndex: 1,
                titleIndex: 1,
                buttonIndex: 3,
                switchIndex: null
            }

            this.commonAutomation(options, callback);
        },
        newSettingAutomationProcess: async function(callback) {
            await withDelay(() => {
                let tab = document.querySelector(this.newSettingPath);
                tab && tab.click();
            });
            let options = {
                optionType: 'radio',
                optionIndex: 6,
                titleIndex: 0,
                descIndex: null,
                buttonIndex: 3,
                switchIndex: null
            }
            this.commonAutomation(options, callback);
        }
    }, {
        id: 34,
        category: 'profile and tagging',
        path: 'a[href="/settings?tab=timeline&section=others"]',
        newSettingPath: 'a[href="https://www.facebook.com/settings/?tab=profile_and_tagging"]',
        automation: true,
        isNewSettings: function() {
            if(document.querySelector(this.newSettingPath)){
                return true;
            }
            return false;
        },
        commonAutomation: async function(options, callback) {
            DEV && console.log('automation scan start: id = ' + this.id);

            let scanResult = initialScanResult(this.id);
            await withRetry(async () => {
                return await withDelayAsync(async () => {
                    let getOptionInfoRet = await getSettingOptionsInfo(options);
                    if(!getOptionInfoRet.result) {
                        return false;
                    }

                    scanResult = {
                        ...scanResult,
                        PossibleValue: getOptionInfoRet.possibleOptions,
                        Current: getOptionInfoRet.selectedOption,
                        Title: getOptionInfoRet.title,
                        Desc: getOptionInfoRet.desc
                    };

                    return true;
                });
            });
            
            DEV && console.log('scanResult = ' + JSON.stringify(scanResult));
            callback(scanResult);
        },
        automationProcess: async function(callback) {
            await withRetry(async () => {
                await openSettingsPage('ProfileAndTagging');
            });
            let options = {
                optionType: 'radio',
                optionIndex: 0,
                titleIndex: 2,
                buttonIndex: 1,
                switchIndex: null
            }
            this.commonAutomation(options, callback);
        },
        newSettingAutomationProcess: async function(callback) {
            await withDelay(() => {
                let tab = document.querySelector(this.newSettingPath);
                tab && tab.click();
            });
            let options = {
                optionType: 'radio',
                optionIndex: 2,
                titleIndex: 0,
                descIndex: null,
                buttonIndex: 1,
                switchIndex: null
            }
            this.commonAutomation(options, callback);
        }

    }, {
        id: 35,
        category: 'profile and tagging',
        path: 'a[href="/settings?tab=timeline&section=tagreview"]',
        newSettingPath: 'a[href="https://www.facebook.com/settings/?tab=profile_and_tagging"]',
        automation: true,
        isNewSettings: function() {
            if(document.querySelector(this.newSettingPath)){
                return true;
            }
            return false;
        },
        automation: true,
        commonAutomation: async function(options, callback) {
            DEV && console.log('automation scan start: id = ' + this.id);

            let scanResult = initialScanResult(this.id);
            await withRetry(async () => {    
                return await withDelay(async () => {
                    let getOptionInfoRet = await getSettingOptionsInfo(options);

                    if(!getOptionInfoRet.result) {
                        return false;
                    }

                    scanResult = {
                        ...scanResult,
                        PossibleValue: getOptionInfoRet.possibleOptions,
                        Current: getOptionInfoRet.selectedOption,
                        Title: getOptionInfoRet.title,
                        Desc: getOptionInfoRet.desc
                    };

                    return true;
                });
            });
            
            DEV && console.log('scanResult = ' + JSON.stringify(scanResult));
            callback(scanResult);
        },
        automationProcess: async function(callback) {
            await withRetry(async () => {
                await openSettingsPage('ProfileAndTagging');
            });
            let options = {
                optionType: 'switch',
                optionIndex: 2,
                titleIndex: 2,
                buttonIndex: null,
                switchIndex: 1
            }

            this.commonAutomation(options, callback);
        },
        newSettingAutomationProcess: async function(callback) {
            await withDelay(() => {
                let tab = document.querySelector(this.newSettingPath);
                tab && tab.click();
            });
            let options = {
                optionType: 'switch',
                optionIndex: 9,
                titleIndex: 0,
                descIndex: 1,
                buttonIndex: null,
                switchIndex: 1
            }
            this.commonAutomation(options, callback);
        }
    }
    ];

    function checkIsUnder18(data){
        return (data.indexOf("214189648617074") >= 0);
    }

    Scanner.prototype.getUserInfo = function(notUnder18, isUnder18, notLogIn, whenNetworkError) {
        var that = this;
        
        SendWebRequest({
            'type' : 'GET',
            'data' : null,
            'dataType' : 'html',
            'url' : that.PROTOCOL_DOMAIN + "/settings?tab=privacy"
        }, function(data) {
            SendWebRequest({
                'type' : 'GET',
                'data' : null,
                'dataType' : 'html',
                'url' : that.PROTOCOL_DOMAIN + "/settings?tab=applications"
            }, function(app_settings) {
                var html = TMExt_$(app_settings);
                var title_array = html.find('span[class="_3aiv"]');
                var desc_array = html.find('div[class="_4na2"]');
                var application_3rd_title = html.find('div[class="_685i"]');

                var _unicodeToChar = function unicodeToChar(text)
                {
                    return text.replace(/\\u[\dA-F]{4}/gi,
                        function(match){return String.fromCharCode(parseInt(match.replace(/\\u/g,''),16))});
                };

                // Get User Token
                var ptn_token = /\"async_get_token\"\:\"(.*?)\"/g;
                var matchCur;
                if(matchCur = ptn_token.exec(app_settings)){
                    that.UserInfo.token = encodeURIComponent(matchCur[1])
                }

                var ptn = /\"baseLabel\"\:(.*?)\,/g;     //or   "triggerLabel"
                var matchesArr_83 = [];
		        var matchesArr_84 = [];
                while( matchCur = ptn.exec(app_settings) ){
                    var curMatchUnicode = matchCur[1].substr(1, matchCur[1].length-2);
                    matchesArr_83.push(_unicodeToChar(curMatchUnicode));
		            matchesArr_84.push(_unicodeToChar(curMatchUnicode));
                }
                window.g_app_settings_set_83 = matchesArr_83;

                //id=84, reuse the set of all selectors from id 83,
                // but remove the second selector
                window.g_app_settings_set_84 = matchesArr_84;
                g_app_settings_set_84.splice(1,1);
                
                window.app_settings_title_array = title_array;
                window.app_settings_desc_array = desc_array;
                window.application_3rd_title = application_3rd_title;
                
                that.UserInfo.hasUserInfo = true;
                var parseData = new FacebookScannerHelper().handleResponse_SettingPage(data);
                if (parseData && parseData.user_id) {
                    that.UserInfo.userID = parseData.user_id;
                    that.UserInfo.isUnder18 = checkIsUnder18(data);
                    if(that.UserInfo.isUnder18){
                        return isUnder18();
                    }else{
                        return notUnder18();
                    }   
                } else {
                    // user not logged in
                    return notLogIn();
                }
            });
        }, whenNetworkError);
    };

    Scanner.prototype.scanSingle = function(id, callback) {
        var that = this;
        var scannerHelper = null;

        if (that.UserInfo.hasUserInfo) {
            if (!that.UserInfo.isUnder18) {
                scannerHelper = new FacebookScannerHelper();
                return doScanSingle();
            } else {
                tbc_error("account under 18 years old!");
            }
        } else {
            that.getUserInfo(function() {
                // not under 18
                scannerHelper = new FacebookScannerHelper();
                return doScanSingle();
            }, function() {
                // under 18
                tbc_error("no function for account that under 18 years old1");
            }, function() {
                // not log in
                var responseData = new APIResponseHelper(that.responseHeaderScanSingle, ReturnCodeEnum.NOT_LOGGED_IN.code, ReturnCodeEnum.NOT_LOGGED_IN.description).getResponse();
                PSDebug.error(responseData);

                return callback(responseData);
            }, sendWebRequestFailCallback);
        }

        function sendWebRequestFailCallback(data) {
            // network error
            var responseData = new APIResponseHelper(that.responseHeaderScanSingle, ReturnCodeEnum.NETWORK_ERROR.code, ReturnCodeEnum.NETWORK_ERROR.description).getResponse();
            PSDebug.error(responseData);

            return callback(responseData);
        }

        function doScanSingle() {
            if (!scannerHelper.isValidID(id)) {
                var responseData = new APIResponseHelper(that.responseHeaderScanSingle, ReturnCodeEnum.INVALID_ID.code, ReturnCodeEnum.INVALID_ID.description, 'wrong ID! : ' + id + ', availableIDS: ' + scannerHelper.getAllvalidID()).getResponse();
                PSDebug.error(responseData);

                return callback(responseData);
            }

            that.sendWebRequestOKCallback = sendWebRequestOKCallback;

            function sendWebRequestOKCallback(data) {
                var parseData = scannerHelper.handleResponse(id, data);

                if ((id == 83) && parseData && parseData.PossibleValue && parseData.PossibleValue['3']) {
                    if (typeof(window.FacebookL10nWording) == "undefined") {
                        window.FacebookL10nWording = parseData.PossibleValue;
                    }
                }

                if (parseData && TMExt_$.trim(parseData["Title"]) == "") {
                    // do not show the setting when we find the title is empty
                    parseData = null;
                }

                if (!parseData) {
                    // web content parse error
                    var responseData = new APIResponseHelper(that.responseHeaderScanSingle, ReturnCodeEnum.WEBRESPONSE_PARSE_ERROR.code, ReturnCodeEnum.WEBRESPONSE_PARSE_ERROR.description, 'Web content parse error! ID: ' + id + ', webData: ' + data).getResponse();
                    PSDebug.error(responseData);

                    return callback(responseData);
                }

                // return correct web content (white list: we only return these items)
                var parseDataFinal = {
                    ID : parseData['ID'],
                    Risk : parseData['Risk'],
                    Title : parseData['Title'],
                    Desc : parseData['Desc'],
                    PossibleValue : parseData['PossibleValue'],
                    possibleFixValue : parseData['possibleFixValue'],
                    Current : parseData['Current'],
                    Suggestion : parseData['Suggestion'],
                    Category : parseData['Category'],
                    Website : parseData['Website'],
                    html : parseData['html'],
                    appIDs : parseData['appIDs'],
                    appsDetail : parseData['appsDetail'],
                    cssNeed : parseData['cssNeed']
                };

                var responseData = new APIResponseHelper(that.responseHeaderScanSingle, ReturnCodeEnum.OK.code, ReturnCodeEnum.OK.description, parseDataFinal).getResponse();
                PSDebug.log(responseData);

                return callback(responseData);
            }

            SendWebRequest(scannerHelper.getSendData(id, that.UserInfo.userID, that.UserInfo.token), sendWebRequestOKCallback, sendWebRequestFailCallback);
        }
    };


    Scanner.prototype.scanSingleAutomation = async function(id, callback) {
        const scanResultTemplate = FacebookScanResultsTemplate.find(scanResultTemplate => scanResultTemplate.ID === id);
        let scanResult = {
            ...scanResultTemplate,
            PossibleValue : {},
            Current : null,
            Title : '',
        };
        const { category, path, getOptionInfo } = scanList.find(scanItem => scanItem.id === id);
        const iframe = () => document.querySelector("iframe").contentDocument;
        const titleEle = `${path} .fbSettingsListItemContent`;
        const openEdit = `${path} .uiIconText.fbSettingsListItemEdit`;
        const openPopover = `${path} + .content .uiPopover a`;
        const close = `${path} + .content a`;

        try {
            await withDelay(() => {
                if (category === 'privacy') {
                    document.querySelector('a[href="https://www.facebook.com/settings?tab=privacy"]').click();
                }

                if (category === 'profile and tagging') {
                    document.querySelector('a[href="https://www.facebook.com/settings?tab=timeline"]').click();
                }
            }, 3000);

            await withRetry(() => (
                withDelay(() => {
                    if (iframe() && iframe().querySelector(titleEle)) {
                        scanResult = {
                            ...scanResult,
                            Title: iframe().querySelector(titleEle).children[0].firstChild.textContent,
                        };

                        return true;
                    }

                    return false;
                }, 1000)
            ), 3);

            await withRetry(() => (
                withDelay(() => {
                    if (iframe().querySelector(openEdit)) {
                        iframe().querySelector(openEdit).click();

                        return true;
                    }

                    return false;
                }, 500)
            ), 3);

            await withRetry(() => (
                withDelay(() => {
                    const descEle = 'div[class="mbm fcg"]';
                    if (iframe().querySelector(descEle)) {
                        scanResult = {
                            ...scanResult,
                            Desc: iframe().querySelector(descEle).textContent
                        };
                    }

                    return false;
                }, 500)
            ), 3);


            if (id === 24) {
                await withRetry(() => (
                    withDelay(() => {
                        const inputEle = iframe().querySelector('#privacy_public_search_input input');

                        if (inputEle) {
                            const { possibleOptions, selectedOption } = getOptionInfo(inputEle.checked);

                            scanResult = {
                                ...scanResult,
                                PossibleValue: possibleOptions,
                                Current: selectedOption,
                            };

                            return true;
                        }

                        return false;
                      }, 1000)
                ), 3);
            } else {
                await withRetry(() => (
                    withDelay(() => {
                        if (iframe().querySelector(openPopover)) {
                            iframe().querySelector(openPopover).click();

                            return true;
                        }

                        return false;
                    }, 1000)
                ), 3);

                await withRetry(() => (
                    withDelay(() => {
                        const control = iframe().querySelector(openPopover).getAttribute('aria-controls');
                        const controlItems = iframe().querySelectorAll(`[id="${control}"] .__MenuItem a`);

                        if (controlItems.length > 0) {
                            const { possibleOptions, selectedOption } = getOptionInfo(controlItems);

                            scanResult = {
                                ...scanResult,
                                PossibleValue: possibleOptions,
                                Current: selectedOption,
                            };

                            return true;
                        }

                        return false;
                    }, 1000)
                ), 3);
            }

            await withDelay(() => {
                iframe().querySelector(close).click();
            }, 500);

            return callback(scanResult);
        } catch (error) {
            return false;
        }
    };

    Scanner.prototype.scan = function(callback) {
        var that = this;
        var scanResult = {
            'TimeLineAndTagging' : {
                'ID' : 3,
                'Items' : []
            },
            'PrivacySetting' : {
                'ID' : 2,
                'Items' : []
            },
            'AppsAndWebsites' : {
                'ID' : 8,
                'Items' : []
            }
        };
        // scan single callback
        let countAlreadyScan = 0;
        let needStopCallback = false;
        let isWebResponsePartlyError = false;
        const SCANSINGLE_COUNT = FacebookScanResultsTemplate.length;

        function scanSingleAutomationCallback(data) {
            switch (parseInt(data['ID'])) {
                case 20:
                case 22:
                case 23:
                case 24:
                    scanResult.PrivacySetting.Items.push(data);
                    break;
                case 31:
                case 33:
                case 34:
                case 35:
                    scanResult.TimeLineAndTagging.Items.push(data);
                    break;
            }

            countAlreadyScan++;

            // Finish all single scan
            if (countAlreadyScan === scanList.length) {
                var responseData = new APIResponseHelper(that.responseHeaderScan, ReturnCodeEnum.OK.code, ReturnCodeEnum.OK.description, scanResult).getResponse();
                return callback(responseData);
            }
        }

        function scanSingleCallback(data) {
            if (needStopCallback) {
                return;
            }

            if (data[that.responseHeaderScanSingle]['ReturnCode'] == ReturnCodeEnum.OK.code) {
                // get right single scan result, add it to final result now
                addSingleToScanResult(data[that.responseHeaderScanSingle]['Response']);
            } else if (data[that.responseHeaderScanSingle]['ReturnCode'] == ReturnCodeEnum.WEBRESPONSE_PARSE_ERROR.code) {
                isWebResponsePartlyError = true;
            } else {
                var responseData = new APIResponseHelper(that.responseHeaderScan, data[that.responseHeaderScanSingle].ReturnCode, data[that.responseHeaderScanSingle].Description, data[that.responseHeaderScanSingle].Response).getResponse();

                PSDebug.error(responseData);

                needStopCallback = true;
                return callback(responseData);
            }

            function addSingleToScanResult(data) {
                switch (parseInt(data['ID'])) {
                    case 20:
                    case 22:
                    case 23:
                    case 24:
                        scanResult.PrivacySetting.Items.push(data);
                        break;
                    case 31:
                    case 33:
                    case 34:
                    case 35:
                    case 36:
                        scanResult.TimeLineAndTagging.Items.push(data);
                        break;
                    case 83:
                    case 84:
                        scanResult.AppsAndWebsites.Items.push(data);
                        break;
                }
            }

            countAlreadyScan++;
            if (countAlreadyScan == SCANSINGLE_COUNT) {
                // finish all single scan
                if (!isWebResponsePartlyError) {
                    var responseData = new APIResponseHelper(that.responseHeaderScan, ReturnCodeEnum.OK.code, ReturnCodeEnum.OK.description, scanResult).getResponse();
                } else {
                    var responseData = new APIResponseHelper(that.responseHeaderScan, ReturnCodeEnum.WEBRESPONSE_PARSE_ERROR_COULD_USE_PARTLY.code, ReturnCodeEnum.WEBRESPONSE_PARSE_ERROR_COULD_USE_PARTLY.description, scanResult).getResponse();
                }
                PSDebug.log(responseData);
                return callback(responseData);
            }
        }

        function sendWebRequestFailCallback(data) {
            // network error
            var responseData = new APIResponseHelper(that.responseHeaderScan, ReturnCodeEnum.NETWORK_ERROR.code, ReturnCodeEnum.NETWORK_ERROR.description).getResponse();
            PSDebug.error(responseData);

            return callback(responseData);
        }
        
        function doScan() {
            window.browser.storage.local.get({ browser: '' }, async ({ browser }) => {
                if (browser === 'firefox') {
                    for (let scanListItem of scanList) {
                        if(scanListItem.automation) {  
                            if(scanListItem.isNewSettings && scanListItem.isNewSettings() === true){
                                await scanListItem.newSettingAutomationProcess(scanSingleAutomationCallback);
                            }else if(scanListItem.automationProcess) {
                                await scanListItem.automationProcess(scanSingleAutomationCallback);
                            }
                            else {
                                await that.scanSingleAutomation(scanListItem.id, scanSingleAutomationCallback);
                            }
                        }
                        else {
                            countAlreadyScan++;
                            if (countAlreadyScan == SCANSINGLE_COUNT) {
                                // finish all single scan
                                var responseData = new APIResponseHelper(that.responseHeaderScan, ReturnCodeEnum.OK.code, ReturnCodeEnum.OK.description, scanResult).getResponse();
                                return callback(responseData);
                            }
                        }
                    }
                } else {
                    for (var i = 0; i < SCANSINGLE_COUNT; i++) {
                        that.scanSingle(FacebookScanResultsTemplate[i]['ID'], scanSingleCallback);
                    }
                }

                PSDebug.log("do scan finish");
            })
        }
        
        that.getUserInfo(function(){
            // not under 18
            return doScan();
        },function(){
            // under 18
            return doScan();
        },function(){
            // not log in
            var responseData = new APIResponseHelper(that.responseHeaderScan, ReturnCodeEnum.NOT_LOGGED_IN.code, ReturnCodeEnum.NOT_LOGGED_IN.description).getResponse();
            PSDebug.error(responseData);
            return callback(responseData);
        },sendWebRequestFailCallback);
    };

    Scanner.prototype.getAccountInfo = function(target_url, callback) {
        let accountInfo = {};
        
        do {
            // Get name from script data
            let accountName = '';
            let targetString = '"NAME":"';
            let scripts = document.getElementsByTagName("script");
            for(let i = 0; i < scripts.length; ++i) {
                try {
                    let start = scripts[i].innerText.indexOf(targetString);
                    if(start === -1) {
                        continue;
                    }
                    start += targetString.length;
                    let end = scripts[i].innerText.indexOf('"', start);
                    if(end === -1) {
                        continue;
                    }

                    accountName = scripts[i].innerText.substring(start, end);
                    break;
                }
                catch(e) {
                }
            }
            if (accountName) {
                // decode unicode strings
                accountName = JSON.parse(`"${accountName}"`);
            }
            DEV && console.log(TAG, 'accountName = ' + accountName);
            
            accountInfo['name'] = accountName;

            // Get image URL from DOM
            //let accountAndSettings = document.querySelector('[aria-label="Account Controls and Settings"]');
            let accountAndSettingsAll = document.querySelectorAll('[role="navigation"]');
            for(var i =0; i< accountAndSettingsAll.length; i++){
                let accountAndSettings = accountAndSettingsAll[i];
                if(!accountAndSettings) {
                    continue;
                }
    
                let accountLink = accountAndSettings.querySelector('[role="img"]');
                if(!accountLink) {
                    continue;
                }
                
                let accountImage = accountLink.querySelector('image');
                if(!accountImage) {
                    continue;
                }
                let imageUrl = accountImage.getAttribute('xlink:href');
                DEV && console.log(TAG, 'imageUrl = ' + imageUrl);
                accountInfo['image_url'] = imageUrl;
                break;
            }
        } while(false);

        callback(accountInfo);
    }

    Scanner.prototype.getTokenFor2FA = function() {
        let that = this;

        return new Promise(resolve => {
            SendWebRequest({
                'type' : 'GET',
                'data' : null,
                'dataType' : 'html',
                'url' : that.PROTOCOL_DOMAIN + "/settings?tab=security"
            }, (data) => {
                do {
                    const TOKEN_TAG = '"compat_iframe_token":"';
                    let startIndex = data.indexOf(TOKEN_TAG);
                    if(startIndex == -1) {
                        console.log('getTokenFor2FA: unable to find token key');
                        break;
                    }
                    startIndex += TOKEN_TAG.length;
                    let endIndex = data.indexOf('"', startIndex);
                    if(endIndex == -1 || endIndex <= startIndex) {
                        console.log('getTokenFor2FA: unable to find end of token');
                        break;
                    }
                    let token = data.substr(startIndex, endIndex-startIndex);
                    resolve(token);
                } while(false);
                
            }, () => {
                console.log('getTokenFor2FA: Failed to send request');
                resolve('');
            });
        });
    }

    Scanner.prototype.check2FA = function() {
        let ret = -1;
        let that = this;

        return new Promise(async resolve => {
            let token = await that.getTokenFor2FA();
            if(!token) {
                console.log('check2FA: Unable to find token');
                resolve(ret);
                return;
            }

            let requestUrl = that.PROTOCOL_DOMAIN + `/settings?tab=security&cquick=jsc_c_y&cquick_token=${token}&ctarget=` + encodeURIComponent(that.PROTOCOL_DOMAIN);
            SendWebRequest({
                'type' : 'GET',
                'data' : null,
                'dataType' : 'html',
                'url' : requestUrl
            }, function(data) {
                do {
                    const TARGET_STRING = 'two_fac_auth:{is_enabled:';
                    let startIndex = data.indexOf(TARGET_STRING);
                    if(startIndex == -1) {
                        console.log('check2FA: Unable to find 2FA settings key');
                        break;
                    }
                    startIndex += TARGET_STRING.length;
                    let endIndex = data.indexOf(',', startIndex);
                    if(endIndex == -1 || endIndex <= startIndex) {
                        console.log('check2FA: Unable to find end of 2FA settings');
                        break;
                    }

                    let status = data.substr(startIndex, endIndex-startIndex);
                    if(status === 'false') {
                        ret = 0;
                    }
                    else if(status === 'true') {
                        ret = 1;
                    }
                } while(false);
                
                resolve(ret);
            }, () => {
                console.log('check2FA: Failed to send request');
                resolve(ret);
            });
        })
    }

    Scanner.prototype.Website = "FACEBOOK";

    window.FacebookPScanner = Scanner;

    // for android old interface
    var PSScan = {};
    PSScan.scanSingle = function(id, callback) {
        new Scanner().scanSingle(id, function(data) {
            return callback(data['FPScanSingleResponse']['Response']);
        });
    };

    PSScan.scan = function(callback) {
        new Scanner().scan(function(data) {
            return callback(data['FPScanResponse']['Response']);
        });
    };
    window.PSScan = PSScan;
})();
