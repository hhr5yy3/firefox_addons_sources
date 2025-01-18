

let bkg, ss, os, sep, wid, resPager, thumbPager, downPager;
chrome.runtime.getBackgroundPage(function (value) {
	bkg = value;
	if (!bkg) {
		document.body.style.width = "300px";
		document.body.style.height = "40px";
		document.body.style.textAlign = "center";
		document.body.style.padding = "1rem";
		document.body.style.fontSize = "1rem";
		document.body.textContent = "Extension don't work in private browsing mode";
		return;
	}
	os = bkg.os;
	sep = bkg.sep;
	init();
});

chrome.windows.getCurrent({ populate: true }, (windowInfo) => {
	wid = windowInfo.id;
});

$("#settings").addEventListener("click", () => {
	chrome.runtime.openOptionsPage();
	window.close();
});

$("#ratio").addEventListener("click", () => {
	adjustUI();
});

let helpDataTab = { url: "/ui/help.html" };
$("#general-help").addEventListener("click", () => {
	chrome.tabs.create(helpDataTab);
	window.close();
});

let faqTab = { url: "https://gelprec.github.io/faq.html" };
$("#faq").addEventListener("click", () => {
	chrome.tabs.create(faqTab);
	window.close();
});

let userReportTab = { url: "https://docs.google.com/forms/d/e/1FAIpQLSf2lAQv7kQ0g1eyfwMmx8nCEDlrBkKyZ8z3y9wow1nZ62cPFQ/viewform" };
$("#user-report").addEventListener("click", () => {
	chrome.tabs.create(userReportTab);
	window.close();
});

$("#open-download-directory").addEventListener("click", () => {
	chrome.downloads.showDefaultFolder();
});

document.body.addEventListener("contextmenu", function (e) {
	e.preventDefault();
}, false);

let dnames = { "name": "File name", "url": "Url", "text": "Text", "title": "Title", "alt": "Alt text" };

let statusDict = { "listed": "listed", "fetch-A": "listed", "fetch-B": "fetching metadata", "fetch-C": "metadata fetched", "down-B": "downloading", "paused": "paused", "error-warning": "error-warning", "down-C": "done", "user-canceled": "user-canceled", "down-A": "starting download" };

