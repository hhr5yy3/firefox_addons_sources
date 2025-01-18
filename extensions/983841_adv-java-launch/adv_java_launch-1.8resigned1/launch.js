/*
The chrome download.search function is unreliable at the time of writing, in chrome version (69.0.3497.81)
the search function sometimes erroneously returns positive results for files which don’t exist.
So the following approach is used to limit the chaos which could ensue from the aforementioned issue.
On receiving a downloadSpec each resource is searched for using the downloads search.
If resources are found they are associated, via their download ID with the downloadSpec resource.
For items which are not found, a download is initiated and the resulting download ID is associated with the
downloadSpec resource.

When download status changes are received, the search is conducted again using the
existing IDs. For any items which suddenly change from being complete and file exists to file not exists,
a new download will be initiated and assoiacted with the resource. This process is repeated until all resources
are downloaded and AdvJavaLaunch native application is invoked and passed the download spec to launch Java.
*/

var /*Array<DownloadSpec>*/ pendingDownloadSpecs = []; // Holds unmodified downloadSpecs waiting processing

var /*DownloadSpec*/ activeDownloadSpec; // Holds the current download undergoing processing

var /*Set<DownloadSpec>*/ oldDownloadSpecs = new Set();

// Used to assign an ID to load specs
var /*number*/ specIdCounter = 0;

var optionsDB = null;

// Listen for changes in state of download items
browser.downloads.onChanged.addListener(handleChanged);
function handleChanged(delta) 
{
  if( delta.state )
  {
    if( delta.state.current === 'complete' || delta.state.current === 'interrupted' )
    {
      if( activeDownloadSpec != null )
      {
        var /*DownloadSpec*/ downloadSpec = activeDownloadSpec;
        checkAllDownloaded( downloadSpec ).then( function( /*Set<string>*/ missingUrls )
        {
          if( missingUrls.size == 0 && activeDownloadSpec == downloadSpec )
          {
              //launchJava( downloadSpec );
              assignProxy( downloadSpec, function( /*DownloadSpec*/ downloadSpec )
              {
                  // Proxy not required or assigned immedately
                  launchJava( downloadSpec );
              },
              function( downloadSpec ){
                  // System needs to interrorgate evironment to discover proxy
                  messageContentScript( { action:'msg', message:"Querying proxy settings..." } );
              } );
          }
        }).catch( function(error)
        {
            console.log("Error checkAllDownloaded:"+error);
        });
      };
    }
  }
console.log("handleChanged:"+JSON.stringify(delta));
}

/**
 * Is the supplied DownloadItem relevant?
 * @param {string} url 
 * @return boolean true if relevant to current download specs.
 */
function isDownloadURLRelevant( /*string*/ url )
{
  var /*boolean*/ relevant = false;
  if( activeDownloadSpec && findResourceByURL( activeDownloadSpec, url ) != null )
      relevant = true;
console.log("isDownloadURLRelevant:"+url+" = "+relevant);
  return relevant;
}

/**
 * Is the supplied download relevant i.e. used for one of current downloadSpec resources?
 * @param {number} id 
 * @return first matching downloadSpec or null.
 */
function isDownloadItemRelavent( /*number*/ id )
{
  var /*DownloadSpec*/ result = null;

  if( activeDownloadSpec && findResourceByDownloadId( activeDownloadSpec, id ) != null )
      return activeDownloadSpec;

  oldDownloadSpecs.forEach( function( /*DownloadSpec*/ downloadSpec )
  {
    if( findResourceByDownloadId( downloadSpec, id ) != null )
      result = downloadSpec;
  } );
  return result;
}

function findDownloadSpecById( /*string*/ id )
{
  return activeDownloadSpec && activeDownloadSpec.id == id ? activeDownloadSpec : null;
}

function matchesPendingDownload( /*DownloadSpec*/ downloadSpec )
{
  var searchText = JSON.stringify( downloadSpec );
  for( /*DownloadSpec*/ pendingDownload of pendingDownloadSpecs )
  {
    var text = JSON.stringify( pendingDownload );
    if( text == searchText )
      return true;
  }
  return false;
}

function registerLaunchRequest( /*DownloadSec*/ downloadSpec )
{
  if( matchesPendingDownload( downloadSpec ) )
  {
    // Already registered, here we'll message the user indicating we're already regsiered this request
    messageContentScript( { action:'msg', message:"Already registered for download. Please wait" } );
  }
  else
  {
    pendingDownloadSpecs.push( downloadSpec );
    processNextLaunchRequest();
  }
}

