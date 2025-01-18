"use strict";
(function () {
    const urlSet = new Set();
    return [
        ...document.querySelectorAll('img,audio,video,object,embed')
    ].map(v => {
        try {
            const src = 'currentSrc' in v && v.currentSrc ||
                'src' in v && v.src ||
                'data' in v && v.data || '';
            const result = {
                url: Object.assign(new URL(src), { hash: '' }).href,
                text: v.getAttribute('alt') || v.getAttribute('aria-label') ||
                    v.title || (v.textContent || '').trim() || undefined,
            };
            return result;
        }
        catch {
            return { url: undefined };
        }
    }).filter(v => {
        if (!v.url || urlSet.has(v.url))
            return false;
        urlSet.add(v.url);
        return true;
    });
})();
