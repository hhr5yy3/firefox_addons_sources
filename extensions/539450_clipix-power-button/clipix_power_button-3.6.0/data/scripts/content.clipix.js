var CPBContent = {
    Initialize: function (options) {
        if (window.top === window) {

            if (options) CPBContent.Options = options;

            // Debug mode
            if (CPBContent.Options && CPBContent.Options.ConsoleDebug) CPBTools.DebugMode = true;
            CPBTools.Debug("CPBContent.Initialize", "Start - Clipix");

            // Initialize Messaging
            CPBMessaging.Initialize(CPBContent.OnDirectCallMessage);

            // Test Clipix Auth Cookie - Refresh User Notification if needed
            var isClipixAuthCookie = CPBContent.GetCookie("ClipixAuthenticationSession2", null) != null;
            CPBTools.Debug("Clipix Authenticated", isClipixAuthCookie);
            if ((CPBContent.Options.UserNotificationCount > -1 && !isClipixAuthCookie)
                || (CPBContent.Options.UserNotificationCount < 0 && isClipixAuthCookie)) {
                // UserProfile and auth cookie have opposite info...
                CPBMessaging.SendMessage("forceResfreshUserNotification");
            }


        }
    },
    OnDirectCallMessage: function (payload) {
        if (!payload.message) return;
        CPBTools.Debug("CPBContent.OnDirectCallMessage", payload.message);
        CPBContent.ActionCallClipButton();
    },
    ActionCallClipButton: function (imageSrc, mode, callback) {
        window.postMessage("CPBContent.ActionCallClipButton", document.location.protocol + "//" + document.location.hostname);

    },
    GetCookie: function (name, defaultValue) {
        var i, x, y, cookies = document.cookie.split(";");
        for (i = 0; i < cookies.length; i++) {
            x = cookies[i].substr(0, cookies[i].indexOf("="));
            y = cookies[i].substr(cookies[i].indexOf("=") + 1);
            x = x.replace(/^\s+|\s+$/g, "");
            if (x == name) {
                return unescape(y);
            }
        }
        return defaultValue;
    }
};