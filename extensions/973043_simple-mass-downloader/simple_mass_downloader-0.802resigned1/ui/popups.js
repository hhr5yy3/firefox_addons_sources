

let popper_7, popper_8, popper_9;
function initiatePopups() {

	let template_1 = $("#template-1");

	on({ type: "load", selector: ".thumb", container: template_1, useCapture: true }, function () {
		let dims = $(".dims", template_1);
		if (dims) dims.textContent = `${this.naturalWidth}px × ${this.naturalHeight}px`;
	});

	on({ type: "click", selector: ".copy", container: template_1, useCapture: false }, function () {
		let url = $(".customlink", template_1).getAttribute("href");
		this.classList.add("modified");
		writeToClipboard(url);
		setTimeout(() => this.classList.remove("modified"), 300);
	});

	let popper_1 = new PopBuilder({
		content: template_1,
		handleSelector: "#resources .resname",
		relation: "bottom",
		deviation: 0,
		tol: 5,
		align: "CC",
		atClick: false,
		classes: "light-theme",
		trigger: "contextmenu",
		autoMonitoring: true,

		onBeforeShow: function (e, popup) {
			let rid = popup.handle.parentElement.getAttribute("rid");
			emptyElem(popup.content);
			let data = bkg.datacenter[rid];
			popup.content.append(makeDefinitionsList(data, true));
			if (data.history) {
				popup.content.append(makeHistoryUnit(data));
			}
		},
		onShow: function (e, popup) {
			let rid = popup.handle.parentElement.getAttribute("rid");
			let thumb = $(".thumb", popup.content);
			if (thumb) thumb.setAttribute("src", bkg.datacenter[rid].url);
			popup.handle.parentNode.classList.add("tipping");
		},
		onHide: function (popup) {
			popup.handle.parentElement.classList.remove("tipping");
		}
	});
	popper_1.init();

	let template_11 = $("#template-11");

	on({ type: "load", selector: ".thumb", container: template_11, useCapture: true }, function () {
		let dims = $(".dims", template_11);
		if (dims) dims.textContent = `${this.naturalWidth}px × ${this.naturalHeight}px`;
	});

	on({ type: "click", selector: ".copy", container: template_11, useCapture: false }, function () {
		let url = $(".customlink", template_11).getAttribute("href");
		this.classList.add("modified");
		writeToClipboard(url);
		setTimeout(() => this.classList.remove("modified"), 300);
	});

	let popper_11 = new PopBuilder({
		content: template_11,
		handleSelector: "#downloadlist .name-td",
		relation: "bottom",
		deviation: 0,
		tol: 5,
		align: "CC",
		atClick: false,
		classes: "light-theme",
		trigger: "contextmenu",
		autoMonitoring: true,
		test: function (e) { return e.ctrlKey; },
		onBeforeShow: function (e, popup) {
			let rid = popup.handle.parentElement.getAttribute("rid");
			emptyElem(popup.content);
			let data = bkg.datacenter[rid];
			popup.content.append(makeDefinitionsList(data, true));
			if (data.history) {
				popup.content.append(makeHistoryUnit(data));
			}
		},
		onShow: function (e, popup) {
			let rid = popup.handle.parentElement.getAttribute("rid");
			let thumb = $(".thumb", popup.content);
			if (thumb) thumb.setAttribute("src", bkg.datacenter[rid].url);
			popup.handle.parentNode.classList.add("tipping");
		},
		onHide: function (popup) {
			popup.handle.parentElement.classList.remove("tipping");
		}
	});
	popper_11.init();

	let template_13 = $("#template-13");

	on({ type: "click", selector: ".copy", container: template_13, useCapture: false }, function () {
		let url = $(".customlink", template_13).getAttribute("href");
		this.classList.add("modified");
		writeToClipboard(url);
		setTimeout(() => this.classList.remove("modified"), 300);
	});

	let popper_13 = new PopBuilder({
		content: template_13,
		handleSelector: "#pics .pic",
		relation: "bottom",
		deviation: 0,
		tol: 5,
		align: "CC",
		atClick: true,
		classes: "light-theme extra-elevation",
		trigger: "contextmenu",
		autoMonitoring: true,
		onBeforeShow: function (e, popup) {
			let rid = popup.handle.parentElement.getAttribute("rid");
			let data = bkg.datacenter[rid];
			emptyElem(popup.content);
			popup.content.append(makeDefinitionsList(data, false));
			if (data.history) {
				popup.content.append(makeHistoryUnit(data));
			}
		},
		onShow: function (e, popup) {
			popup.handle.parentNode.classList.add("tipping");
		},
		onHide: function (popup) {
			popup.handle.parentElement.classList.remove("tipping");
		}
	});
	popper_13.init();

	let template_2 = $("#template-2");

	$$("#edit-directory, #edit-mask").forEach((el) => {
		el.addEventListener("keyup", function (e) {
			var parent = e.target.closest(".input-div");
			var button = $(".mdc-button", parent);
			let popup = this.closest(".popup");
			let td = popup.handle;
			let rid = td.parentElement.getAttribute("rid");
			let data = bkg.datacenter[rid];
			let info = e.target.id === "edit-mask" ? data.mask : data.directory;
			if (info !== e.target.value.trim()) button.classList.add("unsaved");
			else button.classList.remove("unsaved");
		});
	});

	$("#edit-directory-ok").addEventListener("click", function () {
		let popup = this.closest(".popup");
		let td = popup.handle;
		let rid = td.parentElement.getAttribute("rid");
		let data = bkg.datacenter[rid];
		data.directory = $("#edit-directory").value.trim();
		this.classList.remove("unsaved");
		let testConflict = data.directory === "" && data.automaticFolders && data.automaticFolders.length > 1;
		if (testConflict) td.classList.add("conflict");
		else td.classList.remove("conflict");
	});

	$("#edit-mask-ok").addEventListener("click", function () {
		let popup = this.closest(".popup");
		let td = popup.handle;
		let rid = td.parentElement.getAttribute("rid");
		let data = bkg.datacenter[rid];
		let mask = $("#edit-mask").value.trim();
		if (mask) {
			data.mask = mask;
			data.finalName = bkg.buildNameFromMask(data, { mask: mask, sanitize: true, index: 0 });
			$("#edit-textarea").value = data.finalName;
			$(".cell-overflow", td.parentElement).textContent = data.finalName;
			if (bkg.isChrome && mask === "{auto}") $("#edit-textarea-div .label").classList.add("auto");
			else $("#edit-textarea-div .label").classList.remove("auto");
		}
		this.classList.remove("unsaved");
	});

	$("#edit-final-name").addEventListener("click", function () {
		let popup = this.closest(".popup");
		let td = popup.handle;
		let rid = td.parentElement.getAttribute("rid");
		let data = bkg.datacenter[rid];
		let label = this.textContent;
		if (label === "EDIT") {
			$("#edit-textarea").disabled = false;
			this.textContent = "CONFIRM";
		}
		else {
			$("#edit-textarea").disabled = true;
			this.textContent = "EDIT";
			let name = $("#edit-textarea").value.trim();
			var oldname = data.finalName;
			if (name) {
				data.finalName = sanitizeFileName(name, 255);
				$(".cell-overflow", td.parentElement).textContent = data.finalName;
				if (oldname !== data.finalName) {
					$("#edit-mask").value = "";
					data.mask = "";
					dezactivateField($("#edit-mask"));
					if (bkg.isChrome) $("#edit-textarea-div .label").classList.remove("auto");
				}
			}
		}
	});

	let popper_2 = new PopBuilder({
		content: template_2,
		handleSelector: "#downloadlist td.edit",
		relation: "bottom",
		tol: 5,
		align: "RL",
		deviation: 0,
		atClick: false,
		trigger: "click",
		classes: "light-theme",

		onBeforeShow: function (e, popup) {
			popup.handle.classList.add("modified");
			let rid = popup.handle.parentElement.getAttribute("rid");
			let data = bkg.datacenter[rid];
			$("#edit-directory").value = data.directory || "";
			$("#edit-mask").value = data.mask;
			$("#edit-textarea").value = data.finalName;
			$("#edit-textarea").disabled = true;
			$("#edit-final-name").textContent = "EDIT";
			if (bkg.isChrome && data.mask === "{auto}") $("#edit-textarea-div .label").classList.add("auto");
			else $("#edit-textarea-div .label").classList.remove("auto");

			$$(".mdc-button", popup).forEach((elem) => elem.classList.remove("unsaved"));
			if (data.automaticFolders && data.automaticFolders.length >= 1) {
				$("#conflict-arrow").classList.remove("hidden");
				$("#folders-list").setAttribute("rid", rid);
			}
			else {
				$("#conflict-arrow").classList.add("hidden");
				$("#folders-list").removeAttribute("rid");
			}

			if (data.directory === "" && data.automaticFolders && data.automaticFolders.length === 1) {
				$("#edit-directory").value = data.automaticFolders[0];
			}

			for (let name of ["edit-directory", "edit-mask"]) {
				let elem = document.getElementById(name);
				if (elem.value.trim()) activateField(elem);
				else dezactivateField(elem);
			}
		},
		onHide: function (popup) {
			popup.handle.classList.remove("modified");
		}
	});
	popper_2.init();

	let template_5 = $("#template-5");

	$("#clear-filters").addEventListener("click", function () {
		resetFilters();
		updateResourcesViews();

		chrome.tabs.query({ active: false }, function (L) {

			chrome.tabs.update(L[L.length - 1].id, { highlighted: true });
		})

	});

	$("#remove-filtered").addEventListener("click", function () {
		bkg.removeFiltered(ss.showPictures);
		resetFilters();
		updateResourcesViews();

	});

	$("#reset-list").addEventListener("click", function () {
		uncheckDescriptor();

		resetFilters();
		bkg.cleanDatacenterBeforeFillTable();
		emptyElem($("#resources tbody"));
		emptyElem($("#pics"));
		$("#main-check").checked = false;
		testEmptyGallery();

		$("#gallery").classList.remove("activated");
		ss.showPictures = false;
		setView(false);
		resPager.setCurrentPage(1, { activate: false, itemsCount: 0 });
		thumbPager.setCurrentPage(1, { activate: false, itemsCount: 0 });
	});

	let popper_5 = new PopBuilder({
		content: template_5,
		handleSelector: "#menu-1",
		relation: "bottom",
		tol: 5,
		align: "RR",
		deviation: 0,
		atClick: false,
		classes: "light-theme",
		trigger: "click",
		test: function (e) { return !e.ctrlKey; },
		onBeforeShow: function (e, popup) {
			popup.handle.classList.add("modified");
			$("#menu-1").blur();
			if (ss.showPictures) $("#remove-filtered").classList.add("hidden");
			else $("#remove-filtered").classList.remove("hidden");
		},
		onHide: function (popup) {
			popup.handle.classList.remove("modified");
			$("#menu-1").blur();
		}
	});
	popper_5.init();

	let template_4 = $("#template-4");

	on({ type: "change", selector: `input[type=radio][name="radio2"]`, container: template_4 }, function () {
		ss.displayedType = this.value;
		$("#displayed-name").textContent = dnames[ss.displayedType];
		this.closest(".popup").hide();
		updateSource();
	});

	let popper_4 = new PopBuilder({
		content: template_4,
		handleSelector: "#menu-2",
		relation: "bottom",
		tol: 5,
		align: "LL",
		deviation: 0,
		atClick: false,
		classes: "light-theme",
		trigger: "click",
		onShow: function () {
			$(`input[name=radio2][value=${ss.displayedType}]`, template_4).checked = true;
		}

	});
	popper_4.init();

	let template_3 = $("#template-3");

	let popper_3 = new PopBuilder({
		content: template_3,
		handleSelector: "#mask-info",
		relation: "top",
		tol: 2,
		align: "CC",
		deviation: 0,
		atClick: false,
		classes: "light-theme",
		trigger: "click",
		updateOn: ["resize"],
		zIndex: "10000001",
		onShow: function () {
			$("#mask-info").classList.add("modified");

		},
		onHide: function () {
			$("#mask-info").classList.remove("modified");
		}

	});
	popper_3.init();

	let template_7 = $("#template-7");

	$("#open").addEventListener("click", function () {
		if (this.classList.contains("disabled")) return;
		let popup = this.closest(".popup");
		let tr = popup.handle.closest("tr");
		let rid = tr.getAttribute("rid");
		let data = bkg.datacenter[rid];
		let id = data.id;
		if (!id) return;
		chrome.downloads.open(id);
		popup.hide();
	});
	$("#open-folder").addEventListener("click", function () {
		if (this.classList.contains("disabled")) return;
		let popup = this.closest(".popup");
		let tr = popup.handle.closest("tr");
		let rid = tr.getAttribute("rid");
		let data = bkg.datacenter[rid];
		let id = data.id;
		if (!id) return;
		chrome.downloads.show(id);
		popup.hide();
	});

	$("#cancel").addEventListener("click", function () {
		if (this.classList.contains("disabled")) return;
		let popup = this.closest(".popup");
		let tr = popup.handle.closest("tr");
		let rid = tr.getAttribute("rid");
		bkg.startUnitCanceling(rid, true);
		popup.hide();
	});

	$("#remove").addEventListener("click", function () {
		if (this.classList.contains("disabled")) return;
		let popup = this.closest(".popup");
		let tr = popup.handle.closest("tr");
		let rid = tr.getAttribute("rid");
		let data = bkg.datacenter[rid];
		data.storable = false;
		bkg.removeDownload(rid);
		tr.remove();
		popup.hide();
		downPager.setCurrentPage(0, { activate: true, itemsCount: ss.baseList2.length, noScroll: true });
	});

	$("#delete").addEventListener("click", function () {
		if (this.classList.contains("disabled")) return;
		let popup = this.closest(".popup");
		let tr = popup.handle.closest("tr");
		let rid = tr.getAttribute("rid");
		let data = bkg.datacenter[rid];
		data.storable = false;
		bkg.removeDownload(rid, true);
		tr.remove();
		popup.hide();
		downPager.setCurrentPage(0, { activate: true, itemsCount: ss.baseList2.length, noScroll: true });
	});

	$("#retry").addEventListener("click", function () {
		if (this.classList.contains("disabled")) return;
		let popup = this.closest(".popup");
		let tr = popup.handle.closest("tr");
		let rid = tr.getAttribute("rid");
		bkg.retakeDownload(rid, true);
		popup.hide();
	});

	$("#toggle").addEventListener("click", function () {
		let type = this.innerText;
		let popup = this.closest(".popup");
		let tr = popup.handle.closest("tr");
		let rid = tr.getAttribute("rid");
		if (type === "Pause") bkg.startUnitPausing(rid, true);
		else {
			let data = bkg.datacenter[rid];
			xout(ss.queue, rid);
			data.scheduled = true;
			data.pscheduled = true;
			ss.queue.unshift(rid);
			setIcon({ rid: rid, icon: "down-A", modifier: "forced" });
			bkg.advance();
		}
		popup.hide();
	});

	popper_7 = new PopBuilder({
		content: template_7,
		handleSelector: ".name-td",
		relation: "bottom",
		tol: 15,
		align: "LL",
		deviation: 0,
		atClick: true,
		classes: "light-theme",
		trigger: "contextmenu",
		test: function (e) { return !e.ctrlKey; },
		onShow: function (e, popup) {
			popup.handle.parentElement.classList.add("tipping");
			let tr = popup.handle.closest("tr");
			let rid = tr.getAttribute("rid");
			updateActionsPopup(rid);
		},
		onHide: function (popup) {
			popup.handle.parentElement.classList.remove("tipping");
			$("#toggle").classList.add("hidden");
		}
	});
	popper_7.init();

	let template_8 = $("#template-8");

	popper_8 = new PopBuilder({
		content: template_8,
		handleSelector: "#downloadlist tbody .info",
		delegatedHandle: (handle) => handle.parentElement,
		relation: "bottom",
		deviation: 0,
		tol: 1,
		align: "CC",
		atClick: false,
		classes: "light-theme",
		margins: { horizontal: 10, vertical: 10 },
		trigger: "click",

		onBeforeShow: function (e, popup) {
			popup.handle.classList.add("modified");
			let x = $("#middle_2").offsetWidth - $("#downloadlist").offsetWidth;

			popup.style.marginTop = this.margins.vertical + "px";
			popup.style.marginBottom = this.margins.vertical + "px";
			popup.style.marginLeft = this.margins.horizontal + "px";
			popup.style.marginRight = (x + this.margins.horizontal) + "px";
		},
		onShow: function (e, popup) {
			let rid = popup.handle.parentElement.getAttribute("rid");
			popup.handle.parentNode.classList.add("tipping");
			updateInfoPopup(rid, popup);

		},
		onHide: function (popup) {
			popup.handle.parentElement.classList.remove("tipping");
			popup.handle.classList.remove("modified");
		}
	});
	popper_8.init();

	let template_9 = $("#template-9");
	$("#mr-preview").addEventListener("change", function () {
		if (this.checked) {
			replace({ preview: true });
		}
		else {
			unpreview();
		}
	});

	$("#confirmMultiRename").addEventListener("click", function () {
		replace({ preview: false });
		this.closest(".popup").hide();
	});

	$("#mr-clear").addEventListener("click", function () {
		$$("#mr-mask, #mr-search, #mr-replace, #mr-directory").forEach((el) => {
			el.value = "";
			ss.inputs[el.id] = "";
		});
	});

	popper_9 = new PopBuilder({
		content: template_9,
		handleSelector: "#multi-rename",
		relation: "top",
		deviation: 0,
		tol: 1,
		align: "LL",
		atClick: false,
		classes: "light-theme",
		trigger: "click",
		persistOn: [/* "click", "resize", */ "scroll"],
		onShow: function () {
			$("#multi-rename").classList.add("modified");
			$("#multi-rename").blur();

		},
		onHide: function () {
			$("#multi-rename").classList.remove("modified");
			$("#multi-rename").blur();
			unpreview();
		}
	});
	popper_9.init();

	let template_10 = $("#template-10");

	let popper_10 = new PopBuilder({
		content: template_10,
		handleSelector: "#scanner",
		relation: "bottom",
		deviation: 0,
		tol: 6,
		align: "CC",
		atClick: false,
		classes: "light-theme",
		trigger: "click",
		persistOn: [/* "click", */ "scroll"],
		onShow: function () {
			$("#scanner").classList.add("modified");
			$("#scanner").blur();
			popper_12.hide();

		},
		onHide: function () {
			$("#scanner").classList.remove("modified");
			$("#scanner").blur();
		}
	});
	popper_10.init();

	let template_12 = $("#template-12");

	on({ type: "change", selector: `input[type=radio][name="tb-radio"]`, container: template_12 }, function () {
		ss.inputs["tb-radio"] = this.value;
	});

	$("#tb-ok").addEventListener("click", function () {

		var query = {};
		query.who = $(`input[type=radio][name="tb-radio"]:checked`).value;
		query.tabTextIdentifier = $("#tb-tabfilter").value.trim();
		query.text = $("#tb-textfilter").value.trim();
		query.extensions = $("#tb-extensions").value.trim();
		query.source = $("#tb-textfilter-source").value.trim();
		query.onlyImages = $("#tb-only-pictures").checked;

		bkg.tabs_info.onlyImages = query.onlyImages;
		bkg.resetTabsData(true);
		bkg.filterTabs(query, wid);

		$("#tb-progress").classList.remove("tb-done");
		$("#tb-progress-div").setAttribute("title", "");
		$("#tb-results-div").style.display = "flex";
		$("#tb-results").textContent = `wait...`;
		bkg.pageIndicator = ss.baseList.length > 0 ? -1 : 1;
	});

	$("#tb-reset").addEventListener("click", function () {
		$(`input[name=tb-radio][value=active]`).checked = true;

		$("#tb-tabfilter").value = "";
		dezactivateField($("#tb-tabfilter"));
		$("#tb-textfilter").value = "";
		dezactivateField($("#tb-textfilter"));
		$("#tb-extensions").value = "";
		dezactivateField($("#tb-extensions"));
		$("#tb-textfilter-source").value = "all";

		$("#tb-only-pictures").checked = false;

		$("#tb-progress").classList.remove("tb-done");
		$("#tb-progress").textContent = "0 / 0 tabs";
		$("#tb-progress-div").setAttribute("title", "");
		$("#tb-results-div").style.display = "none";
		$("#tb-results").textContent = `wait...`;

		bkg.resetTabsData();
		bkg.tabs_info.onlyImages = false;

		ss.inputs["tb-radio"] = "active";
		for (let name of ["tb-tabfilter", "tb-textfilter", "tb-textfilter-source", "tb-extensions"]) {
			ss.inputs[name] = "";
		}
		for (let name of ["tb-only-pictures"/* , "tb-largest" */]) {
			ss.inputs[name] = false;
		}

		$("#tb-images-div").classList.add("hidden");
	});

	let popper_12 = new PopBuilder({
		content: template_12,
		handleSelector: "#fromtabs",
		relation: "bottom",
		deviation: 15,
		tol: 6,
		align: "CC",
		atClick: false,
		classes: "light-theme",
		trigger: "click",
		persistOn: [/* "click",  */"scroll"],
		onShow: function () {
			$("#fromtabs").classList.add("modified");
			$("#fromtabs").blur();
			popper_10.hide();

			let bool = bkg.tabsDownloadNow || bkg.tabsClose;
			if (bool) {
				$("#tabsOptions").classList.add("warning");
				$("#tb-ok").classList.add("warning");
			}
			else {
				$("#tabsOptions").classList.remove("warning");
				$("#tb-ok").classList.remove("warning");
			}

		},
		onHide: function () {
			$("#fromtabs").classList.remove("modified");
			$("#fromtabs").blur();
		}
	});
	popper_12.init();

	let template_14 = $("#template-14");

	$("#clear-completed").addEventListener("click", function () {
		let rids = searchDictionary(bkg.datacenter, [["status", "down-C"]]);

		$$("#downloadlist tbody tr").forEach((tr) => {
			let rid = tr.getAttribute("rid");

			if (rids.includes(rid)) tr.remove();
		});
		bkg.cleanBaseList2(rids);
		downPager.setCurrentPage(-1, { activate: true, itemsCount: ss.baseList2.length });

	});

	$("#clear-inactives").addEventListener("click", function () {

		chrome.downloads.search({ state: "in_progress" }, function (active) {
			let A = active.map((item) => item.id);
			let rids = ss.baseList2.filter((rid) => !A.includes(bkg.datacenter[rid].id));
			$$("#downloadlist tbody tr").forEach((tr) => {
				let rid = tr.getAttribute("rid");

				if (rids.includes(rid)) tr.remove();
			});
			bkg.cleanBaseList2(rids);
			downPager.setCurrentPage(-1, { activate: true, itemsCount: ss.baseList2.length });
		});

	});

	let popper_14 = new PopBuilder({
		content: template_14,
		handleSelector: "#menu-clear",
		relation: "top",
		tol: 5,
		align: "RR",
		deviation: 0,
		atClick: false,
		classes: "light-theme",
		trigger: "click",
		test: function (e) { return !e.ctrlKey; },
		onBeforeShow: function (e, popup) {
			popup.handle.classList.add("modified");
			$("#menu-clear").blur();
		},
		onHide: function (popup) {
			popup.handle.classList.remove("modified");
			$("#menu-clear").blur();
		}
	});
	popper_14.init();

	let template_15 = $("#template-15");

	$("#template-2").addEventListener("click", function (e) {
		if (e.target.id !== "conflict-arrow") popper_15.hide();
	}, true);

	on({ type: "click", selector: `li`, container: template_15 }, function () {
		let folder = this.textContent;
		$("#edit-directory").value = folder;
		this.closest(".popup").hide();
		let button = $("#edit-directory-ok");
		let rid = $("#folders-list").getAttribute("rid");
		let data = bkg.datacenter[rid];
		let directory = data.directory;
		if (directory !== folder) button.classList.add("unsaved");
		else button.classList.remove("unsaved");
	});

	var popper_15 = new PopBuilder({
		content: template_15,
		handleSelector: "#conflict-arrow",
		delegatedHandle: (handle) => handle.parentElement,
		relation: "bottom",
		tol: 5,
		align: "RR",
		deviation: 0,
		atClick: false,
		classes: "light-theme",
		trigger: "click",
		zIndex: "10000001",
		test: function (e) { return !e.ctrlKey; },
		onBeforeShow: function (/* e, popup */) {
			let rid = $("#folders-list").getAttribute("rid");
			let data = bkg.datacenter[rid];
			let folders = data.automaticFolders || [];
			makeCandidatesFoldersList(folders);
			activateField($("#edit-directory"));
		},
		onHide: function (/* popup */) {
			dezactivateField($("#edit-directory"));
		}
	});
	popper_15.init();

	let template_16 = $("#template-16");

	on({ type: "click", selector: `li`, container: template_16 }, function () {
		selectFolder(this);
	});

	on({ type: "keyup", selector: `#directorydiv`, container: $("body") }, function (e) {
		onACkeyup(this, popper_16, e);
		disableHover(popper_16.popup);
	});

	var popper_16 = new PopBuilder({
		content: template_16,
		handleSelector: "#directorydiv",

		relation: "top",
		tol: 0,
		align: "CC",
		deviation: 0,
		atClick: false,
		classes: "light-theme-simple",
		trigger: "dblclick",
		persistOn: ["scroll"],
		test: function (e) { return !e.ctrlKey; },

		onBeforeShow: function (e, popup) {
			let input = $("input", popup.handle);
			$(".mdc-text-field__label", input.closest(".mdc-text-field")).classList.add("notransition");
			let parent = $("#folders-list-A");
			let rect = popup.handle.getBoundingClientRect();
			popup.style.minWidth = rect.width + "px";
			makeFoldersList(bkg.recentFolders, bkg.starFolders, parent);
		},

		onShow: function (e, popup) {
			let visible = $$(`li:not(.hidden)`, popup).length > 0;
			if (!visible) popup.classList.add("vhidden");
			else popup.classList.remove("vhidden");
		}
	});
	popper_16.init();

	let template_17 = $("#template-17");

	on({ type: "click", selector: `li`, container: template_17 }, function () {
		selectFolder(this);
	});

	on({ type: "keyup", selector: `#mr-directory-div`, container: template_9 }, function (e) {
		disableHover(popper_17.popup);
		onACkeyup(this, popper_17, e);
	});

	on({ type: "click", selector: `*`, container: template_9 }, function () {
		$("#template-17").closest(".popup").hide();
	});

	var popper_17 = new PopBuilder({
		content: template_17,
		handleSelector: "#mr-directory-div",

		relation: "bottom",
		tol: 0,
		align: "LL",
		deviation: 0,
		atClick: false,
		classes: "light-theme-simple",
		trigger: "dblclick",
		zIndex: "10000001",
		test: function (e) { return !e.ctrlKey; },
		persistOn: ["scroll"],
		onBeforeShow: function (e, popup) {
			let input = $("input", popup.handle);
			$(".mdc-text-field__label", input.closest(".mdc-text-field")).classList.add("notransition");
			let parent = $("#folders-list-B");
			let rect = popup.handle.getBoundingClientRect();
			popup.style.minWidth = rect.width + "px";
			makeFoldersList(bkg.recentFolders, bkg.starFolders, parent);
		},

		onShow: function (e, popup) {
			let visible = $$(`li:not(.hidden)`, popup).length > 0;
			if (!visible) popup.classList.add("vhidden");
			else popup.classList.remove("vhidden");
		}
	});
	popper_17.init();

	let template_18 = $("#template-18");

	on({ type: "click", selector: `li`, container: template_18 }, function () {
		selectFolder(this);
		$("#edit-directory-ok").classList.add("unsaved");
	});

	on({ type: "keyup", selector: `#edit-directory-div`, container: template_2 }, function (e) {
		disableHover(popper_18.popup)
		onACkeyup(this, popper_18, e);
	});

	on({ type: "click", selector: `*`, container: template_2 }, function () {
		$("#template-18").closest(".popup").hide();
	});

	var popper_18 = new PopBuilder({
		content: template_18,
		handleSelector: "#edit-directory-div",

		relation: "bottom",
		tol: 0,
		align: "LL",
		deviation: 0,
		atClick: false,
		classes: "light-theme-simple",
		trigger: "dblclick",
		zIndex: "10000001",
		persistOn: ["scroll"],
		test: function (e) { return !e.ctrlKey; },
		onBeforeShow: function (e, popup) {
			let input = $("input", popup.handle);
			$(".mdc-text-field__label", input.closest(".mdc-text-field")).classList.add("notransition");
			let parent = $("#folders-list-C");
			let rect = popup.handle.getBoundingClientRect();
			popup.style.minWidth = rect.width + "px";
			makeFoldersList(bkg.recentFolders, bkg.starFolders, parent);
		},

		onShow: function (e, popup) {
			let visible = $$(`li:not(.hidden)`, popup).length > 0;
			if (!visible) popup.classList.add("vhidden");
			else popup.classList.remove("vhidden");
		}
	});
	popper_18.init();

	let template_19 = $("#template-19");

	let popper_19 = new PopBuilder({
		content: template_19,
		handleSelector: "#help-filter",
		relation: "top",
		deviation: 0,
		tol: 6,
		align: "CC",
		atClick: false,
		classes: "light-theme",
		trigger: "click",
		persistOn: [/* "click", */ "scroll"],
		onShow: function () {

		},
		onHide: function () {

		}
	});
	popper_19.init();

	let template_20 = $("#template-20");

	let popper_20 = new PopBuilder({
		content: template_20,
		handleSelector: "#help-dir",
		relation: "top",
		deviation: 0,
		tol: 6,
		align: "CC",
		atClick: false,
		classes: "light-theme forced-margin-right",
		trigger: "click",
		persistOn: [/* "click", */ "scroll"],
		onShow: function () {

		},
		onHide: function () {

		}
	});
	popper_20.init();

	let template_21 = $("#template-21");

	$("#tabsDownloadNow").addEventListener("change", function (e) {
		bkg.changeTabsDefaults("tabsDownloadNow", this.checked);
		if (this.checked) $("#tabsApplyMR").disabled = false;
		else $("#tabsApplyMR").disabled = true;
	});

	$("#tabsApplyMR").addEventListener("change", function (e) {
		bkg.changeTabsDefaults("tabsApplyMR", this.checked);
	});

	$("#tabsClose").addEventListener("change", function (e) {
		bkg.changeTabsDefaults("tabsClose", this.checked);
	});

	$("#template-12").addEventListener("click", (e) => {
		if (!e.target.closest("#tabsOptions")) popper_21.hide();
	});

	let popper_21 = new PopBuilder({
		content: template_21,
		handleSelector: "#tabsOptions",
		relation: "bottom",
		tol: 5,
		align: "CC",
		deviation: 0,
		atClick: false,
		classes: "light-theme",
		trigger: "click",
		updateOn: ["resize"],
		zIndex: "10000001",
		onShow: function () {
			$("#tabsOptions").classList.add("modified");
			$("#tabsDownloadNow").checked = bkg.tabsDownloadNow;
			$("#tabsApplyMR").checked = bkg.tabsApplyMR;
			if (!bkg.tabsDownloadNow) $("#tabsApplyMR").disabled = true;
			else $("#tabsApplyMR").disabled = false;
			$("#tabsClose").checked = bkg.tabsClose;
		},
		onHide: function () {
			$("#tabsOptions").classList.remove("modified");
			var bool = $("#tabsDownloadNow").checked || $("#tabsClose").checked;
			if (bool) {
				$("#tabsOptions").classList.add("warning");
				$("#tb-ok").classList.add("warning");
			}
			else {
				$("#tabsOptions").classList.remove("warning");
				$("#tb-ok").classList.remove("warning");
			}
		}

	});
	popper_21.init();

	let template_22 = $("#template-22");

	$("#reload-extension").addEventListener("click", function () {
		ss.baseList2.forEach((rid) => bkg.datacenter[rid].storable = false);
		bkg.storeCurrentDownloads(true);
		setTimeout(() => chrome.runtime.reload(), 100);
	});

	let popper_22 = new PopBuilder({
		content: template_22,
		handleSelector: "#toolbar-menu",
		delegatedHandle: (handle) => $("#dynamic-demo-toolbar"),
		relation: "bottom",
		tol: 0,
		align: "RR",
		deviation: 0,
		atClick: false,
		classes: "light-theme",
		trigger: "click",
		test: function (e) { return !e.ctrlKey; },
		onBeforeShow: function (e, popup) {
			popup.handle.classList.add("modified");

			if (ss.showPictures) $("#remove-filtered").classList.add("hidden");
			else $("#remove-filtered").classList.remove("hidden");
		},
		onHide: function (popup) {
			popup.handle.classList.remove("modified");

		}
	});
	popper_22.init();

	let template_23 = $("#template-23");

	$("#add-urls").addEventListener("click", function () {
		let elem = $("#pasteFromClipboard");
		elem.focus();
		requestAnimationFrame(() => {
			document.execCommand("paste");
			let result = elem.innerText.trim();
			elem.textContent = "";
			bkg.readUrlsFromLocalSource(result);
			let popup = this.closest(".popup");
			popup.hide();
		});

	});

	$("#add-urls-file").addEventListener("click", function () {
		$("#choose-import-file").click();
		setTimeout(() => {
			let popup = this.closest(".popup");
			popup.hide();
		}, 300);

	});

	$("#choose-import-file").addEventListener("change", openImportedFile);

	function openImportedFile(event) {
		let input = event.target;
		let reader = new FileReader();
		reader.onload = function () {
			bkg.readUrlsFromLocalSource(reader.result);
			event.target.value = "";
		};
		reader.readAsText(input.files[0]);
	}

	$("#export-urls-file").addEventListener("click", function () {
		let L = ss.baseList2.filter((rid) => bkg.datacenter[rid].selected);
		if (L.length === 0) {
			notify({ text: "No selected items..." });
			return;
		}
		bkg.adhocDownload(L);

	});

	let popper_23 = new PopBuilder({
		content: template_23,
		handleSelector: "#menu-3",
		relation: "bottom",
		tol: 5,
		align: "RR",
		deviation: 0,
		atClick: false,
		classes: "light-theme",
		trigger: "click",
		test: function (e) { return !e.ctrlKey; },
		onBeforeShow: function (e, popup) {
			popup.handle.classList.add("modified");
			$("#menu-3").blur();
		},
		onHide: function (popup) {
			popup.handle.classList.remove("modified");
			$("#menu-3").blur();
		}
	});
	popper_23.init();

	let template_24 = $("#template-24");

	let popper_24 = new PopBuilder({
		content: template_24,
		handleSelector: "#add-proximity-mask",
		relation: "top",
		tol: 2,
		align: "CC",
		deviation: 0,
		atClick: false,
		classes: "light-theme",
		trigger: "click",
		updateOn: ["resize"],
		autoMonitoring: true,
		zIndex: "10000001",
		onShow: function () {
			$("#add-proximity-mask").classList.add("modified");
			getProximityMasks_prepare();
		},
		onHide: function () {
			$("#add-proximity-mask").classList.remove("modified");
		}

	});
	popper_24.init();

	let template_25 = $("#template-25");

	let popper_25 = new PopBuilder({
		content: template_25,
		handleSelector: "#pmask-info",
		relation: "bottom",
		tol: 2,
		align: "CC",
		deviation: 0,
		atClick: false,
		classes: "light-theme",
		trigger: "click",
		updateOn: ["resize"],
		autoMonitoring: true,
		zIndex: "10000005",
		onShow: function () {
			$("#pmask-info").classList.add("modified");

		},
		onHide: function () {
			$("#pmask-info").classList.remove("modified");
		}

	});
	popper_25.init();

	let template_26 = $("#template-26");

	$("#pt-ok").addEventListener("click", function () {
		let ptURL = $("#pt-textfilter").value;
		if(ptURL){
			let U = generateBatchURLs(ptURL);
			bkg.readUrlsFromLocalSource(U.join("\n"));
		}
	});

	let popper_26 = new PopBuilder({
		content: template_26,
		handleSelector: "#set-pattern-url",
		delegatedHandle: (handle) => $("#header_2"),
		relation: "bottom",
		tol: 5,
		align: "CC",
		deviation: 0,
		atClick: false,
		classes: "light-theme",
		trigger: "click",
		updateOn: ["resize"],
		autoMonitoring: true,
		onShow: function () {

			popper_23.hide();
		},
		onHide: function () {

		}

	});
	popper_26.init();

	let template_27 = $("#template-27");

	let popper_27 = new PopBuilder({
		content: template_27,
		handleSelector: "#pt-info",
		delegatedHandle: (handle) => $("#template-26"),
		relation: "bottom",
		tol: 5,
		align: "CC",
		deviation: 0,
		atClick: false,
		classes: "light-theme",
		trigger: "click",
		updateOn: ["resize"],
		zIndex: "10000001",
		onShow: function () {
			$("#pt-info").classList.add("modified");

		},
		onHide: function () {
			$("#pt-info").classList.remove("modified");
		}

	});
	popper_27.init();
}

