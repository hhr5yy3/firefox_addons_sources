MegaData.prototype.accountData = function(cb, blockui, force) {
    "use strict";

    const account = Object(this.account);
    let reuseData = account.lastupdate > Date.now() - 10000 && !force;

    if (reuseData && (!account.stats || !account.stats[M.RootID])) {
        if (d) {
            console.error('Track down how we get here...', M.RootID, account.stats && Object.keys(account.stats));
        }
        reuseData = false;
    }

    if (reuseData && cb) {
        return cb(account);
    }

    const promises = [];
    const mRootID = M.RootID;
    const pstatus = Object(window.u_attr).p;

    const sendAPIRequest = (payload, always, handler) => {
        if (typeof always === 'function') {
            handler = always;
            always = false;
        }
        const promise = api.req(payload)
            .then(({result}) => {
                return handler(result);
            })
            .catch((ex) => {
                if (always) {
                    return handler(ex);
                }
                throw ex;
            });
        const slot = promises.push(promise) - 1;

        Object.defineProperty(promises, `<${slot}>`, {value: payload.a});
    };

    if (d) {
        if (!window.fminitialized) {
            console.warn('You should not use this function outside the fm...');
        }
        console.assert(mRootID, 'I told you...');
    }

    if (blockui) {
        loadingDialog.show();
    }

    // Fetch extra storage/transfer base data Pro Flexi or Business master
    const b = typeof u_attr !== 'undefined' && (u_attr.pf || u_attr.b && u_attr.b.m) ? 1 : 0;

    /** DO NOT place any sendAPIRequest() call before, this 'uq' MUST BE the FIRST one */

    sendAPIRequest({a: 'uq', strg: 1, xfer: 1, pro: 1, v: 2, b}, (res) => {
        Object.assign(account, res);

        account.type = res.utype;
        // account.stime = res.scycle;
        // account.scycle = res.snext;
        account.expiry = res.suntil;
        account.space = Math.round(res.mstrg);
        account.space_used = Math.round(res.cstrg);
        account.bw = Math.round(res.mxfer);
        account.servbw_used = Math.round(res.csxfer);
        account.downbw_used = Math.round(res.caxfer);
        account.servbw_limit = Math.round(res.srvratio);
        account.isFull = res.cstrg / res.mstrg >= 1;
        account.isAlmostFull = res.cstrg / res.mstrg >= res.uslw / 10000;

        // Business base/extra quotas:
        if (u_attr.p === pro.ACCOUNT_LEVEL_BUSINESS || u_attr.p === pro.ACCOUNT_LEVEL_PRO_FLEXI) {
            account.space_bus_base = res.b ? res.b.bstrg : undefined; // unit TB
            account.space_bus_ext = res.b ? res.b.estrg : undefined; // unit TB
            account.tfsq_bus_base = res.b ? res.b.bxfer : undefined; // unit TB
            account.tfsq_bus_ext = res.b ? res.b.exfer : undefined; // unit TB
            account.tfsq_bus_used = res.b ? res.b.xfer : undefined; // unit B
            account.space_bus_used = res.b ? res.b.strg : undefined; // unit B
        }

        if (res.nextplan) {
            account.nextplan = res.nextplan;
        }

        if (res.mxfer === undefined) {
            delete account.mxfer;
        }

        // If a subscription, get the timestamp it will be renewed
        if (res.stype === 'S') {
            account.srenew = res.srenew;
        }

        if (!Object(res.balance).length || !res.balance[0]) {
            account.balance = [['0.00', 'EUR']];
        }

        return res;
    });

    sendAPIRequest({a: 'uavl'}, true, (res) => {
        if (!Array.isArray(res)) {
            res = [];
        }
        account.vouchers = voucherData(res);
    });

    sendAPIRequest({a: 'maf', v: mega.achievem.RWDLVL}, (res) => {

        account.maf = res;
    });

    if (!is_chatlink) {

        sendAPIRequest({a: 'uga', u: u_handle, ua: '^!rubbishtime', v: 1}, (res) => {

            account.ssrs = base64urldecode(String(res.av || res)) | 0;
        });
    }

    sendAPIRequest({a: 'utt'}, true, (res) => {
        if (!Array.isArray(res)) {
            res = [];
        }
        account.transactions = res;
    });

    // getting contact link [QR]
    // api_req : a=clc     contact link create api method
    //           f=1       a flag to tell the api to create a new link if it doesnt exist.
    //                     but if a previous link was deleted, then dont return any thing (empty)
    sendAPIRequest({a: 'clc', f: 1}, ([, res]) => {

        account.contactLink = typeof res === 'string' ? `C!${res}` : '';
    });

    // Get (f)ull payment history
    // [[payment id, timestamp, price paid, currency, payment gateway id, payment plan id, num of months purchased]]
    sendAPIRequest({a: 'utp', f: 3, v: 2}, true, (res) => {
        if (!Array.isArray(res)) {
            res = [];
        }
        account.purchases = res;
    });

    /* x: 1, load the session ids
     useful to expire the session from the session manager */
    sendAPIRequest({a: 'usl', x: 1}, true, (res) => {
        if (!Array.isArray(res)) {
            res = [];
        }
        account.sessions = res;
    });


    /**
     * DO NOT place any sendAPIRequest() call AFTER, this 'ug' MUST BE the LAST one!
     */
    /* eslint-disable complexity -- @todo revamp the below mumbo-jumbo */

    promises.push(M.getAccountDetails());

    Promise.allSettled(promises)
        .then((res) => {
            let tmUpdate = false;

            for (let i = res.length; i--;) {
                if (res[i].status !== 'fulfilled') {
                    const a = promises[`<${i}>`];

                    console.warn(`API Request ${a} failed...`, res[i].reason);
                }
            }

            // get 'uq' reply.
            const uqres = res[0].value;

            // override with 'ug' reply.
            res = res.pop().value;

            if (typeof res === 'object') {
                if (res.p) {
                    u_attr.p = res.p;
                    if (u_attr.p) {
                        tmUpdate = true;
                    }
                }
                else {
                    delete u_attr.p;
                    if (pstatus) {
                        tmUpdate = true;
                    }
                }
                if (res.pf) {
                    u_attr.pf = res.pf;
                    tmUpdate = true;
                }
                if (res.b) {
                    u_attr.b = res.b;
                    tmUpdate = true;
                }
                if (res.uspw) {
                    u_attr.uspw = res.uspw;
                }
                else {
                    delete u_attr.uspw;
                }
                if (res.mkt) {
                    u_attr.mkt = res.mkt;
                    if (Array.isArray(u_attr.mkt.dc) && u_attr.mkt.dc.length) {
                        delay('ShowDiscountOffer', pro.propay.showDiscountOffer, 7000);
                    }
                }
                else {
                    delete u_attr.mkt;
                }
                if (res['^!discountoffers']) {
                    u_attr['^!discountoffers'] = base64urldecode(res['^!discountoffers']);
                }
            }

            if (!account.downbw_used) {
                account.downbw_used = 0;
            }

            if (u_attr && pstatus !== u_attr.p) {
                account.justUpgraded = Date.now();

                M.checkStorageQuota(2);

                // If pro status change is recognised revoke storage quota cache
                M.storageQuotaCache = null;
            }

            if (tmUpdate) {
                onIdle(topmenuUI);
            }

            if (uqres) {
                if (!u_attr || !u_attr.p) {
                    if (uqres.tal) {
                        account.bw = uqres.tal;
                    }
                    account.servbw_used = 0;
                }

                if (uqres.tah) {
                    let bwu = 0;

                    for (const w in uqres.tah) {
                        bwu += uqres.tah[w];
                    }

                    account.downbw_used += bwu;
                }

                if (Array.isArray(uqres.plans)) {
                    account.plans = uqres.plans;
                    account.subs = Array.isArray(uqres.subs) && uqres.subs || [];

                    if (account.plans.length) { // Backward compatibility to uq:v1 based on the first active plan
                        // Active plan details (get first plan with plan level matching u_attr.p,
                        // or use first entry if u_attr.p doesn't exist)
                        const activePlan = account.plans.find(({ al }) => al === u_attr.p) || account.plans[0];

                        // Excluding feature plans
                        if (activePlan && activePlan.al !== pro.ACCOUNT_LEVEL_FEATURE) {
                            const sub = account.subs.find(({ id }) => id === activePlan.subid);
                            const hasSub = !!sub;

                            account.slevel = activePlan.al;
                            account.snext = hasSub && sub.next || activePlan.expires || 0;
                            account.sfeature = activePlan.features;
                            account.stype = hasSub && sub.type || 'O';
                            account.scycle = hasSub && sub.cycle || '';
                            account.smixed = 0;
                            account.utype = u_attr.p;
                            account.srenew = [account.snext];
                            account.expiry = account.expiry || account.snext;

                            [account.sgw, account.sgwids] = account.subs.reduce(
                                ([g, i], { gw, gwid }) => [
                                    g.push(gw) && g,
                                    i.push(gwid) && i
                                ],
                                [[], [], []]
                            );
                        }
                    }
                }
            }

            // Prepare storage footprint stats.
            let cstrgn = account.cstrgn = Object(account.cstrgn);
            const stats = account.stats = Object.create(null);
            let groups = [M.RootID, M.InboxID, M.RubbishID];
            const root = array.to.object(groups);
            const exp = Object(M.su.EXP);

            groups = [...groups, 'inshares', 'outshares', 'links'];
            for (let i = groups.length; i--;) {
                stats[groups[i]] = array.to.object(['items', 'bytes', 'files', 'folders', 'vbytes', 'vfiles'], 0);
                // stats[groups[i]].nodes = [];
            }

            // Add pending out-shares that has no user on cstrgn variable
            const ps = Object.keys(M.ps || {});
            if (ps.length) {
                cstrgn = {
                    ...cstrgn,
                    ...ps
                        .map(h => M.getNodeByHandle(h))
                        .reduce((o, n) => {
                            o[n.h] = [n.tb || 0, n.tf || 0, n.td || 0, n.tvb || 0, n.tvf || 0];
                            return o;
                        }, {})
                };
            }

            for (const handle in cstrgn) {
                const data = cstrgn[handle];
                let target = 'outshares';

                if (root[handle]) {
                    target = handle;
                }
                else if (M.c.shares[handle]) {
                    target = 'inshares';
                }
                // stats[target].nodes.push(handle);

                if (exp[handle] && !M.getNodeShareUsers(handle, 'EXP').length) {
                    continue;
                }

                stats[target].items++;
                stats[target].bytes += data[0];
                stats[target].files += data[1];
                stats[target].folders += data[2];
                stats[target].vbytes += data[3];
                stats[target].vfiles += data[4];
            }

            // calculate root's folders size
            if (M.c[M.RootID]) {
                const t = Object.keys(M.c[M.RootID]);
                const s = Object(stats[M.RootID]);

                s.fsize = s.bytes;
                for (let i = t.length; i--;) {
                    const node = M.d[t[i]] || false;

                    if (!node.t) {
                        s.fsize -= node.s;
                    }
                }
            }

            // calculate public links items/size
            const {links} = stats;
            Object.keys(exp)
                .forEach((h) => {
                    if (M.d[h]) {
                        if (M.d[h].t) {
                            links.folders++;
                            links.bytes += M.d[h].tb || 0;
                        }
                        else {
                            links.bytes += M.d[h].s || 0;
                            links.files++;
                        }
                    }
                    else {
                        if (d) {
                            console.error(`Not found public node ${h}`);
                        }
                        links.files++;
                    }
                });

            account.lastupdate = Date.now();

            if (d) {
                console.log('stats', JSON.stringify(stats));
            }

            if (!account.bw) {
                account.bw = 1024 * 1024 * 1024 * 1024 * 1024 * 10;
            }
            if (!account.servbw_used) {
                account.servbw_used = 0;
            }
            if (!account.downbw_used) {
                account.downbw_used = 0;
            }

            M.account = account;

            // transfers quota
            const tfsq = {max: account.bw, used: account.downbw_used};

            if (u_attr && u_attr.p) {
                tfsq.used += account.servbw_used;
            }
            else if (M.maf) {
                tfsq.used += account.servbw_used;
                const max = M.maf.transfer.base + M.maf.transfer.current;
                if (max) {
                    // has achieved quota
                    tfsq.ach = true;
                    tfsq.max = max;
                }
            }

            const epsilon = 20971520; // E = 20MB

            tfsq.left = Math.max(tfsq.max - tfsq.used, 0);

            if (tfsq.left <= epsilon) {
                tfsq.perc = 100;
            }
            else if (tfsq.left <= epsilon * 5) {
                tfsq.perc = Math.round(tfsq.used * 100 / tfsq.max);
            }
            else {
                tfsq.perc = Math.floor(tfsq.used * 100 / tfsq.max);
            }

            M.account.tfsq = tfsq;

            if (mRootID !== M.RootID) {
                // TODO: Check if this really could happen and fix it...
                console.error('mRootID changed while loading...', mRootID, M.RootID);
            }

            if (typeof cb === 'function') {

                cb(account);
            }
        })
        .catch(reportError)
        .finally(() => {
            loadingDialog.hide();
        });
};

