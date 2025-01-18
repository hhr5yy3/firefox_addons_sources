
String.prototype.hashCode = function(){
    var hash = 0;
    if (this.length == 0) return hash;
    for (i = 0; i < this.length; i++) {
        char = this.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; 
    }
    return hash;
}


var L64B=
{
    fVideoVersion:true,    
	vars:{}, 
 
	GetLang:function()
	{
	    var lang = chrome.i18n.getMessage("language");
        if ( lang.indexOf("de")>=0)
            return "de";
        return "en";
	},
	startpage:
	{
		onMessage:function(details, sender, callback)
		{
			if (details.type == "__L64_SHOW_CHROME_SETTINGS")
			{
				//if (details.where == "newTab")
					chrome.tabs.create({"url":"chrome://settings","selected":true}, function(tab){});
					
				/// add more if we need!

			}
			else if (details.type == "__L64_NAVIGATE_CHROME_URL")
			{
				if (details.where == "newTab")
					chrome.tabs.create({"url":details.url, "selected":true}, function(tab){});
				else
					chrome.tabs.update(null, {"url":details.url, "selected":true}, function(tab){});
			}
			
			if (details.msg=="OnSP24GetVideoUrls")
			{
                if ( callback)
                {
                    chrome.tabs.get(details.tabId, function(tab)
                    {
                        callback( {videoUrls:vdl.urllist[details.tabId],allUrls:vdl.allurlslist[details.tabId]});
                    });
                    return true;
                }
			}
			
			else if (details.msg=="IsAdDisabled")
            {                
                callback(localStorage.getItem("IsAdDisabled")=="true");
                return true;
            }
            
            else if (details.msg=="msgDownload")
            {
                if ( chrome.downloads && chrome.downloads.download)
                {
                    for ( i in details.urls)
                    {
                        if ( details.saveAs)
                            myDownload( {"url":details.urls[i], "saveAs":details.saveAs});
                        else if ( details.filenames)
                            myDownload( {"url":details.urls[i], "filename":details.filenames[i]});
                        else
                            myDownload( {"url":details.urls[i], "saveAs":details.saveAs});
                    }
                    
                    chrome.storage.local.get('all_downloads', function(data)
                    {
                        var count = parseInt(data["all_downloads"]);
                        if ( !count)
                            count = 0;
                        count++;
                        chrome.storage.local.set({'all_downloads':count}, function(){});
                        if ( count == 10)
                        {
                            if ( L64B.GetLang() == "de")
                                var t = "Sollte Ihnen der All Downloader Professional gefallen, teilen Sie Ihre Erfahrungen anderen Benutzern mit und geben Sie eine Bewertung für uns ab.";
                            else
                                var t = "You have downloaded multiple files with All Downloader Professional. Please share your experience with others and make a review for us.";
                            if ( confirm(t))
                                chrome.tabs.create({"url":"https://chrome.google.com/webstore/detail/all-downloader-profession/dcpkncimndkdodcgcogfdddimoglkpkp/reviews","selected":true}, function(tab){});
                            
                        }
                    });
                    
                }
                return true;
            }

			
		    else if (details.msg=="OnSP24ShowDownloads")
			{
		        browser.downloads.showDefaultFolder();
			}
			else if (details.msg=="OnSP24Navigate")
            {
                chrome.tabs.create({"url": details.url, "active": true}, function(tab){});
            }
            else if (details.msg=="OnSP24Options")
            {
            alert("###OnSP24Options");
            }
            else if (details.msg=="msgCheckUrl")
            {
                if  (!vdl.aCheckedUrls[details.tabId])
                    vdl.aCheckedUrls[details.tabId] = new Object();
                vdl.aCheckedUrls[details.tabId][details.url] = details.checked;
                for ( j in vdl.allurlslist[details.tabId])
                {
                    if ( vdl.allurlslist[details.tabId][j].url == details.url)
                    {
                        vdl.allurlslist[details.tabId][j].checked = details.checked;
                        break;
                    }
                }
            }
            else if (details.msg=="msgSetUrl")
            {
                callback( {tabId:sender.tab.id});
            }
            else if (details.msg=="msgAddLinks")
            {
            //alert( details.tabId+" msgAddLinks "+details.link.length);
                if ( !vdl.allurlslist[details.tabId])
                    vdl.allurlslist[details.tabId] = new Array();
                var a = details.link;
                for ( i in a)
                {
                    var j = L64B.video.findUrlInList( details.tabId, a[i].url);
                    
                    if ( j == -1)
                    {
                        var ty = vdl.GetTypeFromUrl( a[i].url,false);
                        if ( !ty)
                            ty={ext:"",type:a[i].type};
                        else if ( ty.type=="link" && a[i].type=="extern")
                            ty.type = a[i].type;
                            
                        var ob = {"url":a[i].url, "len":0, "type":ty.type,"ext":ty.ext, "desc":a[i].title};
                        if ( vdl.aCheckedUrls[details.tabId] && vdl.aCheckedUrls[details.tabId][a[i].url])
                            ob.checked=true;
                        vdl.allurlslist[details.tabId].push(ob);
                    }
                    else
                    {
                        vdl.allurlslist[details.tabId][j].desc = a[i].title;
                    }
                }
            }
            else if (details.msg=="OnSP24SetLang")
            {
                //L64B.curlang = details.lang;
                L64B.fVideoVersion = details.fVideoVersion;
            }
		}
	},
	request:
	{
		lshorthistory: new Object(), 
		/*onBeforeRequest:function(details)
	    {
	       // console.log("Request:" + details.url +" : "+ details.type);
	        //sph.request.injectList[details.requestId] = false;
			if (typeof(details.url)!= 'string')
				return;  
			if ((details.url.split("/").length >4)
					|| (details.url.split("?").length > 1))
				return; 
			var hash = "URL_"+ details.url; 
			var l = L64B.request.lshorthistory;
			if (typeof(l[hash])=='undefined')/// new URL
			{
				l[hash] = new Object(); 
				l[hash].details = details;
				l[hash].count =0; 	
				l[hash].submited =false;	
			}
			l[hash].count+=1;
			if (l[hash].count==2)
				var x=1;
			console.log("New URL : "+ details.url);
			console.log( l); 
										
		},*/
	} 
}
 
