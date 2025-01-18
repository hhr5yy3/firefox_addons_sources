function exportAll() {
  const exportAllToCSV = (exportData) => {

    exportData.push([]);
    exportData.push(['Created by SiteAnalyzer SEO Tools']);

    let csvContent =
      "data:text/csv;charset=utf-8,\uFEFF" +
      exportData.map((e) => e.join(";")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.hidden = true;
    document.body.appendChild(link);

    executeOnActiveTab(() => {
      return location.hostname;
    }).then((hostname) => {
      link.setAttribute(
        "download",
        `${punycode.ToUnicode(hostname)}_export.csv`
      );
      link.click();
    });
  };

  /** @type {HTMLElement[]} */
  const exportElements = document.querySelectorAll("[data-export]");
  const exportData = [
    [translate("contentParameter"), translate("contentValue")],
  ];

  exportElements.forEach((el) => {
    const parameter = translate(el.getAttribute("data-export"));
    const value = el.hasAttribute("data-export-attribute")
      ? el.getAttribute(el.getAttribute("data-export-attribute"))
      : el.innerText;

    exportData.push([parameter, formatDataToCsvValue(value)]);
  });

  exportAllToCSV(exportData);
}

document.addEventListener("DOMContentLoaded", () => {
  const exportButton = document.querySelector("#export-all-button");
  exportButton.addEventListener("click", exportAll);
});
