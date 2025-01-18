/*
 * MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
 * MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
 * MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
 * MMMMMMMmddddddddddddddddddddddddddddddddddddddddddddmMMMMMMM
 * MMMMMMM:.++++++++++++++++++++++++++++++++++++++++++--MMMMMMM
 * MMMMMMM::MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM/-MMMMMMM
 * MMMMMMM-:MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM/-MMMMMMM
 * MMMMMMM-:MMMMMMMyyyyyyyyyyNMMMMMMNyyyyyyyyyyNMMMMMM/-MMMMMMM
 * MMMMMMM-:MMMMMMN`         +MMMMMMo          mMMMMMM/-MMMMMMM
 * MMMMMMM-:MMMMMMN          `mMMMMN.          NMMMMMM/-MMMMMMM
 * MMMMMMM-:MMMMMMN      `    +MMMMo    `      NMMMMMM/-MMMMMMM
 * MMMMMMM-:MMMMMMN      +    `mMMN`    +      NMMMMMM/-MMMMMMM
 * MMMMMMM-:MMMMMMN      y:    +MMo    -d      NMMMMMM/-MMMMMMM
 * MMMMMMM-:MMMMMMN      hh    `mm`    yd      NMMMMMM/-MMMMMMM
 * MMMMMMM-:MMMMMMN      hM:    /o    -Md      NMMMMMM/-MMMMMMM
 * MMMMMMM-:MMMMMMN      hMh    ``    hMd      NMMMMMM/-MMMMMMM
 * MMMMMMM-:MMMMMMN      hMM:        :MMd      NMMMMMM/-MMMMMMM
 * MMMMMMM-:MMMMMMN      hMMd        hMMd      NMMMMMM/-MMMMMMM
 * MMMMMMM-:MMMMMMN      hMMM:      :MMMd      NMMMMMM/-MMMMMMM
 * MMMMMMM-:MMMMMMN`     hMMMd`    `hMMMd     `NMMMMMM/-MMMMMMM
 * MMMMMMM-:MMMMMMMhhhhhhNMMMMhhhhhhMMMMNhhhhhhNMMMMMM/-MMMMMMM
 * MMMMMMM-:MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM/-MMMMMMM
 * MMMMMMM-:MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM/-MMMMMMM
 * MMMMMMM:.//////////////////////////////////////////.:MMMMMMM
 * MMMMMMMNmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmMMMMMMM
 * MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
 * MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
 * MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
 *
 * Developed by David Fernández (dfernandez@maldita.es) for MALDITA www.maldita.es
 * Version 2.0
 *
 */

var currentUrl;
var storage = chrome.storage.local;

/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
    // Query filter to be passed to chrome.tabs.query - see
    // https://developer.chrome.com/extensions/tabs#method-query
    var queryInfo = {
        active: true,
        currentWindow: true
    };

    chrome.tabs.query(queryInfo, function (tabs) {
        // chrome.tabs.query invokes the callback with a list of tabs that match the
        // query. When the popup is opened, there is certainly a window and at least
        // one tab, so we can safely assume that |tabs| is a non-empty array.
        // A window can only have one active tab at a time, so the array consists of
        // exactly one tab.
        var tab = tabs[0];

        // A tab is a plain object that provides information about the tab.
        // See https://developer.chrome.com/extensions/tabs#type-Tab
        var url = tab.url;

        // tab.url is only available if the "activeTab" permission is declared.
        // If you want to see the URL of other tabs (e.g. after removing active:true
        // from |queryInfo|), then the "tabs" permission is required to see their
        // "url" properties.
        console.assert(typeof url == 'string', 'tab.url should be a string');

        callback(url);
    });
}

/*
 Get the URL of the current tab. In case the extension is opened and the button is pressed, send a report to the website.
 */
document.addEventListener('DOMContentLoaded', function () {

    getCurrentTabUrl(function (url) {

        currentUrl = new URL(url);

        const domainName = document.getElementById("no-alerts-button");
        domainName.textContent = domainName.textContent.replace("{placeholder}", currentUrl.host.replace("www.", ""));

        const reportButton = document.getElementById('report');

        reportButton.addEventListener('click', function (e) {
            reportButton.className = "btn disabled";
            var description = DOMPurify.sanitize(document.getElementById('description').value);
            var title = DOMPurify.sanitize(document.getElementById('title').value);

            var request = new XMLHttpRequest();
            request.open("POST", "https://maldita.es/reports", false);

            var data = {
                "mb-title": title,
                "mb-content": description + "\n\n" + url,
            };

            request.onreadystatechange = function (e) {

                if (request.readyState == 4 && (request.status == 200 || request.status == 304)) {

                    reportButton.className = "btn btn-success disabled btn-block";
                    report.textContent = "¡Reporte enviado!";

                }
            };

            request.send(JSON.stringify(data));
        });
    });
});

$(document).ready(function () {


    $("#options-icon").on('click', function () {
        $(".content-default").slideUp();
        $("#options-icon").fadeOut();
        $(".content-options").fadeIn();
        $("#back-icon").fadeIn();
    });

    $("#back-icon").on('click', function () {
        $(".content-default").slideDown();
        $("#options-icon").fadeIn();
        $(".content-options").fadeOut();
        $("#back-icon").fadeOut();
    });

    $("#no-alerts-button").on('click', function () {

        var button = this;

        var dismissedSites = storage.get("dismissed", function (sites) {

            if (sites.dismissed === undefined)
                sites.dismissed = [currentUrl.host.replace("www.", "")];
            else
                sites.dismissed.push(currentUrl.host.replace("www.", ""));

            storage.set(sites);
            success(button);
        });
    });

    $("#all-alerts-button").on('click', function () {

        var button = this;

        var dismissedSites = storage.get("dismissed", function (sites) {
            sites.dismissed = [];
            storage.set(sites);
            success(button);
        });

    });
});

function success(button) {
    $(button).removeClass('btn-red');
    $(button).addClass('btn-success');
    setTimeout(
        function () {
            window.close();
        }, 1000);
}