import {
  require_browser_polyfill
} from "./XOBJISN3.js";
import {
  __toESM
} from "./ERZ5UWI7.js";

// src/features/searchWithAI/constants/searchWithAIPrompt.ts
var SEARCH_WITH_AI_PROMPT = `Ignore all previous instructions. You are a knowledgeable and helpful person that can answer any questions. Your task is to answer the following question delimited by triple backticks.

Question:
\`\`\`
{query}
\`\`\`

It's possible that the question, or just a portion of it, requires relevant information from the internet to give a satisfactory answer. The relevant search results provided below, delimited by triple quotes, are the necessary information already obtained from the internet. The search results set the context for addressing the question, so you don't need to access the internet to answer the question.

Write a comprehensive answer to the question in the best way you can. If necessary, use the provided search results.

For your reference, today's date is {current_date}.

---

If you use any of the search results in your answer, always cite the sources at the end of the corresponding line, similar to how Wikipedia.org cites information. Use the citation format [[NUMBER](URL)], where both the NUMBER and URL correspond to the provided search results below, delimited by triple quotes.

Present the answer in a clear format.
Use a numbered list if it clarifies things
Make the answer as short as possible, ideally no more than 150 words.

---

If you can't find enough information in the search results and you're not sure about the answer, try your best to give a helpful response by using all the information you have from the search results.

Search results:
"""
{web_results}
"""`;

// src/features/searchWithAI/constants/index.ts
var SEARCH_WITH_AI_APP_NAME = "webchatgpt";
var SEARCH_WITH_AI_ROOT_ID = "WEBCHATGPT_SEARCH_WITH_AI_ROOT_ID";
var SEARCH_WITH_AI_SHADOW_CONTAINER_ID = "WEBCHATGPT_SEARCH_WITH_AI_CONTAINER_ID";
var SEARCH_WITH_AI_CHECK_FLAG_BACKLIST = [
  "MAXAI_SEARCH_WITH_AI_ROOT_ID"
];
var SEARCH_WITH_AI_LOGO_ID = "SEARCH_WITH_AI_LOGO_ID";
var SEARCH_WITH_AI_DEFAULT_CRAWLING_LIMIT = 6;
var SEARCH_WITH_AI_PROVIDER_MAP = {
  OPENAI: "OPENAI",
  USE_CHAT_GPT_PLUS: "USE_CHAT_GPT_PLUS",
  MAXAI_CLAUDE: "MAXAI_CLAUDE",
  OPENAI_API: "OPENAI_API",
  CLAUDE: "CLAUDE",
  BING: "BING",
  BARD: "BARD",
  FREE_AI: "FREE_AI",
  GEMINI: "GEMINI"
};

// src/features/searchWithAI/utils/searchWithAISettings.ts
var import_webextension_polyfill = __toESM(require_browser_polyfill());
var SEARCH_WITH_AI_STORAGE_KEY = "SEARCH_WITH_AI_STORAGE_KEY";
var DEFAULT_SEARCH_WITH_AI_SETTING = {
  aiProvider: SEARCH_WITH_AI_PROVIDER_MAP.OPENAI,
  enable: true,
  triggerMode: "always",
  webAccessPrompt: true
};
var getSearchWithAISettings = async () => {
  const result = await import_webextension_polyfill.default.storage.local.get(SEARCH_WITH_AI_STORAGE_KEY);
  if (result[SEARCH_WITH_AI_STORAGE_KEY]) {
    return result[SEARCH_WITH_AI_STORAGE_KEY];
  } else {
    return DEFAULT_SEARCH_WITH_AI_SETTING;
  }
};
var setSearchWithAISettings = async (data) => {
  const preCache = await getSearchWithAISettings() || DEFAULT_SEARCH_WITH_AI_SETTING;
  await import_webextension_polyfill.default.storage.local.set({
    [SEARCH_WITH_AI_STORAGE_KEY]: {
      ...preCache,
      ...data
    }
  });
};

export {
  SEARCH_WITH_AI_PROMPT,
  SEARCH_WITH_AI_APP_NAME,
  SEARCH_WITH_AI_ROOT_ID,
  SEARCH_WITH_AI_SHADOW_CONTAINER_ID,
  SEARCH_WITH_AI_CHECK_FLAG_BACKLIST,
  SEARCH_WITH_AI_LOGO_ID,
  SEARCH_WITH_AI_DEFAULT_CRAWLING_LIMIT,
  SEARCH_WITH_AI_PROVIDER_MAP,
  DEFAULT_SEARCH_WITH_AI_SETTING,
  getSearchWithAISettings,
  setSearchWithAISettings
};
