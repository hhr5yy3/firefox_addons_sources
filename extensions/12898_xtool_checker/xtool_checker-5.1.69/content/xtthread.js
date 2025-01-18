
function XToolCheckerThread()
{
	this._lastRequestedUrl = "";
	this._clickedButton = 0;
	this._current = 0;
	this._total = 0;
	this._attempt = 0;
	this._buttonInfos = [];
	this._xmlHttpObj = 0;
	this._startTime = 0;
	this._multiCheck = false;
	this._multiCheckName = "";
	this._colorScheme = 0;
	this._queryStage = 0;		
	this._action = "";
	this._tabID = 0;
	this._doc = 0;
	this._url = "";
	this._currentQueryType = 0;
	this._currentQueryIndex = -1;
};


XToolCheckerThreads = 
{
	_threads : [],
	_maxThreadCount : 100,
	_loadingStr : 'Проверка...',
	_waitStr : "Ожидание...",
	_threadsStr : 'Потоков: ',
	_errorColor : [],
	_redColor : [],
	_yellowColor : [],
	_xtColor : [],
	_customXTColor : [],
	_greenColor : [],
	_cacheColor : [],
	_defaultColor : [],
	_blackColor : [],
	_whiteColor : [],
	_blueColor : [],
	_blueCacheColor : [],
	_skippedColor : [],
	_blockColor : [],
	_orangeColor : [],

	
	SetColors : function()
	{
		this._errorColor = [];
		this._redColor = [];
		this._xtColor = [];
		this._greenColor = [];
		this._cacheColor = [];
		this._defaultColor  = [];
		this._blackColor = [];
		this._whiteColor = [];
		this._blueColor = [];
		this._blueCacheColor = [];
		this._skippedColor = [];
		this._customXTColor = [];
		this._blockColor = [];
		this._yellowColor = [];
		this._orangeColor = [];
		// цвета
		// схема 0
		this._errorColor.push("#9E0D0A");
		this._redColor.push("#FB534B");
		this._xtColor.push("#88FF88");
		this._greenColor.push("#88FF88");
		this._cacheColor.push("#669966");
		this._defaultColor.push("#CCCCCC");
		this._blackColor.push("#000000");
		this._whiteColor.push("#FFFFFF");
		this._blueColor.push("#54B4FD");
		this._blueCacheColor.push("#8097C6");
		this._skippedColor.push("#555555");
		this._customXTColor.push("#FF88FF");
		this._blockColor.push("#FFA500");
		this._yellowColor.push("#FFFF00");
		this._orangeColor.push("#FFA500");
		// схема 1
		this._errorColor.push("#9E0D0A");
		this._redColor.push("#FB534B");
		this._xtColor.push("#FFFF55");
		this._greenColor.push("#88FF88");
		this._cacheColor.push("#CCCC00");
		this._defaultColor.push("#CCCCCC");
		this._blackColor.push("#000000");
		this._whiteColor.push("#FFFFFF");
		this._blueColor.push("#54B4FD");
		this._blueCacheColor.push("#8097C6");
		this._skippedColor.push("#555555");
		this._customXTColor.push("#FF88FF");
		this._blockColor.push("#FFA500");
		this._yellowColor.push("#FFFF00");
		this._orangeColor.push("#FFA500");
		// схема 2 ??
		this._errorColor.push("#9E0D0A");
		this._redColor.push("#FB534B");
		this._xtColor.push("#7092BE");
		this._greenColor.push("#88FF88");
		this._cacheColor.push("#7092BE");
		this._defaultColor.push("#CCCCCC");
		this._blackColor.push("#000000");
		this._whiteColor.push("#FFFFFF");
		this._blueColor.push("#7092BE");
		this._blueCacheColor.push("#7092BE");
		this._skippedColor.push("#555555");
		this._customXTColor.push("#FF88FF");
		this._blockColor.push("#FFA500");
		this._yellowColor.push("#FFFF00");
		this._orangeColor.push("#FFA500");
		// схема 3
		this._errorColor.push("#9E0D0A");
		this._redColor.push("#FB534B");
		this._xtColor.push("#FFA500");
		this._greenColor.push("#88FF88");
		this._cacheColor.push("#D88500");
		this._defaultColor.push("#CCCCCC");
		this._blackColor.push("#000000");
		this._whiteColor.push("#FFFFFF");
		this._blueColor.push("#54B4FD");
		this._blueCacheColor.push("#8097C6");
		this._skippedColor.push("#555555");
		this._customXTColor.push("#FF88FF");
		this._blockColor.push("#FFA500");
		this._yellowColor.push("#FFFF00");
		this._orangeColor.push("#FFA500");
	},
	
	GetThreadIndex : function(request, startTime)
	{
		for (var i = 0; i < this._threads.length; i++)
		{
			if (startTime == 0)
			{
				if (this._threads[i]._xmlHttpObj == request)
				{
					return i;
				}
			}
			else
			{
				if ((this._threads[i]._xmlHttpObj == request) && (this._threads[i]._startTime == startTime))
				{
					return i;
				}
			}
		}
		return -1;
	},
	
	GetThreadIndexByButtonID : function(btnID)
	{
		if (btn == 0)
			return -1;
		for (var i = 0; i < this._threads.length; i++)
		{
			if (this._threads[i]._clickedButton.name == btnID)
			{
				return i;
			}
		}
		return -1;
	},
	
	GetThreadIndexByButtonInfo : function(btnInfo)
	{
		if (btn == 0)
			return -1;
		for (var i = 0; i < this._threads.length; i++)
		{
			if (this._threads[i]._clickedButton.name == btnInfo.name)
			{
				return i;
			}
		}
		return -1;
	},
	
	IsRunning : function (name)
	{
		for (var i = 0; i < this._threads.length; i++)
		{
			if ((this._threads[i]._clickedButton != 0) || (this._threads[i]._buttonInfos.length != 0))
			{
				if (this._threads[i]._multiCheckName == name)
					return true;
			}
		}
		return false;
	},
	
	IsRunningOnDoc : function (name, doc, tabID, url)
	{
		for (var i = 0; i < this._threads.length; i++)
		{
			if (this._threads[i]._buttonInfos.length != 0)
			{
				if (this._threads[i]._multiCheckName == name)
				{
					if (doc !== undefined)
					{
						if (this._threads[i]._url == url)
							return true;
					}
					else
					{
						if (this._threads[i]._tabID == tabID)
							return true;
					}
				}
			}
		}
		return false;
	},
	
	IsRunningOnDocPrefix : function (prefix, doc, tabID, url)
	{
		for (var i = 0; i < this._threads.length; i++)
		{
			if (this._threads[i]._buttonInfos.length != 0)
			{
				if (this._threads[i]._multiCheckName.indexOf(prefix) == 0)
				{
					if (doc !== undefined)
					{
						if (this._threads[i]._url == url)
							return true;
					}
					else
					{
						if (this._threads[i]._tabID == tabID)
							return true;
					}
				}
			}
		}
		return false;
	},
	
	SplitThread  : function (name, doc, tabID, newThreadIndex, url)
	{
		var threadIndexes = [];
		for (var i = 0; i < this._threads.length; i++)
		{
			if (this._threads[i]._buttonInfos.length != 0)
			{
				if (this._threads[i]._multiCheckName == name)
				{
					var isRight = false;
					if (doc !== undefined)
					{
						if (this._threads[i]._url == url)
							isRight = true;
					}
					else
					{
						if (this._threads[i]._tabID == tabID)
							isRight = true;
					}
					if (isRight)
					{
						if (newThreadIndex != i)
						{
							threadIndexes.push(i);
						}
					}
				}
			}
		}
		
		var freeButtons = [];
		for (var i = 0; i < threadIndexes.length; i++)
		{
			var index = threadIndexes[i];
			var startButton = this._threads[index]._current + 1;
			while (this._threads[index]._buttonInfos.length > startButton)
			{
				freeButtons.push(this._threads[index]._buttonInfos.pop());							
			}
		}
		var buttonsPerThread = freeButtons.length / (threadIndexes.length + 1);
		for (var i = 0; i < threadIndexes.length; i++)
		{
			var index = threadIndexes[i];
			for (var j = 0; j < buttonsPerThread; j++)
			{
				this._threads[index]._buttonInfos.push(freeButtons.shift());
			}
			this._threads[index]._total = this._threads[index]._buttonInfos.length;
			
		}
		
		XToolCheckerThreads.InitMulticheckThread(newThreadIndex, freeButtons, name, doc, tabID, url);
		this._threads[newThreadIndex]._current = 0;
	},
	
	GetNewThreadIndex : function ()
	{
		for (var i = 0; i < this._threads.length; i++)
		{
			if ((this._threads[i]._clickedButton == 0) && (this._threads[i]._buttonInfos.length == 0))
			{
				return i;
			}
		}
		if (this._threads.length >= this._maxThreadCount)
			return -1;
		else
		{
			this._threads.push(new XToolCheckerThread());
			return this._threads.length - 1;
		}
		 
	},
	
	InitMulticheckThread : function(threadIndex, buttonInfos, buttonPrefix, doc, tabID, url)
	{
		this._threads[threadIndex]._multiCheck = true;
		this._threads[threadIndex]._buttonInfos = buttonInfos;
		this._threads[threadIndex]._lastRequestedUrl = "";
		this._threads[threadIndex]._clickedButton = 0;
		this._threads[threadIndex]._tabID = tabID;
		this._threads[threadIndex]._doc = doc;
		this._threads[threadIndex]._current = 0;
		this._threads[threadIndex]._total = buttonInfos.length;
		this._threads[threadIndex]._xmlHttpObj = 0;
		this._threads[threadIndex]._startTime = 0;
		this._threads[threadIndex]._attempt = 0;
		this._threads[threadIndex]._multiCheckName = buttonPrefix;
		this._threads[threadIndex]._colorScheme = 0;
		this._threads[threadIndex]._queryStage = 0;		
		this._threads[threadIndex]._action = "";
		this._threads[threadIndex]._url = url;
		this._threads[threadIndex]._currentQueryType = 0;
		this._threads[threadIndex]._currentQueryIndex = -1;
		
	},
	
	ClearMulticheckThread : function(threadIndex)
	{
		this._threads[threadIndex]._multiCheck = false;
		this._threads[threadIndex]._buttonInfos = [];
		this._threads[threadIndex]._lastRequestedUrl = "";
		this._threads[threadIndex]._clickedButton = 0;
		this._threads[threadIndex]._tabID = 0;
		this._threads[threadIndex]._doc = 0;
		this._threads[threadIndex]._current = 0;
		this._threads[threadIndex]._total = [];
		this._threads[threadIndex]._xmlHttpObj = 0;
		this._threads[threadIndex]._startTime = 0;
		this._threads[threadIndex]._attempt = 0;
		this._threads[threadIndex]._multiCheckName = "";
		this._threads[threadIndex]._colorScheme = 0;
		this._threads[threadIndex]._queryStage = 0;	
		this._threads[threadIndex]._action = "";	
		this._threads[threadIndex]._url = "";
		this._threads[threadIndex]._currentQueryType = 0;
		this._threads[threadIndex]._currentQueryIndex = -1;
	},	
	
	GetStageLabel : function(isWaiting)
	{
		var total = 0;
		var current = 0;
		var threadsCount = 0;
		for (var i = 0; i < this._threads.length; i++)
		{
			if (this._threads[i]._clickedButton != 0)
			{
				if (!this._threads[i]._multiCheck)
				{
					total++;
					threadsCount++;
				}
				else
				{
					total += this._threads[i]._total;
					current += this._threads[i]._current;
					threadsCount++;
				}
				// TODO: типы проверок.
			}
		}
		
		if (current <= total) 
		{
			if (total == 0)
			{
				if ((XTChecker.Capcha._recognizing) && (XTChecker.Capcha._stage != ""))
				{
					var str = XTChecker.Capcha._stage;
					return str;
				}
				return ""; 
			}
			else
			{
				var str = this._loadingStr;
				if (isWaiting)
					str = this._waitStr;
				if ((XTChecker.Capcha._recognizing) && (XTChecker.Capcha._stage != ""))
				{
					str = XTChecker.Capcha._stage;
				}
				if (threadsCount > 1)
					return str + " (" + current + "/" + total + ") " + this._threadsStr + threadsCount;
				else
					return str + " (" + current + "/" + total + ")" ;
			}
			
		}
		
		return "";
		
	},
	
	GetThread : function(threadIndex)
	{
		return this._threads[threadIndex];
	},
	
	GetColorByName : function(colorName, threadIndex)
	{
		return XToolCheckerThreads.GetColorByScheme(colorName, this._threads[threadIndex]._colorScheme);
	},
	
	GetColorByName2 : function(colorName)
	{
		return XToolCheckerThreads.GetColorByScheme(colorName, 0);
	},
	
	GetColorByNameScheme2 : function(colorName)
	{
		return XToolCheckerThreads.GetColorByScheme(colorName, 1);
	},
	
	GetColorByScheme : function (colorName, schemeIndex)
	{
		if (colorName == "error")
			return this._errorColor[schemeIndex];
		if (colorName == "red")
			return this._redColor[schemeIndex];
		if (colorName == "xt")
			return this._xtColor[schemeIndex];
		if (colorName == "green")
			return this._greenColor[schemeIndex];
		if (colorName == "cache")
			return this._cacheColor[schemeIndex];
		if (colorName == "default")
			return this._defaultColor[schemeIndex];
		if (colorName == "black")
			return this._blackColor[schemeIndex];
		if (colorName == "white")
			return this._whiteColor[schemeIndex];
		if (colorName == "blue")
			return this._blueColor[schemeIndex];
		if (colorName == "blueCache")
			return this._blueCacheColor[schemeIndex];
		if (colorName == "skipped")
			return this._skippedColor[schemeIndex];
		if (colorName == "customXT")
			return this._customXT[schemeIndex];
		if (colorName == "block")
			return this._blockColor[schemeIndex];
		if (colorName == "yellow")
			return this._yellowColor[schemeIndex];
		if (colorName == "orange")
			return this._orangeColor[schemeIndex];
	},
	
	SetCurrentButton : function(threadIndex, name, alt, title, colorName, placeholder, skipUrl)
	{
		console.log(threadIndex + ", " + name + ", " + alt + ", " + title + ", " + colorName);
		var changedButtonInfo = {};
		changedButtonInfo.name = this._threads[threadIndex]._clickedButton.name;
		if (name != "")
			changedButtonInfo.value = name;
		if (alt != "")
			changedButtonInfo.alt = alt;
		if (title != "")
			changedButtonInfo.title = title;
		if ((colorName != "") && (colorName.indexOf("#") == 0))
		{
			changedButtonInfo.style = {};
			changedButtonInfo.style.backgroundColor = colorName;
		}
		else if (colorName != "")
		{
			try 
			{
				changedButtonInfo.style = {};
				changedButtonInfo.style.backgroundColor = XToolCheckerThreads.GetColorByName(colorName, threadIndex);
			}
			catch(e)
			{
				XToolChecker.MsgToConsole("SetCurrentButton: " + e);
				return;
			}
		}
		if (placeholder != "")
			changedButtonInfo.placeholder = placeholder;
		if (!skipUrl)
			changedButtonInfo.lastRequestedUrl = this._threads[threadIndex]._lastRequestedUrl;
		XTBrowserTools.SetButtonInfo(this._threads[threadIndex]._doc, this._threads[threadIndex]._tabID, changedButtonInfo);
		
	},
	
	SetNextElementText : function(threadIndex, title, colorName, blockType)
	{
		console.log(threadIndex + ", " + title + ", " + colorName);
		var changedButtonInfo = {};
		changedButtonInfo.name = this._threads[threadIndex]._clickedButton.name;
		changedButtonInfo.blockType = blockType;
		if (title != "")
			changedButtonInfo.title = title;
		if ((colorName != "") && (colorName.indexOf("#") == 0))
		{
			changedButtonInfo.style = {};
			changedButtonInfo.style.backgroundColor = colorName;
		}
		else if (colorName != "")
		{
			try 
			{
				changedButtonInfo.style = {};
				changedButtonInfo.style.backgroundColor = XToolCheckerThreads.GetColorByName(colorName, threadIndex);
			}
			catch(e)
			{
				XToolChecker.MsgToConsole("SetNextElementText: " + e);
				return;
			}
		}
		XTBrowserTools.SetTextInfo(this._threads[threadIndex]._doc, this._threads[threadIndex]._tabID, changedButtonInfo);
		
	},
	
	UpdateCurrentButton : function(threadIndex)
	{
		this._threads[threadIndex]._clickedButton = XToolCheckerThreads.GetCurrentButtonInfo(threadIndex);
	},
	
	GetCurrentButtonInfo : function(threadIndex)
	{
		return this._threads[threadIndex]._buttonInfos[this._threads[threadIndex]._current];
	},
	
	ClearCurrentButton : function(threadIndex)
	{
		this._threads[threadIndex]._clickedButton = 0;
		this._threads[threadIndex]._lastRequestedUrl = "";
		this._threads[threadIndex]._xmlHttpObj = 0;
		this._threads[threadIndex]._queryStage = 0;
		this._threads[threadIndex]._action = "";	
		this._threads[threadIndex]._currentQueryType = 0;
		this._threads[threadIndex]._currentQueryIndex = -1;
	},
	
	HasMultichecks : function()
	{
		for (var i = 0; i < this._threads.length; i++)
		{
			if ((this._threads[i]._clickedButtonID != "") || (this._threads[i]._buttonInfos.length != 0))
				if (this._threads[i]._multiCheck == true)
				{
					return true;
				}
		}
		return false;
	},
		
	GetFirstMulticheckIndex : function ()
	{
		for (var i = 0; i < this._threads.length; i++)
		{
			if ((this._threads[i]._clickedButtonID != "") || (this._threads[i]._buttonInfos.length != 0))
				if (this._threads[i]._multiCheck == true)
				{
					return i;
				}
		}
		return -1;
	},	
	
	GetNextMulticheckIndex : function (prevIndex)
	{
		for (var i = prevIndex + 1; i < this._threads.length; i++)
		{
			if ((this._threads[i]._clickedButtonID != "") || (this._threads[i]._buttonInfos.length != 0))
				if (this._threads[i]._multiCheck == true)
				{
					return i;
				}
		}
		return -1;
	},	
	
	IsAlive : function (threadIndex)
	{
		try
		{
		if ((this._threads[threadIndex]._clickedButtonID != "") || (this._threads[threadIndex]._buttonInfos.length != 0))
			return true;
		else
			return false;
		}
		catch(ex)
		{
			return false;
		}
		
	},
		
	IsMultiCheck : function ()
	{
		for (var i = 0; i < this._threads.length; i++)
		{
			if (this._threads[i]._multiCheck == true)
			{
				return true;
			}
		}
		return false;
		
	}
	
	

}