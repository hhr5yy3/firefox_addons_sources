import {
  WEBCHATGPT_PROXY_SEARCH_EVENT
} from "../chunks/LZOY24OK.js";
import {
  SearchProviderMap,
  clickElementDelay,
  elementFocusAndApplyPaste,
  findBaiduSearchInput,
  findBingSearchInput,
  findChatgptSearchInput,
  findChatgptWebAccessButton,
  findGoogleSearchInput,
  findPerplexitySearchInput,
  findPerplexityUnDisabledSearchButton,
  getIframeRuntimeApp,
  getPageTopBackgroundColor,
  isInIframe,
  waitFindElement
} from "../chunks/V2QAWIDP.js";
import "../chunks/ERZ5UWI7.js";

// src/contentScripts/proxySearchInject.ts
(function() {
  if (!isInIframe()) {
    return;
  }
  const runtimeApp = getIframeRuntimeApp();
  const providerInfo = {
    id: ""
  };
  const waitId = async () => {
    while (!providerInfo.id) {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    return providerInfo.id;
  };
  const parentPostMessage = (message) => {
    window.parent.postMessage(message, "*");
  };
  const parentPostMessageLoadDone = async (provider) => {
    const bgColor = getPageTopBackgroundColor();
    const id = await waitId();
    parentPostMessage({
      type: "proxy_search_iframe_loaded" /* proxy_search_iframe_loaded */,
      data: {
        id,
        provider,
        bgColor
      }
    });
  };
  const parentPostMessageThemeInfoUpdated = (provider) => {
    const bgColor = getPageTopBackgroundColor();
    parentPostMessage({
      type: "proxy_search_iframe_theme_info_updated" /* proxy_search_iframe_theme_info_updated */,
      data: {
        provider,
        bgColor
      }
    });
  };
  const parentPostMessageFocus = () => {
    parentPostMessage({
      type: "proxy_search_iframe_focus" /* proxy_search_iframe_focus */
    });
  };
  const parentPostMessagePong = (id) => {
    parentPostMessage({
      type: "proxy_search_iframe_pong" /* proxy_search_iframe_pong */,
      data: { id }
    });
  };
  const chatgptInit = async () => {
    waitFindElement(findChatgptSearchInput).then((searchInput) => {
      if (searchInput) {
        setTimeout(() => {
          parentPostMessageLoadDone("ChatGPT" /* ChatGPT */);
        }, 500);
      }
    });
    waitFindElement(findChatgptWebAccessButton).then((webAccessButton) => {
      var _a;
      if (webAccessButton) {
        const enable = ((_a = webAccessButton == null ? void 0 : webAccessButton.parentElement) == null ? void 0 : _a.getAttribute("data-state")) !== "closed";
        if (!enable) {
          clickElementDelay(webAccessButton, 200);
        }
      }
    });
  };
  const allLinkUseNewTab = () => {
    setTimeout(() => {
      document.body.addEventListener(
        "click",
        (e) => {
          const target = e.target;
          const link = target.closest("a");
          if (link && !link.hasAttribute("target")) {
            link.setAttribute("target", "_blank");
          }
        },
        true
      );
      document.querySelectorAll("a:not([target])").forEach((a) => {
        a.setAttribute("target", "_blank");
      });
    }, 1500);
  };
  const preventFocus = () => {
    document.addEventListener(
      "focus",
      function(e) {
        e.preventDefault();
        e.stopPropagation();
        parentPostMessageFocus();
      },
      true
    );
  };
  const googleInit = async () => {
    if (await waitFindElement(findGoogleSearchInput)) {
      parentPostMessageLoadDone("Google" /* Google */);
    }
  };
  const perplexityInit = async () => {
    if (await waitFindElement(findPerplexitySearchInput)) {
      parentPostMessageLoadDone("Perplexity" /* Perplexity */);
    }
  };
  const baiduInit = async () => {
    if (await waitFindElement(findBaiduSearchInput)) {
      parentPostMessageLoadDone("Baidu" /* Baidu */);
    }
  };
  const bingInit = async () => {
    if (await waitFindElement(findBingSearchInput)) {
      parentPostMessageLoadDone("Bing" /* Bing */);
    }
  };
  const receivedSearchMessage = async (event) => {
    const query = event.data.query;
    if (runtimeApp === "Google" /* Google */) {
      const input = findGoogleSearchInput();
      if (input) {
        elementFocusAndApplyPaste(input, query);
      }
      const button = document.querySelector('input[name="btnK"]');
      if (button) {
        clickElementDelay(button);
      } else if (input) {
        const form = input.closest("form");
        if (form) {
          form.submit();
        }
      }
    }
    if (runtimeApp === "Baidu" /* Baidu */) {
      const input = findBaiduSearchInput();
      if (input) {
        elementFocusAndApplyPaste(input, query);
      }
      const button = document.querySelector("#form #su");
      if (button) {
        clickElementDelay(button);
      } else if (input) {
        const form = input.closest("form");
        if (form) {
          form.submit();
        }
      }
    }
    if (runtimeApp === "Bing" /* Bing */) {
      const input = findBingSearchInput();
      if (input) {
        elementFocusAndApplyPaste(input, query);
      }
      if (input) {
        setTimeout(() => {
          const form = input.closest("form");
          if (form) {
            form.submit();
          }
        }, 50);
      } else {
      }
    }
    if (runtimeApp === "ChatGPT" /* ChatGPT */) {
      const input = findChatgptSearchInput();
      if (input) {
        elementFocusAndApplyPaste(input, query);
      }
      const button = document.querySelector('button[data-testid="send-button"]');
      clickElementDelay(button);
      setTimeout(() => {
        const input2 = document.querySelector("#prompt-textarea");
        if (input2) {
          elementFocusAndApplyPaste(input2, query);
        }
        const button2 = document.querySelector(
          'button[data-testid="send-button"]'
        );
        clickElementDelay(button2);
      }, 300);
    }
    if (runtimeApp === "Perplexity" /* Perplexity */) {
      const input = findPerplexitySearchInput();
      if (input) {
        elementFocusAndApplyPaste(input, query);
      }
      const button = await waitFindElement(findPerplexityUnDisabledSearchButton);
      if (button) {
        clickElementDelay(button);
      }
    }
  };
  const receivedResetMessage = (event) => {
    if (runtimeApp) {
      window.location.href = SearchProviderMap[runtimeApp].url;
    }
  };
  const receivedUpdateThemeInfoMessage = (event) => {
    if (runtimeApp) {
      setTimeout(() => {
        parentPostMessageThemeInfoUpdated(runtimeApp);
      }, 150);
    }
  };
  const receivedPingMessage = (event) => {
    providerInfo.id = event.data.data.id;
    parentPostMessagePong(providerInfo.id);
  };
  const proxySearchInitIframe = () => {
    preventFocus();
    allLinkUseNewTab();
    switch (runtimeApp) {
      case "ChatGPT" /* ChatGPT */:
        chatgptInit();
        break;
      case "Google" /* Google */:
        googleInit();
        break;
      case "Perplexity" /* Perplexity */:
        perplexityInit();
        break;
      case "Baidu" /* Baidu */:
        baiduInit();
        break;
      case "Bing" /* Bing */:
        bingInit();
        break;
      default:
        break;
    }
    window.addEventListener("message", (event) => {
      if (event.data.eventId !== WEBCHATGPT_PROXY_SEARCH_EVENT)
        return;
      switch (event.data.type) {
        case "search" /* search */:
          receivedSearchMessage(event);
          break;
        case "reset" /* reset */:
          receivedResetMessage(event);
          break;
        case "update_theme_info" /* update_theme_info */:
          receivedUpdateThemeInfoMessage(event);
          break;
        case "ping" /* ping */:
          receivedPingMessage(event);
          break;
        default:
          break;
      }
    });
  };
  proxySearchInitIframe();
})();
