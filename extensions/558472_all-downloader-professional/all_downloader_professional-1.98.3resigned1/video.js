

function BrowserActionShowDownloads()
{
    chrome.tabs.create({"url":"chrome://downloads/","selected":true}, function(tab){});
}

L64B.utils=
{
    crctable: "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D",     
    crc32: function( /* String */ str, /* Number */ crc ) 
	{ 
        if( crc == window.undefined ) crc = 0; 
        var n = 0; //a number between 0 and 255 
        var x = 0; //an hex number 
        crc = crc ^ (-1); 
        for( var i = 0, iTop = str.length; i < iTop; i++ ) { 
            n = ( crc ^ str.charCodeAt( i ) ) & 0xFF; 
            x = "0x" + L64B.utils.crctable.substr( n * 9, 8 ); 
            crc = ( crc >>> 8 ) ^ x; 
        } 
        return crc ^ (-1); 
    } 	
};


L64B.video =
{
	checkForValidUrl:function(tabId, changeInfo, tab) 
	{
	    //chrome.pageAction.show(tabId);
        return; 
	},
	isYoutube:function( url) // Lock download from youtube
	{
	    if ( url && url.indexOf( "youtube.") >= 0) 
	        return true;
	   return false;
	},
	onUpdateTabCalled:false,
	onUpdateTab:function(tabId, changeInfo, tab) 
	{
	    if ( !tab)
	    {
	    //console.log("no tab "+tabId);
	        setTimeout( function ( ) // make sure onUpdateTab is called at least once
            {
                chrome.tabs.get( tabId, function(tab)
                {
                    L64B.video.onUpdateTab(tab.id, null, tab);
                });
            },100);
            return;               
        }
        
        L64B.video.onUpdateTabCalled=true;
        popupHTML = "popup.html?";
        popupHTML+= "lang="+L64B.GetLang();
		
        if ( tab && L64B.video.isYoutube(tab.url)) //Lock youtube
            popupHTML += "&mode=isyoutube";
        popupHTML+= "&tabid="+tabId;
//        console.log("setPopup "+tab.id);
        chrome.browserAction.setPopup({tabId:tab.id, popup:  popupHTML}); 
        //chrome.browserAction.show(tab.id);  
	},
	findUrlInList:function( tabId, url)
	{
	   for ( j in vdl.allurlslist[tabId])
       {
            if ( vdl.allurlslist[tabId][j].url == url)
                return j;
        }
        return -1;
    },
	 
    get_paramObj:function( txt, name)
    {
        name = "\""+name+"\":\"";
        var i = txt.indexOf( name);
        if ( i<0)
            return false;
        i += name.length;
        var i2 = txt.indexOf( "\"",i);
        if ( i2<0)
            return false;
        var s = txt.substr( i,i2-i);
        s = s.replace( /\\/g, "");
        return s;
    },
      
	getInfos:function(videoUrl, tabid)
	{	
	    var apiUrl ="https://my.startpage24.com/_libs/extension.lib/index.php"; 
	    var param = {cmd: "Oembed", url: videoUrl };
	    jQuery.getJSON(apiUrl + "?callback=?", param,
	    function(data)
	    {
	        if ( data.errorNumber != 0)
	        {
	            if ( L64B.GetLang() == "de")
    	            alert( "Der Videoanbieter erlaubt es nicht, dieses Video in die Liste zu übernehmen");
                else
    	            alert( "The video provider does not allow to add this video to your video list");
	            return;
	        }
		    var details = {	};
		    details.msg="__L64_ON_NEW_VIDEO"; 
		    details.videoInfo = data.response;
		    details.videoInfo.video_url = videoUrl; 
		    //if ( videoUrl && videoUrl.toLowerCase().indexOf("youtube")>=0)
    		//    details.videoInfo.source_url = L64B.video.scanHTML();
		    details.videoInfo.video_id = L64B.utils.crc32(videoUrl); 
		    console.log(details);
		    L64B.video.addWatchedVideoItem(details.videoInfo, !tabid); 
		    chrome.runtime.sendMessage(details, function (response) {
				    console.log(response);
			    });			    
            if ( tabid)
            {			    
			    var url = window.location.href;
                url = url.replace("extension/background.html","startpage/index.html?page=video&id="+details.videoInfo.video_id);
                     chrome.tabs.update( tabid, {"url":url, "selected":false}, function(tab){});
            }
	    }); 
	},
	
	addWatchedVideoItem:function(detail, fShowMessage)
	{	
		chrome.storage.sync.get('video_items', function(data)
		{
			var sitems = data['video_items'];
			var aItems =false;
			if ((sitems == null)||(typeof(sitems)== 'undefined'))
				aItems = new Array();
			else
				aItems = JSON.parse(sitems);
			if( Object.prototype.toString.call( aItems ) !== '[object Array]' ) {
    				aItems = new Array();
			}
			//aItems = new Array();
			aItems.splice(0, 0, detail.video_url);
			//aItems.push(detail.video_url);
			chrome.storage.sync.set({video_items: aItems}, function(){}); 
			var newData ={}; 
			newData.video_items = JSON.stringify(aItems); 
			newData["video_item_"+ detail.video_id] = detail; 
			chrome.storage.sync.set(newData, function(){
			    if ( fShowMessage)
			    {
			        if ( L64B.GetLang() == "de")
		                alert( "Video wurde hinzugefügt");
                    else
                        alert( "Video has been added");
                }
			}); 
		}); 
	} 	 
}


// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(L64B.video.onUpdateTab);
chrome.tabs.onReplaced.addListener(L64B.video.onUpdateTab);
chrome.tabs.onActivated.addListener(function(activeInfo)
{
    L64B.video.onUpdateTab(activeInfo.tabId)
});

setTimeout( function ( ) // make sure onUpdateTab is called at least once
{
    if ( !L64B.video.onUpdateTabCalled)
    {
        chrome.tabs.query({ active: true }, function (tab)
        {
            L64B.video.onUpdateTab(tab.id, null, tab);
        });
    }
}, 200);


var vdl =
{
    parentUrls:new Object(),
    lasturl:new Object(),
    videolist:new Object(),
    urllist:new Object(),
    allurlslist:new Object(),
    aCheckedUrls:new Object(),
    downloadlist:new Object(),
	statlist:new Object(),
	enableSMIL: true,
	mainWindow:false, 
	videoHandler:[
		{mime: "flv" , urlParts: [""], isVideo: true, p:1},	
		{mime: "mp4" , urlParts: [""], isVideo: true, p:1},
		{mime: "plain" , urlParts: ["youporn", ".flv"], isVideo: true, p:1}, // Youporn		
		{mime: "octet-stream" , urlParts: ["coolcdn.ch", ".flv"], isVideo: true, p:1}, 	
		//http://r7---sn-4g57knl6.c.youtube.com/videoplayback?algorithm=throttle-factor&burst=40&clen=53329900&cp=U0hVTlNNTl9FU0NONV9LR1JIOjJBTjMzTnYtYmc3&cpn=_1L0IkgMzzfPdiSb&expire=1369320709&factor=1.25&fexp=917000%2C919111%2C922509%2C919355%2C914027%2C916612%2C932702%2C924605%2C901208%2C929123%2C929915%2C929906%2C925714%2C929919%2C929119%2C931202%2C932802%2C928017%2C912518%2C911416%2C906906%2C904476%2C904830%2C930807%2C919373%2C906836%2C933701%2C912711%2C929606%2C910075%2C906098&gir=yes&id=be3a412a95c41f48&ip=92.204.58.169&ipbits=8&itag=134&keepalive=yes&key=yt1&lmt=1369167822003273&ms=au&mt=1369298238&mv=m&newshard=yes&range=1875968-2813951&ratebypass=yes&signature=C075BEEDAF2856CA9120481C3532BEBC19B0ECF8.76FB6CB61B6C01310175497DFE325C77658DB774&source=youtube&sparams=algorithm%2Cburst%2Cclen%2Ccp%2Cfactor%2Cgir%2Cid%2Cip%2Cipbits%2Citag%2Clmt%2Csource%2Cupn%2Cexpire&sver=3&upn=pA1XhzV715E
		{mime: "plain" , urlParts: ["youtube.com", "videoplayback", "range"], isVideo: true, p:1}, // Youtube
		{mime: "m4v" , urlParts: [""], isVideo: true, p:1}
		//		http://www.youtube.com/watch?v=vjpBKpXEH0g
	],

    reset:function( tabid,lasturl)
    {
        vdl.lasturl[tabid] = lasturl;
        vdl.videolist[tabid]=false; 
        vdl.urllist[tabid]=false; 
        //vdl.allurlslist[tabid]=false; 
	    vdl.statlist[tabid] = false; 
	    
	    console.log(">>>>>>>>>>>>>>> Reset "+tabid); 
    },
    
    launch:function(details)
    {
        if ( details.tabId<0)
        {
            vdl.reset(details.tabId,"");
		    return;
        }
        try
        {
            chrome.tabs.get( details.tabId, function(tab)
            {
                if ( tab && vdl.lasturl[details.tabId] != tab.url)
                {
                    vdl.reset(details.tabId,tab.url);
                }
            });
        }
        catch(e)
        {
            vdl.reset(details.tabId,"");
		    return;
        }
        return; 
    },

    launchc:function(tab)
    {
         vdl.videolist[tab.id]=false; 
         vdl.urllist[tab.id]=false; 
         //vdl.allurlslist[tab.id]=false; 
		 vdl.statlist[tab.id]=false; 
         return; 

    },
	
	 launchcw:function(window)
    {
		//console.log(">>>>>>>>>>>>>>> Window"); 
       // console.log(window);
         return; 
    },

    launchu:function(id, change, tab)
    {
        if ( vdl.lasturl[id] != tab.url || (tab.url && tab.url.toLowerCase().indexOf( "youtube.")>=0))
        {
            vdl.lasturl[id] = tab.url;
            vdl.videolist[id]=false; 
            vdl.urllist[id]=false; 
            vdl.allurlslist[id]=false; 
            vdl.statlist[id]=false;
        }
        else if ( vdl.urllist[id])
            chrome.browserAction.setIcon({tabId: tab.id, path: "../icon19b.png"});
                
        return; 
    },

    before:function(details)

    {
		//console.log("*BEFORE NAVIGATE*********************" + details.url);
		
	},
	
	checkHeader:function(details)
	{
		//console.log("*Header NAVIGATE*********************" + details.url);
		//	console.log(details);
	},

    GetTypeFromUrl:function( url,fMime)
    {
        var u = url;
        j = u.indexOf( '?');
        if (j>=0)
            u = u.substr(0,j);
        j = u.indexOf( '#');
        if (j>=0)
            u = u.substr(0,j);
        u = u.toLowerCase();
        
        var filters={};
        filters["image"]=["bmp","gif","jpg","png","ico"];
        filters["doc"]=["pdf","txt","doc","xls","rtf","ppc"];
        filters["binary"]=["zip","7z","rar","jar","tar","bz2","exe","msi","rar"];
        filters["video"]=["mp4","flv","webm","m4v","wmv","avi","mov","divx","mp3","wma","wav","aac"];
        filters["link"]=["html","htm","js","css","swf","json","asp","aspx"];
        
        for ( j in filters)
        {
            for ( var i = 0; i < filters[j].length; i++)
            {
                var ext = filters[j][i];
                if ( !fMime)
                    ext = '.'+ext;
                if ( u.indexOf( ext)>=0)
                    return {ext:filters[j][i],type:j};
            }
        }
        return false;
    },
    
    checkObject:function(details)
    {
        var type = false; 
        var len =0 ; 
		var isVideo = false;
		var priority = 0; 

        var mime="unknown";
        var url="";
        for (var i = 0; i < details.responseHeaders.length; ++i) 
        {
            
            if (details.responseHeaders[i].name.toLowerCase() === 'content-type')
            {
                mime  = details.responseHeaders[i].value.toLowerCase(); 
                url = details.url; 
                
                for (var xInfo =0;  xInfo <  vdl.videoHandler.length; ++xInfo) 
			    {
			   	    var comp = vdl.videoHandler[xInfo].mime; 
			   		if (mime.indexOf(comp)!=-1)
					{
					    //console.log("Video details: ");
			            //console.log(details); 
						//		alert( url);

						type = mime; 
						var parts = vdl.videoHandler[xInfo].urlParts
						for (var xparts =0; xparts< parts.length;  xparts++  )
						{
							find = parts[xparts]; 
							if (url.indexOf(find)==-1)
								type = false; 
						}
						if (type != false)
						{
							isVideo = vdl.videoHandler[xInfo].isVideo;
							priority = vdl.videoHandler[xInfo].p
							break;
						}
							 
					}
			   }
            }

            if (details.responseHeaders[i].name === 'Content-Length')
                len = details.responseHeaders[i].value; 
            else if (!len && details.responseHeaders[i].name === 'Content-Range')
                len = details.responseHeaders[i].value; 
        }

                                
        var ty = vdl.GetTypeFromUrl( details.url,false);
        if ( !ty)
            ty = vdl.GetTypeFromUrl( mime,true);
        var j = L64B.video.findUrlInList( details.tabId, details.url);

        if (  j== -1)
        {
            if ( !vdl.allurlslist[details.tabId])
                vdl.allurlslist[details.tabId] = new Array();
                
            if ( !ty)
            {
                if ( mime.indexOf( "image/") == 0)
                    ty={ext:"",type:"image"};
                else if ( mime.indexOf( "video/") == 0 || mime == "application/x-shockwave-flash")
                    ty={ext:"",type:"video"};
                else
                    ty={ext:"",type:"link"};
            }
            var ob = {"url":details.url, "len":len, "mime":mime, "desc":"", "type":ty.type, "ext":ty.ext};
            vdl.allurlslist[details.tabId].push( ob);
        }
        else
        {
            if (len)
                vdl.allurlslist[details.tabId][j].len = len;
            if ( mime)
                vdl.allurlslist[details.tabId][j].mime = mime;
            if ( ty)
            {
                vdl.allurlslist[details.tabId][j].type = ty.type;
                vdl.allurlslist[details.tabId][j].ext = ty.ext;
            }
        }
        
        if (type !== false && ((len > 1024) || !isVideo))
        {
			vdl.statlist[details.tabId] = 1; 
			if ( !vdl.urllist[details.tabId])
			    vdl.urllist[details.tabId] = new Array();
			
            
            var fAddToList=true;
            var tabid = details.tabId;
            for ( var i = 0; i < vdl.urllist[tabid].length; i++)
            {
                if ( vdl.urllist[tabid][i].url == details.url)
                {
                    fAddToList=false;// allready in
                    //chrome.browserAction.setIcon({tabId: tabid, path: "../icon19b.png"});
                    break;
                }
            }
            
                
            if ( fAddToList && tabid>=0)
            {
                chrome.tabs.get( tabid, function(tab)
                {
                    if ( tab && !L64B.video.isYoutube(tab.url)
                        && tab.url.indexOf("http://my.startpage24.com/.videosearch")<0) //Lock youtube
                    {
                        vdl.urllist[tabid].splice(0,0,{url: details.url, mime: type, p: priority, len:len, title:tab.title});
                        chrome.browserAction.setIcon({tabId: tab.id, path: "../icon19b.png"});
                        console.log("vdl.urllist:");
    			        console.log(vdl.urllist);
                    }
                });
            }
			
        }
        
        var filename = vdl.downloadlist[details.url];
        if ( filename)
        {
            for (var i = 0; i < details.responseHeaders.length; ++i) 
            {
                if ( details.responseHeaders[i].name && details.responseHeaders[i].name.toLowerCase() == 'content-disposition')
                {
                    details.responseHeaders[i].value = "attachment; filename=\""+filename+"\"";
                }
                
                /*if ( details.responseHeaders[i].name && details.responseHeaders[i].name.toLowerCase() == 'content-type')
                {
                    details.responseHeaders[i].value = "video/x-flv";
                }
                */
            }
            
            
            var h = {name: "Content-Disposition",value: "attachment; filename=\""+filename+"\""};
		    details.responseHeaders.push(h);
            return {
                responseHeaders: details.responseHeaders
            };
        }

        /*var pname = "&fnamesp24=";
        var i1 = details.url.indexOf( pname);
        if ( i1>0)
        {
            var i2 = details.url.indexOf( "&",i1+1);
	        var s = details.url;
	        if ( i2>=i1)
	            s = s.substr(i1+pname.length,i2-i1-pname.length);
            else
                s = s.substr(i1+pname.length);
            //alert( "test:"+s);
            var h = {name: "Content-Disposition",value: "attachment; filename=\""+s+"\""};
		    details.responseHeaders.push(h);
            return {
                responseHeaders: details.responseHeaders
            };
        }
        */
    },
    
}


