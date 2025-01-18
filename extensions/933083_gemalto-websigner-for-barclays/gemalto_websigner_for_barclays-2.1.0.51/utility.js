/* Displays a hard-to-miss rectangle for the most serious ('fatal') errors.
* Also throws an error with relevant details (all optional) because why not. */

function errorHandler(code, details, quiet) {
    if (!quiet) {
        var fatalError = $('<p class="fatalError"' + selectorWS + '>'),
            errorContainer = $('<div>').text("Web Signer error: "),
            errorCode = $('<strong>').text(code),
            errorMessage = $('<strong>').text(default_errors[code]); // using app_settings dictionary

        fatalError.css({
            background: '#fff',
            border: '5px solid red',
            cursor: 'help',
            display: 'inline-block',
            margin: '20px auto'
        });
        errorContainer.css({
            border: '1px solid red',
            display: 'block',
            fontFamily: '"Segoe UI", Geneva, Arial, Verdana, sans-serif',
            fontSize: '14pt',
            margin: '5px',
            padding: '5px'
        });

        errorContainer.append([errorCode, '<br>', errorMessage]);
        fatalError.append(errorContainer);
        $('body').append(fatalError);
    }

    if ($(selectorWrap).length) {
        // if the fatal error happens after GUI is displayed (e.g. timeout from in_data_url), we remove it
        $(selectorWrap).remove();
    }

    if (details) {
        if (typeof details === "object") {
            var errorTooltip = "";
            if (details.parameter) {
                errorTooltip += "parameter: " + details.parameter + '\n';
                errorCode.text(errorCode.text() + ' (' + details.parameter + ')');
            }
            if (details.current) {
                errorTooltip += "current value: " + details.current + '\n';
            }
            if (details.reason) {
                errorTooltip += "reason: " + (details.reason ? details.reason : "");
            }
            fatalError.attr('title', errorTooltip);
        } else if (typeof details === "string") {
            fatalError.attr('title', details);
        }
    } else {
        fatalError.css({cursor: 'default'});
    }

    console.warn("Frontend version: " + browser.runtime.getManifest().version);
    console.error(code, details ? details : '\n' + default_errors[code]); // error message in case throw is hidden in storage.get
    throw new Error(code);
}

/* Checks certfilter_ku parameter validity, returns null if there is an error */
function getCertFilter() {
    var certFilter = getKeyUsage().toString();

    if (certFilter.search(/[^\w:]/g) >= 0) { // contains a special character that is not a colon
        return null;
    }
    if (certFilter.indexOf(':') >= 0) { // contains a colon, two values format A:B
        certFilter = certFilter.split(':');
        var requiredOnes = certFilter[0], requiredZeros = certFilter[1];

        if (requiredOnes.length == 0) { // if certfilter_ku=:B, A will be empty string: retrieve default value.
            requiredOnes = default_keyUsage.ones;
        }
        if (requiredZeros.length == 0) { // if certfilter_ku=A:, B will be empty string: retrieve default value.
            requiredZeros = default_keyUsage.zeros;
        }

        if (isNaN(requiredOnes)) { // if A is not a number, check if it is a keyword defined in app_settings
            requiredOnes = default_keyUsage[requiredOnes];
        }
        if (isNaN(requiredZeros)) { // and again with B
            requiredZeros = default_keyUsage[requiredZeros];
        }

        if (isNaN(requiredOnes) || isNaN(requiredZeros)) {
            // if this keyusage is not a number and is not a keyword defined in app_settings, it is undefined == NotANumber
            return null;
        } else { // A:B are now both numbers (hex or decimals)
            return [requiredOnes, requiredZeros];
        }
    } else { // no colon, single value format A (implicit A:defaultZeros)
        if (isNaN(certFilter)) {
            certFilter = default_keyUsage[certFilter];
        }
        if (isNaN(certFilter)) { // still not a number?
            return null;
        } else {
            return [certFilter, default_keyUsage.zeros];
        }
    }
}

