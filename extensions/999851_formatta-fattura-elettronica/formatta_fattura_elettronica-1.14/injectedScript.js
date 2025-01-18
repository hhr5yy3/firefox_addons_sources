(function() {

  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "showInvoice") {
    newDiv = document.createElement("div");
    newDiv.innerHTML = message.html;

    myDiv = document.getElementById("blank");
    document.body.insertBefore(newDiv, myDiv);
    document.title = message.title;
    }
  });

})();


