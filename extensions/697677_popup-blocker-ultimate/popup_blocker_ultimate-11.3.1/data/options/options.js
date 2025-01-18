function getDomain(url) {
  url = url.replace(/https?:\/\/(www.)?/i, '');
  if (url.indexOf('/') === -1) {
    return url;
  }
  return url.split('/')[0];
}
function saveOptions(e) {
	var mywhitelistPb = document.querySelector("#whitelistpb").value;
	var myBlackListPb = document.querySelector("#blacklistpb").value;
    browser.storage.local.set({
		whitelistpb: mywhitelistPb,
		blacklistpb: myBlackListPb
    });
	
	
	chrome.runtime.sendMessage({"path": 'options-to-background', "message": "saved"});
	
	
    e.preventDefault();
}

function restoreOptions() {
  var gettingItem = browser.storage.local.get('whitelistpb');
  gettingItem.then((res) => {
	  if (typeof (res.whitelistpb) != "undefined") {
		   document.querySelector("#whitelistpb").value = res.whitelistpb;
	  }   
  });
  var gettingItem = browser.storage.local.get('blacklistpb');
  gettingItem.then((res) => {
	  if (typeof (res.blacklistpb) != "undefined") {
		   document.querySelector("#blacklistpb").value = res.blacklistpb;
	  }   
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
