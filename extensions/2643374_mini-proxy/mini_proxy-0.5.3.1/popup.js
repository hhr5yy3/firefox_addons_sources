let isSetIcon = typeof browser.browserAction.setIcon !== "undefined";
let isDesktop = true;
let Direct = true;
let Unblock = new Array();
let IExp = "";

let Html = document.documentElement;
let Body = document.body;
let Content = document.getElementById("Content");
let IExport = document.getElementById("IExport");
let Page = document.getElementById("Page");
let OnOff = document.getElementById("OnOff");
let Sort = document.getElementById("Sort");

let UPOn = document.getElementById("UPOn");
let UPAdress = document.getElementById("UPAdress");
let UPType = document.getElementById("UPType");
let UPPort = document.getElementById("UPPort");
let UPLogin = document.getElementById("UPLogin");
let UPPass = document.getElementById("UPPass");
let UPAuth = document.getElementById("UPAuth");
let UPDns = document.getElementById("UPDns");

let ProxySet = document.getElementById("ProxySet");
let Authorize = document.getElementById("Authorize");
let DnsRequest = document.getElementById("DnsRequest");
let InputAdd = document.getElementById("InputAdd");
let Unlist = document.getElementById("Unlist");
let Version = document.getElementById("Version");


browser.runtime.getPlatformInfo().then((info) => {
  if(info.os === "android") {
    isDesktop = false;
    window.addEventListener("resize", Resize);
  }
  Resize();
});

function ArrayConvert(a,b) {
  a.length = 0;
  b.forEach(host => a.push(host));
}

function Resize() {
  if(isDesktop) {
    if(location.search.split("?")[1]) {
      let scale = location.search.split("?")[1];
      let trans = (scale-1)*50;
      let style = `transform: translate(0%,${trans}%)scale(${scale})`;
      Content.style = style;
      IExport.classList.remove("tab");
      Html.style = "scrollbar-width: auto;";
    } else {
      Page.style = "";
    }
    return;
  }
  let width = Content.offsetWidth;
  //let margin = parseInt(getComputedStyle(Body).marginRight) * 2;
  let scale = Html.clientWidth / width;
  let trans = (scale-1)*50;
  let style = `transform: translate(${trans}%,${trans}%)scale(${scale})`;
  Content.style = style;
  IExport.classList.remove("tab");
  Body.style = "justify-content: left";
}

function RestoreOptions() {
  browser.storage.local.get(function (res) {
    OnOff.checked = res.OnOff;
    Direct = res.Sort;
    if(Direct) {
      Sort.style = "transform: scale(-1)";
      Unlist.style = "flex-direction: column-reverse";
    } else {
      Sort.style = "";
      Unlist.style = "";
    }

     if(res.OnOff) {
       if(res.UPOn) {
         Body.classList.remove("hideauth");
         if(isSetIcon) browser.browserAction.setIcon({path: "data/icon/256.svg"});
       }
       else {
         Body.classList.add("hideauth");
         if(isSetIcon) browser.browserAction.setIcon({path: "data/icon/256.svg#orange"});
       }
     }

    UPOn.checked = res.UPOn;
    UPAdress.value = res.UPAdress;
    UPPort.value = res.UPPort;
    UPAuth.checked = res.UPAuth;
    UPLogin.value = res.UPLogin;
    UPPass.value = res.UPPass;
    UPDns.checked = res.UPDns;
    ProxySet.dataset.type = res.UPType;

    if(res.Unblock) {
      ArrayConvert(Unblock,res.Unblock.split(','));
      Unlist.innerHTML = "";
      const frag = new DocumentFragment();
      for(let i=0; i<Unblock.length; i++) {
        const div = document.createElement("div");
        div.id = i;

        const input = document.createElement("input");
        input.className = "block item";
        input.type = "text";
        input.disabled = true;
        input.value = Unblock[i];

        const men = document.createElement("div");
        men.id = "Delete"; // Menu
        men.dataset.id = i;
        men.className = "action";

        div.appendChild(input);
        div.appendChild(men);
        frag.appendChild(div);
      }
      Unlist.appendChild(frag);
    }
    IExp = res;
  });
}

