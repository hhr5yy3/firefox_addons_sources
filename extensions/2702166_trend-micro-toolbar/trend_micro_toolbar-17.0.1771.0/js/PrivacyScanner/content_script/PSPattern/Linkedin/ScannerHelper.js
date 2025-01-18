(function() {'use strict';

    // ================================================
    // ScannerHelper
    // ================================================
    var ScannerHelper = function() {
        this.PROTOCOL_DOMAIN = PUtil.checkPage.IsLinkedIn() ? window.location.protocol + '//' + window.location.host : 'https://www.linkedin.com';
        this.ScanResultsTemplate = LinkedinScanResultsTemplate;
    };
    ScannerHelper.prototype.logHeaderSendData = '[Linkedin Scan -> send data]';
    ScannerHelper.prototype.logHeaderHandleResponseData = '[Linkedin Scan -> handle response data]';
    
    ScannerHelper.prototype.getAllvalidID = function() {
        var allValidID = [];
        for (var i = 0; i < this.ScanResultsTemplate.length; i++) {
            allValidID.push(this.ScanResultsTemplate[i]['ID']);
        }
        return allValidID;
    };
    ScannerHelper.prototype.isValidID = function(id) {
        var allValidID = this.getAllvalidID();
        for (var i = 0; i < allValidID.length; i++) {
            if (id == allValidID[i]) {
                return true;
            }
        }
        return false;
    };

    ScannerHelper.prototype.getScanResultSampleByID = function(id) {
        for (var i = 0; i < this.ScanResultsTemplate.length; i++) {
            if (this.ScanResultsTemplate[i]['ID'] == id) {
                return PUtil.cloneObj(this.ScanResultsTemplate[i]);
            }
        }
    };

    ScannerHelper.prototype.getSendData_wording = function(id) {
        var id_url = {
            "11" : "/psettings/data-sharing",
            "12" : "/psettings/advertising/ads-beyond-linkedin"
        };
        var params = {
            'type' : 'GET',
            'data' : null,
            'dataType' : 'html',
            'url' : this.PROTOCOL_DOMAIN + id_url[id]
        };

        new SendDataLogger(this.logHeaderSendData + ' : ' + id, params).getLog();
        return params;
    };

    ScannerHelper.prototype.getScanResult_SettingsPage = function(id) {
        const MAX_RETRY_COUNT = 10;
        let scanResult = this.getScanResultSampleByID(id);
        
        // get data from settings page
        const getSettings_AdsBeyondLinkedIn = () => {
            return new Promise(resolve => {
                const goToAdvertisingDataPage = (count) => {
                    if(count >= MAX_RETRY_COUNT) {
                        PSDebug.log('goToAdvertisingDataPage failed');
                        resolve(false);
                        return;
                    }

                    let queryRet = document.querySelector('a[href="/mypreferences/d/categories/ads"]');
                    if(queryRet === null) {
                        setTimeout(() => {
                            goToAdvertisingDataPage(count+1);
                        }, 1000);
    
                        return;
                    }
    
                    queryRet.click();
                    goToAdsBeyondLinkedin(0);
                }
    
                const goToAdsBeyondLinkedin = (count) => {
                    if(count >= MAX_RETRY_COUNT) {
                        PSDebug.log('goToAdsBeyondLinkedin failed');
                        resolve(false);
                        return;
                    }

                    let ret = false;
                    do {
                        if(window.location.href.indexOf('/mypreferences/d/categories/ads') === -1) {
                            break;
                        }
    
                        let queryRet = document.querySelector('a[href="/mypreferences/d/settings/ads-beyond-linkedin"]');
                        if(queryRet === null) {
                            break;
                        }

                        queryRet.click();
                        ret = true;

                    } while(false);

                    if(!ret) {
                        setTimeout(() => {
                            goToAdsBeyondLinkedin(count+1);
                        }, 500);
    
                        return;
                    }
    
                    getAdsBeyondLinkedinStatus(0);
                }

                const getAdsBeyondLinkedinStatus = (count) => {
                    if(count >= MAX_RETRY_COUNT) {
                        PSDebug.log('getAdsBeyondLinkedinStatus failed');
                        resolve(false);
                        return;
                    }

                    let ret = false;
                    do {
                        let mainNode = document.querySelector('#main');
                        if(!mainNode) {
                            break;
                        }

                        let switchNode = mainNode.querySelector('#allowLinkedInAudienceNetwork[role=switch]');
                        if(!switchNode) {
                            break;
                        }

                        scanResult.Current = switchNode.checked ? 1 : 0;
                        let divNode = switchNode.parentNode.parentNode.parentNode;
                        let labelNode = divNode.querySelector('p');
                        if(labelNode) {
                            scanResult.Title = labelNode.innerText;
                        }

                        let descNode = mainNode.querySelector('h4');
                        if(descNode) {
                            scanResult.Desc = descNode.innerText;
                        }

                        ret = true;
                    } while(false);
                    
                    if(!ret) {
                        setTimeout(() => {
                            getAdsBeyondLinkedinStatus(count+1);
                        }, 500);
    
                        return;
                    }

                    resolve(true);
                }

                goToAdvertisingDataPage(0);
            });
        }

        return new Promise(async resolve => {
            if(id === 12) {
                let ret = await getSettings_AdsBeyondLinkedIn();
                if(!ret) {
                    PSDebug.log('getSettings_AdsBeyondLinkedIn failed');
                }
            }
            PSDebug.log('getScanResult_SettingsPage: scanResult = ' + JSON.stringify(scanResult));

            resolve(scanResult);
        })
    };

    ScannerHelper.prototype.handleResponse = function(id, htmlContent) {
        new ResponseHandlerLogger(this.logHeaderHandleResponseData + ', ID : ' + id, htmlContent).getLog();
        var scanResult = this.getScanResultSampleByID(id);
        // parse html page to render "Title", "Desc", "Current"
        switch (String(id)) {
            case '12':
                try {
                    var data_$ = TMExt_$(htmlContent);
                    var title = data_$.find("h1.banner-title");
                    if (title.length) {
                        scanResult.Title = TMExt_$.trim(title[0].innerText)
                    }

                    var desc = data_$.find("p.config-setting-card__setting-item-primary-desc").text();
                    if (desc.length) {
                        scanResult.Desc = TMExt_$.trim(desc[0].innerText);
                    }

                    let adsBeyondLiOptions = data_$.find("input.a11y-text[role=switch]");
                    if(adsBeyondLiOptions.length > 0) {
                        scanResult.Current = (adsBeyondLiOptions[0].checked === false) ? 0 : 1;
                    }
                    PSDebug.log('[PS][LinkedIn] doScanSingle: scanResult = ' + JSON.stringify(scanResult));
                } catch (e) {
                    PSDebug.error(e);
                    scanResult = null;
                }
                break;
            default:
                scanResult = null;
                break;
        }
        
        return scanResult;
    };
    window.LinkedinScannerHelper = ScannerHelper;
})();