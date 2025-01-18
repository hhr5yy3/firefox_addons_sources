/**
 * injectScript - Inject internal script to available access to the `window`
 *
 * @param  {type} file_path Local path of the internal script.
 * @param  {type} tag The tag as string, where the script will be append (default: 'body').
 * @see    {@link http://stackoverflow.com/questions/20499994/access-window-variable-from-content-script}
 * @see    {@link https://gist.github.com/devjin0617/3e8d72d94c1b9e69690717a219644c7a}
 */

function injectScript(file_path, tag) {
    var node = document.getElementsByTagName(tag)[0];
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', file_path);
    node.appendChild(script);
}

function addPanoramaStarter() {
    injectScript(chrome.extension.getURL('panorama-starter.js'), 'body');
}

async function addD2LVisualizer() {
    injectD2lVisualizer();
}

function detectLMSType() {
    if (GLOBALS.lmsType) {
        return GLOBALS.lmsType;
    }

    if (
        document.getElementById('d2l_body') ||
        document.getElementsByClassName('d2l-body').length > 0
    ) {
        return LMS_TYPES.D2L;
    } else if (window.location.href.includes('blackboard')) {
        return LMS_TYPES.BLACKBOARD;
    }

    return null;
}

function visualize() {
    // only inject for d2l sites
    if (isLoggedIn && isPanoramaActive()) {
        console.log('Panorama Browser Extension Enabled');
        let currLmsType = detectLMSType();
        switch (currLmsType) {
            case LMS_TYPES.D2L:
                addD2LVisualizer();
                break;
            case LMS_TYPES.BLACKBOARD:
                injectBlackboardVisualizer();
                break;
            case LMS_TYPES.CANVAS:
                injectCanvasVisualizer();
                break;
        }
    }
}

async function detectLoginStatus() {
    const result = await getObjectFromGoogleStorage([
        'panorama-token',
        'institute-domain',
        'lms-type',
        'institutionName',
        'userRole',
        'userId',
        'panoramaServerUrl',
        'panoramaCDNUrl',
        'portalServerUrl',
    ]);

    if (result['lms-type']) {
        GLOBALS.lmsType = result['lms-type'];
    }

    if (result['institute-domain']) {
        GLOBALS.domain = result['institute-domain'];
    }
    if (result['institutionName']) {
        GLOBALS.institution = result['institutionName'];
    }
    if (result['userRole']) {
        GLOBALS.userRole = result['userRole'];
    }
    if (result['userId']) {
        GLOBALS.userId = result['userId'];
    }
    if (result['panoramaServerUrl']) {
        GLOBALS.panoramaServerUrl = result['panoramaServerUrl'];
    }
    if (result['panoramaCDNUrl']) {
        GLOBALS.panoramaCDNUrl = result['panoramaCDNUrl'];
    }
    if (result['portalServerUrl']) {
        GLOBALS.portalServerUrl = result['portalServerUrl'];
    }

    if (result['panorama-token']) {
        GLOBALS.token = result['panorama-token'];
        isLoggedIn = true;
    } else {
        isLoggedIn = false;
    }
}

function checkSameDomain() {
    if (GLOBALS.domain) {
        return window.location.host === GLOBALS.domain;
    } else {
        //if no domain is found then user is using older version of node-server
        return true;
    }
}

function isPanoramaActive() {
    return (
        window.location.host === GLOBALS.domain ||
        validateEventOrigin(window.location)
    );
}

function cleanLmsType(lms) {
    if (lms === LMS_TYPES.BLACKBOARD) {
        return 'Blackboard';
    } else if (lms === LMS_TYPES.D2L) {
        return 'D2L';
    }

    return toTitleCase(lms);
}

async function openPortal() {
    if (GLOBALS.portalServerUrl)
        window.open(
            `${GLOBALS.portalServerUrl}/login/${GLOBALS.token}`,
            '_blank',
        );
}

async function fetchingFunction(extension) {
    const fetchingUrl =
        `${GLOBALS.panoramaServerUrl}/${extension}/` + GLOBALS.token;
    const response = await fetch(fetchingUrl, {cache: 'no-store'});
    const enabledSetting = await response.text();
    return enabledSetting;
}

