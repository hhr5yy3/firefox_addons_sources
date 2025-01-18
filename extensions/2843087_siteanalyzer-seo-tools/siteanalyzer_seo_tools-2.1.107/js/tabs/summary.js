const domParser = new DOMParser();

const none = () => `<span data-translation="none">${translate("none")}</span>`;
const yes = () => `<span data-translation="yes">${translate("yes")}</span>`;
const no = () => `<span data-translation="no">${translate("no")}</span>`;
const unknown = () =>
  `<span data-translation="unknown">${translate("unknown")}</span>`;
const empty = () =>
  `<span data-translation="empty">${translate("empty")}</span>`;
const error = () =>
  `<span data-translation="error">${translate("error")}</span>`;
const captcha = () =>
  `<span data-translation="captcha">${translate("captcha")}</span>`;
const words = () =>
  `<span data-translation="pageWordsSum">${translate("pageWordsSum")}</span>`;
const kb = () => `<span data-translation="kb">${translate("kb")}</span>`;

const fetchTimeout = 15000;

/**
 * Получить ссылку на рабочую siteMap.
 *
 * @returns {string|null}
 */
async function getSiteMap(origin, robotsUrl) {
  /** @type {string} */
  const robots = await fetch(robotsUrl, {
    signal: AbortSignal.timeout(fetchTimeout),
  }).then((response) => response.ok && response.text());

  const siteMapUrlFromRobots = robots
    ?.toLocaleLowerCase()
    .match(/sitemap: ([^\n]+)/);

  const siteMapUrl =
    siteMapUrlFromRobots && siteMapUrlFromRobots[1]
      ? siteMapUrlFromRobots[1]
      : `${origin}/sitemap.xml`;

  return fetch(siteMapUrl, {
    signal: AbortSignal.timeout(fetchTimeout),
  }).then((response) => (response.ok ? siteMapUrl : null));
}

function parseRobotsFile() {
  let sitePath;
  return executeOnActiveTab(() => {
    return {
      path: location.pathname,
      origin: location.origin,
    };
  })
    .then(async ({ path, origin }) => {
      sitePath = path;
      return await fetch(`${origin}/robots.txt`, {
        signal: AbortSignal.timeout(fetchTimeout),
      })
        .then((response) => {
          if (!response.ok) return null;
          return response.text();
        })
        .catch(() => {
          return null;
        });
    })
    .then((content) => {
      if (!content) return [];
      return parseRobotsContent(content, sitePath);
    })
    .catch(() => []);
}

/**
 * @param {string} content
 * @param {string} currentPath
 */
function parseRobotsContent(content, currentPath) {
  const convertRobotsTxtToRegex = (robotsTxtPattern) => {
    const regexPattern = robotsTxtPattern
      .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      .replace(/\\\*/g, ".*")
      .replace(/\\\$/g, "$");

    return new RegExp(`^${regexPattern}`);
  };

  const checkPathAgainstRobotsRegex = (pattern, path) => {
    return convertRobotsTxtToRegex(pattern).test(path);
  };

  /** @type {string[]} */
  const rows = content.toLowerCase().split(/\r\n|\r|\n/g);

  const userAgentsWhitelist = [
    "*",
    "yandex",
    "yandexbot",
    "googlebot",
    "bingbot",
    "baiduspider",
    "slurp",
    "duckduckbot",
  ];

  const rules = {};

  let userAgents = [];
  let appendUserAgents = false;

  rows.forEach((row) => {
    switch (true) {
      case /user-agent: ?[^\n]*/.test(row): {
        const userAgent = row.match(/user-agent: ?([^\n]*)/)[1];

        if (appendUserAgents) {
          userAgents.push(userAgent);
        } else {
          userAgents = [userAgent];
        }

        appendUserAgents = true;
        break;
      }

      case /disallow: ?[^\n]*/.test(row): {
        appendUserAgents = false;

        const pattern = row.match(/disallow: ?([^\n]*)/)[1];
        if (
          pattern.length > 0 &&
          checkPathAgainstRobotsRegex(pattern, currentPath)
        ) {
          userAgents.forEach((userAgent) => {
            const rule = rules[userAgent];
            if (!rule || rule.pattern.length < pattern.length) {
              rules[userAgent] = {
                pattern: pattern,
                isAllow: false,
              };
            }
          });
        }

        break;
      }

      case /allow: ?[^\n]*/.test(row): {
        appendUserAgents = false;

        const pattern = row.match(/allow: ?([^\n]*)/)[1];
        if (
          pattern.length > 0 &&
          checkPathAgainstRobotsRegex(pattern, currentPath)
        ) {
          userAgents.forEach((userAgent) => {
            const rule = rules[userAgent];
            if (!rule || rule.pattern.length < pattern.length) {
              rules[userAgent] = {
                pattern: pattern,
                isAllow: true,
              };
            }
          });
        }

        break;
      }
    }
  });

  const disallows = [];
  const keys = Object.keys(rules);

  keys.forEach((key) => {
    if (!userAgentsWhitelist.includes(key)) return;
    const rule = rules[key];
    if (!rule.isAllow) {
      disallows.push({
        userAgent: key,
        pattern: rule.pattern,
      });
    }
  });

  return disallows;
}

