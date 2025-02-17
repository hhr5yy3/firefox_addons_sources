

let opsys;

chrome.runtime.sendMessage({type:"request platform info"});

chrome.runtime.onMessage.addListener(extractData);

function extractData(message, sender){
	if (message.type === "platform info") {
		opsys = message.info.opsys;
	}
}

class PopBuilder {
	constructor(options) {
		this.popup = this.wrapper(options.content);
		this.handleSelector = options.handleSelector || "";
		this.relation = options.relation || "top";
		this.deviation = options.deviation || 0;
		this.tol = options.tol || 0;
		this.align = options.align || "CC";
		this.atClick = options.atClick || false;
		this.onHide = options.onHide || function (/* popup */) { };
		this.onShow = options.onShow || function (/* e, popup */) { };
		this.onBeforeShow = options.onBeforeShow || function (/* e, popup */) { };
		this.test = options.test || function (/* e, popup */) { return true; };
		this.trigger = options.trigger || 1;
		this.persistOn = options.persistOn || [];
		this.updateOn = (options.updateOn || []).filter((x) => this.persistOn.includes(x));
		if (options.classes) options.classes.split(/\s+/).forEach((x) => { if (x.length) this.popup.classList.add(x); });
		this.delegatedHandle = options.delegatedHandle || undefined;
		this.margins = { horizontal: 0, vertical: 0 };
		if (options.margins) this.margins = { horizontal: options.margins.horizontal || 0, vertical: options.margins.vertical || 0 };
		this.autoMonitoring = options.autoMonitoring || false;
		this.zIndex = options.zIndex || "1000000";
	}

	wrapper(content) {
		let popup = document.createElement("div");
		popup = document.body.appendChild(popup);
		popup.classList = "popup";
		popup.style.display = "none";
		popup.style.position = "fixed";
		if (typeof content === "string") {
			let div = document.createElement("div");
			content = document.createRange().createContextualFragment(content);
			div.appendChild(content);
			if (div.children.length === 1) content = div.children[0];
			else content = div;
		}
		if (content instanceof Element) {
			popup.appendChild(content);
		}
		else throw "definition content error";
		content.style.display = "block";
		popup.content = content;
		return popup;
	}

	init() {
		let popup = this.popup;
		let that = this;
		let etype, which;

		if (this.trigger === "click") {
			etype = "mouseup";
			which = 1;
		}
		else if (this.trigger === "dblclick") {
			etype = "dblclick";
			which = 1;
		}
		else {
			etype = "contextmenu";
			which = 3;
		}

		popup.style.marginTop = this.margins.vertical + "px";
		popup.style.marginBottom = this.margins.vertical + "px";
		popup.style.marginLeft = this.margins.horizontal + "px";
		popup.style.marginRight = this.margins.horizontal + "px";

		on({ type: etype, selector: that.handleSelector, container: document.body }, function (e) {
			if (e.which === which && that.test(e, popup)) {
				let handle = this;
				let persistOnClick = that.persistOn.includes("click");
				if (popup.style.display === "block" && (popup.handle == handle || persistOnClick)) that.hide();
				else {
					that.e = e;
					handle.popper = that;
					popup.handle = handle;
					that.onBeforeShow(e, popup);
					that.show(e);
				}
			}
		});

		if (that.autoMonitoring) {
			let config = { childList: true, subtree: true };
			let callback = function (mutationsList) {
				for (let mutation of mutationsList) {
					if (mutation.type == "childList") {
						if (popup.style.display === "block") {
							that.updatePosition();
						}
					}
				}
			};
			let observer = new MutationObserver(callback);
			observer.observe(popup, config);
		}

		if (!PopBuilder.started) {
			PopBuilder.setUpGeneralEvents();
			PopBuilder.started = true;
		}

		popup.hide = function () { that.hide(); };
		Object.defineProperty(popup, "visible", {
			get: function () { return this.style.display === "block"; }
		});
		popup.popper = that;
	}

	manualShow(handle, action){
		handle.popper = this;
		this.popup.handle = handle;
		action(this.popup);
		this.show();		
	}

