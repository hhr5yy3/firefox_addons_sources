"user strict";
const option = "width=320,height=500,menubar=0,titlebar=0,resizable=0";

//window.open("popup.html", "timer", option);
browser.windows.create({
  url: "popup.html",
  width: 320,
  height: 500,
  type: "popup"
});
