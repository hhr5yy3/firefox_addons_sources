let isSetIcon = typeof browser.browserAction.setIcon !== "undefined"; // Проверка проддержки старых (мобильных) браузеров функции установки иконки в браузере
let Unblock = new Array(); // Массив адресов для пропуска через прокси
let UPOn = false; // Включен ли свой прокси
let UPAdress = ""; // Адрес прокси
let UPType = ""; // Тип прокси
let UPPort = ""; // Порт прокси
let UPAuth = false; // Используется ли авторизация для прокси
let UPLogin = ""; // Логин прокси
let UPPass = ""; // Пароль прокси
let UPDns = false; // Используется ли отправка запросов к DNS через прокси (только socks 5)

function Proxy(e) {
  if(UPOn) {
    if(UPAuth) {
      if(UPType == "socks") return {type: UPType, host: UPAdress, port: UPPort, proxyDNS: UPDns, username: UPLogin, password: UPPass};
      if(UPType == "socks4") return {type: UPType, host: UPAdress, port: UPPort, proxyDNS: UPDns};
      return {type: "http", host: UPAdress, port: UPPort, authCredentials: {username: UPLogin, password: UPPass}};
    } else {
      if(UPType[0] == "s") return {type: UPType, host: UPAdress, port: UPPort, proxyDNS: UPDns};
      return {type: UPType, host: UPAdress, port: UPPort};
    }
  }
  return {type: "direct"};
}

function Switch(e) {
  if(e) {
    if(browser.proxy.onRequest.hasListener(Proxy)) browser.proxy.onRequest.removeListener(Proxy);
    if(browser.webRequest.onAuthRequired.hasListener(Proxy)) browser.webRequest.onAuthRequired.removeListener(Proxy);
    if(Unblock.length) {
      browser.proxy.onRequest.addListener(Proxy, {urls: Unblock});
      if(UPType[0] == "h") browser.webRequest.onAuthRequired.addListener(Proxy, {urls: Unblock},["blocking"]);
    }
    if(isSetIcon) {
      if(UPOn) browser.browserAction.setIcon({path: "data/icon/256.svg"});
      else browser.browserAction.setIcon({path: "data/icon/256.svg#orange"});
    }
  } else {
    if(browser.proxy.onRequest.hasListener(Proxy)) browser.proxy.onRequest.removeListener(Proxy);
    if(browser.webRequest.onAuthRequired.hasListener(Proxy)) browser.webRequest.onAuthRequired.removeListener(Proxy);
    if(isSetIcon) browser.browserAction.setIcon({path: "data/icon/256.svg#gray"});
  }
}

function ArrayConvert(a,b) {
  a.length = 0;
  b.forEach(host => a.push("*://"+host+"/*"));
  if(a[0] == "*:///*") a.length = 0;
}

browser.storage.local.get(function (res) {
  if(res.OnOff === undefined) return;
  if(res.Unblock) { ArrayConvert(Unblock,res.Unblock.split(',')) }
  if(res.UPOn) { UPOn = res.UPOn; }
  if(res.UPAdress) { UPAdress = res.UPAdress; }
  if(res.UPType) { UPType = res.UPType; }
  if(res.UPPort) { UPPort = res.UPPort; }
  if(res.UPAuth) { UPAuth = res.UPAuth; }
  if(res.UPLogin) { UPLogin = res.UPLogin; }
  if(res.UPPass) { UPPass = res.UPPass; }
  if(res.UPDns) { UPDns = res.UPDns; }
  Switch(res.OnOff);
});

browser.storage.onChanged.addListener(chg => {
  if(chg.UPOn !== undefined) { UPOn = chg.UPOn.newValue; }
  if(chg.UPAdress !== undefined) { UPAdress = chg.UPAdress.newValue; }
  if(chg.UPType !== undefined) { UPType = chg.UPType.newValue; }
  if(chg.UPPort !== undefined) { UPPort = chg.UPPort.newValue; }
  if(chg.UPAuth !== undefined) { UPAuth = chg.UPAuth.newValue; }
  if(chg.UPLogin !== undefined) { UPLogin = chg.UPLogin.newValue; }
  if(chg.UPPass !== undefined) { UPPass = chg.UPPass.newValue; }
  if(chg.UPDns !== undefined) { UPDns = chg.UPDns.newValue; }
  if(chg.Unblock !== undefined) { ArrayConvert(Unblock,chg.Unblock.newValue.split(',')); }
  if(chg.OnOff !== undefined) { Switch(chg.OnOff.newValue); }
});

function AddonInstalled() {
  browser.storage.local.get(function(res) {
    if(res.OnOff === undefined) { browser.storage.local.set({ OnOff: true, Unblock: "", Sort: true, UPOn: false, UPAdress: "127.0.0.1", UPType: "http", UPPort: "3128", UPAuth: false, UPLogin: "user", UPPass: "password", UPDns: false }); }
  });
}

browser.runtime.onInstalled.addListener(AddonInstalled);