//-------------------------------------------------------------------------------
var CPBMessaging = {
    Initialized: false,
    CallbackId: 0,
    Callbacks: null,
    Initialize: function (directCallHandler) {
        if (CPBMessaging.Initialized) return;
        CPBMessaging.Initialized = true;

        CPBMessaging.Callbacks = new Array();
        CPBMessaging.CallbackId = -1;

        chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
            if (request.message == "message.response") {
                CPBMessaging.ReceiveMessage(request.payload);
            }
            if (directCallHandler && request.message == "message.directcall") {
                directCallHandler(request.payload);
            }
        });
    },
    ReceiveMessage: function (payload) {
        if (!payload.message) return;
        CPBTools.Debug("CPBMessaging.ReceiveMessage", payload.message);
        if (payload.callbackId > -1 && CPBMessaging.Callbacks[payload.callbackId]) CPBMessaging.Callbacks[payload.callbackId](payload.argument);
        // Remove callback ?
    },
    SendMessage: function (message, argument, callback) {
        var callbackId = -1;
        if (callback) {
            // Save callback
            callbackId = ++CPBMessaging.CallbackId;
            CPBMessaging.Callbacks[callbackId] = callback;
        }
        CPBTools.Debug("CPBMessaging.SendMessage", message + " (" + argument + ")");
        chrome.runtime.sendMessage({ message: "message.request", payload: { message: message, argument: argument, callbackId: callbackId } });
    }
};

//self.port.once - ...
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message == 'initialize') {
        if (typeof (CPBContent) != 'undefined') CPBContent.Initialize(request.payload);
    }
});