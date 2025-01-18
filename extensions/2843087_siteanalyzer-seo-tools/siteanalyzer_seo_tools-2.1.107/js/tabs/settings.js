const userAgents = [
  {
    name: "YandexBot",
    userAgent:
      "Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)",
    botAgent: "YandexBot",
  },
  {
    name: "YandexImages",
    userAgent:
      "Mozilla/5.0 (compatible; YandexImages/3.0; +http://yandex.com/bots)",
    botAgent: "YandexImages",
  },
  {
    name: "GoogleBot",
    userAgent:
      "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
    botAgent: "GoogleBot",
  },
  {
    name: "Googlebot-Image",
    userAgent:
      "Mozilla/5.0 (compatible; Googlebot-Image/1.0; +http://www.google.com/bot.html)",
    botAgent: "Googlebot-Image",
  },
  {
    name: "Googlebot-Mobile",
    userAgent:
      "(compatible; Googlebot-Mobile/2.1; +http://www.google.com/bot.html)",
    botAgent: "Googlebot-Mobile",
  },
  {
    name: "BingBot",
    userAgent:
      "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)",
    botAgent: "BingBot",
  },
  {
    name: "Yahoo! Slurp",
    userAgent:
      "Mozilla/5.0 (compatible; Yahoo! Slurp; http://help.yahoo.com/help/us/ysearch/slurp)",
    botAgent: "Slurp",
  },
  {
    name: "Chrome",
    userAgent:
      "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.815.0 Safari/535.1",
    botAgent: "*",
  },
  {
    name: "Firefox",
    userAgent:
      "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:6.0a2) Gecko/20110613 Firefox/6.0a2",
    botAgent: "*",
  },
  {
    name: "IE8",
    userAgent:
      "Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 5.2; Trident/4.0; Media Center PC 4.0; SLCC1; .NET CLR 3.0.04320)",
    botAgent: "*",
  },
  {
    name: "IE10",
    userAgent:
      "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)",
    botAgent: "*",
  },
  {
    name: "IE11",
    userAgent: "Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko",
    botAgent: "*",
  },
  {
    name: "iPhone",
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 5_0_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Mobile/9A405",
    botAgent: "*",
  },
  {
    name: "Android",
    userAgent:
      "Mozilla/5.0 (Linux; U; Android 2.2; en-us; Nexus One Build/FRF91) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1",
    botAgent: "*",
  },
  {
    name: "Microsoft Edge",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246",
    botAgent: "*",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  /** @type {HTMLInputElement} */
  const highlightNoFollowCheckbox = document.querySelector(
    'input[name="highlightNoFollow"]'
  );
  /** @type {HTMLInputElement} */
  const highlightSponsoredCheckbox = document.querySelector(
    'input[name="highlightSponsored"]'
  );
  /** @type {HTMLInputElement} */
  const highlightUGCCheckbox = document.querySelector(
    'input[name="highlightUGC"]'
  );
  /** @type {HTMLInputElement} */
  const highlightNoindexCheckbox = document.querySelector(
    'input[name="highlightNoindex"]'
  );
  /** @type {HTMLInputElement} */
  const highlightBrokenLinksCheckbox = document.querySelector(
    'input[name="highlightBrokenLinks"]'
  );
  /** @type {HTMLInputElement} */
  const disableCSSCheckbox = document.querySelector('input[name="disableCSS"]');
  /** @type {HTMLInputElement} */
  const disableJSCheckbox = document.querySelector('input[name="disableJS"]');
  const customUserAgentSelect = document.querySelector("#custom-user-agent");

  api.storage.local
    .get([
      "highlightNoFollow",
      "highlightSponsored",
      "highlightUGC",
      "highlightNoindex",
      "highlightBrokenLinks",
      "customUserAgent",
      "disableCSS",
      "disableJS",
    ])
    .then(
      async ({
        highlightNoFollow,
        highlightSponsored,
        highlightUGC,
        highlightNoindex,
        highlightBrokenLinks,
        customUserAgent,
        disableCSS,
        disableJS,
      }) => {
        highlightNoFollowCheckbox.checked = highlightNoFollow;
        highlightSponsoredCheckbox.checked = highlightSponsored;
        highlightUGCCheckbox.checked = highlightUGC;
        highlightNoindexCheckbox.checked = highlightNoindex;
        highlightBrokenLinksCheckbox.checked = highlightBrokenLinks || false;
        disableCSSCheckbox.checked = disableCSS;
        disableJSCheckbox.checked = disableJS || false;

        initCustomUserAgent(customUserAgentSelect, customUserAgent);
        await setUserAgent(customUserAgent, false);
      }
    );

  highlightNoFollowCheckbox.addEventListener("change", () => {
    api.storage.local
      .set({
        highlightNoFollow: highlightNoFollowCheckbox.checked,
      })
      .then(() => {
        executeOnActiveTab(() =>
          document.dispatchEvent(new CustomEvent("SeoExtensionHighlightLinks"))
        );
      });
  });

  highlightSponsoredCheckbox.addEventListener("change", () => {
    api.storage.local
      .set({
        highlightSponsored: highlightSponsoredCheckbox.checked,
      })
      .then(() => {
        executeOnActiveTab(() =>
          document.dispatchEvent(new CustomEvent("SeoExtensionHighlightLinks"))
        );
      });
  });

  highlightUGCCheckbox.addEventListener("change", () => {
    api.storage.local
      .set({
        highlightUGC: highlightUGCCheckbox.checked,
      })
      .then(() => {
        executeOnActiveTab(() =>
          document.dispatchEvent(new CustomEvent("SeoExtensionHighlightLinks"))
        );
      });
  });

  highlightNoindexCheckbox.addEventListener("change", () => {
    api.storage.local
      .set({
        highlightNoindex: highlightNoindexCheckbox.checked,
      })
      .then(() => {
        executeOnActiveTab(() =>
          document.dispatchEvent(new CustomEvent("SeoExtensionHighlightLinks"))
        );
      });
  });

  disableCSSCheckbox.addEventListener("change", () => {
    api.storage.local
      .set({
        disableCSS: disableCSSCheckbox.checked,
      })
      .then(() => {
        executeOnActiveTab(() =>
          document.dispatchEvent(new CustomEvent("SeoExtensionSwitchCss"))
        );
      });
  });

  disableJSCheckbox.addEventListener("change", () => {
    api.storage.local
      .set({
        disableJS: disableJSCheckbox.checked,
      })
      .then(() => {
        executeOnActiveTab(() =>
          document.dispatchEvent(new CustomEvent("SeoExtensionSwitchJs"))
        );
      });
  });

  highlightBrokenLinksCheckbox.addEventListener("change", () => {
    api.storage.local
      .set({
        highlightBrokenLinks: highlightBrokenLinksCheckbox.checked,
      })
      .then(() => {
        executeOnActiveTab(() =>
          document.dispatchEvent(new CustomEvent("UpdateBrokenLinksRender"))
        );
      });
  });

  /** @type {HTMLSelectElement} */
  const languageSelect = document.querySelector(`select[name="language"]`);
  languageSelect.addEventListener("change", () => {
    setLocale(languageSelect.value);
  });
});