/**
 * Получить Yandex ИКС.
 *
 * @param {string} webmasterUrl
 * @returns
 */
async function getYandexSqi(webmasterUrl) {
  return fetch(webmasterUrl)
    .then((response) => response.text())
    .then((text) => {
      const htmlElement = domParser.parseFromString(text, "text/html");

      let scriptTag = htmlElement.querySelectorAll("body script")[0];
      if (scriptTag.textContent.includes("window._initData")) {
        scriptTag = scriptTag.textContent.replace("window._initData =", "");
        scriptTag = JSON.stringify(scriptTag);
        scriptTag = JSON.parse(scriptTag);
        scriptingResult = JSON.parse(scriptTag);
        return scriptingResult?.quality?.achievements[0][
          "sqi"
        ]?.toLocaleString(locale);
      }

      return captcha();
    });
}

/**
 * Получить индекс в поисковике Yandex.
 *
 * @param {string} indexYUrl
 * @returns
 */
async function getIndexY(indexYUrl) {
  return fetch(indexYUrl)
    .then((response) => response.text())
    .then((text) => {
      const htmlElement = domParser.parseFromString(text, "text/html");

      if (htmlElement.querySelector("#checkbox-captcha-form")) {
        return `<a href="${indexYUrl}" target="_blank">${captcha()}</a>`;
      }

      const scriptTag = htmlElement.querySelector("#after-static")?.innerHTML;
      const match = scriptTag.match(/(нашлось|нашлась) ([\d\s]*)/);

      if (!match) {
        return `<a href="${indexYUrl}" target="_blank">0</a>`;
      }

      const thousand = scriptTag.match(/тыс/);
      const million = scriptTag.match(/млн/);

      let number = match[2].replace(/\s/g, "");

      if (thousand) number += "000";
      if (million) number += "000000";

      return `<a href="${indexYUrl}" target="_blank">${parseInt(
        number
      ).toLocaleString(locale)}</a>`;
    });
}

/**
 * Получить индекс в поисковике Google.
 *
 * @param {string} indexGUrl
 * @returns
 */
async function getIndexG(indexGUrl) {
  return fetch(indexGUrl)
    .then((response) => response.text())
    .then((text) => {
      const htmlElement = domParser.parseFromString(text, "text/html");

      const indexElement = htmlElement.querySelector("#result-stats");

      if (!indexElement) {
        return `<a href="${indexGUrl}" target="_blank">${captcha()}</a>`;
      }

      const match = indexElement.textContent.match(
        /Результатов: примерно ([\d\s]*)/
      );

      if (!match) {
        return `<a href="${indexGUrl}" target="_blank">0</a>`;
      }

      const number = match[1].replace(/\s/g, "");
      return `<a href="${indexGUrl}" target="_blank">${parseInt(
        number
      ).toLocaleString(locale)}</a>`;
    });
}

/**
 * Индексируется ли текущая страница в Yandex.
 *
 * @param {string} pageIndexYUrl
 * @param {string} href
 * @returns
 */
