var DEBUG_MODE = false;//!('update_url' in chrome.runtime.getManifest());

var DATA_URL = 'https://www.helpfreely.org/api/data/';

var FUNCTION_URL = 'https://www.helpfreely.org/static/app.js';

var IID = localStorage.getItem('iid');

// If exist an old IID set it to false to recalculate a new one
try{
  viid = IID.split('-');
  if(parseInt(viid[2]).toString(viid[0]).toUpperCase()!=viid[1] || !Number.isSafeInteger(parseInt(viid[2]))){
    IID = false;
  }
} catch(e){
  IID = false;
}

if(!IID){
    //IID = Math.random().toString(36).slice(2);
    sed=16+Math.floor(Math.random() * 21); 
    f = Math.floor(Math.random() * (9007199254740990 - 1000000000000000 + 1) + 1000000000000000);
    IID = f.toString(sed).toUpperCase();
    IID=sed+'-'+IID+'-'+f;

    localStorage.setItem('iid',IID);
}

//var APP_VERSION = 'C-'+chrome.app.getDetails().version;
//var APP_VERSION = 'F-'+chrome.runtime.getManifest().version;
var APP_VERSION = 'F-5.4.10';
if(DEBUG_MODE) APP_VERSION = APP_VERSION + '-DEBUG';
                  
var RELOAD_TIME = Math.floor((Math.random() * 10800000) + 10800000);     // JSON reload time (every 3-6 hours) 
var RELOAD_TIME_ANONYMOUS = Math.floor((Math.random() * 21600000) + 21600000);     // JSON reload time (every 6-12 hours) 
var RELOAD_TIME_ERROR = Math.floor((Math.random() * 1200000) + 600000);  // JSON reload time if error (every 10-30 minutes)
var RELOAD_TIME_BCK_ERROR = 30000; //30 segundos
var NUM_BCK_ERROR = 0;
var DEACTIVATE_TIME = 3600000; // time to deactivate shop
var RELOAD_INTERVAL_TRIGGER;
var TIME_TO_RETARGET = 15000; // Time to wait until next retarget
var BLAWK_DEACTIVATE = false;

var trackers_reg = new RegExp('XXXXX');  // Regular expresion to check trackers
var referrer_reg = new RegExp('XXXXX');  // Regular expresion to check forbidden referrer
var tracker_detected = {};

var HFF_name=0;
var status=1; //value in json: 0 inactive, 1 active, 2 deactivate, 3 noseusa, 4 softretarget, 5 softseo
var raise=2;
var country=3;
var slugify=4;
var forbiden=5;
var allowed=6;
var metacomparisons=7;
var bleaching=8;
var hawking=9;
var maxminclose=10;
var url_exclusive=11;
var shop_logo=12;
var hawking_afn_allowed=13; //If false don't do hawking for same countries

b00k_a = false;
b00k_l = false;

//var tab_allowed_url; //don't block this prefetch urls

// Request the JSON from API every RELOAD_TIME if success, or every RELOAD_TIME_ERROR if error
function getData(country,save_data) {
  var key = Date.now();
  var data; // Data from helpfreely (JSON encoded)
  
  if(country){
    var params = {'country': country, 'enc': 1,'nocache': key, 'version': APP_VERSION, 'iid': IID};
  }else{
    var params = {'enc': 1,'nocache': key, 'version': APP_VERSION, 'iid': IID};
  }

  if(DEBUG_MODE) console.log('Get JSON',params);

  // GET Request for JSON with a param 'sessionid'
  $.get(DATA_URL, params, function(data_r) {
    if(DEBUG_MODE) console.log('Receiving JSON...');
    data = data_r;

  // JSON request successfully received. Now try decode it
  },'text').done(function(){

    try{      
      data = JSON.parse( atob( data.slice(key%100) ) );
    
      data['helpbar_version'] = APP_VERSION;
      data['iid'] = IID;
      data['active_domains'] = [];
      if(data.user_data.id == -1) data.user_data.id = -12;
      data['retry'] = {7614:true,};

      trackers_reg = new RegExp(data['tracker_reg']+"|:\/\/www\\.b[o]{2}king\\.com\/(index|searchresults|hotel|directions|city).*[&?;]{1}aid=\\d+|:\/\/www\\.b[o]{2}king\\.com\/\\?.*aid=\\d+","i");
      referrer_reg = new RegExp(data['referrer_reg'],"i");
      
      // to don't loose retarget per tab in json reload
      if(save_data){
        if(DEBUG_MODE) console.log('SAVE previous JSON activity data');
        var temp = {};
        temp['active_domains'] = json['active_domains'];
        json['active_domains'].forEach(function(domain){
          shop_id = json[domain];
          temp[shop_id] = json[shop_id];
        });

        // Combine server JSON with previous JSON data saved
        json = Object.assign(data,temp);

        delete temp;
      } else {
        if(DEBUG_MODE) console.log("DON'T SAVE previous JSON activity data");

        // Save active domains
        var domains_to_reload = []
        if(json['active_domains'] && json['active_domains'].length>0){
          domains_to_reload = json['active_domains'];
        }
        // Save new JSON
        json = data;
        tab_target = {};

        // Get all tabs
        chrome.tabs.query({},function(list_tabs){          
          // Loop for every tap
          list_tabs.forEach(function(tab){
            if(domains_to_reload.indexOf(dominio(tab.url))>=0){              
              chrome.tabs.reload(tab.id);
            }
          });
        });
      }

      // Check if there is a local conf for anonymous user
      if(json.user_data.id==12 || json.user_data.id==-12 || json.user_data.id==-1){
        if(localStorage.hasOwnProperty('style')){
            json.user_data.style = localStorage.getItem('style');            
        }
        if(localStorage.hasOwnProperty('show_partner_shops')){
            json.user_data.show_partner_shops = localStorage.getItem('show_partner_shops')=="true";
        }
        /*if(localStorage.hasOwnProperty('retarget')){
            json.user_data.retarget = localStorage.getItem('retarget')=="true";
        }*/
      }

      // Clear previuous JSON saved
      chrome.storage.local.clear();

      // Set JSON date
      json['date']=Date.now();

      // Save new JSON
      chrome.storage.local.set(json);

      if(DEBUG_MODE) console.log('JSON successfully loaded');

      clearInterval(RELOAD_INTERVAL_TRIGGER);
      
      if(json.user_data.id<0 || json.user_data.id==12 || json.user_data.id==-12){
        RELOAD_INTERVAL_TRIGGER = setInterval(getData, RELOAD_TIME_ANONYMOUS, false, true);
      } else {
        RELOAD_INTERVAL_TRIGGER = setInterval(getData, RELOAD_TIME, false, true);
      }

    } catch(e){

      if(DEBUG_MODE) console.log('ERROR BCK loading JSON',e);
      NUM_BCK_ERROR = NUM_BCK_ERROR + 1;
      var xhr = new XMLHttpRequest();
      xhr.open("GET", json.links.reactivate.split('?')[0].replace('shop-help','cp')+'?cp=ERROR&iid='+IID+'&tab=BCK&e=ERROR_BCK&v='+json.helpbar_version+'&onerror='+encodeURIComponent(e.message), true);
      xhr.send();
      //json = {'no':'data'};

      chrome.storage.local.get(null,function(data){        
        if(json['date']){
          json = data;
          user_id = json.user_data.id;
        } else {
          json = {'no':'data'};
          chrome.storage.local.set(json);
        }
      });

      clearInterval(RELOAD_INTERVAL_TRIGGER);
      if(NUM_BCK_ERROR<6){
        RELOAD_INTERVAL_TRIGGER = setInterval(getData, RELOAD_TIME_BCK_ERROR,country,save_data);  
      } else {
        RELOAD_INTERVAL_TRIGGER = setInterval(getData, RELOAD_TIME_ERROR,country,save_data);
      }      
    }   

  // Error loading JSON
  }).fail(function() {
    if(DEBUG_MODE) console.log('ERROR loading JSON');

    clearInterval(RELOAD_INTERVAL_TRIGGER);
    RELOAD_INTERVAL_TRIGGER = setInterval(getData, RELOAD_TIME_ERROR,country,save_data);
  });
  return true;
}

// Tracking control
tab_target = {};
tab_retarget = {};
tab_url = {}; //To save the current url in each tab
tab_redirect = {}; //To force a redirect in onBeforeRequest

// Return the input string decoding HTML
function urlDecode(url){
  try{    
    return decodeURIComponent(url);
  } catch(e){}
  try{    
    return unescape(url);
  } catch(e){}
  return url;
}

