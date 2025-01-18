function openWindowWithSubdomains() {
  const domParser = new DOMParser();
  let hostnameTitle = null;
  let hostnameOriginal = null;

  const generateFullLink = () => {
    const linkToFull = document.createElement("a");
    linkToFull.target = "_blank";
    linkToFull.innerHTML = "Все результаты";

    api.storage.local.get("locale").then(({ locale }) => {
      switch (locale) {
        case "ru":
          linkToFull.href =
            "https://majento.ru/index.php?page=seo-analize/site-all-subdomains";
          break;
        case "en":
          linkToFull.href =
            "https://site-analyzer.pro/services-seo/site-all-subdomains";
          break;
        default:
          linkToFull.href =
            "https://site-analyzer.pro/services-seo/site-all-subdomains";
          break;
      }
    });

    return linkToFull;
  };

  executeOnActiveTab(() => {
    return location.hostname.replace("www.", "");
  })
    .then((hostname) => {
      hostnameOriginal = hostname;
      hostnameTitle = punycode.ToUnicode(hostname);
      return fetch(`https://www.google.com/search?q=site:*.${hostname}`);
    })
    .then((response) => response.text())
    .then((content) => {
      const windowContent = document.createElement("div");
      const searchResults = domParser.parseFromString(content, "text/html");

      const indexElement = searchResults.querySelector(".GyAeWb");

      const windowHeader = document.createElement("span");
      windowHeader.innerHTML = `<img src="./res/icons/subdomains.png" class="modal-window__icon"><span data-translation="subdomains">${translate(
        "subdomains"
      )}</span> «${hostnameTitle}»`;

      if (!indexElement) {
        windowContent.innerHTML = `<a href="https://www.google.com/search?q=site:*.${hostnameOriginal}" target="_blank" class="subdomains-error-message" data-translation="captcha">${translate(
          "captcha"
        )}</a>`;
        // windowContent.append(generateFullLink());
        showModal(windowContent, windowHeader);
        return;
      }

      /** @type {HTMLAnchorElement[]} */
      const results = indexElement.querySelectorAll('[jsname="UWckNb"]');

      if (!results.length) {
        windowContent.innerHTML = `<div class="subdomains-error-message" data-translation="noneData">${translate(
          "noneData"
        )}</div>`;
        // windowContent.append(generateFullLink());
        showModal(windowContent, windowHeader);
        return;
      }

      const table = document.createElement("table");
      table.classList.add("fancy-table", "subdomains-table");

      const tableHeader = document.createElement("tr");
      const titlesHeader = `<th>TITLE</th>`;
      tableHeader.innerHTML = `<th>#</th><th>URL</th>${titlesHeader}`;

      table.append(tableHeader);

      const uniq = [];
      let index = 0;

      results.forEach((result) => {
        const href = new URL(result.href);
        if (uniq.includes(href.hostname)) return;

        const linkTitle = result.querySelector("h3");

        const resultElement = document.createElement("tr");

        const number = `<td><span>${index + 1}</span></td>`;
        const url = `<a href="${result.href}" target="_blank">${result.href}</a>`;
        const title = `<td><span>${linkTitle.innerText}</span></td>`;
        resultElement.innerHTML = `${number}<td>${url}</td>${title}`;

        table.append(resultElement);

        uniq.push(href.hostname);
        index++;
      });

      windowContent.append(table);
      // windowContent.append(generateFullLink());

      showModal(windowContent, windowHeader);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector("#open-subdomains-window")
    .addEventListener("click", () => openWindowWithSubdomains());
});
