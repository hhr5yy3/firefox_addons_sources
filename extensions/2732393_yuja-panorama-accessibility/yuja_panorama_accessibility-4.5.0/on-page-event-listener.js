const localOrigins = ['localhost.yuja.com', 'localhost'];

function validateEventOrigin(reqUrl) {
    const originHostname = new URL(reqUrl).hostname;
    return (
        localOrigins.includes(originHostname) ||
        originHostname.endsWith('.yuja.com')
    );
}

function addListener() {
    window.addEventListener('message', async (event) => {
        if (validateEventOrigin(event.origin)) {
            let data = event.data;
            let requestType;

            if (data && data.reqType) {
                requestType = data.reqType;
            }

            if (requestType === 'panorama-plugin:connection') {
                requestForLogin(event.source, event.origin);
            } else if (requestType === 'panorama-plugin:login') {
                await storeCredentials(data, event.source, event.origin);
                visualize();
            }
        }
    });
}

async function storeCredentials(data, source, origin) {
    const {
        extensionToken,
        panoramaServerUrl,
        panoramaCDNUrl,
        portalServerUrl,
        identifierKey,
        lmsType,
        domain,
        institutionName,
        userRole,
        userId,
    } = data;

    if (
        extensionToken &&
        extensionToken.length > 0 &&
        identifierKey &&
        identifierKey.length > 0
    ) {
        await setObjectToGoogleStorage({
            'panorama-token': extensionToken,
            'panorama-key': identifierKey,
            'institute-domain': domain,
            'lms-type': lmsType,
            institutionName,
            userRole,
            userId,
            panoramaServerUrl,
            panoramaCDNUrl,
            portalServerUrl,
        });

        receivedMessage = true;
        isLoggedIn = true;

        source.postMessage('panorama-plugin:signed-in-successful', origin);
    } else {
        console.error(
            'Panorama Browser Extension: Unable to login - missing fields',
        );
        source.postMessage('panorama-plugin:signed-in-failed', origin);
    }
}

function requestForLogin(source, origin) {
    source.postMessage('panorama-plugin:request', origin);
}
