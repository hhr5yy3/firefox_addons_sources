const coreAPI = typeof browser !== 'undefined' ? browser : chrome;
const SERVER_URL = 'https://fetch.tube'; // Base server URL

// Listen for messages from the popup
coreAPI.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'download') {
        const now = new Date().toISOString();
        updateStorageState(message.url, message.isVideo, 'processing', 0, now);
        handleDownloadRequest(message.isVideo, message.url);
    }
});

// Handles the download request
async function handleDownloadRequest(isVideo, url) {
    try {
        const title = await getCachedTitle(url);
        if (!title) throw new Error('[Background] Unable to retrieve cached title for the URL');

        const maxRetries = await getSetting('maxFailRetries', 3);
        const downloadId = await retryWithLimit(initiateDownload, [url, isVideo, title], maxRetries);

        if (downloadId) {
            monitorEncodingStage(downloadId, url, isVideo);
        } else {
            throw new Error('[Background] No downloadId received from the server');
        }
    } catch (error) {
        updateStorageState(url, isVideo, 'error');
    }
}

// Monitors encoding progress via SSE
async function monitorEncodingStage(downloadId, url, isVideo) {
    const eventSource = new EventSource(`${SERVER_URL}/api/status`);
    let lastProgress = -1;
    const maxRetries = await getSetting('maxFailRetries', 3);
    let retries = 0;

    const resetTimeout = () => {
        if (retries >= maxRetries) {
            updateStorageState(url, isVideo, 'error');
            eventSource.close();
            return true;
        }
        retries++;
        return false;
    };

    const timeoutId = setTimeout(() => {
        updateStorageState(url, isVideo, 'timeout');
        eventSource.close();
    }, 600000); // 1-minute timeout

    eventSource.onmessage = (event) => {
        clearTimeout(timeoutId); // Reset timeout on progress
        retries = 0;
        const data = JSON.parse(event.data);

        if (data.downloadId === downloadId) {
            const progress = Math.floor(data.progress);
            if (data.state === 'completed') {
                updateStorageState(url, isVideo, 'downloading', 0);
                eventSource.close();
                monitorDownloadStage(downloadId, url, isVideo);
            } else if (data.state === 'error') {
                updateStorageState(url, isVideo, 'error');
                eventSource.close();
            } else if (progress !== lastProgress) {
                updateStorageState(url, isVideo, 'encoding', progress);
                lastProgress = progress;
            }
        }
    };

    eventSource.onerror = () => {
        eventSource.close();  // Close before retrying
        if (resetTimeout()) return;
        setTimeout(() => monitorEncodingStage(downloadId, url, isVideo), 5000);
    };    
}

