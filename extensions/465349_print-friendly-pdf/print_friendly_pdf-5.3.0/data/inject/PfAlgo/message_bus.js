var messageBus = (function() {
  var setupDone = false;

  var setupPort = function(port, handlers, onError) {
    port.onMessage.addListener(function(request, sender, sendResponse) {
      try {
        if (!request) { return; }

        var type = request.type;
        if (!type) { return; }

        var handler = handlers[type];
        if (!handler) { return; }
        var payload = request.payload;

        handler(payload);
      } catch (e) {
        if (onError) { onError(e); }
        else { throw e; }
      }
    });
    port.onDisconnect.addListener(function (p) {
      if (p.error) { console.log("Disconnected due to an error: " + p.error.message); }
      // NOTE: drop backtrace with setTimeout
      setTimeout(function() {
        var newPort = chrome.runtime.connect({ name: port.name });
        setupPort(newPort, handlers, onError);
      });
    });
  };

  return {
    postMessage: function(destination, type, payload, onError) {
      chrome.runtime.sendMessage({ destination: destination, type: type, payload: payload });
    },
    listen: function(name, handlers, onError) {
      if(setupDone) { return; }
      var port = chrome.runtime.connect({ name: name });
      setupPort(port, handlers, onError);

      setupDone = true;
    },
  };
})();
  
