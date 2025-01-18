import createHtmlElement from './create-html-element.js';

const urlRegex = () => (/((?<!\+)https?:\/\/(?:www\.)?(?:[-\p{Letter}.]+?[.@][a-zA-Z\d]{2,}|localhost)(?:[-\w\p{Letter}.:%+~#*$!?&/=@]*?(?:,(?!\s))*?)*)/gu);
const parseValue = (value, href) => {
	switch (typeof value) {
		case 'function': {
			return {html: value(href)};
		}
		case 'undefined': {
			return {text: href};
		}
		default: {
			return {html: value};
		}
	}
};
function linkify(href, options = {}) {
	const punctuation = /[.?]$/.exec(href)?.[0] ?? '';
	if (punctuation) {
		href = href.slice(0, -1);
	}
	return createHtmlElement({
		name: 'a',
		attributes: {
			href,
			...options.attributes,
			href,
		},
		...parseValue(options.value, href),
	}) + punctuation;
}
const domify = html => document.createRange().createContextualFragment(html);
const isTruncated = (url, peek) =>
	url.endsWith('...')
	|| peek.startsWith('…');
function linkifyUrlsToDom(string, options) {
	const fragment = document.createDocumentFragment();
	const parts = string.split(urlRegex());
	for (const [index, text] of parts.entries()) {
		if (index % 2 && !isTruncated(text, parts[index + 1])) {
			fragment.append(domify(linkify(text, options)));
		} else if (text.length > 0) {
			fragment.append(text);
		}
	}
	return fragment;
}

export { linkifyUrlsToDom };
