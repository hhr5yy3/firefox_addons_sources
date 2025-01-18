/*
 * Very rough MegaPromise polyfill using native Promises, as jQuery is not available in Service Worker.
 * This is currently only merely working as expected. May need further enhancements.
 */
class MegaPromise {
    constructor(executor) {

        this.resolve = (...arg) => {
            if (this._isAll) {
                arg = [arg.flat(2)];
            }

            this._state = 'resolved';
            this._internalResolve(arg);
            return this;
        };
        this.reject = (...arg) => {
            this._state = 'rejected';
            if (!this._catchCount && this.promise) {
                this.promise.catch(nop);
            }
            this._internalReject(arg);
            return this;
        };

        this.promise = new Promise((resolve, reject) => {

            this._internalResolve = resolve;
            this._internalReject = reject;

            if (executor) {
                try {
                    executor(this.resolve, this.reject);
                }
                catch (ex) {
                    this.reject(ex);
                }
            }
        });

        MegaPromise.initDebuggingFeatures(this);

        this._catchCount = 0;
        this._state = 'pending';
        this.done = this.then;
        this.fail = this.catch;
        this.always = (v) => {
            this.then(v, v);
            return this;
        };
        this.finally = this.wait;
        this.dump = this.dumpToConsole;
    }

    static initDebuggingFeatures(promiseInstance) {
        if (MegaPromise.debugPendingPromisesTimeout > 0) {
            setTimeout(() => {
                if (promiseInstance.state() === 'pending') {
                    console.error("Pending promise found: ", promiseInstance);
                }
            }, MegaPromise.debugPendingPromisesTimeout);
        }
    }

    static all(promises) {
        var _promisesList = promises.map(p => {
            if (p instanceof MegaPromise) {
                return p.promise;
            }
            return p;
        });

        var promise = new MegaPromise();

        Promise.all(_promisesList)
            .then(promise.resolve)
            .catch(MegaPromise.getTraceableReject(promise));

        promise._isAll = _promisesList.length;

        return promise;
    }

    static allDone(promises, timeout) {

        if (promises.length === 0) {
            return MegaPromise.resolve();
        }
        var masterPromise = new MegaPromise();
        var totalLeft = promises.length;
        var results = [];
        results.__unpack$$$ = 1;

        var alwaysCb = function() {
            results.push(toArray.apply(null, arguments));

            if (--totalLeft === 0) {
                masterPromise.resolve(results);
            }
        };

        for (var i = promises.length; i--;) {
            var v = promises[i];

            if (!(v instanceof MegaPromise)) {
                v = MegaPromise.asMegaPromiseProxy(v);
            }

            if (v instanceof MegaPromise) {
                v.done(alwaysCb);
                v.fail(alwaysCb);
            }
            else {
                if (d) {
                    console.warn('non-promise provided...', v);
                }
                alwaysCb(v);
            }
        }

        if (timeout) {
            var timeoutTimer = setTimeout(() => {
                masterPromise.reject(promise);
            }, timeout);

            masterPromise.always(() => {
                clearTimeout(timeoutTimer);
            });
        }
        return masterPromise;
    }

    static resolve() {
        var p = new MegaPromise();
        p.resolve.apply(p, arguments);

        return p;
    }

    static reject() {
        var p = new MegaPromise();
        p.reject.apply(p, arguments);

        return p;
    }

    static getTraceableReject(promise, origPromise) {
        // Save the current stack pointer in case of an async call behind
        // the promise.reject (Ie, onAPIProcXHRLoad shown as initial call)
        const debug = window.d > 3;
        const preStack = debug && M.getStack();

        return function __mpTraceableReject(aResult) {
            if (debug) {
                var postStack = M.getStack();
                if (typeof console.group === 'function') {
                    console.group('PROMISE REJECTED');
                }
                console.debug('Promise rejected: ', aResult, origPromise);
                console.debug('pre-Stack', preStack);
                console.debug('post-Stack', postStack);
                if (typeof console.groupEnd === 'function') {
                    console.groupEnd();
                }
            }
            try {
                if (typeof promise === 'function') {
                    promise.apply(origPromise, arguments);
                }
                else {
                    promise.reject.apply(promise, arguments);
                }
            }
            catch (ex) {
                console.error('Unexpected promise error: ', ex, preStack);
            }
        };
    }

