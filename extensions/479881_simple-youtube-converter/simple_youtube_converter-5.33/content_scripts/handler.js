var svc_setup=false;
var svc_port=false;
var svc_last=0;
var svc_tmout=0;
var svc_config=new Array();
var btnid;


if (!String.prototype.endsWith) {
  String.prototype.endsWith = function(searchString, position) {
      var subjectString = this.toString();
      if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
        position = subjectString.length;
      }
      position -= searchString.length;
      var lastIndex = subjectString.lastIndexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
  };
}

function svc_removeurlextra(url){
		var s=url.indexOf("://");
		if( s > 0 ){
			url = url.substr(s+3);
		}
		s=url.indexOf("www.");
		if( s >= 0 ){
			url = url.substr(s+4);
		}
		s=url.indexOf("#");
		if( s >= 0 ){
			url = url.substr(0, s);
		}
		s=url.indexOf("?mt=login");
		if( s >= 0 ){
			url = url.substr(0, s);
		}
		return url;
}

function svc_removetitleextra(title){
		title = title.trim();
		if( title.length>0 && title.startsWith("(") ){
			var found=title.indexOf(")");
			if( found>0 ){
				title = title.substr(found+1).trim();
			}
		}
		return title;
}

function svc_utoa(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
}

function svc_msg(){
	svc();
}

function svc_set(){
	var host = window.location.hostname.toLowerCase();
	if(host.substr(0,4)=="www."){
		host = host.substr(4);
	}

	// just in case we dont want infinite looping - it should never do that but doesnt hurt to be safe
	if( host.indexOf("simpleyoutubeconverter.com") > -1 ) {
		return;
	}

	//add listeners for html5 history url changes
	if( !svc_setup ){
		svc_setup=true;
        window.addEventListener("hashchange", svc );
        document.addEventListener( "DOMContentLoaded", svc );
        window.addEventListener('popstate', svc);
        document.body.addEventListener('DOMSubtreeModified', svc);
        svc();
	}
}

function svc_cleanup(){
    var e = document.getElementsByClassName('sycdownloader');
    for (var i = 0, len = e.length; i < len; i++) {
        if(e[i] && e[i].parentElement) {
            e[i].style.display="none";
        }
    }
}

function svc_youtube(){
        //console.log("svc_youtube");
        //var url = svc_removeurlextra(document.URL);
        //console.log("svc_youtube "+url+" "+svc_last);
        //if( svc_last!=url ){
        //    svc_cleanup();
        //    svc_last=url;
        //}
		if( new RegExp('v=[a-zA-Z0-9-_]+').exec(document.URL) || new RegExp('/shorts/[a-zA-Z0-9-_]+').exec(document.URL) ){

				var Link = document.createElement('a');
				Link.id = btnid;
                Link.name=btnid;
				//Link.href = 'https://simpleyoutubeconverter.com#'+svc_removeurlextra(document.URL);
				//Link.href = "javascript:alert(document.URL);";
				Link.href="javascript:window.open('https://simpleyoutubeconverter.com#'+document.URL,'_blank');";
				//Link.onclick = "window.open('https://simpleyoutubeconverter.com#'+document.URL,'_blank');return false;";
				//Link.target = '_blank';
				Link.setAttribute("onclick", "window.open('https://simpleyoutubeconverter.com#'+document.URL,'_blank');return false;");
				Link.className = 'sycdownloader style-scope ytd-button-renderer';
				Link.style.cssText='text-decoration:none';
				var Container       = document.createElement('span');
				Container.className = 'style-scope ytd-button-renderer style-default';
				var TextNode  = document.createTextNode('Convert & Download');
				Container.appendChild(TextNode);
				Link.appendChild(Container);
				var addto='';
                var elms;
				if( new RegExp('/shorts/[a-zA-Z0-9-_]+').exec(document.URL) ){
					elms = document.getElementsByTagName('h2');
				} else {
                	elms = document.getElementsByTagName('h1');
				}
                if(!elms){
                    elms = document.getElementsByClassName('view-count');
                }
                if(!elms){
                    elms = document.getElementsByClassName('yt-view-count-renderer');
                }
                if(elms){
                    for (var i = 0, len = elms.length; i < len; i++) {
                        addto = elms[i];
                        if( addto ) {
                            var haslinks = addto.getElementsByClassName('sycdownloader');
                            if(haslinks.length<=0){
                                //svc_cleanup();
                                addto.appendChild(Link);
                            }
                        }
                    }
                } else {
                    addto = document.getElementById('count');
                        if( addto ) { 
                            var haslinks = addto.getElementsByClassName('sycdownloader');
                            if(haslinks.length<=0){
                                //svc_cleanup();
                                addto.appendChild(Link);
                            }
                        }
                }
				//var addto = document.getElementById("menu-container");
				//if( addto ) { addto.appendChild(Link); return; }
                elms = document.getElementsByClassName('view-count');
                if(elms){
                    addto = elms[0];
                    if(addto){
                        var haslinks = addto.getElementsByClassName('sycdownloader');
                        if( haslinks.length<=0 ) { var haslinks = addto.getElementsByClassName('sycdownloader'); Container.className='view-count style-scope yt-view-count-renderer'; Container.style.cssText='text-decoration:none;font-size:16px'; addto.appendChild(Link); return; }
                    }
                }
                return;
		}
		//https://www.youtube.com/embed/------
		if( new RegExp('/embed/[a-zA-Z0-9-_]+').exec(document.URL) ) {
				var Link = document.createElement('a');
				Link.id = btnid;
				Link.href = 'https://simpleyoutubeconverter.com#'+svc_removeurlextra(document.URL);
				Link.target = '_blank';
				Link.style.position = "fixed";
				Link.style.top="30px";
				Link.style.left="4px";
				Link.style.color = "#fff";
				Link.style.zIndex="99999";
				Link.style.padding="10px";
                Link.className = "sycdownloader";
				var Container       = document.createElement('span');
				Container.className = 'yt-uix-clickcard';
				var TextNode  = document.createTextNode('Download');
				Container.appendChild(TextNode);
                Link.name=btnid;
				Link.appendChild(Container);
				document.body.appendChild(Link);
				ytconvertlast=document.URL; 
				return;
		}
}


