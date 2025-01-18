/* TODOs:
 *   - Ensure that Basque has the highest qvalue
 *   - Handle requests without a preexisting Accept-Language header
 *   - Use a regex for checking the existing Accept-Languages?
 */

function parse(value) {
  return value.toLowerCase()
              .split(',')
              .map(lang => lang.split(';')[0].trim())
}

chrome.webRequest.onBeforeSendHeaders.addListener(
  details => {
    for (let header of details.requestHeaders) {
      if (header.name.toLowerCase() == 'accept-language') {
        if (!parse(header.value).includes('eu')) {
          header.value = 'eu,' + header.value;
        }
        break;
      }
    }
    return { requestHeaders: details.requestHeaders };
  },
  { urls: ["http://*/*", "https://*/*"] },
  [ "blocking", "requestHeaders" ]
);
