import escapeStringRegexp from './regex-join-escape-string-regexp.js';

function regexJoinWithSeparator(separator, expressions) {
    const flags = [];
    const source = [];
    for (const part of expressions) {
        if (part instanceof RegExp) {
            source.push(part.source);
            flags.push(...part.flags);
        }
        else {
            source.push(escapeStringRegexp(part));
        }
    }
    return new RegExp(source.join(separator), [...new Set(flags)].join(''));
}

export { regexJoinWithSeparator };
