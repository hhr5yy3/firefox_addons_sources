(function(els) {
	/**
	 * Convert a list of ``[[key, value], ...]`` pairs to an object
	 * ``{key: value, ...}``.
	 */
	function obj(items) {
		const obj = {}
		Array.from(items).forEach((item) => {
			obj[item[0]] = item[1];
		});
		return obj;
	}

	// Convert an Attr to a [name, value] pair
	const attrToPair = (attr) => [attr.name, attr.value];
	// Convert an element to an object of its attributes, {key: value, ...}.
	const elToDict = (el) => { return {
		tag: el.tagName.toLowerCase(),
		text: el.innerText,
		attrs: obj(Array.from(el.attributes).map(attrToPair)),
	}};
	// Convert an iterable of elements to a list of element attributes
	const elsToDicts = (els) => Array.from(els).map(elToDict);

	return elsToDicts(els);
})(document.querySelector('head').querySelectorAll('meta, title, link[rel=canonical]'));