// Monitors the physical download stage of the file
async function monitorDownloadStage(downloadId, url, isVideo) {
    const fileUrl = `${SERVER_URL}/api/file/${downloadId}`;
    const maxRetries = await getSetting('maxFailRetries', 3);
    let retryCount = 0;
    const timeoutDuration = 500000;
    let timeoutHandler;

    let lastReportedProgress = -1;

    const resetTimeout = () => {
        if (timeoutHandler) clearTimeout(timeoutHandler);
        timeoutHandler = setTimeout(() => {
            updateStorageState(url, isVideo, 'timeout', lastReportedProgress);
            eventSource.close();
        }, timeoutDuration);
    };

    try {
        const response = await fetchWithTimeout(fileUrl, { method: 'GET' }, 300000);
        if (!response.ok) throw new Error(`[Background] File download failed with status: ${response.status}`);

        const contentLength = parseInt(response.headers.get('Content-Length'), 10);
        if (!contentLength) throw new Error('[Background] Content-Length not provided.');

        const reader = response.body.getReader();
        const chunks = [];
        let downloadedBytes = 0;

        const title = await getCachedTitle(url);
        const sanitizedTitle = sanitizeFilename(title || downloadId);

        resetTimeout();

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            downloadedBytes += value.length;
            const progress = Math.floor((downloadedBytes / contentLength) * 100);

            if (progress !== lastReportedProgress) {
                await fetch(`${SERVER_URL}/api/status/${downloadId}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ state: 'downloading', progress }),
                });
                updateStorageState(url, isVideo, 'downloading', progress);
                lastReportedProgress = progress;
            }

            chunks.push(value);
            resetTimeout();
        }

        clearTimeout(timeoutHandler);

        if (downloadedBytes !== contentLength) {
            throw new Error(`[Background] Download incomplete: ${downloadedBytes}/${contentLength} bytes.`);
        }

        const blob = new Blob(chunks);
        const filename = `${sanitizedTitle}.${isVideo ? 'mp4' : 'm4a'}`;

        
        if (typeof chrome !== 'undefined' && chrome.downloads && /chrome/i.test(navigator.userAgent)) {
            // --- Chrome: Use downloads.download API ---
            const blobUrl = await blobToDataURL(blob);
            const downloadId = await coreAPI.downloads.download({
                url: blobUrl,
                filename: filename,
                saveAs: false
            });
            updateStorageState(url, isVideo, 'success', 100, filename);
        } else {
            // --- Firefox and Edge (use <a> tag approach) ---
            const blobUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(blobUrl);
            updateStorageState(url, isVideo, 'success', 100, filename);
        }        

        try {
            await fetch(`${SERVER_URL}/api/status/${downloadId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ state: 'success', progress: 100 }),
            });
        } catch (error) {}

        updateStorageState(url, isVideo, 'success', 100, filename);

    } catch (error) {
        retryCount++;

        if (retryCount < maxRetries) {
            const redisState = await fetchRedisState(downloadId);
            if (redisState?.state === 'downloading') {
                lastReportedProgress = redisState.progress || lastReportedProgress;
            }
            await new Promise((resolve) => setTimeout(resolve, 5000));
            await monitorDownloadStage(downloadId, url, isVideo);
        } else {
            updateStorageState(url, isVideo, 'error', lastReportedProgress || 0);
        }
    }
}

// --- Helper to Convert Blob to Data URL ---
async function blobToDataURL(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

// Helper function to fetch Redis state
async function fetchRedisState(downloadId) {
    try {
        const response = await fetch(`${SERVER_URL}/api/status/${downloadId}`);
        //if (!response.ok) throw new Error(`Failed to fetch Redis state for ${downloadId}`);
        const state = await response.json();
        return state;
    } catch (error) {
        return null;
    }
}

// Retry wrapper for functions
async function retryWithLimit(fn, args, maxRetries) {
    let attempts = 0;
    const delay = Math.min(1000 * (2 ** attempts), 30000);
    while (attempts < maxRetries) {
        try {
            return await fn(...args);
        } catch (error) {

            attempts++;
            if (attempts >= maxRetries) {
                // Update state before rethrowing
                const [url, isVideo] = args; // Ensure arguments contain URL and isVideo
                updateStorageState(url, isVideo, 'error', 0);
                throw error;
            }
            await new Promise((resolve) => setTimeout(resolve, delay));
        }
    }
}

// Initiates the download request to the server
async function initiateDownload(url, isVideo, title) {
    const apiUrl = `${SERVER_URL}/api/download`;
    const requestData = { url, isVideo, title };

    const response = await fetchWithTimeout(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
    }, 600000); // 10-min timeout

    if (!response.ok) {
        throw new Error(`[Background] Server responded with status: ${response.status}`);
    }

    const data = await response.json();
    return data.downloadId;
}

