$("#save").click(() => {
  var data = {};
  data['list'] = handler.proxies;
  data['enable'] = document.getElementById("toggleSwitch").checked;
  browser.storage.local.set({ "proxytabs.custom": data });
  console.log(handler);
});

browser.storage.local.get("proxytabs.custom", (e) => {
  if (e["proxytabs.custom"]["list"]) handler.setData(e["proxytabs.custom"]["list"]);
  if (e["proxytabs.custom"]["enable"]) document.getElementById("toggleSwitch").checked = e["proxytabs.custom"]["enable"];
  refeshProxyList();
});
