"use strict";

let inPopup;
if (location.href.includes("popup.html")) {
	inPopup = true;
}

var pageLoadingAnimationTimer;

docReady(() => {
	pageLoadingAnimationTimer = setTimeout(() => {
        if (inPopup) {
            document.body.classList.add("page-loading-animation");
		}
	}, 1);
})

function loadPolymer(href) {
	return new Promise(function(resolve, reject) {
		if (href) {
			docReady(() => {
				console.time(href);
				const link = document.createElement('script');
				link.type = 'module';
				link.src = href;
				//link.async = 'true'
				link.onload = function(e) {
					console.timeEnd(href);
					// patch: import polyfil causes icons (ie. #menu) to be exposed in DOM and they get selected instead!
				    selectorAll("iron-iconset-svg").forEach(el => {
				        document.body.after(el);
				    });
					resolve();
				};
				link.onerror = function(e) {
					console.error("jerror loading polymer: ", e);
					reject(e);
				};
				document.head.appendChild(link);
			});
		} else {
			resolve();
		}
	});
}
		
globalThis.originalAnimate = Element.prototype.animate;

var polymerFile;
var polymerFile2;
if (inPopup) {
	polymerFile = "vulcanized-polymer.js";
	polymerFile2 = "vulcanized-polymer2.js";
} else {
	polymerFile = "vulcanized-polymer-all.js";
}

var polymerSkipLoadingFontRoboto = true;

var pageVisible = new Promise((resolve, reject) => {
	if (document.hidden) {
		document.addEventListener("visibilitychange", () => {
			if (document.visibilityState == "visible") {
				resolve();
			}
		});
	} else {
		// required for options page to show loading flash screen
		setTimeout(function() {
			resolve();
		}, 1);
	}
});

var polymerPromise = (async function() {
	// timeout 1s leaves enough time for popup window to open completely (instead of delay)
	await pageVisible;
	await loadPolymer(polymerFile);
    clearTimeout(pageLoadingAnimationTimer);

    selectorAll("[post-effects]").forEach(el => {
        el.setAttribute("effects", el.getAttribute("post-effects"));
    });

    document.body.classList.remove("page-loading-animation");
    // firefox patch: polymer removes this autmoatically in Chrome, but not in Firefox when using polyfills
    document.body.removeAttribute("unresolved");
    document.body.setAttribute("resolved", "");
})();
	
