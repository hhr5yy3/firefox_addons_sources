const wordsBlackList = (
  "а, без, более, бы, был, была, были, было, быть, в, вам, вас, " +
  "весь, во, вот, все, всего, всех, вы, где, да, даже, для, до, " +
  "его, ее, если, есть, еще, же, за, здесь, и, из, или, им, их, к, " +
  "как, ко, когда, кто, ли, либо, мне, может, мы, на, надо, наш, не, " +
  "него, нее, нет, ни, них, но, ну, о, об, однако, он, она, они, " +
  "оно, от, очень, по, под, при, с, со, так, также, такой, там, те, " +
  "тем, то, того, тоже, той, только, том, ты, у, уже, хотя, чего, " +
  "чей, чем, что, чтобы, чье, чья, эта, эти, это, я, и, " +
  "a, adj, ago, all, am, an, and, any, are, as, a's, ask, at, be, " +
  "but, by, can, co, co., com, c's, did, do, edu, eg, end, et, etc, " +
  "ex, f, far, few, for, get, go, got, had, has, he, her, hi, him, " +
  "his, how, i'd, ie, if, i'm, in, inc, is, it, its, let, low, ltd, " +
  "may, me, mr, mrs, my, nd, new, no, non, nor, not, now, of, off, oh, " +
  "ok, old, on, one, or, our, out, own, per, que, qv, r, rd, re, saw, " +
  "say, see, she, six, so, sub, sup, th, the, to, too, try, t's, two, " +
  "un, up, us, use, via, viz, vs, was, way, we, who, why, yes, yet, you"
).split(", ");

let allResults;
let contentFilterString;

function wordsAnalyze() {
  executeOnActiveTab(() => {
    const {
      userAgent,
      appName,
      appVersion
    } = navigator || {}
    return {
      text: document.body.innerText.toLowerCase(),
      contentText: document.documentElement.innerText,
      htmlText: document.documentElement.innerHTML,
      userAgent,
      appName,
      appVersion,
    }
  }).then(
    /**
     * @param {string} text
     */
    ({ text="", contentText="", htmlText="", userAgent="", appName="", appVersion="" }) => {
      const totalTextLength = text.length;
      const contentTextLength = contentText.length;
      const htmlTextLength = htmlText.length;

      const cleanText = text
        .replace(/[^a-zA-Z0-9а-яА-ЯёЁ\-\s]/g, " ")
        .replace(/\s+/g, " ");
      const cleanTextLength = cleanText.length;

      const words = text.match(/[а-яА-ЯёЁa-zA-Z0-9\-]+/gm) || [];
      const uniqueWords = [...new Set(words)];
      const coreWords = uniqueWords.filter(
        (word) => !wordsBlackList.includes(word)
      );

      const totalWordsCount = words.length;
      const cleanWordsCount = uniqueWords.length;
      const coreWordsCount = coreWords.length;

      const waterWords = words.filter((word) => wordsBlackList.includes(word));
      const waterWordsCount = waterWords.length;

      const wordsCounter = new Map();
      words.forEach((word) =>
        wordsCounter.set(word, (wordsCounter.get(word) || 0) + 1)
      );

      const notSingleWords = [];
      wordsCounter.forEach((value, key) => {
        if (value > 1) {
          notSingleWords.push({
            word: key,
            count: value,
          });
        }
      });

/*      const browserNameWithVersion = UaManager.detectBrowserByUserAgent({
        userAgent,
        appName,
        appVersion,
      })

      const browserName = browserNameWithVersion ? browserNameWithVersion.split(' ')[0] : ''

      api.storage.local
          .get([
            "customUserAgent",
            "customUserAgentLabel",
          ])
          .then(async ({ customUserAgent, customUserAgentLabel}) => {
            let userAgent
            if(customUserAgentLabel && customUserAgent && customUserAgent !== 'Disabled') {
              userAgent = customUserAgentLabel
            } else {
              userAgent = browserName;
            }
            print("user-agent",  userAgent);
          })*/

      const topWordsCount = notSingleWords.length;
      const waterPercent = (waterWordsCount / totalWordsCount) * 100;
      const nauseaIndex = topWordsCount > 7 ? Math.sqrt(topWordsCount) : 2.64;
      const plainTextPercent = Math.round(contentTextLength / htmlTextLength * 100);

      print("total-text-length", totalTextLength.toLocaleString(locale));
      print("clean-text-length", cleanTextLength.toLocaleString(locale));
      print("total-words-count", totalWordsCount.toLocaleString(locale));
      print("clean-words-count", cleanWordsCount.toLocaleString(locale));
      print("core-words-count", coreWordsCount.toLocaleString(locale));
      print(
        "water-percent",
        `${Number(waterPercent.toFixed(1)).toLocaleString(locale)}%`
      );
      print("nausea-index", Number(nauseaIndex.toFixed(2)).toLocaleString(locale));
      print("plain-text-index", `${plainTextPercent}%`);

      const textLengthIndicator = document.querySelector(
        "#text-length-indicator"
      );

      if (between(totalTextLength, 1500, 35000)) {
        textLengthIndicator.classList.add("status-indicator--good");
      } else if (between(totalTextLength, 500, 45000)) {
        textLengthIndicator.classList.add("status-indicator--warning");
      } else {
        textLengthIndicator.classList.add("status-indicator--bad");
      }

      const waterPercentIndicator = document.querySelector(
        "#water-percent-indicator"
      );

      if (between(waterPercent, 0, 15)) {
        waterPercentIndicator.classList.add("status-indicator--good");
      } else if (between(waterPercent, 15, 30)) {
        waterPercentIndicator.classList.add("status-indicator--warning");
      } else {
        waterPercentIndicator.classList.add("status-indicator--bad");
      }

      const nauseaIndexIndicator = document.querySelector(
        "#nausea-index-indicator"
      );

      if (between(nauseaIndex, 5, 15)) {
        nauseaIndexIndicator.classList.add("status-indicator--good");
      } else if (between(nauseaIndex, 0, 30)) {
        nauseaIndexIndicator.classList.add("status-indicator--warning");
      } else {
        nauseaIndexIndicator.classList.add("status-indicator--bad");
      }

      const plainTextIndexIndicator = document.querySelector(
        "#plain-text-index-indicator"
      );

      if (between(plainTextPercent, 51, 100)) {
        plainTextIndexIndicator.classList.add("status-indicator--good");
      } else if (between(plainTextPercent, 11, 50)) {
        plainTextIndexIndicator.classList.add("status-indicator--warning");
      } else {
        plainTextIndexIndicator.classList.add("status-indicator--bad");
      }

      document.dispatchEvent(
        new CustomEvent("gettingContentInfo", {
          detail: {
            waterPercent: waterPercent,
            nauseaIndex: nauseaIndex,
          },
        })
      );
    }
  );
}

