window.timerId = setInterval(startScript, 1000);

function startScript() {
    var open = window.XMLHttpRequest.prototype.open;

    function openReplacement(method, url, async, user, password) {
        if ( url.match(/proposal/) ) {
            sessionStorage.setItem('sessionId', (url.match(/proposal\/(.+?)\//) || [])[1])
        }
        return open.apply(this, arguments);
    }

    window.XMLHttpRequest.prototype.open = openReplacement;
};
