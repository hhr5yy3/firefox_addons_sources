let sitemapUrlsForPageRank = [];
let finalPageRunResult = [];
let pageRankSortAsc = true;

function sortColumnByPageRank() {
  pageRankSortAsc = !pageRankSortAsc;
  if (pageRankSortAsc) {
    finalPageRunResult.sort((a, b) => a.pageRank - b.pageRank);
  } else {
    finalPageRunResult.sort((a, b) => b.pageRank - a.pageRank);
  }
  renderAllUrlsForPageRank(finalPageRunResult);
}

function getAllSitemapUrlsForPageRank(sitemapUrl) {
  return fetch(sitemapUrl, { signal: AbortSignal.timeout(5000) })
    .then((response) => (response.ok ? response.text() : []))
    .then(async (sitemapContent) => {
      const parser = new DOMParser();
      const sitemapXML = parser.parseFromString(sitemapContent, "text/xml");

      const urls = [];

      const sitemaps = sitemapXML.querySelectorAll("sitemap");
      for (const sitemap of sitemaps) {
        urls.push(
          ...(await getAllSitemapUrlsForPageRank(
            sitemap.querySelector("loc").innerHTML
          ))
        );
      }

      const urlElements = sitemapXML.querySelectorAll("url");
      urlElements.forEach((url) => {
        const lastmod = url.querySelector("lastmod")?.innerHTML;
        urls.push({
          location: url.querySelector("loc").innerHTML,
          lastmod: lastmod ? new Date(lastmod) : null,
        });
      });

      return urls;
    })
    .catch(() => []);
}

function setPageRankProgress(current, max) {
  const progressContainer = document.querySelector("#pageRank-crawl-progress");
  const progressLine = progressContainer.querySelector(".progress-bar__progress");

  if (current === 0) {
    progressLine.style.width = `${0}}%`;
    return;
  }

  progressLine.style.width = `${Math.min((current / max) * 100, 100)}%`;
}

function updateIterationsCount(count) {
  print("total-pageRank-iterated", `${count}`.toLocaleString(locale));
}

function updateLinksCount(count) {
  print("total-pageRank-links-crawled", `${count}`.toLocaleString(locale));
}

function updateLinksAll(count) {
  print("total-pageRank-links-crawled-all", `${count}`.toLocaleString(locale));
}

/**
 *
 * @param {string} key
 * @param {*} data
 * @returns
 */
function generateSitemapUrlRowForPageRank(
  url,
  status = "n/a",
  linksCount = "n/a",
  pageRank = "n/a"
) {
  const row = document.createElement("tr");

  const pathSegment = document.createElement("td");
  pathSegment.title = url;
  pathSegment.innerHTML = `<a href="${url}" target="_blank">${url}</a>`;

  const statusSegment = document.createElement("td");
  statusSegment.innerHTML = +status >= 200 && +status < 400 ? status : "n/a";

  const linksCountSegment = document.createElement("td");
  linksCountSegment.innerHTML = linksCount;

  const pageRankLevelSegment = document.createElement("td");
  pageRankLevelSegment.innerHTML =
    pageRank === "n/a" ? pageRank : pageRank.toFixed(6);

  if (pageRank !== "n/a") {
    pageRankLevelSegment.classList.add("pageRankLevelSegment-to-right");
  }

  row.append(
    pathSegment,
    statusSegment,
    linksCountSegment,
    pageRankLevelSegment
  );

  return row;
}

function renderAllUrlsForPageRank(urls) {
  const sitemapTbody = document.querySelector(
    "#pageRank-segments-table .pageRank-tbody"
  );
  sitemapTbody.innerHTML = "";

  urls.forEach((url) => {
    sitemapTbody.append(
      generateSitemapUrlRowForPageRank(
        url.location,
        url.status,
        url.outgoingLinks,
        url.pageRank
      )
    );
  });
}

