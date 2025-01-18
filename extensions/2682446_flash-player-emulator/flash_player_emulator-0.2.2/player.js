var overlayElem = document.getElementById('overlay');

overlayElem.addEventListener('click', () => {
    
    overlayElem.remove();
    
    var scriptElem = document.createElement('script');
    scriptElem.src = '/ruffle/ruffle.js';
    scriptElem.onload = () => {
      window.parent.postMessage({action: "playbackRequested"}, '*');  
    };
    document.body.appendChild(scriptElem);
});

window.addEventListener('message', (msg) => {
    //console.info('player.js received message:', msg);
   
    if (typeof browser === 'undefined') {
        // Probably Chrome or other Chromium-based browser
        if (!msg.isTrusted ||
            (msg.origin == 'chrome-extension://ocplikgjocggffchncojhnmolcboglmm' || msg.origin == 'chrome-extension://fgenmmklgkdemhpgdppmldmkemplbcko') === false
            ) {
            console.error('Untrusted message received.');
            return;
        }
    } else {
        // Probably Firefox or other browser
        if (!msg.isTrusted) {
            console.error('Untrusted message received.');
            return;
        }
    }
    
    if (msg.data.action == 'loadPlayer') {
        var src = msg.data.src;

        window.RufflePlayer.config = {
            "polyfills": false,
            "autoplay": "on",
            // "warnOnUnsupportedContent": false,
            "upgradeToHttps": true,
            "logLevel": "error", // info, debug, trace
        };

        const ruffle = window.RufflePlayer.newest();
        const player = ruffle.createPlayer();

        const container = document.getElementById("player-container");
        container.appendChild(player);
        
        player.style.width = msg.data.width;
        player.style.height = msg.data.height;
        
        player.load({
            url: src,
            parameters: msg.data.flashvars
        });
        
        document.body.classList.add('initialized');
    }
});