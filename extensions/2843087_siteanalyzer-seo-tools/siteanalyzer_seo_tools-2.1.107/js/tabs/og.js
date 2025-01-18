const noTagsData = () =>
  `<span data-translation="noneData" class="no-data">${translate("noneData")}</span>`;

function generateRow(tag, content, isValid) {
  const row = document.createElement("tr");
  row.classList.add("og-table__row");
  row.innerHTML = `<td>${tag}</td><td data-export="${tag}">${content}</td>`;
  row.classList.toggle("og-table__row--invalid", !isValid);

  return row;
}

function renderOGData() {
  const ogContainer = document.querySelector('[data-micro-markup="og"]');
  const ogTable = ogContainer.querySelector("tbody");
  ogTable.innerHTML = "";

  const twitterContainer = document.querySelector(
    '[data-micro-markup="twitter"]'
  );
  const twitterTable = twitterContainer.querySelector("tbody");
  twitterTable.innerHTML = "";

  executeOnActiveTab(() => {
    const ogTags = [
      "og:title",
      "og:type",
      "og:image",
      "og:url",
      "og:audio",
      "og:description",
      "og:determiner",
      "og:locale",
      "og:locale:alternate",
      "og:site_name",
      "og:video",
      "og:image:url",
      "og:image:secure_url",
      "og:image:type",
      "og:image:width",
      "og:image:height",
      "og:image:alt",
      "og:video:url",
      "og:video:secure_url",
      "og:video:type",
      "og:video:width",
      "og:video:height",
    ];

    const twitterTags = [
      "twitter:title",
      "twitter:description",
      "twitter:image",
      "twitter:site",
      "twitter:creator",
      "twitter:card",
    ];

    const og = [];
    const foundedOg = document.querySelectorAll(`meta[property^="og:"]`);
    foundedOg.forEach((tag) => {
      og.push({
        property: tag.getAttribute("property"),
        value: tag.getAttribute("content"),
        isValid: ogTags.includes(tag.getAttribute("property")),
      });
    });

    const twitter = [];
    const foundedTwitter = document.querySelectorAll(`meta[name^="twitter:"]`);
    foundedTwitter.forEach((tag) => {
      twitter.push({
        property: tag.getAttribute("name"),
        value: tag.getAttribute("content"),
        isValid: twitterTags.includes(tag.getAttribute("name")),
      });
    });

    return { og, twitter };
  }).then(({ og, twitter }) => {
    og.forEach((tag) => {
      ogTable.append(generateRow(tag.property, tag.value, tag.isValid));
    });

    const ogContainer =  document.querySelector('[data-micro-markup="og"]');
    if (!og.length) {
      ogContainer.querySelector("table").innerHTML = noTagsData();
    }

    twitter.forEach((tag) => {
      twitterTable.append(generateRow(tag.property, tag.value, tag.isValid));
    });

    const twitterContainer =  document.querySelector('[data-micro-markup="twitter"]');
    if (!twitter.length) {
      twitterContainer.querySelector("table").innerHTML = noTagsData();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderOGData();

  const tabTriggers = document.querySelectorAll("[data-micro-markup-open]");

  tabTriggers.forEach((trigger) =>
    trigger.addEventListener("click", () => {
      const tabs = document.querySelectorAll("[data-micro-markup]");
      tabs.forEach((tab) => tab.classList.add("micro-markup--hidden"));
      tabTriggers.forEach((t) => t.classList.remove("og-tab-link--active"));

      const shownTab = trigger.getAttribute("data-micro-markup-open");
      if (shownTab) {
        const headers = document.querySelectorAll('.og-header');
        headers.forEach(header => header.hidden = true);
        const tab = document.querySelector(`[data-micro-markup="${shownTab}"]`);
        tab.classList.remove("micro-markup--hidden");
      } else {
        const headers = document.querySelectorAll('.og-header');
        headers.forEach(header => header.hidden = false);
        tabs.forEach((tab) => tab.classList.remove("micro-markup--hidden"));
      }

      trigger.classList.add("og-tab-link--active");
    })
  );
});