    static asMegaPromiseProxy(p) {
        var promise = new MegaPromise();

        p.then(
            function megaPromiseResProxy() {
                promise.resolve.apply(promise, arguments);
            },
            MegaPromise.getTraceableReject(promise, p));

        return promise;
    }

    then(onfurfill, onreject) {
        this.promise.then((v) => {
            v = Array.isArray(v) ? v : [v];
            onfurfill && onfurfill.apply(null, v);
        }, (ex) => {
            ex = Array.isArray(ex) ? ex : [ex];
            if (this.passthrough) {
                onfurfill && onfurfill.apply(null, ex);
            }
            else if (onreject) {
                onreject.apply(null, ex);
                this.passthrough = true;
            }
        });

        return this;
    }

    catch(onreject) {

        this._catchCount++;

        this.promise.catch(ex => {
            ex = Array.isArray(ex) ? ex : [ex];
            onreject.apply(null, ex);
        });

        return this;
    }

    unpack(callback) {

        this.always(([result]) => {
            if (result.__unpack$$$) {
                // flatten an n-dimensional array.
                for (var i = result.length; i--;) {
                    // pick the first argument for each member
                    result[i] = result[i][0];
                }
                result = Array.prototype.concat.apply([], result);
            }
            callback(result);
        });
        return this;
    }

    state() {
        return this._state;
    }

    tryCatch(resolve, reject) {
        reject = reject || function() { };
        return this.promise.then(window.tryCatch(resolve, reject)).catch(reject);
    }

    linkDoneTo(targetPromise) {
        targetPromise.then(() => {
            this.resolve.apply(self, arguments);
        });

        return this;
    }

    linkFailTo(targetPromise) {
        targetPromise.catch(() => {
            this.reject.apply(self, arguments);
        });

        return this;
    }

    linkDoneAndFailTo(targetPromise) {
        if (!(targetPromise instanceof Promise)) {
            targetPromise = Promise.resolve(targetPromise);
        }
        targetPromise.then(res => this.resolve(res))
            .catch(ex => {
                this.reject(ex);
            });

        return this;
    }

    linkDoneAndFailToResult(cb, context, args) {

        const ret = cb.apply(context, args);

        if (ret instanceof MegaPromise) {
            this.linkDoneTo(ret);
            this.linkFailTo(ret);
        }
        else {
            this.resolve(ret);
        }

        return this;
    }

    dumpToConsole(msg) {
        if (d) {
            this.then(
                function() {
                    console.log("success: ", msg ? msg : arguments, !msg ? null : arguments);
                }, function() {
                    console.error("error: ", msg ? msg : arguments, !msg ? null : arguments);
                }
            );
        }

        return this;
    }

    wait(callback) {
        this.always((...args) => {
            queueMicrotask(() => callback(...args));
        });
        return this;
    }

    fakeDelay(ms) {
        if (this._fakeDelayEnabled) {
            return;
        }

        var origResolve = this.resolve;
        var origReject = this.reject;
        this.resolve = () => {
            var args = arguments;
            setTimeout(function() {
                origResolve.apply(this, args);
            }, ms);

            return this;
        };
        this.reject = () => {
            var args = arguments;
            setTimeout(function() {
                origReject.apply(this, args);
            }, ms);

            return this;
        };

        this._fakeDelayEnabled = true;

        return this;
    }
}

MegaPromise.debugPendingPromisesTimeout = false;
MegaPromise.debugPreStack = false;
