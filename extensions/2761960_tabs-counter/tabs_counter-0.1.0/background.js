/*!
 *                      2022
 * All Rights Reserved for Oziku Technologies LLC
 *            https://www.oziku.tech/
 */
!function(e){const t=e.chrome.browserAction,d=e.chrome.tabs,n=e.chrome.runtime;async function o(){const e={};d.query({},(d=>{for(const t of d)e[t.windowId]=(e[t.windowId]||0)+1;for(const n of d)t.setBadgeText({tabId:n.id,text:e[n.windowId].toString()})}))}n.onInstalled.addListener(o),n.onStartup.addListener(o),d.onAttached.addListener(o),d.onCreated.addListener(o),d.onDetached.addListener(o),d.onRemoved.addListener(o),d.onUpdated.addListener(o)}(this);