function replace(options) {
	let opts = options || {};
	let preview = opts.preview;
	let regchecked = $("#mr-reg").checked;
	let insensitive = !$("#mr-case").checked;
	let global = !$("#mr-first").checked;
	let flags = `${insensitive ? "i" : ""}${global ? "g" : ""}`;
	let sfor = $("#mr-search").value.trim();
	let repl = $("#mr-replace").value;
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
	let nrOfImproperItems = 0;

	let L = ss.baseList2.map((rid) => {
		let obj = { rid: rid, visible: false, selected: bkg.datacenter[rid].selected };
		let tr = $(`#downloadlist tbody tr[rid='${obj.rid}']`);
		if (tr) {
			obj.tr = tr;
			obj.visible = true;
		}
		return obj;
	}).filter((obj) => obj.selected);
	if (preview) L = L.filter((obj) => obj.visible);

	L.forEach(function (obj, index) {
		let mask = $("#mr-mask").value.trim();
		let rid = obj.rid;
		let data = bkg.datacenter[rid];
		let dir = $("#mr-directory").value.trim();
		if (dir && !preview) data.directory = dir;
		if (!["listed", "fetch-A", "fetch-B", "fetch-C"].includes(data.status)) {
			nrOfImproperItems = nrOfImproperItems + 1;
			return;
		}

		let filename = data.finalName;
		let oldfilename = filename;
		if (mask) {
			let total = L.length.toString().length;
			mask = mask.replace(/{counter}/g, (1 + index).toString().padStart(total, "0"));
			mask = mask.replace(/\{(c{1,})\}/g, function (match, p1) {
				return (1 + index).toString().padStart(Math.max(total, p1.length), "0");
			});
			filename = bkg.buildNameFromMask(data, { mask: mask, sanitize: true, index: index, total: total, odf: false });
		}
		let filenameBeforeRepl = filename;
		if (reg) filename = filename.replace(reg, repl);
		let effectiveReplacing = filename !== filenameBeforeRepl;
		filename = sanitizeFileName(filename, 255);
		if (obj.visible) {
			$(".name-td", obj.tr).setAttribute("title", filename);
			$(".cell-overflow", obj.tr).textContent = filename;
		}
		if (!preview) {
			data.finalName = filename;
			data.mask = mask;
			if (effectiveReplacing) data.mask = "";
		}
		else {
			if (filename !== oldfilename && obj.visible) obj.tr.classList.add("preview");
		}
	});

	if (nrOfImproperItems > 0) {
		let text = `${nrOfImproperItems} items can not be renamed;\nRenaming is possible only before downloading!`;
		bkg.sendNotif({ title: "Multirename error", text: text });
	}

}