async function getPageIndexY(pageIndexYUrl, href) {
  return fetch(pageIndexYUrl)
    .then((response) => response.text())
    .then((text) => {
      const htmlElement = domParser.parseFromString(text, "text/html");

      const indexElement = htmlElement.querySelector("#search-result");

      if (!indexElement) {
        return `<a href="${pageIndexYUrl}" target="_blank">${captcha()}</a>`;
      }

      const links = indexElement.querySelectorAll("a");
      for (const link of links) {
        if (link.href.toLocaleLowerCase() === href.toLocaleLowerCase()) {
          return `<a href="${pageIndexYUrl}" target="_blank">${yes()}</a>`;
        }
      }

      return `<a href="${pageIndexYUrl}" target="_blank">${no()}</a>`;
    });
}

/**
 * Индексируется ли текущая страница в Google.
 *
 * @param {string} pageIndexGUrl
 * @param {string} href
 * @returns
 */
async function getPageIndexG(pageIndexGUrl, href) {
  return fetch(pageIndexGUrl)
    .then((response) => response.text())
    .then((text) => {
      const htmlElement = domParser.parseFromString(text, "text/html");

      let indexElement = htmlElement.querySelector(".dURPMd");

      if (!indexElement) {
        return `<a href="${pageIndexGUrl}" target="_blank">${captcha()}</a>`;
      }

      const links = indexElement.querySelectorAll("a");
      for (const link of links) {
        if (link.href.toLocaleLowerCase() === href.toLocaleLowerCase()) {
          return `<span><a href="${pageIndexGUrl}" target="_blank">${yes()}</a> (<a href="https://web.archive.org/web/*/${href}" target="_blank" data-export="Google Cache" data-export-attribute="href">cache</a>)</span>`;
        }
      }

      return `<a href="${pageIndexGUrl}" target="_blank">${no()}</a>`;
    });
}

/**
 * Индексируется ли текущая страница в Bing.
 *
 * @param {string} pageIndexBUrl
 * @param {string} href
 * @returns
 */
async function getPageIndexB(pageIndexBUrl, href) {
  return fetch(pageIndexBUrl)
    .then((response) => response.text())
    .then((text) => {
      const htmlElement = domParser.parseFromString(text, "text/html");

      let indexElement = htmlElement.querySelector("#b_results");

      if (!indexElement) {
        return `<a href="${pageIndexBUrl}" target="_blank">${captcha()}</a>`;
      }

      const links = indexElement.querySelectorAll("a");
      for (const link of links) {
        if (link.href.toLocaleLowerCase() === href.toLocaleLowerCase()) {
          return `<a href="${pageIndexBUrl}" target="_blank">${yes()}</a>`;
        }
      }

      return `<a href="${pageIndexBUrl}" target="_blank">${no()}</a>`;
    });
}

/**
 * @param {boolean} hasTag
 * @param {string} content
 * @returns
 */
function getMetaTagValue(hasTag, content) {
  if (content) return content;
  else if (hasTag) return empty();
  else return none();
}

function getFirstSocialLinks() {
  executeOnActiveTab(() => {
    const links = Array.from(document.querySelectorAll("a"));

    return links.map((link) => link.href);
  }).then((links) => {
    const foundedSocialLinks = findSocialLinks(links);
    const keys = Object.keys(foundedSocialLinks);

    keys.forEach((key) => {
      if (foundedSocialLinks[key].length > 0) {
        const socialLink = document.querySelector(
          `.social-link[data-social-link="${key}"]`
        );

        if (!socialLink) return;

        socialLink.href = foundedSocialLinks[key][0];
        socialLink.target = "_blank";
        socialLink.setAttribute("data-export", key);

        socialLink
          .querySelector(".social-icon")
          ?.classList.add("social-icon--active");
      }
    });

    if (document.querySelectorAll(".social-icon--active").length > 0) {
      const linkToLinksTab = document.querySelector(
        "#socials-link-to-links-tab"
      );
      linkToLinksTab.href = "#";
      linkToLinksTab.removeAttribute("data-disabled");
    }
  });
}

