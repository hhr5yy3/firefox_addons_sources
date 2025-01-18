function openWindowWithMatchIps() {
  const domParser = new DOMParser();
  let ip = null;

  executeOnActiveTab(() => {
    return location.hostname;
  })
    .then((origin) => fetch(`http://ip-api.com/json/${origin}`))
    .then((response) => response.json())
    .then((data) => {
      ip = data.query;
      return fetch(`https://www.bing.com/search?q=ip:${data.query}`);
    })
    .then((response) => response.text())
    .then((content) => {
      const windowContent = document.createElement("div");
      const searchResults = domParser.parseFromString(content, "text/html");

      const indexElement = searchResults.querySelector("#b_results");

      const windowHeader = document.createElement("span");
      windowHeader.innerHTML = `<img src="./res/icons/ip-icon.png" class="modal-window__icon"><span data-translation="sitesOnIP">${translate(
        "sitesOnIP"
      )}</span>: ${ip}`;

      if (!indexElement) {
        windowContent.innerHTML = `<a href="https://www.bing.com/search?q=ip:${ip}" target="_blank" class="subdomains-error-message" data-translation="captcha">${translate(
          "captcha"
        )}</a>`;
        showModal(windowContent, windowHeader);
        return;
      }

      /**
       * @type {HTMLAnchorElement[]}
       */
      const results = indexElement.querySelectorAll("li.b_algo > h2 > a");

      if (!results.length) {
        windowContent.innerHTML = `<div class="subdomains-error-message" data-translation="noneData">${translate(
          "noneData"
        )}</div>`;
        showModal(windowContent, windowHeader);
        return;
      }

      const table = document.createElement("table");
      table.classList.add("fancy-table", "ips-table");

      const tableHeader = document.createElement("tr");
      const titlesHeader = `<th>TITLE</th>`;
      tableHeader.innerHTML = `<th>#</th><th>URL</th>${titlesHeader}`;

      table.append(tableHeader);

      const sites = [];

      results.forEach((result) => {
        const origin = new URL(result.href).origin;
        if (sites.includes(origin)) return;
        sites.push(origin);
      });

      sites.forEach((site, index) => {
        const resultElement = document.createElement("tr");

        const number = `<td><span>${index + 1}</span></td>`;
        const url = `<a href="${site}" target="_blank">${site}</a>`;
        resultElement.innerHTML = `${number}<td>${url}</td>`;

        const titleElement = document.createElement("td");
        titleElement.innerHTML = `<span><img src="./res/loader.gif" class="loader"></span>`;

        resultElement.append(titleElement);

        let charset = "UTF-8";
        fetch(site)
          .then((response) => {
            const contentType = response.headers.get("Content-Type");

            if (contentType) {
              const match = contentType.match(/charset=([^;]*)/);
              if (match && match[1]) {
                charset = match[1];
              }
            }

            return response.arrayBuffer();
          })
          .then((arrayBuffer) => {
            const decoder = new TextDecoder(charset);
            return decoder.decode(new Uint8Array(arrayBuffer));
          })
          .then((text) => {
            const html = domParser.parseFromString(text, "text/html");
            const title = html.querySelector("title")?.innerHTML || site;

            titleElement.innerHTML = `<span>${title}</span>`;
          });

        table.append(resultElement);
      });

      windowContent.append(table);

      showModal(windowContent, windowHeader);
    });
}

document.addEventListener("ShowModalWithIpMatches", () => {
  openWindowWithMatchIps();
});