function saveSettings() {
  browser.storage.local.set({
    UPOn: UPOn.checked,
    UPAdress: UPAdress.value,
    UPType: ProxySet.dataset.type,
    UPPort: UPPort.value,
    UPAuth: UPAuth.checked,
    UPLogin: UPLogin.value,
    UPPass: UPPass.value,
    UPDns: UPDns.checked
  }).then(RestoreOptions);
}

function SaveOptions() {
  browser.storage.local.set({
    OnOff: OnOff.checked,
    Unblock: Unblock.join(','),
    Sort: Direct 
  }).then(RestoreOptions);
}

function AddHost() {
  if(!InputAdd.value.length) return;
  let host = Url(InputAdd.value);
  // console.log("Host: "+host);
  if(!host || ~Unblock.indexOf(host)) return;
  Unblock.push(host);
  SaveOptions();
}

function RemoveHost(e) {
  if(e.target.dataset.id !== undefined) {
    Unblock.splice(e.target.dataset.id, 1);
    document.getElementById(e.target.dataset.id).remove();
    SaveOptions();
  }
}

function Url(s) {
  if(!s.length) return false;
  let input = s.toLowerCase().replace(/https?:\/\/|\s|[<>"'{}|\\^`]/g,"").replace(/\*/g,"!");
  try {
    let host = new URL("http://"+input).hostname.replace(/\!/g,"*");
    return host.replace(/[^a-z0-9*.-]|\.{2,}|^[.-]|[.-]$/g,"");
  } catch { return false; }
}

function AddUserProxy() {
  if(!UPAdress.value.length || !UPPort.value.length) return;
  let host = Url(UPAdress.value);
  if(!host) return;
  UPAdress.value = host;
  let port = UPPort.value.replace(/[^\d]+/g,"");
  if(!port.length || port.length > 5 || port > 65535) return;
  UPPort.value = port;
  saveSettings();
}

function UserProxyType(el) {
  const type = ["http","https","socks4","socks"];
  let shift = type.indexOf(el.dataset.type)+1;
  let next = (shift < type.length) ? shift : 0;
  el.dataset.type = type[next];
}

function AuthOptions(e) {
  if(e.target.checked) Body.classList.remove("hideauth");
  else Body.classList.add("hideauth");
}

function HideSwitch(el) {
  el.classList.toggle("hide");
}

function Sorting() {
  Direct = Direct ? false : true;
  SaveOptions();
}

function ImportData() {
  let e = document.getElementById("GetFile");
  e.value = "";
  e.onchange = function(e) {
    let file = e.target.files[0];
    if(!file) return;
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function(e) {
      let settings = JSON.parse(e.target.result);
      browser.storage.local.set(settings).then(RestoreOptions);
    }
  }
  e.click();
}

function ExportData() {
  let date = new Date().toLocaleDateString("en-ZA");
  date = date.replace(/\//g,".");

  let a = document.createElement("a");
  let json = JSON.stringify(IExp);
  let blob = new Blob([json], {type: "octet/stream"});
  let url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = `Mini Proxy ${date}.json`;
  document.head.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}

function ClickEvent(e) {
  // AddHost
  if(e.target.id == "Add") { AddHost(); }
  // RemoveHost
  if(e.target.id == "Delete") { RemoveHost(e); }
  // AddUserProxy
  if(e.target.id == "UPSave") { AddUserProxy() }
  // UserProxyType
  if(e.target.id == "UPType") { UserProxyType(ProxySet); }
  // ShowHideAuthOptions
  if(e.target.id == "UPOn") { AuthOptions(e); }
  // ShowHideOptions
  if(e.target.id == "PSS") { HideSwitch(ProxySet); }
  // Sorting
  if(e.target.id == "Sort") { Sorting(); }
  // ImportSettings
  if(e.target.id == "UPImport") { ImportData(); }
  // ExportSettings
  if(e.target.id == "UPExport") { ExportData(); }
  // OnOff
  if(e.target.id == "OnOff") { SaveOptions(); }
  // PasswordShower
  if(document.activeElement.id == "UPPass") e.target.setAttribute("type","text");
  else UPPass.setAttribute("type","password");
}

Body.addEventListener("click", ClickEvent);
document.addEventListener("DOMContentLoaded", RestoreOptions);
Version.textContent = browser.runtime.getManifest().version;