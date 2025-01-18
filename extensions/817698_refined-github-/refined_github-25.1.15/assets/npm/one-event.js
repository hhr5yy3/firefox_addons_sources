async function oneEvent(target, type, options = {}) {
    const { filter, ...nativeOptions } = options;
    return new Promise((resolve, reject) => {
        const options = { ...nativeOptions, once: !filter };
        const callback = filter ? (event) => {
            if (filter(event)) {
                resolve(event);
                target.removeEventListener(type, callback, options);
            }
        } : resolve;
        target.addEventListener(type, callback, options);
        options.signal?.addEventListener('abort', () => {
            reject(options.signal.reason);
        }, { once: true });
    });
}

export { oneEvent as default };
