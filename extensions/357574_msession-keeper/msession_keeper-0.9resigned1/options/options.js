var jSessions = {};
var selectedSession = null;

function changeStartUrl() {
  let matches = document.getElementById("startUrl").value.match(/^(\w+\:\/\/)?([^\/]+)/);
  if (matches) {
    document.getElementById("pingUrlDomain").innerText = browser.i18n.getMessage("relativeTo") + " " + matches[0];
  } else {
    document.getElementById("pingUrlDomain").innerText = "";
  }
}

function newSession() {
  selectedSession = null;

  document.getElementById("lSessions").value = "";
  document.getElementById("startUrl").value = "";
  document.getElementById("endUrl").value = "";
  document.getElementById("pingUrl").value = "";
  document.getElementById("pingTimeout").value = "10";
  document.getElementById("pingRand").value = "0";
  document.getElementById("notify").checked = false;
  document.getElementById("regExp").checked = false;

  document.getElementById("startUrl").focus();
  changeStartUrl();
}

function selectSession() {
  let session  = document.getElementById("lSessions").value;
  let oSession = jSessions[ session ];
  
  if( session != "" && typeof(oSession) != "undefined" ){
    selectedSession = session;

    document.getElementById("startUrl").value = oSession.startUrl;
    document.getElementById("endUrl").value = oSession.endUrl;
    document.getElementById("pingUrl").value = oSession.pingUrl;
    document.getElementById("pingTimeout").value = oSession.pingTimeout;
    document.getElementById("pingRand").value = oSession.pingRand;
    document.getElementById("notify").checked = oSession.notify;
    document.getElementById("regExp").checked = oSession.regExp;
    
    changeStartUrl();
  }
  else {
    newSession();
  }
}

function deleteSession() {
    let lSessions = document.getElementById("lSessions");
		let session = lSessions.value;
		
		if( session != "" && typeof(jSessions[ session ]) != "undefined" ){
			lSessions.removeChild( lSessions.childNodes[ lSessions.selectedIndex ] );
			lSessions.value = "";
			delete jSessions[ session ];
			
      browser.storage.local.set({
        sessions: jSessions
      });

      newSession();
    }
}

function saveSession(e) {
    e.preventDefault();
    
    if( !document.querySelector("form").checkValidity() ){
        return;
    }

		let startUrl = document.getElementById("startUrl").value;
		let endUrl   = document.getElementById("endUrl").value;
		let pingUrl  = document.getElementById("pingUrl").value;
		let pingTimeout = document.getElementById("pingTimeout").value;
		let pingRand = document.getElementById("pingRand").value;

		if( isNaN(parseInt(pingRand)) ){
        pingRand = 0;
		}
		
		if( typeof(jSessions[ startUrl ]) !== "undefined" ){
			if( selectedSession != startUrl ){
				let answer = confirm(startUrl + " - " + browser.i18n.getMessage("confirmSessionOverwrite"));
				if( !answer ){
					return;
				}
			}
		}
		else {
      let opt = document.createElement("option");
      opt.value = startUrl;
      opt.innerText = startUrl;
			document.getElementById("lSessions").appendChild(opt);
		}

		jSessions[ startUrl ] = {
			'startUrl': startUrl,
			'endUrl': endUrl,
			'pingUrl': pingUrl,
			'pingTimeout': pingTimeout,
			'pingRand': pingRand,
			'notify': document.getElementById("notify").checked,
			'regExp': document.getElementById("regExp").checked
		};

    browser.storage.local.set({
      sessions: jSessions
    });

    newSession();
}

function restoreSessions() {
  function setOptions(result) {
    if( typeof(result.sessions) != "undefined" ) {
      jSessions = result.sessions;

      let select = document.getElementById("lSessions");
      for( let i in jSessions ){
        let opt = document.createElement("option");
        opt.value = i;
        opt.innerText = i;
        select.appendChild(opt);
      }
    }
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  let getting = browser.storage.local.get("sessions");
  getting.then(setOptions, onError);
}

function translateLabels() {
  let labels = document.querySelectorAll(".i18n");
  for(let i = 0; i < labels.length; i++) {
    try {
      labels[i].innerText = browser.i18n.getMessage( labels[i].innerText );
    } catch(err) {
      console.log('Error: ' + err.message);
    }
  }
}

document.addEventListener('DOMContentLoaded', translateLabels);
document.addEventListener('DOMContentLoaded', restoreSessions);
document.getElementById("btnDelete").addEventListener("click", deleteSession);
document.getElementById("lSessions").addEventListener("change", selectSession);
document.querySelector("form").addEventListener("submit", saveSession);