	show() {
		let e = this.e;
		let popup = this.popup;
		let handle = this.popup.handle;
		handle.classList.add("active-handle");
		popup.style.zIndex = "-1000";
		popup.style.top = "0";
		popup.style.left = "0";
		popup.style.display = "block";
		let tplf = this.getUsableTopLeft();
		popup.style.top = tplf.finalTop + "px";
		popup.style.left = tplf.finalLeft + "px";

		popup.style.zIndex = this.zIndex;
		this.onShow(e, popup);
	}

	hide() {
		let popup = this.popup;
		if (popup.style.display !== "none") {
			popup.style.display = "none";
			popup.handle.classList.remove("active-handle");
			this.onHide(popup);
		}
	}

	updatePosition() {
		let popup = this.popup;
		let tplf = this.getUsableTopLeft();
		popup.style.top = tplf.finalTop + "px";
		popup.style.left = tplf.finalLeft + "px";
	}

	getUsableTopLeft() {
		let e = this.e;
		let popup = this.popup;
		let handle = popup.handle;
		if (this.delegatedHandle) handle = this.delegatedHandle(handle);
		let prect = popup.getBoundingClientRect();
		let hrect = this.atClick ?
			{ top: e.clientY, left: e.clientX, bottom: e.clientY, right: e.clientX, width: 0, height: 0 } :
			handle.getBoundingClientRect();
		let relation = this.relation;
		let tol = Math.abs(this.tol);
		let deviation = this.deviation;
		let heightOverflow = prect.height > window.innerHeight;
		let widthOverflow = prect.width > window.innerWidth;
		let finalTop, finalLeft;
		if (relation === "bottom") {
			if (!heightOverflow) {
				let wantedTop = hrect.bottom + tol;
				let wantedTop2 = hrect.top - prect.height - tol;
				let y = wantedTop + prect.height - window.innerHeight;
				if (y < 0) finalTop = wantedTop;

				else if (y < tol) finalTop = wantedTop - y;

				else if (wantedTop2 > 0) finalTop = wantedTop2;

				else if (tol + wantedTop2 > 0) finalTop = 0;

				else finalTop = window.innerHeight - prect.height;
			}
			else finalTop = 0;
		}
		else if (relation === "top") {
			if (!heightOverflow) {
				let wantedTop = hrect.top - prect.height - tol;
				let wantedTop2 = hrect.bottom + tol;
				let y2 = wantedTop + prect.height - window.innerHeight;
				if (wantedTop > 0) finalTop = wantedTop;
				else if (tol + wantedTop > 0) finalTop = 0;
				else if (y2 < 0) finalTop = wantedTop2;
				else if (y2 < tol) finalTop = wantedTop2 - y2;
				else finalTop = 0;
			}
			else finalTop = 0;
		}

		else if (relation === "right") {
			if (!widthOverflow) {
				let wantedLeft = hrect.right + tol;
				let wantedLeft2 = hrect.left - prect.width - tol;
				let x = wantedLeft + prect.width - window.innerWidth;
				if (x < 0) finalLeft = wantedLeft;
				else if (x < tol) finalLeft = wantedLeft - x;
				else if (wantedLeft2 > 0) finalLeft = wantedLeft2;
				else if (tol + wantedLeft2 > 0) finalLeft = 0;
				else finalLeft = window.innerWidth - prect.width;
			}
			else finalLeft = 0;
		}

		else if (relation === "left") {
			if (!widthOverflow) {
				let wantedLeft = hrect.left - prect.width - tol;
				let wantedLeft2 = hrect.right + tol;
				let x2 = wantedLeft + prect.width - window.innerWidth;
				if (wantedLeft > 0) finalLeft = wantedLeft;
				else if (tol + wantedLeft > 0) finalLeft = 0;
				else if (x2 < 0) finalLeft = wantedLeft2;
				else if (x2 < tol) finalLeft = wantedLeft2 - x2;
				else finalLeft = 0;
			}
			else finalLeft = 0;
		}

		if (relation === "top" || relation === "bottom") {
			if (!widthOverflow) {
				let left;
				switch (this.align) {
					case "LR":
						left = hrect.right;
						break;
					case "RR":
						left = hrect.right - prect.width;
						break;
					case "LL":
						left = hrect.left;
						break;
					case "RL":
						left = hrect.left - prect.width;
						break;
					case "CC":
						left = (hrect.left + hrect.right - prect.width) / 2;
						break;
				}

				let wantedLeft = deviation + left;
				if (wantedLeft < 0) finalLeft = 0;
				else if (wantedLeft + prect.width > window.innerWidth) finalLeft = window.innerWidth - prect.width;
				else finalLeft = wantedLeft;
			}
			else finalLeft = 0;
		}

		if (relation === "left" || relation === "right") {
			if (!heightOverflow) {
				let top;
				switch (this.align) {
					case "TB":
						top = hrect.bottom;
						break;
					case "BB":
						top = hrect.bottom - prect.height;
						break;
					case "TT":
						top = hrect.top;
						break;
					case "BT":
						top = hrect.top - prect.height;
						break;
					case "CC":
						top = (hrect.top + hrect.bottom - prect.height) / 2;
						break;
				}
				let wantedTop = deviation + top - this.margins.vertical;
				if (wantedTop < 0) finalTop = 0;
				else if (wantedTop + prect.height > window.innerHeight) finalTop = window.innerHeight - prect.height;
				else finalTop = wantedTop;
			}
			else finalTop = 0;
		}

		finalLeft = finalLeft > this.margins.horizontal ? finalLeft - this.margins.horizontal : 0;
		finalTop = finalTop > this.margins.vertical ? finalTop - this.margins.vertical : 0;
		let result = { finalLeft: finalLeft, finalTop: finalTop };

		return result;
	}
}