function processNextLaunchRequest()
{
  if( activeDownloadSpec == null  )
  {
    if( pendingDownloadSpecs.length > 0 )
      launch( pendingDownloadSpecs[0] );
    else
      oldDownloadSpecs.clear();
  }
}

/**
 * Initiate downloading of supplied download spcification's JAR files.
 * @param {*} downloadSpec 
 */
function launch( /*DownloadSpec*/ downloadSpec )
{
  // We create a clone of the original request which we mutate whist processing request
  activeDownloadSpec = JSON.parse( JSON.stringify(downloadSpec) );
  // Remember to point to the original request from the clone
  activeDownloadSpec.originalDownloadSpec = downloadSpec;
  downloadSpec = activeDownloadSpec;

  // Add the mandatory message attribute
  downloadSpec.action = "launch";

  // Assign the download a unique (within this extension) id
  downloadSpec.id = "lid"+(++specIdCounter);

  // Calculate a download directory based on the URL of the first resource
  assignDownloadDirectory( downloadSpec ).then( function()
  {
    var searchPromises = searchForResources( downloadSpec, true );

    var urlsToLoad = queryRequiredUrls( downloadSpec );

    Promise.all( searchPromises ).then( function( /*Array<Array<DownloadItem>>*/ searchResults )
    {
      for( var /*Array<DownloadItem>*/ searchArray of searchResults )
      {
          for( var /*DownloadItem*/ downloadItem of searchArray )
          {
  console.log("Found : "+JSON.stringify( downloadItem ) );
              if( downloadItem.state === 'complete' )
              {
                  urlsToLoad.delete( downloadItem.url );
                  // The resource in the download spec needs to have the local filename attribute set from the downloadItem
                  // and assign a downloadID to the resource
                  updateDownloadSpecResource( downloadSpec, downloadItem );
              }
          }
      }
    
      // Items remaining in Set urlsToDownload need to be downloaded.
      if( urlsToLoad.size == 0 && activeDownloadSpec == downloadSpec )
      {
          // launchJava( downloadSpec );
          assignProxy( downloadSpec, function( /*DownloadSpec*/ downloadSpec )
          {
              // Proxy not required or assigned immedately
              launchJava( downloadSpec );
          },
          function( downloadSpec ){
              // System needs to interrorgate evironment to discover proxy
              messageContentScript( { action:'msg', message:"Querying proxy settings..." } );
          } );
      }
      else
      {
          // Start a download for the URLs which don't exist.
          for( i=0; i<downloadSpec.resources.length; i++ )
          {
              var resource = downloadSpec.resources[i];
              resource.filename = resource.href.substring(resource.href.lastIndexOf('/')+1);
              if( urlsToLoad.has( resource.href ) )
              {
//console.log("launch::starting download for: "+resource.href);
                var options =
                {
                    conflictAction : 'overwrite',
                    url: resource.href,
                    filename: 'advjavalaunch/'+ downloadSpec.dir + '/' + resource.filename
                };

                messageContentScript( {action:'message',message:'Downloading '+resource.filename} );

                browser.downloads.download( options ).then( function( id )
                {
                    if( id === undefined )
                      console.log("ERROR: download in launch for : "+this.href);
                    else
                    {
                      // The function instance is bound to the DownloadSpec resource, so its a simple
                      // assignment to associate the download ID with the correct resource.
                      this.downloadId = id;
                      console.log("Download ID:"+this.downloadId+" assigned to "+this.href);
                    }
                }.bind( resource ),
                function error ( error ){
                  console.log("launch: failed to start download for"+this.downloadId+" error:"+error);
                } );
              }
          }
      }
    }).catch( function(error)
    {
      console.log("Error launch:"+error);
    });
  });
}

