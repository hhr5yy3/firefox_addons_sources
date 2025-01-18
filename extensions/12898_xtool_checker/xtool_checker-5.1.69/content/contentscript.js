 
browser.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
	XToolCheckerThreads.SetColors();
	
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
	console.log("Action = "  + request.action);
	var xbm = XToolCheckerBtnManager;
	if (request.action == "AddLinksOnCustomPage")
	{
		var body = document.getElementById(XToolCheckerConst._generated);
		var doc = document;
		if (body)
		{
			xbm.CustomLoadContent(doc, body, request.list);
			xbm.AddButtons(doc, 2);
		}
	}
	else
    if (request.action == "AddButtons")
	{
		var body = document.getElementById(XToolCheckerConst._generated);
		var doc = document;
		if (body)
		{
			xbm.AddButtons(doc, 2);
		}
		else
		{
			browser.storage.local.get('mode').then(
				function(result) {
					if (result['mode'] != undefined)
					{
						xbm.AddButtons(document, result['mode']);
					}
				}, null);
		}
		
	}
	else if (request.action == "ButtonSettings")
	{
		xbm.sts = request.settings;
		console.log("settings loaded");
		sendResponse(0);
	}
	else  if (request.action == "GetButtonInfos")
	{
		var prefix = request.prefix;
		console.log("GetButtons!!");
		var infos = xbm.GetButtons(document, prefix);
		var time = new Date();
		console.log("SendingResponse: " + time.getHours() + ":" +	time.getMinutes() + ":" + time.getSeconds());
		
		sendResponse(infos);
		console.log("added");
	}
	else  if (request.action == "SetCheckForButton")
	{
		console.log("SettingCheck");
		chrome.storage.local.get('mode', function(value) {
			var mode = -1;
			if (value.mode !== undefined)
				mode = value.mode;
            console.log("Mode ="+value.mode);
			xbm.SetCheckForButtonOuter(document, mode, request.id, request.needCheck, request.toggle);
		});
	}
	else if (request.action == "CheckInvert")
	{
		xbm.CheckInvert(0);
	}
	else if (request.action == "ExportToExcel")
	{
		xbm.ExportToExcel();
	}
	else if (request.action == "CheckCount")
	{
		xbm.CheckCount(0);
	}
	else  if (request.action == "SetButtonInfo")
	{
		var info = request.info;
		console.log("SetButton");
		xbm.SetButton(document, info);
	}
	else  if (request.action == "SetImageSrc")
	{
		var info = request.info;
		console.log("SetImageSrc");
		xbm.SetImageSrc(document, info);
	}
	else  if (request.action == "SetTextInfo")
	{
		var info = request.info;
		console.log("SetText");
		xbm.SetInfo(document, info);
	}
	else if (request.action == "RefreshButtons")
	{
		xbm.RemoveButtons(document);
		chrome.storage.local.get('mode', function(value) {
			var mode = -1;
			if (value.mode !== undefined)
				mode = value.mode;
			xbm.AddButtons(document, mode);
		});
		//xbm.AddButtons(document, 2);
	}
	else if (request.action == "MarkLinks")
	{
		xbm.MarkLinks(1);
	}
	else if (request.action == "ResultFromCache")
	{
		console.log("LoadFromCache response: " + request.buttonID);	
		XTContentTools.ResponseFromCache(request.result, request.buttonID, request.select) 
	}
	else if (request.action == "AppendLinks")
	{
		var body = document.getElementById(XToolCheckerConst._generated);
		if (body)
		{
			var tables = body.getElementsByTagName("table");
			XToolCheckerBtnManager.AddListToTable(document, tables[0], request.links);
			XToolCheckerBtnManager.AddButtonsToAny(document, true, true);
		}
	}
	else  if (request.action == "ShowCapchaDialog")
	{
		var info = request.info;
		console.log("ShowCapchaDialogMsg");
		xbm.ShowCapchaDialog(document, info);
	}

  });