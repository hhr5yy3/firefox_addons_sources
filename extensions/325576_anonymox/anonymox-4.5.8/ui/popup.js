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
var currentData;


function handleMessage(message, sender, sendResponse) {
	if (message.uidata) {
		populateUi(message.uidata);
	}
}

var localize = function(str, ...args) {
	return browser.i18n.getMessage(str, args);
}

var translateGW = function(str) {
	return localize(`cc-${str}`);
}


var score = function(u, umin, umax) {
	if (u <= umin) {
		return 5;
	} else if (u >= umax) {
		return 1;
	}
	let diff = umin - umax;
	return Math.round(1 + 4 * (u - umax) / diff, 0);
};

function scrollToElement(container, current) {
	if (container.length > 0 && current.length > 0) {
		container.scrollTop(
			current.offset().top -
			container.offset().top +
			container.scrollTop()
		);
	}
}

function setSettingsState(data) {
	let main = jQuery("#anonymox-panel-main");
	let areaSettings = main.find(".main-settings .area-settings");
	let areaSettingsDesc = areaSettings.find(".desc");

	if (data.state !== "started") {
		main.removeClass("settings-saved").addClass("settings-unavailable");
		var snip = "";
		if (data.state == "error") {
			snip = data.errorMsg || snip;
		} else if (data.state == "starting") {
			snip = localize("appName");
		}
		areaSettingsDesc.text(localize(`${data.state}State`, snip));
		main.addClass("status-internal");
		return;
	}


	if (data.internal) {
		main.removeClass("settings-saved").addClass("settings-unavailable");
		areaSettingsDesc.text(localize("panelNotProxied"));
		main.addClass("status-internal");
		hideIdentitiesList();
		return;
	} else {
		main.removeClass("settings-unavailable").addClass("settings-empty");
		main.removeClass("status-internal");
	}

	if (data.profileName == "default") {
		main.removeClass("settings-saved").addClass("settings-empty");
		areaSettingsDesc.text(localize("panelSaveSettings"));
	} else {
		main.removeClass("settings-empty").addClass("settings-saved");
		areaSettingsDesc.html(localize("panelSavedSettings", "<strong>" + data.profileName + "</strong>"));
	}
}

function setActiveState(data) {
	let main = jQuery("#anonymox-panel-main");
	let activeToggleDesc = jQuery(".area-active-toggle .desc");
	if (data.enabled) {
		main.removeClass("status-inactive").addClass("status-active");
		activeToggleDesc.text(localize("panelActive"));
	} else {
		main.removeClass("status-active").addClass("status-inactive");
		activeToggleDesc.text(localize("panelInactive"));
	}
}

function setProxyInfo(data) {
	let mainProxy = jQuery("#anonymox-panel-main-proxy");
	let proxyInfo = mainProxy.children(".area-proxy-info");
	let proxyDesc = proxyInfo.find(".proxy-desc");
	let qualityInfo = proxyInfo.find(".icon.quality");

	proxyInfo.removeClass(function (idx, className) {
		return (className.match(/(^|\s)country-\S+/g) || []).join(" ");
	});

	let currentGw = data.currentGw;

	if (data.internal || !data.enabled) {
		mainProxy.hide();
		return;
	} else {
		mainProxy.show();
	}

	let countryClass = "country-" + currentGw.country;
	proxyInfo.addClass(countryClass);


	proxyDesc.text(currentGw.id + ", " + translateGW(currentGw.country));


	qualityInfo.removeClass(function (index, className) {
		return (className.match (/(^|\s)quality-\S+/g) || []).join(' ');
	});
	qualityInfo.addClass("quality-" + score(currentGw.usageIndex, -50, 100));
}

function setConnectionInfo(data) {
	let connOverview = jQuery("#anonymox-panel-main-connection-overview");
	let connGraph = connOverview.find(".area-connection-graph");
	let connLP = connOverview.find(".connection-local-proxy");
	let connPT = connOverview.find(".connection-proxy-target");
	let connLT = connOverview.find(".connection-local-target");
	let connTarget = connPT.add(connLT);

	let labelProxy = connOverview.find(".label-proxy");
	let nodeProxy = connOverview.find(".node-proxy");


	let connLPClasses = [
		"not-secured-premium",
		"secured-premium",
		"not-secured-no-premium",
		"secured-no-premium"
	];


	let connLPAddClassIdx = (data.currentGw && data.currentGw.tls) ? 0 : 2;

	if (data.endToEnd) {

		connLPAddClassIdx += 1;

		connTarget.removeClass("not-secured").addClass("secured");
	} else {
		connTarget.removeClass("secured").addClass("not-secured");
	}


	let connLPAddClass = connLPClasses.splice(connLPAddClassIdx, 1)[0];
	connLP.addClass(connLPAddClass).removeClass(connLPClasses.join(" "));




	nodeProxy.removeClass(function (idx, className) {
		return (className.match(/(^|\s)country-\S+/g) || []).join(" ");
	});


	let labelTarget = connOverview.find(".label-target");
	var labelTargetText = (data.domain !== "") ? data.domain : data.url;
	labelTarget.find(".main .name").text(labelTargetText);


	connOverview.find(".label-local").find(".ip").text(data.ownIp);
	connOverview.find(".label-target").find(".ip").text(data.remoteIp);


	if (!data.enabled) {
		connGraph.removeClass("local-proxy-target");
		connGraph.addClass("local-target");

		labelProxy.find(".ip").text("none");



		connLP.hide();
		connPT.hide();
		connLT.show();
		nodeProxy.hide();
		labelProxy.hide();
	} else {
		connGraph.removeClass("local-target");
		connGraph.addClass("local-proxy-target");
		let countryClass = "country-" + data.currentGw.country;
		nodeProxy.addClass(countryClass);

		labelProxy.find(".node-name").text(data.currentGw.id);
		if (data.currentGw.externalInfo) {
			labelProxy.find(".ip").text(data.currentGw.externalInfo.ip);
		} else {
			labelProxy.find(".ip").text(data.currentGw.ip);
		}

		connLP.show();
		connPT.show();
		connLT.hide();
		nodeProxy.show();
		labelProxy.show();
	}
}

