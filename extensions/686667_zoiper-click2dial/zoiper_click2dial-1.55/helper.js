'use strict';

const DEFAULT_OPTIONS = {
  exceptions: [],
  displayLogo: true,
  displayRegionFlag: true,
  defaultRegion: '',
};
const BRANDING_SCHEME = 'zoiper:';
const BRANDING_NAME = 'Zoiper Click2Dial';
const BRANDING_PHONE_NAME = 'Zoiper';
const ICON_PHONE_DETECTION_ACTIVE = 'images/phone_detection_active.png';
const ICON_PHONE_DETECTION_INACTIVE = 'images/phone_detection_inactive.png';

function canInjectCode(url) {
  try {
    return ['file:', 'http:', 'https:'].includes(new URL(url).protocol);
  } catch (ex) {
    return false;
  }
}

function getOptions(callback) {
  chrome.storage.local.get(DEFAULT_OPTIONS, (result) => {
    callback(result);
  });
}

function matchesPattern(url, matchPattern) {
  return matchPatternToRegExp(matchPattern).test(url);
}

function matchesAnyPattern(url, matchPatterns) {
  return matchPatterns.some(matchPattern => matchesPattern(url, matchPattern));
}

function getMatchingPatterns(url, matchPatterns) {
  return matchPatterns.filter(matchPattern => matchesPattern(url, matchPattern));
}
