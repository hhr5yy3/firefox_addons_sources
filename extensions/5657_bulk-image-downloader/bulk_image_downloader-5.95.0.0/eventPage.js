 function executeBID(tab_id, url, agent, cookie, title, src, what, linktext, ls, lsurl ) {
  
    var hostName = "com.antibodysoftware.bulkimagedownloader";
	var savewhat = what;
	
	if ( what == "BIDLink" ) 
	  what = "BID";
	  
      var new_line = "%0D%0A";
	  
      var action_url = what + " Parameter File" + new_line + (url) + new_line + "cookies=FF" + new_line + "cookielist=" + (cookie) + new_line + "agent=" + (agent) + new_line + "pagetitle=" + escape(title) + new_line + "linktext=" + linktext;

	  action_url += new_line + "ls=" + ls;
	  action_url += new_line + "lsurl=" + lsurl;
	     
      if( what == "BID"	)
        action_url += new_line + "source=" + escape(src);
	
      browser.runtime.sendNativeMessage(  hostName, { text: action_url }, 
	    function( response ) {
		  var lastError = browser.runtime.lastError;
		  if ( lastError ) {
            chrome.tabs.create({url:"http://bulkimagedownloader.com/bid-installation-is-required/"} );
		  }
		  
		} );
	
  }

// A generic onclick callback function.
function OpenCurrentPageClick(info, tab) {
  chrome.tabs.executeScript({file: "content_script.js"});
}

function EnqueueCurrentPageClick(info, tab) {
  chrome.tabs.executeScript({file: "content_scriptq.js"});
}

function OpenLinkTargetClick(info, tab) {
	
      chrome.tabs.executeScript({code: "var linkUrl=\"" + info.linkUrl + "\";" }, function(){
        chrome.tabs.executeScript({ file: "content_scriptlink.js" } );
		});
				
}

function EnqueueLinkTargetClick(info, tab) {
  
      chrome.tabs.executeScript({code: "var linkUrl=\"" + info.linkUrl + "\";" }, function(){
        chrome.tabs.executeScript({ file: "content_scriptlinkq.js" } );
		});
		
}

function LinkExplorerClick(info, tab) {
  chrome.tabs.executeScript({file: "content_scriptle.js"});
}

function onClickHandler(info, tab) {
  
  if ( info.menuItemId == "bidopencurrentpage" )
  {
    OpenCurrentPageClick( info, tab );
  }
  else
  if ( info.menuItemId == "bidenqueuecurrentpage" )
  {
    EnqueueCurrentPageClick( info, tab );
  }
  else
  if ( info.menuItemId == "bidopenlinktarget" )
  {
    OpenLinkTargetClick( info, tab );
  }
  else
  if ( info.menuItemId == "bidenqueuelinktarget" )
  {
    EnqueueLinkTargetClick( info, tab );
  }
  else
  if ( info.menuItemId == "bidlinkexplorer" )
  {
    LinkExplorerClick( info, tab );
  }
   
};


function SetupContextMenu()
{
//  alert( "setup context menu" );
  
// Create one test item for each context type.
  var cmbid = localStorage["cmbid"];
  if (!cmbid) { cmbid="true" };
  
  var cmbidqueue = localStorage["cmbidqueue"];
  if (!cmbidqueue) { cmbidqueue="true" };
  
  var cmbidle = localStorage["cmbidle"];
  if (!cmbidle) { cmbidle="true" };

  var cmbidlink = localStorage["cmbidlink"];
  if (!cmbidlink) { cmbidlink="true" };
  
  var cmbidlinkqueue = localStorage["cmbidlinkqueue"];
  if (!cmbidlinkqueue) { cmbidlinkqueue="true" };
  
  var cmbidkeys = localStorage["cmbidkeys"];
  if (!cmbidkeys) { cmbidkeys="true" };
  
  chrome.contextMenus.removeAll();
  chrome.contextMenus.onClicked.addListener(onClickHandler);

  var bidkey = "";
  var bidopencurrentpage = "";
  var bidenqueuecurrentpage = "";
  var bidopenlinktarget = "";
  var bidenqueuelinktarget = "";
  var bidopenlinkexplorer = "";
  
  if ( cmbidkeys == "true")
  {
    bidkey = "&Z: ";
    bidopencurrentpage = "C: ";
    bidenqueuecurrentpage = "Q: ";
    bidopenlinktarget = "D: ";
    bidenqueuelinktarget = "E: ";
    bidopenlinkexplorer = "X: ";
	  
  }

  chrome.contextMenus.create({"title": bidkey + "Bulk Image Downloader", "id": "bidparent", "contexts":["page","selection","link","editable","image","video","audio"]});  
 
  if ( cmbid=="true" ) { 
    chrome.contextMenus.create({"title": bidopencurrentpage + "Open Current Page with BID  [Alt+Shift+C]", "parentId": "bidparent", "id":"bidopencurrentpage", "contexts":["page","selection","link","editable","image","video","audio"]
	 }); };
  
  if ( cmbidqueue=="true" ) { chrome.contextMenus.create({"title": bidenqueuecurrentpage + "Enqueue Current Page with BID  [Alt+Shift+Q]", "parentId": "bidparent", "id":"bidenqueuecurrentpage", "contexts":["page","selection","link","editable","image","video","audio"]}); };
  
  if ( cmbidlink=="true" ) { chrome.contextMenus.create({"title": bidopenlinktarget + "Open Link Target with BID", "parentId": "bidparent", "id":"bidopenlinktarget", "contexts":["link"] }); };
  
  if ( cmbidlinkqueue=="true" ) { chrome.contextMenus.create({"title": bidenqueuelinktarget + "Enqueue Link Target with BID", "parentId": "bidparent", "id":"bidenqueuelinktarget", "contexts":["link"] }); };
  
  if ( cmbidle=="true" ) { chrome.contextMenus.create({"title": bidopenlinkexplorer + "Open Current Page with BID Link Explorer  [Alt+Shift+X]", "parentId": "bidparent", "id":"bidlinkexplorer", "contexts":["page","selection","link","editable","image","video","audio"]}); };
 
} 


chrome.runtime.onInstalled.addListener(function() {
  SetupContextMenu();
});


chrome.runtime.onStartup.addListener(function() {
  SetupContextMenu();
});

  browser.runtime.onConnect.addListener(function(port) {
    var tab = port.sender.tab;

    port.onMessage.addListener(function(info) {
	  if ( info.url == "" )
	  {
        executeBID(tab.id, tab.url, navigator.userAgent, info.cookie, info.title, info.src, info.what, info.linktext, info.ls, tab.url);
      }
      else
      {
        executeBID(tab.id, info.url, navigator.userAgent, info.cookie, info.title, info.src, info.what, info.linktext, info.ls, tab.url);
      }	  
    });
  });

  
browser.commands.onCommand.addListener( (command) => {
  
  if (command == "bid-opencurrentpage") {
    chrome.tabs.executeScript({file: "content_script.js"});
    }
  else
  if (command == "bid-opencurrentpage2") {
    chrome.tabs.executeScript({file: "content_script.js"});
    }
  else
  if (command == "bid-enqueuecurrentpage") {
    chrome.tabs.executeScript({file: "content_scriptq.js"});
    }
  else
  if (command == "bid-linkexplorer") {
    chrome.tabs.executeScript({file: "content_scriptle.js"});
    }
  
});
