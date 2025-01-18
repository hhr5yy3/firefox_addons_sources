"use strict";

// NOTE: The following Unicode control characters mark text direction without as many side-effects as older ones
const LTR_START = "\u2066";  // Isolate LTR text
const RTL_START = "\u2067";  // Isolate RTL text
const DIR_RESET = "\u2069";  // Pop last isolate
const LTR = (str => (LTR_START + str + DIR_RESET));
const RTL = (str => (RTL_START + str + DIR_RESET));

//BEGIN UI STRING LOADING *****************************************************
//{{{

// NOTE: Flagfox uses this system here for all of its UI strings, however the locale code to use and addon description string are still handled with the WebExtension I18N system.
// WARNING: Locale codes use dashes to separate language and dialect. This is true everywhere EXCEPT the folder names within the "/_locales" folder, which inexplicably
//          requires that all locale codes use an underscore instead. Probably Google Chrome compatibility idiocy. Hopefully shouldn't affect this here, though.

// NOTE: To anyone reading this, you're asking, why not use the built-in WebExtension I18N for everything? Well, it's kinda bad. Ditching DTD files is all well and good,
//       but properties files were so dead simple that I don't want to replace them with the more complex and less efficient JSON format. A file format comparison:
//           DTD file line:                 <!ENTITY stringName "stringValue">
//           Properties file line:          stringName=stringValue
//           WebExt I18N JSON file "line":  "stringName":{"message":"stringValue"},
//       Flagfox currently has ~400 UI strings (255 are country/region names) in 37 locales (not counting non-shipping incompletes). Using this JSON format would add over 267KB!
//       Mozilla's XPI package format is still just a glorified ZIP file (a format from 1989), and ZIP files lack solid compression, so that's not all magically going away.
//       There's probably also a non-zero decrease in parsing performance for JSON over just splitting lines on an equals sign, setting aside the decrease just from size.
//       I already use JSON where it's needed and the best tool for the job. JSON simply isn't the best way to handle this data.

// TODO: Additionally, by using my own system, I can place the locale files in a custom location, which can be inside a JAR file and accessed via the JAR protocol.
//       Putting locale files in an internal JAR, as I have for most of 10 YEARS, allows for poor-man's solid compression, giving a drastic reduction in XPI file size.
//       (especially given Mozilla's bad compression settings when repackaging addons after signing (should just be appending), though I haven't tested their output in a while)
// NOTE: To be precise, the JAR+ZIP trick works by far best with an uncompressed JAR inside a max-compressed ZIP (preferably using 7-Zip's DEFLATE implementation).
// BUG:  Using a locales JAR reduces the XPI file size by over 100KiB (~15%), unfortunately the Fetch API currently breaks with a bogus security error. (TODO: file a bug)
/*const localeFilesInJAR = false;*/                                                                                 // TODO: Fix or remove JAR support
const localeFilesPath = /*localeFilesInJAR ? "jar:"+browser.extension.getURL("/locales.jar")+"!/" :*/ "/locales/";  // FIXME: Deprecated API used here

// Takes a potential locale string and returns a guaranteed locale string
const maybeLocale = (code => (isNonEmptyString(code,2) ? code.replace("_","-") : LocaleInfo.flagfox_default));

const LocaleInfo = {
    browser : maybeLocale(browser.i18n.getUILanguage()),  // NOTICE: It's a miracle... synchronous functions in the WebExtension API!
    flagfox : browser.i18n.getMessage("code"),
    flagfox_default : "en"
};
LocaleInfo.flagfox_usingDefault = (LocaleInfo.flagfox === LocaleInfo.flagfox_default);  // Set here due to JS const declaration rules quirk
LocaleInfo.flagfox_textDir = (["ar","fa","he"].includes(LocaleInfo.flagfox) ? "rtl" : "ltr");
const fetchAcceptLanguages = (() => {  // Needed for some actions
    return browser.i18n.getAcceptLanguages().then(languages => {  // ... aaaand, that's the end of the sync methods
        LocaleInfo.content = languages;
        LocaleInfo.content_primary = maybeLocale(languages ? languages[0] : null);
        return Promise.resolve(LocaleInfo.content);
    });
});

const strings = new Map();  // Map of string names to values, for all loaded strings; all strings are autoloaded on first use

const strings_timeout = debug ? 300000 : 1200000;  // Drop unloadable strings afer 20 minutes of disuse (5 minutes in debug mode)