/* Checks the source page for webSigner data:
* Maximum of one webSigner div should be present (returns the div).
* If there are zero or more than one webSigner divs in the page, this fn throws an exception. */
function checkSourcePage(skipParams) {
    $(".fatalError[" + selectorWS + "]").remove();
    var webSignerDiv = $("div#websigner"),
        guiParts = $('[' + selectorWS + ']');

    console.log("checkSourcePage(): Found " + webSignerDiv.length + " Web Signer data divs");
    if (webSignerDiv.length > 1) {
        errorHandler("TOO_MANY_WEBSIGNER_DIVS", {
            reason: webSignerDiv.length + " div#websigner in the DOM"
        });
    } else if (webSignerDiv.length == 0) {
        errorHandler("MISSING_WEBSIGNER_DIV");
    } else {
        if (guiParts.length > 0) { // parts of the GUI are present and not properly cleaned up at this time
            identifiedParts = "";
            guiParts.each(function(i, el) {
                part = el.tagName.toLowerCase();
                part += (el.id) ? '#' + el.id : "";
                part += (el.className) ? '.' + el.className : "";
                part += (el.rel) ? ' (' + el.rel + ')' : ""; // css most of the time
                identifiedParts += '\n• ' + part;
            });
            errorHandler("GUI_PARTS_ALREADY_PRESENT", {
                reason: guiParts.length + " elements must be removed" + identifiedParts
            });
        }
        if ($("embed[type='application/x-esigner']").length > 0) { // eSigner embed was found
            $("embed[type='application/x-esigner']").remove();
        }
        if (!skipParams) { // see htmlParameters definition in content.js
            checkWebSignerParameters();
        }
    }

    return webSignerDiv;
}

function checkWebSignerParameters() {
    if (getHtmlParameter("in_data_url") && getHtmlParameter("in_data")) {
        errorHandler("DATA_SOURCE_ERROR");
    } else if (!getHtmlParameter("in_data_url") && !getHtmlParameter("in_data")) {
        errorHandler("MISSING_DATA_SOURCE");
    }

    if ((!getHtmlParameter("reply_url")) && (getMode() !== 'verify')) {
        errorHandler("INSUFFICIENT_PARAMETERS", {
            parameter: "reply_url"
        });
    }

    if (getHtmlParameter("swys_message") && getHtmlParameter("swys_type")) {
        checkSwysLength(); // next: other set of checks
    } else if (getHtmlParameter("swys_message") || getHtmlParameter("swys_type")) {
        errorHandler("INSUFFICIENT_PARAMETERS", {
            parameter: (getSwysMessage() ? "swys_type" : "swys_message"),
            reason: (getSwysMessage() ? "swys_type" : "swys_message") + " is mandatory if " + (getSwysMessage() ? "swys_message" : "swys_type") + " is used"
        });
    }

    if (getCertFilter() === null) {
        errorHandler("WRONG_PARAMETER", {
            parameter: "certfilter_ku",
            current: getKeyUsage(),
            reason: "illegal character"
        });
    }
    getSignatureType();
}

function sanitize(str) {
    if (typeof str === 'string') {
        return str.replace(/</gm, '&lt').replace(/>/gm, '&gt');
    } else {
        console.warn("Failed to sanitize data because it is not a string.");
        return str;
    }
}

function getReplyUrl() {
    return getHtmlParameter("reply_url", "string", undefined);
}

function getSignatureParam() {
    var param = getHtmlParameter("signature_param", "string", undefined);
    const validValues = [];
    if (!param) {
        if ((typeof customerSettings !== 'undefined') && customerSettings.signatureParam) {
            param = customerSettings.signatureParam;
        }
    } else {
        const paramsAsArray = param.replaceAll(" ", "").split(",");
        paramsAsArray.forEach((val) => {
            if (val === "Signature_Data" || val === "Signature") {
                validValues.push(val);
            }
        });
    }
    if (validValues.length === 0) {
        validValues.push("Signature_Data");
    }
    return validValues;
}

function getSignatureType() {
    let sigType = getHtmlParameter("signature_type", "string", "pkcs7_basic");
    if (sigType !== "pkcs7_basic" && sigType !== "pkcs7_detached") {
        errorHandler("WRONG_PARAMETER", {
            parameter: "signature_type",
            current: sigType,
            reason: "unsupported"
        });
    }
    console.log("Signature type: '" + sigType + "'");
    return sigType;
}

function getMode(verbose) {
    var recognizedValues = ['sign', 'button', 'verify', 'deferred'],
        defaultValue = recognizedValues[0],
        value = htmlParameters['mode'];

    // the mode value must be present
    if (typeof (value) !== 'undefined') {
        if (!!(recognizedValues.indexOf(value) + 1)) { // force boolean
            return value;
        } else if (verbose) {
            console.log(`'data-mode' attribute value not recognized ('${value}') assuming '${defaultValue}'`);
        }
    } else if (verbose) {
        console.log(`'data-mode' attribute undefined, using default value (${defaultValue})`);
    }
    return defaultValue;
}

