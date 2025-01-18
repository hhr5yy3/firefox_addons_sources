let Panel = document.getElementById("Panel");
Panel.addEventListener("load", function () {
    if (location.href == "https://www.scholarscope.online/Settings.php#ExtensionConfiguration") {
        console.log("UpdateSettingMonitor");
        window.addEventListener('message', function (event) {
            if (event.data == "UpdateScholarscopeConfiguration") {
                chrome.runtime.sendMessage({
                    request: "UpdateExtensionSettings"
                });
            }
        });
    }
});