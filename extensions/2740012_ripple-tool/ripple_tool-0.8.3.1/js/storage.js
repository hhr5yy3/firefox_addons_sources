const USER_ID_KEY = "userid";
const SLEEP_EXPIRATION_KEY = "RippleSleep";
const TRIGGERS_KEY = "triggers";
const TRIGGERS_EXPIRATION_KEY = "triggersExpiration"

/**
 * Remove the sleep expiration from local storage
 **/
export const clearSleepExpiration = () => chrome.storage.local.remove(SLEEP_EXPIRATION_KEY);

/**
 * Generate a randomly generated token
 **/
const generateRandomToken = () => {
  let randomPool = new Uint8Array(32);
  let hex = '';

  crypto.getRandomValues(randomPool);

  for (let i = 0; i < randomPool.length; ++i) {
    hex += randomPool[i].toString(16);
  }

  return hex;
}

/**
 * Load the "user id" from local storage. If one cannot
 * be found, it will initialise a new one for future
 * usage
 **/
export const loadUserId = (cb) => {
  chrome.storage.sync.get(USER_ID_KEY, items => {
    if (items.userid) {
      cb(items.userid);
    } else {
      const newUserId = generateRandomToken();
      chrome.storage.sync.set({ userid: newUserId }, () => cb(newUserId));
    }
  });
}

/**
 * Refreshes the locally storage trigger words by
 * fetching a new copy from the server if the
 * existing copy is deemed to have expired.
 **/
export const refreshTriggers = async () => {
  const expiration = localStorage.getItem(TRIGGERS_EXPIRATION_KEY);
  if (expiration === null || new Date(expiration) < new Date()) {
    // Expired, so lets refresh
    localStorage.removeItem(TRIGGERS_KEY);
    localStorage.removeItem(TRIGGERS_EXPIRATION_KEY);

    const cmsBaseUrl = window._RIPPLE_CMS_URL;
    const triggersUrl = `${cmsBaseUrl}/extension_triggers_with_regex`;
    const response = await fetch(triggersUrl);
    const responseJson = await response.json();
    // New expiration date will be tomorrow
    const newExpiration = new Date();
    newExpiration.setDate(newExpiration.getDate() + 1);

    let triggers = {};
    responseJson.forEach(trigger => {
      if (triggers[trigger.trigger]) {
        triggers[trigger.trigger].push(trigger.locale);
      } else {
        triggers[trigger.trigger] = [trigger.locale]
      }
    });

    localStorage.setItem(TRIGGERS_KEY, JSON.stringify(triggers));
    localStorage.setItem(TRIGGERS_EXPIRATION_KEY, newExpiration); 
  }
}

export const getTriggers = () => {
  return JSON.parse(localStorage.getItem(TRIGGERS_KEY));
}
