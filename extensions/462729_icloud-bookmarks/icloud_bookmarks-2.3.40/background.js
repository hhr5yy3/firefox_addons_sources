/*
 * (C) Copyright 2017 Apple Inc
 */
var port; // Connection to native messaging host app.
var iCPState = 0;
var needUserConsent = true;
var extensionStarted = false;

// Commands
// Browser --> App
var CmdBeginBuildingBookmarkTree = 1;
var CmdAddFolderToTree = 2;
var CmdAddBookmarkToTree = 3;
var CmdEndBuildingBookmarkTree = 4;
var CmdOnChange = 5;
var CmdOnDidBMOp = 6;
var CmdOnFailBMOp = 7;
var CmdOnImportBegin = 8;
var CmdOnImportEnd = 9;
var CmdLaunchiCP = 10;
var CmdInit = 11;

// App --> Browser
var CmdiCPStateChange = 50;
var CmdiCPAction = 51;
var CmdChangeAddFolder = 60;
var CmdChangeAddBookmark = 61;
var CmdChangeDeleteBookmark = 62;
var CmdChangeDeleteFolderRecursive = 63;
var CmdChangeDeleteFolder = 64;
var CmdChangeUpdate = 65;
var CmdChangeMove = 66;

function doMove(_id, _destId, _newIndex)
{
    console.log("MOVE BM: " + _id + " => ^" + _destId + " @" + _newIndex);
    var cinfo = { parentId: _destId };
    if (_newIndex !== undefined && _newIndex !== null && _newIndex != -1) 
        cinfo['index'] = _newIndex;
    try {
        browser.bookmarks.move(_id, cinfo, function (_info) {
            if (_info) {
                console.log("DID MOVE: " + _info.id + " ^" + _info.parentId + " @" + _info.index);
                var cmd = { cmd: CmdOnDidBMOp, info: _info };
                try {
                    port.postMessage(cmd);
                }
                catch (e) {
                }
            }
            else {
                console.log("FAIL MOVE: ^" + _destId + ": " + _id + ": " + browser.runtime.lastError);
                var cmd = { cmd: CmdOnFailBMOp, error: browser.runtime.lastError, cinfo: cinfo, info: _info };
                try {
                    port.postMessage(cmd);
                }
                catch (e) {
                }
            }
        });
    }
    catch (e) {
        console.log("FAIL MOVE(ex): ^" + _destId + ": " + _id + ": " + e);
        var error = { messageex: e.message };
        var cmd = { cmd: CmdOnFailBMOp, error: error, cinfo: cinfo };
        try {
            port.postMessage(cmd);
        }
        catch (e2) {
        }
    }
}

