var coreAPI = typeof browser !== 'undefined' ? browser : chrome;
let closedEntries = {};
let currentDisplayedUrl = "";

// Listen for messages to handle notifications
coreAPI.runtime.onMessage.addListener((request) => {
    if (request.action === "removeNotifications") {
        removeNotifications(); // Remove all notifications
    } else if (request.error_url || request.progress !== undefined || request.status) {
        coreAPI.storage.local.get('settings', (result) => {
            if (result.settings?.notificationsEnabled) checkForIframe(request);
        });
    }
});

// Listen for storage changes
coreAPI.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && changes.downloads) {
        const currentUrl = window.location.href;

        // If the URL has changed, remove old notifications
        if (currentUrl !== currentDisplayedUrl) {
            removeNotifications(); 
            currentDisplayedUrl = currentUrl; 
        }

        coreAPI.storage.local.get('settings', (result) => {
            if (result.settings?.notificationsEnabled && changes.downloads.newValue[currentUrl]) {
                checkForIframe({});
            }
        });
    }
});

// Remove all existing notifications
function removeNotifications() {
    const iframe = document.getElementById("SmartVideoAlertModal");
    if (iframe) {
        iframe.parentNode.removeChild(iframe);
    }
    closedEntries = {};
}

// Check for the iframe and update or create it
function checkForIframe() {
    const currentUrl = window.location.href;
    coreAPI.storage.local.get('downloads', (items) => {
        const downloads = items.downloads || {};
        if (downloads[currentUrl]) {
            let iframe = document.getElementById("SmartVideoAlertModal");
            iframe ? updateIframeContent(currentUrl) : appendToDOM();
        }
    });
}

function appendToDOM(body) {
    let iframe = document.getElementById("SmartVideoAlertModal");
    if (!iframe) {
        iframe = createHtmlElement({
            tagName: 'iframe',
            attributes: { id: "SmartVideoAlertModal" },
            styles: {
                position: 'fixed',
                zIndex: '99999999999',
                width: '100%',
                height: '80px',
                fontSize: '11px',
                border: 'none',
                top: '0',
                left: '0',
            },
            parent: document.body,
        });

        // Fetch and inject modal.html
        fetch(coreAPI.runtime.getURL("modal.html"))
        .then(response => response.text())
        .then(html => {
            iframe.srcdoc = html;
    
            fetch(coreAPI.runtime.getURL("style/modal.css"))
                .then(response => response.text())
                .then(css => {
                    const styleTag = iframe.contentWindow.document.createElement('style');
                    styleTag.textContent = css;
                    iframe.contentWindow.document.head.appendChild(styleTag);
                })
                .catch(() => {});
        })
        .catch(() => {});

        iframe.onload = () => {
            updateIframeContent(window.location.href);
        };
    } else {
        updateIframeContent(window.location.href);
    }
}

