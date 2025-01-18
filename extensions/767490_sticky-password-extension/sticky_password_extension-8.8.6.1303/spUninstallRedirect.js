
//*****************************************************************************}
//                                                                             }
//       Sticky Password manager & safe                                        }
//       Chromium Uninstall Redirect Module                                    }
//                                                                             }
//       © 2001 - 2024 Lamantine Software. All rights reserved.                }
//                                                                             }
//*****************************************************************************}

// Microsoft Edge support
if (typeof browser != 'undefined')
  chrome = browser;

(function() {

'use strict';

var searchParams = new URLSearchParams(document.location.search);
if (searchParams.has('extensionId'))
{
  let extensionIdUrl = searchParams.get('extensionId')
  if (extensionIdUrl != chrome.runtime.id)
  {
    console.warn('Other extensionId specified to uninstall');
    return;
  }
}
else if (document.location.protocol != 'file:')
{
  console.error('No extensionId specified to uninstall');
  return;
}

var uninstallUrl = '';
var extensionIdLoc = chrome.i18n.getMessage('@@extension_id');
if (extensionIdLoc && extensionIdLoc.length && extensionIdLoc != chrome.runtime.id)
  uninstallUrl = 'moz-extension://' + extensionIdLoc + '/spUninstall.html';
else
  uninstallUrl = 'chrome-extension://' + chrome.runtime.id + '/spUninstall.html';
var message = {};
message.Action = 'RedirectTabToUrl';
message.Url = uninstallUrl;
chrome.runtime.sendMessage(message);

})();