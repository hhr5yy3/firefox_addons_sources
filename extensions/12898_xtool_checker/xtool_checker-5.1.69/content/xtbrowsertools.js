
browser.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
	console.log("command = " + request.action);
    if (request.action == "SingleButtonClick")
	{
		if (request.info !== undefined)
		{
			var threadIndex = XToolCheckerThreads.GetNewThreadIndex();
			XToolCheckerThreads.GetThread(threadIndex)._tabID = sender.tab.id;
			XToolCheckerThreads.GetThread(threadIndex)._url = sender.tab.url;
			if (threadIndex != -1)
				XToolChecker.ButtonClicked(request.info, threadIndex);
		}
	}
	else  if (request.action == "CapchaResult")
	{
		
		if (request.info !== undefined)
		{
			XTChecker.Capcha.DialogResult(request.info);
		}
	}
	else if (request.action == "CheckBlackList")
	{
		if (request.domain !== undefined)
		{
			var db = openDatabase("xtool_checker", "0.1", "Xtool checker db", 200000);
			if (db)
			{
				db.transaction(function(tx) {
				tx.executeSql("SELECT * FROM gbl_list WHERE domain = ?", [request.domain], function(tx, result) {
					
					if (result.rows.length >= 1)
						sendResponse(1);
					else
						sendResponse(0);
					return true;
				}, null)}); 
			}
			
		}
	}
	else if (request.action == "GetBlackList")
	{
		var db = openDatabase("xtool_checker", "0.1", "Xtool checker db", 200000);
		if (db)
		{
			db.transaction(function(tx) {
			tx.executeSql("SELECT domain FROM gbl_list ORDER BY domain", [], function(tx, result) 
			{
				var list = [];
				for (var i = 0; i < result.rows.length; i++)
				{
					var domain = result.rows.item(i).domain;
					list.push( domain);
				}
				sendResponse(list);
				return true;
			}, null)}); 
		}
	}
	else if (request.action == "AddToBlackList")
	{
		for (var i = 0; i < request.values.length; i++)
		{
			XTBrowserTools.AddToGBLList(request.values[i]);
		}
	}
	else if (request.action == "RemoveFromBlackList")
	{
		for (var i = 0; i < request.values.length; i++)
		{
			XTBrowserTools.RemoveFromGBLList(request.values[i]);
		}
	}
	else if (request.action == "LoadFromCache")
	{
		//console.log("LoadFromCache: " + request.url);
		XTBrowserTools.LoadFromCache(request.url, request.buttonID, true, sender.tab.id, 0);
	}
	else if (request.action == "ExportToFile")
	{
		console.log('ExportToFile');
		XTBrowserTools.ExportToFile(request.Text);
	}
	else if (request.action == "CustomPageLinks")
	{
		XToolChecker._tmpList = request.values;
		if (XToolChecker._appendTab == -1)
		{
			var url = /*chrome.extension.*/
			browser.runtime.getURL("content/custom_links.html");
			browser.tabs.create({url: url});
		}
		else
		{
			console.log('CustomPageLinks');
			XTCommands.sendMessageTabXT(XToolChecker._appendTab.id, {action : "AppendLinks", links: XToolChecker._tmpList});
		}
	}
	else if (request.action == "GetLinksForCustomPage")
	{
		console.log('sending list');
		sendResponse(XToolChecker._tmpList);
		return true;
	}
	else if (request.action == "CustomPageLoaded")
	{
		XTBrowserTools.UpdateLinksCustomPage(sender.tab.id, XToolChecker._tmpList);			   
	}
	else if (request.action == "SetAppendTab")
	{
		XToolChecker._appendTab = sender.tab.id;
	    
	}
	sendResponse(0);
	return true;
}
);

