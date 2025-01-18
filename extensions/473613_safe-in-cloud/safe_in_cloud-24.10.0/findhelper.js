var FindHelper = (function createFindHelper() {
    D.func();

    function getParent(element) {
        if (element && element instanceof HTMLElement && element.parentNode && element.parentNode instanceof HTMLElement) {
            return element.parentNode;
        }
        return null;
    }

    function isVisible(element) {
        const visibility = window.getComputedStyle(element).visibility;
        let res = visibility != "hidden" && visibility != "collapse";
        let parent = element;
        while (parent && parent.tagName.toLowerCase() != "body" && res) {
            let style = window.getComputedStyle(parent);
            res = style.display != "none" && parent.hidden != true;
            parent = getParent(parent);
        }
        return res;
    }

    function isOperable(element) {
        if (!isInput(element) && !isSelect(element)) {
            return false;
        }
        return !element.disabled && !element.readOnly && isVisible(element);
    }

    function isInput(element) {
        return element instanceof HTMLInputElement && isValidType(element.type) && !isInvalidAutocomplete(element.autocomplete);
    }

    function isValidType(type) {
        return type === "text" || type === "email" || type === "password" || type === "number" || type === "tel";
    }

    // TODO: use array
    function isInvalidAutocomplete(autocomplete) {
        return (
            autocomplete === "organization-title" || autocomplete === "organization" || autocomplete === "street-address" ||
            autocomplete === "naddress-line1" || autocomplete === "address-line2" || autocomplete === "address-line3" ||
            autocomplete === "address-level1" || autocomplete === "address-level2" || autocomplete === "address-level3" ||
            autocomplete === "address-level4" || autocomplete === "country" || autocomplete === "country-name" ||
            autocomplete === "postal-code" || autocomplete === "transaction-currency" || autocomplete === "transaction-amount" ||
            autocomplete === "language" || autocomplete === "bday" || autocomplete === "bday-day" ||
            autocomplete === "bday-month" || autocomplete === "bday-year" || autocomplete === "sex" ||
            autocomplete === "url" || autocomplete === "photo" || autocomplete === "impp"
        );
    }

    function isSelect(element) {
        return element instanceof HTMLSelectElement;
    }

    function matchPattern(text, pattern) {
        if (pattern && text) {
            var regExp = new RegExp(pattern, 'i');
            if (regExp.test(text)) {
                return true;
            }
        }
        return false;
    }

    return {
        getParent: function(element) {
            return getParent(element);
        },

        isVisible: function(element) {
            return isVisible(element);
        },

        isOperable: function(element) {
            return isOperable(element);
        },

        isInput: function(element) {
            return isInput(element);
        },

        isSelect: function(element) {
            return isSelect(element);
        },

        matchPattern: function(text, pattern) {
            return matchPattern(text, pattern);
        }
    };
})();