document.addEventListener('DOMContentLoaded', async () => {

    // Wait for all other images to load
    await PopupUI.waitForAllImages();

    // Show UI elements with transitions
    PopupUI.showElement(PopupUI.elements.spinner, { display: 'block', animationClass: 'fade-in' });
    PopupUI.showElement(PopupUI.elements.urlText, { display: 'block', animationClass: 'fade-in' });
    PopupUI.showElement(PopupUI.elements.mediaInfo, { display: 'flex', animationClass: 'fade-in' });
    PopupUI.showElement(PopupUI.elements.buttonContainer, { display: 'block', animationClass: 'fade-in' });
    PopupUI.showElement(document.getElementById('footer-links'), { display: 'flex', animationClass: 'fade-in' });
});

class ExtensionManager {
    constructor() {
        this.currentTabUrl = null;
        
        // Bind instance methods in the constructor
        this.initializePopup = this.initializePopup.bind(this);
        this.handleStorageChanges = this.handleStorageChanges.bind(this);
        this.checkLocalStorageForDownloads = this.checkLocalStorageForDownloads.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.updateButtonState = this.updateButtonState.bind(this);
        this.resetButtonStates = this.resetButtonStates.bind(this);
    
        // Initialize event listeners
        this.initializeEventListeners();
    }

