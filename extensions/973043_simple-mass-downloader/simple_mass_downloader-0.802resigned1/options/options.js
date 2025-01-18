

let isFirefox = !chrome.downloads.onDeterminingFilename;

let bkg, os, sep;
chrome.runtime.getBackgroundPage(function (value) {
	bkg = value;
	if (!bkg) {
		return;
	}
	os = bkg.os;
	sep = bkg.sep;
});

let mainProps = ["defaultDisplayedType", "textFilterSource", "nmax", "nhmax", "throttleInterval", "includeUnstarted", "showInternalLinks", "perpage", "disableAutomaticFolders", "showRecDirs", "showFavDirs", "maxRecDirs", "starFolders", "enableExpFeat", "tabsClose", "tabsApplyMR", "tabsDownloadNow", "exportMask", "recognizeTextLinks"];

let allProps = mainProps.concat(["foldersRules"]);

let backupData = {href: "", name: ""};

chrome.storage.local.get("defaults", setPageOptions);

function onErrorDefaults(err) { console.log(err); }

let foldersRules = {};
let curropts = { refText: "", removedFolders: false };

function stringifyPerpage(perpage) {
	if (perpage.res === perpage.thumb && perpage.res === perpage.down) return perpage.res;
	return `${perpage.res}, ${perpage.thumb}, ${perpage.down}`;
}

function parsePerpage(perpage) {
	let L = perpage.split(/\D/).filter((x) => x.length > 0).map((x) => parseInt(x));
	return { res: L[0], thumb: L[1] || L[0], down: L[2] || L[0] };
}

function parseStarFolders(str) {
	let content = str.replace(/[\r\n]+/g, "\n");
	return content.split("\n").map((line) => line.trim()).filter((line) => line.length > 0);
}

function setPageOptions(obj) {
	let lastErr = chrome.runtime.lastError;
	if (lastErr) {
		onErrorDefaults(lastErr);
		return;
	}
	if (obj.defaults) {
		let disableAutomaticFolders = obj.defaults.disableAutomaticFolders;
		$(`#disable-automatic-folders`).checked = !!disableAutomaticFolders;

		let defaultDisplayedType = obj.defaults.defaultDisplayedType;
		$(`input[name="dtype"][value="${defaultDisplayedType}"]`).checked = true;

		let textFilterSource = obj.defaults.textFilterSource;
		$(`input[name="source"][value="${textFilterSource}"]`).checked = true;

		let nmax = obj.defaults.nmax;
		$(`#nmax`).value = nmax;

		let exportMask = obj.defaults.exportMask;
		$(`#export-mask`).value = exportMask;

		let nhmax = obj.defaults.nhmax;
		$(`#nhmax`).value = nhmax;

		let throttleInterval = obj.defaults.throttleInterval;
		$(`#trottle-interval`).value = throttleInterval;

		let includeUnstarted = obj.defaults.includeUnstarted;
		$(`#include-unstarted`).checked = !!includeUnstarted;

		let showInternalLinks = obj.defaults.showInternalLinks;
		$(`#internal-links`).checked = !!showInternalLinks;

		let recognizeTextLinks = obj.defaults.recognizeTextLinks;
		$(`#recognize-text-links`).checked = !!recognizeTextLinks;

		let perpage = obj.defaults.perpage;
		$(`#perpage`).value = stringifyPerpage(perpage);

		let showRecDirs = obj.defaults.showRecDirs;
		$(`#show-rec-dirs`).checked = !!showRecDirs;

		let showFavDirs = obj.defaults.showFavDirs;
		$(`#show-fav-dirs`).checked = !!showFavDirs;

		let maxRecDirs = obj.defaults.maxRecDirs;
		$(`#max-rec-dirs`).value = maxRecDirs;

		let starFolders = obj.defaults.starFolders;
		$(`#star-folders`).value = starFolders.join("\n");

		let enableExpFeat = obj.defaults.enableExpFeat;
		$(`#enable-exp-feat`).checked = !!enableExpFeat;

		foldersRules = obj.defaults.foldersRules;
		updateSelectForm("");

		for (let prop of mainProps) {
			if (prop === "perpage") curropts[prop] = $(`#perpage`).value;
			else if (prop === "starFolders") curropts[prop] = $(`#star-folders`).value;
			else curropts[prop] = obj.defaults[prop];
		}

		setBackupData(obj.defaults);

		resetRuleSection();
	}
}

