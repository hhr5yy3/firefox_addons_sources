function isCurrentPathname(path) {
    if (!path) {
        return false;
    }
    try {
        const { pathname } = new URL(path, location.origin);
        return pathname === location.pathname;
    }
    catch {
        return false;
    }
}
function getManifest(_version) {
    return globalThis.chrome?.runtime?.getManifest?.();
}
function once(function_) {
    let result;
    return () => {
        if (result === undefined) {
            result = function_();
        }
        return result;
    };
}
const isWebPage = once(() => ['about:', 'http:', 'https:'].includes(location.protocol));
const isExtensionContext = once(() => typeof globalThis.chrome?.runtime?.id === 'string');
const isContentScript = once(() => isExtensionContext() && isWebPage());
const isBackground = () => isBackgroundPage() || isBackgroundWorker();
const isBackgroundPage = once(() => {
    const manifest = getManifest();
    if (!manifest) {
        return false;
    }
    if (isCurrentPathname(manifest.background_page ?? manifest.background?.page)) {
        return true;
    }
    return Boolean(manifest.background?.scripts
        && isCurrentPathname('/_generated_background_page.html'));
});
const isBackgroundWorker = once(() => isCurrentPathname(getManifest()?.background?.service_worker));
const isPersistentBackgroundPage = once(() => isBackgroundPage()
    && getManifest()?.manifest_version === 2
    && getManifest()?.background?.persistent !== false);
const isFirefox = () => globalThis.navigator?.userAgent.includes('Firefox');
const isChrome = () => globalThis.navigator?.userAgent.includes('Chrome');
const isSafari = () => !isChrome() && globalThis.navigator?.userAgent.includes('Safari');

export { isBackground, isBackgroundPage, isBackgroundWorker, isChrome, isContentScript, isExtensionContext, isFirefox, isPersistentBackgroundPage, isSafari, isWebPage };
