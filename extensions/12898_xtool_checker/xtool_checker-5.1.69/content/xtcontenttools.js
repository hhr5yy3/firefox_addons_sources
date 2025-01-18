var XTContentTools = 
{

    onError : function (error) 
	{
		console.log(`XTContentTools Error: ${error}`);
	},


	GetDocument : function ()
	{
		return document;
	},

		
	SetAppendMode : function ()
	{
		//chrome.extension.sendMessage({action : "SetAppendTab"});
		browser.runtime.sendMessage({action : "SetAppendTab"});
	},

	LoadFromCache : function (url, btn)
	{
		var sts = XToolCheckerBtnManager.sts;
		var select = false;
		if (!sts._useCache)
			return;
		//console.log("LoadFromCache send: " + url);	
		browser.runtime.sendMessage({action : "LoadFromCache", url: url, buttonID : btn.id });
	},
	
	ResponseFromCache : function(response, buttonID, select) 
	{ 
		if (response)
		{
			var url = response.url;
			var rank = response.rank;
			var date = response.date;
			var title = "\[" + response.date + "\] " + response.tooltip;
			var delta = response.delta;
			var scheme = response.scheme;
			var lin = response.lin;
			var lout = response.lout;
			var spam = response.spam;
			var history = response.hist;
			if (!delta)
				delta = "";
			if (!scheme)
				scheme = "";
			var btn = document.getElementById(buttonID);
			XToolCheckerBtnManager.SetFromCache(url, btn, rank, date, title, delta, scheme, lin, lout, spam, history, select);
		}
	},
	
	CheckBlacklist : function (domain, link, button)
	{
		
		var cn = XToolCheckerConst;
		//chrome.extension.sendMessage({action : "CheckBlackList", domain: domain},
		browser.runtime.sendMessage({action : "CheckBlackList", domain: domain}).then(
		 function(response) { 
			if (response)
			{
				link.style.backgroundColor = "#AAAAAA";
				var tr = XToolCheckerBtnManager.GetParentTR(link);
				if (tr)
				{
					var els = tr.getElementsByTagName("INPUT");
					for ( k = 0; k < els.length; k++)
					{
						if (els[k].name.indexOf(cn._buttonGBLPrefix) == 0)
							els[k].style.backgroundColor = "#777777";
					}
				}
				if (cn._check_gbl_marked)
				{
					if ((XToolCheckerBtnManager.IsPageToCheck(button.ownerDocument)))
					{
						XToolCheckerBtnManager.SetCheckForButton(button);
					}
				}	
			}
		 }, XTContentTools.onError);
	//*//
	
		/*try {
			var statement = XToolChecker._mDBConn.createStatement('SELECT domain FROM gbl_list WHERE domain = \"' + domain + '\";');
			var theList = document.getElementById('domains_list');
			if (statement.executeStep())
			{
				return true;
			}
			else
			{
				
				statement.reset();
				statement.finalize();
				return false;
			}
		}
		catch(e)
		{
			XToolChecker.ReportError("InBlacklist: ", e);
			return false;
		}*/
	
	}
	
}