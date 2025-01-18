document.getElementById("reset").addEventListener("click", (e) => {
  if (e.detail === 1) {
    const status = document.getElementById("status");
    window.setTimeout(() => (status.textContent = ""), 750);
    status.textContent = "Double-click to reset!";
  } else {
    localStorage.clear();
    chrome.storage.local.clear(() => {
      chrome.runtime.reload();
      window.close();
    });
  }
});

const notification = document.querySelector("#notification");

function restore() {
  document.querySelector('input[name="top-margin"]').value =
    pfConfig.prefs["print-page-margin"]["top"];
  document.querySelector('input[name="right-margin"]').value =
    pfConfig.prefs["print-page-margin"]["right"];
  document.querySelector('input[name="bottom-margin"]').value =
    pfConfig.prefs["print-page-margin"]["bottom"];
  document.querySelector('input[name="left-margin"]').value =
    pfConfig.prefs["print-page-margin"]["left"];
}

function save() {
  var printPageMargin = {
    top: document.querySelector('input[name="top-margin"]').value,
    right: document.querySelector('input[name="right-margin"]').value,
    bottom: document.querySelector('input[name="bottom-margin"]').value,
    left: document.querySelector('input[name="left-margin"]').value,
  };

  chrome.storage.local.set({
    "print-page-margin": printPageMargin,
  });

  notification.classList.remove("hidden");
  window.setTimeout(() => notification.classList.add("hidden"), 2000);
}

pfConfig.load(restore);
document.getElementById("save").addEventListener("click", save);
