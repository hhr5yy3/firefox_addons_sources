jQuery.fn.basetext = function() {
    return $(this).clone()
            .children()
            .remove()
            .end()
            .text();
};