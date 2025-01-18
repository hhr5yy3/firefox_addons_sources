import delegate from './delegate-it-delegate.js';

async function oneEvent(selector, type, options = {}) {
    return new Promise(resolve => {
        options.once = true;
        if (options.signal?.aborted) {
            resolve(undefined);
        }
        options.signal?.addEventListener('abort', () => {
            resolve(undefined);
        });
        delegate(selector, type, resolve, options);
    });
}

export { oneEvent as default };
