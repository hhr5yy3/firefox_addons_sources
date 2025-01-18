

let recentFolders = [], starFolders = [];

let report, qid, total = 0;

window.parent.postMessage({ type: "quick.js ready" }, "*");

chrome.runtime.sendMessage({ type: "request folder list" });

chrome.runtime.onMessage.addListener(extractData);

function extractData(message, sender) {
	if (message.type === "folder list") {
		recentFolders = message.info.recentFolders;
		starFolders = message.info.starFolders;
	}
}

function handleResponse(info) {
	qid = info.qid;
	report = info.report;
	showExtData(info.report);
}

function showExtData(report) {
	if (rtype === "multi") {
		let L = Object.keys(report).map((key) => {
			total = total + report[key];
			return { ext: key, nr: report[key] };
		});
		for (let obj of L) {
			makeExtUnit(obj);
		}
		let b = document.getElementById("to-list");
		b.textContent = `ADD ITEMS TO LIST[${total}]`;
	}

	if (rtype === "multi") document.getElementById("to-list").focus();
	else {
		document.getElementById("to-download").disabled = false;
		document.getElementById("to-download").focus();
	}
}

function makeExtUnit(obj) {
	let ext = obj.ext;
	let nr = obj.nr;
	createCheckboxUnit(ext, nr);
}

function count() {
	let result = 0;
	document.querySelectorAll("#extensions input").forEach((elem) => {
		if (elem.checked) result = result + report[elem.id];
	});
	return result;
}

on({
	type: "change",
	selector: "input",
	container: document.getElementById("extensions")
},
	function () {
		let n = count();
		let b1 = document.getElementById("to-list");
		let b2 = document.getElementById("to-download");

		if (n === 0) {
			b2.disabled = true;
			b2.textContent = `DOWNLOAD NOW`;
			b1.textContent = `ADD ITEMS TO LIST[${total}]`;
		}
		else {
			b2.disabled = false;
			b2.textContent = `DOWNLOAD NOW[${n}]`;
			b1.textContent = `ADD ITEMS TO LIST[${n}]`;
		}
	});

function activateField(field) {
	let label = $("label", field.parentElement);
	if (label) label.classList.add("mdc-text-field__label--float-above");
	let line = $(".mdc-text-field__bottom-line", field.parentElement);
	line.classList.add("mdc-text-field__bottom-line--active");
}

on({
	type: "focus",
	selector: "#directory",
	container: document.body,
	useCapture: true
},
	function () {
		activateField(this);
	});

on({
	type: "blur",
	selector: "#directory",
	container: document.body,
	useCapture: true
},
	function () {
		let label = $("label", this.parentElement);
		let value = this.value.trim();
		let is_empty = (value === "");
		if (is_empty) {
			if (label) label.classList.remove("mdc-text-field__label--float-above");
			let line = $(".mdc-text-field__bottom-line", this.parentElement);
			line.classList.remove("mdc-text-field__bottom-line--active");
		}
	});

function createCheckboxUnit(ext, nr) {
	let p = document.getElementById("extensions");
	let unit = createElem({ tag: "DIV", attrs: { "class": "unit" } });
	p.append(unit);
	let outerdiv = createElem({ tag: "DIV", attrs: { "class": "unit mdc-checkbox customcheck" } });
	let label = createElem({ tag: "LABEL", text: `${ext.toUpperCase()} (${nr})`, attrs: { "for": ext } });
	unit.append(outerdiv, label);
	let input = createElem({ tag: "INPUT", attrs: { type: "checkbox", "class": "mdc-checkbox__native-control", id: ext } });
	let div_1 = createElem({ tag: "DIV", attrs: { "class": "mdc-checkbox__background" } });

	outerdiv.append(input, div_1);
	let svg = createElem({ tag: "svg", xmlns: "http://www.w3.org/2000/svg", attrs: { "class": "mdc-checkbox__checkmark", viewBox: "0 0 24 24" } });
	let div_2 = createElem({ tag: "DIV", attrs: { "class": "mdc-checkbox__mixedmark" } });
	div_1.append(svg, div_2);
	let path = createElem({ tag: "path", xmlns: "http://www.w3.org/2000/svg", attrs: { "class": "mdc-checkbox__checkmark__path", fill: "none", stroke: "white", d: "M1.73,12.91 8.1,19.28 22.79,4.59" } });
	svg.append(path);

	return p;
}

