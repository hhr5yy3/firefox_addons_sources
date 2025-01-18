// Copyright (c) Zanger LLC. All rights reserved.

(function(){var UPDATE_INTERVAL=500;var SEARCH_INTERVAL=1000;var timerRegEx=new RegExp(/(?!.*(?:[Aa]|[Pp])[Mm])(\d?\d)\s?(?::|[Mm][Ii][Nn])\s?(\d?\d)/g);var endTimerRegEx=new RegExp(/0?0:0?[1|2]/g);var ticketLocation={};ticketLocation.axs={};ticketLocation.axs.section=/<div class="seat-detail-item col-section text-left col-xs-4">\s*([A-Za-z0-9-]+)\s*<\/div>/;ticketLocation.axs.row=/<div class="seat-detail-item col-row text-center col-xs-4">\s*([A-Za-z0-9-]+)\s*<\/div>/;ticketLocation.axs.seat=/<div class="seat-detail-item col-seat text-right col-xs-4">\s*([A-Za-z0-9-]+)\s*<\/div>/;ticketLocation.tm={};ticketLocation.tm.section=/<span\sdata-tid="seat-info">Sec\s([A-Za-z0-9-]+).*?,\sRow\s[A-Za-z0-9-]+.*?,\s.*?Seat[s]?.*?\s[A-Za-z0-9-\s]+<\/span>/;ticketLocation.tm.row=/<span\sdata-tid="seat-info">Sec\s[A-Za-z0-9-]+.*?,\sRow\s([A-Za-z0-9-]+).*?,\s.*?Seat[s]?.*?\s[A-Za-z0-9-\s]+<\/span>/;ticketLocation.tm.seat=/<span\sdata-tid="seat-info">Sec\s[A-Za-z0-9-]+.*?,\sRow\s[A-Za-z0-9-]+.*?,\s.*?Seat[s]?<!--\s-->\s([A-Za-z0-9-\s]+).*?([A-Za-z0-9-\s]+)?<\/span>/;var axs=new RegExp(/https:\/\/www.axs.com\/about-terms-of-use_US_v1.html/);var tm=new RegExp(/<span\sdata-tid="seat-info">Sec\s[A-Za-z0-9-]+.*?,\sRow\s[A-Za-z0-9-]+.*?,\s.*?Seat[s]?.*?\s[A-Za-z0-9-\s]+<\/span>/);var timerFound=false;var timers=[];var timeStamp=0;pingBackground();function pad(num,size){return('000000000'+num).substr(-size);}
async function pingBackground(){var sending=browser.runtime.sendMessage({'type':"License"});await sending.then(handleResponse);}
function handleResponse(info){if(info.active)
timerCheck();}
function decrementTitle(value){var title=document.title;var lastSpaceInTitle=title.indexOf(' ');if(lastSpaceInTitle>0){title=title.substr(0,lastSpaceInTitle);}
var minute=title.split(":")[0];var second=title.split(":")[1];var seconds=parseInt(minute)*60+parseInt(second);seconds-=Math.trunc(value);if(seconds<0)seconds=0;minute=(Math.trunc(seconds/60)).toString();second=(seconds%60).toString();return pad(minute,2)+":"+pad(second,2);}
function getSectionRowSeatIfPossible(){let bodyInnerHTML=document.body.innerHTML;let res='';let webSite='';if(axs.exec(bodyInnerHTML)){webSite="axs";}
else if(tm.exec(bodyInnerHTML)){webSite="tm";}
if(webSite!==''){let sectionRegEx=ticketLocation[webSite].section;let rowRogEx=ticketLocation[webSite].row;let seatRegEx=ticketLocation[webSite].seat;let sectionRegexResult=sectionRegEx.exec(bodyInnerHTML);if(sectionRegexResult){res+='Sec '+sectionRegexResult[1]+' ';}
let rowRegexResult=rowRogEx.exec(bodyInnerHTML);if(rowRegexResult){res+='Row '+rowRegexResult[1]+' ';}
let seatRegexResult=seatRegEx.exec(bodyInnerHTML);if(seatRegexResult&&seatRegexResult[2]){res+='Seats '+seatRegexResult[1]+seatRegexResult[2]+' ';}
else if(seatRegexResult){res+='Seat '+seatRegexResult[1]+' ';}}
return res;}
function timerCheck(){while(result=timerRegEx.exec(document.body.innerText)){var newTime=result[1]+":"+pad(result[2],2);if(timers[timerRegEx.lastIndex]===undefined&&!timerFound){timers[timerRegEx.lastIndex]=newTime;}
else if(!timerFound){if(timers[timerRegEx.lastIndex]!==newTime){timerFound=true;timerRegEx.lastIndex=0;setTimeout(timerCheck,UPDATE_INTERVAL);return;}}
else if(timerFound&&timers[timerRegEx.lastIndex]!==newTime){document.title=newTime+" "+getSectionRowSeatIfPossible();timerRegEx.lastIndex=0;timeStamp=Date.now();setTimeout(timerCheck,UPDATE_INTERVAL);browser.runtime.sendMessage({'type':"clear_ua"});return;}}
if(timerFound&&timeStamp){var elapsed=(Date.now()-timeStamp)/1000;timeStamp=Date.now();if(elapsed){document.title=decrementTitle(elapsed)+" "+getSectionRowSeatIfPossible();setTimeout(timerCheck,UPDATE_INTERVAL);return;}}
if(endTimerRegEx.test(document.title))
document.title="00:00 "+getSectionRowSeatIfPossible();setTimeout(timerCheck,SEARCH_INTERVAL);}})();