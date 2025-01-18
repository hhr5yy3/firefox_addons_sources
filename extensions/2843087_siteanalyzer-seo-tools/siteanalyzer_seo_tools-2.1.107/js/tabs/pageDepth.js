let urlMap = {};
let crawledLinksCount = 0;
let crawledSitemap = [];
let finalCrawledTree = null;
let sitemapSavedUrls = [];

let progressbarFakeProgress = 0;
let progressbarFakeInterval;
let progressLine;

const fileExtensionsToIgnore = [
  ".zip",
  ".rar",
  ".exe",

  ".pdf",
  ".ppt",
  ".pptx",
  ".doc",
  ".docx",
  ".xls",
  ".xlsx",
  ".csv",
  ".txt",
  ".ini",
  ".psd",

  ".bmp",
  ".jpg",
  ".jpeg",
  ".gif",
  ".png",
  ".svg",
  ".webp",

  ".wav",
  ".mp3",
  ".mp4",
  ".avi",
  ".mov",
  ".mpg",
  ".mkv",

  ".js",
  ".css",
  ".scss",
];

const searchParamPaginationPattern = /\?page=\d+\/*$/i;
const urlSegmentPaginationPattern = /\/page\/\d+\/*$/i;
const searchParamPaginationPostfix = "?page=";
const urlSegmentPaginationPostfix = "/page/";

function updateCrawledLinksCount() {
  print(
    "total-pageDepth-urls-crawled",
    crawledLinksCount.toLocaleString(locale)
  );
}

function updateProgress() {
  // Прогресс первого запроса данных идет до 70%, на оставшиеся проценты идут доп запросы
  const percent = Math.floor(crawledLinksCount / sitemapSavedUrls.length * 70);
  progressLine.style.width = `${Math.min(percent, 99)}%`;

  // if (progressbarFakeProgress < 0.3) {
  //   progressbarFakeProgress += 0.003;
  // }

  // if (progressbarFakeProgress < 0.6) {
  //   progressbarFakeProgress += 0.002;
  // } else if (progressbarFakeProgress < 0.9) {
  //   progressbarFakeProgress += 0.001;
  // } else {
  //   progressbarFakeProgress += 0;
  // }

  // progressLine.style.width = `${Math.min(progressbarFakeProgress * 100, 99)}%`;
}

function startProgress() {
  const progressContainer = document.querySelector("#pageDepth-crawl-progress");
  progressLine = progressContainer.querySelector(".progress-bar__progress");

  progressbarFakeProgress = 0;
  progressLine.style.width = "0%";
  progressbarFakeInterval = setInterval(updateProgress, 250);
}

function resetProgress() {
  clearInterval(progressbarFakeInterval);
  progressbarFakeProgress = 0;

  if (progressLine) {
    progressLine.style.width = "0%";
  }
}

function completeProgress() {
  clearInterval(progressbarFakeInterval);
  progressbarFakeProgress = 1;

  if (progressLine) {
    progressLine.style.width = "100%";
  }
}

function getSitemapLocation(origin) {
  const robotsUrl = `${origin}/robots.txt`;
  return fetch(robotsUrl, {
    signal: AbortSignal.timeout(5000)
  })
    .then((response) => response.text())
    .then((robotsContent) => {
      const matches = robotsContent
        .toLocaleLowerCase()
        .match(/sitemap: ([^\n]+)/);
      return matches ? matches[1] : `${origin}/sitemap.xml`;
    })
    .catch(() => `${origin}/sitemap.xml`);
}

function buildTree(obj) {
  const map = new Map();

  for (const name in obj) {
    map.set(name, {
      name: obj[name].title || name,
      link: name,
      h1: obj[name].h1,
      status: obj[name].status,
      internalLinks: obj[name].internalLinks,
      level: obj[name].level,
      children: [],
    });
  }

  let root = null;

  for (const name in obj) {
    const { parentUrl } = obj[name];
    const currentNode = map.get(name);

    if (parentUrl) {
      const parentNode = map.get(parentUrl);
      parentNode.children.push(currentNode);
    } else {
      root = currentNode;
    }
  }

  return root;
}

function filterTree(tree, allowedLocations) {
  const normalize = (name) => (name.endsWith("/") ? name.slice(0, -1) : name);

  const allowedSet = new Set(
    allowedLocations.map((item) => normalize(item.location))
  );

  function filterNode(node) {
    const nodeName = normalize(node.link);

    const filteredInternalLinks =
      node.internalLinks?.filter((link) => allowedSet.has(normalize(link))) ||
      [];

    const filteredChildren = node.children
      .map(filterNode)
      .filter((child) => child !== null);

    const isAllowed = allowedSet.has(nodeName) || filteredChildren.length > 0;

    return isAllowed
      ? {
          ...node,
          internalLinks: filteredInternalLinks,
          children: filteredChildren,
        }
      : null;
  }

  return filterNode(tree);
}

function getUniqueInternalLinks(dom, baseUrl) {
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

  const uniqueInternalLinks = [...new Set(internalLinks)];

  return uniqueInternalLinks;
}

function checkLinkForPagination(link) {
  return (
    searchParamPaginationPattern.test(link) ||
    urlSegmentPaginationPattern.test(link)
  );
}

function retrieveLinkPaginationParts(link) {
  let paginationPostfix = null;
  let basePaginationUrl = null;

  if (searchParamPaginationPattern.test(link)) {
    paginationPostfix = searchParamPaginationPostfix;
  }
  if (urlSegmentPaginationPattern.test(link)) {
    paginationPostfix = urlSegmentPaginationPostfix;
  }

  if (!paginationPostfix) return;

  basePaginationUrl = link.split(paginationPostfix)[0];

  return { paginationPostfix, basePaginationUrl };
}

function transformLinksToClearAndPaginated(links) {
  let clearLinks = [...links];

  let isPaginated = false;
  let paginationPostfix = null;
  let basePaginationUrl = null;

  const linkWithPagination = links.find(checkLinkForPagination);

  if (linkWithPagination) {
    isPaginated = true;
    const { paginationPostfix: postfix, basePaginationUrl: url } =
      retrieveLinkPaginationParts(linkWithPagination);
    paginationPostfix = postfix;
    basePaginationUrl = url.split(paginationPostfix)[0];

    clearLinks = links.filter(
      (link) =>
        !checkLinkForPagination(link) &&
        link.replace(/\/$/i, "") !== basePaginationUrl
    );
  }

  return {
    isPaginated,
    paginationPostfix,
    basePaginationUrl,
    clearLinks,
  };
}

async function crawlPage(
  link,
  isLinkPaginated,
  linkPaginationPostfix,
  level,
  childLevel,
  baseUrl
) {
  const childLinksData = [];
  let page = 1;

  while (true) {
    const finalLink = `${link}${
      isLinkPaginated && page !== 1 ? `${linkPaginationPostfix}${page}` : ""
    }`;

    let response;

    try {
      console.log(`Fetching: ${finalLink} (level: ${level})`);
      response = await fetch(finalLink, {
        signal: AbortSignal.timeout(10000),
        redirect: "error",
      });
      console.log(`Fetched: ${finalLink} (level: ${level})`);
    } catch (error) {
      console.log(
        `Error fetching ${`${link}${
          isLinkPaginated ? `${linkPaginationPostfix}${page}` : ""
        }`}: ${error.message} (status: ${error.response?.status || 500})`
      );

      urlMap[link] = {
        ...urlMap[link],
        status: error.response?.status || 500,
      };

      break;
    } finally {
      updateCrawledLinksCount();
      crawledLinksCount++;
    }

    const responseText = await response.text();
    const parser = new DOMParser();
    const dom = parser.parseFromString(responseText, "text/html");
    const internalLinks = getUniqueInternalLinks(dom, baseUrl);

    const { isPaginated, paginationPostfix, basePaginationUrl, clearLinks } =
      transformLinksToClearAndPaginated(internalLinks);

    const newLinks = clearLinks.filter(
      (link) => urlMap[link] === undefined || urlMap[link]?.level > level
    );
    const mappedNewLinks = newLinks.map((newLink) => ({
      link: newLink,
      level: childLevel,
      parentUrl: link,
    }));

    childLinksData.push(...mappedNewLinks);

    if (page === 1) {
      urlMap[link] = {
        ...urlMap[link],
        title: dom.title?.trim(),
        h1: dom.querySelector("h1")?.textContent?.trim(),
        internalLinks,
        status: response.status,
      };
    }

    if (!isLinkPaginated) {
      if (isPaginated) {
        childLinksData.push({
          link: basePaginationUrl,
          level: childLevel,
          parentUrl: link,
          isPaginated,
          paginationPostfix,
        });
      }

      break;
    }

    page++;
  }

  return childLinksData;
}

async function crawl(urls, level, baseUrl) {
  console.log(urlMap);
  if (!urls.length) {
    return;
  }

  const childLinksData = [];
  const childLevel = ++level;

  for (const url of urls) {
    const {
      link: currentUrlLink,
      isPaginated: isCurrentUrlPaginated,
      paginationPostfix: currentUrlPaginationPostfix,
    } = url;

    const linksData = await crawlPage(
      currentUrlLink,
      isCurrentUrlPaginated,
      currentUrlPaginationPostfix,
      level,
      childLevel,
      baseUrl
    );
    childLinksData.push(...linksData);
    linksData.forEach(({ link, level, parentUrl }) => {
      urlMap[link] = { level, parentUrl };
    });
  }

  await crawl(
    childLinksData.map(({ link, isPaginated, paginationPostfix }) => ({
      link,
      isPaginated,
      paginationPostfix,
    })),
    childLevel,
    baseUrl
  );
}

/**
 *
 * @param {string} key
 * @param {*} data
 * @returns
 */