document.getElementById("to-list").addEventListener("click", function () {
	let exts = [];
	if (rtype === "multi") {
		document.querySelectorAll("#extensions input").forEach((elem) => {
			if (elem.checked) exts.push(elem.id);
		});
	}
	let directory = document.getElementById("directory").value.trim();
	chrome.runtime.sendMessage({ type: "add items to datacenter", exts: exts, qid: qid, directory: directory });
	window.parent.postMessage({ type: "close quick dialog" }, "*");
});

document.getElementById("to-download").addEventListener("click", function () {
	let exts = [];
	if (rtype === "multi") {
		document.querySelectorAll("#extensions input").forEach((elem) => {
			if (elem.checked) exts.push(elem.id);
		});
	}

	let directory = document.getElementById("directory").value.trim();
	chrome.runtime.sendMessage({ type: "download items now", exts: exts, qid: qid, directory: directory });
	window.parent.postMessage({ type: "close quick dialog" }, "*");

});

window.document.addEventListener("click", onIframeClick, false);
window.document.addEventListener("contextmenu", onIframeClick, false);

function onIframeClick(e) {
	if (e.target.closest("#content") || e.target.closest(".popup")) return;
	window.parent.postMessage({ type: "close quick dialog" }, "*");
}

window.addEventListener("message", receiveMessage, false);
function receiveMessage(event) {
	let message = event.data;
	if (message.type === "report") {
		handleResponse(message);
	}
}

function adjustInterface(rtype) {
	if (rtype !== "multi") {

		document.getElementById("dir-label").textContent = `Set directory for this ${rtype}`;
		let b1 = document.getElementById("to-list");
		let b2 = document.getElementById("to-download");
		b2.disabled = false;
		b1.textContent = `ADD ${rtype.toUpperCase()} TO LIST`;
		b1.classList.add("minimal");
		b2.classList.add("minimal");
	}
}

adjustInterface(rtype);

function selectFolder(li) {
	let folder = li.textContent;
	let popup = li.closest(".popup");
	let input = $("input", popup.handle);
	let label = $(".mdc-text-field__label", input.closest(".mdc-text-field"));
	label.classList.add("mdc-text-field__label--float-above");
	input.value = folder;
	li.closest(".popup").hide();
	setTimeout(() => {
		label.classList.remove("notransition");
	}, 300);
	let button = $("button", input.parentElement);
	if(button) button.classList.remove("hidden");

}

function moveACselected(ul, dir) {
	let sel = $(".ac-selected", ul);
	if (!sel) return;
	let lis = Array.from($$(`.custom-list-item:not(.hidden)`, ul));
	let index = lis.findIndex((el) => el.classList.contains("ac-selected"));
	let next = index === lis.length - 1 ? 0 : index + 1;
	let prev = index === 0 ? lis.length - 1 : index - 1;
	sel.classList.remove("ac-selected");
	let el = dir === "up" ? lis[prev] : lis[next];
	el.classList.add("ac-selected");
	if (dir === "down") {
		if (!testInside(el, ul.closest(".popup"))) el.scrollIntoView({ block: "end", inline: "nearest" });
	}
	else {
		if (!testInside(el, ul.closest(".popup"))) el.scrollIntoView({ block: "start", inline: "nearest" });
	}
}

function testac(content, text) {
	content = content.toLowerCase();
	let parts = text.toLowerCase().split(/\s+/);
	for (let part of parts) {
		if (content.search(part) === -1) return false;
	}
	return true;

}

