browser.browserAction.onClicked.addListener(() => {
  browser.tabs.saveAsPDF({})
    .then((status) => {
      console.log(status);
    });
});


