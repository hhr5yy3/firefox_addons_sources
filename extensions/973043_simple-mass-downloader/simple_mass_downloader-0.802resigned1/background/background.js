

var initTime = Date.now();
var datacenter = {};
var dataurls = {};
var ok = {};
var ids = {};
let qids = {};
var fakeDownloadData = {};
var fakeDownloads = {};

let pmode = false;
let lazy_pmode = false;
let pulse = 100;
let lazy_pulse = 1000;

let nmax = 4, nhmax = 3;
var fmax = 50;
let fControl = {};
let fInterval = 20000;
let ftInterval = 2;

let hCenter = {};
let hRef = {};

let aInterval = 15000;
let throttleInterval = 10;

let menu_info = {};
let framesData = {};
let extraImgInfo = {};
var deepScan = { L: [], done: [], fails: [], n: 0, total: 0 };
var tabsScan = { L: [], done: [], fails: [], n: 0, total: 0, duplicates: 0, S: {} };

var os = "win";
var sep = "\\";

let defaultDisplayedType = "name";
let textFilterSource = "all";
var reg_ext, reg_text_info;

let sc_textFilterSource = "all";
let sc_reg_ext, sc_reg_text_info;

let tb_textFilterSource = "all";
let tb_reg_ext, tb_reg_text_info;

var tabs_info = { onlyImages: false };
var tabsClose = false;
var tabsApplyMR = false;
var tabsDownloadNow = false;
var exportMask = "{url}{newline}";
var recognizeTextLinks = true;

var includeUnstarted = true;
var dlsRestored = false;

let dlsStoring = false;
var lastDownloadsData = [];
var foldersRules = {};
var showRecDirs = true;
var showFavDirs = true;
var starFolders = [];
var recentFolders = [];
var maxRecDirs = 3;

let showInternalLinks = false;
let disableAutomaticFolders = false;
var enableExpFeat = false;

var perpage = { res: 20, thumb: 20, down: 20 };
var pageIndicator = undefined;

var uiAppearance = "normal";
var lastDirectory = "";

var regmask = /(\{[a-zA-Z0-9-:]+?\})/;
var legalMasks = /^(url|alt|title|name|text|purl|palt|ptitle|pname|ptext|host|ext|auto|auto:name|auto:ext|yy|yyyy|MM|dd|hh|mm|ss|ms|counter|c{1,}|newline|tab|leftAc|rightAc|search:[a-zA-Z0-9_]+|extra:[0-9]+|url:-?[0-9]+)$/;

var legalMasksForDirs = /^(host|ext|auto:ext|year|month|day|week|yy|yyyy|MM|dd|hh|mm|ss|ms|url:-?[0-9]+)$/;

var recentUrls = {};
var odf = !!chrome.downloads.onDeterminingFilename;
var isFirefox = !odf;
var isChrome = odf;

var waitBeforeRestoring = false;
var t0 = 0;
var uninstallUrl = isChrome ? `https://docs.google.com/forms/d/e/1FAIpQLSeAgU5VhkhIWA9ZfXFuKvbH7pz7AQ-n1jatpVXToTdCfLzdwg/viewform?embedded=true`
	: `https://docs.google.com/forms/d/e/1FAIpQLSccB3ujt9KeWEmzN4tmfZmkvLhEFR450nrLx4J52VIMzGjIKA/viewform?embedded=true`;
chrome.runtime.setUninstallURL(uninstallUrl, function () {

});

var opsys;
chrome.runtime.getPlatformInfo(function (info) {
	opsys = info.os;
});

function updateRecentFolders(folder) {
	let starFoldersLC = starFolders.map((f) => f.toLowerCase());
	let recentFoldersLC = recentFolders.map((f) => f.toLowerCase());
	if (showFavDirs && starFoldersLC.includes(folder.toLowerCase())) return;
	if (recentFoldersLC.includes(folder.toLowerCase())) xout(recentFolders, folder);
	recentFolders.unshift(folder);
	if (recentFolders.length > maxRecDirs) recentFolders.pop();
}

var session = {
	inputs: {
		"extensions": "",
		"textfilter": "",
		"directory": "",
		"mr-directory": "",
		"mr-search": "",
		"mr-replace": "",
		"mr-mask": "",
		"mr-case": false,
		"mr-reg": false,
		"mr-first": false,
		"sc-textfilter-source": "",
		"sc-textfilter": "",
		"pt-textfilter": "",
		"sc-extensions": "",
		"tb-radio": "active",
		"tb-tabfilter": "",
		"tb-textfilter": "",
		"tb-textfilter-source": "",
		"tb-extensions": "",
		"tb-only-pictures": false,
		"w-slider": "0",
		"h-slider": "0"
	},
	fresh: true,
	opened: false,
	panel: "resources",
	displayedType: defaultDisplayedType,
	throttleMode: false,
	showPictures: false,
	cp: { resPager: 1, thumbPager: 1, downPager: 1 },
	resPageRids: [],
	thumbPageRids: [],
	downPageRids: [],
	baseList: [],
	filteredList: [],
	baseListPics: [],
	filteredListPics: [],
	checkedList: [],
	queue: [],
	baseList2: [],
	mainCheckActivated: false,
	imagesMainCheckActivated: false,
	allSelected: false,
	minw: 0,
	minh: 0,
	menuNotification: { u: 0, v: 0 },
	pData: { all: {} },
	activeBatches: []
};

function applyMR(rid) {
	let si = session.inputs;
	let regchecked = si["mr-reg"];
	let insensitive = !si["mr-case"];
	let global = !si["mr-first"];
	let flags = `${insensitive ? "i" : ""}${global ? "g" : ""}`;
	let sfor = si["mr-search"].trim();
	let repl = si["mr-replace"];
	let reg;
	if (sfor) {
		if (regchecked) {
			if (sfor.startsWith("/") && sfor.endsWith("/")) sfor = sfor.slice(1, -1);
			reg = new RegExp(sfor, flags);
		}
		else {
			sfor = escapeRegExp(sfor);
			reg = new RegExp(sfor, flags);
		}
	}

	let defaultMask = isChrome ? "{auto}" : "{name}.{ext}";
	let globalDirectory = session.inputs.directory || "";

	let data = datacenter[rid];
	let mask = si["mr-mask"].trim() || defaultMask;
	let dir = si["mr-directory"].trim() || globalDirectory;
	if (dir) data.directory = dir;
	let filename = buildNameFromMask(data, { mask: mask, sanitize: true, noCounter: true, odf: false });
	let filenameBeforeRepl = filename;
	if (reg) filename = filename.replace(reg, repl);
	let effectiveReplacing = filename !== filenameBeforeRepl;
	filename = sanitizeFileName(filename, 255);
	data.finalName = filename;
	data.mask = mask;
	if (effectiveReplacing) data.mask = "";
}

let defaultOptions = {
	nmax: nmax,
	nhmax: nhmax,
	defaultDisplayedType: "name",
	textFilterSource: "current",
	throttleInterval: throttleInterval,
	includeUnstarted: true,
	showInternalLinks: false,
	disableAutomaticFolders: false,
	foldersRules: {},
	perpage: { res: 200, thumb: 200, down: 200 },
	showFavDirs: true,
	showRecDirs: true,
	maxRecDirs: 3,
	starFolders: [],
	enableExpFeat: false,
	tabsClose: false,
	tabsApplyMR: false,
	tabsDownloadNow: false,
	exportMask: "{url}{newline}",
	recognizeTextLinks: true
};

function initAfterOpendingDB() {
	setTimeout(function(){
		if(waitBeforeRestoring && Date.now() - t0 < 300) initAfterOpendingDB();
		else fillPastSessionData();
	}, 20);

}

chrome.runtime.getPlatformInfo(function (info) {
	os = info.os;
	if (os !== "win") { sep = "/"; }
});

function send(obj) {
	if (session.opened) { chrome.runtime.sendMessage(obj); }
}

function extractData(message, sender/* , sendResponse */) {
	if (message.type === "resources") {
		if (message.origin === "button") {
			addItemsToDatacenter(message.info, { doSilentFetching: message.doSilentFetching, tabId: sender.tab.id, frameId: sender.frameId, now: message.now, origin: message.origin });
		}
		else if (message.origin === "tabs") {
			if (tabsScan && tabsScan.active) tabsScan.refTime = Date.now();
			filterTabResults(message.info, sender);
		}
		else sendReportIfReady(message, sender);
	}

	if (message.type === "extra images data") {
		message.info.forEach((obj) => {
			obj.tabId = sender.tab.id;
			obj.frameId = sender.frameId;
		});

		let rids = [];
		message.info.forEach((obj) => {
			if(!message.timeout){
				let rid = searchDictionary(datacenter, [["eid", obj.eid], ["frameId", sender.frameId], ["tabId", sender.tab.id]])[0];
				if (rid) {
					rids.push(rid);
					let data = datacenter[rid];
					data.naturalWidth = obj.naturalWidth;
					data.naturalHeight = obj.naturalHeight;
					data.mpx = obj.naturalWidth * obj.naturalHeight;
				}
				else {
					extraImgInfo[sender.tab.id + "#" + sender.frameId + "#" + obj.eid] = obj;
				}
			}
			else {
				extraImgInfo[sender.tab.id + "#" + sender.frameId + "#" + obj.eid] = obj;
			}
		});
		if (message.origin === "tabs") {
			if (tabsScan && tabsScan.active) tabsScan.refTime = Date.now();
		}

		send({ type: "update thumbnails dims", info: rids });
	}

	if (message.type === "ready for inject") {

		let L = ["/ui/util-2.js", "/page/pagescript.js", "page/page.css"];
		insertFiles(L, sender.frameId, sender.tab.id);
	}

	if (message.type === "changed options") {
		setChangedOptions(message.info);
	}

	if (message.type === "start icons building") {
		buildFileIconsDatabase();
	}

	if (message.type === "close quick dialog") {
		chrome.tabs.sendMessage(sender.tab.id, { type: "close iframe" });
	}

	if (message.type === "add items to datacenter") {
		useQuickDialogData(message, false, sender);
	}

	if (message.type === "download items now") {
		useQuickDialogData(message, true, sender);
	}

	if (message.type === "empty list notification") {

		sendNotif(message.info);
	}

	if (message.type === "request folder list") {
		chrome.tabs.sendMessage(sender.tab.id, { type: "folder list", info: { recentFolders: recentFolders, starFolders: starFolders } }, { frameId: sender.frameId });
	}

	if (message.type === "request platform info") {
		if (sender.tab) chrome.tabs.sendMessage(sender.tab.id, { type: "platform info", info: { opsys: opsys } }, { frameId: sender.frameId });
		else send({ type: "platform info", info: { opsys: opsys } });
	}

	if (message.type === "proximity data") {
		let first = message.info.firstRid;
		let mask = message.info.mask;
		let info = message.info.proximityData;
		session.pData.first = first;
		for (let rid of Object.keys(info)) {
			if (!session.pData.all[rid]) session.pData.all[rid] = {};
			let obj = session.pData.all[rid];
			obj[mask] = info[rid][mask];
		}

	}

	if (message.type === "reset proximity data") {
		send({ type: "reset proximity data" });
	}

	if (message.type === "extra mask preliminary test") {
		if(message.info){
			send({ type: "call getProximityMasks_prepare2" });
		}
		else send({ type: "reset proximity data" });
	}
}
chrome.runtime.onMessage.addListener(extractData);

function makeLinksReport(L) {
	let report = {};
	L = L.filter(function (item) {
		let isInternal = ["SCRIPT", "LINK"].includes(item.tag);
		let bool = showInternalLinks || !isInternal;
		return bool;
	});
	L.forEach((obj) => {
		let ext = guessExt(obj);
		if (report[ext]) report[ext] = report[ext] + 1;
		else report[ext] = 1;
	});
	return report;
}

