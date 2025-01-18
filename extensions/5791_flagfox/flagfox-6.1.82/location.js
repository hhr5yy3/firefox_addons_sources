"use strict";

//BEGIN CONSTANTS, LISTS, & HELPERS *******************************************
//{{{

// NOTE: Defined with 'function' to be accessible via browser.extension.getBackgroundPage()
function iconPath(name) { return "/icons/" + name + ".png"; }

const GeotoolDomainName = "iplookup.flagfox.net";
const FlagfoxForumDomainName = "flagfox.net";
const FlagfoxBlogDomainName = "flagfox.wordpress.com";

// Can just use images included in installer for these domains
const favicons_ownlogos = new Map([[GeotoolDomainName,"/geotoolicon.png"], [FlagfoxForumDomainName,"/flagfoxlogo.png"], [FlagfoxBlogDomainName,"/flagfoxlogo.png"]]);

// HACK: We can sneakily tell if a tab/page is actually at about:neterror, even when its official URL says otherwise, via its favicon
// Firefox currently uses warning-16.png, but warning-64.png and warning.svg also exist, so just check for prefix
const isNetErrorIcon = (favIconUrl => (isString(favIconUrl) && favIconUrl.startsWith("chrome://global/skin/icons/warning")));

// These (pseudo-)protocols are for combo URLs which contain a target URL; defining them here makes them effectively transparent to Location objects
// Some are simply prefixes; others encapsulate the target URL, with additional information after a specific character
// Preprotocols are listed in order of processing; nesting is possible (e.g. view-source:jar:)
const preprotocols = [
    { prefix: "formfield:", endchar: "|" },  // Flagfox-specific pseudo-protocol
    { prefix: "about:reader?url=" },
    { prefix: "view-source:" },              // The webRequest API doesn't see this, but there are other ways URLs could be parsed here that might
    { prefix: "blob:" },
    { prefix: "jar:", endchar: "!" }         // The path within the JAR file comes after the "!"
];

// Pages with a blank address bar that will have a hidden Flagfox icon/menus
const blank_address_URLs = new Set(["about:blank", "about:home", "about:newtab", "about:privatebrowsing", "about:sessionrestore", "?", ""]);

// Location lookup error types (specified in location.special[0]); TODO: this set was previously used for tooltip styling, which is currently not possible due to API limitations
//const location_errors = new Set(["unknownsite", "lookuperror", "nodnserror", "offlinemode"]);

// A blacklist of TLDs not to be considered indicative of a precise location
const meaningless_ccTLDs = new Set([
    // Rather than me only taking my best guess at the currently meaningless country TLDs, Google is apparently now maintaining their own list (TASK: last updated 2022-1-1)
    // https://developers.google.com/search/docs/advanced/crawling/managing-multi-regional-sites#generic-domains
    "ad","as","bz","cc","cd","co","dj","fm","io","la","me","ms","nu","sc","sr","su","tv","tk","ws",
    // The following is the additional set of ccTLDs I add to the blacklist, on top of Google's
    "am","gl","ly","to",
    // The following are too general to be useful for purposes here; need an actual specific country (supranational entities are too big, as is the entire continent of Asia)
    "ap","eu"
]);

