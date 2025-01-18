class FlashFinder {
    constructor() {
        setInterval(() => { this.find(); }, 1000);
    }

    find() {
        this.getEmbeds();
        this.getObjects();
    }

    getEmbeds() {
        const embeds = document.querySelectorAll('embed');
        for(let key in embeds) {
            if(this.isNotInitiated(embeds[key]) && embeds[key].type === 'application/x-shockwave-flash') {
                const node = embeds[key];
                node.classList.add('flpl_initiated');
                if (node.src) this.makeFlash(node);
            }
        }
    }

    getObjects() {
        var objects = document.querySelectorAll('object');
        for(let key in objects) {
            if(this.isNotInitiated(objects[key]) && objects[key].type === 'application/x-shockwave-flash') {
                const node = objects[key];
                node.src = node.data;
                objects[key].classList.add('flpl_initiated');
                if (node.src) this.makeFlash(node);
            }
        }
    }

    isNotInitiated(node) {
        return !(node.classList && node.classList.contains('flpl_initiated'));
    }

    makeFlash(node) {
        //console.log(node);
        const src    = node.src;
        const srcArr = src.split('/');
        const flash  = {
            name: srcArr[srcArr.length - 1] || srcArr[srcArr.length - 2],
            url: src,
            base: node.getAttribute('base') || ''
        };
        this.sendFlash(flash);
    }

    sendFlash(flash) {
        chrome.runtime.sendMessage({ action: 'flashFinder', flash: flash });
    }

}

// noinspection JSUnusedGlobalSymbols
const ff = new FlashFinder();