function parseSitemapForPageRank() {
  const textTotalUrl = document.querySelector(".pageRank-text-total-url");
  const textTotalUrlCount = textTotalUrl.querySelector(".total-pageRank-urls-count");
  const textTotalUrlIterated = document.querySelector(".pageRank-text-total-url-iterations");
  const textTotalUrlCrawled = document.querySelector(".pageRank-text-total-url-links");
  textTotalUrl.style.display = "block";
  textTotalUrlIterated.style.display = "none";
  textTotalUrlCrawled.style.display = "none";

  const importButton = document.querySelector("#import-sitemap-pageRank-button");
  importButton.disabled = true;

  executeOnActiveTab(() => {
    return location.origin;
  })
    .then((origin) => {
      const robotsUrl = `${origin}/robots.txt`;
      return fetch(robotsUrl, { signal: AbortSignal.timeout(5000) })
        .then((response) => response.text())
        .then((robotsContent) => {
          const matches = robotsContent
            .toLocaleLowerCase()
            .match(/sitemap: ([^\n]+)/);
          return matches ? matches[1] : `${origin}/sitemap.xml`;
        })
        .catch(() => `${origin}/sitemap.xml`);
    })
    .then(getAllSitemapUrlsForPageRank)
    .then((sitemapUrls) => {
      renderAllUrlsForPageRank(
        sitemapUrls.map((url) => ({ location: url.location }))
      );

      sitemapUrlsForPageRank = sitemapUrls;

      const table = document.querySelector("#pageRank-segments-table");
      table.hidden = false;

      const pageRankCalculate = document.querySelector(
        "#calculate-pageRank-button"
      );
      pageRankCalculate.disabled = false;

      if (!sitemapUrls.length) {
        const tbody = table.querySelector(".pageRank-tbody");

        const tr = document.createElement("tr");
        tr.classList.add("tr-fluid");
        const td = document.createElement("td");
        td.colSpan = "4";
        td.innerHTML = `<span data-translate="cantProcessedSitemap">${translate(
          "cantProcessedSitemap"
        )}</span>`;

        tr.append(td);
        tbody.append(tr);

        pageRankCalculate.disabled = true;
      }

      textTotalUrlCount.innerHTML = sitemapUrls.length.toLocaleString(locale);

      importButton.disabled = false;
    });
}

function getOutgoingLinks(dom, baseUrl, sitemapUrls) {
  // Преобразуем массив sitemapUrls в Set для быстрого поиска
  const sitemapSet = new Set(sitemapUrls.map(({ location }) => location));

  const internalLinks = [...dom.querySelectorAll("a")]
    .map((aTag) => aTag.getAttribute("href")?.trim())
    .filter(
      (href) =>
        href &&
        !href.startsWith("http") &&
        !href.startsWith("//") &&
        !href.includes("javascript:void(0)") &&
        !href.includes("#")
    )
    .map((href) => new URL(href, baseUrl).href)
    .filter(
      (link) =>
        !fileExtensionsToIgnore.some((ext) => link.toLowerCase().endsWith(ext))
    );

  // Оставляем только ссылки, которые есть в sitemap
  const filteredLinks = internalLinks.filter((link) => sitemapSet.has(link));

  // Возвращаем уникальные ссылки
  return [...new Set(filteredLinks)];
}

// Пример асинхронной функции для запроса страницы и получения отфильтрованных ссылок
async function fetchOutgoingLinks(url, baseUrl, sitemapUrls) {
  try {
    console.log(`Fetching: ${url}...`);
    const response = await fetch(url, {
      signal: AbortSignal.timeout(10000),
      redirect: "error",
    });
    console.log(`Fetched: ${url}`);

    const responseText = await response.text();
    const parser = new DOMParser();
    const dom = parser.parseFromString(responseText, "text/html");

    return getOutgoingLinks(dom, baseUrl, sitemapUrls);
  } catch (error) {
    console.error(`Error fetching URL ${url}:`, error);
    return [];
  }
}

// async function calculatePageRank(sitemapUrls, d = 0.85, iterations = 15) {
//   const N = sitemapUrls.length;
//   const initialRank = 1;

//   // Инициализация PageRank для всех урлов
//   const pageRanks = {};
//   sitemapUrls.forEach((url) => {
//     pageRanks[url.location] = initialRank;
//   });

//   // Кэш для хранения ссылок, чтобы не загружать одни и те же страницы несколько раз
//   const linkCache = {};

//   // Функция для получения выходящих ссылок с использованием fetchOutgoingLinks
//   async function getOutgoingLinksCached(url, baseUrl, sitemapUrls) {
//     if (!linkCache[url]) {
//       linkCache[url] = await fetchOutgoingLinks(url, baseUrl, sitemapUrls);
//     }
//     return linkCache[url];
//   }

