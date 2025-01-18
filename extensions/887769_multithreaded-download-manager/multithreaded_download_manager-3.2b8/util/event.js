export class SimpleEventListener {
    constructor() {
        this.eventTarget = new EventTarget(); // requires Firefox 59+
    }
    listen(fn, type = SimpleEventListener.defaultType) {
        const handler = (event) => { fn(...event.detail); };
        const { eventTarget } = this;
        eventTarget.addEventListener(type, handler);
        return { destroy() { eventTarget.removeEventListener(type, handler); } };
    }
    dispatchWithType(type, ...args) {
        return this.eventTarget.dispatchEvent(new CustomEvent(type, { detail: args }));
    }
    dispatch(...args) {
        return this.dispatchWithType(SimpleEventListener.defaultType, ...args);
    }
}
SimpleEventListener.defaultType = 'event';
