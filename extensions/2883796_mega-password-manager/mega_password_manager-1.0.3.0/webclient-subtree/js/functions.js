function makeid(len) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < len; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

/**
 * Checks if the email address is valid using the inbuilt HTML5
 * validation method suggested at https://stackoverflow.com/a/13975255
 * @param {String} email The email address to validate
 * @returns {Boolean} Returns true if email is valid, false if email is invalid
 */
function isValidEmail(email) {

    'use strict';
    // reference to html spec https://html.spec.whatwg.org/multipage/input.html#e-mail-state-(type=email)
    // with one modification, that the standard allows emails like khaled@mega
    // which is possible in local environment/networks but not in WWW.
    // so I applied + instead of * at the end
    var regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    return regex.test(email);
}

/**
 * Assert a given test condition.
 *
 * Throws an AssertionFailed exception with a given message, in case the condition is false.
 * The message is assembled by the args following 'test', similar to console.log()
 *
 * @param test
 *     Test statement.
 * @param args
 */
// eslint-disable-next-line strict
function assert(test, ...args) {
    if (!test) {
        if (d) {
            console.error('assertion failed', ...args);
        }
        MegaLogger.rootLogger.assert(test, ...args);
    }
}

/**
 * JS Implementation of MurmurHash3 (r136) (as of May 20, 2011)
 *
 * @author <a href="mailto:gary.court.gmail.com">Gary Court</a>
 * @see http://github.com/garycourt/murmurhash-js
 * @author <a href="mailto:aappleby.gmail.com">Austin Appleby</a>
 * @see http://sites.google.com/site/murmurhash/
 *
 * @param {string} key ASCII only
 * @param {number} seed Positive integer only
 * @return {number} 32-bit positive integer hash
 */
function MurmurHash3(key, seed) {
    var remainder, bytes, h1, h1b, c1, c1b, c2, c2b, k1, i;

    remainder = key.length & 3; // key.length % 4
    bytes = key.length - remainder;
    h1 = seed || 0xe6546b64;
    c1 = 0xcc9e2d51;
    c2 = 0x1b873593;
    i = 0;

    while (i < bytes) {
        k1 =
            ((key.charCodeAt(i) & 0xff)) |
            ((key.charCodeAt(++i) & 0xff) << 8) |
            ((key.charCodeAt(++i) & 0xff) << 16) |
            ((key.charCodeAt(++i) & 0xff) << 24);
        ++i;

        k1 = ((((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16))) & 0xffffffff;
        k1 = (k1 << 15) | (k1 >>> 17);
        k1 = ((((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16))) & 0xffffffff;

        h1 ^= k1;
        h1 = (h1 << 13) | (h1 >>> 19);
        h1b = ((((h1 & 0xffff) * 5) + ((((h1 >>> 16) * 5) & 0xffff) << 16))) & 0xffffffff;
        h1 = (((h1b & 0xffff) + 0x6b64) + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16));
    }

    k1 = 0;

    switch (remainder) {
        case 3:
            k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
        case 2:
            k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
        case 1:
            k1 ^= (key.charCodeAt(i) & 0xff);

            k1 = (((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff;
            k1 = (k1 << 15) | (k1 >>> 17);
            k1 = (((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff;
            h1 ^= k1;
    }

    h1 ^= key.length;

    h1 ^= h1 >>> 16;
    h1 = (((h1 & 0xffff) * 0x85ebca6b) + ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) & 0xffffffff;
    h1 ^= h1 >>> 13;
    h1 = ((((h1 & 0xffff) * 0xc2b2ae35) + ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16))) & 0xffffffff;
    h1 ^= h1 >>> 16;

    return h1 >>> 0;
}

/**
 * Classifies the strength of the password (Mainly used on the MegaInputs)
 * ZXCVBN library need to be inited before executing this function.
 * The minimum allowed strength is 8 characters in length and password score of 1 (weak).
 * @param {String} password The user's password (should be trimmed for whitespace beforehand)
 * @returns {Object|false} Object with values for password strength or false if length is 0
 */
function classifyPassword(password) {
    'use strict';

    if (typeof zxcvbn !== 'function') {
        onIdle(() => {
            throw new Error('zxcvbn init fault');
        });
        console.error('zxcvbn is not inited');
        return false;
    }

    const passwordLength = password.length;
    if (passwordLength === 0) {
        return false;
    }

    let passwordScore = 0;

    if (passwordLength < 32) {
        passwordScore = zxcvbn(password).score;
    }
    else {
        passwordScore = zxcvbn(password.slice(0, 32)).score;

        if (passwordScore < 4) {
            passwordScore = zxcvbn(password).score;
        }
    }

    // Calculate the password score using the ZXCVBN library and its length

    if (passwordScore === 3 || passwordScore === 4) {
        return {
            string1: l.password_strength_strong,
            string2: l[1123],
            className: 'strong',                     // Strong
            icon: 'strength-icon sprite-pm-ext-mono icon-check-circle-thin-outline'
        };
    }
    else if (passwordScore === 2) {
        return {
            string1: l.password_strength_moderate,
            string2: l[1122],
            className: 'moderate',                     // Moderate
            icon: 'strength-icon sprite-pm-ext-mono icon-alert-circle-thin-outline'
        };
    }

    return {
        string1: l.password_strength_weak,
        string2: l[1120],
        className: 'weak',                     // Weak
        icon: 'strength-icon sprite-pm-ext-mono icon-alert-triangle-thin-outline'
    };

}

/**
 * Sanitise filename so that saving to local disk won't cause any issue...
 * @param {String} name - The filename
 * @returns {String} - The safe filename
 */
function getSafeName(name) {
    "use strict";

    // http://msdn.microsoft.com/en-us/library/aa365247(VS.85)
    name = `${name}`.replace(/["*/:<>?\\|]+/g, '.');

    if (name.length > 250) {
        name = `${name.substr(0, 250)}.${name.split('.').pop()}`;
    }
    name = name.replace(/[\t\n\v\f\r]+/g, ' ');
    name = name.replace(/[\u200E\u200F\u202E]/g, '');

    var end = name.lastIndexOf('.');
    end = ~end && end || name.length;
    if (/^(?:CON|PRN|AUX|NUL|COM\d|LPT\d)$/i.test(name.substr(0, end))) {
        name = `!${name}`;
    }
    return name;
}

function getDeduplicateName(passwordTitle) {
    "use strict";

    const existingNames = new Set(Object.keys(M.c[pwmh] || {}).map(key => M.d[key].name));
    Object.keys(M.ciInflight[pwmh] || {}).forEach(name => existingNames.add(name));
    let newName = passwordTitle;
    const match = newName.match(/\((\d+)\)$/);
    const baseName = match ? newName.replace(/\(\d+\)$/, '').trim() : newName;
    let counter = match ? parseInt(match[1], 10) : 1;

    while (existingNames.has(newName)) {
        newName = `${baseName} (${counter})`;
        counter++;
    }

    return newName;
}
