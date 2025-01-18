import {
  isProduction
} from "./XVTLOGGR.js";
import {
  __publicField
} from "./ERZ5UWI7.js";

// src/utils/Log.ts
var Log = class {
  constructor(modules) {
    __publicField(this, "module");
    this.module = modules.split("/").map((module) => `[${module}]`).join("");
  }
  info(...args) {
    if (isProduction)
      return;
    const stack = this.getCallStack();
  }
  error(...args) {
    if (isProduction)
      return;
    const stack = this.getCallStack();
  }
  warn(...args) {
    if (isProduction)
      return;
    const stack = this.getCallStack();
  }
  debug(...args) {
    if (isProduction)
      return;
    const stack = this.getCallStack();
  }
  getCallStack() {
    var _a;
    const stack = new Error().stack;
    if (stack) {
      const stackText = stack.split("\n").slice(2).join("\n");
      const prevStack = (_a = stackText == null ? void 0 : stackText.split(/\n/)) == null ? void 0 : _a[1];
      return prevStack;
    }
    return "";
  }
};
var Log_default = Log;

export {
  Log_default
};
