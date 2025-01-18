var Emit = function(options) {
  // decorator: compatibility with Firefox/Chrome
  chrome.runtime.sendMessage({
    message: options.message,
    content: options.content
  });
}

var Listen = function(options) {
  // decorator: compatibility with Firefox/Chrome
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (options.message == request.message)
      options.callback(request.content);
    return true;
  });
}

var popupData = null;

var ShowPopup = function() {
  var width = 818;
  var height = 626;

  var left = (screen.width/2)-(width/2);
  var top = (screen.height/2)-(height/2);
  chrome.tabs.create({
      url: chrome.extension.getURL('/data/slider/slider.html'),
      active: false
  }, function(tab) {
      chrome.windows.create({
          tabId: tab.id,
          type: 'popup',
          width: width,
          height: height,
          left: left,
          top: top
      });
  });
}

function WebRTC(enableWebRTC) {
  var policy = enableWebRTC ? chrome.privacy.IPHandlingPolicy.DEFAULT : chrome.privacy.IPHandlingPolicy.DISABLE_NON_PROXIED_UDP;
  try {chrome.privacy.network.webRTCIPHandlingPolicy.set({value: policy})} catch(err) {}
}

Listen({
  message: 'ConsoleLog',
  callback: function(message) {
    console.log((new Date()).getTime());
    console.log(message);
  }
})

Listen({
  message: 'InitializeBackground',
  callback: function(message) {
    Emit({
      message: 'InitializeContentScript',
      content: popupData
    })
  }
})

Listen({
  message: 'SavePopupBackground',
  callback: function(message) {
    popupData = message;
  }
})

Listen({
  message: 'SaveFavoriteBackground',
  callback: function(message) {
    Preferences.favoriteProxy = message.favoriteProxy;
    Preferences.SavePreferences();
  }
})

Listen({
  message: 'LoadPreferencesBackground',
  callback: function(message) {
    Preferences.LoadPreferences(function() {
      Preferences.LoadExtensionPreferences(function() {
        if ((new Date().getTime()) > Preferences.extensionPreferences.tutorial) {
          Preferences.extensionPreferences.tutorial = (new Date().getTime()) + 30*24*60*60*1000; // 30 days
          Preferences.SaveExtensionPreferences();
          Emit({
            message: 'HidePopupContentScript',
            content: {}
          });
          ShowPopup();
        }
      })
      if (Preferences.profile.email && Preferences.profile.pass) {
        Emit({
          message: 'AutoLoginContentScript',
          content: {
            'email': Preferences.profile.email,
            'pass': Preferences.profile.pass
          }
        });
      }
      // TODO: if all three cache was not expired then show main automatically
      // TODO: catch any JS error and delete profile (global reset)
      // TODO: hit on 'enter' key must submit form
    })
  }
})

Listen({
  message: 'OpenUrlBackground',
  callback: function(message) {
    chrome.tabs.create({'url': message});
    /*window.close();*/
  }
})

Listen({
  message: 'AbortRequestBackground',
  callback: function (message) {
    ServerAPI.AbortRequst();
  }
})

Listen({
  message: 'AuthenticateBackground',
  callback: function (message) {
    GeoInformatoinSuccess = function() {
      var userGeoInfo = Preferences.userGeoInfo;
      Emit({
        message: 'GeoInformatoinContentScript',
        content: {'location': (userGeoInfo.city) ? userGeoInfo.country+', '+userGeoInfo.city : userGeoInfo.country}
      });
      var profile = Preferences.profile;
      Emit({
        message: 'AuthenticateContentScript',
        content: {'valid': profile.valid, 'total': profile.total}
      });
    }

    AuthenticateSuccess = function() {
      // if cached userGeoInfo did not expire then use cached one
      var now = Math.floor((new Date().getTime()) / 1000);
      if (now - Preferences.userGeoInfo.cacheTime < Preferences.USER_GEO_INFO_CACHE_EXPIRE) {
        GeoInformatoinSuccess();
        return;
      }

      // stored userGeoInfo expired, request new one from server
      ServerAPI.GeoInformatoin(
        function(code, country, city, server) {
          Preferences.userGeoInfo.code = code;
          Preferences.userGeoInfo.country = country;
          Preferences.userGeoInfo.city = city;
          Preferences.userGeoInfo.server = server;
          Preferences.userGeoInfo.cacheTime = Math.floor((new Date().getTime()) / 1000);
          Preferences.SavePreferences(function() {
            GeoInformatoinSuccess();
          })
        },
        function(code, message) {
          var profile = Preferences.profile;
          Emit({
            message: 'GeoInformatoinContentScript',
            content: {'location': message}
          });
          Emit({
            message: 'AuthenticateContentScript',
            content: {'valid': profile.valid, 'total': profile.total}
          });
        }
      )
    }

    var now = Math.floor((new Date().getTime()) / 1000);
    if (now - Preferences.profile.cacheTime < Preferences.PROFILE_CACHE_TIME) {
      AuthenticateSuccess();
      return;
    }

    ServerAPI.Authenticate(
      message.email,
      message.pass,
      function(valid, total, invoice) {
        Preferences.profile.email = message.email;
        Preferences.profile.pass = message.pass;
        Preferences.profile.valid = valid;
        Preferences.profile.total = total;

        // if invoice is different from what we already reported
        if (invoice != '' && Preferences.profile.invoice != invoice) {
          chrome.tabs.create({'url': chrome.i18n.getMessage('url_thanks')+invoice});
          Preferences.profile.invoice = invoice;
        }

        Preferences.profile.cacheTime = (valid < 0) ? 0 : Math.floor((new Date().getTime()) / 1000);
        Preferences.SavePreferences(function() {
          AuthenticateSuccess();
        })
      },
      function(code, message) {
        Emit({
          message: 'AuthenticateContentScript',
          content: {'code': code, 'message': message}
        });
      }
    )
  }
})