    initializePopup() {

        this.resetPopupState();
        applyTranslations(); 
        const spinnerImage = document.getElementById('spinner-image');
    
        if (spinnerImage) {
            spinnerImage.src = 'img/spinner.png';
            PopupUI.waitForImageLoad(spinnerImage)
                .then(() => spinnerImage.classList.add('loaded'))
                .catch(() => spinnerImage.classList.add('hidden'));
        }        
    
        PopupUI.waitForAllImages();
    
        coreAPI.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            
            if (!tabs.length || !tabs[0].url) {
                this.showMessage('popup_no_media_found');
                return;
            }
    
            const tabUrl = tabs[0].url;
            this.currentTabUrl = tabUrl;
    
            PopupUI.displayUrl(tabUrl);
    
            
            if (this.isYouTubePage(tabUrl)) {
            }
    
            if (this.isRestrictedPage(tabUrl)) {
                this.showMessage('popup_no_media_found');
                return;
            }
            
            this.checkLocalStorageForDownloads(tabUrl);
        });
    }      
    
    showMessage(messageKey) {

        PopupUI.hideElement(PopupUI.elements.spinner, { animationClass: 'fade-out' });
    
        if (PopupUI.elements.noVideoMessage) {
            PopupUI.elements.noVideoMessage.textContent = coreAPI.i18n.getMessage(messageKey) || 'Message Not Found!';
        }
    
        PopupUI.showElement(PopupUI.elements.noVideoMessage, { display: 'block', animationClass: 'fade-in' });
    }
    
    isYouTubePage(url) {
        const restrictedDomains = ['youtube.com', 'youtu.be'];
        return restrictedDomains.some(domain => url.includes(domain));
    }

    initializeEventListeners() {
        
        document.addEventListener('DOMContentLoaded', this.initializePopup.bind(this));

        coreAPI.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
            if (changeInfo.url && tab.active) {
                if (this.currentTabUrl !== changeInfo.url) {
                    this.currentTabUrl = changeInfo.url;
                    
                    PopupUI.hideElement(PopupUI.elements.videoThumbnail, { display: 'none', animationClass: 'fade-out' });
                    PopupUI.hideElement(PopupUI.elements.videoTitle, { display: 'none', animationClass: 'fade-out' });
                    PopupUI.hideElement(PopupUI.elements.mediaInfo, { display: 'none', animationClass: 'fade-out' });
                    PopupUI.hideElement(PopupUI.elements.buttonContainer, { display: 'none', animationClass: 'fade-out' });
                    PopupUI.showElement(PopupUI.elements.spinner, { display: 'block' });

                    this.initializePopup();
                }
            }
        });
        
        // Storage changes
        coreAPI.storage.onChanged.addListener(this.handleStorageChanges.bind(this));

        // Download buttons
        ['video', 'audio'].forEach(type => {
            const button = document.getElementById(`download-${type}`);
            if (button) {
                button.addEventListener('click', () => this.handleButtonClick(type === 'video', type));
            }
        });

        // Navigation links
        document.getElementById('settings-link')?.addEventListener('click', () => this.openOptionsPageWithTab('settings'));
        document.getElementById('history-link')?.addEventListener('click', () => this.openOptionsPageWithTab('history'));
        document.getElementById('info-link')?.addEventListener('click', () => this.openOptionsPageWithTab('info'));
    }

    checkLocalStorageForDownloads(tabUrl) {
        
        PopupUI.showElement(PopupUI.elements.spinner, { display: 'block' });
        PopupUI.hideElement(PopupUI.elements.noVideoMessage, { display: 'none' });
        PopupUI.hideElement(PopupUI.elements.mediaInfo, { display: 'none' });
        PopupUI.hideElement(PopupUI.elements.buttonContainer, { display: 'none' });
        PopupUI.hideElement(PopupUI.elements.videoThumbnail, { display: 'none' });
        PopupUI.hideElement(PopupUI.elements.videoTitle, { display: 'none' });
    
        coreAPI.storage.local.get('downloads', (result) => {
            const downloads = result.downloads || {};
            const cachedEntry = downloads[tabUrl];
    
            if (cachedEntry) {
    
                // Update the title and thumbnail
                PopupUI.elements.videoTitle.textContent = cachedEntry.video?.title || cachedEntry.audio?.title || 'No Title';
                PopupUI.elements.videoThumbnail.src = cachedEntry.video?.thumbnail || cachedEntry.audio?.thumbnail || '';
    
                // Update button states
                this.updateButtonStates(tabUrl, cachedEntry);
    
                // Hide the spinner
                PopupUI.hideElement(PopupUI.elements.spinner, { animationClass: 'fade-out' });
    
                // Show relevant elements
                PopupUI.showElement(PopupUI.elements.videoThumbnail, { display: 'flex' });
                PopupUI.showElement(PopupUI.elements.videoTitle, { display: 'flex' });
                PopupUI.showElement(PopupUI.elements.mediaInfo, { display: 'flex' });
                PopupUI.showElement(PopupUI.elements.buttonContainer, { display: 'block' });

            } else {

                Search.fetchSearchResults(
                    tabUrl,
                    (data) => {
                        
                        // Update the title and thumbnail
                        PopupUI.elements.videoTitle.textContent = data.title || 'No Title';
                        PopupUI.elements.videoThumbnail.src = data.thumbnail || '';
    
                        // Update button states based on fetched results
                        this.updateButtonStates(tabUrl, data);
    
                        // Hide the spinner
                        PopupUI.hideElement(PopupUI.elements.spinner, { animationClass: 'fade-out' });
    
                        // Show relevant elements
                        PopupUI.showElement(PopupUI.elements.videoThumbnail, { display: 'flex' });
                        PopupUI.showElement(PopupUI.elements.videoTitle, { display: 'flex' });
                        PopupUI.showElement(PopupUI.elements.mediaInfo, { display: 'flex' });
                        PopupUI.showElement(PopupUI.elements.buttonContainer, { display: 'block' });
                    },
                    () => {
                        this.showMessage('popup_no_media_found');
                    }
                );
            }
        });
    }
    
    resetPopupState() {
        
        // Hide all relevant elements
        PopupUI.hideElement(PopupUI.elements.buttonContainer, { display: 'none' });
        PopupUI.hideElement(PopupUI.elements.noVideoMessage, { display: 'none' });
        PopupUI.hideElement(PopupUI.elements.mediaInfo, { display: 'none' });
        PopupUI.hideElement(PopupUI.elements.videoThumbnail, { display: 'none' });
        PopupUI.hideElement(PopupUI.elements.videoTitle, { display: 'none' });
    
        // Show spinner
        PopupUI.showElement(PopupUI.elements.spinner, { display: 'block' });
    
        // Reset button states
        this.resetButtonStates();
    }      

    handleDownloadRequest({ isVideo, url }) {
        
        coreAPI.storage.local.get('downloads', (result) => {
            const downloads = result.downloads || {};
            const entry = downloads[url];
        
            if (!entry || (!entry.video && !entry.audio)) {
                return;
            }
        
            const title = isVideo ? entry.video?.title : entry.audio?.title;
        
            if (!title) {
                return;
            }
        
            this.simulateDownload(url, isVideo, downloads, entry);
        });        
    }

    simulateDownload(url, isVideo, downloads, entry) {
        setTimeout(() => {
            
            entry.video.state = isVideo ? 'success' : entry.video.state;
            entry.audio.state = !isVideo ? 'success' : entry.audio.state;

            coreAPI.storage.local.set({ downloads });
        }, 1000);
    }

    isRestrictedPage(url) {
        const restrictedPrefixes = ['about:', 'chrome:', 'file:', 'moz-extension:', 'chrome-extension:'];
        //const restrictedDomains = ['youtube.com', 'youtu.be'];
        return (
            restrictedPrefixes.some(prefix => url.startsWith(prefix))
            //restrictedDomains.some(domain => url.includes(domain))
        );
    } 

    openOptionsPageWithTab(tab) {
        coreAPI.tabs.query({}, tabs => {
            const optionsUrl = coreAPI.runtime.getURL('options.html');
            const existingTab = tabs.find(t => t.url === optionsUrl);
            if (existingTab) {
                coreAPI.tabs.sendMessage(existingTab.id, { action: 'switchTab', targetTab: tab });
                coreAPI.tabs.update(existingTab.id, { active: true }, () => {
                    window.close();
                });
            } else {
                coreAPI.storage.local.set({ targetTab: tab }, () => {
                    coreAPI.runtime.openOptionsPage(() => {
                        window.close();
                    });
                });
            }
        });
    }

    handleStorageChanges(changes, area) {
        if (area !== 'local' || !changes.downloads) return;
    
        const updatedDownloads = changes.downloads.newValue || {};
    
        coreAPI.tabs.query({ active: true, currentWindow: true }, (tabs) => {

            if (!tabs.length) return;
    
            const currentTabUrl = tabs[0].url;
            const currentEntry = updatedDownloads[currentTabUrl];
    
            // Skip updates if the current tab's URL is not affected
            if (!currentEntry) {
                return;
            }
    
            // Update only specific UI elements (e.g., progress bar or buttons)
            ['video', 'audio'].forEach((mediaType) => {
                const mediaEntry = currentEntry[mediaType];
                if (!mediaEntry) return;
    
                const button = document.getElementById(`download-${mediaType}`);
                this.updateButtonState(button, mediaEntry.state, mediaEntry.progress || 0);
            });
        });
    }

    async handleButtonClick(isVideo, mediaType) {
        const button = document.getElementById(`download-${mediaType}`);

        coreAPI.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
            if (!tabs.length) return;

            const url = tabs[0].url;

            coreAPI.storage.local.get('downloads', async ({ downloads = {} }) => {
                const entry = downloads[url]?.[mediaType];

                if (!entry || ['found', 'success', 'error', 'interrupted', 'timeout'].includes(entry.state)) {
                    await this.resetProgressInStorage(url, isVideo);
                    this.updateProgressBar(button, 0);
                    this.startDownload(isVideo, mediaType, url);
                }
            });
        });
    }

    startDownload(isVideo, mediaType, url) {
        this.sendMessageToBackground(isVideo, url);
        const button = document.getElementById(`download-${mediaType}`);
        button.disabled = true;
    }

    updateButtonStates(url, cachedEntry) {
        ['video', 'audio'].forEach((mediaType) => {
            const buttonId = `download-${mediaType}`;
            const button = document.getElementById(buttonId);
            const entry = cachedEntry[mediaType];

            if (entry && entry.state) {
                this.updateButtonState(button, entry.state, entry.progress || 0);
            } else {
                this.resetButtonState(button, buttonId);
            }
        });
    }

    updateButtonState(button, state, progress = null) {
        
        button.className = '';

        if (['processing', 'retrying', 'encoding', 'downloading'].includes(state)) {
            this.removeHoverEffects(button);
        }

        switch (state) {
            case 'processing':
                this.setButtonState(button, 'processing', coreAPI.i18n.getMessage('popup_processing'));
                break;
            case 'retrying':
                this.setButtonState(button, 'retrying', coreAPI.i18n.getMessage('popup_retrying'));
                break;
            case 'encoding':
            case 'downloading':
                this.handleProgressState(button, state, progress);
                break;
            case 'success':
                this.setButtonState(button, 'success', coreAPI.i18n.getMessage('popup_downloaded'));
                this.updateProgressBar(button, 100);
                this.addHoverEffect(button, 'success');
                break;
            case 'not_found':
                this.setButtonState(button, 'not_found', coreAPI.i18n.getMessage('popup_no_media_found'));
                this.addHoverEffect(button, 'not_found');
                break;
            case 'timeout':
                this.setButtonState(button, 'timeout', coreAPI.i18n.getMessage('popup_timeout'));
                this.addHoverEffect(button, 'timeout');
                break;
            case 'interrupted':
                this.setButtonState(button, 'interrupted', coreAPI.i18n.getMessage('popup_interrupted'));
                this.addHoverEffect(button, 'interrupted');
                break;
            case 'error':
                this.setButtonState(button, 'error', coreAPI.i18n.getMessage('popup_error'));
                this.addHoverEffect(button, 'error');
                break;
        }
    }

    handleProgressState(button, state, progress) {
        const messageKey = state === 'encoding' ? 'popup_encoding' : 'popup_downloading';
        let text;
    
        if (progress !== null && progress !== undefined && progress >= 1) {
            text = `${coreAPI.i18n.getMessage(messageKey)} (${progress}%)`;
        } else {
            text = `${coreAPI.i18n.getMessage(messageKey)}...`;
        }
        
        this.setButtonState(button, state, text);
    
        if (progress !== null && progress !== undefined && progress >= 1) {
            this.updateProgressBar(button, progress, state);
        }
    }    

    setButtonState(button, className, text) {
        const prefix = className === 'success' ? '&#10004; ' : '';
        button.classList.add(className);
        button.innerHTML = `<span>${prefix}${text}</span>`;
        button.disabled = ['processing', 'encoding', 'downloading'].includes(className);
    }

    resetButtonState(button, buttonId) {
        button.classList.remove('processing', 'encoding', 'downloading', 'success', 'error');
        button.disabled = false;

        const defaultTextKey = buttonId === 'download-video' ? 'popup_download_video' : 'popup_download_audio';
        const defaultText = coreAPI.i18n.getMessage(defaultTextKey) || 
            (buttonId === 'download-video' ? 'Download Video' : 'Download Audio');
        this.updateButtonText(button, defaultText);
    }

    resetButtonStates() {
        ['video', 'audio'].forEach((mediaType) => {
            const buttonId = `download-${mediaType}`;
            const button = document.getElementById(buttonId);

            if (button) {
                button.className = '';
                button.disabled = false;

                const defaultTextKey = mediaType === 'video' ? 'popup_download_video' : 'popup_download_audio';
                const defaultText = coreAPI.i18n.getMessage(defaultTextKey) || 
                    (mediaType === 'video' ? 'Download Video' : 'Download Audio');
                this.updateButtonText(button, defaultText);

                button.style.background = '';
                button.style.transition = '';
            }
        });
    }

    updateButtonText(button, text) {
        button.innerHTML = `<span>${text}</span>`;
    }

    updateProgressBar(button, progress, state) {
        const colors = {
            backgroundColor: '#525c6b',
            fillColor: '#32A254'
        };

        if (progress === 0) {
            button.style.background = colors.backgroundColor;
        } else if (progress === 100) {
            button.style.background = colors.fillColor;
        } else {
            button.style.background = 
                `linear-gradient(to right, ${colors.fillColor} ${progress}%, ${colors.backgroundColor} ${progress}%)`;
        }
    }

    addHoverEffect(button, state) {
        const hoverText = state === 'success' ? 
            coreAPI.i18n.getMessage('popup_again') : 
            coreAPI.i18n.getMessage('popup_retry');

        const defaultText = {
            success: `&#10004; ${coreAPI.i18n.getMessage('popup_downloaded')}`,
            error: coreAPI.i18n.getMessage('popup_error'),
            not_found: coreAPI.i18n.getMessage('popup_no_media_found'),
            timeout: coreAPI.i18n.getMessage('popup_timeout'),
            interrupted: coreAPI.i18n.getMessage('popup_interrupted'),
        }[state];

        button.onmouseenter = () => {
            if (hoverText) {
                button.innerHTML = `<span>${hoverText}</span>`;
            }
        };

        button.onmouseleave = () => {
            if (defaultText) {
                button.innerHTML = `<span>${defaultText}</span>`;
            }
        };
    }

    removeHoverEffects(button) {
        button.onmouseenter = null;
        button.onmouseleave = null;

        const currentClass = Array.from(button.classList)
            .find(cls => ['success', 'error', 'not_found', 'timeout', 'interrupted'].includes(cls));
        
        switch (currentClass) {
            case 'success':
                this.updateButtonText(button, coreAPI.i18n.getMessage('popup_downloaded'));
                break;
            case 'error':
                this.updateButtonText(button, coreAPI.i18n.getMessage('popup_error'));
                break;
            case 'not_found':
                this.updateButtonText(button, coreAPI.i18n.getMessage('popup_no_media_found'));
                break;
            case 'timeout':
                this.updateButtonText(button, coreAPI.i18n.getMessage('popup_timeout'));
                break;
            case 'interrupted':
                this.updateButtonText(button, coreAPI.i18n.getMessage('popup_interrupted'));
                break;
            default:
                this.resetButtonState(button, button.id);
                break;
        }
    }

    resetProgressInStorage(url, isVideo) {
        return new Promise((resolve) => {
            coreAPI.storage.local.get('downloads', ({ downloads = {} }) => {
                const mediaType = isVideo ? 'video' : 'audio';
                if (downloads[url] && downloads[url][mediaType]) {
                    downloads[url][mediaType].progress = 0;
                    coreAPI.storage.local.set({ downloads }, () => resolve());
                } else {
                    resolve();
                }
            });
        });
    }

    sendMessageToBackground(isVideo, url) {
        coreAPI.runtime.sendMessage({ action: 'download', isVideo, url });
    }
}

// Initialize the extension manager
const extensionManager = new ExtensionManager();