//   // Итеративное вычисление PageRank
//   for (let i = 0; i < iterations; i++) {
//     const newRanks = {};

//     // Для каждой страницы пересчитать PageRank
//     for (const { location } of sitemapUrls) {
//       let rankSum = 0;

//       // Перебираем все страницы, чтобы найти входящие ссылки
//       for (const { location: otherLocation } of sitemapUrls) {
//         if (location !== otherLocation) {
//           const outgoingLinks = await getOutgoingLinksCached(
//             otherLocation,
//             otherLocation,
//             sitemapUrls
//           );

//           if (outgoingLinks.includes(location)) {
//             rankSum += pageRanks[otherLocation] / outgoingLinks.length;
//           }
//         }
//       }

//       newRanks[location] = 1 - d + d * rankSum;
//     }

//     Object.assign(pageRanks, newRanks);
//   }

//   // Преобразование результата в ожидаемый формат
//   const result = Object.keys(pageRanks).map((location) => ({
//     location,
//     pageRank: pageRanks[location],
//   }));

//   return result;
// }

async function calculatePageRank(sitemapUrls, d = 0.85, iterations = 15) {
  const N = sitemapUrls.length;
  const initialRank = 1;
  let crawledLinks = 0;

  // Инициализация PageRank для всех урлов
  const pageRanks = {};
  const pageMetadata = {};

  updateLinksAll(sitemapUrls.length);

  sitemapUrls.forEach((url) => {
    pageRanks[url.location] = initialRank;
    pageMetadata[url.location] = { status: null, outgoingLinks: 0 };
  });

  // Кэш для хранения ссылок и статусов, чтобы не загружать одни и те же страницы несколько раз
  const linkCache = {};
  const statusCache = {};

  // Функция для получения выходящих ссылок и статуса ответа
  async function getOutgoingLinksCached(url, baseUrl, sitemapUrls) {
    if (!linkCache[url]) {
      try {
        // console.log(`Fetching ${url}`);
        const response = await fetch(url, {
          // signal: AbortSignal.timeout(20000),
          redirect: "error",
        });

        if (!response.ok) {
          linkCache[url] = [];
          statusCache[url] = "error";
          return;
        }

        if (!response.headers.get("Content-Type").startsWith("text/html")) {
          console.log(`URL: ${url} не является HTML-страницей`);
          return null; // Возвращаем null если не текстовый документ
        }

        const responseText = await response.text();
        const parser = new DOMParser();
        const dom = parser.parseFromString(responseText, "text/html");
        const outgoingLinks = getUniqueInternalLinks(dom, baseUrl).filter(
          (link) => sitemapUrls.some(({ location }) => location === link)
        );
        linkCache[url] = outgoingLinks;
        statusCache[url] = response.status;

        crawledLinks += 1;
        updateLinksCount(crawledLinks);
      } catch (error) {
        linkCache[url] = [];
        statusCache[url] = "error";
      }
    }
    return linkCache[url];
  }

  // Построение графа ссылок
  await Promise.all(
    sitemapUrls.map(async ({ location }) => {
      try {
        await getOutgoingLinksCached(location, location, sitemapUrls);
        setPageRankProgress(crawledLinks, sitemapUrls.length);
      } catch {
        console.log("Link request error");
      }
    })
  ).finally(() => {
    crawledLinks = sitemapUrls.length;
    updateLinksCount(crawledLinks);
  });

  // Итеративное вычисление PageRank
  for (let i = 0; i < iterations; i++) {
    // setPageRankProgress(i + 1, iterations);
    updateIterationsCount(i + 1);
    const newRanks = {};

    // Для каждой страницы пересчитать PageRank
    for (const { location } of sitemapUrls) {
      let rankSum = 0;

      // Перебираем все страницы, чтобы найти входящие ссылки
      for (const { location: otherLocation } of sitemapUrls) {
        if (location !== otherLocation) {
          // const outgoingLinks = await getOutgoingLinksCached(
          //   otherLocation,
          //   otherLocation,
          //   sitemapUrls
          // );

          const outgoingLinks = linkCache[otherLocation];

          if (outgoingLinks.includes(location)) {
            rankSum += pageRanks[otherLocation] / outgoingLinks.length;
          }
        }
      }

      newRanks[location] = 1 - d + d * rankSum;
    }

    // await new Promise((r) => setTimeout(r, 100));
    Object.assign(pageRanks, newRanks);
  }

  // Формирование результата с дополнительными данными
  const result = sitemapUrls.map(({ location }) => {
    const outgoingLinks = linkCache[location]?.length || 0;
    const status = statusCache[location] || "unknown";

    return {
      location,
      pageRank: pageRanks[location],
      status,
      outgoingLinks,
    };
  });

  return result;
}

