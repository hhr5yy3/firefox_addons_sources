export const Rules = {
    rules: [],
    isEnabled: false,

    init() {
        this.loadRules();
        browser.storage.onChanged.addListener((changes, areaName) => {
            if (areaName === 'local' && changes.rules) {
                this.rules = changes.rules.newValue || [];
            }
        });
    },

    async loadRules() {
        const result = await browser.storage.local.get('rules');
        this.rules = result.rules || [];
    },
	
	

    async saveRules() {
        await browser.storage.local.set({ rules: this.rules });
    },

    addRule(rule) {
        this.rules.push({
            ...rule,
            id: Date.now().toString(),
            enabled: true
        });
        this.saveRules();
    },

    updateRule(id, updatedRule) {
        const index = this.rules.findIndex(r => r.id === id);
        if (index !== -1) {
            this.rules[index] = { ...updatedRule, id };
            this.saveRules();
        }
    },

    deleteRule(id) {
        this.rules = this.rules.filter(r => r.id !== id);
        this.saveRules();
    },

    toggleRule(id) {
        const rule = this.rules.find(r => r.id === id);
        if (rule) {
            rule.enabled = !rule.enabled;
            this.saveRules();
        }
    },

    matchRule(url, method) {
        return this.rules.find(rule => {
            if (!rule.enabled) return false;
            
            // For redirect rules, prevent redirect loops
            if (rule.action === 'redirect') {
                if (url === rule.redirectUrl) {
                    return false;
                }
                
                const targetUrlBase = rule.redirectUrl.split('?')[0];
                if (url.startsWith(targetUrlBase)) {
                    return false;
                }
            }
            
            // For GET parameter modifications, prevent recursive modifications
            if (rule.action === 'modifyGetParams' && rule.getParams?.length > 0) {
                try {
                    const urlObj = new URL(url);
                    const currentParams = urlObj.searchParams;
                    
                    // Check if all modifications are already applied
                    const allModificationsApplied = rule.getParams.every(mod => {
                        switch (mod.operation) {
                            case 'add':
                            case 'modify':
                                return currentParams.get(mod.name) === mod.value;
                            case 'remove':
                                return !currentParams.has(mod.name);
                            default:
                                return false;
                        }
                    });

                    if (allModificationsApplied) {
                        return false;
                    }
                } catch (e) {
                    console.error('Error checking URL modifications:', e);
                }
            }

            // Check if URL matches pattern
            const urlMatches = this.matchUrlPattern(url, rule.urlPattern);
            if (!urlMatches) return false;

            if (rule.method && rule.method !== '*' && rule.method !== method) {
                return false;
            }

            return true;
        });
    },

    matchUrlPattern(url, pattern) {
        try {
            const regex = this.wildcardToRegExp(pattern);
            return regex.test(url);
        } catch (e) {
            console.error('Invalid pattern:', pattern, e);
            return false;
        }
    },

wildcardToRegExp(pattern) {
        // First, escape special regex characters except forward slashes
        const escapedPattern = pattern
            .replace(/[.*+?^${}()|[\]\\]/g, char => {
                // Don't escape forward slashes
                if (char === '/') return '/';
                return '\\' + char;
            })
            // Then handle wildcards
            .replace(/\\\*/g, '.*')
            .replace(/\\\?/g, '.');
        return new RegExp(`^${escapedPattern}$`);
    },


    getMimeType(url, originalMimeType) {
        const ext = url.split('.').pop().toLowerCase();
        
        const mimeTypes = {
            'js': 'application/javascript',
            'css': 'text/css',
            'json': 'application/json',
            'html': 'text/html',
            'htm': 'text/html',
            'xml': 'application/xml',
            'txt': 'text/plain',
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg',
            'png': 'image/png',
            'gif': 'image/gif',
            'svg': 'image/svg+xml',
            'ico': 'image/x-icon',
            'pdf': 'application/pdf',
            'zip': 'application/zip',
            'doc': 'application/msword',
            'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'xls': 'application/vnd.ms-excel',
            'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        };

        return mimeTypes[ext] || originalMimeType || 'application/octet-stream';
    },

    modifyUrl(url, getParamModifications) {
        if (!getParamModifications || getParamModifications.length === 0) return url;

        try {
            const urlObj = new URL(url);
            const params = urlObj.searchParams;

            getParamModifications.forEach(mod => {
                switch (mod.operation) {
                    case 'add':
                        if (!params.has(mod.name)) {
                            params.append(mod.name, mod.value);
                        }
                        break;
                    case 'remove':
                        params.delete(mod.name);
                        break;
                    case 'modify':
                        if (params.has(mod.name)) {
                            params.delete(mod.name);
                            params.append(mod.name, mod.value);
                        }
                        break;
                }
            });

            return urlObj.toString();
        } catch (e) {
            console.error('Error modifying URL:', e);
            return url;
        }
    },

    applyRule(rule, details) {
        switch (rule.action) {
            case 'redirect':
                let originalMimeType = null;
                if (details.requestHeaders) {
                    const contentType = details.requestHeaders.find(h => 
                        h.name.toLowerCase() === 'content-type'
                    );
                    if (contentType) {
                        originalMimeType = contentType.value;
                    }
                }

                const mimeType = this.getMimeType(rule.redirectUrl, originalMimeType);
                const responseHeaders = [{
                    name: 'Content-Type',
                    value: mimeType
                }];

                return {
                    redirectUrl: rule.redirectUrl,
                    responseHeaders: responseHeaders
                };

            case 'modify':
                const result = {};

                // Handle header modifications only
                if (rule.modifyHeaders?.length > 0) {
                    const headers = [...details.requestHeaders];
                    rule.modifyHeaders.forEach(mod => {
                        const index = headers.findIndex(h => h.name.toLowerCase() === mod.name.toLowerCase());
                        switch (mod.operation) {
                            case 'add':
                                if (index === -1) {
                                    headers.push({ name: mod.name, value: mod.value });
                                }
                                break;
                            case 'remove':
                                if (index !== -1) {
                                    headers.splice(index, 1);
                                }
                                break;
                            case 'modify':
                                if (index !== -1) {
                                    headers[index].value = mod.value;
                                }
                                break;
                        }
                    });
                    result.requestHeaders = headers;
                }

                return result;

            case 'modifyGetParams':
                if (rule.getParams?.length > 0) {
                    const modifiedUrl = this.modifyUrl(details.url, rule.getParams);
                    if (modifiedUrl !== details.url) {
                        return { redirectUrl: modifiedUrl };
                    }
                }
                return {};

            case 'block':
                return { cancel: true };

            default:
                return {};
        }
    }
};