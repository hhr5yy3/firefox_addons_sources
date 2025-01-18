window.addEventListener("load", function load(event) {
    window.removeEventListener("load", load, false);
    extension.init();
}, false);

var extension = {
    init: function () {
        let enabledInput = document.getElementById('extensionEnabled');
        let activeLabel = document.getElementById('activeLabel');
        let callButton = document.getElementById('buttonCall');
        let inputNumber = document.getElementById('inputNumber');
        let buttonClear = document.getElementById('buttonClear');
        let extensionEnabled;
        document.addEventListener('keypress', (event) => {
            const keyName = event.key;

            if (keyName === "Enter") {
                callTo(inputNumber.value);
            }
        });

        browser.storage.local.get(['extensionEnabled', 'inputNumber'], function (data) {

            extensionEnabled = (data && data.hasOwnProperty('extensionEnabled')) ? data.extensionEnabled : true;

            enabledInput.checked = extensionEnabled;
            activeLabel.innerText = extensionEnabled ? 'Click2Call aktywny' : 'Click2Call nieaktywny';

            inputNumber.value = (data && data.hasOwnProperty('inputNumber')) ? data.inputNumber : "";

            var iconPath = extensionEnabled ? "images/icon16x16.png" : "images/inactive.png";
            browser.browserAction.setIcon({ path: iconPath });

        })

        enabledInput.addEventListener('click', function (e) {
            extensionEnabled = this.checked;
            browser.storage.local.set({
                'extensionEnabled': extensionEnabled
            });
            activeLabel.innerText = extensionEnabled ? 'Click2Call aktywny' : 'Click2Call nieaktywny';
            var iconPath = extensionEnabled ? "images/icon16x16.png" : "images/inactive.png";
            browser.browserAction.setIcon({ path: iconPath });
            browser.tabs.query({
                active: true,
                currentWindow: true
            }, function (tabs) {
                browser.tabs.sendMessage(tabs[0].id, {
                    isEnabled: extensionEnabled
                });
            });
        });

        callButton.addEventListener('click', function (e) {
            callTo(inputNumber.value);
        });

        buttonClear.addEventListener('click', function (e) {
            inputNumber.value = "";
            browser.storage.local.set({
                "inputNumber": ""
            });
        });
    }
};
