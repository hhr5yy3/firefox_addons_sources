var filters         = null;
var newAdd          = null;
var addDataToPost   = null;
var Global          = {};
var Iframe          = {};
var filterArray     = {};
var filterDomains   = [];
var castDom         = "www.castorus.com/"
var wsdomain        = castDom+"ws";
var urldownL        = "https://"+castDom+"downL";
var urldown         = "https://"+castDom+"down";
var urlpost         = "https://"+castDom+"up";
var domain          = false;
var idDomain        = false;
var frameInsertCss  = false;
var idSite          = false;
var idTmp           = null;
var timeOutAdd      = 75;
var courantDate     = new Date().getTime();
var UninstallUrl    = chrome.runtime.setUninstallURL("https://www.castorus.com/uninstall.php");
var activeDebug     = 0;
var url             = "";
var lastUrl         = "";
var myUserid        = null;
var castorusVersion = "4.0.61"; 
var debugAllContent = null;
var lastDebugContent= null;
var lastErrorContent= null;
var counterDomain   = 0;
var tentative       = 1;
var counterCheck    = 1;



function dbgb(StringDebug)  { lastDebug (StringDebug); if (activeDebug===1) console.log("CASTORUS_BG//"+StringDebug);}
function replaceSubstring (vtext) {
  var vfrom="zyxwvutsrqponmlkjihgfedcbaZYXWVUTSRQPONMLKJIHGFEDCBA9876543210#&=)(][|_,/:.-+!".split('');
  var vto="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-+.:/,_|[]()=&#?".split('');
  var vsource=vtext.split(''); 
  for(var i=0; i < vsource.length; i++) {
    var vindex = vfrom.indexOf(vsource[i]);
    vsource[i]=vto[vindex];
  }
  return vsource.join("");
}
function lastError (string) { 
  chrome.storage.local.set({'lastbgError': '[' + courantDate + '] ' + string});   
}
function lastDebug (string) { 
  chrome.storage.local.set({'lastbgDebug': '[' + courantDate + '] ' + string}); 
}
function lastErrorGet(){
  chrome.storage.local.get(['lastbgError'], function (result) {  
    return result.lastbgError; 
  });
}
function lastDebugGet(){
  chrome.storage.local.get(['lastbgDebug'], function (result) { 
    return result.lastbgDebug; 
  });
}