function unpreview() {
	$$("#downloadlist td.selected").forEach(function (item) {
		let rid = item.parentElement.getAttribute("rid");
		let data = bkg.datacenter[rid];
		let namediv = $(".cell-overflow", item);
		namediv.textContent = data.finalName;
		item.setAttribute("title", data.finalName);
		item.parentElement.classList.remove("preview");
	});
	$("#mr-preview").checked = false;
}

function prepareUpdatePopups(rid, resizeNeeded) {
	if (popper_7.popup.visible) {
		let active_rid = popper_7.popup.handle.parentElement.getAttribute("rid");
		updateActionsPopup(active_rid);
	}
	if (popper_8.popup.visible) {
		let active_rid = popper_8.popup.handle.parentElement.getAttribute("rid");
		if (rid !== active_rid) return;
		updateInfoPopup(rid, resizeNeeded);
	}
}

function updateInfoPopup(rid, resizeNeeded) {
	let data = bkg.datacenter[rid];
	$("#info-status .last-td").textContent = statusDict[data.status];
	let dir = data.externalDirectory || data.unmaskedDir || data.directory || "Default Directory";

	$("#info-directory .last-td").textContent = dir;
	if (data.size) {
		let info = data.size;
		if (data.partialSize && data.percent && data.status !== "down-C") {
			info = `${data.partialSize} / ${data.size} [${(data.percent * 100).toFixed(2)} %]`;
		}
		$("#info-size .last-td").textContent = info;
	}
	else $("#info-size .last-td").textContent = "n.a.";
	let errorsList = [];

	if (data.errors) errorsList = errorsList.concat(data.errors);
	if (errorsList.length > 0 && data.status !== "down-C") {
		let currentErrors = errorsList.slice(-2);
		if (currentErrors[-1 + currentErrors.length] === "None") currentErrors = ["None"];
		let errorsElms = currentErrors.map((x) => createElem({ tag: "DIV", text: `${x}` }));
		emptyElem($("#info-errors .last-td"));
		$("#info-errors .last-td").append(...errorsElms);
	}
	else {
		$("#info-errors .last-td").textContent = "None";
	}

	if (data.timeRemaining) $("#info-time .last-td").textContent = data.timeRemaining;
	else $("#info-time .last-td").textContent = "n.a.";

	if (data.status === "down-C") {
		$("#info-time .last-td").textContent = data.totalDuration || "0s";
		$("#info-time .first-td b").textContent = "Total duration";
		$("#info-errors .last-td").textContent = "None";
	}
	else {
		$("#info-time .first-td b").textContent = "Time remaining";
	}
	if (resizeNeeded) popper_8.updatePosition();
}

