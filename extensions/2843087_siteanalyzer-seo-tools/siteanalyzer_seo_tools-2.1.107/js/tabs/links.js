let linksCached = false;
let linkStorage = [];

const htmlLinkContent = () =>
  `<span data-translation="htmlLinkContent">${translate(
    "htmlLinkContent"
  )}</span>`;
const imageLinkContent = () =>
  `<span data-translation="imageLinkContent">${translate(
    "imageLinkContent"
  )}</span>`;
const unknownLinkContent = () =>
  `<span data-translation="unknownLinkContent">${translate(
    "unknownLinkContent"
  )}</span>`;

/**
 * @param {string} link
 * @returns {boolean}
 */
function isLinkUnusual(link) {
  const parts = ["whatsapp:", "viber:", "tg:", "skype:", "mailto:", "tel:"];

  let isUnusual = false;
  parts.forEach((part) => {
    if (link.includes(part)) {
      isUnusual = true;
    }
  });

  return isUnusual;
}

/**
 * @param {string} link
 * @returns {string}
 */
function formatLink(link) {
  if (link.length < 110) return link;

  const start = link.substring(0, 55);
  const end = link.substring(link.length - 55);

  return `${start}…${end}`;
}

/**
 * @param {string|undefined} html
 */
function getLinkContent(html) {
  if (!html) return unknownLinkContent();

  if (html.includes("img")) return imageLinkContent();
  return htmlLinkContent();
}

/**
 * @param {{href, title, html}} link
 * @param {string} status
 * @returns
 */
function generateLinkElement(link) {
  const template = document.querySelector("template#links-item");
  const linkElement = document.createElement("div");
  linkElement.innerHTML = template.innerHTML;

  const linkHref = linkElement.querySelector(".link-item__href");
  linkHref.href = link.href;
  linkHref.innerHTML = link.href;

  const linkAnchor = linkElement.querySelector(".link-item__anchor");

  if (link.title || link.html) {
    linkAnchor.innerHTML = link.title.trim()
      ? link.title
      : getLinkContent(link.html);
  } else {
    linkElement.querySelector(".link-item__anchor-wrapper").remove();
  }

  return translateElement(linkElement);
}

