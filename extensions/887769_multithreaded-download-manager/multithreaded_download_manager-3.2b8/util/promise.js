export class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.reject = reject;
            this.resolve = resolve;
        });
    }
}
export class CriticalSection {
    constructor() {
        this.promise = Promise.resolve();
    }
    sync(fn) {
        const result = this.promise.then(fn);
        this.promise = result.then(() => { }, () => { });
        return result;
    }
}
export class Timer {
    constructor(onTimer, defaultInterval = 0, allowConcurrent = false) {
        this.onTimer = onTimer;
        this.defaultInterval = defaultInterval;
        this.allowConcurrent = allowConcurrent;
        this.concurrentCount = 0;
    }
    start(interval = this.defaultInterval) {
        this.stop();
        const id = setInterval(() => {
            if (this.id === id)
                this.dispatch();
        }, interval);
        this.id = id;
    }
    startOnce(interval = this.defaultInterval) {
        this.stop();
        const id = setTimeout(() => {
            if (this.id !== id)
                return;
            this.id = undefined;
            this.dispatch();
        }, interval);
        this.id = id;
    }
    stop() {
        if (this.id === undefined)
            return;
        clearInterval(this.id); // clearTimeout, clearInterval are interchangeable
        this.id = undefined;
    }
    get isStarted() { return this.id !== undefined; }
    async dispatch() {
        if (!this.allowConcurrent && this.concurrentCount)
            return;
        this.concurrentCount++;
        try {
            await this.onTimer();
        }
        finally {
            this.concurrentCount--;
        }
    }
}
