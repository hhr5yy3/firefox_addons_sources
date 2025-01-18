
function getExtOptionsDB()
{
  return browser.extension.getBackgroundPage().getOptionsDB();
}

// Saves options to chrome.storage
function save_options() {

    var optionsDB = getExtOptionsDB();

    var LoggingOpt = optionsDB.getLoggingOpt();

    var proxy_automatic = document.getElementById('proxy-automatic').checked;
    var proxy_manual = document.getElementById('proxy-manual').checked;
    var proxy_direct = document.getElementById('proxy-direct').checked;
    var proxy_automatic_value = document.getElementById('proxy-automatic-select').value;
    var proxy_manual_http_host = document.getElementById('http-proxy-address').value;
    var proxy_manual_http_port = document.getElementById('http-proxy-port').value;
    var proxy_manual_https_host = document.getElementById('https-proxy-address').value;
    var proxy_manual_https_port = document.getElementById('https-proxy-port').value;
    var proxy_manual_http_non_proxy_hosts = document.getElementById('http-non-proxy-hosts').value;
    var logging = getLogging();

console.log("save_options: logging:"+logging);

    optionsDB.mProxySettings = {
      proxy_automatic : proxy_automatic,
      proxy_manual : proxy_manual,
      proxy_direct : proxy_direct,
      proxy_automatic_value : proxy_automatic_value,
      proxy_manual_http_host : proxy_manual_http_host,
      proxy_manual_http_port : proxy_manual_http_port,
      proxy_manual_https_host : proxy_manual_https_host,
      proxy_manual_https_port : proxy_manual_https_port,
      proxy_manual_http_non_proxy_hosts : proxy_manual_http_non_proxy_hosts,
      proxy_cached_address_size : optionsDB.proxy_cached_address_size,
      logging : logging
    };

    optionsDB.saveStaticOptions().then(
        function()
        {
          // Update status to let user know options were saved.
          var status = document.getElementById('status');
          status.textContent = 'Options saved.';
          setTimeout(function() {
            status.textContent = '';
          }, 750);
        },
        function( error )
        {
            var status = document.getElementById('status');
            var msg = "Failed to save extension static options : "+error;
            console.log(msg);
            status.textContent = msg;
            setTimeout(function() {
                status.textContent = '';
            }, 750);
        });
  }

function automaticProxyTest()
{
  var url = document.getElementById("proxy-automatic-url").value;
  var proxy_strategy = document.getElementById("proxy-automatic-select").value;
  document.getElementById('proxy-automatic-proxy').value = '';
  browser.extension.getBackgroundPage().automaticProxyTest( url, proxy_strategy );
}

/**
 * Clear the cache of address to proxy server values
 */