function generateWordStats(
  { word, count, percent, corePercent, relevance },
  index
) {
  const row = document.createElement("tr");
  row.classList.add("content__row");
  row.innerHTML = document.querySelector(
    "template#content-word-stats"
  ).innerHTML;

  row.querySelector(".content__word-index").innerHTML = index + 1;
  row.querySelector(".content__word").innerHTML = word;
  row.querySelector(".content__word-matches").innerHTML = count;
  row.querySelector(".content__word-relevance").innerHTML =
    relevance.toFixed(1);
  row.querySelector(".content__word-core-percent").innerHTML =
    corePercent.toFixed(1);
  row.querySelector(".content__word-percent").innerHTML = percent.toFixed(1);

  return row;
}

function tableGenerate(wordsCount, page = 0) {
  executeOnActiveTab(() => {
    return document.body.innerText.toLowerCase();
  }).then((text) => {
    const api = typeof browser !== "undefined" ? browser : chrome;

    /** @type {string} */
    const cleanText = text
      .replace(/[^a-zA-Zа-яА-ЯёЁ\-\s']/g, " ")
      .replace(" - ", " ")
      .replace(/\s+/g, " ");
    const words = cleanText.split(/\s/);

    const wordsFiltered = words.filter((word) => word.trim().length > 0);
    const wordsCore = wordsFiltered.filter(
      (word) => !wordsBlackList.includes(word)
    );

    const wordsLength = wordsFiltered.length / wordsCount;
    const wordsCoreLength = wordsCore.length / wordsCount;

    const nausea = Number(
      document
        .querySelector('span[data-print="nausea-index"]')
        .innerHTML.replace(",", ".")
    );

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

      const searchRegExp = new RegExp(`[\\s]${searchString}[\\s\\.,]`, "gm");

      const matches = cleanText.split(searchRegExp).length - 1;

      result.push({
        word: searchString,
        count: matches,
        percent: (matches / wordsLength) * 100,
        corePercent: (matches / wordsCoreLength) * 100,
        relevance: matches / nausea,
      });
    }

    result.sort((a, b) => {
      return b.count - a.count;
    });

    const filteredResults = result.filter(
      ({ word }) => !wordsBlackList.includes(word)
    );

    allResults = filteredResults;

    contentTableRender(page);
  });
}

function contentTableRender(page) {
  const wordsList = document.querySelector("#content-words-list tbody");
  wordsList.innerHTML = "";

  const itemsPerPage = 16;
  const offset = page * itemsPerPage;

  const resultsWithIndex = allResults.map((word, index) =>
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

  const paginationContainer = document.querySelector(".content__pagination");
  paginationContainer.innerHTML = "";

  const maxPages = Math.ceil(filteredResults.length / itemsPerPage);

  if (maxPages > 1) {
    paginationContainer.append(paginationRender(page, maxPages));
  }
}

function paginationRender(page, maxPages) {
  const pagination = document.createElement("div");
  pagination.classList.add("pagination");
  pagination.innerHTML = document.querySelector(
    "#content-pagination"
  ).innerHTML;

  const isFirstPage = page <= 0;
  const isLastPage = page >= maxPages - 1;

  const firstPageEl = pagination.querySelector(".pagination__first-page");
  if (isFirstPage) firstPageEl.removeAttribute("href");
  firstPageEl.addEventListener("click", () => contentTableRender(0));

  const lastPageEl = pagination.querySelector(".pagination__last-page");
  if (isLastPage) lastPageEl.removeAttribute("href");
  lastPageEl.innerHTML = maxPages;
  lastPageEl.addEventListener("click", () => contentTableRender(maxPages - 1));

  const backEl = pagination.querySelector(".pagination__back");
  if (isFirstPage) backEl.removeAttribute("href");
  backEl.addEventListener("click", () =>
    contentTableRender(Math.max(0, page - 1))
  );

  const nextEl = pagination.querySelector(".pagination__forward");
  if (isLastPage) nextEl.removeAttribute("href");
  nextEl.addEventListener("click", () =>
    contentTableRender(Math.min(maxPages - 1, page + 1))
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
      contentTableRender(i);
    });

    pagesContainer.append(pageEl);
  }

  const firstEllipsisEl = pagination.querySelector(
    ".pagination__first-ellipsis"
  );
  firstEllipsisEl.hidden = page <= 1 + halfRow || maxPages < visiblePages;

  const lastEllipsisEl = pagination.querySelector(".pagination__last-ellipsis");
  lastEllipsisEl.hidden =
    page >= maxPages - 1 - halfRow || maxPages - 2 <= visiblePages;

  return pagination;
}

