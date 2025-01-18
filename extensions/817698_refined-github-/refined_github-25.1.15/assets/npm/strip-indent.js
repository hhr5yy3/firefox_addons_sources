import minIndent from '../_virtual/index4.js';

function stripIndent(string) {
	const indent = minIndent(string);
	if (indent === 0) {
		return string;
	}
	const regex = new RegExp(`^[ \\t]{${indent}}`, 'gm');
	return string.replace(regex, '');
}

export { stripIndent as default };
