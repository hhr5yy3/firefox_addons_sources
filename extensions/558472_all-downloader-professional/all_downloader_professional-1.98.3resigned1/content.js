

function scanHtmlForVideos( url, callback)
{

    if ( !url)
        return false;
    if ( url.indexOf("youtube.com")<0)
        return false;
    
    var xmlHttpReq = new XMLHttpRequest();
    xmlHttpReq.open("GET", url, true);
    xmlHttpReq.onreadystatechange = function(data) 
    {
        if (this.readyState!=4)
            return;
            
        var title="Frank";
        var innerHTML = this.responseText;
        var a = innerHTML.match(/"url_encoded_fmt_stream_map": "([^"]*)"/);
        if ( !a || a.length<2)
        {
            callback( false,false);
            return;
        }
        var list = a[1];        
        if ( !list)
        {
            callback( false,false);
            return;
        }
        
        var s2 = "<title>";
        var i = innerHTML.indexOf( s2);
        if ( i>=0)
        {
            i+=s2.length;
            var i2 = innerHTML.indexOf( "</title>",i);
            title = innerHTML.substr(i,i2-i);
        }

        list = list.split(",");            
        
        var URL = "url=";
        var ITAG = "itag=";
        var SIG = "sig=";
        
        var urllist = false;
        for (var i in list) 
        {
            list[i] = unescape(list[i]);
            var p = list[i].split("\\u0026");                
            for (var j in p) {
                if (p[j].indexOf(URL) != -1) 		{ var url = p[j].split(URL)[1]; }
                if (p[j].indexOf(ITAG) != -1) 		{ var itag = parseInt(p[j].split(ITAG)[1]); }
                if (p[j].indexOf(SIG) != -1) 		{ var sig = p[j].split(SIG)[1]; }
            }
            if (sig && url.indexOf("signature") == -1) { url += "&signature=" + sig; }		
            
            if ( url)
            {
                var formats = {
                5:   { resolution: '240p', 	mime: 'video/x-flv' },
                6:   { resolution: '270p', 	mime: 'video/x-flv' },
                34:  { resolution: '360p', 	mime: 'video/x-flv' },
                35:  { resolution: '480p', 	mime: 'video/x-flv' },
                18:  { resolution: '360p', 	mime: 'video/mp4' },
                22:  { resolution: '720p', 	mime: 'video/mp4' },
                37:  { resolution: '1080p', 	mime: 'video/mp4' },
                38:  { resolution: '2304p', 	mime: 'video/mp4' },
                83:  { resolution: '240p 3D', 	mime: 'video/mp4' },
                82:  { resolution: '360p 3D', 	mime: 'video/mp4' },
                85:  { resolution: '520p 3D', 	mime: 'video/mp4' },
                84:  { resolution: '720p 3D', 	mime: 'video/mp4' }
                }
                if ( formats[itag])
                {
                    if ( !urllist)
                        urllist = new Array();
                        
                        
                    var fAddToList=true;
                    for ( var j = 0; j < urllist.length; j++)
                    {
                        if ( urllist[j].url == url)
                        {
                            fAddToList=false;// allready in
                            break;
                        }
                    }
                    
                    if ( fAddToList)
                    {
                        urllist.splice(0,0,{id:i,url: url, mime: formats[itag].mime, res:formats[itag].resolution, title:title});
                    }
                }
            }                  
        }
        callback( urllist, title);
    }
    xmlHttpReq.send( null);
    return true;
}

window.addEventListener("load", function()
{
	sendAllLinks();
	setInterval(function(){  sendAllLinks()  }, 3000);

    //var port = chrome.extension.connect();
    /*if ( document.getElementById('Link64DownloadUrlDiv'))
    {
        window.postMessage({msg:"SendAddOnVersion", v:"chrome"}, "*");
        document.getElementById('Link64DownloadUrlDiv').addEventListener('myCustomEvent', function() 
        {
            var msg = document.getElementById('Link64DownloadUrlDiv').innerText;
            msg = JSON.parse(msg);
            if ( msg.cmd=="download")
            {
                DownloadVideo( msg.url, msg.filename);
                return;
            }
            //alert("angekommen:"+url);
            scanHtmlForVideos( msg.url, function( list, title)
            {
                window.postMessage({msg:"FoundVideos",list:JSON.stringify(list),title:title}, "*");
                for ( var i = 0; i <list.length; i++)
                {
                    var client = new XMLHttpRequest();
                    client.ob = list[i];
                    client.onreadystatechange = function() 
                    {
                        if(this.readyState == 2) 
                        {
                            var bytes = this.getResponseHeader("Content-Length");
                            this.ob.mb = Math.floor(bytes*100/1024/1024)/100;
                            window.postMessage({msg:"VideoSize", ob:JSON.stringify(this.ob)}, "*");
                        }
                    }
                    client.open("HEAD", list[i].url);
                    client.send();
                }
            });
        });
    }*/
});

