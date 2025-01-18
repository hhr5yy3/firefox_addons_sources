/* Copyright (c) 2017 Freedom Scientific, Inc. */

// JavaScript source code

// For browser compatibility
if (chrome) {
    browser = chrome;
}

var g_toolSupport =
{
    m_connections: {},
    m_toolConnection: null,

    locateElement: function(e)
    {
        window.postMessage({ command: 'locate', element: e, source: 'JAWSInspect' }, '*');
    },

    initForEvent: function ()
    {
        // monitor for connections from inspect-tools
        browser.runtime.onConnect.addListener(function (port) {

            var extensionListener = function (message, sender, sendResponse) {

                // The original connection event doesn't include the tab ID of the
                // DevTools page, so we need to send it explicitly.
                if (message.name == "init") {
                    g_toolSupport.m_connections[message.tabId] = port;
                    return;
                }

                // other message handling
            }

            // Listen to messages sent from the DevTools page
            port.onMessage.addListener(extensionListener);

            port.onDisconnect.addListener(function (port) {
                port.onMessage.removeListener(extensionListener);

                var tabs = Object.keys(g_toolSupport.m_connections);
                for (var i = 0, len = tabs.length; i < len; i++) {
                    if (g_toolSupport.m_connections[tabs[i]] == port) {
                        delete g_toolSupport.m_connections[tabs[i]]
                        break;
                    }
                }
            });
        });

        // receive message from inspect-page and relay them on to inspect-tools
        browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
            // Messages from content scripts should have sender.tab set
            if (sender.tab) {
                var tabId = sender.tab.id;
                if (tabId in g_toolSupport.m_connections) {
                    g_toolSupport.m_connections[tabId].postMessage(request);
                } else {
                    console.log("Tab not found in connection list.");
                }
                //} else {
                //    console.log("sender.tab not defined.");
            }
            return true;
        });
    },

    initForPage: function()
    {
        // these come from window.postMessage and can originate from here or injected <script>
        window.addEventListener('message', function (event) {
            // Only accept messages from the same frame
            if (event.source !== window)
                return;

            // Only accept messages that we know are ours
            var message = event.data;
            if (typeof message !== 'object' || message === null || !message.source === 'JAWSInspect')
                return;

            // relay to inspect-event
            browser.runtime.sendMessage(message);
        });
    },

    initForTools: function()
    {
        // Create a connection to the inspect-event
        g_toolSupport.m_toolConnection = browser.runtime.connect({
            name: "inspectpanel"
        });

        // tell inspect-event we are here
        g_toolSupport.m_toolConnection.postMessage({
            name: 'init',
            tabId: browser.devtools.inspectedWindow.tabId
        });

        // listen for events that come from inspect-event
        g_toolSupport.m_toolConnection.onMessage.addListener(function (message) {
            // these are commands relayed to us from inspect-page
            if (message.command) {
                switch (message.command) {
                    case "locate":
                        var e = message.element;
                        if (e.wiid) {
                            // now we can execute this code
                            browser.devtools.inspectedWindow.eval(
                                  "inspect($$('*[wiid=" + e.wiid + "]')[0])",
                                  function (result, isException) { }
                                );
                        } else if (e.id) {
                            // now we can execute this code
                            browser.devtools.inspectedWindow.eval(
                                  "inspect($$('*[id=" + e.id + "]')[0])",
                                  function (result, isException) { }
                                );
                        }
                        break;
                }
            }
        });
    }
};
