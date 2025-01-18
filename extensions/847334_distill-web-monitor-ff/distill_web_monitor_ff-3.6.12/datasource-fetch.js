async function fetchWithTimeout(uri, options = {}) {
  try {
    options = options || {};
    const { timeout = 5000 } = options;
    const controller = new AbortController();
    const signal = controller.signal;
    options.signal = signal;

    const timeoutId = setTimeout(() => {
      controller.abort(); // Abort the fetch request
    }, timeout);
    const res = await fetch(uri, options);
    clearTimeout(timeoutId);
    return res;
  } catch (e) {
    if (e instanceof DOMException) {
      e = new Error('TIMEOUT');
    }
    throw e;
  }
}

datasources.registerFetch({
  fetch: {
    useWrapper: true,
    fetch: ({ uri, fetchOpts }) => fetchWithTimeout(uri, fetchOpts)
  }
});
