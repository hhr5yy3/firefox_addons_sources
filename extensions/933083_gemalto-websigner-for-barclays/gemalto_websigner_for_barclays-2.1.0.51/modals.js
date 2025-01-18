var modals = $(selectorWrap + '.modal'); // Automated modals listing (jQuery), see toggleDisplay()

function toggleDisplay(modalName, ignoreOverlayClicks = false) {
/* toggleDisplay() is the heart of the modal system. There are two uses:
    - Displaying one specific modal, making sure it is not already displayed,
    - Hiding any modal, via the jQuery-generated list seen above.

    In both cases, the OVERLAY is also smoothly toggled depending on its current display.

    /!\ 29.9: there is a minor issue atm when toggling very fast. Low priority.
 */
    // make overlay clickable depending on the ignoreOverlayClicks parameter
    let overlay = $(selectorWrap + "#overlay");
    if (overlay.length) {
        overlay.off("click");
        if (!ignoreOverlayClicks) {
            overlay.click(function() {
                toggleDisplay();
            });
        }
    }

    // only one modal can be displayed at the same time
    for (var i = 0, max = modals.length; i < max; i++)
        modals[i].style.display = 'none';

    // when switching from one modal to another, the overlay remains unchanged
    if (typeof modalName !== 'undefined') {
        $(selectorWrap + 'button.sign').prop('disabled', true);
        $(selectorWrap + '#overlay').animate({opacity: customerSettings.overlayOpacity}, 150); // ...then animate its 'rendering'.
        $(selectorWrap + '#overlay').css({display: 'block'});
        var modalToDisplay = document.getElementById(modalName);
        modalToDisplay.style.display = (modalToDisplay.style.display == 'block') ? 'none' : 'block';
        $(selectorWrap + '#' + modalName).center("main"); // call to center() extension against main
    } else {
        $(selectorWrap + 'button.sign:not(.errorState)').prop('disabled', false); // enables if it is not in error state
        $(selectorWrap + '#overlay').animate({opacity: 0}, 150, function() { this.style.display = 'none'; }); // ...hide it at the end of the animation.
    }

    $(selectorWrap + '#' + modalName).children('.action').trigger("focus");

    // display scratched padlock if not HTTPS
    if (modalName === "enterPIN") {
        $(selectorWrap + "#inputPIN").trigger("focus");
        if (window.location.protocol !== "https:") {
            $(selectorWrap + "#inputPIN").addClass('insecure');
            $(selectorWrap + "#inputPIN").attr('title', "This connection is not secure (no HTTPS).\nLogins entered here could be compromised.");
        }
    }
}

/* modalIsDisplayed(modalName) returns whether the given modal is displayed
   parameters:
    * modalName - id of the modal element

   returns:
    * true only when there is exactly one modal with the given id and it is visible
    * false otherwise
*/
function modalIsDisplayed(modalName) {
    let foundModals = $(selectorWrap + '#' + modalName);
    if ( typeof foundModals !== 'undefined' && foundModals.length == 1) {
        if ( window.getComputedStyle(foundModals[0], null).getPropertyValue('display') != 'none' ) {
            return true;
        }
    }

    return false;
}

jQuery.fn.center = function(parentId, animated) {
/* jQuery extension to dynamically center elements compared to #wrapper. $(Element).center();
    If the function is being sent any argument, this specific animation will be visible, smooth and swift. */
    var parent = $(selectorWrap + '#' + parentId);

    if (animated) {
    /* median between height of #wrapper and height of modal, + current offset of #wrapper (if any).
        With font-size:62.5%, 1em = 10px, so we divide the sum by 10 and then write in em. */

        this.animate({top: ((Math.max(0, ((parent.height() - $(this).outerHeight()) / 2) + parent.scrollTop())) / 10 + "em")});
        this.animate({left: ((Math.max(0, ((parent.width() - $(this).outerWidth()) / 2) + parent.scrollLeft())) / 10 + "em")});
    } else {
        this.css(
            {
                top: Math.max(0, ((parent.height() - $(this).outerHeight()) / 2)),
                left: Math.max(0, ((parent.width() - $(this).outerWidth()) / 2))
            });
    }
    return this;
};
