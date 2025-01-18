var nameMap = {};
nameMap.taskNames = {};
var events = {};
nameMap.taskNames.install = "Installed";
nameMap.taskNames.getId = "getId";
events.installedSuccessfully = "InstalledSuccessfully";


function setInstallListener() {
    try {
        chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
            if (request.method == nameMap.taskNames.install) {
                document.dispatchEvent(new Event(events.installedSuccessfully));
            }
        });
    } catch (err) {
        console.log(err);
    }
}

function installCheck() {
    window.addEventListener('load', function (event) {
        chrome.runtime.sendMessage({task: nameMap.taskNames.getId}, function (response) {
            addElement("is-extension-installed-" + response.id);
        });
    });
}

function addElement(id) {
    var node = document.createElement('div');
    node.id = id;
    document.body.appendChild(node);
}

setInstallListener();
installCheck();

var showOptInPage = "showOptInPage";
nameMap.taskNames.showOptInPage = showOptInPage;
nameMap.taskNames.stateCommunicator = "stateCommunicator";
nameMap.taskNames.loadOptInState = "loadOptInState";

chrome.runtime.sendMessage({task: nameMap.taskNames.loadOptInState}, function (response) {});

document.addEventListener(showOptInPage,function (e) {
    chrome.runtime.sendMessage({task: nameMap.taskNames.showOptInPage}, function (response) {
    });
});