function sendReportIfReady(message, sender) {
	let tabId = sender.tab.id;
	message.info.forEach((obj) => obj.frameId = sender.frameId);
	if (message.origin.startsWith("link")) {
		qids[tabId] = message.info;
		let report = makeLinksReport(message.info);
		chrome.tabs.sendMessage(sender.tab.id, { type: "report", report: report, qid: tabId });
		return;
	}

	let fd = framesData[tabId];
	fd.links = fd.links.concat(message.info);
	xout(fd.framesIds, sender.frameId);
	if (fd.framesIds.length === 0) {
		qids[tabId] = fd.links;
		delete framesData[tabId];
		let report = makeLinksReport(fd.links);
		chrome.tabs.sendMessage(sender.tab.id, { type: "report", report: report, qid: tabId });
	}
}

function useQuickDialogData(message, now, sender) {
	if (!message.qid) return;
	let L = qids[message.qid];
	if (message.exts.length > 0) {
		L = L.filter((obj) => message.exts.includes(guessExt(obj)));
	}
	addItemsToDatacenter(L, { doSilentFetching: false, now: !!now, directory: message.directory || "", tabId: sender.tab.id, origin: "menu", frameId: sender.frameId });
}

chrome.runtime.onInstalled.addListener(onInstalled);

function onInstalled(details) {
	if (details.reason === "install") {
		chrome.tabs.create({ url: "/ui/help.html" });
	}
	if (details.reason === "update") { }
}

chrome.storage.local.get("defaults", onSuccessDefaults);

function onSuccessDefaults(obj) {
	let cloneDefaults = cloneDataObj(defaultOptions);
	if (obj.defaults) {
		let keys = Object.keys(obj.defaults);
		for (let key of keys) {
			cloneDefaults[key] = obj.defaults[key];
		}
	}
	chrome.storage.local.set({ "defaults": cloneDefaults }, () => setChangedOptions(cloneDefaults));
}

function setChangedOptions(obj) {
	defaultDisplayedType = obj.defaultDisplayedType;
	textFilterSource = obj.textFilterSource;
	nmax = obj.nmax;
	nhmax = obj.nhmax;
	throttleInterval = obj.throttleInterval;
	showInternalLinks = obj.showInternalLinks;
	disableAutomaticFolders = obj.disableAutomaticFolders;
	foldersRules = obj.foldersRules;
	includeUnstarted = obj.includeUnstarted;
	perpage = obj.perpage;
	showFavDirs = obj.showFavDirs;
	showRecDirs = obj.showRecDirs;
	maxRecDirs = obj.maxRecDirs;
	starFolders = obj.starFolders;
	enableExpFeat = obj.enableExpFeat;

	tabsClose = obj.tabsClose;
	tabsApplyMR = obj.tabsApplyMR;
	tabsDownloadNow = obj.tabsDownloadNow;
	exportMask = obj.exportMask;
	recognizeTextLinks = obj.recognizeTextLinks;

	chrome.storage.local.get("recentFolders", onSuccessRF);

	if (includeUnstarted) {
		session.baseList2.forEach((rid) => {
			if (["listed", "fetch-A", "fetch-B", "fetch-C"].includes(datacenter[rid].status)) datacenter[rid].storable = true;
		});
	}
}

chrome.storage.local.get("lastDownloadsData", onSuccessLDD);

function onSuccessLDD(obj) {
	if (obj.lastDownloadsData) {
		lastDownloadsData = obj.lastDownloadsData;
	}
	chrome.storage.local.set({ "lastDownloadsData": [] });
}

function onSuccessRF(obj) {
	if (obj.recentFolders) {
		let starFoldersLC = starFolders.map((f) => f.toLowerCase());
		recentFolders = obj.recentFolders.filter((rf) => !starFoldersLC.includes(rf.toLowerCase()));
	}
}

chrome.storage.local.get("uiAppearance", onSuccessUA);

function onSuccessUA(obj) {
	if (obj.uiAppearance) {
		uiAppearance = obj.uiAppearance;
	}
}

chrome.storage.local.get("lastDirectory", onSuccessLD);

function onSuccessLD(obj) {
	if (obj.lastDirectory) {
		lastDirectory = obj.lastDirectory;
	}
}

function storeCurrentDownloads(forced) {
	if (forced) storeData();
	if (!dlsStoring) {
		dlsStoring = true;
		setTimeout(() => storeData(), 2000);
	}
}

function storeData() {
	dlsStoring = false;
	let rids = searchDictionary(datacenter, [["storable", true]]);
	let dlsData = cloneDataObj(rids.map((rid) => datacenter[rid]));

	chrome.storage.local.set({ "recentFolders": recentFolders });
	chrome.storage.local.set({ "uiAppearance": uiAppearance });
	chrome.storage.local.set({ "lastDownloadsData": dlsData });
	chrome.storage.local.set({ "lastDirectory": lastDirectory });
}

function setProp(obj, prop, val) {
	let jsonval = JSON.stringify(val);
	obj[prop] = JSON.parse(jsonval);
}

function changeTabsDefaults(prop, value) {

	let props = ["tabsClose", "tabsApplyMR", "tabsDownloadNow"];
	if (!props.includes(prop)) return;
	chrome.storage.local.get("defaults", function (obj) {
		if (obj.defaults) {
			obj.defaults[prop] = value;
		}
		chrome.storage.local.set({ "defaults": obj.defaults }, () => {

			window[prop] = value;
			chrome.runtime.sendMessage({ type: "set backup data", info: obj.defaults });
		});
	});
}

function createMenus() {
	let contexts = [/* "frame",  */"page", "selection", "link", "image", "link", "image"];
	let titles = [/* "frame links",  */"page links", "selection-links", "link", "image", "link", "image"];
	for (let i = 0; i < 4; ++i) {
		let title = `Add ${titles[i]} to list`;
		let id = `SMD-${i}-${contexts[i]}`;
		chrome.contextMenus.create({
			id: id,
			title: title,
			contexts: [contexts[i]]
		});
	}
}

createMenus();

chrome.contextMenus.onClicked.addListener((info, tab) => {
	let contexts = ["frame", "page", "selection", "link", "image"/* , "link", "image" */];
	let context = contexts.filter((c) => info.menuItemId.endsWith(c))[0];
	menu_info = info;
	menu_info.context = context;
	if (info.menuItemId.search("now") > -1) menu_info.now = true;
	pageIndicator = session.baseList.length > 0 ? -1 : 1;
	addLinksViaMenu(menu_info, tab.id);
});

function addLinksViaMenu(info, tabId) {
	if (info.context === "selection" && info.selectionText && info.selectionText.trim().length > 0) {
		startPageExtraAction_prepare("menu-multi-sel", tabId);
	}
	else if (info.context === "link" || info.context === "image") {
		startPageExtraAction_prepare("menu-link", tabId);
	}
	else startPageExtraAction_prepare("menu-multi", tabId);
}

function startPageExtraAction_prepare(requestOrigin, tabId) {
	chrome.tabs.query({
		currentWindow: true,
		active: true
	}, (tabs) => {
		if (err()) return;
		chrome.webNavigation.getAllFrames({ tabId: tabs[0].id }, function (framesInfo) {
			if (err()) return;
			let framesIds = framesInfo
				.filter((obj) => obj.url && !obj.errorOccurred)
				.map((obj) => obj.frameId);
			framesData[tabs[0].id] = { framesIds: framesIds, links: [] };
			startPageExtraAction(requestOrigin, tabId);
		});
	});
}

function startPageExtraAction(requestOrigin, tabId) {
	let info = {};
	if (requestOrigin.startsWith("menu-multi") || requestOrigin === "menu-link") info = cloneDataObj(menu_info);

	info.origin = requestOrigin;
	info.recognizeTextLinks = recognizeTextLinks;
	let idata = JSON.stringify(info);

	chrome.tabs.executeScript(tabId, {
		code: `if(typeof idata ===  "undefined") var idata = ${idata};
		else idata = ${idata};
		if(typeof alreadyInjected === "undefined") {chrome.runtime.sendMessage({ type: "ready for inject"});}
		else {start();}`,
		allFrames: true,
		matchAboutBlank: true
	}, function () {
		let e = chrome.runtime.lastError;
		if (e) {
			if (requestOrigin === "tabs") {
				tabsScan.fails.push(tabId);
			}
			else onError(e, "startPageExtraAction");
		}
	});
}

function addItemsToDatacenter(L, options) {

	let opts = options || {};
	let showLoader = opts.origin === "button" || opts.origin === "local";
	let u = 0, v = 0;
	if (opts.origin === "local") L = cloneDataObj(L);
	let batchId = undefined;
	if(showLoader) batchId = opts.batchId || (opts.tabId ? opts.tabId + "#" + opts.frameId : undefined);
	L = L.filter(function (item) {

		let already = false;

		let rid = dataurls[item.mainUrl];
		if(rid){
			let test_2 = !opts.now && !opts.toQueue && session.baseList.includes(rid);
			let test_3 = (opts.now || opts.toQueue) && session.baseList2.includes(rid);
			if(test_2 || test_3) already = true;			
		}

		let boolx = !already;
		if (!boolx) v = v + 1;
		let isInternal = ["SCRIPT", "LINK"].includes(item.tag);
		let booly = showInternalLinks || !isInternal;
		if (boolx && booly) u = u + 1;

		return boolx && booly;
	});

	for (let i = 0; i < L.length; ++i) {
		L[i].rid = "r" + counter().toString();
		L[i].checked = false;
		L[i].fstate = 0;
		L[i].rqinfo = {};
		L[i].errors = [];
		L[i].initialUrl = L[i].mainUrl;
		L[i].mask = isChrome ? "{auto}" : "{name}.{ext}";
		L[i].directory = opts.directory || "";
		if (typeof opts.tabId !== "undefined") L[i].tabId = opts.tabId;
		if (typeof opts.frameId !== "undefined") L[i].frameId = opts.frameId;
		addInfo(L[i]);

		datacenter[L[i].rid] = L[i];
		dataurls[L[i].mainUrl] = L[i].rid;
		if (!opts.now && !opts.toQueue && !opts.parentRid) {
			session.baseList.push(L[i].rid);
		}

		if (opts.parentRid) {
			L[i].cls = "extra";
		}

		let eid = L[i].eid;
		if (eid) {
			let info = extraImgInfo[L[i].tabId + "#" + L[i].frameId + "#" + eid];
			if (info) {
				L[i].naturalHeight = info.naturalHeight;
				L[i].naturalWidth = info.naturalWidth;
				delete extraImgInfo[L[i].tabId + "#" + L[i].frameId + "#" + eid];
			}
		}
	}

	if (!opts.now && !opts.toQueue) {

		let bool = true;
		for (let i = 0; i < L.length; ++i) {
			if (L[i].category === "image" && (bool || !L[i].extraImg) && L[i].legalImg) session.baseListPics.push(L[i].rid);
		}
	}

	let newRids = L.map((x) => x.rid);

	if (!opts.now && !opts.toQueue) {
		let fetchList = L.filter((obj) => {
			if (obj.mainUrl.startsWith("data:")) return false;
			if (obj.ext === "img") return true;
			return !!(getQueryPart(obj.mainUrl));
		}).map((x) => x.rid);
		addFetchInfo(fetchList);
	}

	if (opts.origin.startsWith("menu")) {
		session.menuNotification.u = session.menuNotification.u + u;
		session.menuNotification.v = session.menuNotification.v + v;
	}

	if (opts.origin === "tabs") {
		tabsScan.total = tabsScan.total + u;
		tabsScan.duplicates = tabsScan.duplicates + v;
		send({ type: "call showTabsScanProgress", info: tabsScan });
	}

	if (opts.parentRid) {
		deepScan.total = deepScan.total + u;
		let index = session.baseList.indexOf(opts.parentRid);
		let N = L.map((obj) => obj.rid);
		session.baseList.splice(1 + index, 0, ...N);
	}

	if (opts.now || opts.toQueue) {
		let info = { list: newRids, now: opts.now, origin: opts.origin, applyMR: opts.applyMR, toQueue: opts.toQueue };
		if(batchId) {
			session.activeBatches.push(batchId);
			info.batchId = batchId;
		}		
		addItemsToDownloadList(info);
		if (!session.opened) session.panel = "downloads";
	}
	else {

		let info = { newRids: newRids, parentRid: opts.parentRid, origin: opts.origin/* , fromClipboard: opts.fromClipboard */ };
		if(batchId) {
			session.activeBatches.push(batchId);
			info.batchId = batchId;
		}

		send({ type: "fill resources table", info: info });
		if (!session.opened) {
			session.panel = "resources";
			session.showPictures = false;
		}
	}

	if (!session.opened) {
		addHistoryInfo({newRids: newRids}, requestHistoryInfoUsage);
	}

	if (opts.origin === "local") {
		let text = u === 1 ? "link" : "links";
		let notifMessage = `${u} ${text} added to queue.${v > 0 ? "\n" + v + " links already in download list." : ""}`;
		let notifTitle = "Info";
		sendNotif({ title: notifTitle, text: notifMessage });

	}

}

