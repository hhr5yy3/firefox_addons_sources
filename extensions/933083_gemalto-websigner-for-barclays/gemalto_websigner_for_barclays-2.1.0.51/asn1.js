// Converts an uint8 array to string
function Uint8ToString(u8a) {
    var CHUNK_SZ = 0x8000;
    var c = [];
    for (var i = 0; i < u8a.length; i += CHUNK_SZ) {
        c.push(String.fromCharCode.apply(null, u8a.subarray(i, i + CHUNK_SZ)));
    }
    return c.join("");
}

function TypeToString(type) {
    switch (type) {
        case 0x01:
            return 'BOOLEAN';
        case 0x02:
            return 'INTEGER';
        case 0x03:
            return 'BIT STRING';
        case 0x04:
            return 'OCTET STRING';
        case 0x05:
            return 'NULL';
        case 0x06:
            return 'OID';
        case 16:
            return 'SEQUENCE (OF)';
        case 17:
            return 'SET (OF)';
        case 19:
            return 'PrintableString';
        case 20:
            return 'TeletexString';
        case 22:
            return 'IA5String';
        case 23:
            return 'UTCTime';
        default:
            return 'unknown (' + type + ')';
    }
}

var cPKCS7DataOID = '1.2.840.113549.1.7.1';

// finds PKCS#7 data in the given tree (parsed ASN.1)
function FindPKCS7Data(tree) {
    if (typeof (tree.children) !== 'undefined') {
        // looking for a child PKCS#7 data OID
        if ((tree.children[0].type == 0x06) && (ParseOID(tree.children[0].value) == cPKCS7DataOID)) {
            // PKCS#7 data should be the first child of its first sibling
            if (tree.children.length > 1 && typeof (tree.children[1].children) !== 'undefined') {
                // TODO: appropriate log message here
                return tree.children[1].children[0].value;
            }
        }

        for (var i = 0; i < tree.children.length; i++) {
            var result = FindPKCS7Data(tree.children[i]);
            if (typeof (result) !== 'undefined') {
                return result;
            }
        }
    }
}

function PrintTree(tree, indent) {
    if (typeof (tree) !== 'undefined') {
        var str = '';
        for (var i = 0; i < indent; i++) {
            str += ' ';
        }
        str += '[' + tree.tlLength + '+' + tree.length + ']' + TypeToString(tree.type);
        if (tree.type == 0x06) {
            str += '(' + ParseOID(tree.value) + ')';
        }
        console.log(str);
    }
    if (typeof (tree.children) !== 'undefined') {
        for (var i = 0; i < tree.children.length; i++) {
            PrintTree(tree.children[i], indent + 1);
        }
    }
}

// converts the given binary data into a OID string
function ParseOID(data) {
    var str = '';

    if (data.length == 0) {
        return;
    }

    // first octet (first 2 values)
    str = (data[0] - (data[0] % 40)) / 40 + '.';
    str += data[0] % 40;

    // the remaining octets
    var i = 1;
    var value = 0;
    while (i < data.length) {
        value = (value * 0x80) + (data[i] & 0x7F);
        if (data[i] < 0x80) {
            str += '.' + value;
            value = 0;
        }
        i++;
    }
    return str;
}

function ParseB64DER(base64Data) {
    var decoded;
    try {
        decoded = atob(base64Data);
    } catch (e) {
        // not using wrong_parameter: very usual and specific error case
        errorHandler("WRONG_INPUT_DATA", {
            parameter: "in_data or in_data_url",
            reason: "verify mode requires base64 encoded input"
        });
    }

    var tree = {};
    var data = new Uint8Array(decoded.length);
    for (var i = 0; i < data.length; i++) {
        data[i] = decoded.charCodeAt(i);
    }
    ParseDER(tree, data);
    // PrintTree(tree, 0);

    return tree;
}

function ParseDER(parentNode, data) {
    parentNode.children = [];
    var parsedLength = 0;
    while (true) {
        var fields = GetTLVFields(data.subarray(parsedLength));
        // add to the tree
        parentNode.children.push(fields);
        // if it is constructed, go deeper
        if (fields.constructed) {
            ParseDER(parentNode.children[parentNode.children.length - 1], fields.value);
        }
        parsedLength += fields.tlLength + fields.length;
        // if at the end of the current data, return
        if (parsedLength >= data.length) {
            // parsing done
            return;
        }
    }
}

function GetTLVFields(data) {
    // read tag and decompose
    var tag = data[0];
    var type = tag & 0x1F;
    var constructed = (tag & 0x20) ? true : false;
    var typeClass = tag >> 6;

    // read length
    var length = 0;
    var i = 0;
    // check first octet for multi-octet length
    if (data[1] < 128) {
        length = data[1];
        i++;
    } else {
        for (; i < data[1] - 128; i++) {
            length = length * 256 + data[1 + i + 1];
        }
        i++;
    }

    tlLength = i + 1;

    // read value
    var value = data.subarray(tlLength, tlLength + length);

    return {tag: tag, type: type, constructed: constructed, typeClass: typeClass, tlLength: tlLength, length: length, value: value};
}
