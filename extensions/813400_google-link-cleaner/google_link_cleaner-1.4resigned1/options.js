const {storage} = browser;

function saveOptions(e) {
  storage.local.set({
    "enable_notifications": e.target.checked,
  });
}

function restoreOptions(e) {
  var checkbox = document.querySelector('input[type="checkbox"]');
  checkbox.addEventListener("click", saveOptions);
  
  storage.local.get("enable_notifications").then(res => {
    if ("enable_notifications" in res && res["enable_notifications"] != true) {
      return;
    }
    checkbox.checked = true; // default
  });
}

document.addEventListener("DOMContentLoaded", restoreOptions);
