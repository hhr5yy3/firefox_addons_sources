// MARK: - Specify Browser

var browser = browser || chrome;

// MARK: - System Design Methods

function queryById(name) {
  return document.getElementById(name);
}

function querySelector(selector) {
  return document.querySelector(selector);
}

function querySelectorAll(selector) {
  return document.querySelectorAll(selector);
}

function isUserAgentMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

function getSecondsFromMinutes(seconds) {
  const SECONDS_IN_MINUTE = 60;

  return Number(seconds * SECONDS_IN_MINUTE);
}
