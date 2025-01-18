(async () => {
  const form = document.getElementsByTagName("form")[0];
  const table = document.querySelector('table[summary="Liste der Stammdaten des Studierenden"]');
  const afterTable = table?.nextElementSibling;
  if (!form || !table || !afterTable)
    return;
  form.insertBefore(document.createElement("p"), afterTable);
  const gradeContainer = document.createElement("div");
  gradeContainer.id = "TUfastGradeContainer";
  form.insertBefore(gradeContainer, afterTable);
  const tableInfoContainer = document.createElement("div");
  tableInfoContainer.id = "TUfastTableInfo";
  form.insertBefore(tableInfoContainer, afterTable);
  const imgUrl = chrome.runtime.getURL("/assets/images/tufast48.png");
  const credits = document.createElement("p");
  credits.id = "TUfastCredits";
  credits.innerHTML = `Powered by <img src="${imgUrl}" style="position:relative; right: 2px;height: 15px;"><a href="https://www.tu-fast.de" target="_blank">TUfast</a> (entwickelt von <a href="https://github.com/Noxdor" target="_blank">Noxdor</a> & <a href="https://github.com/C0ntroller" target="_blank">C0ntroller</a>)`;
  form.insertBefore(credits, afterTable);
  const gradeScript = document.createElement("script");
  gradeScript.type = "module";
  gradeScript.src = chrome.runtime.getURL("/contentScripts/other/hisqis/gradeChart.js");
  const tableScript = document.createElement("script");
  tableScript.type = "module";
  tableScript.src = chrome.runtime.getURL("/contentScripts/other/hisqis/newTable.js");
  tableScript.addEventListener("load", async () => {
    const newTable = document.getElementById("gradeTable");
    const oldTable = document.getElementById("oldGradeTable");
    if (!newTable || !oldTable)
      return;
    const {hisqisPimpedTable} = await chrome.storage.local.get(["hisqisPimpedTable"]);
    newTable.style.display = hisqisPimpedTable ? "table" : "none";
    oldTable.style.display = hisqisPimpedTable ? "none" : "table";
    const p = document.createElement("p");
    p.className = "info";
    const changeLink = document.createElement("a");
    changeLink.style.cursor = "pointer";
    changeLink.innerText = hisqisPimpedTable ? "langweiligen, alten Tabelle..." : "neuen, coolen TUfast-Tabelle 🔥";
    changeLink.addEventListener("click", async () => {
      const hisqisPimpedTable2 = !(newTable.style.display === "table");
      newTable.style.display = hisqisPimpedTable2 ? "table" : "none";
      oldTable.style.display = hisqisPimpedTable2 ? "none" : "table";
      changeLink.innerText = hisqisPimpedTable2 ? "langweiligen, alten Tabelle..." : "neuen, coolen TUfast-Tabelle 🔥";
      await chrome.storage.local.set({hisqisPimpedTable: hisqisPimpedTable2});
    });
    p.append(document.createTextNode(" Weiter zur "), changeLink);
    tableInfoContainer.appendChild(p);
  });
  document.head.append(gradeScript, tableScript);
})();
