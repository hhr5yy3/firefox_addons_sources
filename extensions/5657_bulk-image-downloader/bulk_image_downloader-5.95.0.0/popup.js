function click(script) {
  chrome.tabs.executeScript({file: script});
}

function OpenCurrentPage() { click( '/content_script.js' ); window.close(); } 
function EnqueueCurrentPage() { click( '/content_scriptq.js' ); window.close(); } 
function LinkExplorer() { click( '/content_scriptle.js' ); window.close(); } 
 
document.addEventListener('DOMContentLoaded', 
  function () { 
    document.getElementById('opencurrentpage').addEventListener('click', OpenCurrentPage); 
    document.getElementById('enqueuecurrentpage').addEventListener('click', EnqueueCurrentPage); 
    document.getElementById('linkexplorer').addEventListener('click', LinkExplorer); 
  });
 

  var bid = localStorage["bid"];
  if (!bid) { bid="true" };
  var bidqueue = localStorage["bidqueue"];
  if (!bidqueue) { bidqueue="true" };
  var bidle = localStorage["bidle"];
  if (!bidle) { bidle="true" };
  
  var count = 0;
  var defscript = "";

  if (bid=="true") {
    document.write( "<div id=\"opencurrentpage\" TITLE=\"Opens the current page with Bulk Image Downloader\"><img src=\"bid_16x.png\" hspace=5 align=\"top\">Open with BID</div>" );
	count += 1;
	defscript = "/content_script.js";
  };
  
  if (bidqueue=="true") {
    document.write( "<div id=\"enqueuecurrentpage\" TITLE=\"Adds the current page to the BID Queue Manager job queue\"><img src=\"bidred_16x.png\" hspace=\"5\" align=\"top\">Enqueue with BID</div>" );
	count += 1;
	defscript = "/content_scriptq.js";
  };

  if (bidle=="true") {
    document.write( "<div id=\"linkexplorer\" TITLE=\"Explore the links on the page with the BID Link Explorer\"><img src=\"bidred_le.png\" hspace=\"5\" align=\"top\">BID Link Explorer</div>" );
	count += 1;
	defscript = "/content_scriptle.js";
  };
  
  if ( count == 1 )
  {
	click(defscript);
	window.close();
  }