async function renderLinks() {
  const internalLinksContainer = document.querySelector(
    '.links-list[data-type="internal"]'
  );
  const externalLinksContainer = document.querySelector(
    '.links-list[data-type="external"]'
  );
  const brokenLinksContainer = document.querySelector(
    '.links-list[data-type="broken"]'
  );
  const redirectLinksContainer = document.querySelector(
    '.links-list[data-type="redirect"]'
  );
  const socialLinksContainer = document.querySelector(
    '.links-list[data-type="social"]'
  );
  const otherLinksContainer = document.querySelector(
    '.links-list[data-type="other"]'
  );
  const jsLinksContainer = document.querySelector(
    '.links-list[data-type="js"]'
  );
  const cssLinksContainer = document.querySelector(
    '.links-list[data-type="css"]'
  );
  const wordLinksContainer = document.querySelector(
    '.links-list[data-type="word"]'
  );

  linkStorage = [];

  executeOnActiveTab(() => {
    const a = Array.from(document.querySelectorAll("a")).map((link) => ({
      href: link.href,
      origin: link.origin,
      title: link.innerText,
      html: link.innerHTML,
    }));

    const css = Array.from(
      document.querySelectorAll('link[rel="stylesheet"]')
    ).map((link) => ({
      href: link.href,
      origin: new URL(link.href).origin,
      title: null,
      html: null,
    }));

    const js = Array.from(document.querySelectorAll("script[src]")).map(
      (script) => ({
        href: script.src,
        origin: new URL(script.src).origin,
        title: null,
        html: null,
      })
    );

    const links = [...a, ...css, ...js];

    links.sort((a, b) => (a.href >= b.href ? 1 : -1));

    return {
      links: links,
      origin: window.location.origin,
    };
  }).then(({ links, origin }) => {
    /** @type {object[]} */
    const uniqueLinks = links.filter(getUniqueValues);
    /** @type {object[]} */
    const internalLinks = links.filter((link) => link.origin === origin);
    /** @type {object[]} */
    const externalLinks = links.filter((link) => link.origin !== origin);

    print("links-all-counter", links.length);
    print("unique-links-counter", uniqueLinks.length);
    print("internal-links-counter", internalLinks.length);
    print("external-links-counter", externalLinks.length);

    const brokenUrls = [];

    const addBrokenUrl = (url) => {
      brokenUrls.push(url);
      executeOnActiveTab(
        (brokenUrl) => {
          const links = Array.from(document.querySelectorAll("a"));
          const brokenLinks = links.filter((link) => link.href === brokenUrl);
          brokenLinks.forEach((link) =>
            link.setAttribute("data-broken-link", false)
          );
          document.dispatchEvent(new CustomEvent("UpdateBrokenLinksRender"));
        },
        [url]
      );
    };

    /**
     * @param {HTMLAnchorElement} linkElement
     */
    const checkLinkStatus = (linkElement, href) => {
      const linkStatus = linkElement.querySelector(".link-item__status");
      return fetch(href)
        .then((response) => {
          if (response.ok) {
            linkStatus.innerHTML = `<span class="green">${response.status} ${response.statusText}</span>`;
          } else {
            linkStatus.innerHTML = `<span class="red">${response.status} ${response.statusText}</span>`;
          }

          if (response.redirected) {
            redirectLinksContainer.append(linkElement.cloneNode(true));
            print(
              "accordion-redirect-links-count",
              redirectLinksContainer.childElementCount
            );
          }

          return response;
        })
        .catch((err) => {
          linkStatus.innerHTML = `<span class="red">${err.message}</span>`;
          throw err;
        });
    };

    const getUrlExtension = (url) => {
      return url.split(/[#?]/)[0].split(".").pop().trim().toLowerCase();
    };

    links.forEach((link) => {
      const linkElement = generateLinkElement(link);

      const linkInfo = {
        href: link.href,
        title: link.title,
      };

      linkStorage.push(linkInfo);

      if (internalLinks.includes(link)) {
        internalLinksContainer.append(linkElement);
        print(
          "accordion-internal-links-count",
          internalLinksContainer.childElementCount
        );
      }

      if (externalLinks.includes(link) && validateURL(link.href)) {
        externalLinksContainer.append(linkElement);
        print(
          "accordion-external-links-count",
          externalLinksContainer.childElementCount
        );
      }

      if (isLinkSocial(link.href)) {
        socialLinksContainer.append(linkElement);
        print(
          "accordion-social-links-count",
          socialLinksContainer.childElementCount
        );
      }

      const linkStatus = linkElement.querySelector(".link-item__status");

      if (isLinkUnusual(link.href)) {
        linkStatus.innerHTML = `<span class="red">N/A</span>`;
        otherLinksContainer.append(linkElement.cloneNode(true));
        print(
          "accordion-other-links-count",
          otherLinksContainer.childElementCount
        );
        return;
      }

      if (!validateURL(link.href)) {
        linkStatus.innerHTML = `<span class="red" data-translation="invalidHref">${translate(
          "invalidHref"
        )}</span>`;
        otherLinksContainer.append(linkElement.cloneNode(true));
        print(
          "accordion-other-links-count",
          otherLinksContainer.childElementCount
        );
        return;
      }

      const ext = getUrlExtension(link.href);
      switch (true) {
        case ["js"].includes(ext): {
          const elem = linkElement.cloneNode(true);
          jsLinksContainer.append(elem);
          checkLinkStatus(elem, link.href);
          print("accordion-js-links-count", jsLinksContainer.childElementCount);
          break;
        }
        case ["css"].includes(ext): {
          const elem = linkElement.cloneNode(true);
          cssLinksContainer.append(elem);
          checkLinkStatus(elem, link.href);
          print(
            "accordion-css-links-count",
            cssLinksContainer.childElementCount
          );
          break;
        }
        case [
          "doc",
          "docx",
          "xls",
          "xlsx",
          "ods",
          "ots",
          "xml",
          "csv",
          "pdf",
        ].includes(ext): {
          const elem = linkElement.cloneNode(true);
          wordLinksContainer.append(elem);
          checkLinkStatus(elem, link.href);
          print(
            "accordion-word-links-count",
            wordLinksContainer.childElementCount
          );
          break;
        }
      }

      checkLinkStatus(linkElement, link.href)
        .then((response) => {
          linkInfo.status = response.status;
          if (!response.ok) {
            brokenLinksContainer.append(linkElement.cloneNode(true));
            addBrokenUrl(link.href);
            print(
              "accordion-broken-links-count",
              brokenLinksContainer.childElementCount
            );
          }
        })
        .catch(() => {
          brokenLinksContainer.append(linkElement.cloneNode(true));
          addBrokenUrl(link.href);
          print(
            "accordion-broken-links-count",
            brokenLinksContainer.childElementCount
          );
          linkInfo.status = 500;
        });
    });

    executeOnActiveTab(() => {}).then(([css, js]) => {
      console.log(css, js);
    });

    document.dispatchEvent(new CustomEvent("AccordionsUpdate"));
  });
}

function exportAllLinksToCSV() {
  if (!linkStorage.length) return;

  const rowsFormatted = linkStorage.map((link) => [
    link.href.replace("#", "%23"),
    link.title?.replace("#", "%23"),
    link.status,
  ]);

  rowsFormatted.unshift([
    translate("Href"),
    translate("Title"),
    translate("status"),
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
      `${punycode.ToUnicode(hostname)}_export_links.csv`
    );
    link.click();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  executeOnActiveTab(() => {
    const links = Array.from(document.querySelectorAll("a"));

    return {
      links: links.map((link) => ({
        href: link.href,
        origin: link.origin,
        title: link.innerText,
        html: link.innerHTML,
      })),
      origin: window.location.origin,
    };
  }).then(({ links, origin }) => {
    /** @type {object[]} */
    const uniqueLinks = links.filter(getUniqueValues);
    /** @type {object[]} */
    const internalLinks = links.filter((link) => link.origin === origin);
    /** @type {object[]} */
    const externalLinks = links.filter((link) => link.origin !== origin);

    print("links-all-counter", links.length);
    print("unique-links-counter", uniqueLinks.length);
    print("internal-links-counter", internalLinks.length);
    print("external-links-counter", externalLinks.length);
  });

  document
    .querySelector("#export-links-to-csv-button")
    .addEventListener("click", () => {
      exportAllLinksToCSV();
    });
});

document.addEventListener("LinksTabOpen", () => {
  if (linksCached) return;

  renderLinks();
  linksCached = true;
});
