/* @license
 * Copyright © 2023 Connor Talbot, Ad Speedup , hello@hackhive.io . All rights reserved.
 */
!(function () {
    function t(t) {
        const e = t.querySelector(".ytp-ad-skip-button-modern.ytp-button");
        e && e.click();
    }
    function e(t, e) {
        const n = t.querySelector("video");
        n && e && ((n.playbackRate = 16), (n.muted = !0));
    }
    function n(n, s) {
        for (const s of n) {
            if ("attributes" === s.type && "class" === s.attributeName) {
                const t = s.target,
                    n = t.classList.contains("ad-showing") || t.classList.contains("ad-interrupting");
                e(t, n);
            }
            "childList" === s.type && s.addedNodes.length && t(s.target);
        }
    }
    !(function s() {
        const player = document.querySelector("#movie_player");
        if (player) {
            new MutationObserver(n).observe(player, { attributes: !0, childList: !0, subtree: !0 });
            const s = player.classList.contains("ad-showing") || player.classList.contains("ad-interrupting");
            e(player, s), t(player);
        } else setTimeout(s, 50);
    })();
})();
