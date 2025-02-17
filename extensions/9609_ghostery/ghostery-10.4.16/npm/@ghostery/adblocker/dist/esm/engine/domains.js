globalThis.chrome = globalThis.browser;

import { hashHostnameBackward } from '../request.js';
import { toASCII } from '../punycode.js';
import { sizeOfUint32Array, sizeOfUTF8 } from '../data-view.js';
import { hasUnicode, binLookup, HASH_INTERNAL_MULT } from '../utils.js';

/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
class Domains {
    static parse(parts, debug = false) {
        if (parts.length === 0) {
            return undefined;
        }
        const entities = [];
        const notEntities = [];
        const hostnames = [];
        const notHostnames = [];
        for (let hostname of parts) {
            if (hasUnicode(hostname)) {
                hostname = toASCII(hostname);
            }
            const negation = hostname.charCodeAt(0) === 126; /* '~' */
            const entity = hostname.charCodeAt(hostname.length - 1) === 42 /* '*' */ &&
                hostname.charCodeAt(hostname.length - 2) === 46; /* '.' */
            const start = negation ? 1 : 0;
            const end = entity ? hostname.length - 2 : hostname.length;
            const hash = hashHostnameBackward(negation === true || entity === true ? hostname.slice(start, end) : hostname);
            if (negation) {
                if (entity) {
                    notEntities.push(hash);
                }
                else {
                    notHostnames.push(hash);
                }
            }
            else {
                if (entity) {
                    entities.push(hash);
                }
                else {
                    hostnames.push(hash);
                }
            }
        }
        return new Domains({
            entities: entities.length !== 0 ? new Uint32Array(entities).sort() : undefined,
            hostnames: hostnames.length !== 0 ? new Uint32Array(hostnames).sort() : undefined,
            notEntities: notEntities.length !== 0 ? new Uint32Array(notEntities).sort() : undefined,
            notHostnames: notHostnames.length !== 0 ? new Uint32Array(notHostnames).sort() : undefined,
            parts: debug === true ? parts.join(',') : undefined,
        });
    }
    static deserialize(buffer) {
        const optionalParts = buffer.getUint8();
        // The order of these fields should be the same as when we serialize them.
        return new Domains({
            entities: (optionalParts & 1) === 1 ? buffer.getUint32Array() : undefined,
            hostnames: (optionalParts & 2) === 2 ? buffer.getUint32Array() : undefined,
            notEntities: (optionalParts & 4) === 4 ? buffer.getUint32Array() : undefined,
            notHostnames: (optionalParts & 8) === 8 ? buffer.getUint32Array() : undefined,
            parts: (optionalParts & 16) === 16 ? buffer.getUTF8() : undefined,
        });
    }
    constructor({ entities, hostnames, notEntities, notHostnames, parts, }) {
        // Hostname constraints
        this.entities = entities;
        this.hostnames = hostnames;
        // Hostname exceptions
        this.notEntities = notEntities;
        this.notHostnames = notHostnames;
        // Debug
        this.parts = parts;
    }
    updateId(hash) {
        const { hostnames, entities, notHostnames, notEntities } = this;
        if (hostnames !== undefined) {
            for (const hostname of hostnames) {
                hash = (hash * HASH_INTERNAL_MULT) ^ hostname;
            }
        }
        if (entities !== undefined) {
            for (const entity of entities) {
                hash = (hash * HASH_INTERNAL_MULT) ^ entity;
            }
        }
        if (notHostnames !== undefined) {
            for (const notHostname of notHostnames) {
                hash = (hash * HASH_INTERNAL_MULT) ^ notHostname;
            }
        }
        if (notEntities !== undefined) {
            for (const notEntity of notEntities) {
                hash = (hash * HASH_INTERNAL_MULT) ^ notEntity;
            }
        }
        return hash;
    }
    serialize(buffer) {
        // Mandatory fields
        const index = buffer.getPos();
        buffer.pushUint8(0);
        // This bit-mask indicates which optional parts of the filter were serialized.
        let optionalParts = 0;
        if (this.entities !== undefined) {
            optionalParts |= 1;
            buffer.pushUint32Array(this.entities);
        }
        if (this.hostnames !== undefined) {
            optionalParts |= 2;
            buffer.pushUint32Array(this.hostnames);
        }
        if (this.notEntities !== undefined) {
            optionalParts |= 4;
            buffer.pushUint32Array(this.notEntities);
        }
        if (this.notHostnames !== undefined) {
            optionalParts |= 8;
            buffer.pushUint32Array(this.notHostnames);
        }
        if (this.parts !== undefined) {
            optionalParts |= 16;
            buffer.pushUTF8(this.parts);
        }
        buffer.setByte(index, optionalParts);
    }
    getSerializedSize() {
        let estimate = 1; // optional parts (1 byte)
        if (this.entities !== undefined) {
            estimate += sizeOfUint32Array(this.entities);
        }
        if (this.hostnames !== undefined) {
            estimate += sizeOfUint32Array(this.hostnames);
        }
        if (this.notHostnames !== undefined) {
            estimate += sizeOfUint32Array(this.notHostnames);
        }
        if (this.notEntities !== undefined) {
            estimate += sizeOfUint32Array(this.notEntities);
        }
        if (this.parts !== undefined) {
            estimate += sizeOfUTF8(this.parts);
        }
        return estimate;
    }
    match(hostnameHashes, entityHashes) {
        // Check if `hostname` is blacklisted
        if (this.notHostnames !== undefined) {
            for (const hash of hostnameHashes) {
                if (binLookup(this.notHostnames, hash)) {
                    return false;
                }
            }
        }
        // Check if `hostname` is blacklisted by *entity*
        if (this.notEntities !== undefined) {
            for (const hash of entityHashes) {
                if (binLookup(this.notEntities, hash)) {
                    return false;
                }
            }
        }
        // Check if `hostname` is allowed
        if (this.hostnames !== undefined || this.entities !== undefined) {
            if (this.hostnames !== undefined) {
                for (const hash of hostnameHashes) {
                    if (binLookup(this.hostnames, hash)) {
                        return true;
                    }
                }
            }
            if (this.entities !== undefined) {
                for (const hash of entityHashes) {
                    if (binLookup(this.entities, hash)) {
                        return true;
                    }
                }
            }
            return false;
        }
        return true;
    }
}

export { Domains };
