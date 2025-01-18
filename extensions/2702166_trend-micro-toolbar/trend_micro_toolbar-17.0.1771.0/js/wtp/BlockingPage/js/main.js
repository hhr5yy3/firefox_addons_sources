(function (w, d) {
    "use strict";

    var $,
        lang = 'en-US',	// i18n.LanguageCode
        productName = 'Trend Micro Security',
        productShortName = '',
        l10nStr = {},
        categoryL10nStr = {},
        blockedURL = '',
        categoryTableID = '',
        wrsCategoryTableID = '',
        wtpRatingResult = '',
        wtpScore = 0,
        wtpWhitelist = [],
        iKBURLScam = '',
        iKBURLPhishing = '',
        iKBURLMalware = '',
        ratingType,
        scamList = ['2B'],
        phishingList = ['80'],
        malwareList = ['27', '28', '1E', '26', '25'];

    if (typeof $ === "undefined") {
        $ = function (selector) {
            switch (selector[0]) {
                case "#":
                    return d.getElementById(selector.substr(1));
                case ".":
                    if (d.getElementsByClassName) {
                        return d.getElementsByClassName(selector.substr(1));
                    } else {
                        return d.querySelectorAll(selector);
                    }
                    break;
                default:
                    return d.getElementsByTagName(selector);
            }
        };
    }

    if (typeof w.chrome === "undefined") {
        // debug mode
        var local = {
            data: {
                wtp_blocked_url: 'http://dev.dangerous.com',
                wtp_blocked_url_category: '0F',
                wtp_blocked_url_score: 50,
                wtp_whitelist: ['http://dev.xxx.com']
            },
            set(obj, func) {
                this.data = obj;
                if (func) {
                    func(this.data);
                }
            },
            get(obj, func) {
                if (func) {
                    func(this.data);
                }
                return this.data;
            }
        };
        w.chrome = {
            storage: {
                local
            }
        };
    }

    /*
    function loadJSON(path, func) {
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', path, true);
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                var str = JSON.parse(xobj.responseText);
                func(path, str);
            }
        };
        xobj.send(null);
    }
    */

    function localizePageContent(strObj) {
        for (var idx in strObj) {
            if (idx === "title_bar") {
                d.title = strObj.title_bar.replace(/%TiProductName%/, productName);
            } else if (idx === "page_title") {
                setWording(idx, strObj[idx].replace(/%TiProductName%/, productName));
            } else if (idx.indexOf("status_") === 0) {
                setWording("status_title", strObj["status_" + ratingType]);
            } else if (idx.indexOf("desc_") === 0) {
                setWording("desc", strObj["desc_" + ratingType]);
            } else if (idx.indexOf("promotion_") === 0) {
                if (productShortName === "") {
                    setWording(idx, strObj[idx].replace(/%TiShortProductName%/, productName));
                }
                else {
                    setWording(idx, strObj[idx].replace(/%TiShortProductName%/, productShortName));
                }
            } else {
                setWording(idx, strObj[idx]);
            }
        }
    }

    function setWording(id, strValue, attrName) {
        var el = $("#" + id);
        if (el) {
            if (attrName === undefined) {
                el.innerHTML = strValue;
            } else {
                el.setAttribute(attrName, strValue);
            }
        }
    }

    function refreshPage() {
        window.browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var lastTabId = tabs[0].id;
            window.browser.tabs.update({ url: blockedURL });
        });
    }

    function Feedback2SiteSafety(params) {
        window.browser.runtime.sendMessage({
            action: TB_ACTIONS.FEEDBACK_UNTESTED_URL,
            params: params
        });
    }

    function takeAction() {
        // add this page to global background
        var addApproved = $("#chk_add_approved_list").checked;
        var askReview = $("#chk_review").checked;
        window.browser.storage.local.get('mode', data => {
            if (isExistTitanium(data.mode)) {
                let data = {
                    params: {
                        actionID: 20026,
                        paramsIn: {
                            url: blockedURL,
                            PERMANENT: addApproved
                        }
                    }
                }
                SendMailtoPlugToolbar(JSON.stringify(data));
                if (askReview === true) {
                    var params = {
                        url: blockedURL,
                        site_owner: "0",
                        email: "",
                        description: "",
                        score: wtpScore.toString()
                    };
                    Feedback2SiteSafety(params);
                    window.browser.runtime.sendMessage({
                        action: TB_ACTIONS.FEED_UBM,
                        params: {
                            event: "WTP_BLOCKING_PAGE_FEEDBACK_SITE_SAFETY",
                            value: JSON.stringify(params)
                        }
                    });
                }
            }
            else {
                if (addApproved) {
                    window.browser.storage.local.set({
                        wtp_whitelist: wtpWhitelist.concat(appendWildcardIfNecessary(blockedURL) ? appendWildcardIfNecessary(blockedURL) : blockedURL)
                    }, function () {
                        //w.location.href = blockedURL;
                        refreshPage();
                    });
                } else {
                    window.browser.runtime.sendMessage({
                        action: TB_ACTIONS.UPDATE_GLOBAL_VARIABLES,
                        params: {
                            temp_wtp_whitelist: {
                                url: blockedURL
                            }
                        }
                    });
                    //w.location.href = blockedURL;

                    refreshPage();
                }
            }

            // send UBM
            window.browser.runtime.sendMessage({
                action: TB_ACTIONS.FEED_UBM,
                params: {
                    event: "WTP_BLOCKING_PAGE_BUTTON_VIEW_ANYWAY",
                    value: JSON.stringify({
                        'mode': data.mode,
                        'addApproved': addApproved,
                        'category': categoryTableID,
                        'askReview': askReview,
                        'host': new URL(blockedURL).hostname
                    })
                }
            });
        });

        return false;
    }

    function toggleExtraOptions() {
        var moreAction = $("#more_actions");
        var handler = $("#handler");

        if (moreAction.className.indexOf("hidden") > -1) {
            moreAction.className = moreAction.className.replace(/hidden/ig, "");
            handler.className = handler.className.replace(/ico_collapse/ig, "ico_expand");
        } else {
            moreAction.className = moreAction.className + " hidden";
            handler.className = handler.className.replace(/ico_expand/ig, "ico_collapse");
        }

        return false;
    }

    function appendWildcardIfNecessary(url) {

        // Remove leading and appending whitespace from the string
        url = url.trim();

        // reg for ipv6 address
        var sRegexIpv6address = '(((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?)'
        var sRegex = '^\\s*(http[s\\*]?:\\/\\/)(?:([^\\s\\.\\/\\?\\[\\],]+)((?:\\.[^\\s\\.\\/\\?\\[\\],]+)*)|(\\[ipv6address\\]))((\\/[^\\?\\[\\]]*)?(\\/[^\\?\\/\\[\\]]*))?(\\?)?'.replace(/ipv6address/, sRegexIpv6address.replace(/\(/g, '(?:'));
        var regex = new RegExp(sRegex);

        //reg for ipv4 address
        //var regex = /^\s*(http[s\*]?:\/\/)(?:([^\s\.\/\?,]+)((?:\.[^\s\.\/\?,]+)*)|(ipv6))((\/[^\?]*)?(\/[^\?\/]*))?(\?)?/
        /*
         * $0: whole string is matched
         * $1: protocol scheme
         * $2: hostname
         * $3: domain
         * $4: ipv6 address
         * $5: fullpath
         * $6: filepath
         * $7: filename
         * $8: The indicator of GET parameter
         */

        var match = url.match(regex);
        //console.info("checking URL: "+url);
        if (match === null) {
            return undefined;
        }

        // Don't allow non-Latin charactor in FQDN
        if (!/^[\w:@\.\-\*]+$/.test(match[2] + "." + match[3])) {
            return undefined;
        }

        // Simply check in path
        if (!/^[\w:%=@\/\?\&\.\-\#\*\[\]\~;]+$/.test(match[5])) {
            return undefined;
        }

        var scheme = match[1];
        var hostname = match[2];
        var domain = match[3];
        var ipv6address = match[4];
        var fullpath = match[5];
        var filepath = match[6];
        var filename = match[7];
        var cgiIndicator = match[8];
        var urlWithWildcard = undefined;

        // 1st: It only contains domain part.
        // For example: http://www.domain.com -> http://*.domain.com/*
        if ((fullpath === undefined || fullpath === "/") && cgiIndicator === undefined) {
            var tokens = domain ? domain.split(".") : [];
            // Parts is empty, ignore it.
            tokens.shift();
            var lastToken = tokens[tokens.length - 1];

            urlWithWildcard = scheme
            if (domain == undefined) {
                if (!ipv6address) return undefined;
                urlWithWildcard += ipv6address;
            } else if (domain.length == 0) {
                urlWithWildcard += hostname;
            }
            // 1.1 User has put * in domain, don't change it
            // 1.2 The length of last token is last than 2 letters, it could be a "nation code".
            //     If number of tokens is last than 3, don't change it
            // 1.3 The length of last token is more than 2 letters, it could be a "orgnization code".
            //     If number of tokens is last than 2, don't change it
            // 1.4 Last token is digit, it could be a IP address, don't change it
            else if (domain.indexOf("*") !== -1 ||
                (lastToken.length <= 2 && tokens.length < 3) ||
                (lastToken.length > 2 && tokens.length < 2) ||
                (/[0-9]/.test(lastToken))) {

                urlWithWildcard += hostname + domain;
            }
            else {
                urlWithWildcard += "*" + domain;
            }
            urlWithWildcard += "/*";
        }
        // 2nd: If the URL already contains wildcard, don't add wildcard because it could be added by users.
        else if (url.indexOf("*") !== -1) {
            urlWithWildcard = url;
        }
        // 3rd: It is a folder path, append wildcard at the end of path
        // For example: http://www.domain.com/folder/ -> http://www.domain.com/folder/*"
        else if (filename === "/" && cgiIndicator === undefined) {
            urlWithWildcard = url + "*"
        }
        // 4th: If the path contains GET parameters and other cases, don't add wildcard
        // For example:
        //   http://www.domain.com/file?parm1=value1 -> do nothing
        //   http://www.domain.com/folder/? -> do nothing
        else {
            urlWithWildcard = url;
        }
        //console.info("After add wildcard, URL: "+urlWithWildcard);
        return urlWithWildcard;
    }

    function bindClick(id, fn) {
        if ($(id)) {
            $(id).onclick = fn
        }
    }

    function init() {
        // set language for localized font setting
        $("body")[0].className = lang;

        var statusText = $("#status_title"),
            statusIcon = $("#status_icon"),
            infoBox = $("#info_box");

        console.log(`categoryTableID: ${categoryTableID}`);
        console.log(`wrsCategoryTableID: ${wrsCategoryTableID}`);
        console.log(`wtpScore: ${wtpScore}`);
        // Special Case: Display another wording for ransomware site detection.
        if (categoryTableID === "1E") {
            ratingType = "RANSOMWARE";
            statusText.className = statusText.className + " sign_dangerous";
            statusIcon.className = statusIcon.className + " sign_dangerous";
            infoBox.className = "ransomware";
        } else if (lang === "en-US" && scamList.includes(categoryTableID)) {
            ratingType = "SCAM";
            statusText.className = statusText.className + " sign_dangerous";
            statusIcon.className = statusIcon.className + " sign_dangerous";
            $("#ttl_threat_type").className = "hidden";
            $("#category_virus").className = "hidden";
        } else if (lang === "en-US" && phishingList.includes(categoryTableID)) {
            ratingType = "PHISHING";
            statusText.className = statusText.className + " sign_dangerous";
            statusIcon.className = statusIcon.className + " sign_dangerous";
            $("#ttl_threat_type").className = "hidden";
            $("#category_virus").className = "hidden";
        } else if (lang === "en-US" && malwareList.includes(categoryTableID)) {
            ratingType = "MALWARE";
            statusText.className = statusText.className + " sign_dangerous";
            statusIcon.className = statusIcon.className + " sign_dangerous";
            $("#ttl_threat_type").className = "hidden";
            $("#category_virus").className = "hidden";
        } else {
            if (wtpScore === 71) {
                ratingType = "UNTEST";
                statusText.className = statusText.className + " sign_warnning";
                statusIcon.className = statusIcon.className + " sign_warnning";
                $("#ttl_threat_type").className = "hidden";
                $("#category_virus").className = "hidden";
            } else if (wtpScore < 51) {
                ratingType = "DANGEROUS";
                statusText.className = statusText.className + " sign_dangerous";
                statusIcon.className = statusIcon.className + " sign_dangerous";
            } else if (wtpScore < 81 && wtpScore > 50) {
                ratingType = "SUSPICIOUS";
                statusText.className = statusText.className + " sign_warnning";
                statusIcon.className = statusIcon.className + " sign_warnning";
                $("#ttl_threat_type").className = "hidden";
                $("#category_virus").className = "hidden";
            }
        }
        if (wtpRatingResult === 7){
            ratingType = "OFFLIMIT";
            statusText.className = statusText.className + " sign_dangerous";
            statusIcon.className = statusIcon.className + " sign_dangerous";
            $("#ttl_address").className = "hidden";
            $("#handler_desc").className = "hidden";
            $("#close_window_desc").className = "hidden";

            $("#handler_blocked_desc").classList.remove("hidden");
            $("#close_blocked_window_desc").classList.remove("hidden");
            $("#chk01").className = $("#chk01").className + " hidden";
            $("#chk02").className =  $("#chk02").className + " hidden";
        }
        setWording("address", blockedURL);
        localizePageContent(l10nStr);

        // Load Category resource
        if (categoryL10nStr[categoryTableID] !== undefined) {
            setWording("category_virus", categoryL10nStr[categoryTableID]);
        } else {
            $("#ttl_threat_type").className = "hidden";
            $("#category_virus").className = "hidden";
        }

        var close = function () {
            w.close();
            return false;
        },
            bindActive = function (id) {
                var el = $(id);
                if (el) {
                    el.onmousedown = function () {
                        el.className = el.className + " active";
                    };
                    el.onmouseup = function () {
                        el.className = el.className.replace(/active/ig, "");
                    };
                }
            };

        // open page anyway
        bindClick("#btn_view_anyway", takeAction);
        // toggle extra options
        bindClick("#handler_desc", toggleExtraOptions);
        bindClick("#handler_blocked_desc", toggleExtraOptions);

        // uncheck the checkbox in default to prevent IE will keep the status after refresh
        $("#chk_add_approved_list").checked = false;
        $("#chk_review").checked = false;

        window.browser.storage.local.get('mode', data => {
            if (!isExistTitanium(data.mode)) {
                var chkReview = $("#chk_review");
                chkReview.className = chkReview.className + " hidden";
                var labelReview = $("#review");
                labelReview.className = labelReview.className + " hidden";
            }
        });

        window.browser.storage.local.get('license', data => {
            var isShowBuyNowButton = false;
            if (typeof data.license.TiBuyNowLink !== "undefined" && data.license.TiBuyNowLink !== "") {
                isShowBuyNowButton = true;
            }
            if (isShowBuyNowButton) {
                $("#advertisement").className = $("#advertisement").className.replace(/hidden/ig, "");
                $("#buy_now").setAttribute("href", data.license.TiBuyNowLink);
                bindClick("#buy_now", () => {
                    window.browser.runtime.sendMessage({
                        action: TB_ACTIONS.FEED_UBM,
                        params: {
                            event: "WTP_BLOCKING_BUTTON_BUYNOW",
                            value: JSON.stringify({
                                'click': 1
                            })
                        }
                    });
                });
            }
        });

        // add listener to refresh page
        window.browser.runtime.onMessage.addListener((request) => {
            console.log('[content] onMessage:');
            console.log(request);
            switch (request.action) {
                case 'refreshBlockingPage':
                    if (request.url === blockedURL) {
                        refreshPage();
                    }
                    break;
                default:
                    break;
            }
        });

        window.browser.runtime.sendMessage({
            action: TB_ACTIONS.FEED_UBM,
            params: {
                event: "WTP_BLOCKING_PAGE_PAGEVIEW",
                value: JSON.stringify({
                    'category': categoryTableID,
                    'host': new URL(blockedURL).hostname
                })
            }
        });
    }

    function isExistTitanium(data) {
        return (data === 'Toolbar' || data === 'Coexist' || data === 'Promoter');
    }

    function setTitle(mode, locale) {
        const isJP = locale === 'ja';
        const icon = (isExistTitanium(mode) || isJP) ? 'img_toolbar_safe_40' : 'logo_icon40';
        const href = window.browser.runtime.getURL('js/wtp/BlockingPage/images/' + icon + '.png');

        // set title
        document.title = productName;

        // set icon
        const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = href;
        document.getElementsByTagName('head')[0].appendChild(link);
    }

    function getArticle() {
        if (lang === 'en-US' && (scamList.includes(categoryTableID) || phishingList.includes(categoryTableID) || malwareList.includes(categoryTableID))) {
            UtilTMC.postArticle(blockedURL, '', parseInt('0x' + wrsCategoryTableID).toString(), '3')
                .then((response) => {
                    const [data, error] = response
                    if (!error && data.articles && data.articles.length > 0) {
                        let promotionTitle = ''
                        let id = ''
                        let learnMoreLink = '';
                        if (scamList.includes(categoryTableID)) {
                            promotionTitle = l10nStr['promotion_title_scam']
                            id = 'lnk_learn_more_scam'
                            learnMoreLink = iKBURLScam
                        }
                        if (phishingList.includes(categoryTableID)) {
                            promotionTitle = l10nStr['promotion_title_phishing']
                            id = 'lnk_learn_more_phishing'
                            learnMoreLink = iKBURLPhishing
                        }
                        if (malwareList.includes(categoryTableID)) {
                            promotionTitle = l10nStr['promotion_title_malware']
                            id = 'lnk_learn_more_malware'
                            learnMoreLink = iKBURLMalware
                        }

                        const article = data.articles[0]
                        const {
                            image_url,
                            title,
                            update_time,
                            url
                        } = article
                        const appendParams = {
                            'utm_source': 'Titanium',
                            'utm_medium': 'blockingpage'
                        };
                        let article_url = new URL(url);
                        let learn_more_url = new URL(learnMoreLink);
                        for(let param_key in appendParams) {
                            article_url.searchParams.append(param_key, appendParams[param_key]);
                            learn_more_url.searchParams.append(param_key, appendParams[param_key]);
                        }

                        const monthMapping = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
                        const date = new Date(update_time)
                        const dateString = `${date.getDate()} ${monthMapping[date.getMonth()]} , ${date.getFullYear()}`
                        const dom = `
                <span>${promotionTitle}</span>
                <section>
                  <aside>
                    <img src="${image_url}" />
                  </aside>
                  <aside>
                    <span>${title}</sapn>
                    <span class="promotion_gray">${dateString}</sapn>
                    <a id="promotion_go_to_article" href="">${l10nStr['promotion_article_read_article']}</a>
                  </aside>
                </section>
                <a id="${id}" href="">${l10nStr['promotion_article_see_more']}</a>
              `
                        //console.log(article)
                        const target = document.querySelector('#promotion')
                        target.innerHTML = dom
                        target.style.cssText += `border-top: 1px solid rgb(194,194,194);`

                        //bind read the article
                        bindClick('#promotion_go_to_article', () => {
                            window.browser.runtime.sendMessage({
                                action: TB_ACTIONS.FEED_UBM,
                                params: {
                                    event: "WTP_BLOCKING_READ_THE_ARTICLE_LINK_CLICKED",
                                    value: JSON.stringify({
                                        'category': categoryTableID
                                    })
                                }
                            })
                            window.open(article_url.href)
                        })

                        // bind learn more link
                        const learnMoreLinkId = '#lnk_learn_more_' + ratingType.toLowerCase();
                        bindClick(learnMoreLinkId, () => {
                            window.browser.runtime.sendMessage({
                                action: TB_ACTIONS.FEED_UBM,
                                params: {
                                    event: "WTP_BLOCKING_PAGE_SEE_MORE_NEWS_LINK_CLICKED",
                                    value: JSON.stringify({
                                        'category': categoryTableID
                                    })
                                }
                            })
                            window.open(learn_more_url.href)
                        })
                    }
                })
        }
    }


    (function () {
        window.browser.tabs.getCurrent(function (tab) {
            var currentTabId = tab.id;
            window.browser.storage.local.get([
                'wtp_blocked_url', 'wtp_blocked_url_category', 'wtp_blocked_url_score', 'wtp_whitelist', 'wtp_rating_result', 'ratingResult', 'locale', 'locale_n_region', 'mode',
                'os', 'browser', 'titanium_name', 'titanium_shortname', 'l10n_strings', 'urls'
            ], function (data) {
                if (isExistTitanium(data.mode)) {
                    productName = data.titanium_name;
                    productShortName = data.titanium_shortname;
                } else {
                    if (data.l10n_strings) {
                        if (data.browser === 'msedge') {
                            productName = data.l10n_strings.product_name;
                        } else {
                            productName = (data.os === 'cros') ? data.l10n_strings.product_name_chromebook : data.l10n_strings.product_name_chrome;
                        }
                    }
                }

                //console.log(JSON.stringify(data));

                wtpRatingResult = data.wtp_rating_result;

                lang = data.locale_n_region;
                if (data.ratingResult && data.ratingResult.hasOwnProperty(currentTabId)) {
                    //console.log('Get data by tab');
                    blockedURL = data.ratingResult[currentTabId].wtp_blocked_url;
                    categoryTableID = data.ratingResult[currentTabId].wtp_blocked_url_category;
                    wtpScore = parseInt(data.ratingResult[currentTabId].wtp_blocked_url_score, 10);
                    wtpWhitelist = data.wtp_whitelist;
                }
                else {
                    blockedURL = data.wtp_blocked_url;
                    categoryTableID = data.wtp_blocked_url_category;
                    wtpScore = parseInt(data.wtp_blocked_url_score, 10);
                    wtpWhitelist = data.wtp_whitelist;
                }
                wrsCategoryTableID = UtilWrs.mappingCateogryFromTiToWrs(categoryTableID);

                if (typeof (data.urls['learn_more_scam']) !== 'undefined') {
                    iKBURLScam = data.urls['learn_more_scam'];
                }

                if (typeof (data.urls['learn_more_phishing']) !== 'undefined') {
                    iKBURLPhishing = data.urls['learn_more_phishing'];
                }

                if (typeof (data.urls['learn_more_malware']) !== 'undefined') {
                    iKBURLMalware = data.urls['learn_more_malware']
                }

                var localePath = "_locales/" + data.locale + "/urlfCategory.json";
                fetch(window.browser.runtime.getURL(localePath))
                    .then(response => response.json())
                    .then(json => {
                        categoryL10nStr = json;
                        localePath = "_locales/" + data.locale + "/urlfCredscore.json";
                        fetch(window.browser.runtime.getURL(localePath))
                            .then(response => response.json())
                            .then(json => {
                                l10nStr = json;
                                setTitle(data.mode, data.locale);
                                init()
                                getArticle()
                            });
                    });
            });
        });
    })();

}(window, document));
