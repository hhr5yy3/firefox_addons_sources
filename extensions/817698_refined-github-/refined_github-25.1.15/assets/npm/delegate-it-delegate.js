const ledger = new WeakMap();
function editLedger(wanted, baseElement, callback, setup) {
    if (!wanted && !ledger.has(baseElement)) {
        return false;
    }
    const elementMap = ledger.get(baseElement)
        ?? new WeakMap();
    ledger.set(baseElement, elementMap);
    const setups = elementMap.get(callback) ?? new Set();
    elementMap.set(callback, setups);
    const existed = setups.has(setup);
    if (wanted) {
        setups.add(setup);
    }
    else {
        setups.delete(setup);
    }
    return existed && wanted;
}
function safeClosest(event, selector) {
    let target = event.target;
    if (target instanceof Text) {
        target = target.parentElement;
    }
    if (target instanceof Element && event.currentTarget instanceof Element) {
        const closest = target.closest(selector);
        if (closest && event.currentTarget.contains(closest)) {
            return closest;
        }
    }
}
function delegate(selector, type, callback, options = {}) {
    const { signal, base = document } = options;
    if (signal?.aborted) {
        return;
    }
    const { once, ...nativeListenerOptions } = options;
    const baseElement = base instanceof Document ? base.documentElement : base;
    const capture = Boolean(typeof options === 'object' ? options.capture : options);
    const listenerFunction = (event) => {
        const delegateTarget = safeClosest(event, String(selector));
        if (delegateTarget) {
            const delegateEvent = Object.assign(event, { delegateTarget });
            callback.call(baseElement, delegateEvent);
            if (once) {
                baseElement.removeEventListener(type, listenerFunction, nativeListenerOptions);
                editLedger(false, baseElement, callback, setup);
            }
        }
    };
    const setup = JSON.stringify({ selector, type, capture });
    const isAlreadyListening = editLedger(true, baseElement, callback, setup);
    if (!isAlreadyListening) {
        baseElement.addEventListener(type, listenerFunction, nativeListenerOptions);
    }
    signal?.addEventListener('abort', () => {
        editLedger(false, baseElement, callback, setup);
    });
}

export { delegate as default };
