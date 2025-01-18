(function() {'use strict';
    window.TWITTER_TIMEOUT_LOAD_COMPLETE = 2000;
    window.TWITTER_TIME_INTERVAL_CHECK_LOAD_COMPLETE = 500;
    window.TWITTER_WAITING_BEFORE_REAL_SCAN = 500;
    
    var ScanResultsTemplate = [{
        Website: 'TWITTER',
        ID: 11,
        Risk: [0], // 0 means unchecked
        PossibleValue: {
            0 : null,
            1 : null
        },
        possibleFixValue: [0, 1],
        Suggestion: 1,
        Category: 'People_can_see_your_personal_info'
        // Description: 'Protect my Tweets'
    }, {
        Website: 'TWITTER',
        ID: 12,
        Risk: [1], // 0 means unchecked
        PossibleValue: {
            0 : null,
            1 : null
        },
        possibleFixValue: [0, 1],
        Suggestion: 0,
        Category: 'Strangers_can_easily_track_you'
        // Description: 'Let others find me by my email address'
    }, {
        Website: 'TWITTER',
        ID: 13,
        Risk: [1], // 0 means unchecked
        PossibleValue: {
            0 : null,
            1 : null
        },
        possibleFixValue: [0, 1],
        Suggestion: 0,
        Category: 'Strangers_can_easily_track_you'
        // Description: 'Let others find me by my phone number'
    }, {
        Website: 'TWITTER',
        ID: 14,
        Risk: [1], // 0 means unchecked
        PossibleValue: {
            0 : null,
            1 : null
        },
        possibleFixValue: [0, 1],
        Suggestion: 0,
        Category: 'People_can_see_where_you_were'
        // Description: 'Add a location to my Tweets'
    }, {
        Website: 'TWITTER',
        ID: 16,
        Risk: [0],
        possibleFixValue: [0, 1, 2],
        Suggestion: 2,
        Category: 'You_can_be_tagged_without_your_permission'
        // Description: 'Photo tagging'
    }];

    window.TwitterScanResultsTemplate = ScanResultsTemplate;

    var FixResultsTemplate = {
        'id' : null,
        'value' : null,
        'data' : null
    };

    window.TwitterFixResultsTemplate = FixResultsTemplate;

    window.TPScanSingleResponse = 'TPScanSingleResponse';
    window.TPScanResponse = 'TPScanResponse';

    window.TPFixSingleResponse = 'TPFixSingleResponse';
    window.TPClickSaveResponse = 'TPClickSaveResponse';
})();
