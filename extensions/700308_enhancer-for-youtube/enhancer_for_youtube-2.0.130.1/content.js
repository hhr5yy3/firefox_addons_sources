/*
##
##  Enhancer for YouTube™
##  =====================
##
##  Author: Maxime RF <https://www.mrfdev.com>
##
##  This file is protected by copyright laws and international copyright
##  treaties, as well as other intellectual property laws and treaties.
##
##  All rights not expressly granted to you are retained by the author.
##  Read the license.txt file for more details.
##
##  © MRFDEV.com - All Rights Reserved
##
*/
(function(){chrome.runtime.onMessage.addListener(function(b,a,c){"set-messages"===b.message?document.dispatchEvent(new CustomEvent("efyt-set-messages",{detail:JSON.stringify({messages:b.messages})})):"command"===b.message?document.dispatchEvent(new CustomEvent("efyt-command",{detail:JSON.stringify({command:b.command,control:b.control})})):"pause-video"===b.message?document.dispatchEvent(new Event("efyt-pause-video")):"custom-script"===b.message?(a=document.createElement("script"),a.textContent=
b.customscript,document.head.appendChild(a)):"preference-changed"===b.message&&document.dispatchEvent(new CustomEvent("efyt-preference-changed",{detail:JSON.stringify({name:b.name,value:b.value})}))});document.addEventListener("efyt-message",function(b){var a=b.detail;try{if("pop-up-player"===a.request){var c={request:a.request};chrome.storage.local.get({popuplayersize:"640x360"},function(d){var f="https://www.youtube.com/pop-up-player/",e=d.popuplayersize.split("x");a.playlist?(f+=a.params.videos[a.params.index]+
"?autoplay=0&efyt_playlist=true",chrome.storage.local.set({playlist:a.params},function(){c.options={url:f,type:"popup",height:parseInt(e[1],10)+9+30,width:parseInt(e[0],10)+16,incognito:chrome.extension.inIncognitoContext};chrome.runtime.sendMessage(c)})):(f+=a.params,c.options={url:f,type:"popup",height:parseInt(e[1],10)+9+30,width:parseInt(e[0],10)+16,incognito:chrome.extension.inIncognitoContext},chrome.runtime.sendMessage(c))})}else chrome.runtime.sendMessage(a)}catch(d){}});document.addEventListener("efyt-get-messages",
function(b){try{chrome.runtime.sendMessage({request:"get-messages"})}catch(a){}});document.addEventListener("efyt-save-video-filters",function(b){var a={filter:b.detail.filter},c=document.querySelector("#efyt-video-filters-panel");"#blur #brightness #contrast #grayscale #huerotate #invert #saturate #sepia".split(" ").forEach(function(d){d=c.querySelector(d);a[d.id]=Number(d.value)});try{chrome.storage.local.set(a)}catch(d){}});document.addEventListener("efyt-reload-message",function(b){try{var a=
document.createElement("link");a.rel="stylesheet";a.href=chrome.runtime.getURL("resources")+"/youtube-polymer.css";document.head.appendChild(a);var c=document.createElement("div");c.id="efyt-reload";c.dir=chrome.i18n.getMessage("locale_dir");c.textContent=chrome.i18n.getMessage("page_reload_required");document.body.appendChild(c)}catch(d){}});chrome.storage.local.get({blur:0,brightness:100,contrast:100,grayscale:0,huerotate:0,invert:0,saturate:100,sepia:0,applyvideofilters:!1,backgroundcolor:"#000000",
backgroundopacity:85,blackbars:!1,blockautoplay:!0,blockhfrformats:!1,blockwebmformats:!1,boostvolume:!1,cinemamode:!1,cinemamodewideplayer:!0,controlbar:{active:!0,autohide:!1,centered:!0,position:"absolute"},controls:"loop reverse-playlist volume-booster cards-end-screens cinema-mode size pop-up-player speed video-filters screenshot keyboard-shortcuts options".split(" "),controlsvisible:!1,controlspeed:!0,controlspeedmousebutton:!1,controlvolume:!1,controlvolumemousebutton:!1,convertshorts:!1,customcolors:{"--main-color":"#00adee",
"--main-background":"#111111","--second-background":"#181818","--hover-background":"#232323","--main-text":"#eff0f1","--dimmer-text":"#cccccc","--shadow":"#000000"},customcssrules:"",customscript:"",customtheme:!1,darktheme:!1,date:0,defaultvolume:!1,disableautoplay:!1,executescript:!1,expanddescription:!1,filter:"none",hidecardsendscreens:!1,hidechat:!1,hidecomments:!1,hiderelated:!1,hideshorts:!1,ignoreplaylists:!0,ignorepopupplayer:!0,localecode:"en_US",localedir:"ltr",message:!1,miniplayer:!0,
miniplayerposition:"_top-left",miniplayersize:"_400x225",newestcomments:!1,overridespeeds:!0,pauseforegroundtab:!1,pausevideos:!0,popuplayersize:"640x360",qualityembeds:"medium",qualityembedsfullscreen:"hd1080",qualityplaylists:"hd720",qualityplaylistsfullscreen:"hd1080",qualityvideos:"hd720",qualityvideosfullscreen:"hd1080",reload:!1,reversemousewheeldirection:!1,selectquality:!1,selectqualityfullscreenoff:!1,selectqualityfullscreenon:!1,speed:1,speedvariation:.1,stopvideos:!1,theatermode:!1,theme:"default-dark",
themevariant:"youtube-deep-dark.css",update:0,volume:50,volumemultiplier:3,volumevariation:5,wideplayer:!1,wideplayerviewport:!1},function(b){var a=chrome.runtime.getURL("resources"),c=chrome.runtime.getManifest().version,d=document.createElement("script");d.textContent=`
			var efyt = efyt || {};
			efyt.prefs = ${JSON.stringify(b)};
			efyt.reload = ${b.reload};
			efyt.resources = '${a}';
			efyt.version = '${c}';
		(`+function(f){if(window.Polymer){var e=document.createElement("script");e.src=f+"/youtube-polymer.js";document.head.appendChild(e);e.remove()}}.toString()+')("'+a+'")';document.head.appendChild(d);d.remove();b.reload&&setTimeout(function(){chrome.storage.local.set({reload:!1})},5E3)})})();