XTCommands = {

updateElement : function(name, callback) 
{ 
	var info = {};
	info.name = name;
	info.hidden = XTBrowserTools.hiddens[name];
	info.value = XTBrowserTools.values[name];
	info.disabled = XTBrowserTools.disableds[name];
	info.image = XTBrowserTools.images[name];
	info.label = XTBrowserTools.labels[name];
	info.color = XTBrowserTools.colors[name];
	info.tooltip = XTBrowserTools.tooltips[name];
	callback(info);
},

multicheckButtons : function(btnName)
{
	console.log ("btnName: " + btnName);
	if (btnName == "XTD") XToolChecker.Domainscheck(0);
	else if (btnName == "XT") XToolChecker.Multicheck(0);
	else if (btnName == "BC") XToolChecker.CheckBC(0);
	else if (btnName == "POS") XToolChecker.CheckPOS(0);
	else if (btnName == "LVL") XToolChecker.CheckLVL(0);
	else if (btnName == "TrF") XToolChecker.CheckTrf(0);
	else if (btnName == "Tic") XToolChecker.CheckTIC(0);
	else if (btnName == "PR")  XToolChecker.CheckPR(0);
	else if (btnName == "inY")  XToolChecker.CheckINY(0);
	else if (btnName == "inG")  XToolChecker.CheckING(0);
	else if (btnName == "YP")  XToolChecker.CheckYap(0);
	else if (btnName == "YL")  XToolChecker.CheckYal(0);
	else if (btnName == "YC")  XToolChecker.CheckYC(0);
	else if (btnName == "SQI")  XToolChecker.CheckSQI(0);
	else if (btnName == "GP")  XToolChecker.CheckGP(0);
	else if (btnName == "GC")  XToolChecker.CheckGC(0);
	else if (btnName == "GL")  XToolChecker.CheckGL(0);

},

showSettings : function()
{
	XToolChecker.ShowSettings(0);
},

onError : function(error) {
  console.log(`Error: ${error}`);
},

sendMessageXT : function(messageObj, prepare, response)
{
	console.log('sendMessageXT');
	var querying = browser.tabs.query({currentWindow: true, active: true});
	querying.then(function(tabs) { 
		for (let tab of tabs) {
			if (prepare)
			 XTCommands.sendMessageTabPrepareXT(tab.id, messageObj, response);
			else
			{
				console.log("sendMessageXT");
			 XTCommands.sendMessageTabXT(tab.id, messageObj, response);
			}
		}
	}, XTCommands.onError);
},

sendMessageTabXT : function(tabId, messageObj, response)
{
	console.log("sendMessageTabXT: " + messageObj);
	console.log("action: " + messageObj.action);
	console.log("tabid: " + tabId);
	browser.tabs.sendMessage(tabId, messageObj).then(response);
},

sendMessageTabPrepareXT : function(tabId, messageObj, finalResponse)
{
	console.log("sendMessageTabPrepareXT: " + messageObj);
	console.log("sending settings");
	browser.tabs.sendMessage(
				tabId, 
				XTBrowserTools.PrepareSettings())
	.then(response => {
	  console.log("sending message");
      browser.tabs.sendMessage(tabId, messageObj).then(finalResponse);
    }).catch(XTCommands.onError);				
				
},

refreshButtons : function()
{
	console.log("RefreshButtons");
	XTCommands.sendMessageXT({action : "RefreshButtons" }, true);
},

checkLogin : function()
{
	XToolChecker.LoginCheck(0);
},


createCustomPage : function()
{
	XToolChecker.CreateCustomPage(0);
},

singleButtonClick : function(info)
{

},

modeChange : function(value)
{

},

pauseMulticheck : function()
{
	XToolChecker.PauseMulticheck(0);
},

stopMulticheck : function()
{
	XToolChecker.StopMulticheck(0);
},

checkFastXT : function()
{
	var querying = browser.tabs.query({currentWindow: true, active: true});
	querying.then(function(tabs) { 
		for (let tab of tabs) {
			XToolChecker.CurrentXT(tab.url);
		}
	}, XTCommands.onError);
},

markLinks : function ()
{
	XTCommands.sendMessageXT({action : "MarkLinks" }, true);
},

checkCount : function()
{
	XTCommands.sendMessageXT({action : "CheckCount" }, false);
},

checkInvert : function()
{
	XTCommands.sendMessageXT({action : "CheckInvert" }, false);
},

exportToExcel : function()
{
	XTCommands.sendMessageXT({action : "ExportToExcel"}, false);
}
};

