(function() {'use strict';

    var ScanResultsTemplate = [{
        Website: 'FACEBOOK',
        ID: 20,
        Risk: [0],
        ExpectedNumberOfPossibleValue : 3,
        possibleFixValue: [0, 1, 2],
        Suggestion: 1,
        Category: 'People_can_see_your_personal_info'
        // Description: 'Who can see your future posts?'
    }, {
        Website: 'FACEBOOK',
        ID: 22,
        Risk: [0, 1],
        ExpectedNumberOfPossibleValue : 3,
        possibleFixValue: [0, 1, 2],
        Suggestion: 2,
        Category: 'Strangers_can_easily_track_you'
        // Description: 'Who can look you up using the email address you provided?'
    }, {
        Website: 'FACEBOOK',
        ID: 23,
        Risk: [0, 1],
        ExpectedNumberOfPossibleValue : 3,
        possibleFixValue: [0, 1, 2],
        Suggestion: 2,
        Category: 'Strangers_can_easily_track_you'
        // Description: 'Who can look you up using the phone number you provided?'
    }, {
        Website: 'FACEBOOK',
        ID: 24,
        Risk: [1],
        possibleFixValue: [0, 1],
        Suggestion: 0,
        Category: 'Strangers_can_easily_track_you'
        // Description: 'Do you want search engines outside of Facebook to link to your profile?'
    }, {
        Website: 'FACEBOOK',
        ID: 31,
        Risk: [0],
        possibleFixValue: [0, 1],
        Suggestion: 1,
        Category: 'You_can_be_tagged_without_your_permission'
        // Description: 'Review posts you're tagged in before the post appears on your timeline?'
    }, {
        Website: 'FACEBOOK',
        ID: 33,
        Risk: [0, 1],
        ExpectedNumberOfPossibleValue : 4,
        possibleFixValue: [0, 1, 2, 3],
        Suggestion: 2,
        Category: 'People_can_see_your_personal_info'
        // Description: 'Who can see posts you\'ve been tagged in on your timeline'
    }, {
        Website: 'FACEBOOK',
        ID: 34,
        Risk: [0, 1],
        ExpectedNumberOfPossibleValue : 4,
        possibleFixValue: [0, 1, 2, 3],
        Suggestion: 2,
        Category: 'People_can_see_your_personal_info'
        // Description: 'Who can see what others post on your timeline'
    }, {
        Website: 'FACEBOOK',
        ID: 35,
        Risk: [0],
        possibleFixValue: [0, 1],
        Suggestion: 1,
        Category: 'People_can_see_your_personal_info'
        // Description: 'Review tags people add to your own posts before the tags appear on Facebook'
    }, 
    /*{
        Website: 'FACEBOOK',
        ID: 36,
        Risk: [0],
        possibleFixValue: [0, 1],
        Suggestion: 1,
        Category: 'You_can_be_tagged_without_your_permission'
        // Description: 'Who sees tag suggestions when photos that look like you are uploaded?'
    }, */
    /*{
        Website: 'FACEBOOK',
        ID: 83,
        Risk: [0, 1],
        ExpectedNumberOfPossibleValue : 5,
        possibleFixValue: [0, 1, 2, 3],
        Suggestion: 2,
        Category: 'People_can_see_your_personal_info'
        // Old versions of Facebook for mobile
    },{
        Website: 'FACEBOOK',
        ID: 84,
        Risk: [0, 1],
        possibleFixValue: [0, 1, 2],
        Suggestion: 2,
        html:"<div></div>",
        Category: 'Application_can_access_your_personal_info'
        // Description: 'Application can access your personal info'
    }*/];

    window.FacebookScanResultsTemplate = ScanResultsTemplate;

    var AppCurStateByImgClass = [
        "sx_eb672d",   //public    ori:  "sx_ba6dfd"
        "sx_78ff63",   //friends
        "sx_2d6aed"    //only me
    ];
    window.FacebookAppCurState = AppCurStateByImgClass;
    
    var FixResultsTemplate = {
        'id' : null,
        'value' : null,
        'data' : null
    };
    window.FacebookFixResultsTemplate = FixResultsTemplate;

    window.FPScanSingleResponse = 'FPScanSingleResponse';
    window.FPScanResponse = 'FPScanResponse';
    window.FPFixSingleResponse = 'FPFixSingleResponse';
})();
