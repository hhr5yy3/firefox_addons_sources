/*
Store the currently selected settings using chrome.storage.local.
*/

function getSince() {
    const since = document.querySelector("#since");
    return since.value;
}

function getTypes() {
    let dataTypes = [];
    const checkboxes = document.querySelectorAll(".data-types [type=checkbox]");
    for (let item of checkboxes) {
        if (item.checked) {
            dataTypes.push(item.getAttribute("data-type"));
        }
    }
    return dataTypes;
}
var storedSettings = {
    since: getSince(),
    dataTypes: getTypes()
};

function storeSettings() {
    function setItem() {
        var txtmessage = document.getElementById("txtmessage");
        txtmessage.textContent = "Options saved";
        setTimeout(function() {
            txtmessage.textContent = "";
        }, 1000);
    }

    function onError(error) {
        console.log(error)
    }
    const since = getSince();
    const dataTypes = getTypes();
    chrome.storage.local.set({
        since,
        dataTypes
    }, function() {
        var txtmessage = document.getElementById("txtmessage");
        txtmessage.textContent = "Options saved";
        setTimeout(function() {
            txtmessage.textContent = "";
        }, 1000);
    });
}

/*
Update the options UI with the settings values retrieved from storage,
or the default settings if the stored settings are empty.
*/
function updateUI(restoredSettings) {
    const selectList = document.querySelector("#since");
    selectList.value = restoredSettings.since;

    const checkboxes = document.querySelectorAll(".data-types [type=checkbox]");
    for (let item of checkboxes) {
        if (restoredSettings.dataTypes.indexOf(item.getAttribute("data-type")) != -1) {
            item.checked = true;
        } else {
            item.checked = false;
        }
    }
}

function onError(e) {
    console.error(e);
}

document.getElementById("releasenotes").textContent = "Fire Clear Cache - v" + chrome.runtime.getManifest().version;
/*
On opening the options page, fetch stored settings and update the UI with them.
*/
chrome.storage.local.get(storedSettings, updateUI);
/*
On clicking the save button, save the currently selected settings.
*/
const saveButton = document.querySelector("#save-button");
saveButton.addEventListener("click", storeSettings);