PopBuilder.hideAll = function (events) {

	let L = Array.from(document.getElementsByClassName("popup")).filter((pop) => pop.visible);
	if (events) L = L.filter((el) => !el.popper.persistOn.some((x) => events.indexOf(x) > -1));
	L.forEach((el) => el.hide());
};

PopBuilder.updateAll = function (events) {
	let actives = [...document.getElementsByClassName("active-handle")];
	if (actives.length === 0) return;
	if (events) actives = actives.filter((el) => el.popper.updateOn.some((x) => events.indexOf(x) > -1));
	actives.forEach((el) => el.popper.updatePosition());
};

PopBuilder.setUpGeneralEvents = function () {
	let scroll_ticking = false;

	window.addEventListener("scroll", function (e) {
		if (["INPUT", "TEXTAREA"].includes(e.target.nodeName)) return;
		if (e.target.closest && e.target.closest(".popup")) return;
		if (!scroll_ticking) {
			window.requestAnimationFrame(function () {
				PopBuilder.hideAll(["scroll"]);
				PopBuilder.updateAll(["scroll"]);
				scroll_ticking = false;
			});
			scroll_ticking = true;
		}
	}, true);

	document.addEventListener("mousedown", function (e) {
		if (e.target.closest(".popup")) return;
		let h = e.target.closest(".active-handle");
		if (h && !h.popper.persistOn.includes("click")) return;
		PopBuilder.hideAll(["click"]);
	}, false);

	let etype = opsys === "win" ? "mouseup" : "mousedown";

	document.addEventListener(etype, function (e) {
		if (e.target.closest(".popup")) return;
		let h = e.target.closest(".active-handle");

		if (h && !h.popper.persistOn.includes("click") && h.popper.trigger != "click") requestAnimationFrame(() => h.popper.hide());
	}, false);

	document.addEventListener("contextmenu", function (e) {
		if (e.target.closest(".popup")) return;
		let h = e.target.closest(".active-handle");
		if (h && !h.popper.persistOn.includes("click") && h.popper.trigger != "contextmenu") requestAnimationFrame(() => h.popper.hide());
	}, false);
};

PopBuilder.started = false;
