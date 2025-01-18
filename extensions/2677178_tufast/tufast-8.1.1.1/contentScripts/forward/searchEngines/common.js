import sites from "./sites.json.proxy.js";
export async function fwdEnabled() {
  const {fwdEnabled: fwdEnabled2} = await chrome.storage.local.get(["fwdEnabled"]);
  return !!fwdEnabled2;
}
export async function forward(query) {
  if (!await fwdEnabled() || !query)
    return false;
  const url = sites[query.toLowerCase()]?.url;
  if (url) {
    console.log(`Forwarding to ${query} (${url})`);
    chrome.runtime.sendMessage({cmd: "save_clicks", click_count: 1});
    window.location.replace(url);
    return true;
  }
  return false;
}
