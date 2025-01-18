// src/features/searchChatHub/constants/chatHub.ts
var SearchProviderMap = {
  ["ChatGPT" /* ChatGPT */]: {
    providerKey: "ChatGPT" /* ChatGPT */,
    name: "ChatGPT",
    url: "https://chatgpt.com"
  },
  ["Perplexity" /* Perplexity */]: {
    providerKey: "Perplexity" /* Perplexity */,
    name: "Perplexity",
    url: "https://www.perplexity.ai"
  },
  ["Google" /* Google */]: {
    providerKey: "Google" /* Google */,
    name: "Google search",
    url: "https://www.google.com"
  },
  ["Baidu" /* Baidu */]: {
    providerKey: "Baidu" /* Baidu */,
    name: "Baidu search",
    url: "https://www.baidu.com"
  },
  ["Bing" /* Bing */]: {
    providerKey: "Bing" /* Bing */,
    name: "Bing search",
    url: "https://www.bing.com"
  }
};
var SearchProviderList = [
  "ChatGPT" /* ChatGPT */,
  "Perplexity" /* Perplexity */,
  "Google" /* Google */,
  "Bing" /* Bing */,
  "Baidu" /* Baidu */
];
var MenuQueryMap = {
  ["Perplexity" /* Perplexity */]: "perplexity",
  ["ChatGPT" /* ChatGPT */]: "chatgpt",
  ["Baidu" /* Baidu */]: "baidu",
  ["Google" /* Google */]: "google",
  ["Bing" /* Bing */]: "bing"
};

