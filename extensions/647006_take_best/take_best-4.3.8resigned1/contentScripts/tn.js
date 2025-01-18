var _this = this;
if (this.opera && typeof window !== "undefined" && window.top === window["self"]) {
    console.log("scripts injected for opera");
    window["addEventListener"]("DOMContentLoaded", function () {
        _this.opera.extension.postMessage({ action: "load" });
    }, false);
}