let icon_dict = {
	info: {
		svgcls: "icon middle small willnotrender", paths: [
			{ tag: "path", xmlns: "http://www.w3.org/2000/svg", attrs: { fill: "none", d: "M0 0h24v24H0z" } },
			{ tag: "path", xmlns: "http://www.w3.org/2000/svg", attrs: { d: "M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z" } },
		]
	},
	"down-C": {
		svgcls: "icon middle small pad willnotrender", paths: [
			{ tag: "path", xmlns: "http://www.w3.org/2000/svg", attrs: { fill: "none", d: "M0 0h24v24H0z" } },
			{ tag: "path", xmlns: "http://www.w3.org/2000/svg", attrs: { d: "M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" } },
		]
	},
	"error-warning": {
		svgcls: "icon middle small pad willnotrender", paths: [
			{ tag: "path", xmlns: "http://www.w3.org/2000/svg", attrs: { fill: "none", d: "M0 0h24v24H0z" } },
			{ tag: "path", xmlns: "http://www.w3.org/2000/svg", attrs: { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" } },
		]
	},
	paused: {
		svgcls: "icon middle small pad willnotrender", paths: [
			{ tag: "path", xmlns: "http://www.w3.org/2000/svg", attrs: { d: "M6 19h4V5H6v14zm8-14v14h4V5h-4z" } },
			{ tag: "path", xmlns: "http://www.w3.org/2000/svg", attrs: { fill: "none", d: "M0 0h24v24H0z" } }
		]
	},
	listed: {
		svgcls: "icon middle pad willnotrender", paths: [
			{ tag: "path", xmlns: "http://www.w3.org/2000/svg", attrs: { d: "M8 5v14l11-7z" } },
			{ tag: "path", xmlns: "http://www.w3.org/2000/svg", attrs: { fill: "none", d: "M0 0h24v24H0z" } }
		]
	},
	edit: {
		svgcls: "icon middle small willnotrender", paths: [
			{ tag: "path", xmlns: "http://www.w3.org/2000/svg", attrs: { d: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" } },
			{ tag: "path", xmlns: "http://www.w3.org/2000/svg", attrs: { fill: "none", d: "M0 0h24v24H0z" } }
		]
	},
	copy: {
		svgcls: "icon middle smallest copy willnotrender", paths: [
			{ tag: "path", xmlns: "http://www.w3.org/2000/svg", attrs: { d: "M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm-1 4l6 6v10c0 1.1-.9 2-2 2H7.99C6.89 23 6 22.1 6 21l.01-14c0-1.1.89-2 1.99-2h7zm-1 7h5.5L14 6.5V12z" } },
			{ tag: "path", xmlns: "http://www.w3.org/2000/svg", attrs: { fill: "none", d: "M0 0h24v24H0z" } }
		]
	},
	folder: {
		svgcls: "icon middle smaller willnotrender", paths: [
			{ tag: "path", xmlns: "http://www.w3.org/2000/svg", attrs: { d: "M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z" } },
			{ tag: "path", xmlns: "http://www.w3.org/2000/svg", attrs: { fill: "none", d: "M0 0h24v24H0z" } }
		]
	},
	remove: {
		svgcls: "icon middle smaller willnotrender", paths: [
			{ tag: "path", xmlns: "http://www.w3.org/2000/svg", attrs: { d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" } },
			{ tag: "path", xmlns: "http://www.w3.org/2000/svg", attrs: { fill: "none", d: "M0 0h24v24H0z" } }
		]
	},
	file: {
		svgcls: "icon middle smaller willnotrender", paths: [
			{ tag: "path", xmlns: "http://www.w3.org/2000/svg", attrs: { d: "M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z" } },
			{ tag: "path", xmlns: "http://www.w3.org/2000/svg", attrs: { fill: "none", d: "M0 0h24v24H0V0z" } }
		]
	}
};

icon_dict["user-canceled"] = icon_dict["error-warning"];
icon_dict["fetch-A"] = icon_dict["listed"];
icon_dict["fetch-B"] = icon_dict["listed"];
icon_dict["fetch-C"] = icon_dict["listed"];
icon_dict["down-A"] = icon_dict["listed"];
icon_dict["down-B"] = icon_dict["listed"];

let defaultFileIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACEElEQVRYhe2XsZLaMBCGfyfmmAMSGJ7k6stkGOBxrsprpKG5VEdDYV6DV7hH4A2SSUOj1aawZdaWtLIIXaKZHayV0ffvaiUB8K+3IuSsqooBgJmFAQwGAj7Xr4cZ5aj89ftyWX97eXm/SVVVVUxEnhlppm+GrbV8PB75fD7z237/c7fbPaVYH0JOZgYAWGtB1oKoNksEkmYJhq5mrQUALJdLbNabxWQ6PaVEqAI8f/sUXLm2ERHm889YrVaL8ePk9F0RoQoIywDgxiMvGGNARPg0m+Hrl+fFbDw+xaYqlfnRVRGTw+hn5HA4dCEPD4s8AQ7G0udaUfeaD8k3hrDZbkUAjPJjiepYxfhhATIF3Im88NNfOCV1m89FsMwoyzK6VIBSA6zBA0L9FRJBKAoSu6BowALWLjd70fcxrq8JiBehhDZg5y/AYFl4oeg7ycnNgCsyB5ZaWMKvoFj09VeyM8DXuQW4FiTSHoSzrmawALfHuIEWIuoE3OPnZqCeoSnAwsfE0h6Co7ktswR0MtCDBsGRyN27WhEOPgnDYB2eujPiAtqDKNV0+F+cAyl0fPv14a6fKSAA7D1qV/UddgH7J6EGTYBuLsJ0DbRk9d2bivAe4CHzDayBzmi88u8noHcUIw8YmDBTQFMFQ1ciyVfG1J9ko1F4OFvALTXw+vqjORG7f7uuPndt+77WD9H/3yLtD31m5EbWJHnAAAAAAElFTkSuQmCC"; /* "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAFESURBVFiF7ZexTsMwEIb/S4Lagakj78AKHXkIB/EMICVSF5A74A5ErGl5CggPwIDECkyIZ2DrxEYgOgaSwmCTuEkDgvyTddb998lnxzHw30WmiR2lvMH8ZdtxnY0qRgx+voyjq0YA/H21zl56DWDL0m+STCNlk+DoguymB0sUB4BjEUgrAE8bJd5cLA7RbpkJMY8YGH6BQNWV0AOA3GKUxCcXZSYikD4+AT4gQtlP4uioLFfbgkbEOBShPP05gIoQqwWoALF6gBzCD8ajygDMbPxALc/AQ13ccArslEwj41EVgeTvcttpQQdgC0BEjW9CK4A21QH8WoBuE3YArcl0G2bFQIRjv1YFXlyGmW7a9Ff8CKa93OC8FkBhSfygi2tbkPayGQH3TRTOdYvX3pkWzJRh+zQzivE0H6zd3Sj1Vsvnz+odU0dZzy8ZWtEAAAAASUVORK5CYII="; */

function createCheckboxUnit(parent, checked) {
	let p = parent || document.createDocumentFragment();
	let outerdiv = createElem({ tag: "DIV", attrs: { "class": "mdc-checkbox customcheck" } });
	p.append(outerdiv);
	let input = createElem({ tag: "INPUT", attrs: { type: "checkbox", "class": "mdc-checkbox__native-control" } });
	input.checked = checked;
	let div_1 = createElem({ tag: "DIV", attrs: { "class": "mdc-checkbox__background" } });
	outerdiv.append(input, div_1);
	let svg = createElem({ tag: "svg", xmlns: "http://www.w3.org/2000/svg", attrs: { "class": "mdc-checkbox__checkmark", viewBox: "0 0 24 24" } });
	let div_2 = createElem({ tag: "DIV", attrs: { "class": "mdc-checkbox__mixedmark" } });
	div_1.append(svg, div_2);
	let path = createElem({ tag: "path", xmlns: "http://www.w3.org/2000/svg", attrs: { "class": "mdc-checkbox__checkmark__path", fill: "none", stroke: "white", d: "M1.73,12.91 8.1,19.28 22.79,4.59" } });
	svg.append(path);
	return p;
}

function insertIcon(parent, icon, extracls) {
	let obj = icon_dict[icon];
	let cls = obj.svgcls;
	if (extracls) cls = cls + " " + extracls;
	let svg = createElem({ tag: "svg", xmlns: "http://www.w3.org/2000/svg", attrs: { "class": cls, viewBox: "0 0 24 24", fill: "#000000", height: "24", width: "24" } });
	emptyElem(parent);
	parent.append(svg);
	let paths = obj.paths.map(path => createElem(path));
	svg.append(...paths);
}

function adjustUI(options) {
	let opt = options || {};
	let cycle = { "normal": "compact", "compact": "confortable", "confortable": "normal" };
	let type = cycle[bkg.uiAppearance];
	if (opt.forced_type) type = opt.forced_type;
	bkg.uiAppearance = type;
	let removables = [cycle[type], cycle[cycle[type]]];
	for (let selector of ["html", "body", "#pics"]) {
		$(selector).classList.remove(...removables);
		$(selector).classList.add(type);
	}
	if (!opt.init) { adjustPag(); }
}

function tuneThumbGrid() {
	let type = bkg.uiApperance;
	let n = type === "normal" ? 4 : (type === "compact" ? 3 : 6);
	if (bkg.perpage.thumb % n > 0) bkg.perpage.thumb = bkg.perpage.thumb + n - bkg.perpage.thumb % n;
}

function adjustPag() {
	let currPager = resPager;
	if (ss.panel === "downloads") currPager = downPager;
	else if (ss.showPictures) currPager = thumbPager;
	if (currPager) currPager.resize();
	tuneThumbGrid();
}

function initUI() {
	adjustUI({ forced_type: bkg.uiAppearance, init: true });

	for (let name of Object.keys(ss.inputs)) {
		let value = ss.inputs[name];
		if (value) {
			let elem = document.getElementById(name);
			if (["directory", "extensions", "textfilter", "mr-directory", "mr-mask", "mr-search", "mr-replace", "sc-textfilter", "sc-textfilter-source", "sc-extensions", "edit-directory", "edit-mask", "tb-tabfilter", "tb-textfilter", "pt-textfilter", "tb-textfilter-source", "tb-extensions"].includes(name)) {
				elem.value = value;
				activateField(elem);
			}
			else if (["mr-case", "mr-reg", "mr-first", "tb-only-pictures"].includes(name)) {
				elem.checked = value;
			}
			else if (["w-slider", "h-slider"].includes(name)) {
				elem.value = value;
				setSliderLabelValue(elem);
			}
		}
	}

	if (ss.fresh) {
		let elem = document.getElementById("directory");
		elem.value = bkg.lastDirectory;
		if (elem.value) {
			activateField(elem);
			ss.inputs["directory"] = elem.value;
		}
	}

	$(`input[name=tb-radio][value=${ss.inputs["tb-radio"]}]`).checked = true;
	$("#displayed-name").textContent = dnames[ss.displayedType];
	$("#throttle").checked = ss.throttleMode;
	$("#gallery").classList.toggle("activated", ss.showPictures);

	$("#main-check").checked = ss.mainCheckActivated;
	$("#images-main-check").checked = ss.imagesMainCheckActivated;

	if (os !== "win") {
		$$(`.popup button, .popup textarea, .popup input[type="text"], .popup select, #mr-bottom label`).forEach((el) => el.classList.add("linux"));
	}
	else {
		$$(`#template-2 button, #edit-textarea-div button`).forEach((el) => el.classList.add("win"));
	}

	if (bkg.isChrome) {
		$("#resources").classList.add("chrome");
		$$(".chrome").forEach((el) => el.classList.remove("hidden"));
	}
	else {
		$$("#header_1 .slider-label").forEach((label) => label.classList.add("firefox"));
		$$(".firefox").forEach((el) => el.classList.remove("hidden"));
	}

	setExpFeatUI();
}

$("#open-chrome-settings").addEventListener("click", () => {
	chrome.tabs.create({ url: "chrome://settings/?search=downloading" });
});

function initPags(currPager) {
	resPager = createPagination({
		itemsCount: ss.filteredList.length,
		perpage: bkg.perpage.res,
		parent: $("#resources-pager"),
		pageAction: resPageAction,
		onPagesCountChange: onResPCchange,
		name: "res"
	});

	tuneThumbGrid();

	thumbPager = createPagination({
		itemsCount: ss.filteredListPics.length,
		perpage: bkg.perpage.thumb,
		parent: $("#thumbnails-pager"),
		pageAction: thumbPageAction,
		onPagesCountChange: onThumbPCchange,
		name: "thumb"
	});

	downPager = createPagination({
		itemsCount: ss.baseList2.length,
		perpage: bkg.perpage.down,
		parent: $("#downloads-pager"),
		pageAction: downPageAction,
		onPagesCountChange: onDownPCchange,
		name: "down"
	});

	let pags = { resPager: resPager, thumbPager: thumbPager, downPager: downPager };
	pags[currPager].init();
	let dims = pags[currPager].dims;
	let others = Object.keys(pags).filter((key) => key != currPager);
	for (let other of others) {
		pags[other].dims = dims;
		pags[other].init();
	}
	return pags;
}

function init() {

	ss = bkg.session;
	if (ss.baseList.length + ss.baseList2.length > 200) $(".loader").classList.remove("hidden");
	bkg.updateFilteredList();
	initUI();
	toggle(ss.panel);

	ss.opened = true;
	initiatePopups();

	updateContor();
	testForMainCheck();

	if (ss.fresh) {

		postInit();
		if (ss.baseList2.length > 0) $("#download-tab").textContent = `Download List [${ss.baseList2.length}]`;
	}
	else postInit();
}

function postInit() {
	if (bkg.pageIndicator) ss.cp["resPager"] = bkg.pageIndicator;
	let currPager = "resPager";
	if (ss.panel === "downloads") currPager = "downPager";
	else if (ss.showPictures) currPager = "thumbPager";
	let pags = initPags(currPager);
	setView(ss.showPictures);
	pags[currPager].setCurrentPage(ss.cp[currPager], { activate: true });

	if (currPager === "downPager" && ss.freshDownloads) {
		ss.freshDownloads = false;
		requestAnimationFrame(function () {
			let relem = $("#middle_2");
			relem.scrollTo(0, relem.scrollHeight);
		});
	}
	setTimeout(() => {
		let others = Object.keys(pags).filter((key) => key != currPager);
		for (let other of others) {
			pags[other].setCurrentPage(ss.cp[other], { activate: true });
		}

		$(".loader").classList.add("hidden")
	}, 200);
	let u = ss.menuNotification.u;
	let v = ss.menuNotification.v;
	if (u + v > 0) {
		let added = v > 0 ? `${u}/${u + v}` : `${u}`;
		let text = u === 1 ? "link was" : "links were";
		let notifMessage = `${added} ${text} added via page context menu.${v > 0 ? "\n" + v + " links already in list." : ""}`;
		notify({ text: notifMessage });
		ss.menuNotification.u = 0;
		ss.menuNotification.v = 0;
	}
}

function createPagination(opt) {
	return new SmdPag({
		parent: opt.parent,
		itemsCount: opt.itemsCount,
		perpage: opt.perpage,
		prevText: "Prev",
		nextText: "Next", 
		pageAction: opt.pageAction,
		onPagesCountChange: opt.onPagesCountChange,
		tols: "auto",
		autoOverflow: true,
		name: opt.name
	});

}

function getSublist(L, perpage, k) { return L.slice((k - 1) * perpage, k * perpage); }

function resPageAction(k, info) {
	ss.cp.resPager = k;
	let L = getSublist(ss.filteredList, bkg.perpage.res, k);
	ss.resPageRids = L;

	let bool = onPageUnchanged($("#resources tbody"), makeResourceRow, L, info);
	if (!bool) {
		emptyElem($("#resources tbody"));
		restoreResourcesTable(L);
	}

	$("#middle_1").scrollTo({
		top: 0/* ,
		behavior: "smooth" */
	});
}

function onResPCchange(bool) {
	if (ss.showPictures) return;
	if (bool) {
		$("#middle_1").classList.remove("paginated");
	}
	else {
		$("#middle_1").classList.add("paginated");
		adjustPag();
	}
}

function thumbPageAction(k, info) {
	requestAnimationFrame(() => {
		ss.cp.thumbPager = k;
		let L = getSublist(ss.filteredListPics, bkg.perpage.thumb, k);
		ss.thumbPageRids = L;
		let bool = onPageUnchanged($("#pics"), makeThumbUnit, L, info);
		if (!bool) {
			emptyElem($("#pics"));
			restorePicsGrid(L);
		}
		$("#middle_1").scrollTo({
			top: 0
		});
	});
}

function onThumbPCchange(bool) {
	if (!ss.showPictures) return;
	if (bool) {
		$("#middle_1").classList.remove("paginated");

	}
	else {
		$("#middle_1").classList.add("paginated");
		adjustPag();
	}
}

function auxTest(L, T) {
	if (T.length === 1) return true;
	let S = T.map((rid) => L.indexOf(rid));
	for (let i = 1; i < S.length; ++i) {
		if (S[i] < S[i - 1]) return false;
	}
	return true;
}

function onPageUnchanged(parent, action, L, opts) {
	if (!opts.pageChanged) {
		let dict = {}, removables = [], T = [];
		let unit = action === makeThumbUnit ? ".divpic" : "tr";
		$$(unit, parent).forEach((unit) => {
			let rid = unit.getAttribute("rid");
			if (L.includes(rid)) {
				dict[rid] = unit;
				T.push(rid);
			}
			else removables.push(unit);
		});
		if (auxTest(L, T)) {
			removables.forEach((unit) => unit.remove());
			let lastUnit = "begin";
			L.forEach((rid) => {
				if (dict[rid]) lastUnit = dict[rid];
				else {
					let data = bkg.datacenter[rid];
					let newunit = action === makeDownloadRow ? action(data)
						: action(data, "", data.checked);
					insertAfter(parent, newunit, lastUnit);
					lastUnit = newunit;
				}
			});
			return true;
		}
	}
	return false;
}

function downPageAction(k, opts) {
	ss.cp.downPager = k;
	let L = getSublist(ss.baseList2, bkg.perpage.down, k);
	ss.downPageRids = L;
	let bool = onPageUnchanged($("#downloadlist tbody"), makeDownloadRow, L, opts);
	if (!bool) {
		emptyElem($("#downloadlist tbody"));
		restoreOrUpdateDownPage(L);
	}
	ss.queue.filter((rid) => ss.downPageRids.includes(rid))
		.forEach((rid) => $(`#downloadlist tr[rid="${rid}"] .icon`).classList.add("scheduled"));

	if (!opts.noScroll) $("#middle_2").scrollTo({ top: 0 });
}

function onDownPCchange(bool) {
	if (bool) { $("#middle_2").classList.remove("paginated"); }
	else { $("#middle_2").classList.add("paginated"); adjustPag(); }
}

function extractData(message/* , sender */) {
	if (message.type === "fill resources table") {

		fillResourcesTable(message.info);
	}
	else if (message.type === "setIcon") {
		setIcon(message.info);
	}
	else if (message.type === "call showProgressInfo") {
		showProgressInfo(message.info);
	}
	else if (message.type === "unselect") {
		let tr = $(`#downloadlist tr[rid=${message.rid}]`);
		if (tr) sel($(".name-td", tr), false);
	}
	else if (message.type === "call updateUIAfterFetch") {
		updateUIAfterFetch(message.info.rid);
	}
	else if (message.type === "call prepareUpdatePopups") {
		prepareUpdatePopups(message.info.rid, message.info.resizeNeeded);
	}
	else if (message.type === "reset download bar") {
		resetDownloadBar(message.info.rid);
	}
	else if (message.type === "call showTabsScanProgress") {
		showTabsScanProgress(message.info, message.end);
	}
	else if (message.type === "call insertExternalDownload") {
		insertExternalDownload(message.info);
	}
	else if (message.type === "call updateFilename") {
		updateFilename(message.info);
	}
	else if (message.type === "call useHistoryInfo") {
		useHistoryInfo(message.info);
	}
	else if (message.type === "update thumbnails dims") {
		updateThumbnailsDims(message.info);
	}
	else if (message.type === "call postInit") {
		postInit();
	}
	else if (message.type === "call removeDownItem") {
		removeDownItem(message.info.rid);
	}
	else if (message.type === "notification") {
		notify(message.info);
	}
	else if (message.type === "update downloads view") {
		updateDownloadsView();
	}
	else if (message.type === "remove fake external row") {
		removeFakeExternalRow(message.info);
	}
	else if (message.type === "tabs post action") {
		tabsPostActionUI();
	}
	else if (message.type === "call setIconUrl") {
		setIconUrl(message.info);
	}
	else if (message.type === "update file icons for baseList") {
		updateFileIconsForBaseList(message.info);
	}
	else if (message.type === "call populateProximityTable") {
		populateProximityTable(message.info);
	}
	else if (message.type === "reset proximity data") {
		resetProximityData();
	}
	else if (message.type === "call getProximityMasks_prepare2") {
		getProximityMasks_prepare2();
	}
	else if (message.type === "hide loader") {
		$(".loader").classList.add("hidden");
	}
	else if (message.type === "show loader") {
		$(".loader").classList.remove("hidden");
	}

}

function updateFileIconsForBaseList(info) {
	$$("#resources tbody tr").forEach((tr) => {
		let rid = tr.getAttribute("rid");
		let data = bkg.datacenter[rid];
		if (bkg.e2m[data.ext] === bkg.e2m[info.ext]) {
			$(".fileIcon", tr).src = info.src;
		}
	});
}

function tabsPostActionUI() {
	$("#tb-results").classList.remove("tb-almost-done");
}

function removeDownItem(rid) {
	let tr = $(`#downloadlist tr[rid="${rid}"]`);
	if (tr) {
		tr.remove();
		downPager.setCurrentPage(0, { activate: true, itemsCount: ss.baseList2.length, noScroll: true });
	}
}

function removeFakeExternalRow(rid) {
	let tr = $(`#downloadlist tr[rid="${rid}"]`);
	if (tr) {
		tr.remove();
		downPager.setCurrentPage(0, { activate: true, itemsCount: ss.baseList2.length, noScroll: true });
	}
}

function setExpFeatUI() {
	$$(".exp-feat").forEach((el) => {
		if (bkg.enableExpFeat) el.classList.remove("hidden");
		else el.classList.add("hidden");
	});
}

chrome.runtime.onMessage.addListener(extractData);

on({
	type: "click",
	selector: ".mdc-tab",
	container: $("#dynamic-tab-bar")
}, function () {
	let name = this.getAttribute("href");
	let selfpanel = document.getElementById(name.slice(1));
	if (ss.fresh && name === "#panel-2") this.textContent = "Download List";
	if (selfpanel.classList.contains("active")) {
		if (ss.panel === "downloads" || ss.showPictures === false) return;
		let el = $("#gallery");
		el.classList.toggle("activated", false);
		ss.showPictures = false;
		setView(false);
		el.blur();
	}
	toggle(name === "#panel-1" ? "resources" : "downloads");
	adjustPag();
});

function toggle(dest) {
	let destPanelStr;
	if (dest === "resources") destPanelStr = "panel-1";
	else if (dest === "downloads") destPanelStr = "panel-2";
	else destPanelStr = $("#panel-1").classList.contains("active") ? "panel-2" : "panel-1";
	if (document.getElementById(destPanelStr).classList.contains("active")) return;
	$$(".mdc-tab").forEach((tab) => tab.classList.toggle("mdc-tab--active"));
	$(".panel.active").classList.remove("active");
	document.getElementById(destPanelStr).classList.add("active");
	PopBuilder.hideAll();
	ss.panel = dest;
}

function activateField(field) {
	let label = $("label", field.parentElement);
	if (label) label.classList.add("mdc-text-field__label--float-above");
	let line = $(".mdc-text-field__bottom-line", field.parentElement);
	if (line) line.classList.add("mdc-text-field__bottom-line--active");
	let button = $("button", field.parentElement);
	if (button && field.value.length) button.classList.remove("hidden");
}

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
	type: "focus",
	selector: "#directory, #extensions, #textfilter, #sc-textfilter, #pt-textfilter, #sc-extensions, #mr-replace, #mr-search, #mr-mask, #mr-directory, #edit-directory, #edit-mask, #tb-tabfilter, #tb-textfilter, #tb-extensions",
	container: document.body,
	useCapture: true
},
	function () {
		activateField(this);
	});

on({
	type: "blur",
	selector: "#directory, #extensions, #textfilter, #sc-textfilter, #pt-textfilter, #sc-extensions, #mr-replace, #mr-search, #mr-mask, #mr-directory, #edit-directory, #edit-mask, #tb-tabfilter, #tb-textfilter, #tb-extensions",
	container: document.body,
	useCapture: true
},
	function () {
		dezactivateField(this);
		ss.inputs[this.id] = this.value.trim();
	});

function setSelectFieldStyle(field, activate) {
	let line = $(".mdc-line-ripple", field.parentElement);
	if (activate) line.classList.add("mdc-line-ripple--active");
	else line.classList.remove("mdc-line-ripple--active");
}

on({
	type: "focus",
	selector: "#sc-textfilter-source, #tb-textfilter-source",
	container: document.body,
	useCapture: true
},
	function () {
		setSelectFieldStyle(this, true);
	});

on({
	type: "blur",
	selector: "#sc-textfilter-source, #tb-textfilter-source",
	container: document.body,
	useCapture: true
},
	function () {
		setSelectFieldStyle(this, false);
		ss.inputs[this.id] = this.value;
	});

on({
	type: "change",
	selector: "#mr-case, #mr-reg, #mr-first, #tb-only-pictures, #tb-largest",
	container: document.body
},
	function () {
		ss.inputs[this.id] = this.checked;
	});

on({
	type: "click",
	selector: ".close-button",
	container: document.body
},
	function () {
		let input = $("input[type=text]", this.parentElement);
		input.value = "";
		dezactivateField(input);
		ss.inputs[input.id] = "";
		this.classList.add("hidden");
		if (input.id === "extensions") onExtensionsChanged();
		if (input.id === "textfilter") onTextFilterChanged();
	});

on({
	type: "keyup",
	selector: ".input-text",
	container: document.body
},
	function () {
		let button = $("button", this.parentElement);
		if (this.value.length) button.classList.remove("hidden");
		else button.classList.add("hidden");
	});

function setView(checked) {
	if (checked) {
		$("#resources").classList.add("hidden");
		$("#pics").classList.remove("hidden");
		$("#gallery-actions").classList.remove("hidden");
		if (resPager) {
			resPager.parent.classList.add("hidden");
			thumbPager.parent.classList.remove("hidden");
			let onePage = thumbPager.parent.classList.contains("smd-one-page");
			$("#middle_1").classList.toggle("paginated", !onePage);
		}

	}
	else {
		$("#resources").classList.remove("hidden");
		$("#pics").classList.add("hidden");
		$("#gallery-actions").classList.add("hidden");
		if (resPager) {
			thumbPager.parent.classList.add("hidden");
			resPager.parent.classList.remove("hidden");
			let onePage = resPager.parent.classList.contains("smd-one-page");
			$("#middle_1").classList.toggle("paginated", !onePage);
		}

	}
	testEmptyGallery();
	updateContor();
}

$("#gallery").addEventListener("click", function () {
	this.classList.toggle("activated");
	let checked = this.classList.contains("activated");
	ss.showPictures = checked;
	setView(checked);
	this.blur();
	if (checked) bkg.requestFurtherGalleryInfo();
	adjustPag();
});

function testEmptyGallery() {
	if (ss.filteredListPics.length === 0 && ss.showPictures) $("#noimages").classList.remove("hidden");
	else $("#noimages").classList.add("hidden");
}

function updateThumbnailsDims(rids) {
	rids.forEach((rid) => {
		let unit = $(`#pics div[rid="${rid}"]`);
		if (unit) {
			let data = bkg.datacenter[rid];
			let dimsElem = $(".pic-dims", unit);
			dimsElem.textContent = `${data.naturalWidth} × ${data.naturalHeight}`;
		}
	});
}

function updateResourcesViews(onlyPictures) {
	bkg.updateFilteredList();
	if (!onlyPictures) resPager.setCurrentPage(1, { activate: true, itemsCount: ss.filteredList.length });
	thumbPager.setCurrentPage(1, { activate: true, itemsCount: ss.filteredListPics.length });
	updateContor();
	testForMainCheck();
	testEmptyGallery();
}

function uncheckDescriptor() {
	let rids = Object.keys(bkg.datacenter);
	for (let rid of rids) bkg.datacenter[rid].checked = false;
}

function fillResourcesTable(info) {
	bkg.updateFilteredList();
	updateContor();

	if (!info.parentRid) {
		resPager.setCurrentPage(bkg.pageIndicator, { activate: true, itemsCount: ss.filteredList.length });
		requestAnimationFrame(() => {
			thumbPager.setCurrentPage(1, { activate: true, itemsCount: ss.filteredListPics.length });

			bkg.addHistoryInfo({ newRids: info.newRids, batchId: info.batchId }, bkg.requestHistoryInfoUsage);
		});
	}

	if (info.parentRid) {
		resPager.setCurrentPage(0, { activate: true, itemsCount: ss.filteredList.length });
		thumbPager.setCurrentPage(0, { activate: true, itemsCount: ss.filteredListPics.length });
	}

	testForMainCheck();
	if (!info.parentRid && !(info.origin === "tabs")) PopBuilder.hideAll();

}

function restoreOrUpdateDownPage(L) {
	let F = [];
	for (let rid of L) {
		let data = bkg.datacenter[rid];
		F.push(makeDownloadRow(data));
	}
	$("#downloadlist tbody").append(...F);
}

function restoreResourcesTable(L) {
	let F1 = [], F2 = [], cst = 300;
	let first = Math.min(cst, L.length);
	let K1 = L.slice(0, first);
	let K2 = L.slice(first, L.length);
	for (let rid of K1) {
		let data = bkg.datacenter[rid];
		F1.push(makeResourceRow(data, "", bkg.datacenter[rid].checked));
	}
	$("#resources tbody").append(...F1);
	testForMainCheck();
	if (K2.length > 0) {
		requestAnimationFrame(function () {
			for (let rid of K2) {
				let data = bkg.datacenter[rid];
				F2.push(makeResourceRow(data, "", bkg.datacenter[rid].checked));
			}
			$("#resources tbody").append(...F2);
			testForMainCheck();
		});
	}

}

function restorePicsGrid(L) {
	let F1 = [], F2 = [], cst = 300;
	let first = Math.min(cst, L.length);
	let K1 = L.slice(0, first);
	let K2 = L.slice(first, L.length);
	for (let rid of K1) {
		let data = bkg.datacenter[rid];
		F1.push(makeThumbUnit(data, "", bkg.datacenter[rid].checked));
	}
	$("#pics").append(...F1);
	testForMainCheck();
	if (K2.length > 0) {
		requestAnimationFrame(function () {
			for (let rid of K2) {
				let data = bkg.datacenter[rid];
				F2.push(makeThumbUnit(data, "", bkg.datacenter[rid].checked));
			}
			$("#pics").append(...F2);

		});
	}

}

$("#loadlinks").addEventListener("click", function (e) {
	$(".loader").classList.remove("hidden")
	resetFilters();
	if (!e.ctrlKey) {
		uncheckDescriptor();
		bkg.cleanDatacenterBeforeFillTable();
		emptyElem($("#resources tbody"));
		emptyElem($("#pics"));
		resPager.setCurrentPage(1, { activate: false, itemsCount: 0 });
		thumbPager.setCurrentPage(1, { activate: false, itemsCount: 0 });
	}

	chrome.tabs.query({ windowId: wid, active: true }, function (T) {
		bkg.startPageExtraAction("button", T[0].id);
		$("#gallery").blur();
		$("#gallery").classList.toggle("activated", false);
		ss.showPictures = false;
		setView(false);
	});

	bkg.pageIndicator = 1;

});

function makeResourceRow(data, extraclasses, checked) {
	let extracls = extraclasses || "";
	if (data.cls) extracls = extracls + " " + data.cls;
	let clsext = data.fakeext ? "ext-td fakeext" : "ext-td";
	let name = data[ss.displayedType] || data.name;
	let wrong = data[ss.displayedType] ? "" : "wrong";
	let done = bkg.ok[data.initialUrl] ? "done" : "";
	let past = data.history ? "past" : "";
	let smd = data.smd ? "smd" : "";

	let tr = createElem({ tag: "TR", attrs: { "class": `regular  ${done} ${past} ${extracls} ${smd}`, rid: `${data.rid}`, category: `${data.category}` } });

	let td_1 = createElem({ tag: "TD", attrs: { "class": "start-td check-td" } });
	let td_2 = createElem({ tag: "TD", attrs: { "class": `mdl-data-table__cell--non-numeric resname info ${wrong}`, rid: `${data.rid}`, title: `${name}`, extra: "no" } });
	let td_3 = createElem({ tag: "TD", text: `${data.ext.slice(0, 5)}`, attrs: { "class": `${clsext}` } });
	tr.append(td_1, td_2, td_3);
	createCheckboxUnit(td_1, checked);
	let cell = createElem({ tag: "DIV", attrs: { "class": "cell" } });
	let fileIconCell = createElem({ tag: "DIV", attrs: { "class": "type-cell" } });
	td_2.append(fileIconCell, cell);

	let fileIconSrc = data.fileIcon || bkg.fileIcons[data.ext] || defaultFileIcon;
	let fileIcon = createElem({ tag: "IMG", attrs: { "class": "fileIcon willnotrender", src: fileIconSrc, width: "16", "height": "16" } });
	fileIconCell.append(fileIcon);

	let cell_content = createElem({ tag: "DIV", text: `${name}`, attrs: { "class": "cell-overflow" } });
	cell.append(cell_content);
	tr.rid = data.rid;
	return tr;
}

function useHistoryInfo(L) {
	for (let rid of L) {
		if (bkg.datacenter[rid].history && ss.resPageRids.includes(rid)) {
			let tr = $(`#resources tr[rid="${rid}"]`);
			if (tr) tr.classList.add("past");
			let unit = $(`#pics div[rid="${rid}"]`);
			if (unit) unit.classList.add("past");
		}
	}
}

on({ type: "load", selector: ".pic img", container: $("#pics"), useCapture: true }, function () {
	let unit = this.closest("[rid]");
	let data = bkg.datacenter[unit.getAttribute("rid")];
	let dims = $(".pic-dims", unit);
	let w = this.naturalWidth;
	let h = this.naturalHeight;
	if (dims) dims.textContent = `${data.naturalWidth || w} × ${data.naturalHeight || h}`;

	addThumbInfo(data, this);

});

function makeThumbUnit(data, extraclasses, checked) {
	let extracls = extraclasses || "";
	let done = searchDictionary(bkg.datacenter, [["initialUrl", data.initialUrl], ["status", "down-C"]]).length > 0 ? "done" : "";
	let past = data.history ? "past" : "";
	let title = data.alt || data.text || data.name || data.mainUrl || "";
	let unit = createElem({ tag: "DIV", attrs: { "class": `divpic ${done} ${past} ${extracls}`, rid: `${data.rid}`, category: `${data.category}`, title: `${title}` } });
	let div_1 = createElem({ tag: "DIV", attrs: { "class": "pic" } });
	let div_2 = createElem({ tag: "DIV", attrs: { "class": "pic-footer" } });
	unit.append(div_1, div_2);
	let img = createElem({ tag: "IMG", attrs: { "src": `${data.thumb || data.helperSrc || data.mainUrl}`, crossorigin: "anonoymous" } });
	div_1.append(img);
	createCheckboxUnit(div_2, checked);
	let div_2a = createElem({ tag: "DIV", attrs: { "class": "pic-dims" } });
	let div_2b = createElem({ tag: "DIV", text: `${data.ext || ""}`, attrs: { "class": "pic-ext" } });
	div_2.append(div_2a, div_2b);
	return unit;
}

function uncheckWhenCompleted(rid) {
	if (!ss.checkedList.includes(rid)) return;
	let data = bkg.datacenter[rid];
	if (!data) {
		return;
	}
	data.checked = false;
	ss.checkedList.splice(ss.checkedList.indexOf(rid), 1);
	let item = $(`#resources tr[rid="${rid}"] input[type="checkbox"]`);
	if (item) item.checked = false;
	if (data.category === "image") {
		let unit = $(`#pics div[rid="${rid}"] input[type="checkbox"]`);
		if (unit) unit.checked = false;
	}
	testForMainCheck();
}

on({
	type: "click",
	selector: "input[type='checkbox']",
	container: $("#resources tbody")
},
	function (e) {
		let rid = this.closest("tr").getAttribute("rid");
		let checked = this.checked;
		bkg.datacenter[rid].checked = checked;
		if (checked) {
			ss.checkedList.push(rid);
			bkg.addFetchInfo([rid]);
		}
		else ss.checkedList.splice(ss.checkedList.indexOf(rid), 1);
		if (bkg.datacenter[rid].category === "image") {
			let unit = $(`#pics div[rid="${rid}"] input[type='checkbox']`);
			if (unit) unit.checked = checked;
		}
		rangeAction(e, this, rid);
		testForMainCheck();
	});

on({
	type: "click",
	selector: "input[type='checkbox']",
	container: $("#pics")
},
	function (e) {
		let rid = this.closest(".divpic").getAttribute("rid");
		let checked = this.checked;
		bkg.datacenter[rid].checked = checked;
		if (checked) {
			ss.checkedList.push(rid);
			bkg.addFetchInfo([rid]);
		}
		else ss.checkedList.splice(ss.checkedList.indexOf(rid), 1);
		let reselm = $(`#resources tr[rid="${rid}"] input[type='checkbox']`);
		if (reselm) reselm.checked = checked;
		rangeAction2(e, this, rid);
		testForMainCheck();
	});

$("#main-check").addEventListener("change", function () {
	let checked = this.checked;
	ss.mainCheckActivated = checked;
	let N = [];

	$$(`#resources .regular input`).forEach(function (el) {
		el.checked = checked;
	});

	$$(`#pics .divpic input[type='checkbox']`).forEach(function (el) {
		el.checked = checked;
	});

	for (let rid of ss.filteredList) {
		if (checked && !bkg.datacenter[rid].checked) {
			N.push(rid);
			ss.checkedList.push(rid);
		}
		if (!checked) ss.checkedList.splice(ss.checkedList.indexOf(rid), 1);
		bkg.datacenter[rid].checked = checked;
	}

	testForMainCheck();
});

$("#images-main-check").addEventListener("change", function () {
	let checked = this.checked;
	ss.imagesMainCheckActivated = checked;
	let N = [];

	$$(`#resources .regular input`).forEach(function (el) {
		let rid = el.closest("tr").getAttribute("rid");
		if (ss.filteredListPics.includes(rid)) el.checked = checked;
	});

	$$(`#pics .divpic input[type='checkbox']`).forEach(function (el) {
		el.checked = checked;
	});

	for (let rid of ss.filteredListPics) {
		if (checked && !bkg.datacenter[rid].checked) {
			N.push(rid);
			ss.checkedList.push(rid);
		}
		if (!checked) ss.checkedList.splice(ss.checkedList.indexOf(rid), 1);
		bkg.datacenter[rid].checked = checked;
	}

	testForMainCheck();
});

function sortPics() {
	ss.baseListPics.sort((x, y) => {
		let imgx = bkg.datacenter[x];
		let imgy = bkg.datacenter[y];
		let sizex = (imgx.naturalWidth || 0) * (imgx.naturalHeight || 0);
		let sizey = (imgy.naturalWidth || 0) * (imgy.naturalHeight || 0);
		return sizey - sizex;
	});
	bkg.updateFilteredList();
	thumbPager.setCurrentPage(1, { activate: true, itemsCount: ss.filteredListPics.length });
}

$("#sortPics").addEventListener("click", function () {
	this.blur();
	sortPics();
});

$("#textfilter").addEventListener("focus", () => $("#help-filter").classList.remove("hidden"));
$("#directory").addEventListener("focus", () => $("#help-dir").classList.remove("hidden"));
$("body").addEventListener("click", (event) => {

	if (!event.target.closest("#help-filter-div, #textfilter, #template-19")) {
		$("#help-filter").classList.add("hidden");
	}

	if (!event.target.closest("#help-dir-div,  #directory, #template-19")) {
		$("#help-dir").classList.add("hidden");
	}
});

$("#addToPassiveQueue").addEventListener("click", () => addCheckedToDownloadList("passive"));

$("#addToActiveQueue").addEventListener("click", () => addCheckedToDownloadList("active"));

$("#start").addEventListener("click", startSelected);

function startSelected() {
	bkg.startSelected();
	ss.queue.filter((rid) => ss.downPageRids.includes(rid))
		.forEach((rid) => $(`#downloadlist tr[rid="${rid}"] .icon`).classList.add("scheduled"));
	this.blur();
}

$("#select-all").addEventListener("click", function () {
	if (!ss.allSelected) {
		ss.baseList2.forEach((rid) => bkg.datacenter[rid].selected = true);
		ss.downPageRids.forEach(function (rid) {
			let tr = $(`#downloadlist tr[rid="${rid}"]`);
			if (tr) sel($(".name-td", tr), true);
		});
		ss.allSelected = true;
	}
	else {
		ss.baseList2.forEach((rid) => bkg.datacenter[rid].selected = false);
		ss.downPageRids.forEach(function (rid) {
			let tr = $(`#downloadlist tr[rid="${rid}"]`);
			if (tr) sel($(".name-td", tr), false);
		});
		ss.allSelected = false;
	}
	this.blur();

});

$("#pause-all").addEventListener("click", function () {
	bkg.pauseAll();
	this.blur();
});

$("#throttle").addEventListener("change", function () {
	let checked = this.checked;
	ss.throttleMode = checked;
});

on({
	type: "click",
	selector: "#downloadlist .icon-td",
	container: $("#downloadlist tbody")
},
	function () {
		let rid = this.parentNode.getAttribute("rid");
		let data = bkg.datacenter[rid];
		let that = this;
		let bool = ["fetch-A", "fetch-C", "down-A", "listed"].some((cls) => that.classList.contains(cls));
		if (bool) {

			if (data.pscheduled && !ss.queue.includes(rid)) return;
			xout(ss.queue, rid);
			ss.queue.unshift(rid);

			data.scheduled = true;
			data.pscheduled = true;
			data.status = "down-A";
			setIcon({ rid: rid, icon: "down-A", modifier: "forced" });
			bkg.advance();
		}

		if (data.status === "paused") {

			xout(ss.queue, rid);
			data.scheduled = true;
			data.pscheduled = true;
			ss.queue.unshift(rid);
			setIcon({ rid: rid, icon: "down-A", modifier: "forced" });
			bkg.advance();
		}

		if (data.status === "down-B") {
			chrome.downloads.search({ id: data.id }, function (L) {
				let item = L[0];
				if (item.state === "in_progress" && !item.error) bkg.startUnitPausing(rid, true);
			});
		}

		if (data.status === "error-warning") {
			bkg.retakeDownload(rid, true);
		}

		if (data.status === "user-canceled") {
			let tr = this.closest("tr");
			data.storable = false;
			bkg.removeDownload(rid, true);
			tr.remove();
			downPager.setCurrentPage(0, { activate: true, itemsCount: ss.baseList2.length, noScroll: true });
		}

		if (data.status === "down-C") {
			let id = data.id;
			if (id) chrome.downloads.open(id);
		}
	});

on({
	type: "click",
	selector: ".done-action-remove",
	container: $("#downloadlist tbody")
},
	function () {
		let rid = this.closest("tr").getAttribute("rid");
		bkg.removeDownload(rid);
		this.closest("tr").remove();
		downPager.setCurrentPage(0, { activate: true, itemsCount: ss.baseList2.length, noScroll: true });
	});

on({
	type: "click",
	selector: "tr.done .done-action-folder",
	container: $("#downloadlist tbody")
},
	function () {
		let rid = this.closest("tr").getAttribute("rid");
		let data = bkg.datacenter[rid];
		let id = data.id;
		if (!id) return;
		chrome.downloads.show(id);
	});

on({
	type: "click",
	selector: "tr.done .cell-overflow",
	container: $("#downloadlist tbody")
},
	function () {
		let rid = this.closest("tr").getAttribute("rid");
		let data = bkg.datacenter[rid];
		let id = data.id;
		if (!id) return;
		chrome.downloads.open(id);
	});

function updateProgressInfo() {
	$$("#downloadlist tbody .regular").forEach(function (el) {
		let rid = el.getAttribute("rid");
		let data = bkg.datacenter[rid];
		$(".size", el).textContent = data.size || "";
		let type = data.status;
		let icon_td = $(".icon-td", el);
		icon_td.className = `icon-td ${type}`;
		icon_td.textContent = icon_dict[type];
		if (["down-B"].includes(type)) {
			el.classList.add("show-progress");
		}
		else if (type === "user-canceled") {
			el.classList.remove("show-progress");
		}

	});
}

function setIconUrl(obj) {
	let tr = $(`#downloadlist tbody tr[rid='${obj.rid}']`);
	if (tr) {
		let img = $(".fileIcon", tr);
		img.src = obj.src;
	}

	let tr2 = $(`#resources tbody tr[rid='${obj.rid}']`);
	if (tr2) {
		let img = $(".fileIcon", tr2);
		img.src = obj.src;
	}
}

function setIcon(info) {
	let rid = info.rid;
	let icon = info.icon;
	let modifier = info.modifier || "";
	let tr = $(`#downloadlist tbody tr[rid='${rid}']`);
	if (tr) {

		if (info.disableEdit) {
			let td = $(`#downloadlist tbody tr[rid='${rid}'] .edit`);
			if (td) {
				td.className = "info";
				insertIcon(td, "info");
			}
		}

		let td = $(`#downloadlist tbody tr[rid='${rid}'] .icon-td`);
		if (td) {
			td.className = `icon-td ${icon} ${modifier}`;
			let extracls = bkg.datacenter[rid].scheduled ? "scheduled" : "";
			insertIcon(td, icon, extracls);
			if (icon === "paused" || icon === "down-B") {
				tr.classList.add("show-progress");
			}
			else {
				tr.classList.remove("show-progress");
			}
		}
	}
}

let titlesDict = {
	"listed": "Click to start downloading",
	"scheduled": "Scheduled item.\nDownload will start when a free slot is available.\nClick to force download.",
	"pscheduled": "Download will start as quickly as possible",
	"pscheduled2": "Fetching metatdata...\nDownload will start as quickly as possible.",
	"fetch-A": "Fetching metatdata...\nClick to start downloading.",
	"fetch-B": "Fetching metatdata...\nClick to start downloading.",
	"fetch-C": "Click to start downloading",
	"down-A": "Starting download...",
	"down-B": "Downloading in progress...\nClick to pause.",
	"down-C": "Download completed.\nClick to open the file.",
	"paused": "Download paused...\nClick to resume.",
	"user-canceled": "Download canceled by user.\nClick to remove this item.",
	"error-warning": "Download stopped due to errors.\nClick to retry."
};

on({
	type: "mouseover",
	selector: "#downloadlist .icon-td",
	container: document.body,
	useCapture: false
},
	function (e) {
		let rid = this.closest("tr").getAttribute("rid");
		let data = bkg.datacenter[rid];
		let title = titlesDict[data.status];
		let bool = ["listed", "fetch-C"].includes(data.status);
		if (bool && data.scheduled) title = titlesDict["scheduled"];
		let bool2 = ["fetch-A", "fetch-B"].includes(data.status);
		if (bool2 && data.pscheduled) title = titlesDict["pscheduled2"];
		if (data.status === "down-A" && data.pscheduled) title = titlesDict["pscheduled"];
		this.title = title;
	});

on({
	type: "mouseout",
	selector: "#downloadlist .icon-td",
	container: document.body,
	useCapture: false
},
	function (e) {
		this.title = "";
	});

function makeDownloadRow(data) {
	let barstyle = "", show_progress = "";
	let icon_class = data.status ? data.status : "listed";
	let isEditable = ["listed", "fetch-A", "fetch-B", "fetch-C"].includes(data.status);
	let extra_class = isEditable ? "edit" : "info";
	let filename = data.finalName || data.prelimFinalName;
	let done = data.done ? "done" : "";
	if (data.percent && data.percent < 1 && !data.done) {
		barstyle = `transform:scaleX(${data.percent})`;
		show_progress = "show-progress";
	}
	let tr = createElem({ tag: "TR", attrs: { "class": `regular  ${done} ${show_progress} ${data.selected ? "rselected" : ""}`, rid: `${data.rid}`, url: `${data.url}` } });
	let td_1 = createElem({ tag: "TD", attrs: { "class": `icon-td ${icon_class}` } });
	let td_2 = createElem({ tag: "TD", attrs: { "class": `mdl-data-table__cell--non-numeric name-td ${data.selected ? "selected" : ""}`, title: `${filename}`, extra: "no" } });
	let td_3 = createElem({ tag: "TD", text: `${data.size || ""}`, attrs: { "class": "size" } });
	let td_4 = createElem({ tag: "TD", attrs: { "class": `${extra_class}` } });
	if (isEditable && data.directory === "" && data.automaticFolders && data.automaticFolders.length > 1) {
		td_4.classList.add("conflict");
	}
	tr.append(td_1, td_2, td_3, td_4);
	let extracls = data.scheduled ? "scheduled" : "";
	insertIcon(td_1, icon_class, extracls);
	let fileIconCell = createElem({ tag: "DIV", attrs: { "class": "type-cell" } });
	let cell = createElem({ tag: "DIV", attrs: { "class": "cell" } });
	let progress = createElem({ tag: "DIV", attrs: { "class": "mdc-linear-progress customprogress", role: "progressbar" } });
	td_2.append(fileIconCell, cell, progress);

	let fileIconSrc = data.fileIcon || bkg.fileIcons[data.ext] || defaultFileIcon;
	let fileIcon = createElem({ tag: "IMG", attrs: { "class": "fileIcon willnotrender", src: fileIconSrc, width: "16", "height": "16" } });
	fileIconCell.append(fileIcon);

	let cell_content = createElem({ tag: "DIV", text: `${filename}`, attrs: { "class": "cell-overflow willnotrender" } });
	cell.append(cell_content);

	let hidden = data.done ? "" : "hidden";
	let doneActions = createElem({ tag: "DIV", attrs: { "class": `done-actions ${hidden}` } });
	cell.append(doneActions);
	let folderDiv = createElem({ tag: "DIV", attrs: { "class": "done-action-folder", title: "Open in folder" } });
	let removeDiv = createElem({ tag: "DIV", attrs: { "class": "done-action-remove", title: "Remove from list" } });
	doneActions.append(folderDiv, removeDiv);
	insertIcon(folderDiv, "folder");
	insertIcon(removeDiv, "remove");

	let progress_1 = createElem({ tag: "DIV", attrs: { "class": "mdc-linear-progress__buffering-dots" } });
	let progress_2 = createElem({ tag: "DIV", attrs: { "class": "mdc-linear-progress__buffer" } });
	let progress_3 = createElem({ tag: "DIV", attrs: { "class": "bar mdc-linear-progress__bar mdc-linear-progress__primary-bar", style: `${barstyle}` } });
	let progress_4 = createElem({ tag: "DIV", attrs: { "class": "mdc-linear-progress__bar mdc-linear-progress__secondary-bar" } });
	progress.append(progress_1, progress_2, progress_3, progress_4);

	let progress_3_span = createElem({ tag: "SPAN", attrs: { "class": "mdc-linear-progress__bar-inner" } });
	progress_3.append(progress_3_span);
	let progress_4_span = createElem({ tag: "SPAN", attrs: { "class": "mdc-linear-progress__bar-inner" } });
	progress_4.append(progress_4_span);

	insertIcon(td_4, extra_class);
	return tr;
}

function addCheckedToDownloadList(qType) {
	toggle("downloads");
	if (ss.baseList2.length === 0) ss.allSelected = true;
	let L = bkg.addItemsToDownloadList({ directory: $("#directory").value.trim(), now: (qType === "active") });
	let page = $$("#downloadlist tbody tr").length > 0 ? -1 : 1;
	downPager.setCurrentPage(page, { activate: true, itemsCount: ss.baseList2.length });

	requestAnimationFrame(function () {
		let relem = $("#middle_2");
		relem.scrollTo(0, relem.scrollHeight);
		bkg.storeCurrentDownloads();
		if (qType === "passive") {
			requestAnimationFrame(function () { bkg.addFetchInfo(L.map((x) => x.rid)); });
		}

	});
}

function updateDownloadsView() {
	downPager.setCurrentPage(-1, { activate: true, itemsCount: ss.baseList2.length });
	if (ss.panel === "downloads") {
		requestAnimationFrame(function () {
			let relem = $("#middle_2");
			relem.scrollTo(0, relem.scrollHeight);
		});
	}
}

function insertExternalDownload(rid) {
	if (bkg.fakeDownloads[data.id]) return;
	let data = bkg.datacenter[rid];
	let downloadTr = makeDownloadRow(data);

	$("#downloadlist tbody").append(downloadTr);
	downPager.setCurrentPage(-1, { activate: true, itemsCount: ss.baseList2.length });

}

function updateFilename(rid) {
	let tr = $(`#downloadlist tr[rid="${rid}"]`);
	if (tr) $(".cell-overflow", tr).textContent = bkg.datacenter[rid].finalName;
}

function showProgressInfo(info) {
	let L = info.list;
	for (let rid of L) {
		let data = bkg.datacenter[rid];
		if (info.end) {
			uncheckWhenCompleted(rid);
			let trres = $(`#resources tr[rid="${rid}"]`);
			if (trres) {
				trres.classList.add("past");
			}
			let unit = $(`#pics div[rid="${rid}"]`);
			if (unit) {
				unit.classList.add("past");
			}
		}

		let tr = $(`#downloadlist tr[rid="${rid}"]`);

		if (tr) {
			tr.classList.add("show-progress");
			if (data.percent) {
				$(".bar", tr).style.transform = `scaleX(${data.percent})`;
			}
			if (data.size) {
				$(".size", tr).textContent = data.size;
			}
			if (info.end) {
				tr.classList.add("done");
				tr.classList.remove("rselected");
				setTimeout(() => {
					tr.classList.remove("show-progress");
					$(".done-actions", tr).classList.remove("hidden");
				}, 500);

				setIcon({ rid: rid, icon: "down-C" });
			}
			prepareUpdatePopups(rid, false);
		}
	}
}

function resetDownloadBar(rid) {
	let tr = $(`#downloadlist tr[rid="${rid}"]`);
	if (tr) {
		$(".bar", tr).style.transform = "scaleX(0)";
	}
}

function updateUIAfterFetch(rid) {
	let data = bkg.datacenter[rid];
	if (data.requestExtraScan) {
		$("#sc-progress").textContent = `${bkg.deepScan.done.length} / ${bkg.deepScan.n}`;
		if (bkg.deepScan.L.length === 0) {
			$("#sc-progress").classList.add("sc-done");
			$("#sc-ok").textContent = "START";
			let text = bkg.deepScan.total === 1 ? "link" : "links";
			let notifMessage = `${bkg.deepScan.total} ${text} added.`;
			let notifTitle = "Info";
			bkg.sendNotif({ title: notifTitle, text: notifMessage });
			bkg.resetScanner();
		}
		delete data.requestExtraScan;
	}
	let tr = $(`#downloadlist tr[rid="${rid}"]`);
	if (tr) {
		$(".size", tr).textContent = data.size || "";

		$(".name-td", tr).setAttribute("title", data.finalName);
		$(".name-td .cell-overflow", tr).textContent = data.finalName;

		if (data.directory === "" && data.automaticFolders && data.automaticFolders.length > 1) $(".edit", tr).classList.add("conflict");
		else $(".edit", tr).classList.remove("conflict");

	}

	tr = $(`#resources tr[rid="${rid}"]`);

	if (tr) {
		if (ss.displayedType === "name") {
			$(".cell-overflow", tr).textContent = data.name || "";
			tr.setAttribute("title", data.name || "");
		}
		if (!data.fakeext) {
			$(".ext-td", tr).classList.remove("fakeext");
			$(".ext-td", tr).textContent = data.ext;
		}
	}

	if (data.category === "image") {
		let unit = $(`#pics div[rid="${rid}"]`);
		if (unit) {
			unit.setAttribute("title", data.alt || data.name || "");
			$(".pic-ext", unit).textContent = data.ext || "";
		}
	}
}

function updateContor() {
	let total = ss.showPictures ? ss.baseListPics.length : ss.baseList.length;
	let filtersActive = $("#extensions").value.trim() || $("#textfilter").value.trim();
	let filtersActive2 = ss.minw > 0 || ss.minh > 0;
	let filtered = ss.showPictures ? ss.filteredListPics.length : ss.filteredList.length;
	let result = "0";
	if (total > 0) {

		if (filtersActive || (filtersActive2 && ss.showPictures)) result = filtered + " / " + total;
		else result = total;

	}
	$("#contor").textContent = result;
	$("#labelcontor").textContent = ss.showPictures ? "pics" : "items";
}

$("#textfilter").addEventListener("input", onTextFilterChanged, false);

function onTextFilterChanged() {
	let query = $("#textfilter").value.trim();
	if (query.length > 0) bkg.setRegText(query);
	else {
		bkg.reg_text_info = undefined;
	}
	updateResourcesViews();
}

$("#extensions").addEventListener("input", onExtensionsChanged, false);

function onExtensionsChanged() {
	let query = $("#extensions").value.trim();
	if (query.length > 0) bkg.setRegExt(query);
	else {
		bkg.reg_ext = undefined;
	}
	updateResourcesViews();
}

function resetFilters(preservePopups) {
	$$("#textfilter, #extensions").forEach(function (el) {
		el.value = "";
		let label = $(".mdc-text-field__label--float-above", el.closest(".mdc-text-field"));
		if (label) label.classList.remove("mdc-text-field__label--float-above");
		$(".close-button", el.parentElement).classList.add("hidden");
	});
	bkg.reg_ext = undefined;
	bkg.reg_text_info = undefined;
	for (let name of ["textfilter", "extensions"]) { ss.inputs[name] = ""; }
	testForMainCheck();
	$$("#w-slider, #h-slider").forEach((slider) => {
		slider.value = "0";
		ss.inputs[slider.id] = "0";
		setSliderLabelValue(slider);
	});
	ss.minw = 0;
	ss.minh = 0;
	if (!preservePopups) PopBuilder.hideAll();
}

function testForMainCheck() {
	if (ss.filteredList.length > 0) {
		let bool = minus(ss.filteredList, ss.checkedList).length === 0;
		$("#main-check").checked = bool;
	}

	if (ss.filteredListPics.length > 0) {
		let bool2 = minus(ss.filteredListPics, ss.checkedList).length === 0;
		$("#images-main-check").checked = bool2;
	}
}

function rangeAction(e, elem, rid) {
	if (e.buttons === 2) return;
	let bool = false;
	for (let r of ss.resPageRids) {
		if (bkg.datacenter[r].refCheck) {
			bool = true;
			break;
		}
	}
	if (!bool) {
		let r = ss.resPageRids[0];
		ss.baseList.forEach((r) => bkg.datacenter[r].refCheck = false);
		bkg.datacenter[r].refCheck = true;
	}
	let checked = elem.checked;
	if (!e.shiftKey) {
		bkg.datacenter[rid].refCheck = true;
	}

	if (e.shiftKey && checked) {

		$$(`#resources .regular`).forEach(function (el) {
			let rid = el.getAttribute("rid");
			$(".check-td input", el).checked = false;
			bkg.datacenter[rid].checked = false;
			xout(ss.checkedList, rid);
		});

		let i = ss.resPageRids.indexOf(rid);
		let j = 0;

		for (let i = 0; i < ss.resPageRids.length; ++i) {
			if (bkg.datacenter[ss.resPageRids[i]].refCheck) {
				j = i;

			}
		}

		ss.resPageRids.forEach(function (r, index) {
			let test = (index - i) * (index - j) <= 0;
			if (test) {
				$(`#resources tr[rid="${r}"] input[type='checkbox']`).checked = true;
				if (ss.thumbPageRids.includes(r)) {
					$(`#pics div[rid="${r}"] input[type='checkbox']`).checked = true;
				}
				bkg.datacenter[r].checked = true;
				if (!ss.checkedList.includes(r)) ss.checkedList.push(r);
			}
		});
	}
}

function rangeAction2(e, elem, rid) {
	if (e.buttons === 2) return;
	let bool = false;
	for (let r of ss.thumbPageRids) {
		if (bkg.datacenter[r].refCheckPic) {
			bool = true;
			break;
		}
	}
	if (!bool) {
		let r = ss.thumbPageRids[0];
		ss.baseListPics.forEach((r) => bkg.datacenter[r].refCheckPic = false);
		bkg.datacenter[r].refCheckPic = true;
	}
	let checked = elem.checked;
	if (!e.shiftKey) {
		bkg.datacenter[rid].refCheckPic = true;
	}

	if (e.shiftKey && checked) {

		$$(`#pics .divpic`).forEach(function (el) {
			let rid = el.getAttribute("rid");
			$("input[type='checkbox']", el).checked = false;
			bkg.datacenter[rid].checked = false;
			xout(ss.checkedList, rid);
		});

		let i = ss.thumbPageRids.indexOf(rid);
		let j = 0;
		ss.thumbPageRids.forEach(function (r, index) {
			if (bkg.datacenter[r].refCheckPic) j = index;
		});
		ss.thumbPageRids.forEach(function (r, index) {
			let test = (index - i) * (index - j) <= 0;
			if (test) {
				$(`#pics div[rid="${r}"] input[type='checkbox']`).checked = true;
				if (ss.resPageRids.includes(r)) {
					$(`#resources tr[rid="${r}"] input[type='checkbox']`).checked = true;
				}

				bkg.datacenter[r].checked = true;
				if (!ss.checkedList.includes(r)) ss.checkedList.push(r);
			}
		});
	}
}

function sel(el, bool) {
	let rid = el.closest("tr").getAttribute("rid");
	let data = bkg.datacenter[rid];
	if (bool) {
		el.classList.add("selected");
		el.parentElement.classList.add("rselected");
		data.selected = true;
	}
	else {
		el.classList.remove("selected");
		el.parentElement.classList.remove("rselected");
		data.selected = false;
		ss.allSelected = false;
	}
}

on({
	type: "mousedown",
	selector: "#downloadlist .name-td",
	container: document.body,
	useCapture: false
},
	function (e) {
		if (e.buttons === 2) return;
		if (e.target.closest(".done-actions, .done .cell-overflow")) return;
		let isSelected = this.classList.contains("selected");

		if (!isSelected) ss.allSelected = false;
		if (!$(".refsel")) $("#downloadlist .name-td").classList.add("refsel");
		if ($(".refsel").closest("tr").classList.contains("hidden")) {

			let td = $("#downloadlist tr:not(.hidden) .name-td");
			if (td) {
				$(".refsel").classList.remove("refsel");
				td.classList.add("refsel");
			}
		}

		if (!e.shiftKey) {
			$(".refsel").classList.remove("refsel");
			this.classList.add("refsel");
		}

		if (!e.ctrlKey && !e.shiftKey) {
			$$("#downloadlist td.selected").forEach((el) => sel(el, false));
			sel(this, true);
		}
		else if (e.ctrlKey && !e.shiftKey) {
			if (isSelected) sel(this, false);
			else sel(this, true);
		}
		else {
			$$("#downloadlist td.selected").forEach((el) => sel(el, false));
			let all = $$("#downloadlist .name-td");
			let A = Array.from(all);
			let i = A.indexOf(this);
			let j = A.indexOf($("#downloadlist .refsel"));
			A.forEach(function (el, index) {
				let test = (index - i) * (index - j) <= 0;
				if (test) sel(el, true);
			});
		}

		$$("#downloadlist td.selected").forEach(function (el) {
			let data = bkg.datacenter[el.parentElement.getAttribute("rid")];
			data.selected = el.classList.contains("selected");
			data.refsel = el.classList.contains("refsel");
		});
	});

on({
	type: "contextmenu",
	selector: "#downloadlist .name-td",
	container: document.body,
	useCapture: false
},
	function (e) {
		if (e.shiftKey) e.preventDefault();
		if (e.ctrlKey) {
			return;
		}
		if (!this.classList.contains("selected")) $$("#downloadlist td.selected").forEach((el) => sel(el, false));
		if (!$(".refsel")) $("#downloadlist .name-td").classList.add("refsel");
		$(".refsel").classList.remove("refsel");
		this.classList.add("refsel");
		if (!e.shiftKey) sel(this, true);
	});

function moveRange(direction) {
	if (ss.panel === "resources") return;
	let info = bkg.getPositionalData(direction);
	for (let obj of info) {
		if (direction === "up") {
			let lastRid = obj.range[-1 + obj.range.length];
			let beforeRid = obj.refBefore;
			let last = $(`#downloadlist tr[rid="${lastRid}"]`);
			let before = $(`#downloadlist tr[rid="${beforeRid}"]`);
			if (lastRid !== beforeRid) last.after(before);
		}
		else if (direction === "down") {
			let firstRid = obj.range[0];
			let afterRid = obj.refAfter;
			let first = $(`#downloadlist tr[rid="${firstRid}"]`);
			let after = $(`#downloadlist tr[rid="${afterRid}"]`);
			if (firstRid !== afterRid) first.before(after);
		}
	}

	ss.downPageRids = Array.from($$("#downloadlist tbody tr[rid]")).map((el) => el.getAttribute("rid"));
	let page = ss.cp.downPager;
	ss.baseList2.splice((-1 + page) * bkg.perpage.down, bkg.perpage.down, ...ss.downPageRids);
	bkg.updateQueueWhenMoving(info, direction);
	PopBuilder.hideAll();
}

window.addEventListener("keydown", function (event) {
	if (event.ctrlKey && ss.panel !== "resources" && (event.key === "ArrowUp" || event.key === "ArrowDown")) {

		disableHover($("body"));
		let dir = event.key === "ArrowUp" ? "up" : "down";
		let sels = $$(`#downloadlist tr.rselected`);
		let ref = $("#middle_2");
		let el = dir === "up" ? sels[0] : sels[-1 + sels.length];
		let opts = dir === "up" ? { block: "start", inline: "nearest" } : { block: "end", inline: "nearest" };
		moveRange(dir);
		if (!testInside(el, ref)) sels[0].scrollIntoView(opts);
	}
}, true);

$("#sc-ok").addEventListener("click", function (e) {
	if (e.target.textContent === "START") {
		e.target.textContent = "ABORT";
		let info = {};
		info.source = $("#sc-textfilter-source").value;
		info.text = $("#sc-textfilter").value.trim();
		info.extensions = $("#sc-extensions").value.trim();
		if (!info.text && !info.extensions) {
			bkg.sendNotif({ title: "Extra scan info", text: "At least one filter must be specified" });
			e.target.textContent = "START";
			return;
		}
		let n = ss.baseList.filter((rid) => bkg.datacenter[rid].checked).length;
		$("#sc-progress").classList.remove("sc-done");
		$("#sc-progress").textContent = `0 / ${n}`;
		bkg.scanChecked(info);
		bkg.pageIndicator = 0;
	} else {
		e.target.textContent = "START";
		ss.baseList.forEach((rid) => bkg.datacenter[rid].requestExtraScan = null);
		bkg.resetScanner();
		$("#sc-progress").textContent = "";
	}
});

let sActive = false;
on({
	type: "input",
	selector: "#w-slider, #h-slider",
	container: document.body,
	useCapture: true
},
	function () {
		setDimValue(this);
	});

on({
	type: "click",
	selector: ".slider-label",
	container: $("#gallery-actions"),
	useCapture: true
},
	function () {
		if (this.getAttribute("for").startsWith("w")) {
			ss.minw = 0;
			ss.inputs["w-slider"] = "0";
			$("#w-slider").value = "0";
			this.textContent = "WIDTH:";
		}
		else {
			ss.minh = 0;
			ss.inputs["h-slider"] = "0";
			$("#h-slider").value = "0";
			this.textContent = "HEIGHT:";
		}
		updateResourcesViews(true);
	});

function setDimValue(slider) {
	setSliderLabelValue(slider);
	sliderAction(slider);
}

function setSliderLabelValue(slider) {
	let label = $("label", slider.parentElement);
	let val = getConverted(parseInt(slider.value));
	if (val > 0) label.textContent = val + " px";
	else label.textContent = slider.id.startsWith("w") ? "WIDTH: " : "HEIGHT: ";
}

function sliderAction(slider) {
	if (sActive) return;
	sActive = true;
	setTimeout(() => {
		sActive = false;
		ss.inputs[slider.id] = slider.value;
		let prop = slider.id.startsWith("w") ? "minw" : "minh";
		ss[prop] = getConverted(parseInt(slider.value));

		updateResourcesViews(true);
	}, 60);
}

function getConverted(val) {
	return val <= 500 ? val : 3 * val - 1000;
}

function notify(message) {
	$("#notification-area").classList.remove("hidden");
	$("#notification-content").innerText = message.text;
	let oldCount = $("#notification-area").dataset.count;
	let newCount = parseInt(oldCount) + 1;
	$("#notification-area").dataset.count = newCount;
	setTimeout(() => {
		let count = parseInt($("#notification-area").dataset.count) - 1;
		$("#notification-area").dataset.count = count;
		if (count === 0) $("#notification-area").classList.add("hidden");
	}, 3000);
}

function getProximityMasks_prepare() {

	let srids = [];
	let L = [];
	$$("#downloadlist td.selected").forEach(function (item) {
		let rid = item.parentElement.getAttribute("rid");
		srids.push(rid);
		let data = bkg.datacenter[rid];
		let obj = { rid: rid, selector: data.selector, frameId: data.frameId, tabId: data.tabId };
		L.push(obj);
	});
	if (L.length === 0) return;
	let frameId = L[0].frameId;
	let tabId = L[0].tabId;
	let legal = true;
	for (let obj of L) {
		if (obj.frameId !== frameId || obj.tabId !== tabId) {
			legal = false;
			break;
		}
	}
	if (!legal) {
		resetProximityData(true);
		return;
	}

	ss.pData.frameId = frameId;
	ss.pData.tabId = tabId;
	ss.pData.L = L;

	chrome.tabs.executeScript(tabId, {
		code: `chrome.runtime.sendMessage({ type: "extra mask preliminary test", info: (typeof idata !==  "undefined")});`,
		frameId: frameId
	}, function () {
		let e = chrome.runtime.lastError;
		if (e) {
			console.log(e)
		}
	});
}

function getProximityMasks_prepare2() {
	let srids = [];
	$$("#downloadlist td.selected").forEach(function (item) {
		let rid = item.parentElement.getAttribute("rid");
		srids.push(rid);
	});
	let keys = Object.keys(ss.pData.all);
	let sameRids = minus(srids, keys).length === 0 && minus(keys, srids).length === 0;
	if (sameRids) {
		emptyElem($("#proximity-masks-tbody"));
		let rid = ss.pData.first;
		if (rid) {
			let F = [];
			let info = ss.pData.all[rid];
			if (info) {
				Object.keys(info).forEach((mask) => {
					let obj = { mask: mask, value: info[mask] };
					F.push(makeProximityRow(obj));
				});
			}
			$("#proximity-masks-tbody").append(...F);
		}
	}
	else {
		resetProximityData(false);
		srids.forEach((rid) => ss.pData.all[rid] = {});

	}
}

function addNewProximityMask() {
	let o = { mask: "{extra:1}", value: "" };
	let rid = ss.pData.first;
	if (rid) {
		let obj = ss.pData.all[rid];
		if (obj) {
			let keys = Object.keys(obj);
			let reg = /extra:(\d+)/;
			let nrs = keys.filter((key) => reg.test(key)).map((key) => parseInt(key.match(reg)[1]));
			nrs.sort((a, b) => b - a);
			let next = nrs[0] + 1;
			o.mask = "{extra:" + next + "}";
		}
	}

	let tr = makeProximityRow(o);
	$("#proximity-masks-tbody").append(...[tr]);

	chrome.tabs.sendMessage(ss.pData.tabId, { type: "request proximity masks", info: { L: ss.pData.L, mask: o.mask } }, { frameId: ss.pData.frameId });

}

function resetProximityData(full) {
	ss.pData.all = {};
	ss.pData.first = null;
	emptyElem($("#proximity-masks-tbody"));
	if (full) {
		ss.pData.frameId = null;
		ss.pData.tabId = null;
		ss.pData.L = null;
	}
}

$("#add-new-row-mask").addEventListener("click", addNewProximityMask);

function validateBatchDescriptor(obj, reg) {
	if (reg.test(obj.str)) {
		obj.descriptor = true;
		let parts = obj.str.match(reg);
		let first = parts[1];
		let second = parts[2];
		let step = parts[3];
		if (step) {
			step = parseInt(step.slice(1));
			obj.step = step;
		}
		let t1 = /[a-z]/.test(first) ? "lower" : (/[A-Z]/.test(first) ? "upper" : "number");
		let t2 = /[a-z]/.test(second) ? "lower" : (/[A-Z]/.test(second) ? "upper" : "number");
		obj.first = (t1 === "number" ? parseInt(first) : first);
		obj.second = (t2 === "number" ? parseInt(second) : second);
		if (t1 === t2) {
			if (step) {
				if ((step > 0 && obj.first > obj.second) || (step < 0 && obj.first < obj.second)) {
					obj.valid = false;
					return;
				}
			}
			else {
				obj.step = obj.first > obj.second ? -1 : 1;
			}
			obj.type = t1;
			obj.valid = true;

			if (t1 === "number") {
				let padd1 = first.length > obj.first.toString().length ? first.length : 0;
				let padd2 = second.length > obj.second.toString().length ? second.length : 0;
				if(padd1 > 0 || padd2 > 0) obj.padd = Math.max(padd1, padd2);
			}
		}
		else {
			obj.valid = false;
			return;
		}
	}
	else {
		obj.descriptor = false;
	}
}

function generateBatchSublist(obj, lowers, uppers) {
	let result = [];
	if (obj.type === "lower" || obj.type === "upper") {
		let L = obj.type === "lower" ? lowers : uppers;
		let k0 = L.indexOf(obj.first);
		let k1 = L.indexOf(obj.second);
		if (k0 <= k1) {
			for (let i = k0; i <= k1; i = i + obj.step) {
				result.push(L[i]);
			}
		}
		else {
			for (let i = k0; i >= k1; i = i + obj.step) {
				result.push(L[i]);
			}
		}
	}

	if (obj.type === "number") {
		if (obj.first <= obj.second) {
			for (let i = obj.first; i <= obj.second; i = i + obj.step) {
				result.push(i);
			}
		}
		else {
			for (let i = obj.first; i >= obj.second; i = i + obj.step) {
				result.push(i);
			}
		}
		result = result.map((i) => i.toString());
		if (obj.padd) {
			result = result.map((x) => {
				let res = x;
				if (x.length < obj.padd) {
					res = res.padStart(obj.padd, "0")
				}
				return res;
			});
		}
	}
	return result.map((x) => {
		return { str: x, index: obj.index };
	});
}

function generateCartesianProduct(LL) {
	if (LL.length === 1) return LL[0].map((x) => [x]);
	let f = (a, b) => [].concat(...a.map(a => b.map(b => [].concat(a, b))));
	let cartesian = (a, b, ...c) => b ? cartesian(f(a, b), ...c) : a;
	return cartesian(...LL);
}

function generateBatchURLs(bURL) {
	let reg = /(\[(?:\d+|[a-zA-Z])\:(?:\d+|[a-zA-Z])(?:\:\-?\d+)?])/;
	let reg2 = /\[(\d+|[a-zA-Z])\:(\d+|[a-zA-Z])(\:\-?\d+)?]/;
	let lowers = "abcdefghijklmnopqrstuvwxyz".split("");
	let uppers = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
	let parts = bURL.split(reg).map((str, index) => {
		return { str: str, index: index };
	});
	parts.forEach((obj) => validateBatchDescriptor(obj, reg2));

	let bdParts = parts.filter((obj) => obj.descriptor);
	let valid = true;
	for (let obj of bdParts) {
		if (!obj.valid) {
			valid = false;
			break;
		}
	}

	if (!valid) {
		console.log("invalid batch url!");
		return;
	}

	let X = bdParts.map((obj) => generateBatchSublist(obj, lowers, uppers));
	X = generateCartesianProduct(X);
	let result = X.map((L) => {
		let D = {};
		L.forEach((obj) => D[obj.index] = obj.str);
		return parts.map((obj) => {
			return D[obj.index] || obj.str;
		}).join("");
	});

	return result;
}

window.addEventListener("unload", function () {
	try {
		bkg.onCloseUI();
		bkg.lastDirectory = $("#directory").value.trim();
	}
	catch (err) { }
});

function log(str) {
	bkg.console.log(str);
}

