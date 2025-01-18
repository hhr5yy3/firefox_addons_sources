const bridgeTypes = {
    DISCONNECT_VINTED: "DISCONNECT_VINTED",
    GET_DEVICE_ID: "GET_DEVICE_ID",
    GET_VINTED_COOKIES: "GET_VINTED_COOKIES",
    GET_PASSPORT: "GET_PASSPORT"
}

const { DISCONNECT_VINTED, GET_DEVICE_ID, GET_VINTED_COOKIES, GET_PASSPORT } = bridgeTypes;
const port = browser.runtime.connect({ name: 'content-to-background' });
const ongoingRequests = new Map();

const generateRequestKey = (data) => {
    return `${data.method}-${data.url}-${JSON.stringify(data.payload)}-${data.operationName}-${data?.uuid}`;
};

const messageHandler = async (event) => {
    if (event.source !== window || !event.data.type) return;
    const type = event.data.type;
    

    if (type === "GET_DEVICE_ID_FROM_PAGE") {
        const value = await browser.runtime.sendMessage({ type: GET_DEVICE_ID, key: event.data.key });
        window.postMessage({ type: "GET_DEVICE_ID_FROM_EXT", data: value }, '*');
    }

    if (type === "GET_PASSPORT_FROM_PAGE") {
        const value = await browser.runtime.sendMessage({ type: GET_PASSPORT, key: event.data.key });
        window.postMessage({ type: "GET_PASSPORT_FROM_EXT", data: value }, '*');
    }

    if(type === "DISCONNECT_VINTED_FROM_PAGE"){
        const value = await browser.runtime.sendMessage({ type: DISCONNECT_VINTED, key: event.data.key });
        window.postMessage({ type: "DISCONNECT_VINTED_FROM_EXT", data: value }, '*');
    }

    if(type === "GET_VINTED_COOKIES_FROM_PAGE"){
        const value = await browser.runtime.sendMessage({ type: GET_VINTED_COOKIES, key: event.data.key });
        window.postMessage({ type: "GET_VINTED_COOKIES_FROM_EXT", data: value }, '*');
    }

    const key = event?.data?.key || 'HTTP_REQUEST';

    if (type === "REQUEST_FROM_PAGE") {
        try {
            port.postMessage({
                type: key,
                headers: event.data.headers,
                method: event.data.method,
                payload: event.data.payload,
                url: event.data.url,
                operationName: event.data.operationName,
                uuid: event.data.uuid
            });

            const portMessageHandler = (response) => {
                if (response.uuid === event.data.uuid) {
                    window.postMessage(
                        {
                            type: "RESPONSE_FROM_EXTENSION",
                            data: response,
                        },
                        '*'
                    );
                    
                    port.onMessage.removeListener(portMessageHandler);
                }
            };
            port.onMessage.removeListener(portMessageHandler);
            port.onMessage.addListener(portMessageHandler);
        } catch (error) {
            console.error("Extension https", error);
            window.postMessage({
                type: "RESPONSE_FROM_EXTENSION",
                data: { error: error.message || 'An error occurred during the request.' },
            }, '*');
        }
    }
};

window.removeEventListener('message', messageHandler);
window.addEventListener('message', messageHandler);

function generateUUIDv4() {
    function getRandomInt() {
        return Math.floor(Math.random() * 256);
    }

    const bytes = new Uint8Array(16);

    for (let i = 0; i < 16; i++) {
        bytes[i] = getRandomInt();
    }

    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;

    const byteToHex = Array.from(bytes).map((byte) =>
        byte.toString(16).padStart(2, "0")
    );

    return `${byteToHex[0]}${byteToHex[1]}${byteToHex[2]}${byteToHex[3]}-${byteToHex[4]}${byteToHex[5]}-${byteToHex[6]}${byteToHex[7]}-${byteToHex[8]}${byteToHex[9]}-${byteToHex[10]}${byteToHex[11]}${byteToHex[12]}${byteToHex[13]}${byteToHex[14]}${byteToHex[15]}`;
}



  