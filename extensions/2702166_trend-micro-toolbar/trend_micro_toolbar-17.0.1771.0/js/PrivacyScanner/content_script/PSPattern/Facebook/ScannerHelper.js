(function(){
    /*
        Response Handler: Base
    */
    var ResponseHandler = function(id, htmlContent, scanResultTemplate){
        this.id = id;
        this.htmlContent = htmlContent;
        this.scanResultTemplate = scanResultTemplate;
    };

    ResponseHandler.prototype.getCurrentSetting_Base = function(popContent, ITEM_LIST_COUNT) {
        // get setting item
        for (var i = 0; i < ITEM_LIST_COUNT; i++) {
            var value_tag = popContent.find('._54nf li:eq(' + i + ') a');
            if (value_tag.attr('aria-checked') === 'true') {
                return i;
            }
        }
        // if user has set other group, we will set "custom" (3) here.
        return 3;
    };

    ResponseHandler.prototype.generateUIResources_Base = function(popContent, selectedItemlength) {
        var UIResources = {
        };

        UIResources.Title = popContent.find('div[class="mbm fwb"]').text();
        UIResources.Desc = popContent.find('div[class="mbm fcg"]').text();

        if (UIResources.Desc == undefined || UIResources.Desc == null || UIResources.Desc == '') {
            UIResources.Desc = UIResources.Title;
        }

        var possibleValueContainer = popContent.find('ul[class="_54nf"]');

        var patternSelectedItem = null;
        if (selectedItemlength == undefined || selectedItemlength == null) {
            patternSelectedItem = 'li';
        } else {
            patternSelectedItem = 'li:lt(' + selectedItemlength + ')';
        }

        var possibleValueList = possibleValueContainer.find(patternSelectedItem);
        var possibleValue = {};
        for (var i = 0; i < possibleValueList.length; i++) {
            // var value = TMExt_$(possibleValueList[i]).attr("data-label");
            var value = TMExt_$(TMExt_$(possibleValueList[i]).find('a span')[0].childNodes[0]).text();
            possibleValue[i] = value;
        }

        UIResources.PossibleValue = possibleValue;

        return UIResources;
    };

    ResponseHandler.prototype.generateUIResources_31 = function() {
        var res = this.htmlContent;
        
        var possibleValue = {
        };
        var popContent = null;
        for (var i=0; i < 3; i++) {
            if(res.jsmods.markup[i][2] == 1){
                // is "possible value"
                if(i == 1){
                    // is "Enabled"
                    possibleValue[0] = res.jsmods.markup[i][1].__html.toString();
                }else if(i == 2){
                    // is "Disabled"
                    possibleValue[1] = res.jsmods.markup[i][1].__html.toString();
                }
            } else if(res.jsmods.markup[i][2] == 7){
                // is title and desc
                popContent = TMExt_$(res.jsmods.markup[i][1].__html);
            }
        };
        
        var UIResources = {
        };

        UIResources.Title = popContent.find('div[class="mbm fwb"]').text();
        UIResources.Desc = popContent.find('label[class="mvm"]').text();

        if (UIResources.Desc == undefined || UIResources.Desc == null || UIResources.Desc == '') {
            UIResources.Desc = UIResources.Title;
        }

        UIResources.PossibleValue = possibleValue;

        return UIResources;
    };
    
    /*
        Response Handler : normal
    */
    var ResponseHandler_Normal = function(id, htmlContent, scanResultTemplate){
        ResponseHandler.call(this, id, htmlContent, scanResultTemplate);
    };
    ResponseHandler_Normal.prototype = new ResponseHandler();
    
    ResponseHandler_Normal.prototype.getNumberOfSettingItems = function() {
        var that = this;
        var popContent = TMExt_$(this.htmlContent.jsmods.markup[0][1].__html);

        var li_list = popContent.find('ul[class="uiMenuInner"]>li');

        var count = 0;
        for (var i = 0; i < li_list.length; i++) {
            if (li_list.eq(i).hasClass('uiMenuSeparator')) {
                return count;
            } else {
                count++;
            }
        }
        return null;
    };
    
    
    /*
        Response Handler : new
    */
    var ResponseHandler_New = function(id, htmlContent, scanResultTemplate){
        ResponseHandler.call(this, id, htmlContent, scanResultTemplate);
    };
    ResponseHandler_New.prototype = new ResponseHandler();
    
    ResponseHandler_New.prototype.getNumberOfSettingItems = function() {
        var that = this;
        var settingListRaw = this.htmlContent.jsmods.markup;
        var count = 0;
        TMExt_$.each(settingListRaw, function(index, item){
            if(item[0].indexOf("__markup_3310c079") >= 0) {
                count++;
                return true;
            }
        });
        
        return count;
    };
    
    ResponseHandler_New.prototype.getResult = function() {
        var that = this;
        try {           
            var scanResult = this.scanResultTemplate;
            var popContent = TMExt_$(this.htmlContent.jsmods.markup[0][1].__html);
            
            // get UI resources
            var UIResources = this.generateUIResources(popContent);
            TMExt_$.extend(scanResult, UIResources);

            var settings;
            /* get setting item
             * different settings for 20, 33, 34, have specific options
             */
            settings = this.getSettings(this.htmlContent, scanResult['ID']);
            TMExt_$.extend(scanResult, settings);
            return scanResult;

        } catch (e) {
            PSDebug.error(e);
            return null;
        }
    };
    
    ResponseHandler_New.prototype.generateUIResources = function(popContent) {
        // get Title/Desc
        var UIResources = {
        };

        UIResources.Title = popContent.find('div[class="mbm fwb"]').text();
        UIResources.Desc = popContent.find('div[class="mbm fcg"]').text();

        if (UIResources.Desc == undefined || UIResources.Desc == null || UIResources.Desc == '') {
            UIResources.Desc = UIResources.Title;
        }

        return UIResources;
    };
    
    ResponseHandler_New.prototype.getSettings = function(htmlContent, scanID) {
        // get Title/Desc
        var Setting = {
            Current: null,
            PossibleValue: {

            }
        };

        /* For general options */
        if(scanID == 20) {
            var optionValue = [
                300645083384735,    // everyone
                291667064279714,    // friends
                -1,                 // friends except ...
                -1,                 // specific friends
                286958161406148,    // only me
                -1                  // custom
            ];

            /* get current selected item */
            var settingContent = htmlContent.jsmods.markup[0][1].__html;
            for (var index = 0; index < optionValue.length; index++) {
                if (settingContent.indexOf(optionValue[index]) >= 0) {
                    if(index == 4) {
                        Setting.Current = 2;
                    } else {
                        Setting.Current = index;
                    }
                }
            }

            /* get PossibleValues label */
            var settingListRaw = this.htmlContent.jsmods.markup;

            /* general options */
            var count = 0;
            Setting.PossibleValue[0] = settingListRaw[2][1].__html;
            Setting.PossibleValue[1] = settingListRaw[5][1].__html;
            Setting.PossibleValue[2] = settingListRaw[16][1].__html;
            // TMExt_$.each(settingListRaw, function (index, item) {
            //     if (item[0].indexOf("__markup_3310c079") >= 0) {
            //         if(count != 0) {    // ignore title
            //             Setting.PossibleValue[count - 1] = item[1].__html;
            //         }
            //         count++;
            //     }
            // });
        } else if(scanID == 33 || scanID == 34) {
            var optionValue = [{
                    'index': 0,
                    'value': 300645083384735,
                    'text': 'everyone'
                },{
                    'index': 1,
                    'value': 275425949243301,
                    'text': 'friends_of_friends'
                },{
                    'index': 2,
                    'value': 291667064279714,
                    'text': 'friends'
                },{
                    'index': 5,
                    'value': 286958161406148,
                    'text': 'only me'
                }
            ];

            /* get current selected item */
            var settingContent = htmlContent.jsmods.markup[0][1].__html;
            for (let option of optionValue) {
                if (settingContent.indexOf(option['value']) >= 0) {
                    Setting.Current = option['index'];
                    break;
                }
            }

            /* get PossibleValues label */
            var settingListRaw = this.htmlContent.jsmods.markup;

            /* general options */
            var count = 0;
            var optionCount = 0;
            var nextIndex = optionValue[optionCount]['index'];
            TMExt_$.each(settingListRaw, function (index, item) {
                if (item[0].indexOf("__markup_3310c079") >= 0) {
                    if(count === nextIndex) {
                        Setting.PossibleValue[optionCount.toString()] = item[1].__html;
                        optionCount++;
                        nextIndex = optionCount < optionValue.length ? optionValue[optionCount]['index'] : -1;
                    }
                    
                    count++;
                }
            });
        } else {
            var optionValue = [
                300645083384735,    // everyone
                275425949243301,    // friends_of_friends
                291667064279714     // friends
            ];

            /* get current selected item */
            var settingContent = htmlContent.jsmods.markup[0][1].__html;
            for (var index = 0; index < optionValue.length; index++) {
                if (settingContent.indexOf(optionValue[index]) >= 0) {
                    Setting.Current = index;
                }
            }

            /* get PossibleValues label */
            var settingListRaw = this.htmlContent.jsmods.markup;

            /* general options */
            var count = 0;
            TMExt_$.each(settingListRaw, function (index, item) {
                if (item[0].indexOf("__markup_3310c079") >= 0) {
                    Setting.PossibleValue[count] = item[1].__html;
                    count++;
                }
            });
        }

        if(Setting.Current === null){
            // use default value
            Setting.Current = this.DefaultSetting;
        }
        
        return Setting;
    };
    
    
    /*
        setting id: 20
    */
    var ResponseHandler_20 = function(id, htmlContent, scanResultTemplate, data) {
        this.data = data;

        ResponseHandler_Normal.call(this, id, htmlContent, scanResultTemplate);
    };
    ResponseHandler_20.prototype = new ResponseHandler_Normal();

    ResponseHandler_20.prototype.unicodeToChar = function (text)
    {
        return text.replace(/\\u[\dA-F]{4}/gi,
            function(match){return String.fromCharCode(parseInt(match.replace(/\\u/g,''),16))});
    };

    ResponseHandler_20.prototype.getCurrentSetting = function(){
        var popContent = TMExt_$(this.htmlContent.jsmods.markup[0][1].__html);
        var context = popContent.find("._55pe");
        var childNodes = context[0].childNodes;

        return childNodes[childNodes.length -1].nodeValue;
    };

    ResponseHandler_20.prototype.getSettingList = function(){
        var that = this;

        var ptn = /\"baseLabel\"\:(.*?)\,/g;     //or   "triggerLabel"
        var matchArr_items = [];
        var matchCur = [];
        while( matchCur = ptn.exec(that.data) ){
            var curMatchUnicode = matchCur[1].substr(1, matchCur[1].length-2);
            matchArr_items.push(that.unicodeToChar(curMatchUnicode));
        }

        //for the case TO-2306 , add the rule that removing 3 no need items for list with 6 option while removing 2 no need items for list with 5 option
        if(6 == matchArr_items.length)
        {
            //Remove 3 no need items
            matchArr_items.splice(2, 1);
            matchArr_items.splice(2, 1);
            matchArr_items.splice(2, 1);
        }
        if(5 == matchArr_items.length)
        {
            //Remove 2 no need items
            matchArr_items.splice(2, 1);
            matchArr_items.splice(2, 1);
        }
        that.matchArr_items = matchArr_items;
    };

    ResponseHandler_20.prototype.getNumberOfSettingItems = function(){
        if(this.matchArr_items != undefined)
        {
            return this.matchArr_items.length;
        }
        return 0;
    };

    ResponseHandler_20.prototype.getCurrentSettingIndex = function(){
        var that = this;

        that.getSettingList();
        var nSettings = that.getNumberOfSettingItems();
        if(nSettings == that.scanResultTemplate.ExpectedNumberOfPossibleValue){
            var curSetting = that.getCurrentSetting();

            for (var i = 0; i < nSettings; i++) {
                if (curSetting === that.matchArr_items[i]) {
                    return i;
                }
            }
        }

        return 2;
    };

    ResponseHandler_20.prototype.generateUIResources = function(popContent) {
        var that = this;

        var UIResources = {
        };

        UIResources.Title = popContent.find('div[class="mbm fwb"]').text();
        UIResources.Desc = popContent.find('div[class="mbm fcg"]').text();

        if (UIResources.Desc == undefined || UIResources.Desc == null || UIResources.Desc == '') {
            UIResources.Desc = UIResources.Title;
        }

        if(that.matchArr_items !== undefined)
        {
            var possibleValueList = that.matchArr_items;
            var possibleValue = {};
            for (var i = 0; i < possibleValueList.length; i++) {
                possibleValue[i] = possibleValueList[i];
            }

            UIResources.PossibleValue = possibleValue;
        }

        return UIResources;
    };

    ResponseHandler_20.prototype.getResult = function(){
        var that = this;

        var scanResult = that.scanResultTemplate;

        try {
            scanResult.Current = that.getCurrentSettingIndex();

            // get UI resources
            var popContent = TMExt_$(this.htmlContent.jsmods.markup[0][1].__html);
            var UIResources = this.generateUIResources(popContent);
            TMExt_$.extend(scanResult, UIResources);

            return scanResult;
        } catch (e) {
            PSDebug.error(e);
            return null;
        }
    };

    /*
        setting id: 20 new
    */
    var ResponseHandler_20_new = function(id, htmlContent, scanResultTemplate) {
        ResponseHandler_New.call(this, id, htmlContent, scanResultTemplate);
    };
    ResponseHandler_20_new.prototype = new ResponseHandler_New();

    ResponseHandler_20_new.prototype.DefaultSetting = 3;

    
    /*
        setting id: 23
    */
    var ResponseHandler_23 = function(id, htmlContent, scanResultTemplate) {
        ResponseHandler_Normal.call(this, id, htmlContent, scanResultTemplate);
    };
    ResponseHandler_23.prototype = new ResponseHandler_Normal();
    
    ResponseHandler_23.prototype.getCurrentSetting = function(popContent, ITEM_LIST_COUNT) {
        // get setting item
        for (var i = 0; i < ITEM_LIST_COUNT; i++) {
            var value_tag = popContent.find('._54nf li:eq(' + i + ') a');
            if (value_tag.attr('aria-checked') === 'true') {
                return i;
            }
        }
        return null;
    };
    
    ResponseHandler_23.prototype.getResult = function() {
        var that = this;
        try {
            var scanResult = this.scanResultTemplate;
            var popContent = TMExt_$(this.htmlContent.jsmods.markup[0][1].__html);

            var ITEM_LIST_COUNT = this.getNumberOfSettingItems(popContent);
            if(ITEM_LIST_COUNT != scanResult.ExpectedNumberOfPossibleValue){
                return null;
            }
            // get UI resources
            var UIResources = this.generateUIResources_Base(popContent, ITEM_LIST_COUNT);
            TMExt_$.extend(scanResult, UIResources);
            // get setting item
            scanResult.Current = this.getCurrentSetting(popContent, ITEM_LIST_COUNT);
            return scanResult;
        } catch (e) {
            PSDebug.error(e);
            return null;
        }
    };

    /*
        setting id: 24
    */
    var ResponseHandler_24 = function(id, htmlContent, scanResultTemplate) {
        ResponseHandler_Normal.call(this, id, htmlContent, scanResultTemplate);
    };
    ResponseHandler_24.prototype = new ResponseHandler_Normal();
    
    ResponseHandler_24.prototype.generateUIResources = function(popContent) {
        var UIResources = {
        };

        UIResources.Title = popContent.find('div[class="mbm fwb"]').text();
        UIResources.Desc = popContent.find('label[class="mvm"]').text();

        if (UIResources.Desc == undefined || UIResources.Desc == null || UIResources.Desc == '') {
            UIResources.Desc = UIResources.Title;
        }

        var possibleValue = {
            0 : null,
            1 : null
        };

        UIResources.PossibleValue = possibleValue;
        return UIResources;
    };
    
    ResponseHandler_24.prototype.getCurrentSetting = function(popContent) {
        // get setting item
        var value_tag = popContent.find(('input[id="search_filter_public"][checked]'));
        return value_tag.length > 0 ? 1 : 0;
    };
    
    ResponseHandler_24.prototype.getResult = function() {
        try {
            var scanResult = this.scanResultTemplate;
            var popContent = TMExt_$(this.htmlContent.jsmods.markup[0][1].__html);

            // get UI resources
            var UIResources = this.generateUIResources(popContent);
            TMExt_$.extend(scanResult, UIResources);
            // get setting item
            scanResult.Current = this.getCurrentSetting(popContent);
            return scanResult;
        } catch (e) {
            PSDebug.error(e);
            return null;
        }
    };
    
    /*
        setting id: 31
    */
    var ResponseHandler_31 = function(id, htmlContent, scanResultTemplate) {
        ResponseHandler_Normal.call(this, id, htmlContent, scanResultTemplate);
    };
    ResponseHandler_31.prototype = new ResponseHandler_Normal();
    
    ResponseHandler_31.prototype.getCurrentSetting = function() {
        var htmlContent = this.htmlContent;
        var popContent = null;
        for (var i=0; i < 3; i++) {
            if(htmlContent.jsmods.markup[i][2] == 7){
                popContent = TMExt_$(htmlContent.jsmods.markup[i][1].__html);
                break;
            }
        };
        
        // get setting item
        var value_tag = popContent.find('input[name="tag_approval_enabled"]');
        return value_tag.attr('value') === '1' ? 1 : 0;
    };
    
    ResponseHandler_31.prototype.getResult = function() {
        try {
            var scanResult = this.scanResultTemplate;
            // get UI resources
            var UIResources = this.generateUIResources_31();
            TMExt_$.extend(scanResult, UIResources);
            // get setting item
            scanResult.Current = this.getCurrentSetting();
            return scanResult;
        } catch (e) {
            PSDebug.error(e);
            return null;
        }
    };
    
    /*
        setting id: 33
    */
    var ResponseHandler_33 = function(id, htmlContent, scanResultTemplate) {
        ResponseHandler_Normal.call(this, id, htmlContent, scanResultTemplate);
    };
    ResponseHandler_33.prototype = new ResponseHandler_Normal();
    
    ResponseHandler_33.prototype.getResult = function() {
        try {
            var scanResult = this.scanResultTemplate;
            var popContent = TMExt_$(this.htmlContent.jsmods.markup[0][1].__html);

            var ITEM_LIST_COUNT = this.getNumberOfSettingItems(popContent);
            if(ITEM_LIST_COUNT != scanResult.ExpectedNumberOfPossibleValue){
                return null;
            }
            
            // get UI resources
            var UIResources = this.generateUIResources_Base(popContent, ITEM_LIST_COUNT);
            TMExt_$.extend(scanResult, UIResources);
            // get setting item
            scanResult.Current = this.getCurrentSetting_Base(popContent, ITEM_LIST_COUNT);
            return scanResult;
        } catch (e) {
            PSDebug.error(e);
            return null;
        }
    };
    
    /*
        setting id: 34
    */
    var ResponseHandler_34 = function(id, htmlContent, scanResultTemplate) {
        ResponseHandler_Normal.call(this, id, htmlContent, scanResultTemplate);
    };
    ResponseHandler_34.prototype = new ResponseHandler_Normal();
    
    ResponseHandler_34.prototype.getResult = function() {
        try {
            var scanResult = this.scanResultTemplate;
            var popContent = TMExt_$(this.htmlContent.jsmods.markup[0][1].__html);

            var ITEM_LIST_COUNT = this.getNumberOfSettingItems(popContent);
            if(ITEM_LIST_COUNT != scanResult.ExpectedNumberOfPossibleValue){
                return null;
            }
            // get UI resources
            var UIResources = this.generateUIResources_Base(popContent, ITEM_LIST_COUNT);
            TMExt_$.extend(scanResult, UIResources);
            // get setting item
            scanResult.Current = this.getCurrentSetting_Base(popContent, ITEM_LIST_COUNT);
            return scanResult;
        } catch (e) {
            PSDebug.error(e);
            return null;
        }
    };
    
    /*
        setting id: 33/34 new
    */
    var ResponseHandler_33_new = function(id, htmlContent, scanResultTemplate) {
        ResponseHandler_New.call(this, id, htmlContent, scanResultTemplate);
    };
    ResponseHandler_33_new.prototype = new ResponseHandler_New();
    
    ResponseHandler_33_new.prototype.DefaultSetting = 6;
    
    /*
        setting id: 35
    */
    var ResponseHandler_35 = function(id, htmlContent, scanResultTemplate) {
        ResponseHandler_Normal.call(this, id, htmlContent, scanResultTemplate);
    };
    ResponseHandler_35.prototype = new ResponseHandler_Normal();
    
    ResponseHandler_35.prototype.getCurrentSetting = function() {
        var htmlContent = this.htmlContent;
        var popContent = null;
                    
        for (var i=0; i < 3; i++) {
            if(htmlContent.jsmods.markup[i][2] == 7){
                popContent = TMExt_$(htmlContent.jsmods.markup[i][1].__html);
                break;
            }
        };
        
        // get setting item
        var value_tag = popContent.find(('input[name="tag_review_enabled"]'));
        return value_tag.attr('value') === '1' ? 1 : 0;
    };
    
    ResponseHandler_35.prototype.getResult = function() {
        try {
            var scanResult = this.scanResultTemplate;
            // get UI resources
            var UIResources = this.generateUIResources_31();
            TMExt_$.extend(scanResult, UIResources);
            // get setting item
            scanResult.Current = this.getCurrentSetting();
            return scanResult;
        } catch (e) {
            PSDebug.error(e);
            return null;
        }
    };
    
    /*
        setting id: 36
    */
    var ResponseHandler_36 = function(id, htmlContent, scanResultTemplate) {
        ResponseHandler_Normal.call(this, id, htmlContent, scanResultTemplate);
    };
    ResponseHandler_36.prototype = new ResponseHandler_Normal();
    
    ResponseHandler_36.prototype._getResult = function(htmlContent) {
        var $html_markup = htmlContent.jsmods.markup;
        var $pageContent = TMExt_$($html_markup[0][1].__html);
        var wording_friends = $html_markup[1][1].__html;
        var wording_noOne = $html_markup[2][1].__html;
        
        var result = {
            
        };

        result.Title = $pageContent.find('div[class="mbm fwb"]').text();
        
        /*
            <div>
                ssss
                <a>learn more</a>
                pppp
            </div>
            
            Only output "ssss"
        */
        result.Desc = $pageContent.find('div[class="mbm fcg"]').contents().eq(0).text();
        result.PossibleValue = {
            0 : wording_friends,
            1 : wording_noOne
        };
        
        var wordingInPage = $pageContent.find('form a[role="button"] span').text();
        if(wordingInPage.indexOf(wording_friends) != -1){
            // is friends
            result.Current = 0;    
        }else{
            result.Current = 1;
        }
        
        return result;
    };
    
    ResponseHandler_36.prototype.getResult = function() {
        try {
            var scanResult = this.scanResultTemplate;
            var result = this._getResult(this.htmlContent);
            TMExt_$.extend(scanResult, result);
            return scanResult;
        } catch (e) {
            PSDebug.error(e);
            return null;
        }
    };

    /*
        setting id: 83
    */
    var ResponseHandler_83 = function(id, htmlContent, scanResultTemplate) {
        ResponseHandler_Normal.call(this, id, htmlContent, scanResultTemplate);
    };
    ResponseHandler_83.prototype = new ResponseHandler_Normal();
    
    ResponseHandler_83.prototype.generateUIResources = function() {
        var UIResources = {
        };
        
        UIResources.Title = TMExt_$(window.app_settings_title_array[2]).text();
        UIResources.Desc = TMExt_$(window.app_settings_desc_array[2]).text();
        
        if (UIResources.Desc == undefined || UIResources.Desc == null || UIResources.Desc == '') {
            UIResources.Desc = UIResources.Title;
        }

        UIResources.PossibleValue = g_app_settings_set_83;

        return UIResources;
    };
    
    ResponseHandler_83.prototype.getCurrentSetting = function(popContent, ITEM_LIST_COUNT) {
        var curSelNode = TMExt_$(popContent.find("._55pe")[3]);
        var curSelWording = curSelNode.clone().children().remove().end().text();

        for(var i = 0; i < ITEM_LIST_COUNT; i++)
        {
            if(curSelWording === g_app_settings_set_83[i])
                return i;
        }

        // if user has set other group, we will set "only me" (3) here.
        return 3;
    };
    
    ResponseHandler_83.prototype.getResult = function() {
        try {
            var scanResult = this.scanResultTemplate;
            var popContent = this.htmlContent;
            var ITEM_LIST_COUNT = window.g_app_settings_set_83.length;
            if(ITEM_LIST_COUNT != scanResult.ExpectedNumberOfPossibleValue){
                //return null;
            }
            // get UI resources
            var UIResources = this.generateUIResources();
            TMExt_$.extend(scanResult, UIResources);
            // get setting item
            scanResult.Current = this.getCurrentSetting(popContent, ITEM_LIST_COUNT);
            return scanResult;
        } catch (e) {
            PSDebug.error(e);
            return null;
        }
    };
    
    /*
        setting id: 83 new
    */
    var ResponseHandler_83_new = function(id, htmlContent, scanResultTemplate) {
        ResponseHandler_New.call(this, id, htmlContent, scanResultTemplate);
    };
    ResponseHandler_83_new.prototype = new ResponseHandler_New();
    
    ResponseHandler_83_new.prototype.DefaultSetting = 4;
    
    ResponseHandler_83_new.prototype.generateUIResources = function(popContent) {
        // get Title/Desc
        var UIResources = {
        };

        UIResources.Title = popContent.find('div[class="mvm mlm _cuf"]').text();
        UIResources.Desc = popContent.find('div[class="mbm fcg"]').text();

        if (UIResources.Desc == undefined || UIResources.Desc == null || UIResources.Desc == '') {
            UIResources.Desc = UIResources.Title;
        }

        return UIResources;
    };
    
     /*
        setting id: 84
    */
    var ResponseHandler_84 = function(id, htmlContent, scanResultTemplate) {
        ResponseHandler_Normal.call(this, id, htmlContent, scanResultTemplate);
    };
    ResponseHandler_84.prototype = new ResponseHandler_Normal();
    
    ResponseHandler_84.prototype.generateUIResources = function(popContent) {
        var UIResources = {
        };
        UIResources.Title = TMExt_$(window.application_3rd_title).text();
        UIResources.Desc = UIResources.Title;
        var possibleValue = {
            0: window.g_app_settings_set_84[0],
            1: window.g_app_settings_set_84[1],
            2: window.g_app_settings_set_84[2]
        };
                  
        if (window.FacebookL10nWording) {
            possibleValue = window.FacebookL10nWording;
        } 

        UIResources.PossibleValue = possibleValue;

        return UIResources;
    };
    
    ResponseHandler_84.prototype.getCurrentSetting = function(levelArray) {
        // get setting item
        try {
            var maxLevel = Math.max.apply(null,levelArray);
            switch(maxLevel) {
            case 80:
                return 0;
            case 50:
                return 1;
            case 40:
                return 2;
            case 10:
                return 3;
            }
            return 0;
        } catch(e){
            PSDebug.error(e);
            return 0;
        }
    };


    ResponseHandler_84.prototype.getResult = function() {
        try {
            var scanResult = this.scanResultTemplate;
            var popContent = TMExt_$(this.htmlContent.domops[0][3].__html).hide();
            TMExt_$("._w9r").remove();
            TMExt_$("body").append(popContent);

            scanResult.appIDs = [];
            scanResult.appsDetail = {};

            var apps = [];
            if(this.htmlContent.jsmods) {
                apps = this.htmlContent.jsmods.require;
            }
            var appsDom = popContent.find("._3fig");
            var SpecialPosArray = [];

            for (var i = 0; i < apps.length; i++) {
                if( i == appsDom.length) {
                    break;
                }

                // parse app level
                var appDom = TMExt_$(appsDom[i]);
                var position = null;
                var curSetting = appsDom[i].children[1].childNodes[1].children[1].children[1].innerText;

                for(var j = 0; j < window.g_app_settings_set_84.length; j++)
                {
                    if(curSetting === window.g_app_settings_set_84[j])
                        position = j;
                }
                //--------------------------------------------------------------------------------------------------
                if (scanResult.Risk.indexOf(position) < 0) {
                    continue;
                }
                
                var id = apps[i][3][1];
                scanResult.appsDetail[id] = {};
                var oneAppDetail = scanResult.appsDetail[id];
                
                oneAppDetail.imgPath = appDom.find("img._8r").attr("src");
                oneAppDetail.appName = appDom.find("._4n9u").text();
                oneAppDetail.appLevelWording = appDom.find("._4n9w").text();
                SpecialPosArray.push(position);
                oneAppDetail.appLevelNum = position;
                
                scanResult.appIDs.push(id);
            }
            scanResult.Current = Math.min.apply(null,SpecialPosArray);
            if (isNaN(scanResult.Current)) {
                 tbc_error("Get the wrong 'Current' value!");
                 return scanResult;
            } 
            // get UI resources
            var UIResources = this.generateUIResources(popContent);
            TMExt_$.extend(scanResult, UIResources);
            
            // get setting item
            //PSDebug.log("facebook applications scan result :===================> ",scanResult);
            //popContent.hide();
            return scanResult;
        } catch (e) {
            PSDebug.error(e);
            return null;
        }
    };    

    /*
        response handler factory
    */            
    var getResponseHandler = function(id, htmlContent, scanResultTemplate, data){
        var isSettingNormal = function(htmlContent) {
            try{
                var popContent = TMExt_$(htmlContent.jsmods.markup[0][1].__html);
                if(popContent.find('ul[class="uiMenuInner"]').length > 0){
                    // normal Facebook setting will have ul with class "uiMenuInner"
                    return true;
                }
                return false;   
            }catch(e){
                return true;
            }
        };
    
        switch (String(id)) {
            case '20':
                return new ResponseHandler_20(id, htmlContent, scanResultTemplate, data);
            case '22':
            case '23':
                return  isSettingNormal(htmlContent) ? 
                        new ResponseHandler_23(id, htmlContent, scanResultTemplate) : 
                        new ResponseHandler_20_new(id, htmlContent, scanResultTemplate);
            case '24':
                return new ResponseHandler_24(id, htmlContent, scanResultTemplate);
            case '31':
                return new ResponseHandler_31(id, htmlContent, scanResultTemplate);
            case '33':
                return  isSettingNormal(htmlContent) ? 
                        new ResponseHandler_33(id, htmlContent, scanResultTemplate) : 
                        new ResponseHandler_33_new(id, htmlContent, scanResultTemplate);
            case '34':
                return  isSettingNormal(htmlContent) ? 
                        new ResponseHandler_34(id, htmlContent, scanResultTemplate) : 
                        new ResponseHandler_33_new(id, htmlContent, scanResultTemplate);
            case '35':
                return new ResponseHandler_35(id, htmlContent, scanResultTemplate);
            case '36':
                return new ResponseHandler_36(id, htmlContent, scanResultTemplate);
            case '83':
                return  isSettingNormal(htmlContent) ? 
                        new ResponseHandler_83(id, htmlContent, scanResultTemplate) : 
                        new ResponseHandler_83_new(id, htmlContent, scanResultTemplate);
            case '84':
                return new ResponseHandler_84(id, htmlContent, scanResultTemplate);
        }
    };
    
    window.getResponseHandler = getResponseHandler;
})();