const locale_files = {
    timestamps : new Map(),  // Map of properties file names to time of last use (0 for load in progress)
    needToLoad(fileName)  { return !this.timestamps.has(fileName);   },  // Need to load if not tracked
    isLoaded(fileName)    { return !!this.timestamps.get(fileName);  },  // Is loaded if have a timestamp (exists and is not 0)
    setLoading(fileName)  { return this.timestamps.set(fileName, 0); },  // If loading now, start tracking; set timestamp to 0
    setUnloaded(fileName) { return this.timestamps.delete(fileName); },  // On unload, remove from tracking
    setUsed(fileName) {
        this.timestamps.set(fileName, Date.now());  // Mark as newly loaded / update last-used timestamp
        queueStringsCleanup();                      // Queue a strings cleanup for when the next loaded strings expire (if needed)
    },
    cantUnload(fileName) { return (!this.isLoaded(fileName) || fileName === "countrynames"); },  // Unload N/A if not loaded/loading; no unload for country names
    autounload_queued : false
};

const stringPrefixToFileName = new Map([["abt","about"],["act","actions"],["hlp","help"],["msg","notify"],["opt","options"],["ttp","tooltip"]]);
const fileNametoStringPrefix = (fileName => (fileName.substring(0,3) + "."));

const nonAlphaNumChars = (/\W/g);  // After pefix, ID is lower-case alphanumeric and underscores, only
const getDefaultActionNameStringId = (actionName => ("act." + actionName.replace(nonAlphaNumChars,"").toLowerCase()));

function lazyLoadPropertiesFile(fileName, fallback=false)  // Returns a promise that resolves upon completion (NOTE: fallback flag should not be used outside of this function)
{
    if (isArray(fileName))  // Can take a string or an array of strings
        return Promise.all(fileName.map(name => lazyLoadPropertiesFile(name, fallback)));

    // The 'fileName' argument can be either a string or array of strings, but by this point here, it's always a string
    const fileLocale = (fallback ? LocaleInfo.flagfox_default : LocaleInfo.flagfox);
    assert(isNonEmptyString(fileLocale), "lazyLoadPropertiesFile() requires a selected locale code!", fileName, fileLocale);
    assert(isNonEmptyString(fileName), "lazyLoadPropertiesFile() requires a file name string or array of strings!", fileName, fileLocale);

    if (!locale_files.needToLoad(fileName) && !fallback)    // Just allow fallback loads through this gate so I don't have to track current and default locale files separately
        return wait(() => locale_files.isLoaded(fileName))  // If a load isn't needed, this is done as soon as loaded (e.g. wait until then, or right now)
              .then(() => locale_files.setUsed(fileName));  // Make note of each time a file is used, so we can later unload some files if not needed anymore
    locale_files.setLoading(fileName);

    const filePath = localeFilesPath + fileLocale + "/" + fileName + ".properties";
    return fetch(filePath)
          .then(response => response.text())
          .then(data => {
              const bytes = data.length;
              const strings_size_start = strings.size;
              data = data.split("\n");
              for (let line of data) {
                  line = line.trim();
                  if (!line || line[0] === "#")  // Skip whitespace and comment lines
                      continue;
                  const [key, value] = line.splitOnce("=");  // Make sure to only split on first (built-in split's limit argument doesn't limit splitting; just discards extras)
                  if (!key || !value || strings.has(key))    // Make sure to avoid overwriting previously loaded strings when loading English fallbacks
                      continue;
                  strings.set(key, value);
                  if (fallback)
                      debugWarn("Loaded fallback locale ("+LocaleInfo.flagfox_default+") string for missing current locale ("+LocaleInfo.flagfox+") string:", line);
              }

              debugLog_cache("Loaded "+(strings.size-strings_size_start)+" strings from \""+filePath+"\" ("+bytes+" bytes)");

              // If this isn't a fallback attempt, and we're not using the fallback locale, then check to see if any fallbacks are needed
              if (!fallback && !LocaleInfo.flagfox_usingDefault)
                  return lazyLoadPropertiesFile(fileName, true);

              locale_files.setUsed(fileName);
              return Promise.resolve();  // Done
          }).catch(e => console.error("Flagfox error loading \""+filePath+"\":", e));
}

