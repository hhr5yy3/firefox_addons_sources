const localStorageFunctions = () => {
	const ops = {
		saveToLocalStorage: (key, value) => {
			if (typeof value === 'object') value = JSON.stringify(value);
			localStorage.setItem(key, value);
		},
		getFromLocalStorage: key => {
			let item = localStorage.getItem(key);
			if (item === undefined || item === null) {
				return null;
			}
			//if (item === true) return true;
			//if (item === false) return false;
			if (item) item = JSON.parse(item);
			return item !== null && item !== undefined ? item : null;
		},
	};
	return ops;
};

const objKey = '38b83200376aedb56ed2b2734143263a';