function getRenderingArea(verbose) {
    // if tdw_ attribute is undefined, we try gui_ attribute, and lastly default_settings
    var width = getGUIWidth(),
        height = getGUIHeight(),
        leeway = 50,
        borderWidth = 1;
        legacyScrollbarBuffer = 17

    if (width > 0) { // if gui_width is valid value, we need to calculate available space for rendering
        width = width - $(selectorWrap + '#menu').width() - leeway;
    } else {
        width = getDataWindowWidth();
    }

    if (height > 0) { // if gui_height is valid value, we need to calculate available space for rendering
        height -= $(selectorWrap+'#above').outerHeight(true) + 
        ($(selectorWrap+'#middle').outerHeight(true) - $(selectorWrap+'#middle').outerHeight(false)) + $(selectorWrap+'#below').outerHeight(true) + 2 * borderWidth + legacyScrollbarBuffer;
    } else {
        height = getDataWindowHeight();
        console.log("height ", height);
    }

    if (verbose) {
        console.log('w:', width, 'menu: ', $(selectorWrap + '#menu').width());
        console.log('h:', height, 'above: ', $(selectorWrap + '#above').height(), 'below: ', $(selectorWrap + '#below').height());
    }

    console.log(`getRenderingArea(): ${width}x${height}`);

    // floored values since jquery functions width() and height() may return decimals
    return {
        width: Math.floor(width),
        height: Math.floor(height)
    };
}

/* Retrieves parameter from #websigner. If undefined is passed to type, no type check will be made */
function getHtmlParameter(name, type, defaultValue) {
    var attributeName = 'data-' + name;
    var value = htmlParameters[name];

    if (typeof value !== 'undefined' && value.toString().length != 0) {
        if (!type || typeof value == type) {
            return value;
        } else {
            console.log(`'${attributeName}' attribute is not a ${type} but a ${typeof value} instead`);
        }
    } else if (typeof defaultValue !== "undefined") {
        console.log(`'${attributeName}' attribute is not defined in the HTML, using default value (${defaultValue})`);
    }

    return defaultValue;
}

/*
    Takes a parameter map and a function for reading parameter and produces an object
    with the parameters' names and values

    Params:
    * map - a map of input parameter names (the key) and output parameter names (the value)
    * paramGetFunction - (optional) a function for getting the values of the parameters.
                         If not specified, getHtmlParameter function is used.

    Returns:
    An object output parameters and their values

*/
function parameterMapToObject(map, paramGetFunction) {
    paramGetFunction = paramGetFunction || getHtmlParameter;
    let result = {};
    map.forEach((outputParamName, inputParamName) => {
        let parameterValue = paramGetFunction(inputParamName);
        if (typeof parameterValue !== 'undefined') {
            result[outputParamName] = parameterValue;
        }
    });
    return result;
}

function getGUIWidth() {
    return getHtmlParameter("gui_width", "number");
}

function getGUIHeight() {
    return getHtmlParameter("gui_height", "number");
}

function getDataWindowWidth() {
    return getHtmlParameter("tdw_width", "number", default_settings.width);
}

function getDataWindowHeight() {
    return getHtmlParameter("tdw_height", "number", default_settings.height);
}

function getPageHeight() {
    return getHtmlParameter("page_height", "number", default_settings.height);
}

function getKeyUsage() {
    return getHtmlParameter("certfilter_ku", undefined, default_keyUsage.ones + ':' + default_keyUsage.zeros);
}

function getSwysMessage() {
    return getHtmlParameter("swys_message", "string", undefined);
}

function getSwysHiddenData() {
    return getHtmlParameter("swys_hidden_data", "string", undefined);
}

function getSwysType() {
    return getHtmlParameter("swys_type", "string", undefined);
}

function getSwysReaderFallback() {
    return getHtmlParameter("swys_reader_fallback", "string", undefined);
}

function getButtonLabel() {
    return getHtmlParameter("button_label", "string", undefined);
}

function getReplyTarget() {
    return getHtmlParameter("reply_target", "string", "_self");
}

function getInDataEncoding() { // if we need another value for this parameter, rework this following getMode() model
    return getHtmlParameter("in_data_encoding", "string", undefined);
}

function isSwysTransaction() {
    var sm = getSwysMessage();
    var sh = getSwysHiddenData();
    var st = getSwysType();
    return ((sm !== undefined && sm !== "") || (sh !== undefined && sh !== "") || (st !== undefined && st !== ""));
}

