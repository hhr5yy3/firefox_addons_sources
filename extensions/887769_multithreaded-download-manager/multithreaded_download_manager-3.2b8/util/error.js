export class ExtendableError extends Error {
    constructor(message) {
        super(message);
        this.name = new.target.name;
    }
}
export class AssertionError extends ExtendableError {
    constructor(message = 'assertion failed') { super(message); }
}
export function assert(condition, message) {
    if (!condition)
        throw new AssertionError(message);
}
export function unreachable() {
    throw assert(false, "unreachable() called");
}
export function abortError() {
    return new DOMException("The operation was aborted. ", "AbortError");
}
export function readOnlyError() {
    return new DOMException("A mutation operation was attempted in a READ_ONLY transaction.", "ReadOnlyError");
}
export function isError(o) {
    return o && typeof o.name === 'string' && typeof o.message === 'string' &&
        (o.stack === undefined || typeof o.stack === 'string');
}
export function isAbortError(error) {
    return error && error.constructor.name === 'DOMException' &&
        error.name === 'AbortError';
}
export class ReportedError extends ExtendableError {
    constructor(message, detail) {
        super(message);
        this.detail = detail;
    }
    static convert(error, defaultMessage) {
        if (error.name === this.name)
            return error;
        return new this(defaultMessage, error);
    }
    get fullMessage() {
        const msg2 = isError(this.detail) ? this.detail.message : this.detail;
        return this.detail === undefined ? this.message : `${this.message}: ${msg2}`;
    }
}
