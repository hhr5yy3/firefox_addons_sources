// THIS DATA is ALWAYS AVAILABLE
var STORE = {
  USER_ID: "",
  USERS: {},
  PROJECTS: {},
  TASKS: {},
  SERVICES: {},
  CUSTOMERS: {},
  CURRENT_EVENT: {},
  SYNC: [],
  LAST_TASK_TRACKED: ""
};
//var TRACKING_TASKS = []; //{event_id, task_id, start_time}
var USER_ID;
var USERS;
var PROJECTS;
var TRACKING_TASK = "";
var ONLINE = true;
var LOC;

var SET_DATE_FORMAT;
var SET_NUMBER_FORMAT;
var SET_TIME_FORMAT;
var SET_TIME_DISPLAY;