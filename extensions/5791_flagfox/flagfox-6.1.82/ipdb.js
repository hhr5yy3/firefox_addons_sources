"use strict";  // Use ES5 strict mode for this file (within this scope)

// ATTENTION: This is a JS worker file, to be loaded with a dedicated context in a new thread.
// See: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Functions_and_classes_available_to_workers

importScripts("util.js");

//BEGIN IPDB FILE FORMAT DOCUMENTATION ****************************************
//{{{
/*  NOTE:
 *  For IPv4 the full 32-bit address is used. For IPv6 the 48-bit prefix of the 128-bit address is used. (cannot use full 64-bit prefix due to JS limitations)
 *  Each integer is big-endian binary packed: 4 bytes for each full IPv4 address & 6 bytes for each IPv6 address prefix.
 *  All IPs/prefixes must be included with unknown/unallocated ranges listed as code "??".
 *  Each IPDB has two typed arrays: the complete ordered list of start IPs/prefixes & the corresponding ordered list of country codes.
 *  In the uncompressed file format, these two lists can simply be concatenated together, but it's possible to pack this far more efficiently.
 *  In the compressed file format used in this version, ranges are stored as a series of range widths instead of absolute starting values.
 *  The list can be translated back into range starting values by counting up from zero by each range width, in order.
 *  IP address blocks are allocated in a relatively small number of sizes, so this information can be compressed down by assigning each one an ID.
 *  Likewise, there's a fixed number of country codes. The codes are two byte strings, however there are fewer than 256, so a one byte ID is sufficient.
 *  The one byte country code IDs are converted into two byte country code strings via the "IPDBmetadata.countryIDs" array in metadata.json.
 *  Total IPDB files size reductions are around 53%; after XPI/ZIP compression about 51%; up to 65% or so with a bad compressor (e.g. Mozilla's addon code signer)
 *  Overall, the Flagfox XPI file size is in the vicinity of a third smaller with this format (~300kB saved in the case of an AMO repack).
 *
 *  The compressed file has this information packed in the following format:
 *      [entries count][rangewidthsdict length][rangewidthsdict...][rangewidthsIDs...][codesIDs...]
 *         (4 bytes)          (2 bytes)         (bytesPerInt ea.)    (2 bytes ea.)    (1 byte ea.)
 */
//}}}
//BEGIN IPDB METADATA AND LOADING *********************************************
//{{{

const IPv4DB = { type : "IPv4", filename : "ip4.cdb", bytesPerInt : 4, maxInt : 0xffffffff };
const IPv6DB = { type : "IPv6", filename : "ip6.cdb", bytesPerInt : 6, maxInt : 0xffffffffffff };
const IPDBmetadata = { filename : "metadata.json" };

function load(db) {  // Returns a promise
    if (Object.is(db, IPDBmetadata)) {
        return fetch("/ipdb/"+IPDBmetadata.filename)
               .then(response => response.json())
               .then(data => loadIPDBmetadataJSON(data))
               .catch(e => {
                   console.error("IPDB METADATA LOAD ERROR:", e, IPDBmetadata);
                   throw e;
               });
    } else {
        return Promise.all([
                   fetch("/ipdb/"+db.filename),
                   autoload(IPDBmetadata)
               ])
               .then(([response]) => response.arrayBuffer())
               .then(data => loadCompressedIPDBdata(db, data))
               .catch(e => {
                   console.error("IPDB LOAD ERROR:", e, db);
                   throw e;
               });
    }
}

function unload(obj) {  // TODO: use
    const loadlessKeys = ["type","filename","bytesPerInt","maxInt","handleRequest"];
    Object.keys(obj)
          .forEach(key => {
              if (!loadlessKeys.includes(key))
                  delete obj[key];
          });
}

function autoload(obj) {  // Returns a promise that resolves after the object is loaded (and queues or waits, as needed)
    switch (obj.loadstate) {
        case undefined:  // Unloaded
            obj.loadstate = false;
            return load(obj).then(() => void (obj.loadstate = true));
        case false:      // Loading
            return wait(() => (obj.loadstate === true));
        case true:       // Loaded
            return Promise.resolve();
        default:
            throw new Error("invalid loadstate!");  // Unreachable
    }
}

[IPv4DB, IPv6DB, IPDBmetadata].forEach(obj =>
    (obj.handleRequest =
        (request =>
            (autoload(obj).then(() =>
                handlePendingRequest(request))
            )
        )
    )
);

