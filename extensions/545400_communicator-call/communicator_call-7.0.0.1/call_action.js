const brandAppName = 'Communicator';
const applicationName = (typeof brandAppName !== 'undefined') ? brandAppName : "Application";

// Onclick callback function.
function glocomOnClick(info, tab) {
    var selection = trimString(info.selectionText);
    if (detectValidNumber(selection)) {
        var number = formatNumber(selection);
        chrome.tabs.update({ url: "glocom://" + number });
    }
};

var id = chrome.contextMenus.create({ "title": 'Call \"%s\" with ' + applicationName, "contexts": ["selection"], "onclick": glocomOnClick });

// Transform selection

function trimString(str) {
    str = str.replace(/^\s+/, '');
    str = str.replace(/\s+$/, '');
    return str;
};

function detectValidNumber(selection) {
    var stripped = selection.replace(/[\s\-\(\)]+/g, '');
    var re = /^\+?[0-9]{3,}$/;
    return re.test(stripped);
};

function formatNumber(number) {
    var formated = number.replace(/[\s\/]+/g, '');
    return formated;
};
