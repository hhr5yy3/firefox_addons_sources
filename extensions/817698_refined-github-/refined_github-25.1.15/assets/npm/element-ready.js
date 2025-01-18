import ManyKeysMap from './many-keys-map.js';
import pDefer from './p-defer.js';

const cache = new ManyKeysMap();
const isDomReady = target =>
	['interactive', 'complete'].includes((target.ownerDocument ?? target).readyState);
function elementReady(selector, {
	target = document,
	stopOnDomReady = true,
	waitForChildren = true,
	timeout = Number.POSITIVE_INFINITY,
	predicate,
} = {}) {
	const cacheKeys = [selector, stopOnDomReady, timeout, waitForChildren, target];
	const cachedPromise = cache.get(cacheKeys);
	if (cachedPromise) {
		return cachedPromise;
	}
	let rafId;
	const deferred = pDefer();
	const {promise} = deferred;
	cache.set(cacheKeys, promise);
	const stop = element => {
		cancelAnimationFrame(rafId);
		cache.delete(cacheKeys, promise);
		deferred.resolve(element);
	};
	if (timeout !== Number.POSITIVE_INFINITY) {
		setTimeout(stop, timeout);
	}
	(function check() {
		const element = getMatchingElement({target, selector, predicate});
		if (isDomReady(target) && (stopOnDomReady || element)) {
			stop(element ?? undefined);
			return;
		}
		let current = element;
		while (current) {
			if (!waitForChildren || current.nextSibling) {
				stop(element);
				return;
			}
			current = current.parentElement;
		}
		rafId = requestAnimationFrame(check);
	})();
	return Object.assign(promise, {stop: () => stop()});
}
function getMatchingElement({target, selector, predicate} = {}) {
	if (predicate) {
		const elements = target.querySelectorAll(selector);
		return [...elements].find(element => predicate(element));
	}
	return target.querySelector(selector);
}

export { elementReady as default };
