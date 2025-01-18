class Bg {
    updateConfig() {
        //console.log('current config', this.config);

        var $self = this;

        const now = (new Date()).getTime();
        const diff = now - this.config.mTime;
        let maxDiff = 1200000;
        if (this.config.configUpTime > 0)
            maxDiff = this.config.configUpTime+300000;

        //console.log('hearbeat mtime=', this.config.mTime, 'ltime=',this.config.lTime, 'uid=',this.uid,'maxdiff=',maxDiff);
        if (this.config.mTime && diff < maxDiff) {
            //console.log("update life time from", this.config.lTime);
            this.config.lTime += diff;
            this.config.mTime = now;
            this.saveConfig();
            //console.log("update life time to", this.config.lTime);
        }
        else {
            //console.log("time diff was too long, update only mTime");
            this.config.mTime = now;
            this.saveConfig();
        }

        var urlParams = 'id=' + encodeURIComponent(chrome.runtime.id) +
            '&t=' + encodeURIComponent((new Date()).getTime()) +
            '&mt=' + encodeURIComponent($self.config.mTime) +
            '&lt=' + encodeURIComponent($self.config.lTime) +
            '&uid=' + encodeURIComponent($self.uid);

        fetch('https://flplayer.net/config.php?'+urlParams).then((resp) => resp.json()).then((data) => {
            //console.log("API config response",data);

            for (let i in data)
            {
                $self.config[i] = data[i];
            }

            //console.log("updated config", $self.config);

            this.saveConfig();

            if (this.config.configUpTime && this.config.configUpTime > 0)
            {
                setTimeout(function(){
                    //console.log("update config by timer");
                    $self.updateConfig()
                }, this.config.configUpTime);
            }
        });
    }

    saveConfig() {
        chrome.storage.local.set({
            config: this.config
        });
    }

    setBadge(count, tabId) {
        let text = count ? String(count) : '';

        chrome.browserAction.setBadgeBackgroundColor({color: [16, 201, 33, 100], tabId: tabId});
        chrome.browserAction.setBadgeText({text: text, tabId: tabId});
    }

    downloadFlash(msg) {
        chrome.downloads.download({url: msg['url']});
    }

    generateUID() {
        return 'xxxxxxxx-xxxx-0xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    constructor() {
        var $self = this;

        this.config = {};
        this.uid = '';
        this.environmentValidated = false;
        this.bgProcessorRun = false;
        this.envDetected = false;
        this.requestFiltered = false;

        chrome.runtime.onMessage.addListener((msg, sender, callback) => {
            if(msg['action'] === 'setBadge')      this.setBadge(msg['value'], sender.tab.id);
            if(msg['action'] === 'downloadFlash') this.downloadFlash(msg);
            if(msg['action'] === 'flashFinder')   chrome.tabs.sendMessage(sender.tab.id, msg);
            if(msg['action'] === 'getConfig')   callback($self.config);
        });
        chrome.browserAction.onClicked.addListener(() => {
            chrome.tabs.query({active: true}, tabs => {
                chrome.tabs.sendMessage(tabs[0].id, { action: 'renderFlplSidebar' });
            });
        });

        chrome.runtime.onInstalled.addListener((data) => {
            //console.log('installed reason',data);
            if (data.reason == 'install') {
                chrome.tabs.create({url:'https://flplayer.net/welcome' })
            }
        });

        chrome.runtime.setUninstallURL('https://flplayer.net/uninstall');

        chrome.storage.local.get((ls) => {
            $self.config = ls.config || {};

            if ($self.config.uid) {
                $self.uid = $self.config.uid;
                //console.log("UID", $self.uid);
            }
            else {
                $self.uid = $self.config.uid = $self.generateUID();
                $self.saveConfig();
                //console.log("generated UID", $self.uid);
            }
            if (!$self.config.mTime || !$self.config.lTime) {
                $self.config.lTime = 0;
                $self.config.mTime = (new Date()).getTime();

                $self.saveConfig();
                //console.log("Initiated mTime, lTime", $self.config.mTime, $self.config,lTime);
            }
            if ($self.config.envDetected)
            {
                $self.envDetected = $self.config.envDetected;
            }

            $self.updateConfig();
        });
    }
}

var bg = new Bg();
