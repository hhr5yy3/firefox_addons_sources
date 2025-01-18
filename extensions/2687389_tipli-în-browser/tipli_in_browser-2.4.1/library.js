/*
 * Library of common units
 */

import { DomainMatchTypes } from "./types.js";

window.browser = window.browser || chrome;

export function getActiveTabOfCurrentWindow() {
  const options = { active: true, currentWindow: true };
  const handler = resolve => (tabs) => { resolve(tabs[0]) };
  return new Promise(resolve => {
    browser.tabs.query(options, handler(resolve));
  });
}

export function getTabById(id = 0) {
  const handler = resolve => (tab) => { resolve(tab) };
  return new Promise(resolve => {
    browser.tabs.get(id, handler(resolve));
  });
}

// Do we even need two way communication?
export async function sendContentMessage(message) {
  const tab = await getActiveTabOfCurrentWindow();
  return new Promise(resolve => {
    browser.tabs.sendMessage(tab.id, message, resolve);
  });
}

export function sendBackgroundMessage(type, payload, extensionId) {
  const empty = {}; // allow response destruction
  return new Promise(resolve => {
    const callback = response => resolve(response || empty);
    browser.runtime.sendMessage(extensionId, { type, payload }, callback);
  });
}

/**
 * The callback can be synchronous or like `async (message, sender) => `
 *  AND is supposed to respond with ResponseMessage
 *
 * @param {Function} callback
 */
export function listenToMessages(callback) {
  const listener = (message, sender, sendResponse) => {
    const response = callback(message, sender);

    if (response.then) { // async handler
      response.then(sendResponse)
      return true;
    }

    return sendResponse(response);
  }

  browser.runtime.onMessage.addListener(listener);
}

/**
 * No special URL schemas like chrome-extension:// shall pass
 *
 * @param {string} url
 */
export const isWebAddress = url => url && url.startsWith('http');


/**
 *
 * @param {Object} object
 */
export function notEmptyObject(object) {
  return object && Object.values(object).length > 0;
}


/**
 *
 * https://developer.browser.com/extensions/storage
 *
 * @typedef {Object} StorageMethods
 * @property {Function} get Async Get data by key
 * @property {Function} set Async Set data under key
 * @property {Function} remove Async Remove record by key
 * @property {Function} clear Async Wipe all stored data, has to be called with one true param as an confirmation
 *
 * @param {("local"|"sync")} type
 * @returns {StorageMethods}
 */
export function getStorage(type = 'local') {
  const instance = (window.browser && browser.storage || browser.storage)[type];

  return {
    get: (key) => new Promise(resolve => {
      instance.get(key, (data) => {
        resolve(data ? data[key] : null)
      })
    }),
    set: (key, data) => new Promise(resolve => {
      instance.set({ [key]: data }, () => {
        resolve();
      })
    }),
    remove: (key) => new Promise(resolve => {
      instance.remove(key, resolve)
    }),
    clear: (sure) => {
      if (sure !== true) return;
      return new Promise(resolve => {
        instance.clear(resolve);
      });
    }
  };
}

/**
 * Executes a function on each of an objects own enumerable properties. The
 *  callback function will receive three arguments: the value of the current
 *  property, the name of the property, and the object being processed. This is
 *  roughly equivalent to the signature for callbacks to
 *  Array.prototype.forEach.
 * @param {Object} obj The object to act on.
 * @param {Function} callback The function to execute.
 * @returns {Object} Returns the given object.
 */
export function objectForeach(obj, callback) {
  Object.keys(obj).forEach(function (prop) {
    callback(obj[prop], prop, obj);
  });
  return obj;
};
/**
 * Walks through an object executing user defined functions at every node on the
 *  way down and back up. Functions will be given three arguments: the value
 *  of the current node, the name of the current node, and the object being
 *  being walked through. This roughly resembles the callback signature of
 *  Array.prototype.map.
 * @param {Object} obj The object to walk through.
 * @param {Function} [descentionFn = function () {return null;}] callback
 *  function to be executed at every node from the top down.
 * @param {Function} [ascentionFn = function () {return null;}] callback
 *  function to be executed at every node from the bottom up.
 * @returns {Object} Returns the object with empty values removed.
 */
