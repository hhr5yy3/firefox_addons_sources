const ALARM_KEY = 'distribution_metric_alarm';
const GUID_KEY = 'extensions.mailru.pult.guid';
const GENERATED_DATA_KEY = 'ru.mail.pult.ext_info';
const LAST_METRIC_DATE_KEY = 'extensions.mailru.pult.last_metric_date';
const BOOKMARK_QUERY = '//inline.go.mail.ru';
const BOOKMARK_EXPRESSION = /^https?:\/\/inline\.go\.mail\.ru\/?.*\?.*(inline_binded_data=([^&]+)).*$/i;

const getPref = (name) =>
  new Promise((resolve) =>
    chrome.storage.local.get(name, (res) => resolve(res[name]))
  );

const setPref = (name, value) =>
  new Promise((resolve) =>
    chrome.storage.local.set({ [name]: value }, resolve)
  );

const awaitBookmarks = () =>
  new Promise((resolve) => {
    const test = (item) => BOOKMARK_EXPRESSION.test(item.url);

    const addListener = (listener) =>
      chrome.bookmarks.onCreated.addListener(listener);

    const removeListener = (listener) =>
      chrome.bookmarks.onCreated.removeListener(listener);

    chrome.bookmarks.search({}, (results) => {
      if (results.find(test)) {
        return resolve();
      }

      const listener = (id, bookmark) => {
        if (test(bookmark)) {
          removeListener(listener);
          resolve();
        }
      };

      setTimeout(() => {
        removeListener(listener);
        resolve();
      }, 3000);

      addListener(listener);
    });
  });

const getBookmarkData = (query) =>
  new Promise((resolve) =>
    chrome.bookmarks.search(query, resolve)
  );

const generateGuid = () =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });

const getGuid = () =>
  getPref(GUID_KEY).then((guid) => {
    if (guid) {
      return guid;
    }
    const newGuid = generateGuid();
    return setPref(GUID_KEY, newGuid).then(() => newGuid);
  });

const getGoInstallData = () =>
  Promise.all([
    awaitBookmarks(),
    getBookmarkData({ query: BOOKMARK_QUERY }),
  ])
    .then((results) => {
      if (results[1].length === 0) {
        return null;
      }
      const bookmark = results[1].find((bookmark) => BOOKMARK_EXPRESSION.test(bookmark.url));
      if (!bookmark) {
        return null;
      }
      const queryString = BOOKMARK_EXPRESSION.exec(bookmark.url)[2] || null;
      if (!queryString) {
        return null;
      }
      return decodeURIComponent(queryString).split('&').reduce((acc, str) => {
        const pair = str.split('=');
        return Object.assign(acc, { [pair[0]]: decodeURIComponent(pair[1]) });
      }, {});
    });

const today = () => {
  const date = new Date();
  date.setUTCHours(0, 0, 0, 0);
  return date;
};

const tomorrow = () => {
  const date = today();
  date.setDate(date.getDate() + 1);
  return date;
};

const tomorrowWithRandomTime = () => {
  const date = tomorrow();
  date.setSeconds(Math.floor(Math.random() * 60 * 60 * 2));
  return date;
};

const shouldBeSent = (lastDate) =>
  !lastDate || today() > new Date(lastDate);

const scheduleNext = (when) => {
  console.log('@@@ Schedule metric at', when);
  chrome.alarms.create(ALARM_KEY, {
    when: when.getTime()
    //delayInMinutes: Math.floor(after / 1000 / 60)
  });
};

const sendMetric = (firstLaunch) =>
  getGoInstallData()
    .then((installData) => {
      if (!installData) {
        console.log('@@@ Does not have bookmark');
        return getPref(GENERATED_DATA_KEY).then((generatedData) => (generatedData ? {
          gp: generatedData.gp,
          psi: generatedData.psi || ''
        } : { gp: '', psi: '' }))
      }
      console.log('@@@ Has bookmark');
      return installData;
    })
    .then((installData) => {
      return getGuid()
        .then((guid) => ({
          guid: guid,
          installData: installData
        }))
    })
    .then((data) => {
      const pref_id = encodeURIComponent(`{${data.guid}}`);
      const pref_param = encodeURIComponent(JSON.stringify(data.installData));
      const ffpref_install = firstLaunch ? 1 : 0;

      console.log('@@@ Send metric', pref_id, pref_param, ffpref_install);

      return fetch(`http://mrds.mail.ru/update/2/version.txt?type=ffpult_pref&pref_id=${pref_id}&pref_param=${pref_param}&ffpref_install=${ffpref_install}`)
        .then(() => setPref(LAST_METRIC_DATE_KEY, today().toJSON()));
    });

const sendMetricAndScheduleNext = (firstLaunch) =>
  getPref(LAST_METRIC_DATE_KEY).then((lastMetricDate) => {
    const nextInterval = tomorrowWithRandomTime();//.getTime() - Date.now();
    if (shouldBeSent(lastMetricDate)) {
      console.log('@@@ Metric should be sent NOW');
      return sendMetric(firstLaunch)
        .then(() => scheduleNext(nextInterval));
    }
    console.log('@@@ Metric should be sent LATER');
    return scheduleNext(nextInterval);
  });

chrome.runtime.onInstalled.addListener((details) => {
  sendMetricAndScheduleNext(details.reason === 'install')
});

chrome.runtime.onStartup.addListener(() => {
  sendMetricAndScheduleNext(false)
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === ALARM_KEY) {
    sendMetric(false).then(() => scheduleNext(tomorrowWithRandomTime()));
  }
});