"use strict";

console.log("extensionCommon.js");

var pageLoadingAnimationTimer;

docReady(() => {
	pageLoadingAnimationTimer = setTimeout(() => {
		document.body.classList.add("page-loading-animation");
	}, 10);
});
	
function loadPolymer(href) {
	return new Promise((resolve, reject) => {
		docReady(() => {
			console.time(href);
			const link = document.createElement('script');
			link.type = 'module';
			link.src = escapeHTMLPolicy.createScriptURL(href);
			//link.async = 'true'
			link.onload = function(e) {
				console.timeEnd(href);

				clearTimeout(pageLoadingAnimationTimer);
                document.body.classList.remove("page-loading-animation");
                document.body.removeAttribute("unresolved");
                document.body.removeAttribute("unresolved2");

                selectorAll("iron-iconset-svg").forEach(el => {
                    document.body.after(el);
                });

				resolve();
			};
			link.onerror = function(e) {
				console.log("jerror loading polymer: ", e);
				reject(e);
			};
			document.head.appendChild(link);
		});
	});
}

const pageVisible = new Promise((resolve, reject) => {
	if (document.hidden) {
		document.addEventListener("visibilitychange", () => {
			if (document.visibilityState == "visible") {
				resolve();
			}
		});
	} else {
		// required for options page to show loading flash screen
		setTimeout(function () {
			resolve();
		}, DetectClient.isChromium() ? 1 : 100);
	}
});

const polymerPromise = (async () => {
	// timeout 1s leaves enough time for popup window to open completely (instead of delay)
	await pageVisible;
	await loadPolymer("vulcanized-polymer.js");
    clearTimeout(pageLoadingAnimationTimer);
    document.body.classList.remove("page-loading-animation");
})();

function initTemplate(idOrObject) {
	var $template;
	var isId;
	var $innerNode;
	
	if (typeof idOrObject === "string") {
		$template = byId(idOrObject);
		isId = true;
	} else {
		$template = idOrObject;
	}
	
	if ($template) {
		console.log("import template")
		
        const newNode = document.importNode($template.content, true);
		$template.replaceWith(newNode);
		
		if (isId) {
			$innerNode = byId(idOrObject.replace("Template", ""));
	    }

		if ($innerNode) {
			initMessages("#" + idOrObject.replace("Template", "") + " *");
		} else {
			initMessages($template);
		}
	}

	if (isId) {
	// cannot use the $template handle above, must refetch new node because it seems the polymer methods are not attached when reusing $template object above
        $template = byId(idOrObject.replace("Template", ""));
	}
	
	return $template;
}

function openDialog(idOrObject, params = {}) {
	return new Promise(function(resolve, reject) {
		setTimeout(function() {

			var $dialog;
			if (typeof idOrObject == "string") {
				if (idOrObject.includes("Template")) {
					$dialog = initTemplate(idOrObject);
				} else {
					$dialog = byId(idOrObject);
				}
			} else {
				$dialog = idOrObject;
			}
			
			// required timeout to finish rendering the dialog node from initTemplate
			setTimeout(function() {
                polymerPromise.then(function() {
                    $dialog.querySelector("[dialog-other]")?.addEventListener("click", function() {
                        resolve("other");
                    }, {once: true});
        
                    $dialog.querySelectorAll("[dialog-dismiss], .cancelDialog")?.forEach(el => {
                        el.addEventListener("click", function() {
                            resolve("cancel");
                        }, {once: true});
                        el.addEventListener("touchend", function() {
                            resolve("cancel");
                        }, {once: true});
                    });

                    $dialog.querySelectorAll("[dialog-confirm], .okDialog")?.forEach(el => {
                        el.addEventListener("click", function() {
                            resolve("ok");
                        }, {once: true});
                        el.addEventListener("touchend", function() {
                            resolve("ok");
                        }, {once: true});
                    });

                    $dialog.open();
                });
				
			}, 1);
			
		}, 100);
	});
}

function showLoading() {
	showToast({toastId:"processing", text:getMessage("loading")});
}

function showSaving() {
	showToast({toastId:"processing", text:getMessage("saving")});
}

function showMessage(msg) {
	showToast({toastId:"message", text:msg, duration:3});
}

function showError(msg, actionParams) {
	showToast({toastId:"error", text:msg, duration:9999, actionParams:actionParams});
}

function showToast(params) {
	const $toast = byId(params.toastId);
	
	polymerPromise.then(function() {
        $toast.setAttribute("duration", params.duration ?  seconds(params.duration) : seconds(60));
        $toast.setAttribute("text", params.text);
        $toast.show() // polymer call

        addEventListeners($toast.querySelector(".closeToast"), "click", function() {
            $toast.hide();
        });

		const $toastLink = $toast.querySelector(".toastLink");
		if (params.actionParams) {
			$toastLink.removeAttribute("hidden");
            addEventListeners($toastLink, "click", () => {
                params.actionParams.onClick();
            }, "toast-link-click");
			if (params.actionParams.text) {
				$toastLink.textContent = params.actionParams.text;
			}
		} else {
			$toastLink?.setAttribute("hidden", "");
		}
	});
}

function hideLoading() {
	polymerPromise.then(function() {
		hide("#processing");
	});
}

function hideSaving() {
	hide("#processing");
}

function dismissToast($dismiss) {
    $dismiss.closest("paper-toast").hide();
}

function openGenericDialog(params) {
	return new Promise((resolve, reject) => {
		const TITLE_SELECTOR = "h2";
		const CONTENT_SELECTOR = ".dialogDescription";
		
		polymerPromise.then(function() {
	
			function setButtonLabel(buttonSelector, text) {
                const button = $dialog.querySelector(buttonSelector);
                if (button) {
                    button.textContent = text;
                }
			}
			
			const $dialog = initTemplate("genericDialogTemplate");
			if (!params.title) {
				params.title = "";
			}
            $dialog.querySelector(TITLE_SELECTOR).textContent = params.title;
	
			if (!params.content) {
				params.content = "";
			}
			
            emptyNode($dialog.querySelector(CONTENT_SELECTOR), params.content);
	
			if (!params.okLabel) {
				params.okLabel = getMessage("ok");
			}
			setButtonLabel(".okDialog", params.okLabel)
			
			if (params.showCancel) {
                $dialog.querySelector(".cancelDialog").hidden = false;
			} else {
                $dialog.querySelector(".cancelDialog")?.setAttribute("hidden", "");
			}
			
			if (params.otherLabel) {
                $dialog.querySelector(".otherDialog").hidden = false;
                setButtonLabel(".otherDialog", params.otherLabel)
			} else {
                $dialog.querySelector(".otherDialog")?.setAttribute("hidden", "");
			}
	
			openDialog($dialog).then(response => {
				if (response == "ok" && params.okAction) {
					params.okAction();
				} else if (response == "other" && params.otherAction) {
					params.otherAction();
				}
				resolve(response);
			});		
		});
	});
}

function isFocusOnInputElement() {
    return [
        "SELECT",
        "TEXTAREA",
        "INPUT",
        "OVERLAY-HOST",
        "PAPER-BUTTON",
        "PAPER-INPUT",
        "PAPER-DROPDOWN-MENU",
        "PAPER-ITEM",
        "PAPER-TEXTAREA",
        "IRON-AUTOGROW-TEXTAREA",
    ].includes(document.activeElement.nodeName);
}