function doAdd(_parentId, _title, _url, _index)
{
    console.log("ADD BM: ^" + _parentId + " " + _title + " " + _url + " @" + _index);
    var cinfo = { parentId: _parentId, title: _title, url: _url };
    if (_index !== undefined && _index !== null && _index != -1)
        cinfo['index'] = _index;
    try {
        browser.bookmarks.create(cinfo, function (_info) {
            if (_info) {
                console.log("DID ADD BM: ^" + _info.parentId + " " + _info.title + " " + _info.url + ": " + _info.id + " @" + _info.index);
                var cmd = { cmd: CmdOnDidBMOp, info: _info };
                try {
                    port.postMessage(cmd);
                }
                catch (e) {
                }
            }
            else {
                console.log("FAIL ADD BM: " + _parentId + " " + _title + ": " + browser.runtime.lastError);
                var cmd = { cmd: CmdOnFailBMOp, error: browser.runtime.lastError, cinfo: cinfo, info: _info };
                try {
                    port.postMessage(cmd);
                }
                catch (e) {
                }
            }
        });
    }
    catch (e) {
        console.log("FAIL(ex) ADD BM: " + _parentId + " " + _title + ": " + e);
        var error = { messageex: e.message };
        var cmd = { cmd: CmdOnFailBMOp, error: error, cinfo: cinfo };
        try {
            port.postMessage(cmd);
        }
        catch (e2) {
        }
    }
}
function doAddFolder(_parentId, _title, _index)
{
    console.log("ADD FLD: ^" + _parentId + " " + _title + " @" + _index);
    var cinfo = { parentId: _parentId, title: _title };
    if (_index !== undefined && _index !== null && _index != -1)
        cinfo['index'] = _index;
    try {
        browser.bookmarks.create(cinfo, function (_info) {
            if (_info) {
                console.log("DID ADD FLD: ^" + _info.parentId + " " + _info.title + ": " + _info.id + " @" + _info.index);
                var cmd = { cmd: CmdOnDidBMOp, info: _info };
                try {
                    port.postMessage(cmd);
                }
                catch (e) {
                }
            }
            else {
                console.log("FAIL ADD FLD: " + _parentId + " " + _title + ": " + browser.runtime.lastError);
                var cmd = { cmd: CmdOnFailBMOp, error: browser.runtime.lastError, cinfo: cinfo, info: _info };
                try {
                    port.postMessage(cmd);
                }
                catch (e) {
                }
            }
        });
    }
    catch (e) {
        console.log("FAIL(ex) ADD FLD: " + _parentId + " " + _title + ": " + e);
        var error = { messageex: e.message };
        var cmd = { cmd: CmdOnFailBMOp, error: error, cinfo: cinfo };
        try {
            port.postMessage(cmd);
        }
        catch (e2) {
        }
    }
}

function doDelete(_id)
{
    try {
        browser.bookmarks.remove(_id).then(function () {
            console.log("args: " + arguments);
            console.log("DELETE: " + _id);
            var cmd = { cmd: CmdOnDidBMOp, id: _id };
            try {
                port.postMessage(cmd);
            }
            catch (e) {
            }
        }, function (error) {
            console.log("FAIL DELETE: " + _id + ": " + error);
            var cmd = { cmd: CmdOnFailBMOp, id: _id, error: error };
            try {
                port.postMessage(cmd);
            }
            catch (e) {
            }
        });
    }
    catch (e) {
        console.log("FAIL DELETE(ex): " + _id + ": " + e);
        var error = { messageex: e.message };
        var cmd = { cmd: CmdOnFailBMOp, error: error, cinfo: cinfo };
        try {
            port.postMessage(cmd);
        }
        catch (e2) {
        }
    }
}

function doDeleteFolderRecursively(_id)
{
    try {
        browser.bookmarks.removeTree(_id).then(function() {
            console.log("DELETE-TREE: " + _id);
            var cmd = { cmd: CmdOnDidBMOp, id: _id };
            try {
                port.postMessage(cmd);
            }
            catch (e) {
            }
        }, function(error) {
            console.log("FAIL DELETE-TREE: " + _id + ": " + error);
            var cmd = { cmd: CmdOnFailBMOp, id: _id, error: error };
            try {
                port.postMessage(cmd);
            }
            catch (e) {
            }
        });
    }
    catch (e) {
        console.log("FAIL DELETE-TREE(ex): " + _id + ": " + e);
        var error = { messageex: e.message };
        var cmd = { cmd: CmdOnFailBMOp, error: error, cinfo: cinfo };
        try {
            port.postMessage(cmd);
        }
        catch (e2) {
        }
    }
}

function doUpdate(_id, _title, _url)
{
    var cinfo = {}
    if (_title != undefined && _title != null)
        cinfo['title'] = _title;
    if (_url != undefined && _url != null)
        cinfo['url'] = _url;
    var l = "UPDATE: " + _id + " title: " + _title + ", url: " + _url;
    console.log(l);
    try {
        browser.bookmarks.update(_id, cinfo, function(_info) {
            if (_info) {
                console.log("DID UPDATE: " + _id + " title: " + _info.title + ", url: " + _info.url);
                var cmd = { cmd: CmdOnDidBMOp, info: _info };
                try {
                    port.postMessage(cmd);
                }
                catch (e) {
                }
            }
            else {
                console.log("FAIL UPDATE: " + _title + ": " + browser.runtime.lastError);
                var cmd = { cmd: CmdOnFailBMOp, error: browser.runtime.lastError, cinfo: cinfo, info: _info };
                try {
                    port.postMessage(cmd);
                }
                catch (e) {
                }
            }
        });
    }
    catch (e) {
        console.log("FAIL UPDATE(ex): " + _title + ": " + e);
        var error = { messageex: e.message };
        var cmd = { cmd: CmdOnFailBMOp, error: error, cinfo: cinfo };
        try {
            port.postMessage(cmd);
        }
        catch (e2) {
        }
    }
}

