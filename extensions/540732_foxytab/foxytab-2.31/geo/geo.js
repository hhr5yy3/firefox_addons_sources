export {Geo};

class Geo {

  constructor() {
    this.ipv4 = [];
    this.ipv6 = [];

    // ----- parse & cache the ipv4 data
    fetch('/geo/ipv4.dat')
    .then(response => response.text())
    .then(text => this.ipv4 = text.split(/\n+/))
    .catch(console.error);

    fetch('/geo/ipv6.dat')
    .then(response => response.text())
    .then(text => this.ipv6 = text.split(/\n+/))
    .catch(console.error);
  }

  getCC(ip) {
    // ----- Reserved IPv4/IPv6 Address Spaces
    switch (true) {
      case ip.startsWith('10.'):                            // 10.0.0.0/8       10.0.0.0      10.255.255.255
      case ip.startsWith('127.'):                           // 127.0.0.0/8      127.0.0.0     127.255.255.255
      case ip.startsWith('169.254.'):                       // 169.254.0.0/16   169.254.0.0   169.254.255.255
      case ip.startsWith('192.0.2.'):                       // 192.0.2.0/24     192.0.2.0     192.0.2.255
      case ip.startsWith('192.168.'):                       // 192.168.0.0/16   192.168.0.0   192.168.255.255
      case /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(ip):       // 172.16.0.0/12    172.16.0.0    172.31.255.255

      case ip === '::1':                                    // localhost
      case ip.startsWith('64:ff9b::'):                      // 64:ff9b::/96     64:ff9b::0.0.0.0  64:ff9b::255.255.255.255
      case ip.startsWith('2002::'):                         // 2002::/16        2002::            2002:ffff:ffff:ffff:ffff:ffff:ffff:ffff
      case ip.startsWith('fc00::'):                         // fc00::/7         fc00::            fdff:ffff:ffff:ffff:ffff:ffff:ffff:ffff
      case ip.startsWith('fe80::'):                         // fe80::/10        fe80::            febf:ffff:ffff:ffff:ffff:ffff:ffff:ffff
      case ip.startsWith('ff00::'):                         // ff00::/8         ff00::            ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff
        return 'private';

      case /(\d+\.){3}\d+/.test(ip):                        // IPv4
        return this.findIP(ip, 'ipv4');

      case ip.includes(':'):                                // IPv6
        return this.findIP(ip);

      default:
        return 'unknown';
    }
  }

  findIP(ip, v4) {
    const db = v4 ? this.ipv4 : this.ipv6;
    const sp = ip.split(v4 ? '.' : ':');

    // prepare IPv6
    if (!v4 && sp.length < 8) {
      sp.splice(sp.findIndex(i => !i), 0, ...Array(8 - sp.length).fill(''));
    }

    let dec = 0;
    sp.reverse().forEach((p, index) => dec += v4 ? p * 2**(index*8) : parseInt(p || '0', 16) * 2**(index*16));

    const str = BigInt(dec).toString();                     // FF68
    const len = str.length +2;
    // find the first one that is bigger, and select the previous one
    const index = db.findIndex(item => item.length === len && item.slice(0,-2) > str);
    const line = index > 0 && db[index-1];                  // index not -1 or 0
    return line ? line.slice(-2) : 'unknown';
  }

