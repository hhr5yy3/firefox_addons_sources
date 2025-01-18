function openSslWindow() {
  let hostname = null;

  executeOnActiveTab(() => {
    return { origin: location.origin, host: location.hostname };
  }).then(({ origin, host }) => {
    hostname = punycode.ToUnicode(host);
    fetch(
      `https://majento.ru/pages/seo-analize/read-ssl/search.php?url=${origin}`
    )
      .then((response) => response.json())
      .then((data) => {
        const windowContent = document.createElement("div");

        const windowHeader = document.createElement("span");
        windowHeader.innerHTML = `<img src="./res/icons/lock-open2.png" class="modal-window__icon"><span>SSL «${hostname}»</span>`;

        if (!data.json.ssl) {
          windowContent.innerHTML = `<div class="subdomains-error-message" data-translation="noneData">${translate(
            "noneData"
          )}</div>`;
          showModal(windowContent, windowHeader);
          return;
        }

        windowContent.innerHTML = data.json.ssl;

        const table = windowContent.querySelector("table");
        table.classList.add("ssl-info-table", "fancy-table");

        const tableHeader = document.createElement("thead");
        tableHeader.innerHTML = `<tr><th data-translation="contentParameter">${translate(
          "contentParameter"
        )}</th><th data-translation="contentValue">${translate(
          "contentValue"
        )}</th></tr>`;

        table.prepend(tableHeader);

        showModal(windowContent, windowHeader);
      });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  executeOnActiveTab(() => {
    return location.protocol;
  }).then((protocol) => {
    if (protocol === "https:") {
      const sslIcon = document.querySelector("img.ssl-icon");
      sslIcon.src = "./res/icons/lock2.png";
      sslIcon.classList.add("ssl-icon--active");
      sslIcon.onclick = () => {
        openSslWindow();
      };
    }
  });
});
