globalThis.chrome = globalThis.browser;

import Options from '../store/options.js';
import { addListener } from '../utils/options-observer.js';
import store from '../npm/hybrids/src/store.js';

const PAUSED_ALARM_PREFIX = "options:revoke";
addListener("paused", async (paused, prevPaused) => {
  const alarms = (await chrome.alarms.getAll()).filter(
    ({ name }) => name.startsWith(PAUSED_ALARM_PREFIX)
  );
  const revokeHostnames = Object.entries(paused).filter(
    ([, { revokeAt }]) => revokeAt
  );
  alarms.forEach(({ name }) => {
    if (!revokeHostnames.find(([id]) => name === `${PAUSED_ALARM_PREFIX}:${id}`)) {
      chrome.alarms.clear(name);
    }
  });
  if (revokeHostnames.length) {
    revokeHostnames.filter(([id]) => !alarms.some(({ name }) => name === id)).forEach(([id, { revokeAt }]) => {
      chrome.alarms.create(`${PAUSED_ALARM_PREFIX}:${id}`, {
        when: revokeAt
      });
    });
  }
});
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name.startsWith(PAUSED_ALARM_PREFIX)) {
    const id = alarm.name.slice(PAUSED_ALARM_PREFIX.length + 1);
    store.set(Options, { paused: { [id]: null } });
  }
});
