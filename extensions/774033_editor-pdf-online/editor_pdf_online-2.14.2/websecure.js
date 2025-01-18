var username = ""; 
let activeTabId, lastUrl;

function getTabInfo(tabId) {
      chrome.tabs.get(tabId, function(tab) {          
            if ( ( tab.url.indexOf("offidocs") == -1 ) && ( tab.url.indexOf("http") !== -1 ) && ( lastUrl != tab.url) )  {
                    //console.log(" Changed tab.url " + tab.url);
                    urlx =  tab.url;
                    extractpdf(urlx, tabId);
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

                   

async function extractpdf(urlxx, tid) {

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
            
                //console.log('https://www.offidocs.com/media/system/app/checkdownloadpdfeditory_2_nav.php?filepath=' + bin2hex(urlxx) + '&hex=' + tid + '&u=' + un);
                let responsecheck = await fetch('https://www.offidocs.com/media/system/app/checkdownloadpdfeditory_2_nav.php?filepath=' + bin2hex(urlxx) + '&hex=' + tid + '&u=' + un);    
                
                if (responsecheck.status === 200) {
                            let datacheck = await responsecheck.text();
                            //console.log(datacheck);  
                            var response2 = datacheck;
                            if ( response2.indexOf("302") !== -1 )   {
                                       var newURL = 'https://www.offidocs.com/media/system/app/view_edit_pdfeditor_nav.php?myServerhost=tut&urlpathx=/community/pdfeditor/editios-ext.php&service=--&username=' + username + '&filepath=' + bin2hex(urlxx);
                                       //chrome.tabs.create({ url: newURL });
                                       chrome.tabs.update(chrome.tabs.getCurrent().id, {url: newURL});
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






