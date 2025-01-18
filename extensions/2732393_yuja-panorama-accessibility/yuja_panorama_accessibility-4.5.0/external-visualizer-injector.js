async function injectExternalWAScript() {
    const credentials = await getCredentials();
    try {
        visualizerAction(credentials, LMS_TYPES.EXTERNAL);
    } catch (e) {
        console.error(e);
    }
}

async function destroyWA() {
    const credentials = await getCredentials();
    try {
        await destroyWAVisualiser(credentials);
    } catch (e) {
        console.error(e);
    }
}

async function destroyWAVisualiser(credentials) {
    const {serverUrl} = credentials;

    const fetchingUrl = `${serverUrl}/panorama-visualizer/website-accessibility-destroyer`;
    const response = await fetch(fetchingUrl, {cache: 'no-store'});
    const scriptUrl = await response.text();
    if (!scriptUrl.toLowerCase().includes('not found')) {
        loadScript(scriptUrl, document, 'panoWADestroyerScript');
    } else {
        throw new Error(`Panorama script not found at: ${scriptUrl}`);
    }
    removeScript('panoWAVisualizerScript');
    removeScript('panoWADestroyerScript');
    window.panoramaExternalVisualizerLoaded = false;
}

async function injectSmartSpeakerScript() {
    const credentials = await getCredentials();
    try {
        visualizerAction(credentials, LMS_TYPES.SMART_SPEAKER);
    } catch (e) {
        console.error(e);
    }
}

async function destroySmartSpeaker() {
    try {
        const credentials = await getCredentials();
        const {serverUrl} = credentials;
        const fetchingUrl = `${serverUrl}/panorama-visualizer/smart-speaker-destroyer`;
        const response = await fetch(fetchingUrl, {cache: 'no-store'});
        const scriptUrl = await response.text();
        if (!scriptUrl.toLowerCase().includes('not found')) {
            loadScript(scriptUrl, document, 'panoSmartSpeakerDestroyerScript');
        } else {
            throw new Error(`Panorama script not found at: ${scriptUrl}`);
        }
        removeScript('panoSmartSpeakerVisualizerScript');
        removeScript('panoSmartSpeakerDestroyerScript');

        window.panoramaSmartSpeakerLoaded = false;
    } catch (e) {
        console.error(e);
    }
}
