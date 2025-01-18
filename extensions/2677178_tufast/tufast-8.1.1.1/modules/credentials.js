import {isFirefox} from "./firefoxCheck.js";
async function hashDigest(str) {
  return await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
}
async function getKeyBuffer() {
  let sysInfo = "";
  if (isFirefox()) {
    sysInfo += window.navigator.hardwareConcurrency;
  } else {
    const info = await chrome.system.cpu.getInfo();
    delete info.processors;
    if (info.temperatures)
      delete info.temperatures;
    sysInfo += JSON.stringify(info);
  }
  const platformInfo = await chrome.runtime.getPlatformInfo();
  sysInfo += JSON.stringify(platformInfo);
  return await crypto.subtle.importKey("raw", await hashDigest(sysInfo), {name: "AES-CBC"}, false, ["encrypt", "decrypt"]);
}
export async function setUserData(userData, platform = "zih") {
  if (!userData || !userData.user || !userData.pass || !platform)
    return;
  const encode = async (decoded) => {
    const dataEncoded = new TextEncoder().encode(decoded);
    const keyBuffer = await getKeyBuffer();
    const iv = crypto.getRandomValues(new Uint8Array(16));
    let dataEnc = await crypto.subtle.encrypt({
      name: "AES-CBC",
      iv
    }, keyBuffer, dataEncoded);
    dataEnc = Array.from(new Uint8Array(dataEnc));
    dataEnc = dataEnc.map((byte) => String.fromCharCode(byte)).join("");
    dataEnc = btoa(dataEnc);
    const ivStr = Array.from(iv).map((b) => ("00" + b.toString(16)).slice(-2)).join("");
    return ivStr + dataEnc;
  };
  const user = await encode(userData.user);
  const pass = await encode(userData.pass);
  let dataObj;
  try {
    const {udata} = await chrome.storage.local.get(["udata"]);
    if (typeof udata !== "string")
      throw Error();
    dataObj = JSON.parse(udata);
  } catch {
    dataObj = {};
  }
  dataObj[platform] = {user, pass};
  await chrome.storage.local.set({udata: JSON.stringify(dataObj)});
}
export async function userDataExists(platform) {
  if (typeof platform === "string") {
    const {user, pass} = await getUserData(platform);
    return !!(user && pass);
  } else {
    const {udata} = await chrome.storage.local.get(["udata"]);
    if (typeof udata !== "string")
      return false;
    try {
      const dataJson = JSON.parse(udata);
      for (const platform2 of Object.keys(dataJson)) {
        const {user, pass} = await getUserData(platform2);
        if (user && pass)
          return true;
      }
    } catch {
    }
  }
  return false;
}
export const loginDataExists = (platform = "zih") => userDataExists(platform);
export async function getUserData(platform = "zih", providedKeyBuffer) {
  const keyBuffer = providedKeyBuffer ?? await getKeyBuffer();
  const {udata} = await chrome.storage.local.get(["udata"]);
  if (typeof udata !== "string" || !platform) {
    return {user: void 0, pass: void 0};
  }
  const decode = async (encoded) => {
    if (!encoded)
      return void 0;
    const ivArr = encoded.slice(0, 32).match(/.{2}/g)?.map((byte) => parseInt(byte, 16));
    if (!ivArr)
      return void 0;
    const iv = new Uint8Array(ivArr);
    const dataEncryptedStr = atob(encoded.slice(32));
    const dataEncrypted = new Uint8Array(dataEncryptedStr.match(/[\s\S]/g)?.map((ch) => ch.charCodeAt(0)) || []);
    if (dataEncrypted.length === 0)
      return void 0;
    const decoded = await crypto.subtle.decrypt({
      name: "AES-CBC",
      iv
    }, keyBuffer, dataEncrypted);
    return new TextDecoder().decode(decoded);
  };
  try {
    const userDataJson = JSON.parse(udata);
    const {user: encUser, pass: encPass} = userDataJson[platform];
    return {user: await decode(encUser), pass: await decode(encPass)};
  } catch {
    return {user: void 0, pass: void 0};
  }
}
export async function deleteUserData(platform) {
  if (!platform)
    return false;
  const {udata} = await chrome.storage.local.get(["udata"]);
  if (typeof udata !== "string")
    return false;
  try {
    const dataJson = JSON.parse(udata);
    if (!dataJson[platform])
      return false;
    delete dataJson[platform];
    await chrome.storage.local.set({udata: JSON.stringify(dataJson)});
    return true;
  } catch {
    return false;
  }
}
export async function getUserDataLagacy() {
  const keyBuffer = await getKeyBuffer();
  const {Data: data} = await chrome.storage.local.get(["Data"]);
  if (data === void 0 || data === "undefined") {
    return {user: void 0, pass: void 0};
  }
  const ivSlice = data.slice(0, 32).match(/.{2}/g)?.map((byte) => parseInt(byte, 16));
  if (!ivSlice)
    return {user: void 0, pass: void 0};
  const iv = new Uint8Array(ivSlice);
  const userDataEncryptedStr = atob(data.slice(32));
  const userDataEncrypted = new Uint8Array(userDataEncryptedStr.match(/[\s\S]/g)?.map((ch) => ch.charCodeAt(0)) || []);
  if (userDataEncrypted.length === 0)
    return {user: void 0, pass: void 0};
  let userData = await crypto.subtle.decrypt({
    name: "AES-CBC",
    iv
  }, keyBuffer, userDataEncrypted);
  userData = new TextDecoder().decode(userData);
  userData = userData.split("@@@@@");
  return {user: userData[0], pass: userData[1]};
}
export async function upgradeUserData(encryptionLevel) {
  const highestEncryptionLevel = 4;
  if (encryptionLevel >= highestEncryptionLevel)
    return highestEncryptionLevel;
  const getKeyBufferLvl3 = async () => {
    let sysInfo = "";
    if (isFirefox())
      sysInfo += window.navigator.hardwareConcurrency;
    const platformInfo = await chrome.runtime.getPlatformInfo();
    sysInfo += JSON.stringify(platformInfo);
    return await crypto.subtle.importKey("raw", await hashDigest(sysInfo), {name: "AES-CBC"}, false, ["encrypt", "decrypt"]);
  };
  switch (encryptionLevel) {
    case 1: {
      const userData = await chrome.storage.local.get(["asdf", "fdsa"]);
      await setUserData({user: atob(userData.asdf), pass: atob(userData.fdsa)}, "zih");
      await chrome.storage.local.remove(["asdf", "fdsa"]);
      break;
    }
    case 2: {
      const {user, pass} = await getUserDataLagacy();
      await setUserData({user, pass}, "zih");
      await chrome.storage.local.remove(["Data"]);
      break;
    }
    case 3: {
      const legacyKeyBuffer = await getKeyBufferLvl3();
      for (const platform of ["zih", "slub"]) {
        const oldData = await getUserData(platform, legacyKeyBuffer);
        if (!oldData.user || !oldData.pass)
          continue;
        await setUserData(oldData, platform);
      }
      break;
    }
  }
  return highestEncryptionLevel;
}
