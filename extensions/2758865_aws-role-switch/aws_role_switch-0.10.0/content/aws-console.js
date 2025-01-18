"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};

// src/common/browser/runtime.ts
var addMessageListener = (cb) => {
  chrome.runtime.onMessage.addListener(cb);
};
var sendMessage = async (msg) => {
  return new Promise((res) => {
    chrome.runtime.sendMessage(msg, res);
  });
};

// src/content/util/getCsrfFromPage.ts
var getCsrfFromPage = () => {
  var _a, _b;
  const csrfFromAWSC = (_b = (_a = window.wrappedJSObject) == null ? void 0 : _a.AWSC) == null ? void 0 : _b.Auth.getMbtc();
  if (csrfFromAWSC) {
    return String(csrfFromAWSC);
  }
  const csrfElem = document.querySelector("input[name=csrf]");
  if (csrfElem) {
    return csrfElem.value;
  }
  throw new Error("csrf not found");
};

// src/common/mappers/switchForm.ts
var createRedirectUrl = (redirectUrl, region) => {
  try {
    const url = new URL(redirectUrl);
    const actualRegion = url.searchParams.get("region") || "us-east-1";
    url.searchParams.set("region", region || actualRegion);
    return url.toString();
  } catch (_) {
    return redirectUrl;
  }
};
var mapToSwitchForm = (configItem, args) => {
  var _a;
  return __spreadProps(__spreadValues({
    account: configItem.aws_account_id,
    roleName: configItem.role_name,
    color: (_a = configItem.color) == null ? void 0 : _a.replace("#", ""),
    displayName: `${configItem.title} | ${configItem.aws_account_id}`.slice(0, 64),
    action: "switchFromBasis",
    mfaNeeded: "0"
  }, args), {
    redirect_uri: createRedirectUrl(args.redirect_uri, configItem.region)
  });
};

// src/content/util/createSigninForm.ts
var createSigninForm = (configItem, csrf) => {
  const redirect_uri = location.href;
  const params = mapToSwitchForm(configItem, { csrf, redirect_uri });
  const form = document.createElement("form");
  form.style.display = "none";
  form.setAttribute("method", "POST");
  form.setAttribute("action", "https://signin.aws.amazon.com/switchrole");
  for (const key in params) {
    const value = params[key];
    if (value) {
      const input = document.createElement("input");
      input.setAttribute("name", key);
      input.setAttribute("value", value);
      form.appendChild(input);
    }
  }
  return form;
};

// src/content/handlers/switchListener.ts
var switchListener = (msg) => {
  if (msg.type === "switch") {
    const _a = msg, { type } = _a, configItem = __objRest(_a, ["type"]);
    try {
      const csrf = getCsrfFromPage();
      const form = createSigninForm(configItem, csrf);
      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      console.warn(err);
      sendMessage(__spreadValues({ type: "redirect" }, configItem));
    }
  }
};

// src/content/aws-console.ts
addMessageListener(switchListener);