function addFolder(folder)
{
    if (folder.children) {
        var count = folder.children.length;
        for (var i = 0; i < count; i++) {
            var bm = folder.children[i];
            //console.log("bm: " + bm.title);
            var bmSmall = { id: bm.id, parentId: bm.parentId, title: bm.title, index: bm.index, bmtype: bm.type };
            if (bm.children) {
                var cmd = { cmd: CmdAddFolderToTree, fld: bmSmall };
                port.postMessage(cmd);
                addFolder(bm);
            }
            else {
                // Bookmark
                if (bm.url) bmSmall.url = bm.url;
                var cmd = { cmd: CmdAddBookmarkToTree, bm: bmSmall };
                port.postMessage(cmd);
            }
        }
    }
}

function buildClientTree()
{
    if (port) {
        console.log("asking browser for bookmark tree ...");
        browser.bookmarks.getTree(function (_browserRoot) {
            var menu = _browserRoot[0].children[0]; // Note these are reversed from Chrome.
            var bar = _browserRoot[0].children[1];
            console.log("sending tree to app ...");
            // This returns all the children. JSON string could be too big.
            var barSmall = { id: bar.id, parentId: bar.parentId, title: bar.title, index: bar.index, bmtype: bar.type };
            var menuSmall = { id: menu.id, parentId: menu.parentId, title: menu.title, index: menu.index, bmtype: menu.type };
            var cmdBegin = { cmd: CmdBeginBuildingBookmarkTree, bar: barSmall, menu: menuSmall };
            try {
                port.postMessage(cmdBegin);
                addFolder(bar);
                addFolder(menu);
                var cmdEnd = { cmd: CmdEndBuildingBookmarkTree };
                port.postMessage(cmdEnd);
                console.log("tree sent to app.");
            }
            catch (e) {
            }
        });
    }
}

function oniCPStateChange(_iCPState, _buildClientTree)
{
    if (needUserConsent) return;

    console.log("iCP state changed: " + _iCPState + ", " + _buildClientTree);
    iCPState = _iCPState;
    var popups = browser.extension.getViews({ type: "popup" });
    for (var k = 0; k < popups.length; k++) {
        popups[k].updatePopup();
    }
    if (_buildClientTree)
        buildClientTree();
}

function oniCPAction(_action)
{
    if (_action == "ShowExtensionsPage")
        browser.tabs.create({ url: "about:addons", active: true });
}

