globalThis.chrome = globalThis.browser;

import { CompactMap } from './map.js';
import NetworkFilter from '../filters/network.js';
import { deserialize, createMap as createMap$1, isValid, getKey } from './metadata/categories.js';
import { deserialize as deserialize$1, createMap, isValid as isValid$1, getKey as getKey$1 } from './metadata/organizations.js';
import { deserialize as deserialize$2, createMap as createMap$2, isValid as isValid$2 } from './metadata/patterns.js';

/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// Optionally, we can also compress their names and descriptions but I think that should not be necessary as it's probably pretty small.
// Usage in MV3 extension
// ======================
// 1. The extension will load the binary engine containing metadata and store it locally
// 2. Either on webRequest events or DNR filter IDs (requires to synchronize the IDs), we tag the request with their metadata
// (2.) At runtime, we will either feed it a request and we expect to get metadata (match, get filter, then from filter ID, get metadata)
//    Or we feed it the filter ID directly, from the DNR engine (but then it means we need to use the filter hash as an ID there as well and hope for no collision)
class Metadata {
    static deserialize(buffer) {
        const metadata = new Metadata(null);
        metadata.categories = CompactMap.deserialize(buffer, deserialize);
        metadata.organizations = CompactMap.deserialize(buffer, deserialize$1);
        metadata.patterns = CompactMap.deserialize(buffer, deserialize$2);
        return metadata;
    }
    constructor(rawTrackerDB) {
        if (!rawTrackerDB) {
            this.organizations = createMap([]);
            this.categories = createMap$1([]);
            this.patterns = createMap$2([]);
            return;
        }
        const { patterns: rawPatterns, organizations: rawOrganizations, categories: rawCategories, } = rawTrackerDB;
        // Type-check categories
        const categories = [];
        if (typeof rawCategories === 'object') {
            for (const [key, category] of Object.entries(rawCategories)) {
                if (typeof category !== 'object') {
                    continue;
                }
                const categoryWithKey = { key, ...category };
                if (isValid(categoryWithKey)) {
                    categories.push(categoryWithKey);
                }
                else {
                    console.error('?? invalid category', categoryWithKey);
                }
            }
        }
        this.categories = createMap$1(categories);
        // Type-check organizations
        const organizations = [];
        if (typeof rawOrganizations === 'object') {
            for (const [key, organization] of Object.entries(rawOrganizations)) {
                if (typeof organization !== 'object') {
                    continue;
                }
                const organizationWithKey = { key, ...organization };
                if (isValid$1(organizationWithKey)) {
                    organizations.push(organizationWithKey);
                }
                else {
                    console.error('?? invalid organization', organizationWithKey);
                }
            }
        }
        this.organizations = createMap(organizations);
        // Type-check patterns
        const patterns = [];
        if (typeof rawPatterns === 'object') {
            for (const [key, pattern] of Object.entries(rawPatterns)) {
                if (typeof pattern !== 'object') {
                    continue;
                }
                const patternWithKey = { key, ...pattern };
                if (isValid$2(patternWithKey)) {
                    patterns.push(patternWithKey);
                }
                else {
                    console.error('?? invalid pattern', patternWithKey);
                }
            }
        }
        this.patterns = createMap$2(patterns);
    }
    getCategories() {
        return this.categories.getValues();
    }
    getOrganizations() {
        return this.organizations.getValues();
    }
    getPatterns() {
        return this.patterns.getValues();
    }
    /**
     * Estimate the total serialized size of this Metadata instance.
     */
    getSerializedSize() {
        return (this.categories.getSerializedSize() +
            this.organizations.getSerializedSize() +
            this.patterns.getSerializedSize());
    }
    /**
     * Serialize this instance of Metadata into `view`
     */
    serialize(buffer) {
        this.categories.serialize(buffer);
        this.organizations.serialize(buffer);
        this.patterns.serialize(buffer);
    }
    /**
     * Given an instance of NetworkFilter, retrieve pattern, organization and
     * category information.
     */
    fromFilter(filter) {
        return this.fromId(filter.getId());
    }
    /**
     * Given a domain, retrieve pattern, organization and category information.
     */
    fromDomain(domain) {
        const domainParts = domain.split('.');
        for (; domainParts.length >= 2; domainParts.shift()) {
            const subdomain = domainParts.join('.');
            const parsedDomainFilter = NetworkFilter.parse(`||${subdomain}^`);
            if (parsedDomainFilter === null) {
                continue;
            }
            const patterns = this.fromId(parsedDomainFilter.getId());
            if (patterns.length > 0) {
                return patterns;
            }
        }
        return [];
    }
    /**
     * Given an `id` from filter, retrieve using the NetworkFilter.getId() method,
     * lookup associated patterns (including organization and category) in an
     * efficient way.
     */
    fromId(id) {
        var _a, _b;
        const results = [];
        for (const pattern of this.patterns.get(id)) {
            results.push({
                pattern,
                category: (_a = this.categories.get(getKey({ key: pattern.category }))) === null || _a === void 0 ? void 0 : _a[0],
                organization: pattern.organization !== null
                    ? (_b = this.organizations.get(getKey$1({ key: pattern.organization }))) === null || _b === void 0 ? void 0 : _b[0]
                    : null,
            });
        }
        return results;
    }
}

export { Metadata };
