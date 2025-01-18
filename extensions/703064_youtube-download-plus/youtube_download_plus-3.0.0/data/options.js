function saveOptions(e) {
	e.preventDefault();
	
	let newOptions = {
	  openNewTab: document.querySelector('#openNewTab').checked,
	  mp3URL: document.querySelector('#mp3URL').value,
	  mp4URL: document.querySelector('#mp4URL').value
	}
	
	browser.storage.local.set({
		options: newOptions
	});
	
	browser.runtime.sendMessage({'action': 'updateOptions'});
}

function restoreOptions() {
  function setCurrentOptions(result) {
    document.querySelector("#openNewTab").checked = result.options.openNewTab;
    document.querySelector("#mp3URL").value = (typeof result.options.mp3URL !== 'undefined' ? result.options.mp3URL : '');
    document.querySelector("#mp4URL").value = (typeof result.options.mp4URL !== 'undefined' ? result.options.mp4URL : '');
    document.querySelector("#description").textContent = browser.i18n.getMessage('optionsDescription');
  }

  function onError(error) {
  }

  browser.storage.local.get("options").then(setCurrentOptions, onError);
}

function initOptionEvents() {
	restoreOptions();
	
	document.querySelector("#settings").addEventListener("submit", saveOptions);
}

document.addEventListener("DOMContentLoaded", initOptionEvents);

