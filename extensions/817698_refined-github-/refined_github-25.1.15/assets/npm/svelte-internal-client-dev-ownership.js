import './svelte-internal-client-runtime.js';
import './esm-env-dev-fallback.js';
import { ownership_invalid_mutation } from './svelte-internal-client-warnings.js';
import { FILENAME } from './svelte-constants.js';

const boundaries = {};
const chrome_pattern = /at (?:.+ \()?(.+):(\d+):(\d+)\)?$/;
const firefox_pattern = /@(.+):(\d+):(\d+)$/;
function get_stack() {
	const stack = new Error().stack;
	if (!stack) return null;
	const entries = [];
	for (const line of stack.split('\n')) {
		let match = chrome_pattern.exec(line) ?? firefox_pattern.exec(line);
		if (match) {
			entries.push({
				file: match[1],
				line: +match[2],
				column: +match[3]
			});
		}
	}
	return entries;
}
function get_component() {
	const stack = get_stack()?.slice(4);
	if (!stack) return null;
	for (let i = 0; i < stack.length; i++) {
		const entry = stack[i];
		const modules = boundaries[entry.file];
		if (!modules) {
			if (i === 0) return null;
			continue;
		}
		for (const module of modules) {
			if (module.end == null) {
				return null;
			}
			if (module.start.line < entry.line && module.end.line > entry.line) {
				return module.component;
			}
		}
	}
	return null;
}
function widen_ownership(from, to) {
	if (to.owners === null) {
		return;
	}
	while (from) {
		if (from.owners === null) {
			to.owners = null;
			break;
		}
		for (const owner of from.owners) {
			to.owners.add(owner);
		}
		from = from.parent;
	}
}
function has_owner(metadata, component) {
	if (metadata.owners === null) {
		return true;
	}
	return (
		metadata.owners.has(component) ||
		(metadata.parent !== null && has_owner(metadata.parent, component))
	);
}
function get_owner(metadata) {
	return (
		metadata?.owners?.values().next().value ??
		get_owner( (metadata.parent))
	);
}
function check_ownership(metadata) {
	const component = get_component();
	if (component && !has_owner(metadata, component)) {
		let original = get_owner(metadata);
		if (original[FILENAME] !== component[FILENAME]) {
			ownership_invalid_mutation(component[FILENAME], original[FILENAME]);
		} else {
			ownership_invalid_mutation();
		}
	}
}

export { check_ownership, get_component, widen_ownership };
