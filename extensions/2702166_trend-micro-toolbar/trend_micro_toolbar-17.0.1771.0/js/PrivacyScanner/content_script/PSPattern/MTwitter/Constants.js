(function () {
    'use strict';
    var ScanResultsTemplate = [
        {
            Website: 'MTWITTER',
            ID: 10,
            Risk: [1], // 0 means unchecked
            PossibleValue: {
                0: null,
                1: null
            },
            possibleFixValue: [0, 1],
            Suggestion: 0,
            Category: 'Display_media_that_may_contain_sensitive_content'
            // Description: 'Display media that may contain sensitive content'
        },
        {
            Website: 'MTWITTER',
            ID: 11,
            Risk: [0], // 0 means unchecked
            PossibleValue: {
                0: null,
                1: null
            },
            possibleFixValue: [0, 1],
            Suggestion: 1,
            Category: 'People_can_see_your_personal_info'
            // Description: 'Protect my tweets'
        },
        {
            Website: 'MTWITTER',
            ID: 12,
            Risk: [1], // 0 means unchecked
            PossibleValue: {
                0: null,
                1: null
            },
            possibleFixValue: [0, 1],
            Suggestion: 0,
            Category: 'Strangers_can_easily_track_you'
            // Description: 'Let others find me by my email address'
        },
        {
            Website: 'MTWITTER',
            ID: 13,
            Risk: [1], // 0 means unchecked
            PossibleValue: {
                0: null,
                1: null
            },
            possibleFixValue: [0, 1],
            Suggestion: 0,
            Category: 'People_can_see_your_personal_info'
            // Description: 'Let others find me by my phone number'
        },
        {
            Website: 'MTWITTER',
            ID: 14,
            Risk: [1], // 0 means unchecked
            PossibleValue: {
                0: null,
                1: null
            },
            possibleFixValue: [0, 1],
            Suggestion: 0,
            Category: 'People_can_see_where_you_were'
            // Description: 'Add location information to my Tweets'
        },
        {
            Website: 'MTWITTER',
            ID: 15,
            Risk: [1], // 0 means unchecked
            PossibleValue: {
                0: null,
                1: null
            },
            possibleFixValue: [0, 1],
            Suggestion: 0,
            Category: 'Advertizers_can_learn_more_about_you'
            // Description: 'Advertizers'
        }
    ];

    window.MTwitterScanResultsTemplate = ScanResultsTemplate;

    var FixResultsTemplate = {
        'id': null,
        'value': null,
        'data': null
    };

    window.MTwitterFixResultsTemplate = FixResultsTemplate;

    window.MTPScanSingleResponse = 'MTPScanSingleResponse';
    window.MTPScanResponse = 'MTPScanResponse';
    window.MTPFixResponse = 'MTPFixResponse';

    window.MTPFixSingleResponse = 'MTPFixSingleResponse';
})();