function generateSitemapUrlRow(
  url,
  status = "n/a",
  linksCount = "n/a",
  pageDepthLevel = "n/a"
) {
  const row = document.createElement("tr");

  const pathSegment = document.createElement("td");
  pathSegment.title = url;
  pathSegment.innerHTML = `<a href="${url}" target="_blank">${url}</a>`;

  const statusSegment = document.createElement("td");
  statusSegment.innerHTML = status;

  const linksCountSegment = document.createElement("td");
  linksCountSegment.innerHTML = linksCount;

  const pageDepthLevelSegment = document.createElement("td");
  pageDepthLevelSegment.innerHTML = pageDepthLevel;

  row.append(
    pathSegment,
    statusSegment,
    linksCountSegment,
    pageDepthLevelSegment
  );

  return row;
}

function renderAllUrls(urls) {
  const sitemapTbody = document.querySelector(
    "#pageDepth-segments-table .pageDepth-tbody"
  );
  sitemapTbody.innerHTML = "";

  urls.forEach((url) => {
    sitemapTbody.append(
      generateSitemapUrlRow(
        url.link,
        url.status,
        url.linksCount,
        url.pageDepthLevel
      )
    );
  });
}

function parseSitemapForGetAllUrls() {
  urlMap = {};
  crawledLinksCount = 0;
  crawledSitemap = [];
  updateCrawledLinksCount();

  const textTotalUrl = document.querySelector(".pageDepth-text-total-url");
  const textTotalUrlCount = textTotalUrl.querySelector(
    ".total-pageDepth-urls-count"
  );
  const textPercent = document.querySelector(".pageDepth-text-percent");

  textTotalUrl.style.display = "block";
  textPercent.style.display = "none";

  const importButton = document.querySelector("#import-sitemap-button");
  importButton.disabled = true;

  const vizualizeButton = document.querySelector("#vizualize-pageDepth-button");
  vizualizeButton.disabled = true;

  executeOnActiveTab(() => {
    return location.origin;
  })
    .then(getSitemapLocation)
    .then(getSitemapUrls)
    .then((sitemapUrls) => {
      sitemapSavedUrls = sitemapUrls.slice(0);

      renderAllUrls(sitemapUrls.map((url) => ({ link: url.location })));

      const table = document.querySelector("#pageDepth-segments-table");
      table.hidden = false;

      const pageDepthCalculate = document.querySelector(
        "#calculate-pageDepth-button"
      );
      pageDepthCalculate.disabled = false;

      if (!sitemapUrls.length) {
        const tbody = table.querySelector(".pageDepth-tbody");

        const tr = document.createElement("tr");
        tr.classList.add("tr-fluid");
        const td = document.createElement("td");
        td.colSpan = "4";
        td.innerHTML = `<span data-translate="cantProcessedSitemap">${translate(
          "cantProcessedSitemap"
        )}</span>`;

        tr.append(td);
        tbody.append(tr);

        pageDepthCalculate.disabled = true;
      }

      textTotalUrlCount.innerHTML = sitemapUrls.length.toLocaleString(locale);

      importButton.disabled = false;
    });
}