function connectToHostApp() {
    try {
        port = browser.runtime.connectNative('com.apple.bookmarks');
        //console.log("Port: " + port);
        // Assume we are connected. Will be disconnected if not installed.
        iCPState = 1;
        port.onMessage.addListener(function (msg) {
            console.log("Received" + msg);
            if (msg.cmd) {
                console.log("Cmd: " + msg.cmd);
                switch (msg.cmd) {
                    case CmdiCPStateChange:
                        oniCPStateChange(msg.iCPState, msg.buildClientTree);
                        break;
                    case CmdiCPAction:
                        oniCPAction(msg.action);
                        break;
                    case CmdChangeAddFolder:
                        doAddFolder(msg.parentId, msg.title, msg.index);
                        break;
                    case CmdChangeAddBookmark:
                        doAdd(msg.parentId, msg.title, msg.url, msg.index);
                        break;
                    case CmdChangeDeleteBookmark:
                    case CmdChangeDeleteFolder:
                        doDelete(msg.id);
                        break;
                    case CmdChangeDeleteFolderRecursive:
                        doDeleteFolderRecursively(msg.id);
                        break;
                    case CmdChangeUpdate:
                        doUpdate(msg.id, msg.title, msg.url);
                        break;
                    case CmdChangeMove:
                        doMove(msg.id, msg.parentId, msg.index);
                        break;
                    default:
                        break;
                }
            }
            else {
                console.log("Received unknown msg: " + msg);
            }
        });
        port.onDisconnect.addListener(function () {
            console.log("Disconnected");
            iCPState = 0; // Not installed.
        });
    }
    catch (e) {
        console.log("can't call connect to native app.");
        iCPState = 0; // Not installed.
    }

    var bm = browser.bookmarks;
    if (bm) {
        // wait to build client try until we get iCP state change notification

        // register all change notification handlers
        bm.onCreated.addListener(function (_id, _info) {
            console.log("created " + _id + ": " + _info.title + " @" + _info.index);
            var cmd = {
                cmd: CmdOnChange,
                type: "created",
                id: _id,
                parentId: _info.parentId,
                index: _info.index,
                title: _info.title,
                url: _info.url,
                bmtype: _info.type
            };
            try {
                port.postMessage(cmd);
            }
            catch (e) {
            }
        });
        bm.onRemoved.addListener(function (_id, _info) {
            console.log("removed " + _id + ": " + _info.title);
            var cmd = {
                cmd: CmdOnChange,
                type: "removed",
                id: _id,
                parentId: _info.parentId,
                index: _info.index
            };
            try {
                port.postMessage(cmd);
            }
            catch (e) {
            }
        });
        bm.onChanged.addListener(function (_id, _info) {
            console.log("changed " + _id + ": " + _info.title);
            var cmd = {
                cmd: CmdOnChange,
                type: "changed",
                id: _id,
                title: _info.title,
                url: _info.url
            };
            try {
                port.postMessage(cmd);
            }
            catch (e) {
            }
        });
        bm.onMoved.addListener(function (_id, _info) {
            console.log("moved " + _id + ": " + "^" + _info.oldParentId + " @" + _info.oldIndex + " => ^" + _info.parentId + " @" + _info.index);
            var cmd = {
                cmd: CmdOnChange,
                type: "moved",
                id: _id,
                oldParentId: _info.oldParentId,
                oldIndex: _info.oldIndex,
                parentId: _info.parentId,
                index: _info.index
            };
            try {
                port.postMessage(cmd);
            }
            catch (e) {
            }
        });
    }
}

function sendInitCommand(extInfo)
{
    try
    {
        var cmd = { cmd: CmdInit, extVersion: extInfo.version, userAgent: window.navigator.userAgent};
        port.postMessage(cmd);
    }
    catch (e)
    {
        console.log("Couldn't send init command: " + e);
    }
}

function userAgreedToDataCollection() {
    needUserConsent = false;
    chrome.storage.local.set({ "haveUserConsent": 1 });
    oniCPStateChange(iCPState, false);
    startExtension();
}

function startExtension()
{
    chrome.storage.local.get("haveUserConsent", function (items) {
        if (!items.haveUserConsent || (items.haveUserConsent != 1)) {
            needUserConsent = true;
            chrome.storage.local.set({ "haveUserConsent": 0 });
            const url = browser.runtime.getURL("user_consent.html");
            browser.tabs.create({ url });
        }
        else {
            needUserConsent = false;
            connectToHostApp();
            var gettingSelf = browser.management.getSelf();
            gettingSelf.then(sendInitCommand);
        }
    });
}

browser.runtime.onInstalled.addListener(function(details) {
    if (details.temporary) return;
    switch (details.reason) {
        case "install":
            {
                chrome.storage.local.set({ "haveUserConsent": 0 });
            }
            break;
        case "update":
            {
                chrome.storage.local.set({ "haveUserConsent": 1 });
            }
            break;
    }
});

// Delay to let the onInstalled handler maybe get called before we start.
chrome.storage.local.get("haveUserConsent", function (items) {
    startExtension();
});
