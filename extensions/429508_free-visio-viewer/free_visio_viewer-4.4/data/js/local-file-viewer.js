var $ = jQuery.noConflict();

/**
 * =======================================================================
 * Drop zone component
 * =======================================================================
 */
var lucid = lucid || {};

// depth of dragenter events; used to prevent a premature showNoUpload call
var dragDepth = 0;

/**
 * Switch the view state to the no upload view
 */
lucid.showNoUpload = function() {
    $('#visioContainer').attr('class', 'vs-no-upload');

    $('.vs-error').hide();
    $('#doneFooter').hide();
    $('#dragOverFooter').hide();
    $('#loadingFooter').hide();

    $('.vs-header').show();
    $('#vsIcon').addClass('vs-start-img');
    $('#vsIcon').attr('src', 'img/vs-no-upload.png');
    $('#noUploadFooter').show();
};

/**
 * Switch the view state to the dragging view
 */
lucid.showDragOver = function() {
    $('#visioContainer').attr('class', 'vs-drag-over');

    $('.vs-error').hide();
    $('.vs-header').hide();
    $('#doneFooter').hide();
    $('#loadingFooter').hide();
    $('#noUploadFooter').hide();

    $('#vsIcon').removeClass('vs-start-img');
    $('#vsIcon').attr('src', 'img/vs-drag-over.png');
    $('#dragOverFooter').show();
};

/**
 * Switch the view state to the uploading view
 */
lucid.showLoading = function() {
    $('#visioContainer').attr('class', 'vs-loading');

    $('.vs-error').hide();
    $('.vs-header').hide();
    $('#doneFooter').hide();
    $('#dragOverFooter').hide();
    $('#noUploadFooter').hide();

    $('#vsIcon').removeClass('vs-start-img');
    $('#vsIcon').attr('src', 'img/vs-drag-over.png');

    $('#loadingFilename').text(lucid.unescapedFileName);
    $('#loadingFooter').show();
};

/**
 * Switch the view state to the done uploading view
 */
lucid.showDone = function() {
    $('#visioContainer').attr('class', 'vs-done');

    $('.vs-error').hide();
    $('.vs-header').hide();
    $('#dragOverFooter').hide();
    $('#loadingFooter').hide();
    $('#noUploadFooter').hide();

    $('#vsIcon').removeClass('vs-start-img');
    $('#vsIcon').attr('src', 'img/vs-done.png');

    $('#doneFilename').text(lucid.unescapedFileName);
    $('#doneFooter').show();
};

/**
 * Upload a visio file to the visio service
 * @param {File} file the file to upload to the visio service
 */
lucid.uploadFile = function(file) {
    // clear the file input for future use
    $('#fileInput').wrap('<form>').closest('form').get(0).reset();
    $('#fileInput').unwrap();

    // switch to the uploading view
    lucid.showLoading();

    // from original Chrome version
    var form = new FormData();
    form.append('file', file);
    form.append('name', file.name);
    form.append('conversion_type', 'visio');
    form.append('source', 'firefox_localfile');
    form.append('extension_source', 'local_file');

    $.ajax({
        'url': 'https://lucid.app/visio/openConversions',
        'type': 'POST',
        'data': form,
        'error': function(jqXHR) {
            if (jqXHR.statusText == 'timeout' || jqXHR.status == 0) {
                $('#timeoutDialog').show();
            } else {
                $('#parseErrorDialog').show();
            }
        },
        'timeout': 5 * 60 * 1000,
        'success': function(data) {
            lucid.showDone();
            setTimeout(function() {
                var location = data['viewer'];
                chrome.tabs.create({'url': location});
                lucid.showNoUpload();
            }, 1000);
        },
        'processData': false,
        'contentType': false,
        'cache': false
    });

    // send a request to convert this file to the content script
    // lucid.sendFileToConvert(file);
};

/**
 * Send a message containing the file to convert to the page script which will
 * then make the CORS request to convert the file.
 */
lucid.sendFileToConvert = function(file) {
    var event = document.createEvent('CustomEvent');
    event.initCustomEvent('fileConversionUpload', true, true, {file: file});
    document.documentElement.dispatchEvent(event);
};

/**
 * We have received a successful conversion and modified the gui appropriately.
 * Acknowledge that we have done so.
 */
