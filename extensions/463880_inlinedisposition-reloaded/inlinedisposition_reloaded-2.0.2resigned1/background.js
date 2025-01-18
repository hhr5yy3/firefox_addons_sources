function replaceDisposition(e) {
  var _re = /^\s*(attachment|file)/i;
  for (var header of e.responseHeaders) {
    if (header.name.toLowerCase() == "content-disposition" && _re.test(header.value)) {
      header.value = header.value.replace(_re, "inline");
      break;
    }
  }
  return {responseHeaders: e.responseHeaders};
}

browser.webRequest.onHeadersReceived.addListener(
  replaceDisposition,
  {urls: ["<all_urls>"]},
  ["blocking", "responseHeaders"]
);
