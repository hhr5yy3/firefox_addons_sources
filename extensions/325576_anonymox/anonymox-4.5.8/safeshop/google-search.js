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


const ssLogo = browser.runtime.getURL('resources/logo.png')

function injectBadge($eleToAttach, domain, affLink) {
    var ssBadge = `<a title="This site was verified by SafeShop" class="no-style-link ss-link ss-verified-badge" data-domain="${domain}" data-href="${affLink}">
                        <img src="${ssLogo}"><span>Safeshop Verified</span>
                    </a>`

   $eleToAttach.before(ssBadge);
}

function scan(ssData) {
    $('a[jsname="UWckNb"]').each(function() {
        var href = $(this).attr('href')
        var domain = new URL(href).hostname.replace('www.', '')
        if(ssData[domain] && ssData[domain].verified) {
            var $nearestParentDiv = $(this).closest('div[jscontroller="SC7lYd"]');
            if ($nearestParentDiv.length && !$nearestParentDiv.prev().is('.ss-verified-badge')) {
                var affLink = ssData[domain].skimlink + `&url=${encodeURIComponent(href)}`
                $(this).attr('data-href', affLink).attr('data-domain', domain).addClass('ss-link')
                $(this).on('click', handleSSLinkClick)
                injectBadge($nearestParentDiv, domain, affLink)
            }
        }
    });
}

function createResultObserver(ssData) {
    setInterval(() => {
        scan(ssData)
    }, 500);
}

function handleSSLinkClick(e) {
    e.preventDefault();
    e.stopPropagation();

    var thisLink = $(this);
    browser.storage.local.get("approvedList", function(data) {
        var approvedList = data.approvedList || {};
        var domain = thisLink.attr("data-domain");
        var href = thisLink.attr("data-href");

        approvedList[domain] = true;

        browser.storage.local.set({'approvedList': approvedList}, function() {
            window.location.href = href;
        });
    });
}

function initEvents() {
    $(document).on('click', '.ss-link', handleSSLinkClick)
}

function app() {
    browser.storage.local.get(["ssData"], function(data) {
        var ssData = data.ssData;
        if (ssData) {
            initEvents()
            createResultObserver(ssData)
        }
    });
}

browser.storage.local.get("premium").then(data => {
    if (data.premium) {
        browser.storage.local.get("activeSafeshop").then(result => {
            if (result.activeSafeshop) {
                app();
            }
        })
    } else {
        app();
    }
})