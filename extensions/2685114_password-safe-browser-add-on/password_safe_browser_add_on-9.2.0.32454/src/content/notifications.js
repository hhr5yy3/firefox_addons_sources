function showPsrNotification(notificationText,buttonActions,onCloseDialog){function closeTheDialog(){!function(shadowHost,countdownInterval){var fadeOut=shadowHost.shadowRoot.getElementById("fadeOut");fadeOut.className+=" fade-out",setTimeout(()=>{clearInterval(countdownInterval),window.document.children[0].removeChild(shadowHost)},2e3)}(shadowHost,countdownInterval),onCloseDialog&&"function"==typeof onCloseDialog&&onCloseDialog()}const shadowHost=document.createElement("div");shadowHost.attachShadow({mode:"open"}),shadowHost.style.all="initial",shadowHost.shadowRoot.innerHTML=htmlFactory.getShadowRootStyle();var el=document.createElement("div");if(el.innerHTML=`
      <div id="fadeOut" class="dialog-2">
        <div class="main">
          <div class="title-container">
            <div class="logo-container">
              <image src='${abstractBrowser.getImageUrl("ImageV8.svg")}' class="logo" />
              <span class="title">Netwrix Password Secure</span>
            </div>
            <div>
              <a id="closeDialog"></a>
            </div>
          </div>
          <div class="content-container">
            <div id="component" class="text-black"></div>
            <div class="button-container" id="buttonContainer">
            </div>
          </div>
        </div>
      </div>
    `,shadowHost.shadowRoot.appendChild(el),window.document.children[0].appendChild(shadowHost),shadowHost.shadowRoot.getElementById("closeDialog").innerHTML=translate("close_popup"),shadowHost.shadowRoot.getElementById("component").innerHTML=notificationText,buttonActions){var buttonContainer=shadowHost.shadowRoot.getElementById("buttonContainer");let i=0;for(const button of buttonActions){i++;let{id:buttonId,name:buttonName,action:buttonAction}=button;null==buttonId&&(id="dialog_button_"+i);var anchorElement=document.createElement("a");anchorElement.id=buttonId,anchorElement.textContent=buttonName,buttonContainer.appendChild(anchorElement),anchorElement.onclick=function(){buttonAction(),closeTheDialog()}}}shadowHost.shadowRoot.getElementById("closeDialog").onclick=function(){closeTheDialog()},shadowHost.shadowRoot.getElementById("fadeOut").onclick=function(){countdown=0,shadowHost.shadowRoot.getElementById("component").innerHTML=notificationText,clearInterval(countdownInterval)};let countdown=30;const countdownInterval=setInterval(()=>{shadowHost.shadowRoot.getElementById("component").innerHTML=notificationText+`
        `+(countdown?""+translate("timer",[countdown]):""),--countdown<0&&(window.document.children[0].removeChild(shadowHost),clearInterval(countdownInterval))},1e3)}