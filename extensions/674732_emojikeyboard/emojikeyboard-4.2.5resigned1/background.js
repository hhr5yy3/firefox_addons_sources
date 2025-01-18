
function introduce_web_version(){  
  KEY_WEB_VERSION_INTRODUCED="KEY_WEB_VERSION_INTRODUCED_v4.2.4";
  OLD_KEY_WEB_VERSION_INTRODUCED="KEY_WEB_VERSION_INTRODUCED_v4.2.3";  
  
  chrome.storage.local.get(KEY_WEB_VERSION_INTRODUCED, function(result){
    if (result[KEY_WEB_VERSION_INTRODUCED] == "INTRODUCED"){   
      //Does nothing      
    }
    else{      
      chrome.storage.local.get(OLD_KEY_WEB_VERSION_INTRODUCED, function(result_old){
        if (result_old[OLD_KEY_WEB_VERSION_INTRODUCED] == "INTRODUCED"){
          var web_version_URL = "https://coolsymbol.com/cool-fancy-text-generator.html?source=ext_update";
          chrome.tabs.create({url:web_version_URL});
        }
        else{
          var web_version_URL = "https://coolsymbol.com/cool-fancy-text-generator.html?source=ext_install";
          chrome.tabs.create({url:web_version_URL});
        }
      });
      
      var web_introduced_option = {};
      web_introduced_option[KEY_WEB_VERSION_INTRODUCED]="INTRODUCED";
      chrome.storage.local.set(web_introduced_option, function() {     
      });
      
    }
  });
}

//Introducing the web version, only in very rare time
introduce_web_version();

chrome.runtime.setUninstallURL("https://coolsymbol.com/cool-fancy-text-generator.html?source=ext_uninstall");