// background.js
var debug = false;
var endstring = "";
if(!("browser" in window)) {							// judge abailable namespace
	window.browser=chrome;
	endstring = "\r\n";							// support for Chromium
}

var ManifestVersion = browser.runtime.getManifest().version;
if(debug)console.log("version of manifest.json="+ManifestVersion);

var version_string = "1.0.4.0";							// set initial value for MacOS
var serial =1;
var backup_hostlist='{\r\n"gred.jp":1,\r\n"gredavx.jp":1,\r\n"securebrain.co.jp":1,\r\n"sbtokyo.jp":1\r\n}';
var backup_hostlist_version="20191201-B01";
var err_icontext = "PhishWallとの通信がエラー状態です\r\nExtension "+ManifestVersion+"\r\nServerList "+backup_hostlist_version+endstring;
var default_icontext = "Extension "+ManifestVersion+"\r\nServerList "+backup_hostlist_version+endstring;
var current_icontext = "";

//GUID
var guid = (function() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}
	return function() {
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
			s4() + '-' + s4() + s4() + s4();
	};
})();

var pw_guid = guid();								// set guid

function stripHTML(text)
{
	var re= /<\S[^><]*>/g
	return text.replace(re, "")
}

function send_info() {
	var http = new XMLHttpRequest();
	var method = "GET";
	var host = "http://127.0.0.1:8888/pw/PluginInfo/browser-"+ManifestVersion;
	http.open(method, host);
	http.addEventListener('loadend', function (ev)
	{
		var text = stripHTML(http.responseText);
		//if(debug)console.log("send_info http.status="+http.status+" text="+text);
		if (http.readyState == 4 && http.status == 200)
		{
			var msg = text.replace(/\\"/g,"\"");
			msg = msg.replace("\"[","[");
			msg = msg.replace("]\"","]");
			var json = JSON.parse(msg);

			version_string=json[0].trim();

			// set guid from PWP
			pw_guid = json[1];
			// set version info
			default_icontext = "PhishWall "+version_string+"\r\nExtension "+ManifestVersion+endstring;
		}
	});
	http.send();
}

var hostlist = {};

function get_list() {
	var http = new XMLHttpRequest();
	var method = "GET";
	var host = "http://127.0.0.1:8888/pw/pwapa/browser-"+ManifestVersion;
	http.open(method, host);
	http.addEventListener('loadend', function(ev)
	{
		//if(debug)console.log("get_list http.status="+http.status);
		if (http.readyState==4 && http.status==200)
		{
			var text = stripHTML(http.responseText);
			//if(debug)console.log("get_list responseText="+text);
			hostlist = JSON.parse(text);
			//if(debug)console.log("get_list hostlist="+hostlist);
			if((typeof hostlist)=="string")
			{
				hostlist = JSON.parse(hostlist);
				//if(debug)console.log("get_list hostlist(string)=");
				//if(debug)console.dir(hostlist);
			}
		}else
		{
			// In case of hostlist unavailable
			hostlist = JSON.parse(backup_hostlist);
			//if(debug)console.log("get_list backup_hostlist=");
			//if(debug)console.dir(hostlist);
		}
	});
	http.send();
}

// Extension初期化実行
reloadAll();

// Base64エンコード
var base64list = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function base64encode(s)
{
	var t = '', p = -6, a = 0, i = 0, v = 0, c;

	while ( (i < s.length) || (p > -6) )
	{
		if ( p < 0 )
		{
			if ( i < s.length )
			{
				c = s.charCodeAt(i++);
				v += 8;
			}else
			{
				c = 0;
			}
			a = ((a&255)<<8)|(c&255);
			p += 8;
		}
		t += base64list.charAt( ( v > 0 )? (a>>p)&63 : 64 )
		p -= 6;
		v -= 6;
	}
	return t;
}
// ローカルサーバにデータ送信
var send_alert = function(in_url,option,tabid) {
	if (!in_url)
	{
		if(debug)console.log("send_alert終了(in_urlがnull)");
		return;
	}
	var host = in_url.split('/')[2];
	// アラートサーバにアクセスするときもこれが動くので除外
	// ドメインに「akamaihd.net」が含まれている場合は飛ばさない
	if (!host)
	{
		if(debug)console.log("send_alert終了(hostがnull)="+in_url);
		return;
	}

	if (host.match(/localhost|127\.0\.0\.1|akamaihd\.net/))
	{
		if(debug)console.log("send_alert終了(hostがlocal)="+in_url);
		return;
	}

	if(hostlist == null)
	{
		send_alert_tab(in_url,"", option, tabid, "");
		// Extension初期化実行
		reloadAll();
		if(debug)console.log("send_alert終了(hostlistがnull)");
		return ;
	}

	send_alert_tab(in_url,"",option,tabid,"");
	return;
};