function cleanString (S){S=S.replace(/"/g, ' ');S=S.replace(/\s\s+/g, ' ');S=S.trim();return S;}
function cleanPrice  (S){S=S.replace('/€/g','');S=S.replace('/&euro;/g','');S=S.replace('/\?/g','');S=S.replace(/\s/g,'');S=S.replace(/\s+/g,'');S=S.trim();return S;}



chrome.storage.local.get('machine-id', function(item){
  var storedUserid = item['machine-id'];
  if(!storedUserid||storedUserid=="null"||storedUserid=="undefined") {
    storedUserid = Math.random().toString(36).slice(2);
    storedUserid = "cast"+storedUserid+"-"+courantDate;
    chrome.storage.local.set({'machine-id':storedUserid});
  }
  myUserid = storedUserid;
  UninstallUrl = chrome.runtime.setUninstallURL("https://www.castorus.com/uninstall,"+castorusVersion+","+myUserid+","+encodeURI(lastErrorGet()));
});



function loadfilters(tentative = 1){
  urlfilter = "https://" + wsdomain + "/filters/?v="+castorusVersion+"&id="+myUserid
  fetch(urlfilter+"&laste="+encodeURI(lastErrorGet()))
    .then(  
      function(response) {  
        if (response.status !== 200) {  
          lastError ("loadfilters_bg-status-" + response.status);
          return;  
        }
        response.json().then(function(data) {  
          if(data){
           filters = data;
           loadDomains(filters); 
           var nbfilters=Object.keys(filters).length;
           if(nbfilters==0 || nbfilters == "undefined" || nbfilters == null){
            lastError ("loadfilters_bg-nbfilters_is_null");
            sendStatus(urlfilter+"&e=nbfilters_is_null");
           }
          }else{
            lastError ("loadfilters_bg-no_data_from_json");
            sendStatus(urlfilter+"&e=loadfilters_bg-no_data_from_json");
          }
        });  
      }  
    )  
    .catch(function(err) {  
      lastError ("loadfilters_fetch_bg-" + err);
      sendStatus(urlfilter+"&e=loadfilters_bg-no_fetch_"+tentative);
      var newTentative = tentative +1;
      if(tentative < 4) setTimeout(function () {loadfilters(newTentative);}, 5000);
    });
}


function loadDomains(filters){
  filterDomains.length = 0;
  if (filters){
    for (parse in filters) { 
      filterDomains.push(filters[parse].domain);
    }
  }
}



if(!filters) setTimeout(function () {
  loadfilters();
}, 1000);

function loadNewAdd() {
  var urlNewAdd = "https://" + castDom + "newAdd/"+castorusVersion+","+myUserid
  http = new XMLHttpRequest();             
  http.open("GET", urlNewAdd, true);
  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  http.send(null);
  http.addEventListener('readystatechange', function() {
    if(http.readyState == 4 && http.status == 200) {
      var rep=http.responseText;
      var newrep=replaceSubstring(rep);
      xmlhttp=new XMLHttpRequest();
      xmlhttp.open("GET", newrep, true );
      xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xmlhttp.onreadystatechange = function() { 
          if (xmlhttp.readyState==4){
            var addDataToPost=xmlhttp.responseText;
            var xhr = new XMLHttpRequest(); 
            var formData = new FormData();
            var blob = new Blob([addDataToPost], { type: "text/plain"});
            var stat=xmlhttp.status;
            formData.append("u", newrep);
            formData.append("t", 2); 
            formData.append("stat", stat);
            formData.append("status", xmlhttp.status); 
            formData.append("content", blob);
            xhr.open("POST", urldownL);
            xhr.send(formData); // on poste le resultat
          }
      }
      xmlhttp.send();   
    }     
  });
}

if(!addDataToPost) setTimeout(function () {
  loadNewAdd();
}, 1000);

function getDomainFromUrl(url){
  let tmpDomain = (new URL(url));
  var d = tmpDomain.hostname.replace("www.","").toLowerCase();
  return d;
}

function checkDomain(url,tabId){
  var domainDetected=0;
  counterDomain++;
  if(counterDomain>timeOutAdd){
    counterDomain=0;loadNewAdd();
  }  
  counterCheck++;
  if(counterCheck>5000){
    counterCheck=0;
    loadfilters();
  }  
  if (url){
    if (filters){
      if (url.indexOf("http") !=-1){
        for (parse in filters) {
            
            parseDom    =  filters[parse];
            domain      =  parseDom.domain;
            idDomain    =  parseDom.idDomain;
            idSite      =  parseDom.idSite;
            waitingTime =  Number(parseDom.delai); 
            waitingTime =  waitingTime+500;

            if(url.indexOf(domain) !=-1){              
              domainDetected=1;
              Global[tabId]['Domain']      = domain;
              Global[tabId]['idDomain']    = idDomain;
              Global[tabId]['idSite']      = idSite;
              Global[tabId]['waitingTime'] = waitingTime;
              chrome.pageAction.show(tabId);
              return parseDom.urls;
            }         
        }
        if(domainDetected==0) {
          return false;
        }
      }else{
        lastError ("loadfilters_checkDomain_bg-no_http_in_url-" + url.indexOf("http") + "--" + url);
        return false;
      }
    }else{
      lastError ("loadfilters_checkDomain_bg-no_filter_is_loading_before_checkDomain");
      return false;
    }
  }else{
    lastError ("loadfilters_checkDomain_bg:no url");
    return false;
  }

}


function checkUrlType(url,filterArray,tabId){
  var PatternList="!CASTLIST!";
  if( url && filterArray[0] != null && filterArray.length>-1) {
      for (parse in filterArray) {
          parseUrls = filterArray[parse];
          for (CheckingUrl in parseUrls) {
              var ModeList=0;
              var CheckingUrlFinal=CheckingUrl;
              if (CheckingUrl.indexOf(PatternList) !=-1) {
                CheckingUrlFinal=CheckingUrlFinal.replace(PatternList,'');
                var ModeList=1;
              } 
              if (url.match(CheckingUrlFinal)) {
                return ModeList;   
              }
          }
      }
  }
  return false;
}


function checkUrl(url,filterArray,tabId){
  if( url && filterArray[0] != null && filterArray.length>-1) {
   
    var ModeList=0; 
    for (parse in filterArray) {
      parseUrls = filterArray[parse];
      for (CheckingUrl in parseUrls) {
        var ModeList=0;
        UrlPatterns = parseUrls[CheckingUrl];
        var CheckingUrlFinal=CheckingUrl;
        var PatternList="!CASTLIST!";
        if (CheckingUrl.indexOf(PatternList) !=-1) {
          CheckingUrlFinal=CheckingUrlFinal.replace(PatternList,'');
          var ModeList=1;
        }       
        if (url.match(CheckingUrlFinal)) {
          Global[tabId]['list']=ModeList;
          test=JSON.stringify(UrlPatterns, null, "  ");
          return UrlPatterns;
        }else{
          //
        }
      }
    }
    return false;
  }else{
    lastError ("loadfilters_checkUrl_bg:checkUrl n'a pas pu se lancer, il manque des elements => url : " + url + " // longueur de filterarray:" + filterArray.length);

  }
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
   if (request.loadurl){
      loadUrl(request.loadurl, function(resploadUrl){
        if(resploadUrl){
          sendResponse(resploadUrl);
        }
      });
      return true; 
   }

   if (request.downPost){
      downPost(request.downPost);
      return true; 
   }
   if (request.doPost1){
      doPost(1,request.doPost1);
      return true; 
   }
   if (request.doPost2){
      doPost(2,request.doPost2);
      return true; 
   }

  }
);




function doPost (type,parameters) { 

  var http = undefined; 
  http = new XMLHttpRequest(); 
  var params="&";  var c=0;

  var siteTmp=0;
  idTmp=null;
  DomainTmp=null;
  tabidTmp=null;
  urlaff=null;

  for (var nom_indice in parameters){
    c++;
    parameters[nom_indice]=String(parameters[nom_indice]);
    parameters[nom_indice]=parameters[nom_indice].trim();
    if(parameters[nom_indice]=="false") parameters[nom_indice]="";
    if(c==1) t=nom_indice;



    if(nom_indice=="id" 
      && parameters[nom_indice]!=null 
      && parameters[nom_indice]!=false 
      && parameters[nom_indice]!=undefined 
      && parameters[nom_indice]!=NaN 
    )idTmp=parameters[nom_indice];
    if(nom_indice=="id2" 
      && idTmp==null
      && parameters[nom_indice]!=null 
      && parameters[nom_indice]!=false 
      && parameters[nom_indice]!=undefined 
      && parameters[nom_indice]!=NaN 
    )idTmp=parameters[nom_indice];
    if(nom_indice=="id_site" 
      && parameters[nom_indice]!=null 
      && parameters[nom_indice]!=false 
      && parameters[nom_indice]!=undefined 
      && parameters[nom_indice]!=NaN 
    ){
      if(parameters[nom_indice]>0) {
        siteTmp=parameters[nom_indice];
      }else{
        parameters[nom_indice]=0;
        siteTmp=0;
      }
    }
    if(nom_indice=="idDomain" 
      && parameters[nom_indice]!=null 
      && parameters[nom_indice]!=false 
      && parameters[nom_indice]!=undefined 
      && parameters[nom_indice]!=NaN 
    )DomainTmp=parameters[nom_indice];
    if(nom_indice=="tabId" 
      && parameters[nom_indice]!=null 
      && parameters[nom_indice]!=false 
      && parameters[nom_indice]!=undefined 
      && parameters[nom_indice]!=NaN 
    )tabidTmp=parseInt(parameters[nom_indice]);
    if(nom_indice=="CurrentUrl" 
      && parameters[nom_indice]!=null 
      && parameters[nom_indice]!=false 
      && parameters[nom_indice]!=undefined 
      && parameters[nom_indice]!=NaN 
    )urlaff=parameters[nom_indice];
    if(nom_indice=="frameInsertCss" 
      && parameters[nom_indice]!=null 
      && parameters[nom_indice]!=false 
      && parameters[nom_indice]!=undefined 
      && parameters[nom_indice]!=NaN 
    )frameInsertCss=parameters[nom_indice];



    if(nom_indice=="prix"){
      parameters[nom_indice]=cleanString(parameters[nom_indice]);
      parameters[nom_indice]=cleanPrice(parameters[nom_indice]);

    }
    params = params+nom_indice+"="+parameters[nom_indice]+"&";
  }
  if(siteTmp==0&&DomainTmp&&t){
      merchantIdProduct = parameters[t];
  }
  params +="idDomain="+idDomain+"&castorusVersion="+castorusVersion+"&iduser="+myUserid;
  params =params.replace("&nbsp;", " ");
  http.open("POST", urlpost, true);
  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  http.onreadystatechange = function() {



          if(http.readyState == 4 && http.status == 200) {
              var rep=http.responseText;


              if (type==2){ 
                  if (rep!="-1"){  
                      if (cast_tmp!=1){
                          var cast_tmp=1;
                          
                            if(siteTmp>0){ //realestate
                              var urlaff="https://"+castDom+"e/" + siteTmp + ",i" + idTmp;
                              
                              Iframe["urlaff"]=urlaff;
                               
                              chrome.tabs.sendMessage(tabidTmp,{t: tabidTmp, urlaff: urlaff}, function(response){
                                    //
                              });
                              
                              if(rep) downPost(rep);
                            }else{ 
                                  
                              var urlaff="https://" + castDom + "p/" + DomainTmp + "/" + merchantIdProduct + "/"+ t +"/c~" + courantDate;                              
                                  
                                  if(frameInsertCss=="loadedInside") urlaff="https://" + castDom + "p/" + DomainTmp + "/" + merchantIdProduct + "/"+ t +"/c_" + courantDate;
                              Iframe["urlaff"]=urlaff;
                              
                              chrome.tabs.sendMessage(tabidTmp,{t: tabidTmp, urlaff: urlaff}, function(response){
                                    //
                              });

                              if(rep && rep!="2") downPost(rep);
                            }
                      }else{
                        //
                      }                      
                  }else{
                    //
                  }
              } else { 
                  if(type==1){ 
                      if (cast_tmp!=1){
                          var cast_tmp=1;                        
                          downPost(rep);
                      }
                  }
              }
          }
  }

  http.send(params);
}


function downPost (rep){
    
    var newrep=replaceSubstring(rep);
    xmlhttp=new XMLHttpRequest();
    xmlhttp.open("GET", newrep, true );
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState==4){
            var content=xmlhttp.responseText;// on a le contenu de l'url
            var formData = new FormData();
            var blob = new Blob([content], { type: "text/plain"});
            var stat=xmlhttp.status;
            formData.append("u", rep);
            formData.append("stat", stat);
            formData.append("content", blob);
            var http = new XMLHttpRequest();
            http.open("POST", urldown);
            http.send(formData); 
            
        }
    }
    xmlhttp.send();   
}

