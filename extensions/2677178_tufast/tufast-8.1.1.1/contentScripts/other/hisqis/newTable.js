import {DataTable} from "../../../snowpack/pkg/simple-datatables.js";
(async () => {
  const tableInfoContainer = document.getElementById("TUfastTableInfo");
  if (!tableInfoContainer)
    return;
  const oldTable = document.getElementsByTagName("table")[2];
  if (!oldTable)
    return;
  oldTable.id = "oldGradeTable";
  const oldTableRows = oldTable.querySelectorAll("tr");
  const newTable = document.createElement("table");
  newTable.id = "gradeTable";
  newTable.style.display = "none";
  const caption = document.createElement("caption");
  const tableHeader = document.createElement("div");
  tableHeader.classList.add("table-header");
  caption.append(tableHeader);
  const title = document.createElement("h3");
  title.classList.add("table-header__title");
  title.innerText = "Deine Notenübersicht";
  const colorHelpers = document.createElement("div");
  colorHelpers.classList.add("table-header__helpers");
  for (const [i, descriptor] of ["Modul", "Bestandene Prüfung", "Verhauene Prüfung"].entries()) {
    const colorHelper = document.createElement("div");
    colorHelper.classList.add("table-header__helper");
    colorHelper.classList.add(`table-header__helper--${i}`);
    const color = document.createElement("div");
    color.classList.add("table-header__color");
    color.classList.add(`table-header__color--${i}`);
    colorHelper.append(color);
    const colorText = document.createElement("div");
    colorText.classList.add("table-header__color-text");
    colorText.classList.add(`table-header__color-text--${i}`);
    colorText.innerText = descriptor;
    colorHelper.append(colorText);
    colorHelpers.append(colorHelper);
  }
  tableHeader.append(title, colorHelpers);
  const newTableHead = document.createElement("thead");
  const newTableHeadRow = document.createElement("tr");
  for (const th of oldTableRows[1].getElementsByTagName("th")) {
    const newTh = document.createElement("th");
    newTh.style.textAlign = th.style.textAlign;
    newTh.style.width = th.style.width;
    newTh.innerText = th.innerText.trim();
    newTableHeadRow.append(newTh);
  }
  newTableHead.appendChild(newTableHeadRow);
  const newTableBody = document.createElement("tbody");
  for (const oldRow of oldTableRows) {
    const cells = oldRow.getElementsByTagName("td");
    if (cells.length < 11)
      continue;
    const newRow = document.createElement("tr");
    for (const cell of cells) {
      const newCell = document.createElement("td");
      newCell.style.textAlign = cell.style.textAlign;
      newCell.style.width = cell.style.width;
      newCell.innerText = cell.innerText;
      newRow.appendChild(newCell);
    }
    const computedStyleCell = window.getComputedStyle(cells[0]);
    const backgroundColorCell = computedStyleCell.getPropertyValue("background-color");
    switch (true) {
      case backgroundColorCell === "rgb(173, 173, 173)":
        newRow.className = "meta";
        break;
      case backgroundColorCell === "rgb(221, 221, 221)":
        newRow.className = "module";
        break;
      case Number.parseFloat(cells[3].textContent?.trim().replace(",", ".") || "") === 5:
        newRow.className = "exam-nopass";
        break;
      default:
        newRow.className = "exam";
    }
    newTableBody.appendChild(newRow);
  }
  newTable.append(caption, newTableHead, newTableBody);
  oldTable.parentNode?.insertBefore(newTable, oldTable);
  const _dataTable = new DataTable(newTable, {
    sortable: true,
    searchable: false,
    paging: false,
    columns: [
      {select: 10, type: "date", format: "DD.MM.YYYY"}
    ]
  });
})();
