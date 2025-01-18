class Utils {
  static throttle(delay, fn) {
    let timeout = null;

    return function perform(...args) {
      if (timeout) return;
      timeout = setTimeout(() => {
        fn(...args);
        clearTimeout(timeout);
        timeout = null;
      }, delay);
    };
  }

  static debounce(delay, fn) {
    let timeout;

    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  }

  static filterEmptyEntries = (obj) =>
    Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));

  static isEmptyObject = (obj) =>
    Object.keys(this.filterEmptyEntries(obj)).length === 0;
}