Listen({
  message: 'RegisterUserBackground',
  callback: function (message) {
    ServerAPI.RegisterUser(
      message.email,
      message.pass,
      function() {
        Emit({
          message: 'RegisterUserContentScript',
          content: {}
        });
      },
      function(code, message) {
        Emit({
          message: 'RegisterUserContentScript',
          content: {'code': code, 'message': message}
        });
      }
    )
  }
})

Listen({
  message: 'GetProxyListBackground',
  callback: function (message) {
    GetProxyListSuccess = function() {
      Emit({
        message: 'GetProxyListContentScript',
        content: {
          'serverProxyList': Preferences.proxyList.server,
          'freeProxyList': Preferences.proxyList.free,
          'userProxyList': Preferences.proxyList.user,
          'favoriteProxy': Preferences.favoriteProxy,
          'settings': Preferences.settings,
          'showTutorial': Preferences.extensionPreferences.tutorial,
          'showRate': Preferences.extensionPreferences.rate
        }
      });
    }

    // if cached proxy list did not expire then use cached one
    var now = Math.floor((new Date().getTime()) / 1000);
    if (now - Preferences.proxyList.cacheTime < Preferences.PROXY_LIST_CACHE_EXPIRE) {
      GetProxyListSuccess();
      return;
    }

    // stored proxy list expired, request new one from server
    ServerAPI.GetProxyList(
      message.email,
      message.password,
      message.isDemo,
      function(proxyList) {
        Preferences.proxyList.server = proxyList;
        Preferences.proxyList.cacheTime = Math.floor((new Date().getTime()) / 1000);
        Preferences.SavePreferences(function() {
          ServerAPI.GetFreeProxyList(
            message.email,
            message.password,
            function(proxyList) {
              Preferences.proxyList.free = proxyList;
              Preferences.SavePreferences(function() {
                GetProxyListSuccess();
              })
            }
          )
        })
      },
      function(code, message) {
        Emit({
          message: 'GetProxyListContentScript',
          content: {'code': code, 'message': message}
        });
      }
    )
  }
})

Listen({
  message: 'LogoutBackground',
  callback: function (message) {
    ProxyManager.RestoreProxy()
    var LogoutComplete = function () {
      Preferences.ResetProfile();
      Preferences.ResetProxyList();
      Preferences.ResetUserGeoInfo();
      Preferences.ResetSettings();
      Preferences.DeletePreferences(function() {
        Emit({
          message: 'LogoutContentScript',
          content: {}
        });
      })
    }
    ServerAPI.Logout(
      message.email,
      function() {
        LogoutComplete();
      },
      function() {
        LogoutComplete();
      }
    )
  }
})

Listen({
  message: 'SendMessageBackground',
  callback: function (message) {
    ServerAPI.SendMessage(
      message.email,
      message.pass,
      message.subject,
      message.message,
      function(code, message) {
        Emit({
          message: 'SendMessageContentScript',
          content: {'code': code, 'message': message, 'isError': false}
        });
      },
      function(code, message) {
        Emit({
          message: 'SendMessageContentScript',
          content: {'code': code, 'message': message, 'isError': true}
        });
      }
    )
  }
})

Listen({
  message: 'IdentifyProxyBackground',
  callback: function (message) {
    ServerAPI.IdentifyProxy(
      message.data,
      Preferences.geoData,
      function(proxyList, geoData) {
        Preferences.proxyList.user = proxyList;
        Preferences.geoData = geoData;
        Preferences.SavePreferences(function() {
          Emit({
            message: 'IdentifyProxyContentScript',
            content: {
              'serverProxyList': Preferences.proxyList.server,
              'userProxyList': Preferences.proxyList.user
            }
          });
        })
      },
      function(code, message) {
        Emit({
          message: 'IdentifyProxyContentScript',
          content: {'code': code, 'message': message}
        });
      }
    )
  }
})

