// Copyright (c) Zanger LLC. All rights reserved.

(function(){document.addEventListener('DOMContentLoaded',eventHandler);function eventHandler(){var divs=document.querySelectorAll('div');browser.browserAction.getBadgeBackgroundColor({},function(colorArray){if(!((colorArray[0]===208)&&(colorArray[1]===211)&&(colorArray[2]===212))){divs[0].style.display='none';divs[1].style.display='block';}
else{divs[0].style.display='block';divs[1].style.display='none';}});divs[0].addEventListener('click',logIn);divs[1].addEventListener('click',logOut);divs[2].addEventListener('click',gotoStorePage);divs[3].addEventListener('click',openOptions);divs[4].addEventListener('click',openAccountManagement);divs[5].addEventListener('click',openProxy);}
function logIn(event){browser.runtime.sendMessage({'type':"LogIn"});window.close();}
function logOut(event){browser.runtime.sendMessage({'type':"LogOut"});window.close();}
function openOptions(event){browser.runtime.openOptionsPage();window.close();}
function gotoStorePage(event){var storeUrl="https://www.stubtabs.com/category/stubtabsff/";browser.tabs.create({'url':storeUrl});window.close();}
function openAccountManagement(event){var url="https://www.stubtabs.com/my-account/";browser.tabs.create({'url':url});window.close();}
function openProxy(event){var url="proxy-input/index.html";browser.tabs.create({'url':url});window.close();}})();