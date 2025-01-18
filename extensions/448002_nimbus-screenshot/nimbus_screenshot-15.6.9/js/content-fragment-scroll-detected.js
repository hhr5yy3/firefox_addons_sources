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

(function ($) {
    if (!window.captureFragmentScrollDetected) {
        window.captureFragmentScrollDetected = true;

        function isScrollableStyle(style) {
            return style && (style.getPropertyValue("overflow") == "scroll" || style.getPropertyValue("overflow") == "auto" ||
                style.getPropertyValue("overflow-y") == "scroll" || style.getPropertyValue("overflow-y") == "auto" ||
                style.getPropertyValue("overflow-x") == "scroll" || style.getPropertyValue("overflow-x") == "auto") &&
                style.getPropertyValue("display") != "none" && style.getPropertyValue("visibility") != "hidden";
        }

        function isElementHidden(elem) {
            let p = elem;

            while (p && p !== document) {
                let style = getComputedStyle(p, "");

                if (style.visibility === "hidden" || style.display === "none" || style.opacity === 0) return true;
                p = p.parentNode;
            }

            return false;
        }

        // if (isScrollableStyle(style) && !isElementHidden(elem)) {
        //     scrollableElements.push({e: elem, rect: getElementRect(elem, doc)});
        // }

        chrome.runtime.onMessage.addListener(function (request) {
            switch (request.operation) {
                case 'content_capture_fragment_scroll_search' :
                    let elems_scroll = [];

                    let search_scroll_elem = function (parent) {
                        const currents = parent.children;
                        for (let i = 0, len = currents.length; i < len; i++) {
                            let current = currents[i];
                            let children = current.children;
                            // const style = getComputedStyle(childrens[i], "");
                            // if (isScrollableStyle(style) && !isElementHidden(childrens[i])) {
                            // if (childrens[i].scrollHeight > childrens[i].clientHeight + 20 && /*(style.overflowY === 'scroll' || style.overflowY === 'auto') && */childrens[i].children.length) {
                            //     console.log(childrens[i], childrens[i].scrollHeight, childrens[i].clientHeight, style.overflowY);
                            //     elems_scroll.push(childrens[i])
                            // }

                            for (let i2 = 0, len2 = children.length; i2 < len2; i2++) {
                                if (!isElementHidden(current) && children[i2].clientHeight > current.clientHeight + 20 && current.clientHeight !== 0) {
                                    // console.log(children[i2].clientHeight, current.clientHeight, current)
                                    elems_scroll.push(current)
                                }
                            }

                            search_scroll_elem(current);
                        }
                    };

                    search_scroll_elem(document.body);

                    // console.log(elems_scroll)

                    if (elems_scroll.length) {
                        chrome.runtime.sendMessage({operation: 'content_capture_fragment_scroll_detected'});
                    }

                    break;
            }
        });
    }
})(jQuery);