function setPremiumState(data) {
	let premiumStatus = jQuery("#anonymox-main-premium-status");
	let premiumStatusLabel = premiumStatus.children(".desc");
	if (data.premium) {
		premiumStatus.removeClass("premium-inactive").addClass("premium-active");
		premiumStatusLabel.text(localize("panelPremiumActive"));
	} else {
		premiumStatus.removeClass("premium-active").addClass("premium-inactive");
		premiumStatusLabel.text(localize("panelPremiumInactive"));
	}
}

var CountryList = function(wrapper) {
	let list = wrapper.children("ul");
	let jQ = jQuery;
	return {
		clear : function() {
			wrapper.empty();
			list = jQ("<ul></ul>");
			list.attr("aria-labelledby", "clabel");
			wrapper.append(list);
		},
		addEntry : function(country, current) {

			let countryClass, countryLabel;
			if (country == "automatic") {
				countryClass = country;
				countryLabel = localize("panelAllCountries");
			} else if (country == "premium-more") {
				countryClass = country;
				countryLabel = localize("panelMoreCountries");
			} else {
				countryClass = "country-" + country;
				countryLabel = translateGW(country);
			}
			let entry = jQ("<li></li>").addClass(countryClass);
			entry.attr("data-country", country);
			entry.attr("tabindex", "0");
			entry.attr("role", "radio");


			if (current) {
				entry.addClass("current");
				entry.attr("aria-checked", "true");
			}


			let flag = jQ("<div class=\"flag\"></div>");
			let name = jQ("<div class=\"name\"></div>");
			name.text(countryLabel);
			let selIcon = jQ("<div class=\"icon selection\"></div>");

			entry.click(countrySelected);


			entry.append(flag).append(name).append(selIcon);
			list.append(entry);
		}
	}
};

function populateCountryList(data) {
	let jQ = jQuery;
	let countries = {};

	let countryListWrapper = jQ(".overlay-identities").find(".column.countries");
	let cL = CountryList(countryListWrapper);
	cL.clear();


	let isDefined = data.currentCountry != undefined;
	let noCountryFilter = !isDefined;
	cL.addEntry("automatic", noCountryFilter);


	for (const gw of data.identities) {

		if (!countries[gw.country]) {
			countries[gw.country] = true;
			let selected = isDefined && data.currentCountry == gw.country;
			cL.addEntry(gw.country, selected);
		}
	}

	if (data.showMoreCountries) {
		cL.addEntry("premium-more", false);
	}


	scrollToElement(countryListWrapper, countryListWrapper.find('.current'));
}

var IdentityList = function(wrapper) {
	let list = wrapper.children("ul");
	let jQ = jQuery;
	let length = 0;

	return {
		get length() {
			return length;
		},
		clear : function() {
			wrapper.empty();
			list = jQ("<ul></ul>");
			wrapper.append(list);
			length = 0;
		},
		addEntry : function(name, ip, quality, premium, current, gateway) {
			let entry = jQ("<li></li>");
			entry.attr("data-gwid", name);
			entry.attr("tabindex", "0");
			entry.attr("role", "radio");

			if (premium) {
				entry.addClass("premium");
			}
			if (current) {
				entry.addClass("current");
				entry.attr("aria-checked", "true");
			}

			let prem = jQ("<div class=\"icon star\"></div>");
			let main = jQ("<div class=\"main\"></div>");

			let nameDiv = jQ("<div class=\"name\"></div>");
			nameDiv.text(name);



			let qualiIcon = jQ("<span class=\"icon quality\"></span>");
			qualiIcon.addClass("quality-" + quality);
			nameDiv.append(qualiIcon);
			main.append(nameDiv);

			let ipDiv = jQ("<div class=\"ip\"></div>");
			ipDiv.text(ip);
			main.append(ipDiv);

			let selIcon = jQ("<div class=\"icon selection\"></div>");

			entry.click(identitySelected);


			entry.append(prem).append(main).append(selIcon);
			list.append(entry);
			length++;
		}
	};
};

