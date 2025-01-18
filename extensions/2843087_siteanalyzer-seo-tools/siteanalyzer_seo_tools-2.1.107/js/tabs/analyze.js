const yesStatus = () =>
  `<span data-translation="yes">${translate("yes")}</span>`;
const noStatus = () => `<span data-translation="no">${translate("no")}</span>`;

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const qualityTests = [
  {
    groupName: "testGroupImage",
  },
  {
    title: "testNoBrokenImages",
    scores: 5,
    callback: async function () {
      return executeOnActiveTab(() => {
        /** @type {HTMLImageElement[]} */
        const images = document.querySelectorAll("img");
        const brokenImages = Array.from(images).filter((img) => {
          return !img.complete || img.naturalWidth === 0;
        });

        return [brokenImages.length, images.length];
      })
        .then(([brokenImages, images]) => {
          this.status = `${brokenImages.toLocaleString(locale)} / ${images.toLocaleString(locale)}`;
          return !brokenImages;
        })
        .catch(() => false);
    },
  },
  {
    title: "testAllAlts",
    scores: 3,
    callback: async function () {
      return executeOnActiveTab(() => {
        /** @type {HTMLImageElement[]} */
        const images = document.querySelectorAll("img");
        const imagesWithoutAlt = Array.from(images).filter((img) => {
          return !img.alt;
        });

        return [imagesWithoutAlt.length, images.length];
      })
        .then(([imagesWithoutAlt, images]) => {
          this.status = `${imagesWithoutAlt.toLocaleString(locale)} / ${images.toLocaleString(locale)}`;
          return !imagesWithoutAlt;
        })
        .catch(() => false);
    },
  },
  {
    title: "testMinImageSize",
    scores: 1,
    callback: async function () {
      return executeOnActiveTab(async () => {
        /** @type {HTMLImageElement[]} */
        const images = Array.from(document.querySelectorAll("img"));
        const links = [];

        for (image of images) {
          if (!(image.complete && image.naturalWidth !== 0)) continue;
          links.push(image.src);
        }

        return links;
      })
        .then(async (images) => {
          let bigImages = 0;

          for (image of images) {
            const response = await fetch(image, { method: "HEAD" });
            if (!response.ok) continue;

            const contentLength = response.headers.get("content-length");
            if (!contentLength) continue;

            const sizeInBytes = parseInt(contentLength, 10);
            const sizeInKilobytes = sizeInBytes / 1024;

            if (sizeInKilobytes > 200) {
              bigImages++;
            }
          }

          this.status = `${bigImages.toLocaleString(locale)} / ${images.length.toLocaleString(locale)}`;
          return !bigImages;
        })
        .catch(() => false);
    },
  },
  {
    groupName: "testGroupLinks",
  },
  {
    title: "testNoBrokenLinks",
    scores: 5,
    callback: async function () {
      return executeOnActiveTab(() => {
        /** @type {HTMLAnchorElement[]} */
        const links = Array.from(document.querySelectorAll("a"));

        return links.map((link) => link.href);
      })
        .then(async (links) => {
          let badLinks = 0;
          for (link of links) {
            if (!validateURL(link)) continue;
            const response = await fetch(link, {
              method: "HEAD",
              signal: AbortSignal.timeout(5000),
            }).catch(() => null);
            if (!response) {
              badLinks++;
              continue;
            }
            if (response.status === 418) continue;
            if (!response.ok) badLinks++;
          }

          this.status = `${badLinks.toLocaleString(locale)} / ${links.length.toLocaleString(locale)}`;
          return !badLinks;
        })
        .catch(() => false);
    },
  },
  {
    title: "testOneExternalLink",
    scores: 5,
    callback: async function () {
      return executeOnActiveTab(() => {
        const links = Array.from(document.querySelectorAll("a"));
        return links.map((link) => link.href);
      })
        .then((links) => {
          const validLinks = links.filter((link) => validateURL(link));
          this.status = validLinks.length.toLocaleString(locale);
          return validLinks.length > 0;
        })
        .catch(() => false);
    },
  },
  {
    title: "testInternalLinksCount",
    scores: 1,
    callback: async function () {
      return executeOnActiveTab(() => {
        const links = document.querySelectorAll("a");
        const currentHost = window.location.host;

        const internalLinks = Array.from(links).filter((link) => {
          try {
            const linkHost = new URL(link.href).host;
            return linkHost && linkHost === currentHost;
          } catch (_) {
            return false;
          }
        });

        return internalLinks.length;
      })
        .then((internalLinks) => {
          this.status = internalLinks.toLocaleString(locale);
          return internalLinks <= 100;
        })
        .catch(() => false);
    },
  },
  {
    title: "testExternalLinksCount",
    scores: 1,
    callback: async function () {
      return executeOnActiveTab(() => {
        const links = document.querySelectorAll("a");
        const currentHost = window.location.host;

        const externalLinks = Array.from(links).filter((link) => {
          try {
            const linkHost = new URL(link.href).host;
            return linkHost && linkHost !== currentHost;
          } catch (_) {
            return false;
          }
        });

        return externalLinks.length;
      })
        .then((externalLinks) => {
          this.status = externalLinks.toLocaleString(locale);
          return externalLinks <= 10;
        })
        .catch(() => false);
    },
  },
  {
    groupName: "testGroupCanonical",
  },
  {
    title: "testCanonicalEquals",
    scores: 1,
    callback: async function () {
      return executeOnActiveTab(() => {
        const canonical = document
          .querySelector('link[rel="canonical"]')
          ?.getAttribute("href");
        const currentUrl = location.href;

        if (!canonical) return false;

        return canonical.replace(/\/$/, "") === currentUrl.replace(/#.*$/, "").replace(/\/$/, "");
      })
        .then((isCorrect) => {
          this.status = isCorrect ? yesStatus() : noStatus();
          return isCorrect;
        })
        .catch(() => false);
    },
  },
  {
    title: "testHttpsRedirect",
    scores: 3,
    callback: async function () {
      return executeOnActiveTab(() => {
        if (location.protocol === "http:") return null;

        return location.href.replace("https:", "http:");
      })
        .then(async (href) => {
          if (!href) return true;

          const response = await fetch(href, { method: "HEAD" });

          this.status = response.redirected ? yesStatus() : noStatus();

          return response.redirected;
        })
        .catch(() => false);
    },
  },
  {
    groupName: "testGroupIndex",
  },
  {
    title: "testIndexedInRobotsTxt",
    scores: 3,
    callback: async function () {
      let promiseResolve;

      const promise = new Promise(function (resolve) {
        promiseResolve = resolve;
      });

      document.addEventListener("gettingIndexCases", (event) => {
        /** @type {string[]} */
        const causes = event.detail.causes;
        if (!causes || causes.length === 0) {
          promiseResolve(true);
        }

        promiseResolve(!causes.includes("robots.txt"));
      });

      return promise.then((isCorrect) => {
        this.status = isCorrect ? yesStatus() : noStatus();
        return isCorrect;
      });
    },
  },
  {
    title: "testIndexedInMeta",
    scores: 3,
    callback: async function () {
      let promiseResolve;

      const promise = new Promise(function (resolve) {
        promiseResolve = resolve;
      });

      document.addEventListener("gettingIndexCases", (event) => {
        /** @type {string[]} */
        const causes = event.detail.causes;
        if (!causes || causes.length === 0) {
          promiseResolve(true);
        }

        promiseResolve(!causes.includes("meta-robots"));
      });

      return promise.then((isCorrect) => {
        this.status = isCorrect ? yesStatus() : noStatus();

        return isCorrect;
      });
    },
  },
  {
    title: "testIndexedInXRobots",
    scores: 3,
    callback: async function () {
      let promiseResolve;

      const promise = new Promise(function (resolve) {
        promiseResolve = resolve;
      });

      document.addEventListener("gettingIndexCases", (event) => {
        /** @type {string[]} */
        const causes = event.detail.causes;
        if (!causes || causes.length === 0) {
          promiseResolve(true);
        }

        promiseResolve(!causes.includes("x-robots"));
      });

      return promise.then((isCorrect) => {
        this.status = isCorrect ? yesStatus() : noStatus();

        return isCorrect;
      });
    },
  },
  {
    title: "testNotNofollowMeta",
    scores: 1,
    callback: async function () {
      return executeOnActiveTab(() => {
        const metaTags = Array.from(
          document.querySelectorAll('meta[name="robots"]')
        );
        for (meta of metaTags) {
          if (meta.getAttribute("content").includes("nofollow")) {
            return false;
          }
        }

        return true;
      })
        .then((isCorrect) => {
          this.status = isCorrect ? yesStatus() : noStatus();

          return isCorrect;
        })
        .catch(() => false);
    },
  },
  {
    title: "testNotNofollowXRobots",
    scores: 1,
    callback: async function () {
      return executeOnActiveTab(() => {
        return location.href;
      })
        .then(async (href) => {
          const response = await fetch(href);
          const xRobots = response ? response.headers.get("X-Robots-Tag") : "";
          const isCorrect = !xRobots?.toLowerCase().includes("nofollow");

          this.status = isCorrect ? yesStatus() : noStatus();

          return isCorrect;
        })
        .catch(() => false);
    },
  },
  {
    title: "testRobotsTxtAllow",
    scores: 1,
    callback: async function () {
      return executeOnActiveTab(() => {
        return location.origin;
      })
        .then(async (origin) => {
          const robotsUrl = `${origin}/robots.txt`;
          const response = await fetch(robotsUrl);

          const text = response.ok ? await response.text() : null;
          const isCorrect = text ? text.length > 0 : false;

          this.status = isCorrect ? yesStatus() : noStatus();

          return isCorrect;
        })
        .catch(() => false);
    },
  },
  {
    title: "testSitemapAllow",
    scores: 1,
    callback: async function () {
      return executeOnActiveTab(() => {
        return location.origin;
      })
        .then(async (origin) => {
          const robotsUrl = `${origin}/robots.txt`;

          /** @type {string} */
          const robots = await fetch(robotsUrl).then(
            (response) => response.ok && response.text()
          );

          const siteMapUrlFromRobots = robots
            ?.toLocaleLowerCase()
            .match(/sitemap: ([^\n]+)/);

          const siteMapUrl =
            siteMapUrlFromRobots && siteMapUrlFromRobots[1]
              ? siteMapUrlFromRobots[1]
              : `${origin}/sitemap.xml`;

          const isCorrect = await fetch(siteMapUrl)
            .then((response) => response.ok)
            .catch(() => false);

          this.status = isCorrect ? yesStatus() : noStatus();

          return isCorrect;
        })
        .catch(() => false);
    },
  },
  {
    groupName: "testGroupPage",
  },
  {
    title: "testTitleNotEmpty",
    scores: 5,
    callback: async function () {
      return executeOnActiveTab(() => {
        const title = document.querySelector("title");
        return !!title && title.innerText.length > 0;
      })
        .then((isCorrect) => {
          this.status = isCorrect ? yesStatus() : noStatus();

          return isCorrect;
        })
        .catch(() => false);
    },
  },
  {
    title: "testDescriptionNotEmpty",
    scores: 5,
    callback: async function () {
      return executeOnActiveTab(() => {
        const description = document.querySelector('meta[name="description"]');
        return (
          !!description &&
          description.hasAttribute("content") &&
          description.getAttribute("content").length > 0
        );
      })
        .then((isCorrect) => {
          this.status = isCorrect ? yesStatus() : noStatus();

          return isCorrect;
        })
        .catch(() => false);
    },
  },
  {
    title: "testHeaderNotEmpty",
    scores: 5,
    callback: async function () {
      return executeOnActiveTab(() => {
        const h1 = document.querySelector("h1");
        return !!h1 && h1.innerText.length > 0;
      })
        .then((isCorrect) => {
          this.status = isCorrect ? yesStatus() : noStatus();

          return isCorrect;
        })
        .catch(() => false);
    },
  },
  {
    title: "testNotHeadersDoubles",
    scores: 3,
    callback: async function () {
      return executeOnActiveTab(() => {
        const headers = Array.from(
          document.querySelectorAll("h1, h2, h3, h4, h5, h6")
        );

        const uniqueContent = [];
        for (header of headers) {
          const content = header.innerHTML;
          if (uniqueContent.includes(content)) {
            return false;
          } else {
            uniqueContent.push(content);
          }
        }

        return true;
      })
        .then((isCorrect) => {
          this.status = isCorrect ? yesStatus() : noStatus();

          return isCorrect;
        })
        .catch(() => false);
    },
  },
  {
    title: "testOneTitleTag",
    scores: 3,
    callback: async function () {
      return executeOnActiveTab(() => {
        const titles = document.querySelectorAll("title");
        return titles.length <= 1;
      })
        .then((isCorrect) => {
          this.status = isCorrect ? yesStatus() : noStatus();

          return isCorrect;
        })
        .catch(() => false);
    },
  },
  {
    title: "testOneDescTag",
    scores: 3,
    callback: async function () {
      return executeOnActiveTab(() => {
        const descriptions = document.querySelectorAll(
          'meta[name="description"]'
        );
        return descriptions.length <= 1;
      })
        .then((isCorrect) => {
          this.status = isCorrect ? yesStatus() : noStatus();

          return isCorrect;
        })
        .catch(() => false);
    },
  },
  {
    title: "testOneHeaderTag",
    scores: 3,
    callback: async function () {
      return executeOnActiveTab(() => {
        const headers = document.querySelectorAll("h1");
        return headers.length <= 1;
      })
        .then((isCorrect) => {
          this.status = isCorrect ? yesStatus() : noStatus();

          return isCorrect;
        })
        .catch(() => false);
    },
  },
  {
    title: "testTitleNotEqualHeader",
    scores: 3,
    callback: async function () {
      return executeOnActiveTab(() => {
        const title = document.querySelector("title");
        const header = document.querySelector("h1");
        return title?.innerText !== header?.innerText;
      })
        .then((isCorrect) => {
          this.status = isCorrect ? yesStatus() : noStatus();

          return isCorrect;
        })
        .catch(() => false);
    },
  },
  {
    title: "testMinContentSize",
    scores: 3,
    callback: async function () {
      return executeOnActiveTab(() => {
        return document.documentElement.innerText.length;
      })
        .then((length) => {
          this.status = length.toLocaleString(locale);

          return length >= 500;
        })
        .catch(() => false);
    },
  },
  {
    title: "testMaxTitleSize",
    scores: 1,
    callback: async function () {
      return executeOnActiveTab(() => {
        const title = document.querySelector("title");
        return title?.innerText.length;
      })
        .then((length) => {
          this.status = length.toLocaleString(locale) || 0;

          return length ? length <= 70 : false;
        })
        .catch(() => false);
    },
  },
  {
    title: "testMaxDescSize",
    scores: 1,
    callback: async function () {
      return executeOnActiveTab(() => {
        const description = document.querySelector('meta[name="description"]');
        return [
          !!description &&
            description.hasAttribute("content") &&
            description.getAttribute("content").length < 300,
          description?.getAttribute("content").length,
        ];
      })
        .then(async ([isCorrect, length]) => {
          this.status = length.toLocaleString(locale) || 0;
          return isCorrect;
        })
        .catch(() => false);
    },
  },
  {
    title: "testMaxHeadersSize",
    scores: 1,
    callback: async function () {
      return executeOnActiveTab(() => {
        const headers = Array.from(
          document.querySelectorAll("h1, h2, h3, h4, h5, h6")
        );

        let longerTitles = 0;

        for (header of headers) {
          const content = header.innerText;
          if (content.length >= 70) {
            longerTitles++;
          }
        }

        return [longerTitles, headers.length];
      })
        .then(([longer, total]) => {
          this.status = `${longer.toLocaleString(locale)} / ${total.toLocaleString(locale)}`;

          return longer === 0;
        })
        .catch(() => false);
    },
  },
  {
    title: "testMinTitleSize",
    scores: 1,
    callback: async function () {
      return executeOnActiveTab(() => {
        const title = document.querySelector("title");
        return title?.innerText.length;
      })
        .then((length) => {
          this.status = length.toLocaleString(locale) || 0;

          return length ? length > 9 : false;
        })
        .catch(() => false);
    },
  },
  {
    title: "testMinDescSize",
    scores: 1,
    callback: async function () {
      return executeOnActiveTab(() => {
        const description = document.querySelector('meta[name="description"]');
        return [
          !!description &&
            description.hasAttribute("content") &&
            description.getAttribute("content").length > 74,
          description?.getAttribute("content").length,
        ];
      })
        .then(async ([isCorrect, length]) => {
          this.status = length.toLocaleString(locale) || 0;

          return isCorrect;
        })
        .catch(() => false);
    },
  },
  {
    title: "testMinHeadersSize",
    scores: 1,
    callback: async function () {
      return executeOnActiveTab(() => {
        const headers = Array.from(
          document.querySelectorAll("h1, h2, h3, h4, h5, h6")
        );

        let shortHeaders = 0;

        for (header of headers) {
          const content = header.innerText;
          if (content.length < 4) {
            shortHeaders++;
          }
        }

        return [shortHeaders, headers.length];
      })
        .then(([short, total]) => {
          this.status = `${short.toLocaleString(locale)} / ${total.toLocaleString(locale)}`;

          return short === 0;
        })
        .catch(() => false);
    },
  },
  {
    title: "testMaxHTMLSize",
    scores: 1,
    callback: async function () {
      return executeOnActiveTab(() => {
        return document.documentElement.innerHTML.length;
      })
        .then((length) => {
          this.status = length.toLocaleString(locale);

          return length < 200000;
        })
        .catch(() => false);
    },
  },
  {
    title: "testMaxContentSize",
    scores: 1,
    callback: async function () {
      return executeOnActiveTab(() => {
        return document.documentElement.innerText.length;
      })
        .then((length) => {
          this.status = length.toLocaleString(locale);

          return length < 45000;
        })
        .catch(() => false);
    },
  },
  {
    title: "testWaterContent",
    scores: 3,
    callback: async function () {
      let promiseResolve;

      const promise = new Promise(function (resolve) {
        promiseResolve = resolve;
      });

      document.addEventListener("gettingContentInfo", (event) => {
        /** @type {string[]} */
        const waterPercent = event.detail.waterPercent;
        promiseResolve(waterPercent);
      });

      return promise.then((waterPercent) => {
        this.status = `${waterPercent.toFixed(1)}%`;
        return waterPercent <= 15;
      });
    },
  },
  {
    title: "testClassicNausea",
    scores: 3,
    callback: async function () {
      let promiseResolve;

      const promise = new Promise(function (resolve) {
        promiseResolve = resolve;
      });

      document.addEventListener("gettingContentInfo", (event) => {
        /** @type {string[]} */
        const nauseaIndex = event.detail.nauseaIndex;
        promiseResolve(nauseaIndex);
      });

      return promise.then((nauseaIndex) => {
        this.status = `${nauseaIndex.toFixed(1)}%`;
        return between(nauseaIndex, 5, 15);
      });
    },
  },
  {
    title: "testContentToHTMLPercent",
    scores: 1,
    callback: async function () {
      return executeOnActiveTab(() => {
        const contentLength = document.documentElement.innerText.length;
        const htmlLength = document.documentElement.innerHTML.length;

        return contentLength / htmlLength;
      })
        .then((percent) => {
          this.status = `${Math.round(percent * 100)}%`;

          return percent > 0.1;
        })
        .catch(() => false);
    },
  },
  {
    title: "testSchemaOrOG",
    scores: 1,
    callback: async function () {
      return executeOnActiveTab(() => {
        const schemas = document.querySelectorAll("[itemscope]");
        const schemasJSON = document.querySelectorAll(
          'script[type="application/ld+json"]'
        );
        const og = document.querySelectorAll('meta[property^="og:"]');
        const twitter = document.querySelectorAll('meta[name^="twitter:"]');

        return (
          schemas.length + schemasJSON.length + og.length + twitter.length > 0
        );
      })
        .then((isCorrect) => {
          this.status = isCorrect ? yesStatus() : noStatus();

          return isCorrect;
        })
        .catch(() => false);
    },
  },
  {
    title: "testLCP",
    scores: 5,
    callback: async function () {
      return executeOnActiveTab(() => {
        return webVitalsValues["LCP"] || webVitalsValues["FCP"];
      })
        .then((lcp) => {
          this.status = lcp.value.toFixed(1);

          return lcp.value < 2500;
        })
        .catch(() => false);
    },
  },
  {
    title: "testCounters",
    scores: 1,
    callback: async function () {
      return executeOnActiveTab(() => {
        return document.documentElement.innerHTML.includes(
          "https://mc.yandex.ru/metrika/tag.js"
        ) || document.documentElement.innerHTML.includes(
          "https://www.google-analytics.com/analytics.js"
        ) || document.documentElement.innerHTML.includes(
          "https://www.googletagmanager.com/gtag/js"
        );
      })
        .then((isCorrect) => {
          this.status = isCorrect ? yesStatus() : noStatus();

          return isCorrect;
        })
        .catch(() => false);
    },
  },
  {
    groupName: "testGroupLocalize",
  },
  {
    title: "testNoBrokenHreflang",
    scores: 1,
    callback: async function () {
      return executeOnActiveTab(async () => {
        /** @type {HTMLLinkElement[]} */
        const hreflangElements = Array.from(
          document.querySelectorAll("link[hreflang]")
        );

        return hreflangElements.map((hreflang) => hreflang.href);
      })
        .then(async (hreflangLinks) => {
          let brokenLinks = 0;
          for (hreflang of hreflangLinks) {
            const response = await fetch(hreflang).catch(() => null);
            if (!response?.ok) {
              brokenLinks++;
            }
          }

          this.status = `${brokenLinks.toLocaleString(locale)} / ${hreflangLinks.length.toLocaleString(locale)}`;

          return brokenLinks === 0;
        })
        .catch(() => false);
    },
  },
];

const good = () =>
  `<span class="status-indicator status-indicator--good"></span>`;
const bad = (scores) => {
  if (scores >= 5)
    return `<span class="status-indicator status-indicator--bad"></span>`;
  if (scores >= 3)
    return `<span class="status-indicator status-indicator--warning"></span>`;

  return `<span class="status-indicator status-indicator--not-good"></span>`;
};

let targetScores = 0;
let qualityScores = 0;

let completedTests = 0;
let totalTests = 0;

function updateTargetScores() {
  targetScores = 0;

  const allTests = qualityTests.filter((t) => !!t.callback);
  allTests.forEach((test) => (targetScores += test.scores));
}

function runAllTests() {
  qualityScores = 0;

  const allTests = qualityTests.filter((t) => !!t.callback);

  totalTests = allTests.length;
  completedTests = 0;

  allTests.forEach((test) => {
    test.isCompleted = null;
    const callback = test.callback.bind(test);
    callback().then((isCompleted) => {
      test.isCompleted = isCompleted;

      qualityScores += isCompleted ? test.scores : 0;
      completedTests += 1;

      document.dispatchEvent(
        new CustomEvent("testCompleted", {
          detail: {
            test,
          },
        })
      );
    });
  });
}

function generateTestElement(test) {
  const elem = document.createElement("tr");
  elem.classList.add("quality-test");

  const title = document.createElement("td");
  title.classList.add("quality-test__title");
  title.setAttribute("data-translation", test.title);
  title.innerHTML = translate(test.title);

  const status = document.createElement("td");
  status.classList.add("quality-test__status");
  status.innerHTML = "";

  const result = document.createElement("td");
  result.classList.add("quality-test__result");
  result.innerHTML = '<img src="./res/loader.gif" class="loader">';

  elem.append(title, status, result);

  return elem;
}

function generateTestGroup(test, firstRow) {
  const elem = document.createElement("tr");
  elem.classList.add("quality-test", "quality-test--no-hover");

  const title = document.createElement("td");
  title.classList.add("quality-test__group");
  title.setAttribute("data-translation", test.groupName);
  title.innerHTML = translate(test.groupName);

  if (firstRow) {
    const icon1 = document.createElement("td");
    icon1.style.textAlign = "center";
    icon1.innerHTML =
      '<img src="./res/icons/info-solid.svg" class="table-head-icon" />';

    const icon2 = document.createElement("td");
    icon2.style.textAlign = "center";
    icon2.innerHTML =
      '<img src="./res/icons/circle-dot-regular.svg" class="table-head-icon" />';

    elem.append(title, icon1, icon2);
  } else {
    title.colSpan = 3;
    elem.append(title);
  }

  return elem;
}

function renderTests() {
  const testResultsContainer = document.querySelector(
    ".analyze-tests-container tbody"
  );

  testResultsContainer.innerHTML = "";

  let firstRow = true;
  qualityTests.forEach((test) => {
    if (test.groupName) {
      test.element = generateTestGroup(test, firstRow);
      firstRow = false;
    } else {
      test.element = generateTestElement(test);
    }

    testResultsContainer.append(test.element);
  });
}

function updateTestResult(test) {
  if (!test.element) {
    const testResultsContainer = document.querySelector(
      ".analyze-tests-container"
    );

    test.element = generateTestElement(test);
    testResultsContainer.append(test.element);
  }

  /** @type {HTMLElement} */
  const elem = test.element;

  const result = elem.querySelector(".quality-test__result");
  result.innerHTML = test.isCompleted ? good() : bad(test.scores);

  if (test.status) {
    const status = elem.querySelector(".quality-test__status");
    status.innerHTML = test.status;
  }
}

document.addEventListener(
  "testCompleted",
  /** @param {CustomEvent} event  */
  (event) => {
    updateTestResult(event.detail?.test);
    updateDashboard();
  }
);

let dashboard;
function renderDashboard() {
  dashboard = document.querySelector("#dashboard-pie");
}

function updateDashboard() {
  const goodTests = qualityTests.filter((t) => t.isCompleted === true);
  const notGoodTests = qualityTests.filter(
    (t) => t.isCompleted === false && t.scores === 1
  );
  const warningTests = qualityTests.filter(
    (t) => t.isCompleted === false && t.scores === 3
  );
  const badTests = qualityTests.filter(
    (t) => t.isCompleted === false && t.scores === 5
  );

  dashboard.innerHTML = "";
  donut({
    el: dashboard,
    data: [
      {
        value: notGoodTests.length,
        name: "not-good",
      },
      {
        value: warningTests.length,
        name: "warning",
      },
      {
        value: badTests.length,
        name: "bad",
      },
      {
        value: goodTests.length,
        name: "good",
      },
    ],
    size: 120,
    weight: 60,
    colors: ["#8497b0", "#ea960f", "#df2a4a", "#00aa63"],
  });

  print("good-tests-count", goodTests.length);
  print("not-good-tests-count", notGoodTests.length);
  print("warning-tests-count", warningTests.length);
  print("bad-tests-count", badTests.length);

  const qualityPercent = Math.round(qualityScores / (targetScores * 0.01));
  const deg = Math.round(qualityPercent * 1.8 - 90);

  print(
    "quality-bad-scores",
    `${targetScores - qualityScores} / ${targetScores}`
  );
  print("quality-percent", `${qualityPercent}%`);

  const qualityPercentIndicator = document.querySelector(
    '[data-print="quality-percent"]'
  );

  qualityPercentIndicator.setAttribute(
    "class",
    "criteria quality-percent-indicator"
  );
  if (qualityPercent >= 75) {
    qualityPercentIndicator.classList.add("quality-percent-indicator--good");
  } else if (qualityPercent >= 50) {
    qualityPercentIndicator.classList.add(
      "quality-percent-indicator--not-good"
    );
  } else if (qualityPercent >= 25) {
    qualityPercentIndicator.classList.add("quality-percent-indicator--warning");
  } else {
    qualityPercentIndicator.classList.add("quality-percent-indicator--bad");
  }

  /** @type {HTMLImageElement} */
  const arrow = document.querySelector(
    "#site-quality-speedometer > .speedometer__arrow"
  );
  arrow.style.transform = `rotate(${deg}deg)`;

  /** @type {HTMLDivElement} */
  const progressBar = document.querySelector(
    "#quality-tests-progress > .progress-bar__progress"
  );

  const completedTestsPercent = Math.round(
    completedTests / (totalTests * 0.01)
  );
  progressBar.style.width = `${completedTestsPercent}%`;
}

document.addEventListener("DOMContentLoaded", () => {
  updateTargetScores();
  renderDashboard();
  renderTests();
  runAllTests();
});