//}}}
//BEGIN REQUEST HANDLING ******************************************************
//{{{

// Requests/responses are in the form of:  { ip_str, ip_int, code, meta }; only ip_str is sent in the input request
this.onmessage = function(msg) {  // NOTE: Worker global message handler
    try {
        const request = parseRequest(msg.data);
        request.db.handleRequest(request)  // All files async load automatically on first use
                  .catch(e => requestError(request,"handling",e));
    }
    catch (e) { requestError(request,"parsing",e); }
};

function handlePendingRequest(request) {
    try {
        request = makeOutputSafe(request.meta ? getMetadata(request)
                                              : searchDB(request));
        postMessage(request);  // Send response back to main.js
    }
    catch (e) { requestError(request,"output",e); }
}

function appendParsedData(request, db, ip, code) {
    request.db = db;
    request.ip_int = ip;
    request.code = code;
    return request;  // NOTE: makeOutputSafe(request) required before sending it as a response
}

function appendCode(request, code) {
    request.code = code;
    return request;
}

function makeOutputSafe(request) {
    delete request.db;      // WARNING: Trying to send this ref will make it want to send the entire data buffers and explode
    delete request.ip_int;  // Not used outside of here, so don't bother sending
    return request;
}

function requestError(request, type, error) {
    console.error("Flagfox IPDB request "+type+" error:", error, request);
}

//}}}
//BEGIN REQUEST PARSING *******************************************************
//{{{

function parseRequest(request)
{
    if (request.meta)  // Request for metadata; not IP lookup
        return appendParsedData(request, IPDBmetadata);

    //assert(isNonEmptyString(request.ip_str), "request with missing/invalid IP string received by IPDB!", request);

    // IPv6 uses colons and IPv4 uses dots
    if (!request.ip_str.includes(":"))
        return appendParsedData(request, IPv4DB, IPv4StringToInteger(request.ip_str));  // Look up normal IPv4 address

    if (request.ip_str === "::1")  // IPv6 Localhost (prefix is zero, so can't use IPv6 prefix DB)
        return appendParsedData(request, IPv6DB, 1, "-L");

    if (request.ip_str.includes("."))  // IPv4 address embedded in an IPv6 address using mixed notation (e.g. "::ffff:" or "::" followed by standard IPv4 notation)
        return appendParsedData(request, IPv4DB, IPv4StringToInteger(request.ip_str.suffixAfter(":")));

    const longIPv6String = expandIPv6String(request.ip_str);  // Full IPv6 notation in use; expand all shorthand to full 32 char hex string

    for (const rule of IPv4inIPv6rules)  // Look for tunneling and embedded IPv4 to IPv6 address types
        if (longIPv6String.startsWith(rule.prefix))
            return appendParsedData(request, IPv4DB, rule.extractIPv4Integer(longIPv6String));

    return appendParsedData(request, IPv6DB, hexStringToInteger(longIPv6String.substr(0,12)));  // Look up normal IPv6 address prefix (48 bits = 6 bytes = 12 hex chars)
}

function getMetadata(request)  // The ability to request each piece of metadata individually wasn't worth it; just send all 3 bits on startup
{
    assert(request.meta, "getMetadata got passed a non-metadata request!", request);
    const cdate = new Date(IPDBmetadata.created);
    request.meta = {
        // Gets a version/date string in the form of YYYY-M (NOTE: JS months are 0-11, just to be confusing)
        version : cdate.getUTCFullYear() + "-" + (cdate.getUTCMonth()+1),
        // Gets the total number of days since this IPDB file was created
        age     : Math.floor((Date.now() - IPDBmetadata.created) / 86400000),
        // Truncated HMAC authenticating the Flagfox/IPDB versions (for Geotool cookie)
        hmac    : IPDBmetadata.hmac
    };
    return request;
}

//}}}
//BEGIN IP STRING PARSING *****************************************************
//{{{

function decStringToInteger(string) { return parseInt(string, 10); }
function hexStringToInteger(string) { return parseInt(string, 16); }

function IPv4StringToInteger(ipString)
{
    const octets = ipString.split(".").map(decStringToInteger);
    assert(octets.length === 4, "invalid IPv4 address string!");
    return ((octets[0] << 24) | (octets[1] << 16) | (octets[2] << 8) | octets[3]) >>> 0;  // '>>> 0' forces read as unsigned integer (JS messes it up, otherwise)
}

