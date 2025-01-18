
const savedMap = new Map();
const savedObject = {};

const sendResponse = (event, args) => {
    if (window.location.origin !== 'https://www.roblox.com') {
        console.error('Invalid origin');
        return;
    }
    
    const sanitizedArgs = JSON.parse(JSON.stringify(args));
    window.postMessage({
        type: event,
        details: sanitizedArgs,
        source: 'RoGold'
    }, window.location.origin);
};

const requests = [];
let isListenerInitialized = false;

const scheduleRequest = (event, callback) => {
    if (typeof event !== 'string' || typeof callback !== 'function') {
        console.error('Invalid parameters');
        return;
    }

    requests.push({
        action: event,
        callback: (args) => {
            try {
                callback(args);
            } catch (error) {
                console.error('Callback execution error:', error);
            }
        }
    });

    if (!isListenerInitialized) {
        isListenerInitialized = true;
        window.addEventListener('message', ({ data, origin, source }) => {
            if (origin !== window.location.origin || source !== window) {
                return;
            }

            if (data?.type === 'request' && typeof data.details === 'object') {
                const { action, args } = data.details;
                
                if (typeof action !== 'string') {
                    console.error('Invalid action type');
                    return;
                }

                const handlers = requests.filter(o => o?.action === action);
                handlers.forEach(handler => {
                    if (handler?.callback) {
                        try {
                            handler.callback(args);
                        } catch (error) {
                            console.error('Handler execution error:', error);
                        }
                    }
                });
            }
        });
    }
};

const handleMap = async (event) => {
    try {
        if (!event?.action || typeof event.action !== 'string') {
            throw new Error('Invalid event format');
        }

        const handler = savedMap.get(event.action);
        if (typeof handler !== 'function') {
            throw new Error('Handler not found');
        }

        let result = handler(event.args);
        if (result instanceof Promise) {
            result = await result;
        }

        sendResponse('SendGlobalResponse', {
            eventName: event.action,
            args: result
        });
    } catch (error) {
        console.error('Handle map error:', error);
        sendResponse('SendGlobalResponse', {
            eventName: event.action,
            error: 'Operation failed'
        });
    }
};

const addFunction = (name, func) => {
    if (typeof name !== 'string' || typeof func !== 'function') {
        console.error('Invalid parameters for addFunction');
        return;
    }

    savedMap.set(name, func);
    
    const queued = savedObject[name];
    if (Array.isArray(queued) && queued.length > 0) {
        queued.forEach(o => {
            if (o && typeof o === 'object') {
                handleMap(o).catch(console.error);
            }
        });
    }
    delete savedObject[name];
};

scheduleRequest('ChromeRequest', (e) => {
    if (!e || typeof e !== 'object') {
        console.error('Invalid request format');
        return;
    }

    if (savedMap.has(e.action)) {
        handleMap(e).catch(console.error);
    } else {
        if (!savedObject[e.action]) {
            savedObject[e.action] = [];
        }
        savedObject[e.action].push(e);
    }
});

function onSet(object, property, after) {
    if (!object || typeof object !== 'object') {
        return Promise.reject(new Error('Invalid object'));
    }

    return new Promise((resolve, reject) => {
        try {
            if (!after && object[property]) {
                return resolve(object[property]);
            }

            const descriptor = Object.getOwnPropertyDescriptor(object, property);
            if (descriptor && !descriptor.configurable) {
                return reject(new Error('Property not configurable'));
            }

            Object.defineProperty(object, property, {
                enumerable: false,
                configurable: true,
                set(value) {
                    delete object[property];
                    object[property] = value;
                    resolve(value);
                }
            });
        } catch (error) {
            reject(error);
        }
    });
}

async function getGlobals(object, array) {
    if (!Array.isArray(array) || !object) {
        throw new Error('Invalid parameters for getGlobals');
    }

    const globals = array.map(name => 
        typeof name === 'string' 
            ? onSet(object, name)
                .then(info => [name, info])
                .catch(error => {
                    console.error(`Failed to get global ${name}:`, error);
                    return [name, null];
                })
            : Promise.resolve([null, null])
    );

    return Object.fromEntries(await Promise.all(globals));
}

const accessoryAssetTypeIds = [
    // Hat
    8,
    // Hair Accessory
    41,
    // Face Accessory
    42,
    // Neck Accessory
    43,
    // Shoulder Accessory
    44,
    // Front Accessory
    45,
    // Back Accessory
    46,
    // Waist Accessory
    47
];

const method = async (e) => {
    addFunction('Avatar.OverrideAssetTypeRestrictions', () => {
        onSet(e.Roblox, 'AvatarAccoutrementService').then((service) => {
            const originalAddAssetToAvatar = service.addAssetToAvatar;
            service.addAssetToAvatar = (asset, assets, clear) => {
                const original = originalAddAssetToAvatar(asset, assets, clear);

                let accesssoriesLeft = 10;
                const result = [asset, ...assets].filter((item) => {
                    if (item.assetType?.id && accessoryAssetTypeIds.includes(item.assetType.id)) {
                        if (accesssoriesLeft <= 0) {
                            return false;
                        }

                        accesssoriesLeft--;
                        return true;
                    }

                    return original.includes(item);
                });

                return result;
            };
        });
    });
};
(async () => {
    getGlobals(window, ['Roblox', 'angular'])
        .then(dependencies => method(dependencies))
        .catch(err => console.error(err));
})();