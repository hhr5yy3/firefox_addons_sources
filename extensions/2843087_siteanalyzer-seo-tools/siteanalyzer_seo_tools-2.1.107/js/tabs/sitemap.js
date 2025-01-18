let clusters = {};

function getSitemapUrls(sitemapUrl) {
  return fetch(sitemapUrl, { signal: AbortSignal.timeout(5000) })
    .then((response) => (response.ok ? response.text() : []))
    .then(async (sitemapContent) => {
      const parser = new DOMParser();
      const sitemapXML = parser.parseFromString(sitemapContent, "text/xml");

      const urls = [];

      const sitemaps = sitemapXML.querySelectorAll("sitemap");
      for (const sitemap of sitemaps) {
        urls.push(
          ...(await getSitemapUrls(sitemap.querySelector("loc").innerHTML))
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

async function clusterUrls(urls) {
  const tree = {};

  urls.forEach((url) => {
    const path = new URL(url.location).pathname;
    const parts = path.split("/").filter((part) => part !== "");

    let currentLevel = tree;
    parts.forEach((part, index) => {
      if (!currentLevel[part]) {
        currentLevel[part] = { urls: [], subClusters: {} };
      }
      if (index === parts.length - 1) {
        currentLevel[part].urls.push(url);
      }
      currentLevel = currentLevel[part].subClusters;
    });
  });

  function flattenTree(tree, parentKey = "") {
    let clusters = {};

    for (let key in tree) {
      const newKey = parentKey ? `${parentKey}/${key}` : `/${key}`;
      clusters[newKey] = tree[key].urls;

      const subClusters = flattenTree(tree[key].subClusters, newKey);
      for (let subKey in subClusters) {
        clusters[subKey] = subClusters[subKey];
      }

      if (
        Object.keys(tree[key].subClusters).length === 1 &&
        tree[key].urls.length === 0
      ) {
        const onlySubKey = Object.keys(tree[key].subClusters)[0];
        clusters[newKey].push(...subClusters[`${newKey}/${onlySubKey}`]);
        delete clusters[`${newKey}/${onlySubKey}`];
      }
    }

    return clusters;
  }

  function mergeSingleElementClusters(clusters) {
    let mergedClusters = {};

    for (let cluster in clusters) {
      let parts = cluster.split("/");
      let parentKey = parts.slice(0, -1).join("/");

      if (parentKey && clusters[cluster].length === 1) {
        if (!mergedClusters[parentKey]) {
          mergedClusters[parentKey] = [];
        }
        mergedClusters[parentKey].push(...clusters[cluster]);
      } else {
        mergedClusters[cluster] = clusters[cluster];
      }
    }

    return mergedClusters;
  }

  function copySubClustersToParents(clusters) {
    let updatedClusters = { ...clusters };

    for (let cluster in clusters) {
      let parts = cluster.split("/");
      while (parts.length > 1) {
        parts.pop();
        let parentKey = parts.join("/");
        if (parentKey) {
          if (!updatedClusters[parentKey]) {
            updatedClusters[parentKey] = [];
          }
          updatedClusters[parentKey].push(...clusters[cluster]);
        }
      }
    }

    for (let cluster in updatedClusters) {
      updatedClusters[cluster] = [...new Set(updatedClusters[cluster])];
    }

    return updatedClusters;
  }

  let flatClusters = flattenTree(tree);
  let mergedClusters = mergeSingleElementClusters(flatClusters);
  let finalClusters = copySubClustersToParents(mergedClusters);

  return finalClusters;
}

/**
 *
 * @param {string} key
 * @param {*} data
 * @returns
 */
function generateSitemapRow(key, data, length) {
  const row = document.createElement("tr");

  const pathSegment = document.createElement("td");
  pathSegment.title = key;
  pathSegment.innerHTML = key
    .replace(/^\/+|\/+$/g, "")
    .split("/")
    .pop();
  pathSegment.title = key.replace(/^\/+|\/+$/g, "");

  const totalUrls = document.createElement("td");
  totalUrls.innerHTML = data.length;

  const percent = document.createElement("td");
  percent.innerHTML = `${(data.length / (length / 100)).toFixed(1)}`;

  const dates = Array.isArray(data) ? data.map((url) => url.lastmod) : [];

  const minDate = Math.min.apply(null, dates);
  const maxDate = Math.max.apply(null, dates);

  const dateFrom = document.createElement("td");
  dateFrom.innerHTML = minDate ? formatDate(new Date(minDate)) : "-";

  const dateTo = document.createElement("td");
  dateTo.innerHTML = maxDate ? formatDate(new Date(maxDate)) : "-";

  const toggleUrls = document.createElement("td");

  const toggleUrlsButton = document.createElement("button");
  toggleUrlsButton.classList.add("button", "toggle-sitemap-urls-button");
  toggleUrlsButton.setAttribute("data-translation", "showAll");
  toggleUrlsButton.innerHTML = translate("showAll");

  toggleUrlsButton.addEventListener("click", () => {
    const urls = document.querySelectorAll(`[data-cluster="${key}"]`);
    let toggleStatus = false;
    urls.forEach((url) => {
      toggleStatus = url.classList.toggle("tr-hidden");
    });

    toggleUrlsButton.setAttribute(
      "data-translation",
      toggleStatus ? "showAll" : "hideAll"
    );
    toggleUrlsButton.innerHTML = translate(
      toggleStatus ? "showAll" : "hideAll"
    );
  });

  toggleUrls.append(toggleUrlsButton);

  row.append(pathSegment, totalUrls, percent, dateFrom, dateTo, toggleUrls);

  return row;
}

function generateLocationRow(key, location) {
  const row = document.createElement("tr");
  row.classList.add("tr-fluid");
  row.classList.add("tr-hidden");
  row.setAttribute("data-cluster", key);

  const path = document.createElement("td");
  path.title = location;
  path.colSpan = "5";
  path.innerHTML = `<span class="status" hidden>200</span> <a href="${location}" target="_blank">${location}</a>`;

  row.append(path);

  return row;
}

function renderClusters() {
  const keys = Object.keys(clusters);

  let length = 0;
  keys.forEach((key) => {
    length += clusters[key].length;
  });

  const sitemapTbody = document.querySelector(
    "#sitemap-segments-table .sitemap-tbody"
  );
  sitemapTbody.innerHTML = "";

  const unsortedItems = [];

  keys.forEach((key) =>
    unsortedItems.push({
      cluster: key,
      data: clusters[key],
    })
  );

  const sortedItems = unsortedItems.sort(
    (a, b) => b.data.length - a.data.length
  );

  sortedItems.forEach((item) => {
    const group = document.createElement("div");
    group.classList.add("sitemap-links-group");
    group.append(generateSitemapRow(item.cluster, item.data, length));
    item.data.forEach((url) => {
      const element = generateLocationRow(item.cluster, url.location);
      url.element = element;
      group.append(element);
    });
    sitemapTbody.append(group);
  });
}

function printUrlsCount() {
  let length = 0;

  const keys = Object.keys(clusters);
  keys.forEach((key) => {
    length += clusters[key].length;
  });

  print("total-sitemaps-urls", length.toLocaleString(locale));
}

function exportAllUrlsAsCSV() {
  const keys = Object.keys(clusters);
  const urls = [[translate("pathSegments"), "URL", translate("status")]];

  keys.forEach((key) => {
    urls.push(
      ...clusters[key].map((cluster) => [
        key.replace(/^\/+|\/+$/g, ""),
        cluster.location,
        cluster.status || "",
      ])
    );
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
      `${punycode.ToUnicode(hostname)}_export_sitemap.csv`
    );
    link.click();
  });
}

function parseSitemap() {
  const parseButton = document.querySelector("#parse-sitemap-button");
  parseButton.disabled = true;

  const loader = document.querySelector("#sitemap-clusterize-loader");
  loader.hidden = false;

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
    .then(getSitemapUrls)
    .then(clusterUrls)
    .then((generatedClusters) => {
      clusters = generatedClusters;
      renderClusters();
      printUrlsCount();

      const table = document.querySelector("#sitemap-segments-table");
      table.hidden = false;

      const exportButton = document.querySelector("#export-sitemap-button");
      exportButton.disabled = false;

      const getStatusCodes = document.querySelector("#get-urls-status-button");
      getStatusCodes.disabled = false;

      const keys = Object.keys(clusters);
      if (!keys.length) {
        const tbody = table.querySelector(".sitemap-tbody");

        const tr = document.createElement("tr");
        tr.classList.add("tr-fluid");
        const td = document.createElement("td");
        td.colSpan = "6";
        td.innerHTML = `<span data-translate="cantProcessedSitemap">${translate(
          "cantProcessedSitemap"
        )}</span>`;

        tr.append(td);
        tbody.append(tr);

        exportButton.disabled = true;
        getStatusCodes.disabled = true;
      }

      parseButton.disabled = false;
      loader.hidden = true;
    });
}

function getStatusCodes() {
  const getStatusCodesButton = document.querySelector(
    "#get-urls-status-button"
  );
  getStatusCodesButton.disabled = true;

  const progressBar = document.querySelector("#get-urls-status-progress");

  /** @type {HTMLElement} */
  const progress = progressBar.querySelector(".progress-bar__progress");

  progress.style.width = "0%";

  const urls = [];

  const keys = Object.keys(clusters);
  keys.forEach((key) => {
    urls.push(...clusters[key]);
  });

  if (!urls.length) return;

  const progressStep = urls.length / 100;
  let doneUrls = 0;

  urls.forEach(async (url) => {
    const response = await fetch(url.location).catch(() => null);

    const status = response?.status || 500;

    url.status = status;

    /** @type {HTMLElement} */
    const el = url.element;

    const statusEl = el.querySelector(".status");
    statusEl.hidden = false;
    statusEl.classList.toggle("status--bad", !response?.ok);
    statusEl.innerHTML = status;

    doneUrls += 1;
    progress.style.width = `${doneUrls / progressStep}%`;
  });

  getStatusCodesButton.disabled = false;
}

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector("#export-sitemap-button")
    ?.addEventListener("click", () => {
      exportAllUrlsAsCSV();
    });

  const parseButton = document.querySelector("#parse-sitemap-button");

  parseButton?.addEventListener("click", () => {
    parseSitemap();
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
      parseButton.disabled = !response.ok;
      if (!response.ok) {
        parseButton.innerHTML = `<span data-translate="cantProcessedSitemap">${translate(
          "cantProcessedSitemap"
        )}</span>`;
      }
    })
    .catch(() => {
      parseButton.innerHTML = `<span data-translate="cantProcessedSitemap">${translate(
        "cantProcessedSitemap"
      )}</span>`;
    });

  document
    .querySelector("#get-urls-status-button")
    .addEventListener("click", () => {
      getStatusCodes();
    });
});
