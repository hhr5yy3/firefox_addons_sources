import issueRegex from './issue-regex.js';
import createHtmlElement from './create-html-element.js';

function prepareRegexForSplit(regex) {
	return new RegExp(`(${regex.source})`, 'g');
}
function countRegexGroups(regex) {
	return new RegExp(regex.source + '|').exec('').length;
}
function applyDefaults(options) {
	if (!(options?.user && options?.repository)) {
		throw new Error('Missing required `user` and `repository` options');
	}
	return {
		baseUrl: 'https://github.com',
		additionalPrefix: 'GH-',
		...options,
	};
}
const linkify = (reference, groups, options) => {
	const {
		organization = options.user,
		repository = options.repository,
		issueNumber,
	} = groups;
	const href = `${options.baseUrl}/${organization}/${repository}/issues/${issueNumber}`;
	return createHtmlElement({
		name: 'a',
		attributes: {
			href: '',
			...options.attributes,
			href,
		},
		text: reference,
	});
};
const domify = html => document.createRange().createContextualFragment(html);
function linkifyIssuesToDom(string, options) {
	options = applyDefaults(options);
	const regex = prepareRegexForSplit(issueRegex(options));
	const parts = string.split(regex);
	const groupsCount = countRegexGroups(regex);
	const fragment = document.createDocumentFragment();
	for (let index = 0; index < parts.length - 1; index += groupsCount) {
		fragment.append(parts[index]);
		const reference = parts[index + 1];
		const groups = {
			organization: parts[index + 2],
			repository: parts[index + 3],
			issueNumber: parts[index + 4],
		};
		fragment.append(domify(linkify(reference, groups, options)));
	}
	fragment.append(parts.at(-1));
	return fragment;
}

export { linkifyIssuesToDom };
