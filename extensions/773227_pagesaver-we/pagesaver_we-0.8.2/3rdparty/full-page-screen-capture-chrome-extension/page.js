/* vim: set sw=4 sts=4 ts=4 et syntax=javascript: */

// Portions copyright (c) 2016-2022 Pearl Crescent, LLC.  All Rights Reserved.

if (!("CAPTURE_DELAY" in window)) {

var CAPTURE_DELAY = 150;

// Firefox fails to render text correctly below 16384 pixels.
// See https://bugzilla.mozilla.org/show_bug.cgi?id=1722934
const MAX_CAPTURE_HEIGHT = 15000;

function onMessage(data, sender, callback) {
    if (data.msg === 'scrollPage') {
        if (data.captureOptions && ("delay" in data.captureOptions)) {
            CAPTURE_DELAY = data.captureOptions.delay;
        }
        getPositions(data.tabID, data.isScrollRequired, data.captureOptions,
                     callback);
        return true;
    } else if (data.msg == 'logMessage') {
        console.log('[POPUP LOG]', data.data);
    } else {
        console.error('Unknown message received from background: ' + data.msg);
    }
}

if (!window.hasScreenCapturePage) {
    window.hasScreenCapturePage = true;
    chrome.runtime.onMessage.addListener(onMessage);
}

function max(nums) {
    return Math.max.apply(Math, nums.filter(function(x) { return x; }));
}

// Returns an object with width and height properties.
function getScrollbarSize()
{
    const tmpDiv = document.createElement("div");
    const styles = {
        width: "100px",
        height: "100px",
        overflow: "scroll",
        position: "absolute",
        top: "-200px",        // off screen
        margin: "0px",        // override page styles
        border: "0px",        // override page styles
    };

    for (const prop in styles)
        tmpDiv.style.setProperty(prop, styles[prop], "important");
    document.body.appendChild(tmpDiv);

    let rv = { width: tmpDiv.offsetWidth - tmpDiv.clientWidth,
               height: tmpDiv.offsetHeight - tmpDiv.clientHeight };

    document.body.removeChild(tmpDiv);
    return rv;
}

function getPositions(tabID, isScrollRequired, options, callback) {

    let isVisibleOnly = (options && ("visiblePage" == options.area));

    let body = document.body,
        originalBodyOverflowStyle,
        originalX = window.scrollX,
        originalY = window.scrollY,
        originalOverflowStyle;

    if (isScrollRequired)
        originalOverflowStyle = document.documentElement.style.overflow;

    // try to make pages with bad scrolling work, e.g., ones with
    // `body { overflow-y: scroll; }` can break `window.scrollTo`
    if (isScrollRequired && body) {
        originalBodyOverflowStyle = body.style.overflow;
        body.style.overflow = 'visible';
    }

    let fullWidth, fullHeight;

    let windowWidth = window.innerWidth,
        windowHeight = window.innerHeight,
        arrangements = [],
        numArrangements;

    if (isVisibleOnly) {
        fullWidth = windowWidth;
        fullHeight = windowHeight;

        // Omit scrollbars.
        let hasHorzSB = (window.scrollMaxX > 0);
        let hasVertSB = (window.scrollMaxY > 0);
        if (hasHorzSB || hasVertSB) {
            let sbSize = getScrollbarSize();
            if (hasHorzSB)
                fullHeight -= sbSize.height;
            if (hasVertSB)
                fullWidth -= sbSize.width;
        }

        arrangements.push({x: originalX, y: originalY,
                           width: fullWidth, height: fullHeight});
    } else {
        let widths = [
                document.documentElement.clientWidth,
                body ? body.scrollWidth : 0,
                document.documentElement.scrollWidth,
                body ? body.offsetWidth : 0,
                document.documentElement.offsetWidth
            ],
            heights = [
                document.documentElement.clientHeight,
                body ? body.scrollHeight : 0,
                document.documentElement.scrollHeight,
                body ? body.offsetHeight : 0,
                document.documentElement.offsetHeight
                // (Array.prototype.slice.call(document.getElementsByTagName('*'), 0)
                //  .reduce(function(val, elt) {
                //      var h = elt.offsetHeight; return h > val ? h : val;
                //  }, 0))
            ];

        fullWidth = max(widths);
        fullHeight = max(heights);

        // Disable all scrollbars. We'll restore the scrollbar state when we're done
        // taking the screenshots.
        if (isScrollRequired)
            document.documentElement.style.overflow = 'hidden';

        // pad the vertical scrolling to try to deal with
        // sticky headers, 200 is an arbitrary size
        const scrollPad = (isScrollRequired) ? 200 : 0;
        const maxWidth = (isScrollRequired) ? windowWidth : fullWidth;
        const maxHeight = (isScrollRequired) ? windowHeight
                          : Math.min(MAX_CAPTURE_HEIGHT, fullHeight);

        let yDelta = maxHeight - ((maxHeight > scrollPad) ? scrollPad : 0),
            xDelta = maxWidth,
            yPos = fullHeight - maxHeight;

        // During zooming, there can be weird off-by-1 types of things...
        if (fullWidth <= xDelta + 1) {
            fullWidth = xDelta;
        }

        while (yPos >= 0) {
            const h = Math.min(yDelta, fullHeight - yPos);
            let xPos = 0;
            while (xPos < fullWidth) {
                const w = Math.min(xDelta, fullWidth - xPos);
                arrangements.push({x: xPos, y: yPos, width: w, height: h});
                xPos += xDelta;
            }

            if (yPos === 0)
                break;

            yPos -= yDelta;
            if (yPos < 0)
                yPos = 0;
        }
        /** */
        console.log('xDelta', xDelta, 'yDelta', yDelta);
        /**/
    }

    /** */
    console.log('windowWidth', windowWidth, 'windowHeight', windowHeight);
    console.log('fullWidth', fullWidth, 'fullHeight', fullHeight);
    console.log('arrangements:');
    arrangements.forEach(aRect => console.log(aRect));
    /**/

    numArrangements = arrangements.length;

    function cleanUp() {
        if (isScrollRequired) {
            if (!isVisibleOnly)
                document.documentElement.style.overflow = originalOverflowStyle;
            if (body)
                body.style.overflow = originalBodyOverflowStyle;

            window.scrollTo(originalX, originalY);
        }
    }

    (function processArrangements() {
        if (!arrangements.length) {
            // Slightly delay cleanup to avoid rendering problems in Firefox.
            window.setTimeout(function() { cleanUp(); }, 0);
            if (callback) {
                // If it has not already been called, Firefox will call this
                // callback (which was passed as the last argument to
                // chrome.tabs.sendMessage('scrollPage, ...)) automatically
                // when the tab that contains this page is closed. Therefore,
                // to allow the code in api.js::initiateCapture() to detect
                // and ignore Firefox's automatic callbacks, we pass a
                // captureCompleted" message here.
                callback({ msg: 'captureComplete' });
            }
            return;
        }

        const r = arrangements.shift();
        if (isScrollRequired)
            window.scrollTo(r.x, r.y);

        let destX = 0, destY = 0; // isVisibleOnly
        if (!isVisibleOnly) {
            destX = (isScrollRequired) ? window.scrollX : r.x;
            destY = (isScrollRequired) ? window.scrollY : r.y;
        }
        const data = {
            msg: 'capture',
            tabID: tabID,
            destX: destX,
            destY: destY,
            destWidth: r.width,
            destHeight: r.height,
            complete: (numArrangements-arrangements.length)/numArrangements,
            windowWidth: windowWidth,
            totalWidth: fullWidth,
            totalHeight: fullHeight,
            devicePixelRatio: window.devicePixelRatio
        };
        if (isVisibleOnly) {
            data.scrollX = window.scrollX;
            data.scrollY = window.scrollY;
        }

        // console.log('>> DATA', JSON.stringify(data, null, 4));

        // Need to wait for things to settle
        window.setTimeout(function() {
            // In case the below callback never returns, cleanup
            var cleanUpTimeout = window.setTimeout(cleanUp, 1250);

            chrome.runtime.sendMessage(data, function(captured) {
                window.clearTimeout(cleanUpTimeout);

                if (captured) {
                    // Move on to capture next arrangement.
                    processArrangements();
                } else {
                    // If there's an error in popup.js, the response value can be
                    // undefined, so cleanup
                    cleanUp();
                }
            });

        }, CAPTURE_DELAY);
    })();
}
}

true;  // used to detect successful insertion of this page script