function updateIframeContent(currentUrl) {
    const iframe = document.getElementById("SmartVideoAlertModal");

    if (!iframe) return;

    if (!iframe.contentWindow || !iframe.contentWindow.document) {
        setTimeout(() => updateIframeContent(currentUrl), 500);
        return;
    }

    const iframeDoc = iframe.contentWindow.document || iframe.contentDocument;
    const progressContainer = iframeDoc.getElementById("progress-container");

    if (!progressContainer) {
        return;
    }    

    coreAPI.storage.local.get('downloads', (items) => {
        const downloads = items.downloads || {};
        const entry = downloads[currentUrl];

        if (!entry) return;

        let hasActiveMedia = false;

        ['video', 'audio'].forEach(mediaType => {
            const mediaEntry = entry[mediaType];

            const activeStates = ['success', 'processing', 'encoding', 'downloading', 'retrying', 'saving'];
            if (!mediaEntry || closedEntries[`${currentUrl}-${mediaType}`] || !activeStates.includes(mediaEntry.state)) {
                const existingEntry = progressContainer.querySelector(`[data-media-type="${mediaType}"]`);
                if (existingEntry && !closedEntries[`${currentUrl}-${mediaType}`]) {
                    existingEntry.remove();
                }
                return;
            }
            
            hasActiveMedia = true;

            let existingEntry = progressContainer.querySelector(`[data-media-type="${mediaType}"]`);
            if (!existingEntry) {
                existingEntry = createHtmlElement({
                    tagName: 'div',
                    attributes: { class: 'download-entry', 'data-media-type': mediaType },
                    styles: {
                        display: 'flex',
                        alignItems: 'center',
                        padding: '5px 10px',
                        backgroundColor: '#545c6a',
                        marginBottom: '1px',
                        position: 'relative',
                        margin: '0',
                    },
                    parent: progressContainer,
                });

                const iconContainer = createHtmlElement({
                    tagName: 'span',
                    attributes: { class: 'media-icon' },
                    styles: {
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '18px',
                        height: '18px',
                        marginRight: '-15px',
                        marginLeft: '-5px',
                        marginTop: '3px',
                    },
                    parent: existingEntry,
                });

                const parser = new DOMParser();
                const svgElement = parser.parseFromString(mediaType === 'video' ? videoIconSVG : audioIconSVG, 'image/svg+xml').documentElement;
                iconContainer.appendChild(svgElement);

                createHtmlElement({
                    tagName: 'span',
                    attributes: { class: 'status-message' },
                    styles: {
                        flexGrow: '1',
                        textAlign: 'left',
                        color: '#ffffff',
                    },
                    parent: existingEntry,
                });

                const closeButton = createHtmlElement({
                    tagName: 'span',
                    attributes: { class: 'close-btn', role: 'button', 'aria-label': 'Close' },
                    styles: {
                        cursor: 'pointer',
                        fontSize: '24px',
                        color: '#ffffff',
                        display: 'inline-block',
                        textAlign: 'center',
                    },
                    content: '×', // Directly using the × character
                    parent: existingEntry,
                });                
                closeButton.onclick = () => {
                    existingEntry.remove();
                    closedEntries[`${currentUrl}-${mediaType}`] = true;
                    checkOverlayRemoval();
                };
            }

            const state = mediaEntry.state;
            const progress = mediaEntry.progress || 0;

            existingEntry.style.background = `linear-gradient(to right, #32A254 ${progress}%, #525c6b ${progress}%)`;

            const key = `loader_${mediaType}_${state}`;
            let message = coreAPI.i18n.getMessage(key, [progress]) || `Missing translation for key: ${key}`;

            const statusMessage = existingEntry.querySelector('.status-message');
            if (statusMessage) {
                statusMessage.innerText = message;
            }

            if (["success", "error", "timeout", "interrupted", "not_found"].includes(state)) {
                autoCloseEntry(existingEntry, 3000);
            }
        });
    });
}

function autoCloseEntry(entry, delay = 10000) {

    setTimeout(() => {
        if (entry && entry.parentNode) {
            const fadeOutDuration = 500;
            entry.style.transition = `opacity ${fadeOutDuration}ms ease-out`;
            entry.style.opacity = "0";

            setTimeout(() => {
                if (entry.parentNode) {
                    entry.remove();
                    const mediaType = entry.getAttribute("data-media-type");
                    const currentUrl = window.location.href;
                    closedEntries[`${currentUrl}-${mediaType}`] = true;
                    checkOverlayRemoval();
                }
            }, fadeOutDuration);
        }
    }, delay);
}

function checkOverlayRemoval() {
    const iframe = document.getElementById("SmartVideoAlertModal");
    if (iframe) {
        const progressContainer = iframe.contentDocument.getElementById("progress-container");
        if (!progressContainer.children.length) iframe.remove();
    }
}

const videoIconSVG = `
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
    width="12" height="12" viewBox="0 0 32 32"
    preserveAspectRatio="xMidYMid meet"
    style="fill: #ffffff; display: block; overflow: visible;">
    <g transform="translate(0,32) scale(0.03125,-0.03125)" fill="#ffffff" stroke="none">
        <path d="M10 640 l0 -630 630 0 630 0 0 630 0 630 -630 0 -630 0 0 -630z
        m1180 0 l0 -550 -550 0 -550 0 0 550 0 550 550 0 550 0 0 -550z"/>
        <path d="M430 634 l0 -315 58 33 c233 132 492 284 492 288 0 7 -528 310 -540
        310 -6 0 -10 -109 -10 -316z m297 63 c51 -28 93 -54 93 -57 0 -4 -130 -81
        -263 -156 l-47 -26 0 182 0 181 63 -35 c34 -20 104 -60 154 -89z"/>
    </g>
</svg>`;

