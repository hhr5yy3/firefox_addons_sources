/* The Content script is the part of the WebExtension which has access to the DOM:
 * the HTML files and their content. It cannot access the scripts loaded by said DOM,
 * nor can it interact with Native Applications.
 * It is put inside a single function to allow asynchronous call below to the extension storage.
 * We first that the logs are enabled by checking for the presence and truthfulness of 'result.logger';
 * If they are not, we continue the execution of content.js as normal.
 * If they are, we first activate the logs (replacing the native console with a custom one which we can handle and log)
 * and we pass the contentJS() function as a callback to be called once logs have been activated.
 * This allows us to make sure that every console logs thrown by the content scripts are logged how we want.  */
var weAreListening = false;
// resetting transaction id, global variable outside of the event listener
var transactionId = 0;
var transactionCounterLast = 0;
var transactionCounter = 0;
// and an object to keep track of the CertificateTable-transactionId relations
var ctTxLog = {};
var isSingleCertificate = false;
var currentListener;
let textFont = undefined;

let multiPageCtrls;
let settings = Object.assign(default_settings, customerSettings);

let ocrText = undefined;
let wysiwys3result = undefined;
var backendError = undefined;
// ========== array compare function ==========
// https://stackoverflow.com/questions/7837456/how-to-compare-arrays-in-javascript
// Warn if overriding existing method
if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});
// ========================================

function startContent() {
    // best way to create totally new copy of object
    htmlParameters = JSON.parse(
        JSON.stringify(
            checkSourcePage(true).data() // passing true to skip parameter checks, only interested in div#websigner
        )
    );
    console.log("HTML parameters:", htmlParameters);
    browser.storage.local.get("logger", function(result) {
        if (result && result.logger) {
            activateLogStorage(contentJS);
        } else {
            contentJS();
        }
    });

    // load extra fonts
    loadFonts(extraFonts);
}

// TODO MS calling in safari.js
if ($("div#websigner").length > 0) { // static mode: there is a div#websigner in the page
    startContent();
}

// dynamic mode: there might be a(nother) div#websigner in the page at some point
if (typeof safari === "undefined") {
    document.addEventListener('webSignerParse', function() {
        console.log("Web Signer dynamic mode: appropriate event has fired");
        startContent();
    }, false);
} // for safari we install handler when the DOM Content Loaded event triggers

