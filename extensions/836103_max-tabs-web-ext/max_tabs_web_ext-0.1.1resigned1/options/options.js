/*global browser */
function saveOptions(e) {
  let maxTabs = document.getElementById("max-tabs").value;
  browser.storage.sync.set({
    maxTabs: maxTabs
  });
  e.preventDefault();
}

function restoreOptions() {
  var gettingItem = browser.storage.sync.get({
    maxTabs: 10
  });
  gettingItem.then((res) => {
    document.getElementById("max-tabs").value = res.maxTabs;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
