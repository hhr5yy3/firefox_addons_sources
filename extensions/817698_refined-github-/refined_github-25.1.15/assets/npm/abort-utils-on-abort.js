function addListeners(signal, handles) {
    for (const handle of handles) {
        const options = { once: true };
        if ('disconnect' in handle) {
            signal.addEventListener('abort', handle.disconnect.bind(handle), options);
        }
        else if ('abort' in handle) {
            signal.addEventListener('abort', handle.abort.bind(handle), options);
        }
        else if (typeof handle === 'function') {
            signal.addEventListener('abort', handle, options);
        }
        else {
            throw new TypeError('Invalid AbortSignal handle type');
        }
    }
}
function onAbort(
signal, ...handles) {
    if (!signal) {
        return;
    }
    const trueSignal = signal instanceof AbortController ? signal.signal : signal;
    if (trueSignal.aborted) {
        const controller = new AbortController();
        addListeners(controller.signal, handles);
        controller.abort(controller.signal.reason);
    }
    else {
        addListeners(trueSignal, handles);
    }
}

export { onAbort };