function contentJS() {
    console.log("content.js executing...");

    /* Check if the page contains webSigner div */
    try {
        var webSignerDiv = checkSourcePage();
    } catch (e) {
        throw e;
    }

    if (typeof safari !== "undefined") {
        // inject main.css in page HTML to override page CSS (safari only!)
        var cssLink = document.createElement('link');
        cssLink.href = browser.runtime.getURL('assets/css/main.css');
        cssLink.rel = 'stylesheet', cssLink.type = 'text/css';
        cssLink.setAttribute(selectorWS, '');
        document.head.appendChild(cssLink);
        console.log("main.css injected. Now injecting GUI Elements");

        // additional CSS files defined in the dummy manifest
        if (typeof(browser.runtime.getManifest().extraStyleSheets) !== "undefined") {
            for (let cssFile of browser.runtime.getManifest().extraStyleSheets) {
                console.log("extra CSS:", cssFile);
                let extraCssLink = document.createElement('link');
                extraCssLink.href = browser.runtime.getURL(cssFile);
                extraCssLink.rel = 'stylesheet', extraCssLink.type = 'text/css';
                extraCssLink.setAttribute(selectorWS, '');
                document.head.appendChild(extraCssLink);
                console.log("injected css file:", cssFile);
            }
        }

        // inject the template HTML depending on the mode attribute
        console.log("CSS injected. Now injecting GUI Elements");
    }

    // select the injected template based on the active mode
    var htmlTemplates = {
        sign: '/templates/normal.html',
        button: '/templates/button.html',
        verify: '/templates/verify.html'
    };
    let templatePrefix = customerSettings.templatePrefix || "";
    var templateDoc = browser.runtime.getURL(templatePrefix + htmlTemplates[getMode(true)]);

    $.get(templateDoc, function(data) {
        // replace the template's image paths to point to the extension's sandbox

        // if there is a fatal error already present, we stop everything
        if ($(".fatalError[" + selectorWS + "]").length) {
            return;
        }

        $(data).insertAfter('#websigner');

        if (getMode() !== 'button') {
            $(selectorWrap).css({opacity: 0});
        }

        // FEATURES CHECKS
        $(selectorWrap + 'button.menuItem').each((i, menuButton) => {
            let element = menuButton;
            if (!menuButtons.includes(element.id)) {
                $(element).addClass('hidden');
            }
        })

        // CUSTOM.JS CHECKS
        // #customText and #customLogo
        let customLogoElement = $(selectorWrap + '#customLogo');
        if (typeof (Messages.CUSTOM_LOGO) === "undefined") {
            customLogoElement.addClass('hidden');
        } else {
            customLogoElement.find('img').first().attr('data-src', Messages.CUSTOM_LOGO)
        }
        let customTitleElement = $(selectorWrap + '#customTitle');
        if (typeof (Messages.CUSTOM_TITLE) === "undefined") {
            customTitleElement.addClass('hidden');
        } else {
            customTitleElement.text(Messages.CUSTOM_TITLE);
        }
        // Fraud Warning message
        let fraudWarningElement = $(selectorWrap + '#informationText');
        if (typeof (Messages.FRAUD_WARNING) !== "undefined") {
            fraudWarningElement.append(Messages.FRAUD_WARNING);
        }

        let assetPrefix = customerSettings.assetPrefix || "";
        $(selectorWrap + '.assetWS').each(function() {
            if (typeof ($(this).attr("data-src") !== "undefined")) {
                $(this).attr("src", browser.runtime.getURL(assetPrefix + $(this).attr("data-src")));
                $(this).removeAttr("data-src");
            }
        });

        console.log("Injecting GUI functionality");
        injectGuiFunctionality();

        $(selectorWrap + '#main').css({ // will ignore undefined values, no need to check if gui_attributes are defined
            height: getGUIHeight() - 2,
            width: getGUIWidth() - 2
        });

        document.addEventListener('webSignerRemove', function() {
            console.log("Web Signer components removal: appropriate event has fired");
            $('[' + selectorWS + ']').remove();
        }, false);

        var delay = (getGUIHeight() > 0 || getGUIWidth() > 0) ? 250 : 0;
        $(selectorWrap, selectorWrap + '#below', selectorWrap + '#menu').ready(function() {
            setTimeout(function() {
                if (htmlParameters["in_data_url"]) {
                    var url = htmlParameters["in_data_url"];

                    // disable the sign button until the data are received
                    let directSignButton = $(selectorWrap + "#directSignButton");
                    directSignButton.prop("disabled", true);
                    directSignButton.prop("title", "Retrieving data ...");
                    console.log("Retrieving data ...");

                    getDataFromURL(url).then(function(response) {
                        // on fulfilled
                        dataToDisplay = response;

                        // Check if the data to sign exceed the Chrome/Edge's limit on message size
                        if (browserName == "Chrome" && dataToDisplay.length > chromeMaxDataToSignSize) {
                            errorHandler("DATA_TOO_BIG", `Data length is ${dataToDisplay.length} bytes (the limit is ${chromeMaxDataToSignSize} bytes)`);
                        }

                        // re-enable the sign button
                        directSignButton.prop("disabled", false);
                        directSignButton.prop("title", "");

                        if (getMode() == 'verify') {
                            dataEncoded = response;
                            dataToDisplay = Uint8ToString(FindPKCS7Data(ParseB64DER(response)));
                        }

                        initMessage(getMode());
                    }, function(error) {
                        // on rejected
                        errorHandler("WRONG_PARAMETER", {
                            parameter: "in_data_url",
                            current: url,
                            reason: (url.indexOf('://') >= 0) ? undefined : "protocol prefix missing"
                        });
                    });
                    if (getInDataEncoding()) { // parameter not undefined
                        console.log("using in_data_url, therefore in_data_encoding parameter will be ignored");
                    }
                } else {
                    // Check if the data to sign exceed the Chrome/Edge's limit on message size
                    if (browserName == "Chrome" && dataToDisplay.length > chromeMaxDataToSignSize) {
                        errorHandler("DATA_TOO_BIG", `Data length is ${dataToDisplay.length} bytes (the limit is ${chromeMaxDataToSignSize} bytes)`);
                    }
                    initMessage(getMode());
                }
            }, delay);
        });
    }, "html");

    transactionId = 0, transactionCounterLast = 0, transactionCounter = 0;
    function getTransactionId() {
        if (transactionId == 0) {
            var d = Date.now();
            if (transactionCounter >= d) {
                transactionCounter += 1;
            } else {
                transactionCounter = Math.floor(d / 1000);  // TODO: upgrade INT to 64 bit in backend
                if (transactionCounter == transactionCounterLast) {
                    transactionCounter += 1;
                }
            }
            transactionId = transactionCounter;
            transactionCounterLast = transactionCounter;
        }
        return transactionId;
    }
    function clearTransactionId() {
        transactionId = 0;
    }

    function createMessage(subject) {
        return {
            from: "content",
            transaction: getTransactionId(),
            subject: subject
        };
    }

    function createSignMessage() {
        // use value defined in HTML or in the custom (if available)
        let signTimeout = getHtmlParameter("sign_timeout", "number", false) || customerSettings.signTimeout;
        let msg = createMessage("sign");
        if (signTimeout) {
            msg['signTimeout'] = signTimeout;
        }
        return msg;
    }

    var currentPage = 1;
    var pageCount = 1;

    /* dataEncoded is only used for (in_data_url + verify mode).
     * getDataToSign() returns in_data when there is no in_data_url, which contains the encoded string. */
    var dataEncoded;
    // dataToDisplay default variable is displayed in print overview when it is still in a somewhat 'undefined' state
    var dataToDisplay = "Data from URL has not been retrieved yet. Please try again later.";
    var mimeType = "text/plain";
    if (htmlParameters["mime_type"]) {
        mimeType = htmlParameters["mime_type"];
    }
    if (getMode() == 'sign' || getMode() == 'button') {
        dataToDisplay = getDataToSign();
    } else if (getMode() == 'verify') {
        // in (in_data_url + verify mode), dataToDisplay will be defined once GET is attempted
        if (!htmlParameters["in_data_url"]) {
            dataToDisplay = Uint8ToString(FindPKCS7Data(ParseB64DER(getDataToSign())));
        }
    }

    function getRenderDivBBox() {
        let renderDiv = $('#renderDiv')[0];
        let bbox = renderDiv.getBoundingClientRect();

        console.log("IFRAME testing");
        let currentWindow = window;
        // for Chrome/Edge accumulate the origin position through all iframes (if any)
        while (browserName == "Chrome" && currentWindow.frameElement != null) {
            let iframeRect = currentWindow.frameElement.getBoundingClientRect();
            console.log("inside an iframe, bounding rect:", iframeRect);
            bbox.x += iframeRect.x;
            bbox.y += iframeRect.y;
            console.log("new bbox coords:", bbox);
            currentWindow = currentWindow.parent;
        }
        return bbox;
    }
    function getRenderDivOrigin() {
        let bbox = getRenderDivBBox();
        return {x: bbox.x, y: bbox.y};
    }

    /* First handshake to pass Tab information to Background.js functions.
     * See case "init" on Background.js switch listener */
    function initMessage(mode) {
        if (mode === 'button') {
            browser.runtime.sendMessage(
                {
                    from: "content",
                    transaction: getTransactionId(),
                    subject: "init",
                    data: null,
                    screen: {}, // TODO: find place in background script and hadle it
                    point: {}
                }
            );
        } else {
            const pageHeight = getPageHeight();
            const pageCount = mimeType === "text/html" ? 1 : getPageCount(dataToDisplay, pageHeight, settings);
            getImageFromData(dataToDisplay, mimeType, 1, pageHeight, getRenderingArea().width, getRenderingArea().height, settings, window.devicePixelRatio, backendError)
                .then(image => {
                    const error = image.exception;
                    textFont = image.textFont;
                    showCanvasImage(image.dataURL, image.width, image.height, pageCount, image.exception);
                });
            browser.runtime.sendMessage(
                {
                    from: "content",
                    transaction: getTransactionId(),
                    subject: "init",
                    data: dataToDisplay,
                    screen: {availTop: window.screen.availTop, availLeft: window.screen.availLeft},
                    point: getRenderDivOrigin(),
                    dpr: window.devicePixelRatio
                }
            );
        }
    }

    function disconnectedMessage() {
        browser.runtime.sendMessage(
            {
                from: "content",
                subject: "disconnected",
                data: null
            }
        );
    }

    // GUI RESIZING
    function resizeGui(error) {
        // resize render div based on data window width and height settings
        var renderDiv = $(selectorWrap + "#renderDiv");
        if (renderDiv.length) {
            renderDiv = renderDiv.get(0); // pulling native dom element
            if (!error) {
                // take into account the scrollbars (if any)
                console.log("renderDiv width");
                console.log("getRenderingArea().width", getRenderingArea().width);
                console.log("renderDiv.offsetWidth", renderDiv.offsetWidth);
                console.log("renderDiv.clientWidth", renderDiv.clientWidth);
                renderDiv.style.width = getRenderingArea().width + renderDiv.offsetWidth - renderDiv.clientWidth + "px";
                renderDiv.style.height = getRenderingArea().height + renderDiv.offsetHeight - renderDiv.clientHeight + "px";
            } else { // reverting to default values)
                renderDiv.style.width = default_settings.width + renderDiv.offsetWidth - renderDiv.clientWidth + "px";
                renderDiv.style.height = default_settings.height + renderDiv.offsetHeight - renderDiv.clientHeight + "px";
                $(selectorWrap + "#main").css({
                    height: 'auto',
                    width: 'auto'
                });
            }
        }
    }

    // objects representing the certificate lists
    var signCertificateTable;
    var viewCertificateTable;
    // object representing the 'signed by' certificate chain and details
    var certificateChainAndDetail;

    function calcCanvasRect() {
        var windowOriginX;
        var windowOriginY;
        if (browserName === "Firefox") {
            // This is because Windows includes the outer border of the browser window, when calculating screenX/screenY
            // Seems that Chrome handles this case, FF does not...this problem may not exist on Mac
            // AFAIK there is no way to calculate this dynamically, and it CHANGES based on the zoom!!
            windowOriginX = window.mozInnerScreenX;
            windowOriginY = window.mozInnerScreenY;
        } else {
            windowOriginX = window.screenX;
            windowOriginY = window.screenY;
        }
        // Coordinates of the first pixel at the top left of the viewport (the browser window, minus toolbars/borders)
        // will not work on screen with devicePixelRatio != 1 when right side of mainscreen with different devicePixelRatio
        // in this case we are not able multiply by correct value because we know devicePixelRatio for just the screen with browser window
        windowOriginX = Math.round(windowOriginX);
        windowOriginY = Math.round(windowOriginY);
        console.log("windowOriginX: ", windowOriginX);
        console.log("windowOriginY: ", windowOriginY);
        console.log("window.screen.availLeft: ", window.screen.availLeft);
        console.log("window.screenY: ", window.screenY);
        
        // Coordinates of the first pixel at the top left of the WYSIWYS content box (renderDiv), relative to the viewport edges
        let renderDiv = $('#renderDiv')[0];
        let bbox = renderDiv.getBoundingClientRect();
        let currentWindow = window;
        // for Chrome/Edge accumulate the origin position through all iframes (if any)
        while (((browserName == "Chrome")||(browserName == "Safari")) && currentWindow.frameElement != null) {
            let iframeRect = window.frameElement.getBoundingClientRect();
            console.log("Inside an iframe with the following bounding box:", iframeRect);
            bbox.x += iframeRect.x;
            bbox.y += iframeRect.y;
            currentWindow = currentWindow.parent;
        }

        console.log("Boundig box:", bbox);
        var relativeRenderDivX = Math.round(bbox.x);
        var relativeRenderDivY = Math.round(bbox.y);
        console.log("relativeRenderDivX: ", relativeRenderDivX);
        console.log("relativeRenderDivY: ", relativeRenderDivY);

        let absoluteRenderDivX = Math.floor(windowOriginX + relativeRenderDivX); // x-offset where is rendered plaintext on canvas
        let absoluteRenderDivY = Math.floor(windowOriginY + relativeRenderDivY); // y-offset where is rendered plaintext on canvas
        console.log("absoluteRenderDivX: ", absoluteRenderDivX);
        console.log("absoluteRenderDivY: ", absoluteRenderDivY);

        console.log("default_settings:", default_settings);

        // WYSIWYS box scrollbar sizes
        var scrollbarXAxisHeight = $("#renderDiv").height() - $("#renderDiv_scrollbarWrapper").height();
        var scrollbarYAxisWidth = $("#renderDiv").width() - $("#renderDiv_scrollbarWrapper").width();
        console.log("$(#renderDiv).height(): ", $("#renderDiv").height());
        console.log("$(#renderDiv).width(): ", $("#renderDiv").width());
        console.log("$(#renderDiv_scrollbarWrapper).height(): ", $("#renderDiv_scrollbarWrapper").height());
        console.log("$(#renderDiv_scrollbarWrapper).width(): ", $("#renderDiv_scrollbarWrapper").width());
        console.log("scrollbarXAxisHeight: ", scrollbarXAxisHeight);
        console.log("scrollbarYAxisWidth: ", scrollbarYAxisWidth);

        // Dimensions of the visible part of the WYSIWYS box (ie. not including the scrollbars or overflow content)
        var renderDivWidth = $("#renderDiv").width() - scrollbarYAxisWidth;
        var renderDivHeight = $("#renderDiv").height() - scrollbarXAxisHeight;
        console.log("renderDivWidth: ", renderDivWidth);
        console.log("renderDivHeight: ", renderDivHeight);
        // Absolute coordinates of the first pixel at the top left of the render div (relative to the edges of the whole screen)
        let plaintextOffsetX = 0; // for HTML we do not play with offset
        let plaintextOffsetY = 0;

        if (textFont !== undefined) {
            console.log("textFont.size:", textFont.size);
            console.log("textFont.width:", textFont.width);
            console.log("textFont.descent:", textFont.descent);
        } else {
            console.log("we have no 'textFont' variable. Is is a HTML render?");
        }
        console.log("mimeType:", mimeType);
        let ocrAreaWidth = Math.trunc(renderDivWidth);
        let ocrAreaHeight = Math.trunc(renderDivHeight);
        if (mimeType === "text/plain") {
            plaintextOffsetX = default_settings.plaintext.offsetX;
            plaintextOffsetY = default_settings.plaintext.offsetY;
            console.log("============= HORIZONTAL SHIFT =======================");
            console.log("renderDiv.scrollLeft:", renderDiv.scrollLeft);
            if (default_settings.plaintext.offsetX - renderDiv.scrollLeft < 0) {
                let invisibleChars = (renderDiv.scrollLeft - default_settings.plaintext.offsetX) / textFont.width;
                let fractionVisible = 1 - (invisibleChars % 1);
                let fractionVisiblePx = Math.floor(fractionVisible * textFont.width);
                console.log("invisibleChars:", invisibleChars);
                console.log("fractionVisible:", fractionVisible);
                console.log("fractionVisiblePx:", fractionVisiblePx);
                console.log("plaintextOffsetX:", plaintextOffsetX);
                //if (fractionVisiblePx < textFont.width) { // solves results like 0.996 => char is fully visible though
                plaintextOffsetX = Math.floor(fractionVisiblePx);
                //}
                console.log("plaintextOffsetX:", plaintextOffsetX);
            } else {
            plaintextOffsetX = Math.floor((default_settings.plaintext.offsetX - renderDiv.scrollLeft));
            }
            console.log("============= VERTICAL SHIFT =======================");
            console.log("renderDiv.scrollTop:", renderDiv.scrollTop);
            if (default_settings.plaintext.offsetY - renderDiv.scrollTop < 0) {
                let invisibleChars = (renderDiv.scrollTop - default_settings.plaintext.offsetY) / textFont.size;
                let fractionVisible = 1 - (invisibleChars % 1);
                let fractionVisiblePx = Math.floor(fractionVisible * textFont.size);
                console.log("invisibleChars:", invisibleChars);
                console.log("fractionVisible:", fractionVisible);
                console.log("fractionVisiblePx:", fractionVisiblePx);
                console.log("plaintextOffsetX:", plaintextOffsetY);
                //if (fractionVisiblePx < textFont.width) { // solves results like 0.996 => char is fully visible though
                plaintextOffsetY = Math.floor(fractionVisiblePx);
                //}
                console.log("plaintextOffsetX:", plaintextOffsetY);
            } else {
            plaintextOffsetY = Math.floor((default_settings.plaintext.offsetY - renderDiv.scrollTop));
            }
            absoluteRenderDivX += plaintextOffsetX;
            absoluteRenderDivY += plaintextOffsetY;
            console.log("absoluteRenderDivX: ", absoluteRenderDivX);
            console.log("absoluteRenderDivY: ", absoluteRenderDivY);
            console.log("------------------------------------------------------");
            let absoluteRenderVisibleWidth = Math.trunc(renderDivWidth) - plaintextOffsetX;
            let absoluteRenderVisibleHeight = Math.trunc(renderDivHeight) - plaintextOffsetY;

            let numberOfWholeCharacters = Math.trunc(absoluteRenderVisibleWidth / textFont.width);
            console.log("numberOfWholeCharacters:", numberOfWholeCharacters);

            ocrAreaWidth = Math.trunc(numberOfWholeCharacters * textFont.width);
            console.log("OCR area width:", ocrAreaWidth);
            let numberOfWholeLines = Math.floor(absoluteRenderVisibleHeight / textFont.size);
            console.log("numberOfWholeLines:", numberOfWholeLines);
            ocrAreaHeight = Math.trunc((numberOfWholeLines * textFont.size + textFont.descent));
            if (ocrAreaHeight > absoluteRenderVisibleHeight) {
                ocrAreaHeight -= textFont.size;
            }
            console.log("absoluteRenderVisibleWidth:", absoluteRenderVisibleWidth);
            console.log("absoluteRenderVisibleHeight:", absoluteRenderVisibleHeight);
        }
        console.log("OCR area height:", ocrAreaHeight);
        console.log("------------------------------------------------------");

        // This (red) box will always have the top left corner at the top left of the viewport
        // and bottom right corner anchored at the WYSIWYS box's top-left corner
        // Its position is calculated relative to the whole screen
        //$("body").append(`<div style="position: absolute!important; top: ${-windowOriginY}px; left: ${-windowOriginX}px; width: ${absoluteRenderDivX}px; height: ${absoluteRenderDivY}px; background-color: red; opacity: .8;">Test</div>`)
        
        // This (blue) box will always overlay the render div
        // Its position is calculated relative to the viewport
//		$("body").append(`<div style="position: absolute!important; top: ${(relativeRenderDivY + plaintextOffsetY)/window.devicePixelRatio}px; left: ${(relativeRenderDivX + plaintextOffsetX)/window.devicePixelRatio}px; width: ${ocrAreaWidth/window.devicePixelRatio}px; height: ${ocrAreaHeight/window.devicePixelRatio}px; background-color: blue; opacity: .5;"></div>`)
        console.log("relativeRenderDivY", relativeRenderDivY);
        console.log("plaintextOffsetY", plaintextOffsetY);
        console.log("relativeRenderDivX", relativeRenderDivX);
        console.log("plaintextOffsetX", plaintextOffsetX);
//        $("body").append(`<div style="position: absolute!important; top: ${(relativeRenderDivY + plaintextOffsetY)}px; left: ${(relativeRenderDivX + plaintextOffsetX)}px; width: ${ocrAreaWidth}px; height: ${ocrAreaHeight}px; background-color: blue; opacity: .5;"></div>`)
        console.log("absoluteRenderDivX:", absoluteRenderDivX);
        console.log("windowOriginX:", windowOriginX);
        console.log("relativeRenderDivX:", relativeRenderDivX);
        //console.log(":", );
        console.log("window.outerHeight:", window.outerHeight);
        console.log("window.innerHeight:", window.innerHeight);
        if (!(browserName === "Firefox")) { // Firefox has proper viewport offset in window.mozInnerScreenY
            let toolbarHeight = Math.trunc((currentWindow.outerHeight - currentWindow.innerHeight));
            console.log("Browser toolbar height:", toolbarHeight);
            absoluteRenderDivY += toolbarHeight;
            console.log("absoluteRenderDivY: ", absoluteRenderDivY);
        }
        let rv = {'origin':{'x': absoluteRenderDivX,
                          'y': absoluteRenderDivY},
                'size':{'width': ocrAreaWidth,
                        'height': ocrAreaHeight},
                'bbox': bbox,
                'plaintextOffset': {x: plaintextOffsetX, y: plaintextOffsetY}
               };
        return rv;
    }

    async function createOcrMessage() {
        // we need to send the visible crop of the original image for OCR
        let msg = createMessage("ocr");
        console.log("OCR message");
        //console.log("Image:", $(selectorWrap + "#render"));
        console.log("Image data:", $(selectorWrap + "#render").prop("currentSrc"));
        let imageDataUrl = $(selectorWrap + "#render").prop("currentSrc");
        let scrollOffset = { x : $(selectorWrap + "#renderDiv").scrollLeft(), y : $(selectorWrap + "#renderDiv").scrollTop() };
        let canvasRect = calcCanvasRect();
        msg["canvasRect"] = RectRound(structuredClone(canvasRect));

        // crop only the visible part of the image
        let cropRect = { origin : scrollOffset, size : canvasRect.size }
        cropRect.origin = pointPlusOffset(cropRect.origin, canvasRect.plaintextOffset);
        cropRect = multiplyRectByFactor(cropRect, window.devicePixelRatio);
        cropRect = RectRound(cropRect);
        console.log(`createOcrMessage: crop rectangle: origin: ${cropRect.origin.x}, ${cropRect.origin.y},  `);
        msg['image'] = await getImageCrop(imageDataUrl, cropRect.origin.x, cropRect.origin.y, cropRect.size.width, cropRect.size.height);
        console.log("createOcrMessage: cropped image:", msg['image']);

        return msg;
    }
    // zoom massega from bacground will have proper OS zoom (window.devicePixelRatio) and browser zoom
    // we need to ask background for DPR because Firefox does not get proper results in some cases
    // like browser zoom applied or taskbar on the left side :-O 
    function createGetDisplayInfo() {
        // we need send original render for OCRing
        let msg = createMessage("get-display-info");
        msg.screen = {availTop: window.screen.availTop, availLeft: window.screen.availLeft};
        msg.point = getRenderDivOrigin();
        return msg;
    }
    async function createWysiwysMessage(type) {
        // make sure to use the topmost window
        let currentWindow = window;
        while (currentWindow.frameElement != null) {
            currentWindow = currentWindow.parent;
        }

        let msg = createMessage("wysiwys");
        msg["wysiwysType"] = type;
        msg["data"] = getDataToSign();
        msg["mimeType"] = mimeType;
        msg["pageNumber"] = currentPage;
        msg["pageHeight"] = getPageHeight();
        msg["xOffset"] = $(selectorWrap + "#renderDiv").scrollLeft();
        msg["yOffset"] = $(selectorWrap + "#renderDiv").scrollTop();
//        if (browserName === "Firefox") { // Firefox is better to adjust in content because the window.devicePixelRatio != osZoom * browserZoom but something, something different
            msg["dpr"] = currentWindow.devicePixelRatio;
//        }
//        console.log("window.devicePixelRatio:", window.devicePixelRatio, "mimeType:", mimeType);
//        console.log("typeof window.devicePixelRatio:", typeof window.devicePixelRatio, "typeof mimeType:", typeof mimeType);
        if (type === "ocr") {
            let canvasRect = calcCanvasRect();
            msg["canvasRect"] = canvasRect;
            let scr = {};
            scr.availLeft = currentWindow.screen.availLeft;
            scr.availTop = currentWindow.screen.availTop;
            scr.availWidth = currentWindow.screen.availWidth;
            scr.availHeight = currentWindow.screen.availHeight;
            msg["window"] = {screenX: currentWindow.screenX, screenY: currentWindow.screenY, devicePixelRatio: currentWindow.devicePixelRatio, outerWidth: currentWindow.outerWidth, outerHeight: currentWindow.outerHeight, innerWidth: currentWindow.innerWidth, innerHeight: currentWindow.innerHeight, screen: scr};
            console.log("msg[canvasRect]", msg["canvasRect"]);
        } else {
            msg["dataWindowWidth"] = getRenderingArea().width;
            msg["dataWindowHeight"] = getRenderingArea().height;
            const sampleData = await getWysiwys2DataFromDocument(getDataToSign(), mimeType, currentPage, getPageHeight(), getRenderingArea().width, getRenderingArea().height, settings, window.devicePixelRatio, $(selectorWrap + "#renderDiv").scrollLeft(), $(selectorWrap + "#renderDiv").scrollTop(), getTransactionId());
            if (sampleData.data && sampleData.data.length) {
                msg['rendersize'] = {
                    width: Math.round(getRenderingArea().width * window.devicePixelRatio),
                    height: Math.round(getRenderingArea().height * window.devicePixelRatio)
                };
            }

            // if hash is available, send it, otherwise send the data to compute it in the background script
            if (typeof(sampleData.hash) !== "undefined") {
                msg['hash'] = sampleData.hash;
            } else {
                msg['b64data'] = bytesToBase64(sampleData.data.data); // use base64 to avoid serialization deficiencies in Chrome
            }

            msg['samples'] = sampleData.samples;
        }
        return msg;
    }

    function sendMessage(msg) {
        console.log("Sending", msg.subject, "message:", msg);
        browser.runtime.sendMessage(msg); // notify the backend
    }
    function sendGuiRemovedMessage(reason) {
        console.log(reason);
        let msg = createMessage("guiRemoved");
        msg.reason = reason;
        sendMessage(msg);
    }
    // GUI FUNCTIONALITY INJECTION
    function injectGuiFunctionality() {
        window.addEventListener('pagehide', function(){
            sendGuiRemovedMessage("event: pagehide");
        });
        window.addEventListener('unload', function(){
            sendGuiRemovedMessage("event: unload");
        });
        window.addEventListener('beforeunload', function(){
            sendGuiRemovedMessage("event: beforeunload");
        });

        modals = $(selectorWrap + '.modal');

        // generic 'OK' and 'Cancel' buttons
        $(selectorWrap + '.okButton').on("click", function() { toggleDisplay(); }); // jQuery to select all class=okButton
        $(selectorWrap + '.cancelButton').on("click", function() { toggleDisplay(); }); // jQuery to select all class=cancelButton
        document.onkeyup = function(e) {
            if (e.which === 27) { // ESCape key
                toggleDisplay();
            }
        };

        // OVERLAY
        var overlay = $(selectorWrap + "#overlay");
        if (overlay.length) {
            overlay.on("click", function() {
                toggleDisplay();
            });
        }

        // CERTIFICATE TABLES in certificate modals
        var selectCertificate = $(selectorWrap + "#selectCertificate");
        if (selectCertificate.length) {
            signCertificateTable = new CertificateTable("sign", "selectCertificate");
        }

        var viewCertificate = $(selectorWrap + "#viewCertificate");
        if (viewCertificate.length) {
            viewCertificateTable = new CertificateTable("view", "viewCertificate");
        }

        var certificateDetailModal = $(selectorWrap + "#certificateDetailModal");
        if (certificateDetailModal.length) {
            certificateChainAndDetail = new CertificateChainAndDetail('certificateChainDiv', 'certificateDetailsDiv');
        }

        // MENU BUTTONS
        var menuAbout = $(selectorWrap + "#menuAbout");
        if (menuAbout.length) { // detect any container with 'menuAbout' as Id
            menuAbout.on("click", function() { // when id=menuAbout is clicked...
                browser.runtime.sendMessage(createMessage("version"));  // we send this request to Background
                toggleDisplay('about');
            });
        }

        var menuPrint = $(selectorWrap + "#menuPrint");
        if (menuPrint.length) {
            menuPrint.on("click", function() { rawPrint(); });
        }

        var menuCertificates = $(selectorWrap + "#menuCertificates");
        if (menuCertificates.length) {
            menuCertificates.on("click", function() {
                var certMessage = createMessage("certificates");
                ctTxLog[certMessage.transaction] = viewCertificateTable;
                viewCertificateTable.displayMessage("Fetching readers and certificates...");
                browser.runtime.sendMessage(certMessage);
                toggleDisplay('viewCertificate');
            });
        }

        var isRenderingFullyVisible = true; // default, kept if IntersectionObserver is not supported
        // 'Sign' button
        var signButton = $(selectorWrap + "#signButton");
        if (signButton.length) {
            signButton.on("click", async function() {
                signButton.prop('disabled', true);
                if (typeof IntersectionObserver !== 'function' || isRenderingFullyVisible) {
                    let msg;
//                    msg = createGetDisplayInfo(); // we deside how to compare screenshot according to os/browser zoom factor
                    msg = await createWysiwysMessage("v2"); // for first try we use wysiwys2. 'v2' param means nothing, we need just something else than 'ocr'
                    browser.runtime.sendMessage(msg);
                } else {
                    // IntersectionObserver is supported and returned false
                    updateWysiwysWarning(0, isRenderingFullyVisible); // obscured warning
                    toggleDisplay('wysiwysWarning');
                }
            });
        }

        // 'Cancel' button in main screen
        var cancelButton = $(selectorWrap + "#cancelButton");
        if (cancelButton.length) {
            cancelButton.on("click", function() {
                // notify the backend
                browser.runtime.sendMessage(createMessage("guiRemoved"));
                // send abort message to the server
                postData(getReplyUrl(), {"Exception": "USER_ABORT"});
            });
        }

        // 'Sign' button in button mode (skips WYSIWYS check)
        var directSignButton = $(selectorWrap + "#directSignButton");
        if (directSignButton.length) {
            directSignButton.on("click", function() {
                directSignButton.prop('disabled', true);
                $(selectorWrap + '#selectCertificateSignButton').prop('disabled', true);
                var certMessage = createMessage("certificates");
                ctTxLog[certMessage.transaction] = signCertificateTable;
                signCertificateTable.displayMessage("Fetching readers and certificates...");
                browser.runtime.sendMessage(certMessage);
            });
        }

        // MODALS
        // 'Refresh' button in View Certificates modal
        var againButton = $(selectorWrap + "#againButton");
        if (againButton.length) {
            againButton.on("click", function() {
                var certMessage = createMessage("certificates");
                ctTxLog[certMessage.transaction] = viewCertificateTable;
                viewCertificateTable.displayMessage("Refreshing readers and certificates...");
                browser.runtime.sendMessage(certMessage);
                againButton.prop('disabled', true);
            });
        }

        // 'Refresh' button in Select Certificate modal
        var selectCertificateRefreshButton = $(selectorWrap + "#selectCertificateRefreshButton");
        if (selectCertificateRefreshButton.length) {
            selectCertificateRefreshButton.on("click", function() {
                $(selectorWrap + "#selectCertificateSignButton").prop('disabled', true);
                var certMessage = createMessage("certificates");
                browser.runtime.sendMessage(certMessage);
                ctTxLog[certMessage.transaction] = signCertificateTable;
                signCertificateTable.displayMessage("Refreshing readers and certificates...");
                $(selectorWrap + "#signCertificateTable").prop('disabled', true);
            });
        }

        // 'Sign' button in Select Certificate modal
        var selectCertificateSignButton = $(selectorWrap + "#selectCertificateSignButton");
        if (selectCertificateSignButton.length) {
            selectCertificateSignButton.on("click", function() {
                var selectedCertificate = signCertificateTable.getSelectedCertificate(isSingleCertificate);
                if (typeof (selectedCertificate) !== 'undefined') {
                    var readerOk = verifyReader(isSwysTransaction(),
                        signCertificateTable.getReader(selectedCertificate.slotId),
                        getSwysReaderFallback(),
                        signCertificateTable.pinpadLessAuthenticated);
                    if (readerOk == false) {
                        toggleDisplay('errorModal');
                    } else {
                        $(selectorWrap + ".selectedCertificate").text(selectedCertificate.certificateX509.subject.commonName);
                        if (signCertificateTable.isSlotPinPad(selectedCertificate.slotId) == true) {
                            var msg = createSignMessage();
                            msg["data"] = getDataToSign();
                            msg["mimeType"] = mimeType;
                            msg["signatureType"] = getSignatureType();
                            msg["slotId"] = selectedCertificate.slotId;
                            msg["certificateId"] = selectedCertificate.certificateId;
                            msg["certificateHash"] = selectedCertificate.certificateHash;
                            msg["pin"] = "";
                            /* check for and include SWYS data if present (SWYS only)*/
                            if (signCertificateTable.isSlotSwys(selectedCertificate.slotId) == true) {
                                var swysMessage = getSwysMessage();
                                if (typeof swysMessage !== "undefined") { msg["swysMessage"] = swysMessage; }
                                var swysHiddenData = getSwysHiddenData();
                                if (typeof swysHiddenData !== "undefined") { msg["swysHiddenData"] = swysHiddenData; }
                                var swysType = getSwysType();
                                console.warn("swysType: " + swysType);
                                if (typeof swysType !== "undefined") { msg["swysType"] = swysType; }
                            }
                            browser.runtime.sendMessage(msg);

                            $(selectorWrap + "#inputPIN").val(""); // erase the PIN entry value
                            if (!modalIsDisplayed('errorModal')) {
                                toggleDisplay('signatureResult', true);
                                $(selectorWrap + "#signatureResultLoading").css('display', 'none');
                                $(selectorWrap + "#signatureResultMessage").html("<span>Check your PIN pad for instructions ...</span>");
                            }
                        } else {
                            $(selectorWrap + "#inputPIN").val(""); // erase the PIN entry value
                            toggleDisplay('enterPIN');
                        }
                    }
                    selectCertificateSignButton.prop('disabled', true);
                } else {
                    // error state
                    toggleDisplay('errorModal');
                }
            });
        }

        // 'Sign anyway' in WYSIWYS warning modal
        var wysiwysWarningSignButton = $(selectorWrap + "#wysiwysWarningSignButton");
        let disable_sign_anyway = getHtmlParameter("disable_sign_anyway", "boolean", "false");
        console.log("disable_sign_anyway = ", disable_sign_anyway);
        if (disable_sign_anyway == true) {
            wysiwysWarningSignButton.prop('disabled', true);
            wysiwysWarningSignButton.prop('title', 'Disabled');
            console.log('Button "Sign anyway" is disabled');
        } else {
            if (wysiwysWarningSignButton.length) {
                wysiwysWarningSignButton.on("click", function() {
                    $(selectorWrap + '#wysiwysWarningSignButton').prop('disabled', true);
                    $(selectorWrap + '#selectCertificateSignButton').prop('disabled', true);
                    var certMessage = createMessage("certificates");
                    ctTxLog[certMessage.transaction] = signCertificateTable;
                    signCertificateTable.displayMessage("Fetching readers and certificates...");
                    browser.runtime.sendMessage(certMessage);
                });
            }
        }

        // 'Zoom go ahead' in WYSIWYS warning modal
        var zoomWarningGoAheadButton = $(selectorWrap + "#zoomWarningGoAheadButton");
        if (zoomWarningGoAheadButton.length) {
            zoomWarningGoAheadButton.on("click", async function() {
                $(selectorWrap + '#zoomWarningGoAheadButton').prop('disabled', true);
                toggleDisplay();
                $(selectorWrap + '#zoomWarningGoAheadButton').prop('disabled', false);
                let msg = await createWysiwysMessage("ocr");
                setTimeout(function(){browser.runtime.sendMessage(msg);}, 150); // wait for the overlay animation to finish before doing backend OCR
            });
        }

        // Typing in PIN entry modal
        var inputPIN = $(selectorWrap + "#inputPIN");
        if (inputPIN.length) {
            inputPIN.on("keyup", function(e) {
                var isEmpty = (inputPIN.val() === "");
                $(selectorWrap + "#enterPINOKButton").prop('disabled', isEmpty);
                if (!isEmpty && inputPIN.is(':visible') && e.which === 13) { // ENTER key
                    $(selectorWrap + "#enterPINOKButton").trigger('click');
                }
            });
        }

        // 'OK' button in PIN entry modal
        var enterPINOKButton = $(selectorWrap + "#enterPINOKButton");
        if (enterPINOKButton.length) {
            enterPINOKButton.on("click", function() {
                console.log("signCertificateTable: enterPINOKButton clicked");
                var selectedCertificate = signCertificateTable.getSelectedCertificate();
                if (typeof (selectedCertificate) != 'undefined') {
                    var msg = createSignMessage();
                    msg["data"] = getDataToSign();
                    msg["mimeType"] = mimeType;
                    msg["signatureType"] = getSignatureType();
                    msg["slotId"] = selectedCertificate.slotId;
                    msg["certificateId"] = selectedCertificate.certificateId;
                    msg["certificateHash"] = selectedCertificate.certificateHash;
                    msg["pin"] = $(selectorWrap + "#inputPIN").val();
                    browser.runtime.sendMessage(msg);
                    $(selectorWrap + "#inputPIN").val(""); // erase the PIN entry value

                    if (!modalIsDisplayed('errorModal')) {
                        toggleDisplay('signatureResult', true);
                        enterPINOKButton.prop('disabled', true);
                        $(selectorWrap + "#signatureResultLoading").css('display', 'initial'); // reset the loading animation in the signatureResult modal
                        $(selectorWrap + "#signatureResultMessage").html("<span>Waiting for signature...</span>"); // Reset the message
                    }
                } else {
                    console.warn("Trying to sign with zero or more than one certificate selected, aborting");
                    toggleDisplay();
                }
            });
        }
        // 'Cancel' button in PIN entry modal
        var enterPINCancelButton = $(selectorWrap + "#enterPINCancelButton");
        if (enterPINCancelButton.length) {
            enterPINCancelButton.on("click", function() {
                $(selectorWrap + "#inputPIN").val("");
                $(selectorWrap + "#enterPINOKButton").prop('disabled', true);
            });
        }

        // verification button
        var verificationResult = $(selectorWrap + "#verificationResult");
        if (verificationResult.length) {
            verificationResult.on("click", function() {
                toggleDisplay('verificationResultModal');
            });
        }

        // 'signed by' certificate details
        var signatureCertificatesBtn = $(selectorWrap + "#signatureCertificatesBtn");
        if (signatureCertificatesBtn.length) {
            signatureCertificatesBtn.on("click", function() {
                toggleDisplay('certificateDetailModal');
            });
        }

        if (getMode() == 'button') {
            var buttonLabel = getButtonLabel();
            if (buttonLabel) {
                if (buttonLabel.length > boundaries.buttonLabel) {
                    console.warn(`'button_label' attribute exceeds maximum length and was cropped (${buttonLabel.length}/${boundaries.buttonLabel} characters)`);
                    buttonLabel = buttonLabel.slice(0, boundaries.buttonLabel) + '…';
                }
                console.log("Sign button label has been replaced with: " + buttonLabel);
                $(selectorWrap + "#directSignButton").text(buttonLabel);
            }
        } else {
            var intersectionOptions = {
                root: null, // viewport
                rootMargin: '0px',
                threshold: [.99, 1]
            };

            function intersectionCallback(entries) {
                entries.forEach(function(entry) {
                    isRenderingFullyVisible = (entry.intersectionRatio >= 1);
                });
            }

            var renderScrolls = new CustomScrollbars("renderDiv", "render");

            if (typeof IntersectionObserver === 'function') { // using IntersectionObserver if supported
                var observer = new IntersectionObserver(intersectionCallback, intersectionOptions);
                observer.observe(renderScrolls.element);
            }

            // CUSTOM SCROLLBARS over rendered data (see customScrollbars.js for definition)
            $(selectorWrap + "#render").on("load", renderScrolls.update); // update the scrollbars whenever new rendered image is loaded
        }

        // Re-render the data when the dPR changes (browser/screen zoom changes)
        function dprChangeEventHandler() {
            // renew the dPR change handler
            // - needed because the event triggers only when the query's 'matches' property changes
            console.log("dPR has changed to", window.devicePixelRatio);
            matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`).addEventListener("change", dprChangeEventHandler, { once : true });
            
            // redraw the render
            getImageFromData(dataToDisplay, mimeType, currentPage, getPageHeight(), getRenderingArea().width, getRenderingArea().height, settings, window.devicePixelRatio, backendError)
            .then(image => {
                textFont = image.textFont;
                showCanvasImage(image.dataURL, image.width, image.height, pageCount, image.exception);
            });
        }

        // set-up the dPR change handler
        console.log("Setting up dPR change handler");
        matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`).addEventListener("change", dprChangeEventHandler, { once : true });
    }

    // if there's an onMessage listener already, remove it
    if (weAreListening) {
        browser.runtime.onMessage.removeListener(currentListener);
    }
    // and add a new one
    browser.runtime.onMessage.addListener(onMessageListener);
    weAreListening = true;
    currentListener = onMessageListener;

    // Processes incoming messages (just from the background at the moment)
    async function onMessageListener(message, sender, sendResponse) {
        browser.storage.local.get("logger", function(result) {
            if (result && result.logger) {
                activateLogStorage();
            };
        });

        var changes = {};
        if (message.image) {
            changes['image'] = "base 64 encoded data (" + message.image.length + " characters)";
        }
        if (message.signature) {
            changes['signature'] = "base 64 encoded data (" + message.signature.length + " characters)";
        }
        var sanitizedMessage = Object.assign({}, message, changes);

        // message subject is always lowerCase
        message.subject = ('' + message.subject).toLowerCase(); // implicit type coercion prevents error if message.subject is undefined

        console.log("Message received by Content: ", sanitizedMessage);
        if (message.from === 'background') { // We listen to Background.js
            if (message.subject === "disconnect" || message.transaction == getTransactionId()) {
                console.log("Transaction ID " + message.transaction + " matches stored value - OK");
                clearTransactionId();
            } else {
                console.log("Transaction ID " + message.transaction + " does not match stored value - giving up.");
                return;
            }
            switch (message.subject) {
                case "disconnect":
                    console.log('disconnect message');
                    disconnectedMessage();
                    updateErrorModal("Disconnected Backend", "The backend for the WebSigner has disconnected.", false);
                    toggleDisplay('errorModal');
                    break;
                case "backend-error":
                    backendError = message.error;
                    getImageFromData(dataToDisplay, mimeType, currentPage, getPageHeight(), getRenderingArea().width, getRenderingArea().height, settings, window.devicePixelRatio, backendError)
                    .then(image => {
                        textFont = image.textFont;
                        showCanvasImage(image.dataURL, image.width, image.height, pageCount, image.exception);
                    });
                    break;
                case "version":
                    $(selectorWrap + '#WebExVersion').html('Frontend: <span>' + browser.runtime.getManifest().version + '</span><br>Backend: <span>' + message.version + '</span>');
                    $(selectorWrap + '#WebExBuildInfo').html('rev #' + getHgRevision() + '/' + getHgRevisionHash() + '<br>Built on ' + getBuildMachine());
                    $(selectorWrap + '#about.modal').center("main");
                    break;
                case "certificates":
                    if ((message.exception !== undefined || message.certificates === undefined)) {
                        // message.exception is mostly displaying a not-so-useful 'internal error' message for this usecase, so we wont use it
                        updateErrorModal("Get Certificates Process Aborted", "Retrieving certificates resulted in an unexpected error.\nPlease remove any smartcard from your reader(s) and try again.", false);
                        toggleDisplay('errorModal');
                    } else {
                        $(selectorWrap + '#againButton').prop('disabled', false);
                        console.log("Certificates received");
                        // get the certificate table to display the readers and certificates. we need to do that even if only1, because we need to select it
                        ctTxLog[message.transaction].displayCertificates(message.readers, message.certificates, message.pinpadLessAuthenticated);
                        if (ctTxLog[message.transaction].id_.indexOf('sign') > -1) { // sign mode, not just viewing the certificates
                            if (ctTxLog[message.transaction].filterCertificates(message.certificates).length == 1) { // only1 certificate
                                console.warn('Only one certificate remaining after filtering, auto-selected for signing', ctTxLog[message.transaction].filterCertificates(message.certificates));
                                isSingleCertificate = true;
                                $(selectorWrap + '#selectCertificateSignButton').trigger('click', [isSingleCertificate]);
                            } else { // more than one certificate: prompt user to select the right one
                                isSingleCertificate = false;
                                toggleDisplay('selectCertificate');
                                $(selectorWrap + '#selectCertificate').center("main");
                            }
                        } else {
                            $(selectorWrap + '#viewCertificate').center("main");
                        }
                    }
                    // Unblock buttons now that we've retrieved the certificates
                    $(selectorWrap + '#wysiwysWarningSignButton').prop('disabled', false);
                    $(selectorWrap + '#againButton').prop('disabled', false);
                    $(selectorWrap + '#selectCertificateRefreshButton').prop('disabled', false);
                    $(selectorWrap + "#directSignButton").prop('disabled', false);
                    $(selectorWrap + '#signButton').prop('disabled', false);
                    delete ctTxLog[message.transaction];
                    break;
                case "wysiwys": // result of WYSIWYS check
                    if (message.result == 1) {
                        // display certificate selection
                        $(selectorWrap + '#selectCertificateSignButton').prop('disabled', true);
                        var certMessage = createMessage("certificates");
                        signCertificateTable.displayMessage("Fetching readers and certificates...");
                        ctTxLog[certMessage.transaction] = signCertificateTable;
                        browser.runtime.sendMessage(certMessage);
                    } else {
                        // in case of error for standard wysiwys (v1 or v2) we try OCR (wysiwys v3) if supported
                        // OCR / wysiwys v3 officially introduced in backend version 1.9
                        if (await isBackendVersionAdequate("1.9")) {
                            let disable_ocr = getHtmlParameter("disable_ocr", "boolean", false);
                            if (disable_ocr) {
                                console.log("OCR / WYSIWYS v3 disabled by request.");
                                updateWysiwysWarning(message.result);
                                toggleDisplay('wysiwysWarning');
                            } else {
                                // get OCR of screenshot to avoid some window/mouse movements
                                let msg = await createWysiwysMessage("ocr");
                                browser.runtime.sendMessage(msg);
                            }
                        } else {
                            // display warning to the user
                            console.log("OCR / WYSIWYS v3 unavailable, please consider updating the extension backend to version 1.9 or newer");
                            updateWysiwysWarning(message.result);
                            toggleDisplay('wysiwysWarning');
                        }
                    }
                    break;
                case "wysiwys3": // result of WYSIWYS3 check
                    console.log("=== WYSIWYS3 ===");
                    console.log(message.result);
                    // send canvas for OCR and compare with wysiwys3 result
                    wysiwys3result = message.result;
                    {
                        let msg = await createOcrMessage();
                        browser.runtime.sendMessage(msg);
                    }
                    break;
                case "display-info":
                    console.log("=== DISPLAY INFO ===");
                    console.log("browser.zoom =", message.zoom);
                    console.log("display size:", message.displaySize);
                    console.log("DPR:", message.dpr);
                    // TODO: if someone calls display-info, should know what to do next ;-)
                    break;
                case "ocr":
                    console.log("=== OCR ===");
                    ocrText = message.result;
                    console.log(message.result);

                    // check number of lines at the beginning
                    if (checkOcrResult(wysiwys3result, ocrText)) {
                        ocrText = undefined;
                        wysiwys3result = undefined;
                        // display certificate selection
                        $(selectorWrap+'#selectCertificateSignButton').prop('disabled', true);
                        var certMessage = createMessage("certificates");
                        signCertificateTable.displayMessage("Fetching readers and certificates...");
                        ctTxLog[certMessage.transaction] = signCertificateTable;
                        browser.runtime.sendMessage(certMessage);
                    } else {
                        // display warning to the user
                        updateWysiwysWarning(0);
                        toggleDisplay('wysiwysWarning');
                    }
                    break;
                case "sign":
                    if (message.exception !== undefined) {
                        // received exception
                        toggleDisplay('errorModal');
                        updateErrorModal("Sign Process Aborted", message.exception, false);
                    } else {
                        // signature OK
                        var signatureParam = getSignatureParam();
                        var dataToPost = {"BackendVersion": message.backendVersion};
                        signatureParam.forEach((paramName) => { dataToPost[paramName] = message.signature; });
                        toggleDisplay();
                        postData(getReplyUrl(), dataToPost);
                        browser.runtime.onMessage.removeListener(onMessageListener);
                    }
                    break;
                case "verify":
                    if (typeof (message.exception) == "undefined") {
                        if (typeof (message.criteria) !== "undefined") {
                            updateVerificationResultList('verifyDiv', message.criteria);
                            if (isSignatureValid(message.criteria)) {
                                updateVerificationResultDiv("passed");
                            } else {
                                updateVerificationResultDiv("failed");
                            }
                        }
                    } else {
                        updateVerificationResultDiv("error");
                        updateVerificationResultListError('verifyDiv', message.exception);
                    }
                    if (typeof (message.certificates) !== "undefined" && (message.certificates.length > 0)) {
                        var signatureCertificatesBtn = $(selectorWrap + "#signatureCertificatesBtn");
                        var renderDiv = $(selectorWrap + "#renderDiv").get(0); // jquery selector to javascript element
                        signatureCertificatesBtn.text(message.certificates[0].subject.commonName + ', ' + message.certificates[0].issuer.commonName);
                        // if bottomCtrl is wider than renderDiv width, we crop the button content to take less place
                        if ($(selectorWrap + "#bottomCtrl").width() >= (getRenderingArea().width + renderDiv.offsetWidth - renderDiv.clientWidth)) {
                            signatureCertificatesBtn.text(message.certificates[0].subject.commonName);
                        }
                        certificateChainAndDetail.update(message.certificates);
                        signatureCertificatesBtn.prop('disabled', false);
                    }
                    delete ctTxLog[message.transaction];
                    break;
                case "init":
                case "guiremoved":
                    // known responses but nothing to do    
                    break;
                default:
                    console.warn("Unknown message from Background:", sanitizedMessage);
            }
        } else if (message.from === "diagTools") {
            switch (message.subject) {
                case "startlogs":
                    // catch but do nothing: activateLogStorage is already called at the beginning of the Listener
                    break;
                case "collectlogs":
                    revertConsole();
                    break;
                case "cancellogs":
                    revertConsole();
                    break;
                default:
                    console.warn("Unknown message from Diagnostic Tools:", sanitizedMessage);
            }
        } else if (message.from !== 'content') { // Unknown origin
            console.warn("Message from unknown origin:", sanitizedMessage);
        }
    }

    

    function showCanvasImage(imageDataUrl, imageWidth, imageHeight, pageCount, error, animationSpeed = 'slow') {
        if (pageCount) {
            // animate displaying the data for the first time
            $(selectorWrap + '#render').animate({opacity: 0}, (error) ? 0 : animationSpeed, function() {
                $(this).css({'top': 0, 'width': imageWidth + 'px', 'height': imageHeight + 'px'});
                $(this).attr('src', imageDataUrl); // We 'send' the image data to HTML
                $(this).animate({opacity: 1});
            });
            // if data rendered correctly, enable the sign button
            if (pageCount > 0) {
                $(selectorWrap + '#signButton').prop('disabled', false);
            }
            // display multi-page controls only when there is more than 1 page
            if (pageCount > 1 && $('.multiPageCtrlContainer').length < 1) {
                $(selectorWrap + '#multiPageCtrl').parent().addClass("multipage");

                // wait for the image to be ready to have final GUI size before inserting multi-page controls
                $(selectorWrap + '#render').ready(()=>{
                    // style of Mult-page controls depends on settings
                    switch (customerSettings.multiPageCtrl || default_settings.multiPageCtrl) {
                        case "pagination":
                            multiPageCtrls = new PaginationMultiPageCtrl(pageCount);
                            break;
                        case "legacy":
                        default:
                            multiPageCtrls = new LegacyMultiPageCtrl(pageCount);
                    }
                    
                    multiPageCtrls.insertInDom($('#bottomCtrl'));
                    
                    // on page change request to render the data
                    multiPageCtrls.addEventListener('page-change', (page) => {
                        currentPage = page;
                        getImageFromData(dataToDisplay, mimeType, currentPage, getPageHeight(), getRenderingArea().width, getRenderingArea().height, settings, window.devicePixelRatio, error)
                            .then(image => {
                                textFont = image.textFont;
                                showCanvasImage(image.dataURL, image.width, image.height, pageCount, image.exception, 0);
                            });
                    });
                    console.log("Data divided into " + pageCount + " pages " + getPageHeight() + " pixels tall. Showing multi-page controls.");
                });
            } else {
                console.log("Data fits into a single " + getPageHeight() + " pixels tall page. Not showing multi-page controls.");
            }
            // if in verify mode, send verify request
            if (getMode() == 'verify') {
                browser.runtime.sendMessage(
                    {
                        from: "content",
                        transaction: getTransactionId(),
                        subject: "verify",
                        signature: getDataToSign(),
                        signatureType: "pkcs7_basic"
                    }
                );
            }
        } else {
            // do not animate the page flips
            $(selectorWrap + '#render').css({'top': 0, 'width': imageWidth + 'px', 'height': imageHeight + 'px'});
            $(selectorWrap + '#render').attr('src', imageDataUrl); // We 'send' the image data to HTML
        }

        if (error) {
            console.error("An error message was sent by the background. Maybe more information can be found in the background page console?\n\n", error);
            $(selectorWrap + '#signButton').prop('disabled', true).addClass('errorState').attr('title', error);
            $(selectorWrap + '#about p.error').html('<strong>' + error.replace(/\n/g, '<br>') + '</strong>');
            $(selectorWrap + '#bottomCtrl').hide();
            $(selectorWrap + '.multiPage').prop('disabled', true);
            $(selectorWrap + "#directSignButton").unbind('click').on("click", function(event) {
                event.preventDefault();
                toggleDisplay('about');
            });
        }
        resizeGui(error); // resize to default if there is an error message
        $(selectorWrap).css({opacity: 1});
    }

    function postData(url, parameters) {
        // append version info
        parameters["FrontendVersion"] = browser.runtime.getManifest().version;
        parameters["FrontendRevision"] = getHgRevision();
        parameters["FrontendRevHash"] = getHgRevisionHash();

        // append the pass-through parameters (defined in a map in app_settings.js)
        Object.assign(parameters, parameterMapToObject(passThroughParameters));

        // create a form and submit it as a POST to trigger browser redirect
        var form = $('<form>');

        form.attr("method", "post");
        form.attr("action", url);
        form.attr("target", getReplyTarget());

        $.each(parameters, function(key, value) {
            var field = $('<input></input>');

            field.attr("type", "hidden");
            field.attr("name", key);
            field.attr("value", value);

            form.append(field);
        });

        $(document.body).append(form);
        form.submit();
        form.remove();
    }


    function checkOcrResult(wysiwys3result, ocredCanvas) {
        console.log("checkOcrResult, typeof ocrText:", typeof ocrText);

        if (ocredCanvas === undefined) { // compare to the original input text
            let inData = getDataToSign(); // TODO: can be done better way to avoid copying?
            inLines = inData.split('\n');
            inLinesNorm = getDataToSignNormalized();
            console.log("===== NORMALISED IN_DATA =====");
            console.log(inLinesNorm);
            console.log("===== ========== ======= =====");
            let lineNo = 0;
            let inDataIdx = 0;
            let firstMatchLine = -1;
            let match = false;
            for (const line of wysiwys3result) {
                match = false;
                for (; inDataIdx < inLinesNorm.length; inDataIdx++) {
                    let inDataLine = inLinesNorm[inDataIdx];
                    let i = inDataLine.indexOf(line);
                    if (i != -1) {
                        match = true;
                        if (firstMatchLine == -1) {
                            firstMatchLine = inDataIdx;
                        }
                        console.log("line:", lineNo, "found at line:", inDataIdx, "at position:", i);
                        break;
                    }
                }
                if (match == false) {
                    console.log("WYSIWYS failed at", lineNo, "od OCRed result.");
                    break;
                }
                lineNo++;
            }
            return match;
        } else { // compare to the OCRed canvas

            // tessdata missing quick-fix
            if (ocredCanvas.length == 0 & wysiwys3result.length == 0) {
                console.log("Both WYSIWYS3 and OCR returned empty results. Is tessdata present?");
                return false;
            }

            let rv = wysiwys3result.equals(ocredCanvas);
            if (rv === false) {
                console.log("OCR check result comparison failed.");
                logOcrDiff(wysiwys3result, ocredCanvas);

                // try again while ignoring empty lines
                let wysiwys3resultNoEmpty = wysiwys3result.filter(line => line != "");
                let ocredCanvasNoEmpty = ocredCanvas.filter(line => line != "");
                rv = wysiwys3resultNoEmpty.equals(ocredCanvasNoEmpty);
                if ( rv === false ) {
                    console.log("OCR check failed even when ignoring empty lines");
                } else {
                    console.log("OCR check succeeded after ignoring empty lines");
                }
            }
            return rv;
        }
    }

    function findFirstDiffPos(a, b) {
        let i = 0;
        console.log(a, "vs", b);
        if (a === b) return -1;
        if (typeof(a) === "undefined" || typeof(b) === "undefined") return 0;

        while (a[i] === b[i]) i++;
        return i;
    }
    function logOcrDiff(wysiwys3result, ocredCanvas) {
        for (let i = 0; i < Math.min(wysiwys3result.length, ocredCanvas.length); i++) {
            if (wysiwys3result[i] !== ocredCanvas[i]) {
                let idx = findFirstDiffPos(wysiwys3result[i], ocredCanvas[i]);
                console.log(`Line ${i} differs at position ${idx}`);
                console.log(`Canvas OCR     ("${ocredCanvas[i][idx]}"): ${ocredCanvas[i]}`);
                console.log(`Screenshot OCR ("${wysiwys3result[i][idx]}"): ${wysiwys3result[i]}`);
            }
        }
    }

    // get attribute functions, needs input sanitation
    function getDataToSign() {
        if (htmlParameters["in_data_url"]) {
            // In verify mode, the first rendering leads to backend verification: we need to send encoded data, and therefore _not_ dataToDisplay
            if (getMode() === 'verify') {
                return dataEncoded;
            } else {
                return dataToDisplay;
            }
        } else {
            let in_data = htmlParameters["in_data"];
            let in_data_decoded = in_data;

            if (getInDataEncoding() == 'url') {
                in_data_decoded = decodeURIComponent(in_data.replace(/\+/g, ' ')); // according to eSigner standard
            }
            
            return in_data_decoded;
        }
    }

    function getDataToSignNormalized() {
        let inData = getDataToSign();
        let re=/\r\n|\n|\r/g;
        let lines = inData.replace(re,"\n").split("\n");
        let lineNo = 0;
        for (let i = 0; i < lines.length; i++) {
            lines[i] = lines[i].replace(/\s\s+/g, ' '); // whitechars - covers tabs as well
            console.log("LINE:", lines[i]);
//			line = line.replace(/  +/g, ' '); // just spaces
        }
        return lines;
    }

    function getDataFromURL(url) {
        return new Promise(function(resolve, reject) {
            var request = new XMLHttpRequest();
            request.open('GET', getAbsoluteUrl(window.location.href, url));
            request.responseType = 'text';
            request.onload = function() {
                if (request.status === 200) {
                    resolve(request.response);
                } else {
                    reject(Error('No response from the server for this URL.'));
                }
            };
            request.onerror = function() {
                reject(Error('No response from the server for this URL.'));
            };
            request.send();
        });
    }

    /* RAW DATA PRINTING */

    function rawPrint() {
        /* When the Print button is clicked, we generate a temporary unique classname since not() cannot
         * select our custom data attribute, and we toggle this class on #toBePrinted.
         * We then create a temporary media query, a <style> element with the following CSS instructions:
         * (For the purpose of printing and print media type:
         * - hide every children of <html> except elements with the uniqueClassTBP class,
         * - overrule #toBePrinted normal 'display' value,
         * - display only elements with the uniqueClassTBP class)
         * We then populate the first element of uniqueClassTBP with the data (in a <pre> as to preserve formatting).
         * Once the printing is either done or canceled, we remove this temporary <style> and revert classes. */
        var tempPrintStyle = document.createElement('style');
        tempPrintStyle.type = "text/css";
        var selectorTBP = "toBePrinted[" + selectorWS + "]";
        var uniqueClassTBP = "temporary" + Date.now().toString().slice(-4);
        $('#' + selectorTBP).toggleClass(uniqueClassTBP);
        $('#' + selectorTBP).html("<pre class=" + uniqueClassTBP + ">" + sanitize(dataToDisplay) + "</pre>");
        tempPrintStyle.textContent =
            `@media print {
                body * { visibility: hidden !important }
                #${selectorTBP} { width: 100%; display: block !important }
                .${uniqueClassTBP} { position: absolute; top:0; visibility: visible !important }
                ${selectorWrap} { display: none !important }
            }`;
        document.head.appendChild(tempPrintStyle);
        window.print();
        tempPrintStyle.remove();
        $('.' + uniqueClassTBP).toggleClass(uniqueClassTBP);
    }
}