  getCountry(cc = 'unknown') {
    const countryCode = {
      'aa': {country: "", continent: 'Asia'},
      'ad': {country: "Andorra", continent: 'Europe'},
      'ae': {country: "United Arab Emirates", continent: 'Asia'},
      'af': {country: "Afghanistan", continent: 'Asia'},
      'ag': {country: "Antigua and Barbuda", continent: 'North America'},
      'ai': {country: "Anguilla", continent: 'North America'},
      'al': {country: "Albania", continent: 'Europe'},
      'am': {country: "Armenia", continent: 'Asia'},
      'ao': {country: "Angola", continent: 'Africa'},
      'aq': {country: "Antarctica", continent: 'Antarctica'},
      'ar': {country: "Argentina", continent: 'South America'},
      'as': {country: "American Samoa", continent: 'Oceania'},
      'at': {country: "Austria", continent: 'Europe'},
      'au': {country: "Australia", continent: 'Oceania'},
      'aw': {country: "Aruba", continent: 'North America'},
      'ax': {country: "Åland Islands", continent: 'Europe'},
      'az': {country: "Azerbaijan", continent: 'Asia'},
      'ba': {country: "Bosnia and Herzegovina", continent: 'Europe'},
      'bb': {country: "Barbados", continent: 'North America'},
      'bd': {country: "Bangladesh", continent: 'Asia'},
      'be': {country: "Belgium", continent: 'Europe'},
      'bf': {country: "Burkina Faso", continent: 'Africa'},
      'bg': {country: "Bulgaria", continent: 'Europe'},
      'bh': {country: "Bahrain", continent: 'Asia'},
      'bi': {country: "Burundi", continent: 'Africa'},
      'bj': {country: "Benin", continent: 'Africa'},
      'bl': {country: "Saint Barthélemy", continent: 'North America'},
      'bm': {country: "Bermuda", continent: 'North America'},
      'bn': {country: "Brunei Darussalam", continent: 'Asia'},
      'bo': {country: "Bolivia, Plurinational State of", continent: 'South America'},
      'bq': {country: "Bonaire, Sint Eustatius and Saba", continent: 'North America'},
      'br': {country: "Brazil", continent: 'South America'},
      'bs': {country: "Bahamas", continent: 'North America'},
      'bt': {country: "Bhutan", continent: 'Asia'},
      'bv': {country: "Bouvet Island", continent: 'Antarctica'},
      'bw': {country: "Botswana", continent: 'Africa'},
      'by': {country: "Belarus", continent: 'Europe'},
      'bz': {country: "Belize", continent: 'North America'},
      'ca': {country: "Canada", continent: 'North America'},
      'cc': {country: "Cocos [Keeling] Islands", continent: 'Asia'},
      'cd': {country: "Congo, the Democratic Republic of the", continent: 'Africa'},
      'cf': {country: "Central African Republic", continent: 'Africa'},
      'cg': {country: "Congo, Republic of the", continent: 'Africa'},
      'ch': {country: "Switzerland", continent: 'Europe'},
      'ci': {country: "Ivory Coast (Côte d'Ivoire)", continent: 'Africa'},
      'ck': {country: "Cook Islands", continent: 'Oceania'},
      'cl': {country: "Chile", continent: 'South America'},
      'cm': {country: "Cameroon", continent: 'Africa'},
      'cn': {country: "China", continent: 'Asia'},
      'co': {country: "Colombia", continent: 'South America'},
      'cr': {country: "Costa Rica", continent: 'North America'},
      'cu': {country: "Cuba", continent: 'North America'},
      'cv': {country: "Cabo Verde", continent: 'Africa'},
      'cw': {country: "Curaçao", continent: 'North America'},
      'cx': {country: "Christmas Island", continent: 'Oceania'},
      'cy': {country: "Cyprus", continent: 'Europe'},
      'cz': {country: "Czechia", continent: 'Europe'},
      'de': {country: "Germany", continent: 'Europe'},
      'dj': {country: "Djibouti", continent: 'Africa'},
      'dk': {country: "Denmark", continent: 'Europe'},
      'dm': {country: "Dominica", continent: 'North America'},
      'do': {country: "Dominican Republic", continent: 'North America'},
      'dz': {country: "Algeria", continent: 'Africa'},
      'ec': {country: "Ecuador", continent: 'South America'},
      'ee': {country: "Estonia", continent: 'Europe'},
      'eg': {country: "Egypt", continent: 'Africa'},
      'eh': {country: "Western Sahara", continent: 'Africa'},
      'er': {country: "Eritrea", continent: 'Africa'},
      'es': {country: "Spain", continent: 'Europe'},
      'et': {country: "Ethiopia", continent: 'Africa'},
      'eu': {country: "European Union", continent: 'Europe'},
      'fi': {country: "Finland", continent: 'Europe'},
      'fj': {country: "Fiji", continent: 'Oceania'},
      'fk': {country: "Falkland Islands (Malvinas)", continent: 'South America'},
      'fm': {country: "Micronesia, Federated States of", continent: 'Oceania'},
      'fo': {country: "Faroe Islands", continent: 'Europe'},
      'fr': {country: "France", continent: 'Europe'},
      'ga': {country: "Gabon", continent: 'Africa'},
      'gb': {country: "United Kingdom", continent: 'Europe'},
      'gd': {country: "Grenada", continent: 'North America'},
      'ge': {country: "Georgia", continent: 'Asia'},
      'gf': {country: "French Guiana", continent: 'South America'},
      'gg': {country: "Guernsey", continent: 'Europe'},
      'gh': {country: "Ghana", continent: 'Africa'},
      'gi': {country: "Gibraltar", continent: 'Europe'},
      'gl': {country: "Greenland", continent: 'North America'},
      'gm': {country: "Gambia", continent: 'Africa'},
      'gn': {country: "Guinea", continent: 'Africa'},
      'gp': {country: "Guadeloupe", continent: 'North America'},
      'gq': {country: "Equatorial Guinea", continent: 'Africa'},
      'gr': {country: "Greece", continent: 'Europe'},
      'gs': {country: "South Georgia and the South Sandwich Islands", continent: 'Antarctica'},
      'gt': {country: "Guatemala", continent: 'North America'},
      'gu': {country: "Guam", continent: 'Oceania'},
      'gw': {country: "Guinea-Bissau", continent: 'Africa'},
      'gy': {country: "Guyana", continent: 'South America'},
      'hk': {country: "Hong Kong", continent: 'Asia'},
      'hm': {country: "Heard Island and McDonald Islands", continent: 'Antarctica'},
      'hn': {country: "Honduras", continent: 'North America'},
      'hr': {country: "Croatia", continent: 'Europe'},
      'ht': {country: "Haiti", continent: 'North America'},
      'hu': {country: "Hungary", continent: 'Europe'},
      'id': {country: "Indonesia", continent: 'Asia'},
      'ie': {country: "Ireland", continent: 'Europe'},
      'il': {country: "Israel", continent: 'Asia'},
      'im': {country: "Isle of Man", continent: 'Europe'},
      'in': {country: "India", continent: 'Asia'},
      'io': {country: "British Indian Ocean Territory", continent: 'Asia'},
      'iq': {country: "Iraq", continent: 'Asia'},
      'ir': {country: "Iran, Islamic Republic Of", continent: 'Asia'},
      'is': {country: "Iceland", continent: 'Europe'},
      'it': {country: "Italy", continent: 'Europe'},
      'je': {country: "Jersey", continent: 'Europe'},
      'jm': {country: "Jamaica", continent: 'North America'},
      'jo': {country: "Jordan (Hashemite Kingdom of Jordan)", continent: 'Asia'},
      'jp': {country: "Japan", continent: 'Asia'},
      'ke': {country: "Kenya", continent: 'Africa'},
      'kg': {country: "Kyrgyzstan", continent: 'Asia'},
      'kh': {country: "Cambodia", continent: 'Asia'},
      'ki': {country: "Kiribati", continent: 'Oceania'},
      'km': {country: "Comoros", continent: 'Africa'},
      'kn': {country: "St Kitts and Nevis", continent: 'North America'},
      'kp': {country: "North Korea", continent: 'Asia'},
      'kr': {country: "South Korea", continent: 'Asia'},
      'kw': {country: "Kuwait", continent: 'Asia'},
      'ky': {country: "Cayman Islands", continent: 'North America'},
      'kz': {country: "Kazakhstan", continent: 'Asia'},
      'la': {country: "Laos (Lao People's Democratic Republic)", continent: 'Asia'},
      'lb': {country: "Lebanon", continent: 'Asia'},
      'lc': {country: "Saint Lucia", continent: 'North America'},
      'li': {country: "Liechtenstein", continent: 'Europe'},
      'lk': {country: "Sri Lanka", continent: 'Asia'},
      'lr': {country: "Liberia", continent: 'Africa'},
      'ls': {country: "Lesotho", continent: 'Africa'},
      'lt': {country: "Republic of Lithuania", continent: 'Europe'},
      'lu': {country: "Luxembourg", continent: 'Europe'},
      'lv': {country: "Latvia", continent: 'Europe'},
      'ly': {country: "Libya", continent: 'Africa'},
      'ma': {country: "Morocco", continent: 'Africa'},
      'mc': {country: "Monaco", continent: 'Europe'},
      'md': {country: "Moldova, Republic of", continent: 'Europe'},
      'me': {country: "Montenegro", continent: 'Europe'},
      'mf': {country: "Saint Martin (French part)", continent: 'North America'},
      'mg': {country: "Madagascar", continent: 'Africa'},
      'mh': {country: "Marshall Islands", continent: 'Oceania'},
      'mk': {country: "North Macedonia", continent: 'Europe'},
      'ml': {country: "Mali", continent: 'Africa'},
      'mm': {country: "Myanmar", continent: 'Asia'},
      'mn': {country: "Mongolia", continent: 'Asia'},
      'mo': {country: "Macao", continent: 'Asia'},
      'mp': {country: "Northern Mariana Islands", continent: 'Oceania'},
      'mq': {country: "Martinique", continent: 'North America'},
      'mr': {country: "Mauritania", continent: 'Africa'},
      'ms': {country: "Montserrat", continent: 'North America'},
      'mt': {country: "Malta", continent: 'Europe'},
      'mu': {country: "Mauritius", continent: 'Africa'},
      'mv': {country: "Maldives", continent: 'Asia'},
      'mw': {country: "Malawi", continent: 'Africa'},
      'mx': {country: "Mexico", continent: 'North America'},
      'my': {country: "Malaysia", continent: 'Asia'},
      'mz': {country: "Mozambique", continent: 'Africa'},
      'na': {country: "Namibia", continent: 'Africa'},
      'nc': {country: "New Caledonia", continent: 'Oceania'},
      'ne': {country: "Niger", continent: 'Africa'},
      'nf': {country: "Norfolk Island", continent: 'Oceania'},
      'ng': {country: "Nigeria", continent: 'Africa'},
      'ni': {country: "Nicaragua", continent: 'North America'},
      'nl': {country: "Netherlands", continent: 'Europe'},
      'no': {country: "Norway", continent: 'Europe'},
      'np': {country: "Nepal", continent: 'Asia'},
      'nr': {country: "Nauru", continent: 'Oceania'},
      'nu': {country: "Niue", continent: 'Oceania'},
      'nz': {country: "New Zealand", continent: 'Oceania'},
      'om': {country: "Oman", continent: 'Asia'},
      'pa': {country: "Panama", continent: 'North America'},
      'pe': {country: "Peru", continent: 'South America'},
      'pf': {country: "French Polynesia", continent: 'Oceania'},
      'pg': {country: "Papua New Guinea", continent: 'Oceania'},
      'ph': {country: "Philippines", continent: 'Asia'},
      'pk': {country: "Pakistan", continent: 'Asia'},
      'pl': {country: "Poland", continent: 'Europe'},
      'pm': {country: "Saint Pierre and Miquelon", continent: 'North America'},
      'pn': {country: "Pitcairn Islands", continent: 'Oceania'},
      'pr': {country: "Puerto Rico", continent: 'North America'},
      'ps': {country: "Palestine", continent: 'Asia'},
      'pt': {country: "Portugal", continent: 'Europe'},
      'pw': {country: "Palau", continent: 'Oceania'},
      'py': {country: "Paraguay", continent: 'South America'},
      'qa': {country: "Qatar", continent: 'Asia'},
      're': {country: "Réunion", continent: 'Africa'},
      'ro': {country: "Romania", continent: 'Europe'},
      'rs': {country: "Serbia", continent: 'Europe'},
      'ru': {country: "Russia (Russian Federation)", continent: 'Europe'},
      'rw': {country: "Rwanda", continent: 'Africa'},
      'sa': {country: "Saudi Arabia", continent: 'Asia'},
      'sb': {country: "Solomon Islands", continent: 'Oceania'},
      'sc': {country: "Seychelles", continent: 'Africa'},
      'sd': {country: "Sudan", continent: 'Africa'},
      'se': {country: "Sweden", continent: 'Europe'},
      'sg': {country: "Singapore", continent: 'Asia'},
      'sh': {country: "Saint Helena", continent: 'Africa'},
      'si': {country: "Slovenia", continent: 'Europe'},
      'sj': {country: "Svalbard and Jan Mayen", continent: 'Europe'},
      'sk': {country: "Slovakia", continent: 'Europe'},
      'sl': {country: "Sierra Leone", continent: 'Africa'},
      'sm': {country: "San Marino", continent: 'Europe'},
      'sn': {country: "Senegal", continent: 'Africa'},
      'so': {country: "Somalia", continent: 'Africa'},
      'sr': {country: "Suriname", continent: 'South America'},
      'ss': {country: "South Sudan", continent: 'Africa'},
      'st': {country: "São Tomé and Príncipe", continent: 'Africa'},
      'sv': {country: "El Salvador", continent: 'North America'},
      'sx': {country: "Sint Maarten (Dutch part)", continent: 'North America'},
      'sy': {country: "Syria", continent: 'Asia'},
      'sz': {country: "Eswatini", continent: 'Africa'},
      'tc': {country: "Turks and Caicos Islands", continent: 'North America'},
      'td': {country: "Chad", continent: 'Africa'},
      'tf': {country: "French Southern Territories", continent: 'Antarctica'},
      'tg': {country: "Togo", continent: 'Africa'},
      'th': {country: "Thailand", continent: 'Asia'},
      'tj': {country: "Tajikistan", continent: 'Asia'},
      'tk': {country: "Tokelau", continent: 'Oceania'},
      'tl': {country: "Democratic Republic of Timor-Leste", continent: 'Oceania'},
      'tm': {country: "Turkmenistan", continent: 'Asia'},
      'tn': {country: "Tunisia", continent: 'Africa'},
      'to': {country: "Tonga", continent: 'Oceania'},
      'tr': {country: "Türkiye", continent: 'Asia'},
      'tt': {country: "Trinidad and Tobago", continent: 'North America'},
      'tv': {country: "Tuvalu", continent: 'Oceania'},
      'tw': {country: "Taiwan", continent: 'Asia'},
      'tz': {country: "Tanzania", continent: 'Africa'},
      'ua': {country: "Ukraine", continent: 'Europe'},
      'ug': {country: "Uganda", continent: 'Africa'},
      'um': {country: "U.S. Minor Outlying Islands", continent: 'Oceania'},
      'us': {country: "United States of America", continent: 'North America'},
      'uy': {country: "Uruguay", continent: 'South America'},
      'uz': {country: "Uzbekistan", continent: 'Asia'},
      'va': {country: "Vatican City", continent: 'Europe'},
      'vc': {country: "Saint Vincent and the Grenadines", continent: 'North America'},
      've': {country: "Venezuela", continent: 'South America'},
      'vg': {country: "British Virgin Islands", continent: 'North America'},
      'vi': {country: "U.S. Virgin Islands", continent: 'North America'},
      'vn': {country: "Vietnam", continent: 'Asia'},
      'vu': {country: "Vanuatu", continent: 'Oceania'},
      'wf': {country: "Wallis and Futuna", continent: 'Oceania'},
      'ws': {country: "Samoa", continent: 'Oceania'},
      'xk': {country: "Kosovo", continent: 'Europe'},
      'ye': {country: "Yemen", continent: 'Asia'},
      'yt': {country: "Mayotte", continent: 'Africa'},
      'za': {country: "South Africa", continent: 'Africa'},
      'zm': {country: "Zambia", continent: 'Africa'},
      'zw': {country: "Zimbabwe", continent: 'Africa'},

      // ----- special
      'un': {country: 'United Nations', continent: ''},
      'zz': {country: chrome.i18n.getMessage('unknown'), continent: ''},
      'cache': {country: chrome.i18n.getMessage('cache'), continent: 'Mozilla'},
      'firefox': {country: chrome.i18n.getMessage('internal'), continent: 'Mozilla'},
      'private': {country: chrome.i18n.getMessage('private'), continent: ''},
      'unknown': {country: chrome.i18n.getMessage('unknown'), continent: ''}
    };

    return countryCode[cc] || countryCode['unknown'];
  }
}