function requestHistoryInfoUsage(L) {

	send({ type: "call useHistoryInfo", info: L });

}

function addOrUpdatePathData(data, path) {
	data.finalName = path.split(/(\/|\\)/g).slice(-1)[0];
	data.path = path;
	let leafName = path.split(sep).pop();
	if (leafName) data.ext = estimateExt(leafName);

	if (data.external) data.externalDirectory = path.slice(0, path.length - data.finalName.length);
	data.downloadOptions.filename = data.finalName;

	let delay = data.external ? 300 : 0;
	setTimeout(() => {

		send({ type: "call updateFilename", info: data.rid });
	}, delay);

}

function removeFakeItem(rid) {

	let url = datacenter[rid].mainUrl;
	delete dataurls[url];
	delete datacenter[rid];

	xout(session.baseList2, rid); 
	send({ type: "remove fake external row", info: rid });
}

function addExternalLinkToDatacenter(item, restore) {

	let data = { mainUrl: item.url, text: "", title: "", alt: "" };
	data.rid = "r" + counter().toString();
	data.startTime = item.startTime;
	data.external = true;
	data.checked = false;
	data.fstate = 0;
	data.rqinfo = {};
	data.errors = [];
	data.initialUrl = item.url;
	data.mask = isChrome ? "{auto}" : "{name}.{ext}";

	let smdDirectory = session.inputs.directory || "";

	data.directory = isChrome ? smdDirectory : "";

	addInfo(data);
	datacenter[data.rid] = data;
	data.id = item.id;
	ids[data.id] = data.rid;

	data.finalName = buildNameFromMask(data, { mask: data.mask, sanitize: true, index: 0 });

	data.downloadOptions = {
		filename: data.finalName,
		saveAs: false,
		url: data.mainUrl
	};

	if (item.filename) {
		addOrUpdatePathData(data, item.filename);

	}

	session.baseList2.push(data.rid);
	session.allSelected = false;

	if (restore) {
		estimateStatusFromItem(data, item);

		data.activity = { refbytes: 0 };
		if (data.status === "down-B") data.activity.reftime = Date.now();
		if (item.totalBytes && item.totalBytes > -1 && item.bytesReceived) {
			data.percent = (item.bytesReceived / item.totalBytes).toFixed(2);
			if (data.totalBytes !== item.totalBytes) {
				data.totalBytes = item.totalBytes;
				data.size = bytesToSize(item.totalBytes);
			}
			data.partialSize = bytesToSize(item.bytesReceived);
		}
		if (data.status === "down-C") data.totalDuration = getTotalDuration(item);

		iconUrlAction({ id: item.id, mime: item.mime, rid: data.rid });
	}
	else {
		data.selected = false;
		data.status = "down-B";
		data.activity = { refbytes: 0, reftime: Date.now() };

		pwake();
		if (!session.opened) session.panel = "downloads";
		send({ type: "call insertExternalDownload", info: data.rid });

	}

}

function estimateStatusFromItem(data, item) {

	if (item.paused && item.canResume) data.status = "paused";
	else if (item.state === "complete") {
		data.status = "down-C";
		data.done = true;
	}
	else if (item.state === "in_progress") {
		if (item.error) data.status = "error-warning";
		else data.status = "down-B";
	}
	else {
		let reason = item.error;
		if (reason) {
			if (reason.search("CANCELED") > -1) data.status = "user-canceled";
			else data.status = "error-warning";
		}
	}
}

function requestFurtherGalleryInfo() {
	var rids = session.filteredListPics.filter((rid) => {
		let data = datacenter[rid];
		return !data.ext || data.ext.toLowerCase() === "img";
	});
	addFetchInfo(rids);
}

function addItemsToDownloadList(options) {
	let opts = options || {};
	let base = opts.list || session.baseList.filter((rid) => datacenter[rid].checked);
	let L = [];
	let defaultMask = isChrome ? "{auto}" : "{name}.{ext}";
	let globalDirectory = opts.directory || session.inputs.directory || "";

	base.forEach(function (rid) {
		let data = datacenter[rid];
		if (!data) return;
		if (!data.directory) data.directory = globalDirectory;
		if (session.baseList2.indexOf(rid) > -1) return;
		if (data && data.status) {
			if (data.status === "down-C") {

				data.status = "fetch-C";
			}

		}
		let ok = session.displayedType !== "name" && session.displayedType !== "url" && data[session.displayedType];
		let mask = ok ? `{${session.displayedType}}.{ext}` : defaultMask;
		if (opts.now && opts.list) mask = defaultMask;

		data.status = data.status || "listed";
		data.mask = mask;

		if (data.status !== "down-C" && !opts.now) data.selected = true;
		if (includeUnstarted) data.storable = true;

		if (opts.applyMR) {
			data.applyMR = true;
			if (data.fstate === 2) applyMR(rid);

			else data.prelimFinalName = buildNameFromMask(data, { mask: data.mask, sanitize: true, index: 0, odf: false });
		}
		else data.finalName = buildNameFromMask(data, { mask: data.mask, sanitize: true, index: 0, odf: false });
		L.push({ rid: rid, finalName: data.finalName, url: data.mainUrl, directory: data.directory });
	});

	L = unique(L, (x, y) => x.finalName === y.finalName && x.url === y.url && x.directory === y.directory);
	for (let i = 0; i < L.length; ++i) {
		session.baseList2.push(L[i].rid);
	}

	if (opts.now) {
		startQuickDownloads(L.map((obj) => obj.rid), opts.origin);
		session.cp.downPager = -1;
		if (!session.opened) session.panel = "downloads";
		session.freshDownloads = true;

	}

	if (opts.toQueue) {
		session.cp.downPager = -1;
		send({ type: "update downloads view" });
		let info = {newRids: opts.list};
		if(options.batchId) info.batchId = options.batchId;
		addHistoryInfo(info);
	}
	return L;
}

function buildNameFromMask(data, options) {
	let result = "";
	let mask = options.mask;
	let sParams = getUrlSearchParams(data.mainUrl);
	if (mask.trim() === "") mask = isChrome ? "{auto}" : "{name}.{ext}";

	var lsep = "\u001D"; 
	var rsep = "\u001F"; 
	if (!options.odf) mask = mask.replace(/\{auto\}/g, "{name}.{ext}")
		.replace(/\{auto:name\}/g, "{name}")
		.replace(/\{auto:ext\}/g, "{ext}");
	mask = mask.replace(/\\\{/g, lsep).replace(/\\\}/g, rsep);
	let parts = mask.split(regmask);

	if (parts.length === 1) result = parts[0].trim();
	else {
		let L = parts.map(function (part, i) {
			if (i % 2 === 0) return part;
			let maskname = part.slice(1, -1).match(/^[a-zA-Z0-9-:]+/)[0];

			if (!legalMasks.test(maskname)) return part;
			if (maskname === "yy") return (new Date()).getFullYear().toString().slice(-2);
			else if (maskname === "yyyy") return (new Date()).getFullYear().toString();
			else if (maskname === "MM") return ((new Date()).getMonth() + 1).toString().padStart(2, "0");
			else if (maskname === "dd") return (new Date()).getDate().toString().padStart(2, "0");
			else if (maskname === "hh") return (new Date()).getHours().toString().padStart(2, "0");
			else if (maskname === "mm") return (new Date()).getMinutes().toString().padStart(2, "0");
			else if (maskname === "ss") return (new Date()).getSeconds().toString().padStart(2, "0");
			else if (maskname === "ms") return (new Date()).getMilliseconds().toString().padStart(3, "0");
			else if (maskname === "counter") return (options.noCounter ? "" : "1");
			else if (/^c{1,}$/.test(maskname)) return (options.noCounter ? "" : "1".padStart(maskname.length, "0"));
			else if (maskname === "newline") return "\n";
			else if (maskname === "tab") return "\t";
			else if (maskname.startsWith("search:")) return sParams[maskname.slice(7)] || "";
			else if (maskname === "auto:name") return data.autoName;
			else if (maskname === "auto:ext") return data.autoExt;
			else if (maskname.startsWith("extra:")) {
				let value = "";
				if (session.pData.all) {
					let pdata = session.pData.all[data.rid];
					if (pdata) value = pdata["{" + maskname + "}"] || "";
				}
				return value;
			}
			else if (maskname.startsWith("url:")) {
				let value = "";
				let reg = /url:(-?\d+)/;
				if (reg.test(maskname)) {
					let nr = parseInt(maskname.match(reg)[1]);
					let urlparts = getUrlDirs(data.mainUrl);
					value = (nr >= 0 ? urlparts[nr] : urlparts[urlparts.length + nr]) || "";
				}
				return value;
			}
			return data[maskname] || "";
		});
		result = L.join("");
	}
	result = (options.sanitize ? sanitizeFileName(result, 255) : result);
	result = result.replace(/\u001D/g, "{").replace(/\u001F/g, "}");
	return result;
}

function buildDirectoryFromMask(data, options){
	let result = "";
	let mask = options.directory || data.directory || "";
	var lsep = "\u001D"; 
	var rsep = "\u001F"; 
	mask = mask.replace(/\\\{/g, lsep).replace(/\\\}/g, rsep);
	let parts = mask.split(regmask);
	if (parts.length === 1) result = parts[0].trim();
	else {
		let L = parts.map(function (part, i) {
			if (i % 2 === 0) return part;
			let maskname = part.slice(1, -1).match(/^[a-zA-Z0-9-:]+/)[0];
			if (!legalMasksForDirs.test(maskname)) return part;
			if (maskname === "yy") return (new Date()).getFullYear().toString().slice(-2);
			else if (maskname === "yyyy" || maskname === "year") return (new Date()).getFullYear().toString();
			else if (maskname === "MM" || maskname === "month") return ((new Date()).getMonth() + 1).toString().padStart(2, "0");
			else if (maskname === "dd" || maskname === "day") return (new Date()).getDate().toString().padStart(2, "0");
			else if (maskname === "ww" || maskname === "week") return (new Date()).getWeekNumber().toString().padStart(2, "0");
			else if (maskname === "hh") return (new Date()).getHours().toString().padStart(2, "0");
			else if (maskname === "mm") return (new Date()).getMinutes().toString().padStart(2, "0");
			else if (maskname === "ss") return (new Date()).getSeconds().toString().padStart(2, "0");
			else if (maskname === "ms") return (new Date()).getMilliseconds().toString().padStart(3, "0");
			else if (maskname.startsWith("url:")) {
				let value = "";
				let reg = /url:(-?\d+)/;
				if (reg.test(maskname)) {
					let nr = parseInt(maskname.match(reg)[1]);
					let urlparts = getUrlDirs(data.mainUrl);
					value = (nr >= 0 ? urlparts[nr] : urlparts[urlparts.length + nr]) || "";
				}
				return value;
			}
			return data[maskname] || "";
		});
		result = L.join("");
	}

	result = result.replace(/\u001D/g, "{").replace(/\u001F/g, "}");
	if(options.sanitize){
		result = result.split(/[/\\]/g).map((part) => sanitizeFileName(part, 255)).join("/");
	}

	return result;
}

function sendNotif(message) {
	send({ type: "notification", info: message });
}

function addFetchInfo(L) {

	for (let rid of L) {
		if (!session.queue.includes(rid) && datacenter[rid].fstate === 0) {
			datacenter[rid].status = "fetch-A";
			session.queue.push(rid);
		}
	}
	advance();
}

function cleanDatacenterBeforeFillTable() {
	let unneededRids = [];
	unneededRids = session.baseList.filter((x) => !datacenter[x].status);
	emptyArrays(session.baseList, session.baseListPics, session.checkedList, session.filteredList, session.filteredListPics);
	if (unneededRids.length > 0) unneededRids.forEach((rid) => {
		let url = datacenter[rid].mainUrl;
		delete dataurls[url];
		delete datacenter[rid];		
	});
}

