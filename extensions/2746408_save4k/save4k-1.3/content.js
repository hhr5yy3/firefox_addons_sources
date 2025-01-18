window.addEventListener("load", main, false);
function main() {
  if (!document.URL.includes("youtube.com/watch?v=")) return;
  var insertButton = function () {
    if (
      !document.getElementsByClassName(
        "style-scope ytd-video-secondary-info-renderer"
      )
    )
      return;
    clearInterval(tryToInsert); // stop interval

    if (document.getElementById("extension-inserted-button")) return;
    var block = document.getElementById("owner");
    var button = document.createElement("button");
    button.setAttribute(
      "style",
      'height:36px;margin-right:0.5em;cursor:pointer;color: #fff;position: relative;display: inline-block;font-family: Arial,Helvetica,FreeSans,"Liberation Sans","Nimbus Sans L",sans-serif;font-size: 1.5em;font-weight: 700;color: rgb(245,245,245);text-shadow: 0 -1px rgb(0 0 0 / 10%);text-decoration: none;user-select: none;padding: 0.3em 1em;outline: none;border: none;border-radius: 18px;background: #0c9c0d linear-gradient(#82d18d,#0c9c0d);box-shadow: inset #72de26 0 -1px 1px, inset 0 1px 1px #98ff98, #3caa3c 0 0 0 1px, rgb(0 0 0 / 30%) 0 2px 5px;'
    );
    button.id = "extension-inserted-button";
    button.innerHTML = "Скачать";
    button.onclick = function () {
      window
        .open("https://youtube01.com/get.php?url=" + document.URL, "_blank")
        .focus();
    };
    try {
      block.insertBefore(button, block.children.item(1));
    } catch {}
    // block.appendChild(button);
  };
  var tryToInsert = setInterval(insertButton, 1000);
}

browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message == "insert_button") {
    main();
  }
});
