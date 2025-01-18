
XToolCheckerBtnManager = 
{
	_maxThreadCount : 100,
	_hiddenInfos : {},
	_cpt : {},

	sts : {},

	
	
	DebugMsg : function (msg)
	{
		if (this.sts._debug)
			XToolCheckerBtnManager.MsgToConsole(msg);
	},
	
	MsgToConsole : function(message)
	{
		console.log("xtool_checker: " + message);
	},
	
	GetLocation : function(doc)
	{
		if ((doc) && (doc.location))
			return doc.location.href;
		return "about:blank";
	},

	
	IsShowYap : function ()
	{
		if ((this.sts._show_yap) && (this.sts._yapQueryTypes.length != 0) && (this.sts._checkActionNames.length != 0))
			return true;
		else 
			return false;
	},
	
	IsShowYC : function ()
	{
		if ((this.sts._show_yc) && (this.sts._yapQueryTypes.length != 0) && (this.sts._checkActionNames.length != 0))
			return true;
		else 
			return false;
	},
	
	IsShowYal : function ()
	{
		if ((this.sts._show_yal) /*&& (this.sts._yalQueryTypes.length != 0) && (this.sts._checkActionNames.length != 0)*/)
			return true;
		else 
			return false;
	},
	
	
	GetMode : function (doc, mode)
	{
		var cn = XToolCheckerConst;
		if (mode == cn._modes.auto)
		{
			var href = XToolCheckerBtnManager.GetLocation(doc);
			
			if ((href.toLowerCase().indexOf(cn._rotapostPart) != -1) ||
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
			
			else if (href.toLowerCase().indexOf(cn._rookeePart) != -1)
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
			else if ((href.toLowerCase().indexOf(cn._seohammer) != -1) ||
				(href.toLowerCase().indexOf(cn._seohammer1) != -1))
			{
				return cn._modes.seohammer;				
			}
			else if (href.toLowerCase().indexOf(cn._megaindex) != -1)
			{
				return cn._modes.megaindex;				
			}
			else if (href.toLowerCase().indexOf(cn._solomono) != -1)
			{
				return cn._modes.solomono;				
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
				(href.toLowerCase().indexOf(cn._liexPart21) != -1) ||
				(href.toLowerCase().indexOf(cn._liexPart3) != -1))
			{
				return cn._modes.liex;
			}
			else if ((href.toLowerCase().indexOf(cn._seopultPart) != -1) ||
					(href.toLowerCase().indexOf(cn._seopultPrjPart) != -1) ||
					(href.toLowerCase().indexOf(cn._seopultPROPart) != -1) )
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
			return cn._modes.none;
	
		}
		else
		{
			return mode;
		}
	
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
		var tmp = "rgb(" + x.replace(/(..)/g,function($1){return XToolCheckerBtnManager.Hex2Dec($1)+', '});
		return tmp.substring(0, tmp.length - 2)  + ")";
	},
	
	
	SetCheckForRookee : function(btn, toggle)
	{
		try
		{
		var tmpObj = btn;
		while  ((tmpObj) && (tmpObj.nodeType == 1))
		{
		
			if ((tmpObj.nodeName.toLowerCase() == "div") && (tmpObj.className.indexOf("x-grid3-row ") != -1))
			{
				if (tmpObj.className.indexOf("x-grid3-row-selected") == -1)
				{
					var divs2 = tmpObj.getElementsByTagName("DIV");
					for(var j = 0; j < divs2.length; j++)
					{
						if (divs2[j].className == 'x-grid3-row-checker')
						{
							XToolCheckerBtnManager.fireEvent( divs2[j], 0, 0);

							return true;							
						}
					}
				}
			}
	
			
			tmpObj = tmpObj.parentNode;
			
		}
		}
		catch(e)
		{
			console.log("SetCheckForButton: ", e);
		}
	},
	
	SetCheckForButtonOuter : function (doc, mode, id, needCheck, toggle)
	{
		console.log("mode = "+mode + " id=" + id + " nc=" + needCheck);
		var cn = XToolCheckerConst;
		var btn = doc.getElementById(id);
		if (btn === undefined)
			return;
		var tmpObj = btn;
		if (tmpObj.className.indexOf("XTCheckedButton") == -1)
			tmpObj.className = tmpObj.className + " XTCheckedButton";
		if (!needCheck)
			return;
		XToolCheckerBtnManager.SetCheckForButton(btn, false);
	},
	
	SetCheckForButton : function (btn, toggle)
	{
	try{
		var cn = XToolCheckerConst;
		var doc = document;
		var pageToCheck =true;
		console.log("SetCheckForButton ");
		//*// 
		//XToolCheckerBtnManager.IsPageToCheck(btn.ownerDocument);
		// помечаем всегда
		var tmpObj = btn;
		if (tmpObj.className.indexOf("XTCheckedButton") == -1)
			tmpObj.className = tmpObj.className + " XTCheckedButton";
		
		// отмечаем только когда надо !
		if (!pageToCheck)
			return;
		if (btn.ownerDocument.location.href.indexOf(cn._rookeePart) != -1)
		{
			return XToolCheckerBtnManager.SetCheckForRookee(btn, toggle);
		}		
			
			
		if ((btn.name.indexOf(cn._buttonYalPrefix) == 0) && (this._expireYal))
		{
				if ((btn.ownerDocument.location.href.indexOf(cn._linksPart) != -1))
				{
					var tmpObj = btn;
					if (tmpObj.className.indexOf("XTCheckedButton") == -1)
						tmpObj.className = tmpObj.className + " XTCheckedButton";
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
			//*//
/*			if (!XToolCheckerBtnManager.CheckDaysLeft(btn))
					return false;*/
		}
	/*	var rowTag = "TR";
		if (btn.ownerDocument.location.href.indexOf(cn._mainlinkSeoPart) != -1)
		{
			rowTag = "mat-row";
		}*/
		var mode = XToolCheckerBtnManager.GetMode(doc, mode);
		console.log("mode= " + mode);
		while  ((tmpObj) && (tmpObj.nodeType == 1))
		{
			if ((tmpObj.nodeName == "TR") || (tmpObj.nodeName.toLowerCase() == "mat-row"))
			{
				console.log("Found TR");
				var inputs = tmpObj.getElementsByTagName("INPUT");
				console.log("inputs: "+inputs.length);
				for (var i = 0; i < inputs.length; i++)
				{
					if (inputs[i].type == "checkbox")
					{
						if (!toggle)
							inputs[i].checked = true;
						else
							inputs[i].checked = !inputs[i].checked;
						if ((mode != cn._modes.liex) || (i == inputs.length - 1))
							return true;
					}
				}
			}
			
			tmpObj = tmpObj.parentNode;
			
		}
		
		
			
	
		
		if ((btn.name.indexOf(cn._buttonPOSPrefix) == 0) && (this._posNotCheckErr))
			
		{
		
			if ((btn.ownerDocument.location.href.indexOf(cn._linksPart) != -1))
			{
				var tmpObj = btn;
				if (tmpObj.className.indexOf("XTCheckedButton") == -1)
					tmpObj.className = tmpObj.className + " XTCheckedButton";
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
		console.log("SetCheckForButton: ", e);
	}
		
		
	},
	
	CheckDaysLeft : function(btn, url)
	{
		var cn = XToolCheckerConst;
		var tmpObj = btn;
		var mode = XToolCheckerBtnManager.GetMode(url, cn._modes.auto);
		while (tmpObj.nodeType == 1)
		{
			if (tmpObj.nodeName == "TR")
			{
				var tds = tmpObj.getElementsByTagName("TD");
				
				if (mode == this._modes.seopult)
				{
					if (tds.length > 2)
					{
						var text = tds[2].textContent;
						if ((text.length == 10) && (text.indexOf("-") == 4))
						{
							var date = XToolCheckerBtnManager.GetDateFromString3(text);
							var curDate = new Date();
							var mSecLeft = curDate.valueOf() - date.valueOf();
							if (mSecLeft < 60000)
								return true;
							var daysLeft = mSecLeft / 86400000; //миллисекунд в дне 1000*60*60*24 
							if (daysLeft < this._yalExpireDays)
							{
								return false;
							}
						}
					}
					break;
				}
				else if (mode == this._modes.linkfeed)
				{
					if (tds.length > 2)
					{
						var text;
						if (url.toLowerCase().indexOf(this._linkfeedLinksOptPlaced) != -1)
						{
							text = tds[1].textContent;
						}
						else
						{
							text = tds[2].textContent;
						}
						
						if ((text.length == 10) && (text.indexOf(".") == 2))
						{
							var date = XToolCheckerBtnManager.GetDateFromString4(text);
							var curDate = new Date();
							var mSecLeft = curDate.valueOf() - date.valueOf();
							if (mSecLeft < 60000)
								return true;
							var daysLeft = mSecLeft / 86400000; //миллисекунд в дне 1000*60*60*24 
							if (daysLeft < this._yalExpireDays)
							{
								return false;
							}
						}
					}
					break;
				}
				else if (tds.length > 1)
				{
					if (tds[1].className == "ra")
					{
						var text = tds[1].textContent;
						if ((text.length == 8) && (text.indexOf(".") == 2))
						{
							var date = XToolCheckerBtnManager.GetDateFromString2(text);
							var curDate = new Date();
							var mSecLeft = curDate.valueOf() - date.valueOf();
							if (mSecLeft < 60000)
								return true;
							var daysLeft = mSecLeft / 86400000; //миллисекунд в дне 1000*60*60*24 
							if (daysLeft < this._yalExpireDays)
							{
								return false;
							}
						}
					}
				}
				
			}
			
			tmpObj = tmpObj.parentNode;
			
		}
		return true;
	},

	GetSpanStyleText : function (prefix, width)
	{
		return "."+ prefix + ' {border: 1px dotted #999; font-family: Verdana; color: #0e5875; font-size: 8pt !important; padding: 3px !important; margin: auto !important;  }\n';
	},
	
	GetStyleText : function (prefix, width, rel)
	{
		var fs = '9';
		if (rel) fs = '7'; 
		var relText = '';
		var res = "."+ prefix +
		'{ font-family: Verdana; margin: 2px; border-radius: 3px; padding: 1px 3px; border: 1px solid #ddd; color: #505050; font-size: 9pt !important; max-width: auto; max-height: auto; '+ relText +'; line-height: normal; }'
		// min-width: 25px;

		return res;
	},
	
	AddStyles : function (doc)
	{
		var cn = XToolCheckerConst;
		var styles = document.getElementById('xToolStyles');
		if (!styles)
		{
			var style = document.createElement('style');
			style.id = 'xToolStyles'
			style.type = 'text/css';
			var str = "";
			str += XToolCheckerBtnManager.GetStyleText(cn._buttonPrefix, 40);
			str += XToolCheckerBtnManager.GetStyleText(cn._buttonXTDPrefix, 40);
			str += XToolCheckerBtnManager.GetStyleText(cn._buttonYapPrefix, 40);
			str += XToolCheckerBtnManager.GetStyleText(cn._buttonYalPrefix, 22);
			str += XToolCheckerBtnManager.GetStyleText(cn._buttonYCPrefix, 22);
			str += XToolCheckerBtnManager.GetStyleText(cn._buttonBCPrefix, 36, true);
			str += XToolCheckerBtnManager.GetStyleText(cn._buttonLVLPrefix, 28);
			str += XToolCheckerBtnManager.GetStyleText(cn._buttonPOSPrefix, 30);
			str += XToolCheckerBtnManager.GetStyleText(cn._buttonTrfPrefix, 36, true);
			str += XToolCheckerBtnManager.GetStyleText(cn._buttonGPPrefix, 22);
			str += XToolCheckerBtnManager.GetStyleText(cn._buttonGCPrefix, 22);
			str += XToolCheckerBtnManager.GetStyleText(cn._buttonGLPrefix, 22);
			str += XToolCheckerBtnManager.GetStyleText(cn._buttonESPrefix, 22);
			str += XToolCheckerBtnManager.GetStyleText(cn._buttonINYPrefix, 36, true);
			str += XToolCheckerBtnManager.GetStyleText(cn._buttonINGPrefix, 36, true);
			str += XToolCheckerBtnManager.GetStyleText(cn._buttonGBLPrefix, 30);
			str += XToolCheckerBtnManager.GetStyleText(cn._buttonBLPrefix, 22);
			str += XToolCheckerBtnManager.GetStyleText(cn._buttonPRPrefix, 36);
		//	str += XToolCheckerBtnManager.GetStyleText(cn._buttonTICPrefix, 22);
			str += XToolCheckerBtnManager.GetStyleText(cn._buttonRPrefix, 22);
			str += XToolCheckerBtnManager.GetStyleText(cn._buttonRLVPrefix, 22);

			//str += XToolCheckerBtnManager.GetStyleText(cn._buttonLVLPrefix, 22);
			//str += XToolCheckerBtnManager.GetStyleText(cn._buttonPOSPrefix, 22);
			//str += XToolCheckerBtnManager.GetStyleText(cn._buttonTrfPrefix, 22);
			//str += XToolCheckerBtnManager.GetStyleText(cn._buttonGPPrefix, 22);
			//str += XToolCheckerBtnManager.GetStyleText(cn._buttonGCPrefix, 22);
			//str += XToolCheckerBtnManager.GetStyleText(cn._buttonGLPrefix, 22);
			/*str += XToolCheckerBtnManager.GetStyleText(cn._buttonINYPrefix, 22);
			str += XToolCheckerBtnManager.GetStyleText(cn._buttonINGPrefix, 22);*/	
			str += XToolCheckerBtnManager.GetStyleText(cn._buttonSQIPrefix, 22);	
			str += XToolCheckerBtnManager.GetSpanStyleText(cn._infoBCPrefix, 22);
			str += XToolCheckerBtnManager.GetSpanStyleText(cn._spaceSpan, 22);
			str += XToolCheckerBtnManager.GetSpanStyleText(cn._infoBlockPrefix, 22);
			

			style.innerHTML = str;
			
			document.getElementsByTagName('head')[0].appendChild(style);
		}
	},
	
	AddButtons : function (doc, mode)
	{
		var cn = XToolCheckerConst;
		var hrefL = XToolCheckerBtnManager.GetLocation(doc);
		var mode = XToolCheckerBtnManager.GetMode(doc, mode);
		console.log("mode= " + mode);
		try {
		var generated = false;
		if (doc.body)
		{
			if (doc.body.id == cn._generated)
			{
				generated = true;
				mode = cn._modes.all;
			}
		}
		console.log("mode= " + mode);
		if (mode == cn._modes.none) 
			return;
		XToolCheckerBtnManager.AddStyles(doc);
		if (mode == cn._modes.rookee) // rookee.ru
		{
			if (hrefL.toLowerCase().indexOf(cn._rookeePart) != -1)
			{
				XToolCheckerBtnManager.AddButtonsToRookee(doc);
			}
		}
		else if (mode == cn._modes.gogetlinks) // gogetlinks.net
		{
			if ((hrefL.toLowerCase().indexOf(cn._gogetlinksPost) != -1) ||
				(hrefL.toLowerCase().indexOf(cn._gogetlinksSearch) != -1))
			{
				XToolCheckerBtnManager.AddButtonsToGogetlinks(doc);
			}
		}
		else if (mode == cn._modes.webeffector)
		{
			if (hrefL.toLowerCase().indexOf(cn._webEffector) != -1)
			{
				if (!XToolCheckerBtnManager.AddButtonsToWebEffector(doc))
					return false;
			}
		}
		else if (mode == cn._modes.seohammer)
		{
			if ((hrefL.toLowerCase().indexOf(cn._seohammer) != -1) ||
				(hrefL.toLowerCase().indexOf(cn._seohammer1) != -1))
			{
				if (!XToolCheckerBtnManager.AddButtonsToSeohammer(doc))
					return false;
			}
		}
		else if (mode == cn._modes.megaindex) 
		{
			if (hrefL.toLowerCase().indexOf(cn._megaindex) != -1)
			{
				if (!XToolCheckerBtnManager.AddButtonsToMegaindex(doc))
					return false;
			}
		}
		else if (mode == cn._modes.solomono) 
		{
			if (hrefL.toLowerCase().indexOf(cn._solomono) != -1)
			{
				if (!XToolCheckerBtnManager.AddButtonsToSolomono(doc))
					return false;
			}
		}
		else if (mode == cn._modes.mainlink) // mainlink.ru
		{
			if ((hrefL.toLowerCase().indexOf(cn._mainlinkPart) != -1) ||
				(hrefL.toLowerCase().indexOf(cn._mainlinkSeoPart) != -1) ||
				(hrefL.toLowerCase().indexOf(cn._mainlinkSecondPart) != -1))
			{
				XToolCheckerBtnManager.AddButtonsToMainlink(doc);
			}
		}
		else if (mode == cn._modes.linkfeed) // linkfeed.ru
		{
			if ((hrefL.toLowerCase().indexOf(cn._linkfeedList) != -1) ||
				(hrefL.toLowerCase().indexOf(cn._linkfeedLinksOpt) != -1) ||
				(hrefL.toLowerCase().indexOf(cn._linkfeedLinksOptWait) != -1) ||				
				(hrefL.toLowerCase().indexOf(cn._linkfeedLinksOptPlaced) != -1) ||
				(hrefL.toLowerCase().indexOf(cn._linkfeedFilters) != -1) ||
				(hrefL.toLowerCase().indexOf(cn._linkfeedLinksOptListAllWait) != -1) ||
				(hrefL.toLowerCase().indexOf(cn._linkfeedLinksOptListWait) != -1) )
			{
				XToolCheckerBtnManager.AddButtonsToLinkfeed(doc);
			}
		} 
		else if (mode == cn._modes.blogun) // blogun.ru
		{
			if ((hrefL.toLowerCase().indexOf(cn._blogunPartList) != -1) ||
				(hrefL.toLowerCase().indexOf(cn._blogunPartRequests) != -1) ||
				(hrefL.toLowerCase().indexOf(cn._blogunCampainReport) != -1))
			{
				XToolCheckerBtnManager.AddButtonsToBlogun(doc);
			}
		}
		else if (mode == cn._modes.xap) // xap.ru
		{
			if ((hrefL.toLowerCase().indexOf(cn._xapPart) != -1) || 
				(hrefL.toLowerCase().indexOf(cn._tnxPart) != -1))
			{	
				XToolCheckerBtnManager.AddButtonsToXap(doc);
			}
		}
		else if (mode == cn._modes.liex) // liex.ru
		{
			var part = 0;
			if (hrefL.toLowerCase().indexOf(cn._liexPart) != -1)
				part = 1;
			if ((hrefL.toLowerCase().indexOf(cn._liexPart2) != -1) ||
			   (hrefL.toLowerCase().indexOf(cn._liexPart21) != -1))
				part = 2;
			if (hrefL.toLowerCase().indexOf(cn._liexPart3) != -1)
				part = 3;
			if (part > 0)
			{	
				XToolCheckerBtnManager.AddButtonsToLiex(doc, part);
			}
		}
		else if (mode == cn._modes.seopult) // SeoPult.ru
		{
			if ((hrefL.toLowerCase().indexOf(cn._seopultPart) != -1) ||
				(hrefL.toLowerCase().indexOf(cn._seopultPrjPart) != -1)||
				(hrefL.toLowerCase().indexOf(cn._seopultPROPart) != -1) )
			{	
				XToolCheckerBtnManager.AddButtonsToSeopult(doc);
			}
		}
		else if (mode == cn._modes.rotapost) 
		{
			if ((hrefL.toLowerCase().indexOf(cn._rotapostPart) != -1) ||
				(hrefL.toLowerCase().indexOf(cn._rotapostPartBuy) != -1))
			{
				XToolCheckerBtnManager.AddButtonsToRotapost(doc);
			}
		}
		else if (mode == cn._modes.setlinks)
		{
			XToolCheckerBtnManager.AddButtonsToSetlinks(doc);				
		}
		else if (mode == cn._modes.all) 
		{
			XToolCheckerBtnManager.AddButtonsToAny(doc, false, generated);
		}
		else if (mode == cn._modes.sape) 
		{
			XToolCheckerBtnManager.AddButtonsToSape(doc);
		}
		else if (mode == cn._modes.miralinks)
		{
			XToolCheckerBtnManager.AddButtonsToMiralinks(doc);				
		}
		else if (mode == cn._modes.getgoodlinks)
		{
			XToolCheckerBtnManager.AddButtonsToGetgoodlinks(doc);	
		}
		else if (mode == cn._modes.seowizard)
		{
			XToolCheckerBtnManager.AddButtonsToSeowizard(doc);	
		}
		else if (mode == cn._modes.forumok)
		{
			XToolCheckerBtnManager.AddButtonsToForumok(doc);	
		}


		XToolCheckerBtnManager.MarkLinks(0);
		}
		catch(e)
		{
			console.log("AddButtons  = " + e);
		}
	},
	
	
	
	RemoveButtons : function(doc)
	{
		var cn = XToolCheckerConst;
		this._hiddenInfos = {};
		if (doc)
		{
			var buttons = doc.getElementsByTagName("INPUT");
			var spans = doc.getElementsByTagName("SPAN");
			var divs = doc.getElementsByTagName("DIV");
			var imgs = doc.getElementsByTagName("IMG");
			var brs = doc.getElementsByTagName("BR");
			var nodesToRemove = [];
			for(var i = 0; i < spans.length; i++)
			{
				if ((spans[i].id.indexOf(cn._spaceSpan) != -1) || (spans[i].id.indexOf(cn._infoBCPrefix) != -1))
				{
					nodesToRemove.push(spans[i]);
				}
			}
			for(var i = 0; i < divs.length; i++)
			{
				if (divs[i].id.indexOf(cn._infoBlockPrefix) != -1)
				{
					nodesToRemove.push(divs[i]);
				}
			}

			for(var i = 0; i < imgs.length; i++)
			{
				if (imgs[i].id.indexOf(cn._infoBCPrefix) != -1)
				{
					nodesToRemove.push(imgs[i]);
				}
			}
			for(var i = 0; i < brs.length; i++)
			{
				if (brs[i].id.indexOf(cn._spaceSpan) != -1)
				{
					nodesToRemove.push(brs[i]);
				}
			}
			for(var i = 0; i < buttons.length; i++)
			{
				if ((buttons[i].type == 'button') && (buttons[i].name.indexOf(cn._allButtonPrefix) != -1))
				{
					
					nodesToRemove.push(buttons[i]);
				}
				else
					if ((buttons[i].type == 'hidden') && (buttons[i].name.indexOf(cn._hiddenLink) != -1))
					{
						nodesToRemove.push(buttons[i]);
					}
					else
						if ((buttons[i].type == 'hidden') && (buttons[i].name.indexOf(cn._markerPrefix) != -1))
						{
							nodesToRemove.push(buttons[i]);
						}
			}
			for (var i = 0; i < nodesToRemove.length; i++)
			{
				nodesToRemove[i].parentNode.removeChild(nodesToRemove[i]);
			}
			XToolCheckerBtnManager.ProcessYap(doc, false);
			XToolCheckerBtnManager.ProcessYal(doc, false);
			
			var searchButton = doc.getElementById("do_search");
			if ((searchButton) && (searchButton.name == "new_search"))
			{
				searchButton.removeEventListener("click", XToolCheckerBtnManager.OnOrdersSearch, false);
			}
			
			var ps = doc.getElementsByTagName("p");
			for(var i = 0; i < ps.length; i++)
			{
				if ((ps[i].className == "pagination_arrow") || (ps[i].className == "pagination_arrow_right"))
				{
					var links = ps[i].getElementsByTagName("A");
					for(var j = 0; j < links.length; j++)
					{
						links[j].removeEventListener("click", XToolCheckerBtnManager.OnOrdersSearch, false);
					}
				}
			}
		
			var divs = doc.getElementsByTagName("div");
			for(var i = 0; i < divs.length; i++)
			{
				if (divs[i].className == "pagination_container_links")
				{
					var links = divs[i].getElementsByTagName("A");
					for(var j = 0; j < links.length; j++)
					{
						links[j].removeEventListener("click", XToolCheckerBtnManager.OnOrdersSearch, false);
					}
				}
			}
		}
	},
	
	
	ProcessYap :  function(doc, hide)
	{
		var links = doc.getElementsByTagName("A");
		
		for(var i = 0; i < links.length; i++)
		{
			var obj = links[i];
			if  ((obj.className.indexOf("icon_yap") == 0) && (obj.textContent == "YAP"))
			{
				if (hide)
				{
					obj.style.display = "none";
				}
				else
				{
					obj.style.display = "";
				}
			}
			
		}
	
	},
	
	ProcessYal :  function(doc, hide)
	{
		var links = doc.getElementsByTagName("A");
		
		for(var i = 0; i < links.length; i++)
		{
			var obj = links[i];
			if  ((obj.className.indexOf("icon_yal") == 0)  && (obj.textContent == "YAL"))
			{
				if (hide)
				{
					obj.style.display = "none";
				}
				else
				{
					obj.style.display = "";
				}
			}
			
		}
	
	},

	CutPrefix : function(href, prefix)
	{
		if (href.toLowerCase().indexOf(prefix) == 0)
		{
			href = href.substring(prefix.length);
			try{
				href = decodeURIComponent(href);
			}
			catch(e)
			{
				XToolCheckerBtnManager.MsgToConsole("CutPrefix: " + e);
			}
		}
		return href;
	},

	PrepareRawLink : function(href)
	{
		console.log("href1=="+href);
		var result = href;
		var prefix = "http://123sdfsdfsdfsd.ru/r.html?r=";
		var prefix2 = "https://123sdfsdfsdfsd.ru/r.html?r=";
		var prefix3 = "https://linkexplorer.ru/r.html?r=";
		var prefix4 = "https://gogetlinks.net/redirect.php?url=";
		var res = result.match(/http[s]{0,1}\:\/\/tyrtyrtyr\.ru\/[a-z]+\.aspx\?key\=[0-9a-z]+&[a-z]\=/i);
		if ((res) && (res.length > 0))
		{
			result = result.replace(/http[s]{0,1}\:\/\/tyrtyrtyr\.ru\/[a-z]+\.aspx\?key\=[0-9a-z]+&[a-z]\=/ig, "");
			result = decodeURIComponent(result);
		}
		result = XToolCheckerBtnManager.CutPrefix(result, prefix);
		result = XToolCheckerBtnManager.CutPrefix(result, prefix2);
		result = XToolCheckerBtnManager.CutPrefix(result, prefix3);
		result = XToolCheckerBtnManager.CutPrefix(result, prefix4);
		console.log("href2=="+result);
		return result;
	},
	

	// Быстрая функция отсеивания скрытых кнопок, для тормозного хрома
	// ускорение на больших страницах - несколько десятков раз
	SkipHiddenButtons : function(list)
	{
		var result = [];
		try
		{
			// список проверенных скрытых элементов
			var hiddenElements = [];
			// список проверенных видимых элементов
			var visibleElements = [];
			for (var i = 0; i < list.length; i++)
			{	
				var obj = list[i];
				//временный список
				var elementsChain = [];
			
				var parent = obj.parentNode;
				var tmpObj = obj;
				var objTagName = tmpObj.tagName.toLowerCase();
				var needAdd = true;
				while ((objTagName != "body") && (objTagName != "html"))//(tmpObj.nodeType == 1)
				{
					// ищем в видимых
					if (visibleElements.indexOf(tmpObj) != -1)
						break;
					//ищем в скрытых
					if (hiddenElements.indexOf(tmpObj) != -1)
					{
						needAdd = false;
						break;
					}
					if (tmpObj.style.display == "none")
					{
						needAdd = false;
						break;
					}
					tmpObj = parent;
					elementsChain.push(tmpObj);
					parent = tmpObj.parentNode;
					objTagName = tmpObj.tagName.toLowerCase();
					
				}
				if (needAdd)
				{	
					// кнопка видимая - значит вся цепочка элементов видимая - добавляем
					visibleElements = visibleElements.concat(elementsChain);
					result.push(obj);
				}
				else
				{
					// кнопка скрыта - значит вся цепочка элементов скрыта - добавляем
					hiddenElements = hiddenElements.concat(elementsChain);
				}
			}
			
		}
		catch(e)
		{
			XToolCheckerBtnManager.ReportError("isVisible: ", e);
		}
		return result;
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
			XToolCheckerBtnManager.ReportError("isVisible: ", e);
		}
			
	},

	
	ReportError : function(text, ex)
	{
		var message = text;
		try 
		{
			if (ex)
			{
				message += ex;
				message += "\n\n";
				message += ex.stack;
			}
		}
		catch(e) {}
		console.log(message);
	},
	
	SetButton : function (doc, info)
	{
		if (info.name === undefined)
			return;
		console.log("name =" + info.name);
		var button = doc.getElementById(info.name.trim());
		if ((button === undefined) || (!button))
			return;
		console.log("val =" + info.value);
		if (info.value !== undefined)
			button.value = info.value;
		console.log("alt ="  + info.alt);
		if (info.alt !== undefined)
			button.alt = info.alt;
		if (info.placeholder !== undefined)
			button.placeholder = info.placeholder;
		console.log("title ="  + info.title);
		if (info.title !== undefined)
			button.title = info.title;
		if (info.style !== undefined)
			if (info.style.backgroundColor !== undefined)
				button.style.backgroundColor = info.style.backgroundColor;
		if (info.lastRequestedUrl)
		{
			XToolCheckerBtnManager.SetHidden(button.id, info.lastRequestedUrl, info.lastRequestedUrl, XToolCheckerBtnManager.GetButtonName(XToolCheckerConst._hiddenLink, 0, ""), "");
		}
	},

	GetOrCreateBlock : function (doc, button, blockType)
	{
		var cn = XToolCheckerConst;
		let parent = button.parentNode.parentNode;
		if (parent) {
			var divs = parent.getElementsByTagName('DIV');
			for(var i = 0; i < divs.length; i++)
			{
				if (divs[i].id.indexOf(cn._infoBlockPrefix) != -1)
				{
					console.log("info div found");
					let infoBlockContainer = divs[i];
					let infoBlocks = infoBlockContainer.getElementsByTagName("SPAN");
					let infoBlock = null;
					for (let j = 0; j < infoBlocks.length; j++) {
						if (infoBlocks[j].id.indexOf(blockType) != -1){
							infoBlock = infoBlocks[j];
							console.log("block found");
							break;
						}
					}
					if (!infoBlock)
					{
						console.log("creating "+blockType);
						let id_index = infoBlockContainer.id;
						id_index = id_index.replace(cn._infoBlockPrefix, '');
						infoBlock = doc.createElement("SPAN");
						infoBlock.id = blockType + id_index;
						infoBlock.className = cn._infoBlockPrefix;
						infoBlock.textContent = " ";
						infoBlockContainer.appendChild(infoBlock);	

					}
					return infoBlock;
				}
			}
		}
	},

	SetInfo : function (doc, info)
	{
		var cn = XToolCheckerConst;
		if (info.name === undefined)
			return;
		console.log("name =" + info.name);
		var button = doc.getElementById(info.name.trim());
		if ((button === undefined) || (!button))
			return;
		if (info.blockType) {
			var block = XToolCheckerBtnManager.GetOrCreateBlock(doc, button, info.blockType);
			block.style.visibility = 'visible';
			if (info.title  !== undefined)
			{
				console.log("title ="  + info.title);
				block.textContent = info.title;
			}
		} 
		else 
		{
			var textAr = button.nextSibling;
			if (textAr)
			{
				if (textAr.id.indexOf(cn._infoBCPrefix) != -1)
				{					
					if (info.title  !== undefined)
					{
						console.log("title ="  + info.title);
						textAr.textContent = info.title;
					}
				}
			}
		}

	},

	SetImageSrc : function (doc, info)
	{
		var cn = XToolCheckerConst;
		if (info.name === undefined)
			return;
		console.log("name =" + info.name);
		var button = doc.getElementById(info.name.trim());
		if ((button === undefined) || (!button))
			return;
		
		var img = button.nextSibling;
		if (img)
		{
			if (img.id.indexOf(cn._infoBCPrefix) != -1)
			{					
			/*	var loc = XToolChecker.GetLocation(btn.ownerDocument);
				if (loc == null)
				{*/

					img.src = info.src;
				/*}
				else 
				{
					if ((loc.indexOf("sape") != -1) || (loc.indexOf("seowizard") != -1))
					{
						img.src = "data:image/gif;base64," + btoa(XTChecker.Capcha.ReadImageData(imgUrl));
					}
					else
					{
						img.src = imgUrl;
					}
				}*/
				if (info.url == 'about:blank')
				{
					img.style.display = "none";
				}
				else
				{
					img.style.display = "";
				} 
				console.log("set");
			}
		
		}

	},
	
	
	CopyButtonInfoExp : function (button)
	{
		var buttonInfo = {};
		buttonInfo.name = button.name;
		buttonInfo.alt = button.alt;
		buttonInfo.value = button.value;
		buttonInfo.title = button.title;
		buttonInfo.className = button.className;
		buttonInfo.style = {};
		buttonInfo.style.backgroundColor = button.style.backgroundColor;
		
		var ps = button.previousSibling;
		//var previousSibling = XToolCheckerBtnManager.GetHidden(button.name);

		previousSibling.value = ps.value;
		previousSibling.alt = ps.alt;
		previousSibling.name = ps.name;
		previousSibling.title = ps.title;
		buttonInfo.previousSibling = previousSibling;
		return buttonInfo;
	},
	
	CopyButtonInfo : function (button)
	{
		var buttonInfo = {};
		buttonInfo.name = button.name;
		buttonInfo.alt = button.alt;
		buttonInfo.value = button.value;
		buttonInfo.title = button.title;
		buttonInfo.className = button.className;
		buttonInfo.style = {};
		buttonInfo.style.backgroundColor = button.style.backgroundColor;
		buttonInfo.placeholder = button.placeholder;
	//	var ps = button.previousSibling;
		var previousSibling = XToolCheckerBtnManager.GetHidden(button.name);
		/*{};
		previousSibling.value = ps.value;
		previousSibling.alt = ps.alt;
		previousSibling.name = ps.name;
		previousSibling.title = ps.title;*/
		buttonInfo.previousSibling = previousSibling;
		return buttonInfo;
	},
	
	GetButtons : function (doc, btnPrefix)
	{
		var resultIds = [];
		var resultButtons = [];
		if (doc)
		{
			this._currentQueryIndex = -1;
			var buttons = doc.getElementsByTagName("INPUT");
			//var btnName = XToolCheckerBtnManager.GetButtonNameByPrefix(btnPrefix);
			//if (!XToolCheckerThreads.IsRunningOnDoc(btnName, doc))
			{
				/*var threadIndex = XToolCheckerThreads.GetNewThreadIndex();
				if (threadIndex != -1)*/
				{
					
					for(var i = 0; i < buttons.length; i++)
					{
						if ((buttons[i].type == 'button') && (buttons[i].name.indexOf(btnPrefix) != -1))
						{
							if (XToolCheckerBtnManager.isVisible(buttons[i]))
							{
								console.log(buttons[i].name);
								console.log(buttons[i].previousSibling);
								resultIds.push(XToolCheckerBtnManager.CopyButtonInfo(doc.getElementById(buttons[i].id)));
								//resultButtons.push(buttons[i]);
							}
							
						}
					}
					
				}
			}
		}
	//	resultButtons = XToolCheckerBtnManager.SkipHiddenButtons(resultButtons);
		//if (XToolCheckerBtnManager.isVisible(buttons[i]))
	/*	for (var i = 0; i < resultButtons.length; i++)
		{
			resultIds.push(XToolCheckerBtnManager.CopyButtonInfoExp(resultButtons[i]));
		}*/
		return resultIds;
	},
	
	AddButtonsToAny : function (doc, appendMode, generated)
	{
		try{
		var cn = XToolCheckerConst;
		var hrefL = XToolCheckerBtnManager.GetLocation(doc);
		var domain = XToolCheckerBtnManager.GetDomainName(hrefL);
		var links = doc.getElementsByTagName("A");
		
		console.log(links.length);
		for(var i = 0; i < links.length; i++)
		{
			var link = links[i];
			if (appendMode)
			{
				var nextNode = link.nextSibling;
				
				if ((nextNode) && 
					((nextNode.name.indexOf(cn._allButtonPrefix) != -1) ||
					(nextNode.name.indexOf(cn._markerPrefix) != -1)))
					continue;
			}
			// отсекаем Javascript ссылки
			if  ((link.href.indexOf("http://") != -1)  || (link.href.indexOf("https://") != -1) )
			{
				if (link.href.indexOf(domain) == -1)
				{

					var url = XToolCheckerBtnManager.PrepareLink(link.href);
					var url2 = link.href;
					var urlTitle = link.textContent;
					var domainUrl2 = XToolCheckerBtnManager.GetDomainFromUrl(link.href);
					var domainUrl = XToolCheckerBtnManager.PrepareLink(domainUrl2);
					if ( (url2.trim() == urlTitle.trim()) || (urlTitle.indexOf(url2) != -1) || 
					(url2.trim() == (urlTitle.trim()+"\/")))
						urlTitle = "";
					var generatedLink = link.nextSibling;
					try{
						XToolCheckerBtnManager.InsertEverything(generated, true, doc, link, i, url, domainUrl, url2, urlTitle, urlTitle == "");
					}
					catch(e)
					{
						console.log(link);
						console.log(link.href);
						console.log("Error1 AddButtonsToAny: " + e);
					}
				}
			}
		}
		}
		catch(e)
		{
			console.log("Error AddButtonsToAny: " + e);
		}
	},
	
	AddButtonsToLinkfeed : function (doc)
	{
		var cn = XToolCheckerConst;
		var hrefL = XToolCheckerBtnManager.GetLocation(doc);
		var domain = XToolCheckerBtnManager.GetDomainName(hrefL);
		if ((hrefL.toLowerCase().indexOf(cn._linkfeedLinksOpt) != -1) ||
			(hrefL.toLowerCase().indexOf(cn._linkfeedLinksOptWait) != -1) ||
			(hrefL.toLowerCase().indexOf(cn._linkfeedLinksOptPlaced) != -1))
		{
			var placed = false;
			if (hrefL.toLowerCase().indexOf(cn._linkfeedLinksOptPlaced) != -1)
				placed = true;			
			var trs = doc.getElementsByTagName("tr");
			for(var i = 0; i < trs.length; i++)
			{
				if ((trs[i].className == "even") || (trs[i].className == "odd"))
				{
					
					var tds = trs[i].getElementsByTagName("TD");
					if ((tds != 0) && (tds.length > 6))
					{
						var links;
						if (placed)
								links = tds[4].getElementsByTagName("A");
							else
								links = tds[5].getElementsByTagName("A");
						var titleSpans;
						if (!placed)
							titleSpans= tds[3].getElementsByTagName("SPAN");
						else
							titleSpans= tds[2].getElementsByTagName("SPAN");
						
							
						if (links.length > 0) 
						{
							var link = links[0];
														
							var href = link.href;
							
							if ((href.indexOf(domain) == -1) && (href != ""))
							{
								var url2 = href;
								var url = XToolCheckerBtnManager.PrepareLink(href);
								var domainUrl2 = XToolCheckerBtnManager.GetDomainFromUrl(href);
								var domainUrl = XToolCheckerBtnManager.PrepareLink(domainUrl2);
								var urlTitle = "";
								if ((titleSpans != 0) && (titleSpans.length > 0))
								{
									urlTitle = titleSpans[0].title;
								}
								XToolCheckerBtnManager.InsertEverything(false, true, doc, link, i, url, domainUrl, url2, urlTitle);
							}
				
						}
					}
				}
			}
		}
		else
		{
			var trs = doc.getElementsByTagName("tr");
			for(var i = 0; i < trs.length; i++)
			{
				if ((trs[i].className == "even") || (trs[i].className == "odd"))
				{
					
					var links = trs[i].getElementsByTagName("A");
					if (links.length > 0) 
					{
						var link = links[0];
						if (hrefL.toLowerCase().indexOf(this._linkfeedLinksOptListAllWait) != -1)
						{	
							if (links.length > 1)
								link = links[1];
							else
								continue;
						}
						var href = link.href;
						
						if ((href.indexOf(domain) == -1) && (href != ""))
						{
							var skipXTD = (hrefL.toLowerCase().indexOf(this._linkfeedFilters) != -1);
							var url2 = href;
							var url = XToolCheckerBtnManager.PrepareLink(href);
							var domainUrl2 = XToolCheckerBtnManager.GetDomainFromUrl(href);
							var domainUrl = XToolCheckerBtnManager.PrepareLink(domainUrl2);
							var urlTitle = "";//XToolCheckerBtnManager.GetLinkTitle3(link);
							XToolCheckerBtnManager.InsertEverything(false, true, doc, link, i, url, domainUrl, url2, urlTitle, false, false, skipXTD);
						}
			
					}
					
				}
			}
			if (hrefL.toLowerCase().indexOf(this._linkfeedFilters) != -1)
			{
				var ps = doc.getElementsByTagName("p");
				for(var i = 0; i < ps.length; i++)
				{
					var p = ps[i];
					if (p.className == "title")
					{
						var links = p.getElementsByTagName("a");
						if (links.length > 0) 
						{
							var link = links[0];
							var href = p.textContent.trim();
							var arr = href.split(" ");
							var isRoot = (arr.length > 1);
							href  = arr[0];
							href = href.replace(/(^\s+)|(\s+$)/g, "");;
							href = "http://" + href;
							if ((href.indexOf(domain) == -1) && (href != ""))
							{
								var url2 = href;
								var url = XToolCheckerBtnManager.PrepareLink(href);
								var domainUrl2 = XToolCheckerBtnManager.GetDomainFromUrl(href);
								var domainUrl = XToolCheckerBtnManager.PrepareLink(domainUrl2);
								var urlTitle = "";//XToolCheckerBtnManager.GetLinkTitle3(link);
								XToolCheckerBtnManager.InsertEverything(false, true, doc, link, i, url, domainUrl, url2, urlTitle, true, false, !isRoot);
							}
			
						}
					}
				}
			}
		}
	},

	
	InsertButtons : function (generated, firstBlock, url, urlTitle, i, doc, url2, skipL, needBreak, skipDomain, posPrjUrl)
	{
		var cn = XToolCheckerConst;
		var sts = this.sts;

		console.log("url2==" + url2);
		XToolCheckerBtnManager.InsertGBL(firstBlock, url, urlTitle, i, doc, url2);
	
		XToolCheckerBtnManager.InsertRLV(firstBlock, url, urlTitle, i, doc, url2); 
		XToolCheckerBtnManager.InsertR(firstBlock, url, urlTitle, i, doc, url2); 

		if (!skipL)
			XToolCheckerBtnManager.InsertGL(firstBlock, url, urlTitle, i, doc, url2);
		XToolCheckerBtnManager.InsertGC(firstBlock, url, "", i, doc, url2);
		XToolCheckerBtnManager.InsertGP(firstBlock, url, urlTitle, i, doc, url2);
		
////		
		XToolCheckerBtnManager.InsertYC(firstBlock, url, "", i, doc, url2);
		if (!skipL)
			XToolCheckerBtnManager.InsertYal(firstBlock, url, urlTitle, i, doc, url2);
		XToolCheckerBtnManager.InsertYap(firstBlock, url, urlTitle, i, doc, url2);

		if (!skipDomain)
			XToolCheckerBtnManager.InsertING(firstBlock, url, urlTitle, i, doc, url2);
		if (!skipDomain)
			XToolCheckerBtnManager.InsertINY(firstBlock, url, urlTitle, i, doc, url2);
		if (needBreak)
		{
			var spaceBR_ = doc.createElement("BR");
			spaceBR_.id = cn._spaceSpan + i + "_00";
			firstBlock.parentNode.insertBefore(spaceBR_,firstBlock.nextSibling);
		}

		if ((!skipDomain) && (sts._show_lvl)  && (url.indexOf("/") != -1))
		{
			var domain2 = XToolCheckerBtnManager.GetDomainFromUrl(url2);
			XToolCheckerBtnManager.InsertButtonAfterElement(cn._buttonLVLPrefix, "LVL", url2, "", i, doc, firstBlock, domain2);
		}
		
		if (sts._show_pos) 
		{
			console.log("Adding pos");
			if ((posPrjUrl !== undefined) && (posPrjUrl != ""))
			{
				console.log("Prj url: "+posPrjUrl );
				XToolCheckerBtnManager.InsertButtonAfterElement(cn._buttonPOSPrefix, "POS", url2, urlTitle, i, doc, firstBlock, posPrjUrl);
			}
			else if ((sts._use_custom_url_pos) && (sts._pos_url_ext != ""))
			{
				console.log("Prj custom ");
				XToolCheckerBtnManager.InsertButtonAfterElement(cn._buttonPOSPrefix, "POS", url2, urlTitle, i, doc, firstBlock, sts._pos_url_ext);
			}
		}

		XToolCheckerBtnManager.InsertSQI(firstBlock, url, urlTitle, i, doc, url2);

		if (sts._show_bc) 
			XToolCheckerBtnManager.InsertButtonAfterElement(cn._buttonBCPrefix, "BC", url, urlTitle, i, doc, firstBlock, url2);

		XToolCheckerBtnManager.InsertTrf(url, urlTitle, i, doc, firstBlock, url2);	
	},
	
	AddFr 	 : function (doc, oldObj, fragment) 
	{
		//var div = doc.createElement("DIV");
		//oldObj.parentNode.appendChild(div);
		oldObj.parentNode.insertBefore(fragment,oldObj);
		//oldObj.parentNode.innerHTML =  fragment.innerHTML;
	},
	
	ProccessSapeTitle : function (text)
	{
		text = text.replace(/<b>/g, "");
		text = text.replace(/<i>/g, "");
		text = text.replace(/<u>/g, "");
		text = text.replace(/<\/b>/g, "");
		text = text.replace(/<\/i>/g, "");
		text = text.replace(/<\/u>/g, "");
		text = text.replace(/<[a-z][^<>]*>[^<>]*<\/[a-z][^<>]*>/g, "");

		return text;
	},
	
	AddButtonsToSape : function (doc)
	{
		var cn = XToolCheckerConst;
		var sts = this.sts;
		var hrefL = XToolCheckerBtnManager.GetLocation(doc);
		if (hrefL.indexOf("sape.ru") != -1)
		{
			if ((sts._hide_sape_yap) && (sts._yapQueryTypes.length != 0))
				XToolCheckerBtnManager.ProcessYap(doc, true);
			if ((sts._hide_sape_yal) && (sts._yalQueryTypes.length != 0))
				XToolCheckerBtnManager.ProcessYal(doc, true);
		}
		if ((hrefL.indexOf(cn._pr2SearchPart) != -1))
		{
			var inputs = doc.getElementsByTagName("input");
			for(var i = 0; i < inputs.length; i++)
			{
				var inp = inputs[i];
				if ((inp.type == "checkbox") && (inp.className == "site-checkbox"))
				{
					var obj = inp.parentNode;
					obj = obj.nextSibling;
					while (obj.nodeType!=1)
					   obj = obj.nextSibling;
					var links = obj.getElementsByTagName("A");
					if ((links) && (links.length > 0))
					{ 
						obj = links[0];
						var rawUrl =  XToolCheckerBtnManager.PrepareRawLink(obj.href);
						var url = XToolCheckerBtnManager.PrepareLink(rawUrl);
						var url2 = rawUrl;
						var title = XToolCheckerBtnManager.GetLinkTitle(obj, hrefL);
						var domain2 = XToolCheckerBtnManager.GetDomainFromUrl(rawUrl);
						var domain = XToolCheckerBtnManager.PrepareLink(domain2);
						
						XToolCheckerBtnManager.InsertButtons(false, obj, url, title, i, doc, url2, true);
						

						XToolCheckerBtnManager.AddXTXTD(url, domain, doc, obj, i, url2);
						
						var spaceBR1_ = doc.createElement("BR");
						spaceBR1_.id = cn._spaceSpan + i + "_01";
						obj.parentNode.insertBefore(spaceBR1_,obj.nextSibling);
						var spaceBR_ = doc.createElement("BR");
						spaceBR_.id = cn._spaceSpan + i + "_00";
						obj.parentNode.insertBefore(spaceBR_,obj.nextSibling);
						XToolCheckerBtnManager.InsertLinkMarker(obj, doc);
					}
				
				}
			}
			
		}
		else if ( (hrefL.indexOf(cn._prSearchPart) != -1))
		{
			var aas = doc.getElementsByTagName("A");
			for(var i = 0; i < aas.length; i++)
			{
				var aaa = aas[i];
				if ((aaa.className == "link") && (aaa.target == '_blank'))
				{
						var obj = aaa;
						var rawUrl =  XToolCheckerBtnManager.PrepareRawLink(obj.href);
						var url = XToolCheckerBtnManager.PrepareLink(rawUrl);
						var url2 = rawUrl;
						var title = XToolCheckerBtnManager.GetLinkTitle(obj, hrefL);
						var domain2 = XToolCheckerBtnManager.GetDomainFromUrl(rawUrl);
						var domain = XToolCheckerBtnManager.PrepareLink(domain2);
						obj = obj.parentNode.parentNode;
						XToolCheckerBtnManager.InsertButtons(false, obj, url, title, i, doc, url2, true);

						XToolCheckerBtnManager.AddXTXTD(url, domain, doc, obj, i, url2);
						
						var spaceBR1_ = doc.createElement("BR");
						spaceBR1_.id = cn._spaceSpan + i + "_01";
						obj.parentNode.insertBefore(spaceBR1_,obj.nextSibling);
						var spaceBR_ = doc.createElement("BR");
						spaceBR_.id = cn._spaceSpan + i + "_00";
						obj.parentNode.insertBefore(spaceBR_,obj.nextSibling);
						XToolCheckerBtnManager.InsertLinkMarker(obj, doc);
				}
			}
			
		}
		else if ((hrefL.indexOf(cn._pr2AdvertsPart) != -1))
		{
			var ass = doc.getElementsByTagName("A");
			//var ass = doc.getElementsByTagName("INPUT");
			var lastTR = 0;
			for(var i = 0; i < ass.length; i++)
			{
				var aaa = ass[i];
				if ((aaa.className == "text_gbl"/*"adv_check"*/))
				{
					var parent = aaa.parentNode;
					var tmpObj = aaa;
					while (tmpObj.tagName != "TR")
					{
						tmpObj = parent;
						parent = tmpObj.parentNode;
						if (!parent)
							break;
					}
					if ((!parent) || (lastTR == tmpObj))
						continue;
					lastTR = tmpObj;
					var links = tmpObj.getElementsByTagName("A");
					if ((links) && (links.length > 1))
					{ 
						obj = links[1];
						var rawUrl =  XToolCheckerBtnManager.PrepareRawLink(obj.href);
						var url = XToolCheckerBtnManager.PrepareLink(rawUrl);
						var url2 = rawUrl;
						var title = XToolCheckerBtnManager.GetLinkTitlePrAdverts(tmpObj);
						var domain2 = XToolCheckerBtnManager.GetDomainFromUrl(rawUrl);
						var domain = XToolCheckerBtnManager.PrepareLink(domain2);
						
						XToolCheckerBtnManager.InsertButtons(false, obj, url, title, i, doc, url2, false);

						XToolCheckerBtnManager.AddXTXTD(url, domain, doc, obj, i, url2);
						
						var spaceBR1_ = doc.createElement("BR");
						spaceBR1_.id = cn._spaceSpan + i + "_01";
						obj.parentNode.insertBefore(spaceBR1_,obj.nextSibling);
						var spaceBR_ = doc.createElement("BR");
						spaceBR_.id = cn._spaceSpan + i + "_00";
						obj.parentNode.insertBefore(spaceBR_,obj.nextSibling);
						XToolCheckerBtnManager.InsertLinkMarker(obj, doc);
					}
				
				}
			}
		}
		else if (hrefL.indexOf(this._prAdvertsPart) != -1)
		{
			var ass = doc.getElementsByTagName("A");
			//var ass = doc.getElementsByTagName("INPUT");
			var lastTR = 0;
			for(var i = 0; i < ass.length; i++)
			{
				var aaa = ass[i];
				if ((aaa.className.indexOf("js_keyword_text") != -1))
				{
					
						var obj = aaa;//links[1];
						var rawUrl =  XToolCheckerBtnManager.PrepareRawLink(obj.href);
						var url = XToolCheckerBtnManager.PrepareLink(rawUrl);
						var url2 = rawUrl;
						var title = "";//XToolCheckerBtnManager.GetLinkTitlePrAdverts(tmpObj);
						var domain2 = XToolCheckerBtnManager.GetDomainFromUrl(rawUrl);
						var domain = XToolCheckerBtnManager.PrepareLink(domain2);
						
						XToolCheckerBtnManager.InsertButtons(false, obj, url, title, i, doc, url2, false);

						XToolCheckerBtnManager.AddXTXTD(url, domain, doc, obj, i, url2);
						
						var spaceBR1_ = doc.createElement("BR");
						spaceBR1_.id = cn._spaceSpan + i + "_01";
						obj.parentNode.insertBefore(spaceBR1_,obj.nextSibling);
						var spaceBR_ = doc.createElement("BR");
						spaceBR_.id = cn._spaceSpan + i + "_00";
						obj.parentNode.insertBefore(spaceBR_,obj.nextSibling);
						XToolCheckerBtnManager.InsertLinkMarker(obj, doc);
				}
			}
		}
		if ((hrefL.indexOf(cn._linksPart) != -1) ||
			(hrefL.indexOf(cn._linksWaitPart) != -1) ||
			(hrefL.indexOf(cn._linksNewPricePart) != -1))
		{
		
			var trs = doc.getElementsByTagName("tr");
			for(var i = 0; i < trs.length; i++)
			{
			
				var tr = trs[i];
				var links = tr.getElementsByTagName("A");
				for(var j = 0; j < links.length; j++)
				{
					var obj = links[j];
					
					if ((obj.className.indexOf("icon_wl") == 0) || (obj.className.indexOf("icon_yap") == 0) || (obj.className.indexOf("icon_gc") == 0))
					{
					
						var pObj = obj.parentNode;
						if ((hrefL.indexOf(cn._linksPart) == -1) && (hrefL.indexOf(cn._linksNewPricePart) == -1))
						{
							pObj = pObj.parentNode;
						}
					
						var aLinks = pObj.getElementsByTagName("A");
						if (aLinks.length > 0)
						{
							var rawUrl =  XToolCheckerBtnManager.PrepareRawLink(aLinks[0].href);
							
							var url = XToolCheckerBtnManager.PrepareLink(rawUrl);
							var url2 = rawUrl;
							var title = XToolCheckerBtnManager.GetLinkTitle(aLinks[0], hrefL);
							var domain2 = XToolCheckerBtnManager.GetDomainFromUrl(rawUrl);
							var domain = XToolCheckerBtnManager.PrepareLink(domain2);
							

							
							var prjUrl = "";
							if (sts._show_pos) 
							{
								prjUrl = XToolCheckerBtnManager.GetProjectURL(obj, hrefL, doc);
							}

							XToolCheckerBtnManager.InsertEverything(false, true, doc, obj, i, url, domain, url2, title, false, false, false, prjUrl);
						}
						break;
					}
				}
			}
		}
		else if (hrefL.indexOf(cn._linksSitePart) != -1)
		{
			var tds = doc.getElementsByTagName("td");
			for(var i = 0; i < tds.length; i++)
			{
				var td = tds[i];
				if (td.className == "_text")
				{
					var td1 = td.nextSibling;
					if (!td1)
						continue;
					var aLinks = td1.getElementsByTagName("a");
					if ((aLinks) && (aLinks.length > 0))
					{
						var obj = aLinks[0].parentNode.parentNode;
						var space = doc.createElement("SPAN");
						space.id = cn._spaceSpan + i;
						space.textContent = " ";
						obj.parentNode.insertBefore(space,obj.nextSibling);	
						obj = space;
						var spaceBR_ = doc.createElement("BR");
						spaceBR_.id = cn._spaceSpan + i + "_00";
					
						obj.parentNode.insertBefore(spaceBR_,obj.nextSibling);
						
						var rawUrl = XToolCheckerBtnManager.PrepareRawLink(aLinks[0].href);
						var url = XToolCheckerBtnManager.PrepareLink(rawUrl);
						var url2 = rawUrl;
						var title = "";//XToolCheckerBtnManager.GetLinkTitle2(td, hrefL);
						var domain2 = XToolCheckerBtnManager.GetDomainFromUrl(rawUrl);
						var domain = XToolCheckerBtnManager.PrepareLink(domain2);
						
						var space = doc.createElement("SPAN");
						space.id = cn._spaceSpan + i;
						space.textContent = " ";
						obj.parentNode.insertBefore(space,obj);	
						
						XToolCheckerBtnManager.InsertButtons(false, obj, url, title, i, doc, url2, false, false, false);
							
						XToolCheckerBtnManager.AddXTXTD(url, domain, doc, obj, i, url2);
						XToolCheckerBtnManager.InsertLinkMarker(aLinks[0], doc);
							
						
					}
				}
			}
		}
		else if (hrefL.indexOf(cn._projectsPart) != -1)
		{
			var divs = doc.getElementsByTagName("DIV");
			
			for(var i = 0; i < divs.length; i++)
			{
				if (divs[i].className == "long_link")
				{
					var links = divs[i].getElementsByTagName("A");
					if (links.length > 0)
					{
						var obj = links[0];
						if ((obj.textContent == "") && (links.length > 1))
						{
							obj = links[1];
						}
						
						
						if (obj.href.indexOf("sape.ru") == -1)
						{
								var url2 = XToolCheckerBtnManager.PrepareRawLink(obj.href);
								var url = XToolCheckerBtnManager.PrepareLink(url2);
								XToolCheckerBtnManager.InsertButtons(false, obj, url, urlTitle, i, doc, url2, urlTitle == "");
								
								var spaceBR_ = doc.createElement("BR");
								spaceBR_.id = cn._spaceSpan + i + "_00";
						
								obj.parentNode.insertBefore(spaceBR_,obj.nextSibling);
								
								XToolCheckerBtnManager.AddXTXTD(url, "", doc, obj, i, url2);
								
								XToolCheckerBtnManager.InsertLinkMarker(obj, doc);
						}
					}
				}
			}
		}
		else if ((hrefL.indexOf(cn._ordersPart) != -1) ||
				(hrefL.indexOf(cn._searchPart) != -1) )
		{
			var tds = doc.getElementsByTagName("TD");
			for(var i = 0; i < tds.length; i++)
			{
				if ((tds[i].className == "ra") && (tds[i].textContent == "Цена"))
				{
					var nextTd = tds[i].nextSibling;
					if (nextTd.style)
						nextTd.style.width = "220px";
				}
			}
			try {
			////подписываем кнопку и ссылки перехода по страницам результата
			var searchButton = doc.getElementById("do_search");
			if ((searchButton) && (searchButton.name == "new_search"))
			{
				searchButton.addEventListener("click", XToolCheckerBtnManager.OnOrdersSearch, false);
			}
			}
			catch (e)
			{
				console.log(e);
			}
		
			var ps = doc.getElementsByTagName("p");
			for(var i = 0; i < ps.length; i++)
			{
				if ((ps[i].className == "pagination_arrow") || (ps[i].className == "pagination_arrow_right"))
				{
					var links = ps[i].getElementsByTagName("A");
					for(var j = 0; j < links.length; j++)
					{
						links[j].addEventListener("click", XToolCheckerBtnManager.OnOrdersSearch, false);
					}
				}
			}
		
			var divs = doc.getElementsByTagName("div");
			for(var i = 0; i < divs.length; i++)
			{
				if (divs[i].className == "pagination_container_links")
				{
					var links = divs[i].getElementsByTagName("A");
					for(var j = 0; j < links.length; j++)
					{
						links[j].addEventListener("click", XToolCheckerBtnManager.OnOrdersSearch, false);
					}
				}
			}

			var x = document.querySelectorAll("a.page-link"); 
			for(var i = 0; i < x.length; i++)
			{
				x[i].addEventListener("click", XToolCheckerBtnManager.OnOrdersSearch, false);
			}
			////
			var links = doc.getElementsByTagName("A");
			var hasRoots = 0;
			for(var i = 0; i < links.length; i++)
			{
				var obj = links[i];

				if (obj.className.indexOf("icon_gc") == 0)
				{
					var pObj = obj.parentNode;
					pObj = pObj.parentNode;
				
				
					var aLinks = pObj.getElementsByTagName("A");
					if (aLinks.length > 0)
					{
						var url2 = XToolCheckerBtnManager.PrepareRawLink(aLinks[0].href);
						var url = XToolCheckerBtnManager.PrepareLink(url2);
						
						var domain2 = XToolCheckerBtnManager.GetDomainFromUrl(url2);
						var domain = XToolCheckerBtnManager.PrepareLink(domain2);
						var title = XToolCheckerBtnManager.PrepareLink(XToolCheckerBtnManager.ProccessSapeTitle(aLinks[0].textContent));
						var isDomain = false;
						//if (hrefL.indexOf(cn._searchPart) != -1)
							obj = aLinks[0];


						XToolCheckerBtnManager.InsertButtons(false, obj, url, title, i, doc, url2, title == "");
						XToolCheckerBtnManager.AddXTXTD(url, domain, doc, obj, i, url2, true);
						XToolCheckerBtnManager.InsertLinkMarker(aLinks[0], doc);
						
						var spaceBR_ = doc.createElement("BR");
						spaceBR_.id = cn._spaceSpan + i + "_00";
						obj.parentNode.insertBefore(spaceBR_,obj.nextSibling);	
						
					}
					
				}
				else if ((obj.className.indexOf("ajax_link") != -1) && (obj.getAttribute("sid"))/* && (obj.href == "#")*/)
				{
					var parts = obj.textContent.split(" ");
					if (parts.length > 0)
					{
							
							var url2 = "http://" + parts[0];
							var url = XToolCheckerBtnManager.PrepareLink(url2);
							
							var domain2 = XToolCheckerBtnManager.GetDomainFromUrl(url2);
							var domain = XToolCheckerBtnManager.PrepareLink(domain2);
							if (url2.indexOf(".") == -1)
								continue;
							var domain = XToolCheckerBtnManager.GetDomainFromUrl(url);
							var title = "";
/*
							obj = obj.parentNode;
							if (obj.tagName.toLowerCase() == "b")
								obj = obj.parentNode;
							if (obj.className != "long_link")
								continue;
							obj = obj.parentNode;
							if (obj.className != "long_link_box")
								continue;*/
							XToolCheckerBtnManager.InsertButtons(false, obj, url, title, i, doc, url2, true, false, url.indexOf("/") != -1);								

							hasRoots = 1;
													
							XToolCheckerBtnManager.AddXTXTD(url, domain, doc, obj, i, url2);
							XToolCheckerBtnManager.InsertLinkMarker(obj, doc, url2);
							var spaceBR_ = doc.createElement("BR");
							spaceBR_.id = this._spaceSpan + i + "_00";
							obj.parentNode.insertBefore(spaceBR_,obj.nextSibling);	
					}
				}
			
			}
		}
		else if (hrefL.indexOf(cn._sitesPart) != -1)
		{
			//var tds = doc.getElementsByTagName("TD");
			var links = doc.getElementsByTagName("A");
			//for(var i = 0; i < tds.length; i++)
			for(var i = 0; i < links.length; i++)
			{
			/*	if (tds[i].className = "la")
				{
					var links = tds[i].getElementsByTagName("A");*/
					//if (links.length > 1)
					var obj = links[i];
					if ((obj.className == "ajax_link") /*&& (obj.getAttribute("sid") != "")*/)
					{
						//var obj = links[1];
						if (obj.title == obj.textContent)
						{
						
							
							var url = XToolCheckerBtnManager.PrepareLink(obj.textContent);
							var url2 = "http://" + url;
							if (url.indexOf(".") == -1)
								continue;
							obj = obj.parentNode;
							if (obj.tagName.toLowerCase() == "b")
								obj = obj.parentNode;
							if (obj.className != "long_link")
								continue;
							obj = obj.parentNode;
							if (obj.className != "long_link_box")
								continue;
							XToolCheckerBtnManager.InsertButtons(false, obj, url, "", i, doc, url2, true, false, url.indexOf("/") != -1);
										
							
							XToolCheckerBtnManager.AddXTXTD(url, url, doc, obj, i, url2);
							
							XToolCheckerBtnManager.InsertLinkMarker(obj, doc, url2);
						}
							
						
					}
				}
			//}
		}
		else if (hrefL.indexOf(cn._submitOrdersPart) != -1)
		{
			var tds = doc.getElementsByTagName("TD");
			
			for(var i = 0; i < tds.length; i++)
			{
				if (tds[i].className == "_text")
				{
				
					var urlTitle = "";
					//tds[i].textContent;
					var ars = tds[i].getElementsByTagName("textarea");
					if ((ars) && (ars.length > 0))
					{
						urlTitle = XToolCheckerBtnManager.ProccessSapeTitle(ars[0].textContent);
					}
					var links = tds[i].previousSibling.getElementsByTagName("A");
					if (links.length == 1)
					{
						var link = links[0];
						var url2 =  XToolCheckerBtnManager.PrepareRawLink(link.href);
						var url = XToolCheckerBtnManager.PrepareLink(url2);
						
						var domainUrl2 = XToolCheckerBtnManager.GetDomainFromUrl(url2);
						var domainUrl = XToolCheckerBtnManager.PrepareLink(domainUrl2);
					
						var tmpDiv = doc.createElement("DIV");
						link.parentNode.appendChild(tmpDiv);
						XToolCheckerBtnManager.InsertButtons(false, link, url, urlTitle, i, doc, url2, true);
					
						var spaceBR_ = doc.createElement("BR");
							spaceBR_.id = cn._spaceSpan + i + "_00";
						link.parentNode.insertBefore(spaceBR_,link.nextSibling);
						{
							var ars = tds[i].getElementsByTagName("textarea");
							if ((ars) && (ars.length > 0))
							{
								if (!ars[0].nextSibling)
								{
									var spaceBR_ = doc.createElement("BR");
									spaceBR_.id = cn._spaceSpan + i + "_00_1";
									ars[0].parentNode.appendChild(spaceBR_,ars[0]);
									var spaceBR2_ = doc.createElement("BR");
									spaceBR2_.id = cn._spaceSpan + i + "_00_2";
									ars[0].parentNode.appendChild(spaceBR2_,ars[0]);
								}
							}
						
						}
						
						XToolCheckerBtnManager.AddXTXTD(url, domainUrl, doc, link, i, url2);
					
						link.parentNode.insertBefore(spaceBR_,link.nextSibling);	
						XToolCheckerBtnManager.InsertLinkMarker(link, doc);
						link.parentNode.removeChild(tmpDiv);
					}
				}
			}
		}
		else if (hrefL.indexOf(cn._apiLinksRentPart) != -1)
		{
			
			var divs = doc.getElementsByTagName("DIV");
			
			for(var i = 0; i < divs.length; i++)
			{
				if (divs[i].className.indexOf('union-row__sub-table-url') != -1)
				{
					var links = divs[i].getElementsByTagName("A");
					if (links.length > 0)
					{
						var obj = links[0];
    					if ((obj.href.indexOf("sape.ru") == -1) && (obj.target == '_blank'))
						{

								var url2 = XToolCheckerBtnManager.PrepareRawLink(obj.href);
								var url = XToolCheckerBtnManager.PrepareLink(url2);
								
								var domain2 = XToolCheckerBtnManager.GetDomainFromUrl(url2);
								var domain = XToolCheckerBtnManager.PrepareLink(domain2);
								var title = "";

								
								XToolCheckerBtnManager.InsertEverything(false, true, doc, obj, i, url, domain, url2, title);
						}
					}
				}
			}

			var spans = doc.getElementsByTagName("SPAN");
			
			for(var j = 0; j < spans.length; j++)
			{
				if (spans[j].className.indexOf('search-result__link') != -1)
				{
					var links = spans[j].parentNode.parentNode.getElementsByTagName("A");
					if (links.length > 0) 
					{
						var obj = links[0];
						if ((obj.href.indexOf("sape.ru") == -1) && (obj.target == '_blank'))
						{

								var url2 = XToolCheckerBtnManager.PrepareRawLink(obj.href);
								var url = XToolCheckerBtnManager.PrepareLink(url2);
								
								var domain2 = XToolCheckerBtnManager.GetDomainFromUrl(url2);
								var domain = XToolCheckerBtnManager.PrepareLink(domain2);
								var title = "";
		
								
								XToolCheckerBtnManager.InsertEverything(false, true, doc, obj, j, url, domain, url2, title);
						}
					}
				}
			}
		}
	},
	AddButtonsToSeopult : function (doc)
	{
		var cn = XToolCheckerConst;
		var hrefL = XToolCheckerBtnManager.GetLocation(doc);
		var domain = XToolCheckerBtnManager.GetDomainName(hrefL);
		if (hrefL.toLowerCase().indexOf(cn._seopultPart) != -1)
		{
			// Ищем форму 
			var forms = doc.getElementsByTagName("form");
			for(var j = 0; j < forms.length; j++)
			{
				if (forms[j].name == "keyword_links")
				{
					var links = forms[j].getElementsByTagName("A");
					var domain = XToolCheckerBtnManager.GetDomainName(hrefL);
					
					for(var i = 0; i < links.length; i++)
					{
						var link = links[i];
						// отсекаем Javascript ссылки
						if  (link.href.indexOf("http://") != -1) 
						{
							if (link.href.indexOf(domain) == -1)
							{
								var url2 = link.href;
								if (link.textContent.indexOf(":") == -1)
									continue;
								var url = XToolCheckerBtnManager.PrepareLink(link.href);
								var obj = link.parentNode;
								obj = obj.parentNode;
								var urlTitle = XToolCheckerBtnManager.GetLinkTitle4(link);//obj.textContent;
								var domainUrl2 = XToolCheckerBtnManager.GetDomainFromUrl(link.href);
								var domainUrl = XToolCheckerBtnManager.PrepareLink(domainUrl2);
								var prjUrl = "";
								if (this.sts._show_pos) 
								{
									prjUrl = XToolCheckerBtnManager.GetProjectURL(obj, hrefL.toLowerCase(), doc);
								}	
								XToolCheckerBtnManager.InsertButtons(false, obj, url, urlTitle, i, doc, url2, false, false, false, prjUrl );
								
								
								XToolCheckerBtnManager.AddXTXTD(url, domainUrl, doc, obj, i, url2);
								XToolCheckerBtnManager.InsertLinkMarker(link, doc, i);

							}
						}
					}
				}
			}
		} else
		if (hrefL.toLowerCase().indexOf(cn._seopultPrjPart) != -1)
		{
			
			
			var tables = doc.getElementsByTagName("table");
			for(var j = 0; j < tables.length; j++)
			{
				if (tables[j].className == "key_word_tbl")
				{
					var trs = tables[j].getElementsByTagName("tr");
					var domain = XToolCheckerBtnManager.GetDomainName(hrefL);
					
					for(var i = 0; i < trs.length; i++)
					{
						var links = trs[i].getElementsByTagName("a");
						if (links.length > 1)
						{
							var link = links[1];
							// отсекаем Javascript ссылки
							if  (link.href.indexOf("http://") != -1) 
							{
								if (link.href.indexOf(domain) == -1)
								{
									var url2 = link.href;
									var url = XToolCheckerBtnManager.PrepareLink(link.href);
									var obj = link.parentNode;
									obj = obj.parentNode;
									var urlTitle = XToolCheckerBtnManager.GetLinkTitle4(link);//obj.textContent;
									var domainUrl2 = XToolCheckerBtnManager.GetDomainFromUrl(link.href);
									var domainUrl = XToolCheckerBtnManager.PrepareLink(domainUrl2);
									XToolCheckerBtnManager.InsertButtons(false, obj, url, urlTitle, i, doc, url2, false, true);
									XToolCheckerBtnManager.AddXTXTD(url, domainUrl, doc, obj, i, url2);
									XToolCheckerBtnManager.InsertLinkMarker(link, doc, i);
								}
							}
						}
					}
				}
			}
		}
		else if (hrefL.toLowerCase().indexOf(cn._seopultPROPart) != -1)
		{
			
			var divs = doc.getElementsByTagName("div");
			for(var j = 0; j < divs.length; j++)
			{
				if (divs[j].getAttribute("role") == "links-table")
				{
					var trs = divs[j].getElementsByTagName("tr");
					var domain = XToolCheckerBtnManager.GetDomainName(hrefL);
					
					for(var i = 0; i < trs.length; i++)
					{
						var links = trs[i].getElementsByTagName("a");
						if (links.length > 0)
						{
							for(var k = 0; k < links.length; k++)
							{
								var link = links[k];

								if ((link.target == '_blank') && ((link.title != undefined) && ( link.title.indexOf('http://') == 0)))
								{
									var url2 = link.title;
									var url = XToolCheckerBtnManager.PrepareLink(link.title);
									var obj = link.parentNode;
									obj = obj.parentNode;
									var urlTitle = XToolCheckerBtnManager.GetLinkTitle4(link);//obj.textContent;
									var domainUrl2 = XToolCheckerBtnManager.GetDomainFromUrl(link.title);
									var domainUrl = XToolCheckerBtnManager.PrepareLink(domainUrl2);
									XToolCheckerBtnManager.InsertButtons(false, obj, url, urlTitle, i, doc, url2, false, true);
									
									XToolCheckerBtnManager.AddXTXTD(url, domainUrl, doc, obj, i, url2);
									XToolCheckerBtnManager.InsertLinkMarker(link, doc, i);
								}
							}
						}
					}
				}
			}
		}
		
	},
		
	
	
	AddButtonsToLiex : function (doc, part)
	{
		console.log("AddButtonsToLiex");
		var cn = XToolCheckerConst;
		var hrefL = XToolCheckerBtnManager.GetLocation(doc);
		var domain = XToolCheckerBtnManager.GetDomainName(hrefL);
		// Ищем таблицу 
		var tables = doc.getElementsByTagName("table");
		for(var j = 0; j < tables.length; j++)
		{
			if ((tables[j].className == "striped") || (tables[j].id == "table_res"))
			{
				var trs = tables[j].getElementsByTagName("TR");
				
				
				for(var i = 0; i < trs.length; i++)
				{
					var links = trs[i].getElementsByTagName("A");
					if (links.length > 0) 
					{
						var link = links[0];
						if ((part == 2) && (links.length > 2))
							link = links[2];
						var href = "";
						if (link.href.indexOf(cn._liexLinkPrefix) == 0)
						{
							href = link.href;
							href = href.replace(cn._liexLinkPrefix, "");
						}
						else if (link.href.indexOf(cn._liexLinkPrefix2) != -1)
						{
							var index = link.href.indexOf(cn._liexLinkPrefix2);
							href = link.href.substring(index);
							href = href.replace(cn._liexLinkPrefix2, "");
						}
						if (href != "")
						{
							if (href.indexOf(domain) == -1)
							{
								var url2 = href;
								var url = XToolCheckerBtnManager.PrepareLink(href);
								var domainUrl2 = XToolCheckerBtnManager.GetDomainFromUrl(href);
								var domainUrl = XToolCheckerBtnManager.PrepareLink(domainUrl2);
								var urlTitle = "";
								XToolCheckerBtnManager.InsertEverything(false, true, doc, link, i, url, domainUrl, url2, urlTitle);
								
							}
						}
					}
				}
			}
		}
	},
	
	AddButtonsToXap : function (doc)
	{
		var cn = XToolCheckerConst;
		var hrefL = XToolCheckerBtnManager.GetLocation(doc);
		var domain = XToolCheckerBtnManager.GetDomainName(hrefL);
		// Ищем таблицу 
		var tables = doc.getElementsByTagName("table");
		for(var j = 0; j < tables.length; j++)
		{
			if (tables[j].id == "maintableID")
			{
				var trs = tables[j].getElementsByTagName("TR");
				
				
				for(var i = 0; i < trs.length; i++)
				{
					var links = trs[i].getElementsByTagName("A");
					if (links.length > 0) 
					{
						var link = links[0];
						
						if (link.className == "link_black_blue")
						{

							var href = link.href;
							if (href.indexOf(domain) == -1)
							{
								var url2 = href;
								var url = XToolCheckerBtnManager.PrepareLink(href);
								var domainUrl2 = XToolCheckerBtnManager.GetDomainFromUrl(href);
								var domainUrl = XToolCheckerBtnManager.PrepareLink(domainUrl2);
								var urlTitle = XToolCheckerBtnManager.GetLinkTitle3(link);
								var prjUrl = "";
								if (sts._show_pos) 
								{
									prjUrl = XToolCheckerBtnManager.GetProjectURL3(link);
								}
								XToolCheckerBtnManager.InsertEverything(false, true, doc, link, i, url, domainUrl, url2, urlTitle, false, false, false, prjUrl);
								
							}
						}
					}
				}
			}
		}
	},
	
	
	
	AddButtonsToRotapost : function (doc)
	{
		var cn = XToolCheckerConst;
		var hrefL = XToolCheckerBtnManager.GetLocation(doc);
		var domain = XToolCheckerBtnManager.GetDomainName(hrefL);
		if (hrefL.toLowerCase().indexOf(cn._rotapostPart) != -1)
		{
			var tables = doc.getElementsByTagName("table");
			for(var j = 0; j < tables.length; j++)
			{
				if (tables[j].className.indexOf("msgTable") != -1)
				{
					var trs = tables[j].parentNode.getElementsByTagName("TR");
					
					for(var i = 0; i < trs.length; i++)
					{
						var links = trs[i].getElementsByTagName("A");
						if (links.length > 1) 
						{
							var link = links[1];
							if (link.title == 'Подробнее')
							{
								href = "http://" + link.textContent.trim();
								if ((href.indexOf(domain) == -1) && (href != ""))
								{
									var url2 = href;
									var url = XToolCheckerBtnManager.PrepareLink(href);
									var domainUrl2 = XToolCheckerBtnManager.GetDomainFromUrl(href);
									var domainUrl = XToolCheckerBtnManager.PrepareLink(domainUrl2);
									var urlTitle = "";//XToolCheckerBtnManager.GetLinkTitle3(link);
									XToolCheckerBtnManager.InsertEverything(false, true, doc, link, i, url, domainUrl, url2, urlTitle);
								}
							}
						}
					}
				}
			}
		}
		else if (hrefL.toLowerCase().indexOf(cn._rotapostPartBuy) != -1)
		{
			var links = doc.getElementsByTagName("A");
			for (var i  = 0; i < links.length; i++)
			{
				var link = links[i];
				if ((link.className.indexOf('siteinfo') != -1) && (link.href.indexOf("//www.rotapost.ru/buy/site/?") != -1))
				{
					if (link.href.indexOf("http://") != -1)
						href = "http://" + link.href.replace("http://www.rotapost.ru/buy/site/?", "");
					else
						href = "https://" + link.href.replace("https://www.rotapost.ru/buy/site/?", "");
					if (href != "")
					{
						var url2 = href;
						var url = XToolCheckerBtnManager.PrepareLink(href);
						var domainUrl2 = XToolCheckerBtnManager.GetDomainFromUrl(href);
						var domainUrl = XToolCheckerBtnManager.PrepareLink(domainUrl2);
						var urlTitle = "";//XToolCheckerBtnManager.GetLinkTitle3(link);
						XToolCheckerBtnManager.InsertEverything(false, true, doc, link, i, url, domainUrl, url2, urlTitle);
					}
				}
			}
		}
	},
	
	GetLinkTitleSetlinks : function (link, href)
	{
		try 
		{
		var parent = link.parentNode;
		var tmpObj = link;
		while (tmpObj.tagName != "TR")
		{
			tmpObj = parent;
			parent = tmpObj.parentNode;
			if (!parent)
				return "";
		}
		var tds = tmpObj.getElementsByTagName("TD");
		for (var i  = 0; i < tds.length; i++)
		{
			var td = tds[i];
			if (td.className == 'text-td')
			{
				var res = td.textContent;
				return XToolCheckerBtnManager.ExtPrepareTitle(res);
			}
			
		}
		return "";
		
		}
		catch(e)
		{
			return "";
		}
	
	},
	
	AddButtonsToForumok : function (doc)
	{
		var cn = XToolCheckerConst;
		var hrefL = XToolCheckerBtnManager.GetLocation(doc);
		var domain = XToolCheckerBtnManager.GetDomainName(hrefL);
		if (hrefL.toLowerCase().indexOf(cn._forumokPart) != -1)
		{
			var tables = doc.getElementsByTagName("TABLE");
			var added = 0;
			for(var i = 0; i < tables.length; i++)
			{
				if (tables[i].id == "advert-order-requests")
				{
					var trs = tables[i].getElementsByTagName("TR");
					for(var j = 0; j < trs.length; j++)
					{
						var links = trs[j].getElementsByTagName("A");
						if (links.length > 0)
						{
							var obj = links[0];
							if (obj.target == "_blank")
							{
								var url2 = XToolCheckerBtnManager.PrepareRawLink(obj.href);
								if (obj.href.indexOf('forumok.com') != -1)
									url2 =  XToolCheckerBtnManager.PrepareRawLink(obj.title);
								var url = XToolCheckerBtnManager.PrepareLink(url2);
								var urlTitle = "";//XToolCheckerBtnManager.GetLinkTitleSW(obj, hrefL);
								var domainUrl2 = XToolCheckerBtnManager.GetDomainFromUrl(url2);
								var domainUrl = XToolCheckerBtnManager.PrepareLink(domainUrl2);
								var link = obj;
								XToolCheckerBtnManager.InsertEverything(false, true, doc, link, i, url, domainUrl, url2, urlTitle);
								added++;
							}
						}
					}
				}
			}
			
			var forms = doc.getElementsByTagName("FORM");
			if (added == 0)
			for(var i = 0; i < forms.length; i++)
			{
				if (forms[i].name == "request_form")
				{
					var trs = forms[i].getElementsByTagName("TR");
					for(var j = 0; j < trs.length; j++)
					{
						var links = trs[j].getElementsByTagName("A");
						if (links.length > 0)
						{
							var obj = links[0];
							
							if (obj.target == "_blank")
							{
								var url2 = XToolCheckerBtnManager.PrepareRawLink(obj.href);
								if (obj.href.indexOf('forumok.com') != -1)
									url2 =  XToolCheckerBtnManager.PrepareRawLink(obj.title);
								var url = XToolCheckerBtnManager.PrepareLink(url2);
								var urlTitle = "";//XToolCheckerBtnManager.GetLinkTitleSW(obj, hrefL);
								var domainUrl2 = XToolCheckerBtnManager.GetDomainFromUrl(url2);
								var domainUrl = XToolCheckerBtnManager.PrepareLink(domainUrl2);
								var link = obj;
								XToolCheckerBtnManager.DebugMsg(urlTitle);
								XToolCheckerBtnManager.InsertEverything(false, true, doc, link, i, url, domainUrl, url2, urlTitle);
							}
						}
					}
				}
			}
		}
	},
	
	AddButtonsToSeowizard : function (doc)
	{
		var cn = XToolCheckerConst;
		var hrefL = XToolCheckerBtnManager.GetLocation(doc);
		var domain = XToolCheckerBtnManager.GetDomainName(hrefL);
		if (hrefL.toLowerCase().indexOf(cn._seowizardPart) != -1)
		{
			var divs = doc.getElementsByTagName("DIV");
			
			for(var i = 0; i < divs.length; i++)
			{
				if (divs[i].className == "long_link" || divs[i].className.indexOf("long_link ") != -1)
				{
					var links = divs[i].getElementsByTagName("A");
					if (links.length > 0)
					{
						var obj = links[0];
						/*if ((obj.textContent == "") && (links.length > 1))
						{
							obj = links[1];
						}*/
						
						
						if ((obj.href.indexOf("seowizard.ru") == -1) && (obj.className.indexOf("icon_") == -1) && (obj.target == '_blank'))
						{
								var url2 = XToolCheckerBtnManager.PrepareRawLink(obj.href);
								var url = XToolCheckerBtnManager.PrepareLink(url2);
								var urlTitle = XToolCheckerBtnManager.GetLinkTitleSW(obj, hrefL);
								var domainUrl2 = XToolCheckerBtnManager.GetDomainFromUrl(url2);
								var domainUrl = XToolCheckerBtnManager.PrepareLink(domainUrl2);
								var link = obj;
								XToolCheckerBtnManager.InsertEverything(false, true, doc, link, i, url, domainUrl, url2, urlTitle);
						}
					}
				}
			}
		}
	},
	
	
	AddButtonsToGetgoodlinks : function (doc)
	{
		var cn = XToolCheckerConst;
		var hrefL = XToolCheckerBtnManager.GetLocation(doc);
		var domain = XToolCheckerBtnManager.GetDomainName(hrefL);
		if (hrefL.toLowerCase().indexOf(cn._getgoodlinksSearch) != -1)
		{
			var tables = doc.getElementsByTagName("table");
			for(var j = 0; j < tables.length; j++)
			{
				if ((tables[j].className.indexOf("table_class") != -1) && (tables[j].id == "table_content"))
				{
					var trs = tables[j].getElementsByTagName("TR");
					for(var i = 0; i < trs.length; i++)
					{
						var links = trs[i].getElementsByTagName("A");
						if ((links) && (links.length > 0))
						{
							var link = links[0];
							if (link.target == "_blank")
							{
								var href = link.href;
								var url2 = href;
								var url = XToolCheckerBtnManager.PrepareLink(href);
								var domainUrl2 = XToolCheckerBtnManager.GetDomainFromUrl(href);
								var domainUrl = XToolCheckerBtnManager.PrepareLink(domainUrl2);
								var urlTitle = "";
								XToolCheckerBtnManager.InsertEverything(false, true, doc, link, i, url, domainUrl, url2, urlTitle);
								
							}
						}
					}
				}
			}
		}
		else

		if (hrefL.toLowerCase().indexOf(cn._getgoodlinksPostView) != -1)
		{
			var tables = doc.getElementsByTagName("form");
			for(var j = 0; j < tables.length; j++)
			{
				if (tables[j].name == "table_form")
				{
					var trs = tables[j].getElementsByTagName("TR");
					for(var i = 0; i < trs.length; i++)
					{
						var links = trs[i].getElementsByTagName("A");
						if ((links) && (links.length > 1))
						{
							var link = links[1];
							if (link.target == "_blank")
							{
								var href = link.href;
								var url2 = href;
								var url = XToolCheckerBtnManager.PrepareLink(href);
								var domainUrl2 = XToolCheckerBtnManager.GetDomainFromUrl(href);
								var domainUrl = XToolCheckerBtnManager.PrepareLink(domainUrl2);
								var urlTitle = "";
								XToolCheckerBtnManager.InsertEverything(false, true, doc, link, i, url, domainUrl, url2, urlTitle);
								
							}
						}
					}
				}
			}
		}
	},
	
	AddButtonsToMiralinks : function (doc)
	{
		var cn = XToolCheckerConst;
		var hrefL = XToolCheckerBtnManager.GetLocation(doc);
		var domain = XToolCheckerBtnManager.GetDomainName(hrefL);
		if ((hrefL.toLowerCase().indexOf(cn._miralinks) != -1) || (hrefL.toLowerCase().indexOf(cn._miralinks2) != -1))
		{
			var as = doc.getElementsByTagName("a");
			for(var i = 0; i < as.length; i++)
			{
				var link = as[i];
				if (link.className == 'external-link')
				{
					var href = link.href;
					if (href != "")
					{
					
						link = link.parentNode.parentNode;
						var url2 = href;
						var url = XToolCheckerBtnManager.PrepareLink(href);
						var domainUrl2 = XToolCheckerBtnManager.GetDomainFromUrl(href);
						var domainUrl = XToolCheckerBtnManager.PrepareLink(domainUrl2);
						
						var urlTitle = "";
						var as2 = link.parentNode.getElementsByTagName("a");
						for(var j = 0; j < as2.length; j++)
						{
							var link2 = as[j];
							if (link2.className.indexOf("articleLink") != -1)
							{
								urlTitle = link2.textContent;
								break;
							}
						}
						XToolCheckerBtnManager.InsertEverything(false, false, doc, link, i, url, domainUrl, url2, urlTitle);
					}
				}
			
			}
			
		}
	},
	
	AddButtonsToSetlinks : function (doc)
	{
		var cn = XToolCheckerConst;
		var hrefL = XToolCheckerBtnManager.GetLocation(doc);
		var domain = XToolCheckerBtnManager.GetDomainName(hrefL);
		if ((hrefL.toLowerCase().indexOf(cn._setlinks) != -1) || (hrefL.toLowerCase().indexOf(cn._setlinksSearch) != -1))
		{
			var as = doc.getElementsByTagName("a");
			for(var i = 0; i < as.length; i++)
			{
				var link = as[i];
				if (link.className == 'Url')
				{
					var href = link.href;
					if (href != "")
					{
						var url2 = href;
						var url = XToolCheckerBtnManager.PrepareLink(href);
						var domainUrl2 = XToolCheckerBtnManager.GetDomainFromUrl(href);
						var domainUrl = XToolCheckerBtnManager.PrepareLink(domainUrl2);
						var urlTitle = XToolCheckerBtnManager.GetLinkTitleSetlinks(link);
						XToolCheckerBtnManager.InsertEverything(false, false, doc, link, i, url, domainUrl, url2, urlTitle);
					}
				}
			
			}
			
		}
	},
	
	AddButtonsToBlogun : function (doc)
	{
			var cn = XToolCheckerConst;
		var hrefL = XToolCheckerBtnManager.GetLocation(doc);
		var domain = XToolCheckerBtnManager.GetDomainName(hrefL);
		if (hrefL.toLowerCase().indexOf(cn._blogunPartRequests) != -1)
		{
			// Ищем форму 
			var forms = doc.getElementsByTagName("form");
			for(var j = 0; j < forms.length; j++)
			{
				if (forms[j].id == "mainform")
				{
					var tds = forms[j].parentNode.getElementsByTagName("TD");
					
					for(var i = 0; i < tds.length; i++)
					{
						if (tds[i].className == "adv-request-blog")
						{
							var links = tds[i].getElementsByTagName("A");
							if (links.length > 0) 
							{
								var link = links[0];
								
								var href = link.href;
								if (href.indexOf("blogun.ru/catalog/") != -1)
									href = "http://"+link.textContent;
								
								if ((href.indexOf(domain) == -1) && (href != ""))
								{
									var url2 = href;
									var url = XToolCheckerBtnManager.PrepareLink(href);
									var domainUrl2 = XToolCheckerBtnManager.GetDomainFromUrl(href);
									var domainUrl = XToolCheckerBtnManager.PrepareLink(domainUrl2);
									var urlTitle = "";//XToolCheckerBtnManager.GetLinkTitle3(link);
									XToolCheckerBtnManager.InsertEverything(false, true, doc, link, i, url, domainUrl, url2, urlTitle);
								}
					
							}
						}
					}
				}
			}
		}
		else if (hrefL.toLowerCase().indexOf(cn._blogunCampainReport) != -1)
		{
			// Ищем форму 
			var forms = doc.getElementsByTagName("form");
			for(var j = 0; j < forms.length; j++)
			{
				if (forms[j].id == "inviteform2")
				{
					var trs = forms[j].parentNode.getElementsByTagName("TR");
					
					for(var i = 0; i < trs.length; i++)
					{

						var links = trs[i].getElementsByTagName("A");
						if (links.length > 0) 
						{
							var link = links[0];
							
							var href = link.href;
							if (href.indexOf("blogun.ru/catalog/") != -1)
							{
								href = "http://"+link.textContent;
							
								if ((href.indexOf(domain) == -1) && (href != ""))
								{
									var url2 = href;
									var url = XToolCheckerBtnManager.PrepareLink(href);
									var domainUrl2 = XToolCheckerBtnManager.GetDomainFromUrl(href);
									var domainUrl = XToolCheckerBtnManager.PrepareLink(domainUrl2);
									var urlTitle = "";//XToolCheckerBtnManager.GetLinkTitle3(link);
									XToolCheckerBtnManager.InsertEverything(false, true, doc, link, i, url, domainUrl, url2, urlTitle);
								}
				
							}
							
						}
					}
				}
			}
		}
		else if (hrefL.toLowerCase().indexOf(cn._blogunPartList) != -1)
		{
			var tds = doc.getElementsByTagName("td");
			for(var j = 0; j < tds.length; j++)
			{
				if (tds[j].className == "t-campaign")
				{
					var links = tds[j].getElementsByTagName("A");
					if (links.length > 0) 
					{
						var link = links[0];
						if (link.textContent =="")
						{
							if (links.length < 2)
								continue;
							link = links[1];
						}
						var href = link.href;
						if (href.indexOf("blogun.ru/catalog/") != -1)
							href = "http://"+link.textContent;
						
						if (href.indexOf(domain) == -1)
						{
							var url2 = href;
							var url = XToolCheckerBtnManager.PrepareLink(href);
							var domainUrl2 = XToolCheckerBtnManager.GetDomainFromUrl(href);
							var domainUrl = XToolCheckerBtnManager.PrepareLink(domainUrl2);
							var urlTitle = ""//XToolCheckerBtnManager.GetLinkTitle3(link);
							XToolCheckerBtnManager.InsertEverything(false, true, doc, link, i, url, domainUrl, url2, urlTitle);
						}
			
					}
				}
			}
		}
	},
	
	
	InsertEverything : function(generated, needBR, doc, link, i, url, domainUrl, url2, urlTitle, skipL, needBreak, skipDomain, prjUrl)
	{
		var cn = XToolCheckerConst;
		var block = doc.createElement("DIV");
		block.style = "margin: 4px 4px 4px 0; display: block; direction: ltr; ";

		let firstBlock = doc.createElement("SPAN");
		firstBlock.id = cn._infoBlockPrefix + 'Hidden' + i;
		firstBlock.textContent = " ";
		firstBlock.style.visibility= 'hidden';
		block.appendChild(firstBlock);
		
		XToolCheckerBtnManager.InsertInfoBlockAfterElement(i, doc, firstBlock);

		var block2 = doc.createElement("DIV");
		block2.style = "margin: 4px 4px 4px 0; display: block; direction: ltr; ";
		block2.id = XToolCheckerBtnManager.GetButtonName(cn._infoButtonBlockPrefix, i, "_");
		let firstBlock2 = doc.createElement("SPAN");
		firstBlock2.id = cn._infoBlockPrefix + 'Hidden_' + i;
		firstBlock2.textContent = " ";
		firstBlock2.style.visibility= 'hidden';
		block2.appendChild(firstBlock2);
		XToolCheckerBtnManager.InsertButtons(generated, firstBlock2, url, urlTitle, i, doc, url2, skipL, needBreak, skipDomain, prjUrl);

		XToolCheckerBtnManager.AddXTXTD(url, domainUrl, doc, firstBlock2, i, url2);
		if (needBR)
		{
			var spaceBR_ = doc.createElement("BR");
			spaceBR_.id = XToolCheckerBtnManager.GetButtonName(XToolCheckerConst._spaceSpan, i, "_00");
			firstBlock2.parentNode.insertBefore(spaceBR_,firstBlock2.nextSibling);	
		}

		if (firstBlock.nextSibling)
			firstBlock.parentNode.insertBefore(block2, firstBlock.nextSibling);
		else
			firstBlock.parentNode.appendChild(block2);

		if (link.nextSibling)
			link.parentNode.insertBefore(block, link.nextSibling);
		else
			link.parentNode.appendChild(block);

		

		XToolCheckerBtnManager.InsertLinkMarker(link, doc, i);
		
	},
	
	//*//
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
	
	
	GetLinkTitleMainlink : function (link)
	{
		try
		{
			var tmpObj = link.parentNode;
			tmpObj = tmpObj.parentNode;
			tmpObj = tmpObj.parentNode;
			tmpObj = tmpObj.parentNode;
			tmpObj = tmpObj.parentNode;
			tmpObj = tmpObj.nextSibling;
			var spans = tmpObj.getElementsByTagName("SPAN");
			if ((spans) && (spans.length > 0))
			{
				if (spans[0].className == "text-link")
					return XToolCheckerBtnManager.ExtPrepareTitle(spans[0].innerHTML) ;
			}
		
		}
		catch(e)
		{
			XToolCheckerBtnManager.DebugMsg(e);
		}
	},
	
	GetButtonName : function (name, index, suffix)
	{
		var dt = new Date();
		return name + index + suffix + "_" + dt.getTime();
	},
	
	AddButtonsToRookee : function (doc)
	{
		var cn = XToolCheckerConst;
		var hrefL = XToolCheckerBtnManager.GetLocation(doc);
		var domain = XToolCheckerBtnManager.GetDomainName(hrefL);
		{
			var btnCount = 0;
			if (this.sts._show_gl) btnCount++;
			if (this.sts._show_gc) btnCount++;
			if (this.sts._show_gp) btnCount++;
			if (this.sts._show_bc)  btnCount++;
			if (this.sts._show_lvl)  btnCount++;
			if (this.sts._show_iny)  btnCount++;
			if (this.sts._show_pr)  btnCount++;
			if (this.sts._show_gbl)  btnCount++;
			if (this.sts._show_bl)  btnCount++;
			if (XToolCheckerBtnManager.IsShowYap())  btnCount++;
			if (XToolCheckerBtnManager.IsShowYal())  btnCount++;
			if (this.sts._show_trf) btnCount++;
			var divs = doc.getElementsByTagName("div");
			for(var j = 0; j < divs.length; j++)
			{
				
				if (divs[j].id == "grid-projectLinks")
				{
					var links = divs[j].getElementsByTagName("A");
					var lastLink = "";
					
					
					
					for(var i = 0; i < links.length; i++)
					{
						
						var link = links[i];
						if ((link.href.indexOf(domain) == -1) && (link.target == "_blank") && (link.href != lastLink))
						{	
							var href = link.href;
							lastLink = href;
							var url2 = href;
							var url = XToolCheckerBtnManager.PrepareLink(href);
							var domainUrl2 = XToolCheckerBtnManager.GetDomainFromUrl(href);
							var domainUrl = XToolCheckerBtnManager.PrepareLink(domainUrl2);
							var urlTitle = XToolCheckerBtnManager.GetLinkTitle5(link, hrefL);
							XToolCheckerBtnManager.InsertButtons(false, link, url, urlTitle, i, doc, url2, false, btnCount > 5);

							var spaceBR_ = doc.createElement("BR");
							spaceBR_.id = cn._spaceSpan + i + "_00";
							link.parentNode.insertBefore(spaceBR_,link.nextSibling);
							XToolCheckerBtnManager.AddXTXTD(url, domainUrl, doc, link, i, url2);
								
								
							XToolCheckerBtnManager.InsertLinkMarker(link, doc, i);
						}
				
					}
				}
				if (divs[j].id == "report-content")
				{
					var trs = divs[j].getElementsByTagName("TR");
					for(var i = 0; i < trs.length; i++)
					{
						var links = trs[i].getElementsByTagName("A");
						if (!links || (links.length == 0))
							continue;
						var link = links[0];
						var urlTitle = XToolCheckerBtnManager.ExtPrepareTitle(link.parentNode.textContent);
						if ((urlTitle.indexOf("[...]") != 0) && (links.length > 1))
						{
							var tmp = links[1].getAttribute("data-content");
							tmp = tmp.replace("\&amp;", "\&");
							tmp = tmp.replace("\&lt;", "\<");
							tmp = tmp.replace("\&gt;", "\>");
							urlTitle = XToolCheckerBtnManager.ExtPrepareTitle(tmp);
						}
						var linkTD = link.parentNode.previousSibling.previousSibling;
						var href = linkTD.title;
						if (href == "")
							href = linkTD.textContent;
						href = "http://" + href;
						var url2 = href;
						var url = XToolCheckerBtnManager.PrepareLink(href);
						var domainUrl2 = XToolCheckerBtnManager.GetDomainFromUrl(href);
						var domainUrl = XToolCheckerBtnManager.PrepareLink(domainUrl2);
						link = linkTD.firstChild;
						XToolCheckerBtnManager.InsertButtons(false, link, url, urlTitle, i, doc, url2, false, btnCount > 5);
						
						XToolCheckerBtnManager.AddXTXTD(url, domainUrl, doc, link, i, url2);
						var spaceBR_ = doc.createElement("BR");
						spaceBR_.id = XToolCheckerBtnManager.GetButtonName(cn._spaceSpan, i, "_00");
						link.parentNode.insertBefore(spaceBR_,link.nextSibling);
					}
				}
			}
		}
		
	},
	
	AddButtonsToSeohammer : function (doc)
	{
		var cn = XToolCheckerConst;
		var hrefL = XToolCheckerBtnManager.GetLocation(doc);
		var domain = XToolCheckerBtnManager.GetDomainName(hrefL);
		var res = false;
		if ((hrefL.toLowerCase().indexOf(cn._seohammer) != -1) || (hrefL.toLowerCase().indexOf(cn._seohammer1) != -1))
		{
			var as = doc.getElementsByTagName("a");
			for(var j = 0; j < as.length; j++)
			{
				if (as[j].id.indexOf("cphMain_links") != -1)
				{	
					var link = as[j];
					if  (link.href.indexOf("http://") == -1) 
						continue;
					if ((link.href.indexOf(cn._seohammer) != -1) || (link.href.indexOf(cn._seohammer1) != -1))
						continue;
				
					if (XToolCheckerBtnManager.isVisible(link))
					{
						
						var obj = link;
						var href = XToolCheckerBtnManager.PrepareRawLink(link.href);
						var url2 = href;
						var url = XToolCheckerBtnManager.PrepareLink(href);
						var domainUrl2 = XToolCheckerBtnManager.GetDomainFromUrl(href);
						var domainUrl = XToolCheckerBtnManager.PrepareLink(domainUrl2);
						var urlTitle = XToolCheckerBtnManager.GetLinkTitleSeoHammer(link);
						res = true;
						XToolCheckerBtnManager.InsertButtons(false, obj, url, urlTitle, j, doc, url2, false);

						XToolCheckerBtnManager.AddXTXTD(url, domainUrl, doc, obj, j, url2);
						
						var spaceBR_ = doc.createElement("BR");
						spaceBR_.id = cn._spaceSpan + j + "_00";
						obj.parentNode.insertBefore(spaceBR_,obj.nextSibling);	
						
						XToolCheckerBtnManager.InsertLinkMarker(link, doc, j);
						
					}
					else 
						XToolCheckerBtnManager.DebugMsg("invisible");
				}
			}
		}
		return res;
	},
	
	AddButtonsToMegaindex : function (doc)
	{
		var cn = XToolCheckerConst;
		var hrefL = XToolCheckerBtnManager.GetLocation(doc);
		var domain = XToolCheckerBtnManager.GetDomainName(hrefL);
		var res = false;
		if (hrefL.toLowerCase().indexOf(cn._megaindex) != -1)
		{
			var tables = doc.getElementsByTagName("table");
			for(var j = 0; j < tables.length; j++)
			{
				if ((tables[j].className.indexOf("s0p0") != -1))
				{	
					if (XToolCheckerBtnManager.isVisible(tables[j]))
					{
						var trs = tables[j].getElementsByTagName("TR");
						for(var i = 0; i < trs.length; i++)
						{
							var links = trs[i].getElementsByTagName("A");
							if ((links) && (links.length > 0))
							{
								var link = links[0];

								if (link.target == "_blank")
								{
									var urlTitle = "";
									var inps = trs[i].getElementsByTagName("INPUT");
									if ((inps) && (inps.length > 0))
									{
										urlTitle = inps[0].value;
										urlTitle = urlTitle.replace("#a#", "");
										urlTitle = urlTitle.replace("#/a#", "");
									}
									var obj = link;
									var href = link.href;
									var url2 = href;
									var url = XToolCheckerBtnManager.PrepareLink(href);
									var domainUrl2 = XToolCheckerBtnManager.GetDomainFromUrl(href);
									var domainUrl = XToolCheckerBtnManager.PrepareLink(domainUrl2);
									res = true;
									XToolCheckerBtnManager.InsertButtons(false, obj, url, urlTitle, i, doc, url2, false);
							
									XToolCheckerBtnManager.AddXTXTD(url, domainUrl, doc, obj, i, url2);
									
									var spaceBR_ = doc.createElement("BR");
									spaceBR_.id = cn._spaceSpan + i + "_00";
									obj.parentNode.insertBefore(spaceBR_,obj.nextSibling);	
									
									XToolCheckerBtnManager.InsertLinkMarker(link, doc, i);
								
									
								}
							}

						}
					}
					else 
						XToolCheckerBtnManager.DebugMsg("invisible");
				}
			}
		}
		return res;
	},
	
	AddButtonsToSolomono : function (doc)
	{
		var cn = XToolCheckerConst;
		var hrefL = XToolCheckerBtnManager.GetLocation(doc);
		var domain = XToolCheckerBtnManager.GetDomainName(hrefL);
		var res = false;
		if (hrefL.toLowerCase().indexOf(cn._solomono) != -1)
		{
			var trs = doc.getElementsByTagName("tr");
			for(var i = 0; i < trs.length; i++)
			{
				if (trs[i].className == "lutr")
				{	
					if (XToolCheckerBtnManager.isVisible(trs[i]))
					{
					
						var links = trs[i].getElementsByTagName("A");
						if ((links) && (links.length > 0))
						{
							var link = links[0];
							if ((link.className != '') && (links.length > 1))
							{
								link = links[1];
							}

							if ((link.target == "_blank") && (link.className == ''))
							{
								var urlTitle = "";
						
								var obj = link.parentNode.parentNode;
								var href = link.href;
								var url2 = href;
								var url = XToolCheckerBtnManager.PrepareLink(href);
								var domainUrl2 = XToolCheckerBtnManager.GetDomainFromUrl(href);
								var domainUrl = XToolCheckerBtnManager.PrepareLink(domainUrl2);
								res = true;
								XToolCheckerBtnManager.InsertButtons(false, obj, url, urlTitle, i, doc, url2, true, true);
								XToolCheckerBtnManager.AddXTXTD(url, domainUrl, doc, obj, i, url2);
								
								var spaceBR_ = doc.createElement("BR");
								spaceBR_.id = cn._spaceSpan + i + "_00";
								obj.parentNode.insertBefore(spaceBR_,obj.nextSibling);	
								
								XToolCheckerBtnManager.InsertLinkMarker(link, doc, i);
							
								
							}
						

						}
					}
					else 
						XToolCheckerBtnManager.DebugMsg("invisible");
				}
				else
				if (trs[i].className == "s")
				{	
				if (XToolCheckerBtnManager.isVisible(trs[i]))
					{
					
						var links = trs[i].getElementsByTagName("A");
						if ((links) && (links.length > 0))
						{
							var link = links[0];

							if (link.target == "_blank")
							{
								var urlTitle = "";
	
								var obj = link;
								var href = link.href;
								var url2 = href;
								var url = XToolCheckerBtnManager.PrepareLink(href);
								var domainUrl2 = XToolCheckerBtnManager.GetDomainFromUrl(href);
								var domainUrl = XToolCheckerBtnManager.PrepareLink(domainUrl2);
								res = true;
								XToolCheckerBtnManager.InsertButtons(false, obj, url, urlTitle, i, doc, url2, true, true);
					
								XToolCheckerBtnManager.AddXTXTD(url, domainUrl, doc, obj, i, url2);
								
								var spaceBR_ = doc.createElement("BR");
								spaceBR_.id = cn._spaceSpan + i + "_00";
								obj.parentNode.insertBefore(spaceBR_,obj.nextSibling);	
								
								XToolCheckerBtnManager.InsertLinkMarker(link, doc, i);
							
								
							}
						

						}
					}
					else 
						XToolCheckerBtnManager.DebugMsg("invisible");
				}
			}
		}
		return res;
	},
	

	
	AddButtonsToWebEffector : function (doc)
	{
		var cn = XToolCheckerConst;
		var hrefL = XToolCheckerBtnManager.GetLocation(doc);
		var domain = XToolCheckerBtnManager.GetDomainName(hrefL);
		var res = false;
		if (hrefL.toLowerCase().indexOf(cn._webEffector) != -1)
		{
			var tables = doc.getElementsByTagName("table");
			for(var j = 0; j < tables.length; j++)
			{
				if ((tables[j].className.indexOf("data_table") != -1))
				{	
					if (XToolCheckerBtnManager.isVisible(tables[j]))
					{
						var trs = tables[j].getElementsByTagName("TR");
						for(var i = 0; i < trs.length; i++)
						{
							var links = trs[i].getElementsByTagName("A");
							if ((links) && (links.length > 1))
							{
								if (links[1].href != links[0].href)
									continue;
								var link = links[1];

								var titleLink = links[0];
								if (link.target == "_blank")
								{
									var obj = link.parentNode;
									if (obj)
										obj = obj.parentNode;
									if (obj)
									{
										var href = link.href;
										var url2 = href;
										var url = XToolCheckerBtnManager.PrepareLink(href);
										var domainUrl2 = XToolCheckerBtnManager.GetDomainFromUrl(href);
										var domainUrl = XToolCheckerBtnManager.PrepareLink(domainUrl2);
										var urlTitle = titleLink.textContent;
										res = true;
										XToolCheckerBtnManager.InsertButtons(false, obj, url, urlTitle, i, doc, url2, false);
								
										
										XToolCheckerBtnManager.AddXTXTD(url, domainUrl, doc, obj, i, url2);
										
										var spaceBR_ = doc.createElement("BR");
									    spaceBR_.id = XToolCheckerBtnManager.GetButtonName(cn._spaceSpan, i, "_00");
										obj.parentNode.insertBefore(spaceBR_,obj.nextSibling);	
										
										XToolCheckerBtnManager.InsertLinkMarker(link, doc, i);
									}
									
								}
							}

						}
					}
					else 
						XToolCheckerBtnManager.DebugMsg("invisible");
				}
			}
		}
		return res;
	},
	
	AddButtonsToGogetlinks : function (doc)
	{
		var cn = XToolCheckerConst;
		var hrefL = XToolCheckerBtnManager.GetLocation(doc);
		var domain = XToolCheckerBtnManager.GetDomainName(hrefL);
		if (hrefL.toLowerCase().indexOf(cn._gogetlinksSearch) != -1)
		{
			var tables = doc.getElementsByTagName("table");
			for(var j = 0; j < tables.length; j++)
			{
				if ((tables[j].className == "table_class" || tables[j].className == "table" ) && (tables[j].id == "table_content"))
				{
					var trs = tables[j].getElementsByTagName("TR");
					for(var i = 0; i < trs.length; i++)
					{
						var links = trs[i].getElementsByTagName("A");
						if ((links) && (links.length > 0))
						{
							var link = links[0];
							if (link.target != "_blank" && (links.length > 1)) {
								link = links[1];
							}
							if (link.target == "_blank")
							{
								var href = XToolCheckerBtnManager.PrepareRawLink(link.href);
								var url2 = href;
								var url = XToolCheckerBtnManager.PrepareLink(href);
								var domainUrl2 = XToolCheckerBtnManager.GetDomainFromUrl(href);
								var domainUrl = XToolCheckerBtnManager.PrepareLink(domainUrl2);
								var urlTitle = "";
								XToolCheckerBtnManager.InsertButtons(false, link, url, urlTitle, i, doc, url2, true);
														
								
								var spaceBR_ = doc.createElement("BR");
								spaceBR_.id = cn._spaceSpan + i + "_00";
								link.parentNode.insertBefore(spaceBR_,link.nextSibling);	
									
								XToolCheckerBtnManager.AddXTXTD(url, domainUrl, doc, link, i, url2);
								XToolCheckerBtnManager.InsertLinkMarker(link, doc, i);
								
							}
						}
					}
				}
			}
		}
		else
		
		//<form name="table_form"/
		if (hrefL.toLowerCase().indexOf(cn._gogetlinksPost) != -1)
		{
			var tables = doc.getElementsByTagName("form");
			for(var j = 0; j < tables.length; j++)
			{
				if (tables[j].name == "table_form")
				{
					var trs = tables[j].getElementsByTagName("TR");
					for(var i = 0; i < trs.length; i++)
					{
						var links = trs[i].getElementsByTagName("A");
						if ((links) && (links.length > 0))
						{
							var link = links[0];
							if (link.target == "_blank")
							{
								var href = XToolCheckerBtnManager.PrepareRawLink(link.href);
								var url2 = href;
								var url = XToolCheckerBtnManager.PrepareLink(href);
								var domainUrl2 = XToolCheckerBtnManager.GetDomainFromUrl(href);
								var domainUrl = XToolCheckerBtnManager.PrepareLink(domainUrl2);
								var urlTitle = "";
								XToolCheckerBtnManager.InsertButtons(false, link, url, urlTitle, i, doc, url2, true);
						
								var spaceBR_ = doc.createElement("BR");
								spaceBR_.id = cn._spaceSpan + i + "_00";
								link.parentNode.insertBefore(spaceBR_,link.nextSibling);	
									
								XToolCheckerBtnManager.AddXTXTD(url, domainUrl, doc, link, i, url2);
								XToolCheckerBtnManager.InsertLinkMarker(link, doc, i);
								
							}
						}
					}
				}
			}
		}
		
	},
	
	AddButtonsToMainlink : function (doc)
	{
		var cn = XToolCheckerConst;
		var hrefL = XToolCheckerBtnManager.GetLocation(doc);
		var domain = XToolCheckerBtnManager.GetDomainName(hrefL);
		var second = (hrefL.toLowerCase().indexOf(cn._mainlinkSecondPart) != -1);
		
		if ((hrefL.toLowerCase().indexOf(cn._mainlinkPart) != -1) || second)
		{
			var tables = doc.getElementsByTagName("table");
			for(var j = 0; j < tables.length; j++)
			{
				if (tables[j].className == "main-table")
				{

					var links = tables[j].getElementsByTagName("A");
					for(var i = 0; i < links.length; i++)
					{
						var link = links[i];
						if ((link.id) && (((link.id.indexOf("_url") != -1) || (link.id.indexOf("_www_") != -1) ) && (link.target == "_blank")))
						{
							
							var href = XToolCheckerBtnManager.PrepareRawLink(link.href);
							
							var url2 = href;
							var url = XToolCheckerBtnManager.PrepareLink(href);
							var domainUrl2 = XToolCheckerBtnManager.GetDomainFromUrl(href);
							var domainUrl = XToolCheckerBtnManager.PrepareLink(domainUrl2);
							var urlTitle = XToolCheckerBtnManager.GetLinkTitleMainlink(link);
							if (!urlTitle) urlTitle = "";
							var prjUrl = "";
							if (this.sts._show_pos) 
							{
								prjUrl = XToolCheckerBtnManager.GetPrjUrlMainlink(link);
								
							}
							XToolCheckerBtnManager.InsertButtons(false, link, url, urlTitle, i, doc, url2, second, false, false, prjUrl);							

							
							var spaceBR_ = doc.createElement("BR");
							spaceBR_.id = XToolCheckerBtnManager.GetButtonName(cn._spaceSpan, i, "_00");
							link.parentNode.insertBefore(spaceBR_,link.nextSibling);	
								
							XToolCheckerBtnManager.AddXTXTD(url, domainUrl, doc, link, i, url2);
							XToolCheckerBtnManager.InsertLinkMarker(link, doc, i);
							
						}
					}
						
				}
			}
		}
		else
			
		if (hrefL.toLowerCase().indexOf(cn._mainlinkSeoPart) != -1)
		{
			var items = doc.getElementsByTagName("mat-row");
			for(var j = 0; j < items.length; j++)
			{
				if (items[j].className.indexOf("item-row") !=-1)
				{

					var links = items[j].getElementsByTagName("A");
					//for(var i = 0; i < links.length; i++)
					{
						var link = links[0];
						if ((link.href.indexOf(link.innerText.replace('...',''))!=-1)  && (link.target == "_blank"))
						{
							
							var href = XToolCheckerBtnManager.PrepareRawLink(link.href);
							
							var url2 = href;
							var url = XToolCheckerBtnManager.PrepareLink(href);
							var domainUrl2 = XToolCheckerBtnManager.GetDomainFromUrl(href);
							var domainUrl = XToolCheckerBtnManager.PrepareLink(domainUrl2);
							var urlTitle = "";//XToolCheckerBtnManager.GetLinkTitleMainlink(link);
							
							XToolCheckerBtnManager.InsertButtons(false, link, url, urlTitle, j, doc, url2, second, false, false, prjUrl);							

							
							var spaceBR_ = doc.createElement("BR");
							spaceBR_.id = XToolCheckerBtnManager.GetButtonName(cn._spaceSpan, j, "_00");
							link.parentNode.insertBefore(spaceBR_,link.nextSibling);	
								
							XToolCheckerBtnManager.AddXTXTD(url, domainUrl, doc, link, j, url2);
							var spaceBR1_ = doc.createElement("BR");
							spaceBR1_.id = XToolCheckerBtnManager.GetButtonName(cn._spaceSpan, j, "_01");
							link.parentNode.insertBefore(spaceBR1_,link.nextSibling);	
							XToolCheckerBtnManager.InsertLinkMarker(link, doc, j);
							
						}
					}
						
				}
			}
		}
	},
	
	
	GetPrjUrlMainlink : function (link)
	{
		try
		{
			var tmpObj = link.parentNode;
			tmpObj = tmpObj.parentNode;
			tmpObj = tmpObj.parentNode;
			tmpObj = tmpObj.parentNode;
			tmpObj = tmpObj.parentNode;
			tmpObj = tmpObj.nextSibling;
			var spans = tmpObj.getElementsByTagName("SPAN");
			if ((spans) && (spans.length > 0))
			{
				if (spans[0].className == "text-link")
				{
					var res = spans[0].innerHTML.match(/<a [^>]*href=\"([^>\"]*)\"[^>]*>/i);
					if (res && (res.length > 1))
						return res[1];
					else 
						return "";
				}
			}
		}
		catch(e)
		{
			XToolCheckerBtnManager.DebugMsg(e);
		}
	},
	
	
	SetHidden : function(ownerID, value, alt, id, title)
	{
		this._hiddenInfos[ownerID] = {};
		var info = this._hiddenInfos[ownerID];
		
		info.value = value;
		info.alt = alt;
		info.name = id;
		info.id = id;
		info.title = title;
		
	},
	
	GetHidden : function(ownerID)
	{
		var info = this._hiddenInfos[ownerID];
		return info;
	},
	
	AddXTXTD : function(url, domainUrl, doc, link, i, url2, skip_xtd, alternative)
	{
		var cn = XToolCheckerConst;
		if (url.indexOf("/") != -1)
		{
			var x = doc.createElement("INPUT");
			x.type = "button";
			x.value = 'XT';
			x.name = XToolCheckerBtnManager.GetButtonName(cn._buttonPrefix, i, "");
			x.id = x.name;
			x.className = cn._buttonPrefix;

													
			x.addEventListener("click", XToolCheckerBtnManager.OnUpdateClick, false);
			link.parentNode.insertBefore(x,link.nextSibling);	
			XTContentTools.LoadFromCache(url, x);
			XToolCheckerBtnManager.SetHidden(x.id, url, url2, XToolCheckerBtnManager.GetButtonName(cn._hiddenLink, i, ""), "");
			
			if (alternative)
				return;
		}
		if (!skip_xtd)
		{
			var x_ = doc.createElement("INPUT");
			x_.type = "button";
			x_.value = 'XTD';
			x_.name = XToolCheckerBtnManager.GetButtonName(cn._buttonXTDPrefix, i, "_0");
			x_.id = x_.name;
			x_.className = cn._buttonXTDPrefix;
			
			
			x_.addEventListener("click", XToolCheckerBtnManager.OnUpdateClick, false);
			link.parentNode.insertBefore(x_,link.nextSibling);	
			XTContentTools.LoadFromCache(domainUrl, x_);
			XToolCheckerBtnManager.SetHidden(x_.id, domainUrl, url2, XToolCheckerBtnManager.GetButtonName(cn._hiddenLink, i, "_0"), "");
			
		}
	},
	
	InsertINY : function (element, url, title, index, doc, url2)
	{
		if ((!this.sts._show_iny) || (this.sts._inyQueryTypes.length == 0))
			return;
		{ 
			var domain2 = XToolCheckerBtnManager.GetDomainFromUrl(url2);
			var domain = XToolCheckerBtnManager.PrepareLink(domain2);
			var tmp = XToolCheckerBtnManager.PrepareLink(url);
			//if (tmp.indexOf("/") == -1)
			{
				XToolCheckerBtnManager.InsertButtonAfterElement(XToolCheckerConst._buttonINYPrefix, "inY", domain, title, index, doc, element, url2);		
			}
		}	
	},
	
	InsertING : function (element, url, title, index, doc, url2)
	{
		if ((!this.sts._show_ing) || (this.sts._ingQueryTypes.length == 0))
			return;
		{ 
			var domain2 = XToolCheckerBtnManager.GetDomainFromUrl(url2);
			var domain = XToolCheckerBtnManager.PrepareLink(domain2);
			var tmp = XToolCheckerBtnManager.PrepareLink(url);
			//if (tmp.indexOf("/") == -1)
			{
				XToolCheckerBtnManager.InsertButtonAfterElement(XToolCheckerConst._buttonINGPrefix, "inG", domain, title, index, doc, element, url2);		
			}
		}	
	},	

	InsertGBL : function (element, url, title, index, doc, url2)
	{
		if (!this.sts._show_gbl)
			return;
		{ 
			var domain2 = XToolCheckerBtnManager.GetDomainFromUrl(url2);
			var domain = XToolCheckerBtnManager.PrepareLink(domain2);
			XToolCheckerBtnManager.InsertButtonAfterElement(XToolCheckerConst._buttonGBLPrefix, "GBL", domain, title, index, doc, element, domain);		
		}	
	},
	
	InsertYC : function (element, url, title, index, doc, url2)
	{
		if (!XToolCheckerBtnManager.IsShowYC())
			return;
		{ 
			var domain2 = XToolCheckerBtnManager.GetDomainFromUrl(url2);
			var domain = XToolCheckerBtnManager.PrepareLink(domain2);
			XToolCheckerBtnManager.InsertButtonAfterElement(XToolCheckerConst._buttonYCPrefix, "YC", url, "", index, doc, element, url2);		
		}	
	},	
	
	InsertGP : function (element, url, title, index, doc, url2)
	{
		if ((!this.sts._show_gp) || (this.sts._gpQueryTypes.length == 0))
			return;
		{ 
			var titleG = title.replace(/\"\&\&\"/g, "\"\+\"");
			var domain2 = XToolCheckerBtnManager.GetDomainFromUrl(url2);
			var domain = XToolCheckerBtnManager.PrepareLink(domain2);
			//if (url.indexOf("/") == -1)
			{
				XToolCheckerBtnManager.InsertButtonAfterElement(XToolCheckerConst._buttonGPPrefix, "GP", url, titleG, index, doc, element, url2);		
			}
		}	
	},
	
	InsertGC : function (element, url, title, index, doc, url2)
	{
		if ((!this.sts._show_gc) || (this.sts._gcQueryTypes.length == 0))
			return;
		{ 
			var titleG = title.replace(/\"\&\&\"/g, "\"\+\"");
			var domain2 = XToolCheckerBtnManager.GetDomainFromUrl(url2);
			var domain = XToolCheckerBtnManager.PrepareLink(domain2);
			//if (url.indexOf("/") == -1)
			{
				XToolCheckerBtnManager.InsertButtonAfterElement(XToolCheckerConst._buttonGCPrefix, "GC", url, titleG, index, doc, element, url2);		
			}
		}	
	},
	
	InsertSQI : function (element, url, title, index, doc, url2)
	{
		if (!this.sts._show_sqi)
			return;
		{ 
			var domain2 = XToolCheckerBtnManager.GetDomainFromUrl(url2);
			var domain = XToolCheckerBtnManager.PrepareLink(domain2);
			XToolCheckerBtnManager.InsertButtonAfterElement(XToolCheckerConst._buttonSQIPrefix, "SQI", domain, title, index, doc, element, domain2);	
		}	
	},
	
	InsertR : function (element, url, title, index, doc, url2)
	{
		if ((!this.sts._show_r) || ((this.sts._rQueryTypes.length == 0) || (this.sts._checkActionNames.length == 0)))
			return;
		{ 
			var tmp = XToolCheckerBtnManager.PrepareLink(url);

				XToolCheckerBtnManager.InsertButtonAfterElement(XToolCheckerConst._buttonRPrefix, "R", url, title, index, doc, element, url2);	
		}	
	},
	
	InsertRLV : function (element, url, title, index, doc, url2)
	{
		if ((!this.sts._show_rlv) || ((this.sts._rlvQueryTypes.length == 0) || (this.sts._checkActionNames.length == 0)))
			return;
		{ 
			var tmp = XToolCheckerBtnManager.PrepareLink(url);

				XToolCheckerBtnManager.InsertButtonAfterElement(XToolCheckerConst._buttonRLVPrefix, "RLV", url, title, index, doc, element, url2);	
		}	
	},
	
	InsertGL : function (element, url, title, index, doc, url2)
	{
	
		if ((!this.sts._show_gl) /*|| (this.sts._glQueryTypes.length == 0)*/)
			return;
		{ 
			var titleG = title.replace(/\"\&\&\"/g, "\"\+\"");
			var domain2 = XToolCheckerBtnManager.GetDomainFromUrl(url2);
			var domain = XToolCheckerBtnManager.PrepareLink(domain2);
			//if (url.indexOf("/") == -1)
			{
				XToolCheckerBtnManager.InsertButtonAfterElement(XToolCheckerConst._buttonGLPrefix, "GL", url, titleG, index, doc, element, url2);		
			}
		}	
	},
	

	InsertYap : function (element, url, title, index, doc, url2)
	{
		if (!XToolCheckerBtnManager.IsShowYap())
			return;
		{ 
			var btn = XToolCheckerBtnManager.InsertButtonAfterElement(XToolCheckerConst._buttonYapPrefix, "YP", url, "", index, doc, element, url2);	
			//XToolCheckerBtnManager.LoadFromCacheYP(url, btn, false);			
		}	
	},	
	
	InsertYal : function (element, url, title, index, doc, url2)
	{
		if (!XToolCheckerBtnManager.IsShowYal())
			return;
		{ 
			/*var domain2 = XToolChecker.GetDomainFromUrl(url2);
			var domain = XToolChecker.PrepareLink(domain2);*/
			title = title.replace(/http\:\/\//g, "http ");
			title = title.replace(/https\:\/\//g, "https ");
			var btn = XToolCheckerBtnManager.InsertButtonAfterElement(XToolCheckerConst._buttonYalPrefix, "YL", url, title, index, doc, element, url2);	
			//XToolCheckerBtnManager.LoadFromCacheYL(url, title, btn, false);
		}	
	},	
	
	InsertTrf : function (/*prefix, title,*/ url, urlTitle, index, doc, element, url2)
	{
		if (this.sts._show_trf)
		{ 
			var domain2 = XToolCheckerBtnManager.GetDomainFromUrl(url2);
			var domain = XToolCheckerBtnManager.PrepareLink(domain2);
			//if (url.indexOf("/") == -1)
			{
				
				XToolCheckerBtnManager.InsertButtonAfterElement(XToolCheckerConst._buttonTrfPrefix, "TrF", domain, urlTitle, index, doc, element, url2);		
			}
		}	
	},

	AppendBlock : function (doc, prefix, name, index, parent)
	{
		var cn = XToolCheckerConst;
		let infoBlock = doc.createElement("SPAN");
		infoBlock.id = prefix + name + index;
		infoBlock.className = cn._infoBlockPrefix;
		infoBlock.textContent = " ";
		infoBlock.style.visibility= 'hidden';
		parent.appendChild(infoBlock);
	},

	InsertInfoBlockAfterElement: function (index, doc, element)
	{
		var cn = XToolCheckerConst;
		if(doc)
		{
			var fragment = doc.createDocumentFragment();
			{
				var block = doc.createElement("DIV");
				block.style = "margin: 4px 4px 4px 0; display: block;";// flex-wrap: wrap; justify-content: left;";
				block.id = XToolCheckerBtnManager.GetButtonName(cn._infoBlockPrefix, index, "");
				XToolCheckerBtnManager.AppendBlock(doc, cn._infoBlockPrefix, 'xpr', index, block);
				XToolCheckerBtnManager.AppendBlock(doc, cn._infoBlockPrefix, 'Lin', index, block);
				XToolCheckerBtnManager.AppendBlock(doc, cn._infoBlockPrefix, 'Lout', index, block);
				XToolCheckerBtnManager.AppendBlock(doc, cn._infoBlockPrefix, 'TF', index, block);
				XToolCheckerBtnManager.AppendBlock(doc, cn._infoBlockPrefix, 'CF', index, block);
				XToolCheckerBtnManager.AppendBlock(doc, cn._infoBlockPrefix, 'RY', index, block);
				XToolCheckerBtnManager.AppendBlock(doc, cn._infoBlockPrefix, 'RG', index, block);
				XToolCheckerBtnManager.AppendBlock(doc, cn._infoBlockPrefix, 'sz', index, block);
				//Lin: 21886Lout: 0TF: 29CF: 37RY: 42988RG: 1368244 sz: 2032

				if (fragment.childNodes.length > 0)
					fragment.insertBefore(block, fragment.childNodes[0]);
				else
					fragment.appendChild(block);

		
			}
			if (element.nextSibling)
				element.parentNode.insertBefore(fragment, element.nextSibling);
			else
				element.parentNode.appendChild(fragment);

		}
	},
	
	InsertButtonAfterElement : function (prefix, title, url, urlTitle, index, doc, element, url2)
	{
	
		var cn = XToolCheckerConst;
		if(doc)
		{

			var fragment = doc.createDocumentFragment();
			
			var x = doc.createElement("INPUT");
			x.type = "button";
			x.value = title;
			//x.title = urlTitle;
			x.name = XToolCheckerBtnManager.GetButtonName(prefix, index, "");
			x.id = x.name;
			x.className = prefix;
			if (prefix == cn._buttonBCPrefix)
			{
				x.style.fontSize = "7pt";
				x.style.position = "relative";
				x.style.top = "-1px";
				
				{
					var space = doc.createElement("SPAN");
					space.id = XToolCheckerBtnManager.GetButtonName(cn._infoBCPrefix, index, "");
					space.textContent = "";
					space.title = "Размер текста";
					//space.style.margin = "auto";
					space.style.padding = "auto";
					if (fragment.childNodes.length > 0)
						//XToolCheckerBtnManager.InsertBefore(space, fragment.childNodes[0], fragment);
						fragment.insertBefore(space, fragment.childNodes[0]);
					else
						//XToolCheckerBtnManager.AppendChild(space, fragment);
						fragment.appendChild(space);
					//element.parentNode.insertBefore(space, element.nextSibling);	
				}

			}
			else if  (prefix == cn._buttonTrfPrefix)
			{
				{
					var img = doc.createElement("IMG");
					img.id = cn._infoBCPrefix + index;
					img.src = "about:blank";
					img.className = cn._infoBCPrefix;
					img.style.display = "none";
					//element.parentNode.insertBefore(img, element.nextSibling);	
					fragment.insertBefore(img, fragment.childNodes[0]);
					/*var img = doc.createElement("SPAN");
					img.id = this._infoBCPrefix + index;
					img.style.backgroundImage = "";
					img.style.width="88px";
					img.style.height="31px";
					img.className = this._infoBCPrefix;
					img.style.display = "none";
					element.parentNode.insertBefore(img, element.nextSibling);*/
				}
	
			} /*
			else if (prefix == cn._buttonPOSPrefix)
			{
				x.style.width = "30px";
			}
			else
			{
				x.style.width = "22px";
			}
		*/
			x.addEventListener("click", XToolCheckerBtnManager.OnUpdateClick, false);
			if (fragment.childNodes.length > 0)
				//XToolCheckerBtnManager.InsertBefore(x, fragment.childNodes[0], fragment);
				fragment.insertBefore(x, fragment.childNodes[0]);
			else
				//XToolCheckerBtnManager.AppendChild(x, fragment);
				fragment.appendChild(x);
			//element.parentNode.insertBefore(x, element.nextSibling);	
			if (!url2) url2 = "";
			XToolCheckerBtnManager.SetHidden(x.id, url, url2, XToolCheckerBtnManager.GetButtonName(cn._hiddenLink, title, index), urlTitle);
		/*	var x1 = doc.createElement("INPUT");
			x1.type = "hidden";
			x1.value = url;
			if (url2)
				x1.alt = url2;
			x1.name = XToolCheckerBtnManager.GetButtonName(cn._hiddenLink, title, index);
			x1.id = x1.name;
			x1.title = urlTitle;
			if (fragment.childNodes.length > 0)
				//XToolCheckerBtnManager.InsertBefore(x1, fragment.childNodes[0], fragment);
				fragment.insertBefore(x1, fragment.childNodes[0]);
			else
				//XToolCheckerBtnManager.AppendChild(x1, fragment);
				fragment.appendChild(x1);*/
			//element.parentNode.insertBefore(x1, element.nextSibling);	
			
			/*var space = doc.createElement("SPAN");
			space.id = XToolCheckerBtnManager.GetButtonName(cn._spaceSpan, title, index);
			space.textContent = " ";
			space.style.margin = "auto";
			space.style.padding = "auto";
			if (fragment.childNodes.length > 0)
				fragment.insertBefore(space, fragment.childNodes[0]);
				//XToolCheckerBtnManager.InsertBefore(space, fragment.childNodes[0], fragment);
			else
				fragment.appendChild(space);
				//XToolCheckerBtnManager.AppendChild(space, fragment);*/
			if (element.nextSibling)
				element.parentNode.insertBefore(fragment, element.nextSibling);
				//XToolCheckerBtnManager.InsertBefore(fragment, element.nextSibling, element.parentNode);
			else
				element.parentNode.appendChild(fragment);
				//XToolCheckerBtnManager.AppendChild(fragment, element.parentNode);
			//element.parentNode.insertBefore(space, element.nextSibling);
		}
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
			result = XToolCheckerBtnManager.DecodeRusUrl(result);
		result = XToolCheckerBtnManager.DomainToLower(result);
		return result;
	},

	PrepareLink2 : function(href, skipSlashCut)
	{
		var result = href;
		
		if (result.toLowerCase().indexOf('http://') == 0)
		{
			result = result.substring(7);
		}
		if ((!skipSlashCut) && ((result[result.length-1] == '/') && (result.indexOf('/') == result.length-1)))
		{
			result = result.substring(0, result.length - 1);
		}
		result = XToolCheckerBtnManager.DomainToLower(result);
		result = XToolCheckerBtnManager.DecodeRusUrl(result);
		return result;
	},	
	
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
	
	GetDomainFromUrl : function(href)
	{
		var start = href.indexOf("://");
		if (start != -1) 
		{
			start += 4;
			var endOfDomain = href.indexOf("/", start);
			if (endOfDomain == -1)
			{
				return 	XToolCheckerBtnManager.DecodeRusUrl(href).toLowerCase();
			}
			else
			{
				return XToolCheckerBtnManager.DecodeRusUrl(href.substring(0, endOfDomain)).toLowerCase();
			}
		
		}
		else
		{
			return href.toLowerCase();
		}
	},

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
	
	EncodeRusUrl2 : function(href)
	{
		try {
			var http = false;
			var https = false;
			if (href.toLowerCase().indexOf('http://') == 0)
			{
				href = href.substring(7);
				http = true;
			}
			if (href.toLowerCase().indexOf('https://') == 0)
			{
				href = href.substring(8);
				https = true;
			}
			if (href.match(/[а-яёЁ]/i))
			{
				var parts = href.split("/");
				if (parts.length > 0)
				{
					parts[0] = punycode.ToASCII(parts[0]);
					href = parts.join("/");
				}
			}
			if (http)
				href =  'http://' + href;
			if (https)
				href =  'https://' + href;
		}
		catch(e)
		{
			console.log("EncodeRusUrl2 error: " + e);
		}
		
		return href;
	},
	
	EncodeRusUrl : function(href)
	{
	try {
			if (href.match(/[а-яёЁ]/i))
			{
				var parts = href.split("/");
				if (parts.length > 0)
				{
					parts[0] = punycode.ToASCII(parts[0]);
					href = parts.join("/");
				}
			}
			var tmp = decodeURIComponent(href);
			if ((tmp.indexOf(" ") == -1) && (tmp.indexOf("'") == -1) && (tmp.indexOf("\"") == -1) &&
				(tmp.indexOf("“") == -1) && (tmp.indexOf("”") == -1))
				href = tmp;
		}
		catch(e)
		{
			console.log("EncodeRusUrl error: " + e);
		}
		
		return href;
	},
	
	
	InsertLinkMarker : function(link, doc, index, url)
	{
		var cn = XToolCheckerConst;
		var x = doc.createElement("INPUT");
		x.type = "hidden";
		x.value = 'marker';
		if (!url)
			url = "";
		x.alt = url;
		x.name = XToolCheckerBtnManager.GetButtonName(cn._markerPrefix, index, "");
		x.id = x.name;
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
	},
	
	
	MarkLinks : function(event)
	{
		var cn = XToolCheckerConst;
		if (!event)
		{		
			// при загрузке страницы
			if ((!this.sts._mark_on_start) && (!this.sts._mark_gbl_on_start))
				return;
		}
		else
		{
			// по кнопке
		}
		var doc = document;
		if (doc)
		{
			this.sts._currentQueryIndex = -1;
			var buttons = doc.getElementsByTagName("INPUT");
			
				
			var resultButtons = [];
			for(var i = 0; i < buttons.length; i++)
			{
				if ((buttons[i].type == 'hidden') && (buttons[i].name.indexOf(cn._markerPrefix) != -1))
				{
					
					resultButtons.push(buttons[i]);
					
				}
			}
			try{
			if (resultButtons.length > 0)
			{
				if ((event) || ((!event) && (this.sts._mark_on_start)))
				{
					for(var i = 0; i < resultButtons.length; i++)
					{
						var href = resultButtons[i].alt;
						var link = resultButtons[i].previousSibling;
						if ((href == "") && (!(link === undefined)))
						{
							href = link.href;
						}
						if (href != "")
						{
							for (var j = 0; j < this.sts._stopWordsList.length; j++)
							{
								var needMark = false;
								var stopWord = this.sts._stopWordsList[j];
								if ((stopWord.indexOf("*") != -1) || (stopWord.indexOf("~") != -1) || (stopWord.indexOf(" ") != -1) ||
									(stopWord.indexOf("[") != -1) || (stopWord.indexOf("]") != -1) )
								{
									var words = stopWord.split(" ");
									var skip = false;
									for (var l = 0; l < words.length; l++)
									{
										var inverse = false;
										
										var word = XToolCheckerBtnManager.ReplaceForMark(words[l].trim());
									
										if (word == "")
											continue;
										word = word.replace(/\*/g, "\.\*");
										
										if (word.indexOf("~") == 0)
										{
											inverse = true;
											word = word.replace("~", "");
										}
										
										word = word.replace(/([^0-9A-Za-zА-Яа-я])\[/g, "$1");
										word = word.replace(/\[([^0-9A-Za-zА-Яа-я])/g, "$1");
										word = word.replace(/([^0-9A-Za-zА-Яа-я])\]/g, "$1");
										word = word.replace(/\]([^0-9A-Za-zА-Яа-я])/g, "$1");
										word = word.replace(/\[/g, "###bracket###");
										word = word.replace(/\]/g, "###bracket###");
										word = word.replace(/\#\#\#bracket\#\#\#/g, "\[\^0\-9A\-Za\-zА\-Яа\-я\]\+");
										try 
										{
											var expr = new RegExp(word, 'ig');
											if (expr.test(href))
											{
												if (inverse)
												{
													skip = true;
													needMark = false;
													break;
												}
												else
												{
													needMark = true;
												}
											}
										}
										catch (e) {};
									}
								}
								else if (href.indexOf(stopWord) != -1)
								{
									needMark = true;
								}
								if ((needMark) || (skip))
									break;
							}
							if (needMark)
							{
								link.style.backgroundColor = "#FFAAAA";
								if (this.sts._check_marked)
								{
									if ((XToolCheckerBtnManager.IsPageToCheck(resultButtons[i].ownerDocument)))
									{
										XToolCheckerBtnManager.SetCheckForButton(resultButtons[i]);
									}
								}
								//break;
							}
							
						}
					}
				}

				if ((event) || ((!event) && (this.sts._mark_gbl_on_start)))
				{
					for(var i = 0; i < resultButtons.length; i++)
					{
						var href = resultButtons[i].alt;
						var link = resultButtons[i].previousSibling;
						if ((href == "") && (!(link === undefined)))
						{
							href = link.href;
						}
						if (href != "")
						{
							var url = XToolCheckerBtnManager.PrepareRawLink(href);
							//var url = XToolCheckerBtnManager.PrepareLink(url);
							var domainUrl2 = XToolCheckerBtnManager.GetDomainFromUrl(url);
							var domain = XToolCheckerBtnManager.PrepareLink(domainUrl2);
							
							XTContentTools.CheckBlacklist(domain, link, resultButtons[i]);
						}
					}
				}
			}
			}catch(e) {}
		}
	},
	
	
		

	ReplaceForMark : function(res)
	{
		res = res.replace(/\(/g, "\\(");
		res = res.replace(/\)/g, "\\)");
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
	
	GetParentTR : function(elem)
	{
		var tmpObj = elem;
		while  ((tmpObj) && (tmpObj.nodeType == 1))
		{
			if (tmpObj.nodeName == "TR")
			{
				return tmpObj;
			}
			
			tmpObj = tmpObj.parentNode;
			
		}
		return 0;
	},

	
	OnUpdateClick : function(event)
	{
		//chrome.extension.sendMessage({action : "SingleButtonClick", info : XToolCheckerBtnManager.CopyButtonInfo(this) });
		browser.runtime.sendMessage({action : "SingleButtonClick", info : XToolCheckerBtnManager.CopyButtonInfo(this) });
	},
	
	GetLocation : function(doc)
	{
		if ((doc) && (doc.location))
			return doc.location.href;
		return "about:blank";
	},
	
	GetCheckCount : function ()
	{
		return 0;
		
	},
	
	
	GetLinkTitle4 : function (link)
	{
		try 
		{
		var obj = link.parentNode;
		obj = obj.parentNode;
		obj = obj.parentNode;
		obj = obj.previousSibling; 
		obj = obj.previousSibling;
		var res = obj.innerHTML;
		/*res = res.replace("<br>", " ");
		res = res.replace("<br/>", " ");
		res = res.replace("<br />", " ");
		res = res.replace("<BR>", " ");
		res = res.replace("<BR/>", " ");
		res = res.replace("<BR />", " ");*/
		//res = res.replace(/<[^>]*>/g, "");
		//res = res.replace(/^\s+|\s+$/g, '');
		//res = res.replace(/^\&nbsp\;|\&nbsp\;$/g, '');
		return XToolCheckerBtnManager.ExtPrepareTitle(res);			
		
		}
		catch(e)
		{
			return "";
		}
	},
	
	//*//
	GetTitleText : function (res)
	{
		//res = res.replace(/<[^>]*>/g, "");
		res = res.replace(/^\s+|\s+$/g, '');
		res = res.replace(/^\&nbsp\;|\&nbsp\;$/g, '');
		return XToolCheckerBtnManager.ExtPrepareTitle(res);
	},
	
	GetLinkTitle3 : function (link)
	{
		try 
		{
	
		var span = link.parentNode;
		if (span)
		{
			var res = span.innerHTML;
			var brPos = res.indexOf("<br>");
			if (brPos != -1)
			{
				res = res.substring(brPos + 4, res.length);
				//res = res.replace(/<[^>]*>/g, "");
				/*res = res.replace(/^\s+|\s+$/g, '');
				res = res.replace(/^\&nbsp\;|\&nbsp\;$/g, '');*/
				return XToolCheckerBtnManager.ExtPrepareTitle(res);
			}
			return "";
			
		}
		else
			return "";
		}
		catch(e)
		{
			return "";
		}
	},
	
	GetProjectURL3 : function (link)
	{
		try 
		{
	
			var span = link.parentNode;
			if (span)
			{
			
				var elems = span.getElementsByTagName("A");
				if ((elems) && (elems.length > 1))
					return XToolCheckerBtnManager.PrepareRawLink(elems[1].href);
				
			}
		
			return "";
		}
		catch(e)
		{
			return "";
		}
	},
	
	GetDateFromString : function (str)
	{
		try 
		{
			str = str.trim();
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
	
	SetFromCache : function (url, btn, rank, date, title, delta, scheme, lin, lout, spam, history, select)
	{
		var sts = this.sts;
		var cn = XToolCheckerConst;
		/*try
		{*/
			var colorScheme = 0;
			while (url.indexOf("\"") != -1)
			url = url.replace("\"", "&quot;");

			var valueDate = XToolCheckerBtnManager.GetDateFromString(date);
			
			var curDate = new Date();
			var mSecLeft = curDate.valueOf() - valueDate.valueOf();
			var daysLeft = mSecLeft / 86400000; //миллисекунд в дне 1000*60*60*24 
			if ((!sts._expireCache) || (daysLeft < sts._cacheExpireDays))
			{
				var schemeVal = 0;
				if (scheme == "")
					schemeVal = 0;
				else
				{
					try 
					{
						schemeVal = parseInt(scheme);
					}
					catch(e)
					{
					
					}
				}
				colorScheme = schemeVal;
				var isSpam= false;
				if (colorScheme == 3)
				{
					isSpam = true;
					
					var orange = false;
					try
					{
						var value = parseFloat(spam);
						if ((!isNaN(value)) && ( value >= sts._spamValue) && (btn.name != cn._mainButtonPrefix))
						{
							orange = true;	
						}
					}
					catch(e)
					{
					
					}
					if (orange)
						colorScheme = 3;	
					else
						colorScheme = 0;
				}
				if (rank != "")
				{
					var rank2 = rank;
					rank2 = rank2.replace("+", "");
					rank2 = rank2.replace("-", "");
					btn.alt = "cached_value";
					if (btn.name.indexOf(cn._buttonXTDPrefix) == 0)
					{
						btn.value = rank;
						if ((sts._use_auto_select_cache) && (select))
						{
							if (sts._useAutoSelect)
							{
								
								//if (btn.value.indexOf("D:") == 0)
								{
									try
									{
										var value = parseFloat(rank2);
										if ((!isNaN(value)) && ( value < sts._auto_select_max_value))
										{
											XToolCheckerBtnManager.SetCheckForButton(btn);
										}
									}
									catch(e)
									{
									
									}
								}
							 }
							if (sts._useAutoSelectXTDYellow)
							{
								if (colorScheme == 1)
									//if (btn.value.indexOf("D:") == 0)
									{
										try
										{
											var value = parseFloat(rank2);
											if ((!isNaN(value)) && ( value > 0))
											{
												XToolCheckerBtnManager.SetCheckForButton(btn);
											}
										}
										catch(e)
										{
										
										}
									}
							}
							if (sts._use_auto_select_spam)
							{
								try
								{
									var value = parseFloat(spam);
									if ((!isNaN(value)) && ( value >= sts._spamCheckValue) && (btn.name != sts._mainButtonPrefix))
									{
										XToolCheckerBtnManager.SetCheckForButton(btn);	
									}
								}
								catch(e)
								{
									
								}
							}
							if (sts._useAutoSelectXTNO)
							{
								if (rank == "NO")
								{
									XToolCheckerBtnManager.SetCheckForButton(btn);
								}
							}
						}
					}
					else 
					{
						btn.value = rank;
						if ((sts._use_auto_select_cache) && (select))
						{
							if (sts._useAutoSelectXT)
							{
								try
								{
									var value = parseFloat(rank2);
									if ((!isNaN(value)) && ( value < sts._auto_select_XT_max_value))
									{
										XToolCheckerBtnManager.SetCheckForButton(btn);
									}
								}
								catch(e)
								{
								
								}
									
							}
							 if (sts._useAutoSelectXTNO)
							{
								if (rank == "NO")
								{
									XToolCheckerBtnManager.SetCheckForButton(btn);
								}
							}
						}
					}
					if (rank == "NO")
					{
						btn.style.backgroundColor = XToolCheckerThreads._blueCacheColor[colorScheme];
					}
					else
					{
						btn.style.backgroundColor = XToolCheckerThreads._cacheColor[colorScheme];
					}	
					 if (sts._useColorXT)
					 {
						if (colorScheme == 0)
						{
							try
							{
								var value = parseFloat(rank2);
								if (btn.name.indexOf(cn._buttonXTDPrefix) == 0)
								{
									if ((!isNaN(value)) && ( value < sts._auto_select_max_value))
									{
										btn.style.backgroundColor = XToolCheckerThreads._customXTColor[0];
									}
								}
								else
								{
									if ((!isNaN(value)) && ( value < sts._auto_select_XT_max_value))
									{
										btn.style.backgroundColor = XToolCheckerThreads._customXTColor[0];
									}
								}
							}
							catch(e)
							{
							}
						}
						
						
					 }
				}
				if (delta.toLowerCase() == "nan")
					delta = "";
				if ((title != "") && (sts._showHint))
				{
					btn.title = title;
				}
		
				if ((sts._show_lin) && (lin != "NULL") && (lin != ""))
				{
					if (btn.title != "")
						btn.title += "		Lin: " + lin;
					else
						btn.title += "Lin: " + lin;
				}
				if ((sts._show_lout) && (lout != "NULL") && (lout != ""))
				{
					if (btn.title != "")
						btn.title += "		Lout: " + lout;
					else
						btn.title += "Lout: " + lout;
				}
				
				if (history != "")
				{
					if (btn.title != "")
						btn.title += "		XT hist: " + history;
					else
						btn.title += "XT hist: " + history;
				}
				if (isSpam)
				{
					btn.title = "Заспамленность ссылками (" + spam + ") ! | " + btn.title;
				}
				//XTContentTools.UpdateButtonText(btn, rank, delta + "", title);					
			}
	/*	}
		catch(e)
		{
			console.log("LoadFromCache: ", e);
		}*/
	},
	
	CheckInvert : function(event)
	{
		var cn = XToolCheckerConst;
		var count = 0;
		var doc = document;
		if (doc)
		{
			var checksRes = [];
			var hrefL = XToolCheckerBtnManager.GetLocation(doc);
			if (hrefL.toLowerCase().indexOf("sape.ru") != -1)
			{
				var checks = doc.getElementsByTagName("INPUT");
				
				for (var i = 0; i < checks.length; i++)
				{
					if (( checks[i].type == 'checkbox') && (checks[i].parentNode.className == "ra"))
					{
						checksRes.push(checks[i]);
						
					}
				}
			}
			else if (hrefL.toLowerCase().indexOf(cn._seopultPart) != -1)
			{
				var checks = doc.getElementsByTagName("INPUT");
				
				for (var i = 0; i < checks.length; i++)
				{
					if ((checks[i].type == 'checkbox') && (checks[i].name.indexOf("link") == 0))
					{
						checksRes.push(checks[i]);
					}
				}
			}
			else if ((hrefL.toLowerCase().indexOf(cn._liexPart) != -1) ||
					(hrefL.toLowerCase().indexOf(cn._liexPart2) != -1) ||
					(hrefL.toLowerCase().indexOf(cn._liexPart3) != -1))
			{
				var checks = doc.getElementsByTagName("INPUT");
				
				for (var i = 0; i < checks.length; i++)
				{
					if ((checks[i].type == 'checkbox') && (checks[i].id.indexOf("check") == 0)&& (checks[i].name == "ids"))
					
					{
						checksRes.push(checks[i]);
					}
				}
			}
			else if (hrefL.toLowerCase().indexOf(cn._xapPart) != -1)
			{
				var checks = doc.getElementsByTagName("INPUT");
				
				for (var i = 0; i < checks.length; i++)
				{
					var parent = checks[i].parentNode;
					if (parent.tagName.toLowerCase() == "td")
					{
						parent = parent.parentNode;
						if ((parent.tagName.toLowerCase() == "tr") && (parent.id.indexOf("cl_") == 0))
							checksRes.push(checks[i]);
					}
				
				}
			}
			else if (hrefL.toLowerCase().indexOf(cn._linkfeedPart) != -1)
			{
				var trs = doc.getElementsByTagName("tr");
				for(var i = 0; i < trs.length; i++)
				{
					if ((trs[i].className == "even") || (trs[i].className == "odd"))
					{
						var checks = trs[i].getElementsByTagName("INPUT");
						
						for (var j = 0; j < checks.length; j++)
						{
							
							checksRes.push(checks[i]);
						}
					}
				}
			}
			else 
			{
				var checks = doc.getElementsByTagName("INPUT");
				
				for (var i = 0; i < checks.length; i++)
				{
					checksRes.push(checks[i]);
				}
			}
			for (var i = 0; i < checksRes.length; i++)
			{
				XToolCheckerBtnManager.SetCheckForButton(checksRes[i], true);
			}
		}		
	},
	
	CheckCount : function(event)
	{
		var cn = XToolCheckerConst;
		var doc = document;
		var count = 0;
		if (doc)
		{
			var hrefL = XToolCheckerBtnManager.GetLocation(doc);
			if (hrefL.toLowerCase().indexOf("sape.ru") != -1)
			{
				var checks = doc.getElementsByTagName("INPUT");
				
				for (var i = 0; i < checks.length; i++)
				{
					if (( checks[i].type == 'checkbox') && (checks[i].parentNode.className == "ra"))
					{
						if (checks[i].checked)
						{
							count++;
						}
					}
				}
			}
			else if (hrefL.toLowerCase().indexOf(cn._seopultPart) != -1)
			{
				var checks = doc.getElementsByTagName("INPUT");
				
				for (var i = 0; i < checks.length; i++)
				{
					if ((checks[i].type == 'checkbox') && (checks[i].name.indexOf("link") == 0))
					{
						if (checks[i].checked)
						{
							count++;
						}
					}
				}
			}
			else if ((hrefL.toLowerCase().indexOf(cn._liexPart) != -1) ||
					(hrefL.toLowerCase().indexOf(cn._liexPart2) != -1) ||
					(hrefL.toLowerCase().indexOf(cn._liexPart3) != -1))
			{
				var checks = doc.getElementsByTagName("INPUT");
				
				for (var i = 0; i < checks.length; i++)
				{
					if ((checks[i].type == 'checkbox') && (checks[i].id.indexOf("check") == 0)&& (checks[i].name == "ids"))
					
					{
						if (checks[i].checked)
						{
							count++;
						}
					}
				}
			}
			else if (hrefL.toLowerCase().indexOf(cn._xapPart) != -1)
			{
				var checks = doc.getElementsByTagName("INPUT");
				
				for (var i = 0; i < checks.length; i++)
				{
					var parent = checks[i].parentNode;
					if (parent.tagName.toLowerCase() == "td")
					{
						parent = parent.parentNode;
						if ((parent.tagName.toLowerCase() == "tr") && (parent.id.indexOf("cl_") == 0))
							if (checks[i].checked)
							{
								count++;
							}
					}
				
				}
			}
			else if (hrefL.toLowerCase().indexOf(cn._linkfeedPart) != -1)
			{
				var trs = doc.getElementsByTagName("tr");
				for(var i = 0; i < trs.length; i++)
				{
					if ((trs[i].className == "even") || (trs[i].className == "odd"))
					{
						var checks = trs[i].getElementsByTagName("INPUT");
						
						for (var j = 0; j < checks.length; j++)
						{
							
							if (checks[j].checked)
							{
								count++;
							}
						}
					}
				}
			}
			else 
			{
				var checks = doc.getElementsByTagName("INPUT");
				
				for (var i = 0; i < checks.length; i++)
				{
					
					if (checks[i].checked)
					{
						count++;
					}
				
				}
			}
			
		}

		alert("Отмеченных ссылок: " + count);
	},

	
	GetProjectURL : function (link, docHref, doc)
	{
		try 
		{
		if (docHref.indexOf(this._seopultPart) != -1)
		{
			return XToolCheckerBtnManager.PrepareRawLink(XToolCheckerBtnManager.RequestProjectUrl2(doc));
		}
		else if (docHref.indexOf(this._linksWaitPart) != -1)
		{
			var parent = link.parentNode;
			var tmpObj = link;
			while (tmpObj.tagName != "TD")
			{
				
				tmpObj = parent;
				parent = tmpObj.parentNode;
				if (!parent)
					return XToolCheckerBtnManager.PrepareRawLink(XToolCheckerBtnManager.RequestProjectUrl(doc));
			}
			tmpObj= tmpObj.previousSibling;
			if (tmpObj.tagName == "TD")
			{
				var pLinks = tmpObj.getElementsByTagName("A");
				if ((pLinks) && (pLinks.length > 0))
				{
					var text = pLinks[0].href;
					if ((text.indexOf(" ") == -1) && ((text.indexOf("http://") == 0) || (text.indexOf("https://") == 0)))
					{
						return XToolCheckerBtnManager.PrepareRawLink(text);
					}
				}
			}
		}
		else if (docHref.indexOf(this._linksNewPricePart) != -1)
		{
			var parent = link.parentNode;
			var tmpObj = link;
			while (tmpObj.tagName != "TR")
			{
				tmpObj = parent;
				parent = tmpObj.parentNode;
				if (!parent)
					return XToolCheckerBtnManager.PrepareRawLink(XToolCheckerBtnManager.RequestProjectUrl(doc));
			}
			var pTags = tmpObj.getElementsByTagName("A");
			if ((pTags) && (pTags.length > 1))
			{
				var text = pTags[1].href;
				if ((text.indexOf(" ") == -1) && ((text.indexOf("http://") == 0) || (text.indexOf("https://") == 0)))
				{
					return XToolCheckerBtnManager.PrepareRawLink(text);
				}
				
			
			}
			
		}
		else
		{
			var parent = link.parentNode;
			var tmpObj = link;
			while (tmpObj.tagName != "TD")
			{
				
				tmpObj = parent;
				parent = tmpObj.parentNode;
				if (!parent)
					return XToolCheckerBtnManager.PrepareRawLink(XToolCheckerBtnManager.RequestProjectUrl(doc));
			}
			
			var pTags = tmpObj.getElementsByTagName("P");
			if ((pTags) && (pTags.length > 0))
			{
				var text = pTags[0].textContent;
				text = text.replace("URL: ", "");
				if ((text.indexOf(" ") == -1) && ((text.indexOf("http://") == 0) || (text.indexOf("https://") == 0)))
				{
					return XToolCheckerBtnManager.PrepareRawLink(text);
				}
				
			
			}
			var spans = doc.getElementsByTagName("SPAN");
			if (spans)
			{
				for (var i =0; i < spans.length; i++)
				{
					if(spans[i].className == "wink_plugin")
					{
						var as = spans[i].getElementsByTagName("A");
						if ((as) && (as.length > 0))
						{
							return XToolCheckerBtnManager.PrepareRawLink(as[0].href);
						}
					}
				}
			}
			//var res = response.match(/<span[\s]+style=\"display:[\s]*none[;]?\"[\s]+class=\>URL:[\s]+<a[^\>]+href[\s]{0,1}=[\s]{0,1}[\'\"]{0,1}[^\'\"\s\>]*[\'\"\s]{0,1}/ig);
			
			return XToolCheckerBtnManager.PrepareRawLink(XToolCheckerBtnManager.RequestProjectUrl(doc));
		}
		
		}
		catch(e)
		{
		
			return XToolCheckerBtnManager.PrepareRawLink(XToolCheckerBtnManager.RequestProjectUrl(doc));
		}
	 
	},
	
	GetProjectURL2 : function (td, docHref, doc)
	{
		try 
		{
		
			var tmpObj = td.nextSibling;
			if (tmpObj.tagName == "TD")
			{
				var pLinks = tmpObj.getElementsByTagName("A");
				if ((pLinks) && (pLinks.length > 0))
				{
					var text = pLinks[0].href;
					if ((text.indexOf(" ") == -1) && ((text.indexOf("http://") == 0) || (text.indexOf("https://") == 0)))
					{
						return XToolCheckerBtnManager.PrepareRawLink(text);
					}
				}
			}
		
		}
		catch(e)
		{
			return "";
		}
	
	},
	
	RequestProjectUrl : function (doc)
	{
		var linkUrl = "";
		var inputs = doc.getElementsByTagName("input");
		var link_id = "";
		for(var i = 0; i < inputs.length; i++)
		{
			var inp = inputs[i];
			if ((inp.type == "hidden") && (inp.name == "link_id"))
			{
				link_id = inp.value;
			}
		}

		return link_id;
	},
	
	RequestProjectUrl2 : function (doc)
	{
		var linkUrl = "";
		var divs = doc.getElementsByTagName("div");
		var link_id = "";
		for(var i = 0; i < divs.length; i++)
		{
			var div = divs[i];
			if (div.className == "project_list")
			{
				var as = div.getElementsByTagName("a");
				for(var j = 0; j <  as.length; j++)
				{
					var ahr = as[j];
					if ((ahr.className == "cur") && (ahr.href.indexOf("http://seopult.ru/item.html?item_id=")==0))
					{
						link_id = ahr.href;
						link_id = link_id.replace("http://seopult.ru/item.html?item_id=", "");
						if (link_id.indexOf("&") == -1)
							return "seopult" + link_id;
						else
							link_id = "";
					}
				}
			}
		}

		return link_id;
	},
	
	GetLinkTitle2 : function (td, href)
	{
		try 
		{
	
		var tmpObj = td;//.nextSibling;
		
		if (tmpObj)
		{
			var res = tmpObj.innerHTML;

			res = res.replace(/<textarea(\w|\W)*?\/textarea>/ig,"");
			//res = res.replace(/<[^>]*>/g, "");
			/*res = res.replace(/^\s+|\s+$/g, '');
			res = res.replace(/^\&nbsp\;|\&nbsp\;$/g, '');*/
			return XToolCheckerBtnManager.ExtPrepareTitle(res);
		}
		else
			return "";
		}
		catch(e)
		{
			return "";
		}
	}, 
	
	GetLinkTitle5 : function (link, href)
	{
		try 
		{
		link = link.parentNode.parentNode;
		var parent = link.parentNode;
		var tmpObj = link;
		while (tmpObj.tagName != "TD")
		{
			tmpObj = parent;
			parent = tmpObj.parentNode;
			if (!parent)
				return "";
		}
		tmpObj = tmpObj.nextSibling;
		tmpObj = tmpObj.nextSibling;
		tmpObj = tmpObj.nextSibling;
		tmpObj = tmpObj.nextSibling;
		tmpObj = tmpObj.nextSibling;
		
		if (tmpObj)
		{
			var res = tmpObj.textContent;			
			return XToolCheckerBtnManager.ExtPrepareTitle(res);
			
		}
		else
			return "";
		}
		catch(e)
		{
			return "";
		}
	
	},
	
	/*GetButtons : function(doc)
	{
		if (doc)
		{
			var buttons = doc.getElementsByTagName("INPUT");

			var btns = [];
			for(var i = 0; i < buttons.length; i++)
			{
				if ((buttons[i].type == 'button') && (buttons[i].name.indexOf(this._allButtonPrefix) != -1))
				{
					
					btns.push(buttons[i]);
				}
			}
			return btns;
		}
	},*/
	
	
	
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
		if (id.indexOf(cn._buttonTICPrefix) == 0) 
			return "Tic";
		if (id.indexOf(cn._buttonRPrefix) == 0) 
			return "R";	
		if (id.indexOf(cn._buttonRLVPrefix) == 0) 
			return "RLV";	
		if (id.indexOf(cn._buttonLVLPrefix) == 0) 
			return "LVL";						
		if (id.indexOf(cn._buttonPOSPrefix) == 0) 
			return "POS";		
		if (id.indexOf(cn._buttonTrfPrefix) == 0) 
			return "Trf";		
		if (id.indexOf(cn._buttonESPrefix) == 0) 
			return "Es";				
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
		if (id.indexOf(cn._buttonBLPrefix) == 0) 
			return "BL";		
		if (id.indexOf(cn._buttonSQIPrefix) == 0) 
			return "SQI";
	},
	
	AddButtonData : function(btn, record)
	{
		var cn = XToolCheckerConst;
		var btnName = XToolCheckerBtnManager.GetButtonNameByBtnID(btn.name);
		if (btnName === undefined)
		{
			XToolChecker.DebugMsg("BtnName = undefined: name = "+btn.name);
			return;
		}
		var id = btn.name;
		if (id.indexOf(cn._buttonPrefix) == 0) 
		{
			if (id.indexOf(cn._buttonXTDPrefix) == 0)
			{
				if (btn.value != "XTD")
				{
					var val = btn.value;
					//val = val.replace("D:", "");
					record["XTD"] = val;
				}
				else
					record["XTD"] = "";
			}
			else
			{
				if (btn.value != "XT")
					record["XT"] = btn.value;
				else
					record["XT"] = "";
			}
			var xres = btn.alt;//btn.getAttribute("alt");
			console.log("xres="+xres);
			if (xres == "cached_value")
				xres = btn.placeholder;//btn.getAttribute("placeholder");
			if (xres && (xres != ""))
			{
			try
			{
				xres = XToolCheckerBtnManager.PrepareTextForJSON(xres);
				var result = JSON.parse(xres);
				XToolCheckerBtnManager.ProcessJSONObject(result);
				if (result.scheme !== undefined)
				{
					var scheme = result.scheme;
					if (scheme != "1")
						scheme = "0";
					record["Санкции"] = scheme ;
				}
				if (result.lout !== undefined)
				{
					record["Lout"] = result.lout;
				}
				if (result.lin !== undefined)
				{
					record["Lin"] = result.lin;
				}
				if (result.spam !== undefined)
				{
					record["Заспам."] = result.spam;
				}
				if (result.rg !== undefined)
				{
					record["RG"] = result.rg;
				}
				if (result.ry !== undefined)
				{
					record["RY"] = result.ry;
				}
				if (result.nepot !== undefined)
				{
					record["Вероятность непота"] = result.nepot;
				}
				if (result.tf !== undefined)
				{
					record["TF"] = result.tf;
				}
				if (result.cf !== undefined)
				{
					record["CF"] = result.cf;
				}
			} catch (e) {console.log(e);};
			}
		}
		else 
		if ((id.indexOf(cn._buttonYapPrefix) == 0) || (id.indexOf(cn._buttonYalPrefix) == 0) || (id.indexOf(cn._buttonYCPrefix) == 0) ||
			(id.indexOf(cn._buttonGPPrefix) == 0)	|| (id.indexOf(cn._buttonGCPrefix) == 0) ||
			(id.indexOf(cn._buttonGLPrefix) == 0) || (id.indexOf(cn._buttonRPrefix) == 0))
		{
			if (btn.value.toLowerCase() == btnName.toLowerCase())
			{
				if (btn.style.backgroundColor ==  XToolCheckerBtnManager.ColorHex2Dec(XToolCheckerThreads._greenColor[0]))
					record[btnName] = "да";
				else if (btn.style.backgroundColor == XToolCheckerBtnManager.ColorHex2Dec(XToolCheckerThreads._redColor[0]))
					record[btnName] = "нет";
				else
					record[btnName] = "";
			}
			else
			{
				if ((btn.value == "ER") || (btn.value == "---"))
					record[btnName] = "ER";
				else
					record[btnName] = "";
			}
		}	
		else if ((id.indexOf(cn._buttonBCPrefix) == 0) ||(id.indexOf(cn._buttonPRPrefix) == 0))
		{
			if (btn.value.toLowerCase() != btnName.toLowerCase())
			{
				if (btn.value == "-")
					record[btnName] = "- ";
				else if (btn.value == "---")
					record[btnName] = "ER";
				else
					record[btnName] = btn.value.replace("/","|");
			}
			else
				record[btnName] = "";
		}
		else		
		{
			if (btn.value.toLowerCase() != btnName.toLowerCase())
			{
				if (btn.value == "-")
					record[btnName] = "- ";
				else if (btn.value == "---")
					record[btnName] = "ER";
				else
					record[btnName] = btn.value;
			}
			else
				record[btnName] = "";
		}
		//XToolCheckerBtnManager.DebugMsg(results[href][btnName]);
		//results[href] = record;
		console.log(JSON.stringify(record));
	},


	ProcessJSONObject : function(obj)
	{
		XToolCheckerBtnManager.UpdateObjectText(obj);
	},
	
	
	UpdateObjectText : function(obj)
	{
		for(var key in obj) 
		{
			if ((obj[key] instanceof Array) || (typeof obj[key] == "object"))
			{
				XToolCheckerBtnManager.UpdateObjectText(obj[key] );
			}
			else
			{
				obj[key] = (obj[key]+"").replace(/\#\#\#\#quote\#\#\#\#/g, "\"");
				obj[key] = (obj[key]+"").replace(/\#\#\#\#dollar\#\#\#\#/g, "\$");
			}
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
	
	ExportToExcel : function(checkedOnly)
	{
		var cn = XToolCheckerConst;
		var doc = XTContentTools.GetDocument();
		var btns = XToolCheckerBtnManager.GetButtons(doc, cn._allButtonPrefix );
		console.log(btns.length);
		var results = new Array();
		var lastHref = '';
		for (var i = 0; i < btns.length; i++)
		{
			var btn = btns[i];
			// Пропускаем лишние
			if (btn.name.indexOf(cn._buttonGBLPrefix) == 0)
				continue;
			if (btn.name.indexOf(cn._buttonBLPrefix) == 0)
				continue;
			/*if (checkedOnly && (!XToolChecker.IsChecked(btn)))
				continue;*/
			var href = btn.previousSibling.alt;
			if (btn.name.indexOf(cn._buttonLVLPrefix) == 0)
				href = btn.previousSibling.value;
			if ((btn.name.indexOf(cn._buttonYCPrefix) == 0) || (btn.name.indexOf(cn._buttonPOSPrefix) == 0))
				href = lastHref;
			href = XToolCheckerBtnManager.PrepareLink(href);
			var record = new Array();
			if (!(href in results))
				results[href] = record;
			else
				record = results[href];
			
			XToolCheckerBtnManager.AddButtonData(btn, record);
			lastHref = href;
			
		}
		
	/*	var nsIFilePicker = Components.interfaces.nsIFilePicker;

		var dlg = Components.classes["@mozilla.org/filepicker;1"]
						.createInstance(nsIFilePicker);
		dlg.init(window, "Экспорт результатов в файл", nsIFilePicker.modeSave);
		dlg.defaultString = "result.csv";
		dlg.appendFilter("CSV файл", "*.csv");
		//dlg.appendFilter("XLS файл", "*.xls");
		var rv = dlg.show();
		if (rv == nsIFilePicker.returnOK || rv == nsIFilePicker.returnReplace) 
		{
			var file = dlg.file;
			var fileName = file.path;
			if (XToolCheckerBtnManager.endsWith(fileName.toLowerCase(), ".csv"))
			{*/
			
				var resText = XToolCheckerBtnManager.ExportToCSV(results);
				//console.log(resText);
				//chrome.extension.sendMessage({action : "ExportToFile", Text: resText });
				browser.runtime.sendMessage({action : "ExportToFile", Text: resText });
			/*	var strm = Components.classes["@mozilla.org/network/file-output-stream;1"]
							.createInstance(Components.interfaces.nsIFileOutputStream);

				strm.init(file, 0x02 | 0x08 | 0x20, 0666, 0);
				var converter = Components.classes["@mozilla.org/intl/converter-output-stream;1"]
						.createInstance(Components.interfaces.nsIConverterOutputStream);  
				converter.init(strm, "windows-1251", 1024, Components.interfaces.nsIConverterOutputStream.DEFAULT_REPLACEMENT_CHARACTER);  
				converter.writeString(resText);  
				converter.close();
				//strm.write(resText, resText.length);
				strm.close();
			}
			else if (XToolCheckerBtnManager.endsWith(fileName.toLowerCase(), ".xls"))
			{
				var resText = XToolCheckerBtnManager.ExportToXLS(results);
				//alert(resText);
				var strm = Components.classes["@mozilla.org/network/file-output-stream;1"]
							.createInstance(Components.interfaces.nsIFileOutputStream);

				strm.init(file, 0x02 | 0x08 | 0x20, 0666, 0);

				strm.write(resText, resText.length);
				strm.close();
			}
		}*/
	},
	
		

	ExportToXLS : function(results)
	{
		var str = "<html xmlns:o=\"urn:schemas-microsoft-com:office:office\" xmlns:x=\"urn:schemas-microsoft-com:office:excel\" xmlns=\"http://www.w3.org/TR/REC-html40\"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Sheet</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>";
		var prms = new Array();
		for (var i in results) 
		{
			var record = results[i];
			for (var j in record) 
			{
				if (prms.indexOf(j) == -1)
				{
					prms.push(j);
				}
			}
		}
		str += "<tr>";
		// шапка
		str += XToolCheckerBtnManager.PrepareXLSValue("Url");
		for (var j = 0; j < prms.length; j++) 
		{
			var cellVal = prms[j]; 
			str += XToolCheckerBtnManager.PrepareXLSValue(cellVal);
		}
		str += "</tr>";
		
		// содержимое
		for (var i in results) 
		{
			str += "<tr>";
			var url = i;
			str +=  XToolCheckerBtnManager.PrepareXLSValue(url);
			var record = results[i];
			var newLine = true;
			for (var j = 0; j < prms.length; j++) 
			{
				
				if (prms[j] in record)
				{
					var cellVal = record[prms[j]]; 
					str += XToolCheckerBtnManager.PrepareXLSValue(cellVal);
				}
				else
				{
					str += "<td>&nbsp;</td>";
				}
			}
			str += "</tr>";			
		}
		str += "</table></body></html>";
 		return str;
	},
	
	PrepareCSVValue : function (cellVal)
	{
		if (cellVal)
		{
			cellVal = cellVal.replace("\"", "\"\"");
			cellVal = cellVal.replace(String.fromCharCode(8593), "");
			cellVal = cellVal.replace(String.fromCharCode(8595), "");
			if (cellVal.match(/[0-9]+\.[0-9]+/))
				cellVal = cellVal.replace(".", ",");
			if ((cellVal.indexOf(",") != -1) || (cellVal.indexOf(" ") != -1) ||
				(cellVal.indexOf(";") != -1) || (cellVal.indexOf("\n") != -1))
			{
				cellVal = "\"" + cellVal + "\"";
			}
			/*if (cellVal == "")
				cellVal = "";*/
		}
		else
			cellVal = "";
		return cellVal;
	},
	

	ExportToCSV : function(results)
	{
		var str = "";
		var prmsTmp = new Array();
		var prms = new Array();
		for (var i in results) 
		{
			var record = results[i];
			for (var j in record) 
			{
				if (prmsTmp.indexOf(j) == -1)
				{
				//XT XTD YP LVL PR InY TRF  GP GC
					prmsTmp.push(j);
				}
			}
		}
		var array = [ "XT", "XTD", "Lin", "Lout", "RG", "RY", "Санкции", "Заспам.","Вероятность непота", "CF", "TF","YP",
		"YL", "YC","LVL","BC", "POS", "Trf", "inY", "inG", "GP", "GC", "GL", "PR", "Tic", "R", "RLV" ];
		for (var i = 0; i < array.length; i++)
			if (prmsTmp.indexOf(array[i]) != -1)
				prms.push(array[i]);
		
		// шапка
		str += "Url";
		for (var j = 0; j < prms.length; j++) 
		{
			var cellVal = prms[j]; 
			if ((prms[j] == "R") && (this._regionName != ""))
				cellVal += " (Регион: " + this._regionName + ")";
			str += "," + XToolCheckerBtnManager.PrepareCSVValue(cellVal);
		}
		str += "\n";
		
		// содержимое
		for (var i in results) 
		{
			var url = i;
			if ((url === undefined) || (url == ''))
				continue;
			str += XToolCheckerBtnManager.PrepareCSVValue(url);
			var record = results[i];
			var newLine = true;
			for (var j = 0; j < prms.length; j++) 
			{
				
				str += ",";
				
				if (prms[j] in record)
				{
					var cellVal = record[prms[j]]; 
					str += XToolCheckerBtnManager.PrepareCSVValue(cellVal);
				}
				else
				{
					str += "";
				}
			}
			str += "\n";			
		}
		return str;
	},

	
	PrepareXLSValue : function (cellVal)
	{
		cellVal = cellVal.replace("\&", "\&amp;");
		cellVal = cellVal.replace("\<", "\&lt;");
		cellVal = cellVal.replace("\>", "\&gt;");
		//cellVal = window.btoa(unescape(encodeURIComponent(cellVal)));
		cellVal = "<td>" + cellVal + "</td>";
		return cellVal;
	},
	
	CustomLoad : function (doc, list) 
	{
		doc.replaceChild(doc.createElement("html"), doc.documentElement);
		var head = doc.createElement("head");
		doc.documentElement.appendChild(head);
		
		var title = doc.createElement("title");
		title.textContent = "Пользовательские ссылки";
		head.appendChild(title);

		var body = doc.createElement("body");
		body.id = XToolCheckerConst._generated;
		doc.documentElement.appendChild(body);
		//XToolCheckerBtnManager.CustomLoadContent(doc, body, list);
		
		//XToolCheckerBtnManager.AddButtonsToAny(doc, false, true);
	},
	
	CustomLoadContent : function (doc, body, list)
	{
		console.log('adding');
		var table = doc.createElement("table");
		body.appendChild(table);
		XToolCheckerBtnManager.AddListToTable(doc, table, list);
		
		var button = doc.createElement("input");
		button.type = "button";
		button.value = "Удалить выбранные из списка";
		button.addEventListener("click", XToolCheckerBtnManager.OnRemoveSelected, false);
		body.appendChild(button);
		
		var buttonAdd = doc.createElement("input");
		buttonAdd.type = "button";
		buttonAdd.value = "Добавить еще ссылок...";
		buttonAdd.addEventListener("click", XToolCheckerBtnManager.OnAddMoreLinks, false);
		body.appendChild(buttonAdd);

		
	},
	
	AddListToTable : function (doc, table, list)
	{
		for (var i = 0; i < list.length; i++)
		{
			var tr = doc.createElement("tr");
			table.appendChild(tr);
			var td = doc.createElement("td");
			tr.appendChild(td);
			var url = list[i];
			if ((url.indexOf("http://") == -1) && (url.indexOf("https://") == -1))
				url = "http://" + url;
			var link = doc.createElement("a");
			link.id = "XTlink";
			link.href = url
			link.textContent = url;
			td.appendChild(link);
			
			
			var td2 = doc.createElement("td");
			tr.appendChild(td2);
			var check = doc.createElement("input");
			check.type = "checkbox";
			td2.appendChild(check);
		}
	},
	
	OnRemoveSelected : function (event)
	{
		var doc = document;
		var nodesToRemove = [];
		var inputs = doc.getElementsByTagName("input");
		for (var i = 0; i < inputs.length; i++)
		{
			if (inputs[i].type == "checkbox")
			{
				if (inputs[i].checked == true)
				{
					nodesToRemove.push(inputs[i].parentNode.parentNode);
				}
			}
		}
				
		for (var i = 0; i < nodesToRemove.length; i++)
			nodesToRemove[i].parentNode.removeChild(nodesToRemove[i]);
	},
	
	OnAddMoreLinks : function (event)
	{
		var doc = document;
		var list = [];
		if (XToolCheckerConst._isChrome)
		{
			XTContentTools.SetAppendMode(); 
			chrome.tabs.create({url: chrome.extension.getURL("list_editor.html")});
		}
		else
		{
			window.openDialog("chrome://xtool_checker/content/list_editor.xul", "listEditor", "dialog, chrome, modal, centerscreen", list); 
			if (list.length > 0)
			{
				var tables = doc.getElementsByTagName("table");
				if (tables.length > 0)
				{
					XToolCheckerBtnManager.AddListToTable(doc, tables[0], list);
					XToolCheckerBtnManager.AddButtonsToAny(doc, true, true);
				}
			}
		}
	},
	
	
	
	GetLinkTitleSeoHammer : function (link)
	{
		try 
		{
		
		var parent = link.parentNode;
		var tmpObj = link;
		while (tmpObj.tagName != "TD")
		{
			tmpObj = parent;
			parent = tmpObj.parentNode;
			if (!parent)
				return "";
		}
		tmpObj = tmpObj.nextSibling;
		if (tmpObj)
		{
			var res = tmpObj.textContent;			
			return XToolCheckerBtnManager.ExtPrepareTitle(res);
		}
		else
			return "";
		}
		catch(e)
		{
			return "";
		}
	
	},
	
		
	GetLinkTitleSW : function (link, href)
	{
		try 
		{
		var parent = link.parentNode;
		var tmpObj = link;
		while (tmpObj.tagName != "TD")
		{
		
			tmpObj = parent;
			parent = tmpObj.parentNode;
			if (!parent)
			{
				return "";
			}
		}
		
		tmpObj = tmpObj.previousSibling;
		if (!tmpObj.tagName)
			tmpObj = tmpObj.previousSibling;
		
		if (tmpObj)
		{
		
			
				var res = tmpObj.textContent;			
				return XToolCheckerBtnManager.ExtPrepareTitle(res);
		}
		else
		{
			return "";
		}
		}
		catch(e)
		{
			return "";
		}
	
	},
	
	GetLinkTitle : function (link, href)
	{
		try 
		{
		var parent = link.parentNode;
		var tmpObj = link;
		while (tmpObj.tagName != "TD")
		{
			tmpObj = parent;
			parent = tmpObj.parentNode;
			if (!parent)
				return "";
		}
		tmpObj = tmpObj.previousSibling;
		if (href.indexOf(this._linksWaitPart) != -1)
		{
			tmpObj = tmpObj.previousSibling;
		}
		while (tmpObj && tmpObj.tagName != "TD"){
			tmpObj = tmpObj.previousSibling;
		}
		
		if (tmpObj)
		{
			/*if (href.indexOf(this._rookeePart) != -1)
			{
				var res = tmpObj.textContent;			
				return XToolCheckerBtnManager.ExtPrepareTitle(res);
			}*/
			var res = tmpObj.innerHTML;
			var index = res.indexOf("<br>");
			if (index != -1)
			{
				res = res.substring(index + 4, res.length);
			}
				
			//res = res.replace(/<[^>]*>/g, "");
			/*res = res.replace(/^\s+|\s+$/g, '');
			res = res.replace(/^\&nbsp\;|\&nbsp\;$/g, '');*/
			res = res.replace(/<span [^>]*>[^<]*<\/span>/ig, "");
			
			return XToolCheckerBtnManager.ExtPrepareTitle(res);
		}
		else
			return "";
		}
		catch(e)
		{
			return "";
		}
	
	},


	ShowCapchaDialog: function (doc, info)
	{
		var cn = XToolCheckerConst;
		if (info._imgSrc === undefined)
		{
			console.log("image not defined" );
			return;
		}
		XToolCheckerBtnManager._cpt = info;
		console.log("name =" + info._imgSrc);
		var dlg = doc.getElementById("XToolCapchaDlg");
		if (!dlg)
			dlg = XToolCheckerBtnManager.CreateCapchaDialog(doc);
		doc.getElementById('XTCapchaCode').value = "";
		var img = doc.getElementById("XTCapchaImg");
		console.log("img = "+img);
		img.src=	info._imgSrc;
		console.log("img = "+img.src);

		
		doc.getElementById("XToolCapchaDlg").style.display = "block";
		doc.getElementById("XToolCapchaDlgBackground").style.display = "block";

	
	},

	CreateCapchaDialog: function (doc)
	{
		console.log("creating dialog" );
		var dlgDiv = doc.createElement("DIV");

		dlgDiv.id='XToolCapchaDlg';
		dlgDiv.style = "display: none; position: fixed;	top: 40%; left: 40%; width: 20%; height: 20%; padding: 16px; border: 5px solid orange; background-color: white; z-index: 1002; overflow: auto;";
		dlgDiv.innerHTML = "<img id=\"XTCapchaImg\" src=\"\" width=\"200\" height=\"60\"/><br/>\
		<input type=\"button\" id=\"XTCapchaRefresh\" value=\"Обновить\" /><br/>\
		<span >Текст с картинки:</span><br/>\
		<input type=\"text\" id=\"XTCapchaCode\" /><br/>\
		<span id=\"stageLabel\"/><br/>\
		<span id=\"stageLabel2\"/><br/>\
		<input type=\"submit\" id=\"XTCapchaSubmit\" value=\"Отправить\" />\
		<input type=\"button\" id=\"XTCapchaStopCheck\" value=\"Остановить проверку\"/>";
	/*
	
		<hbox flex="1" pack="center">
		<groupbox>
		  <caption>
			<label id="image_desc" value="Картинка"/>
		  </caption>
			<image id="image_cpt" src="" width="200" height="60"/>
		</groupbox>
			
		</hbox>
		<hbox  flex="1" pack="center">
			<button id="refresh" label="Обновить" value="Обновить" onclick="Refresh();"/>
		</hbox>
		<hbox flex="1" pack="center">
			<progressmeter id="progress_cpt" mode="undetermined" hidden="false" height="5"/>
		</hbox>
		<hbox flex="1" pack="center">
			<label id="stageLabel" value="" hidden="false" />
		</hbox>
		<hbox flex="1" pack="center">
			<label id="stageLabel2" value="" hidden="false" />
		</hbox>
		<hbox>
			<label id="cptLabel" value="Текст с картинки:"/>
			<textbox  id="capchaCode" onkeydown="if (event.keyCode == 13) SendInfo();" />
		</hbox>
		<hbox>
			<button id="submit" label="Отправить" value="Отправить" onclick="SendInfo();"/>
			<button id="stopCheck" label="Остановить проверку" value="Остановить проверку" onclick="StopAndClose();"/>
		</hbox>
	*/
		doc.body.appendChild(dlgDiv);

		var dlgBckDiv = doc.createElement("DIV");

		dlgBckDiv.id='XToolCapchaDlgBackground';
		dlgBckDiv.style = "display: none; position: fixed; top: 0%; left: 0%; width: 100%; height: 100%; background-color: black; z-index: 1001; -moz-opacity: 0.8; opacity: .80; filter: alpha(opacity=80);";
		doc.body.appendChild(dlgBckDiv);

		doc.getElementById("XTCapchaRefresh").addEventListener("click", XToolCheckerBtnManager.Refresh, false);
		doc.getElementById("XTCapchaSubmit").addEventListener("click", XToolCheckerBtnManager.SendInfo, false);
		doc.getElementById("XTCapchaStopCheck").addEventListener("click", XToolCheckerBtnManager.StopAndClose, false);
		doc.getElementById("XTCapchaCode").addEventListener("keydown", XToolCheckerBtnManager.OnKeyDown, false);


	},

OnKeyDown: function(event)
{
	if (event.keyCode == 13) 
		XToolCheckerBtnManager.SendInfo();
},

 SendInfo: function()
{
	XToolCheckerBtnManager._cpt._result =  document.getElementById('XTCapchaCode').value.trim();
	if (XToolCheckerBtnManager._cpt._result == "")
	{
		console.log("Ошибка: Пустой код.");
		return;
	}
	XToolCheckerBtnManager.CloseDlg();
	browser.runtime.sendMessage({action : "CapchaResult", info : XToolCheckerBtnManager._cpt });
},

Refresh: function ()
{
	XToolCheckerBtnManager._cpt._refreshImage = true;
	XToolCheckerBtnManager.CloseDialog();
	browser.runtime.sendMessage({action : "CapchaResult", info : XToolCheckerBtnManager._cpt });
},


CloseDlg: function ()
{
	XToolCheckerBtnManager._cpt._stopAll = false;
	XToolCheckerBtnManager.CloseDialog();
},

StopAndClose: function ()
{
	XToolCheckerBtnManager._cpt._stopAll = true;
	XToolCheckerBtnManager._cpt._textResult = "Отмена проверки.";
	XToolCheckerBtnManager._cpt._error = false;
	XToolCheckerBtnManager._cpt._recognizing = false;
	XToolCheckerBtnManager.CloseDialog();
	browser.runtime.sendMessage({action : "CapchaResult", info : XToolCheckerBtnManager._cpt });
},

SetStage: function (text, text2, progress, color)
{
	document.getElementById('stageLabel').value = text;
	document.getElementById('stageLabel2').value = text2;

	//document.getElementById('progress_cpt').hidden = !progress;
	if (color)
	{
		document.getElementById('stageLabel').style.color = color;
		document.getElementById('stageLabel2').style.color = color;
	}
	else
	{
		document.getElementById('stageLabel').style.color = "#000000";
		document.getElementById('stageLabel2').style.color = "#000000";
	}
},

CloseDialog: function ()
{
	document.getElementById("XToolCapchaDlg").style.display = "none";
	document.getElementById("XToolCapchaDlgBackground").style.display = "none";
}

}