/**
 * Получить индекс в поисковике Yahoo.
 *
 * @param {string} indexYahooURL
 * @returns
 */
async function getIndexYahoo(indexYahooURL) {
  return fetch(indexYahooURL)
    .then((response) => response.text())
    .then((text) => {
      const htmlElement = domParser.parseFromString(text, "text/html");
      const indexElement = htmlElement.querySelector("#results");
      if (!indexElement) {
        return `<a href="${indexYahooURL}" target="_blank">${captcha()}</a>`;
      }

      const title = indexElement.querySelector(".searchSuperTop .title");
      const match = title.textContent
        .replace(",", "")
        .match(/About ([\d\s]*) search results/);

      if (!match) {
        return `<a href="${indexYahooURL}" target="_blank">0</a>`;
      }

      const number = match[1].replace(/\s/g, "");
      return `<a href="${indexYahooURL}" target="_blank">${parseInt(
        number
      ).toLocaleString(locale)}</a>`;
    });
}

/**
 *
 * @param {string} name
 * @param {number} value
 * @param {string} rating
 * @returns
 */
function printWebVitalValue(name, value, rating) {
  const el = document.createElement("span");

  const statusIndicator = document.createElement("span");
  statusIndicator.classList.add("status-indicator");

  switch (rating) {
    case "good":
      statusIndicator.classList.add("status-indicator--good");
      break;
    case "needs-improvement":
      statusIndicator.classList.add("status-indicator--warning");
      break;
    case "poor":
      statusIndicator.classList.add("status-indicator--bad");
      break;
  }

  el.innerHTML = `<span>${name}: <span data-export="${name}">${value.toLocaleString(
    2
  )}</span></span>`;
  el.append(statusIndicator);

  return el;
}

function getWebVitals() {
  executeOnActiveTab(() => {
    return webVitalsValues;
  }).then((webVitalsValues) => {
    const keys = Object.keys(webVitalsValues || {});

    if (!keys.length) {
      print("web-vitals", unknown());
      return;
    }

    const valuesEl = document.createElement("div");
    valuesEl.classList.add("web-vitals-container");

    keys.forEach((key) => {
      const metric = webVitalsValues[key];
      valuesEl.append(printWebVitalValue(key, metric.value, metric.rating));
    });

    print("web-vitals", valuesEl.outerHTML);
  });
}

/**
 * Выводит общую информацию о текущей странице.
 */