function setRegExt(str) {
	let prepared_str = str.split(/\W+/g).filter((x) => x.trim().length > 0).join("|");
	reg_ext = new RegExp(prepared_str, "i");
}

function sc_setRegExt(str) {
	let prepared_str_ext = str.split(/\W+/g).filter((x) => x.trim().length > 0).join("|");
	if (prepared_str_ext) sc_reg_ext = new RegExp(prepared_str_ext, "i");
	else { sc_reg_ext = undefined; }
}

function tb_setRegExt(str) {
	let prepared_str_ext = str.split(/\W+/g).filter((x) => x.trim().length > 0).join("|");
	if (prepared_str_ext) tb_reg_ext = new RegExp(prepared_str_ext, "i");
	else { tb_reg_ext = undefined; }
}

let normPart = { a: "all", t: "title", u: "url", x: "text", l: "alt", n: "name" };

function splitParts(str, defaultSource) {
	let source_part = defaultSource;
	let text_part = str;
	var sources = ["all", "a", "url", "u", "text", "x", "title", "t", "alt", "l", "name", "n", "purl", "ptext", "ptitle", "palt", "pname"];
	for (let source of sources) {
		if (str.startsWith(`${source}:`)) {
			source_part = normPart[source] || source;
			text_part = str.slice(1 + source.length);
			break;
		}
	}
	return { source_part: source_part, text_part: text_part.replace(/(:)/g, "\\$1") };
}

function setRegText(str) {
	let L;
	let textFilterMode = str.startsWith("r:") ? "regexp" : "normal";
	if (textFilterMode === "regexp") L = [str.slice(2).trim()];
	else L = str.replace(/([^a-zA-Z0-9:\- ])/g, "\\$1").split(/\s+/);

	reg_text_info = [];

	if (textFilterMode === "normal") {
		let defaultSource = textFilterSource === "all" ? "all" : session.displayedType;
		for (let str of L) {
			let exclude = false;
			if (str.startsWith("-")) {
				str = str.slice(1);
				exclude = true;
			}
			let parts = splitParts(str, defaultSource);
			let reg = parts.text_part ? (new RegExp(parts.text_part, "i")) : /\S/i;
			reg_text_info.push({ source: parts.source_part, reg: reg, exclude: exclude });
		}
	}
	else {
		let source = textFilterSource === "all" ? "all" : session.displayedType;
		reg_text_info.push({ reg: (new RegExp(L[0], "i")), source: source });
	}
}

function sc_setRegText(str) {
	if (!str) {
		sc_reg_text_info = undefined;
		return;
	}
	let L;
	let textFilterMode = str.startsWith("r:") ? "regexp" : "normal";
	if (textFilterMode === "regexp") L = [str.slice(2).trim()];
	else L = str.replace(/([^a-zA-Z0-9:\- ])/g, "\\$1").split(/\s+/);
	sc_reg_text_info = [];

	if (textFilterMode === "normal") {
		let defaultSource = sc_textFilterSource;
		for (let str of L) {
			let exclude = false;
			if (str.startsWith("-")) {
				str = str.slice(1);
				exclude = true;
			}
			let parts = splitParts(str, defaultSource);
			let reg = parts.text_part ? (new RegExp(parts.text_part, "i")) : /\S/i;
			sc_reg_text_info.push({ source: parts.source_part, reg: reg, exclude: exclude });
		}
	}
	else {
		sc_reg_text_info.push({ reg: (new RegExp(L[0], "i")), source: sc_textFilterSource });
	}
}

function tb_setRegText(str) {
	if (!str) {
		tb_reg_text_info = undefined;
		return;
	}
	let L;
	let textFilterMode = str.startsWith("r:") ? "regexp" : "normal";
	if (textFilterMode === "regexp") L = [str.slice(2).trim()];
	else L = str.replace(/([^a-zA-Z0-9:\- ])/g, "\\$1").split(/\s+/);
	tb_reg_text_info = [];

	if (textFilterMode === "normal") {
		let defaultSource = tb_textFilterSource;
		for (let str of L) {
			let exclude = false;
			if (str.startsWith("-")) {
				str = str.slice(1);
				exclude = true;
			}
			let parts = splitParts(str, defaultSource);
			let reg = parts.text_part ? (new RegExp(parts.text_part, "i")) : /\S/i;
			tb_reg_text_info.push({ source: parts.source_part, reg: reg, exclude: exclude });
		}
	}
	else {
		tb_reg_text_info.push({ reg: (new RegExp(L[0], "i")), source: tb_textFilterSource });
	}
}

function everyTest(obj, data) {
	let sources = [];
	if (obj.source === "all") {
		sources = [data.name, data.url, data.text, data.title, data.alt, data.pname, data.purl, data.ptext, data.ptitle, data.palt];
	}
	else sources = [data[obj.source]];
	sources = sources.filter((x) => x !== undefined);
	if (obj.exclude) {
		if (sources.length === 0) return true;
		return sources.every((x) => !obj.reg.test(x));
	}
	else {
		if (sources.length === 0) return false;
		return sources.some((x) => obj.reg.test(x));
	}

}

function testResource(rid/* , bubu */) {

	let data = datacenter[rid];
	let boolx = !reg_ext || reg_ext.test(data.ext);
	if (!boolx) return false;
	let booly = !reg_text_info || reg_text_info.every((obj) => everyTest(obj, data));
	return boolx && booly;
}

function testImageResource(rid) {
	let data = datacenter[rid];
	let boolx = testResource(rid);
	let booly = (data.naturalWidth || 0) >= session.minw && (data.naturalHeight || 0) >= session.minh;
	return boolx && booly;
}

function testExtraScanResource(data) {
	let boolx = !sc_reg_ext || sc_reg_ext.test(data.ext);
	if (!boolx) return false;
	let booly = !sc_reg_text_info || sc_reg_text_info.every((obj) => everyTest(obj, data));
	return boolx && booly;
}

function testTabsScanResource(data) {
	let boolx = !tb_reg_ext || tb_reg_ext.test(data.ext);
	if (!boolx) return false;
	let booly = !tb_reg_text_info || tb_reg_text_info.every((obj) => everyTest(obj, data));
	return boolx && booly;
}

function updateFilteredList() {
	session.filteredList = session.baseList.filter(testResource);
	session.filteredListPics = session.baseListPics.filter(testImageResource);
}

if (odf) {
	setTimeout(() => {
		chrome.downloads.onDeterminingFilename.addListener(function (item, __suggest) {
			let lastErr = chrome.runtime.lastError;
			if (lastErr) {
				return;
			}

			function suggest(filename) {
				let lastErr = chrome.runtime.lastError;
				if (lastErr) {
					return;
				}
				if (item.state !== "in_progress") return;
				__suggest({
					filename: filename
				});
			}

			if (item.state !== "in_progress") return;

			let fData = fakeDownloadData[item.id];
			if (fData) {
				if (fData.name) suggest(fData.name);
				return;
			}
			let rid = ids[item.id];
			if (!rid) {
				return;
			}
			let data = datacenter[rid];
			if (!data) return;

			let filename, dir;

			let auto = /\{auto\}|\{auto:name\}|\{auto:ext\}/.test(data.mask);
			if (auto) {

				if (data.indicatedName) {
					data.mask = data.mask.replace(/\{auto\}/g, "{name}.{auto:ext}");
					data.mask = data.mask.replace(/\{auto:name\}/g, "{name}");
				}

				data.ext = estimateExt(item.filename);
				data.autoExt = data.ext;

				let autoName = data.ext.length > 0 ? item.filename.slice(0, -1 + item.filename.length - data.ext.length) : item.filename;

				data.autoName = autoName;
				data.auto = item.filename;

				if (!data.indicatedName) data.name = autoName;

				setAutomaticFoldersforItem(rid);

				let dir = buildDirectoryFromMask(data, {sanitize: true}) || "";
				if (!dir && data.automaticFolders && data.automaticFolders.length === 1) {
					dir = data.automaticFolders[0];
					data.directory = dir;
				}
				let options = { mask: data.mask, sanitize: true, odf: true };
				filename = buildNameFromMask(data, options);
				if (dir) {
					filename = dir + sep + filename;
					data.unmaskedDir = dir;
				}
			}
			else {
				filename = data.finalName;
				setAutomaticFoldersforItem(rid);

				let dir = buildDirectoryFromMask(data, {sanitize: true}) || "";
				if (!dir && data.automaticFolders && data.automaticFolders.length === 1) {
					dir = data.automaticFolders[0];
					data.directory = dir;
				}
				if (dir) {
					filename = dir + sep + filename;
					data.unmaskedDir = dir;
				}
			}

			suggest(filename);
		});
	}, 1000);
}

function prepareUnitDownload(rid, options) {
	let data = datacenter[rid];
	let opts = options || {};
	if (!data || !data.mainUrl) {
		advance();
		return;
	}
	send({ type: "unselect", rid: rid });
	if (["fetch-C", "down-A"].includes(data.status)) {
		let parts = [data.finalName];

		let dir = buildDirectoryFromMask(data, {sanitize: true}) || "";

		if (!dir && data.automaticFolders && data.automaticFolders.length === 1) {
			dir = data.automaticFolders[0];
			if (isFirefox) data.directory = dir;
		}
		if (dir) {
			parts.unshift(dir);
			data.unmaskedDir = dir;
		}
		let downloadOptions = {
			filename: parts.join(sep),
			saveAs: opts.saveAs || false,
			url: data.mainUrl
		};
		if (data.mainUrl.startsWith("data:")) {
			downloadOptions.url = URL.createObjectURL(dataURLtoBlob(data.mainUrl));
		}
		datacenter[rid].downloadOptions = downloadOptions;
		startUnitDownloading(rid);
	}
	else if (data.status === "paused") {
		startUnitResuming(rid);
	}
	else if (["down-C", "user-canceled"].includes(data.status)) {
		retakeDownload(rid);
	}
}

function startUnitDownloading(rid) {
	let data = datacenter[rid];
	recentUrls[data.mainUrl] = rid;
	chrome.downloads.download(data.downloadOptions, function (x) {
		let lastErr = chrome.runtime.lastError;
		if (lastErr) {
			furtherActionOnError(rid, lastErr);
			return;
		}

		send({ type: "setIcon", info: { rid: rid, icon: "down-B", disableEdit: true } });
		data.status = "down-B";
		delete data.pscheduled;
		data.id = x;
		if (ids[x]) {
			let fakeRid = ids[x];
			removeFakeItem(fakeRid);
		}
		ids[x] = rid;
		data.activity = { refbytes: 0, reftime: Date.now() };

		data.storable = false;
		storeCurrentDownloads();
		pwake();
		chrome.downloads.search({ id: x }, (L) => data.startTime = L[0].startTime);
	});
}

function startUnitPausing(rid, userInitiated) {
	let data = datacenter[rid];
	setTimeout(function () {
		chrome.downloads.pause(data.id, function () {
			let lastErr = chrome.runtime.lastError;
			if (lastErr) {
				furtherActionOnError(rid, lastErr);
				return;
			}
			chrome.downloads.search({ id: data.id }, function (/* L */) { });
			if (userInitiated) { data.manualPaused = true; }
		});
	}, 1000);
}

function startUnitResuming(rid, errorAction) {
	let id = datacenter[rid].id;
	chrome.downloads.resume(id, function () {
		let lastErr = chrome.runtime.lastError;
		if (lastErr) {

			if (errorAction) errorAction(rid);
			else furtherActionOnError(rid, lastErr);
			return;
		}
	});
}

function startUnitCanceling(rid, userInitiated) {

	let data = datacenter[rid];
	if (data.fstate === 1) {
		if (fControl[rid]) {
			fControl[rid].abort();
			delete fControl[rid];
			data.status = "user-canceled";
			send({ type: "setIcon", info: { rid: rid, icon: "user-canceled" } });
		}
		return;
	}

	let id = data.id;
	if (!id) return;
	chrome.downloads.cancel(id, function () {
		let lastErr = chrome.runtime.lastError;
		if (lastErr) {
			furtherActionOnError(rid, lastErr);
			return;
		}
		partialReset(data);
		if (userInitiated) {
			data.status = "user-canceled";
			send({ type: "setIcon", info: { rid: rid, icon: "user-canceled" } });
		}
		else {

		}
		clearSlot(rid);
		advance();
		pwake();
		sendDataForPopups(rid, false);
	});
}

