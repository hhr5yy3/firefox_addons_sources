let countries = 'PL';
var timeout = 3000;
var observer;
let extensionEnabled;
let client;

var observerInstance = {
    createObserver: function () {
        observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                for (var i = 0; i < mutation.addedNodes.length; i++) {
                    replaceNodes(mutation.addedNodes[i]);
                    if (i>100) break;
                }
            })
        });
    },
    startObserver: function () {
        var observerConfig = { attributes: true, childList: true, characterData: true, subtree: true };
        var targetNode = document.body;

        if (observer != null) {
            observer.observe(targetNode, observerConfig);
        }
    },
    stopObserver: function () {
        if (observer != null) {
            observer.disconnect();
        }
    }
}

function replaceNodes(node) {
    observerInstance.stopObserver();
    if (!node)
        return 0;

    for (let i = node.childNodes.length; i-- > 0;) {
        let child = node.childNodes[i];
        if (child.nodeType != undefined) {
            if (child.nodeType == 1) {
                let tag = child.nodeName.toUpperCase();
                var invalidNodes = ['SELECT', 'SCRIPT', 'OBJECT', 'EMBED', 'IFRAME', 'NOSCRIPT', 'STYLE', 'CODE'];
                if (invalidNodes.indexOf(tag) == -1) {
                    replaceNodes(child);
                }
            }
            else if (child.nodeType == 3) {
                replaceFoundedText(child);
            }
        }
    }
    observerInstance.startObserver();
    return 0;
}

function replaceFoundedText(text) {
    let match;
    let matches = [];

    var nbspReplaced = text.data.replace(/\u00a0/g, " "); //replace &nbsp with space
    var firstMatchUnacceptable = validation.unacceptableString(nbspReplaced); // first match before number validation

    const regex = /[\d\+\(][ \d\-\+\.\(\)\/]{7,18}\d\b/g;
    while (match = regex.exec(nbspReplaced)) {
        if (!firstMatchUnacceptable)
            matches.push(match);
    }

    for (let i = matches.length; i-- > 0;) {
        match = matches[i];
        if (isValidNumber(match[0], countries)) {
            text.splitText(match.index);
            text.nextSibling.splitText(match[0].length);
            text.parentNode.replaceChild(replaceNodesCallBack(match[0]), text.nextSibling);
        }
    }
}

function parseLoadingPage() {
    browser.storage.local.get(['extensionEnabled', 'usedClient'], function (data) {
        extensionEnabled = data.extensionEnabled;
        client = data.usedClient;

        if (extensionEnabled) {
            observerInstance.createObserver();
            replaceNodes(document.body);
        }
    });
}

function replaceNodesCallBack(match) {
    let link = document.createElement('a');
    const number = match.match(/[+\d]\d+/g).join('');
    link.style.fontWeight = 'bold';
    link.style.color = "#ff871f";
    link.appendChild(document.createTextNode(match));

    if (client == "cti") {
        link.href = 'pcti://' + number;
    } else {
        link.style.cursor = 'pointer';
        link.onclick = function () {
            callTo(number);
        };
    }
    return link;
}

browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.updateData) {
        location.reload();
        parseLoadingPage();
    }
    if (request.isEnabled || !request.isEnabled) {
        extensionEnabled = request.isEnabled;
        location.reload();
        parseLoadingPage();
    }
});

setTimeout(parseLoadingPage, timeout);
