'use strict';

var version = "";
var health = "";
var filters = {
  urls: []
};

var devicePostureQueryInterval = 60000; // 1 minute
var devicePostureTimerId = 0;

const NATIVE_MESSAGING_HOST = "com.f5.accessguard";

// add new errors to BROWSER_EXT_ERRORS
const BROWSER_EXT_ERRORS = {
  CANNOT_CONNECT_NM_HOST: {
    code: 301,
    description: "Cannot connect to Native Messaging Host."
  },
  CANNOT_PARSE_INFORMATION: {
    code: 302,
    description: "Information parsing error."
  },
  UNKNOWN_EXCEPTION: {
    code: 303,
    description: "Unknown exception occurred."
  }
};

var CONNECTION_ORIENTED = false;
const NATIVE_MSG_ERROR = "nativeMsgError";
const EXTENSION_ERROR = "extensionError";
var errors = {};

const LOGLEVEL = {
  TRACE: 0,
  INFO: 1
}
var extLogLevel = LOGLEVEL.INFO;
