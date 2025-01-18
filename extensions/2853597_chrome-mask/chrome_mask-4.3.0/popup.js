const enabledHostnames = new EnabledHostnamesList();

async function getActiveTab() {
  const tabs = await browser.tabs.query({ active: true, currentWindow: true });
  if (tabs.length < 1) {
    throw new Error("could not get active tab");
  }

  return tabs[0];
}

async function updateUiState() {
  const activeTab = await getActiveTab();
  const currentUrl = new URL(activeTab.url);
  const currentProtocol = currentUrl.protocol;
  const currentHostname = currentUrl.hostname;
  const maskStatus = document.getElementById("maskStatus");
  const fancyContainer = document.querySelector("section.fancy_toggle_container");
  const checkbox = document.getElementById("mask_enabled");
  const webcompatLink = document.createElement("a");
  const bugzillaLink = document.createElement("a");
  const reportBrokenSite = document.getElementById("reportBrokenSite");

  if (currentProtocol == "moz-extension:" || currentHostname == "") {
    maskStatus.innerText = browser.i18n.getMessage("maskStatusUnsupported");
    fancyContainer.style.display = "none";
  } else if (enabledHostnames.contains(currentHostname)) {
    maskStatus.innerText = browser.i18n.getMessage("maskStatusOn");
    checkbox.checked = true;
  } else {
    maskStatus.innerText = browser.i18n.getMessage("maskStatusOff");
    checkbox.checked = false;
  }

  webcompatLink.href = linkWithSearch("https://webcompat.com/issues/new", [["url", activeTab.url]]);
  webcompatLink.innerText = browser.i18n.getMessage("webcompatLinkText");

  bugzillaLink.href = linkWithSearch("https://bugzilla.mozilla.org/enter_bug.cgi", [
    ["bug_file_loc", activeTab.url],
    ["component", "Site Reports"],
    ["product", "Web Compatibility"],
    ["short_desc", `${currentHostname} - Site needs Chrome UA spoof`],
    ["status_whiteboard", "[webcompat-source:chrome-mask-extension]"],
  ]);
  bugzillaLink.innerText = browser.i18n.getMessage("bugzillaLinkText");

  reportBrokenSite.innerHTML = browser.i18n.getMessage("reportBrokenSite", [
    webcompatLink.outerHTML,
    bugzillaLink.outerHTML,
  ]);
}

function linkWithSearch(base, searchParamsInit) {
  const url = new URL(base);
  const searchParams = new URLSearchParams(searchParamsInit);
  url.search = searchParams.toString();
  return url.toString();
}

document.addEventListener("DOMContentLoaded", async () => {
  await enabledHostnames.load();
  await updateUiState();

  document.getElementById("mask_enabled").addEventListener("change", async (ev) => {
    const activeTab = await getActiveTab();
    const currentHostname = new URL(activeTab.url).hostname;

    if (!currentHostname) {
      ev.target.checked = false;
      return;
    }

    if (ev.target.checked) {
      await enabledHostnames.add(currentHostname);
    } else {
      await enabledHostnames.remove(currentHostname);
    }

    await updateUiState();
  });
});
