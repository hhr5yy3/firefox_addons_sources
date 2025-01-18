var UserPrefs = (function() {
	const USER_PREFS = "userPrefs";

	class UserPrefs {
		static async constructor() {
			browser.storage.onChanged.addListener(UserPrefs.storageChangedListener);
			await UserPrefs.initStorage();

			return UserPrefs.setCachedPrefs();
		}

		static clear() {
			return UserPrefs.setStorage();
		}

		static delete() {
			return browser.storage.local.remove(USER_PREFS);
		}

		static async initStorage() {
			await UserPrefs.getStorage();	// will create one if doesn't exist

			if (await UserPrefs.isDefaultSettingsSet()) { 
				let newAddedPrefs = await UserPrefs.findNewAddedPrefs();

				if (newAddedPrefs.length > 0) {
					log(26);
					UserPrefs.setDefaultValues(newAddedPrefs);
				}
				log(29);
				return;
			}

			log(33);

			UserPrefs.setDefaultValues();
		}

		static async getStorage() {
			let storage = await browser.storage.local.get(USER_PREFS);
			let prefs = storage[USER_PREFS];

			if (!prefs) {
				return UserPrefs.setStorage();
			} else {
				return prefs;
			}
		}

		static async getPref(key) {
			let prefs = await UserPrefs.getStorage();

			return prefs[key] !== undefined ? prefs[key] : null;
		}

		static async setPref(key, value) {
			let prefs = await UserPrefs.getStorage();

			prefs[key] = value;

			return UserPrefs.setStorage(prefs);
		}

		static async setStorage(prefs = {}) {
			let values = {};
			values[USER_PREFS] = prefs;

			await browser.storage.local.set(values);
			
			return UserPrefs.getStorage();
		}

		static async isEmpty() {
			try {
				let prefs = await UserPrefs.getStorage();

				return Object.keys(prefs).length === 0;
			} catch(ex) {
				return true;
			}
		}

		static async isDefaultSettingsSet() {
			let prefs = await UserPrefs.getStorage();

			return !!prefs[PREFS.KEYS.OTHER.DEFAULT_VALUES_SET];
		}

		static async setDefaultValues(
			defaultValueKeysArray = Object.keys(PREFS.DEFAULT_VALUES)
		) {
			let prefs = await UserPrefs.getStorage();

			for (let key of defaultValueKeysArray) {
				let value = PREFS.DEFAULT_VALUES[key];

				if (value === undefined) { continue; }

				await UserPrefs.setPref(key, value);
			}

			return UserPrefs.getStorage();
		}

		static async setCachedPrefs() {
			let storage = await UserPrefs.getStorage();
			
			UserPrefs.CACHE = new UserPrefsCache(storage);

			return UserPrefs.CACHE;
		}

		static async findNewAddedPrefs() {
			const IGNORE_KEYS = [PREFS.KEYS.XUL_PREFS];

			let prefKeysArray = UserPrefs.getAllPrefKeys();	// from the PREFS object
			let storageKeysArray = await UserPrefs.getStorage().then(Object.keys);	// from the storage itself - what's currently in the storage
			let difference = Utils.getArraysDifference(prefKeysArray, storageKeysArray);

			return Utils.getArraysDifference(difference, IGNORE_KEYS); // filter again to remove ignored keys
		}

		static getAllPrefKeys() {
			function addStringValue(obj) {
				if (typeof obj === "object") {
					for (let key in obj) {
						let value = obj[key];
						addStringValue(value);
					}
				} else {	// otherwise a "string"
					allPrefs.push(obj);
				}
			}

			let keysObject = PREFS.KEYS;
			let allPrefs = [];

			addStringValue(keysObject);

			return allPrefs;
		}

		static storageChangedListener(changes, area) {
			UserPrefs.setCachedPrefs();
		}
	}

	UserPrefs.constructor();

	UserPrefs.CACHE = null;

	return UserPrefs;
})();


function UserPrefsCache(storage) {
	for (let key in storage) {
		let value = storage[key];
		this[key] = value;
	}
};

Object.defineProperty(UserPrefsCache.prototype, "getPref", {
	enumerable: false,
		value: function(key) {
			return this[key] !== undefined ? this[key] : null;
		}
	}
);