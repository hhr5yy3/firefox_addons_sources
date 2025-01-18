var jSessions = {};
var sessions  = {}; // active sessions

function handleClick() {
  browser.runtime.openOptionsPage();
}
browser.browserAction.onClicked.addListener(handleClick);

async function getSessions() {
  browser.runtime.sendMessage({"type": "setSessions", "sessions": sessions});
}

async function clearSession(session_key) {
  if (typeof(sessions[ session_key ]) != "undefined") {
    clearTimeout(sessions[ session_key ]['timeout']);
    delete sessions[ session_key ];
    
    browser.runtime.sendMessage({"type": "setSessions", "sessions": sessions});
  }
}

async function clearAllSessions() {
  for (var i in sessions) {
    clearTimeout(sessions[ i ]['timeout']);
  }
  sessions = {};

  browser.runtime.sendMessage({"type": "setSessions", "sessions": sessions});
}

function checkHrefMatchUrl(href, url, regExp=false) {
  return (!regExp && href.indexOf(url) == 0 || regExp && href.match(new RegExp(url)) != null);
}
function handleUpdatedTab(tabId, changeInfo, tabInfo) {
  if (changeInfo.url && !changeInfo.url.startsWith("about:")) {
    let href = changeInfo.url;
		let matches = null;
		let session = null;

		// search for startUrl in all defined sessions
		for (let i in jSessions) {
			// check if href matches startUrl
			if (checkHrefMatchUrl(href, jSessions[ i ].startUrl, jSessions[ i ].regExp)) {
				if (typeof(sessions[ jSessions[ i ].endUrl ]) == "undefined") {
					let timeOut = jSessions[ i ].pingTimeout;
					if (jSessions[ i ].pingRand > 0) {
						timeOut = timeOut - jSessions[ i ].pingRand + (Math.random() * jSessions[ i ].pingRand * 2);
						if (timeOut < 1) {
							timeOut = 1;
						}
					}
					timeOut = timeOut * 60 * 1000;
					
					sessions[ jSessions[ i ].endUrl ] = {
						'session': i,
						'timeout': setTimeout(function(){ keepSession( jSessions[ i ].endUrl ) }, timeOut)
					};
					
					if( jSessions[ i ].notify ){
            browser.notifications.create("mSK", {
              "type": "basic",
              "iconUrl": browser.extension.getURL("icons/64.png"),
              "title": jSessions[ i ].startUrl,
              "message": browser.i18n.getMessage("sessionStarted")
            });
            setTimeout(function(){ browser.notifications.clear("mSK") }, 5000);
					}
				}
				return;
			}
		}

		// check for endUrl in all active sessions
		for (let i in sessions) {
			// check if href matches endUrl
			if (typeof(jSessions[ sessions[ i ].session ]) != "undefined" && checkHrefMatchUrl(href, i, jSessions[ sessions[ i ].session ].regExp)) {
				if( jSessions[ sessions[ i ].session ].notify ){
          browser.notifications.create("mSK", {
            "type": "basic",
            "iconUrl": browser.extension.getURL("icons/64.png"),
            "title": i,
            "message": browser.i18n.getMessage("sessionEnded")
          });
          setTimeout(function(){ browser.notifications.clear("mSK") }, 5000);
				}
				clearTimeout(sessions[ i ]['timeout']);
				delete sessions[ i ];
				return;
			}
		}
  }
}
function keepSession(session_key) {
  if (typeof(sessions[ session_key ]) == "undefined") {
    return;
  }
  
  /**
   * delete current session from sessions list
   * (if session has been deleted in options window, timeout will remain in memory)
   */
  let session = sessions[ session_key ]['session'];
  delete sessions[ session_key ];

  let openUrl = null;
  if (session == 'AdHoc') {
    openUrl = session_key;
  }
  else {
    // get session data
    let oSession = jSessions[ session ];
    if( typeof(oSession) == "undefined" ){
      return;
    }
    openUrl = oSession.pingUrl;
  }

  let oReq = new XMLHttpRequest();
  oReq.onreadystatechange = function() { requestOnReadyState(oReq, session_key, session) };
  oReq.open("GET", openUrl, true);
  oReq.send(null);
}
function requestOnReadyState(oReq, session_key, session) {
  // request DONE
  if (oReq.readyState == 4) {
    let oSession = null;
    if (session == 'AdHoc') {
      if( typeof(ahSessions[ session_key ]) == "undefined" ){
        return;
      }
      oSession = {
        'pingTimeout': ahSessions[ session_key ]['pingTimeout'],
        'notify': ahSessions[ session_key ]['notify']
      };
    }
    else {
      // get session data
      oSession = jSessions[ session ];
      if( typeof(oSession) == "undefined" ){
        return;
      }
    }
    
    // correct response
    if (oReq.status == 200) {
      // set new timeout
      let timeOut = oSession.pingTimeout;
      if (oSession.pingRand > 0) {
        timeOut = timeOut - oSession.pingRand + (Math.random() * oSession.pingRand * 2);
        if (timeOut < 1) {
          timeOut = 1;
        }
      }
      timeOut = timeOut * 60 * 1000;
      
      sessions[ session_key ] = {
        'session': session,
        'timeout': setTimeout(function(){ keepSession(session_key) }, timeOut)
      };
      if( oSession.notify ){
        browser.notifications.create("mSK", {
          "type": "basic",
          "iconUrl": browser.extension.getURL("icons/64.png"),
          "title": session_key,
          "message": browser.i18n.getMessage("sessionRefreshed")
        });
        setTimeout(function(){ browser.notifications.clear("mSK") }, 5000);
      }
    }
    else {
      browser.notifications.create("mSK", {
        "type": "basic",
        "iconUrl": browser.extension.getURL("icons/64.png"),
        "title": session_key,
        "message": browser.i18n.getMessage("incorrectResponse") + "\n" + browser.i18n.getMessage("status") + ": " + oReq.status
      });
      setTimeout(function(){ browser.notifications.clear("mSK") }, 5000);
    }
  }
}
browser.tabs.onUpdated.addListener(handleUpdatedTab);

function restoreSessions() {
  function setSessions(result) {
    if( typeof(result.sessions) != "undefined" ) {
      jSessions = result.sessions;
    }
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  let getting = browser.storage.local.get("sessions");
  getting.then(setSessions, onError);
}
restoreSessions();

function storageChange(changes, area) {
  if (area == "local" && typeof(changes["sessions"]) != "undefined") {
      jSessions = changes["sessions"].newValue;
  }
}
browser.storage.onChanged.addListener(storageChange);