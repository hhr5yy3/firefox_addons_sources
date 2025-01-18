browser.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.type === 'extensionInstalled') {
            addElement(request.data)
        }
    }
);
browser.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.type === 'yesButtonClicked') {
            addElement(request.data)
        }
    }
);

browser.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.type === 'noButtonClicked') {
            addElement(request.data)
        }
    }
);
browser.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.type === 'okayBtnClicked') {
            console.log("request.data.id", request.data.id)
            addElement(request.data.id)
        }
    }
);

function addElement(id) {
    var node = document.createElement('div');
    node.id = id;
    document.body.appendChild(node);
}

document.body.classList.add("extRecipeInstalled");