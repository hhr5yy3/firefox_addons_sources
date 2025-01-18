/*
Create all the context menu items.
*/

var callTitle = browser.i18n.getMessage("callTitle");
var callEditTitle = browser.i18n.getMessage("callEditTitle");

browser.menus.create({
  id: "call-selection",
  title: callTitle,
  contexts: ["selection"]
});

browser.menus.create({
  id: "call-and-edit",
  title: callEditTitle,
  contexts: ["selection"]
});

function click2Call(phoneNumber) {  
  browser.tabs.update({ url: "ciscotel:" + phoneNumber });
}

function click2CallAndEdit(text) {
  browser.tabs.update({ url: "clicktocallwithedit:" + text });
}

/*
The click event listener, where we perform the appropriate action given the
ID of the menu item that was clicked.
*/
browser.menus.onClicked.addListener((info, tab) => {
  var numberToCall = info.selectionText.replace(/\s/g, '');
  
  var re = new RegExp("(.*)@(.*)");  
  if (!re.test(numberToCall))
  {
      numberToCall = "//" + numberToCall
  }
  
  switch (info.menuItemId) {
    case "call-selection":
      click2Call(numberToCall);
      break;
    case "call-and-edit":
      click2CallAndEdit(numberToCall);
      break;
  }
});
