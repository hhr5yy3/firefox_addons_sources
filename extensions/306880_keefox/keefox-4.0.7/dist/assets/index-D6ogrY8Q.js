function once(function_) {
  let result;
  return () => {
    if (result === void 0) {
      result = function_();
    }
    return result;
  };
}
const isExtensionContext = once(() => {
  var _a;
  return typeof ((_a = globalThis.chrome) == null ? void 0 : _a.extension) === "object";
});
const isFirefox = () => {
  var _a;
  return (_a = globalThis.navigator) == null ? void 0 : _a.userAgent.includes("Firefox");
};
const isChrome = () => {
  var _a;
  return (_a = globalThis.navigator) == null ? void 0 : _a.userAgent.includes("Chrome");
};
export {
  isExtensionContext as a,
  isFirefox as b,
  isChrome as i
};
//# sourceMappingURL=index-D6ogrY8Q.js.map
