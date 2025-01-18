class VideoParamsList {
	constructor(list = []) {
		this.list = list;
	}

	get List() {
		return this.list;
	}

	get Length() {
		return this.list.length;
	}

	push(videoParams) {
		this.List.push(videoParams);
	}

	sortByVideoParamsProperty(prop) {
		this.List.sort(function(a, b) {
			if (parseInt(a[prop]) < parseInt(b[prop])) { return -1; }
			else if (parseInt(a[prop]) > parseInt(b[prop])) { return 1; }
			else { return 0; }
		});
	}

	decodeUrls() {
		for (let videoParams of this.List) {
			videoParams.url = decodeURIComponent(videoParams.url);
		}
	}

	logUrls() {
		for (let videoParams of this.List) {
			log(decodeURIComponent(videoParams.url));
		}
	}

	setListPropertyByIndex(index, propName, value) {
		if (!this.list[index] || !this.list[index][propName]) {
			return false;
		}

		this.list[index][propName] = value;

		return true;
	}

	setListPropertyForAllItems(propName, value) {
		try {
			for (let index in this.list) {
				let successful = this.setListPropertyByIndex(index, propName, value);

				if (!successful) {
					throw new Error("VideoParamsList.setListPropertyForAllItems: failed - possibly missing 'propName'");
				}
			}
		} catch(ex) {
			error(ex);
		}
	}
}