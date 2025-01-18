// cache handler
var __CACHE = {};
var __CACHE_Handler = function ()
{
    this.init = function(type, identifier, data)
    {
        identifier = this.cleanupIdentifier(type, identifier);

        if (!__CACHE.hasOwnProperty(type))
            __CACHE[type] = {};
        __CACHE[type][identifier] = {
            timestamp: getTime(),
            data: data,
        };
    };

    this.data = function(type, identifier)
    {
        identifier = this.cleanupIdentifier(type, identifier);

        return __CACHE.hasOwnProperty(type) && __CACHE[type].hasOwnProperty(identifier) ? __CACHE[type][identifier].data : null;
    };

    this.valid = function (type, identifier, customCacheDurationField)
    {
        // no cache debug
        if (localStorage.hasOwnProperty("ignoreCache") && parseInt(localStorage.ignoreCache))
            return false;

        // duration
        let duration = 0;

        // first check if custom cache duration field
        if (typeof customCacheDurationField != "undefined" && customCacheDurationField && CONFIG.hasOwnProperty(`cacheDuration_${customCacheDurationField}`))
            duration = CONFIG[`cacheDuration_${customCacheDurationField}`];
        // fallback to default cache duration field
        else if (CONFIG.hasOwnProperty(`cacheDuration_${type}`))
            duration = CONFIG[`cacheDuration_${type}`];

        // no duration => no cache
        if (!duration)
            return false;

        identifier = this.cleanupIdentifier(type, identifier);

        return __CACHE.hasOwnProperty(type) && __CACHE[type].hasOwnProperty(identifier) && getTime() - __CACHE[type][identifier].timestamp <= duration;
    };

    this.clear = function(type)
    {
        if (typeof type == "undefined" || type === null)
            __CACHE = {};
        else
            delete __CACHE[type];
    };

    this.cleanupIdentifier = function (type, identifier)
    {
        // for links ignore anchors
        if (identifier.indexOf("http://") !== -1 || identifier.indexOf("https://") !== -1)
            if (identifier.indexOf("#") !== -1)
                identifier = identifier.substr(0, identifier.indexOf("#"));

        return identifier;
    }
};
var CACHE = new __CACHE_Handler();
