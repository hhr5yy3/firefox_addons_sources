/*
* anonymoX client
*   for Firefox
*
* Author 	Nils Hügelmann	<nils.h@anonymox.net>
* Author 	Christian Otto	<chris.o@anonymox.net>
*
* www.anonymox.net
*
* License: CC BY-NC-ND 3.0, see LICENSE.TXT or http://creativecommons.org/licenses/by-nc-nd/3.0/
*
* Use at your own risk
*
* This is the released, uncommented version of the code.
*/


function initEvents() {
    $("#dismiss").on("click", function(event){
        window.parent.postMessage({
            'function': 'closeSafeshopModal',
        }, "*");
    });

    $("#go").on("click", function() {
        window.parent.postMessage({
            'function': 'loadAffLink',
        }, "*");
    })
}

function loadData() {
    var urlParams = new URLSearchParams(window.location.search);
    var domain = urlParams.get('domain') || ''
    var verified = urlParams.get('verified') || false
    var trusted = urlParams.get('trusted') || false
    var ssl = urlParams.get('ssl') || false
    $('.domain').text(domain)

    var domainlength = domain.toString().length
    if (domainlength > 12 && domainlength < 16){
        $('.domain').addClass('long-domain')
    } else if (domainlength >= 16 && domainlength <= 21) {
        $('.domain').addClass('superlong-domain')
    } else if (domainlength > 21) {
        $('.domain').addClass('tiny-text')
    }

    if (trusted) {
        $('.google.status').addClass('okay')
    } else {
        $('.google.status').addClass('not-okay')
    }
    if (verified) {
        $('.authentic.status').addClass('okay')
    } else {
        $('.authentic.status').addClass('not-okay')
    }
    if (ssl) {
        $('.ssl.status').addClass('okay')
    } else {
        $('.ssl.status').addClass('not-okay')
    }
}

function initApp() {
    initEvents();
    loadData();
}

initApp()