var intervalId = null;
self.addEventListener('message', function (event) {
    if (event.data.start === true) {
        if (intervalId !== null) {
            clearInterval(intervalId);
        }
        intervalId = setInterval(function () { return self.postMessage('interval.start'); }, event.data.ms || 0);
    }
    if (event.data.stop === true && intervalId !== null) {
        clearInterval(intervalId);
        self.postMessage('interval.stop');
    }
});