function onACkeyup(div, popper, e) {

	let text = div.querySelector("input").value.toLowerCase().trim();
	let ul = $("ul", popper.popup);
	if (e.keyCode === 38) {
		moveACselected(ul, "up");
		return;
	}
	else if (e.keyCode === 40) {
		moveACselected(ul, "down");
		return;
	}
	else if (e.keyCode === 13) {
		let li = $(".ac-selected", ul);
		if (li) selectFolder(li);
		return;
	}

	popper.manualShow(div, function (popup) {
		if (!popper.initialized) {
			popper.onBeforeShow(undefined, popper.popup);
			popper.initialized = true;
		}
		$$(".custom-list-item").forEach((el) => {
			let content = el.textContent;
			el.classList.remove("ac-selected");
			if (text === "") el.classList.remove("hidden");
			else if (testac(content, text)) el.classList.remove("hidden");
			else el.classList.add("hidden");
		});

		let first = $(`.custom-list-item:not(.hidden)`, popup);
		if (first) first.classList.add("ac-selected");
	});
}

function makeFoldersList(recentList, starList, parent) {
	emptyElem(parent);
	let text = parent.closest(".popup").handle.querySelector("input").value.trim();
	recentList = minus(recentList, starList);
	for (let folder of recentList) {
		let li = createElem({ tag: "LI", text: folder, attrs: { "class": "mdc-list-item custom-list-item recent-folder" } });
		parent.append(li);
		if (!testac(folder, text)) li.classList.add("hidden");
	}
	for (let folder of starList) {
		let li = createElem({ tag: "LI", text: folder, attrs: { "class": "mdc-list-item custom-list-item star-folder" } });
		parent.append(li);
		if (!testac(folder, text)) li.classList.add("hidden");
	}
	if (recentList.length + starList.length === 0) {
		let text = "No defined favorite folders.";

		chrome.runtime.sendMessage({ type: "empty list notification", info:  { title: "Empty list", text: text }});
	}

	let first = $(`.custom-list-item:not(.hidden)`, parent);
	if (first) first.classList.add("ac-selected");
}

let template_1 = $("#template-1");

on({ type: "click", selector: `li`, container: template_1 }, function () {
	let folder = this.textContent;
	let popup = this.closest(".popup");
	let input = $("input", popup.handle);
	let label = $(".mdc-text-field__label", input.closest(".mdc-text-field"));
	label.classList.add("mdc-text-field__label--float-above");
	input.value = folder;
	this.closest(".popup").hide();
	setTimeout(() => label.classList.remove("notransition"), 300);
});

on({ type: "keyup", selector: `#directory-div`, container: $("#content") }, function (e) {
	onACkeyup(this, popper_1, e);
	disableHover(popper_1.popup);
});

let popper_1 = new PopBuilder({
	content: template_1,
	handleSelector: "#directory-div",

	relation: "bottom",
	tol: 0,
	align: "LL",
	deviation: 0,
	atClick: false,
	classes: "light-theme-simple",
	trigger: "dblclick",
	persistOn: ["resize"],
	test: function (e) { return !e.ctrlKey; },
	onBeforeShow: function (e, popup) {
		let input = $("input", popup.handle);
		$(".mdc-text-field__label", input.closest(".mdc-text-field")).classList.add("notransition");
		let parent = $("#folders-list-D");
		let rect = popup.handle.getBoundingClientRect();
		popup.style.minWidth = rect.width + "px";
		makeFoldersList(recentFolders, starFolders, parent);
	},

	onShow: function(e, popup){
		let visible = $$(`li:not(.hidden)`, popup).length > 0;
		if(!visible) popup.classList.add("vhidden");
		else popup.classList.remove("vhidden");
	}
});
popper_1.init();

function dezactivateField(field) {
	let label = $("label", field.parentElement);
	let value = field.value.trim();
	let is_empty = (value === "");
	if (is_empty) {
		if (label) label.classList.remove("mdc-text-field__label--float-above");
		let line = $(".mdc-text-field__bottom-line", field.parentElement);
		if (line) line.classList.remove("mdc-text-field__bottom-line--active");
	}
}

on({
	type: "click",
	selector: ".close-button",
	container: document.body
},
	function () {
		let input = $("input[type=text]", this.parentElement);
		input.value = "";
		dezactivateField(input);

		this.classList.add("hidden");

	});

on({
	type: "keyup",
	selector: ".input-text",
	container: document.body
},
	function () {
		let button = $("button", this.parentElement);
		if (this.value.length) 	button.classList.remove("hidden");		
		else button.classList.add("hidden");
	});

