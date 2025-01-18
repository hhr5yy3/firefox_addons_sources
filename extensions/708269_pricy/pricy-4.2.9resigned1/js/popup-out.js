(function () {
    var CurrentUrlService = function () {
        var getUrl = function () {
            return new Promise(function (resolve, reject) {
                if (chrome.tabs) {
                    chrome.tabs.query({
                        currentWindow: true,
                        active: true
                    }, function (tabs) {
                        resolve(tabs[0].url);
                    });
                } else {
                    resolve(window.location.href);
                }
            });
        };
        var getTitle = function () {
            return new Promise(function (resolve, reject) {
                if (chrome.tabs) {
                    chrome.tabs.query({
                        currentWindow: true,
                        active: true
                    }, function (tabs) {
                        resolve(tabs[0].title);
                    });
                } else {
                    resolve(document.title);
                }
            });
        };

        return {
            getUrl: getUrl,
            getTitle: getTitle
        };
    }();

    window.pricy = {};
    window.pricy.loadContent = function () {
        document.getElementById("pricy-iframe").onload = function () {
            var $iframe = $(this);
            $("#pricy-loading-icon").fadeOut("fast", function () {
                $iframe.fadeIn("fast");
            });
        };

        CurrentUrlService.getUrl().then(function (currentUrl) {
            CurrentUrlService.getTitle().then(function (title) {
                var host = "https://www.pricy.ro";
                var path = `${host}/extensionhtml`;
                var version = chrome.runtime.getManifest().version;
                var browser = 'Firefox';
                var queryString = `url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(title)}&v=${version}-${browser}`;
                var url = `${path}?${queryString}`;

                $("#pricy-iframe").attr('src', url);
            });
        });
    };
})();
$(function() {
    window.pricy.loadContent();
});