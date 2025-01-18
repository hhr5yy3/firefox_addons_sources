(function() {

    window.Scanner = new LinkedinPScanner();
    window.Fixer = new LinkedinPFixer();

    var trigger = function () {
        if (document.readyState === 'complete' ||
            document.readyState === 'interactive' ||
            typeof (window.browser) === 'undefined' ||
            typeof (window.InitialPrivacyScanner) === 'undefined') {
            var id = 'ContentPage_Background_LINKEDIN';
            window.InitialPrivacyScanner(id);
        } else {
            setTimeout(trigger, 500);
        }
    };
    trigger();
})();
