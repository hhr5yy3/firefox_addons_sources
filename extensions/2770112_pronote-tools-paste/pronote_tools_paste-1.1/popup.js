browser.tabs.query({active: true, currentWindow: true}, (tabs) => {
	
	if (tabs[0] === undefined || !tabs[0].title.includes("PRONOTE")) {
		const errorMessageSpan = document.querySelector("#extErrorMessage")
		errorMessageSpan.textContent = "Vous devez être connecté sur Pronote"
		document.querySelector(".connected").hidden = true
		return
	}
	
	document.querySelector("#updateNotes").addEventListener("click", (e) => {
		browser.scripting.executeScript({
			target: {tabId: tabs[0].id},
			func: () => false,
		}, results => {
			if(!results[0].result){
				browser.scripting.executeScript({
					target: {tabId: tabs[0].id},
					files: ["/updateNotes.js"]
				});
			}
			
			window.close();
		});
	})
});