// Unloads both the current and default locales' strings for the given file name (fallback strings aren't considered special)
function unloadPropertiesFileStrings(fileName)
{
    assert(isNonEmptyString(fileName), "unloadPropertiesFileStrings() requires a file name string!", fileName);

    if (locale_files.cantUnload(fileName))
        return;

    const strings_size_start = strings.size;
    const stringNamePrefix = fileNametoStringPrefix(fileName);
    for (let stringName of strings.keys())
        if (stringName.startsWith(stringNamePrefix))
            strings.delete(stringName);

    locale_files.setUnloaded(fileName);
    debugLog_cache("Unloaded "+(strings_size_start-strings.size)+" strings from \""+fileName+"\" L10N file(s)");
}

// Queues a cleanup attempt that will unload any strings not used again before they expire
function queueStringsCleanup()
{
    if (locale_files.autounload_queued)  // Already one pending
        return;

    const queueTime = Date.now();
    let timeUntilNextCleanup = Infinity;
    for (let [fileName,lastUsedTime] of locale_files.timestamps) {
        if (locale_files.cantUnload(fileName))
            continue;
        timeUntilNextCleanup = Math.min(timeUntilNextCleanup,
                                        strings_timeout - (queueTime-lastUsedTime));
    }
    if (timeUntilNextCleanup === Infinity)
        return;  // Nothing available to clear

    locale_files.autounload_queued = true;
    void sleep(timeUntilNextCleanup).then(() => {
        const cleanupTime = Date.now();
        for (let [fileName,lastUsedTime] of locale_files.timestamps) {
            if (locale_files.cantUnload(fileName))
                continue;
            else if (cleanupTime-lastUsedTime >= strings_timeout)
                unloadPropertiesFileStrings(fileName);
        }
        locale_files.autounload_queued = false;
        queueStringsCleanup();  // Check if there are any new ones that need clearing (or if the ones at the start were used again since queuing)
    });
    debugLog_cache("Queued L10N strings cleanup for "+(timeUntilNextCleanup/1000)+" seconds from now (short timeout set for testing in debug mode)");
}

function listFilesNeededForStrings(stringNames)
{
    let filesNeeded = new Set();  // Tally all needed files in a Set() (simple way to store once, without needing to check)
    for (let name of stringNames) {
        // All country/region name IDs are exactly two characters; All others are prefixed with the first 3 characters of the filename, followed by a dot
        let file = (name.length === 2 ? "countrynames"
                                      : stringPrefixToFileName.get(name.substring(0,3)));
        assert(file, "invalid string name!", name);
        filesNeeded.add(file);
    }
    return Array.from(filesNeeded);
}

// TEST:
const DEBUG_checkAllDefaultActionNameL10N = (!debug ? Nothing : (() => {
    Promise.all([
        lazyLoadPropertiesFile("actions"),
        actions.ensureLoaded()
    ])
    .then(() => {
        const prefix = getDefaultActionNameStringId("");  // "act."
        const IDsWithL10N = new Set( Array.from(strings.keys()).filter(name => name.startsWith(prefix)) );
        const IDsWithoutL10N = new Set();
        const IDsNeedingL10N = new Set( actions.getAllDefaultActions().map(a => getDefaultActionNameStringId(a.name)) );
        IDsWithL10N.delete(getDefaultActionNameStringId("options"));  // Not relevant here
        for (const id of IDsNeedingL10N) {
            if (!IDsWithL10N.has(id))    // Check if default action has L10N
                IDsWithoutL10N.add(id);  // If not, then move it to the set tracking that
            IDsWithL10N.delete(id);      // Then, remove from the set with pending string names to check
        }
        // At this point, 'IDsWithoutL10N' has names missing L10N and 'IDsWithL10N' has the remaining names with unused L10N
        if (IDsWithoutL10N.size)  // NOTE: This doesn't catch strings missing in only some locales
            console.warn("Flagfox L10N debug warning; current default actions with missing strings:\n", IDsWithoutL10N);
        if (IDsWithL10N.size)
            console.warn("Flagfox L10N debug warning; obsolete default actions with leftover strings:\n", IDsWithL10N);
        if (!IDsWithoutL10N.size && !IDsWithL10N.size)
            console.log("Flagfox L10N debug check complete for default action names: no issues found");
    });
}));

//}}}
//BEGIN UI STRING FETCHING ****************************************************
//{{{

// CAUTION: Getting sync before loading the needed file returns undefined
function getLoadedString(stringName) {  // NOTE: Needs to be defined with function or var, rather than const or let, for access via browser.extension.getBackgroundPage()
    return strings.get(stringName);
}

