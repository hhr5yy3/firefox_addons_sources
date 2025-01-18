class ProxyEntry
{
  constructor( /*string*/ url, /*string*/ proxy ) {
  this.url = url;
  this.proxy = proxy;
  }
}

const LoggingOpt = { NONE: "NONE", BROWSER : "BROWSER", EXTENSION : "EXTENSION" };

class ExtOptions {
  constructor() {
      this.proxy_automatic = false;
      this.proxy_manual = false;
      this.proxy_direct = true;
      this.proxy_automatic_value = 'BROWSER';
      this.proxy_cached_address_size = 0;
      this.proxy_manual_http_host = null;
      this.proxy_manual_http_port = null;
      this.proxy_manual_https_host = null;
      this.proxy_manual_https_port = null;
      this.proxy_manual_http_non_proxy_hosts = null;
      this.logging = LoggingOpt.NONE;
  }
}

/*
* Need to store httpProxyHost=xxx, httpProxyPort=nnn, httpsProxyHost=xxx, httpsProxyPort=www, 
* http.nonProxyHosts="hostA|hostB*|xyz"
*/
class ProxyResponse {
  constructor() {
    this.httpProxyHost=null;
    this.httpProxyPort=null;
    this.httpsProxyHost=null;
    this.httpsProxyPort=null;
    this.httpnonProxyHosts=null;
  }

  setHttpProxy( host, port ){
    this.httpProxyHost = host;
    this.httpProxyPort = port;
  }

  setHttpsProxy( host, port ){
    this.httpsProxyHost = host;
    this.httpsProxyPort = port;
  }

  setHttpNonProxyHosts( nonProxyHosts )
  {
    this.httpnonProxyHosts = nonProxyHosts;
  }

  getEnvironmentOptions() {
    var result=[];
    if( this.httpProxyHost )
      result.push( { name:'http.proxyHost', value:this.httpProxyHost } );
    if( this.httpProxyPort )
      result.push( { name:'http.proxyPort', value:this.httpProxyPort } );
    if( this.httpsProxyHost )
      result.push( { name:'https.proxyHost', value:this.httpsProxyHost } );
    if( this.httpsProxyPort )
      result.push( { name:'https.proxyPort', value:this.httpsProxyPort } );
    if( this.httpnonProxyHosts )
      result.push( { name:'http.nonProxyHosts', value:this.httpnonProxyHosts } );
    return result;
  }
}

class ExtOptionsDB
{
  constructor(){
    /*Map<string,ProxyEntry>*/ this.mProxyMap = null;
    /*ExtOptions*/ this.mProxySettings = null;
  }

  /* Loads static properties used by extension */
  loadStaticOptions()
  {
    var items = new ExtOptions();
    var that=this;

    return new Promise( function( resolve, reject ) { 
      browser.storage.sync.get( items, function(items) {
      if( browser.runtime.lastError )
        reject( browser.runtime.lastError );
      else 
      {
        that.mProxySettings = items; 
        resolve( items );
      }  
    })});
  }

  /* Save static properties to browser storage */
  saveStaticOptions()
  {
      var that=this;

      this.mProxySettings.proxy_cached_address_size = ( this.mProxyMap ? this.mProxyMap.size : 0 );

      return new Promise( function( resolve, reject ) {
        browser.storage.sync.set( that.mProxySettings, function()
        {
            if( browser.runtime.lastError )
                reject( browser.runtime.lastError );
            else
                resolve( that.mProxySettings );                                
        })            
      });
  }