chrome.runtime.onMessage.addListener(L64B.startpage.onMessage);


var vport = false; 
 
chrome.storage.local.get('fu', function(data)
{
	var firstLaunch = data['fu'];
	chrome.storage.local.set({'fu':true}, function(){});
	
	//if ((firstLaunch == null)||(typeof(firstLaunch)== 'undefined'))
	//	chrome.tabs.create({"url":"chrome://newtab?firstLaunch=1","selected":true}, function(tab){});
}); 
/*
chrome.tabs.onCreated.addListener(function(tab) {
	try
	{
		  if (tab.url == 'chrome://newtab/')
		  {
		  	 chrome.tabs.update(tab.id, {
		      selected: true
		    });
		  }
	}
	catch(e){
	}
 });
 */
 //chrome.windows.onCreated.addListener(function (window) {
 //console.log("window create"); 
 //console.log(window.tabs); 
 //});

/*
chrome.tabs.onUpdated.addListener(function(id, tab) 
{
	try
	{
		if ((tab.url == 'chrome://newtab/') && (tab.selectd != true)) 
  	 		chrome.tabs.update(id, {selected: true});
  		else if (L64B.vars.firstRun != true)
  		{
  			chrome.tabs.get(id, function(tabInfo)
			{
				if (tabInfo.url == 'chrome://newtab/')
				{

					console.log("set focus");
					chrome.tabs.update(tabInfo.id, {selected: true});
				}
			}); 
  		}
	}
	catch(e){}
	L64B.vars.firstRun = true;
});
 */
//L64B.AddSearch();

  

chrome.tabs.onUpdated.addListener(function(id, tab) 
{    

});


/*function myDownload( details)
{
    var options = { url:details.url, filename:details.filename, saveAs:true};    
    chrome.downloads.download(options, function(downloadId)
    {
    });
}*/

var downloads = false;
function myDownload( details)
{
    if ( !downloads)
    {
        downloads = {};
        /*chrome.downloads.onCreated.addListener(function( downloadItem) 
        {
            console.log( "\nbytesReceived ");
            console.log( downloadItem.bytesReceived);
        });
        */
       /* chrome.downloads.onChanged.addListener(function ( downloadDelta) 
        {
        //console.log( "downloadDelta");
                //console.log( downloadDelta);
            if ( downloadDelta.filename)
            {
                var filename = downloadDelta.filename.current;
                var id = downloadDelta.id;
                var i1 = window.setInterval(function()
                {
                    chrome.downloads.search({id:id}, function( downloadItem)
                    {
                        var fCloseProgress=true;
                        if ( downloadItem.length>=0)
                        {
                            var ob = downloadItem[0];
                            if ( ob.state.indexOf("complete")>=0)
                            {
                                if ( downloads[ob.id])
                                {
                                    //var filename = downloadDelta.filename.current;
                                    var details = downloads[ob.id];
                                    if ( details.convert)
                                    {
                                        var port = chrome.runtime.connectNative('com.link64.videodownloaderultimate');
                                        port.id = filename;
                                        port.onMessage.addListener(function(msg) 
                                        {
                                            if ( msg.mode.indexOf( "ownload")<0)
                                            {
                                                var w = {title:msg.title,perc:msg.perc,mode:msg.mode};
                                                L64B.videoProgress[port.id] = w;
                                            }
                                        }); 
                                        port.onDisconnect.addListener(function() 
                                        {
                                            L64B.videoProgress[port.id] = false;
                                        });
                                        
                                        //Start encoding
                                        port.postMessage({ key:"vdultimate", keepDownload:details.keepDownload, filename: filename, format:details.format, bytes:details.bytes, bitrate:details.bitrate,title:details.title});
                                        clearInterval(i1);
                                        fCloseProgress = false;
                                   }                                   
                                } 
                            }
                            else if ( ob.state.indexOf("progress")>=0)
                            {
                                var details = downloads[ob.id];
                                var title = details ? details.filename : "Video";
                                var pe = Math.floor(ob.bytesReceived*1000/ob.totalBytes)/10;
                                L64B.videoProgress[filename] = {title:title, perc:pe, mode:"Downloading"};
                                console.log( ob.state+ "   "+ob.bytesReceived+"   "+ob.totalBytes);
                                fCloseProgress = false;
                            }
                        }
                        if ( fCloseProgress)
                        {
                            L64B.videoProgress[filename] = false;
                            clearInterval(i1);
                        }
                    });
                },1000);
                
            }
        });
    */
    }
    var lastId = -1;
    var options = { url:details.url,filename:details.filename, saveAs:details.saveAs};    
//    var options = { url:details.url,filename:"frank\\test2.txt", saveAs:details.saveAs};    
    //var options = { url:details.url, filename:details.filename, saveAs:true};    
    chrome.downloads.download(options, function(downloadId)
    {
        downloads[downloadId] = details;
        console.log("download:"+lastId);
    });
    
    
    
    /*chrome.downloads.onDeterminingFilename.addListener(function( downloadItem, suggest)
    {
        console.log(downloadItem.id+" "+suggest+" filename:"+downloadItem.filename);
    })
    */
    //chrome.downloads.showDefaultFolder()
}