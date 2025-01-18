const seoExtensionAPI = typeof browser !== "undefined" ? browser : chrome;

function processedNoindexTags() {
  seoExtensionAPI.storage?.local
    .get("highlightNoindex")
    .then(({ highlightNoindex }) => {
      const elements = document.querySelectorAll("*");

      /**
       * @param {Node} node
       * @returns {boolean}
       */
      const isOpenTag = (node) => {
        if (node.nodeType !== node.COMMENT_NODE) return false;
        return node.nodeValue.trim() === "noindex";
      };

      /**
       * @param {Node} node
       * @returns {boolean}
       */
      const isCloseTag = (node) => {
        if (node.nodeType !== node.COMMENT_NODE) return false;
        return node.nodeValue.trim() === "/noindex";
      };

      elements.forEach((el) => {
        let child = el.firstChild;
        let paintingMode = false;

        while (child) {
          if (child.nodeType === child.ELEMENT_NODE) {
            child.classList.toggle(
              "seo-extension-noindex",
              !!highlightNoindex && paintingMode
            );
          }

          if (paintingMode && child.nodeType === child.TEXT_NODE) {
            const noindex = document.createElement("noindex");
            noindex.innerHTML = child.nodeValue;

            child.replaceWith(noindex);
          }

          if (isOpenTag(child)) paintingMode = true;
          if (isCloseTag(child)) paintingMode = false;

          child = child.nextSibling;
        }
      });

      const noindexElements = document.querySelectorAll("noindex");
      noindexElements.forEach((element) => {
        if (!element.innerHTML.trim()) {
          element.remove();
          return;
        }
        element.classList.toggle(
          "seo-extension-noindex",
          highlightNoindex || false
        );
      });
    });
}

function highlightLinks() {
  seoExtensionAPI.storage?.local
    ?.get(["highlightNoFollow", "highlightSponsored", "highlightUGC"])
    .then(({ highlightNoFollow, highlightSponsored, highlightUGC }) => {
      const noFollowLinks = document.querySelectorAll('a[rel*="nofollow"]');
      noFollowLinks.forEach((link) =>
        link.classList.toggle(
          "seo-extension-nofollow",
          highlightNoFollow || false
        )
      );

      const sponsoredLinks = document.querySelectorAll('a[rel*="sponsored"]');
      sponsoredLinks.forEach((link) =>
        link.classList.toggle(
          "seo-extension-sponsored",
          highlightSponsored || false
        )
      );

      const ugcLinks = document.querySelectorAll('a[rel*="ugc"]');
      ugcLinks.forEach((link) =>
        link.classList.toggle("seo-extension-ugc", highlightUGC || false)
      );
    });
}

function checkAndSwitchCSS() {
  seoExtensionAPI.storage?.local?.get(["disableCSS"]).then(({ disableCSS }) => {
    const stylesheets = document.querySelectorAll(
      'style, link[rel="stylesheet"]'
    );
    const allElements = document.querySelectorAll("*");

    if (disableCSS || false) {
      stylesheets.forEach((stylesheet) => {
        stylesheet.disabled = true;
      });

      allElements.forEach((element) => {
        if (!element.hasAttribute("style")) return;
        const styles = element.getAttribute("style");
        element.setAttribute("data-seo-extension-style", styles);
        element.removeAttribute("style");
      });
    } else {
      stylesheets.forEach((stylesheet) => {
        stylesheet.disabled = false;
      });

      allElements.forEach((element) => {
        if (!element.hasAttribute("data-seo-extension-style")) return;
        const styles = element.getAttribute("data-seo-extension-style");
        element.setAttribute("style", styles);
        element.removeAttribute("data-seo-extension-style");
      });
    }
  });
}

function checkAndSwitchJS() {
  seoExtensionAPI.storage?.local?.get(["disableJS"]).then(({ disableJS }) => {
    if (disableJS || false) {
      const meta = document.createElement("meta");
      meta.setAttribute("http-equiv", "Content-Security-Policy");
      meta.setAttribute("content", "script-src 'none'");
      document.head.append(meta);
    }
  });
}

document.addEventListener("SeoExtensionHighlightLinks", () => {
  highlightLinks();
  processedNoindexTags();
});
document.addEventListener("SeoExtensionSwitchCss", () => {
  checkAndSwitchCSS();
});
document.addEventListener("SeoExtensionSwitchJs", () => {
  window.location.reload();
});

document.addEventListener("DOMContentLoaded", () => {
  const mutationObserver = new MutationObserver(() => highlightLinks());

  seoExtensionAPI.runtime.connect().onDisconnect.addListener(function () {
    mutationObserver.disconnect();
  });

  mutationObserver.observe(document, {
    childList: true,
    subtree: true,
  });

  highlightLinks();
  processedNoindexTags();
  checkAndSwitchCSS();
});

checkAndSwitchJS();

let lastTagName = null;
function handleTagsHighlight() {
  seoExtensionAPI.storage.local
    .get("isHeadersHighlighted")
    .then(({ isHeadersHighlighted }) => {
      /** @type {HTMLHeadingElement[]} */
      const headers = document.querySelectorAll("[data-heading-tag]");
      headers.forEach((header) => {
        header.classList.toggle(
          "seo-extension-header-highlighted",
          (isHeadersHighlighted || false) &&
            (lastTagName
              ? header.getAttribute("data-heading-tag") === lastTagName
              : true)
        );
      });
    });
}

document.addEventListener(
  "changeHeadersHighlight",
  /** @param {CustomEvent} event  */
  (event) => {
    const tagName = event.detail?.tagName;
    lastTagName = typeof tagName !== "undefined" ? tagName : lastTagName;

    handleTagsHighlight();
  }
);

document.addEventListener("DOMContentLoaded", () => {
  const headers = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
  headers.forEach((header) => {
    header.setAttribute("data-heading-tag", header.tagName);
  });

  handleTagsHighlight();

  document.addEventListener(
    "changeHeadersHighlight",
    /** @param {CustomEvent} event  */
    (event) => {
      const tagName = event.detail?.tagName;
      lastTagName = typeof tagName !== "undefined" ? tagName : lastTagName;

      handleTagsHighlight();
    }
  );
});

const webVitalsValues = {};

function addWebVitalsMetric(metric) {
  webVitalsValues[metric.name] = {
    value: metric.value,
    delta: metric.delta,
    rating: metric.rating,
  };
}

webVitals.onCLS(addWebVitalsMetric);
webVitals.onFCP(addWebVitalsMetric);
webVitals.onFID(addWebVitalsMetric);
webVitals.onINP(addWebVitalsMetric);
webVitals.onLCP(addWebVitalsMetric);
webVitals.onTTFB(addWebVitalsMetric);

document.addEventListener("UpdateBrokenLinksRender", () => {
  seoExtensionAPI.storage.local
    .get("highlightBrokenLinks")
    .then(({ highlightBrokenLinks }) => {
      const brokenLinks = document.querySelectorAll("[data-broken-link]");
      brokenLinks.forEach((link) =>
        link.setAttribute("data-broken-link", highlightBrokenLinks || false)
      );
    });
});
