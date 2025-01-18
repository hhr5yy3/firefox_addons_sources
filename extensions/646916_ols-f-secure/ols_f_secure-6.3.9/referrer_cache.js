/*
 * Copyright (c) F-Secure Corporation. All rights reserved.
 * See license terms for the related product.
 */

class ReferrerCache {

    constructor() {
        this.refsMap = {};
    }

    Clear() {
        logd("Clearing cache");
        this.refsMap = {};
    }
    
    Process(referrer, destination) {
        try {
            const refHost = (new URL(referrer)).hostname;
            const destHost = (new URL(destination)).hostname;

            if (refHost == destHost) {
                return false;
            }

            var refsMap = this.refsMap[refHost];
            if (!refsMap) {
                refsMap = [];
                this.refsMap[refHost] = refsMap;
            }

            if (refsMap.includes(destHost)) {
                return false;
            }

            refsMap.push(destHost);
            return true;
        }
        catch (err) {
            logd("Invalid URL");
            return false;
        }
    }
}
