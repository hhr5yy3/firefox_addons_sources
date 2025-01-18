/**
 * NB: This code is copied from /js/utils/webgl.js file
 */
/**
 * The MEGAException interface represents an abnormal event (called an exception) that occurs
 * as a result of calling a method or accessing a property of a Web API.
 * It does extends DOMException adding a stack trace record and a weak reference to some data.
 * @param {Error|String} ex description associated with the given error name.
 * @param {*} [data] arbitrary data to pass through the event.
 * @param {String} [name] A standard DOMException error name.
 */
class MEGAException extends DOMException {
    constructor(ex, data = null, name = 'InvalidStateError') {
        let stack;
        if (ex instanceof Error) {
            stack = ex.stack;
            ex = ex.message || ex;
        }
        if (data && typeof data === 'string' && /^[A-Z].*Error$/.test(data)) {
            name = data;
            data = null;
        }
        super(ex, name);

        if (data !== null) {
            if (typeof data === 'object') {
                const ref = new WeakRef(data);
                Object.defineProperty(this, 'data', {
                    get() {
                        return ref.deref();
                    }
                });
            }
            else {
                Object.defineProperty(this, 'data', {value: data});
            }
        }

        if (!stack) {
            stack = new Error(ex).stack;

            if (stack && typeof stack === 'string') {
                stack = stack.replace('Error:', `${name}:`)
                    .split('\n')
                    .filter(MEGAException.stackFilter)
                    .join('\n');
            }
        }

        Object.defineProperty(this, 'stack', {
            configurable: true,
            value: String(stack || '')
        });
    }

    toString() {
        return `${this.name}: ${this.message}`;
    }

    valueOf() {
        const {stack, name} = this;
        return stack.startsWith(name) ? stack : `${this.toString()}\n${stack}`;
    }

    get [Symbol.toStringTag]() {
        return 'MEGAException';
    }
}

Object.defineProperty(MEGAException, 'assert', {
    value: function assert(expr, msg, ...args) {
        if (!expr) {
            throw new MEGAException(msg || 'Failed assertion.', ...args);
        }
    }
});

/** @property MEGAException.stackFilter */
lazy(MEGAException, 'stackFilter', () => {
    'use strict';
    const assert = self.ua && ua.details && ua.details.engine === 'Gecko' ? 'assert@' : 'assert ';

    return (ln) => !ln.includes('MEGAException') && !ln.includes(assert);
});
