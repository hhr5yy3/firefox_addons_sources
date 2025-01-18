(function() {

    window.Scanner = new FacebookPScanner();
    window.Fixer = new FacebookPFixer();

    var trigger = function() {
        if (document.readyState === 'complete' ||
            document.readyState === 'interactive' ||
            typeof (window.browser) === 'undefined' ||
            typeof (window.InitialPrivacyScanner) === 'undefined') {
            var id = 'ContentPage_Background_FACEBOOK';
            window.InitialPrivacyScanner(id);
        } else {
            setTimeout(trigger, 500);
        }
    };
    trigger();
})();
