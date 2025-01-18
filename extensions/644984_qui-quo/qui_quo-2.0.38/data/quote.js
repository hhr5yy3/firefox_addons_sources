function injectCopyButton() {
	var copyBtns = document.querySelectorAll("#control-panel .copy-quote2, #control-panel .copy-quote-selected");
	copyBtns.forEach((b) => {
		b.onclick = onQuoteCopy;
	});
}

async function onQuoteCopy(e) {
	const copiedQuote= getNodeProperty(document.querySelector('#editors-bin textarea:not(.hide)'), '', 'value');
	const quoteNumber = getParameterByName('id');
	if (copiedQuote ) {
		await setStorageDataAsync({copiedQuote, quoteNumber});
	}
	sendMessageToAddon("copy quote");
}

function logError(msg, e) {
	var data = {
			title: msg,
			url: document.location.href};

	if ( e != null ) {
		if ( e.stack != null )
			data.stack = e.stack;
		if ( e.message != null )
			data.title = data.title + " - " + e.message;
	}

	sendMessageToAddon("error", data);
}

function onLoadQuote(e) {
	var quoteId = document.querySelector("#quote-id").textContent.replace("№", "").trim();
	try {
   		sendMessageToAddon("load quote", quoteId);
	} catch ( e ) {
		logError("failed to load quote", e);
		sendMessageToAddon("showerrorpage");
	}
}

function injectLoadButton() {
	// TODO remove this part
	var copyBtn = document.querySelector("#copy-btn");

	if ( copyBtn != null ) {
		var img = document.createElement("img");
		img.setAttribute("src", "/img/glyphicons_229_retweet_2.png");

		var btn = document.createElement("button");
		btn.setAttribute("id", "load-btn");
		btn.setAttribute("title", "Загрузить список туров, чтобы создать на его основе новый");
		btn.setAttribute("style", "float: left;");
		btn.appendChild(img);
		btn.appendChild(document.createTextNode("Загрузить"));
		btn.onclick = onLoadQuote;

	    copyBtn.parentNode.insertBefore(btn, copyBtn);
	}
	// end of remove

	document.querySelectorAll("#control-panel .load-quote").forEach(loadBtn => {
		loadBtn.setAttribute("style", "");
		loadBtn.onclick = onLoadQuote;
	});
}

injectCopyButton();
injectLoadButton();

if ( (window !== window.top && document.location.href.match(/render/)) || document.location.href.match(/quote\/items/) ) {
	initAddToursScript()
}