var top_page_url="";
var top_page_tabid="";

browser.webRequest.onResponseStarted.addListener(
	function(details)
	{
		if(debug)console.log("browser.webRequest.onResponseStarted.addListener tabId="+details.tabId);
		if(debug)console.dir(details);
		browser.tabs.query({"active": true, "currentWindow": true}, function(tabs)
		{
			if(details.tabId==tabs[0].id)
			{

				if(details.responseHeaders!=null)
				{
					for (var i = 0; i < details.responseHeaders.length; ++i) {
						if (details.responseHeaders[i].name.toUpperCase() == 'AKAMAI')
						{
							var tabst="0-"+details.tabId.toString();
							if(serial==0x39999999)
							{
								serial=1;
							}
							serial++;
							send_alert(details.url,"AKAMAI:"+ details.responseHeaders[i].value,tabst);
							break;
						}
					}
				}
			}
		});
	},
	{
		urls: [
			"http://*/*",
			"https://*/*"
		],
		types:[
			"main_frame"
		]
	},
	[
		"responseHeaders"
	]
);

browser.webRequest.onBeforeSendHeaders.addListener(
	function(details)
	{
		if(debug)console.log("browser.webRequest.onBeforeSendHeaders.addListener tabId="+details.tabId+" pw_guid="+pw_guid);
		if(debug)console.dir(details);

		var url = details.url;

		if ((url.match(/^https?:\/\/[^/]+\.musashinobank\.co\.jp\//)
		    || url.match(/^https?:\/\/[^/]+\.yamagatabank\.co\.jp\//)
		    || url.match(/^https?:\/\/[^/]+\.cyber-biz\.ne\.jp\//))
		    && details.method && !(details.method.match(/^GET/i)))
		{
			return {requestHeaders: details.requestHeaders};
		}

		if (url.match(/https?:\/\/[^/.]*\.jp-bank\.japanpost\.jp\//))
		{
			if (details.url.indexOf("fdirect.jp-bank.japanpost.jp/jcweb/") == -1)
			{
				for (var i = 0; i < details.requestHeaders.length; ++i) {
					if (details.requestHeaders[i].name == 'User-Agent')
					{
						if (details.requestHeaders[i].value.indexOf("SE04") != 0)
						{
							details.requestHeaders[i].value = 'SE04 ' + details.requestHeaders[i].value;
						}
						break;
					}
				}
			}
		}

		details.requestHeaders.push({
			name: "x-phishwall-guid",
			value: pw_guid
		});
		details.requestHeaders.push({
			name: "x-phishwall-version",
			value: version_string
		});
		details.requestHeaders.push({
			name: "x-phishwall-client",
			value: "pw-fxchrome"
		});
		return {requestHeaders: details.requestHeaders};
	},
	{
		urls: [
			"*://direct.jp-bank.japanpost.jp/*",
			"*://direct1.jp-bank.japanpost.jp/*",
			"*://direct2.jp-bank.japanpost.jp/*",
			"*://direct3.jp-bank.japanpost.jp/*",
			"*://www.jp-bank.japanpost.jp/*",
			"*://wwws.jp-bank.japanpost.jp/*",
			"*://www.jp-bank-gaika.japanpost.jp/*",
			"*://direct-faq.jp-bank.japanpost.jp/*",
			"*://www4.suitebank2.finemax.net/*",
			"*://faq.jp-bank.japanpost.jp/*",
			"*://*.ib-test.finemax.net/*",
			"*://*.ib.finemax.net/*",
			"*://*.mf.finemax.net/*",
			"*://*.suitebank-test.finemax.net/*",
			"*://*.suitebank.finemax.net/*",
			"*://*.suitebank2-test.finemax.net/*",
			"*://*.suitebank3-test.finemax.net/*",
			"*://*.suitebank3.finemax.net/*",
			"*://bb1-test.finemax.net/*",
			"*://bb1.finemax.net/*",
			"*://densai-test.finemax.net/*",
			"*://densai.finemax.net/*",
			"*://*.houjinnet.jabank.jp/*",
			"*://www.jabank.jp/*",
			"*://*.direct.jabank.jp/*",
			"*://*.houjin.jabank.jp/*",
			"*://*.houjinnet.jabank.jp/*",
			"*://test3.ib.cyber-biz.ne.jp/*",
			"http://ib1.musashinobank.co.jp/*",
			"https://ib1.musashinobank.co.jp/*",
			"http://*.fukuho.co.jp/*",
			"https://*.fukuho.co.jp/*",
			"http://*.higashin.co.jp/*",
			"https://*.higashin.co.jp/*",
			"http://*.higashin.com/*",
			"https://*.higashin.com/*",
			"http://*.himegin.co.jp/*",
			"https://*.himegin.co.jp/*",
			"http://*.jsbank.co.jp/*",
			"https://*.jsbank.co.jp/*",
			"http://*.kochi-bank.co.jp/*",
			"https://*.kochi-bank.co.jp/*",
			"http://*.kyotobank.co.jp/*",
			"https://*.kyotobank.co.jp/*",
			"http://*.okb.co.jp/*",
			"https://*.okb.co.jp/*",
			"*://okbnetplaza.com/*",
			"*://test.okbnetplaza.com/*",
			"http://*.sagabank.co.jp/*",
			"https://*.sagabank.co.jp/*",
			"https://www.johokubank.jp/*",
			"http://*.saishin.co.jp/*",
			"https://*.saishin.co.jp/*",
			"http://*.shinkin.co.jp/*",
			"https://*.shinkin.co.jp/*",
			"http://*.shokochukin.co.jp/*",
			"https://*.shokochukin.co.jp/*",
			"http://*.tamashin.jp/*",
			"https://*.tamashin.jp/*",
			"http://*.toyoshin.co.jp/*",
			"https://*.toyoshin.co.jp/*",
			"http://ib1.yamagatabank.co.jp/*",
			"https://ib1.yamagatabank.co.jp/*"
		],
	},
	[
		"requestHeaders",
		"blocking"
	]
);

function processURLRequest(details,command)
{
	if(details==null)
	{
		return;
	}

	var url = details.url;

	if (url.match(/https?:\/\/127.0.0./))
	{
		return;
	}
	if (url.match(/https?:\/\/localhost[:/]/))
	{
		return;
	}

	if(details.type != "main_frame")
	{
		return;
	}

	send_alert(url,command,details.tabId.toString());
};

browser.webRequest.onBeforeRedirect.addListener(
	function(details)
	{
		//if(debug)console.log("browser.webRequest.onBeforeRedirect.addListener tabId="+details.tabId);
		processURLRequest(details,"request_top");
	},
	{
		urls: [
			"http://*/*",
			"https://*/*"
		],
	}
);

browser.tabs.onUpdated.addListener(function(tabId, changeInfo, tab)
{
	if(debug)console.log("browser.tabs.onUpdated.addListener tabId="+tabId);
	if(debug)console.dir(changeInfo);
	if(debug)console.dir(tab);
	if(tab.active != true)
	{
		return;
	}

	if(changeInfo.url == undefined && tab.cookieStoreId != undefined)
	{
		return;
	}

	if(changeInfo.status=="loading")
	{
		var tabst="0-"+tab.id.toString();
		top_page_url=tab.url;
		top_page_tabid=tabst;
		if(serial==0x39999999)
		{
			serial=1;
		}
		serial++;
		send_alert(tab.url,"request_top",tabst);
		return;
	}
});

// タブ切り替えた時
browser.tabs.onActivated.addListener(function(activeInfo)
{
	if(debug)console.log("browser.tabs.onActivated.addListener");
	if(debug)console.dir(activeInfo);

	var tab_id="0-"+activeInfo.tabId.toString();
	browser.tabs.get(activeInfo.tabId, function(tabs)
	{
		if(debug)console.log("browser.tabs.onActivated.addListenerのtabs.get tabId="+activeInfo.tabId);
		if(debug)console.dir(tabs);
		if(serial==0x39999999)
		{
			serial=1;
		}
		serial++;

		if(tabs==undefined)						//tabs is null
		{
			browser.tabs.query({}, function(alltabs)		// すべてのtab情報を取得
			{
				if(debug)console.log("browser.tabs.onActivated.addListenerのbrowser.tabs.query(alltabs)");
				if(debug)console.dir(alltabs);
				if (alltabs != undefined && alltabs.length != 0)
				{
					for (var i = 0; i < alltabs.length; ++i)
					{
						if (alltabs[i].id == activeInfo.tabId)
						{
							if(alltabs[i].url=="" || alltabs[i].url=="about:blank")
							{
								send_alert_tab(top_page_url,"","PW:tab_changed",tab_id,"");
							}
							else
							{
								top_page_url = alltabs[i].url;
								top_page_tabid=tab_id;
								send_alert_tab(alltabs[i].url,"","PW:tab_changed",tab_id,"");
							}
							return;
						}
					}
					if (i == alltabs.length)
					{
						if(debug)console.log("browser.tabs.onActivated.addListenerタブurl取得失敗(tabId不一致)");
						return;
					}
				}
				else
				{
					if(debug)console.log("browser.tabs.onActivated.addListenerタブurl取得失敗(alltabsがnull)");
					send_alert_tab(top_page_url,"","PW:tab_changed",tab_id,"");
					return;
				}
			});
			return;
		}

		if(tabs.url=="" || tabs.url=="about:blank")						//in case of popup tab
		{
			send_alert_tab(top_page_url,"","PW:tab_changed",tab_id,"");
			return;
		}

		top_page_url=tabs.url;
		top_page_tabid=tab_id;
		send_alert_tab(tabs.url,"","PW:tab_changed",tab_id,"");
	});

});

browser.tabs.onRemoved.addListener(function(tabId, removeInfo) {
	if(debug)console.log("browser.tabs.onRemoved.addListener tabId="+tabId);
	if(debug)console.dir(removeInfo);

	var tabst="0-"+tabId.toString();
	send_alert_tab(" ","","PW:tab_closed",tabst,"");

	browser.tabs.query({"active": true, "currentWindow": true}, function(tabs)
	{
		if(debug)console.log("browser.tabs.onRemoved.addListenerのbrowser.tabs.query");
		if(debug)console.dir(tabs);
		if(serial==0x39999999)
		{
			serial=1;
		}
		serial++;

		if(tabs != undefined && tabs.length != 0)
		{
			if(tabs[0].url != "" && tabs[0].url != "about:blank")
			{
				var tabid="0-"+tabs[0].id.toString();
				top_page_url=tabs[0].url;
				top_page_tabid=tabid;
				send_alert_tab(tabs[0].url,"","PW:tab_changed",tabid,"");
				return;
			}
		}
		// tabsがnull、またはurlがnullかabout:blankの場合はtop pageに戻す。
		send_alert_tab(top_page_url,"","PW:tab_changed",top_page_tabid,"");
	});
});
var Error_Status = false;							// Error状態から復旧した場合reloadAllを実行する。

function send_alert_tab(in_url,form_data,option,tabid,sourceid)
{
	var tabid_num = tabid.split("-");
	var tabIdnum = Number(tabid_num[tabid_num.length-1]);			// window_idが無い場合でもtabIdを抽出
	if(debug)console.log("send_alert_tab:開始 in_url="+in_url+" form_data=["+form_data+"] option="+option+" tabid="+tabid);
	var tabidstr;
	if (tabid.search(/-/) != -1)
	{
		tabidstr=browser_id+tabid;
	}
	else
	{
		tabidstr=browser_id+"0-"+tabid;	
	}
	var sstr=serial.toString();
	var json = {
		"URL": in_url,
		"COOKIE": "",
		"OPTION": option,
		"TAB": tabidstr,
		"SERIAL": sstr,
		"SOURCE": sourceid
	};
	var data = '=' + encodeURIComponent(
			base64encode( JSON.stringify(json) )
	);
	try{
		var httpret = new XMLHttpRequest();
		var method = "POST";
		var host = "http://127.0.0.1:8888/pw/auth/browser-"+ManifestVersion;
		httpret.open(method, host);
		httpret.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		httpret.addEventListener('loadend', function(ev)
		{
			var icon = "icon128.png";
			var icontext = "";

			if(debug)console.log("send_alert_tab:POST responseText="+httpret.responseText+" tabid="+tabid);
			if (httpret.responseText.indexOf("200 OK") != -1)
			{
				if (Error_Status)
				{
					reloadAll();
					Error_Status = false;
				}
				icontext = default_icontext;
			}
			else if (httpret.responseText.indexOf("201 OK") != -1)
			{
				if (Error_Status)
				{
					reloadAll();
					Error_Status = false;
				}
				icon = "green.png";
				icontext = "正規のサイトに接続しています\r\n"+default_icontext;
			}
			else if ((httpret.responseText.indexOf("202 OK") != -1) || (httpret.responseText.indexOf("203 OK") != -1))
			{
				if (Error_Status)
				{
					reloadAll();
					Error_Status = false;
				}
				icon = "red.png";
				icontext = "パソコンがウィルスに感染しています\r\n"+default_icontext;
			}
			else
			{
				Error_Status = true;
				icontext = err_icontext;
				hostlist = JSON.parse(backup_hostlist);		// backupリストに再設定
				if(debug)console.log("send_alert_tab通信エラー：["+httpret.responseText+"] status="+
						httpret.status+" statusText:["+httpret.statusText+"]");

				// 通信エラーの場合、ブラウザアイコンを設定する。
				// hostlistにurlがあれば青色点灯させる。
				if (in_url)					// in_urlがnullでなければ
				{
					var host = in_url.split('/')[2];
					var hostvalue = undefined;
					if (host != undefined)
					{
						var i=0;
						while( true )
						{
							hostvalue = hostlist[host];
							if(hostvalue== undefined)
							{
								var n = host.indexOf(".");
								if(n > 0 )
								{
									host = host.substr(n+1);
								}
								else
								{
									break;
								}
							}
							else
							{
								break;
							}
							i++;
						}
					}
					// 青色点灯判定
					if (hostvalue!=undefined)
					{
						icontext = "保護対象のサイトです\r\nExtension "+ManifestVersion+"\r\nServerList "+backup_hostlist_version+endstring;
						icon = "blue.png";
					}
				}
			}
			//icon切替
			browser.browserAction.setIcon({path:icon, tabId:tabIdnum}, function()
			{
				if (browser.runtime.lastError)
				{
					if(debug)console.log("setIcon Err="+chrome.runtime.lastError.message);
				}
			});
			//icontext切替
			if (current_icontext != icontext)
			{
				current_icontext = icontext;
				try
				{
//					browser.browserAction.setTitle({title:icontext, tabId:tabIdnum});
					browser.browserAction.setTitle({title:icontext});	// Bug in Edge, tabID can not work.
				}
				catch(e)
				{
					if (browser.runtime.lastError)
					{
						if(debug)console.log("setTitle Err="+chrome.runtime.lastError.message);
					}
				}
			}
		});
		httpret.send( data );
	}
	catch(e)
	{
	}
}

browser.tabs.onDetached.addListener(function(tabId,detachInfo)
{
	if(debug)console.log("browser.tabs.onDetached.addListener oldWindowId="+detachInfo.oldWindowId+" tabId="+tabId);
	if(debug)console.dir(detachInfo);

	// 新たにデタッチ元でアクティブになったタブ情報を送る
	browser.tabs.query({windowId: detachInfo.oldWindowId, active: true}, function(tabs)
	{
		if(debug)console.log("browser.tabs.onDetached.addListenerのbrowser.tabs.query");
		if(debug)console.dir(tabs);
		if (tabs != undefined && tabs.length != 0)
		{
			send_alert_tab(tabs[0].url,"","PW:tab_changed","0-"+tabs[0].id.toString(),"");
		}
	});
});

// ブラウザ識別子取得
var browser_id = "browser:-";
var userAgent = window.navigator.userAgent.toLowerCase();

if(userAgent.indexOf("edge") != -1) {
	browser_id = "edge:-";
} else if(userAgent.indexOf("chrome") != -1) {
	browser_id = "chrome:-";
} else if(userAgent.indexOf("firefox") != -1) {
	browser_id = "firefox:-";
}
if(debug)console.log("ブラウザ識別子="+browser_id+" userAgent="+userAgent);

// Extensionの初期化（version情報/hostlistの取得）
function reloadAll()
{
	send_info();								// Version情報を得る
	get_list();								// hostlistを得る
}

// 初期化完了、ブラウザアイコンをリフレッシュする。
browser.tabs.query({"active": true, "currentWindow": true}, function(tabs)
{
	if (tabs != undefined && tabs.length != 0) {
		send_alert_tab("about:blank", "", "request_top", "0-"+tabs[0].id);	// 空白ページでリフレッシュ
		//if(debug)console.log("tabid="+tabs[0].windowId+"-"+tabs[0].id+" url="+tabs[0].url);
		send_alert_tab(tabs[0].url, "", "request_top", "0-"+tabs[0].id);	// 「現在」のページでアイコン設定
	}
});