/*
* Check to see if all JARs for the supplied downloadSpec has been downloaded.
* Process is to issue a search for all url resources required by the downloadSpec.
* Once all resources are accounted for the function returns a promise
* @return Promise(true|Set<string> missing URLS)
*/
function checkAllDownloaded( /*DownloadSpec*/ downloadSpec )
{
  var /*Set<string>*/ urlsToLoad = queryRequiredUrls( downloadSpec );
  
  return Promise.all( searchForResourcesByDownloadId( downloadSpec ) ).then( function( /*Array<Array<DownloadItem>>*/ matchedDownloads )
  {
    var /*Set<string>*/ inFlightDownloads = new Set();
    var /*Set<downloadItem>*/ completeButNowMissingFile = new Set();

    for( var /*Array<DownloadItem>*/ searchArray of matchedDownloads )
    {
        for( var /*DownloadItem*/ downloadItem of searchArray )
        {
//console.log("checkAllDownloaded found : "+JSON.stringify( downloadItem ) );            
console.log("checkAllDownloaded found : URL:"+downloadItem.url+" State:"+downloadItem.state+" exists:"+downloadItem.exists );            
            if( downloadItem.state == 'complete' && downloadItem.exists )            
            {
                urlsToLoad.delete( downloadItem.url );                
                // The resource in the download spec needs to have the local filename attribute set from the downloadItem
                updateDownloadSpecResource( downloadSpec, downloadItem );                
            }
            else if( downloadItem.state == 'in_progress' )
            {
              inFlightDownloads.add( downloadItem.url );
            }
            else if( downloadItem.state == 'complete' && !downloadItem.exists )
            {
              // This could be an instance where the browser thought it had the file but now its not there, 
              // or maybe the user removed it. Either way we'll need to download it.
              completeButNowMissingFile.add(downloadItem);
console.log("EEEE its one of those funny ones --> "+downloadItem.url);
            }
            else if( downloadItem.state == 'interrupted' )
            {
              // Cancel all downloads...
              for( var /*DownloadItem*/ dli of searchArray )
                browser.downloads.cancel( dli.id );
              // Here we'll initially simply log a fatal launch error and report details to user.
              handleFatalError( { id:downloadSpec.id, action:'fatalError',
                                  message:"Failed when downloading "+downloadItem.url+" error:"+downloadItem.error } );
              return urlsToLoad; // Sharp exit...
            }
        }
    }      
   
console.log("checkAllDownloaded::requiredUrls.size = "+urlsToLoad.size+" inFlightUrls:"+inFlightDownloads.size);

    if( inFlightDownloads.size == 0 && completeButNowMissingFile.size > 0 )
    {
      for( var /*DownloadItem*/ downloadItem of completeButNowMissingFile )
      {
        var resource = findResourceByURL( downloadSpec, downloadItem.url );

        if( resource != null )
        {          
          var /*string*/ url = downloadItem.url;
          resource.filename = url.substring(url.lastIndexOf('/')+1);
          var options =
          {
              conflictAction : 'overwrite',
              url: resource.href,
              filename: 'advjavalaunch/'+ downloadSpec.dir + '/' + resource.filename
          };

          messageContentScript( {action:'message', message:'Downloading '+resource.filename} );              

          browser.downloads.download( options ).then( 
            function(id) { 
              if( id == undefined )
               console.log("Failed to initiate download for "+resource.href);
              else
              {
                this.downloadId = id; 
                console.log("Assigned downloadID : "+id+" to "+resource.href);
              }
            }.bind(resource), 
            function(error){ console.log("checkAllDownload failed to start download:"+error); } );
        }
        else
          console.log("Failed to locate resource for url:"+downloadItem.url);
      }        
    }

    return urlsToLoad;
  });
} 

/**
 * Initiate a search for all resources required for the downloadSpec
 * @param {*} downloadSpec the download specification whose resources are to be searched for
 * @param {*} mustExist must the file exist?
 * @return Array<Promise>
 */
function searchForResources( /*DownloadSpec*/ downloadSpec, /*boolean*/ mustExist )
{
  var /*number*/ i;
  var /*Array<Promise>*/ searchPromises = [];
  for( i=0; i<downloadSpec.resources.length; i++ )
  {
    var /*Resource*/ resource = downloadSpec.resources[i];
    resource.filename = resource.href.substring(resource.href.lastIndexOf('/')+1);
    var searchCriteria = {url:resource.href,orderBy:['-startTime']};
    if( mustExist )
      searchCriteria.exists = true;              
    searchPromises.push(browser.downloads.search( searchCriteria ));      
  }
  return searchPromises;  
}

/**
 * Initiate a search for all resources required for the downloadSpec
 * @param {*} downloadSpec the download specification whose resources are to be searched for
 * @return Array<Promise>
 */