function DownloadVideo( url, filename)
{
    var iframe = document.createElement("IFRAME"); 
    var tout = 400;
	var html=  'javascript:\'<!doctype html><html><head></head>\n'+
				'<script>function initDownload()\n'+
				' {var el = document.getElementById("anchor");\n'+
				'el.click();setTimeout(function() { window.close(); }, 400)}</s'+'cript><body onload="initDownload()"><a id="anchor" href="'+url+'" download="'+filename+'"></a></body></html>\'';
   	    
    iframe.style.visibility = "hidden"; 
    iframe.src= html;
    document.body.appendChild(iframe);
}


var lastUrl = false;
var allUrlsList = [];
function sendAllLinks()
{
	var url = document.location.href;
	var title = document.title;
	
	if (lastUrl != url) 
	{
		lastUrl = url;
		chrome.runtime.sendMessage({ msg: "msgSetUrl" }, function (response)
		{
		    if ( response)
                scanPage( response.tabId);
		} );
    }
}

function FindFirstUrl(html, ext, start) {

    for (; ;) {
        var i = html.indexOf(ext, start)
        if (i < 0)
            return false;
        start = i + ext.length;
        var i1 = html.indexOf('\"', i);
        var i2 = html.indexOf('\'', i);
        var c = false;
        if (i1 > i && i2 > i) {

            c = i1 > i2 ? "\'" : "\"";
            if (i1 > i2)
                i1 = i2;
        }
        else if (i1 > i) {
            c = "\"";

        }
        else if (i2 > i) {
            c = "\'";
            i1 = i2;
        }
        else
            continue;

        var s = html.substr(i1 - 300, 300);
        i2 = s.lastIndexOf(c);
        if (i2 < 0)
            continue;
        s = s.substr(i2 + 1);
        if (s.indexOf("http://") == 0 || s.indexOf("https://") == 0)
            return { mp4: s, start: i1 };
        if (s.indexOf("http:\\/\\/") == 0 || s.indexOf("https:\\/\\/") == 0) {

            s = s.replace(/\\\//g, '\/');
            return { mp4: s, start: i1 };
        }
        continue;
    }
}
function scanPage( tabId ) 
{
	var url = document.location.href;
	allUrlsList = [];

	var html = document.documentElement.outerHTML;
	for (var j = 0; j < 3; j++) {
	    for (var i = 0; ;) {
	        var o = FindFirstUrl(html, j == 2 ? ".mov" : j == 1 ? ".flv" : ".mp4", i);
	        if (!o || !o.start)
	            break;
	        i = o.start;
	        allUrlsList.push({ 'url': o.mp4, 'title': document.title, 'type': "video" });
	        //alert(i+"  "+o.mp4);
	    }
	}
	for (var i = 0; i < document.links.length; i++) 
	{
	    var link =  document.links[i];
	    var u = isSupportedUrl(link.href);
		if ( u) 
		{
			var title = '';
			if (link.hasAttribute('title')) 
				title = myTrim(link.getAttribute('title'));
			if (!title && link.hasAttribute('alt')) 
				title = myTrim(link.getAttribute('alt'));
			if (!title) 
				title = myTrim(link.innerText);
			var cl = "";
			if (link.hasAttribute('class')) 
				cl = myTrim(link.getAttribute('class'));
			allUrlsList.push({'url': u,'title': title,'class': cl,'id': (link.id ? link.id : ""),'value': '','type': 'extern'});
		}			
    }
			
    for ( var k = 0; k < 3; k++)
    {
        if ( k == 0)
        {
            type="image";
            a = document.images;
        }
        else if ( k == 1)
        {
            type="video";
            a = document.getElementsByTagName('video');
        }
        else if ( k == 2)
        {
            type="video";
            a = document.getElementsByTagName('audio');
        }
	    for (var i = 0; i < a.length; i++) 
	    {
	        var link = a[i];
	        var u = false;
		    if (link.src) 
		        u = link.src;
		    if (!u && link.hasAttribute('data-thumb'))
		    {
			    u = myTrim(link.getAttribute('data-thumb'));
			    if (u.indexOf("http") == -1) 
			        u = "http:" + u;
		    }	
		    var u = isSupportedUrl(u);
		    if ( u) 
		    {
			    var desc = '';
			    if (link.hasAttribute('alt')) 
				    desc = myTrim(link.getAttribute('alt'));
			    else if (link.hasAttribute('title')) 
				    desc = myTrim(link.getAttribute('title'));
			    var cl = "";
			    if (link.hasAttribute('class')) 
				    cl = myTrim(link.getAttribute('class'));
			    allUrlsList.push({'url': u,'title': desc, 'type': type});
		    }			
	    }	
	}
	for (var i = 0; i < document.embeds.length; i++) 
	{
		var link = document.embeds[i];
		var u = isSupportedUrl(link.src);
        if ( u)
        {							
	        var desc = '';
	        if (link.hasAttribute('alt')) 
		        desc = myTrim(link.getAttribute('alt'));
	        else if (link.hasAttribute('title')) 
		        desc = myTrim(link.getAttribute('title'));
	        var cl = "";
	        if (link.hasAttribute('class')) 
		        cl = myTrim(link.getAttribute('class'));
	        var v = "";
	        if (link.hasAttribute('flashvars')) 
		        v = myTrim(link.getAttribute('flashvars'));
	        allUrlsList.push({'url': u,'title': desc, 'type': "embed"});
        }
	}			
    
	var p = document.getElementsByTagName('param');
	if (p)
	{
		for (var i = 0; i < p.length; i++) 
		{
			var link = p[i];
            var name = '';
            if (link.hasAttribute('name')) 
	            name = myTrim(link.getAttribute('name'));
            var parent = link.parentNode;
            if ( parent)
            {
	            var  u = parent.getAttribute('data');
                allUrlsList.push({'url': u,'title': name, 'type': "object"});
            }
		}
	}	
	chrome.runtime.sendMessage({ "msg": "msgAddLinks", "tabId": tabId, "url": url, "link": allUrlsList }, function (response) { });
}			
   
function myTrim(txt) 
{
	if ( !txt) 
	    return '';
	return txt.replace(/^[\s_]+|[\s_]+$/gi, '').replace(/(_){2,}/g, "_");
}
		
function isSupportedUrl( url) 
{
    if ( !url || !url.toLowerCase)
        return false;
	if ( (url.toLowerCase().indexOf('javascript:') != -1) || (url.toLowerCase().indexOf('javascript :') != -1) )
	    return false;
	if ( (url.toLowerCase().indexOf('mailto:') != -1) || (url.toLowerCase().indexOf('mailto :') != -1) )
	    return false;
	if (url.indexOf("data:image") != -1)  
	    return false;
	return url;
}


chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
      // console.log("onMessage " + request.id);
      if (request.id == "SP24ScanYoutube") {
          ScanYoutube(request.tabId);
          ScanPage(request.tabId);
          return;
      }
  });
