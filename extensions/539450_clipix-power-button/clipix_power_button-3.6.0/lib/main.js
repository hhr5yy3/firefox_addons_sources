var CPBMain =
{
    ToolbarButton: null,

    UserNotificationTimer: null,
    UserNotificationNeedRefresh: false,

    HandlerUrl: "/BrowserExtensions/PowerButton/v3/Handler/PowerButtonHandler.ashx",

    Options: {

        IsCaptureCropRelative: true,
        ConsoleDebug: false,
        Version: "3.5",
        ContentServer: "www.clipix.com",

        UserNotificationCount: -1,

        ModeImageHover: "Selected",
        HoverSpecificWebsites: [],
        ClipixWebsites: [
            "^([^\.]*?\.|)(clipix|clipixtesting|cxnico)\.com"
        ],
        // No button
        BlackListWebsites: [
            "^(.*?\.|)(mail|docs|play)\.google\.com",
            "^(.*?\.|)flickr\.com",
            "^www\.myregistry\.com\/(addtomrbutton|merchants\/addtomrbutton)",
        ],
        // No iframe CX button
        GrayListWebsites: [
            "^(.*?\.|)twitter\.com"
        ],
        // No Hover
        NoHoverListWebsites: [
            "^(.*?\.|)twitter\.com",
            "^(.*?\.|)facebook\.com",
            "^(.*?\.|)pinterest\.com"
        ],
        Resources: {}
    },
    Initialize: function () {

        // Set option according to static args
        if (system.staticArgs && system.staticArgs.contentServer) CPBMain.Options.ContentServer = system.staticArgs.contentServer;
        if (system.staticArgs && system.staticArgs.consoleDebug) CPBMain.Options.ConsoleDebug = system.staticArgs.consoleDebug;

        // Version
        var appDetail = chrome.runtime.getManifest();
        if (appDetail) CPBMain.Options.Version = appDetail.version;

        // Resources 
        var resourceRead = function (key, defaultValue) { return (chrome.i18n.getMessage(key) == "") ? defaultValue : chrome.i18n.getMessage(key); };
        CPBMain.Options.Resources.btnSaveIt = resourceRead("btnSaveIt", "Save it!");
        CPBMain.Options.Resources.tipNotifications = resourceRead("tipNotifications", "Notifications");
        CPBMain.Options.Resources.tipClipCrop = resourceRead("tipClipCrop", "Make a Selection");
        CPBMain.Options.Resources.tipClipCropShortcut = resourceRead("tipClipCropShortcut", "You can also press CTRL & SHIFT & Z");
        CPBMain.Options.Resources.tipClipShot = resourceRead("tipClipShot", "Capture a Screenshot");
        CPBMain.Options.Resources.tipClipShotShortcut = resourceRead("tipClipShotShortcut", "You can also press CTRL & SHIFT & X");
        CPBMain.Options.Resources.tipImportClips = resourceRead("tipImportClips", "Import Pins");
        CPBMain.Options.Resources.tipButtonClip = resourceRead("tipButtonClip", "Choose an image");

        // Preferences
        CPBMain.Options.Resources.lblSettingModeImageHover = resourceRead("modeImageHover_title", "Show the save it button on");
        CPBMain.Options.Resources.lblSettingModeImageHover_Selected = resourceRead("modeImageHover_options_Preferred_images", "Preferred images");
        CPBMain.Options.Resources.lblSettingModeImageHover_All = resourceRead("modeImageHover_options_All_Images", "All Images");
        CPBMain.Options.Resources.lblSettingModeImageHover_None = resourceRead("modeImageHover_options_Do_not_show", "Do not show");

        // Definitions
        CPBMain.Options.Resources.chrome_extension_name = resourceRead("chrome_extension_name", "Clipix Browser Extension");
        CPBMain.Options.Resources.chrome_extension_description = resourceRead("chrome_extension_description", "The Clipix Browser Extension is a free extension that brings the power of clipping natively into the browser experience.");
        CPBMain.Options.Resources.browser_action_title = resourceRead("browser_action_title", "Save to Clipix");

        // Preferences settings
        chrome.storage.local.get(
        {
            modeImageHover: "Selected"
        }, function (value) {
            CPBMain.Options.ModeImageHover = value.modeImageHover;
        });

        // Context Menu --------------------------------------------------------
        chrome.contextMenus.create({
            title: CPBMain.Options.Resources.btnSaveIt,
            contexts: ["page", "image", "link"],  // ContextType
            onclick: function (info, tab) {
                var imgSrc = null;
                if (info && info.mediaType == "image" && info.srcUrl) imgSrc = info.srcUrl;
                CPBMain.Debug("ContextMenu", imgSrc);
                CPBMain.ActionDirectCallClipButton(imgSrc);
            }
        });

        // Toolbar Buttons -------------------------------------------------
        CPBMain.ToolbarButton = chrome.browserAction.onClicked.addListener(CPBMain.ActionToolbarClick);

        // HotKeys -------------------------------------------
        chrome.commands.onCommand.addListener(function (command) {
            CPBMain.Debug("HotKeys", command);
            CPBMain.WorkerMessageEmit(command);
        });

        // Page Mods -----------------------------------------
        // On Tab created/updated
        chrome.tabs.onUpdated.addListener(CPBMain.ActionOnTabUpdated);
        chrome.tabs.onActivated.addListener(CPBMain.ActionOnTabActivated);
        // Messaging 
        chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
            var currentTab = null;
            if (sender.tab) currentTab = sender.tab;
            if (request.message == "message.request") CPBMain.WorkerMessageHandler(request.payload, currentTab);
        });

        // Refresh User Notification -----------------------------------
        CPBMain.RefreshUserNotification(true);

        // Refresh HoverSpecificWebsites from server --------
        if (CPBMain.Options.HoverSpecificWebsites.length < 1) {
            CPBMain.ServerGetHoverSpecificWebsites(CPBMain.ActionHoverSpecificWebsitesUpdated);
        }

        CPBMain.Debug("CPBMain", "Initialized");
    },
    ActionOnTabActivated: function (activeInfo) {
        chrome.tabs.get(activeInfo.tabId, function (tab) {
            if (tab && tab.url && CPBMain.IsInRegexList(CPBMain.Options.BlackListWebsites, tab.url)) {
                chrome.browserAction.setIcon({ path: "data/icons/icon-32bw.png" });
            } else {
                chrome.browserAction.setIcon({ path: "data/icons/icon-32.png" });
            }
        });
    },
    ActionOnTabUpdated: function (tabId, changeInfo, tab) {
        if (changeInfo.status == "loading") {

            // BlackList - Disable button
            if (tab.url) {
                if (CPBMain.IsInRegexList(CPBMain.Options.BlackListWebsites, tab.url)) {
                    chrome.browserAction.setIcon({ path: "data/icons/icon-32bw.png" });
                    chrome.browserAction.disable(tabId);
                } else {
                    chrome.browserAction.setIcon({ path: "data/icons/icon-32.png" });
                    chrome.browserAction.enable(tabId);
                }
            }
        }

        if (changeInfo.status == "complete") {
            // Refresh user profile
            CPBMain.RefreshUserNotification();

            CPBMain.Debug("ActionOnTabUpdated", "Active: " + tabId + " : " + changeInfo.status);
            chrome.tabs.sendMessage(tabId, { message: 'initialize', payload: CPBMain.Options });
        }
    },
    RefreshUserNotification: function (forceRefresh) {
        // Refresh only if needed
        if (forceRefresh || CPBMain.UserNotificationNeedRefresh) {

            CPBMain.ServerCheckUserNotifications(function (data) {
                CPBMain.Debug("RefreshUserNotification", "count: " + data);

                CPBMain.Options.UserNotificationCount = data;

                // Badge
                if (CPBMain.Options.UserNotificationCount > -1) {

                    chrome.browserAction.setBadgeBackgroundColor({ color: "#ff6600" });
                    chrome.browserAction.setBadgeText({ text: (CPBMain.Options.UserNotificationCount > 0) ? CPBMain.Options.UserNotificationCount.toString() : "" });
                }

                // If Authenticated, Set Refresh for 2 min
                CPBMain.UserNotificationNeedRefresh = false;
                if (CPBMain.Options.UserNotificationCount > -1) CPBMain.UserNotificationTimer = setTimeout(function () { CPBMain.UserNotificationNeedRefresh = true; }, 120e3);

            });
        }
    },

    WorkerMessageHandler: function (payload, tab) {
        if (!payload.message) return;

        CPBMain.Debug("WorkerMessageHandler", payload.message);
        var execCallback = function (result) {
            if (payload.callbackId > -1) chrome.tabs.sendMessage(tab.id, { message: "message.response", payload: { message: payload.message, callbackId: payload.callbackId, argument: result} });
        };
        switch (payload.message) {
            case "playShutterSound":
                CPBMain.ActionPlayShutterSound();
                break;
            case "captureTab":
                CPBMain.ActionCaptureTab(payload.argument, tab, execCallback);
                break;
            case "startClipixButton":
                CPBMain.ServerGetClipixButton(payload.argument, execCallback);
                break;
            case "checkUserNotifications":
                CPBMain.ServerCheckUserNotifications(execCallback);
                break;
            case "updateSettingModeImageHover":
                CPBMain.ActionUpdateSettingModeImageHover(payload.argument);
                break;
            case "forceResfreshUserNotification":
                CPBMain.RefreshUserNotification(true);
                break;
            case "resetUserNotification":
                chrome.browserAction.setBadgeText({ text: "" }); // Reset badge
                if (CPBMain.Options.UserNotificationCount > -1) CPBMain.Options.UserNotificationCount = 0; //Reset internal counter    
                break;
        }

    },
    WorkerMessageEmit: function (message, argument) {

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var currentTab = tabs[0];
            chrome.tabs.sendMessage(currentTab.id, { message: "message.directcall", payload: { message: message, callbackId: -1, argument: argument} });
        });

    },
    IsInRegexList: function (list, url) {
        if (!url) return false;

        // Get domain + path name
        var domainPath = "";
        var match = url.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)(\/[^?#]*)(\?[^#]*|)(#.*|)$/);
        if (match && match[3]) domainPath = match[3];
        if (match && match[5]) domainPath += match[5];

        var i, n;
        var result = false;
        for (i = 0, n = list.length; i < n; i = i + 1) {
            if (domainPath.match(new RegExp(list[i], "i"))) {
                result = true;
                break;
            }
        }
        return result;
    },

    ActionUpdateSettingModeImageHover: function (mode) {
        CPBMain.Options.ModeImageHover = mode;
        // Save user Preferences
        chrome.storage.local.set({ "modeImageHover": CPBMain.Options.ModeImageHover });
    },
    ActionToolbarClick: function (tab) {

        // Clipix Websites
        if (CPBMain.IsInRegexList(CPBMain.Options.ClipixWebsites, tab.url)) {
            CPBMain.ActionDirectCallClipButton();
            return;
        }
        // Show the button
        CPBMain.WorkerMessageEmit("showFloatButton", CPBMain.Options.UserNotificationCount);
    },
    ActionDirectCallClipButton: function (imgSrc) {
        CPBMain.WorkerMessageEmit("clipButton", imgSrc);
    },
    ActionCaptureTab: function (coords, tab, callback) {

        var croping = null;
        if (coords) {

            croping = JSON.stringify(coords);
        }
        // Chrome screen capture is too early
        setTimeout(function () {
            chrome.tabs.captureVisibleTab(null, function (img) {
                CPBMain.AjaxCall("POST", CPBMain.HandlerUrl,
            {
                "function": "ImageCapture",
                "croping": croping,
                "imgSrc": img
            },
            function (response) { if (callback) callback(JSON.parse(response).Data); });
            });
        }, 100);


    },
    ActionPlayShutterSound: function () {
        var cameraShutter = chrome.extension.getURL("data/files/camera-shutter-click-01.mp3");
        var snd = new window.Audio(cameraShutter); // buffers automatically when created
        snd.play();
    },
    ActionHoverSpecificWebsitesUpdated: function (data) {

        CPBMain.Options.HoverSpecificWebsites = data;
        CPBMain.Debug("HoverSpecificWebsites", "Updated: " + CPBMain.Options.HoverSpecificWebsites.length);
        // Send Message to Current Tab
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var currentTab = tabs[0];
            chrome.tabs.sendMessage(currentTab.id, { message: 'initialize', payload: CPBMain.Options });
        });
    },
    ServerCheckUserNotifications: function (callback) {
        CPBMain.AjaxCall("GET", CPBMain.HandlerUrl,
        {
            "function": "CheckNotifications"
        },
        function (response) { if (callback) callback(JSON.parse(response).Data); });
    },
    ServerGetHoverSpecificWebsites: function (callback) {

        CPBMain.AjaxCall("GET", CPBMain.HandlerUrl,
        {
            "function": "GetHoverSpecificWebsites",
            "version": "3"
        },
        function (response) { if (callback) callback(JSON.parse(response).Data); });
    },
    ServerGetClipixButton: function (hostUrl, callback) {
        CPBMain.AjaxCall("GET", "/ClipixButton/_v3/handlers/ButtonScriptHandler.ashx",
        {
            "host": hostUrl
        },
        function (response) { if (callback) callback(response); });
    },
    AjaxCall: function (method, page, params, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var data = xhr.responseText;
                    if (callback) callback(data);
                } else {
                    if (callback) callback(null);
                }
            }
        };

        //Serialize the params
        var serialize = function (obj) {
            var str = [];
            for (var p in obj)
                if (obj.hasOwnProperty(p) && obj[p]) {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
            return str.join("&");
        };

        var url = "https://" + CPBMain.Options.ContentServer;
        url += page;

        if (method == "POST") {
            // Method POST
            xhr.open('POST', url, true);

            //Set correct header for form data 
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.send(serialize(params));
        }
        else {
            // Method GET
            if (params) url += "?" + serialize(params);

            xhr.open('GET', url, true);
            xhr.send();
        }
    },
    Debug: function (source, message) {
        if (CPBMain.Options.ConsoleDebug) console.log(source + ": " + message);
    }

};


// -- Init Options
CPBMain.Initialize();
