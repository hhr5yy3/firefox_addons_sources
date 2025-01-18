function findActiveElementInDocument (doc) {
	//handles frames too, but only if it's ok for same origin policy
	//selection in frames which hurt the same origin policy cannot be retrieved
	let activeElem = (doc && doc.activeElement);
	return ((activeElem && activeElem.contentWindow && findActiveElementInDocument (activeElem.contentWindow.document)) || activeElem);
}

var RealSelection = (function () { //"Immediately-invoked function expression"
	//console.log ("RealSelection constructor?");
	var activeElem = findActiveElementInDocument (document);
	var activeDoc = (activeElem && activeElem.ownerDocument);
	var activeWindow = (activeDoc && (activeDoc.defaultView || activeDoc.parentWindow));
	
	function isInInputField () {
		return (activeElem && ("value" in activeElem) && activeElem.selectionEnd > activeElem.selectionStart);
	}
	
	function getSelectionObject () {
		return (activeWindow ? activeWindow.getSelection () : window.getSelection ());
	}
	
	return {
		getSelectedText: function () {
			let selectedText = "";
			if (isInInputField ()) {
				selectedText = activeElem.value.substring (activeElem.selectionStart, activeElem.selectionEnd);
			} else {
				let selection = getSelectionObject ();
				if (selection) {
					selectedText = selection.toString ();
				}
			}
			return selectedText;
		},
		
		replaceSelectedText: function (newText) {
			if (isInInputField ()) {
				activeElem.value = activeElem.value.substring (0, activeElem.selectionStart) + newText + activeElem.value.substring (activeElem.selectionEnd);
			} else {
				let selection = getSelectionObject ();
				if (selection) {
					var range = selection.getRangeAt(0);
					range.deleteContents ();
					range.insertNode (document.createTextNode (newText));
				}
			}
			return true;
		}
	};
}());

//console.log ("LOADTRACE: selectionManager.js executed!");
chrome.runtime.onMessage.addListener (function requestHandler (request, sender, sendResponse) {
	//console.log ("selectionManager called!");
	chrome.runtime.onMessage.removeListener (requestHandler); //because every execution adds the listener again and again...
	if (request.action === 'getSelectedText') {
		var selectedText = RealSelection.getSelectedText ();
		//console.log ("Send selected text from selectionManager.js: " + selectedText);
		sendResponse ({action: 'getSelectedText', selectedText: selectedText});
	} else if (request.action === 'replaceSelectedText') {
		var ok = RealSelection.replaceSelectedText (request.newText);
		sendResponse ({action: 'replaceSelectedText', succeeded:ok});
	} else {
		console.error ("Unknown action request selectionManager.js!", {"request":request});
	}
});