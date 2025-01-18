/* Copyright (c) 2017 - 2020 Freedom Scientific, Inc. */

// JAWS inspect: event script
var g_inspect =
{
    m_server: null,
    m_extensionId: null,
    m_serverRetryTimer: null,
    m_serverConnecting: false,
    m_connections: {},
    m_lastToken: 10000,
    m_pageJavascript: "",
    m_inspectServer: "127.0.0.1:42042/browser/",

    SendToPage: function(pageid, message, command)
    {
        for (var key in g_inspect.m_connections)
        {
            var item = g_inspect.m_connections[key];
            if (item.pageid == pageid) {
                item.pageport.postMessage({ name: message, data: command })
            }
        }
    },

    onServerConnected: function (e) {
        if (!g_inspect.m_server) {
            return;
        }
        if (g_inspect.m_server.readyState != 1) {
            return;
        }
        var now = new Date();
        g_inspect.m_server.send("extensionready|" + now.toLocaleTimeString());
        $.ajax({
            url: "http://" + g_inspect.m_inspectServer + "loadpluginjs/general",
            success: function (data) {
                g_inspect.m_pageJavascript = data;
            }
        });
    },

    onServerMessage: function (e) {
        var command = $.trim(e.data).split("`");
        if (command && command.length >= 2) {
            switch (command[0]) {
                case "id":
                    g_inspect.m_extensionId = command[1];
                    break;
                case "topage":
                    g_inspect.SendToPage(command[1], command[0], command[2]);
                    break;
                case "javascript":
                    g_inspect.SendToPage(command[1], command[0], g_inspect.m_pageJavascript);
            }
        }
    },

    clearRetryTimeout: function () {
        if (g_inspect.m_serverRetryTimer) {
            clearTimeout(g_inspect.m_serverRetryTimer);
            g_inspect.m_serverRetryTimer = null;
        }
    },

    onServerReconnect: function (e) {
        // don't processes while we are connecting
        if (g_inspect.m_serverConnecting)
            return;

        if (g_inspect.m_server) {
            g_inspect.m_server.close();
            g_inspect.m_server = null;
        }

        g_inspect.clearRetryTimeout();

        g_inspect.m_serverRetryTimer = setTimeout(function () {
            g_inspect.clearRetryTimeout();
            g_inspect.ConnectSession();
        }, 3000);
    },

    ConnectSession: function () {
        g_inspect.m_serverConnecting = true;
        $.ajax({
            url: "http://" + g_inspect.m_inspectServer + "system/alive?notAnErrorIfNotConnected",
            success: function () {
                try {
                    g_inspect.m_server = new WebSocket("ws://" + g_inspect.m_inspectServer + "system/connect", "pipes");
                    g_inspect.m_server.onopen = g_inspect.onServerConnected;
                    g_inspect.m_server.onmessage = g_inspect.onServerMessage;
                    g_inspect.m_server.onerror = g_inspect.onServerReconnect;
                    g_inspect.m_server.onclose = g_inspect.onServerReconnect;
                }
                catch (err) {
                }

                // see if we are closing
                g_inspect.m_serverConnecting = false;
                if (g_inspect.m_server.readyState != 0 && g_inspect.m_server.readyState != 1) {
                    // setup another try
                    g_inspect.onServerReconnect();
                }
            },
            error: function () {                
                g_inspect.m_serverConnecting = false;
                g_inspect.onServerReconnect();
            }
        });
    },

    StartListener: function()
    {
        // listen for connection from the pages
        browser.runtime.onConnect.addListener(function (listenPort)
        {
            // make sure this is for us
            if (listenPort.name == "inspectpage")
            {
                // messages from the inspect-page script
                var extensionListener = function (message, sendingPort, sendResponse)
                {
                    switch (message.name) {
                        case "pageready":
                            var token = ++g_inspect.m_lastToken;
                            g_inspect.m_connections[sendingPort.sender.tab.id] = { pageid: message.id, pagetoken: token, pageport: sendingPort };
                            if (!g_inspect.m_server) {
			        /* Do nothing. */
                            }
                            else if (g_inspect.m_server.readyState != 1) {
			        /* Do nothing. */
                            }
                            else {
                                g_inspect.m_server.send("pagestart|" + message.id + "|" + token);
                            }
                            break;
                    }
                }

                // listen for messages coming from the inspect-page script
                listenPort.onMessage.addListener(extensionListener);

                // listen for disconnects to clean up
                listenPort.onDisconnect.addListener(function (sendingPort)
                {
                    sendingPort.onMessage.removeListener(extensionListener);

                    var tabs = Object.keys(g_inspect.m_connections);
                    for (var i = 0, len = tabs.length; i < len; i++) {
                        var slot = g_inspect.m_connections[tabs[i]];
                        if (slot.pageport == sendingPort) {
                            if (!g_inspect.m_server) {
			        /* Do nothing. */
                            }
                            else if (g_inspect.m_server.readyState != 1) {
			        /* Do nothing. */
                            }
                            else {
                                g_inspect.m_server.send("pagestop|" + slot.pageid + "|" + slot.pagetoken);
                            }
                            delete g_inspect.m_connections[tabs[i]]
                            break;
                        }
                    }
                });
            }
        });
    },

    Init: function () {
        g_inspect.StartListener();
        g_inspect.ConnectSession();
    }
};

g_inspect.Init();
g_toolSupport.initForEvent();