document.addEventListener("languageChanged", () => {
  /** @type {HTMLSelectElement} */
  const languageSelect = document.querySelector(`select[name="language"]`);
  api.storage.local.get("locale").then(({ locale }) => {
    languageSelect.value = locale;
  });
});

function initCustomUserAgent(selectElement, defaultValue = "Disabled") {
  const defaultOption = document.createElement("option");
  defaultOption.setAttribute("data-translation", "customUserAgentDisabled");
  defaultOption.value = "Disabled";
  defaultOption.classList.add("settings-tab__select_default")
  selectElement.appendChild(defaultOption);

  userAgents.forEach(({ name, userAgent }) => {
    const option = document.createElement("option");
    option.value = userAgent;
    option.textContent = name;
    selectElement.appendChild(option);
  });

  selectElement.selectedIndex = 2;
  selectElement.selectedIndex = [...selectElement.options].findIndex(
    (option) => option.value === defaultValue
  );

  selectElement.addEventListener("change", async (event) => {
    const selectedValue = event.target.value;
    const selectedLabel = event.target.options[event.target.selectedIndex].innerHTML;
    api.storage.local.set({
      customUserAgent: selectedValue,
      customUserAgentLabel: selectedLabel,
    });
    await setUserAgent(selectedValue)
  });
}

const setUserAgent = async (ua, saveToStore=true) => {
  if(!ua || ua === 'Disabled') {
    ua = navigator.userAgent;
  }
  document.querySelector("#current-user-agent").textContent = ua;
  if(saveToStore) {
    await UaManager.set(ua)
  }
}
