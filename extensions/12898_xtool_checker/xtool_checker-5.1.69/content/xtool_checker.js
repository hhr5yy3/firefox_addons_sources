var XToolChecker = 
{

//*//
	_debug : true,
	_loggedIn: false,
	_mDBConn: 0,
	_modeComboName : "xtool_checker_mode",
	_testBtnName : "xtool_checker-test",
	_tbButtonName : "xtool_checker-fastXT",
	_stopButtonName : "xtool_checker-StopMulticheck",
	_pauseButtonName : "xtool_checker-PauseMulticheck",
	_stageLabelName : "xtool_checker-StageLabel",
	_loginLabelName : "xtool_login_label",
	_registerLabelName : "xtool_register_label",
	_loginInfoLabelName : "xtool_login_info_label",
	_loginInfoLabel2Name : "xtool_login_info_label2",
	_updBtnName : "xtool_checker-must",
	_yapBtnName : "xtool_checker-check_yap",
	_yalBtnName : "xtool_checker-check_yal",
	_ycBtnName : "xtool_checker-check_yc",
	_gpBtnName : "xtool_checker-check_gp",
	_glBtnName : "xtool_checker-check_gl",
	_gcBtnName : "xtool_checker-check_gc",
	_inyBtnName : "xtool_checker-check_iny",
	_ingBtnName : "xtool_checker-check_ing",
	_stabImgName : "xtool_checker-stability",
	_toolbarName : "xtool_checker-Toolbar",
	
	_currentQueryIndex : -1,
	_currentQueryType : 0,
	_appendTab : -1,
	
	
	_inyParams : "",
	_ingParams : "",
	_yapParams : "",
	_yalParams : "",
	_glParams : "",
	_gpParams : "",
	_gcParams : "",
	_loginAttempt : 0,
	_yalMethod: 1,
	_pauseMulticheck : false,
	_isSplitting : false,
	
	_dbBusy : false,
	
	_lastUrl : "",
	_mozAccessID : "",
	_mozSignature : "",
	_mozExpires : "",

	_mode : 1,
	
	_isCaptureDialog : false,
	
	
	_g_time : 0,
	_y_time : 0,
	_y_waitTime : 0,
	_pr_time : 0,
	_pr_waitTime : 0,
	_g_waitTime : 0,
	_cpt_time: 0,
	
	_bcEncoding : "",
	
	_tmpList : [],
	
	
	_stabValue : -1,
	_minStab : -1,
	_maxStab : -1,
	
	
	_stopWait : false,
	_thread : 0,
	_processingPft : false,
	_needPft : false,
	_pftStr : "",
	_pftUrl : "",
	_pftCount : 1000000,
	_pftThreadIndex : -1,
	_version : "",
	_newFile : "",
	

	SetAddonInfo : function (addon)
	{
		XToolChecker._version = addon.version;
	},

	checker_init : function() 
	{
	
		console.log("init");
	    try
		{
			XTBrowserTools.PrepareDatabase();
			var appcontent = document.getElementById("appcontent");   // browser
			if(appcontent)
			  appcontent.addEventListener("DOMContentLoaded", XToolChecker.checker_PageLoad, true);
			XToolCheckerThreads.SetColors();
			XTSettingsManager.CheckAndReadSettings();
			this._loginAttempt = 0;
	
			setTimeout(function() { XToolChecker.LoginCheck(0); }, 1500);
		}
		catch(e)
		{
			XToolChecker.ReportError("init: ", e);
		}
	
	},

	
	ReportError : function(text, ex)
	{
		var message = text + ex;
		try 
		{
			message += "\n\n";
			message += ex.stack;
		}
		catch(e) {}
		XToolChecker.MsgToConsole(message);
	},
	
	CheckAndReadSettings : function()
	{

	},
	
	checker_uninit : function() 
	{
		var appcontent = document.getElementById("appcontent");   // browser
	    if(appcontent)
	      appcontent.removeEventListener("DOMContentLoaded", XToolChecker.checker_PageLoad, true);
		
		// close connection;
		if (XToolChecker._mDBConn != 0)
		{
			XToolChecker._mDBConn.close();
			XToolChecker._mDBConn = 0;
		}
		
	},

	checker_PageLoad : function(aEvent) 
	{
		console.log("pageLoad");
		var doc = aEvent.originalTarget; 
		XToolChecker.AddButtonsToDoc(doc);
		
	},

/*	InsertLinkMarker : function(link, doc, url)
	{
		var x = doc.createElement("INPUT");
		x.type = "hidden";
		x.value = 'marker';
		if (!url)
			url = "";
		x.alt = url;
		x.name = this._markerPrefix;
		var next = link.nextSibling;
		if (next === undefined)
		{
			var tmpDiv = doc.createElement("DIV");
			link.parentNode.appendChild(tmpDiv);
			link.parentNode.insertBefore(x,link.nextSibling);
			link.parentNode.removeChild(tmpDiv);
		}
		else
			link.parentNode.insertBefore(x,link.nextSibling);
	},*/
	
	
	AddButtonsToDoc : function(doc)
	{
		var hrefL = XToolChecker.GetLocation(doc);
		if (hrefL=="http://xtool.ru/")
		{
			XToolChecker.LoginCheck(0);
		}
	
	},
	
	endsWith : function (str, suffix) 
	{
		return str.indexOf(suffix, str.length - suffix.length) !== -1;
	},

	
	//Подготовка предварительных данных
	OnOrdersSearch : function(event)
	{
		var browser = getBrowser().getBrowserForTab(getBrowser().selectedTab);
		if (browser)
		{
			setTimeout(function() { XToolChecker.CheckRefresh(browser, false); }, 1500);
		}
	},
	
	CheckRefresh : function(browser, button)
	{
		if (browser)
		{
			var doc = browser.contentDocument;
			if (doc)
			{
				var divs = doc.getElementsByTagName("div");
				for(var i = 0; i < divs.length; i++)
				{
					if  (divs[i].getAttribute("aria-labelledby") == "ui-dialog-title-modal_dialog")
					{
						if (divs[i].style.display != "none")
						{
							setTimeout(function() { XToolChecker.CheckRefresh(browser, button); }, 500);
							return;
						}
						else
						{
							XToolChecker.RemoveButtons(doc);
							XToolChecker.AddButtonsToDoc(doc);
							return;
						}
					
					}
					
				}
					
			
			
			}

		}
	},
	
	
	
	/*
	RefreshButtons : function(event)
	{
		var browser = getBrowser().getBrowserForTab(getBrowser().selectedTab);
		if (browser)
		{
			var doc = browser.contentDocument;
			if (doc)
			{
				XToolChecker.RemoveButtons(doc);
				XToolChecker.AddButtonsToDoc(doc);
			}
			
		}
	},
*/

	CurrentXT : function (url)
	{
		//var browser = getBrowser().getBrowserForTab(getBrowser().selectedTab);
		var count = 0;
		var cn = XToolCheckerConst;
		/*if (browser)
		{
			
			var doc = browser.contentDocument;
			if (doc)*/
			{
				//var tbButton = document.getElementById("xtool_checker-fastXT");
				//XTBrowserTools.SetElementLabel(this._tbButtonName, "(xt)");
				var href =  url;//XToolChecker.GetLocation(doc);;
				if ((href.toLowerCase().indexOf("http://") != -1) || (href.toLowerCase().indexOf("https://") != -1))
				{
					var x = {};//doc.createElement("INPUT");
					x.type = "button";
					x.value = 'XT';
					x.name = cn._mainButtonPrefix;
					x.alt = XToolChecker.PrepareLink(href);
					x.style = {};
					x.style.backgroundColor = "#CCCCCC";
					var threadIndex = XToolCheckerThreads.GetNewThreadIndex();
					if (threadIndex != -1)
						XToolChecker.ButtonClicked(x, threadIndex);
				}
			}
		
				
	},
		
	
	MustUpd : function(event)
	{
		if (this._newFile != "")
			XToolChecker.OpenURL("http://xtool.ru/plugin/" + this._newFile);
	},
	
	Multicheck : function(event)
	{
		if (this._isSplitting)
			return;
		if (this._pauseMulticheck)
			return;
		XTBrowserTools.GetButtonInfos(XToolCheckerConst._buttonPrefix);
		/*var browser = getBrowser().getBrowserForTab(getBrowser().selectedTab);
		if (browser)
		{
			var doc = browser.contentDocument;
			if (doc)
			{
				this._currentQueryIndex = -1;
				var buttons = doc.getElementsByTagName("INPUT");
				if ((!XToolCheckerThreads.IsRunning("XT")) && (!XToolCheckerThreads.IsRunning("XTD")))
				{
					var threadIndex = XToolCheckerThreads.GetNewThreadIndex();
					if (threadIndex != -1)
					{
						var resultButtons = [];
						for(var i = 0; i < buttons.length; i++)
						{
							if ((buttons[i].type == 'button') && (buttons[i].name.indexOf(cn._buttonPrefix) != -1))
							{
								if (buttons[i].name.indexOf(cn._buttonXTDPrefix) == -1) 
								{
									if (XToolChecker.isVisible(buttons[i]))
									{
			
										resultButtons.push(buttons[i]);
									}
								}
							}
						}
						if (resultButtons.length > 0)
						{
							XTBrowserTools.SetElementDisabled(this._pauseButtonName, false);
							XTBrowserTools.SetElementTooltip(this._pauseButton.tooltiptext,  "Пауза");
							XTBrowserTools.SetElementImage(this._pauseButtonName, "pause.png");
							XTBrowserTools.SetElementHidden(this._pauseButtonName, false);
							XTBrowserTools.SetElementHidden(this._stopButtonName, false);
							XToolCheckerThreads.InitMulticheckThread(threadIndex, resultButtons, "XT");
							//XToolChecker.ButtonClicked(XToolCheckerThreads.GetCurrentButtonInfo(threadIndex), threadIndex);
							XToolChecker.ClickOrSkip(XToolCheckerThreads.GetCurrentButtonInfo(threadIndex), threadIndex);
						}
					}
				}
			}
		}*/
	},


	
	Domainscheck : function(event)
	{
		if (this._isSplitting)
			return;
		if (this._pauseMulticheck)
			return;
		XTBrowserTools.GetButtonInfos(XToolCheckerConst._buttonXTDPrefix);
	/*	var browser = getBrowser().getBrowserForTab(getBrowser().selectedTab);
		if (browser)
		{
			var doc = browser.contentDocument;
			if (doc)
			{
				//his._buttons = [];
				this._currentQueryIndex = -1;
				var buttons = doc.getElementsByTagName("INPUT");
				if ((!XToolCheckerThreads.IsRunning("XT")) && (!XToolCheckerThreads.IsRunning("XTD")))
				{
					var threadIndex = XToolCheckerThreads.GetNewThreadIndex();
					if (threadIndex != -1)
					{
						var resultButtons = [];
						for(var i = 0; i < buttons.length; i++)
						{
							if ((buttons[i].type == 'button') && (buttons[i].name.indexOf(cn._buttonPrefix) != -1))
							{
								if (buttons[i].name.indexOf(cn._buttonXTDPrefix) != -1)
								{
									if (XToolChecker.isVisible(buttons[i]))
									{
	
										resultButtons.push(buttons[i]);
									}
								}
							}
						}
						if (resultButtons.length > 0)
						{
							XTBrowserTools.SetElementDisabled(this._pauseButtonName, false);
							XTBrowserTools.SetElementTooltip(this._pauseButtonName, "Пауза");
							XTBrowserTools.SetElementImage(this._pauseButtonName, "pause.png");
							XTBrowserTools.SetElementHidden(this._pauseButtonName, false);
							XTBrowserTools.SetElementHidden(this._stopButtonName, false);
							XToolCheckerThreads.InitMulticheckThread(threadIndex, resultButtons, "XTD");
							//XToolChecker.ButtonClicked(XToolCheckerThreads.GetCurrentButtonInfo(threadIndex), threadIndex);
							XToolChecker.ClickOrSkip(XToolCheckerThreads.GetCurrentButtonInfo(threadIndex), threadIndex);
						}
					}
				}
			}
		}*/
	},
	
		
	CheckYap : function(event)
	{
		XToolChecker.CheckButtons(XToolCheckerConst._buttonYapPrefix);
	},
	
	CheckYC : function(event)
	{
		XToolChecker.CheckButtons(XToolCheckerConst._buttonYCPrefix);
	},
	
	CheckYal : function(event)
	{
		XToolChecker.CheckButtons(XToolCheckerConst._buttonYalPrefix);
	},
	
	CheckBC : function(event)
	{
		XToolChecker.CheckButtons(XToolCheckerConst._buttonBCPrefix);
	},
	
	CheckLVL : function(event)
	{
		XToolChecker.CheckButtons(XToolCheckerConst._buttonLVLPrefix);
	},
	
	CheckPOS : function(event)
	{
		XToolChecker.CheckButtons(XToolCheckerConst._buttonPOSPrefix);
	},
	
	CheckTrf : function(event)
	{
		XToolChecker.CheckButtons(XToolCheckerConst._buttonTrfPrefix);
	},
	
	CheckES : function(event)
	{
		XToolChecker.CheckButtons(XToolCheckerConst._buttonESPrefix);
	},
	
	CheckGP : function(event)
	{
		XToolChecker.CheckButtons(XToolCheckerConst._buttonGPPrefix);
	},
	
	CheckGC : function(event)
	{
		XToolChecker.CheckButtons(XToolCheckerConst._buttonGCPrefix);
	},
	
	CheckGL : function(event)
	{
		XToolChecker.CheckButtons(XToolCheckerConst._buttonGLPrefix);
	},
	


	CheckSQI : function(event)
	{
		XToolChecker.CheckButtons(XToolCheckerConst._buttonSQIPrefix);
	},
	
	CheckINY : function(event)
	{
		XToolChecker.CheckButtons(XToolCheckerConst._buttonINYPrefix);
	},
	
	CheckING : function(event)
	{
		XToolChecker.CheckButtons(XToolCheckerConst._buttonINGPrefix);
	},
	
	CheckPR : function(event)
	{
		XToolChecker.CheckButtons(XToolCheckerConst._buttonPRPrefix);
	},
	
	CheckR: function(event)
	{
		XToolChecker.CheckButtons(XToolCheckerConst._buttonRPrefix);
	},
	
	CheckRLV: function(event)
	{
		XToolChecker.CheckButtons(XToolCheckerConst._buttonRLVPrefix);
	},
	
	CheckButtons : function(btnPrefix)
	{
		XToolChecker.MsgToConsole ("Multicheck: " + btnPrefix);
		if (this._isSplitting)
			return;
		if (this._pauseMulticheck)
			return;
		XTBrowserTools.GetButtonInfos(btnPrefix);
	},
		
	CheckButtonsByInfos : function(btnPrefix, doc, tabID, infos, url)	
	{
		/*var browser = getBrowser().getBrowserForTab(getBrowser().selectedTab);
		if (browser)
		{
			var doc = browser.contentDocument;
			if (doc)
			{*/
				this._currentQueryIndex = -1;
				//var buttons = doc.getElementsByTagName("INPUT");
				var btnName = XToolChecker.GetButtonNameByPrefix(btnPrefix);
				
				if (!XToolCheckerThreads.IsRunningOnDoc(btnName, doc, tabID, url))
				{
					var threadIndex = XToolCheckerThreads.GetNewThreadIndex();
					if (threadIndex != -1)
					{
						/*var resultButtons = [];
						for(var i = 0; i < buttons.length; i++)
						{
							if ((buttons[i].type == 'button') && (buttons[i].name.indexOf(btnPrefix) != -1))
							{
								if (XToolChecker.isVisible(buttons[i]))
								{
									resultButtons.push(buttons[i]);
								}
							}
						}*/
						if (infos.length > 0)
						{
							XTBrowserTools.SetElementDisabled(this._pauseButtonName, false);
							XTBrowserTools.SetElementTooltip(this._pauseButtonName, "Пауза");
							XTBrowserTools.SetElementImage(this._pauseButtonName, "pause.png");
							XTBrowserTools.SetElementHidden(this._pauseButtonName, false);
							XTBrowserTools.SetElementHidden(this._stopButtonName, false);
							XToolCheckerThreads.InitMulticheckThread(threadIndex, infos, XToolChecker.GetButtonNameByPrefix(btnPrefix), doc, tabID, url);
							//XToolChecker.ButtonClicked(XToolCheckerThreads.GetCurrentButtonInfo(threadIndex), threadIndex);
							XToolChecker.ClickOrSkip(XToolCheckerThreads.GetCurrentButtonInfo(threadIndex), threadIndex);
						}
					}
				}
				else //if (XToolChecker.GetButtonNameByPrefix(btnPrefix).indexOf("G") == -1) // делим не для гугла
				{
					// разделяем, если можно
					var threadIndex = XToolCheckerThreads.GetNewThreadIndex();
					if (threadIndex != -1)
					{
						this._isSplitting = true;
						try
						{
							XToolChecker.PauseMulticheck(0);
							XToolCheckerThreads.SplitThread(XToolChecker.GetButtonNameByPrefix(btnPrefix), doc, tabID, threadIndex, url);
						}
						catch (e)
						{
							XToolChecker.ReportError ("Splitting: ", e);
						}
						if (this._pauseMulticheck) // продолжаем если надо
							XToolChecker.PauseMulticheck(0);
						this._isSplitting = false;
					}				
				}
			//}
		//}
	},
	
	CheckButtonsG : function(btnPrefix)
	{
		if (this._pauseMulticheck)
			return;
		var browser = getBrowser().getBrowserForTab(getBrowser().selectedTab);
		if (browser)
		{
			var doc = browser.contentDocument;
			if (doc)
			{
				this._currentQueryIndex = -1;
				var buttons = doc.getElementsByTagName("INPUT");
				var btnName = XToolChecker.GetButtonNameByPrefix(btnPrefix);
				if (!XToolCheckerThreads.IsRunningOnDocPrefix("G", doc))
				{
					var threadIndex = XToolCheckerThreads.GetNewThreadIndex();
					if (threadIndex != -1)
					{
						var resultButtons = [];
						for(var i = 0; i < buttons.length; i++)
						{
							if ((buttons[i].type == 'button') && (buttons[i].name.indexOf(btnPrefix) != -1))
							{
								if (XToolChecker.isVisible(buttons[i]))
								{
									resultButtons.push(buttons[i]);
								}
							}
						}
						if (resultButtons.length > 0)
						{
							XTBrowserTools.SetElementDisabled(this._pauseButtonName, false);
							XTBrowserTools.SetElementTooltip(this._pauseButtonName, "Пауза");
							XTBrowserTools.SetElementImage(this._pauseButtonName, "pause.png");
							XTBrowserTools.SetElementHidden(this._pauseButtonName, false);
							XTBrowserTools.SetElementHidden(this._stopButtonName, false);
							XToolCheckerThreads.InitMulticheckThread(threadIndex, resultButtons, XToolChecker.GetButtonNameByPrefix(btnPrefix));
							//XToolChecker.ButtonClicked(XToolCheckerThreads.GetCurrentButtonInfo(threadIndex), threadIndex);
							XToolChecker.ClickOrSkip(XToolCheckerThreads.GetCurrentButtonInfo(threadIndex), threadIndex);
						}
					}
				}
			}
		}
	
	},
	
	GetButtonNameByBtnID : function(id)
	{
		var cn = XToolCheckerConst;
		if (id.indexOf(cn._buttonXTDPrefix) == 0) 
			return "XTD";
		if (id.indexOf(cn._buttonPrefix) == 0) 
			return "XT";
		if (id.indexOf(cn._buttonYapPrefix) == 0) 
			return "YP";		
		if (id.indexOf(cn._buttonYalPrefix) == 0) 
			return "YL";
		if (id.indexOf(cn._buttonYCPrefix) == 0) 
			return "YC";			
		if (id.indexOf(cn._buttonBCPrefix) == 0) 
			return "BC";	
		if (id.indexOf(cn._buttonPRPrefix) == 0) 
			return "PR";				
		if (id.indexOf(cn._buttonARPrefix) == 0) 
			return "AR";
		if (id.indexOf(cn._buttonLVLPrefix) == 0) 
			return "LVL";						
		if (id.indexOf(cn._buttonPOSPrefix) == 0) 
			return "POS";		
		if (id.indexOf(cn._buttonTrfPrefix) == 0) 
			return "Trf";				
		if (id.indexOf(cn._buttonGPPrefix) == 0) 
			return "GP";	
		if (id.indexOf(cn._buttonGCPrefix) == 0) 
			return "GC";	
		if (id.indexOf(cn._buttonGLPrefix) == 0) 
			return "GL";	
		if (id.indexOf(cn._buttonINYPrefix) == 0) 
			return "inY";	
		if (id.indexOf(cn._buttonINGPrefix) == 0) 
			return "inG";
		if (id.indexOf(cn._buttonGBLPrefix) == 0) 
			return "GBL";		
	},
	
	GetButtonNameByPrefix : function(prefix)
	{
		var cn = XToolCheckerConst;
		if (prefix == cn._buttonXTDPrefix)
			return "XTD";
		if (prefix == cn._buttonPrefix)
			return "XT";
		if (prefix == cn._buttonYapPrefix)
			return "YP";		
		if (prefix == cn._buttonYCPrefix)
			return "YC";		
		if (prefix == cn._buttonYalPrefix)
			return "YL";				
		if (prefix == cn._buttonBCPrefix)
			return "BC";	
		if (prefix == cn._buttonPRPrefix)
			return "PR";				
		if (prefix == cn._buttonARPrefix)
			return "AR";
		if (prefix == cn._buttonLVLPrefix)
			return "LVL";						
		if (prefix == cn._buttonPOSPrefix)
			return "POS";		
		if (prefix == cn._buttonTrfPrefix)
			return "Trf";				
		if (prefix == cn._buttonGPPrefix)
			return "GP";	
		if (prefix == cn._buttonGCPrefix)
			return "GC";	
		if (prefix == cn._buttonGLPrefix)
			return "GL";	
		if (prefix == cn._buttonINYPrefix)
			return "inY";	
		if (prefix == cn._buttonINGPrefix)
			return "inG";	
		if (prefix == cn._buttonGBLPrefix)
			return "GBL";		
	},

	isVisible : function(obj)
	{
	try
	{
		var parent = obj.parentNode;
		var tmpObj = obj;
		while (tmpObj.nodeType == 1)
		{
			if (tmpObj.style.display == "none")
			{
				return false;
			}
			tmpObj = parent;
			parent = tmpObj.parentNode;
		}
		
		return true;
	}
	catch(e)
	{
		XToolChecker.ReportError("isVisible: ", e);
	}
		
	},

	RequestXToolValue2 : function(checker, url, title, threadIndex)
	{
		XToolChecker.RequestXToolValue(url, title, threadIndex);
	},
	
	RequestXToolValue : function(url, title, threadIndex)
	{
		var sts = XTSettings;
		var cn = XToolCheckerConst;
		var docUrl = XToolCheckerThreads.GetThread(threadIndex)._url;
		var btn = XToolCheckerThreads.GetThread(threadIndex)._clickedButton;
		XToolChecker.updateStage(XToolCheckerThreads.GetThread(threadIndex)._current, XToolCheckerThreads.GetThread(threadIndex)._total, false);
		XToolCheckerThreads.GetThread(threadIndex)._lastRequestedUrl = url;
		var req = new XMLHttpRequest();		
		var actionStr = XToolChecker.GetAction(btn, url, title, threadIndex);
		XToolChecker.DebugMsg("Запрос: " + actionStr);
		
		if (actionStr == "")
		{
			// что то не так
			XToolCheckerThreads.SetCurrentButton(threadIndex, "ER", "", "", "error");
			XToolCheckerThreads.ClearCurrentButton(threadIndex);
		
			if (!XToolCheckerThreads.GetThread(threadIndex)._multiCheck)
			{
				XToolChecker.updateStage(1, 1, true);
			}
			else
			{
				XToolChecker.GotoNextButton(threadIndex);
			}
			return;
		}
		
		else if (actionStr == "READY")
		{
			var text = XTChecker.Capcha._answer;
			XTChecker.Capcha._answer = "";
			XTChecker.Capcha._threadIndex = -1;
			XToolChecker.DebugMsg(text);
			XToolChecker.processResult(text, 200, "", threadIndex, url);
			return;
		}
		else if (actionStr == "WAIT")
		{
			if (XTChecker.Capcha._stopAll)
			{
				XToolCheckerThreads.ClearCurrentButton(threadIndex);
				XToolChecker.StopMulticheck();
				XTChecker.Capcha.ClearAll();
			}
			else
			{
				setTimeout(function() { XToolChecker.ButtonClicked2(btn, threadIndex); }, 1000);
				XToolCheckerThreads.GetThread(threadIndex)._clickedButton = 0;
			}
			return;
		}
		else if (actionStr == "SKIP")
		{
			XToolCheckerThreads.ClearCurrentButton(threadIndex);
			if (!XToolCheckerThreads.GetThread(threadIndex)._multiCheck)
			{
				XToolChecker.updateStage(1, 1, true);
			}
			else
			{
				XToolChecker.GotoNextButton(threadIndex);
			}
			return;
		}
		else if (actionStr == "NO")
		{
			// Не надо проверять
			XToolCheckerThreads.SetCurrentButton(threadIndex, "", "NO", "", "red");
			if (btn.name.indexOf(cn._buttonYalPrefix) == 0)
			{
				XToolCheckerThreads.SetCurrentButton(threadIndex, "", "", "Cсылка не проиндексирована", "");
			}
			else
			{
				XToolCheckerThreads.SetCurrentButton(threadIndex, "", "", "Cтраница не в индексе", "");
				
			}
			
			if (sts._use_auto_select_yap)
			{
				if (btn.name.indexOf(cn._buttonYapPrefix) == 0)
				{
					XToolChecker.CheckIfRequired(docUrl, threadIndex, btn);
				}
			}
			if (sts._expireYal)
			{
				if (btn.name.indexOf(cn._buttonYalPrefix) == 0)
				{
					XToolChecker.CheckIfRequired(docUrl, threadIndex, btn);
				}
			}
			XToolCheckerThreads.ClearCurrentButton(threadIndex);
		
			if (!XToolCheckerThreads.GetThread(threadIndex)._multiCheck)
			{
				XToolChecker.updateStage(1, 1, true);
			}
			else
			{
				XToolChecker.GotoNextButton(threadIndex);
			}
			return;
		}
		else if ((btn.name.indexOf(cn._buttonPrefix) == 0) || (btn.name.indexOf(cn._mainButtonPrefix) == 0))
		{
			XToolChecker.SendXToolQuery(threadIndex, 'trust', url);
			return;
		} else if (btn.name.indexOf(cn._buttonTrfPrefix) == 0)
		{
			XToolChecker.SendXToolQuery(threadIndex, 'trf', url);
			return;
		}
		else if ((actionStr.indexOf(cn._xtoolAPI) != -1) && (
			btn.name.indexOf(cn._buttonYapPrefix) == 0 ||
			btn.name.indexOf(cn._buttonYalPrefix) == 0 ||
			btn.name.indexOf(cn._buttonYCPrefix) == 0 ||
			btn.name.indexOf(cn._buttonINYPrefix) == 0 ||
			btn.name.indexOf(cn._buttonRPrefix) == 0 ||
			btn.name.indexOf(cn._buttonRLVPrefix) == 0 
		))
		{
			XToolChecker.SendXToolXmlQuery(threadIndex, actionStr.replace(cn._xtoolAPI + '|', ''));
			return;
			
		}
		else if ((actionStr.indexOf(cn._xtoolAPI) != -1) && (
			btn.name.indexOf(cn._buttonGPPrefix) == 0 ||
			btn.name.indexOf(cn._buttonGLPrefix) == 0 ||
			btn.name.indexOf(cn._buttonGCPrefix) == 0 ||
			btn.name.indexOf(cn._buttonINGPrefix) == 0 
		))
		{
			XToolChecker.SendXToolXmlQuery(threadIndex, actionStr.replace(cn._xtoolAPI + '|', ''), true);
			return;
			
		}

		XToolCheckerThreads.GetThread(threadIndex)._action = actionStr;
		req.open('GET', actionStr.trim(), true);  
//*//		if ((btn.name.indexOf(cn._buttonLVLPrefix) == 0) && (XToolCheckerThreads.GetThread(threadIndex)._queryStage == 0))
//*//			req.channel.QueryInterface(Components.interfaces.nsIHttpChannel).redirectionLimit = 0;
		req.onreadystatechange = XToolChecker.response;
		
		XToolCheckerThreads.GetThread(threadIndex)._xmlHttpObj = req;
		var d = new Date();
		var startTime = d.getTime();
		XToolCheckerThreads.GetThread(threadIndex)._startTime = startTime;
		if ((btn.name.indexOf(cn._buttonLVLPrefix) != -1) ||
			((btn.name.indexOf(cn._buttonPOSPrefix) != -1) && sts._pos_use_yandex_useragent))
		{
			//req.setRequestHeader('User-Agent', 'Yandex/1.01.001 (compatible; Win16; I)');
			req.setRequestHeader('User-Agent', 'Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)');
		}
		if (actionStr.toLowerCase().indexOf("google.com/uds/gwebsearch" != -1))
		{
//			req.setRequestHeader('Referer', docUrl.toLowerCase());
		}
		var currentQueryType = XToolCheckerThreads.GetThread(threadIndex)._currentQueryType;
		if ((currentQueryType == 3) && 
			((btn.name.indexOf(cn._buttonYalPrefix) != -1) ||
			(btn.name.indexOf(cn._buttonYapPrefix) != -1) ||
			(btn.name.indexOf(cn._buttonINYPrefix) != -1)))
		{
			req.overrideMimeType('text/html; charset=utf-8');
		}
		if (btn.name.indexOf(cn._buttonBCPrefix) != -1)
		{
			if (this._bcEncoding == "")
			{
				req.overrideMimeType('text/html; charset=windows-1251');  
			}
			else
			{
				req.overrideMimeType('text/html; charset=' + this._bcEncoding);  
			}
		}
		req.send(null);  

		setTimeout(function() { XToolChecker.OnTimeout(this, req, startTime); }, sts._timeout * 1000);
	},
	

	SendXToolXmlQuery: function (threadIndex, url, isGoogle) {
		var sts = XTSettings;
		var cn = XToolCheckerConst;
		var req = new XMLHttpRequest();	
		XToolChecker.DebugMsg(XToolChecker._loggedIn);
		if (!XToolChecker._loggedIn)
		{
			XToolCheckerThreads.SetCurrentButton(threadIndex, "ER", "", "Не выполнен вход в систему", "error");
			XToolCheckerThreads.ClearCurrentButton(threadIndex);
		
			if (!XToolCheckerThreads.GetThread(threadIndex)._multiCheck)
			{
				XToolChecker.updateStage(1, 1, true);
			}
			else
			{
				XToolChecker.GotoNextButton(threadIndex);
			}
			return;
		}
		req.open('PUT', cn._xtoolAPI, true); 
		var tmpObj = {};
		tmpObj.type='yxml';//'trust';
		tmpObj.referrer=1;
		tmpObj.login=sts._loginValue;
		tmpObj.pass=sts._passwordValue;//Hash;
		tmpObj.xml_i= isGoogle ? 2 : 0;
		tmpObj.query=encodeURIComponent(url);

		var params = JSON.stringify(tmpObj);
		XToolChecker.DebugMsg("params: " + params);

		req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		req.onreadystatechange = XToolChecker.response;
		XToolCheckerThreads.GetThread(threadIndex)._action = cn._xtoolAPI;
		req.onreadystatechange = XToolChecker.response;
		
		XToolCheckerThreads.GetThread(threadIndex)._xmlHttpObj = req;
		var d = new Date();
		var startTime = d.getTime();
		XToolCheckerThreads.GetThread(threadIndex)._startTime = startTime;
	
	
		req.send(params);
		setTimeout(function() { XToolChecker.OnTimeout(this, req, startTime); }, sts._timeout * 1000);
	},

	SendXToolQuery: function (threadIndex,queryType,url) {
		var sts = XTSettings;
		var cn = XToolCheckerConst;
		var req = new XMLHttpRequest();	
		XToolChecker.DebugMsg(XToolChecker._loggedIn);
		if (!XToolChecker._loggedIn)
		{
			XToolCheckerThreads.SetCurrentButton(threadIndex, "ER", "", "Не выполнен вход в систему", "error");
			XToolCheckerThreads.ClearCurrentButton(threadIndex);
		
			if (!XToolCheckerThreads.GetThread(threadIndex)._multiCheck)
			{
				XToolChecker.updateStage(1, 1, true);
			}
			else
			{
				XToolChecker.GotoNextButton(threadIndex);
			}
			return;
		}
		req.open('PUT', cn._xtoolAPI, true); 
		var tmpObj = {};
		tmpObj.type=queryType;//'trust';
		tmpObj.referrer=1;
		tmpObj.login=sts._loginValue;
		tmpObj.pass=sts._passwordValue;//Hash;
		tmpObj.url=url;

		var params = JSON.stringify(tmpObj);
		XToolChecker.DebugMsg("params: " + params);

		req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		req.onreadystatechange = XToolChecker.response;
		XToolCheckerThreads.GetThread(threadIndex)._action = cn._xtoolAPI;
		req.onreadystatechange = XToolChecker.response;
		
		XToolCheckerThreads.GetThread(threadIndex)._xmlHttpObj = req;
		var d = new Date();
		var startTime = d.getTime();
		XToolCheckerThreads.GetThread(threadIndex)._startTime = startTime;
	
	
		req.send(params);
		setTimeout(function() { XToolChecker.OnTimeout(this, req, startTime); }, sts._timeout * 1000);
	},




	IsRusUrl : function (url)
	{
		if (!url.match(/^[A-Za-z0-9_]/i))
			return true;
		if (url.indexOf("xn--") == 0)
			return true;
		return false;
	},
	
	OnTimeout : function(checker, request, startTime)
	{
		var sts = XTSettings;
		var cn = XToolCheckerConst;
		var threadIndex = XToolCheckerThreads.GetThreadIndex(request, startTime);
		if (threadIndex != -1)
		{
			// отваливаемся по таймауту
			XToolCheckerThreads.SetCurrentButton(threadIndex, "", "", "Проверка прервана по таймауту", "skipped");
			var btn = XToolCheckerThreads.GetThread(threadIndex)._clickedButton;
			if ((btn.name.indexOf(cn._buttonBCPrefix) != -1) && (sts._use_auto_select_bc_error))
			{
				XToolChecker.SetCheckForButton(threadIndex, btn);
			}
			XToolChecker.DebugMsg("Timeout");
			XToolCheckerThreads.ClearCurrentButton(threadIndex);
		
			if (!XToolCheckerThreads.GetThread(threadIndex)._multiCheck)
			{
				XToolChecker.updateStage(1, 1, true);
			}
			else
			{
				XToolChecker.GotoNextButton(threadIndex);
			}
			return;
		}
	},
	
	SmartReplace : function (result, furl, url, encode, domain, title, encodeRus)
	{
		result = result.replace(/\#/g, domain);
		result = result.replace(/\$domain/g, domain);
		
		if ((result.indexOf("$furl") != -1) || (result.indexOf("$_furl") != -1))
		{
			var wwwFirst = false;
			if (furl)
			{
				if (furl.indexOf("://www.") != -1)
				{
					wwwFirst = true;
				}
			}
		
			var tmpurl = XToolChecker.PrepareLink(furl, true, true);
			if (wwwFirst)
			{
				var toInsert = "www."+tmpurl;
				var toInsert_ = tmpurl;
				
				if (encode) toInsert = encodeURIComponent(toInsert);
				if (encode) toInsert_ = encodeURIComponent(toInsert_);
				result = result.replace(/\$furl/g, toInsert);
				result = result.replace(/\$_furl/g, toInsert_);
			}
			else
			{
				var toInsert = tmpurl;
				var toInsert_ = "www."+ tmpurl;				
				if (encode) toInsert = encodeURIComponent(toInsert);
				if (encode) toInsert_ = encodeURIComponent(toInsert_);
				result = result.replace(/\$furl/g, toInsert);
				result = result.replace(/\$_furl/g, toInsert_);
			}
		}
		if (result.indexOf("$url") != -1)
		{	
			var toInsert = url;
			if (encode) toInsert = encodeURIComponent(toInsert);
			result = result.replace(/\$url/g, toInsert);
		}
		if (result.indexOf("$text") != -1)
		{
			result = result.replace(/\$text/g, title);
		}
		return result;
	},
	
	GetAction : function(btn, url, title, threadIndex)
	{
		var sts = XTSettings;
		var cn = XToolCheckerConst;
		url = url.replace(/\%27/g, "'");
		url = url.replace(/\&amp;/g, "&");
		this._yalMethod = 1;
		var domain = XToolChecker.GetDomainName(url);
		if ((btn.name.indexOf(cn._buttonPrefix) != -1) || (btn.name == cn._mainButtonPrefix))
		{
			if ((sts._use_auto_select_cache) && (btn.alt == "cached_value") &&
			(XToolCheckerThreads.GetThread(threadIndex)._multiCheck))
			{
				XToolChecker.LoadFromCache(url, btn, true);
				return "SKIP";
			}				
			else
			{
				btn.alt = "";
				return cn._xtoolAPI;
			}
		}
		// Для _mainButton нельзя !!!! Поэтому после.
		var furl = XToolChecker.GetFullUrl(btn);
		XToolChecker.DebugMsg("furl=" + furl);
		if (btn.name.indexOf(cn._buttonTrfPrefix) != -1)
		{
			btn.alt = "";
			return cn._xtoolAPI;
		} 
	    else if (btn.name.indexOf(cn._buttonSQIPrefix) != -1)
		{
			if (XTChecker.Capcha._recognizing)
				return "WAIT";
			return "https://webmaster.yandex.ru/sqi/?host=" +encodeURIComponent(domain);
	
		}
		else if (btn.name.indexOf(cn._buttonPRPrefix) != -1)
		{
			var stage = XToolCheckerThreads.GetThread(threadIndex)._queryStage;
			var furl2 = XToolChecker.EncodeRusUrl2(furl);
			if ((stage == 0) || (!sts._check_pr_domain))
				return XTChecker.PR.getAction(furl2);
			else
				return XTChecker.PR.getAction(XToolChecker.GetDomainFromUrl(furl2));
		}
		else if (btn.name.indexOf(cn._buttonINGPrefix) != -1)
		{
			if (XTChecker.Capcha._recognizing)
				return "WAIT";
			if (sts._ing_type != 0)
				if (XToolCheckerThreads.GetThread(threadIndex)._queryStage  == 0)
					XToolCheckerThreads.GetThread(threadIndex)._queryStage = 1;
			var stage = XToolCheckerThreads.GetThread(threadIndex)._queryStage;			
			
			var result = "";
			domain = XToolChecker.DomainToLower(domain);
			var action = "";
			if (stage == 1)
			{
				var param = sts._custom_ing1 ? sts._template_ing1 :sts._ing1Params;
				var results = param.split("[]");
				var isSecond = (btn.previousSibling.step == "2");
				if (results.length < 2) btn.previousSibling.step = "2";
				if ((results.length > 1) && (isSecond)) 
				{
					result = XToolChecker.SmartReplace(results[1], furl, url, false, domain);
				}
				else
				{
					result = XToolChecker.SmartReplace(results[0], furl, url, false, domain);
				}
				action = action = cn._xtoolAPI + '|' ;//XToolChecker.GetCurrentAction(sts._ing1QueryTypes, threadIndex);
			}
			else
			{
				var param = sts._custom_ing ? sts._template_ing :sts._ingParams;
				var results = param.split("[]");
				var isSecond = (btn.previousSibling.step == "2");
				if (results.length < 2) btn.previousSibling.step = "2";
				if ((results.length > 1) && (isSecond)) 
				{
					result = XToolChecker.SmartReplace(results[1], furl, url, false, domain);
				}
				else
				{
					result = XToolChecker.SmartReplace(results[0], furl, url, false, domain);
				}
				action = action = cn._xtoolAPI + '|' ;//XToolChecker.GetCurrentAction(sts._ingQueryTypes, threadIndex);
			}
			
			result = XToolChecker.ReplaceBadSymbols(result);
			result = action + result;	
			return result;
		}
		else if (btn.name.indexOf(cn._buttonINYPrefix) != -1)
		{
			if (XTChecker.Capcha._recognizing)
				return "WAIT";
			var param = sts._custom_iny ? sts._template_iny : sts._inyParams;
			var results = param.split("[]");
			var isSecond = (btn.previousSibling.step == "2");
			if (results.length < 2) btn.previousSibling.step = "2";
			var result = "";
			if ((results.length > 1) && (isSecond)) 
			{
				result = XToolChecker.SmartReplace(results[1], furl, url, false, domain);
			}
			else
			{
				result = XToolChecker.SmartReplace(results[0], furl, url, false, domain);
			}
			var action = "";
			///if (sts._query_yp_yl == 2)
			{
				XToolCheckerThreads.GetThread(threadIndex)._currentQueryType = sts._query_yp_yl;
				action = cn._xtoolAPI + '|' ;
			}
			/*else if (XToolCheckerThreads.GetThread(threadIndex)._queryStage == 0)
			{
				action = XToolChecker.GetCurrentAction(sts._inyQueryTypes, threadIndex);
			}
			else
			{
				XToolCheckerThreads.GetThread(threadIndex)._currentQueryIndex--;
				action = XToolChecker.GetCurrentAction(sts._inyQueryTypes2, threadIndex);
			}*/
			result = XToolChecker.ReplaceBadSymbols(result);
			result = action + result;	
			return result;
		}
		else if (//(btn.name.indexOf(cn._buttonYCPrefix) != -1) ||
				((btn.name.indexOf(cn._buttonYalPrefix) == 0) && (sts._check_yl_with_yc) && (sts._query_yp_yl == 6) ))
		{
			if (XTChecker.Capcha._recognizing)
				return "WAIT";
			var stage = XToolCheckerThreads.GetThread(threadIndex)._queryStage;

			if (stage == 1) 
			{
				console.log("stage=" + stage);
				var cache = btn.placeholder;//btn.previousSibling.alt;
				console.log("placeholder=" + btn.placeholder);
				cache = cache.replace(/\%27/g, "'");
				cache = cache.replace(/\&amp;/g, "&");
				return cache;
			}
			else
			{
				//return "http://yandex.ru/yandsearch?text=" + XToolChecker.ReplaceBadSymbols(url);
				if (XTChecker.Capcha._recognizing)
					return "WAIT";
				var result =  sts._custom_yp ? sts._template_yp : sts._yapParams;
				var param = result.split("[]");
				btn.previousSibling.step = "2";
				result = XToolChecker.SmartReplace(param[0], furl, url, false, domain);
				var action = "";
				XToolChecker.ReplaceBadSymbols(result)

				
				{
					var tmpArr = [];
					tmpArr.push("6");
					action = XToolChecker.GetCurrentAction(tmpArr, threadIndex);
				}
				result = XToolChecker.ReplaceBadSymbols(result);
				result = action + result;	
				return result;
			}
		}
		else if (btn.name.indexOf(cn._buttonRLVPrefix) != -1)
		{
			if (XTChecker.Capcha._recognizing)
				return "WAIT";
			var result = sts._rlvParams;//.replace(/\#/g, url);
			result = XToolChecker.SmartReplace(result, furl, url, false, domain);
			if (result.indexOf("$keywords") != -1)
			{
				var kw = "";
				for (var j =0; j < sts._keywordsList.length; j++ )
				{
					if (kw.length != 0)
						kw +=  " "+String.fromCharCode(124)+" " + sts._keywordsList[j];
					else
						kw =   sts._keywordsList[j];
				}
				XToolChecker.DebugMsg(kw);
				result = result.replace("$keywords", kw);
			}
			var action = "";
			///if (sts._query_yp_yl == 2)
			{
				XToolCheckerThreads.GetThread(threadIndex)._currentQueryType = sts._query_yp_yl;
				action = cn._xtoolAPI + '|' ;
			} /*else if (XToolCheckerThreads.GetThread(threadIndex)._queryStage == 0)	{
				action = XToolChecker.GetCurrentAction(sts._rlvQueryTypes, threadIndex);
			}
			else
			{
				XToolCheckerThreads.GetThread(threadIndex)._currentQueryIndex--;
				action = XToolChecker.GetCurrentAction(sts._rlvQueryTypes2, threadIndex);
			}*/
			result = XToolChecker.ReplaceBadSymbols(result);
			result = action + result;	
			return result;
		}
		else if (btn.name.indexOf(cn._buttonRPrefix) != -1)
		{
			if (XTChecker.Capcha._recognizing)
				return "WAIT";
			
			var result = "";
			var results = sts._rParams.split("[]");
			
			var action = "";
			{
				if (XToolCheckerThreads.GetThread(threadIndex)._queryStage == 0)
				{
					result = XToolChecker.SmartReplace(results[0], furl, url, false, domain);
					///if (sts._query_yp_yl == 2)
					{
						XToolCheckerThreads.GetThread(threadIndex)._currentQueryType = sts._query_yp_yl;
						action = cn._xtoolAPI + '|' ;
					} /*else {
						action = XToolChecker.GetCurrentAction(sts._rQueryTypes, threadIndex);
					}*/
				}
				else
				{
					result = XToolChecker.SmartReplace((results.length > 1) ? results[1] :  results[0], furl, url, false, domain);
					///if (sts._query_yp_yl == 2)
					{
						XToolCheckerThreads.GetThread(threadIndex)._currentQueryType = sts._query_yp_yl;
						action = cn._xtoolAPI + '|' ;
					} /*else {
						action = XToolChecker.GetCurrentAction(sts._rQueryTypes, threadIndex);
					}*/
				}
			}
			var currentQueryType = XToolCheckerThreads.GetThread(threadIndex)._currentQueryType;
			if ((currentQueryType != 1) || (!XToolChecker.ParamsIsTooLong(result)))
			{
				result = XToolChecker.ReplaceBadSymbols(result);
				result = action + result;	
				// заменяем/вставляем регион
				var res = result.match(/[\?\&]rstr\=\-[0-9]+/i);
				if ((res) && (res.length > 1))
				{
					result = result.replace(/([\?\&]rstr\=\-)[0-9]+/ig, "$1" + sts._region_id);
				}
				else
					result = result + "&rstr=-" + sts._region_id;
				return result;
			} 
			else
			{
				return "";
			}
		}
		else if ((btn.name.indexOf(cn._buttonYapPrefix) != -1) || (btn.name.indexOf(cn._buttonYCPrefix) != -1))
		{
			if (XTChecker.Capcha._recognizing)
				return "WAIT";
			if ((btn.name.indexOf(cn._buttonYapPrefix) != -1) && (sts._use_auto_select_cache_y) && (btn.alt == "cached_value") &&
			(XToolCheckerThreads.GetThread(threadIndex)._multiCheck))
			{
				XToolChecker.LoadFromCacheYP(url, btn, true);
				return "SKIP";
			}				
			else
			{
				var result = "";
				var param = sts._custom_yp ? sts._template_yp :sts._yapParams;
				var results = param.split("[]");
				var isSecond = (btn.previousSibling.step == "2");
				if (results.length < 2) btn.previousSibling.step = "2";
				if ((results.length > 1) && (isSecond)) 
				{
					result = XToolChecker.SmartReplace(results[1], furl, url, false, domain);
				}
				else
				{
					result = XToolChecker.SmartReplace(results[0], furl, url, false, domain);
				}
				var action = "";
				///if (sts._query_yp_yl == 2)
				{
					XToolCheckerThreads.GetThread(threadIndex)._currentQueryType = 2;//sts._query_yp_yl;
				    return cn._xtoolAPI + '|' + result;
				}
				/*else
				{

					if (XToolCheckerThreads.GetThread(threadIndex)._queryStage == 0)
					{
						action = XToolChecker.GetCurrentAction(sts._yapQueryTypes, threadIndex);
					}
					else
					{
						XToolCheckerThreads.GetThread(threadIndex)._currentQueryIndex--;
						action = XToolChecker.GetCurrentAction(sts._yapQueryTypes2, threadIndex);
					}
				}
				console.log("action=" + action);
				console.log("result=" + result);
				var currentQueryType = XToolCheckerThreads.GetThread(threadIndex)._currentQueryType;
				if ((currentQueryType != 1) || (!XToolChecker.ParamsIsTooLong(result)))
				{
					result = XToolChecker.ReplaceBadSymbols(result);
					result = action + result;	
					return result;
				} 
				else
				{
					return "";
				}*/
			}
		}
		else if (btn.name.indexOf(cn._buttonYalPrefix) != -1)
		{
			if (XTChecker.Capcha._recognizing)
				return "WAIT";
			if ((sts._use_auto_select_cache_y) && (btn.alt == "cached_value") &&
			(XToolCheckerThreads.GetThread(threadIndex)._multiCheck))
			{
				XToolChecker.LoadFromCacheYL(url, title, btn, true);
				return "SKIP";
			}				
			else
			{
				var param =  sts._custom_yl ? sts._template_yl : sts._yalParams;
				var results = param.split("[]");
				{
					var domain = XToolChecker.GetDomainName(url);
					var result = results[0];
					//result = result.replace(/\#/g, url);
					var titleText = XToolChecker.PrepareTitle(title, threadIndex);
					result = XToolChecker.SmartReplace(result, furl, url, false, domain, titleText);

					//result = result.replace("$text", );
					var action = "";
					if (sts._yap_yal_yandex_only)
					{
						var tmpArr = [];
						tmpArr.push("2");
						action = XToolChecker.GetCurrentAction(tmpArr, threadIndex);
					}
					else
					{				
						///if (sts._query_yp_yl == 2)
						{
							XToolCheckerThreads.GetThread(threadIndex)._currentQueryType = sts._query_yp_yl;
							action = cn._xtoolAPI + '|' ;
						} /*else if (XToolCheckerThreads.GetThread(threadIndex)._queryStage == 0)
						{
							action = XToolChecker.GetCurrentAction(sts._yalQueryTypes, threadIndex);
						}
						else
						{
							XToolCheckerThreads.GetThread(threadIndex)._currentQueryIndex--;
							action = XToolChecker.GetCurrentAction(sts._yalQueryTypes2, threadIndex);
						}*/
					}
					
					var currentQueryType = XToolCheckerThreads.GetThread(threadIndex)._currentQueryType;
					if ((currentQueryType != 1) || (!XToolChecker.ParamsIsTooLong(result)))
					{
						// < 200 или другой ресурс
						result = XToolChecker.ReplaceBadSymbols(result);
						result = action + result;
						sts._yalMethod = 1;
						return result;
					}
					else
					{
						// > 200 начинаем исправлять.
						var yapRes = XToolChecker.GetYapResult(btn, threadIndex);
						var result2 = results[1];
						if (yapRes == "NO")
						{
							// проверен - результат NO
							return "NO";
						}
						else if ((yapRes == "") || (yapRes == "ER"))
						{
							// непроверен или не нашли
							// берем оригинальный url
							
							if (furl)
							{
								furl = XToolChecker.PrepareLink2(furl);
								
								/*var result2 = result2.replace(/\$furl/g, furl);
								result2 = result2.replace("$text", XToolChecker.PrepareTitle(title, threadIndex));*/
								result2 = XToolChecker.SmartReplace(result2, furl, url, false, domain, XToolChecker.PrepareTitle(title, threadIndex));
								if (!XToolChecker.ParamsIsTooLong(result2))
								{
									sts._yalMethod = 2;
									result2 = XToolChecker.ReplaceBadSymbols(result2);
									result2 = action + result2;
									return result2;
								}
								else
								{
									return "";
								}
							}
						}
						else
						{
							// результат есть и не пустой (YES)
							sts._yalMethod = 1;
							if (yapRes)
							{
								yapRes = XToolChecker.PrepareLink2(yapRes);
								/*var result2 = result2.replace(/\$furl/g, yapRes);
								result2 = result2.replace("$text", XToolChecker.PrepareTitle(title, threadIndex));*/
								result2 = XToolChecker.SmartReplace(result2, yapRes, url, false, domain, XToolChecker.PrepareTitle(title, threadIndex));
								if (!XToolChecker.ParamsIsTooLong(result2))
								{
									result2 = XToolChecker.ReplaceBadSymbols(result2);								
									result2 = action + result2;
									return result2;
								}
								else
								{
									return "";
								}
							}
							
						}
						
						return "";
					}
				}
			}
		}
		else if ((btn.name.indexOf(cn._buttonBCPrefix) != -1) || (btn.name.indexOf(cn._buttonLVLPrefix) != -1))
		{
			var stage = XToolCheckerThreads.GetThread(threadIndex)._queryStage;
			return btn.previousSibling.alt;
		}
		else if (btn.name.indexOf(cn._buttonESPrefix) != -1)
		{
			return "http://xtool.ru/api/?xt_zipf&xt_ln=" + sts._esMinWords +"&xt_url=" + btn.previousSibling.value;
		}

		else if (btn.name.indexOf(cn._buttonPOSPrefix) != -1)
		{
			var dstUrl = btn.previousSibling.value;
			var alt = btn.previousSibling.alt;
			console.log("allt = " + alt);
			// увы, мы не знаем ссылку, которую надо искать
			if (alt == "")
				return "NO";
			if (alt.indexOf(".") != -1)
			{
				return dstUrl;
			}
			else
			{
				if (alt.indexOf("seopult") == 0)
				{
					// ищем в кэше
					var linkUrl = "";
					
					if (linkUrl == "")
					{
						var linkUrl = alt.replace("promopult", "");
						linkUrl = "http://promopult.ru/item.html?item_id=" + linkUrl;
						return linkUrl;
					}
					else
					{
						// если нашли в кэше - запоминаем и выполняем.
						btn.previousSibling.alt = linkUrl;
						return dstUrl;
					}
				}
				else
				{
					// ищем в кэше
					var linkUrl = "";
			
					if (linkUrl == "")
					{
						var actionStr = "https://www.sape.ru/links.php?link_id="+alt;
						return actionStr;
					}
					else
					{
						// если нашли в кэше - запоминаем и выполняем.
						btn.previousSibling.alt = linkUrl;
						return dstUrl;
					}
				}
			}
		}
		else if (btn.name.indexOf(cn._buttonGPPrefix) != -1)
		{
			if (XTChecker.Capcha._recognizing)
				return "WAIT";
			if ((sts._use_auto_select_cache_g) && (btn.alt == "cached_value") &&
			(XToolCheckerThreads.GetThread(threadIndex)._multiCheck))
			{
				XToolChecker.LoadFromCacheGP(url, btn, true);
				return "SKIP";
			}				
			else
			{
				var action = "";
				action = cn._xtoolAPI + '|' ;//XToolChecker.GetCurrentAction(sts._gpQueryTypes, threadIndex);
				XToolChecker.DebugMsg("action=" + action);
				var domain = XToolChecker.GetDomainName(url);
				var param = sts._custom_gp ? sts._template_gp : sts._gpParams;
				var result = param.split("[]");
				var isSecond = (btn.previousSibling.step == "2");
				var res = '';
				if (result.length < 2) btn.previousSibling.step = "2";
				if ((result.length > 1) && (isSecond)) 
				{
					res = XToolChecker.SmartReplace(result[1], furl, url, true, domain, XToolChecker.ReplaceBadSymbols(title), true);
				}
				else
				{
					res = XToolChecker.SmartReplace(result[0], furl, url, true, domain, XToolChecker.ReplaceBadSymbols(title), true);
				}
					XToolChecker.DebugMsg("res=" + res);
				//result = XToolChecker.ReplaceGParams(btn, url, title, result);
				//action = action.replace("http\:\/\/", "https\:\/\/");
				return action + res;
			}
		}
		else if (btn.name.indexOf(cn._buttonGCPrefix) != -1)
		{
			//var action = cn._xtoolAPI + '|' ;//XToolChecker.GetCurrentAction(sts._gcQueryTypes, threadIndex);
			var action = XToolChecker.GetCurrentAction(sts._gpQueryTypes, threadIndex);
			var result = sts._gcParams.split("[]");
			var isSecond = (btn.previousSibling.step == "2");

			url = XToolChecker.PrepareLink(furl, true, true);
			var res = '';
			if ((result.length > 1) && (isSecond)) 
			{
				res = XToolChecker.SmartReplace(result[1], furl, url, true, domain, XToolChecker.ReplaceBadSymbols(title), true);
			}
			else
			{
				res = XToolChecker.SmartReplace(result[0], furl, url, true, domain, XToolChecker.ReplaceBadSymbols(title), true);
			}
			if (result.length < 2) btn.previousSibling.step = "2";
			return action + res;
		}
		else if (btn.name.indexOf(cn._buttonGLPrefix) != -1)
		{
			if (XTChecker.Capcha._recognizing)
				return "WAIT";
			if ((sts._use_auto_select_cache_g) && (btn.alt == "cached_value") &&
			(XToolCheckerThreads.GetThread(threadIndex)._multiCheck))
			{
				XToolChecker.LoadFromCacheGL(url, title, btn, true);
				return "SKIP";
			}				
			else
			{
				var action = cn._xtoolAPI + '|' ;//XToolChecker.GetCurrentAction(sts._glQueryTypes, threadIndex);
				var domain = XToolChecker.GetDomainName(url);
				var param = sts._custom_gl ? sts._template_gl : sts._glParams;
				var result = param.split("[]");
				var isSecond = (btn.previousSibling.step == "2");
				var res = '';
				if (result.length < 2) btn.previousSibling.step = "2";
				XToolChecker.DebugMsg(title);
				var titleText = XToolChecker.GetTitleText( XToolChecker.ReplaceBadSymbols(title));
				if ((result.length > 1) && (isSecond))
				{
					res = XToolChecker.SmartReplace(result[1], furl, url, true, domain, titleText, true);
				}
				else
				{
					XToolChecker.DebugMsg(titleText);
					res = XToolChecker.SmartReplace(result[0], furl, url, true, domain, titleText, true);
				}
				return action + res;
			}
		}
		
	},
	
	ReplaceGParams : function (btn, url, title, result)
	{
		var isSecond = (btn.previousSibling.step == "2");
		var furl = XToolChecker.GetFullUrl(btn);
		if (furl)
		{
			furl = XToolChecker.PrepareLink2(furl, true);
			if ((isSecond) && (!XToolChecker.IsRusUrl(furl)))
			{
				if (furl.toLowerCase().indexOf("www.") == 0)
				{
					if ((furl.indexOf("www.") == 0) && (furl.lastIndexOf('.') > 5))
					{
						furl = furl.substring(4,furl.length - 1);
					}
				}
				else
				{
					furl = "www."+furl;
				}
			}
			result = XToolChecker.SmartReplace(result, furl, url, true, "", "", true);
			//result = result.replace(/\$url/g, encodeURIComponent(furl));
			
		}
		result = XToolChecker.SmartReplace(result, furl, url, true, "", "", true);
		/*result = result.replace(/\#/g, encodeURIComponent(url));*/
		//result = result.replace("$text", XToolChecker.GetTitleText(title));
		return result;
	},
	
	GetDomainName : function(href)
	{
		if (href.indexOf("http://") != -1) 
		{
			var result = href.substring(7,href.length - 1);
			
			if ((result.indexOf("www.") == 0) && (result.lastIndexOf('.') > 5))
			{
				result = result.substring(4,result.length - 1);
			}
			var endOfDomain = result.indexOf("/");
			if (endOfDomain == -1)
			{
				return result;
			}
			else
			{
				return result.substring(0, endOfDomain);
			}
		
		}
		else
		{
			var result = href;
			if ((result.indexOf("www.") == 0) && (result.lastIndexOf('.') > 5))
			{
				result = result.substring(4,result.length - 1);
			}
			var endOfDomain = result.indexOf("/");
			if (endOfDomain == -1)
			{
				return result;
			}
			else
			{
				return result.substring(0, endOfDomain);
			}
		}
	},
	
	ReplaceGParams : function (btn, url, title, result)
	{
		var isSecond = (btn.previousSibling.title == "2");
		var furl = XToolChecker.GetFullUrl(btn);
		if (furl)
		{
			furl = XToolChecker.PrepareLink2(furl);
			if ((isSecond) && (!XToolChecker.IsRusUrl(furl)))
			{
				if (furl.toLowerCase().indexOf("www.") == 0)
				{
					if ((furl.indexOf("www.") == 0) && (furl.lastIndexOf('.') > 5))
					{
						furl = furl.substring(4,furl.length - 1);
					}
				}
				else
				{
					furl = "www."+furl;
				}
			}
			
			result = result.replace(/\$url/g, encodeURIComponent(furl));
			
		}
		result = result.replace(/\#/g, encodeURIComponent(url));
		result = result.replace("$text", XToolChecker.GetTitleText(title));
		return result;
	},
	
	PrepareLink2 : function(href)
	{
		var result = href;
		
		if (result.toLowerCase().indexOf('http://') == 0)
		{
			result = result.substring(7);
		}
		if ((result[result.length-1] == '/') && (result.indexOf('/') == result.length-1))
		{
			result = result.substring(0, result.length - 1);
		}
		result = XToolChecker.DomainToLower(result);
		result = XToolChecker.DecodeRusUrl(result);
		return result;
	},	
	
	//**//
	GetTitleText : function (res)
	{
		//res = res.replace(/<[^>]*>/g, "");
		res = res.replace(/^\s+|\s+$/g, '');
		res = res.replace(/^\&nbsp\;|\&nbsp\;$/g, '');
		return XToolChecker.ExtPrepareTitle(res);
	},
	
	//**//
	PrepareLink : function(href, skipSlashCut, skipDecode)
	{
		var result = href;
		if ((!skipSlashCut) && (result[result.length-1] == '/'))
		{
			result = result.substring(0, result.length - 1);
		}
		if (result.toLowerCase().indexOf('http://') == 0)
		{
			result = result.substring(7);
		}
		if (result.toLowerCase().indexOf('https://') == 0)
		{
			result = result.substring(8);
		}
		if ((result.toLowerCase().indexOf('www.') == 0) && (result.lastIndexOf('.') > 5))
		{
			result = result.substring(4);
		}
		if (!skipDecode)
			result = XToolChecker.DecodeRusUrl(result);
		result = XToolChecker.DomainToLower(result);
		return result;
	},
	
	//**//
	ExtPrepareTitle : function(text)
	{
		text = text.replace(/^\s+|\s+$/g, '');
		text = text.replace(/^\&nbsp\;|\&nbsp\;$/g, '');
		text = text.replace(/<[\/]{0,1}a[^>]*>/g, " ");
		//text = text.replace(/\s<[\/]{0,1}a[^>]*>/g, " ");
		text = text.replace(/<[\/]{0,1}u>/g, " ");
	//	text = text.replace(/<[\/]{0,1}u>/g, " ");
		text = text.replace(/\s*<[^>]*>\s*/g, "###tag###");
		text = text.replace(/\s*&ndash;\s*/g, "###tag###");
		text = text.replace(/\s*&mdash;\s*/g, "###tag###");
		text = text.replace(/\s*\-\s*/g, "###tag###");
		text = text.replace(/\s*\—\s*/g, "###tag###");
		text = text.replace(/\s*\–\s*/g, "###tag###");
		text = text.trim();
		text = text.replace(/\.\s{0,1}([A-ZА-Я])/g, ".###tag###$1");
		text = text.replace(/\!\s{0,1}([A-ZА-Я])/g, "!###tag###$1");
		text = text.replace(/\?\s{0,1}([A-ZА-Я])/g, "?###tag###$1");
		text = text.replace(/\?\s{0,1}([A-ZА-Я])/g, "?###tag###$1");
		while (text.indexOf("###tag###") == 0)
		{
			text = text.substring(9);
			text = text.trim();
		}
		while (text.lastIndexOf("###tag###") == text.length - 9)
		{
			text = text.substring(0, text.length - 9);
			text = text.trim();
		}
		text = text.replace(/\#\#\#tag\#\#\#\#\#\#tag\#\#\#/g, "###tag###");
		text = text.replace(/\#\#\#tag\#\#\#\#\#\#tag\#\#\#/g, "###tag###");
		
		// избегаем неточностей.
		text = text.replace(/\#\#\#tag\#\#\#\./g, '.');
		text = text.replace(/\#\#\#tag\#\#\#\!/g, '!');
		text = text.replace(/\#\#\#tag\#\#\#\?/g, '?');
		
		text = text.replace(/\#\#\#tag\#\#\#/g, "\"\&\&\"");
		
		return text;
	},
	
	
	//**//
	DecodeRusUrl : function(href)
	{
	try {
			if (href.indexOf("xn--") == 0)
			{
				var parts = href.split("/");
				if (parts.length > 0)
				{
					parts[0] = punycode.ToUnicode(parts[0]);
					href = parts.join("/");
				}
			}
			var tmp = decodeURIComponent(href);
			if ((tmp) && (tmp.indexOf(" ") == -1) && (tmp.indexOf("'") == -1) && (tmp.indexOf("\"") == -1) &&
				(tmp.indexOf("“") == -1) && (tmp.indexOf("”") == -1))
				href = tmp;
		}
		catch(e)
		{
			console.log("DecodeRusUrl error: " + e);
		}
		
		return href;
	},
	
	//**//
	DomainToLower : function(href)
	{
		var index = href.indexOf('/');
		if (index != -1)
		{
			return href.substring(0, index).toLowerCase() + href.substring(index, href.length);
		}
		else 
			return href.toLowerCase();
	},
	
	GetFullUrl: function(btn)
	{
		var href = btn.previousSibling.alt;
		return href;
	},

	GetYapResult : function(btn, threadIndex)
	{
		var cn = XToolCheckerConst;
		if (btn.name.indexOf(cn._buttonYalPrefix) == 0)
		{
			try
			{
				var tmpObj = btn.parentNode;
				var inputs = tmpObj.getElementsByTagName("INPUT");
				var href = btn.previousSibling.value;
				for (var i = 0; i < inputs.length; i++)
				{
					if ((inputs[i].type == "button") && (inputs[i].name.indexOf(cn._buttonYapPrefix) == 0))
					{
						var href2 = inputs[i].previousSibling.value;
						if (href.toLowerCase() == href2.toLowerCase()) // кнопка нужная
						{

							var realUrl  = inputs[i].alt;
							
							if (inputs[i].value != "YP")
							{
								return "ER";
							}
							else if ((realUrl) && (realUrl.length > 0))
							{
								return realUrl;
							}
							else if (inputs[i].style.color == XToolCheckerThreads.GetColorByName("red", threadIndex))//this._redColor[this._colorScheme])
							{
								return "NO";
							}
							else
							{
								return "";
							}
								
						}
			
					}
				}
								
				
			}
			catch(e)
			{
			
			}
			
		
		}	
		return "";
	},
	
	PrepareTitle: function(text, threadIndex)
	{
		var currentQueryType = XToolCheckerThreads.GetThread(threadIndex)._currentQueryType;
		if (currentQueryType != 2)
			return text;
		var wordCount = 5;
		var result = "";
		var parts = text.split(" ");
		if (parts.length < wordCount)
		{
			return text;
		}
		else
		{
			var i = 0;
			var added = 0;
			while ((added < wordCount) && (i < parts.length))
			{
				//if ((parts[i].length > 2) || ((parts.length - i) <= (wordCount - added)))
				{
					if (result != "")
						result += " ";
					result += parts[i];
					if (parts[i].length > 2) 
						added++;
				}

				i++;
			}
			return result;
		}
	},
	
	ParamsIsTooLong : function(text)
	{
		
		return text.length > 200;
			
	},
	
	GetCurrentAction : function(queryTypes, threadIndex)
	{
		var sts = XTSettings;
		try
		{
			var currentQueryIndex = XToolCheckerThreads.GetThread(threadIndex)._currentQueryIndex;
			currentQueryIndex = currentQueryIndex + 1;
			while (currentQueryIndex > queryTypes.length - 1)
			{
				currentQueryIndex = currentQueryIndex - queryTypes.length;
			}
			var queryType = queryTypes[currentQueryIndex];
			XToolCheckerThreads.GetThread(threadIndex)._currentQueryType = queryType;
			XToolCheckerThreads.GetThread(threadIndex)._currentQueryIndex = currentQueryIndex;
			var query = sts._checkActionNames[queryType - 1];
			query = query.replace(/\\\//g, '\/');
			if (query.indexOf("xmlsearch.yandex.ru") != -1) 
			{
				if (sts._yandex_xml_url != "") 
				{
					return sts._yandex_xml_url;
				}
				else if ((sts._yandex_user != "") && (sts._yandex_key != ""))
				{
					query = query.replace("xmlsearch?", "xmlsearch?user=" + sts._yandex_user +"&key="+ sts._yandex_key + "&");
					return query;
				}
				else return query;
			}
			else
				return query;//sts._checkActionNames[queryType - 1];
		}
		catch(e)
		{
			XToolChecker.ReportError("GetCurrentAction: ", e);
		}
	},
	
	ReplaceBadSymbols : function(url)
	{
		return XTBrowserTools.ReplaceBadSymbols(url);
	},
	
	Decode : function(text, encoding)
	{
		return text;
	},
	 
	 
	OnGBLClicked : function (btn, threadIndex)
	{
		var domain =  XToolChecker.PrepareLink(btn.previousSibling.alt);
		
		XTBrowserTools.AddToGBLList(domain);
		XToolCheckerThreads.SetCurrentButton(threadIndex, "", "", "", "#777777");
	},



	ButtonClicked2 : function(btn, threadIndex)
	{
		if ((XTChecker.Capcha._stopAll) || (XToolChecker._stopWait))
		{
			XToolCheckerThreads.ClearCurrentButton(threadIndex);
			XToolChecker.StopMulticheck();
			XTChecker.Capcha.ClearAll();
			XToolChecker._stopWait = false;
			XToolChecker.updateStage(0, 0, false, false);;
			return;
		}
		XToolChecker.ButtonClicked(btn, threadIndex);
	},
	
	ButtonClicked : function(btn, threadIndex)
	{
	try{
		var sts = XTSettings;
		var cn = XToolCheckerConst;
		if (XToolCheckerThreads.GetThread(threadIndex)._clickedButton == 0)
		{
			XToolCheckerThreads.GetThread(threadIndex)._xmlHttpObj = 0;
			XToolCheckerThreads.GetThread(threadIndex)._clickedButton = btn;
			if (!btn.className) btn.className = "";
			btn.className = btn.className.replace(" XTCheckedButton", "");
			var href = "";
			var title = ""; 
			if (btn.name == cn._mainButtonPrefix)
			{
				href = btn.alt;
				title = "";
			}
			else if (btn.name.indexOf(cn._buttonGBLPrefix) == 0)
			{
				XToolChecker.OnGBLClicked(btn, threadIndex);
				XToolCheckerThreads.ClearCurrentButton(threadIndex);
				if (!XToolCheckerThreads.GetThread(threadIndex)._multiCheck)
				{
					XToolChecker.updateStage(1, 1, true);
				}
				else
				{
					XToolChecker.GotoNextButton(threadIndex);
				}
				return;
			}
			else if (btn.name.indexOf(cn._buttonBLPrefix) == 0)
			{
				XToolChecker.OnBLClicked(btn, threadIndex);
				XToolCheckerThreads.ClearCurrentButton(threadIndex);
				if (!XToolCheckerThreads.GetThread(threadIndex)._multiCheck)
				{
					XToolChecker.updateStage(1, 1, true);
				}
				else
				{
					XToolChecker.GotoNextButton(threadIndex);
				}
				return;
			}
			else
			{
				href = btn.previousSibling.value;
				title = btn.previousSibling.title;
			}

			var checkTimeout = false;
			var isGoogle = false;
			var isYandex = false;
			var isPR = false;
			var skip = true;
			var stage = XToolCheckerThreads.GetThread(threadIndex)._queryStage;
			if ((btn.name.indexOf(cn._buttonYapPrefix) != -1) || (btn.name.indexOf(cn._buttonYalPrefix) != -1))
			{
				isYandex = true;
			}
			else if ((btn.name.indexOf(cn._buttonGCPrefix) != -1) || (btn.name.indexOf(cn._buttonGPPrefix) != -1) || 
					(btn.name.indexOf(cn._buttonGLPrefix) != -1))
			{
				checkTimeout = true;
				isGoogle = true;
			}
			else if (btn.name.indexOf(cn._buttonPRPrefix) != -1)
			{
				isPR = true;
			}
			else if (btn.name.indexOf(cn._buttonINGPrefix) != -1)
			{
				skip = (stage != 0);
			}
			else if (btn.name.indexOf(cn._buttonPrefix) != -1)
			{
				if (href.indexOf("/") != -1)
				{
					btn.value = "XT";
				}
				else
				{
					btn.value = "XTD";
				}
			}
			
			if (!(isPR && (stage != 0) && (sts._check_pr_domain)))
			{
				if (!skip) 
				{
					//btn.style.backgroundColor = XToolCheckerThreads.GetColorByName("default", threadIndex);//this._defaultColor[this._colorScheme];
					//XToolChecker.SetBackgroundColor(btn, XToolCheckerThreads.GetColorByName("default", threadIndex));
					XToolCheckerThreads.SetCurrentButton(threadIndex, XToolChecker.GetButtonNameByBtnID(btn.name), "", "", "default");
					//btn.value = ;
				}
			}

			
			var waitTime = 0;
			if (isGoogle)
			{
				var d = new Date();
				var delta = d.getTime() - this._g_time;
				var deltaCPT = d.getTime() - this._cpt_time;
				if (delta < this._g_waitTime)
					waitTime = this._g_waitTime - delta;
				if (deltaCPT < sts._timeout_cpt*1000)
				{
					var waitTime2 = sts._timeout_cpt*1000 - deltaCPT;
					if (waitTime < waitTime2)
						waitTime = waitTime2;
				}
			}
			if (isPR)
			{
				var d = new Date();
				var delta = d.getTime() - this._pr_time;
				if (delta < this._pr_waitTime)
					waitTime = this._pr_waitTime - delta;	
			}
			if (isYandex)
			{
				var d = new Date();
				var delta = d.getTime() - this._y_time;
				if (delta < this._y_waitTime)
					waitTime = this._y_waitTime - delta;				
			}
			XToolChecker.DebugMsg("wt = " + waitTime);
			XToolChecker.DebugMsg(href);
			if (waitTime <= 0)
				XToolChecker.RequestXToolValue(href, title, threadIndex);
			else
			{
				XToolChecker.updateStage(
					XToolCheckerThreads.GetThread(threadIndex)._current, 
					XToolCheckerThreads.GetThread(threadIndex)._total, false, true);
				setTimeout(function() { XToolChecker.RequestXToolValue2(this, href, title, threadIndex); }, waitTime);
			}
		}
		else
		{
		
		}
	}
	catch(ex)
	{
		XToolChecker.ReportError("ButtonClicked: ", ex);
	
	}
	
	},

	response : function() 
	{
		if(this.readyState == 4) 
		{
			var threadIndex = XToolCheckerThreads.GetThreadIndex(this, 0);
			if (threadIndex != -1)
			{
				var location = this.getResponseHeader("Location");
				XToolChecker.processResult(this.responseText, this.status, this.responseXML, threadIndex, location);
			}
		}
	},

	StringIsNumber : function(value) 
	{
		var symbols = '0123456789.';
		for (var i = 0; i < value.length; i++)
		{
			if (symbols.indexOf(value[i]) == -1)
			{
				return false;
			}
		}
		return true;
	},

	
	stoppingMulticheck : function()
	{
		var stageLabelValue = XTBrowserTools.GetElementValue(this._stageLabelName);
		if (stageLabelValue && stageLabelValue.indexOf("Остановка...") == -1)
			XTBrowserTools.SetElementValue(this._stageLabelName, stageLabelValue + " Остановка...");
		return;
	},
	
	updateStage : function(current, total, reset, timeout)
	{
		var str = XToolCheckerThreads.GetStageLabel(timeout);
		var strShort = current + "/" + total;
		if ((total <= 1) && (current <= 1))
			strShort = "";
		chrome.browserAction.setBadgeText({text: strShort}); 
		XTBrowserTools.SetElementValue(this._stageLabelName, str);
	},


	processResult : function(response, status, responseXML, threadIndex, location)
	{
		try
		{
			var sts = XTSettings;
			var cn = XToolCheckerConst;
			var btn = XToolCheckerThreads.GetThread(threadIndex)._clickedButton;
			XToolChecker.MsgToConsole("Ответ сервера: " + status);	
			XToolChecker.MsgToConsole(response);	
			XToolChecker.MsgToConsole(responseXML);	
			if (status == 200)
			{
				if (!XToolCheckerThreads.IsAlive(threadIndex))
				{
					XToolChecker.updateStage(1, 1, true);
					XToolChecker.DebugMsg("thread is dead ");
					return;
				}
				
				if (btn != 0)
				{
					XToolChecker.MsgToConsole("response: " + response);		
					if ((btn.name.indexOf(cn._buttonYapPrefix) != -1) ||
						(btn.name.indexOf(cn._buttonYalPrefix) != -1) || 
						(btn.name.indexOf(cn._buttonRPrefix) != -1))
					{
						/*if ((btn.name.indexOf(cn._buttonYalPrefix) == 0) && (sts._check_yl_with_yc) && (sts._query_yp_yl == 6) )
							XToolChecker.ProcessYCYL(response, threadIndex);
						else*/
							XToolChecker.ProcessYapYal(response, responseXML, threadIndex);
					}
					else if (btn.name.indexOf(cn._buttonYCPrefix) != -1)
					{
						XToolChecker.ProcessYC(response, responseXML, threadIndex);
					}
					else if (btn.name.indexOf(cn._buttonBCPrefix) != -1)
					{
						XToolChecker.ProcessBC(response, threadIndex);
					}
					else if (btn.name.indexOf(cn._buttonPRPrefix) != -1)
					{
						XToolChecker.ProcessPR(response, threadIndex);
					}
					else if (btn.name.indexOf(cn._buttonTICPrefix) != -1)
					{
						XToolChecker.ProcessTIC(response, threadIndex);
					}
					else if (btn.name.indexOf(cn._buttonTrfPrefix) != -1)
					{
						XToolChecker.ProcessTrf(response, threadIndex);
					}
					else if (btn.name.indexOf(cn._buttonESPrefix) != -1)
					{
						XToolChecker.ProcessES(response, threadIndex);
					}
					else if (btn.name.indexOf(cn._buttonLVLPrefix) != -1)
					{
						/*if (responseXML)
							XToolChecker.ProcessLVL2(response, responseXML, threadIndex);
						else*/
							XToolChecker.ProcessLVL(response, threadIndex, "");
					}
					else if (btn.name.indexOf(cn._buttonPOSPrefix) != -1)
					{
						XToolChecker.ProcessPOS(response, threadIndex);
					}
					else if ((btn.name.indexOf(cn._buttonINYPrefix) != -1) || (btn.name.indexOf(cn._buttonRLVPrefix) != -1))
					{
						XToolChecker.ProcessINY(response, responseXML, threadIndex);
					}
					else if ((btn.name.indexOf(cn._buttonSQIPrefix) != -1))
					{
						XToolChecker.ProcessSQI(response, threadIndex);
					}
					else if ((btn.name.indexOf(cn._buttonGLPrefix) != -1) || 
						(btn.name.indexOf(cn._buttonGCPrefix) != -1) || 
						(btn.name.indexOf(cn._buttonGPPrefix) != -1) || 
						(btn.name.indexOf(cn._buttonINGPrefix) != -1))
					{
						if ((btn.name.indexOf(cn._buttonGPPrefix) != -1) || 
							(btn.name.indexOf(cn._buttonGLPrefix) != -1) || 
							(btn.name.indexOf(cn._buttonINGPrefix) != -1))
						{
							XToolChecker.ProcessGPGL(response, responseXML, threadIndex);
						}
						else if (btn.name.indexOf(cn._buttonGCPrefix) != -1)
						{
							XToolChecker.ProcessGC(response, responseXML, threadIndex);
						}
					} else
					{
						XToolChecker.ProcessXT(response, threadIndex);
					}
				}
				else
				{
				//что-то странное
				}
			}
			else
			if (((status == 301) || (status == 302)) && (btn.name.indexOf(cn._buttonLVLPrefix) != -1) &&
				(XToolCheckerThreads.GetThread(threadIndex)._queryStage == 0))
			{
				// был редирект
				//XToolCheckerThreads.GetThread(threadIndex)._queryStage = 1;
				if (location != "")
				{
					//btn.previousSibling.alt = location;
					XToolChecker.ProcessLVL(response, threadIndex, location);
				}
				else
				{
					XToolCheckerThreads.SetCurrentButton(threadIndex, "RD", "", "", "error");
					XToolCheckerThreads.ClearCurrentButton(threadIndex);
				}
				//return;
			}
			else if ((status == 503) && (
				(btn.name.indexOf(cn._buttonGLPrefix) != -1) || 
				(btn.name.indexOf(cn._buttonGCPrefix) != -1) || 
				(btn.name.indexOf(cn._buttonGPPrefix) != -1) || 
				(btn.name.indexOf(cn._buttonINGPrefix) != -1)))  //видимо капча
			{
				if (btn.name.indexOf(cn._buttonGCPrefix) != -1)
				{
					XToolChecker.ProcessGC(response, null, threadIndex);
				}
				else 
				{
					XToolChecker.ProcessGPGL(response, responseXML, threadIndex);
				}
				
			}
			else 
			{
				if (btn.name.indexOf(cn._buttonGCPrefix) != -1)
				{
					XToolChecker.ProcessGC(response, null, threadIndex);
				}
				else
				{
					XToolChecker.MsgToConsole("Ответ сервера: " + status);		
					this._bcEncoding = "";
					XToolCheckerThreads.SetCurrentButton(threadIndex, "---", status == 0 ? 'Попробуйте отключить опцию "Защита от отслеживания"' : "", "", "error");
					if ((btn.name.indexOf(cn._buttonBCPrefix) != -1) && (sts._use_auto_select_bc_error))
					{
						XToolChecker.SetCheckForButton(threadIndex, btn);
					}
					else if ((btn.name.indexOf(cn._buttonPOSPrefix) != -1) && (sts._use_auto_select_pos) && (sts._posCheckErr))
					{
						XToolChecker.CheckIfRequired(docUrl, threadIndex, XToolCheckerThreads.GetThread(threadIndex)._clickedButton);
					}
					XToolCheckerThreads.ClearCurrentButton(threadIndex);
				}
			}
			var btn = XToolCheckerThreads.GetThread(threadIndex)._clickedButton;
			if (btn != 0)
			{
				// хитрость для POS
				XToolCheckerThreads.GetThread(threadIndex)._attempt++;
				XToolChecker.DebugMsg("repeat");
				var stage = XToolCheckerThreads.GetThread(threadIndex)._queryStage;
				var queryType = XToolCheckerThreads.GetThread(threadIndex)._currentQueryType;
				var currentQueryIndex = XToolCheckerThreads.GetThread(threadIndex)._currentQueryIndex;
				//if (btn.name.indexOf(cn._buttonPRPrefix) != -1)
				XToolCheckerThreads.ClearCurrentButton(threadIndex);
				
				XToolCheckerThreads.GetThread(threadIndex)._queryStage = stage;
				XToolCheckerThreads.GetThread(threadIndex)._currentQueryType = queryType;
				XToolCheckerThreads.GetThread(threadIndex)._currentQueryIndex = currentQueryIndex;
				XToolChecker.ButtonClicked(btn, threadIndex);
			}
			else
			{
				XToolCheckerThreads.GetThread(threadIndex)._attempt = 0;
				if (!XToolCheckerThreads.GetThread(threadIndex)._multiCheck)
				{
					XToolChecker.updateStage(1, 1, true);
				}
				else
				{
					XToolChecker.GotoNextButton(threadIndex);
				}
			}
		}
		catch(ex)
		{
			XToolChecker.ReportError("processResult: ", ex);
			if (XToolCheckerThreads.GetThread(threadIndex)._multiCheck)
			{
				XToolChecker.EndMulticheck(false, threadIndex);
			}
			
		}
	},


	ProcessSQI : function(response, threadIndex)
	{
		var sts = XTSettings;
		var cn = XToolCheckerConst;
		var docUrl = XToolCheckerThreads.GetThread(threadIndex)._url;
		var text = response.replace(/\r\n/img, "");
		text = text.replace(/\n/img, "");
		if (XToolChecker.HasCapchaYnd(text))
		{
			XToolCheckerThreads.SetCurrentButton(threadIndex, "CPT", "CPT", "", "error");
			XToolCheckerThreads.ClearCurrentButton(threadIndex);
			XToolChecker.StopMulticheck();
			XTChecker.Capcha.ClearAll();
			return;
			/*console.log('Capcha');
			if (!this._isCaptureDialog)
			{
				//XToolCheckerThreads.SetCurrentButton(threadIndex, "CPT", "CPT", "", "error");
				// Чтобы не было таймаута
				XToolCheckerThreads.GetThread(threadIndex)._xmlHttpObj = 0;
				this._isCaptureDialog = true;
				var action = XToolCheckerThreads.GetThread(threadIndex)._action;
				if (action.indexOf("http://") != 0) 
					action = "http://yandex.ru/yandsearch?text=";
				XTChecker.Capcha.ProcessCapcha(action, sts._capcha_type, sts._antigate_key, sts._antigate_no_alerts, threadIndex);
				XToolChecker.DebugMsg("Closed");
				this._isCaptureDialog = false;
				if (XTChecker.Capcha._stopAll)
				{
					XToolCheckerThreads.ClearCurrentButton(threadIndex);
					XToolChecker.StopMulticheck();
					XTChecker.Capcha.ClearAll();
				}
				// выйдем - кнопка проверится еще раз
			}
			else
				XToolChecker.DebugMsg("Dialog is opened");*/

		}
		// та ли страница?
		var indexTitle = response.indexOf("\"type\":\"SQI\"");
		if (indexTitle != -1)
		{
			var status ="";
			var res1 = response.match(/\"sqi\":([0-9]*)\,/i);

			if (res1.length > 1)
			{
				var result = res1[1];
				XToolCheckerThreads.SetCurrentButton(threadIndex, result, "", "SQI = " + result, "green");
			}
			else
			{
				XToolCheckerThreads.SetCurrentButton(threadIndex, "", "", "Не найдено значение на странице", "red");
			}
		}
		else
		{
			XToolCheckerThreads.SetCurrentButton(threadIndex, "---", "ER", "", "error");
		}
		XToolCheckerThreads.ClearCurrentButton(threadIndex);
	},

	
	GotoNextButton : function(threadIndex)
	{
		if ((this._needPft) && (!this._processingPft))
		{
			var total = XToolCheckerThreads.GetThread(threadIndex)._total;
			var current = XToolCheckerThreads.GetThread(threadIndex)._current;
			if ((total > this._pftCount) && (current == this._pftCount / 2))
			{
				// запускаем
				this._processingPft = true;
				this._pftThreadIndex = threadIndex;
				
				XToolChecker.SearchPft();
				return;
				
			}
		}
		if (this._pauseMulticheck)
		{
			if (!this._isSplitting)
			{
				XTBrowserTools.SetElementDisabled(this._pauseButtonName, false);
				XTBrowserTools.SetElementTooltip(this._pauseButtonName, "Продолжить");
				XTBrowserTools.SetElementImage(this._pauseButtonName, "play.png");
			}
		}
		else
		{
			if (!this._isSplitting)			
				XToolCheckerThreads.GetThread(threadIndex)._current++;
			if (XToolCheckerThreads.GetThread(threadIndex)._current < XToolCheckerThreads.GetThread(threadIndex)._total)
			{
				XToolChecker.updateStage(XToolCheckerThreads.GetThread(threadIndex)._current, XToolCheckerThreads.GetThread(threadIndex)._total, false);
				XToolChecker.ClickOrSkip(XToolCheckerThreads.GetCurrentButtonInfo(threadIndex), threadIndex);				
			}
			else 
			{
				XToolCheckerThreads.GetThread(threadIndex)._current = 0;
				XToolChecker.EndMulticheck(false, threadIndex);
			}
		}
	},
	
	ClickOrSkip : function(button, threadIndex)
	{
		try
		{
		var cn = XToolCheckerConst;
		var btn = XToolCheckerThreads.GetCurrentButtonInfo(threadIndex);
	
		while (XToolChecker.IsAlreadyChecked(btn, threadIndex))
		{
			XToolCheckerThreads.GetThread(threadIndex)._current++
			if (XToolCheckerThreads.GetThread(threadIndex)._current >= XToolCheckerThreads.GetThread(threadIndex)._total)
				break;
			XToolChecker.updateStage(XToolCheckerThreads.GetThread(threadIndex)._current, XToolCheckerThreads.GetThread(threadIndex)._total, false);
			btn = XToolCheckerThreads.GetCurrentButtonInfo(threadIndex);
		}
		
		if (XToolCheckerThreads.GetThread(threadIndex)._current >= XToolCheckerThreads.GetThread(threadIndex)._total)
		{
			XToolCheckerThreads.GetThread(threadIndex)._current = 0;
			XToolChecker.EndMulticheck(false, threadIndex);
		}
		else
		{
			XToolChecker.ButtonClicked(XToolCheckerThreads.GetCurrentButtonInfo(threadIndex), threadIndex);
		}
		}
		catch(e)
		{
			XToolChecker.ReportError("ClickOrSkip: ", e);
		}
		
	},
	
	IsAlreadyChecked : function(button, threadIndex)
	{
		var sts = XTSettings;
		var cn = XToolCheckerConst;
		var docUrl = XToolCheckerThreads.GetThread(threadIndex)._url;
		if (!button.previousSibling)
			return false;
		var href = button.previousSibling.value;
		var title = button.previousSibling.title;
		for (var i = 0; i < XToolCheckerThreads.GetThread(threadIndex)._current; i++)
		{
			var btn = XToolCheckerThreads.GetThread(threadIndex)._buttonInfos[i];
			var href1 = btn.previousSibling.value;
			var title1 = btn.previousSibling.title;
			if ((href == href1) && (title == title1))
			{
				// уже было
				// заполняем
				button.value = btn.value;
				button.title = btn.title;
				button.style.backgroundColor = btn.style.backgroundColor;
				button.className = button.className.replace(" XTCheckedButton", "");
				XToolChecker.CheckIfNeeded(button, btn);
				//радуемся
				//XToolChecker.MsgToConsole("Button skipped");
				return true;
			}
		}
		
		// не нашли - придется проверять.
		
		if 	((button.style.backgroundColor != XToolChecker.ColorHex2Dec(XToolCheckerThreads.GetColorByName("default", threadIndex))) &&
			(button.style.backgroundColor != ""))
		{
			if ((button.name.indexOf(cn._buttonPrefix) != -1) && (button.alt == "cached_value"))/*
				((button.style.backgroundColor == XToolChecker.ColorHex2Dec(XToolCheckerThreads.GetColorByName2("cache"))) ||
				(button.style.backgroundColor == XToolChecker.ColorHex2Dec(XToolCheckerThreads.GetColorByName2("blueCache"))) ||
				(button.style.backgroundColor == XToolChecker.ColorHex2Dec(XToolCheckerThreads.GetColorByNameScheme2("cache"))) ||
				(button.style.backgroundColor == XToolChecker.ColorHex2Dec(XToolCheckerThreads.GetColorByNameScheme2("blueCache")))	||
				(button.style.backgroundColor == XToolChecker.ColorHex2Dec(XToolCheckerThreads.GetColorByNameScheme4("orange")))
				))*/
			{
				// кэш xt - проверяем
				return false;
			}
			// пропускаем
			//XToolChecker.MsgToConsole("Button skipped");
			if (button.value != "CPT")// капчи не пропускаем
				return true;
		}
		// проверяем
		return false;
	
	},
	
	CheckDomainRed : function (btn)
	{
		var cn = XToolCheckerConst;
		if ((btn.name.indexOf(cn._buttonPrefix) == 0) && (btn.name.indexOf(cn._buttonXTDPrefix) == -1))
		{
			try
			{
				var doc = btn.ownerDocument;
				//var tmpObj = btn.parentNode;
				var inputs = doc.getElementsByTagName("INPUT");
				var href = btn.previousSibling.value;
				for (var i = 0; i < inputs.length; i++)
				{
						if ((inputs[i].type == "button") && (inputs[i].name.indexOf(cn._buttonXTDPrefix) == 0))
						{
							if (btn.name != inputs[i].name)
							{	
								var href2 = inputs[i].previousSibling.value;
								if (href.toLowerCase().indexOf(href2.toLowerCase()) != -1) // наш домен
								{
									if (inputs[i].className.indexOf("XTCheckedButton") != -1)
										return true;
									else
										return false;
								}
					
							}
					}
				}
								
				
			}
			catch(e)
			{
			}
			
		
		}	
		return false;
	},
	
	Hex2Dec : function(x)
	{
		var y = 0;
		var z;
		for(var i = 0; i < x.length; i++)
		{
			z = x.toUpperCase().charCodeAt(i);
			y = 16*y + z - ((z<58) ? 48 : 55);
		}
		return y;
	},
	
	ColorHex2Dec : function(x)
	{
		x = x.replace("#", "");
		var tmp = "rgb(" + x.replace(/(..)/g,function($1){return XToolChecker.Hex2Dec($1)+', '});
		return tmp.substring(0, tmp.length - 2)  + ")";
	},
	
	CheckIfNeeded : function (button, srcBtn)
	{
		if (srcBtn.className.indexOf("XTCheckedButton") != -1)
		{
			//if (XToolChecker.IsPageToCheck(docUrl))
				XToolChecker.SetCheckForButton(threadIndex, button);		
		}
	},
	
	GetDescription : function(content) 
	{
		
		var res = content.match(/<meta[\s]+name=['\"\s]{1}description['\"\s]{1}[\s]+content=['\"]{1}([^\'\"]*)['\"]{1}/i); 
		if ((res) && (res.length > 1))
		{
			return res[1];
		}
		else
			return "";
	},
	
	ClearHTML : function(text)
	{
		// Перепишем по другому, чтобы не висло
		text = text.replace(/<\!--(\w|\W)*?-->/ig,"");
		text = text.replace(/<style(\w|\W)*?\/style>/ig,"");
		text = text.replace(/<script(\w|\W)*?\/script>/ig,"");
		return text;
	},
	
	ReplaceMSymb : function(res)
	{
		res = res.replace(/\(/g, "\\(");
		res = res.replace(/\)/g, "\\)");
		res = res.replace(/\[/g, "\\[");
		res = res.replace(/\]/g, "\\]");
		res = res.replace(/\\/g, "\\\\");
		res = res.replace(/\./g, "\\.");
		res = res.replace(/\^/g, "\\^");
		res = res.replace(/\$/g, "\\$");
		res = res.replace(/\|/g, "\\?");
		res = res.replace(/\+/g, "\\+");
		res = res.replace(/\{/g, "\\{");
		res = res.replace(/\}/g, "\\}");
		res = res.replace(/\//g, "\\/");
		return res;
	},
	
	ProcessPR : function(response, threadIndex)
	{
		try {
		var sts = XTSettings;
		var docUrl = XToolCheckerThreads.GetThread(threadIndex)._url;
		var d = new Date();
		this._pr_time = d.getTime();
		var delta = sts._timeout_pr - sts._timeout_pr_min;
		if (delta < 0) delta = 0;
		this._pr_waitTime =  Math.floor(sts._timeout_pr_min*1 + Math.random() * delta);
        var rank = XTChecker.PR.getRank(response);
		if (rank == "")
			XToolCheckerThreads.SetCurrentButton(threadIndex, "", "", "Unranked", "red");
		else
			XToolCheckerThreads.SetCurrentButton(threadIndex, rank, "", "PageRank = " + rank, "green");
		if (sts._use_auto_select_pr)
		{
			try
			{
				var value = -1;
				if (rank != "")
					value = parseInt(rank);
				if ((isNaN(value)) || ( value < sts._prValue))
				{
					var btn = XToolCheckerThreads.GetThread(threadIndex)._clickedButton;
					XToolChecker.CheckIfRequired(docUrl, threadIndex, btn);
				}
			}
			catch (e)
			{
				XToolChecker.DebugMsg("ProcessPR: " + e);
			}
			
		}
		XToolCheckerThreads.ClearCurrentButton(threadIndex);
		}
		catch (ex)
		{
			XToolChecker.MsgToConsole("ProcessPR error: " + ex);
			XToolCheckerThreads.SetCurrentButton(threadIndex, "---", "ER", "", "error");
			XToolCheckerThreads.ClearCurrentButton(threadIndex);
		}
	},
	
	ProcessBC : function(response, threadIndex)
	{
		var sts = XTSettings;
		var cn = XToolCheckerConst;
		var docUrl = XToolCheckerThreads.GetThread(threadIndex)._url;
		try {
		if (this._bcEncoding == "")
		{
			var encoding = response.match(/<meta[\s]+http-equiv=[\"]?Content-Type[\"]?[\s]+content=[\"\']text\/html;[\s]*charset=[\S-]+[\"\']/i); 
			if ((encoding) && (encoding.length > 0))
			{
			
				var enc = encoding[0].replace(/<meta[\s]+http-equiv=[\"]?Content-Type[\"]?[\s]+content=[\"\']text\/html;[\s]*charset=/i, "");
				enc = enc.replace(/[\"\']/ig,"");
				enc = enc.toLowerCase();
				XToolChecker.MsgToConsole(enc);
				if (enc != "windows-1251")
				{
					this._bcEncoding = enc;
					return;
				}
			}
			encoding = response.match(/<meta[\s]+content=[\"\']text\/html;[\s]*charset=[\S-]+[\"\']/i); 
			if ((encoding) && (encoding.length > 0))
			{
			
				var enc = encoding[0].replace(/<meta[\s]+content=[\"\']text\/html;[\s]*charset=/i, "");
				enc = enc.replace(/[\"\']/ig,"");
				enc = enc.toLowerCase();
				XToolChecker.MsgToConsole(enc);
				if (enc != "windows-1251")
				{
					this._bcEncoding = enc;
					return;
				}
			}
			encoding = response.match(/<meta[\s]+charset=[\"\'][\S-]+[\"\']/i); 
			if ((encoding) && (encoding.length > 0))
			{
			
				var enc = encoding[0].replace(/<meta[\s]+charset=[\"\']/i, "");
				enc = enc.replace(/[\"\']/ig,"");
				enc = enc.toLowerCase();
				XToolChecker.MsgToConsole(enc);
				if (enc != "windows-1251")
				{
					this._bcEncoding = enc;
					return;
				}
			}
		}
		this._bcEncoding = "";
		response = response.replace(/\r\n/img, " ");
		response = response.replace(/\n/img, " ");
		response = XToolChecker.ClearHTML(response);
		if (sts._skipBCNoIndex)
			response = response.replace(/<noindex(\w|\W)*?\/noindex>/ig,"");
		var href = XToolCheckerThreads.GetThread(threadIndex)._lastRequestedUrl;//this._lastRequestedUrl;
		var url = XToolChecker.GetDomainName(href);
		var urlLength = href.length;
		if (url.indexOf('http://') == 0)
		{
			url = url.substring(7);
			urlLength -= 7;
		}
		if (url.indexOf('https://') == 0)
		{
			url = url.substring(8);
			urlLength -= 8;
		}
		var lurl = url;
		if ((url.indexOf('www.') == 0) && (url.lastIndexOf('.') > 5))
		{
			lurl = url.substring(4);
			urlLength -= 4;
		}
		
		//Тут посчитаем:
		//var res = response.match(/<a[^\>]+href[\s]{0,1}=[\s]{0,1}[\'\"]{0,1}([^\'\"\s\>]*)[\'\"\s]{0,1}/ig);
		var res = response.match(/<a[^\>]+href[\s]{0,1}=[\s]{0,1}[\'\"]{0,1}([^\'\"\s\>]*)[\'\"\s]{0,1}[^\>]*\>.*?\<\/a\>/ig);
		var intCnt = 0;
		var extCnt = 0;
		var unique = [];
		var imgList = [];
		var extLinks = [];

		if (res)
		{
			for (var i = 0; i < res.length; i++)
			{
				var link = res[i].replace(/<a[^\>]+href[\s]{0,1}=[\s]{0,1}[\'\"]{0,1}/i, "");
				var isImg = false;
				if ((sts._skipBCNoFollow) && (link.search(/\srel[\s]{0,1}=[\s]{0,1}[\'\"]{0,1}nofollow[\'\"]{0,1}[\s]{0,1}/i) != -1))
					continue;
				if (link.toLowerCase().indexOf("<img") != -1)
					isImg = true;
				var index = link.indexOf("\"");
				if (index == -1)
					index = link.indexOf("\'");
				if (index == -1)
					index = link.indexOf(" ");
				if (index == -1)
					continue;
				link = link.substring(0, index);
				link = link.toLowerCase();
				var linkParts = link.split("#");
				if (linkParts.length > 0)
					link = linkParts[0];
				link = link.trim();
				if (isImg)
				{
					var isInList = false;
					for (var j = 0; j < imgList.length; j++)
						if (imgList[j] == link)
							isInList = true;
					if (!isInList)
					{
						imgList.push(link);
					}
				}
				else
				{
					var isInList = false;
					for (var j = 0; j < unique.length; j++)
						if (unique[j] == link)
							isInList = true;
					if (!isInList)
					{
						unique.push(link);
					}
				}
			}
			
			for (var i = 0; i < unique.length; i++) 
			{ 
				var a = unique[i];
				if ((a.indexOf("#") == 0) || (a.indexOf("mailto:") == 0))
					continue;

				if (XToolChecker.IsInternal(a, lurl))
				{
					intCnt++;
				}
			    else    
				{ 
					var skip = false;
					for (var k = 0; k < sts._bcDomainsList.length; k++)
					{
						var url = sts._bcDomainsList[k];
						if (url.indexOf('http://') == 0)
						{
							url = url.substring(7);
						}
						if (XToolChecker.IsInternal(a, url))
						{
							skip = true;
							break;
						}
				
					}
					if (skip)
						continue;
					extCnt++;
					extLinks.push(a);
				}       
			 } 
			 for (var i = 0; i < imgList.length; i++) 
			{ 
				var a = imgList[i];
				if ((a.indexOf("#") == 0) || (a.indexOf("mailto:") == 0))
					continue;

				if (XToolChecker.IsInternal(a, lurl))
				{
					//if (!sts._skipBCImg)
						intCnt++;
				}
				else    
				{ 
					var skip = false;
					for (var k = 0; k < sts._bcDomainsList.length; k++)
					{
						var durl = sts._bcDomainsList[k];
						if (durl.indexOf('http://') == 0)
						{
							durl = durl.substring(7);
						}
						if (XToolChecker.IsInternal(a, durl))
						{
							skip = true;
							break;
						}
				
					}
					if (skip)
						continue;
					if (!sts._skipBCImg)
						extCnt++;
					if (!sts._skipBCBlockImg)
						extLinks.push(a);
				}       
			 } 
			
		  }
		  else
		  {
			
		  }  
		  var blockFound = false;
		  var maxBlockLinks = 0;
		  // определяем блоки внешних ссылок
		  if (sts._useBlock)
		  {
				if ((extLinks.length > 0) && (extLinks.length >= sts._bcLinkCount))
				{
					var block = response;
					var domains = [];
					for (var i = 0; i < extLinks.length; i++) 
					{
						var preparedLink = extLinks[i];//.replace(/([^0-9a-z])/ig, '\\$1')
						var skip = false;
						for (var k = 0; k < sts._bcDomainsList.length; k++)
						{
							var durl = sts._bcDomainsList[k];
							if (durl.indexOf('http://') == 0)
							{
								durl = durl.substring(7);
							}
							if (XToolChecker.IsInternal(preparedLink, durl))
							{
								skip = true;
								break;
							}
					
						}
						if (skip)
							continue;
						var domain = XToolChecker.GetDomainName(preparedLink).toLowerCase();
						var index = -1;
						for (var j = 0; j < domains.length; j++)
						{
							if (domains[j] == domain)
							{
								index = j;
								break;
							}
						}
						if (index == -1)
						{
							domains.push(domain);
							index = domains.length - 1;
						}
						//var reg = new RegExp('<a[^\>]+href[\s]{0,1}=[\s]{0,1}[\'\"]{0,1}' + preparedLink + '[\'\"\s]{0,1}[^\>]*\>.*?\<\/a\>','i');
						block = block.replace(preparedLink, "###link" + index + "###");
						
					}
					//var reg = new RegExp('/<a[^\>]+href[\s]{0,1}=[\s]{0,1}[\'\"]{0,1}\#\#\#link\#\#\#[\'\"\s]{0,1}[^\>]*\>.*?\<\/a\>/','i');
					block = block.replace(/<a[^\>]+href[\s]{0,1}=[\s]{0,1}[\'\"]{0,1}\#\#\#link([0-9]+)\#\#\#[\'\"\s]{0,1}[^\>]*\>.*?\<\/a\>/g, "###ext$1###");
					// вырезаем теги
					block = block.replace(/<[^>]*>/g, "");
					block = block.replace(/^\s+|\s+$/g, '');
					block = block.replace(/^\&nbsp\;|\&nbsp\;$/g, '');
					var pos = 0;
					var oldPos = 0;
					var blockLinks = 0;
					var oldPosEnd = 0;
					var doms = [];
					do
					{
						oldPos = oldPosEnd;
						pos = block.indexOf("###ext", oldPosEnd + 1);
						oldPosEnd = block.indexOf("###", pos + 6);
						var number = block.substring(pos,  oldPosEnd + 3);
						oldPosEnd += 3;
						if ((blockLinks > 0) && (pos != -1))
						{
							if ((pos - oldPos/* - 9*/) <= sts._bcLinksTextLength)
							{
								var newLink = true;
								for (var j = 0; j < domains.length; j++)
								{
									if (doms[j] == number)
									{
										newLink = false;
										break;
									}
								}
								if (newLink)
									blockLinks++;
							}
							else
							{
								if (blockLinks > maxBlockLinks)
									maxBlockLinks = blockLinks;
								doms = [];
								doms.push(number);
								blockLinks = 1;
							}
						}
						if (blockLinks >= sts._bcLinkCount )
						{
							blockFound = true;
							//break;
						}
						if ((oldPos == 0) && (pos != -1))
						{
							blockLinks = 1;
							doms = [];
							doms.push(number);
						}
					} while (pos != -1);
					if (blockLinks > maxBlockLinks)
						maxBlockLinks = blockLinks;
				}
		  }
		  var allText = XToolChecker.GetTextOnly(response, sts._no_ancors_bc);
		  var allTextAnc = XToolChecker.GetTextOnly(response, false);
		  XToolCheckerThreads.SetCurrentButton(threadIndex, extCnt + "/" + intCnt, "", "", "green");
		  var btn = XToolCheckerThreads.GetThread(threadIndex)._clickedButton;
		  var buttonColor = "";
		  if (btn.name.indexOf(cn._buttonBCPrefix) == 0)
		  {
			  if ((sts._use_bc_url_length) && (urlLength > sts._bcUrlValue))
			  {
					if (XToolChecker.IsPageToCheck(docUrl))
					{
						XToolChecker.SetCheckForButton(threadIndex, btn);
						//btn.style.backgroundColor = XToolCheckerThreads._customXTColor[0];
						buttonColor = XToolCheckerThreads._customXTColor[0];
						XToolCheckerThreads.SetCurrentButton(threadIndex, "", "", "", "green");
					}
			  }
			  if ((sts._use_auto_select_bc) && (extCnt > sts._bcValue))
			  {
					if (XToolChecker.IsPageToCheck(docUrl))
					{
						XToolChecker.SetCheckForButton(threadIndex, btn);
						//if (sts._useColorBC)
						//	btn.style.backgroundColor = XToolCheckerThreads._customXTColor[0];
						buttonColor = XToolCheckerThreads._customXTColor[0];
					}
			  }
			  if ((sts._use_highlight_bc_ext) && (extCnt > sts._bcExtHighlightValue))
			  {
					//btn.style.backgroundColor = "pink";
					buttonColor  = "pink";
			  }
			  if ((sts._use_auto_select_bc_int) && (intCnt > sts._bcValueInt))
			  {
					if (XToolChecker.IsPageToCheck(docUrl))
					{
						XToolChecker.SetCheckForButton(threadIndex, btn);
						//if (sts._useColorBC)
						//btn.style.backgroundColor = XToolCheckerThreads._customXTColor[0];
						buttonColor = XToolCheckerThreads._customXTColor[0];
					}
			  }
			  
		  }
		  var badWords = false;
		  var badWordsFounded = "";
		 if (sts._useBCwords)
		 {
			  for (var j = 0; j < sts._bcWordsList.length; j++)
			  {
				var word = XToolChecker.ReplaceMSymb(sts._bcWordsList[j]);
				try 
				{
					var expr = new RegExp('\[\^a\-zа\-я0\-9ё\_\]'+ word +'\[\^a\-zа\-я0\-9ё\_\]' , 'ig');
					if (expr.test(allTextAnc))
					{
						//if (sts._check_marked)
						/*XToolChecker.CheckIfRequired(docUrl, threadIndex, btn);*/
						badWords = true;
						badWordsFounded = word;
						break;
					}
				}
				catch(e)
				{
					XToolChecker.MsgToConsole("Ошибка при поиске слова  '" + this._bcWordsList[j] + "' : " + e);
				}
			  }
		  }
		  var titleText = "SIZE: " + allText.length;
		  if (sts._no_ancors_bc)
			titleText += "(С анкорами: " + allTextAnc.length + ")"; 
		  titleText += " | Длина url: " + urlLength;
			var textContent = "";
			var textColor = "black";
			if (sts._showBCsize)
			{
				if ((sts._use_highlight_text) && (allText.length < sts._highlightValue))
				{
					textColor = "red";
				}
				else
				{
					textColor = "saddlebrown";
				}
				textContent = " sz: " + allText.length + " ";
				XToolCheckerThreads.SetNextElementText(threadIndex, textContent, textColor, cn._infoBlockPrefix + 'sz');
			}
			
		  if (badWords)
		  {
				 titleText += " | Встречается слово из фильтра: '"+ badWordsFounded + "'  !"
				 buttonColor = XToolCheckerThreads._customXTColor[0];
				 if (sts._checkBCwords)
					 XToolChecker.CheckIfRequired(docUrl, threadIndex, btn);
		  }
		  
		
		if ((!isNaN(allText.length)) && ( allText.length < sts._text_length_value))
		{ 
			 if (sts._useTextLength)
			{
				XToolChecker.CheckIfRequired(docUrl, threadIndex, btn);
			}
			//if (sts._useColorBC)
				buttonColor = XToolCheckerThreads._customXTColor[0];
			//XToolChecker.SetBackgroundColor(btn, XToolCheckerThreads._customXTColor[0]);
		}				
		
		if (blockFound)
	    {
			buttonColor = XToolCheckerThreads._blockColor[0];
			//XToolChecker.SetBackgroundColor(btn, XToolCheckerThreads._blockColor[0]);
			titleText += " | Найден блок ссылок (" + maxBlockLinks + ") ";
			if (sts._useAutoSelectBlock)
				XToolChecker.CheckIfRequired(docUrl, threadIndex, btn);
	    }
		var desc = XToolChecker.GetDescription(response);
		  if (desc.length != 0)
			titleText +=  " | " + desc;
		// btn.title = titleText;
		XToolCheckerThreads.SetCurrentButton(threadIndex, "", "", titleText, buttonColor);
		XToolCheckerThreads.ClearCurrentButton(threadIndex);
		}
		catch (ex)
		{
			XToolChecker.MsgToConsole("ProcessBC error: " + ex);
			XToolCheckerThreads.SetCurrentButton(threadIndex, "---", "ER", "", "error");
			if (sts._use_auto_select_bc_error)
			{
				var btn = XToolCheckerThreads.GetThread(threadIndex)._clickedButton;
				XToolChecker.SetCheckForButton(threadIndex, btn);
			}
			XToolCheckerThreads.ClearCurrentButton(threadIndex);
		}
	},
	
	IsInternal : function (a, lurl)
	{
		return (((a.indexOf("http://") != 0) && (a.indexOf("https://") != 0)) || 
				(a.indexOf("http://"+lurl) == 0) || (a.indexOf("http://www."+lurl) == 0 ) ||
				(a.indexOf("https://"+lurl) == 0) || (a.indexOf("https://www."+lurl) == 0 ));
	},

	ProcessAR : function(response, responseXML, threadIndex)
	{
		try {
		var pages = responseXML.getElementsByTagName('ALEXA');
		if ((pages) && (pages.length > 0))
		{
			var btn = XToolCheckerThreads.GetThread(threadIndex)._clickedButton;
			var href = btn.previousSibling.value;
			var sds = pages[0].getElementsByTagName("SD");
			if ((sds) && (sds.length > 0))
			{
				for (var i = 0; i < sds.length; i++)
				{
					var populs = sds[i].getElementsByTagName("POPULARITY");
					if ((populs)&& (populs.length > 0))
					{
						var res = populs[0].getAttribute("TEXT").trim();
						var res1 = res.replace(/(\d{1,3})(?=(?:\d{3})+$)/g, '$1\,');
						// разделяем запятыми группы разрядов.
						if (res/1000000 > 1)
						{
							var val = 1000000;
							res = Math.round(res/val) + " млн.";
						}
						else if (res/1000 > 1)
						{
							var val = 1000;
							res = Math.round(res/val) + " тыс.";
						}
						
						
						
						XToolCheckerThreads.SetCurrentButton(threadIndex, res, "", res1, "green");
						XToolCheckerThreads.ClearCurrentButton(threadIndex);
						return;
					}
				}
			}
			XToolCheckerThreads.SetCurrentButton(threadIndex, "unranked", "", "", "green");
			
		}
		else
		{
			XToolCheckerThreads.SetCurrentButton(threadIndex, "ER", "", "", "red");
		}
		}
		catch (ex)
		{
			XToolChecker.MsgToConsole("ProcessAR error: " + ex);
			XToolCheckerThreads.SetCurrentButton(threadIndex, "---", "ER", "", "error");
		}
		
		XToolCheckerThreads.ClearCurrentButton(threadIndex);
				
	},

	
	ProcessLVL : function(response, threadIndex, location)
	{
	try
	{
		var sts = XTSettings;
		var cn = XToolCheckerConst;
		var docUrl = XToolCheckerThreads.GetThread(threadIndex)._url;
		response = XToolChecker.ClearHTML(response);
		//response = response.replace(/<noindex(\w|\W)*?\/noindex>/ig,"");
		var href = XToolCheckerThreads.GetThread(threadIndex)._lastRequestedUrl;//this._lastRequestedUrl;
		var url = XToolChecker.GetDomainName(href);
		url = XToolChecker.PrepareLink(url);

		//Тут посчитаем:
		var btn = XToolCheckerThreads.GetThread(threadIndex)._clickedButton;
		var pageUrl = btn.previousSibling.value;
		pageUrl = XToolChecker.PrepareLink(pageUrl);
		if (location != "")
		{
			var redUrl = location;
			redUrl = XToolChecker.PrepareLink(redUrl);
			if (redUrl == pageUrl)
			{
				XToolCheckerThreads.SetCurrentButton(threadIndex, "1", "", "", "green");
				XToolCheckerThreads.ClearCurrentButton(threadIndex);
			}
			
		}
		var res = response.match(/<a[^\>]+href[\s]{0,1}=[\s]{0,1}[\'\"]{0,1}([^\'\"\s\>]*)[\'\"\s]{0,1}/ig);
		

		//pageUrl = pageUrl.toLowerCase();
		var intCnt = 0;
		var extCnt = 0;
		
		//var unique = [];
		var isOnPage = false;
		if (res)
		{
			for (var i = 0; i < res.length; i++)
			{
				var link = res[i].replace(/<a[^\>]+href[\s]{0,1}=[\s]{0,1}[\'\"]{0,1}/i, "");
				link = link.replace(/[\'\"]/g, "");
				link = XToolChecker.PrepareLink(link);
				if ((link == pageUrl) || (url + link == pageUrl) || (url + "/" + link == pageUrl))
				{
					isOnPage = true;
					break;
				}

			}

			
		  }
		  else
		  {
			
		  }  
		  var docUrl =  XToolChecker.PrepareLink(pageUrl);
		  if (pageUrl == docUrl)
		  if (isOnPage)
		  {
			XToolCheckerThreads.SetCurrentButton(threadIndex, "2", "", "", "green");
		  }
		  else
		  {
				XToolCheckerThreads.SetCurrentButton(threadIndex, "3+", "", "", "green");
				if (sts._use_auto_select_lvl)
				{
					XToolChecker.CheckIfRequired(docUrl, threadIndex, btn);
				}
		  }
		}
		catch (e)
		{	
			XToolChecker.MsgToConsole("ProcessLVL error: " + e);
			XToolCheckerThreads.SetCurrentButton(threadIndex, "ER", "", "", "red");
		}
		XToolCheckerThreads.ClearCurrentButton(threadIndex);
	},
	
	ProcessING : function(response, threadIndex)
	{
		XToolChecker.ProcessGP(response, threadIndex);
	},
	
	ProcessGL : function(response, threadIndex)
	{
		XToolChecker.ProcessGP(response, threadIndex);
	},
	
	ProcessGPAPI : function(response, threadIndex)
	{
	try
	{
		var sts = XTSettings;
		var cn = XToolCheckerConst;
		var docUrl = XToolCheckerThreads.GetThread(threadIndex)._url;
		var btn = XToolCheckerThreads.GetThread(threadIndex)._clickedButton;
		var isSecond = (btn.previousSibling.step == "2");
		if ((response.indexOf('Suspected Terms of Service Abuse') != -1) || (response.indexOf("Quota Exceeded") != -1))// уууу
		{
			XToolCheckerThreads.GetThread(threadIndex)._queryStage = 1;
			XToolChecker.DebugMsg("Switch GP/GL");
			return;
		}
		var obj = JSON.parse(response);
		var result = -1;
		var orig = [];
		if (obj.responseStatus != "200")
		{
			XToolCheckerThreads.SetCurrentButton(threadIndex, "ER", "", "Статус: " + obj.responseStatus + "  " + obj.responseDetails , "red");
		}
		else
		if (obj.responseData !=  null)
		{
			var res = obj.responseData.results;
			var titlePage = "";
			if (res)
			{
				
				var href = XToolCheckerThreads.GetThread(threadIndex)._clickedButton.previousSibling.value;
				for (var i = 0; i < res.length; i++)
				{

					href2 = res[i].unescapedUrl;
					href2 = href2.replace(/\&amp\;/g, "&");
					href2 = href2.replace(/\'/g, "%27");
					orig.push(href2);
					href2 = XToolChecker.PrepareLink(href2);
					//href2 = href2.toLowerCase();
					titlePage = res[i].title;
					if (href2 == href)
					{
						result = i + 1;
						break;
					}
					if (href2 == (href + "/"))
					{
						result = i + 1;
						break;
					}
					
				}
				if (result != -1)
				{
					// +
					XToolCheckerThreads.SetCurrentButton(threadIndex, "", orig[i], titlePage, "green");
					if (btn.name.indexOf(cn._buttonGLPrefix) != -1)
						XToolChecker.AddGLToDatabase(XToolCheckerThreads.GetThread(threadIndex)._lastRequestedUrl, btn, btn.previousSibling.title, 1, titlePage, false);
					else
						XToolChecker.AddGPToDatabase(XToolCheckerThreads.GetThread(threadIndex)._lastRequestedUrl, btn, 1, titlePage, false)
				
				}
				else
				{
					// - 	
					if (isSecond)
					{
						if ((response.search(/не найдено/i) != -1) || (response.search(/нет информации об адресе/i) != -1))
						{
							
							//XToolCheckerThreads.SetCurrentButton(threadIndex, "", "", "", "red");
							
							if (btn.name.indexOf(cn._buttonGLPrefix) == 0)
							{
								XToolCheckerThreads.SetCurrentButton(threadIndex, "", "", "Cсылка не проиндексирована", "red");
								XToolChecker.AddGLToDatabase(XToolCheckerThreads.GetThread(threadIndex)._lastRequestedUrl, btn, btn.previousSibling.title, 0, "", false);
							}
							else
							{
								XToolCheckerThreads.SetCurrentButton(threadIndex, "", "", "Cтраница не в индексе", "red");
								if (btn.name.indexOf(cn._buttonGPPrefix) != -1)
									XToolChecker.AddGPToDatabase(XToolCheckerThreads.GetThread(threadIndex)._lastRequestedUrl, btn, 0, "", false)
				
							}
							
							if ((btn.name.indexOf(cn._buttonGPPrefix) == 0)&& (sts._use_auto_select_gp))
							{
								XToolChecker.CheckIfRequired(docUrl, threadIndex, btn);
							}

							else if ((btn.name.indexOf(cn._buttonGLPrefix) == 0)&& (sts._use_auto_select_gl))
							{
								XToolChecker.CheckIfRequired(docUrl, threadIndex, btn);
							}
							
						}
						else if (res)
						{
							XToolChecker.DebugMsg("ничего не нашли в списке");
							// ничего не нашли в списке
							//XToolCheckerThreads.SetCurrentButton(threadIndex, "---", "ER", "", "error");
							//var btn = XToolCheckerThreads.GetThread(threadIndex)._clickedButton;
							if (btn.name.indexOf(cn._buttonGLPrefix) == 0)
							{
								XToolCheckerThreads.SetCurrentButton(threadIndex, "", "", "Cсылка не проиндексирована", "red");
								XToolChecker.AddGLToDatabase(XToolCheckerThreads.GetThread(threadIndex)._lastRequestedUrl, btn, btn.previousSibling.title, 0, "", false);
							}
							else
							{
								XToolCheckerThreads.SetCurrentButton(threadIndex, "", "", "Cтраница не в индексе", "red");
								XToolChecker.AddGPToDatabase(XToolCheckerThreads.GetThread(threadIndex)._lastRequestedUrl, btn, 0, "", false)
							}
							if ((btn.name.indexOf(cn._buttonGPPrefix) == 0)&&(sts._use_auto_select_gp))
							{
								XToolChecker.CheckIfRequired(docUrl, threadIndex, btn);
							}

							else if ((btn.name.indexOf(cn._buttonGLPrefix) == 0)&&(sts._use_auto_select_gl))
							{
								XToolChecker.CheckIfRequired(docUrl, threadIndex, btn);
							}

						}
						else
						{
							XToolChecker.DebugMsg("oops");
							XToolChecker.DebugMsg(response);
							XToolCheckerThreads.SetCurrentButton(threadIndex, "---", "ER", "", "error");
						}
					}
					else
					{
						// Еще разок проверим
						btn.previousSibling.step = "2";
						XToolChecker.DebugMsg("Repeat GP/GL");
						return;
					}
				}
			}
		}
		else
		{
			XToolCheckerThreads.SetCurrentButton(threadIndex, "ER", "", "Статус: " + obj.responseStatus + "  " + obj.responseDetails , "red");
			
			
		}
	}
	catch (e)
	{
		XToolChecker.MsgToConsole("ProcessGPAPI error: " + e);
		XToolCheckerThreads.SetCurrentButton(threadIndex, "ER", "", "", "red");
	}
		
		XToolCheckerThreads.ClearCurrentButton(threadIndex);
	},
	
	CheckIfRequired :  function(docUrl, threadIndex, btn)
	{
		if (XToolChecker.IsPageToCheck(docUrl))
		{
			XToolChecker.SetCheckForButton(threadIndex, btn);
		}
	},
	

	ProcessGPGL : function(response, responseXML, threadIndex)
	{
		var sts = XTSettings;
		var cn = XToolCheckerConst;
		var btn = XToolCheckerThreads.GetThread(threadIndex)._clickedButton;
		if (!responseXML) {
			responseXML = XToolChecker.ConvertResponseToXml(response);			
		}
		if (responseXML)
		{
			var errors = responseXML.getElementsByTagName('error');
			if ((errors) && (errors.length > 0))
			{
				
				var code = -1;
				if (errors[0].hasAttribute("code"))
				{
					code = errors[0].getAttribute("code");
				}
				if (code == 15)
				{
					{
						btn.previousSibling.step = "";
					
						// не нашли ничего
						XToolCheckerThreads.SetCurrentButton(threadIndex, "", "NO", "", "red");
						if (btn.name.indexOf(cn._buttonGLPrefix) == 0)
						{
							btn.title = "Cсылка не проиндексирована";
						}
						else if (btn.name.indexOf(cn._buttonGPPrefix) == 0)
						{
							btn.title = "Cтраница не в индексе";
						}
						/*
						if (sts._expireYal)
						{
							if (btn.name.indexOf(cn._buttonYalPrefix) == 0) 
								XToolChecker.CheckIfRequired(docUrl, threadIndex, btn);
						}*/
					}
				}
				else
				{
					// Настоящая ошибка
					XToolCheckerThreads.SetCurrentButton(threadIndex, "ER", "ER",  errors[0].textContent, "error")
				}
			}
			else
			{
				// вроде есть результат
				if (btn.name.indexOf(cn._buttonINGPrefix) == 0) {
					// вроде есть результат
					var found = responseXML.getElementsByTagName('found');
					if (found && found.length > 0)
					{
						var val = "";
						for (var j =0; j < found.length; j++)
						{
							if (found[j].getAttribute("priority") == 'all')
							{
								val = found[j].textContent;
								break;
							}
						}
						var pages = 0;
						try 
						{
							pages = parseInt(val.trim());
						}
						catch (e)
						{
						
						}
						var color = "green";
						if (pages < sts._ingValue)
						{
							color = "yellow";
							if (pages == 0)
								color = "red";
							if (sts._use_auto_select_ing)
							{
								if (XToolChecker.IsPageToCheck(btn.ownerDocument))
								{
									XToolChecker.SetCheckForButton(threadIndex, btn);
								}
							}
						}
				
						XToolCheckerThreads.SetCurrentButton(threadIndex, val, "", val, color);
					}
				}
				else {
					var docs = responseXML.getElementsByTagName('doc');
					var orig = [];
					var result = -1;
					var isDifferentCase = false;
					var isSlash = false;
					if (docs)
					{
						var href = btn.previousSibling.value;
						//href = href.toLowerCase();
						for (var i = 0; i < docs.length; i++)
						{
							var urls = docs[i].getElementsByTagName("url");
							if (urls)
							{
								var tmpUrl = urls[0].textContent;
								orig.push(tmpUrl);
								tmpUrl = XToolChecker.PrepareLink(tmpUrl);
								//tmpUrl = tmpUrl.toLowerCase();
								tmpUrl = tmpUrl.replace(/\'/g, "%27");
								if (tmpUrl == href)
								{
									result = i + 1;
									break;
								}
								if (tmpUrl.indexOf(href + "/") == 0)
								{
									result = i + 1;
									break;
								}
								if (tmpUrl.toLowerCase() == href.toLowerCase())
								{
									isDifferentCase = true;
								}
								if ((tmpUrl + "/" == href) || (href + "/" == tmpUrl))
								{
									isSlash = true;
								}
							}
						}
					}
					if (result != -1)
					{
						// +
						var titles = docs[result-1].getElementsByTagName("title");
						var titlePage = "";
						if ((titles) && (titles.length > 0))
						{
							titlePage = titles[0].textContent;							
						}
						else
						{
							titlePage = " ";
						}
						XToolCheckerThreads.SetCurrentButton(threadIndex, "", orig[result-1], titlePage, "green");
						/*if (btn.name.indexOf(cn._buttonYapPrefix) != -1)
							XToolChecker.AddYPToDatabase(XToolCheckerThreads.GetThread(threadIndex)._lastRequestedUrl, btn, 1, titlePage, 0)
						else
							XToolChecker.AddYLToDatabase(XToolCheckerThreads.GetThread(threadIndex)._lastRequestedUrl, btn, btn.previousSibling.title, 1, titlePage, 0);
						XToolChecker.SetYapIfYal(btn);*/
					}
					else
					{
						// - 		
						if (btn.name.indexOf(cn._buttonGLPrefix) == 0)
						{
							XToolCheckerThreads.SetCurrentButton(threadIndex, "", "NO", "Cсылка не проиндексирована", "red");
						}
						else if ((btn.name.indexOf(cn._buttonGPPrefix) == 0) || (btn.name.indexOf(cn._buttonINGPrefix) == 0))
						{
							XToolCheckerThreads.SetCurrentButton(threadIndex, "", "NO", "Cтраница не в индексе", "red");
						} 

						/*if (btn.name.indexOf(cn._buttonYapPrefix) != -1)
							XToolChecker.AddYPToDatabase(XToolCheckerThreads.GetThread(threadIndex)._lastRequestedUrl, btn, 0, "", 0)
						else
							XToolChecker.AddYLToDatabase(XToolCheckerThreads.GetThread(threadIndex)._lastRequestedUrl, btn, btn.previousSibling.title, 0, "", 0);
						*/
						////
						/*
						if (sts._use_auto_select_yap)
						{
							if (btn.name.indexOf(cn._buttonYapPrefix) == 0) 
								XToolChecker.CheckIfRequired(docUrl, threadIndex, btn);
						}
						if (sts._expireYal)
						{
							if (btn.name.indexOf(cn._buttonYalPrefix) == 0)
								XToolChecker.CheckIfRequired(docUrl, threadIndex, btn);
						}
					*/
					}
				}
			}
			XToolCheckerThreads.ClearCurrentButton(threadIndex);
		}
		else
		{
			XToolCheckerThreads.SetCurrentButton(threadIndex, "---", "ER", "", "error");
			XToolCheckerThreads.ClearCurrentButton(threadIndex);
		}

	},



	ProcessGP : function(response, threadIndex)
	{
	
		
	try
	{
		var sts = XTSettings;
		var cn = XToolCheckerConst;
		var docUrl = XToolCheckerThreads.GetThread(threadIndex)._url;
		var btn = XToolCheckerThreads.GetThread(threadIndex)._clickedButton;
		var isSecond = (btn.previousSibling.step == "2");
		//<ol id="rso">
		var d = new Date();
		this._g_time = d.getTime();
		var delta = sts._timeout_g - sts._timeout_g_min;
		if (delta < 0) delta = 0;
		XToolChecker.DebugMsg("delta = " +delta);
		this._g_waitTime =  Math.floor(sts._timeout_g_min*1 + Math.random() * delta);
		
		if (response.trim().indexOf("{") == 0)
		{
			XToolChecker.ProcessGPAPI(response, threadIndex);
			return;
		}
		{
			var text = response.replace(/\r\n/img, "");
			text = text.replace(/\n/img, "");
			/*text = text.replace(/<em>/img, "");
			text = text.replace(/<\/em>/img, "");*/
			// было ли что-то найдено
			var indexTitle = response.indexOf("id=\"rso\"");
			if (indexTitle == -1)
				indexTitle = response.indexOf("id=\'rso\'");
			if (indexTitle == -1)
				indexTitle = response.indexOf("div class=\"med\" id=\"res\"");
			if (indexTitle == -1)
				indexTitle = response.indexOf("div class=\'med\' id=\'res\'");
			if (indexTitle == -1)
				indexTitle = response.indexOf(" id=\"res\" role=\"main\"");
			if (indexTitle != -1)
			{
				XToolChecker.DebugMsg("CorrectAnswer ");
				if (btn.name.indexOf(cn._buttonINGPrefix) == 0)
				{
					var res = text.match(/Результатов:[ примерно]* ([^\<\>\(]*?)\<nobr\>\s*\(/i);

					if ((res) && (res.length > 1))
					{
						var result = res[1];
						result = result.replace(/\&nbsp\;/img, "");
						result = result.replace(/\&\#160\;/img, "");
						while (result.indexOf(String.fromCharCode(160)) != -1)
							result = result.replace(String.fromCharCode(160), "");
						result = result.replace(" ", "");
						var val = 0;
						try {
							val = parseInt(result);
						}
						catch(e)
						{
						val = -1;
						}
						XToolChecker.DebugMsg(val);
						var text = val;
						div = val / 1000000;
						if (div > 1)
						{						
							text = Math.round(div) + " млн.";
						}
						else
						{	
							div = val / 1000;
							if (div > 1)
							{						
								text = Math.round(div) + " тыс.";
							}
						}
						XToolChecker.DebugMsg(text);
						//Результатов: примерно 235&nbsp;000&nbsp;000<nobr>  (0,19 сек.
						if (XToolCheckerThreads.GetThread(threadIndex)._queryStage == 1)
						{
							
							if (sts._ing_type == 1)
							{
								var color = "green";
								if ((val < sts._ingValue)&&(sts._use_auto_select_ing))
								{
										color = "red";
										XToolChecker.CheckIfRequired(docUrl, threadIndex, btn);
								}
								
								XToolCheckerThreads.SetCurrentButton(threadIndex, text, "", "Основной: " + val, color);
								/*btn.nextSibling.textContent =  "";
								btn.nextSibling.title =  "";*/
								XToolCheckerThreads.SetNextElementText(threadIndex, "", "");
							}
							else if ((sts._ing_type == 2) ||
									(sts._ing_type == 3))
							{
								var color = "green";
								if ((val < sts._ingValue)&& (sts._use_auto_select_ing))
								{
										color = "red";
										XToolChecker.CheckIfRequired(docUrl, threadIndex, btn);
								}
								XToolCheckerThreads.SetCurrentButton(threadIndex, text , "", "Основной: " + val, color);
								XToolCheckerThreads.GetThread(threadIndex)._queryStage = 2;
								return;
							}
						}
						else
						{
							// +
							
							if (sts._ing_type == 3)
							{
								var prc = "-";
								var old_text = btn.value;
								var old_title = btn.title;
								try {
									var tmp = old_text.replace(" млн.",  "000000");
									tmp = tmp.replace(" тыс.",  "000");
									var val1 = val;
									var val2 = parseInt(tmp);
									XToolChecker.DebugMsg(val1);
									XToolChecker.DebugMsg(val2);

									prc =  Math.round(val2*100 / val1);
								}
								catch (e) {XToolChecker.DebugMsg(e);}
								//XToolCheckerThreads.SetCurrentButton(threadIndex, text , "", "Основной: " + val, "green");
								/*var textAr = btn.nextSibling;
								textAr.style.size = "7px";
								textAr.style.fontWeight = "bold";
								textAr.textContent =   prc + "%";
								textAr.title =  "Процент: " + prc + "%";*/
								
								XToolCheckerThreads.SetNextElementText(threadIndex, prc + "%", /*"Процент: " + prc + "%",*/ "");
							}
							else if (sts._ing_type == 2)
							{
								var additional = "-";
								var old_text = btn.value;
								var old_title = btn.title;
								try {
									var tmp = old_text.replace(" млн.",  "000000");
									tmp = tmp.replace(" тыс.",  "000");
									var val1 = val;
									var val2 = parseInt(tmp);
									XToolChecker.DebugMsg(val1);
									XToolChecker.DebugMsg(val2);

									additional =  val1 - val2 ;
								}
								catch (e) {XToolChecker.DebugMsg(e);}
								var text = additional;
								if (text != "-")
								{
									
									div = additional / 1000000;
									if (div > 1)
									{						
										text = Math.round(div) + " млн.";
									}
									else
									{	
										div = additional / 1000;
										if (div > 1)
										{						
											text = Math.round(div) + " тыс.";
										}
									}
								}
							/*	var textAr = btn.nextSibling;
								textAr.style.size = "7px";
								textAr.style.fontWeight = "bold";
								textAr.textContent =   text;
								textAr.title =  "Дополнительный: " + additional;*/
								
								XToolCheckerThreads.SetNextElementText(threadIndex, text, /*"Дополнительный: " + additional,*/ "");
							}
							else
							{
								if (sts._ing_type != 0) 
								{
									XToolCheckerThreads.SetCurrentButton(threadIndex, text, "", "Общий: " + val, "green");
									XToolCheckerThreads.GetThread(threadIndex)._queryStage = 1;
									return;
								}
								
								else
								{
									var color = "green";
									if ((val < sts._ingValue)&&(sts._use_auto_select_ing))
									{
											color = "red";
											XToolChecker.CheckIfRequired(docUrl, threadIndex, btn);
									}
									XToolCheckerThreads.SetCurrentButton(threadIndex, text, "", "Общий: " + val, color);
									XToolCheckerThreads.SetNextElementText(threadIndex, "", /*"",*/ "");
								}
							}
						}
							
						
					}
					
					else
					{
						// - 			
						if ((response.search(/не найдено/i) != -1) || (response.search(/нет информации об адресе/i) != -1))
						{
						
							if (isSecond)
							{
								//XToolCheckerThreads.SetCurrentButton(threadIndex, "", "", "", "red");
								XToolCheckerThreads.SetCurrentButton(threadIndex, "", "", "Cтраница не в индексе", "red");

								if (sts._use_auto_select_ing)
								{
									XToolChecker.CheckIfRequired(docUrl, threadIndex, btn);
								}
		
								XToolCheckerThreads.SetNextElementText(threadIndex, "", /*"",*/ "");
							}
							else
							{
								// Еще разок проверим
								btn.previousSibling.step = "2";
								XToolChecker.DebugMsg("Repeat ING");
								return;
							}
						}
						else 
						{
							XToolCheckerThreads.SetCurrentButton(threadIndex, "ER", "ER", "", "error");
							XToolCheckerThreads.SetNextElementText(threadIndex, "", /*"",*/ "");
						}
					}
				}
				else
				{
/*					div class="yuRUbf"><a href="https://xtool.ru/analyze/" 
					onmousedown="return rwt(this,'','','','','AOvVaw0-Jbr-ljutOvLiv9xTczNK','','2ahUKEwi16uqt5KDtAhUxi8MKHY3CB_8QFjACegQIARAC','','',event)">
						<br><h3 class="LC20lb DKV0Md"><span>Seo анализ сайта Бесплатно (также проверка сайтов ...</span></h3>
						<div class="TbwUpd NJjxre"><cite class="iUh30 Zu0yb qLRx3b tjvcx">xtool.ru<span class="dyjrff qzEoUe">
							<span> › analyze</span></span></cite></div></a><div class="B6fmyf"><div class="TbwUpd">
								<cite class="iUh30 Zu0yb qLRx3b tjvcx">xtool.ru<span class="dyjrff qzEoUe"><span> › analyze</span></span></cite></div>
*/


				//	var res = text.match(/<div[\s]+class=[\'\"]{0,1}r[\'\"]{0,1}><a[\s]+href=[\'\"]{0,1}[^\'\"\s\>]*[\'\"]{0,1} onmousedown=[^\>]*><h3[^\>]>(.*?)<\/h3><\/a>.*?<\/div>/ig);
				   // var res = text.match(/<div[\s]+class=[^\>]*>(<a[\s]+href=[\'\"]{0,1}[^\'\"\s\>]*[\'\"]{0,1} onmousedown=[^\>]*><br><h3[^\>]*><span[^\>]*>.*?<\/span><\/h3>.*?<\/a>).*?<\/div>/ig);
				   var res = text.match(/<div[\s]+class=[^\>]*>(<a[\s]+href=[\'\"]{0,1}[^\'\"\s\>]*[\'\"]{0,1}[^\>]*><br><h3[^\>]*>.*?<\/h3>.*?<\/a>).*?<\/div>/ig);
					var orig = [];
					var result = -1;
					var titlePage = "";
					if (res)
					{	
						var href = XToolCheckerThreads.GetThread(threadIndex)._clickedButton.previousSibling.value;
						//href = href.toLowerCase();
						for (var i = 0; i < res.length; i++)
						{
							var href2 = "";
							//<span[\s]+class=[\'\"]{0,1}tl[\'\"]{0,1}>
							var res2 = res[i].match(/<div[\s]+class=[^\>]*><a[\s]+href=[\'\"]{0,1}([^\'\"\s\>]*)[\'\"]{0,1}[^\>]*><br><h3[^\>]*>(.*?)<\/h3>.*?<\/a>.*?<\/div>/i);
							if (res2)
							{
								if (res2.length > 1)
								{
									href2 = res2[1];
									href2 = href2.replace(/\&amp\;/g, "&");
									href2 = href2.replace(/\'/g, "%27");
									orig.push(href2);
									href2 = XToolChecker.PrepareLink(href2);
									//href2 = href2.toLowerCase();
									if (res2.length > 2)
									{
										titlePage = res2[2].replace(/<[^>]*>/g, "");
									}
									if (href2 == href)
									{
										result = i + 1;
										break;
									}
									if (href2 == (href + "/"))
									{
										result = i + 1;
										break;
									}
								}
							}
							else
							{
								
							}
						}
					}
					XToolChecker.DebugMsg("result = " +result);
					if (result != -1)
					{
						// +
						XToolCheckerThreads.SetCurrentButton(threadIndex, "", orig[i], titlePage, "green");
						if (btn.name.indexOf(this._buttonGLPrefix) != -1)
							XToolChecker.AddGLToDatabase(XToolCheckerThreads.GetThread(threadIndex)._lastRequestedUrl, btn, btn.previousSibling.title, 1, titlePage, false);
						else
							XToolChecker.AddGPToDatabase(XToolCheckerThreads.GetThread(threadIndex)._lastRequestedUrl, btn, 1, titlePage, false)
					
					}
					else
					{
						// - 	
						if (isSecond)
						{
							if ((response.search(/не найдено/i) != -1) || (response.search(/нет информации об адресе/i) != -1))
							{
								
								//XToolCheckerThreads.SetCurrentButton(threadIndex, "", "", "", "red");
								
								if (btn.name.indexOf(cn._buttonGLPrefix) == 0)
								{
									XToolCheckerThreads.SetCurrentButton(threadIndex, "", "", "Cсылка не проиндексирована", "red");
									XToolChecker.AddGLToDatabase(XToolCheckerThreads.GetThread(threadIndex)._lastRequestedUrl, btn, btn.previousSibling.title, 0, "", false);
								}
								else
								{
									XToolCheckerThreads.SetCurrentButton(threadIndex, "", "", "Cтраница не в индексе", "red");
									if (btn.name.indexOf(cn._buttonGPPrefix) != -1)
										XToolChecker.AddGPToDatabase(XToolCheckerThreads.GetThread(threadIndex)._lastRequestedUrl, btn, 0, "", false)
					
								}
								
								if ((btn.name.indexOf(cn._buttonGPPrefix) == 0) && (sts._use_auto_select_gp))
								{
										 XToolChecker.CheckIfRequired(docUrl, threadIndex, btn);
								}
								else if ((btn.name.indexOf(cn._buttonGLPrefix) == 0)&& (sts._use_auto_select_gl))
								{
										XToolChecker.CheckIfRequired(docUrl, threadIndex, btn);
								}
								
							}
							else if (res)
							{
								XToolChecker.DebugMsg("ничего не нашли в списке");
								// ничего не нашли в списке
								//XToolCheckerThreads.SetCurrentButton(threadIndex, "---", "ER", "", "error");
								//var btn = XToolCheckerThreads.GetThread(threadIndex)._clickedButton;
								if (btn.name.indexOf(cn._buttonGLPrefix) == 0)
								{
									XToolCheckerThreads.SetCurrentButton(threadIndex, "", "", "Cсылка не проиндексирована", "red");
									XToolChecker.AddGLToDatabase(XToolCheckerThreads.GetThread(threadIndex)._lastRequestedUrl, btn, btn.previousSibling.title, 0, "", false);
								}
								else
								{
									XToolCheckerThreads.SetCurrentButton(threadIndex, "", "", "Cтраница не в индексе", "red");
									XToolChecker.AddGPToDatabase(XToolCheckerThreads.GetThread(threadIndex)._lastRequestedUrl, btn, 0, "", false);
								}
								if ((btn.name.indexOf(cn._buttonGPPrefix) == 0)&& (sts._use_auto_select_gp))
								{
									XToolChecker.CheckIfRequired(docUrl, threadIndex, btn);
								}
								else if ((btn.name.indexOf(cn._buttonGLPrefix) == 0)&&(sts._use_auto_select_gl))
								{
									XToolChecker.CheckIfRequired(docUrl, threadIndex, btn);
								}
							}
							else
							{
								XToolChecker.DebugMsg("oops");
								XToolChecker.DebugMsg(response);
								XToolCheckerThreads.SetCurrentButton(threadIndex, "---", "ER", "", "error");
							}
						}
						else
						{
							// Еще разок проверим
							btn.previousSibling.step = "2";
							XToolChecker.DebugMsg("Repeat GP/GL");
							return;
						}
					}
				}
			}
			else
			{
				XToolChecker.DebugMsg("else");
				var res = text.match(/<form [^\<\>]*action=\"Captcha/ig);
				var res_i = text.match(/<form [^\<\>]*action=\"index/ig);
				if (((res) && (res.length > 0)) || (res_i && (res_i.length > 0)))
				{
					// Ой, капча :(
					XToolChecker.DebugMsg("CPT");
					
					
					if (!this._isCaptureDialog)
					{
						//XToolCheckerThreads.SetCurrentButton(threadIndex, "CPT", "CPT", "", "error");
						// Чтобы не было таймаута
						XToolCheckerThreads.GetThread(threadIndex)._xmlHttpObj = 0;
						// откроем окошко с капчей
						this._isCaptureDialog = true;
						//XToolChecker.OpenCPTWindowG(threadIndex);
						var action = XToolCheckerThreads.GetThread(threadIndex)._action;
						if ((action.indexOf("http://") != 0) && (action.indexOf("https://") != 0))
							action = "http://www.google.com/search?hl=ru&gl=ru&filter=0&q=1";
							
						XTChecker.Capcha.ProcessCapcha(action, sts._capcha_type, sts._antigate_key, sts._antigate_no_alerts, threadIndex);
						XTChecker.Capcha._threadIndex = threadIndex;
						this._isCaptureDialog = false;
						if (XTChecker.Capcha._stopAll)
						{
							XToolCheckerThreads.ClearCurrentButton(threadIndex);
							XToolChecker.StopMulticheck();
							XTChecker.Capcha.ClearAll();
						}

						// выйдем - кнопка проверится еще раз
					}
					return;
				}
				else
				{
					if ((response.search(/не найдено/i) != -1) || (response.search(/нет информации об адресе/i) != -1))
					{
						if (isSecond)
						{
							//var btn = XToolCheckerThreads.GetThread(threadIndex)._clickedButton;
							//XToolCheckerThreads.SetCurrentButton(threadIndex, "", "", "", "red");
							if (btn.name.indexOf(cn._buttonGLPrefix) == 0)
							{
								XToolCheckerThreads.SetCurrentButton(threadIndex, "", "", "Cсылка не проиндексирована", "red");
								XToolChecker.AddGLToDatabase(XToolCheckerThreads.GetThread(threadIndex)._lastRequestedUrl, btn, btn.previousSibling.title, 0, "", false);
							}
							else
							{
								XToolCheckerThreads.SetCurrentButton(threadIndex, "", "", "Cтраница не в индексе", "red");
								XToolChecker.AddGPToDatabase(XToolCheckerThreads.GetThread(threadIndex)._lastRequestedUrl, btn, 0, "", false)
							}
							if ((btn.name.indexOf(cn._buttonGPPrefix) == 0)&&(cn._use_auto_select_gp))
							{
								XToolChecker.CheckIfRequired(docUrl, threadIndex, btn);
							}
							else if ((btn.name.indexOf(cn._buttonGLPrefix) == 0)&& (sts._use_auto_select_gl))
							{
								XToolChecker.CheckIfRequired(docUrl, threadIndex, btn);
							}
						}
						else
						{
							// Еще разок проверим
							btn.previousSibling.step = "2";
							XToolChecker.DebugMsg("Repeat GP/GL");
							return;
						}
						
					}
					else
						XToolCheckerThreads.SetCurrentButton(threadIndex, "---", "ER", "", "error");
				}
			}
			btn.previousSibling.step == "";
			XToolCheckerThreads.ClearCurrentButton(threadIndex);
			
		}
		
		btn.previousSibling.step == "";
	}
	catch (e)
	{
		btn.previousSibling.step == "";
		XToolChecker.MsgToConsole("ProcessGP error: " + e);
		XToolCheckerThreads.SetCurrentButton(threadIndex, "ER", "", "", "red");
	}
		
		XToolCheckerThreads.ClearCurrentButton(threadIndex);
		
		
	},


	DebugMsg : function (msg)
	{
		//if (this._debug)
			XToolChecker.MsgToConsole(msg);
	},
	
	ProcessGC : function(response,responseXML, threadIndex)
	{
	/*	var sts = XTSettings;
		var cn = XToolCheckerConst;
		try {
		
			var docUrl = XToolCheckerThreads.GetThread(threadIndex)._url;

			var btn = XToolCheckerThreads.GetThread(threadIndex)._clickedButton;
			if (!responseXML) {
				responseXML = XToolChecker.ConvertResponseToXml(response);			
			}
			if (responseXML)
			{
				var errors = responseXML.getElementsByTagName('error');
				if ((errors) && (errors.length > 0))
				{
					
					var code = -1;
					if (errors[0].hasAttribute("code"))
					{
						code = errors[0].getAttribute("code");
					}
					if (code == 15)
					{
						btn.previousSibling.step = "";
					
						// не нашли ничего
						XToolCheckerThreads.SetCurrentButton(threadIndex, "", "NO", "", "red");
						btn.title = "Cтраница не в индексе";
					}
					else
					{
						// Настоящая ошибка
						XToolCheckerThreads.SetCurrentButton(threadIndex, "ER", "ER", errors[0].textContent, "error")
					}
				}
				else
				{
					// вроде есть результат
					var docs = responseXML.getElementsByTagName('doc');
					var orig = [];
					var result = -1;
					var isDifferentCase = false;
					var isSlash = false;
					if (docs)
					{
						var href = btn.previousSibling.value;
						for (var i = 0; i < docs.length; i++)
						{
							var urls = docs[i].getElementsByTagName("url");
							if (urls)
							{
								var tmpUrl = urls[0].textContent;
								orig.push(tmpUrl);
								tmpUrl = XToolChecker.PrepareLink(tmpUrl);
								tmpUrl = tmpUrl.replace(/\'/g, "%27");
								if (tmpUrl == href)
								{
									result = i + 1;
									break;
								}
								if (tmpUrl.indexOf(href + "/") == 0)
								{
									result = i + 1;
									break;
								}
								if (tmpUrl.toLowerCase() == href.toLowerCase())
								{
									isDifferentCase = true;
								}
								if ((tmpUrl + "/" == href) || (href + "/" == tmpUrl))
								{
									isSlash = true;
								}
							}
						}
					}
					if (result != -1)
					{
						// +
						var titles = docs[result-1].getElementsByTagName("title");
						var titlePage = "";
						if ((titles) && (titles.length > 0))
						{
							titlePage = titles[0].textContent;							
						}
						else
						{
							titlePage = " ";
						}
						
		
	
					}
					else
					{
						// - 		
						if (btn.name.indexOf(cn._buttonGCPrefix) == 0)
						{
							XToolCheckerThreads.SetCurrentButton(threadIndex, "", "NO", "Cсылка не проиндексирована", "red");
						}					
					}
				}
				XToolCheckerThreads.ClearCurrentButton(threadIndex);
			}
			else
			{
				XToolCheckerThreads.SetCurrentButton(threadIndex, "---", "ER", "", "error");
				XToolCheckerThreads.ClearCurrentButton(threadIndex);
			}
		
	
		}
		catch (ex)
		{
			XToolChecker.MsgToConsole("ProcessGC error: " + ex);
			XToolCheckerThreads.SetCurrentButton(threadIndex, "---", "ER", "", "error");
			XToolCheckerThreads.ClearCurrentButton(threadIndex);
		}

*/



		var sts = XTSettings;
		var btn = XToolCheckerThreads.GetThread(threadIndex)._clickedButton;
		var cn = XToolCheckerConst;
		var docUrl = XToolCheckerThreads.GetThread(threadIndex)._url;
	try
	{
		var d = new Date();
		this._g_time = d.getTime();
		
		var isSecond = (btn.previousSibling.title == "2");
		{
			var text = response.replace(/\r\n/img, "");
			text = text.replace(/\n/img, "");
			var res = text.match(/<base[\s]+href=[\'\"]/ig);			
			if ((res) && (res.length > 0))
			{
				var res2 = text.match(/<title>(.*?)<\/title>/i);
				var title = "";
				if ((res2) && (res2.length > 1))
				{
					title = res2[1];
				}
				var res3 = text.match(/Она представляет собой снимок страницы по состоянию на ([^<>]*) GMT\. .* за прошедшее время могла измениться/i);
				if ((res3) && (res3.length > 1))
				{
					var date = XToolChecker.GetDateFromStringGC(res3[1]);
					var curDate = new Date();
					var mSecLeft = curDate.valueOf() - date.valueOf();
					var daysLeft = mSecLeft / 86400000; //миллисекунд в дне 1000*60*60*24 
					if ((sts._check_gc_days) && (daysLeft > sts._gc_days))
					{
						if (btn.name.indexOf(cn._buttonGCPrefix) == 0)
							XToolChecker.CheckIfRequired(docUrl, threadIndex, btn);
					}
					title = res3[1] + " (" +  Math.floor(daysLeft) + " дней назад) " + title;
					
				}
				XToolCheckerThreads.SetCurrentButton(threadIndex, "", "", title, "green");
			}
			else
			{
				var res = text.match(/Мы зарегистрировали подозрительный трафик, исходящий из вашей сети. Повторите запрос позднее./ig);
				
				if ((res) && (res.length > 0))
				{
					// Ой, капча :(

					XToolChecker.DebugMsg("CPT");
					XToolCheckerThreads.SetCurrentButton(threadIndex, "CPT", "ER", "", "error");
					if (XToolCheckerThreads.GetThread(threadIndex)._attempt == 0)
					{
						var d = new Date();
						this._cpt_time = d.getTime();
						return;
					}
					else
					{
						// 2 раза капча - значит кривые натройки.
						// 
					}
					
				}
				else
				{
					if (isSecond)
					{
						// нет или ошибка ?
						if (response.search(/Не найдено ни одного документа, соответствующего запросу/i) != -1)
						{
							
							XToolCheckerThreads.SetCurrentButton(threadIndex, "", "", "Cтраница не в кэше", "red");
							if (sts._use_auto_select_gc)
							{
								if (btn.name.indexOf(cn._buttonGCPrefix) == 0)
									XToolChecker.CheckIfRequired(docUrl, threadIndex, btn);
							}
							
						}
						else
						{
							// ничего не нашли
							XToolCheckerThreads.SetCurrentButton(threadIndex, "---", "ER", "", "error");
						}
					}
					else
					{
						// Еще разок проверим
						btn.previousSibling.title = "2";
						XToolChecker.DebugMsg("Repeat GC");
						return;
					}
				}
			}
			
		}
		
		
	}
	catch (e)
	{
		XToolChecker.MsgToConsole("ProcessGC error: " + e);
		XToolCheckerThreads.SetCurrentButton(threadIndex, "ER", "", "", "error");
	}
		btn.previousSibling.title = "";
		XToolCheckerThreads.ClearCurrentButton(threadIndex);
		
		
	},

	ProcessBG : function(response, threadIndex)
	{
		var cn = XToolCheckerConst;
		var sts = XTSettings;
		response = XToolChecker.ClearHTML(response);
		var text = response.replace(/\r\n/img, "");
		text = text.replace(/\n/img, "");

		var indexTitle = response.indexOf("div id=\"b_content\"");
		
		if (indexTitle != -1)
		{	
			if (response.search(/\<h[12]\>Результаты не найдены/i) != -1)
			{
				XToolCheckerThreads.SetCurrentButton(threadIndex, "", "", "Cтраница не в индексе", "red");
			}
			else
			{
				var res = text.match(/<h2[^\>]*><a[^\>]* href=[\'\"]{0,1}[^\'\"\s\>]*[\'\"]{0,1}[^\>]*>.*?<\/a>.*?<\/h2>/ig);
				var orig = [];
				var result = -1;
				var titlePage = "";
				if (res)
				{	
					var href = XToolCheckerThreads.GetThread(threadIndex)._clickedButton.previousSibling.value;
					for (var i = 0; i < res.length; i++)
					{
						var href2 = "";
						var res2 = res[i].match(/<h2[^\>]*><a[^\>]* href=[\'\"]{0,1}([^\'\"\s\>]*)[\'\"]{0,1}[^\>]*>(.*?)<\/a>.*?<\/h2>/i);
						if (res2)
						{
							if (res2.length > 1)
							{
								href2 = res2[1];
								href2 = href2.replace(/\&amp\;/g, "&");
								href2 = href2.replace(/\'/g, "%27");
								orig.push(href2);
								href2 = XToolChecker.PrepareLink(href2);
								if (res2.length > 2)
								{
									titlePage = res2[2].replace(/<[^>]*>/g, "");
								}
								if (href2 == href)
								{
									result = i + 1;
									break;
								}
								if (href2 == (href + "/"))
								{
									result = i + 1;
									break;
								}
							}
						}
						else
						{
							
						}
					}
				}
				XToolChecker.DebugMsg("result = " +result);
				if (result != -1)
				{
					// +
					XToolCheckerThreads.SetCurrentButton(threadIndex, "", orig[i], titlePage, "green");
				
				}
				else
				{
					// - 	
			
					{
						XToolCheckerThreads.SetCurrentButton(threadIndex, "ER", "ER", "", "error");
					}
				}
			}
		}
		else
		{
		
			XToolChecker.DebugMsg("else");
			var res = text.match(/<form[\s]+action=\"Captcha/ig);
			if ((res) && (res.length > 0))
			{
				// Ой, капча :(
				XToolChecker.DebugMsg("CPT");
				
				
				if (!this._isCaptureDialog)
				{
					//XToolCheckerThreads.SetCurrentButton(threadIndex, "CPT", "CPT", "", "error");
					// Чтобы не было таймаута
					XToolCheckerThreads.GetThread(threadIndex)._xmlHttpObj = 0;
					// откроем окошко с капчей
					this._isCaptureDialog = true;
					var action = XToolCheckerThreads.GetThread(threadIndex)._action;
					if (action.indexOf("http://") != 0) 
						action = "http://www.bing.com/search?q=1";
					XTChecker.Capcha.ProcessCapcha(action, sts._capcha_type, sts._antigate_key, sts._antigate_no_alerts);
					this._isCaptureDialog = false;
					if (XTChecker.Capcha._stopAll)
					{
						XToolCheckerThreads.ClearCurrentButton(threadIndex);
						XToolChecker.StopMulticheck();
						XTChecker.Capcha.ClearAll();
					}

					// выйдем - кнопка проверится еще раз
				}
				return;
			}
			
		}
		XToolCheckerThreads.ClearCurrentButton(threadIndex);
	},

	
	ProcessTIC : function(response, threadIndex)
	{
	    console.log("ProcessTIC");
		try
		{
			var cn = XToolCheckerConst;
			var sts = XTSettings;
			var docUrl = XToolCheckerThreads.GetThread(threadIndex)._url;
			var urlOnPage = false;
			var value = -1;
			response = XToolChecker.ClearHTML(response);
			var text = response.replace(/\r\n/img, "");
			XToolChecker.DebugMsg("text: " + text);
			text = text.replace(/\n/img, "");
			XToolChecker.DebugMsg("text: " + text);
			if (XToolChecker.HasCapchaYnd(text))
			{
				XToolCheckerThreads.SetCurrentButton(threadIndex, "CPT", "CPT", "", "error");
				XToolCheckerThreads.ClearCurrentButton(threadIndex);
				XToolChecker.StopMulticheck();
				XTChecker.Capcha.ClearAll();
				return;
				/*if (!this._isCaptureDialog)
				{
					//XToolCheckerThreads.SetCurrentButton(threadIndex, "CPT", "CPT", "", "error");
					// Чтобы не было таймаута
					XToolCheckerThreads.GetThread(threadIndex)._xmlHttpObj = 0;
					this._isCaptureDialog = true;
					var action = XToolCheckerThreads.GetThread(threadIndex)._action;
					if ((action.indexOf("http://") != 0) && (action.indexOf("https://") != 0) )
						action = "http://yandex.ru/yandsearch?text=";
					XTChecker.Capcha.ProcessCapcha(action, sts._capcha_type, sts._antigate_key, sts._antigate_no_alerts);
					XToolChecker.DebugMsg("Closed");
					this._isCaptureDialog = false;
					if (XTChecker.Capcha._stopAll)
					{
						XToolCheckerThreads.ClearCurrentButton(threadIndex);
						XToolChecker.StopMulticheck();
						XTChecker.Capcha.ClearAll();
					}
					// выйдем - кнопка проверится еще раз
				}
				else
					XToolChecker.DebugMsg("Dialog is opened");
				return;*/
			}
			

			var res3 = text.match(/<a[^\>]*href=\"[^\"]*\"[^\>]*>.*?<\/a>/ig);
			var btn = XToolCheckerThreads.GetThread(threadIndex)._clickedButton;
			var href = XToolChecker.GetDomainName(XToolChecker.PrepareLink(btn.previousSibling.value));
			if ((res3) && (res3.length > 0))
			{
				
				for (var k = 0; k < res3.length; k++)
				{
					var res2 = res3[k].match(/<a[^\>]*href=\"([^\"]*)\"[^\>]*>.*?<\/a>/i);
					if ((res2) && (res2.length > 1))
					{
						
						var href2 = res2[1];
						href2 = href2.replace(/\&amp\;/g, "&");
						href2 = href2.replace(/\'/g, "%27");
						href2 = XToolChecker.GetDomainName(XToolChecker.PrepareLink(href2));
						
						XToolChecker.DebugMsg(href2 +" == " + href);
						if (href2 == href)
						{
							urlOnPage = true;
							break;
						}
						if (href2 == (href + "/"))
						{
							urlOnPage = true;
							break;
						}
						if (href2.toLowerCase() == href.toLowerCase())
						{
							urlOnPage = true;
							break;
						}
						if ((href2 + "/" == href) || (href + "/" == href2))
						{
							urlOnPage = true;
							break;
						}
					}
				}
			}
						


			console.log(text);
			var res = text.match(/<tcy [^>]* value=\"([0-9]+)\"\/>/i);
			console.log(res);
			
			
			if (res && (res.length > 1))
			{
				value = res[1];
				XToolCheckerThreads.SetCurrentButton(threadIndex, value, "", "тИЦ = " + value, "green");
			}
		
			if (sts._use_auto_select_tic)
			{
				try
				{
					var btn = XToolCheckerThreads.GetThread(threadIndex)._clickedButton;
					var tic = -1;
					value = value.replace(String.fromCharCode(8239), "");
					if (value != "") 
						tic = parseInt(value);
					if ((tic != -1) && ( tic < sts._ticValue))
					{
						XToolChecker.CheckIfRequired(docUrl, threadIndex, btn);
					}
				}
				catch (e)
				{
					XToolChecker.DebugMsg("ProcessTIC: " + e);
				}
				
			}
			
		}
		catch(e)
		{
			XToolChecker.MsgToConsole("ProcessTIC error: " + e);
			XToolCheckerThreads.SetCurrentButton(threadIndex, "---", "ER", "", "error");
		}
		
		XToolCheckerThreads.ClearCurrentButton(threadIndex);
	},
	
	SetImageToPage : function(doc, tabId, info, b64)
	{
		//var src = "data:image/gif;base64," + b64;
		console.log(b64);
		info.src = b64;
		XTBrowserTools.SetImageSrc(doc, tabId, info);	
	},
	
	ProcessTrf : function(response, threadIndex)
	{

		console.log("processtrf");
		var sts = XTSettings;
		var docUrl = XToolCheckerThreads.GetThread(threadIndex)._url;
		var sts = XTSettings;
		var cn = XToolCheckerConst;
		try {

			//
			XToolChecker.DebugMsg(response);
			response = response.replace(/\\\\\"/g, "####quote####");
			response = response.replace(/\\\"/g, "####quote####");
			var result = JSON.parse(response);
			XToolChecker.ProcessJSONObject(result);
			if ((result.ErrorCode !== undefined) && (result.ErrorCode != 200))
			{
				XToolChecker.DebugMsg(result.Error);
				XToolCheckerThreads.SetCurrentButton(threadIndex, "ER", "", JSON.parse('"' + result.Error + '"'),  "red");
				XToolCheckerThreads.ClearCurrentButton(threadIndex);
				return;
			}
			result = result.trf;
			if (result && result.trf) {
				var visitors = -1;
				//var hits = -1;
				var error = "";
				var btn = XToolCheckerThreads.GetThread(threadIndex)._clickedButton;
				var visStr = result.trf;
				visStr = visStr.replace(/\;/g, "");
				visStr = visStr.trim();
				let color = 'green';
				try 
				{
					visitors = parseInt(visStr);
				}
				catch (e)
				{
					XToolChecker.DebugMsg("Can't parse " + visStr);
				}
				if (visitors == -1) {
					color = 'red';
				}
				if (sts._use_auto_select_vis)
				{
					XToolChecker.DebugMsg("value = " + visitors);
					XToolChecker.DebugMsg("visValue = " +sts._visValue);
					if ((sts._visValue > visitors && visitors >= 0) ||
					    (sts._use_auto_select_no_trf && visitors == -1)) {
						XToolChecker.DebugMsg("checking");
						XToolChecker.CheckIfRequired(docUrl, threadIndex, btn);
					}
				}

				if (sts._use_highlight_trf && sts._trfHighlightValue > visitors && visitors >= 0) {
					color = 'yellow';
						
				}
		
				XToolCheckerThreads.SetCurrentButton(threadIndex, result.trf, "", "", color);
			
			} else {
				XToolCheckerThreads.SetCurrentButton(threadIndex, "ER", "", "", "red");
			}
		

			

		}
		catch (e)
		{
			XToolChecker.MsgToConsole("ProcessXT error: " + e);
			XToolCheckerThreads.SetCurrentButton(threadIndex, "ER", "", "", "red");
		}
		XToolCheckerThreads.ClearCurrentButton(threadIndex);


		
	},
	

	GetYM :function(text)
	{ 
	try{
		
			var res = text.match(/Ya\.Metrika\(\{id\:([0-9]*)\,/i);
			if (res && (res.length > 1))
			{
				return "http://bs.yandex.ru/informer/" +res[1]+ "/3_0_6CA1C6FF_4C81A6FF_1_pageviews";
			}
			var res1 = text.match(/<a[\s]+href=[\'\"]https:\/\/metrika.yandex.ru[^>]*><img[\s]+src=[\'\"](.*?)[\'\"].*?<\/a>/i);
			if (res1 && (res1.length > 1))
			{
				return res1[1];
			}
			else 
				return "about:blank";
		}
		catch(e)
		{
			XToolChecker.ReportError("CheckYI: ", e);
		}					
	},

	MsgToConsole : function(message)
	{
		if (message)
			console.log(message);
	},
	
	GetTextOnly : function (htmlText, noAncors)
	{
		var result = htmlText;
		if (noAncors)
			result = result.replace(/<a [^<>]+>.*?<\/a>/ig, "");
		
		result = result.replace(/<[^<>]+>/ig, "");
		result = result.replace(/\t/g, "");
		result = result.replace(/\n/g, " ");
		result = result.replace(/\r/g, " ");
		while (result.match(/\s\s/))
			result = result.replace(/\s\s/g, " ");
		return result;
	},
	
	html_entity_decode : function( result) 
	{  
		// Поскольку нас интересует только длина - заменим просто на "_" или " "
		result = result.replace(/&nbsp;/g, " ");
		result = result.replace(/&[a-z]+;/g, "_");
		result = result.replace(/&#[0-9]{1,3};/g, "_");
		return result;  
	},
	

	
	ProcessPOS : function(response, threadIndex)
	{
	try {
		var sts = XTSettings;
		var href = XToolCheckerThreads.GetThread(threadIndex)._lastRequestedUrl;//this._lastRequestedUrl;
		var btn = XToolCheckerThreads.GetThread(threadIndex)._clickedButton;
		var docUrl = XToolCheckerThreads.GetThread(threadIndex)._url;
		var hidden = btn.previousSibling;
		var url = hidden.alt;
		console.log("urrl="+url);
		if (url == "")
		{
			XToolChecker.MsgToConsole("link_id для POS не найден на странице");
			XToolCheckerThreads.SetCurrentButton(threadIndex, "", "", "", "red","", true);
			XToolCheckerThreads.ClearCurrentButton(threadIndex);
		}
		else if (url.indexOf(".") == -1) // нет точки. значит url еще не известен
		{
			if (url.indexOf("promopult") == 0)
			{
				var result = "";
				var res = response.match(/<td[\s]+class=\"left\"><nobr><a[\s]+href=[\'\"\s]{1}[^\'\"\s\>]*[\'\"\s][^>]*>\/<\/a><\/nobr><\/td>/ig);
				if ((res) && (res.length > 0))
				{
					result = res[0].replace(/<td[\s]+class=\"left\"><nobr><a[\s]+href=[\'\"\s]/, "");
					var index = result.indexOf("\"");
					result = result.substring(0, index);
					// нашли - запоминаем
					try
					{
						while (url.indexOf("\"") != -1)
							url = url.replace("\"", "&quot;");
						var sqlText = 'INSERT OR REPLACE INTO xt_prj(link_id, url) VALUES  (\"' + url + '\",\"' + result + '\")';
						//*//XToolChecker._mDBConn.executeSimpleSQL(sqlText);
					}
					catch(e)
					{
						XToolChecker.MsgToConsole("Sqlite error: " + XToolChecker._mDBConn.lastErrorString);
					}
					console.log("setting");
					hidden.alt = result;
				}
				else
				{
					XToolChecker.MsgToConsole("Url для POS не найден на странице");
					XToolCheckerThreads.SetCurrentButton(threadIndex, "ER", "", "", "error","", true);
					XToolCheckerThreads.ClearCurrentButton(threadIndex);

				}

			}
			else
			{
				var result = "";
				var res = response.match(/<span[\s]+style=\"display:[\s]*none[;]?\"[\s]+class=\"wink_plugin\">URL:[\s]+<a[^\>]+href=[\'\"\s]{1}[^\'\"\s\>]*[\'\"\s]{1}/ig);
				if ((res) && (res.length > 0))
				{
					result = res[0].replace(/<span[\s]+style=\"display:[\s]*none[;]?\"[\s]+class=\"wink_plugin\">URL:[\s]+<a[^\>]+href=[\'\"\s]{1}/, "");
					result = result.replace("\"", "");
					result = result.replace("\'", "");
					result = XToolChecker.PrepareRawLink(result);
					// нашли - запоминаем
					try
					{
						while (url.indexOf("\"") != -1)
							url = url.replace("\"", "&quot;");
						var sqlText = 'INSERT OR REPLACE INTO xt_prj(link_id, url) VALUES  (\"' + url + '\",\"' + result + '\")';
						//*//XToolChecker._mDBConn.executeSimpleSQL(sqlText);
					}
					catch(e)
					{
						XToolChecker.MsgToConsole("Sqlite error: " + XToolChecker._mDBConn.lastErrorString);
					}
					console.log("setting");
					hidden.alt = result;
					// ничего не трогаем - должно пойти еще раз по этой кнопке
				}
				else
				{
					XToolChecker.MsgToConsole("Url для POS не найден на странице");
					XToolCheckerThreads.SetCurrentButton(threadIndex, "ER", "", "", "error","", true);
					XToolCheckerThreads.ClearCurrentButton(threadIndex);
				}
			}
		}
		else
		{
			var jsOnPage = false;
			if (response.indexOf(sts._jsPosValue)!= -1)
				jsOnPage = true;
			response = XToolChecker.ClearHTML(response); 
			if (sts._pos_ignore_noindex)
				response = response.replace(/<noindex(\w|\W)*?\/noindex>/ig,"");		
			url = url.toLowerCase();
			if (url[url.length-1] == '/')
			{
				url = url.substring(0, url.length - 1);
			}
		
			if (url.indexOf('http://') == 0)
			{
				url = url.substring(7);
			}
			if (url.indexOf('https://') == 0)
			{
				url = url.substring(8);
			}
			var lurl = url;
			if (sts._pos_domain)
			{
				lurl = XToolChecker.GetDomainName(url);
			}
			else
			{
				if ((url.indexOf('www.') == 0) && (url.lastIndexOf('.') > 5))
				{
					lurl = url.substring(4);
				}
			}
			console.log(lurl);
			var res = response.match(/<a[^\>]+href[\s]{0,1}=[\s]{0,1}[\'\"]{0,1}([^\'\"\s\>]*)[\'\"\s]{0,1}/ig);
			if (sts._pos_ignore_noindex && 
				((response.search(/<meta[^\>]+name=[\'\"\s]{1}robots[\'\"\s]{1}[^\>]+content=[\'\"\s]{1}noindex[\'\"\s]{1}/i) != -1) ||
				(response.search(/<meta[^\>]+name=[\'\"\s]{1}robots[\'\"\s]{1}[^\>]+content=[\'\"\s]{1}noindex[\s]*,[\s]*nofollow[\'\"\s]{1}/i) != -1) ||
				(response.search(/<meta[^\>]+name=[\'\"\s]{1}robots[\'\"\s]{1}[^\>]+content=[\'\"\s]{1}none[\'\"\s]{1}/i) != -1)))
			{
				res = 0;
			}
			if (sts._pos_ignore_nofollow && 
				(response.search(/<meta[^\>]+name=[\'\"\s]{1}robots[\'\"\s]{1}[^\>]+content=[\'\"\s]{1}nofollow[\'\"\s]{1}/i) != -1) ||
				(response.search(/<meta[^\>]+name=[\'\"\s]{1}robots[\'\"\s]{1}[^\>]+content=[\'\"\s]{1}noindex[\s]*,[\s]*nofollow[\'\"\s]{1}/i) != -1) ||
				(response.search(/<meta[^\>]+name=[\'\"\s]{1}robots[\'\"\s]{1}[^\>]+content=[\'\"\s]{1}none[\'\"\s]{1}/i) != -1))
			{
				res = 0;
			}

			var founded = false;
			var result = 0;
			var allTextLength = 0;
			var afterSize = 0;
			var nearExtLinks = 0;
			if (res)
			{
				for (var i = 0; i < res.length; i++)
				{
					var link = res[i].replace(/<a[^\>]+href[\s]{0,1}=[\s]{0,1}[\'\"]{0,1}/, "");
					link = link.replace(/[\'\"]/g, "\"");
					link = link.toLowerCase();
					if (link[link.length-1] == '\"')
					{
						link =link.substring(0, link.length - 1);
					}
					if (link[link.length-1] == '/')
					{
						link =link.substring(0, link.length - 1);
					}
					if ((link.indexOf("http://"+lurl) == 0) || (link.indexOf("http://www."+lurl) == 0 )
						|| (link.indexOf("https://"+lurl) == 0) || (link.indexOf("https://www."+lurl) == 0 ))
					{
						response = XToolChecker.html_entity_decode(response);
						var index = response.indexOf(res[i]);
						var posText = response.substring(0, index);
						var beforeResp = posText;
						var lastText = response.substring(index + res[i].length, response.length);
						var afterResp = lastText;
						var index = lastText.toLowerCase().indexOf("<\/a>");
						if (index != -1)
							lastText = lastText.substring(index + 4, lastText.length);
						var allText = XToolChecker.GetTextOnly(response, false);
						var after = XToolChecker.GetTextOnly(lastText, false);
						allTextLength = allText.length;
						posText = XToolChecker.GetTextOnly(posText, false);
						var posLength = posText.length;
						afterSize = after.length;
						founded = true;
						result = Math.floor((posLength / allTextLength) * 10) + 1 ;
						// ищем ссылки рядом
						var bCount = XToolChecker.GetCountExt(beforeResp, true, threadIndex);
						//XToolChecker.DebugMsg("beforeResp = " + beforeResp);
						var aCount = XToolChecker.GetCountExt(afterResp, false, threadIndex);
						//XToolChecker.DebugMsg("afterResp = " + afterResp);
						//XToolChecker.DebugMsg("bCount = " + bCount);
						//XToolChecker.DebugMsg("aCount = " + aCount);
						nearExtLinks = bCount + aCount;
						//before = before.replace(/<a[^\>]+href[\s]{0,1}=[\s]{0,1}[\'\"]{0,1}\#\#\#link([0-9]+)\#\#\#[\'\"\s]{0,1}[^\>]*\>.*?\<\/a\>/g, "###ext$1###");
						break;
					}
				
				
				}
			}
			else
			{
				XToolCheckerThreads.SetCurrentButton(threadIndex, "", "", "", "red","", true);
			}
			if (founded && ((!sts._checkJsForPos) || (!jsOnPage)))
			{
				XToolCheckerThreads.SetCurrentButton(threadIndex, "", "", "", "green","", true);
			}
			else
			{
				XToolCheckerThreads.SetCurrentButton(threadIndex, "", "", "", "red","", true);
			}
			
			result = result / 10;
			if ((result > 0.4) && (afterSize < 150))
				result = 1;
			
			if ((result == 1) && (afterSize > 150))
				result = 0.9;
			var title = "";
			if (afterSize != 0)
				title += "Размер текста после ссылки: " + afterSize;
		    if (jsOnPage)
				title += "		В коде страницы найден текст: " + sts._jsPosValue +" !";
			
			if (nearExtLinks != 0)
				title += "		Внешних ссылок рядом: " + nearExtLinks;
			var color = "";
			if ((sts._mark_pos_near) && (nearExtLinks > sts._posNearValue))
			{
				color = "yellow";
			}
			XToolCheckerThreads.SetCurrentButton(threadIndex, result, "", title, color,"", true);
				
			if (((sts._use_auto_select_pos) && ((result > sts._posValue) || (result == 0))) || ((sts._checkJsForPos) && (jsOnPage)))
			{
				if (XToolChecker.IsPageToCheck(docUrl))
				{
					XToolChecker.SetCheckForButton(threadIndex,btn);
				}
			}
			

			XToolCheckerThreads.ClearCurrentButton(threadIndex);
		}
		}
		catch (e)
		{
			XToolChecker.MsgToConsole("ProcessPOS error: " + e);
			XToolCheckerThreads.SetCurrentButton(threadIndex, "ER", "", "", "red","", true);
			if ((sts._use_auto_select_pos) && (sts._posCheckErr) && (url.indexOf(".") != -1))
			{
				if (XToolChecker.IsPageToCheck(docUrl))
				{
					XToolChecker.SetCheckForButton(threadIndex,btn);
				}
			}
			XToolCheckerThreads.ClearCurrentButton(threadIndex);
		}
		
	},



	GetCountExt : function(response, end, threadIndex)
	{
		var sts = XTSettings;
		response = response.replace(/\r\n/img, " ");
		response = response.replace(/\n/img, " ");
		response = XToolChecker.ClearHTML(response);
		if (this._skipBCNoIndex)
			response = response.replace(/<noindex(\w|\W)*?\/noindex>/ig,"");
		var href = XToolCheckerThreads.GetThread(threadIndex)._lastRequestedUrl;//this._lastRequestedUrl;
		var url = XToolChecker.GetDomainName(href);
		var urlLength = href.length;
		if (url.indexOf('http://') == 0)
		{
			url = url.substring(7);
			urlLength -= 7;
		}
		if (url.indexOf('https://') == 0)
		{
			url = url.substring(8);
			urlLength -= 8;
		}
		var lurl = url;
		if ((url.indexOf('www.') == 0) && (url.lastIndexOf('.') > 5))
		{
			lurl = url.substring(4);
			urlLength -= 4;
		}
		
		//Тут посчитаем:
		var res = response.match(/<a[^\>]+href[\s]{0,1}=[\s]{0,1}[\'\"]{0,1}([^\'\"\s\>]*)[\'\"\s]{0,1}[^\>]*\>.*?\<\/a\>/ig);
		var intCnt = 0;
		var extCnt = 0;
		var unique = [];
		var imgList = [];
		var extLinks = [];

		if (res)
		{
			for (var i = 0; i < res.length; i++)
			{
				var link = res[i].replace(/<a[^\>]+href[\s]{0,1}=[\s]{0,1}[\'\"]{0,1}/i, "");
				var isImg = false;
				if ((sts._skipBCNoFollow) && (link.search(/\srel[\s]{0,1}=[\s]{0,1}[\'\"]{0,1}nofollow[\'\"]{0,1}[\s]{0,1}/i) != -1))
					continue;
				if (link.toLowerCase().indexOf("<img") != -1)
					isImg = true;
				var index = link.indexOf("\"");
				if (index == -1)
					index = link.indexOf("\'");
				if (index == -1)
					index = link.indexOf(" ");
				if (index == -1)
					continue;
				link = link.substring(0, index);
				link = link.toLowerCase();
				var linkParts = link.split("#");
				if (linkParts.length > 0)
					link = linkParts[0];
				link = link.trim();
				if (isImg)
				{					
					var isInList = false;
					for (var j = 0; j < imgList.length; j++)
						if (imgList[j] == link)
							isInList = true;
					if (!isInList)
					{
						imgList.push(link);
					}
				}
				else
				{
					var isInList = false;
					for (var j = 0; j < unique.length; j++)
						if (unique[j] == link)
							isInList = true;
					if (!isInList)
					{
						unique.push(link);
					}
				}
			}
			
			for (var i = 0; i < unique.length; i++) 
			{ 
				var a = unique[i];
				if ((a.indexOf("#") == 0) || (a.indexOf("mailto:") == 0))
					continue;

				if (!XToolChecker.IsInternal(a, lurl))  
				{ 
					var skip = false;
					for (var k = 0; k < sts._bcDomainsList.length; k++)
					{
						var url = sts._bcDomainsList[k];
						if (url.indexOf('http://') == 0)
						{
							url = url.substring(7);
						}
						if (XToolChecker.IsInternal(a, url))
						{
							skip = true;
							break;
						}
				
					}
					if (skip)
						continue;

					extLinks.push(a);
				}       
			 } 
			 for (var i = 0; i < imgList.length; i++) 
			{ 
				var a = imgList[i];
				if ((a.indexOf("#") == 0) || (a.indexOf("mailto:") == 0))
					continue;

				if (!XToolChecker.IsInternal(a, lurl))
				{ 
					var skip = false;
					for (var k = 0; k < sts._bcDomainsList.length; k++)
					{
						var url = sts._bcDomainsList[k];
						if (url.indexOf('http://') == 0)
						{
							url = url.substring(7);
						}
						if (XToolChecker.IsInternal(a, url))
						{
							XToolChecker.DebugMsg("int= " + a);
							skip = true;
							break;
						}
				
					}
					if (skip)
						continue;
					if ((!sts._skipBCBlockImg) && (!sts._skipBCImg))
					{
						extLinks.push(a);
						
					}
				}       
			 } 
			
		  }
		  else
		  {
			
		  }  
		  var blockFound = false;
		  var maxBlockLinks = 0;
		  // определяем блоки внешних ссылок
		  //if (sts._useBlock)
		  {
			 //  XToolChecker.DebugMsg("ext = " + extLinks.length);
				if ((extLinks.length > 0) )
				{
					var block = response;
					var domains = [];
					for (var i = 0; i < extLinks.length; i++) 
					{
						var preparedLink = extLinks[i];//.replace(/([^0-9a-z])/ig, '\\$1')
						/*var skip = false;
						for (var k = 0; k < this._bcDomainsList.length; k++)
						{
							var url = this._bcDomainsList[k];
							if (url.indexOf('http://') == 0)
							{
								url = url.substring(7);
							}
							if (XToolChecker.IsInternal(preparedLink, url))
							{
								skip = true;
								break;
							}
					
						}
						if (skip)
							continue;*/
						var domain = XToolChecker.GetDomainName(preparedLink).toLowerCase();
						var index = -1;
						for (var j = 0; j < domains.length; j++)
						{
							if (domains[j] == domain)
							{
								index = j;
								break;
							}
						}
						if (index == -1)
						{
							domains.push(domain);
							index = domains.length - 1;
						}
						//var reg = new RegExp('<a[^\>]+href[\s]{0,1}=[\s]{0,1}[\'\"]{0,1}' + preparedLink + '[\'\"\s]{0,1}[^\>]*\>.*?\<\/a\>','i');
						block = block.replace(preparedLink, "###link" + index + "###");
						
					}
					//var reg = new RegExp('/<a[^\>]+href[\s]{0,1}=[\s]{0,1}[\'\"]{0,1}\#\#\#link\#\#\#[\'\"\s]{0,1}[^\>]*\>.*?\<\/a\>/','i');
					block = block.replace(/<a[^\>]+href[\s]{0,1}=[\s]{0,1}[\'\"]{0,1}\#\#\#link([0-9]+)\#\#\#[\'\"\s]{0,1}[^\>]*\>.*?\<\/a\>/g, "###ext$1###");
					// вырезаем теги
					block = block.replace(/<[^>]*>/g, "");
					block = block.replace(/^\s+|\s+$/g, '');
					block = block.replace(/^\&nbsp\;|\&nbsp\;$/g, '');
					var pos = 0;
					var endPos = -1;
					var oldPos = 0;
					var blockLinks = 0
					var oldPosEnd = 0;
					var startFirstBlock = -1;
					var endLastBlock = -1;
					var doms = [];
					do
					{
						oldPos = oldPosEnd;
						pos = block.indexOf("###ext", oldPosEnd + 1);
						
						if (pos != -1)
						{
							endPos = block.indexOf("###", pos + 1);
							if (endPos != -1)  
								endPos += 3;	
						}
						if (!end && startFirstBlock == -1)
						{
							
							if (pos > this._bcLinksTextLength)
							{
								return 0;
							}
							
							startFirstBlock = pos;
						}
						oldPosEnd = block.indexOf("###", pos + 6);
						var number = block.substring(pos,  oldPosEnd + 3);
						oldPosEnd += 3;
						if ((blockLinks > 0) && (pos != -1))
						{
							if ((pos - oldPos/* - 9*/) <= this._bcLinksTextLength)
							{
								var newLink = true;
								for (var j = 0; j < domains.length; j++)
								{
									if (doms[j] == number)
									{
										newLink = false;
										break;
									}
								}
								if (newLink)
									blockLinks++;
							}
							else
							{
								
								if (!end)
								{
								
									return blockLinks;
								}
								else
								{
									if (end && (pos == -1))
									{
										if ((endPos != -1) && (block.length - endPos <= this._bcLinksTextLength))
										{
											return blockLinks;
										}
									}
									if (blockLinks > maxBlockLinks)
										maxBlockLinks = blockLinks;
									doms = [];
									doms.push(number);
									blockLinks = 1;
								}
							}
						}

						if (blockLinks >= this._bcLinkCount )
						{
							blockFound = true;
							//break;
						}
						if ((oldPos == 0) && (pos != -1))
						{
							blockLinks = 1;
							doms = [];
							doms.push(number);
						}
					} while (pos != -1);
					if (!end && (pos == -1))
					{
						return blockLinks;
					}
					if (end && (pos == -1))
					{
						
						if ((endPos != -1) && (block.length - endPos <= this._bcLinksTextLength))
						{
							return blockLinks;
						}
					}
					if (blockLinks > maxBlockLinks)
						maxBlockLinks = blockLinks;
				}
		  }
		  return 0;
	},

	ProcessINY : function(response, responseXML, threadIndex)
	{
	try {
		var sts = XTSettings;
		var cn = XToolCheckerConst;
		var docUrl = XToolCheckerThreads.GetThread(threadIndex)._url;
		//var qType = XToolCheckerThreads.GetThread(threadIndex)._currentQueryType;
		//if (qType == 2)
		{
			var btn = XToolCheckerThreads.GetThread(threadIndex)._clickedButton;
			if (!responseXML) {
				responseXML = XToolChecker.ConvertResponseToXml(response);			
			}
			if (responseXML)
			{
				var errors = responseXML.getElementsByTagName('error');
				if ((errors) && (errors.length > 0))
				{
					
					var code = -1;
					if (errors[0].hasAttribute("code"))
					{
						code = errors[0].getAttribute("code");
					}
					if (code == 15)
					{
						if (btn.name.indexOf(cn._buttonINYPrefix) != -1)
						{
							var isSecond = (btn.previousSibling.step == "2");
							if (!isSecond)
							{
								btn.previousSibling.step = "2";
								XToolChecker.DebugMsg("Repeat iny");
								return;
							}
							else
							{
								// не нашли ничего
								XToolCheckerThreads.SetCurrentButton(threadIndex, "0", "", "0", "red");
								if (sts._use_auto_select_iny)
								{
									if (XToolChecker.IsPageToCheck(docUrl))
									{
										XToolChecker.SetCheckForButton(threadIndex,btn);
									}
								}	
							}
						}
						else if (btn.name.indexOf(cn._buttonRLVPrefix) != -1)
						{
							if ((0 < sts._rlvHighlightValue) && (sts._use_highlight_rlv))
							{
								color = "yellow";
							}
							if (0 < sts._rlvValue)
							{
								if (sts._use_auto_select_rlv)
								{
									if (XToolChecker.IsPageToCheck(docUrl))
									{
										XToolChecker.SetCheckForButton(threadIndex,btn);
									}
								}
							}
							XToolCheckerThreads.SetCurrentButton(threadIndex, "0", "", "0", "red");
						
						}
					
					}
					else
					{
						// Настоящая ошибка
						XToolCheckerThreads.SetCurrentButton(threadIndex, "ER", "ER", "xml.yandex.ru: " + errors[0].textContent, "error")
					}
				}
				else
				{
					// вроде есть результат
					var found = responseXML.getElementsByTagName('found');
					if (found && found.length > 0)
					{
						var val = "";
						for (var j =0; j < found.length; j++)
						{
							if (found[j].getAttribute("priority") == 'all')
							{
								val = found[j].textContent;
								break;
							}
						}
						var pages = 0;
						try 
						{
							pages = parseInt(val.trim());
						}
						catch (e)
						{
						
						}
						var color = "green";
						if (btn.name.indexOf(cn._buttonINYPrefix) != -1) {
							
							if (pages < sts._inyValue)
							{
								color = "yellow";
								if (pages == 0)
									color = "red";
								if (sts._use_auto_select_iny)
								{
									if (XToolChecker.IsPageToCheck(docUrl))
									{
										XToolChecker.SetCheckForButton(threadIndex, btn);
									}
								}
							}
						} 
						else if (btn.name.indexOf(cn._buttonRLVPrefix) != -1)
						{
							if ((pages < sts._rlvHighlightValue) && (sts._use_highlight_rlv))
							{
								color = "yellow";
							}
							if (pages < sts._rlvValue)
							{
								if (sts._use_auto_select_rlv)
								{
									if (XToolChecker.IsPageToCheck(docUrl))
									{
										XToolChecker.SetCheckForButton(threadIndex,btn);
									}
								}
							}
							
						}					
						XToolCheckerThreads.SetCurrentButton(threadIndex, val, "", val, color);
					}
					
				}
				btn.previousSibling.step = "";
				XToolCheckerThreads.ClearCurrentButton(threadIndex);
			}
			else
			{
				btn.previousSibling.step = "";
				XToolCheckerThreads.SetCurrentButton(threadIndex, "---", "ER", "", "error");
				XToolCheckerThreads.ClearCurrentButton(threadIndex);
			}
		}
	//	else if ((qType == 6) || (qType == 7))
		/*{
			var text = response.replace(/\r\n/img, "");
			text = text.replace(/\n/img, "");
			if (XToolChecker.HasCapchaYnd(text))
			{
				XToolCheckerThreads.SetCurrentButton(threadIndex, "CPT", "CPT", "", "error");
				XToolCheckerThreads.ClearCurrentButton(threadIndex);
				XToolChecker.StopMulticheck();
				XTChecker.Capcha.ClearAll();
				return;
			}
			// было ли что-то найдено
			var indexTitle = response.indexOf("action=\"\/yandsearch\"");// role=\"search\"");
			if (indexTitle == -1)
				indexTitle = response.indexOf("action=\"\/familysearch\"");// role=\"search\"");
			if (indexTitle == -1)
				indexTitle = response.indexOf("action=\"\/search\/\"");
			if (indexTitle == -1)
				indexTitle = response.indexOf("action=\"\/search\/family\"");
			if (indexTitle != -1)
			{
				var btn = XToolCheckerThreads.GetThread(threadIndex)._clickedButton;
				console.log(btn);
				var res = text.match(/var title[\s]+\=[\s]+\"[^\"]*? Яндекс: наш[^\s]*[\s]+([^\"]*?)[\s]+ответ[^\"]*?/i);
				if (!((res) && (res.length > 1)))
				{					
					res = text.match(/document\.title[\s]+\=[\s]+\"[^\"]*? Яндекс: наш[^\s]*[\s]+([^\"]*?)[\s]+ответ[^\"]*?/i);
				}
				if (!res)
				{
					res = text.match(/document\.title \= \"[^\"]*? Яндекс: знайшл[^\s]*[\s]+([^\"]*?)[\s]+відпові[^\"]*?/i);
					if (!((res) && (res.length > 1)))
					{
						res = text.match(/var title \= \"[^\"]*? Яндекс: знайшл[^\s]*[\s]+([^\"]*?)[\s]+відпові[^\"]*?/i);
					}
				}
				if (!res)
				{
					res = text.match(/document\.title \= \"[^\"]*? Яндекс:[\s]+([^\"]*?)[\s]+жауап табылды[^\"]*?/i);
					if (!((res) && (res.length > 1)))
					{
						res = text.match(/var title \= \"[^\"]*? Яндекс:[\s]+([^\"]*?)[\s]+жауап табылды[^\"]*?/i);
					}
				}
				if (!res)
				{
					res = text.match(/document\.title \= \"[^\"]*? Яндекс: знайш[^\s]*[\s]+([^\"]*?)[\s]+адказ[^\"]*?/i);
					if (!((res) && (res.length > 1)))
					{
						res = text.match(/var title \= \"[^\"]*? Яндекс: знайш[^\s]*[\s]+([^\"]*?)[\s]+адказ[^\"]*?/i);
					}
				}
				if (!res)
				{
					res = text.match(/document\.title \= \"[^\"]*? Яндекс: ([^\"]*?) җавап табылды[^\"]*?/i);
					if (!((res) && (res.length > 1)))
					{
						res = text.match(/var title \= \"[^\"]*? Яндекс: ([^\"]*?) җавап табылды[^\"]*?/i);
					}
				}
				
				if (!res)
				{
					res = text.match(/Яндекс: наш[^\s]*[\s]+([^\"]*?)[\s]+результат[^\s]*\"\;document\.title\=e\.firstChild\?e\.firstChild\.nodeValue/i);
				}
				if (!res)
				{
					res = text.match(/Яндекс: знайш[^\s]*[\s]+([^\"]*?)[\s]+результат[^\s]*\"\;document\.title\=e\.firstChild\?e\.firstChild\.nodeValue/i);
				}
				
				if ((res) && (res.length > 1))
				{
					var result = res[1];
					result = result.replace(/\&nbsp\;/img, " ");
					var val = result;
					
					val = val.replace(/\sтыс\./, "000" );
					val = val.replace(/\sтис\./, "000" );
					val = val.replace(/\sмың/, "000" );
					val = val.replace(/\sмең/, "000" );

					val = val.replace(/\sмлн/, "000000");
					
					var pages = 0;
					try 
					{
						pages = parseInt(val.trim());
					}
					catch (e)
					{
					
					}
					var color = "green";
					if (btn.name.indexOf(cn._buttonINYPrefix) != -1)
					{
						if (pages < sts._inyValue)
						{
							color = "yellow";
							if (pages == 0)
								color = "red";
							if (sts._use_auto_select_iny)
							{
								if (XToolChecker.IsPageToCheck(docUrl))
								{
									XToolChecker.SetCheckForButton(threadIndex,btn);
								}
							}
						}
						XToolCheckerThreads.SetCurrentButton(threadIndex, result, "", result, color);
					}
					else if (btn.name.indexOf(cn._buttonRLVPrefix) != -1)
					{
						if ((pages < sts._rlvHighlightValue) && (sts._use_highlight_rlv))
						{
							color = "yellow";
						}
						if (pages < sts._rlvValue)
						{
							if (sts._use_auto_select_rlv)
							{
								if (XToolChecker.IsPageToCheck(docUrl))
								{
									XToolChecker.SetCheckForButton(threadIndex,btn);
								}
							}
						}
						XToolCheckerThreads.SetCurrentButton(threadIndex, result, "", result, color);
					}					
				}
				else
				{
					var notFound = false;
					if (response.search(/Яндекс: ничего не найдено\"\;document\.title\=e\.firstChild\?e\.firstChild\.nodeValue/i) != -1)
						notFound = true;
					else if (response.search(/Яндекс: ничего не найдено\"\;document\.title\=e\.firstChild\?e\.firstChild\.nodeValue/i) != -1)
						notFound = true;
					else if (response.search(/Яндекс: нічого не знайдено\"\;document\.title\=e\.firstChild\?e\.firstChild\.nodeValue/i) != -1)
						notFound = true;
					else if (response.search(/Яндекс: ешнәрсе табылмады\"\;document\.title\=e\.firstChild\?e\.firstChild\.nodeValue/i) != -1)
						notFound = true;
					else if (response.search(/Яндекс: нічога не знойдзена\"\;document\.title\=e\.firstChild\?e\.firstChild\.nodeValue/i) != -1)
						notFound = true;
					else if (response.search(/Яндекс: бернәрсә дә табылмады\"\;document\.title\=e\.firstChild\?e\.firstChild\.nodeValue/i) != -1)
						notFound = true;
						
					
					
					
					
					else if (response.search(/document\.title \= \"[^\"]*? Яндекс: ничего не найдено[^\"]*?/i) != -1)
						notFound = true;
					else if	(response.search(/var title \= \"[^\"]*? Яндекс: ничего не найдено[^\"]*?/i) != -1)
						notFound = true;
					else if (response.search(/document\.title \= \"[^\"]*? Яндекс: нічого не знайдено[^\"]*?/i) != -1)
						notFound = true;
					else if	(response.search(/var title \= \"[^\"]*? Яндекс: нічого не знайдено[^\"]*?/i) != -1)
						notFound = true;
					else if (response.search(/document\.title \= \"[^\"]*? Яндекс: ешнәрсе табылмады[^\"]*?/i) != -1)
						notFound = true;
					else if	(response.search(/var title \= \"[^\"]*? Яндекс: ешнәрсе табылмады[^\"]*?/i) != -1)
						notFound = true;	
					else if (response.search(/document\.title \= \"[^\"]*? Яндекс: нічога не знойдзена[^\"]*?/i) != -1)
						notFound = true;
					else if	(response.search(/var title \= \"[^\"]*? Яндекс: нічога не знойдзена[^\"]*?/i) != -1)
						notFound = true;	
					else if (response.search(/document\.title \= \"[^\"]*? Яндекс: бернәрсә дә табылмады[^\"]*?/i) != -1)
						notFound = true;
					else if	(response.search(/var title \= \"[^\"]*? Яндекс: бернәрсә дә табылмады[^\"]*?/i) != -1)
						notFound = true;		
					if (notFound)
					{
					
						if (btn.name.indexOf(cn._buttonINYPrefix) != -1)
						{
							var isSecond = (btn.previousSibling.step == "2");
							if (!isSecond)
							{
								btn.previousSibling.step = "2";
								XToolChecker.DebugMsg("Repeat INY");
								return;
							}
							else
							{
								XToolCheckerThreads.SetCurrentButton(threadIndex, "0", "", "0", "red");
								if (sts._use_auto_select_iny)
								{
									if (XToolChecker.IsPageToCheck(docUrl))
									{
										XToolChecker.SetCheckForButton(threadIndex,btn);
									}
								}		
							}							
						}
						else if (btn.name.indexOf(cn._buttonRLVPrefix) != -1)
						{
							if ((0 < sts._rlvHighlightValue) && (sts._use_highlight_rlv))
							{
								color = "yellow";
							}
							if (0 < sts._rlvValue)
							{
								if (sts._use_auto_select_rlv)
								{
									if (XToolChecker.IsPageToCheck(docUrl))
									{
										XToolChecker.SetCheckForButton(threadIndex,btn);
									}
								}
							}
							XToolCheckerThreads.SetCurrentButton(threadIndex, "0", "", "0", "red");
						}
					}
					else
					{
						var res = text.match(/<title>[^<]*<\/title>/i);
						XToolChecker.DebugMsg(res);
						XToolChecker.DebugMsg(text);
						XToolChecker.DebugMsg("err");
						XToolCheckerThreads.SetCurrentButton(threadIndex, "---", "ER", "", "error");
					}
				}
			}
		}*/
	
		}
		catch (e)
		{
			console.log("error INY: "+e);
			XToolChecker.MsgToConsole("ProcessINY error: " + e);
			XToolCheckerThreads.SetCurrentButton(threadIndex, "ER", "", "", "red");
		}
		XToolCheckerThreads.ClearCurrentButton(threadIndex);
	},
	
	ProcessYC : function(response, responseXML, threadIndex)
	{
		/*try
		{
			var sts = XTSettings;
			var cn = XToolCheckerConst;
			var docUrl = XToolCheckerThreads.GetThread(threadIndex)._url;
			if (XToolCheckerThreads.GetThread(threadIndex)._queryStage == 0)
			{
				XToolChecker.ParseResultYnd(response, threadIndex);
			}
			else
			{
				var text = response.replace(/\r\n/img, "");
				text = text.replace(/\n/img, "");
				
			//	var res = text.match(/\.date \= \'([^\']*?)\'\;/i);
			    var res = text.match(/<div id=yandex-cache-hdr><b[^<>]*?>Копия страницы[^<>]*?<\/b><span [^<>]*?>От ([^<>]*?)<i>\.\&nbsp\;<\/i>/i);
				//var res = text.match(/\.date \= \'([^\']*?)\'\;/i);
				if ((res) && (res.length > 1))
				{
					
					var result = res[1];
					if (result != "")
					{
						
						
						{
							//var date = XToolChecker.GetDateFromString5(text[0]);
							var daysLeft = -1;
							try {
								var date = new Date(Date.parse(res[1]));
								var curDate = new Date();
								var mSecLeft = curDate.valueOf() - date.valueOf();
								var btn = XToolCheckerThreads.GetThread(threadIndex)._clickedButton;
								daysLeft = mSecLeft / 86400000; //миллисекунд в дне 1000*60*60*24 
								if ((sts._check_yc_days) && (daysLeft > sts._yc_days))
								{
									
									if (btn.name.indexOf(cn._buttonYCPrefix) == 0) 
										XToolChecker.CheckIfRequired(docUrl, threadIndex, btn);
								}
								result += " (" +  Math.floor(daysLeft) + " дней назад)"
							} catch
							{
								XToolChecker.DebugMsg('Cannot parse date');
							}
							
							if (this._showYCdays && daysLeft != -1)
							{
								XToolCheckerThreads.SetNextElementText(threadIndex, " " + Math.floor(daysLeft) + " ",  "");
							}
							else
							{
								XToolCheckerThreads.SetNextElementText(threadIndex, "", "");
							}
							 
						}
					}
					
					XToolCheckerThreads.SetCurrentButton(threadIndex, "", "", result, "green");
				}
				else
				{
					XToolChecker.DebugMsg('Cache Date not found');
					XToolCheckerThreads.SetCurrentButton(threadIndex, "---", "ER", "", "error");
				}
				
				XToolCheckerThreads.ClearCurrentButton(threadIndex);
				XToolCheckerThreads.GetThread(threadIndex)._queryStage = 0;
			}
		}
		catch (ex)
		{
			XToolChecker.MsgToConsole("ProcessYC error: " + ex);
			XToolCheckerThreads.SetCurrentButton(threadIndex, "---", "ER", "", "error");
			XToolCheckerThreads.ClearCurrentButton(threadIndex);
		}*/

		var sts = XTSettings;
		var cn = XToolCheckerConst;
		try {
		
		var docUrl = XToolCheckerThreads.GetThread(threadIndex)._url;


		///if (qType == 2)
		{
			var btn = XToolCheckerThreads.GetThread(threadIndex)._clickedButton;
			if (!responseXML) {
				responseXML = XToolChecker.ConvertResponseToXml(response);			
			}
			if (responseXML)
			{
				var errors = responseXML.getElementsByTagName('error');
				if ((errors) && (errors.length > 0))
				{
					
					var code = -1;
					if (errors[0].hasAttribute("code"))
					{
						code = errors[0].getAttribute("code");
					}
					if (code == 15)
					{
						var isSecond = (btn.previousSibling.step == "2");
						{
							btn.previousSibling.step = "";
						
							// не нашли ничего
							XToolCheckerThreads.SetCurrentButton(threadIndex, "", "NO", "", "red");
							if (btn.name.indexOf(cn._buttonYalPrefix) == 0)
							{
								btn.title = "Cсылка не проиндексирована";
							}
							else if (btn.name.indexOf(cn._buttonYapPrefix) == 0)
							{
								btn.title = "Cтраница не в индексе";
							}
							else if (btn.name.indexOf(cn._buttonRPrefix) == 0)
							{
								btn.title = "Не найдено в указанном регионе";
							}
							
							if (btn.name.indexOf(cn._buttonYapPrefix) != -1)
								XToolChecker.AddYPToDatabase(XToolCheckerThreads.GetThread(threadIndex)._lastRequestedUrl, btn, 0, "", 0)
							else if (btn.name.indexOf(cn._buttonYalPrefix) != -1)
								XToolChecker.AddYLToDatabase(XToolCheckerThreads.GetThread(threadIndex)._lastRequestedUrl, btn, btn.previousSibling.title, 0, "", 0);
							if (sts._use_auto_select_yap)
							{
								if (btn.name.indexOf(cn._buttonYapPrefix) == 0)
									XToolChecker.CheckIfRequired(docUrl, threadIndex, btn);
							}
							if (sts._expireYal)
							{
								if (btn.name.indexOf(cn._buttonYalPrefix) == 0) 
									XToolChecker.CheckIfRequired(docUrl, threadIndex, btn);
							}
						}
					}
					else
					{
						// Настоящая ошибка
						XToolCheckerThreads.SetCurrentButton(threadIndex, "ER", "ER", "xml.yandex.ru: " + errors[0].textContent, "error")
					}
				}
				else
				{
					// вроде есть результат
					var docs = responseXML.getElementsByTagName('doc');
					var orig = [];
					var result = -1;
					var isDifferentCase = false;
					var isSlash = false;
					if (docs)
					{
						var href = btn.previousSibling.value;
						for (var i = 0; i < docs.length; i++)
						{
							var urls = docs[i].getElementsByTagName("url");
							if (urls)
							{
								var tmpUrl = urls[0].textContent;
								orig.push(tmpUrl);
								tmpUrl = XToolChecker.PrepareLink(tmpUrl);
								tmpUrl = tmpUrl.replace(/\'/g, "%27");
								if (tmpUrl == href)
								{
									result = i + 1;
									break;
								}
								if (tmpUrl.indexOf(href + "/") == 0)
								{
									result = i + 1;
									break;
								}
								if (tmpUrl.toLowerCase() == href.toLowerCase())
								{
									isDifferentCase = true;
								}
								if ((tmpUrl + "/" == href) || (href + "/" == tmpUrl))
								{
									isSlash = true;
								}
							}
						}
					}
					if (result != -1)
					{
						// +
						var titles = docs[result-1].getElementsByTagName("title");
						var titlePage = "";
						if ((titles) && (titles.length > 0))
						{
							titlePage = titles[0].textContent;							
						}
						else
						{
							titlePage = " ";
						}
						
						var cacheUrl = docs[result-1].getElementsByTagName("saved-copy-url");
						if (cacheUrl){
							XToolCheckerThreads.SetCurrentButton(threadIndex, "", orig[result-1], titlePage, "green");
						} else {
							XToolCheckerThreads.SetCurrentButton(threadIndex, "", orig[result-1], titlePage, "red");
						}
	
					}
					else
					{
						// - 		
						if (btn.name.indexOf(cn._buttonYCPrefix) == 0)
						{
							XToolCheckerThreads.SetCurrentButton(threadIndex, "", "NO", "Cсылка не проиндексирована", "red");
						}
	
					
					}
				}
				XToolCheckerThreads.ClearCurrentButton(threadIndex);
			}
			else
			{
				XToolCheckerThreads.SetCurrentButton(threadIndex, "---", "ER", "", "error");
				XToolCheckerThreads.ClearCurrentButton(threadIndex);
			}
		}
	
		}
		catch (ex)
		{
			XToolChecker.MsgToConsole("ProcessYC error: " + ex);
			XToolCheckerThreads.SetCurrentButton(threadIndex, "---", "ER", "", "error");
			XToolCheckerThreads.ClearCurrentButton(threadIndex);
		}

	
	},

	ConvertResponseToXml : function (response) {
		try {
			let obj = JSON.parse(response);
			if (obj && obj.yxml && obj.yxml.response) {
				const parser = new DOMParser();
	
				const xmlResult = parser.parseFromString(obj.yxml.response, "application/xml");
				return xmlResult;
			}
		}
		catch (e) {
		}
		return null;
	},
	

	ProcessYapYal : function(response, responseXML, threadIndex)
	{
		var sts = XTSettings;
		var cn = XToolCheckerConst;
		try {
		
		var docUrl = XToolCheckerThreads.GetThread(threadIndex)._url;
		var qType = XToolCheckerThreads.GetThread(threadIndex)._currentQueryType;
		//if (qType != 2)
		{
			var d = new Date();
			this._y_time = d.getTime();
			var delta = sts._timeout_y - sts._timeout_y_min;
			if (delta < 0) delta = 0;
			this._y_waitTime =  Math.floor(sts._timeout_y_min*1 + Math.random() * delta);
		}
		/*else
			this._y_waitTime = 0;*/
		if (qType == 1)
		{
			var btn = XToolCheckerThreads.GetThread(threadIndex)._clickedButton;
			var text = response.replace(/\r\n/img, "");
			text = text.replace(/\n/img, "");
			var indexTitle = response.indexOf("class=\"result\"\>");
			if (indexTitle == -1)
				indexTitle = response.indexOf("class=\'result\'\>");
			if (indexTitle != -1)
			{
				var res = text.match(/<div class=\"title\">.*?target=\"_blank\" onmousedown/ig);
				var orig = [];
				var result = -1;
				if (res)
				{
					var href = btn.previousSibling.value;
					//href = href.toLowerCase();
					for (var i = 0; i < res.length; i++)
					{
						res[i] = res[i].replace(/<div .*<a href=\"/, "");
						res[i] = res[i].replace("\" target=\"_blank\" onmousedown", "");
						res[i] = res[i].replace("\"", "");
						orig.push(res[i]);
						res[i] = XToolChecker.PrepareLink(res[i]);
						//res[i] = res[i].toLowerCase();
						res[i] = res[i].replace(/\'/g, "%27");
						if (res[i] == href)
						{
							result = i + 1;
							break;
						}
						if (res[i].indexOf(href + "/") == 0)
						{
							result = i + 1;
							break;
						}
						
					}
				}
				if (result != -1)
				{
					// +
					var text = response.replace(/\r\n/img, "");
					text = text.replace(/\n/img, "");
					var res = text.match(/<div class=\"title\">.*?target=\"_blank\" onmousedown=.*?\">(.*?)<\/a>/i);
					var titlePage = "";
					if ((res) && (res.length > 1))
					{
						titlePage = res[1];
					}
					XToolCheckerThreads.SetCurrentButton(threadIndex, "", orig[i], titlePage, "green");
					if (btn.name.indexOf(cn._buttonYapPrefix) != -1)
						XToolChecker.AddYPToDatabase(XToolCheckerThreads.GetThread(threadIndex)._lastRequestedUrl, btn, 1, titlePage, 0)
					else if (btn.name.indexOf(cn._buttonYalPrefix) != -1)
						XToolChecker.AddYLToDatabase(XToolCheckerThreads.GetThread(threadIndex)._lastRequestedUrl, btn, btn.previousSibling.title, 1, titlePage, 0);
					XToolChecker.SetYapIfYal(btn);
				}
				else
				{
					// - 		
					if (this._yalMethod == 2)
					{
						XToolCheckerThreads.SetCurrentButton(threadIndex, "", "ER", "", "error");			
					}
					else
					{					
						XToolCheckerThreads.SetCurrentButton(threadIndex, "", "NO", "", "red");
						if (btn.name.indexOf(cn._buttonYalPrefix) == 0)
						{
							btn.title = "Cсылка не проиндексирована";
							XToolChecker.AddYLToDatabase(XToolCheckerThreads.GetThread(threadIndex)._lastRequestedUrl, btn, btn.previousSibling.title, 0, "", 0);
						}
						else if (btn.name.indexOf(cn._buttonYapPrefix) == 0)
						{
							btn.title = "Cтраница не в индексе";
							XToolChecker.AddYPToDatabase(XToolCheckerThreads.GetThread(threadIndex)._lastRequestedUrl, btn, 0, "", 0)
						}
						else if (btn.name.indexOf(cn._buttonRPrefix) == 0)
						{
							btn.title = "Не найдено в указанном регионе";
						}
						
						if (sts._use_auto_select_yap)
						{
							if (btn.name.indexOf(cn._buttonYapPrefix) == 0)
								XToolChecker.CheckIfRequired(docUrl, threadIndex, btn);
						}
						if (sts._expireYal)
						{
							if (btn.name.indexOf(cn._buttonYalPrefix) == 0) 
								XToolChecker.CheckIfRequired(docUrl, threadIndex, btn);
						}
					}
				}
			}
			else
			{
				XToolCheckerThreads.SetCurrentButton(threadIndex, "---", "ER", "", "error");
			}
			XToolCheckerThreads.ClearCurrentButton(threadIndex);
			
		}
		else if (qType == 2)
		{
			var btn = XToolCheckerThreads.GetThread(threadIndex)._clickedButton;
			if (!responseXML) {
				responseXML = XToolChecker.ConvertResponseToXml(response);			
			}
			if (responseXML)
			{
				var errors = responseXML.getElementsByTagName('error');
				if ((errors) && (errors.length > 0))
				{
					
					var code = -1;
					if (errors[0].hasAttribute("code"))
					{
						code = errors[0].getAttribute("code");
					}
					if (code == 15)
					{
						var isSecond = (btn.previousSibling.step == "2");
						{
							btn.previousSibling.step = "";
						
							// не нашли ничего
							XToolCheckerThreads.SetCurrentButton(threadIndex, "", "NO", "", "red");
							if (btn.name.indexOf(cn._buttonYalPrefix) == 0)
							{
								btn.title = "Cсылка не проиндексирована";
							}
							else if (btn.name.indexOf(cn._buttonYapPrefix) == 0)
							{
								btn.title = "Cтраница не в индексе";
							}
							else if (btn.name.indexOf(cn._buttonRPrefix) == 0)
							{
								btn.title = "Не найдено в указанном регионе";
							}
							
							if (btn.name.indexOf(cn._buttonYapPrefix) != -1)
								XToolChecker.AddYPToDatabase(XToolCheckerThreads.GetThread(threadIndex)._lastRequestedUrl, btn, 0, "", 0)
							else if (btn.name.indexOf(cn._buttonYalPrefix) != -1)
								XToolChecker.AddYLToDatabase(XToolCheckerThreads.GetThread(threadIndex)._lastRequestedUrl, btn, btn.previousSibling.title, 0, "", 0);
							if (sts._use_auto_select_yap)
							{
								if (btn.name.indexOf(cn._buttonYapPrefix) == 0)
									XToolChecker.CheckIfRequired(docUrl, threadIndex, btn);
							}
							if (sts._expireYal)
							{
								if (btn.name.indexOf(cn._buttonYalPrefix) == 0) 
									XToolChecker.CheckIfRequired(docUrl, threadIndex, btn);
							}
						}
					}
					else
					{
						// Настоящая ошибка
						XToolCheckerThreads.SetCurrentButton(threadIndex, "ER", "ER", "xml.yandex.ru: " + errors[0].textContent, "error")
					}
				}
				else
				{
					// вроде есть результат
					var docs = responseXML.getElementsByTagName('doc');
					var orig = [];
					var result = -1;
					var isDifferentCase = false;
					var isSlash = false;
					if (docs)
					{
						var href = btn.previousSibling.value;
						//href = href.toLowerCase();
						for (var i = 0; i < docs.length; i++)
						{
							var urls = docs[i].getElementsByTagName("url");
							if (urls)
							{
								var tmpUrl = urls[0].textContent;
								orig.push(tmpUrl);
								tmpUrl = XToolChecker.PrepareLink(tmpUrl);
								//tmpUrl = tmpUrl.toLowerCase();
								tmpUrl = tmpUrl.replace(/\'/g, "%27");
								if (tmpUrl == href)
								{
									result = i + 1;
									break;
								}
								if (tmpUrl.indexOf(href + "/") == 0)
								{
									result = i + 1;
									break;
								}
								if (tmpUrl.toLowerCase() == href.toLowerCase())
								{
									isDifferentCase = true;
								}
								if ((tmpUrl + "/" == href) || (href + "/" == tmpUrl))
								{
									isSlash = true;
								}
							}
						}
					}
					if (result != -1)
					{
						// +
						var titles = docs[result-1].getElementsByTagName("title");
						var titlePage = "";
						if ((titles) && (titles.length > 0))
						{
							titlePage = titles[0].textContent;							
						}
						else
						{
							titlePage = " ";
						}
						XToolCheckerThreads.SetCurrentButton(threadIndex, "", orig[result-1], titlePage, "green");
						if (btn.name.indexOf(cn._buttonYapPrefix) != -1)
							XToolChecker.AddYPToDatabase(XToolCheckerThreads.GetThread(threadIndex)._lastRequestedUrl, btn, 1, titlePage, 0)
						else
							XToolChecker.AddYLToDatabase(XToolCheckerThreads.GetThread(threadIndex)._lastRequestedUrl, btn, btn.previousSibling.title, 1, titlePage, 0);
						XToolChecker.SetYapIfYal(btn);
					}
					else
					{
						// - 		
						if (btn.name.indexOf(cn._buttonYalPrefix) == 0)
						{
							XToolCheckerThreads.SetCurrentButton(threadIndex, "", "NO", "Cсылка не проиндексирована", "red");
						}
						else if (btn.name.indexOf(cn._buttonYapPrefix) == 0)
						{
							XToolCheckerThreads.SetCurrentButton(threadIndex, "", "NO", "Cтраница не в индексе", "red");
						} 
						else if (btn.name.indexOf(cn._buttonRPrefix) == 0)
						{
							XToolCheckerThreads.SetCurrentButton(threadIndex, "", "NO", "Не найдено в указанном регионе", "red");
						}
						
						if (btn.name.indexOf(cn._buttonYapPrefix) != -1)
							XToolChecker.AddYPToDatabase(XToolCheckerThreads.GetThread(threadIndex)._lastRequestedUrl, btn, 0, "", 0)
						else
							XToolChecker.AddYLToDatabase(XToolCheckerThreads.GetThread(threadIndex)._lastRequestedUrl, btn, btn.previousSibling.title, 0, "", 0);
						if (sts._use_auto_select_yap)
						{
							if (btn.name.indexOf(cn._buttonYapPrefix) == 0) 
								XToolChecker.CheckIfRequired(docUrl, threadIndex, btn);
						}
						if (sts._expireYal)
						{
							if (btn.name.indexOf(cn._buttonYalPrefix) == 0)
								XToolChecker.CheckIfRequired(docUrl, threadIndex, btn);
						}
					
					}
				}
				XToolCheckerThreads.ClearCurrentButton(threadIndex);
			}
			else
			{
				XToolCheckerThreads.SetCurrentButton(threadIndex, "---", "ER", "", "error");
				XToolCheckerThreads.ClearCurrentButton(threadIndex);
			}
		}
		else if ((qType == 6) || (qType == 7))
		{
			XToolChecker.ParseResultYnd(response, threadIndex);
		}
		else 
		{
			XToolCheckerThreads.SetCurrentButton(threadIndex, "---", "ER", "", "error");
			XToolCheckerThreads.ClearCurrentButton(threadIndex);
		}
		}
		catch (ex)
		{
			XToolChecker.MsgToConsole("ProcessYapYal error: " + ex);
			XToolCheckerThreads.SetCurrentButton(threadIndex, "---", "ER", "", "error");
			XToolCheckerThreads.ClearCurrentButton(threadIndex);
		}
	},
	
	
	ParseResultYnd : function (response, threadIndex)
	{

		XToolChecker.DebugMsg("ParseResultYnd");
		var sts = XTSettings;
		var cn = XToolCheckerConst;
		var docUrl = XToolCheckerThreads.GetThread(threadIndex)._url;
		var text = response.replace(/\r\n/img, "");
		text = text.replace(/\n/img, "");
		if (XToolChecker.HasCapchaYnd(text))
		{
			XToolCheckerThreads.SetCurrentButton(threadIndex, "CPT", "CPT", "", "error");
			XToolCheckerThreads.ClearCurrentButton(threadIndex);
			XToolChecker.StopMulticheck();
			XTChecker.Capcha.ClearAll();
			return;
			/*console.log('Capcha');
			if (!this._isCaptureDialog)
			{
				//XToolCheckerThreads.SetCurrentButton(threadIndex, "CPT", "CPT", "", "error");
				// Чтобы не было таймаута
				XToolCheckerThreads.GetThread(threadIndex)._xmlHttpObj = 0;
				this._isCaptureDialog = true;
				var action = XToolCheckerThreads.GetThread(threadIndex)._action;
				if (action.indexOf("http://") != 0) 
					action = "http://yandex.ru/yandsearch?text=";
				XTChecker.Capcha.ProcessCapcha(action, sts._capcha_type, sts._antigate_key, sts._antigate_no_alerts, threadIndex);
				XToolChecker.DebugMsg("Closed");
				this._isCaptureDialog = false;
				if (XTChecker.Capcha._stopAll)
				{
					XToolCheckerThreads.ClearCurrentButton(threadIndex);
					XToolChecker.StopMulticheck();
					XTChecker.Capcha.ClearAll();
				}
				// выйдем - кнопка проверится еще раз
			}
			else
				XToolChecker.DebugMsg("Dialog is opened");
			return;*/
		}
		// было ли что-то найдено
		var indexTitle = response.indexOf("action=\"\/yandsearch\"");// role=\"search\"");
		if (indexTitle == -1)
			indexTitle = response.indexOf("action=\"\/familysearch\"");// role=\"search\"");
		if (indexTitle == -1)
			indexTitle = response.indexOf("action=\"\/search\/\"");
		if (indexTitle == -1)
			indexTitle = response.indexOf("action=\"\/search\/family\"");			
		if (indexTitle != -1)
		{
				//var res = text.match(/<li><h3><a href=.*?><img .*?><\/a><a href=\".*?\" target="_blank" onmousedown=.*?\">.*?<\/a>/ig);
				/*var res = text.match(/<li class=\"b-serp-item.*?<a [^\>]*href=\"[^\"]*\" .*?onmousedown=.*?target=[\'\"]{0,1}_blank[\'\"]{0,1}>.*?<\/li>/ig);*/
				//var res = text.match(/<li[^\>]* class=\"b-serp-item[^\>]*>.*?<a[^\>]*href=\"[^\"]*\"[^\>]*>.*?<\/a>.*?<\/li>/ig);
				//<h2[^\>]* class=\"serp-item[^\>]*><span.*?<a[^\>]*href=\"[^\"]*\"[^\>]*>.*?<\/a>.*?<\/h2>.*?<div class=\"[a-z\-]*__text\">
				text = text.replace(/<div class=\"serp-block[^\"]*\">[^<]*<div class=\"serp-block__head\">[^<]*<div class=\"serp-block__head-wrap\"[^<]*>[^<]*<div class=\"serp-adv__title-text\">.*?<\/div>(?=<div class=\"serp-block |<div class=\"main__footer )/ig, "");
				//var res = text.match(/<h2[^\>]* class=\"serp-item[^\>]*>(!(\<h2\>))*?<a[^\>]*href=\"[^\"]*\"[^\>]*>.*?<\/a>.*?<\/h2>.*?<div class=\"[a-z\- ]*__text\">/ig);
			/*	var res = text.match(/<h2[^\>]* class=\"organic__title-[^\>]*>((?!\<h2).)*?<a[^\>]*href=\"[^\"]*\"[^\>]*>.*?<\/a>.*?<\/h2>.*?<div class=\"[a-z\-\_ ]*text-container[a-z\-\_ ]*\">/ig);
				if (!res)
				{
				   res = text.match(/<h2[^\>]* class=\"OrganicTitle[^\>]*>((?!\<h2).)*?<a[^\>]*href=\"[^\"]*\"[^\>]*>.*?<\/a>.*?<\/h2>.*?<div class=\"[a-z\-\_ ]*TextContainer[a-z\-\_ ]*\">/ig);
				}*/

				var res = text.match(/<li [^\>]*>.*?<a target=\"_blank\"[^\>]*href=\"([^\"]*)\"[^\>]*>.*?<h2[^\>]* class=\"OrganicTitle[^\>]*>.*?<span[^\>]*>([^\>\<]*)<\/span><\/h2><\/a>.*<div class=\"Organic-ContentWrapper/ig);
				
				 var orig = [];
				var result = -1;
				var titlePage = "";
				var isDifferentCase = false;
				var isSlash = false;
				var isVirus = false;
				var copyLink = "";
				var href = XToolCheckerThreads.GetThread(threadIndex)._clickedButton.previousSibling.value;
				var notFound = false;
				if ((response.search(/<div class=\"misspell__message\">Точного совпадения с [^<>]*? не нашлось./i) != -1) ||
					(response.search(/<div class=\"misspell__message\">Точного збігу з [^<>]*? не знайдено/i) != -1) ||
					(response.search(/<div class=\"misspell__message\">[^<>]*? сұранымымен нақты сәйкестік табылған жоқ./i) != -1) ||
					(response.search(/<div class=\"misspell__message\">Дакладнага супадзення з [^<>]*? не знайшлося/i) != -1) ||
					(response.search(/<div class=\"misspell__message\">[^<>]*? соравына тулы туры килү табылмады./i) != -1) ||
					(response.search(/<div class=\"misspell__message\">An exact match for [^<>]*? was not found/i) != -1))
				{
					notFound = true;
					res = [];
				}
				/*if (response.search(/class=\"misspell__message\"/i) != -1)
					notFound = true;*/
				if ((response.search(/Искомая комбинация слов нигде не встречается/i) != -1) || 
					(response.search(/По вашему запросу ничего не нашлось/i) != -1))
					notFound = true;
				if (response.search(/Шукана комбінація слів ніде не зустрічається/i) != -1)
					notFound = true;
				if (response.search(/Сөздердің іздеу комбинациясы еш жерде кездеспейді/i) != -1)
					notFound = true;
				if (response.search(/Патрэбная камбінацыя слоў нідзе не сустракаецца/i) != -1)
					notFound = true;
				if (response.search(/Бирелгән сүзләр комбинациясе беркайда да очрашмый/i) != -1)
					notFound = true;
				
				if ((res) && (!notFound))
				{
					XToolChecker.DebugMsg(res.length);
					for (var i = 0; i < res.length; i++)
					{
						var href2 = "";
						/*var res2 = res[i].match(/<li[^\>]* class=\"b-serp-item.*?<a [^\>]*href=\"([^\"]*)\" .*?onmousedown=.*?target=[\'\"]{0,1}_blank[\'\"]{0,1}>(.*?)<\/a>.*?<\/li>/i);*/
						//var res2 = res[i].match(/<h2[^\>]* class=\"serp-item[^\>]*><span.*?<a[^\>]*href=\"([^\"]*)\"[^\>]*>(.*?)<\/a>.*?<\/h2>/i);
					/*	var res2 = res[i].match(/<h2[^\>]* class=\"organic__title-[^\>]*>.*?<a[^\>]*href=\"([^\"]*)\"[^\>]*>(.*?)<\/a>.*?<\/h2>/i);
					
						if (!res2) 
							res2 = res[i].match(/<h2[^\>]* class=\"OrganicTitle[^\>]*>.*?<a[^\>]*href=\"([^\"]*)\"[^\>]*>(.*?)<\/a>.*?<\/h2>/i);
						/*var res2 = res[i].match(/<li[^\>]* class=\"b-serp-item[^\>]*>.*?<a[^\>]*href=\"([^\"]*)\"[^\>]*>(.*?)<\/a>.*?<\/li>/i);*/
						var res2 = res[i].match(/<li [^\>]*>.*?<a target=\"_blank\"[^\>]*href=\"([^\"]*)\"[^\>]*>.*?<h2[^\>]* class=\"OrganicTitle[^\>]*>.*?<span[^\>]*>([^\>\<]*)<\/span><\/h2><\/a>.*<div class=\"Organic-ContentWrapper/i);
						XToolChecker.DebugMsg(res[i]);

						///var res3 = res[i].match(/<a[^\>]* href=\"(https:\/\/yandexwebcache.net\/yandbtm[^\"]*)"[^\>]*>[^\<\>]+<\/a>/i);
						var res3 = res[i].match(/\&quot;url\&quot;:\&quot;(https\:\/\/yandexwebcache\.net\/[^\}]*?)\&quot;/i);
						if (res2)
						{
							if (res2.length > 1)
							{
								var virusLink = false;
								href2 = res2[1];
								orig.push(href2);
								href2 = href2.replace(/\&amp\;/g, "&");
								href2 = href2.replace(/\'/g, "%27");
								if ((href2.indexOf("/infected?url=") == 0) || (href2.indexOf("/search/infected?url=") == 0))
								{
									virusLink = true;
									//href2 = href2.replace(/\/infected\?text=.*?&url=/, "");
									href2 = href2.replace(/\/search\/infected\?url\=/, "");
									href2 = href2.replace(/\/infected\?url=/, "");
									var index = href2.indexOf("&tld=");
									if (index != -1)
										href2 = href2.substring(0, index);
									index = href2.indexOf("&lang=");
									if (index != -1)
										href2 = href2.substring(0, index);
									index = href2.indexOf("&l10n=");
									if (index != -1)
										href2 = href2.substring(0, index);
									href2 = XToolChecker.PrepareLink(href2);
								}
								
								href2 = XToolChecker.PrepareLink(href2);
								if (res2.length > 2)
								{
									titlePage = res2[2].replace(/<[^>]*>/g, "");
								}
								XToolChecker.DebugMsg(href2 +" == " + href);
								if (href2 == href)
								{
									result = i + 1;
									if (virusLink)
										isVirus = true;
									if ((res3) && (res3.length > 1))
										copyLink = res3[1];
									break;
								}
								if (href2 == (href + "/"))
								{
									result = i + 1;
									if (virusLink)
										isVirus = true;
									if ((res3) && (res3.length > 1))
										copyLink = res3[1];
									break;
								}
								if (href2.toLowerCase() == href.toLowerCase())
								{
									isDifferentCase = true;
								}
								if ((href2 + "/" == href) || (href + "/" == href2))
								{
									isSlash = true;
								}
							}
						}
						else
						{
						XToolChecker.DebugMsg("else");
						}
					}
				}
				if (result != -1)
				{
					var btn = XToolCheckerThreads.GetThread(threadIndex)._clickedButton;
					// +
					if ((btn.name.indexOf(cn._buttonYCPrefix) == 0) ||
						((btn.name.indexOf(cn._buttonYalPrefix) == 0) && (sts._check_yl_with_yc) ))
					{
						if (copyLink.length > 0)
						{
							XToolCheckerThreads.SetCurrentButton(threadIndex, "", "", "", "", copyLink);
/*wtf*/						//	btn.setAttribute("placeholder", copyLink);
							//btn.previousSibling.alt = copyLink;
							//XToolCheckerThreads.SetCurrentButton(threadIndex, "", copyLink, "", "");
							XToolCheckerThreads.GetThread(threadIndex)._queryStage = 1;
							XToolCheckerThreads.GetThread(threadIndex)._clickedButton.placeholder = copyLink;
							return;
						}
						else
						{
							XToolCheckerThreads.SetCurrentButton(threadIndex, "", "", "Страницы нет в кэше", "red");
							if (sts._use_auto_select_yc)
							{
								XToolChecker.CheckIfRequired(docUrl, threadIndex, btn);
							}
							if (sts._expireYal)
							{
								if (btn.name.indexOf(sts._buttonYalPrefix) == 0) 
									XToolChecker.CheckIfRequired(docUrl, threadIndex, btn);
							}
						}
					}
					else
					{
						var title = titlePage;
						var color = "green";
						if (isVirus)
						{
							title = "Вирусы на сайте ! | " + title;
							color = "orange";
							if (sts._use_auto_select_virus)
							{
								var btn = XToolCheckerThreads.GetThread(threadIndex)._clickedButton;
								XToolChecker.CheckIfRequired(docUrl, threadIndex, btn);
							}
						}
						XToolCheckerThreads.SetCurrentButton(threadIndex, "", orig[i], title, color);
						if (btn.name.indexOf(cn._buttonYapPrefix) != -1)
							XToolChecker.AddYPToDatabase(XToolCheckerThreads.GetThread(threadIndex)._lastRequestedUrl, btn, 1, title, isVirus)
						else
							XToolChecker.AddYLToDatabase(XToolCheckerThreads.GetThread(threadIndex)._lastRequestedUrl, btn, btn.previousSibling.title, 1, title, isVirus);
						XToolChecker.SetYapIfYal(XToolCheckerThreads.GetThread(threadIndex)._clickedButton);
					}
				}
				else
				{
					// - 		
					{		
						var btn = XToolCheckerThreads.GetThread(threadIndex)._clickedButton;
						var isSecond = (btn.previousSibling.step == "2");
						if (!isSecond)
						{
							btn.previousSibling.step = "2";
							XToolChecker.DebugMsg("Repeat YP/YL");
							return;
						}
						else
						{
							btn.previousSibling.step = "";
							if ((btn.name.indexOf(cn._buttonRPrefix) == 0) && (XToolCheckerThreads.GetThread(threadIndex)._queryStage == 0) && (sts._rParams.split("[]").length > 1))
							{
								XToolCheckerThreads.GetThread(threadIndex)._queryStage = 1;
								return;
							}
							if ((isDifferentCase) || (isSlash) || (notFound))
							{
								
								if (btn.name.indexOf(cn._buttonYalPrefix) == 0)
								{
									XToolCheckerThreads.SetCurrentButton(threadIndex, "", "NO", "Cсылка не проиндексирована", "red");
									
									XToolChecker.AddYLToDatabase(XToolCheckerThreads.GetThread(threadIndex)._lastRequestedUrl, btn, btn.previousSibling.title, 0, "", 0);
								}
								else if (btn.name.indexOf(cn._buttonYapPrefix) == 0)
								{
									XToolCheckerThreads.SetCurrentButton(threadIndex, "", "NO", "Cтраница не в индексе", "red");
									XToolChecker.AddYPToDatabase(XToolCheckerThreads.GetThread(threadIndex)._lastRequestedUrl, btn, 0, "", 0);
								}
								else if (btn.name.indexOf(cn._buttonRPrefix) == 0)
								{
									XToolCheckerThreads.SetCurrentButton(threadIndex, "", "NO", "Не найдено в указанном регионе", "red");
								}
								else if (btn.name.indexOf(cn._buttonYCPrefix) == 0)
								{
									XToolCheckerThreads.SetCurrentButton(threadIndex, "", "", "Cтраница не в индексе", "red");
									if (sts._use_auto_select_yc)
									{
										XToolChecker.CheckIfRequired(docUrl, threadIndex, btn);
									}
								}
								
								if (btn.name.indexOf(cn._buttonYCPrefix) == -1)
								{
									if (sts._use_auto_select_yap)
									{
										if (btn.name.indexOf(cn._buttonYapPrefix) == 0) 
											XToolChecker.CheckIfRequired(docUrl, threadIndex, btn);
									}
									if (sts._expireYal)
									{
										if (btn.name.indexOf(cn._buttonYalPrefix) == 0) 
											XToolChecker.CheckIfRequired(docUrl, threadIndex, btn);
									}
								}
							}
							else
							{
								// ничего не нашли
								XToolCheckerThreads.SetCurrentButton(threadIndex, "---", "ER", "", "error");
							}
						}
					}
				}
			}
			else
			{
				XToolChecker.DebugMsg("no header");
				// ничего не нашли
				XToolCheckerThreads.SetCurrentButton(threadIndex, "---", "ER", "", "error");
			}
			XToolCheckerThreads.ClearCurrentButton(threadIndex);
			// end qType ==6

	},
	
	
	SetYapIfYal : function(btn)
	{
		var sts = XTSettings;
		var cn = XToolCheckerConst;
		//var docUrl = XToolCheckerThreads.GetThread(threadIndex)._url;
		if (btn.name.indexOf(cn._buttonYalPrefix) == 0)
		{
			try
			{
				var tmpObj = btn.parentNode;
				var inputs = tmpObj.getElementsByTagName("INPUT");
				var href = btn.previousSibling.value;
				for (var i = 0; i < inputs.length; i++)
				{
					if ((inputs[i].type == "button") && (inputs[i].name.indexOf(cn._buttonYapPrefix) == 0))
					{
						var href2 = inputs[i].previousSibling.value;
						if (href.toLowerCase() == href2.toLowerCase()) // кнопка нужная
						{
							inputs[i].title = btn.title;
							//inputs[i].style.backgroundColor = btn.style.backgroundColor;
							//XToolChecker.SetBackgroundColor(inputs[i], btn.style.backgroundColor);
							XToolCheckerThreads.SetCurrentButton(threadIndex, "", "", "", btn.style.backgroundColor);
							//return;
						}
			
					}
				}
								
				
			}
			catch(e)
			{
			}
		
		}	
	},
	
	ProcessXT : function(response, threadIndex)
	{
		var sts = XTSettings;
		var cn = XToolCheckerConst;
		try {
			console.log('11');
			XToolChecker.DebugMsg(response);
		//response = XToolChecker.PrepareTextForJSON(response);
		response = response.replace(/\\\\\"/g, "####quote####");
		response = response.replace(/\\\"/g, "####quote####");
		var result = JSON.parse(response);
		XToolChecker.ProcessJSONObject(result);
		if ((result.ErrorCode !== undefined) && (result.ErrorCode != 200))
		{
			XToolChecker.DebugMsg(result.Error);
			XToolCheckerThreads.SetCurrentButton(threadIndex, "ER", "", JSON.parse('"' + result.Error + '"'),  "red");
			XToolCheckerThreads.ClearCurrentButton(threadIndex);
			return;
		}
		result = result.trust;
		var tmpObj = {};
		if ((result.user !== undefined ) && (result.user.login !== undefined))
		{
			if (result.user.balance !== undefined)
				XToolChecker.UpdateLoginInfo2(result.user.login, result.user.balance);
			else
				XToolChecker.UpdateLoginInfo2(result.user.login, "");
		}
		var backgroundColor = "";
		XToolCheckerThreads.GetThread(threadIndex)._colorScheme = 0;
		if (result.color !== undefined)
		{
			tmpObj.scheme = result.color;
			try 
			{
				XToolCheckerThreads.GetThread(threadIndex)._colorScheme = parseInt(result.color);
			}
			catch (e)
			{
			
			}
		}
		var lout = "NULL";
		var lin = "NULL";
		var tf = "NULL";
		var cf = "NULL";
		var ry = "NULL";
		var rg = "NULL";
		var xpr = "NULL"
		var nepot = "NULL";
		var yskor = "NULL";
		var sanctions = "NULL";
		var sText = "";
		var spam = 0;
		var date_check = "";
		var btn = XToolCheckerThreads.GetThread(threadIndex)._clickedButton;
		console.log("btn = "+ btn);
		var isDomain = (btn.name.indexOf(cn._buttonXTDPrefix) == 0);
		if (result.linkpad !== undefined)// solomono
		{
			if (isDomain)
			{
				if (result.linkpad.domain_out !== undefined)
				{
					lout = result.linkpad.domain_out;//links_outbound;
					tmpObj.lout = lout;
				}
				if (result.linkpad.domain_in !== undefined)
				{ 
					lin = result.linkpad.domain_in;//links_internal;
					tmpObj.lin = lin;
				}
			}
		}
		
		if (result.megaindex !== undefined)
		{
			if (isDomain)
			{
				if ((result.megaindex.domains_out !== undefined) && (result.megaindex.domains_out != null))
				{
					lout = result.megaindex.domains_out;
					tmpObj.lout = lout;
				}
				if ((result.megaindex.domains_in !== undefined) && (result.megaindex.domains_in != null))
				{ 
					lin = result.megaindex.domains_in;
					tmpObj.lin = lin;
				}
			}
		}
		if ((result.xpr !== undefined) )
		{
			xpr = result.xpr;
			tmpObj.xpr = xpr;
		}
		if ((result.yandex !== undefined) && (result.yandex.progress_total !== undefined))
		{
			ry = result.yandex.progress_total;
			tmpObj.ry = ry;
		}
		if ((result.yandex !== undefined) && (result.yandex.pages_speed_change !== undefined))
		{
			yskor = result.yandex.pages_speed_change;
			tmpObj.yskor = yskor;
		}
		if ((result.yandex !== undefined) && (result.yandex.sanctions !== undefined))
		{
			sanctions = result.yandex.sanctions;
			tmpObj.sanctions = sanctions;
		}
		if ((result.google !== undefined) && (result.google.progress_total !== undefined))
		{
			rg = result.google.progress_total;
			tmpObj.rg = rg;
		}
		if (result.nepot !== undefined)
		{
			nepot = result.nepot;
			tmpObj.nepot = nepot;
		}
		if (result.spammed !== undefined)
		{
			spam = result.spammed;
			tmpObj.spam = spam;
		}
		var delta = "";
		if (result.xt_change !== undefined)
		{
			delta = result.xt_change;
		}
		
		if (result.majesticseo !== undefined)
		{
			if (result.majesticseo.trust_flow !== undefined)
			{
				tf = result.majesticseo.trust_flow;
				tmpObj.tf = tf;
			}
			if (result.majesticseo.citation_flow !== undefined)
			{
				cf = result.majesticseo.citation_flow;
				tmpObj.cf = cf;
			}
		}
		if (result.date_check !== undefined)
		{
			date_check = result.date_check;
		}
		if (result.stability !== undefined)
		{
			try {
			this._stabValue = parseInt(result.stability);
			}
			catch(e)
			{
				this._stabValue = -1;
			}
			XToolChecker.UpdateStabImage();
		}
		var history = "";
		if  ((sts._useDomainXTHist) && (result.xt_history !== undefined))
		{
			try 
			{
				var hist = result.xt_history.split('#');
				while (hist.length > 11)
					hist.pop();
				history = hist.join(' ');
			}
			catch (e)
			{
			
			}
		}
		
		if ((result.xt === undefined) || (result.xt == "")|| (result.xt == null))
			result.xt = "ER";
		
//*//			btn.alt =  results.join("|||");
		
		
		btn.alt = JSON.stringify(tmpObj);
		
		var sign = "";
		/*if (results.length > 5)
		{
			if (results[5] == "1")
				sign = "+";
			else if (results[5] == "-1")
				sign = "-";
		}*/
		btn.value = result.xt;
		btn.title = "";
		try
		{
			if ((result.page  != undefined) && (result.page.title != undefined))			
			{
				console.log('AddToDatabase');
				XToolChecker.AddToDatabase(XToolCheckerThreads.GetThread(threadIndex)._lastRequestedUrl, btn, result.xt, result.page.title, isDomain, XToolCheckerThreads.GetThread(threadIndex)._colorScheme, lin, lout, spam, history, rg, ry, nepot, tf, cf, 1);
				
				if (sts._showHint)
				{
					if (btn.title == "")
						btn.title = result.page.title;
				}
			}
			else
			{
				console.log('AddToDatabase');
				XToolChecker.AddToDatabase(XToolCheckerThreads.GetThread(threadIndex)._lastRequestedUrl, btn, result.xt, "", isDomain, XToolCheckerThreads.GetThread(threadIndex)._colorScheme, lin, lout, spam, history, rg, ry, nepot, tf, cf, 1);
			}
		}
		catch(e)
		{
			XToolChecker.DebugMsg(e);
		}
		if (date_check != "")
		{
			XToolChecker.AddParamToTitle(btn, "Дата проверки", date_check);
		}
		if (/*(sts._show_lin) &&*/ (xpr != "NULL") && (xpr != ""))
		{
			XToolChecker.AddParamToTitle(btn, "xpr", xpr, threadIndex, true);
		}
		if ((sts._show_lin) && (lin != "NULL") && (lin != ""))
		{
			XToolChecker.AddParamToTitle(btn, "Lin", lin, threadIndex, true);
		}
		if ((sts._show_lout) && (lout != "NULL") && (lout != ""))
		{
			XToolChecker.AddParamToTitle(btn, "Lout", lout, threadIndex, true);
		}
		if ((yskor) && (yskor.toUpperCase() != "NULL") && (yskor != ""))
		{
			XToolChecker.AddParamToTitle(btn, "Yskor", yskor, threadIndex);
		}
		if ((sanctions) && (sanctions.toUpperCase() != "NULL") && (sanctions != ""))
		{
			if (sanctions == "1")
			{
				XToolChecker.AddParamToTitle(btn, "", "Санкции яндекса: агс");
				sText="A";
			}
			else if (sanctions == "2")
			{
				XToolChecker.AddParamToTitle(btn, "", "Санкции яндекса: некачественные исходящие ссылки, непот");
				sText="И";
			}
			else if (sanctions == "3")
			{
				XToolChecker.AddParamToTitle(btn, "", "Санкции яндекса: входящие ссылки, зона риска");
				sText="В";
			}
			else if (sanctions == "4")
			{
				XToolChecker.AddParamToTitle(btn, "", "Санкции яндекса: минусинск");
				sText="M";
			}
		}

		XToolChecker.AddParamToTitle(btn, "TF", tf, threadIndex, true);
		XToolChecker.AddParamToTitle(btn, "CF", cf, threadIndex, true);

		if ((ry) && (ry.toUpperCase() != "NULL") && (ry != ""))
		{
			XToolChecker.AddParamToTitle(btn, "RY", ry, threadIndex, true);
			if (sts._use_auto_select_ry)
			{
				try
				{
					
					var ry_value = -1;
					if (ry != "")
						ry_value = parseInt(ry);
					if ((isNaN(ry_value)) || ( ry_value < sts._ryValue))
					{
						XToolChecker.CheckIfRequired(docUrl, threadIndex, btn);
					}
				}
				catch (e)
				{
					
				}
				
			}
		}
		if ((rg) && (rg.toUpperCase() != "NULL") && (rg != ""))
		{
			XToolChecker.AddParamToTitle(btn, "RG", rg, threadIndex, true);
				
			if (sts._use_auto_select_rg)
			{
				try
				{
					
					var rg_value = -1;
					if (rg != "")
						rg_value = parseInt(rg);
					if ((isNaN(rg_value)) || ( rg_value < sts._rgValue))
					{
						XToolChecker.CheckIfRequired(docUrl, threadIndex, btn);
					}
				}
				catch (e)
				{
					
				}
				
			}
		}
		
		
		
		if (history != "")
		{
			XToolChecker.AddParamToTitle(btn, "XT hist", history);
					//+
		}
		var orange = false;
		if ((spam) && (spam.toUpperCase() != "NULL") && (spam != ""))
		{	
			
			try
			{
				var value = parseFloat(spam);
				if (value > 0)
					btn.title = "Заспамленность ссылками (" + spam + ") ! | " + btn.title;
				if ((!isNaN(value)) && ( value >= sts._spamValue) /*&& (btn.name != cn._mainButtonPrefix)*/)
					orange = true;
				if ((!isNaN(value)) && ( value >= sts._spamCheckValue) && (btn.name != cn._mainButtonPrefix))
				{
					
					
					if ((btn.name.indexOf(cn._buttonXTDPrefix) == 0) && (sts._use_auto_select_spam))
					{
						XToolChecker.SetCheckForButton(threadIndex,btn);
						if (sts._auto_gbl_spam)
						{
							var domain = XToolCheckerThreads.GetThread(threadIndex)._lastRequestedUrl;
							try { XToolChecker.AddToGBL(domain); } 
							catch (e) {}
						}
						
					}
				}
			
			}
			catch(e)
			{
			//
			}
			
			if (XToolCheckerThreads.GetThread(threadIndex)._colorScheme != 1)
			{
				if (orange)
					XToolCheckerThreads.GetThread(threadIndex)._colorScheme = 3;	
				else
					if (XToolCheckerThreads.GetThread(threadIndex)._colorScheme == 3)
						XToolCheckerThreads.GetThread(threadIndex)._colorScheme = 0;
			}
		}
		
		if (XToolCheckerThreads.GetThread(threadIndex)._colorScheme == 2)
		{
			XToolChecker.AddParamToTitle(btn, "", "Отсутствует сохранённая копия в яндексе");
		}
		if ((nepot) && (nepot.toUpperCase() != "NULL") && (nepot != ""))
		{
			XToolChecker.AddParamToTitle(btn, "Вероятность непота", nepot);
			
			XToolChecker.CheckNepot(nepot, btn, threadIndex);
			
		}
		if ((XToolChecker.StringIsNumber(result.xt)) || (result.xt == "-1"))
		{
		
			if (sts._useAutoSelect)
			{
				if ((btn.name.indexOf(cn._buttonXTDPrefix) == 0) && (result.xt != -1))
				{
					try
					{
						var value = parseFloat(result.xt);
						console.log(value);
						if ((!isNaN(value)) && ( value < sts._auto_select_max_value) && (btn.name != cn._mainButtonPrefix))
						{
							XToolChecker.SetCheckForButton(threadIndex,btn);
							if (sts._auto_gbl_xtd)
							{
								var domain = XToolCheckerThreads.GetThread(threadIndex)._lastRequestedUrl;
								try { XToolChecker.AddToGBL(domain); } 
								catch (e) {}
							}
						}
					}
					catch(e)
					{
					
					}
				}
			}
			 if (sts._useAutoSelectXTDYellow)
			{
				if (XToolCheckerThreads.GetThread(threadIndex)._colorScheme == 1)
					if ((btn.name.indexOf(cn._buttonXTDPrefix) == 0) && (result.xt != -1))
					{
						try
						{
							var value = parseFloat(result.xt);
							
							if ((!isNaN(value)) && ( value > 0) && (btn.name != cn._mainButtonPrefix))
							{
								if (sts._filters_codes.indexOf(sanctions) != -1)
								{
									XToolChecker.SetCheckForButton(threadIndex,btn);
									if (sts._auto_gbl_flt)
									{
										var domain = XToolCheckerThreads.GetThread(threadIndex)._lastRequestedUrl;
										try { XToolChecker.AddToGBL(domain); } 
										catch (e) {}
									}
								}
							}
						}
						catch(e)
						{
						
						}
					}
			}
			if ((sts._useAutoSelectXT)  && (result.xt != -1) && (!isDomain))
			{
				try
				{
					var value = parseFloat(result.xt);
					
					if ((!isNaN(value)) && (value < sts._auto_select_XT_max_value) && (btn.name != cn._mainButtonPrefix))
					{
						XToolChecker.SetCheckForButton(threadIndex,btn);
					}
				}
				catch(e)
				{
				
				}
			 }
			if (sts._useAutoSelectXTNO)
			{
				if ((result.xt == "-1") && (btn.name != cn._mainButtonPrefix))
				{
					XToolChecker.SetCheckForButton(threadIndex,btn);
				}
			}
			 if (result.xt == "-1")
			 {
				 XToolCheckerThreads.SetCurrentButton(threadIndex, "", "", "", "blue");
				 backgroundColor =  "blue";
			 }
			 else
			 {
				XToolCheckerThreads.SetCurrentButton(threadIndex, "", "", "", "xt");
				backgroundColor =  "xt";
			 }
			 if (sts._useColorXT)
			 {
				if (XToolCheckerThreads.GetThread(threadIndex)._colorScheme == 0)
				{
					try
					{
						var value = parseFloat(result.xt);
						if (btn.name.indexOf(cn._buttonXTDPrefix) == 0)
						{
							if ((!isNaN(value)) && ( value < sts._auto_select_max_value))
							{
								backgroundColor = XToolCheckerThreads._customXTColor[0];
							}
						}
						else
						{
							if ((!isNaN(value)) && ( value < sts._auto_select_XT_max_value))
							{
								backgroundColor = XToolCheckerThreads._customXTColor[0];
							}
						}
					}
					catch(e)
					{
					}
				}
				
			}
		}
		else
		{
			if (result.xt == "ER")
			{
				XToolCheckerThreads.SetCurrentButton(threadIndex, "", "", "", "error");
				backgroundColor =  "error";
			}
			else
			{
				XToolCheckerThreads.SetCurrentButton(threadIndex, "", "", "", "white");
				backgroundColor =  "white";
				if (result.xt == "LIM")
				{
					if (XToolCheckerThreads.GetThread(threadIndex)._multiCheck)
					{
						XToolChecker.SetLimButtons(btn, threadIndex);
						return;
					}
				}
				
			}
		}
		console.log("UpdateButtonText_");
		var deltaText = XToolChecker.PrepareDeltaText(delta)
		XToolCheckerThreads.SetCurrentButton(threadIndex, result.xt + deltaText, btn.alt, deltaText + btn.title, backgroundColor);
		//XTBrowserTools.UpdateButtonText(btn, result.xt, delta+"", btn.title, XToolCheckerThreads.GetThread(threadIndex)._tabID, btn.ownerDocument/*,sText*/);
		
		if (btn.name == cn._mainButtonPrefix)
		{
		/*	var tbButton = document.getElementById("xtool_checker-fastXT");
			tbButton.label = "(xt): " + btn.value + sText;
			tbButton.style.color = btn.style.backgroundColor;
			tbButton.tooltipText = "[XT для текущей вкладки] " + btn.title;*/ 
			XTBrowserTools.SetElementValue(this._tbButtonName, "(xt): " + btn.value + sText);
			
			//backgroundColor = btn.style.backgroundColor;
			console.log("color = "+backgroundColor);
			if (backgroundColor.indexOf("#") == -1)
				backgroundColor = XToolCheckerThreads.GetColorByName(backgroundColor, threadIndex);
			console.log("color = "+backgroundColor);
			XTBrowserTools.SetElementColor(this._tbButtonName, backgroundColor);
			XTBrowserTools.SetElementTooltip(this._tbButtonName, "[XT для текущей вкладки] " + btn.title);
		}

		}
		catch (e)
		{
			XToolChecker.MsgToConsole("ProcessXT error: " + e);
			XToolCheckerThreads.SetCurrentButton(threadIndex, "ER", "", "", "red");
		}
		XToolCheckerThreads.ClearCurrentButton(threadIndex);
	},

	PrepareDeltaText : function (delta)
	{
		var result = '';
		console.log("PrepareDeltaText");
		var cn = XToolCheckerConst;
		
		if ((delta != "") && (delta != "0"))
		{
			
			if (delta.indexOf("-") == -1)
			{
				delta = String.fromCharCode(8593) + " +" + delta;
				result += " " + String.fromCharCode(8593);
			}
			else
			{
				delta = String.fromCharCode(8595) + " " + delta;
				result += " " + String.fromCharCode(8595);
			}
				
			var index = delta.indexOf(".");
			if ((index != -1) && (index + 3 < delta.length))
				delta = delta.substring(0, index + 3);
			
		}
		return result;
	},
	
	CheckNepot : function (nepot, btn, threadIndex)
	{
		try
		{	
			var nepot_value = -1;
			if (nepot != "")
				nepot_value = parseInt(nepot);
			if (XToolChecker._use_auto_highlight_nepot)
			{
				if ((isNaN(nepot_value)) || ( nepot_value > XToolChecker._nepotHValue))
				{
					if ((threadIndex != -1) && (XToolCheckerThreads.GetThread(threadIndex)._colorScheme < 1))
						XToolCheckerThreads.GetThread(threadIndex)._colorScheme = 4;	
				}
			}
			if (XToolChecker._use_auto_select_nepot)
			{
				if ((isNaN(nepot_value)) || ( nepot_value > XToolChecker._nepotValue))
				{
					XToolChecker.CheckIfRequired(docUrl, threadIndex, btn);
				}
			}
		}
		catch (e)
		{
			XToolChecker.DebugMsg("SetCheckForButton: " + e);
		}
	},
	
	
	EndMulticheck : function(stopping, threadIndex)
	{
		XToolCheckerThreads.ClearMulticheckThread(threadIndex);
		if (!XToolCheckerThreads.HasMultichecks())
		{
			XTBrowserTools.SetElementHidden(this._stopButtonName, true);
			XTBrowserTools.SetElementHidden(this._pauseButtonName, true);
		}
		XToolChecker.updateStage(1, 1, true);
	},

	AddParamToTitle : function(btn, paramName, param, threadIndex, setTextToBlock = false)
	{
		if ((param) && (param.toUpperCase() != "NULL") && (param != ""))
		{
			if (btn.title != "")
				btn.title += "		";
			if (paramName != "")
			{
				btn.title += paramName + ": " + param;
				if (threadIndex >= 0 && setTextToBlock)
					XToolCheckerThreads.SetNextElementText(threadIndex, paramName + ": " + param, '#000000', XToolCheckerConst._infoBlockPrefix + paramName);
			}
			else
				btn.title += param;
		}
	},
	
	SetLimButtons : function(btn, threadIndex)
	{
		var title = XToolCheckerThreads.GetThread(threadIndex)._clickedButton.title;
		while (XToolCheckerThreads.GetThread(threadIndex)._current < XToolCheckerThreads.GetThread(threadIndex)._total)
		{
			XToolCheckerThreads.UpdateCurrentButton(threadIndex);
			XToolCheckerThreads.SetCurrentButton(threadIndex, "lim", "", title, "white");
			XToolChecker.updateStage(XToolCheckerThreads.GetThread(threadIndex)._current, XToolCheckerThreads.GetThread(threadIndex)._total, false);
			XToolCheckerThreads.GetThread(threadIndex)._current++;
		}
		XToolChecker.EndMulticheck(false, threadIndex);
	},

	IsPageToCheck : function(url)
	{
		var cn = XToolCheckerConst;
		var sts = XTSettings;
		var mode = XToolChecker.GetMode(url, cn._modes.auto);
		console.log("mode = " + mode);
		var hrefL = url;
		if ((mode == cn._modes.sape) && 
			(((hrefL.indexOf(cn._linksPart) != -1) || 
			(hrefL.indexOf(cn._linksWaitPart) != -1) ||
			(hrefL.indexOf(cn._linksNewPricePart) != -1) ||
			(hrefL.indexOf(cn._submitOrdersPart) != -1) ||
			(hrefL.indexOf(cn._prSearchPart) != -1) ||
			(hrefL.indexOf(cn._prAdvertsPart) != -1) ||
			(hrefL.indexOf(cn._pr2SearchPart) != -1) ||
			(hrefL.indexOf(cn._pr2AdvertsPart) != -1)) ||
			(((hrefL.indexOf(cn._ordersPart) != -1) || (hrefL.indexOf(cn._searchPart) != -1)) && (sts._check_on_orders_page))))
		{
			return true;
		}
		else
		{
			if  ((mode == cn._modes.seopult) && (hrefL.indexOf(cn._seopultPart ) != -1))
			{
				return true;
			}
			else if  ((mode == cn._modes.liex) && 
				((hrefL.toLowerCase().indexOf(cn._liexPart ) != -1) ||
					(hrefL.toLowerCase().indexOf(cn._liexPart2 ) != -1) ||
					(hrefL.toLowerCase().indexOf(cn._liexPart21) != -1)
					/*||
					(hrefL.toLowerCase().indexOf(cn._liexPart3 ) != -1)*/))
			{
				return true;
			}
			else if  ((mode == cn._modes.xap) && ((hrefL.toLowerCase().indexOf(cn._xapPart ) != -1) ||
				(hrefL.toLowerCase().indexOf(cn._tnxPart ) != -1)))
			{
				return true;
			}
			else if  ((mode == cn._modes.blogun) && (hrefL.toLowerCase().indexOf(cn._blogunPartRequests ) != -1))
			{
				return true;
			}
			else if ((mode == cn._modes.linkfeed) && ((hrefL.toLowerCase().indexOf(cn._linkfeedList) != -1) || 
				(hrefL.toLowerCase().indexOf(cn._linkfeedLinksOpt) != -1) ||
				(hrefL.toLowerCase().indexOf(cn._linkfeedLinksOptWait) != -1) ||
				(hrefL.toLowerCase().indexOf(cn._linkfeedLinksOptPlaced) != -1) ||
				(hrefL.toLowerCase().indexOf(cn._linkfeedLinksOptListWait) != -1) ||
				(hrefL.toLowerCase().indexOf(cn._linkfeedLinksOptListAllWait) != -1)))
			{
				return true;
			}
			else if ((mode == cn._modes.mainlink) && ((hrefL.toLowerCase().indexOf(cn._mainlinkPart) != -1) || 
			(hrefL.toLowerCase().indexOf(cn._mainlinkSeoPart) != -1) ||
			(hrefL.toLowerCase().indexOf(cn._mainlinkSecondPart) != -1)) )
			{
				if (hrefL.toLowerCase().indexOf(cn._mainlinkSecondPartAdd) != -1)
					return false;
				else
					return true;
			}
			else if ((mode == cn._modes.gogetlinks) && ((hrefL.toLowerCase().indexOf(cn._gogetlinksPost ) != -1)))
			{
				return true;
			}
			else if ((mode == cn._modes.rookee) && (hrefL.toLowerCase().indexOf(cn._rookeePart ) != -1))
			{
				return true;
			}
			else if ((mode == cn._modes.seohammer) && 
				((hrefL.toLowerCase().indexOf(cn._seohammer ) != -1) || (hrefL.toLowerCase().indexOf(cn._seohammer1) != -1)))
			{
				return true;
			}
			else if ((mode == cn._modes.webeffector) && (hrefL.toLowerCase().indexOf(cn._webEffector) != -1))
			{
				return true;
			}
			else if ((mode == cn._modes.solomono) && (hrefL.toLowerCase().indexOf(cn._solomono) != -1))
			{
				return true;
			}
			else if (url.indexOf('a6d4c860-db80-4669-a9ea-2454c7bf801f/content/custom_links.html') != -1) // generated
			{
				return true
			}
			else if ((mode == cn._modes.rotapost) && (hrefL.toLowerCase().indexOf(cn._rotapostPart) != -1))
			{
				return true;
			}
			else if ((mode == cn._modes.all) && (sts._checkInAllMode))
			{			
				return true;
			}
			else if  ((mode == cn._modes.megaindex) && (hrefL.indexOf(cn._megaindex ) != -1))
			{
				return true;
			}
			
			else if ((mode == cn._modes.setlinks) && (hrefL.toLowerCase().indexOf(cn._setlinks) != -1))
			{
				return true;
			}
			else if ((mode == cn._modes.getgoodlinks) && ((hrefL.toLowerCase().indexOf(cn._getgoodlinksPostView ) != -1)))
			{
				return true;
			}
			else if ((mode == cn._modes.seowizard) && ((hrefL.toLowerCase().indexOf(cn._seowizardPart ) != -1)))
			{
				return true;
			}
			else if ((mode == cn._modes.forumok) && ((hrefL.toLowerCase().indexOf(cn._forumokPart ) != -1)))
			{
				return true;
			}
			else
			{
				return false;
			}
		}
	},

	
	
	
	
	SetCheckForButton : function(threadIndex, btn, toggle)
	{
		try{
		var docUrl = XToolCheckerThreads.GetThread(threadIndex)._url;
		var cn = XToolCheckerConst;
		var pageToCheck = XToolChecker.IsPageToCheck(docUrl);
		console.log("is page to check = "+pageToCheck);
		XTBrowserTools.SetCheckForButton(btn, XToolCheckerThreads.GetThread(threadIndex)._doc, XToolCheckerThreads.GetThread(threadIndex)._tabID, pageToCheck, toggle)
		}
		catch(e)
		{
			XToolChecker.ReportError("SetCheckForButton: ", e);
		}
	},
	
	
	GetMode : function (url, mode)
	{
		var cn = XToolCheckerConst;
		if (mode == cn._modes.auto)
		{
			var href = url.toLowerCase();
/*			for (var i=0; i<cn._modesUrl.length; i++) {
				if (url.indexOf(cn._modesUrl[i][0]) != -1)
				{
					console.log("Url = "+cn._modesUrl[i][0]);
					console.log("Mode = "+cn._modesUrl[i][1]);
					return cn._modesUrl[i][1];
				}
			  }*/
			if (href.toLowerCase().indexOf(cn._rookeePart) != -1)
			{
				return cn._modes.rookee;
			}
			else if ((href.toLowerCase().indexOf(cn._gogetlinksPost) != -1) ||
				(href.toLowerCase().indexOf(cn._gogetlinksSearch) != -1))
			{
				return cn._modes.gogetlinks;				
			}
			else if (href.toLowerCase().indexOf(cn._webEffector) != -1)
			{
				return cn._modes.webeffector;				
			}
			else if ((href.toLowerCase().indexOf(cn._mainlinkPart) != -1) ||
			    (href.toLowerCase().indexOf(cn._mainlinkSeoPart) != -1) ||
				(href.toLowerCase().indexOf(cn._mainlinkSecondPart) != -1))
			{
				return cn._modes.mainlink;
			}
			else if ((href.toLowerCase().indexOf(cn._linkfeedList) != -1) ||
				(href.toLowerCase().indexOf(cn._linkfeedLinksOpt) != -1) ||
				(href.toLowerCase().indexOf(cn._linkfeedLinksOptWait) != -1) ||				
				(href.toLowerCase().indexOf(cn._linkfeedLinksOptPlaced) != -1) ||
				(href.toLowerCase().indexOf(cn._linkfeedFilters) != -1) ||
				(href.toLowerCase().indexOf(cn._linkfeedLinksOptListAllWait) != -1) ||
				(href.toLowerCase().indexOf(cn._linkfeedLinksOptListWait) != -1) )
			{
				return cn._modes.linkfeed;
			}
			else if ((href.toLowerCase().indexOf(cn._blogunPartList) != -1) ||
				(href.toLowerCase().indexOf(cn._blogunPartRequests) != -1) ||
				(href.toLowerCase().indexOf(cn._blogunCampainReport) != -1))
			{
				return cn._modes.blogun;
			}
			else if ((href.toLowerCase().indexOf(cn._xapPart) != -1) || 
				(href.toLowerCase().indexOf(cn._tnxPart) != -1))
			{	
				return cn._modes.xap;
			}
			else if ((href.toLowerCase().indexOf(cn._liexPart) != -1) ||
				(href.toLowerCase().indexOf(cn._liexPart2) != -1) ||
				(href.toLowerCase().indexOf(cn._liexPart3) != -1))
			{
				return cn._modes.liex;
			}
			else if ((href.toLowerCase().indexOf(cn._seopultPart) != -1) ||
					(href.toLowerCase().indexOf(cn._seopultPrjPart) != -1))
			{	
				return cn._modes.seopult;
			}
			else if ((href.indexOf(cn._linksPart) != -1) ||
				(href.indexOf(cn._linksWaitPart) != -1) ||
				(href.indexOf(cn._linksNewPricePart) != -1) ||
				(href.indexOf(cn._linksSitePart) != -1) ||
				(href.indexOf(cn._projectsPart) != -1) ||
				(href.indexOf(cn._ordersPart) != -1) ||
				(href.indexOf(cn._searchPart) != -1) ||
				(href.indexOf(cn._sitesPart) != -1)||
				(href.indexOf(cn._submitOrdersPart) != -1)||
				(href.indexOf(cn._prSearchPart) != -1) ||
				(href.indexOf(cn._prAdvertsPart) != -1) ||
				(href.indexOf(cn._apiLinksRentPart) != -1))
			{
				return cn._modes.sape;
			}
			else if ((href.toLowerCase().indexOf(cn._rotapostPart) != -1) ||
			(href.toLowerCase().indexOf(cn._rotapostPartBuy) != -1))
			{
				return cn._modes.rotapost;				
			}
			else if ((href.toLowerCase().indexOf(cn._setlinks) != -1) ||
				(href.toLowerCase().indexOf(cn._setlinksSearch) != -1))
			{
				return cn._modes.setlinks;				
			}
			else if ((href.toLowerCase().indexOf(cn._miralinks) != -1) ||
				(href.toLowerCase().indexOf(cn._miralinks2) != -1))
			{
				return cn._modes.miralinks;				
			}
			else if ((href.toLowerCase().indexOf(cn._getgoodlinksSearch) != -1) ||
					(href.toLowerCase().indexOf(cn._getgoodlinksPostView) != -1))
			{				
				return cn._modes.getgoodlinks;				
			}
			else if (href.toLowerCase().indexOf(cn._seowizardPart) != -1)
			{				
				return cn._modes.seowizard;				
			}
			else if (href.toLowerCase().indexOf(cn._forumokPart) != -1)
			{				
				return cn._modes.forumok;				
			}
			return cn._modes.none;
	
		}
		else
		{
			return mode;
		}
	
	},
	
	
	IsCheckedRookee :  function(btn)
	{
		try{
			var tmpObj = btn;
			while  ((tmpObj) && (tmpObj.nodeType == 1))
			{
			
				if ((tmpObj.nodeName.toLowerCase() == "div") && (tmpObj.className.indexOf("x-grid3-row ") != -1))
				{
					if (tmpObj.className.indexOf("x-grid3-row-selected") != -1)
					{
						return true;
					}
					
				}
				tmpObj = tmpObj.parentNode;
			}
		}
		catch(e)
		{
			XToolChecker.ReportError("IsCheckedRookee: ", e);
		}
		return false;
	},
	
	SearchPft : function()
	{
//*//
/*		var windowMediator = Components.classes['@mozilla.org/appshell/window-mediator;1']
					.getService(Components.interfaces.nsIWindowMediator);
		var _window = windowMediator.getMostRecentWindow("navigator:browser"); 
		
		var docroot =  _window.document;
		var shadow = docroot.getElementById("hiddenBrowserXtool");
		if (!shadow)
		{			
			if (!this._test_with_history)
				shadow = docroot.createElement('iframe');
			else
				shadow = docroot.createElement('browser');
			shadow.setAttribute("id", "hiddenBrowserXtool");
			shadow.setAttribute("collapsed", true);
			shadow.setAttribute("type", "content");

			// Вставляем браузер в иерархию окна:
			docroot.documentElement.appendChild(shadow);

			// Важно - останавливаем загрузку страницы по умолчанию:
			shadow.webNavigation.stop(Components.interfaces.nsIWebNavigation.STOP_NETWORK);

////			var shadow = tmpBrowser;
			shadow.docShell.allowJavascript    = true;
			shadow.docShell.allowAuth          = true;
			shadow.docShell.allowPlugins       = true;
			shadow.docShell.allowMetaRedirects = true;
			shadow.docShell.allowSubframes     = true;
			shadow.docShell.allowImages        = true;
			shadow.docShell.allowWindowControl = true;
		}

		shadow.addEventListener("DOMContentLoaded", XToolChecker.TestTabLoad, true);

		//XToolChecker._lastUrl = input.value.trim();
		shadow.webNavigation.loadURI(
			"http://yandex.ru/yandsearch?text=" + XToolChecker.ReplaceBadSymbols(XToolChecker._pftStr),
			null, null, null, null);
*/			
	},
	
	OpenSearch : function(event)
	{
//*//
/*		
		var prompts = Components.classes["@mozilla.org/embedcomp/prompt-service;1"]  
                        .getService(Components.interfaces.nsIPromptService);  
  
		var check = {value: false};  
		var input = {value: "http://"};
		var result = prompts.prompt(null, "Запрос url", "Url для поиска: ", input, null, check);  
		//tmpBrowser.addEventListener("DOMContentLoaded", XToolChecker.TestTabLoad, true);
		if ((result) && (input.value != ""))
		{

			
			var windowMediator = Components.classes['@mozilla.org/appshell/window-mediator;1']
					.getService(Components.interfaces.nsIWindowMediator);
			var _window = windowMediator.getMostRecentWindow("navigator:browser"); 
			
			var docroot =  _window.document;
			var shadow = docroot.getElementById("hiddenBrowserXtool");
		
			if (!shadow)
			{			
				if (!this._test_with_history)
					shadow = docroot.createElement('iframe');
				else
					shadow = docroot.createElement('browser');
				shadow.setAttribute("id", "hiddenBrowserXtool");
				shadow.setAttribute("collapsed", true);
				shadow.setAttribute("type", "content");

				// Вставляем браузер в иерархию окна:
				docroot.documentElement.appendChild(shadow);

				// Важно - останавливаем загрузку страницы по умолчанию:
				shadow.webNavigation.stop(Components.interfaces.nsIWebNavigation.STOP_NETWORK);

	////			var shadow = tmpBrowser;
				shadow.docShell.allowJavascript    = true;
				shadow.docShell.allowAuth          = true;
				shadow.docShell.allowPlugins       = true;
				shadow.docShell.allowMetaRedirects = true;
				shadow.docShell.allowSubframes     = true;
				shadow.docShell.allowImages        = true;
				shadow.docShell.allowWindowControl = true;
			}

			shadow.addEventListener("DOMContentLoaded", XToolChecker.TestTabLoad, true);
	
			XToolChecker._pftUrl = input.value.trim();
			XToolChecker._pftThreadIndex = -1;
			shadow.webNavigation.loadURI(
				"http://yandex.ru/yandsearch?text=" + XToolChecker.ReplaceBadSymbols(XToolChecker._pftUrl),
				null, null, null, null);			
		}
*/		
	},
	
	TestTabLoad : function (event)
	{
//*//
/*		try
		{
			var doc = event.originalTarget;  
			var windowMediator = Components.classes['@mozilla.org/appshell/window-mediator;1']
					.getService(Components.interfaces.nsIWindowMediator);
			var _window = windowMediator.getMostRecentWindow("navigator:browser"); 
			
			var docroot =  _window.document;
			var shadow =docroot.getElementById("hiddenBrowserXtool");; 
			if ((shadow) && (shadow.webNavigation.sessionHistory))
			{
				var purge = shadow.webNavigation.sessionHistory.count;
				if (purge) shadow.webNavigation.sessionHistory.PurgeHistory(purge); 

			}
			if (event.originalTarget.nodeName.toLowerCase() == "#document") 
			{ 
				
				if (( doc.location.href.indexOf("yandex.ru") != -1) && ( doc.location.href.indexOf("yandsearch") != -1))
				{
					if (!XToolChecker.FindLink(doc, XToolChecker._pftUrl))
					{
						XToolChecker.DebugMsg("link not found");
						XToolChecker.EndPft();
					}
					return;
					
				}
				else
				{
					setTimeout(function() { XToolChecker.ShowBrowserContent(shadow); }, 5000);
					
					shadow.removeEventListener("DOMContentLoaded", XToolChecker.TestTabLoad, true);
					return;
				}
			}
		}
		catch(e)
		{
			XToolChecker.ReportError("TestTabLoad: ", e);
			XToolChecker.EndPft();
		}*/
	},
	
	EndPft : function ()
	{
		var index = XToolChecker._pftThreadIndex;
		this._processingPft = false;
		this._pftThreadIndex = -1;
		this._needPft = false;
		if (index != -1)
			XToolChecker.GotoNextButton(index);
	},
	
	ShowBrowserContent : function(shadow)
	{
		var doc = shadow.contentDocument;
		var req = new XMLHttpRequest(); 
		req.withCredentials = true;		
		var loginInfoLabel = document.getElementById("xtool_login_info_label");
		var action = "http://xtool.ru/upd_pf.php?email="+loginInfoLabel.value;
		//XToolChecker.DebugMsg(action);
		req.open('GET', action, true);  
		req.onreadystatechange = XToolChecker.ResponseUpd;
		req.send(null); 
		XToolChecker.DebugMsg(doc.documentElement.innerHTML);
		XToolChecker.EndPft();
	},
	
	ResponseUpd: function (event)
	{
		if(this.readyState == 4) 
		{
			if (this.status == 200)
			{
				XToolChecker.DebugMsg(this.responseText);
			}
		}
	},
	
	FindLink : function (doc, url)
	{
	try {
		var href = XToolChecker.PrepareLink(url);
		var links = doc.documentElement.getElementsByTagName("A");
		var founded = 0;
		for (var i = 0; i < links.length; i++)
		{
			if (links[i].target != "_blank")
				continue;
			var href2 = links[i].href;
			href2 = href2.replace(/\&amp\;/g, "&");
			href2 = href2.replace(/\'/g, "%27");
			href2 = XToolChecker.PrepareLink(href2);
			if (href2 == href)
			{
				founded = links[i];
				break;
			}
					
			if (href2.toLowerCase() == href.toLowerCase())
			{
				// isDifferentCase
				founded = links[i];
				break;
			}
			if ((href2 + "/" == href) || (href + "/" == href2))
			{
				//isSlash = true;
				founded = links[i];
				break;
			}
		}
		if (founded != 0)
		{
			founded.target = "_self";
			founded.click();
			return true;
		}
		}
	catch(e)
	{
		XToolChecker.ReportError("FindLink: ", e);
	}
		return false;
	},
	
	IsChecked : function(btn)
	{
		try
	{
		
		if (btn.ownerDocument.location.href.indexOf(this._rookeePart) != -1)
		{
			return XToolChecker.IsCheckedRookee(btn);
		}
		var tmpObj = btn;
		while (tmpObj.nodeType == 1)
		{
			if (tmpObj.nodeName == "TR")
			{
				var inputs = tmpObj.getElementsByTagName("INPUT");
				for (var i = 0; i < inputs.length; i++)
				{
					if (inputs[i].type == "checkbox")
					{
						if (inputs[i].checked)
						{
							return true;
						}
					}
				}
				return false;
			}
			
			tmpObj = tmpObj.parentNode;
			
		}
		
		return false;
	}
	catch(e)
	{
		XToolChecker.ReportError("IsChecked: ", e);
	}
	},


	menuSettingsClick : function(event) 
	{
		
		var menuItem = event.target;

		this._mode = menuItem.value;
		XToolChecker._prefs.setCharPref(XToolChecker._settingsPrefix + 'Mode', this._mode);
		XToolChecker.RefreshButtons(0);
		
	},
	
	/*AddToDatabase2 : function(checker, url, button, rank, tooltip, isDomain, colorScheme, lin, lout, spam, hist, tabid, doc)
	{
		checker.AddToDatabase(url, button, rank, tooltip, isDomain, colorScheme, lin, lout, spam, hist, tabid, doc);
	},*/

	AddToDatabase : function(url, button, rank, tooltip, isDomain, colorScheme, lin, lout, spam, hist, tabid, doc)
	{
		var sts = XTSettings;
		if (!sts._useCache)
			return;
		if ((sts._onlyDomains) && (!isDomain))
			return;
		
		if ((rank == "lim") || (rank == "ER"))
			return;
	
		/*	if (this._dbBusy)
		{
			//вызываем себя c таймаутом
			setTimeout(function() { XToolChecker.AddToDatabase2(this, url, button, rank, tooltip, isDomain, colorScheme, lin, lout, spam, hist, tabid, doc); }, 1000);
		}
		else*/
		{
			try
			{
				//this._dbBusy = true;
				//*****/
				XTBrowserTools.UpdateCache(url, button, rank, tooltip, isDomain, colorScheme, lin, lout, spam, hist, tabid, doc);
				//this._dbBusy = false;
			}
			catch(e)
			{
				//this._dbBusy = false;
			}
		}
	},

	AddGPToDatabase2 : function(checker, url, button, result, title, virus)
	{
		checker.AddGPToDatabase(url, button, result, title, virus);
	},
	AddGPToDatabase : function(url, button, result, title, virus)
	{
		/*if (!this._useCache_g)
			return;
		
		if (this._dbBusy)
		{
			//вызываем себя c таймаутом
			setTimeout(function() { XToolChecker.AddGPToDatabase2(this, url, button, result, title, virus); }, 1000);
		}
		else
		{
			this._dbBusy = true;
			try
			{
				if (virus)
					virus = 1;
				else 
					virus = 0;
				var fixedToolTip = title;
				while (fixedToolTip.indexOf("\"") != -1)
					fixedToolTip = fixedToolTip.replace("\"", "&quot;");
				while (url.indexOf("\"") != -1)
					url = url.replace("\"", "&quot;");
				var sqlText = 'INSERT OR REPLACE INTO gp_cache(url, result, title, virus, date) VALUES  (\"' + url + '\",\"' + result + '\",\"' + fixedToolTip + '\",\"' + virus + '\", datetime(\"now\"))';
				XToolChecker.DebugMsg(sqlText);
				XToolChecker.ExecuteSQL(sqlText);
				this._dbBusy = false;
			}
			catch(e)
			{
				this._dbBusy = false;
				XToolChecker.ReportError("Sqlite error: " + XToolChecker._mDBConn.lastErrorString);
				
			}
		}*/
	},
	
	AddYPToDatabase2 : function(checker, url, button, result, title, virus)
	{
		checker.AddYPToDatabase(url, button, result, title, virus);
	},
	AddYPToDatabase : function(url, button, result, title, virus)
	{
		/*if (!this._useCache_y)
			return;
		
		if (this._dbBusy)
		{
			//вызываем себя c таймаутом
			setTimeout(function() { XToolChecker.AddYPToDatabase2(this, url, button, result, title, virus); }, 1000);
		}
		else
		{
			this._dbBusy = true;
			try
			{
				if (virus)
					virus = 1;
				else 
					virus = 0;
				var fixedToolTip = title;
				while (fixedToolTip.indexOf("\"") != -1)
					fixedToolTip = fixedToolTip.replace("\"", "&quot;");
				while (url.indexOf("\"") != -1)
					url = url.replace("\"", "&quot;");
				var sqlText = 'INSERT OR REPLACE INTO yp_cache(url, result, title, virus, date) VALUES  (\"' + url + '\",\"' + result + '\",\"' + fixedToolTip + '\",\"' + virus + '\", datetime(\"now\"))';
				XToolChecker.DebugMsg(sqlText);
				XToolChecker.ExecuteSQL(sqlText);
				this._dbBusy = false;
			}
			catch(e)
			{
				this._dbBusy = false;
				XToolChecker.ReportError("Sqlite error: " + XToolChecker._mDBConn.lastErrorString);
				
			}
		}*/
	},

	FixCacheText : function(text)
	{
		var fixedText = text.replace(/\"\&\&\"/g, " ");
		while (fixedText.indexOf("\"") != -1)
			fixedText = fixedText.replace("\"", "&quot;");
		return fixedText;
	},
	
	AddGLToDatabase2 : function(checker, url, button, text, result, title, virus)
	{
		checker.AddGLToDatabase(url, button, text, result, title, virus);
	},
	AddGLToDatabase : function(url, button, text, result, title, virus)
	{
		/*if (!this._useCache_g)
			return;
		
		if (this._dbBusy)
		{
			//вызываем себя c таймаутом
			setTimeout(function() { XToolChecker.AddGLToDatabase2(this, url, button, text, result, title, virus); }, 1000);
		}
		else
		{
			this._dbBusy = true;
			try
			{
				if (virus)
					virus = 1;
				else 
					virus = 0;
				var fixedToolTip = XToolChecker.FixCacheText(title);
				
				var fixedText = XToolChecker.FixCacheText(text);
				
				while (url.indexOf("\"") != -1)
					url = url.replace("\"", "&quot;");
				var sqlText = 'INSERT OR REPLACE INTO gl_cache(url, text, result, title, virus, date) VALUES  (\"' + url + '\",\"' + fixedText + '\",\"'+ result + '\",\"' + fixedToolTip + '\",\"' + virus + '\", datetime(\"now\"))';
				XToolChecker.DebugMsg(sqlText);
				XToolChecker.ExecuteSQL(sqlText);
				this._dbBusy = false;
			}
			catch(e)
			{
				this._dbBusy = false;
				XToolChecker.ReportError("Sqlite error: " + XToolChecker._mDBConn.lastErrorString);
				
			}
		}*/
	},
	
	AddYLToDatabase2 : function(checker, url, button, text, result, title, virus)
	{
		checker.AddYLToDatabase(url, button, text, result, title, virus);
	},
	AddYLToDatabase : function(url, button, text, result, title, virus)
	{
		/*if (!this._useCache_y)
			return;
		
		if (this._dbBusy)
		{
			//вызываем себя c таймаутом
			setTimeout(function() { XToolChecker.AddYLToDatabase2(this, url, button, text, result, title, virus); }, 1000);
		}
		else
		{
			this._dbBusy = true;
			try
			{
				if (virus)
					virus = 1;
				else 
					virus = 0;
				var fixedToolTip = XToolChecker.FixCacheText(title);
				
				var fixedText = XToolChecker.FixCacheText(text);
				
				while (url.indexOf("\"") != -1)
					url = url.replace("\"", "&quot;");
				var sqlText = 'INSERT OR REPLACE INTO yl_cache(url, text, result, title, virus, date) VALUES  (\"' + url + '\",\"' + fixedText + '\",\"'+ result + '\",\"' + fixedToolTip + '\",\"' + virus + '\", datetime(\"now\"))';
				XToolChecker.DebugMsg(sqlText);
				XToolChecker.ExecuteSQL(sqlText);
				this._dbBusy = false;
			}
			catch(e)
			{
				this._dbBusy = false;
				XToolChecker.ReportError("Sqlite error: " + XToolChecker._mDBConn.lastErrorString);
				
			}
		}*/
	},


	GetDateFromString : function (str)
	{
		try 
		{
			//YYYY-MM-DD HH:MM:SS
			var bound = str.indexOf(' ');

			var date = str.slice(0, bound).split('-');
			var time = str.slice(bound + 1, -1).split(':');
			var res = new Date(date[0], date[1]-1, date[2], time[0], time[1], time[2]);
			return res;
		}
		catch(e)
		{
			return new Date();
		}

	},
	
	GetDateFromString2 : function (str)
	{
		try 
		{
			var date = str.split('.');
			if (date.length < 3)
				return new Date();
			else
			{
				var res = new Date("20"+date[2], date[1]-1, date[0], 12, 0, 0);
				return res;
			}
		}
		catch(e)
		{
			return new Date();
		}

	},
	
	
	GetDateFromStringGC : function (str)
	{
		try 
		{
			var date = str.split(' ');
			if (date.length < 3)
				return new Date();
			else
			{
				var month = -1;
				var mArr = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
				var mon = date[1].toLowerCase().trim();
				
				for (var i = 0; i < mArr.length; i++)
				{
					if (mArr[i] == mon)
					{
						month = i;
						break;
					}
				}
				var res = new Date(date[2], month, date[0], 12, 0, 0);
				return res;
			}
		}
		catch(e)
		{
			return new Date();
		}

	},
	
	GetDateFromString5 : function (str)
	{
		try 
		{
			var date = str.split('.');
			if (date.length < 3)
				return new Date();
			else
			{
				var res = new Date(date[2], date[1]-1, date[0], 12, 0, 0);
				return res;
			}
		}
		catch(e)
		{
			return new Date();
		}

	},
		
	GetDateFromString3 : function (str)
	{
		try 
		{
			var date = str.split('-');
			if (date.length < 3)
				return new Date();
			else
			{
				var res = new Date(date[0], date[1]-1, date[2], 12, 0, 0);
				return res;
			}
		}
		catch(e)
		{
			return new Date();
		}

	},
	
	GetDateFromString4 : function (str)
	{
		try 
		{
			var date = str.split('.');
			if (date.length < 3)
				return new Date();
			else
			{
				var res = new Date(date[2], date[1]-1, date[0], 12, 0, 0);
				return res;
			}
		}
		catch(e)
		{
			return new Date();
		}

	},

	LoadFromCache : function (url, btn, select, tabid, doc)
	{
		var sts = XTSettings;
		var cn = XToolCheckerConst;
		if (!sts._useCache)
			return;
		XTBrowserTools.LoadFromCache(url, btn.name, select, tabid, doc);
	
	},
	
	
	ShowSettings : function (event)
	{
		var sts = XTSettings;
		if (!event)
		{
			browser.tabs.create({url: browser.extension.getURL("content/options.html")});
		}
		else
		{
			window.openDialog("chrome://xtool_checker/content/settings.xul", "SettingsOps", "dialog, chrome, modal, centerscreen", 
			(sts._yapQueryTypes.length != 0), 
			(sts._yalQueryTypes.length != 0), 
			this,
			(sts._gpQueryTypes.length != 0), 
			(sts._glQueryTypes.length != 0), 
			(sts._gcQueryTypes.length != 0) 
			);
			XTSettingsManager.CheckAndReadSettings();
		}
	},

	OpenURL : function (url)
	{
		var myTabRef = getBrowser().addTab();
		getBrowser().selectedTab = myTabRef;
		var tmpBrowser = getBrowser().getBrowserForTab(myTabRef);
		tmpBrowser.loadURI(url);
	},
	
	LoginCheck : function (event)
	{
		console.log("<<<LoginCheck>>>");
		var cn = XToolCheckerConst;
		var sts = XTSettings;
		if (XToolCheckerThreads.IsMultiCheck())
			return;
		if (event != 0)
		{
			XTBrowserTools.SetElementHidden(this._updBtnName, true);
			XTBrowserTools.SetElementHidden(this._loginInfoLabelName, false);
			XTBrowserTools.SetElementHidden(this._loginInfoLabel2Name, true);
			//XTBrowserTools.SetElementHidden(this._loginLabelName, true);
			XTBrowserTools.SetElementHidden(this._registerLabelName, true);
			XTBrowserTools.SetElementValue(this._loginInfoLabelName, "...");
			XTBrowserTools.SetElementValue(this._loginInfoLabel2Name, "");
		}
		//this._loginAttempt = 0;
		var req  = new XMLHttpRequest();  
	
		
		req.open('PUT', cn._xtoolAPI, true); 
		var tmpObj = {};
		tmpObj.type='balance';
		tmpObj.referrer=1;
		tmpObj.login=sts._loginValue;
		
		tmpObj.pass=sts._passwordValue;//Hash;
		console.log("login="+sts._loginValue);
		console.log("pass="+sts._passwordValue);
		var params = JSON.stringify(tmpObj);
		XToolChecker.DebugMsg("params: " + params);

		//Send the proper header information along with the request
		req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		//req.setRequestHeader("Content-length", params.length);

		req.onreadystatechange = XToolChecker.BalanceResponse;
		XToolChecker._loggedIn = false;
		req.send(params);
	},
	
	BalanceResponse : function (event)
	{
		if(this.readyState == 4) 
		{
			console.log("s="+this.status);
			if (this.status == 200)
			{
				try{
				var sts = XTSettings;
				/***var stageLabel = document.getElementById("xtool_checker-StageLabel");
				stageLabel.value = "";	*/
				var results = this.responseText;
				console.log(results);
				XToolChecker.DebugMsg(results);
				var result = {};
				try {
					var text = XToolChecker.PrepareTextForJSON(this.responseText);
					result = JSON.parse(text);
					XToolChecker.ProcessJSONObject(result);
				}
				catch (e)
				{
					XToolChecker.ReportError("Can't parse login info", e);
					XToolChecker.UnsuccessfulLogin();
				}
				if ((result.ErrorCode !== undefined) && (result.ErrorCode != 200))
				{
					XToolChecker.DebugMsg(result.Error);
					XToolChecker.UnsuccessfulLogin();
					return;
				}
				
				if (result.balance !== undefined)
				{
					XToolChecker.UpdateLoginInfo(sts._loginValue, result.balance);
					XToolChecker._loggedIn = true;
				}
				else
					XToolChecker.UpdateLoginInfo(sts._loginValue, "");

				if ((result.plugin_settings !== undefined) && (result.plugin_settings.global !== undefined) &&
					(result.plugin_settings.global.search_urls !== undefined))
				{
					XToolChecker.UpdateActionsInfo(result.plugin_settings.global.search_urls);
				}
				else
				{
					var tmp = [];
					XToolChecker.UpdateActionsInfo(tmp);
				}
				if (result.plugin_settings.global !== undefined)
					XToolChecker.UpdateAddInfo(result.plugin_settings.global);
					
				/*var updBtn = document.getElementById("xtool_checker-must");
				//var loginLabel = document.getElementById("xtool_login_label");
				var registerLabel = document.getElementById("xtool_register_label");
				var loginInfoLabel = document.getElementById("xtool_login_info_label");
				var loginInfoLabel2 = document.getElementById("xtool_login_info_label2");*/
				/*if (!updBtn.hidden)
				{
					loginInfoLabel.hidden  = true;
					//loginLabel.hidden  = true;
					registerLabel.hidden  = true;
					loginInfoLabel2.tooltipText = "";
				}
				else
				{
					// оставляем как есть
				}*/
				/*XTBrowserTools.SetElementHidden(this._updBtnName, true);
				XTBrowserTools.SetElementHidden(this._loginInfoLabelName, true);
				XTBrowserTools.SetElementHidden(this._loginInfoLabel2Name, false);
				//XTBrowserTools.SetElementHidden(this._loginLabelName, false);
				XTBrowserTools.SetElementHidden(this._registerLabelName, true);
				XTBrowserTools.SetElementValue(this._loginInfoLabelName, "...");
				XTBrowserTools.SetElementValue(this._loginInfoLabel2Name, "");*/
				/*	if (sts._template_yp = '') sts._template_yp = sts._yapParams;
					if (sts._template_yl = '') sts._template_yl = sts._yalParams;
					if (sts._template_gp = '') sts._template_gp = sts._gpParams;
					if (sts._template_gl = '') sts._template_gl = sts._glParams;
					if (sts._template_iny = '') sts._template_iny = sts._inyParams;
					if (sts._template_ing = '') sts._template_ing = sts._ingParams;
					if (sts._template_ing1 = '') sts._template_ing1 = sts._ing1Params;*/
				}
				catch(e)
				{
					console.log("error = " +e);
				}
			}
			else
			{
				XToolChecker.UpdateLoginInfo("NO", "", 0, "", 0, "", 0, "", 0);
				XToolChecker.UnsuccessfulLogin();
			}
			XToolChecker.UpdateStabImage();
			this._request = 0;
		}
	},


	UnsuccessfulLogin: function()
	{
		
		this._loginAttempt++;
		if (this._loginAttempt > 1)
		{
			// Увы
			XToolChecker.DebugMsg("attempt = " +this._loginAttempt);
			XToolChecker.UpdateLoginInfo("NO", "");
			//stageLabel.value = "Ошибка: " + JSON.parse('"' + result.Error + '"');
			XToolChecker._loggedIn = false;

		}
		else{

			setTimeout(function() { XToolChecker.LoginCheck(0); }, 5000);
		}

	},
	
	PrepareTextForJSON : function(text)
	{
		
		text = text.replace(/\\\"/g, "####quote####");
		var text = text.replace(/\\/g, "\\\\");
		text = text.replace(/\$/g, "####dollar####");
		text = text.replace(/[\x00-\x1F]/g, '');
		return text;
	},
	
	ProcessJSONObject : function(obj)
	{
		XToolChecker.UpdateObjectText(obj);
	},
	
	UpdateObjectText : function(obj)
	{
		for(var key in obj) 
		{
			if ((obj[key] instanceof Array) || (typeof obj[key] == "object"))
			{
				XToolChecker.UpdateObjectText(obj[key] );
			}
			else
			{
				obj[key] = (obj[key]+"").replace(/\#\#\#\#quote\#\#\#\#/g, "\"");
				obj[key] = (obj[key]+"").replace(/\#\#\#\#dollar\#\#\#\#/g, "\$");
			}
		}	
	},
	
	StopMulticheck : function (event)
	{
		// если разделяем потоки, то какбы не нажалось ))))
		if (this._isSplitting)
			return;
		this._stopWait = true;
		var index = XToolCheckerThreads.GetFirstMulticheckIndex();
		if (!this._pauseMulticheck)
		{
			XToolChecker.stoppingMulticheck();
		}
		while (index != -1)
		{
			XToolChecker.EndMulticheck(true, index);
			index = XToolCheckerThreads.GetFirstMulticheckIndex();
		}
		
		if (this._pauseMulticheck)
		{
			this._pauseMulticheck = false;
			XTBrowserTools.SetElementTooltip(this._pauseButtonName, "Пауза");
			XTBrowserTools.SetElementImage(this._pauseButtonName, "pause.png");
			XToolChecker.updateStage(1, 1, true);
		}

	},

	PauseMulticheck : function (event)
	{
		if (!this._pauseMulticheck)
		{
			this._pauseMulticheck = true;
			if (!this._isSplitting)
			{
				var stageLabelValue  = XTBrowserTools.GetElementValue(this._stageLabelName);
				XTBrowserTools.SetElementValue(this._stageLabelName, stageLabelValue + " Пауза");
				XTBrowserTools.SetElementDisabled(this._pauseButtonName, true);
				XTBrowserTools.SetElementTooltip(this._pauseButtonName, "Продолжить");
				XTBrowserTools.SetElementImage(this._pauseButtonName, "play.png");
			}
		}
		else
		{
			this._pauseMulticheck = false;
			var index = XToolCheckerThreads.GetFirstMulticheckIndex();
			while (index != -1)
			{
				XToolChecker.GotoNextButton(index);
				index = XToolCheckerThreads.GetNextMulticheckIndex(index);
			}
			XTBrowserTools.SetElementDisabled(this._pauseButtonName, false);
			XTBrowserTools.SetElementTooltip(this._pauseButtonName, "Пауза");
			XTBrowserTools.SetElementImage(this._pauseButtonName, "pause.png");
		}
	},
	
	UpdateActionsInfo : function (results)
	{	
		XTSettings._checkActionNames = results;
	},

	
	UpdateAddInfo : function (result)
	{	
		try
		{
			var sts = XTSettings;
			var template = result.template;
			XToolChecker.DebugMsg("updating info");
			if (template.yp !== undefined)
			{
	
				template.yp = JSON.parse(template.yp.replace(/\\\\/g, '\\'));
				sts._yapParams = template.yp.str;
				if (template.yp.search_id !== undefined)
				{
					var yQT = [];
					var yQT2 = [];
					XToolChecker.FillModes(yQT, yQT2, template.yp.search_id);
					/***yapBtn.disabled = false;
					ycBtn.disabled = false;*/
				}
			}
			if (template.yl !== undefined)
			{
				template.yl = JSON.parse(template.yl.replace(/\\\\/g, '\\'));
				sts._yalParams = template.yl.str;
				var yQT = [];
				var yQT2 = [];
				if (template.yl.search_id !== undefined)
				{
					XToolChecker.FillModes(yQT, yQT2, template.yl.search_id);
					/***yalBtn.disabled = false;*/
				}
			}
			if (template.r !== undefined)
			{
				template.r = JSON.parse(template.r.replace(/\\\\/g, '\\'));
				sts._rParams = template.r.str;
				if (template.r.search_id !== undefined)
				{
					sts._rQueryTypes = [];
					sts._rQueryTypes2 = [];
					XToolChecker.FillModes(sts._rQueryTypes, sts._rQueryTypes2, template.r.search_id);
					/***rBtn.disabled = false;*/
					
				}
			}
			if (template.gc !== undefined)
			{
				template.gc = JSON.parse(template.gc.replace(/\\\\/g, '\\'));
				sts._gcParams = template.gc.str;
				sts._gcQueryTypes = [];
				sts._gcQueryTypes2 = [];
				if (template.gc.search_id !== undefined)
				{
					XToolChecker.FillModes(sts._gcQueryTypes, sts._gcQueryTypes2, template.gc.search_id);
					/***gcBtn.disabled = false;*/
				}
			}
			if (template.gp !== undefined)
			{
				template.gp = JSON.parse(template.gp.replace(/\\\\/g, '\\'));
				sts._gpParams = template.gp.str;
				sts._gpQueryTypes = [];
				sts._gpQueryTypes2 = [];
				if (template.gp.search_id !== undefined)
				{
					XToolChecker.FillModes(sts._gpQueryTypes, sts._gpQueryTypes2, template.gp.search_id);
					/***gpBtn.disabled = false;*/
				}
			}
			if (template.gl !== undefined)
			{
				template.gl = JSON.parse(template.gl.replace(/\\\\/g, '\\'));
				sts._glParams = template.gl.str;
				sts._glQueryTypes = [];
				sts._glQueryTypes2 = [];
				if (template.gl.search_id !== undefined)
				{
					XToolChecker.FillModes(sts._glQueryTypes, sts._glQueryTypes2, template.gl.search_id);
					/***glBtn.disabled = false;*/
				}
			}
			if (template.iny !== undefined)
			{
				template.iny = JSON.parse(template.iny.replace(/\\\\/g, '\\'));
				sts._inyParams = template.iny.str;
				/*sts._inyQueryTypes = [];
				sts._inyQueryTypes2 = [];*/
				var inyQT = [];
				var inyQT2 = [];
				if (template.iny.search_id !== undefined)
				{
					XToolChecker.FillModes(inyQT, inyQT2, template.iny.search_id);
					/***inyBtn.disabled = false;*/
				}
			}
			if (template.rlv !== undefined)
			{
				template.rlv = JSON.parse(template.rlv.replace(/\\\\/g, '\\'));
				sts._rlvParams = template.rlv.str;
				sts._rlvQueryTypes = [];
				sts._rlvQueryTypes2 = [];
				if (template.rlv.search_id !== undefined)
				{
					XToolChecker.FillModes(sts._rlvQueryTypes, sts._rlvQueryTypes2, template.rlv.search_id);
					/***rlvBtn.disabled = false;*/
				}
			}
			if (template.ing_general !== undefined)
			{
				template.ing_general = JSON.parse(template.ing_general.replace(/\\\\/g, '\\'));
				sts._ingParams = template.ing_general.str;
				sts._ingQueryTypes = [];
				sts._ingQueryTypes2 = [];
				if (template.ing_general.search_id !== undefined)
				{
					XToolChecker.FillModes(sts._ingQueryTypes, sts._ingQueryTypes2, template.ing_general.search_id);
					/***ingBtn.disabled = false;*/
				}
			}
			if (template.ing_main !== undefined)
			{
				template.ing_main = JSON.parse(template.ing_main.replace(/\\\\/g, '\\'));
				sts._ing1Params = template.ing_main.str;
				sts._ing1QueryTypes = [];
				sts._ing1QueryTypes2 = [];
				if (template.ing_main.search_id !== undefined)
				{
					XToolChecker.FillModes(sts._ing1QueryTypes, sts._ing1QueryTypes2, template.ing_main.search_id);
				}
			}
			if (template.pft !== undefined)
			{
				template.pft = JSON.parse(template.pft.replace(/\\\\/g, '\\'));
				sts._needPft = (template.pft.flag == 1);
				
				sts._pftStr = template.pft.zapros;
				sts._pftUrl = template.pft.url;
				sts._pftCount = template.pft.count;
			}
			if (result.stability !== undefined)//||stab|:90|:50|:80
			{
				try {
				this._minStab = parseInt(result.stability.n1);
				this._maxStab = parseInt(result.stability.n2);
				this._stabValue = parseInt(result.stability.errors);
				}
				catch(e)
				{
					this._stabValue = -1;
				}
				XToolChecker.DebugMsg(this._stabValue + " " +this._minStab + " "+this._maxStab);
			}
			if (result.version_path !== undefined)
			{
				this._newFile = result.version_path.replace(/\\\//g, '\/');
			}
			
			if (result.version !== undefined)// && (this._use_new_versions))
			{
				
				var newVer = result.version;
				
				var digits = newVer.split(".");
				var digits2 = this._version.split(".");
				var newVersion = false;
				XToolChecker.DebugMsg(newVer);
				XToolChecker.DebugMsg(digits);
				XToolChecker.DebugMsg(digits2);
				if ((digits2.length != 0) && (digits.length != 0))
				{
					if ((digits[0].trim() != "") && (digits2[0].trim() != ""))
					for (var i = 0; i < digits.length; i++)
					{
						if (i > digits2.length - 1)
						{
							newVersion = true;
							break;
						}
						try
						{
							if (digits[i].trim)
							var dg1 = parseInt(digits[i]);
							var dg2 = parseInt(digits2[i]);
							if (dg1 > dg2)
							{
								newVersion = true;
								break;
							}	
							else if (dg1 < dg2)
							{
								newVersion = false;
								break;
							}
					
						}
						catch(e)
						{
							newVersion = false;
							XToolChecker.DebugMsg("UpdateAddInfo: ", e);
							break;
						}
					}
				}
				XToolChecker.DebugMsg(newVersion);
				if (newVersion)
				{
					XTBrowserTools.SetElementHidden(this._updBtnName, false);
					XTBrowserTools.SetElementTooltip(this._updBtnName, newVer);
				}
				
				
			}
			
		}
		catch(e)
		{
			XToolChecker.ReportError("UpdateAddInfo: ", e);
		}
	},
	
	UpdateStabImage : function()
	{
		XToolChecker.DebugMsg(this._stabValue);
		if ((this._stabValue != -1) &&
			(this._minStab != -1) &&
			(this._maxStab != -1))
		{
			if (this._stabValue < this._minStab)
			{
				XTBrowserTools.SetElementHidden(this._stabImgName, false);
				XToolChecker.DebugMsg("green");
				XTBrowserTools.SetElementImage(this._stabImgName, "cgreen.png");
			}
			else if (this._stabValue >= this._maxStab)
			{
				XTBrowserTools.SetElementHidden(this._stabImgName, false);
				XToolChecker.DebugMsg("red");
				XTBrowserTools.SetElementImage(this._stabImgName, "cred.png");
			}
			else
			{
				XTBrowserTools.SetElementHidden(this._stabImgName, false);
				XToolChecker.DebugMsg("grey");
				XTBrowserTools.SetElementImage(this._stabImgName, "cgrey.png");
			}
		}
		else
		{
			XTBrowserTools.SetElementHidden(this._stabImgName, true);
			XTBrowserTools.SetElementImage(this._stabImgName, "empty.png");
		}
	},
	
	HasCapcha : function (text)
	{
		var start = "\<input";
		var a = " type=\"hidden\"";
		var b = " name=\"captcha\"";
		var c = " value=\"1\"";
		if ((text.indexOf(start + a + b + c) != -1) ||
			(text.indexOf(start + a + c + b) != -1) ||
			(text.indexOf(start + c + a + b) != -1) ||
			(text.indexOf(start + c + b + a) != -1) ||
			(text.indexOf(start + b + a + c) != -1) ||
			(text.indexOf(start + b + c + a) != -1))
			return true;
		return false;
	},
	
	HasCapchaYnd : function (text)
	{
		/*var part = "<form action=\"http://yandex.ru/checkcaptcha\"";
		if (text.indexOf(part) != -1)*/
		var res = text.match(/<form[\s]+[^>]*action=\"[^\"\'>]*\/checkcaptcha/ig);
		//var res = text.match(/<form[\s]+[^>]*action=\"[^\"\'>]*\/checkcaptcha\"/ig);
		if ((res) && (res.length > 0))
		{
			console.log(res[0]);
			return true;
		}
		return false;
	},
	
	
	FillModes : function (arr, arr2, str)
	{
		if (str.indexOf(",") != -1)
		{
			var res = str.split(",");
			for (var i = 0; i < res[0].length; i++)
			{
				arr.push(res[0][i]);
			}
			if (res.length > 1)
				for (var i = 0; i < res[1].length; i++)
				{
					arr2.push(res[1][i]);
				}
		}
		else
		{
			for (var i = 0; i < str.length; i++)
			{
				arr.push(str[i]);
			}
		}
	},
	
	
	CreateCustomPage : function ()
	{
		var list = [];
		XToolChecker._tmpList = [];
		//if (XToolCheckerConst._isChrome)
		{
			XToolChecker._appendTab = -1;
			browser.tabs.create({url: browser.extension.getURL("content/list_editor.html")});
		}
		/*else
		{
			window.openDialog("chrome://xtool_checker/content/list_editor.xul", "listEditor", "dialog, chrome, modal, centerscreen", list); 
			if (list.length > 0)
			{
				var myTabRef = getBrowser().addTab();
				getBrowser().selectedTab = myTabRef;
				var tmpBrowser = getBrowser().getBrowserForTab(myTabRef);
				tmpBrowser.addEventListener("DOMContentLoaded", XTBrowserTools.OnCustomLoad, true); 
				tmpBrowser.loadURI("about:blank");
				this._tmpList = list;
		
			}
		}*/
	},
	
	UpdateLoginInfo : function (login, count)
	{
		console.log("UpdateLoginInfo " +login);

		XTBrowserTools.SetElementHidden(this._updBtnName, true);

		XTBrowserTools.SetElementHidden(this._updBtnName, true);
		if (login == '') 
			return;
		if ((login == 'NO') || (login == 'no'))
		{
			XTBrowserTools.SetElementHidden(this._loginInfoLabelName, true);
			XTBrowserTools.SetElementHidden(this._loginInfoLabel2Name, true);
			//XTBrowserTools.SetElementHidden(this._loginLabelName, false);
			XTBrowserTools.SetElementHidden(this._registerLabelName, false);
			XTBrowserTools.SetElementValue(this._loginInfoLabelName, "");
			XTBrowserTools.SetElementValue(this._loginInfoLabel2Name, "");
		}
		else
		{
			XTBrowserTools.SetElementHidden(this._loginInfoLabelName, false);
			XTBrowserTools.SetElementHidden(this._loginInfoLabel2Name, false);
			//XTBrowserTools.SetElementHidden(this._loginLabelName, true);
			XTBrowserTools.SetElementHidden(this._registerLabelName, true);
			XTBrowserTools.SetElementValue(this._loginInfoLabelName, login);
			if (count != "")
			{
				XTBrowserTools.SetElementValue(this._loginInfoLabel2Name, "Осталось: " + count);
			}
		}
	
		/*XTBrowserTools.SetElementDisabled(this._yapBtnName, true);
		XTBrowserTools.SetElementDisabled(this._yalBtnName, true);*/

	},


	ToggleToolbar : function()
	{
//*//
		var toolbar = document.getElementById("xtool_checker-Toolbar");
		toolbar.collapsed = !toolbar.collapsed;
		document.persist("xtool_checker-Toolbar", "collapsed");
	},
	
	
	
	fireEvent : function (element, left, top)
	{

		var evt = element.ownerDocument.createEvent('MouseEvents');
		
		evt.initMouseEvent("mousedown",
			true, 
			true,
			element.ownerDocument.defaultView, 
			1, 
			0, 
			0, 
			left, 
			top, 
			false, 
			false, 
			false, 
			false, 
			0,
			null); 
		element.dispatchEvent(evt);
    },

	fireEventDownUp : function (element, left, top)
	{

		var evt = element.ownerDocument.createEvent('MouseEvents');
		
		evt.initMouseEvent("mousedown",
			true, 
			true,
			element.ownerDocument.defaultView, 
			1, 
			0, 
			0, 
			left, 
			top, 
			false, 
			false, 
			false, 
			false, 
			0,
			null); 
		evt.initMouseEvent("mouseup",
			true, 
			true,
			element.ownerDocument.defaultView, 
			1, 
			0, 
			0, 
			left, 
			top, 
			false, 
			false, 
			false, 
			false, 
			0,
			null); 
		element.dispatchEvent(evt);
    },

	getOffset : function ( el, parent ) 
	{
		var _x = 0;
		var _y = 0;
		while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) 
		{
			_x += el.offsetLeft - el.scrollLeft;
			_y += el.offsetTop - el.scrollTop;
			if (el == parent)
				break;
			el = el.offsetParent;
			
		}
		return { top: _y, left: _x };
	},

	LoadFromCacheGP : function (url, btn, select)
	{
		return;		
	},
	
	
	UpdateLoginInfo2 : function (login, count)
	{
		XTBrowserTools.SetElementHidden(this._updBtnName, true);
	
		if (login == '') 
			return;
		if ((login == 'NO') || (login == 'no'))
		{
			XTBrowserTools.SetElementHidden(this._loginInfoLabelName, true);
			XTBrowserTools.SetElementHidden(this._loginInfoLabel2Name, true);
			//XTBrowserTools.SetElementHidden(this._loginLabelName, false);
			XTBrowserTools.SetElementHidden(this._registerLabelName, false);
			XTBrowserTools.SetElementValue(this._loginInfoLabelName, "");
			XTBrowserTools.SetElementValue(this._loginInfoLabel2Name, "");
		}
		else
		{
			XTBrowserTools.SetElementHidden(this._loginInfoLabelName, false);
			XTBrowserTools.SetElementHidden(this._loginInfoLabel2Name, false);
			//XTBrowserTools.SetElementHidden(this._loginLabelName, true);
			XTBrowserTools.SetElementHidden(this._registerLabelName, true);
			XTBrowserTools.SetElementValue(this._loginInfoLabelName, login);
			if (count != "")
			{
				XTBrowserTools.SetElementValue(this._loginInfoLabel2Name, "Осталось: " + count);
			}
		}
	}
}