function updateActionsPopup(rid) {
	let status = bkg.datacenter[rid].status;
	if (bkg.datacenter[rid].done) {
		$$("#cancel").forEach((x) => x.classList.add("disabled"));
		$$("#open, #open-folder, #remove, #delete, #retry").forEach((x) => x.classList.remove("disabled"));
		$("#toggle").classList.add("hidden");
	}
	else if (["fetch-A", "fetch-B", "fetch-C"].includes(status)) {
		$$("#open, #open-folder, #cancel, #retry, #delete").forEach((x) => x.classList.add("disabled"));
		$("#remove").classList.remove("disabled");
		$("#toggle").classList.add("hidden");
	}
	else if (["down-B", "paused"].includes(status)) {
		$$("#open, #open-folder, #delete, #retry").forEach((x) => x.classList.add("disabled"));
		$$("#remove, #cancel").forEach((x) => x.classList.remove("disabled"));
		$("#toggle").classList.remove("hidden");
		$("#toggle").textContent = status === "down-B" ? "Pause" : "Resume";
	}
	else if (["error-warning"].includes(status)) {
		$$("#open, #open-folder, #delete").forEach((x) => x.classList.add("disabled"));
		$$("#remove, #cancel, #retry").forEach((x) => x.classList.remove("disabled"));
		$("#toggle").classList.add("hidden");
	}
	else if (["user-canceled"].includes(status)) {
		$$("#open, #open-folder, #delete, #cancel").forEach((x) => x.classList.add("disabled"));
		$$("#remove, #retry").forEach((x) => x.classList.remove("disabled"));
		$("#toggle").classList.add("hidden");
	}
	else if (["down-A", "listed"].includes(status)) {
		$$("#open, #open-folder, #delete, #cancel, #retry").forEach((x) => x.classList.add("disabled"));
		$$("#remove").forEach((x) => x.classList.remove("disabled"));
		$("#toggle").classList.add("hidden");
	}
}