async function vizualizeGraph() {
  // const tree = buildTree(urlMap);
  // const sitemapOnlyTree = filterTree(tree, crawledSitemap);

  const seoExtensionAPI = typeof browser !== "undefined" ? browser : chrome;
  const hostname = await executeOnActiveTab(() => {
    return location.hostname;
  });
  console.log(finalCrawledTree);
  seoExtensionAPI.runtime.sendMessage({
    message: "openGraph",
    locale: locale,
    tree: finalCrawledTree,
    hostname: hostname,
  });
}

function generateNestedUrls(urlObjects) {
  const result = new Set(); // Используем Set, чтобы избежать дубликатов

  urlObjects.forEach((obj) => {
    const url = obj.location.endsWith("/") ? obj.location : obj.location + "/"; // Нормализуем слеш в конце
    const urlParts = url.split("/").filter((part) => part !== ""); // Разделяем URL на части
    let accumulatedPath = url.startsWith("http")
      ? urlParts[0] + "//" + urlParts[1]
      : "";

    // Добавляем полный URL
    result.add(url);

    // Проходим по частям URL и добавляем вложенные пути
    for (let i = 2; i < urlParts.length; i++) {
      accumulatedPath += "/" + urlParts[i];
      result.add(accumulatedPath + "/"); // Нормализуем вложенные пути
    }
  });

  // Преобразуем Set в массив и сортируем, чтобы пути с меньшей вложенностью были первыми
  return Array.from(result).sort((a, b) => a.length - b.length);
}