/*
window.addEventListener('message', function (event) {
    if (event.data && event.data.id == "SP24YoutubeArgs") {
        //console.log('received response:  ', JSON.stringify(event.data));
        ScanYoutube2(event.data.args);
    }
}, false);
*/

function retrieveWindowVariables(variables, tabId) {
    var scripts = document.defaultView.wrappedJSObject;
    if (scripts && scripts.ytplayer && scripts.ytplayer.config)
        ScanYoutube2(scripts.ytplayer.config.args);
    /*
    var ret = {};
    var scriptContent = "";
    for (var i = 0; i < variables.length; i++) {
        var currVariable = variables[i];
        scriptContent += "if (typeof (" + currVariable + ") !== 'undefined') window.postMessage({ id: 'SP24YoutubeArgs', args:" + currVariable + "},document.location.href);\n";
    }
    var script = document.createElement('script');
    script.id = 'tmpScript';
    script.appendChild(document.createTextNode(scriptContent));
    (document.body || document.head || document.documentElement).appendChild(script);
    //    $("#tmpScript").remove();
    return ret;
    */
}

function ScanYoutube(tabId) {
    var doc = document;
    //console.log("scan " + doc.location.href);
    if (doc.nodeName != "#document")
        return null; // only documents
    if (!doc.getElementsByTagName("html").length) {
        return null
    }

    var url = doc.location.href;
    if (!url.match("^https?:\/\/(?:www\.)?youtube.com\/watch\?"))
        if (!url.match("^https?:\/\/(?:www\.)?youtube.com\/embed\?"))
            return;
    retrieveWindowVariables(["ytplayer.config.args"], tabId);
}

function ScanYoutube2(args) {
    var doc = document;
    var maps = {};
    if (args) {

        try {
            maps.stream_map = args.url_encoded_fmt_stream_map;
        } catch (e) {
            maps.stream_map = false;
        }
        try {
            maps.adaptive_fmts = args.adaptive_fmts;
        } catch (e) {
            maps.adaptive_fmts = false;
        }
    }

    if (!maps.stream_map) {
        var iHTML = doc.getElementsByTagName("html")[0].innerHTML;
        var a = iHTML.match(/"url_encoded_fmt_stream_map":"([^"]*)"/);
        if (a && a.length > 1) {
            maps.stream_map_txt = a[1];
        }
    }
    if (!maps.adaptive_fmts) {
        var iHTML = doc.getElementsByTagName("html")[0].innerHTML;
        var a = iHTML.match(/"adaptive_fmts":"([^"]*)"/);
        if (a && a.length > 1) {
            maps.adaptive_fmts_txt = a[1];
        }
    }
    var embeded = [];
    var i,
        embeds;

    embeds = doc.getElementsByTagName("embed");
    for (i = 0; i < embeds.length; ++i) {
        var data = {
            url: embeds[i].src,
            title: embeds[i].title
        }
        embeded.push(data);
    }

    var data = {
        url: doc.location.href,
        title: doc.title,
        maps: maps,
        embeds: embeded
    };

    //console.log(JSON.stringify(data));
    chrome.runtime.sendMessage({
        msg: "YTData",
        data
    }, function (response) { });
}