var polymerPromise2 = (async function() {
	await polymerPromise;
    await new Promise((resolve, reject) => {
        requestIdleCallback(async () => {
            await loadPolymer(polymerFile2);
            document.body.removeAttribute("unresolved2");
            document.body.setAttribute("resolved2", "");
            resolve();
        }, {
            timeout: DetectClient.isChromium() ? 200 : 300
        });
    });
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
	
	if (!$template) {
		//alert("Could not find template: " + id.replace("Template", ""));
	}
	
	return $template;
}

function openDialog(idOrObject, params = {}) {
	return new Promise(async function(resolve, reject) {
        // required timeout to finish rendering the dialog node from initTemplate
        await sleep(params.renderDelay || 1); // changed from 100
        await polymerPromise2;

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

        const $scrollable = $dialog.querySelector("paper-dialog-scrollable");
        addMyScrollbars($scrollable, $scrollable?.shadowRoot);

        $dialog.querySelector("[dialog-other]")?.addEventListener("click", function() {
            resolve("other");
        }, {once: true});

        $dialog.querySelector("[dialog-other2]")?.addEventListener("click", function() {
            resolve("other2");
        }, {once: true});

        $dialog.querySelector("[dialog-other3]")?.addEventListener("click", function() {
            resolve("other3");
        }, {once: true});

        $dialog.querySelectorAll("[dialog-dismiss], .cancelDialog")?.forEach(el => {
            ["click", "touchend"].forEach(type => {
                el.addEventListener(type, function() {
                    resolve("cancel");
                }, {once: true});
            })
        });

        $dialog.querySelectorAll("[dialog-confirm], .okDialog")?.forEach(el => {
            ["click", "touchend"].forEach(type => {
                el.addEventListener(type, function() {
                    resolve("ok");
                }, {once: true});
            })
        });

        $dialog.addEventListener("opened-changed", e => {
            // dialog closing value == false
            if (e.detail.value === false) {
                // add delay because the close method happens even if you click buttons like ok etc.
                setTimeout(() => {
                    resolve("cancel");
                }, 100);
            }
        });
		
        $dialog.open();
	});
}

function showLoading() {
	show("#spinner");
}

function showSaving() {
	byId("progress").style.opacity = "1";
}

function hideSaving() {
    byId("progress").style.opacity = "0";
}


function showMessage(msg, actionParams, stayOpen) {
    let duration;
    if (stayOpen) {
        duration = 999;
    } else {
        duration = actionParams ? 10 : 3;
    }
	showToast({toastId:"message", text:msg, duration: duration, actionParams: actionParams});
}

async function showError(msg, actionParams) {
	console.error(msg)
	await showToast({toastId:"message", text:msg, duration: 10, actionParams:actionParams});
}

async function showToast(params) {
	const $toast = byId(params.toastId);
    await polymerPromise2;
    
    $toast.hide();
    $toast.show({text:params.text, duration:seconds(params.duration ? params.duration : 60)});
    // must do this after .show to override text
    emptyAppend($toast.shadowRoot.querySelector("#label"), params.text); // for html
    
    onClick($toast.querySelector(".closeToast"), () => {
        $toast.hide();
    });
    
    if (!params.keepToastLinks) {
        const $toastLink = $toast.querySelector(".toastLink");
        if (params.actionParams) {
            $toastLink.removeAttribute("hidden");
            onClickReplace($toastLink, () => {
                params.actionParams.onClick();
            });
            if (params.actionParams.text) {
				$toastLink.textContent = params.actionParams.text;
            }
        } else {
            $toastLink?.setAttribute("hidden", "");
        }
    }
}

function hideLoading() {
	hide("#spinner");
}

function hideMessage() {
	polymerPromise.then(function() {
		var node = byId("message");
		if (node.hide) {
			node.hide();
		}
	})
}

function dismissToast($dismiss) {
    $dismiss.closest("paper-toast").hide();
}

function openGenericDialog(params) {
	return new Promise((resolve, reject) => {
		const TITLE_SELECTOR = "h2";
		const CONTENT_SELECTOR = ".dialogDescription";
		
		polymerPromise2.then(() => {
	
			function setButtonLabel(buttonSelector, text) {
                const button = $dialog.querySelector(buttonSelector);
				if (button) {
					button.textContent = text;
				}
			}
			
			const $dialog = initTemplate("genericDialogTemplate");

            if (params.modal) {
                $dialog.setAttribute("modal", "true");
            } else {
                $dialog.removeAttribute("modal");
            }
			
            params.title ||= "";
            if ($dialog.querySelector(TITLE_SELECTOR)) {
			    $dialog.querySelector(TITLE_SELECTOR).textContent = params.title;
            }
		
            params.content ||= "";
			
            emptyAppend($dialog.querySelector(CONTENT_SELECTOR), params.content);

            if (params.raiseOkButton) {
                $dialog.querySelector(".okDialog")?.classList.add("colored");
                $dialog.querySelector(".okDialog")?.setAttribute("raised", "");
            } else {
                $dialog.querySelector(".okDialog")?.classList.remove("colored");
                $dialog.querySelector(".okDialog")?.removeAttribute("raised");
            }
			
            params.okLabel ||= getMessage("ok");
			setButtonLabel(".okDialog", params.okLabel)

			var cancelLabel;
			if (params.cancelLabel) {
				cancelLabel = params.cancelLabel;
			} else {
				cancelLabel = getMessage("cancel");
			}
			setButtonLabel(".cancelDialog", cancelLabel)
			
			if (params.showCancel || params.cancelLabel) {
				$dialog.querySelector(".cancelDialog")?.removeAttribute("hidden");
			} else {
				$dialog.querySelector(".cancelDialog")?.setAttribute("hidden", "");
			}
			
			if (params.otherLabel) {
				$dialog.querySelector(".otherDialog").hidden = false;
				setButtonLabel(".otherDialog", params.otherLabel)
			} else {
				$dialog.querySelector(".otherDialog")?.setAttribute("hidden", "");
			}

			if (params.otherLabel2) {
				$dialog.querySelector(".otherDialog2").hidden = false;
				setButtonLabel(".otherDialog2", params.otherLabel2)
			} else {
				$dialog.querySelector(".otherDialog2")?.setAttribute("hidden", "");
			}

			if (params.noAutoFocus) {
				$dialog.querySelector("[autofocus]")?.removeAttribute("autofocus");
			}

			openDialog($dialog).then(response => {
                if (params.returnDialog) {
                    resolve({
                        response: response,
                        dialog: $dialog
                    });
                } else {
                    resolve(response);
                }
			});		
		});		
	});
}

function niceAlert(message, modal) {
	return openGenericDialog({
        content: message,
        modal: modal
    });
}

function isFocusOnInputElement() {
    const nodeName = document.activeElement.nodeName;
    return nodeName == "SELECT" ||
        nodeName == "TEXTAREA" ||
        nodeName == "INPUT" ||
        nodeName == "OVERLAY-HOST" ||
        nodeName == "PAPER-BUTTON" ||
        nodeName == "PAPER-INPUT" ||
        nodeName == "PAPER-DROPDOWN-MENU" ||
        nodeName == "PAPER-ITEM" ||
        nodeName == "PAPER-TEXTAREA" ||
        nodeName == "EVENT-REMINDERS" ||
        nodeName == "IRON-AUTOGROW-TEXTAREA" ||
        document.activeElement.getAttribute("contenteditable")
    ;
}

function addMyScrollbars($node, shadowRoot) {
    if ($node && !$node._modifiedScrollbarCss) {
        if (globalThis.scrollbarCssSheet) {
            if (shadowRoot) {
                const elemStyleSheets = shadowRoot.adoptedStyleSheets;
                if (elemStyleSheets) {
                    shadowRoot.adoptedStyleSheets = [...elemStyleSheets, globalThis.scrollbarCssSheet];
                }
            }
        }
        $node._modifiedScrollbarCss = true;
    }
}