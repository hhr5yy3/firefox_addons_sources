var minIndent;
var hasRequiredMinIndent;
function requireMinIndent () {
	if (hasRequiredMinIndent) return minIndent;
	hasRequiredMinIndent = 1;
	minIndent = string => {
		const match = string.match(/^[ \t]*(?=\S)/gm);
		if (!match) {
			return 0;
		}
		return match.reduce((r, a) => Math.min(r, a.length), Infinity);
	};
	return minIndent;
}

export { requireMinIndent as __require };
