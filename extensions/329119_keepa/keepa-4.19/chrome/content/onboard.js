document.querySelector("#acceptCookies").addEventListener('click', () => {
	chrome.storage.local.remove("optOutCookies");
	chrome.storage.local.set({install: Date.now()}, () => {
		chrome.runtime.sendMessage({
			type: "restart",
		});
		setTimeout(window.close, 10)
	});
	return false;
});

document.querySelector("#declineCookies").addEventListener('click', () => {
	let uninstalling = browser.management.uninstallSelf({showConfirmDialog: false});
	uninstalling.then(null, (error)=>{
		console.log(`Canceled: ${error}`);
		window.close();
	});

	chrome.storage.local.remove("install");
	return false;
});