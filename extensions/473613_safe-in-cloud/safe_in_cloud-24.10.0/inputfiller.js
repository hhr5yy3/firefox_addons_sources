var InputFiller = (function createInputFiller() {
    D.func();

    const DATA_ID_ATTR = "data-safeincloud_id";

    function createKeyEvent(type) {
       return new KeyboardEvent(type, {bubbles: true, cancelable: true});
    }

    function createEvent(type) {
        return new Event(type, {bubbles: true, cancelable: true});
    }

    function fakeKeyEvent(input) {
        D.func();
        input.dispatchEvent(createKeyEvent("keydown"));
        input.dispatchEvent(createKeyEvent("keypress"));
        input.dispatchEvent(createKeyEvent("keyup"));
    }

    function fillTextById(inputId, value) {
        D.func();
        const input = document.querySelector(`[${DATA_ID_ATTR}="${inputId}"]`);
        if (input) {
            return fillText(input, value);
        }
        return false;
    }

    function fillText(input, value) {
        D.func();
        if (FindHelper.isInput(input)) {
            // prepare
            input.click();
            input.focus();
            fakeKeyEvent(input);
            // set
            input.value = value;
            // flush
            fakeKeyEvent(input);
            input.dispatchEvent(createEvent("input"));
            input.dispatchEvent(createEvent("change"));
            // just in case
            if (input.value != value) {
                window.setTimeout(function onTimeout() {
                    input.value = value;
                }, 100);
            }
            return true;
        }
        return false;
    }

    return {
        fillText: function(input, value) {
            return fillText(input, value || "");
        },

        fillTextById: function(inputId, value) {
            return fillTextById(inputId, value || "");
        }
    };
})();