(() => {
  let searchResults;
  let contentFilterString;

  function renderContentTable(data, content, page = 0) {
    const wordsList = content.querySelector(".photos__words-list tbody");
    wordsList.innerHTML = "";

    const itemsPerPage = 15;
    const offset = page * itemsPerPage;

    const resultsWithIndex = data.map((word, index) =>
      Object.assign(word, {
        index: index,
      })
    );

    const filteredResults = resultsWithIndex.filter((w) =>
      w.word.includes(contentFilterString || "")
    );

    const shownResults = filteredResults.slice(offset, offset + itemsPerPage);
    shownResults.forEach((word) => {
      wordsList.append(generateWordStats(word, word.index));
    });

    const paginationContainer = content.querySelector(".photos__pagination");
    paginationContainer.innerHTML = "";

    const maxPages = Math.ceil(filteredResults.length / itemsPerPage);

    if (maxPages > 1) {
      paginationContainer.append(
        paginationRender(data, content, page, maxPages)
      );
    }
  }

  function generateWordStats({ word, count }, index) {
    const row = document.createElement("tr");
    row.classList.add("photos__row");
    row.innerHTML = document.querySelector(
      "template#photo-word-stats"
    ).innerHTML;

    row.querySelector(".photos__word-index").innerHTML = index + 1;
    row.querySelector(".photos__word").innerHTML = word;
    row.querySelector(".photos__word-matches").innerHTML = count;

    return row;
  }

  function paginationRender(data, content, page, maxPages) {
    const pagination = document.createElement("div");
    pagination.classList.add("pagination");
    pagination.innerHTML = document.querySelector(
      "#content-pagination"
    ).innerHTML;

    const isFirstPage = page <= 0;
    const isLastPage = page >= maxPages - 1;

    const firstPageEl = pagination.querySelector(".pagination__first-page");
    if (isFirstPage) firstPageEl.removeAttribute("href");
    firstPageEl.addEventListener("click", () =>
      renderContentTable(data, content, 0)
    );

    const lastPageEl = pagination.querySelector(".pagination__last-page");
    if (isLastPage) lastPageEl.removeAttribute("href");
    lastPageEl.innerHTML = maxPages;
    lastPageEl.addEventListener("click", () =>
      renderContentTable(data, content, maxPages - 1)
    );

    const backEl = pagination.querySelector(".pagination__back");
    if (isFirstPage) backEl.removeAttribute("href");
    backEl.addEventListener("click", () =>
      renderContentTable(data, content, Math.max(0, page - 1))
    );

    const nextEl = pagination.querySelector(".pagination__forward");
    if (isLastPage) nextEl.removeAttribute("href");
    nextEl.addEventListener("click", () =>
      renderContentTable(data, content, Math.min(maxPages - 1, page + 1))
    );

    const visiblePages = 13;
    const halfRow = Math.floor(visiblePages / 2);

    let startIndex;

    if (page - halfRow >= 1 && page + halfRow < maxPages - 1) {
      startIndex = page - halfRow;
    } else if (page - halfRow < 1) {
      startIndex = 1;
    } else {
      startIndex = maxPages - 1 - Math.min(visiblePages, maxPages - 2);
    }

    const pagesContainer = pagination.querySelector(".pagination__pages");
    for (let i = startIndex; i < startIndex + visiblePages; i++) {
      if (i >= maxPages - 1) break;

      const pageEl = document.createElement("a");
      pageEl.classList.add("pagination__link");
      pageEl.innerHTML = i + 1;
      if (i !== page) {
        pageEl.href = "#";
      }

      pageEl.addEventListener("click", () => {
        renderContentTable(data, content, i);
      });

      pagesContainer.append(pageEl);
    }

    const firstEllipsisEl = pagination.querySelector(
      ".pagination__first-ellipsis"
    );
    firstEllipsisEl.hidden = page <= 1 + halfRow || maxPages < visiblePages;

    const lastEllipsisEl = pagination.querySelector(
      ".pagination__last-ellipsis"
    );
    lastEllipsisEl.hidden =
      page >= maxPages - 1 - halfRow || maxPages - 2 <= visiblePages;

    return pagination;
  }

  async function getPicturesFromGoogle(searchQuery) {
    if (!searchQuery) return [];

    const url = `https://www.google.com/search?tbm=isch&q=${encodeURI(
      searchQuery
    )}`;

    const content = await (await fetch(url)).text();
    const html = new DOMParser().parseFromString(content, "text/html");

    const images = html.querySelectorAll(".EZAeBe");

    const rows = [];

    images.forEach((image) => {
      const href = image.href;
      const title = image.querySelector(".JMWMJ").innerText;

      rows.push({ href, title });
    });

    return rows;
  }

  async function getPicturesFromBing(searchQuery) {
    if (!searchQuery) return [];

    const url = `https://www.bing.com/images/search?q=${encodeURI(
      searchQuery
    )}`;

    const content = await (await fetch(url)).text();
    const html = new DOMParser().parseFromString(content, "text/html");

    const images = html.querySelectorAll(".iuscp.isv");

    const rows = [];

    images.forEach((image) => {
      const href = image.querySelector(".lnkw > a")?.href;
      const title = image.querySelector(".infnmpt")?.innerText;
      rows.push({ href, title });
    });

    return rows;
  }

  async function getPicturesFromYandex(searchQuery) {
    if (!searchQuery) return [];

    const url = `https://yandex.ru/images/search?text=${encodeURI(
      searchQuery
    )}`;

    const content = await (await fetch(url)).text();

    const html = new DOMParser().parseFromString(content, "text/html");
    const roots = html.querySelectorAll(".Root");

    const root = roots[1];

    const state = JSON.parse(root.getAttribute("data-state"));
    const items = Object.values(state.initialState.serpList.items.entities);

    const rows = [];
    items.forEach((item) => {
      rows.push({
        title: item.snippet.title,
        href: item.snippet.url,
      });
    });

    return rows;
  }

  function generatePictureRow(row, index) {
    const tr = document.createElement("tr");

    const num = document.createElement("td");
    num.innerHTML = index;

    const title = document.createElement("td");
    title.innerHTML = row.title;
    title.title = row.title;

    const href = document.createElement("td");
    const url = decodeURI(row.href);
    href.innerHTML = `<a href="${row.href}" target="_blank">${reduceLink(
      url,
      36
    )}</a>`;
    href.title = url;

    tr.append(num, title, href);

    return tr;
  }

  async function findImagesAndRenderTable() {
    const searchEngine = document.querySelector(
      'input[name="photos-search"]:checked'
    ).value;

    let rows;

    const searchQuery =
      document.querySelector("#photos-search-query-input").value || "";

    switch (searchEngine) {
      case "google":
        rows = await getPicturesFromGoogle(searchQuery);
        break;
      case "bing":
        rows = await getPicturesFromBing(searchQuery);
        break;
      case "yandex":
        rows = await getPicturesFromYandex(searchQuery);
        break;
      default:
        rows = await getPicturesFromGoogle(searchQuery);
        break;
    }

    const results = document.querySelector("#photos-results tbody");
    results.innerHTML = "";

    rows?.forEach((row, index) => {
      results.append(generatePictureRow(row, index + 1));
    });

    searchResults = rows;

    const analyzeButton = document.querySelector("#analyze-photos");
    analyzeButton.disabled = !searchResults || !searchResults.length;
  }

  function analyzeContent(wordsCount) {
    if (!searchResults) return;

    const titles = searchResults.map((row) => row.title);
    const text = titles.join(" ");

    /** @type {string} */
    const cleanText = text
      .toLowerCase()
      .replace(/[^a-zA-Zа-яА-ЯёЁ\-\s']/g, " ")
      .replace(" - ", " ")
      .replace(/\s+/g, " ");

    const words = cleanText.split(/\s/);
    const wordsFiltered = words.filter((word) => word.trim().length > 0);

    const result = [];
    for (let i = 0; i < wordsFiltered.length; i++) {
      const items = wordsFiltered.slice(i, i + wordsCount);
      if (items.length < wordsCount) break;

      const filteredBadWords = items.filter(
        (item) => !wordsBlackList.includes(item) && item.length > 1
      );
      if (filteredBadWords.length === 0) continue;

      const searchString = items.join(" ");
      if (searchString.length <= 1) continue;
      if (result.find(({ word }) => word === searchString)) continue;

      const matches = cleanText.split(searchString).length - 1;

      result.push({
        word: searchString,
        count: matches,
      });
    }

    result.sort((a, b) => {
      return b.count - a.count;
    });

    const filteredResults = result.filter(
      ({ word }) => !wordsBlackList.includes(word)
    );

    return filteredResults;
  }

  function exportToCSV(data) {
    if (!data) return;

    const rowsFormatted = data.map((result) => [result.word, result.count]);

    rowsFormatted.unshift([
      translate("contentWord"),
      translate("contentWordsCount"),
    ]);

    rowsFormatted.push([]);
    rowsFormatted.push(["Created by SiteAnalyzer SEO Tools"]);

    let csvContent =
      "data:text/csv;charset=utf-8,\uFEFF" +
      rowsFormatted.map((e) => e.join(";")).join("\n");

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
        `${punycode.ToUnicode(hostname)}_export_words.csv`
      );
      link.click();
    });
  }

  function startAnalyzeAndShowWindow() {
    const title = document.createElement("span");
    title.setAttribute("data-translated", "content");
    title.innerHTML = translate("content");

    const template = document.querySelector("template#photos-window");

    const content = document.createElement("div");
    content.innerHTML = template.innerHTML;

    let data = analyzeContent(1);
    renderContentTable(data, content);

    const buttons = content.querySelectorAll(".photos__button");
    buttons.forEach(
      /** @param {HTMLButtonElement} button */
      (button) => {
        button.onclick = () => {
          buttons.forEach((btn) =>
            btn.classList.remove("photos__button--selected")
          );
          button.classList.add("photos__button--selected");
          const wordsCount = button.getAttribute("data-words-count");
          data = analyzeContent(Number(wordsCount));
          renderContentTable(data, content);
        };
      }
    );

    content
      .querySelector("#export-photos-words-to-csv")
      .addEventListener("click", () => {
        exportToCSV(data);
      });

    const filterField = content.querySelector("#photos-words-filter");
    filterField.addEventListener("input", () => {
      contentFilterString = filterField.value;
      renderContentTable(data, content);
    });

    showModal(translateElement(content), title);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.querySelector("#search-photos");
    searchButton.addEventListener("click", () => {
      findImagesAndRenderTable();
    });

    const analyzeButton = document.querySelector("#analyze-photos");
    analyzeButton.addEventListener("click", () => {
      startAnalyzeAndShowWindow();
    });

    /** @type {HTMLFormElement} */
    const form = document.querySelector("form.photos__search");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      return false;
    });

    /** @type {HTMLInputElement[]} */
    const searchEngines = document.querySelectorAll(
      'input[name="photos-search"]'
    );

    searchEngines.forEach((searchEngine) => {
      searchEngine.addEventListener("change", () => {
        if (!searchEngine.checked) return;

        const label = document.querySelector(`label[for="${searchEngine.id}"]`);
        print("photos-search-engine", label.outerHTML);
      });
    });

    document
      .querySelector('input[name="photos-search"]:checked')
      .dispatchEvent(new Event("change"));
  });
})();