chrome.webRequest.onHeadersReceived.addListener(vdl.checkObject,{

        urls: ["<all_urls>"],
        
    },["blocking","responseHeaders"]);
	

chrome.webRequest.onCompleted.addListener(vdl.launch,{

        urls: ["<all_urls>"],

        types:["main_frame"]

   });
chrome.webRequest.onBeforeRequest.addListener(vdl.before,{

        urls: ["<all_urls>"]
   });
    
	
chrome.windows.getCurrent(function(window)
{
	vdl.mainWindow = window.id; 
}); 	
    
chrome.tabs.onUpdated.addListener(vdl.launchu);
chrome.tabs.onCreated.addListener(vdl.launchc);
chrome.windows.onCreated.addListener(vdl.launchcw);
/*chrome.runtime.onMessage.addListener(function(details, sender)
{

    
	
    if (details.msg=="OnNewRTMP")
    {
		if ((sender) && (sender.tab.id))
		{
			if (sender.tab.windowId != vdl.mainWindow)
			{
				chrome.tabs.move(sender.tab.id,{windowId:vdl.mainWindow,index:999});
				chrome.tabs.update(sender.tab.id,{selected:true});
			}
			
			vdl.onNewRTMP(sender.tab.id,{url: details.rtmpurl, mime: "link64/rtmp", p:3}); 
		}
	}
}
);
*/
