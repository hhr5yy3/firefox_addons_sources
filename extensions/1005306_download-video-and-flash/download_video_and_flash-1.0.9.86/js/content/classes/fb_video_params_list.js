class FacebookVideoParamsList extends VideoParamsList {
	constructor(list) {
		super(list);
	}

	sort() {
		this.sortByVideoParamsProperty("quality");
	}
}