function exportAllUrlsPageRankAsCSV() {
  const urls = [
    [
      translate("pageRankUrl"),
      translate("pageRankStatus"),
      translate("pageRankLinks"),
      translate("pageRankLevel"),
    ],
  ];

  finalPageRunResult.forEach((url) => {
    urls.push([url.location, url.status, url.outgoingLinks, url.pageRank]);
  });

  urls.push([]);
  urls.push(["Created by SiteAnalyzer SEO Tools"]);

  let csvContent =
    "data:text/csv;charset=utf-8,\uFEFF" +
    urls.map((e) => e.join(";")).join("\n");

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
      `${punycode.ToUnicode(hostname)}_pagerank.csv`
    );
    link.click();
  });
}

async function calculateSitemapLinksPageRank() {
  document
    .querySelector("#sort-column-by-pageRank")
    .removeEventListener("click", sortColumnByPageRank);
  finalPageRunResult = [];

  const textTotalUrlIterated = document.querySelector(".pageRank-text-total-url-iterations");
  const textTotalUrl = document.querySelector(".pageRank-text-total-url");
  const textTotalUrlCrawled = document.querySelector(".pageRank-text-total-url-links");

  textTotalUrl.style.display = "none";
  textTotalUrlIterated.style.display = "block";
  textTotalUrlCrawled.style.display = "block";

  const importButton = document.querySelector("#import-sitemap-pageRank-button");
  const calculateButton = document.querySelector("#calculate-pageRank-button");
  const exportButton = document.querySelector("#export-pageRank-button");

  exportButton.disabled = true;
  importButton.disabled = true;
  calculateButton.disabled = true;

  const iterations = 15;
  const d = 0.85;

  setPageRankProgress(0, iterations);
  updateLinksCount(0);
  updateLinksAll(sitemapUrlsForPageRank.length);
  updateIterationsCount(0);
  const result = await calculatePageRank(sitemapUrlsForPageRank, d, iterations);

  renderAllUrlsForPageRank(result);

  finalPageRunResult = result;

  importButton.disabled = false;
  calculateButton.disabled = false;
  exportButton.disabled = false;

  document
    .querySelector("#sort-column-by-pageRank")
    .addEventListener("click", sortColumnByPageRank);
}

document.addEventListener("DOMContentLoaded", () => {
  const importButton = document.querySelector(
    "#import-sitemap-pageRank-button"
  );

  importButton?.addEventListener("click", () => {
    parseSitemapForPageRank();
  });

  executeOnActiveTab(() => {
    return location.origin;
  })
    .then((origin) => {
      const robotsUrl = `${origin}/robots.txt`;
      return fetch(robotsUrl, { signal: AbortSignal.timeout(5000) })
        .then((response) => response.text())
        .then((robotsContent) => {
          const matches = robotsContent
            .toLocaleLowerCase()
            .match(/sitemap: ([^\n]+)/);
          return matches ? matches[1] : `${origin}/sitemap.xml`;
        })
        .catch(() => `${origin}/sitemap.xml`);
    })
    .then((sitemap) => fetch(sitemap))
    .then((response) => {
      importButton.disabled = !response.ok;
      if (!response.ok) {
        importButton.innerHTML = `<span data-translate="cantProcessedSitemap">${translate(
          "cantProcessedSitemap"
        )}</span>`;
      }
    })
    .catch(() => {
      importButton.innerHTML = `<span data-translate="cantProcessedSitemap">${translate(
        "cantProcessedSitemap"
      )}</span>`;
    });

  document
    .querySelector("#calculate-pageRank-button")
    .addEventListener("click", () => {
      calculateSitemapLinksPageRank();
    });

  document
    .querySelector("#export-pageRank-button")
    ?.addEventListener("click", () => {
      exportAllUrlsPageRankAsCSV();
    });
});
