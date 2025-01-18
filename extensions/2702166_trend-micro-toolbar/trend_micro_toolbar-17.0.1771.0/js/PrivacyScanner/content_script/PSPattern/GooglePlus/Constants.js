(function() {'use strict';
    
    window.GOOGLEPLUS_TIMEOUT_LOAD_COMPLETE = 4000;
    window.GOOGLEPLUS_TIME_INTERVAL_CHECK_LOAD_COMPLETE = 500;
    window.GOOGLEPLUS_WAITING_BEFORE_REAL_SCAN = 500;
    
    var ScanResultsTemplate = [{
        Website: 'GOOGLEPLUS',
        ID: 11,
        Risk: [1], // 0 means unchecked
        PossibleValue: {
            0 : null,
            1 : null
        },
        // Description: 'Show photo geo location information in newly uploaded albums and photos'
        possibleFixValue: [0, 1],
        Suggestion: 0,
        Category: 'People_can_see_where_you_were'
    }, {
        Website: 'GOOGLEPLUS',
        ID: 12,
        Risk: [1], // 0 means unchecked
        PossibleValue: {
            0 : null,
            1 : null
        },
        possibleFixValue: [0, 1],
        Suggestion: 0,
        Category: 'People_can_download_your_photos'
        // Description: 'Allow viewers to download my photos'
    }, {
        Website: 'GOOGLEPLUS',
        ID: 13,
        Risk: [0], // 0 means unchecked
        PossibleValue: {
            0 : null,
            1 : null
        },
        possibleFixValue: [0, 1],
        Suggestion: 1,
        Category: 'People_can_see_your_personal_info'
        // Description: 'Not share my photos in google products.'
    },{
        Website: 'GOOGLEPLUS',
        ID: 21,
        Risk: [1], // 0 means unchecked
        PossibleValue: {
            0 : null,
            1 : null
        },
        possibleFixValue: [0, 1],
        Suggestion: 0,
        Category: 'People_can_see_your_personal_info'
        // Description: 'Based upon my activity, Google may show my name and profile photo in shared endorsements that appear in ads.'
    }, {
        Website: 'GOOGLEPLUS',
        ID: 31,
        Risk: [1], // 0 means unchecked
        PossibleValue: {
            0 : null,
            1 : null
        },
        possibleFixValue: [0, 1],
        Suggestion: 0,
        Category: 'People_can_see_your_personal_info'
        // Show your Google+ communities posts on the Posts tab of your Google+ profile'
    }];

    window.GooglePlusScanResultsTemplate = ScanResultsTemplate;

    var FixResultsTemplate = {
        'id' : null,
        'value' : null,
        'data' : null
    };

    window.GooglePlusFixResultsTemplate = FixResultsTemplate;

    window.GPPScanSingleResponse = 'GPPScanSingleResponse';
    window.GPPScanResponse = 'GPPScanResponse';

    window.GPPFixSingleResponse = 'GPPFixSingleResponse';
})();