(function() {'use strict';

    // ================================================
    // ScannerHelper
    // ================================================
    var ScannerHelper = function() {
        this.PROTOCOL_DOMAIN = PUtil.checkPage.IsFacebook() ? window.location.protocol + '//' + window.location.host : 'https://www.facebook.com';
        this.ScanResultsTemplate = FacebookScanResultsTemplate;
    };
    ScannerHelper.prototype.logHeaderSendData = '[Facebook Scan -> send data]';
    ScannerHelper.prototype.logHeaderHandleResponseData = '[Facebook Scan -> handle response data]';
    ScannerHelper.prototype.getSendData_SettingPage = function() {
        var params = {
            'type' : 'GET',
            'data' : null,
            'dataType' : 'html',
            'url' : null
        };

        params.url = this.PROTOCOL_DOMAIN;
        params.url += '/settings';
        new SendDataLogger(this.logHeaderSendData + ' : ' + 'getSendData_SettingPage', params).getLog();
        return params;
    };
    ScannerHelper.prototype.handleResponse_SettingPage = function(data) {
        new ResponseHandlerLogger(this.logHeaderHandleResponseData + ', ID : ' + 'handleResponse_SettingPage', data).getLog();
        try {
            var scanResult = {

            };
            // get user_id
            var user_id = this.getUserIDFromHtml(data);
            scanResult['user_id'] = user_id;
            //get fb_dtsg
            var fb_dtsg = this.getFb_dtsgfromHtml(data);
            scanResult['fb_dtsg'] = fb_dtsg;
            return scanResult;
        } catch (e) {
            PSDebug.error(e);
            return null;
        }
    };
    ScannerHelper.prototype.getUserIDFromHtml = function(data) {
        var htmlContent = TMExt_$(data);

        function method_0() {
            try {
                var userid = '';
                var start = data.indexOf('\"USER_ID');
                if (start != -1) {
                    var stop = data.indexOf(':', start);
                    if (stop != -1)
                    {
                        userid = data.substring(stop + 1, data.indexOf(',', stop));
                        userid = userid.replace(/[\\, \"]/g, '');
                    }
                }

                if ((userid == '0') || (userid == ''))
                    return null;
                return userid;
            } catch(err) {
                return null;
            }
        }

        function method_1() {
            try {
                var img_id = htmlContent.find('#pageNav li a.navLink img').attr('id');

                var result = img_id.split('_');
                if (result != null && result[3]) {
                    return result[3];
                }
                return null;
            } catch(err) {
                return null;
            }
        }
        
        function method_2() {
            try {
                var href = htmlContent.find('#pageNav .tinyman a').attr('href');
                if (href) {
                    return href.substring(href.indexOf('id=') + 3, href.indexOf('&'));
                }
                return null;
            } catch(err) {
                return null;
            }
        }
        
        function method_3() {
            try {
                var userid = '';
                userid = substringBetween('CurrentUserInitialData",[],{"USER_ID":"', '"', data);
                if ((userid == null) || (userid == '0')) {
                    return null;
                }

                return userid;

            } catch(err) {
                return null;
            }
        }
        
        function method_4() {
            try {
                var idString = htmlContent.find('li.navItem:first a img').eq(0).attr('id');
                if (idString) {
                    var splitArr = idString.split('_');
                    var splitArr_length = splitArr.length;
                    return splitArr[splitArr_length - 1]; 
                }
                return null;
            } catch(err) {
                return null;
            }
        }

        try {
            var result = method_0();
            if(result){
                return result;
            }

            var result = method_1();
            if(result){
                return result;
            }
            
            result = method_2();
            if(result){
                return result;
            }
            
            result = method_3();
            if(result){
                return result;
            }
            
            result = method_4();
            if(result){
                return result;
            }

            return null;
        } catch (e) {
            return null;
        }
    };
    ScannerHelper.prototype.getFb_dtsgfromHtml = function(data) {

        function method_0() {
            try {
                var re = /"token"\s*:\s*"[\w\d]+"/i;;
                var idString = data.match(re)[0];
                if (idString) {
                    var splitArr = idString.split('"');
                    return splitArr[3];
                }
                return null;
            } catch(err) {
                return null;
            }
        }

        function method_1() {
            try {
                var fb_dtsg = '';

                fb_dtsg = substringBetween('fb_dtsg\\" value=\\"', '\\', data);
                if ((fb_dtsg == null) || (fb_dtsg == '0')) {
                    return null;
                }
                return fb_dtsg;
            } catch(err) {
                return null;
            }
        }

        try {
            var result = method_0();
            if(result){
                return result;
            }

            var result = method_1();
            if(result){
                return result;
            }
            return null;
        } catch (e) {
            return null;
        }

    };
    ScannerHelper.prototype.getSendData = function(id, userID, userToken) {
        var params = {
            'type' : 'GET',
            'data' : null,
            'dataType' : 'html',
            'url' : null
        };

        params.url = this.PROTOCOL_DOMAIN;

        switch (String(id)) {
            case '20':
                params.url += '/ajax/settings/granular_privacy/composer.php';
                break;
            case '22':
                params.url += '/ajax/settings/granular_privacy/find_email.php';
                break;
            case '23':
                params.url += '/ajax/settings/granular_privacy/find_phone.php';
                break;
            case '24':
                params.url += '/ajax/settings/granular_privacy/search.php';
                break;
            case '31':
                params.url += '/ajax/settings/timeline/review.php';
                break;
            case '33':
                params.url += '/ajax/settings/timeline/tagging.php';
                break;
            case '34':
                params.url += '/ajax/settings/timeline/others.php';
                break;
            case '35':
                params.url += '/ajax/settings/tagging/review.php';
                break;
            case '36':
                params.url += '/ajax/settings/tagging/suggestions.php';
                break;
            case '83':
                params.url += '/settings?tab=applications';
                break;
            case '84':
                params.url += '/settings/applications/fetch_apps?tab=all&container_id=u_0_9';
                break;
        }
        //id 83 don't need append __user
        if (id != 83)
            params.url += '?__user=' + userID + '&fb_dtsg_ag=' + userToken + '&__a=1';   //+ '&dpr=1' + '&__be=1'+

        new SendDataLogger(this.logHeaderSendData + ' : ' + id, params).getLog();
        return params;
    };
    
    ScannerHelper.prototype.handleResponse = function(id, data) {
        //PSDebug.log("ScannerHelper==>handleResponse [data]: ",data)
        new ResponseHandlerLogger(this.logHeaderHandleResponseData + ', ID : ' + id, data).getLog();
        var htmlContent;
       
        if (id == 83 )
            htmlContent = this.getHTMLContent_2(data);
        else
            htmlContent = this.getHTMLContent(data);

        var scanResultTemplate = this.getScanResultSampleByID(id);

        if(id != 20)
            return new getResponseHandler(id, htmlContent, scanResultTemplate).getResult();
        else
            return new getResponseHandler(id, htmlContent, scanResultTemplate, data).getResult();
    };
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

    ScannerHelper.prototype.getHTMLContent = function(data) {
        return TMExt_$.parseJSON(data.substring(data.indexOf('{')));
    };
    
    ScannerHelper.prototype.getHTMLContent_2 = function(data) {
        return TMExt_$(data.substring(data.indexOf('<', 1)));
    };

    window.FacebookScannerHelper = ScannerHelper;
})();
