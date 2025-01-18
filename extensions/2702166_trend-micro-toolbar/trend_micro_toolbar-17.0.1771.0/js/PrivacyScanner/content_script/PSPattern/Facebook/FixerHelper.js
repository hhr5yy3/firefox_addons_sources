(function () {
    'use strict';
    //for dev record
    const TAG = '[PS][Facebook.FixerHelper]';
    const DEV = false;

    const withDelay = (func, interval = 1000) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(func())
            }, interval);
        });
    };

    const withAsyncDelay = (func, interval = 1000) => {
        return new Promise((resolve) => {
            setTimeout(async () => {
                resolve(await func())
            }, interval);
        });
    };

    const withRetry = async (func, time = 3) => {
        DEV && console.log(TAG, 'retry left', time);

        if (time > 0) {
            const result = await func();

            if (!result) {
                DEV && console.log(TAG, 'start retry');

                return await withRetry(func, time - 1);
            }
        }

        return true;
    };

    const tryClickElement = (doc, queryString) => {
        if(!doc) {
            return false;
        }

        let element = doc.querySelector(queryString);
        if(!element) {
            return false;
        }

        element.click();
        return true;
    }

    const tryClickRadioInAudienceDialog = (index) => {
        const radioIndexMap1 = [0, 1, 2, 5];
        const radioIndexMap2 = [0, 1, 2, 3];
        return new Promise(resolve => {
            let dialogs = document.querySelectorAll('[role="dialog"]');
            if(dialogs.length === 0) {
                DEV && console.log(TAG, 'tryClickRadioInAudienceDialog: failed to find dialog');
                resolve(false);
                return;
            }
            let audienceDialog = dialogs[dialogs.length-1];
            // 3 button: close button, cancal button, done button
            let dialogButtons = audienceDialog.querySelectorAll('[role="button"]');
            DEV && console.log(TAG, 'tryClickRadioInAudienceDialog: button count = ' + dialogButtons.length);
            let radioIndex = dialogButtons.length === 3 ? radioIndexMap1[index] : radioIndexMap2[index];
            DEV && console.log(TAG, 'tryClickRadioInAudienceDialog: radioIndex = ' + radioIndex);
            let dialogRadios = audienceDialog.querySelectorAll('[role="radio"]');
            if(dialogRadios.length <= radioIndex) {
                DEV && console.log(TAG, 'tryClickRadioInAudienceDialog: failed to click target radio button');
                resolve(false);
                return;
            }

            dialogRadios[radioIndex].click();
            if(dialogButtons.length === 3) {
                withDelay(() => {
                    dialogButtons[2].click();
                }, 500)
                .then(() => {
                    setTimeout(() => {
                        resolve(true);
                    }, 1000);
                })
            }
            else {
                resolve(true);
            }
        });
    }

    const clickAudienceDialog = (index, count = 0) => {
        let MAX_RETRY_COUNT = 5;
        return new Promise(resolve => {
            DEV && console.log(TAG, 'clickAudienceDialog: index = ' + index + ', count = ' + count);
            if(count >= MAX_RETRY_COUNT) {
                resolve(false);
                return;
            }

            tryClickRadioInAudienceDialog(index)
            .then(clickRet => {
                DEV && console.log(TAG, 'clickAudienceDialog: clickRet = ' + clickRet);
                if(clickRet) {
                    resolve(true);
                    return;
                }

                setTimeout(() => {
                    clickAudienceDialog(index, count+1)
                    .then(retryClickRet => {
                        resolve(retryClickRet);
                    })
                }, 500);
            })
        });
    }

    const editSetting = async (setting, index, path) => {
        let hasProcessed = false;
        const iframe = () => document.querySelector("iframe").contentDocument;
        const section = path;
        const openEdit = `${section} .uiIconText.fbSettingsListItemEdit`;
        const openPopover = `${section} + .content .uiPopover a`;
        const close = `${path} + .content a`;

        try {
            await withDelay(() => {
                DEV && console.log(TAG, 'edit start');
                DEV && console.log(TAG, index, path);

                if (setting === 'privacy') {
                    document.querySelector('a[href="https://www.facebook.com/settings?tab=privacy"]').click();
                }

                if (setting === 'profile and tagging') {
                    document.querySelector('a[href="https://www.facebook.com/settings?tab=timeline"]').click();
                }
            }, 3000);

            await withRetry(() => (
                withDelay(() => {
                    DEV && console.log(TAG, openEdit);

                    if (iframe() && iframe().querySelector(openEdit)) {
                        iframe().querySelector(openEdit).click();

                        return true;
                    }

                    return false;
                }, 1000)
            ), 3);

            await withRetry(() => (
                withDelay(() => {
                    DEV && console.log(TAG, openPopover);

                    if (iframe() && openPopover && iframe().querySelector(openPopover)) {
                        iframe().querySelector(openPopover).click();

                        return true;
                    }

                    return false;
                }, 1000)
            ), 3);

            await withRetry(() => (
                withDelay(async () => {
                    //method 1
                    const controls = iframe().querySelector(openPopover).getAttribute('aria-controls');
                    const controlsItems = iframe().querySelectorAll(`[id="${controls}"] .__MenuItem`);
                    DEV && console.log(TAG, 'controls', controls);

                    DEV && console.log(TAG, 'index = ' + index);
                    if (controlsItems.length > 0) {
                        if (section === 'a[href="/settings?tab=privacy&section=composer"]') {
                            //spread all possible setting on UI
                            await withDelay(() => controlsItems[5].click(), 1000);
                        }

                        DEV && console.log(TAG, 'aria-controls way');
                        controlsItems[index].click();
                        hasProcessed = true;

                        return true;
                    }

                    if (!hasProcessed) {
                        if (idItems.length > 0) {
                            //method 2
                            const id = iframe().querySelector(openPopover)?.id;
                            const idItems = iframe().querySelectorAll(`.uiContextualLayerPositioner[data-ownerid="${id}"] .__MenuItem`);
                            DEV && console.log(TAG, 'id', id);

                            if (section === 'a[href="/settings?tab=privacy&section=composer"]') {
                                //spread all possible setting on UI
                                await withDelay(() => idItems[5].click(), 1000);
                            }

                            DEV && console.log(TAG, 'owner-id way');
                            idItems[index].click();
                            hasProcessed = true;

                            return true;
                        }
                    }

                    return false;
                }, 1000)
            ), 3);

            await withRetry(() => (
                withDelay(() => {
                    if(iframe().querySelector(close)){
                        iframe().querySelector(close).click();
                        DEV && console.log(TAG, 'close button is clicked');
                        return true;
                    }
                    return false;
                }, 1000)
            ), 3);

            if (!hasProcessed) {
                DEV && console.log(TAG, 'both fail...');
            }

            return hasProcessed;
        } catch (error) {
            DEV && console.log(TAG, error);

            return false;
        }
    };

    var Constants = [{
        ID: 20,
        FixRelated: {
            // type: 'privacy_update',
            // id: '0',
            // valueSet: [300645083384735, 291667064279714, 286958161406148],
            // url: '/privacy/selector/update/?is_saved_on_select=true&should_return_tooltip=false&prefix_tooltip_with_app_privacy=false&replace_on_select=false&ent_id=0&dpr=2',
            // render: 'privacy_settings_composer_preview'
            process: async (index) => {
                 /********** old setting ***********/
                let tabUrl = 'a[href="https://www.facebook.com/settings?tab=privacy"]';
                if(document.querySelector(tabUrl)){
                    await withDelay(() => {
                        document.querySelector(tabUrl).click();
                    });

                    const indexMappingWithFBSetting = [1, 2, 7];
                    let editUrl = 'a[href="/settings?tab=privacy&section=composer"]';
                    let settingType = 'privacy';
                    return await withRetry(() => {
                        return editSetting(settingType, indexMappingWithFBSetting[index], editUrl);
                    }, 3)

                } else {
                    /********** new setting ***********/
                    return await withRetry(async () => {
                        let ret = false;
                        try {
                            await withDelay(() => {
                                let tab = document.querySelector('a[href="https://www.facebook.com/settings/?tab=posts"]');
                                tab && tab.click();
                            });
    
                            ret = await withAsyncDelay(async () => {
                                let mainElement = document.querySelector('[role="main"]');
                                if(!mainElement) {
                                    DEV && console.log(TAG, 'Failed to find mainElement');
                                    return false;
                                }
    
                                let buttons = mainElement.querySelectorAll('[role="button"]');
                                let buttonIndex = 0;
                                if(buttons.length <= buttonIndex) {
                                    DEV && console.log(TAG, 'Failed to find button to open dialog');
                                    return false;
                                }
    
                                let oldButtonText = buttons[buttonIndex].innerText;
                                DEV && console.log(TAG, 'oldButtonText = ' + oldButtonText);
                                buttons[buttonIndex].click();
                                await clickAudienceDialog(index);
    
                                let newButtons = mainElement.querySelectorAll('[role="button"]');
                                let newButtonText = newButtons[buttonIndex].innerText;
                                DEV && console.log(TAG, 'newButtonText = ' + newButtonText);
                                return newButtonText !== oldButtonText;
                            });

                        } catch(error) {
                            DEV && console.log(TAG, error);
                        }
                        
                        return ret;
                    }, 3);    
           
                }
            }
        }
        // Description: 'Who can see your future posts?'
    }, {
        ID: 22,
        FixRelated: {
            // type: 'privacy_update',
            // id: '8787820733',
            // valueSet: [300645083384735, 275425949243301, 291667064279714],
            // url: '/privacy/selector/update/?is_saved_on_select=true&should_return_tooltip=false&prefix_tooltip_with_app_privacy=false&replace_on_select=false&ent_id=0&dpr=2',
            // render: 'settings,'
            process: async (index) => {
                /********** old setting ***********/
                let tabUrl = 'a[href="https://www.facebook.com/settings?tab=privacy"]';
                if(document.querySelector(tabUrl)){
                    await withDelay(() => {
                            document.querySelector(tabUrl).click();
                    });

                    await withRetry(() => (
                        withDelay(async () => {
                            let tabUrl = 'a[href="/settings?tab=privacy&section=findemail"]';
                            return await withRetry(() => editSetting('privacy', index, tabUrl), 3);
                        }, 1000)
                    ), 3);
            
                } else{
                    /********** new setting ***********/
                    return await withRetry(async () => {
                        let ret = false;
                        try {
                            await withDelay(() => {
                                let tab = document.querySelector('a[href="https://www.facebook.com/settings/?tab=how_people_find_and_contact_you"]');
                                tab && tab.click();
                            });
    
                            ret = await withAsyncDelay(async () => {
                                let mainElement = document.querySelector('[role="main"]');
                                if(!mainElement) {
                                    DEV && console.log(TAG, 'Failed to find mainElement');
                                    return false;
                                }
    
                                let buttons = mainElement.querySelectorAll('[role="button"]');
                                let buttonIndex = 2;
                                if(buttons.length <= buttonIndex) {
                                    DEV && console.log(TAG, 'Failed to find button to open dialog');
                                    return false;
                                }
    
                                let oldButtonText = buttons[buttonIndex].innerText;
                                DEV && console.log(TAG, 'oldButtonText = ' + oldButtonText);
                                buttons[buttonIndex].click();
                                await clickAudienceDialog(index);
    
                                let newButtons = mainElement.querySelectorAll('[role="button"]');
                                let newButtonText = newButtons[buttonIndex].innerText;
                                DEV && console.log(TAG, 'newButtonText = ' + newButtonText);
                                return newButtonText !== oldButtonText;
                            });

                        } catch(error) {
                            DEV && console.log(TAG, error);
                        }
                        
                        return ret;
                    }, 3);    
                }
            }
        }
        // Description: 'Who can look you up using the email address you provided?'
    }, {
        ID: 23,
        FixRelated: {
            // type: 'privacy_update',
            // id: '8787815733',
            // valueSet: [300645083384735, 275425949243301, 291667064279714],
            // url: '/privacy/selector/update/?is_saved_on_select=true&should_return_tooltip=false&prefix_tooltip_with_app_privacy=false&replace_on_select=false&ent_id=0&dpr=1',
            // render: 'settings',
            process: async (index) => {
                /********** old setting ***********/
                let tabUrl = 'a[href="https://www.facebook.com/settings?tab=privacy"]';
                if(document.querySelector(tabUrl)){
                    await withDelay(() => {
                         document.querySelector(tabUrl).click();
                    });

                    await withRetry(() => (
                        withDelay(async () => {
                            let tabUrl = 'a[href="/settings?tab=privacy&section=findphone"]';
                            return await withRetry(() => editSetting('privacy', index, tabUrl), 3);
                        }, 1000)
                    ), 3);
        
                } else {
                    /********** new setting ***********/
                    return await withRetry(async () => {
                        let ret = false;
                        try {
                            await withDelay(() => {
                                let tab = document.querySelector('a[href="https://www.facebook.com/settings/?tab=how_people_find_and_contact_you"]');
                                tab && tab.click();
                            });
    
                            ret = await withAsyncDelay(async () => {
                                let mainElement = document.querySelector('[role="main"]');
                                if(!mainElement) {
                                    DEV && console.log(TAG, 'Failed to find mainElement');
                                    return false;
                                }
    
                                let buttons = mainElement.querySelectorAll('[role="button"]');
                                let buttonIndex = 3;
                                if(buttons.length <= buttonIndex) {
                                    DEV && console.log(TAG, 'Failed to find button to open dialog');
                                    return false;
                                }
    
                                let oldButtonText = buttons[buttonIndex].innerText;
                                DEV && console.log(TAG, 'oldButtonText = ' + oldButtonText);
                                buttons[buttonIndex].click();
                                await clickAudienceDialog(index);
    
                                let newButtons = mainElement.querySelectorAll('[role="button"]');
                                let newButtonText = newButtons[buttonIndex].innerText;
                                DEV && console.log(TAG, 'newButtonText = ' + newButtonText);
                                return newButtonText !== oldButtonText;
                            });

                        } catch(error) {
                            DEV && console.log(TAG, error);
                        }
                        
                        return ret;
                    }, 3);    
                }
            }
        }
        // Description: 'Who can look you up using the phone number you provided?'
    }, {
        ID: 24,
        FixRelated: {
            // type: 'public_search',
            // valueSet: [0, 1],
            // url: '/ajax/settings_page/search_filters.php,'
            process: async (index) => {
                // index could be string or number
                if(typeof(index) !== 'number') {
                    index = parseInt(index);
                }
                DEV && console.log(TAG, 'edit start');
                DEV && console.log(TAG, index, section);

                const tabPrivacy = 'a[href="https://www.facebook.com/settings?tab=privacy"]';
                if(document.querySelector(tabPrivacy)){
                    /**********  old setting ***********/
                    const section = 'a[href="/settings?tab=privacy&section=search"]';                
                    const openEdit = `${section} .uiIconText.fbSettingsListItemEdit`;
                    const close = `${section} + .content a`;

                    DEV && console.log(TAG, 'open tab: ', tabPrivacy);

                    // await withDelay(() => {
                    //     tryClickElement(document, tabPrivacy);
                    // }, 1000);
                    await withDelay(() => {
                        document.querySelector(tabPrivacy).click();
                    });
                    
                    const iframe = () => document.querySelector("iframe").contentDocument;
                    if (!iframe) {
                        return false;
                    }

                    DEV && console.log(TAG, 'open edit: ', openEdit);
                    await withRetry(async () => (
                        await withDelay(() => {
                            return tryClickElement(iframe(), openEdit);
                        }, 1000)
                    ), 3);

                    return await withRetry(async () => {
                        try {

                            DEV && console.log(TAG, 'click checkbox');
                            await withRetry(async () => (
                                await withAsyncDelay(async () => {
                                    const inputEle = iframe().querySelector('#privacy_public_search_input input');
                                    if (inputEle) {
                                        const currentValue = inputEle.checked ? 1 : 0;
                                        let ret = true;
                                        if (currentValue !== index) {
                                            ret = tryClickElement(iframe(), '#privacy_public_search_input');
    
                                            if (ret && index === 0) {
                                                DEV && console.log(TAG, 'click confirm turn-off button');
                                                await withDelay(() => {
                                                    ret = tryClickElement(iframe(), '.pop_container_advanced input[name="turn_off"]');
                                                }, 1000)
                                            }
                                        }
    
                                        return ret;
                                    }
    
                                    return false;
                                }, 1000)
                            ), 3);
    
                            DEV && console.log(TAG, 'click close button');
                            await withDelay(() => {
                                tryClickElement(iframe(), close);
                            }, 1000);
    
                            return true;                      

                        } catch (error) {
                        DEV && console.log(TAG, error);

                            return false;
                        }
                    }, 3);
    
                } else {
                    return await withRetry(async () => {
                        let ret = false;
                        try {
                            /********** new setting ***********/
                            let switchs_num = 0
                            await withDelay(() => {
                                let tab = document.querySelector('a[href="https://www.facebook.com/settings/?tab=how_people_find_and_contact_you"]');
                                tab && tab.click();
                            });

                            ret = await withDelay(() => {
                                let mainElement = document.querySelector('[role="main"]');
                                if(!mainElement) {
                                    return false;
                                }
    
                                let switchs = mainElement.querySelectorAll('[role="switch"]');
    
                                switchs[switchs_num].click();
                                return true;
                            });
                        } catch (error) {
                            DEV && console.log(TAG, error);
                        }

                        return ret;
                    }, 3);
                    }
            }
        }
        // New Description: 'Allow search engines outside of Facebook to link to your profile'
        // Description: 'Do you want search engines outside of Facebook to link to your profile?'
    }, {
        ID: 31,
        FixRelated: {
            // type: 'timelineReview',
            // valueSet: [1, 0],
            // url: '/ajax/settings/timeline/review.php',
            process: async (index) => {
                DEV && console.log(TAG, 'edit 31 start');
                DEV && console.log(TAG, index);

                return await withRetry(async () => {
                    let ret = false;

                    try {
                        let switchs_num = 1;
                        let tab = document.querySelector('a[href="https://www.facebook.com/settings?tab=timeline"]');
                        if (tab){
                            /**********  old setting ***********/
                            await withDelay(() => {
                                switchs_num = 1;
                                tab.click();
                            });

                        } else {
                            /**********  new setting ***********/
                            await withDelay(() => {
                                tab = document.querySelector('a[href="https://www.facebook.com/settings/?tab=profile_and_tagging"]');
                                if (tab) {
                                    switchs_num = 2;
                                    tab.click();
                                }
                            });
                        }

                        ret = await withDelay(() => {
                            let mainElement = document.querySelector('[role="main"]');
                            if(!mainElement) {
                                return false;
                            }

                            let switchs = mainElement.querySelectorAll('[role="switch"]');
                            if(switchs.length < 3) {
                                return false;
                            }

                            switchs[switchs_num].click();
                            return true;
                        });
                        
                    } catch(error) {
                        DEV && console.log(TAG, error);
                    }
                    
                    return ret;
                }, 3);
            }
        }
        // Description: 'Review posts you're tagged in before the post appears on your profile?'
    }, {
        ID: 33,
        FixRelated: {
            // type: 'privacy_update',
            // id: '8787530733',
            // valueSet: [300645083384735, 275425949243301, 291667064279714, 286958161406148],
            // url: '/privacy/selector/update/?is_saved_on_select=true&should_return_tooltip=false&prefix_tooltip_with_app_privacy=false&replace_on_select=false&ent_id=0&dpr=1',
            // render: 'settings',
            process: async (index) => {
                DEV && console.log(TAG, 'edit 33 start');
                DEV && console.log(TAG, index);
                return await withRetry(async () => {
                    let ret = false;

                    try {
                        let settingTab = document.querySelector('a[href="https://www.facebook.com/settings?tab=timeline"]');
                        if (settingTab) {
                            /**********  old setting ***********/
                            await withDelay(() => {
                                settingTab && settingTab.click();
                            });

                        } else {
                            /**********  new setting ***********/
                            await withDelay(() => {
                                let NewSettingTab = document.querySelector('a[href="https://www.facebook.com/settings/?tab=profile_and_tagging"]');
                                NewSettingTab && NewSettingTab.click();
                            });
                        }

                        ret = await withAsyncDelay(async () => {
                            let mainElement = document.querySelector('[role="main"]');
                            if(!mainElement) {
                                DEV && console.log(TAG, 'Failed to find mainElement');
                                return false;
                            }

                            let buttons = mainElement.querySelectorAll('[role="button"]');
                            let buttonIndex = 3;
                            if(buttons.length <= buttonIndex) {
                                DEV && console.log(TAG, 'Failed to find button to open dialog');
                                return false;
                            }

                            let oldButtonText = buttons[buttonIndex].innerText;
                            DEV && console.log(TAG, 'oldButtonText = ' + oldButtonText);
                            buttons[buttonIndex].click();
                            await clickAudienceDialog(index);

                            let newButtons = mainElement.querySelectorAll('[role="button"]');
                            let newButtonText = newButtons[buttonIndex].innerText;
                            DEV && console.log(TAG, 'newButtonText = ' + newButtonText);
                            return newButtonText !== oldButtonText;
                        });
                        
                    } catch(error) {
                        DEV && console.log(TAG, error);
                    }
                    
                    return ret;
                }, 3);
            }
        },
        //"friends, except..." setting equals to "friends" if we don't edit exception list
        // Description: 'Who can see posts you\'ve been tagged in on your timeline'
        // New Descripttion: 'Who can see posts you're tagged in on your profile?'
        // FB UI: Who can see posts you're tagged in on your profile?
    }, {
        ID: 34,
        FixRelated: {
            // type: 'privacy_update',
            // id: '8787370733',
            // valueSet: [300645083384735, 275425949243301, 291667064279714, 286958161406148],
            // url: '/privacy/selector/update/?is_saved_on_select=true&should_return_tooltip=false&prefix_tooltip_with_app_privacy=false&replace_on_select=false&ent_id=0&dpr=1',
            // render: 'settings'
            process: async (index) => {
                DEV && console.log(TAG, 'edit 34 start');
                DEV && console.log(TAG, index);
                return await withRetry(async () => {
                    let ret = false;
                    try {
                        let tab = document.querySelector('a[href="https://www.facebook.com/settings?tab=timeline"]');
                        if (tab) {
                            /**********  old setting ***********/
                            await withDelay(() => {
                                tab.click();
                            });
                        } else {
                            /**********  new setting ***********/
                            await withDelay(() => {
                                let tab = document.querySelector('a[href="https://www.facebook.com/settings/?tab=profile_and_tagging"]');
                                tab && tab.click();
                            });
                        }

                        ret = await withAsyncDelay(async () => {
                            let mainElement = document.querySelector('[role="main"]');
                            if(!mainElement) {
                                return false;
                            }

                            let buttons = mainElement.querySelectorAll('[role="button"]');
                            let buttonIndex = 1;
                            if(buttons.length <= buttonIndex) {
                                return false;
                            }

                            let oldButtonText = buttons[buttonIndex].innerText;
                            DEV && console.log(TAG, 'oldButtonText = ' + oldButtonText);
                            buttons[buttonIndex].click();
                            await clickAudienceDialog(index);
                            let newButtons = mainElement.querySelectorAll('[role="button"]');
                            let newButtonText = newButtons[buttonIndex].innerText;
                            DEV && console.log(TAG, 'newButtonText = ' + newButtonText);
                            return newButtonText !== oldButtonText;
                        });
                        
                    } catch(error) {
                        DEV && console.log(TAG, error);
                    }
                    
                    return ret;
                }, 3);
            }
        }
        //"friends, except..." setting equals to "friends" if we don't edit exception list
        // Description: 'Who can see what others post on your timeline'
        // New Description: 'Who can see what others post on your profile?'
        // FB UI: Who can see what others post on your profile?
    }, {
        ID: 35,
        FixRelated: {
            // type: 'taggingReview',
            // valueSet: [1, 0],
            // url: '/ajax/settings/tagging/review.php',
            process: async (index) => {
                DEV && console.log(TAG, 'edit 35 start');
                DEV && console.log(TAG, index);

                return await withRetry(async () => {
                    let ret = false;
                    try {
                        let switchs_num = 2;
                        let tab = document.querySelector('a[href="https://www.facebook.com/settings?tab=timeline"]');
                        if (tab) {
                            /**********  old setting ***********/
                            await withDelay(() => {
                                switchs_num = 2;
                                tab.click();
                            });

                        } else {
                            /**********  new setting ***********/
                            await withDelay(() => {
                                let tab = document.querySelector('a[href="https://www.facebook.com/settings/?tab=profile_and_tagging"]');
                                if (tab){
                                    switchs_num = 1;
                                    tab.click();
                                }
                            });
                        }
                        
                        ret = await withDelay(() => {
                            let mainElement = document.querySelector('[role="main"]');
                            if(!mainElement) {
                                return false;
                            }

                            let switchs = mainElement.querySelectorAll('[role="switch"]');
                            if(switchs.length < 3) {
                                return false;
                            }

                            switchs[switchs_num].click();
                            return true;
                        });
                        
                    } catch(error) {
                        DEV && console.log(TAG, error);
                    }
                    
                    return ret;
                }, 3);
            }
        }
        // Description: 'Review tags people add to your own posts before the tags appear on Facebook'
        // New Description: 'Review tags people add to your posts before the tags appear on Facebook?'
    }, {
        ID: 36,
        FixRelated: {
            type: 'tagSuggestion',
            valueSet: [1, 0],
            url: '/ajax/settings/tagging/suggestions.php'
        }
        // Description: 'Who sees tag suggestions when photos that look like you are uploaded?'
    }, {
        ID: 83,
        FixRelated: {
            type: 'simple_save',
            id: '8787700733',
            valueSet: [80, 50, 40, 10],
            url: '/ajax/privacy/simple_save.php'
        }
        // Description: 'Old versions of Facebook for mobile'
    }, {
        ID: 84,
        FixRelated: {
            type: 'edit_application',
            app_id: 1,
            valueSet: [80, 40, 10],

            url: '/settings/applications/edit_app_settings/submit',
            url2: '/ajax/settings/apps/delete_app.php'
        }
        // Description: 'Application can access your personal info'
    }];
    var FixHelper = function () {
        this.PROTOCOL_DOMAIN = PUtil.checkPage.IsFacebook() ? window.location.protocol + '//' + window.location.host : 'https://www.facebook.com';
        this.Constants = Constants;
    };
    FixHelper.prototype.logHeaderSendData = '[Facebook Fix -> send data]';
    FixHelper.prototype.logHeaderHandleResponseData = '[Facebook Fix -> handle response data]';
    FixHelper.prototype.getSendData = function (id, value) {
        return new Promise(async (resolve) => {
            let bRet = false;
            const setting = this.Constants.find(item => item.ID === id);
            if (setting && setting.FixRelated.process) {
                DEV && console.log(TAG, 'Fixing id = ' + setting.ID);
                let startTime = Date.now();
                bRet = await setting.FixRelated.process(value);
                let endTime = Date.now();
                DEV && console.log(TAG, 'total time = ' + (endTime-startTime));
            }

            resolve(bRet);
        });
    };
    FixHelper.prototype.handleResponse = function (id, value, data) {
        new ResponseHandlerLogger(FixHelper.logHeaderHandleResponseData + ', ID : ' + id + ', value : ' + value, data).getLog();
        var fixResult = PUtil.cloneObj(FacebookFixResultsTemplate);

        fixResult['id'] = id;
        fixResult['value'] = value;

        fixResult['data'] = data;
        return fixResult;
    };
    FixHelper.prototype.getValidFixValueByID = function (id) {
        for (var i = 0; i < this.Constants.length; i++) {
            if (this.Constants[i]['ID'] === id) {
                return FacebookScanResultsTemplate[i]['possibleFixValue'];
            }
        }
    };
    FixHelper.prototype.isValidFixValue = function (id, value) {
        var possibleValueList = this.getValidFixValueByID(id);
        for (var i = 0; i < possibleValueList.length; i++) {
            if (parseInt(value) === possibleValueList[i]) {
                return true;
            }
        }
        return false;
    };

    FixHelper.prototype.getQueryString = function (data) {
        var key;
        var result = '';
        for (key in data) {
            result += '&';
            result += key;
            result += '=';
            result += data[key];
        }

        return encodeURI(result).substr(1);
    };

    FixHelper.prototype.getTtstamp = function (fb_dtsg) {
        if (!fb_dtsg) {
            return "";
        }
        var v = "";
        var ttstamp = "";
        for (var w = 0; w < fb_dtsg.length; w++) {
            v += fb_dtsg.charCodeAt(w);
            ttstamp = "2" + v;
        }
        return ttstamp;
    };

    FixHelper.prototype.postPrivacyUpdate = function (id, value, dataSet, userID, fb_dtsg, params) {
        var data = {
            __a: '1',              //Magic number, as Facebook's post param
            __user: userID,
            fb_dtsg: fb_dtsg,
            __req: "a",              //Magic number, as Facebook's post param
            ttstamp: this.getTtstamp(fb_dtsg),
            __rev: 1747572           //Magic number, as Facebook's post param
        };
        params.data = data;
        params.url = params.url + "&privacy_fbid=" + dataSet.id + "&post_param=" + dataSet.valueSet[value] + "&render_location_enum=" + dataSet.render;
    };

    FixHelper.prototype.postSimpleSave = function (id, value, dataSet, userID, fb_dtsg) {
        var data = {
            __a: '1',
            __user: userID,
            fb_dtsg: fb_dtsg,
            id: dataSet.id,
            source: "privacy_settings_page"
        };

        var audience_value = {
        };

        audience_value[dataSet.id] = {
            'value': dataSet.valueSet[value]
        };

        data['audience_json'] = JSON.stringify(audience_value);
        data['ttstamp'] = this.getTtstamp(data, fb_dtsg);

        return data;
    };

    FixHelper.prototype.postTimeLineReview = function (id, value, dataSet, userID, fb_dtsg) {
        var data = {
            __a: '1',
            __user: userID,
            tag_approval_enabled: dataSet.valueSet[value],
            fb_dtsg: fb_dtsg
        };

        data['ttstamp'] = this.getTtstamp(data, fb_dtsg);
        return data;
    };

    FixHelper.prototype.postTaggingReview = function (id, value, dataSet, userID, fb_dtsg) {
        var data = {
            __a: '1',
            __user: userID,
            tag_review_enabled: dataSet.valueSet[value],
            fb_dtsg: fb_dtsg
        };

        data['ttstamp'] = this.getTtstamp(data, fb_dtsg);
        return data;
    };

    FixHelper.prototype.postSuggestionReview = function (id, value, dataSet, userID, fb_dtsg) {
        var data = {
            __a: '1',
            __user: userID,
            tag_suggestion_enabled: dataSet.valueSet[value],
            fb_dtsg: fb_dtsg
        };

        data['ttstamp'] = this.getTtstamp(data, fb_dtsg);
        return data;
    };

    FixHelper.prototype.postPublicSearch = function (id, value, dataSet, userID, fb_dtsg) {
        var data = {
            __a: '1',
            __user: userID,
            el: 'search_filter_public',
            fb_dtsg: fb_dtsg,
            'public': dataSet.valueSet[value],
            __req: '1'
        };
        data['ttstamp'] = this.getTtstamp(data, fb_dtsg);
        return data;
    };

    FixHelper.prototype.postInstantConnect = function (id, value, dataSet, userID, fb_dtsg) {
        var data = {
            __a: '1',
            __user: userID,
            el: 'instant_personalization_checkbox',
            fb_dtsg: fb_dtsg,
            'opt_in': dataSet.valueSet[value],
            __req: '1'
        };
        data['ttstamp'] = this.getTtstamp(data, fb_dtsg);
        return data;
    };
    FixHelper.prototype.postFriendsShare = function (id, value, dataSet, userID, fb_dtsg) {
        var data = {
            __a: '1',
            __user: userID,
            fb_dtsg: fb_dtsg,
            __req: '3'
        };
        data['ttstamp'] = this.getTtstamp(data, fb_dtsg);
        return data;
    };
    FixHelper.prototype.postEditApplication = function (id, value, dataSet, userID, appID, fb_dtsg) {
        var data = {
            __a: '1',
            __user: userID,
            app_id: appID,
            fb_dtsg: fb_dtsg,
            'audience[0][value]': dataSet.valueSet[value],
            'removed_read_scopes': '',
            'removed_write_scopes': '',
            'notification': 0
        };
        data['ttstamp'] = this.getTtstamp(data, fb_dtsg);
        return data;
    };
    FixHelper.prototype.postDeleteApplication = function (id, value, dataSet, userID, appID, fb_dtsg) {
        var data = {
            __a: '1',
            __user: userID,
            app_id: appID,
            fb_dtsg: fb_dtsg,
            legacy: false,
            dialog: true,
            confirmed: true,
            ban_user: 0

        };
        data['ttstamp'] = this.getTtstamp(data, fb_dtsg);
        return data;
    };
    window.FacebookFixHelper = FixHelper;
})();
