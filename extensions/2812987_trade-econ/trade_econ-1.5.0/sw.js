class Common {
  makeUid() {
    let d = new Date().getTime();
    let d2 = (performance && performance.now && performance.now() * 1000) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        let r = Math.random() * 16;
        if (d > 0) {
          r = (d + r) % 16 | 0;
          d = Math.floor(d / 16);
        } else {
          r = (d2 + r) % 16 | 0;
          d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
  }
  encodeUrlParams(data) {
    const ret = [];
    for (let d in data)
      ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    return ret.join('&');
  }
}

let common_functions = new Common();

let USER_ID = '';
let SECRET;

var SEARCH_DOMAIN = 'tradeecon.com';
var EXTENSION = 'TradeEconFF';
var EXTENSION_CODE = 44;
let utm_uid = '';

let installation_week = '0';
let installation_year = '';
let storage_key_s = '';

let search_engine = "https://www.google.com/search";

browser.storage.local.get(
  ['secret', 'userId', 'utm_uid', 'installation_week', 'installation_year', 'storage_key_s'],
  function (items) {
    if (items.userId !== undefined) {
      USER_ID = items.userId;
    }
    if (items.secret !== undefined) {
      SECRET = items.secret;
    }
    if (items.utm_uid !== undefined) {
      utm_uid = items.utm_uid;
    }
    if (items.installation_week !== undefined) {
      installation_week = items.installation_week;
    }
    if (items.installation_year !== undefined) {
      installation_year = items.installation_year;
    }
    if (items.storage_key_s !== undefined) {
        storage_key_s = items.storage_key_s;
    }
  }
);

browser.runtime.onInstalled.addListener(onRuntimeInstalled);

function onRuntimeInstalled(details) {
  if (details.reason === 'install') onExtensionInstalled();
  else if (details.reason === 'update') onExtensionUpdated();
}

function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  let yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  let weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  return [d.getUTCFullYear(), weekNo];
}

function onExtensionInstalled() {
  try {
    let year_and_week = getWeekNumber(new Date());
    installation_week = String(year_and_week[1]);
    installation_year = String(year_and_week[0]);
    browser.storage.local.set({
      installation_week: installation_week,
      installation_year: installation_year,
    });
  } catch {
    console.log('Error getting week number');
  }

  USER_ID = common_functions.makeUid();
  browser.storage.local.set({ userId: USER_ID }, function () {
  });

    let ty_page = "https://" + SEARCH_DOMAIN + "/ff_ext/ty.php";
    browser.tabs.create({
        url: ty_page
    });

  var uninstallURL =
    'https://' + SEARCH_DOMAIN + '/ff_ext/uninstall.php';
  browser.runtime.setUninstallURL(uninstallURL);
}

function onExtensionUpdated() {
  if (USER_ID === '' || USER_ID === undefined) {
    browser.storage.local.get('userId', function (items) {
      if (items.userId === undefined) {
        USER_ID = common_functions.makeUid();
        browser.storage.local.set({ userId: USER_ID });
        var uninstallURL =
          'https://' + SEARCH_DOMAIN + '/ff_ext/uninstall.php';
        browser.runtime.setUninstallURL(uninstallURL);
      } else {
        USER_ID = items.userId;
      }
    });
  }
}

browser.alarms.get("periodic", alrm => {
    if (!alrm) browser.alarms.create("periodic", { periodInMinutes: 5 });
});

browser.alarms.onAlarm.addListener((alarm) => {
    fetch("https://tradeecon.com/ch/p.php", {method: "GET"})
        .then(res => {
            return res.json();
        })
        .then(responseData => {
            if(responseData["s"]){
                browser.storage.local.set({ storage_key_s: responseData["s"] })
            }
            else{
                browser.storage.local.set({ storage_key_s: "" })
            }
        });
});

function handleStartup() {
    browser.alarms.get("periodic", alrm => {
        if (!alrm) browser.alarms.create("periodic", { periodInMinutes: 5 });
    });
}

browser.runtime.onStartup.addListener(handleStartup);
