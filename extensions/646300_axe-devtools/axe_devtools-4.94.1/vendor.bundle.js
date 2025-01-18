/*! For license information please see vendor.bundle.js.LICENSE.txt */
(this["webpackChunk"] = this["webpackChunk"] || []).push([ [ 736 ], {
    8315: (module, exports, __webpack_require__) => {
        var __WEBPACK_AMD_DEFINE_RESULT__;
        (function(window, undefined) {
            "use strict";
            var LIBVERSION = "0.7.33", EMPTY = "", UNKNOWN = "?", FUNC_TYPE = "function", UNDEF_TYPE = "undefined", OBJ_TYPE = "object", STR_TYPE = "string", MAJOR = "major", MODEL = "model", NAME = "name", TYPE = "type", VENDOR = "vendor", VERSION = "version", ARCHITECTURE = "architecture", CONSOLE = "console", MOBILE = "mobile", TABLET = "tablet", SMARTTV = "smarttv", WEARABLE = "wearable", EMBEDDED = "embedded", UA_MAX_LENGTH = 350;
            var AMAZON = "Amazon", APPLE = "Apple", ASUS = "ASUS", BLACKBERRY = "BlackBerry", BROWSER = "Browser", CHROME = "Chrome", EDGE = "Edge", FIREFOX = "Firefox", GOOGLE = "Google", HUAWEI = "Huawei", LG = "LG", MICROSOFT = "Microsoft", MOTOROLA = "Motorola", OPERA = "Opera", SAMSUNG = "Samsung", SHARP = "Sharp", SONY = "Sony", XIAOMI = "Xiaomi", ZEBRA = "Zebra", FACEBOOK = "Facebook";
            var extend = function(regexes, extensions) {
                var mergedRegexes = {};
                for (var i in regexes) if (extensions[i] && extensions[i].length % 2 === 0) mergedRegexes[i] = extensions[i].concat(regexes[i]); else mergedRegexes[i] = regexes[i];
                return mergedRegexes;
            }, enumerize = function(arr) {
                var enums = {};
                for (var i = 0; i < arr.length; i++) enums[arr[i].toUpperCase()] = arr[i];
                return enums;
            }, has = function(str1, str2) {
                return typeof str1 === STR_TYPE ? -1 !== lowerize(str2).indexOf(lowerize(str1)) : false;
            }, lowerize = function(str) {
                return str.toLowerCase();
            }, majorize = function(version) {
                return typeof version === STR_TYPE ? version.replace(/[^\d\.]/g, EMPTY).split(".")[0] : undefined;
            }, trim = function(str, len) {
                if (typeof str === STR_TYPE) {
                    str = str.replace(/^\s\s*/, EMPTY);
                    return typeof len === UNDEF_TYPE ? str : str.substring(0, UA_MAX_LENGTH);
                }
            };
            var rgxMapper = function(ua, arrays) {
                var j, k, p, q, matches, match, i = 0;
                while (i < arrays.length && !matches) {
                    var regex = arrays[i], props = arrays[i + 1];
                    j = k = 0;
                    while (j < regex.length && !matches) {
                        matches = regex[j++].exec(ua);
                        if (!!matches) for (p = 0; p < props.length; p++) {
                            match = matches[++k];
                            q = props[p];
                            if (typeof q === OBJ_TYPE && q.length > 0) {
                                if (2 === q.length) if (typeof q[1] == FUNC_TYPE) this[q[0]] = q[1].call(this, match); else this[q[0]] = q[1]; else if (3 === q.length) if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) this[q[0]] = match ? q[1].call(this, match, q[2]) : undefined; else this[q[0]] = match ? match.replace(q[1], q[2]) : undefined; else if (4 === q.length) this[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined;
                            } else this[q] = match ? match : undefined;
                        }
                    }
                    i += 2;
                }
            }, strMapper = function(str, map) {
                for (var i in map) if (typeof map[i] === OBJ_TYPE && map[i].length > 0) {
                    for (var j = 0; j < map[i].length; j++) if (has(map[i][j], str)) return i === UNKNOWN ? undefined : i;
                } else if (has(map[i], str)) return i === UNKNOWN ? undefined : i;
                return str;
            };
            var oldSafariMap = {
                "1.0": "/8",
                1.2: "/1",
                1.3: "/3",
                "2.0": "/412",
                "2.0.2": "/416",
                "2.0.3": "/417",
                "2.0.4": "/419",
                "?": "/"
            }, windowsVersionMap = {
                ME: "4.90",
                "NT 3.11": "NT3.51",
                "NT 4.0": "NT4.0",
                2e3: "NT 5.0",
                XP: [ "NT 5.1", "NT 5.2" ],
                Vista: "NT 6.0",
                7: "NT 6.1",
                8: "NT 6.2",
                8.1: "NT 6.3",
                10: [ "NT 6.4", "NT 10.0" ],
                RT: "ARM"
            };
            var regexes = {
                browser: [ [ /\b(?:crmo|crios)\/([\w\.]+)/i ], [ VERSION, [ NAME, "Chrome" ] ], [ /edg(?:e|ios|a)?\/([\w\.]+)/i ], [ VERSION, [ NAME, "Edge" ] ], [ /(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i ], [ NAME, VERSION ], [ /opios[\/ ]+([\w\.]+)/i ], [ VERSION, [ NAME, OPERA + " Mini" ] ], [ /\bopr\/([\w\.]+)/i ], [ VERSION, [ NAME, OPERA ] ], [ /(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, /(ba?idubrowser)[\/ ]?([\w\.]+)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i, /(weibo)__([\d\.]+)/i ], [ NAME, VERSION ], [ /(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i ], [ VERSION, [ NAME, "UC" + BROWSER ] ], [ /microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i ], [ VERSION, [ NAME, "WeChat(Win) Desktop" ] ], [ /micromessenger\/([\w\.]+)/i ], [ VERSION, [ NAME, "WeChat" ] ], [ /konqueror\/([\w\.]+)/i ], [ VERSION, [ NAME, "Konqueror" ] ], [ /trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i ], [ VERSION, [ NAME, "IE" ] ], [ /yabrowser\/([\w\.]+)/i ], [ VERSION, [ NAME, "Yandex" ] ], [ /(avast|avg)\/([\w\.]+)/i ], [ [ NAME, /(.+)/, "$1 Secure " + BROWSER ], VERSION ], [ /\bfocus\/([\w\.]+)/i ], [ VERSION, [ NAME, FIREFOX + " Focus" ] ], [ /\bopt\/([\w\.]+)/i ], [ VERSION, [ NAME, OPERA + " Touch" ] ], [ /coc_coc\w+\/([\w\.]+)/i ], [ VERSION, [ NAME, "Coc Coc" ] ], [ /dolfin\/([\w\.]+)/i ], [ VERSION, [ NAME, "Dolphin" ] ], [ /coast\/([\w\.]+)/i ], [ VERSION, [ NAME, OPERA + " Coast" ] ], [ /miuibrowser\/([\w\.]+)/i ], [ VERSION, [ NAME, "MIUI " + BROWSER ] ], [ /fxios\/([-\w\.]+)/i ], [ VERSION, [ NAME, FIREFOX ] ], [ /\bqihu|(qi?ho?o?|360)browser/i ], [ [ NAME, "360 " + BROWSER ] ], [ /(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i ], [ [ NAME, /(.+)/, "$1 " + BROWSER ], VERSION ], [ /(comodo_dragon)\/([\w\.]+)/i ], [ [ NAME, /_/g, " " ], VERSION ], [ /(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i ], [ NAME, VERSION ], [ /(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i, /\[(linkedin)app\]/i ], [ NAME ], [ /((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i ], [ [ NAME, FACEBOOK ], VERSION ], [ /safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i ], [ NAME, VERSION ], [ /\bgsa\/([\w\.]+) .*safari\//i ], [ VERSION, [ NAME, "GSA" ] ], [ /headlesschrome(?:\/([\w\.]+)| )/i ], [ VERSION, [ NAME, CHROME + " Headless" ] ], [ / wv\).+(chrome)\/([\w\.]+)/i ], [ [ NAME, CHROME + " WebView" ], VERSION ], [ /droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i ], [ VERSION, [ NAME, "Android " + BROWSER ] ], [ /(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i ], [ NAME, VERSION ], [ /version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i ], [ VERSION, [ NAME, "Mobile Safari" ] ], [ /version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i ], [ VERSION, NAME ], [ /webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i ], [ NAME, [ VERSION, strMapper, oldSafariMap ] ], [ /(webkit|khtml)\/([\w\.]+)/i ], [ NAME, VERSION ], [ /(navigator|netscape\d?)\/([-\w\.]+)/i ], [ [ NAME, "Netscape" ], VERSION ], [ /mobile vr; rv:([\w\.]+)\).+firefox/i ], [ VERSION, [ NAME, FIREFOX + " Reality" ] ], [ /ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i ], [ NAME, VERSION ], [ /(cobalt)\/([\w\.]+)/i ], [ NAME, [ VERSION, /master.|lts./, "" ] ] ],
                cpu: [ [ /(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i ], [ [ ARCHITECTURE, "amd64" ] ], [ /(ia32(?=;))/i ], [ [ ARCHITECTURE, lowerize ] ], [ /((?:i[346]|x)86)[;\)]/i ], [ [ ARCHITECTURE, "ia32" ] ], [ /\b(aarch64|arm(v?8e?l?|_?64))\b/i ], [ [ ARCHITECTURE, "arm64" ] ], [ /\b(arm(?:v[67])?ht?n?[fl]p?)\b/i ], [ [ ARCHITECTURE, "armhf" ] ], [ /windows (ce|mobile); ppc;/i ], [ [ ARCHITECTURE, "arm" ] ], [ /((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i ], [ [ ARCHITECTURE, /ower/, EMPTY, lowerize ] ], [ /(sun4\w)[;\)]/i ], [ [ ARCHITECTURE, "sparc" ] ], [ /((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i ], [ [ ARCHITECTURE, lowerize ] ] ],
                device: [ [ /\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i ], [ MODEL, [ VENDOR, SAMSUNG ], [ TYPE, TABLET ] ], [ /\b((?:s[cgp]h|gt|sm)-\w+|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i ], [ MODEL, [ VENDOR, SAMSUNG ], [ TYPE, MOBILE ] ], [ /((ipod|iphone)\d+,\d+)/i ], [ MODEL, [ VENDOR, APPLE ], [ TYPE, MOBILE ] ], [ /(ipad\d+,\d+)/i ], [ MODEL, [ VENDOR, APPLE ], [ TYPE, TABLET ] ], [ /\((ip(?:hone|od)[\w ]*);/i ], [ MODEL, [ VENDOR, APPLE ], [ TYPE, MOBILE ] ], [ /\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i ], [ MODEL, [ VENDOR, APPLE ], [ TYPE, TABLET ] ], [ /(macintosh);/i ], [ MODEL, [ VENDOR, APPLE ] ], [ /\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i ], [ MODEL, [ VENDOR, HUAWEI ], [ TYPE, TABLET ] ], [ /(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i ], [ MODEL, [ VENDOR, HUAWEI ], [ TYPE, MOBILE ] ], [ /\b(poco[\w ]+)(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i ], [ [ MODEL, /_/g, " " ], [ VENDOR, XIAOMI ], [ TYPE, MOBILE ] ], [ /\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i ], [ [ MODEL, /_/g, " " ], [ VENDOR, XIAOMI ], [ TYPE, TABLET ] ], [ /; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i ], [ MODEL, [ VENDOR, "OPPO" ], [ TYPE, MOBILE ] ], [ /vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i ], [ MODEL, [ VENDOR, "Vivo" ], [ TYPE, MOBILE ] ], [ /\b(rmx[12]\d{3})(?: bui|;|\))/i ], [ MODEL, [ VENDOR, "Realme" ], [ TYPE, MOBILE ] ], [ /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i ], [ MODEL, [ VENDOR, MOTOROLA ], [ TYPE, MOBILE ] ], [ /\b(mz60\d|xoom[2 ]{0,2}) build\//i ], [ MODEL, [ VENDOR, MOTOROLA ], [ TYPE, TABLET ] ], [ /((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i ], [ MODEL, [ VENDOR, LG ], [ TYPE, TABLET ] ], [ /(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i ], [ MODEL, [ VENDOR, LG ], [ TYPE, MOBILE ] ], [ /(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i ], [ MODEL, [ VENDOR, "Lenovo" ], [ TYPE, TABLET ] ], [ /(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i ], [ [ MODEL, /_/g, " " ], [ VENDOR, "Nokia" ], [ TYPE, MOBILE ] ], [ /(pixel c)\b/i ], [ MODEL, [ VENDOR, GOOGLE ], [ TYPE, TABLET ] ], [ /droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i ], [ MODEL, [ VENDOR, GOOGLE ], [ TYPE, MOBILE ] ], [ /droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i ], [ MODEL, [ VENDOR, SONY ], [ TYPE, MOBILE ] ], [ /sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i ], [ [ MODEL, "Xperia Tablet" ], [ VENDOR, SONY ], [ TYPE, TABLET ] ], [ / (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i ], [ MODEL, [ VENDOR, "OnePlus" ], [ TYPE, MOBILE ] ], [ /(alexa)webm/i, /(kf[a-z]{2}wi)( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i ], [ MODEL, [ VENDOR, AMAZON ], [ TYPE, TABLET ] ], [ /((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i ], [ [ MODEL, /(.+)/g, "Fire Phone $1" ], [ VENDOR, AMAZON ], [ TYPE, MOBILE ] ], [ /(playbook);[-\w\),; ]+(rim)/i ], [ MODEL, VENDOR, [ TYPE, TABLET ] ], [ /\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i ], [ MODEL, [ VENDOR, BLACKBERRY ], [ TYPE, MOBILE ] ], [ /(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i ], [ MODEL, [ VENDOR, ASUS ], [ TYPE, TABLET ] ], [ / (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i ], [ MODEL, [ VENDOR, ASUS ], [ TYPE, MOBILE ] ], [ /(nexus 9)/i ], [ MODEL, [ VENDOR, "HTC" ], [ TYPE, TABLET ] ], [ /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic|sony(?!-bra))[-_ ]?([-\w]*)/i ], [ VENDOR, [ MODEL, /_/g, " " ], [ TYPE, MOBILE ] ], [ /droid.+; ([ab][1-7]-?[0178a]\d\d?)/i ], [ MODEL, [ VENDOR, "Acer" ], [ TYPE, TABLET ] ], [ /droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i ], [ MODEL, [ VENDOR, "Meizu" ], [ TYPE, MOBILE ] ], [ /\b(sh-?[altvz]?\d\d[a-ekm]?)/i ], [ MODEL, [ VENDOR, SHARP ], [ TYPE, MOBILE ] ], [ /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i ], [ VENDOR, MODEL, [ TYPE, MOBILE ] ], [ /(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i ], [ VENDOR, MODEL, [ TYPE, TABLET ] ], [ /(surface duo)/i ], [ MODEL, [ VENDOR, MICROSOFT ], [ TYPE, TABLET ] ], [ /droid [\d\.]+; (fp\du?)(?: b|\))/i ], [ MODEL, [ VENDOR, "Fairphone" ], [ TYPE, MOBILE ] ], [ /(u304aa)/i ], [ MODEL, [ VENDOR, "AT&T" ], [ TYPE, MOBILE ] ], [ /\bsie-(\w*)/i ], [ MODEL, [ VENDOR, "Siemens" ], [ TYPE, MOBILE ] ], [ /\b(rct\w+) b/i ], [ MODEL, [ VENDOR, "RCA" ], [ TYPE, TABLET ] ], [ /\b(venue[\d ]{2,7}) b/i ], [ MODEL, [ VENDOR, "Dell" ], [ TYPE, TABLET ] ], [ /\b(q(?:mv|ta)\w+) b/i ], [ MODEL, [ VENDOR, "Verizon" ], [ TYPE, TABLET ] ], [ /\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i ], [ MODEL, [ VENDOR, "Barnes & Noble" ], [ TYPE, TABLET ] ], [ /\b(tm\d{3}\w+) b/i ], [ MODEL, [ VENDOR, "NuVision" ], [ TYPE, TABLET ] ], [ /\b(k88) b/i ], [ MODEL, [ VENDOR, "ZTE" ], [ TYPE, TABLET ] ], [ /\b(nx\d{3}j) b/i ], [ MODEL, [ VENDOR, "ZTE" ], [ TYPE, MOBILE ] ], [ /\b(gen\d{3}) b.+49h/i ], [ MODEL, [ VENDOR, "Swiss" ], [ TYPE, MOBILE ] ], [ /\b(zur\d{3}) b/i ], [ MODEL, [ VENDOR, "Swiss" ], [ TYPE, TABLET ] ], [ /\b((zeki)?tb.*\b) b/i ], [ MODEL, [ VENDOR, "Zeki" ], [ TYPE, TABLET ] ], [ /\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i ], [ [ VENDOR, "Dragon Touch" ], MODEL, [ TYPE, TABLET ] ], [ /\b(ns-?\w{0,9}) b/i ], [ MODEL, [ VENDOR, "Insignia" ], [ TYPE, TABLET ] ], [ /\b((nxa|next)-?\w{0,9}) b/i ], [ MODEL, [ VENDOR, "NextBook" ], [ TYPE, TABLET ] ], [ /\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i ], [ [ VENDOR, "Voice" ], MODEL, [ TYPE, MOBILE ] ], [ /\b(lvtel\-)?(v1[12]) b/i ], [ [ VENDOR, "LvTel" ], MODEL, [ TYPE, MOBILE ] ], [ /\b(ph-1) /i ], [ MODEL, [ VENDOR, "Essential" ], [ TYPE, MOBILE ] ], [ /\b(v(100md|700na|7011|917g).*\b) b/i ], [ MODEL, [ VENDOR, "Envizen" ], [ TYPE, TABLET ] ], [ /\b(trio[-\w\. ]+) b/i ], [ MODEL, [ VENDOR, "MachSpeed" ], [ TYPE, TABLET ] ], [ /\btu_(1491) b/i ], [ MODEL, [ VENDOR, "Rotor" ], [ TYPE, TABLET ] ], [ /(shield[\w ]+) b/i ], [ MODEL, [ VENDOR, "Nvidia" ], [ TYPE, TABLET ] ], [ /(sprint) (\w+)/i ], [ VENDOR, MODEL, [ TYPE, MOBILE ] ], [ /(kin\.[onetw]{3})/i ], [ [ MODEL, /\./g, " " ], [ VENDOR, MICROSOFT ], [ TYPE, MOBILE ] ], [ /droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i ], [ MODEL, [ VENDOR, ZEBRA ], [ TYPE, TABLET ] ], [ /droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i ], [ MODEL, [ VENDOR, ZEBRA ], [ TYPE, MOBILE ] ], [ /(ouya)/i, /(nintendo) ([wids3utch]+)/i ], [ VENDOR, MODEL, [ TYPE, CONSOLE ] ], [ /droid.+; (shield) bui/i ], [ MODEL, [ VENDOR, "Nvidia" ], [ TYPE, CONSOLE ] ], [ /(playstation [345portablevi]+)/i ], [ MODEL, [ VENDOR, SONY ], [ TYPE, CONSOLE ] ], [ /\b(xbox(?: one)?(?!; xbox))[\); ]/i ], [ MODEL, [ VENDOR, MICROSOFT ], [ TYPE, CONSOLE ] ], [ /smart-tv.+(samsung)/i ], [ VENDOR, [ TYPE, SMARTTV ] ], [ /hbbtv.+maple;(\d+)/i ], [ [ MODEL, /^/, "SmartTV" ], [ VENDOR, SAMSUNG ], [ TYPE, SMARTTV ] ], [ /(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i ], [ [ VENDOR, LG ], [ TYPE, SMARTTV ] ], [ /(apple) ?tv/i ], [ VENDOR, [ MODEL, APPLE + " TV" ], [ TYPE, SMARTTV ] ], [ /crkey/i ], [ [ MODEL, CHROME + "cast" ], [ VENDOR, GOOGLE ], [ TYPE, SMARTTV ] ], [ /droid.+aft(\w)( bui|\))/i ], [ MODEL, [ VENDOR, AMAZON ], [ TYPE, SMARTTV ] ], [ /\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i ], [ MODEL, [ VENDOR, SHARP ], [ TYPE, SMARTTV ] ], [ /(bravia[\w ]+)( bui|\))/i ], [ MODEL, [ VENDOR, SONY ], [ TYPE, SMARTTV ] ], [ /(mitv-\w{5}) bui/i ], [ MODEL, [ VENDOR, XIAOMI ], [ TYPE, SMARTTV ] ], [ /\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w ]*; *(\w[^;]*);([^;]*)/i ], [ [ VENDOR, trim ], [ MODEL, trim ], [ TYPE, SMARTTV ] ], [ /\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i ], [ [ TYPE, SMARTTV ] ], [ /((pebble))app/i ], [ VENDOR, MODEL, [ TYPE, WEARABLE ] ], [ /droid.+; (glass) \d/i ], [ MODEL, [ VENDOR, GOOGLE ], [ TYPE, WEARABLE ] ], [ /droid.+; (wt63?0{2,3})\)/i ], [ MODEL, [ VENDOR, ZEBRA ], [ TYPE, WEARABLE ] ], [ /(quest( 2)?)/i ], [ MODEL, [ VENDOR, FACEBOOK ], [ TYPE, WEARABLE ] ], [ /(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i ], [ VENDOR, [ TYPE, EMBEDDED ] ], [ /droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i ], [ MODEL, [ TYPE, MOBILE ] ], [ /droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i ], [ MODEL, [ TYPE, TABLET ] ], [ /\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i ], [ [ TYPE, TABLET ] ], [ /(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i ], [ [ TYPE, MOBILE ] ], [ /(android[-\w\. ]{0,9});.+buil/i ], [ MODEL, [ VENDOR, "Generic" ] ] ],
                engine: [ [ /windows.+ edge\/([\w\.]+)/i ], [ VERSION, [ NAME, EDGE + "HTML" ] ], [ /webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i ], [ VERSION, [ NAME, "Blink" ] ], [ /(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i ], [ NAME, VERSION ], [ /rv\:([\w\.]{1,9})\b.+(gecko)/i ], [ VERSION, NAME ] ],
                os: [ [ /microsoft (windows) (vista|xp)/i ], [ NAME, VERSION ], [ /(windows) nt 6\.2; (arm)/i, /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i ], [ NAME, [ VERSION, strMapper, windowsVersionMap ] ], [ /(win(?=3|9|n)|win 9x )([nt\d\.]+)/i ], [ [ NAME, "Windows" ], [ VERSION, strMapper, windowsVersionMap ] ], [ /ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /cfnetwork\/.+darwin/i ], [ [ VERSION, /_/g, "." ], [ NAME, "iOS" ] ], [ /(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i ], [ [ NAME, "Mac OS" ], [ VERSION, /_/g, "." ] ], [ /droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i ], [ VERSION, NAME ], [ /(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i ], [ NAME, VERSION ], [ /\(bb(10);/i ], [ VERSION, [ NAME, BLACKBERRY ] ], [ /(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i ], [ VERSION, [ NAME, "Symbian" ] ], [ /mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i ], [ VERSION, [ NAME, FIREFOX + " OS" ] ], [ /web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i ], [ VERSION, [ NAME, "webOS" ] ], [ /crkey\/([\d\.]+)/i ], [ VERSION, [ NAME, CHROME + "cast" ] ], [ /(cros) [\w]+ ([\w\.]+\w)/i ], [ [ NAME, "Chromium OS" ], VERSION ], [ /(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i ], [ NAME, VERSION ], [ /(sunos) ?([\w\.\d]*)/i ], [ [ NAME, "Solaris" ], VERSION ], [ /((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux)/i, /(unix) ?([\w\.]*)/i ], [ NAME, VERSION ] ]
            };
            var UAParser = function(ua, extensions) {
                if (typeof ua === OBJ_TYPE) {
                    extensions = ua;
                    ua = undefined;
                }
                if (!(this instanceof UAParser)) return new UAParser(ua, extensions).getResult();
                var _ua = ua || (typeof window !== UNDEF_TYPE && window.navigator && window.navigator.userAgent ? window.navigator.userAgent : EMPTY);
                var _rgxmap = extensions ? extend(regexes, extensions) : regexes;
                this.getBrowser = function() {
                    var _browser = {};
                    _browser[NAME] = undefined;
                    _browser[VERSION] = undefined;
                    rgxMapper.call(_browser, _ua, _rgxmap.browser);
                    _browser.major = majorize(_browser.version);
                    return _browser;
                };
                this.getCPU = function() {
                    var _cpu = {};
                    _cpu[ARCHITECTURE] = undefined;
                    rgxMapper.call(_cpu, _ua, _rgxmap.cpu);
                    return _cpu;
                };
                this.getDevice = function() {
                    var _device = {};
                    _device[VENDOR] = undefined;
                    _device[MODEL] = undefined;
                    _device[TYPE] = undefined;
                    rgxMapper.call(_device, _ua, _rgxmap.device);
                    return _device;
                };
                this.getEngine = function() {
                    var _engine = {};
                    _engine[NAME] = undefined;
                    _engine[VERSION] = undefined;
                    rgxMapper.call(_engine, _ua, _rgxmap.engine);
                    return _engine;
                };
                this.getOS = function() {
                    var _os = {};
                    _os[NAME] = undefined;
                    _os[VERSION] = undefined;
                    rgxMapper.call(_os, _ua, _rgxmap.os);
                    return _os;
                };
                this.getResult = function() {
                    return {
                        ua: this.getUA(),
                        browser: this.getBrowser(),
                        engine: this.getEngine(),
                        os: this.getOS(),
                        device: this.getDevice(),
                        cpu: this.getCPU()
                    };
                };
                this.getUA = function() {
                    return _ua;
                };
                this.setUA = function(ua) {
                    _ua = typeof ua === STR_TYPE && ua.length > UA_MAX_LENGTH ? trim(ua, UA_MAX_LENGTH) : ua;
                    return this;
                };
                this.setUA(_ua);
                return this;
            };
            UAParser.VERSION = LIBVERSION;
            UAParser.BROWSER = enumerize([ NAME, VERSION, MAJOR ]);
            UAParser.CPU = enumerize([ ARCHITECTURE ]);
            UAParser.DEVICE = enumerize([ MODEL, VENDOR, TYPE, CONSOLE, MOBILE, SMARTTV, TABLET, WEARABLE, EMBEDDED ]);
            UAParser.ENGINE = UAParser.OS = enumerize([ NAME, VERSION ]);
            if (typeof exports !== UNDEF_TYPE) {
                if ("object" !== UNDEF_TYPE && module.exports) exports = module.exports = UAParser;
                exports.UAParser = UAParser;
            } else if ("function" === FUNC_TYPE && __webpack_require__.amdO) !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
                return UAParser;
            }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); else if (typeof window !== UNDEF_TYPE) window.UAParser = UAParser;
            var $ = typeof window !== UNDEF_TYPE && (window.jQuery || window.Zepto);
            if ($ && !$.ua) {
                var parser = new UAParser;
                $.ua = parser.getResult();
                $.ua.get = function() {
                    return parser.getUA();
                };
                $.ua.set = function(ua) {
                    parser.setUA(ua);
                    var result = parser.getResult();
                    for (var prop in result) $.ua[prop] = result[prop];
                };
            }
        })(true ? window : 0);
    },
    3650: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
            f7: () => BuildMode,
            r5: () => makePublicApi,
            y: () => defineGlobal
        });
        if (998 != __webpack_require__.j) var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9312);
        if (998 != __webpack_require__.j) var _domain_internalMonitoring__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1714);
        if (998 != __webpack_require__.j) var _tools_catchUserErrors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2709);
        function makePublicApi(stub) {
            var publicApi = (0, tslib__WEBPACK_IMPORTED_MODULE_0__.pi)((0, tslib__WEBPACK_IMPORTED_MODULE_0__.pi)({}, stub), {
                onReady: function(callback) {
                    callback();
                }
            });
            Object.defineProperty(publicApi, "_setDebug", {
                get: function() {
                    return _domain_internalMonitoring__WEBPACK_IMPORTED_MODULE_1__.yD;
                },
                enumerable: false
            });
            return publicApi;
        }
        function defineGlobal(global, name, api) {
            var existingGlobalVariable = global[name];
            global[name] = api;
            if (existingGlobalVariable && existingGlobalVariable.q) existingGlobalVariable.q.forEach((function(fn) {
                return (0, _tools_catchUserErrors__WEBPACK_IMPORTED_MODULE_2__.Z)(fn, "onReady callback threw an error:")();
            }));
        }
        var BuildMode;
        (function(BuildMode) {
            BuildMode["RELEASE"] = "release";
            BuildMode["CANARY"] = "canary";
            BuildMode["E2E_TEST"] = "e2e-test";
        })(BuildMode || (BuildMode = {}));
    },
    4035: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
            MI: () => COOKIE_ACCESS_DELAY,
            WQ: () => getCurrentSite,
            d8: () => setCookie,
            ej: () => getCookie,
            oX: () => areCookiesAuthorized
        });
        if (998 != __webpack_require__.j) var _tools_display__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6155);
        if (998 != __webpack_require__.j) var _tools_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2492);
        var COOKIE_ACCESS_DELAY = 998 != __webpack_require__.j ? _tools_utils__WEBPACK_IMPORTED_MODULE_0__.WT : null;
        function setCookie(name, value, expireDelay, options) {
            var date = new Date;
            date.setTime(date.getTime() + expireDelay);
            var expires = "expires=" + date.toUTCString();
            var sameSite = options && options.crossSite ? "none" : "strict";
            var domain = options && options.domain ? ";domain=" + options.domain : "";
            var secure = options && options.secure ? ";secure" : "";
            document.cookie = name + "=" + value + ";" + expires + ";path=/;samesite=" + sameSite + domain + secure;
        }
        function getCookie(name) {
            return (0, _tools_utils__WEBPACK_IMPORTED_MODULE_0__.MY)(document.cookie, name);
        }
        function deleteCookie(name, options) {
            setCookie(name, "", 0, options);
        }
        function areCookiesAuthorized(options) {
            if (void 0 === document.cookie || null === document.cookie) return false;
            try {
                var testCookieName = "dd_cookie_test_" + (0, _tools_utils__WEBPACK_IMPORTED_MODULE_0__.DO)();
                var testCookieValue = "test";
                setCookie(testCookieName, testCookieValue, _tools_utils__WEBPACK_IMPORTED_MODULE_0__.WT, options);
                var isCookieCorrectlySet = getCookie(testCookieName) === testCookieValue;
                deleteCookie(testCookieName, options);
                return isCookieCorrectlySet;
            } catch (error) {
                _tools_display__WEBPACK_IMPORTED_MODULE_1__.j.error(error);
                return false;
            }
        }
        var getCurrentSiteCache;
        function getCurrentSite() {
            if (void 0 === getCurrentSiteCache) {
                var testCookieName = "dd_site_test_" + (0, _tools_utils__WEBPACK_IMPORTED_MODULE_0__.DO)();
                var testCookieValue = "test";
                var domainLevels = window.location.hostname.split(".");
                var candidateDomain = domainLevels.pop();
                while (domainLevels.length && !getCookie(testCookieName)) {
                    candidateDomain = domainLevels.pop() + "." + candidateDomain;
                    setCookie(testCookieName, testCookieValue, _tools_utils__WEBPACK_IMPORTED_MODULE_0__.WT, {
                        domain: candidateDomain
                    });
                }
                deleteCookie(testCookieName, {
                    domain: candidateDomain
                });
                getCurrentSiteCache = candidateDomain;
            }
            return getCurrentSiteCache;
        }
    },
    6547: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
            y: () => initFetchObservable
        });
        if (998 != __webpack_require__.j) var _domain_internalMonitoring__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1714);
        if (998 != __webpack_require__.j) var _tools_instrumentMethod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6765);
        if (998 != __webpack_require__.j) var _tools_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2521);
        if (998 != __webpack_require__.j) var _tools_timeUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7126);
        if (998 != __webpack_require__.j) var _tools_urlPolyfill__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(575);
        var fetchObservable;
        function initFetchObservable() {
            if (!fetchObservable) fetchObservable = createFetchObservable();
            return fetchObservable;
        }
        function createFetchObservable() {
            var observable = new _tools_observable__WEBPACK_IMPORTED_MODULE_0__.y((function() {
                if (!window.fetch) return;
                var stop = (0, _tools_instrumentMethod__WEBPACK_IMPORTED_MODULE_1__.S)(window, "fetch", (function(originalFetch) {
                    return function(input, init) {
                        var responsePromise;
                        var context = (0, _domain_internalMonitoring__WEBPACK_IMPORTED_MODULE_2__.L6)(beforeSend, null, [ observable, input, init ]);
                        if (context) {
                            responsePromise = originalFetch.call(this, context.input, context.init);
                            (0, _domain_internalMonitoring__WEBPACK_IMPORTED_MODULE_2__.L6)(afterSend, null, [ observable, responsePromise, context ]);
                        } else responsePromise = originalFetch.call(this, input, init);
                        return responsePromise;
                    };
                })).stop;
                return stop;
            }));
            return observable;
        }
        function beforeSend(observable, input, init) {
            var method = init && init.method || "object" === typeof input && input.method || "GET";
            var url = (0, _tools_urlPolyfill__WEBPACK_IMPORTED_MODULE_3__.D5)("object" === typeof input && input.url || input);
            var startClocks = (0, _tools_timeUtils__WEBPACK_IMPORTED_MODULE_4__.$I)();
            var context = {
                state: "start",
                init,
                input,
                method,
                startClocks,
                url
            };
            observable.notify(context);
            return context;
        }
        function afterSend(observable, responsePromise, startContext) {
            var reportFetch = function(response) {
                var context = startContext;
                context.state = "complete";
                context.duration = (0, _tools_timeUtils__WEBPACK_IMPORTED_MODULE_4__._J)(context.startClocks.timeStamp, (0, 
                _tools_timeUtils__WEBPACK_IMPORTED_MODULE_4__.n$)());
                if ("stack" in response || response instanceof Error) {
                    context.status = 0;
                    context.isAborted = response instanceof DOMException && response.code === DOMException.ABORT_ERR;
                    context.error = response;
                    observable.notify(context);
                } else if ("status" in response) {
                    context.response = response;
                    context.responseType = response.type;
                    context.status = response.status;
                    context.isAborted = false;
                    observable.notify(context);
                }
            };
            responsePromise.then((0, _domain_internalMonitoring__WEBPACK_IMPORTED_MODULE_2__.zk)(reportFetch), (0, 
            _domain_internalMonitoring__WEBPACK_IMPORTED_MODULE_2__.zk)(reportFetch));
        }
    },
    5591: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
            S: () => initXhrObservable
        });
        if (998 != __webpack_require__.j) var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9312);
        if (998 != __webpack_require__.j) var _domain_internalMonitoring__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1714);
        if (998 != __webpack_require__.j) var _tools_instrumentMethod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6765);
        if (998 != __webpack_require__.j) var _tools_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2521);
        if (998 != __webpack_require__.j) var _tools_timeUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7126);
        if (998 != __webpack_require__.j) var _tools_urlPolyfill__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(575);
        var xhrObservable;
        var xhrContexts = new WeakMap;
        function initXhrObservable() {
            if (!xhrObservable) xhrObservable = createXhrObservable();
            return xhrObservable;
        }
        function createXhrObservable() {
            var observable = new _tools_observable__WEBPACK_IMPORTED_MODULE_0__.y((function() {
                var stopInstrumentingStart = (0, _tools_instrumentMethod__WEBPACK_IMPORTED_MODULE_1__.L)(XMLHttpRequest.prototype, "open", {
                    before: openXhr
                }).stop;
                var stopInstrumentingSend = (0, _tools_instrumentMethod__WEBPACK_IMPORTED_MODULE_1__.L)(XMLHttpRequest.prototype, "send", {
                    before: function() {
                        sendXhr.call(this, observable);
                    }
                }).stop;
                var stopInstrumentingAbort = (0, _tools_instrumentMethod__WEBPACK_IMPORTED_MODULE_1__.L)(XMLHttpRequest.prototype, "abort", {
                    before: abortXhr
                }).stop;
                return function() {
                    stopInstrumentingStart();
                    stopInstrumentingSend();
                    stopInstrumentingAbort();
                };
            }));
            return observable;
        }
        function openXhr(method, url) {
            xhrContexts.set(this, {
                state: "open",
                method,
                url: (0, _tools_urlPolyfill__WEBPACK_IMPORTED_MODULE_2__.D5)(url)
            });
        }
        function sendXhr(observable) {
            var _this = this;
            var context = xhrContexts.get(this);
            if (!context) return;
            var startContext = context;
            startContext.state = "start";
            startContext.startTime = (0, _tools_timeUtils__WEBPACK_IMPORTED_MODULE_3__._q)();
            startContext.startClocks = (0, _tools_timeUtils__WEBPACK_IMPORTED_MODULE_3__.$I)();
            startContext.isAborted = false;
            startContext.xhr = this;
            var hasBeenReported = false;
            var stopInstrumentingOnReadyStateChange = (0, _tools_instrumentMethod__WEBPACK_IMPORTED_MODULE_1__.L)(this, "onreadystatechange", {
                before: function() {
                    if (this.readyState === XMLHttpRequest.DONE) onEnd();
                }
            }).stop;
            var onEnd = (0, _domain_internalMonitoring__WEBPACK_IMPORTED_MODULE_4__.zk)((function() {
                _this.removeEventListener("loadend", onEnd);
                stopInstrumentingOnReadyStateChange();
                if (hasBeenReported) return;
                hasBeenReported = true;
                var completeContext = context;
                completeContext.state = "complete";
                completeContext.duration = (0, _tools_timeUtils__WEBPACK_IMPORTED_MODULE_3__._J)(startContext.startClocks.timeStamp, (0, 
                _tools_timeUtils__WEBPACK_IMPORTED_MODULE_3__.n$)());
                completeContext.status = _this.status;
                observable.notify((0, tslib__WEBPACK_IMPORTED_MODULE_5__.pi)({}, completeContext));
            }));
            this.addEventListener("loadend", onEnd);
            observable.notify(startContext);
        }
        function abortXhr() {
            var context = xhrContexts.get(this);
            if (context) context.isAborted = true;
        }
    },
    4175: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
            fP: () => validateAndBuildConfiguration
        });
        if (998 != __webpack_require__.j) var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9312);
        if (998 != __webpack_require__.j) var _browser_cookie__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4035);
        if (998 != __webpack_require__.j) var _tools_catchUserErrors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2709);
        if (998 != __webpack_require__.j) var _tools_display__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6155);
        if (998 != __webpack_require__.j) var _tools_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2492);
        if (998 != __webpack_require__.j) var _experimentalFeatures__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9628);
        if (998 != __webpack_require__.j) var _transportConfiguration__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9412);
        function validateAndBuildConfiguration(initConfiguration, buildEnv) {
            var _a;
            if (!initConfiguration || !initConfiguration.clientToken) {
                _tools_display__WEBPACK_IMPORTED_MODULE_0__.j.error("Client Token is not configured, we will not send any data.");
                return;
            }
            if (void 0 !== initConfiguration.sampleRate && !(0, _tools_utils__WEBPACK_IMPORTED_MODULE_1__.zz)(initConfiguration.sampleRate)) {
                _tools_display__WEBPACK_IMPORTED_MODULE_0__.j.error("Sample Rate should be a number between 0 and 100");
                return;
            }
            (0, _experimentalFeatures__WEBPACK_IMPORTED_MODULE_2__.V$)(initConfiguration.enableExperimentalFeatures);
            return (0, tslib__WEBPACK_IMPORTED_MODULE_3__.pi)((0, tslib__WEBPACK_IMPORTED_MODULE_3__.pi)({}, (0, 
            _transportConfiguration__WEBPACK_IMPORTED_MODULE_4__.h)(initConfiguration, buildEnv)), {
                beforeSend: initConfiguration.beforeSend && (0, _tools_catchUserErrors__WEBPACK_IMPORTED_MODULE_5__.Z)(initConfiguration.beforeSend, "beforeSend threw an error:"),
                cookieOptions: buildCookieOptions(initConfiguration),
                sampleRate: null !== (_a = initConfiguration.sampleRate) && void 0 !== _a ? _a : 100,
                service: initConfiguration.service,
                silentMultipleInit: !!initConfiguration.silentMultipleInit,
                batchBytesLimit: 16 * _tools_utils__WEBPACK_IMPORTED_MODULE_1__.Tn,
                eventRateLimiterThreshold: 3e3,
                maxInternalMonitoringMessagesPerPage: 15,
                flushTimeout: 30 * _tools_utils__WEBPACK_IMPORTED_MODULE_1__.WT,
                maxBatchSize: 50,
                maxMessageSize: 256 * _tools_utils__WEBPACK_IMPORTED_MODULE_1__.Tn
            });
        }
        function buildCookieOptions(initConfiguration) {
            var cookieOptions = {};
            cookieOptions.secure = mustUseSecureCookie(initConfiguration);
            cookieOptions.crossSite = !!initConfiguration.useCrossSiteSessionCookie;
            if (initConfiguration.trackSessionAcrossSubdomains) cookieOptions.domain = (0, _browser_cookie__WEBPACK_IMPORTED_MODULE_6__.WQ)();
            return cookieOptions;
        }
        function mustUseSecureCookie(initConfiguration) {
            return !!initConfiguration.useSecureSessionCookie || !!initConfiguration.useCrossSiteSessionCookie;
        }
    },
    681: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
            Ez: () => createEndpointBuilder,
            tR: () => INTAKE_SITE_US
        });
        if (998 != __webpack_require__.j) var _tools_timeUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7126);
        if (998 != __webpack_require__.j) var _tools_urlPolyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(575);
        if (998 != __webpack_require__.j) var _tools_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2492);
        var ENDPOINTS = {
            logs: "logs",
            rum: "rum",
            sessionReplay: "session-replay"
        };
        var INTAKE_TRACKS = {
            logs: "logs",
            rum: "rum",
            sessionReplay: "replay"
        };
        var INTAKE_SITE_US = "datadoghq.com";
        function createEndpointBuilder(initConfiguration, buildEnv, endpointType, tags, source) {
            var _a = initConfiguration.site, site = void 0 === _a ? INTAKE_SITE_US : _a, clientToken = initConfiguration.clientToken;
            var domainParts = site.split(".");
            var extension = domainParts.pop();
            var host = ENDPOINTS[endpointType] + ".browser-intake-" + domainParts.join("-") + "." + extension;
            var baseUrl = "https://" + host + "/api/v2/" + INTAKE_TRACKS[endpointType];
            var proxyUrl = initConfiguration.proxyUrl && (0, _tools_urlPolyfill__WEBPACK_IMPORTED_MODULE_0__.D5)(initConfiguration.proxyUrl);
            return {
                build: function() {
                    var parameters = "ddsource=" + (source || "browser") + "&ddtags=" + encodeURIComponent([ "sdk_version:" + buildEnv.sdkVersion ].concat(tags).join(",")) + "&dd-api-key=" + clientToken + "&dd-evp-origin-version=" + encodeURIComponent(buildEnv.sdkVersion) + "&dd-evp-origin=browser" + "&dd-request-id=" + (0, 
                    _tools_utils__WEBPACK_IMPORTED_MODULE_1__.DO)();
                    if ("rum" === endpointType) parameters += "&batch_time=" + (0, _tools_timeUtils__WEBPACK_IMPORTED_MODULE_2__.n$)();
                    var endpointUrl = baseUrl + "?" + parameters;
                    return proxyUrl ? proxyUrl + "?ddforward=" + encodeURIComponent(endpointUrl) : endpointUrl;
                },
                buildIntakeUrl: function() {
                    return proxyUrl ? proxyUrl + "?ddforward" : baseUrl;
                }
            };
        }
    },
    9628: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
            V$: () => updateExperimentalFeatures,
            W_: () => isExperimentalFeatureEnabled
        });
        var enabledExperimentalFeatures;
        function updateExperimentalFeatures(enabledFeatures) {
            if (!Array.isArray(enabledFeatures)) return;
            if (!enabledExperimentalFeatures) enabledExperimentalFeatures = new Set(enabledFeatures);
            enabledFeatures.filter((function(flag) {
                return "string" === typeof flag;
            })).forEach((function(flag) {
                enabledExperimentalFeatures.add(flag);
            }));
        }
        function isExperimentalFeatureEnabled(featureName) {
            return !!enabledExperimentalFeatures && enabledExperimentalFeatures.has(featureName);
        }
    },
    3262: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
            MS: () => buildTags
        });
        if (998 != __webpack_require__.j) var _tools_display__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6155);
        var TAG_SIZE_LIMIT = 200;
        function buildTags(configuration) {
            var env = configuration.env, service = configuration.service, version = configuration.version, datacenter = configuration.datacenter;
            var tags = [];
            if (env) tags.push(buildTag("env", env));
            if (service) tags.push(buildTag("service", service));
            if (version) tags.push(buildTag("version", version));
            if (datacenter) tags.push(buildTag("datacenter", datacenter));
            return tags;
        }
        var FORBIDDEN_CHARACTERS = /[^a-z0-9_:./-]/;
        function buildTag(key, rawValue) {
            var valueSizeLimit = TAG_SIZE_LIMIT - key.length - 1;
            if (rawValue.length > valueSizeLimit || FORBIDDEN_CHARACTERS.test(rawValue)) _tools_display__WEBPACK_IMPORTED_MODULE_0__.j.warn(key + " value doesn't meet tag requirements and will be sanitized");
            var sanitizedValue = rawValue.replace(/,/g, "_");
            return key + ":" + sanitizedValue;
        }
    },
    9412: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
            h: () => computeTransportConfiguration
        });
        if (998 != __webpack_require__.j) var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9312);
        if (998 != __webpack_require__.j) var _boot_init__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3650);
        if (998 != __webpack_require__.j) var _tools_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2492);
        if (998 != __webpack_require__.j) var _endpointBuilder__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(681);
        if (998 != __webpack_require__.j) var _tags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3262);
        function computeTransportConfiguration(initConfiguration, buildEnv) {
            var tags = (0, _tags__WEBPACK_IMPORTED_MODULE_0__.MS)(initConfiguration);
            var endpointBuilders = computeEndpointBuilders(initConfiguration, buildEnv, tags);
            var intakeEndpoints = (0, _tools_utils__WEBPACK_IMPORTED_MODULE_1__.TT)(endpointBuilders).map((function(builder) {
                return builder.buildIntakeUrl();
            }));
            var replicaConfiguration = computeReplicaConfiguration(initConfiguration, buildEnv, intakeEndpoints, tags);
            return (0, tslib__WEBPACK_IMPORTED_MODULE_2__.pi)((0, tslib__WEBPACK_IMPORTED_MODULE_2__.pi)({
                isIntakeUrl: function(url) {
                    return intakeEndpoints.some((function(intakeEndpoint) {
                        return 0 === url.indexOf(intakeEndpoint);
                    }));
                }
            }, endpointBuilders), {
                replica: replicaConfiguration
            });
        }
        function computeEndpointBuilders(initConfiguration, buildEnv, tags) {
            if (buildEnv.buildMode === _boot_init__WEBPACK_IMPORTED_MODULE_3__.f7.E2E_TEST) {
                var e2eEndpointBuilder = function(placeholder) {
                    return {
                        build: function() {
                            return placeholder;
                        },
                        buildIntakeUrl: function() {
                            return placeholder;
                        }
                    };
                };
                return {
                    logsEndpointBuilder: e2eEndpointBuilder("<<< E2E LOGS ENDPOINT >>>"),
                    rumEndpointBuilder: e2eEndpointBuilder("<<< E2E RUM ENDPOINT >>>"),
                    sessionReplayEndpointBuilder: e2eEndpointBuilder("<<< E2E SESSION REPLAY ENDPOINT >>>"),
                    internalMonitoringEndpointBuilder: e2eEndpointBuilder("<<< E2E INTERNAL MONITORING ENDPOINT >>>")
                };
            }
            var endpointBuilders = {
                logsEndpointBuilder: (0, _endpointBuilder__WEBPACK_IMPORTED_MODULE_4__.Ez)(initConfiguration, buildEnv, "logs", tags),
                rumEndpointBuilder: (0, _endpointBuilder__WEBPACK_IMPORTED_MODULE_4__.Ez)(initConfiguration, buildEnv, "rum", tags),
                sessionReplayEndpointBuilder: (0, _endpointBuilder__WEBPACK_IMPORTED_MODULE_4__.Ez)(initConfiguration, buildEnv, "sessionReplay", tags)
            };
            if (initConfiguration.internalMonitoringApiKey) return (0, tslib__WEBPACK_IMPORTED_MODULE_2__.pi)((0, 
            tslib__WEBPACK_IMPORTED_MODULE_2__.pi)({}, endpointBuilders), {
                internalMonitoringEndpointBuilder: (0, _endpointBuilder__WEBPACK_IMPORTED_MODULE_4__.Ez)((0, 
                tslib__WEBPACK_IMPORTED_MODULE_2__.pi)((0, tslib__WEBPACK_IMPORTED_MODULE_2__.pi)({}, initConfiguration), {
                    clientToken: initConfiguration.internalMonitoringApiKey
                }), buildEnv, "logs", tags, "browser-agent-internal-monitoring")
            });
            return endpointBuilders;
        }
        function computeReplicaConfiguration(initConfiguration, buildEnv, intakeEndpoints, tags) {
            if (!initConfiguration.replica) return;
            var replicaConfiguration = (0, tslib__WEBPACK_IMPORTED_MODULE_2__.pi)((0, tslib__WEBPACK_IMPORTED_MODULE_2__.pi)({}, initConfiguration), {
                site: _endpointBuilder__WEBPACK_IMPORTED_MODULE_4__.tR,
                clientToken: initConfiguration.replica.clientToken
            });
            var replicaEndpointBuilders = {
                logsEndpointBuilder: (0, _endpointBuilder__WEBPACK_IMPORTED_MODULE_4__.Ez)(replicaConfiguration, buildEnv, "logs", tags),
                rumEndpointBuilder: (0, _endpointBuilder__WEBPACK_IMPORTED_MODULE_4__.Ez)(replicaConfiguration, buildEnv, "rum", tags),
                internalMonitoringEndpointBuilder: (0, _endpointBuilder__WEBPACK_IMPORTED_MODULE_4__.Ez)(replicaConfiguration, buildEnv, "logs", tags, "browser-agent-internal-monitoring")
            };
            intakeEndpoints.push.apply(intakeEndpoints, (0, _tools_utils__WEBPACK_IMPORTED_MODULE_1__.TT)(replicaEndpointBuilders).map((function(builder) {
                return builder.buildIntakeUrl();
            })));
            return (0, tslib__WEBPACK_IMPORTED_MODULE_2__.pi)({
                applicationId: initConfiguration.replica.applicationId
            }, replicaEndpointBuilders);
        }
    },
    7786: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
            U: () => trackConsoleError
        });
        if (998 != __webpack_require__.j) var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9312);
        if (998 != __webpack_require__.j) var _tools_error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1495);
        if (998 != __webpack_require__.j) var _tools_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2521);
        if (998 != __webpack_require__.j) var _tools_timeUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7126);
        if (998 != __webpack_require__.j) var _tools_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2492);
        if (998 != __webpack_require__.j) var _internalMonitoring__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1714);
        if (998 != __webpack_require__.j) var _tracekit__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6017);
        function trackConsoleError(errorObservable) {
            startConsoleErrorProxy().subscribe((function(error) {
                return errorObservable.notify(error);
            }));
        }
        var originalConsoleError;
        var consoleErrorObservable;
        function startConsoleErrorProxy() {
            if (!consoleErrorObservable) {
                consoleErrorObservable = new _tools_observable__WEBPACK_IMPORTED_MODULE_0__.y;
                originalConsoleError = console.error;
                console.error = function() {
                    var params = [];
                    for (var _i = 0; _i < arguments.length; _i++) params[_i] = arguments[_i];
                    var handlingStack = (0, _tools_error__WEBPACK_IMPORTED_MODULE_1__.Xp)();
                    (0, _internalMonitoring__WEBPACK_IMPORTED_MODULE_2__.L6)((function() {
                        originalConsoleError.apply(console, params);
                        var rawError = (0, tslib__WEBPACK_IMPORTED_MODULE_3__.pi)((0, tslib__WEBPACK_IMPORTED_MODULE_3__.pi)({}, buildErrorFromParams(params, handlingStack)), {
                            source: _tools_error__WEBPACK_IMPORTED_MODULE_1__.zH.CONSOLE,
                            startClocks: (0, _tools_timeUtils__WEBPACK_IMPORTED_MODULE_4__.$I)(),
                            handling: _tools_error__WEBPACK_IMPORTED_MODULE_1__.Xw.HANDLED
                        });
                        consoleErrorObservable.notify(rawError);
                    }));
                };
            }
            return consoleErrorObservable;
        }
        function buildErrorFromParams(params, handlingStack) {
            var firstErrorParam = (0, _tools_utils__WEBPACK_IMPORTED_MODULE_5__.sE)(params, (function(param) {
                return param instanceof Error;
            }));
            return {
                message: (0, tslib__WEBPACK_IMPORTED_MODULE_3__.pr)([ "console error:" ], params).map((function(param) {
                    return formatConsoleParameters(param);
                })).join(" "),
                stack: firstErrorParam ? (0, _tools_error__WEBPACK_IMPORTED_MODULE_1__.P3)((0, _tracekit__WEBPACK_IMPORTED_MODULE_6__._t)(firstErrorParam)) : void 0,
                handlingStack
            };
        }
        function formatConsoleParameters(param) {
            if ("string" === typeof param) return param;
            if (param instanceof Error) return (0, _tools_error__WEBPACK_IMPORTED_MODULE_1__.jN)((0, 
            _tracekit__WEBPACK_IMPORTED_MODULE_6__._t)(param));
            return (0, _tools_utils__WEBPACK_IMPORTED_MODULE_5__.lh)(param, void 0, 2);
        }
    },
    3193: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
            L: () => trackRuntimeError
        });
        if (998 != __webpack_require__.j) var _tools_error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1495);
        if (998 != __webpack_require__.j) var _tools_timeUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7126);
        if (998 != __webpack_require__.j) var _tracekit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4507);
        function trackRuntimeError(errorObservable) {
            return (0, _tracekit__WEBPACK_IMPORTED_MODULE_0__.h)((function(stackTrace, errorObject) {
                var _a = (0, _tools_error__WEBPACK_IMPORTED_MODULE_1__.wl)(stackTrace, errorObject, "Uncaught"), stack = _a.stack, message = _a.message, type = _a.type;
                errorObservable.notify({
                    message,
                    stack,
                    type,
                    source: _tools_error__WEBPACK_IMPORTED_MODULE_1__.zH.SOURCE,
                    startClocks: (0, _tools_timeUtils__WEBPACK_IMPORTED_MODULE_2__.$I)(),
                    originalError: errorObject,
                    handling: _tools_error__WEBPACK_IMPORTED_MODULE_1__.Xw.UNHANDLED
                });
            }));
        }
    },
    1714: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
            L6: () => callMonitored,
            Th: () => monitored,
            ot: () => addMonitoringError,
            py: () => startInternalMonitoring,
            tV: () => addMonitoringMessage,
            yD: () => setDebugMode,
            zk: () => monitor
        });
        if (998 != __webpack_require__.j) var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9312);
        if (998 != __webpack_require__.j) var _tools_display__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6155);
        if (998 != __webpack_require__.j) var _tools_error__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1495);
        if (998 != __webpack_require__.j) var _tools_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2492);
        if (998 != __webpack_require__.j) var _transport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7681);
        if (998 != __webpack_require__.j) var _tracekit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6017);
        if (998 != __webpack_require__.j) var _startMonitoringBatch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(893);
        var StatusType;
        (function(StatusType) {
            StatusType["info"] = "info";
            StatusType["error"] = "error";
        })(StatusType || (StatusType = {}));
        var monitoringConfiguration = {
            maxMessagesPerPage: 0,
            sentMessageCount: 0
        };
        var onInternalMonitoringMessageCollected;
        function startInternalMonitoring(configuration) {
            var externalContextProvider;
            if ((0, _transport__WEBPACK_IMPORTED_MODULE_0__.x)()) {
                var bridge_1 = (0, _transport__WEBPACK_IMPORTED_MODULE_0__.A)();
                onInternalMonitoringMessageCollected = function(message) {
                    return bridge_1.send("internal_log", withContext(message));
                };
            } else if (configuration.internalMonitoringEndpointBuilder) {
                var batch_1 = (0, _startMonitoringBatch__WEBPACK_IMPORTED_MODULE_1__.g)(configuration);
                onInternalMonitoringMessageCollected = function(message) {
                    return batch_1.add(withContext(message));
                };
            }
            (0, _tools_utils__WEBPACK_IMPORTED_MODULE_2__.f0)(monitoringConfiguration, {
                maxMessagesPerPage: configuration.maxInternalMonitoringMessagesPerPage,
                sentMessageCount: 0
            });
            function withContext(message) {
                return (0, _tools_utils__WEBPACK_IMPORTED_MODULE_2__.$e)({
                    date: (new Date).getTime()
                }, void 0 !== externalContextProvider ? externalContextProvider() : {}, message);
            }
            return {
                setExternalContextProvider: function(provider) {
                    externalContextProvider = provider;
                }
            };
        }
        function monitored(_, __, descriptor) {
            var originalMethod = descriptor.value;
            descriptor.value = function() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
                var decorated = onInternalMonitoringMessageCollected ? monitor(originalMethod) : originalMethod;
                return decorated.apply(this, args);
            };
        }
        function monitor(fn) {
            return function() {
                return callMonitored(fn, this, arguments);
            };
        }
        function callMonitored(fn, context, args) {
            try {
                return fn.apply(context, args);
            } catch (e) {
                logErrorIfDebug(e);
                try {
                    addMonitoringError(e);
                } catch (e) {
                    logErrorIfDebug(e);
                }
            }
        }
        function addMonitoringMessage(message, context) {
            logMessageIfDebug(message, context);
            addToMonitoring((0, tslib__WEBPACK_IMPORTED_MODULE_3__.pi)((0, tslib__WEBPACK_IMPORTED_MODULE_3__.pi)({
                message
            }, context), {
                status: StatusType.info
            }));
        }
        function addMonitoringError(e) {
            addToMonitoring((0, tslib__WEBPACK_IMPORTED_MODULE_3__.pi)((0, tslib__WEBPACK_IMPORTED_MODULE_3__.pi)({}, formatError(e)), {
                status: StatusType.error
            }));
        }
        function addToMonitoring(message) {
            if (onInternalMonitoringMessageCollected && monitoringConfiguration.sentMessageCount < monitoringConfiguration.maxMessagesPerPage) {
                monitoringConfiguration.sentMessageCount += 1;
                onInternalMonitoringMessageCollected(message);
            }
        }
        function formatError(e) {
            if (e instanceof Error) {
                var stackTrace = (0, _tracekit__WEBPACK_IMPORTED_MODULE_4__._t)(e);
                return {
                    error: {
                        kind: stackTrace.name,
                        stack: (0, _tools_error__WEBPACK_IMPORTED_MODULE_5__.P3)(stackTrace)
                    },
                    message: stackTrace.message
                };
            }
            return {
                error: {
                    stack: "Not an instance of error"
                },
                message: "Uncaught " + (0, _tools_utils__WEBPACK_IMPORTED_MODULE_2__.lh)(e)
            };
        }
        function setDebugMode(debugMode) {
            monitoringConfiguration.debugMode = debugMode;
        }
        function logErrorIfDebug(e) {
            if (monitoringConfiguration.debugMode) _tools_display__WEBPACK_IMPORTED_MODULE_6__.j.error("[INTERNAL ERROR]", e);
        }
        function logMessageIfDebug(message, context) {
            if (monitoringConfiguration.debugMode) _tools_display__WEBPACK_IMPORTED_MODULE_6__.j.log("[MONITORING MESSAGE]", message, context);
        }
    },
    893: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
            g: () => startMonitoringBatch
        });
        if (998 != __webpack_require__.j) var _transport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8692);
        if (998 != __webpack_require__.j) var _transport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5554);
        function startMonitoringBatch(configuration) {
            var primaryBatch = createMonitoringBatch(configuration.internalMonitoringEndpointBuilder);
            var replicaBatch;
            if (void 0 !== configuration.replica) replicaBatch = createMonitoringBatch(configuration.replica.internalMonitoringEndpointBuilder);
            function createMonitoringBatch(endpointBuilder) {
                return new _transport__WEBPACK_IMPORTED_MODULE_0__.E(new _transport__WEBPACK_IMPORTED_MODULE_1__.a(endpointBuilder, configuration.batchBytesLimit), configuration.maxBatchSize, configuration.batchBytesLimit, configuration.maxMessageSize, configuration.flushTimeout);
            }
            return {
                add: function(message) {
                    primaryBatch.add(message);
                    if (replicaBatch) replicaBatch.add(message);
                }
            };
        }
    },
    6687: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
            TK: () => tryOldCookiesMigration
        });
        if (998 != __webpack_require__.j) var _browser_cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4035);
        if (998 != __webpack_require__.j) var _sessionCookieStore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9258);
        var OLD_SESSION_COOKIE_NAME = "_dd";
        var OLD_RUM_COOKIE_NAME = "_dd_r";
        var OLD_LOGS_COOKIE_NAME = "_dd_l";
        var RUM_SESSION_KEY = "rum";
        var LOGS_SESSION_KEY = "logs";
        function tryOldCookiesMigration(options) {
            var sessionString = (0, _browser_cookie__WEBPACK_IMPORTED_MODULE_0__.ej)(_sessionCookieStore__WEBPACK_IMPORTED_MODULE_1__.sV);
            var oldSessionId = (0, _browser_cookie__WEBPACK_IMPORTED_MODULE_0__.ej)(OLD_SESSION_COOKIE_NAME);
            var oldRumType = (0, _browser_cookie__WEBPACK_IMPORTED_MODULE_0__.ej)(OLD_RUM_COOKIE_NAME);
            var oldLogsType = (0, _browser_cookie__WEBPACK_IMPORTED_MODULE_0__.ej)(OLD_LOGS_COOKIE_NAME);
            if (!sessionString) {
                var session = {};
                if (oldSessionId) session.id = oldSessionId;
                if (oldLogsType && /^[01]$/.test(oldLogsType)) session[LOGS_SESSION_KEY] = oldLogsType;
                if (oldRumType && /^[012]$/.test(oldRumType)) session[RUM_SESSION_KEY] = oldRumType;
                (0, _sessionCookieStore__WEBPACK_IMPORTED_MODULE_1__.En)(session, options);
            }
        }
    },
    9258: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
            En: () => persistSession,
            jx: () => withCookieLockAccess,
            sV: () => SESSION_COOKIE_NAME,
            w3: () => retrieveSession
        });
        if (998 != __webpack_require__.j) var _browser_cookie__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4035);
        if (998 != __webpack_require__.j) var _tools_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2492);
        if (998 != __webpack_require__.j) var _configuration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9628);
        if (998 != __webpack_require__.j) var _internalMonitoring__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1714);
        if (998 != __webpack_require__.j) var _sessionStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6205);
        var SESSION_ENTRY_REGEXP = /^([a-z]+)=([a-z0-9-]+)$/;
        var SESSION_ENTRY_SEPARATOR = "&";
        var SESSION_COOKIE_NAME = "_dd_s";
        var LOCK_RETRY_DELAY = 10;
        var MAX_NUMBER_OF_LOCK_RETRIES = 100;
        var bufferedOperations = 998 != __webpack_require__.j ? [] : null;
        var ongoingOperations;
        function withCookieLockAccess(operations, numberOfRetries) {
            var _a;
            if (void 0 === numberOfRetries) numberOfRetries = 0;
            if (!ongoingOperations) ongoingOperations = operations;
            if (operations !== ongoingOperations) {
                bufferedOperations.push(operations);
                return;
            }
            if (numberOfRetries >= MAX_NUMBER_OF_LOCK_RETRIES) {
                (0, _internalMonitoring__WEBPACK_IMPORTED_MODULE_0__.tV)("Reach max lock retry");
                next();
                return;
            }
            var currentLock;
            var currentSession = retrieveSession();
            if ((0, _configuration__WEBPACK_IMPORTED_MODULE_1__.W_)("cookie-lock")) {
                if (currentSession.lock) {
                    retryLater(operations, numberOfRetries);
                    return;
                }
                currentLock = _tools_utils__WEBPACK_IMPORTED_MODULE_2__.DO();
                currentSession.lock = currentLock;
                setSession(currentSession, operations.options);
                currentSession = retrieveSession();
                if (currentSession.lock !== currentLock) {
                    retryLater(operations, numberOfRetries);
                    return;
                }
            }
            var processedSession = operations.process(currentSession);
            if ((0, _configuration__WEBPACK_IMPORTED_MODULE_1__.W_)("cookie-lock")) {
                currentSession = retrieveSession();
                if (currentSession.lock !== currentLock) {
                    retryLater(operations, numberOfRetries);
                    return;
                }
            }
            if (processedSession) persistSession(processedSession, operations.options);
            if ((0, _configuration__WEBPACK_IMPORTED_MODULE_1__.W_)("cookie-lock")) if (!(processedSession && isExpiredState(processedSession))) {
                currentSession = retrieveSession();
                if (currentSession.lock !== currentLock) {
                    retryLater(operations, numberOfRetries);
                    return;
                }
                delete currentSession.lock;
                setSession(currentSession, operations.options);
                processedSession = currentSession;
            }
            null === (_a = operations.after) || void 0 === _a ? void 0 : _a.call(operations, processedSession || currentSession);
            next();
        }
        function retryLater(operations, currentNumberOfRetries) {
            setTimeout((0, _internalMonitoring__WEBPACK_IMPORTED_MODULE_0__.zk)((function() {
                withCookieLockAccess(operations, currentNumberOfRetries + 1);
            })), LOCK_RETRY_DELAY);
        }
        function next() {
            ongoingOperations = void 0;
            var nextOperations = bufferedOperations.shift();
            if (nextOperations) withCookieLockAccess(nextOperations);
        }
        function persistSession(session, options) {
            if (isExpiredState(session)) {
                clearSession(options);
                return;
            }
            session.expire = String(Date.now() + _sessionStore__WEBPACK_IMPORTED_MODULE_3__.sr);
            setSession(session, options);
        }
        function setSession(session, options) {
            (0, _browser_cookie__WEBPACK_IMPORTED_MODULE_4__.d8)(SESSION_COOKIE_NAME, toSessionString(session), _sessionStore__WEBPACK_IMPORTED_MODULE_3__.sr, options);
        }
        function toSessionString(session) {
            return _tools_utils__WEBPACK_IMPORTED_MODULE_2__.qP(session).map((function(_a) {
                var key = _a[0], value = _a[1];
                return key + "=" + value;
            })).join(SESSION_ENTRY_SEPARATOR);
        }
        function retrieveSession() {
            var sessionString = (0, _browser_cookie__WEBPACK_IMPORTED_MODULE_4__.ej)(SESSION_COOKIE_NAME);
            var session = {};
            if (isValidSessionString(sessionString)) sessionString.split(SESSION_ENTRY_SEPARATOR).forEach((function(entry) {
                var matches = SESSION_ENTRY_REGEXP.exec(entry);
                if (null !== matches) {
                    var key = matches[1], value = matches[2];
                    session[key] = value;
                }
            }));
            return session;
        }
        function isValidSessionString(sessionString) {
            return void 0 !== sessionString && (-1 !== sessionString.indexOf(SESSION_ENTRY_SEPARATOR) || SESSION_ENTRY_REGEXP.test(sessionString));
        }
        function isExpiredState(session) {
            return _tools_utils__WEBPACK_IMPORTED_MODULE_2__.Qr(session);
        }
        function clearSession(options) {
            (0, _browser_cookie__WEBPACK_IMPORTED_MODULE_4__.d8)(SESSION_COOKIE_NAME, "", 0, options);
        }
    },
    4426: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
            HX: () => startSessionManager
        });
        var _tools_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2492);
        if (998 != __webpack_require__.j) var _internalMonitoring__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1714);
        if (998 != __webpack_require__.j) var _tools_contextHistory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1746);
        if (998 != __webpack_require__.j) var _tools_timeUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7126);
        if (998 != __webpack_require__.j) var _oldCookiesMigration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6687);
        var _sessionStore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6205);
        var VISIBILITY_CHECK_DELAY = _tools_utils__WEBPACK_IMPORTED_MODULE_0__.yR;
        var SESSION_CONTEXT_TIMEOUT_DELAY = _sessionStore__WEBPACK_IMPORTED_MODULE_1__.TN;
        var stopCallbacks = 998 != __webpack_require__.j ? [] : null;
        function startSessionManager(options, productKey, computeSessionState) {
            (0, _oldCookiesMigration__WEBPACK_IMPORTED_MODULE_2__.TK)(options);
            var sessionStore = (0, _sessionStore__WEBPACK_IMPORTED_MODULE_1__.vH)(options, productKey, computeSessionState);
            stopCallbacks.push((function() {
                return sessionStore.stop();
            }));
            var sessionContextHistory = new _tools_contextHistory__WEBPACK_IMPORTED_MODULE_3__.W(SESSION_CONTEXT_TIMEOUT_DELAY);
            stopCallbacks.push((function() {
                return sessionContextHistory.stop();
            }));
            sessionStore.renewObservable.subscribe((function() {
                sessionContextHistory.setCurrent(buildSessionContext(), (0, _tools_timeUtils__WEBPACK_IMPORTED_MODULE_4__._q)());
            }));
            sessionStore.expireObservable.subscribe((function() {
                sessionContextHistory.closeCurrent((0, _tools_timeUtils__WEBPACK_IMPORTED_MODULE_4__._q)());
            }));
            sessionStore.expandOrRenewSession();
            sessionContextHistory.setCurrent(buildSessionContext(), (0, _tools_timeUtils__WEBPACK_IMPORTED_MODULE_4__.cQ)().relative);
            trackActivity((function() {
                return sessionStore.expandOrRenewSession();
            }));
            trackVisibility((function() {
                return sessionStore.expandSession();
            }));
            function buildSessionContext() {
                return {
                    id: sessionStore.getSession().id,
                    trackingType: sessionStore.getSession()[productKey]
                };
            }
            return {
                findActiveSession: function(startTime) {
                    return sessionContextHistory.find(startTime);
                },
                renewObservable: sessionStore.renewObservable,
                expireObservable: sessionStore.expireObservable
            };
        }
        function trackActivity(expandOrRenewSession) {
            var stop = _tools_utils__WEBPACK_IMPORTED_MODULE_0__.yw(window, [ "click", "touchstart", "keydown", "scroll" ], expandOrRenewSession, {
                capture: true,
                passive: true
            }).stop;
            stopCallbacks.push(stop);
        }
        function trackVisibility(expandSession) {
            var expandSessionWhenVisible = (0, _internalMonitoring__WEBPACK_IMPORTED_MODULE_5__.zk)((function() {
                if ("visible" === document.visibilityState) expandSession();
            }));
            var stop = _tools_utils__WEBPACK_IMPORTED_MODULE_0__.Oo(document, "visibilitychange", expandSessionWhenVisible).stop;
            stopCallbacks.push(stop);
            var visibilityCheckInterval = setInterval(expandSessionWhenVisible, VISIBILITY_CHECK_DELAY);
            stopCallbacks.push((function() {
                clearInterval(visibilityCheckInterval);
            }));
        }
    },
    6205: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
            TN: () => SESSION_TIME_OUT_DELAY,
            sr: () => SESSION_EXPIRATION_DELAY,
            vH: () => startSessionStore
        });
        if (998 != __webpack_require__.j) var _browser_cookie__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4035);
        if (998 != __webpack_require__.j) var _tools_observable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2521);
        var _tools_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2492);
        if (998 != __webpack_require__.j) var _internalMonitoring__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1714);
        if (998 != __webpack_require__.j) var _sessionCookieStore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9258);
        var SESSION_EXPIRATION_DELAY = 15 * _tools_utils__WEBPACK_IMPORTED_MODULE_0__.yR;
        var SESSION_TIME_OUT_DELAY = 4 * _tools_utils__WEBPACK_IMPORTED_MODULE_0__.dV;
        function startSessionStore(options, productKey, computeSessionState) {
            var renewObservable = new _tools_observable__WEBPACK_IMPORTED_MODULE_1__.y;
            var expireObservable = new _tools_observable__WEBPACK_IMPORTED_MODULE_1__.y;
            var watchSessionTimeoutId = setInterval((0, _internalMonitoring__WEBPACK_IMPORTED_MODULE_2__.zk)(watchSession), _browser_cookie__WEBPACK_IMPORTED_MODULE_3__.MI);
            var sessionCache = retrieveActiveSession();
            function expandOrRenewSession() {
                var isTracked;
                (0, _sessionCookieStore__WEBPACK_IMPORTED_MODULE_4__.jx)({
                    options,
                    process: function(cookieSession) {
                        var synchronizedSession = synchronizeSession(cookieSession);
                        isTracked = expandOrRenewCookie(synchronizedSession);
                        return synchronizedSession;
                    },
                    after: function(cookieSession) {
                        if (isTracked && !hasSessionInCache()) renewSession(cookieSession);
                        sessionCache = cookieSession;
                    }
                });
            }
            function expandSession() {
                (0, _sessionCookieStore__WEBPACK_IMPORTED_MODULE_4__.jx)({
                    options,
                    process: function(cookieSession) {
                        return hasSessionInCache() ? synchronizeSession(cookieSession) : void 0;
                    }
                });
            }
            function watchSession() {
                (0, _sessionCookieStore__WEBPACK_IMPORTED_MODULE_4__.jx)({
                    options,
                    process: function(cookieSession) {
                        return !isActiveSession(cookieSession) ? {} : void 0;
                    },
                    after: synchronizeSession
                });
            }
            function synchronizeSession(cookieSession) {
                if (!isActiveSession(cookieSession)) cookieSession = {};
                if (hasSessionInCache()) if (isSessionInCacheOutdated(cookieSession)) expireSession(); else sessionCache = cookieSession;
                return cookieSession;
            }
            function expandOrRenewCookie(cookieSession) {
                var _a = computeSessionState(cookieSession[productKey]), trackingType = _a.trackingType, isTracked = _a.isTracked;
                cookieSession[productKey] = trackingType;
                if (isTracked && !cookieSession.id) {
                    cookieSession.id = _tools_utils__WEBPACK_IMPORTED_MODULE_0__.DO();
                    cookieSession.created = String(Date.now());
                }
                return isTracked;
            }
            function hasSessionInCache() {
                return void 0 !== sessionCache[productKey];
            }
            function isSessionInCacheOutdated(cookieSession) {
                if (sessionCache.id !== cookieSession.id) {
                    if (cookieSession.id && isActiveSession(sessionCache)) addSessionInconsistenciesMessage(cookieSession, "different id");
                    return true;
                }
                if (sessionCache[productKey] !== cookieSession[productKey]) {
                    addSessionInconsistenciesMessage(cookieSession, "different tracking type");
                    return true;
                }
                return false;
            }
            function addSessionInconsistenciesMessage(cookieSession, cause) {
                (0, _internalMonitoring__WEBPACK_IMPORTED_MODULE_2__.tV)("Session inconsistencies detected", {
                    debug: {
                        productKey,
                        sessionCache,
                        cookieSession,
                        cause
                    }
                });
            }
            function expireSession() {
                sessionCache = {};
                expireObservable.notify();
            }
            function renewSession(cookieSession) {
                sessionCache = cookieSession;
                renewObservable.notify();
            }
            function retrieveActiveSession() {
                var session = (0, _sessionCookieStore__WEBPACK_IMPORTED_MODULE_4__.w3)();
                if (isActiveSession(session)) return session;
                return {};
            }
            function isActiveSession(session) {
                return (void 0 === session.created || Date.now() - Number(session.created) < SESSION_TIME_OUT_DELAY) && (void 0 === session.expire || Date.now() < Number(session.expire));
            }
            return {
                expandOrRenewSession: _tools_utils__WEBPACK_IMPORTED_MODULE_0__.P2((0, _internalMonitoring__WEBPACK_IMPORTED_MODULE_2__.zk)(expandOrRenewSession), _browser_cookie__WEBPACK_IMPORTED_MODULE_3__.MI).throttled,
                expandSession,
                getSession: function() {
                    return sessionCache;
                },
                renewObservable,
                expireObservable,
                stop: function() {
                    clearInterval(watchSessionTimeoutId);
                }
            };
        }
    },
    6017: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
            _t: () => computeStackTrace
        });
        var UNKNOWN_FUNCTION = "?";
        function computeStackTrace(ex, depth) {
            var stack;
            var normalizedDepth = void 0 === depth ? 0 : +depth;
            try {
                stack = computeStackTraceFromStacktraceProp(ex);
                if (stack) return stack;
            } catch (e) {
                if (debug) throw e;
            }
            try {
                stack = computeStackTraceFromStackProp(ex);
                if (stack) return stack;
            } catch (e) {
                if (debug) throw e;
            }
            try {
                stack = computeStackTraceFromOperaMultiLineMessage(ex);
                if (stack) return stack;
            } catch (e) {
                if (debug) throw e;
            }
            try {
                stack = computeStackTraceByWalkingCallerChain(ex, normalizedDepth + 1);
                if (stack) return stack;
            } catch (e) {
                if (debug) throw e;
            }
            return {
                message: tryToGetString(ex, "message"),
                name: tryToGetString(ex, "name"),
                stack: []
            };
        }
        var debug = false;
        function computeStackTraceFromStackProp(ex) {
            var stacktrace = tryToGetString(ex, "stack");
            if (!stacktrace) return;
            var chrome = /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i;
            var gecko = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|capacitor|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i;
            var winjs = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i;
            var isEval;
            var geckoEval = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;
            var chromeEval = /\((\S*)(?::(\d+))(?::(\d+))\)/;
            var lines = stacktrace.split("\n");
            var stack = [];
            var submatch;
            var parts;
            var element;
            for (var i = 0, j = lines.length; i < j; i += 1) {
                if (chrome.exec(lines[i])) {
                    parts = chrome.exec(lines[i]);
                    var isNative = parts[2] && 0 === parts[2].indexOf("native");
                    isEval = parts[2] && 0 === parts[2].indexOf("eval");
                    submatch = chromeEval.exec(parts[2]);
                    if (isEval && submatch) {
                        parts[2] = submatch[1];
                        parts[3] = submatch[2];
                        parts[4] = submatch[3];
                    }
                    element = {
                        args: isNative ? [ parts[2] ] : [],
                        column: parts[4] ? +parts[4] : void 0,
                        func: parts[1] || UNKNOWN_FUNCTION,
                        line: parts[3] ? +parts[3] : void 0,
                        url: !isNative ? parts[2] : void 0
                    };
                } else if (winjs.exec(lines[i])) {
                    parts = winjs.exec(lines[i]);
                    element = {
                        args: [],
                        column: parts[4] ? +parts[4] : void 0,
                        func: parts[1] || UNKNOWN_FUNCTION,
                        line: +parts[3],
                        url: parts[2]
                    };
                } else if (gecko.exec(lines[i])) {
                    parts = gecko.exec(lines[i]);
                    isEval = parts[3] && parts[3].indexOf(" > eval") > -1;
                    submatch = geckoEval.exec(parts[3]);
                    if (isEval && submatch) {
                        parts[3] = submatch[1];
                        parts[4] = submatch[2];
                        parts[5] = void 0;
                    } else if (0 === i && !parts[5] && !isUndefined(ex.columnNumber)) stack[0].column = ex.columnNumber + 1;
                    element = {
                        args: parts[2] ? parts[2].split(",") : [],
                        column: parts[5] ? +parts[5] : void 0,
                        func: parts[1] || UNKNOWN_FUNCTION,
                        line: parts[4] ? +parts[4] : void 0,
                        url: parts[3]
                    };
                } else continue;
                if (!element.func && element.line) element.func = UNKNOWN_FUNCTION;
                stack.push(element);
            }
            if (!stack.length) return;
            return {
                stack,
                message: tryToGetString(ex, "message"),
                name: tryToGetString(ex, "name")
            };
        }
        function computeStackTraceFromStacktraceProp(ex) {
            var stacktrace = tryToGetString(ex, "stacktrace");
            if (!stacktrace) return;
            var opera10Regex = / line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i;
            var opera11Regex = / line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^)]+))\((.*)\))? in (.*):\s*$/i;
            var lines = stacktrace.split("\n");
            var stack = [];
            var parts;
            for (var line = 0; line < lines.length; line += 2) {
                var element = void 0;
                if (opera10Regex.exec(lines[line])) {
                    parts = opera10Regex.exec(lines[line]);
                    element = {
                        args: [],
                        column: void 0,
                        func: parts[3],
                        line: +parts[1],
                        url: parts[2]
                    };
                } else if (opera11Regex.exec(lines[line])) {
                    parts = opera11Regex.exec(lines[line]);
                    element = {
                        args: parts[5] ? parts[5].split(",") : [],
                        column: +parts[2],
                        func: parts[3] || parts[4],
                        line: +parts[1],
                        url: parts[6]
                    };
                }
                if (element) {
                    if (!element.func && element.line) element.func = UNKNOWN_FUNCTION;
                    element.context = [ lines[line + 1] ];
                    stack.push(element);
                }
            }
            if (!stack.length) return;
            return {
                stack,
                message: tryToGetString(ex, "message"),
                name: tryToGetString(ex, "name")
            };
        }
        function computeStackTraceFromOperaMultiLineMessage(ex) {
            var message = tryToGetString(ex, "message");
            if (!message) return;
            var lines = message.split("\n");
            if (lines.length < 4) return;
            var lineRE1 = /^\s*Line (\d+) of linked script ((?:file|https?|blob)\S+)(?:: in function (\S+))?\s*$/i;
            var lineRE2 = /^\s*Line (\d+) of inline#(\d+) script in ((?:file|https?|blob)\S+)(?:: in function (\S+))?\s*$/i;
            var lineRE3 = /^\s*Line (\d+) of function script\s*$/i;
            var stack = [];
            var scripts = window && window.document && window.document.getElementsByTagName("script");
            var inlineScriptBlocks = [];
            var parts;
            for (var s in scripts) if (has(scripts, s) && !scripts[s].src) inlineScriptBlocks.push(scripts[s]);
            for (var line = 2; line < lines.length; line += 2) {
                var item = void 0;
                if (lineRE1.exec(lines[line])) {
                    parts = lineRE1.exec(lines[line]);
                    item = {
                        args: [],
                        column: void 0,
                        func: parts[3],
                        line: +parts[1],
                        url: parts[2]
                    };
                } else if (lineRE2.exec(lines[line])) {
                    parts = lineRE2.exec(lines[line]);
                    item = {
                        args: [],
                        column: void 0,
                        func: parts[4],
                        line: +parts[1],
                        url: parts[3]
                    };
                } else if (lineRE3.exec(lines[line])) {
                    parts = lineRE3.exec(lines[line]);
                    var url = window.location.href.replace(/#.*$/, "");
                    item = {
                        url,
                        args: [],
                        column: void 0,
                        func: "",
                        line: +parts[1]
                    };
                }
                if (item) {
                    if (!item.func) item.func = UNKNOWN_FUNCTION;
                    item.context = [ lines[line + 1] ];
                    stack.push(item);
                }
            }
            if (!stack.length) return;
            return {
                stack,
                message: lines[0],
                name: tryToGetString(ex, "name")
            };
        }
        function augmentStackTraceWithInitialElement(stackInfo, url, lineNo) {
            var initial = {
                url,
                line: lineNo ? +lineNo : void 0
            };
            if (initial.url && initial.line) {
                stackInfo.incomplete = false;
                var stack = stackInfo.stack;
                if (stack.length > 0) if (stack[0].url === initial.url) {
                    if (stack[0].line === initial.line) return false;
                    if (!stack[0].line && stack[0].func === initial.func) {
                        stack[0].line = initial.line;
                        stack[0].context = initial.context;
                        return false;
                    }
                }
                stack.unshift(initial);
                stackInfo.partial = true;
                return true;
            }
            stackInfo.incomplete = true;
            return false;
        }
        function computeStackTraceByWalkingCallerChain(ex, depth) {
            var functionName = /function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i;
            var stack = [];
            var funcs = {};
            var recursion = false;
            var parts;
            var item;
            for (var curr = computeStackTraceByWalkingCallerChain.caller; curr && !recursion; curr = curr.caller) {
                if (curr === computeStackTrace) continue;
                item = {
                    args: [],
                    column: void 0,
                    func: UNKNOWN_FUNCTION,
                    line: void 0,
                    url: void 0
                };
                parts = functionName.exec(curr.toString());
                if (curr.name) item.func = curr.name; else if (parts) item.func = parts[1];
                if ("undefined" === typeof item.func) item.func = parts ? parts.input.substring(0, parts.input.indexOf("{")) : void 0;
                if (funcs[curr.toString()]) recursion = true; else funcs[curr.toString()] = true;
                stack.push(item);
            }
            if (depth) stack.splice(0, depth);
            var result = {
                stack,
                message: tryToGetString(ex, "message"),
                name: tryToGetString(ex, "name")
            };
            augmentStackTraceWithInitialElement(result, tryToGetString(ex, "sourceURL") || tryToGetString(ex, "fileName"), tryToGetString(ex, "line") || tryToGetString(ex, "lineNumber"));
            return result;
        }
        function tryToGetString(candidate, property) {
            if ("object" !== typeof candidate || !candidate || !(property in candidate)) return;
            var value = candidate[property];
            return "string" === typeof value ? value : void 0;
        }
        function has(object, key) {
            return Object.prototype.hasOwnProperty.call(object, key);
        }
        function isUndefined(what) {
            return "undefined" === typeof what;
        }
    },
    4507: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
            h: () => startUnhandledErrorCollection
        });
        if (998 != __webpack_require__.j) var _tools_instrumentMethod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6765);
        if (998 != __webpack_require__.j) var _computeStackTrace__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6017);
        var ERROR_TYPES_RE = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/;
        function startUnhandledErrorCollection(callback) {
            var stopInstrumentingOnError = instrumentOnError(callback).stop;
            var stopInstrumentingOnUnhandledRejection = instrumentUnhandledRejection(callback).stop;
            return {
                stop: function() {
                    stopInstrumentingOnError();
                    stopInstrumentingOnUnhandledRejection();
                }
            };
        }
        function instrumentOnError(callback) {
            return (0, _tools_instrumentMethod__WEBPACK_IMPORTED_MODULE_0__.L)(window, "onerror", {
                before: function(message, url, lineNo, columnNo, errorObj) {
                    var stack;
                    if (errorObj) {
                        stack = (0, _computeStackTrace__WEBPACK_IMPORTED_MODULE_1__._t)(errorObj);
                        callback(stack, errorObj);
                    } else {
                        var location_1 = {
                            url,
                            column: columnNo,
                            line: lineNo
                        };
                        var name_1;
                        var msg = message;
                        if ("[object String]" === {}.toString.call(message)) {
                            var groups = ERROR_TYPES_RE.exec(msg);
                            if (groups) {
                                name_1 = groups[1];
                                msg = groups[2];
                            }
                        }
                        stack = {
                            name: name_1,
                            message: "string" === typeof msg ? msg : void 0,
                            stack: [ location_1 ]
                        };
                        callback(stack, message);
                    }
                }
            });
        }
        function instrumentUnhandledRejection(callback) {
            return (0, _tools_instrumentMethod__WEBPACK_IMPORTED_MODULE_0__.L)(window, "onunhandledrejection", {
                before: function(e) {
                    var reason = e.reason || "Empty reason";
                    var stack = (0, _computeStackTrace__WEBPACK_IMPORTED_MODULE_1__._t)(reason);
                    callback(stack, reason);
                }
            });
        }
    },
    8777: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
            S: () => BoundedBuffer
        });
        var BUFFER_LIMIT = 500;
        var BoundedBuffer = function() {
            function BoundedBuffer() {
                this.buffer = [];
            }
            BoundedBuffer.prototype.add = function(callback) {
                var length = this.buffer.push(callback);
                if (length > BUFFER_LIMIT) this.buffer.splice(0, 1);
            };
            BoundedBuffer.prototype.drain = function() {
                this.buffer.forEach((function(callback) {
                    return callback();
                }));
                this.buffer.length = 0;
            };
            return BoundedBuffer;
        }();
    },
    2709: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
            Z: () => catchUserErrors
        });
        if (998 != __webpack_require__.j) var _display__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6155);
        function catchUserErrors(fn, errorMsg) {
            return function() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
                try {
                    return fn.apply(void 0, args);
                } catch (err) {
                    _display__WEBPACK_IMPORTED_MODULE_0__.j.error(errorMsg, err);
                }
            };
        }
    },
    1746: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
            W: () => ContextHistory
        });
        var _timeUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7126);
        var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2492);
        var CLEAR_OLD_CONTEXTS_INTERVAL = _utils__WEBPACK_IMPORTED_MODULE_0__.yR;
        var ContextHistory = function() {
            function ContextHistory(expireDelay) {
                var _this = this;
                this.expireDelay = expireDelay;
                this.previousContexts = [];
                this.clearOldContextsInterval = setInterval((function() {
                    return _this.clearOldContexts();
                }), CLEAR_OLD_CONTEXTS_INTERVAL);
            }
            ContextHistory.prototype.find = function(startTime) {
                if (void 0 === startTime || void 0 !== this.current && void 0 !== this.currentStart && startTime >= this.currentStart) return this.current;
                for (var _i = 0, _a = this.previousContexts; _i < _a.length; _i++) {
                    var previousContext = _a[_i];
                    if (startTime > previousContext.endTime) break;
                    if (startTime >= previousContext.startTime) return previousContext.context;
                }
                return;
            };
            ContextHistory.prototype.setCurrent = function(current, startTime) {
                this.current = current;
                this.currentStart = startTime;
            };
            ContextHistory.prototype.getCurrent = function() {
                return this.current;
            };
            ContextHistory.prototype.clearCurrent = function() {
                this.current = void 0;
                this.currentStart = void 0;
            };
            ContextHistory.prototype.closeCurrent = function(endTime) {
                if (void 0 !== this.current && void 0 !== this.currentStart) {
                    this.previousContexts.unshift({
                        endTime,
                        context: this.current,
                        startTime: this.currentStart
                    });
                    this.clearCurrent();
                }
            };
            ContextHistory.prototype.clearOldContexts = function() {
                var oldTimeThreshold = (0, _timeUtils__WEBPACK_IMPORTED_MODULE_1__._q)() - this.expireDelay;
                while (this.previousContexts.length > 0 && this.previousContexts[this.previousContexts.length - 1].startTime < oldTimeThreshold) this.previousContexts.pop();
            };
            ContextHistory.prototype.reset = function() {
                this.clearCurrent();
                this.previousContexts = [];
            };
            ContextHistory.prototype.stop = function() {
                clearInterval(this.clearOldContextsInterval);
            };
            return ContextHistory;
        }();
    },
    8282: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
            W: () => createContextManager
        });
        function createContextManager() {
            var context = {};
            return {
                get: function() {
                    return context;
                },
                add: function(key, value) {
                    context[key] = value;
                },
                remove: function(key) {
                    delete context[key];
                },
                set: function(newContext) {
                    context = newContext;
                }
            };
        }
    },
    1161: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
            K: () => createEventRateLimiter
        });
        if (998 != __webpack_require__.j) var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2492);
        if (998 != __webpack_require__.j) var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1495);
        if (998 != __webpack_require__.j) var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7126);
        function createEventRateLimiter(eventType, limit, onLimitReached) {
            var eventCount = 0;
            var allowNextEvent = false;
            return {
                isLimitReached: function() {
                    if (0 === eventCount) setTimeout((function() {
                        eventCount = 0;
                    }), ___WEBPACK_IMPORTED_MODULE_0__.yR);
                    eventCount += 1;
                    if (eventCount <= limit || allowNextEvent) {
                        allowNextEvent = false;
                        return false;
                    }
                    if (eventCount === limit + 1) {
                        allowNextEvent = true;
                        try {
                            onLimitReached({
                                message: "Reached max number of " + eventType + "s by minute: " + limit,
                                source: ___WEBPACK_IMPORTED_MODULE_1__.zH.AGENT,
                                startClocks: (0, ___WEBPACK_IMPORTED_MODULE_2__.$I)()
                            });
                        } finally {
                            allowNextEvent = false;
                        }
                    }
                    return true;
                }
            };
        }
    },
    6155: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
            j: () => display
        });
        var display = {
            log: console.log.bind(console),
            warn: console.warn.bind(console),
            error: console.error.bind(console)
        };
    },
    1495: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
            P3: () => toStackTraceString,
            Xp: () => createHandlingStack,
            Xw: () => ErrorHandling,
            jN: () => formatErrorMessage,
            wl: () => formatUnknownError,
            zH: () => ErrorSource
        });
        if (998 != __webpack_require__.j) var _domain_internalMonitoring__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1714);
        if (998 != __webpack_require__.j) var _domain_tracekit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6017);
        if (998 != __webpack_require__.j) var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2492);
        var ErrorSource = {
            AGENT: "agent",
            CONSOLE: "console",
            CUSTOM: "custom",
            LOGGER: "logger",
            NETWORK: "network",
            SOURCE: "source"
        };
        var ErrorHandling;
        (function(ErrorHandling) {
            ErrorHandling["HANDLED"] = "handled";
            ErrorHandling["UNHANDLED"] = "unhandled";
        })(ErrorHandling || (ErrorHandling = {}));
        function formatUnknownError(stackTrace, errorObject, nonErrorPrefix, handlingStack) {
            if (!stackTrace || void 0 === stackTrace.message && !(errorObject instanceof Error)) return {
                message: nonErrorPrefix + " " + (0, _utils__WEBPACK_IMPORTED_MODULE_0__.lh)(errorObject),
                stack: "No stack, consider using an instance of Error",
                handlingStack,
                type: stackTrace && stackTrace.name
            };
            return {
                message: stackTrace.message || "Empty message",
                stack: toStackTraceString(stackTrace),
                handlingStack,
                type: stackTrace.name
            };
        }
        function toStackTraceString(stack) {
            var result = formatErrorMessage(stack);
            stack.stack.forEach((function(frame) {
                var func = "?" === frame.func ? "<anonymous>" : frame.func;
                var args = frame.args && frame.args.length > 0 ? "(" + frame.args.join(", ") + ")" : "";
                var line = frame.line ? ":" + frame.line : "";
                var column = frame.line && frame.column ? ":" + frame.column : "";
                result += "\n  at " + func + args + " @ " + frame.url + line + column;
            }));
            return result;
        }
        function formatErrorMessage(stack) {
            return (stack.name || "Error") + ": " + stack.message;
        }
        function createHandlingStack() {
            var internalFramesToSkip = 2;
            var error = new Error;
            var formattedStack;
            if (!error.stack) try {
                throw error;
            } catch (e) {
                (0, _utils__WEBPACK_IMPORTED_MODULE_0__.ZT)();
            }
            (0, _domain_internalMonitoring__WEBPACK_IMPORTED_MODULE_1__.L6)((function() {
                var stackTrace = (0, _domain_tracekit__WEBPACK_IMPORTED_MODULE_2__._t)(error);
                stackTrace.stack = stackTrace.stack.slice(internalFramesToSkip);
                formattedStack = toStackTraceString(stackTrace);
            }));
            return formattedStack;
        }
    },
    6765: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
            L: () => instrumentMethodAndCallOriginal,
            S: () => instrumentMethod
        });
        if (998 != __webpack_require__.j) var _domain_internalMonitoring__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1714);
        function instrumentMethod(object, method, instrumentationFactory) {
            var original = object[method];
            var instrumentation = instrumentationFactory(original);
            var instrumentationWrapper = function() {
                return instrumentation.apply(this, arguments);
            };
            object[method] = instrumentationWrapper;
            return {
                stop: function() {
                    if (object[method] === instrumentationWrapper) object[method] = original; else instrumentation = original;
                }
            };
        }
        function instrumentMethodAndCallOriginal(object, method, _a) {
            var before = _a.before, after = _a.after;
            return instrumentMethod(object, method, (function(original) {
                return function() {
                    var args = arguments;
                    var result;
                    if (before) (0, _domain_internalMonitoring__WEBPACK_IMPORTED_MODULE_0__.L6)(before, this, args);
                    if ("function" === typeof original) result = original.apply(this, args);
                    if (after) (0, _domain_internalMonitoring__WEBPACK_IMPORTED_MODULE_0__.L6)(after, this, args);
                    return result;
                };
            }));
        }
    },
    2521: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
            y: () => Observable
        });
        var Observable = function() {
            function Observable(onFirstSubscribe) {
                this.onFirstSubscribe = onFirstSubscribe;
                this.observers = [];
            }
            Observable.prototype.subscribe = function(f) {
                var _this = this;
                if (!this.observers.length && this.onFirstSubscribe) this.onLastUnsubscribe = this.onFirstSubscribe() || void 0;
                this.observers.push(f);
                return {
                    unsubscribe: function() {
                        _this.observers = _this.observers.filter((function(other) {
                            return f !== other;
                        }));
                        if (!_this.observers.length && _this.onLastUnsubscribe) _this.onLastUnsubscribe();
                    }
                };
            };
            Observable.prototype.notify = function(data) {
                this.observers.forEach((function(observer) {
                    return observer(data);
                }));
            };
            return Observable;
        }();
    },
    7126: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
            $I: () => clocksNow,
            _J: () => elapsed,
            _q: () => relativeNow,
            cQ: () => clocksOrigin,
            n$: () => timeStampNow,
            ni: () => getRelativeTime
        });
        function timeStampNow() {
            return Date.now();
        }
        function relativeNow() {
            return performance.now();
        }
        function clocksNow() {
            return {
                relative: relativeNow(),
                timeStamp: timeStampNow()
            };
        }
        function clocksOrigin() {
            return {
                relative: 0,
                timeStamp: getNavigationStart()
            };
        }
        function elapsed(start, end) {
            return end - start;
        }
        function getRelativeTime(timestamp) {
            return timestamp - getNavigationStart();
        }
        var navigationStart;
        function getNavigationStart() {
            if (void 0 === navigationStart) navigationStart = performance.timing.navigationStart;
            return navigationStart;
        }
    },
    575: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
            D5: () => normalizeUrl
        });
        if (998 != __webpack_require__.j) var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2492);
        function normalizeUrl(url) {
            return buildUrl(url, (0, _utils__WEBPACK_IMPORTED_MODULE_0__.Dp)()).href;
        }
        function buildUrl(url, base) {
            if (checkURLSupported()) return void 0 !== base ? new URL(url, base) : new URL(url);
            if (void 0 === base && !/:/.test(url)) throw new Error("Invalid URL: '" + url + "'");
            var doc = document;
            var anchorElement = doc.createElement("a");
            if (void 0 !== base) {
                doc = document.implementation.createHTMLDocument("");
                var baseElement = doc.createElement("base");
                baseElement.href = base;
                doc.head.appendChild(baseElement);
                doc.body.appendChild(anchorElement);
            }
            anchorElement.href = url;
            return anchorElement;
        }
        var isURLSupported;
        function checkURLSupported() {
            if (void 0 !== isURLSupported) return isURLSupported;
            try {
                var url = new URL("http://test/path");
                isURLSupported = "http://test/path" === url.href;
                return isURLSupported;
            } catch (_a) {
                isURLSupported = false;
            }
            return isURLSupported;
        }
    },
    2492: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
            $e: () => combine,
            DO: () => generateUUID,
            Dp: () => getLocationOrigin,
            I8: () => deepClone,
            MY: () => findCommaSeparatedValue,
            Oo: () => addEventListener,
            P2: () => throttle,
            Qr: () => isEmptyObject,
            Rf: () => getGlobalObject,
            TT: () => objectValues,
            Tn: () => ONE_KILO_BYTE,
            WT: () => ONE_SECOND,
            ZT: () => noop,
            dV: () => ONE_HOUR,
            f0: () => assign,
            lh: () => jsonStringify,
            q9: () => includes,
            qP: () => objectEntries,
            sE: () => find,
            xd: () => RequestType,
            y7: () => performDraw,
            yR: () => ONE_MINUTE,
            yw: () => addEventListeners,
            zz: () => isPercentage
        });
        if (998 != __webpack_require__.j) var _domain_internalMonitoring__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1714);
        var ONE_SECOND = 1e3;
        var ONE_MINUTE = 60 * ONE_SECOND;
        var ONE_HOUR = 60 * ONE_MINUTE;
        var ONE_KILO_BYTE = 1024;
        var ResourceType;
        (function(ResourceType) {
            ResourceType["DOCUMENT"] = "document";
            ResourceType["XHR"] = "xhr";
            ResourceType["BEACON"] = "beacon";
            ResourceType["FETCH"] = "fetch";
            ResourceType["CSS"] = "css";
            ResourceType["JS"] = "js";
            ResourceType["IMAGE"] = "image";
            ResourceType["FONT"] = "font";
            ResourceType["MEDIA"] = "media";
            ResourceType["OTHER"] = "other";
        })(ResourceType || (ResourceType = {}));
        var RequestType;
        (function(RequestType) {
            RequestType["FETCH"] = "fetch";
            RequestType["XHR"] = "xhr";
        })(RequestType || (RequestType = {}));
        function throttle(fn, wait, options) {
            var needLeadingExecution = options && void 0 !== options.leading ? options.leading : true;
            var needTrailingExecution = options && void 0 !== options.trailing ? options.trailing : true;
            var inWaitPeriod = false;
            var pendingExecutionWithParameters;
            var pendingTimeoutId;
            return {
                throttled: function() {
                    var parameters = [];
                    for (var _i = 0; _i < arguments.length; _i++) parameters[_i] = arguments[_i];
                    if (inWaitPeriod) {
                        pendingExecutionWithParameters = parameters;
                        return;
                    }
                    if (needLeadingExecution) fn.apply(void 0, parameters); else pendingExecutionWithParameters = parameters;
                    inWaitPeriod = true;
                    pendingTimeoutId = setTimeout((function() {
                        if (needTrailingExecution && pendingExecutionWithParameters) fn.apply(void 0, pendingExecutionWithParameters);
                        inWaitPeriod = false;
                        pendingExecutionWithParameters = void 0;
                    }), wait);
                },
                cancel: function() {
                    clearTimeout(pendingTimeoutId);
                    inWaitPeriod = false;
                    pendingExecutionWithParameters = void 0;
                }
            };
        }
        function assign(target) {
            var toAssign = [];
            for (var _i = 1; _i < arguments.length; _i++) toAssign[_i - 1] = arguments[_i];
            toAssign.forEach((function(source) {
                for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
            }));
        }
        function generateUUID(placeholder) {
            return placeholder ? (parseInt(placeholder, 10) ^ 16 * Math.random() >> parseInt(placeholder, 10) / 4).toString(16) : (1e7 + "-" + 1e3 + "-" + 4e3 + "-" + 8e3 + "-" + 1e11).replace(/[018]/g, generateUUID);
        }
        function performDraw(threshold) {
            return 0 !== threshold && 100 * Math.random() <= threshold;
        }
        function noop() {}
        function jsonStringify(value, replacer, space) {
            if (null === value || void 0 === value) return JSON.stringify(value);
            var originalToJSON = [ false, void 0 ];
            if (hasToJSON(value)) {
                originalToJSON = [ true, value.toJSON ];
                delete value.toJSON;
            }
            var originalProtoToJSON = [ false, void 0 ];
            var prototype;
            if ("object" === typeof value) {
                prototype = Object.getPrototypeOf(value);
                if (hasToJSON(prototype)) {
                    originalProtoToJSON = [ true, prototype.toJSON ];
                    delete prototype.toJSON;
                }
            }
            var result;
            try {
                result = JSON.stringify(value, replacer, space);
            } catch (_a) {
                result = "<error: unable to serialize object>";
            } finally {
                if (originalToJSON[0]) value.toJSON = originalToJSON[1];
                if (originalProtoToJSON[0]) prototype.toJSON = originalProtoToJSON[1];
            }
            return result;
        }
        function hasToJSON(value) {
            return "object" === typeof value && null !== value && Object.prototype.hasOwnProperty.call(value, "toJSON");
        }
        function includes(candidate, search) {
            return -1 !== candidate.indexOf(search);
        }
        function find(array, predicate) {
            for (var i = 0; i < array.length; i += 1) {
                var item = array[i];
                if (predicate(item, i, array)) return item;
            }
            return;
        }
        function isPercentage(value) {
            return isNumber(value) && value >= 0 && value <= 100;
        }
        function isNumber(value) {
            return "number" === typeof value;
        }
        function objectValues(object) {
            return Object.keys(object).map((function(key) {
                return object[key];
            }));
        }
        function objectEntries(object) {
            return Object.keys(object).map((function(key) {
                return [ key, object[key] ];
            }));
        }
        function isEmptyObject(object) {
            return 0 === Object.keys(object).length;
        }
        function getGlobalObject() {
            if ("object" === typeof globalThis) return globalThis;
            Object.defineProperty(Object.prototype, "_dd_temp_", {
                get: function() {
                    return this;
                },
                configurable: true
            });
            var globalObject = _dd_temp_;
            delete Object.prototype._dd_temp_;
            if ("object" !== typeof globalObject) if ("object" === typeof self) globalObject = self; else if (true) globalObject = window;
            return globalObject;
        }
        function getLocationOrigin() {
            return getLinkElementOrigin(window.location);
        }
        function getLinkElementOrigin(element) {
            if (element.origin) return element.origin;
            var sanitizedHost = element.host.replace(/(:80|:443)$/, "");
            return element.protocol + "//" + sanitizedHost;
        }
        function findCommaSeparatedValue(rawString, name) {
            var regex = new RegExp("(?:^|;)\\s*" + name + "\\s*=\\s*([^;]+)");
            var matches = regex.exec(rawString);
            return matches ? matches[1] : void 0;
        }
        function addEventListener(emitter, event, listener, options) {
            return addEventListeners(emitter, [ event ], listener, options);
        }
        function addEventListeners(emitter, events, listener, _a) {
            var _b = void 0 === _a ? {} : _a, once = _b.once, capture = _b.capture, passive = _b.passive;
            var wrappedListener = (0, _domain_internalMonitoring__WEBPACK_IMPORTED_MODULE_0__.zk)(once ? function(event) {
                stop();
                listener(event);
            } : listener);
            var options = passive ? {
                capture,
                passive
            } : capture;
            events.forEach((function(event) {
                return emitter.addEventListener(event, wrappedListener, options);
            }));
            var stop = function() {
                return events.forEach((function(event) {
                    return emitter.removeEventListener(event, wrappedListener, options);
                }));
            };
            return {
                stop
            };
        }
        function getType(value) {
            if (null === value) return "null";
            if (Array.isArray(value)) return "array";
            return typeof value;
        }
        function createCircularReferenceChecker() {
            if ("undefined" !== typeof WeakSet) {
                var set_1 = new WeakSet;
                return {
                    hasAlreadyBeenSeen: function(value) {
                        var has = set_1.has(value);
                        if (!has) set_1.add(value);
                        return has;
                    }
                };
            }
            var array = [];
            return {
                hasAlreadyBeenSeen: function(value) {
                    var has = array.indexOf(value) >= 0;
                    if (!has) array.push(value);
                    return has;
                }
            };
        }
        function mergeInto(destination, source, circularReferenceChecker) {
            if (void 0 === circularReferenceChecker) circularReferenceChecker = createCircularReferenceChecker();
            if (void 0 === source) return destination;
            if ("object" !== typeof source || null === source) return source; else if (source instanceof Date) return new Date(source.getTime()); else if (source instanceof RegExp) {
                var flags = source.flags || [ source.global ? "g" : "", source.ignoreCase ? "i" : "", source.multiline ? "m" : "", source.sticky ? "y" : "", source.unicode ? "u" : "" ].join("");
                return new RegExp(source.source, flags);
            }
            if (circularReferenceChecker.hasAlreadyBeenSeen(source)) return; else if (Array.isArray(source)) {
                var merged_1 = Array.isArray(destination) ? destination : [];
                for (var i = 0; i < source.length; ++i) merged_1[i] = mergeInto(merged_1[i], source[i], circularReferenceChecker);
                return merged_1;
            }
            var merged = "object" === getType(destination) ? destination : {};
            for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) merged[key] = mergeInto(merged[key], source[key], circularReferenceChecker);
            return merged;
        }
        function deepClone(value) {
            return mergeInto(void 0, value);
        }
        function combine() {
            var sources = [];
            for (var _i = 0; _i < arguments.length; _i++) sources[_i] = arguments[_i];
            var destination;
            for (var _a = 0, sources_1 = sources; _a < sources_1.length; _a++) {
                var source = sources_1[_a];
                if (void 0 === source || null === source) continue;
                destination = mergeInto(destination, source);
            }
            return destination;
        }
    },
    8692: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
            E: () => Batch
        });
        var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9312);
        var _tools_display__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6155);
        var _tools_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2492);
        var _domain_internalMonitoring__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1714);
        var HAS_MULTI_BYTES_CHARACTERS = /[^\u0000-\u007F]/;
        var Batch = function() {
            function Batch(request, maxSize, bytesLimit, maxMessageSize, flushTimeout, beforeUnloadCallback) {
                if (void 0 === beforeUnloadCallback) beforeUnloadCallback = _tools_utils__WEBPACK_IMPORTED_MODULE_0__.ZT;
                this.request = request;
                this.maxSize = maxSize;
                this.bytesLimit = bytesLimit;
                this.maxMessageSize = maxMessageSize;
                this.flushTimeout = flushTimeout;
                this.beforeUnloadCallback = beforeUnloadCallback;
                this.pushOnlyBuffer = [];
                this.upsertBuffer = {};
                this.bufferBytesSize = 0;
                this.bufferMessageCount = 0;
                this.flushOnVisibilityHidden();
                this.flushPeriodically();
            }
            Batch.prototype.add = function(message) {
                this.addOrUpdate(message);
            };
            Batch.prototype.upsert = function(message, key) {
                this.addOrUpdate(message, key);
            };
            Batch.prototype.flush = function(reason) {
                if (0 !== this.bufferMessageCount) {
                    var messages = (0, tslib__WEBPACK_IMPORTED_MODULE_1__.pr)(this.pushOnlyBuffer, (0, 
                    _tools_utils__WEBPACK_IMPORTED_MODULE_0__.TT)(this.upsertBuffer));
                    this.request.send(messages.join("\n"), this.bufferBytesSize, reason);
                    this.pushOnlyBuffer = [];
                    this.upsertBuffer = {};
                    this.bufferBytesSize = 0;
                    this.bufferMessageCount = 0;
                }
            };
            Batch.prototype.sizeInBytes = function(candidate) {
                if (!HAS_MULTI_BYTES_CHARACTERS.test(candidate)) return candidate.length;
                if (void 0 !== window.TextEncoder) return (new TextEncoder).encode(candidate).length;
                return new Blob([ candidate ]).size;
            };
            Batch.prototype.addOrUpdate = function(message, key) {
                var _a = this.process(message), processedMessage = _a.processedMessage, messageBytesSize = _a.messageBytesSize;
                if (messageBytesSize >= this.maxMessageSize) {
                    _tools_display__WEBPACK_IMPORTED_MODULE_2__.j.warn("Discarded a message whose size was bigger than the maximum allowed size " + this.maxMessageSize + "KB.");
                    return;
                }
                if (this.hasMessageFor(key)) this.remove(key);
                if (this.willReachedBytesLimitWith(messageBytesSize)) this.flush("willReachedBytesLimitWith");
                this.push(processedMessage, messageBytesSize, key);
                if (this.isFull()) this.flush("isFull");
            };
            Batch.prototype.process = function(message) {
                var processedMessage = (0, _tools_utils__WEBPACK_IMPORTED_MODULE_0__.lh)(message);
                var messageBytesSize = this.sizeInBytes(processedMessage);
                return {
                    processedMessage,
                    messageBytesSize
                };
            };
            Batch.prototype.push = function(processedMessage, messageBytesSize, key) {
                if (this.bufferMessageCount > 0) this.bufferBytesSize += 1;
                if (void 0 !== key) this.upsertBuffer[key] = processedMessage; else this.pushOnlyBuffer.push(processedMessage);
                this.bufferBytesSize += messageBytesSize;
                this.bufferMessageCount += 1;
            };
            Batch.prototype.remove = function(key) {
                var removedMessage = this.upsertBuffer[key];
                delete this.upsertBuffer[key];
                var messageBytesSize = this.sizeInBytes(removedMessage);
                this.bufferBytesSize -= messageBytesSize;
                this.bufferMessageCount -= 1;
                if (this.bufferMessageCount > 0) this.bufferBytesSize -= 1;
            };
            Batch.prototype.hasMessageFor = function(key) {
                return void 0 !== key && void 0 !== this.upsertBuffer[key];
            };
            Batch.prototype.willReachedBytesLimitWith = function(messageBytesSize) {
                return this.bufferBytesSize + messageBytesSize + 1 >= this.bytesLimit;
            };
            Batch.prototype.isFull = function() {
                return this.bufferMessageCount === this.maxSize || this.bufferBytesSize >= this.bytesLimit;
            };
            Batch.prototype.flushPeriodically = function() {
                var _this = this;
                setTimeout((0, _domain_internalMonitoring__WEBPACK_IMPORTED_MODULE_3__.zk)((function() {
                    _this.flush("flushPeriodically");
                    _this.flushPeriodically();
                })), this.flushTimeout);
            };
            Batch.prototype.flushOnVisibilityHidden = function() {
                var _this = this;
                if (navigator.sendBeacon) {
                    (0, _tools_utils__WEBPACK_IMPORTED_MODULE_0__.Oo)(window, "beforeunload", this.beforeUnloadCallback);
                    (0, _tools_utils__WEBPACK_IMPORTED_MODULE_0__.Oo)(document, "visibilitychange", (function() {
                        if ("hidden" === document.visibilityState) _this.flush("visibilitychange");
                    }));
                    (0, _tools_utils__WEBPACK_IMPORTED_MODULE_0__.Oo)(window, "beforeunload", (function() {
                        return _this.flush("beforeunload");
                    }));
                }
            };
            return Batch;
        }();
    },
    7681: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
            A: () => getEventBridge,
            x: () => canUseEventBridge
        });
        if (998 != __webpack_require__.j) var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2492);
        if (998 != __webpack_require__.j) var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9628);
        function getEventBridge() {
            var eventBridgeGlobal = getEventBridgeGlobal();
            if (!eventBridgeGlobal) return;
            return {
                getAllowedWebViewHosts: function() {
                    return JSON.parse(eventBridgeGlobal.getAllowedWebViewHosts());
                },
                send: function(eventType, event) {
                    eventBridgeGlobal.send(JSON.stringify({
                        eventType,
                        event
                    }));
                }
            };
        }
        function canUseEventBridge() {
            var bridge = getEventBridge();
            return !!bridge && (0, ___WEBPACK_IMPORTED_MODULE_0__.q9)(bridge.getAllowedWebViewHosts(), window.location.hostname);
        }
        function getEventBridgeGlobal() {
            return (0, ___WEBPACK_IMPORTED_MODULE_1__.W_)("event-bridge") ? window.DatadogEventBridge : null;
        }
    },
    5554: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
            a: () => HttpRequest
        });
        var _domain_internalMonitoring__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1714);
        var hasReportedXhrError = false;
        var HttpRequest = function() {
            function HttpRequest(endpointBuilder, bytesLimit) {
                this.endpointBuilder = endpointBuilder;
                this.bytesLimit = bytesLimit;
            }
            HttpRequest.prototype.send = function(data, size, flushReason) {
                var url = this.endpointBuilder.build();
                var tryBeacon = !!navigator.sendBeacon && size < this.bytesLimit;
                if (tryBeacon) try {
                    var isQueued = navigator.sendBeacon(url, data);
                    if (isQueued) return;
                } catch (e) {
                    reportBeaconError(e);
                }
                var transportIntrospection = function(event) {
                    var req = null === event || void 0 === event ? void 0 : event.currentTarget;
                    if (req.status >= 200 && req.status < 300) return;
                    if (!hasReportedXhrError) {
                        hasReportedXhrError = true;
                        (0, _domain_internalMonitoring__WEBPACK_IMPORTED_MODULE_0__.tV)("XHR fallback failed", {
                            on_line: navigator.onLine,
                            size,
                            url,
                            try_beacon: tryBeacon,
                            flush_reason: flushReason,
                            event: {
                                is_trusted: event.isTrusted,
                                total: event.total,
                                loaded: event.loaded
                            },
                            request: {
                                status: req.status,
                                ready_state: req.readyState,
                                response_text: req.responseText.slice(0, 512)
                            }
                        });
                    }
                };
                var request = new XMLHttpRequest;
                request.addEventListener("loadend", (0, _domain_internalMonitoring__WEBPACK_IMPORTED_MODULE_0__.zk)((function(event) {
                    return transportIntrospection(event);
                })));
                request.open("POST", url, true);
                request.send(data);
            };
            return HttpRequest;
        }();
        var hasReportedBeaconError = false;
        function reportBeaconError(e) {
            if (!hasReportedBeaconError) {
                hasReportedBeaconError = true;
                (0, _domain_internalMonitoring__WEBPACK_IMPORTED_MODULE_0__.ot)(e);
            }
        }
    },
    2641: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
            DN: () => trackNetworkError
        });
        if (998 != __webpack_require__.j) var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5591);
        if (998 != __webpack_require__.j) var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2492);
        if (998 != __webpack_require__.j) var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6547);
        if (998 != __webpack_require__.j) var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1495);
        if (998 != __webpack_require__.j) var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6017);
        if (998 != __webpack_require__.j) var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1714);
        function trackNetworkError(configuration, errorObservable) {
            var xhrSubscription = (0, _datadog_browser_core__WEBPACK_IMPORTED_MODULE_0__.S)().subscribe((function(context) {
                if ("complete" === context.state) handleCompleteRequest(_datadog_browser_core__WEBPACK_IMPORTED_MODULE_1__.xd.XHR, context);
            }));
            var fetchSubscription = (0, _datadog_browser_core__WEBPACK_IMPORTED_MODULE_2__.y)().subscribe((function(context) {
                if ("complete" === context.state) handleCompleteRequest(_datadog_browser_core__WEBPACK_IMPORTED_MODULE_1__.xd.FETCH, context);
            }));
            function handleCompleteRequest(type, request) {
                if (!configuration.isIntakeUrl(request.url) && (isRejected(request) || isServerError(request))) if ("xhr" in request) computeXhrResponseData(request.xhr, configuration, onResponseDataAvailable); else if (request.response) computeFetchResponseText(request.response, configuration, onResponseDataAvailable); else if (request.error) computeFetchErrorText(request.error, configuration, onResponseDataAvailable);
                function onResponseDataAvailable(responseData) {
                    errorObservable.notify({
                        message: format(type) + " error " + request.method + " " + request.url,
                        resource: {
                            method: request.method,
                            statusCode: request.status,
                            url: request.url
                        },
                        source: _datadog_browser_core__WEBPACK_IMPORTED_MODULE_3__.zH.NETWORK,
                        stack: responseData || "Failed to load",
                        startClocks: request.startClocks
                    });
                }
            }
            return {
                stop: function() {
                    xhrSubscription.unsubscribe();
                    fetchSubscription.unsubscribe();
                }
            };
        }
        function computeXhrResponseData(xhr, configuration, callback) {
            if ("string" === typeof xhr.response) callback(truncateResponseText(xhr.response, configuration)); else callback(xhr.response);
        }
        function computeFetchErrorText(error, configuration, callback) {
            callback(truncateResponseText((0, _datadog_browser_core__WEBPACK_IMPORTED_MODULE_3__.P3)((0, 
            _datadog_browser_core__WEBPACK_IMPORTED_MODULE_4__._t)(error)), configuration));
        }
        function computeFetchResponseText(response, configuration, callback) {
            if (!window.TextDecoder) response.clone().text().then((0, _datadog_browser_core__WEBPACK_IMPORTED_MODULE_5__.zk)((function(text) {
                return callback(truncateResponseText(text, configuration));
            })), (0, _datadog_browser_core__WEBPACK_IMPORTED_MODULE_5__.zk)((function(error) {
                return callback("Unable to retrieve response: " + error);
            }))); else if (!response.body) callback(); else truncateResponseStream(response.clone().body, configuration.requestErrorResponseLengthLimit, (function(error, responseText) {
                if (error) callback("Unable to retrieve response: " + error); else callback(responseText);
            }));
        }
        function isRejected(request) {
            return 0 === request.status && "opaque" !== request.responseType;
        }
        function isServerError(request) {
            return request.status >= 500;
        }
        function truncateResponseText(responseText, configuration) {
            if (responseText.length > configuration.requestErrorResponseLengthLimit) return responseText.substring(0, configuration.requestErrorResponseLengthLimit) + "...";
            return responseText;
        }
        function format(type) {
            if (_datadog_browser_core__WEBPACK_IMPORTED_MODULE_1__.xd.XHR === type) return "XHR";
            return "Fetch";
        }
        function truncateResponseStream(stream, limit, callback) {
            readLimitedAmountOfBytes(stream, limit, (function(error, bytes, limitExceeded) {
                if (error) callback(error); else {
                    var responseText = (new TextDecoder).decode(bytes);
                    if (limitExceeded) responseText += "...";
                    callback(void 0, responseText);
                }
            }));
        }
        function readLimitedAmountOfBytes(stream, limit, callback) {
            var reader = stream.getReader();
            var chunks = [];
            var readBytesCount = 0;
            readMore();
            function readMore() {
                reader.read().then((0, _datadog_browser_core__WEBPACK_IMPORTED_MODULE_5__.zk)((function(result) {
                    if (result.done) {
                        onDone();
                        return;
                    }
                    chunks.push(result.value);
                    readBytesCount += result.value.length;
                    if (readBytesCount > limit) onDone(); else readMore();
                })), (0, _datadog_browser_core__WEBPACK_IMPORTED_MODULE_5__.zk)((function(error) {
                    return callback(error);
                })));
            }
            function onDone() {
                reader.cancel().catch(_datadog_browser_core__WEBPACK_IMPORTED_MODULE_1__.ZT);
                var completeBuffer;
                if (1 === chunks.length) completeBuffer = chunks[0]; else {
                    completeBuffer = new Uint8Array(readBytesCount);
                    var offset_1 = 0;
                    chunks.forEach((function(chunk) {
                        completeBuffer.set(chunk, offset_1);
                        offset_1 += chunk.length;
                    }));
                }
                callback(void 0, completeBuffer.slice(0, limit), completeBuffer.length > limit);
            }
        }
    },
    5981: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
            fy: () => datadogLogs
        });
        var init = __webpack_require__(3650);
        var utils = __webpack_require__(2492);
        var tslib_es6 = __webpack_require__(9312);
        var contextManager = __webpack_require__(8282);
        var boundedBuffer = __webpack_require__(8777);
        var internalMonitoring_internalMonitoring = __webpack_require__(1714);
        var eventBridge = __webpack_require__(7681);
        var display = __webpack_require__(6155);
        var configuration = __webpack_require__(4175);
        var buildEnv = {
            buildMode: "release",
            sdkVersion: "4.2.0"
        };
        var DEFAULT_REQUEST_ERROR_RESPONSE_LENGTH_LIMIT = 32 * utils.Tn;
        function validateAndBuildLogsConfiguration(initConfiguration) {
            var baseConfiguration = (0, configuration.fP)(initConfiguration, buildEnv);
            if (!baseConfiguration) return;
            return (0, tslib_es6.pi)((0, tslib_es6.pi)({}, baseConfiguration), {
                forwardErrorsToLogs: !!initConfiguration.forwardErrorsToLogs,
                requestErrorResponseLengthLimit: DEFAULT_REQUEST_ERROR_RESPONSE_LENGTH_LIMIT
            });
        }
        var error = __webpack_require__(1495);
        var _a;
        var StatusType = {
            debug: "debug",
            error: "error",
            info: "info",
            warn: "warn"
        };
        var STATUS_PRIORITIES = (_a = {}, _a[StatusType.debug] = 0, _a[StatusType.info] = 1, 
        _a[StatusType.warn] = 2, _a[StatusType.error] = 3, _a);
        Object.keys(StatusType);
        var HandlerType = {
            console: "console",
            http: "http",
            silent: "silent"
        };
        var Logger = function() {
            function Logger(sendLog, handlerType, level, loggerContext) {
                if (void 0 === handlerType) handlerType = HandlerType.http;
                if (void 0 === level) level = StatusType.debug;
                if (void 0 === loggerContext) loggerContext = {};
                this.sendLog = sendLog;
                this.handlerType = handlerType;
                this.level = level;
                this.contextManager = (0, contextManager.W)();
                this.contextManager.set(loggerContext);
            }
            Logger.prototype.log = function(message, messageContext, status) {
                if (void 0 === status) status = StatusType.info;
                if (STATUS_PRIORITIES[status] >= STATUS_PRIORITIES[this.level]) {
                    var handlers = Array.isArray(this.handlerType) ? this.handlerType : [ this.handlerType ];
                    if ((0, utils.q9)(handlers, HandlerType.http)) this.sendLog((0, tslib_es6.pi)({
                        message,
                        status
                    }, (0, utils.$e)(this.contextManager.get(), messageContext)));
                    if ((0, utils.q9)(handlers, HandlerType.console)) display.j.log(status + ": " + message, (0, 
                    utils.$e)(this.contextManager.get(), messageContext));
                }
            };
            Logger.prototype.debug = function(message, messageContext) {
                this.log(message, messageContext, StatusType.debug);
            };
            Logger.prototype.info = function(message, messageContext) {
                this.log(message, messageContext, StatusType.info);
            };
            Logger.prototype.warn = function(message, messageContext) {
                this.log(message, messageContext, StatusType.warn);
            };
            Logger.prototype.error = function(message, messageContext) {
                var errorOrigin = {
                    error: {
                        origin: error.zH.LOGGER
                    }
                };
                this.log(message, (0, utils.$e)(errorOrigin, messageContext), StatusType.error);
            };
            Logger.prototype.setContext = function(context) {
                this.contextManager.set(context);
            };
            Logger.prototype.addContext = function(key, value) {
                this.contextManager.add(key, value);
            };
            Logger.prototype.removeContext = function(key) {
                this.contextManager.remove(key);
            };
            Logger.prototype.setHandler = function(handler) {
                this.handlerType = handler;
            };
            Logger.prototype.setLevel = function(level) {
                this.level = level;
            };
            (0, tslib_es6.gn)([ internalMonitoring_internalMonitoring.Th ], Logger.prototype, "log", null);
            return Logger;
        }();
        function makeLogsPublicApi(startLogsImpl) {
            var isAlreadyInitialized = false;
            var globalContextManager = (0, contextManager.W)();
            var customLoggers = {};
            var beforeInitSendLog = new boundedBuffer.S;
            var sendLogStrategy = function(message, currentContext) {
                beforeInitSendLog.add((function() {
                    return sendLogStrategy(message, currentContext);
                }));
            };
            var getInitConfigurationStrategy = function() {
                return;
            };
            var logger = new Logger(sendLog);
            return (0, init.r5)({
                logger,
                init: (0, internalMonitoring_internalMonitoring.zk)((function(initConfiguration) {
                    if ((0, eventBridge.x)()) initConfiguration = overrideInitConfigurationForBridge(initConfiguration);
                    if (!canInitLogs(initConfiguration)) return;
                    var configuration = validateAndBuildLogsConfiguration(initConfiguration);
                    if (!configuration) return;
                    sendLogStrategy = startLogsImpl(configuration, logger);
                    getInitConfigurationStrategy = function() {
                        return (0, utils.I8)(initConfiguration);
                    };
                    beforeInitSendLog.drain();
                    isAlreadyInitialized = true;
                })),
                getLoggerGlobalContext: (0, internalMonitoring_internalMonitoring.zk)(globalContextManager.get),
                setLoggerGlobalContext: (0, internalMonitoring_internalMonitoring.zk)(globalContextManager.set),
                addLoggerGlobalContext: (0, internalMonitoring_internalMonitoring.zk)(globalContextManager.add),
                removeLoggerGlobalContext: (0, internalMonitoring_internalMonitoring.zk)(globalContextManager.remove),
                createLogger: (0, internalMonitoring_internalMonitoring.zk)((function(name, conf) {
                    if (void 0 === conf) conf = {};
                    customLoggers[name] = new Logger(sendLog, conf.handler, conf.level, (0, tslib_es6.pi)((0, 
                    tslib_es6.pi)({}, conf.context), {
                        logger: {
                            name
                        }
                    }));
                    return customLoggers[name];
                })),
                getLogger: (0, internalMonitoring_internalMonitoring.zk)((function(name) {
                    return customLoggers[name];
                })),
                getInitConfiguration: (0, internalMonitoring_internalMonitoring.zk)((function() {
                    return getInitConfigurationStrategy();
                }))
            });
            function overrideInitConfigurationForBridge(initConfiguration) {
                return (0, tslib_es6.pi)((0, tslib_es6.pi)({}, initConfiguration), {
                    clientToken: "empty"
                });
            }
            function canInitLogs(initConfiguration) {
                if (isAlreadyInitialized) {
                    if (!initConfiguration.silentMultipleInit) display.j.error("DD_LOGS is already initialized.");
                    return false;
                }
                return true;
            }
            function sendLog(message) {
                sendLogStrategy(message, (0, utils.$e)({
                    date: Date.now(),
                    view: {
                        referrer: document.referrer,
                        url: window.location.href
                    }
                }, globalContextManager.get()));
            }
        }
        var observable = __webpack_require__(2521);
        var trackConsoleError = __webpack_require__(7786);
        var trackRuntimeError = __webpack_require__(3193);
        var cookie = __webpack_require__(4035);
        var createEventRateLimiter = __webpack_require__(1161);
        var timeUtils = __webpack_require__(7126);
        var trackNetworkError = __webpack_require__(2641);
        var session_sessionManager = __webpack_require__(4426);
        var LOGS_SESSION_KEY = "logs";
        var LoggerTrackingType;
        (function(LoggerTrackingType) {
            LoggerTrackingType["NOT_TRACKED"] = "0";
            LoggerTrackingType["TRACKED"] = "1";
        })(LoggerTrackingType || (LoggerTrackingType = {}));
        function startLogsSessionManager(configuration) {
            var sessionManager = (0, session_sessionManager.HX)(configuration.cookieOptions, LOGS_SESSION_KEY, (function(rawTrackingType) {
                return computeSessionState(configuration, rawTrackingType);
            }));
            return {
                findTrackedSession: function(startTime) {
                    var session = sessionManager.findActiveSession(startTime);
                    return session && session.trackingType === LoggerTrackingType.TRACKED ? {
                        id: session.id
                    } : void 0;
                }
            };
        }
        function startLogsSessionManagerStub(configuration) {
            var isTracked = computeTrackingType(configuration) === LoggerTrackingType.TRACKED;
            var session = isTracked ? {} : void 0;
            return {
                findTrackedSession: function() {
                    return session;
                }
            };
        }
        function computeTrackingType(configuration) {
            if (!(0, utils.y7)(configuration.sampleRate)) return LoggerTrackingType.NOT_TRACKED;
            return LoggerTrackingType.TRACKED;
        }
        function computeSessionState(configuration, rawSessionType) {
            var trackingType = hasValidLoggerSession(rawSessionType) ? rawSessionType : computeTrackingType(configuration);
            return {
                trackingType,
                isTracked: trackingType === LoggerTrackingType.TRACKED
            };
        }
        function hasValidLoggerSession(trackingType) {
            return trackingType === LoggerTrackingType.NOT_TRACKED || trackingType === LoggerTrackingType.TRACKED;
        }
        var startLoggerBatch = __webpack_require__(5423);
        function startLogs(configuration, errorLogger) {
            var internalMonitoring = (0, internalMonitoring_internalMonitoring.py)(configuration);
            var errorObservable = new observable.y;
            if (configuration.forwardErrorsToLogs) {
                (0, trackConsoleError.U)(errorObservable);
                (0, trackRuntimeError.L)(errorObservable);
                (0, trackNetworkError.DN)(configuration, errorObservable);
            }
            var session = (0, cookie.oX)(configuration.cookieOptions) && !(0, eventBridge.x)() ? startLogsSessionManager(configuration) : startLogsSessionManagerStub(configuration);
            return doStartLogs(configuration, errorObservable, internalMonitoring, session, errorLogger);
        }
        function doStartLogs(configuration, errorObservable, internalMonitoring, sessionManager, errorLogger) {
            internalMonitoring.setExternalContextProvider((function() {
                var _a;
                return (0, utils.$e)({
                    session_id: null === (_a = sessionManager.findTrackedSession()) || void 0 === _a ? void 0 : _a.id
                }, getRUMInternalContext(), {
                    view: {
                        name: null,
                        url: null,
                        referrer: null
                    }
                });
            }));
            var assemble = buildAssemble(sessionManager, configuration, reportError);
            var onLogEventCollected;
            if ((0, eventBridge.x)()) {
                var bridge_1 = (0, eventBridge.A)();
                onLogEventCollected = function(message) {
                    return bridge_1.send("log", message);
                };
            } else {
                var batch_1 = (0, startLoggerBatch.n)(configuration);
                onLogEventCollected = function(message) {
                    return batch_1.add(message);
                };
            }
            function reportError(error) {
                errorLogger.error(error.message, (0, utils.$e)({
                    date: error.startClocks.timeStamp,
                    error: {
                        kind: error.type,
                        origin: error.source,
                        stack: error.stack
                    }
                }, error.resource ? {
                    http: {
                        method: error.resource.method,
                        status_code: error.resource.statusCode,
                        url: error.resource.url
                    }
                } : void 0));
            }
            errorObservable.subscribe(reportError);
            return function(message, currentContext) {
                var contextualizedMessage = assemble(message, currentContext);
                if (contextualizedMessage) onLogEventCollected(contextualizedMessage);
            };
        }
        function buildAssemble(sessionManager, configuration, reportError) {
            var _a;
            var logRateLimiters = (_a = {}, _a[StatusType.error] = (0, createEventRateLimiter.K)(StatusType.error, configuration.eventRateLimiterThreshold, reportError), 
            _a[StatusType.warn] = (0, createEventRateLimiter.K)(StatusType.warn, configuration.eventRateLimiterThreshold, reportError), 
            _a[StatusType.info] = (0, createEventRateLimiter.K)(StatusType.info, configuration.eventRateLimiterThreshold, reportError), 
            _a[StatusType.debug] = (0, createEventRateLimiter.K)(StatusType.debug, configuration.eventRateLimiterThreshold, reportError), 
            _a["custom"] = (0, createEventRateLimiter.K)("custom", configuration.eventRateLimiterThreshold, reportError), 
            _a);
            return function(message, currentContext) {
                var _a, _b;
                var startTime = message.date ? (0, timeUtils.ni)(message.date) : void 0;
                var session = sessionManager.findTrackedSession(startTime);
                if (!session) return;
                var contextualizedMessage = (0, utils.$e)({
                    service: configuration.service,
                    session_id: session.id
                }, currentContext, getRUMInternalContext(startTime), message);
                if (false === (null === (_a = configuration.beforeSend) || void 0 === _a ? void 0 : _a.call(configuration, contextualizedMessage)) || (null !== (_b = logRateLimiters[contextualizedMessage.status]) && void 0 !== _b ? _b : logRateLimiters["custom"]).isLimitReached()) return;
                return contextualizedMessage;
            };
        }
        function getRUMInternalContext(startTime) {
            var rum = window.DD_RUM;
            return rum && rum.getInternalContext ? rum.getInternalContext(startTime) : void 0;
        }
        var datadogLogs = makeLogsPublicApi(startLogs);
        (0, init.y)((0, utils.Rf)(), "DD_LOGS", datadogLogs);
    },
    5423: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
            n: () => startLoggerBatch
        });
        if (998 != __webpack_require__.j) var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8692);
        if (998 != __webpack_require__.j) var _datadog_browser_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5554);
        function startLoggerBatch(configuration) {
            var primaryBatch = createLoggerBatch(configuration.logsEndpointBuilder);
            var replicaBatch;
            if (void 0 !== configuration.replica) replicaBatch = createLoggerBatch(configuration.replica.logsEndpointBuilder);
            function createLoggerBatch(endpointBuilder) {
                return new _datadog_browser_core__WEBPACK_IMPORTED_MODULE_0__.E(new _datadog_browser_core__WEBPACK_IMPORTED_MODULE_1__.a(endpointBuilder, configuration.batchBytesLimit), configuration.maxBatchSize, configuration.batchBytesLimit, configuration.maxMessageSize, configuration.flushTimeout);
            }
            return {
                add: function(message) {
                    primaryBatch.add(message);
                    if (replicaBatch) replicaBatch.add(message);
                }
            };
        }
    },
    9906: function(__unused_webpack_module, exports, __webpack_require__) {
        "use strict";
        var __createBinding = this && this.__createBinding || (Object.create ? function(o, m, k, k2) {
            if (void 0 === k2) k2 = k;
            var desc = Object.getOwnPropertyDescriptor(m, k);
            if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
                enumerable: true,
                get: function() {
                    return m[k];
                }
            };
            Object.defineProperty(o, k2, desc);
        } : function(o, m, k, k2) {
            if (void 0 === k2) k2 = k;
            o[k2] = m[k];
        });
        var __exportStar = this && this.__exportStar || function(m, exports) {
            for (var p in m) if ("default" !== p && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
        };
        var __importDefault = this && this.__importDefault || function(mod) {
            return mod && mod.__esModule ? mod : {
                default: mod
            };
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.validate = void 0;
        const rulesets_1 = __importDefault(__webpack_require__(4890));
        __exportStar(__webpack_require__(2514), exports);
        var utils_1 = __webpack_require__(1911);
        Object.defineProperty(exports, "validate", {
            enumerable: true,
            get: function() {
                return utils_1.validate;
            }
        });
        exports["default"] = rulesets_1.default;
    },
    4890: (__unused_webpack_module, exports) => {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.rulesets = void 0;
        exports.rulesets = {
            all: {
                value: "all",
                name: "All",
                tags: []
            },
            wcag22aaa: {
                value: "wcag22aaa",
                name: "WCAG 2.2 AAA",
                tags: [ "wcag22aaa", "wcag22aa", "wcag22a", "wcag21aaa", "wcag21aa", "wcag21a", "wcag2aaa", "wcag2aa", "wcag2a" ]
            },
            wcag22aa: {
                value: "wcag22aa",
                name: "WCAG 2.2 AA",
                tags: [ "wcag22aa", "wcag22a", "wcag21aa", "wcag21a", "wcag2aa", "wcag2a" ]
            },
            wcag22a: {
                value: "wcag22a",
                name: "WCAG 2.2 A",
                tags: [ "wcag22a", "wcag21a", "wcag2a" ]
            },
            wcag21aaa: {
                value: "wcag21aaa",
                name: "WCAG 2.1 AAA",
                tags: [ "wcag21aaa", "wcag21aa", "wcag21a", "wcag2aaa", "wcag2aa", "wcag2a" ]
            },
            wcag21aa: {
                value: "wcag21aa",
                name: "WCAG 2.1 AA",
                tags: [ "wcag21aa", "wcag21a", "wcag2aa", "wcag2a" ]
            },
            wcag21a: {
                value: "wcag21a",
                name: "WCAG 2.1 A",
                tags: [ "wcag21a", "wcag2a" ]
            },
            wcag2aaa: {
                value: "wcag2aaa",
                name: "WCAG 2.0 AAA",
                tags: [ "wcag2aaa", "wcag2aa", "wcag2a" ]
            },
            wcag2aa: {
                value: "wcag2aa",
                name: "WCAG 2.0 AA",
                tags: [ "wcag2aa", "wcag2a" ]
            },
            wcag2a: {
                value: "wcag2a",
                name: "WCAG 2.0 A",
                tags: [ "wcag2a" ]
            },
            TTv5: {
                value: "TTv5",
                name: "Trusted Tester v5",
                tags: [ "TTv5" ]
            },
            "EN-301-549": {
                value: "EN-301-549",
                name: "EN 301 549",
                tags: [ "EN-301-549" ]
            }
        };
        exports["default"] = exports.rulesets;
    },
    2514: (__unused_webpack_module, exports) => {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
    },
    1911: function(__unused_webpack_module, exports, __webpack_require__) {
        "use strict";
        var __importDefault = this && this.__importDefault || function(mod) {
            return mod && mod.__esModule ? mod : {
                default: mod
            };
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.validate = void 0;
        const rulesets_1 = __importDefault(__webpack_require__(4890));
        const validate = value => -1 !== Object.keys(rulesets_1.default).indexOf(value);
        exports.validate = validate;
    },
    3777: (__unused_webpack_module, exports) => {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.taxIdTypes = exports.countryCodeToName = exports.stringToNumber = exports.getFormattedAmount = exports.calculateDiscountPercentage = exports.formatTaxDescription = exports.formatCurrency = exports.roundCurrency = exports.formatPrices = void 0;
        const numberFormatter = new Intl.NumberFormat([], {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        function formatPrices(price) {
            if (null === price || void 0 === price) return;
            return numberFormatter.format(price);
        }
        exports.formatPrices = formatPrices;
        function roundCurrency(amount) {
            if (amount < .5) return .5;
            return Math.round(100 * amount) / 100;
        }
        exports.roundCurrency = roundCurrency;
        function formatCurrency(amount) {
            let value = amount;
            if ("string" === typeof value) value = stringToNumber(value);
            if (Number.isNaN(value)) throw new Error(`Invalid currency value: ${value}. Must be a number or a string - received ${typeof value}.`);
            return stringToNumber(numberFormatter.format(value));
        }
        exports.formatCurrency = formatCurrency;
        function formatTaxDescription(taxRate) {
            if ("object" !== typeof taxRate) throw new Error("Invalid tax rate: must be an expanded object.");
            const {display_name: displayName, percentage, jurisdiction} = taxRate;
            return `${displayName} - ${jurisdiction} (${percentage}%)`;
        }
        exports.formatTaxDescription = formatTaxDescription;
        function calculateDiscountPercentage(amount, discount) {
            return roundCurrency(amount - amount * discount / 100);
        }
        exports.calculateDiscountPercentage = calculateDiscountPercentage;
        function getFormattedAmount(amount) {
            const paddedAmount = amount.toString().padStart(2, "0");
            const dollarAmount = `${paddedAmount.slice(0, paddedAmount.length - 2)}.${paddedAmount.slice(paddedAmount.length - 2)}`;
            const formattedDollarAmount = formatPrices(parseFloat(dollarAmount))?.replace("-", "") || "0.00";
            const sign = amount < 0 ? "-$" : "$";
            return `${sign}${formattedDollarAmount}`;
        }
        exports.getFormattedAmount = getFormattedAmount;
        function stringToNumber(value) {
            if ("string" !== typeof value) throw new Error(`Invalid string: ${value}`);
            const result = Number(value.replace(/,/g, ""));
            if (Number.isNaN(result)) throw new Error(`Invalid number: ${value}`);
            return result;
        }
        exports.stringToNumber = stringToNumber;
        function countryCodeToName(countryCode) {
            const country = new Intl.DisplayNames([], {
                type: "region"
            });
            return country.of(countryCode);
        }
        exports.countryCodeToName = countryCodeToName;
        exports.taxIdTypes = [ {
            country: "Australia",
            countryCode: "AU",
            type: "au_abn",
            description: "Australian Business Number (AU ABN)",
            placeholder: "12345678912"
        }, {
            country: "Australia",
            countryCode: "AU",
            type: "au_arn",
            description: "Australian Taxation Office Reference Number",
            placeholder: "123456789123"
        }, {
            country: "Austria",
            countryCode: "AT",
            type: "eu_vat",
            description: "European VAT number",
            placeholder: "ATU12345678"
        }, {
            country: "Belgium",
            countryCode: "BE",
            type: "eu_vat",
            description: "European VAT number",
            placeholder: "BE0123456789"
        }, {
            country: "Brazil",
            countryCode: "BR",
            type: "br_cnpj",
            description: "Brazilian CNPJ number",
            placeholder: "01.234.456/5432-10"
        }, {
            country: "Brazil",
            countryCode: "BR",
            type: "br_cpf",
            description: "Brazilian CPF number",
            placeholder: "123.456.789-87"
        }, {
            country: "Bulgaria",
            countryCode: "BG",
            type: "bg_uic",
            description: "Bulgaria Unified Identification Code",
            placeholder: "123456789"
        }, {
            country: "Bulgaria",
            countryCode: "BG",
            type: "eu_vat",
            description: "European VAT number",
            placeholder: "BG0123456789"
        }, {
            country: "Canada",
            countryCode: "CA",
            type: "ca_bn",
            description: "Canadian BN",
            placeholder: "123456789"
        }, {
            country: "Canada",
            countryCode: "CA",
            type: "ca_gst_hst",
            description: "Canadian GST/HST number",
            placeholder: "123456789RT0002"
        }, {
            country: "Canada",
            countryCode: "CA",
            type: "ca_pst_bc",
            description: "Canadian PST number (British Columbia)",
            placeholder: "PST-1234-5678"
        }, {
            country: "Canada",
            countryCode: "CA",
            type: "ca_pst_mb",
            description: "Canadian PST number (Manitoba)",
            placeholder: "123456-7"
        }, {
            country: "Canada",
            countryCode: "CA",
            type: "ca_pst_sk",
            description: "Canadian PST number (Saskatchewan)",
            placeholder: "1234567"
        }, {
            country: "Canada",
            countryCode: "CA",
            type: "ca_qst",
            description: "Canadian QST number (Québec)",
            placeholder: "1234567890TQ1234"
        }, {
            country: "Chile",
            countryCode: "CL",
            type: "cl_tin",
            description: "Chilean TIN",
            placeholder: "12.345.678-K"
        }, {
            country: "Croatia",
            countryCode: "HR",
            type: "eu_vat",
            description: "European VAT number",
            placeholder: "HR12345678912"
        }, {
            country: "Cyprus",
            countryCode: "CY",
            type: "eu_vat",
            description: "European VAT number",
            placeholder: "CY12345678Z"
        }, {
            country: "Czech Republic",
            countryCode: "CZ",
            type: "eu_vat",
            description: "European VAT number",
            placeholder: "CZ1234567890"
        }, {
            country: "Denmark",
            countryCode: "DK",
            type: "eu_vat",
            description: "European VAT number",
            placeholder: "DK12345678"
        }, {
            country: "Egypt",
            countryCode: "EG",
            type: "eg_tin",
            description: "Egyptian Tax Identification Number",
            placeholder: "123456789"
        }, {
            country: "Estonia",
            countryCode: "EE",
            type: "eu_vat",
            description: "European VAT number",
            placeholder: "EE123456789"
        }, {
            country: "EU",
            countryCode: "EU",
            type: "eu_oss_vat",
            description: "European One Stop Shop VAT number for non-Union scheme",
            placeholder: "EU123456789"
        }, {
            country: "Finland",
            countryCode: "FI",
            type: "eu_vat",
            description: "European VAT number",
            placeholder: "FI12345678"
        }, {
            country: "France",
            countryCode: "FR",
            type: "eu_vat",
            description: "European VAT number",
            placeholder: "FRAB123456789"
        }, {
            country: "Georgia",
            countryCode: "GE",
            type: "ge_vat",
            description: "Georgian VAT",
            placeholder: "123456789"
        }, {
            country: "Germany",
            countryCode: "DE",
            type: "eu_vat",
            description: "European VAT number",
            placeholder: "DE123456789"
        }, {
            country: "Greece",
            countryCode: "GR",
            type: "eu_vat",
            description: "European VAT number",
            placeholder: "EL123456789"
        }, {
            country: "Hong Kong",
            countryCode: "HK",
            type: "hk_br",
            description: "Hong Kong BR number",
            placeholder: "12345678"
        }, {
            country: "Hungary",
            countryCode: "HU",
            type: "eu_vat",
            description: "European VAT number",
            placeholder: "HU12345678912"
        }, {
            country: "Hungary",
            countryCode: "HU",
            type: "hu_tin",
            description: "Hungary tax number (adószám)",
            placeholder: "12345678-1-23"
        }, {
            country: "Iceland",
            countryCode: "IS",
            type: "is_vat",
            description: "Icelandic VAT",
            placeholder: "123456"
        }, {
            country: "India",
            countryCode: "IN",
            type: "in_gst",
            description: "Indian GST number",
            placeholder: "12ABCDE3456FGZH"
        }, {
            country: "Indonesia",
            countryCode: "ID",
            type: "id_npwp",
            description: "Indonesian NPWP number",
            placeholder: "12.345.678.9-012.345"
        }, {
            country: "Ireland",
            countryCode: "IE",
            type: "eu_vat",
            description: "European VAT number",
            placeholder: "IE1234567AB"
        }, {
            country: "Israel",
            countryCode: "IL",
            type: "il_vat",
            description: "Israel VAT",
            placeholder: "12345"
        }, {
            country: "Italy",
            countryCode: "IT",
            type: "eu_vat",
            description: "European VAT number",
            placeholder: "IT12345678912"
        }, {
            country: "Japan",
            countryCode: "JP",
            type: "jp_cn",
            description: "Japanese Corporate Number",
            placeholder: "1234567891234"
        }, {
            country: "Japan",
            countryCode: "JP",
            type: "jp_rn",
            description: "Japanese Registered Foreign Businesses Number",
            placeholder: "12345"
        }, {
            country: "Japan",
            countryCode: "JP",
            type: "jp_trn",
            description: "Japanese Tax Registration Number",
            placeholder: "T1234567891234"
        }, {
            country: "Kenya",
            countryCode: "KE",
            type: "ke_pin",
            description: "Kenya PIN",
            placeholder: "P000111111A"
        }, {
            country: "Latvia",
            countryCode: "LV",
            type: "eu_vat",
            description: "European VAT number",
            placeholder: "LV12345678912"
        }, {
            country: "Liechtenstein",
            countryCode: "LI",
            type: "li_uid",
            description: "Liechtensteinian UID number",
            placeholder: "CHE123456789"
        }, {
            country: "Lithuania",
            countryCode: "LT",
            type: "eu_vat",
            description: "European VAT number",
            placeholder: "LT123456789123"
        }, {
            country: "Luxembourg",
            countryCode: "LU",
            type: "eu_vat",
            description: "European VAT number",
            placeholder: "LU12345678"
        }, {
            country: "Malaysia",
            countryCode: "MY",
            type: "my_frp",
            description: "Malaysian FRP number",
            placeholder: "12345678"
        }, {
            country: "Malaysia",
            countryCode: "MY",
            type: "my_itn",
            description: "Malaysian ITN",
            placeholder: "C 1234567890"
        }, {
            country: "Malaysia",
            countryCode: "MY",
            type: "my_sst",
            description: "Malaysian SST number",
            placeholder: "A12-3456-78912345"
        }, {
            country: "Malta",
            countryCode: "MT",
            type: "eu_vat",
            description: "European VAT number",
            placeholder: "MT12345678"
        }, {
            country: "Mexico",
            countryCode: "MX",
            type: "mx_rfc",
            description: "Mexican RFC number",
            placeholder: "ABC010203AB9"
        }, {
            country: "Netherlands",
            countryCode: "NL",
            type: "eu_vat",
            description: "European VAT number",
            placeholder: "NL123456789B12"
        }, {
            country: "New Zealand",
            countryCode: "NZ",
            type: "nz_gst",
            description: "New Zealand GST number",
            placeholder: "123456789"
        }, {
            country: "Norway",
            countryCode: "NO",
            type: "no_vat",
            description: "Norwegian VAT number",
            placeholder: "123456789MVA"
        }, {
            country: "Philippines",
            countryCode: "PH",
            type: "ph_tin",
            description: "Philippines TIN",
            placeholder: "123456789012"
        }, {
            country: "Poland",
            countryCode: "PL",
            type: "eu_vat",
            description: "European VAT number",
            placeholder: "PL1234567890"
        }, {
            country: "Portugal",
            countryCode: "PT",
            type: "eu_vat",
            description: "European VAT number",
            placeholder: "PT123456789"
        }, {
            country: "Romania",
            countryCode: "RO",
            type: "eu_vat",
            description: "European VAT number",
            placeholder: "RO1234567891"
        }, {
            country: "Russia",
            countryCode: "RU",
            type: "ru_inn",
            description: "Russian INN",
            placeholder: "1234567891"
        }, {
            country: "Russia",
            countryCode: "RU",
            type: "ru_kpp",
            description: "Russian KPP",
            placeholder: "123456789"
        }, {
            country: "Saudi Arabia",
            countryCode: "SA",
            type: "sa_vat",
            description: "Saudi Arabia VAT",
            placeholder: "`123456789012345"
        }, {
            country: "Singapore",
            countryCode: "SG",
            type: "sg_gst",
            description: "Singaporean GST",
            placeholder: "M12345678X"
        }, {
            country: "Singapore",
            countryCode: "SG",
            type: "sg_uen",
            description: "Singaporean UEN",
            placeholder: "123456789F"
        }, {
            country: "Slovakia",
            countryCode: "SK",
            type: "eu_vat",
            description: "European VAT number",
            placeholder: "SK1234567891"
        }, {
            country: "Slovenia",
            countryCode: "SI",
            type: "eu_vat",
            description: "European VAT number",
            placeholder: "SI12345678"
        }, {
            country: "Slovenia",
            countryCode: "SI",
            type: "si_tin",
            description: "Slovenia tax number",
            placeholder: "12345678"
        }, {
            country: "South Africa",
            countryCode: "ZA",
            type: "za_vat",
            description: "South African VAT number",
            placeholder: "4123456789"
        }, {
            country: "South Korea",
            countryCode: "KR",
            type: "kr_brn",
            description: "Korean BRN",
            placeholder: "123-45-67890"
        }, {
            country: "Spain",
            countryCode: "ES",
            type: "es_cif",
            description: "Spanish NIF",
            placeholder: "A12345678"
        }, {
            country: "Spain",
            countryCode: "ES",
            type: "eu_vat",
            description: "European VAT number",
            placeholder: "ESA1234567Z"
        }, {
            country: "Sweden",
            countryCode: "SE",
            type: "eu_vat",
            description: "European VAT number",
            placeholder: "SE123456789123"
        }, {
            country: "Switzerland",
            countryCode: "CH",
            type: "ch_vat",
            description: "Switzerland VAT number",
            placeholder: "CHE-123.456.789 MWST"
        }, {
            country: "Taiwan",
            countryCode: "TW",
            type: "tw_vat",
            description: "Taiwanese VAT",
            placeholder: "12345678"
        }, {
            country: "Thailand",
            countryCode: "TH",
            type: "th_vat",
            description: "Thai VAT",
            placeholder: "1234567891234"
        }, {
            country: "Turkey",
            countryCode: "TR",
            type: "tr_tin",
            description: "Turkish Tax Identification Number",
            placeholder: "123456789"
        }, {
            country: "Ukraine",
            countryCode: "UA",
            type: "ua_vat",
            description: "Ukrainian VAT",
            placeholder: "123456789"
        }, {
            country: "United Arab Emirates",
            countryCode: "AE",
            type: "ae_trn",
            description: "United Arab Emirates TRN",
            placeholder: "123456789012345"
        }, {
            country: "United Kingdom",
            countryCode: "GB",
            type: "eu_vat",
            description: "Northern Ireland VAT number",
            placeholder: "XI123456789"
        }, {
            country: "United Kingdom",
            countryCode: "GB",
            type: "gb_vat",
            description: "United Kingdom VAT number",
            placeholder: "GB123456789"
        }, {
            country: "United States",
            countryCode: "US",
            type: "us_ein",
            description: "United States EIN",
            placeholder: "12-3456789"
        } ];
    },
    7968: function(__unused_webpack_module, exports, __webpack_require__) {
        "use strict";
        var __createBinding = this && this.__createBinding || (Object.create ? function(o, m, k, k2) {
            if (void 0 === k2) k2 = k;
            var desc = Object.getOwnPropertyDescriptor(m, k);
            if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
                enumerable: true,
                get: function() {
                    return m[k];
                }
            };
            Object.defineProperty(o, k2, desc);
        } : function(o, m, k, k2) {
            if (void 0 === k2) k2 = k;
            o[k2] = m[k];
        });
        var __exportStar = this && this.__exportStar || function(m, exports) {
            for (var p in m) if ("default" !== p && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.listEnterpriseProductAccess = exports.listUserProductAccess = exports.getControllingProductSubscription = exports.isPriceTaxable = exports.getPriceFromSubscription = exports.getTrialEligibility = exports.canUserStartTrial = exports.getProductSubscription = exports.getAllUserSubscriptions = exports.listProductAccess = exports.ProductSlugs = void 0;
        __exportStar(__webpack_require__(3777), exports);
        var ProductSlugs;
        (function(ProductSlugs) {
            ProductSlugs["axeDevToolsHTML"] = "axe-devtools-html";
            ProductSlugs["axeDevToolsMobile"] = "axe-devtools-mobile";
            ProductSlugs["axeDevToolsExtension"] = "axe-devtools-pro";
            ProductSlugs["axeDevToolsWatcher"] = "axe-devtools-watcher";
            ProductSlugs["axeLinter"] = "axe-devtools-linter";
            ProductSlugs["axeReports"] = "axe-reports";
            ProductSlugs["axeMonitor"] = "axe-monitor";
            ProductSlugs["axeAuditor"] = "axe-auditor";
            ProductSlugs["dequeUniversity"] = "deque-university";
            ProductSlugs["axeSpider"] = "axe-spider";
            ProductSlugs["jiraIntegration"] = "jira-integration";
        })(ProductSlugs || (exports.ProductSlugs = ProductSlugs = {}));
        const DEFAULT_PURCHASE_STATE = "none";
        const DEFAULT_PRODUCT_ACCESS = {
            [ProductSlugs.axeDevToolsHTML]: DEFAULT_PURCHASE_STATE,
            [ProductSlugs.axeDevToolsMobile]: DEFAULT_PURCHASE_STATE,
            [ProductSlugs.axeDevToolsExtension]: DEFAULT_PURCHASE_STATE,
            [ProductSlugs.axeDevToolsWatcher]: DEFAULT_PURCHASE_STATE,
            [ProductSlugs.axeLinter]: DEFAULT_PURCHASE_STATE,
            [ProductSlugs.axeReports]: DEFAULT_PURCHASE_STATE,
            [ProductSlugs.axeMonitor]: DEFAULT_PURCHASE_STATE,
            [ProductSlugs.axeAuditor]: DEFAULT_PURCHASE_STATE,
            [ProductSlugs.dequeUniversity]: DEFAULT_PURCHASE_STATE,
            [ProductSlugs.axeSpider]: DEFAULT_PURCHASE_STATE,
            [ProductSlugs.jiraIntegration]: DEFAULT_PURCHASE_STATE
        };
        const purchaseStateLevels = {
            none: 1,
            free: 2,
            free_payment_failed: 3,
            trial_ended: 4,
            trial_payment_failed: 5,
            paid_payment_failed: 6,
            trialing: 7,
            paid: 8
        };
        const listProductAccess = subscriptions => {
            if (!Array.isArray(subscriptions)) throw new TypeError("`subscriptions` must be an array");
            const access = {
                ...DEFAULT_PRODUCT_ACCESS
            };
            for (const subscription of subscriptions) {
                const state = subscription.purchase_state;
                const slug = subscription.product_slug;
                const existingState = access[slug];
                const existingLevel = purchaseStateLevels[existingState];
                const newLevel = purchaseStateLevels[state];
                if (!existingState) {
                    access[slug] = state;
                    continue;
                }
                if (newLevel > existingLevel) access[slug] = state;
            }
            if (access[ProductSlugs.axeDevToolsHTML] !== DEFAULT_PURCHASE_STATE) {
                const html = purchaseStateLevels[access[ProductSlugs.axeDevToolsHTML]];
                const pro = purchaseStateLevels[access[ProductSlugs.axeDevToolsExtension]];
                if (pro < html) access[ProductSlugs.axeDevToolsExtension] = access[ProductSlugs.axeDevToolsHTML];
            }
            return access;
        };
        exports.listProductAccess = listProductAccess;
        const getAllUserSubscriptions = user => [ ...user.subscriptions, ...user.enterprises.flatMap((enterprise => enterprise.subscriptions)) ];
        exports.getAllUserSubscriptions = getAllUserSubscriptions;
        function getProductSubscription(subscriptions, slug) {
            if (slug === ProductSlugs.axeDevToolsExtension) {
                const html = subscriptions.find((s => s.product_slug === ProductSlugs.axeDevToolsHTML));
                const pro = subscriptions.find((s => s.product_slug === ProductSlugs.axeDevToolsExtension));
                if (html && pro) {
                    const htmlLevel = purchaseStateLevels[html.purchase_state];
                    const proLevel = purchaseStateLevels[pro.purchase_state];
                    if (htmlLevel > proLevel) return html;
                    return pro;
                }
                return pro || html || null;
            }
            return subscriptions.find((s => s.product_slug === slug)) || null;
        }
        exports.getProductSubscription = getProductSubscription;
        const canUserStartTrial = ({user, productSlug, enterprise, isEnterpriseAdmin = false}) => {
            if (enterprise) {
                const enterpriseProductAccess = (0, exports.listProductAccess)(enterprise.subscriptions);
                return "none" === enterpriseProductAccess[productSlug] && isEnterpriseAdmin;
            }
            const userProductAccess = (0, exports.listProductAccess)(user.subscriptions);
            return "none" === userProductAccess[productSlug];
        };
        exports.canUserStartTrial = canUserStartTrial;
        const getTrialEligibility = ({user, product, enterprise, isEnterpriseAdmin = false}) => {
            if (enterprise && !isEnterpriseAdmin) return {
                canStartTrial: false,
                isRestart: false
            };
            const productSlug = product.slug;
            let currentProductSubscription;
            if (enterprise) currentProductSubscription = (0, exports.getControllingProductSubscription)(enterprise, productSlug); else currentProductSubscription = (0, 
            exports.getControllingProductSubscription)(user, productSlug);
            if (null === currentProductSubscription) return {
                canStartTrial: true,
                isRestart: false
            };
            const currentPurchaseState = currentProductSubscription.purchase_state;
            if ("paid" !== currentPurchaseState && !currentProductSubscription.trial_expires) return {
                canStartTrial: true,
                isRestart: false
            };
            if ("trialing" !== currentPurchaseState && "paid" !== currentPurchaseState) if (null !== currentProductSubscription.trial_expires && null !== product.reactivate_trial_cutoff) {
                const canRestart = new Date(currentProductSubscription.trial_expires) < new Date(product.reactivate_trial_cutoff);
                return {
                    canStartTrial: canRestart,
                    isRestart: canRestart
                };
            }
            return {
                canStartTrial: false,
                isRestart: false
            };
        };
        exports.getTrialEligibility = getTrialEligibility;
        const getPriceFromSubscription = subscription => subscription.items.data[0].price;
        exports.getPriceFromSubscription = getPriceFromSubscription;
        const isPriceTaxable = price => !!(price.metadata.taxable && "true" === price.metadata.taxable);
        exports.isPriceTaxable = isPriceTaxable;
        const getControllingProductSubscription = (entity, productSlug) => {
            const getSubscription = subscriptions => {
                if (!subscriptions.length) return null;
                const subscription = getBundledSubscription(subscriptions, productSlug) || subscriptions.find((s => s.product_slug === productSlug));
                if (!subscription) return null;
                return subscription;
            };
            if ("keycloak_id" in entity) return entity.enterprises.length ? getSubscription(entity.enterprises.flatMap((e => e.subscriptions))) : getSubscription(entity.subscriptions);
            return getSubscription(entity.subscriptions);
        };
        exports.getControllingProductSubscription = getControllingProductSubscription;
        const getBundledSubscription = (subscriptions, productSlug) => {
            if (productSlug !== ProductSlugs.axeDevToolsExtension) return null;
            const html = subscriptions.find((s => s.product_slug === ProductSlugs.axeDevToolsHTML));
            const pro = subscriptions.find((s => s.product_slug === ProductSlugs.axeDevToolsExtension));
            if (html && pro) {
                const htmlLevel = purchaseStateLevels[html.purchase_state];
                const proLevel = purchaseStateLevels[pro.purchase_state];
                if (htmlLevel > proLevel) return html;
                return pro;
            }
            return pro || html || null;
        };
        const generateProductAccess = entity => {
            const productAccess = structuredClone(DEFAULT_PRODUCT_ACCESS);
            for (const productSlug of Object.values(ProductSlugs)) {
                const subscription = (0, exports.getControllingProductSubscription)(entity, productSlug);
                if (!subscription) continue;
                productAccess[productSlug] = subscription.purchase_state;
            }
            return productAccess;
        };
        const listUserProductAccess = user => generateProductAccess(user);
        exports.listUserProductAccess = listUserProductAccess;
        const listEnterpriseProductAccess = enterprise => generateProductAccess(enterprise);
        exports.listEnterpriseProductAccess = listEnterpriseProductAccess;
    },
    5562: (__unused_webpack_module, exports) => {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var Storage = function() {
            function Storage() {
                this.browser = globalThis.browser;
            }
            Storage.prototype.get = function(key) {
                if (this.contextIsBrowserApp) return new Promise((function(resolve) {
                    var val = localStorage.getItem(key);
                    if (!val) return resolve(null);
                    try {
                        resolve(JSON.parse(val));
                    } catch (_a) {
                        resolve(val);
                    }
                }));
                var area = this.browserStorageArea;
                if (!area) return Promise.reject(new Error(Storage.STORAGE_AREA_ERROR));
                return area.get(key).then((function(result) {
                    var val = result[key];
                    if (!val) return null;
                    try {
                        return JSON.parse(val);
                    } catch (_a) {
                        return val;
                    }
                }));
            };
            Storage.prototype.set = function(key, value) {
                var _a;
                var preparedValue = value;
                if ("string" !== typeof value) try {
                    preparedValue = JSON.stringify(value);
                } catch (_b) {}
                if (this.contextIsBrowserApp) return new Promise((function(resolve) {
                    localStorage.setItem(key, preparedValue);
                    resolve();
                }));
                var area = this.browserStorageArea;
                if (!area) return Promise.reject(new Error(Storage.STORAGE_AREA_ERROR));
                return area.set((_a = {}, _a[key] = preparedValue, _a)).then((function() {}));
            };
            Object.defineProperty(Storage.prototype, "contextIsBrowserApp", {
                get: function() {
                    return "undefined" === typeof this.browser || "undefined" === typeof this.browser.storage;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(Storage.prototype, "browserStorageArea", {
                get: function() {
                    var _a, _b, _c, _d;
                    return (null === (_b = null === (_a = this.browser) || void 0 === _a ? void 0 : _a.storage) || void 0 === _b ? void 0 : _b.sync) || (null === (_d = null === (_c = this.browser) || void 0 === _c ? void 0 : _c.storage) || void 0 === _d ? void 0 : _d.local);
                },
                enumerable: false,
                configurable: true
            });
            Storage.STORAGE_AREA_ERROR = "Failed to determine which storage area is suitable to use.";
            return Storage;
        }();
        exports["default"] = Storage;
    },
    8020: function(__unused_webpack_module, exports, __webpack_require__) {
        "use strict";
        var __assign = this && this.__assign || function() {
            __assign = Object.assign || function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
            function adopt(value) {
                return value instanceof P ? value : new P((function(resolve) {
                    resolve(value);
                }));
            }
            return new (P || (P = Promise))((function(resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator["throw"](value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            }));
        };
        var __generator = this && this.__generator || function(thisArg, body) {
            var f, y, t, g, _ = {
                label: 0,
                sent: function() {
                    if (1 & t[0]) throw t[1];
                    return t[1];
                },
                trys: [],
                ops: []
            };
            return g = {
                next: verb(0),
                throw: verb(1),
                return: verb(2)
            }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
                return this;
            }), g;
            function verb(n) {
                return function(v) {
                    return step([ n, v ]);
                };
            }
            function step(op) {
                if (f) throw new TypeError("Generator is already executing.");
                while (g && (g = 0, op[0] && (_ = 0)), _) try {
                    if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
                    0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                    if (y = 0, t) op = [ 2 & op[0], t.value ];
                    switch (op[0]) {
                      case 0:
                      case 1:
                        t = op;
                        break;

                      case 4:
                        _.label++;
                        return {
                            value: op[1],
                            done: false
                        };

                      case 5:
                        _.label++;
                        y = op[1];
                        op = [ 0 ];
                        continue;

                      case 7:
                        op = _.ops.pop();
                        _.trys.pop();
                        continue;

                      default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
                            _ = 0;
                            continue;
                        }
                        if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
                            _.label = op[1];
                            break;
                        }
                        if (6 === op[0] && _.label < t[1]) {
                            _.label = t[1];
                            t = op;
                            break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];
                            _.ops.push(op);
                            break;
                        }
                        if (t[2]) _.ops.pop();
                        _.trys.pop();
                        continue;
                    }
                    op = body.call(thisArg, _);
                } catch (e) {
                    op = [ 6, e ];
                    y = 0;
                } finally {
                    f = t = 0;
                }
                if (5 & op[0]) throw op[1];
                return {
                    value: op[0] ? op[1] : void 0,
                    done: true
                };
            }
        };
        var __importDefault = this && this.__importDefault || function(mod) {
            return mod && mod.__esModule ? mod : {
                default: mod
            };
        };
        var _a;
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.setDistinctIdCookie = exports.getDistinctIdCookie = void 0;
        var uuid_1 = __webpack_require__(1039);
        var deep_equal_1 = __importDefault(__webpack_require__(2741));
        var Storage_1 = __importDefault(__webpack_require__(5562));
        var request_1 = __importDefault(__webpack_require__(6707));
        var DEFAULT_HOST = "https://axe.deque.com";
        var DEFAULT_ORIGIN = null === (_a = globalThis.location) || void 0 === _a ? void 0 : _a.origin;
        var LOCAL_STORAGE_KEY = "distinct_id";
        var storage = new Storage_1.default;
        var getDistinctIdCookie = function(params) {
            if (void 0 === params) params = {};
            return __awaiter(void 0, void 0, void 0, (function() {
                var isLoggedIn, _a, key, _b, host, _c, origin, localCookie, localDistinctId, localKeyCloakId, remoteCookie, remoteDistinctId, remoteKeyCloakId, cookie;
                return __generator(this, (function(_d) {
                    switch (_d.label) {
                      case 0:
                        isLoggedIn = !!params.token;
                        _a = params.key, key = void 0 === _a ? LOCAL_STORAGE_KEY : _a, _b = params.host, 
                        host = void 0 === _b ? DEFAULT_HOST : _b, _c = params.origin, origin = void 0 === _c ? DEFAULT_ORIGIN : _c;
                        return [ 4, storage.get(key) ];

                      case 1:
                        localCookie = _d.sent() || {};
                        localDistinctId = localCookie.distinct_id;
                        localKeyCloakId = localCookie.keycloak_id;
                        return [ 4, (0, request_1.default)({
                            method: "GET",
                            host,
                            origin,
                            token: params.token
                        }) ];

                      case 2:
                        remoteCookie = _d.sent() || {};
                        remoteDistinctId = remoteCookie.distinct_id;
                        remoteKeyCloakId = remoteCookie.keycloak_id;
                        if (localDistinctId && localDistinctId === remoteDistinctId && localKeyCloakId && localKeyCloakId === remoteKeyCloakId && (0, 
                        deep_equal_1.default)(remoteCookie.data, localCookie.data)) return [ 2, localCookie ];
                        cookie = {
                            distinct_id: ""
                        };
                        if (!remoteDistinctId && !localDistinctId) {
                            cookie.distinct_id = (0, uuid_1.v4)();
                            cookie.keycloak_id = remoteKeyCloakId || localKeyCloakId;
                            if (remoteKeyCloakId === localKeyCloakId || !localKeyCloakId) cookie.data = __assign(__assign({}, localCookie.data), remoteCookie.data); else cookie.data = remoteCookie.data;
                            return [ 2, (0, exports.setDistinctIdCookie)(cookie, params) ];
                        }
                        if (!remoteDistinctId) return [ 3, 15 ];
                        if (!!remoteKeyCloakId) return [ 3, 10 ];
                        if (isLoggedIn) {
                            cookie.distinct_id = remoteDistinctId;
                            if (localDistinctId !== remoteDistinctId) cookie.data = remoteCookie.data; else cookie.data = __assign(__assign({}, localCookie.data), remoteCookie.data);
                            return [ 2, (0, exports.setDistinctIdCookie)(cookie, params) ];
                        }
                        if (!!localDistinctId) return [ 3, 5 ];
                        cookie.distinct_id = remoteDistinctId;
                        cookie.data = __assign(__assign({}, localCookie.data), remoteCookie.data);
                        if (!(0, deep_equal_1.default)(cookie.data, remoteCookie.data)) return [ 3, 4 ];
                        return [ 4, storage.set(key, cookie) ];

                      case 3:
                        _d.sent();
                        return [ 2, cookie ];

                      case 4:
                        return [ 2, (0, exports.setDistinctIdCookie)(cookie, params) ];

                      case 5:
                        if (!(localDistinctId !== remoteDistinctId)) return [ 3, 7 ];
                        return [ 4, storage.set(key, remoteCookie) ];

                      case 6:
                        _d.sent();
                        return [ 2, remoteCookie ];

                      case 7:
                        if (localKeyCloakId) {
                            cookie.keycloak_id = localKeyCloakId;
                            cookie.distinct_id = localDistinctId;
                            cookie.data = __assign(__assign({}, localCookie.data), remoteCookie.data);
                            return [ 2, (0, exports.setDistinctIdCookie)(cookie, params) ];
                        }
                        cookie.distinct_id = remoteDistinctId;
                        cookie.data = __assign(__assign({}, localCookie.data), remoteCookie.data);
                        if (!(0, deep_equal_1.default)(cookie.data, remoteCookie.data)) return [ 3, 9 ];
                        return [ 4, storage.set(key, cookie) ];

                      case 8:
                        _d.sent();
                        return [ 2, cookie ];

                      case 9:
                        return [ 2, (0, exports.setDistinctIdCookie)(cookie, params) ];

                      case 10:
                        if (!(localDistinctId && remoteDistinctId !== localDistinctId)) return [ 3, 12 ];
                        if (!(remoteKeyCloakId !== localKeyCloakId)) return [ 3, 12 ];
                        return [ 4, storage.set(key, remoteCookie) ];

                      case 11:
                        _d.sent();
                        return [ 2, remoteCookie ];

                      case 12:
                        cookie.distinct_id = remoteDistinctId;
                        cookie.keycloak_id = remoteKeyCloakId;
                        cookie.data = __assign(__assign({}, localCookie.data), remoteCookie.data);
                        if (!(0, deep_equal_1.default)(cookie.data, remoteCookie.data)) return [ 3, 14 ];
                        return [ 4, storage.set(key, cookie) ];

                      case 13:
                        _d.sent();
                        return [ 2, cookie ];

                      case 14:
                        return [ 2, (0, exports.setDistinctIdCookie)(cookie, params) ];

                      case 15:
                        if (!remoteKeyCloakId || remoteKeyCloakId === localKeyCloakId) {
                            cookie.distinct_id = localDistinctId;
                            cookie.keycloak_id = localKeyCloakId;
                            cookie.data = __assign(__assign({}, localCookie.data), remoteCookie.data);
                        } else {
                            cookie.distinct_id = (0, uuid_1.v4)();
                            cookie.keycloak_id = remoteKeyCloakId;
                            cookie.data = remoteCookie.data;
                        }
                        return [ 2, (0, exports.setDistinctIdCookie)(cookie, params) ];
                    }
                }));
            }));
        };
        exports.getDistinctIdCookie = getDistinctIdCookie;
        var getDistinctId = function(params) {
            if (void 0 === params) params = {};
            return __awaiter(void 0, void 0, void 0, (function() {
                var cookie;
                return __generator(this, (function(_a) {
                    switch (_a.label) {
                      case 0:
                        return [ 4, (0, exports.getDistinctIdCookie)(params) ];

                      case 1:
                        cookie = _a.sent();
                        return [ 2, cookie.distinct_id ];
                    }
                }));
            }));
        };
        exports["default"] = getDistinctId;
        var setDistinctIdCookie = function(cookie, _a) {
            var _b = void 0 === _a ? {} : _a, _c = _b.key, key = void 0 === _c ? LOCAL_STORAGE_KEY : _c, _d = _b.host, host = void 0 === _d ? DEFAULT_HOST : _d, _e = _b.origin, origin = void 0 === _e ? DEFAULT_ORIGIN : _e, token = _b.token;
            return __awaiter(void 0, void 0, void 0, (function() {
                return __generator(this, (function(_f) {
                    switch (_f.label) {
                      case 0:
                        return [ 4, storage.set(key, cookie) ];

                      case 1:
                        _f.sent();
                        return [ 4, (0, request_1.default)({
                            method: "POST",
                            host,
                            origin,
                            token,
                            payload: cookie
                        }) ];

                      case 2:
                        _f.sent();
                        return [ 2, cookie ];
                    }
                }));
            }));
        };
        exports.setDistinctIdCookie = setDistinctIdCookie;
    },
    6707: function(__unused_webpack_module, exports, __webpack_require__) {
        "use strict";
        var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
            function adopt(value) {
                return value instanceof P ? value : new P((function(resolve) {
                    resolve(value);
                }));
            }
            return new (P || (P = Promise))((function(resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator["throw"](value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            }));
        };
        var __generator = this && this.__generator || function(thisArg, body) {
            var f, y, t, g, _ = {
                label: 0,
                sent: function() {
                    if (1 & t[0]) throw t[1];
                    return t[1];
                },
                trys: [],
                ops: []
            };
            return g = {
                next: verb(0),
                throw: verb(1),
                return: verb(2)
            }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
                return this;
            }), g;
            function verb(n) {
                return function(v) {
                    return step([ n, v ]);
                };
            }
            function step(op) {
                if (f) throw new TypeError("Generator is already executing.");
                while (g && (g = 0, op[0] && (_ = 0)), _) try {
                    if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
                    0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                    if (y = 0, t) op = [ 2 & op[0], t.value ];
                    switch (op[0]) {
                      case 0:
                      case 1:
                        t = op;
                        break;

                      case 4:
                        _.label++;
                        return {
                            value: op[1],
                            done: false
                        };

                      case 5:
                        _.label++;
                        y = op[1];
                        op = [ 0 ];
                        continue;

                      case 7:
                        op = _.ops.pop();
                        _.trys.pop();
                        continue;

                      default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
                            _ = 0;
                            continue;
                        }
                        if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
                            _.label = op[1];
                            break;
                        }
                        if (6 === op[0] && _.label < t[1]) {
                            _.label = t[1];
                            t = op;
                            break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];
                            _.ops.push(op);
                            break;
                        }
                        if (t[2]) _.ops.pop();
                        _.trys.pop();
                        continue;
                    }
                    op = body.call(thisArg, _);
                } catch (e) {
                    op = [ 6, e ];
                    y = 0;
                } finally {
                    f = t = 0;
                }
                if (5 & op[0]) throw op[1];
                return {
                    value: op[0] ? op[1] : void 0,
                    done: true
                };
            }
        };
        var __importDefault = this && this.__importDefault || function(mod) {
            return mod && mod.__esModule ? mod : {
                default: mod
            };
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var remove_trailing_slash_1 = __importDefault(__webpack_require__(7160));
        var DISTINCT_ID_ENDPOINT = "/api/distinct_id";
        var request = function(params) {
            return __awaiter(void 0, void 0, void 0, (function() {
                var url, headers, body, options, res, data;
                return __generator(this, (function(_b) {
                    switch (_b.label) {
                      case 0:
                        url = (0, remove_trailing_slash_1.default)(params.host) + DISTINCT_ID_ENDPOINT;
                        headers = {
                            Origin: params.origin
                        };
                        if (params.payload) {
                            body = JSON.stringify(params.payload);
                            headers["Content-Type"] = "application/json";
                        }
                        if (params.token) headers.Authorization = "Bearer ".concat(params.token);
                        options = {
                            credentials: "include",
                            method: params.method,
                            headers,
                            body
                        };
                        _b.label = 1;

                      case 1:
                        _b.trys.push([ 1, 4, , 5 ]);
                        return [ 4, fetch(url, options) ];

                      case 2:
                        res = _b.sent();
                        if (!res.ok) return [ 2, null ];
                        return [ 4, res.json() ];

                      case 3:
                        data = _b.sent();
                        return [ 2, data ];

                      case 4:
                        _b.sent();
                        return [ 2, null ];

                      case 5:
                        return [ 2 ];
                    }
                }));
            }));
        };
        exports["default"] = request;
    },
    1039: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        __webpack_require__.d(__webpack_exports__, {
            NIL: () => _nil_js__WEBPACK_IMPORTED_MODULE_4__.Z,
            parse: () => _parse_js__WEBPACK_IMPORTED_MODULE_8__.Z,
            stringify: () => _stringify_js__WEBPACK_IMPORTED_MODULE_7__.Z,
            v1: () => _v1_js__WEBPACK_IMPORTED_MODULE_0__.Z,
            v3: () => _v3_js__WEBPACK_IMPORTED_MODULE_1__.Z,
            v4: () => _v4_js__WEBPACK_IMPORTED_MODULE_2__.Z,
            v5: () => _v5_js__WEBPACK_IMPORTED_MODULE_3__.Z,
            validate: () => _validate_js__WEBPACK_IMPORTED_MODULE_6__.Z,
            version: () => _version_js__WEBPACK_IMPORTED_MODULE_5__.Z
        });
        if (998 != __webpack_require__.j) var _v1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3943);
        if (998 != __webpack_require__.j) var _v3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6755);
        if (998 != __webpack_require__.j) var _v4_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4829);
        if (998 != __webpack_require__.j) var _v5_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1825);
        if (998 != __webpack_require__.j) var _nil_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6327);
        if (998 != __webpack_require__.j) var _version_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5834);
        if (998 != __webpack_require__.j) var _validate_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2515);
        if (998 != __webpack_require__.j) var _stringify_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3866);
        if (998 != __webpack_require__.j) var _parse_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1087);
    },
    6327: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
            Z: () => __WEBPACK_DEFAULT_EXPORT__
        });
        const __WEBPACK_DEFAULT_EXPORT__ = "00000000-0000-0000-0000-000000000000";
    },
    1087: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
            Z: () => __WEBPACK_DEFAULT_EXPORT__
        });
        if (998 != __webpack_require__.j) var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2515);
        function parse(uuid) {
            if (!(0, _validate_js__WEBPACK_IMPORTED_MODULE_0__.Z)(uuid)) throw TypeError("Invalid UUID");
            var v;
            var arr = new Uint8Array(16);
            arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
            arr[1] = v >>> 16 & 255;
            arr[2] = v >>> 8 & 255;
            arr[3] = 255 & v;
            arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
            arr[5] = 255 & v;
            arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
            arr[7] = 255 & v;
            arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
            arr[9] = 255 & v;
            arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 1099511627776 & 255;
            arr[11] = v / 4294967296 & 255;
            arr[12] = v >>> 24 & 255;
            arr[13] = v >>> 16 & 255;
            arr[14] = v >>> 8 & 255;
            arr[15] = 255 & v;
            return arr;
        }
        const __WEBPACK_DEFAULT_EXPORT__ = 998 != __webpack_require__.j ? parse : null;
    },
    3072: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
            Z: () => __WEBPACK_DEFAULT_EXPORT__
        });
        const __WEBPACK_DEFAULT_EXPORT__ = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
    },
    261: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
            Z: () => rng
        });
        var getRandomValues;
        var rnds8 = new Uint8Array(16);
        function rng() {
            if (!getRandomValues) {
                getRandomValues = "undefined" !== typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" !== typeof msCrypto && "function" === typeof msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto);
                if (!getRandomValues) throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
            }
            return getRandomValues(rnds8);
        }
    },
    3866: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
            Z: () => __WEBPACK_DEFAULT_EXPORT__
        });
        if (998 != __webpack_require__.j) var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2515);
        var byteToHex = [];
        for (var i = 0; i < 256; ++i) byteToHex.push((i + 256).toString(16).substr(1));
        function stringify(arr) {
            var offset = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
            var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
            if (!(0, _validate_js__WEBPACK_IMPORTED_MODULE_0__.Z)(uuid)) throw TypeError("Stringified UUID is invalid");
            return uuid;
        }
        const __WEBPACK_DEFAULT_EXPORT__ = 998 != __webpack_require__.j ? stringify : null;
    },
    3943: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
            Z: () => __WEBPACK_DEFAULT_EXPORT__
        });
        if (998 != __webpack_require__.j) var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(261);
        if (998 != __webpack_require__.j) var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3866);
        var _nodeId;
        var _clockseq;
        var _lastMSecs = 0;
        var _lastNSecs = 0;
        function v1(options, buf, offset) {
            var i = buf && offset || 0;
            var b = buf || new Array(16);
            options = options || {};
            var node = options.node || _nodeId;
            var clockseq = void 0 !== options.clockseq ? options.clockseq : _clockseq;
            if (null == node || null == clockseq) {
                var seedBytes = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__.Z)();
                if (null == node) node = _nodeId = [ 1 | seedBytes[0], seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5] ];
                if (null == clockseq) clockseq = _clockseq = 16383 & (seedBytes[6] << 8 | seedBytes[7]);
            }
            var msecs = void 0 !== options.msecs ? options.msecs : Date.now();
            var nsecs = void 0 !== options.nsecs ? options.nsecs : _lastNSecs + 1;
            var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 1e4;
            if (dt < 0 && void 0 === options.clockseq) clockseq = clockseq + 1 & 16383;
            if ((dt < 0 || msecs > _lastMSecs) && void 0 === options.nsecs) nsecs = 0;
            if (nsecs >= 1e4) throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
            _lastMSecs = msecs;
            _lastNSecs = nsecs;
            _clockseq = clockseq;
            msecs += 122192928e5;
            var tl = (1e4 * (268435455 & msecs) + nsecs) % 4294967296;
            b[i++] = tl >>> 24 & 255;
            b[i++] = tl >>> 16 & 255;
            b[i++] = tl >>> 8 & 255;
            b[i++] = 255 & tl;
            var tmh = msecs / 4294967296 * 1e4 & 268435455;
            b[i++] = tmh >>> 8 & 255;
            b[i++] = 255 & tmh;
            b[i++] = tmh >>> 24 & 15 | 16;
            b[i++] = tmh >>> 16 & 255;
            b[i++] = clockseq >>> 8 | 128;
            b[i++] = 255 & clockseq;
            for (var n = 0; n < 6; ++n) b[i + n] = node[n];
            return buf || (0, _stringify_js__WEBPACK_IMPORTED_MODULE_1__.Z)(b);
        }
        const __WEBPACK_DEFAULT_EXPORT__ = 998 != __webpack_require__.j ? v1 : null;
    },
    6755: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
            Z: () => esm_browser_v3
        });
        var v35 = __webpack_require__(1597);
        function md5(bytes) {
            if ("string" === typeof bytes) {
                var msg = unescape(encodeURIComponent(bytes));
                bytes = new Uint8Array(msg.length);
                for (var i = 0; i < msg.length; ++i) bytes[i] = msg.charCodeAt(i);
            }
            return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), 8 * bytes.length));
        }
        function md5ToHexEncodedArray(input) {
            var output = [];
            var length32 = 32 * input.length;
            var hexTab = "0123456789abcdef";
            for (var i = 0; i < length32; i += 8) {
                var x = input[i >> 5] >>> i % 32 & 255;
                var hex = parseInt(hexTab.charAt(x >>> 4 & 15) + hexTab.charAt(15 & x), 16);
                output.push(hex);
            }
            return output;
        }
        function getOutputLength(inputLength8) {
            return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
        }
        function wordsToMd5(x, len) {
            x[len >> 5] |= 128 << len % 32;
            x[getOutputLength(len) - 1] = len;
            var a = 1732584193;
            var b = -271733879;
            var c = -1732584194;
            var d = 271733878;
            for (var i = 0; i < x.length; i += 16) {
                var olda = a;
                var oldb = b;
                var oldc = c;
                var oldd = d;
                a = md5ff(a, b, c, d, x[i], 7, -680876936);
                d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
                c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
                b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
                a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
                d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
                c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
                b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
                a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
                d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
                c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
                b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
                a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
                d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
                c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
                b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
                a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
                d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
                c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
                b = md5gg(b, c, d, a, x[i], 20, -373897302);
                a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
                d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
                c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
                b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
                a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
                d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
                c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
                b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
                a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
                d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
                c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
                b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
                a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
                d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
                c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
                b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
                a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
                d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
                c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
                b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
                a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
                d = md5hh(d, a, b, c, x[i], 11, -358537222);
                c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
                b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
                a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
                d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
                c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
                b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
                a = md5ii(a, b, c, d, x[i], 6, -198630844);
                d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
                c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
                b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
                a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
                d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
                c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
                b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
                a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
                d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
                c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
                b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
                a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
                d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
                c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
                b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
                a = safeAdd(a, olda);
                b = safeAdd(b, oldb);
                c = safeAdd(c, oldc);
                d = safeAdd(d, oldd);
            }
            return [ a, b, c, d ];
        }
        function bytesToWords(input) {
            if (0 === input.length) return [];
            var length8 = 8 * input.length;
            var output = new Uint32Array(getOutputLength(length8));
            for (var i = 0; i < length8; i += 8) output[i >> 5] |= (255 & input[i / 8]) << i % 32;
            return output;
        }
        function safeAdd(x, y) {
            var lsw = (65535 & x) + (65535 & y);
            var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return msw << 16 | 65535 & lsw;
        }
        function bitRotateLeft(num, cnt) {
            return num << cnt | num >>> 32 - cnt;
        }
        function md5cmn(q, a, b, x, s, t) {
            return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
        }
        function md5ff(a, b, c, d, x, s, t) {
            return md5cmn(b & c | ~b & d, a, b, x, s, t);
        }
        function md5gg(a, b, c, d, x, s, t) {
            return md5cmn(b & d | c & ~d, a, b, x, s, t);
        }
        function md5hh(a, b, c, d, x, s, t) {
            return md5cmn(b ^ c ^ d, a, b, x, s, t);
        }
        function md5ii(a, b, c, d, x, s, t) {
            return md5cmn(c ^ (b | ~d), a, b, x, s, t);
        }
        const esm_browser_md5 = md5;
        var v3 = (0, v35.ZP)("v3", 48, esm_browser_md5);
        const esm_browser_v3 = v3;
    },
    1597: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
            ZP: () => __WEBPACK_DEFAULT_EXPORT__
        });
        if (998 != __webpack_require__.j) var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3866);
        if (998 != __webpack_require__.j) var _parse_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1087);
        function stringToBytes(str) {
            str = unescape(encodeURIComponent(str));
            var bytes = [];
            for (var i = 0; i < str.length; ++i) bytes.push(str.charCodeAt(i));
            return bytes;
        }
        var DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
        var URL = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
        function __WEBPACK_DEFAULT_EXPORT__(name, version, hashfunc) {
            function generateUUID(value, namespace, buf, offset) {
                if ("string" === typeof value) value = stringToBytes(value);
                if ("string" === typeof namespace) namespace = (0, _parse_js__WEBPACK_IMPORTED_MODULE_0__.Z)(namespace);
                if (16 !== namespace.length) throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
                var bytes = new Uint8Array(16 + value.length);
                bytes.set(namespace);
                bytes.set(value, namespace.length);
                bytes = hashfunc(bytes);
                bytes[6] = 15 & bytes[6] | version;
                bytes[8] = 63 & bytes[8] | 128;
                if (buf) {
                    offset = offset || 0;
                    for (var i = 0; i < 16; ++i) buf[offset + i] = bytes[i];
                    return buf;
                }
                return (0, _stringify_js__WEBPACK_IMPORTED_MODULE_1__.Z)(bytes);
            }
            try {
                generateUUID.name = name;
            } catch (err) {}
            generateUUID.DNS = DNS;
            generateUUID.URL = URL;
            return generateUUID;
        }
    },
    4829: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
            Z: () => __WEBPACK_DEFAULT_EXPORT__
        });
        if (998 != __webpack_require__.j) var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(261);
        if (998 != __webpack_require__.j) var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3866);
        function v4(options, buf, offset) {
            options = options || {};
            var rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__.Z)();
            rnds[6] = 15 & rnds[6] | 64;
            rnds[8] = 63 & rnds[8] | 128;
            if (buf) {
                offset = offset || 0;
                for (var i = 0; i < 16; ++i) buf[offset + i] = rnds[i];
                return buf;
            }
            return (0, _stringify_js__WEBPACK_IMPORTED_MODULE_1__.Z)(rnds);
        }
        const __WEBPACK_DEFAULT_EXPORT__ = 998 != __webpack_require__.j ? v4 : null;
    },
    1825: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
            Z: () => esm_browser_v5
        });
        var v35 = __webpack_require__(1597);
        function f(s, x, y, z) {
            switch (s) {
              case 0:
                return x & y ^ ~x & z;

              case 1:
                return x ^ y ^ z;

              case 2:
                return x & y ^ x & z ^ y & z;

              case 3:
                return x ^ y ^ z;
            }
        }
        function ROTL(x, n) {
            return x << n | x >>> 32 - n;
        }
        function sha1(bytes) {
            var K = [ 1518500249, 1859775393, 2400959708, 3395469782 ];
            var H = [ 1732584193, 4023233417, 2562383102, 271733878, 3285377520 ];
            if ("string" === typeof bytes) {
                var msg = unescape(encodeURIComponent(bytes));
                bytes = [];
                for (var i = 0; i < msg.length; ++i) bytes.push(msg.charCodeAt(i));
            } else if (!Array.isArray(bytes)) bytes = Array.prototype.slice.call(bytes);
            bytes.push(128);
            var l = bytes.length / 4 + 2;
            var N = Math.ceil(l / 16);
            var M = new Array(N);
            for (var _i = 0; _i < N; ++_i) {
                var arr = new Uint32Array(16);
                for (var j = 0; j < 16; ++j) arr[j] = bytes[64 * _i + 4 * j] << 24 | bytes[64 * _i + 4 * j + 1] << 16 | bytes[64 * _i + 4 * j + 2] << 8 | bytes[64 * _i + 4 * j + 3];
                M[_i] = arr;
            }
            M[N - 1][14] = 8 * (bytes.length - 1) / Math.pow(2, 32);
            M[N - 1][14] = Math.floor(M[N - 1][14]);
            M[N - 1][15] = 8 * (bytes.length - 1) & 4294967295;
            for (var _i2 = 0; _i2 < N; ++_i2) {
                var W = new Uint32Array(80);
                for (var t = 0; t < 16; ++t) W[t] = M[_i2][t];
                for (var _t = 16; _t < 80; ++_t) W[_t] = ROTL(W[_t - 3] ^ W[_t - 8] ^ W[_t - 14] ^ W[_t - 16], 1);
                var a = H[0];
                var b = H[1];
                var c = H[2];
                var d = H[3];
                var e = H[4];
                for (var _t2 = 0; _t2 < 80; ++_t2) {
                    var s = Math.floor(_t2 / 20);
                    var T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[_t2] >>> 0;
                    e = d;
                    d = c;
                    c = ROTL(b, 30) >>> 0;
                    b = a;
                    a = T;
                }
                H[0] = H[0] + a >>> 0;
                H[1] = H[1] + b >>> 0;
                H[2] = H[2] + c >>> 0;
                H[3] = H[3] + d >>> 0;
                H[4] = H[4] + e >>> 0;
            }
            return [ H[0] >> 24 & 255, H[0] >> 16 & 255, H[0] >> 8 & 255, 255 & H[0], H[1] >> 24 & 255, H[1] >> 16 & 255, H[1] >> 8 & 255, 255 & H[1], H[2] >> 24 & 255, H[2] >> 16 & 255, H[2] >> 8 & 255, 255 & H[2], H[3] >> 24 & 255, H[3] >> 16 & 255, H[3] >> 8 & 255, 255 & H[3], H[4] >> 24 & 255, H[4] >> 16 & 255, H[4] >> 8 & 255, 255 & H[4] ];
        }
        const esm_browser_sha1 = sha1;
        var v5 = (0, v35.ZP)("v5", 80, esm_browser_sha1);
        const esm_browser_v5 = v5;
    },
    2515: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
            Z: () => __WEBPACK_DEFAULT_EXPORT__
        });
        if (998 != __webpack_require__.j) var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3072);
        function validate(uuid) {
            return "string" === typeof uuid && _regex_js__WEBPACK_IMPORTED_MODULE_0__.Z.test(uuid);
        }
        const __WEBPACK_DEFAULT_EXPORT__ = 998 != __webpack_require__.j ? validate : null;
    },
    5834: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
            Z: () => __WEBPACK_DEFAULT_EXPORT__
        });
        if (998 != __webpack_require__.j) var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2515);
        function version(uuid) {
            if (!(0, _validate_js__WEBPACK_IMPORTED_MODULE_0__.Z)(uuid)) throw TypeError("Invalid UUID");
            return parseInt(uuid.substr(14, 1), 16);
        }
        const __WEBPACK_DEFAULT_EXPORT__ = 998 != __webpack_require__.j ? version : null;
    },
    5741: (module, __unused_webpack_exports, __webpack_require__) => {
        "use strict";
        var axios = __webpack_require__(8889);
        function _interopDefaultLegacy(e) {
            return e && "object" === typeof e && "default" in e ? e : {
                default: e
            };
        }
        var axios__default = _interopDefaultLegacy(axios);
        const ENV_DISTINCT_ID = "AXE_DISTINCT_ID";
        const redirectCodes = [ 301, 302, 303, 307 ];
        const V2_OPTIONAL_BOOL_PROPERTIES = [ {
            key: "devInstance",
            suffix: "DEV_INSTANCE",
            override: true
        }, {
            key: "loggedIn",
            suffix: "LOGGED_IN",
            override: false
        } ];
        const V2_OPTIONAL_STRING_PROPERTIES = [ {
            key: "keycloakId",
            suffix: "KEYCLOAK_ID",
            override: false
        }, {
            key: "userId",
            suffix: "USER_ID",
            override: false
        }, {
            key: "organization",
            suffix: "ORGANIZATION",
            override: true
        }, {
            key: "department",
            suffix: "DEPARTMENT",
            override: true
        }, {
            key: "application",
            suffix: "APPLICATION",
            override: false
        }, {
            key: "sessionId",
            suffix: "SESSION_ID",
            override: false
        }, {
            key: "userStatus",
            suffix: "USER_STATUS",
            override: false
        }, {
            key: "userJobRole",
            suffix: "USER_JOB_ROLE",
            override: false
        } ];
        const DISTINCT_V2_PROPS = [ "userJobRole", "applicationProperties", "distinctId", "keycloakId", "loggedIn", "userStatus" ];
        function getEnv(name) {
            if (true) return {
                NODE_ENV: "production",
                COCONUT: "false",
                EDGE: "false",
                FIREFOX: "true",
                IS_AXE_PRO: "false",
                MANIFEST_VERSION: 2,
                E2E: false,
                DOCS_SITE_URL: "https://docs.deque.com/devtools-html",
                ISSUES_URL: "https://docs.deque.com/issue-help/1.0.0/en",
                AXE_CONFIG_URL: "https://docs.deque.com/devtools-server/4.0.0/en/axe-configuration",
                MANUAL_ISSUE_URL: "https://docs.deque.com/devtools-html/4.0.0/en/devtools-manual-issue",
                WHATS_LEFT_TO_TEST_URL: "https://docs.deque.com/devtools-html/4.0.0/en/devtools-whatslefttotest",
                USER_FLOW_URL: "https://docs.deque.com/devtools-html/4.0.0/en/user-flow-analysis",
                AXE_PRO_TRIAL_PATH: "/axe-devtools-pro/trial",
                ENV: "production",
                AXE_PRO_URL: "https://axe.deque.com",
                USAGE_SERVICE_URL: "https://usage.deque.com",
                AMPLITUDE_API_KEY: "a1ce09d0b14ddcc12ab7b508b6606a2f",
                DATADOG_CLIENT_TOKEN: "puba2eb4ed47c6eb69ce20ef237db754ff8"
            }[name] || null;
            return null;
        }
        function setV2OptionalPropsFromEnv(event) {
            for (const {key, suffix, override} of V2_OPTIONAL_BOOL_PROPERTIES) {
                if (key in event && !override) continue;
                const value = getEnv(`AXE_${suffix}`);
                if (null !== value) event[key] = "true" === value;
            }
            for (const {key, suffix, override} of V2_OPTIONAL_STRING_PROPERTIES) {
                if (key in event && !override) continue;
                const value = getEnv(`AXE_${suffix}`);
                if (null !== value) event[key] = value;
            }
        }
        class Analytics {
            constructor(productName, productComponent, productComponentVersion) {
                this.productName = productName;
                this.productComponent = productComponent;
                this.productComponentVersion = productComponentVersion;
                const track = getEnv("AXE_TRACK_USAGE");
                this.myTrackUsage = "true" === track;
                this.enableTrackingFromEnv = null !== track;
                const url = getEnv("AXE_METRICS_URL");
                this.myUrl = url || "https://usage.deque.com";
                this.urlFromEnv = null !== url;
                getEnv(ENV_DISTINCT_ID);
                this.didFromEnv = false;
            }
            distinctId(id) {
                if (id) this.myDistinctId = id;
                return this.myDistinctId;
            }
            enableTracking(state) {
                if (void 0 !== state) this.myTrackUsage = state;
                return this.myTrackUsage;
            }
            url(state) {
                if (void 0 !== state) this.myUrl = state;
                return this.myUrl;
            }
            postEvent(event) {
                if (!this.myTrackUsage) return;
                let version = "v1";
                for (const prop of DISTINCT_V2_PROPS) if (Object.prototype.hasOwnProperty.call(event, prop)) {
                    version = "v2";
                    break;
                }
                const internalFields = {
                    dateTime: new Date,
                    productComponent: this.productComponent,
                    productName: this.productName,
                    version
                };
                if ("v2" === version) {
                    internalFields.productComponentVersion = this.productComponentVersion;
                    setV2OptionalPropsFromEnv(event);
                }
                const sendEvent = Object.assign(Object.assign({}, internalFields), event);
                const axiosPost = axios__default["default"].create({
                    maxRedirects: 0,
                    validateStatus: status => status >= 200 && status < 300 || redirectCodes.includes(status)
                });
                const send = url => {
                    const handleRedirect = response => {
                        if (redirectCodes.includes(response.status)) {
                            const newUrl = response.headers.location;
                            if (newUrl) send(newUrl);
                        }
                    };
                    const retry = error => {
                        if ("ECONNREFUSED" !== error.code) return;
                        const parsedURL = new URL(url);
                        const isHTTPS = "https:" === parsedURL.protocol;
                        if (!isHTTPS) return;
                        parsedURL.protocol = "http:";
                        parsedURL.pathname = `/${version}/event`;
                        axiosPost.post(parsedURL.href, sendEvent).then(handleRedirect).catch((() => {}));
                    };
                    axiosPost.post(`${url}/${version}/event`, sendEvent).then(handleRedirect).catch(retry);
                };
                send(this.myUrl);
            }
        }
        module.exports = Analytics;
    },
    7793: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
            Z: () => newInstance
        });
        var base_namespaceObject = {};
        __webpack_require__.r(base_namespaceObject);
        __webpack_require__.d(base_namespaceObject, {
            exclude: () => exclude,
            extract: () => extract,
            parse: () => parse,
            parseUrl: () => parseUrl,
            pick: () => pick,
            stringify: () => stringify,
            stringifyUrl: () => stringifyUrl
        });
        function isBrowserEnv() {
            return true && void 0 !== (null === window || void 0 === window ? void 0 : window.document);
        }
        var prototypeJsFix = function() {
            var _a;
            if (isBrowserEnv()) {
                var augmentedWindow = window;
                var augmentedArray = Array;
                if (void 0 !== augmentedWindow.Prototype && void 0 !== (null === (_a = augmentedArray.prototype) || void 0 === _a ? void 0 : _a.toJSON)) {
                    delete augmentedArray.prototype.toJSON;
                    return true;
                }
            }
            return false;
        };
        var md5 = __webpack_require__(4327);
        var md5_default = __webpack_require__.n(md5);
        const token = "%[a-f0-9]{2}";
        const singleMatcher = new RegExp("(" + token + ")|([^%]+?)", "gi");
        const multiMatcher = new RegExp("(" + token + ")+", "gi");
        function decodeComponents(components, split) {
            try {
                return [ decodeURIComponent(components.join("")) ];
            } catch {}
            if (1 === components.length) return components;
            split = split || 1;
            const left = components.slice(0, split);
            const right = components.slice(split);
            return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
        }
        function decode(input) {
            try {
                return decodeURIComponent(input);
            } catch {
                let tokens = input.match(singleMatcher) || [];
                for (let i = 1; i < tokens.length; i++) {
                    input = decodeComponents(tokens, i).join("");
                    tokens = input.match(singleMatcher) || [];
                }
                return input;
            }
        }
        function customDecodeURIComponent(input) {
            const replaceMap = {
                "%FE%FF": "��",
                "%FF%FE": "��"
            };
            let match = multiMatcher.exec(input);
            while (match) {
                try {
                    replaceMap[match[0]] = decodeURIComponent(match[0]);
                } catch {
                    const result = decode(match[0]);
                    if (result !== match[0]) replaceMap[match[0]] = result;
                }
                match = multiMatcher.exec(input);
            }
            replaceMap["%C2"] = "�";
            const entries = Object.keys(replaceMap);
            for (const key of entries) input = input.replace(new RegExp(key, "g"), replaceMap[key]);
            return input;
        }
        function decodeUriComponent(encodedURI) {
            if ("string" !== typeof encodedURI) throw new TypeError("Expected `encodedURI` to be of type `string`, got `" + typeof encodedURI + "`");
            try {
                return decodeURIComponent(encodedURI);
            } catch {
                return customDecodeURIComponent(encodedURI);
            }
        }
        var split_on_first = __webpack_require__(1844);
        var filter_obj = __webpack_require__(8467);
        const isNullOrUndefined = value => null === value || void 0 === value;
        const strictUriEncode = string => encodeURIComponent(string).replace(/[!'()*]/g, (x => `%${x.charCodeAt(0).toString(16).toUpperCase()}`));
        const encodeFragmentIdentifier = Symbol("encodeFragmentIdentifier");
        function encoderForArrayFormat(options) {
            switch (options.arrayFormat) {
              case "index":
                return key => (result, value) => {
                    const index = result.length;
                    if (void 0 === value || options.skipNull && null === value || options.skipEmptyString && "" === value) return result;
                    if (null === value) return [ ...result, [ encode(key, options), "[", index, "]" ].join("") ];
                    return [ ...result, [ encode(key, options), "[", encode(index, options), "]=", encode(value, options) ].join("") ];
                };

              case "bracket":
                return key => (result, value) => {
                    if (void 0 === value || options.skipNull && null === value || options.skipEmptyString && "" === value) return result;
                    if (null === value) return [ ...result, [ encode(key, options), "[]" ].join("") ];
                    return [ ...result, [ encode(key, options), "[]=", encode(value, options) ].join("") ];
                };

              case "colon-list-separator":
                return key => (result, value) => {
                    if (void 0 === value || options.skipNull && null === value || options.skipEmptyString && "" === value) return result;
                    if (null === value) return [ ...result, [ encode(key, options), ":list=" ].join("") ];
                    return [ ...result, [ encode(key, options), ":list=", encode(value, options) ].join("") ];
                };

              case "comma":
              case "separator":
              case "bracket-separator":
                {
                    const keyValueSep = "bracket-separator" === options.arrayFormat ? "[]=" : "=";
                    return key => (result, value) => {
                        if (void 0 === value || options.skipNull && null === value || options.skipEmptyString && "" === value) return result;
                        value = null === value ? "" : value;
                        if (0 === result.length) return [ [ encode(key, options), keyValueSep, encode(value, options) ].join("") ];
                        return [ [ result, encode(value, options) ].join(options.arrayFormatSeparator) ];
                    };
                }

              default:
                return key => (result, value) => {
                    if (void 0 === value || options.skipNull && null === value || options.skipEmptyString && "" === value) return result;
                    if (null === value) return [ ...result, encode(key, options) ];
                    return [ ...result, [ encode(key, options), "=", encode(value, options) ].join("") ];
                };
            }
        }
        function parserForArrayFormat(options) {
            let result;
            switch (options.arrayFormat) {
              case "index":
                return (key, value, accumulator) => {
                    result = /\[(\d*)]$/.exec(key);
                    key = key.replace(/\[\d*]$/, "");
                    if (!result) {
                        accumulator[key] = value;
                        return;
                    }
                    if (void 0 === accumulator[key]) accumulator[key] = {};
                    accumulator[key][result[1]] = value;
                };

              case "bracket":
                return (key, value, accumulator) => {
                    result = /(\[])$/.exec(key);
                    key = key.replace(/\[]$/, "");
                    if (!result) {
                        accumulator[key] = value;
                        return;
                    }
                    if (void 0 === accumulator[key]) {
                        accumulator[key] = [ value ];
                        return;
                    }
                    accumulator[key] = [ ...accumulator[key], value ];
                };

              case "colon-list-separator":
                return (key, value, accumulator) => {
                    result = /(:list)$/.exec(key);
                    key = key.replace(/:list$/, "");
                    if (!result) {
                        accumulator[key] = value;
                        return;
                    }
                    if (void 0 === accumulator[key]) {
                        accumulator[key] = [ value ];
                        return;
                    }
                    accumulator[key] = [ ...accumulator[key], value ];
                };

              case "comma":
              case "separator":
                return (key, value, accumulator) => {
                    const isArray = "string" === typeof value && value.includes(options.arrayFormatSeparator);
                    const isEncodedArray = "string" === typeof value && !isArray && base_decode(value, options).includes(options.arrayFormatSeparator);
                    value = isEncodedArray ? base_decode(value, options) : value;
                    const newValue = isArray || isEncodedArray ? value.split(options.arrayFormatSeparator).map((item => base_decode(item, options))) : null === value ? value : base_decode(value, options);
                    accumulator[key] = newValue;
                };

              case "bracket-separator":
                return (key, value, accumulator) => {
                    const isArray = /(\[])$/.test(key);
                    key = key.replace(/\[]$/, "");
                    if (!isArray) {
                        accumulator[key] = value ? base_decode(value, options) : value;
                        return;
                    }
                    const arrayValue = null === value ? [] : value.split(options.arrayFormatSeparator).map((item => base_decode(item, options)));
                    if (void 0 === accumulator[key]) {
                        accumulator[key] = arrayValue;
                        return;
                    }
                    accumulator[key] = [ ...accumulator[key], ...arrayValue ];
                };

              default:
                return (key, value, accumulator) => {
                    if (void 0 === accumulator[key]) {
                        accumulator[key] = value;
                        return;
                    }
                    accumulator[key] = [ ...[ accumulator[key] ].flat(), value ];
                };
            }
        }
        function validateArrayFormatSeparator(value) {
            if ("string" !== typeof value || 1 !== value.length) throw new TypeError("arrayFormatSeparator must be single character string");
        }
        function encode(value, options) {
            if (options.encode) return options.strict ? strictUriEncode(value) : encodeURIComponent(value);
            return value;
        }
        function base_decode(value, options) {
            if (options.decode) return decodeUriComponent(value);
            return value;
        }
        function keysSorter(input) {
            if (Array.isArray(input)) return input.sort();
            if ("object" === typeof input) return keysSorter(Object.keys(input)).sort(((a, b) => Number(a) - Number(b))).map((key => input[key]));
            return input;
        }
        function removeHash(input) {
            const hashStart = input.indexOf("#");
            if (-1 !== hashStart) input = input.slice(0, hashStart);
            return input;
        }
        function getHash(url) {
            let hash = "";
            const hashStart = url.indexOf("#");
            if (-1 !== hashStart) hash = url.slice(hashStart);
            return hash;
        }
        function parseValue(value, options) {
            if (options.parseNumbers && !Number.isNaN(Number(value)) && "string" === typeof value && "" !== value.trim()) value = Number(value); else if (options.parseBooleans && null !== value && ("true" === value.toLowerCase() || "false" === value.toLowerCase())) value = "true" === value.toLowerCase();
            return value;
        }
        function extract(input) {
            input = removeHash(input);
            const queryStart = input.indexOf("?");
            if (-1 === queryStart) return "";
            return input.slice(queryStart + 1);
        }
        function parse(query, options) {
            options = {
                decode: true,
                sort: true,
                arrayFormat: "none",
                arrayFormatSeparator: ",",
                parseNumbers: false,
                parseBooleans: false,
                ...options
            };
            validateArrayFormatSeparator(options.arrayFormatSeparator);
            const formatter = parserForArrayFormat(options);
            const returnValue = Object.create(null);
            if ("string" !== typeof query) return returnValue;
            query = query.trim().replace(/^[?#&]/, "");
            if (!query) return returnValue;
            for (const parameter of query.split("&")) {
                if ("" === parameter) continue;
                const parameter_ = options.decode ? parameter.replace(/\+/g, " ") : parameter;
                let [key, value] = (0, split_on_first.Z)(parameter_, "=");
                if (void 0 === key) key = parameter_;
                value = void 0 === value ? null : [ "comma", "separator", "bracket-separator" ].includes(options.arrayFormat) ? value : base_decode(value, options);
                formatter(base_decode(key, options), value, returnValue);
            }
            for (const [key, value] of Object.entries(returnValue)) if ("object" === typeof value && null !== value) for (const [key2, value2] of Object.entries(value)) value[key2] = parseValue(value2, options); else returnValue[key] = parseValue(value, options);
            if (false === options.sort) return returnValue;
            return (true === options.sort ? Object.keys(returnValue).sort() : Object.keys(returnValue).sort(options.sort)).reduce(((result, key) => {
                const value = returnValue[key];
                if (Boolean(value) && "object" === typeof value && !Array.isArray(value)) result[key] = keysSorter(value); else result[key] = value;
                return result;
            }), Object.create(null));
        }
        function stringify(object, options) {
            if (!object) return "";
            options = {
                encode: true,
                strict: true,
                arrayFormat: "none",
                arrayFormatSeparator: ",",
                ...options
            };
            validateArrayFormatSeparator(options.arrayFormatSeparator);
            const shouldFilter = key => options.skipNull && isNullOrUndefined(object[key]) || options.skipEmptyString && "" === object[key];
            const formatter = encoderForArrayFormat(options);
            const objectCopy = {};
            for (const [key, value] of Object.entries(object)) if (!shouldFilter(key)) objectCopy[key] = value;
            const keys = Object.keys(objectCopy);
            if (false !== options.sort) keys.sort(options.sort);
            return keys.map((key => {
                const value = object[key];
                if (void 0 === value) return "";
                if (null === value) return encode(key, options);
                if (Array.isArray(value)) {
                    if (0 === value.length && "bracket-separator" === options.arrayFormat) return encode(key, options) + "[]";
                    return value.reduce(formatter(key), []).join("&");
                }
                return encode(key, options) + "=" + encode(value, options);
            })).filter((x => x.length > 0)).join("&");
        }
        function parseUrl(url, options) {
            options = {
                decode: true,
                ...options
            };
            let [url_, hash] = (0, split_on_first.Z)(url, "#");
            if (void 0 === url_) url_ = url;
            return {
                url: url_?.split("?")?.[0] ?? "",
                query: parse(extract(url), options),
                ...options && options.parseFragmentIdentifier && hash ? {
                    fragmentIdentifier: base_decode(hash, options)
                } : {}
            };
        }
        function stringifyUrl(object, options) {
            options = {
                encode: true,
                strict: true,
                [encodeFragmentIdentifier]: true,
                ...options
            };
            const url = removeHash(object.url).split("?")[0] || "";
            const queryFromUrl = extract(object.url);
            const query = {
                ...parse(queryFromUrl, {
                    sort: false
                }),
                ...object.query
            };
            let queryString = stringify(query, options);
            if (queryString) queryString = `?${queryString}`;
            let hash = getHash(object.url);
            if (object.fragmentIdentifier) {
                const urlObjectForFragmentEncode = new URL(url);
                urlObjectForFragmentEncode.hash = object.fragmentIdentifier;
                hash = options[encodeFragmentIdentifier] ? urlObjectForFragmentEncode.hash : `#${object.fragmentIdentifier}`;
            }
            return `${url}${queryString}${hash}`;
        }
        function pick(input, filter, options) {
            options = {
                parseFragmentIdentifier: true,
                [encodeFragmentIdentifier]: false,
                ...options
            };
            const {url, query, fragmentIdentifier} = parseUrl(input, options);
            return stringifyUrl({
                url,
                query: (0, filter_obj.T)(query, filter),
                fragmentIdentifier
            }, options);
        }
        function exclude(input, filter, options) {
            const exclusionFilter = Array.isArray(filter) ? key => !filter.includes(key) : (key, value) => !filter(key, value);
            return pick(input, exclusionFilter, options);
        }
        const query_string = base_namespaceObject;
        var ua_parser = __webpack_require__(8315);
        var ua_parser_default = __webpack_require__.n(ua_parser);
        var ApplicationContextProviderImpl = function() {
            function ApplicationContextProviderImpl() {}
            ApplicationContextProviderImpl.prototype.getApplicationContext = function() {
                return {
                    versionName: this.versionName,
                    language: getLanguage(),
                    platform: "Web",
                    os: void 0,
                    deviceModel: void 0
                };
            };
            return ApplicationContextProviderImpl;
        }();
        var getLanguage = function() {
            return "undefined" !== typeof navigator && (navigator.languages && navigator.languages[0] || navigator.language) || "";
        };
        var EventBridgeImpl = function() {
            function EventBridgeImpl() {
                this.queue = [];
            }
            EventBridgeImpl.prototype.logEvent = function(event) {
                if (!this.receiver) {
                    if (this.queue.length < 512) this.queue.push(event);
                } else this.receiver(event);
            };
            EventBridgeImpl.prototype.setEventReceiver = function(receiver) {
                this.receiver = receiver;
                if (this.queue.length > 0) {
                    this.queue.forEach((function(event) {
                        receiver(event);
                    }));
                    this.queue = [];
                }
            };
            return EventBridgeImpl;
        }();
        var __assign = function() {
            __assign = Object.assign || function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        var isEqual = function(obj1, obj2) {
            var primitive = [ "string", "number", "boolean", "undefined" ];
            var typeA = typeof obj1;
            var typeB = typeof obj2;
            if (typeA !== typeB) return false;
            for (var _i = 0, primitive_1 = primitive; _i < primitive_1.length; _i++) {
                var p = primitive_1[_i];
                if (p === typeA) return obj1 === obj2;
            }
            if (null == obj1 && null == obj2) return true; else if (null == obj1 || null == obj2) return false;
            if (obj1.length !== obj2.length) return false;
            var isArrayA = Array.isArray(obj1);
            var isArrayB = Array.isArray(obj2);
            if (isArrayA !== isArrayB) return false;
            if (isArrayA && isArrayB) {
                for (var i = 0; i < obj1.length; i++) if (!isEqual(obj1[i], obj2[i])) return false;
            } else {
                var sorted1 = Object.keys(obj1).sort();
                var sorted2 = Object.keys(obj2).sort();
                if (!isEqual(sorted1, sorted2)) return false;
                var result_1 = true;
                Object.keys(obj1).forEach((function(key) {
                    if (!isEqual(obj1[key], obj2[key])) result_1 = false;
                }));
                return result_1;
            }
            return true;
        };
        var ID_OP_SET = "$set";
        var ID_OP_UNSET = "$unset";
        var ID_OP_CLEAR_ALL = "$clearAll";
        if (!Object.entries) Object.entries = function(obj) {
            var ownProps = Object.keys(obj);
            var i = ownProps.length;
            var resArray = new Array(i);
            while (i--) resArray[i] = [ ownProps[i], obj[ownProps[i]] ];
            return resArray;
        };
        var IdentityStoreImpl = function() {
            function IdentityStoreImpl() {
                this.identity = {
                    userProperties: {}
                };
                this.listeners = new Set;
            }
            IdentityStoreImpl.prototype.editIdentity = function() {
                var self = this;
                var actingUserProperties = __assign({}, this.identity.userProperties);
                var actingIdentity = __assign(__assign({}, this.identity), {
                    userProperties: actingUserProperties
                });
                return {
                    setUserId: function(userId) {
                        actingIdentity.userId = userId;
                        return this;
                    },
                    setDeviceId: function(deviceId) {
                        actingIdentity.deviceId = deviceId;
                        return this;
                    },
                    setUserProperties: function(userProperties) {
                        actingIdentity.userProperties = userProperties;
                        return this;
                    },
                    setOptOut: function(optOut) {
                        actingIdentity.optOut = optOut;
                        return this;
                    },
                    updateUserProperties: function(actions) {
                        var actingProperties = actingIdentity.userProperties || {};
                        for (var _i = 0, _a = Object.entries(actions); _i < _a.length; _i++) {
                            var _b = _a[_i], action = _b[0], properties = _b[1];
                            switch (action) {
                              case ID_OP_SET:
                                for (var _c = 0, _d = Object.entries(properties); _c < _d.length; _c++) {
                                    var _e = _d[_c], key = _e[0], value = _e[1];
                                    actingProperties[key] = value;
                                }
                                break;

                              case ID_OP_UNSET:
                                for (var _f = 0, _g = Object.keys(properties); _f < _g.length; _f++) {
                                    key = _g[_f];
                                    delete actingProperties[key];
                                }
                                break;

                              case ID_OP_CLEAR_ALL:
                                actingProperties = {};
                                break;
                            }
                        }
                        actingIdentity.userProperties = actingProperties;
                        return this;
                    },
                    commit: function() {
                        self.setIdentity(actingIdentity);
                        return this;
                    }
                };
            };
            IdentityStoreImpl.prototype.getIdentity = function() {
                return __assign({}, this.identity);
            };
            IdentityStoreImpl.prototype.setIdentity = function(identity) {
                var originalIdentity = __assign({}, this.identity);
                this.identity = __assign({}, identity);
                if (!isEqual(originalIdentity, this.identity)) this.listeners.forEach((function(listener) {
                    listener(identity);
                }));
            };
            IdentityStoreImpl.prototype.addIdentityListener = function(listener) {
                this.listeners.add(listener);
            };
            IdentityStoreImpl.prototype.removeIdentityListener = function(listener) {
                this.listeners.delete(listener);
            };
            return IdentityStoreImpl;
        }();
        var safeGlobal = "undefined" !== typeof globalThis ? globalThis : "undefined" !== typeof __webpack_require__.g ? __webpack_require__.g : self;
        var AnalyticsConnector = function() {
            function AnalyticsConnector() {
                this.identityStore = new IdentityStoreImpl;
                this.eventBridge = new EventBridgeImpl;
                this.applicationContextProvider = new ApplicationContextProviderImpl;
            }
            AnalyticsConnector.getInstance = function(instanceName) {
                if (!safeGlobal["analyticsConnectorInstances"]) safeGlobal["analyticsConnectorInstances"] = {};
                if (!safeGlobal["analyticsConnectorInstances"][instanceName]) safeGlobal["analyticsConnectorInstances"][instanceName] = new AnalyticsConnector;
                return safeGlobal["analyticsConnectorInstances"][instanceName];
            };
            return AnalyticsConnector;
        }();
        function ownKeys(object, enumerableOnly) {
            var keys = Object.keys(object);
            if (Object.getOwnPropertySymbols) {
                var symbols = Object.getOwnPropertySymbols(object);
                enumerableOnly && (symbols = symbols.filter((function(sym) {
                    return Object.getOwnPropertyDescriptor(object, sym).enumerable;
                }))), keys.push.apply(keys, symbols);
            }
            return keys;
        }
        function _objectSpread2(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = null != arguments[i] ? arguments[i] : {};
                i % 2 ? ownKeys(Object(source), !0).forEach((function(key) {
                    _defineProperty(target, key, source[key]);
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach((function(key) {
                    Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
                }));
            }
            return target;
        }
        function _typeof(obj) {
            "@babel/helpers - typeof";
            return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            }, _typeof(obj);
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
            }
        }
        function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps) _defineProperties(Constructor.prototype, protoProps);
            if (staticProps) _defineProperties(Constructor, staticProps);
            Object.defineProperty(Constructor, "prototype", {
                writable: false
            });
            return Constructor;
        }
        function _defineProperty(obj, key, value) {
            key = _toPropertyKey(key);
            if (key in obj) Object.defineProperty(obj, key, {
                value,
                enumerable: true,
                configurable: true,
                writable: true
            }); else obj[key] = value;
            return obj;
        }
        function _toConsumableArray(arr) {
            return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
        }
        function _arrayWithoutHoles(arr) {
            if (Array.isArray(arr)) return _arrayLikeToArray(arr);
        }
        function _iterableToArray(iter) {
            if ("undefined" !== typeof Symbol && null != iter[Symbol.iterator] || null != iter["@@iterator"]) return Array.from(iter);
        }
        function _unsupportedIterableToArray(o, minLen) {
            if (!o) return;
            if ("string" === typeof o) return _arrayLikeToArray(o, minLen);
            var n = Object.prototype.toString.call(o).slice(8, -1);
            if ("Object" === n && o.constructor) n = o.constructor.name;
            if ("Map" === n || "Set" === n) return Array.from(o);
            if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
        }
        function _arrayLikeToArray(arr, len) {
            if (null == len || len > arr.length) len = arr.length;
            for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
            return arr2;
        }
        function _nonIterableSpread() {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        function _createForOfIteratorHelper(o, allowArrayLike) {
            var it = "undefined" !== typeof Symbol && o[Symbol.iterator] || o["@@iterator"];
            if (!it) {
                if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && "number" === typeof o.length) {
                    if (it) o = it;
                    var i = 0;
                    var F = function() {};
                    return {
                        s: F,
                        n: function() {
                            if (i >= o.length) return {
                                done: true
                            };
                            return {
                                done: false,
                                value: o[i++]
                            };
                        },
                        e: function(e) {
                            throw e;
                        },
                        f: F
                    };
                }
                throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            }
            var err, normalCompletion = true, didErr = false;
            return {
                s: function() {
                    it = it.call(o);
                },
                n: function() {
                    var step = it.next();
                    normalCompletion = step.done;
                    return step;
                },
                e: function(e) {
                    didErr = true;
                    err = e;
                },
                f: function() {
                    try {
                        if (!normalCompletion && null != it.return) it.return();
                    } finally {
                        if (didErr) throw err;
                    }
                }
            };
        }
        function _toPrimitive(input, hint) {
            if ("object" !== typeof input || null === input) return input;
            var prim = input[Symbol.toPrimitive];
            if (void 0 !== prim) {
                var res = prim.call(input, hint || "default");
                if ("object" !== typeof res) return res;
                throw new TypeError("@@toPrimitive must return a primitive value.");
            }
            return ("string" === hint ? String : Number)(input);
        }
        function _toPropertyKey(arg) {
            var key = _toPrimitive(arg, "string");
            return "symbol" === typeof key ? key : String(key);
        }
        var Constants = {
            DEFAULT_INSTANCE: "$default_instance",
            API_VERSION: 2,
            MAX_STRING_LENGTH: 4096,
            MAX_PROPERTY_KEYS: 1e3,
            IDENTIFY_EVENT: "$identify",
            GROUP_IDENTIFY_EVENT: "$groupidentify",
            EVENT_LOG_URL: "api.amplitude.com",
            EVENT_LOG_EU_URL: "api.eu.amplitude.com",
            DYNAMIC_CONFIG_URL: "regionconfig.amplitude.com",
            DYNAMIC_CONFIG_EU_URL: "regionconfig.eu.amplitude.com",
            LAST_EVENT_ID: "amplitude_lastEventId",
            LAST_EVENT_TIME: "amplitude_lastEventTime",
            LAST_IDENTIFY_ID: "amplitude_lastIdentifyId",
            LAST_SEQUENCE_NUMBER: "amplitude_lastSequenceNumber",
            SESSION_ID: "amplitude_sessionId",
            DEVICE_ID: "amplitude_deviceId",
            OPT_OUT: "amplitude_optOut",
            USER_ID: "amplitude_userId",
            DEVICE_ID_INDEX: 0,
            USER_ID_INDEX: 1,
            OPT_OUT_INDEX: 2,
            SESSION_ID_INDEX: 3,
            LAST_EVENT_TIME_INDEX: 4,
            EVENT_ID_INDEX: 5,
            IDENTIFY_ID_INDEX: 6,
            SEQUENCE_NUMBER_INDEX: 7,
            COOKIE_TEST_PREFIX: "amp_cookie_test",
            COOKIE_PREFIX: "amp",
            STORAGE_DEFAULT: "",
            STORAGE_COOKIES: "cookies",
            STORAGE_NONE: "none",
            STORAGE_LOCAL: "localStorage",
            STORAGE_SESSION: "sessionStorage",
            REVENUE_EVENT: "revenue_amount",
            REVENUE_PRODUCT_ID: "$productId",
            REVENUE_QUANTITY: "$quantity",
            REVENUE_PRICE: "$price",
            REVENUE_REVENUE_TYPE: "$revenueType",
            AMP_DEVICE_ID_PARAM: "amp_device_id",
            AMP_REFERRER_PARAM: "amp_referrer",
            REFERRER: "referrer",
            REFERRING_DOMAIN: "referring_domain",
            UTM_SOURCE: "utm_source",
            UTM_MEDIUM: "utm_medium",
            UTM_CAMPAIGN: "utm_campaign",
            UTM_TERM: "utm_term",
            UTM_CONTENT: "utm_content",
            ATTRIBUTION_EVENT: "[Amplitude] Attribution Captured",
            TRANSPORT_HTTP: "http",
            TRANSPORT_BEACON: "beacon"
        };
        var UTF8 = {
            encode: function(s) {
                var utftext = "";
                for (var n = 0; n < s.length; n++) {
                    var c = s.charCodeAt(n);
                    if (c < 128) utftext += String.fromCharCode(c); else if (c > 127 && c < 2048) {
                        utftext += String.fromCharCode(c >> 6 | 192);
                        utftext += String.fromCharCode(63 & c | 128);
                    } else {
                        utftext += String.fromCharCode(c >> 12 | 224);
                        utftext += String.fromCharCode(c >> 6 & 63 | 128);
                        utftext += String.fromCharCode(63 & c | 128);
                    }
                }
                return utftext;
            },
            decode: function(utftext) {
                var s = "";
                var i = 0;
                var c = 0, c1 = 0, c2 = 0;
                while (i < utftext.length) {
                    c = utftext.charCodeAt(i);
                    if (c < 128) {
                        s += String.fromCharCode(c);
                        i++;
                    } else if (c > 191 && c < 224) {
                        c1 = utftext.charCodeAt(i + 1);
                        s += String.fromCharCode((31 & c) << 6 | 63 & c1);
                        i += 2;
                    } else {
                        c1 = utftext.charCodeAt(i + 1);
                        c2 = utftext.charCodeAt(i + 2);
                        s += String.fromCharCode((15 & c) << 12 | (63 & c1) << 6 | 63 & c2);
                        i += 3;
                    }
                }
                return s;
            }
        };
        var GlobalScope = function() {
            if ("undefined" !== typeof globalThis) return globalThis;
            if (true) return window;
            if ("undefined" !== typeof self) return self;
            if ("undefined" !== typeof __webpack_require__.g) return __webpack_require__.g;
        }();
        var Base64 = {
            _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
            encode: function(input) {
                try {
                    if (GlobalScope.btoa && GlobalScope.atob) return GlobalScope.btoa(unescape(encodeURIComponent(input)));
                } catch (e) {}
                return Base64._encode(input);
            },
            _encode: function(input) {
                var output = "";
                var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
                var i = 0;
                input = UTF8.encode(input);
                while (i < input.length) {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);
                    enc1 = chr1 >> 2;
                    enc2 = (3 & chr1) << 4 | chr2 >> 4;
                    enc3 = (15 & chr2) << 2 | chr3 >> 6;
                    enc4 = 63 & chr3;
                    if (isNaN(chr2)) enc3 = enc4 = 64; else if (isNaN(chr3)) enc4 = 64;
                    output = output + Base64._keyStr.charAt(enc1) + Base64._keyStr.charAt(enc2) + Base64._keyStr.charAt(enc3) + Base64._keyStr.charAt(enc4);
                }
                return output;
            },
            decode: function(input) {
                try {
                    if (GlobalScope.btoa && GlobalScope.atob) return decodeURIComponent(escape(GlobalScope.atob(input)));
                } catch (e) {}
                return Base64._decode(input);
            },
            _decode: function(input) {
                var output = "";
                var chr1, chr2, chr3;
                var enc1, enc2, enc3, enc4;
                var i = 0;
                input = input.replace(/[^A-Za-z0-9+/=]/g, "");
                while (i < input.length) {
                    enc1 = Base64._keyStr.indexOf(input.charAt(i++));
                    enc2 = Base64._keyStr.indexOf(input.charAt(i++));
                    enc3 = Base64._keyStr.indexOf(input.charAt(i++));
                    enc4 = Base64._keyStr.indexOf(input.charAt(i++));
                    chr1 = enc1 << 2 | enc2 >> 4;
                    chr2 = (15 & enc2) << 4 | enc3 >> 2;
                    chr3 = (3 & enc3) << 6 | enc4;
                    output += String.fromCharCode(chr1);
                    if (64 !== enc3) output += String.fromCharCode(chr2);
                    if (64 !== enc4) output += String.fromCharCode(chr3);
                }
                output = UTF8.decode(output);
                return output;
            }
        };
        var amplitude_esm_toString = Object.prototype.toString;
        function type(val) {
            switch (amplitude_esm_toString.call(val)) {
              case "[object Date]":
                return "date";

              case "[object RegExp]":
                return "regexp";

              case "[object Arguments]":
                return "arguments";

              case "[object Array]":
                return "array";

              case "[object Error]":
                return "error";
            }
            if (null === val) return "null";
            if (void 0 === val) return "undefined";
            if (val !== val) return "nan";
            if (val && 1 === val.nodeType) return "element";
            if ("undefined" !== typeof Buffer && "function" === typeof Buffer.isBuffer && Buffer.isBuffer(val)) return "buffer";
            val = val.valueOf ? val.valueOf() : Object.prototype.valueOf.apply(val);
            return _typeof(val);
        }
        var logLevels = {
            DISABLE: 0,
            ERROR: 1,
            WARN: 2,
            INFO: 3
        };
        var logLevel = logLevels.WARN;
        var setLogLevel = function(logLevelName) {
            if (Object.prototype.hasOwnProperty.call(logLevels, logLevelName)) logLevel = logLevels[logLevelName];
        };
        var getLogLevel = function() {
            return logLevel;
        };
        var log = {
            error: function(s) {
                if (logLevel >= logLevels.ERROR) _log(s);
            },
            warn: function(s) {
                if (logLevel >= logLevels.WARN) _log(s);
            },
            info: function(s) {
                if (logLevel >= logLevels.INFO) _log(s);
            }
        };
        var _log = function(s) {
            try {
                console.log("[Amplitude] " + s);
            } catch (e) {}
        };
        var isEmptyString = function(str) {
            return !str || 0 === str.length;
        };
        var sessionStorageEnabled = function() {
            try {
                if (GlobalScope.sessionStorage) return true;
            } catch (e) {}
            return false;
        };
        var truncate = function truncate(value) {
            if ("array" === type(value)) for (var i = 0; i < value.length; i++) value[i] = truncate(value[i]); else if ("object" === type(value)) {
                for (var key in value) if (key in value) value[key] = truncate(value[key]);
            } else value = _truncateValue(value);
            return value;
        };
        var _truncateValue = function(value) {
            if ("string" === type(value)) return value.length > Constants.MAX_STRING_LENGTH ? value.substring(0, Constants.MAX_STRING_LENGTH) : value;
            return value;
        };
        var validateInput = function(input, name, expectedType) {
            if (type(input) !== expectedType) {
                log.error("Invalid " + name + " input type. Expected " + expectedType + " but received " + type(input));
                return false;
            }
            return true;
        };
        var validateDeviceId = function(deviceId) {
            if (!validateInput(deviceId, "deviceId", "string")) return false;
            if (deviceId.indexOf(".") >= 0) {
                log.error("Device IDs may not contain '.' characters. Value will be ignored: \"".concat(deviceId, '"'));
                return false;
            }
            return true;
        };
        var validateTransport = function(transport) {
            if (!validateInput(transport, "transport", "string")) return false;
            if (transport !== Constants.TRANSPORT_HTTP && transport !== Constants.TRANSPORT_BEACON) {
                log.error("transport value must be one of '".concat(Constants.TRANSPORT_BEACON, "' or '").concat(Constants.TRANSPORT_HTTP, "'"));
                return false;
            }
            if (transport !== Constants.TRANSPORT_HTTP && "undefined" !== typeof navigator && !navigator.sendBeacon) {
                log.error("browser does not support sendBeacon, so transport must be HTTP");
                return false;
            }
            return true;
        };
        var validateProperties = function(properties) {
            var propsType = type(properties);
            if ("object" !== propsType) {
                log.error("Error: invalid properties format. Expecting Javascript object, received " + propsType + ", ignoring");
                return {};
            }
            if (Object.keys(properties).length > Constants.MAX_PROPERTY_KEYS) {
                log.error("Error: too many properties (more than 1000), ignoring");
                return {};
            }
            var copy = {};
            for (var property in properties) {
                if (!Object.prototype.hasOwnProperty.call(properties, property)) continue;
                var key = property;
                var keyType = type(key);
                if ("string" !== keyType) {
                    key = String(key);
                    log.warn("WARNING: Non-string property key, received type " + keyType + ', coercing to string "' + key + '"');
                }
                var value = validatePropertyValue(key, properties[property]);
                if (null === value) continue;
                copy[key] = value;
            }
            return copy;
        };
        var invalidValueTypes = [ "nan", "function", "arguments", "regexp", "element" ];
        var validatePropertyValue = function validatePropertyValue(key, value) {
            var valueType = type(value);
            if (-1 !== invalidValueTypes.indexOf(valueType)) {
                log.warn('WARNING: Property key "' + key + '" with invalid value type ' + valueType + ", ignoring");
                value = null;
            } else if ("undefined" === valueType) value = null; else if ("error" === valueType) {
                value = String(value);
                log.warn('WARNING: Property key "' + key + '" with value type error, coercing to ' + value);
            } else if ("array" === valueType) {
                var arrayCopy = [];
                for (var i = 0; i < value.length; i++) {
                    var element = value[i];
                    var elemType = type(element);
                    if ("array" === elemType) {
                        log.warn("WARNING: Cannot have " + elemType + " nested in an array property value, skipping");
                        continue;
                    } else if ("object" === elemType) arrayCopy.push(validateProperties(element)); else arrayCopy.push(validatePropertyValue(key, element));
                }
                value = arrayCopy;
            } else if ("object" === valueType) value = validateProperties(value);
            return value;
        };
        var validateGroups = function(groups) {
            var groupsType = type(groups);
            if ("object" !== groupsType) {
                log.error("Error: invalid groups format. Expecting Javascript object, received " + groupsType + ", ignoring");
                return {};
            }
            var copy = {};
            for (var group in groups) {
                if (!Object.prototype.hasOwnProperty.call(groups, group)) continue;
                var key = group;
                var keyType = type(key);
                if ("string" !== keyType) {
                    key = String(key);
                    log.warn("WARNING: Non-string groupType, received type " + keyType + ', coercing to string "' + key + '"');
                }
                var value = validateGroupName(key, groups[group]);
                if (null === value) continue;
                copy[key] = value;
            }
            return copy;
        };
        var validateGroupName = function(key, groupName) {
            var groupNameType = type(groupName);
            if ("string" === groupNameType) return groupName;
            if ("date" === groupNameType || "number" === groupNameType || "boolean" === groupNameType) {
                groupName = String(groupName);
                log.warn("WARNING: Non-string groupName, received type " + groupNameType + ', coercing to string "' + groupName + '"');
                return groupName;
            }
            if ("array" === groupNameType) {
                var arrayCopy = [];
                for (var i = 0; i < groupName.length; i++) {
                    var element = groupName[i];
                    var elemType = type(element);
                    if ("array" === elemType || "object" === elemType) {
                        log.warn("WARNING: Skipping nested " + elemType + " in array groupName");
                        continue;
                    } else if ("string" === elemType) arrayCopy.push(element); else if ("date" === elemType || "number" === elemType || "boolean" === elemType) {
                        element = String(element);
                        log.warn("WARNING: Non-string groupName, received type " + elemType + ', coercing to string "' + element + '"');
                        arrayCopy.push(element);
                    }
                }
                return arrayCopy;
            }
            log.warn("WARNING: Non-string groupName, received type " + groupNameType + ". Please use strings or array of strings for groupName");
        };
        var getQueryParam = function(name, query) {
            name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
            var results = regex.exec(query);
            return null === results ? void 0 : decodeURIComponent(results[1].replace(/\+/g, " "));
        };
        var isWebWorkerEnvironment = function() {
            return "undefined" !== typeof WorkerGlobalScope;
        };
        var validateSessionId = function(sessionId) {
            if (validateInput(sessionId, "sessionId", "number") && new Date(sessionId).getTime() > 0) return true;
            log.error("sessionId value must in milliseconds since epoch (Unix Timestamp)");
            return false;
        };
        var getLocation = function() {
            return GlobalScope.location;
        };
        var getHost = function(url) {
            var defaultHostname = GlobalScope.location ? GlobalScope.location.hostname : "";
            if (url) {
                if ("undefined" !== typeof document) {
                    var a = document.createElement("a");
                    a.href = url;
                    return a.hostname || defaultHostname;
                }
                if ("function" === typeof URL) {
                    var u = new URL(url);
                    return u.hostname || defaultHostname;
                }
            }
            return defaultHostname;
        };
        var utils = {
            setLogLevel,
            getLogLevel,
            logLevels,
            log,
            isEmptyString,
            isWebWorkerEnvironment,
            getQueryParam,
            sessionStorageEnabled,
            truncate,
            validateGroups,
            validateInput,
            validateProperties,
            validateDeviceId,
            validateTransport,
            validateSessionId,
            getLocation,
            getHost
        };
        var get$1 = function(name) {
            try {
                var ca = document.cookie.split(";");
                var value = null;
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (" " === c.charAt(0)) c = c.substring(1, c.length);
                    if (0 === c.indexOf(name)) {
                        value = c.substring(name.length, c.length);
                        break;
                    }
                }
                return value;
            } catch (e) {
                return null;
            }
        };
        var getAll = function(name) {
            try {
                var cookieArray = document.cookie.split(";").map((function(c) {
                    return c.trimStart();
                }));
                var values = [];
                var _step, _iterator = _createForOfIteratorHelper(cookieArray);
                try {
                    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
                        var cookie = _step.value;
                        while (" " === cookie.charAt(0)) cookie = cookie.substring(1);
                        if (0 === cookie.indexOf(name)) values.push(cookie.substring(name.length));
                    }
                } catch (err) {
                    _iterator.e(err);
                } finally {
                    _iterator.f();
                }
                return values;
            } catch (e) {
                return [];
            }
        };
        var set$1 = function(name, value, opts) {
            var expires = null !== value ? opts.expirationDays : -1;
            if (expires) {
                var date = new Date;
                date.setTime(date.getTime() + 24 * expires * 60 * 60 * 1e3);
                expires = date;
            }
            var str = name + "=" + value;
            if (expires) str += "; expires=" + expires.toUTCString();
            str += "; path=/";
            if (opts.domain) str += "; domain=" + opts.domain;
            if (opts.secure) str += "; Secure";
            if (opts.sameSite) str += "; SameSite=" + opts.sameSite;
            document.cookie = str;
        };
        var getLastEventTime = function() {
            var cookie = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
            var strValue = cookie.split(".")[Constants.LAST_EVENT_TIME_INDEX];
            var parsedValue;
            if (strValue) parsedValue = parseInt(strValue, 32);
            if (parsedValue) return parsedValue; else {
                utils.log.warn("unable to parse malformed cookie: ".concat(cookie));
                return 0;
            }
        };
        var sortByEventTime = function(cookies) {
            return _toConsumableArray(cookies).sort((function(c1, c2) {
                var t1 = getLastEventTime(c1);
                var t2 = getLastEventTime(c2);
                return t2 - t1;
            }));
        };
        var areCookiesEnabled = function() {
            var opts = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            var cookieName = Constants.COOKIE_TEST_PREFIX;
            if ("undefined" === typeof document) return false;
            var _areCookiesEnabled = false;
            try {
                var uid = String(Date.now());
                set$1(cookieName, uid, opts);
                utils.log.info("Testing if cookies available");
                _areCookiesEnabled = get$1(cookieName + "=") === uid;
            } catch (e) {
                utils.log.warn('Error thrown when checking for cookies. Reason: "'.concat(e, '"'));
            } finally {
                utils.log.info("Cleaning up cookies availability test");
                set$1(cookieName, null, opts);
            }
            return _areCookiesEnabled;
        };
        var baseCookie = {
            set: set$1,
            get: get$1,
            getAll,
            getLastEventTime,
            sortByEventTime,
            areCookiesEnabled
        };
        var base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
        var base64Id = function() {
            var str = "";
            for (var i = 0; i < 22; ++i) str += base64Chars.charAt(Math.floor(64 * Math.random()));
            return str;
        };
        var topDomain = function(url) {
            var host = utils.getHost(url);
            var parts = host.split(".");
            var levels = [];
            var cname = "_tldtest_" + base64Id();
            if (utils.isWebWorkerEnvironment()) return "";
            for (var i = parts.length - 2; i >= 0; --i) levels.push(parts.slice(i).join("."));
            for (var _i = 0; _i < levels.length; ++_i) {
                var domain = levels[_i];
                var opts = {
                    domain: "." + domain
                };
                baseCookie.set(cname, 1, opts);
                if (baseCookie.get(cname)) {
                    baseCookie.set(cname, null, opts);
                    return domain;
                }
            }
            return "";
        };
        var _options = {
            expirationDays: void 0,
            domain: void 0
        };
        var amplitude_esm_reset = function() {
            _options = {
                expirationDays: void 0,
                domain: void 0
            };
        };
        var options = function(opts) {
            if (0 === arguments.length) return _options;
            opts = opts || {};
            _options.expirationDays = opts.expirationDays;
            _options.secure = opts.secure;
            _options.sameSite = opts.sameSite;
            var domain = !utils.isEmptyString(opts.domain) ? opts.domain : "." + topDomain(utils.getLocation().href);
            var token = Math.random();
            _options.domain = domain;
            set("amplitude_test", token);
            var stored = get("amplitude_test");
            if (!stored || stored !== token) domain = null;
            remove("amplitude_test");
            _options.domain = domain;
            return _options;
        };
        var _domainSpecific = function(name) {
            var suffix = "";
            if (_options.domain) suffix = "." === _options.domain.charAt(0) ? _options.domain.substring(1) : _options.domain;
            return name + suffix;
        };
        var get = function(name) {
            var nameEq = _domainSpecific(name) + "=";
            var value = baseCookie.get(nameEq);
            try {
                if (value) return JSON.parse(Base64.decode(value));
            } catch (e) {
                return null;
            }
            return null;
        };
        var set = function(name, value) {
            try {
                baseCookie.set(_domainSpecific(name), Base64.encode(JSON.stringify(value)), _options);
                return true;
            } catch (e) {
                return false;
            }
        };
        var setRaw = function(name, value) {
            try {
                baseCookie.set(_domainSpecific(name), value, _options);
                return true;
            } catch (e) {
                return false;
            }
        };
        var getRaw = function(name) {
            var nameEq = _domainSpecific(name) + "=";
            return baseCookie.get(nameEq);
        };
        var remove = function(name) {
            try {
                baseCookie.set(_domainSpecific(name), null, _options);
                return true;
            } catch (e) {
                return false;
            }
        };
        var Cookie = {
            reset: amplitude_esm_reset,
            options,
            get,
            set,
            remove,
            setRaw,
            getRaw
        };
        var WorkerStorage = function() {
            function WorkerStorage() {
                _classCallCheck(this, WorkerStorage);
                this.map = new Map;
                this.length = 0;
            }
            _createClass(WorkerStorage, [ {
                key: "key",
                value: function(index) {
                    var keys = Array.from(this.map.keys());
                    var key = keys[index];
                    return this.map.get(key);
                }
            }, {
                key: "getItem",
                value: function(key) {
                    return this.map.get(key);
                }
            }, {
                key: "setItem",
                value: function(key, value) {
                    if (!this.map.has(key)) this.length += 1;
                    this.map.set(key, value);
                }
            }, {
                key: "removeItem",
                value: function(key) {
                    if (this.map.has(key)) {
                        this.length -= 1;
                        this.map["delete"](key);
                    }
                }
            }, {
                key: "clear",
                value: function() {
                    this.map.clear();
                    this.length = 0;
                }
            } ]);
            return WorkerStorage;
        }();
        var localStorage;
        var windowLocalStorageAvailable = function() {
            var uid = new Date;
            var result;
            try {
                GlobalScope.localStorage.setItem(uid, uid);
                result = GlobalScope.localStorage.getItem(uid) === String(uid);
                GlobalScope.localStorage.removeItem(uid);
                return result;
            } catch (e) {}
            return false;
        };
        if (windowLocalStorageAvailable()) localStorage = GlobalScope.localStorage; else if ("undefined" !== typeof GlobalScope && GlobalScope.globalStorage) try {
            localStorage = GlobalScope.globalStorage[GlobalScope.location.hostname];
        } catch (e) {} else if ("undefined" !== typeof document) {
            var div = document.createElement("div"), attrKey = "localStorage";
            div.style.display = "none";
            document.getElementsByTagName("head")[0].appendChild(div);
            if (div.addBehavior) {
                div.addBehavior("#default#userdata");
                localStorage = {
                    length: 0,
                    setItem: function(k, v) {
                        div.load(attrKey);
                        if (!div.getAttribute(k)) this.length++;
                        div.setAttribute(k, v);
                        div.save(attrKey);
                    },
                    getItem: function(k) {
                        div.load(attrKey);
                        return div.getAttribute(k);
                    },
                    removeItem: function(k) {
                        div.load(attrKey);
                        if (div.getAttribute(k)) this.length--;
                        div.removeAttribute(k);
                        div.save(attrKey);
                    },
                    clear: function() {
                        div.load(attrKey);
                        var i = 0;
                        var attr;
                        while (attr = div.XMLDocument.documentElement.attributes[i++]) div.removeAttribute(attr.name);
                        div.save(attrKey);
                        this.length = 0;
                    },
                    key: function(k) {
                        div.load(attrKey);
                        return div.XMLDocument.documentElement.attributes[k];
                    }
                };
                div.load(attrKey);
                localStorage.length = div.XMLDocument.documentElement.attributes.length;
            }
        } else if (utils.isWebWorkerEnvironment()) localStorage = new WorkerStorage;
        if (!localStorage) localStorage = {
            length: 0,
            setItem: function(k, v) {},
            getItem: function(k) {},
            removeItem: function(k) {},
            clear: function() {},
            key: function(k) {}
        };
        var localStorage$1 = localStorage;
        var cookieStorage = function() {
            this.storage = null;
        };
        cookieStorage.prototype.getStorage = function(disableCookies) {
            if (null !== this.storage) return this.storage;
            if (!disableCookies && baseCookie.areCookiesEnabled()) this.storage = Cookie; else {
                var keyPrefix = "amp_cookiestore_";
                this.storage = {
                    _options: {
                        expirationDays: void 0,
                        domain: void 0,
                        secure: false
                    },
                    reset: function() {
                        this._options = {
                            expirationDays: void 0,
                            domain: void 0,
                            secure: false
                        };
                    },
                    options: function(opts) {
                        if (0 === arguments.length) return this._options;
                        opts = opts || {};
                        this._options.expirationDays = opts.expirationDays || this._options.expirationDays;
                        this._options.domain = opts.domain || this._options.domain || GlobalScope && GlobalScope.location && GlobalScope.location.hostname;
                        return this._options.secure = opts.secure || false;
                    },
                    get: function(name) {
                        try {
                            return JSON.parse(localStorage$1.getItem(keyPrefix + name));
                        } catch (e) {}
                        return null;
                    },
                    set: function(name, value) {
                        try {
                            localStorage$1.setItem(keyPrefix + name, JSON.stringify(value));
                            return true;
                        } catch (e) {}
                        return false;
                    },
                    remove: function(name) {
                        try {
                            localStorage$1.removeItem(keyPrefix + name);
                        } catch (e) {
                            return false;
                        }
                    }
                };
            }
            return this.storage;
        };
        var _storageOptionExists;
        var storageOptionExists = (_storageOptionExists = {}, _defineProperty(_storageOptionExists, Constants.STORAGE_COOKIES, true), 
        _defineProperty(_storageOptionExists, Constants.STORAGE_NONE, true), _defineProperty(_storageOptionExists, Constants.STORAGE_LOCAL, true), 
        _defineProperty(_storageOptionExists, Constants.STORAGE_SESSION, true), _storageOptionExists);
        var MetadataStorage = function() {
            function MetadataStorage(_ref) {
                var storageKey = _ref.storageKey, disableCookies = _ref.disableCookies, domain = _ref.domain, secure = _ref.secure, sameSite = _ref.sameSite, expirationDays = _ref.expirationDays, storage = _ref.storage;
                _classCallCheck(this, MetadataStorage);
                this.storageKey = storageKey;
                this.domain = domain;
                this.secure = secure;
                this.sameSite = sameSite;
                this.expirationDays = expirationDays;
                this.cookieDomain = "";
                var loc = utils.getLocation() ? utils.getLocation().href : void 0;
                var writableTopDomain = !disableCookies ? topDomain(loc) : "";
                this.cookieDomain = domain || (writableTopDomain ? "." + writableTopDomain : null);
                if (storageOptionExists[storage]) this.storage = storage; else {
                    var disableCookieStorage = disableCookies || !baseCookie.areCookiesEnabled({
                        domain: this.cookieDomain,
                        secure: this.secure,
                        sameSite: this.sameSite,
                        expirationDays: this.expirationDays
                    });
                    if (disableCookieStorage) this.storage = Constants.STORAGE_LOCAL; else this.storage = Constants.STORAGE_COOKIES;
                }
            }
            _createClass(MetadataStorage, [ {
                key: "getCookieStorageKey",
                value: function() {
                    if (!this.domain) return this.storageKey;
                    var suffix = "." === this.domain.charAt(0) ? this.domain.substring(1) : this.domain;
                    return "".concat(this.storageKey).concat(suffix ? "_".concat(suffix) : "");
                }
            }, {
                key: "save",
                value: function(_ref2) {
                    var deviceId = _ref2.deviceId, userId = _ref2.userId, optOut = _ref2.optOut, sessionId = _ref2.sessionId, lastEventTime = _ref2.lastEventTime, eventId = _ref2.eventId, identifyId = _ref2.identifyId, sequenceNumber = _ref2.sequenceNumber;
                    if (this.storage === Constants.STORAGE_NONE) return;
                    var value = [ deviceId, Base64.encode(userId || ""), optOut ? "1" : "", sessionId ? sessionId.toString(32) : "0", lastEventTime ? lastEventTime.toString(32) : "0", eventId ? eventId.toString(32) : "0", identifyId ? identifyId.toString(32) : "0", sequenceNumber ? sequenceNumber.toString(32) : "0" ].join(".");
                    switch (this.storage) {
                      case Constants.STORAGE_SESSION:
                        if (GlobalScope.sessionStorage) GlobalScope.sessionStorage.setItem(this.storageKey, value);
                        break;

                      case Constants.STORAGE_LOCAL:
                        localStorage$1.setItem(this.storageKey, value);
                        break;

                      case Constants.STORAGE_COOKIES:
                        this.saveCookie(value);
                        break;
                    }
                }
            }, {
                key: "saveCookie",
                value: function(value) {
                    baseCookie.set(this.getCookieStorageKey(), value, {
                        domain: this.cookieDomain,
                        secure: this.secure,
                        sameSite: this.sameSite,
                        expirationDays: this.expirationDays
                    });
                }
            }, {
                key: "load",
                value: function() {
                    var _this = this;
                    var str;
                    if (this.storage === Constants.STORAGE_COOKIES) {
                        var cookieKey = this.getCookieStorageKey() + "=";
                        var allCookies = baseCookie.getAll(cookieKey);
                        if (0 === allCookies.length || 1 === allCookies.length) str = allCookies[0]; else {
                            var latestCookie = baseCookie.sortByEventTime(allCookies)[0];
                            allCookies.forEach((function() {
                                return baseCookie.set(_this.getCookieStorageKey(), null, {});
                            }));
                            this.saveCookie(latestCookie);
                            str = baseCookie.get(cookieKey);
                        }
                    }
                    if (!str) str = localStorage$1.getItem(this.storageKey);
                    if (!str) try {
                        str = GlobalScope.sessionStorage && GlobalScope.sessionStorage.getItem(this.storageKey);
                    } catch (e) {
                        utils.log.info('window.sessionStorage unavailable. Reason: "'.concat(e, '"'));
                    }
                    if (!str) return null;
                    var values = str.split(".");
                    var userId = null;
                    if (values[Constants.USER_ID_INDEX]) try {
                        userId = Base64.decode(values[Constants.USER_ID_INDEX]);
                    } catch (e) {
                        userId = null;
                    }
                    return {
                        deviceId: values[Constants.DEVICE_ID_INDEX],
                        userId,
                        optOut: "1" === values[Constants.OPT_OUT_INDEX],
                        sessionId: parseInt(values[Constants.SESSION_ID_INDEX], 32),
                        lastEventTime: parseInt(values[Constants.LAST_EVENT_TIME_INDEX], 32),
                        eventId: parseInt(values[Constants.EVENT_ID_INDEX], 32),
                        identifyId: parseInt(values[Constants.IDENTIFY_ID_INDEX], 32),
                        sequenceNumber: parseInt(values[Constants.SEQUENCE_NUMBER_INDEX], 32)
                    };
                }
            }, {
                key: "clear",
                value: function() {
                    var str;
                    if (this.storage === Constants.STORAGE_COOKIES) {
                        str = baseCookie.get(this.getCookieStorageKey() + "=");
                        baseCookie.set(this.getCookieStorageKey(), null, {
                            domain: this.cookieDomain,
                            secure: this.secure,
                            sameSite: this.sameSite,
                            expirationDays: 0
                        });
                    }
                    if (!str) {
                        str = localStorage$1.getItem(this.storageKey);
                        localStorage$1.clear();
                    }
                    if (!str) try {
                        str = GlobalScope.sessionStorage && GlobalScope.sessionStorage.getItem(this.storageKey);
                        GlobalScope.sessionStorage.clear();
                    } catch (e) {
                        utils.log.info('window.sessionStorage unavailable. Reason: "'.concat(e, '"'));
                    }
                    return !!str;
                }
            } ]);
            return MetadataStorage;
        }();
        var getUtmData = function(rawCookie, query) {
            var cookie = rawCookie ? "?" + rawCookie.split(".").slice(-1)[0].replace(/\|/g, "&") : "";
            var fetchParam = function(queryName, query, cookieName, cookie) {
                return utils.getQueryParam(queryName, query) || utils.getQueryParam(cookieName, cookie);
            };
            var utmSource = fetchParam(Constants.UTM_SOURCE, query, "utmcsr", cookie);
            var utmMedium = fetchParam(Constants.UTM_MEDIUM, query, "utmcmd", cookie);
            var utmCampaign = fetchParam(Constants.UTM_CAMPAIGN, query, "utmccn", cookie);
            var utmTerm = fetchParam(Constants.UTM_TERM, query, "utmctr", cookie);
            var utmContent = fetchParam(Constants.UTM_CONTENT, query, "utmcct", cookie);
            var utmData = {};
            var addIfNotNull = function(key, value) {
                if (!utils.isEmptyString(value)) utmData[key] = value;
            };
            addIfNotNull(Constants.UTM_SOURCE, utmSource);
            addIfNotNull(Constants.UTM_MEDIUM, utmMedium);
            addIfNotNull(Constants.UTM_CAMPAIGN, utmCampaign);
            addIfNotNull(Constants.UTM_TERM, utmTerm);
            addIfNotNull(Constants.UTM_CONTENT, utmContent);
            return utmData;
        };
        var AMP_OP_ADD = "$add";
        var AMP_OP_APPEND = "$append";
        var AMP_OP_CLEAR_ALL = "$clearAll";
        var AMP_OP_PREPEND = "$prepend";
        var AMP_OP_SET = "$set";
        var AMP_OP_SET_ONCE = "$setOnce";
        var AMP_OP_UNSET = "$unset";
        var AMP_OP_PREINSERT = "$preInsert";
        var AMP_OP_POSTINSERT = "$postInsert";
        var AMP_OP_REMOVE = "$remove";
        var Identify = function() {
            this.userPropertiesOperations = {};
            this.properties = [];
        };
        Identify.prototype.add = function(property, value) {
            if ("number" === type(value) || "string" === type(value)) this._addOperation(AMP_OP_ADD, property, value); else utils.log.error("Unsupported type for value: " + type(value) + ", expecting number or string");
            return this;
        };
        Identify.prototype.append = function(property, value) {
            this._addOperation(AMP_OP_APPEND, property, value);
            return this;
        };
        Identify.prototype.clearAll = function() {
            if (Object.keys(this.userPropertiesOperations).length > 0) {
                if (!Object.prototype.hasOwnProperty.call(this.userPropertiesOperations, AMP_OP_CLEAR_ALL)) utils.log.error("Need to send $clearAll on its own Identify object without any other operations, skipping $clearAll");
                return this;
            }
            this.userPropertiesOperations[AMP_OP_CLEAR_ALL] = "-";
            return this;
        };
        Identify.prototype.prepend = function(property, value) {
            this._addOperation(AMP_OP_PREPEND, property, value);
            return this;
        };
        Identify.prototype.set = function(property, value) {
            this._addOperation(AMP_OP_SET, property, value);
            return this;
        };
        Identify.prototype.setOnce = function(property, value) {
            this._addOperation(AMP_OP_SET_ONCE, property, value);
            return this;
        };
        Identify.prototype.unset = function(property) {
            this._addOperation(AMP_OP_UNSET, property, "-");
            return this;
        };
        Identify.prototype.preInsert = function(property, value) {
            this._addOperation(AMP_OP_PREINSERT, property, value);
            return this;
        };
        Identify.prototype.postInsert = function(property, value) {
            this._addOperation(AMP_OP_POSTINSERT, property, value);
            return this;
        };
        Identify.prototype.remove = function(property, value) {
            this._addOperation(AMP_OP_REMOVE, property, value);
            return this;
        };
        Identify.prototype._addOperation = function(operation, property, value) {
            if (Object.prototype.hasOwnProperty.call(this.userPropertiesOperations, AMP_OP_CLEAR_ALL)) {
                utils.log.error("This identify already contains a $clearAll operation, skipping operation " + operation);
                return;
            }
            if (-1 !== this.properties.indexOf(property)) {
                utils.log.error('User property "' + property + '" already used in this identify, skipping operation ' + operation);
                return;
            }
            if (!Object.prototype.hasOwnProperty.call(this.userPropertiesOperations, operation)) this.userPropertiesOperations[operation] = {};
            this.userPropertiesOperations[operation][property] = value;
            this.properties.push(property);
        };
        var Request = function(url, data, headers) {
            this.url = url;
            this.data = data || {};
            this.headers = headers;
        };
        var CORS_HEADER = "Cross-Origin-Resource-Policy";
        function setHeaders(xhr, headers) {
            for (var header in headers) {
                if (header === CORS_HEADER && !headers[header]) continue;
                xhr.setRequestHeader(header, headers[header]);
            }
        }
        Request.prototype.send = function(callback) {
            var isIE = GlobalScope.XDomainRequest ? true : false;
            if (isIE) {
                var xdr = new GlobalScope.XDomainRequest;
                xdr.open("POST", this.url, true);
                xdr.onload = function() {
                    callback(200, xdr.responseText);
                };
                xdr.onerror = function() {
                    if ("Request Entity Too Large" === xdr.responseText) callback(413, xdr.responseText); else callback(500, xdr.responseText);
                };
                xdr.ontimeout = function() {};
                xdr.onprogress = function() {};
                xdr.send(query_string.stringify(this.data));
            } else if ("undefined" !== typeof XMLHttpRequest) {
                var xhr = new XMLHttpRequest;
                xhr.open("POST", this.url, true);
                xhr.onreadystatechange = function() {
                    if (4 === xhr.readyState) callback(xhr.status, xhr.responseText);
                };
                setHeaders(xhr, this.headers);
                xhr.send(query_string.stringify(this.data));
            } else {
                var responseStatus = void 0;
                fetch(this.url, {
                    method: "POST",
                    headers: this.headers,
                    body: query_string.stringify(this.data)
                }).then((function(response) {
                    responseStatus = response.status;
                    return response.text();
                })).then((function(responseText) {
                    callback(responseStatus, responseText);
                }));
            }
        };
        var Revenue = function() {
            this._price = null;
            this._productId = null;
            this._quantity = 1;
            this._revenueType = null;
            this._properties = null;
        };
        Revenue.prototype.setProductId = function(productId) {
            if ("string" !== type(productId)) utils.log.error("Unsupported type for productId: " + type(productId) + ", expecting string"); else if (utils.isEmptyString(productId)) utils.log.error("Invalid empty productId"); else this._productId = productId;
            return this;
        };
        Revenue.prototype.setQuantity = function(quantity) {
            if ("number" !== type(quantity)) utils.log.error("Unsupported type for quantity: " + type(quantity) + ", expecting number"); else this._quantity = parseInt(quantity);
            return this;
        };
        Revenue.prototype.setPrice = function(price) {
            if ("number" !== type(price)) utils.log.error("Unsupported type for price: " + type(price) + ", expecting number"); else this._price = price;
            return this;
        };
        Revenue.prototype.setRevenueType = function(revenueType) {
            if ("string" !== type(revenueType)) utils.log.error("Unsupported type for revenueType: " + type(revenueType) + ", expecting string"); else this._revenueType = revenueType;
            return this;
        };
        Revenue.prototype.setEventProperties = function(eventProperties) {
            if ("object" !== type(eventProperties)) utils.log.error("Unsupported type for eventProperties: " + type(eventProperties) + ", expecting object"); else this._properties = utils.validateProperties(eventProperties);
            return this;
        };
        Revenue.prototype._isValidRevenue = function() {
            if ("number" !== type(this._price)) {
                utils.log.error("Invalid revenue, need to set price field");
                return false;
            }
            return true;
        };
        Revenue.prototype._toJSONObject = function() {
            var obj = "object" === type(this._properties) ? this._properties : {};
            if (null !== this._productId) obj[Constants.REVENUE_PRODUCT_ID] = this._productId;
            if (null !== this._quantity) obj[Constants.REVENUE_QUANTITY] = this._quantity;
            if (null !== this._price) obj[Constants.REVENUE_PRICE] = this._price;
            if (null !== this._revenueType) obj[Constants.REVENUE_REVENUE_TYPE] = this._revenueType;
            return obj;
        };
        var uuid = function uuid(a) {
            return a ? (a ^ 16 * Math.random() >> a / 4).toString(16) : ([ 1e7 ] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid);
        };
        var amplitude_esm_getLanguage = function() {
            return "undefined" !== typeof navigator && (navigator.languages && navigator.languages[0] || navigator.language || navigator.userLanguage) || "";
        };
        var language = {
            getLanguage: amplitude_esm_getLanguage
        };
        var AmplitudeServerZone = {
            US: "US",
            EU: "EU"
        };
        var getEventLogApi = function(serverZone) {
            var eventLogUrl = Constants.EVENT_LOG_URL;
            switch (serverZone) {
              case AmplitudeServerZone.EU:
                eventLogUrl = Constants.EVENT_LOG_EU_URL;
                break;

              case AmplitudeServerZone.US:
                eventLogUrl = Constants.EVENT_LOG_URL;
                break;
            }
            return eventLogUrl;
        };
        var getDynamicConfigApi = function(serverZone) {
            var dynamicConfigUrl = Constants.DYNAMIC_CONFIG_URL;
            switch (serverZone) {
              case AmplitudeServerZone.EU:
                dynamicConfigUrl = Constants.DYNAMIC_CONFIG_EU_URL;
                break;

              case AmplitudeServerZone.US:
                dynamicConfigUrl = Constants.DYNAMIC_CONFIG_URL;
                break;
            }
            return dynamicConfigUrl;
        };
        var version = "8.21.9";
        var DEFAULT_OPTIONS = {
            apiEndpoint: Constants.EVENT_LOG_URL,
            batchEvents: false,
            cookieExpiration: 365,
            cookieName: "amplitude_id",
            sameSiteCookie: "Lax",
            cookieForceUpgrade: false,
            deferInitialization: false,
            disableCookies: false,
            deviceIdFromUrlParam: false,
            domain: "",
            eventUploadPeriodMillis: 30 * 1e3,
            eventUploadThreshold: 30,
            forceHttps: true,
            includeFbclid: false,
            includeGclid: false,
            includeReferrer: false,
            includeUtm: false,
            ingestionMetadata: {
                sourceName: "",
                sourceVersion: ""
            },
            language: language.getLanguage(),
            library: {
                name: "amplitude-js",
                version
            },
            logLevel: "WARN",
            logAttributionCapturedEvent: false,
            optOut: false,
            onError: function() {},
            onExitPage: function() {},
            onNewSessionStart: function() {},
            plan: {
                branch: "",
                source: "",
                version: "",
                versionId: ""
            },
            platform: "Web",
            savedMaxCount: 1e3,
            saveEvents: true,
            saveParamsReferrerOncePerSession: true,
            secureCookie: false,
            sessionTimeout: 30 * 60 * 1e3,
            storage: Constants.STORAGE_DEFAULT,
            trackingOptions: {
                city: true,
                country: true,
                carrier: true,
                device_manufacturer: true,
                device_model: true,
                dma: true,
                ip_address: true,
                language: true,
                os_name: true,
                os_version: true,
                platform: true,
                region: true,
                version_name: true
            },
            transport: Constants.TRANSPORT_HTTP,
            unsetParamsReferrerOnNewSession: false,
            unsentKey: "amplitude_unsent",
            unsentIdentifyKey: "amplitude_unsent_identify",
            uploadBatchSize: 100,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "Cross-Origin-Resource-Policy": "cross-origin"
            },
            serverZone: AmplitudeServerZone.US,
            useDynamicConfig: false,
            serverZoneBasedApi: false,
            sessionId: null,
            partnerId: ""
        };
        var ConfigManager = function() {
            function ConfigManager() {
                _classCallCheck(this, ConfigManager);
                if (!ConfigManager.instance) {
                    this.ingestionEndpoint = Constants.EVENT_LOG_URL;
                    ConfigManager.instance = this;
                }
                return ConfigManager.instance;
            }
            _createClass(ConfigManager, [ {
                key: "refresh",
                value: function(serverZone, forceHttps, callback) {
                    var protocol = "https";
                    if (!forceHttps && "https:" !== GlobalScope.location.protocol) protocol = "http";
                    var dynamicConfigUrl = protocol + "://" + getDynamicConfigApi(serverZone);
                    var self = this;
                    var isIE = GlobalScope.XDomainRequest ? true : false;
                    if (isIE) {
                        var xdr = new GlobalScope.XDomainRequest;
                        xdr.open("GET", dynamicConfigUrl, true);
                        xdr.onload = function() {
                            var response = JSON.parse(xdr.responseText);
                            self.ingestionEndpoint = response["ingestionEndpoint"];
                            if (callback) callback();
                        };
                        xdr.onerror = function() {};
                        xdr.ontimeout = function() {};
                        xdr.onprogress = function() {};
                        xdr.send();
                    } else {
                        var xhr = new XMLHttpRequest;
                        xhr.open("GET", dynamicConfigUrl, true);
                        xhr.onreadystatechange = function() {
                            if (4 === xhr.readyState && 200 === xhr.status) {
                                var response = JSON.parse(xhr.responseText);
                                self.ingestionEndpoint = response["ingestionEndpoint"];
                                if (callback) callback();
                            }
                        };
                        xhr.send();
                    }
                }
            } ]);
            return ConfigManager;
        }();
        var instance$1 = new ConfigManager;
        var AmplitudeClient = function(instanceName) {
            if (!isBrowserEnv() && !utils.isWebWorkerEnvironment()) utils.log.warn("amplitude-js will not work in a non-browser environment. If you are planning to add Amplitude to a node environment, please use @amplitude/node");
            this._instanceName = utils.isEmptyString(instanceName) ? Constants.DEFAULT_INSTANCE : instanceName.toLowerCase();
            this._unsentEvents = [];
            this._unsentIdentifys = [];
            this.options = _objectSpread2(_objectSpread2({}, DEFAULT_OPTIONS), {}, {
                headers: _objectSpread2({}, DEFAULT_OPTIONS.headers),
                ingestionMetadata: _objectSpread2({}, DEFAULT_OPTIONS.ingestionMetadata),
                library: _objectSpread2({}, DEFAULT_OPTIONS.library),
                plan: _objectSpread2({}, DEFAULT_OPTIONS.plan),
                trackingOptions: _objectSpread2({}, DEFAULT_OPTIONS.trackingOptions)
            });
            this._q = [];
            this._sending = false;
            this._updateScheduled = false;
            this._onInitCallbacks = [];
            this._onNewSessionStartCallbacks = [];
            this._eventId = 0;
            this._identifyId = 0;
            this._lastEventTime = null;
            this._newSession = false;
            this._sequenceNumber = 0;
            this._sessionId = null;
            this._isInitialized = false;
            this._connector = null;
            this._userAgent = "undefined" !== typeof navigator && navigator && navigator.userAgent || null;
            this._ua = new (ua_parser_default())(this._userAgent).getResult();
        };
        AmplitudeClient.prototype.Identify = Identify;
        AmplitudeClient.prototype.Revenue = Revenue;
        AmplitudeClient.prototype.init = function(apiKey, opt_userId, opt_config, opt_callback) {
            var _this = this;
            if ("string" !== type(apiKey) || utils.isEmptyString(apiKey)) {
                utils.log.error("Invalid apiKey. Please re-initialize with a valid apiKey");
                return;
            }
            try {
                this._connector = AnalyticsConnector.getInstance(this._instanceName);
                _parseConfig(this.options, opt_config);
                if ((isBrowserEnv() || utils.isWebWorkerEnvironment()) && void 0 !== GlobalScope.Prototype && Array.prototype.toJSON) {
                    prototypeJsFix();
                    utils.log.warn("Prototype.js injected Array.prototype.toJSON. Deleting Array.prototype.toJSON to prevent double-stringify");
                }
                if (this.options.cookieName !== DEFAULT_OPTIONS.cookieName) utils.log.warn("The cookieName option is deprecated. We will be ignoring it for newer cookies");
                if (this.options.serverZoneBasedApi) this.options.apiEndpoint = getEventLogApi(this.options.serverZone);
                this._refreshDynamicConfig();
                this.options.apiKey = apiKey;
                this._storageSuffix = "_" + apiKey + (this._instanceName === Constants.DEFAULT_INSTANCE ? "" : "_" + this._instanceName);
                this._storageSuffixV5 = apiKey.slice(0, 6);
                this._oldCookiename = this.options.cookieName + this._storageSuffix;
                this._unsentKey = this.options.unsentKey + this._storageSuffix;
                this._unsentIdentifyKey = this.options.unsentIdentifyKey + this._storageSuffix;
                this._cookieName = Constants.COOKIE_PREFIX + "_" + this._storageSuffixV5;
                this.cookieStorage = (new cookieStorage).getStorage(this.options.disableCookies);
                this.cookieStorage.options({
                    expirationDays: this.options.cookieExpiration,
                    domain: this.options.domain,
                    secure: this.options.secureCookie,
                    sameSite: this.options.sameSiteCookie
                });
                this._metadataStorage = new MetadataStorage({
                    storageKey: this._cookieName,
                    disableCookies: this.options.disableCookies,
                    expirationDays: this.options.cookieExpiration,
                    domain: this.options.domain,
                    secure: this.options.secureCookie,
                    sameSite: this.options.sameSiteCookie,
                    storage: this.options.storage
                });
                var hasOldCookie = !!this.cookieStorage.get(this._oldCookiename);
                var hasNewCookie = !!this._metadataStorage.load();
                this._useOldCookie = !hasNewCookie && hasOldCookie && !this.options.cookieForceUpgrade;
                var hasCookie = hasNewCookie || hasOldCookie;
                if (this.options.deferInitialization && !hasCookie) {
                    this._deferInitialization(apiKey, opt_userId, opt_config, opt_callback);
                    return;
                }
                this.options.domain = this.cookieStorage.options().domain;
                if ("string" === type(this.options.logLevel)) utils.setLogLevel(this.options.logLevel);
                var trackingOptions = _generateApiPropertiesTrackingConfig(this);
                this._apiPropertiesTrackingOptions = Object.keys(trackingOptions).length > 0 ? {
                    tracking_options: trackingOptions
                } : {};
                if (this.options.cookieForceUpgrade && hasOldCookie) {
                    if (!hasNewCookie) _upgradeCookieData(this);
                    this.cookieStorage.remove(this._oldCookiename);
                }
                _loadCookieData(this);
                this._pendingReadStorage = true;
                var initFromStorage = function(storedDeviceId) {
                    if (opt_config && opt_config.deviceId && !utils.validateDeviceId(opt_config.deviceId)) {
                        utils.log.error('Invalid device ID rejected. Randomly generated UUID will be used instead of "'.concat(opt_config.deviceId, '"'));
                        delete opt_config.deviceId;
                    }
                    _this.options.deviceId = _this._getInitialDeviceId(opt_config && opt_config.deviceId, storedDeviceId);
                    _this.options.userId = "string" === type(opt_userId) && !utils.isEmptyString(opt_userId) && opt_userId || "number" === type(opt_userId) && opt_userId.toString() || _this.options.userId || null;
                    var now = (new Date).getTime();
                    var startNewSession = !_this._sessionId || !_this._lastEventTime || now - _this._lastEventTime > _this.options.sessionTimeout || _this.options.sessionId;
                    if (startNewSession) {
                        if (_this.options.unsetParamsReferrerOnNewSession) _this._unsetUTMParams();
                        _this._newSession = true;
                        _this._sessionId = _this.options.sessionId || now;
                        _this.options.sessionId = void 0;
                        if (_this.options.saveParamsReferrerOncePerSession) _this._trackParamsAndReferrer();
                    }
                    if (!_this.options.saveParamsReferrerOncePerSession) _this._trackParamsAndReferrer();
                    if (_this.options.saveEvents) {
                        _validateUnsentEventQueue(_this._unsentEvents);
                        _validateUnsentEventQueue(_this._unsentIdentifys);
                    }
                    _this._lastEventTime = now;
                    _saveCookieData(_this);
                    _this._pendingReadStorage = false;
                    _this._sendEventsIfReady();
                    for (var i = 0; i < _this._onInitCallbacks.length; i++) _this._onInitCallbacks[i](_this);
                    _this._onInitCallbacks = [];
                    _this._isInitialized = true;
                    if (startNewSession) _this._runNewSessionStartCallbacks();
                };
                if (this.options.saveEvents) {
                    this._unsentEvents = this._loadSavedUnsentEvents(this.options.unsentKey).map((function(event) {
                        return {
                            event
                        };
                    })).concat(this._unsentEvents);
                    this._unsentIdentifys = this._loadSavedUnsentEvents(this.options.unsentIdentifyKey).map((function(event) {
                        return {
                            event
                        };
                    })).concat(this._unsentIdentifys);
                }
                if (opt_config && opt_config.onNewSessionStart) this.onNewSessionStart(this.options.onNewSessionStart);
                initFromStorage();
                this.runQueuedFunctions();
                if ("function" === type(opt_callback)) opt_callback(this);
                var onExitPage = this.options.onExitPage;
                if ("function" === type(onExitPage) && GlobalScope.addEventListener) if (!this.pageHandlersAdded) {
                    this.pageHandlersAdded = true;
                    var handleVisibilityChange = function() {
                        var prevTransport = _this.options.transport;
                        _this.setTransport(Constants.TRANSPORT_BEACON);
                        onExitPage();
                        _this.setTransport(prevTransport);
                    };
                    GlobalScope.addEventListener("pagehide", (function() {
                        handleVisibilityChange();
                    }), false);
                }
                this._connector.eventBridge.setEventReceiver((function(event) {
                    _this._logEvent(event.eventType, event.eventProperties, event.userProperties);
                }));
                var editor = this._connector.identityStore.editIdentity();
                if (this.options.deviceId) editor.setDeviceId(this.options.deviceId);
                if (this.options.userId) editor.setUserId(this.options.userId);
                editor.commit();
            } catch (err) {
                utils.log.error(err);
                if (opt_config && "function" === type(opt_config.onError)) opt_config.onError(err);
            }
        };
        AmplitudeClient.prototype._runNewSessionStartCallbacks = function() {
            for (var i = 0; i < this._onNewSessionStartCallbacks.length; i++) this._onNewSessionStartCallbacks[i](this);
        };
        AmplitudeClient.prototype.deleteLowerLevelDomainCookies = function() {
            var host = utils.getHost();
            var cookieHost = this.options.domain && "." === this.options.domain[0] ? this.options.domain.slice(1) : this.options.domain;
            if (!cookieHost || !utils.isWebWorkerEnvironment()) return;
            if (host !== cookieHost) if (new RegExp(cookieHost + "$").test(host)) {
                var hostParts = host.split(".");
                var cookieHostParts = cookieHost.split(".");
                for (var i = hostParts.length; i > cookieHostParts.length; --i) {
                    var deleteDomain = hostParts.slice(hostParts.length - i).join(".");
                    baseCookie.set(this._cookieName, null, {
                        domain: "." + deleteDomain
                    });
                }
                baseCookie.set(this._cookieName, null, {});
            }
        };
        AmplitudeClient.prototype._getInitialDeviceId = function(configDeviceId, storedDeviceId) {
            if (configDeviceId) return configDeviceId;
            if (this.options.deviceIdFromUrlParam) {
                var deviceIdFromUrlParam = this._getDeviceIdFromUrlParam(this._getUrlParams());
                if (deviceIdFromUrlParam) return deviceIdFromUrlParam;
            }
            if (this.options.deviceId) return this.options.deviceId;
            if (storedDeviceId) return storedDeviceId;
            return base64Id();
        };
        var _validateUnsentEventQueue = function(queue) {
            for (var i = 0; i < queue.length; i++) {
                var userProperties = queue[i].event.user_properties;
                var eventProperties = queue[i].event.event_properties;
                var groups = queue[i].event.groups;
                queue[i].event.user_properties = utils.validateProperties(userProperties);
                queue[i].event.event_properties = utils.validateProperties(eventProperties);
                queue[i].event.groups = utils.validateGroups(groups);
            }
        };
        AmplitudeClient.prototype._trackParamsAndReferrer = function() {
            var utmProperties;
            var referrerProperties;
            var gclidProperties;
            var fbclidProperties;
            if (this.options.includeUtm) utmProperties = this._initUtmData();
            if (this.options.includeReferrer) referrerProperties = this._saveReferrer(this._getReferrer());
            if (this.options.includeGclid) gclidProperties = this._saveGclid(this._getUrlParams());
            if (this.options.includeFbclid) fbclidProperties = this._saveFbclid(this._getUrlParams());
            if (this.options.logAttributionCapturedEvent) {
                var attributionProperties = _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, utmProperties), referrerProperties), gclidProperties), fbclidProperties);
                if (Object.keys(attributionProperties).length > 0) this.logEvent(Constants.ATTRIBUTION_EVENT, attributionProperties);
            }
        };
        var _parseConfig = function _parseConfig(options, config) {
            if ("object" !== type(config)) return;
            var freeFormObjectKeys = new Set([ "headers" ]);
            var zeroAllowedKeys = new Set([ "eventUploadPeriodMillis" ]);
            var parseValidateAndLoad = function(key) {
                if (!Object.prototype.hasOwnProperty.call(options, key)) return;
                var inputValue = config[key];
                var expectedType = type(options[key]);
                if ("transport" === key && !utils.validateTransport(inputValue)) return; else if ("sessionId" === key && null !== inputValue) {
                    options[key] = utils.validateSessionId(inputValue) ? inputValue : null;
                    return;
                } else if (!utils.validateInput(inputValue, key + " option", expectedType)) return;
                if ("boolean" === expectedType) options[key] = !!inputValue; else if ("string" === expectedType && !utils.isEmptyString(inputValue) || "number" === expectedType && (inputValue > 0 || 0 === inputValue && zeroAllowedKeys.has(key)) || "function" === expectedType) options[key] = inputValue; else if ("object" === expectedType) _parseConfig(options[key], inputValue);
            };
            for (var key in config) if (freeFormObjectKeys.has(key)) options[key] = _objectSpread2(_objectSpread2({}, options[key]), config[key]); else if (Object.prototype.hasOwnProperty.call(config, key)) parseValidateAndLoad(key);
        };
        AmplitudeClient.prototype.runQueuedFunctions = function() {
            var queue = this._q;
            this._q = [];
            for (var i = 0; i < queue.length; i++) {
                var fn = this[queue[i][0]];
                if ("function" === type(fn)) fn.apply(this, queue[i].slice(1));
            }
        };
        AmplitudeClient.prototype._apiKeySet = function(methodName) {
            if (utils.isEmptyString(this.options.apiKey)) {
                utils.log.error("Invalid apiKey. Please set a valid apiKey with init() before calling " + methodName);
                return false;
            }
            return true;
        };
        AmplitudeClient.prototype._loadSavedUnsentEvents = function(unsentKey) {
            var savedUnsentEventsString = this._getFromStorage(localStorage$1, unsentKey);
            var unsentEvents = this._parseSavedUnsentEventsString(savedUnsentEventsString, unsentKey);
            this._setInStorage(localStorage$1, unsentKey, JSON.stringify(unsentEvents));
            return unsentEvents;
        };
        AmplitudeClient.prototype._parseSavedUnsentEventsString = function(savedUnsentEventsString, unsentKey) {
            if (utils.isEmptyString(savedUnsentEventsString)) return [];
            if ("string" === type(savedUnsentEventsString)) try {
                var events = JSON.parse(savedUnsentEventsString);
                if ("array" === type(events)) return events;
            } catch (e) {}
            utils.log.error("Unable to load " + unsentKey + " events. Restart with a new empty queue.");
            return [];
        };
        AmplitudeClient.prototype.isNewSession = function() {
            return this._newSession;
        };
        AmplitudeClient.prototype.onInit = function(callback) {
            if (this._isInitialized) callback(this); else this._onInitCallbacks.push(callback);
        };
        AmplitudeClient.prototype.onNewSessionStart = function(callback) {
            this._onNewSessionStartCallbacks.push(callback);
        };
        AmplitudeClient.prototype.getSessionId = function() {
            return this._sessionId;
        };
        AmplitudeClient.prototype.nextEventId = function() {
            this._eventId++;
            return this._eventId;
        };
        AmplitudeClient.prototype.nextIdentifyId = function() {
            this._identifyId++;
            return this._identifyId;
        };
        AmplitudeClient.prototype.nextSequenceNumber = function() {
            this._sequenceNumber++;
            return this._sequenceNumber;
        };
        AmplitudeClient.prototype._unsentCount = function() {
            return this._unsentEvents.length + this._unsentIdentifys.length;
        };
        AmplitudeClient.prototype._sendEventsIfReady = function() {
            if (0 === this._unsentCount()) return false;
            if (!this.options.batchEvents) {
                this.sendEvents();
                return true;
            }
            if (this._unsentCount() >= this.options.eventUploadThreshold) {
                this.sendEvents();
                return true;
            }
            if (this.options.transport === Constants.TRANSPORT_BEACON) {
                this.sendEvents();
                return true;
            }
            if (!this._updateScheduled) {
                this._updateScheduled = true;
                setTimeout(function() {
                    this._updateScheduled = false;
                    this.sendEvents();
                }.bind(this), this.options.eventUploadPeriodMillis);
            }
            return false;
        };
        AmplitudeClient.prototype.clearStorage = function() {
            return this._metadataStorage.clear();
        };
        AmplitudeClient.prototype._getFromStorage = function(storage, key) {
            return storage.getItem(key + this._storageSuffix);
        };
        AmplitudeClient.prototype._setInStorage = function(storage, key, value) {
            storage.setItem(key + this._storageSuffix, value);
        };
        var _loadCookieData = function(scope) {
            if (!scope._useOldCookie) {
                var props = scope._metadataStorage.load();
                if ("object" === type(props)) _loadCookieDataProps(scope, props);
                return;
            }
            var cookieData = scope.cookieStorage.get(scope._oldCookiename);
            if ("object" === type(cookieData)) {
                _loadCookieDataProps(scope, cookieData);
                return;
            }
        };
        var _upgradeCookieData = function(scope) {
            var cookieData = scope.cookieStorage.get(scope._oldCookiename);
            if ("object" === type(cookieData)) {
                _loadCookieDataProps(scope, cookieData);
                _saveCookieData(scope);
            }
        };
        var _loadCookieDataProps = function(scope, cookieData) {
            if (cookieData.deviceId) scope.options.deviceId = cookieData.deviceId;
            if (cookieData.userId) scope.options.userId = cookieData.userId;
            if (null !== cookieData.optOut && void 0 !== cookieData.optOut) if (false !== cookieData.optOut) scope.options.optOut = cookieData.optOut;
            if (cookieData.sessionId) scope._sessionId = parseInt(cookieData.sessionId, 10);
            if (cookieData.lastEventTime) scope._lastEventTime = parseInt(cookieData.lastEventTime, 10);
            if (cookieData.eventId) scope._eventId = parseInt(cookieData.eventId, 10);
            if (cookieData.identifyId) scope._identifyId = parseInt(cookieData.identifyId, 10);
            if (cookieData.sequenceNumber) scope._sequenceNumber = parseInt(cookieData.sequenceNumber, 10);
        };
        var _saveCookieData = function(scope) {
            var cookieData = {
                deviceId: scope.options.deviceId,
                userId: scope.options.userId,
                optOut: scope.options.optOut,
                sessionId: scope._sessionId,
                lastEventTime: scope._lastEventTime,
                eventId: scope._eventId,
                identifyId: scope._identifyId,
                sequenceNumber: scope._sequenceNumber
            };
            if (scope._useOldCookie) scope.cookieStorage.set(scope.options.cookieName + scope._storageSuffix, cookieData); else scope._metadataStorage.save(cookieData);
        };
        AmplitudeClient.prototype._initUtmData = function(queryParams, cookieParams) {
            queryParams = queryParams || this._getUrlParams();
            cookieParams = cookieParams || this.cookieStorage.get("__utmz");
            var utmProperties = getUtmData(cookieParams, queryParams);
            _sendParamsReferrerUserProperties(this, utmProperties);
            return utmProperties;
        };
        AmplitudeClient.prototype._unsetUTMParams = function() {
            var identify = new Identify;
            identify.unset(Constants.REFERRER);
            identify.unset(Constants.REFERRING_DOMAIN);
            identify.unset(Constants.UTM_SOURCE);
            identify.unset(Constants.UTM_MEDIUM);
            identify.unset(Constants.UTM_CAMPAIGN);
            identify.unset(Constants.UTM_TERM);
            identify.unset(Constants.UTM_CONTENT);
            this.identify(identify);
        };
        var _sendParamsReferrerUserProperties = function(scope, userProperties) {
            if ("object" !== type(userProperties) || 0 === Object.keys(userProperties).length) return;
            var identify = new Identify;
            for (var key in userProperties) if (Object.prototype.hasOwnProperty.call(userProperties, key)) {
                identify.setOnce("initial_" + key, userProperties[key]);
                identify.set(key, userProperties[key]);
            }
            scope.identify(identify);
        };
        AmplitudeClient.prototype._getReferrer = function() {
            var urlRefer = this._getReferrerFromUrlParam(this._getUrlParams());
            if (urlRefer) return urlRefer; else return "undefined" !== typeof document ? document.referrer : "";
        };
        AmplitudeClient.prototype._getUrlParams = function() {
            return GlobalScope.location.search;
        };
        AmplitudeClient.prototype._saveGclid = function(urlParams) {
            var gclid = utils.getQueryParam("gclid", urlParams);
            if (utils.isEmptyString(gclid)) return;
            var gclidProperties = {
                gclid
            };
            _sendParamsReferrerUserProperties(this, gclidProperties);
            return gclidProperties;
        };
        AmplitudeClient.prototype._saveFbclid = function(urlParams) {
            var fbclid = utils.getQueryParam("fbclid", urlParams);
            if (utils.isEmptyString(fbclid)) return;
            var fbclidProperties = {
                fbclid
            };
            _sendParamsReferrerUserProperties(this, fbclidProperties);
            return fbclidProperties;
        };
        AmplitudeClient.prototype._getDeviceIdFromUrlParam = function(urlParams) {
            return utils.getQueryParam(Constants.AMP_DEVICE_ID_PARAM, urlParams);
        };
        AmplitudeClient.prototype._getReferrerFromUrlParam = function(urlParams) {
            return utils.getQueryParam(Constants.AMP_REFERRER_PARAM, urlParams);
        };
        AmplitudeClient.prototype._getReferringDomain = function(referrer) {
            if (utils.isEmptyString(referrer)) return null;
            var parts = referrer.split("/");
            if (parts.length >= 3) return parts[2];
            return null;
        };
        AmplitudeClient.prototype._saveReferrer = function(referrer) {
            if (utils.isEmptyString(referrer)) return;
            var referrerInfo = {
                referrer,
                referring_domain: this._getReferringDomain(referrer)
            };
            _sendParamsReferrerUserProperties(this, referrerInfo);
            return referrerInfo;
        };
        AmplitudeClient.prototype.saveEvents = function() {
            try {
                var serializedUnsentEvents = JSON.stringify(this._unsentEvents.map((function(_ref) {
                    var event = _ref.event;
                    return event;
                })));
                this._setInStorage(localStorage$1, this.options.unsentKey, serializedUnsentEvents);
            } catch (e) {}
            try {
                var serializedIdentifys = JSON.stringify(this._unsentIdentifys.map((function(unsentIdentify) {
                    return unsentIdentify.event;
                })));
                this._setInStorage(localStorage$1, this.options.unsentIdentifyKey, serializedIdentifys);
            } catch (e) {}
        };
        AmplitudeClient.prototype.setDomain = function(domain) {
            if (this._shouldDeferCall()) return this._q.push([ "setDomain" ].concat(Array.prototype.slice.call(arguments, 0)));
            if (!utils.validateInput(domain, "domain", "string")) return;
            try {
                this.cookieStorage.options({
                    expirationDays: this.options.cookieExpiration,
                    secure: this.options.secureCookie,
                    domain,
                    sameSite: this.options.sameSiteCookie
                });
                this.options.domain = this.cookieStorage.options().domain;
                _loadCookieData(this);
                _saveCookieData(this);
            } catch (e) {
                utils.log.error(e);
            }
        };
        AmplitudeClient.prototype.setUserId = function(userId) {
            var startNewSession = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : false;
            if (!utils.validateInput(startNewSession, "startNewSession", "boolean")) return;
            if (this._shouldDeferCall()) return this._q.push([ "setUserId" ].concat(Array.prototype.slice.call(arguments, 0)));
            try {
                this.options.userId = void 0 !== userId && null !== userId && "" + userId || null;
                if (startNewSession) {
                    if (this.options.unsetParamsReferrerOnNewSession) this._unsetUTMParams();
                    this._newSession = true;
                    this._sessionId = (new Date).getTime();
                    this._runNewSessionStartCallbacks();
                    if (this.options.saveParamsReferrerOncePerSession) this._trackParamsAndReferrer();
                }
                _saveCookieData(this);
                if (this._connector) this._connector.identityStore.editIdentity().setUserId(this.options.userId).commit();
            } catch (e) {
                utils.log.error(e);
            }
        };
        AmplitudeClient.prototype.setGroup = function(groupType, groupName) {
            if (this._shouldDeferCall()) return this._q.push([ "setGroup" ].concat(Array.prototype.slice.call(arguments, 0)));
            if (!this._apiKeySet("setGroup()") || !utils.validateInput(groupType, "groupType", "string") || utils.isEmptyString(groupType)) return;
            var groups = {};
            groups[groupType] = groupName;
            var identify = (new Identify).set(groupType, groupName);
            this._logEvent(Constants.IDENTIFY_EVENT, null, null, identify.userPropertiesOperations, groups, null, null, null);
        };
        AmplitudeClient.prototype.setOptOut = function(enable) {
            if (this._shouldDeferCall()) return this._q.push([ "setOptOut" ].concat(Array.prototype.slice.call(arguments, 0)));
            if (!utils.validateInput(enable, "enable", "boolean")) return;
            try {
                this.options.optOut = enable;
                _saveCookieData(this);
            } catch (e) {
                utils.log.error(e);
            }
        };
        AmplitudeClient.prototype.setSessionId = function(sessionId) {
            if (!utils.validateInput(sessionId, "sessionId", "number")) return;
            try {
                this._sessionId = sessionId;
                _saveCookieData(this);
            } catch (e) {
                utils.log.error(e);
            }
        };
        AmplitudeClient.prototype.resetSessionId = function() {
            this.setSessionId((new Date).getTime());
        };
        AmplitudeClient.prototype.regenerateDeviceId = function() {
            if (this._shouldDeferCall()) return this._q.push([ "regenerateDeviceId" ].concat(Array.prototype.slice.call(arguments, 0)));
            this.setDeviceId(base64Id());
        };
        AmplitudeClient.prototype.setDeviceId = function(deviceId) {
            if (this._shouldDeferCall()) return this._q.push([ "setDeviceId" ].concat(Array.prototype.slice.call(arguments, 0)));
            if (!utils.validateDeviceId(deviceId)) return;
            try {
                if (!utils.isEmptyString(deviceId)) {
                    this.options.deviceId = "" + deviceId;
                    _saveCookieData(this);
                    if (this._connector) this._connector.identityStore.editIdentity().setDeviceId(this.options.deviceId).commit();
                }
            } catch (e) {
                utils.log.error(e);
            }
        };
        AmplitudeClient.prototype.setTransport = function(transport) {
            if (this._shouldDeferCall()) return this._q.push([ "setTransport" ].concat(Array.prototype.slice.call(arguments, 0)));
            if (!utils.validateTransport(transport)) return;
            this.options.transport = transport;
        };
        AmplitudeClient.prototype.setUserProperties = function(userProperties) {
            if (this._shouldDeferCall()) return this._q.push([ "setUserProperties" ].concat(Array.prototype.slice.call(arguments, 0)));
            if (!this._apiKeySet("setUserProperties()") || !utils.validateInput(userProperties, "userProperties", "object")) return;
            var sanitized = utils.truncate(utils.validateProperties(userProperties));
            if (0 === Object.keys(sanitized).length) return;
            var identify = new Identify;
            for (var property in sanitized) if (Object.prototype.hasOwnProperty.call(sanitized, property)) identify.set(property, sanitized[property]);
            this.identify(identify);
        };
        AmplitudeClient.prototype.clearUserProperties = function() {
            if (this._shouldDeferCall()) return this._q.push([ "clearUserProperties" ].concat(Array.prototype.slice.call(arguments, 0)));
            if (!this._apiKeySet("clearUserProperties()")) return;
            var identify = new Identify;
            identify.clearAll();
            this.identify(identify);
        };
        var _convertProxyObjectToRealObject = function(instance, proxy) {
            for (var i = 0; i < proxy._q.length; i++) {
                var fn = instance[proxy._q[i][0]];
                if ("function" === type(fn)) fn.apply(instance, proxy._q[i].slice(1));
            }
            return instance;
        };
        AmplitudeClient.prototype.identify = function(identify_obj, opt_callback, opt_error_callback, outOfSession) {
            if (this._shouldDeferCall()) return this._q.push([ "identify" ].concat(Array.prototype.slice.call(arguments, 0)));
            if (!this._apiKeySet("identify()")) {
                _logErrorsWithCallbacks(opt_callback, opt_error_callback, 0, "No request sent", {
                    reason: "API key is not set"
                });
                return;
            }
            if ("object" === type(identify_obj) && Object.prototype.hasOwnProperty.call(identify_obj, "_q")) identify_obj = _convertProxyObjectToRealObject(new Identify, identify_obj);
            if (identify_obj instanceof Identify) if (Object.keys(identify_obj.userPropertiesOperations).length > 0) return this._logEvent(Constants.IDENTIFY_EVENT, null, null, identify_obj.userPropertiesOperations, null, null, null, opt_callback, opt_error_callback, outOfSession); else _logErrorsWithCallbacks(opt_callback, opt_error_callback, 0, "No request sent", {
                reason: "No user property operations"
            }); else {
                utils.log.error("Invalid identify input type. Expected Identify object but saw " + type(identify_obj));
                _logErrorsWithCallbacks(opt_callback, opt_error_callback, 0, "No request sent", {
                    reason: "Invalid identify input type"
                });
            }
        };
        AmplitudeClient.prototype.groupIdentify = function(group_type, group_name, identify_obj, opt_callback, opt_error_callback, outOfSession) {
            if (this._shouldDeferCall()) return this._q.push([ "groupIdentify" ].concat(Array.prototype.slice.call(arguments, 0)));
            if (!this._apiKeySet("groupIdentify()")) {
                _logErrorsWithCallbacks(opt_callback, opt_error_callback, 0, "No request sent", {
                    reason: "API key is not set"
                });
                return;
            }
            if (!utils.validateInput(group_type, "group_type", "string") || utils.isEmptyString(group_type)) {
                _logErrorsWithCallbacks(opt_callback, opt_error_callback, 0, "No request sent", {
                    reason: "Invalid group type"
                });
                return;
            }
            if (null === group_name || void 0 === group_name) {
                _logErrorsWithCallbacks(opt_callback, opt_error_callback, 0, "No request sent", {
                    reason: "Invalid group name"
                });
                return;
            }
            if ("object" === type(identify_obj) && Object.prototype.hasOwnProperty.call(identify_obj, "_q")) identify_obj = _convertProxyObjectToRealObject(new Identify, identify_obj);
            if (identify_obj instanceof Identify) if (Object.keys(identify_obj.userPropertiesOperations).length > 0) return this._logEvent(Constants.GROUP_IDENTIFY_EVENT, null, null, null, _defineProperty({}, group_type, group_name), identify_obj.userPropertiesOperations, null, opt_callback, opt_error_callback, outOfSession); else _logErrorsWithCallbacks(opt_callback, opt_error_callback, 0, "No request sent", {
                reason: "No group property operations"
            }); else {
                utils.log.error("Invalid identify input type. Expected Identify object but saw " + type(identify_obj));
                _logErrorsWithCallbacks(opt_callback, opt_error_callback, 0, "No request sent", {
                    reason: "Invalid identify input type"
                });
            }
        };
        AmplitudeClient.prototype.setVersionName = function(versionName) {
            if (this._shouldDeferCall()) return this._q.push([ "setVersionName" ].concat(Array.prototype.slice.call(arguments, 0)));
            if (!utils.validateInput(versionName, "versionName", "string")) return;
            this.options.versionName = versionName;
        };
        AmplitudeClient.prototype._logEvent = function(eventType, eventProperties, apiProperties, userProperties, groups, groupProperties, timestamp, callback, errorCallback, outOfSession) {
            _loadCookieData(this);
            if (!eventType) {
                _logErrorsWithCallbacks(callback, errorCallback, 0, "No request sent", {
                    reason: "Missing eventType"
                });
                return;
            }
            if (this.options.optOut) {
                _logErrorsWithCallbacks(callback, errorCallback, 0, "No request sent", {
                    reason: "optOut is set to true"
                });
                return;
            }
            try {
                var eventId;
                if (eventType === Constants.IDENTIFY_EVENT || eventType === Constants.GROUP_IDENTIFY_EVENT) eventId = this.nextIdentifyId(); else eventId = this.nextEventId();
                var sequenceNumber = this.nextSequenceNumber();
                var eventTime = "number" === type(timestamp) ? timestamp : (new Date).getTime();
                if (outOfSession) this._sessionId = -1; else if (!this._sessionId || !this._lastEventTime || eventTime - this._lastEventTime > this.options.sessionTimeout) {
                    this._sessionId = eventTime;
                    this._runNewSessionStartCallbacks();
                }
                this._lastEventTime = eventTime;
                _saveCookieData(this);
                var osName = this._ua.browser.name;
                var osVersion = this._ua.browser.major;
                var deviceModel = this._ua.device.model || this._ua.os.name;
                var deviceVendor = this._ua.device.vendor;
                userProperties = userProperties || {};
                var trackingOptions = _objectSpread2({}, this._apiPropertiesTrackingOptions);
                apiProperties = _objectSpread2(_objectSpread2({}, apiProperties || {}), trackingOptions);
                eventProperties = eventProperties || {};
                groups = groups || {};
                groupProperties = groupProperties || {};
                var event = {
                    device_id: this.options.deviceId,
                    user_id: this.options.userId,
                    timestamp: eventTime,
                    event_id: eventId,
                    session_id: this._sessionId || -1,
                    event_type: eventType,
                    version_name: this.options.versionName || null,
                    platform: _shouldTrackField(this, "platform") ? this.options.platform : null,
                    os_name: _shouldTrackField(this, "os_name") ? osName || null : null,
                    os_version: _shouldTrackField(this, "os_version") ? osVersion || null : null,
                    device_model: _shouldTrackField(this, "device_model") ? deviceModel || null : null,
                    device_manufacturer: _shouldTrackField(this, "device_manufacturer") ? deviceVendor || null : null,
                    language: _shouldTrackField(this, "language") ? this.options.language : null,
                    api_properties: apiProperties,
                    event_properties: utils.truncate(utils.validateProperties(eventProperties)),
                    user_properties: utils.truncate(utils.validateProperties(userProperties)),
                    uuid: uuid(),
                    library: this.options.library,
                    sequence_number: sequenceNumber,
                    groups: utils.truncate(utils.validateGroups(groups)),
                    group_properties: utils.truncate(utils.validateProperties(groupProperties)),
                    user_agent: this._userAgent,
                    partner_id: this.options.partnerId || null
                };
                if (_isObservePlanSet(this)) event.plan = {
                    branch: this.options.plan.branch || void 0,
                    source: this.options.plan.source || void 0,
                    version: this.options.plan.version || void 0,
                    versionId: this.options.plan.versionId || void 0
                };
                if (_isIngestionMetadataSet(this)) event.ingestion_metadata = {
                    source_name: this.options.ingestionMetadata.sourceName || void 0,
                    source_version: this.options.ingestionMetadata.sourceVersion || void 0
                };
                if (eventType === Constants.IDENTIFY_EVENT || eventType === Constants.GROUP_IDENTIFY_EVENT) {
                    this._unsentIdentifys.push({
                        event,
                        callback,
                        errorCallback
                    });
                    this._limitEventsQueued(this._unsentIdentifys);
                } else {
                    this._unsentEvents.push({
                        event,
                        callback,
                        errorCallback
                    });
                    this._limitEventsQueued(this._unsentEvents);
                }
                if (this.options.saveEvents) this.saveEvents();
                this._sendEventsIfReady();
                if (eventType === Constants.IDENTIFY_EVENT && this._connector) this._connector.identityStore.editIdentity().updateUserProperties(utils.truncate(utils.validateProperties(userProperties))).commit();
                return eventId;
            } catch (e) {
                utils.log.error(e);
            }
        };
        var _isObservePlanSet = function(scope) {
            return scope.options.plan && (scope.options.plan.source || scope.options.plan.branch || scope.options.plan.version || scope.options.plan.versionId);
        };
        var _isIngestionMetadataSet = function(scope) {
            return scope.options.ingestionMetadata && (scope.options.ingestionMetadata.sourceName || scope.options.ingestionMetadata.sourceVersion);
        };
        var _shouldTrackField = function(scope, field) {
            return !!scope.options.trackingOptions[field];
        };
        var _generateApiPropertiesTrackingConfig = function(scope) {
            var fields = [ "city", "country", "dma", "ip_address", "region" ];
            var config = {};
            for (var i = 0; i < fields.length; i++) {
                var field = fields[i];
                if (!_shouldTrackField(scope, field)) config[field] = false;
            }
            return config;
        };
        AmplitudeClient.prototype._limitEventsQueued = function(queue) {
            if (queue.length > this.options.savedMaxCount) {
                var deletedEvents = queue.splice(0, queue.length - this.options.savedMaxCount);
                deletedEvents.forEach((function(event) {
                    _logErrorsWithCallbacks(event.callback, event.errorCallback, 0, "No request sent", {
                        reason: "Event dropped because options.savedMaxCount exceeded. User may be offline or have a content blocker"
                    });
                }));
            }
        };
        AmplitudeClient.prototype.logEvent = function(eventType, eventProperties, opt_callback, opt_error_callback) {
            var outOfSession = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : false;
            if (this._shouldDeferCall()) return this._q.push([ "logEvent" ].concat(Array.prototype.slice.call(arguments, 0)));
            return this.logEventWithTimestamp(eventType, eventProperties, null, opt_callback, opt_error_callback, outOfSession);
        };
        AmplitudeClient.prototype.logEventWithTimestamp = function(eventType, eventProperties, timestamp, opt_callback, opt_error_callback) {
            var outOfSession = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : false;
            if (this._shouldDeferCall()) return this._q.push([ "logEventWithTimestamp" ].concat(Array.prototype.slice.call(arguments, 0)));
            if (!this._apiKeySet("logEvent()")) {
                _logErrorsWithCallbacks(opt_callback, opt_error_callback, 0, "No request sent", {
                    reason: "API key not set"
                });
                return -1;
            }
            if (!utils.validateInput(eventType, "eventType", "string")) {
                _logErrorsWithCallbacks(opt_callback, opt_error_callback, 0, "No request sent", {
                    reason: "Invalid type for eventType"
                });
                return -1;
            }
            if (utils.isEmptyString(eventType)) {
                _logErrorsWithCallbacks(opt_callback, opt_error_callback, 0, "No request sent", {
                    reason: "Missing eventType"
                });
                return -1;
            }
            if (!utils.validateInput(outOfSession, "outOfSession", "boolean")) _logErrorsWithCallbacks(opt_callback, opt_error_callback, 0, "No request sent", {
                reason: "Invalid outOfSession value"
            });
            return this._logEvent(eventType, eventProperties, null, null, null, null, timestamp, opt_callback, opt_error_callback, outOfSession);
        };
        AmplitudeClient.prototype.logEventWithGroups = function(eventType, eventProperties, groups, opt_callback, opt_error_callback) {
            var outOfSession = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : false;
            if (this._shouldDeferCall()) return this._q.push([ "logEventWithGroups" ].concat(Array.prototype.slice.call(arguments, 0)));
            if (!this._apiKeySet("logEventWithGroups()")) {
                _logErrorsWithCallbacks(event.callback, event.errorCallback, 0, "No request sent", {
                    reason: "API key not set"
                });
                return -1;
            }
            if (!utils.validateInput(eventType, "eventType", "string")) {
                _logErrorsWithCallbacks(event.callback, event.errorCallback, 0, "No request sent", {
                    reason: "Invalid type for eventType"
                });
                return -1;
            }
            if (!utils.validateInput(outOfSession, "outOfSession", "boolean")) _logErrorsWithCallbacks(event.callback, event.errorCallback, 0, "No request sent", {
                reason: "Invalid outOfSession value"
            });
            return this._logEvent(eventType, eventProperties, null, null, groups, null, null, opt_callback, opt_error_callback, outOfSession);
        };
        var _isNumber = function(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        };
        var _logErrorsWithCallbacks = function(opt_callback, opt_error_callback, status, response, details) {
            if ("function" === type(opt_callback)) opt_callback(status, response, details);
            if ("function" === type(opt_error_callback)) opt_error_callback(status, response, details);
        };
        AmplitudeClient.prototype.logRevenueV2 = function(revenue_obj) {
            if (this._shouldDeferCall()) return this._q.push([ "logRevenueV2" ].concat(Array.prototype.slice.call(arguments, 0)));
            if (!this._apiKeySet("logRevenueV2()")) return;
            if ("object" === type(revenue_obj) && Object.prototype.hasOwnProperty.call(revenue_obj, "_q")) revenue_obj = _convertProxyObjectToRealObject(new Revenue, revenue_obj);
            if (revenue_obj instanceof Revenue) {
                if (revenue_obj && revenue_obj._isValidRevenue()) return this.logEvent(Constants.REVENUE_EVENT, revenue_obj._toJSONObject());
            } else utils.log.error("Invalid revenue input type. Expected Revenue object but saw " + type(revenue_obj));
        };
        AmplitudeClient.prototype.logRevenue = function(price, quantity, product) {
            if (this._shouldDeferCall()) return this._q.push([ "logRevenue" ].concat(Array.prototype.slice.call(arguments, 0)));
            if (!this._apiKeySet("logRevenue()") || !_isNumber(price) || void 0 !== quantity && !_isNumber(quantity)) return -1;
            return this._logEvent(Constants.REVENUE_EVENT, {}, {
                productId: product,
                special: "revenue_amount",
                quantity: quantity || 1,
                price
            }, null, null, null, null, null);
        };
        AmplitudeClient.prototype._logErrorsOnEvents = function(maxEventId, maxIdentifyId, status, response) {
            var queues = [ "_unsentEvents", "_unsentIdentifys" ];
            for (var j = 0; j < queues.length; j++) {
                var queue = queues[j];
                var maxId = "_unsentEvents" === queue ? maxEventId : maxIdentifyId;
                for (var i = 0; i < this[queue].length || 0; i++) {
                    var unsentEvent = this[queue][i];
                    if (unsentEvent.event.event_id <= maxId) if (unsentEvent.errorCallback) unsentEvent.errorCallback(status, response);
                }
            }
        };
        AmplitudeClient.prototype.removeEvents = function(maxEventId, maxIdentifyId, status, response) {
            _removeEvents(this, "_unsentEvents", maxEventId, status, response);
            _removeEvents(this, "_unsentIdentifys", maxIdentifyId, status, response);
        };
        var _removeEvents = function(scope, eventQueue, maxId, status, response) {
            if (maxId < 0) return;
            var filteredEvents = [];
            for (var i = 0; i < scope[eventQueue].length || 0; i++) {
                var unsentEvent = scope[eventQueue][i];
                if (unsentEvent.event.event_id > maxId) filteredEvents.push(unsentEvent); else if (unsentEvent.callback) unsentEvent.callback(status, response);
            }
            scope[eventQueue] = filteredEvents;
        };
        AmplitudeClient.prototype.sendEvents = function() {
            if (!this._apiKeySet("sendEvents()")) {
                this.removeEvents(1 / 0, 1 / 0, 0, "No request sent", {
                    reason: "API key not set"
                });
                return;
            }
            if (this.options.optOut) {
                this.removeEvents(1 / 0, 1 / 0, 0, "No request sent", {
                    reason: "Opt out is set to true"
                });
                return;
            }
            if (0 === this._unsentCount()) return;
            if (this.options.transport !== Constants.TRANSPORT_BEACON) {
                if (this._sending) return;
                this._sending = true;
            }
            var protocol = this.options.forceHttps ? "https" : "https:" === GlobalScope.location.protocol ? "https" : "http";
            var url = protocol + "://" + this.options.apiEndpoint;
            var numEvents = Math.min(this._unsentCount(), this.options.uploadBatchSize);
            var mergedEvents = this._mergeEventsAndIdentifys(numEvents);
            var maxEventId = mergedEvents.maxEventId;
            var maxIdentifyId = mergedEvents.maxIdentifyId;
            var events = JSON.stringify(mergedEvents.eventsToSend.map((function(_ref2) {
                var event = _ref2.event;
                return event;
            })));
            var uploadTime = (new Date).getTime();
            var data = {
                client: this.options.apiKey,
                e: events,
                v: Constants.API_VERSION,
                upload_time: uploadTime,
                checksum: md5_default()(Constants.API_VERSION + this.options.apiKey + events + uploadTime)
            };
            if (this.options.transport === Constants.TRANSPORT_BEACON && "undefined" !== typeof navigator) {
                var success = navigator.sendBeacon(url, new URLSearchParams(data));
                if (success) {
                    this.removeEvents(maxEventId, maxIdentifyId, 200, "success");
                    if (this.options.saveEvents) this.saveEvents();
                } else this._logErrorsOnEvents(maxEventId, maxIdentifyId, 0, "");
                return;
            }
            var scope = this;
            try {
                new Request(url, data, this.options.headers).send((function(status, response) {
                    scope._sending = false;
                    try {
                        if (200 === status) {
                            scope.removeEvents(maxEventId, maxIdentifyId, status, response);
                            if (scope.options.saveEvents) scope.saveEvents();
                            scope._sendEventsIfReady();
                        } else {
                            scope._logErrorsOnEvents(maxEventId, maxIdentifyId, status, response);
                            if (413 === status) {
                                if (1 === scope.options.uploadBatchSize) scope.removeEvents(maxEventId, maxIdentifyId, status, response);
                                scope.options.uploadBatchSize = Math.ceil(numEvents / 2);
                                scope.sendEvents();
                            }
                        }
                    } catch (e) {}
                }));
            } catch (e) {
                var status = 0, response = "Request failed to send";
                utils.log.error(response);
                scope._logErrorsOnEvents(maxEventId, maxIdentifyId, status, response);
                scope.removeEvents(maxEventId, maxIdentifyId, status, response, {
                    reason: e.message
                });
            }
        };
        AmplitudeClient.prototype._mergeEventsAndIdentifys = function(numEvents) {
            var eventsToSend = [];
            var eventIndex = 0;
            var maxEventId = -1;
            var identifyIndex = 0;
            var maxIdentifyId = -1;
            while (eventsToSend.length < numEvents) {
                var unsentEvent = void 0;
                var noIdentifys = identifyIndex >= this._unsentIdentifys.length;
                var noEvents = eventIndex >= this._unsentEvents.length;
                if (noEvents && noIdentifys) {
                    utils.log.error("Merging Events and Identifys, less events and identifys than expected");
                    break;
                } else if (noIdentifys) {
                    unsentEvent = this._unsentEvents[eventIndex++];
                    maxEventId = unsentEvent.event.event_id;
                } else if (noEvents) {
                    unsentEvent = this._unsentIdentifys[identifyIndex++];
                    maxIdentifyId = unsentEvent.event.event_id;
                } else if (!("sequence_number" in this._unsentEvents[eventIndex].event) || this._unsentEvents[eventIndex].event.sequence_number < this._unsentIdentifys[identifyIndex].event.sequence_number) {
                    unsentEvent = this._unsentEvents[eventIndex++];
                    maxEventId = unsentEvent.event.event_id;
                } else {
                    unsentEvent = this._unsentIdentifys[identifyIndex++];
                    maxIdentifyId = unsentEvent.event.event_id;
                }
                eventsToSend.push(unsentEvent);
            }
            return {
                eventsToSend,
                maxEventId,
                maxIdentifyId
            };
        };
        AmplitudeClient.prototype.setGlobalUserProperties = function(userProperties) {
            this.setUserProperties(userProperties);
        };
        AmplitudeClient.prototype.__VERSION__ = function() {
            return this.options.library.version;
        };
        AmplitudeClient.prototype.setLibrary = function(name, version) {
            if (null !== name && "undefined" !== typeof name) this.options.library.name = name;
            if (null !== version && "undefined" !== typeof version) this.options.library.version = version;
        };
        AmplitudeClient.prototype._shouldDeferCall = function() {
            return this._pendingReadStorage || this._initializationDeferred;
        };
        AmplitudeClient.prototype._deferInitialization = function() {
            this._initializationDeferred = true;
            this._q.push([ "init" ].concat(Array.prototype.slice.call(arguments, 0)));
        };
        AmplitudeClient.prototype.enableTracking = function() {
            this._initializationDeferred = false;
            _saveCookieData(this);
            this.runQueuedFunctions();
        };
        AmplitudeClient.prototype._refreshDynamicConfig = function() {
            if (this.options.useDynamicConfig) instance$1.refresh(this.options.serverZone, this.options.forceHttps, function() {
                this.options.apiEndpoint = instance$1.ingestionEndpoint;
            }.bind(this));
        };
        AmplitudeClient.prototype.getDeviceId = function() {
            return this.options.deviceId;
        };
        AmplitudeClient.prototype.getUserId = function() {
            return this.options.userId;
        };
        AmplitudeClient.prototype.setMinTimeBetweenSessionsMillis = function(timeInMillis) {
            if (!utils.validateInput(timeInMillis, "timeInMillis", "number")) return;
            if (this._shouldDeferCall()) return this._q.push([ "setMinTimeBetweenSessionsMillis" ].concat(Array.prototype.slice.call(arguments, 0)));
            try {
                this.options.sessionTimeout = timeInMillis;
            } catch (e) {
                utils.log.error(e);
            }
        };
        AmplitudeClient.prototype.setEventUploadThreshold = function(eventUploadThreshold) {
            if (!utils.validateInput(eventUploadThreshold, "eventUploadThreshold", "number")) return;
            if (this._shouldDeferCall()) return this._q.push([ "setEventUploadThreshold" ].concat(Array.prototype.slice.call(arguments, 0)));
            try {
                this.options.eventUploadThreshold = eventUploadThreshold;
            } catch (e) {
                utils.log.error(e);
            }
        };
        AmplitudeClient.prototype.setUseDynamicConfig = function(useDynamicConfig) {
            if (!utils.validateInput(useDynamicConfig, "useDynamicConfig", "boolean")) return;
            if (this._shouldDeferCall()) return this._q.push([ "setUseDynamicConfig" ].concat(Array.prototype.slice.call(arguments, 0)));
            try {
                this.options.useDynamicConfig = useDynamicConfig;
                this._refreshDynamicConfig();
            } catch (e) {
                utils.log.error(e);
            }
        };
        AmplitudeClient.prototype.setServerZone = function(serverZone) {
            var serverZoneBasedApi = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : true;
            if (serverZone !== AmplitudeServerZone.EU && serverZone !== AmplitudeServerZone.US || !utils.validateInput(serverZoneBasedApi, "serverZoneBasedApi", "boolean")) return;
            if (this._shouldDeferCall()) return this._q.push([ "setServerZone" ].concat(Array.prototype.slice.call(arguments, 0)));
            try {
                this.options.serverZone = serverZone;
                this.options.serverZoneBasedApi = serverZoneBasedApi;
                if (serverZoneBasedApi) this.options.apiEndpoint = getEventLogApi(this.options.serverZone);
            } catch (e) {
                utils.log.error(e);
            }
        };
        AmplitudeClient.prototype.setServerUrl = function(serverUrl) {
            if (!utils.validateInput(serverUrl, "serverUrl", "string")) return;
            if (this._shouldDeferCall()) return this._q.push([ "setServerUrl" ].concat(Array.prototype.slice.call(arguments, 0)));
            try {
                this.options.apiEndpoint = serverUrl;
            } catch (e) {
                utils.log.error(e);
            }
        };
        var Amplitude = function() {
            this.options = _objectSpread2({}, DEFAULT_OPTIONS);
            this._q = [];
            this._instances = {};
        };
        Amplitude.prototype.Identify = Identify;
        Amplitude.prototype.Revenue = Revenue;
        Amplitude.prototype.getInstance = function(instance) {
            instance = utils.isEmptyString(instance) ? Constants.DEFAULT_INSTANCE : instance.toLowerCase();
            var client = this._instances[instance];
            if (void 0 === client) {
                client = new AmplitudeClient(instance);
                this._instances[instance] = client;
            }
            return client;
        };
        Amplitude.prototype.init = function(apiKey, opt_userId, opt_config, opt_callback) {
            this.getInstance().init(apiKey, opt_userId, opt_config, function(instance) {
                this.options = instance.options;
                if ("function" === type(opt_callback)) opt_callback(instance);
            }.bind(this));
        };
        Amplitude.prototype.isNewSession = function() {
            return this.getInstance().isNewSession();
        };
        Amplitude.prototype.getSessionId = function() {
            return this.getInstance().getSessionId();
        };
        Amplitude.prototype.nextEventId = function() {
            return this.getInstance().nextEventId();
        };
        Amplitude.prototype.nextIdentifyId = function() {
            return this.getInstance().nextIdentifyId();
        };
        Amplitude.prototype.nextSequenceNumber = function() {
            return this.getInstance().nextSequenceNumber();
        };
        Amplitude.prototype.saveEvents = function() {
            this.getInstance().saveEvents();
        };
        Amplitude.prototype.setDomain = function(domain) {
            this.getInstance().setDomain(domain);
        };
        Amplitude.prototype.setUserId = function(userId) {
            this.getInstance().setUserId(userId);
        };
        Amplitude.prototype.setGroup = function(groupType, groupName) {
            this.getInstance().setGroup(groupType, groupName);
        };
        Amplitude.prototype.setOptOut = function(enable) {
            this.getInstance().setOptOut(enable);
        };
        Amplitude.prototype.regenerateDeviceId = function() {
            this.getInstance().regenerateDeviceId();
        };
        Amplitude.prototype.setDeviceId = function(deviceId) {
            this.getInstance().setDeviceId(deviceId);
        };
        Amplitude.prototype.setUserProperties = function(userProperties) {
            this.getInstance().setUserProperties(userProperties);
        };
        Amplitude.prototype.clearUserProperties = function() {
            this.getInstance().clearUserProperties();
        };
        Amplitude.prototype.identify = function(identify_obj, opt_callback) {
            this.getInstance().identify(identify_obj, opt_callback);
        };
        Amplitude.prototype.setVersionName = function(versionName) {
            this.getInstance().setVersionName(versionName);
        };
        Amplitude.prototype.logEvent = function(eventType, eventProperties, opt_callback) {
            return this.getInstance().logEvent(eventType, eventProperties, opt_callback);
        };
        Amplitude.prototype.logEventWithGroups = function(eventType, eventProperties, groups, opt_callback) {
            return this.getInstance().logEventWithGroups(eventType, eventProperties, groups, opt_callback);
        };
        Amplitude.prototype.logRevenueV2 = function(revenue_obj) {
            return this.getInstance().logRevenueV2(revenue_obj);
        };
        Amplitude.prototype.logRevenue = function(price, quantity, product) {
            return this.getInstance().logRevenue(price, quantity, product);
        };
        Amplitude.prototype.removeEvents = function(maxEventId, maxIdentifyId) {
            this.getInstance().removeEvents(maxEventId, maxIdentifyId);
        };
        Amplitude.prototype.sendEvents = function(callback) {
            this.getInstance().sendEvents(callback);
        };
        Amplitude.prototype.setGlobalUserProperties = function(userProperties) {
            this.getInstance().setUserProperties(userProperties);
        };
        Amplitude.prototype.__VERSION__ = version;
        var old = "undefined" !== typeof GlobalScope && GlobalScope.amplitude || {};
        var newInstance = new Amplitude;
        newInstance._q = old._q || [];
        for (var instance in old._iq) if (Object.prototype.hasOwnProperty.call(old._iq, instance)) newInstance.getInstance(instance)._q = old._iq[instance]._q || [];
    },
    7050: module => {
        module.exports = function(arr, fn, self) {
            if (arr.filter) return arr.filter(fn, self);
            if (void 0 === arr || null === arr) throw new TypeError;
            if ("function" != typeof fn) throw new TypeError;
            var ret = [];
            for (var i = 0; i < arr.length; i++) {
                if (!hasOwn.call(arr, i)) continue;
                var val = arr[i];
                if (fn.call(self, val, i, arr)) ret.push(val);
            }
            return ret;
        };
        var hasOwn = Object.prototype.hasOwnProperty;
    },
    9619: (module, __unused_webpack_exports, __webpack_require__) => {
        "use strict";
        function _typeof(obj) {
            if ("function" === typeof Symbol && "symbol" === typeof Symbol.iterator) _typeof = function(obj) {
                return typeof obj;
            }; else _typeof = function(obj) {
                return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            return _typeof(obj);
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        var _require = __webpack_require__(1404), _require$codes = _require.codes, ERR_AMBIGUOUS_ARGUMENT = _require$codes.ERR_AMBIGUOUS_ARGUMENT, ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE, ERR_INVALID_ARG_VALUE = _require$codes.ERR_INVALID_ARG_VALUE, ERR_INVALID_RETURN_VALUE = _require$codes.ERR_INVALID_RETURN_VALUE, ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS;
        var AssertionError = __webpack_require__(7366);
        var _require2 = __webpack_require__(1323), inspect = _require2.inspect;
        var _require$types = __webpack_require__(1323).types, isPromise = _require$types.isPromise, isRegExp = _require$types.isRegExp;
        var objectAssign = Object.assign ? Object.assign : __webpack_require__(2098).assign;
        var objectIs = Object.is ? Object.is : __webpack_require__(3822);
        new Map;
        var isDeepEqual;
        var isDeepStrictEqual;
        function lazyLoadComparison() {
            var comparison = __webpack_require__(118);
            isDeepEqual = comparison.isDeepEqual;
            isDeepStrictEqual = comparison.isDeepStrictEqual;
        }
        var warned = false;
        var assert = module.exports = ok;
        var NO_EXCEPTION_SENTINEL = {};
        function innerFail(obj) {
            if (obj.message instanceof Error) throw obj.message;
            throw new AssertionError(obj);
        }
        function fail(actual, expected, message, operator, stackStartFn) {
            var argsLen = arguments.length;
            var internalMessage;
            if (0 === argsLen) internalMessage = "Failed"; else if (1 === argsLen) {
                message = actual;
                actual = void 0;
            } else {
                if (false === warned) {
                    warned = true;
                    var warn = {}.emitWarning ? {}.emitWarning : console.warn.bind(console);
                    warn("assert.fail() with more than one argument is deprecated. " + "Please use assert.strictEqual() instead or only pass a message.", "DeprecationWarning", "DEP0094");
                }
                if (2 === argsLen) operator = "!=";
            }
            if (message instanceof Error) throw message;
            var errArgs = {
                actual,
                expected,
                operator: void 0 === operator ? "fail" : operator,
                stackStartFn: stackStartFn || fail
            };
            if (void 0 !== message) errArgs.message = message;
            var err = new AssertionError(errArgs);
            if (internalMessage) {
                err.message = internalMessage;
                err.generatedMessage = true;
            }
            throw err;
        }
        assert.fail = fail;
        assert.AssertionError = AssertionError;
        function innerOk(fn, argLen, value, message) {
            if (!value) {
                var generatedMessage = false;
                if (0 === argLen) {
                    generatedMessage = true;
                    message = "No value argument passed to `assert.ok()`";
                } else if (message instanceof Error) throw message;
                var err = new AssertionError({
                    actual: value,
                    expected: true,
                    message,
                    operator: "==",
                    stackStartFn: fn
                });
                err.generatedMessage = generatedMessage;
                throw err;
            }
        }
        function ok() {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
            innerOk.apply(void 0, [ ok, args.length ].concat(args));
        }
        assert.ok = ok;
        assert.equal = function equal(actual, expected, message) {
            if (arguments.length < 2) throw new ERR_MISSING_ARGS("actual", "expected");
            if (actual != expected) innerFail({
                actual,
                expected,
                message,
                operator: "==",
                stackStartFn: equal
            });
        };
        assert.notEqual = function notEqual(actual, expected, message) {
            if (arguments.length < 2) throw new ERR_MISSING_ARGS("actual", "expected");
            if (actual == expected) innerFail({
                actual,
                expected,
                message,
                operator: "!=",
                stackStartFn: notEqual
            });
        };
        assert.deepEqual = function deepEqual(actual, expected, message) {
            if (arguments.length < 2) throw new ERR_MISSING_ARGS("actual", "expected");
            if (void 0 === isDeepEqual) lazyLoadComparison();
            if (!isDeepEqual(actual, expected)) innerFail({
                actual,
                expected,
                message,
                operator: "deepEqual",
                stackStartFn: deepEqual
            });
        };
        assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
            if (arguments.length < 2) throw new ERR_MISSING_ARGS("actual", "expected");
            if (void 0 === isDeepEqual) lazyLoadComparison();
            if (isDeepEqual(actual, expected)) innerFail({
                actual,
                expected,
                message,
                operator: "notDeepEqual",
                stackStartFn: notDeepEqual
            });
        };
        assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
            if (arguments.length < 2) throw new ERR_MISSING_ARGS("actual", "expected");
            if (void 0 === isDeepEqual) lazyLoadComparison();
            if (!isDeepStrictEqual(actual, expected)) innerFail({
                actual,
                expected,
                message,
                operator: "deepStrictEqual",
                stackStartFn: deepStrictEqual
            });
        };
        assert.notDeepStrictEqual = notDeepStrictEqual;
        function notDeepStrictEqual(actual, expected, message) {
            if (arguments.length < 2) throw new ERR_MISSING_ARGS("actual", "expected");
            if (void 0 === isDeepEqual) lazyLoadComparison();
            if (isDeepStrictEqual(actual, expected)) innerFail({
                actual,
                expected,
                message,
                operator: "notDeepStrictEqual",
                stackStartFn: notDeepStrictEqual
            });
        }
        assert.strictEqual = function strictEqual(actual, expected, message) {
            if (arguments.length < 2) throw new ERR_MISSING_ARGS("actual", "expected");
            if (!objectIs(actual, expected)) innerFail({
                actual,
                expected,
                message,
                operator: "strictEqual",
                stackStartFn: strictEqual
            });
        };
        assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
            if (arguments.length < 2) throw new ERR_MISSING_ARGS("actual", "expected");
            if (objectIs(actual, expected)) innerFail({
                actual,
                expected,
                message,
                operator: "notStrictEqual",
                stackStartFn: notStrictEqual
            });
        };
        var Comparison = function Comparison(obj, keys, actual) {
            var _this = this;
            _classCallCheck(this, Comparison);
            keys.forEach((function(key) {
                if (key in obj) if (void 0 !== actual && "string" === typeof actual[key] && isRegExp(obj[key]) && obj[key].test(actual[key])) _this[key] = actual[key]; else _this[key] = obj[key];
            }));
        };
        function compareExceptionKey(actual, expected, key, message, keys, fn) {
            if (!(key in actual) || !isDeepStrictEqual(actual[key], expected[key])) {
                if (!message) {
                    var a = new Comparison(actual, keys);
                    var b = new Comparison(expected, keys, actual);
                    var err = new AssertionError({
                        actual: a,
                        expected: b,
                        operator: "deepStrictEqual",
                        stackStartFn: fn
                    });
                    err.actual = actual;
                    err.expected = expected;
                    err.operator = fn.name;
                    throw err;
                }
                innerFail({
                    actual,
                    expected,
                    message,
                    operator: fn.name,
                    stackStartFn: fn
                });
            }
        }
        function expectedException(actual, expected, msg, fn) {
            if ("function" !== typeof expected) {
                if (isRegExp(expected)) return expected.test(actual);
                if (2 === arguments.length) throw new ERR_INVALID_ARG_TYPE("expected", [ "Function", "RegExp" ], expected);
                if ("object" !== _typeof(actual) || null === actual) {
                    var err = new AssertionError({
                        actual,
                        expected,
                        message: msg,
                        operator: "deepStrictEqual",
                        stackStartFn: fn
                    });
                    err.operator = fn.name;
                    throw err;
                }
                var keys = Object.keys(expected);
                if (expected instanceof Error) keys.push("name", "message"); else if (0 === keys.length) throw new ERR_INVALID_ARG_VALUE("error", expected, "may not be an empty object");
                if (void 0 === isDeepEqual) lazyLoadComparison();
                keys.forEach((function(key) {
                    if ("string" === typeof actual[key] && isRegExp(expected[key]) && expected[key].test(actual[key])) return;
                    compareExceptionKey(actual, expected, key, msg, keys, fn);
                }));
                return true;
            }
            if (void 0 !== expected.prototype && actual instanceof expected) return true;
            if (Error.isPrototypeOf(expected)) return false;
            return true === expected.call({}, actual);
        }
        function getActual(fn) {
            if ("function" !== typeof fn) throw new ERR_INVALID_ARG_TYPE("fn", "Function", fn);
            try {
                fn();
            } catch (e) {
                return e;
            }
            return NO_EXCEPTION_SENTINEL;
        }
        function checkIsPromise(obj) {
            return isPromise(obj) || null !== obj && "object" === _typeof(obj) && "function" === typeof obj.then && "function" === typeof obj.catch;
        }
        function waitForActual(promiseFn) {
            return Promise.resolve().then((function() {
                var resultPromise;
                if ("function" === typeof promiseFn) {
                    resultPromise = promiseFn();
                    if (!checkIsPromise(resultPromise)) throw new ERR_INVALID_RETURN_VALUE("instance of Promise", "promiseFn", resultPromise);
                } else if (checkIsPromise(promiseFn)) resultPromise = promiseFn; else throw new ERR_INVALID_ARG_TYPE("promiseFn", [ "Function", "Promise" ], promiseFn);
                return Promise.resolve().then((function() {
                    return resultPromise;
                })).then((function() {
                    return NO_EXCEPTION_SENTINEL;
                })).catch((function(e) {
                    return e;
                }));
            }));
        }
        function expectsError(stackStartFn, actual, error, message) {
            if ("string" === typeof error) {
                if (4 === arguments.length) throw new ERR_INVALID_ARG_TYPE("error", [ "Object", "Error", "Function", "RegExp" ], error);
                if ("object" === _typeof(actual) && null !== actual) {
                    if (actual.message === error) throw new ERR_AMBIGUOUS_ARGUMENT("error/message", 'The error message "'.concat(actual.message, '" is identical to the message.'));
                } else if (actual === error) throw new ERR_AMBIGUOUS_ARGUMENT("error/message", 'The error "'.concat(actual, '" is identical to the message.'));
                message = error;
                error = void 0;
            } else if (null != error && "object" !== _typeof(error) && "function" !== typeof error) throw new ERR_INVALID_ARG_TYPE("error", [ "Object", "Error", "Function", "RegExp" ], error);
            if (actual === NO_EXCEPTION_SENTINEL) {
                var details = "";
                if (error && error.name) details += " (".concat(error.name, ")");
                details += message ? ": ".concat(message) : ".";
                var fnType = "rejects" === stackStartFn.name ? "rejection" : "exception";
                innerFail({
                    actual: void 0,
                    expected: error,
                    operator: stackStartFn.name,
                    message: "Missing expected ".concat(fnType).concat(details),
                    stackStartFn
                });
            }
            if (error && !expectedException(actual, error, message, stackStartFn)) throw actual;
        }
        function expectsNoError(stackStartFn, actual, error, message) {
            if (actual === NO_EXCEPTION_SENTINEL) return;
            if ("string" === typeof error) {
                message = error;
                error = void 0;
            }
            if (!error || expectedException(actual, error)) {
                var details = message ? ": ".concat(message) : ".";
                var fnType = "doesNotReject" === stackStartFn.name ? "rejection" : "exception";
                innerFail({
                    actual,
                    expected: error,
                    operator: stackStartFn.name,
                    message: "Got unwanted ".concat(fnType).concat(details, "\n") + 'Actual message: "'.concat(actual && actual.message, '"'),
                    stackStartFn
                });
            }
            throw actual;
        }
        assert.throws = function throws(promiseFn) {
            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) args[_key2 - 1] = arguments[_key2];
            expectsError.apply(void 0, [ throws, getActual(promiseFn) ].concat(args));
        };
        assert.rejects = function rejects(promiseFn) {
            for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) args[_key3 - 1] = arguments[_key3];
            return waitForActual(promiseFn).then((function(result) {
                return expectsError.apply(void 0, [ rejects, result ].concat(args));
            }));
        };
        assert.doesNotThrow = function doesNotThrow(fn) {
            for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) args[_key4 - 1] = arguments[_key4];
            expectsNoError.apply(void 0, [ doesNotThrow, getActual(fn) ].concat(args));
        };
        assert.doesNotReject = function doesNotReject(fn) {
            for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) args[_key5 - 1] = arguments[_key5];
            return waitForActual(fn).then((function(result) {
                return expectsNoError.apply(void 0, [ doesNotReject, result ].concat(args));
            }));
        };
        assert.ifError = function ifError(err) {
            if (null !== err && void 0 !== err) {
                var message = "ifError got unwanted exception: ";
                if ("object" === _typeof(err) && "string" === typeof err.message) if (0 === err.message.length && err.constructor) message += err.constructor.name; else message += err.message; else message += inspect(err);
                var newErr = new AssertionError({
                    actual: err,
                    expected: null,
                    operator: "ifError",
                    message,
                    stackStartFn: ifError
                });
                var origStack = err.stack;
                if ("string" === typeof origStack) {
                    var tmp2 = origStack.split("\n");
                    tmp2.shift();
                    var tmp1 = newErr.stack.split("\n");
                    for (var i = 0; i < tmp2.length; i++) {
                        var pos = tmp1.indexOf(tmp2[i]);
                        if (-1 !== pos) {
                            tmp1 = tmp1.slice(0, pos);
                            break;
                        }
                    }
                    newErr.stack = "".concat(tmp1.join("\n"), "\n").concat(tmp2.join("\n"));
                }
                throw newErr;
            }
        };
        function strict() {
            for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) args[_key6] = arguments[_key6];
            innerOk.apply(void 0, [ strict, args.length ].concat(args));
        }
        assert.strict = objectAssign(strict, assert, {
            equal: assert.strictEqual,
            deepEqual: assert.deepStrictEqual,
            notEqual: assert.notStrictEqual,
            notDeepEqual: assert.notDeepStrictEqual
        });
        assert.strict.strict = assert.strict;
    },
    7366: (module, __unused_webpack_exports, __webpack_require__) => {
        "use strict";
        function _objectSpread(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = null != arguments[i] ? arguments[i] : {};
                var ownKeys = Object.keys(source);
                if ("function" === typeof Object.getOwnPropertySymbols) ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter((function(sym) {
                    return Object.getOwnPropertyDescriptor(source, sym).enumerable;
                })));
                ownKeys.forEach((function(key) {
                    _defineProperty(target, key, source[key]);
                }));
            }
            return target;
        }
        function _defineProperty(obj, key, value) {
            if (key in obj) Object.defineProperty(obj, key, {
                value,
                enumerable: true,
                configurable: true,
                writable: true
            }); else obj[key] = value;
            return obj;
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps) _defineProperties(Constructor.prototype, protoProps);
            if (staticProps) _defineProperties(Constructor, staticProps);
            return Constructor;
        }
        function _possibleConstructorReturn(self, call) {
            if (call && ("object" === _typeof(call) || "function" === typeof call)) return call;
            return _assertThisInitialized(self);
        }
        function _assertThisInitialized(self) {
            if (void 0 === self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return self;
        }
        function _inherits(subClass, superClass) {
            if ("function" !== typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function");
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    writable: true,
                    configurable: true
                }
            });
            if (superClass) _setPrototypeOf(subClass, superClass);
        }
        function _wrapNativeSuper(Class) {
            var _cache = "function" === typeof Map ? new Map : void 0;
            _wrapNativeSuper = function(Class) {
                if (null === Class || !_isNativeFunction(Class)) return Class;
                if ("function" !== typeof Class) throw new TypeError("Super expression must either be null or a function");
                if ("undefined" !== typeof _cache) {
                    if (_cache.has(Class)) return _cache.get(Class);
                    _cache.set(Class, Wrapper);
                }
                function Wrapper() {
                    return _construct(Class, arguments, _getPrototypeOf(this).constructor);
                }
                Wrapper.prototype = Object.create(Class.prototype, {
                    constructor: {
                        value: Wrapper,
                        enumerable: false,
                        writable: true,
                        configurable: true
                    }
                });
                return _setPrototypeOf(Wrapper, Class);
            };
            return _wrapNativeSuper(Class);
        }
        function isNativeReflectConstruct() {
            if ("undefined" === typeof Reflect || !Reflect.construct) return false;
            if (Reflect.construct.sham) return false;
            if ("function" === typeof Proxy) return true;
            try {
                Date.prototype.toString.call(Reflect.construct(Date, [], (function() {})));
                return true;
            } catch (e) {
                return false;
            }
        }
        function _construct(Parent, args, Class) {
            if (isNativeReflectConstruct()) _construct = Reflect.construct; else _construct = function(Parent, args, Class) {
                var a = [ null ];
                a.push.apply(a, args);
                var Constructor = Function.bind.apply(Parent, a);
                var instance = new Constructor;
                if (Class) _setPrototypeOf(instance, Class.prototype);
                return instance;
            };
            return _construct.apply(null, arguments);
        }
        function _isNativeFunction(fn) {
            return -1 !== Function.toString.call(fn).indexOf("[native code]");
        }
        function _setPrototypeOf(o, p) {
            _setPrototypeOf = Object.setPrototypeOf || function(o, p) {
                o.__proto__ = p;
                return o;
            };
            return _setPrototypeOf(o, p);
        }
        function _getPrototypeOf(o) {
            _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function(o) {
                return o.__proto__ || Object.getPrototypeOf(o);
            };
            return _getPrototypeOf(o);
        }
        function _typeof(obj) {
            if ("function" === typeof Symbol && "symbol" === typeof Symbol.iterator) _typeof = function(obj) {
                return typeof obj;
            }; else _typeof = function(obj) {
                return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            return _typeof(obj);
        }
        var _require = __webpack_require__(1323), inspect = _require.inspect;
        var _require2 = __webpack_require__(1404), ERR_INVALID_ARG_TYPE = _require2.codes.ERR_INVALID_ARG_TYPE;
        function endsWith(str, search, this_len) {
            if (void 0 === this_len || this_len > str.length) this_len = str.length;
            return str.substring(this_len - search.length, this_len) === search;
        }
        function repeat(str, count) {
            count = Math.floor(count);
            if (0 == str.length || 0 == count) return "";
            var maxCount = str.length * count;
            count = Math.floor(Math.log(count) / Math.log(2));
            while (count) {
                str += str;
                count--;
            }
            str += str.substring(0, maxCount - str.length);
            return str;
        }
        var blue = "";
        var green = "";
        var red = "";
        var white = "";
        var kReadableOperator = {
            deepStrictEqual: "Expected values to be strictly deep-equal:",
            strictEqual: "Expected values to be strictly equal:",
            strictEqualObject: 'Expected "actual" to be reference-equal to "expected":',
            deepEqual: "Expected values to be loosely deep-equal:",
            equal: "Expected values to be loosely equal:",
            notDeepStrictEqual: 'Expected "actual" not to be strictly deep-equal to:',
            notStrictEqual: 'Expected "actual" to be strictly unequal to:',
            notStrictEqualObject: 'Expected "actual" not to be reference-equal to "expected":',
            notDeepEqual: 'Expected "actual" not to be loosely deep-equal to:',
            notEqual: 'Expected "actual" to be loosely unequal to:',
            notIdentical: "Values identical but not reference-equal:"
        };
        var kMaxShortLength = 10;
        function copyError(source) {
            var keys = Object.keys(source);
            var target = Object.create(Object.getPrototypeOf(source));
            keys.forEach((function(key) {
                target[key] = source[key];
            }));
            Object.defineProperty(target, "message", {
                value: source.message
            });
            return target;
        }
        function inspectValue(val) {
            return inspect(val, {
                compact: false,
                customInspect: false,
                depth: 1e3,
                maxArrayLength: 1 / 0,
                showHidden: false,
                breakLength: 1 / 0,
                showProxy: false,
                sorted: true,
                getters: true
            });
        }
        function createErrDiff(actual, expected, operator) {
            var other = "";
            var res = "";
            var lastPos = 0;
            var end = "";
            var skipped = false;
            var actualInspected = inspectValue(actual);
            var actualLines = actualInspected.split("\n");
            var expectedLines = inspectValue(expected).split("\n");
            var i = 0;
            var indicator = "";
            if ("strictEqual" === operator && "object" === _typeof(actual) && "object" === _typeof(expected) && null !== actual && null !== expected) operator = "strictEqualObject";
            if (1 === actualLines.length && 1 === expectedLines.length && actualLines[0] !== expectedLines[0]) {
                var inputLength = actualLines[0].length + expectedLines[0].length;
                if (inputLength <= kMaxShortLength) {
                    if (("object" !== _typeof(actual) || null === actual) && ("object" !== _typeof(expected) || null === expected) && (0 !== actual || 0 !== expected)) return "".concat(kReadableOperator[operator], "\n\n") + "".concat(actualLines[0], " !== ").concat(expectedLines[0], "\n");
                } else if ("strictEqualObject" !== operator) {
                    var maxLength = {}.stderr && {}.stderr.isTTY ? {}.stderr.columns : 80;
                    if (inputLength < maxLength) {
                        while (actualLines[0][i] === expectedLines[0][i]) i++;
                        if (i > 2) {
                            indicator = "\n  ".concat(repeat(" ", i), "^");
                            i = 0;
                        }
                    }
                }
            }
            var a = actualLines[actualLines.length - 1];
            var b = expectedLines[expectedLines.length - 1];
            while (a === b) {
                if (i++ < 2) end = "\n  ".concat(a).concat(end); else other = a;
                actualLines.pop();
                expectedLines.pop();
                if (0 === actualLines.length || 0 === expectedLines.length) break;
                a = actualLines[actualLines.length - 1];
                b = expectedLines[expectedLines.length - 1];
            }
            var maxLines = Math.max(actualLines.length, expectedLines.length);
            if (0 === maxLines) {
                var _actualLines = actualInspected.split("\n");
                if (_actualLines.length > 30) {
                    _actualLines[26] = "".concat(blue, "...").concat(white);
                    while (_actualLines.length > 27) _actualLines.pop();
                }
                return "".concat(kReadableOperator.notIdentical, "\n\n").concat(_actualLines.join("\n"), "\n");
            }
            if (i > 3) {
                end = "\n".concat(blue, "...").concat(white).concat(end);
                skipped = true;
            }
            if ("" !== other) {
                end = "\n  ".concat(other).concat(end);
                other = "";
            }
            var printedLines = 0;
            var msg = kReadableOperator[operator] + "\n".concat(green, "+ actual").concat(white, " ").concat(red, "- expected").concat(white);
            var skippedMsg = " ".concat(blue, "...").concat(white, " Lines skipped");
            for (i = 0; i < maxLines; i++) {
                var cur = i - lastPos;
                if (actualLines.length < i + 1) {
                    if (cur > 1 && i > 2) {
                        if (cur > 4) {
                            res += "\n".concat(blue, "...").concat(white);
                            skipped = true;
                        } else if (cur > 3) {
                            res += "\n  ".concat(expectedLines[i - 2]);
                            printedLines++;
                        }
                        res += "\n  ".concat(expectedLines[i - 1]);
                        printedLines++;
                    }
                    lastPos = i;
                    other += "\n".concat(red, "-").concat(white, " ").concat(expectedLines[i]);
                    printedLines++;
                } else if (expectedLines.length < i + 1) {
                    if (cur > 1 && i > 2) {
                        if (cur > 4) {
                            res += "\n".concat(blue, "...").concat(white);
                            skipped = true;
                        } else if (cur > 3) {
                            res += "\n  ".concat(actualLines[i - 2]);
                            printedLines++;
                        }
                        res += "\n  ".concat(actualLines[i - 1]);
                        printedLines++;
                    }
                    lastPos = i;
                    res += "\n".concat(green, "+").concat(white, " ").concat(actualLines[i]);
                    printedLines++;
                } else {
                    var expectedLine = expectedLines[i];
                    var actualLine = actualLines[i];
                    var divergingLines = actualLine !== expectedLine && (!endsWith(actualLine, ",") || actualLine.slice(0, -1) !== expectedLine);
                    if (divergingLines && endsWith(expectedLine, ",") && expectedLine.slice(0, -1) === actualLine) {
                        divergingLines = false;
                        actualLine += ",";
                    }
                    if (divergingLines) {
                        if (cur > 1 && i > 2) {
                            if (cur > 4) {
                                res += "\n".concat(blue, "...").concat(white);
                                skipped = true;
                            } else if (cur > 3) {
                                res += "\n  ".concat(actualLines[i - 2]);
                                printedLines++;
                            }
                            res += "\n  ".concat(actualLines[i - 1]);
                            printedLines++;
                        }
                        lastPos = i;
                        res += "\n".concat(green, "+").concat(white, " ").concat(actualLine);
                        other += "\n".concat(red, "-").concat(white, " ").concat(expectedLine);
                        printedLines += 2;
                    } else {
                        res += other;
                        other = "";
                        if (1 === cur || 0 === i) {
                            res += "\n  ".concat(actualLine);
                            printedLines++;
                        }
                    }
                }
                if (printedLines > 20 && i < maxLines - 2) return "".concat(msg).concat(skippedMsg, "\n").concat(res, "\n").concat(blue, "...").concat(white).concat(other, "\n") + "".concat(blue, "...").concat(white);
            }
            return "".concat(msg).concat(skipped ? skippedMsg : "", "\n").concat(res).concat(other).concat(end).concat(indicator);
        }
        var AssertionError = function(_Error) {
            _inherits(AssertionError, _Error);
            function AssertionError(options) {
                var _this;
                _classCallCheck(this, AssertionError);
                if ("object" !== _typeof(options) || null === options) throw new ERR_INVALID_ARG_TYPE("options", "Object", options);
                var message = options.message, operator = options.operator, stackStartFn = options.stackStartFn;
                var actual = options.actual, expected = options.expected;
                var limit = Error.stackTraceLimit;
                Error.stackTraceLimit = 0;
                if (null != message) _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError).call(this, String(message))); else {
                    if ({}.stderr && {}.stderr.isTTY) if ({}.stderr && {}.stderr.getColorDepth && 1 !== {}.stderr.getColorDepth()) {
                        blue = "[34m";
                        green = "[32m";
                        white = "[39m";
                        red = "[31m";
                    } else {
                        blue = "";
                        green = "";
                        white = "";
                        red = "";
                    }
                    if ("object" === _typeof(actual) && null !== actual && "object" === _typeof(expected) && null !== expected && "stack" in actual && actual instanceof Error && "stack" in expected && expected instanceof Error) {
                        actual = copyError(actual);
                        expected = copyError(expected);
                    }
                    if ("deepStrictEqual" === operator || "strictEqual" === operator) _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError).call(this, createErrDiff(actual, expected, operator))); else if ("notDeepStrictEqual" === operator || "notStrictEqual" === operator) {
                        var base = kReadableOperator[operator];
                        var res = inspectValue(actual).split("\n");
                        if ("notStrictEqual" === operator && "object" === _typeof(actual) && null !== actual) base = kReadableOperator.notStrictEqualObject;
                        if (res.length > 30) {
                            res[26] = "".concat(blue, "...").concat(white);
                            while (res.length > 27) res.pop();
                        }
                        if (1 === res.length) _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError).call(this, "".concat(base, " ").concat(res[0]))); else _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError).call(this, "".concat(base, "\n\n").concat(res.join("\n"), "\n")));
                    } else {
                        var _res = inspectValue(actual);
                        var other = "";
                        var knownOperators = kReadableOperator[operator];
                        if ("notDeepEqual" === operator || "notEqual" === operator) {
                            _res = "".concat(kReadableOperator[operator], "\n\n").concat(_res);
                            if (_res.length > 1024) _res = "".concat(_res.slice(0, 1021), "...");
                        } else {
                            other = "".concat(inspectValue(expected));
                            if (_res.length > 512) _res = "".concat(_res.slice(0, 509), "...");
                            if (other.length > 512) other = "".concat(other.slice(0, 509), "...");
                            if ("deepEqual" === operator || "equal" === operator) _res = "".concat(knownOperators, "\n\n").concat(_res, "\n\nshould equal\n\n"); else other = " ".concat(operator, " ").concat(other);
                        }
                        _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError).call(this, "".concat(_res).concat(other)));
                    }
                }
                Error.stackTraceLimit = limit;
                _this.generatedMessage = !message;
                Object.defineProperty(_assertThisInitialized(_this), "name", {
                    value: "AssertionError [ERR_ASSERTION]",
                    enumerable: false,
                    writable: true,
                    configurable: true
                });
                _this.code = "ERR_ASSERTION";
                _this.actual = actual;
                _this.expected = expected;
                _this.operator = operator;
                if (Error.captureStackTrace) Error.captureStackTrace(_assertThisInitialized(_this), stackStartFn);
                _this.stack;
                _this.name = "AssertionError";
                return _possibleConstructorReturn(_this);
            }
            _createClass(AssertionError, [ {
                key: "toString",
                value: function() {
                    return "".concat(this.name, " [").concat(this.code, "]: ").concat(this.message);
                }
            }, {
                key: inspect.custom,
                value: function(recurseTimes, ctx) {
                    return inspect(this, _objectSpread({}, ctx, {
                        customInspect: false,
                        depth: 0
                    }));
                }
            } ]);
            return AssertionError;
        }(_wrapNativeSuper(Error));
        module.exports = AssertionError;
    },
    1404: (module, __unused_webpack_exports, __webpack_require__) => {
        "use strict";
        function _typeof(obj) {
            if ("function" === typeof Symbol && "symbol" === typeof Symbol.iterator) _typeof = function(obj) {
                return typeof obj;
            }; else _typeof = function(obj) {
                return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            return _typeof(obj);
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        function _possibleConstructorReturn(self, call) {
            if (call && ("object" === _typeof(call) || "function" === typeof call)) return call;
            return _assertThisInitialized(self);
        }
        function _assertThisInitialized(self) {
            if (void 0 === self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return self;
        }
        function _getPrototypeOf(o) {
            _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function(o) {
                return o.__proto__ || Object.getPrototypeOf(o);
            };
            return _getPrototypeOf(o);
        }
        function _inherits(subClass, superClass) {
            if ("function" !== typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function");
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    writable: true,
                    configurable: true
                }
            });
            if (superClass) _setPrototypeOf(subClass, superClass);
        }
        function _setPrototypeOf(o, p) {
            _setPrototypeOf = Object.setPrototypeOf || function(o, p) {
                o.__proto__ = p;
                return o;
            };
            return _setPrototypeOf(o, p);
        }
        var codes = {};
        var assert;
        var util;
        function createErrorType(code, message, Base) {
            if (!Base) Base = Error;
            function getMessage(arg1, arg2, arg3) {
                if ("string" === typeof message) return message; else return message(arg1, arg2, arg3);
            }
            var NodeError = function(_Base) {
                _inherits(NodeError, _Base);
                function NodeError(arg1, arg2, arg3) {
                    var _this;
                    _classCallCheck(this, NodeError);
                    _this = _possibleConstructorReturn(this, _getPrototypeOf(NodeError).call(this, getMessage(arg1, arg2, arg3)));
                    _this.code = code;
                    return _this;
                }
                return NodeError;
            }(Base);
            codes[code] = NodeError;
        }
        function oneOf(expected, thing) {
            if (Array.isArray(expected)) {
                var len = expected.length;
                expected = expected.map((function(i) {
                    return String(i);
                }));
                if (len > 2) return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(", "), ", or ") + expected[len - 1]; else if (2 === len) return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]); else return "of ".concat(thing, " ").concat(expected[0]);
            } else return "of ".concat(thing, " ").concat(String(expected));
        }
        function startsWith(str, search, pos) {
            return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
        }
        function endsWith(str, search, this_len) {
            if (void 0 === this_len || this_len > str.length) this_len = str.length;
            return str.substring(this_len - search.length, this_len) === search;
        }
        function includes(str, search, start) {
            if ("number" !== typeof start) start = 0;
            if (start + search.length > str.length) return false; else return -1 !== str.indexOf(search, start);
        }
        createErrorType("ERR_AMBIGUOUS_ARGUMENT", 'The "%s" argument is ambiguous. %s', TypeError);
        createErrorType("ERR_INVALID_ARG_TYPE", (function(name, expected, actual) {
            if (void 0 === assert) assert = __webpack_require__(9619);
            assert("string" === typeof name, "'name' must be a string");
            var determiner;
            if ("string" === typeof expected && startsWith(expected, "not ")) {
                determiner = "must not be";
                expected = expected.replace(/^not /, "");
            } else determiner = "must be";
            var msg;
            if (endsWith(name, " argument")) msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, "type")); else {
                var type = includes(name, ".") ? "property" : "argument";
                msg = 'The "'.concat(name, '" ').concat(type, " ").concat(determiner, " ").concat(oneOf(expected, "type"));
            }
            msg += ". Received type ".concat(_typeof(actual));
            return msg;
        }), TypeError);
        createErrorType("ERR_INVALID_ARG_VALUE", (function(name, value) {
            var reason = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "is invalid";
            if (void 0 === util) util = __webpack_require__(1323);
            var inspected = util.inspect(value);
            if (inspected.length > 128) inspected = "".concat(inspected.slice(0, 128), "...");
            return "The argument '".concat(name, "' ").concat(reason, ". Received ").concat(inspected);
        }), TypeError, RangeError);
        createErrorType("ERR_INVALID_RETURN_VALUE", (function(input, name, value) {
            var type;
            if (value && value.constructor && value.constructor.name) type = "instance of ".concat(value.constructor.name); else type = "type ".concat(_typeof(value));
            return "Expected ".concat(input, ' to be returned from the "').concat(name, '"') + " function but got ".concat(type, ".");
        }), TypeError);
        createErrorType("ERR_MISSING_ARGS", (function() {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
            if (void 0 === assert) assert = __webpack_require__(9619);
            assert(args.length > 0, "At least one arg needs to be specified");
            var msg = "The ";
            var len = args.length;
            args = args.map((function(a) {
                return '"'.concat(a, '"');
            }));
            switch (len) {
              case 1:
                msg += "".concat(args[0], " argument");
                break;

              case 2:
                msg += "".concat(args[0], " and ").concat(args[1], " arguments");
                break;

              default:
                msg += args.slice(0, len - 1).join(", ");
                msg += ", and ".concat(args[len - 1], " arguments");
                break;
            }
            return "".concat(msg, " must be specified");
        }), TypeError);
        module.exports.codes = codes;
    },
    118: (module, __unused_webpack_exports, __webpack_require__) => {
        "use strict";
        function _slicedToArray(arr, i) {
            return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
        }
        function _nonIterableRest() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
        }
        function _iterableToArrayLimit(arr, i) {
            var _arr = [];
            var _n = true;
            var _d = false;
            var _e = void 0;
            try {
                for (var _s, _i = arr[Symbol.iterator](); !(_n = (_s = _i.next()).done); _n = true) {
                    _arr.push(_s.value);
                    if (i && _arr.length === i) break;
                }
            } catch (err) {
                _d = true;
                _e = err;
            } finally {
                try {
                    if (!_n && null != _i["return"]) _i["return"]();
                } finally {
                    if (_d) throw _e;
                }
            }
            return _arr;
        }
        function _arrayWithHoles(arr) {
            if (Array.isArray(arr)) return arr;
        }
        function _typeof(obj) {
            if ("function" === typeof Symbol && "symbol" === typeof Symbol.iterator) _typeof = function(obj) {
                return typeof obj;
            }; else _typeof = function(obj) {
                return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            return _typeof(obj);
        }
        var regexFlagsSupported = void 0 !== /a/g.flags;
        var arrayFromSet = function(set) {
            var array = [];
            set.forEach((function(value) {
                return array.push(value);
            }));
            return array;
        };
        var arrayFromMap = function(map) {
            var array = [];
            map.forEach((function(value, key) {
                return array.push([ key, value ]);
            }));
            return array;
        };
        var objectIs = Object.is ? Object.is : __webpack_require__(3822);
        var objectGetOwnPropertySymbols = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols : function() {
            return [];
        };
        var numberIsNaN = Number.isNaN ? Number.isNaN : __webpack_require__(4866);
        function uncurryThis(f) {
            return f.call.bind(f);
        }
        var hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty);
        var propertyIsEnumerable = uncurryThis(Object.prototype.propertyIsEnumerable);
        var objectToString = uncurryThis(Object.prototype.toString);
        var _require$types = __webpack_require__(1323).types, isAnyArrayBuffer = _require$types.isAnyArrayBuffer, isArrayBufferView = _require$types.isArrayBufferView, isDate = _require$types.isDate, isMap = _require$types.isMap, isRegExp = _require$types.isRegExp, isSet = _require$types.isSet, isNativeError = _require$types.isNativeError, isBoxedPrimitive = _require$types.isBoxedPrimitive, isNumberObject = _require$types.isNumberObject, isStringObject = _require$types.isStringObject, isBooleanObject = _require$types.isBooleanObject, isBigIntObject = _require$types.isBigIntObject, isSymbolObject = _require$types.isSymbolObject, isFloat32Array = _require$types.isFloat32Array, isFloat64Array = _require$types.isFloat64Array;
        function isNonIndex(key) {
            if (0 === key.length || key.length > 10) return true;
            for (var i = 0; i < key.length; i++) {
                var code = key.charCodeAt(i);
                if (code < 48 || code > 57) return true;
            }
            return 10 === key.length && key >= Math.pow(2, 32);
        }
        function getOwnNonIndexProperties(value) {
            return Object.keys(value).filter(isNonIndex).concat(objectGetOwnPropertySymbols(value).filter(Object.prototype.propertyIsEnumerable.bind(value)));
        }
        function compare(a, b) {
            if (a === b) return 0;
            var x = a.length;
            var y = b.length;
            for (var i = 0, len = Math.min(x, y); i < len; ++i) if (a[i] !== b[i]) {
                x = a[i];
                y = b[i];
                break;
            }
            if (x < y) return -1;
            if (y < x) return 1;
            return 0;
        }
        var ONLY_ENUMERABLE = void 0;
        var kStrict = true;
        var kLoose = false;
        var kNoIterator = 0;
        var kIsArray = 1;
        var kIsSet = 2;
        var kIsMap = 3;
        function areSimilarRegExps(a, b) {
            return regexFlagsSupported ? a.source === b.source && a.flags === b.flags : RegExp.prototype.toString.call(a) === RegExp.prototype.toString.call(b);
        }
        function areSimilarFloatArrays(a, b) {
            if (a.byteLength !== b.byteLength) return false;
            for (var offset = 0; offset < a.byteLength; offset++) if (a[offset] !== b[offset]) return false;
            return true;
        }
        function areSimilarTypedArrays(a, b) {
            if (a.byteLength !== b.byteLength) return false;
            return 0 === compare(new Uint8Array(a.buffer, a.byteOffset, a.byteLength), new Uint8Array(b.buffer, b.byteOffset, b.byteLength));
        }
        function areEqualArrayBuffers(buf1, buf2) {
            return buf1.byteLength === buf2.byteLength && 0 === compare(new Uint8Array(buf1), new Uint8Array(buf2));
        }
        function isEqualBoxedPrimitive(val1, val2) {
            if (isNumberObject(val1)) return isNumberObject(val2) && objectIs(Number.prototype.valueOf.call(val1), Number.prototype.valueOf.call(val2));
            if (isStringObject(val1)) return isStringObject(val2) && String.prototype.valueOf.call(val1) === String.prototype.valueOf.call(val2);
            if (isBooleanObject(val1)) return isBooleanObject(val2) && Boolean.prototype.valueOf.call(val1) === Boolean.prototype.valueOf.call(val2);
            if (isBigIntObject(val1)) return isBigIntObject(val2) && BigInt.prototype.valueOf.call(val1) === BigInt.prototype.valueOf.call(val2);
            return isSymbolObject(val2) && Symbol.prototype.valueOf.call(val1) === Symbol.prototype.valueOf.call(val2);
        }
        function innerDeepEqual(val1, val2, strict, memos) {
            if (val1 === val2) {
                if (0 !== val1) return true;
                return strict ? objectIs(val1, val2) : true;
            }
            if (strict) {
                if ("object" !== _typeof(val1)) return "number" === typeof val1 && numberIsNaN(val1) && numberIsNaN(val2);
                if ("object" !== _typeof(val2) || null === val1 || null === val2) return false;
                if (Object.getPrototypeOf(val1) !== Object.getPrototypeOf(val2)) return false;
            } else {
                if (null === val1 || "object" !== _typeof(val1)) {
                    if (null === val2 || "object" !== _typeof(val2)) return val1 == val2;
                    return false;
                }
                if (null === val2 || "object" !== _typeof(val2)) return false;
            }
            var val1Tag = objectToString(val1);
            var val2Tag = objectToString(val2);
            if (val1Tag !== val2Tag) return false;
            if (Array.isArray(val1)) {
                if (val1.length !== val2.length) return false;
                var keys1 = getOwnNonIndexProperties(val1, ONLY_ENUMERABLE);
                var keys2 = getOwnNonIndexProperties(val2, ONLY_ENUMERABLE);
                if (keys1.length !== keys2.length) return false;
                return keyCheck(val1, val2, strict, memos, kIsArray, keys1);
            }
            if ("[object Object]" === val1Tag) if (!isMap(val1) && isMap(val2) || !isSet(val1) && isSet(val2)) return false;
            if (isDate(val1)) {
                if (!isDate(val2) || Date.prototype.getTime.call(val1) !== Date.prototype.getTime.call(val2)) return false;
            } else if (isRegExp(val1)) {
                if (!isRegExp(val2) || !areSimilarRegExps(val1, val2)) return false;
            } else if (isNativeError(val1) || val1 instanceof Error) {
                if (val1.message !== val2.message || val1.name !== val2.name) return false;
            } else if (isArrayBufferView(val1)) {
                if (!strict && (isFloat32Array(val1) || isFloat64Array(val1))) {
                    if (!areSimilarFloatArrays(val1, val2)) return false;
                } else if (!areSimilarTypedArrays(val1, val2)) return false;
                var _keys = getOwnNonIndexProperties(val1, ONLY_ENUMERABLE);
                var _keys2 = getOwnNonIndexProperties(val2, ONLY_ENUMERABLE);
                if (_keys.length !== _keys2.length) return false;
                return keyCheck(val1, val2, strict, memos, kNoIterator, _keys);
            } else if (isSet(val1)) {
                if (!isSet(val2) || val1.size !== val2.size) return false;
                return keyCheck(val1, val2, strict, memos, kIsSet);
            } else if (isMap(val1)) {
                if (!isMap(val2) || val1.size !== val2.size) return false;
                return keyCheck(val1, val2, strict, memos, kIsMap);
            } else if (isAnyArrayBuffer(val1)) {
                if (!areEqualArrayBuffers(val1, val2)) return false;
            } else if (isBoxedPrimitive(val1) && !isEqualBoxedPrimitive(val1, val2)) return false;
            return keyCheck(val1, val2, strict, memos, kNoIterator);
        }
        function getEnumerables(val, keys) {
            return keys.filter((function(k) {
                return propertyIsEnumerable(val, k);
            }));
        }
        function keyCheck(val1, val2, strict, memos, iterationType, aKeys) {
            if (5 === arguments.length) {
                aKeys = Object.keys(val1);
                var bKeys = Object.keys(val2);
                if (aKeys.length !== bKeys.length) return false;
            }
            var i = 0;
            for (;i < aKeys.length; i++) if (!hasOwnProperty(val2, aKeys[i])) return false;
            if (strict && 5 === arguments.length) {
                var symbolKeysA = objectGetOwnPropertySymbols(val1);
                if (0 !== symbolKeysA.length) {
                    var count = 0;
                    for (i = 0; i < symbolKeysA.length; i++) {
                        var key = symbolKeysA[i];
                        if (propertyIsEnumerable(val1, key)) {
                            if (!propertyIsEnumerable(val2, key)) return false;
                            aKeys.push(key);
                            count++;
                        } else if (propertyIsEnumerable(val2, key)) return false;
                    }
                    var symbolKeysB = objectGetOwnPropertySymbols(val2);
                    if (symbolKeysA.length !== symbolKeysB.length && getEnumerables(val2, symbolKeysB).length !== count) return false;
                } else {
                    var _symbolKeysB = objectGetOwnPropertySymbols(val2);
                    if (0 !== _symbolKeysB.length && 0 !== getEnumerables(val2, _symbolKeysB).length) return false;
                }
            }
            if (0 === aKeys.length && (iterationType === kNoIterator || iterationType === kIsArray && 0 === val1.length || 0 === val1.size)) return true;
            if (void 0 === memos) memos = {
                val1: new Map,
                val2: new Map,
                position: 0
            }; else {
                var val2MemoA = memos.val1.get(val1);
                if (void 0 !== val2MemoA) {
                    var val2MemoB = memos.val2.get(val2);
                    if (void 0 !== val2MemoB) return val2MemoA === val2MemoB;
                }
                memos.position++;
            }
            memos.val1.set(val1, memos.position);
            memos.val2.set(val2, memos.position);
            var areEq = objEquiv(val1, val2, strict, aKeys, memos, iterationType);
            memos.val1.delete(val1);
            memos.val2.delete(val2);
            return areEq;
        }
        function setHasEqualElement(set, val1, strict, memo) {
            var setValues = arrayFromSet(set);
            for (var i = 0; i < setValues.length; i++) {
                var val2 = setValues[i];
                if (innerDeepEqual(val1, val2, strict, memo)) {
                    set.delete(val2);
                    return true;
                }
            }
            return false;
        }
        function findLooseMatchingPrimitives(prim) {
            switch (_typeof(prim)) {
              case "undefined":
                return null;

              case "object":
                return;

              case "symbol":
                return false;

              case "string":
                prim = +prim;

              case "number":
                if (numberIsNaN(prim)) return false;
            }
            return true;
        }
        function setMightHaveLoosePrim(a, b, prim) {
            var altValue = findLooseMatchingPrimitives(prim);
            if (null != altValue) return altValue;
            return b.has(altValue) && !a.has(altValue);
        }
        function mapMightHaveLoosePrim(a, b, prim, item, memo) {
            var altValue = findLooseMatchingPrimitives(prim);
            if (null != altValue) return altValue;
            var curB = b.get(altValue);
            if (void 0 === curB && !b.has(altValue) || !innerDeepEqual(item, curB, false, memo)) return false;
            return !a.has(altValue) && innerDeepEqual(item, curB, false, memo);
        }
        function setEquiv(a, b, strict, memo) {
            var set = null;
            var aValues = arrayFromSet(a);
            for (var i = 0; i < aValues.length; i++) {
                var val = aValues[i];
                if ("object" === _typeof(val) && null !== val) {
                    if (null === set) set = new Set;
                    set.add(val);
                } else if (!b.has(val)) {
                    if (strict) return false;
                    if (!setMightHaveLoosePrim(a, b, val)) return false;
                    if (null === set) set = new Set;
                    set.add(val);
                }
            }
            if (null !== set) {
                var bValues = arrayFromSet(b);
                for (var _i = 0; _i < bValues.length; _i++) {
                    var _val = bValues[_i];
                    if ("object" === _typeof(_val) && null !== _val) {
                        if (!setHasEqualElement(set, _val, strict, memo)) return false;
                    } else if (!strict && !a.has(_val) && !setHasEqualElement(set, _val, strict, memo)) return false;
                }
                return 0 === set.size;
            }
            return true;
        }
        function mapHasEqualEntry(set, map, key1, item1, strict, memo) {
            var setValues = arrayFromSet(set);
            for (var i = 0; i < setValues.length; i++) {
                var key2 = setValues[i];
                if (innerDeepEqual(key1, key2, strict, memo) && innerDeepEqual(item1, map.get(key2), strict, memo)) {
                    set.delete(key2);
                    return true;
                }
            }
            return false;
        }
        function mapEquiv(a, b, strict, memo) {
            var set = null;
            var aEntries = arrayFromMap(a);
            for (var i = 0; i < aEntries.length; i++) {
                var _aEntries$i = _slicedToArray(aEntries[i], 2), key = _aEntries$i[0], item1 = _aEntries$i[1];
                if ("object" === _typeof(key) && null !== key) {
                    if (null === set) set = new Set;
                    set.add(key);
                } else {
                    var item2 = b.get(key);
                    if (void 0 === item2 && !b.has(key) || !innerDeepEqual(item1, item2, strict, memo)) {
                        if (strict) return false;
                        if (!mapMightHaveLoosePrim(a, b, key, item1, memo)) return false;
                        if (null === set) set = new Set;
                        set.add(key);
                    }
                }
            }
            if (null !== set) {
                var bEntries = arrayFromMap(b);
                for (var _i2 = 0; _i2 < bEntries.length; _i2++) {
                    var _bEntries$_i = _slicedToArray(bEntries[_i2], 2), item = (key = _bEntries$_i[0], 
                    _bEntries$_i[1]);
                    if ("object" === _typeof(key) && null !== key) {
                        if (!mapHasEqualEntry(set, a, key, item, strict, memo)) return false;
                    } else if (!strict && (!a.has(key) || !innerDeepEqual(a.get(key), item, false, memo)) && !mapHasEqualEntry(set, a, key, item, false, memo)) return false;
                }
                return 0 === set.size;
            }
            return true;
        }
        function objEquiv(a, b, strict, keys, memos, iterationType) {
            var i = 0;
            if (iterationType === kIsSet) {
                if (!setEquiv(a, b, strict, memos)) return false;
            } else if (iterationType === kIsMap) {
                if (!mapEquiv(a, b, strict, memos)) return false;
            } else if (iterationType === kIsArray) for (;i < a.length; i++) if (hasOwnProperty(a, i)) {
                if (!hasOwnProperty(b, i) || !innerDeepEqual(a[i], b[i], strict, memos)) return false;
            } else if (hasOwnProperty(b, i)) return false; else {
                var keysA = Object.keys(a);
                for (;i < keysA.length; i++) {
                    var key = keysA[i];
                    if (!hasOwnProperty(b, key) || !innerDeepEqual(a[key], b[key], strict, memos)) return false;
                }
                if (keysA.length !== Object.keys(b).length) return false;
                return true;
            }
            for (i = 0; i < keys.length; i++) {
                var _key = keys[i];
                if (!innerDeepEqual(a[_key], b[_key], strict, memos)) return false;
            }
            return true;
        }
        function isDeepEqual(val1, val2) {
            return innerDeepEqual(val1, val2, kLoose);
        }
        function isDeepStrictEqual(val1, val2) {
            return innerDeepEqual(val1, val2, kStrict);
        }
        module.exports = {
            isDeepEqual,
            isDeepStrictEqual
        };
    },
    4327: function(module, exports, __webpack_require__) {
        var __WEBPACK_AMD_DEFINE_RESULT__;
        (function($) {
            "use strict";
            function safeAdd(x, y) {
                var lsw = (65535 & x) + (65535 & y);
                var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
                return msw << 16 | 65535 & lsw;
            }
            function bitRotateLeft(num, cnt) {
                return num << cnt | num >>> 32 - cnt;
            }
            function md5cmn(q, a, b, x, s, t) {
                return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
            }
            function md5ff(a, b, c, d, x, s, t) {
                return md5cmn(b & c | ~b & d, a, b, x, s, t);
            }
            function md5gg(a, b, c, d, x, s, t) {
                return md5cmn(b & d | c & ~d, a, b, x, s, t);
            }
            function md5hh(a, b, c, d, x, s, t) {
                return md5cmn(b ^ c ^ d, a, b, x, s, t);
            }
            function md5ii(a, b, c, d, x, s, t) {
                return md5cmn(c ^ (b | ~d), a, b, x, s, t);
            }
            function binlMD5(x, len) {
                x[len >> 5] |= 128 << len % 32;
                x[(len + 64 >>> 9 << 4) + 14] = len;
                var i;
                var olda;
                var oldb;
                var oldc;
                var oldd;
                var a = 1732584193;
                var b = -271733879;
                var c = -1732584194;
                var d = 271733878;
                for (i = 0; i < x.length; i += 16) {
                    olda = a;
                    oldb = b;
                    oldc = c;
                    oldd = d;
                    a = md5ff(a, b, c, d, x[i], 7, -680876936);
                    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
                    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
                    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
                    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
                    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
                    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
                    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
                    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
                    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
                    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
                    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
                    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
                    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
                    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
                    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
                    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
                    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
                    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
                    b = md5gg(b, c, d, a, x[i], 20, -373897302);
                    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
                    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
                    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
                    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
                    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
                    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
                    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
                    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
                    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
                    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
                    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
                    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
                    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
                    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
                    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
                    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
                    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
                    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
                    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
                    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
                    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
                    d = md5hh(d, a, b, c, x[i], 11, -358537222);
                    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
                    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
                    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
                    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
                    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
                    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
                    a = md5ii(a, b, c, d, x[i], 6, -198630844);
                    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
                    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
                    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
                    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
                    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
                    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
                    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
                    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
                    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
                    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
                    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
                    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
                    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
                    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
                    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
                    a = safeAdd(a, olda);
                    b = safeAdd(b, oldb);
                    c = safeAdd(c, oldc);
                    d = safeAdd(d, oldd);
                }
                return [ a, b, c, d ];
            }
            function binl2rstr(input) {
                var i;
                var output = "";
                var length32 = 32 * input.length;
                for (i = 0; i < length32; i += 8) output += String.fromCharCode(input[i >> 5] >>> i % 32 & 255);
                return output;
            }
            function rstr2binl(input) {
                var i;
                var output = [];
                output[(input.length >> 2) - 1] = void 0;
                for (i = 0; i < output.length; i += 1) output[i] = 0;
                var length8 = 8 * input.length;
                for (i = 0; i < length8; i += 8) output[i >> 5] |= (255 & input.charCodeAt(i / 8)) << i % 32;
                return output;
            }
            function rstrMD5(s) {
                return binl2rstr(binlMD5(rstr2binl(s), 8 * s.length));
            }
            function rstrHMACMD5(key, data) {
                var i;
                var bkey = rstr2binl(key);
                var ipad = [];
                var opad = [];
                var hash;
                ipad[15] = opad[15] = void 0;
                if (bkey.length > 16) bkey = binlMD5(bkey, 8 * key.length);
                for (i = 0; i < 16; i += 1) {
                    ipad[i] = 909522486 ^ bkey[i];
                    opad[i] = 1549556828 ^ bkey[i];
                }
                hash = binlMD5(ipad.concat(rstr2binl(data)), 512 + 8 * data.length);
                return binl2rstr(binlMD5(opad.concat(hash), 512 + 128));
            }
            function rstr2hex(input) {
                var hexTab = "0123456789abcdef";
                var output = "";
                var x;
                var i;
                for (i = 0; i < input.length; i += 1) {
                    x = input.charCodeAt(i);
                    output += hexTab.charAt(x >>> 4 & 15) + hexTab.charAt(15 & x);
                }
                return output;
            }
            function str2rstrUTF8(input) {
                return unescape(encodeURIComponent(input));
            }
            function rawMD5(s) {
                return rstrMD5(str2rstrUTF8(s));
            }
            function hexMD5(s) {
                return rstr2hex(rawMD5(s));
            }
            function rawHMACMD5(k, d) {
                return rstrHMACMD5(str2rstrUTF8(k), str2rstrUTF8(d));
            }
            function hexHMACMD5(k, d) {
                return rstr2hex(rawHMACMD5(k, d));
            }
            function md5(string, key, raw) {
                if (!key) {
                    if (!raw) return hexMD5(string);
                    return rawMD5(string);
                }
                if (!raw) return hexHMACMD5(key, string);
                return rawHMACMD5(key, string);
            }
            if (true) !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
                return md5;
            }.call(exports, __webpack_require__, exports, module), void 0 !== __WEBPACK_AMD_DEFINE_RESULT__ && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
        })();
    },
    2737: (module, __unused_webpack_exports, __webpack_require__) => {
        "use strict";
        var GetIntrinsic = __webpack_require__(8750);
        var callBind = __webpack_require__(4573);
        var $indexOf = callBind(GetIntrinsic("String.prototype.indexOf"));
        module.exports = function(name, allowMissing) {
            var intrinsic = GetIntrinsic(name, !!allowMissing);
            if ("function" === typeof intrinsic && $indexOf(name, ".prototype.") > -1) return callBind(intrinsic);
            return intrinsic;
        };
    },
    4573: (module, __unused_webpack_exports, __webpack_require__) => {
        "use strict";
        var bind = __webpack_require__(132);
        var GetIntrinsic = __webpack_require__(8750);
        var $apply = GetIntrinsic("%Function.prototype.apply%");
        var $call = GetIntrinsic("%Function.prototype.call%");
        var $reflectApply = GetIntrinsic("%Reflect.apply%", true) || bind.call($call, $apply);
        var $gOPD = GetIntrinsic("%Object.getOwnPropertyDescriptor%", true);
        var $defineProperty = GetIntrinsic("%Object.defineProperty%", true);
        var $max = GetIntrinsic("%Math.max%");
        if ($defineProperty) try {
            $defineProperty({}, "a", {
                value: 1
            });
        } catch (e) {
            $defineProperty = null;
        }
        module.exports = function(originalFunction) {
            var func = $reflectApply(bind, $call, arguments);
            if ($gOPD && $defineProperty) {
                var desc = $gOPD(func, "length");
                if (desc.configurable) $defineProperty(func, "length", {
                    value: 1 + $max(0, originalFunction.length - (arguments.length - 1))
                });
            }
            return func;
        };
        var applyBind = function() {
            return $reflectApply(bind, $apply, arguments);
        };
        if ($defineProperty) $defineProperty(module.exports, "apply", {
            value: applyBind
        }); else module.exports.apply = applyBind;
    },
    6415: module => {
        function debounce(func, wait, immediate) {
            var timeout, args, context, timestamp, result;
            if (null == wait) wait = 100;
            function later() {
                var last = Date.now() - timestamp;
                if (last < wait && last >= 0) timeout = setTimeout(later, wait - last); else {
                    timeout = null;
                    if (!immediate) {
                        result = func.apply(context, args);
                        context = args = null;
                    }
                }
            }
            var debounced = function() {
                context = this;
                args = arguments;
                timestamp = Date.now();
                var callNow = immediate && !timeout;
                if (!timeout) timeout = setTimeout(later, wait);
                if (callNow) {
                    result = func.apply(context, args);
                    context = args = null;
                }
                return result;
            };
            debounced.clear = function() {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
            };
            debounced.flush = function() {
                if (timeout) {
                    result = func.apply(context, args);
                    context = args = null;
                    clearTimeout(timeout);
                    timeout = null;
                }
            };
            return debounced;
        }
        debounce.debounce = debounce;
        module.exports = debounce;
    },
    5862: module => {
        var s = 1e3;
        var m = 60 * s;
        var h = 60 * m;
        var d = 24 * h;
        var w = 7 * d;
        var y = 365.25 * d;
        module.exports = function(val, options) {
            options = options || {};
            var type = typeof val;
            if ("string" === type && val.length > 0) return parse(val); else if ("number" === type && isFinite(val)) return options.long ? fmtLong(val) : fmtShort(val);
            throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
        };
        function parse(str) {
            str = String(str);
            if (str.length > 100) return;
            var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
            if (!match) return;
            var n = parseFloat(match[1]);
            var type = (match[2] || "ms").toLowerCase();
            switch (type) {
              case "years":
              case "year":
              case "yrs":
              case "yr":
              case "y":
                return n * y;

              case "weeks":
              case "week":
              case "w":
                return n * w;

              case "days":
              case "day":
              case "d":
                return n * d;

              case "hours":
              case "hour":
              case "hrs":
              case "hr":
              case "h":
                return n * h;

              case "minutes":
              case "minute":
              case "mins":
              case "min":
              case "m":
                return n * m;

              case "seconds":
              case "second":
              case "secs":
              case "sec":
              case "s":
                return n * s;

              case "milliseconds":
              case "millisecond":
              case "msecs":
              case "msec":
              case "ms":
                return n;

              default:
                return;
            }
        }
        function fmtShort(ms) {
            var msAbs = Math.abs(ms);
            if (msAbs >= d) return Math.round(ms / d) + "d";
            if (msAbs >= h) return Math.round(ms / h) + "h";
            if (msAbs >= m) return Math.round(ms / m) + "m";
            if (msAbs >= s) return Math.round(ms / s) + "s";
            return ms + "ms";
        }
        function fmtLong(ms) {
            var msAbs = Math.abs(ms);
            if (msAbs >= d) return plural(ms, msAbs, d, "day");
            if (msAbs >= h) return plural(ms, msAbs, h, "hour");
            if (msAbs >= m) return plural(ms, msAbs, m, "minute");
            if (msAbs >= s) return plural(ms, msAbs, s, "second");
            return ms + " ms";
        }
        function plural(ms, msAbs, n, name) {
            var isPlural = msAbs >= 1.5 * n;
            return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
        }
    },
    6292: (module, exports, __webpack_require__) => {
        exports.formatArgs = formatArgs;
        exports.save = save;
        exports.load = load;
        exports.useColors = useColors;
        exports.storage = localstorage();
        exports.destroy = (() => {
            let warned = false;
            return () => {
                if (!warned) {
                    warned = true;
                    console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
                }
            };
        })();
        exports.colors = [ "#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33" ];
        function useColors() {
            if (true && window.process && ("renderer" === window.process.type || window.process.__nwjs)) return true;
            if ("undefined" !== typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) return false;
            return "undefined" !== typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || true && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" !== typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" !== typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
        }
        function formatArgs(args) {
            args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
            if (!this.useColors) return;
            const c = "color: " + this.color;
            args.splice(1, 0, c, "color: inherit");
            let index = 0;
            let lastC = 0;
            args[0].replace(/%[a-zA-Z%]/g, (match => {
                if ("%%" === match) return;
                index++;
                if ("%c" === match) lastC = index;
            }));
            args.splice(lastC, 0, c);
        }
        exports.log = console.debug || console.log || (() => {});
        function save(namespaces) {
            try {
                if (namespaces) exports.storage.setItem("debug", namespaces); else exports.storage.removeItem("debug");
            } catch (error) {}
        }
        function load() {
            let r;
            try {
                r = exports.storage.getItem("debug");
            } catch (error) {}
            if (!r && "object" !== "undefined" && "env" in {}) r = {
                NODE_ENV: "production",
                COCONUT: "false",
                EDGE: "false",
                FIREFOX: "true",
                IS_AXE_PRO: "false",
                MANIFEST_VERSION: 2,
                E2E: false,
                DOCS_SITE_URL: "https://docs.deque.com/devtools-html",
                ISSUES_URL: "https://docs.deque.com/issue-help/1.0.0/en",
                AXE_CONFIG_URL: "https://docs.deque.com/devtools-server/4.0.0/en/axe-configuration",
                MANUAL_ISSUE_URL: "https://docs.deque.com/devtools-html/4.0.0/en/devtools-manual-issue",
                WHATS_LEFT_TO_TEST_URL: "https://docs.deque.com/devtools-html/4.0.0/en/devtools-whatslefttotest",
                USER_FLOW_URL: "https://docs.deque.com/devtools-html/4.0.0/en/user-flow-analysis",
                AXE_PRO_TRIAL_PATH: "/axe-devtools-pro/trial",
                ENV: "production",
                AXE_PRO_URL: "https://axe.deque.com",
                USAGE_SERVICE_URL: "https://usage.deque.com",
                AMPLITUDE_API_KEY: "a1ce09d0b14ddcc12ab7b508b6606a2f",
                DATADOG_CLIENT_TOKEN: "puba2eb4ed47c6eb69ce20ef237db754ff8"
            }.DEBUG;
            return r;
        }
        function localstorage() {
            try {
                return localStorage;
            } catch (error) {}
        }
        module.exports = __webpack_require__(9374)(exports);
        const {formatters} = module.exports;
        formatters.j = function(v) {
            try {
                return JSON.stringify(v);
            } catch (error) {
                return "[UnexpectedJSONParseError]: " + error.message;
            }
        };
    },
    9374: (module, __unused_webpack_exports, __webpack_require__) => {
        function setup(env) {
            createDebug.debug = createDebug;
            createDebug.default = createDebug;
            createDebug.coerce = coerce;
            createDebug.disable = disable;
            createDebug.enable = enable;
            createDebug.enabled = enabled;
            createDebug.humanize = __webpack_require__(5862);
            createDebug.destroy = destroy;
            Object.keys(env).forEach((key => {
                createDebug[key] = env[key];
            }));
            createDebug.names = [];
            createDebug.skips = [];
            createDebug.formatters = {};
            function selectColor(namespace) {
                let hash = 0;
                for (let i = 0; i < namespace.length; i++) {
                    hash = (hash << 5) - hash + namespace.charCodeAt(i);
                    hash |= 0;
                }
                return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
            }
            createDebug.selectColor = selectColor;
            function createDebug(namespace) {
                let prevTime;
                let enableOverride = null;
                let namespacesCache;
                let enabledCache;
                function debug(...args) {
                    if (!debug.enabled) return;
                    const self = debug;
                    const curr = Number(new Date);
                    const ms = curr - (prevTime || curr);
                    self.diff = ms;
                    self.prev = prevTime;
                    self.curr = curr;
                    prevTime = curr;
                    args[0] = createDebug.coerce(args[0]);
                    if ("string" !== typeof args[0]) args.unshift("%O");
                    let index = 0;
                    args[0] = args[0].replace(/%([a-zA-Z%])/g, ((match, format) => {
                        if ("%%" === match) return "%";
                        index++;
                        const formatter = createDebug.formatters[format];
                        if ("function" === typeof formatter) {
                            const val = args[index];
                            match = formatter.call(self, val);
                            args.splice(index, 1);
                            index--;
                        }
                        return match;
                    }));
                    createDebug.formatArgs.call(self, args);
                    const logFn = self.log || createDebug.log;
                    logFn.apply(self, args);
                }
                debug.namespace = namespace;
                debug.useColors = createDebug.useColors();
                debug.color = createDebug.selectColor(namespace);
                debug.extend = extend;
                debug.destroy = createDebug.destroy;
                Object.defineProperty(debug, "enabled", {
                    enumerable: true,
                    configurable: false,
                    get: () => {
                        if (null !== enableOverride) return enableOverride;
                        if (namespacesCache !== createDebug.namespaces) {
                            namespacesCache = createDebug.namespaces;
                            enabledCache = createDebug.enabled(namespace);
                        }
                        return enabledCache;
                    },
                    set: v => {
                        enableOverride = v;
                    }
                });
                if ("function" === typeof createDebug.init) createDebug.init(debug);
                return debug;
            }
            function extend(namespace, delimiter) {
                const newDebug = createDebug(this.namespace + ("undefined" === typeof delimiter ? ":" : delimiter) + namespace);
                newDebug.log = this.log;
                return newDebug;
            }
            function enable(namespaces) {
                createDebug.save(namespaces);
                createDebug.namespaces = namespaces;
                createDebug.names = [];
                createDebug.skips = [];
                let i;
                const split = ("string" === typeof namespaces ? namespaces : "").split(/[\s,]+/);
                const len = split.length;
                for (i = 0; i < len; i++) {
                    if (!split[i]) continue;
                    namespaces = split[i].replace(/\*/g, ".*?");
                    if ("-" === namespaces[0]) createDebug.skips.push(new RegExp("^" + namespaces.slice(1) + "$")); else createDebug.names.push(new RegExp("^" + namespaces + "$"));
                }
            }
            function disable() {
                const namespaces = [ ...createDebug.names.map(toNamespace), ...createDebug.skips.map(toNamespace).map((namespace => "-" + namespace)) ].join(",");
                createDebug.enable("");
                return namespaces;
            }
            function enabled(name) {
                if ("*" === name[name.length - 1]) return true;
                let i;
                let len;
                for (i = 0, len = createDebug.skips.length; i < len; i++) if (createDebug.skips[i].test(name)) return false;
                for (i = 0, len = createDebug.names.length; i < len; i++) if (createDebug.names[i].test(name)) return true;
                return false;
            }
            function toNamespace(regexp) {
                return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
            }
            function coerce(val) {
                if (val instanceof Error) return val.stack || val.message;
                return val;
            }
            function destroy() {
                console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
            }
            createDebug.enable(createDebug.load());
            return createDebug;
        }
        module.exports = setup;
    },
    2741: (module, __unused_webpack_exports, __webpack_require__) => {
        "use strict";
        var objectKeys = __webpack_require__(4733);
        var isArguments = __webpack_require__(7740);
        var is = __webpack_require__(3822);
        var isRegex = __webpack_require__(2483);
        var flags = __webpack_require__(2473);
        var isArray = __webpack_require__(5182);
        var isDate = __webpack_require__(7355);
        var whichBoxedPrimitive = __webpack_require__(8574);
        var GetIntrinsic = __webpack_require__(8750);
        var callBound = __webpack_require__(2737);
        var whichCollection = __webpack_require__(3062);
        var getIterator = __webpack_require__(2395);
        var getSideChannel = __webpack_require__(5337);
        var whichTypedArray = __webpack_require__(2505);
        var assign = __webpack_require__(950);
        var $getTime = callBound("Date.prototype.getTime");
        var gPO = Object.getPrototypeOf;
        var $objToString = callBound("Object.prototype.toString");
        var $Set = GetIntrinsic("%Set%", true);
        var $mapHas = callBound("Map.prototype.has", true);
        var $mapGet = callBound("Map.prototype.get", true);
        var $mapSize = callBound("Map.prototype.size", true);
        var $setAdd = callBound("Set.prototype.add", true);
        var $setDelete = callBound("Set.prototype.delete", true);
        var $setHas = callBound("Set.prototype.has", true);
        var $setSize = callBound("Set.prototype.size", true);
        function setHasEqualElement(set, val1, opts, channel) {
            var i = getIterator(set);
            var result;
            while ((result = i.next()) && !result.done) if (internalDeepEqual(val1, result.value, opts, channel)) {
                $setDelete(set, result.value);
                return true;
            }
            return false;
        }
        function findLooseMatchingPrimitives(prim) {
            if ("undefined" === typeof prim) return null;
            if ("object" === typeof prim) return;
            if ("symbol" === typeof prim) return false;
            if ("string" === typeof prim || "number" === typeof prim) return +prim === +prim;
            return true;
        }
        function mapMightHaveLoosePrim(a, b, prim, item, opts, channel) {
            var altValue = findLooseMatchingPrimitives(prim);
            if (null != altValue) return altValue;
            var curB = $mapGet(b, altValue);
            var looseOpts = assign({}, opts, {
                strict: false
            });
            if ("undefined" === typeof curB && !$mapHas(b, altValue) || !internalDeepEqual(item, curB, looseOpts, channel)) return false;
            return !$mapHas(a, altValue) && internalDeepEqual(item, curB, looseOpts, channel);
        }
        function setMightHaveLoosePrim(a, b, prim) {
            var altValue = findLooseMatchingPrimitives(prim);
            if (null != altValue) return altValue;
            return $setHas(b, altValue) && !$setHas(a, altValue);
        }
        function mapHasEqualEntry(set, map, key1, item1, opts, channel) {
            var i = getIterator(set);
            var result;
            var key2;
            while ((result = i.next()) && !result.done) {
                key2 = result.value;
                if (internalDeepEqual(key1, key2, opts, channel) && internalDeepEqual(item1, $mapGet(map, key2), opts, channel)) {
                    $setDelete(set, key2);
                    return true;
                }
            }
            return false;
        }
        function internalDeepEqual(actual, expected, options, channel) {
            var opts = options || {};
            if (opts.strict ? is(actual, expected) : actual === expected) return true;
            var actualBoxed = whichBoxedPrimitive(actual);
            var expectedBoxed = whichBoxedPrimitive(expected);
            if (actualBoxed !== expectedBoxed) return false;
            if (!actual || !expected || "object" !== typeof actual && "object" !== typeof expected) return opts.strict ? is(actual, expected) : actual == expected;
            var hasActual = channel.has(actual);
            var hasExpected = channel.has(expected);
            var sentinel;
            if (hasActual && hasExpected) {
                if (channel.get(actual) === channel.get(expected)) return true;
            } else sentinel = {};
            if (!hasActual) channel.set(actual, sentinel);
            if (!hasExpected) channel.set(expected, sentinel);
            return objEquiv(actual, expected, opts, channel);
        }
        function isBuffer(x) {
            if (!x || "object" !== typeof x || "number" !== typeof x.length) return false;
            if ("function" !== typeof x.copy || "function" !== typeof x.slice) return false;
            if (x.length > 0 && "number" !== typeof x[0]) return false;
            return !!(x.constructor && x.constructor.isBuffer && x.constructor.isBuffer(x));
        }
        function setEquiv(a, b, opts, channel) {
            if ($setSize(a) !== $setSize(b)) return false;
            var iA = getIterator(a);
            var iB = getIterator(b);
            var resultA;
            var resultB;
            var set;
            while ((resultA = iA.next()) && !resultA.done) if (resultA.value && "object" === typeof resultA.value) {
                if (!set) set = new $Set;
                $setAdd(set, resultA.value);
            } else if (!$setHas(b, resultA.value)) {
                if (opts.strict) return false;
                if (!setMightHaveLoosePrim(a, b, resultA.value)) return false;
                if (!set) set = new $Set;
                $setAdd(set, resultA.value);
            }
            if (set) {
                while ((resultB = iB.next()) && !resultB.done) if (resultB.value && "object" === typeof resultB.value) {
                    if (!setHasEqualElement(set, resultB.value, opts.strict, channel)) return false;
                } else if (!opts.strict && !$setHas(a, resultB.value) && !setHasEqualElement(set, resultB.value, opts.strict, channel)) return false;
                return 0 === $setSize(set);
            }
            return true;
        }
        function mapEquiv(a, b, opts, channel) {
            if ($mapSize(a) !== $mapSize(b)) return false;
            var iA = getIterator(a);
            var iB = getIterator(b);
            var resultA;
            var resultB;
            var set;
            var key;
            var item1;
            var item2;
            while ((resultA = iA.next()) && !resultA.done) {
                key = resultA.value[0];
                item1 = resultA.value[1];
                if (key && "object" === typeof key) {
                    if (!set) set = new $Set;
                    $setAdd(set, key);
                } else {
                    item2 = $mapGet(b, key);
                    if ("undefined" === typeof item2 && !$mapHas(b, key) || !internalDeepEqual(item1, item2, opts, channel)) {
                        if (opts.strict) return false;
                        if (!mapMightHaveLoosePrim(a, b, key, item1, opts, channel)) return false;
                        if (!set) set = new $Set;
                        $setAdd(set, key);
                    }
                }
            }
            if (set) {
                while ((resultB = iB.next()) && !resultB.done) {
                    key = resultB.value[0];
                    item2 = resultB.value[1];
                    if (key && "object" === typeof key) {
                        if (!mapHasEqualEntry(set, a, key, item2, opts, channel)) return false;
                    } else if (!opts.strict && (!a.has(key) || !internalDeepEqual($mapGet(a, key), item2, opts, channel)) && !mapHasEqualEntry(set, a, key, item2, assign({}, opts, {
                        strict: false
                    }), channel)) return false;
                }
                return 0 === $setSize(set);
            }
            return true;
        }
        function objEquiv(a, b, opts, channel) {
            var i, key;
            if (typeof a !== typeof b) return false;
            if (null == a || null == b) return false;
            if ($objToString(a) !== $objToString(b)) return false;
            if (isArguments(a) !== isArguments(b)) return false;
            var aIsArray = isArray(a);
            var bIsArray = isArray(b);
            if (aIsArray !== bIsArray) return false;
            var aIsError = a instanceof Error;
            var bIsError = b instanceof Error;
            if (aIsError !== bIsError) return false;
            if (aIsError || bIsError) if (a.name !== b.name || a.message !== b.message) return false;
            var aIsRegex = isRegex(a);
            var bIsRegex = isRegex(b);
            if (aIsRegex !== bIsRegex) return false;
            if ((aIsRegex || bIsRegex) && (a.source !== b.source || flags(a) !== flags(b))) return false;
            var aIsDate = isDate(a);
            var bIsDate = isDate(b);
            if (aIsDate !== bIsDate) return false;
            if (aIsDate || bIsDate) if ($getTime(a) !== $getTime(b)) return false;
            if (opts.strict && gPO && gPO(a) !== gPO(b)) return false;
            if (whichTypedArray(a) !== whichTypedArray(b)) return false;
            var aIsBuffer = isBuffer(a);
            var bIsBuffer = isBuffer(b);
            if (aIsBuffer !== bIsBuffer) return false;
            if (aIsBuffer || bIsBuffer) {
                if (a.length !== b.length) return false;
                for (i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
                return true;
            }
            if (typeof a !== typeof b) return false;
            var ka = objectKeys(a);
            var kb = objectKeys(b);
            if (ka.length !== kb.length) return false;
            ka.sort();
            kb.sort();
            for (i = ka.length - 1; i >= 0; i--) if (ka[i] != kb[i]) return false;
            for (i = ka.length - 1; i >= 0; i--) {
                key = ka[i];
                if (!internalDeepEqual(a[key], b[key], opts, channel)) return false;
            }
            var aCollection = whichCollection(a);
            var bCollection = whichCollection(b);
            if (aCollection !== bCollection) return false;
            if ("Set" === aCollection || "Set" === bCollection) return setEquiv(a, b, opts, channel);
            if ("Map" === aCollection) return mapEquiv(a, b, opts, channel);
            return true;
        }
        module.exports = function(a, b, opts) {
            return internalDeepEqual(a, b, opts, getSideChannel());
        };
    },
    7392: (module, __unused_webpack_exports, __webpack_require__) => {
        "use strict";
        var keys = __webpack_require__(4733);
        var hasSymbols = "function" === typeof Symbol && "symbol" === typeof Symbol("foo");
        var toStr = Object.prototype.toString;
        var concat = Array.prototype.concat;
        var origDefineProperty = Object.defineProperty;
        var isFunction = function(fn) {
            return "function" === typeof fn && "[object Function]" === toStr.call(fn);
        };
        var arePropertyDescriptorsSupported = function() {
            var obj = {};
            try {
                origDefineProperty(obj, "x", {
                    enumerable: false,
                    value: obj
                });
                for (var _ in obj) return false;
                return obj.x === obj;
            } catch (e) {
                return false;
            }
        };
        var supportsDescriptors = origDefineProperty && arePropertyDescriptorsSupported();
        var defineProperty = function(object, name, value, predicate) {
            if (name in object && (!isFunction(predicate) || !predicate())) return;
            if (supportsDescriptors) origDefineProperty(object, name, {
                configurable: true,
                enumerable: false,
                value,
                writable: true
            }); else object[name] = value;
        };
        var defineProperties = function(object, map) {
            var predicates = arguments.length > 2 ? arguments[2] : {};
            var props = keys(map);
            if (hasSymbols) props = concat.call(props, Object.getOwnPropertySymbols(map));
            for (var i = 0; i < props.length; i += 1) defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
        };
        defineProperties.supportsDescriptors = !!supportsDescriptors;
        module.exports = defineProperties;
    },
    6371: (module, __unused_webpack_exports, __webpack_require__) => {
        "use strict";
        var GetIntrinsic = __webpack_require__(8750);
        var $gOPD = GetIntrinsic("%Object.getOwnPropertyDescriptor%");
        if ($gOPD) try {
            $gOPD([], "length");
        } catch (e) {
            $gOPD = null;
        }
        module.exports = $gOPD;
    },
    2607: (__unused_webpack_module, exports) => {
        "use strict";
        ({
            value: true
        });
        var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        function _toConsumableArray(arr) {
            if (Array.isArray(arr)) {
                for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
                return arr2;
            } else return Array.from(arr);
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        var typeInfoRegex = /^:([a-z])(\(([^)]+)\))?/;
        var formatOptionNumeric = "numeric";
        var formatOptionLong = "long";
        var formatOption2Digit = "2-digit";
        var typeString = "string";
        var typeNumber = "number";
        var typeDate = "date";
        var numberStyleDecimal = "decimal";
        var numberStyleCurrency = "currency";
        var numberStylePercent = "percent";
        var configD = {
            weekday: void 0,
            era: void 0,
            year: formatOptionNumeric,
            month: formatOptionNumeric,
            day: formatOptionNumeric,
            hour: void 0,
            minute: void 0,
            second: void 0,
            timeZoneName: void 0
        };
        var configD_cap = {
            weekday: formatOptionLong,
            era: void 0,
            year: formatOptionNumeric,
            month: formatOptionLong,
            day: formatOptionNumeric,
            hour: void 0,
            minute: void 0,
            second: void 0,
            timeZoneName: void 0
        };
        var configF = {
            weekday: formatOptionLong,
            era: void 0,
            year: formatOptionNumeric,
            month: formatOptionLong,
            day: formatOptionNumeric,
            hour: formatOptionNumeric,
            minute: formatOption2Digit,
            second: void 0,
            timeZoneName: void 0
        };
        var configF_cap = {
            weekday: formatOptionLong,
            era: void 0,
            year: formatOptionNumeric,
            month: formatOptionLong,
            day: formatOptionNumeric,
            hour: formatOptionNumeric,
            minute: formatOption2Digit,
            second: formatOption2Digit,
            timeZoneName: void 0
        };
        var configG = {
            weekday: void 0,
            era: void 0,
            year: formatOptionNumeric,
            month: formatOptionNumeric,
            day: formatOptionNumeric,
            hour: formatOptionNumeric,
            minute: formatOption2Digit,
            second: void 0,
            timeZoneName: void 0
        };
        var configG_cap = {
            weekday: void 0,
            era: void 0,
            year: formatOptionNumeric,
            month: formatOptionNumeric,
            day: formatOptionNumeric,
            hour: formatOptionNumeric,
            minute: formatOption2Digit,
            second: formatOption2Digit,
            timeZoneName: void 0
        };
        var configM = {
            weekday: void 0,
            era: void 0,
            year: void 0,
            month: formatOptionLong,
            day: formatOptionNumeric,
            hour: void 0,
            minute: void 0,
            second: void 0,
            timeZoneName: void 0
        };
        var configT = {
            weekday: void 0,
            era: void 0,
            year: void 0,
            month: void 0,
            day: void 0,
            hour: formatOptionNumeric,
            minute: formatOption2Digit,
            second: void 0,
            timeZoneName: void 0
        };
        var configT_cap = {
            weekday: void 0,
            era: void 0,
            year: void 0,
            month: void 0,
            day: void 0,
            hour: formatOptionNumeric,
            minute: formatOption2Digit,
            second: formatOption2Digit,
            timeZoneName: void 0
        };
        var configY = {
            weekday: void 0,
            era: void 0,
            year: formatOptionNumeric,
            month: formatOptionLong,
            day: void 0,
            hour: void 0,
            minute: void 0,
            second: void 0,
            timeZoneName: void 0
        };
        var standardFormatSettings = {
            d: configD,
            D: configD_cap,
            f: configF,
            F: configF_cap,
            g: configG,
            G: configG_cap,
            m: configM,
            M: configM,
            t: configT,
            T: configT_cap,
            y: configY,
            Y: configY
        };
        var Tag = function() {
            function Tag() {
                var _this = this;
                _classCallCheck(this, Tag);
                this.defaultConfig = {
                    locales: void 0,
                    translations: {},
                    number: {
                        currency: "USD"
                    },
                    date: {},
                    string: {}
                };
                this.configs = {
                    "": this.defaultConfig
                };
                this.translationCache = {};
                this.keyCache = {};
                this.typeInfoCache = {};
                this._localizers = {
                    s: function(config, v, format) {
                        var formatted = void 0;
                        if (format && null !== (formatted = _this._runCustomFormatters(config, typeString, format, v))) return formatted;
                        if (v) return v.toLocaleString(config.locales);
                        return String(v);
                    },
                    n: function(config, v, format) {
                        if ("number" !== typeof v) throw Error("value is not a number. type: " + ("undefined" === typeof v ? "undefined" : _typeof(v)));
                        if (format) {
                            var fractionalDigits = parseInt(format);
                            if (!isNaN(fractionalDigits)) return v.toLocaleString(config.locales, Object.assign({}, config.number, {
                                style: numberStyleDecimal,
                                minimumFractionDigits: fractionalDigits,
                                maximumFractionDigits: fractionalDigits
                            }));
                            var formatted = void 0;
                            if (null !== (formatted = _this._runCustomFormatters(config, typeNumber, format, v))) return formatted;
                        }
                        return v.toLocaleString(config.locales, Object.assign({}, config.number, {
                            style: numberStyleDecimal,
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 3
                        }));
                    },
                    t: function(config, v, format) {
                        if (!(v instanceof Date)) throw Error("value is not a Date. type: " + v.constructor.name);
                        if (format) {
                            switch (format.toUpperCase()) {
                              case "R":
                                return v.toUTCString();

                              case "O":
                                return v.toISOString();
                            }
                            var formatOptions = standardFormatSettings[format];
                            if (formatOptions) return v.toLocaleString(config.locales, Object.assign({}, config.date, formatOptions)); else {
                                var formatted = _this._runCustomFormatters(config, typeDate, format, v);
                                if (null !== formatted) return formatted;
                            }
                        }
                        return v.toLocaleString(config.locales, Object.assign({}, config.date));
                    },
                    c: function(config, v, currency) {
                        if ("number" !== typeof v) throw Error("value is not a number. type: " + ("undefined" === typeof v ? "undefined" : _typeof(v)));
                        return v.toLocaleString(config.locales, currency ? Object.assign({}, config.number, {
                            style: numberStyleCurrency,
                            currency
                        }) : Object.assign({}, config.number, {
                            style: numberStyleCurrency
                        }));
                    },
                    p: function(config, v, minimumFractionDigits) {
                        if ("number" !== typeof v) throw Error("value is not a number. type: " + ("undefined" === typeof v ? "undefined" : _typeof(v)));
                        return v.toLocaleString(config.locales, minimumFractionDigits ? Object.assign({}, config.number, {
                            style: numberStylePercent,
                            minimumFractionDigits
                        }) : Object.assign({}, config.number, {
                            style: numberStylePercent
                        }));
                    }
                };
                this.i18n = this.i18n.bind(this);
                this.translate = this.translate.bind(this);
                this.i18nConfig = this.i18nConfig.bind(this);
                this._localize = this._localize.bind(this);
                this._extractTypeInfo = this._extractTypeInfo.bind(this);
            }
            _createClass(Tag, [ {
                key: "i18nConfig",
                value: function(_ref) {
                    var locales = _ref.locales, translations = _ref.translations, group = _ref.group, number = _ref.number, date = _ref.date, standardFormatters = _ref.standardFormatters;
                    this.translationCache = {};
                    var currentConfig = this.configs[group || ""] || this.defaultConfig;
                    this.configs[group || ""] = Object.assign({}, currentConfig, {
                        locales: locales || currentConfig.locales,
                        translations: translations || currentConfig.translations,
                        number: number || currentConfig.number,
                        date: date || currentConfig.date,
                        standardFormatters: standardFormatters || currentConfig.standardFormatters
                    });
                }
            }, {
                key: "i18n",
                value: function(group, config, literals) {
                    var _this2 = this;
                    var translationKey = this._buildKey(literals);
                    var _getCachedTranslation2 = this._getCachedTranslation(group, config, translationKey), configGroup = _getCachedTranslation2.configGroup, translatedKey = _getCachedTranslation2.translatedKey;
                    var typeInfoForValues = literals.slice(1).map(this._extractTypeInfo);
                    for (var _len = arguments.length, values = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) values[_key - 3] = arguments[_key];
                    var localizedValues = values.map((function(v, i) {
                        return _this2._localize(configGroup, v, typeInfoForValues[i]);
                    }));
                    return this._buildMessage.apply(this, [ translatedKey ].concat(_toConsumableArray(localizedValues)));
                }
            }, {
                key: "translate",
                value: function(group, config, key) {
                    var _this3 = this;
                    if ("undefined" === typeof key || null === key) key = ""; else if ("string" !== typeof key) key = String(key);
                    var _getCachedTranslation3 = this._getCachedTranslation(group, config, key), configGroup = _getCachedTranslation3.configGroup, translatedKey = _getCachedTranslation3.translatedKey;
                    for (var _len2 = arguments.length, values = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) values[_key2 - 3] = arguments[_key2];
                    var localizedValues = values.map((function(v) {
                        if (v instanceof Object && v.constructor === Object) return _this3._localize(configGroup, v.value || "", {
                            type: v.formatter || "s",
                            options: v.format
                        });
                        return _this3._localize(configGroup, v, {
                            type: "s",
                            options: ""
                        });
                    }));
                    return this._buildMessage.apply(this, [ translatedKey ].concat(_toConsumableArray(localizedValues)));
                }
            }, {
                key: "_getCachedTranslation",
                value: function(group, config, translationKey) {
                    var cacheKey = [ group || "", config || "", translationKey ].join();
                    var cachedTranslation = this.translationCache[cacheKey];
                    var configGroup = this.configs[config || ""] || this.defaultConfig;
                    if (cachedTranslation) return {
                        configGroup,
                        translatedKey: cachedTranslation
                    };
                    var translationString = this._getTranslation(group, configGroup, translationKey);
                    this.translationCache[cacheKey] = translationString;
                    return {
                        configGroup,
                        translatedKey: translationString
                    };
                }
            }, {
                key: "_getTranslation",
                value: function(group, configGroup, translationKey) {
                    var translations = configGroup["translations"];
                    var translationString = void 0;
                    var translationGroup = void 0;
                    if (("undefined" === typeof group ? "undefined" : _typeof(group)) === typeString) translationGroup = group;
                    if (translationGroup) {
                        translationString = translations[translationGroup];
                        if (translationString instanceof Object) translationString = translationString[translationKey];
                    }
                    if (!translationString) translationString = "string" === typeof translations[translationKey] && translations[translationKey] || translationKey;
                    return translationString;
                }
            }, {
                key: "_runCustomFormatters",
                value: function(config, type, format, value) {
                    var formatted = null;
                    if (config.standardFormatters) {
                        var formatters = config.standardFormatters[type];
                        if (formatters) {
                            var formatter = formatters[format];
                            if (formatter) formatted = formatter(config.locales, config[type], value);
                        }
                    }
                    return formatted;
                }
            }, {
                key: "_extractTypeInfo",
                value: function(literal) {
                    var typeInfo = this.typeInfoCache[literal];
                    if (typeInfo) return typeInfo;
                    var match = typeInfoRegex.exec(literal);
                    if (match) typeInfo = {
                        type: match[1],
                        options: match[3]
                    }; else typeInfo = {
                        type: "s",
                        options: ""
                    };
                    this.typeInfoCache[literal] = typeInfo;
                    return typeInfo;
                }
            }, {
                key: "_localize",
                value: function(config, value, _ref2) {
                    var type = _ref2.type, options = _ref2.options;
                    var localizer = this._localizers[type];
                    if (localizer) return localizer(config, value, options);
                    throw new Error("Type '" + type + "' is not supported. Supported types are: " + Object.keys(this._localizers).join());
                }
            }, {
                key: "_buildKey",
                value: function(literals) {
                    var cacheKey = literals.join();
                    var cachedKey = this.keyCache[cacheKey];
                    if (cachedKey) return cachedKey;
                    var stripType = function(s) {
                        return s.replace(typeInfoRegex, "");
                    };
                    var lastPartialKey = stripType(literals[literals.length - 1]);
                    var prependPartialKey = function(memo, curr, i) {
                        return stripType(curr) + "${" + i + "}" + memo;
                    };
                    var key = literals.slice(0, -1).reduceRight(prependPartialKey, lastPartialKey).replace(/\r\n/g, "\n");
                    this.keyCache[cacheKey] = key;
                    return key;
                }
            }, {
                key: "_buildMessage",
                value: function(str) {
                    for (var _len3 = arguments.length, values = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) values[_key3 - 1] = arguments[_key3];
                    return str.replace(/\${(\d)}/g, (function(_, index) {
                        return values[Number(index)];
                    }));
                }
            } ]);
            return Tag;
        }();
        var i18ntag = new Tag;
        var i18nConfig = i18ntag.i18nConfig;
        var i18n = function(literals) {
            for (var _len4 = arguments.length, values = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) values[_key4 - 1] = arguments[_key4];
            if ("string" === typeof literals) if (values.length && "string" === typeof values[0]) {
                var delegate = function(lit) {
                    for (var _len5 = arguments.length, val = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) val[_key5 - 1] = arguments[_key5];
                    return i18ntag.i18n.apply(i18ntag, [ literals, values[0], lit ].concat(val));
                };
                delegate.translate = function(key) {
                    for (var _len6 = arguments.length, val = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) val[_key6 - 1] = arguments[_key6];
                    return i18ntag.translate.apply(i18ntag, [ literals, values[0], key ].concat(val));
                };
                return delegate;
            } else {
                var _delegate = function(lit) {
                    for (var _len7 = arguments.length, val = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) val[_key7 - 1] = arguments[_key7];
                    return i18ntag.i18n.apply(i18ntag, [ literals, null, lit ].concat(val));
                };
                _delegate.translate = function(key) {
                    for (var _len8 = arguments.length, val = Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) val[_key8 - 1] = arguments[_key8];
                    return i18ntag.translate.apply(i18ntag, [ literals, null, key ].concat(val));
                };
                return _delegate;
            } else return i18ntag.i18n.apply(i18ntag, [ null, null, literals ].concat(values));
        };
        i18n.translate = function(key) {
            for (var _len9 = arguments.length, values = Array(_len9 > 1 ? _len9 - 1 : 0), _key9 = 1; _key9 < _len9; _key9++) values[_key9 - 1] = arguments[_key9];
            return i18ntag.translate.apply(i18ntag, [ null, null, key ].concat(values));
        };
        var i18nGroup = function(group, config) {
            return function(target) {
                target.prototype.i18n = function(literals) {
                    for (var _len10 = arguments.length, values = Array(_len10 > 1 ? _len10 - 1 : 0), _key10 = 1; _key10 < _len10; _key10++) values[_key10 - 1] = arguments[_key10];
                    return i18n(group, config).apply(void 0, [ literals ].concat(values));
                };
                target.prototype.i18n.translate = function(key) {
                    for (var _len11 = arguments.length, values = Array(_len11 > 1 ? _len11 - 1 : 0), _key11 = 1; _key11 < _len11; _key11++) values[_key11 - 1] = arguments[_key11];
                    return i18ntag.translate.apply(i18ntag, [ group, config, key ].concat(values));
                };
                return target;
            };
        };
        if (true) {
            window.i18n = i18n;
            window.i18nConfig = i18nConfig;
            window.i18nGroup = i18nGroup;
        }
        exports.ZP = i18n;
        exports.E3 = i18nConfig;
        i18nGroup;
    },
    2098: module => {
        "use strict";
        function assign(target, firstSource) {
            if (void 0 === target || null === target) throw new TypeError("Cannot convert first argument to object");
            var to = Object(target);
            for (var i = 1; i < arguments.length; i++) {
                var nextSource = arguments[i];
                if (void 0 === nextSource || null === nextSource) continue;
                var keysArray = Object.keys(Object(nextSource));
                for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                    var nextKey = keysArray[nextIndex];
                    var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                    if (void 0 !== desc && desc.enumerable) to[nextKey] = nextSource[nextKey];
                }
            }
            return to;
        }
        function polyfill() {
            if (!Object.assign) Object.defineProperty(Object, "assign", {
                enumerable: false,
                configurable: true,
                writable: true,
                value: assign
            });
        }
        module.exports = {
            assign,
            polyfill
        };
    },
    8372: module => {
        var hasOwn = Object.prototype.hasOwnProperty;
        var toString = Object.prototype.toString;
        module.exports = function(obj, fn, ctx) {
            if ("[object Function]" !== toString.call(fn)) throw new TypeError("iterator must be a function");
            var l = obj.length;
            if (l === +l) for (var i = 0; i < l; i++) fn.call(ctx, obj[i], i, obj); else for (var k in obj) if (hasOwn.call(obj, k)) fn.call(ctx, obj[k], k, obj);
        };
    },
    8458: module => {
        "use strict";
        var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
        var slice = Array.prototype.slice;
        var toStr = Object.prototype.toString;
        var funcType = "[object Function]";
        module.exports = function(that) {
            var target = this;
            if ("function" !== typeof target || toStr.call(target) !== funcType) throw new TypeError(ERROR_MESSAGE + target);
            var args = slice.call(arguments, 1);
            var bound;
            var binder = function() {
                if (this instanceof bound) {
                    var result = target.apply(this, args.concat(slice.call(arguments)));
                    if (Object(result) === result) return result;
                    return this;
                } else return target.apply(that, args.concat(slice.call(arguments)));
            };
            var boundLength = Math.max(0, target.length - args.length);
            var boundArgs = [];
            for (var i = 0; i < boundLength; i++) boundArgs.push("$" + i);
            bound = Function("binder", "return function (" + boundArgs.join(",") + "){ return binder.apply(this,arguments); }")(binder);
            if (target.prototype) {
                var Empty = function() {};
                Empty.prototype = target.prototype;
                bound.prototype = new Empty;
                Empty.prototype = null;
            }
            return bound;
        };
    },
    132: (module, __unused_webpack_exports, __webpack_require__) => {
        "use strict";
        var implementation = __webpack_require__(8458);
        module.exports = Function.prototype.bind || implementation;
    },
    8750: (module, __unused_webpack_exports, __webpack_require__) => {
        "use strict";
        var undefined;
        var $SyntaxError = SyntaxError;
        var $Function = Function;
        var $TypeError = TypeError;
        var getEvalledConstructor = function(expressionSyntax) {
            try {
                return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
            } catch (e) {}
        };
        var $gOPD = Object.getOwnPropertyDescriptor;
        if ($gOPD) try {
            $gOPD({}, "");
        } catch (e) {
            $gOPD = null;
        }
        var throwTypeError = function() {
            throw new $TypeError;
        };
        var ThrowTypeError = $gOPD ? function() {
            try {
                arguments.callee;
                return throwTypeError;
            } catch (calleeThrows) {
                try {
                    return $gOPD(arguments, "callee").get;
                } catch (gOPDthrows) {
                    return throwTypeError;
                }
            }
        }() : throwTypeError;
        var hasSymbols = __webpack_require__(679)();
        var getProto = Object.getPrototypeOf || function(x) {
            return x.__proto__;
        };
        var needsEval = {};
        var TypedArray = "undefined" === typeof Uint8Array ? undefined : getProto(Uint8Array);
        var INTRINSICS = {
            "%AggregateError%": "undefined" === typeof AggregateError ? undefined : AggregateError,
            "%Array%": Array,
            "%ArrayBuffer%": "undefined" === typeof ArrayBuffer ? undefined : ArrayBuffer,
            "%ArrayIteratorPrototype%": hasSymbols ? getProto([][Symbol.iterator]()) : undefined,
            "%AsyncFromSyncIteratorPrototype%": undefined,
            "%AsyncFunction%": needsEval,
            "%AsyncGenerator%": needsEval,
            "%AsyncGeneratorFunction%": needsEval,
            "%AsyncIteratorPrototype%": needsEval,
            "%Atomics%": "undefined" === typeof Atomics ? undefined : Atomics,
            "%BigInt%": "undefined" === typeof BigInt ? undefined : BigInt,
            "%Boolean%": Boolean,
            "%DataView%": "undefined" === typeof DataView ? undefined : DataView,
            "%Date%": Date,
            "%decodeURI%": decodeURI,
            "%decodeURIComponent%": decodeURIComponent,
            "%encodeURI%": encodeURI,
            "%encodeURIComponent%": encodeURIComponent,
            "%Error%": Error,
            "%eval%": eval,
            "%EvalError%": EvalError,
            "%Float32Array%": "undefined" === typeof Float32Array ? undefined : Float32Array,
            "%Float64Array%": "undefined" === typeof Float64Array ? undefined : Float64Array,
            "%FinalizationRegistry%": "undefined" === typeof FinalizationRegistry ? undefined : FinalizationRegistry,
            "%Function%": $Function,
            "%GeneratorFunction%": needsEval,
            "%Int8Array%": "undefined" === typeof Int8Array ? undefined : Int8Array,
            "%Int16Array%": "undefined" === typeof Int16Array ? undefined : Int16Array,
            "%Int32Array%": "undefined" === typeof Int32Array ? undefined : Int32Array,
            "%isFinite%": isFinite,
            "%isNaN%": isNaN,
            "%IteratorPrototype%": hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,
            "%JSON%": "object" === typeof JSON ? JSON : undefined,
            "%Map%": "undefined" === typeof Map ? undefined : Map,
            "%MapIteratorPrototype%": "undefined" === typeof Map || !hasSymbols ? undefined : getProto((new Map)[Symbol.iterator]()),
            "%Math%": Math,
            "%Number%": Number,
            "%Object%": Object,
            "%parseFloat%": parseFloat,
            "%parseInt%": parseInt,
            "%Promise%": "undefined" === typeof Promise ? undefined : Promise,
            "%Proxy%": "undefined" === typeof Proxy ? undefined : Proxy,
            "%RangeError%": RangeError,
            "%ReferenceError%": ReferenceError,
            "%Reflect%": "undefined" === typeof Reflect ? undefined : Reflect,
            "%RegExp%": RegExp,
            "%Set%": "undefined" === typeof Set ? undefined : Set,
            "%SetIteratorPrototype%": "undefined" === typeof Set || !hasSymbols ? undefined : getProto((new Set)[Symbol.iterator]()),
            "%SharedArrayBuffer%": "undefined" === typeof SharedArrayBuffer ? undefined : SharedArrayBuffer,
            "%String%": String,
            "%StringIteratorPrototype%": hasSymbols ? getProto(""[Symbol.iterator]()) : undefined,
            "%Symbol%": hasSymbols ? Symbol : undefined,
            "%SyntaxError%": $SyntaxError,
            "%ThrowTypeError%": ThrowTypeError,
            "%TypedArray%": TypedArray,
            "%TypeError%": $TypeError,
            "%Uint8Array%": "undefined" === typeof Uint8Array ? undefined : Uint8Array,
            "%Uint8ClampedArray%": "undefined" === typeof Uint8ClampedArray ? undefined : Uint8ClampedArray,
            "%Uint16Array%": "undefined" === typeof Uint16Array ? undefined : Uint16Array,
            "%Uint32Array%": "undefined" === typeof Uint32Array ? undefined : Uint32Array,
            "%URIError%": URIError,
            "%WeakMap%": "undefined" === typeof WeakMap ? undefined : WeakMap,
            "%WeakRef%": "undefined" === typeof WeakRef ? undefined : WeakRef,
            "%WeakSet%": "undefined" === typeof WeakSet ? undefined : WeakSet
        };
        var doEval = function doEval(name) {
            var value;
            if ("%AsyncFunction%" === name) value = getEvalledConstructor("async function () {}"); else if ("%GeneratorFunction%" === name) value = getEvalledConstructor("function* () {}"); else if ("%AsyncGeneratorFunction%" === name) value = getEvalledConstructor("async function* () {}"); else if ("%AsyncGenerator%" === name) {
                var fn = doEval("%AsyncGeneratorFunction%");
                if (fn) value = fn.prototype;
            } else if ("%AsyncIteratorPrototype%" === name) {
                var gen = doEval("%AsyncGenerator%");
                if (gen) value = getProto(gen.prototype);
            }
            INTRINSICS[name] = value;
            return value;
        };
        var LEGACY_ALIASES = {
            "%ArrayBufferPrototype%": [ "ArrayBuffer", "prototype" ],
            "%ArrayPrototype%": [ "Array", "prototype" ],
            "%ArrayProto_entries%": [ "Array", "prototype", "entries" ],
            "%ArrayProto_forEach%": [ "Array", "prototype", "forEach" ],
            "%ArrayProto_keys%": [ "Array", "prototype", "keys" ],
            "%ArrayProto_values%": [ "Array", "prototype", "values" ],
            "%AsyncFunctionPrototype%": [ "AsyncFunction", "prototype" ],
            "%AsyncGenerator%": [ "AsyncGeneratorFunction", "prototype" ],
            "%AsyncGeneratorPrototype%": [ "AsyncGeneratorFunction", "prototype", "prototype" ],
            "%BooleanPrototype%": [ "Boolean", "prototype" ],
            "%DataViewPrototype%": [ "DataView", "prototype" ],
            "%DatePrototype%": [ "Date", "prototype" ],
            "%ErrorPrototype%": [ "Error", "prototype" ],
            "%EvalErrorPrototype%": [ "EvalError", "prototype" ],
            "%Float32ArrayPrototype%": [ "Float32Array", "prototype" ],
            "%Float64ArrayPrototype%": [ "Float64Array", "prototype" ],
            "%FunctionPrototype%": [ "Function", "prototype" ],
            "%Generator%": [ "GeneratorFunction", "prototype" ],
            "%GeneratorPrototype%": [ "GeneratorFunction", "prototype", "prototype" ],
            "%Int8ArrayPrototype%": [ "Int8Array", "prototype" ],
            "%Int16ArrayPrototype%": [ "Int16Array", "prototype" ],
            "%Int32ArrayPrototype%": [ "Int32Array", "prototype" ],
            "%JSONParse%": [ "JSON", "parse" ],
            "%JSONStringify%": [ "JSON", "stringify" ],
            "%MapPrototype%": [ "Map", "prototype" ],
            "%NumberPrototype%": [ "Number", "prototype" ],
            "%ObjectPrototype%": [ "Object", "prototype" ],
            "%ObjProto_toString%": [ "Object", "prototype", "toString" ],
            "%ObjProto_valueOf%": [ "Object", "prototype", "valueOf" ],
            "%PromisePrototype%": [ "Promise", "prototype" ],
            "%PromiseProto_then%": [ "Promise", "prototype", "then" ],
            "%Promise_all%": [ "Promise", "all" ],
            "%Promise_reject%": [ "Promise", "reject" ],
            "%Promise_resolve%": [ "Promise", "resolve" ],
            "%RangeErrorPrototype%": [ "RangeError", "prototype" ],
            "%ReferenceErrorPrototype%": [ "ReferenceError", "prototype" ],
            "%RegExpPrototype%": [ "RegExp", "prototype" ],
            "%SetPrototype%": [ "Set", "prototype" ],
            "%SharedArrayBufferPrototype%": [ "SharedArrayBuffer", "prototype" ],
            "%StringPrototype%": [ "String", "prototype" ],
            "%SymbolPrototype%": [ "Symbol", "prototype" ],
            "%SyntaxErrorPrototype%": [ "SyntaxError", "prototype" ],
            "%TypedArrayPrototype%": [ "TypedArray", "prototype" ],
            "%TypeErrorPrototype%": [ "TypeError", "prototype" ],
            "%Uint8ArrayPrototype%": [ "Uint8Array", "prototype" ],
            "%Uint8ClampedArrayPrototype%": [ "Uint8ClampedArray", "prototype" ],
            "%Uint16ArrayPrototype%": [ "Uint16Array", "prototype" ],
            "%Uint32ArrayPrototype%": [ "Uint32Array", "prototype" ],
            "%URIErrorPrototype%": [ "URIError", "prototype" ],
            "%WeakMapPrototype%": [ "WeakMap", "prototype" ],
            "%WeakSetPrototype%": [ "WeakSet", "prototype" ]
        };
        var bind = __webpack_require__(132);
        var hasOwn = __webpack_require__(7492);
        var $concat = bind.call(Function.call, Array.prototype.concat);
        var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
        var $replace = bind.call(Function.call, String.prototype.replace);
        var $strSlice = bind.call(Function.call, String.prototype.slice);
        var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
        var reEscapeChar = /\\(\\)?/g;
        var stringToPath = function(string) {
            var first = $strSlice(string, 0, 1);
            var last = $strSlice(string, -1);
            if ("%" === first && "%" !== last) throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`"); else if ("%" === last && "%" !== first) throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
            var result = [];
            $replace(string, rePropName, (function(match, number, quote, subString) {
                result[result.length] = quote ? $replace(subString, reEscapeChar, "$1") : number || match;
            }));
            return result;
        };
        var getBaseIntrinsic = function(name, allowMissing) {
            var intrinsicName = name;
            var alias;
            if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
                alias = LEGACY_ALIASES[intrinsicName];
                intrinsicName = "%" + alias[0] + "%";
            }
            if (hasOwn(INTRINSICS, intrinsicName)) {
                var value = INTRINSICS[intrinsicName];
                if (value === needsEval) value = doEval(intrinsicName);
                if ("undefined" === typeof value && !allowMissing) throw new $TypeError("intrinsic " + name + " exists, but is not available. Please file an issue!");
                return {
                    alias,
                    name: intrinsicName,
                    value
                };
            }
            throw new $SyntaxError("intrinsic " + name + " does not exist!");
        };
        module.exports = function(name, allowMissing) {
            if ("string" !== typeof name || 0 === name.length) throw new $TypeError("intrinsic name must be a non-empty string");
            if (arguments.length > 1 && "boolean" !== typeof allowMissing) throw new $TypeError('"allowMissing" argument must be a boolean');
            var parts = stringToPath(name);
            var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
            var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
            var intrinsicRealName = intrinsic.name;
            var value = intrinsic.value;
            var skipFurtherCaching = false;
            var alias = intrinsic.alias;
            if (alias) {
                intrinsicBaseName = alias[0];
                $spliceApply(parts, $concat([ 0, 1 ], alias));
            }
            for (var i = 1, isOwn = true; i < parts.length; i += 1) {
                var part = parts[i];
                var first = $strSlice(part, 0, 1);
                var last = $strSlice(part, -1);
                if (('"' === first || "'" === first || "`" === first || '"' === last || "'" === last || "`" === last) && first !== last) throw new $SyntaxError("property names with quotes must have matching quotes");
                if ("constructor" === part || !isOwn) skipFurtherCaching = true;
                intrinsicBaseName += "." + part;
                intrinsicRealName = "%" + intrinsicBaseName + "%";
                if (hasOwn(INTRINSICS, intrinsicRealName)) value = INTRINSICS[intrinsicRealName]; else if (null != value) {
                    if (!(part in value)) {
                        if (!allowMissing) throw new $TypeError("base intrinsic for " + name + " exists, but the property is not available.");
                        return;
                    }
                    if ($gOPD && i + 1 >= parts.length) {
                        var desc = $gOPD(value, part);
                        isOwn = !!desc;
                        if (isOwn && "get" in desc && !("originalValue" in desc.get)) value = desc.get; else value = value[part];
                    } else {
                        isOwn = hasOwn(value, part);
                        value = value[part];
                    }
                    if (isOwn && !skipFurtherCaching) INTRINSICS[intrinsicRealName] = value;
                }
            }
            return value;
        };
    },
    679: (module, __unused_webpack_exports, __webpack_require__) => {
        "use strict";
        var origSymbol = "undefined" !== typeof Symbol && Symbol;
        var hasSymbolSham = __webpack_require__(8186);
        module.exports = function() {
            if ("function" !== typeof origSymbol) return false;
            if ("function" !== typeof Symbol) return false;
            if ("symbol" !== typeof origSymbol("foo")) return false;
            if ("symbol" !== typeof Symbol("bar")) return false;
            return hasSymbolSham();
        };
    },
    8186: module => {
        "use strict";
        module.exports = function() {
            if ("function" !== typeof Symbol || "function" !== typeof Object.getOwnPropertySymbols) return false;
            if ("symbol" === typeof Symbol.iterator) return true;
            var obj = {};
            var sym = Symbol("test");
            var symObj = Object(sym);
            if ("string" === typeof sym) return false;
            if ("[object Symbol]" !== Object.prototype.toString.call(sym)) return false;
            if ("[object Symbol]" !== Object.prototype.toString.call(symObj)) return false;
            var symVal = 42;
            obj[sym] = symVal;
            for (sym in obj) return false;
            if ("function" === typeof Object.keys && 0 !== Object.keys(obj).length) return false;
            if ("function" === typeof Object.getOwnPropertyNames && 0 !== Object.getOwnPropertyNames(obj).length) return false;
            var syms = Object.getOwnPropertySymbols(obj);
            if (1 !== syms.length || syms[0] !== sym) return false;
            if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) return false;
            if ("function" === typeof Object.getOwnPropertyDescriptor) {
                var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
                if (descriptor.value !== symVal || true !== descriptor.enumerable) return false;
            }
            return true;
        };
    },
    7492: (module, __unused_webpack_exports, __webpack_require__) => {
        "use strict";
        var bind = __webpack_require__(132);
        module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);
    },
    87: module => {
        if ("function" === typeof Object.create) module.exports = function(ctor, superCtor) {
            if (superCtor) {
                ctor.super_ = superCtor;
                ctor.prototype = Object.create(superCtor.prototype, {
                    constructor: {
                        value: ctor,
                        enumerable: false,
                        writable: true,
                        configurable: true
                    }
                });
            }
        }; else module.exports = function(ctor, superCtor) {
            if (superCtor) {
                ctor.super_ = superCtor;
                var TempCtor = function() {};
                TempCtor.prototype = superCtor.prototype;
                ctor.prototype = new TempCtor;
                ctor.prototype.constructor = ctor;
            }
        };
    },
    7740: (module, __unused_webpack_exports, __webpack_require__) => {
        "use strict";
        var hasToStringTag = "function" === typeof Symbol && "symbol" === typeof Symbol.toStringTag;
        var callBound = __webpack_require__(2737);
        var $toString = callBound("Object.prototype.toString");
        var isStandardArguments = function(value) {
            if (hasToStringTag && value && "object" === typeof value && Symbol.toStringTag in value) return false;
            return "[object Arguments]" === $toString(value);
        };
        var isLegacyArguments = function(value) {
            if (isStandardArguments(value)) return true;
            return null !== value && "object" === typeof value && "number" === typeof value.length && value.length >= 0 && "[object Array]" !== $toString(value) && "[object Function]" === $toString(value.callee);
        };
        var supportsStandardArguments = function() {
            return isStandardArguments(arguments);
        }();
        isStandardArguments.isLegacyArguments = isLegacyArguments;
        module.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;
    },
    7810: module => {
        "use strict";
        if ("function" === typeof BigInt) {
            var bigIntValueOf = BigInt.prototype.valueOf;
            var tryBigInt = function(value) {
                try {
                    bigIntValueOf.call(value);
                    return true;
                } catch (e) {}
                return false;
            };
            module.exports = function(value) {
                if (null === value || "undefined" === typeof value || "boolean" === typeof value || "string" === typeof value || "number" === typeof value || "symbol" === typeof value || "function" === typeof value) return false;
                if ("bigint" === typeof value) return true;
                return tryBigInt(value);
            };
        } else module.exports = function(value) {
            return false && 0;
        };
    },
    240: (module, __unused_webpack_exports, __webpack_require__) => {
        "use strict";
        var callBound = __webpack_require__(2737);
        var $boolToStr = callBound("Boolean.prototype.toString");
        var $toString = callBound("Object.prototype.toString");
        var tryBooleanObject = function(value) {
            try {
                $boolToStr(value);
                return true;
            } catch (e) {
                return false;
            }
        };
        var boolClass = "[object Boolean]";
        var hasToStringTag = "function" === typeof Symbol && !!Symbol.toStringTag;
        module.exports = function(value) {
            if ("boolean" === typeof value) return true;
            if (null === value || "object" !== typeof value) return false;
            return hasToStringTag && Symbol.toStringTag in value ? tryBooleanObject(value) : $toString(value) === boolClass;
        };
    },
    7355: module => {
        "use strict";
        var getDay = Date.prototype.getDay;
        var tryDateObject = function(value) {
            try {
                getDay.call(value);
                return true;
            } catch (e) {
                return false;
            }
        };
        var toStr = Object.prototype.toString;
        var dateClass = "[object Date]";
        var hasToStringTag = "function" === typeof Symbol && !!Symbol.toStringTag;
        module.exports = function(value) {
            if ("object" !== typeof value || null === value) return false;
            return hasToStringTag ? tryDateObject(value) : toStr.call(value) === dateClass;
        };
    },
    8265: module => {
        "use strict";
        var toStr = Object.prototype.toString;
        var fnToStr = Function.prototype.toString;
        var isFnRegex = /^\s*(?:function)?\*/;
        var hasToStringTag = "function" === typeof Symbol && "symbol" === typeof Symbol.toStringTag;
        var getProto = Object.getPrototypeOf;
        var getGeneratorFunc = function() {
            if (!hasToStringTag) return false;
            try {
                return Function("return function*() {}")();
            } catch (e) {}
        };
        var GeneratorFunction;
        module.exports = function(fn) {
            if ("function" !== typeof fn) return false;
            if (isFnRegex.test(fnToStr.call(fn))) return true;
            if (!hasToStringTag) {
                var str = toStr.call(fn);
                return "[object GeneratorFunction]" === str;
            }
            if (!getProto) return false;
            if ("undefined" === typeof GeneratorFunction) {
                var generatorFunc = getGeneratorFunc();
                GeneratorFunction = generatorFunc ? getProto(generatorFunc) : false;
            }
            return getProto(fn) === GeneratorFunction;
        };
    },
    6966: module => {
        "use strict";
        var $Map = "function" === typeof Map && Map.prototype ? Map : null;
        var $Set = "function" === typeof Set && Set.prototype ? Set : null;
        var exported;
        if (!$Map) exported = function(x) {
            return false;
        };
        var $mapHas = $Map ? Map.prototype.has : null;
        var $setHas = $Set ? Set.prototype.has : null;
        if (!exported && !$mapHas) exported = function(x) {
            return false;
        };
        module.exports = exported || function(x) {
            if (!x || "object" !== typeof x) return false;
            try {
                $mapHas.call(x);
                if ($setHas) try {
                    $setHas.call(x);
                } catch (e) {
                    return true;
                }
                return x instanceof $Map;
            } catch (e) {}
            return false;
        };
    },
    4127: module => {
        "use strict";
        module.exports = function(value) {
            return value !== value;
        };
    },
    4866: (module, __unused_webpack_exports, __webpack_require__) => {
        "use strict";
        var callBind = __webpack_require__(4573);
        var define = __webpack_require__(7392);
        var implementation = __webpack_require__(4127);
        var getPolyfill = __webpack_require__(850);
        var shim = __webpack_require__(8045);
        var polyfill = callBind(getPolyfill(), Number);
        define(polyfill, {
            getPolyfill,
            implementation,
            shim
        });
        module.exports = polyfill;
    },
    850: (module, __unused_webpack_exports, __webpack_require__) => {
        "use strict";
        var implementation = __webpack_require__(4127);
        module.exports = function() {
            if (Number.isNaN && Number.isNaN(NaN) && !Number.isNaN("a")) return Number.isNaN;
            return implementation;
        };
    },
    8045: (module, __unused_webpack_exports, __webpack_require__) => {
        "use strict";
        var define = __webpack_require__(7392);
        var getPolyfill = __webpack_require__(850);
        module.exports = function() {
            var polyfill = getPolyfill();
            define(Number, {
                isNaN: polyfill
            }, {
                isNaN: function() {
                    return Number.isNaN !== polyfill;
                }
            });
            return polyfill;
        };
    },
    7691: module => {
        "use strict";
        var numToStr = Number.prototype.toString;
        var tryNumberObject = function(value) {
            try {
                numToStr.call(value);
                return true;
            } catch (e) {
                return false;
            }
        };
        var toStr = Object.prototype.toString;
        var numClass = "[object Number]";
        var hasToStringTag = "function" === typeof Symbol && !!Symbol.toStringTag;
        module.exports = function(value) {
            if ("number" === typeof value) return true;
            if ("object" !== typeof value) return false;
            return hasToStringTag ? tryNumberObject(value) : toStr.call(value) === numClass;
        };
    },
    2483: (module, __unused_webpack_exports, __webpack_require__) => {
        "use strict";
        var callBound = __webpack_require__(2737);
        var hasSymbols = __webpack_require__(8186)();
        var hasToStringTag = hasSymbols && !!Symbol.toStringTag;
        var has;
        var $exec;
        var isRegexMarker;
        var badStringifier;
        if (hasToStringTag) {
            has = callBound("Object.prototype.hasOwnProperty");
            $exec = callBound("RegExp.prototype.exec");
            isRegexMarker = {};
            var throwRegexMarker = function() {
                throw isRegexMarker;
            };
            badStringifier = {
                toString: throwRegexMarker,
                valueOf: throwRegexMarker
            };
            if ("symbol" === typeof Symbol.toPrimitive) badStringifier[Symbol.toPrimitive] = throwRegexMarker;
        }
        var $toString = callBound("Object.prototype.toString");
        var gOPD = Object.getOwnPropertyDescriptor;
        var regexClass = "[object RegExp]";
        module.exports = hasToStringTag ? function(value) {
            if (!value || "object" !== typeof value) return false;
            var descriptor = gOPD(value, "lastIndex");
            var hasLastIndexDataProperty = descriptor && has(descriptor, "value");
            if (!hasLastIndexDataProperty) return false;
            try {
                $exec(value, badStringifier);
            } catch (e) {
                return e === isRegexMarker;
            }
        } : function(value) {
            if (!value || "object" !== typeof value && "function" !== typeof value) return false;
            return $toString(value) === regexClass;
        };
    },
    4255: module => {
        "use strict";
        var $Map = "function" === typeof Map && Map.prototype ? Map : null;
        var $Set = "function" === typeof Set && Set.prototype ? Set : null;
        var exported;
        if (!$Set) exported = function(x) {
            return false;
        };
        var $mapHas = $Map ? Map.prototype.has : null;
        var $setHas = $Set ? Set.prototype.has : null;
        if (!exported && !$setHas) exported = function(x) {
            return false;
        };
        module.exports = exported || function(x) {
            if (!x || "object" !== typeof x) return false;
            try {
                $setHas.call(x);
                if ($mapHas) try {
                    $mapHas.call(x);
                } catch (e) {
                    return true;
                }
                return x instanceof $Set;
            } catch (e) {}
            return false;
        };
    },
    8559: module => {
        "use strict";
        var strValue = String.prototype.valueOf;
        var tryStringObject = function(value) {
            try {
                strValue.call(value);
                return true;
            } catch (e) {
                return false;
            }
        };
        var toStr = Object.prototype.toString;
        var strClass = "[object String]";
        var hasToStringTag = "function" === typeof Symbol && !!Symbol.toStringTag;
        module.exports = function(value) {
            if ("string" === typeof value) return true;
            if ("object" !== typeof value) return false;
            return hasToStringTag ? tryStringObject(value) : toStr.call(value) === strClass;
        };
    },
    3448: (module, __unused_webpack_exports, __webpack_require__) => {
        "use strict";
        var toStr = Object.prototype.toString;
        var hasSymbols = __webpack_require__(679)();
        if (hasSymbols) {
            var symToStr = Symbol.prototype.toString;
            var symStringRegex = /^Symbol\(.*\)$/;
            var isSymbolObject = function(value) {
                if ("symbol" !== typeof value.valueOf()) return false;
                return symStringRegex.test(symToStr.call(value));
            };
            module.exports = function(value) {
                if ("symbol" === typeof value) return true;
                if ("[object Symbol]" !== toStr.call(value)) return false;
                try {
                    return isSymbolObject(value);
                } catch (e) {
                    return false;
                }
            };
        } else module.exports = function(value) {
            return false && 0;
        };
    },
    387: (module, __unused_webpack_exports, __webpack_require__) => {
        "use strict";
        var forEach = __webpack_require__(8372);
        var availableTypedArrays = __webpack_require__(973);
        var callBound = __webpack_require__(2737);
        var $toString = callBound("Object.prototype.toString");
        var hasSymbols = __webpack_require__(679)();
        var hasToStringTag = hasSymbols && "symbol" === typeof Symbol.toStringTag;
        var typedArrays = availableTypedArrays();
        var $indexOf = callBound("Array.prototype.indexOf", true) || function(array, value) {
            for (var i = 0; i < array.length; i += 1) if (array[i] === value) return i;
            return -1;
        };
        var $slice = callBound("String.prototype.slice");
        var toStrTags = {};
        var gOPD = __webpack_require__(6371);
        var getPrototypeOf = Object.getPrototypeOf;
        if (hasToStringTag && gOPD && getPrototypeOf) forEach(typedArrays, (function(typedArray) {
            var arr = new __webpack_require__.g[typedArray];
            if (!(Symbol.toStringTag in arr)) throw new EvalError("this engine has support for Symbol.toStringTag, but " + typedArray + " does not have the property! Please report this.");
            var proto = getPrototypeOf(arr);
            var descriptor = gOPD(proto, Symbol.toStringTag);
            if (!descriptor) {
                var superProto = getPrototypeOf(proto);
                descriptor = gOPD(superProto, Symbol.toStringTag);
            }
            toStrTags[typedArray] = descriptor.get;
        }));
        var tryTypedArrays = function(value) {
            var anyTrue = false;
            forEach(toStrTags, (function(getter, typedArray) {
                if (!anyTrue) try {
                    anyTrue = getter.call(value) === typedArray;
                } catch (e) {}
            }));
            return anyTrue;
        };
        module.exports = function(value) {
            if (!value || "object" !== typeof value) return false;
            if (!hasToStringTag) {
                var tag = $slice($toString(value), 8, -1);
                return $indexOf(typedArrays, tag) > -1;
            }
            if (!gOPD) return false;
            return tryTypedArrays(value);
        };
    },
    349: module => {
        "use strict";
        var $WeakMap = "function" === typeof WeakMap && WeakMap.prototype ? WeakMap : null;
        var $WeakSet = "function" === typeof WeakSet && WeakSet.prototype ? WeakSet : null;
        var exported;
        if (!$WeakMap) exported = function(x) {
            return false;
        };
        var $mapHas = $WeakMap ? $WeakMap.prototype.has : null;
        var $setHas = $WeakSet ? $WeakSet.prototype.has : null;
        if (!exported && !$mapHas) exported = function(x) {
            return false;
        };
        module.exports = exported || function(x) {
            if (!x || "object" !== typeof x) return false;
            try {
                $mapHas.call(x, $mapHas);
                if ($setHas) try {
                    $setHas.call(x, $setHas);
                } catch (e) {
                    return true;
                }
                return x instanceof $WeakMap;
            } catch (e) {}
            return false;
        };
    },
    7812: module => {
        "use strict";
        var $WeakMap = "function" === typeof WeakMap && WeakMap.prototype ? WeakMap : null;
        var $WeakSet = "function" === typeof WeakSet && WeakSet.prototype ? WeakSet : null;
        var exported;
        if (!$WeakMap) exported = function(x) {
            return false;
        };
        var $mapHas = $WeakMap ? $WeakMap.prototype.has : null;
        var $setHas = $WeakSet ? $WeakSet.prototype.has : null;
        if (!exported && !$setHas) module.exports = function(x) {
            return false;
        };
        module.exports = exported || function(x) {
            if (!x || "object" !== typeof x) return false;
            try {
                $setHas.call(x, $setHas);
                if ($mapHas) try {
                    $mapHas.call(x, $mapHas);
                } catch (e) {
                    return true;
                }
                return x instanceof $WeakSet;
            } catch (e) {}
            return false;
        };
    },
    5182: module => {
        var toString = {}.toString;
        module.exports = Array.isArray || function(arr) {
            return "[object Array]" == toString.call(arr);
        };
    },
    8412: (module, exports, __webpack_require__) => {
        module = __webpack_require__.nmd(module);
        var LARGE_ARRAY_SIZE = 200;
        var HASH_UNDEFINED = "__lodash_hash_undefined__";
        var HOT_COUNT = 800, HOT_SPAN = 16;
        var MAX_SAFE_INTEGER = 9007199254740991;
        var argsTag = "[object Arguments]", arrayTag = "[object Array]", asyncTag = "[object AsyncFunction]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", nullTag = "[object Null]", objectTag = "[object Object]", proxyTag = "[object Proxy]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", undefinedTag = "[object Undefined]", weakMapTag = "[object WeakMap]";
        var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
        var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
        var reIsHostCtor = /^\[object .+?Constructor\]$/;
        var reIsUint = /^(?:0|[1-9]\d*)$/;
        var typedArrayTags = {};
        typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
        typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
        var freeGlobal = "object" == typeof __webpack_require__.g && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;
        var freeSelf = "object" == typeof self && self && self.Object === Object && self;
        var root = freeGlobal || freeSelf || Function("return this")();
        var freeExports = true && exports && !exports.nodeType && exports;
        var freeModule = freeExports && "object" == "object" && module && !module.nodeType && module;
        var moduleExports = freeModule && freeModule.exports === freeExports;
        var freeProcess = moduleExports && freeGlobal.process;
        var nodeUtil = function() {
            try {
                var types = freeModule && freeModule.require && freeModule.require("util").types;
                if (types) return types;
                return freeProcess && freeProcess.binding && freeProcess.binding("util");
            } catch (e) {}
        }();
        var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
        function apply(func, thisArg, args) {
            switch (args.length) {
              case 0:
                return func.call(thisArg);

              case 1:
                return func.call(thisArg, args[0]);

              case 2:
                return func.call(thisArg, args[0], args[1]);

              case 3:
                return func.call(thisArg, args[0], args[1], args[2]);
            }
            return func.apply(thisArg, args);
        }
        function baseTimes(n, iteratee) {
            var index = -1, result = Array(n);
            while (++index < n) result[index] = iteratee(index);
            return result;
        }
        function baseUnary(func) {
            return function(value) {
                return func(value);
            };
        }
        function getValue(object, key) {
            return null == object ? void 0 : object[key];
        }
        function overArg(func, transform) {
            return function(arg) {
                return func(transform(arg));
            };
        }
        var arrayProto = Array.prototype, funcProto = Function.prototype, objectProto = Object.prototype;
        var coreJsData = root["__core-js_shared__"];
        var funcToString = funcProto.toString;
        var hasOwnProperty = objectProto.hasOwnProperty;
        var maskSrcKey = function() {
            var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
            return uid ? "Symbol(src)_1." + uid : "";
        }();
        var nativeObjectToString = objectProto.toString;
        var objectCtorString = funcToString.call(Object);
        var reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
        var Buffer = moduleExports ? root.Buffer : void 0, Symbol = root.Symbol, Uint8Array = root.Uint8Array, allocUnsafe = Buffer ? Buffer.allocUnsafe : void 0, getPrototype = overArg(Object.getPrototypeOf, Object), objectCreate = Object.create, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice, symToStringTag = Symbol ? Symbol.toStringTag : void 0;
        var defineProperty = function() {
            try {
                var func = getNative(Object, "defineProperty");
                func({}, "", {});
                return func;
            } catch (e) {}
        }();
        var nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0, nativeMax = Math.max, nativeNow = Date.now;
        var Map = getNative(root, "Map"), nativeCreate = getNative(Object, "create");
        var baseCreate = function() {
            function object() {}
            return function(proto) {
                if (!isObject(proto)) return {};
                if (objectCreate) return objectCreate(proto);
                object.prototype = proto;
                var result = new object;
                object.prototype = void 0;
                return result;
            };
        }();
        function Hash(entries) {
            var index = -1, length = null == entries ? 0 : entries.length;
            this.clear();
            while (++index < length) {
                var entry = entries[index];
                this.set(entry[0], entry[1]);
            }
        }
        function hashClear() {
            this.__data__ = nativeCreate ? nativeCreate(null) : {};
            this.size = 0;
        }
        function hashDelete(key) {
            var result = this.has(key) && delete this.__data__[key];
            this.size -= result ? 1 : 0;
            return result;
        }
        function hashGet(key) {
            var data = this.__data__;
            if (nativeCreate) {
                var result = data[key];
                return result === HASH_UNDEFINED ? void 0 : result;
            }
            return hasOwnProperty.call(data, key) ? data[key] : void 0;
        }
        function hashHas(key) {
            var data = this.__data__;
            return nativeCreate ? void 0 !== data[key] : hasOwnProperty.call(data, key);
        }
        function hashSet(key, value) {
            var data = this.__data__;
            this.size += this.has(key) ? 0 : 1;
            data[key] = nativeCreate && void 0 === value ? HASH_UNDEFINED : value;
            return this;
        }
        Hash.prototype.clear = hashClear;
        Hash.prototype["delete"] = hashDelete;
        Hash.prototype.get = hashGet;
        Hash.prototype.has = hashHas;
        Hash.prototype.set = hashSet;
        function ListCache(entries) {
            var index = -1, length = null == entries ? 0 : entries.length;
            this.clear();
            while (++index < length) {
                var entry = entries[index];
                this.set(entry[0], entry[1]);
            }
        }
        function listCacheClear() {
            this.__data__ = [];
            this.size = 0;
        }
        function listCacheDelete(key) {
            var data = this.__data__, index = assocIndexOf(data, key);
            if (index < 0) return false;
            var lastIndex = data.length - 1;
            if (index == lastIndex) data.pop(); else splice.call(data, index, 1);
            --this.size;
            return true;
        }
        function listCacheGet(key) {
            var data = this.__data__, index = assocIndexOf(data, key);
            return index < 0 ? void 0 : data[index][1];
        }
        function listCacheHas(key) {
            return assocIndexOf(this.__data__, key) > -1;
        }
        function listCacheSet(key, value) {
            var data = this.__data__, index = assocIndexOf(data, key);
            if (index < 0) {
                ++this.size;
                data.push([ key, value ]);
            } else data[index][1] = value;
            return this;
        }
        ListCache.prototype.clear = listCacheClear;
        ListCache.prototype["delete"] = listCacheDelete;
        ListCache.prototype.get = listCacheGet;
        ListCache.prototype.has = listCacheHas;
        ListCache.prototype.set = listCacheSet;
        function MapCache(entries) {
            var index = -1, length = null == entries ? 0 : entries.length;
            this.clear();
            while (++index < length) {
                var entry = entries[index];
                this.set(entry[0], entry[1]);
            }
        }
        function mapCacheClear() {
            this.size = 0;
            this.__data__ = {
                hash: new Hash,
                map: new (Map || ListCache),
                string: new Hash
            };
        }
        function mapCacheDelete(key) {
            var result = getMapData(this, key)["delete"](key);
            this.size -= result ? 1 : 0;
            return result;
        }
        function mapCacheGet(key) {
            return getMapData(this, key).get(key);
        }
        function mapCacheHas(key) {
            return getMapData(this, key).has(key);
        }
        function mapCacheSet(key, value) {
            var data = getMapData(this, key), size = data.size;
            data.set(key, value);
            this.size += data.size == size ? 0 : 1;
            return this;
        }
        MapCache.prototype.clear = mapCacheClear;
        MapCache.prototype["delete"] = mapCacheDelete;
        MapCache.prototype.get = mapCacheGet;
        MapCache.prototype.has = mapCacheHas;
        MapCache.prototype.set = mapCacheSet;
        function Stack(entries) {
            var data = this.__data__ = new ListCache(entries);
            this.size = data.size;
        }
        function stackClear() {
            this.__data__ = new ListCache;
            this.size = 0;
        }
        function stackDelete(key) {
            var data = this.__data__, result = data["delete"](key);
            this.size = data.size;
            return result;
        }
        function stackGet(key) {
            return this.__data__.get(key);
        }
        function stackHas(key) {
            return this.__data__.has(key);
        }
        function stackSet(key, value) {
            var data = this.__data__;
            if (data instanceof ListCache) {
                var pairs = data.__data__;
                if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
                    pairs.push([ key, value ]);
                    this.size = ++data.size;
                    return this;
                }
                data = this.__data__ = new MapCache(pairs);
            }
            data.set(key, value);
            this.size = data.size;
            return this;
        }
        Stack.prototype.clear = stackClear;
        Stack.prototype["delete"] = stackDelete;
        Stack.prototype.get = stackGet;
        Stack.prototype.has = stackHas;
        Stack.prototype.set = stackSet;
        function arrayLikeKeys(value, inherited) {
            var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
            for (var key in value) if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && ("length" == key || isBuff && ("offset" == key || "parent" == key) || isType && ("buffer" == key || "byteLength" == key || "byteOffset" == key) || isIndex(key, length)))) result.push(key);
            return result;
        }
        function assignMergeValue(object, key, value) {
            if (void 0 !== value && !eq(object[key], value) || void 0 === value && !(key in object)) baseAssignValue(object, key, value);
        }
        function assignValue(object, key, value) {
            var objValue = object[key];
            if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || void 0 === value && !(key in object)) baseAssignValue(object, key, value);
        }
        function assocIndexOf(array, key) {
            var length = array.length;
            while (length--) if (eq(array[length][0], key)) return length;
            return -1;
        }
        function baseAssignValue(object, key, value) {
            if ("__proto__" == key && defineProperty) defineProperty(object, key, {
                configurable: true,
                enumerable: true,
                value,
                writable: true
            }); else object[key] = value;
        }
        var baseFor = createBaseFor();
        function baseGetTag(value) {
            if (null == value) return void 0 === value ? undefinedTag : nullTag;
            return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
        }
        function baseIsArguments(value) {
            return isObjectLike(value) && baseGetTag(value) == argsTag;
        }
        function baseIsNative(value) {
            if (!isObject(value) || isMasked(value)) return false;
            var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
            return pattern.test(toSource(value));
        }
        function baseIsTypedArray(value) {
            return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
        }
        function baseKeysIn(object) {
            if (!isObject(object)) return nativeKeysIn(object);
            var isProto = isPrototype(object), result = [];
            for (var key in object) if (!("constructor" == key && (isProto || !hasOwnProperty.call(object, key)))) result.push(key);
            return result;
        }
        function baseMerge(object, source, srcIndex, customizer, stack) {
            if (object === source) return;
            baseFor(source, (function(srcValue, key) {
                stack || (stack = new Stack);
                if (isObject(srcValue)) baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack); else {
                    var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : void 0;
                    if (void 0 === newValue) newValue = srcValue;
                    assignMergeValue(object, key, newValue);
                }
            }), keysIn);
        }
        function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
            var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
            if (stacked) {
                assignMergeValue(object, key, stacked);
                return;
            }
            var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : void 0;
            var isCommon = void 0 === newValue;
            if (isCommon) {
                var isArr = isArray(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
                newValue = srcValue;
                if (isArr || isBuff || isTyped) if (isArray(objValue)) newValue = objValue; else if (isArrayLikeObject(objValue)) newValue = copyArray(objValue); else if (isBuff) {
                    isCommon = false;
                    newValue = cloneBuffer(srcValue, true);
                } else if (isTyped) {
                    isCommon = false;
                    newValue = cloneTypedArray(srcValue, true);
                } else newValue = []; else if (isPlainObject(srcValue) || isArguments(srcValue)) {
                    newValue = objValue;
                    if (isArguments(objValue)) newValue = toPlainObject(objValue); else if (!isObject(objValue) || isFunction(objValue)) newValue = initCloneObject(srcValue);
                } else isCommon = false;
            }
            if (isCommon) {
                stack.set(srcValue, newValue);
                mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
                stack["delete"](srcValue);
            }
            assignMergeValue(object, key, newValue);
        }
        function baseRest(func, start) {
            return setToString(overRest(func, start, identity), func + "");
        }
        var baseSetToString = !defineProperty ? identity : function(func, string) {
            return defineProperty(func, "toString", {
                configurable: true,
                enumerable: false,
                value: constant(string),
                writable: true
            });
        };
        function cloneBuffer(buffer, isDeep) {
            if (isDeep) return buffer.slice();
            var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
            buffer.copy(result);
            return result;
        }
        function cloneArrayBuffer(arrayBuffer) {
            var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
            new Uint8Array(result).set(new Uint8Array(arrayBuffer));
            return result;
        }
        function cloneTypedArray(typedArray, isDeep) {
            var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
            return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
        }
        function copyArray(source, array) {
            var index = -1, length = source.length;
            array || (array = Array(length));
            while (++index < length) array[index] = source[index];
            return array;
        }
        function copyObject(source, props, object, customizer) {
            var isNew = !object;
            object || (object = {});
            var index = -1, length = props.length;
            while (++index < length) {
                var key = props[index];
                var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
                if (void 0 === newValue) newValue = source[key];
                if (isNew) baseAssignValue(object, key, newValue); else assignValue(object, key, newValue);
            }
            return object;
        }
        function createAssigner(assigner) {
            return baseRest((function(object, sources) {
                var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
                customizer = assigner.length > 3 && "function" == typeof customizer ? (length--, 
                customizer) : void 0;
                if (guard && isIterateeCall(sources[0], sources[1], guard)) {
                    customizer = length < 3 ? void 0 : customizer;
                    length = 1;
                }
                object = Object(object);
                while (++index < length) {
                    var source = sources[index];
                    if (source) assigner(object, source, index, customizer);
                }
                return object;
            }));
        }
        function createBaseFor(fromRight) {
            return function(object, iteratee, keysFunc) {
                var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
                while (length--) {
                    var key = props[fromRight ? length : ++index];
                    if (false === iteratee(iterable[key], key, iterable)) break;
                }
                return object;
            };
        }
        function getMapData(map, key) {
            var data = map.__data__;
            return isKeyable(key) ? data["string" == typeof key ? "string" : "hash"] : data.map;
        }
        function getNative(object, key) {
            var value = getValue(object, key);
            return baseIsNative(value) ? value : void 0;
        }
        function getRawTag(value) {
            var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
            try {
                value[symToStringTag] = void 0;
                var unmasked = true;
            } catch (e) {}
            var result = nativeObjectToString.call(value);
            if (unmasked) if (isOwn) value[symToStringTag] = tag; else delete value[symToStringTag];
            return result;
        }
        function initCloneObject(object) {
            return "function" == typeof object.constructor && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
        }
        function isIndex(value, length) {
            var type = typeof value;
            length = null == length ? MAX_SAFE_INTEGER : length;
            return !!length && ("number" == type || "symbol" != type && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
        }
        function isIterateeCall(value, index, object) {
            if (!isObject(object)) return false;
            var type = typeof index;
            if ("number" == type ? isArrayLike(object) && isIndex(index, object.length) : "string" == type && index in object) return eq(object[index], value);
            return false;
        }
        function isKeyable(value) {
            var type = typeof value;
            return "string" == type || "number" == type || "symbol" == type || "boolean" == type ? "__proto__" !== value : null === value;
        }
        function isMasked(func) {
            return !!maskSrcKey && maskSrcKey in func;
        }
        function isPrototype(value) {
            var Ctor = value && value.constructor, proto = "function" == typeof Ctor && Ctor.prototype || objectProto;
            return value === proto;
        }
        function nativeKeysIn(object) {
            var result = [];
            if (null != object) for (var key in Object(object)) result.push(key);
            return result;
        }
        function objectToString(value) {
            return nativeObjectToString.call(value);
        }
        function overRest(func, start, transform) {
            start = nativeMax(void 0 === start ? func.length - 1 : start, 0);
            return function() {
                var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
                while (++index < length) array[index] = args[start + index];
                index = -1;
                var otherArgs = Array(start + 1);
                while (++index < start) otherArgs[index] = args[index];
                otherArgs[start] = transform(array);
                return apply(func, this, otherArgs);
            };
        }
        function safeGet(object, key) {
            if ("constructor" === key && "function" === typeof object[key]) return;
            if ("__proto__" == key) return;
            return object[key];
        }
        var setToString = shortOut(baseSetToString);
        function shortOut(func) {
            var count = 0, lastCalled = 0;
            return function() {
                var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
                lastCalled = stamp;
                if (remaining > 0) {
                    if (++count >= HOT_COUNT) return arguments[0];
                } else count = 0;
                return func.apply(void 0, arguments);
            };
        }
        function toSource(func) {
            if (null != func) {
                try {
                    return funcToString.call(func);
                } catch (e) {}
                try {
                    return func + "";
                } catch (e) {}
            }
            return "";
        }
        function eq(value, other) {
            return value === other || value !== value && other !== other;
        }
        var isArguments = baseIsArguments(function() {
            return arguments;
        }()) ? baseIsArguments : function(value) {
            return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
        };
        var isArray = Array.isArray;
        function isArrayLike(value) {
            return null != value && isLength(value.length) && !isFunction(value);
        }
        function isArrayLikeObject(value) {
            return isObjectLike(value) && isArrayLike(value);
        }
        var isBuffer = nativeIsBuffer || stubFalse;
        function isFunction(value) {
            if (!isObject(value)) return false;
            var tag = baseGetTag(value);
            return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
        }
        function isLength(value) {
            return "number" == typeof value && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
        }
        function isObject(value) {
            var type = typeof value;
            return null != value && ("object" == type || "function" == type);
        }
        function isObjectLike(value) {
            return null != value && "object" == typeof value;
        }
        function isPlainObject(value) {
            if (!isObjectLike(value) || baseGetTag(value) != objectTag) return false;
            var proto = getPrototype(value);
            if (null === proto) return true;
            var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
            return "function" == typeof Ctor && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
        }
        var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
        function toPlainObject(value) {
            return copyObject(value, keysIn(value));
        }
        function keysIn(object) {
            return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
        }
        var merge = createAssigner((function(object, source, srcIndex) {
            baseMerge(object, source, srcIndex);
        }));
        function constant(value) {
            return function() {
                return value;
            };
        }
        function identity(value) {
            return value;
        }
        function stubFalse() {
            return false;
        }
        module.exports = merge;
    },
    2525: module => {
        "use strict";
        var getOwnPropertySymbols = Object.getOwnPropertySymbols;
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var propIsEnumerable = Object.prototype.propertyIsEnumerable;
        function toObject(val) {
            if (null === val || void 0 === val) throw new TypeError("Object.assign cannot be called with null or undefined");
            return Object(val);
        }
        function shouldUseNative() {
            try {
                if (!Object.assign) return false;
                var test1 = new String("abc");
                test1[5] = "de";
                if ("5" === Object.getOwnPropertyNames(test1)[0]) return false;
                var test2 = {};
                for (var i = 0; i < 10; i++) test2["_" + String.fromCharCode(i)] = i;
                var order2 = Object.getOwnPropertyNames(test2).map((function(n) {
                    return test2[n];
                }));
                if ("0123456789" !== order2.join("")) return false;
                var test3 = {};
                "abcdefghijklmnopqrst".split("").forEach((function(letter) {
                    test3[letter] = letter;
                }));
                if ("abcdefghijklmnopqrst" !== Object.keys(Object.assign({}, test3)).join("")) return false;
                return true;
            } catch (err) {
                return false;
            }
        }
        module.exports = shouldUseNative() ? Object.assign : function(target, source) {
            var from;
            var to = toObject(target);
            var symbols;
            for (var s = 1; s < arguments.length; s++) {
                from = Object(arguments[s]);
                for (var key in from) if (hasOwnProperty.call(from, key)) to[key] = from[key];
                if (getOwnPropertySymbols) {
                    symbols = getOwnPropertySymbols(from);
                    for (var i = 0; i < symbols.length; i++) if (propIsEnumerable.call(from, symbols[i])) to[symbols[i]] = from[symbols[i]];
                }
            }
            return to;
        };
    },
    6524: (module, __unused_webpack_exports, __webpack_require__) => {
        var hasMap = "function" === typeof Map && Map.prototype;
        var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null;
        var mapSize = hasMap && mapSizeDescriptor && "function" === typeof mapSizeDescriptor.get ? mapSizeDescriptor.get : null;
        var mapForEach = hasMap && Map.prototype.forEach;
        var hasSet = "function" === typeof Set && Set.prototype;
        var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null;
        var setSize = hasSet && setSizeDescriptor && "function" === typeof setSizeDescriptor.get ? setSizeDescriptor.get : null;
        var setForEach = hasSet && Set.prototype.forEach;
        var hasWeakMap = "function" === typeof WeakMap && WeakMap.prototype;
        var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
        var hasWeakSet = "function" === typeof WeakSet && WeakSet.prototype;
        var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
        var hasWeakRef = "function" === typeof WeakRef && WeakRef.prototype;
        var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
        var booleanValueOf = Boolean.prototype.valueOf;
        var objectToString = Object.prototype.toString;
        var functionToString = Function.prototype.toString;
        var match = String.prototype.match;
        var bigIntValueOf = "function" === typeof BigInt ? BigInt.prototype.valueOf : null;
        var gOPS = Object.getOwnPropertySymbols;
        var symToString = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? Symbol.prototype.toString : null;
        var hasShammedSymbols = "function" === typeof Symbol && "object" === typeof Symbol.iterator;
        var isEnumerable = Object.prototype.propertyIsEnumerable;
        var gPO = ("function" === typeof Reflect ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(O) {
            return O.__proto__;
        } : null);
        var inspectCustom = __webpack_require__(6553).custom;
        var inspectSymbol = inspectCustom && isSymbol(inspectCustom) ? inspectCustom : null;
        var toStringTag = "function" === typeof Symbol && "undefined" !== typeof Symbol.toStringTag ? Symbol.toStringTag : null;
        module.exports = function inspect_(obj, options, depth, seen) {
            var opts = options || {};
            if (has(opts, "quoteStyle") && "single" !== opts.quoteStyle && "double" !== opts.quoteStyle) throw new TypeError('option "quoteStyle" must be "single" or "double"');
            if (has(opts, "maxStringLength") && ("number" === typeof opts.maxStringLength ? opts.maxStringLength < 0 && opts.maxStringLength !== 1 / 0 : null !== opts.maxStringLength)) throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
            var customInspect = has(opts, "customInspect") ? opts.customInspect : true;
            if ("boolean" !== typeof customInspect) throw new TypeError('option "customInspect", if provided, must be `true` or `false`');
            if (has(opts, "indent") && null !== opts.indent && "\t" !== opts.indent && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)) throw new TypeError('options "indent" must be "\\t", an integer > 0, or `null`');
            if ("undefined" === typeof obj) return "undefined";
            if (null === obj) return "null";
            if ("boolean" === typeof obj) return obj ? "true" : "false";
            if ("string" === typeof obj) return inspectString(obj, opts);
            if ("number" === typeof obj) {
                if (0 === obj) return 1 / 0 / obj > 0 ? "0" : "-0";
                return String(obj);
            }
            if ("bigint" === typeof obj) return String(obj) + "n";
            var maxDepth = "undefined" === typeof opts.depth ? 5 : opts.depth;
            if ("undefined" === typeof depth) depth = 0;
            if (depth >= maxDepth && maxDepth > 0 && "object" === typeof obj) return isArray(obj) ? "[Array]" : "[Object]";
            var indent = getIndent(opts, depth);
            if ("undefined" === typeof seen) seen = []; else if (indexOf(seen, obj) >= 0) return "[Circular]";
            function inspect(value, from, noIndent) {
                if (from) {
                    seen = seen.slice();
                    seen.push(from);
                }
                if (noIndent) {
                    var newOpts = {
                        depth: opts.depth
                    };
                    if (has(opts, "quoteStyle")) newOpts.quoteStyle = opts.quoteStyle;
                    return inspect_(value, newOpts, depth + 1, seen);
                }
                return inspect_(value, opts, depth + 1, seen);
            }
            if ("function" === typeof obj) {
                var name = nameOf(obj);
                var keys = arrObjKeys(obj, inspect);
                return "[Function" + (name ? ": " + name : " (anonymous)") + "]" + (keys.length > 0 ? " { " + keys.join(", ") + " }" : "");
            }
            if (isSymbol(obj)) {
                var symString = hasShammedSymbols ? String(obj).replace(/^(Symbol\(.*\))_[^)]*$/, "$1") : symToString.call(obj);
                return "object" === typeof obj && !hasShammedSymbols ? markBoxed(symString) : symString;
            }
            if (isElement(obj)) {
                var s = "<" + String(obj.nodeName).toLowerCase();
                var attrs = obj.attributes || [];
                for (var i = 0; i < attrs.length; i++) s += " " + attrs[i].name + "=" + wrapQuotes(quote(attrs[i].value), "double", opts);
                s += ">";
                if (obj.childNodes && obj.childNodes.length) s += "...";
                s += "</" + String(obj.nodeName).toLowerCase() + ">";
                return s;
            }
            if (isArray(obj)) {
                if (0 === obj.length) return "[]";
                var xs = arrObjKeys(obj, inspect);
                if (indent && !singleLineValues(xs)) return "[" + indentedJoin(xs, indent) + "]";
                return "[ " + xs.join(", ") + " ]";
            }
            if (isError(obj)) {
                var parts = arrObjKeys(obj, inspect);
                if (0 === parts.length) return "[" + String(obj) + "]";
                return "{ [" + String(obj) + "] " + parts.join(", ") + " }";
            }
            if ("object" === typeof obj && customInspect) if (inspectSymbol && "function" === typeof obj[inspectSymbol]) return obj[inspectSymbol](); else if ("function" === typeof obj.inspect) return obj.inspect();
            if (isMap(obj)) {
                var mapParts = [];
                mapForEach.call(obj, (function(value, key) {
                    mapParts.push(inspect(key, obj, true) + " => " + inspect(value, obj));
                }));
                return collectionOf("Map", mapSize.call(obj), mapParts, indent);
            }
            if (isSet(obj)) {
                var setParts = [];
                setForEach.call(obj, (function(value) {
                    setParts.push(inspect(value, obj));
                }));
                return collectionOf("Set", setSize.call(obj), setParts, indent);
            }
            if (isWeakMap(obj)) return weakCollectionOf("WeakMap");
            if (isWeakSet(obj)) return weakCollectionOf("WeakSet");
            if (isWeakRef(obj)) return weakCollectionOf("WeakRef");
            if (isNumber(obj)) return markBoxed(inspect(Number(obj)));
            if (isBigInt(obj)) return markBoxed(inspect(bigIntValueOf.call(obj)));
            if (isBoolean(obj)) return markBoxed(booleanValueOf.call(obj));
            if (isString(obj)) return markBoxed(inspect(String(obj)));
            if (!isDate(obj) && !isRegExp(obj)) {
                var ys = arrObjKeys(obj, inspect);
                var isPlainObject = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
                var protoTag = obj instanceof Object ? "" : "null prototype";
                var stringTag = !isPlainObject && toStringTag && Object(obj) === obj && toStringTag in obj ? toStr(obj).slice(8, -1) : protoTag ? "Object" : "";
                var constructorTag = isPlainObject || "function" !== typeof obj.constructor ? "" : obj.constructor.name ? obj.constructor.name + " " : "";
                var tag = constructorTag + (stringTag || protoTag ? "[" + [].concat(stringTag || [], protoTag || []).join(": ") + "] " : "");
                if (0 === ys.length) return tag + "{}";
                if (indent) return tag + "{" + indentedJoin(ys, indent) + "}";
                return tag + "{ " + ys.join(", ") + " }";
            }
            return String(obj);
        };
        function wrapQuotes(s, defaultStyle, opts) {
            var quoteChar = "double" === (opts.quoteStyle || defaultStyle) ? '"' : "'";
            return quoteChar + s + quoteChar;
        }
        function quote(s) {
            return String(s).replace(/"/g, "&quot;");
        }
        function isArray(obj) {
            return "[object Array]" === toStr(obj) && (!toStringTag || !("object" === typeof obj && toStringTag in obj));
        }
        function isDate(obj) {
            return "[object Date]" === toStr(obj) && (!toStringTag || !("object" === typeof obj && toStringTag in obj));
        }
        function isRegExp(obj) {
            return "[object RegExp]" === toStr(obj) && (!toStringTag || !("object" === typeof obj && toStringTag in obj));
        }
        function isError(obj) {
            return "[object Error]" === toStr(obj) && (!toStringTag || !("object" === typeof obj && toStringTag in obj));
        }
        function isString(obj) {
            return "[object String]" === toStr(obj) && (!toStringTag || !("object" === typeof obj && toStringTag in obj));
        }
        function isNumber(obj) {
            return "[object Number]" === toStr(obj) && (!toStringTag || !("object" === typeof obj && toStringTag in obj));
        }
        function isBoolean(obj) {
            return "[object Boolean]" === toStr(obj) && (!toStringTag || !("object" === typeof obj && toStringTag in obj));
        }
        function isSymbol(obj) {
            if (hasShammedSymbols) return obj && "object" === typeof obj && obj instanceof Symbol;
            if ("symbol" === typeof obj) return true;
            if (!obj || "object" !== typeof obj || !symToString) return false;
            try {
                symToString.call(obj);
                return true;
            } catch (e) {}
            return false;
        }
        function isBigInt(obj) {
            if (!obj || "object" !== typeof obj || !bigIntValueOf) return false;
            try {
                bigIntValueOf.call(obj);
                return true;
            } catch (e) {}
            return false;
        }
        var hasOwn = Object.prototype.hasOwnProperty || function(key) {
            return key in this;
        };
        function has(obj, key) {
            return hasOwn.call(obj, key);
        }
        function toStr(obj) {
            return objectToString.call(obj);
        }
        function nameOf(f) {
            if (f.name) return f.name;
            var m = match.call(functionToString.call(f), /^function\s*([\w$]+)/);
            if (m) return m[1];
            return null;
        }
        function indexOf(xs, x) {
            if (xs.indexOf) return xs.indexOf(x);
            for (var i = 0, l = xs.length; i < l; i++) if (xs[i] === x) return i;
            return -1;
        }
        function isMap(x) {
            if (!mapSize || !x || "object" !== typeof x) return false;
            try {
                mapSize.call(x);
                try {
                    setSize.call(x);
                } catch (s) {
                    return true;
                }
                return x instanceof Map;
            } catch (e) {}
            return false;
        }
        function isWeakMap(x) {
            if (!weakMapHas || !x || "object" !== typeof x) return false;
            try {
                weakMapHas.call(x, weakMapHas);
                try {
                    weakSetHas.call(x, weakSetHas);
                } catch (s) {
                    return true;
                }
                return x instanceof WeakMap;
            } catch (e) {}
            return false;
        }
        function isWeakRef(x) {
            if (!weakRefDeref || !x || "object" !== typeof x) return false;
            try {
                weakRefDeref.call(x);
                return true;
            } catch (e) {}
            return false;
        }
        function isSet(x) {
            if (!setSize || !x || "object" !== typeof x) return false;
            try {
                setSize.call(x);
                try {
                    mapSize.call(x);
                } catch (m) {
                    return true;
                }
                return x instanceof Set;
            } catch (e) {}
            return false;
        }
        function isWeakSet(x) {
            if (!weakSetHas || !x || "object" !== typeof x) return false;
            try {
                weakSetHas.call(x, weakSetHas);
                try {
                    weakMapHas.call(x, weakMapHas);
                } catch (s) {
                    return true;
                }
                return x instanceof WeakSet;
            } catch (e) {}
            return false;
        }
        function isElement(x) {
            if (!x || "object" !== typeof x) return false;
            if ("undefined" !== typeof HTMLElement && x instanceof HTMLElement) return true;
            return "string" === typeof x.nodeName && "function" === typeof x.getAttribute;
        }
        function inspectString(str, opts) {
            if (str.length > opts.maxStringLength) {
                var remaining = str.length - opts.maxStringLength;
                var trailer = "... " + remaining + " more character" + (remaining > 1 ? "s" : "");
                return inspectString(str.slice(0, opts.maxStringLength), opts) + trailer;
            }
            var s = str.replace(/(['\\])/g, "\\$1").replace(/[\x00-\x1f]/g, lowbyte);
            return wrapQuotes(s, "single", opts);
        }
        function lowbyte(c) {
            var n = c.charCodeAt(0);
            var x = {
                8: "b",
                9: "t",
                10: "n",
                12: "f",
                13: "r"
            }[n];
            if (x) return "\\" + x;
            return "\\x" + (n < 16 ? "0" : "") + n.toString(16).toUpperCase();
        }
        function markBoxed(str) {
            return "Object(" + str + ")";
        }
        function weakCollectionOf(type) {
            return type + " { ? }";
        }
        function collectionOf(type, size, entries, indent) {
            var joinedEntries = indent ? indentedJoin(entries, indent) : entries.join(", ");
            return type + " (" + size + ") {" + joinedEntries + "}";
        }
        function singleLineValues(xs) {
            for (var i = 0; i < xs.length; i++) if (indexOf(xs[i], "\n") >= 0) return false;
            return true;
        }
        function getIndent(opts, depth) {
            var baseIndent;
            if ("\t" === opts.indent) baseIndent = "\t"; else if ("number" === typeof opts.indent && opts.indent > 0) baseIndent = Array(opts.indent + 1).join(" "); else return null;
            return {
                base: baseIndent,
                prev: Array(depth + 1).join(baseIndent)
            };
        }
        function indentedJoin(xs, indent) {
            if (0 === xs.length) return "";
            var lineJoiner = "\n" + indent.prev + indent.base;
            return lineJoiner + xs.join("," + lineJoiner) + "\n" + indent.prev;
        }
        function arrObjKeys(obj, inspect) {
            var isArr = isArray(obj);
            var xs = [];
            if (isArr) {
                xs.length = obj.length;
                for (var i = 0; i < obj.length; i++) xs[i] = has(obj, i) ? inspect(obj[i], obj) : "";
            }
            var syms = "function" === typeof gOPS ? gOPS(obj) : [];
            var symMap;
            if (hasShammedSymbols) {
                symMap = {};
                for (var k = 0; k < syms.length; k++) symMap["$" + syms[k]] = syms[k];
            }
            for (var key in obj) {
                if (!has(obj, key)) continue;
                if (isArr && String(Number(key)) === key && key < obj.length) continue;
                if (hasShammedSymbols && symMap["$" + key] instanceof Symbol) continue; else if (/[^\w$]/.test(key)) xs.push(inspect(key, obj) + ": " + inspect(obj[key], obj)); else xs.push(key + ": " + inspect(obj[key], obj));
            }
            if ("function" === typeof gOPS) for (var j = 0; j < syms.length; j++) if (isEnumerable.call(obj, syms[j])) xs.push("[" + inspect(syms[j]) + "]: " + inspect(obj[syms[j]], obj));
            return xs;
        }
    },
    836: module => {
        "use strict";
        var numberIsNaN = function(value) {
            return value !== value;
        };
        module.exports = function(a, b) {
            if (0 === a && 0 === b) return 1 / a === 1 / b;
            if (a === b) return true;
            if (numberIsNaN(a) && numberIsNaN(b)) return true;
            return false;
        };
    },
    3822: (module, __unused_webpack_exports, __webpack_require__) => {
        "use strict";
        var define = __webpack_require__(7392);
        var callBind = __webpack_require__(4573);
        var implementation = __webpack_require__(836);
        var getPolyfill = __webpack_require__(1800);
        var shim = __webpack_require__(7894);
        var polyfill = callBind(getPolyfill(), Object);
        define(polyfill, {
            getPolyfill,
            implementation,
            shim
        });
        module.exports = polyfill;
    },
    1800: (module, __unused_webpack_exports, __webpack_require__) => {
        "use strict";
        var implementation = __webpack_require__(836);
        module.exports = function() {
            return "function" === typeof Object.is ? Object.is : implementation;
        };
    },
    7894: (module, __unused_webpack_exports, __webpack_require__) => {
        "use strict";
        var getPolyfill = __webpack_require__(1800);
        var define = __webpack_require__(7392);
        module.exports = function() {
            var polyfill = getPolyfill();
            define(Object, {
                is: polyfill
            }, {
                is: function() {
                    return Object.is !== polyfill;
                }
            });
            return polyfill;
        };
    },
    9538: (module, __unused_webpack_exports, __webpack_require__) => {
        "use strict";
        var keysShim;
        if (!Object.keys) {
            var has = Object.prototype.hasOwnProperty;
            var toStr = Object.prototype.toString;
            var isArgs = __webpack_require__(1030);
            var isEnumerable = Object.prototype.propertyIsEnumerable;
            var hasDontEnumBug = !isEnumerable.call({
                toString: null
            }, "toString");
            var hasProtoEnumBug = isEnumerable.call((function() {}), "prototype");
            var dontEnums = [ "toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor" ];
            var equalsConstructorPrototype = function(o) {
                var ctor = o.constructor;
                return ctor && ctor.prototype === o;
            };
            var excludedKeys = {
                $applicationCache: true,
                $console: true,
                $external: true,
                $frame: true,
                $frameElement: true,
                $frames: true,
                $innerHeight: true,
                $innerWidth: true,
                $onmozfullscreenchange: true,
                $onmozfullscreenerror: true,
                $outerHeight: true,
                $outerWidth: true,
                $pageXOffset: true,
                $pageYOffset: true,
                $parent: true,
                $scrollLeft: true,
                $scrollTop: true,
                $scrollX: true,
                $scrollY: true,
                $self: true,
                $webkitIndexedDB: true,
                $webkitStorageInfo: true,
                $window: true
            };
            var hasAutomationEqualityBug = function() {
                if (false) ;
                for (var k in window) try {
                    if (!excludedKeys["$" + k] && has.call(window, k) && null !== window[k] && "object" === typeof window[k]) try {
                        equalsConstructorPrototype(window[k]);
                    } catch (e) {
                        return true;
                    }
                } catch (e) {
                    return true;
                }
                return false;
            }();
            var equalsConstructorPrototypeIfNotBuggy = function(o) {
                if (false || !hasAutomationEqualityBug) return equalsConstructorPrototype(o);
                try {
                    return equalsConstructorPrototype(o);
                } catch (e) {
                    return false;
                }
            };
            keysShim = function(object) {
                var isObject = null !== object && "object" === typeof object;
                var isFunction = "[object Function]" === toStr.call(object);
                var isArguments = isArgs(object);
                var isString = isObject && "[object String]" === toStr.call(object);
                var theKeys = [];
                if (!isObject && !isFunction && !isArguments) throw new TypeError("Object.keys called on a non-object");
                var skipProto = hasProtoEnumBug && isFunction;
                if (isString && object.length > 0 && !has.call(object, 0)) for (var i = 0; i < object.length; ++i) theKeys.push(String(i));
                if (isArguments && object.length > 0) for (var j = 0; j < object.length; ++j) theKeys.push(String(j)); else for (var name in object) if (!(skipProto && "prototype" === name) && has.call(object, name)) theKeys.push(String(name));
                if (hasDontEnumBug) {
                    var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);
                    for (var k = 0; k < dontEnums.length; ++k) if (!(skipConstructor && "constructor" === dontEnums[k]) && has.call(object, dontEnums[k])) theKeys.push(dontEnums[k]);
                }
                return theKeys;
            };
        }
        module.exports = keysShim;
    },
    4733: (module, __unused_webpack_exports, __webpack_require__) => {
        "use strict";
        var slice = Array.prototype.slice;
        var isArgs = __webpack_require__(1030);
        var origKeys = Object.keys;
        var keysShim = origKeys ? function(o) {
            return origKeys(o);
        } : __webpack_require__(9538);
        var originalKeys = Object.keys;
        keysShim.shim = function() {
            if (Object.keys) {
                var keysWorksWithArguments = function() {
                    var args = Object.keys(arguments);
                    return args && args.length === arguments.length;
                }(1, 2);
                if (!keysWorksWithArguments) Object.keys = function(object) {
                    if (isArgs(object)) return originalKeys(slice.call(object));
                    return originalKeys(object);
                };
            } else Object.keys = keysShim;
            return Object.keys || keysShim;
        };
        module.exports = keysShim;
    },
    1030: module => {
        "use strict";
        var toStr = Object.prototype.toString;
        module.exports = function(value) {
            var str = toStr.call(value);
            var isArgs = "[object Arguments]" === str;
            if (!isArgs) isArgs = "[object Array]" !== str && null !== value && "object" === typeof value && "number" === typeof value.length && value.length >= 0 && "[object Function]" === toStr.call(value.callee);
            return isArgs;
        };
    },
    5752: (module, __unused_webpack_exports, __webpack_require__) => {
        "use strict";
        var keys = __webpack_require__(4733);
        var canBeObject = function(obj) {
            return "undefined" !== typeof obj && null !== obj;
        };
        var hasSymbols = __webpack_require__(8186)();
        var callBound = __webpack_require__(2737);
        var toObject = Object;
        var $push = callBound("Array.prototype.push");
        var $propIsEnumerable = callBound("Object.prototype.propertyIsEnumerable");
        var originalGetSymbols = hasSymbols ? Object.getOwnPropertySymbols : null;
        module.exports = function(target, source1) {
            if (!canBeObject(target)) throw new TypeError("target must be an object");
            var objTarget = toObject(target);
            var s, source, i, props, syms, value, key;
            for (s = 1; s < arguments.length; ++s) {
                source = toObject(arguments[s]);
                props = keys(source);
                var getSymbols = hasSymbols && (Object.getOwnPropertySymbols || originalGetSymbols);
                if (getSymbols) {
                    syms = getSymbols(source);
                    for (i = 0; i < syms.length; ++i) {
                        key = syms[i];
                        if ($propIsEnumerable(source, key)) $push(props, key);
                    }
                }
                for (i = 0; i < props.length; ++i) {
                    key = props[i];
                    value = source[key];
                    if ($propIsEnumerable(source, key)) objTarget[key] = value;
                }
            }
            return objTarget;
        };
    },
    950: (module, __unused_webpack_exports, __webpack_require__) => {
        "use strict";
        var defineProperties = __webpack_require__(7392);
        var callBind = __webpack_require__(4573);
        var implementation = __webpack_require__(5752);
        var getPolyfill = __webpack_require__(1028);
        var shim = __webpack_require__(6305);
        var polyfill = callBind.apply(getPolyfill());
        var bound = function(target, source1) {
            return polyfill(Object, arguments);
        };
        defineProperties(bound, {
            getPolyfill,
            implementation,
            shim
        });
        module.exports = bound;
    },
    1028: (module, __unused_webpack_exports, __webpack_require__) => {
        "use strict";
        var implementation = __webpack_require__(5752);
        var lacksProperEnumerationOrder = function() {
            if (!Object.assign) return false;
            var str = "abcdefghijklmnopqrst";
            var letters = str.split("");
            var map = {};
            for (var i = 0; i < letters.length; ++i) map[letters[i]] = letters[i];
            var obj = Object.assign({}, map);
            var actual = "";
            for (var k in obj) actual += k;
            return str !== actual;
        };
        var assignHasPendingExceptions = function() {
            if (!Object.assign || !Object.preventExtensions) return false;
            var thrower = Object.preventExtensions({
                1: 2
            });
            try {
                Object.assign(thrower, "xy");
            } catch (e) {
                return "y" === thrower[1];
            }
            return false;
        };
        module.exports = function() {
            if (!Object.assign) return implementation;
            if (lacksProperEnumerationOrder()) return implementation;
            if (assignHasPendingExceptions()) return implementation;
            return Object.assign;
        };
    },
    6305: (module, __unused_webpack_exports, __webpack_require__) => {
        "use strict";
        var define = __webpack_require__(7392);
        var getPolyfill = __webpack_require__(1028);
        module.exports = function() {
            var polyfill = getPolyfill();
            define(Object, {
                assign: polyfill
            }, {
                assign: function() {
                    return Object.assign !== polyfill;
                }
            });
            return polyfill;
        };
    },
    8772: (module, __unused_webpack_exports, __webpack_require__) => {
        "use strict";
        var ReactPropTypesSecret = __webpack_require__(331);
        function emptyFunction() {}
        function emptyFunctionWithReset() {}
        emptyFunctionWithReset.resetWarningCache = emptyFunction;
        module.exports = function() {
            function shim(props, propName, componentName, location, propFullName, secret) {
                if (secret === ReactPropTypesSecret) return;
                var err = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. " + "Use PropTypes.checkPropTypes() to call them. " + "Read more at http://fb.me/use-check-prop-types");
                err.name = "Invariant Violation";
                throw err;
            }
            shim.isRequired = shim;
            function getShim() {
                return shim;
            }
            var ReactPropTypes = {
                array: shim,
                bigint: shim,
                bool: shim,
                func: shim,
                number: shim,
                object: shim,
                string: shim,
                symbol: shim,
                any: shim,
                arrayOf: getShim,
                element: shim,
                elementType: shim,
                instanceOf: getShim,
                node: shim,
                objectOf: getShim,
                oneOf: getShim,
                oneOfType: getShim,
                shape: getShim,
                exact: getShim,
                checkPropTypes: emptyFunctionWithReset,
                resetWarningCache: emptyFunction
            };
            ReactPropTypes.PropTypes = ReactPropTypes;
            return ReactPropTypes;
        };
    },
    3615: (module, __unused_webpack_exports, __webpack_require__) => {
        if (false) ; else module.exports = __webpack_require__(8772)();
    },
    331: module => {
        "use strict";
        var ReactPropTypesSecret = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
        module.exports = ReactPropTypesSecret;
    },
    9948: module => {
        "use strict";
        var $Object = Object;
        var $TypeError = TypeError;
        module.exports = function() {
            if (null != this && this !== $Object(this)) throw new $TypeError("RegExp.prototype.flags getter called on non-object");
            var result = "";
            if (this.global) result += "g";
            if (this.ignoreCase) result += "i";
            if (this.multiline) result += "m";
            if (this.dotAll) result += "s";
            if (this.unicode) result += "u";
            if (this.sticky) result += "y";
            return result;
        };
    },
    2473: (module, __unused_webpack_exports, __webpack_require__) => {
        "use strict";
        var define = __webpack_require__(7392);
        var callBind = __webpack_require__(4573);
        var implementation = __webpack_require__(9948);
        var getPolyfill = __webpack_require__(2046);
        var shim = __webpack_require__(3289);
        var flagsBound = callBind(implementation);
        define(flagsBound, {
            getPolyfill,
            implementation,
            shim
        });
        module.exports = flagsBound;
    },
    2046: (module, __unused_webpack_exports, __webpack_require__) => {
        "use strict";
        var implementation = __webpack_require__(9948);
        var supportsDescriptors = __webpack_require__(7392).supportsDescriptors;
        var $gOPD = Object.getOwnPropertyDescriptor;
        var $TypeError = TypeError;
        module.exports = function() {
            if (!supportsDescriptors) throw new $TypeError("RegExp.prototype.flags requires a true ES5 environment that supports property descriptors");
            if ("gim" === /a/gim.flags) {
                var descriptor = $gOPD(RegExp.prototype, "flags");
                if (descriptor && "function" === typeof descriptor.get && "boolean" === typeof /a/.dotAll) return descriptor.get;
            }
            return implementation;
        };
    },
    3289: (module, __unused_webpack_exports, __webpack_require__) => {
        "use strict";
        var supportsDescriptors = __webpack_require__(7392).supportsDescriptors;
        var getPolyfill = __webpack_require__(2046);
        var gOPD = Object.getOwnPropertyDescriptor;
        var defineProperty = Object.defineProperty;
        var TypeErr = TypeError;
        var getProto = Object.getPrototypeOf;
        var regex = /a/;
        module.exports = function() {
            if (!supportsDescriptors || !getProto) throw new TypeErr("RegExp.prototype.flags requires a true ES5 environment that supports property descriptors");
            var polyfill = getPolyfill();
            var proto = getProto(regex);
            var descriptor = gOPD(proto, "flags");
            if (!descriptor || descriptor.get !== polyfill) defineProperty(proto, "flags", {
                configurable: true,
                enumerable: false,
                get: polyfill
            });
            return polyfill;
        };
    },
    7160: (module, exports) => {
        exports = module.exports = function(str) {
            return String(str).replace(exports.expr, "");
        };
        exports.expr = /\/+$/;
    },
    3323: (__unused_webpack_module, exports) => {
        "use strict";
        var f, g, h, k, l;
        if (false || "function" !== typeof MessageChannel) {
            var p = null, q = null, t = function() {
                if (null !== p) try {
                    var a = exports.unstable_now();
                    p(!0, a);
                    p = null;
                } catch (b) {
                    throw setTimeout(t, 0), b;
                }
            }, u = Date.now();
            exports.unstable_now = function() {
                return Date.now() - u;
            };
            f = function(a) {
                null !== p ? setTimeout(f, 0, a) : (p = a, setTimeout(t, 0));
            };
            g = function(a, b) {
                q = setTimeout(a, b);
            };
            h = function() {
                clearTimeout(q);
            };
            k = function() {
                return !1;
            };
            l = exports.unstable_forceFrameRate = function() {};
        } else {
            var w = window.performance, x = window.Date, y = window.setTimeout, z = window.clearTimeout;
            if ("undefined" !== typeof console) {
                var A = window.cancelAnimationFrame;
                "function" !== typeof window.requestAnimationFrame && console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills");
                "function" !== typeof A && console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills");
            }
            if ("object" === typeof w && "function" === typeof w.now) exports.unstable_now = function() {
                return w.now();
            }; else {
                var B = x.now();
                exports.unstable_now = function() {
                    return x.now() - B;
                };
            }
            var C = !1, D = null, E = -1, F = 5, G = 0;
            k = function() {
                return exports.unstable_now() >= G;
            };
            l = function() {};
            exports.unstable_forceFrameRate = function(a) {
                0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing framerates higher than 125 fps is not unsupported") : F = 0 < a ? Math.floor(1e3 / a) : 5;
            };
            var H = new MessageChannel, I = H.port2;
            H.port1.onmessage = function() {
                if (null !== D) {
                    var a = exports.unstable_now();
                    G = a + F;
                    try {
                        D(!0, a) ? I.postMessage(null) : (C = !1, D = null);
                    } catch (b) {
                        throw I.postMessage(null), b;
                    }
                } else C = !1;
            };
            f = function(a) {
                D = a;
                C || (C = !0, I.postMessage(null));
            };
            g = function(a, b) {
                E = y((function() {
                    a(exports.unstable_now());
                }), b);
            };
            h = function() {
                z(E);
                E = -1;
            };
        }
        function J(a, b) {
            var c = a.length;
            a.push(b);
            a: for (;;) {
                var d = c - 1 >>> 1, e = a[d];
                if (void 0 !== e && 0 < K(e, b)) a[d] = b, a[c] = e, c = d; else break a;
            }
        }
        function L(a) {
            a = a[0];
            return void 0 === a ? null : a;
        }
        function M(a) {
            var b = a[0];
            if (void 0 !== b) {
                var c = a.pop();
                if (c !== b) {
                    a[0] = c;
                    a: for (var d = 0, e = a.length; d < e; ) {
                        var m = 2 * (d + 1) - 1, n = a[m], v = m + 1, r = a[v];
                        if (void 0 !== n && 0 > K(n, c)) void 0 !== r && 0 > K(r, n) ? (a[d] = r, a[v] = c, 
                        d = v) : (a[d] = n, a[m] = c, d = m); else if (void 0 !== r && 0 > K(r, c)) a[d] = r, 
                        a[v] = c, d = v; else break a;
                    }
                }
                return b;
            }
            return null;
        }
        function K(a, b) {
            var c = a.sortIndex - b.sortIndex;
            return 0 !== c ? c : a.id - b.id;
        }
        var N = [], O = [], P = 1, Q = null, R = 3, S = !1, T = !1, U = !1;
        function V(a) {
            for (var b = L(O); null !== b; ) {
                if (null === b.callback) M(O); else if (b.startTime <= a) M(O), b.sortIndex = b.expirationTime, 
                J(N, b); else break;
                b = L(O);
            }
        }
        function W(a) {
            U = !1;
            V(a);
            if (!T) if (null !== L(N)) T = !0, f(X); else {
                var b = L(O);
                null !== b && g(W, b.startTime - a);
            }
        }
        function X(a, b) {
            T = !1;
            U && (U = !1, h());
            S = !0;
            var c = R;
            try {
                V(b);
                for (Q = L(N); null !== Q && (!(Q.expirationTime > b) || a && !k()); ) {
                    var d = Q.callback;
                    if (null !== d) {
                        Q.callback = null;
                        R = Q.priorityLevel;
                        var e = d(Q.expirationTime <= b);
                        b = exports.unstable_now();
                        "function" === typeof e ? Q.callback = e : Q === L(N) && M(N);
                        V(b);
                    } else M(N);
                    Q = L(N);
                }
                if (null !== Q) var m = !0; else {
                    var n = L(O);
                    null !== n && g(W, n.startTime - b);
                    m = !1;
                }
                return m;
            } finally {
                Q = null, R = c, S = !1;
            }
        }
        function Y(a) {
            switch (a) {
              case 1:
                return -1;

              case 2:
                return 250;

              case 5:
                return 1073741823;

              case 4:
                return 1e4;

              default:
                return 5e3;
            }
        }
        var Z = l;
        exports.unstable_IdlePriority = 5;
        exports.unstable_ImmediatePriority = 1;
        exports.unstable_LowPriority = 4;
        exports.unstable_NormalPriority = 3;
        exports.unstable_Profiling = null;
        exports.unstable_UserBlockingPriority = 2;
        exports.unstable_cancelCallback = function(a) {
            a.callback = null;
        };
        exports.unstable_continueExecution = function() {
            T || S || (T = !0, f(X));
        };
        exports.unstable_getCurrentPriorityLevel = function() {
            return R;
        };
        exports.unstable_getFirstCallbackNode = function() {
            return L(N);
        };
        exports.unstable_next = function(a) {
            switch (R) {
              case 1:
              case 2:
              case 3:
                var b = 3;
                break;

              default:
                b = R;
            }
            var c = R;
            R = b;
            try {
                return a();
            } finally {
                R = c;
            }
        };
        exports.unstable_pauseExecution = function() {};
        exports.unstable_requestPaint = Z;
        exports.unstable_runWithPriority = function(a, b) {
            switch (a) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;

              default:
                a = 3;
            }
            var c = R;
            R = a;
            try {
                return b();
            } finally {
                R = c;
            }
        };
        exports.unstable_scheduleCallback = function(a, b, c) {
            var d = exports.unstable_now();
            if ("object" === typeof c && null !== c) {
                var e = c.delay;
                e = "number" === typeof e && 0 < e ? d + e : d;
                c = "number" === typeof c.timeout ? c.timeout : Y(a);
            } else c = Y(a), e = d;
            c = e + c;
            a = {
                id: P++,
                callback: b,
                priorityLevel: a,
                startTime: e,
                expirationTime: c,
                sortIndex: -1
            };
            e > d ? (a.sortIndex = e, J(O, a), null === L(N) && a === L(O) && (U ? h() : U = !0, 
            g(W, e - d))) : (a.sortIndex = c, J(N, a), T || S || (T = !0, f(X)));
            return a;
        };
        exports.unstable_shouldYield = function() {
            var a = exports.unstable_now();
            V(a);
            var b = L(N);
            return b !== Q && null !== Q && null !== b && null !== b.callback && b.startTime <= a && b.expirationTime < Q.expirationTime || k();
        };
        exports.unstable_wrapCallback = function(a) {
            var b = R;
            return function() {
                var c = R;
                R = b;
                try {
                    return a.apply(this, arguments);
                } finally {
                    R = c;
                }
            };
        };
    },
    1102: (module, __unused_webpack_exports, __webpack_require__) => {
        "use strict";
        if (true) module.exports = __webpack_require__(3323);
    },
    3134: (module, __unused_webpack_exports, __webpack_require__) => {
        const ANY = Symbol("SemVer ANY");
        class Comparator {
            static get ANY() {
                return ANY;
            }
            constructor(comp, options) {
                options = parseOptions(options);
                if (comp instanceof Comparator) if (comp.loose === !!options.loose) return comp; else comp = comp.value;
                comp = comp.trim().split(/\s+/).join(" ");
                debug("comparator", comp, options);
                this.options = options;
                this.loose = !!options.loose;
                this.parse(comp);
                if (this.semver === ANY) this.value = ""; else this.value = this.operator + this.semver.version;
                debug("comp", this);
            }
            parse(comp) {
                const r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
                const m = comp.match(r);
                if (!m) throw new TypeError(`Invalid comparator: ${comp}`);
                this.operator = void 0 !== m[1] ? m[1] : "";
                if ("=" === this.operator) this.operator = "";
                if (!m[2]) this.semver = ANY; else this.semver = new SemVer(m[2], this.options.loose);
            }
            toString() {
                return this.value;
            }
            test(version) {
                debug("Comparator.test", version, this.options.loose);
                if (this.semver === ANY || version === ANY) return true;
                if ("string" === typeof version) try {
                    version = new SemVer(version, this.options);
                } catch (er) {
                    return false;
                }
                return cmp(version, this.operator, this.semver, this.options);
            }
            intersects(comp, options) {
                if (!(comp instanceof Comparator)) throw new TypeError("a Comparator is required");
                if ("" === this.operator) {
                    if ("" === this.value) return true;
                    return new Range(comp.value, options).test(this.value);
                } else if ("" === comp.operator) {
                    if ("" === comp.value) return true;
                    return new Range(this.value, options).test(comp.semver);
                }
                options = parseOptions(options);
                if (options.includePrerelease && ("<0.0.0-0" === this.value || "<0.0.0-0" === comp.value)) return false;
                if (!options.includePrerelease && (this.value.startsWith("<0.0.0") || comp.value.startsWith("<0.0.0"))) return false;
                if (this.operator.startsWith(">") && comp.operator.startsWith(">")) return true;
                if (this.operator.startsWith("<") && comp.operator.startsWith("<")) return true;
                if (this.semver.version === comp.semver.version && this.operator.includes("=") && comp.operator.includes("=")) return true;
                if (cmp(this.semver, "<", comp.semver, options) && this.operator.startsWith(">") && comp.operator.startsWith("<")) return true;
                if (cmp(this.semver, ">", comp.semver, options) && this.operator.startsWith("<") && comp.operator.startsWith(">")) return true;
                return false;
            }
        }
        module.exports = Comparator;
        const parseOptions = __webpack_require__(8716);
        const {safeRe: re, t} = __webpack_require__(9022);
        const cmp = __webpack_require__(5452);
        const debug = __webpack_require__(6830);
        const SemVer = __webpack_require__(9510);
        const Range = __webpack_require__(7374);
    },
    7374: (module, __unused_webpack_exports, __webpack_require__) => {
        const SPACE_CHARACTERS = /\s+/g;
        class Range {
            constructor(range, options) {
                options = parseOptions(options);
                if (range instanceof Range) if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) return range; else return new Range(range.raw, options);
                if (range instanceof Comparator) {
                    this.raw = range.value;
                    this.set = [ [ range ] ];
                    this.formatted = void 0;
                    return this;
                }
                this.options = options;
                this.loose = !!options.loose;
                this.includePrerelease = !!options.includePrerelease;
                this.raw = range.trim().replace(SPACE_CHARACTERS, " ");
                this.set = this.raw.split("||").map((r => this.parseRange(r.trim()))).filter((c => c.length));
                if (!this.set.length) throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
                if (this.set.length > 1) {
                    const first = this.set[0];
                    this.set = this.set.filter((c => !isNullSet(c[0])));
                    if (0 === this.set.length) this.set = [ first ]; else if (this.set.length > 1) for (const c of this.set) if (1 === c.length && isAny(c[0])) {
                        this.set = [ c ];
                        break;
                    }
                }
                this.formatted = void 0;
            }
            get range() {
                if (void 0 === this.formatted) {
                    this.formatted = "";
                    for (let i = 0; i < this.set.length; i++) {
                        if (i > 0) this.formatted += "||";
                        const comps = this.set[i];
                        for (let k = 0; k < comps.length; k++) {
                            if (k > 0) this.formatted += " ";
                            this.formatted += comps[k].toString().trim();
                        }
                    }
                }
                return this.formatted;
            }
            format() {
                return this.range;
            }
            toString() {
                return this.range;
            }
            parseRange(range) {
                const memoOpts = (this.options.includePrerelease && FLAG_INCLUDE_PRERELEASE) | (this.options.loose && FLAG_LOOSE);
                const memoKey = memoOpts + ":" + range;
                const cached = cache.get(memoKey);
                if (cached) return cached;
                const loose = this.options.loose;
                const hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE];
                range = range.replace(hr, hyphenReplace(this.options.includePrerelease));
                debug("hyphen replace", range);
                range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace);
                debug("comparator trim", range);
                range = range.replace(re[t.TILDETRIM], tildeTrimReplace);
                debug("tilde trim", range);
                range = range.replace(re[t.CARETTRIM], caretTrimReplace);
                debug("caret trim", range);
                let rangeList = range.split(" ").map((comp => parseComparator(comp, this.options))).join(" ").split(/\s+/).map((comp => replaceGTE0(comp, this.options)));
                if (loose) rangeList = rangeList.filter((comp => {
                    debug("loose invalid filter", comp, this.options);
                    return !!comp.match(re[t.COMPARATORLOOSE]);
                }));
                debug("range list", rangeList);
                const rangeMap = new Map;
                const comparators = rangeList.map((comp => new Comparator(comp, this.options)));
                for (const comp of comparators) {
                    if (isNullSet(comp)) return [ comp ];
                    rangeMap.set(comp.value, comp);
                }
                if (rangeMap.size > 1 && rangeMap.has("")) rangeMap.delete("");
                const result = [ ...rangeMap.values() ];
                cache.set(memoKey, result);
                return result;
            }
            intersects(range, options) {
                if (!(range instanceof Range)) throw new TypeError("a Range is required");
                return this.set.some((thisComparators => isSatisfiable(thisComparators, options) && range.set.some((rangeComparators => isSatisfiable(rangeComparators, options) && thisComparators.every((thisComparator => rangeComparators.every((rangeComparator => thisComparator.intersects(rangeComparator, options)))))))));
            }
            test(version) {
                if (!version) return false;
                if ("string" === typeof version) try {
                    version = new SemVer(version, this.options);
                } catch (er) {
                    return false;
                }
                for (let i = 0; i < this.set.length; i++) if (testSet(this.set[i], version, this.options)) return true;
                return false;
            }
        }
        module.exports = Range;
        const LRU = __webpack_require__(203);
        const cache = new LRU;
        const parseOptions = __webpack_require__(8716);
        const Comparator = __webpack_require__(3134);
        const debug = __webpack_require__(6830);
        const SemVer = __webpack_require__(9510);
        const {safeRe: re, t, comparatorTrimReplace, tildeTrimReplace, caretTrimReplace} = __webpack_require__(9022);
        const {FLAG_INCLUDE_PRERELEASE, FLAG_LOOSE} = __webpack_require__(39);
        const isNullSet = c => "<0.0.0-0" === c.value;
        const isAny = c => "" === c.value;
        const isSatisfiable = (comparators, options) => {
            let result = true;
            const remainingComparators = comparators.slice();
            let testComparator = remainingComparators.pop();
            while (result && remainingComparators.length) {
                result = remainingComparators.every((otherComparator => testComparator.intersects(otherComparator, options)));
                testComparator = remainingComparators.pop();
            }
            return result;
        };
        const parseComparator = (comp, options) => {
            debug("comp", comp, options);
            comp = replaceCarets(comp, options);
            debug("caret", comp);
            comp = replaceTildes(comp, options);
            debug("tildes", comp);
            comp = replaceXRanges(comp, options);
            debug("xrange", comp);
            comp = replaceStars(comp, options);
            debug("stars", comp);
            return comp;
        };
        const isX = id => !id || "x" === id.toLowerCase() || "*" === id;
        const replaceTildes = (comp, options) => comp.trim().split(/\s+/).map((c => replaceTilde(c, options))).join(" ");
        const replaceTilde = (comp, options) => {
            const r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE];
            return comp.replace(r, ((_, M, m, p, pr) => {
                debug("tilde", comp, _, M, m, p, pr);
                let ret;
                if (isX(M)) ret = ""; else if (isX(m)) ret = `>=${M}.0.0 <${+M + 1}.0.0-0`; else if (isX(p)) ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0`; else if (pr) {
                    debug("replaceTilde pr", pr);
                    ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
                } else ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`;
                debug("tilde return", ret);
                return ret;
            }));
        };
        const replaceCarets = (comp, options) => comp.trim().split(/\s+/).map((c => replaceCaret(c, options))).join(" ");
        const replaceCaret = (comp, options) => {
            debug("caret", comp, options);
            const r = options.loose ? re[t.CARETLOOSE] : re[t.CARET];
            const z = options.includePrerelease ? "-0" : "";
            return comp.replace(r, ((_, M, m, p, pr) => {
                debug("caret", comp, _, M, m, p, pr);
                let ret;
                if (isX(M)) ret = ""; else if (isX(m)) ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`; else if (isX(p)) if ("0" === M) ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`; else ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`; else if (pr) {
                    debug("replaceCaret pr", pr);
                    if ("0" === M) if ("0" === m) ret = `>=${M}.${m}.${p}-${pr} <${M}.${m}.${+p + 1}-0`; else ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`; else ret = `>=${M}.${m}.${p}-${pr} <${+M + 1}.0.0-0`;
                } else {
                    debug("no pr");
                    if ("0" === M) if ("0" === m) ret = `>=${M}.${m}.${p}${z} <${M}.${m}.${+p + 1}-0`; else ret = `>=${M}.${m}.${p}${z} <${M}.${+m + 1}.0-0`; else ret = `>=${M}.${m}.${p} <${+M + 1}.0.0-0`;
                }
                debug("caret return", ret);
                return ret;
            }));
        };
        const replaceXRanges = (comp, options) => {
            debug("replaceXRanges", comp, options);
            return comp.split(/\s+/).map((c => replaceXRange(c, options))).join(" ");
        };
        const replaceXRange = (comp, options) => {
            comp = comp.trim();
            const r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE];
            return comp.replace(r, ((ret, gtlt, M, m, p, pr) => {
                debug("xRange", comp, ret, gtlt, M, m, p, pr);
                const xM = isX(M);
                const xm = xM || isX(m);
                const xp = xm || isX(p);
                const anyX = xp;
                if ("=" === gtlt && anyX) gtlt = "";
                pr = options.includePrerelease ? "-0" : "";
                if (xM) if (">" === gtlt || "<" === gtlt) ret = "<0.0.0-0"; else ret = "*"; else if (gtlt && anyX) {
                    if (xm) m = 0;
                    p = 0;
                    if (">" === gtlt) {
                        gtlt = ">=";
                        if (xm) {
                            M = +M + 1;
                            m = 0;
                            p = 0;
                        } else {
                            m = +m + 1;
                            p = 0;
                        }
                    } else if ("<=" === gtlt) {
                        gtlt = "<";
                        if (xm) M = +M + 1; else m = +m + 1;
                    }
                    if ("<" === gtlt) pr = "-0";
                    ret = `${gtlt + M}.${m}.${p}${pr}`;
                } else if (xm) ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`; else if (xp) ret = `>=${M}.${m}.0${pr} <${M}.${+m + 1}.0-0`;
                debug("xRange return", ret);
                return ret;
            }));
        };
        const replaceStars = (comp, options) => {
            debug("replaceStars", comp, options);
            return comp.trim().replace(re[t.STAR], "");
        };
        const replaceGTE0 = (comp, options) => {
            debug("replaceGTE0", comp, options);
            return comp.trim().replace(re[options.includePrerelease ? t.GTE0PRE : t.GTE0], "");
        };
        const hyphenReplace = incPr => ($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr) => {
            if (isX(fM)) from = ""; else if (isX(fm)) from = `>=${fM}.0.0${incPr ? "-0" : ""}`; else if (isX(fp)) from = `>=${fM}.${fm}.0${incPr ? "-0" : ""}`; else if (fpr) from = `>=${from}`; else from = `>=${from}${incPr ? "-0" : ""}`;
            if (isX(tM)) to = ""; else if (isX(tm)) to = `<${+tM + 1}.0.0-0`; else if (isX(tp)) to = `<${tM}.${+tm + 1}.0-0`; else if (tpr) to = `<=${tM}.${tm}.${tp}-${tpr}`; else if (incPr) to = `<${tM}.${tm}.${+tp + 1}-0`; else to = `<=${to}`;
            return `${from} ${to}`.trim();
        };
        const testSet = (set, version, options) => {
            for (let i = 0; i < set.length; i++) if (!set[i].test(version)) return false;
            if (version.prerelease.length && !options.includePrerelease) {
                for (let i = 0; i < set.length; i++) {
                    debug(set[i].semver);
                    if (set[i].semver === Comparator.ANY) continue;
                    if (set[i].semver.prerelease.length > 0) {
                        const allowed = set[i].semver;
                        if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) return true;
                    }
                }
                return false;
            }
            return true;
        };
    },
    9510: (module, __unused_webpack_exports, __webpack_require__) => {
        const debug = __webpack_require__(6830);
        const {MAX_LENGTH, MAX_SAFE_INTEGER} = __webpack_require__(39);
        const {safeRe: re, t} = __webpack_require__(9022);
        const parseOptions = __webpack_require__(8716);
        const {compareIdentifiers} = __webpack_require__(8822);
        class SemVer {
            constructor(version, options) {
                options = parseOptions(options);
                if (version instanceof SemVer) if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) return version; else version = version.version; else if ("string" !== typeof version) throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version}".`);
                if (version.length > MAX_LENGTH) throw new TypeError(`version is longer than ${MAX_LENGTH} characters`);
                debug("SemVer", version, options);
                this.options = options;
                this.loose = !!options.loose;
                this.includePrerelease = !!options.includePrerelease;
                const m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);
                if (!m) throw new TypeError(`Invalid Version: ${version}`);
                this.raw = version;
                this.major = +m[1];
                this.minor = +m[2];
                this.patch = +m[3];
                if (this.major > MAX_SAFE_INTEGER || this.major < 0) throw new TypeError("Invalid major version");
                if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) throw new TypeError("Invalid minor version");
                if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) throw new TypeError("Invalid patch version");
                if (!m[4]) this.prerelease = []; else this.prerelease = m[4].split(".").map((id => {
                    if (/^[0-9]+$/.test(id)) {
                        const num = +id;
                        if (num >= 0 && num < MAX_SAFE_INTEGER) return num;
                    }
                    return id;
                }));
                this.build = m[5] ? m[5].split(".") : [];
                this.format();
            }
            format() {
                this.version = `${this.major}.${this.minor}.${this.patch}`;
                if (this.prerelease.length) this.version += `-${this.prerelease.join(".")}`;
                return this.version;
            }
            toString() {
                return this.version;
            }
            compare(other) {
                debug("SemVer.compare", this.version, this.options, other);
                if (!(other instanceof SemVer)) {
                    if ("string" === typeof other && other === this.version) return 0;
                    other = new SemVer(other, this.options);
                }
                if (other.version === this.version) return 0;
                return this.compareMain(other) || this.comparePre(other);
            }
            compareMain(other) {
                if (!(other instanceof SemVer)) other = new SemVer(other, this.options);
                return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
            }
            comparePre(other) {
                if (!(other instanceof SemVer)) other = new SemVer(other, this.options);
                if (this.prerelease.length && !other.prerelease.length) return -1; else if (!this.prerelease.length && other.prerelease.length) return 1; else if (!this.prerelease.length && !other.prerelease.length) return 0;
                let i = 0;
                do {
                    const a = this.prerelease[i];
                    const b = other.prerelease[i];
                    debug("prerelease compare", i, a, b);
                    if (void 0 === a && void 0 === b) return 0; else if (void 0 === b) return 1; else if (void 0 === a) return -1; else if (a === b) continue; else return compareIdentifiers(a, b);
                } while (++i);
            }
            compareBuild(other) {
                if (!(other instanceof SemVer)) other = new SemVer(other, this.options);
                let i = 0;
                do {
                    const a = this.build[i];
                    const b = other.build[i];
                    debug("build compare", i, a, b);
                    if (void 0 === a && void 0 === b) return 0; else if (void 0 === b) return 1; else if (void 0 === a) return -1; else if (a === b) continue; else return compareIdentifiers(a, b);
                } while (++i);
            }
            inc(release, identifier, identifierBase) {
                switch (release) {
                  case "premajor":
                    this.prerelease.length = 0;
                    this.patch = 0;
                    this.minor = 0;
                    this.major++;
                    this.inc("pre", identifier, identifierBase);
                    break;

                  case "preminor":
                    this.prerelease.length = 0;
                    this.patch = 0;
                    this.minor++;
                    this.inc("pre", identifier, identifierBase);
                    break;

                  case "prepatch":
                    this.prerelease.length = 0;
                    this.inc("patch", identifier, identifierBase);
                    this.inc("pre", identifier, identifierBase);
                    break;

                  case "prerelease":
                    if (0 === this.prerelease.length) this.inc("patch", identifier, identifierBase);
                    this.inc("pre", identifier, identifierBase);
                    break;

                  case "major":
                    if (0 !== this.minor || 0 !== this.patch || 0 === this.prerelease.length) this.major++;
                    this.minor = 0;
                    this.patch = 0;
                    this.prerelease = [];
                    break;

                  case "minor":
                    if (0 !== this.patch || 0 === this.prerelease.length) this.minor++;
                    this.patch = 0;
                    this.prerelease = [];
                    break;

                  case "patch":
                    if (0 === this.prerelease.length) this.patch++;
                    this.prerelease = [];
                    break;

                  case "pre":
                    {
                        const base = Number(identifierBase) ? 1 : 0;
                        if (!identifier && false === identifierBase) throw new Error("invalid increment argument: identifier is empty");
                        if (0 === this.prerelease.length) this.prerelease = [ base ]; else {
                            let i = this.prerelease.length;
                            while (--i >= 0) if ("number" === typeof this.prerelease[i]) {
                                this.prerelease[i]++;
                                i = -2;
                            }
                            if (-1 === i) {
                                if (identifier === this.prerelease.join(".") && false === identifierBase) throw new Error("invalid increment argument: identifier already exists");
                                this.prerelease.push(base);
                            }
                        }
                        if (identifier) {
                            let prerelease = [ identifier, base ];
                            if (false === identifierBase) prerelease = [ identifier ];
                            if (0 === compareIdentifiers(this.prerelease[0], identifier)) {
                                if (isNaN(this.prerelease[1])) this.prerelease = prerelease;
                            } else this.prerelease = prerelease;
                        }
                        break;
                    }

                  default:
                    throw new Error(`invalid increment argument: ${release}`);
                }
                this.raw = this.format();
                if (this.build.length) this.raw += `+${this.build.join(".")}`;
                return this;
            }
        }
        module.exports = SemVer;
    },
    6457: (module, __unused_webpack_exports, __webpack_require__) => {
        const parse = __webpack_require__(5692);
        const clean = (version, options) => {
            const s = parse(version.trim().replace(/^[=v]+/, ""), options);
            return s ? s.version : null;
        };
        module.exports = clean;
    },
    5452: (module, __unused_webpack_exports, __webpack_require__) => {
        const eq = __webpack_require__(8565);
        const neq = __webpack_require__(3328);
        const gt = __webpack_require__(2260);
        const gte = __webpack_require__(8192);
        const lt = __webpack_require__(290);
        const lte = __webpack_require__(5891);
        const cmp = (a, op, b, loose) => {
            switch (op) {
              case "===":
                if ("object" === typeof a) a = a.version;
                if ("object" === typeof b) b = b.version;
                return a === b;

              case "!==":
                if ("object" === typeof a) a = a.version;
                if ("object" === typeof b) b = b.version;
                return a !== b;

              case "":
              case "=":
              case "==":
                return eq(a, b, loose);

              case "!=":
                return neq(a, b, loose);

              case ">":
                return gt(a, b, loose);

              case ">=":
                return gte(a, b, loose);

              case "<":
                return lt(a, b, loose);

              case "<=":
                return lte(a, b, loose);

              default:
                throw new TypeError(`Invalid operator: ${op}`);
            }
        };
        module.exports = cmp;
    },
    9469: (module, __unused_webpack_exports, __webpack_require__) => {
        const SemVer = __webpack_require__(9510);
        const parse = __webpack_require__(5692);
        const {safeRe: re, t} = __webpack_require__(9022);
        const coerce = (version, options) => {
            if (version instanceof SemVer) return version;
            if ("number" === typeof version) version = String(version);
            if ("string" !== typeof version) return null;
            options = options || {};
            let match = null;
            if (!options.rtl) match = version.match(options.includePrerelease ? re[t.COERCEFULL] : re[t.COERCE]); else {
                const coerceRtlRegex = options.includePrerelease ? re[t.COERCERTLFULL] : re[t.COERCERTL];
                let next;
                while ((next = coerceRtlRegex.exec(version)) && (!match || match.index + match[0].length !== version.length)) {
                    if (!match || next.index + next[0].length !== match.index + match[0].length) match = next;
                    coerceRtlRegex.lastIndex = next.index + next[1].length + next[2].length;
                }
                coerceRtlRegex.lastIndex = -1;
            }
            if (null === match) return null;
            const major = match[2];
            const minor = match[3] || "0";
            const patch = match[4] || "0";
            const prerelease = options.includePrerelease && match[5] ? `-${match[5]}` : "";
            const build = options.includePrerelease && match[6] ? `+${match[6]}` : "";
            return parse(`${major}.${minor}.${patch}${prerelease}${build}`, options);
        };
        module.exports = coerce;
    },
    1868: (module, __unused_webpack_exports, __webpack_require__) => {
        const SemVer = __webpack_require__(9510);
        const compareBuild = (a, b, loose) => {
            const versionA = new SemVer(a, loose);
            const versionB = new SemVer(b, loose);
            return versionA.compare(versionB) || versionA.compareBuild(versionB);
        };
        module.exports = compareBuild;
    },
    5919: (module, __unused_webpack_exports, __webpack_require__) => {
        const compare = __webpack_require__(3992);
        const compareLoose = (a, b) => compare(a, b, true);
        module.exports = compareLoose;
    },
    3992: (module, __unused_webpack_exports, __webpack_require__) => {
        const SemVer = __webpack_require__(9510);
        const compare = (a, b, loose) => new SemVer(a, loose).compare(new SemVer(b, loose));
        module.exports = compare;
    },
    1007: (module, __unused_webpack_exports, __webpack_require__) => {
        const parse = __webpack_require__(5692);
        const diff = (version1, version2) => {
            const v1 = parse(version1, null, true);
            const v2 = parse(version2, null, true);
            const comparison = v1.compare(v2);
            if (0 === comparison) return null;
            const v1Higher = comparison > 0;
            const highVersion = v1Higher ? v1 : v2;
            const lowVersion = v1Higher ? v2 : v1;
            const highHasPre = !!highVersion.prerelease.length;
            const lowHasPre = !!lowVersion.prerelease.length;
            if (lowHasPre && !highHasPre) {
                if (!lowVersion.patch && !lowVersion.minor) return "major";
                if (highVersion.patch) return "patch";
                if (highVersion.minor) return "minor";
                return "major";
            }
            const prefix = highHasPre ? "pre" : "";
            if (v1.major !== v2.major) return prefix + "major";
            if (v1.minor !== v2.minor) return prefix + "minor";
            if (v1.patch !== v2.patch) return prefix + "patch";
            return "prerelease";
        };
        module.exports = diff;
    },
    8565: (module, __unused_webpack_exports, __webpack_require__) => {
        const compare = __webpack_require__(3992);
        const eq = (a, b, loose) => 0 === compare(a, b, loose);
        module.exports = eq;
    },
    2260: (module, __unused_webpack_exports, __webpack_require__) => {
        const compare = __webpack_require__(3992);
        const gt = (a, b, loose) => compare(a, b, loose) > 0;
        module.exports = gt;
    },
    8192: (module, __unused_webpack_exports, __webpack_require__) => {
        const compare = __webpack_require__(3992);
        const gte = (a, b, loose) => compare(a, b, loose) >= 0;
        module.exports = gte;
    },
    515: (module, __unused_webpack_exports, __webpack_require__) => {
        const SemVer = __webpack_require__(9510);
        const inc = (version, release, options, identifier, identifierBase) => {
            if ("string" === typeof options) {
                identifierBase = identifier;
                identifier = options;
                options = void 0;
            }
            try {
                return new SemVer(version instanceof SemVer ? version.version : version, options).inc(release, identifier, identifierBase).version;
            } catch (er) {
                return null;
            }
        };
        module.exports = inc;
    },
    290: (module, __unused_webpack_exports, __webpack_require__) => {
        const compare = __webpack_require__(3992);
        const lt = (a, b, loose) => compare(a, b, loose) < 0;
        module.exports = lt;
    },
    5891: (module, __unused_webpack_exports, __webpack_require__) => {
        const compare = __webpack_require__(3992);
        const lte = (a, b, loose) => compare(a, b, loose) <= 0;
        module.exports = lte;
    },
    2611: (module, __unused_webpack_exports, __webpack_require__) => {
        const SemVer = __webpack_require__(9510);
        const major = (a, loose) => new SemVer(a, loose).major;
        module.exports = major;
    },
    6319: (module, __unused_webpack_exports, __webpack_require__) => {
        const SemVer = __webpack_require__(9510);
        const minor = (a, loose) => new SemVer(a, loose).minor;
        module.exports = minor;
    },
    3328: (module, __unused_webpack_exports, __webpack_require__) => {
        const compare = __webpack_require__(3992);
        const neq = (a, b, loose) => 0 !== compare(a, b, loose);
        module.exports = neq;
    },
    5692: (module, __unused_webpack_exports, __webpack_require__) => {
        const SemVer = __webpack_require__(9510);
        const parse = (version, options, throwErrors = false) => {
            if (version instanceof SemVer) return version;
            try {
                return new SemVer(version, options);
            } catch (er) {
                if (!throwErrors) return null;
                throw er;
            }
        };
        module.exports = parse;
    },
    7368: (module, __unused_webpack_exports, __webpack_require__) => {
        const SemVer = __webpack_require__(9510);
        const patch = (a, loose) => new SemVer(a, loose).patch;
        module.exports = patch;
    },
    7794: (module, __unused_webpack_exports, __webpack_require__) => {
        const parse = __webpack_require__(5692);
        const prerelease = (version, options) => {
            const parsed = parse(version, options);
            return parsed && parsed.prerelease.length ? parsed.prerelease : null;
        };
        module.exports = prerelease;
    },
    9114: (module, __unused_webpack_exports, __webpack_require__) => {
        const compare = __webpack_require__(3992);
        const rcompare = (a, b, loose) => compare(b, a, loose);
        module.exports = rcompare;
    },
    3843: (module, __unused_webpack_exports, __webpack_require__) => {
        const compareBuild = __webpack_require__(1868);
        const rsort = (list, loose) => list.sort(((a, b) => compareBuild(b, a, loose)));
        module.exports = rsort;
    },
    9845: (module, __unused_webpack_exports, __webpack_require__) => {
        const Range = __webpack_require__(7374);
        const satisfies = (version, range, options) => {
            try {
                range = new Range(range, options);
            } catch (er) {
                return false;
            }
            return range.test(version);
        };
        module.exports = satisfies;
    },
    8753: (module, __unused_webpack_exports, __webpack_require__) => {
        const compareBuild = __webpack_require__(1868);
        const sort = (list, loose) => list.sort(((a, b) => compareBuild(a, b, loose)));
        module.exports = sort;
    },
    398: (module, __unused_webpack_exports, __webpack_require__) => {
        const parse = __webpack_require__(5692);
        const valid = (version, options) => {
            const v = parse(version, options);
            return v ? v.version : null;
        };
        module.exports = valid;
    },
    8873: (module, __unused_webpack_exports, __webpack_require__) => {
        const internalRe = __webpack_require__(9022);
        const constants = __webpack_require__(39);
        const SemVer = __webpack_require__(9510);
        const identifiers = __webpack_require__(8822);
        const parse = __webpack_require__(5692);
        const valid = __webpack_require__(398);
        const clean = __webpack_require__(6457);
        const inc = __webpack_require__(515);
        const diff = __webpack_require__(1007);
        const major = __webpack_require__(2611);
        const minor = __webpack_require__(6319);
        const patch = __webpack_require__(7368);
        const prerelease = __webpack_require__(7794);
        const compare = __webpack_require__(3992);
        const rcompare = __webpack_require__(9114);
        const compareLoose = __webpack_require__(5919);
        const compareBuild = __webpack_require__(1868);
        const sort = __webpack_require__(8753);
        const rsort = __webpack_require__(3843);
        const gt = __webpack_require__(2260);
        const lt = __webpack_require__(290);
        const eq = __webpack_require__(8565);
        const neq = __webpack_require__(3328);
        const gte = __webpack_require__(8192);
        const lte = __webpack_require__(5891);
        const cmp = __webpack_require__(5452);
        const coerce = __webpack_require__(9469);
        const Comparator = __webpack_require__(3134);
        const Range = __webpack_require__(7374);
        const satisfies = __webpack_require__(9845);
        const toComparators = __webpack_require__(8384);
        const maxSatisfying = __webpack_require__(6369);
        const minSatisfying = __webpack_require__(2663);
        const minVersion = __webpack_require__(75);
        const validRange = __webpack_require__(9178);
        const outside = __webpack_require__(9434);
        const gtr = __webpack_require__(8237);
        const ltr = __webpack_require__(9860);
        const intersects = __webpack_require__(8258);
        const simplifyRange = __webpack_require__(3607);
        const subset = __webpack_require__(2199);
        module.exports = {
            parse,
            valid,
            clean,
            inc,
            diff,
            major,
            minor,
            patch,
            prerelease,
            compare,
            rcompare,
            compareLoose,
            compareBuild,
            sort,
            rsort,
            gt,
            lt,
            eq,
            neq,
            gte,
            lte,
            cmp,
            coerce,
            Comparator,
            Range,
            satisfies,
            toComparators,
            maxSatisfying,
            minSatisfying,
            minVersion,
            validRange,
            outside,
            gtr,
            ltr,
            intersects,
            simplifyRange,
            subset,
            SemVer,
            re: internalRe.re,
            src: internalRe.src,
            tokens: internalRe.t,
            SEMVER_SPEC_VERSION: constants.SEMVER_SPEC_VERSION,
            RELEASE_TYPES: constants.RELEASE_TYPES,
            compareIdentifiers: identifiers.compareIdentifiers,
            rcompareIdentifiers: identifiers.rcompareIdentifiers
        };
    },
    39: module => {
        const SEMVER_SPEC_VERSION = "2.0.0";
        const MAX_LENGTH = 256;
        const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;
        const MAX_SAFE_COMPONENT_LENGTH = 16;
        const MAX_SAFE_BUILD_LENGTH = MAX_LENGTH - 6;
        const RELEASE_TYPES = [ "major", "premajor", "minor", "preminor", "patch", "prepatch", "prerelease" ];
        module.exports = {
            MAX_LENGTH,
            MAX_SAFE_COMPONENT_LENGTH,
            MAX_SAFE_BUILD_LENGTH,
            MAX_SAFE_INTEGER,
            RELEASE_TYPES,
            SEMVER_SPEC_VERSION,
            FLAG_INCLUDE_PRERELEASE: 1,
            FLAG_LOOSE: 2
        };
    },
    6830: module => {
        const debug = true && {
            NODE_ENV: "production",
            COCONUT: "false",
            EDGE: "false",
            FIREFOX: "true",
            IS_AXE_PRO: "false",
            MANIFEST_VERSION: 2,
            E2E: false,
            DOCS_SITE_URL: "https://docs.deque.com/devtools-html",
            ISSUES_URL: "https://docs.deque.com/issue-help/1.0.0/en",
            AXE_CONFIG_URL: "https://docs.deque.com/devtools-server/4.0.0/en/axe-configuration",
            MANUAL_ISSUE_URL: "https://docs.deque.com/devtools-html/4.0.0/en/devtools-manual-issue",
            WHATS_LEFT_TO_TEST_URL: "https://docs.deque.com/devtools-html/4.0.0/en/devtools-whatslefttotest",
            USER_FLOW_URL: "https://docs.deque.com/devtools-html/4.0.0/en/user-flow-analysis",
            AXE_PRO_TRIAL_PATH: "/axe-devtools-pro/trial",
            ENV: "production",
            AXE_PRO_URL: "https://axe.deque.com",
            USAGE_SERVICE_URL: "https://usage.deque.com",
            AMPLITUDE_API_KEY: "a1ce09d0b14ddcc12ab7b508b6606a2f",
            DATADOG_CLIENT_TOKEN: "puba2eb4ed47c6eb69ce20ef237db754ff8"
        }.NODE_DEBUG && /\bsemver\b/i.test({
            NODE_ENV: "production",
            COCONUT: "false",
            EDGE: "false",
            FIREFOX: "true",
            IS_AXE_PRO: "false",
            MANIFEST_VERSION: 2,
            E2E: false,
            DOCS_SITE_URL: "https://docs.deque.com/devtools-html",
            ISSUES_URL: "https://docs.deque.com/issue-help/1.0.0/en",
            AXE_CONFIG_URL: "https://docs.deque.com/devtools-server/4.0.0/en/axe-configuration",
            MANUAL_ISSUE_URL: "https://docs.deque.com/devtools-html/4.0.0/en/devtools-manual-issue",
            WHATS_LEFT_TO_TEST_URL: "https://docs.deque.com/devtools-html/4.0.0/en/devtools-whatslefttotest",
            USER_FLOW_URL: "https://docs.deque.com/devtools-html/4.0.0/en/user-flow-analysis",
            AXE_PRO_TRIAL_PATH: "/axe-devtools-pro/trial",
            ENV: "production",
            AXE_PRO_URL: "https://axe.deque.com",
            USAGE_SERVICE_URL: "https://usage.deque.com",
            AMPLITUDE_API_KEY: "a1ce09d0b14ddcc12ab7b508b6606a2f",
            DATADOG_CLIENT_TOKEN: "puba2eb4ed47c6eb69ce20ef237db754ff8"
        }.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {};
        module.exports = debug;
    },
    8822: module => {
        const numeric = /^[0-9]+$/;
        const compareIdentifiers = (a, b) => {
            const anum = numeric.test(a);
            const bnum = numeric.test(b);
            if (anum && bnum) {
                a = +a;
                b = +b;
            }
            return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
        };
        const rcompareIdentifiers = (a, b) => compareIdentifiers(b, a);
        module.exports = {
            compareIdentifiers,
            rcompareIdentifiers
        };
    },
    203: module => {
        class LRUCache {
            constructor() {
                this.max = 1e3;
                this.map = new Map;
            }
            get(key) {
                const value = this.map.get(key);
                if (void 0 === value) return; else {
                    this.map.delete(key);
                    this.map.set(key, value);
                    return value;
                }
            }
            delete(key) {
                return this.map.delete(key);
            }
            set(key, value) {
                const deleted = this.delete(key);
                if (!deleted && void 0 !== value) {
                    if (this.map.size >= this.max) {
                        const firstKey = this.map.keys().next().value;
                        this.delete(firstKey);
                    }
                    this.map.set(key, value);
                }
                return this;
            }
        }
        module.exports = LRUCache;
    },
    8716: module => {
        const looseOption = Object.freeze({
            loose: true
        });
        const emptyOpts = Object.freeze({});
        const parseOptions = options => {
            if (!options) return emptyOpts;
            if ("object" !== typeof options) return looseOption;
            return options;
        };
        module.exports = parseOptions;
    },
    9022: (module, exports, __webpack_require__) => {
        const {MAX_SAFE_COMPONENT_LENGTH, MAX_SAFE_BUILD_LENGTH, MAX_LENGTH} = __webpack_require__(39);
        const debug = __webpack_require__(6830);
        exports = module.exports = {};
        const re = exports.re = [];
        const safeRe = exports.safeRe = [];
        const src = exports.src = [];
        const t = exports.t = {};
        let R = 0;
        const LETTERDASHNUMBER = "[a-zA-Z0-9-]";
        const safeRegexReplacements = [ [ "\\s", 1 ], [ "\\d", MAX_LENGTH ], [ LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH ] ];
        const makeSafeRegex = value => {
            for (const [token, max] of safeRegexReplacements) value = value.split(`${token}*`).join(`${token}{0,${max}}`).split(`${token}+`).join(`${token}{1,${max}}`);
            return value;
        };
        const createToken = (name, value, isGlobal) => {
            const safe = makeSafeRegex(value);
            const index = R++;
            debug(name, index, value);
            t[name] = index;
            src[index] = value;
            re[index] = new RegExp(value, isGlobal ? "g" : void 0);
            safeRe[index] = new RegExp(safe, isGlobal ? "g" : void 0);
        };
        createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
        createToken("NUMERICIDENTIFIERLOOSE", "\\d+");
        createToken("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`);
        createToken("MAINVERSION", `(${src[t.NUMERICIDENTIFIER]})\\.` + `(${src[t.NUMERICIDENTIFIER]})\\.` + `(${src[t.NUMERICIDENTIFIER]})`);
        createToken("MAINVERSIONLOOSE", `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` + `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` + `(${src[t.NUMERICIDENTIFIERLOOSE]})`);
        createToken("PRERELEASEIDENTIFIER", `(?:${src[t.NUMERICIDENTIFIER]}|${src[t.NONNUMERICIDENTIFIER]})`);
        createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t.NUMERICIDENTIFIERLOOSE]}|${src[t.NONNUMERICIDENTIFIER]})`);
        createToken("PRERELEASE", `(?:-(${src[t.PRERELEASEIDENTIFIER]}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`);
        createToken("PRERELEASELOOSE", `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`);
        createToken("BUILDIDENTIFIER", `${LETTERDASHNUMBER}+`);
        createToken("BUILD", `(?:\\+(${src[t.BUILDIDENTIFIER]}(?:\\.${src[t.BUILDIDENTIFIER]})*))`);
        createToken("FULLPLAIN", `v?${src[t.MAINVERSION]}${src[t.PRERELEASE]}?${src[t.BUILD]}?`);
        createToken("FULL", `^${src[t.FULLPLAIN]}$`);
        createToken("LOOSEPLAIN", `[v=\\s]*${src[t.MAINVERSIONLOOSE]}${src[t.PRERELEASELOOSE]}?${src[t.BUILD]}?`);
        createToken("LOOSE", `^${src[t.LOOSEPLAIN]}$`);
        createToken("GTLT", "((?:<|>)?=?)");
        createToken("XRANGEIDENTIFIERLOOSE", `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
        createToken("XRANGEIDENTIFIER", `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`);
        createToken("XRANGEPLAIN", `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})` + `(?:\\.(${src[t.XRANGEIDENTIFIER]})` + `(?:\\.(${src[t.XRANGEIDENTIFIER]})` + `(?:${src[t.PRERELEASE]})?${src[t.BUILD]}?` + `)?)?`);
        createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})` + `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` + `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` + `(?:${src[t.PRERELEASELOOSE]})?${src[t.BUILD]}?` + `)?)?`);
        createToken("XRANGE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`);
        createToken("XRANGELOOSE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`);
        createToken("COERCEPLAIN", `${"(^|[^\\d])" + "(\\d{1,"}${MAX_SAFE_COMPONENT_LENGTH}})` + `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?` + `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?`);
        createToken("COERCE", `${src[t.COERCEPLAIN]}(?:$|[^\\d])`);
        createToken("COERCEFULL", src[t.COERCEPLAIN] + `(?:${src[t.PRERELEASE]})?` + `(?:${src[t.BUILD]})?` + `(?:$|[^\\d])`);
        createToken("COERCERTL", src[t.COERCE], true);
        createToken("COERCERTLFULL", src[t.COERCEFULL], true);
        createToken("LONETILDE", "(?:~>?)");
        createToken("TILDETRIM", `(\\s*)${src[t.LONETILDE]}\\s+`, true);
        exports.tildeTrimReplace = "$1~";
        createToken("TILDE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`);
        createToken("TILDELOOSE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`);
        createToken("LONECARET", "(?:\\^)");
        createToken("CARETTRIM", `(\\s*)${src[t.LONECARET]}\\s+`, true);
        exports.caretTrimReplace = "$1^";
        createToken("CARET", `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`);
        createToken("CARETLOOSE", `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`);
        createToken("COMPARATORLOOSE", `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`);
        createToken("COMPARATOR", `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`);
        createToken("COMPARATORTRIM", `(\\s*)${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true);
        exports.comparatorTrimReplace = "$1$2$3";
        createToken("HYPHENRANGE", `^\\s*(${src[t.XRANGEPLAIN]})` + `\\s+-\\s+` + `(${src[t.XRANGEPLAIN]})` + `\\s*$`);
        createToken("HYPHENRANGELOOSE", `^\\s*(${src[t.XRANGEPLAINLOOSE]})` + `\\s+-\\s+` + `(${src[t.XRANGEPLAINLOOSE]})` + `\\s*$`);
        createToken("STAR", "(<|>)?=?\\s*\\*");
        createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
        createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
    },
    8237: (module, __unused_webpack_exports, __webpack_require__) => {
        const outside = __webpack_require__(9434);
        const gtr = (version, range, options) => outside(version, range, ">", options);
        module.exports = gtr;
    },
    8258: (module, __unused_webpack_exports, __webpack_require__) => {
        const Range = __webpack_require__(7374);
        const intersects = (r1, r2, options) => {
            r1 = new Range(r1, options);
            r2 = new Range(r2, options);
            return r1.intersects(r2, options);
        };
        module.exports = intersects;
    },
    9860: (module, __unused_webpack_exports, __webpack_require__) => {
        const outside = __webpack_require__(9434);
        const ltr = (version, range, options) => outside(version, range, "<", options);
        module.exports = ltr;
    },
    6369: (module, __unused_webpack_exports, __webpack_require__) => {
        const SemVer = __webpack_require__(9510);
        const Range = __webpack_require__(7374);
        const maxSatisfying = (versions, range, options) => {
            let max = null;
            let maxSV = null;
            let rangeObj = null;
            try {
                rangeObj = new Range(range, options);
            } catch (er) {
                return null;
            }
            versions.forEach((v => {
                if (rangeObj.test(v)) if (!max || -1 === maxSV.compare(v)) {
                    max = v;
                    maxSV = new SemVer(max, options);
                }
            }));
            return max;
        };
        module.exports = maxSatisfying;
    },
    75: (module, __unused_webpack_exports, __webpack_require__) => {
        const SemVer = __webpack_require__(9510);
        const Range = __webpack_require__(7374);
        const gt = __webpack_require__(2260);
        const minVersion = (range, loose) => {
            range = new Range(range, loose);
            let minver = new SemVer("0.0.0");
            if (range.test(minver)) return minver;
            minver = new SemVer("0.0.0-0");
            if (range.test(minver)) return minver;
            minver = null;
            for (let i = 0; i < range.set.length; ++i) {
                const comparators = range.set[i];
                let setMin = null;
                comparators.forEach((comparator => {
                    const compver = new SemVer(comparator.semver.version);
                    switch (comparator.operator) {
                      case ">":
                        if (0 === compver.prerelease.length) compver.patch++; else compver.prerelease.push(0);
                        compver.raw = compver.format();

                      case "":
                      case ">=":
                        if (!setMin || gt(compver, setMin)) setMin = compver;
                        break;

                      case "<":
                      case "<=":
                        break;

                      default:
                        throw new Error(`Unexpected operation: ${comparator.operator}`);
                    }
                }));
                if (setMin && (!minver || gt(minver, setMin))) minver = setMin;
            }
            if (minver && range.test(minver)) return minver;
            return null;
        };
        module.exports = minVersion;
    },
    9434: (module, __unused_webpack_exports, __webpack_require__) => {
        const SemVer = __webpack_require__(9510);
        const Comparator = __webpack_require__(3134);
        const {ANY} = Comparator;
        const Range = __webpack_require__(7374);
        const satisfies = __webpack_require__(9845);
        const gt = __webpack_require__(2260);
        const lt = __webpack_require__(290);
        const lte = __webpack_require__(5891);
        const gte = __webpack_require__(8192);
        const outside = (version, range, hilo, options) => {
            version = new SemVer(version, options);
            range = new Range(range, options);
            let gtfn, ltefn, ltfn, comp, ecomp;
            switch (hilo) {
              case ">":
                gtfn = gt;
                ltefn = lte;
                ltfn = lt;
                comp = ">";
                ecomp = ">=";
                break;

              case "<":
                gtfn = lt;
                ltefn = gte;
                ltfn = gt;
                comp = "<";
                ecomp = "<=";
                break;

              default:
                throw new TypeError('Must provide a hilo val of "<" or ">"');
            }
            if (satisfies(version, range, options)) return false;
            for (let i = 0; i < range.set.length; ++i) {
                const comparators = range.set[i];
                let high = null;
                let low = null;
                comparators.forEach((comparator => {
                    if (comparator.semver === ANY) comparator = new Comparator(">=0.0.0");
                    high = high || comparator;
                    low = low || comparator;
                    if (gtfn(comparator.semver, high.semver, options)) high = comparator; else if (ltfn(comparator.semver, low.semver, options)) low = comparator;
                }));
                if (high.operator === comp || high.operator === ecomp) return false;
                if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) return false; else if (low.operator === ecomp && ltfn(version, low.semver)) return false;
            }
            return true;
        };
        module.exports = outside;
    },
    3607: (module, __unused_webpack_exports, __webpack_require__) => {
        const satisfies = __webpack_require__(9845);
        const compare = __webpack_require__(3992);
        module.exports = (versions, range, options) => {
            const set = [];
            let first = null;
            let prev = null;
            const v = versions.sort(((a, b) => compare(a, b, options)));
            for (const version of v) {
                const included = satisfies(version, range, options);
                if (included) {
                    prev = version;
                    if (!first) first = version;
                } else {
                    if (prev) set.push([ first, prev ]);
                    prev = null;
                    first = null;
                }
            }
            if (first) set.push([ first, null ]);
            const ranges = [];
            for (const [min, max] of set) if (min === max) ranges.push(min); else if (!max && min === v[0]) ranges.push("*"); else if (!max) ranges.push(`>=${min}`); else if (min === v[0]) ranges.push(`<=${max}`); else ranges.push(`${min} - ${max}`);
            const simplified = ranges.join(" || ");
            const original = "string" === typeof range.raw ? range.raw : String(range);
            return simplified.length < original.length ? simplified : range;
        };
    },
    2199: (module, __unused_webpack_exports, __webpack_require__) => {
        const Range = __webpack_require__(7374);
        const Comparator = __webpack_require__(3134);
        const {ANY} = Comparator;
        const satisfies = __webpack_require__(9845);
        const compare = __webpack_require__(3992);
        const subset = (sub, dom, options = {}) => {
            if (sub === dom) return true;
            sub = new Range(sub, options);
            dom = new Range(dom, options);
            let sawNonNull = false;
            OUTER: for (const simpleSub of sub.set) {
                for (const simpleDom of dom.set) {
                    const isSub = simpleSubset(simpleSub, simpleDom, options);
                    sawNonNull = sawNonNull || null !== isSub;
                    if (isSub) continue OUTER;
                }
                if (sawNonNull) return false;
            }
            return true;
        };
        const minimumVersionWithPreRelease = [ new Comparator(">=0.0.0-0") ];
        const minimumVersion = [ new Comparator(">=0.0.0") ];
        const simpleSubset = (sub, dom, options) => {
            if (sub === dom) return true;
            if (1 === sub.length && sub[0].semver === ANY) if (1 === dom.length && dom[0].semver === ANY) return true; else if (options.includePrerelease) sub = minimumVersionWithPreRelease; else sub = minimumVersion;
            if (1 === dom.length && dom[0].semver === ANY) if (options.includePrerelease) return true; else dom = minimumVersion;
            const eqSet = new Set;
            let gt, lt;
            for (const c of sub) if (">" === c.operator || ">=" === c.operator) gt = higherGT(gt, c, options); else if ("<" === c.operator || "<=" === c.operator) lt = lowerLT(lt, c, options); else eqSet.add(c.semver);
            if (eqSet.size > 1) return null;
            let gtltComp;
            if (gt && lt) {
                gtltComp = compare(gt.semver, lt.semver, options);
                if (gtltComp > 0) return null; else if (0 === gtltComp && (">=" !== gt.operator || "<=" !== lt.operator)) return null;
            }
            for (const eq of eqSet) {
                if (gt && !satisfies(eq, String(gt), options)) return null;
                if (lt && !satisfies(eq, String(lt), options)) return null;
                for (const c of dom) if (!satisfies(eq, String(c), options)) return false;
                return true;
            }
            let higher, lower;
            let hasDomLT, hasDomGT;
            let needDomLTPre = lt && !options.includePrerelease && lt.semver.prerelease.length ? lt.semver : false;
            let needDomGTPre = gt && !options.includePrerelease && gt.semver.prerelease.length ? gt.semver : false;
            if (needDomLTPre && 1 === needDomLTPre.prerelease.length && "<" === lt.operator && 0 === needDomLTPre.prerelease[0]) needDomLTPre = false;
            for (const c of dom) {
                hasDomGT = hasDomGT || ">" === c.operator || ">=" === c.operator;
                hasDomLT = hasDomLT || "<" === c.operator || "<=" === c.operator;
                if (gt) {
                    if (needDomGTPre) if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomGTPre.major && c.semver.minor === needDomGTPre.minor && c.semver.patch === needDomGTPre.patch) needDomGTPre = false;
                    if (">" === c.operator || ">=" === c.operator) {
                        higher = higherGT(gt, c, options);
                        if (higher === c && higher !== gt) return false;
                    } else if (">=" === gt.operator && !satisfies(gt.semver, String(c), options)) return false;
                }
                if (lt) {
                    if (needDomLTPre) if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomLTPre.major && c.semver.minor === needDomLTPre.minor && c.semver.patch === needDomLTPre.patch) needDomLTPre = false;
                    if ("<" === c.operator || "<=" === c.operator) {
                        lower = lowerLT(lt, c, options);
                        if (lower === c && lower !== lt) return false;
                    } else if ("<=" === lt.operator && !satisfies(lt.semver, String(c), options)) return false;
                }
                if (!c.operator && (lt || gt) && 0 !== gtltComp) return false;
            }
            if (gt && hasDomLT && !lt && 0 !== gtltComp) return false;
            if (lt && hasDomGT && !gt && 0 !== gtltComp) return false;
            if (needDomGTPre || needDomLTPre) return false;
            return true;
        };
        const higherGT = (a, b, options) => {
            if (!a) return b;
            const comp = compare(a.semver, b.semver, options);
            return comp > 0 ? a : comp < 0 ? b : ">" === b.operator && ">=" === a.operator ? b : a;
        };
        const lowerLT = (a, b, options) => {
            if (!a) return b;
            const comp = compare(a.semver, b.semver, options);
            return comp < 0 ? a : comp > 0 ? b : "<" === b.operator && "<=" === a.operator ? b : a;
        };
        module.exports = subset;
    },
    8384: (module, __unused_webpack_exports, __webpack_require__) => {
        const Range = __webpack_require__(7374);
        const toComparators = (range, options) => new Range(range, options).set.map((comp => comp.map((c => c.value)).join(" ").trim().split(" ")));
        module.exports = toComparators;
    },
    9178: (module, __unused_webpack_exports, __webpack_require__) => {
        const Range = __webpack_require__(7374);
        const validRange = (range, options) => {
            try {
                return new Range(range, options).range || "*";
            } catch (er) {
                return null;
            }
        };
        module.exports = validRange;
    },
    5337: (module, __unused_webpack_exports, __webpack_require__) => {
        "use strict";
        var GetIntrinsic = __webpack_require__(8750);
        var callBound = __webpack_require__(2737);
        var inspect = __webpack_require__(6524);
        var $TypeError = GetIntrinsic("%TypeError%");
        var $WeakMap = GetIntrinsic("%WeakMap%", true);
        var $Map = GetIntrinsic("%Map%", true);
        var $weakMapGet = callBound("WeakMap.prototype.get", true);
        var $weakMapSet = callBound("WeakMap.prototype.set", true);
        var $weakMapHas = callBound("WeakMap.prototype.has", true);
        var $mapGet = callBound("Map.prototype.get", true);
        var $mapSet = callBound("Map.prototype.set", true);
        var $mapHas = callBound("Map.prototype.has", true);
        var listGetNode = function(list, key) {
            for (var curr, prev = list; null !== (curr = prev.next); prev = curr) if (curr.key === key) {
                prev.next = curr.next;
                curr.next = list.next;
                list.next = curr;
                return curr;
            }
        };
        var listGet = function(objects, key) {
            var node = listGetNode(objects, key);
            return node && node.value;
        };
        var listSet = function(objects, key, value) {
            var node = listGetNode(objects, key);
            if (node) node.value = value; else objects.next = {
                key,
                next: objects.next,
                value
            };
        };
        var listHas = function(objects, key) {
            return !!listGetNode(objects, key);
        };
        module.exports = function() {
            var $wm;
            var $m;
            var $o;
            var channel = {
                assert: function(key) {
                    if (!channel.has(key)) throw new $TypeError("Side channel does not contain " + inspect(key));
                },
                get: function(key) {
                    if ($WeakMap && key && ("object" === typeof key || "function" === typeof key)) {
                        if ($wm) return $weakMapGet($wm, key);
                    } else if ($Map) {
                        if ($m) return $mapGet($m, key);
                    } else if ($o) return listGet($o, key);
                },
                has: function(key) {
                    if ($WeakMap && key && ("object" === typeof key || "function" === typeof key)) {
                        if ($wm) return $weakMapHas($wm, key);
                    } else if ($Map) {
                        if ($m) return $mapHas($m, key);
                    } else if ($o) return listHas($o, key);
                    return false;
                },
                set: function(key, value) {
                    if ($WeakMap && key && ("object" === typeof key || "function" === typeof key)) {
                        if (!$wm) $wm = new $WeakMap;
                        $weakMapSet($wm, key, value);
                    } else if ($Map) {
                        if (!$m) $m = new $Map;
                        $mapSet($m, key, value);
                    } else {
                        if (!$o) $o = {
                            key: {},
                            next: null
                        };
                        listSet($o, key, value);
                    }
                }
            };
            return channel;
        };
    },
    9312: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
            gn: () => __decorate,
            pi: () => __assign,
            pr: () => __spreadArrays
        });
        var __assign = function() {
            __assign = Object.assign || function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        function __decorate(decorators, target, key, desc) {
            var d, c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc;
            if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            return c > 3 && r && Object.defineProperty(target, key, r), r;
        }
        function __spreadArrays() {
            for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
            var r = Array(s), k = 0;
            for (i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, 
            k++) r[k] = a[j];
            return r;
        }
    },
    6579: module => {
        module.exports = function(arg) {
            return arg && "object" === typeof arg && "function" === typeof arg.copy && "function" === typeof arg.fill && "function" === typeof arg.readUInt8;
        };
    },
    7673: (__unused_webpack_module, exports, __webpack_require__) => {
        "use strict";
        var isArgumentsObject = __webpack_require__(7740);
        var isGeneratorFunction = __webpack_require__(8265);
        var whichTypedArray = __webpack_require__(2505);
        var isTypedArray = __webpack_require__(387);
        function uncurryThis(f) {
            return f.call.bind(f);
        }
        var BigIntSupported = "undefined" !== typeof BigInt;
        var SymbolSupported = "undefined" !== typeof Symbol;
        var ObjectToString = uncurryThis(Object.prototype.toString);
        var numberValue = uncurryThis(Number.prototype.valueOf);
        var stringValue = uncurryThis(String.prototype.valueOf);
        var booleanValue = uncurryThis(Boolean.prototype.valueOf);
        if (BigIntSupported) var bigIntValue = uncurryThis(BigInt.prototype.valueOf);
        if (SymbolSupported) var symbolValue = uncurryThis(Symbol.prototype.valueOf);
        function checkBoxedPrimitive(value, prototypeValueOf) {
            if ("object" !== typeof value) return false;
            try {
                prototypeValueOf(value);
                return true;
            } catch (e) {
                return false;
            }
        }
        exports.isArgumentsObject = isArgumentsObject;
        exports.isGeneratorFunction = isGeneratorFunction;
        exports.isTypedArray = isTypedArray;
        function isPromise(input) {
            return "undefined" !== typeof Promise && input instanceof Promise || null !== input && "object" === typeof input && "function" === typeof input.then && "function" === typeof input.catch;
        }
        exports.isPromise = isPromise;
        function isArrayBufferView(value) {
            if ("undefined" !== typeof ArrayBuffer && ArrayBuffer.isView) return ArrayBuffer.isView(value);
            return isTypedArray(value) || isDataView(value);
        }
        exports.isArrayBufferView = isArrayBufferView;
        function isUint8Array(value) {
            return "Uint8Array" === whichTypedArray(value);
        }
        exports.isUint8Array = isUint8Array;
        function isUint8ClampedArray(value) {
            return "Uint8ClampedArray" === whichTypedArray(value);
        }
        exports.isUint8ClampedArray = isUint8ClampedArray;
        function isUint16Array(value) {
            return "Uint16Array" === whichTypedArray(value);
        }
        exports.isUint16Array = isUint16Array;
        function isUint32Array(value) {
            return "Uint32Array" === whichTypedArray(value);
        }
        exports.isUint32Array = isUint32Array;
        function isInt8Array(value) {
            return "Int8Array" === whichTypedArray(value);
        }
        exports.isInt8Array = isInt8Array;
        function isInt16Array(value) {
            return "Int16Array" === whichTypedArray(value);
        }
        exports.isInt16Array = isInt16Array;
        function isInt32Array(value) {
            return "Int32Array" === whichTypedArray(value);
        }
        exports.isInt32Array = isInt32Array;
        function isFloat32Array(value) {
            return "Float32Array" === whichTypedArray(value);
        }
        exports.isFloat32Array = isFloat32Array;
        function isFloat64Array(value) {
            return "Float64Array" === whichTypedArray(value);
        }
        exports.isFloat64Array = isFloat64Array;
        function isBigInt64Array(value) {
            return "BigInt64Array" === whichTypedArray(value);
        }
        exports.isBigInt64Array = isBigInt64Array;
        function isBigUint64Array(value) {
            return "BigUint64Array" === whichTypedArray(value);
        }
        exports.isBigUint64Array = isBigUint64Array;
        function isMapToString(value) {
            return "[object Map]" === ObjectToString(value);
        }
        isMapToString.working = "undefined" !== typeof Map && isMapToString(new Map);
        function isMap(value) {
            if ("undefined" === typeof Map) return false;
            return isMapToString.working ? isMapToString(value) : value instanceof Map;
        }
        exports.isMap = isMap;
        function isSetToString(value) {
            return "[object Set]" === ObjectToString(value);
        }
        isSetToString.working = "undefined" !== typeof Set && isSetToString(new Set);
        function isSet(value) {
            if ("undefined" === typeof Set) return false;
            return isSetToString.working ? isSetToString(value) : value instanceof Set;
        }
        exports.isSet = isSet;
        function isWeakMapToString(value) {
            return "[object WeakMap]" === ObjectToString(value);
        }
        isWeakMapToString.working = "undefined" !== typeof WeakMap && isWeakMapToString(new WeakMap);
        function isWeakMap(value) {
            if ("undefined" === typeof WeakMap) return false;
            return isWeakMapToString.working ? isWeakMapToString(value) : value instanceof WeakMap;
        }
        exports.isWeakMap = isWeakMap;
        function isWeakSetToString(value) {
            return "[object WeakSet]" === ObjectToString(value);
        }
        isWeakSetToString.working = "undefined" !== typeof WeakSet && isWeakSetToString(new WeakSet);
        function isWeakSet(value) {
            return isWeakSetToString(value);
        }
        exports.isWeakSet = isWeakSet;
        function isArrayBufferToString(value) {
            return "[object ArrayBuffer]" === ObjectToString(value);
        }
        isArrayBufferToString.working = "undefined" !== typeof ArrayBuffer && isArrayBufferToString(new ArrayBuffer);
        function isArrayBuffer(value) {
            if ("undefined" === typeof ArrayBuffer) return false;
            return isArrayBufferToString.working ? isArrayBufferToString(value) : value instanceof ArrayBuffer;
        }
        exports.isArrayBuffer = isArrayBuffer;
        function isDataViewToString(value) {
            return "[object DataView]" === ObjectToString(value);
        }
        isDataViewToString.working = "undefined" !== typeof ArrayBuffer && "undefined" !== typeof DataView && isDataViewToString(new DataView(new ArrayBuffer(1), 0, 1));
        function isDataView(value) {
            if ("undefined" === typeof DataView) return false;
            return isDataViewToString.working ? isDataViewToString(value) : value instanceof DataView;
        }
        exports.isDataView = isDataView;
        function isSharedArrayBufferToString(value) {
            return "[object SharedArrayBuffer]" === ObjectToString(value);
        }
        isSharedArrayBufferToString.working = "undefined" !== typeof SharedArrayBuffer && isSharedArrayBufferToString(new SharedArrayBuffer);
        function isSharedArrayBuffer(value) {
            if ("undefined" === typeof SharedArrayBuffer) return false;
            return isSharedArrayBufferToString.working ? isSharedArrayBufferToString(value) : value instanceof SharedArrayBuffer;
        }
        exports.isSharedArrayBuffer = isSharedArrayBuffer;
        function isAsyncFunction(value) {
            return "[object AsyncFunction]" === ObjectToString(value);
        }
        exports.isAsyncFunction = isAsyncFunction;
        function isMapIterator(value) {
            return "[object Map Iterator]" === ObjectToString(value);
        }
        exports.isMapIterator = isMapIterator;
        function isSetIterator(value) {
            return "[object Set Iterator]" === ObjectToString(value);
        }
        exports.isSetIterator = isSetIterator;
        function isGeneratorObject(value) {
            return "[object Generator]" === ObjectToString(value);
        }
        exports.isGeneratorObject = isGeneratorObject;
        function isWebAssemblyCompiledModule(value) {
            return "[object WebAssembly.Module]" === ObjectToString(value);
        }
        exports.isWebAssemblyCompiledModule = isWebAssemblyCompiledModule;
        function isNumberObject(value) {
            return checkBoxedPrimitive(value, numberValue);
        }
        exports.isNumberObject = isNumberObject;
        function isStringObject(value) {
            return checkBoxedPrimitive(value, stringValue);
        }
        exports.isStringObject = isStringObject;
        function isBooleanObject(value) {
            return checkBoxedPrimitive(value, booleanValue);
        }
        exports.isBooleanObject = isBooleanObject;
        function isBigIntObject(value) {
            return BigIntSupported && checkBoxedPrimitive(value, bigIntValue);
        }
        exports.isBigIntObject = isBigIntObject;
        function isSymbolObject(value) {
            return SymbolSupported && checkBoxedPrimitive(value, symbolValue);
        }
        exports.isSymbolObject = isSymbolObject;
        function isBoxedPrimitive(value) {
            return isNumberObject(value) || isStringObject(value) || isBooleanObject(value) || isBigIntObject(value) || isSymbolObject(value);
        }
        exports.isBoxedPrimitive = isBoxedPrimitive;
        function isAnyArrayBuffer(value) {
            return "undefined" !== typeof Uint8Array && (isArrayBuffer(value) || isSharedArrayBuffer(value));
        }
        exports.isAnyArrayBuffer = isAnyArrayBuffer;
        [ "isProxy", "isExternal", "isModuleNamespaceObject" ].forEach((function(method) {
            Object.defineProperty(exports, method, {
                enumerable: false,
                value: function() {
                    throw new Error(method + " is not supported in userland");
                }
            });
        }));
    },
    1323: (__unused_webpack_module, exports, __webpack_require__) => {
        var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors || function(obj) {
            var keys = Object.keys(obj);
            var descriptors = {};
            for (var i = 0; i < keys.length; i++) descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
            return descriptors;
        };
        var formatRegExp = /%[sdj%]/g;
        exports.format = function(f) {
            if (!isString(f)) {
                var objects = [];
                for (var i = 0; i < arguments.length; i++) objects.push(inspect(arguments[i]));
                return objects.join(" ");
            }
            i = 1;
            var args = arguments;
            var len = args.length;
            var str = String(f).replace(formatRegExp, (function(x) {
                if ("%%" === x) return "%";
                if (i >= len) return x;
                switch (x) {
                  case "%s":
                    return String(args[i++]);

                  case "%d":
                    return Number(args[i++]);

                  case "%j":
                    try {
                        return JSON.stringify(args[i++]);
                    } catch (_) {
                        return "[Circular]";
                    }

                  default:
                    return x;
                }
            }));
            for (var x = args[i]; i < len; x = args[++i]) if (isNull(x) || !isObject(x)) str += " " + x; else str += " " + inspect(x);
            return str;
        };
        exports.deprecate = function(fn, msg) {
            if (true && true === {}.noDeprecation) return fn;
            if (false) ;
            var warned = false;
            function deprecated() {
                if (!warned) {
                    if ({}.throwDeprecation) throw new Error(msg); else if ({}.traceDeprecation) console.trace(msg); else console.error(msg);
                    warned = true;
                }
                return fn.apply(this, arguments);
            }
            return deprecated;
        };
        var debugs = {};
        var debugEnvRegex = /^$/;
        if ({
            NODE_ENV: "production",
            COCONUT: "false",
            EDGE: "false",
            FIREFOX: "true",
            IS_AXE_PRO: "false",
            MANIFEST_VERSION: 2,
            E2E: false,
            DOCS_SITE_URL: "https://docs.deque.com/devtools-html",
            ISSUES_URL: "https://docs.deque.com/issue-help/1.0.0/en",
            AXE_CONFIG_URL: "https://docs.deque.com/devtools-server/4.0.0/en/axe-configuration",
            MANUAL_ISSUE_URL: "https://docs.deque.com/devtools-html/4.0.0/en/devtools-manual-issue",
            WHATS_LEFT_TO_TEST_URL: "https://docs.deque.com/devtools-html/4.0.0/en/devtools-whatslefttotest",
            USER_FLOW_URL: "https://docs.deque.com/devtools-html/4.0.0/en/user-flow-analysis",
            AXE_PRO_TRIAL_PATH: "/axe-devtools-pro/trial",
            ENV: "production",
            AXE_PRO_URL: "https://axe.deque.com",
            USAGE_SERVICE_URL: "https://usage.deque.com",
            AMPLITUDE_API_KEY: "a1ce09d0b14ddcc12ab7b508b6606a2f",
            DATADOG_CLIENT_TOKEN: "puba2eb4ed47c6eb69ce20ef237db754ff8"
        }.NODE_DEBUG) {
            var debugEnv = {
                NODE_ENV: "production",
                COCONUT: "false",
                EDGE: "false",
                FIREFOX: "true",
                IS_AXE_PRO: "false",
                MANIFEST_VERSION: 2,
                E2E: false,
                DOCS_SITE_URL: "https://docs.deque.com/devtools-html",
                ISSUES_URL: "https://docs.deque.com/issue-help/1.0.0/en",
                AXE_CONFIG_URL: "https://docs.deque.com/devtools-server/4.0.0/en/axe-configuration",
                MANUAL_ISSUE_URL: "https://docs.deque.com/devtools-html/4.0.0/en/devtools-manual-issue",
                WHATS_LEFT_TO_TEST_URL: "https://docs.deque.com/devtools-html/4.0.0/en/devtools-whatslefttotest",
                USER_FLOW_URL: "https://docs.deque.com/devtools-html/4.0.0/en/user-flow-analysis",
                AXE_PRO_TRIAL_PATH: "/axe-devtools-pro/trial",
                ENV: "production",
                AXE_PRO_URL: "https://axe.deque.com",
                USAGE_SERVICE_URL: "https://usage.deque.com",
                AMPLITUDE_API_KEY: "a1ce09d0b14ddcc12ab7b508b6606a2f",
                DATADOG_CLIENT_TOKEN: "puba2eb4ed47c6eb69ce20ef237db754ff8"
            }.NODE_DEBUG;
            debugEnv = debugEnv.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^").toUpperCase();
            debugEnvRegex = new RegExp("^" + debugEnv + "$", "i");
        }
        exports.debuglog = function(set) {
            set = set.toUpperCase();
            if (!debugs[set]) if (debugEnvRegex.test(set)) {
                var pid = {}.pid;
                debugs[set] = function() {
                    var msg = exports.format.apply(exports, arguments);
                    console.error("%s %d: %s", set, pid, msg);
                };
            } else debugs[set] = function() {};
            return debugs[set];
        };
        function inspect(obj, opts) {
            var ctx = {
                seen: [],
                stylize: stylizeNoColor
            };
            if (arguments.length >= 3) ctx.depth = arguments[2];
            if (arguments.length >= 4) ctx.colors = arguments[3];
            if (isBoolean(opts)) ctx.showHidden = opts; else if (opts) exports._extend(ctx, opts);
            if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
            if (isUndefined(ctx.depth)) ctx.depth = 2;
            if (isUndefined(ctx.colors)) ctx.colors = false;
            if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
            if (ctx.colors) ctx.stylize = stylizeWithColor;
            return formatValue(ctx, obj, ctx.depth);
        }
        exports.inspect = inspect;
        inspect.colors = {
            bold: [ 1, 22 ],
            italic: [ 3, 23 ],
            underline: [ 4, 24 ],
            inverse: [ 7, 27 ],
            white: [ 37, 39 ],
            grey: [ 90, 39 ],
            black: [ 30, 39 ],
            blue: [ 34, 39 ],
            cyan: [ 36, 39 ],
            green: [ 32, 39 ],
            magenta: [ 35, 39 ],
            red: [ 31, 39 ],
            yellow: [ 33, 39 ]
        };
        inspect.styles = {
            special: "cyan",
            number: "yellow",
            boolean: "yellow",
            undefined: "grey",
            null: "bold",
            string: "green",
            date: "magenta",
            regexp: "red"
        };
        function stylizeWithColor(str, styleType) {
            var style = inspect.styles[styleType];
            if (style) return "[" + inspect.colors[style][0] + "m" + str + "[" + inspect.colors[style][1] + "m"; else return str;
        }
        function stylizeNoColor(str, styleType) {
            return str;
        }
        function arrayToHash(array) {
            var hash = {};
            array.forEach((function(val, idx) {
                hash[val] = true;
            }));
            return hash;
        }
        function formatValue(ctx, value, recurseTimes) {
            if (ctx.customInspect && value && isFunction(value.inspect) && value.inspect !== exports.inspect && !(value.constructor && value.constructor.prototype === value)) {
                var ret = value.inspect(recurseTimes, ctx);
                if (!isString(ret)) ret = formatValue(ctx, ret, recurseTimes);
                return ret;
            }
            var primitive = formatPrimitive(ctx, value);
            if (primitive) return primitive;
            var keys = Object.keys(value);
            var visibleKeys = arrayToHash(keys);
            if (ctx.showHidden) keys = Object.getOwnPropertyNames(value);
            if (isError(value) && (keys.indexOf("message") >= 0 || keys.indexOf("description") >= 0)) return formatError(value);
            if (0 === keys.length) {
                if (isFunction(value)) {
                    var name = value.name ? ": " + value.name : "";
                    return ctx.stylize("[Function" + name + "]", "special");
                }
                if (isRegExp(value)) return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
                if (isDate(value)) return ctx.stylize(Date.prototype.toString.call(value), "date");
                if (isError(value)) return formatError(value);
            }
            var base = "", array = false, braces = [ "{", "}" ];
            if (isArray(value)) {
                array = true;
                braces = [ "[", "]" ];
            }
            if (isFunction(value)) {
                var n = value.name ? ": " + value.name : "";
                base = " [Function" + n + "]";
            }
            if (isRegExp(value)) base = " " + RegExp.prototype.toString.call(value);
            if (isDate(value)) base = " " + Date.prototype.toUTCString.call(value);
            if (isError(value)) base = " " + formatError(value);
            if (0 === keys.length && (!array || 0 == value.length)) return braces[0] + base + braces[1];
            if (recurseTimes < 0) if (isRegExp(value)) return ctx.stylize(RegExp.prototype.toString.call(value), "regexp"); else return ctx.stylize("[Object]", "special");
            ctx.seen.push(value);
            var output;
            if (array) output = formatArray(ctx, value, recurseTimes, visibleKeys, keys); else output = keys.map((function(key) {
                return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
            }));
            ctx.seen.pop();
            return reduceToSingleString(output, base, braces);
        }
        function formatPrimitive(ctx, value) {
            if (isUndefined(value)) return ctx.stylize("undefined", "undefined");
            if (isString(value)) {
                var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
                return ctx.stylize(simple, "string");
            }
            if (isNumber(value)) return ctx.stylize("" + value, "number");
            if (isBoolean(value)) return ctx.stylize("" + value, "boolean");
            if (isNull(value)) return ctx.stylize("null", "null");
        }
        function formatError(value) {
            return "[" + Error.prototype.toString.call(value) + "]";
        }
        function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
            var output = [];
            for (var i = 0, l = value.length; i < l; ++i) if (hasOwnProperty(value, String(i))) output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true)); else output.push("");
            keys.forEach((function(key) {
                if (!key.match(/^\d+$/)) output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
            }));
            return output;
        }
        function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
            var name, str, desc;
            desc = Object.getOwnPropertyDescriptor(value, key) || {
                value: value[key]
            };
            if (desc.get) if (desc.set) str = ctx.stylize("[Getter/Setter]", "special"); else str = ctx.stylize("[Getter]", "special"); else if (desc.set) str = ctx.stylize("[Setter]", "special");
            if (!hasOwnProperty(visibleKeys, key)) name = "[" + key + "]";
            if (!str) if (ctx.seen.indexOf(desc.value) < 0) {
                if (isNull(recurseTimes)) str = formatValue(ctx, desc.value, null); else str = formatValue(ctx, desc.value, recurseTimes - 1);
                if (str.indexOf("\n") > -1) if (array) str = str.split("\n").map((function(line) {
                    return "  " + line;
                })).join("\n").substr(2); else str = "\n" + str.split("\n").map((function(line) {
                    return "   " + line;
                })).join("\n");
            } else str = ctx.stylize("[Circular]", "special");
            if (isUndefined(name)) {
                if (array && key.match(/^\d+$/)) return str;
                name = JSON.stringify("" + key);
                if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
                    name = name.substr(1, name.length - 2);
                    name = ctx.stylize(name, "name");
                } else {
                    name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
                    name = ctx.stylize(name, "string");
                }
            }
            return name + ": " + str;
        }
        function reduceToSingleString(output, base, braces) {
            var numLinesEst = 0;
            var length = output.reduce((function(prev, cur) {
                numLinesEst++;
                if (cur.indexOf("\n") >= 0) numLinesEst++;
                return prev + cur.replace(/\u001b\[\d\d?m/g, "").length + 1;
            }), 0);
            if (length > 60) return braces[0] + ("" === base ? "" : base + "\n ") + " " + output.join(",\n  ") + " " + braces[1];
            return braces[0] + base + " " + output.join(", ") + " " + braces[1];
        }
        exports.types = __webpack_require__(7673);
        function isArray(ar) {
            return Array.isArray(ar);
        }
        exports.isArray = isArray;
        function isBoolean(arg) {
            return "boolean" === typeof arg;
        }
        exports.isBoolean = isBoolean;
        function isNull(arg) {
            return null === arg;
        }
        exports.isNull = isNull;
        function isNullOrUndefined(arg) {
            return null == arg;
        }
        exports.isNullOrUndefined = isNullOrUndefined;
        function isNumber(arg) {
            return "number" === typeof arg;
        }
        exports.isNumber = isNumber;
        function isString(arg) {
            return "string" === typeof arg;
        }
        exports.isString = isString;
        function isSymbol(arg) {
            return "symbol" === typeof arg;
        }
        exports.isSymbol = isSymbol;
        function isUndefined(arg) {
            return void 0 === arg;
        }
        exports.isUndefined = isUndefined;
        function isRegExp(re) {
            return isObject(re) && "[object RegExp]" === objectToString(re);
        }
        exports.isRegExp = isRegExp;
        exports.types.isRegExp = isRegExp;
        function isObject(arg) {
            return "object" === typeof arg && null !== arg;
        }
        exports.isObject = isObject;
        function isDate(d) {
            return isObject(d) && "[object Date]" === objectToString(d);
        }
        exports.isDate = isDate;
        exports.types.isDate = isDate;
        function isError(e) {
            return isObject(e) && ("[object Error]" === objectToString(e) || e instanceof Error);
        }
        exports.isError = isError;
        exports.types.isNativeError = isError;
        function isFunction(arg) {
            return "function" === typeof arg;
        }
        exports.isFunction = isFunction;
        function isPrimitive(arg) {
            return null === arg || "boolean" === typeof arg || "number" === typeof arg || "string" === typeof arg || "symbol" === typeof arg || "undefined" === typeof arg;
        }
        exports.isPrimitive = isPrimitive;
        exports.isBuffer = __webpack_require__(6579);
        function objectToString(o) {
            return Object.prototype.toString.call(o);
        }
        function pad(n) {
            return n < 10 ? "0" + n.toString(10) : n.toString(10);
        }
        var months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
        function timestamp() {
            var d = new Date;
            var time = [ pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds()) ].join(":");
            return [ d.getDate(), months[d.getMonth()], time ].join(" ");
        }
        exports.log = function() {
            console.log("%s - %s", timestamp(), exports.format.apply(exports, arguments));
        };
        exports.inherits = __webpack_require__(87);
        exports._extend = function(origin, add) {
            if (!add || !isObject(add)) return origin;
            var keys = Object.keys(add);
            var i = keys.length;
            while (i--) origin[keys[i]] = add[keys[i]];
            return origin;
        };
        function hasOwnProperty(obj, prop) {
            return Object.prototype.hasOwnProperty.call(obj, prop);
        }
        var kCustomPromisifiedSymbol = "undefined" !== typeof Symbol ? Symbol("util.promisify.custom") : void 0;
        exports.promisify = function(original) {
            if ("function" !== typeof original) throw new TypeError('The "original" argument must be of type Function');
            if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
                var fn = original[kCustomPromisifiedSymbol];
                if ("function" !== typeof fn) throw new TypeError('The "util.promisify.custom" argument must be of type Function');
                Object.defineProperty(fn, kCustomPromisifiedSymbol, {
                    value: fn,
                    enumerable: false,
                    writable: false,
                    configurable: true
                });
                return fn;
            }
            function fn() {
                var promiseResolve, promiseReject;
                var promise = new Promise((function(resolve, reject) {
                    promiseResolve = resolve;
                    promiseReject = reject;
                }));
                var args = [];
                for (var i = 0; i < arguments.length; i++) args.push(arguments[i]);
                args.push((function(err, value) {
                    if (err) promiseReject(err); else promiseResolve(value);
                }));
                try {
                    original.apply(this, args);
                } catch (err) {
                    promiseReject(err);
                }
                return promise;
            }
            Object.setPrototypeOf(fn, Object.getPrototypeOf(original));
            if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
                value: fn,
                enumerable: false,
                writable: false,
                configurable: true
            });
            return Object.defineProperties(fn, getOwnPropertyDescriptors(original));
        };
        exports.promisify.custom = kCustomPromisifiedSymbol;
        function callbackifyOnRejected(reason, cb) {
            if (!reason) {
                var newReason = new Error("Promise was rejected with a falsy value");
                newReason.reason = reason;
                reason = newReason;
            }
            return cb(reason);
        }
        function callbackify(original) {
            if ("function" !== typeof original) throw new TypeError('The "original" argument must be of type Function');
            function callbackified() {
                var args = [];
                for (var i = 0; i < arguments.length; i++) args.push(arguments[i]);
                var maybeCb = args.pop();
                if ("function" !== typeof maybeCb) throw new TypeError("The last argument must be of type Function");
                var self = this;
                var cb = function() {
                    return maybeCb.apply(self, arguments);
                };
                original.apply(this, args).then((function(ret) {
                    ({}).nextTick(cb.bind(null, null, ret));
                }), (function(rej) {
                    ({}).nextTick(callbackifyOnRejected.bind(null, rej, cb));
                }));
            }
            Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
            Object.defineProperties(callbackified, getOwnPropertyDescriptors(original));
            return callbackified;
        }
        exports.callbackify = callbackify;
    },
    3973: module => {
        var byteToHex = [];
        for (var i = 0; i < 256; ++i) byteToHex[i] = (i + 256).toString(16).substr(1);
        function bytesToUuid(buf, offset) {
            var i = offset || 0;
            var bth = byteToHex;
            return [ bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], "-", bth[buf[i++]], bth[buf[i++]], "-", bth[buf[i++]], bth[buf[i++]], "-", bth[buf[i++]], bth[buf[i++]], "-", bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]] ].join("");
        }
        module.exports = bytesToUuid;
    },
    6963: module => {
        var getRandomValues = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof window.msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto);
        if (getRandomValues) {
            var rnds8 = new Uint8Array(16);
            module.exports = function() {
                getRandomValues(rnds8);
                return rnds8;
            };
        } else {
            var rnds = new Array(16);
            module.exports = function() {
                for (var r, i = 0; i < 16; i++) {
                    if (0 === (3 & i)) r = 4294967296 * Math.random();
                    rnds[i] = r >>> ((3 & i) << 3) & 255;
                }
                return rnds;
            };
        }
    },
    2998: (module, __unused_webpack_exports, __webpack_require__) => {
        var rng = __webpack_require__(6963);
        var bytesToUuid = __webpack_require__(3973);
        var _nodeId;
        var _clockseq;
        var _lastMSecs = 0;
        var _lastNSecs = 0;
        function v1(options, buf, offset) {
            var i = buf && offset || 0;
            var b = buf || [];
            options = options || {};
            var node = options.node || _nodeId;
            var clockseq = void 0 !== options.clockseq ? options.clockseq : _clockseq;
            if (null == node || null == clockseq) {
                var seedBytes = rng();
                if (null == node) node = _nodeId = [ 1 | seedBytes[0], seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5] ];
                if (null == clockseq) clockseq = _clockseq = 16383 & (seedBytes[6] << 8 | seedBytes[7]);
            }
            var msecs = void 0 !== options.msecs ? options.msecs : (new Date).getTime();
            var nsecs = void 0 !== options.nsecs ? options.nsecs : _lastNSecs + 1;
            var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 1e4;
            if (dt < 0 && void 0 === options.clockseq) clockseq = clockseq + 1 & 16383;
            if ((dt < 0 || msecs > _lastMSecs) && void 0 === options.nsecs) nsecs = 0;
            if (nsecs >= 1e4) throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
            _lastMSecs = msecs;
            _lastNSecs = nsecs;
            _clockseq = clockseq;
            msecs += 122192928e5;
            var tl = (1e4 * (268435455 & msecs) + nsecs) % 4294967296;
            b[i++] = tl >>> 24 & 255;
            b[i++] = tl >>> 16 & 255;
            b[i++] = tl >>> 8 & 255;
            b[i++] = 255 & tl;
            var tmh = msecs / 4294967296 * 1e4 & 268435455;
            b[i++] = tmh >>> 8 & 255;
            b[i++] = 255 & tmh;
            b[i++] = tmh >>> 24 & 15 | 16;
            b[i++] = tmh >>> 16 & 255;
            b[i++] = clockseq >>> 8 | 128;
            b[i++] = 255 & clockseq;
            for (var n = 0; n < 6; ++n) b[i + n] = node[n];
            return buf ? buf : bytesToUuid(b);
        }
        module.exports = v1;
    },
    6541: (module, __unused_webpack_exports, __webpack_require__) => {
        var rng = __webpack_require__(6963);
        var bytesToUuid = __webpack_require__(3973);
        function v4(options, buf, offset) {
            var i = buf && offset || 0;
            if ("string" == typeof options) {
                buf = "binary" === options ? new Array(16) : null;
                options = null;
            }
            options = options || {};
            var rnds = options.random || (options.rng || rng)();
            rnds[6] = 15 & rnds[6] | 64;
            rnds[8] = 63 & rnds[8] | 128;
            if (buf) for (var ii = 0; ii < 16; ++ii) buf[i + ii] = rnds[ii];
            return buf || bytesToUuid(rnds);
        }
        module.exports = v4;
    },
    8574: (module, __unused_webpack_exports, __webpack_require__) => {
        "use strict";
        var isString = __webpack_require__(8559);
        var isNumber = __webpack_require__(7691);
        var isBoolean = __webpack_require__(240);
        var isSymbol = __webpack_require__(3448);
        var isBigInt = __webpack_require__(7810);
        module.exports = function(value) {
            if (null == value || "object" !== typeof value && "function" !== typeof value) return null;
            if (isString(value)) return "String";
            if (isNumber(value)) return "Number";
            if (isBoolean(value)) return "Boolean";
            if (isSymbol(value)) return "Symbol";
            if (isBigInt(value)) return "BigInt";
        };
    },
    2505: (module, __unused_webpack_exports, __webpack_require__) => {
        "use strict";
        var forEach = __webpack_require__(8372);
        var availableTypedArrays = __webpack_require__(973);
        var callBound = __webpack_require__(2737);
        var $toString = callBound("Object.prototype.toString");
        var hasSymbols = __webpack_require__(679)();
        var hasToStringTag = hasSymbols && "symbol" === typeof Symbol.toStringTag;
        var typedArrays = availableTypedArrays();
        var $slice = callBound("String.prototype.slice");
        var toStrTags = {};
        var gOPD = __webpack_require__(6371);
        var getPrototypeOf = Object.getPrototypeOf;
        if (hasToStringTag && gOPD && getPrototypeOf) forEach(typedArrays, (function(typedArray) {
            if ("function" === typeof __webpack_require__.g[typedArray]) {
                var arr = new __webpack_require__.g[typedArray];
                if (!(Symbol.toStringTag in arr)) throw new EvalError("this engine has support for Symbol.toStringTag, but " + typedArray + " does not have the property! Please report this.");
                var proto = getPrototypeOf(arr);
                var descriptor = gOPD(proto, Symbol.toStringTag);
                if (!descriptor) {
                    var superProto = getPrototypeOf(proto);
                    descriptor = gOPD(superProto, Symbol.toStringTag);
                }
                toStrTags[typedArray] = descriptor.get;
            }
        }));
        var tryTypedArrays = function(value) {
            var foundName = false;
            forEach(toStrTags, (function(getter, typedArray) {
                if (!foundName) try {
                    var name = getter.call(value);
                    if (name === typedArray) foundName = name;
                } catch (e) {}
            }));
            return foundName;
        };
        var isTypedArray = __webpack_require__(387);
        module.exports = function(value) {
            if (!isTypedArray(value)) return false;
            if (!hasToStringTag) return $slice($toString(value), 8, -1);
            return tryTypedArrays(value);
        };
    },
    973: (module, __unused_webpack_exports, __webpack_require__) => {
        "use strict";
        var filter = __webpack_require__(7050);
        module.exports = function() {
            return filter([ "BigInt64Array", "BigUint64Array", "Float32Array", "Float64Array", "Int16Array", "Int32Array", "Int8Array", "Uint16Array", "Uint32Array", "Uint8Array", "Uint8ClampedArray" ], (function(typedArray) {
                return "function" === typeof __webpack_require__.g[typedArray];
            }));
        };
    },
    8889: module => {
        "use strict";
        function bind(fn, thisArg) {
            return function() {
                return fn.apply(thisArg, arguments);
            };
        }
        const {toString} = Object.prototype;
        const {getPrototypeOf} = Object;
        const kindOf = (cache => thing => {
            const str = toString.call(thing);
            return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
        })(Object.create(null));
        const kindOfTest = type => {
            type = type.toLowerCase();
            return thing => kindOf(thing) === type;
        };
        const typeOfTest = type => thing => typeof thing === type;
        const {isArray} = Array;
        const isUndefined = typeOfTest("undefined");
        function isBuffer(val) {
            return null !== val && !isUndefined(val) && null !== val.constructor && !isUndefined(val.constructor) && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
        }
        const isArrayBuffer = kindOfTest("ArrayBuffer");
        function isArrayBufferView(val) {
            let result;
            if ("undefined" !== typeof ArrayBuffer && ArrayBuffer.isView) result = ArrayBuffer.isView(val); else result = val && val.buffer && isArrayBuffer(val.buffer);
            return result;
        }
        const isString = typeOfTest("string");
        const isFunction = typeOfTest("function");
        const isNumber = typeOfTest("number");
        const isObject = thing => null !== thing && "object" === typeof thing;
        const isBoolean = thing => true === thing || false === thing;
        const isPlainObject = val => {
            if ("object" !== kindOf(val)) return false;
            const prototype = getPrototypeOf(val);
            return (null === prototype || prototype === Object.prototype || null === Object.getPrototypeOf(prototype)) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
        };
        const isDate = kindOfTest("Date");
        const isFile = kindOfTest("File");
        const isBlob = kindOfTest("Blob");
        const isFileList = kindOfTest("FileList");
        const isStream = val => isObject(val) && isFunction(val.pipe);
        const isFormData = thing => {
            let kind;
            return thing && ("function" === typeof FormData && thing instanceof FormData || isFunction(thing.append) && ("formdata" === (kind = kindOf(thing)) || "object" === kind && isFunction(thing.toString) && "[object FormData]" === thing.toString()));
        };
        const isURLSearchParams = kindOfTest("URLSearchParams");
        const [isReadableStream, isRequest, isResponse, isHeaders] = [ "ReadableStream", "Request", "Response", "Headers" ].map(kindOfTest);
        const trim = str => str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
        function forEach(obj, fn, {allOwnKeys = false} = {}) {
            if (null === obj || "undefined" === typeof obj) return;
            let i;
            let l;
            if ("object" !== typeof obj) obj = [ obj ];
            if (isArray(obj)) for (i = 0, l = obj.length; i < l; i++) fn.call(null, obj[i], i, obj); else {
                const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
                const len = keys.length;
                let key;
                for (i = 0; i < len; i++) {
                    key = keys[i];
                    fn.call(null, obj[key], key, obj);
                }
            }
        }
        function findKey(obj, key) {
            key = key.toLowerCase();
            const keys = Object.keys(obj);
            let i = keys.length;
            let _key;
            while (i-- > 0) {
                _key = keys[i];
                if (key === _key.toLowerCase()) return _key;
            }
            return null;
        }
        const _global = (() => {
            if ("undefined" !== typeof globalThis) return globalThis;
            return "undefined" !== typeof self ? self : true ? window : 0;
        })();
        const isContextDefined = context => !isUndefined(context) && context !== _global;
        function merge() {
            const {caseless} = isContextDefined(this) && this || {};
            const result = {};
            const assignValue = (val, key) => {
                const targetKey = caseless && findKey(result, key) || key;
                if (isPlainObject(result[targetKey]) && isPlainObject(val)) result[targetKey] = merge(result[targetKey], val); else if (isPlainObject(val)) result[targetKey] = merge({}, val); else if (isArray(val)) result[targetKey] = val.slice(); else result[targetKey] = val;
            };
            for (let i = 0, l = arguments.length; i < l; i++) arguments[i] && forEach(arguments[i], assignValue);
            return result;
        }
        const extend = (a, b, thisArg, {allOwnKeys} = {}) => {
            forEach(b, ((val, key) => {
                if (thisArg && isFunction(val)) a[key] = bind(val, thisArg); else a[key] = val;
            }), {
                allOwnKeys
            });
            return a;
        };
        const stripBOM = content => {
            if (65279 === content.charCodeAt(0)) content = content.slice(1);
            return content;
        };
        const inherits = (constructor, superConstructor, props, descriptors) => {
            constructor.prototype = Object.create(superConstructor.prototype, descriptors);
            constructor.prototype.constructor = constructor;
            Object.defineProperty(constructor, "super", {
                value: superConstructor.prototype
            });
            props && Object.assign(constructor.prototype, props);
        };
        const toFlatObject = (sourceObj, destObj, filter, propFilter) => {
            let props;
            let i;
            let prop;
            const merged = {};
            destObj = destObj || {};
            if (null == sourceObj) return destObj;
            do {
                props = Object.getOwnPropertyNames(sourceObj);
                i = props.length;
                while (i-- > 0) {
                    prop = props[i];
                    if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
                        destObj[prop] = sourceObj[prop];
                        merged[prop] = true;
                    }
                }
                sourceObj = false !== filter && getPrototypeOf(sourceObj);
            } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);
            return destObj;
        };
        const endsWith = (str, searchString, position) => {
            str = String(str);
            if (void 0 === position || position > str.length) position = str.length;
            position -= searchString.length;
            const lastIndex = str.indexOf(searchString, position);
            return -1 !== lastIndex && lastIndex === position;
        };
        const toArray = thing => {
            if (!thing) return null;
            if (isArray(thing)) return thing;
            let i = thing.length;
            if (!isNumber(i)) return null;
            const arr = new Array(i);
            while (i-- > 0) arr[i] = thing[i];
            return arr;
        };
        const isTypedArray = (TypedArray => thing => TypedArray && thing instanceof TypedArray)("undefined" !== typeof Uint8Array && getPrototypeOf(Uint8Array));
        const forEachEntry = (obj, fn) => {
            const generator = obj && obj[Symbol.iterator];
            const iterator = generator.call(obj);
            let result;
            while ((result = iterator.next()) && !result.done) {
                const pair = result.value;
                fn.call(obj, pair[0], pair[1]);
            }
        };
        const matchAll = (regExp, str) => {
            let matches;
            const arr = [];
            while (null !== (matches = regExp.exec(str))) arr.push(matches);
            return arr;
        };
        const isHTMLForm = kindOfTest("HTMLFormElement");
        const toCamelCase = str => str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, (function(m, p1, p2) {
            return p1.toUpperCase() + p2;
        }));
        const hasOwnProperty = (({hasOwnProperty}) => (obj, prop) => hasOwnProperty.call(obj, prop))(Object.prototype);
        const isRegExp = kindOfTest("RegExp");
        const reduceDescriptors = (obj, reducer) => {
            const descriptors = Object.getOwnPropertyDescriptors(obj);
            const reducedDescriptors = {};
            forEach(descriptors, ((descriptor, name) => {
                let ret;
                if (false !== (ret = reducer(descriptor, name, obj))) reducedDescriptors[name] = ret || descriptor;
            }));
            Object.defineProperties(obj, reducedDescriptors);
        };
        const freezeMethods = obj => {
            reduceDescriptors(obj, ((descriptor, name) => {
                if (isFunction(obj) && -1 !== [ "arguments", "caller", "callee" ].indexOf(name)) return false;
                const value = obj[name];
                if (!isFunction(value)) return;
                descriptor.enumerable = false;
                if ("writable" in descriptor) {
                    descriptor.writable = false;
                    return;
                }
                if (!descriptor.set) descriptor.set = () => {
                    throw Error("Can not rewrite read-only method '" + name + "'");
                };
            }));
        };
        const toObjectSet = (arrayOrString, delimiter) => {
            const obj = {};
            const define = arr => {
                arr.forEach((value => {
                    obj[value] = true;
                }));
            };
            isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
            return obj;
        };
        const noop = () => {};
        const toFiniteNumber = (value, defaultValue) => null != value && Number.isFinite(value = +value) ? value : defaultValue;
        const ALPHA = "abcdefghijklmnopqrstuvwxyz";
        const DIGIT = "0123456789";
        const ALPHABET = {
            DIGIT,
            ALPHA,
            ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
        };
        const generateString = (size = 16, alphabet = ALPHABET.ALPHA_DIGIT) => {
            let str = "";
            const {length} = alphabet;
            while (size--) str += alphabet[Math.random() * length | 0];
            return str;
        };
        function isSpecCompliantForm(thing) {
            return !!(thing && isFunction(thing.append) && "FormData" === thing[Symbol.toStringTag] && thing[Symbol.iterator]);
        }
        const toJSONObject = obj => {
            const stack = new Array(10);
            const visit = (source, i) => {
                if (isObject(source)) {
                    if (stack.indexOf(source) >= 0) return;
                    if (!("toJSON" in source)) {
                        stack[i] = source;
                        const target = isArray(source) ? [] : {};
                        forEach(source, ((value, key) => {
                            const reducedValue = visit(value, i + 1);
                            !isUndefined(reducedValue) && (target[key] = reducedValue);
                        }));
                        stack[i] = void 0;
                        return target;
                    }
                }
                return source;
            };
            return visit(obj, 0);
        };
        const isAsyncFn = kindOfTest("AsyncFunction");
        const isThenable = thing => thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);
        var utils$1 = {
            isArray,
            isArrayBuffer,
            isBuffer,
            isFormData,
            isArrayBufferView,
            isString,
            isNumber,
            isBoolean,
            isObject,
            isPlainObject,
            isReadableStream,
            isRequest,
            isResponse,
            isHeaders,
            isUndefined,
            isDate,
            isFile,
            isBlob,
            isRegExp,
            isFunction,
            isStream,
            isURLSearchParams,
            isTypedArray,
            isFileList,
            forEach,
            merge,
            extend,
            trim,
            stripBOM,
            inherits,
            toFlatObject,
            kindOf,
            kindOfTest,
            endsWith,
            toArray,
            forEachEntry,
            matchAll,
            isHTMLForm,
            hasOwnProperty,
            hasOwnProp: hasOwnProperty,
            reduceDescriptors,
            freezeMethods,
            toObjectSet,
            toCamelCase,
            noop,
            toFiniteNumber,
            findKey,
            global: _global,
            isContextDefined,
            ALPHABET,
            generateString,
            isSpecCompliantForm,
            toJSONObject,
            isAsyncFn,
            isThenable
        };
        function AxiosError(message, code, config, request, response) {
            Error.call(this);
            if (Error.captureStackTrace) Error.captureStackTrace(this, this.constructor); else this.stack = (new Error).stack;
            this.message = message;
            this.name = "AxiosError";
            code && (this.code = code);
            config && (this.config = config);
            request && (this.request = request);
            response && (this.response = response);
        }
        utils$1.inherits(AxiosError, Error, {
            toJSON: function() {
                return {
                    message: this.message,
                    name: this.name,
                    description: this.description,
                    number: this.number,
                    fileName: this.fileName,
                    lineNumber: this.lineNumber,
                    columnNumber: this.columnNumber,
                    stack: this.stack,
                    config: utils$1.toJSONObject(this.config),
                    code: this.code,
                    status: this.response && this.response.status ? this.response.status : null
                };
            }
        });
        const prototype$1 = AxiosError.prototype;
        const descriptors = {};
        [ "ERR_BAD_OPTION_VALUE", "ERR_BAD_OPTION", "ECONNABORTED", "ETIMEDOUT", "ERR_NETWORK", "ERR_FR_TOO_MANY_REDIRECTS", "ERR_DEPRECATED", "ERR_BAD_RESPONSE", "ERR_BAD_REQUEST", "ERR_CANCELED", "ERR_NOT_SUPPORT", "ERR_INVALID_URL" ].forEach((code => {
            descriptors[code] = {
                value: code
            };
        }));
        Object.defineProperties(AxiosError, descriptors);
        Object.defineProperty(prototype$1, "isAxiosError", {
            value: true
        });
        AxiosError.from = (error, code, config, request, response, customProps) => {
            const axiosError = Object.create(prototype$1);
            utils$1.toFlatObject(error, axiosError, (function(obj) {
                return obj !== Error.prototype;
            }), (prop => "isAxiosError" !== prop));
            AxiosError.call(axiosError, error.message, code, config, request, response);
            axiosError.cause = error;
            axiosError.name = error.name;
            customProps && Object.assign(axiosError, customProps);
            return axiosError;
        };
        var httpAdapter = null;
        function isVisitable(thing) {
            return utils$1.isPlainObject(thing) || utils$1.isArray(thing);
        }
        function removeBrackets(key) {
            return utils$1.endsWith(key, "[]") ? key.slice(0, -2) : key;
        }
        function renderKey(path, key, dots) {
            if (!path) return key;
            return path.concat(key).map((function(token, i) {
                token = removeBrackets(token);
                return !dots && i ? "[" + token + "]" : token;
            })).join(dots ? "." : "");
        }
        function isFlatArray(arr) {
            return utils$1.isArray(arr) && !arr.some(isVisitable);
        }
        const predicates = utils$1.toFlatObject(utils$1, {}, null, (function(prop) {
            return /^is[A-Z]/.test(prop);
        }));
        function toFormData(obj, formData, options) {
            if (!utils$1.isObject(obj)) throw new TypeError("target must be an object");
            formData = formData || new FormData;
            options = utils$1.toFlatObject(options, {
                metaTokens: true,
                dots: false,
                indexes: false
            }, false, (function(option, source) {
                return !utils$1.isUndefined(source[option]);
            }));
            const metaTokens = options.metaTokens;
            const visitor = options.visitor || defaultVisitor;
            const dots = options.dots;
            const indexes = options.indexes;
            const _Blob = options.Blob || "undefined" !== typeof Blob && Blob;
            const useBlob = _Blob && utils$1.isSpecCompliantForm(formData);
            if (!utils$1.isFunction(visitor)) throw new TypeError("visitor must be a function");
            function convertValue(value) {
                if (null === value) return "";
                if (utils$1.isDate(value)) return value.toISOString();
                if (!useBlob && utils$1.isBlob(value)) throw new AxiosError("Blob is not supported. Use a Buffer instead.");
                if (utils$1.isArrayBuffer(value) || utils$1.isTypedArray(value)) return useBlob && "function" === typeof Blob ? new Blob([ value ]) : Buffer.from(value);
                return value;
            }
            function defaultVisitor(value, key, path) {
                let arr = value;
                if (value && !path && "object" === typeof value) if (utils$1.endsWith(key, "{}")) {
                    key = metaTokens ? key : key.slice(0, -2);
                    value = JSON.stringify(value);
                } else if (utils$1.isArray(value) && isFlatArray(value) || (utils$1.isFileList(value) || utils$1.endsWith(key, "[]")) && (arr = utils$1.toArray(value))) {
                    key = removeBrackets(key);
                    arr.forEach((function(el, index) {
                        !(utils$1.isUndefined(el) || null === el) && formData.append(true === indexes ? renderKey([ key ], index, dots) : null === indexes ? key : key + "[]", convertValue(el));
                    }));
                    return false;
                }
                if (isVisitable(value)) return true;
                formData.append(renderKey(path, key, dots), convertValue(value));
                return false;
            }
            const stack = [];
            const exposedHelpers = Object.assign(predicates, {
                defaultVisitor,
                convertValue,
                isVisitable
            });
            function build(value, path) {
                if (utils$1.isUndefined(value)) return;
                if (-1 !== stack.indexOf(value)) throw Error("Circular reference detected in " + path.join("."));
                stack.push(value);
                utils$1.forEach(value, (function(el, key) {
                    const result = !(utils$1.isUndefined(el) || null === el) && visitor.call(formData, el, utils$1.isString(key) ? key.trim() : key, path, exposedHelpers);
                    if (true === result) build(el, path ? path.concat(key) : [ key ]);
                }));
                stack.pop();
            }
            if (!utils$1.isObject(obj)) throw new TypeError("data must be an object");
            build(obj);
            return formData;
        }
        function encode$1(str) {
            const charMap = {
                "!": "%21",
                "'": "%27",
                "(": "%28",
                ")": "%29",
                "~": "%7E",
                "%20": "+",
                "%00": "\0"
            };
            return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, (function(match) {
                return charMap[match];
            }));
        }
        function AxiosURLSearchParams(params, options) {
            this._pairs = [];
            params && toFormData(params, this, options);
        }
        const prototype = AxiosURLSearchParams.prototype;
        prototype.append = function(name, value) {
            this._pairs.push([ name, value ]);
        };
        prototype.toString = function(encoder) {
            const _encode = encoder ? function(value) {
                return encoder.call(this, value, encode$1);
            } : encode$1;
            return this._pairs.map((function(pair) {
                return _encode(pair[0]) + "=" + _encode(pair[1]);
            }), "").join("&");
        };
        function encode(val) {
            return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
        }
        function buildURL(url, params, options) {
            if (!params) return url;
            const _encode = options && options.encode || encode;
            const serializeFn = options && options.serialize;
            let serializedParams;
            if (serializeFn) serializedParams = serializeFn(params, options); else serializedParams = utils$1.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams(params, options).toString(_encode);
            if (serializedParams) {
                const hashmarkIndex = url.indexOf("#");
                if (-1 !== hashmarkIndex) url = url.slice(0, hashmarkIndex);
                url += (-1 === url.indexOf("?") ? "?" : "&") + serializedParams;
            }
            return url;
        }
        class InterceptorManager {
            constructor() {
                this.handlers = [];
            }
            use(fulfilled, rejected, options) {
                this.handlers.push({
                    fulfilled,
                    rejected,
                    synchronous: options ? options.synchronous : false,
                    runWhen: options ? options.runWhen : null
                });
                return this.handlers.length - 1;
            }
            eject(id) {
                if (this.handlers[id]) this.handlers[id] = null;
            }
            clear() {
                if (this.handlers) this.handlers = [];
            }
            forEach(fn) {
                utils$1.forEach(this.handlers, (function(h) {
                    if (null !== h) fn(h);
                }));
            }
        }
        var InterceptorManager$1 = InterceptorManager;
        var transitionalDefaults = {
            silentJSONParsing: true,
            forcedJSONParsing: true,
            clarifyTimeoutError: false
        };
        var URLSearchParams$1 = "undefined" !== typeof URLSearchParams ? URLSearchParams : AxiosURLSearchParams;
        var FormData$1 = "undefined" !== typeof FormData ? FormData : null;
        var Blob$1 = "undefined" !== typeof Blob ? Blob : null;
        var platform$1 = {
            isBrowser: true,
            classes: {
                URLSearchParams: URLSearchParams$1,
                FormData: FormData$1,
                Blob: Blob$1
            },
            protocols: [ "http", "https", "file", "blob", "url", "data" ]
        };
        const hasBrowserEnv = true && "undefined" !== typeof document;
        const hasStandardBrowserEnv = (product => hasBrowserEnv && [ "ReactNative", "NativeScript", "NS" ].indexOf(product) < 0)("undefined" !== typeof navigator && navigator.product);
        const hasStandardBrowserWebWorkerEnv = (() => "undefined" !== typeof WorkerGlobalScope && self instanceof WorkerGlobalScope && "function" === typeof self.importScripts)();
        const origin = hasBrowserEnv && window.location.href || "http://localhost";
        var utils = Object.freeze({
            __proto__: null,
            hasBrowserEnv,
            hasStandardBrowserWebWorkerEnv,
            hasStandardBrowserEnv,
            origin
        });
        var platform = {
            ...utils,
            ...platform$1
        };
        function toURLEncodedForm(data, options) {
            return toFormData(data, new platform.classes.URLSearchParams, Object.assign({
                visitor: function(value, key, path, helpers) {
                    if (platform.isNode && utils$1.isBuffer(value)) {
                        this.append(key, value.toString("base64"));
                        return false;
                    }
                    return helpers.defaultVisitor.apply(this, arguments);
                }
            }, options));
        }
        function parsePropPath(name) {
            return utils$1.matchAll(/\w+|\[(\w*)]/g, name).map((match => "[]" === match[0] ? "" : match[1] || match[0]));
        }
        function arrayToObject(arr) {
            const obj = {};
            const keys = Object.keys(arr);
            let i;
            const len = keys.length;
            let key;
            for (i = 0; i < len; i++) {
                key = keys[i];
                obj[key] = arr[key];
            }
            return obj;
        }
        function formDataToJSON(formData) {
            function buildPath(path, value, target, index) {
                let name = path[index++];
                if ("__proto__" === name) return true;
                const isNumericKey = Number.isFinite(+name);
                const isLast = index >= path.length;
                name = !name && utils$1.isArray(target) ? target.length : name;
                if (isLast) {
                    if (utils$1.hasOwnProp(target, name)) target[name] = [ target[name], value ]; else target[name] = value;
                    return !isNumericKey;
                }
                if (!target[name] || !utils$1.isObject(target[name])) target[name] = [];
                const result = buildPath(path, value, target[name], index);
                if (result && utils$1.isArray(target[name])) target[name] = arrayToObject(target[name]);
                return !isNumericKey;
            }
            if (utils$1.isFormData(formData) && utils$1.isFunction(formData.entries)) {
                const obj = {};
                utils$1.forEachEntry(formData, ((name, value) => {
                    buildPath(parsePropPath(name), value, obj, 0);
                }));
                return obj;
            }
            return null;
        }
        function stringifySafely(rawValue, parser, encoder) {
            if (utils$1.isString(rawValue)) try {
                (parser || JSON.parse)(rawValue);
                return utils$1.trim(rawValue);
            } catch (e) {
                if ("SyntaxError" !== e.name) throw e;
            }
            return (encoder || JSON.stringify)(rawValue);
        }
        const defaults = {
            transitional: transitionalDefaults,
            adapter: [ "xhr", "http", "fetch" ],
            transformRequest: [ function(data, headers) {
                const contentType = headers.getContentType() || "";
                const hasJSONContentType = contentType.indexOf("application/json") > -1;
                const isObjectPayload = utils$1.isObject(data);
                if (isObjectPayload && utils$1.isHTMLForm(data)) data = new FormData(data);
                const isFormData = utils$1.isFormData(data);
                if (isFormData) return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
                if (utils$1.isArrayBuffer(data) || utils$1.isBuffer(data) || utils$1.isStream(data) || utils$1.isFile(data) || utils$1.isBlob(data) || utils$1.isReadableStream(data)) return data;
                if (utils$1.isArrayBufferView(data)) return data.buffer;
                if (utils$1.isURLSearchParams(data)) {
                    headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
                    return data.toString();
                }
                let isFileList;
                if (isObjectPayload) {
                    if (contentType.indexOf("application/x-www-form-urlencoded") > -1) return toURLEncodedForm(data, this.formSerializer).toString();
                    if ((isFileList = utils$1.isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
                        const _FormData = this.env && this.env.FormData;
                        return toFormData(isFileList ? {
                            "files[]": data
                        } : data, _FormData && new _FormData, this.formSerializer);
                    }
                }
                if (isObjectPayload || hasJSONContentType) {
                    headers.setContentType("application/json", false);
                    return stringifySafely(data);
                }
                return data;
            } ],
            transformResponse: [ function(data) {
                const transitional = this.transitional || defaults.transitional;
                const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
                const JSONRequested = "json" === this.responseType;
                if (utils$1.isResponse(data) || utils$1.isReadableStream(data)) return data;
                if (data && utils$1.isString(data) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
                    const silentJSONParsing = transitional && transitional.silentJSONParsing;
                    const strictJSONParsing = !silentJSONParsing && JSONRequested;
                    try {
                        return JSON.parse(data);
                    } catch (e) {
                        if (strictJSONParsing) {
                            if ("SyntaxError" === e.name) throw AxiosError.from(e, AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
                            throw e;
                        }
                    }
                }
                return data;
            } ],
            timeout: 0,
            xsrfCookieName: "XSRF-TOKEN",
            xsrfHeaderName: "X-XSRF-TOKEN",
            maxContentLength: -1,
            maxBodyLength: -1,
            env: {
                FormData: platform.classes.FormData,
                Blob: platform.classes.Blob
            },
            validateStatus: function(status) {
                return status >= 200 && status < 300;
            },
            headers: {
                common: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": void 0
                }
            }
        };
        utils$1.forEach([ "delete", "get", "head", "post", "put", "patch" ], (method => {
            defaults.headers[method] = {};
        }));
        var defaults$1 = defaults;
        const ignoreDuplicateOf = utils$1.toObjectSet([ "age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent" ]);
        var parseHeaders = rawHeaders => {
            const parsed = {};
            let key;
            let val;
            let i;
            rawHeaders && rawHeaders.split("\n").forEach((function(line) {
                i = line.indexOf(":");
                key = line.substring(0, i).trim().toLowerCase();
                val = line.substring(i + 1).trim();
                if (!key || parsed[key] && ignoreDuplicateOf[key]) return;
                if ("set-cookie" === key) if (parsed[key]) parsed[key].push(val); else parsed[key] = [ val ]; else parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
            }));
            return parsed;
        };
        const $internals = Symbol("internals");
        function normalizeHeader(header) {
            return header && String(header).trim().toLowerCase();
        }
        function normalizeValue(value) {
            if (false === value || null == value) return value;
            return utils$1.isArray(value) ? value.map(normalizeValue) : String(value);
        }
        function parseTokens(str) {
            const tokens = Object.create(null);
            const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
            let match;
            while (match = tokensRE.exec(str)) tokens[match[1]] = match[2];
            return tokens;
        }
        const isValidHeaderName = str => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
        function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
            if (utils$1.isFunction(filter)) return filter.call(this, value, header);
            if (isHeaderNameFilter) value = header;
            if (!utils$1.isString(value)) return;
            if (utils$1.isString(filter)) return -1 !== value.indexOf(filter);
            if (utils$1.isRegExp(filter)) return filter.test(value);
        }
        function formatHeader(header) {
            return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, ((w, char, str) => char.toUpperCase() + str));
        }
        function buildAccessors(obj, header) {
            const accessorName = utils$1.toCamelCase(" " + header);
            [ "get", "set", "has" ].forEach((methodName => {
                Object.defineProperty(obj, methodName + accessorName, {
                    value: function(arg1, arg2, arg3) {
                        return this[methodName].call(this, header, arg1, arg2, arg3);
                    },
                    configurable: true
                });
            }));
        }
        class AxiosHeaders {
            constructor(headers) {
                headers && this.set(headers);
            }
            set(header, valueOrRewrite, rewrite) {
                const self = this;
                function setHeader(_value, _header, _rewrite) {
                    const lHeader = normalizeHeader(_header);
                    if (!lHeader) throw new Error("header name must be a non-empty string");
                    const key = utils$1.findKey(self, lHeader);
                    if (!key || void 0 === self[key] || true === _rewrite || void 0 === _rewrite && false !== self[key]) self[key || _header] = normalizeValue(_value);
                }
                const setHeaders = (headers, _rewrite) => utils$1.forEach(headers, ((_value, _header) => setHeader(_value, _header, _rewrite)));
                if (utils$1.isPlainObject(header) || header instanceof this.constructor) setHeaders(header, valueOrRewrite); else if (utils$1.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) setHeaders(parseHeaders(header), valueOrRewrite); else if (utils$1.isHeaders(header)) for (const [key, value] of header.entries()) setHeader(value, key, rewrite); else null != header && setHeader(valueOrRewrite, header, rewrite);
                return this;
            }
            get(header, parser) {
                header = normalizeHeader(header);
                if (header) {
                    const key = utils$1.findKey(this, header);
                    if (key) {
                        const value = this[key];
                        if (!parser) return value;
                        if (true === parser) return parseTokens(value);
                        if (utils$1.isFunction(parser)) return parser.call(this, value, key);
                        if (utils$1.isRegExp(parser)) return parser.exec(value);
                        throw new TypeError("parser must be boolean|regexp|function");
                    }
                }
            }
            has(header, matcher) {
                header = normalizeHeader(header);
                if (header) {
                    const key = utils$1.findKey(this, header);
                    return !!(key && void 0 !== this[key] && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
                }
                return false;
            }
            delete(header, matcher) {
                const self = this;
                let deleted = false;
                function deleteHeader(_header) {
                    _header = normalizeHeader(_header);
                    if (_header) {
                        const key = utils$1.findKey(self, _header);
                        if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
                            delete self[key];
                            deleted = true;
                        }
                    }
                }
                if (utils$1.isArray(header)) header.forEach(deleteHeader); else deleteHeader(header);
                return deleted;
            }
            clear(matcher) {
                const keys = Object.keys(this);
                let i = keys.length;
                let deleted = false;
                while (i--) {
                    const key = keys[i];
                    if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
                        delete this[key];
                        deleted = true;
                    }
                }
                return deleted;
            }
            normalize(format) {
                const self = this;
                const headers = {};
                utils$1.forEach(this, ((value, header) => {
                    const key = utils$1.findKey(headers, header);
                    if (key) {
                        self[key] = normalizeValue(value);
                        delete self[header];
                        return;
                    }
                    const normalized = format ? formatHeader(header) : String(header).trim();
                    if (normalized !== header) delete self[header];
                    self[normalized] = normalizeValue(value);
                    headers[normalized] = true;
                }));
                return this;
            }
            concat(...targets) {
                return this.constructor.concat(this, ...targets);
            }
            toJSON(asStrings) {
                const obj = Object.create(null);
                utils$1.forEach(this, ((value, header) => {
                    null != value && false !== value && (obj[header] = asStrings && utils$1.isArray(value) ? value.join(", ") : value);
                }));
                return obj;
            }
            [Symbol.iterator]() {
                return Object.entries(this.toJSON())[Symbol.iterator]();
            }
            toString() {
                return Object.entries(this.toJSON()).map((([header, value]) => header + ": " + value)).join("\n");
            }
            get [Symbol.toStringTag]() {
                return "AxiosHeaders";
            }
            static from(thing) {
                return thing instanceof this ? thing : new this(thing);
            }
            static concat(first, ...targets) {
                const computed = new this(first);
                targets.forEach((target => computed.set(target)));
                return computed;
            }
            static accessor(header) {
                const internals = this[$internals] = this[$internals] = {
                    accessors: {}
                };
                const accessors = internals.accessors;
                const prototype = this.prototype;
                function defineAccessor(_header) {
                    const lHeader = normalizeHeader(_header);
                    if (!accessors[lHeader]) {
                        buildAccessors(prototype, _header);
                        accessors[lHeader] = true;
                    }
                }
                utils$1.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
                return this;
            }
        }
        AxiosHeaders.accessor([ "Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization" ]);
        utils$1.reduceDescriptors(AxiosHeaders.prototype, (({value}, key) => {
            let mapped = key[0].toUpperCase() + key.slice(1);
            return {
                get: () => value,
                set(headerValue) {
                    this[mapped] = headerValue;
                }
            };
        }));
        utils$1.freezeMethods(AxiosHeaders);
        var AxiosHeaders$1 = AxiosHeaders;
        function transformData(fns, response) {
            const config = this || defaults$1;
            const context = response || config;
            const headers = AxiosHeaders$1.from(context.headers);
            let data = context.data;
            utils$1.forEach(fns, (function(fn) {
                data = fn.call(config, data, headers.normalize(), response ? response.status : void 0);
            }));
            headers.normalize();
            return data;
        }
        function isCancel(value) {
            return !!(value && value.__CANCEL__);
        }
        function CanceledError(message, config, request) {
            AxiosError.call(this, null == message ? "canceled" : message, AxiosError.ERR_CANCELED, config, request);
            this.name = "CanceledError";
        }
        utils$1.inherits(CanceledError, AxiosError, {
            __CANCEL__: true
        });
        function settle(resolve, reject, response) {
            const validateStatus = response.config.validateStatus;
            if (!response.status || !validateStatus || validateStatus(response.status)) resolve(response); else reject(new AxiosError("Request failed with status code " + response.status, [ AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE ][Math.floor(response.status / 100) - 4], response.config, response.request, response));
        }
        function parseProtocol(url) {
            const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
            return match && match[1] || "";
        }
        function speedometer(samplesCount, min) {
            samplesCount = samplesCount || 10;
            const bytes = new Array(samplesCount);
            const timestamps = new Array(samplesCount);
            let head = 0;
            let tail = 0;
            let firstSampleTS;
            min = void 0 !== min ? min : 1e3;
            return function(chunkLength) {
                const now = Date.now();
                const startedAt = timestamps[tail];
                if (!firstSampleTS) firstSampleTS = now;
                bytes[head] = chunkLength;
                timestamps[head] = now;
                let i = tail;
                let bytesCount = 0;
                while (i !== head) {
                    bytesCount += bytes[i++];
                    i %= samplesCount;
                }
                head = (head + 1) % samplesCount;
                if (head === tail) tail = (tail + 1) % samplesCount;
                if (now - firstSampleTS < min) return;
                const passed = startedAt && now - startedAt;
                return passed ? Math.round(1e3 * bytesCount / passed) : void 0;
            };
        }
        function throttle(fn, freq) {
            let timestamp = 0;
            const threshold = 1e3 / freq;
            let timer = null;
            return function() {
                const force = true === this;
                const now = Date.now();
                if (force || now - timestamp > threshold) {
                    if (timer) {
                        clearTimeout(timer);
                        timer = null;
                    }
                    timestamp = now;
                    return fn.apply(null, arguments);
                }
                if (!timer) timer = setTimeout((() => {
                    timer = null;
                    timestamp = Date.now();
                    return fn.apply(null, arguments);
                }), threshold - (now - timestamp));
            };
        }
        var progressEventReducer = (listener, isDownloadStream, freq = 3) => {
            let bytesNotified = 0;
            const _speedometer = speedometer(50, 250);
            return throttle((e => {
                const loaded = e.loaded;
                const total = e.lengthComputable ? e.total : void 0;
                const progressBytes = loaded - bytesNotified;
                const rate = _speedometer(progressBytes);
                const inRange = loaded <= total;
                bytesNotified = loaded;
                const data = {
                    loaded,
                    total,
                    progress: total ? loaded / total : void 0,
                    bytes: progressBytes,
                    rate: rate ? rate : void 0,
                    estimated: rate && total && inRange ? (total - loaded) / rate : void 0,
                    event: e,
                    lengthComputable: null != total
                };
                data[isDownloadStream ? "download" : "upload"] = true;
                listener(data);
            }), freq);
        };
        var isURLSameOrigin = platform.hasStandardBrowserEnv ? function() {
            const msie = /(msie|trident)/i.test(navigator.userAgent);
            const urlParsingNode = document.createElement("a");
            let originURL;
            function resolveURL(url) {
                let href = url;
                if (msie) {
                    urlParsingNode.setAttribute("href", href);
                    href = urlParsingNode.href;
                }
                urlParsingNode.setAttribute("href", href);
                return {
                    href: urlParsingNode.href,
                    protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
                    host: urlParsingNode.host,
                    search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
                    hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
                    hostname: urlParsingNode.hostname,
                    port: urlParsingNode.port,
                    pathname: "/" === urlParsingNode.pathname.charAt(0) ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
                };
            }
            originURL = resolveURL(window.location.href);
            return function(requestURL) {
                const parsed = utils$1.isString(requestURL) ? resolveURL(requestURL) : requestURL;
                return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
            };
        }() : function() {
            return function() {
                return true;
            };
        }();
        var cookies = platform.hasStandardBrowserEnv ? {
            write(name, value, expires, path, domain, secure) {
                const cookie = [ name + "=" + encodeURIComponent(value) ];
                utils$1.isNumber(expires) && cookie.push("expires=" + new Date(expires).toGMTString());
                utils$1.isString(path) && cookie.push("path=" + path);
                utils$1.isString(domain) && cookie.push("domain=" + domain);
                true === secure && cookie.push("secure");
                document.cookie = cookie.join("; ");
            },
            read(name) {
                const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
                return match ? decodeURIComponent(match[3]) : null;
            },
            remove(name) {
                this.write(name, "", Date.now() - 864e5);
            }
        } : {
            write() {},
            read() {
                return null;
            },
            remove() {}
        };
        function isAbsoluteURL(url) {
            return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
        }
        function combineURLs(baseURL, relativeURL) {
            return relativeURL ? baseURL.replace(/\/?\/$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
        }
        function buildFullPath(baseURL, requestedURL) {
            if (baseURL && !isAbsoluteURL(requestedURL)) return combineURLs(baseURL, requestedURL);
            return requestedURL;
        }
        const headersToObject = thing => thing instanceof AxiosHeaders$1 ? {
            ...thing
        } : thing;
        function mergeConfig(config1, config2) {
            config2 = config2 || {};
            const config = {};
            function getMergedValue(target, source, caseless) {
                if (utils$1.isPlainObject(target) && utils$1.isPlainObject(source)) return utils$1.merge.call({
                    caseless
                }, target, source); else if (utils$1.isPlainObject(source)) return utils$1.merge({}, source); else if (utils$1.isArray(source)) return source.slice();
                return source;
            }
            function mergeDeepProperties(a, b, caseless) {
                if (!utils$1.isUndefined(b)) return getMergedValue(a, b, caseless); else if (!utils$1.isUndefined(a)) return getMergedValue(void 0, a, caseless);
            }
            function valueFromConfig2(a, b) {
                if (!utils$1.isUndefined(b)) return getMergedValue(void 0, b);
            }
            function defaultToConfig2(a, b) {
                if (!utils$1.isUndefined(b)) return getMergedValue(void 0, b); else if (!utils$1.isUndefined(a)) return getMergedValue(void 0, a);
            }
            function mergeDirectKeys(a, b, prop) {
                if (prop in config2) return getMergedValue(a, b); else if (prop in config1) return getMergedValue(void 0, a);
            }
            const mergeMap = {
                url: valueFromConfig2,
                method: valueFromConfig2,
                data: valueFromConfig2,
                baseURL: defaultToConfig2,
                transformRequest: defaultToConfig2,
                transformResponse: defaultToConfig2,
                paramsSerializer: defaultToConfig2,
                timeout: defaultToConfig2,
                timeoutMessage: defaultToConfig2,
                withCredentials: defaultToConfig2,
                withXSRFToken: defaultToConfig2,
                adapter: defaultToConfig2,
                responseType: defaultToConfig2,
                xsrfCookieName: defaultToConfig2,
                xsrfHeaderName: defaultToConfig2,
                onUploadProgress: defaultToConfig2,
                onDownloadProgress: defaultToConfig2,
                decompress: defaultToConfig2,
                maxContentLength: defaultToConfig2,
                maxBodyLength: defaultToConfig2,
                beforeRedirect: defaultToConfig2,
                transport: defaultToConfig2,
                httpAgent: defaultToConfig2,
                httpsAgent: defaultToConfig2,
                cancelToken: defaultToConfig2,
                socketPath: defaultToConfig2,
                responseEncoding: defaultToConfig2,
                validateStatus: mergeDirectKeys,
                headers: (a, b) => mergeDeepProperties(headersToObject(a), headersToObject(b), true)
            };
            utils$1.forEach(Object.keys(Object.assign({}, config1, config2)), (function(prop) {
                const merge = mergeMap[prop] || mergeDeepProperties;
                const configValue = merge(config1[prop], config2[prop], prop);
                utils$1.isUndefined(configValue) && merge !== mergeDirectKeys || (config[prop] = configValue);
            }));
            return config;
        }
        var resolveConfig = config => {
            const newConfig = mergeConfig({}, config);
            let {data, withXSRFToken, xsrfHeaderName, xsrfCookieName, headers, auth} = newConfig;
            newConfig.headers = headers = AxiosHeaders$1.from(headers);
            newConfig.url = buildURL(buildFullPath(newConfig.baseURL, newConfig.url), config.params, config.paramsSerializer);
            if (auth) headers.set("Authorization", "Basic " + btoa((auth.username || "") + ":" + (auth.password ? unescape(encodeURIComponent(auth.password)) : "")));
            let contentType;
            if (utils$1.isFormData(data)) if (platform.hasStandardBrowserEnv || platform.hasStandardBrowserWebWorkerEnv) headers.setContentType(void 0); else if (false !== (contentType = headers.getContentType())) {
                const [type, ...tokens] = contentType ? contentType.split(";").map((token => token.trim())).filter(Boolean) : [];
                headers.setContentType([ type || "multipart/form-data", ...tokens ].join("; "));
            }
            if (platform.hasStandardBrowserEnv) {
                withXSRFToken && utils$1.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(newConfig));
                if (withXSRFToken || false !== withXSRFToken && isURLSameOrigin(newConfig.url)) {
                    const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies.read(xsrfCookieName);
                    if (xsrfValue) headers.set(xsrfHeaderName, xsrfValue);
                }
            }
            return newConfig;
        };
        const isXHRAdapterSupported = "undefined" !== typeof XMLHttpRequest;
        var xhrAdapter = isXHRAdapterSupported && function(config) {
            return new Promise((function(resolve, reject) {
                const _config = resolveConfig(config);
                let requestData = _config.data;
                const requestHeaders = AxiosHeaders$1.from(_config.headers).normalize();
                let {responseType} = _config;
                let onCanceled;
                function done() {
                    if (_config.cancelToken) _config.cancelToken.unsubscribe(onCanceled);
                    if (_config.signal) _config.signal.removeEventListener("abort", onCanceled);
                }
                let request = new XMLHttpRequest;
                request.open(_config.method.toUpperCase(), _config.url, true);
                request.timeout = _config.timeout;
                function onloadend() {
                    if (!request) return;
                    const responseHeaders = AxiosHeaders$1.from("getAllResponseHeaders" in request && request.getAllResponseHeaders());
                    const responseData = !responseType || "text" === responseType || "json" === responseType ? request.responseText : request.response;
                    const response = {
                        data: responseData,
                        status: request.status,
                        statusText: request.statusText,
                        headers: responseHeaders,
                        config,
                        request
                    };
                    settle((function(value) {
                        resolve(value);
                        done();
                    }), (function(err) {
                        reject(err);
                        done();
                    }), response);
                    request = null;
                }
                if ("onloadend" in request) request.onloadend = onloadend; else request.onreadystatechange = function() {
                    if (!request || 4 !== request.readyState) return;
                    if (0 === request.status && !(request.responseURL && 0 === request.responseURL.indexOf("file:"))) return;
                    setTimeout(onloadend);
                };
                request.onabort = function() {
                    if (!request) return;
                    reject(new AxiosError("Request aborted", AxiosError.ECONNABORTED, _config, request));
                    request = null;
                };
                request.onerror = function() {
                    reject(new AxiosError("Network Error", AxiosError.ERR_NETWORK, _config, request));
                    request = null;
                };
                request.ontimeout = function() {
                    let timeoutErrorMessage = _config.timeout ? "timeout of " + _config.timeout + "ms exceeded" : "timeout exceeded";
                    const transitional = _config.transitional || transitionalDefaults;
                    if (_config.timeoutErrorMessage) timeoutErrorMessage = _config.timeoutErrorMessage;
                    reject(new AxiosError(timeoutErrorMessage, transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED, _config, request));
                    request = null;
                };
                void 0 === requestData && requestHeaders.setContentType(null);
                if ("setRequestHeader" in request) utils$1.forEach(requestHeaders.toJSON(), (function(val, key) {
                    request.setRequestHeader(key, val);
                }));
                if (!utils$1.isUndefined(_config.withCredentials)) request.withCredentials = !!_config.withCredentials;
                if (responseType && "json" !== responseType) request.responseType = _config.responseType;
                if ("function" === typeof _config.onDownloadProgress) request.addEventListener("progress", progressEventReducer(_config.onDownloadProgress, true));
                if ("function" === typeof _config.onUploadProgress && request.upload) request.upload.addEventListener("progress", progressEventReducer(_config.onUploadProgress));
                if (_config.cancelToken || _config.signal) {
                    onCanceled = cancel => {
                        if (!request) return;
                        reject(!cancel || cancel.type ? new CanceledError(null, config, request) : cancel);
                        request.abort();
                        request = null;
                    };
                    _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
                    if (_config.signal) _config.signal.aborted ? onCanceled() : _config.signal.addEventListener("abort", onCanceled);
                }
                const protocol = parseProtocol(_config.url);
                if (protocol && -1 === platform.protocols.indexOf(protocol)) {
                    reject(new AxiosError("Unsupported protocol " + protocol + ":", AxiosError.ERR_BAD_REQUEST, config));
                    return;
                }
                request.send(requestData || null);
            }));
        };
        const composeSignals = (signals, timeout) => {
            let controller = new AbortController;
            let aborted;
            const onabort = function(cancel) {
                if (!aborted) {
                    aborted = true;
                    unsubscribe();
                    const err = cancel instanceof Error ? cancel : this.reason;
                    controller.abort(err instanceof AxiosError ? err : new CanceledError(err instanceof Error ? err.message : err));
                }
            };
            let timer = timeout && setTimeout((() => {
                onabort(new AxiosError(`timeout ${timeout} of ms exceeded`, AxiosError.ETIMEDOUT));
            }), timeout);
            const unsubscribe = () => {
                if (signals) {
                    timer && clearTimeout(timer);
                    timer = null;
                    signals.forEach((signal => {
                        signal && (signal.removeEventListener ? signal.removeEventListener("abort", onabort) : signal.unsubscribe(onabort));
                    }));
                    signals = null;
                }
            };
            signals.forEach((signal => signal && signal.addEventListener && signal.addEventListener("abort", onabort)));
            const {signal} = controller;
            signal.unsubscribe = unsubscribe;
            return [ signal, () => {
                timer && clearTimeout(timer);
                timer = null;
            } ];
        };
        var composeSignals$1 = composeSignals;
        const streamChunk = function*(chunk, chunkSize) {
            let len = chunk.byteLength;
            if (!chunkSize || len < chunkSize) {
                yield chunk;
                return;
            }
            let pos = 0;
            let end;
            while (pos < len) {
                end = pos + chunkSize;
                yield chunk.slice(pos, end);
                pos = end;
            }
        };
        const readBytes = async function*(iterable, chunkSize, encode) {
            for await (const chunk of iterable) yield* streamChunk(ArrayBuffer.isView(chunk) ? chunk : await encode(String(chunk)), chunkSize);
        };
        const trackStream = (stream, chunkSize, onProgress, onFinish, encode) => {
            const iterator = readBytes(stream, chunkSize, encode);
            let bytes = 0;
            return new ReadableStream({
                type: "bytes",
                async pull(controller) {
                    const {done, value} = await iterator.next();
                    if (done) {
                        controller.close();
                        onFinish();
                        return;
                    }
                    let len = value.byteLength;
                    onProgress && onProgress(bytes += len);
                    controller.enqueue(new Uint8Array(value));
                },
                cancel(reason) {
                    onFinish(reason);
                    return iterator.return();
                }
            }, {
                highWaterMark: 2
            });
        };
        const fetchProgressDecorator = (total, fn) => {
            const lengthComputable = null != total;
            return loaded => setTimeout((() => fn({
                lengthComputable,
                total,
                loaded
            })));
        };
        const isFetchSupported = "function" === typeof fetch && "function" === typeof Request && "function" === typeof Response;
        const isReadableStreamSupported = isFetchSupported && "function" === typeof ReadableStream;
        const encodeText = isFetchSupported && ("function" === typeof TextEncoder ? (encoder => str => encoder.encode(str))(new TextEncoder) : async str => new Uint8Array(await new Response(str).arrayBuffer()));
        const supportsRequestStream = isReadableStreamSupported && (() => {
            let duplexAccessed = false;
            const hasContentType = new Request(platform.origin, {
                body: new ReadableStream,
                method: "POST",
                get duplex() {
                    duplexAccessed = true;
                    return "half";
                }
            }).headers.has("Content-Type");
            return duplexAccessed && !hasContentType;
        })();
        const DEFAULT_CHUNK_SIZE = 64 * 1024;
        const supportsResponseStream = isReadableStreamSupported && !!(() => {
            try {
                return utils$1.isReadableStream(new Response("").body);
            } catch (err) {}
        })();
        const resolvers = {
            stream: supportsResponseStream && (res => res.body)
        };
        isFetchSupported && (res => {
            [ "text", "arrayBuffer", "blob", "formData", "stream" ].forEach((type => {
                !resolvers[type] && (resolvers[type] = utils$1.isFunction(res[type]) ? res => res[type]() : (_, config) => {
                    throw new AxiosError(`Response type '${type}' is not supported`, AxiosError.ERR_NOT_SUPPORT, config);
                });
            }));
        })(new Response);
        const getBodyLength = async body => {
            if (null == body) return 0;
            if (utils$1.isBlob(body)) return body.size;
            if (utils$1.isSpecCompliantForm(body)) return (await new Request(body).arrayBuffer()).byteLength;
            if (utils$1.isArrayBufferView(body)) return body.byteLength;
            if (utils$1.isURLSearchParams(body)) body += "";
            if (utils$1.isString(body)) return (await encodeText(body)).byteLength;
        };
        const resolveBodyLength = async (headers, body) => {
            const length = utils$1.toFiniteNumber(headers.getContentLength());
            return null == length ? getBodyLength(body) : length;
        };
        var fetchAdapter = isFetchSupported && (async config => {
            let {url, method, data, signal, cancelToken, timeout, onDownloadProgress, onUploadProgress, responseType, headers, withCredentials = "same-origin", fetchOptions} = resolveConfig(config);
            responseType = responseType ? (responseType + "").toLowerCase() : "text";
            let [composedSignal, stopTimeout] = signal || cancelToken || timeout ? composeSignals$1([ signal, cancelToken ], timeout) : [];
            let finished, request;
            const onFinish = () => {
                !finished && setTimeout((() => {
                    composedSignal && composedSignal.unsubscribe();
                }));
                finished = true;
            };
            let requestContentLength;
            try {
                if (onUploadProgress && supportsRequestStream && "get" !== method && "head" !== method && 0 !== (requestContentLength = await resolveBodyLength(headers, data))) {
                    let _request = new Request(url, {
                        method: "POST",
                        body: data,
                        duplex: "half"
                    });
                    let contentTypeHeader;
                    if (utils$1.isFormData(data) && (contentTypeHeader = _request.headers.get("content-type"))) headers.setContentType(contentTypeHeader);
                    if (_request.body) data = trackStream(_request.body, DEFAULT_CHUNK_SIZE, fetchProgressDecorator(requestContentLength, progressEventReducer(onUploadProgress)), null, encodeText);
                }
                if (!utils$1.isString(withCredentials)) withCredentials = withCredentials ? "cors" : "omit";
                request = new Request(url, {
                    ...fetchOptions,
                    signal: composedSignal,
                    method: method.toUpperCase(),
                    headers: headers.normalize().toJSON(),
                    body: data,
                    duplex: "half",
                    withCredentials
                });
                let response = await fetch(request);
                const isStreamResponse = supportsResponseStream && ("stream" === responseType || "response" === responseType);
                if (supportsResponseStream && (onDownloadProgress || isStreamResponse)) {
                    const options = {};
                    [ "status", "statusText", "headers" ].forEach((prop => {
                        options[prop] = response[prop];
                    }));
                    const responseContentLength = utils$1.toFiniteNumber(response.headers.get("content-length"));
                    response = new Response(trackStream(response.body, DEFAULT_CHUNK_SIZE, onDownloadProgress && fetchProgressDecorator(responseContentLength, progressEventReducer(onDownloadProgress, true)), isStreamResponse && onFinish, encodeText), options);
                }
                responseType = responseType || "text";
                let responseData = await resolvers[utils$1.findKey(resolvers, responseType) || "text"](response, config);
                !isStreamResponse && onFinish();
                stopTimeout && stopTimeout();
                return await new Promise(((resolve, reject) => {
                    settle(resolve, reject, {
                        data: responseData,
                        headers: AxiosHeaders$1.from(response.headers),
                        status: response.status,
                        statusText: response.statusText,
                        config,
                        request
                    });
                }));
            } catch (err) {
                onFinish();
                if (err && "TypeError" === err.name && /fetch/i.test(err.message)) throw Object.assign(new AxiosError("Network Error", AxiosError.ERR_NETWORK, config, request), {
                    cause: err.cause || err
                });
                throw AxiosError.from(err, err && err.code, config, request);
            }
        });
        const knownAdapters = {
            http: httpAdapter,
            xhr: xhrAdapter,
            fetch: fetchAdapter
        };
        utils$1.forEach(knownAdapters, ((fn, value) => {
            if (fn) {
                try {
                    Object.defineProperty(fn, "name", {
                        value
                    });
                } catch (e) {}
                Object.defineProperty(fn, "adapterName", {
                    value
                });
            }
        }));
        const renderReason = reason => `- ${reason}`;
        const isResolvedHandle = adapter => utils$1.isFunction(adapter) || null === adapter || false === adapter;
        var adapters = {
            getAdapter: adapters => {
                adapters = utils$1.isArray(adapters) ? adapters : [ adapters ];
                const {length} = adapters;
                let nameOrAdapter;
                let adapter;
                const rejectedReasons = {};
                for (let i = 0; i < length; i++) {
                    nameOrAdapter = adapters[i];
                    let id;
                    adapter = nameOrAdapter;
                    if (!isResolvedHandle(nameOrAdapter)) {
                        adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];
                        if (void 0 === adapter) throw new AxiosError(`Unknown adapter '${id}'`);
                    }
                    if (adapter) break;
                    rejectedReasons[id || "#" + i] = adapter;
                }
                if (!adapter) {
                    const reasons = Object.entries(rejectedReasons).map((([id, state]) => `adapter ${id} ` + (false === state ? "is not supported by the environment" : "is not available in the build")));
                    let s = length ? reasons.length > 1 ? "since :\n" + reasons.map(renderReason).join("\n") : " " + renderReason(reasons[0]) : "as no adapter specified";
                    throw new AxiosError(`There is no suitable adapter to dispatch the request ` + s, "ERR_NOT_SUPPORT");
                }
                return adapter;
            },
            adapters: knownAdapters
        };
        function throwIfCancellationRequested(config) {
            if (config.cancelToken) config.cancelToken.throwIfRequested();
            if (config.signal && config.signal.aborted) throw new CanceledError(null, config);
        }
        function dispatchRequest(config) {
            throwIfCancellationRequested(config);
            config.headers = AxiosHeaders$1.from(config.headers);
            config.data = transformData.call(config, config.transformRequest);
            if (-1 !== [ "post", "put", "patch" ].indexOf(config.method)) config.headers.setContentType("application/x-www-form-urlencoded", false);
            const adapter = adapters.getAdapter(config.adapter || defaults$1.adapter);
            return adapter(config).then((function(response) {
                throwIfCancellationRequested(config);
                response.data = transformData.call(config, config.transformResponse, response);
                response.headers = AxiosHeaders$1.from(response.headers);
                return response;
            }), (function(reason) {
                if (!isCancel(reason)) {
                    throwIfCancellationRequested(config);
                    if (reason && reason.response) {
                        reason.response.data = transformData.call(config, config.transformResponse, reason.response);
                        reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
                    }
                }
                return Promise.reject(reason);
            }));
        }
        const VERSION = "1.7.2";
        const validators$1 = {};
        [ "object", "boolean", "number", "function", "string", "symbol" ].forEach(((type, i) => {
            validators$1[type] = function(thing) {
                return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
            };
        }));
        const deprecatedWarnings = {};
        validators$1.transitional = function(validator, version, message) {
            function formatMessage(opt, desc) {
                return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
            }
            return (value, opt, opts) => {
                if (false === validator) throw new AxiosError(formatMessage(opt, " has been removed" + (version ? " in " + version : "")), AxiosError.ERR_DEPRECATED);
                if (version && !deprecatedWarnings[opt]) {
                    deprecatedWarnings[opt] = true;
                    console.warn(formatMessage(opt, " has been deprecated since v" + version + " and will be removed in the near future"));
                }
                return validator ? validator(value, opt, opts) : true;
            };
        };
        function assertOptions(options, schema, allowUnknown) {
            if ("object" !== typeof options) throw new AxiosError("options must be an object", AxiosError.ERR_BAD_OPTION_VALUE);
            const keys = Object.keys(options);
            let i = keys.length;
            while (i-- > 0) {
                const opt = keys[i];
                const validator = schema[opt];
                if (validator) {
                    const value = options[opt];
                    const result = void 0 === value || validator(value, opt, options);
                    if (true !== result) throw new AxiosError("option " + opt + " must be " + result, AxiosError.ERR_BAD_OPTION_VALUE);
                    continue;
                }
                if (true !== allowUnknown) throw new AxiosError("Unknown option " + opt, AxiosError.ERR_BAD_OPTION);
            }
        }
        var validator = {
            assertOptions,
            validators: validators$1
        };
        const validators = validator.validators;
        class Axios {
            constructor(instanceConfig) {
                this.defaults = instanceConfig;
                this.interceptors = {
                    request: new InterceptorManager$1,
                    response: new InterceptorManager$1
                };
            }
            async request(configOrUrl, config) {
                try {
                    return await this._request(configOrUrl, config);
                } catch (err) {
                    if (err instanceof Error) {
                        let dummy;
                        Error.captureStackTrace ? Error.captureStackTrace(dummy = {}) : dummy = new Error;
                        const stack = dummy.stack ? dummy.stack.replace(/^.+\n/, "") : "";
                        try {
                            if (!err.stack) err.stack = stack; else if (stack && !String(err.stack).endsWith(stack.replace(/^.+\n.+\n/, ""))) err.stack += "\n" + stack;
                        } catch (e) {}
                    }
                    throw err;
                }
            }
            _request(configOrUrl, config) {
                if ("string" === typeof configOrUrl) {
                    config = config || {};
                    config.url = configOrUrl;
                } else config = configOrUrl || {};
                config = mergeConfig(this.defaults, config);
                const {transitional, paramsSerializer, headers} = config;
                if (void 0 !== transitional) validator.assertOptions(transitional, {
                    silentJSONParsing: validators.transitional(validators.boolean),
                    forcedJSONParsing: validators.transitional(validators.boolean),
                    clarifyTimeoutError: validators.transitional(validators.boolean)
                }, false);
                if (null != paramsSerializer) if (utils$1.isFunction(paramsSerializer)) config.paramsSerializer = {
                    serialize: paramsSerializer
                }; else validator.assertOptions(paramsSerializer, {
                    encode: validators.function,
                    serialize: validators.function
                }, true);
                config.method = (config.method || this.defaults.method || "get").toLowerCase();
                let contextHeaders = headers && utils$1.merge(headers.common, headers[config.method]);
                headers && utils$1.forEach([ "delete", "get", "head", "post", "put", "patch", "common" ], (method => {
                    delete headers[method];
                }));
                config.headers = AxiosHeaders$1.concat(contextHeaders, headers);
                const requestInterceptorChain = [];
                let synchronousRequestInterceptors = true;
                this.interceptors.request.forEach((function(interceptor) {
                    if ("function" === typeof interceptor.runWhen && false === interceptor.runWhen(config)) return;
                    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
                    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
                }));
                const responseInterceptorChain = [];
                this.interceptors.response.forEach((function(interceptor) {
                    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
                }));
                let promise;
                let i = 0;
                let len;
                if (!synchronousRequestInterceptors) {
                    const chain = [ dispatchRequest.bind(this), void 0 ];
                    chain.unshift.apply(chain, requestInterceptorChain);
                    chain.push.apply(chain, responseInterceptorChain);
                    len = chain.length;
                    promise = Promise.resolve(config);
                    while (i < len) promise = promise.then(chain[i++], chain[i++]);
                    return promise;
                }
                len = requestInterceptorChain.length;
                let newConfig = config;
                i = 0;
                while (i < len) {
                    const onFulfilled = requestInterceptorChain[i++];
                    const onRejected = requestInterceptorChain[i++];
                    try {
                        newConfig = onFulfilled(newConfig);
                    } catch (error) {
                        onRejected.call(this, error);
                        break;
                    }
                }
                try {
                    promise = dispatchRequest.call(this, newConfig);
                } catch (error) {
                    return Promise.reject(error);
                }
                i = 0;
                len = responseInterceptorChain.length;
                while (i < len) promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
                return promise;
            }
            getUri(config) {
                config = mergeConfig(this.defaults, config);
                const fullPath = buildFullPath(config.baseURL, config.url);
                return buildURL(fullPath, config.params, config.paramsSerializer);
            }
        }
        utils$1.forEach([ "delete", "get", "head", "options" ], (function(method) {
            Axios.prototype[method] = function(url, config) {
                return this.request(mergeConfig(config || {}, {
                    method,
                    url,
                    data: (config || {}).data
                }));
            };
        }));
        utils$1.forEach([ "post", "put", "patch" ], (function(method) {
            function generateHTTPMethod(isForm) {
                return function(url, data, config) {
                    return this.request(mergeConfig(config || {}, {
                        method,
                        headers: isForm ? {
                            "Content-Type": "multipart/form-data"
                        } : {},
                        url,
                        data
                    }));
                };
            }
            Axios.prototype[method] = generateHTTPMethod();
            Axios.prototype[method + "Form"] = generateHTTPMethod(true);
        }));
        var Axios$1 = Axios;
        class CancelToken {
            constructor(executor) {
                if ("function" !== typeof executor) throw new TypeError("executor must be a function.");
                let resolvePromise;
                this.promise = new Promise((function(resolve) {
                    resolvePromise = resolve;
                }));
                const token = this;
                this.promise.then((cancel => {
                    if (!token._listeners) return;
                    let i = token._listeners.length;
                    while (i-- > 0) token._listeners[i](cancel);
                    token._listeners = null;
                }));
                this.promise.then = onfulfilled => {
                    let _resolve;
                    const promise = new Promise((resolve => {
                        token.subscribe(resolve);
                        _resolve = resolve;
                    })).then(onfulfilled);
                    promise.cancel = function() {
                        token.unsubscribe(_resolve);
                    };
                    return promise;
                };
                executor((function(message, config, request) {
                    if (token.reason) return;
                    token.reason = new CanceledError(message, config, request);
                    resolvePromise(token.reason);
                }));
            }
            throwIfRequested() {
                if (this.reason) throw this.reason;
            }
            subscribe(listener) {
                if (this.reason) {
                    listener(this.reason);
                    return;
                }
                if (this._listeners) this._listeners.push(listener); else this._listeners = [ listener ];
            }
            unsubscribe(listener) {
                if (!this._listeners) return;
                const index = this._listeners.indexOf(listener);
                if (-1 !== index) this._listeners.splice(index, 1);
            }
            static source() {
                let cancel;
                const token = new CancelToken((function(c) {
                    cancel = c;
                }));
                return {
                    token,
                    cancel
                };
            }
        }
        var CancelToken$1 = CancelToken;
        function spread(callback) {
            return function(arr) {
                return callback.apply(null, arr);
            };
        }
        function isAxiosError(payload) {
            return utils$1.isObject(payload) && true === payload.isAxiosError;
        }
        const HttpStatusCode = {
            Continue: 100,
            SwitchingProtocols: 101,
            Processing: 102,
            EarlyHints: 103,
            Ok: 200,
            Created: 201,
            Accepted: 202,
            NonAuthoritativeInformation: 203,
            NoContent: 204,
            ResetContent: 205,
            PartialContent: 206,
            MultiStatus: 207,
            AlreadyReported: 208,
            ImUsed: 226,
            MultipleChoices: 300,
            MovedPermanently: 301,
            Found: 302,
            SeeOther: 303,
            NotModified: 304,
            UseProxy: 305,
            Unused: 306,
            TemporaryRedirect: 307,
            PermanentRedirect: 308,
            BadRequest: 400,
            Unauthorized: 401,
            PaymentRequired: 402,
            Forbidden: 403,
            NotFound: 404,
            MethodNotAllowed: 405,
            NotAcceptable: 406,
            ProxyAuthenticationRequired: 407,
            RequestTimeout: 408,
            Conflict: 409,
            Gone: 410,
            LengthRequired: 411,
            PreconditionFailed: 412,
            PayloadTooLarge: 413,
            UriTooLong: 414,
            UnsupportedMediaType: 415,
            RangeNotSatisfiable: 416,
            ExpectationFailed: 417,
            ImATeapot: 418,
            MisdirectedRequest: 421,
            UnprocessableEntity: 422,
            Locked: 423,
            FailedDependency: 424,
            TooEarly: 425,
            UpgradeRequired: 426,
            PreconditionRequired: 428,
            TooManyRequests: 429,
            RequestHeaderFieldsTooLarge: 431,
            UnavailableForLegalReasons: 451,
            InternalServerError: 500,
            NotImplemented: 501,
            BadGateway: 502,
            ServiceUnavailable: 503,
            GatewayTimeout: 504,
            HttpVersionNotSupported: 505,
            VariantAlsoNegotiates: 506,
            InsufficientStorage: 507,
            LoopDetected: 508,
            NotExtended: 510,
            NetworkAuthenticationRequired: 511
        };
        Object.entries(HttpStatusCode).forEach((([key, value]) => {
            HttpStatusCode[value] = key;
        }));
        var HttpStatusCode$1 = HttpStatusCode;
        function createInstance(defaultConfig) {
            const context = new Axios$1(defaultConfig);
            const instance = bind(Axios$1.prototype.request, context);
            utils$1.extend(instance, Axios$1.prototype, context, {
                allOwnKeys: true
            });
            utils$1.extend(instance, context, null, {
                allOwnKeys: true
            });
            instance.create = function(instanceConfig) {
                return createInstance(mergeConfig(defaultConfig, instanceConfig));
            };
            return instance;
        }
        const axios = createInstance(defaults$1);
        axios.Axios = Axios$1;
        axios.CanceledError = CanceledError;
        axios.CancelToken = CancelToken$1;
        axios.isCancel = isCancel;
        axios.VERSION = VERSION;
        axios.toFormData = toFormData;
        axios.AxiosError = AxiosError;
        axios.Cancel = axios.CanceledError;
        axios.all = function(promises) {
            return Promise.all(promises);
        };
        axios.spread = spread;
        axios.isAxiosError = isAxiosError;
        axios.mergeConfig = mergeConfig;
        axios.AxiosHeaders = AxiosHeaders$1;
        axios.formToJSON = thing => formDataToJSON(utils$1.isHTMLForm(thing) ? new FormData(thing) : thing);
        axios.getAdapter = adapters.getAdapter;
        axios.HttpStatusCode = HttpStatusCode$1;
        axios.default = axios;
        module.exports = axios;
    },
    2395: (module, __unused_webpack_exports, __webpack_require__) => {
        "use strict";
        var isArguments = __webpack_require__(7740);
        if (__webpack_require__(679)() || __webpack_require__(8186)()) {
            var $iterator = Symbol.iterator;
            module.exports = function(iterable) {
                if (null != iterable && "undefined" !== typeof iterable[$iterator]) return iterable[$iterator]();
                if (isArguments(iterable)) return Array.prototype[$iterator].call(iterable);
            };
        } else {
            var isArray = __webpack_require__(5182);
            var isString = __webpack_require__(8559);
            var GetIntrinsic = __webpack_require__(8750);
            var $Map = GetIntrinsic("%Map%", true);
            var $Set = GetIntrinsic("%Set%", true);
            var callBound = __webpack_require__(2737);
            var $arrayPush = callBound("Array.prototype.push");
            var $charCodeAt = callBound("String.prototype.charCodeAt");
            var $stringSlice = callBound("String.prototype.slice");
            var advanceStringIndex = function(S, index) {
                var length = S.length;
                if (index + 1 >= length) return index + 1;
                var first = $charCodeAt(S, index);
                if (first < 55296 || first > 56319) return index + 1;
                var second = $charCodeAt(S, index + 1);
                if (second < 56320 || second > 57343) return index + 1;
                return index + 2;
            };
            var getArrayIterator = function(arraylike) {
                var i = 0;
                return {
                    next: function() {
                        var done = i >= arraylike.length;
                        var value;
                        if (!done) {
                            value = arraylike[i];
                            i += 1;
                        }
                        return {
                            done,
                            value
                        };
                    }
                };
            };
            var getNonCollectionIterator = function(iterable, noPrimordialCollections) {
                if (isArray(iterable) || isArguments(iterable)) return getArrayIterator(iterable);
                if (isString(iterable)) {
                    var i = 0;
                    return {
                        next: function() {
                            var nextIndex = advanceStringIndex(iterable, i);
                            var value = $stringSlice(iterable, i, nextIndex);
                            i = nextIndex;
                            return {
                                done: nextIndex > iterable.length,
                                value
                            };
                        }
                    };
                }
                if (noPrimordialCollections && "undefined" !== typeof iterable["_es6-shim iterator_"]) return iterable["_es6-shim iterator_"]();
            };
            if (!$Map && !$Set) module.exports = function(iterable) {
                if (null != iterable) return getNonCollectionIterator(iterable, true);
            }; else {
                var isMap = __webpack_require__(6966);
                var isSet = __webpack_require__(4255);
                var $mapForEach = callBound("Map.prototype.forEach", true);
                var $setForEach = callBound("Set.prototype.forEach", true);
                if (false || !{}.versions || !{}.versions.node) {
                    var $mapIterator = callBound("Map.prototype.iterator", true);
                    var $setIterator = callBound("Set.prototype.iterator", true);
                    var getStopIterationIterator = function(iterator) {
                        var done = false;
                        return {
                            next: function() {
                                try {
                                    return {
                                        done,
                                        value: done ? void 0 : iterator.next()
                                    };
                                } catch (e) {
                                    done = true;
                                    return {
                                        done: true,
                                        value: void 0
                                    };
                                }
                            }
                        };
                    };
                }
                var $mapAtAtIterator = callBound("Map.prototype.@@iterator", true) || callBound("Map.prototype._es6-shim iterator_", true);
                var $setAtAtIterator = callBound("Set.prototype.@@iterator", true) || callBound("Set.prototype._es6-shim iterator_", true);
                var getCollectionIterator = function(iterable) {
                    if (isMap(iterable)) {
                        if ($mapIterator) return getStopIterationIterator($mapIterator(iterable));
                        if ($mapAtAtIterator) return $mapAtAtIterator(iterable);
                        if ($mapForEach) {
                            var entries = [];
                            $mapForEach(iterable, (function(v, k) {
                                $arrayPush(entries, [ k, v ]);
                            }));
                            return getArrayIterator(entries);
                        }
                    }
                    if (isSet(iterable)) {
                        if ($setIterator) return getStopIterationIterator($setIterator(iterable));
                        if ($setAtAtIterator) return $setAtAtIterator(iterable);
                        if ($setForEach) {
                            var values = [];
                            $setForEach(iterable, (function(v) {
                                $arrayPush(values, v);
                            }));
                            return getArrayIterator(values);
                        }
                    }
                };
                module.exports = function(iterable) {
                    return getCollectionIterator(iterable) || getNonCollectionIterator(iterable);
                };
            }
        }
    },
    3062: (module, __unused_webpack_exports, __webpack_require__) => {
        "use strict";
        var isMap = __webpack_require__(6966);
        var isSet = __webpack_require__(4255);
        var isWeakMap = __webpack_require__(349);
        var isWeakSet = __webpack_require__(7812);
        module.exports = function(value) {
            if (value && "object" === typeof value) {
                if (isMap(value)) return "Map";
                if (isSet(value)) return "Set";
                if (isWeakMap(value)) return "WeakMap";
                if (isWeakSet(value)) return "WeakSet";
            }
            return false;
        };
    },
    8467: (__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
            T: () => includeKeys
        });
        function includeKeys(object, predicate) {
            const result = {};
            if (Array.isArray(predicate)) for (const key of predicate) {
                const descriptor = Object.getOwnPropertyDescriptor(object, key);
                if (descriptor?.enumerable) Object.defineProperty(result, key, descriptor);
            } else for (const key of Reflect.ownKeys(object)) {
                const descriptor = Object.getOwnPropertyDescriptor(object, key);
                if (descriptor.enumerable) {
                    const value = object[key];
                    if (predicate(key, value, object)) Object.defineProperty(result, key, descriptor);
                }
            }
            return result;
        }
    },
    1844: (__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
            Z: () => splitOnFirst
        });
        function splitOnFirst(string, separator) {
            if (!("string" === typeof string && "string" === typeof separator)) throw new TypeError("Expected the arguments to be of type `string`");
            if ("" === string || "" === separator) return [];
            const separatorIndex = string.indexOf(separator);
            if (-1 === separatorIndex) return [];
            return [ string.slice(0, separatorIndex), string.slice(separatorIndex + separator.length) ];
        }
    }
} ]);