function getSignificantProps(obj) {
	let wanted = ["url", "text", "title", "alt", "name"];
	let result = [];
	for (let p of wanted) {
		if (obj[p]) result.push(p);
	}
	return result;
}

function makeDefinitionsList(obj, makeThumb) {
	let unit = document.createDocumentFragment();
	if (obj.category === "image" && makeThumb && obj.legalImg) {
		let div = createElem({ tag: "DIV", attrs: { "class": "thumbdiv" } });
		unit.append(div);
		let img = createElem({ tag: "IMG", attrs: { "class": "thumb" } });
		let dims = createElem({ tag: "DIV", attrs: { "class": "dims" } });
		div.append(img, dims);
	}
	let props = getSignificantProps(obj);
	for (let p of props) {
		let dt = createElem({ tag: "DT" });
		let dd = createElem({ tag: "DD" });
		unit.append(dt, dd);
		let b = createElem({ tag: "B" });
		dt.append(b);
		if (p === "url") {
			let div = createElem({ tag: "DIV" });
			b.append(div);
			let span = createElem({ tag: "SPAN", attrs: { title: "copy link address to clipboard" } });
			div.append(span);
			insertIcon(span, "copy");
			let a = createElem({ tag: "A", text: "url", attrs: { target: "_blank", title: "open link in a new tab", "class": "customlink", href: `${obj.mainUrl}` } });
			div.append(a);
		}
		else b.textContent = p;

		if (p === "url" && obj[p].startsWith("data:")) dd.textContent = "data-url";
		else dd.textContent = obj[p];
	}
	return unit;
}

