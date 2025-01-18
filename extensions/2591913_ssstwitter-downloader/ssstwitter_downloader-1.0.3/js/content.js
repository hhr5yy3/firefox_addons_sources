var SaveTweetVid = function () {
    console.log('[1] init fire');

    function checkIfUserIsOnTwitterWebsite() {
        return -1 != document.location.href.indexOf('twitter.com/') || -1 != document.location.href.indexOf('twitter.com/');
    }

    function openDownloadLink(link) {
        var decodedURI = decodeURIComponent(link);
        window.open('https://ssstwitter.com/results?id=' + decodedURI + '&utm_source=chrome&utm_medium=extension&utm_campaign=download_button', '_blank')
    }

    function insertDownloadLink() {
        console.log('[2] trying to find element...');
        // Old twitter
        if ($('.tweet').length) {
            $('.tweet[mark!=1]').each(function () {
                var u = $(this),
                    v = u.find('.AdaptiveMedia-videoContainer'),
                    w = u.find('.card-type-player'),
                    x = u.find('video');
                if (0 < v.length || 0 < w.length || 0 < x.length) {
                    var y = 'https://twitter.com' + u.attr('data-permalink-path'),
                        z = $('<div style="text-align: right; padding-top: 10px;margin-top: 10px;border-top: 1px solid #eee;"><a style="float: left; line-height: 34px; text-decoration: none;" target="_blank" href="https://ssstwitter.com">Click the button to save this video</a><a class="mbtn" style="display:inline-block; margin-right: 0px; font-size: 14px;font-weight: bold;padding: 9px 18px;border-radius: 100px; background-color: #34ca00; color: #FFF; box-sizing: border-box;text-decoration: none;" title="Download">Download</a></div>');
                    z.find('a.mbtn').click(function () {
                        openDownloadLink(y);
                    });
                    var A = u.find('.stream-item-footer');
                    A.after(z);
                }
            }).attr('mark', 1);
        }

        // New twitter
        if ($('article[role=article]').length) {
            $('article[role=article][mark!=1]').each(function () {
                var tweetContainer = $(this),
                    hasVideo = tweetContainer.find('video');
                console.log('[3] video element detect try... ' + hasVideo.length);
                if (hasVideo.length) {
                    console.log('[3] video element found!');
                    // Is it a single tweet? If so, full link can be taken from URI
                    var fullLinkToTweet = document.location.href;

                    // It is a list of tweets, full link is taken from link with certain class
                    if (fullLinkToTweet.indexOf("/status/") === -1) {
                        var linkFromTweetsList = tweetContainer.find('a.r-3s2u2q[role=link]');
                        fullLinkToTweet = 'https://twitter.com' + linkFromTweetsList.attr('href');
                    }

                    console.log('[4] link found: ' + fullLinkToTweet);

                    var downloadLink = $('<div style="text-align: right; padding-top: 10px;margin-top: 10px;border-top: 1px solid #eee;"><a style="float: left; line-height: 34px; text-decoration: none;" target="_blank" href="https://ssstwitter.com">Click the button to save this video</a><a class="mbtn" style="display:inline-block; margin-right: 0px; font-size: 14px;font-weight: bold;padding: 9px 18px;border-radius: 100px; background-color: #34ca00; color: #FFF; box-sizing: border-box;text-decoration: none;" title="Download">Download</a></div>');
                    downloadLink.find('a.mbtn').click(function () {
                        openDownloadLink(fullLinkToTweet);
                    });
                    var A = tweetContainer.find('.r-156q2ks').first();
                    A.after(downloadLink); // Inserts the link after ^ container with such class
                    tweetContainer.attr('mark', 1); // Check as marked only after download link was added
                }
            });
        }
    }

    function checkForDOMNodeToAppear() {
        chrome.storage.local.get('checker', function (s) {
            void 0 == s.checker && (s.checker = !0, chrome.storage.local.set({
                checker: !0
            })), checkIfUserIsOnTwitterWebsite() && s.checker && ($(document).bind('DOMNodeInserted', function () {
                clearTimeout(q), q = setTimeout(function () {
                    insertDownloadLink();
                }, 200);
            }), insertDownloadLink());
        });
    }
    var q;
    (function (s) {
        var u = document.createElement('a');
        return u.href = s, u;
    })(document.location.href), $(function () {
        checkForDOMNodeToAppear();
    });
}();