async function renderSummary() {
  executeOnActiveTab(() => {
    const timing = window.performance.timing;

    const origin = window.location.origin;
    const links = Array.from(document.querySelectorAll("a"));
    const images = document.querySelectorAll("img");

    const robotTags = Array.from(
      document.querySelectorAll('meta[name="robots"]')
    );
    const robots = robotTags
      .map((tag) => tag.getAttribute("content"))
      .join(" ");

    const canonical = document
      .querySelector('link[rel="canonical"]')
      ?.getAttribute("href");

    const h1 = document.querySelector("h1")?.cloneNode(true);

    return {
      title: !!document.querySelector("title"),
      titleText: document.querySelector("title")?.textContent?.trim(),
      description: !!document.querySelector('meta[name="description"]'),
      descriptionText: document
        .querySelector('meta[name="description"]')
        ?.getAttribute("content")
        ?.trim(),
      h1: !!h1,
      h1Text: h1?.textContent?.trim(),
      loadTime: timing.domContentLoadedEventEnd - timing.navigationStart,
      internalLinksCount: links.filter((link) => link.origin === origin).length,
      externalLinksCount: links.filter((link) => link.origin !== origin).length,
      imagesCount: images.length,
      encoding: document.characterSet,
      robots: robots,
      canonical: canonical,
      lang: document.documentElement.lang,
      fullTextContent: document.body.innerText,
    };
  }).then((data) => {
    print("title", getMetaTagValue(data.title, data.titleText));
    print("title-length", data.titleText?.length || 0);
    print(
      "description",
      getMetaTagValue(data.description, data.descriptionText)
    );
    print("description-length", data.descriptionText?.length || 0);

    print("h1", getMetaTagValue(data.h1, data.h1Text));
    print("h1-length", data.h1Text?.length || 0);

    document.dispatchEvent(new CustomEvent("RenderCriteriaBadges"));

    const symbolsSum = (data.fullTextContent?.length || 0).toLocaleString(locale);
    const wordsList =
      data.fullTextContent?.match(/[а-яА-ЯёЁa-zA-Z0-9\-]+/gm) || [];
    const wordsSum = (wordsList.length || 0).toLocaleString(locale);
    print(
      "page-characters-sum",
      `<a href="#" data-tab="content">${symbolsSum}</a> (${words()}: <a href="#" data-tab="content">${wordsSum}</a>)`
    );

    document.dispatchEvent(new CustomEvent("ReBindDataTabLinks"));

    const loadTimeSeconds = (data.loadTime / 1000).toFixed(1);
    print(
      "load-time",
      `${loadTimeSeconds} <span data-translation="seconds">${translate(
        "seconds"
      )}</span>`
    );

    print("internal-links-count", data.internalLinksCount.toLocaleString(locale));
    print("external-links-count", data.externalLinksCount.toLocaleString(locale));
    print("images-count", data.imagesCount.toLocaleString(locale));

    print("encoding", data.encoding);

    print(
      "canonical-link",
      data.canonical
        ? `<a href="${data.canonical}" target="_blank">${data.canonical}</a>`
        : none()
    );

    executeOnActiveTab(() => {
      return location.href.replace(/#.*$/, "").replace(/\/$/, "");
    }).then((href) => {
      if (data.canonical) {
        const canonicalStatus = document.querySelector("#canonical-status");
        canonicalStatus.classList.toggle(
          "status-indicator--bad",
          data.canonical.replace(/\/$/, "") !== href
        );
        canonicalStatus.classList.toggle(
          "status-indicator--good",
          data.canonical.replace(/\/$/, "") === href
        );
      }
    });

    print("robots-tag", data.robots ? data.robots : none());

    print("page-lang", data.lang ? data.lang : none());
  });

  const href = await executeOnActiveTab(() => window.location.href);
  const origin = new URL(href).origin;
  const hostname = new URL(href).hostname;

  const cleanHref = href
    .replace("http://", "")
    .replace("https://", "")
    .replace("www.", "");

  print(
    "similar-web",
    `<a href="https://www.similarweb.com/website/${hostname}" target="_blank" data-export="SimilarWeb" data-export-attribute="href">SimilarWeb</a>`
  );
  print(
    "web-archive",
    `<a href="https://web.archive.org/web/*/${cleanHref}" target="_blank" data-export="Web Archive" data-export-attribute="href">Web Archive</a>`
  );

  document.querySelector("#web-archive").hidden = false;

  executeOnActiveTab(() => {
    const icon = document.querySelector(`[rel="icon"], [rel="shortcut icon"]`);
    if (!icon) {
      return `${window.location.origin}/favicon.ico`;
    } else {
      return icon.href;
    }
  }).then((icon) =>
    fetch(icon, {
      signal: AbortSignal.timeout(fetchTimeout),
    }).then((response) => {
      if (response.ok) {
        print("page-icon", `<img src=${icon} class="page-icon">`);
      }
    })
  );

  print(
    "page-href",
    `<a href="${href}" target="_blank">${punycode.ToUnicode(
      hostname.replace("www.", "")
    )}</a>`
  );

  const robotsUrl = `${origin}/robots.txt`;
  fetch(robotsUrl, {
    signal: AbortSignal.timeout(fetchTimeout),
  })
    .then((response) => {
      const robots = response.ok
        ? `<a href="${robotsUrl}" target="_blank" data-export="Robots.txt" data-export-attribute="href">${yes()}</a>`
        : `<span data-export="Robots.txt">${none()}</span>`;
      print("robots", robots);
    })
    .catch(() =>
      print("robots", `<span data-export="Robots.txt">${none()}</span>`)
    );

  setTimeout(() => {
    getSiteMap(origin, robotsUrl)
      .then((siteMapUrl) => {
        print(
          "sitemap",
          siteMapUrl
            ? `<a href="${siteMapUrl}" target="_blank" data-export="Sitemap.xml" data-export-attribute="href">${yes()}</a>`
            : `<span data-export="Sitemap.xml">${none()}</span>`
        );
      })
      .catch(() =>
        print("sitemap", `<span data-export="Sitemap.xml">${none()}</span>`)
      );
  }, 2000);

  fetch(href, {
    signal: AbortSignal.timeout(fetchTimeout),
  })
    .then((response) => {
      print("status", response.status);
      response.blob().then((blob) => {
        const pageSizeKb = (blob.size / 1024).toFixed(1);
        print("page-size", `${pageSizeKb} ${kb()}`);
      });
    })
    .catch((err) => print("status", unknown()));

  fetch(`http://ip-api.com/json/${hostname}`)
    .then((response) => response.json())
    .then((data) => {
      const { status, query: ip, country } = data;

      if (status === "fail") {
        throw new Error("");
      }

      print(
        "ip_address",
        `<a href="#" id="ip-address-link">${ip}</a> (${country})`
      );

      const ipAddressButton = document.querySelector("#ip-address-link");
      ipAddressButton.onclick = () => {
        document.dispatchEvent(new CustomEvent("ShowModalWithIpMatches"));
      };
    })
    .catch(() => print("ip_address", translate("error")));

  const webmasterUrl = `https://webmaster.yandex.ru/siteinfo/?host=${origin}`;
  getYandexSqi(webmasterUrl)
    .then((sqi) =>
      print(
        "yandex_sqi",
        `<a href="${webmasterUrl}" target="_blank">${sqi || 0}</a>`
      )
    )
    .catch((err) => print("yandex_sqi", err.message));

  const hostnameWithoutWWW = hostname.replace("www.", "");
  const indexYUrl = `https://yandex.ru/search/?text=host:www.${hostnameWithoutWWW} | host:${hostnameWithoutWWW}`;
  getIndexY(indexYUrl)
    .then((index) => {
      print("index_y", index);
    })
    .catch(() =>
      print("index_y", `<a href="${indexYUrl}" target="_blank">0</a>`)
    );

  const indexGUrl = `https://www.google.com/search?q=site:${hostname}`;
  getIndexG(indexGUrl)
    .then((index) => print("index_g", index))
    .catch(() =>
      print("index_g", `<a href="${indexGUrl}" target="_blank">${error()}</a>`)
    );

  const pageIndexYUrl = `https://yandex.ru/search/?text=url:${href.replace(
    /#.*$/,
    ""
  )}`;
  getPageIndexY(pageIndexYUrl, href.replace(/#.*$/, ""))
    .then((result) => print("page_index_y", result))
    .catch(() =>
      print(
        "page_index_y",
        `<a href="${pageIndexYUrl}" target="_blank">${error()}</a>`
      )
    );

  const pageIndexGUrl = `https://www.google.com/search?q=inurl:${href.replace(
    /#.*$/,
    ""
  )}`;
  getPageIndexG(pageIndexGUrl, href.replace(/#.*$/, ""))
    .then((result) => print("page_index_g", result))
    .catch(() =>
      print(
        "page_index_g",
        `<a href="${pageIndexGUrl}" target="_blank">${error()}</a>`
      )
    );

  const pageIndexBUrl = `https://www.bing.com/search?q=url:${href.replace(
    /#.*$/,
    ""
  )}`;
  getPageIndexB(pageIndexBUrl, href.replace(/#.*$/, ""))
    .then((result) => print("page_index_b", result))
    .catch(() =>
      print(
        "page_index_b",
        `<a href="${pageIndexBUrl}" target="_blank">${error()}</a>`
      )
    );

  const indexYahooURL = `https://search.yahoo.com/search?p=site:${hostnameWithoutWWW}`;
  getIndexYahoo(indexYahooURL)
    .then((index) => {
      print("index_yahoo", index);
    })
    .catch(() =>
      print("index_yahoo", `<a href="${indexYahooURL}" target="_blank">0</a>`)
    );

  print(
    "yandex-maps-link",
    `<a href="https://yandex.ru/maps/?mode=search&text=${hostnameWithoutWWW}" target="_blank" data-translation="yandex">${translate(
      "yandex"
    )}</a>`
  );
  print(
    "google-maps-link",
    `<a href="https://www.google.com/maps/search/${hostnameWithoutWWW}" target="_blank">Google</a>`
  );
  print(
    "bing-maps-link",
    `<a href="https://www.bing.com/maps?q=${hostnameWithoutWWW}" target="_blank">Bing</a>`
  );

  fetch(`https://api.whois.vu/?q=${hostname}`)
    .then((response) => response.ok && response.json())
    .then((data) => {
      const created = new Date(data.created * 1000);
      if (created == "Invalid Date") print("domain-create", unknown());
      else print("domain-create", formatDate(created));

      const expires = new Date(data.expires * 1000);
      if (expires == "Invalid Date") print("domain-expires", unknown());
      else print("domain-expires", formatDate(expires));

      if (created == "Invalid Date") print("domain-age", unknown());
      else
        print(
          "domain-age",
          `${getAge(
            created,
            new Date()
          )} <span data-translation="domainAgeAge">${translate(
            "domainAgeAge"
          )}</span>`
        );
    });

  executeOnActiveTab(() => {
    return document.documentElement.outerHTML;
  })
    .then((html) => findCMS(html))
    .then((cms) => {
      if (cms) {
        const iconUrl = new URL(cms.link).host;
        const icon = `<img src="/res/cms/${iconUrl}.png">`;
        print(
          "cms",
          `<a href="${cms.link}" target="_blank" class="cms-link">${icon} ${cms.title}</a>`
        );
      } else {
        print("cms", unknown());
      }
    });

  executeOnActiveTab(async () => {
    const robotTags = Array.from(
      document.querySelectorAll('meta[name="robots"]')
    );

    const robots = robotTags
      .map((tag) => tag.getAttribute("content"))
      .join(" ");

    const response = await fetch(window.location.href, {
      signal: AbortSignal.timeout(5000),
    }).catch(() => null);

    const xRobots = response ? response.headers.get("X-Robots-Tag") : "";

    const canonical = document
      .querySelector('link[rel="canonical"]')
      ?.getAttribute("href")
      .replace(/\/$/, "");

    const href = location.href.replace(/#.*$/, "").replace(/\/$/, "");
    const isCanonicalMatch = !canonical || canonical === href;

    const noIndexMeta = Array.from(
      document.querySelectorAll('meta[content="noindex"]')
    ).map((meta) => meta.getAttribute("name"));

    return { xRobots, robots, isCanonicalMatch, noIndexMeta };
  }).then(async (data) => {
    print("x-robots-tag", data.xRobots ? data.xRobots : none());

    const disallows = await parseRobotsFile();

    const causes = [];

    if (disallows.length > 0) causes.push("robots.txt");
    if (data.robots?.toLowerCase().includes("noindex"))
      causes.push("meta-robots");
    if (data.xRobots?.toLowerCase().includes("noindex"))
      causes.push("x-robots");
    if (!data.isCanonicalMatch) causes.push("canonical");

    document.dispatchEvent(
      new CustomEvent("gettingIndexCases", {
        detail: {
          causes: causes,
        },
      })
    );

    const globalIndexing = causes.length
      ? `${no()} (${causes.join(", ")})`
      : yes();

    const localIndexing = data.noIndexMeta.length
      ? `(${no()}: ${data.noIndexMeta.join(", ")})`
      : "";

    print("is-page-indexing", `${globalIndexing} ${localIndexing}`.trim());
  });

  executeOnActiveTab(() => {
    /** @type {HTMLLinkElement[]} */
    const hreflangElements = Array.from(
      document.querySelectorAll("link[hreflang]")
    );

    return hreflangElements.map((hreflang) => ({
      lang: hreflang.hreflang,
      href: hreflang.href,
    }));
  }).then((data) => {
    const list = document.querySelector(".hreflang__list");

    const toggleLink = document.createElement("a");
    toggleLink.href = "#";
    toggleLink.innerHTML = translate("showAllHreflang");
    toggleLink.setAttribute("data-translation", "showAllHreflang");

    toggleLink.addEventListener("click", () => {
      if (list.classList.toggle("hreflang__list--active")) {
        toggleLink.innerHTML = translate("hideAllHreflang");
        toggleLink.setAttribute("data-translation", "hideAllHreflang");
      } else {
        toggleLink.innerHTML = translate("showAllHreflang");
        toggleLink.setAttribute("data-translation", "showAllHreflang");
      }
    });

    print(
      "page-href-lang-count",
      data.length > 0
        ? `<span data-export="hrefLang">${data.length}</span> (<span data-target="hreflang-toggle"></span>)`
        : `<span data-export="hrefLang">${none()}</span>`
    );

    if (data.length > 0) {
      const countElement = document.querySelector(
        '[data-target="hreflang-toggle"]'
      );
      countElement.append(toggleLink);
    }

    data?.forEach((hreflang) => {
      const lang = document.createElement("span");
      lang.innerHTML = hreflang.lang;

      const link = document.createElement("a");
      link.target = "_blank";
      link.innerHTML = `<span class="hreflang__status"></span><span class="hreflang__href" data-export="${hreflang.lang}">${hreflang.href}</span>`;
      link.href = hreflang.href;

      list.append(lang, link);

      fetch(hreflang.href).then((response) => {
        const status = link.querySelector(".hreflang__status");

        status.innerHTML = `[${response.status}]`;

        status.classList.add(response.ok ? "green" : "red");
      });
    });

    executeOnActiveTab(() => {
      const hasYandexCounter =
        document.documentElement.innerHTML.includes(
          "https://mc.yandex.ru/metrika/tag.js"
        ) ||
        document.documentElement.innerHTML.includes(
          "yandex-metrica-watch/tag.js"
        );

      const hasGoogleCounter =
        document.documentElement.innerHTML.includes(
          "https://www.google-analytics.com/analytics.js"
        ) ||
        document.documentElement.innerHTML.includes(
          "https://www.googletagmanager.com/gtag/js"
        );

      return [hasYandexCounter, hasGoogleCounter];
    }).then(([hasYandexCounter, hasGoogleCounter]) => {
      document
        .querySelector("#yandex-counter-detector")
        .classList.toggle("counter-detector--detected", hasYandexCounter);

      document
        .querySelector("#google-counter-detector")
        .classList.toggle("counter-detector--detected", hasGoogleCounter);
    });

    getFirstSocialLinks();
    getWebVitals();
  });
}

document.addEventListener("languageChanged", () => {
  api.storage.local.get("locale").then(({ locale }) => {
    /** @type {HTMLElement[]} */
    const elementsForHiddenEn = document.querySelectorAll(
      "[data-enable-only-for-russia]"
    );

    elementsForHiddenEn.forEach((element) => {
      element.hidden = locale != "ru";
    });

    /** @type {HTMLElement[]} */
    const elementsForHiddenRu = document.querySelectorAll(
      "[data-disable-only-for-russia]"
    );
    elementsForHiddenRu.forEach((element) => {
      element.hidden = locale == "ru";
    });

    /** @type {HTMLElement[]} */
    const elementsWithDataLocaleAttribute = document.querySelectorAll(
      "[data-locale-attribute]"
    );

    elementsWithDataLocaleAttribute.forEach((element) => {
      const attribute = element.getAttribute("data-locale-attribute");
      const en = element.getAttribute("data-locale-en");
      const ru = element.getAttribute("data-locale-ru");
      element.setAttribute(attribute, locale == "ru" ? ru : en);
    });

    /** @type {HTMLElement[]} */
    const elementsWithDataLocaleContent = document.querySelectorAll(
      "[data-locale-content]"
    );

    elementsWithDataLocaleContent.forEach((element) => {
      const en = element.getAttribute("data-locale-en");
      const ru = element.getAttribute("data-locale-ru");
      element.innerHTML = locale == "ru" ? ru : en;
    });
  });
});

document.addEventListener("DOMContentLoaded", renderSummary);
