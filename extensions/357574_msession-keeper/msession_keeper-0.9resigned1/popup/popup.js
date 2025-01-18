let backgroundPage = browser.extension.getBackgroundPage();

function returnDomain(url) {
  return url.replace('http://','').replace('https://','').split(/[/?#]/)[0];
}

function clearSession(e) {
  backgroundPage.clearSession(e.target.href);
  e.preventDefault();
}

function clearAllSessions() {
  backgroundPage.clearAllSessions();
}

function openOptions() {
  browser.runtime.openOptionsPage();
}

browser.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  let ulSessions = document.getElementById("ulSessions");
  switch(message.type) {
      case "setSessions":
        while( ulSessions.firstChild ){
          ulSessions.removeChild( ulSessions.firstChild );
        }
        if (typeof(message.sessions) == "undefined" || Object.keys(message.sessions).length < 1) {
          document.getElementById("title").innerText = browser.i18n.getMessage("noActiveSessions");
        }
        else {
          for (let i in message.sessions) {
            let li = document.createElement("li"),
                anchor = document.createElement("a");
            anchor.href = i;
            anchor.text = returnDomain(i);
            anchor.title = browser.i18n.getMessage("clearSession");
            anchor.addEventListener("click", clearSession);
            li.appendChild(anchor);
            ulSessions.appendChild(li);
          }
        }
      break;
  }
  return true;
});

backgroundPage.getSessions();

document.getElementById("clearAllSessions").innerText = browser.i18n.getMessage("clearAllSessions");
document.getElementById("openOptions").innerText = browser.i18n.getMessage("options");

document.getElementById("openOptions").addEventListener("click", openOptions);
document.getElementById("clearAllSessions").addEventListener("click", clearAllSessions);