function expandIPv6String(ipString)  // Expands an IPv6 shorthand string into its full long version (32 char hex string)
{
    const blocks = ipString.toLowerCase().split(":"), block0 = "0000";
    for (let i=0; i<blocks.length; i++) {
        if (blocks[i].length === 0) {  // Expand collapsed zeroes blocks
            blocks[i] = block0;
            while (blocks.length < 8)
                blocks.splice(i,0,block0);
        } else while (blocks[i].length < 4)  // Add leading zeroes as needed
            blocks[i] = "0" + blocks[i];  // NOTE: This is actually still faster than the new JS string padding built-ins, here
    }
    const expanded = blocks.join("");  // Rejoined without ":" notation
    assert(blocks.length === 8 && expanded.length === 32, "invalid IPv6 address string!");
    return expanded;
}

const IPv4inIPv6rules =  // List of methods by which an IPv4 counterpart to an IPv6 address can be determined
[
    {   // IPv4 embedded IPv6 addresses not using mixed notation -> last 32-bits is IPv4 address
        prefix : "00000000000000000000",
        extractIPv4Integer(ipString) {
            const block6 = ipString.substr(20,4);
            if (block6 === "ffff" || block6 === "0000")
                return hexStringToInteger(ipString.substr(24,8));
            return null;  // IPv6 prefix is zero (reserved/special IP range)
        }
    },
    {   // Another prefix used for embedding -> last 32-bits is IPv4 address
        prefix : "0064ff9b",
        extractIPv4Integer(ipString) {
            return hexStringToInteger(ipString.substr(24,8));
        }
    },
    {   // "6to4" tunneling address -> next 32-bits is IPv4 address
        prefix : "2002",
        extractIPv4Integer(ipString) {
            return hexStringToInteger(ipString.substr(4,8));
        }
    },
    {   // "Teredo" tunneling address -> bitwise not of last 32-bits is IPv4 address
        prefix : "20010000",
        extractIPv4Integer(ipString) {
            return ~hexStringToInteger(ipString.substr(24,8));
        }
    }
];

//}}}
//BEGIN IPDB FILE LOADING/DECOMPRESSION ***************************************
//{{{

function loadIPDBmetadataJSON(data) {
    assert(isIntegerInRange(data.created, Date.parse("2018"), Date.now()), "missing/invalid IPDB timestamp!", data);
    assert(isNonEmptyString(data.hmac, 8), "missing/invalid metadata HMAC!", data);

    data.countryIDs = data.countryIDs.splitChunks(2);  // Stored as string blob; convert to array
    Object.assign(IPDBmetadata, data);                 // Copy all properties from data on to IPDBmetadata
}

function loadCompressedIPDBdata(db, data)
{
    assert(isObject(IPDBmetadata.size), "can't load IPDB data without loaded metadata", db);
    assert(data instanceof ArrayBuffer && data.byteLength, "missing/invalid data received on attempt to load " + db.filename);
    assert(data.byteLength === IPDBmetadata.size[db.type],
           db.filename + " or " + IPDBmetadata.filename + " is corrupt (got " + data.byteLength + " bytes but expected " + IPDBmetadata.size[db.type] + " bytes)");

    let pos = 0;
    function newFastDataView(length, intbytes) {
        const size = (intbytes>1) ? length*intbytes : length ;
        const view = new FastDataViewUBE(data,pos,size,intbytes);  // New typed array view of 'size' length starting at 'pos' in buffer 'data'
        pos += size;                                               // Position in 'data' is now at 'pos' bytes
        return view;
    }

    // Create a set of typed array interfaces mapped to sections of the file's data buffer (big-endian packed)
    const header = newFastDataView(6);
    const entries = header.getUint32(0);                                            // 4 byte entries count
    const rangewidthsdictlength = header.getUint16(4);                              // 2 byte range width dictionary length
    const rangewidthsdict = newFastDataView(rangewidthsdictlength,db.bytesPerInt);  // range width dictionary: 4 or 6 bytes each, depending on IP version
    const rangewidthIDs = newFastDataView(entries,2);                               // range width ID list: 2 bytes each (one for each entry)
    const codeIDs = newFastDataView(entries,1);                                     // country code ID list: 1 byte each (one for each entry)
    assert(pos === data.byteLength, db.filename + " read error (got " + data.byteLength + " bytes from file but data is " + pos + " bytes)");

    // Now that we have views on the compressed data, create an array to hold the decompressed data (native-endian typed-array for simplicity)
    // Float64Array can't hold a 64-bit integer, but it can hold a 48-bit integer just fine
    const rangeIPs = new (db.bytesPerInt==4 ? Uint32Array : Float64Array)(entries);

    // The 8-bit codes can be converted to strings as-needed; just copy into a new array (to not keep the whole file loaded)
    const rangeCodes = new Uint8Array(codeIDs.bytes);

    // HACK: Here I invoke black magic that should not exist... Isolating the hot loop in its own function forces the JIT to focus and doubles its speed.
    (function(){
        // Finally, read and decompress the ranges; each integer is the last integer plus the width of the range (starting from zero)
        let lastIP = 0;
        for (let i=0; i<entries; i++)
            rangeIPs[i] = (lastIP += rangewidthsdict.get(rangewidthIDs.get(i)));
    })();
    // With the optimizations used here, and avoidance of slow JS built-ins like DataView, decompress time is quick. (around 2ms on recent HW; 5ms on old)

    db.entryCount = entries;
    db.rangeIPs   = rangeIPs;
    db.rangeCodes = rangeCodes;
    // Compressed file data and its views are garbage collected after this point
}

