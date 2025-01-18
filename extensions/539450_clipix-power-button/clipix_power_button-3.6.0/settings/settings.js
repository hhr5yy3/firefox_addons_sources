var CPBSettings = {
    Options: {},
    Initialize: function () {

        // Resources
        var resx = document.querySelectorAll("[res]");
        for (var i = 0, length = resx.length; i < length; i++) {
            resx[i].textContent = CPBSettings.ResourceRead(resx[i].getAttribute("res"), resx[i].textContent);
        }

        // Load setting
        CPBSettings.LoadSettings();

        // Save button
        document.getElementById('btnSave').addEventListener('click', CPBSettings.SaveSettings);
    },
    LoadSettings: function () {

        chrome.storage.local.get(
        {
            isShowFloatButton: false,
            modeImageHover: "Selected"
        }, function (value) {
            CPBSettings.Options.IsShowFloatButton = value.isShowFloatButton;
            CPBSettings.Options.ModeImageHover = value.modeImageHover;

            // Mode hover
            var radios = document.getElementsByName('rdbModeHover');
            for (var i = 0, length = radios.length; i < length; i++) {
                if (radios[i].value == CPBSettings.Options.ModeImageHover) radios[i].checked = "checked";
            }
        });
    },
    SaveSettings: function () {
        // Mode hover
        var radios = document.getElementsByName('rdbModeHover');
        for (var i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) CPBSettings.Options.ModeImageHover = radios[i].value;
        }

        chrome.storage.local.set({
            modeImageHover: CPBSettings.Options.ModeImageHover
        }, function () {
            var status = document.getElementById("lblStatus");
            status.style.opacity = 1;
            setTimeout(function () {
                status.style.opacity = 0;
            }, 1000);
        });
    },
    ResourceRead: function (key, defaultValue) {
        return (chrome.i18n.getMessage(key) == "") ? defaultValue : chrome.i18n.getMessage(key);
    }
};
document.addEventListener('DOMContentLoaded', CPBSettings.Initialize);