function pageButtonClick()
{
	if (this.id.indexOf("page_btn") != -1)
	{
		var pageID = this.id.replace("_btn", "");
		var elements = document.getElementsByTagName("div");
		for(var i = 0; i < elements.length; i++)
		{
			if (elements[i].className == "page")
			{
				elements[i].style.display = "none";
			}
		}
		var page = document.getElementById(pageID);
		page.style.display = "block";
		
		var elements = document.getElementsByTagName("input");
		for(var i = 0; i < elements.length; i++)
		{
			if (elements[i].className == "page_btn")
				elements[i].style.backgroundColor = "#CCCCCC";
		}
		this.style.backgroundColor = "#FFFFFF";
	}
};


function onError (error) {
	console.log(`Error: ${error}`);
  }

function applyClick()
{
	console.log("Applying options...");
	var settingElems = document.getElementsByTagName("input");
	for(var i=0; i < settingElems.length; i++) 
	{
		if (settingElems[i].type == "checkbox")
		{
			setBoolValue(settingElems[i].getAttribute("id"), settingElems[i].checked);
		}
		if (settingElems[i].type == "radio")
		{
			setBoolValue(settingElems[i].getAttribute("id"), settingElems[i].checked);
			if (settingElems[i].checked) {
				setCharValue(settingElems[i].getAttribute("name"), settingElems[i].getAttribute("value"));
			}
		}
		else if ((settingElems[i].type == "text"))
		{
			setCharValue(settingElems[i].getAttribute("id"), settingElems[i].value);
		}
		else  if (settingElems[i].type == "password")
		{
			var passValue = settingElems[i].value + "";

			var propName = settingElems[i].getAttribute("id").trim();
			console.log("Checking setting_ _" + propName + " = " + passValue);
			if (propName == "mozSecretKey")
			{
				console.log("Checking setting_ " + propName + " = " + passValue);
				setCharValue(settingElems[i].getAttribute("id"), passValue);
			}
			else
			{

				SetPassword(propName, passValue);
				
			}

			
		}
	}
	var textElems = document.getElementsByTagName("textarea");
	for(var i=0; i < textElems.length; i++) 
	{
		setCharValue(textElems[i].getAttribute("id"), textElems[i].value);
	}
	var qTypeStr = "6";

	/*if (document.getElementById("query_yandex").checked) qTypeStr = "6";
	//else if (document.getElementById("query_tyt").checked) qTypeStr = "3";
	else if (document.getElementById("query_xml_yandex").checked) qTypeStr = "2";
	else if (document.getElementById("query_family_yandex").checked) qTypeStr = "7";*/
	//setCharValue('query_yp_yl', qTypeStr);
	setCharValue('region_id', document.getElementById("region_id").value);
	console.log('region_id = ' + document.getElementById("region_id").value );
	console.log("Loading setting after apply");
	loadSettings();
	browser.runtime.getBackgroundPage().then(
	function(page){
		setTimeout(function() { 
			console.log("Rechecking login...")
			page.XToolChecker.LoginCheck(0); }, 2000);
		setTimeout(function() { 
			console.log("Reloading settings...")
			
			page.XTSettingsManager.CheckAndReadSettings();
		 }, 100);		
	}, onError);	
	
};



function SetPassword(propName, passValue) {

	console.log("Checking setting1 " + propName + " = " + passValue);
	browser.storage.local.get(propName).then(
	function(result) {
		console.log("Checking setting1.1 " + propName + " = " + result[propName]);
		if (propName != "mozSecretKey")
		{
			console.log("Checking setting2 " + propName + " = " + result[propName]);
			if (result[propName] != passValue/* && passValue != ''*/)
			{
				if (passValue == '') {
					passValue = ' ';
				}
				try {
				var sign64  =  CryptoJS.SHA512(passValue);//btoa(XToolChecker.GetSHA1_HMAC(sts._mozSecretKey,  signText));s
				console.log(sign64);
				sign64 = sign64.toString(CryptoJS.enc.Hex);
				console.log(sign64);
				setCharValue(propName, sign64/*sha512(passValue)*/);
				}
				catch(e)
				{
					onError(e) ;
				}
			}
		}
	}, onError);
};


function onError(error) 
{
	console.log(`Error: ${error}`);
};
  

function cancelClick()
{
	window.close();
};

function showFilterBC()
{
	console.log("showFilterBC");
	showBlock("showFilterBC", "filterBCLayer");
};

function showTemplates()
{
	console.log("showTemplates");
	showBlock("showTemplates", "templatesLayer");
};

function showKeywords()
{
	console.log("showKeywords");
	showBlock("showKeywords", "keywordsLayer");
};

function showFilter()
{
	showBlock("showFilter", "filterLayer");
};

function showBlock(buttonName, blockName)
{
	var button = document.getElementById(buttonName);
	var div = document.getElementById(blockName);
	if (button.value.indexOf(">>") != -1)
	{
		console.log(">>");
		button.value = button.value.replace(">>", "<<");
		div.style.display = "block"
	}
	else
	{
		console.log("<<");
		button.value = button.value.replace("<<", ">>");
		div.style.display = "none"
	}
};

function showDomainFilter()
{
	browser.tabs.create({url: browser.extension.getURL("content/blacklist.html")});
	/*showDialog("blacklist.html", { extension: browser.extension}, "dialogHeight: 260px; dialogWidth: 450px; help: No; scroll: No; status: No; resizable: Yes; ") ;*/
};