//}}}
//BEGIN CORE SEARCH FUNCTION **************************************************
//{{{

// Converts a uint8 code to a 2 char string code (0="??" is code for unknown and returns null)
const countryCode8toString = (code8 => (code8 ? IPDBmetadata.countryIDs[code8] : null));

function searchDB(request)
{
    const { db: { maxInt, entryCount, rangeIPs, rangeCodes }, ip_int: int, code: early_code } = request;
    if (early_code)  // If there's already a code, then the parser caught it early, so just bounce it back
        return request;

    assert(isIntegerInRange(int, 0, maxInt), "invalid IP integer");

    // Do a binary search loop to find given integer in ordered list of ranges
    let min = 0;
    let max = entryCount-1;
    let mid;
    while (min <= max)
    {
        mid = Math.floor((min + max) / 2);
        if (int < rangeIPs[mid])
            max = mid - 1;
        else if (int >= rangeIPs[mid+1])  // The next number is the start of the next range; not part of this range
            min = mid + 1;
        else  /* range1start <= int && int < range2start */
            return appendCode(request, countryCode8toString(rangeCodes[mid]));
    }
    return appendCode(request, null);
}

//}}}
//BEGIN OPTIMIZED DATA STRUCTURE **********************************************
//{{{

/*  NOTE:
 *  The type-specific arrays (e.g. Uint32Array) are native-endian only and require alignment in the buffer. DataView can work with either endianness from any point in a buffer.
 *  However, the performance of DataView is currently horrible. (see Mozilla bug 1065894) The below shouldn't be ideal, but it's actually much faster than the built-in DataView.
 *  Implementing it like this also makes it easier to add support for 48-bit integers and a better API for reading. (JS Proxy() is too slow to add '[]' syntax, though)
 *  As optimizations for use here, only unsigned big-endian getters are implemented. (for little-endian, reverse 'abcdef' to 'fedcba' when assembling)
 *  Note that you would think a Uint16Array or Uint32Array on a system with endianness matching the file would be faster than the byte fiddling below. It is not.
 */
function FastDataViewUBE(buffer, offset, size, bytesPerInt) {
    this.bytes = new Uint8Array(buffer, offset, size);
    switch (bytesPerInt) {
        case 2:  this.get = (i => this.getUint16(i*2));  return;
        case 4:  this.get = (i => this.getUint32(i*4));  return;
        case 6:  this.get = (i => this.getUint48(i*6));  return;
    }
}

FastDataViewUBE.prototype =
{
    getUint8(offset) {
        return this.bytes[offset];
    },
    getUint16(offset) {
        const bytes = this.bytes;
        const a = bytes[offset];
        const b = bytes[offset + 1];
        return ((a << 8) | b);
    },
    getUint32(offset) {
        const bytes = this.bytes;
        const a = bytes[offset];
        const b = bytes[offset + 1];
        const c = bytes[offset + 2];
        const d = bytes[offset + 3];
        return ((a << 24) | (b << 16) | (c << 8) | d) >>> 0;  // '>>> 0' forces read as unsigned; left shifts >31 bits alter the sign (JS has no '<<<')
    },
    getUint48(offset) {
        return this.getUint16(offset)*0x100000000 + this.getUint32(offset+2);  // JS cannot bitshift past 32 bits; read in two chunks and combine
    }
};

//}}}
