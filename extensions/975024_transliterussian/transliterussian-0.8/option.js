function saveOptions(e) {
  browser.storage.sync.set({
    razkladka: document.querySelector("#razkladka").value
  });
  e.preventDefault();
}

function restoreOptions() {
  var gettingItem = browser.storage.sync.get('razkladka');
  gettingItem.then((res) => {
    document.querySelector("#razkladka").value = res.razkladka || 'default';
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);