function setBackupData(defaults) {

	let keys = Object.keys(defaults);
	for (let key of keys) {
		if (!allProps.includes(key)) delete defaults[key];
	}
	let file = new Blob([JSON.stringify(defaults)], { type: "text/plain;charset=utf-8" });
	let href = URL.createObjectURL(file);

	backupData.href = href;

	let backupName = "Simple Mass Downloader Backup; " + (new Date()).toString().replace(/(GMT.+)/i, "").replace(/:/g, "-").trim() + ".txt";
	backupData.name = backupName;

}

$("#backup-button").addEventListener("click", function () {
	bkg.fakeDownloads[backupData.href] = true;
	chrome.downloads.download({filename: backupData.name, saveAs:true, url: backupData.href}, function(x){
		bkg.fakeDownloads[x] = true;
bkg.fakeDownloadData[x] = {type:"backup", name: backupData.name};
	});
});

$("#restore-from-file").addEventListener("click", function () {
	$("#choose-file").click();
});

$("#choose-file").addEventListener("change", openBackupFile);

function openBackupFile(event) {
	let input = event.target;
	let reader = new FileReader();
	reader.onload = function () {
		let text = reader.result;
		try {
			let opt = JSON.parse(text);
			chrome.storage.local.get("defaults", (defaults) => restoreBackupSettings(defaults, opt));

		}
		catch (err) { }

	};
	reader.readAsText(input.files[0]);
}

function restoreBackupSettings(defaults, opt) {
	let lastErr = chrome.runtime.lastError;
	if (lastErr) {
		onErrorDefaults(lastErr);
		return;
	}
	var wrongs = Object.keys(opt).filter((key) => typeof opt[key] === "undefined");
	for (let key of wrongs) delete opt[key];
	var keys_1 = Object.keys(opt);

	if (defaults) {
		var keys_2 = Object.keys(defaults);
		for (let key of keys_2) {
			if (keys_1.indexOf(key) === -1) {
				opt[key] = defaults[key];
			}
		}
	}

	let keys = Object.keys(opt);
	for (let key of keys) {
		if (!allProps.includes(key)) delete opt[key];
	}

	chrome.storage.local.set({ "defaults": opt }, () => onSuccessSaving(opt, true));
}

function resetRuleSection() {
	$("#rules").value = "";
	$("#rules").disabled = true;
	$("#textarea-div").classList.remove("hidden");
	$("#options-save-button").classList.remove("unsaved");
	$("#remove-directory").disabled = true;
	$("#use-template").disabled = true;
}

$("#options-save-button").addEventListener("click", function () {
	updateFoldersRulesObj();
	chrome.storage.local.get("defaults", collectPageOptions);
});

function getOptStateFromDom() {
	var opt = {};
	opt.defaultDisplayedType = $(`input[name="dtype"]:checked`).value;
	opt.textFilterSource = $(`input[name="source"]:checked`).value;
	opt.nmax = +$("#nmax").value;
	opt.nhmax = +$("#nhmax").value;
	opt.throttleInterval = +$("#trottle-interval").value;
	opt.includeUnstarted = $("#include-unstarted").checked;
	opt.perpage = $("#perpage").value;
	opt.showInternalLinks = $("#internal-links").checked;
	opt.showRecDirs = $(`#show-rec-dirs`).checked;
	opt.showFavDirs = $(`#show-fav-dirs`).checked;
	opt.maxRecDirs = +$(`#max-rec-dirs`).value;
	opt.starFolders = $(`#star-folders`).value;
	opt.enableExpFeat = $(`#enable-exp-feat`).checked;
	opt.disableAutomaticFolders = $("#disable-automatic-folders").checked;
	opt.refText = $("#rules").value;
	opt.exportMask = $("#export-mask").value;
	opt.recognizeTextLinks = $("#recognize-text-links").checked;

	return opt;
}

