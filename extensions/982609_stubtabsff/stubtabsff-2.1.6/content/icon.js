// Copyright (c) Zanger LLC. All rights reserved.

(function(){var RED_FAVICON='https://www.stubtabs.com/wp-content/uploads/2017/09/st_red.ico';var YELLOW_FAVICON='https://www.stubtabs.com/wp-content/uploads/2017/09/st_yellow.ico';var titleRegEx=new RegExp(/^[0-9]?[0-9]:[0-9][0-9]$/g);var timestamp=0;var lastColor=0;pingBackground();document.head=document.head||document.getElementsByTagName('head')[0];async function pingBackground(){var sending=browser.runtime.sendMessage({'type':"License"});await sending.then(handleResponse);}
function handleResponse(info){if(info.active)
iconCheck();}
function changeFavicon(src){var link=document.createElement('link'),oldLink=document.getElementById('dynamic-favicon');link.id='dynamic-favicon';link.rel='shortcut icon';link.href=src;if(oldLink)
document.head.removeChild(oldLink);document.head.appendChild(link);}
function iconCheck(){var min,sec;var str=document.title;var lastSpaceInTitle=str.indexOf(' ');if(lastSpaceInTitle>0){str=str.substr(0,lastSpaceInTitle);}
if(titleRegEx.test(str)){min=parseInt(str.slice(0,str.indexOf(":")));sec=parseInt(str.slice(-2));if((min==0)&&(sec<=30)&&(lastColor<2)){changeFavicon(RED_FAVICON);lastColor=2;}
else if((lastColor!=1)&&((min!=0)||(sec!=0))){changeFavicon(YELLOW_FAVICON);lastColor=1;}
titleRegEx.lastIndex=0;}
else
lastColor=0;setTimeout(iconCheck,1000);}})();