var D = (function createD() {

    let _verbose = false; // FIXME: logs (beta)

    function setVerbose(verbose) {
        _verbose = verbose;
    }

    function func(name, args) {
        if (_verbose) {
            let params = "";
            const len = args.length;
            for (let i = 0; i < len; i++) {
                params += args[i];
                if (i < len - 1) {
                    params += ", ";
                }
            }
            console.log(name + "(" + params + ")");
        }
    }

    function printAttributes(input) {
        let str = "";
        if (input instanceof HTMLInputElement) { str = str + "INPUT"; }
        if (input instanceof HTMLSelectElement) { str = str + "SELECT"; }
        // HTML attributes
        if (input.autocomplete) { str = str + ` || Autocomplete= ${input.autocomplete}`; }
        if (input.type) { str = str + ` || Type= ${input.type}`; }
        if (input.id) { str = str + ` || Id= ${input.id}`; }
        if (input.name) { str = str + ` || Name= ${input.name}`; }
        if (input.title) { str = str + ` || Title= ${input.title}`; }
        if (input.placeholder) { str = str + ` || Placeholder= ${input.placeholder}`; }
        if (input.getAttribute("aria-label")) { str = str + ` || Aria-label= ${input.getAttribute("aria-label")}`; }
        let labels = [];
        if (input.labels) {
            input.labels.forEach(label => labels.push(label.textContent));
        }
        if (labels.length !== 0) { str = str + ` || Labels= ${labels}`; }
        if (input instanceof HTMLInputElement) { str = str + ` || isInput= ${FindHelper.isInput(input)}`; }
        if (input instanceof HTMLSelectElement) { str = str + ` || isSelect= ${FindHelper.isSelect(input)}`; }
        str = str + ` || isOperable= ${FindHelper.isOperable(input)}`;
        // guess
        let scores = InputGuesser.getInputScores(input);
        let guessedType = InputGuesser.guessInputType(scores);
        if (guessedType) {
            str = str + ` || Guess= ${guessedType} Score= ${scores[guessedType]}`;
        }
        console.log(str);
    }

    function printInputs() {
        if (_verbose) {
            console.log("DOCUMENT****************************************************");
            console.log(document.location.href);
            // print inputs outside forms
            let allInputs = document.querySelectorAll("input, select");
            let inputsInForms = document.querySelectorAll("form input, form select");
            let inputsInFormsArray = [];
            inputsInForms.forEach(input => inputsInFormsArray.push(input));
            allInputs.forEach(input => {
                if (!inputsInFormsArray.includes(input)) {
                    printAttributes(input);
                }
            });
            let forms = document.querySelectorAll("form");
            if (forms) {
                // print inputs & selects inside forms
                forms.forEach(form => {
                    console.log("=FORM=======================================================");
                    const inputs = form.querySelectorAll("input, select");
                    if (inputs) {
                        inputs.forEach(input => { printAttributes(input) });
                    }
                    console.log("============================================================");
                })
            }
            console.log("************************************************************");
        }
    }

    function print(text) {
        if (_verbose) {
            console.log(text);
        }
    }

    function error(text) {
        console.error(text);
    }

    return {

        setVerbose: function(verbose) {
            return setVerbose(verbose);
        },

        getVerbose: function() {
            return _verbose;
        },

        func: function() {
            const name = arguments.callee.caller.name;
            return func(name, arguments);
        },

        printInputs: function() {
            return printInputs();
        },

        print: function(text) {
            return print(text);
        },

        error: function(text) {
            return error(text);
        }
    }

})();