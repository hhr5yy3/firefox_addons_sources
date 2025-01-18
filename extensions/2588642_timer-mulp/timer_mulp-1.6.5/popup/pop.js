		
 
	document.addEventListener("mousedown", (e) => {

	 chrome.windows.getCurrent(currentWindow => {
    chrome.windows.remove(currentWindow.id);
  });
	});