function isSwysReader(reader) {
    return ((typeof reader.flags.swys === "object") &&
        typeof reader.flags.swys[0] != 'undefined' && reader.flags.swys[0] !== "");
}

function checkSwysLength() {
    var messageLength = (new TextEncoder('utf-8').encode(getSwysMessage())).length,
        hiddenLength = getSwysHiddenData() ? (new TextEncoder('utf-8').encode(getSwysHiddenData())).length : 0,
        maxMessageLength = 200, maxHiddenLength = 127, maxCombinedLength = 217;

    if (messageLength > maxMessageLength) {
        errorHandler("WRONG_PARAMETER", {
            parameter: "swys_message",
            current: messageLength + "/" + maxMessageLength,
            reason: "too long"
        });
    }
    if (hiddenLength > maxHiddenLength) {
        errorHandler("WRONG_PARAMETER", {
            parameter: "swys_hidden_data",
            current: hiddenLength + "/" + maxHiddenLength,
            reason: "too long"
        });
    }
    if ((hiddenLength + messageLength) > maxCombinedLength) {
        errorHandler("WRONG_PARAMETER", {
            parameter: "swys_message, swys_hidden_data",
            current: (hiddenLength + messageLength) + "/" + maxCombinedLength,
            reason: "parameters combined are too long"
        });
    }
}

function updateErrorModal(title, message, canBypass = false) {
    console.warn('Error: ' + title + '\n' + message);
    $(selectorWrap + "#errorModalTitle").text(title);
    $(selectorWrap + "#errorModalMessage").text(message);
    if (canBypass == false) { // in sign/verify, users will still be able to click anywhere on the overlay and hide modal
        $(selectorWrap + "#errorModalBypassButton").hide();
    }
}

// WYSWYS messages and behaviour are customizable, this function changes HTML directly
function updateWysiwysWarning(result, isRenderingFullyVisible = true) {
    var warningMsg = $(selectorWrap+"#wysiwysWarningMessage");

    if (!isRenderingFullyVisible) {
        // (frontend) through IntersectionObserver we know that the browser does not display the whole data 
        warningMsg.html(Messages.WYSIWYS_TITLE + Messages.WYSIWYS_NOT_FOUND + Messages.WYSIWYS_NOT_FULLY_VISIBLE + Messages.WYSIWYS_END);
    } else if (result == -1) {
        // (frontend) no samples could be retrieved for wysiwys2
        warningMsg.html(Messages.WYSIWYS_TITLE + Messages.WYSIWYS_NOT_FOUND + Messages.WYSIWYS_NO_SAMPLE + Messages.WYSIWYS_END);
    } else if (result == -2) {
        // no suitable combination of OS zoom and browser zoom
        warningMsg.html(Messages.WYSIWYS_WARNING + Messages.WYSIWYS_ZOOM_NOT_FIT + Messages.WYSIWYS_END);
    } else if (result == 0) {
        // (backend) data could not be found on the screen from the samples given
        warningMsg.html(Messages.WYSIWYS_TITLE + Messages.WYSIWYS_NOT_FOUND + Messages.WYSIWYS_OVERLAY + Messages.WYSIWYS_END);
    } else if (result > 1) {
        // (backend) data was found multiple times on the screen from the samples given
        warningMsg.html(Messages.WYSIWYS_TITLE + Messages.WYSIWYS_MULTIPLE + Messages.WYSIWYS_END);
    } else {
        // result value is unexpected
        warningMsg.html(Messages.WYSIWYS_TITLE + Messages.WYSIWYS_UNEXPECTED_ERROR + Messages.WYSIWYS_END);
    }
}

function verifyReader(swysTransaction, reader, fallback = 'none', pinpadLess = false) {
    console.log("verifyReader: fallback = " + fallback);
    // non pinpad reader has to be authorized
    if (typeof (reader.flags.pinPad) != 'boolean' || reader.flags.pinPad != true) {
        if (typeof (pinpadLess) != 'boolean' || pinpadLess != true) {
            updateErrorModal("Reader security", "Only SWYS or PIN pad readers can be used.");
            return false;
        }
    }
    if (fallback == "any") {
        return true;
    }

    if (swysTransaction == false || isSwysReader(reader)) {
        return true;
    }
    if (fallback == "pinpad") {
        if (typeof (reader.flags.pinPad) == 'boolean' && reader.flags.pinPad == true) {
            return true;
        }
        updateErrorModal("SWYS transaction", "Only SWYS or PIN pad readers can be used.");
        return false;
    } else if (fallback == "none") {
        updateErrorModal("SWYS transaction", "Only SWYS reader can be used.");
        return false;
    }
    updateErrorModal("SWYS transaction", "Something weird happened in reader verification.");
    return false;
}

