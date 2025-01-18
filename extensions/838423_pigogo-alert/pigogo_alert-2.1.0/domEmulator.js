const {DOMParser, parseHTML} = require('linkedom');

const {
    // note, these are *not* globals
    window, document, customElements,
    HTMLElement,
    Event, CustomEvent
    // other exports ..
    } = parseHTML(`
        <!DOCTYPE html>
        <html>
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                <script src="ci.bg.pack.js"></script>
                <script src="ci.init.js"></script>
                <script type="text/javascript" src="js/bgBundle.js"></script>
            </head>
            <body></body>
        </html>`
    );