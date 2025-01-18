/**
 * Page scripts are unable to make CORS requests, even when the URI has been
 * whitelisted. This content script receives a message containing a file and
 * makes the conversion request.
 */

/**
 * Firefox page scripts cannot make CORS requests even when a URI has been
 * whitelisted. This content script receives a file from the page script,
 * makes the conversion request and then sends the page script the response
 * of the conversion request.
 */
window.addEventListener('fileConversionUpload', function(event) {
    var form = new FormData();
    form.append('file', event.detail.file);
    form.append('name', event.detail.file.name);
    form.append('conversion_type', 'visio');
    form.append('source', 'firefox_localfile');
    form.append('extension_source', 'local_file');

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://lucid.app/visio/openConversions', true);

    xhr.onload = function(e) {
        if (xhr.status == 200) {
            var responseJson = JSON.parse(xhr.responseText);
            responseJson['status'] = 'success';

            sendResponse(responseJson);
        } else {
            sendResponse({status: 'failure'});
        }
    };

    xhr.send(form);
}, false);

/**
 * When the viewer has acknowledged the successful upload, it sends a message
 * notifying us that we are supposed to open a tab to the viewer. This is done
 * to prevent race conditions on the showNoUpload call in the viewer on success.
 */
window.addEventListener('fileConversionSuccess', function(event) {
    self.port.emit('conversionSuccess', event.detail.viewerUrl);
}, false);

/**
 * Send a response back to the page script.
 */
function sendResponse(status) {
    var cloned = cloneInto(status, document.defaultView);
    var event = document.createEvent('CustomEvent');
    event.initCustomEvent('fileConversionResponse', true, true, cloned);
    document.documentElement.dispatchEvent(event);
}
