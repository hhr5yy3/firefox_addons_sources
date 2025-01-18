(function () {
    'use strict';

    // ================================================
    // ScannerHelper
    // ================================================
    var ScannerHelper = function () {

    };
    ScannerHelper.prototype.logHeaderSendData = '[MFacebook Scan -> send data]';
    ScannerHelper.prototype.logHeaderHandleResponseData = '[MFacebook Scan -> handle response data]';

    ScannerHelper.prototype.getSendData = function (id) {
        var params = {
            'type': 'GET',
            'data': null,
            'dataType': 'html',
            'url': MFacebookScanResultsTemplate[M_getScanResultIndexByID(id)].URL
        };

        new SendDataLogger(this.logHeaderSendData + ' : ' + id, params).getLog();
        return params;
    };


    ScannerHelper.prototype.handleResponse = function (id, data) {
        new ResponseHandlerLogger(this.logHeaderHandleResponseData + ', ID : ' + id, data).getLog();
        var scanResult = this.getScanResultSampleByID(id);

        var htmlData = TMExt_$(data);

        var Resources = {};
        Resources.FixRelatedData = {
            URL: htmlData.find('form[method="post"]').attr('action'),
            form: {
                fb_dtsg: htmlData.find('input[name="fb_dtsg"]').attr('value'),
                charset_test: htmlData.find('input[name="charset_test"]').attr('value'),
                fixList: []
            }
        };

        try {
            switch (String(id)) {
                case '20':
                    this.generateResources_20(data, Resources);
                    break;
                case '22':
                case '23':
                case '83':
                    this.generateResources_23(data, Resources);
                    break;
                case '24':
                    this.generateResources_24(data, Resources);
                    break;
                case '31':
                case '35':
                    this.generateResources_31(data, Resources);
                    break;
                case '33':
                case '34':
                    this.generateResources_33(data, Resources);
                    break;
                case '81':
                    this.generateResources_81(data, Resources);
                    break;
            }
            this.copySettingResources(scanResult, Resources);
            this.copySettingResources(MFacebookScanResultsTemplate[M_getScanResultIndexByID(id)], Resources);

            return scanResult;

        } catch (e) {
            PSDebug.error(e);
            return null;
        }
    };






    ScannerHelper.prototype.getAllvalidID = function () {
        var allValidID = [];
        for (var i = 0; i < MFacebookScanResultsTemplate.length; i++) {
            allValidID.push(MFacebookScanResultsTemplate[i]['ID']);
        }
        return allValidID;
    };
    ScannerHelper.prototype.isValidID = function (id) {
        var allValidID = this.getAllvalidID();
        for (var i = 0; i < allValidID.length; i++) {
            if (id == allValidID[i]) {
                return true;
            }
        }
        return false;
    };

    ScannerHelper.prototype.getScanResultSampleByID = function (id) {
        for (var i = 0; i < MFacebookScanResultsTemplate.length; i++) {
            if (MFacebookScanResultsTemplate[i]['ID'] == id) {
                return PUtil.cloneObj(MFacebookScanResultsTemplate[i]);
            }
        }
    };

    ScannerHelper.prototype.copySettingResources = function (scanResult, UIResources) {
        for (var key in UIResources) {
            scanResult[key] = UIResources[key];
        }
    };

    ScannerHelper.prototype.generateResources_20 = function (data, Resources) {
        var htmlData = TMExt_$(data);
	Resources.Title = htmlData.find('#root >div >div >div >div:eq(0)').text();
	Resources.Desc = htmlData.find('#root >div >div >div >div:eq(1)').text();
		
        if (!Resources.Desc) {
            Resources.Desc = Resources.Title;
        }

        var setting_list = htmlData.find('label[data-sigil~="touchable"]');

        Resources.PossibleValue = {};
        Resources.possibleFixValue = [];

        for (var i = 0; i < setting_list.length; i++) {
            Resources.PossibleValue[i] = setting_list.eq(i).find('span[data-sigil="label"]').text();
            Resources.possibleFixValue.push(i);
            Resources.FixRelatedData.form.fixList.push(setting_list.eq(i).find('input[type="radio"]').attr('value'))
            if (setting_list.eq(i).find('input[name="privacyx"]').attr('checked')) {
                Resources.Current = i;
            }
        }

        return;
    };

    ScannerHelper.prototype.generateResources_23 = function (data, Resources) {
        var htmlData = TMExt_$(data);
         Resources.Title = htmlData.find('#root >div >div >div >div:eq(0)')[0].children[0].innerHTML;
         Resources.Desc=  htmlData.find('#root >div >div >div >div:eq(0)')[0].children[1].innerHTML;

        if (!Resources.Desc) {
            Resources.Desc = Resources.Title;
        }

        var setting_list = htmlData.find('label[data-sigil~="touchable"]');

        Resources.PossibleValue = {};
        Resources.possibleFixValue = [];

        for (var i = 0; i < setting_list.length; i++) {
            Resources.PossibleValue[i] = setting_list.eq(i).find('span[data-sigil="label"]').text();
            Resources.possibleFixValue.push(i);
            Resources.FixRelatedData.form.fixList.push(setting_list.eq(i).find('input[type="radio"]').attr('value'))
            if (setting_list.eq(i).find('input[name="privacyX"]').attr('checked')) {
                Resources.Current = i;
            }
        }
        
        return;
    };

    ScannerHelper.prototype.generateResources_24 = function (data, Resources) {
        var htmlData = TMExt_$(data);

        Resources.Title = htmlData.find('#root >div >div:eq(0)').text();
        Resources.Desc = htmlData.find('#root >div >div:eq(1)').text();

        Resources.PossibleValue = {
            0: null,
            1: null
        };

        Resources.Current = htmlData.find('input[name="enable"]').attr('checked') ? 1 : 0;

        Resources.possibleFixValue = [0, 1];
        Resources.FixRelatedData.form.fixList = [0, 1];

        return;
    };

    ScannerHelper.prototype.generateResources_31 = function (data, Resources) {
        var htmlData = TMExt_$(data);

        var texts = htmlData.find("section._55ws p");
        Resources.Desc = "";
        for (var i = 0; i < texts.length; i++) {
            var text = TMExt_$(texts[i]).text();
            if (!text) {
                continue;
            }

            if (Resources.Title) {
                Resources.Desc += (text + " ");
            } else {
                Resources.Title = text;
            }
        }

        if (!Resources.Desc) {
            Resources.Desc = Resources.Title;
        }


        Resources.PossibleValue = {
            0: htmlData.find('span[class="_55mr"]').text(),
            1: htmlData.find('span[class="_55ms"]').text()
        };

        Resources.Current = htmlData.find('input[name="enable"]').attr('checked') ? 0 : 1;

        Resources.possibleFixValue = [0, 1];
        Resources.FixRelatedData.form.fixList = [1, 0];
        return;
    };

    ScannerHelper.prototype.generateResources_33 = function (data, Resources) {
        var htmlData = TMExt_$(data);

        Resources.Title = htmlData.find('#root >div >div >div >div:eq(0)').text();
        Resources.Desc = Resources.Title;

        if (!Resources.Desc) {
            Resources.Desc = Resources.Title;
        }

        var setting_list = htmlData.find('label[data-sigil~="touchable"]');

        Resources.PossibleValue = {};
        Resources.possibleFixValue = [];

        for (var i = 0; i < setting_list.length; i++) {
            Resources.PossibleValue[i] = setting_list.eq(i).find('span[data-sigil="label"]').text();
            Resources.possibleFixValue.push(i);
            Resources.FixRelatedData.form.fixList.push(setting_list.eq(i).find('input[type="radio"]').attr('value'))
            if (setting_list.eq(i).find('input[name="privacyX"]').attr('checked')) {
                Resources.Current = i;
            }
        }
        

        return;
    };

    ScannerHelper.prototype.generateResources_35 = function (data, Resources) {
        var htmlData = TMExt_$(data);

        Resources.Title = htmlData.find('span[class="_528h mfss _52ja"] >p:eq(0)').text();
        Resources.Desc = htmlData.find('span[class="_528h mfss _52ja"] >p:gt(0)').text();

        Resources.PossibleValue = {
            0: htmlData.find('span[class="_55mr"]').text(),
            1: htmlData.find('span[class="_55ms"]').text()
        };

        Resources.Current = htmlData.find('input[name="enable"]').attr('checked') ? 0 : 1;

        Resources.possibleFixValue = [0, 1];
        Resources.FixRelatedData.form.fixList = [1, 0];

        return;
    };

    ScannerHelper.prototype.generateResources_81 = function (data, Resources) {
        var htmlData = TMExt_$(data);

        Resources.Title = htmlData.find('#root >div >div:eq(0)').text();
        Resources.Desc = htmlData.find('#root >div >div:eq(1)').text();

        if (!Resources.Desc) {
            Resources.Desc = Resources.Title;
        }

        Resources.PossibleValue = {
            0: null,
            1: null
        };

        //Resources.Current = htmlData.find('input[type="checkbox"][checked]').length > 0 ? 1 : 0;
        /*
        * In this setting, Posts on my timeline is always checked or unchecked. So we ignore it.*/
        if (htmlData.find('input[type="checkbox"][checked]').length > 0) {
            if (htmlData.find('input[type="checkbox"][checked]').length == 1 && htmlData.find('input[type="checkbox"][checked]').parent().prev().text() == 'Posts on my timeline') {
                Resources.Current = 0;
            } else {
                Resources.Current = 1;
            }
        } else {
            Resources.Current = 0;
        }

        Resources.possibleFixValue = [0];

        return;
    };

    ScannerHelper.prototype.getHTMLContent = function (data) {
        return TMExt_$.parseJSON(data.substring(data.indexOf('{')));
    };

    window.MFacebookScannerHelper = ScannerHelper;
})();