function collectPageOptions(obj) {
	let lastErr = chrome.runtime.lastError;
	if (lastErr) {
		onErrorDefaults(lastErr);
		return;
	}

	let opt = getOptStateFromDom();
	opt.perpage = parsePerpage($("#perpage").value);
	opt.starFolders = parseStarFolders($(`#star-folders`).value);
	opt.foldersRules = foldersRules;

	var keys_1 = Object.keys(opt).filter((key) => typeof opt[key] != "undefined");

	if (obj.defaults) {
		var keys_2 = Object.keys(obj.defaults);
		for (let key of keys_2) {
			if (keys_1.indexOf(key) === -1) {
				opt[key] = obj.defaults[key];
			}
		}
	}

	chrome.storage.local.set({ "defaults": opt }, () => onSuccessSaving(opt));
}

function onSuccessSaving(opt, reload) {
	let lastErr = chrome.runtime.lastError;
	if (lastErr) {
		onErrorDefaults(lastErr);
		return;
	}
	chrome.runtime.sendMessage({ type: "changed options", info: opt });
	if (reload) setTimeout(() => window.location.reload(), 100);
	else {
		$("#options-save-button").classList.remove("unsaved");

		for (let prop of mainProps) {
			if (prop === "perpage") curropts[prop] = $(`#perpage`).value;
			else if (prop === "starFolders") curropts[prop] = $(`#star-folders`).value;
			else curropts[prop] = opt[prop];
		}

		setBackupData(opt);
	}
}

on({
	type: "click",
	selector: ".mdc-tab",
	container: $("#dynamic-tab-bar")
}, function () {
	let name = this.getAttribute("href");
	let selfpanel = document.getElementById(name.slice(1));
	if (selfpanel.classList.contains("active")) return;
	toggle(name);
});

on({
	type: "change",
	selector: "[name=dtype], [name=source], #internal-links, #nmax, #nhmax, #throttle-interval,  #include-unstarted, #perpage, #disable-automatic-folders, #show-rec-dirs, #show-fav-dirs, #max-rec-dirs, #enable-exp-feat, #export-mask, #recognize-text-links",
	container: $("#content"),
	useCapture: true
}, function () {
	if (testUnsavedState()) $("#options-save-button").classList.add("unsaved");
	else $("#options-save-button").classList.remove("unsaved");
});

on({
	type: "keyup",
	selector: "#rules, #star-folders",
	container: $("body"),
	useCapture: true
}, function () {
	if (testUnsavedState()) $("#options-save-button").classList.add("unsaved");
	else $("#options-save-button").classList.remove("unsaved");
});

on({
	type: "paste",
	selector: "#rules, #star-folders",
	container: $("body"),
	useCapture: true
}, function () {
	if (testUnsavedState()) $("#options-save-button").classList.add("unsaved");
	else $("#options-save-button").classList.remove("unsaved");
});

function testUnsavedState() {
	let result = false;
	if (curropts.removedFolders) result = true;
	let opt = getOptStateFromDom();
	opt.refText = $("#rules").value;

	for (let prop of Object.keys(opt)) {
		if (typeof opt[prop] === "string") {
			if(opt[prop].trim() !== curropts[prop].trim()){
				result = true;
				break;
			}

		}
		else if (opt[prop] !== curropts[prop]) {
			result = true;
			break;
		}
	}
	return result;
}

function toggle(dest) {
	let destPanelStr;
	if (dest) destPanelStr = dest;
	else destPanelStr = $("#panel-1").classList.contains("active") ? "panel-2" : "panel-1";
	if ($(destPanelStr).classList.contains("active")) return;
	$$(".mdc-tab").forEach((tab) => tab.classList.toggle("mdc-tab--active"));
	$(".panel.active").classList.remove("active");
	$(destPanelStr).classList.add("active");
	PopBuilder.hideAll();
	if (dest === "#panel-2") $("#disable-af-div").classList.remove("hidden2");
	else $("#disable-af-div").classList.add("hidden2");
}

