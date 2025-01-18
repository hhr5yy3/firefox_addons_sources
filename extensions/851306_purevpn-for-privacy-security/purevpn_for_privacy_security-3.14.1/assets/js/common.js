/*
*	PureVPN
*	by GZ systems Ltd.
*	Everyone is permitted to copy and distribute verbatim copies
*	of this document, but changing it is not allowed.
*
*	This program is distributed in the hope that it will be useful,
*	but WITHOUT ANY WARRANTY; without even the implied warranty of
*	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
*
*	copyright 2016 All Rights are Reserved.
*/

(function() {
  'use strict';
  var pVn = self.pVn = self.pVn || {};
  //! Notifications
  pVn.notifier = function(sMessage) {
    var div = document.createElement("div");
    div.setAttribute("class", "alert alert-dismissible alert-info");
    var button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("class", "close");
    button.setAttribute("data-dismiss", "alert");
    button.innerText = "×";
    var span = document.createElement("span");
    span.innerText = sMessage;
    div.appendChild(button);
    div.appendChild(span);

    var item = document.getElementById("notifMsg");
    if (item.hasChildNodes()) {
      document.getElementById("notifMsg").removeChild(item.childNodes[0]);
    }
    document.getElementById("notifMsg").appendChild(div);
    document.getElementById("notifMsg").style.display = 'block';
    setTimeout(function() {
      document.getElementById("notifMsg").style.display = 'none';
    }, 3000);
  };

  var onPortMessage = function(oPort) {
    if (oPort.name === "offlineStatus") {
      oPort.onMessage.addListener(function(oRequest) {
        // console.log(oRequest);
        if (oRequest.isOnline) {
          $(".connectionError").addClass("hide");
        } else {
          $(".connectionError").removeClass("hide");
        }
      });
    }
  };
  chrome.runtime.onConnect.addListener(onPortMessage);
})();