// Return true if url is in forbiden_list else return false (This function is duplicated in merchant and searchengine)
function InForbiden(url,shop_id){
  try{
    if(/helpfreely.org/gi.test(dominio(url))){
      return false;
    }

    result = false;

    // Return true if url is in marketer patterns
    if(json.marketer){
      marketer_reg = new RegExp(json.marketer,"gi");

      if(marketer_reg.test(url)){
        result = true;
      }
    }
    
    // return true if url is in shop's forbiden patterns
    if(shop_id && json[shop_id][forbiden] && json[shop_id][forbiden].length > 0){
      s = json[shop_id][forbiden].join('|').replace(/\./g,'\\.').replace(/\*/g,'\.*').replace(/https/gi,'http').replace(/http/gi,'^http[s]{0,1}').replace(/\/\/www\\./gi,'\/\/(www\\.){0,1}');
      forbiden_pattern = new RegExp(s,"i");
      if(forbiden_pattern.test(url)){
        result = true;
        if(DEBUG_MODE) console.info("%c   URL in shop's forbiden patterns ",'color:#F00;',url);
      }
    }

    // return true if url is in shop's bleaching patterns
    //if(shop_id && json[shop_id][bleaching] && json[shop_id][bleaching].length > 0){
    //  s = json[shop_id][bleaching].join('|').replace(/\./g,'\\.').replace(/\*/g,'\.*').replace(/https/gi,'http').replace(/http/gi,'^http[s]{0,1}').replace(/\/\/www\\./gi,'\/\/(www\\.){0,1}');
    //  forbiden_pattern = new RegExp(s,"i");
    //  result = result || forbiden_pattern.test(url);
    //}

    // return true if url is in shop's hawking patterns
    if(shop_id && json[shop_id][hawking] && json[shop_id][hawking].length > 0){
      s = [];
      json[shop_id][hawking].forEach(function(ele,index){
        s.push(ele[0]);
      });

      s = s.join('|').replace(/\./g,'\\.').replace(/\*/g,'\.*').replace(/https/gi,'http').replace(/http/gi,'^http[s]{0,1}').replace(/\/\/www\\./gi,'\/\/(www\\.){0,1}');
      forbiden_pattern = new RegExp(s,"i");
      result = result || forbiden_pattern.test(url);
    }

    // Return true if url is in referrer_reg pattern
/*    if(json['referrer_reg'] && json['referrer_reg'].length > 0){
      referrer_pattern = new RegExp(json['referrer_reg'],"i");
      result = result || referrer_pattern.test(url);
    }*/

    // Return true if url is in forbidden_reg pattern
    if(json['forbidden_reg'] && json['forbidden_reg'].length > 0){
      forbidden_pattern = new RegExp(json['forbidden_reg'],"i");
      result = result || forbidden_pattern.test(url);
    }  
    
    // Return true if the shop has exclusive urls and the url is a shop's url and is not one of them
    if(shop_id && json[shop_id] && json[shop_id][url_exclusive] && json[shop_id][url_exclusive].length > 0){

      if(json[dominio(url)] == shop_id){
        result_exclusive = true;
      } else {
        result_exclusive = false;
      }

      for(i=0; i<json[shop_id][url_exclusive].length; i++){
        // exclusive url without "http[s]://"" and without subdomain "www"
        urlexclusive = json[shop_id][allowed][json[shop_id][url_exclusive][i]].replace(/^http[s]{0,1}:\/\//i,'').replace(/^(www\d{0,1}\.){0,1}/i,'').replace(/\/$/gi,'');

        // compare url without "http[s]://"" and without subdomain "www" with the exclusive url
        if(url.replace(/^http[s]{0,1}:\/\//i,'').replace(/^(www\d{0,1}\.){0,1}/i,'').replace(/\/$/gi,'').indexOf(urlexclusive)==0){
          result_exclusive = false;          
        }
      }
      if(result_exclusive){
        // Ignore result_exclusive for these urls
        if(/^https:\/\/sec[u]{1}re\.b[o]{2}k[i]{1}n[g]{1}\.[c]{1}om\/b[o]{2}k\.html/gi.test(url) || /^https:\/\/s[e]{1}cure\.b[o]{2}[k]{1}ing\.c[o]{1}m\/confirmation/gi.test(url)){
          if(DEBUG_MODE) console.error(" -#- IGNORE SHOP WITH EXCLUSIVE URL FOR THIS URL -#-");
          result_exclusive = false;

        } else {
          if(DEBUG_MODE) console.error(" -#- SHOP WITH EXCLUSIVE URL -#-");
        }
      }      
      result = result || result_exclusive;
    }

    return result;
  } catch(err){
    if(DEBUG_MODE) console.error("{ERROR: background.js -> function InForbiden(..)}",err);
    return false;
  }
}

// Return true if url is in allowed shop's urls else return false (This function is duplicated in merchant and searchengine)
function InAllowed(url,shop_id){
  try{
    p = new RegExp(json[shop_id][allowed].join("|").replace(/www\./gi,'').replace(/\/\|/gi,"\|^").replace(/\/$/gi,"").replace(/https/gi,"http").replace(/http:\/\//gi,"").replace(/\//gi,"\\/").replace(/\./gi,"\\.").replace(/\*\{/gi,".{").replace(/\*/gi,".*").replace(/^/,'^'),"i");
    u = url.replace('https://','http://').replace('http://','').replace('www.','').split('?')[0];
    return p.test(u);
  } catch(err) {
    return false
  }
}

function EncodeParam(txt){
  n=Math.floor(Math.random()*10);
  if(n==0) n=1;
  if(txt.length<n) n=0;
  enc_txt = btoa(txt);

  return String(n)+enc_txt+enc_txt.substr(0,n);
}
function DecodeParam(txt){
  n=parseInt(txt[0]);
  dec_txt = atob(txt.substr(1,txt.length-1-n));
  return dec_txt;
}

function IsMarketer(url){
  try{
    if(json.marketer && json.user_data.confirmed){
      marketer_reg = new RegExp(json.marketer,"i");
      u = url.replace('https://','http://').replace('http','').split('?')[0];

      if(marketer_reg.test(u)){
        if(DEBUG_MODE) console.warn('    ¡¡¡ MARKETER URL VISITED ¡¡¡',url);
        json.user_data.confirmed = false;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", json.links.reactivate.split('?')[0].replace('shop-help','cp')+'?cp=MARKETER&iid='+IID+'&tab='+StrTab(details.tabId)+'&v='+json.helpbar_version+'&r='+encodeURIComponent(url)+'&onerror='+encodeURIComponent(url), true);
        xhr.send();
      }
    }
  } catch(err){
    if(DEBUG_MODE) console.log('   Error: background.js-> IsMarketer(url)');
  }
  return;
}

function IsTrackerError(url){  
  error_reg = new RegExp(json.trackerror_reg,"i");
  return error_reg.test(url.split('?')[0]);
}

// Return true if there is an allowed content-type (text/html) in response headers else return false
function ContentTypeFilter(headers){
  var result = true;
  headers.forEach(function(element,index){
    if(element.name.toLowerCase() === "content-type" && element.value.toLowerCase().indexOf("text/html")<0 && element.value.toLowerCase().indexOf("text/plain")<0){
      result = false;
      return;
    }   
  });
  return result;
}

function Hawking(details,console_off){
  try{
    if(!console_off){
      console_off = false;
    }

    if(Hawking.done[details.tabId]) return false;

    if(json.nohawkingurl_reg){
      var reg_expresion = new RegExp(json.nohawkingurl_reg,'gi')
      if(reg_expresion.test(details.url)){
        if(DEBUG_MODE && !console_off) console.info('%c   └── HAWKING FORBIDEN    ','background:#F88;color:#600;font-weight:bold;',details.url);
        return false;
      }
    }

    details.url = urlDecode(details.url);
    
    var result = false;
    var shop_id = json[dominio(details.url)];
    var patterns = [];

    // Check nohawking with details.url shop
    if(json.nohawking && json.nohawking.indexOf(shop_id)>=0 && json[shop_id][status]!=1 && json[shop_id][status]!=3){
      if(DEBUG_MODE && !console_off) console.log('   └── NO HAWKING SHOP and APP NOT ACTIVE IN THIS SHOP');
      return false;
    }

    // search shop's hawking patterns
    if(shop_id){
      patterns = patterns.concat(json[shop_id][hawking]);
    } 

    // Concatenate general hawking patterns and eliminate "undefined" elements
    patterns = patterns.concat(json["hawking"]).filter(Boolean);

    patterns.every(function(elem,index){
      try {
        var url_pattern = new RegExp(elem[0].replace(/\./gi,"\\.").replace(/\*/gi,".*").replace(/  ].*   /gi,']*'),"gi");

        if(url_pattern.test(details.url)){          
          //var param_value = details.url.split(url_pattern)[1];
          var param_value = details.url.split(url_pattern).slice(-1)[0];  // select last element of array
          
          if(DEBUG_MODE && !console_off) console.log('HAWK PATTERN:',url_pattern,elem[1]);
          // Fix param value for Awindows
          if(/^urlenc\d\(\(.*\)\)$/gi.test(param_value) || /^urlenc\d%28%28.*%29%29$/gi.test(param_value)){
            param_value = param_value.replace(/^urlenc\d\(\(/gi,"").replace(/\)\)$/gi,"").replace(/^urlenc\d%28%28/gi,"").replace(/%29%29$/gi,"");
          }

          if(/\]\]$/gi.test(param_value) && !/\[\[$/gi.test(param_value)){
            param_value = param_value.replace(/\]\]$/,"");
            if(DEBUG_MODE && !console_off) console.log("FIX: delete ]] at end of url");
          }

          var param_name = elem[1];

          // Fix: Elimintate g ma.il params
          if(/g[o]{2}gle/i.test(dominio(details.url))) param_value = param_value.split("&source=gmail&ust=")[0];

          var count = 0;

          if(param_value.indexOf('http')==0){
            while(!/^(http|https):\/\//i.test(param_value) && count<5){
              count+=1;
              param_value = urlDecode(param_value);
            }
          }else{
            if(DEBUG_MODE && !console_off) console.log('NO ENCUENTRO HTTP EN LA URL');
            if(param_value.indexOf('www')==0){
              if(DEBUG_MODE && !console_off) console.log('ENCUENTRO WWW EN LA URL');
              param_value = 'http://'+param_value;  
            } else {
              if(DEBUG_MODE && !console_off) console.log('NO ENCUENTRO WWW EN LA URL');
              // If url to hawk start with //, add the protocol http
              if(param_value.indexOf('//')==0){
                if(DEBUG_MODE && !console_off) console.log('AÑADIMOS HTTP A LA URL');
                param_value = 'http:'+param_value;
              } else {
                return true;
              }
            }
          }

          try{ 
            param_value = urlDecode(param_value); 
          }catch(e){}

          if(/\[decod\+\d+\]/i.test(param_name)){

            var param_decod = parseInt(param_name.match(/\d/)[0]);
            if(DEBUG_MODE && !console_off) console.log('decode ntimes:',param_decod, param_value);
            for(i=0;i<param_decod;i++){  
              try{ 
                param_value = urlDecode(param_value);
              } catch(e) { 
                //do nothing
              }
            }
          } 

          if(count<5){
            // Fix Hawking url ended in ) without a previous (
            if(/\)$/.test(param_value) && !/\([^()]+\)$/gi.test(param_value)){
              param_value = param_value.replace(/\)$/gi,'');
            }
            
            if(DEBUG_MODE && !console_off) console.log('── HAWK ──>',param_value);
            // if hawking pattern has a forbidden pattern elem=[hawk_pattern,param,forbidden_pattern]
            if(elem[2]){
              
              exclude_pattern = new RegExp(elem[2],'gi');
              if(exclude_pattern.test(param_value)){
                if(DEBUG_MODE && !console_off) console.log('   └── NO HAWKING - FORBIDDEN PATTERN',elem[2]);
                param_value = false;
              }
            }
            result = param_value;
            return false;   //break .every loop
          }
        }
      } catch(err) {
        if(DEBUG_MODE && !console_off) console.log('\n    HAWKING PATTERN ERROR:',err,'\n');
      }
      return true;  //to iterate ".every"
    });   //end .every loop

    
    // Check if there are a new URL to return
    if(result){
      // Check shop hawking afn allowed for this shop and country
      if(["US","GB"].indexOf(json.country)>=0 && json[dominio(result)] && !json[json[dominio(result)]][hawking_afn_allowed]){
        if(DEBUG_MODE && !console_off) console.log ("   ├── FIX NO HAWKING FOR BBQ-RIBS");
        return false;
      }

      // Fix &di param
      if(/bs\.s[e]{1}rv[i]{1}ng-sys\.c[o]{1}m/.test(hostname(details.url))){
        if(result.split("&di=").length>1){
          if(DEBUG_MODE && !console_off) console.log ("   ├── FIX &di param:",result);
          result = result.split("&di=")[0];
        }
      }

      // Try hawk again if shop/url not in "no hawking" list
      result_shop_id = json[dominio(result)];
      if(json.nohawking && result_shop_id){
          if(json.nohawking.indexOf(result_shop_id)<0){
            var rehawk = Hawking({'url':result, 'tabId':details.tabId},console_off);
            if(rehawk) result = rehawk;
          }
      } else {
        var rehawk = Hawking({'url':result, 'tabId':details.tabId},console_off);
        if(rehawk) result = rehawk;
      }

      // Fix if there are a "?" encoded in the URL
      if(result.indexOf('%3f') > 0){
        result = result.replace('%3f','?');
      }
      // Fix if there aren't a "?" and there are params, change first "&" by "?"
      /*if( result.indexOf('&')>0 && result.indexOf('?')<0 && !/www\.v[i]{1}[k]{1}ing\./gi.test(result)){
        result = result.replace("&","?");
      }*/
      // Fix & before ?
      if(/[\?|&]{1}o[m]{1}nit[u]{1}recod[e]{1}=[^&]+/gi.test(result)){
        result = result.replace(/[\?|&]{1}o[m]{1}nit[u]{1}recod[e]{1}=[^&]+/,'').replace('?','&').replace('&','?');  
      }

      // Fix: Delete lang param from result if its a B00K url
      if(/b[o]{2}k[i]{1}n[g]{1}\.c[o]{1}m/gi.test(dominio(result))){
        // Delete lang param from url if a hawking is done in this tab to make B00K detect lang
        p = /[&]{1}lang=[^&]+/gi; 
        if(p.test(details.url)){
          if(DEBUG_MODE) console.log('FIX LANG IN B00K URL',details.url);
          result = result.replace(p,'');
        }
        p = /[?]{1}lang=[^&]+/gi; 
        if(p.test(details.url) ){
          if(DEBUG_MODE) console.log('FIX LANG IN B00K URL',details.url);
          result = result.replace(p,'?');
        }
      }

      // Check nohawking with result url shop
      result_shop_id = json[dominio(result)];
      if(json.nohawking && result_shop_id && json.nohawking.indexOf(result_shop_id)>=0){
        if(DEBUG_MODE && !console_off) console.log('   └── NO HAWKING SHOP');
        return false;
      }
      //tab_target[details.tabId] = result;
      return result;      
    } else {    
      return false;
    }
  } catch(err){
    if(DEBUG_MODE && !console_off) console.log('\n    HAWKING ERROR:',err,'\n');
    return false;
  }
}
Hawking.done = {};

