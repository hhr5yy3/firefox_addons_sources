import stringifyAttributes from './stringify-attributes.js';
import htmlTags from '../_virtual/void.js';
import { htmlEscape } from './escape-goat.js';

const voidHtmlTags = new Set(htmlTags);
function createHtmlElement(
	{
		name = 'div',
		attributes = {},
		html = '',
		text,
	} = {},
) {
	if (html && text) {
		throw new Error('The `html` and `text` options are mutually exclusive');
	}
	const content = text ? htmlEscape(text) : html;
	let result = `<${name}${stringifyAttributes(attributes)}>`;
	if (!voidHtmlTags.has(name)) {
		result += `${content}</${name}>`;
	}
	return result;
}

export { createHtmlElement as default };
