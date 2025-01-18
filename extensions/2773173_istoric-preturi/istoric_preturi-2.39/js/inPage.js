var dataPageLink = "";
var dataVariant = "";
var dataUpdateCheckerInterval = 0;
var defaultCssImg = "max-width: unset !important; display: unset !important; margin: unset !important;";
var lastCheckPriceHash = "";
var lastCheckPriceLink = "";
var waitCounters = { inject: 0, injectSubsequent: 0, checkPrice: 0 };
var waitTimeoutId = 0;
var tetherRepositionInterval = 0;
var isFirstRequest = 1;
var isSubsequentRequest = 0;
var currentElementInject = null;
var currentElementInjectSelector = null;
var elemTether = null;

$(function ()
{
    var originalLeave = $.fn.popover.Constructor.prototype.leave;

    // start popup hide timer after successfully focusing it at least once
    $.fn.popover.Constructor.prototype.leave = function (obj)
    {
        var self = obj instanceof this.constructor ? obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type);
        var container, timeout;

        originalLeave.call(this, obj);

        if (obj.currentTarget)
        {
            container = $(obj.currentTarget).siblings('.popoverIstoricPreturi');
            timeout = self.timeout;
            container.one('mouseenter', function ()
            {
                clearTimeout(timeout);
                container.one('mouseleave', function ()
                {
                    $.fn.popover.Constructor.prototype.leave.call(self, self);
                });
            });
        }
    };

    function getLocalFile(img)
    {
        return chrome.extension.getURL(img);
    }

    // hide popup when clicking outside of it
    $('body').on('click', function (e)
    {
        var $target = $(e.target);
        if ($target.data('toggle') !== 'popover' && $target.parents('.popoverIstoricPreturi.in').length === 0 && $target.parents('#istoricPreturi-container').length === 0)
        {
            var $istoricPreturiTrigger = $("#istoricPreturi-trigger");
            if ($istoricPreturiTrigger.length > 0)
                $istoricPreturiTrigger.popover('hide');
        }
    });
    // or when scrolling the original document
    $(window).scroll(function ()
    {
        let $iframe = $('#istoricPreturi-iframe');
        if (!$iframe.length)
            return;
        // only if iframe is completely in view by default
        if ($iframe.offset().top + $iframe.height() > window.innerHeight)
            return;
        let iframe = $iframe[0];
        // and only if the iframe scroll didn't reach the bottom, otherwise the scroll attempt might still be inside the frame but triggered by the original document. or if there is no scroll
        if ($(iframe.contentWindow).scrollTop() + $(iframe.contentWindow).height() < $(iframe.contentDocument).height() || $(iframe.contentWindow).height() == $(iframe.contentDocument).height())
        {
            var $istoricPreturiTrigger = $("#istoricPreturi-trigger");
            if ($istoricPreturiTrigger.length > 0)
                $istoricPreturiTrigger.popover('hide');
        }
    });

    function replaceDocumentSelectorVariables(selector, variables)
    {
        for (let variableName in variables)
            if (variables.hasOwnProperty(variableName))
                selector = selector.replace("{%s}".fmt(variableName.toUpperCase()), variables[variableName]);
        return selector;
    }
    function checkDocumentSelector(selector)
    {
        try
        {
            // first, check if regex pattern
            if (selector && selector.length && selector[0] == "/" && (selector[selector.length - 1] == "/" || selector[selector.length - 2] == "/"))
            {
                let caseInsensitive = selector.substr(-2) == "/i";
                let pattern = selector.substr(1, selector.length - (caseInsensitive ? 3 : 2));
                let regExp = new RegExp(pattern, caseInsensitive ? "i" : "");
                return document.documentElement.outerHTML.match(regExp) !== null;
            }
            // fallback to jQuery selector
            else
            {
                return !!$(selector).length;
            }
        } catch (e)
        {
            return null;
        }
    }
    function checkDocumentSelectors(selectors, variables)
    {
        if (typeof selectors == "undefined" || !selectors || !selectors.length)
            return false;

        for (let i = 0; i < selectors.length; i++)
        {
            let selector = selectors[i];
            // replace variables (if any)
            if (variables)
                selector = replaceDocumentSelectorVariables(selector, variables)
            if (checkDocumentSelector(selector))
                return true;
        }

        return false;
    }
    function checkGenericDocumentSelectors(mainConfig, variables)
    {
        if (!mainConfig.hasOwnProperty("selectors_pattern_whitelistNotFound"))
            return true;

        return checkDocumentSelectors([mainConfig.selectors_pattern_whitelistNotFound], variables);
    }

    function handleSelectorsResult(result, link, documentContentsOuter)
    {
        if (!result || typeof result != "object" || result === null)
            return;

        // experimental patterns (if any) test in case of unexpected data or if data parsing fails
        if (result.hasOwnProperty("experimentalPatternsToTest") && result.experimentalPatternsToTest.length)
        {
            let resultId = result.hasOwnProperty("resultId") ? result.resultId : "";
            let targetsToTest = result.hasOwnProperty("targetsToTest") && Array.isArray(result.targetsToTest) ? result.targetsToTest : [];
            let regExp = new RegExp(result.experimentalPatternsToTest, "i");
            let matchesResults = {};
            var groups = null;
            if (targetsToTest.indexOf("outer") !== -1)
                if (groups = documentContentsOuter.match(regExp))
                    if (groups[1].length)
                        matchesResults['outer'] = groups[1];
            if (targetsToTest.indexOf("inner") !== -1)
                if (document.documentElement.innerHTML.length != documentContentsOuter.length)
                    if (document.documentElement.innerHTML != documentContentsOuter)
                        if (groups = document.documentElement.innerHTML.match(regExp))
                            if (groups[1].length)
                                matchesResults['inner'] = groups[1];
            // deflate
            let deflated = 0;
            for (let currentType in matchesResults)
            {
                if (matchesResults.hasOwnProperty(currentType))
                {
                    let dataDeflated = gzipDeflate(matchesResults[currentType]);
                    if (dataDeflated != null)
                    {
                        deflated = 1;
                        matchesResults[currentType] = dataDeflated;
                    }
                }
            }

            let type = result.type;

            if (Object.keys(matchesResults).length)
                API("selectorsExtraPatterns", { link, type, matchesResults, deflated, resultId });
        }
    }

    function debugSelectorsWait(type, maxCounter, style)
    {
        let elemId = `istoricPreturi-selectorsWait`;
        $(`#${elemId}`).remove();
        // found selector
        if (maxCounter == -1)
            return;
        $('body').prepend('<div id="%s" style="%s">Waiting for <b>%s</b> selectors %u / %u</div>'.fmt(elemId, style, type, waitCounters[type], maxCounter));
    }

    function tetherReposition()
    {
        // no element
        if (!currentElementInject)
            return;

        // if the current target element is not visible it may have been removed/recreated, try to search for it again
        if (!currentElementInject.is(":visible") && currentElementInjectSelector)
        {
            let currentElementInjectTmp = $(currentElementInjectSelector);

            // new element not found
            if (!currentElementInjectTmp.length || !currentElementInjectTmp.is(":visible"))
                return;

            // update inject element
            currentElementInject = currentElementInjectTmp;
            elemTether.target = currentElementInject[0];
        }

        // if element still not visible then don't do anything
        if (!currentElementInject.is(":visible"))
            return;

        Tether.position();
    }

    (function checkPriceFunction()
    {
        let link = cleanupLink(window.location.href);
        var hostname = getHostnameFromLink(link).hostname.replace("www.", "");

        // need to fetch config datas from background script (data which might have gotten updated since install)
        chrome.runtime.sendMessage({
            message: ["isDebugMode", "isDebugModeCheckPrice", "getSiteSettings", "getConfig", "cacheIsValid", "isProductPage"],
            // getSiteSettings
            hostname: hostname,
            // cacheIsValid
            type: "checkPrice",
            identifier: link,
            // isProductPage,
            url: link,
        }, function(result)
        {
            let isDebugMode = result.isDebugMode;
            let isDebugModeCheckPrice = result.isDebugModeCheckPrice;
            let siteConfig = result.getSiteSettings;
            let mainConfig = result.getConfig;
            let checkPrice_cacheIsValid = result.cacheIsValid.valid;

            // set timer to check if product data gets updated dynamically (current page link, variant)
            if (dataUpdateCheckerInterval)
                clearInterval(dataUpdateCheckerInterval);
            dataUpdateCheckerInterval = setInterval(function() {
                let dataUpdated = false;

                // check link
                let currentHref = cleanupLink(window.location.href);
                if (dataPageLink && dataPageLink != currentHref) // ignore link anchors
                    dataUpdated = true;
                dataPageLink = currentHref;

                // check variant
                if (!isFirstRequest) // prevent checking before the variant gets initialized
                {
                    let variant = extractVariantFromPage(siteConfig, document.documentElement.innerHTML, window.location.href);
                    if (variant != dataVariant)
                    {
                        dataUpdated = true;
                        dataVariant = variant;
                    }
                }

                // any data udpated, retrigger check price
                if (dataUpdated)
                {
                    // show loader
                    $('#istoricPreturi-cheaperSites')
                        .removeAttr("style") // remove previous style if any
                        .html('<img src="%s" style="display: none; width: 32px; height: 32px; %s" id="istoricPreturi-checkPriceLoader">'.fmt(getLocalFile('img/loader.svg'), defaultCssImg))
                        .show();

                    // reset wait counters
                    waitCounters = { inject: 0, injectSubsequent: 0, checkPrice: 0 }

                    // cancel any timeouts
                    if (waitTimeoutId)
                        clearTimeout(waitTimeoutId);

                    // start check
                    checkPriceFunction();
                }
            }, 500);

            if (siteConfig === null)
                return;

            // only on product page
            if (!result.isProductPage)
            {
                // remove any previous containers in case this is a re-inject
                $('#istoricPreturi-container').remove();

                currentElementInject = null;
                currentElementInjectSelector = null;

                return;
            }

            let documentContents = document.documentElement.innerHTML;

            // check if content not fully rendered yet, most likely loaded dynamically
            if (siteConfig.hasOwnProperty("selectors_inject_waitFor") && siteConfig.selectors_inject_waitFor.length)
            {
                if (!checkDocumentSelectors(siteConfig.selectors_inject_waitFor, { variant: extractVariantFromPage(siteConfig, documentContents, window.location.href) }))
                {
                    let maxWaitCounter = mainConfig.hasOwnProperty("inject_waitFor_maxCounter") ? mainConfig.inject_waitFor_maxCounter : 0;
                    if (!maxWaitCounter || ++waitCounters['inject'] <= maxWaitCounter)
                    {
                        waitTimeoutId = setTimeout(function() { checkPriceFunction(); }, 1000);
                        if (isDebugMode)
                            debugSelectorsWait("inject", maxWaitCounter, mainConfig.hasOwnProperty("message_selectorsNotFound_css") ? mainConfig.message_selectorsNotFound_css : "");
                        return;
                    }
                }
                else
                {
                    debugSelectorsWait("inject", -1);

                    // reset counter to be re-used in case of re-inject (subsequent request)
                    waitCounters['inject'] = 0;
                }
            }

            // wait until document contents size reaches a minimum threshold to prevent some inject/checkPrice errors and selectorsNotFound false positives
            if (mainConfig.hasOwnProperty("selectors_waitForMinContentSize") && mainConfig.selectors_waitForMinContentSize)
            {
                if (documentContents.length < mainConfig.selectors_waitForMinContentSize)
                {
                    waitTimeoutId = setTimeout(function() { checkPriceFunction(); }, 1000);
                    return;
                }
            }

            // mark the request as a re-inject from a dynamic page/link update (subsequent request) if needed
            // MUST BE AFTER inject wait
            if (!isFirstRequest)
                isSubsequentRequest = 1;
            else
            {
                isFirstRequest = 0;

                // initialize selected variant on first request
                dataVariant = extractVariantFromPage(siteConfig, documentContents, window.location.href);
            }

            // schema.org extract
            let schemaData = null;
            // only if checkPrice hasn't been already requested recently (still has valid cache) AND schema data is not ignored completely
            let schemaDataIgnored = siteConfig.hasOwnProperty("flags") && !!(siteConfig.flags & EXTENSION_FLAG_IGNORE_SCHEMA_DATA);
            if (!checkPrice_cacheIsValid && !schemaDataIgnored)
            {
                // try JSON first
                if (mainConfig.hasOwnProperty("extractPattern_schemaProductInfoJSON") && mainConfig.extractPattern_schemaProductInfoJSON.length)
                {
                    let regExp = new RegExp(mainConfig.extractPattern_schemaProductInfoJSON, 'g');
                    let groups = null;
                    while ((groups = regExp.exec(documentContents)) !== null)
                    {
                        for (let fixSchemaData = 0; fixSchemaData <= 1; fixSchemaData++)
                        {
                            try
                            {
                                let data = groups[1].replaceAll("\n", "").replaceAll("\r", "").replaceAll("\t", "");

                                // attempt to fix schema data
                                if (fixSchemaData && mainConfig.hasOwnProperty("extractPattern_schemaProductInfoJSON_schemaDataFix") && mainConfig.extractPattern_schemaProductInfoJSON_schemaDataFix.length)
                                {
                                    let previousData = data;

                                    mainConfig.extractPattern_schemaProductInfoJSON_schemaDataFix.forEach(function(fixData)
                                    {
                                        let [fixFrom, fixTo] = fixData.split(" => ");
                                        let regExpFix = new RegExp(fixFrom, 'g');
                                        data = data.replace(regExpFix, fixTo);
                                    })

                                    // no changes
                                    if (data == previousData)
                                        break;
                                }

                                let currentSchemas = JSON.parse(data);
                                // Yoast graph
                                if (typeof currentSchemas == "object" && currentSchemas.hasOwnProperty("@graph"))
                                    currentSchemas = currentSchemas['@graph'];
                                if (!Array.isArray(currentSchemas))
                                    currentSchemas = [currentSchemas];

                                labelCurrentSchemasLoop:
                                for (let i = 0; i < currentSchemas.length; i++)
                                {
                                    let currentSchema = currentSchemas[i];

                                    if (currentSchema.hasOwnProperty("@type"))
                                    {
                                        for (let checkMainEntity = 0; checkMainEntity <= 1; checkMainEntity++)
                                        {
                                            let currentSchemaType = Array.isArray(currentSchema['@type']) ? currentSchema['@type'][0] : currentSchema['@type'];
                                            if (currentSchemaType.toLowerCase().indexOf("product") == -1 && currentSchemaType.toLowerCase().indexOf("book") == -1)
                                            {
                                                // check if it contains a mainEntity object
                                                if (currentSchema.hasOwnProperty("mainEntity"))
                                                    currentSchema = currentSchema.mainEntity;
                                                // it doesn't, check next schema
                                                else
                                                    continue labelCurrentSchemasLoop;
                                            }
                                            // all good, found a product schema
                                            else
                                                break;
                                        }

                                        let currentLinkPath = extractLinkPath(link);

                                        // check offers
                                        if (currentSchema.hasOwnProperty("offers"))
                                        {
                                            schemaData = currentSchema.offers;

                                            // in case of multiple offers try to find current variant
                                            let schemaDatasForCurrentVariant = [];
                                            if (Array.isArray(schemaData) && schemaData.length > 1)
                                            {
                                                for (let j = 0; j < schemaData.length; j++)
                                                {
                                                    let currentSchemaOffer = schemaData[j];
                                                    if (typeof currentSchemaOffer == "object" && currentSchemaOffer.hasOwnProperty("@type"))
                                                    {
                                                        // comapare based on variant link
                                                        // allow all possible offers for a variant in case there are multiple for the same variant (for example a site can have product colors as variant and product sizes for that color being multiple for the same variant)
                                                        if (typeof currentSchemaOffer == "object" && currentSchemaOffer.hasOwnProperty("url") && extractLinkPath(currentSchemaOffer.url) == currentLinkPath)
                                                            schemaDatasForCurrentVariant.push(currentSchemaOffer);
                                                    }
                                                }
                                            }
                                            if (schemaDatasForCurrentVariant.length)
                                                schemaData = schemaDatasForCurrentVariant;
                                        }

                                        // check for models
                                        if (currentSchema.hasOwnProperty("model"))
                                        {
                                            let models = currentSchema.model;
                                            if (!Array.isArray(models))
                                                models = [models];
                                            for (let j = 0; j < models.length; j++)
                                            {
                                                let currentModel = models[j];
                                                if (typeof currentModel == "object" && currentModel.hasOwnProperty("offers"))
                                                {
                                                    // compare based on model link
                                                    if (currentModel.hasOwnProperty("url") && extractLinkPath(currentModel.url) == currentLinkPath)
                                                    {
                                                        schemaData = currentModel.offers;
                                                        break;
                                                    }
                                                }
                                            }
                                        }

                                        // found valid schema
                                        if (schemaData !== null)
                                            break;
                                    }
                                }
                                break; // schema data OK, don't attempt fix (if not already tried)
                            }
                            catch (e)
                            {
                                // fixable schema data errors
                                if (!e.message.indexOf("double-quoted"))
                                    break; // schema data parsing error not handled, don't attempt to fix
                            }
                        } // fixSchemaData for
                        // found valid schema
                        if (schemaData !== null)
                            break;
                    }
                }

                // fallback to Microdata
                let schemaDataManual = null;
                if (schemaData === null && mainConfig.hasOwnProperty("extractPattern_schemaProductInfoMicrodata") && mainConfig.extractPattern_schemaProductInfoMicrodata.length)
                {
                    // extra check
                    if (documentContents.indexOf("schema.org/Product") != -1 || documentContents.indexOf("schema.org/Offer") != -1)
                    {
                        let regExp = new RegExp(mainConfig.extractPattern_schemaProductInfoMicrodata, 'g');
                        let groups = null;
                        while ((groups = regExp.exec(documentContents)) !== null)
                        {
                            if (schemaDataManual === null)
                                schemaDataManual = {};

                            // if the same field if found again then stop searching, we probably reached another entry, assume the first one is for the current product in page
                            if (schemaDataManual.hasOwnProperty(groups[1]))
                                break;
                            schemaDataManual[groups[1]] = groups[2];
                        }
                        schemaData = schemaDataManual;
                    }
                }
                // microdata inverse (only if no JSON schema data OR got some schema data from normal Microdata
                if ((schemaData === null || schemaDataManual) && mainConfig.hasOwnProperty("extractPattern_schemaProductInfoMicrodata_inverse") && mainConfig.extractPattern_schemaProductInfoMicrodata_inverse.length)
                {
                    // extra check
                    if (documentContents.indexOf("schema.org/Product") != -1)
                    {
                        let regExp = new RegExp(mainConfig.extractPattern_schemaProductInfoMicrodata_inverse, 'g');
                        let groups = null;
                        while ((groups = regExp.exec(documentContents)) !== null)
                        {
                            if (schemaDataManual === null)
                                schemaDataManual = {};

                            // if the same field if found again then stop searching, we probably reached another entry, assume the first one is for the current product in page
                            if (schemaDataManual.hasOwnProperty(groups[2]))
                                break;
                            schemaDataManual[groups[2]] = groups[1];
                        }
                        schemaData = schemaDataManual;
                    }
                }
            }
            schemaData = schemaData !== null ? JSON.stringify(schemaData) : "";

            let selectorsAnyFound = {};

            // inject
            var $istoricPreturiDiv = null;
            // always re-inject (if this is the case), don't check for any existing, those will be removed below if any
            if (siteConfig.hasOwnProperty("selectors_inject") && siteConfig.selectors_inject !== null)
            {
                selectorsAnyFound['inject'] = 0;

                for (let ignoreHidden = 1; ignoreHidden >= 0; ignoreHidden--)
                {
                for (let i = 0; i < siteConfig.selectors_inject.length; i++)
                {
                    let selector = siteConfig.selectors_inject[i];
                    selector = replaceDocumentSelectorVariables(selector, { variant: dataVariant });

                    // attempt to select the visible element, in case there are multiple results with the same selector, but only if explicitly required not to or
                    // if this is the second attempt to find inject targets and include hidden ones too
                    if (selector.indexOf(":hidden") == -1 && ignoreHidden)
                    {
                        // if any limit selectors make sure they are moved AFTER the :visible inserted selector
                        if (selector.indexOf(":lt(") !== -1)
                            selector = selector.replace(/:lt\(([0-9]+)\)/, ":visible:lt($1)");
                        else
                            selector = `${selector}:visible`;
                    }
                    let elementInject = currentElementInject = $(selector);
                    if (!elementInject.length)
                        continue;

                    // all good
                    currentElementInjectSelector = selector;
                    selectorsAnyFound['inject'] = elementInject.length;

                    // remove any previous containers in case this is a re-inject
                    $('#istoricPreturi-container').remove();

                    // add container
                    var istoricPreturiHtml = '<div id="istoricPreturi-container" style="height: 38px;"><span style="height: 38px; display: inline-block; cursor: help" ns-popover-trigger="mouseenter" ns-popover-timeout="10" ns-popover-hide-on-click="true" ns-popover-template="myPopoverTemplate" ns-popover ns-popover-placement="bottom" id="istoricPreturi-trigger"><img src="%s" style="width:32px; height:32px; vertical-align: top; %s"><span id="istoricPreturi-cheaperSites">%s</span></div>'.fmt(
                        getLocalFile('img/icon_inPage.png'),
                        defaultCssImg,
                        '<img src="%s" style="display: none; width: 32px; height: 32px; %s" id="istoricPreturi-checkPriceLoader">'.fmt(getLocalFile('img/loader.svg'), defaultCssImg)
                    );
                    $('body')
                        .append('<div style="clear: both"></div>') // add float clearer before container to prevent any possible fails
                        .append(istoricPreturiHtml);
                    $istoricPreturiDiv = $('#istoricPreturi-container');

                    // container per-site css
                    if (siteConfig.hasOwnProperty("config_cssInPage_container") && siteConfig.config_cssInPage_container.length)
                    {
                        let containerCss = parseJson(siteConfig.config_cssInPage_container);
                        if (containerCss)
                            for (let fieldName in containerCss)
                                if (containerCss.hasOwnProperty(fieldName))
                                    $istoricPreturiDiv.css(fieldName, containerCss[fieldName]);
                    }

                    // in page CSS / positioning
                    let offsetX = 0;
                    let offsetY = 0;
                    let positionAttachment = "top left";
                    let positionTargetAttachment = "top right";
                    if (siteConfig.hasOwnProperty("config_cssInPage") && siteConfig.config_cssInPage.length)
                    {
                        let offsets = null;
                        if (offsets = parseJson(siteConfig.config_cssInPage))
                        {
                            // offset
                            if (offsets.hasOwnProperty("offsetX_mobile") && isMobile())
                                offsetX = offsets.offsetX_mobile * -1;
                            else if (offsets.hasOwnProperty("offsetX"))
                                offsetX = offsets.offsetX * -1;
                            if (offsets.hasOwnProperty("offsetY_mobile") && isMobile())
                                offsetY = offsets.offsetY_mobile * -1;
                            else if (offsets.hasOwnProperty("offsetY"))
                                offsetY = offsets.offsetY * -1;

                            // positioning
                            if (offsets.hasOwnProperty("attachment"))
                                positionAttachment = offsets.attachment;
                            if (offsets.hasOwnProperty("targetAttachment"))
                                positionTargetAttachment = offsets.targetAttachment;
                        }
                    }

                    // attempt fair-play, no overlap
                    if ($('#pricy-container').length)
                        offsetX -= 32;

                    elemTether = new Tether({
                        element: $istoricPreturiDiv,
                        target: elementInject,
                        attachment: positionAttachment,
                        targetAttachment: positionTargetAttachment,
                        offset: `${offsetY}px ${offsetX}px`,
                    });

                    // make sure it's always positioned correctly in case of page contents update
                    if (!tetherRepositionInterval)
                        tetherRepositionInterval = setInterval(function() { tetherReposition(); }, 500);

                    $('#istoricPreturi-trigger').popover({
                        html: true,
                        trigger: 'hover',
                        placement: 'bottom',
                        container: isMobile() ? 'body' : false,
                        content: function ()
                        {
                            // make sure only 1 popup exists at a time
                            if ($('#istoricPreturi-popup').length)
                                return null;
                            return '<div id="istoricPreturi-popup" class="istoricPreturi-wrapper"><div id="istoricPreturi-loading-icon"></div><iframe id="istoricPreturi-iframe" src="" frameborder="0" width="100%" height="100%" style="visibility: visible !important;"></iframe></div>';
                        },
                        delay: {
                            show: isMobile() ? 0 : 300,
                            hide: 1e6,
                        },
                        template: "<div class='popoverIstoricPreturi'><div class='popover-content'></div></div>",
                    })
                        .on("shown.bs.popover", function ()
                        {
                            window.istoricPreturi.loadContent(true);

                            // make sure popover is always in view
                            if (isMobile())
                            {
                                $('.popoverIstoricPreturi').css({ "left": "0px" });
                                return;
                            }

                            let width = $("#istoricPreturi-iframe").width();
                            let maxWidth = window.innerWidth;
                            let left = Math.round($('.popoverIstoricPreturi').offset().left);
                            if (left + width > maxWidth - 20)
                            {
                                $('#istoricPreturi-popup').css({
                                    "position": "relative",
                                    "left": "%dpx".fmt(Math.round(maxWidth - (left + width) - 20))
                                })
                            }
                        });

                    // valid selector found, stop
                    break;
                }

                    // valid selector found, stop
                    if (selectorsAnyFound['inject'])
                        break;
                }

                // no inject selectors found
                if (!selectorsAnyFound['inject'])
                {
                    // re-inject/subsequent request
                    if (isSubsequentRequest)
                    {
                        // remove the previous container
                        $('#istoricPreturi-container').remove();

                        currentElementInject = null;

                        // wait a bit, maybe content not fully rendered yet from dynamic load
                        let maxWaitCounter = mainConfig.hasOwnProperty("inject_subsequentRequestRetry_maxCounter") ? mainConfig.inject_subsequentRequestRetry_maxCounter : 0;
                        if (!maxWaitCounter || ++waitCounters['injectSubsequent'] <= maxWaitCounter)
                        {
                            waitTimeoutId = setTimeout(function() { checkPriceFunction(); }, 1000);
                            if (isDebugMode)
                                debugSelectorsWait("injectSubsequent", maxWaitCounter, mainConfig.hasOwnProperty("message_selectorsNotFound_css") ? mainConfig.message_selectorsNotFound_css : "");
                            return;
                        }
                    }
                }
                // found inject selectors
                else
                {
                    // re-inject/subsequent erquest
                    if (isSubsequentRequest)
                    {
                        // hide debug message if any
                        debugSelectorsWait("injectSubsequent", -1);
                    }
                }
            }

            // check price and notify selectors not found, but wait to see if known product page
            (function waitForSitesCount()
            {
                chrome.runtime.sendMessage({
                    message: "getSitesCountExisting",
                    link: link,
                }, function(sitesCountExisting)
                {
                    // response not ready yet, wait
                    if (sitesCountExisting === null)
                    {
                        waitTimeoutId = setTimeout(function() { waitForSitesCount(); }, 1000);
                        return;
                    }

                    // check if content not fully rendered yet, most likely loaded dynamically
                    if (siteConfig.hasOwnProperty("selectors_checkPrice_waitFor") && siteConfig.selectors_checkPrice_waitFor.length)
                    {
                        if (!checkDocumentSelectors(siteConfig.selectors_checkPrice_waitFor, { variant: dataVariant }))
                        {
                            let maxWaitCounter = mainConfig.hasOwnProperty("checkPrice_waitFor_maxCounter") ? mainConfig.checkPrice_waitFor_maxCounter : 0;
                            if (!maxWaitCounter || ++waitCounters['checkPrice'] <= maxWaitCounter)
                            {
                                waitTimeoutId = setTimeout(function() { waitForSitesCount(); }, 1000);
                                if (isDebugMode)
                                    debugSelectorsWait("checkPrice", maxWaitCounter, mainConfig.hasOwnProperty("message_selectorsNotFound_css") ? mainConfig.message_selectorsNotFound_css : "");
                                return;
                            }
                        }
                        // hide debug message if any
                        else
                            debugSelectorsWait("checkPrice", -1);
                    }

                    let containerCheaperSites = $('#istoricPreturi-cheaperSites');

                    // but only if this is a known product page, otherwise it will trigger on any page from the site
                    if (!sitesCountExisting)
                    {
                        // hide loader (if any)
                        containerCheaperSites.html("").hide();

                        return;
                    }

                    // cache document contents in case selectors are not found so both selectorsNotFound and checkPrice are sure to be using the same contents
                    let documentContentsOuter = document.documentElement.outerHTML;

                    // check price
                    let price = "";
                    let priceHTML = "";
                    if (siteConfig.hasOwnProperty("selectors_checkPrice") && siteConfig.selectors_checkPrice !== null)
                    {
                        selectorsAnyFound['checkPrice'] = 0;

                        for (let i = 0; i < siteConfig.selectors_checkPrice.length; i++)
                        {
                            let selector = siteConfig.selectors_checkPrice[i];
                            selector = replaceDocumentSelectorVariables(selector, { variant: dataVariant });

                            try
                            {
                                // first, check if regex pattern
                                if (selector && selector.length && selector[0] == "/" && (selector[selector.length - 1] == "/" || selector[selector.length - 2] == "/"))
                                {
                                    let caseInsensitive = selector.substr(-2) == "/i";
                                    let pattern = selector.substr(1, selector.length - (caseInsensitive ? 3 : 2));
                                    let regExp = new RegExp(pattern, caseInsensitive ? "i" : "");
                                    let groups = documentContentsOuter.match(regExp);
                                    if (!groups)
                                        continue;
                                    if (groups[1].length)
                                        price = groups[1];
                                    
                                    selectorsAnyFound['checkPrice'] = 1;
                                }
                                // fallback to jQuery selector
                                else
                                {
                                    // find element
                                    var elementExtract = $(selector);
                                    if (!elementExtract.length)
                                        continue;

                                    // read contents
                                    // first assume it's a normal element with inner contents
                                    price = elementExtract[0].innerText;
                                    if (!price.length)
                                    {
                                        // if it's not then fallback to "content" attribute
                                        price = elementExtract.attr("content");

                                        // still no data
                                        if (price === undefined || !price.length)
                                        {
                                            price = "";
                                            continue;
                                        }
                                    }
                                    priceHTML = elementExtract[0].innerHTML;

                                    selectorsAnyFound['checkPrice'] = elementExtract.length;
                                }

                                // valid selector found, stop
                                break;
                            }
                            catch (e) { }
                        }
                    }
                    let showResult = function($elem, result)
                    {
                        if ($istoricPreturiDiv !== null)
                        {
                            let hasHTML = result.hasOwnProperty("resultHTML") && result.resultHTML !== null;

                            // check if any known site has lower price
                            if (result && result.hasOwnProperty("cheaperSites"))
                            {
                                let HTML = "%s%s".fmt(
                                    result.imageName ? "<img src='%s.png' style='width:32px !important; height: 32px !important; vertical-align: middle !important; %s'>".fmt(
                                        getLocalFile(`img/${result.imageName}`),
                                        defaultCssImg
                                    ) : "",
                                    hasHTML && result.resultHTML.hasOwnProperty("HTML") ? result.resultHTML.HTML : ""
                                );
                                let CSS = hasHTML && result.resultHTML.hasOwnProperty("CSS") ? result.resultHTML.CSS : "";

                                $elem.html(HTML);
                                if (CSS)
                                {
                                    let cssText = [];
                                    for (let cssField in CSS)
                                        if (CSS.hasOwnProperty(cssField))
                                            cssText.push("%s: %s".fmt(cssField, CSS[cssField]));
                                    cssText = cssText.join("; ");
                                    $elem.css("cssText", cssText);
                                }
                                else
                                    $elem.removeAttr("style"); // remove previous style if any in case this is a subsequent request
                            }
                            else
                                $elem.html("");
                        }
                    }
                    let cacheIdentifier = link + (dataVariant ? "_%s".fmt(dataVariant.hash()) : "");
                    CACHE_handle("checkPrice", cacheIdentifier, function(data)
                    {
                        showResult(containerCheaperSites, data.data.result);
                    }, function()
                    {
                        // allow call without any data to display the "available on other sites" badge if any
                        if (!price.length && !schemaData.length)
                            price = 0;

                        // remove Tether classes
                        priceHTML = priceHTML.replace(/ class="[^"]*tether-target[^"]*"/i, '');

                        // in case this is a subsequent checkPrice from the same page make sure the page contents successfully updated, maybe the link changed but the content didn't update yet
                        if (mainConfig.hasOwnProperty("checkPrice_ignoreSubsequentIfSameHash") && mainConfig.checkPrice_ignoreSubsequentIfSameHash)
                        {
                            // check the hash without the link because the link obviously changed
                            let hashForSubsequentCheck = "%s@%s@%s".fmt(price, priceHTML, schemaData).replace(/[^a-z0-9@]/gi, "").hash();
                            if (lastCheckPriceHash && lastCheckPriceLink && hashForSubsequentCheck == lastCheckPriceHash && lastCheckPriceLink != link)
                            {
                                // hide loader
                                containerCheaperSites.html("").hide();

                                // notify server
                                DEBUG_OR_EXECUTE(function() { alert(`subsequent checkPrice has same hash (${hashForSubsequentCheck}) with different link:\n\n${link}\n\n${lastCheckPriceLink}`); }, function()
                                {
                                    CACHE_handle("checkPrice_subsequentSameHashDifferentLink", hostname, null, function ()
                                    {
                                        API("checkPrice_subsequentSameHashDifferentLink", { link, lastCheckPriceLink, hashForSubsequentCheck }, function (result)
                                        {
                                            CACHE_init("checkPrice_subsequentSameHashDifferentLink", hostname);
                                        });
                                    });
                                });

                                return;
                            }
                            lastCheckPriceHash = hashForSubsequentCheck;
                            lastCheckPriceLink = link;
                        }

                        // in stock/out of stock
                        let stockStatus = {
                            outOfStock: 0,
                            inStock: 0,
                        }
                        let anyStockStatusPattern = false;
                        for (var stockStatusType in stockStatus)
                        {
                            if (!stockStatus.hasOwnProperty(stockStatusType))
                                continue;
                            if (!siteConfig.hasOwnProperty(`pattern_${stockStatusType}`))
                                continue;
                            let selectors = siteConfig[`pattern_${stockStatusType}`];
                            if (!selectors || !selectors.length)
                                continue;

                            anyStockStatusPattern = true;
                            if (checkDocumentSelectors(selectors, { variant: dataVariant }))
                                stockStatus[stockStatusType] = 1;
                        }
                        if (anyStockStatusPattern && isDebugMode && stockStatus.outOfStock == stockStatus.inStock)
                            if (!checkDocumentSelectors(siteConfig.pattern_whitelistNotFound, { variant: dataVariant }))
                                alert("both outOfStock and inStock returned %s".fmt(stockStatus.inStock ? "true" : "false"));

                        $('#istoricPreturi-checkPriceLoader').show();

                        let cacheId = "%s@%s@%s@%s".fmt(price, priceHTML, link, schemaData).replace(/[^a-z0-9@]/gi, "").hash();
                        let cacheIdV2 = gzipDeflate(cacheId);
                        let params = { link, price, priceHTML, cacheId, cacheIdV2, stockStatus, schemaData, isSubsequentRequest, variant: dataVariant };
                        if (isDebugModeCheckPrice)
                            params['isDebugModeCheckPrice'] = isDebugModeCheckPrice;
                        API("checkPrice", params, function(result)
                        {
                            showResult(containerCheaperSites, result);

                            // debug
                            if (result.hasOwnProperty("checkPrice_parseResult"))
                                DEBUG_CONSOLE("checkPrice parse results:\n" + result.checkPrice_parseResult);

                            // experimental patterns (if any) test in case of unexpected data or if data parsing fails
                            if (result.hasOwnProperty("experimentalPatterns"))
                                handleSelectorsResult(result.experimentalPatterns, link, documentContentsOuter);

                            CACHE_init("checkPrice", cacheIdentifier, { result });
                        }, null, true, function()
                        {
                            // hide loader
                            containerCheaperSites.html("").hide();
                        });
                    });

                    // selectors not found
                    let selectorsNotFound = [];
                    for (let selector in selectorsAnyFound)
                        if (selectorsAnyFound.hasOwnProperty(selector) && !selectorsAnyFound[selector])
                            selectorsNotFound.push(selector);
                    if (selectorsNotFound.length)
                    {
                        // but check whitelist to make sure this is not an expected not-found case
                        if (!checkDocumentSelectors(siteConfig.pattern_whitelistNotFound, { variant: dataVariant }) && !checkGenericDocumentSelectors(mainConfig, { variant: dataVariant }))
                        {
                            // notify server
                            DEBUG_OR_EXECUTE("selectors not found: " + selectorsNotFound.join(", ") + (isSubsequentRequest ? "\n\nisSubsequentRequest = true" : ""), function()
                            {
                                CACHE_handle("selectorsNotFound", hostname, null, function ()
                                {
                                    API("selectorsNotFound", { link, selectorsNotFound, isSubsequentRequest }, function (result)
                                    {
                                        CACHE_init("selectorsNotFound", hostname);

                                        handleSelectorsResult(result, link, documentContentsOuter);
                                    });
                                });
                            });

                            // notify user inject not found
                            if (selectorsNotFound.indexOf("inject") !== -1 && mainConfig.hasOwnProperty("message_selectorsNotFound") && mainConfig.message_selectorsNotFound)
                            {
                                if (!$('#istoricPreturi-selectorsNotFound').length)
                                {
                                    let style = "";
                                    if (mainConfig.hasOwnProperty("message_selectorsNotFound_css") && mainConfig.message_selectorsNotFound_css)
                                        style = mainConfig.message_selectorsNotFound_css;
                                    $('body').prepend('<div id="istoricPreturi-selectorsNotFound" style="%s">%s</div>'.fmt(style, mainConfig.message_selectorsNotFound));
                                }
                            }
                        }
                    }
                    // selectors found too many
                    let selectorsFoundTooMany = {};
                    for (let selector in selectorsAnyFound)
                        if (selectorsAnyFound.hasOwnProperty(selector) && selectorsAnyFound[selector] > 1)
                            selectorsFoundTooMany[selector] = selectorsAnyFound[selector];
                    if (Object.keys(selectorsFoundTooMany).length)
                    {
                        DEBUG_OR_EXECUTE(function() { alert("found too many selectors: " + JSON.stringify(selectorsFoundTooMany)); }, function()
                        {
                            CACHE_handle("selectorsFoundTooMany", hostname, null, function ()
                            {
                                API("selectorsFoundTooMany", { link, selectorsFoundTooMany, isSubsequentRequest }, function (result)
                                {
                                    CACHE_init("selectorsFoundTooMany", hostname);

                                    handleSelectorsResult(result, link, documentContentsOuter);
                                });
                            });
                        });
                    }
                });
            })();
        });
    })();
});