// Non-cc-TLDs that can be considered to be from a specific country for which we have a country code (map of TLDs to country codes, generated from list)
const country_gTLDs = new Map([
    // The US has kept control of use of these old TLDs; other countries can use them only as a second-level domain
    ["US", ["edu","gov","mil"]],
    // The UK created .uk before the standardization of ccTLDs, so it got grandfathered in and .gb doesn't really get used; Maxmind uses GB instead of UK to indicate UK
    ["GB", ["uk"]],
    // There's also a long list of city TLDs as well as non-ASCII geoTLDs, enumerated below (TASK: last updated 2020-1-1)
    // https://en.wikipedia.org/wiki/List_of_Internet_top-level_domains#Internationalized_country_code_top-level_domains
    // https://en.wikipedia.org/wiki/List_of_Internet_top-level_domains#Geographic_top-level_domains
    ["AE", ["xn--mgbaam7a8h","abudhabi","dubai","xn--mgbca7dzdo"]],
    ["AM", ["xn--y9a3aq"]],
    ["AT", ["tirol","wien"]],
    ["AU", ["melbourne","sydney"]],
    ["BD", ["xn--54b7fta0cc"]],
    ["BE", ["brussels","gent","vlaanderen"]],
    ["BG", ["xn--90ae"]],
    ["BH", ["xn--mgbcpq6gpa1a"]],
    ["BR", ["rio"]],
    ["BY", ["xn--90ais"]],
    ["CA", ["quebec"]],
    ["CH", ["swiss","zuerich"]],
    ["CN", ["xn--fiqs8s","xn--fiqz9s","xn--1qqw23a","xn--xhq521b"]],
    ["DE", ["bayern","berlin","cologne","hamburg","koeln","nrw","ruhr","saarland"]],
    ["DZ", ["xn--lgbbat1ad8j"]],
    ["EG", ["xn--wgbh1c"]],
    ["ES", ["bcn","barcelona","gal","madrid"]],
    ["EU", ["xn--e1a4c","xn--qxa6a"]],  // .eu in other alphabets
    ["FI", ["helsinki"]],
    ["FR", ["alsace","bzh","corsica","paris"]],
    ["GB", ["cymru","london","scot","wales"]],
    ["GE", ["xn--node"]],
    ["GR", ["xn--qxam"]],
    ["HK", ["xn--j6w193g"]],
    ["HU", ["budapest"]],
    ["IE", ["irish"]],
    ["IN", ["xn--h2brj9c","xn--mgbbh1a71e","xn--fpcrj9c3d","xn--gecrj9c","xn--s9brj9c","xn--xkc2dl3a5ee0h","xn--45brj9c","xn--2scrj9c","xn--rvc1e0am3e","xn--45br5cyl","xn--3hcrj9c","xn--mgbbh1a","xn--h2breg3eve","xn--h2brj9c8c","xn--mgbgu82a"]],
    ["IQ", ["xn--mgbtx2b"]],
    ["IR", ["xn--mgba3a4f16a"]],
    ["JO", ["xn--mgbayh7gpa"]],
    ["JP", ["kyoto","nagoya","okinawa","osaka","ryukyu","tokyo","yokohama"]],
    ["KR", ["xn--3e0b707e"]],
    ["KZ", ["xn--80ao21a"]],
    ["LA", ["xn--q7ce6a"]],
    ["LK", ["xn--fzc2c9e2c","xn--xkc2al3hye2a"]],
    ["MA", ["xn--mgbc0a9azcg"]],
    ["MK", ["xn--d1alf"]],
    ["MN", ["xn--l1acc"]],
    ["MO", ["xn--mix082f","xn--mix891f"]],
    ["MR", ["xn--mgbah1a3hjkrd"]],
    ["MY", ["xn--mgbx4cd0ab"]],
    ["NL", ["amsterdam","frl"]],
    ["NZ", ["kiwi"]],
    ["OM", ["xn--mgb9awbf"]],
    ["PK", ["xn--mgbai9azgqp6j"]],
    ["PS", ["xn--ygbi2ammx"]],
    ["QA", ["xn--wgbl6a","doha"]],
    ["RS", ["xn--90a3ac"]],
    ["RU", ["xn--p1ai","moscow","xn--80adxhks","xn--p1acf"]],
    ["SA", ["xn--mgberp4a5d4ar"]],
    ["SD", ["xn--mgbpl2fh"]],
    ["SE", ["stockholm"]],
    ["SG", ["xn--yfro4i67o","xn--clchc0ea0b2g2a9gcd"]],
    ["SY", ["xn--ogbpf8fl"]],
    ["TH", ["xn--o3cw4h"]],
    ["TN", ["xn--pgbs0dh"]],
    ["TR", ["ist","istanbul"]],
    ["TW", ["xn--kprw13d","xn--kpry57d","taipei"]],
    ["UA", ["xn--j1amh"]],
    ["US", ["boston","miami","nyc","vegas"]],
    ["YE", ["xn--mgb2ddes"]],
    ["ZA", ["capetown","durban","joburg"]]
].flatMap(([cc,tlds]) => tlds.map(tld => [tld,cc])));

// A list of common effective top-level domain components, in addition to all one/two character strings (includes all ccTLDs and US state second-level domains)
const common_eTLD_components = new Set([
    // Pre-ICANN TLDs (1998)
    "com","edu","gov","int","mil","net","org",
    // Verisign
    "jobs","name",
    // Afilias
    "aero","info","mobi","ngo","pro",
    // Other notable top/second-level domains
    "biz","coop","hotel","museum","travel","web",
    // Other notable second-level domains
    "art","arts","firm","gob","ltd","nom","sch","store","rec",
    // US state third-level domains (also occasionally used by other countries at the second-level)
    "k12","lib"
]);

