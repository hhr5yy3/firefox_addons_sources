function isEmptyValue(value) {
  if ("encrypted" in value) {
    return !!value.isEmpty;
  }
  return value.unencrypted === "";
}
export {
  isEmptyValue as i
};
//# sourceMappingURL=isEmptyValue-338a5af1.js.map
