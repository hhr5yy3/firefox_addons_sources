// Adding the button to the right-click menu
browser.contextMenus.create({
  id: "delete-element",
  title: "Remove Page Element"
});

// Sending the message to the content-script
function messageTab(tabs) {
  browser.tabs.sendMessage(tabs[0].id, {});
}

function removeElement() {
    // Setting the query up for informing the content-script to execute the command
    var querying = browser.tabs.query({
        active: true,
        currentWindow: true
    });
    querying.then(messageTab);
}

// The listener for if the button is clicked from the right-click menu (known as the contextMenu
browser.contextMenus.onClicked.addListener(function (info, tabs) {
  if (info.menuItemId == "delete-element") {
    removeElement();
  }
});
