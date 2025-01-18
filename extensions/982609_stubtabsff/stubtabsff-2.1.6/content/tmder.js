// Copyright (c) Zanger LLC. All rights reserved.

(function(){var retries=0;var confirmRegEx=new RegExp(/We apologize. We are unable to complete your request on this device./g);var eventPage=new RegExp(/data-reactid=".0.1.2.1.0.0.0.6.1.0">Reset</);stringCheck();eventCheck();browser.runtime.onMessage.addListener(function(message,sender,reply){if(message.type=="tmderfix"){setTimeout(stringCheck,2500+Math.floor(Math.random()*2001));}});function stringCheck(){if(result=confirmRegEx.exec(document.body.innerText)){browser.runtime.sendMessage({'type':"tmderfix"});localStorage.clear();sessionStorage.clear();}
else{setTimeout(stringCheck,1000);}}
function eventCheck(){if(result=eventPage.exec(document.body.innerHTML)){browser.runtime.sendMessage({'type':"eventscreen"});}}})();