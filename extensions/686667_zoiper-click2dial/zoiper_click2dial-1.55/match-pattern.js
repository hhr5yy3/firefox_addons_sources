'use strict';

const MATCH_PATTERN_REGEXP = /^(\*|[^:]+):\/\/(|\*|[^/*]+|\*\.[^/*]+)(\/.*)$/;

function escapeSpecialChars(string) {
  return string.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*');
}

function parseMatchPattern(matchPattern) {
  const match = matchPattern.match(MATCH_PATTERN_REGEXP);

  if (match === null) throw new Error('Invalid match pattern');

  return {scheme: match[1], host: match[2], path: match[3]};
}

function isValidMatchPattern(matchPattern) {
  return MATCH_PATTERN_REGEXP.test(matchPattern);
}

function createMatchPatternRegExp({scheme = '*', host = '*', path = '/*'} = {}) {
  const schemeRegExp = escapeSpecialChars(scheme);
  const hostRegExp = escapeSpecialChars(host).replace(/^\.\*\\\./, '(?:[^@]+\\.)?');
  const pathRegExp = escapeSpecialChars(path);

  return new RegExp(`^${schemeRegExp}://(?:[^@]+@)?${hostRegExp}(?::\\d+)?${pathRegExp}$`);
}

function matchPatternToRegExp(matchPattern) {
  return createMatchPatternRegExp(parseMatchPattern(matchPattern));
}