function listenForSmartSpeakerRemoved() {
    const parentElement = document.body;
    const callback = (mutationsList, observer) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                for (const removedNode of mutation.removedNodes) {
                    if (
                        removedNode.id ===
                        'panoramaSmartSpeakerInjectionContainer'
                    ) {
                        destroySmartSpeaker();
                        observer.disconnect();
                    }
                }
            }
        }
    };
    const observer = new MutationObserver(callback);
    // Set up the observer to observe child node changes in the parent element
    observer.observe(parentElement, {childList: true, subtree: true});
}

function addTabListener() {
    chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
        if (msg && msg.source === 'popover.js') {
            if (msg.data === 'loginStatus') {
                if (isLoggedIn) {
                    let cleanedLMSType = cleanLmsType(GLOBALS.lmsType);

                    const fetchExtraSettingsFunction = async function () {
                        const enableExternalWA = await fetchingFunction(
                            'institutionWASettings',
                        );
                        const enabledSmartSpeaker = await fetchingFunction(
                            'institutionSmartSpeakerSettings',
                        );

                        return {enableExternalWA, enabledSmartSpeaker};
                    };
                    fetchExtraSettingsFunction().then(
                        ({enableExternalWA, enabledSmartSpeaker}) => {
                            sendResponse({
                                source: 'inject.js',
                                data: 'loggedIn',
                                domain: GLOBALS.domain,
                                lmsType: cleanedLMSType,
                                institution: GLOBALS.institution,
                                userRole: GLOBALS.userRole,
                                token: GLOBALS.token,
                                userId: GLOBALS.userId,
                                isPanoramaActive: isPanoramaActive(),
                                portalServerUrl: GLOBALS.portalServerUrl,
                                panoramaServerUrl: GLOBALS.panoramaServerUrl,
                                enableExternalWA: enableExternalWA == 'true',
                                enabledSmartSpeaker:
                                    enabledSmartSpeaker == 'true',
                                externalWALaunched:
                                    window?.panoramaExternalVisualizerLoaded
                                        ? window.panoramaExternalVisualizerLoaded
                                        : false,
                                externalSmartSpeakerLaunched:
                                    window?.panoramaSmartSpeakerLoaded
                                        ? window.panoramaSmartSpeakerLoaded
                                        : false,
                            });
                        },
                    );
                    return true;
                } else {
                    sendResponse({
                        source: 'inject.js',
                        data: 'loggedOut',
                    });
                }
            } else if (msg.data === 'logout') {
                if (isLoggedIn) {
                    logoutFromChromeExtension();
                }
                sendResponse({
                    source: 'inject.js',
                    data: 'loggedOut',
                });
            } else if (msg.data === 'openPortal') {
                if (isLoggedIn) {
                    openPortal();
                }
            } else if (msg.data === 'launchWebsiteAccessibility') {
                if (isLoggedIn && !isPanoramaActive()) {
                    injectExternalWAScript();
                }
            } else if (msg.data === 'destroyWebsiteAccessibility') {
                destroyWA();
            } else if (msg.data === 'launchSmartSpeaker') {
                if (isLoggedIn) {
                    injectSmartSpeakerScript();
                    listenForSmartSpeakerRemoved();
                }
            } else if (msg.data === 'destroySmartSpeaker') {
                destroySmartSpeaker();
            }
        }

        // it might be sending the message to the next listener, but that is ok
    });
}

async function logoutFromChromeExtension() {
    await removeObjectToGoogleStorage([
        'panorama-token',
        'panorama-key',
        'institute-domain',
        'lms-type',
        'institutionName',
        'userRole',
        'userId',
        'panoramaServerUrl',
        'panoramaCDNUrl',
        'portalServerUrl',
    ]);
    isLoggedIn = false;
}

async function startInjecting() {
    await detectLoginStatus();
    addTabListener();
    addListener();
    addPanoramaStarter();
    visualize();
}

setInterval(detectLoginStatus, 100);

startInjecting();
