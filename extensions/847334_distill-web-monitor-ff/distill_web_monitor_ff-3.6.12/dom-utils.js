const DOMUtils = {
  call: async function (method, ...args) {
    return method(...args);
  },
}
DOMUtils.Feed = Feed;
DOMUtils.Xml = Xml;
window.DOMUtils = DOMUtils;