function makeHistoryUnit(data) {
	let ms = data.history.created;
	var parts = (new Date(ms)).toString().split(" ").filter((x) => x.length);
	let info = "Already downloaded on " + parts[1] + " " + parts[2] + " " + parts[3];
	return createElem({ tag: "DIV", text: info, attrs: { "class": "history-info" } });
}

function makeCandidatesFoldersList(folders) {
	let parent = $("#folders-list");
	emptyElem(parent);
	for (let folder of folders) {
		let li = createElem({ tag: "LI", text: folder, attrs: { "class": "mdc-list-item" } });
		parent.append(li);
	}
}

function selectFolder(li) {
	let folder = li.textContent;
	let popup = li.closest(".popup");
	let input = $("input", popup.handle);
	ss.inputs[input.id] = folder;
	let label = $(".mdc-text-field__label", input.closest(".mdc-text-field"));
	label.classList.add("mdc-text-field__label--float-above");
	input.value = folder;
	li.closest(".popup").hide();
	setTimeout(() => {
		label.classList.remove("notransition");
	}, 300);
	let button = $("button", input.parentElement);
	if (button) button.classList.remove("hidden");

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
	let none = true;
	for (let folder of recentList) {
		let li = createElem({ tag: "LI", text: folder, attrs: { "class": "mdc-list-item custom-list-item recent-folder" } });
		parent.append(li);
		if (!testac(folder, text)) li.classList.add("hidden");
		else none = false;
	}
	for (let folder of starList) {
		let li = createElem({ tag: "LI", text: folder, attrs: { "class": "mdc-list-item custom-list-item star-folder" } });
		parent.append(li);
		if (!testac(folder, text)) li.classList.add("hidden");
		else none = false;
	}

	if (recentList.length + starList.length === 0) {
		let text = "No defined favorite folders.";
		bkg.sendNotif({ title: "Empty list", text: text });
	}

	let first = $(`.custom-list-item:not(.hidden)`, parent);
	if (first) first.classList.add("ac-selected");
}

