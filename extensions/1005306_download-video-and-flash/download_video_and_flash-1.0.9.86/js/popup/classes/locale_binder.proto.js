var LocaleBinder = function() {};

LocaleBinder.prototype = new function() {
	var DATA_ATTRIBUTE_LOCALE = "data-locale";
	var DATA_ATTRIBUTE_LOCALE_INNER_HTML = "data-locale-inner";

	this.init = function() {};

	this.getAllElementsWithDataAttribute = function() {
		return document.querySelectorAll("[" + DATA_ATTRIBUTE_LOCALE + "]");
	};

	this.bind = function() {
		try {
			var elements = this.getAllElementsWithDataAttribute();

			for (var i = 0; i < elements.length; i++) {
				var element = elements[i];

				if (this.hasLocaleForInnerHtml(element)) {
					this.setLocaleForInnerHtml(element);
				}

				this.setLocalesForAttributes(element);
			}
		} catch(ex) {
			error(ex);
		}
	};

	this.getLocaleValueForInnerHtml = function(element) {
		if (element.hasAttribute(DATA_ATTRIBUTE_LOCALE_INNER_HTML)) {
			localeValue = element.getAttribute(DATA_ATTRIBUTE_LOCALE_INNER_HTML);
			localeValue = localeValue.trim();

			if (!localeValue) {
				return null;
			}

			return browser.i18n.getMessage(localeValue);
		}
		return null;
	};

	this.hasLocaleForInnerHtml = function(element) {
		return element.hasAttribute(DATA_ATTRIBUTE_LOCALE_INNER_HTML);
	};

	this.setLocaleForInnerHtml = function(element) {
		var innerHtmlLocaleValue = this.getLocaleValueForInnerHtml(element);
		if (innerHtmlLocaleValue) {
			this.setTextNode(element, innerHtmlLocaleValue);
		}
	};

	this.setTextNode = function(element, text) {
		for (let node of element.childNodes) {
			if (node.nodeType === 3) {
				node.nodeValue = text;

				return;
			}
		}
	};

	this.setLocalesForAttributes = function(element) {
		// log(element.dataset);
		// localeKey = "data-locale-tooltip" - for example
		for (var localeKey in element.dataset) {
			var localeValue = element.dataset[localeKey];
			var targetAttributeName = this.extractTargetAttributeName(localeKey);
			if (targetAttributeName && element.hasAttribute(targetAttributeName)) {
				element.setAttribute(targetAttributeName, browser.i18n.getMessage(localeValue));
			}
			// log(element.dataset[key]);
		}
	};

	this.extractTargetAttributeName = function(localeKey) {
		return localeKey.split("locale")[1].toLowerCase();
	};
};