  /* Save the Map of proxies to browser storage */
  loadProxyMap()
  {
    var that=this;
    return new Promise( function( resolve, reject )
    {
        if( that.mProxyMap == null )
          that.mProxyMap = new Map();
        else  
          that.mProxyMap.clear();
        var /*number*/ i;
        var cachedProxies = {};
        for( i=0; i<that.mProxySettings.proxy_cached_address_size; i++ ) {
          cachedProxies[ "proxy_"+i ] = null;        
        }
        browser.storage.sync.get( cachedProxies, function( storedProxies )
        {
          if( browser.runtime.lastError ) {
            reject( browser.runtime.lastError );
          } else {          
            // Cycle through the cached proxies and build map
            for( i=0; i<that.mProxySettings.proxy_cached_address_size; i++ ) {
              var /*ProxyEntry*/ entry = cachedProxies[ "proxy_"+i ];
              if( entry )
                that.mProxyMap.set( entry.url, entry );
            }            
            resolve( that );
          }
        } );
    });
  }

  /* Save the Map of proxies to browser storage returning the number of entries to worked function of Promise */
  saveProxyMap()
  {
    var that=this;
    return new Promise( function( resolve, reject )
    {
      if( that.mProxyMap != null )
      {
        var cachedProxies = {};
        var index=0;  
        that.mProxyMap.forEach( function( /*[string,ProxyEntry]*/ entry, key, map ) { 
          cachedProxies[ "proxy_"+index ] = entry;
          index++;
        } );
        browser.storage.sync.set( cachedProxies, function() {
          if( browser.runtime.lastError )
            reject( browser.runtime.lastError );
          else
            resolve( index );
        })
      }
    });
  }

  /**
   * Returns suitable proxy for supplied URL. Note for autoatic proxy detection for a new URL null will be returned, this 
   * does not indicate use a direct proxy, rather than proxy detection via proxy-vole needs to be invoked, then the 
   * result stored with setProxy.
   * @param {*} url the url to lookup 
   * @return null if no proxy found, a valid proxy url or 'direct' for no proxy required.
   */
  getProxy( /*string*/ url ) {
    var that=this;
    if( this.mProxyMap == null )
      return this.loadProxyMap().then( function(){ that.getProxy( url ); } );
    if( this.mProxySettings.proxy_automatic )
    {
      var /*ProxyEntry*/ proxyEntry = this.mProxyMap.get( url );

      if( !proxyEntry )
        return null;

      if( proxyEntry.proxy.trim() == 'DIRECT' || proxyEntry.proxy.trim() == 'direct' )        
        return new ProxyResponse();

      var url = new URL( url );
      var proxyURL = new URL( proxyEntry.proxy );

      var result = new ProxyResponse();        
      if( url.protocol.startsWith("https") ) {
        result.setHttpsProxy( proxyURL.host, proxyURL.port );
      }
      else if( url.protocol.startsWith("http") ) {
        result.setHttpProxy( proxyURL.host, proxyURL.port );
      }

      return result;
      
    } else if( this.mProxySettings.proxy_manual ) {
      var result = new ProxyResponse();
      result.setHttpProxy( this.mProxySettings.proxy_manual_http_host, this.mProxySettings.proxy_manual_http_port );
      result.setHttpsProxy( this.mProxySettings.proxy_manual_https_host, this.mProxySettings.proxy_manual_https_port );
      result.setHttpNonProxyHosts( this.mProxySettings.proxy_manual_http_non_proxy_hosts );
      return result;
    } else 
      return new ProxyResponse(); // Enmpty proxy response represents DIRECT
  }

  /**
   * Associate a proxy with the supplied URL
   * @param {*} url 
   * @param {*} proxy 
   */
  setProxy( /*string*/ url, /*string*/ proxy ) {
    var that=this;
    if( this.mProxyMap == null )
      return this.loadProxyMap().then( function(){ that.setProxy( url, proxy ) } );
    this.mProxyMap.set( url, new ProxyEntry( url, proxy ) );
  }

  getLogging(){ return this.mProxySettings.logging; }

  setLogging( logging ){ this.mProxySettings.logging = logging; }

  getLoggingOpt(){ return LoggingOpt; }

  clearCache() {
    this.mProxyMap.clear();
  }
}
