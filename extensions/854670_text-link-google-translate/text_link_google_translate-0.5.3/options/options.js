"use strict";

let option;

function localization()
{
	for (const e of document.querySelectorAll("[data-i18n]")) {
		let text = browser.i18n.getMessage(e.dataset.i18n);
		if (text !== "")
			e.insertBefore(document.createTextNode(text), e.firstChild);
		delete e.dataset.i18n;
	}
}

function init()
{
	browser.storage.local.get().then(storage => {
		option = storage;

		for (const e of document.querySelectorAll("[data-key]")) {
			const key = e.dataset.key;
			if (key in storage) {
				if (e.localName === "input" && e.type === "checkbox") {
					e.checked = !!storage[key];
				} else {
					e.value = storage[key];
				}
			}
			e.addEventListener("change", onChangeHandler);
		}
	});
}

function onChangeHandler(event)
{
	const target = event.target;
	const value = (target.localName === "input" && target.type === "checkbox")?
		target.checked:
		target.value;
	const key = target.dataset.key;

	browser.storage.local.set({ [key]: value });
}

localization();
init();