function sanitizeFilename(filename) {
    // Replace reserved characters and trim leading/trailing whitespace
    return filename
        .replace(/[/\\?%*:|"<>]/g, '') // Remove reserved characters
        .replace(/\s+/g, ' ') // Collapse multiple spaces
        .trim(); // Trim leading/trailing whitespace
}

// Updates the download state in the browser's local storage
function updateStorageState(url, isVideo, state, progress = 0, filename = null) {
    const mediaType = isVideo ? 'video' : 'audio';
    const currentDate = new Date().toISOString();

    coreAPI.storage.local.get('downloads', (result) => {
        const downloads = result.downloads || {};
        const entry = downloads[url]?.[mediaType] || {};

        // Check if the state has changed
        if (entry.state !== state) {
            entry.state = state;
            entry.date = currentDate; // Update the date only for a new state
        }

        // Update progress and filename
        entry.progress = progress;
        if (filename) entry.filename = filename;

        // Ensure progress is 100% on success
        if (state === 'success') {
            entry.progress = 100;
        }

        downloads[url] = { ...downloads[url], [mediaType]: entry };

        coreAPI.storage.local.set({ downloads });
    });
}

// Fetches a resource with a timeout using AbortController
async function fetchWithTimeout(url, init, timeout) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    try {
        const response = await fetch(url, { ...init, signal: controller.signal });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        updateStorageState(init.url, init.isVideo, error.name === 'AbortError' ? 'timeout' : 'error', 0);
        eventSource.close();
    }
}

// Cleanup Stuck Downloads
function cleanupStuckDownloads() {
    coreAPI.storage.local.get('downloads', (result) => {
        const downloads = result.downloads || {};
        const now = Date.now();

        Object.keys(downloads).forEach((url) => {
            const states = downloads[url]; // Contains both video and audio states
            Object.keys(states).forEach((type) => {
                const entry = states[type]; // Entry for 'video' or 'audio'
                if (entry.state === 'downloading' || entry.state === 'encoding') {
                    const lastUpdated = new Date(entry.date).getTime();
                    if (now - lastUpdated > 100000) { // 5 min of no progress
                        updateStorageState(url, type === 'video', 'timeout', 0);
                    }
                }
            });
        });
    });
}

// Schedule cleanup every 30 minutes
setInterval(cleanupStuckDownloads, 600000);

// Retrieves a cached title for a given URL
async function getCachedTitle(url) {
    return new Promise((resolve) => {
        coreAPI.storage.local.get('downloads', (result) => {
            const downloads = result.downloads || {};
            const entry = downloads[url];
            const title = entry?.video?.title || entry?.audio?.title || null;

            if (title) {
                resolve(title);
            } else {
                resolve(null);
            }
        });
    });
}

// Get setting value from storage with a default
function getSetting(key, defaultValue) {
    return new Promise(resolve => {
        coreAPI.storage.local.get('settings', result => {
            resolve(result.settings?.[key] ?? defaultValue);
        });
    });
}

// Initialize storage after installation
coreAPI.runtime.onInstalled.addListener((e) => {
    if (e.reason === 'install') {
        const defaultSettings = {
            notificationsEnabled: true,
            maxFailRetries: 3,
            maxSearchRetries: 3
        };
        coreAPI.storage.local.set({ init: { i: new Date().getTime() } });
        coreAPI.storage.local.set({ settings: defaultSettings, downloads: {} });
    }
});

let init = {}; 

coreAPI.tabs.onUpdated.addListener(function (tabId, changeInfo) {
    if (changeInfo.status === 'loading') {
        delete init[tabId];
    }

    if (changeInfo.status === 'complete' && !init[tabId]) {
        coreAPI.storage.local.get('init', function (res) {
            if (res.init && res.init.i) {
                coreAPI.tabs.sendMessage(tabId, { action: "i", data: res.init.i }, () => {
                    if (chrome.runtime.lastError) {}
                });
                init[tabId] = true;
            }
        });
    }
});

coreAPI.tabs.onRemoved.addListener(function (tabId) {
    delete init[tabId];
});

coreAPI.tabs.onReplaced.addListener(function (addedTabId, removedTabId) {
    delete init[removedTabId];
    delete init[addedTabId];
});

