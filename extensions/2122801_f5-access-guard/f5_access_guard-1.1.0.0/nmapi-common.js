'use strict';

const MIN_ALLOWED_INTERVAL = 10000; // 10 seconds
var port = null;

function getRuntimeError() {
  if (chrome.runtime.lastError) {
    return chrome.runtime.lastError.message;
  }
  return "";
}

function processNativeMsgResponse(message)
{
  if (!message) {
    console.log("error: " + getRuntimeError());
    if (typeof errors === "object") {
      errors[EXTENSION_ERROR] = BROWSER_EXT_ERRORS.CANNOT_CONNECT_NM_HOST;
    }
    return;
  }
  delete errors[EXTENSION_ERROR];
  commonUtilities.logConsoleMessage("Received: " + JSON.stringify(message));
  if (typeof message.servers === "string") {
    // empty string is valid and needs to be processed
    handleServers(message.servers);
  }
  if (message.version) {
    handleVersion(message.version);
  }
  if (message.health) {
    handleSystemHealth(message.health);
  }
  if (message.queryInterval) {
    handleQueryIntervalParam(message.queryInterval);
  }
  if (message.logLevel) {
    handleLogLevelParam(message.logLevel);
  }
  if (message.error) {
    handleNativeMsgError(message.error);
  } else {
    delete errors[NATIVE_MSG_ERROR];
  }
}

function handleQueryIntervalParam(queryInterval) {
    try {
      let interval = parseInt(queryInterval);
      if (!Number.isInteger(interval)) {
        return;
      }
      if (interval < MIN_ALLOWED_INTERVAL) {
        interval = MIN_ALLOWED_INTERVAL;
      }
      if (devicePostureQueryInterval !== interval) {
        devicePostureQueryInterval = interval;
        clearInterval(devicePostureTimerId);
        devicePostureTimerId = setInterval(
          getDevicePosture,
          devicePostureQueryInterval);
      }
    } catch (e) {
        commonUtilities.logTraceMessage("Error: " + e.name + ", " + e.message);
    }
}

function handleLogLevelParam(logLevel) {
  let level = parseInt(logLevel);
  if (Number.isInteger(level)) {
    extLogLevel = level;
  }
}

function handleServers(servers) {
  try {
    if (!Array.isArray(filters.urls)) {
      return;
    }
    let serverArray = [];
    if(servers !== "") {
      serverArray = servers.split(",");
    }
    serverArray.sort();
    if (!commonUtilities.isEqualArrays(serverArray, filters.urls)) {
      filters.urls = serverArray;
      removeOnBeforeSendHeadersListener();
      removeOnResponseStartedListener();
      if(filters.urls.length !== 0) {
        addOnBeforeSendHeadersListener();
        addOnResponseStartedListener();
      }
    }
  } catch (e) {
      commonUtilities.logTraceMessage("Error: " + e.name + ", " + e.message);
  }
}

function handleVersion(nmVersion) {
  if (!nmVersion || (typeof version === "undefined")) {
    return;
  }
  version = nmVersion;
}

function handleSystemHealth(systemHealth) {
  if (!systemHealth ||
    (typeof health === "undefined")) {
    return;
  }
  health = systemHealth;
}

function handleNativeMsgError(error) {
  if ((typeof error !== "object") ||
      (typeof error.code === "undefined") ||
      (typeof error.description === "undefined")) {
    return;
  }
  try {
    errors[NATIVE_MSG_ERROR] = error;
  } catch (e) {
      commonUtilities.logTraceMessage("Error: " + e.name + ", " + e.message);
  }
}

function onDisconnected() {
    // Query current active window
    commonUtilities.logConsoleMessage(NATIVE_MESSAGING_HOST + " exited");
}

function disconnect() {
  if (!port ||
      typeof port === "undefined") {
      return;
  }
  port.disconnect();
  port = null;
}

function addListenersForNativeMessage()
{
  try {
    port.onMessage.addListener(onNativeMessage);
    port.onDisconnect.addListener(onDisconnected);
  } catch (e) {
    commonUtilities.logTraceMessage("Error: " + e.name + ", " + e.message);
  }
}

function connect() {
  port = chrome.runtime.connectNative(NATIVE_MESSAGING_HOST);
  addListenersForNativeMessage();
}

function getDevicePosture() {
  if (typeof CONNECTION_ORIENTED !== "boolean") {
    return;
  }
  if (CONNECTION_ORIENTED) {
    connect();
  } else {
    chrome.runtime.sendNativeMessage(
      NATIVE_MESSAGING_HOST,
      { request: "all" },
      onNativeMessage
    );
  }
}