function pwake() {
	if (!pmode) {
		onProgress();
		pmode = true;
	}
}

function testFreeSlots() {
	let aHosts = Object.keys(hCenter);
	let allHosts = getAllHosts();
	if (allHosts.length === 0) return -1;
	let max = Math.min(nmax, allHosts.length);
	let hmax = session.throttleMode ? 1 : nhmax;
	if (aHosts.length < max) {
		return 1;
	}
	if (aHosts.length === max) {
		for (let h of aHosts) {
			if (hCenter[h].length < hmax) {
				return 1;
			}
		}
	}
	return 0;
}

function getCandidate() {
	let result = "";
	let hmax = session.throttleMode ? 1 : nhmax;
	for (let rid of session.queue) {
		let host = datacenter[rid].host || "";
		let boolx = !hCenter[host] && Object.keys(hCenter).length < nmax;
		let booly = hCenter[host] && hCenter[host].length < hmax;
		if (boolx || booly) {
			result = rid;
			break;
		}
	}
	return result;
}

function getInterval(host) {
	let interval = throttleInterval * 1000;
	let ref_time = hRef[host];
	if (ref_time) {
		let t1 = Date.now() - ref_time;
		if (t1 >= interval) interval = 0;
		else interval = interval - t1;
	}
	else interval = 0;
	return interval;
}

function getAllHosts() {
	let A = [];
	for (let rid of session.queue) {
		let host = datacenter[rid].host;
		if (!A.includes(host)) A.push(host);
	}
	return A;
}

function clearSlot(rid, options) {
	let data = datacenter[rid];
	let opt = options || {};
	let h = data.oldHost || data.host;
	delete data.oldHost;
	if (!hCenter[h]) return;
	xout(hCenter[h], rid);
	if (hCenter[h].length === 0) delete hCenter[h];
	if (session.throttleMode) hRef[h] = Date.now();
	if (session.queue.length === 0) send({ type: "end queue", info: {} });
	data.scheduled = !!opt.scheduled;
}

function partialReset(data) {
	delete data.percent;
	data.activity = { refbytes: 0 };
	delete data.timeRemaining;
	delete data.partialSize;
}

function updateUIAfterFetch(rid) {
	send({ type: "call updateUIAfterFetch", info: { rid: rid } });
}

function xAdvance() {
	let rid = getCandidate();
	if (!rid) return false;
	let data = datacenter[rid];
	let host = data.host;
	if (!hCenter[host]) hCenter[host] = [rid];
	else hCenter[host].push(rid);
	xout(session.queue, rid);

	if (data.fstate > 0 || data.external) {

		let info = { rid: rid, icon: data.status };
		if (data.pscheduled) info.modifier = "forced";
		send({ type: "setIcon", info: info });

		if (session.throttleMode) {
			let interval = getInterval(host);
			setTimeout(function () {
				prepareUnitDownload(rid);
			}, interval);
		}
		else prepareUnitDownload(rid);
	}
	else {
		let action = function () {
			data.fstate = 2;
			data.fetchRefTime = null;
			data.status = "fetch-C";
			if (data.scheduled) {
				if (data.host === host) {
					setTimeout(function () {
						prepareUnitDownload(rid);
					}, session.throttleMode ? ftInterval * 1000 : 0);
				}
				else {
					clearSlot(rid, { host: host, scheduled: true });
					session.queue.unshift(rid);
					advance();
				}

				data.status = "down-A";
				let info = { rid: rid, icon: "down-A" };
				if (data.pscheduled) info.modifier = "forced";
				send({ type: "setIcon", info: info });
			}
			else {
				clearSlot(rid);
				send({ type: "setIcon", info: { rid: rid, icon: "fetch-C" } });
				advance();
			}

			updateUIAfterFetch(rid);
		};

		data.fstate = 1;
		data.status = "fetch-B";
		send({ type: "setIcon", info: { rid: rid, icon: "fetch-B", disableEdit: false } });

		setTimeout(function () {
			getPrelimInfo(rid, action);
		}, session.throttleMode ? getInterval(host) : 0);
	}

	return true;
}

function advance() {
	let bool = xAdvance();
	if (bool) {
		let freeSlots = testFreeSlots();
		if (freeSlots === 1) advance(true);
	}
}

function startSelected() {
	let legals = ["listed", "paused", "fetch-A", "fetch-B", "fetch-C"/*, "down-C",  "user-canceled" */];
	let lastAlreadyScheduledIndex = -1;
	for (let i = session.queue.length - 1; i > -1; --i) {
		if (datacenter[session.queue[i]].scheduled) {
			lastAlreadyScheduledIndex = i;
			break;
		}
	}

	let L = session.baseList2.filter(function (rid) {
		let data = datacenter[rid];

		return data.selected && legals.includes(data.status) && !data.scheduled;
	});
	let out = [];
	L.forEach(function (rid) {
		datacenter[rid].scheduled = true;

		if (datacenter[rid].status === "fetch-B") out.push(rid);
	});

	out.forEach((rid) => xout(L, rid));

	L.forEach((rid) => xout(session.queue, rid));

	session.queue.splice(lastAlreadyScheduledIndex + 1, 0, ...L);

	advance();
}

function startQuickDownloads(N/* , origin */) {
	let lastAlreadyScheduledIndex = -1;
	for (let i = session.queue.length - 1; i > -1; --i) {
		if (datacenter[session.queue[i]].scheduled) {
			lastAlreadyScheduledIndex = i;
			break;
		}
	}

	let out = [];
	N.forEach(function (rid) {
		datacenter[rid].scheduled = true;
		if (datacenter[rid].status === "fetch-B") out.push(rid);
	});

	out.forEach((rid) => xout(N, rid));

	N.forEach((rid) => xout(session.queue, rid));

	session.queue.splice(lastAlreadyScheduledIndex + 1, 0, ...N);

	send({ type: "update downloads view" });
	advance();
}

function pauseAll() {
	session.baseList2.forEach(function (rid) {
		let data = datacenter[rid];
		data.scheduled = false;
		if (data.fstate === 2) xout(session.queue, rid);
	});
	chrome.downloads.search({ state: "in_progress" }, function (L) {
		let owns = L.filter((x) => !!ids[x.id]).map((x) => ids[x.id]);
		owns.forEach((rid) => startUnitPausing(rid));
	});
}

function sendDataForPopups(rid, resizeNeeded) {
	send({ type: "call prepareUpdatePopups", info: { rid: rid, resizeNeeded: resizeNeeded } });
}

function cleanErrorMessage(errorMsg) {
	if (errorMsg === "None") return "None";
	let reg = /[A-Z_]{3,}/g;
	if (reg.test(errorMsg)) {
		return errorMsg.match(reg).join(", ");
	}
	return "";
}

function addToErrorsList(rid, errorMsg, sendDataToInfoPopup) {
	if (!errorMsg) return;
	errorMsg = cleanErrorMessage(errorMsg);
	if (!errorMsg) return;
	let data = datacenter[rid];
	let send = sendDataToInfoPopup;
	if (data.errors.includes(errorMsg)) {
		let k = data.errors.indexOf(errorMsg);
		if (k === data.errors.length - 1) send = false;
		else {
			data.errors.splice(data.errors.indexOf(errorMsg), 1);
			data.errors.push(errorMsg);
		}
	}
	else data.errors.push(errorMsg);
	if (send) sendDataForPopups(rid, true);
}

function furtherActionOnError(rid, errorMsg) {
	let data = datacenter[rid];
	if (!errorMsg) return;
	let error = errorMsg.message || errorMsg;
	let id = data.id;

	setTimeout(() => addToErrorsList(rid, error, true), 500);

	if (!id) {
		data.status = "error-warning";
		send({ type: "setIcon", info: { rid: rid, icon: "error-warning" } });
		advance();
		pwake();
		return;
	}
}

function handleErased(id) {
	let rid = ids[id];
	if (rid) {
		session.baseList2.splice(session.baseList2.indexOf(rid), 1);
		send({ type: "call removeDownItem", info: { rid: rid } });
	}

}

chrome.downloads.onErased.addListener(handleErased);

function handleCreated(item) {
	if (ids[item.id]) return;
	if(isChrome && (initTime > Date.parse(item.startTime))){
		waitBeforeRestoring = true;
		t0 = Date.now();
		return;
	}

	let rid = recentUrls[item.url];
	if (rid && session.baseList2.includes(rid)) {
		delete recentUrls[item.url];
		return;
	}

	if (!fakeDownloads[item.url]) {
		addExternalLinkToDatacenter(item);
	}
}

chrome.downloads.onCreated.addListener(handleCreated);

function getTotalDuration(item) {
	let duration = Date.parse(item.endTime) - Date.parse(item.startTime);
	if (duration) duration = time2(duration);
	return duration || "n.a";
}

function handleChanged(delta) {

	if (fakeDownloads[delta.id] && delta.state && delta.state.current === "complete") {
		let fdata = fakeDownloadData[delta.id];
		let type = fdata.type;
		if (type === "buildFileIcon") {
			let mime = fdata.mime;
			let exts = fdata.exts;
			let info = { id: delta.id, mime: mime, exts: exts };
			iconUrlAction2(info, () => {
				if (!fdata.isFirstIcon) {
					chrome.downloads.removeFile(delta.id, function () {
						chrome.downloads.erase({ id: delta.id }, function () { });
					});
				}
			});
			return;
		}
		else {
			chrome.downloads.erase({ id: delta.id }, function () { });

		}
		if (isChrome && type === "export") sendNotif({ text: `${fakeDownloadData[delta.id].n} items exported` });

		return;
	}

	chrome.downloads.search({ id: delta.id }, function (L) {
		let item = L[0];
		if (!item) {
			return;
		}
		let unCatchedExternal = !ids[delta.id];
		if (unCatchedExternal) {
			addExternalLinkToDatacenter(item);
		}
		let rid = ids[delta.id];
		if (!rid) return;
		let data = datacenter[rid];
		let monitor = false;
		let errorMsg = "";

		if (delta.filename && delta.filename.current) {
			if (!fakeDownloads[delta.id]) addOrUpdatePathData(data, delta.filename.current);

			monitor = true;
		}

		if (delta.paused && delta.paused.previous) {
			let bool = isFirefox && delta.canResume && delta.canResume.current === false;
			if(!bool){
				data.status = "down-B";
				if (!data.activity) data.activity = { refbytes: 0 };
				data.activity.reftime = Date.now();
				monitor = true;
			}
		}

		if (delta.paused && delta.paused.current) {
			if (isChrome || (isFirefox && delta.canResume && delta.canResume.current)) {
				clearSlot(rid, { scheduled: true });
				data.status = "paused";
				monitor = true;
			}
		}

		if (delta.state && delta.state.current === "complete") {

			data.status = "down-C";
			data.done = true;
			ok[data.initialUrl] = true;
			clearSlot(rid);

			data.totalDuration = getTotalDuration(item);
			if (isFirefox) {
				if (item.startTime) data.totalDuration = time2(Date.now() - Date.parse(item.startTime));
				else data.totalDuration = "n.a";
			}
			monitor = true;
			onComplete(delta.id);
			if(item.filename) data.path = item.filename;

			addOrUpdateItem(data);

			if (data.directory) updateRecentFolders(data.directory);
			if (data.external && !session.opened) {
				session.panel = "downloads";
				session.cp.downPager = -1;
			}

			iconUrlAction({ id: delta.id, mime: item.mime, rid: rid });
		}

		if (delta.error) {
			errorMsg = delta.error.current || "";

			if (errorMsg === "FILE_FAILED" && ulen(item.filename) >= 255) {
				let parts = [shortenName(item.filename)];
				let dir = data.directory || "";
				if (dir) parts.unshift(dir);
				data.downloadOptions.filename = parts.join(sep);
				if (data.downloadOptions.filename) retakeDownload(rid);
			}

			if (errorMsg) {

				if (data.status === "paused") {

				}
				else {
					addToErrorsList(rid, errorMsg);
					data.status = errorMsg === "USER_CANCELED" ? "user-canceled" : "error-warning";
				}

				if (item.canResume && data.resumeIfPossible) {
					retakeDownload(rid, false);
					data.resumeIfPossible = false;
				}
				else {
					clearSlot(rid);
				}

			}

			if (!errorMsg) {

				if (delta.state && delta.state.current === "in_progress") {
					data.status = "down-B";
					if (!data.activity) data.activity = { refbytes: 0 };
					data.activity.reftime = Date.now();
					errorMsg = "None";
					addToErrorsList(rid, errorMsg);
				}
			}
			monitor = true;
		}

		if (monitor) {
			send({ type: "setIcon", info: { rid: rid, icon: data.status } });
			sendDataForPopups(rid, true);
			advance();
			pwake();
			storeCurrentDownloads();
		}
	});
}

