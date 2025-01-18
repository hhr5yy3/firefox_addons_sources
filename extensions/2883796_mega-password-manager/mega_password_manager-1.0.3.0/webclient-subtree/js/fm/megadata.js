class MegaData {
    /**
     *  Reload the site cleaning databases & session/localStorage.
     *
     *  Under non-activated/registered accounts this
     *  will perform a former normal cloud reload.
     */
    reload(force) {
        const _reload = () => {
            var u_sid = u_storage.sid;
            var u_key = u_storage.k;
            var {privk} = u_storage;
            var debug = localStorage.d;
            var {lang} = localStorage;
            var apipath = debug && localStorage.apipath;
            var settings = localStorage.settings;

            localStorage.clear();

            if (u_sid) {
                u_storage.sid = u_sid;
                u_storage.privk = privk;
                u_storage.k = u_key;
                localStorage.wasloggedin = true;
            }

            if (debug && apipath) {
                // restore api path across reloads, only for debugging purposes...
                localStorage.apipath = apipath;
            }

            if (lang) {
                localStorage.lang = lang;
            }

            if (force) {
                localStorage.force = true;
            }

            localStorage.settings = settings;
            localStorage.reloaded = true;

            onIdle(() => chrome.runtime.reload());
        };

        const waitingPromises = [];

        waitsc.stop();
        api.stop();

        if (window.delay) {
            delay.abort();
        }

        if (window.pmdb) {
            waitingPromises.push(pmdb.invalidate());
        }

        Promise.allSettled(waitingPromises).then(dump).finally(_reload);
    }

    onPmReady(callback) {
        if (pmReady) {
            callback();
        }
        else {
            mBroadcaster.once('pmReady', () => {
                callback();
            });
        }
    }

    onPmInit(callback) {
        if (pminitialized) {
            callback();
        }
        else {
            mBroadcaster.once('pminitialized', () => {
                callback();
            });
        }
    }

    reset() {
        this.d = Object.create(null);
        this.c = Object.create(null);
    }

    /**
     *  Retrieve a call stack
     *  @return {String}
     */
    getStack() {
        return String(new Error('trace').stack);
    }

    /**
     * Get a node by handle
     * @param {String} handle Handle of the node to retrieve.
     * @returns {Object|void} returns the node if found
     */
    getNodeByHandle(handle) {
        return M.d[handle];
    }

    /**
     * Function to invoke when a node has been modified.
     * @param {Object|MegaNode} n The ufs-node that got updated.
     *
     * @returns {void}
     */
    nodeUpdated(n) {
        if (n.h && n.h.length === 8) {
            if (n.t && n.td === undefined) {
                // Either this is a newly created folder or it comes from a fresh gettree
                n.td = 0;
                n.tf = 0;
                n.tb = 0;
            }

            // sync missingkeys with this node's key status
            if (crypto_keyok(n)) {
                // mark as fixed if necessary
                if (missingkeys[n.h]) {
                    crypto_keyfixed(n.h);
                }
            }
            else if (n.k) {
                // always report missing keys as more shares may
                // now be affected
                crypto_reportmissingkey(n);
            }

            // store this node into IndexedDB
            if (fmdb) {
                fmdb.add('f', {
                    h: n.h,
                    p: n.p,
                    s: n.s >= 0 ? n.s : -n.t,
                    t: n.t ? 1262304e3 - n.ts : n.ts,
                    c: n.hash || '',
                    fa: n.fa || '',
                    d: n
                });
            }
        }
    }

    /**
     * Retrieve only the name of the logged-in user
     * as we don't have contacts in the extension
     *
     * @param {String} handle The handle
     * @return {String} the name, or an empty string if not found
     */
    getNameByHandle(handle) {
        let result = '';
        handle = String(handle);

        if (handle.length === 11) {
            const user = M.getUserByHandle(handle);

            // If user exists locally, use Nickname or FirstName LastName or fallback to email
            if (user) {
                result = user.fullname || user.name || user.m;
            }
        }

        return String(result);
    }

    /**
     * Retrieve only the logged-in user object by it's handle
     * as we don't have contacts in the extension
     * @param {String} handle The user's handle
     * @return {Object} The user object, or false if not found
     */
    getUserByHandle(handle) {
        let user = false;

        if (handle === u_handle) {
            user = u_attr;
        }
        else {
            console.warn(`Extension only supports logged-in user. ${handle} not found.`);
        }

        return user;
    }

    /**
     * Retrieve only the logged-in user object by it's handle or email
     * as we don't have contacts in the extension
     * @param {String} str An email or handle
     * @return {Object} The user object, or false if not found
     */
    getUser(str) {
        let user = false;

        if (typeof str !== 'string') {
            // Check if it's an user object already..

            if (Object(str).hasOwnProperty('u')) {
                // Yup, likely.. let's see
                user = M.getUserByHandle(str.u);
            }
        }
        else if (str.length === 11) {
            // It's an user handle
            user = M.getUserByHandle(str);
        }
        else if (str === u_attr.m) {
            // It's an email..
            user = u_attr;
        }

        return user;
    }

    /**
     * M.u user is replaced by logged in user attr as extension
     * only supports logged-in user.
     * @param {String} userId logged in user handle
     * @param {String} chatHandle chat handle
     * @returns
     */
    // eslint-disable-next-line complexity
    async syncUsersFullname(userId, chatHandle) {
        const user = u_attr;
        const {name} = user;

        if (user.firstname || user.lastname) {
            // already loaded.
            return name;
        }

        const attrs = await Promise.allSettled([
            mega.attr.get(userId, 'lastname', -1, false, undefined, undefined, chatHandle),
            mega.attr.get(userId, 'firstname', -1, false, undefined, undefined, chatHandle)
        ]);

        for (let i = attrs.length; i--;) {
            const obj = attrs[i];

            // -1, -9, -2, etc...
            if (typeof obj.value === 'string') {
                // eslint-disable-next-line local-rules/hints
                try {
                    obj.value = from8(base64urldecode(obj.value));
                }
                catch (ex) {
                    obj.value = null;
                }
            }

            if (typeof obj.value !== 'string' || !obj.value) {
                obj.value = '';
            }
        }

        user.name = "";
        user.lastname = attrs[0].value.trim();
        user.firstname = attrs[1].value.trim();

        if (user.firstname || user.lastname) {
            user.name = `${user.firstname}${user.firstname.length ? " " : ""}${user.lastname}`;
        }

        // only clear old avatar if the old one was a text one and was different than the new names
        if (user.avatar && user.avatar.type !== "image" && name !== user.name) {
            user.avatar = false;

            if (popupOpen) {
                const res = await generateAvatarMeta(userId);
                chrome.runtime.sendMessage({type: 'reloadAvatar', avatarMeta: res});
            }
        }
        else if (name !== user.name && popupOpen) {
            chrome.runtime.sendMessage({type: 'updateName', name: user.name});
        }

        if (userId === u_handle) {
            u_attr.firstname = user.firstname;
            u_attr.lastname = user.lastname;
            u_attr.name = user.name;
        }

        chrome.runtime.sendMessage({type: 'u_attr', u_attr});

        return user.name;
    }
}
