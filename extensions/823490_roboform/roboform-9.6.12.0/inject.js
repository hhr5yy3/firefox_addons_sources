// Copyright (C) 1999-2024 Siber Systems Inc. All Rights Reserved.
"use strict";!function(){const a="v2YnyxrL54laCSayByondA",b=`${a}-1`,c=`${a}-2`;try{
Object.defineProperty(navigator,"credentials",{value:function(a){const g=null!=a?a:{get:async()=>null,create:async()=>null,
preventSilentAccess:async()=>{},store:async()=>{throw new Error("Not implemented")}},h=new Map;window.addEventListener(b,m)
;return{get:i,create:j,preventSilentAccess:g.preventSilentAccess,store:g.store};async function i(a){var b,c;const h=a.publicKey
;if(!h)return g.get(a);const i={options:{mediation:a.mediation,publicKey:{
allowCredentials:null===(b=h.allowCredentials)||void 0===b?void 0:b.map((a=>({id:e(d(a.id)),type:a.type,transports:a.transports
}))),challenge:e(d(h.challenge)),extensions:h.extensions,rpId:h.rpId,timeout:h.timeout,userVerification:h.userVerification}},
origin:window.location.origin},j=await l({call:"get",params:i,callbackId:k()},a.signal);if(!j)return null
;const m=null===(c=j.result)||void 0===c?void 0:c.credential;if(!m)return g.get(a);return{id:m.id,rawId:f(m.rawId),type:m.type,
authenticatorAttachment:m.authenticatorAttachment,response:{clientDataJSON:f(m.response.clientDataJSON),
authenticatorData:f(m.response.authenticatorData),signature:f(m.response.signature),
userHandle:m.response.userHandle?f(m.response.userHandle):null},getClientExtensionResults:()=>m.clientExtensionResults,
isConditionalMediationAvailable:async()=>!0,isUserVerifyingPlatformAuthenticatorAvailable:async()=>!0}}async function j(a){
var b,c;const h=a.publicKey;if(!h)return g.create(a);const i={options:{publicKey:{attestation:h.attestation,
authenticatorSelection:h.authenticatorSelection,challenge:e(d(h.challenge)),
excludeCredentials:null===(b=h.excludeCredentials)||void 0===b?void 0:b.map((a=>({id:e(d(a.id)),transports:a.transports,
type:a.type}))),extensions:h.extensions,pubKeyCredParams:h.pubKeyCredParams.map((a=>({
alg:"string"==typeof a.alg?parseInt(a.alg):a.alg,type:a.type}))),rp:{name:h.rp.name,id:h.rp.id},timeout:h.timeout,user:{
name:h.user.name,displayName:h.user.displayName,id:e(d(h.user.id))}}},origin:window.location.origin},j=await l({call:"create",
params:i,callbackId:k()},a.signal);if(!j)return null;const m=null===(c=j.result)||void 0===c?void 0:c.credential
;if(!m)return g.create(a);return{id:m.id,rawId:f(m.rawId),type:m.type,authenticatorAttachment:m.authenticatorAttachment,
response:{clientDataJSON:f(m.response.clientDataJSON),attestationObject:f(m.response.attestationObject),
getTransports:()=>m.response.transports,getPublicKeyAlgorithm:()=>m.response.publicKeyAlgorithm,
getAuthenticatorData:()=>f(m.response.authenticatorData),
getPublicKey:()=>m.response.publicKeyDER?f(m.response.publicKeyDER):null},
getClientExtensionResults:()=>m.clientExtensionResults,isConditionalMediationAvailable:async()=>!0,
isUserVerifyingPlatformAuthenticatorAvailable:async()=>!0}}function k(){return Date.now().toString()}function l(a,b){
return new Promise(((d,e)=>{if(!a.callbackId)return d(null);const f=a.callbackId;h.set(f,{ok:a=>{i(),d(a)},error:a=>{i(),e(a)}
}),null==b||b.addEventListener("abort",g);try{j(a)}catch(k){return i(),void e(k)}return;function g(){i(),j({callbackId:f}),
e(new DOMException("The user aborted a request.","AbortError"))}function i(){null==b||b.removeEventListener("abort",g),
h.delete(f)}function j(a){window.dispatchEvent(new CustomEvent(c,{detail:JSON.stringify(a)}))}}))}function m(a){var b
;const c=a.detail;if(!c||"string"!=typeof c)return;const d=JSON.parse(c),e=null==d?void 0:d.callbackId;if(e){const a=h.get(e)
;a&&(d.error?a.error(new Error((f=d.error).message||f.description||"Unexpected error")):a.ok(d))
}else d.error&&(null===(b=d.disconnectIds)||void 0===b||b.reduce(((a,b)=>{const c=h.get(b);return c&&(h.delete(b),a.push(c.ok)),
a}),[]).forEach((a=>{try{a(null)}catch(f){}})));var f}}(navigator.credentials),writable:!0,configurable:!0}),
Object.defineProperty(window,"PublicKeyCredential",{value:()=>{},writable:!0,configurable:!0}),
Object.defineProperty(window.PublicKeyCredential,"isConditionalMediationAvailable",{value:()=>Promise.resolve(!0),writable:!0,
configurable:!0}),Object.defineProperty(window.PublicKeyCredential,"isUserVerifyingPlatformAuthenticatorAvailable",{
value:()=>Promise.resolve(!0),writable:!0,configurable:!0})}catch(g){console.warn("RoboForm: cannot use passkeys: ",g)}return
;function d(a){return"buffer"in a?a.buffer:a}function e(a){const b=new Uint8Array(a),c=b.length;let d=""
;for(let e=0;e<c;e++)d+=String.fromCharCode(b[e]);return window.btoa(d).replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"")}
function f(a){const b=(4-(a=a.replace(/-/g,"+").replace(/_/g,"/")).length%4)%4;a=a.padEnd(a.length+b,"=")
;const c=new Uint8Array(256),d="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
;for(let n=0;n<64;n++)c[d.charCodeAt(n)]=n;let e=.75*a.length;const f=a.length;let g,h,i,j,k=0;a.endsWith("=")&&(e--,
"="===a[a.length-2]&&e--);const l=new ArrayBuffer(e),m=new Uint8Array(l);for(let n=0;n<f;n+=4)g=c[a.charCodeAt(n)],
h=c[a.charCodeAt(n+1)],i=c[a.charCodeAt(n+2)],j=c[a.charCodeAt(n+3)],m[k++]=g<<2|h>>4,m[k++]=(15&h)<<4|i>>2,m[k++]=(3&i)<<6|63&j
;return l}}();