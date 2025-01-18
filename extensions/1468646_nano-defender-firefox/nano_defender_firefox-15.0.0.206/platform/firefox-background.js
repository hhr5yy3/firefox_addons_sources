// ----------------------------------------------------------------------------------------------------------------- //

// Nano Defender - An anti-adblock defuser
// Copyright (C) 2016-2019  Nano Defender contributors
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

// ----------------------------------------------------------------------------------------------------------------- //

// Special background script for Firefox

// ----------------------------------------------------------------------------------------------------------------- //

"use strict";

// ----------------------------------------------------------------------------------------------------------------- //

a.dynamicServer(
    [
        "*://*.tvregionalna24.pl/*",
    ],
    [
        "main_frame",
    ],
    (details) => {
        let payload = "";
        let raw = [];
        const filter = browser.webRequest.filterResponseData(details.requestId);
        const decoder = new TextDecoder("utf-8");
        const encoder = new TextEncoder();
        filter.ondata = (e) => {
            raw.push(e.data);
        };
        filter.onstop = () => {
            payload += decoder.decode(raw[0], { stream: true });
            if (payload[0] == '\u0000') {
                // Resource is from cache, just let it pass.
                for (let i = 0; i < raw.length; ++i) {
                    filter.write(raw[i]);
                }
                filter.disconnect();
                if (a.allowConsole) {
                    console.error("[Nano] Patch failed:: Resource loaded from cache");
                }
                return;
            }

            for (let i = 1; i < raw.length; ++i) {
                payload += decoder.decode(raw[i], { stream: true });
            }
            const matcher = /var _ended=(.*?);var _skipButton/g;
            let skipFuncs = [];
            let tmp;
            while((tmp = matcher.exec(payload)) !== null) {
                skipFuncs.push(`(${tmp[1].replace("player.dispose();", "")})();`);
            }
            if (skipFuncs.length > 0) {
                const re = /<body>([\s\S]*)<\/body>/g;
                let body = re.exec(payload)[1];
                const injection = `
                <script>
                "use strict";
                window.addEventListener("load", function replace() {
                    if (window.document.getElementsByClassName("vjs-poster").length > 0) {
                        ${skipFuncs.join('')}
                    } else {
                        window.setTimeout(replace, 1000);
                    }
                });
                </script>`;
                payload = payload.replace(body, body+injection);
            }
            if (a.allowConsole) {
                console.log("[Nano] Firefox Stream Filter Triggered");
            }
            filter.write(encoder.encode(payload));
            filter.disconnect();
        };
    },
    [
        "tvregionalna24.pl",
    ],
    true,
);


// ----------------------------------------------------------------------------------------------------------------- //