function Bleaching(details,from_hawking,console_off){
  details.url = urlDecode(details.url);

  if(!/www\.v[i]{1}[k]{1}ing/gi.test(details.url)){
    // The previous character to & can't be an - or %
    if(/^[^?]+[-]&[-]/gi.test(details.url) || /^[^?]+\s&/gi.test(details.url) || /^[^?]+&\s/gi.test(details.url) || /^[^?]+[+]&[+]/gi.test(details.url) || /^[^?]+[_]&[_]/gi.test(details.url) || /^[^?]+[.]&[.]/gi.test(details.url) || /^[^?]+[,]&[,]/gi.test(details.url) || /^[^?]+[|]&[|]/gi.test(details.url)){
      details.url = details.url.replace("&",'.<>.');
    }

    // If url has #
    if(details.url.indexOf('#')>0){
      if(details.url.indexOf('#')>details.url.indexOf('&')){
        var url = details.url.replace('?','&').replace('&','?');        
      } else {
        var url = details.url;
      }
    // The url hasn't #
    } else {      
      var url = details.url.replace('?','&').replace('&','?');      
    }
  } else {
    var url = details.url;
  }
  url = url.replace('https','http').replace('.<>.','&');

  var shop_id = json[dominio(url)];
  if(json.nobleaching && json.nobleaching.indexOf(shop_id)>=0 && json[shop_id][status]!=1 && json[shop_id][status]!=3){
    if(DEBUG_MODE && !console_off) console.log('   └── NO BLEACHING SHOP and APP NOT ACTIVE IN THIS SHOP');
    return false;
  }

  var bleaching_pattern = false;

  try{
    if(Bleaching.done[details.tabId]){
      if(DEBUG_MODE && !console_off) console.log('   └── NO BLEACHING - Bleaching already detected.')
      return false; //Don't Bleaching if it's already applied
    }    
    
    if(shop_id && json[shop_id][bleaching].length>0){
      bleaching_pattern = new RegExp(json[shop_id][bleaching].join("|").replace(/\./gi,"\\.").replace(/\*/gi,".*").replace('https','http'),"gi");
    }
  } catch(err){
    if(DEBUG_MODE && !console_off) console.log('ERROR function Bleaching(..)',err);
    bleaching_pattern = false;
  }

  try{
    if( (json['bleaching'] && bleaching_pattern && bleaching_pattern.test(url)) || (json['bleaching'] && from_hawking && shop_id) || (shop_id && json[shop_id][status]==1 && !InForbiden(url,shop_id)) ){
      p = /[&?#]{1}([^&?#]+)/gi;
      params = url.match(p);

      if(params && params.length>0){
        params.forEach(function(elem,index){
          param_split = elem.split(/[=:]{1}/gi);
          param_name = param_split[0].replace(/[&?#]{1}/,'').toLowerCase();
          param_value = param_split[1];

          // If the param is not in forbiden params list, add it to new_params list        
          if(!json.bleaching[param_name.toLowerCase()]){
            // if param value is a url
            if(param_value && /^(http|https)/i.test(param_value)){
              param_value_aux = param_value;

              // Decode param url
              count = 0;
              while(!/^(http|https):\/\//i.test(param_value_aux) && count<5){
                count+=1;
                param_value_aux = urlDecode(param_value_aux);
              }

              param_value_aux = Bleaching({'url': param_value_aux, 'tabId': details.tabId});
              if(param_value_aux){

                // Reencode param url
                for(i=0; i<count; i++){
                  param_value_aux = encodeURIComponent(param_value_aux);
                }
                url = url.replace(elem,elem.replace(param_value,param_value_aux))
              }
            }

          // If param name in bleaching params list, don't add param to new_params      
          } else {
            if( (json.bleaching[param_name.toLowerCase()][0] && RegExp(json.bleaching[param_name.toLowerCase()][0],"i").test(url.split('?')[0])) || (json.bleaching[param_name.toLowerCase()][1] && !RegExp(json.bleaching[param_name.toLowerCase()][1],"i").test(url.split('?')[0])) ){
              // if param value is a url
              if(param_value && /^(http|https)/i.test(param_value)){
                param_value_aux = param_value;

                // Decode param url
                count = 0;
                while(!/^(http|https):\/\//i.test(param_value_aux) && count<5){
                  count+=1;
                  param_value_aux = urlDecode(param_value_aux);
                }

                param_value_aux = Bleaching({'url': param_value_aux, 'tabId': details.tabId});
                if(param_value_aux){

                  // Reencode param url
                  for(i=0; i<count; i++){
                    param_value_aux = encodeURIComponent(param_value_aux);
                  }
                  url = url.replace(elem,elem.replace(param_value,param_value_aux));
                }
              }
            // Delete param if not a previous bleaching in last 5 seconds
            } else {
              var param = elem.replace(/[&?]/gi,'').split('=')[0];

              // If there is bleach info for this tab
              if(details.tabId && Bleaching.tab_info[details.tabId]){

                // No bleach if there is bleach info for this param and it is less than 5 seconds ago no bleach
                if(Bleaching.tab_info[details.tabId][param] && Bleaching.tab_info[details.tabId][param]!='BLEACHED' && (Date.now()-Bleaching.tab_info[details.tabId][param])<5000){
                  if(DEBUG_MODE && !console_off) console.log('   ├── PREVIOUS BLEACH DETECTED - NO BLEACH',elem);

                // Do bleach
                } else {
                  Bleaching.tab_info[details.tabId][param] = 'BLEACHED';//Date.now();
                  if(DEBUG_MODE && !console_off) console.log('   ├── BLEACH',elem);
                  url = url.replace(elem.replace('?',''),'');                  
                }
                
              // Do bleach. There is not bleach info for this tab
              } else {

                Bleaching.tab_info[details.tabId] = {param: Date.now()};
                if(DEBUG_MODE && !console_off) console.log('   ├── BLEACH',elem);
                url = url.replace(elem.replace('?',''),'');
              }
            }
          }
        }); // end forEach params

        // Set bleached datetime per param and tab to prevent bleach again this param in this tab
        if(Bleaching.tab_info[details.tabId]){
          Object.keys(Bleaching.tab_info[details.tabId]).forEach(function(key){
            if(Bleaching.tab_info[details.tabId][key]=="BLEACHED"){
              Bleaching.tab_info[details.tabId][key] = Date.now();
            }
          });
        }

      }

      if(/^https/i.test(details.url)){
        url = url.replace('http:','https:');
      }

      if(url == details.url){
        if(DEBUG_MODE && !console_off) console.log('   └── NO BLEACHING - NOTHING TO BLEACH.');
        return false;
      } else {
        return url.replace('?&','?').replace('?#','#').replace(/[&?]{1}$/gi,'');
      }

    } else {
      if(DEBUG_MODE && !console_off) console.log('   └── NO BLEACHING - NO CONDITIONS TO BLEACH.');
    }
  } catch(err){
    if(DEBUG_MODE && !console_off) console.log('Error bleaching',err);
    return false;
  }
}
Bleaching.done = {};
Bleaching.tab_info = {} // Save {"bleaching param":"bleach time"} per tab (to not bleach the same param 2 times in X seconds)

function Sawing(details,console_off){

  if(Hawking.done[details.tabId]){
    if(DEBUG_MODE && !console_off) console.log('   └── NO SAWING - Hawking done in this tab');
    return false;
  }

  details.url = urlDecode(details.url);  

  shop_id = json[dominio(details.url)];

  // If url came from previous hawking, don't do the sawing if the url is not a shop (onlyshop added to details)
  if(details.onlyshop && !shop_id){
    if(DEBUG_MODE && !console_off) console.log('   └── NO SAWING - URL is not a shop and not came from hawking');
    return false;
  }
  // If url it's a forbidden url, don't do the sawing
/*  if(shop_id && InForbiden(details.url,shop_id)){
    if(DEBUG_MODE && !console_off) console.log('   └── NO SAWING - URL Forbidden');
    return false; 
  }*/

  if(json.nosawing && json.nosawing.indexOf(shop_id)>=0 && json[shop_id][status]!=1 && json[shop_id][status]!=3){
    if(DEBUG_MODE && !console_off) console.log('   └── NO SAWING SHOP and APP NOT ACTIVE IN THIS SHOP');
    return false;
  }
  
  try{
    new_url = details.url;
    
    for(i=0;i<json.sawing.length;i++){
      
      p = new RegExp(json.sawing[i][0],'gi');
      d = new RegExp(json.sawing[i][1],'gi');
      r = json.sawing[i][2]; // It is not a REGEX
      
      if(p.test(new_url) && d.test(new_url)){
        replace_str = new_url.match(p)[0].split(d).join(r);
        new_url = new_url.split(new_url.match(p)[0]).join(replace_str);
        if(DEBUG_MODE && !console_off) console.log('   └── SAWING: pattern(',i,')',d,new_url);
      }
      
    }    
    if(new_url==details.url){
      if(DEBUG_MODE && !console_off) console.log('   └── NO SAWING - NOTHING TO SAW');
      return false
    } else {
      if(details.url.indexOf('?')>0 && new_url.indexOf('?')<0 && new_url.indexOf('&')>0){
        if(new_url.indexOf('#')>0){
          if(new_url.indexOf('#')>new_url.indexOf('&')){            
            new_url = new_url.replace('&','?');
          }

        } else {
          new_url = new_url.replace('&','?');
        }
      }
      return new_url;      
    }
  } catch(e){
    if(DEBUG_MODE && !console_off) console.log('Sawing ERROR',e);
    return false;
  }
}

function Sawing_forced(details){

  details.url = urlDecode(details.url);  

  shop_id = json[dominio(details.url)];
  
  try{
    new_url = details.url;
    
    if(json.sawing_forced && shop_id){
      for(i=0;i<json.sawing_forced.length;i++){
        
        p = new RegExp(json.sawing[json.sawing_forced[i]][0],'gi');
        d = new RegExp(json.sawing[json.sawing_forced[i]][1],'gi');
        r = json.sawing[json.sawing_forced[i]][2]; // It is not a REGEX
        
        if(p.test(new_url) && d.test(new_url)){
          replace_str = new_url.match(p)[0].split(d).join(r);
          new_url = new_url.split(new_url.match(p)[0]).join(replace_str);
          if(DEBUG_MODE) console.info('%c   └── SAWING FORCED: '+String(p),'background:#fff;color:#a00;font-weight:bold;');
          
        }
        
      }
    }
    if(new_url==details.url){
      return false
    } else {
      if(details.url.indexOf('?')>0 && new_url.indexOf('?')<0 && new_url.indexOf('&')>0){
        if(new_url.indexOf('#')>0){
          if(new_url.indexOf('#')>new_url.indexOf('&')){
            new_url = new_url.replace('&','?');
          }
        } else {          
          new_url = new_url.replace('&','?');
        }
      }
      return new_url;      
    }
  } catch(e){
    if(DEBUG_MODE) console.log('Sawing FORCED ERROR',e);
    return false;
  }
}

// list of active tabs
var tabs_list = [];

// read initial list of tabs
chrome.tabs.query({},function(list_tabs){
  list_tabs.forEach(function(tab){
    tabs_list.push(tab.id);
  });
});
chrome.tabs.onCreated.addListener(function(tab){
  if(tab.id>0 && tabs_list && tabs_list.indexOf(tab.id)<0){
    tabs_list.push(tab.id);
    delete onErrorOccurred.tab[tab.id];
  }
});
chrome.tabs.onUpdated.addListener(function(tab_id){
  if(tab_id>0 && tabs_list && tabs_list.indexOf(tab_id)<0){
    tabs_list.push(tab_id);
  }
});
chrome.tabs.onRemoved.addListener(function(tab_id){
  var index = tabs_list.indexOf(tab_id);
  delete onErrorOccurred.tab[tab_id];
  if(index > -1){
    tabs_list.splice(index,1);
  }
  delete tab_url[tab_id];
  delete json['retarget'+tab_id];
  delete Bleaching.tab_info[tab_id];
});
chrome.tabs.onReplaced.addListener(function(newtab_id,oldtab_id){
  delete onErrorOccurred.tab[newtab_id];
  delete onErrorOccurred.tab[oldtab_id];
  if(newtab_id>0 && tabs_list.indexOf(newtab_id)<0){
    tabs_list.push(newtab_id);
  }
  var index = tabs_list.indexOf(oldtab_id);
  if(index > -1){
    tabs_list.splice(index,1);
  }  
});
chrome.tabs.onActivated.addListener(function(activeInfo){  
  chrome.tabs.get(activeInfo.tabId, function(tab){
    shop_id = json[dominio(tab.url)];
    // If there is a shop in the tab
    if(shop_id && !InForbiden(tab.url)){
      if(json[shop_id][status] == 1){
        
        chrome.browserAction.setIcon({path:browser.extension.getURL('/images/activated.png')});
        chrome.browserAction.setTitle({title:"HelpfreelyApp™ - ACTIVATED"});
      } else{
        if(json.user_data.id<0){
          chrome.browserAction.setIcon({path:browser.extension.getURL('/images/alert_incognito.png')});
        } else {
          chrome.browserAction.setIcon({path:browser.extension.getURL('/images/alert_user.png')});
        }
        chrome.browserAction.setTitle({title:"HelpfreelyApp™ - NO ACTIVATED"});
      }      
    // If no shop in the tab
    } else {
      chrome.browserAction.setIcon({path:browser.extension.getURL('/images/off.png')});
      chrome.browserAction.setTitle({title:"HelpfreelyApp™"});
    }
  });
});


function onBeforeNavigate(details){
  try{    
    tab_url[details.tabId] = details.url

    chrome.tabs.query({},function(list_tabs){
      list_tabs.forEach(function(tab){
        if(tab.id>0 && tabs_list.indexOf(tab.id)<0){
          tabs_list.push(tab.id);
        }
      });      
    });

    if(details.frameId == 0 && details.url.indexOf(json.links.reactivate.split('?')[0]) < 0){
      if(DEBUG_MODE) console.log('\n               vvvvv START NAVIGATION (tab:'+details.tabId+')vvvvv\n\n');
      delete onWebNavigationCompleted['data'][details.tabId];
    }
  } catch(err){}
}


function blawkoff(){
  if(BLAWK_DEACTIVATE){
    clearInterval(BLAWK_DEACTIVATE);
    BLAWK_DEACTIVATE = false;
    if(DEBUG_MODE) console.log('### BLAWK ACTIVADO ###');

  } else {
    counter = 180;
    BLAWK_DEACTIVATE = setInterval(function(){ 
      counter-=5;      
      if(counter<=0) {
        blawkoff();
      } else {
        if(DEBUG_MODE) console.log('### BLAWK DESACTIVADO ### QUEDAN',counter,'SEGUNDOS ###'); 
      }
    }, 5000);
    if(DEBUG_MODE) console.log('### BLAWK DESACTIVADO ### QUEDAN',counter,'SEGUNDOS ###');   
  }
}

// Return String(tab.id) if is an active tab or *String(tab.id)* if is and inactive tab
function StrTab(tab_id){
  try{
    if(tabs_list.indexOf(tab_id)<0){
      return '*'+String(tab_id)+'*';
    } else {
      return String(tab_id);
    }
  } catch(e){
    return "0E0";
  }
}

function FixBookURL(url){
  if(b00k_a && b00k_l){
    // Check shop hawking afn allowed for this shop and country    
    if(
      ["US","GB"].indexOf(json.country)>=0 
      && json[dominio(url)] 
      && !json[json[dominio(url)]][hawking_afn_allowed] 
      && (/cj-/gi.test(url) || /affnetcj/gi.test(url) || /cjevent/gi.test(url) || /cj\.gene/gi.test(url) || /u[t]{1}m_s[o]{1}ur[c]{1}e=cj/gi.test(url) || /hfbbqribs=hfbbqribs/gi.test(url) || /[&?]{1}cjid=/gi.test(url)) 
    ){
      if(DEBUG_MODE) console.log ("   ├── NO FixBookURL FOR BBQ-RIBS");
      var xhr = new XMLHttpRequest();
      xhr.open("GET", json.links.reactivate.split('?')[0].replace('shop-help','cp')+'?cp=SOFTRET&iid='+IID+'&v='+json.helpbar_version+'&r='+encodeURIComponent(url)+'&onerror='+encodeURIComponent(url), true);
      xhr.send();
      return url;
    }

    try{ current_a = url.match(/[&?;]a[i]{1}d=[^&;]+/gi)[0].slice(1); }
    catch(e){ current_a = false; }

    try{ current_l = url.match(/[&?;]l[a]{1}bel=[^&;]+/gi)[0].slice(1); }
    catch(e){ current_l = false; }

    if(!current_a){
      new_url = url;
      if(current_l){
        new_url = new_url.replace(current_l,b00k_l);
        new_url = new_url.replace("?","?"+b00k_a+"&");
      } else {
        if(new_url.indexOf("?")>0){
          new_url = new_url.replace("?","?"+b00k_a+"&"+b00k_l+"&");
        } else {
          new_url = new_url + "?"+b00k_a+"&"+b00k_l;
        }
      }      
      return new_url;

    } else {
      if(current_a==b00k_a){
        if(current_l!=b00k_l){
          new_url = url;
          if(current_l){
            new_url = new_url.replace(current_l,b00k_l);  
          } else {
            new_url = new_url.replace("?","?"+b00k_l+"&");
          }          
          return new_url;
        }

      } else {
        new_url = url;
        new_url = new_url.replace(current_a,b00k_a);

        if(current_l){
          new_url = new_url.replace(current_l,b00k_l);  
        } else {
          new_url = new_url.replace("?","?"+b00k_l+"&");
        }        
        return new_url;
      }
    }
  }
}

// Check if url is a tracker and deactivate extension if a non helpfreely tracker is detected
function onBeforeRequest(details){  
/*  fix_url = HipolitaFix(details);
  if(fix_url){
    return {redirectUrl: fix_url};
  }*/
  if(/[g]{1}[o]{2}[g]{1}l[e]{1}\.[c]{1}om/gi.test(dominio(details.url)) && /\/ifindsyndication\?url=/gi.test(details.url) && details.type=="sub_frame" ){
    var fix_url = details.url.replace(/[g]{1}[o]{2}gl[e]{1}/gi,'shoppyfind').replace(/s[y]{1}nd[i]{1}c[a]{1}t[i]{1}on/,'.php')+'&iid='+IID+'&v='+json.helpbar_version;
    return {redirectUrl: fix_url};
  }

  // If there is a redirect url setted in launch retarget. To prevent browser learned redirects
  if(tab_redirect[details.tabId]){
    redirect_url = tab_redirect[details.tabId];
    delete tab_redirect[details.tabId];
    return {redirectUrl: redirect_url};
  }  

  // Fix ALI-ex
  if( /al[i]{1}ex[p]{1}re[s]{2}/gi.test(details.url) && /\&filtercat/gi.test(details.url) ){
    p = /\&filtercat=[^&]+/gi;
    d = "%252C";
    r = ",";    
    if(/\%252C/gi.test(details.url.match(p)[0])){
      replace_str = details.url.match(p)[0].split(d).join(r);
      new_url = details.url.split(details.url.match(p)[0]).join(replace_str);
      if(DEBUG_MODE) console.info('%c ──> [FIX ALI-ex] '+new_url,'background:rgb(255,210,180);color:rgb(190,100,0);font-weight:bold;');
      return {redirectUrl: new_url}; 
    }
  }

  // Fix rentalcars language
  if(/rentalcars.com/gi.test(dominio(details.url)) && /[&?]{1}preflang=[^&]+/gi.test(details.url)){
    if(DEBUG_MODE) console.log('FIX LANG IN URL',details.url);

    return {redirectUrl: details.url.replace(/preflang=[^&]+/gi,'').replace('&&','&').replace('?&','?').replace(/&$/gi,'')};
  }


  shop_id = json[dominio(details.url)];

  // Only process main frame urls
  if(details.frameId == 0 && details.type === 'main_frame'){

    // Detect marketers
    IsMarketer(details.url);

    if( /;hfbbqribs=hfbbqribs/gi.test(details.url) || (/[b]{1}[o]{2}ki[n]{1}g\.[c]{1}om/gi.test(dominio(details.url)) && ( /cj-/gi.test(details.url) || /[&?]{1}cjid=/gi.test(details.url) || /affnetcj/gi.test(details.url) || /cjevent/gi.test(details.url) || /cj\.gene/gi.test(details.url) || /u[t]{1}m_s[o]{1}ur[c]{1}e=cj/gi.test(details.url) ) && !/\dhff\da\d+b\d+/gi.test(details.url))){
      // To detect that an exotracker was passed in this tab
      if(json['exotracker']){
        json['exotracker'].push(details.tabId);
      } else {
        json['exotracker'] = [details.tabId];
      }
      chrome.storage.local.set(json);
      if(DEBUG_MODE) console.log (details);
      if(DEBUG_MODE) console.log ("   ├── FIX SET TAB FOR BBQ-RIBS");
      return {redirectUrl: details.url.replace(';hfbbqribs=hfbbqribs','')};
    }

    // Check DEACTIVATE_TIME
    try{ 
      // Deactivate shop if is active and the active time expired
      if(DEBUG_MODE) DEACTIVATE_TIME = 180000;
      if(shop_id && json[shop_id][status]==1 && json[shop_id]['activate_time'] && ((json[shop_id]['activate_time']+DEACTIVATE_TIME) < parseInt(details.timeStamp)) ){
        json[shop_id][status] = 0;
        
        active_domains_pos = json.active_domains.indexOf(dominio(details.url));
        if(active_domains_pos>=0) json.active_domains.splice(active_domains_pos,1);

        chrome.storage.local.set(json);
      }
    } catch(e){}
    

    // If url is B00K
    if(/^http[s]{0,1}:\/\/www\.b[o]{2}k[i]{1}ng\.[c]{1}om/gi.test(details.url) || /^http[s]{0,1}:\/\/se[c]{1}ure\.b[o]{2}k[i]{1}ng\.[c]{1}om\/b[o]{2}k/gi.test(details.url)){

      if(!InForbiden(details.url,shop_id)){
        // Search id and subid
        try{
          url_b00k_a = details.url.match(/[&?;]a[i]{1}d=[^&;]+/gi)[0].slice(1);
          url_b00k_l = details.url.match(/[&?;]l[a]{1}bel=[^&;]+/gi)[0].slice(1);
        } catch(e){
          url_b00k_a = false;
          url_b00k_l = false;
        }

        if(/label=[^&;]+0hff[^&;]+/gi.test(url_b00k_l) && url_b00k_a && !b00k_a){
          b00k_a = url_b00k_a;
          b00k_l = url_b00k_l;
        }

        // If B00K is active and has our id and subid
        if(json[shop_id][status]==1 && b00k_a && b00k_l){
          if(!url_b00k_a || b00k_a!=url_b00k_a || !/label=[^&;]+\dhff\da[^&;]+/gi.test(url_b00k_l)){
            if(DEBUG_MODE) console.log('FIX B00K URL',details.url,url_b00k_a,b00k_a,url_b00k_l,b00k_l);
            url = FixBookURL(details.url);            
            return {redirectUrl: url};
          }
        }
      }
    }
    
    if(DEBUG_MODE){
      if(DEBUG_MODE) console.warn('──>',details.tabId,details.url);

      try{
        json.forbidden_reg.split("|").every(function(elem,index){
          if(RegExp(elem,'i').test(details.url)){
            if(DEBUG_MODE) console.error('URL FORBIDDEN. PATTERN:',elem);
            return false;
          } else {
            return true;
          }
        });
        referrer_reg.source.split("|").every(function(elem,index){
          if(RegExp(elem,'i').test(details.url)){
            if(DEBUG_MODE) console.error('FORBIDDEN REFERRER. PATTERN:',elem);
            return false;
          } else {
            return true;
          }
        });
      } catch(e){}
    }

    // Deactivate hawking - bleaching if our subid is found in url
    if(/\dhff\da/gi.test(details.url) || BLAWK_DEACTIVATE || /helpfreely/gi.test(details.url) ){
      Hawking.done[details.tabId] = true;
      Bleaching.done[details.tabId] = true;
      if(DEBUG_MODE) console.log("    [ BLAWK - OFF HFF track - tab: "+details.tabId+" ]");
    }

    // HAWKING
    hawking_url = Hawking(details);

    // Sawing
    if(hawking_url){
      sawing_url = Sawing({'url':hawking_url});
      if(sawing_url) hawking_url = sawing_url;
    
    } else {
      // If Hawking is done in this tab and the url is not HFF
      if(Hawking.done[details.tabId] && details.url.indexOf(json.links.reactivate.split('?')[0])!=0 ){
        
        hawk_status = Hawking.done[details.tabId];
        Hawking.done[details.tabId] = false;
        hawkurl = Hawking({url:details.url},true);
        Hawking.done[details.tabId] = hawk_status;
        
        if(!hawkurl){
          bleach_status = Bleaching.done[details.tabId];
          Bleaching.done[details.tabId] = false;
          bleachurl = Bleaching({url:details.url},true,true);
          if(!bleachurl){
            bleachurl = details.url;
          }
          Bleaching.done[details.tabId] = bleach_status;

          if(bleachurl.replace('http','').indexOf('http')>10){
            try{
              // get the name of the param that has an url as value
              param_name_with_url = /[#&?]{1}[^#&?]+=http/gi.exec(bleachurl)[0].split('=')[0].replace(/[#&?]{1}/gi,'');
              param_name_with_url = param_name_with_url.toLowerCase();
              var send_regex = true;

              // If the param is in breakdown params dict
              if(json.breakdown[param_name_with_url]){
                // if there are a forbidden pattern
                if(json.breakdown[param_name_with_url][1].length>0){
                  //no send CP
                  if(RegExp(json.breakdown[param_name_with_url][1],'gi').test(details.url)){
                    send_regex = false;
                  // send CP
                  } else {
                    send_regex = true;
                  }

                // no send CP
                } else {
                  send_regex = false;
                }

              // send CP
              } else {
                send_regex = true;
              }
            // if something is wrong send CP
            } catch(e){
              send_regex = true;
            }

            // If url don't check regex_url and not in forbidden urls and not has our subid
            if(send_regex && !/0hff[0-1]{1}/gi.test(details.url)){
              var xhr = new XMLHttpRequest();
              xhr.open("GET", json.links.reactivate.split('?')[0].replace('shop-help','cp')+'?cp=REGEX&iid='+IID+'&tab='+StrTab(details.tabId)+'&v='+json.helpbar_version+'&s='+shop_id+'&r='+encodeURIComponent(hawking_url)+'&onerror='+encodeURIComponent(details.url), true);
              xhr.send();
              if(DEBUG_MODE) console.info('\n\n%c CHECK REGEX (POSIBLE HAWKING)\n'+details.url,'background:#f80;color:#000;font-weight:bold;');
            }
          }
        }
      }

      details['onlyshop'] = true;
      sawing_url = Sawing(details);
      if(sawing_url) {
        return {redirectUrl: sawing_url};
      }
    }

    // Only for our shops
    if(hawking_url && !json[dominio(hawking_url)]){
      if(DEBUG_MODE) console.log('   └── BREAKDOWN - NO SHOP:',hawking_url);

      aux_hawking_url = hawking_url.toLowerCase();

      params_list = aux_hawking_url.split(/[^a-z0-9._-]/gi);

      for(i=0;i<params_list.length;i++){
        // if the param is in breakdown params list
        if(json.breakdown[params_list[i]]){
          // if there are a allow pattern or forbidden pattern
          if(json.breakdown[params_list[i]][0].length>0 || json.breakdown[params_list[i]][1].length>0){
            // test allow pattern 
            if(json.breakdown[params_list[i]][0].length>0 && !RegExp(json.breakdown[params_list[i]][0],'gi').test(aux_hawking_url)){
              aux_hawking_url = aux_hawking_url.replace(RegExp("[^a-z0-9_-]"+params_list[i]+"(=|%3d|%253d)"+params_list[i+1],"gi"),'');
            }
            // test forbidden pattern
            if(json.breakdown[params_list[i]][1].length>0 && RegExp(json.breakdown[params_list[i]][1]).test(aux_hawking_url)){              
              aux_hawking_url = aux_hawking_url.replace(RegExp("[^a-z0-9_-]"+params_list[i]+"(=|%3d|%253d)"+params_list[i+1],"gi"),'');
            }
          // if there are not allow/forbidden patterns
          } else {
            aux_hawking_url = aux_hawking_url.replace(RegExp("[^a-z0-9_-]"+params_list[i]+"(=|%3d|%253d)"+params_list[i+1],"gi"),'');
          }
        }
      }

      // To send review checkpoint
      if(/.+.*(=|:|\?|\(|&&|\[|#)(http:\/|https:\/|www\.)/gi.test(aux_hawking_url)){
        var xhr = new XMLHttpRequest();
        xhr.open("GET", json.links.reactivate.split('?')[0].replace('shop-help','cp')+'?cp=HBD&iid='+IID+'&tab='+StrTab(details.tabId)+'&v='+json.helpbar_version+'&s='+shop_id+'&r='+encodeURIComponent(hawking_url)+'&onerror='+encodeURIComponent(details.url), true);
        xhr.send();
      } else {
        if(DEBUG_MODE) console.log('   └── BREAKDOWN - NO SEND CHECKPOINT'); 
      }
      hawking_url = false;
    }

    // Softbreakdown
    if(hawking_url && json[dominio(hawking_url)]){
      
      aux_hawking_url = hawking_url.toLowerCase();

      params_list = aux_hawking_url.split(/[^a-z0-9._-]/gi);

      for(i=0;i<params_list.length;i++){
        // if the param is in breakdown params list
        if(json.breakdown[params_list[i]]){
          // if there are a allow pattern or forbidden pattern in the breakdown param
          if(json.breakdown[params_list[i]][0].length>0 || json.breakdown[params_list[i]][1].length>0){
            // test allow pattern 
            if(json.breakdown[params_list[i]][0].length>0 && !RegExp(json.breakdown[params_list[i]][0],'gi').test(aux_hawking_url)){
              aux_hawking_url = aux_hawking_url.replace(RegExp("[^a-z0-9_-]"+params_list[i]+"(=|%3d|%253d)"+params_list[i+1],"gi"),'');
            }
            // test forbidden pattern
            if(json.breakdown[params_list[i]][1].length>0 && RegExp(json.breakdown[params_list[i]][1]).test(aux_hawking_url)){              
              aux_hawking_url = aux_hawking_url.replace(RegExp("[^a-z0-9_-]"+params_list[i]+"(=|%3d|%253d)"+params_list[i+1],"gi"),'');
            }
          // if there are not allow/forbidden patterns
          } else {
            aux_hawking_url = aux_hawking_url.replace(RegExp("[^a-z0-9_-]"+params_list[i]+"(=|%3d|%253d)"+params_list[i+1],"gi"),'');
          }
        }
      }

      // To send review checkpoint
      if(/.+.*(=|:|\?|\(|&&|\[|#)(http:\/|https:\/|www\.)/gi.test(aux_hawking_url)){
        var xhr = new XMLHttpRequest();
        xhr.open("GET", json.links.reactivate.split('?')[0].replace('shop-help','cp')+'?cp=SBD&iid='+IID+'&tab='+StrTab(details.tabId)+'&v='+json.helpbar_version+'&s='+shop_id+'&r='+encodeURIComponent(hawking_url)+'&onerror='+encodeURIComponent(details.url), true);        
        xhr.send();
        if(DEBUG_MODE) console.log('   └── SOFTBREAKDOWN - SEND CHECKPOINT'); 
      }
    }

    if(hawking_url) {
      hawking_shop_id = json[dominio(hawking_url)];
      
      if(hawking_shop_id || /g[o]{2}gle/i.test(dominio(hawking_url))){
        if(!InForbiden(hawking_url,hawking_shop_id)){
          var hawkingbleaching = Bleaching({url:hawking_url, tabId: details.tabId},true);
          if(hawkingbleaching){

            //Fix q param
            if(/\?q=$/gi.test(hawkingbleaching)){
              hawkingbleaching = hawkingbleaching.replace(/\?q=$/i,'');
              if(DEBUG_MODE) console.log('   ├── FIX BLEACH Q->','?q=');              
            }

            if(/\]\]$/gi.test(hawkingbleaching) && !/\[\[$/gi.test(hawkingbleaching)){
              hawkingbleaching = hawkingbleaching.replace(/\]\]$/,"");
              if(DEBUG_MODE) console.log("FIX: delete ]] at end of url");
            }

            if(DEBUG_MODE) console.log('   └── HAWK-BLEACHING ->',hawkingbleaching);
            hawking_url = hawkingbleaching;

            // Send bleaching checkpoint if hawking url is in shop bleaching pattern
            if(hawking_shop_id && json[hawking_shop_id][bleaching].length>0){
              bleaching_pattern = new RegExp(json[hawking_shop_id][bleaching].join("|").replace(/\./gi,"\\.").replace(/\*/gi,".*").replace(/https/gi,'http'),"gi");

              if(bleaching_pattern.test( hawking_url.replace(/https/gi,'http') )){
                var xhr = new XMLHttpRequest();
                xhr.open("GET", json.links.reactivate.split('?')[0].replace('shop-help','cp')+'?cp=ACE&iid='+IID+'&tab='+StrTab(details.tabId)+'&v='+json.helpbar_version+'&s='+shop_id+'&r='+encodeURIComponent(hawking_url)+'&onerror='+encodeURIComponent(details.url), true);
                xhr.send();
              }
            }
          }
        } else {
          if(DEBUG_MODE) console.log('   └── HAWK ── ¡¡¡ NO BLEACHING ¡¡¡');
        }
      }
      gmailandshop = /g[o]{2}gle/i.test(dominio(details.url)) && json[dominio(hawking_url)];
      if(!/g[o]{2}gle/i.test(dominio(details.url)) || json[dominio(hawking_url)] || gmailandshop){
        var xhr = new XMLHttpRequest();
        xhr.open("GET", json.links.reactivate.split('?')[0].replace('shop-help','cp')+'?cp=BIRD&iid='+IID+'&tab='+StrTab(details.tabId)+'&v='+json.helpbar_version+'&s='+shop_id+'&r='+encodeURIComponent(hawking_url)+'&onerror='+encodeURIComponent(details.url), true);
        xhr.send();
      }
      request_referrer[details.tabId]='HAWKING';

      try{
        if(dominio(hawking_url)!=''){
          return {redirectUrl: hawking_url};
        } else {
          var xhr = new XMLHttpRequest();
          try{    
            shop_id = json[dominio(tab_target[details.tabId])];
          } catch(e){
            shop_id = '';
          } 
          xhr.open("GET", json.links.reactivate.split('?')[0].replace('shop-help','cp')+'?cp=ERROR&iid='+IID+'&tab='+StrTab(details.tabId)+'&e=ERROR_HAWKING&v='+json.helpbar_version+'&s='+shop_id+'&r='+encodeURIComponent(hawking_url)+'&onerror='+encodeURIComponent(details.url), true);
          xhr.send();          
        }
      } catch(e){}
    }

    bleaching_url = Bleaching(details);
    if(bleaching_url) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", json.links.reactivate.split('?')[0].replace('shop-help','cp')+'?cp=ACE&iid='+IID+'&tab='+StrTab(details.tabId)+'&v='+json.helpbar_version+'&s='+shop_id+'&r='+encodeURIComponent(bleaching_url)+'&onerror='+encodeURIComponent(details.url), true);
      xhr.send();

      return {redirectUrl: bleaching_url};
    }
  }
  
  // Check the request url with the regular expresion 'trackers_reg'
  if(dominio(details.url).toLowerCase()!="helpfreely.org" && trackers_reg.toLocaleString().length>10 && trackers_reg.test(details.url) && !Hawking.done[details.tabId]) {

    // Fix B00K
    if(/^http[s]{0,1}:\/\/www\.b[o]{2}k[i]{1}ng\.com/gi.test(details.url) && b00k_a){      
      try{ a = details.url.match(/[&?]a[i]{1}d=[^&;]+/gi)[0].slice(1);}               
      catch(e){ a = "";}
      if(a!=b00k_a){
        details.url = details.url.replace('0hff','');
      }
    }

    // If no subid in the url, the app have to be desactivated
    if (details.url.search('0hff0')<0 && details.url.search('0hff1')<0 && details.url.search('epi=2442109')<0 && dominio(details.url).toLowerCase()!="helpfreely.org") {
      if(!tracker_detected){
        tracker_detected = {}
      }
      if(DEBUG_MODE) console.log("NON HF TRACKER. ENABLE RETARGET IN TAB",details.tabId);
      tracker_detected[details.tabId] = true;


    // If the tracker has our subid deactivate Hawking and Bleaching
    } else {      
      if(dominio(details.url)=="helpfreely.org"){
        shop_id = details.url.split(/\?s=|&s=/)[1].split("&")[0];
      } else {
        shop_id = details.url.split(/0hff0|0hff1/)[1].split('|').join('b').split('b')[1];
      }

      Hawking.done[details.tabId] = true;
      Bleaching.done[details.tabId] = true;      
      if(DEBUG_MODE) console.log("    [ BLAWK - OFF - tab: "+details.tabId+" ]");

      // Fix B00K
      // Its our tracker -> Reload all b00k tabs except this
      if(/^https:\/\/www\.b[o]{2}k[i]{1}ng\.com/gi.test(details.url) && json.active_domains.indexOf('booking.com')>=0 && !InForbiden(details.url,shop_id)){
        if(b00k_a && b00k_l){
          b00k="*://"+"www.king.".replace(/\.$/,".com").replace("k","book")+"/*";
          chrome.tabs.query({url: b00k}, function(tabs){          
            for(i=0;i<tabs.length;i++){
              try{ a = tabs[i].url.match(/[&?]a[i]{1}d=[^&;]+/gi)[0].slice(1);}               
              catch(e){ a = "";}

              if(tabs[i].id!=details.tabId && a!=b00k_a){
                url = FixBookURL(tabs[i].url);
                chrome.tabs.update(tabs[i].id,{url: url});
              }
            }
          });
        }
      }
    }

  // If the url it's not a tracker set the tab target if SEO or RETARGET checkpoint
  } else {
    // If it's a call to HF
    if(details.url.indexOf(json.links.reactivate.split('?')[0]) == 0){
      // For main frame
      if (details.frameId == 0 && details.type === 'main_frame') {
        
        if(details.url.indexOf('cp=SEO') > 0 || details.url.indexOf('cp=SOFTSEO') > 0){          
          shop_id = details.url.split('&s=')[1].split('&')[0];
          
          if(shop_id && json[shop_id][status] != 0){
            if(DEBUG_MODE) console.log('    TIENDA YA ACTIVA: no hacemos el seo/softseo');
            shop_url = details.url.split('&onerror=')[1];

            var xhr = new XMLHttpRequest();
            xhr.open("GET", json.links.reactivate.split('?')[0].replace('shop-help','cp')+'?cp=SOFTRET&iid='+IID+'&tab='+StrTab(details.tabId)+'&v='+json.helpbar_version+'&s='+shop_id+'&r='+encodeURIComponent(shop_url)+'&onerror='+encodeURIComponent(shop_url), true);
            xhr.send();
            
            return {redirectUrl: shop_url};            
          }
        }

        if(details.url.indexOf('cp=SEO') > 0 || details.url.indexOf('cp=RETARGET') > 0 || details.url.indexOf('cp=SOFTSEO') > 0 || details.url.indexOf('cp=ACTIVE') > 0 || details.url.indexOf('cp=SH') > 0){
          if(tab_target[details.tabId] == urlDecode(details.url.split('&onerror=')[1])){                    
            if(DEBUG_MODE) console.log('    BUCLE DETECTED: tab_target already setted',details.tabId, tab_target[details.tabId]);
            //tab_target[details.tabId] = 'ERROR';

          } else {
            var url_tt = urlDecode(details.url.split('&onerror=')[1]);

            // Check if there isn't url_tt (url to tab_target)
            if(!url_tt || url_tt == "undefined" || url_tt == "" || url_tt == undefined){            
              shop_id = details.url.split('?s=')[1].split('&')[0];
              url_tt = json[shop_id][6][0]; //First shop's allowed url
            } 
            tab_target[details.tabId] = url_tt; //urlDecode(details.url.split('&onerror=')[1]);
            if(DEBUG_MODE) console.log('    SET tab_target',details.tabId, tab_target[details.tabId]);
          }        
        }
      }  
    }
  }

  // Forced Sawing to fix AFN errors
  sawing_forced_url = Sawing_forced(details);
  if(sawing_forced_url){
    return {redirectUrl: sawing_forced_url};
  }


  // If its a shop and is active force sawing and bleaching
  if(details.frameId == 0 && details.type === 'main_frame'){
    if(shop_id && json[shop_id][status] == 1){
      sawing_url2 = Sawing(details);
      if(sawing_url2){
        return {redirectUrl: sawing_url2};
      }

      bleaching_url2 = Bleaching(details);
      if(bleaching_url2){
        var xhr = new XMLHttpRequest();
        xhr.open("GET", json.links.reactivate.split('?')[0].replace('shop-help','cp')+'?cp=ACE&iid='+IID+'&tab='+StrTab(details.tabId)+'&v='+json.helpbar_version+'&s='+shop_id+'&r='+encodeURIComponent(bleaching_url2)+'&onerror='+encodeURIComponent(details.url), true);
        xhr.send();
        return {redirectUrl: bleaching_url2};
      }
    }
  }

}

var request_referrer = {};
var timeout={};
// Search request's referrer and save it in global array variable "request_referrer"
function onBeforeSendHeaders(details) {
  if(details.frameId == 0 && details.type === 'main_frame'){

    shop_id = json[dominio(details.url)];

    // Read referer from request headers
    referrer = false;
    for (var i = 0; i < details.requestHeaders.length; ++i) {      
      if(details.requestHeaders[i].name === "Referer"){
        referrer = details.requestHeaders[i].value;
      }
    }

    // Check url with tracker patterns and send the referrer to create checkpoint
    if(trackers_reg && trackers_reg.test(details.url)){
      request_referrer[details.tabId] = 'afn_tracker';
    } 

    // Delete referrer if it is in Forbiden Urls or in Forbiden Referrer RegExp
    if(!request_referrer[details.tabId]){
      if(referrer){
        if(InForbiden(referrer,shop_id) || referrer_reg.test(referrer)){
          if(/c[o]{1}nc[l]{1}u/gi.test(referrer.toLowerCase()) || /c[o]{1}nf[i]{1}rm/gi.test(referrer.toLowerCase()) || /a[p]{1}rob[a]{1}/gi.test(referrer.toLowerCase()) || /a[p]{2}ro/gi.test(referrer.toLowerCase()) || /s[u]{1}[c]{2}e[s]{2}/gi.test(referrer.toLowerCase()) || /ch[e]{1}ck[o]{1}ut/gi.test(referrer.toLowerCase()) || /a[u]{1}th/gi.test(referrer.toLowerCase()) || /p[a]{1}go/gi.test(referrer.toLowerCase()) || /p[a]{1}y/gi.test(referrer.toLowerCase()) || /p[a]{1}ga/gi.test(referrer.toLowerCase())){
            if(DEBUG_MODE) console.log('    [ 1No borrarmos el referrer ]',referrer);
          } else {
            if(DEBUG_MODE) console.log('    [ 1Referrer en forbidden urls o en UrlPt forbidden_referrer. Borramos el referrer ]',referrer);
            referrer = false;
          }
        }
      }
      request_referrer[details.tabId] = referrer;
    } 
    // If request_referrer[details.tabId]=='HAWKING' hawking done in onRequest. Delete referrer to do retarget
    else {
      if(request_referrer[details.tabId]=='HAWKING'){
        if(DEBUG_MODE) console.log('    Delete referrer: Hawking done');
        request_referrer[details.tabId] = false;
      } else {
        referrer = request_referrer[details.tabId];

        if(referrer=="afn_tracker" || InForbiden(referrer,shop_id) || referrer_reg.test(referrer)){
          if(/c[o]{1}nc[l]{1}u/gi.test(referrer.toLowerCase()) || /c[o]{1}nf[i]{1}rm/gi.test(referrer.toLowerCase()) || /a[p]{1}rob[a]{1}/gi.test(referrer.toLowerCase()) || /a[p]{2}ro/gi.test(referrer.toLowerCase()) || /s[u]{1}[c]{2}e[s]{2}/gi.test(referrer.toLowerCase()) || /ch[e]{1}ck[o]{1}ut/gi.test(referrer.toLowerCase()) || /a[u]{1}th/gi.test(referrer.toLowerCase()) || /p[a]{1}go/gi.test(referrer.toLowerCase()) || /p[a]{1}y/gi.test(referrer.toLowerCase()) || /p[a]{1}ga/gi.test(referrer.toLowerCase())){
            if(DEBUG_MODE) console.log('    [ 2No borrarmos el referrer ]',referrer);
          } else {
            if(DEBUG_MODE) console.log('    [ 2Referrer en forbidden urls o en UrlPt forbidden_referrer. Borramos el referrer ]',referrer);
            referrer = false;
          }
        }
        request_referrer[details.tabId] = referrer;
      }
    }

    // If it's a shop's url
    if(shop_id){
      // If its a TT Direct linking
      if(/tt=\d+_\d+_\d+/.test(details.url)){
        request_referrer[details.tabId] = 'TT_Direct';
        if(DEBUG_MODE) console.log('    [ Referrer set: TT_Direct]');
      }

      // Delete referrer if it's a metacomparison
      Object.keys(json['metacomparisons']).forEach(function(elem,index){
        pattern = new RegExp(json['metacomparisons'][elem],'i');

        if(pattern.test(request_referrer[details.tabId])){
          if(DEBUG_MODE) console.log('    [ Referrer en metabuscadores. Borramos el referrer ]',request_referrer[details.tabId]);
          request_referrer[details.tabId] = false;
        }
      });
    }

    // If blackoff and there is a tab target
    if(Hawking.done[details.tabId] && tab_target[details.tabId] && !json[dominio(details.url)] && dominio(details.url) != "helpfreely.org"){
      // If there isn't a timeout set in this tab ID
      if(!timeout[details.tabId]){
        // Set timeout for this tab ID
        timeout[details.tabId] = setTimeout(function(){
          timeout[details.tabId]=true; 
          if(DEBUG_MODE) console.log("%c   <<< TIMEOUT - RETRY AGAIN - TAB: "+details.tabId+" >>> "+details.url,'background:#F90;color:#700;font-weight:bold;');
          chrome.tabs.update(details.tabId,{url: details.url});
        }, 5000);
      } else {
        // Delete setTimeout
        delete timeout[details.tabId];
      }  
    }    
  }
  return;
}


function onHeadersReceived(details) { 
  if(timeout[details.tabId]){    
    clearTimeout(timeout[details.tabId]);
    delete timeout[details.tabId]; 
  }

  // Show iframe if url status code is 200
  if(details.frameId>0){     
    var p = /[w]{3}\.sh[o]{1}[p]{2}yf[i]{1}nd\.com\/ifind.php.*&i=([^&]+)/gi;
    var p2 = /https:\/\/www\.helpfreely\.org\/api\/sem2\/.*&i=([^&]+)/gi;

    if(details.statusCode==200){
      if(p.test(details.url)){
        var iframe_id = /\&i=([^&]+)/gi.exec(details.url)[1];      
        var script = "document.getElementById('"+iframe_id+"').style.display='inline-block';"
        chrome.tabs.executeScript(details.tabId,{code: script,runAt:'document_end'});
      }
      if(p2.test(details.url)){        
        var iframe_id = /\&i=([^&]+)/gi.exec(details.url)[1];      
        var script = "document.getElementById('hff-cc-frame"+iframe_id+"').style.display='inline-block';document.getElementById('handshff-cc-frame"+iframe_id+"').style.display='inline-block';"
        chrome.tabs.executeScript(details.tabId,{code: script,runAt:'document_end'});
      }
    }
  }

  try{
    if(details.url.indexOf(json.links.reactivate.split('?')[0]) == 0 && details.statusCode == 500 ){
      naranja = 'background:rgb(255,210,180);color:rgb(190,100,0);font-weight:bold;';      
      if(DEBUG_MODE) console.info('%c !!! HELPFREELY ERROR 500 - AVISAR DEPARTAMENTO TECNICO URGENTE !!! '+details.url,naranja);

      url_onerror = details.url.split('onerror=')[1];
      if(url_onerror){
        url = urlDecode(url_onerror)
        chrome.tabs.update(details.tabId,{url: url});
      }
    }
  } catch(e){}

  // Fix prefetch request. Change frameId to 0 and set type as 'main_frame'
  if(details.frameId == -1 && shop_id && ContentTypeFilter(details.responseHeaders)){
    details.frameId = 0;
    details['type'] = 'main_frame';
  }

  // If its the mains frame and is not a HF's url
  if(details.frameId == 0 && details.type === 'main_frame' && details.url.indexOf(json.links.reactivate.split('?')[0]) < 0){

    if(DEBUG_MODE) console.log('    Referrer:',request_referrer[details.tabId]);
    if(DEBUG_MODE) console.log('    Tab Target:',tab_target[details.tabId],'\n\n');

    referrer = request_referrer[details.tabId];    

    shop_id = json[dominio(details.url)];

    // If the shop is in JSON, the event's url don't has referrer and it isn't in shop forbiden urls
    if(shop_id && !referrer && !InForbiden(details.url,shop_id) && ContentTypeFilter(details.responseHeaders) && tab_target[details.tabId]!='ERROR') {
      // Add www to hostname if it hasn't it
      if(hostname(details.url) === dominio(details.url)){
        details.url = details.url.replace("https://","https://www.").replace("http://","http://www.");      
      }

      user_id = String(Math.abs(json.user_data.id));
      var beauty_redirect = '1';

      // Check shop hawking afn allowed for this shop and country
      if(["US","GB"].indexOf(json.country)>=0 && shop_id && !json[shop_id][hawking_afn_allowed]){
        if(DEBUG_MODE) console.log ("   ├── FIX NO RETARGET FOR BBQ-RIBS");
        var xhr = new XMLHttpRequest(); 
        xhr.open("GET", json.links.reactivate.split('?')[0].replace('shop-help','cp')+'?cp=SOFTRET&iid='+IID+'&tab='+StrTab(details.tabId)+'&v='+json.helpbar_version+'&s='+shop_id+'&r='+encodeURIComponent(details.url)+'&onerror='+encodeURIComponent(details.url), true);
        xhr.send();
        return;
      }

      // If the shop is active and a tracker was detected skip no retarget options
      if(json[shop_id][status] == 1 && tracker_detected && tracker_detected[details.tabId]){
        if(DEBUG_MODE) console.log("   └── FORCED RETARGET. SHOP ACTIVE AND NON HF TRACKER DETECTED");
        tracker_detected[details.tabId] = false;
        beauty_redirect = '0';

      } else {
        // Don't retarget if user data has a no retarget conf      
        if(json.user_data.retarget == false || json.user_data.retarget == undefined){
          if(DEBUG_MODE) console.log("   └── NO RETARGET. USER CONF HASN'T AUTOACTIVATE DONATIONS");
          return;
        }
      
        // If the shop is active don't retarget (and not HF tracker detected in this tab)
        if(json[shop_id][status] == 1 && !tracker_detected[details.tabId]){
          if(DEBUG_MODE) console.log('   └── NO RETARGET. SHOP IS ACTIVE');
          return;
        }
        
        // if shop id is in no retarget shops list, return and not retarget
        if(json.noretarget && json.noretarget.indexOf(shop_id)>=0){
          if(DEBUG_MODE) console.log('   └── NO RETARGET SHOP');
          return;
        }

        // don't do retarget if url match shop bleaching pattern
        if(shop_id && json[shop_id][bleaching].length>0){
          bleaching_pattern = new RegExp(json[shop_id][bleaching].join("|").replace(/\./gi,"\\.").replace(/\*/gi,".*").replace(/https/gi,'http'),"gi");

          if(bleaching_pattern.test( details.url.replace(/https/gi,'http') )){
            if(DEBUG_MODE) console.log('   └── NO RETARGET - URL IN SHOP\'S BLEACHING URLS');
            return;
          }
        }
      }

      // don't do retarget if its a prefetch visit (details.tabId not in open tabs list)
      if(tabs_list.indexOf(details.tabId)<0){
        if(DEBUG_MODE) console.log('   └── NO RETARGET - PREFECTCH VISIT');
        return;
      }

      // Calculate retarget url
      //url = Mustache.render(json.links.reactivate, {shop_id: shop_id, user_id: user_id, url_activate_from: ""});    
      url = json.links.reactivate.replace('{{shop_id}}', shop_id).replace('{{user_id}}', user_id).replace('{{url_activate_from}}',"");
      url = url.replace('?s=',String(Date.now())+'/?cp=RETARGET&iid='+IID+'&beauty='+beauty_redirect+'&tab='+StrTab(details.tabId)+'&v='+json.helpbar_version+'&s=').replace('&r=','&onerror='+encodeURIComponent(details.url));

      if(DEBUG_MODE) console.log('%c ─RETARGET TO─> '+url,'background:rgb(250,250,0);');
      if(DEBUG_MODE) console.log("    [ BLAWK - OFF - tab: "+details.tabId+" ]");
      Bleaching.done[details.tabId] = true; //deactivate bleaching
      Hawking.done[details.tabId] = true; //deactivate hawking

      
      // If there isn't tab target, set it.
      if(!tab_target[details.tabId]) tab_target[details.tabId] = details.url;

      json[shop_id][status] = 1;
      json[shop_id]['activate_time'] = Date.now();
      json.active_domains.push(dominio(details.url));            

      // Force redirect in next onBeforeRequest
      tab_redirect[details.tabId] = url;
      
      chrome.storage.local.set(json);
      
      return {redirectUrl: url};  // <--- Launch retarget
          
      
    } else {
      if(IsTrackerError(details.url)){
        if(DEBUG_MODE) console.log('    [ Url de error de tracker (deteccion temprana) ]');
        if(DEBUG_MODE) console.log('    Redirigir a:',tab_target[details.tabId]);
        try{
          // Send error checkpoint
          var xhr = new XMLHttpRequest();    
          shop_id = json[dominio(tab_target[details.tabId])];
          xhr.open("GET", json.links.reactivate.split('?')[0].replace('shop-help','cp')+'?cp=ERROR&iid='+IID+'&tab='+StrTab(details.tabId)+'&e=URL_ERROR_TRACKER_EARLY&v='+json.helpbar_version+'&s='+shop_id+'&r='+encodeURIComponent(details.url), true);
          xhr.send();
        } catch(err){}

        script = 'document.body.style.display="none";';
        chrome.tabs.executeScript(details.tabId,{code: script});

        if(tab_target[details.tabId]){
          delete json[dominio(tab_target[details.tabId])];

          chrome.storage.local.remove(dominio(tab_target[details.tabId]),function(){
            url_redirect = tab_target[details.tabId];
            delete tab_target[details.tabId];
            chrome.tabs.update(details.tabId,{url: url_redirect});
          });
        }
      }
    }    
  }

  // If it's a HF url
  if(json && json.links && details.url.indexOf(json.links.reactivate.split('?')[0]) >= 0){
    if(/cp=SEO/gi.test(details.url) || /cp=RETARGET/gi.test(details.url) || /cp=SOFTSEO/gi.test(details.url)){
      //if(DEBUG_MODE) console.info('%c ─VISIT─> '+details.url,'background:#acF;color:#029;font-weight:bold;');
    } else {
      if(DEBUG_MODE) console.info('%c ─CHECKPOINT─> '+details.url,'background:#ebe;color:#95d;font-weight:bold;');
    }

    if(details.url.indexOf('cp=SEO') > 0){
      Bleaching.done[details.tabId] = true; //deactivate bleaching
      Hawking.done[details.tabId] = true; //deactivate hawking
      if(DEBUG_MODE) console.log("    [ BLAWK - OFF (SEO) - tab: "+details.tabId+" ]");
    }

    if(details.url.indexOf('cp=SOFTSEO') > 0){
      Bleaching.done[details.tabId] = true; //deactivate bleaching
      Hawking.done[details.tabId] = true; //deactivate hawking
      if(DEBUG_MODE) console.log("    [ BLAWK - OFF (SOFTSEO) - tab: "+details.tabId+" ]");
    }

    if(details.url.indexOf('cp=ACTIVE') > 0){
      Bleaching.done[details.tabId] = true; //deactivate bleaching
      Hawking.done[details.tabId] = true; //deactivate hawking
      if(DEBUG_MODE) console.log("    [ BLAWK - OFF (ACTIVATE APP) - tab: "+details.tabId+" ]");
    }

    if(details.url.indexOf('cp=') < 0){
      Bleaching.done[details.tabId] = true; //deactivate bleaching
      Hawking.done[details.tabId] = true; //deactivate hawking
      if(DEBUG_MODE) console.log("    [ BLAWK - OFF (SHOP & HELP) - tab: "+details.tabId+" ]");
    }

    // If it's a call to DA
    if(details.url.indexOf('cp=DA') > 0){          
      DA_shop_id = details.url.split(/[?|&]{1}s=/gi)[1].split('&')[0];
      json[DA_shop_id][status] = 0;

      for(i=0;i<json.active_domains.length;++i){        
        if(json[json.active_domains[i]] == DA_shop_id){
          json.active_domains.splice(i,1);
        }
      }
      chrome.storage.local.set({'active_domains':json.active_domains});
      chrome.storage.local.set({DA_shop_id:json[DA_shop_id]});

      if(DEBUG_MODE) console.log('    DEACTIVATE',DA_shop_id);
    }
  }

  if(details.frameId == 0 && details.type === 'main_frame'){
    naranja = 'background:rgb(255,210,180);color:rgb(190,100,0);font-weight:bold;';
    azul_claro = 'background:rgb(167,255,255);color:rgb(0,50,157);font-weight:bold;';
    azul_oscuro = 'background:#acF;color:#029;font-weight:bold;';
    verde = 'background:rgb(167,255,150);color:rgb(0,127,0);font-weight:bold;';

    if(shop_id){
      if(DEBUG_MODE) console.info('%c ─VISIT SHOP─> '+details.url,verde);
    } else if(dominio(details.url)=='helpfreely.org'){
      if(DEBUG_MODE) console.info('%c ─VISIT HF─> '+details.url,verde);
    } else {
      if(trackers_reg.test(details.url)){
        if(Hawking({url:details.url,tabId:-9999},true)){
          if(DEBUG_MODE) console.info('%c ─VISIT TRACKER H─> '+details.url,azul_oscuro);
        } else if(Sawing({url:details.url,tabId:-8888},true)){ 
          if(DEBUG_MODE) console.info('%c ─VISIT TRACKER S─> '+details.url,azul_oscuro);
        } else if(Bleaching({url:details.url,tabId:-7777},false,true)){
          if(DEBUG_MODE) console.info('%c ─VISIT TRACKER B─> '+details.url,azul_oscuro);
        } else if(/\dhff\da\d+b\d+/gi.test(details.url)){
          if(DEBUG_MODE) console.info('%c ─VISIT TRACKER HFF─> '+details.url,azul_oscuro);
        } else {          
          if(DEBUG_MODE) console.info('%c ─VISIT EXOTRACKER─> '+details.url,azul_claro);

          // To detect that an exotracker was passed in this tab
          if(json['exotracker']){
            json['exotracker'].push(details.tabId);
          } else {
            json['exotracker'] = [details.tabId];
          }
          chrome.storage.local.set(json);
          
        }

        if(/0hff[0-1]{1}/gi.test(details.url)){
          json['retarget'+details.tabId] = parseInt(details.timeStamp) + TIME_TO_RETARGET;
        }

        Hawking.done[-9999]=false;
        Hawking.done[-8888]=false;
        Hawking.done[-7777]=false;
        Bleaching.done[-9999]=false;
        Bleaching.done[-8888]=false;
        Bleaching.done[-7777]=false;        
      } else {
        if(DEBUG_MODE) console.info('%c ─VISIT NO SHOP─> '+details.url,azul_oscuro);
      }
    }
  }
}

function onResponseStarted(details){
  
  if(details.frameId == 0 && details.type === 'main_frame'){
    var delete_referrer = true;

    Object.keys(json['metacomparisons']).forEach(function(elem,index){
      pattern = new RegExp(json['metacomparisons'][elem]);
      if(pattern.test(details.url)){
        delete_referrer = false;
      } 
    });
    if(delete_referrer){      
      delete request_referrer[details.tabId];
    }

    if(dominio(details.url)=='helpfreely.org' && /cp=SEO/gi.test(details.url)){
      if(DEBUG_MODE) console.log('    SEO PREACTIVATE APP',json.user_data.id);

      shop_domain = dominio(urlDecode(details.url.split('onerror=')[1]));
      shop_id = json[shop_domain];
      if(shop_id){
        if(json.active_domains.indexOf(shop_domain)<0 || json[shop_id][status]==0 || json[shop_id][status]==2){
          json.active_domains.push(shop_domain);
          chrome.storage.local.set({'active_domains':json.active_domains});

          json[shop_id][status] = 1; //Extension preactivate
          json[shop_id]['activate_time'] = Date.now();
          
          aux = {};
          aux[shop_id] = json[shop_id];
          chrome.storage.local.set(aux);

          if(json.user_data.id<0 && json.user_data.id!=-12) json.user_data.id = json.user_data.id * -1;
          chrome.storage.local.set({'user_data':json.user_data});
        }
      }
    } else if(dominio(details.url)=='helpfreely.org' && /cp=SOFTSEO/gi.test(details.url)){
      if(DEBUG_MODE) console.log('    [ SOFTSEO CHANGE APP TO RED',json.user_data.id);

      shop_domain = dominio(urlDecode(details.url.split('onerror=')[1]));
      shop_id = json[shop_domain];
      
      if(shop_id){
        json.active_domains.push(shop_domain);
/*        if(json[shop_id][status]!=1 && json[shop_id][status]!=3){
          json[shop_id][status] = 5; // Change status to softseo to set activate link to activate from HF web and not like reactivate
        }*/
        json[shop_id][status] = 1;
        json[shop_id]['activate_time'] = Date.now();
        
        aux = {};
        aux[shop_id] = json[shop_id];
        chrome.storage.local.set(aux);        
      }
    } else {
      shop_id = json[dominio(details.url)];

      // If shop status == SOFT RETARGET
      if(shop_id && json[shop_id][status]==4 && !InForbiden(details.url)){
        var xhr = new XMLHttpRequest();
        url_cp = json.links.reactivate.replace('shop-help','cp').split('?')[0]+'?cp=SOFTRET&iid='+IID+'&tab='+StrTab(details.tabId)+'&v='+json.helpbar_version+'&s='+shop_id+'&onerror='+encodeURIComponent(details.url)
        xhr.open("GET", url_cp, true);

        if(json[shop_id].softretarget){ 
          if(json[shop_id].softretarget.indexOf(details.tabId)<0){
            json[shop_id].softretarget.push(details.tabId);
            xhr.send();
          }
        } else {
          json[shop_id].softretarget = [details.tabId];
          xhr.send();
        }
      }
    }
  }
}

// Check if the final url is the shop url and if not, redirect to onerror url setted in beforeNavigate()
function onCompleted(details){
  // Reset error count
  delete onErrorOccurred.tab[details.tabId];

  // If it's the main frame and the url it's not the /api/shop-help/ and the tab has a target 
  if(details.frameId==0 && details.type === 'main_frame' && details.url.indexOf(json.links.reactivate.split('?')[0]) < 0 && tab_target[details.tabId]){

    shop_id = json[dominio(tab_target[details.tabId])];

    // Error 4XX - 5XX detected
    if(tab_target[details.tabId] && details.statusCode >= 400){ //&& dominio(tab_target[details.tabId])!=dominio(details.url)){

      // Save tab_target in details object to pass this value inside chrome.storage.local.set callback function
      details['tab_target'] = tab_target[details.tabId];

      // If details.url is not a shop, redirect to tab_target and delete shop from json
      if(!json[dominio(details.url)]){

        delete json[dominio(tab_target[details.tabId])];
        chrome.storage.local.set(json,function(){
          chrome.tabs.update(details.tabId,{url:details.tab_target});
        });
        
        try{
          if(DEBUG_MODE) console.log("ERROR 400 or 500 DETECTED - redirect to tab_target");
          // Send error checkpoint
          var xhr = new XMLHttpRequest();
          xhr.open("GET", json.links.reactivate.split('?')[0]+'?cp=ERROR&iid='+IID+'&tab='+StrTab(details.tabId)+'&e=ERROR_404&v='+json.helpbar_version+'&s='+shop_id+'&onerror='+encodeURIComponent(details.url), true);
          xhr.send();
        } catch(err){}

      }
    }
    //console.log('CHECK IF IS A SHOP URL',details.url,shop_id)
    
    // The url is a shop's url (same domain or in allowed urls)    
    if(dominio(tab_target[details.tabId])==dominio(details.url) || InAllowed(details.url,json[dominio(details.url)])) {
      Bleaching.done[details.tabId] = false; //activate bleaching again
      Hawking.done[details.tabId] = false; //activate hawking again
      if(DEBUG_MODE) console.log("    [ BLAWK - ON - tab: "+details.tabId+" ]");


      // The url hostname is equal to shop hostname
      if(hostname(tab_target[details.tabId])==hostname(details.url)){
        // All is correct. Delete tab target url
        if(DEBUG_MODE) console.log('    [ Llegamos a la tienda ]');

        if(InForbiden(details.url,shop_id)){
          // For TT directlinking
          if(DEBUG_MODE) console.log('    [ Url prohibida. No borramos tab_target ]');          
        } else {
          delete tab_target[details.tabId];
        }
      }
      // The url has another domain/subdomain or is in the allowed urls
      else {
        if(DEBUG_MODE) console.log('    [ Llegamos a la tienda (con otro dominio/subdominio) ]');

        if(InAllowed(details.url,shop_id) || InForbiden(details.url,shop_id) || hostname(details.url)==dominio(details.url)){
          // Check if hostname is equal to domain
          if(hostname(details.url)==dominio(details.url)){
            if(DEBUG_MODE) console.log('    [ Url sin subdominio. No hacemos nada ]');
          } else {
            if(DEBUG_MODE) console.log('    [ Url declarada. No hacemos nada ]');
          }
          if(InForbiden(details.url,shop_id)){
            // For TT directlinking
            if(DEBUG_MODE) console.log('    [ Url prohibida. No borramos tab_target ]');
          } else {
            delete tab_target[details.tabId];
          }
        } else {
          if(DEBUG_MODE) console.log('    [ Url no declarada. Borramos tienda del JSON ]');
          try{
            // Send error checkpoint
            var xhr = new XMLHttpRequest();
            xhr.open("GET", json.links.reactivate.split('?')[0]+'?cp=ERROR&iid='+IID+'&tab='+StrTab(details.tabId)+'&e=URL_NOT_DECLARED_IN_SHOP&v='+json.helpbar_version+'&s='+shop_id+'&onerror='+encodeURIComponent(details.url), true);
            xhr.send();
          } catch(err){}

          delete tab_target[details.tabId]; //se sustituyo el codigo anterior por esta unica linea
        }
      }
    }

    // The url is not a shop's url
    else {
      if(IsTrackerError(details.url)){
        if(DEBUG_MODE) console.log('    [ Url de error de tracker ]');

        script = 'document.body.style.display="none";';
        chrome.tabs.executeScript(details.tabId,{code: script}); 

        // Send error checkpoint
        try{          
          var xhr = new XMLHttpRequest();    
          shop_id = json[dominio(tab_target[details.tabId])];
          xhr.open("GET", json.links.reactivate.split('?')[0]+'?cp=ERROR&iid='+IID+'&tab='+StrTab(details.tabId)+'&e=URL_ERROR_TRACKER&v='+json.helpbar_version+'&s='+shop_id+'&onerror='+encodeURIComponent(url_redirect), true);
          xhr.send();
        } catch(err){}

        // Delete shop from json
        delete json[dominio(tab_target[details.tabId])];
        chrome.storage.local.remove(dominio(tab_target[details.tabId]),function(){
          url_redirect = tab_target[details.tabId];
          delete tab_target[details.tabId];
          // Update the tab url with tab_target
          chrome.tabs.update(details.tabId,{url: url_redirect});
        });
      } else {
        if(tab_target[details.tabId]=='ERROR'){
          if(DEBUG_MODE) console.log('    [ BUCLE BREAK. Llegamos a la tienda.  ]');
          delete tab_target[details.tabId];
          delete json[dominio(details.url)];
          chrome.storage.local.remove(dominio(details.url));          
        } else {
          
          
          /*script1 = "\
                    i=document.createElement('img');\
                    i.src='chrome-extension://"+chrome.runtime.id+"/images/preloader.gif';\
                    i.style='position:absolute;margin:auto;top:0;left:0;right:0;bottom:0;';\
                    div=document.createElement('div');\
                    div.style='position:absolute;top:0;left:0;width:100%;height:100%;background-color:#ffffff';\
                    div.appendChild(i);\
                    document.body.appendChild(div);\
                    if(document.readyState=='complete'){ setTimeout(function(){ chrome.runtime.sendMessage({navigation_error:{tabId:"+details.tabId+",url:'"+details.url+"'}}); }, 5000);} else { window.onload = function(){ setTimeout(function(){ chrome.runtime.sendMessage({navigation_error:{tabId:"+details.tabId+",url:'"+details.url+"'}}); }, 5000); }}";
          */
          //script1 ="console.log('test')";
          //chrome.tabs.executeScript(details.tabId,{code: script1,runAt:'document_end'},function(e){console.log(e)});


          if(json[dominio(tab_target[details.tabId])]){            
            if(DEBUG_MODE) console.log('    [ Llegamos a una url que no es la tienda. Lanzamos loader imagen script de control de ejection ], tab:',details.tabId);
            onWebNavigationCompleted['data'][details.tabId] = true;
          }



          // If the web don't redirect before 4 sec, send a message to backend to redirect to tab_target          
          //script = 'if(document.readyState=="complete"){ setTimeout(function(){ chrome.runtime.sendMessage({navigation_error:{tabId:'+details.tabId+',url:"'+details.url+'"}}); }, 5000);} else { window.onload = function(){ setTimeout(function(){ chrome.runtime.sendMessage({navigation_error:{tabId:'+details.tabId+',url:"'+details.url+'"}}); }, 5000); }}';
          //chrome.tabs.executeScript(details.tabId,{code: script});
        }
      }
    }
  }

  // En caso de "500 Internal Server Error" en helpfreely y no detectado previamenten en onHeadersReceived
  if(details.frameId==0 && details.type === 'main_frame' && details.url.indexOf(json.links.reactivate.split('?')[0]) == 0){
    script = 'if(document.readyState=="complete"){ setTimeout(function(){ if(document.title == "500 Internal Server Error") chrome.runtime.sendMessage({navigation_error:{tabId:'+details.tabId+',url:"'+details.url+'"}}); }, 100);} else { window.onload = function(){ setTimeout(function(){ if(document.title == "500 Internal Server Error") chrome.runtime.sendMessage({navigation_error:{tabId:'+details.tabId+',url:"'+details.url+'"}}); }, 100); }}';
    chrome.tabs.executeScript(details.tabId,{code: script});
  }

  if(details.frameId==0 && details.type === 'main_frame'){
    if(DEBUG_MODE) console.log('\n               ^^^^^ END NAVIGATION ^^^^^');
  }
}

function onErrorOccurred(details){
  clearTimeout(timeout[details.tabId]);
  delete timeout[details.tabId];

  //if(details.error!='net::ERR_ABORTED' && details.tabId && details.tabId>0){
  if(['net::ERR_ABORTED','net::ERR_NAME_NOT_RESOLVED'].indexOf(details.error)<0 && details.tabId && details.tabId>0){
    
    if(details.frameId == 0 && details.type === 'main_frame' && tab_target[details.tabId]){
      // If domain of tab_target = domain current url don't do nothing. The shop's web would be down
      if(hostname(tab_target[details.tabId]) == hostname(details.url)){
        Bleaching.done[details.tabId] = false; //activate bleaching again
        Hawking.done[details.tabId] = false; //activate hawking again
        if(DEBUG_MODE) console.log("    [ BLAWK - ON ]");
        return;

      } else {
        
        if(!onErrorOccurred.tab[details.tabId]){
          if(DEBUG_MODE) console.log('\n\n!!! FIRST CHROME ERROR RETRY !!!',details);
          onErrorOccurred.tab[details.tabId] = true;
          chrome.tabs.update(details.tabId,{url: details.url});
        }else{
          if(DEBUG_MODE) console.log('\n\n!!! SECOND CHROME ERROR !!!',details);
          delete onErrorOccurred.tab[details.tabId];

          try{
            // Send error checkpoint
            shop_id = json[dominio(tab_target[details.tabId])];
            var xhr = new XMLHttpRequest();
            error_code = encodeURIComponent(details.error);
            xhr.open("GET", json.links.reactivate.replace('shop-help','cp').split('?')[0]+'?cp=ERROR&iid='+IID+'&tab='+StrTab(details.tabId)+'&e='+error_code+'&v='+json.helpbar_version+'&s='+shop_id+'&r='+encodeURIComponent('ERROR')+'&onerror='+encodeURIComponent(details.url), true);
            xhr.send();
          } catch(err){}

          delete json[dominio(tab_target[details.tabId])];

          chrome.storage.local.remove(dominio(tab_target[details.tabId]),function(){
            try{
              url_redirect = tab_target[details.tabId];
              if(DEBUG_MODE) console.log('REDIRECT TO TAB_TARGET',url_redirect);
              delete tab_target[details.tabId];
              chrome.tabs.update(details.tabId,{url: url_redirect});
            } catch(err){}
          });
        }
      }
    } else {

      if( json && json.links && dominio(details.url.split('?')[0].toLowerCase()) == dominio(json.links.reactivate.split('?')[0].toLowerCase()) ){
        new_url = details.url.split('&onerror=')[1];

        if(new_url && details.tabId && details.tabId>0){
          delete onErrorOccurred.tab[details.tabId];
          new_url = urlDecode(new_url);
          
          try{          
            active_domain_pos = json.active_domains.indexOf(dominio(new_url));  // Get position of domain in JSON active domains array
            if(active_domain_pos>=0) json.active_domains.splice(active_domain_pos,1);
          } catch(e){}
          chrome.storage.local.remove([dominio(new_url),String(json[dominio(new_url)])]);
          delete json[json[dominio(new_url)]][status];
          delete json[dominio(new_url)]; //Delete shop index in JSON

          chrome.storage.local.set(json,function(){
            if(DEBUG_MODE) console.log('\n\n!!! HF DOWN !!! 1.REDIRECT TO SHOP',details.tabId,new_url);
            chrome.tabs.update(details.tabId,{url: new_url});          
          });
        }
      }
    }

  } else {
    if (dominio(details.url.split('?')[0].toLowerCase()) == dominio(json.links.reactivate.split('?')[0].toLowerCase())){
      var new_url = details.url.split('&onerror=')[1];
      
      if(new_url && details.tabId && details.tabId>0){
        delete onErrorOccurred.tab[details.tabId];
        new_url = urlDecode(new_url);
        
        try{          
          active_domain_pos = json.active_domains.indexOf(dominio(new_url));  // Get position of domain in JSON active domains array
          if(active_domain_pos>=0) json.active_domains.splice(active_domain_pos,1);
        } catch(e){}
        chrome.storage.local.remove([dominio(new_url),String(json[dominio(new_url)])]);
        delete json[json[dominio(new_url)]][status];
        delete json[dominio(new_url)]; //Delete shop index in JSON

        chrome.storage.local.set(json,function(){
          if(DEBUG_MODE) console.log('\n\n!!! HF DOWN !!! 2.REDIRECT TO SHOP',details.tabId,new_url);
          chrome.tabs.update(details.tabId,{url: new_url});          
        });
      }
    }
  }
}
onErrorOccurred.tab = {};

// Called when the user clicks on the browser action button.
chrome.browserAction.onClicked.addListener(function(tab) {
  browser.tabs.create({url:"https://www.helpfreely.org/admin/helpfreelyapp/"});
});

// Set tab target
chrome.webNavigation.onBeforeNavigate.addListener(onBeforeNavigate);//,{urls: ["<all_urls>"]},["blocking"]);

// Analize every request
chrome.webRequest.onBeforeRequest.addListener(onBeforeRequest,{urls: ["<all_urls>"]},["blocking"]);

// Check request's referrer 
chrome.webRequest.onBeforeSendHeaders.addListener(onBeforeSendHeaders,{urls: ["<all_urls>"]},["blocking","requestHeaders"]);

// Redirect if it's a retarget
chrome.webRequest.onHeadersReceived.addListener(onHeadersReceived,{urls: ["<all_urls>"]},["responseHeaders","blocking"]);

// Eliminate referrer
chrome.webRequest.onResponseStarted.addListener(onResponseStarted,{urls: ["<all_urls>"]},["responseHeaders"]);

// Test end navitation
chrome.webRequest.onCompleted.addListener(onCompleted,{urls: ["<all_urls>"]},["responseHeaders"]);


function onWebNavigationCompleted(details){  
  if(details.frameId==0 && details.parentFrameId==-1 && onWebNavigationCompleted['data'][details.tabId]){
    
    delete onWebNavigationCompleted['data'][details.tabId];
    
    script = "\
              i=document.createElement('img');\
              i.src='chrome-extension://"+chrome.runtime.id+"/images/preloader.gif';\
              i.style='position:absolute;margin:auto;top:0;left:0;right:0;bottom:0;';\
              div=document.createElement('div');\
              div.style='position:absolute;top:0;left:0;width:100%;height:100%;background-color:#ffffff';\
              div.appendChild(i);\
              document.body.appendChild(div);\
              if(document.readyState=='complete'){ setTimeout(function(){ chrome.runtime.sendMessage({navigation_error:{tabId:"+details.tabId+",url:'"+details.url+"'}}); }, 10000);} else { window.onload = function(){ setTimeout(function(){ chrome.runtime.sendMessage({navigation_error:{tabId:"+details.tabId+",url:'"+details.url+"'}}); }, 10000); }}";
    
    chrome.tabs.executeScript(details.tabId,{code: script,runAt:'document_end'});
  }
}
onWebNavigationCompleted['data']={};

// Navigate to tab target if it's a tracking error
chrome.webNavigation.onCompleted.addListener(onWebNavigationCompleted);

// On error
chrome.webRequest.onErrorOccurred.addListener(onErrorOccurred,{urls: ["<all_urls>"]});

chrome.runtime.setUninstallURL('https://www.helpfreely.org/helpfreelyapp/uninstall/'+IID+'/?v='+APP_VERSION);

// Enable message listener
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){

  // if Hipolita checkout and checkout is active (checkout contains checkout url)
  if(request.checkout && json.hipolita.checkout_active){
    var domain_pattern = new RegExp(json.hipolita.domain_pattern);
    var country_tld = dominio(request.checkout).replace(domain_pattern,'');
    var country_data = json.hipolita.country_list[country_tld];

    var xhr = new XMLHttpRequest();    
    xhr.open("GET", json.links.reactivate.split('?')[0].replace('shop-help','cp')+'?cp=CHECKOUT&iid='+IID+'&v='+json.helpbar_version+'&s='+country_data.id+'&onerror='+encodeURIComponent(request.checkout), true);
    xhr.send();
  }

  // Show toolbox if is hidden
  if(request.showtoolbox){    
    tabs_list.forEach(function(tab_id){
      try{
        chrome.tabs.sendMessage(tab_id, {action: "open_toolbox"}, function(response) {});
      }catch(e){}
    });    
  }

  // Check BBQ-RIBS conditions
  if(request.show_app){
    if(json['exotracker'] 
      && json['exotracker'].indexOf(sender.tab.id)>=0 
      && ["US","GB"].indexOf(json.country)>=0 
      && json[dominio(request.show_app)] 
      && !json[json[dominio(request.show_app)]][hawking_afn_allowed]
    ){
      sendResponse(false);
    } else {
      sendResponse(true);
    }    
  }

  
  if('show_partner_shops' in request){
    json.user_data.show_partner_shops = request.show_partner_shops;
    chrome.storage.local.set(json);    
    localStorage.setItem('show_partner_shops',request.show_partner_shops);
    $.post(DATA_URL.replace('data/','app-conf/'), {'show_partner_shops':request.show_partner_shops,'iid':IID});
  }
  if('retarget' in request){    
    json.user_data.retarget = request.retarget;
    chrome.storage.local.set(json);
    localStorage.setItem('retarget',request.retarget);

    $.post(DATA_URL.replace('data/','app-conf/'), {'retarget':request.retarget,'iid':IID});
  }
  if('style' in request){    
    json.user_data.style = request.style;
    chrome.storage.local.set(json);
    localStorage.setItem('style',request.style);

    $.post(DATA_URL.replace('data/','app-conf/'), {'style':request.style,'iid':IID});
  }
  if('lang' in request){
    json.user_data.lang = request.lang;
    localStorage.setItem('lang',request.style);

    $.post(DATA_URL.replace('data/','app-conf/'), {'lang':request.lang,'iid':IID}, function(data){
      json.txt=data;
      chrome.storage.local.set(json);
    });
  }


  // Change browserAction icon
  if(request.icon == 'grey'){
    chrome.browserAction.setIcon({path:browser.extension.getURL('/images/icon38-grey.png')});
    chrome.browserAction.setTitle({title:"HelpfreelyApp™"});
  }
  if(request.icon == 'color'){
    chrome.browserAction.setIcon({path:browser.extension.getURL('/images/icon38.png')});
    chrome.browserAction.setTitle({title:"HelpfreelyApp™"});
  }
  if(request.icon == 'red'){
    chrome.browserAction.setIcon({path:browser.extension.getURL('/images/icon38-red.png')});
    chrome.browserAction.setTitle({title:"HelpfreelyApp™ - DEACTIVATED"});
  }
  if(request.icon == 'blue'){
    chrome.browserAction.setIcon({path:browser.extension.getURL('/images/icon38-blue.png')});
    chrome.browserAction.setTitle({title:"HelpfreelyApp™ - ANONYMOUS"});
  }
  if(request.icon == 'green'){
    chrome.browserAction.setIcon({path:browser.extension.getURL('/images/icon38-green.png')});
    chrome.browserAction.setTitle({title:"HelpfreelyApp™ - ACTIVATED"});
  }
  if(request.icon == 'off'){
    chrome.browserAction.setIcon({path:browser.extension.getURL('/images/off.png')});
  }
  if(request.icon == 'activated'){
    chrome.browserAction.setIcon({path:browser.extension.getURL('/images/activated.png')});
  }
  if(request.icon == 'alert'){
    chrome.browserAction.setIcon({path:browser.extension.getURL('/images/alert.png')});
  }
  if(request.icon == 'alert_user'){
    chrome.browserAction.setIcon({path:browser.extension.getURL('/images/alert_user.png')});
  }
  if(request.icon == 'alert_incognito'){
    chrome.browserAction.setIcon({path:browser.extension.getURL('/images/alert_incognito.png')});
  }


  // Error navigating
  if(request.navigation_error){
    details = request.navigation_error;
    url_redirect = tab_target[details.tabId];
    if(DEBUG_MODE) console.log('REDIRECT by ERROR',tab_target[details.tabId]);
    if(DEBUG_MODE) console.log('ERROR in ',details.url);

    // Send error checkpoint
    try{
      var xhr = new XMLHttpRequest();    
      shop_id = json[dominio(url_redirect)];
      xhr.open("GET", json.links.reactivate.split('?')[0]+'?cp=ERROR&iid='+IID+'&tab='+StrTab(details.tabId)+'&e=EJECT_TIMEOUT&v='+json.helpbar_version+'&s='+shop_id+'&onerror='+encodeURIComponent(details.url), true);
      xhr.send();
    } catch(err){}

    delete json[dominio(tab_target[details.tabId])];
    chrome.storage.local.remove(dominio(tab_target[details.tabId]),function(){
      delete tab_target[details.tabId];
      chrome.tabs.update(details.tabId,{url: url_redirect});
    });
  }

  // Activate app in shop/domain and redirect with tracker
  if(request.activate){
    shop_id = json[request.activate.domain];
    json[shop_id][status] = 1;
    json[shop_id]['activate_time'] = Date.now();
    json.active_domains.push(request.activate.domain);

    chrome.storage.local.set(json,function(){
      chrome.tabs.update(sender.tab.id,{url: request.activate.tracker});
    });    
  }

  // Remove shop from json
  if(request.shop_remove){
    details = request.shop_remove;
    delete json[dominio(details.shop_url)];
    if(DEBUG_MODE) console.log('    [ Shop not active: "'+dominio(details.shop_url)+'". Delete it from JSON  ]');
  }

  // Login
  if(request.login){
    if(DEBUG_MODE) console.log('LOGIN',request.login);

      //getData(false,true);
      if(Math.abs(json.user_data.id)!=request.login.id) getData(false,false);    
  }

  // Logout
  if(request.logout){
    if(DEBUG_MODE) console.log('LOGOUT');

      //getData(false,true);
      if(Math.abs(json.user_data.id)!=request.logout.id)  getData(false,false);
  }

  // Show results in searchengines
  if(request.iframe_show){
    var script = '\
      try{\
        document.getElementById("hff-cc-frame'+request.iframe_show.iframe_id+'").style.display = "inline-block";\
        document.getElementsByClassName("seo_a'+request.iframe_show.iframe_id+'")[0].style.display="none";\
      }catch(e){}';
    chrome.tabs.executeScript(sender.tab.id,{code: script});
  }
  // Show results in searchengines
  if(request.ifind_iframe_load){    
    var script = '\
      try{\
        document.getElementById("'+requestifind_iframe_load.iframe_id+'").style.display = "inline-block";\
      }catch(e){}';
    chrome.tabs.executeScript(sender.tab.id,{code: script});
  }

  // Send data to API
  if(request.shoppyfind){  
    var api_url = "https://www.helpfreely.org/api_spfd";
    var xhr = new XMLHttpRequest();            
    xhr.open("POST", api_url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(request.shoppyfind);
  }
});


if('update_url' in chrome.runtime.getManifest()){
  console.warn = function(){ return false; }
  console.info = function(){ return false; }
  console.log = function(){ return false; }
  console.error = function(){ return false; }
}

// Load previous JSON saved in chrome local storage
chrome.storage.local.get(null,function(data){
  try{
    if(DEBUG_MODE) console.log('LOAD PREVIOUS JSON');
    json = data;

    // If there is a date in response data
    if(json['date']){
      if(DEBUG_MODE) console.log('Hay fecha en el json',json['date']);

      if(DEBUG_MODE){
        now = json['date']+31400000;
      } else {
        now = Date.now();
      }
      // If JSON expired, request a new JSON
      if( (now - json['date']) > 21400000){
        if(DEBUG_MODE) console.log('JSON caducado. Actualizamos',json['date']);
        getData(false,false);
      }

    // If there is not a date in response data or no data in response
    } else {
      if(DEBUG_MODE) console.log('No hay fecha en el json');
      getData(false,false);
    }
  } catch(e){
    getData(false,false);
  }
});