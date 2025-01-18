const INJECT_VISUALIZER_LMS_MAP = [
    LMS_TYPES.D2L,
    LMS_TYPES.BLACKBOARD,
    LMS_TYPES.EXTERNAL,
    LMS_TYPES.SMART_SPEAKER,
];

async function visualizerAction(credentials, lms, elementToLoadIn = document) {
    const {serverUrl, cdnUrl, apiKey, token} = credentials;

    if (!serverUrl || !cdnUrl || !apiKey || !token) {
        warnOnClientBrowser('Unable to find credentials');
        return;
    }

    if (
        serverUrl.startsWith('#') ||
        cdnUrl.startsWith('#') ||
        apiKey.startsWith('#')
    ) {
        throw new Error(`The generated visualizer plugin is corrupted!`);
    }

    function addWindowVariables(cdnUrl, serverUrl, apiKey, token) {
        window.CDN_URL = cdnUrl;
        window.PANORAMA_CDN_URL = cdnUrl;
        window.SERVER_URL = serverUrl;
        window.PANORAMA_SERVER_URL = serverUrl;
        window.identifierKey = apiKey;
        window.panoramaIdentifierKey = apiKey;
        window.extensionToken = token;
        window.panoramaExtensionToken = token;
        window.isPanoChromeExtension = true;
    }

    function loadWindowsVariables() {
        const script = elementToLoadIn.createElement('script');
        script.appendChild(
            elementToLoadIn.createTextNode(
                '(' +
                    addWindowVariables +
                    ')(' +
                    JSON.stringify(cdnUrl) +
                    ',' +
                    JSON.stringify(serverUrl) +
                    ',' +
                    JSON.stringify(apiKey) +
                    ',' +
                    JSON.stringify(token) +
                    ');',
            ),
        );
        elementToLoadIn.head.appendChild(script);
    }

    let shouldLoadScript = window?.panoramaD2LVisualizerLoaded
        ? !window.panoramaD2LVisualizerLoaded
        : true;

    let scriptId = null;
    if (lms == LMS_TYPES.EXTERNAL) {
        shouldLoadScript = window?.panoramaExternalVisualizerLoaded
            ? !window.panoramaExternalVisualizerLoaded
            : true;
        scriptId = 'panoWAVisualizerScript';
    } else if (lms == LMS_TYPES.BLACKBOARD) {
        scriptId = 'panoWAVisualizerScript';
    } else if (lms == LMS_TYPES.SMART_SPEAKER) {
        shouldLoadScript = window?.panoramaSmartSpeakerLoaded
            ? !window.panoramaSmartSpeakerLoaded
            : true;
        scriptId = 'panoSmartSpeakerVisualizerScript';
    }

    try {
        loadWindowsVariables();

        //check if we want to inject visualizer or not
        if (INJECT_VISUALIZER_LMS_MAP.includes(lms) && shouldLoadScript) {
            const fetchingUrl = `${serverUrl}/panorama-visualizer/` + lms;
            const response = await fetch(fetchingUrl, {cache: 'no-store'});
            const scriptUrl = await response.text();
            if (!scriptUrl.toLowerCase().includes('not found')) {
                loadScript(scriptUrl, elementToLoadIn, scriptId);
                if (lms == LMS_TYPES.EXTERNAL) {
                    window.panoramaExternalVisualizerLoaded = true;
                } else if (lms == LMS_TYPES.SMART_SPEAKER) {
                    window.panoramaSmartSpeakerLoaded = true;
                }
            } else {
                throw new Error(`Panorama script not found at: ${scriptUrl}`);
            }
        }
    } catch (e) {
        console.error('Failed to load Panorama: ', e);
    }
}

async function getCredentials() {
    const result = await getObjectFromGoogleStorage([
        'panorama-token',
        'panorama-key',
        'panoramaServerUrl',
        'panoramaCDNUrl',
        'panorama-region',
    ]);

    const apiKey = result['panorama-key'];
    const token = result['panorama-token'];
    const region = result['panorama-region'];
    let serverUrl = result['panoramaServerUrl'];
    let cdnUrl = result['panoramaCDNUrl'];

    if ((!serverUrl || !cdnUrl) && region) {
        const urls = getServerUrlForBackwardCompatibility(region);
        if (urls) {
            ({serverUrl, cdnUrl} = urls);
        }
    }

    return {
        serverUrl,
        cdnUrl,
        apiKey,
        token,
    };
}

function getServerUrlForBackwardCompatibility(region) {
    const regionUrls = {
        us: ['https://panorama-api.yuja.com', 'https://cdn-panorama.yuja.com'],
        canada: [
            'https://panorama-api-cz.yuja.com',
            'https://cdn-panorama.yuja.com',
        ],
        europe: [
            'https://panorama-api-ez.yuja.com',
            'https://cdn-panorama.yuja.com',
        ],
        staging: [
            'https://staging-panorama-api.yuja.com',
            'https://staging-cdn-panorama.yuja.com',
        ],
    };

    const urls = regionUrls[region];
    if (urls && urls.length > 0) {
        const [serverUrl, cdnUrl] = urls;
        return {serverUrl, cdnUrl};
    }

    return null;
}
