/*** Content Script to find and play embedded content ***/

//console.info('Content script: Find and play loaded.');

var isValid = (itemSrc) => {
    return (typeof itemSrc != 'undefined' && itemSrc != null && itemSrc != '');
}

var normalizeUrl = (itemSrc) => {
    // Second param is base URL
    try {
        // For absolute URLs (will throw exception on relative URLs)
        return new URL(itemSrc).href;
    } catch(e) {
        try {
            // For relative URLs
            return new URL(itemSrc, window.location.href).href;
        } catch(e) {
            // Invalid URLs should never work anyway
        }
    } 
}

var findElements = () => {

    var elems = [
    ...document.querySelectorAll('embed'),
    ...document.querySelectorAll('object'),
    ...document.querySelectorAll('[type="application/x-shockwave-flash"]'),
    ...document.querySelectorAll('[src*=".swf"]'),
    // selector is case-sensitive
    ...document.querySelectorAll('[src*=".SWF"]')
    ];

    var items = [];

    //console.info('Elements:', elems);

    elems.forEach((elem) => {

        if (elem.dataset.swfProcessed === 'true') {
            //console.info('Element already processed', elem);
            return;
        }

        var embedElemWithin = elem.querySelector('embed');

        if (elem.nodeName.toLowerCase() == 'object' && embedElemWithin !== null) {
            console.info('Object with embed found. Ignoring object, preferring embed.');
            return;
        }
        
        var item = {};
        item.src = elem.src || elem.data;
        
        if (!isValid(item.src)) {
            var paramMovie = elem.querySelector('param[name="movie"]');
            if (paramMovie) {
                item.src = paramMovie.value;
            }
        }
        
        if (isValid(item.src)) {
            item.src = normalizeUrl(item.src);
            item.elem = elem;
            elem.dataset.swfProcessed = true;
            item.flashvars = elem.getAttribute('flashvars') || '';
            items.push(item);
        }
    });

    //console.info('Items:', items.length, items[0]);
    
    return items;

}

var copyDataset = (originalDataset, newDataset) => {
    Object.entries(originalDataset).forEach((dataItem) => {
        newDataset[dataItem[0]] = dataItem[1];
    });
}

var copyAttributes = (originalElem, newElem) => {
    if (originalElem.classList.length) {
        newElem.classList = originalElem.classList; // DOMTokenList
    }
    copyDataset(originalElem.dataset, newElem.dataset);
}

var addContainer = (item) => {
    //console.info('Adding container/overlay for', item);

    var originalId = item.elem.id;
    var originalDomRect = item.elem.getBoundingClientRect();

    item.containerElem = document.createElement('div');
    
    item.containerShadowElem = item.containerElem.attachShadow({mode: 'open'});
    
    copyAttributes(item.elem, item.containerElem);
    item.containerElem.classList.add('ext-modernkit-flash-player-container');
    
    // Try rendered dimensions, fallback to attributes, then fallback to hardcoded values. Attribute fallback handles cases where embed is rendered with 0 width/height, but has defined dimensions in attributes; this is known to occur in Firefox.
    // Note: 'px' suffix not needed in Chromium but is needed in Firefox. Chromium will use px as default unit if none is defined. Some attribute values may be percentages, so we check if it's a number before appending 'px'.
    item.width = originalDomRect.width;
    item.height = originalDomRect.height;
    // < 120 value in DomRect is known to occur in Firefox
    // Use 120 because official "Get Flash Player" button is 112px: https://www.adobe.com/images/shared/download_buttons/get_flash_player.gif
    if (item.width < 120) { 
        item.width = (item.elem.getAttribute('width') || 500);
    }
    if (item.height < 120) {
        item.height = (item.elem.getAttribute('height') || 500);
    }
    
    // Append 'px' if a number, or if a string without 'px' or '%'
    if (typeof item.width == 'number' || (typeof item.width == 'string' && item.width.toLowerCase().indexOf('px') == -1 && item.width.indexOf('%') == -1)) {
        item.width = item.width+'px';
    }
    if (typeof item.height == 'number' || (typeof item.height == 'string' && item.height.toLowerCase().indexOf('px') == -1 && item.height.indexOf('%') == -1)) {
        item.height = item.height+'px';
    }

    item.containerElem.style.width = item.width;
    item.containerElem.style.height = item.height;

    item.elem.parentNode.insertBefore(item.containerElem, item.elem);
    item.elem.remove();
    
    if (originalId != '') {
        item.containerElem.id = originalId; // Should only set id after removing original element, otherwise two elements would have same id
    }
    
    addPlayer(item);
    
}

var addPlayer = (item) => {
    //console.info('Adding player for', item);
    
    if (item.containerElem.dataset.swfContainsPlayer) {
        console.info('Player already loaded for this item.');
        return;
    }
    
    item.containerElem.dataset.swfContainsPlayer = true;
    
    item.playerElem = document.createElement('iframe');
    item.playerElem.classList.add('ext-modernkit-flash-player-frame');
    item.playerElem.sandbox = 'allow-same-origin allow-scripts allow-popups-to-escape-sandbox';
    item.playerElem.referrerPolicy = 'no-referrer';
    item.playerElem.allow = 'autoplay; fullscreen';
    item.playerElem.src = chrome.runtime.getURL('external/player-embed.html?src='+encodeURIComponent(item.src)+'&width='+item.width+'&height='+item.height+'&flashvars='+encodeURIComponent(item.flashvars));

    item.containerShadowElem.appendChild(item.playerElem);
}

var initializePage = (callback) => {
    // Add CSS if we'll add container/overlay or player
    chrome.runtime.sendMessage({action: "addPageCSS"}, callback);
}

var init = () => {
    
    //console.info('Content script: Find and play running.');

    var items = findElements();

    if (items.length) {
      // Only initialize page if we have items on page
      initializePage(() => {
          
        setTimeout(() => {
            // Callback after CSS is injected
            items.forEach((item) => {
                addContainer(item);
            });

            //console.info('Content script: Find and play finished.');
        }, 1); // Delay to ensure CSS is processed and prevent jumping/flashing
      });
    }

};

//init();
// Slight delay needed to allow DOM tree to settle (mainly an issue in object-embed-compat.html
setTimeout(init, 100);
//setTimeout(init, 1200);
//setTimeout(init, 5500);
