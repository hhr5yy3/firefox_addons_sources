function equals(value) {
	return value === this.v;
}
function safe_not_equal(a, b) {
	return a != a
		? b == b
		: a !== b || (a !== null && typeof a === 'object') || typeof a === 'function';
}
function safe_equals(value) {
	return !safe_not_equal(value, this.v);
}

export { equals, safe_equals, safe_not_equal };
