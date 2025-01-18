import {getUserData} from "./credentials.js";
export async function getTOTP(platform = "zih") {
  const userData = await getUserData(platform + "-totp");
  try {
    if (!userData || !userData.pass)
      return void 0;
    return await generateTOTP(userData.pass ?? "");
  } catch {
    return void 0;
  }
}
export async function getIOTP(platform = "zih", ...indexes) {
  const userData = await getUserData(platform + "-iotp");
  if (!userData || !userData.pass)
    return void 0;
  let result = "";
  for (const index of indexes) {
    const char = userData.pass[index];
    if (!char)
      return void 0;
    result += char;
  }
  return result;
}
async function generateTOTP(secret) {
  if (!secret) {
    throw new Error("No secret found in URI");
  }
  const counter = Math.floor(Date.now() / 1e3 / 30);
  const key = await b32ToUInt8Arr(secret);
  const value = new ArrayBuffer(8);
  const view = new DataView(value);
  view.setUint32(4, counter, false);
  const cryptoKey = await crypto.subtle.importKey("raw", key, {name: "HMAC", hash: "SHA-1"}, false, ["sign", "verify"]);
  const signed = await crypto.subtle.sign({name: "HMAC", hash: "SHA-1"}, cryptoKey, value);
  const signature = new Uint8Array(signed);
  const offset = signature[signature.length - 1] & 15;
  const code = (signature[offset + 0] & 127) << 24 | (signature[offset + 1] & 255) << 16 | (signature[offset + 2] & 255) << 8 | signature[offset + 3] & 255;
  return (code % Math.pow(10, 6)).toString().padStart(6, "0");
}
async function b32ToUInt8Arr(base32) {
  base32 = base32.replace(/=+$/, "").toLocaleUpperCase();
  const base32Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  let bits = "";
  for (let i = 0; i < base32.length; i++) {
    const val = base32Chars.indexOf(base32.charAt(i));
    if (val === -1)
      throw new Error("Invalid character in secret");
    bits += val.toString(2).padStart(5, "0");
  }
  const result = new Uint8Array(bits.length / 8);
  for (let i = 0; i + 8 <= bits.length; i += 8) {
    const chunk = bits.substring(i, i + 8);
    result[i / 8] = Number.parseInt(chunk, 2);
  }
  return result;
}
