class DOMElement {
	constructor(elementId) {
		this.elementId = elementId;
		this.element = this.getElement();
	}

	get Element() { return this.element; }

	getElement() {
		try {
			let element = document.getElementById(this.elementId) || null;

			if (!element) {
				throw new Error("DOMElement.getElement: 'element' is null");
			}

			return element;
		} catch(ex) {
			error(ex);
			return null;
		}
	}
}

var ClipboardCopier = (function() {
	const ELEMENT_ID = "copyClipboardInput";

	class ClipboardCopier extends DOMElement {
		constructor() {
			super(ELEMENT_ID);
		}

		copy(text) {
			this.Element.value = text;
			this.Element.select();
			document.execCommand("copy");
		}
	}

	return ClipboardCopier;
})();

var ThemeLoader = (function() {
	const ELEMENT_ID = "wrapper";
	const THEME_TYPES = {
		LIGHT: "light",
		DARK: "dark"
	}

	class ThemeLoader extends DOMElement {
		constructor() {
			super(ELEMENT_ID);
		}

		async loadTheme() {
			try {
				let theme = await UserPrefs.getPref(PREFS.KEYS.GENERAL.THEME);

				if (!this.isThemeValid(theme)) {
					throw new Error(`ThemeLoader.loadTheme: '${theme}' theme is not valid`);
				}

				this.Element.className = theme;				
			} catch(ex) {
				error(ex);
			}
		}

		isThemeValid(theme) {
			for (let i in THEME_TYPES){
				let themeType = THEME_TYPES[i];

				if (themeType === theme) {
					return true;
				}
			}

			return false;
		}
	}

	return ThemeLoader;
})();