(function () {
    'use strict';
    var Scanner = new MTwitterPScanner();

    var FixResultsTemplate = MTwitterScanResultsTemplate;

    var FixHelper = function () {
        this.PROTOCOL_DOMAIN = window.location.protocol + '//' + window.location.host;
    };

    FixHelper.prototype.logHeaderSendData = '[MTwitter Fix -> send data]';
    FixHelper.prototype.logHeaderHandleResponseData = '[MTwitter Fix -> handle response data]';

    var checkboxClassName = "rn-1ei5mc7";
    var titleClassName = "rn-q42fyq rn-qvutc0";
    var descClassName = "rn-q42fyq rn-qvutc0";
    var secondaryMenu = "_20OFrCPI";
    var backMenuTag = "_13Jmyrbo rn-1oszu61";
    var indexForCheckbox = {
        "10": 3,
        "11": 0,
        "12": 0,    // in settings/contacts/ page
        "13": 1,    // in settings/contacts/ page
        "14": 0,    // in settings/location/ page
        "15": 1     // in settings/account/personalization page
    };
    var indexForTitle = {
        "10": 9,
        "11": 0,
        "12": 0,
        "13": 1,
        "14": 0,
        "15": 1
    };
    var indexForDesc = {
        "11": 1,
        "15": 2
    };
    var indexForSecondaryMenu = {
        "12": 2,
        "13": 2,
        "14": 0,
        "15": 6
    };

    FixHelper.prototype.performFix = function (id) {
        /*
         * Home setting url is settings/safety
         */

        var returnResult = {};
        returnResult['fixResult'] = [];
        returnResult['fixResult_incomplete'] = false;

        try {

            switch (String(id)) {

                case '10':  // ID 10: Display media that may contain sensitive content
                    var protect_my_tweet = this.getFixResultSampleByID('10');
                    protect_my_tweet['Current'] = document.getElementsByClassName(checkboxClassName)[indexForCheckbox["10"]].checked ? 1 : 0;
                    protect_my_tweet['Title'] = document.getElementsByClassName(titleClassName)[indexForTitle["10"]].innerText;
                    protect_my_tweet['Desc'] = "";
                    if (protect_my_tweet['Current'] == FixResultsTemplate[parseInt(id)-10]["Suggestion"]) {
                        protect_my_tweet['Status'] = "nothing to fix";
                    } else {
                        document.getElementsByClassName(checkboxClassName)[indexForCheckbox["10"]].click();
                        protect_my_tweet['Current'] = document.getElementsByClassName(checkboxClassName)[indexForCheckbox["10"]].checked ? 1 : 0;
                        protect_my_tweet['Status'] = "fixed";
                    }
                    returnResult['fixResult'].push(protect_my_tweet);
                    break;


                case '11':  // ID 11: Protect my tweets
                    var protect_my_tweet = this.getFixResultSampleByID('11');
                    protect_my_tweet['Current'] = document.getElementsByClassName(checkboxClassName)[indexForCheckbox["11"]].checked ? 1 : 0;
                    protect_my_tweet['Title'] = document.getElementsByClassName(titleClassName)[indexForTitle["11"]].innerText;
                    protect_my_tweet['Desc'] = document.getElementsByClassName(descClassName)[indexForDesc["11"]].innerText;
                    if (protect_my_tweet['Current'] == FixResultsTemplate[parseInt(id)-10]["Suggestion"]) {
                        protect_my_tweet['Status'] = "nothing to fix";
                    } else {
                        document.getElementsByClassName(checkboxClassName)[indexForCheckbox["11"]].click();
                        protect_my_tweet['Current'] = document.getElementsByClassName(checkboxClassName)[indexForCheckbox["11"]].checked ? 1 : 0;
                        protect_my_tweet['Status'] = "fixed";
                    }
                    returnResult['fixResult'].push(protect_my_tweet);
                    break;


                case '12':  // ID 12: Let others find me by my email address
                    var protect_my_tweet = this.getFixResultSampleByID('12');

                    /* Goto settings/contacts/ page */
                    //document.getElementsByClassName(secondaryMenu)[
                    //    indexForSecondaryMenu['12']].click();

                    protect_my_tweet['Current'] = document.getElementsByClassName(checkboxClassName)[indexForCheckbox["12"]].checked ? 1 : 0;
                    protect_my_tweet['Title'] = document.getElementsByClassName(titleClassName)[indexForTitle["12"]].innerText;
                    protect_my_tweet['Desc'] = "";
                    if (protect_my_tweet['Current'] == FixResultsTemplate[parseInt(id)-10]["Suggestion"]) {
                        protect_my_tweet['Status'] = "nothing to fix";
                    } else {
                        document.getElementsByClassName(checkboxClassName)[indexForCheckbox["12"]].click();
                        protect_my_tweet['Current'] = document.getElementsByClassName(checkboxClassName)[indexForCheckbox["12"]].checked ? 1 : 0;
                        protect_my_tweet['Status'] = "fixed";
                    }

                    /* Back to settings/safety/ page */
                    document.getElementsByClassName(backMenuTag)[0].click();
                    returnResult['fixResult'].push(protect_my_tweet);
                    break;


                case '13': // ID 13: Let others find me by my phone number
                    var protect_my_tweet = this.getFixResultSampleByID('13');

                    /* Goto settings/contacts/ page */
                    //document.getElementsByClassName(secondaryMenu)[
                     //   indexForSecondaryMenu['13']].click();

                    protect_my_tweet['Current'] = document.getElementsByClassName(checkboxClassName)[indexForCheckbox["13"]].checked ? 1 : 0;
                    protect_my_tweet['Title'] = document.getElementsByClassName(titleClassName)[indexForTitle["13"]].innerText;
                    protect_my_tweet['Desc'] = "";
                    if (protect_my_tweet['Current'] == FixResultsTemplate[parseInt(id)-10]["Suggestion"]) {
                        protect_my_tweet['Status'] = "nothing to fix";
                    } else {
                        document.getElementsByClassName(checkboxClassName)[indexForCheckbox["13"]].click();
                        protect_my_tweet['Current'] = document.getElementsByClassName(checkboxClassName)[indexForCheckbox["13"]].checked ? 1 : 0;
                        protect_my_tweet['Status'] = "fixed";
                    }

                    /* Back to settings/safety/ page */
                    document.getElementsByClassName(backMenuTag)[0].click();
                    returnResult['fixResult'].push(protect_my_tweet);
                    break;


                case '14':  // ID 14: Add location information to my Tweets
                    var protect_my_tweet = this.getFixResultSampleByID('14');

                    /* Goto settings/location/ page */
                    //document.getElementsByClassName(secondaryMenu)[
                    //    indexForSecondaryMenu['14']].click();

                    protect_my_tweet['Current'] = document.getElementsByClassName(checkboxClassName)[indexForCheckbox["14"]].checked ? 1 : 0;
                    protect_my_tweet['Title'] = document.getElementsByClassName(titleClassName)[indexForTitle["14"]].innerText;
                    protect_my_tweet['Desc'] = "";
                    if (protect_my_tweet['Current'] == FixResultsTemplate[parseInt(id)-10]["Suggestion"]) {
                        protect_my_tweet['Status'] = "nothing to fix";
                    } else {
                        document.getElementsByClassName(checkboxClassName)[indexForCheckbox["14"]].click();
                        protect_my_tweet['Current'] = document.getElementsByClassName(checkboxClassName)[indexForCheckbox["14"]].checked ? 1 : 0;
                        protect_my_tweet['Status'] = "fixed";
                    }

                    /* Back to settings/safety/ page */
                    document.getElementsByClassName(backMenuTag)[0].click();
                    returnResult['fixResult'].push(protect_my_tweet);
                    break;


                case '15':  // ID 15: Personalize ads
                    var protect_my_tweet = this.getFixResultSampleByID('15');

                    /* Goto settings/account/personalization page */
                    //document.getElementsByClassName(secondaryMenu)[
                    //    indexForSecondaryMenu['15']].click();

                    protect_my_tweet['Current'] = document.getElementsByClassName(checkboxClassName)[indexForCheckbox["15"]].checked ? 1 : 0;
                    protect_my_tweet['Title'] = document.getElementsByClassName(titleClassName)[indexForTitle["15"]].innerText;
                    protect_my_tweet['Desc'] = document.getElementsByClassName(descClassName)[indexForDesc["15"]].innerText;
                    if (protect_my_tweet['Current'] == FixResultsTemplate[parseInt(id)-10]["Suggestion"]) {
                        protect_my_tweet['Status'] = "nothing to fix";
                    } else {
                        document.getElementsByClassName(checkboxClassName)[indexForCheckbox["15"]].click();
                        protect_my_tweet['Current'] = document.getElementsByClassName(checkboxClassName)[indexForCheckbox["15"]].checked ? 1 : 0;
                        protect_my_tweet['Status'] = "fixed";
                    }

                    /* Back to settings/safety/ page */
                    document.getElementsByClassName(backMenuTag)[0].click();
                    returnResult['fixResult'].push(protect_my_tweet);
                    break;
            }
            return returnResult;

        } catch (e) {
            PSDebug.error(e);
            returnResult['fixResult_incomplete'] = true;
        }
        return returnResult;
    };

    FixHelper.prototype.getAllvalidID = function () {
        var allValidID = [];
        for (var i = 0; i < FixResultsTemplate.length; i++) {
            allValidID.push(FixResultsTemplate[i]['ID']);
        }
        return allValidID;
    };

    FixHelper.prototype.isValidID = function (id) {
        var allValidID = this.getAllvalidID();
        for (var i = 0; i < allValidID.length; i++) {
            if (id == allValidID[i]) {
                return true;
            }
        }
        return false;
    };

    FixHelper.prototype.getFixResultSampleByID = function (id) {
        for (var i = 0; i < FixResultsTemplate.length; i++) {
            if (FixResultsTemplate[i]['ID'] == id) {
                return PUtil.cloneObj(FixResultsTemplate[i]);
            }
        }
    };

    window.MTwitterFixHelper = FixHelper;
})();
