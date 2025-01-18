function getSearchTypeParam(currentURL) {
  switch (true) {
    case currentURL.includes("apnext.eu"):
      return "&catalogName=AP_NEXT";
    case currentURL.includes("auto-france"):
      return "&catalogName=AUTO_FRANCE";
    case currentURL.includes("katalog.autopartner.pl"):
      return "&catalogName=AUTO_PARTNER_GDANSK";
    case currentURL.includes("ap.webkatalog.pl"):
      return "&catalogName=AP_WEBKATALOG";
    case currentURL.includes("ipterminal"):
      return "&catalogName=INTER_PARTS";
    case currentURL.includes("auto-zatoka.webterminal.com.pl"):
      return "&catalogName=AUTO_ZATOKA";
    case currentURL.includes("katalog.elitpolska"):
      return "&catalogName=ELIT";
    case currentURL.includes("epc-data.com"):
      return "&catalogName=EPC_DATA";
    case currentURL.includes("ezamowienia.motorol.pl"):
      return "&catalogName=MOTOROL_EZAMOWIENIA";
    case currentURL.includes("katalog.gordon.com.pl"):
    case currentURL.includes("oferta.gordon.com.pl"):
      return "&catalogName=GORDON";
    case currentURL.includes("store.hartphp.com.pl"):
      return "&catalogName=HART_STORE";
    case currentURL.includes("katalog.hipol.pl"):
      return "&catalogName=HIPOL";
    case currentURL.includes("intercars.eu"):
      return "&catalogName=INTER_CARS";
    case currentURL.includes("lsd.intervito"):
      return "&catalogName=INTERVITO";
    case currentURL.includes("japancars.ru"):
      return "&catalogName=JAPAN_CARS";
    case currentURL.includes("katalog.motorol.pl"):
      return "&catalogName=MOTOROL_KATALOG";
    case currentURL.includes("motogama.webterminal.com.pl"):
      return "&catalogName=MOTOGAMA";
    case currentURL.includes("sklep.motores"):
      return "&catalogName=MOTORES";
    case currentURL.includes("parts.autoxp.ru"):
      return "&catalogName=AUTO_XP";
    case currentURL.includes("partslink24"):
      return "&catalogName=PARTS_LINK";
    case currentURL.includes("tecalliance.net"):
      return "&catalogName=PARTS_LINK";
    case currentURL.includes("matusiewicz.profiauto.net"):
      return "&catalogName=MOTO_PROFIL";
    case currentURL.includes("katalog.profiauto.net"):
      return "&catalogName=MOTO_PROFIL";
    case currentURL.includes("realoem.com"):
      return "&catalogName=REAL_OEM";
    case currentURL.includes("rollsc.pl"):
      return "&catalogName=ROLL_SC";
    case currentURL.includes("tedgum"):
      return "&catalogName=TEDGUM";
    case currentURL.includes("zzap.ru"):
      return "&catalogName=ZZAP";
    case currentURL.includes("zzap.acat.online"):
      return "&catalogName=ZZAP_ACAT";
    case currentURL.includes("jadar"):
      return "&catalogName=JADAR";
    case currentURL.includes("e-partsbmw"):
      return "&catalogName=BMW_ZDUNEK";
    case currentURL.includes("auto-land"):
      return "&catalogName=AUTO_LAND";
    case currentURL.includes("online.profiauto.com"):
      return "&catalogName=MOTO_PROFIL";
    default:
      return "";
  }
}

searchMotorro = function (info) {
  var query = info.selectionText;
  var currentURL = info.frameUrl || info.pageUrl;
  var newURL =
    "https://app.motorro.eu/dashboard/search?value=" +
    query.trim().replace(/\s/g, "");

  if (currentURL.includes("partslink24.com")) {
    newURL += "&searchType=OE";
  } else {
    newURL += `&searchType=EXTENSION${getSearchTypeParam(currentURL)}`;
  }
  chrome.tabs.create({ url: newURL });
};

chrome.contextMenus.create({
  title: "Znajdź część w Motorro",
  contexts: ["selection"],
  onclick: searchMotorro,
});

var info;
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (
    message.method == " " &&
    message.info != null &&
    Array.isArray(message.info)
  ) {
    info = message.info;
    len = 0;
    info.forEach((i) => {
      if (i != null && i != "&nbsp;") len++;
    });
    chrome.browserAction.setBadgeText({ text: (len - 1).toString() });
  } else if (message.method == "getInfo") {
    sendResponse(info);
  }
});
