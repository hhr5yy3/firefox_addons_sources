function getSeoData() {
  const na = "Not specified";

  for (let i = 1; i <= 6; i++) {
    window["h" + i + "s"] = [...document.querySelectorAll("h" + i)].map(
      (h) => h.textContent
    );
  }

  const headings = [...document.querySelectorAll("h1, h2, h3, h4, h5, h6")].map(
    (h) => ({ type: h.nodeName, text: h.textContent })
  );

  const links = [...document.querySelectorAll("a")].map((l) => ({
    anchor: l.textContent ? l.textContent.trim() : "/",
    link: l.href,
    title: l.title || "",
  }));
  const images = [...document.querySelectorAll("img")].map((i) => ({
    alt: i.alt || "-",
    link: i.dataset.src == "undefined" ? i.src : i.dataset.src || i.src,
    width: i.width,
    height: i.height,
  }));

  const schema = [];

  p = () => {
    const e = [
        ...document.querySelectorAll('script[type="application/ld+json"]'),
      ].flatMap((e) => {
        const t = e.textContent.replace(/\n/g, "");
        try {
          const e = JSON.parse(t);
          // return [].concat(e);
          return [].concat(e["@graph"] || e);
        } catch (i) {
          return [{ "@type": "Parsing Error", __data: t }];
        }
      }),
      t = (e) => {
        const i = [...e.querySelectorAll("[itemprop]")]
          .filter((t) => t.parentNode.closest("[itemscope]") === e)
          .map((e) => ({
            prop: e.getAttribute("itemprop"),
            value: e.matches("[itemscope]")
              ? t(e)
              : ((e) => {
                  switch (e.nodeName) {
                    case "META":
                      return e.getAttribute("content");
                    case "AUDIO":
                    case "EMBED":
                    case "IFRAME":
                    case "IMG":
                    case "SOURCE":
                    case "TRACK":
                    case "VIDEO":
                      return e.getAttribute("src");
                    case "A":
                    case "AREA":
                    case "LINK":
                      return e.getAttribute("href");
                    case "OBJECT":
                      return e.getAttribute("data");
                    case "DATA":
                    case "METER":
                      return e.getAttribute("value");
                    case "TIME":
                      return e.getAttribute("datetime");
                    default:
                      return e.textContent;
                  }
                })(e),
          }))
          .reduce(
            (e, { prop: t, value: i }) => (
              e[t] ? ((e[t] = [].concat(e[t])), e[t].push(i)) : (e[t] = i), e
            ),
            {}
          );
        return {
          "@type": e.getAttribute("itemtype"),
          "@id": e.getAttribute("itemid") || void 0,
          ...i,
        };
      };
    return [
      ...e,
      ...[...document.querySelectorAll("[itemscope]")]
        .filter((e) => !e.matches("[itemscope] *"))
        .map((e) => t(e)),
    ];
  };

  const pData = p();
  for (const item of pData) {
    schema.push(JSON.stringify(item));
  }

  // Index is always first
  const modifyMetaRobots = function (content) {
    let modifiedMetaRobots = content.replace(" ", "").split(",");
    for (
      let elementIndex = 0;
      elementIndex < modifiedMetaRobots.length;
      elementIndex++
    ) {
      if (
        modifiedMetaRobots[elementIndex] == "index" ||
        modifiedMetaRobots[elementIndex] == "noindex"
      ) {
        if (elementIndex != 0) {
          // swap so INDEX is always first and upper case
          [modifiedMetaRobots[0], modifiedMetaRobots[elementIndex]] = [
            modifiedMetaRobots[elementIndex],
            modifiedMetaRobots[0],
          ];
        }
      }
    }
    return modifiedMetaRobots.join(", ");
  };

  function getWords() {
    try {
      let words =
        document.body[
          "innerText" in document.body ? "innerText" : "textContent"
        ];

      return words || "";
    } catch (e) {
      console.log("Error reading words", e);
    }

    return "";
  }

  let SEO = {
    title: document.title || na,
    description: document.querySelector('meta[name="description" i]')
      ? document.querySelector('meta[name="description" i]').content
      : na,
    hostname: window.location.hostname,
    origin: window.location.origin,
    url: window.location.href,
    canonical:
      document.querySelector('link[rel="canonical"]') &&
      document.querySelector('link[rel="canonical"]').href
        ? document.querySelector('link[rel="canonical"]').href
        : na,
    meta_robots: document.querySelector('meta[name="robots"]')
      ? modifyMetaRobots(
          document.querySelector('meta[name="robots"]').content.toLowerCase()
        )
      : "Not specified",
    h1s,
    h2s,
    h3s,
    h4s,
    h5s,
    h6s,
    headings,
    links,
    images,
    schema,
    words: getWords() || "",
    socialData: getSocialData()
  };

  return SEO;
}

function getSocialData() {
  let siteName = document.querySelector('meta[property="og:site_name"]')?.content;
  let ogTitle = document.querySelector('meta[property="og:title"]')?.content;
  let ogDescription = document.querySelector(
    'meta[property="og:description"]'
  )?.content;
  let ogImage = document.querySelector('meta[property="og:image"]')?.content;
  let twitterTitle = document.querySelector(
    'meta[name="twitter:title"]'
  )?.content || ogTitle;
  let twitterDescription = document.querySelector(
    'meta[name="twitter:description"]'
  )?.content || ogDescription;
  let twitterImage = document.querySelector(
    'meta[name="twitter:image"]'
  )?.content;

  let socialData = {
    siteName: siteName,
    ogTitle: ogTitle,
    ogDescription: ogDescription,
    ogImage: ogImage,
    twitterTitle: twitterTitle,
    twitterDescription: twitterDescription,
    twitterImage: twitterImage,
  };

  return socialData;
}

function highlight_nofollow_links() {
  const anchors = document.querySelectorAll('a[rel~="nofollow"]');

  if (anchors.length) {
    for (const anchor of anchors) {
      if (anchor.className.indexOf("nofollow_highlighted") === -1) {
        anchor.classList.add("nofollow_highlighted");
      } else {
        anchor.classList.remove("nofollow_highlighted");
      }
    }

    const highlighted = document.querySelectorAll(".nofollow_highlighted");

    if (highlighted.length) {
      return "enabled";
    } else {
      return "disabled";
    }
  } else {
    alert("Nofollow Links were not found.");
    return "disabled";
  }
}

function checkHighlightNofollowLinksState() {
  const highlighted = document.querySelectorAll(".nofollow_highlighted");

  if (highlighted.length) {
    return "enabled";
  } else {
    return "disabled";
  }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action == "Get SEO Data") {
    var data = getSeoData();
    // data['tabId'] = request.tabId
    sendResponse(JSON.stringify(data));
  } else if (request.action == "Highlight Nofollow Links") {
    var status = highlight_nofollow_links();
    sendResponse({ status: status, close: true });
  } else if (request.action == "Check Highlight Nofollow Links State") {
    var status = checkHighlightNofollowLinksState();
    sendResponse({ status: status, close: false });
  } else if (request.action == "Update icon") {
    var data = getSeoData();
    sendResponse({
      showCanonicalBadge:
        !data.canonical.includes("Not specified") && data.canonical != data.url,
      showMetarobotsBadge: data.meta_robots.includes("noindex"),
    });
  } else if (request.action == "Reload") {
    location.reload();
  }
});