//}}}
//BEGIN URL HELPER FUNCTIONS **************************************************
//{{{

// All Latin two character TLDs are reserved for country TLDs
const ccTLD = (/^[a-z]{2}$/i);

function stripPreProtocols(url) {
    for (const pp of preprotocols) {
        if (url.startsWith(pp.prefix)) {
            const innerURL = decodeURIComponent(url.substring(pp.prefix.length, (pp.endchar ? url.indexOf(pp.endchar) : undefined)));
            if (innerURL.includes(":"))
                url = innerURL;  // The inner URL is only valid if it still has a protocol of its own
        }
    }
    return url;
}

function safeURL(url) {  // An object representing the given URL string, cleaned and without exceptions
    try {
        this.parsed = new URL(url);  // URL() throws exceptions for invalid URLs
    } catch {
        this.parsed = { protocol: String(url).prefixBefore(":"), hostname: "", pathname: "" };  // Extract invalid protocol and consider all else to be empty
    }
}

safeURL.prototype = {
    get protocol() { return this.parsed.protocol.dropSuffix(":").toLowerCase(); },  // Clean off the trailing colon that URL() leaves on
    get host()     { return this.parsed.hostname.dropSuffix(".").toLowerCase(); },  // Drop the trailing dot, if actually present
    get path()     { return this.parsed.pathname; }
};

function parseURL(url) {
    return new safeURL(url);
}

// I previously used nsIEffectiveTLDService which uses a managed public suffix list (publicsuffix.org), however no equivalent API is provided for WebExtensions (TODO: complain)
// This is a quick and simple implementation that should be good enough for what it's needed for, though it won't always produce the exact same results as the full version
function dissectDomain(host) {
    //assert(isNonEmptyString(host), "dissectDomain() requires a domain string to dissect!", host);
    const dot = ".";
    let levels = host.split(dot);
    let rv = {};
    rv.tld = levels.pop();  // TLD is the rightmost component
    if (levels.length > 1 && levels[0] === "www") {  // A leading www subdomain is effectively meaningless at this point; drop it
        levels.shift();
        rv.www = true;
    }
    rv.etld = rv.tld;  // Start with eTLD=TLD and attempt to expand from there
    while (levels.length > 1) {
        let next = levels[levels.length-1];
        if ( !(next.length <= 2 || common_eTLD_components.has(next)) )  // Check if the next rightmost component is a valid eTLD component, and then break the search loop if not
            break;
        rv.etld = levels.pop() + dot + rv.etld;  // eTLD is the string of rightmost components that are only one/two char long or in the eTLD component list
    }
    if (levels.length !== 0) {
        rv.host_main = levels.pop();                  // Main domain name is the rightmost remaining component
        rv.host_base = rv.host_main + dot + rv.etld;  // Base domain name is the main domain name + eTLD
        rv.host_sub = levels.join(dot);               // Sub domain name is the string of all remaining components (or an empty string if none)
    } else {
        rv.host_base = rv.etld;                       // Edge-case of (e)TLD-only domain name (single-level domain names can actually exist)
        rv.host_sub = rv.host_main = "";
    }
    DEBUG_checkDissectedHostObj(host, rv);
    return rv;
}

const DEBUG_checkDissectedHostObj = (!debug ? Nothing : ((h,o) => {  // Separate function in order to avoid all unneeded computation if not in debug mode
    assert(((o.www?"www.":"") + (o.host_sub?o.host_sub+".":"") + o.host_base) === h, "recombined dissected domain does not match full domain!", h, o);
}));

//}}}
//BEGIN LOCATION PARSE OBJECT *************************************************
//{{{

