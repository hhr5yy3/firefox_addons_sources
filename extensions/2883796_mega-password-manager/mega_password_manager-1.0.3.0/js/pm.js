mega.pm = {

    activePlan: false,

    async start() {
        'use strict';

        // To avoid service worker start twice when message are received simultaneously
        mega.pm.started = true;

        // Wait for storage to be ready
        if (!storageReady) {
            return new Promise(resolve => {
                mBroadcaster.addListener('storageReady', () => mega.pm.start().then(resolve));
            });
        }

        tryCatch(() => {
            ua = Object(ua);
            ua.details = Object.create(browserdetails(ua));
        })();

        if (!u_sid) {
            mega.pm.started = false;
            return;
        }

        u_storage = init_storage(localStorage);
        api.setSID(u_sid);
        if (localStorage.selectedHandle) {
            delete localStorage.selectedHandle;
        }

        // We need to send ug request everytime on startup to check if the user
        // has an active or blocked account
        const {result} = await api.req({a: 'ug'}).catch(echo);

        if (typeof result !== 'object') {
            return;
        }

        if (!u_attr) {
            await u_checklogin3a(result, {
                checkloginresult: (u_ctx, r) => {
                    u_type = r;
                    u_checked = true;

                    if (popupOpen) {
                        chrome.runtime.sendMessage({type: 'u_attr', u_attr});
                    }
                }
            });
        }
        else {
            u_attr.features = result.features;

            if (popupOpen) {
                chrome.runtime.sendMessage({type: 'u_attr', u_attr});
            }
        }

        if (publicTLDs.size === 0) {
            await mega.pm.loadTLDs;
        }

        // setup pmdb
        if (!pmReady) {
            if (u_k && u_handle) {

                fmdb = pmdb = FMDB(u_handle, {
                    f: '&h, p, s, c, t, fa',
                    _sn: '&i',
                    mk: '&h',
                    ua: '&k'
                });

                if (d) {
                    console.time('get-tree(f:db)');
                }

                pmdb.init()
                    .catch(dump)
                    .then(res => {

                        if (typeof res === 'string' && res.length === 11) {
                            setsn(currsn = res);
                        }
                        else {
                            mega.pm.loadVault.fromApi = true;
                        }

                        M.syncUsersFullname(u_handle);

                        pmReady = true;
                        mBroadcaster.sendMessage('pmReady');
                    })
                    .catch((ex) => {
                        console.error(ex);
                    });

                if (d) {
                    // api.webLockSummary();
                    console.timeEnd('get-tree(f:db)');
                }
            }
        }
    },

    /**
     * Load the vault.
     *
     * @returns {Boolean | Number | void}
     */
    async loadVault() {
        "use strict";

        const vaultPasswords = [];

        if (!pwmh) {

            pwmh = await api.req({a: "uga", u: u_attr.u, ua: "pwmh", v: 1}).catch(echo);

            if (pwmh === -9) {
                const n = {};
                const attr = ab_to_base64(crypto_makeattr(n));
                const key = a32_to_base64(encrypt_key(u_k_aes, n.k));

                pwmh = await api.req({a: "pwmp", k: key, at: attr}).catch(echo);

                if (typeof pwmh === 'object') {
                    window.pwmh = pwmh = pwmh.result.h;
                }
            }
            else if (typeof pwmh === 'object') {
                pwmh = pwmh.result.av;
            }
            localStorage.pwmh = pwmh;
        }

        // If it's still not getting pwmh, this mean something really went wrong
        if (typeof pwmh === 'number') {
            return pwmh;
        }

        // re/initialize workers (with state for a user account fetch, if applies)
        if (!decWorkerPool.ok) {
            initworkerpool();
        }

        if (Object.keys(M.d).length === 0) {
            if (mega.pm.loadVault.fromApi) {
                const {result} = await api.req({a: "f", n: pwmh, part: 1}, {channel: 4, dedup: false}).catch(echo);

                if (!result) {
                    return;
                }

                localStorage.sn = currsn = result.sn;

                delete mega.pm.loadVault.fromApi;
            }
            else {

                const _emplace = (nodes) => {
                    for (let i = nodes.length; i--;) {
                        emplacenode(nodes[i]);
                    }
                };

                let res = await fmdb.getbykey('f', 'h', ['s', ['-3']]);

                _emplace(res);

                res = await fmdb.getbykey('f', 'h', ['p', [M.RootID, pwmh]]);

                _emplace(res);
            }

            pminitialized = true;
            mBroadcaster.sendMessage('pminitialized');
        }

        for (const n of Object.values(M.d)) {
            if (n.pwm) {
                vaultPasswords.push(n);
            }
        }

        return vaultPasswords;
    },

    createItem(n, name, target) {
        "use strict";

        if (!n || !name || !target) {
            return;
        }

        return new Promise((resolve, reject) => {

            var inflight = M.ciInflight;

            if (!inflight[target]) {
                inflight[target] = Object.create(null);
            }
            if (!inflight[target][name]) {
                inflight[target][name] = [];
            }

            if (inflight[target][name].push([resolve, reject]) > 1) {
                if (d) {
                    console.debug('deduplicated folder creation attempt on %s for "%s"...', target, name);
                }
                return;
            }

            var _dispatch = function(idx, result) {
                var queue = inflight[target][name];

                delete inflight[target][name];
                if (!Object.keys(inflight[target]).length) {
                    delete inflight[target];
                }

                for (var i = 0; i < queue.length; i++) {
                    queue[i][idx](result);
                }
            };

            reject = _dispatch.bind(null, 1);
            resolve = _dispatch.bind(null, 0);

            var attr = ab_to_base64(crypto_makeattr(n));
            var key = a32_to_base64(encrypt_key(u_k_aes, n.k));
            var req = {a: 'p', t: target, n: [{h: 'xxxxxxxx', t: 1, a: attr, k: key}], i: requesti, vw: 1};

            api.screq(req)
                .then(({handle}) => resolve(handle))
                .catch(reject);
        });
    },

    updateItem(newItem, handle) {
        "use strict";

        if (!newItem || !newItem.name || !handle) {
            return;
        }

        return new Promise((resolve, reject) => {
            const node = M.getNodeByHandle(handle);

            if (node && typeof newItem === 'object') {
                const {name, n, pwd, u, url} = newItem;
                const {n: oldNotes, pwd: oldPwd, u: oldUname, url: oldUrl} = node.pwm;
                const oldName = node.name;

                if (oldName !== name || oldNotes !== n || oldPwd !== pwd || oldUname !== u || oldUrl !== url) {
                    const prop = {name, pwm: {n, pwd, u, url}};

                    resolve(api.setNodeAttributes(node, prop));
                }
                else {
                    reject();
                }
            }
        });
    },

    async deleteItem(handles) {
        'use strict';
        return Promise.all(handles.map(n => api.screq({a: 'd', n, vw: 1})));
    },

    iconTheme: '',

    async setIcon() {

        'use strict';

        const iconFolder = u_sid ? 'enabled' : 'disabled';
        const iconTheme = this.iconTheme || 'light';
        const path = `images/icons/${iconFolder}/${iconTheme}`;

        if (path === mega.pm.iconPath) {
            return;
        }

        chrome.action.setIcon({
            path: {
                "16": `images/icons/${iconFolder}/${iconTheme}/MEGA_PWM_16.png`,
                "32": `images/icons/${iconFolder}/${iconTheme}/MEGA_PWM_32.png`,
                "48": `images/icons/${iconFolder}/${iconTheme}/MEGA_PWM_48.png`,
                "64": `images/icons/${iconFolder}/${iconTheme}/MEGA_PWM_64.png`,
                "128": `images/icons/${iconFolder}/${iconTheme}/MEGA_PWM_128.png`,
                "192": `images/icons/${iconFolder}/${iconTheme}/MEGA_PWM_192.png`,
                "512": `images/icons/${iconFolder}/${iconTheme}/MEGA_PWM_512.png`
            }
        });

        mega.pm.iconPath = path;
    },

    /**
     * Check if the user has an active pwm subscription.
     * Subscription cancellation takes effect only after the current subscription period ends.
     *
     * @returns {boolean} True if the user has an active subscription, false otherwise.
     */
    async checkActiveSubscription() {
        'use strict';

        // return true if the Business or Pro flexi account has expired because
        // they can login as asusual and will have read-only access to the passwords
        if (!validateUserStatus(true)) {
            return true;
        }

        const plan = await this.getPlanDetails();

        const _dropDB = () => {
            if (pmdb && !pmdb.dropping) {
                pmdb.dropping = true;
                // drop the db
                pmdb.drop();
            }
        };

        if (typeof plan === 'object') {
            _dropDB();

            if (!plan.trial) {
                // if trial is already used up, return the plan number
                chrome.runtime.sendMessage({type: 'show-feature-plan'});
                return this.activePlan;
            }

            // if the user has a trial plan then return it
            chrome.runtime.sendMessage({type: 'show-free-trial'});
            return this.activePlan;
        }
        // users whose country is not eligible for Password Manager
        else if (typeof plan === 'undefined') {
            _dropDB();
            u_logout(1);

            return this.activePlan;
        }
        else if (!plan) {
            _dropDB();

            // users whose plan got expired
            chrome.runtime.sendMessage({type: 'show-feature-plan'});
            return this.activePlan;
        }

        const expiryTimeOut = Math.max(this.activePlan[0] - Date.now() / 1000, 0); // convert to seconds;

        // set the timer only if the expiry time is less than or equal to 3 days
        if (expiryTimeOut <= 3 * 24 * 60 * 60) {
            tSleep(expiryTimeOut).then(async() => {
                if (popupOpen) {
                    await M.getAccountDetails();
                    this.checkActiveSubscription();
                }
            }).catch(dump);
        }

        return true;
    },

    /**
     * Get current plan details or plan eligibility for the user
     *
     * @returns {boolean|object|void} Return true if user has an active subscription or
     * Object if the plan details available or undefined for countries not supporting Password Manager
     */
    async getPlanDetails() {
        'use strict';

        this.activePlan = u_attr.features && u_attr.features.find(elem => elem[1] === 'pwm') || false;

        // check for the active subscription status
        if (this.activePlan && this.activePlan[0] > Date.now() / 1000) {
            return true;
        }

        // if the Feature PWM is not available then get plans and check the free trial/feature plan eligibility
        const {result} = await api.req({a: 'utqa', nf: 2, ft: 1}).catch(dump);

        for (let i = result.length; i--;) {
            if (result[i].f && result[i].f.pwm === 1) {
                return result[i];
            }
        }
    }
};

lazy(mega.pm, 'loadTLDs', () => {

    'use strict';

    return (async() => {
        if (publicTLDs.size === 0) {
            let tmp, db;

            if (typeof Dexie !== 'undefined') {
                db = new Dexie('$tldl1');
                db.version(1).stores({kv: '&k'});
                const r = await db.kv.get('l').catch(dump);
                tmp = r && Date.now() < r.t + 864e6 && r.v;
            }

            tmp = tmp || await api.req({a: 'tldl'})
                .then(({result}) => {
                    assert(Array.isArray(result) && result.length, `Invalid API reply for tldl`);
                    if (db) {
                        db.kv.put({k: 'l', t: Date.now(), v: result});
                    }
                    return result;
                });

            publicTLDs = new Set(tmp);
        }
    })();
});
