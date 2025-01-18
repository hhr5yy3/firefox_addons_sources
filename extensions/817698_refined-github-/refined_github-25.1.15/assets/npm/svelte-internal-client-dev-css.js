var all_styles = new Map();
function register_style(hash, style) {
	var styles = all_styles.get(hash);
	if (!styles) {
		styles = new Set();
		all_styles.set(hash, styles);
	}
	styles.add(style);
}

export { register_style };