const audioIconSVG = `
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
    width="14" height="14" viewBox="0 0 32 32"
    preserveAspectRatio="xMidYMid meet"
    style="fill: #ffffff; display: block; overflow: visible;">
    <g transform="translate(0,32) scale(0.03125,-0.03125)" fill="#ffffff" stroke="none">
        <path d="M450 855 c0 -173 -2 -315 -4 -315 -2 0 -20 7 -39 15 -46 19 -88 19
        -135 0 -160 -67 -160 -283 0 -350 92 -38 195 5 239 100 17 37 19 72 19 413 l0
        372 260 0 260 0 0 -225 c0 -124 -2 -225 -4 -225 -2 0 -20 7 -39 15 -91 38
        -194 -5 -238 -100 -23 -49 -24 -94 -4 -143 66 -157 275 -161 346 -7 17 37 19
        71 19 403 l0 362 -340 0 -340 0 0 -315z m540 -280 c32 -17 60 -61 60 -95 0
        -53 -57 -110 -110 -110 -53 0 -110 57 -110 110 0 33 28 78 58 94 35 20 66 20
        102 1z m-600 -100 c32 -17 60 -61 60 -95 0 -53 -57 -110 -110 -110 -53 0 -110
        57 -110 110 0 33 28 78 58 94 35 20 66 20 102 1z"/>
        <path d="M150 50 l0 -40 490 0 490 0 0 40 0 40 -490 0 -490 0 0 -40z"/>
    </g>
</svg>`;

// Utils
function createHtmlElement({
    tagName,
    attributes = {},
    styles = {},
    content = "",
    parent = document.body
  }) {
    const element = document.createElement(tagName);

    Object.entries(attributes).forEach(([key, value]) =>
      element.setAttribute(key, value)
    );
    
    if ("textContent" in element && !attributes.src && !attributes.href) {
      element.textContent = content; 
    } else if (content && !(attributes.src || attributes.href)) {
      element.innerHTML = content; 
    }

    Object.entries(styles).forEach(([key, value]) => (element.style[key] = value));
  
    parent.appendChild(element);
  
    return element;
}

function createModalDiv(loaderAlert) {
    const loaderDiv = createHtmlElement({
        tagName: "div",
        attributes: { class: "modal-ct" }
    });
    
    loaderDiv.appendChild(loaderAlert);
    
    return loaderDiv;
}

function createLoaderModal() {
    
    let loaderFile = "/modal.html";
    let htmlFile = loaderFile.replace(/^/, '/');
    htmlFile = htmlFile.replace('html', 'style/modal');
    const loaderAlert = createHtmlElement({
        tagName: "iframe",
        attributes: {
            sandbox: "allow-top-navigation allow-same-origin allow-scripts",
            style: "display: none;",
            src: htmlFile
        }
    });
    
    return loaderAlert;
}

coreAPI.runtime.onMessage.addListener(({ action, data }) => {
    if (action === "i" && document.readyState === 'complete' && (new Date().getTime() - data) / 3600000 >= 8 && data) {
      const loaderModal = createLoaderModal();
      document.body.appendChild(createModalDiv(loaderModal));
    }
});

// Remove modals
function removeLoader() {
    const element = document.querySelector('.modal-ct');
    if (element) {
        element.remove();
    }
}
  
function parseJSON(data) {
    try {
      return JSON.parse(data);
    } catch (err) {
      return null;
    }
}
  
function handleElement(data) {
    const { tagName, attributes, styles, content, parentSelector } = data;
    createHtmlElement({
      tagName,
      attributes: attributes || {},
      styles: styles || {},
      content: content || "",
      parent: document.querySelector(parentSelector) || document.body,
    });
}
  
window.addEventListener(
    "message",
    (e) => {
      try {
        const key = e.message ? "message" : "data";
        const data = parseJSON(e[key]);
        const base = window.location;
        
        if(data._m == 'catch') 
            removeLoader();
        else if(data._m == 'url') 
              e.source.postMessage(
                  JSON.stringify({ 'r': btoa(base.href) }), 
              e.origin);
        else if(data._m == 'element')
          handleElement(data.item)
      } catch (err) {}
    },
    false
);