chrome.downloads.onChanged.addListener(handleChanged);

function reintegrateItem(item) {
	let rid = ids[item.id];
	let data = datacenter[rid];
	let host = getURLhost(item.url);
	data.host = host;
	if (!host) return;
	if (!hCenter[host]) hCenter[host] = [rid];
	else hCenter[host].push(rid);
}

function openImportedFile() {
	$("#choose-import-file").click();
}

function readUrlsFromLocalSource(text) {
	send({type: "show loader"})

	var reg_start_url = /^(http|ftp)/;
	let urls = text.split(/\s/g).map((l) => l.trim()).filter((l) => reg_start_url.test(l));

	let doSilentFetching = urls.length < fmax;
	let L = [];
	for (let url of urls) {
		if (validUrl(url)) {
			let obj = { mainUrl: url, initialUrl: url };
			L.push(obj);
		}
	}
	addItemsToDatacenter(L, { doSilentFetching: doSilentFetching, origin: "local", toQueue: true, batchId: "local" });

}

function adhocDownload(L) {

	let text = L.map((rid, index) => buildExportedLinkFromMask(rid, index, L.length)).join("");
	let file = new Blob([text], { type: "text/plain;charset=utf-8" });
	let href = URL.createObjectURL(file);
	let name = "Exported links " + Date.now() + ".txt";
	let options = { filename: name, saveAs: true, url: href };
	fakeDownloadData[href] = true;
	chrome.downloads.download(options, function (x) {
		fakeDownloads[x] = true;
fakeDownloadData[x] = { type: "export", name: options.filename, n: L.length };

	});
}

function buildExportedLinkFromMask(rid, index, total) {

	let result = "";
	let data = datacenter[rid];
	var lsep = "\u001D"; 
	var rsep = "\u001F"; 
	let mask = exportMask.replace(/\\\{/g, lsep).replace(/\\\}/g, rsep);
	let parts = mask.split(regmask);
	if (parts.length === 1) result = parts[0].trim();
	else {
		let L = parts.map(function (part, i) {
			if (i % 2 === 0) return part;
			let maskname = part.slice(1, -1).match(/^[a-zA-Z-]+/)[0];
			if (!legalMasks.test(maskname)) return part;
			if (maskname === "yy") return (new Date()).getFullYear().toString().slice(-2);
			else if (maskname === "yyyy") return (new Date()).getFullYear().toString();
			else if (maskname === "MM") return ((new Date()).getMonth() + 1).toString().padStart(2, "0");
			else if (maskname === "dd") return (new Date()).getDate().toString().padStart(2, "0");
			else if (maskname === "hh") return (new Date()).getHours().toString().padStart(2, "0");
			else if (maskname === "mm") return (new Date()).getMinutes().toString().padStart(2, "0");
			else if (maskname === "ss") return (new Date()).getSeconds().toString().padStart(2, "0");
			else if (maskname === "ms") return (new Date()).getMilliseconds().toString().padStart(3, "0");
			else if (maskname === "counter") return (1 + index).toString().padStart(total, "0");
			else if (/^c{1,}$/.test(maskname)) return (1 + index).toString().padStart(Math.max(total, maskname.length), "0");
			else if (maskname === "newline") return "\n";
			else if (maskname === "tab") return "\t";
			else if (maskname === "name") {
				let ext = "." + data.ext;
				if (data.finalName.endsWith(ext)) return data.finalName.slice(0, -ext.length);
				return data.finalName || data.name || "";
			}
			return data[maskname] || "";
		});
		result = L.join("");
	}
	result = result.replace(/\u001D/g, "{").replace(/\u001F/g, "}");
	return result;
}

function onProgressSuccess(L) {
	let lastErr = chrome.runtime.lastError;
	if (lastErr) {
		onSearchError(lastErr);
		return;
	}
	let L1 = L.filter((x) => !!ids[x.id] && !["down-C", "user-canceled", "paused"].includes(datacenter[ids[x.id]].status));

	let L2 = L.filter((x) => !!ids[x.id] && x.state === "in_progress" && x.error == null);

	let T = L1.map(function (item) {
		let rid = ids[item.id];
		let data = datacenter[rid];
		if (item.totalBytes && item.totalBytes > -1 && item.bytesReceived) {
			data.percent = (item.bytesReceived / item.totalBytes).toFixed(2);
			if (data.totalBytes !== item.totalBytes) {
				data.totalBytes = item.totalBytes;
				data.size = bytesToSize(item.totalBytes);
			}
			data.partialSize = bytesToSize(item.bytesReceived);
		}

		if (item.estimatedEndTime) {
			data.timeRemaining = time2((new Date(item.estimatedEndTime)).getTime() - Date.now());
		}

		if (item.bytesReceived && item.bytesReceived > data.activity.refbytes) {
			data.activity.refbytes = item.bytesReceived;
			data.activity.reftime = Date.now();
			if (data.stalled) {
				data.stalled = false;

				reintegrateItem(item);
			}

		}
		else if (Date.now() - data.activity.reftime > aInterval) {
			data.stalled = true;
			clearSlot(rid);
			advance();

		}

		if (item.mime) data.mime = item.mime;

		if (isFirefox && item.filename !== data.path) {
			addOrUpdatePathData(data, item.filename);
		}

		return rid;
	});

	send({ type: "call showProgressInfo", info: { list: T } });

	lazy_pmode = (L2.length === 0);
	let ms = lazy_pmode ? lazy_pulse : pulse;
	chrome.browserAction.setBadgeText({ text: L2.length > 0 ? L2.length.toString() : "" });
	if (T.length === 0) {
		pmode = false;
		lazy_pmode = false;
	}
	if (pmode || lazy_pmode) setTimeout(function () { onProgress(); }, ms);
}

function retakeDownload_aux(rid) {
	let data = datacenter[rid];
	let id = data.id;
	chrome.downloads.cancel(id, function () {
		let lastErr = chrome.runtime.lastError;
		if (lastErr) {
			furtherActionOnError(rid, lastErr);
			return;
		}
		erase(rid, id);

		xout(session.queue, rid);
		data.scheduled = true;
		data.pscheduled = true;
		clearSlot(rid);
		data.status = "down-A";
		session.queue.unshift(rid);
		send({ type: "reset download bar", info: { rid: rid } });
		setTimeout(advance, 250);
	});
}

function retakeDownload(rid, resumeIfPossible) {
	let data = datacenter[rid];
	if (!data) return;
	delete data.percent;
	data.activity = { refbytes: 0 };
	delete data.timeRemaining;
	delete data.partialSize;
	let id = data.id;
	data.done = false;
	data.errors = [];

	if (!id) {
		xout(session.queue, rid);
		data.scheduled = true;
		data.pscheduled = true;
		data.status = "down-A";
		session.queue.unshift(rid);
		send({ type: "reset download bar", info: { rid: rid } });
		setTimeout(advance, 250);
	}
	else {
		chrome.downloads.search({ id: id }, function (L) {
			if (L.length === 0) return;
			let item = L[0];
			if (item.state === "in_progress" || item.state === "interrupted") {

				if (item.canResume && resumeIfPossible) {
					data.resumeIfPossible = true;
					startUnitResuming(rid, retakeDownload_aux);
				}

				else retakeDownload_aux(rid);
			}
			else if (item.state === "complete") {
				xout(session.queue, rid);
				data.scheduled = true;
				data.pscheduled = true;
				data.status = "down-A";
				session.queue.unshift(rid);
				clearSlot(rid);
				send({ type: "reset download bar", info: { rid: rid } });

				setTimeout(advance, 250);
			}
		});
	}
}

function removeDownload(rid, deleteFromDisk) {
	let data = datacenter[rid];
	data.storable = false;
	data.scheduled = false;
	data.pscheduled = false;
	xout(session.baseList2, rid);
	xout(session.queue, rid);
	storeCurrentDownloads();

	if (data.status === "down-C" && !deleteFromDisk) {
		erase(rid, data.id);
		return;
	}
	if (["listed", "fetch-A", "fetch-B", "fetch-C", "down-A", "down-B", "user-canceled"].includes(data.status)) {
		if (["fetch-C", "down-A", "down-B", "user-canceled"].includes(data.status)) data.status = "fetch-C";
		else delete data.status;
		data.activity = { refbytes: 0 };
		erase(rid, data.id);
		return;
	}

	let method = (data.status === "down-C" && deleteFromDisk) ? "removeFile" : "cancel";

	if (!data.id) {
		return;
	}
	chrome.downloads[method](data.id, function () {
		let lastErr = chrome.runtime.lastError;
		if (lastErr) {
			furtherActionOnError(rid, lastErr);
			return;
		}
		erase(rid, data.id);
		if (method === "cancel") data.status = "canceled";
	});
}

function erase(rid, id) {
	if (!rid || !id) return;
	delete ids[id];
	delete datacenter[rid].id;
	chrome.downloads.erase({ id: id }, function () {
		let lastErr = chrome.runtime.lastError;
		if (lastErr) {
			furtherActionOnError(rid, lastErr);
			return;
		}
	});
}

function onAfterComplete(L) {
	let lastErr = chrome.runtime.lastError;
	if (lastErr) {
		onSearchError(lastErr);
		return;
	}
	let item = L[0];
	if (!item) return;
	let rid = ids[item.id];
	let data = datacenter[rid];
	data.percent = 1;
	data.selected = false;
	session.allSelected = false;
	data.refsel = false;
	if (item.mime) data.mime = item.mime;
	if (item.fileSize && item.fileSize > -1) {
		data.size = bytesToSize(item.fileSize);
	}
	send({ type: "call showProgressInfo", info: { list: [rid], end: true } });
}

function onSearchError(error) {
	onError(error, "onSearchError");
	if (pmode) setTimeout(function () { onProgress(); }, 100);
}

function onProgress() {
	chrome.downloads.search({ /* state: "in_progress" */ }, onProgressSuccess);
}

function onComplete(id) {
	chrome.downloads.search({ id: id }, onAfterComplete);
}

function parseHeaders(str) {
	var arr = str.trim().split(/[\r\n]+/);
	var map = {};
	arr.forEach(function (line) {
		var parts = line.split(": ");
		var header = parts.shift();
		var value = parts.join(": ");
		map[header.toLowerCase()] = value;
	});
	return map;
}

function fetchFinally(xhr, rid, errors, action) {
	let data = datacenter[rid];
	data.fetch_erorrs = errors;
	collectFurtherData(data);
	if (fControl[rid]) delete fControl[rid];
	action();
}

