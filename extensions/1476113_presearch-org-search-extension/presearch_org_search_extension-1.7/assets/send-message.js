setTimeout(() => {
    console.info("extension installed")
    window.postMessage({ "presearch_extension": true });
    if (window.localStorage) {
        const month = 60 * 60 * 24 * 30 * 1000;
        const future = Date.now() + month;
        window.localStorage.setItem("extension_last_shown", future);
    }
}, 300);