// This helper simplifies things; always returns a promise that resolves to the new object with everything ready
function newLocation(url, tabId, neterror, lookuptimeout)
{
    // First, check the given arguments
    url = (isNonEmptyString(url) ? url : undefined);
    tabId = (validateTabId(tabId) ? tabId : undefined);
    // If a URL is provided, then instantiate and return promise of lookup
    if (url !== undefined) {
        return (new Location(url, tabId, neterror)).lookup(lookuptimeout);
    }
    // If no URL is provided, but a tab ID is, then look that up and instantiate from there
    if (tabId !== undefined) {
        return browser.tabs
                      .get(tabId)
                      .then(tab => {
                          url = tab.url;
                          neterror = isNetErrorIcon(tab.favIconUrl);
                          // Make sure a URL was actually returned, to avoid an infinite loop
                          if (isNonEmptyString(url))
                              return newLocation(url, tabId, neterror, lookuptimeout);
                          // Not sure if this can happen, normally, but check for and handle the error case anyway
                          return Promise.reject(new Error("newLocation() was passed an ID for a tab without a URL!"));
                      });
    }
    // If no URL or tabId, then not enough info to go on; abort
    return Promise.reject(new Error("newLocation() needs a URL or tab ID!"));
}

const newLocationForTab = (({url, id, favIconUrl}) => newLocation(url, id, isNetErrorIcon(favIconUrl)));

const isLocation = (x => (x instanceof Location));

function Location(url, tabId, neterror)
{
    assert(isString(url), "Location() requires a URL string!");  // May be an empty string

    if (url === "?") {  // Placeholder local Location object
        this.url = this.host = this.protocol = "?";
        this.local = true;
        return;
    }

    this.url = stripPreProtocols(url);

    if (tabId !== undefined) {  // Will be undefined if not for a content tab
        this.tabId = tabId;
        const cacheObj = TabCache.lookup(tabId);
        if (cacheObj.hsts)
            this.hsts = true;
        if (cacheObj.http)
            this.http = cacheObj.http;  // HTTP version number string, if HTTP/2+
        if (cacheObj.proxied)
            this.proxied = true;
    }

    if (neterror)
        this.error = true;

    const parsed = parseURL(this.url);  // Returned properties are always strings (potentially empty)
    this.host = parsed.host;
    this.protocol = parsed.protocol;

    switch (this.protocol)
    {
        case "data":
            this.icon = "special/script";
            this.special = ["datauri", this.url.prefixBefore(",")];
            this.local = false;  // Not local; url is portable and can be sent to actions
            break;
        case "javascript":
            this.icon = "special/script";  // Don't have a special string for general tooltips
            this.local = false;  // Not local; url is portable and can be sent to actions (though, JS actions themselves may use Flagfox APIs that are not portable)
            break;
        case "file":
            this.icon = "special/localfile";
            this.special = ["localfile"];
            this.local = true;
            break;
        case "about":
            this.icon = "special/about";  // No icon in address bar if no address is shown (still shown in page actions menu)
            this.special = ["internalfile", this.url.prefixBefore("?"), (blank_address_URLs.has(this.url) ? "HIDE" : "SHOW")];
            this.local = true;
            break;
        case "chrome":  case "resource":  case "moz-icon":  case "moz-extension":  case "blob":
            this.icon = "special/resource";
            this.special = ["internalfile", this.protocol+"://"];
            this.local = true;
            break;
        case "copystring":  // Flagfox-specific pseudo-protocol
            this.icon = "copy";  // Don't have a special string for general tooltips
            this.local = true;
            break;
        default:
            // May or may not be local
            // Won't know anything more until this.lookup() is called and complete
            break;
    }
}

Location.prototype.lookup = function(timeout)  // Returns a promise with the updated location object; If no host or already completed, then this resolves immediately
{
    if (!this.host || this.country !== undefined || this.special !== undefined)
        return Promise.resolve(this);

    if (this.lookupInProgress)
        return wait(() => !this.lookupInProgress)  // Already have a lookup in progress; wait for it to complete
              .then(() => Promise.resolve(this));
    this.lookupInProgress = true;

    return IPDB.lookupByHost(this.host, timeout)
               .then(({ip, code}) => {
                   this.ip = ip;
                   switch (code) {
                       case "-A":  case "-B":  case "-C":
                           this.icon = "special/privateip";
                           this.local = true;
                           break;
                       case "-L":
                           this.icon = "special/localhost";
                           this.local = true;
                           break;
                       case "A1":  case "A2":  // A1/A2 codes are for IP ranges explicitly marked as anonymous by Maxmind
                       case "AP":              // AP is for "Asia/Pacific Region" which, whilst in the DB, is so vague as to be useless; treat it as effectively anonymous
                       case null:              // if country===null, then the IPDB is loaded, but Maxmind has no record for it (they now do this for some CDNs)
                           this.icon = "special/global";
                           /*### FALLTHROUGH ###*/
                       case undefined:         // if country===undefined, then we couldn't look it up due to lack of IP (e.g. menu for a link/image/etc. on not-visited domain)
                           this.local = (ip ? false : undefined);  // Definitely not local if an IP is available; probably not local if no IP is known (assume false)
                           break;
                       default:
                           assert(isString(code) && code.length === 2, "Flagfox IPDB error: got bogus country code", code, this);
                           this.icon = "flags/" + code.toLowerCase();
                           this.local = false;
                           break;
                   }
                   this.country = code;
               })
               .catch(console.error)
               .then(() => {
                   delete this.lookupInProgress;
                   debugLog_traffic("location looked up:", this);
                   return Promise.resolve(this);
               });
};

