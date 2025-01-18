const currentView = document.location.pathname;
const popupScriptsRegex = /dl_popUp\("\/scripts\/mgrqispi\.dll\?APPNAME=CampusNet&PRGNAME=(\w+)&ARGUMENTS=([^"]+)"/;
function scriptToURL(script) {
  const matches = script.match(popupScriptsRegex);
  const porgamName = matches.at(1);
  const prgArguments = matches.at(2);
  return `https://selma.tu-dresden.de/APP/${porgamName}/${prgArguments}`;
}
function mapGrade(gradeElm) {
  const grade = gradeElm.textContent;
  if (grade.includes("be")) {
    gradeElm.textContent = "✔";
    gradeElm.setAttribute("title", "Bestanden");
  } else if (grade.includes("noch nicht gesetzt")) {
    gradeElm.textContent = "🕓";
    gradeElm.setAttribute("title", "Noch nicht gesetzt");
  }
}
function injectCSS(filename) {
  const style = document.createElement("link");
  style.rel = "stylesheet";
  style.type = "text/css";
  style.href = chrome.runtime.getURL(`styles/contentScripts/selma/${filename}.css`);
  (document.head || document.body || document.documentElement).appendChild(style);
}
var Graphing;
(function(Graphing2) {
  function maxGradeCount(values) {
    let max = 0;
    for (const {count} of values) {
      if (count > max)
        max = count;
    }
    return max;
  }
  function pickGradeSubset(values) {
    const increments = [1, 1.3, 1.7, 2, 2.3, 2.7, 3, 3.3, 3.7, 4, 5];
    const newValues = increments.map((inc) => ({
      grade: inc,
      count: 0
    }));
    let currentIncIndex = 0;
    for (const {grade, count} of values) {
      if (currentIncIndex !== increments.length - 1) {
        const nextIncrement = increments[currentIncIndex + 1];
        if (grade >= nextIncrement)
          currentIncIndex++;
      }
      newValues[currentIncIndex].count += count;
    }
    return newValues;
  }
  function createSVGGradeDistributionGraph(values, url, width = 200, height = 100) {
    const coarseValues = pickGradeSubset(values);
    const spacing = 0.1;
    const barWidth = width * (1 - spacing) / coarseValues.length;
    let barsSvg = "";
    const maxCount = maxGradeCount(coarseValues);
    for (let x = 0; x < coarseValues.length; x++) {
      const {grade, count} = coarseValues[x];
      const barHeight = count / maxCount * height;
      let className = "passed";
      if (grade >= 5)
        className = "failed";
      barsSvg += `
            <rect
              class="${className}"
              x="${x * barWidth * (1 + spacing)}" y="${height - barHeight}"
              width="${barWidth}" height="${barHeight}"
              rx="5" ry="5"
            >
              <title>${grade.toFixed(2)}</title>
            </rect>
          `;
    }
    return `
      <svg
        class="distribution-chart"
        viewBox="0 0 ${width} ${height}"
        xmlns="http://www.w3.org/2000/svg">
         <!-- Allows the user to still see the detailed grade overview page -->
        <a href="${url}" target="popup">
          <!-- Necessary so the whole chart is clickable -->
          <rect
            x="0" y="0" width="${width}" height="${height}"
            fill="transparent"
          />
          ${barsSvg}
        </a>
      </svg>
    `;
  }
  Graphing2.createSVGGradeDistributionGraph = createSVGGradeDistributionGraph;
  function createJExamTryCounter(tries, url, width = 200) {
    const spacing = 0.2;
    const strokeWidth = 0.12;
    const filledRadius = width * (1 - spacing) / 6;
    const strokedRadius = filledRadius * (1 - strokeWidth);
    const height = Math.ceil(2 * filledRadius) + 1;
    let svgContent = "";
    for (let x = 0; x < 3; x++) {
      let className = "used";
      let tooltip = "";
      if (x >= tries.length) {
        className = "open";
      } else {
        const {date, grade} = tries[x];
        tooltip = `<title>${grade}
${date}</title>`;
      }
      svgContent += `
            <circle
              class="${className}"
              stroke-width="${strokeWidth * height}"
              cx="${2 * x * filledRadius * (1 + spacing) + filledRadius}"
              cy="${filledRadius}"
              r="${className === "used" ? filledRadius : strokedRadius}"
            >
              ${tooltip}
            </circle>
          `;
    }
    return `
      <svg
        class="tries-counter"
        viewBox="0 0 ${width} ${height}"
        xmlns="http://www.w3.org/2000/svg">
         <!-- Allows the user to still see the detailed grade overview page -->
        <a href="${url}" target="popup">
          <!-- Necessary so the whole chart is clickable -->
          <rect
            x="0" y="0" width="${width}" height="${height}"
            fill="transparent"
          />
          ${svgContent}
        </a>
      </svg>
    `;
  }
  Graphing2.createJExamTryCounter = createJExamTryCounter;
})(Graphing || (Graphing = {}));
async function createCreditsBanner() {
  const {improveSelma: settingEnabled} = await chrome.storage.local.get(["improveSelma"]);
  const imgUrl = chrome.runtime.getURL("/assets/images/tufast48.png");
  const credits = document.createElement("p");
  credits.style.margin = "auto";
  credits.style.marginRight = "0";
  credits.style.color = "#002557";
  credits.id = "TUfastCredits";
  credits.innerHTML = `Table ${settingEnabled ? "powered by" : "disabled"}
    <img src="${imgUrl}" style="position:relative; right: 2px; height: 0.7lh; top: 0.15lh; padding-left: 0.1lh;">
    <a href="https://www.tu-fast.de" target="_blank">TUfast</a>
    by <a href="https://github.com/A-K-O-R-A" target="_blank">AKORA</a>
    `;
  const disableButton = document.createElement("button");
  disableButton.setAttribute("style", `
    border: 1px solid rgb(255, 255, 255);
    color: rgb(221, 39, 39);
    text-decoration: none;
    padding: 0.5rem 1rem;
    margin: 0 1rem;
    border-radius: 0px;
    `);
  disableButton.title = 'Toggle the "ImproveSelma" feature and reload the page to apply the change.';
  disableButton.textContent = settingEnabled ? "Deactivate" : "Activate";
  disableButton.onclick = async (event) => {
    event.preventDefault();
    await chrome.storage.local.set({improveSelma: !settingEnabled});
    window.location.reload();
  };
  credits.appendChild(disableButton);
  return credits;
}
(async () => {
  const {improveSelma} = await chrome.storage.local.get(["improveSelma"]);
  document.addEventListener("DOMContentLoaded", async () => {
    const creditElm = await createCreditsBanner();
    document.querySelector(".semesterChoice").appendChild(creditElm);
    if (!improveSelma)
      return;
    eventListener();
  });
})();
async function eventListener() {
  document.removeEventListener("DOMContentLoaded", eventListener);
  injectCSS("base");
  if (currentView.startsWith("/APP/EXAMRESULTS/") || currentView.startsWith("/APP/COURSERESULTS/")) {
    injectCSS("exam_results");
  }
  if (currentView.startsWith("/APP/MYEXAMS/")) {
    injectCSS("my_exams");
  }
  applyChanges();
}
function applyChanges() {
  if (currentView.startsWith("/APP/EXAMRESULTS/")) {
    const headRow = document.querySelector("thead>tr");
    headRow.removeChild(headRow.children.item(3));
    headRow.children.item(3).textContent = "Notenverteilung";
    const body = document.querySelector("tbody");
    const promises = [];
    for (const row of body.children) {
      for (const col of row.children)
        col.removeAttribute("style");
      row.removeChild(row.children.item(3));
      const lastCol = row.children.item(3);
      const scriptElm = lastCol.children.item(1);
      if (scriptElm === null)
        continue;
      const scriptContent = scriptElm.innerHTML;
      const url = scriptToURL(scriptContent);
      promises.push(fetch(url).then(async (s) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(await s.text(), "text/html");
        return {doc, elm: lastCol, url};
      }));
    }
    promises.forEach((p) => p.then(({doc, elm, url}) => {
      const tableBody = doc.querySelector("tbody");
      const values = [...tableBody.children].map((tr) => {
        const gradeText = tr.children.item(0).textContent.replace(",", ".");
        const grade = parseFloat(gradeText);
        const countText = tr.children.item(1).textContent;
        let count;
        if (countText === "---")
          count = 0;
        else
          count = parseInt(countText);
        return {
          grade,
          count
        };
      });
      const graphSVG = Graphing.createSVGGradeDistributionGraph(values, url);
      elm.innerHTML = graphSVG;
    }));
    const tableHeadRow = document.querySelector("thead>tr");
    tableHeadRow.children.item(3).removeAttribute("style");
  } else if (currentView.startsWith("/APP/COURSERESULTS/")) {
    const headRow = document.querySelector("thead>tr");
    headRow.removeChild(headRow.children.item(3));
    {
      headRow.children.item(3).removeAttribute("colspan");
      const newHeader = document.createElement("th");
      newHeader.textContent = "Notenverteilung";
      headRow.appendChild(newHeader);
    }
    const body = document.querySelector("tbody");
    const promises = [];
    for (const row of body.children) {
      for (const col of row.children)
        col.removeAttribute("style");
      row.removeChild(row.children.item(3));
      {
        const gradeElm = row.children.item(2);
        mapGrade(gradeElm);
      }
      const lastCol = row.children.item(4);
      const scriptElm = lastCol.children.item(1);
      if (scriptElm === null)
        continue;
      const scriptContent = scriptElm.innerHTML;
      const url = scriptToURL(scriptContent);
      promises.push(fetch(url).then(async (s) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(await s.text(), "text/html");
        return {doc, elm: lastCol, url};
      }));
    }
    promises.forEach((p) => p.then(({doc, elm, url}) => {
      const tableBody = doc.querySelector("tbody");
      const values = [...tableBody.children].map((tr) => {
        const gradeText = tr.children.item(0).textContent.replace(",", ".");
        const grade = parseFloat(gradeText);
        const countText = tr.children.item(1).textContent;
        let count;
        if (countText === "---")
          count = 0;
        else
          count = parseInt(countText);
        return {
          grade,
          count
        };
      });
      const graphSVG = Graphing.createSVGGradeDistributionGraph(values, url);
      elm.innerHTML = graphSVG;
    }));
    const tableHeadRow = document.querySelector("thead>tr");
    tableHeadRow.children.item(3).removeAttribute("style");
    for (const row of body.children) {
      const linkElm = row.children.item(3);
      const scriptElm = linkElm.children.item(1);
      if (scriptElm === null)
        continue;
      const scriptContent = scriptElm.innerHTML;
      const url = scriptToURL(scriptContent);
      linkElm.setAttribute("style", "text-align: center;");
      fetch(url).then(async (s) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(await s.text(), "text/html");
        const tableBody = doc.querySelector("tbody");
        const tries = [];
        for (let i = 0; i < tableBody.children.length; i++) {
          const trElm = tableBody.children.item(i);
          const firstTd = trElm.querySelector("td.level02");
          if (firstTd !== null && firstTd.textContent === "Modulprüfung") {
            let nextTrElm = tableBody.children.item(i + 1);
            if (nextTrElm.children.length === 1) {
              nextTrElm = tableBody.children.item(i + 2);
            }
            const date = nextTrElm.children.item(2).textContent.trim();
            const grade = nextTrElm.children.item(3).textContent.trim();
            tries.push({date, grade});
            i += 2;
            continue;
          }
        }
        if (tries.length === 0)
          return;
        linkElm.innerHTML = Graphing.createJExamTryCounter(tries, url);
      });
    }
  } else if (currentView.startsWith("/APP/MYEXAMS/")) {
    const body = document.querySelector("tbody");
    const rows = [...body.children];
    for (let i = 0; i < rows.length; i += 2) {
      const topRow = rows[i];
      const botRow = rows[i + 1];
      const thElm = topRow.children.item(0);
      thElm.className += " module-description";
      const [, , , , description] = thElm.childNodes;
      {
        thElm.setAttribute("colspan", "2");
        const newSpacer = document.createElement("th");
        newSpacer.setAttribute("colspan", "2");
        newSpacer.replaceChildren(...botRow.children.item(1).children);
        topRow.appendChild(newSpacer);
      }
      {
        botRow.removeChild(botRow.children.item(1));
        const newDescriptionElm = botRow.children.item(0);
        newDescriptionElm.setAttribute("colspan", "2");
        newDescriptionElm.className += " module-description";
        if (thElm.childNodes.length === 5) {
          newDescriptionElm.appendChild(description);
        }
      }
      {
        const dateElm = botRow.children.item(1);
        dateElm.textContent = dateElm.textContent.replaceAll("00:00-00:00", "");
      }
      document.querySelector("thead > tr > th#Name").textContent = "";
      document.querySelector("thead > tr > th#Date").textContent = "Prüfungsleistung/Termin";
    }
  }
}
