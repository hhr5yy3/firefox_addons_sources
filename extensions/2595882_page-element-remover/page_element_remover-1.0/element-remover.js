var elements = '';

function removeElementReceiver(request, sender, sendResponse) {
    // Removes the element that was being hovered over (that was already captured by the contextmenu listener)
    elements[elements.length - 1].style.display = "none";
}

document.addEventListener('contextmenu', function (event) {
    // Captures the elements from where the cursor is at once the user right-clicks on the page
    elements = document.querySelectorAll(":hover");
}, false);

browser.runtime.onMessage.addListener(removeElementReceiver);
