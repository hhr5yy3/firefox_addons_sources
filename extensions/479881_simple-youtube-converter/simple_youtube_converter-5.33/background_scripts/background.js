

function isvideopage(url){
    if( url.includes("youtube.com/watch?v=") ){
            return true;
    }
    if( url.includes("twitch.tv/videos/") || url.includes("clips.twitch.tv/") ){
            return true;
    }
    if( url.includes("dailymotion.com/video/") ){
            return true;
    }
    if( url.includes("metacafe.com/watch/") ){
            return true;
    }
    if( url.includes("vimeo.com/") ){
        if( url.match(/vimeo\.com\/[0-9]+/gi)!=null || url.match(/vimeo\.com\/channels\/.+/gi)!=null ) {
                return true;
        }
    }
    if( url.includes("pornhub.com/view_video") ){
            return true;
    }
    if( url.includes("youporn.com/watch/") ){
            return true;
    }
    return false;
}

var lasturl = "";
function setpopup(tabid, url){
	//console.log(tabid+" "+url);
    if(lasturl!=url){
        lasturl = url;
	browser.browserAction.setPopup({tabId: tabid, popup: "https://simpleyoutubeconverter.com/popup-loader.html#"+url});
        if( isvideopage(url) ){
            browser.browserAction.setIcon({tabId: tabid, path: "../icons/icon_on-32.gif"});
        } else {
            browser.browserAction.setIcon({tabId: tabid, path: "../icons/icon-32.png"});
        }
    }
}

browser.webNavigation.onHistoryStateUpdated.addListener( function(details){ if( details.frameId == 0 ){ setpopup(details.tabId, details.url); } } );


function OnCommitted(details) {
	if( details.frameId == 0 ){ setpopup(details.tabId, details.url); }
}
browser.webNavigation.onCommitted.addListener(OnCommitted);