function searchForResourcesByDownloadId( /*DownloadSpec*/ downloadSpec )
{
  var /*number*/ i;
  var /*Array<Promise>*/ searchPromises = [];
  for( i=0; i<downloadSpec.resources.length; i++ )
  {
    var /*Resource*/ resource = downloadSpec.resources[i];
    if( resource.downloadId )
      searchPromises.push(browser.downloads.search( {id:resource.downloadId} ));      
  }
  return searchPromises;  
}

/**
 * Locates and returns the Resource in the download spec which matches the supplied URL
 * @param {DownloadSpec} downloadSpec download spec to search
 * @param {string} url the url to look for
 * @return download spec Resource or null if not found
 */
function findResourceByURL( /*DownloadSpec*/ downloadSpec, /*string*/ url )
{
  var /*number*/ i;
  var /*Array<Promise>*/ searchPromises = [];
  for( i=0; i<downloadSpec.resources.length; i++ )
  {
    var /*Resource*/ resource = downloadSpec.resources[i];
    if( resource.href == url )
      return resource;
  }
  return null;  
}

/**
 * Locates and returns the Resource in the download spec which matches the supplied downloadId
 * @param {DownloadSpec} downloadSpec download spec to search
 * @param {number} id the downloadId to look for
 * @return download spec Resource or null if not found
 */
function findResourceByDownloadId( /*DownloadSpec*/ downloadSpec, /*number*/ id )
{
  var /*number*/ i;
  var /*Array<Promise>*/ searchPromises = [];
  for( i=0; i<downloadSpec.resources.length; i++ )
  {
    var /*Resource*/ resource = downloadSpec.resources[i];
    if( resource.hasOwnProperty('downloadId') && resource.downloadId == id )
      return resource;
  }
  return null;  
}

/**
 * Update the download specs resource matching the URL of the supplied download item to define the local filename of
 * the resource, on windows this will be something like "c:\\My Docs\\downloads\\adjlaunchjava\\xyz.jar"
 * @param {DownloadSpec} downloadSpec 
 * @param {DownloadItem} downloadItem 
 */
function updateDownloadSpecResource( /*DownloadSpec*/ downloadSpec, /*DownloadItem*/ downloadItem )
{
  var /*numbner*/ i;
  for( i=0; i<downloadSpec.resources.length; i++ )
  {
    var /*Resource*/ resource = downloadSpec.resources[i];
    if( resource.href === downloadItem.url )
    {
      resource.filename = downloadItem.filename;
      resource.downloadId = downloadItem.id;
      break;
    }
  }
}

/**
 * Returns Set<string> containing the required URLS needed by the download spec
 * @param {DownloadSpec} downloadSpec 
 * @return Set<string> required urls
 */
function queryRequiredUrls( /*DwonloadSpec*/ downloadSpec )
{
  var /*number*/ i;
  var /*Set<string>*/ requiredUrls = new Set();
  for( i=0; i<downloadSpec.resources.length; i++ )
  {
    var /*Resource*/ resource = downloadSpec.resources[i];
    requiredUrls.add( resource.href );
  }
  return requiredUrls;  
}

function removeDownloadSpec( /*string*/ id )
{
  if( activeDownloadSpec && activeDownloadSpec.id == id )
  {
    var /*number*/ index = pendingDownloadSpecs.indexOf( activeDownloadSpec.originalDownloadSpec );
    if( index != -1 )
      pendingDownloadSpecs.splice( index, 1 );
    oldDownloadSpecs.add( activeDownloadSpec );
    activeDownloadSpec = null;
  }
}

/**
 * The native application advjavalaunch has supplied a launched message
 * @param {JSON} msg 
 */
function handleLaunched( msg )
{
  var /*string*/ id = msg.id;
  removeDownloadSpec( id );
  messageContentScript( msg );
  processNextLaunchRequest();
}

/**
 * The native application advjavalaunch has supplied a information message
 * @param {JSON} msg 
 */
function handleInformationMessage( msg )
{
  messageContentScript( msg );  
}

/**
 * Native application encountered fatal error
 * @param {JSON} msg 
 */
function handleFatalError( msg )
{
  // Clear out downloadspecs which match the supplied ID
  var /*string*/ id = msg.id;
  removeDownloadSpec( id );

  // Message launch application to inform of issue
  console.log("handleFataError:"+JSON.stringify(msg));
  messageContentScript( msg );  

  processNextLaunchRequest();
}