/**
 * Retrieve general user information once a session has been established.
 * The webclient calls this method after every 'us' request and also upon any session resumption (page reload).
 * Only account information that would be useful for clients in the general pages of the site/apps is returned,
 * with other more specific commands available when the user wants
 * to delve deeper in the account sections of the site/apps.
 * @return {Promise<Object>} user get result
 */
MegaData.prototype.getAccountDetails = function() {
    'use strict';

    return api.req({a: 'ug'})
        .then(({result}) => {
            const {u_attr} = window;

            if (u_attr && typeof result === 'object') {
                const upd = `b,features,mkt,notifs,p,pf,pwmh,uspw`.split(',');

                for (let i = upd.length; i--;) {
                    const k = upd[i];

                    if (result[k]) {
                        u_attr[k] = result[k];
                    }
                    else {
                        delete u_attr[k];
                    }
                }

                if (result.ut) {
                    localStorage.apiut = result.ut;
                }

                Object.defineProperty(u_attr, 'flags', {
                    configurable: true,
                    value: freeze(result.flags || {})
                });
                mBroadcaster.sendMessage('global-mega-flags', u_attr.flags);

                if (self.notify && notify.checkForNotifUpdates) {
                    tryCatch(() => notify.checkForNotifUpdates())();
                }
            }

            return result;
        });
};

MegaData.prototype.getUserPlanInfo = async function(callback) {
    'use strict';

    if (M.account && M.account.features && M.account.plans && M.account.subs) {
        return callback ? callback(M.account) : M.account;
    }

    const uqres = await api.send({a: 'uq', pro: 1, v: 2});


    return callback ? callback(uqres) : uqres;
};
