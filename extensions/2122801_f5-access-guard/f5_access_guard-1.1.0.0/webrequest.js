'use strict';

const F5_CLIENT_INFO_METADATA               =   "F5-Client-Information-Metadata";
const F5_CLIENT_INFORMATION                 =   "F5-Client-Information";
const F5_CLIENT_INFORMATION_RESPONSE        =   "F5-Client-Information-Response";
const F5_SERVER_RESPONSE_KEY                =   "validity";
const F5_SERVER_RESPONSE_ACCEPTED_POSTURE   =   "1";
const F5_SERVER_RESPONSE_ERROR              =   "server.error.code";
const F5_SERVER_RESPONSE_ERROR_DESCRIPTION  =   "server.error.description";

function isAnyErrorsPresent() {
  // check if there are any errors from the browser extension
  // or native messaging host
  if (typeof errors !== "object") {
    return false;
  }
  if (errors[NATIVE_MSG_ERROR] &&
    errors[NATIVE_MSG_ERROR].code &&
    errors[NATIVE_MSG_ERROR].description) {
    return true;
  }

  if (errors[EXTENSION_ERROR] &&
    errors[EXTENSION_ERROR].code &&
    errors[EXTENSION_ERROR].description) {
    return true;
  }
  return false;
}

function getMetaDataInformation() {
  // get the version of the browser extension
  let extensionVersion = commonUtilities.getVersion();
  let clientInfoMetaData = "";
  if(extensionVersion.length !== 0) {
    clientInfoMetaData = "extension.version=" + extensionVersion;
  }

  if(typeof version === "string") {
    clientInfoMetaData += "&protocol.version=" + version;
  }
  // check if there are any errors from the browser extension
  // or native messaging host
  if (typeof errors !== "object") {
    return clientInfoMetaData;
  }
  if (errors[NATIVE_MSG_ERROR] &&
      errors[NATIVE_MSG_ERROR].code &&
      errors[NATIVE_MSG_ERROR].description) {
    clientInfoMetaData += "&host.error.code=" + errors[NATIVE_MSG_ERROR].code;
    clientInfoMetaData += "&host.error.description=" + errors[NATIVE_MSG_ERROR].description;
  }

  if (errors[EXTENSION_ERROR] &&
      errors[EXTENSION_ERROR].code &&
      errors[EXTENSION_ERROR].description) {
    clientInfoMetaData += "&extension.error.code=" + errors[EXTENSION_ERROR].code;
    clientInfoMetaData += "&extension.error.description=" + encodeURI(errors[EXTENSION_ERROR].description);
  }
  return clientInfoMetaData;
}

function onBeforeSendHeadersCallback(details) {
  if (!details || !details.requestHeaders) {
    return;
  }
  try {
    const url = new URL(details.url);
    // Send F5_CLIENT_INFO_METADATA header if there are any errors
    if (isAnyErrorsPresent()) {
      // Edge browser does not send F5_CLIENT_INFO_METADATA (and hence subsequent headers)
      // if value from getMetaDataInformation is "".
      const clientInfoMetaDataHeader = getMetaDataInformation();
      if (clientInfoMetaDataHeader.length > 0) {
        commonUtilities.logTraceMessage("Sending metadata information " +
                                        clientInfoMetaDataHeader +
                                        " to " +
                                        details.url +
                                        " for request ID " +
                                        details.requestId);
        details.requestHeaders.push({ name: F5_CLIENT_INFO_METADATA, value: clientInfoMetaDataHeader });
      }
      return { requestHeaders: details.requestHeaders };
    }

    let clientInfoStatusTrackerInstance = clientInfoStatusTracker.getInstance();
    if(!clientInfoStatusTrackerInstance.shouldSendClientInformationHeader(url.hostname, health)) {
      commonUtilities.logTraceMessage("No need to send health to " +
                                      details.url +
                                      " for request ID " +
                                      details.requestId);
      return { requestHeaders: details.requestHeaders };
    }

    if(health.length > 0) {
      commonUtilities.logTraceMessage("Sending health information to " +
                                      details.url +
                                      " for request ID " +
                                      details.requestId);
      details.requestHeaders.push({ name: F5_CLIENT_INFORMATION, value: health });
      clientInfoStatusTrackerInstance.setHealthDataForHostname(url.hostname, health);
    } else {
      commonUtilities.logTraceMessage("health data is empty. Client info header not sent to " +
                                      details.url +
                                      " for request ID " +
                                      details.requestId);
    }
  } catch (e) {
    commonUtilities.logTraceMessage("Error: " + e.name + ", " + e.message);
  }
  return { requestHeaders: details.requestHeaders };
}

function addOnBeforeSendHeadersListener() {
  try {
    // TODO : Validate the filters
    chrome.webRequest.onBeforeSendHeaders.addListener(
      onBeforeSendHeadersCallback,
      // filters
      filters,
      // extraInfoSpec
      ["blocking", "requestHeaders"]
    );
  } catch (e) {
    commonUtilities.logTraceMessage("Error: " + e.name + ", " + e.message);
  }
}

function removeOnBeforeSendHeadersListener() {
  chrome.webRequest.onBeforeSendHeaders.removeListener(onBeforeSendHeadersCallback);
}

function onResponseStartedCallback(details) {
  let hostname = "";
  let clientInfoStatusTrackerInstance = clientInfoStatusTracker.getInstance();
  try {
    hostname = new URL(details.url).hostname;
    // Find F5-Client-Information-Response header from all the response headers
    let serverResponseHeader = null;
    for (let i = 0; i < details.responseHeaders.length; ++i) {
      if (details.responseHeaders[i].name === F5_CLIENT_INFORMATION_RESPONSE) {
        serverResponseHeader = details.responseHeaders[i];
        break;
      }
    }
    if (serverResponseHeader) {
      commonUtilities.logTraceMessage("Received response " +
                                        serverResponseHeader.value +
                                        ", status code " +
                                        details.statusCode +
                                        " from " +
                                        details.url +
                                        " for request ID " +
                                        details.requestId);
      // Split the string into an object of name value pairs
      let nameValueMap = commonUtilities.toNameValuePairObject(serverResponseHeader.value, "&", "=");
      if (nameValueMap[F5_SERVER_RESPONSE_KEY] === F5_SERVER_RESPONSE_ACCEPTED_POSTURE) {
        // set that we received validity=1 from server for hostname
        clientInfoStatusTrackerInstance.setValidityForHostname(hostname, true);
        return;
      }
    }
  } catch (e) {
    commonUtilities.logTraceMessage("Error: " + e.name + ", " + e.message);
  }
  clientInfoStatusTrackerInstance.setValidityForHostname(hostname, false);
}

function removeOnResponseStartedListener() {
  chrome.webRequest.onResponseStarted.removeListener(onResponseStartedCallback);
}

function addOnResponseStartedListener() {
  try {
    chrome.webRequest.onResponseStarted.addListener(onResponseStartedCallback,
      filters,
      ['responseHeaders']);
  } catch (e) {
    commonUtilities.logTraceMessage("Error: " + e.name + ", " + e.message);
  }
}