var /*Array<string>*/ logLines = [];
var maxLogLines = 500;
var logListeners = [];

function addLoggingListener( /*function*/ f ){ logListeners.push(f); }
function removeLoggingListener( /*function*/ f )
{
    logListeners = logListeners.filter( (subscriber) => subscriber !== f );
}
function fireLoggingChange()
{
    logListeners.forEach( function(subscriber) {
        try {
            subscriber(logLines);
        } catch( e ) {
            // Can be a dead object - not simple to detect when options panel/tab is dismissed.
            removeLoggingListener( subscriber );
        }
    } );
}
function getLogLines(){ return logLines; }

function handleStdOutOrStdErrMessage( msg )
{
    switch( getOptionsDB().getLogging() )
    {
        case LoggingOpt.EXTENSION:
            for( var line of msg.lines ) {
                var text = msg.action+' '+line;
                if( logLines.length > maxLogLines )
                    logLines.shift();
                logLines.push(text);
            }
            fireLoggingChange();
            break;
        case LoggingOpt.BROWSER:
            for( var line of msg.lines )
                console.log(msg.action+' '+line);
            break;
    }
}

/**
 * The advjavalaunch native application has supplied a verification fail message.
 * This could mean some or all of the required resources are out of date and simply 
 * need donloading. 
 */
function handleVerificationFail( msg )
{
console.log("handleVerificationFail"+JSON.stringify(msg));

  var /*Array<string>*/ urls = msg.urls, /*number*/ i;

  var /*Array<Promise>*/ searchPromises = [];

  var /*DownloadSpec*/ downloadSpec = findDownloadSpecById( msg.id );

  if( !downloadSpec )
  {
    console.log("handleVerificationFail: failed to locate downloadSpec with ID: "+msg.id);
    return;
  }

  for( i=0; i<urls.length; i++ )
  {
    // Find and delete/erase existing downloades
    searchPromises.push( browser.downloads.search({url:urls[i],exists:true}) );    
  }

  Promise.all( searchPromises ).then( function( /*Array<Array<DownloadItem>>*/ matchedDownloads )
  {
    // First remove the files which failed verification (note these sometimes fail as they don't exist - silly browser)
    var removeFilePromises = [];
    for( var /*Array<DownloadItem>*/ searchArray of matchedDownloads )
    {
      var i=0;
      for( i=0; i<searchArray.length; i++ )
      {
        var /*DownloadItem*/ downloadItem = searchArray[i];
        removeFilePromises.push( browser.downloads.removeFile( downloadItem.id ) );          
      }        
    }          

    function removeDownloads()
    {
      // Then remove the download items
      var removeDownloadPromises = [];
      for( var /*Array<DownloadItem>*/ searchArray of matchedDownloads )
      {
        var i=0;
        for( i=0; i<searchArray.length; i++ )
        {
          var /*DownloadItem*/ downloadItem = searchArray[i];
          removeDownloadPromises.push( browser.downloads.erase ( {url:downloadItem.url,exists:true} ) );          
        }        
      }          

      // Once they are all removed. We can request the browser download a fresh copy from server.

      function redoDownloads()
      {
        for( var url of urls )
        {
          var filename = url.substring(url.lastIndexOf('/')+1);
          var resource = findResourceByURL( downloadSpec, url );
          if( resource )
          {
                var options =
                {
                  conflictAction : 'overwrite',
                  url: url,
                  saveAs: false,
                  filename: 'advjavalaunch/' + downloadSpec.dir + '/' + filename
                };

console.log("downloadURLs: request DOWNLOAD url:"+url+" to "+filename);

                messageContentScript( {action:'message', message:'Downloading '+filename} );

                browser.downloads.download( options ).then( function( /*number*/ id ){ this.downloadId = id; }.bind( resource ) );
          }
        }
      }
      Promise.all( removeDownloadPromises ).then( redoDownloads, redoDownloads );
    }
  Promise.all( removeFilePromises ).then( removeDownloads, removeDownloads );
  });
}

/**
 * Launch oneAdvanced native application to start-up Java
 * @param {*} downloadSpec 
 */
