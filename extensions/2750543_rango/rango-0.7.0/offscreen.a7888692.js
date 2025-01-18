const textarea = document.querySelector("textarea");

chrome.runtime.onMessage.addListener(((e, t, a) => {
  if ("offscreen-doc" === e.target) {
    switch (e.type) {
     case "copy-to-clipboard":
      textarea.value = e.text, textarea.select(), document.execCommand("copy");
      break;

     case "read-clipboard":
      return textarea.select(), document.execCommand("paste"), a(textarea.value), !0;
    }
    return !1;
  }
}));