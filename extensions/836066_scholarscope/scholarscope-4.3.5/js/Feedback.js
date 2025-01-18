let manifest = chrome.runtime.getManifest();
if (location.href == "https://blog.scholarscope.online/wizard/" || location.href == "http://blog.scholarscope.online/wizard/") {
    let CurrentVersionFrame = document.getElementById("CurrentVersionFrame");
    let CurrentVersion = document.getElementById("CurrentVersion");
    with (CurrentVersionFrame) {
        style.display = "block";
    }
    with (CurrentVersion) {
        innerText = manifest.version;
    }
}
console.log("Scholarscope Version Checked");
