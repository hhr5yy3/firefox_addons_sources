domReady(() => {
  translateHTML();
  bindCheckboxes();
});

function domReady(callback) {
  if (document.readyState === "complete") {
    callback();
  } else {
    window.addEventListener("load", callback, false);
  }
}

function translateHTML(dataKey = "message") {
  for (const $element of document.getElementsByTagName("*")) {
    if ($element.dataset && $element.dataset[dataKey]) {
      $element.textContent = chrome.i18n.getMessage($element.dataset[dataKey]);
    }
  }
}

function bindCheckboxes() {
  for (const $setting of document.querySelectorAll(".setting")) {
    const $input = $setting.querySelector("input");
    $input.checked = localStorage[$input.name] === "true";
    $setting.addEventListener(
      "change",
      (event) => {
        localStorage[$input.name] = $input.checked;
      },
      false
    );
  }
}
