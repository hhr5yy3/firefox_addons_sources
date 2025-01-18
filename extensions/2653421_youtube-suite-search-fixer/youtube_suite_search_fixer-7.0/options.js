var coll = document.getElementsByClassName("collapsible");
let titleString = document.getElementById("title");
let desc = document.getElementById("desc");
var modal = document.getElementById("myModal");
let shortString = document.getElementById("shorts");
var blueString = document.getElementById("blue");
var playlistString = document.getElementById("playlist");
let radioString = document.getElementById("radio");
let channelString = document.getElementById("channel");
let reelString = document.getElementById("reel");
let YTshortString = document.getElementById("YTshorts");
let YTliveString = document.getElementById("YTLive");

let shelfString = document.getElementById("shelf");
let cardListString = document.getElementById("cardList");

let noti = document.getElementsByClassName("notification-dot");

let flag = 0;
let flagValue = 0;
let updateFlag = 0;
let notificationOpened = false;
let counter = 0;

titleString.addEventListener("change", saveOptions);
desc.addEventListener("change", saveOptions);
thumb.addEventListener("change", saveOptions);
shortString.addEventListener("change", saveOptions);
blueString.addEventListener("change", saveOptions);
playlistString.addEventListener("change", saveOptions);
radioString.addEventListener("change", saveOptions);
channelString.addEventListener("change", saveOptions);
reelString.addEventListener("change", saveOptions);
YTshortString.addEventListener("change", saveOptions);
YTliveString.addEventListener("change", saveOptions);
shelfString.addEventListener("change", saveOptions);
cardListString.addEventListener("change", saveOptions);

const gettingStoredSettings = browser.storage.local.get();
gettingStoredSettings.then(restoreOptions, onError);

function notificationfunction() {
  if (!notificationOpened) {
    document.getElementsByClassName("notification-dot")[0].style =
      "display: inline-block";
  }
}

function notificationfunction2() {
  notificationOpened = true;
  document.getElementsByClassName("notification-dot")[0].style =
    "display: none";
  browser.storage.local.set({ notificationOpened }).then(setItem, onError);
}

function saveOptions(e) {
  e.preventDefault();

  const settingsToStore = {
    title: titleString.checked,
    description: desc.checked,
    thumbnails: thumb.checked,
    shortVideos: shortString.checked,
    blueHighlight: blueString.checked,
    playlistShow: playlistString.checked,
    radioShow: radioString.checked,
    channelShow: channelString.checked,
    reelShow: reelString.checked,
    YTshortVideos: YTshortString.checked,
    liveVideos: YTliveString.checked,
    shelfShow: shelfString.checked,
    cardListShow: cardListString.checked,
  };

  browser.storage.local.set(settingsToStore).then(setItem, onError);
}

function restoreOptions(restoredSettings) {
  titleString.checked = restoredSettings.title;
  desc.checked = restoredSettings.description;
  thumb.checked = restoredSettings.thumbnails;
  shortString.checked = restoredSettings.shortVideos;
  blueString.checked = restoredSettings.blueHighlight;
  playlistString.checked = restoredSettings.playlistShow;
  radioString.checked = restoredSettings.radioShow;
  channelString.checked = restoredSettings.channelShow;
  reelString.checked = restoredSettings.reelShow;
  YTshortString.checked = restoredSettings.YTshortVideos;
  YTliveString.checked = restoredSettings.liveVideos;
  shelfString.checked = restoredSettings.shelfShow;
  cardListString.checked = restoredSettings.cardListShow;
  counter = restoredSettings.counterString;

  notificationBooleanValue = restoredSettings.notificationOpened;
  notificationOpened = notificationBooleanValue;
  if (!notificationBooleanValue) notificationfunction();

  const linkElement = document.querySelector(".love .btn--am");
  if (linkElement) linkElement.textContent = formatNumber(counter);
  function formatNumber(number) {
    return number < 1000 ? number.toString() : (number / 1000).toFixed(1) + "k";
  }
}

function setItem() {
  console.log("saved!");
}

//handling error
function onError(e) {
  console.error(e);
}

/*modal tabs stuff*/
const tabs = document.querySelectorAll("[data-tab-target]");
const tabContents = document.querySelectorAll("[data-tab-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.tabTarget);
    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("active");
    });
    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });
    tab.classList.add("active");
    target.classList.add("active");

    if (target.id == "support") {
      notificationfunction2();
    }
  });
});

for (let i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("activate");
    var content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}