async function fetchAndExtractLinks(urls, host) {
  // const BATCH_SIZE = 4; // Количество запросов одновременно
  const results = [];
  const visitedUrls = new Set(); // Для исключения повторов
  const errorCache = new Set(); // Для хранения ошибочных URL
  const parser = new DOMParser();

  // Вспомогательная функция для выполнения одного запроса
  async function fetchUrl(url) {
    if (visitedUrls.has(url)) return; // Пропускаем уже посещённые ссылки
    visitedUrls.add(url);

    try {
      const response = await fetch(url);
      // Проверяем статус ответа
      if (!response.ok) {
        // response.ok == (status >= 200 && status < 300)
        console.warn(`Skipping URL ${url} with status ${response.status}`);
        errorCache.add(url); // Добавляем ошибочный URL в кэш
        return;
      }

      if (!response.headers.get("Content-Type").startsWith("text/html")) {
        console.log(`URL: ${url} не является HTML-страницей`);
        return null; // Возвращаем null если не текстовый документ
      }

      const html = await response.text();
      const doc = parser.parseFromString(html, "text/html");

      // Извлекаем title и h1
      const title = doc.querySelector("title")?.textContent.trim().replace(/"/gm, '') || "";
      const h1 = doc.querySelector("h1")?.textContent.trim().replace(/"/gm, '') || "";

      // Извлекаем ссылки со страницы
      const allLinks = Array.from(doc.querySelectorAll("a"))
        .map((a) => a.getAttribute("href"))
        .filter(Boolean);

      // Фильтруем ссылки
      const filteredLinks = allLinks
        .filter((link) => {
          const normalizedLink = link.replace(/\/$/, ""); // Убираем слеш на конце
          const lowerLink = normalizedLink.toLowerCase(); // Для проверки расширений приводим к нижнему регистру

          return (
            (!link.startsWith("http") || link.startsWith(host)) &&
            !link.startsWith("//") &&
            !link.includes("javascript:void(0)") &&
            !link.includes("#") &&
            !normalizedLink.includes("?") &&
            !fileExtensionsToIgnore.some((ext) => lowerLink.endsWith(ext))
          );
        })
        .map((link) => new URL(link, host).href); // Преобразуем в абсолютные ссылки

      // Добавляем результат для текущего URL
      results.push({
        fetchUrl: url,
        finalUrl: response.url,
        title: title,
        h1: h1,
        status: response.status,
        links: [...new Set(filteredLinks)],
        outgoingLinks: allLinks,
      });
      // Увеличиваем счетчик и обновляем DOM элемент
      crawledLinksCount += 1;
      updateCrawledLinksCount();
    } catch (error) {
      console.error(`Error fetching URL ${url}:`, error);
    }
  }

  // Пакетная обработка запросов
  await Promise.all(urls.map(fetchUrl));

  // Пакетная обработка запросов
  // for (let i = 0; i < urls.length; i += BATCH_SIZE) {
  //   const batch = urls.slice(i, i + BATCH_SIZE);
  //   await Promise.all(batch.map(fetchUrl));
  //   crawledLinksCount += batch.length;
  //   updateCrawledLinksCount();
  // }

  // Итоговая фильтрация результатов для надёжности
  const filteredResults = results.filter((result) => result.status < 400);

  // Сбор всех уникальных finalUrl
  const finalUrls = new Set(filteredResults.map((result) => result.finalUrl));

  // Фильтрация ссылок на основе присутствия в finalUrl и отсутствия в errorCache
  const finalResults = filteredResults.map((result) => {
    const validLinks = result.links.filter(
      (link) =>
        Array.from(finalUrls).some((finalUrl) => link.includes(finalUrl)) &&
        !errorCache.has(link)
    );
    return { ...result, links: validLinks };
  });

  return finalResults;
}

async function populateMissingMeta(tree) {
  const metaCache = new Map();

  // Функция для получения метаданных через DOMParser
  async function fetchMetaData(url) {
    if (metaCache.has(url)) return metaCache.get(url);

    try {
      crawledLinksCount += 1;
      updateCrawledLinksCount();
      const response = await fetch(url);

      if (!response.ok) {
        console.warn(`Не удалось загрузить данные для URL: ${url}`);
        return null; // Возвращаем null в случае ошибки
      }

      if (!response.headers.get("Content-Type").startsWith("text/html")) {
        console.log(`URL: ${url} не является HTML-страницей`);
        return null; // Возвращаем null если не текстовый документ
      }

      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      const title = doc.querySelector("title")?.textContent.trim() || null;
      const h1 = doc.querySelector("h1")?.textContent.trim() || null;
      const outgoingLinks = Array.from(doc.querySelectorAll("a"))
        .map((a) => a.getAttribute("href"))
        .filter(Boolean);

        const meta = { title, h1, outgoingLinks };
        metaCache.set(url, meta);
        return meta;
    } catch (error) {
      console.error(`Ошибка получения данных для ${url}:`, error);
      return null; // Возвращаем null в случае исключения
    }
  }

  // Рекурсивная функция для обработки узлов дерева
  // async function traverseAndPopulate(node) {
  //   // Если не хватает title или h1, загружаем их
  //   if (!node.name || !node.h1 || !node.outgoingLinks?.length) {
  //     const meta = await fetchMetaData(node.link);
  //     if (!meta) {
  //       // Если произошла ошибка в запросе, удаляем узел
  //       console.warn(
  //         `Удаляем узел с URL: ${node.link} из-за ошибки получения метаданных`
  //       );
  //       return null;
  //     }
  //     node.name = node.name || meta.title;
  //     node.h1 = node.h1 || meta.h1;
  //     node.outgoingLinks = meta.outgoingLinks || [];
  //   }

  //   // Рекурсивно обрабатываем детей
  //   if (node.children && node.children.length > 0) {
  //     // const validChildren = [];
  //     // for (const child of node.children) {
  //     //   const updatedChild = await traverseAndPopulate(child);
  //     //   if (updatedChild) {
  //     //     validChildren.push(updatedChild); // Добавляем только успешные узлы
  //     //   }
  //     // }
  //     // node.children = validChildren; // Обновляем список детей

  //     const updatedChildren = await Promise.all(
  //       node.children.map((child) => traverseAndPopulate(child))
  //     );
  //     node.children = updatedChildren.filter(Boolean); 
  //   }

  //   return node; // Возвращаем модифицированный узел
  // }

  // Асинхронная функция для обработки узлов дерева
  async function traverseAndPopulateIterative(root) {
    const stack = [root];
  
    while (stack.length > 0) {
      const node = stack.pop();
  
      if (!node.name || !node.h1 || !node.outgoingLinks?.length) {
        const meta = await fetchMetaData(node.link);
        if (!meta) {
          console.warn(`Удаляем узел с URL: ${node.link} из-за ошибки получения метаданных`);
          continue;
        }
        node.name = node.name || meta.title;
        node.h1 = node.h1 || meta.h1;
        node.outgoingLinks = meta.outgoingLinks || [];
      }
  
      if (node.children && node.children.length > 0) {
        stack.push(...node.children);
      }
    }
  
    return root;
  }

  // Стартуем обработку с корневого узла
  return await traverseAndPopulateIterative(tree);
}

// function buildLinkTree(fetchResults, host) {
//   if (!host) {
//     throw new Error("Хост не задан. Корневой узел невозможно определить.");
//   }

//   // Шаг 0: Создаем временный объект для хранения метаданных
//   const metaMap = new Map();
//   fetchResults.forEach((result) => {
//     // Сохраняем данные
//     metaMap.set(result.finalUrl, {
//       title: result.title || null,
//       h1: result.h1 || null,
//       status: result.status || 200,
//       outgoingLinks: result.outgoingLinks || [],
//       internalLinks: result.links || [],
//     });
//   });

//   // Ищем корневой узел, соответствующий хосту
//   const rootNode = fetchResults.find((result) => {
//     const normalizedResultUrl = result.finalUrl.replace(/\/+$/, ""); // Убираем слеш на конце
//     const normalizedHost = host.replace(/\/+$/, ""); // Убираем слеш на конце из host
//     return normalizedResultUrl === normalizedHost;
//   });
//   if (!rootNode) {
//     throw new Error(
//       `Корневой узел с хостом "${host}" не найден. Проверьте входные данные.`
//     );
//   }

//   // Карта для отслеживания информации об узлах
//   const nodeMap = new Map();
//   const parentMap = new Map(); // Карта родительских связей

//   // Добавляем корень в карту
//   nodeMap.set(rootNode.finalUrl, {
//     link: rootNode.finalUrl,
//     name: rootNode.title,
//     h1: rootNode.h1,
//     status: rootNode.status || 200,
//     level: 0,
//     internalLinks: rootNode.links,
//     outgoingLinks: rootNode.outgoingLinks || [],
//     children: [],
//   });

//   // Шаг 1: Заполняем карту узлов, обновляя уровень вложенности
//   for (const result of fetchResults) {
//     const currentNode = nodeMap.get(result.finalUrl) || {
//       link: result.finalUrl,
//       name: metaMap.get(result.finalUrl)?.title || null,
//       h1: metaMap.get(result.finalUrl)?.h1 || null,
//       level: Infinity,
//       status: result.status || 200,
//       internalLinks: result.links,
//       outgoingLinks: result.outgoingLinks || [],
//       children: [],
//     };

//     nodeMap.set(result.finalUrl, currentNode);

//     // Проходимся по всем ссылкам, записываем уровень и родителя
//     for (const link of result.links) {
//       let childNode = nodeMap.get(link);

//       // Если узел ещё не добавлен, создаем его
//       if (!childNode) {
//         const meta = metaMap.get(link) || {};
//         childNode = {
//           link: link,
//           name: meta.title || null,
//           h1: meta.h1 || null,
//           level: Infinity,
//           internalLinks: [],
//           status: meta.status || 200,
//           outgoingLinks: meta.outgoingLinks || [],
//           children: [],
//         };
//         nodeMap.set(link, childNode);
//       }

//       // Обновляем уровень и родителя, если новый уровень меньше
//       const newLevel = currentNode.level + 1;
//       if (newLevel < childNode.level) {
//         childNode.level = newLevel;
//         parentMap.set(link, result.finalUrl); // Записываем нового родителя
//       }
//     }
//   }

//   // Шаг 2: Строим дерево
//   const root = nodeMap.get(rootNode.finalUrl);

//   function buildChildren(parentNode) {
//     const childrenLinks = Array.from(parentMap.entries())
//       .filter(([childLink, parentLink]) => parentLink === parentNode.link)
//       .map(([childLink]) => nodeMap.get(childLink))
//       .filter(Boolean); // Убираем возможные пустые ссылки

//     // Добавляем уникальных детей
//     parentNode.children = childrenLinks;

//     // Рекурсивно строим дерево
//     for (const child of parentNode.children) {
//       buildChildren(child);
//     }
//   }

//   buildChildren(root);

//   return root;
// }

function buildLinkTree(fetchResults, host) {
  if (!host) {
    throw new Error("Хост не задан. Корневой узел невозможно определить.");
  }

  // Убираем лишние слеши из host
  const normalizedHost = host.replace(/\/+$/, "");

  // Карты для метаданных и узлов
  const metaMap = new Map();
  const nodeMap = new Map();
  const parentMap = new Map();

  // Заполняем метаданные и ищем корневой узел за один проход
  let rootNode = null;

  fetchResults.forEach((result) => {
    const normalizedResultUrl = result.finalUrl.replace(/\/+$/, "");

    // Сохраняем данные в metaMap
    metaMap.set(result.finalUrl, {
      title: result.title || null,
      h1: result.h1 || null,
      status: result.status || 200,
      outgoingLinks: result.outgoingLinks || [],
      internalLinks: result.links || [],
    });

    // Определяем корневой узел
    if (!rootNode && normalizedResultUrl === normalizedHost) {
      rootNode = result;
    }
  });

  if (!rootNode) {
    throw new Error(
      `Корневой узел с хостом "${host}" не найден. Проверьте входные данные.`
    );
  }

  // Добавляем корень
  const root = {
    link: rootNode.finalUrl,
    name: rootNode.title,
    h1: rootNode.h1,
    status: rootNode.status || 200,
    level: 0,
    internalLinks: rootNode.links,
    outgoingLinks: rootNode.outgoingLinks || [],
    children: [],
  };

  nodeMap.set(rootNode.finalUrl, root);

  // Строим связи узлов
  fetchResults.forEach((result) => {
    const currentNode =
      nodeMap.get(result.finalUrl) ||
      (() => {
        const meta = metaMap.get(result.finalUrl) || {};
        const newNode = {
          link: result.finalUrl,
          name: meta.title || null,
          h1: meta.h1 || null,
          level: Infinity,
          status: meta.status || 200,
          internalLinks: meta.internalLinks || [],
          outgoingLinks: meta.outgoingLinks || [],
          children: [],
        };
        nodeMap.set(result.finalUrl, newNode);
        return newNode;
      })();

    const newLevel = currentNode.level + 1;

    result.links.forEach((link) => {
      let childNode = nodeMap.get(link);
      if (!childNode) {
        const meta = metaMap.get(link) || {};
        childNode = {
          link: link,
          name: meta.title || null,
          h1: meta.h1 || null,
          level: Infinity,
          status: meta.status || 200,
          internalLinks: meta.internalLinks || [],
          outgoingLinks: meta.outgoingLinks || [],
          children: [],
        };
        nodeMap.set(link, childNode);
      }

      if (newLevel < childNode.level) {
        childNode.level = newLevel;
        parentMap.set(link, result.finalUrl);
      }
    });
  });

  // Рекурсивная функция для построения дерева
  function buildChildren(parentNode) {
    const childrenLinks = Array.from(parentMap.entries())
      .filter(([childLink, parentLink]) => parentLink === parentNode.link)
      .map(([childLink]) => nodeMap.get(childLink));

    parentNode.children = childrenLinks;

    for (const child of childrenLinks) {
      buildChildren(child);
    }
  }

  buildChildren(root);

  return root;
}

function extractDataFromTree(tree) {
  const result = [];

  // Рекурсивная функция для обхода дерева
  function traverse(node) {
    // Добавляем текущий узел в результат
    result.push({
      link: node.link,
      status: node.status,
      linksCount: node.outgoingLinks?.length || 0,
      pageDepthLevel: node.level,
    });

    // Рекурсивно обрабатываем детей, если они есть
    if (node.children && node.children.length > 0) {
      node.children.forEach((child) => traverse(child));
    }
  }

  // Запускаем обход с корневого узла
  traverse(tree);

  return result;
}

async function calculateSitemapLinksDepth() {
  crawledLinksCount = 0;
  crawledSitemap = [];
  updateCrawledLinksCount();

  const calculatePageDepthButton = document.querySelector(
    "#calculate-pageDepth-button"
  );
  const importButton = document.querySelector("#import-sitemap-button");
  const vizualizeButton = document.querySelector("#vizualize-pageDepth-button");

  calculatePageDepthButton.disabled = true;
  importButton.disabled = true;
  vizualizeButton.disabled = true;

  // Показываем блок "Обработано кликов"
  const textPercent = document.querySelector(".pageDepth-text-percent");

  // textTotalUrl.style.display = "none";
  textPercent.style.display = "block";

  resetProgress();
  startProgress();

  await executeOnActiveTab(() => {
    return location.origin;
  })
    .then(async (origin) => {
      const baseUrl = `${origin}/`;
      urlMap = {
        [baseUrl]: {
          level: 0,
          parentUrl: null,
        },
      };

      let sitemapUrls;

      if (sitemapSavedUrls.length) {
        sitemapUrls = sitemapSavedUrls;
      } else {
        const sitemapLocation = await getSitemapLocation(baseUrl);
        sitemapUrls = await getSitemapUrls(sitemapLocation);
      }

      crawledSitemap = generateNestedUrls(sitemapUrls);

      // crawledLinksCount = 0;
      // updateCrawledLinksCount();

      const result = await fetchAndExtractLinks(crawledSitemap, origin);

      finalCrawledTree = buildLinkTree(result, origin);
      const populatedTree = await populateMissingMeta(finalCrawledTree);
      finalCrawledTree = populatedTree;

      // await crawl(
      //   [
      //     {
      //       link: baseUrl,
      //       isPaginated: false,
      //       paginationPostfix: null,
      //     },
      //   ],
      //   0,
      //   baseUrl
      // );

      renderAllUrls(extractDataFromTree(populatedTree));

      calculatePageDepthButton.disabled = false;
      importButton.disabled = false;
      vizualizeButton.disabled = false;
    })
    .catch((e) => {
      console.log(e);
    });

  completeProgress();
}

document.addEventListener("DOMContentLoaded", () => {
  const importButton = document.querySelector("#import-sitemap-button");

  importButton?.addEventListener("click", () => {
    parseSitemapForGetAllUrls();
  });

  executeOnActiveTab(() => {
    return location.origin;
  })
    .then((origin) => {
      const robotsUrl = `${origin}/robots.txt`;
      return fetch(robotsUrl, {
        signal: AbortSignal.timeout(5000)
      })
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
    .querySelector("#calculate-pageDepth-button")
    .addEventListener("click", () => {
      calculateSitemapLinksDepth();
    });
  document
    .querySelector("#vizualize-pageDepth-button")
    .addEventListener("click", () => {
      vizualizeGraph();
    });
});
