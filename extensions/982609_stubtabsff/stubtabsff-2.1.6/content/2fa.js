// Copyright (c) Zanger LLC. All rights reserved.

(function(){pingBackground();browser.runtime.onMessage.addListener(function(message,sender,reply){if(message.type=="2FA_code"){handle2FACodeResponse(message.code);}
else if(message.type=="2FA_failed"){set2FAStatusMessage("One-Time Code: StubTabs failed to retrieve code");}});async function pingBackground(){var sending=browser.runtime.sendMessage({'type':"License"});await sending.then(handleResponse);}
function handleResponse(info){if(info.active){setupEmailEventListener();setTimeout(setupPromptEventListener,1000);}}
function set2FAStatusMessage(msg){var el=document.getElementsByClassName("sc-gbzWSY NsmLB")[0];if(el){el.innerHTML=msg;}}
function handle2FACodeResponse(code){set2FAStatusMessage("One-Time Code is <b>"+code+"</b>");}
function setupEmailEventListener(){var el=document.getElementsByClassName("sc-pbvBv gaffan sc-pReXV kQsqEz noFocus")[0];if(el&&el.addEventListener){el.addEventListener("click",saveEmail,false);}}
function setupPromptEventListener(){var el=document.getElementsByClassName("sc-bdVaJa lgAfva sc-gldTML gjjrhN noFocus")[0];if(el&&el.addEventListener){el.addEventListener("click",processPrompt,false);setTimeout(setupResendEventListener,61000);}}
function setupResendEventListener(){var el=document.getElementsByClassName("sc-ckVGcZ sc-eNQAEJ jYJGOC sc-jqIZGH YixFF noFocus")[0];if(el&&el.addEventListener){el.addEventListener("click",processResend,false);}}
function saveEmail(){var email=document.getElementById("email[objectobject]__input").value;browser.runtime.sendMessage({'type':"2FA_email",'email':email});}
function displayWaitingMessage(){set2FAStatusMessage("One-Time Code: StubTabs is waiting for code");}
function processPrompt(){var el=document.getElementsByClassName("sc-ESoVU kMjhVn")[0];if(el&&el.value){if(el.value=="EMAIL"){browser.runtime.sendMessage({'type':"2FA_requestCode"});setTimeout(displayWaitingMessage,2000);}}}
function processResend(){browser.runtime.sendMessage({'type':"2FA_requestCode"});displayWaitingMessage();}})();