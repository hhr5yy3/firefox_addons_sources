//---------------------------------------------------------------------------//
//
// inEntertainment Plugin for Firefox
// Version: 6.0.2
//
// Last Modified: 2021-05-20
//
// 8/1/14 - Modified to support VarietyInsight
// 4/13/15 - Changed to common format used by ProjectImporter stack
// 10/09/17 - Changed to support new WebExtension version of Firefox
// 5/20/21 - Changed to support new universal CN site (app.castingnetworks.com)
// 12/1/22 - Updated Manifest to 6.2.0 to match Chrome plugin that added AltaiCasting support
// 11/30/22 - Updated Manifest to 6.4.0 to match Chrome plugin that added Luminate changes, Casting Network JSON support
//
//---------------------------------------------------------------------------//
//
// Uses the public domain FileServer library by Eli Grey (http://eligrey.com)
// to download the currently displayed web page contents to the Downloads 
// folder, and then launches inEntertainment so that it can retrieve and then 
// delete the file.
//
// NOTE: There was no other way to do this, as (a) Firefox can't download to any 
// other folder, (b) when trying to send a URL, the contents are limited to 
// 4096 characters on Windows, and (c) trying to upload the contents to the 
// IE Server and then retrieve them from IE was problematic at best.
//
// NOTE: The user will see the breakdown file being downloaded (it zooms to 
// the bottom of the window like any download would, and if they download more
// than one breakdown they will have to acknowledge the "download multiple 
// files" warning that Firefox provides.
//
//---------------------------------------------------------------------------//


var sCurrTabID = 0;
var sCurrTab = "";
var sApptsTab = "";
var tVersion = "6.4.0";
var sClickedIcon = false;

function hardSleep(ms) {
	var dt = new Date();
	dt.setTime(dt.getTime() + ms);
	while (new Date().getTime() < dt.getTime());
}

function launchIEForBreakdown(pFileName) {
    var tLineSep = escape(String.fromCharCode(11));
   	var IEURL = "inentertainment://" + tVersion + tLineSep + "Firefox" + tLineSep + escape(sCurrTab.url) + tLineSep + escape(pFileName) ;
	//console.log(IEURL);

    var tCurrURL = sCurrTab.url;

    // Launch IE

    var updateProps = {
       url: IEURL,
       active: true
    }
    try {
      hardSleep(2000);
      browser.tabs.update(sCurrTab.id,updateProps);
    } catch (e) {
      alert(e);
    }

 }

// Listen for any changes to the URL of any tab.

function runPlugin(tabs){
    sCurrTab = tabs[0];
    sCurrTabID = sCurrTab.id;
    if ((sCurrTab.url.indexOf("varietyinsight") > 0) || (sCurrTab.url.indexOf("luminate") > 0)) {
        launchIEForBreakdown("");  // current URL will have the track id we need
    } else {
        browser.tabs.executeScript(tab.id,{file: 'contentscript.js', allFrames:false});
    }        

}

function onError(error){
    console.log(`Error: ${error}`);
}

browser.commands.onCommand.addListener(function (command) {
    console.log(command);
    if (command == "execute-plugin") {
        let tabQuery = browser.tabs.query({active: true});
        tabQuery.then(runPlugin, onError);
    }
});


browser.runtime.onMessage.addListener(
	function(tMessage, sender, sendResponse) {
        //alert(sCurrTab.title);
        if ((sender.url.indexOf('app.castingnetworks.com') != -1) || (sender.url.indexOf('app.stg.castingnetworks.com') != -1)) {
            switch(tMessage) {
                case 'DoneExporting':
                    browser.tabs.remove(sApptsTab.id);
                    break;
                case 'RenderComplete':
                    console.log("Render complete.");
                    browser.tabs.executeScript(sApptsTab.id,{file: 'contentscript.js', allFrames:false});  
                    break;
                case 'ContinuePolling':
                    console.log("Waiting for page rendering to complete...");
                    break;
                default:
                    launchIEForBreakdown(tMessage);
            }
        } else {
            if (tMessage != 'DoneExporting') {
                launchIEForBreakdown(tMessage);
            }
        }    
	}
);

browser.tabs.onCreated.addListener(function(tab) {
  if (sCurrTab != undefined){
    if (sCurrTab.url != undefined) {
      if ((sCurrTab.url.indexOf("app.castingnetworks.com") > 0) || (sCurrTab.url.indexOf("app.stg.castingnetworks.com") > 0)) {
        sApptsTab = tab;
      }
    }
  }
});

browser.webNavigation.onCompleted.addListener(function(tab) {
  if (sClickedIcon == true){
    sClickedIcon = false;
    browser.tabs.executeScript(sApptsTab.id,{file: 'castingnetworks.js', allFrames:false});
  }
}, {
  url: [{
      // Runs on example.com, example.net, but also example.foo.com
      hostContains: 'castingnetworks.com'
  }],
});


function iconClicked(tab) {
    sCurrTab = tab;
    sCurrTabID = tab.id;
   	if (sCurrTab.url.indexOf("varietyinsight") > 0) {
   		launchIEForBreakdown("");  // current URL will have the track id we need
	} else {
        if ((sCurrTab.url.indexOf("app.castingnetworks.com") > 0) || (sCurrTab.url.indexOf("app.stg.castingnetworks.com") > 0)) {
          // Navigate to /appointments page in new tab; triggers 'chrome.tabs.onCreated'
          sClickedIcon = true;
          sApptsTab = browser.tabs.create({
            url: (sCurrTab.url + '/appointments/raw')
          });
        } else {
          browser.tabs.executeScript(tab.id,{file: 'contentscript.js', allFrames:false});
        }
    }
};

browser.browserAction.onClicked.addListener(iconClicked);