var XTBrowserTools = 
{

	hiddens : {}, 
	values : {},
	disableds : {},
	images : {},
	labels : {},
	colors : {},
	tooltips : {},
	
	_dbConn: null,
	
	ExportToFile : function(text)
	{

		//var blob = new Blob([text], {type : 'plain/text'});
		var blob = new Blob(['\uFEFF' + text], {encoding:"UTF-8",type:"text/plain;charset=UTF-8"});

		var downloading = browser.downloads.download({
		  url: URL.createObjectURL(blob),
		  body : text,//encoder.encode(text),
		  filename : 'result.csv',
		  saveAs: true,
		  conflictAction : 'uniquify'
		});
	},

	UpdateCache : function(url, button, rank, tooltip, isDomain, colorScheme, lin, lout, spam, hist, tabid, doc)
	{
		try{
		var objToWrite = {url: url, rank: rank, tooltip: tooltip, date: XTBrowserTools.GetDateStr(), colorScheme: colorScheme, lin: lin, lout: lout, spam: spam, hist: hist};
		var db = XTBrowserTools._dbConn;
		console.log('Updating cache');
		if (db)
		{
			console.log('connected');
			var store = db.transaction("xt_cache", 'readwrite').objectStore("xt_cache");
			
			var request = store.get(url);
			
			request.onsuccess = 
			function(event) {
				console.log('requested');
			  if (request.result)
			  {
				  console.log('found existing row in db');
				  var oldRank = request.result.rank;
				  objToWrite.delta = rank - oldRank;				  
				  var deleteRequest = store.delete(url);
				  
				  deleteRequest.onsuccess = 
				  function(event) {
					  console.log("successfully deleted from db");	
					  var addRequest = store.add(objToWrite);			  
					  addRequest.onsuccess = 
					  function(event) {
						  console.log("successfully added to db");	
					  };
					  addRequest.onerror = function(event) {
							console.log("unable to add value to db: " + JSON.stringify(event));
					  };
				  };
				  deleteRequest.onerror = function(event) {
						console.log("unable to delete value from db: " + JSON.stringify(event));
				  };
			  }
			  else
			  {
				  var addRequest = store.add(objToWrite);			  
				  addRequest.onsuccess = 
				  function(event) {
					  console.log("successfully added to db");	
				  };
				  addRequest.onerror = function(event) {
						console.log("unable to add value to db: " + JSON.stringify(event));
				  };
			  }			  
			};
			
			request.onerror = function(event) {
				console.log("unable to get value from db: " + JSON.stringify(event));
			};
			
			
		}

		}catch(e)
		{
			console.log("Error " + e);
		}
		
	},
	
	AddObjectToStore : function(store, objToWrite)
	{
		var addRequest = store.add(objToWrite);			  
		  addRequest.onsuccess = 
		  function(event) {
			  console.log("successfully added to db");	
		  };
		  addRequest.onerror = function(event) {
				console.log("unable to add value to db: " + JSON.stringify(event));
		  };
	},
	
	
	padStr : function (i) 
	{
		return (i < 10) ? "0" + i : "" + i;
	},
	
	GetDateStr : function()
	{
		//YYYY-MM-DD HH:MM:SS
		var temp = new Date();
		var dateStr = XTBrowserTools.padStr(temp.getFullYear()) + "-" +
					  XTBrowserTools.padStr(1 + temp.getMonth()) + "-" +
					  XTBrowserTools.padStr(temp.getDate()) + " " +
					  XTBrowserTools.padStr(temp.getHours()) + ":" +
					  XTBrowserTools.padStr(temp.getMinutes()) + ":" +
					  XTBrowserTools.padStr(temp.getSeconds());
		return dateStr + " ";
	},
	
	UpdateCache2 : function(url, button, rank, tooltip, isDomain, colorScheme, lin, lout, spam, hist, oldRank, tabid, doc)
	{
	
		console.log("UpdateCache2");
		var delta = "";
		if (oldRank != "")
		{
			var oldRankValue = 0;
			try 
			{
				oldRankValue = parseFloat(oldRank);
				var rankValue = parseFloat(rank);
				if ((oldRankValue != 0) && (rankValue != 0))
				{
					delta = rankValue - oldRankValue;
				}
			}
			catch(e) {}
			
		}
		var fixedToolTip = tooltip;
		while (fixedToolTip.indexOf("\"") != -1)
			fixedToolTip = fixedToolTip.replace("\"", "&quot;");
		while (url.indexOf("\"") != -1)
			url = url.replace("\"", "&quot;");
		var db = openDatabase("xtool_checker", "0.1", "Xtool checker db", 200000);
		if (db)
		{
			db.transaction(function(tx) {
				tx.executeSql("INSERT INTO xt_cache (url, rank, tooltip, date, delta, scheme, lin, lout, spam, hist) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
					[url, rank, fixedToolTip, XTBrowserTools.GetDateStr(), delta, colorScheme, lin, lout, spam, hist], null, null);
				});
		}
		if (button.name != XToolCheckerConst._mainButtonPrefix)
			XTBrowserTools.UpdateButtonText(button, rank, delta + "", fixedToolTip, tabid, doc);
	},
	
	AddToGBLList : function(domain)
	{
		var db = openDatabase("xtool_checker", "0.1", "Xtool checker db", 200000);
		if (db)
		{
			db.transaction(function(tx) {
				tx.executeSql("INSERT INTO gbl_list (domain) values(?)", [domain], null, null);
				});
		}
	},
	
	RemoveFromGBLList : function(domain)
	{
		var db = openDatabase("xtool_checker", "0.1", "Xtool checker db", 200000);
		if (db)
		{
			db.transaction(function(tx) {
				tx.executeSql("DELETE FROM gbl_list WHERE domain = ?", [domain], null, null);
				});
		}
	},
	
	
	PrepareDatabase : function()
	{
	  window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

	  window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
	  window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

	  var DBOpenRequest = window.indexedDB.open("XTool", 1);

	  DBOpenRequest.onerror = function(event) {
		  console.log("Database error: " + JSON.stringify(event));
		  
		console.log('Error loading database.');
	  };

	  DBOpenRequest.onsuccess = function(event) {
		console.log('Database initialized.');

		XTBrowserTools._dbConn = DBOpenRequest.result;

	  };

	  DBOpenRequest.onupgradeneeded = function(event) {
		var db = event.target.result;

		db.onerror = function(event) {
		  console.log('Error upgrading database.');
		};
		console.log('Upgrading...');
		var objectStore = db.createObjectStore("xt_cache", { keyPath: "url" });


		objectStore.createIndex("rank", "rank", { unique: false });
		objectStore.createIndex("tooltip", "tooltip", { unique: false });
		objectStore.createIndex("date", "date", { unique: false });
		objectStore.createIndex("delta", "delta", { unique: false });
		objectStore.createIndex("scheme", "scheme", { unique: false });

		objectStore.createIndex("lin", "lin", { unique: false });
		objectStore.createIndex("lout", "lout", { unique: false });
		objectStore.createIndex("spam", "spam", { unique: false });
		objectStore.createIndex("hist", "hist", { unique: false });
		console.log('Object store xt_cache created.');
		
		var objectStoreGbl = db.createObjectStore("gbl_list", { keyPath: "domain" });
		console.log('Object store gbl_list created.');
		
		var objectStorePrj = db.createObjectStore("xt_prj", { keyPath: "link_id" });
		objectStorePrj.createIndex("url", "url", { unique: false });
		console.log('Object store xt_prj created.');

	  };
	},
		
	ShowCapchaDialog : function(doc, tabID, cpt)	
	{
		console.log("ShowCapchaDialog");
		console.log(JSON.parse(JSON.stringify(cpt)));
		XTCommands.sendMessageTabXT(tabID, {action : "ShowCapchaDialog", info : JSON.parse(JSON.stringify(cpt)) });
	},


	SetButtonInfo : function(doc, tabID, buttonInfo)	
	{
		console.log("SetButtonInfo");
		XTCommands.sendMessageTabXT(tabID, {action : "SetButtonInfo", info : buttonInfo });
	},
	
	SetTextInfo : function(doc, tabID, buttonInfo)	
	{
		console.log("SetTextInfo");
		XTCommands.sendMessageTabXT(tabID, {action : "SetTextInfo", info : buttonInfo });
	},

	SetImageSrc : function(doc, tabID, imgInfo)	
	{
		console.log("SetImageSrc");
		XTCommands.sendMessageTabXT(tabID, {action : "SetImageSrc", info : imgInfo });
	},
	
	ReplaceBadSymbols : function(url)
	{
		return encodeURIComponent(url);
	},
	
	MsgToConsole : function(msg)
	{
		if (msg !== undefined)
			console.log("XTBrowserTools: " + msg);
	},
		
	Init : function ()
	{
	    this.hiddens['undefined'] = 'undefined';
    	this.values['undefined'] = 'undefined';
    	this.disableds['undefined'] = 'undefined';
    	this.images['undefined'] = 'undefined';
    	this.labels['undefined'] = 'undefined';
    	this.colors['undefined'] = 'undefined';
    	this.tooltips['undefined'] = 'undefined';
	}, 
	
	GetButtonInfos : function(btnPrefix)
	{
		var time = new Date();
		console.log("GetButtonInfos: " + time.getHours() + ":" +	time.getMinutes() + ":" + time.getSeconds());
		var ids = [];
		
		var querying = browser.tabs.query({currentWindow: true, active: true});
		querying.then(function(tabs) { 
			for (let tab of tabs) {
				browser.tabs.sendMessage(tab.id, {action : "GetButtonInfos", prefix : btnPrefix }).then(
				function (response) { XToolChecker.CheckButtonsByInfos(btnPrefix, undefined, tab.id, response, tab.url) }
				);
			}
		}, XTCommands.onError);
		/*XTCommands.sendMessageXT({action : "GetButtonInfos", prefix : btnPrefix }, false, 
		function (response) { XToolChecker.CheckButtonsByInfos(btnPrefix, undefined, tab.id, response, myTabUrl) });*/
	//	XToolChecker.CheckButtonsByInfos(btnPrefix, undefined, tab.id, response, myTabUrl);
		/*browser.tabs.getSelected(null, 
		function(tab) { 
			var myTabUrl = tab.url; 
			browser.tabs.sendMessage(tab.id, {action : "GetButtonInfos", prefix : btnPrefix }, 
				function(response)
				{
					var time = new Date();
					console.log("CheckButtonsByInfos: " + time.getHours() + ":" +	time.getMinutes() + ":" + time.getSeconds());
		
					XToolChecker.CheckButtonsByInfos(btnPrefix, undefined, tab.id, response, myTabUrl);
				});
		});*/
	},
	
	PrepareSettings : function ()
	{
		var sts = XTSettings;
		console.log("prepare settings");
		var obj =  
		{
				action: "ButtonSettings",
				settings: sts
		};
		return obj;
	},
	
	UpdateLinksCustomPage : function(tabId)
	{
		XTCommands.sendMessageTabPrepareXT(tabId, {action : "AddLinksOnCustomPage", list : XToolChecker._tmpList });
	},
	
	UpdateButtonSettingsAddButtons : function(tabId)
	{
		 XTCommands.sendMessageTabPrepareXT(tabId, {action : "AddButtons", mode : XToolChecker.GetMode() });
	},
	
	LoadFromCache : function(url, buttonID, select, tabid, doc)
	{
		try{
		
		var db = XTBrowserTools._dbConn;
		//console.log('Loading cache ' + url);
		if (db)
		{
			//console.log('connected');
			var store = db.transaction("xt_cache", 'readonly').objectStore("xt_cache");
			
			var request = store.get(url);
			
			request.onsuccess = 
			function(event) {
				//console.log('requested');
			  if (request.result)
			  {
				  console.log('found existing row in db for url: '+url);
				  XTCommands.sendMessageTabXT(tabid, { action : "ResultFromCache", result: request.result, buttonID: buttonID, select: select });
			  }	  
			};
			
			request.onerror = function(event) {
				console.log("unable to get value from db: " + JSON.stringify(event));
			};
			
			
		}
		
		}catch(e)
		{
			
			
			console.log("Error " + e);
		}
		
		/*if (url !== undefined)
		{
			var db = openDatabase("xtool_checker", "0.1", "Xtool checker db", 200000);
			if (db)
			{
				while (url.indexOf("\"") != -1)
					url = url.replace("\"", "&quot;");
				db.transaction(function(tx) {
				tx.executeSql("SELECT url, rank, tooltip, date, delta, scheme, lin, lout, spam, hist FROM xt_cache WHERE url = ?", [url], 
					function(tx, result) 
					{
						if (result.rows.length >= 1)
						{
							console.log("LoadFromCache");
							XTCommands.sendMessageTabXT(tabid, { action : "ResultFromCache", result: result.rows.item(0), buttonID: buttonID, select: select });
						}
					}, null)}); 
			}			
		}*/
	
	
	},
	
	OnCustomLoad : function (event) 
	{
		/*
		var doc = event.originalTarget;
		getBrowser().getBrowserForDocument(doc).removeEventListener("DOMContentLoaded", XToolChecker.OnCustomLoad, true);
		doc.replaceChild(doc.createElement("html"), doc.documentElement);
		var head = doc.createElement("head");
		doc.documentElement.appendChild(head);
		
		var title = doc.createElement("title");
		title.textContent = "Пользовательские ссылки";
		head.appendChild(title);

		var body = doc.createElement("body");
		body.id = XToolChecker._generated;
		doc.documentElement.appendChild(body);
		var table = doc.createElement("table");
		body.appendChild(table);
		XToolChecker.AddListToTable(doc, table);
		
		var button = doc.createElement("input");
		button.type = "button";
		button.value = "Удалить выбранные из списка";
		button.addEventListener("click", XToolChecker.OnRemoveSelected, false);
		body.appendChild(button);
		
		var buttonAdd = doc.createElement("input");
		buttonAdd.type = "button";
		buttonAdd.value = "Добавить еще ссылок...";
		buttonAdd.addEventListener("click", XToolChecker.OnAddMoreLinks, false);
		body.appendChild(buttonAdd);
		
		XToolChecker._tmpList = [];
		XToolChecker.RefreshButtons();
		*/
	},
	
	SetCheckForButton : function(btn, doc, tabID, check, toggleCheck)
	{
			console.log("SetCheckForButton");
			XTCommands.sendMessageTabXT(tabID, {action : "SetCheckForButton", id : btn.name, needCheck: check, toggle: toggleCheck });
		
		/*
		if (btn.ownerDocument.location.href.indexOf(this._rookeePart) != -1)
		{
			return XToolChecker.SetCheckForRookee(btn, toggle);
		}		
			
			
		if ((btn.name.indexOf(cn._buttonYalPrefix) == 0) && (this._expireYal))
		{
				if ((btn.ownerDocument.location.href.indexOf(this._linksPart) != -1))
				{
					var tmpObj = btn;
					tmpObj.className = "XTCheckedButton";
					while  ((tmpObj) && (tmpObj.nodeType == 1))
					{
						if (tmpObj.nodeName == "TR")
						{
							var spans = tmpObj.getElementsByTagName("SPAN");
							if ((spans) && (spans.length > 0))
							{
								if (spans[0].textContent == "WAIT")
									return false;
								break;
							}
						}
						tmpObj = tmpObj.parentNode;
					}
				}
				if (!XToolChecker.CheckDaysLeft(btn))
					return false;
		}
		var mode = XToolChecker.GetMode(btn.ownerDocument);
		while  ((tmpObj) && (tmpObj.nodeType == 1))
		{
			if (tmpObj.nodeName == "TR")
			{
				var inputs = tmpObj.getElementsByTagName("INPUT");
				for (var i = 0; i < inputs.length; i++)
				{
					if (inputs[i].type == "checkbox")
					{
						if (!toggle)
							inputs[i].checked = true;
						else
							inputs[i].checked = !inputs[i].checked;
						if ((mode != this._modes.liex) || (i == inputs.length - 1))
							return true;
					}
				}
			}
			
			tmpObj = tmpObj.parentNode;
			
		}
		
		
			
	
		
		if ((btn.name.indexOf(cn._buttonPOSPrefix) == 0) && (this._posNotCheckErr))
			
		{
		
			if ((btn.ownerDocument.location.href.indexOf(XToolChecker._linksPart) != -1))
			{
				var tmpObj = btn;
				tmpObj.className = "XTCheckedButton";
				while  ((tmpObj) && (tmpObj.nodeType == 1))
				{
					if (tmpObj.nodeName == "TR")
					{
						var links = tmpObj.getElementsByTagName("A");
						if ((links) && (links.length > 0))
						{
							if ((links[0].textContent == "ERROR") && 
								(links[0].href.indexOf("sape.ru/links_errors_stats.php") != -1))
								return false;
							break;
						}
					}
					tmpObj = tmpObj.parentNode;
				}
			}
		}
		
		
		
		return false;
	}
	catch(e)
	{
		XToolChecker.ReportError("SetCheckForButton: ", e);
	}*/
	},
	
	UpdateElementByName  : function (name)
	{
		/*chrome.extension.*/
		browser.runtime.sendMessage({action : "UpdatePopupElement", elementName : name });
	},
	
	SetElementHidden : function (name, value)
	{
		this.hiddens[name] = value;
		XTBrowserTools.UpdateElementByName(name);
	},
	
	GetElementHidden : function (name)
	{
		var result = this.hiddens[name];
		if (result)
			return result;
		else
			return false;
	},

	SetElementValue : function (name, value)
	{
		this.values[name] = value;
		XTBrowserTools.UpdateElementByName(name);
	},
	
	GetElementValue : function (name)
	{
		var result = this.values[name];
		if (result)
			return result;
		else
			return false;
	},
	
	SetElementDisabled : function (name, value)
	{
		this.disableds[name] = value;
		XTBrowserTools.UpdateElementByName(name);
	},
	
	SetElementImage : function (name, value)
	{
		if (value.indexOf(":") == -1)
			value = /*chrome.extension.*/
			browser.runtime.getURL("content/images/" + value);
		this.images[name] = value;
		XTBrowserTools.UpdateElementByName(name);
	},
	
	SetElementLabel : function (name, value)
	{
		this.labels[name] = value;
		XTBrowserTools.UpdateElementByName(name);
	},
	
	SetElementColor : function (name, value)
	{
		this.colors[name] = value;
		XTBrowserTools.UpdateElementByName(name);
	},
	
	SetElementTooltip : function (name, value)
	{
		this.tooltips[name] = value;
		XTBrowserTools.UpdateElementByName(name);
	}
}