lucid.sendConversionSuccess = function(viewerUrl) {
    var event = document.createEvent('CustomEvent');
    event.initCustomEvent('fileConversionSuccess', true, true, {viewerUrl: viewerUrl});
    document.documentElement.dispatchEvent(event);
};

/**
 * Create the callbacks for drag events
 */
lucid.createCallbacks = function() {
    // make the upload button affect the hidden file input
    $('#noUploadFooter .btn').click(function() {
        $('#fileInput').click();
    });

    $('#fileInput').change(function() {
        var file = $('#fileInput').get(0).files[0];
        lucid.unescapedFileName = file.name;
        lucid.fileName = escape(file.name);
        lucid.uploadFile(file);
    });

    $('.vs-error .btn').click(function() {
        $(this).closest('.vs-error').hide();
        lucid.showNoUpload();
    });

    // set the dragenter callback on the component passed in, and show the invisible mask.
    // We then define the remaining callbacks on the mask, because events will fire on the original
    // component whenever we enter a child element. Defining the dragleave event on an invisible
    // mask that overlays the component keeps this from happening.
    $('body').on('dragenter', function(event) {
        event.preventDefault();
        event.stopPropagation();

        dragDepth++;
        // don't go into drag mode if the error dialog is shown or drag depth is greater than 1
        if ($('#errorDialog').is(':visible') || dragDepth > 1) {
            return;
        }
        lucid.showDragOver();
        $('#visioMask').show();
    });

    $('body').on('dragleave', function(event) {
        event.preventDefault();
        event.stopPropagation();

        dragDepth--;
        // don't exit drag mode if drag depth is greater than zero
        if (dragDepth > 0) {
            return;
        }

        lucid.showNoUpload();
        $('#visioMask').hide();
    });

    $('body').on('drop', function(event) {
        event.preventDefault();
        event.stopPropagation();

        dragDepth = 0; // reset drag depth

        // don't upload if the error dialog is shown
        if ($('#errorDialog').is(':visible')) {
            return;
        }

        // There needs to be a file to upload. Otherwise we might have dragged
        // some text from the page onto the dropzone.
        if (typeof event.originalEvent.dataTransfer.files[0] == 'undefined') {
            lucid.showNoUpload();
            $('#visioMask').hide();
            return;
        } else if (event.originalEvent.dataTransfer.files.length > 1) {
            lucid.showNoUpload();
            $('#visioMask').hide();
            $('#onlyOneFileDialog').show();
            return;
        } else if (
            !event.originalEvent.dataTransfer.files[0].type &&
            event.originalEvent.dataTransfer.files[0].size % 4096 == 0
        ) {
            lucid.showNoUpload();
            $('#visioMask').hide();
            $('#invalidFileDialog').show();
            return;
        }
        var file = event.originalEvent.dataTransfer.files[0];
        lucid.unescapedFileName = file.name;
        lucid.fileName = escape(file.name);

        // show error if the file is the wrong type
        if (!/\.(vsd|vsdx|vdx|vsdm)$/i.test(file.name)) {
            lucid.showNoUpload();
            $('#visioMask').hide();
            $('#invalidFileDialog').show();
            return;
        }

        // file is correct; upload the file
        $('#visioMask').hide();
        lucid.uploadFile(file);
    });

    // do nothing on the drag over event
    // we have to specify this because if this event gets propagated, the browser
    // will still carry out its default action
    $('body').on('dragover', function(event) {
        event.preventDefault();
        event.stopPropagation();
    });

    // This listener receives the response of a file conversion upload and
    // changes the state of the document accordingly.
    window.addEventListener('fileConversionResponse', function(event) {

        if (event.detail.status == 'success') {
            lucid.showDone();

            setTimeout(function() {
                lucid.showNoUpload();
                lucid.sendConversionSuccess(event.detail.viewer);
            }, 1000);
        } else {
            $('#parseErrorDialog').show();
        }

    }, false);
};

$(document).ready(function() {
    lucid.fileName = '';
    lucid.unescapedFileName = '';
    lucid.createCallbacks();
    lucid.showNoUpload();

    $('img').on('dragstart', function(event) {
        event.preventDefault();
    });
    $('#bottom-sign-up-button').on('dragstart', function(event) {
        event.preventDefault();
    });
});
