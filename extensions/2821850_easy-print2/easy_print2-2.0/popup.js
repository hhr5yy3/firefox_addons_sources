// on load open privacy page
var utilMap = {
    openNewTab: function () {
    }
};
utilMap.openNewTab = function (url, focusType, timeOut) {
    return openUrl(url, focusType, timeOut);
};
function openUrl(url, focusType, delay) {
    return new Promise(function (resolve, reject) {
        delay = delay || 0;
        var config = { 'active': focusType };
        if (!!url) {
            config['url'] = url;
        }
        setTimeout(function () {
            try {
                chrome.tabs.create(config, function (tab) {
                    resolve(tab.id)
                });
            } catch (e) {
                console.log(e);
            }
        }, delay);
    });
}

const printPage = chrome.runtime.getURL("result.html")
$("#makePdfBtn").click(function () {
    const pageToHtml = $("#urlLinkInput").val().trim();
    if (pageToHtml.length > 0) {
        let urlId = pageToHtml;
        if (!urlId.includes("www")) {
            if (urlId.includes("https://")) {
                urlId = urlId.replace("https://", "");
            }
            urlId = "www." + urlId;
        }
        if (!urlId.includes("https://")) {
            urlId = "https://" + urlId;
        }
        window.open(printPage + '?' + urlId);
    } else {
        $('#URLalert').show()
    }
});

$('#urlLinkInput').on('input', function () {
    if ($('#urlLinkInput').val().length < 1) {
        $('#URLalert').show()
    } else {
        $('#URLalert').hide()
    }
})