if (isFirefox) {
	$$(".square", $("#directory-div")).forEach((el) => el.classList.add("firefox"));
}

let template_1 = $("#template-1");
let popper_1 = new PopBuilder({
	content: template_1,
	handleSelector: "#add-directory",
	relation: "bottom",
	tol: 5,
	align: "RR",
	deviation: 0,
	atClick: false,
	classes: "light-theme",
	trigger: "click",
	updateOn: ["resize"],
	test: function (e) { return !e.ctrlKey; }
});
popper_1.init();

let template_2 = $("#template-2");
let popper_2 = new PopBuilder({
	content: template_2,
	handleSelector: "#rules-help",
	relation: "bottom",
	tol: 5,
	align: "RR",
	deviation: 0,
	atClick: false,
	classes: "light-theme",
	trigger: "click",
	updateOn: ["resize"],
	test: function (e) { return !e.ctrlKey; }
});
popper_2.init();

let template_3 = $("#template-3");
let popper_3 = new PopBuilder({
	content: template_3,
	handleSelector: "#edit-star-folders",
	delegatedHandle: (handle) => handle.closest("fieldset"),
	relation: "bottom",
	tol: 5,
	align: "CC",
	deviation: 0,
	atClick: false,
	classes: "light-theme",
	trigger: "click",

	onBeforeShow: function (e, popup) {
		let rect = popup.handle.closest("fieldset").getBoundingClientRect();
		popup.style.width = parseInt(/* 98 / 100 *  */rect.width) + "px";
	},
});
popper_3.init();

let template_4 = $("#template-4");
let popper_4 = new PopBuilder({
	content: template_4,
	handleSelector: "#exp-feat-help",
	relation: "top",
	tol: 5,
	align: "CC",
	deviation: 0,
	atClick: false,
	classes: "light-theme",
	trigger: "click"
});
popper_4.init();

let template_5 = $("#template-5");
let popper_5 = new PopBuilder({
	content: template_5,
	handleSelector: "#export-mask-help",
	relation: "top",
	tol: 5,
	align: "RR",
	deviation: 0,
	atClick: false,
	classes: "light-theme",
	trigger: "click"
});
popper_5.init();

let template_6 = $("#template-6");
let popper_6 = new PopBuilder({
	content: template_6,
	handleSelector: "#build-file-icons-help",
	relation: "top",
	tol: 5,
	align: "CC",
	deviation: 0,
	atClick: false,
	classes: "light-theme",
	trigger: "click"
});
popper_6.init();