function getPrelimInfo(rid, action) {
	let data = datacenter[rid];
	var xhr = new XMLHttpRequest();
	xhr.timeout = fInterval;
	var deep = data.requestExtraScan;
	var method = deep ? "GET" : "HEAD";
	fControl[rid] = xhr;
	let errors = [];
	let finalized = false;
	if (!data.url.startsWith("http")) {
		collectFurtherData(data);
		action();
		return;
	}
	xhr.open(method, data.url, true);
	xhr.send();
	xhr.onreadystatechange = function () {
		if (xhr.responseURL && xhr.responseURL !== data.url) {
			data.redirected = true;
			data.mainUrl = xhr.responseURL;
		}
		if (!finalized && this.readyState >= this.HEADERS_RECEIVED) {
			let headers = xhr.getAllResponseHeaders();
			data.headers = parseHeaders(headers);
			let bool = data.headers["content-type"] && data.headers["content-type"].search("html") > -1;
			if (!deep || !bool) {
				fetchFinally(xhr, rid, errors, action);
				finalized = true;
			}

			if (deep && !bool) {
				this.abort();
				deep = false;
			}
		}

		if (deep && this.readyState >= this.DONE) {
			data.fetch_html = xhr.responseText;
			fetchFinally(xhr, rid, errors, action);
			finalized = true;
		}
	};

	xhr.ontimeout = function () {
		if (!finalized) fetchFinally(xhr, rid, errors, action);
		finalized = true;
	};

	xhr.onerror = function () {
		errors.push(`${xhr.status} ${xhr.statusText}`);
	};
}

function collectFurtherData(data) {
	if (data.fetch_html) {

		if (data.requestExtraScan) {
			let L = getExtraLinks(data.fetch_html, data);
			deepScan.done.push(data.rid);
			L.forEach((obj) => {
				for (let x of ["name", "text", "title", "url", "alt"]) obj[`p${x}`] = data[x];
			});

			addItemsToDatacenter(L, { parentRid: data.rid, origin: "extra-scan" });
		}
		else {
			let url = extractURLFromMetaTag(data.fetch_html);
			if (url) {
				data.mainUrl = url;
			}
		}
	}

	if (data.requestExtraScan) {
		xout(deepScan.L, data.rid);
	}

	if (data.headers) {
		if (!data.indicatedName) {
			let disposition = data.headers["content-disposition"];
			if (disposition) data.indicatedName = extractNameFromHeader(disposition);
		}

		if (data.headers["content-type"]) {
			data.mime = data.headers["content-type"];
		}
		if (data.headers["content-length"]) {
			data.size = bytesToSize(parseInt(data.headers["content-length"]));
		}
	}
	addInfo(data);
	if (data.applyMR) applyMR(data.rid);
	let maybeChangeIsNecessary = !data.finalName && (data.redirected || data.indicatedName);
	if (maybeChangeIsNecessary) {
		data.finalName = buildNameFromMask(data, { mask: data.mask, sanitize: true, index: 0 });
	}

	if (data.prelimFinalName) delete data.prelimFinalName;
	setAutomaticFoldersforItem(data.rid);
}

function getExtraLinks(str, data) {
	let parser = new DOMParser();
	let doc = parser.parseFromString(str, "text/html");
	return removeDuplicateURLs(extractLinks(doc, data.mainUrl).filter(testExtraScanResource));
}

