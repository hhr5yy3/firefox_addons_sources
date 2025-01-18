"use strict";

const name_maxlength = 32;
const line_maxlength = 1024;

const nameless_template_generic_label = "(?)";

const importableTypes = ["text/x-moz-url", "text/plain", "text/html", "application/xml", "Files"];  // Understood types, in order of preference (not counting JSON)

//BEGIN IMPORT DATA PARSING ***************************************************
//{{{

function parsableMimeTypes(dataTransfer) {
    return importableTypes.filter(mimeType => dataTransfer.types.includes(mimeType));
}

function ensureAllValid(parsed) {
    parsed = parsed.filter(a => (isNonEmptyString(a.template) && a.custom));
    for (let entry of parsed) {  // If a list was found, make sure everything has a name of some kind so it can be added to the list as-is, without errors
        if (!entry.name) {
            entry.name = Flagfox.getHostForActionTemplate(entry.template);  // If no name, try finding a host name
            if (!entry.name)
                entry.name = nameless_template_generic_label;  // If that fails, use a generic placeholder
        }
    }
    return parsed;
}

function parseTemplateList_Text(text)  // Parse a text blob with lines containing action templates, with a non-template line preceding it considered to be its name
{
    // Clean all lines and filter for the ones that have useable content
    const lines = text.split("\n").map(a => cleanImportedLine(a)).filter(Boolean);

    let parsed = [], WIP, firstURL;
    while (lines.length)
    {
        WIP = parsed[parsed.length-1];                 // Last entry in parsed array is the current work in progress (WIP)
        if (!WIP || WIP.template)                      // It's done once we find a template for it
            parsed.push(WIP = new CustomAction());
        let line = lines.shift();                      // Remove and return current lines[0]
        if (!firstURL && containsURL(line))            // Remember the first URI in this list, in case nothing else usable is found
            firstURL = decodeURI(line);
        if (containsTemplateText(line))                // If it's a template, then add it to the now-completed action entry
            WIP.template = safeDecodeURI(line);
        else
            WIP.name = line.substr(0,name_maxlength);  // If it's not a template, assume it might be a name and add it to the WIP
    }

    if (!WIP.template)  // If no template was found for the last entry, then drop it
        parsed.pop();

    if (parsed.length === 0 && firstURL)  // If no template was found, but there was a URL in there, return that as a starting point
        return [new CustomAction(null,firstURL)];

    return ensureAllValid(parsed);  // Returns zero or more parsed action entries, with names added in, if needed
}

function parseTemplateList_JSON(text)  // NOTE: This will throw at some point if passed something that isn't parsable JSON
{
    debugLog("Attempting to parse and import from JSON into Flagfox...");

    const prefname = Flagfox.actions.prefname;

    let obj = JSON.parse(text);  // Plain object or array, depending on format

    let format = null;
    if (isObject(obj) && isNonEmptyString(obj[prefname])) {
        format = "pref store";
    } else if (isNonEmptyArray(obj)) {
        const entry0 = obj[0];
        if (isNonEmptyArray(entry0) && isNonEmptyString(entry0[0]))
            format = "packed list";
        else if (isObject(entry0) && isNonEmptyString(entry0.template))
            format = "full list";
    }

    switch (format) {
        default:
            throw "Unrecognized JSON format";

        case "pref store":
            debugLog("extracting from pref store...");
            text = obj[prefname];  // Text is the extracted packed list, to be handled below
            /*### FALLTHROUGH ###*/

        case "packed list":
            debugLog("unpacking pref list...");
            obj = Flagfox.unpackActionsJSON(Flagfox.actions.getAllDefaultActions(), text, false);  // Convert from packed to full list, then do the rest below
            /*### FALLTHROUGH ###*/

        case "full list":
            debugLog("importing from actions list...");
            return ensureAllValid(obj.map(a => new CustomAction(a.name, a.template)));  // Import all as new custom actions (only name and template, at this point; TODO: more?)
    }
}

function parseData(mimeType, data)  // Takes a mimeType string and either a string or dataTransfer as data to parse from, and returns an array of zero or more action objects
{
    if (!isString(data))
        data = data.getData(mimeType);  // Data is a dataTransfer object

    debugLog("Attempting to parse and import \""+mimeType+"\" into Flagfox:\n", data);

    switch (mimeType)
    {
        case "text/x-moz-url":  // Mozilla URL+name format (URL is first line)
            const lines = data.split("\n");
            if (lines.length === 2 && containsURL(lines[0]))
                return [new CustomAction(lines[1], lines[0])];
            return [];

        case "application/json":
        case "text/plain":  // Everything else; actions to action lists to giant piles with actions somewhere in them to anything with maybe a URL in it
            try   { return parseTemplateList_JSON(data); }  // Try JSON first
            catch { return parseTemplateList_Text(data); }  // Try plain text if not JSON

        case "application/xml":
        case "text/html":  // HTML/XML (just try to grab the first link)
            const link = parseFirstXMLAnchor(data, mimeType);
            if (containsURL(link.href))
                return [new CustomAction(link.text, link.href)];
            return [];

        case "Files":  // File read is async, so it gets handled differently and then its data gets sent here, instead
            throw "File needs reading prior to calling parseData()";

        default:
            throw "Invalid type passed to parseData()";
    }
}

//}}}
//BEGIN DATA HELPER FUNCTIONS *************************************************
//{{{

const testLeadingBullet = (/^[\s*#@>&\-=+.:]*/);
const testTemplateText = (/\{(fullurl|(base)?domainname|tld|ipaddress|country(code|name)|title|(base)?locale|meta)(-.*)?\}/i);
const testBasicURL = (/(https?:\/\/|www\.)[^\s'"`<>(){}[\]]+/i);  // Loose, but just want to exclude obvious non-URLs

function CustomAction(name, template) {  // Simple custom action object constructor
    this.custom = true;
    if (name)
        this.name = cleanImportedLine(name, name_maxlength);
    if (template)
        this.template = safeDecodeURI(cleanImportedLine(template));
}

function cleanImportedLine(line, cap=line_maxlength) {  // Trim off leading/trailing spaces as well as any leading bullets
    return line.replace(testLeadingBullet,"").trimRight().substr(0,cap);
}

function containsTemplateText(text) {  // Returns true if somewhere in the given data is at least one template placeholder
    return testTemplateText.test(String(text));
}

function containsURL(text) {
    return testBasicURL.test(safeDecodeURI(text));
}

function containsImportableText(text) {
    debugLog("Checking for importable text:\n", text);
    return containsTemplateText(text) || containsURL(text);
}

function safeDecodeURI(uri) {  // Try to decode URI, but if it throws (malformed URI) then just leave it as-is
    try { return decodeURI(uri); }
    catch { return uri; }
}

function parseFirstXMLAnchor(data, mimeType) {
    try {
        const firstLink = (new DOMParser()).parseFromString(data, mimeType)
                                           .getElementsByTagName("a")[0];
        return { text: firstLink.innerText, href: safeDecodeURI(firstLink.getAttribute("href")) };
    } catch {
        return {};
    }
}

//}}}