function exportToCSV() {
  if (!allResults) return;

  const rowsFormatted = allResults.map((result) => [
    result.word,
    result.count,
    result.relevance.toFixed(2).replace(".", ","),
    result.corePercent.toFixed(2).replace(".", ","),
    result.percent.toFixed(2).replace(".", ","),
  ]);

  rowsFormatted.unshift([
    translate("contentWord"),
    translate("contentWordsCount"),
    translate("contentWordsRelevance"),
    translate("contentWordsCorePercent"),
    translate("contentWordsPercent"),
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

/** @returns {any[]} */
function getTopAnchors() {
  const countOccurrences = (arr) => {
    return arr.reduce((acc, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {});
  };

  return executeOnActiveTab(() => {
    const links = Array.from(document.querySelectorAll("a"));

    return links
      .map((link) => link.innerText.toLowerCase())
      .join(" ")
      .split(/\s/);
  }).then(
    /** @param {string[]} links  */
    (links) => {
      const filteredLinks = links.filter(
        (link) => link.length > 3 && !wordsBlackList.includes(link)
      );
      const result = countOccurrences(filteredLinks);

      const sortedResult = Object.keys(result).map((key) => ({
        word: key,
        count: result[key],
      }));
      sortedResult.sort((a, b) => b.count - a.count);

      return sortedResult;
    }
  );
}

async function renderTopAnchors() {
  const top = (await getTopAnchors()).slice(0, 10);

  const tbody = document.querySelector(".content__top-anchors tbody");
  tbody.innerHTML = "";

  top.forEach((item) => {
    const row = document.createElement("tr");

    const word = document.createElement("td");
    word.innerHTML = item.word;

    const count = document.createElement("td");
    count.classList.add("right");
    count.innerHTML = item.count;

    row.append(word, count);
    tbody.append(row);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  wordsAnalyze();
  tableGenerate(1);
  renderTopAnchors();

  const buttons = document.querySelectorAll(".content__button");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((btn) =>
        btn.classList.remove("content__button--selected")
      );
      button.classList.add("content__button--selected");
      const wordsCount = button.getAttribute("data-words-count");
      tableGenerate(Number(wordsCount));
    });
  });

  document
    .querySelector("#export-words-to-csv-button")
    .addEventListener("click", () => {
      exportToCSV();
    });

  const filterField = document.querySelector("#content-words-filter");
  filterField.addEventListener("input", () => {
    contentFilterString = filterField.value;
    contentTableRender(0);
  });
});
