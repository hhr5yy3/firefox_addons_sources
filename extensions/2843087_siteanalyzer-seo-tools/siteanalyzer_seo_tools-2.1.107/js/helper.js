const api = typeof browser !== "undefined" ? browser : chrome;

/**
 * @param {Function} callback
 * @param {Array} args
 *
 * @returns {Promise<any>}
 */
async function executeOnActiveTab(callback, args = []) {
  return api.tabs
    .query({ active: true, currentWindow: true })
    .then((tabs) =>
      api.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: callback,
        args: args,
      })
    )
    .then((data) => data[0].result);
}

/**
 * @param {string} token
 * @param {string} data
 */
function print(token, data) {
  const input = document.querySelector(`[data-print="${token}"]`);
  if (!input) return;

  input.innerHTML = data;
}

/**
 * Получает расширение по URL
 *
 * @param {string} url
 * @returns {string}
 */
function getUrlExtension(url) {
  return url.split(/[#?]/)[0].split(".").pop().trim();
}

/**
 * Является ли значение массива уникальным
 *
 * @param {any} value
 * @param {number} index
 * @param {any[]} array
 * @returns
 */
function getUniqueValues(value, index, array) {
  return array.indexOf(value) === index;
}

/**
 * Является ли строка валидным URL
 *
 * @param {string} string
 * @returns {boolean}
 */
function validateURL(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

/**
 * Получить дату в формате YYYY-MM-DD
 *
 * @param {Date} date
 * @returns
 */
function formatDate(date) {
  let dd = date.getDate();
  if (dd < 10) dd = "0" + dd;

  let mm = date.getMonth() + 1;
  if (mm < 10) mm = "0" + mm;

  const yyyy = date.getFullYear();

  return `${yyyy}-${mm}-${dd}`;
}

/**
 * Получить количество лет, между двумя датами
 *
 * @param {Date} date1 от
 * @param {Date} date2 до
 * @returns {number}
 */
function getAge(date1, date2) {
  var age = date2.getFullYear() - date1.getFullYear();
  var m = date2.getMonth() - date1.getMonth();
  if (m < 0 || (m === 0 && date2.getDate() < date1.getDate())) {
    age--;
  }
  return age;
}

function between(x, min, max) {
  return x >= min && x <= max;
}

function clearHTML(html) {
  const element = document.createElement("div");
  element.innerHTML = html;

  return element.innerText;
}

/**
 * @param {string} value
 * @returns {string}
 */
function formatDataToCsvValue(value) {
  return value.replace(";", "%3B").replace(",", "%2C").replace("#", "%23");
}

const oldFetch = fetch;
fetch = async (url, options = {}) => {
  const customUserAgent =
    (await api.storage.local.get("customUserAgent")) || undefined;

  const result = await oldFetch(url, {
    ...options,
    headers: {
      ...options.headers,
      "User-Agent": customUserAgent?.customUserAgent,
    },
  });

  return result;
};

/**
 * @param {string} link
 * @returns {string}
 */
function reduceLink(link, size) {
  if (link.length < size) return link;

  const start = link.substring(0, size * 0.5);
  const end = link.substring(link.length - size * 0.5);

  return `${start}…${end}`;
}