export function objectWalk(obj, descentionFn, ascentionFn) {
  descentionFn = descentionFn || function () { return null; }
  ascentionFn = ascentionFn || function () { return null; }
  function walk(obj) {
    objectForeach(obj, function (val, prop, aObj) {
      descentionFn(val, prop, aObj);
      if (val instanceof Object) {
        walk(val);
        ascentionFn(val, prop, aObj);
      }
    });
    return obj;
  }
  return walk(obj);
};

export function stringToHash(string) {
  let hash = 0, i, chr = null;
  for (i = 0; i < string.length; i++) {
    chr = string.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

/**
 * Address without protocol like http:// or https:// and the optional www.
 *   have to start with given base
 * @param {string} url
 * @param {string} base
 */
export function isUrlOfBase(url, base, matchType = DomainMatchTypes.STARTS_WITH) {
  if (!url) return false;
  if (matchType === DomainMatchTypes.DOMAIN_CONTAINS) {
    try {
      const domain = new URL(url).hostname.replace('www.', '');
      return domain.indexOf(base) > -1;
    } catch (O_o) {
      matchType = DomainMatchTypes.DOMAIN_CONTAINS
    }
  }

  const urlWithoutProtocol = removeUrlProtocol(url);
  const baseWithoutProtocol = removeUrlProtocol(base);

  return urlWithoutProtocol.startsWith(baseWithoutProtocol);
}

export const removeUrlProtocol = (s) => s.replace(/((^\w+:|^)\/\/)?(www\.)?/, '');

export function makeWeakUrlBase(url = '') {
  let base = removeUrlProtocol(url);
  base = base.split('/')[0];
  return base;
}

/**
 * Deep merge two or more objects together.
 * (c) 2019 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param   {Object}   objects  The objects to merge together
 * @returns {Object}            Merged values of defaults and options
 */
export function deepmerge() {
  // Setup merged object
  const result = {};

  // Merge the object into the result object
  const merge = (obj) => {
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        // If property is an object, merge properties
        if (Object.prototype.toString.call(obj[prop]) === '[object Object]') {
          result[prop] = deepmerge(result[prop], obj[prop]);
        } else {
          result[prop] = obj[prop];
        }
      }
    }
  };

  // Loop through each object and conduct a merge
  for (let i = 0; i < arguments.length; i++) {
    merge(arguments[i]);
  }

  return result;
};


export function isUrlDomainOnList(url = '', list = []) {
  for (let domain of list) {
    if (isUrlOfBase(url, domain)) {
      return true;
    }
  }
  return false;
}

export function hasUrlParam(url, param, value) {
  const { searchParams: params } = new URL(url);
  return !value ? params.has(param) : params.get(param) === value;
}

export function isAnyUrlParamOnList(url, list = []) {
  const { searchParams: params } = new URL(url);

  for (let param of list) {
    if (hasUrlParam(url, param)) {
      return true;
    }
  }
  return false;
}

export function classNames(...args) {
  const classes = [];
  const hasOwn = {}.hasOwnProperty;

  for (const arg of args) {
    if (!arg) continue;

    const argType = typeof arg;

    if (argType === 'string' || argType === 'number') {
      classes.push(arg);
    } else if (Array.isArray(arg) && arg.length) {
      const inner = classNames.apply(null, arg);
      if (inner) {
        classes.push(inner);
      }
    } else if (argType === 'object') {
      if (arg.toString !== Object.prototype.toString) {
        classes.push(arg.toString());
      } else {
        for (const key in arg) {
          if (hasOwn.call(arg, key) && arg[key]) {
            classes.push(key);
          }
        }
      }
    }
  }

  return classes.join(' ');
}

export function sleep(s) {
  return new Promise(resolve => setTimeout(resolve, s * 1000));
}

export function localeUrlToTipliName(url) {
  const { host } = new URL(url);
  return host.split('.')[1];
}