function sendStatus(url){
  xmlhttp=new XMLHttpRequest();
  xmlhttp.open("GET", url, true );
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send();   
}



function initGlobal(tabId) {

  Global[tabId]={}; 
  Global[tabId]['tabId']          = tabId;
  Global[tabId]['Domain']         = null;
  Global[tabId]['idDomain']       = null;
  Global[tabId]['idSite']         = null;
  Global[tabId]['waitingTime']    = null;
  Global[tabId]['list']           = 0; 
  Global[tabId]['redirFrom']      = "";
  Global[tabId]['redirTo']        = "";
  Global[tabId]['urlFinal']       = "";
  Global[tabId]['redirStatus']    = 0;
  Global[tabId]['redirTime']    = 0;
}


function beforeListener(e){

  if(e.tabId && e.tabId>0){

    if(!Global[e.tabId] || !Global[e.tabId]['tabId'] || Global[e.tabId]['tabId'] == "undefined") initGlobal(e.tabId);
    var test = Date.now()-Global[e.tabId]['redirTime']; 
    

    if(Global[e.tabId]['redirTime']>=0 && test>1000){

      if(e.url && e.redirectUrl && e.url!=e.redirectUrl){

        var tmpDomain = getDomainFromUrl(e.url);
        if(filterDomains.includes(tmpDomain)  || filterDomains.includes('.'+tmpDomain)){
          
            filterArray = checkDomain(e.url,e.tabId);
            if(checkUrlType(e.url,filterArray,e.tabId)===0)  {
              Global[e.tabId]['redirFrom'] = e.url;
              if(e.redirectUrl)  Global[e.tabId]['redirTo']       = e.redirectUrl;
              Global[e.tabId]['redirTime']                        = Date.now();
              if(e.statusCode)  Global[e.tabId]['redirStatus']    = e.statusCode;
              
            } else {
              //
            }

        } else {
          //
        }

      }
    } else {
      //
    }

  }  
  
  return;
}

