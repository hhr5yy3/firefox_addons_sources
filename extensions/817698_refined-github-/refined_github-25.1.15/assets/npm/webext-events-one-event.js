async function oneEvent(event, { filter, signal, } = {}) {
    if (signal?.aborted) {
        return;
    }
    await new Promise(resolve => {
        const listener = (...parameters) => {
            if (!filter || filter(...parameters)) {
                resolve();
                event.removeListener(listener);
            }
        };
        event.addListener(listener);
        signal?.addEventListener('abort', () => {
            resolve();
            event.removeListener(listener);
        });
    });
}

export { oneEvent };
