window.addEventListener("message", function(event) {
    // We only accept messages from ourselves
    if (event.source != window) return;

    if (event.data.type && (event.data.type == "request_show_modal_from_messagejs")) {
        $('#' + event.data.modalId).modal('show');
    }
}, false);
