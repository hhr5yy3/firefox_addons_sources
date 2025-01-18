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
	   
var dl=document.links; 
var linktext=""; 

for( var i=0; i < dl.length; i++ )
{
  if (( dl[i].href==linkUrl) && ( dl[i].text != "" ) ) 
  {
    linktext=escape(dl[i].text);
  }
};


var additionalInfo = {
  "what": "BIDQueue",
  "title": document.title,
  "cookie": document.cookie,
  "src": "",
  "linktext": linktext,
  "url": linkUrl,
  "ls": ls
  
};

browser.runtime.connect().postMessage(additionalInfo);