function showDomainsBC()
{
	//browser.tabs.create({url: browser.extension.getURL("content/blacklist.html")});
	/*showDialog("blacklist.html", { extension: browser.extension}, "dialogHeight: 260px; dialogWidth: 450px; help: No; scroll: No; status: No; resizable: Yes; ") ;*/
	showBlock("showDomainsBC", "domainsBCLayer");
};

function getBoolValue(name)
{
	/*var boolVal = (localStorage[name] == "true");

	document.getElementById(name).checked = boolVal ;*/
		browser.storage.local.get(name).then(
		function(result) {
			console.log("Reading setting " + name + " = " + result[name]);
			if (result[name])
				document.getElementById(name).checked = result[name];
		}, null);
};

function getCharValue(name)
{
	//document.getElementById(name).value = localStorage["extensions.xtool_checker."+name];
	//console.log("Reading setting " + name + " = " + localStorage["extensions.xtool_checker."+name]);
	browser.storage.local.get(name).then(
		function(result) {
			console.log("Reading setting " + name + " = " + result[name]);
			//ShowHideBtn(name, result[name]);
			if (result[name])
				document.getElementById(name).value = result[name];
		}, null);
};

function setBoolValue(name, value)
{
	console.log("Writing setting " + name + " = " + value);
	var obj = {};
	obj[name] = value;
	browser.storage.local.set(obj);
};

function setCharValue(name, value)
{
	console.log("Writing setting " + name + " = " + value);
	var obj = {};
	obj[name] = value;
	browser.storage.local.set(obj);
};

function loadSettings()
{
	var settingElems = document.getElementsByTagName("input");
	for(var i=0; i < settingElems.length; i++) 
	{
		if ((settingElems[i].type == "checkbox") || (settingElems[i].type == "radio"))
		{
			getBoolValue(settingElems[i].getAttribute("id"));
		}
		else if ((settingElems[i].type == "text"))
		{
			getCharValue(settingElems[i].getAttribute("id"));
		}
		else if (settingElems[i].type == "password")
		{
			getCharValue(settingElems[i].getAttribute("id"))
			
		}
	}
	getCharValue('region_id');
	var textElems = document.getElementsByTagName("textarea");
	for(var i=0; i < textElems.length; i++) 
	{
		getCharValue(textElems[i].getAttribute("id"));
	}
	
	/*	document.getElementById("query_yandex").checked = false;
		document.getElementById("query_xml_yandex").checked = false;
		document.getElementById("query_family_yandex").checked = false;
	*/
		browser.runtime.getBackgroundPage().then(
			function(page){
				if (document.getElementById("template_yp").value == '') document.getElementById("template_yp").value = page.XTSettings._yapParams;
				if (document.getElementById("template_yl").value == '') document.getElementById("template_yl").value = page.XTSettings._yalParams;
				if (document.getElementById("template_gp").value == '') document.getElementById("template_gp").value = page.XTSettings._gpParams;
				if (document.getElementById("template_gl").value == '') document.getElementById("template_gl").value = page.XTSettings._glParams;
				if (document.getElementById("template_iny").value == '') document.getElementById("template_iny").value =page.XTSettings._inyParams;
				if (document.getElementById("template_ing").value == '') document.getElementById("template_ing").value = page.XTSettings._ingParams;
				if (document.getElementById("template_ing1").value == '') document.getElementById("template_ing1").value = page.XTSettings._ing1Params;
			}, onError);	
	/*	if (document.getElementById("yandex_xml_url").value == "")
		{
			document.getElementById("yandex_xml_url").value = 
				"http://xmlsearch.yandex.ru/xmlsearch?user=" + document.getElementById("yandex_user").value +
				"&key="+ 
				document.getElementById("yandex_key").value + 
				"&lr=213&groupby=attr%3Dd.mode%3Ddeep.groups-on-page%3D99.docs-in-group%3D1&noreask=1&nomisspell=1&query=";		
		}*/
};

window.onload = function() 
{ 
	var elements = document.getElementsByTagName("input");
	var manifest = browser.runtime.getManifest();
	console.log(manifest.name);
	console.log(manifest.version);
	var info =  document.getElementById("xtoolVersion");
	info.textContent = "Версия: "+ manifest.version;
	for(var i = 0; i < elements.length; i++)
	{
		if (elements[i].className == "page_btn")
			elements[i].addEventListener("click", pageButtonClick);
		if (elements[i].id == "applyButton")
			elements[i].addEventListener("click", applyClick);
		if (elements[i].id == "cancelButton")
			elements[i].addEventListener("click", cancelClick);
		if (elements[i].id == "showDomainFilter")
			elements[i].addEventListener("click", showDomainFilter);
		if (elements[i].id == "showFilter")
			elements[i].addEventListener("click", showFilter);
		if (elements[i].id == "showFilterBC")
			elements[i].addEventListener("click", showFilterBC);
		if (elements[i].id == "showTemplates")
			elements[i].addEventListener("click", showTemplates);
		if (elements[i].id == "showDomainsBC")
			elements[i].addEventListener("click", showDomainsBC);
		if (elements[i].id == "showKeywords")
			elements[i].addEventListener("click", showKeywords);
	}
	loadSettings();
	
	
};