function launchJava( /*DownloadSpec*/ downloadSpec )
{
  var port = browser.runtime.connectNative("advjavalaunch");
  port.onMessage.addListener( function(msg){
    if( msg.action === 'stdout' || msg.action === 'stderr')
      handleStdOutOrStdErrMessage(msg);
    else if( msg.action === 'verificationFail' ) {
      handleVerificationFail( msg );
    } else if( msg.action === 'launched' ) {
      handleLaunched( msg );
    } else if( msg.action === 'fatalError' ) {
      handleFatalError( msg );
    } else if( msg.action === 'message' )
      handleInformationMessage( msg );
    else if( msg.action === 'queryProxy' )
      handleQueryProxyResponse( msg );
    else if( msg.action === 'diagnostic' )
      handleDiagnosticResponse( msg );
    else
      console.log("Unexpected msg from native application:"+JSON.stringify(msg));    
  } );
  port.onDisconnect.addListener(function(/*Port*/ p) {
    if( p.error )
    {      
      console.log("Native application launch error:"+p.error.message);
      handleFatalError({action:'fataError',id:downloadSpec.id,message:p.error.message});
    }
    console.log("Disconnected");
  });  
  var /*DownloadSpec*/ originalDownloadSpec = downloadSpec.originalDownloadSpec;
  downloadSpec.originalDownloadSpec = null;
  port.postMessage(downloadSpec);
  downloadSpec.originalDownloadSpec = originalDownloadSpec;
}

/*
* The following section handles communication with the content script.
*/ 
var /*Map<Port,String>*/ contentPortSet = new Set();
//var content_ports = []
function connectedToContentScript(p) 
{
  contentPortSet.add( p );
  p.onMessage.addListener( function(response)
  {
    console.log("Background script recieved:"+JSON.stringify(response));    
    registerLaunchRequest( response.msg );
  } );
  p.onDisconnect.addListener(function(p){
    contentPortSet.delete(p);
  });
}

/*
* Send a message back to the content page.
*/
function messageContentScript(/*string*/ msg)
{
  // Send to all currently connected ports
  contentPortSet.forEach( function(port){ port.postMessage(msg); } );
//content_ports.forEach( p => {p.postMessage(msg);} );
  console.log("messageContentScript:: port count :"+contentPortSet.size);
}

browser.runtime.onConnect.addListener(connectedToContentScript);
/*
* End of content scripts communication 
*/

/*
* Use the first resource href to calculate a directory name using SHA256 digest
*/
function assignDownloadDirectory( /*DownloadSpec*/ downloadSpec ) {
  for( var resource of downloadSpec.resources )
  {
    var /*string*/ contextURL = resource.href.substring(0,resource.href.lastIndexOf('/'));
    return sha256( contextURL ).then( function(/*string*/ digest){ downloadSpec.dir = digest; } );
  }
}

function sha256(str) {
  // We transform the string into an arraybuffer.
  var buffer = new TextEncoder("utf-8").encode(str);
  return crypto.subtle.digest("SHA-256", buffer).then(function (hash) {
    return hex(hash);
  });
}

function hex(buffer) {
  var hexCodes = [];
  var view = new DataView(buffer);
  for (var i = 0; i < view.byteLength; i += 4) {
    // Using getUint32 reduces the number of iterations needed (we process 4 bytes each time)
    var value = view.getUint32(i)
    // toString(16) will give the hex representation of the number without padding
    var stringValue = value.toString(16)
    // We use concatenation and slice for padding
    var padding = '00000000'
    var paddedValue = (padding + stringValue).slice(-padding.length)
    hexCodes.push(paddedValue);
  }

  // Join all the hex strings into one
  return hexCodes.join("");
}

var sQueryProxyId=0;

/**
 * Query details of the proxy server to use for the supplied url and stragegy
 * @param {*} url string form of the ulr to check
 * @param {*} strategy string representation of strategy to employ with proxy-vole e.g. BROWSER, IE, OS_DEFAULT, IE etc.
 */
function automaticProxyTest( /*string*/ url, /*string*/ strategy )
{
    var id = 'testQueryProxyId'+sQueryProxyId;
    sQueryProxyId++;
    var launchObject = { action: 'queryProxy', strategies : strategy, url:url, id:id };
    launchJava( launchObject );
}

/**
 * Register a automatic proxy query for the supplied url
 * @param {*} downloadId the id of the download/launch Id
 * @param {*} url the url to query
 * @param {*} strategy the stategy to use (proxy-mole)
 */
