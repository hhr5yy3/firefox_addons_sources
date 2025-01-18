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


window.affiliateTag = "?tag=thegentlem0a9-20"

window.shortenedDomains = [
    "bit.ly",
    "tinyurl.com",
    "goo.gl",
    "t.co",
    "buff.ly",
    "ow.ly",
    "is.gd",
    "bl.ink",
    "shorte.st",
    "amzn.to",
    "urlgeni.us"
];

window.amazonDomains = [
    "amazon.ca",
    "amazon.fr",
    "amazon.de",
    "amazon.it",
    "amazon.nl",
    "amazon.pl",
    "amazon.es",
    "amazon.se",
    "amazon.co.uk",
    "amazon.com"
];

window.processedNodes = new Set();

function extractAmazonLinks(text) {
    var amazonDomainsPattern = window.amazonDomains
        .map(domain => domain.replace(/\./g, "\\."))
        .join("|");

    var amazonRegex = new RegExp(`https:\\/\\/www\\.(${amazonDomainsPattern})\\/[^\\/]+\\/dp\\/[A-Z0-9]+`, "gi");

    return text.match(amazonRegex) || [];
}

function addAmazonRequestRule(aglArticleLink, asin) {
    browser.runtime.sendMessage({
        message: 'addAmazonRequestRule',
        aglArticleLink: aglArticleLink,
        asin: asin,
        domain: window.domain
    })
}

function createAGLArticle(amazonLink) {
    browser.runtime.sendMessage({
        message: 'createAGLArticle',
        amazonLink: amazonLink
    })
}

function scanAmazonLinks() {
    window.amazonDomains.forEach(amzDomain => {
        $(`a[href^="https://www.${amzDomain}/"]`).each(function() {
            var link = $(this);
            if (!link.hasClass('amz-detected') && window.processedNodes.has(this) === false) {
                var href = link.attr('href');
                var extractedLink = extractAmazonLinks(href)
                if (extractedLink.length > 0) {
                    link.addClass('amz-detected');
                    var asin = extractedLink[0].split('/').pop()
                    var aglArticleLink = extractedLink[0].toLowerCase().replace(`www.${amzDomain}`, "agentlemanslifestyle.com").replace("\/dp\/", "-")
                    var affiliateLink = extractedLink[0] + window.affiliateTag
                    link.attr('href', affiliateLink)

                    addAmazonRequestRule(aglArticleLink, asin)

                    link.on("click", function (e) {
                        createAGLArticle(extractedLink[0])
                    })
                }
                window.processedNodes.add(this);
            }
        });
    });
}

function scanShortenedLinks() {
    window.shortenedDomains.forEach(function(domain) {
        $(`a[href*="${domain}/"]`).each(function() {
            var link = $(this);
            if (!link.hasClass('exposed-link')) {
                link.addClass('exposed-link');
                var href = link.attr('href');
                browser.runtime.sendMessage({
                    message: 'getFinalUrlFromShortenedLink',
                    shortenedLink: href
                }).then((realLink) => {

                    if (realLink) {
                        link.attr('href', realLink)
                    }
                })
            }
        })
    });
}

function scanningLinks() {
    scanAmazonLinks()
    scanShortenedLinks()
}

window.extractAmazonLinks = extractAmazonLinks
window.addAmazonRequestRule = addAmazonRequestRule
window.createAGLArticle = createAGLArticle

setInterval(scanningLinks, 1000);