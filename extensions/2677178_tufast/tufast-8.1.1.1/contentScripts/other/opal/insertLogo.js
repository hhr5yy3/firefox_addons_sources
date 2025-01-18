function colorStep(noOfSteps = 10) {
  const color = document.documentElement.style.getPropertyValue("--counter-color");
  if (!color) {
    document.documentElement.style.setProperty("--counter-color", "hsl(0, 100%, 50%)");
    return;
  }
  const hsl = color.trim().match(/^hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)$/)?.slice(1).map((n) => parseInt(n, 10));
  if (hsl?.length !== 3)
    return;
  hsl[0] += Math.round(360 / noOfSteps) % 360;
  document.documentElement.style.setProperty("--counter-color", `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`);
}
function resetColor() {
  document.documentElement.style.removeProperty("--counter-color");
}
(async () => {
  const {selectedRocketIcon, isEnabled, fwdEnabled, foundEasteregg} = await chrome.storage.local.get(["selectedRocketIcon", "isEnabled", "fwdEnabled", "foundEasteregg"]);
  if (!isEnabled && !fwdEnabled)
    return;
  const iconPath = (() => {
    try {
      const parsed = JSON.parse(selectedRocketIcon);
      return parsed && parsed.iconPathUnlocked ? parsed.iconPathUnlocked : "/assets/icons/RocketIcons/default_128px.png";
    } catch (e) {
      return "/assets/icons/RocketIcons/default_128px.png";
    }
  })();
  const iconURL = chrome.runtime.getURL(iconPath);
  const onClickSettings = {
    counter: 0,
    screenOverlayTimeout: void 0,
    blocker: false,
    timeUp: true,
    overlay: void 0
  };
  const logo = document.createElement("img");
  logo.src = iconURL;
  logo.id = "TUfastIcon";
  logo.title = "Powered by TUfast. Enjoy :)";
  document.getElementsByClassName("page-header")[0]?.appendChild(document.createElement("h1")).appendChild(logo);
  const onClickWhenFound = () => {
    if (onClickSettings.timeUp)
      chrome.runtime.sendMessage({cmd: "open_settings_page", params: "rocket_icons_settings"});
  };
  if (foundEasteregg) {
    logo.addEventListener("click", onClickWhenFound);
    return;
  }
  logo.addEventListener("click", () => {
    if (onClickSettings.blocker && !onClickSettings.timeUp)
      return;
    onClickSettings.counter++;
    if (!onClickSettings.overlay) {
      onClickSettings.overlay = document.createElement("div");
      onClickSettings.overlay.id = "counter";
      document.body.prepend(onClickSettings.overlay);
    } else {
      if (onClickSettings.screenOverlayTimeout)
        clearTimeout(onClickSettings.screenOverlayTimeout);
    }
    colorStep();
    let timeout;
    if (onClickSettings.counter === 10) {
      logo.src = chrome.runtime.getURL("assets/icons/RocketIcons/7_128px.png");
      logo.onclick = onClickWhenFound;
      chrome.runtime.sendMessage({cmd: "easteregg_found"});
      onClickSettings.overlay.style.fontSize = "100px";
      timeout = 3e3;
      onClickSettings.blocker = true;
      onClickSettings.overlay.innerHTML = "&#x1F680; &#x1F680; &#x1F680;";
    } else {
      onClickSettings.overlay.style.fontSize = "150px";
      timeout = 1e3;
      onClickSettings.blocker = false;
      onClickSettings.overlay.innerHTML = onClickSettings.counter.toString();
    }
    onClickSettings.timeUp = false;
    onClickSettings.screenOverlayTimeout = setTimeout(() => {
      if (onClickSettings.overlay)
        document.body.removeChild(onClickSettings.overlay);
      onClickSettings.overlay = void 0;
      onClickSettings.counter = 0;
      onClickSettings.timeUp = true;
      resetColor();
    }, timeout);
  });
})();
