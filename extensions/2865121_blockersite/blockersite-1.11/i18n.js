const words = document.querySelectorAll("[data-i18n]");

for (let i = 0; i < words.length; i++) {
  const translation = browser.i18n.getMessage(words[i].getAttribute("data-i18n"));
  if (words[i].value === "i18n") {
    words[i].value = translation;
  } else {
    words[i].innerText = translation;
  }
}