var tn;
(function (tn) {
    var app;
    (function (app) {
        var Popup = (function () {
            function Popup(browserApi) {
                this.processMessage = function (message, tab) {
                    var _this = this;
                    if (message.type === "modelFound") {
                        $.ajax({
                            url: message.data.responseUrl, success: function (response) {
                                $("#container").append($('<div class="popup">'));
                                $("#container > .popup").append(response);
                                setTimeout(function () {
                                    var wrapper = $("#container > .popup > div > div > div");
                                    var height = wrapper.height() || '335px';
                                    var width = wrapper.width() || '500px';
                                    $("body").animate({ "height": height }, 500);
                                    $("body").animate({ "width": width }, 200);
                                    $("html").animate({ "height": height }, 500, "swing", function () {
                                        $("div#loading").css("display", "none");
                                        $("div#container").css("visibility", "visible");
                                    });
                                }, 500);
                            }
                        });
                    }
                    if (message.type === "modelNotFound") {
                        $("div#loading").css("display", "none");
                        $("div#notFound").css("display", "block");
                    }
                    if (message.type === "pongInspector") {
                        this._tabs.getSelected(function (_tab) {
                            if (_tab.id === tab.id) {
                                _this._found = true;
                                _this._apiUtils.sendMessage({
                                    type: "popupClicked",
                                    tab: _tab
                                });
                            }
                        });
                    }
                };
                this._tabs = browserApi.tabs;
                this._found = false;
                this._apiUtils = browserApi.utils;
                this._setTimeout = browserApi._setTimeout;
            }
            Popup.prototype.run = function () {
                var _this = this;
                this._tabs.onExtensionMessage(this.processMessage.bind(this));
                this._tabs.getSelected(function (_tab) {
                    var msg = {
                        status: "pingInspector"
                    };
                    _this._tabs.sendMessageToTab(_tab, msg);
                    _this._setTimeout(function () {
                        if (!_this._found) {
                            $("div#loading").css("display", "none");
                            $("div#notPossible").css("display", "block");
                        }
                    }, 3000);
                });
            };
            return Popup;
        }());
        app.Popup = Popup;
    })(app = tn.app || (tn.app = {}));
})(tn || (tn = {}));
exports.tn = tn;