// Fetch string(s) async with lazy load of whichever file(s) are needed
// Takes a string name string/array and returns a promise that resolves to the corresponding value(s') string/array (array is same length and order)
// NOTE: Automatically falls back to the default locale (English) for all missing strings
function getString(stringNames)
{
    const one = !isArray(stringNames);  // Can take one string name or an array of them
    if (one)
        stringNames = [stringNames];
    assert(isNonEmptyArray(stringNames) && isNonEmptyString(stringNames[0]), "getString() requires a string or string array argument!", stringNames);
    return lazyLoadPropertiesFile(listFilesNeededForStrings(stringNames))  // Load needed files, with automatic English fallback (if any)
          .then(() => {
              const stringValues = stringNames.map(getLoadedString);
              return Promise.resolve(one ? stringValues[0] : stringValues);  // Resolve with one string value or array of them
          })
          .catch(e => console.error("error getting string(s):", e, stringNames));
}

// Fetch async with lazy load of whichever file is needed
// Takes a string name and an arbitrary number of parameters to replace placeholders with, and returns promise that resolves to the formatted value
// NOTE: Automatically falls back to the default locale (English) for all missing strings (handled in getString())
// (This is only needed for a grand total of one string, at the moment, so if more are ever needed, this will need a bit more TESTING)
function getStringF(stringName, stringParams=[])  // Takes a string name and zero or more values to replace placeholders, in the order matching their placeholder IDs
{
    assert(isNonEmptyString(stringName), "getStringF() requires a string argument!", stringName, stringParams);  // Only one at a time, here
    debugAssert(isArray(stringParams), "getStringF() requires an array of string parameters!", stringName, stringParams);  // This'll just act like getString() if missing
    return getString(stringName).then(stringValue => {
        for (let [i,p] of stringParams.entries())
            stringValue = stringValue.replace("%"+String(i+1)+"$S", p);  // Not sure why this file format was designed like this, but whatever...
        return Promise.resolve(stringValue);
    })
    .catch(e => console.error("error parsing string:", e, stringName, stringParams));
}

function getFullCountriesList() {  // Gets array of all country codes & names (in current locale, with fallback)
    return lazyLoadPropertiesFile("countrynames").then(() => {
        let output = [];
        for (let [key,value] of strings)
            if (key.length === 2)  // Two character string names are all country IDs
                output.push([key,value]);
        return Promise.resolve(output);
    });
}

//}}}
//BEGIN UI STRING INSERTION ***************************************************
//{{{

// NOTE: This function MUST be called on load of all HTML pages to load/fetch the needed strings and do the find/replace to insert them into the document
// XUL could actually do its own I18N, automatically... easily; HTML is garbage with this, in comparison
function loadPageI18N(document)  // Returns a promise
{
    function loadType(dataType)
    {
        const i18n_attributeName = "data-i18n" + (dataType ? "-"+dataType : "");
        const setter = ((element, value) => {
            element.removeAttribute(i18n_attributeName);
            if (dataType)
                element.setAttribute(dataType, value);
            else
                element.textContent = value;
        });
        let trees = [document];
        for (let template of document.getElementsByTagName("template"))  // Templates are not returned in a querySelector call unless explicitly done within its content
            trees.push(template.content);
        let elements = []
        let stringNames = [];
        for (let tree of trees) {
            for (let element of tree.querySelectorAll("["+i18n_attributeName+"]")) {
                elements.push(element);
                stringNames.push(element.getAttribute(i18n_attributeName));
            }
        }
        if (!stringNames.length)  // There may or may not be strings of the given type for this document
            return Promise.resolve();
        return getString(stringNames).then(stringValues => {
            for (let i in stringValues)
                setter(elements[i], stringValues[i]);
        });
    }

    // Apparently, this needs to be done manually, which I guess makes sense, as nothing else I18N works out-of-the-box, either
    document.documentElement.setAttribute("dir", LocaleInfo.flagfox_textDir);  // Sets the text direction attribute on the <html> element based on locale

    // Returns a promise that completes when all three sets are loaded for main elements and within templates
    return Promise.all([
        loadType(""),            // text contents          [string name in data-i18n attribute]
        loadType("title"),       // tooltips               [string name in data-i18n-title attribute]
        loadType("placeholder")  // form field empty text  [string name in data-i18n-placeholder attribute]
    ]);
}

//}}}
