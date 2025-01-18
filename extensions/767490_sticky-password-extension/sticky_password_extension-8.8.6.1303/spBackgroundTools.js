
//*****************************************************************************}
//                                                                             }
//       Sticky Password Autofill Engine                                       }
//       Chromium Background Tools                                             }
//                                                                             }
//       Copyright (C) 2018-2023 Lamantine Software a.s.                       }
//                                                                             }
//*****************************************************************************}

(function() {
  
'use strict';

var spLog = spRequire('spLog').spLog;
var spStrings = spRequire('spStrings').spStrings;
var spAutofillCore = spRequire('spAutofillCore').spAutofillCore;



// TspWebStorage ---------------------------------------------------------------

function TspWebStorage()
{
  // do nothing
}

TspWebStorage.prototype.get = function (AKey, AResultCallback)
{
  var value = undefined;
  try
  {
    value = localStorage[AKey];
  }
  catch (ErrorMessage)
  {
    spLog.logError(this.constructor.name + '.get() Error: ' + ErrorMessage);
  }
  if (AResultCallback)
    AResultCallback(value);
};

TspWebStorage.prototype.set = function (AKey, AValue)
{
  try
  {
    localStorage[AKey] = AValue;
  }
  catch (ErrorMessage)
  {
    spLog.logError(this.constructor.name + '.set() Error: ' + ErrorMessage);
  }
};

TspWebStorage.prototype.remove = function (AKey)
{
  try
  {
    delete localStorage[AKey];
  }
  catch (ErrorMessage)
  {
    spLog.logError(this.constructor.name + '.remove() Error: ' + ErrorMessage);
  }
};



// TspChromiumStorage ----------------------------------------------------------

function TspChromiumStorage()
{
  this.migrateLocalStorage();
}

TspChromiumStorage.prototype.migrateLocalStorage = function ()
{
  try
  {
    if (typeof localStorage === 'undefined')
      return; // storage not available

    if (!localStorage.length)
      return; // empty storage

    for (var i = 0; i < localStorage.length; i++)
    {
      var key = localStorage.key(i);
      var value = localStorage.getItem(key);
      this.set(key, value);
    }
    localStorage.clear();
  }
  catch (ErrorMessage)
  {
    spLog.logError(this.constructor.name + '.migrateLocalStorage() Error: ' + ErrorMessage);
  }
}

TspChromiumStorage.prototype.get = function (AKey, AResultCallback)
{
  var value = undefined;
  try
  {
    chrome.storage.local.get(AKey, function(item) {
      if (item)
        value = item[AKey];
      if (AResultCallback)
        AResultCallback(value);
    });
  }
  catch (ErrorMessage)
  {
    spLog.logError(this.constructor.name + '.get() Error: ' + ErrorMessage);
  }
};

TspChromiumStorage.prototype.set = function (AKey, AValue)
{
  try
  {
    var item = {};
    item[AKey] = AValue;
    chrome.storage.local.set(item);
  }
  catch (ErrorMessage)
  {
    spLog.logError(this.constructor.name + '.set() Error: ' + ErrorMessage);
  }
};

TspChromiumStorage.prototype.remove = function (AKey)
{
  try
  {
    chrome.storage.local.remove(AKey);
  }
  catch (ErrorMessage)
  {
    spLog.logError(this.constructor.name + '.remove() Error: ' + ErrorMessage);
  }
};



// TspChromiumMiniguiPopupTransport --------------------------------------------

function TspChromiumMiniguiPopupTransport()
{
  this.Port = null;
  this.onMessage = null;
}

TspChromiumMiniguiPopupTransport.prototype.Connect = function ()
{
  if (!this.onMessage)
    throw this.constructor.name + '.Connect() Event onMessage is undefined!';

  chrome.runtime.onConnect.addListener(function(port) {
    if (!port)
      return;
    if (port.name != 'Minigui')
      return;
    this.Port = port;
    port.onMessage.addListener(this.mgOnMessage.bind(this));
    port.onDisconnect.addListener(function () {
      this.Port = null;
    }.bind(this));
  }.bind(this));
};

TspChromiumMiniguiPopupTransport.prototype.PostMessage = function (message)
{
  if (message)
  try
  {
    if (this.Port)
      this.Port.postMessage(message);
  }
  catch (ErrorMessage)
  {
    spLog.logError(this.constructor.name + '.PostMessage() Error: ' + ErrorMessage);
  }
};

TspChromiumMiniguiPopupTransport.prototype.mgOnMessage = function (message)
{
  if (message)
  try
  {
    if (this.onMessage)
      this.onMessage(message);
  }
  catch (ErrorMessage)
  {
    spLog.logError(this.constructor.name + '.mgOnMessage() Error: ' + ErrorMessage);
  }
};



const spBackgroundTools =
{
  GetBrowserAction: function ()
  {
    // Starting from Manifest V3 "chrome.browserAction" was renamed to "chrome.action"
    if (typeof chrome.action !== 'undefined')
      return chrome.action;
    else
      return chrome.browserAction;
  },
  
  CreateExtensionStorage: function ()
  {
    try
    {
      // Use chrome.storage API:
      // 1. Firefox has issue: the Web Storage API doesn't work for extension if Cookies storing is denied,
      //    got "SecurityError: The operation is insecure." message while accessing localStorage.
      // 2. Migrate localStorage API to chrome.storage one in Chrome Manifest V2
      //    as localStorage API is no longer supported by Chrome Manifest V3.
      // 3. localStorage API is no longer supported by Chrome Manifest V3.
      if (typeof chrome.storage !== 'undefined')
        return new TspChromiumStorage();
    }
    catch (ErrorMessage)
    {
      spLog.logError(this.constructor.name + '.CreateExtensionStorage() Error: ' + ErrorMessage);
    }
      
    return new TspWebStorage();
  },

  CreateMiniguiPopupTransport: function ()
  {
    return new TspChromiumMiniguiPopupTransport();
  },

  ExecuteUrl: function (AUrl, AInActiveTab, AReusedTabCallback)
  {
    try
    {
      chrome.tabs.query({currentWindow: true}, function (tabs) {
        var blankTab = null;
        // AInActiveTab means, that we should close all opened tabs (used for autofill testing)
        if (!AInActiveTab)
        {
          // check each tab for our AUrl
          for (var i = 0, lenTabs = tabs.length; i < lenTabs; i++)
          {
            var tab = tabs[i];
            if (spAutofillCore.HTMLTools.IsBlankPageUrl(tab.url))
            {
              // tab is blank - store it
              blankTab = tab;
            } 
            else if (spStrings.SameText(tab.url, AUrl) ||
                     spStrings.SameText(tab.url, AUrl + '/')
                    )
            {
              // the AUrl is already opened, just activate this tab
              chrome.tabs.update(tab.id, {active: true});
              if (AReusedTabCallback)
                AReusedTabCallback(tab);
              return;
            }
          }
        }
        if (blankTab)
        {
          // select blank tab and navigate AUrl in it
          chrome.tabs.update(blankTab.id, {active: true, url: AUrl});
        }
        else
        {
          // open AUrl in new tab
          chrome.tabs.create({url: AUrl}, function (createdTab) {
            if (AInActiveTab)
            try
            {
              // we should close all opened tabs (used for autofill testing)
              for (var i = 0, lenTabs = tabs.length; i < lenTabs; i++)
              {
                var tab = tabs[i];
                chrome.tabs.remove(tab.id);
              }
            }
            catch (ErrorMessage)
            {
              spLog.logError(this.constructor.name + '.ExecuteUrl() Error closing tabs: ' + ErrorMessage);
            }
          });
        }
      });
      return true;
    }
    catch (ErrorMessage)
    {
      spLog.logError(this.constructor.name + '.ExecuteUrl() Error: ' + ErrorMessage);
    }
    return false;
  }
}



var __exports = {};
__exports.spBackgroundTools = spBackgroundTools;

if (typeof exports !== 'undefined')
  exports = __exports;
else
  spDefine('spBackgroundTools', __exports);

})();