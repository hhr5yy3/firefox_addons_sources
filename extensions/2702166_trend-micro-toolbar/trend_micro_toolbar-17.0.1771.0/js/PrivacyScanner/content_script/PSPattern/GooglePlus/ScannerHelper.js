(function() {
    'use strict';

// ================================================
// SendDataConstructor
// ================================================
    var ScanResultsTemplate = GooglePlusScanResultsTemplate;

    var ScannerHelper = function() {
        this.PROTOCOL_DOMAIN = PUtil.checkPage.IsFacebook() ?
            window.location.protocol + '//' + window.location.host :
            'https://www.google.com';
    };
    ScannerHelper.prototype.logHeaderSendData = '[Google Plus Scan -> send data]';
    ScannerHelper.prototype.logHeaderHandleResponseData = '[Google Plus Scan -> handle response data]';

    ScannerHelper.prototype.getSendData_SettingPage = function() {
        var params = {
            'type' : 'GET',
            'data' : null,
            'dataType' : 'html',
            'url' : null
        };

        params.url = "https://plus.google.com/settings?gmbpt=true&fd=1";
        //params.url = this.PROTOCOL_DOMAIN;
        //params.url += '/settings/plus';
        new SendDataLogger(this.logHeaderSendData + ' : ' + 'getSendData_SettingPage', params).getLog();
        return params;
    };

    ScannerHelper.prototype.getSendData_google_1 = function() {
        var params = {
            'type' : 'GET',
            'data' : null,
            'dataType' : 'html',
            'url' : 'https://plus.google.com/+1/personalization/'
        };

        new SendDataLogger(this.logHeaderSendData + ' : ' + 'getSendData_google_1', params).getLog();
        return params;
    };
    
    ScannerHelper.prototype.getSendData_endorsement_scan = function() {
        var params = {
            'type' : 'GET',
            'data' : null,
            'dataType' : 'html',
            'url' : 'https://plus.google.com/settings/endorsements'
        };

        new SendDataLogger(this.logHeaderSendData + ' : ' + 'getSendData_endorsement_scan', params).getLog();
        return params;
    };
    
    ScannerHelper.prototype.handleResponse_endorsement_scan = function(data) {
        // data is jquery object
        new ResponseHandlerLogger(this.logHeaderHandleResponseData + ', ID : ' + 'handleResponse_endorsement_scan', data).getLog();
        try {
            var scanResult = {};
            
            scanResult['Title'] = data.find('label[for="pbe"]').text();
            scanResult['Desc'] = scanResult['Title'];
            scanResult['Current'] = data.find('#pbe')[0].checked ? 1 : 0;            
            scanResult['at'] = data.find('input[name="at"]').attr('value')
            
            return scanResult;
        } catch (e) {
            PSDebug.error(e);
            return null;
        }
    };

    ScannerHelper.prototype.handleResponse_google_1 = function(data) {
        // data is jquery object
        new ResponseHandlerLogger(this.logHeaderHandleResponseData + ', ID : ' + 'handleResponse_google_1', data).getLog();
        try {
            var scanResult = {};
            
            scanResult['Title'] = data.find('[class="fgyj2e"]').text();
            data.find('[class="nug8wc"] a').remove();
            scanResult['Desc'] = data.find('[class="nug8wc"]').text();
            
            // Current
            if (data.find('#sae')[0].checked) {
                scanResult['Current'] = 0;
            }else {
                scanResult['Current'] = 1;
            }

            scanResult['PossibleValue'] = {

            };

            scanResult['PossibleValue']['0'] = data.find('label[for="sae"]')[0].childNodes[0].nodeValue.split(' ')[0].replace(':', '');
            scanResult['PossibleValue']['1'] = data.find('label[for="sad"]')[0].childNodes[0].nodeValue.split(' ')[0].replace(':', '');

            return scanResult;
        } catch (e) {
            PSDebug.error(e);
            return null;
        }
    };

    ScannerHelper.prototype.handleResponse_SettingPage = function(data) {
        var that = this;
        // data is jquery object
        new ResponseHandlerLogger(this.logHeaderHandleResponseData + ', ID : ' + 'handleResponse_SettingPage', data).getLog();

        var returnResult = {};
        returnResult['scanResult'] = [];
        returnResult['scanResult_incomplete'] = false;

        /*
         get photo_geo_location
         */
        try {
            var photo_geo_location = this.getScanResultSampleByID('11');

            var objCheckbox = TMExt_$(data.find(".EKledf")[0]).parent().next().find("div")[1];
            var bChecked = TMExt_$(objCheckbox).attr("aria-checked");

            photo_geo_location['Current'] = (bChecked == "true") ? 1 : 0;
            photo_geo_location['Title'] = TMExt_$(data.find(".EKledf")[0]).text();
            photo_geo_location['Desc'] = photo_geo_location['Title'];

            //Old
            /*
            photo_geo_location['Current'] = data.find('#profiles-photos-settings-defaultGeoVisibility')[0].checked ? 1 : 0;
            photo_geo_location['Title'] = data.find('label[for="profiles-photos-settings-defaultGeoVisibility"]').text();
            photo_geo_location['Desc'] = data.find('label[for="profiles-photos-settings-defaultGeoVisibility"]').text();
            */

            returnResult['scanResult'].push(photo_geo_location);
        } catch (e) {
            PSDebug.error(e);
            returnResult['scanResult_incomplete'] = true;
        }

        /*
         allow_viewers_download
         */
        try {
            var allow_viewers_download = this.getScanResultSampleByID('12');

            var objCheckbox = TMExt_$(data.find(".EKledf")[1]).parent().next().find("div")[1];
            var bChecked = TMExt_$(objCheckbox).attr("aria-checked");

            allow_viewers_download['Current'] = (bChecked == "true") ? 1 : 0;
            allow_viewers_download['Title'] = TMExt_$(data.find(".EKledf")[1]).text();
            allow_viewers_download['Desc'] = allow_viewers_download['Title'];


            returnResult['scanResult'].push(allow_viewers_download);
        } catch (e) {
            PSDebug.error(e);
            returnResult['scanResult_incomplete'] = true;
        }

        /*
         find_my_face
         */
        try {
            var find_my_face = this.getScanResultSampleByID('13');

            var objCheckbox = TMExt_$(data.find(".EKledf")[2]).parent().next().find("div")[1];
            var bChecked = TMExt_$(objCheckbox).attr("aria-checked");

            find_my_face['Current'] = (bChecked == "true") ? 1 : 0;
            find_my_face['Title'] = TMExt_$(data.find(".EKledf")[2]).text();
            find_my_face['Desc'] = find_my_face['Title'];

            returnResult['scanResult'].push(find_my_face);
        } catch (e) {
            PSDebug.error(e);
            returnResult['scanResult_incomplete'] = true;
        }

        /*
         get communities
         */
        try {
            var communities = this.getScanResultSampleByID('31');

            var objItem = TMExt_$(TMExt_$(data.find('.LthDBb')[1]).next()[0]).find("div")[0];
            var bChecked = TMExt_$(objItem).attr("aria-checked");
            var strTitle = TMExt_$(objItem).attr("aria-label");

            communities['Current'] = (bChecked == "true") ? 1 : 0;
            communities['Title'] = strTitle;
            communities['Desc'] = communities['Title'];

            returnResult['scanResult'].push(communities);
        } catch (e) {
            PSDebug.error(e);
            returnResult['scanResult_incomplete'] = true;
        }

        return returnResult;
    };

    ScannerHelper.prototype.getAllvalidID = function() {
        var allValidID = [];
        for (var i = 0; i < ScanResultsTemplate.length; i++) {
            allValidID.push(ScanResultsTemplate[i]['ID']);
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
        for (var i = 0; i < ScanResultsTemplate.length; i++) {
            if (ScanResultsTemplate[i]['ID'] == id) {
                return PUtil.cloneObj(ScanResultsTemplate[i]);
            }
        }
    };

    window.GooglePlusScannerHelper = ScannerHelper;
})();
