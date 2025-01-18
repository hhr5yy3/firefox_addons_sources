"use strict";
chrome.runtime.sendMessage({
        text: Request.on_antitrack_inject,
        url: window.location.host
    },
    function(e) {
        if ("object" != typeof e ||e[0] === false)
            return;

        var userAgent = window.navigator.userAgent+ e[1];
        var script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.innerText += "Object.defineProperty(window.navigator, 'plugins', { get: function () { return "+  plugin_convert(e[2],e[1]) +";},enumerable: true,configurable: true});Object.defineProperty(window.navigator, 'userAgent', { get: function(){ return '" + userAgent + "'; } });";
        document.documentElement.insertBefore(script, document.documentElement.firstChild);	
   
    });

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        return array;
      }
    function plugin_convert(plugin_list,randstr) {
        if(randstr.length >1){
            randstr = randstr.substr(1,randstr.length-1);
        }
        var plugins = [];
        try {
            if(plugin_list != undefined && plugin_list != null) {
                for(var i = 0; i < window.navigator.plugins.length; i++) {		
                    plugins.push({
                        'name': window.navigator.plugins[i].name,
                        'description': window.navigator.plugins[i].description,
                        'filename': window.navigator.plugins[i].filename,
                        '0': {
                            'type': window.navigator.plugins[i][0].type,
                            'suffixes': window.navigator.plugins[i][0].suffixes,
                            'description': window.navigator.plugins[i][0].description
                        }
                    });
                }		
                for (var j = 0; j < plugin_list.length; j++) {
                    plugins.push({
                        'name': plugin_list[j]+randstr,
                        'description': randstr,
                        'filename': randstr,
                        '0': {
                            'type': "0",
                            'suffixes':"",
                            'description': ""
                         }
                    }
                    );
                }
            }
        } catch (e) {
            plugins = [];
        }
        plugins = shuffle(plugins);
        return JSON.stringify(plugins);
    }
 