(function() {'use strict';

    var ScanResultsTemplate = [{
        Website : 'MFACEBOOK',
        ID : 20,
        Risk : [0],
        // possibleFixValue --> it will be added into scan result after scan as different user has different possible fix value.
        Suggestion : 1,
        Category : 'People_can_see_your_personal_info'
        // URL --> it will be added into scan result after get all URL info
        
        // Description: 'Who can see your future posts?'
    }, {
        Website : 'MFACEBOOK',
        ID : 22,
        Risk : [0, 1],
        Suggestion : 2,
        Category : 'Strangers_can_easily_track_you'
        // Description: 'Who can look you up using the email address you provided?'
    }, {
        Website : 'MFACEBOOK',
        ID : 23,
        Risk : [0, 1],
        Suggestion : 2,
        Category : 'Strangers_can_easily_track_you'
        // Description: 'Who can look you up using the phone number you provided?'
    }, {
        Website : 'MFACEBOOK',
        ID : 24,
        Risk : [1],
        Suggestion : 0,
        Category : 'Strangers_can_easily_track_you'
        // Description: 'Let other search engines link to your timeline'
    }, {
        Website : 'MFACEBOOK',
        ID : 31,
        Risk : [1],
        Suggestion : 0,
        Category : 'You_can_be_tagged_without_your_permission'
        // Description: 'Review posts friends tag you in before they appear on your timeline'
    }, {
        Website : 'MFACEBOOK',
        ID : 33,
        Risk : [0, 1],
        Suggestion : 2,
        Category : 'People_can_see_your_personal_info'
        // Description: 'Who can see posts you\'ve been tagged in on your timeline'
    }, {
        Website : 'MFACEBOOK',
        ID : 34,
        Risk : [0, 1],
        Suggestion : 2,
        Category : 'People_can_see_your_personal_info'
        // Description: 'Who can see what others post on your timeline'
    }, {
        Website : 'MFACEBOOK',
        ID : 35,
        Risk : [1],
        Suggestion : 0,
        Category : 'People_can_see_your_personal_info'
        // Description: 'Review tags people add to your own posts before the tags appear on MFACEBOOK'
    }, {
        Website : 'MFACEBOOK',
        ID : 81,
        Risk : [1],
        Suggestion : 0,
        Category : 'People_outside_of_Facebook_can_see_your_info'
        // Description: 'Apps others use'
    }, {
        Website : 'MFACEBOOK',
        ID : 83,
        Risk : [0, 1],
        Suggestion : 2,
        Category : 'People_can_see_your_personal_info'
        // Old versions of MFACEBOOK for mobile
    }];

    window.MFacebookScanResultsTemplate = ScanResultsTemplate;
    
    window.M_getScanResultIndexByID = function(id) {
        for (var i = 0; i < ScanResultsTemplate.length; i++) {
            if (ScanResultsTemplate[i]['ID'] == id) {
                return i;
            }
        }
        return null;
    };    

    window.MFacebookFixResultsTemplate = {
        'id' : null,
        'value' : null,
        'data' : null
    };;

    window.MFPScanSingleResponse = 'MFPScanSingleResponse';
    window.MFPScanResponse = 'MFPScanResponse';
    window.MFPFixSingleResponse = 'MFPFixSingleResponse';
    
    /*
        URL related
    */
    window.URLList = {
        Privacy : "/privacy/touch/basic/",
        TimeLineAndTagging : "/privacy/touch/timeline_and_tagging/",
        Apps : "/privacy/touch/apps/"
    }
    
    /*
        User info
    */
    window.UserInfo = {
        userID : CookieUtil.get('c_user')
    }
})();
