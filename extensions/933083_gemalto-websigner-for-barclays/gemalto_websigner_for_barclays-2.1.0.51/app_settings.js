const default_settings = {
    width: 600,
    height: 260,

    plaintext: {
        fontFamily: "Menlo, Consolas, monospace",
        fontSize: "0.875em", // 14px with medium size font
        fontColor: "#111111",
        backgroundColor: "white",
        offsetX: 4,
        offsetY: 4
    },

    multiPageCtrl: "legacy"
};

const default_keyUsage = {
    ones: 128,
    zeros: 0, //! implicit value if parameter is single-value
    identity: 192,
    utility: 184
};

const boundaries = {
    canvasDimension: 32767,
    canvasArea: 9000 * 9000, //16384 * 16384, // more than 81Mpx seems to be sometimes troublesome
    pageHeight: 10000,
    buttonLabel: 30 // when exceeding this number, a '…' character will be appended after cropping, so take it into account when defining this value
};

// A map of pass-through parameters [input parameter name -> output parameter name]
// These are read from the websigner div and POSTed along with the signature to the reply url.
// When reading the parameter value, the input parameter name is prefixed with the string 'data-'.
let passThroughParameters = new Map([
    ['reply_tid', 'reply_tid']
]);

const selectorWS = "data-websigner";
const selectorWrap = "#superWrapper[" + selectorWS + "] ";

const logTimeout = 24 * 3600 * 1000; // in millis

// Chrome/Edge has limit of 64MB on sent messages (stringified JSON), applies both to content-background and frontend-backend communication.
// The constant 0.75 expresses the fact we use Base64 encoding to pass signing data to backend (a 33% increase in size)
// and there is a 64kB reserved space for other data sent in the messages
const chromeMaxDataToSignSize = (64 * 1024 * 1024 - 64 * 1024) * 0.75;

const default_errors = {
    "DATA_SOURCE_ERROR": "Conflicting in_data and in_data_url parameters, please remove one.",
    "GUI_PARTS_ALREADY_PRESENT": "Elements in the page with the attribute " + selectorWS + " conflict with GUI injection.",
    "MISSING_DATA_SOURCE": "An in_data or in_data_url parameter must be defined.",
    "MISSING_WEBSIGNER_DIV": "No Web Signer div present in the source page.",
    "TOO_MANY_WEBSIGNER_DIVS": "Too many Web Signer divs found in the source page.",
    "WRONG_INPUT_DATA": "Verify mode: failed to decode input data. Is it base64 encoded?",
    "DATA_TOO_BIG": `Data to sign are too big for the browser's messaging system.\nMaximum data length is ${chromeMaxDataToSignSize}B (~${Math.round(chromeMaxDataToSignSize / (1024 * 1024))}MB).`,

    "INSUFFICIENT_PARAMETERS": "A mandatory parameter in the Web Signer div is missing.",
    "WRONG_PARAMETER": "A parameter in the Web Signer div is incorrect or misconstructed.",

    "RENDERING_BOUNDARIES": "Cannot render the document: boundaries exceeded.",
    "RENDERING_LINE_TOO_LONG": "Cannot render the document: a line is too long.",
    "RENDERING_PAGE_TOO_SMALL": "Cannot render the document: page_height requested is too small."
};

// menu buttons (button.menuItem) whose id is not present in this list will be hidden (feature removed)
const menuButtons = [
    "menuPrint", "menuCertificates", "menuAbout"
]

var htmlParameters = {}; // where html parameters will be retrieved from HTML and stored for this scope/instance of content scripts.

var platform = "Windows";

// platform id based on userAgent is not ideal but it's the best we have at the moment
const macUaRegExp = /^.*\s*\(Macintosh;.*$/;
if (macUaRegExp.test(navigator.userAgent)) {
    platform = "Mac";
}
console.log(`Running on ${platform} (${navigator.userAgent})`);

// In Chrome, extensions access privileged JavaScript APIs using the 'chrome' namespace
// In Firefox, the namespace for JavaScript APIs is called 'browser'
// The following aliasing code ensures that the extension finds the correct API regardless of the browser brand
var browserName = "Firefox";

if (typeof (safari) !== 'undefined') {
    console.log("'safari' object defined - running in Safari");
    browserName = "Safari";
}

if (typeof (browser) === 'undefined') {
    console.log("'browser' namespace not defined - running in Chrome/Edge");
    browserName = "Chrome";
    browser = chrome;
}

