import { expectElement, $ } from '../npm/select-dom.js';
import { setFetch } from '../npm/push-form.js';

// `content.fetch` is Firefox’s way to make fetches from the page instead of from a different context
// This will set the correct `origin` header without having to use XMLHttpRequest
// https://stackoverflow.com/questions/47356375/firefox-fetch-api-how-to-omit-the-origin-header-in-the-request
// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts#XHR_and_Fetch
if (globalThis.content?.fetch) {
	setFetch(globalThis.content.fetch);
}

/**
 * Append to an element, but before a element that might not exist.
 * @param  parent  Element (or its selector) to which append the `child`
 * @param  before  Selector of the element that `child` should be inserted before
 * @param  child   Element to append
 * @example
 *
 * <parent>
 *   <yes/>
 *   <oui/>
 *   <nope/>
 * </parent>
 *
 * appendBefore('parent', 'nope', <sì/>);
 *
 * <parent>
 *   <yes/>
 *   <oui/>
 *   <sì/>
 *   <nope/>
 * </parent>
 */
const appendBefore = (parent, before, child) => {
	if (typeof parent === 'string') {
		parent = expectElement(parent);
	}

	// Select direct children only
	const beforeElement = $(`:scope > :is(${before})`, parent);
	if (beforeElement) {
		beforeElement.before(child);
	} else {
		parent.append(child);
	}
};

const wrap = (target, wrapper) => {
	target.before(wrapper);
	wrapper.append(target);
};

const wrapAll = (wrapper, ...targets) => {
	const [first, ...rest] = targets;
	first.before(wrapper);
	wrapper.append(first, ...rest);
	return wrapper;
};

const isEditable = (node) => node instanceof HTMLTextAreaElement
	|| node instanceof HTMLInputElement
	|| (node instanceof HTMLElement && node.isContentEditable);

const frame = async () => new Promise(resolve => {
	requestAnimationFrame(resolve);
});

const highlightTab = (tabElement) => {
	tabElement.classList.add('selected');
	tabElement.setAttribute('aria-current', 'page');
};

const unhighlightTab = (tabElement) => {
	tabElement.classList.remove('selected');
	tabElement.removeAttribute('aria-current');
};

const matchString = (matcher, string) =>
	typeof matcher === 'string' ? matcher === string : matcher.test(string);

const escapeMatcher = (matcher) =>
	typeof matcher === 'string' ? `"${matcher}"` : String(matcher);

const isTextNode = (node) =>
	node instanceof Text || ([...node.childNodes].every(childNode => childNode instanceof Text));

const isTextNodeContaining = (node, expectation) => {
	// Make sure only text is being considered, not links, icons, etc
	if (!node || !isTextNode(node)) {
		console.warn('Expected Text node', node);
		throw new TypeError(`Expected Text node, received ${String(node?.nodeName)}`);
	}

	// The string/regex may expect spaces, like for `conventional-commits`
	return matchString(expectation, node.textContent) || matchString(expectation, node.textContent.trim());
};

const assertNodeContent = (node, expectation) => {
	if (isTextNodeContaining(node, expectation)) {
		return node;
	}

	console.warn('Expected node:', node.parentElement);
	const content = node.textContent.trim();
	throw new Error(`Expected node matching ${escapeMatcher(expectation)}, found ${escapeMatcher(content)}`);
};

const removeTextNodeContaining = (node, expectation) => {
	assertNodeContent(node, expectation);
	node.remove();
};

function removeTextInTextNode(node, text) {
	assertNodeContent(node, text);
	node.textContent = node.textContent.replace(text, '');
}

export { appendBefore, assertNodeContent, frame, highlightTab, isEditable, isTextNodeContaining, removeTextInTextNode, removeTextNodeContaining, unhighlightTab, wrap, wrapAll };
