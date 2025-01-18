var addPasswordService;void 0===addPasswordService&&(addPasswordService=function(){const formSubmitDetectionBlockTimeout=5e3;let isFormSubmitDetectionBlocked=!1,passwordForm;const userFormFields=[];let eventsBound=!1;const passwordGeneratorIcons=[];function onFormSubmit(submitEvent){handleFormSubmit(submitEvent.target)}function onClick(mouseEvent){let clickedButton=mouseEvent.target;var buttonSelector="button, [role=button], [type=button], .button";(clickedButton=matchesSelector(mouseEvent.target,buttonSelector)?clickedButton:mouseEvent.target.closest(buttonSelector))&&handleFormSubmit(clickedButton.closest("form"))}function onKeyDown(keyboardEvent){var target,psrfilled,psrpreviousbackground;13!==keyboardEvent.keyCode&&(psrfilled=(target=keyboardEvent.target).getAttribute("psrfilled"),psrpreviousbackground=target.getAttribute("psrpreviousbackground"),"true"===psrfilled&&null!==psrpreviousbackground&&(target.style.background=psrpreviousbackground,target.removeAttribute("psrpreviousbackground")),target.setAttribute("psrtouched",!0)),isRelevantField(keyboardEvent.target)&&(userFormFields.find(f=>f===keyboardEvent.target)||userFormFields.push(keyboardEvent.target),"password"===keyboardEvent.target.type&&(passwordForm=keyboardEvent.target.closest("form")),13===keyboardEvent.keyCode)&&handleFormSubmit(keyboardEvent.target.closest("form"))}function handleFormSubmit(submittedForm){if(!isFormSubmitDetectionBlocked){submittedForm=(submittedForm=submittedForm||passwordForm)?Array.prototype.slice.call(submittedForm.querySelectorAll("input, select")).filter(el=>"hidden"!==el.type&&!el.hidden).filter(el=>!!el.value):userFormFields.slice();const someTouched=submittedForm.some(el=>el.getAttribute("psrtouched"));submittedForm=submittedForm.filter(el=>someTouched||!el.getAttribute("psrfilled"));if(submittedForm.find(el=>"password"===el.type)){for(passwordForm=null;userFormFields.length;)userFormFields.pop();var siteNameElement=document.querySelector('[property="og:site_name"]'),submittedForm={fields:submittedForm.map(prepareHtmlElementForSerialization),url:window.location.href,ogSiteName:siteNameElement?siteNameElement.content:null};abstractBrowser.sendMessage({command:"FormSubmitDetected",formDetectionResult:submittedForm}),isFormSubmitDetectionBlocked=!0,setTimeout(()=>isFormSubmitDetectionBlocked=!1,formSubmitDetectionBlockTimeout)}}}function prepareHtmlElementForSerialization(htmlElement){var elementLabel,element=serializeHtmlElement(htmlElement);return element.id&&(elementLabel=document.querySelector('label[for="'+element.id+'"]'))&&(element.label=elementLabel.textContent),element.isRelevant=isRelevantField(element),element.parents=function(htmlElement){var parents=[];let parent=htmlElement.parentElement;for(;parent&&"HTML"!==parent.tagName;)parents.push(parent),parent=parent.parentElement;return parents}(htmlElement).map(serializeHtmlElement),element}function serializeHtmlElement(htmlElement){return JSON.parse(JSON.stringify(htmlElement,["id","name","tagName","type","role","value","title","className","src","placeholder"]))}function translate(key,inserts){return translationService.translate(key,inserts)}function showPasswordGeneratorIcon(element){const shadowHost=document.createElement("div");shadowHost.attachShadow({mode:"open"}),shadowHost.style.all="initial",shadowHost.shadowRoot.innerHTML=htmlFactory.getShadowRootStyle();var el=document.createElement("div");el.style.width="100%",el.style.height="100%",el.style.display="flex",el.innerHTML=`
        <img class="generator-icon"
          :src="$root.getImageUrl('ImageV8')"
          :style="{ width: imgSize + 'px', height: imgSize + 'px', margin: 'auto' }"
          @click="generatePassword()" />
      `,shadowHost.shadowRoot.appendChild(el),window.document.children[0].appendChild(shadowHost);const calculateAndSetPosition=()=>{var rect=element.getBoundingClientRect();shadowHost.style.top=rect.top+document.documentElement.scrollTop+"px",shadowHost.style.left=rect.left+document.documentElement.scrollLeft+element.offsetWidth-element.offsetHeight+"px",shadowHost.style.width=element.offsetHeight+"px",shadowHost.style.height=element.offsetHeight+"px",shadowHost.style.maxWidth=element.offsetHeight+"px",shadowHost.style.maxHeight=element.offsetHeight+"px",shadowHost.style.zIndex=function(element){let zIndexField=element,c=0,zIndex=0;for(;zIndexField&&!(100<c||"#document"===zIndexField.nodeName);){var z=window.getComputedStyle(zIndexField).zIndex;!isNaN(z)&&parseInt(z)>zIndex&&(zIndex=parseInt(z)),zIndexField=zIndexField.parentElement,c++}(isNaN(zIndex)||zIndex<1)&&(zIndex=1);return zIndex++}(element),shadowHost.style.position="absolute",shadowHost.style.visibility="hidden"};element.addEventListener("mouseenter",()=>{calculateAndSetPosition(),shadowHost.style.visibility="visible"}),element.addEventListener("mouseleave",()=>shadowHost.style.visibility="hidden"),shadowHost.addEventListener("mouseenter",()=>{calculateAndSetPosition(),shadowHost.style.visibility="visible"}),shadowHost.addEventListener("mouseleave",()=>shadowHost.style.visibility="hidden");var imgSize=Math.min(element.offsetHeight-2,32);return new Vue({el:el,data:{browser:window.msBrowser||window.browser||window.chrome,imgSize:imgSize},methods:{getImageUrl:function(image){return abstractBrowser.getImageUrl(image+".svg")},generatePassword:async function(){var password=await abstractBrowser.sendMessage({command:"GeneratePassword"});copyToClipboard(password)}}}),shadowHost}function hidePasswordGeneratorIcons(){if(passwordGeneratorIcons.length)for(let i=0;i<passwordGeneratorIcons.length;i++)passwordGeneratorIcons.pop().remove()}function maskPasswordValue(passwordValue){var length=passwordValue.length;if(0===length)return"";if(1===length)return"*";if(2===length)return passwordValue[0]+"*";let middlePart="";for(let i=0;i<length-2;i++)middlePart+="*";return passwordValue[0]+middlePart+passwordValue[length-1]}function isRelevantField(htmlElement){var type=htmlElement.type;return"password"===type||"text"===type||"email"===type||"SELECT"===htmlElement.tagName}return{startLoginDetection:function(){eventsBound||(window.document.addEventListener("submit",onFormSubmit,!0),window.document.addEventListener("click",onClick,!0),window.document.addEventListener("keydown",onKeyDown,!0),eventsBound=!0)},stopLoginDetection:function(){window.document.removeEventListener("submit",onFormSubmit,!0),window.document.removeEventListener("click",onClick,!0),window.document.removeEventListener("keydown",onKeyDown,!0),eventsBound=!1},showDetectedDebugDialog:function(detectionResult){detectionResult.fields&&detectionResult.fields.forEach((f,index)=>{var name=f.id||f.tagName,value="password"!==f.type?f.value:maskPasswordValue(f.value);f.uiText=index+1+". "+name+": "+value}),detectionResult.matchingContainers&&detectionResult.matchingContainers.forEach((c,index)=>{c.uiText=index+1+". "+c.container.ContainerName+": "+c.container.ContainerUserName});const shadowHost=document.createElement("div");shadowHost.attachShadow({mode:"open"}),shadowHost.style.all="initial",shadowHost.shadowRoot.innerHTML=htmlFactory.getShadowRootStyle();var el=document.createElement("div");el.innerHTML=`
          <div class="debug dialog">
              <div class="float-right">
                  <button id="resend">Resend</button>
                  <button class="close-button" id="closeDialog">X</button>
              </div>

              <h2>// Debug</h2>

              <div class="mb">
                  Detected fields:
                  ${detectionResult.fields.map(field=>`
                          <div class="field">
                              <div>${field.uiText}</div>
                              <button class="more-info">More info</button>
                              <div class="field-info" style="display: none;">${JSON.stringify(field,(key,value)=>"value"===key&&"password"===field.type?maskPasswordValue(value):value,2)}</div>
                          </div>
                      `).join("")}
              </div>

              <div class="mb">
                  <h3>Matching containers</h3>
                  ${detectionResult.matchingContainers.map(container=>`
                          <div class="clear-fix">
                              ${container.uiText}
                              <div class="float-right">
                                  ${container.exactMatch?"URL + Username":container.urlMatch?"URL":"Username"}
                              </div>
                          </div>
                      `).join("")}
              </div>

              <div class="url-container">
                  URL: ${detectionResult.url}
              </div>
          </div>
      `,shadowHost.shadowRoot.appendChild(el),window.document.children[0].appendChild(shadowHost),el.querySelector("#resend").addEventListener("click",()=>{abstractBrowser.sendMessage({command:"FormSubmitDetected",formDetectionResult:detectionResult}),location.reload()}),el.querySelector("#closeDialog").addEventListener("click",()=>{window.document.children[0].removeChild(shadowHost)}),el.querySelectorAll(".more-info").forEach(button=>{button.addEventListener("click",function(){var fieldInfo=this.nextElementSibling,isFieldInfoVisible="none"!==fieldInfo.style.display;fieldInfo.style.display=isFieldInfoVisible?"none":"block",this.textContent=isFieldInfoVisible?"More info":"Hide info"})})},showDetectionResult:function(detectionResult,blockUrl,openWebAppAddPassword,saveChanges,verifyChanges,onCloseDialog){function closeTheDialog(){!function(shadowHost,countdownInterval){shadowHost.shadowRoot.getElementById("fadeOut").className+=" fade-out",setTimeout(()=>{clearInterval(countdownInterval),window.document.children[0].removeChild(shadowHost)},2e3)}(shadowHost,countdownInterval),"function"==typeof onCloseDialog&&onCloseDialog()}detectionResult.fields&&detectionResult.fields.forEach((f,index)=>{var name=f.id||f.tagName,value="password"!==f.type?f.value:maskPasswordValue(f.value);f.uiText=index+1+". "+name+": "+value}),detectionResult.matchingContainers&&detectionResult.matchingContainers.forEach((c,index)=>{c.uiText=index+1+". "+c.container.ContainerName+": "+c.container.ContainerUserName});const shadowHost=document.createElement("div");shadowHost.attachShadow({mode:"open"}),shadowHost.style.all="initial",shadowHost.shadowRoot.innerHTML=htmlFactory.getShadowRootStyle();var el=document.createElement("div"),countdown=(el.innerHTML=`
        <div id="fadeOut" class="dialog-2">
          <div class="main">
            <div class="title-container">
              <div class="logo-container">
                <image src='${abstractBrowser.getImageUrl("ImageV8.svg")}' class="logo" />
                <span class="title">Netwrix Password Secure</span>
              </div>
              <div>
                <a id="closeDialog"></a>
                <div class="dropdown">
                  <a class="dropdown-button">
                    <image src='${abstractBrowser.getImageUrl("ImageFlatArrowDownMulti.svg")}' style="width: 8px; height: auto; vertical-align: middle" />&#8203;
                  </a>
                  <div class="dropdown-content">
                    <a id="blockUrl" ></a>
                  </div>
                </div>
              </div>
            </div>
            <div class="content-container">
              <div id="component" class="text-black"></div>
              <div class="button-container">
                <div id="main">
                  <a id="addPassword"></a>
                  <a id="updatePassword"></a>
                </div>
                <div id="edit">
                  <a id="saveChanges"></a>
                  <a id="checkChanges"></a>
                  <a id="back"></a>
                </div>
              </div>
            </div>

          </div>
        </div>
      `,shadowHost.shadowRoot.appendChild(el),window.document.children[0].appendChild(shadowHost),shadowHost.shadowRoot.getElementById("closeDialog").innerHTML=translate("close_popup"),shadowHost.shadowRoot.getElementById("blockUrl").innerHTML=translate("dont_ask_again_for_website"),shadowHost.shadowRoot.getElementById("component").innerHTML=translate("save_password_question"),shadowHost.shadowRoot.getElementById("main").style.display="block",shadowHost.shadowRoot.getElementById("edit").style.display="none",shadowHost.shadowRoot.getElementById("addPassword").innerHTML=detectionResult.sessions&&1===detectionResult.sessions.length?""+translate("save_new_password"):""+translate("new_password_in",[detectionResult.sessions[0].database]),shadowHost.shadowRoot.getElementById("updatePassword").innerHTML=detectionResult.matchingContainers.find(c=>c.exactMatch)&&translate("update_password"),shadowHost.shadowRoot.getElementById("updatePassword").style.display=!detectionResult.matchingContainers.find(c=>c.exactMatch)&&"none",shadowHost.shadowRoot.getElementById("saveChanges").innerHTML=translate("save_password"),shadowHost.shadowRoot.getElementById("checkChanges").innerHTML=translate("check_changes"),shadowHost.shadowRoot.getElementById("back").innerHTML=translate("back"),shadowHost.shadowRoot.getElementById("blockUrl").onclick=function(){blockUrl(detectionResult.url),closeTheDialog()},shadowHost.shadowRoot.getElementById("closeDialog").onclick=function(){closeTheDialog()},shadowHost.shadowRoot.getElementById("addPassword").onclick=function(){openWebAppAddPassword(detectionResult,detectionResult.sessions[0].profileId),closeTheDialog()},shadowHost.shadowRoot.getElementById("fadeOut").onclick=function(){countdown=0,shadowHost.shadowRoot.getElementById("component").innerHTML=translate("save_password_question"),clearInterval(countdownInterval)},shadowHost.shadowRoot.getElementById("saveChanges").onclick=function(){saveChanges(detectionResult.matchingContainers.find(c=>c.exactMatch).container,detectionResult),closeTheDialog()},shadowHost.shadowRoot.getElementById("checkChanges").onclick=function(){verifyChanges(detectionResult.matchingContainers.find(c=>c.exactMatch).container,detectionResult),closeTheDialog()},shadowHost.shadowRoot.getElementById("updatePassword").onclick=function(){shadowHost.shadowRoot.getElementById("edit").style.display="block",shadowHost.shadowRoot.getElementById("main").style.display="none"},shadowHost.shadowRoot.getElementById("back").onclick=function(){shadowHost.shadowRoot.getElementById("main").style.display="block",shadowHost.shadowRoot.getElementById("edit").style.display="none"},30),countdownInterval=setInterval(()=>{shadowHost.shadowRoot.getElementById("component").innerHTML=translate("save_password_question")+`
          `+(countdown?""+translate("timer",[countdown]):""),--countdown<0&&(window.document.children[0].removeChild(shadowHost),clearInterval(countdownInterval))},1e3)},showPasswordGeneratorIcons:function(){hidePasswordGeneratorIcons(),[...document.querySelectorAll("input[type=password]")].map(showPasswordGeneratorIcon).forEach(pgIcon=>passwordGeneratorIcons.push(pgIcon))},hidePasswordGeneratorIcons:hidePasswordGeneratorIcons}}());