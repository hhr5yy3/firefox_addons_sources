vflscrsh.i18n = {};
vflscrsh.i18n.current_locale = '';
vflscrsh.i18n.default_locale = 'en';
vflscrsh.i18n.data_locale = null;

//------------------------------------------------------------------------------
vflscrsh.i18n.init = function(current_locale) {
	//------------------------------------------------------------------------
	if (! current_locale) {
		current_locale = vflscrsh.utils.prefs_get('current_locale');
	}
	if (! current_locale) {
		current_locale = window.navigator.language; // chrome.i18n.getMessage('@@ui_locale');
	}
	if (! current_locale) {
		current_locale = vflscrsh.i18n.default_locale;
	}
	//------------------------------------------------------------------------
	vflscrsh.i18n.data_locale = null;
	vflscrsh.i18n.current_locale = current_locale;

	//------------------------------------------------------------------------
	var url = '/locale/vflscrsh-' + current_locale + '.json';
	var req = new XMLHttpRequest();
	req.overrideMimeType("application/json");
	req.open("GET", chrome.extension.getURL(url), false);
	try{
		req.send(null);
	} catch(e) {
	}

	//------------------------------------------------------------------------
	if (req.responseText) {
		try {
			vflscrsh.i18n.data_locale = JSON.parse(req.responseText);
		} catch(e) {
		}
	}

	//------------------------------------------------------------------------
	if (vflscrsh.i18n.data_locale) {
		vflscrsh.utils.prefs_set('current_locale', current_locale);
		return true;
	} else if (current_locale != vflscrsh.i18n.default_locale) {
		if (/[\_\-]/.test(current_locale)) {
			current_locale = current_locale.replace(/[\_\-].*$/, '') || vflscrsh.i18n.default_locale;
		} else {
			current_locale = vflscrsh.i18n.default_locale;
		}
		return vflscrsh.i18n.init(current_locale);
	} else {
		return false;
	}
}
//------------------------------------------------------------------------------
vflscrsh.i18n.get_string = function(name, params) {
	if (! vflscrsh.i18n.data_locale) {
		if (vflscrsh.i18n.init(vflscrsh.i18n.current_locale)) {
			return vflscrsh.i18n.get_string(name, params);
		} else {
			return name;
		}
	}
	else if (vflscrsh.i18n.data_locale[name]) {
		var result = vflscrsh.i18n.data_locale[name];
		if (/\%S/.test(result) && params && (params.length == 1)) {
			result = result.replace(/\%S/, params[0]);
		}
		result = result.replace(/\\n/g, "\n");
//		result = result.replace(/\s*\"?\%S\"?\s*/g, " ");
		return result;
	}
	else {
		return name;
	}
}
//------------------------------------------------------------------------------
vflscrsh.i18n.parse_html = function(doc) {
	var el_list = doc.getElementsByTagName('*');
	for (var i=0; i<el_list.length; i++) {
		var el = el_list[i];
		//------------------------------------------------------------------
		if (el.i18n) {
			vflscrsh.utils.HTMLDOM_value(el, vflscrsh.i18n.parse_string(el.i18n));
		}
		//------------------------------------------------------------------
		else {
			var i18n_label = el.getAttribute('label');
			if (i18n_label) {
				el.removeAttribute('label');

				//-----------------------------------------------------
				if ((el.tagName == 'INPUT') && ((el.type == 'checkbox') || (el.type == 'radio'))) {
					var newLabel = doc.createElement("label");
					var newSpan = doc.createElement("span");
					newSpan.i18n = i18n_label;
					newLabel.appendChild(newSpan);
					el.parentNode.insertBefore(newLabel, el.nextSibling);
					vflscrsh.utils.HTMLDOM_value(newSpan, vflscrsh.i18n.parse_string(i18n_label));
					if (el.id) {
						newLabel.setAttribute('for', el.id);
					}
					el.parentNode.removeChild(el);
					newLabel.insertBefore(el, newLabel.firstChild);
					if (el.getAttribute('title')) {
						newLabel.setAttribute('title', vflscrsh.i18n.parse_string(el.getAttribute('title')));
					}
					continue;
				}
				//-----------------------------------------------------
				else if ((el.tagName == 'INPUT') && (el.type == 'button')) {
					el.i18n = i18n_label;
					el.setAttribute('value', vflscrsh.i18n.parse_string(i18n_label));
					continue;
				}
				//-----------------------------------------------------

				el.i18n = i18n_label;
				vflscrsh.utils.HTMLDOM_value(el, vflscrsh.i18n.parse_string(i18n_label));
			}
		}
		//------------------------------------------------------------------
		var i18n_title = el.getAttribute('title');
		if (i18n_title) {
			el.setAttribute('title', vflscrsh.i18n.parse_string(i18n_title));
		}
	}
}
//------------------------------------------------------------------------------
vflscrsh.i18n.parse_string = function(str) {
	var text_list = str.split(/\s+/);
	for (var i=0; i<text_list.length; i++) {
		text_list[i] = vflscrsh.i18n.get_string(text_list[i]);
	}
	return text_list.join("\n");
}
//------------------------------------------------------------------------------
