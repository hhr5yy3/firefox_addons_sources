(function() {

    window.Scanner = new GooglePlusPScanner();
    window.Fixer = new GooglePlusPFixer();

    var trigger = function () {
        if (document.readyState === 'complete' ||
            document.readyState === 'interactive' ||
            typeof (window.browser) === 'undefined' ||
            typeof (window.InitialPrivacyScanner) === 'undefined') {
            var id = 'ContentPage_Background_GOOGLEPLUS';
            window.InitialPrivacyScanner(id);
        } else {
            setTimeout(trigger, 500);
        }
    };
    trigger();
})();