function populateIdentitiesList(data) {
	let jQ = jQuery;
	let identityListWrapper = jQ(".overlay-identities").find(".column.identities");
	let identityList = IdentityList(identityListWrapper);
	identityList.clear();

	jQ(".overlay-identities").find(".title.identities .count").text(data.identities.length);

	for (const gw of data.identities) {
		let quality = score(gw.usageIndex, -50, 100);


		if (data.currentCountry && data.currentCountry !== gw.country) {
			continue;
		}
		var selected = data.currentGw && data.currentGw.id === gw.id;
		identityList.addEntry(gw.id, gw.ip, quality, gw.attributes.premium, selected, gw);
	}
	jQ(".overlay-identities").find(".title.identities .count").text(identityList.length);


	scrollToElement(identityListWrapper, identityListWrapper.find('.current'));
}

function populateUi(data) {
	currentData = data;
	let main = jQuery("#anonymox-panel-main");
	let areaSettings = main.find(".main-settings .area-settings");
	let areaSettingsDesc = areaSettings.find(".desc");

	setSettingsState(data);
	setPremiumState(data);
	if (data.state !== "started") {
		jQuery("#anonymox-panel-main-proxy, #anonymox-panel-main-connection-overview").hide();
		return;
	}
	setActiveState(data);
	setProxyInfo(data);
	setConnectionInfo(data);
	populateCountryList(data);
	populateIdentitiesList(data);
}


var myPort = browser.runtime.connect({name: "port-from-popup"});


myPort.onMessage.addListener(handleMessage);




jQuery('#anonymox-panel-main').find("[data-i18n]").each(function(idx, val) {
	var el = $(val);
	var text = browser.i18n.getMessage(el.data("i18n"));
	el.text(text);
});

jQuery('#anonymox-panel-main').find("[data-i18n-title]").each(function(idx, val) {
	var el = $(val);
	var text = browser.i18n.getMessage(el.data("i18n-title"));
	el.attr("title", text);
});




var profileSettingsAction = function() {
	if (!currentData.internal) {
		myPort.postMessage({
			profileSettingsAction: {
				profileName: currentData.profileName,
				domain: currentData.domain
			}
		});
	}
};

var toggleActiveState = function() {
	myPort.postMessage({ toggleActiveForProfile: currentData.profileName });
};

var showIdentitiesList = function() {
	let identitiesOverlay = jQuery(".overlay-identities");
	identitiesOverlay.show();


	var countryContainer = jQuery(".overlay-identities").find(".column.countries");
	scrollToElement(countryContainer, countryContainer.find('.current'));
	var identitiesContainer = jQuery(".overlay-identities").find(".column.identities");
	scrollToElement(identitiesContainer, identitiesContainer.find('.current'));
};
var hideIdentitiesList = function() {
	let identitiesOverlay = jQuery(".overlay-identities");
	identitiesOverlay.hide();
};
var switchProxy = function() {
	myPort.postMessage({ switchProxy: currentData.profileName });
};
var toggleDetails = function() {
	let connOverview = jQuery(".main-connection-overview");
	connOverview.toggleClass("show-details");
};
var showPremiumInfo = function() {
	myPort.postMessage({ showPremiumInfoSrc : "premiumstatus" });
	window.close();
};
var showMoreCountries = function() {
	myPort.postMessage({ showPremiumInfoSrc : "morecountries" });
	window.close();
};
var showSupportPage = function() {
	myPort.postMessage({ showSupportPage : true });
	window.close();
};
var showSettings = function() {
	myPort.postMessage({ showSettings : true });
	window.close();
};

var countrySelected = function(ev) {
	var country = ev.delegateTarget.dataset.country;
	if (country == "premium-more") {
		showMoreCountries();
	} else {
		myPort.postMessage({ changeCountry: {
			profileName: currentData.profileName,
			country: country
		}});
	}
};

var identitySelected = function(ev) {
	var identity = ev.delegateTarget.dataset.gwid;
	myPort.postMessage({ changeIdentity: {
		profileName: currentData.profileName,
		identity: identity
	}});
};

function addHandler(elSelector, handler) {
	var el = jQuery(elSelector);
	el.click(handler).keypress((ev) => {
		if (ev.which === 13) {
			handler();
		}
	});
}


(function() {
	addHandler('.main-settings', profileSettingsAction);
	addHandler('#anonymox-active-toggle', toggleActiveState);
	addHandler('.area-proxy-info', showIdentitiesList);
	addHandler('.overlay-identities .close-button', hideIdentitiesList);
	addHandler('.area-proxy-switch', switchProxy);
	addHandler('.area-zoom-toggle', toggleDetails);
	addHandler('#anonymox-main-premium-status', showPremiumInfo);
	addHandler('.main-footer .area-help', showSupportPage);
	addHandler('.main-footer .area-settings', showSettings);
})();