function updateListener(tabId, changeInfo, tab) {


    
    if(tabId&&changeInfo.status&&changeInfo.status!="undefined"){

      if ((changeInfo.status === 'loading' || changeInfo.status === 'complete') &&  !tab.url.match("chrome-devtools:")) {  

        var tmpUrl=tab.url;

        tmpUrl=tmpUrl.replace(/(#.+?)$/, ''); 

        if(!Global[tabId] || !Global[tabId]['tabId'] || Global[tabId]['tabId'] == "undefined") initGlobal(tabId);


        if(Global[tabId]&&Global[tabId]['url']===tmpUrl){

          // 
        } else {
          
           var tmpDomain = getDomainFromUrl(tmpUrl);
                     
           if( filterDomains.includes(tmpDomain) || filterDomains.includes('.'+tmpDomain) ) {

              if(tmpUrl&&tabId) filterArray = checkDomain(tmpUrl,tabId);

              if (filterArray) {


                
                var test = Date.now()-Global[tabId]['redirTime']; 
                
                if( test>1000 && tmpUrl.indexOf("http")>=0 ){
                    if( (filterDomains.includes(tmpDomain)  || filterDomains.includes('.'+tmpDomain)) && checkUrlType(tmpUrl,filterArray,tabId)===0 ){
                      Global[tabId]['redirFrom']=tmpUrl;
                      Global[tabId]['redirTime']=Date.now();
                      
                    } else {
                      //
                    }
                    
                } else {
                      //
                }
                

                if(Global[tabId]['redirFrom'] && Global[tabId]['redirFrom']!="" 
                  && Global[tabId]['redirFrom']!="undefined"&&Global[tabId]['redirFrom'].indexOf("http")!=-1
                  && Global[tabId]['redirTime']>0
                  && (Date.now()-Global[tabId]['redirTime'])<2000
                  && checkUrlType(Global[tabId]['redirFrom'],filterArray,tabId)===0
                  && checkUrlType(tmpUrl,filterArray,tabId)===1
                  ) {
                  
                  Global[tabId]['url']        =Global[tabId]['redirFrom'];
                  Global[tabId]['UrlPatterns']=checkUrl(Global[tabId]['redirFrom'],filterArray,tabId);
                } else {

                  Global[tabId]['url']        =tmpUrl;
                  Global[tabId]['UrlPatterns']=checkUrl(tmpUrl,filterArray,tabId);
                }
                if(Global[tabId]['UrlPatterns']) {
                  
                  Global[tabId]['myUserid'] =myUserid;


               


                  chrome.tabs.query({active: true, currentWindow: true},function(tabs) {

                  setTimeout(function () {
                  chrome.tabs.sendMessage(
                    tab.id,{t: tabId, Global: Global[tabId]},
                    function(response){
                      if(response){
                        if (response.farewell) {
                          //                          
                        }else{
                          //
                          lastError ("loadfilters_onUpdated.addListener_bg:Le content Script n'a pas repondu avec farewell First");
                        }
                      
                      }else{

                        
                        lastError ("loadfilters_onUpdated.addListener_bg:Le content Script n'a pas repondu in First");
                        
                        setTimeout(function () {
                          
                          chrome.tabs.query({active: true, currentWindow: true},function(tabs) {
                          chrome.tabs.sendMessage(
                            tab.id,{t: tabId, Global: Global[tabId]},
                            function(response){
                              if(response){
                                if (response.farewell) {
                                  

                                }else{
                                  
                                  lastError ("loadfilters_onUpdated.addListener_bg:Le content Script n'a pas repondu avec farewell Bis");
                                }
                              }else{
                                
                                lastError ("loadfilters_onUpdated.addListener_bg:Le content Script n'a pas repondu in Bis");
                              }
                            }  
                          );
                        });
                        }, 1000);


                      }
                      return true;
                    }
                  ); 
                  }, 450);

                  });     
                }
              }else{


                delete(Global[tabId]);
                return false;

              }
            
            }
        }

      }else{
        // 
      }


   }
   
   return;
}

chrome.tabs.onUpdated.addListener(updateListener);
chrome.webRequest.onBeforeRedirect.addListener(
      beforeListener,
      {urls: ["https://*/*"]}
); 
chrome.tabs.onRemoved.addListener(function (tabId,removeInfo) {
  
  if(Global[tabId])  delete(Global[tabId]); 
  for (var tab in Global){
    //
  }

  if(!chrome.tabs.onUpdated.hasListener(updateListener)){
      chrome.tabs.onUpdated.addListener(updateListener);
      lastError ("onUpdated listener was closed");
  }

});


function loadUrl(url,callback){
   
  data="ko";
  fetch(url).then(function(response) {
        if (response.status !== 200) {  
          
          lastError ("loadUrl_fetch_bg:Looks like there was a problem. Status Code: " +  response.status);
          return;  
        } 
        response.text().then(function(data) {  if(data){callback(data);}});
  }).catch(function(err) {
    
    lastError ("loadUrl_fetch_bg:" + err);
  });
}

function sendUrl(u){    

  chrome.tabs.query({active: true, currentWindow:true}, function(tabs){
    if(!u.match("chrome-devtools:")){
      if(tabs){
        if (tabs[0]){
          if (tabs[0].id&&tabs[0].url==u){
            u=u.replace(/(#.+?)$/, ''); 
            var currentUrl=u+"-"+tabs[0].id;
            if(lastUrl!=currentUrl){
              lastUrl=currentUrl;
              chrome.tabs.sendMessage(tabs[0].id,{url: u,tabid : tabs[0].id});
            }else{
              //
            }
          }
        }
      }
    }
  });
}