Location.prototype.getFavicon = function()  // If favicons are disabled, this will return generic icons only
{
    if (this.host && prefs.get("showfavicons")) {
        if (favicons_ownlogos.has(this.host)) {
            return favicons_ownlogos.get(this.host);
        }
        if (this.protocol.startsWith("http") && this.host.includes(".") && !this.error) {
            const src = favicons_defaults_nonstandard.get(this.host);
            return this.protocol + "://" + this.host + (src ? src : "/favicon.ico");
        }
    }
    return iconPath(this.icon ? this.icon : "default");
};

Location.prototype.getEffectiveLocation = function()  // Returns a copy of this Location object with any unknown parts filled in with the applicable conditions
{
    let eLocation = Object.assign({},this);  // Create a clone object with the same properties, including lazy properties (can be changed without affecting the original)
    if (eLocation.icon === undefined) {      // icon === null if explicitly disabled
        if (inOfflineMode()) {
            eLocation.icon = "special/offline";
            eLocation.special = ["offlinemode"];
        } else if (eLocation.error) {
            eLocation.icon = "special/error";
            eLocation.special = ["lookuperror"];
        } else if (eLocation.proxied) {
            eLocation.icon = "special/global";    // TODO: Maybe change this icon to something similar to distinguish it from other uses?
            eLocation.special = ["nodnserror"];
        } else /* shrug */ {
            eLocation.icon = "special/global";
            eLocation.special = ["unknownsite"];  // TODO: The tooltip for this is less than ideal, currently
            debugWarn("Flagfox currently has no IP from the WebExt API for a location (usually fixable with a refresh):", this);
        }
    }
    return eLocation;
};

// Dissects the domain name and looks up the country code, if available
// Standard country code TLDs are Latin and exactly two characters (entire namespace reserved); alternatively checks list of location-specific gTLDs (inclinding IDN)
Location.prototype.getDomainDetails = function()
{
    if (!this.host || this.host === this.ip)
        return;
    Object.assign(this, dissectDomain(this.host));  // Get domain components and add to 'this'
    if (!this.tld)  // If no TLD, then nothing left to do here
        return;
    // First, check if it's a standard ccTLD (value also cached for deciding when to show the TLD country in the tooltip)
    this.cctld = ccTLD.test(this.tld);
    // Check non-CC/ASCII location restricted TLD list (always check, to handle the quirk of UK->GB)
    this.tld_country = country_gTLDs.get(this.tld);
    // If it's not in the list and it's a ccTLD, then the country code and TLD are the same
    if (!this.tld_country && this.cctld)
        this.tld_country = this.tld.toUpperCase();  // All hosts/TLDs are handled in lowercase; all country codes are handled in uppercase
    // If it's still undefined, then it has no nationality (e.g. com/net/org/info/etc.)
};