function parseRules(text) {
	if (!text) text = $("#rules").value;
	let content = text.replace(/[\r\n]+/g, "\n");

	let reg = /^(#|((all|ext|url|name|host|text|alt|title)(\s*,\s*)?)+?:)/;
	let lines = content.split("\n")
		.map((line) => line.trim())
		.filter((line) => reg.test(line));
	let sets = [{ label: "", rules: [] }];
	let currentSet;
	for (let line of lines) {
		currentSet = sets[-1 + sets.length];
		if (!line.startsWith("#")) {
			let parts = line.split(":").map((x) => x.trim());

			let props = parts[0].split(",").map((p) => p.trim()).filter((p) => p.length > 0);

			let values = parts[1].split(",").map((x) => x.trim());
			currentSet.rules.push({ prop: props, values: values });
		}
		else {
			currentSet = { label: line, rules: [] };
			sets.push(currentSet);
		}
	}
	return sets.filter((s) => s.rules.length > 0);
}

function stringifyRules(rulesSets) {
	var text = "";
	for (let set of rulesSets) {
		let lines = [];
		let label = set.label;
		if (label) {
			lines.push(label + "\n");

		}
		let rules = set.rules;
		for (let rule of rules) {
			let propLabel = Array.isArray(rule.prop) ? rule.prop.join(", ") : rule.prop;
			let textRule = propLabel + ": " + rule.values.join(", ");
			lines.push(textRule);
		}
		text = text + lines.join("\n") + "\n\n";
	}
	return text;
}

$("#confirm-new-folder").addEventListener("click", function (e) {
	let newDir = $("#define-folder").value.trim();
	if (!newDir) return;

	newDir = newDir.split(/[\\/]/g)
		.map((x) => x.trim())
		.filter((x) => x.length > 0 && x.replace(/./g, ".") !== x)
		.join("/");
	if (newDir === "") return;
	updateSelectForm(newDir);
	$("#rules").disabled = false;
	$("#textarea-div").classList.add("hidden");
	$("#use-template").disabled = false;
	if (!Object.keys(foldersRules).includes(newDir)) {
		$("#rules").value = "";
		curropts.refText = "";
	}
	else {
		onChangeDirectory();
	}
	popper_1.hide();
	$("#define-folder").value = "";
	$("#remove-directory").disabled = true;

});
$("#textarea-div").addEventListener("click", () => popper_1.hide(), true);

$("#set-directory").addEventListener("change", onChangeDirectory);

function onChangeDirectory() {
	let dir = $("#set-directory").value;
	if (!dir) {
		$("#rules").value = "";
		return;
	}
	let setsRules = foldersRules[dir];
	let text = stringifyRules(setsRules);
	$("#rules").value = text;
	curropts.refText = text;
	$("#remove-directory").disabled = false;
	$("#use-template").disabled = false;
	$("#rules").disabled = false;
	$("#textarea-div").classList.add("hidden");
}

$("#remove-directory").addEventListener("click", function (e) {
	let dir = $("#set-directory").value;
	if (!dir) return;
	delete foldersRules[dir];
	updateSelectForm("");
	$("#rules").disabled = true;
	$("#textarea-div").classList.remove("hidden");
	$("#remove-directory").disabled = true;
	$("#use-template").disabled = true;
	$("#rules").value = "";
	curropts.refText = "";
	curropts.removedFolders = true;
	$("#options-save-button").classList.add("unsaved");
});

$("#use-template").addEventListener("click", useHelperTemplate)

function updateSelectForm(selectedValue) {
	var folders = Object.keys(foldersRules);
	var elem = $("#set-directory");
	emptyElem(elem);

	let opt = document.createElement("option");
	opt.textContent = selectedValue;
	opt.value = selectedValue;
	opt.selected = true;
	if (selectedValue === "") {
		opt.hidden = folders.length > 0;
		opt.disabled = true;
		opt.textContent = "Select folder...";
	}
	elem.append(opt);

	for (let folder of folders) {
		if (folder !== selectedValue) {
			let opt = document.createElement("option");
			opt.textContent = folder;
			opt.value = folder;
			opt.selected = true;
			elem.append(opt);
		}
	}

	$("#set-directory").value = selectedValue;
}

function updateFoldersRulesObj() {
	let currentFolder = $("#set-directory").value;
	if (currentFolder === "") return;
	$("#remove-directory").disabled = false;
	let rulesText = $("#rules").value;
	foldersRules[currentFolder] = parseRules(rulesText);
}

function useHelperTemplate() {
	var template = `#Rule-Set-1
ext: pdf, doc, chm
url: word-1, word2
text: word-1, word-2
title: word-1, word-2

#Rule-Set-2
ext: jpg, png, gif
host: word-1, word2
alt: word-1, word-2
name: word-1, word-2
`;
	let old = $("#rules").value.trim();
	if (old) old = old + "\n\n";
	$("#rules").value = old + template;
	$("#options-save-button").classList.add("unsaved");
}

$("#start-icons-building").addEventListener("click", () => {
	chrome.runtime.sendMessage({ type: "start icons building" });
	$("#start-icons-building").textContent = "Building...";
});

function extractData(message/* , sender */) {
	if (message.type === "set backup data") {
		setBackupData(message.info);
	}

	if (message.type === "icons database status") {
		$("#icons-building-status").textContent = message.info.label;
		if(message.info.r === 0) {
			$("#start-icons-building").textContent = "Start";

		}
	}
}

chrome.runtime.onMessage.addListener(extractData);

