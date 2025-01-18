function newTab(url)
{
    chrome.tabs.create({ url: url });
}

function rand(min, max)
{
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getTime()
{
    return Math.floor(Date.now() / 1000);
}

function parseJson(data, showError)
{
    try
    {
        return JSON.parse(data);
    }
    catch (e) { }

    return null;
}

// string sprintf
var __sprintf_cache = Object.create(null)
var __sprintfDefines = {
    not_string: /[^s]/,
    not_bool: /[^t]/,
    not_type: /[^T]/,
    not_primitive: /[^v]/,
    number: /[diefg]/,
    numeric_arg: /[bcdiefguxX]/,
    json: /[j]/,
    not_json: /[^j]/,
    text: /^[^\x25]+/,
    modulo: /^\x25{2}/,
    placeholder: /^\x25(?:([1-9]\d*)\$|\(([^)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,
    key: /^([a-z_][a-z_\d]*)/i,
    key_access: /^\.([a-z_][a-z_\d]*)/i,
    index_access: /^\[(\d+)\]/,
    sign: /^[+-]/
}
function sprintf(key)
{
    // `arguments` is not an array, but should be fine for this call
    try
    {
        return __sprintf_format(__sprintf_parse(key), arguments)
    }
    catch (e)
    {
        return null;
    }
}
function vsprintf(fmt, argv)
{
    return sprintf.apply(null, [fmt].concat(argv || []))
}
function __sprintf_format(parse_tree, argv)
{
    var cursor = 1, tree_length = parse_tree.length, arg, output = '', i, k, ph, pad, pad_character, pad_length,
        is_positive, sign
    for (i = 0; i < tree_length; i++)
    {
        if (typeof parse_tree[i] === 'string')
        {
            output += parse_tree[i]
        }
        else
            if (typeof parse_tree[i] === 'object')
            {
                ph = parse_tree[i] // convenience purposes only
                if (ph.keys)
                { // keyword argument
                    arg = argv[cursor]
                    for (k = 0; k < ph.keys.length; k++)
                    {
                        if (arg == undefined)
                        {
                            throw new Error(sprintf('[sprintf] Cannot access property "%s" of undefined value "%s"', ph.keys[k], ph.keys[k - 1]))
                        }
                        arg = arg[ph.keys[k]]
                    }
                }
                else
                    if (ph.param_no)
                    { // positional argument (explicit)
                        arg = argv[ph.param_no]
                    }
                    else
                    { // positional argument (implicit)
                        arg = argv[cursor++]
                    }

                if (__sprintfDefines.not_type.test(ph.type) && __sprintfDefines.not_primitive.test(ph.type) && arg instanceof Function)
                {
                    arg = arg()
                }

                if (__sprintfDefines.numeric_arg.test(ph.type) && (typeof arg !== 'number' && isNaN(arg)))
                {
                    throw new TypeError(sprintf('[sprintf] expecting number but found %T', arg))
                }

                if (__sprintfDefines.number.test(ph.type))
                {
                    is_positive = arg >= 0
                }

                switch (ph.type)
                {
                    case 'b':
                        arg = parseInt(arg, 10).toString(2)
                        break
                    case 'c':
                        arg = String.fromCharCode(parseInt(arg, 10))
                        break
                    case 'd':
                    case 'i':
                        arg = parseInt(arg, 10)
                        break
                    case 'j':
                        arg = JSON.stringify(arg, null, ph.width ? parseInt(ph.width) : 0)
                        break
                    case 'e':
                        arg = ph.precision ? parseFloat(arg).toExponential(ph.precision) : parseFloat(arg).toExponential()
                        break
                    case 'f':
                        arg = ph.precision ? parseFloat(arg).toFixed(ph.precision) : parseFloat(arg)
                        break
                    case 'g':
                        arg = ph.precision ? String(Number(arg.toPrecision(ph.precision))) : parseFloat(arg)
                        break
                    case 'o':
                        arg = (parseInt(arg, 10) >>> 0).toString(8)
                        break
                    case 's':
                        arg = String(arg)
                        arg = (ph.precision ? arg.substring(0, ph.precision) : arg)
                        break
                    case 't':
                        arg = String(!!arg)
                        arg = (ph.precision ? arg.substring(0, ph.precision) : arg)
                        break
                    case 'T':
                        arg = Object.prototype.toString.call(arg).slice(8, -1).toLowerCase()
                        arg = (ph.precision ? arg.substring(0, ph.precision) : arg)
                        break
                    case 'u':
                        arg = parseInt(arg, 10) >>> 0
                        break
                    case 'v':
                        arg = arg.valueOf()
                        arg = (ph.precision ? arg.substring(0, ph.precision) : arg)
                        break
                    case 'x':
                        arg = (parseInt(arg, 10) >>> 0).toString(16)
                        break
                    case 'X':
                        arg = (parseInt(arg, 10) >>> 0).toString(16).toUpperCase()
                        break
                }
                if (__sprintfDefines.json.test(ph.type))
                {
                    output += arg
                }
                else
                {
                    if (__sprintfDefines.number.test(ph.type) && (!is_positive || ph.sign))
                    {
                        sign = is_positive ? '+' : '-'
                        arg = arg.toString().replace(__sprintfDefines.sign, '')
                    }
                    else
                    {
                        sign = ''
                    }
                    pad_character = ph.pad_char ? ph.pad_char === '0' ? '0' : ph.pad_char.charAt(1) : ' '
                    pad_length = ph.width - (sign + arg).length
                    pad = ph.width ? (pad_length > 0 ? pad_character.repeat(pad_length) : '') : ''
                    output += ph.align ? sign + arg + pad : (pad_character === '0' ? sign + pad + arg : pad + sign + arg)
                }
            }
    }
    return output
}
function __sprintf_parse(fmt)
{
    if (__sprintf_cache[fmt])
    {
        return __sprintf_cache[fmt]
    }

    var _fmt = fmt, match, parse_tree = [], arg_names = 0
    while (_fmt)
    {
        if ((match = __sprintfDefines.text.exec(_fmt)) !== null)
        {
            parse_tree.push(match[0])
        }
        else
            if ((match = __sprintfDefines.modulo.exec(_fmt)) !== null)
            {
                parse_tree.push('%')
            }
            else
                if ((match = __sprintfDefines.placeholder.exec(_fmt)) !== null)
                {
                    if (match[2])
                    {
                        arg_names |= 1
                        var field_list = [], replacement_field = match[2], field_match = []
                        if ((field_match = __sprintfDefines.key.exec(replacement_field)) !== null)
                        {
                            field_list.push(field_match[1])
                            while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '')
                            {
                                if ((field_match = __sprintfDefines.key_access.exec(replacement_field)) !== null)
                                {
                                    field_list.push(field_match[1])
                                }
                                else
                                    if ((field_match = __sprintfDefines.index_access.exec(replacement_field)) !== null)
                                    {
                                        field_list.push(field_match[1])
                                    }
                                    else
                                    {
                                        throw new SyntaxError('[sprintf] failed to parse named argument key')
                                    }
                            }
                        }
                        else
                        {
                            throw new SyntaxError('[sprintf] failed to parse named argument key')
                        }
                        match[2] = field_list
                    }
                    else
                    {
                        arg_names |= 2
                    }
                    if (arg_names === 3)
                    {
                        throw new Error('[sprintf] mixing positional and named placeholders is not (yet) supported')
                    }

                    parse_tree.push(
                        {
                            placeholder: match[0],
                            param_no: match[1],
                            keys: match[2],
                            sign: match[3],
                            pad_char: match[4],
                            align: match[5],
                            width: match[6],
                            precision: match[7],
                            type: match[8]
                        }
                    )
                }
                else
                {
                    throw new SyntaxError('[sprintf] unexpected placeholder')
                }
        _fmt = _fmt.substring(match[0].length)
    }
    return __sprintf_cache[fmt] = parse_tree
}
if (!String.prototype.fmt)
{
    /**
     * String sprintf()<br>
     * <br>
     * <b><u>Modifiers:</u></b><br>
     *  - <b>%2$d</b> - select argument #2<br>
     *  - <b>%+d</b> - show +/- sign for integers<br>
     *  - <b>%.3f</b> - number of decimals OR <b>%.3s</b> - max string length<br>
     * <b><u>Format specification:</u></b><br>
     *  - <b>%</b> - yields a literal % character
     *  - <b>b</b> - yields an integer as a binary number
     *  - <b>c</b> - yields an integer as the character with that ASCII value
     *  - <b>d</b> or <b>i</b> - yields an integer as a signed decimal number
     *  - <b>e</b> - yields a float using scientific notation
     *  - <b>u</b> - yields an integer as an unsigned decimal number
     *  - <b>f</b> - yields a float as is; see notes on precision above
     *  - <b>g</b> - yields a float as is; see notes on precision above
     *  - <b>o</b> - yields an integer as an octal number
     *  - <b>s</b> - yields a string as is
     *  - <b>t</b> - yields true or false
     *  - <b>T</b> - yields the type of the argument1
     *  - <b>v</b> - yields the primitive value of the specified argument
     *  - <b>x</b> - yields an integer as a hexadecimal number (lower-case)
     *  - <b>X</b> - yields an integer as a hexadecimal number (upper-case)
     *  - <b>j</b> - yields a JavaScript object or array as a JSON encoded string
     *
     * @returns string
     */
    String.prototype.fmt = function()
    {
        return vsprintf(this, arguments.length == 1 && typeof arguments[0] == "object" ? arguments[0] : Array.prototype.slice.call(arguments));
    };
}

// simple string hash
if (!String.prototype.hash)
{
    String.prototype.hash = function ()
    {
        let hash = 0;
        for (let i = 0; i < this.length; i++)
            hash = ((hash << 5) - hash + this.charCodeAt(i)) & 0x00FFFFFF;
        return `${hash}`;
    };
}

function cleanupLink(url)
{
    return url.replace(/[#\?].*/, '');
}

function extractLinkPath(url)
{
    url = cleanupLink(url);

    let pos = url.indexOf("://");
    if (pos === -1)
    {
        if (url[0] === "/")
            url = url.substr(1);
        return url;
    }
    url = url.substr(pos + 3);
    pos = url.indexOf("/");
    if (pos === -1)
        return "";
    return url.substring(pos + 1);
}

function gzipDeflate(data)
{
    if (typeof pako == "undefined")
        return null;

    if (typeof data == "object")
        data = JSON.stringify(data);
    let dataDeflated = pako.deflateRaw(data);

    let binary = "";
    let len = dataDeflated.byteLength;
    for (let i = 0; i < len; i++)
        binary += String.fromCharCode(dataDeflated[i]);

    return window.btoa(binary);
}

// add jQuery case-insensitive "contains" selector
$.expr[':'].Contains = function (a, i, m)
{
    return jQuery(a).text().toUpperCase()
        .indexOf(m[3].toUpperCase()) >= 0;
};