// CAUTION: The calling function must load any required metadata (if any) via this.getMetadata() prior to calling this method; throws an exception on invalid parameter
Location.prototype.getParameterValue = function(parameter, encodeValue=Identity)
{
    assert(isNonEmptyString(parameter), "Location.getParameterValue() requires a parameter string!", parameter, encodeValue, this);
    assert(isFunction(encodeValue), "Location.getParameterValue() requires an encode function reference!", parameter, encodeValue, this);
    // Some parameters can have multiple components: {lhs-rhs}
    const [parameter_lhs, parameter_rhs] = parameter.splitOnce("-");  // RHS could have more dashes (e.g. arbitrary meta tag names), so explicitly split only once
    const unEncodedValue = (() => {
        switch (parameter_lhs) {
            case "fullurl":
                return this.url;
            case "basedomainname":
                return this.host_base;
            case "domainname":
                switch (parameter_rhs) {
                    default:      return this.host;
                    case "sub":   return this.host_sub;  // If an RHS is supplied, access results of dissectDomain()  // TODO:DOCUMENT
                    case "main":  return this.host_main;
                    case "base":  return this.host_base;
                    case "tld":   return this.tld;
                    case "etld":  return this.etld;
                }
            case "tld":
                return this.etld;  // Effective TLD instead of just plain TLD (same behavior as Flagfox 5.x)
            case "ipaddress":
                return this.ip;
            case "countrycode":
                return (parameter_rhs !== "tld") ? this.country : this.tld_country;  // TODO:DOCUMENT
            case "countryname":
                return (parameter_rhs !== "tld") ? this.countryname : this.tld_countryname;
            case "title":
                return this.title;
            case "baselocale":
                var base = true;  // Intentional fall-through
            case "locale":
                var value;
                switch (parameter_rhs) {
                    default:  value = LocaleInfo.content_primary;  break;  // {locale}      -> highest priority user requested content locale (LocaleInfo.content is an array of all)
                    case "os":                                             // {locale-os}   -> OS locale (DEPRECATED NOTE: for backwards compatibility with Flagfox 5.x)
                    case "app":   value = LocaleInfo.browser;   break;     // {locale-app}  -> application UI locale (e.g. whatever Firefox is running in)  // TODO:DOCUMENT
                    case "ui":    value = LocaleInfo.flagfox;   break;     // {locale-ui}   -> Flagfox UI strings locale (e.g. country names)
                    case "page":  value = this.locale;          break;     // {locale-page} -> locale stated for the current page (potentially empty)
                }
                return (base && value) ? value.prefixBefore("-") : value;  // If base: language-dialect -> language
            case "meta":
                return this.meta[parameter_rhs];
            default:
                throw new Error("invalid parameter name");
        }
    })();  // Immediately call anonymous function (just to be able to use return, to make things fewer lines and simpler)
    // Just to ensure something is always returned for a valid parameter, wrap the encoder function in a try/catch; an exception is thrown above for invalid parameters
    try { return unEncodedValue ? encodeValue(unEncodedValue) : ""; }
    catch { return ""; }
};

Location.prototype.hasMetadata = function(neededTypes)
{
    neededTypes = maybeArray(neededTypes);  // Can take a string or an array of strings
    if (neededTypes.length === 0)
        return true;
    if (this.loadedMetadataTypes === undefined)
        return false;
    for (let type of neededTypes)
        if (!this.loadedMetadataTypes[type])
            return false;
    return true;
};

Location.prototype.getMetadata = function(neededTypes)  // Returns a promise that resolves with all content metadata loaded and cached on this object
{
    neededTypes = maybeArray(neededTypes);  // Can take a string or an array of strings as an argument
    return Promise.all([
        waitGeneralStartup(),  // Locales and IPDB metadata may be needed, so always ensure startup is done
        this.lookup()          // May have already completed IPDB lookup, but check first just in case, and wait if not
    ])
    .then(() => {
        this.getDomainDetails();  // Always get details for host names, if available (host_*, (e/cc)tld, & tld_country)
        if (!this.loadedMetadataTypes)
            this.loadedMetadataTypes = {};
        let todo = [];
        const isContentTab = (this.tabId !== undefined);
        if (isContentTab && neededTypes.includes("title")) {
            todo.push(browser.tabs
                             .get(this.tabId)
                             .then(({title}) => Object.assign(this, {title})));
        }
        if (isContentTab && neededTypes.includes("page")) {
            todo.push(runContentScript({type:"getmetadata"}, this.tabId)
                                 .then(meta => Object.assign(this, meta)));
        }
        if ((this.country || this.tld_country) && neededTypes.includes("cnames")) {
            todo.push(lazyLoadPropertiesFile("countrynames")
                                       .then(() => Object.assign(this, {countryname: getLoadedString(this.country),
                                                                    tld_countryname: getLoadedString(this.tld_country)})));
        }
        return Promise.all(todo);
    })
    .then(() => {
        neededTypes.forEach(type => (this.loadedMetadataTypes[type] = true));
        debugLog_cache("got metadata for location:", this, neededTypes);
        return Promise.resolve(this);
    });
};

//}}}
