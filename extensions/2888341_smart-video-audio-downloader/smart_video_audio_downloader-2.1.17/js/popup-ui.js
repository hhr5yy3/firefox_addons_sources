const PopupUI = {
    elements: {
        spinner: document.getElementById('spinner'),
        buttonContainer: document.getElementById('button-container'),
        mediaInfo: document.getElementById('media-info'),
        videoThumbnail: document.getElementById('video-thumbnail'),
        videoTitle: document.getElementById('video-title'),
        noVideoMessage: document.getElementById('no-video-message'),
        urlText: document.getElementById('url-text'),
    },

    // Generic function to show an element with optional animation.
    showElement(element, { display = 'block', animationClass = null } = {}) {
        if (!element) return;
    
        if (animationClass) {
            element.classList.add(animationClass);
        }

        // Ensure element is visible for transitions
        element.style.display = display;
        element.style.opacity = '1';
        element.style.visibility = 'visible';
        element.style.pointerEvents = 'all';
        element.style.transform = 'translateY(0) scale(1)';
    },

    hideElement(element, { animationClass = null, display = 'none' } = {}) {
        if (!element) return;
    
        // Apply optional animation class
        if (animationClass) {
            element.classList.add(animationClass);
        }
    
        // Trigger opacity and transform transitions
        element.style.display = display;
        element.style.opacity = '0';
        element.style.visibility = 'hidden';
        element.style.pointerEvents = 'none';
        element.style.transform = 'translateY(10px) scale(0.98)';
    },

    // Display the URL in the popup with the root domain and an icon.
    async displayUrl(url) {
        const { urlText } = this.elements;
    
        if (!urlText) {
            return;
        }
    
        urlText.innerHTML = '';
    
        if (!url || typeof url !== 'string' || url.trim() === '') {
            urlText.textContent = coreAPI.i18n.getMessage('popup_invalid_url');
            return;
        }
    
        try {
            const parsedUrl = new URL(url);
            const domainParts = parsedUrl.hostname.replace(/^www\./, '').split('.');
            const rootDomain = domainParts.slice(-2).join('.');
    
            const domainIcon = document.createElement('img');
            domainIcon.src = 'img/www.png';
            domainIcon.alt = 'Domain Icon';
            domainIcon.style.width = '16px';
            domainIcon.style.height = '16px';
            domainIcon.style.marginRight = '8px';
            domainIcon.style.marginBottom = '1px';
            domainIcon.style.verticalAlign = 'middle';
    
            // Wait for the icon to load and add the 'loaded' class
            PopupUI.waitForImageLoad(domainIcon).then(() => {
                domainIcon.classList.add('loaded');
            });
    
            const domainText = document.createTextNode(rootDomain || coreAPI.i18n.getMessage('popup_invalid_url'));
    
            urlText.appendChild(domainIcon);
            urlText.appendChild(domainText);
        } catch (error) {
            urlText.textContent = coreAPI.i18n.getMessage('popup_invalid_url');
        }
    },    

    // Wait for an element to complete its CSS transition.
    waitForTransition(element) {
        return new Promise((resolve) => {
            const duration = parseFloat(getComputedStyle(element).transitionDuration) * 1000;
            if (duration > 0) {
                element.addEventListener('transitionend', resolve, { once: true });
            } else {
                resolve();
            }
        });
    },    

    // Wait for an image to fully load.
    waitForImageLoad(img) {
        return new Promise((resolve) => {
            if (img.complete && img.naturalHeight !== 0) {
                // Image already loaded
                img.classList.add('loaded');
                resolve();
            } else {
                img.onload = () => {
                    img.classList.add('loaded'); // Add 'loaded' class after load
                    resolve();
                };
                img.onerror = () => {
                    resolve(); // Resolve even on error
                };
            }
        });
    },

    // Wait for all images within a container to load
    waitForAllImages(containerSelector = 'body') {
        return new Promise((resolve) => {
            const container = document.querySelector(containerSelector);
            if (!container) return resolve();
    
            const images = container.querySelectorAll('img');
            const loadPromises = Array.from(images).map((img) => {
                // Set a fallback src if not already set
                if (!img.src) {
                    img.src = 'img/loading.png'; // Use a default/fallback image
                }
                return this.waitForImageLoad(img);
            });
    
            Promise.all(loadPromises).then(() => {
                images.forEach((img) => img.classList.add('loaded'));
                resolve();
            });
        });
    },    

};
