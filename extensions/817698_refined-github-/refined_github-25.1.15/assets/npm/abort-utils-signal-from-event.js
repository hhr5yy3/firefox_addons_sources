function signalFromEvent(target, event, options) {
    const controller = new AbortController();
    target.addEventListener(event, controller.abort.bind(controller), {
        ...options,
        once: true,
    });
    return controller.signal;
}

export { signalFromEvent };
