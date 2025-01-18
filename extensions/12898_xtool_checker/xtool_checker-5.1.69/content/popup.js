
function updateElementInfo(o) 
{ 
	var element = document.getElementById(o.name);
	if (element)
	{
		if (o.hidden !== undefined)
			element.style.display = o.hidden ? "none" : "block";
		if (o.value !== undefined)
		{
			if (element.tagName == "SPAN")
			{
				element.textContent = o.value;
				element.title = o.value;
			}
			else
			{
				element.value = o.value;
			}
		}
		if (o.disabled !== undefined)
			element.disabled = o.disabled ? "disabled" : "";
		if (o.image !== undefined)
		{
			element.src = o.image;
			console.log("image = " + o.image);
			console.log("src = " + element.src);
		}
		if (o.label !== undefined)
			element.label = o.label;
		if (o.title !== undefined)
			element.title = o.title;

		if ((o.tooltip !== undefined) && (element.tagName == "INPUT"))
			element.title = o.tooltip;
		if ((o.color !== undefined) && (element.tagName == "INPUT"))
		{
			element.style.backgroundColor = o.color;
			console.log(o.color);
		}
	}
};

function onError (error) {
  console.log(`Error: ${error}`);
}


function multicheckBtn(btnText)
{
	browser.runtime.getBackgroundPage().then(
	function(page){
		
		page.XTCommands.multicheckButtons(btnText);
	}, onError);	
};

function buttonClick()
{
	multicheckBtn(this.value);
};


function itemClick()
{
	console.log("id = "+this.id);
	var command_id = this.id;
	browser.runtime.getBackgroundPage().then(
	function(bg){
		console.log("bg  = "+bg);
		if (command_id == "xtool_label")
		{
			browser.tabs.create({url: 'http://xtool.ru'});
		}
		else if (command_id == "xtool_checker-custom-page")
		{
			bg.XTCommands.createCustomPage();
		}
		else if (command_id == "xtool_checker-settings")
		{
			bg.XTCommands.showSettings();
		}
		else if (command_id == "xtool_checker-PauseMulticheck")
		{
			bg.XTCommands.pauseMulticheck();
		}
		else if (command_id == "xtool_checker-StopMulticheck")
		{
			bg.XTCommands.stopMulticheck();
		}
		else if (command_id == "xtool_checker-fastXT")
		{
			this.value = "(xt)";
			bg.XTCommands.checkFastXT();
		}
		else if (command_id == "xtool_checker-Mark")
		{
			bg.XTCommands.markLinks();		
		}
		else if (command_id == "xtool_checker-CheckCount")
		{
			bg.XTCommands.checkCount();
		}
		
		else if (command_id == "xtool_checker-CheckInvert")
		{
			bg.XTCommands.checkInvert();
		}
		else if (command_id == "xtool_checker-ToExcel")
		{
			bg.XTCommands.exportToExcel();
		}
		else if (command_id == "xtool_checker-refresh")
		{
			bg.XTCommands.refreshButtons();
		}
		else if (command_id == "xtool_checker-logincheck")
		{
			bg.XTCommands.checkLogin();
		}
		else if (command_id == "xtool_register_label")
		{
			browser.tabs.create({url: 'https://xtool.ru/registration/'});
		}
	
	}, onError);
}

function modeChange()
{
	
	var mode = document.getElementById("xtool_checker_mode");
	var modeValue = mode.value;
	chrome.storage.local.set({'mode': modeValue}, function() { });
	
	browser.runtime.getBackgroundPage().then(
	function(page){
		page.XTCommands.refreshButtons();
	}, onError);	

};

browser.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action == "UpdatePopupElement")
	{
		if (request.elementName != undefined)
		{
			var element = document.getElementById(request.elementName);
			browser.runtime.getBackgroundPage().then(
				function(page){
					page.XTCommands.updateElement(element.id, updateElementInfo);
				}, onError);
		}
	}
}
);



window.onload = function() 
{ 
	browser.runtime.getBackgroundPage().then(
	function(bg){
				
		console.log("bg = " + bg);
		var elements = document.getElementsByTagName("input");
		console.log("length = " + elements.length);
		for(var i = 0; i < elements.length; i++)
		{
			if (elements[i].className == "xtool_checker_button")
				elements[i].addEventListener("click", buttonClick);
			else
				elements[i].addEventListener("click", itemClick);
			bg.XTCommands.updateElement(elements[i].id, updateElementInfo);
		}
		elements = document.getElementsByTagName("select");
		for(var i = 0; i < elements.length; i++)
			bg.XTCommands.updateElement(elements[i].id, updateElementInfo);
		elements = document.getElementsByTagName("label");
		for(var i = 0; i < elements.length; i++)
			bg.XTCommands.updateElement(elements[i].id, updateElementInfo);
		elements = document.getElementsByTagName("img");
		for(var i = 0; i < elements.length; i++)
		{
			bg.XTCommands.updateElement(elements[i].id, updateElementInfo);
			elements[i].addEventListener("click", itemClick);
		}
		elements = document.getElementsByTagName("a");
		for(var i = 0; i < elements.length; i++)
		{
			bg.XTCommands.updateElement(elements[i].id, updateElementInfo);
			elements[i].addEventListener("click", itemClick);
		}
		elements = document.getElementsByTagName("span");
		for(var i = 0; i < elements.length; i++)
		{
			bg.XTCommands.updateElement(elements[i].id, updateElementInfo);
		}
		var mode = document.getElementById("xtool_checker_mode");
		mode.addEventListener("change", modeChange);
		chrome.storage.local.get('mode', function(value) {
			var mode = document.getElementById("xtool_checker_mode");
			if (value.mode !== undefined)
				mode.value = value.mode;
			else
				mode.value = -1;
			});
		
	}, onError);
};