function updateSource() {
	updateResourcesViews();

	ss.filteredList.forEach(function (rid) {
		let data = bkg.datacenter[rid];
		let name = data[ss.displayedType] || data.name;
		let wrong = data[ss.displayedType] ? "" : "wrong";
		let tr = $(`#resources tr[rid="${rid}"]`);
		if (tr) {
			let td = $(`.resname`, tr);
			let cell = $(`.cell-overflow`, tr);
			td.setAttribute("title", name);
			if (wrong) td.classList.add(wrong);
			else td.classList.remove("wrong");
			cell.textContent = name;
		}
	});
}

function showTabsScanProgress(info, end) {
	if (end) {
		$("#tb-progress").classList.add("tb-done");
		$("#tb-results").classList.add("tb-almost-done");
		let notif = `${info.done.length} tabs succesfully processed`;
		if (info.fails.length > 0) notif = notif + `\nMissing host permission for the rest of ${info.fails.length} tabs`;
		let rest = info.n - info.done.length - info.fails.length;
		if (rest > 0) notif = notif + `\nUnknows errors for the rest of ${rest} tabs`;
		$("#tb-progress-div").setAttribute("title", notif);
	}
	let notif = `${info.total} new results.`;
	if (info.duplicates > 0) notif = notif + `\n${info.duplicates} duplicates were discarded.`;
	$("#tb-results-div").setAttribute("title", notif);
	$("#tb-progress").textContent = `${info.done.length} / ${info.n} tabs`;
	$("#tb-results").textContent = `${info.total} results`;
}

function populateProximityTable(info) {
	$$(".pmask-name").forEach((td) => {
		if (td.textContent === info.mask) {
			let tr = td.parentNode;
			let cell = $(".cell-overflow", tr);
			cell.textContent = info.text;
		}
	});
}

function makeProximityRow(obj) {
	let tr = createElem({ tag: "TR", attrs: {} });
	let td_1 = createElem({ tag: "TD", text: obj.mask, attrs: { "class": "pmask-name" } });
	let td_2 = createElem({ tag: "TD", attrs: { "class": "pmask-value" } });
	let div = createElem({ tag: "DIV", attrs: { "class": "cell" } });
	let odiv = createElem({ tag: "DIV", text: obj.value, attrs: { "class": "cell-overflow" } });
	div.append(odiv);
	td_2.append(div);
	tr.append(td_1, td_2);
	return tr;
}

