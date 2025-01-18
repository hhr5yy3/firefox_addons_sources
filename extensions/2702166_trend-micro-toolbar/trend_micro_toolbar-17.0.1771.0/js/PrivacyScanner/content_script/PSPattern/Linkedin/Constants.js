(function() {'use strict';

    var ScanResultsTemplate = [{
        Website: 'LINKEDIN',
        ID: 12,
        Risk: [1], // 0 means unchecked
        PossibleValue: {
            0 : null,
            1 : null
        },
        possibleFixValue: [0, 1],
        Suggestion: 0,
        Category: 'Advertizers_can_learn_more_about_you'
        // Description: 'Advertising Pref'
    }];

    window.LinkedinScanResultsTemplate = ScanResultsTemplate;
    
    var FixResultsTemplate = {
        'id' : null,
        'value' : null,
        'data' : null
    };

    window.LinkedinFixResultsTemplate = FixResultsTemplate;

    window.LIPScanSingleResponse = 'LIPScanSingleResponse';
    window.LIPScanResponse = 'LIPScanResponse';
    window.LIPFixSingleResponse = 'LIPFixSingleResponse';    
})();
