/*
 * "This work is created by NimbusWeb and is copyrighted by NimbusWeb. (c) 2017 NimbusWeb.
 * You may not replicate, copy, distribute, or otherwise create derivative works of the copyrighted
 * material without prior written permission from NimbusWeb.
 *
 * Certain parts of this work contain code licensed under the MIT License.
 * https://www.webrtc-experiment.com/licence/ THE SOFTWARE IS PROVIDED "AS IS",
 * WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
 * THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * */

(function () {
    if (window.__nscContentScriptPage) return;
    window.__nscContentScriptPage = true;

    // window.thisEr = true;
    window.nsc_page = {
        data: {
            totalWidth: 0,
            totalHeight: 0
        }
    };

    let scroll = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        crop: false
    };
    let fragment = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        crop: false
    };

    let actionHideFixedElements = false;
    let fixedElements = [];
    let tik = null;
    let keys = {37: 1, 38: 1, 39: 1, 40: 1};

    let endCapture = function () {
        window.clearTimeout(tik);
        tik = null;
        // window.thisEr = false;

        beforeClearCapture();
        enableScroll();
        removeMackPage();
    };


    chrome.runtime.onMessage.addListener(function (request, sender, callback) {
        if (request.operation === 'content_scroll_page') {
            console.log('request', request)
            scroll.crop = request.scroll_crop;
            fragment.crop = request.fragment;
            actionHideFixedElements = request.hide_fixed_elements;

            if (scroll.crop === true) {
                scroll.x = request.x;
                scroll.y = request.y;
                scroll.width = request.width;
                scroll.height = request.height;
            }
            if (fragment.crop === true) {
                fragment.x = request.x;
                fragment.y = request.y;
                fragment.width = request.width;
                fragment.height = request.height;
            }
            getPositions(callback);
            return true;
        }
    });

    window.addEventListener('keydown', function (evt) {
        evt = evt || window.event;
        if (evt.keyCode === 27) {
            endCapture();
        }
    }, false);
    window.addEventListener('contextmenu', function (e) {
        endCapture();
        return true;
    }, false);

    function enableFixedPosition(enableFlag) {
        if (enableFlag) {
            let nodeIterator = document.createNodeIterator(document.documentElement, NodeFilter.SHOW_ELEMENT, null, false);
            let currentNode;
            while (currentNode = nodeIterator.nextNode()) {
                let position = document.defaultView.getComputedStyle(currentNode, "").getPropertyValue("position");
                if (position === "fixed" || position === "sticky") {
                    fixedElements.push({
                        element: currentNode,
                        cssText: currentNode.style.cssText
                    });
                    // currentNode.style.cssText = currentNode.style.cssText + "position:" + ("fixed" === position ? "absolute" : "relative") + " !important";
                    currentNode.style.cssText = currentNode.style.cssText + "opacity: 0; animation: unset; transition-duration: 0s;";


                }
            }
        } else {
            for (let index = 0, length = fixedElements.length; index < length; index++) {
                let item = fixedElements[index];
                item.element.style.cssText = item.cssText;
            }
            fixedElements = []
        }
    }

    function preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault)
            e.preventDefault();
        e.returnValue = false;
    }

    function preventDefaultForScrollKeys(e) {
        if (keys[e.keyCode]) {
            preventDefault(e);
            return false;
        }
    }

    function removeMackPage() {
        let node = document.getElementById('nimbus_screenshot_mack_page');
        if (node) node.parentElement.removeChild(node);
    }

    function disableScroll() {
        if (window.addEventListener) // older FF
            window.addEventListener('DOMMouseScroll', preventDefault, false);
        window.onwheel = preventDefault; // modern standard
        window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
        window.ontouchmove = preventDefault; // mobile
        document.onkeydown = preventDefaultForScrollKeys;
    }

    function enableScroll() {
        if (window.removeEventListener)
            window.removeEventListener('DOMMouseScroll', preventDefault, false);
        window.onmousewheel = document.onmousewheel = null;
        window.onwheel = null;
        window.ontouchmove = null;
        document.onkeydown = null;
    }

    function getPositions() {
        afterClearCapture();
        disableScroll();

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        let arrangements = [];
        let yPos = 0;
        let xPos = 0;

        function getSize() {
            const body = document.body;
            const html = document.documentElement;
            let totalWidth = [], totalHeight = [];

            if (html && html.clientWidth) totalWidth.push(html.clientWidth);
            // if (html && html.scrollWidth) totalWidth.push(html.scrollWidth);
            if (html && html.offsetWidth) totalWidth.push(html.offsetWidth);
            if (body && body.scrollWidth) totalWidth.push(body.scrollWidth);
            if (body && body.offsetWidth) totalWidth.push(body.offsetWidth);

            if (html && html.clientHeight) totalHeight.push(html.clientHeight);
            // if (html && html.scrollHeight) totalHeight.push(html.scrollHeight);
            if (html && html.offsetHeight) totalHeight.push(html.offsetHeight);
            if (body && body.scrollHeight) totalHeight.push(body.scrollHeight);
            if (body && body.offsetHeight) totalHeight.push(body.offsetHeight);

            // console.log(totalWidth, totalHeight);
            nsc_page.data.totalWidth = Math.max.apply(null, totalWidth);
            nsc_page.data.totalHeight = Math.max.apply(null, totalHeight);
        }

        getSize();

        if (scroll.crop) {
            window.scrollTo(0, scroll.y);
            nsc_page.data.totalWidth = scroll.width;
            nsc_page.data.totalHeight = scroll.height;
            yPos = scroll.y + scroll.height;
            while (yPos >= scroll.y) {
                yPos -= windowHeight;
                xPos = scroll.x;
                while (xPos < scroll.x + scroll.width) {
                    arrangements.push({
                        x: xPos,
                        x_crop: scroll.x,
                        x_shift: 0,
                        y: yPos >= scroll.y ? yPos : scroll.y,
                        y_crop: yPos - scroll.y < 0 ? 0 : yPos - scroll.y,
                        y_shift: window.pageYOffset >= scroll.y ? 0 : scroll.y - window.pageYOffset,
                        w: scroll.width,
                        h: scroll.height >= windowHeight ? windowHeight : scroll.height,
                        elem: null
                    });
                    xPos += windowWidth;
                }
            }
        } else if (fragment.crop) {
            let elem = null;
            if (window.captureFragment && window.captureFragment.data.elem) {
                elem = window.captureFragment.data.elem;
                window.captureFragment.data.elem = null;
            } else {
                elem = window.captureFragmentScroll.data.elem;
                window.captureFragmentScroll.data.elem = null;
            }

            console.log(elem, window.captureFragmentScroll);

            window.scrollTo(0, fragment.y);

            nsc_page.data.totalWidth = fragment.width;
            if (elem.scrollHeight > elem.clientHeight + 20 || location.host === 'mail.google.com') {
                if (actionEntirePageSctollDelay < 1000) actionEntirePageSctollDelay = 1000;
                // $(elem).click().mouseenter().focus();
                // document.elementFromPoint(fragment.x + 20, fragment.y + 20).click();
                elem.classList.add("nsc-capture-fragment-scroll-disable");

                nsc_page.data.totalHeight = elem.scrollHeight;
                for (let y = 0; y <= nsc_page.data.totalHeight; y += fragment.height) {
                    arrangements.push({
                        x: fragment.x,
                        x_crop: fragment.x,
                        x_shift: 0,
                        y: fragment.y,
                        y_crop: y,
                        y_shift: window.pageYOffset >= fragment.y ? 0 : fragment.y - window.pageYOffset,
                        w: fragment.width,
                        h: fragment.height,
                        elem: {
                            elem: elem,
                            x: 0, y: y
                        }
                    });
                }
            } else {
                nsc_page.data.totalHeight = fragment.height;

                yPos = fragment.y + fragment.height;
                while (yPos >= fragment.y) {
                    yPos -= windowHeight;
                    xPos = fragment.x;
                    while (xPos < fragment.x + fragment.width) {
                        arrangements.push({
                            x: xPos,
                            x_crop: fragment.x,
                            x_shift: 0,
                            y: yPos >= fragment.y ? yPos : fragment.y,
                            y_crop: yPos - fragment.y < 0 ? 0 : yPos - fragment.y,
                            y_shift: window.pageYOffset >= fragment.y ? 0 : fragment.y - window.pageYOffset,
                            w: fragment.width,
                            h: fragment.height >= windowHeight ? windowHeight : fragment.height,
                            elem: null
                        });
                        xPos += windowWidth;
                    }
                }
            }
        } else {
            window.scrollTo(0, 0);
            let elem_scroll;
            while (yPos < nsc_page.data.totalHeight) {
                xPos = 0;
                while (xPos < nsc_page.data.totalWidth) {
                    let shiftX = xPos > nsc_page.data.totalWidth - windowWidth ? xPos - (nsc_page.data.totalWidth - windowWidth) : 0;
                    arrangements.push({
                        x: xPos - shiftX,
                        y: yPos,
                        w: windowWidth,
                        h: elem_scroll ? (elem_scroll.y < (yPos > 0 ? yPos : 0) + windowHeight ? (yPos > 0 ? yPos : 0) - elem_scroll.y : windowHeight) : (nsc_page.data.totalHeight - yPos > windowHeight ? windowHeight : nsc_page.data.totalHeight - yPos),
                        elem: null
                    });
                    xPos += windowWidth;
                }
                yPos += windowHeight;
            }
        }

        let last_elem, last_elem_overflow;
        let count_parts = arrangements.length;
        console.log(Object.assign({}, arrangements));

        afterClearCapture();
        (function scrollTo() {
            if (!scroll.crop && !fragment.crop) getSize();
            let next = arrangements.shift();

            let data = {
                operation: 'content_capture',
                scroll_crop: scroll.crop,
                fragment: fragment.crop,
                x: next.x,
                y: next.y,
                x_crop: next.x_crop || 0,
                y_crop: next.y_crop || 0,
                x_shift: next.x_shift || 0,
                y_shift: next.y_shift || 0,
                w: next.w,
                h: next.h,
                totalWidth: nsc_page.data.totalWidth,
                totalHeight: nsc_page.data.totalHeight,
                windowWidth: windowWidth,
                windowHeight: windowHeight,
                z: window.nimbus_core.is_chrome ? window.devicePixelRatio : 1,
                count_parts: count_parts
            };

            console.log(next, data);

            if (next.elem) {
                next.elem.elem.scrollTo({
                    top: next.elem.y
                });

                console.log(next.elem.elem, next.elem.y)
                // next.elem.elem.classList.add("nsc-capture-fragment-scroll-disable");
            } else {
                window.scrollTo(next.x, next.y);
            }

            if (count_parts - 2 === arrangements.length) {
                enableFixedPosition(true);
            }

            window.setTimeout(function () {
                window.setTimeout(function () {
                    chrome.runtime.sendMessage(data, function () {
                        if (last_elem) {
                            last_elem.style.overflow = last_elem_overflow;
                            last_elem = last_elem_overflow = null;
                        }

                        if (!arrangements.length) {
                            if (next.elem) {
                                next.elem.elem.classList.remove("nsc-capture-fragment-scroll-disable");
                            }
                            endCapture();
                            if (scroll.crop !== true && scroll.fragment !== true) {
                                window.scrollTo(0, 0);
                                enableFixedPosition(false);
                            }
                        } else {
                            scrollTo()
                        }
                    });
                }, actionEntirePageSctollDelay);
            }, next.elem ? 1000 : 100);
        })();
    }
})();