function automaticProxyQuery( /*string*/ downloadId, /*string*/ url, /*strategy*/ strategy )
{
    var launchObject = { action: 'queryProxy', strategies: strategy, url:url, id:downloadId };
    launchJava( launchObject );
}

/**
 * Process queryProxy response from native application.
 * The response will look something like [DIRECT|HTTP|SOCKS] proxy_url
 * @param {*} msg the full message from the native application the wrapped message part contains the proxy details
 */
function handleQueryProxyResponse( /*JSON*/ msg )
{
    if( msg.id.startsWith('testQueryProxyId') ) {
        // This is a response to a automatic proxy test so update extension options page
        var /*Array<Window>*/ popups = browser.extension.getViews();
        var /*number*/ i, windowCount=popups.length;
        for( i=0; i<windowCount; i++ ) {
            if( popups[i].setProxyTestResponse ) {
                popups[i].setProxyTestResponse( msg.message );
            }
        }
    } else {
        // This is a response to a automatic proxy query for a launch...so retrieve launch and continue
        var /*DownloadSpec*/ downloadSpec = findDownloadSpecById( msg.id );
        if( downloadSpec )
        {
            getOptionsDB().setProxy( downloadSpec.codebase, msg.message );
            getOptionsDB().saveProxyMap();
            var /*ProxyResponse*/ proxy = getOptionsDB().getProxy( downloadSpec.codebase );
            if( proxy )
                addProxyDetailsToDownload( downloadSpec, proxy );
            launchJava( downloadSpec );
        }
    }
}

/*
* Returns extention's options database object.
*/
function getOptionsDB()
{
    if( optionsDB == null )
    {
        optionsDB = new ExtOptionsDB();
        optionsDB.loadStaticOptions().then(
            function( options )
            { optionsDB.loadProxyMap() },
            function( error )
            {
                console.log("Failed to load extension options:"+error);
            });
    }
    return optionsDB;
}

/**
 * Assess and assign proxy information to the download specifiction. This method examines the options configured for
 * the extension and depending on configuration either assigns proxy details (if required) and invoked the immedaite launch
 * callback, or for instances where automatic proxy configuration is enabled and nothing is cached for the supplied
 * launch url, invokes automaticProxyQuery and then the deferred callback handler. Once the results from the query proxy
 * call return, the download launch will continue.
 *
 * @param {*} downloadSpec the downloadSpec
 * @param {*} immediateLaunch callback for immediate launch
 * @param {*} deferLaunch callback for deferred launch due to async proxy query
 */
function assignProxy( /*DownloadSpec*/ downloadSpec, /*Function*/ immediateLaunch, /*Function*/ deferLaunch )
{
    var /*ProxyResponse*/ proxy = getOptionsDB().getProxy( downloadSpec.codebase );
    if( proxy ) {
        addProxyDetailsToDownload( downloadSpec, proxy );
        immediateLaunch( downloadSpec );
    }
    else
    {
        automaticProxyQuery( downloadSpec.id, downloadSpec.codebase, getOptionsDB().mProxySettings.proxy_automatic_value );
        deferLaunch( downloadSpec );
    }
}

/**
 * Add proxy details to download spec
 * @param {*} download
 * @param {*} proxyResponse
 */
function addProxyDetailsToDownload( /*DownloadSpec*/ download, /*ProxyResponse*/ proxyResponse ){
    var /*Array<{name:xyx,value:abc}>*/ environemntEntries = proxyResponse.getEnvironmentOptions();
    if( !download.jse.environment )
        download.jse.environment = [];
    for( var i=0; i<environemntEntries.length; i++ ) {
        download.jse.environment.push( environemntEntries[i] );
    }
}

/**
 * Contact the native application and request diagnostic response.
 */
function launchDiagnostic()
{
    var launchObject = { action: 'diagnostic', id:"diagId" };
    launchJava( launchObject );
}

function handleDiagnosticResponse( msg ) {
    var /*Array<Window>*/ popups = browser.extension.getViews();
    var /*number*/ i, windowCount=popups.length;
    for( i=0; i<windowCount; i++ ) {
        if( popups[i].setDiagnosticResponse ) {
            popups[i].setDiagnosticResponse( msg.message );
        }
    }
}

getOptionsDB().getLoggingOpt(); // Force load of options.
