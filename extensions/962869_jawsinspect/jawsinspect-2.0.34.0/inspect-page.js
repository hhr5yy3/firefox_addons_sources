/* Copyright (c) 2017 Freedom Scientific, Inc. */

// JAWS inspect: page injected script
var g_inspect = new Object();
g_inspect.extentionPort = browser.runtime.connect({ name: "inspectpage" });
g_inspect.pageId = null;
g_inspect.statusPageTimer = null;

var g_page =
{
    connectFunctions: function (e) {
        if (e.name == "javascript") {
            g_inspect.extentionPort.onMessage.removeListener(g_page.connectFunctions);

            try {
                eval(e.data);
            }
            catch (err) { };

        }
    },

    testStatusPage1: function () {
        // special handling for status page, lets us know everything is working
        var isStatusPage = $('meta[name="inspect-status"]');
        if (isStatusPage.length) {
            var okText = $('#oktext').text();
            var failText = $('#failtext').text();
            $('#extensionpresent').html('<span class="ok">' + okText + '</span>');
            $.ajax("http://127.0.0.1:42042")
                .done(function () {
                    $('#extensioncommunication').html('<span class="ok">' + okText + '</span>');
                })
                .fail(function (xhr, err) {
                    $('#extensioncommunication').html('<span class="fail">' + failText + '</span>');
                });
            $.ajax("http://127.0.0.1:42042/loopback/" + g_inspect.pageId)
                .done(function () {
                    // mark this part done
                    $('#extensionconnect').html('<span class="ok">' + okText + '</span>');
                    // now wait for the response
                    g_inspect.statusPageTimer = setTimeout(function () {
                        $('#extensionloopback').html('<span class="fail">' + failText + '</span>');
                    }, 100);
                })
                .fail(function (xhr, err) {
                    $('#extensionconnect').html('<span class="fail">' + failText + '</span>');
                    $('#extensionloopback').html('<span class="fail">' + failText + '</span>');
                });
        }
    },

    onDocumentReady: function (e)
    {
        // check if valid page
        g_inspect.pageId = $('#fsInspectPageId').attr('wiid');
        if (!g_inspect.pageId) {
            g_inspect.pageId = $.md5(window.location.href);
        }

        // let the extention know everything has started up
        if (g_inspect.extentionPort) {
            // listen for message comming back from the server
            g_inspect.extentionPort.onMessage.addListener(g_page.connectFunctions);
            // let everybody know we are ready
            g_inspect.extentionPort.postMessage({ name: "pageready", id: g_inspect.pageId });
        }

        g_page.testStatusPage1();
    },
};

$(document).ready(g_page.onDocumentReady);

// listener for message from inspect-event
g_toolSupport.initForPage();