// src/contentScripts/proxySearch/utils/elementHelper.ts
var findGoogleSearchInput = () => {
  const input = document.querySelector('textarea[name="q"]');
  return input;
};
var findPerplexitySearchInput = () => {
  const input = document.querySelector('textarea[autocomplete="off"]');
  return input;
};
var findPerplexityUnDisabledSearchButton = () => {
  const button = document.querySelector('button[aria-label="Submit"]');
  if (button && button.disabled) {
    return void 0;
  }
  return button;
};
var findBingSearchInput = () => {
  const input = document.querySelector("#sb_form_q");
  return input;
};
var findBaiduSearchInput = () => {
  const input = document.querySelector("#form #kw");
  return input;
};
var findChatgptSearchInput = () => {
  const input = document.querySelector("#prompt-textarea");
  return input;
};
var findChatgptWebAccessButton = () => {
  const searchWebSearchValue = 'button svg path[d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM11.9851 4.00291C11.9933 4.00046 11.9982 4.00006 11.9996 4C12.001 4.00006 12.0067 4.00046 12.0149 4.00291C12.0256 4.00615 12.047 4.01416 12.079 4.03356C12.2092 4.11248 12.4258 4.32444 12.675 4.77696C12.9161 5.21453 13.1479 5.8046 13.3486 6.53263C13.6852 7.75315 13.9156 9.29169 13.981 11H10.019C10.0844 9.29169 10.3148 7.75315 10.6514 6.53263C10.8521 5.8046 11.0839 5.21453 11.325 4.77696C11.5742 4.32444 11.7908 4.11248 11.921 4.03356C11.953 4.01416 11.9744 4.00615 11.9851 4.00291ZM8.01766 11C8.08396 9.13314 8.33431 7.41167 8.72334 6.00094C8.87366 5.45584 9.04762 4.94639 9.24523 4.48694C6.48462 5.49946 4.43722 7.9901 4.06189 11H8.01766ZM4.06189 13H8.01766C8.09487 15.1737 8.42177 17.1555 8.93 18.6802C9.02641 18.9694 9.13134 19.2483 9.24522 19.5131C6.48461 18.5005 4.43722 16.0099 4.06189 13ZM10.019 13H13.981C13.9045 14.9972 13.6027 16.7574 13.1726 18.0477C12.9206 18.8038 12.6425 19.3436 12.3823 19.6737C12.2545 19.8359 12.1506 19.9225 12.0814 19.9649C12.0485 19.9852 12.0264 19.9935 12.0153 19.9969C12.0049 20.0001 11.9999 20 11.9999 20C11.9999 20 11.9948 20 11.9847 19.9969C11.9736 19.9935 11.9515 19.9852 11.9186 19.9649C11.8494 19.9225 11.7455 19.8359 11.6177 19.6737C11.3575 19.3436 11.0794 18.8038 10.8274 18.0477C10.3973 16.7574 10.0955 14.9972 10.019 13ZM15.9823 13C15.9051 15.1737 15.5782 17.1555 15.07 18.6802C14.9736 18.9694 14.8687 19.2483 14.7548 19.5131C17.5154 18.5005 19.5628 16.0099 19.9381 13H15.9823ZM19.9381 11C19.5628 7.99009 17.5154 5.49946 14.7548 4.48694C14.9524 4.94639 15.1263 5.45584 15.2767 6.00094C15.6657 7.41167 15.916 9.13314 15.9823 11H19.9381Z"]';
  const searchWebIcon = document.querySelector(searchWebSearchValue);
  const button = searchWebIcon == null ? void 0 : searchWebIcon.closest("button");
  return button;
};
var waitFindElement = async (selector, timeout = 15e3, currentTotalMs = 0) => {
  const ms = 200;
  const element = selector();
  return new Promise((resolve) => {
    if (element) {
      resolve(element);
      return;
    }
    if (currentTotalMs >= timeout) {
      resolve(void 0);
      return;
    }
    setTimeout(async () => {
      const result = await waitFindElement(
        selector,
        timeout,
        currentTotalMs + ms
      );
      resolve(result);
    }, ms);
  });
};
var isInIframe = () => {
  return window !== window.top || window !== window.parent || window !== window.self;
};
var clickElementDelay = (element, delay = 200) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      element.click();
      resolve(true);
    }, delay);
  });
};
var elementFocusAndApplyPaste = (element, text) => {
  element.focus();
  if (element.tagName === "TEXTAREA" || element.tagName === "INPUT") {
    const input = element;
    input.value = text;
  } else {
    element.textContent = text;
  }
  element.dispatchEvent(new Event("input", { bubbles: true }));
  element.dispatchEvent(new Event("change", { bubbles: true }));
  element.dispatchEvent(new Event("keydown", { bubbles: true }));
  element.dispatchEvent(new Event("keyup", { bubbles: true }));
  element.dispatchEvent(new Event("blur", { bubbles: true }));
};
var getIframeRuntimeApp = () => {
  if (window.location.host.includes("chatgpt")) {
    return "ChatGPT" /* ChatGPT */;
  } else if (window.location.host.includes("google")) {
    return "Google" /* Google */;
  } else if (window.location.host.includes("baidu")) {
    return "Baidu" /* Baidu */;
  } else if (window.location.host.includes("bing")) {
    return "Bing" /* Bing */;
  } else if (window.location.host.includes("perplexity")) {
    return "Perplexity" /* Perplexity */;
  }
  return void 0;
};
var getPagePointBackgroundColor = (x, y) => {
  const elements = document.elementsFromPoint(x, y);
  for (const element of elements) {
    const computedStyle = window.getComputedStyle(element);
    const bgColor = computedStyle.backgroundColor;
    if (bgColor !== "transparent" && bgColor !== "rgba(0, 0, 0, 0)") {
      return bgColor;
    }
  }
  return null;
};
var getPageTopBackgroundColor = () => {
  const pointCount = 10;
  const pageWidth = document.documentElement.clientWidth;
  const step = pageWidth / (pointCount + 1);
  const colorCount = {};
  for (let i = 1; i < pointCount + 1; i++) {
    const x = Math.floor(i * step);
    const color = getPagePointBackgroundColor(x, 15);
    if (color) {
      colorCount[color] = (colorCount[color] || 0) + 1;
    }
  }
  const maxColor = Object.entries(colorCount).reduce(
    (max, [color, count]) => {
      if (count > max.count) {
        return { color, count };
      }
      return max;
    },
    { color: "", count: 0 }
  );
  const result = maxColor.count > pointCount / 2 ? maxColor.color : null;
  return result;
};
var isLightColorCanvas = null;
var getIsLightColorCanvas = () => {
  if (!isLightColorCanvas) {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    isLightColorCanvas = canvas;
  }
  return isLightColorCanvas;
};
var isLightColor = (color) => {
  if (!color)
    return false;
  let r, g, b;
  if (color.startsWith("#")) {
    if (color.length === 4) {
      r = parseInt(color[1] + color[1], 16);
      g = parseInt(color[2] + color[2], 16);
      b = parseInt(color[3] + color[3], 16);
    } else {
      r = parseInt(color.slice(1, 3), 16);
      g = parseInt(color.slice(3, 5), 16);
      b = parseInt(color.slice(5, 7), 16);
    }
  } else if (color.startsWith("rgb")) {
    const rgb = color.match(/\d+/g);
    if (rgb) {
      [r, g, b] = rgb.map(Number);
    }
  } else {
    const canvas = getIsLightColorCanvas();
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return false;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, 1, 1);
    const data = imageData.data;
    r = data[0];
    g = data[1];
    b = data[2];
  }
  if (typeof r !== "number" || typeof g !== "number" || typeof b !== "number") {
    return false;
  }
  const brightness = r * 0.299 + g * 0.587 + b * 0.114;
  return brightness > 128;
};

export {
  SearchProviderMap,
  SearchProviderList,
  MenuQueryMap,
  findGoogleSearchInput,
  findPerplexitySearchInput,
  findPerplexityUnDisabledSearchButton,
  findBingSearchInput,
  findBaiduSearchInput,
  findChatgptSearchInput,
  findChatgptWebAccessButton,
  waitFindElement,
  isInIframe,
  clickElementDelay,
  elementFocusAndApplyPaste,
  getIframeRuntimeApp,
  getPageTopBackgroundColor,
  isLightColor
};
