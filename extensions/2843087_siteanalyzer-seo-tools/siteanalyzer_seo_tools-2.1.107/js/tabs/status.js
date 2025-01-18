function generateHeaderRow(header) {
  const headerRow = document.createElement("tr");
  headerRow.classList.add("status-tab-table__row");
  headerRow.innerHTML = `<td>${header.key}</td><td data-export="${header.key}">${header.value}</td>`;

  return headerRow;
}

async function renderStatus() {
  const statusTable = document.querySelector(".status-tab-table tbody");
  executeOnActiveTab(async () => {
    const response = await fetch(window.location.href);
    if (!response || !response.ok) return;
    const headers = [];

    response.headers.forEach((value, key) => {
      headers.push({ value, key });
    });

    return {
      statusCode: response.status,
      statusText: response.statusText,
      href: window.location.href,
      host: window.location.host,
      path: window.location.pathname,
      headers: headers,
    };
  }).then((data) => {
    if (!data) return;
    print(
      "status-href",
      `<a href=${data.href} target="_blank">${
        punycode.ToUnicode(data.host) + data.path
      }</a>`
    );
    print("status-code", `${data.statusCode} ${data.statusText}`);
    data.headers.forEach((header) =>
      statusTable.append(generateHeaderRow(header))
    );
  });
}

document.addEventListener("DOMContentLoaded", renderStatus);
