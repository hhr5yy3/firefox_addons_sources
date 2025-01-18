/*
* anonymoX client
*   for Firefox
*
* Author 	Nils Hügelmann	<nils.h@anonymox.net>
* Author 	Christian Otto	<chris.o@anonymox.net>
*
* www.anonymox.net
*
* License: CC BY-NC-ND 3.0, see LICENSE.TXT or http://creativecommons.org/licenses/by-nc-nd/3.0/
*
* Use at your own risk
*
* This is the released, uncommented version of the code.
*/
(function() {
	var DomHelper = function (el) {



		if (typeof el == "string") {


			el = el.replace("<", "");
			el = el.replace(">", "");

			el = document.createElement(el);
		}

		if (el.element) {

			el = el.element;
		}

		return {
			element: el,

			attr: function (objOrString, val) {


				if (val) {

					el.setAttribute(objOrString, val);

					return DomHelper(el);
				}

				for (var attribute in objOrString) {
					el.setAttribute(attribute, objOrString[attribute]);
				}

				return DomHelper(el);
			},

			append: function () {



				for (var i = 0; i < arguments.length; i += 1) {
					var element = arguments[i];

					if (element.element) {

						element = element.element;
					}

					if (el.nodeName == "IFRAME") {

						el.contentDocument.body.appendChild(element);
					} else {
						el.appendChild(element);
					}
				}

				return DomHelper(el);
			},

			css: function (styles) {



				for (var style in styles) {
					if (typeof styles[style] == "number" && style != "zIndex") {

						styles[style] = String(styles[style]) + "px";
					}

					el.style[style] = styles[style];
				}

				return DomHelper(el);
			},

			html: function (html) {


				if (el.nodeName == "IFRAME") {

					el.contentDocument.body.innerHTML = html;
				} else {
					el.innerHTML = html;
				}

				return DomHelper(el);
			},

			text: function (string) {


				el.innerText = string;

				return DomHelper(el);
			},

			onclick: function (func) {


				el.onclick = func;

				return DomHelper(el);
			}
		};
	};

	var $ = DomHelper,
		adHTML = $("<div>"),
		frameContainer = $("<div>"),
		iframeHTML = $("<iframe>"),
		controlsHTML = $("<div>"),
		buttonClose = $("<button>"),
		buttonDisable = $("<button>"),
		text = $("<p>");



	buttonClose.text(chrome.i18n.getMessage("Close"));
	buttonDisable.text(chrome.i18n.getMessage("Disable"));
	frameContainer.css({
		background: "rgb(230,230,230)",
		position: "fixed",
		bottom: 0,
		left: "50%",
		zIndex: 99999
	});

	iframeHTML.attr({
		id: "anymx-frame"
	});

	controlsHTML.css({
		position: "absolute",
		top: 0,
		right: 0,
		width: 110,
		padding: "5px 0px 0px 10px",
		fontFamily: "Arial, sans-serif",
		fontWeight: "normal",
		fontSize: 12,
		color: "#000"
	});

	buttonClose.css({
		width: 90,
		margin: "0px 0px 5px 5px"
	});

	buttonDisable.css({
		width: 90,
		marginLeft: 5
	});

	text.css({
		fontSize: 8,
		marginRight: 15,
		textAlign: "center"
	}).text(
		chrome.i18n.getMessage("Ads_by_anonymoX")
	);

	controlsHTML.append(
		buttonClose
	);

	controlsHTML.append(
		buttonClose,
		buttonDisable,
		text
	);

	function insertIFrame (obj) {


		frameContainer.css({
			width: obj.width,
			height: obj.height,
			marginLeft: obj.marginLeft
		});

		iframeHTML.css({
			width: obj.width,
			height: obj.height,
			border: "none"
		});

		frameContainer.append(iframeHTML);
		adHTML.append(frameContainer);
		document.body.appendChild(adHTML.element);


		setTimeout(function() {
			iframeHTML.html(obj.adCode);
			iframeHTML.append(controlsHTML);


			iframeHTML.element.contentDocument.body.style.margin = "0px";
		}, 100);
	};



	var port = browser.runtime.connect({ name: "ad-channel" });

	port.onMessage.addListener(function(msg) {
		if (msg == "destroy") {
			adHTML.element.remove();
		}

		if (typeof msg == "object") {
			insertIFrame(msg);
		}
	});

	buttonClose.onclick(function () {
		port.postMessage("destroy-iframe");
	});

	buttonDisable.onclick(function () {
		port.postMessage("open-disable-link");
		port.postMessage("destroy-iframe");
	});
})();