function svc(){
	var host = window.location.hostname.toLowerCase();
	if(host.substr(0,4)=="www."){
		host = host.substr(4);
	}

	//check if download button already added
	//window.btoa(window.location.href)+
	//var btnid="svcbtn"+window.btoa(encodeURIComponent(document.title));
	//var btnid="svcbtn"+svc_utoa(svc_removetitleextra(document.title)+document.URL);
    
	//var btnid="svcbtn"+window.btoa(window.location);

    var url = svc_removeurlextra(document.URL);
	btnid="svcbtn"+svc_utoa(url);
	//console.log("BTNID: "+btnid);
    if( svc_last!=url ){
        svc_last=url;
        var elms = document.getElementsByClassName('sycdownloader');
		for(var i=0;i<elms.length;i++){
			elms[i].parentElement.removeChild(elms[i]);
        }
        var hold = document.getElementById(btnid);
        if(hold){ hold.parentElement.removeChild(hold); }
    }

	var hold = document.getElementById(btnid);
	if(hold){ return;}


	if( host.indexOf("youtube") > -1 ){
		//lets ignore the chat pages
		if( document.URL.indexOf("/live_chat?") > -1 ){
			return;
		}
        if( svc_tmout==0 ){
            svc_tmout = setInterval(function(){ svc_youtube(); }, 1000);
        }
		return;
	}
	//end of youtube

	//twitch.tv/videos/110853493
    if( document.URL.match(/twitch\.tv\/videos\/[0-9]+/gi)!=null ){
		var elms = document.getElementsByTagName("h3");
		for(var e=0;e<elms.length;e++){
			var a = document.createElement('a');
			var linkText = document.createTextNode("Convert & Download");
			a.appendChild(linkText);
			a.href="https://simpleyoutubeconverter.com#"+svc_removeurlextra(document.URL);
			a.setAttribute('target','_blank');
			a.style.cssText='text-decoration:none';
            a.className = 'sycdownloader';
			a.id=btnid;
            a.name=btnid;
			//elms[e].parentNode.appendChild(a);
			elms[e].parentNode.insertBefore(a,elms[e].nextSibling);
            break;
		}
        if( elms.length<=0 ){
            //elms = document.getElementsByTagName("a");
            elms = document.getElementsByClassName("tw-font-size-4");
		    for(var e=0;e<elms.length;e++){
		        var a = document.createElement('a');
		        var linkText = document.createTextNode("Convert & Download");
		        a.appendChild(linkText);
		        a.href="https://simpleyoutubeconverter.com#"+svc_removeurlextra(document.URL);
		        a.setAttribute('target','_blank');
		        a.style.cssText='text-decoration:none;margin-left:5px';
                a.className = 'sycdownloader';
		        a.id=btnid;
                a.name=btnid;
		        //elms[e].parentNode.appendChild(a);
		        elms[e].parentNode.insertBefore(a,elms[e].nextSibling);
                break;
		    }
        }
		return;
	}

	//clips.twitch.tv/DaintyOilyGuanacoCorgiDerp
    if( document.URL.match(/clips\.twitch\.tv\/.+/gi)!=null ){
		var elms = document.getElementsByTagName("h4");
		for(var e=0;e<elms.length;e++){
			var a = document.createElement('a');
			var linkText = document.createTextNode("Convert & Download");
			a.appendChild(linkText);
			a.href="https://simpleyoutubeconverter.com#"+svc_removeurlextra(document.URL);
			a.setAttribute('target','_blank');
			a.style.cssText='text-decoration:none';
            a.className = 'sycdownloader';
			a.id=btnid;
            a.name=btnid;
			//elms[e].parentNode.appendChild(a);
			elms[e].parentNode.insertBefore(a,elms[e].nextSibling);
		}
		return;
	}


	//https://www.pinterest.com/pin/
	if( document.URL.match(/https\:\/\/www\.pinterest.com\/pin\/.+/gi)!=null ){
		//find save text
		var elms = document.getElementsByTagName("div");
		for(var e=0;e<elms.length;e++){
			if( elms[e].textContent=="Save" ){
				var a = document.createElement('a');
				//var linkText = document.createTextNode("Download");
				//a.appendChild(linkText);
				a.innerHTML = "Convert<br>&amp;<br>Download";
				a.href="https://simpleyoutubeconverter.com#"+svc_removeurlextra(document.URL);
				a.setAttribute('target','_blank');
				a.style.cssText='text-decoration:none;min-height: 48px; min-width: 70px; border-radius: 24px; padding: 10px 14px;';
				a.className = 'sycdownloader'+elms[e].className;
				a.id=btnid;
				a.name=btnid;
				
				elms[e].parentNode.appendChild(a);

				/*
				var d = document.createElement('div');
				d.className = elms[e].parentNode.className;
				d.setAttribute("data-test-id", "standard-save-button");
				d.appendChild(a);
				elms[e].parentNode.insertBefore(d,elms[e].nextSibling);
				*/

				return;
			}
		}
		return;
	}
	//end of pinterest

    //https://vimeo.com/154121475
	if( document.URL.match(/vimeo\.com\/[0-9]+/gi)!=null || document.URL.match(/vimeo\.com\/channels\/.+/gi)!=null ) {
		var elms = document.getElementsByTagName("h1");
		for(var e=0;e<elms.length;e++){
			var a = document.createElement('a');
			var linkText = document.createTextNode("Convert & Download");
			a.appendChild(linkText);
			a.href="https://simpleyoutubeconverter.com#"+svc_removeurlextra(document.URL);
			a.setAttribute('target','_blank');
			a.style.cssText='text-decoration:none';
			a.id=btnid;
			//elms[e].parentNode.appendChild(a);
			elms[e].parentNode.parentNode.insertBefore(a,elms[e].nextSibling);
		}
		return;
	}
    //end of vimeo

    //https://www.dailymotion.com/video/x6f2bfg
	if( document.URL.match(/dailymotion\.com\/video\/.+/gi)!=null ) {
		var elms = document.getElementsByTagName("h1");
		for(var e=0;e<elms.length;e++){
			var a = document.createElement('a');
			var linkText = document.createTextNode("Convert & Download");
			a.appendChild(linkText);
			a.href="https://simpleyoutubeconverter.com#"+svc_removeurlextra(document.URL);
			a.setAttribute('target','_blank');
			a.style.cssText='text-decoration:none';
			a.id=btnid;
            a.name="sycbtn";
			//elms[e].parentNode.appendChild(a);
			elms[e].parentNode.insertBefore(a,elms[e].nextSibling);
		}
		return;
	}
    //end of dailymotion

    //https://www.metacafe.com/watch/11641553/bad-day-compilation-video/
	if( document.URL.match(/metacafe\.com\/watch\/.+/gi)!=null ) {
		var elms = document.getElementsByTagName("h1");
		for(var e=0;e<elms.length;e++){
			var a = document.createElement('a');
			var linkText = document.createTextNode("Convert & Download");
			a.appendChild(linkText);
			a.href="https://simpleyoutubeconverter.com#"+svc_removeurlextra(document.URL);
			a.setAttribute('target','_blank');
			a.style.cssText='text-decoration:none';
			a.id=btnid;
            a.name="sycbtn";
			//elms[e].parentNode.appendChild(a);
			elms[e].parentNode.insertBefore(a,elms[e].nextSibling);
		}
		return;
	}
    //end of metacafe


	if( document.URL.match(/xvideos.com\/video.+/gi)!=null ) {
		var elms = document.getElementsByTagName("h2");
		for(var e=0;e<elms.length;e++){
			var a = document.createElement('a');
			var linkText = document.createTextNode("Convert & Download");
			a.appendChild(linkText);
			a.href="https://simpleyoutubeconverter.com#"+svc_removeurlextra(document.URL);
			a.setAttribute('target','_blank');
			a.style.cssText='text-decoration:none;margin-left:10px;margin-top:10px';
			a.id=btnid;
            a.name="sycbtn";
			//elms[e].parentNode.appendChild(a);
			elms[e].parentNode.insertBefore(a,elms[e].nextSibling);
		}
		//v-views
		var elms = [document.getElementById("v-views")];
		for(var e=0;e<elms.length;e++){
			var a = document.createElement('a');
			var linkText = document.createTextNode("Convert & Download");
			a.appendChild(linkText);
			a.href="https://simpleyoutubeconverter.com#"+svc_removeurlextra(document.URL);
			a.setAttribute('target','_blank');
			a.style.cssText='text-decoration:none;margin-left:10px;margin-top:10px';
			a.id=btnid;
            a.name="sycbtn";
			//elms[e].parentNode.appendChild(a);
			elms[e].parentNode.insertBefore(a,elms[e].nextSibling);
		}
		return;
	}

    if( document.URL.match(/pornhub.com\/view_video.php\?viewkey=.+/gi)!=null ) {
		var elms = document.getElementsByTagName("h1");
		for(var e=0;e<elms.length;e++){
			var a = document.createElement('a');
			var linkText = document.createTextNode("Convert & Download");
			a.appendChild(linkText);
			a.href="https://simpleyoutubeconverter.com#"+svc_removeurlextra(document.URL);
			a.setAttribute('target','_blank');
			a.style.cssText='text-decoration:none;margin-left:10px;margin-top:10px';
			a.id=btnid;
            a.name="sycbtn";
			//elms[e].parentNode.appendChild(a);
			elms[e].parentNode.insertBefore(a,elms[e].nextSibling);
		}
		return;
	}
	if( document.URL.match(/youporn.com\/watch\/.+/gi)!=null ) {
		var elms = document.getElementsByTagName("h1");
		for(var e=0;e<elms.length;e++){
			var a = document.createElement('a');
			var linkText = document.createTextNode("Convert & Download");
			a.appendChild(linkText);
			a.href="https://simpleyoutubeconverter.com#"+svc_removeurlextra(document.URL);
			a.setAttribute('target','_blank');
			a.style.cssText='text-decoration:none;margin-left:10px;margin-top:10px';
			a.id=btnid;
            a.name="sycbtn";
			//elms[e].parentNode.appendChild(a);
			elms[e].parentNode.insertBefore(a,elms[e].nextSibling);
		}
        elms = document.getElementsByClassName("icon-download");
		for(var e=0;e<elms.length;e++){
			elms[e].setAttribute('target','_blank');
            elms[e].setAttribute('download','');
            if(elms[e].tagName.toLowerCase() === 'a'){
                elms[e].href=svc_getv(document.URL);
            } else {
                elms[e].onclick="window.location='"+svc_getv(document.URL)+"';";
            }
			elms[e].id=btnid;
		}
        elms = document.getElementsByClassName("featureDownload");
		for(var e=0;e<elms.length;e++){
			elms[e].setAttribute('target','_blank');
            elms[e].setAttribute('download','');
            if(elms[e].tagName.toLowerCase() === 'a'){
                elms[e].href=svc_getv(document.URL);
            } else {
                elms[e].onclick="window.location='"+svc_getv(document.URL)+"';";
            }
			elms[e].id=btnid;
		}
		return;
	}

}

svc_set();