Listen({
  message: 'SaveSettingsBackground',
  callback: function (message) {
    Preferences.settings = message.settings;
    Preferences.SavePreferences(function() {
      Emit({
        message: 'SaveSettingsContentScript',
        content: {'settings': Preferences.settings}
      });
    })
  }
})

Listen({
  message: 'RecoverPasswordBackground',
  callback: function (message) {
    ServerAPI.RecoverPassword(
      message.email,
      function(code, message) {
        Emit({
          message: 'RecoverPasswordContentScript',
          content: {'code': code, 'message': message, 'isError': false}
        });
      },
      function(code, message) {
        Emit({
          message: 'RecoverPasswordContentScript',
          content: {'code': code, 'message': message, 'isError': true}
        });
      }
    )
  }
})

Listen({
  message: 'HidePopupBackground',
  callback: function (message) {
    /*window.close();*/
  }
})

Listen({
  message: 'SetupProxyBackground',
  callback: function (message) {
    var siteExpludeList = Preferences.settings.siteExpludeList;
    var countryCode = message.code.toUpperCase();
    var userAgent = UserAgentList.GetRandomUserAgent();
    if (!Preferences.settings.hide_icon) {
      ProxyManager.SetIcon('flags', countryCode, countryCode);
    } else {
      ProxyManager.SetIcon('icons', 'hidden', '');
    }
    ProxyManager.SetupProxy(message.host, message.port, message.code, message.name, message.user, message.password, userAgent, siteExpludeList, function() {
      //WebRTC(false);
    });
  }
})

Listen({
  message: 'RestoreProxyBackground',
  callback: function (message) {
    if (!Preferences.settings.hide_icon) {
      ProxyManager.SetIcon('icons', 'off', '');
    } else {
      ProxyManager.SetIcon('icons', 'hidden', '');
    }
    ProxyManager.RestoreProxy(function() {
      //WebRTC(true);
    })
  }
})

Listen({
  message: 'ShowHowToBackground',
  callback: function(message) {
    Emit({
      message: 'HidePopupContentScript',
      content: {}
    });
    ShowPopup();
  }
})

Listen({
  message: 'RateNowBackground',
  callback: function (message) {
    Preferences.extensionPreferences.rate = (new Date().getTime()) + 30*24*60*60*1000; // 30 days
    Preferences.SaveExtensionPreferences();
    chrome.tabs.create({'url': chrome.i18n.getMessage('url_rate')});
    Emit({
      message: 'TutorialRateContentScript',
      content: {
        'tutorial': Preferences.extensionPreferences.tutorial,
        'rate': Preferences.extensionPreferences.rate
      }
    });
  }
})

Listen({
  message: 'RateLaterBackground',
  callback: function (message) {
    Preferences.extensionPreferences.rate = (new Date().getTime()) + 24*60*60*1000; // 24 hours
    Preferences.SaveExtensionPreferences();
    Emit({
      message: 'TutorialRateContentScript',
      content: {
        'tutorial': Preferences.extensionPreferences.tutorial,
        'rate': Preferences.extensionPreferences.rate
      }
    });
  }
})

Listen({
  message: 'RateNoProxyBackground',
  callback: function (message) {
    Preferences.extensionPreferences.rate = (new Date().getTime()) + 30*24*60*60*1000; // 30 days
    Preferences.SaveExtensionPreferences();
    Emit({
      message: 'TutorialRateContentScript',
      content: {
        'tutorial': Preferences.extensionPreferences.tutorial,
        'rate': Preferences.extensionPreferences.rate
      }
    });
  }
})

chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
  //console.log("onBeforeSendHeaders!", details);
  if (ProxyManager.currentProxy !== null) {
    for (var i in details.requestHeaders)
      switch(details.requestHeaders[i].name) {
        case 'User-Agent':
          if (Preferences.settings.fake_browser)
            details.requestHeaders[i].value = ProxyManager.userAgent;
          break;
        case 'Referer':
          if (Preferences.settings.block_referer)
            details.requestHeaders.splice(i, 1);
          break;
      }
    return {requestHeaders: details.requestHeaders};
  }
}, {urls: ["<all_urls>"]}, ["blocking", "requestHeaders"]);

/*chrome.management.getAll(function(apps) {
  apps.forEach (function(extension) {
    if (extension.id == chrome.runtime.id || extension.enabled == false) return;
    extension.permissions.forEach(function(permission) {
      if (permission == 'proxy')
        chrome.management.setEnabled(extension.id, false);
    });
  });
});*/

chrome.runtime.onInstalled.addListener(function() {
  chrome.tabs.create({'url': chrome.i18n.getMessage('url_install')});
});

chrome.runtime.setUninstallURL(chrome.i18n.getMessage('url_uninstall'), function() {
  ProxyManager.HardReset();
});

Preferences.LoadPreferences(function() {
  if (Preferences.settings.hide_icon) {
    ProxyManager.SetIcon('icons', 'hidden', '');
  } else {
    ProxyManager.SetIcon('icons', 'off', '');
  }
});

ProxyManager.HardReset();
//WebRTC(true);