function clearProxyCache()
{
  getExtOptionsDB().clearCache();
  var /*HTMLTableElement*/ table = document.getElementById('proxy-cache-table');
  while( table.rows.length > 2 )
      table.deleteRow(-1);
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {

  var LoggingOpt = getExtOptionsDB().getLoggingOpt();

  getExtOptionsDB().loadStaticOptions().then( function(items) {
    document.getElementById('proxy-automatic').checked = items.proxy_automatic;
    document.getElementById('proxy-manual').checked = items.proxy_manual;
    document.getElementById('proxy-direct').checked = items.proxy_direct;
    selectOption( document.getElementById('proxy-automatic-select'), items.proxy_automatic_value );
    document.getElementById('http-proxy-address').value = items.proxy_manual_http_host;
    document.getElementById('http-proxy-port').value = items.proxy_manual_http_port;
    document.getElementById('https-proxy-address').value = items.proxy_manual_https_host;
    document.getElementById('https-proxy-port').value = items.proxy_manual_https_port;
    document.getElementById('http-non-proxy-hosts').value = items.proxy_manual_http_non_proxy_hosts;
    document.getElementById('proxy-automatic-proxy').value = '';

console.log("restore_options: logging:"+items.logging);

    switch( items.logging )
    {
      case LoggingOpt.NONE:
        document.getElementById("logging-off").checked = true;
        break;
      case LoggingOpt.BROWSER:
        document.getElementById("logging-browser-console").checked = true;
        break;
      case LoggingOpt.EXTENSION:
        document.getElementById("logging-extension").checked = true;
    }

    updateUIState();
  } );
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',save_options);
document.getElementById('proxy-automatic').addEventListener('click',updateUIState);
document.getElementById('proxy-manual').addEventListener('click',updateUIState);
document.getElementById('proxy-direct').addEventListener('click',updateUIState);
document.getElementById('proxy-automatic-test').addEventListener('click',automaticProxyTest);
document.getElementById('proxy-clear-cache').addEventListener('click',clearProxyCache);

document.getElementById('logging-off').addEventListener('click',updateLoggingOption);
document.getElementById('logging-browser-console').addEventListener('click',updateLoggingOption);
document.getElementById('logging-extension').addEventListener('click',updateLoggingOption);

initTabHandlers('tab','ext-tab-button',['proxy-tab','java-tab','native-tab','logging-tab'],'w3-gray');

// Init tab selection handlers. tabClass the class of tab, tabButtonClass, tabIds array of ids of tabs
function initTabHandlers( /*string*/ tabClass, /*string*/ tabButtonClass, /*Array<String>*/ tabIds, /*string*/ highlightClass ) {
  var tabButtons=document.getElementsByClassName(tabButtonClass);
  var tabs=document.getElementsByClassName(tabClass);
  for( var i=0; i<tabs.length; i++ )
  {
    var /*HTMLInputElement*/ tabButton = tabButtons[i];    
    tabButton.addEventListener('click', makeHandler(tabButtons,tabs,tabIds[i],highlightClass) );
  }
}

function updateRGBPanelVisibility( buttonIds, divIds ) {
  var /*Array<HTMLButtonElement>*/ buttons = [];
  var /*Array<HTMLDivElement>*/ divs = [];
  for( var i=0; i<buttonIds.length; i++ ){
    buttons[i] = document.getElementById(buttonIds[i]);
    divs[i] = document.getElementById(divIds[i]);
    divs[i].style.display = ( buttons[i].checked ? 'block' : 'none' );
  }
}
/* Returns a tab handler function for supplied tab */
function makeHandler( tabButtons, tabs, tabId, highlightClass )
{
  var myTabId = tabId;
  return function() {
    for( var i=0; i<tabs.length; i++ ) {
      if( tabs[i].id === myTabId ) {
        tabs[i].style.display = 'flex';
        tabButtons[i].className += (' '+highlightClass);
      } else {
        tabs[i].style.display = 'none';
        tabButtons[i].className = tabButtons[i].className.replace((' '+highlightClass),'');
      }
    }
  }
}

/* Utility to select supplied value item from HTML select */
function selectOption( /*HTMLSelectElement*/ control, /*object*/ value )
{
  var /*number*/ i=0, /*number*/ count = control.length;
  for( i=0; i<count; i++ )
  {
      var optionValue = control[i].value;
      if( optionValue == value ) {
          control.selectedIndex = i;
          break;
      }
  }
  if( i===count )
      control.selectedIndex = undefined;
}

/**
 * Result from queryProxy call is handled to this function from the background page
 * @param {*} proxySpec format is [DIRRECT|HTTP|SOCKS] [URL|NULL]
 */
function setProxyTestResponse( /*string*/ proxySpec )
{
  var /*string*/ proxyType = proxySpec.split(' ')[0];
  var /*string*/ proxyUrl = proxySpec.split(' ')[1];
  document.getElementById('proxy-automatic-proxy').value = proxyType === 'DIRECT' ? 'DIRECT' : proxyUrl;
}

/* Update the UI to match state */
function updateUIState()
{
  var extOptionsDB = getExtOptionsDB();
  var proxy_automatic = document.getElementById('proxy-automatic').checked;
  var proxy_manual = document.getElementById('proxy-manual').checked;

  // Enabled or disable the automatic proxy fields and table
  document.getElementById('proxy-automatic-select').disabled = !proxy_automatic;
  document.getElementById('proxy-automatic-proxy').disabled = !proxy_automatic;
  document.getElementById('proxy-automatic-test').disabled = !proxy_automatic;
  document.getElementById('proxy-automatic-url').disabled = !proxy_automatic;
  var /*HTMLTableElement*/ table = document.getElementById('proxy-cache-table');
  if( proxy_automatic )
  {
    if( extOptionsDB.mProxyMap != null )
    {
      extOptionsDB.mProxyMap.forEach(function( /*ProxyEntry*/ proxyEntry, /*string*/ url, /*Map<sytring,ProxyEntry>*/ map) {
        var /*HTMLTableRowElement*/ row = table.insertRow(-1);
        var /*HTMLTableCellElement*/ urlCell = row.insertCell(-1);
        urlCell.colSpan = 2;
        urlCell.appendChild( document.createTextNode(proxyEntry.url) );
        var /*HTMLTableCellElement*/ proxyCell = row.insertCell(-1);
        proxyCell.colSpan = 2;
        proxyCell.appendChild( document.createTextNode(proxyEntry.proxy) );
      });
    }      
  }
  else
  {
    while( table.rows.length > 2 )
      table.deleteRow(-1);
  }
  document.getElementById('http-proxy-address').disabled = !proxy_manual;
  document.getElementById('http-proxy-port').disabled = !proxy_manual;
  document.getElementById('https-proxy-address').disabled = !proxy_manual;
  document.getElementById('https-proxy-port').disabled = !proxy_manual;
  document.getElementById('http-non-proxy-hosts').disabled = !proxy_manual;

  updateRGBPanelVisibility(['proxy-automatic',      'proxy-manual',      'proxy-direct'],
                           ['proxy-automatic-panel','proxy-manual-panel','proxy-direct-panel']);
}

function setDiagnosticResponse( msg )
{
  // Populate the Java tab with available Java environments
  let /*HTMLTableElement*/ table = document.getElementById("java-versions-table");

  while( table.rows.length > 1 )
    table.deleteRow(-1);

  if( msg.environments ) {
      for( let i=0; i<msg.environments.length; i++ )
      {
        let javaEnv = msg.environments[i];
        let /*HTMLTableRowElement*/ row = table.insertRow(-1);
        let /*HTMLTableCellElement*/ nameCell = row.insertCell(-1);
        nameCell.appendChild( document.createTextNode(javaEnv.name) );
        let /*HTMLTableCellElement*/ homeCell = row.insertCell(-1);
        homeCell.appendChild( document.createTextNode(javaEnv.home) );
      }
  }

  // Populate the Native Application tab with details of the version of the native application
  let /*HTMLParagraphElement*/ versionPara = document.getElementById("native-app-version");
  let /*HTMLDivElement*/ nativeErrorPanel = document.getElementById("native-app-error-panel");
  nativeErrorPanel.className = nativeErrorPanel.className + ' w3-hide'; // Hide the error message
  let /*HTMLDivElement*/ nativeOkayPanel = document.getElementById("native-app-okay-panel");
  nativeOkayPanel.className = nativeOkayPanel.className.replace('w3-hide','');
  versionPara.children = null;
  versionPara.appendChild( document.createTextNode(msg.version) );
}

/* Returns the logging value from the UI */
function getLogging(){
  var logging_off = document.getElementById('logging-off').checked;
  var logging_browser_console = document.getElementById('logging-browser-console').checked;
  var LoggingOpt = getExtOptionsDB().getLoggingOpt();
  return logging_off ? LoggingOpt.NONE : logging_browser_console ? LoggingOpt.BROWSER : LoggingOpt.EXTENSION;
}

function updateLoggingOption(){
  getExtOptionsDB().setLogging( getLogging() );
  getExtOptionsDB().saveStaticOptions();
}

// Request background page queries diagnostics from native application
browser.extension.getBackgroundPage().launchDiagnostic();

// This is called from yje background script when one or more applications log information to stdout/stderr
function logInputListener( /*Array<string>*/ logLines ) {
    var /*HTMLPreElement*/ pre = document.getElementById("logging-pre");
    pre.textContent = logLines.join('\n');
}

browser.extension.getBackgroundPage().addLoggingListener( logInputListener );
