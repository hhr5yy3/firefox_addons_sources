var CORS = true;
var CHROME = navigator.userAgent.indexOf('Chrome') > -1;
var FF = navigator.userAgent.indexOf('Firefox') > -1; 
var EDGE = navigator.userAgent.indexOf('Edg') > -1;
var SAFARI = navigator.userAgent.indexOf("Safari") > -1 && !CHROME;
var PLATFORM = FF ? "FIREFOX BUTTON" : EDGE ? "EDGE BUTTON" : SAFARI ? "SAFARI BUTTON" : "CHROME BUTTON";
var CURRENT_API_VERSION = "";
var SHARED_TASKS_VERSION_SUPPORT = 4;
var IS_ANDROID = false;
var IS_WEB = false;
var IS_DESKTOP = false;
var SEND_ERROR_LOGS = false;
var CACHE_ON = true;
var extension = dType = "json";
var API_VERSION = "api/v4/";
var NON_CORS_API_VERSION = "v4/";
var TIMEOUT_TIME = 60000; //11000
var AJAX_TIMEOUT = 1000 * 120;

var CURRENT_API_VERSION = "";
var SHARED_TASKS_VERSION_SUPPORT = 4;

if (!CORS) {
  extension = dType = "jsonp";
  API_VERSION = "v3/";
}

var SPEED = 1;

var STAGE = "DEV";

if(DOMAIN == "https://app.trackingtime.co/" || DOMAIN == "https://api.trackingtime.co/"){
	STAGE = "PROD";
}else if(DOMAIN == "https://qa.trackingtime.co/" || DOMAIN == "https://staging.trackingtime.co/" ){
	STAGE = "QA";
}else{
	STAGE = "DEV";
}


APP_VERSION += " ";

if (DEBUG_MODE) {
  var SYNC_TIME = 1000 * 60 * 1;
  var CHECK_EXTERNAL_UPDATES = 1000 * 60 * 1;
  var SYNC_CHRON = 1000 * 60 * 4;
  var UPDATE_CHRON = 1000 * 60 * 10;
  var LOCAL_STORAGE_CACHE_DURATION = 1;
  var LOCAL_STORAGE_CACHE_DURATION_SHORT = 0.5;
  var LOCAL_STORAGE_CACHE_DURATION_LONG = 0.5;
  var LOCAL_STORAGE_CACHE_DURATION_VERY_LONG = 24;
} else {
  var SYNC_TIME = 1000 * 60 * 2;
  var CHECK_EXTERNAL_UPDATES = 1000 * 60 * 1;
  var SYNC_CHRON = 1000 * 60 * 5;
  var UPDATE_CHRON = 1000 * 60 * 60;
  var LOCAL_STORAGE_CACHE_DURATION = 0.2; //0.5;
  var LOCAL_STORAGE_CACHE_DURATION_SHORT = 0.05; //0.07;
  var LOCAL_STORAGE_CACHE_DURATION_LONG = 0.2;
  var LOCAL_STORAGE_CACHE_DURATION_VERY_LONG = 24;
  console = console || {};
  console.log = function() {};
}

var colors = {
  red: "#F7464A",
  blue: "#039BE5",
  green: "#00d6b9",
  white_transparent: "rgba(255,255,255,0.6)",
  transparent: "transparent",
  white: "#FFF",
  light_grey: "#B7BFBF"
};

var NEW_USERS_STARTS_ON = 290000;

var USER_NOTIFICATIONS = {
	"not_tracking": true,
	"not_tracking_interval": 60,
	"when_tracking": false,
	"when_tracking_interval": 60,
	"mon": {"from": "09:00", "to": "17:00"},
	"tue": {"from": "09:00", "to": "17:00"},
	"wed": {"from": "09:00", "to": "17:00"},
	"thu": {"from": "09:00", "to": "17:00"},
	"fri": {"from": "09:00", "to": "17:00"},
	"sat": null,
	"sun": null
};

var NEW_USER_NOTIFICATIONS = {
	"not_tracking": true,
	"not_tracking_interval": 30,
	"when_tracking": true,
	"when_tracking_interval": 30,
	"mon": {"from": "09:00", "to": "17:00"},
	"tue": {"from": "09:00", "to": "17:00"},
	"wed": {"from": "09:00", "to": "17:00"},
	"thu": {"from": "09:00", "to": "17:00"},
	"fri": {"from": "09:00", "to": "17:00"},
	"sat": null,
	"sun": null
};
