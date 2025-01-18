(function(){
if(!localStorage['OptDisableShelf']) { localStorage['OptDisableShelf'] = true;}
if(!localStorage['AudioPremiumBlock']) { localStorage['AudioPremiumBlock'] = false;}
if(!localStorage['AudioAutoScrool']) { localStorage['AudioAutoScrool'] = true;}
if(!localStorage['DownloadFileOK']) { localStorage['DownloadFileOK'] = 0;}
if(!localStorage['Downloads']) { localStorage['Downloads'] = "";}
if(!localStorage['GetSize']) { localStorage['GetSize'] = 0;}

var download_f = new Array();
var download_tab=0;
var disable_downl=false;


chrome.runtime.onMessage.addListener(function (request, sender, callback) {  //chrome.runtime.onMessage MOZILLA FIREFOX
	if (request.action == "vk_saved_download") 
	{		
		// MOZILLA FIREFOX not working
		/*if(localStorage['OptDisableShelf']=="true")
		{
			if (!disable_downl)
			{
				chrome.downloads.setShelfEnabled(false); 
				disable_downl=true;
			}
		}
		else
		{
			if (disable_downl)
			{
				chrome.downloads.setShelfEnabled(true); 
				disable_downl=false;
			}
		}*/

		if (sender)
		{
			download_tab=sender.tab.id;
		}
		var url=request.url+"#"+request.id;
		chrome.downloads.download({url: url, filename: get_track_name(request.artist, request.song, request.fp, request.fa), saveAs:false}, function(id) {
			if(chrome.runtime.lastError) 
			{				
				console.log('download id error|'+id+'|'+chrome.runtime.lastError.message);
			}
			else
			{
				console.log('DID|'+id);
				download_f[id]=""+request.id+"";
				var did=parseInt(id);
				loading_process(request.id, did);
			}
			callback({"id":request.id,"did":id});
		});
	}
	else if (request.action == "vk_saved_show_file") 
	{
		var did=parseInt(request.id);
		chrome.downloads.search({"id":did},function(items) {
			if (items.length!=0)
			{
				chrome.downloads.show(did);	
			}
		});
	}
	else if (request.action == "vk_saved_open_file") 
	{
		// MOZILLA FIREFOX not working
		/*var did=parseInt(request.id);
		chrome.downloads.search({"id":did},function(items) {
			if (items.length!=0)
			{
				chrome.downloads.open(did);	 //browser.downloads.open(did); MOZILLA FIREFOX	
			}
		});*/
	}
	else if (request.action == 'get_file') 
	{
		get_file(request.mod, request.id, request.param, callback);
	}
	else if (request.action == 'download_list_load') 
	{
		download_list_load(callback);
	}
	else if (request.action == 'load_option') 
	{
		load_option(request.param, callback);
	} 
	else if (request.action == 'save_option') 
	{
		save_option(request.param, request.text, callback);
	}
	else if (request.action == 'save_track') 
	{
		ajax_request("mod=gift&podmod=load&guid="+request.guid+"&last="+request.last+"", "", request.user, callback);
	}
	else if (request.action == 'open_config') 
	{
		var option_url=chrome.extension.getURL("popup.html");
		chrome.tabs.create({url: option_url, active: true}, function(){});
	}
	else if (request.action == 'open_info') 
	{
		var option_url=chrome.extension.getURL("popup.html#info");
		chrome.tabs.create({url: option_url, active: true}, function(){});
	}
	return true;
});
function download_new_save(id)
{
	
	var download_inject = new Array();
	var file_download=true;
	try 
	{
		download_inject = JSON.parse(localStorage['Downloads']);
	} 
	catch (e) 
	{
		
	}
	if(download_inject)
	{		
		for (var i=0;i<download_inject.length;i++)
		{
			if(download_inject[i]==id)
			{
				file_download=false
			}			
		}
		if (file_download)
		{
			save_increment('DownloadFileOK');
			download_inject.push(id);
			localStorage['Downloads']=JSON.stringify(download_inject);
		}
	}
}
function loading_process(id, did)
{
	var TimerLoading=window.setInterval(function () {
		chrome.downloads.search({id:did},function(items) {
			var item=items[0];
			if (item.state == 'in_progress') 
			{
				var percent=Math.round(item.bytesReceived*100/item.totalBytes);
				chrome.tabs.sendMessage(download_tab, {action:"vk_saved_download_process", id:id, did:did, percent:percent}, function(){
					if(chrome.runtime.lastError) 
					{
						console.log('send message error|'+chrome.runtime.lastError.message);
					}	
				});
			}
			else if ((item.state == 'complete') && item.endTime && !item.error) 
			{
				clearInterval(TimerLoading);
			}			
		});
	}, 300);
}

chrome.downloads.onChanged.addListener(function(result) {
	if (result.state && result.state.current === "complete") 
	{
		download_new_save(download_f[result.id]);
		if (download_f[result.id])
		{			
			send_tab(download_f[result.id], result.id);
		}
	}
});


function download_list_load(callback)
{
	var download_inject = new Array();
	try 
	{
		var download_inject = JSON.parse(localStorage['Downloads']);		
	} 
	catch (e) 
	{}
	callback(download_inject);

	/*
	chrome.downloads.search({"urlRegex":"vkuseraudio.net"},function(items) {
		if (items.length!=0)
		{
			for (var i=0;i<items.length;i++)
			{
				if (items[i].byExtensionName=="Vkontakte Download")
				{		
					var id=0;
					var aid=items[i].url.match(/#(\d+)/i);
					if (aid && aid.length > 1)
					{							
						id=aid[1];	
					}
					if (id!=0 && id!=null)
					{
						download_f[items[i].id]=id;
					}
				}
			}
			if (localStorage['DownloadFileOK']=="0")
			{
				localStorage['DownloadFileOK']=items.length;
			}
		}
		callback(download_f);
	});*/
}


function send_tab(id, did)
{
	chrome.tabs.sendMessage(download_tab, {action:"vk_saved_download_changed", id:id, did:did}, function(){
		if(chrome.runtime.lastError) 
		{
			console.log('send message error|'+chrome.runtime.lastError.message);
		}
		else
		{
			//console.log('Message ok');
		}	
	});
}

function save_increment(name)
{
	var downl=parseInt(localStorage[name]);
	downl++;
	localStorage[name]=downl;
	return downl;
}

function get_track_name(artist, song, fp, fa)
{
	var folder="Музыка/";
	
	var track_name=""+folder+""+artist+" - "+song+".mp3";
	
	if(fp!="")
	{
		track_name=""+folder+""+fp+"/"+artist+" - "+song+".mp3";
	}		
	else
	{
		if(fa!="")
		{
			track_name=""+folder+""+artist+"/"+song+".mp3";
		}		
	}
	return track_name;
}
function size_load(responseText, id, result)
{
	try {
		var data_json = JSON.parse(responseText);
		if (data_json.payload[1][0]!=undefined)
		{
			var data=data_json.payload[1][0][0];
			if (data[2])
			{
				var ids=data[1]+''+data[0];
				var id=ids.replace(/[_-]+/gi,"");
				m = data[2];
				hash.id = data[15].vk_id;
				h = hash.url(m), /\.m3u8\?/.test(h) && (g = (h = h.replace("/index.m3u8", ".mp3")).split("/"), f = -1 === h.indexOf("audios") ? 0 : 1, g.splice(g.length - (2 + f), 1), h = g.join("/"));
				get_size(h, function(size) {
					if (size!=0)
					{							
						result({"result":true, "id":""+id+"","url":""+h+"","size":size});
					}
					else
					{
						result({"result":false, "id":""+id+"","error":"1"});
					}
				});							
			}
			else
			{
				result({"result":false, "id":""+id+"","error":"2"});
			}
		}
		else
		{
			result({"result":false, "id":""+id+"","error":"3"});
		}
	}
	catch (e) 
	{
		result({"result":false, "id":""+id+"","error":"4"});
	}
}
function size_load_error(id, result)
{
	result({"result":false, "id":""+id+"","error":"5"});
}
function get_file(mod, id, param, result)
{	
	if(mod=="size")
	{
		var file_size=0;
		var req = new XMLHttpRequest();
		req.open('POST', 'https://vk.com/al_audio.php', true);
		req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		req.setRequestHeader("X-Requested-With", "XMLHttpRequest");
		req.responseType = "text",
		req.send("act=reload_audio&al=1&ids="+param+"");
		req.onload = function() {
			size_load(req.responseText, id, result);					
		};
		req.onerror = function() {
			size_load_error(id, result);			
		};
		
	}
	else
	{
		result({"result":false, "id":""+id+"","error":"6"});
	}
}
function get_size(url, result)
{
	var get_size=parseInt(localStorage['GetSize']);
	get_size++;
	localStorage['GetSize']=get_size;
	var req = new XMLHttpRequest();
	req.open('HEAD', url, true);
	req.send(null);	
	req.onload = function() {
		var size=req.getResponseHeader('Content-Length');
		result(size);		
	};
	req.onerror = function() {
		result(0);
	};
	
}
function save_option(param, text, result)
{
	localStorage[param]=text;
	result(true);
}
function load_option(param, result)
{
	if (localStorage[param]==null)
	{
		result(false);
	}
	else if (localStorage[param]!="false")
	{
		if (localStorage[param]=="true")	
		{
			result(true);
		}
		else
		{
			result(localStorage[param]);
		}
	}
	else
	{
		result(false);
	}
}

const hash = {
    r: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMN0PQRSTUVWXYZO123456789+/=",
	//r: "abcdexyzABCDEFGH29+/=",
    id: 0,
    url: function (a) {
        var b = String.fromCharCode;
        if (~a.indexOf("audio_api_unavailable")) {
            var c = a.split("?extra=")[1].split("#"),
                d = "" === c[1] ? "" : this.a(c[1]);
            if (c = this.a(c[0]), "string" != typeof d || !c) return a;
            for (var f, g, h = (d = d ? d.split(b(9)) : []).length; h--;) {
                if (f = (g = d[h].split(b(11))).splice(0, 1, c)[0], !this.url_d[f]) return a;
                c = this.url_d[f].apply(null, g)
            }
            if (c && "http" === c.substr(0, 4)) return c
        }
        return a
    },
    a: function (b) {
        if (!b || 1 == b.length % 4) return !1;
        for (var c, d, f = 0, g = 0, h = ""; d = b.charAt(g++);) d = this.r.indexOf(d),
        ~d && (c = f % 4 ? 64 * c + d : d, f++ % 4) && (h += String.fromCharCode(255 & c >> (6 & -2 * f)));
        return h
    },
    s: function (b, c) {
        var d = b.length,
            f = [];
        if (d) {
            var g = d;
            for (c = Math.abs(c); g--;) f[g] = 0 | (c += c * (g + d) / c) % d
        }
        return f
    },
    url_d: {
        v: function (a) {
            return a.split("").reverse().join("")
        },
        r: function (b, c) {
            b = b.split("");
            for (var d, e = r + r, f = b.length; f--;) d = e.indexOf(b[f]),
            ~d && (b[f] = e.substr(d - c, 1));
            return b.join("")
        },
        s: function (a, b) {
            var c = a.length;
            if (c) {
                var d = function (a, b) {
                    var c = a.length,
                        d = [];
                    if (c) {
                        var f = c;
                        for (b = Math.abs(b); f--;) b = (c * (f + 1) ^ b + f) % c,
                        d[f] = b
                    }
                    return d
                }(a, b),
                    e = 0;
                for (a = a.split(""); ++e < c;) a[e] = a.splice(d[c - 1 - e], 1, a[e])[0];
                a = a.join("")
            }
            return a
        },
        x: function (a, b) {
            var c = [];
            return b = b.charCodeAt(0),
            each(a.split(""), function (a, d) {
                c.push(String.fromCharCode(d.charCodeAt(0) ^ b))
            }),
            c.join("")
        },
        i: function (a, b) {
            return hash.url_d.s(a, b ^ hash.id)
        }
    }
};
})();