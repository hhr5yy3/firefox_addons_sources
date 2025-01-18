/* 
    CUSTOM.JS aim to customize WebSigner's behaviour depending on customer wants.
    It is used in both contexts: content scripts & background scripts.

    - Dictionary of customizable messages
    - WYSIWYS warning function (messages and even behaviour)
    - Web Signer behaviour after data has been POSTed.
    - PSD2 Compliance ('PIN' removal)
*/

var customerSettings = {
    multiPageCtrl : "pagination",
    assetPrefix: "/barclays/",
    templatePrefix : "/barclays",
    indentSigningId: true,

    overlayOpacity: 0.4,
    
    plaintext: {
        fontFamily: "Menlo, Consolas, monospace",
        fontSize: "1em", // 16px with medium size font
        fontColor: "#333333",
        backgroundColor: "white",
        offsetX: 4,
        offsetY: 4,
        maximumDescent: 4, // reserve some space below the last line for the font's descent
        leading: 16        // distance between two baselines    
    },

    signTimeout: 60
};

// macOS fontsize override
if (platform == "Mac") {
    customerSettings.plaintext.fontSize = "0.875em";
}

// Dictionary of customizable messages, keys ordered alphabetically
const Messages = {
    CUSTOM_TITLE: undefined, // "Digital Signing", // #above #customTitle
    CUSTOM_LOGO: 'assets/img/clientname.png', // #above #customLogo img[data-src]

    // titles for error modal
    READER_SECURITY: "Reader security",
    SIGN_PROCESS_ABORT: "Sign Process Aborted",
    SWYS_TRANSACTION: "SWYS transaction",

    // messages
    CERT_EXPIRED: "The certificate used for signing is expired",
    CERT_NOT_YET_VALID: "The certificate used for signing is not yet valid",
    CERT_BAD_SELECTION: "No certificate selected for this signing, or multiple were selected at once",
    NO_INIT: "Not initialized",
    PIN_LOCKED: "Locked",
    READER_SWYS_BAD_DETECT: "Unable to detect this reader's SWYS capabilities",
    READER_SWYS_ONLY: "Only SWYS reader can be used",
    READER_SWYS_OR_PIN: "Only SWYS or PIN pad readers can be used",
    READER_UNKNOWN: "Something weird happened in reader verification",

    // messages that make up the WYSIWYS warning dialog
    // Barclays: use the same message for all occasions, with an extra for unexpected situations
    WYSIWYS_TITLE: "<span><strong>Signing Security Warning</strong></span><br><br>",
    WYSIWYS_NOT_FOUND : "",
    WYSIWYS_NO_SAMPLE : "",
    WYSIWYS_NOT_FULLY_VISIBLE : "",
    WYSIWYS_OVERLAY : "",
    WYSIWYS_MULTIPLE : "",
    WYSIWYS_UNEXPECTED_ERROR : "An unexpected error occured. Please notify your support.",
    WYSIWYS_END : "When proceeding please check that the last 6 digits of the reference number on the signing window matches the reference number displayed on your device reader.<br><br>" +
    "If the references do not match, please cancel and contact the helpdesk immediately.",

    // fraud warning (if any) in HTML
    FRAUD_WARNING: undefined, /*`<p id="textTitle">FRAUD WARNING – Stop and Think</p>
    <ul id="warningList1">
        <li>Validate new account details. Contact the payee first via a phone number you know &amp; trust</li>
        <li>Barclays will never call / email you to make a payment or request remote control of your PC</li>
    </ul>`,*/

    // multi-page controls
    MULTIPAGE_PREV_PAGE_BUTTON: "\u2039\xa0Prev",
    MULTIPAGE_NEXT_PAGE_BUTTON: "Next\xa0\u203a"
}

// customers extra fonts are loaded here, if necessary
let extraFonts = new Map([
    // ['FontName', 'FontPath.ttf']
    ['ExpertSans-Light', 'barclays/assets/font/ExpertSans-Light.ttf'],
    ['ExpertSans-Regular', 'barclays/assets/font/ExpertSans-Regular.ttf']
]);
