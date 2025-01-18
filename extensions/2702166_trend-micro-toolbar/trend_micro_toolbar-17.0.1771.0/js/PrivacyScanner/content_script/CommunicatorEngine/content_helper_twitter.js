(function() {

    window.Scanner = new TwitterPScanner(false);
    window.Fixer = new TwitterPFixer(false);

    var trigger = function () {
        if (document.readyState === 'complete' ||
            document.readyState === 'interactive' ||
            typeof (window.browser) === 'undefined' ||
            typeof (window.InitialPrivacyScanner) === 'undefined') {
            const id = 'ContentPage_Background_TWITTER';
            window.InitialPrivacyScanner(id);
        } else {
            setTimeout(trigger, 500);
        }
    };
    trigger();
})();
