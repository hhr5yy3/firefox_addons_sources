class Worker {

    constructor(scriptUrl) {

        this.scriptUrl = scriptUrl;
        this.onmessage = null;
        this.onerror = null;
        this.index = decWorkerPool.length;

        if (chrome.offscreen) {

            this.mode = 'offscreen';

            mega.offscreen.then(() => {

                chrome.runtime.sendMessage({
                    type: 'createWorker',
                    scriptUrl: this.scriptUrl,
                    index: this.index,
                    target: 'offscreen'
                });

                chrome.runtime.onMessage.addListener((message, sender) => {

                    // Reject all messages not coming from the extension
                    if (sender.id !== chrome.runtime.id) {
                        return false;
                    }

                    if (message.type === 'workerResult' && this.index === message.index && this.onmessage) {
                        this.onmessage(message);
                    }

                    if (message.type === 'workerError' && this.index === message.index && this.onerror) {
                        this.onerror(message);
                    }
                });
            });
        }
        else {
            this.mode = 'self';
            // eslint-disable-next-line strict
            this.init = ({d: debug, allowNullKeys, secureKeyMgr} = false) => {

                this.jobs = 0;
                d = !!debug;

                // Set global to allow all-0 keys to be used (for those users that set localStorage flag)
                if (allowNullKeys) {
                    self.allowNullKeys = allowNullKeys;
                }

                if (secureKeyMgr) {
                    // Inherits from parent 'mega.keyMgr.secure && mega.keyMgr.generation'
                    self.secureKeyMgr = secureKeyMgr;
                }
            };

            this.init();
        }
    }

    async postMessage(message) {
        if (this.mode === 'offscreen') {
            if (await mega.offscreen) {
                chrome.runtime.sendMessage({
                    type: 'workerPostMessage',
                    data: message,
                    index: this.index,
                    target: 'offscreen'
                });
            }
        }
        else if (this.mode === 'self') {
            tryCatch(() => {
                const req = message;
                this.jobs++;

                if (req.scqi >= 0) {
                    // actionpacket - we do CPU-intensive stuff here, e.g. decrypting share-keys
                    if ((req.a === 's' || req.a === 's2') && req.n && req.k) {
                        const k = crypto_process_sharekey(req.n, req.k);

                        if (k === false) {
                            console.warn(`Failed to decrypt RSA share key for ${req.n}: ${req.k}`);
                        }
                        else if (crypto_setsharekey2(req.n, k)) {
                            req.k = k;
                        }
                    }
                    this.onmessage({data: req});
                }
                else if (req.t >= 0) {
                    // node
                    crypto_decryptnode(req);
                    this.onmessage({data: req});
                }
                else if (req.sk) {
                    // existing sharekey
                    crypto_setsharekey2(req.h, req.sk);
                }
                else if (req.ha) {
                    // ownerkey (ok element)
                    let ok = false;
                    if (crypto_handleauthcheck(req.h, req.ha)) {
                        if (d) {
                            console.log(`Successfully decrypted sharekeys for ${req.h}`);
                        }
                        const key = decrypt_key(u_k_aes, base64_to_a32(req.k));
                        ok = crypto_setsharekey2(req.h, key);
                    }
                    if (!ok && d) {
                        console.warn(`handleauthcheck failed for ${req.h}`);
                    }
                }
                else if (req.u_k) {
                    // setup for user account
                    this.init(req);

                    usk = req.usk;
                    u_handle = req.u_handle;
                    u_privk = req.u_privk;
                    u_k_aes = new sjcl.cipher.aes(req.u_k);
                }
                else if (req.n_h) {
                    // setup folder link
                    this.init(req);

                    const key = base64_to_a32(req.pfkey);
                    crypto_setsharekey2(req.n_h, key);
                }
                else if (req.assign) {
                    delete req.assign;
                    Object.assign(self, req);

                    if (d) {
                        console.debug('dec.worker: assign request.', JSON.stringify(req));
                    }
                }
                else {
                    // unfortunately, we have to discard the SJCL AES cipher
                    // because it does not fit in a worker message
                    const sharekeys = Object.create(null);
                    for (const h in u_sharekeys) {
                        sharekeys[h] = u_sharekeys[h][0];
                    }
                    this.jobs--;

                    // done - post state back to main thread
                    this.onmessage({data: {done: 1, jobs: this.jobs, sharekeys}});
                    this.init(self);
                }
            }, this.onerror)();
        }
    }

    async terminate() {
        if (this.mode === 'offscreen') {
            chrome.runtime.sendMessage({type: 'terminateWorker', index: this.index, target: 'offscreen'});
            if (!decWorkerPool.length) {
                chrome.offscreen.closeDocument();
            }
        }
    }
}