// Returns if the given url is an absolute URL
function isAbsoluteUrl(url) {
    var re = new RegExp('^([a-z]+://|//)', 'i');
    return (re.test(url));
}

// Returns an absolute URL based on the absolute 'location' and the relative 'url' parameters
// Returns the same string if the 'url' parameter is already an absoulte URL
function getAbsoluteUrl(location, url) {
    if (isAbsoluteUrl(url)) {
        return url;
    } else {
        var base = location.substring(0, location.lastIndexOf('/'));
        return base + '/' + url;
    }
}

function utf8toArr(str) {
    var utf8 = unescape(encodeURIComponent(str));
    var arr = [];
    for (var i = 0; i < utf8.length; i++) {
        arr.push(utf8.charCodeAt(i));
    }
    return arr;
}
function utf8toBase64(string) {
    const binary = utf8toArr(string);
    return bytesToBase64(binary);
}

// add extra fonts to the current document
function loadFonts(fontMap) {
    if ( typeof fontMap === "undefined" ) {
        return; // do nothing if fontMap is not defined
    }
    fontMap.forEach( (fontPath, fontName) => {
        let fontUrl = browser.runtime.getURL(fontPath);
        console.log(`Loading font ${fontUrl} as ${fontName}`);
        
        let fontFace = new FontFace(fontName, `url(${fontUrl})`);
        fontFace.load().then((font) => {
            document.fonts.add(font);
        });
    });
}

function isPromise(p) {
    if (typeof p === 'object' && typeof p.then === 'function') {
        return true;
    }

    return false;
}

 function RectRound(rect) {
    rect.origin.x = Math.round(rect.origin.x);
    rect.origin.y = Math.round(rect.origin.y);
    rect.size.width = Math.round(rect.size.width);
    rect.size.height = Math.round(rect.size.height);
    return rect;
}


 function multiplyPointByFactor(point, factor) {
    let res = {};
    res.x = point.x * factor;
    res.y = point.y * factor;
    return res;
}

function multiplySizeByFactor(size, factor) {
    let res = {};
    res.width = size.width * factor;
    res.height = size.height * factor;
    return res;
}

function multiplyRectByFactor(rect, factor) {
    let res = {};
    res.origin = multiplyPointByFactor(rect.origin, factor)
    res.size = multiplySizeByFactor(rect.size, factor);
    return res;
}

function pointPlusOffset(point, offset) {
    let rv = {};
    rv.x = point.x + offset.x;
    rv.y = point.y + offset.y;
    return rv;
}
function pointMinusOffset(point, offset) {
    let minusOffset = multiplyPointByFactor(offset, -1);
    return pointPlusOffset(point, minusOffset);
}

// Compares two version strings.
// Returns:
//  0 if versions are equal
//  1 if version A > version B
// -1 if version A < version B
function compareVersionStrings(a, b) {
    var aArray = a.split('.'),
        bArray = b.split('.');

    console.log("Comparing version strings:", a, "vs", b);

    for (var i = 0; i < Math.max(aArray.length, bArray.length); i++) {
        var curA = 0;
        if (i < aArray.length) { curA = parseInt(aArray[i]); }
        var curB = 0;
        if (i < bArray.length) { curB = parseInt(bArray[i]); }

        if (Object.is(curA, NaN)) { return -2; }
        if (Object.is(curB, NaN)) { return -2; }
        if (curA > curB) { return 1; }
        if (curA < curB) { return -1; }
    }
    return 0;
}

async function getBackendVersion(){
    if (browserName == "Safari") {
        return browser.runtime.getManifest().version;
    } else {
        const results = await browser.storage.local.get('backendVersion');
        if (results !== undefined && results.backendVersion !== undefined) {
            return results.backendVersion;
        }
    }
    return "unknown";
}

// Decides whether the backend is same or newer than the given version (string)
    // Returns:
    //  False if backend is older
    //  True if backend is of same or newer version
async function isBackendVersionAdequate(v) {
    return (compareVersionStrings(await getBackendVersion(), v) >= 0);
}