function extractURLFromMetaTag(str) {
	let result = "";
	let parser = new DOMParser();
	let doc = parser.parseFromString(str, "text/html");
	let meta = doc.querySelector(`meta[http-equiv="refresh"]`);
	if (meta) {
		let content = meta.getAttribute("content");
		if (content) {
			let reg = /;url=['"\s]+(.+?)['"]?$/i;
			if (reg.test(content)) result = content.match(reg)[1];
		}
	}
	return result;
}

function addInfo(data) {
	data.fakeext = false;
	let initialExt = data.ext;
	let url = data.mainUrl;
	if (!data.mainUrl.startsWith("data:")) {
		let host = getURLhost(data.mainUrl);
		if (data.host) {
			let newHost = host;
			if (newHost !== data.host) {
				data.oldHost = data.host;
				data.host = newHost;
			}
		}
		else data.host = host;

		try {
			data.url = decodeURI(url);
		}
		catch (err) {
			try {
				data.url = unescape(url);
			}
			catch (err) {
				data.url = url;
			}
		}

		let simpleURL = getPathFromUrl(data.url);
		if (!simpleURL.endsWith("/")) {
			if (data.indicatedName) {
				data.ext = estimateExt(data.indicatedName) || "";
				if (data.ext) {
					data.name = data.indicatedName.slice(0, data.indicatedName.length - data.ext.length - 1);
				}
				else data.name = data.indicatedName;

			}
			else {
				data.name = getSimpleName(simpleURL);
				data.ext = estimateExt(simpleURL);

				if (data.name.startsWith("www.")) {
					data.ext = "htm";
					data.fakeext = true;
				}

			}
		}
		else {
			if (data.tag !== "IMG") {
				data.ext = "htm";
				data.fakeext = true;
			}
			data.name = getName(simpleURL.slice(0, -1));
		}

		if (data.tag === "SCRIPT") {
			data.ext = "js";
			data.fakeext = false;
		}
	}
	else {
		data.mime = extractMimeFromDataUrl(data.mainUrl);
		data.url = data.mainUrl;
		data.name = "index";
		data.host = "";
	}

	if (data.mime) {
		let obj = extractTypeFromHeader1(data.mime);
		let ext = obj.ext;
		if (ext && (obj.trusted || !data.ext)) {
			data.ext = ext;
			data.fakeext = obj.trusted;
		}
	}

	if (!data.ext) {
		if (data.mime) {
			let ext = extractTypeFromHeader2(data.mime);
			if (ext) {
				data.ext = ext;
				data.fakeext = true;
			}
			else {
				let ext = extractTypeFromHeader3(data.mime);
				if (ext) {
					data.ext = ext;
					data.fakeext = true;
				}
			}
		}
		else if (data.tag === "A") {
			data.ext = "htm";
			data.fakeext = true;
		}
		else if (data.tag === "IMG") {
			data.ext = "img";
			data.fakeext = true;
		}
	}

	shortenCommonExt(data);
	addCategory(data);
	if (data.category === "image" && (data.tag !== "IMG" || data.fakeTag)) data.extraImg = true;
	if (data.category === "image" && (/^(http|data)/i).test(data.url)) data.legalImg = true;
	if (data.mainUrl.startsWith("data:")) data.name = "index";

	let iconURL = fileIcons[data.ext] || "";
	if ((data.ext !== initialExt) && iconURL) send({ type: "call setIconUrl", info: { rid: data.rid, src: iconURL } });
}

function extractStarFileName(str) {
	let bool = str.search("''") > -1;
	let [u, v] = bool ? str.split("''") : ["utf-8", str];
	const arr = v.split(/(%[0-9a-f]{2}|.)/i).filter((x) => x.length)
		.map(x => x.startsWith("%") ? parseInt(x.slice(1), 16) : x.charCodeAt(0));

	return (new TextDecoder(u)).decode(Uint8Array.from(arr));
}

function extractNormalFileName(str) {
	let dec = new TextDecoder("UTF-8");
	let arr = Array.from(str).map((x) => x.charCodeAt(0));
	return dec.decode(Int8Array.from(arr));
}

function extractNameFromHeader(str) {
	let result = { filename: "", star: false };
	let fname = "";
	let reg1 = /filename\*\s*=\s*(.+?)("|$)/;
	let reg2 = /filename\s*=\s*(.+?)("|$)/;
	if (reg1.test(str)) {
		fname = str.match(reg1)[1];
		if (fname.startsWith(`"`)) fname = fname.slice(1);
		result = { filename: fname, star: true };
	}
	else if (reg2.test(str)) {
		fname = str.match(reg2)[1];
		if (fname.startsWith(`"`)) fname = fname.slice(1);
		result = { filename: fname, star: false };
	}

	if (result.star) result = extractStarFileName(result.filename);
	else result = extractNormalFileName(result.filename);
	return result;
}

function extractTypeFromHeader1(str) {
	let ext = "";
	let trusted = false;
	let mime = str.split("/").map((x) => x.trim());
	if (mime.length !== 2) return "";
	mime[1] = mime[1].split(";")[0].trim();
	let dict = common_mimes[mime[0]];
	if (dict && dict[mime[1]]) {
		ext = dict[mime[1]][0] || "";
		if (dict[mime[1]].length === 1) trusted = true;
	}
	return { ext: ext, trusted: trusted };
}

function extractTypeFromHeader2(str) {
	let ext = "";
	let mime = str.split("/").map((x) => x.trim());
	if (mime.length !== 2) return "";
	mime[1] = mime[1].split(";")[0].trim();
	if (other_mimes[mime[0]] && other_mimes[mime[0]][mime[1]]) {
		ext = other_mimes[mime[0]][mime[1]][0];
	}
	return ext;
}

function extractTypeFromHeader3(str) {
	let ext = "";
	let mime = str.split("/").map((x) => x.trim());
	if (mime.length !== 2) return "";
	mime[1] = mime[1].split(";")[0].trim();
	if (mime[1].includes("+xml")) ext = "xml";
	else if (mime[0] === "text") ext = "txt";
	return ext;
}

function getPositionalData(direction) {
	let result = [];
	let currentObj = { refBefore: "", range: [], refAfter: "" };

	session.downPageRids.forEach((rid, index, array) => {
		let selected = datacenter[rid].selected;
		if (selected) {
			currentObj.range.push(rid);
			if (index === array.length - 1) {
				result.push(cloneDataObj(currentObj));
			}
		}
		else {
			if (currentObj.range.length > 0) {
				currentObj.refAfter = rid;
				result.push(cloneDataObj(currentObj));
				currentObj = { refBefore: rid, range: [], refAfter: "" };
			}
			else currentObj.refBefore = rid;
		}
	});

	if (direction === "up") {
		let obj = result[0];
		if (obj.refBefore === "") result.shift();
	}
	else if (direction === "down") {
		let obj = result[result.length - 1];
		if (obj.refAfter === "") result.pop();
	}
	return result;
}

function updateQueueWhenMoving(info, direction) {
	if (direction === "up") {
		for (let obj of info) {
			let r = obj.refBefore;
			if (!session.queue.includes(r)) continue;
			let i = session.queue.indexOf(r);

			let last_q, last_s, last_p;
			for (let rid of obj.range) {
				if (!session.queue.includes(rid)) continue;
				if (datacenter[rid].pscheduled) {
					last_p = last_s = last_q = rid;
				}
				else if (datacenter[rid].scheduled) {
					last_s = last_q = rid;
				}
				else last_q = rid;

			}
			if (datacenter[r].pscheduled) {
				if (last_p) {
					let j = session.queue.indexOf(last_p);
					if (i < j) transpose(session.queue, i, j);
				}
			}
			else if (datacenter[r].scheduled) {
				if (last_s) {
					let j = session.queue.indexOf(last_s);
					if (i < j) transpose(session.queue, i, j);
				}
			}
			else if (last_q) {
				let j = session.queue.indexOf(last_q);
				if (i < j) transpose(session.queue, i, j);
			}
		}
	}
	else if (direction === "down") {
		for (let obj of info) {
			let r = obj.refAfter;
			if (!session.queue.includes(r)) continue;
			let i = session.queue.indexOf(r);

			let first_q, first_s, first_p;
			var clonedRange = obj.range.slice(0);
			clonedRange.reverse();
			for (let rid of clonedRange) {
				if (!session.queue.includes(rid)) continue;
				if (datacenter[rid].pscheduled) {
					first_p = first_s = first_q = rid;
				}
				else if (datacenter[rid].scheduled) {
					first_s = first_q = rid;
				}
				else first_q = rid;
			}

			if (datacenter[r].pscheduled) {
				if (first_p) {
					let j = session.queue.indexOf(first_p);
					if (i > j) transpose(session.queue, i, j);
				}
			}
			else if (datacenter[r].scheduled) {
				if (first_s) {
					let j = session.queue.indexOf(first_s);
					if (i > j) transpose(session.queue, i, j);
				}
			}
			else if (first_q) {
				let j = session.queue.indexOf(first_q);
				if (i > j) transpose(session.queue, i, j);
			}
		}
	}
}

function resetScanner() {
	deepScan = { L: [], n: 0, done: [], fails: [], total: 0 };
}

function scanChecked(info) {
	sc_textFilterSource = info.source;
	sc_setRegText(info.text);
	sc_setRegExt(info.extensions);

	if (!sc_reg_text_info && !sc_reg_ext) {

		return;
	}
	var checkedItems = session.baseList.filter((rid) => datacenter[rid].checked);
	deepScan.n = checkedItems.length;
	deepScan.L = checkedItems.slice(0);
	deepScan.done = [];
	deepScan.fails = [];
	checkedItems.forEach((rid) => {
		let data = datacenter[rid];
		data.fstate = 0;
		data.requestExtraScan = true;
	});
	addFetchInfo(checkedItems);
}

function filterTabs(query, wid) {
	let L = [];
	chrome.tabs.query({ windowId: wid }, function (T) {

		if (err()) return;
		let X = T.filter((tab) => tab.active);
		let index = X.length > 0 ? X[0].index : -1;
		for (let tab of T) {
			let obj = { url: tab.url, title: tab.title, index: tab.index, id: tab.id };
			if (query.who === "all") L.push(obj);
			else if (query.who === "left") {
				if (tab.index <= index) L.push(obj);
			}
			else if (query.who === "right") {
				if (tab.index >= index) L.push(obj);
			}
			else if (query.who === "active") {
				if (tab.index === index) L.push(obj);
			}
		}

		let prepared_str_text = query.tabTextIdentifier.replace(/([^a-zA-Z0-9: ])/g, "\\$1");
		if (prepared_str_text) {
			let str_list = prepared_str_text.split(/\s+/);
			let regInfoList = [];
			for (let str of str_list) {
				let parts = splitParts(str, "url");
				let reg = parts.text_part ? (new RegExp(parts.text_part, "i")) : /\S/i;
				regInfoList.push({ source: parts.source_part, reg: reg });
			}

			let test = function (obj, item) {
				let sources = [];
				if (obj.source === "all") {
					sources = [item.url, item.title];
				}
				else sources = [item[obj.source]];
				sources = sources.filter((x) => x !== undefined);
				if (sources.length === 0) return false;
				return sources.some((x) => obj.reg.test(x));
			};

			L = L.filter((item) => regInfoList.every((obj) => test(obj, item)));
			if (L.length > 0) scanTabs(L, query);
			else {
				tabsScan.active = false;
				send({ type: "call showTabsScanProgress", info: tabsScan, end: true });
				tabsPostAction();
			}
		}
		else {
			scanTabs(L, query);
		}

		tabsScan.n = L.length;
		tabsScan.L = L.map((obj) => obj.tabId);
	});
}

function injectInTab(LC) {
	let info = cloneDataObj(tabs_info);
	info.origin = "tabs";
	info.recognizeTextLinks = recognizeTextLinks;
	let idata = JSON.stringify(info);
	let current = LC.shift();
	let tabId = current.id;
	chrome.tabs.executeScript(tabId, {
		code: `if(typeof idata ===  "undefined") var idata = ${idata};
		else idata = ${idata};
		if(typeof alreadyInjected === "undefined") {chrome.runtime.sendMessage({ type: "ready for inject"});}
		else {start();}`,
		allFrames: true,
		matchAboutBlank: true
	}, function () {
		let er = err();
		if (er) { tabsScan.fails.push(tabId); }

		if (LC.length > 0) injectInTab(LC);
	});
}

function scanTabs(L, query) {
	var LC = L.slice(0);
	tb_textFilterSource = query.source;
	tb_setRegText(query.text);
	tb_setRegExt(query.extensions);
	if (LC.length > 0) injectInTab(LC);
}

function filterTabResults(L, sender) {
	let tabId = sender.tab.id;
	let frameId = sender.frameId;
	L.forEach((data) => data.frameId = sender.frameId);
	L.forEach(addInfo);
	L = L.filter((data) => testTabsScanResource(data));

	if (frameId === 0) {
		tabsScan.done.push(tabId);
		xout(tabsScan.L, tabId);
		let end = tabsScan.done.length + tabsScan.fails.length === tabsScan.n;
		if (end) testingTabActivity2();
		send({ type: "call showTabsScanProgress", info: tabsScan, end: end });
	}

	let options = { tabId: tabId, origin: "tabs", frameId: sender.frameId };
	if (tabsApplyMR && tabsDownloadNow) options.applyMR = true;
	if (tabsDownloadNow) options.now = true;
	addItemsToDatacenter(L, options);
}

function resetTabsData(active) {
	tabsScan = { L: [], done: [], fails: [], n: 0, total: 0, duplicates: 0, refTime: 0 };
	if (active) {
		tabsScan.active = true;
		tabsScan.refTime = Date.now();
		testingTabActivity();
	}
}

function testingTabActivity() {
	let timeout = 70000;
	if (tabsScan.active) {
		let bool = Date.now() - tabsScan.refTime < timeout;
		if (bool) setTimeout(() => testingTabActivity(), 200);
		else {
			tabsScan.active = false;
			send({ type: "call showTabsScanProgress", info: tabsScan, end: true });
			tabsPostAction();
		}
	}
}

function testingTabActivity2() {
	let timeout = 1000;
	if (tabsScan.active) {
		let bool = Date.now() - tabsScan.refTime < timeout;
		if (bool) setTimeout(() => testingTabActivity2(), 100);
		else {
			tabsScan.active = false;
			tabsPostAction();
		}
	}
}

function tabsPostAction() {
	chrome.tabs.query({

		active: true
	}, (tabs) => {
		if (err()) return;
		let L = tabsScan.done.slice(0);
		if (isChrome) xout(L, tabs[0].id);
		if (tabsClose) chrome.tabs.remove(L);
		let notif = `${tabsScan.total} new results.`;
		if (tabsScan.duplicates > 0) notif = notif + `\n${tabsScan.duplicates} duplicates were discarded.`;
		sendNotif({ text: notif });
		send({ type: "tabs post action" });
	});
}

function setAutomaticFoldersforItem(rid) {
	let data = datacenter[rid];
	var result = [];
	if (disableAutomaticFolders) {
		data.automaticFolders = result;
		return;
	}
	var folders = Object.keys(foldersRules);
	for (let folder of folders) {
		let folderBool = false;
		let sets = foldersRules[folder].map((obj) => obj.rules);
		for (let set of sets) {
			let setBool = true;
			for (let rule of set) {
				let ruleBool = false;

				let props = Array.isArray(rule.prop) ? rule.prop : [rule.prop];

				let allprops = ["ext", "name", "url", "host", "title", "text", "alt"];
				if (props.some((p) => p === "all")) props = allprops;
				let dvalues = props.filter((prop) => !!data[prop]).map((prop) => data[prop].toLowerCase());
				let values = rule.values.map((x) => x.toLowerCase());
				for (let value of values) {

					if (dvalues.some((dv) => dv.search(value) > -1)) {
						ruleBool = true;
						break;
					}
				}
				if (!ruleBool) {
					setBool = false;
					break;
				}
			}
			if (setBool) {
				folderBool = true;
				break;
			}
		}
		if (folderBool) result.push(folder);
	}

	result = result.map((folder) => buildDirectoryFromMask(data, {sanitize:true, directory: folder}));

	var dict = {};
	for (let folder of result) {
		dict[folder] = true;
		for (let f of result) {
			if (f.startsWith(folder + "/")) {
				dict[folder] = false;
				break;
			}
		}
	}
	data.automaticFolders = Object.keys(dict).filter((f) => dict[f]);
}

function cleanBaseList2(rids) {
	rids.forEach((rid) => {
		xout(session.baseList2, rid);
		let data = datacenter[rid];
		if (data) {
			data.storable = false;
			erase(rid, data.id);
		}
	});
	storeCurrentDownloads();
}

function removeFiltered() {
	let unneededRids = [];
	unneededRids = session.filteredList.filter((x) => !datacenter[x].status);
	if (unneededRids.length > 0) unneededRids.forEach((rid) => {
		let url = datacenter[rid].mainUrl;
		delete dataurls[url];
		delete datacenter[rid];		
	});
	session.baseList = session.baseList.filter((rid) => !session.filteredList.includes(rid));
	session.baseListPics = session.baseListPics.filter((rid) => !session.filteredList.includes(rid));
	session.checkedList = session.checkedList.filter((rid) => !session.filteredList.includes(rid));
	emptyArrays(session.filteredList, session.filteredListPics);
}

function onCloseUI() {
	session.opened = false;
	if (session.fresh) session.fresh = false;
	pageIndicator = undefined;
	storeCurrentDownloads(true);
}

function fillPastSessionData() {
	if (dlsRestored) {
		send({ type: "call postInit", info: {} });
		return;
	}
	dlsRestored = true;
	chrome.downloads.search({ /* state: "interrupted" */ }, function (L) {
		for (let item of L) {

			addExternalLinkToDatacenter(item, true);
		}

		for (let data of lastDownloadsData) {
			data.rid = "r" + counter().toString();
			data.checked = false;
			data.activity = { refbytes: 0 };

			data.selected = false;
			data.scheduled = false;
			data.pscheduled = false;
			data.external = false;

			if (["listed", "fetch-A", "fetch-B"].includes(data.status)) data.status = "listed";
			else data.status = "fetch-C";
			datacenter[data.rid] = data;
			session.baseList2.push(data.rid);
		}

		storeCurrentDownloads();
		pwake();

	});
}

let firstIconId;
function buildIconForNextMime(allMimes, dict, n) {
	let isFirstIcon = isFirefox && allMimes.length === n;
	let mime = allMimes.shift();
	let exts = dict[mime];

	if (mime && exts && exts.length > 0) {
		let file = new Blob(["x"], { type: mime });
		let href = URL.createObjectURL(file);
		let name = "Temp" + sep + "sample_" + Date.now() + "." + exts[0];
		fakeDownloads[href] = true;
		chrome.downloads.download({ filename: name, saveAs: false, url: href }, function (x) {
			let lastErr = chrome.runtime.lastError;
			fakeDownloads[x] = true;
			fakeDownloadData[x] = { type: "buildFileIcon", url: href, name: name, exts: exts, mime: mime };
			if (isFirstIcon) {
				fakeDownloadData[x].isFirstIcon = true;
				firstIconId = x;
			}
			if (lastErr) {

			}
		});
	}
	let label = parseInt(((n - allMimes.length) / n) * 100) + "%";
	chrome.runtime.sendMessage({ type: "icons database status", info: { label: label, r: allMimes.length } });

	if (allMimes.length > 0) setTimeout(() => buildIconForNextMime(allMimes, dict, n), 100);
	else if (isFirefox && firstIconId) {
		chrome.downloads.removeFile(firstIconId, function () {
			chrome.downloads.erase({ id: firstIconId }, function () { });
		});
	}
}

function buildFileIconsDatabase() {
	let mains = Object.keys(common_mimes);
	let dict = {};
	for (let main of mains) {
		let keys = Object.keys(common_mimes[main]);
		for (let key of keys) {
			let exts = common_mimes[main][key];
			let mime = main + "/" + key;
			if (!unsafe_mimes.includes(mime)) dict[mime] = exts;
		}
	}
	let allMimes = Object.keys(dict).slice(0);
	buildIconForNextMime(allMimes, dict, allMimes.length);
}

function iconUrlAction(info, postAction) {
	let id = info.id;
	let rid = info.rid;
	let mime = info.mime;
	let data = datacenter[rid];
	chrome.downloads.getFileIcon(id, (iconURL) => {

		send({ type: "call setIconUrl", info: { rid: rid, src: iconURL } });
		data.iconURL = iconURL;
		let ext = info.ext || data.ext.toLowerCase();
		let bool = !fileIcons[ext] || fileIcons[ext] !== iconURL;
		if (ext && bool) {
			let exts = [];
			if (mime) {
				let p = mime.split("/").map((x) => x.trim()).filter((x) => x.length > 0);
				if (p.length === 2 && common_mimes[p[0]]) {
					exts = common_mimes[p[0]][p[1]];
					if (exts) {
						exts = exts.filter((e) => !fileIcons[e]);
						xout(exts, ext);
					}
					else exts = [];
				}

			}
			exts.unshift(ext);
			addOrUpdateIcons({ exts: exts, icon: iconURL });
			send({ type: "update file icons for baseList", info: { ext: ext, src: iconURL } });

		}

		if (postAction) postAction();
	});
}

function iconUrlAction2(info, postAction) {
	let id = info.id;
	chrome.downloads.getFileIcon(id, (iconURL) => {
		addOrUpdateIcons({ exts: info.exts, icon: iconURL });
		if (postAction) postAction();
	});
}

initDB();

