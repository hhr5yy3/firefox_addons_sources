localTrace = function(s) {
    console.log(s);
}

// This gets sent to the background process
// Use this for viewing content script debug outside of the content script
function remoteTrace(s) {
    if (enableTrace) {
        browser.runtime.sendMessage({ trace: s });
    }
}

var socket = 0;
var isConnected = false;
var focusedWindowId = -1;
var smoothScrollEnabled = -1;

function sendJsonMessage(jsonMessage) {
    try
    {
        if (isConnected) {
            var msgString = JSON.stringify(jsonMessage);
            trace(msgString);
            socket.send(msgString);
        }
    }
    catch(aException)
    {
        trace_exception("sendJsonMessage", aException);
    }
}


function initWebSockets() {

  for(var i=0;i<5;++i)
  {
      var host = "ws://127.0.0.1:";
	  var hostPortNum = 59243;
	  hostPortNum = hostPortNum + i;
	  host = host + hostPortNum;
	  trace("Port number:" + host);
    try
    {
        trace("initWebSockets");
        socket = new WebSocket(host);
        socket.onopen = function(msg) {
            trace("connected to target");
            isConnected = true;
            var querying = browser.tabs.query({active: true});
            querying.then((tabs) => {
                for (var tab of tabs) {
                    tab.sendMessage(tab.id, {id: "refreshContent"});
                }
            });
        };
        socket.onclose = function(event) {
            trace("socket.onclose");
            isConnected = false;
        };
        socket.onerror = function(msg) {
            trace("socket.onerror");
        };
        socket.onmessage = function(msg) {
            trace("socket.onmessage");
        };
        break;
    }
    catch(aException)
    {
        trace_exception(initWebSockets, aException);
    }
 }
  trace("web socket initialized");
}

trace("ScrolLApp (chrome) background script loaded");
initWebSockets();

// this is sent from a content script
browser.runtime.onMessage.addListener(
  function(message, sender, sendMessage) {
      try
      {
          trace(message);
          // Always send it (for now)
          // There are some cases (like when CTRL is pressed) where
          // the KHALScroll state and our state can get out of sync
          if (true)
          {
              sendJsonMessage(message);
              smoothScrollEnabled = message.hiRes;
          }
      }
      catch(aException)
      {
          trace_exception("browser.runtime.onMessage.addListener", aException);
      }
  });

// Send Hi-Res whenever there is a tab change
browser.tabs.onActivated.addListener(function(activeInfo) {

    trace("browser.tabs.onActivated: " + activeInfo.tabId);
    // Notify the respective content
    browser.tabs.sendMessage(activeInfo.tabId, {id: "refreshContent"});
});

browser.windows.onFocusChanged.addListener(function(windowId) {

    if (-1 == windowId)
    {
        // Reset the smooth scrolling
        trace("chrome in background");
        smoothScrollEnabled = -1;
    }
    else if (-1 == focusedWindowId)
    {
        trace("chrome in foreground");
        // Chrome browser gaining focus

        // If the socket is closed, reattempt
        // STATE_CLOSED => 3
        if (3 == socket.readyState)
        {
            trace("websocket connection with SetPoint is closed. Attempting to reconnect");
            initWebSockets();
        }

        // Refresh the current tab content
        var querying = browser.tabs.query({active: true});
        querying.then((tabs) => {
            for (var tab of tabs) {
                tab.sendMessage(tab.id, {id: "refreshContent"});
            }
        });
    }

    focusedWindowId = windowId;
});
