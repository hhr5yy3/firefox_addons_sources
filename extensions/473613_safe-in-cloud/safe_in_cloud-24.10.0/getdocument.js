(function mainGetDocument() {
    D.func();

    const EMAIL_REG_EXP = /([\da-zA-Z+_.-]+)@([\da-zA-Z.-]+)\.([a-zA-Z]{2,})/i;
    const DATA_ID_ATTR = "data-safeincloud_id";

    // listen to port
    chrome.runtime.onConnect.addListener(function onPortConnect(port) {
        D.func();
        if (port.name === "GetDocument") {
            port.onMessage.addListener(function onPortMessage(message) {
                D.func(document.location.href);
                if (message.method == "getDocument" && !document.hidden) {
                    let mDocument = getDocument();
                    port.postMessage(mDocument);
                    // // FIXME: print document
                    // D.print(mDocument);
                }
            });
        }
    });

    function getDocument() {
        D.func();
        let response = {
            url: document.location.hostname
        };
        let mDocument = document.createElement("div");
        const allInputs = document.querySelectorAll("input, select");
        const inputsInForms = document.querySelectorAll("form input, form select");
        let inputsInFormsArray = [];
        inputsInForms.forEach(input => inputsInFormsArray.push(input));
        let loginLabel = null;
        // append inputs outside forms
        allInputs.forEach(input => {
            if (isInput(input) && !inputsInFormsArray.includes(input)) {
                loginLabel = appendInput(input, mDocument, loginLabel);
            }
        });
        // append forms with their inputs
        const forms = document.querySelectorAll("form");
        forms.forEach(form => {
            mDocument.appendChild(getMFrom(form));
        });
        // convert to string
        response.mDocument = mDocumentToString(mDocument);
        return response;
    }

    function isInput(input) {
        return FindHelper.isInput(input) || FindHelper.isSelect(input);
    }

    function appendInput(input, form, loginLabel) {
        // D.func();
        form.appendChild(getMInput(input, form));
        // for passwords: try to find login on page and save it as label
        if (!loginLabel && isPasswordInput(input)) {
            let parent = FindHelper.getParent(input);
            if (parent) {
                loginLabel = getLoginLabel(parent, 0);
                if (loginLabel) {
                    form.appendChild(loginLabel);
                }
            }
        }
        return loginLabel;
    }

    function isPasswordInput(input) {
        return input.autocomplete == "current-password" || input.autocomplete == "new-password" || input.type == "password";
    }

    function getMFrom(form) {
        // D.func();
        const mForm = document.createElement("form");
        if (document.activeElement && (document.activeElement.form == form)) { mForm.setAttribute("data-active", true) };
        const inputs = form.querySelectorAll("input, select");
        let loginLabel = null;
        inputs.forEach(input => {
            if (isInput(input)) {
                loginLabel = appendInput(input, mForm, loginLabel);
            }
        });
    return mForm;
    }

    function getMInput(input, parent) {
        // D.func();
        const mInput = (input instanceof HTMLSelectElement) ? document.createElement("select") : document.createElement("input");
        if (input.type) { mInput.type = input.type; };
        if (input.autocomplete) { mInput.autocomplete = input.autocomplete; };
        if (input.name) { mInput.name = input.name; };
        if (input.id) { mInput.id = input.id; };
        if (input.placeholder) { mInput.placeholder = input.placeholder; };
        if (input.title) { mInput.title = input.title; };
        if (input.getAttribute("aria-label")) { mInput.setAttribute("aria-label", input.getAttribute("aria-label")); };
        // input.labels does not pass through the port
        if (input.labels) {
            input.labels.forEach(label => {
                let mLabel = document.createElement("label");
                mLabel.textContent = label.textContent;
                mLabel.setAttribute("for", label.getAttribute("for"));
                parent.appendChild(mLabel);
            });
        }
        // input.value does not pass through the port
        if (input.value) { mInput.setAttribute("data-value", input.value); };
        // visibility
        if (!FindHelper.isVisible(input)) { mInput.hidden = true; };
        if (input.readOnly) { mInput.readOnly = true; };
        // set data-id
        const uniqueId = uuidv4();
        input.setAttribute(DATA_ID_ATTR, uniqueId);
        mInput.setAttribute(DATA_ID_ATTR, uniqueId);
        return mInput;
    }

    function mDocumentToString(mDocument) {
        D.func();
        const container = document.createElement("div");
        container.appendChild(mDocument);
        return container.innerHTML;
    }

    function getLoginLabel(parent, level) {
        D.func();
        const lines = parent.innerText;
        const match = EMAIL_REG_EXP.exec(lines);
        if (match) {
            const label = document.createElement("label");
            label.textContent = match[0];
            label.setAttribute("data-login", true)
            return label;
        }
        // parent != document ?
        const MAX_LEVEL = 99;
        parent = FindHelper.getParent(parent);
        if (parent && parent != document.documentElement && level < MAX_LEVEL) {
            // go up the document
            return getLoginLabel(parent, level + 1);
        }
        return null;
    }
})();