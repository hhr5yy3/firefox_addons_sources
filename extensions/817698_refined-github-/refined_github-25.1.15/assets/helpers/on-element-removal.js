import memoize from '../npm/memoize.js';

const onElementRemoval = memoize(async (element, signal) => {
	if (signal?.aborted) {
		return;
	}

	return new Promise(resolve => {
		const observer = new ResizeObserver(([{target}], observer) => {
			if (!target.isConnected) {
				observer.disconnect();
				resolve();
			}
		});

		if (signal) {
			signal.addEventListener('abort', () => {
				observer.disconnect();
				resolve();
			}, {
				once: true,
			});
		}

		observer.observe(element);
	});
});

export { onElementRemoval as default };
