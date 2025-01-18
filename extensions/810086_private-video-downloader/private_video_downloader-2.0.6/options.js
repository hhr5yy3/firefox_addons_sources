"use strict";

var sHistoryList = localStorage.getItem("HistoryList");
var bAskForLocation = localStorage.getItem("AskLocation");

const elementFilter = document.querySelector("#idFilter");
const elementApply = document.querySelector("#idapply");
const elementOk  = document.querySelector("#idok");
const elementFilterLabel = document.querySelector("#idFilterLabel");
const elementLocation = document.querySelector("#askLocation");
const elementLocationLabel = document.querySelector("#askLocationLabel");

elementFilterLabel.innerText = chrome.i18n.getMessage("historyLabel");
elementLocationLabel.innerText = chrome.i18n.getMessage("locationLabel");


document.querySelector("#idh1").innerText = chrome.i18n.getMessage("idh1");
document.querySelector("#idh3a").innerText = chrome.i18n.getMessage("idh3a");
document.querySelector("#idh3b").innerText = chrome.i18n.getMessage("idh3b");
elementApply.innerText = chrome.i18n.getMessage("idapply");

elementFilter.value = sHistoryList;
elementLocation.checked = (bAskForLocation=="true"); 

function updatePref(fclose)
{	
	localStorage.setItem("HistoryList", elementFilter.value);
	localStorage.setItem("AskLocation", elementLocation.checked);
	chrome.runtime.sendMessage({ msg: "msgHistory", cmd: "setPrivateList", list: elementFilter.value },
	fclose?function (response) { window.close();}:undefined);
	
};
elementApply.addEventListener("click", function(e){updatePref(0);});
elementOk.addEventListener("click", function(e){updatePref(1);});


