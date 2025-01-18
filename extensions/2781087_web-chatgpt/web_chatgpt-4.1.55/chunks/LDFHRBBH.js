import {
  require_dayjs_min
} from "./4NOIXOKC.js";
import {
  AI_PROVIDER_MAP,
  CHATGPT_3_5_MODEL_NAME,
  SYNC_USER_CONFIG_STORE_EVENT
} from "./XVTLOGGR.js";
import {
  require_browser_polyfill
} from "./XOBJISN3.js";
import {
  defaults_default
} from "./TOGVC2JX.js";
import {
  __toESM
} from "./ERZ5UWI7.js";

// src/background/src/chat/FreeAIChat/types.ts
var FREE_AI_MODELS = [
  {
    title: "Free AI",
    titleTag: "",
    value: "mistral-7b-instruct",
    maxTokens: 4096,
    tags: [],
    descriptions: [
      {
        label: "client:provider__model__tooltip_card__label__max_token",
        value: "client:provider__model__tooltip_card__label__max_token__suffix"
      },
      {
        label: "client:provider__model__tooltip_card__label__description",
        value: "client:provider__chatgpt__model__gpt_3_5__description"
      }
    ]
  }
];

// src/background/src/chat/BardChat/types.ts
var BARD_MODELS = [
  {
    title: "PaLM 2",
    titleTag: "",
    value: "PaLM 2",
    // 因为Google并没有官方说明
    maxTokens: -1,
    tags: [],
    descriptions: [
      {
        label: "Description",
        value: "The most advanced model by Google. Powers Bard, PaLM API, MakerSuite, and various Workspace features at Google."
      },
      {
        label: "What it can do",
        value: "Reasoning, multilingual translation, coding, and more."
      }
    ],
    uploadFileConfig: {
      maxFileSize: 25 * 1024 * 1024,
      // 25MB
      accept: ".jpg,.jpeg,.png,.webp",
      acceptTooltip: "Upload file JEPEG, PNG, WEBP",
      maxCount: 1
    }
  }
];

// src/background/src/chat/GeminiChat/types.ts
var GEMINI_MODELS = [
  {
    title: "Gemini Nano",
    titleTag: "",
    value: "PaLM 2",
    // 因为Google并没有官方说明
    maxTokens: -1,
    tags: [],
    descriptions: [
      {
        label: "Description",
        value: "The most advanced model by Google. Powers Gemini, PaLM API, MakerSuite, and various Workspace features at Google."
      },
      {
        label: "What it can do",
        value: "Reasoning, multilingual translation, coding, and more."
      }
    ],
    uploadFileConfig: {
      maxFileSize: 25 * 1024 * 1024,
      // 25MB
      accept: ".jpg,.jpeg,.png,.webp",
      acceptTooltip: "Upload file JEPEG, PNG, WEBP",
      maxCount: 1
    }
  }
];

// src/utils/dataHelper/numberHelper.ts
var numberWithCommas = (number, digits = 2) => {
  return Number(number).toFixed(digits).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// src/background/src/chat/BingChat/bing/types.ts
var import_dayjs = __toESM(require_dayjs_min());
var BING_MODELS = [
  {
    title: "gpt-4",
    titleTag: "",
    value: "gpt-4",
    maxTokens: 8192,
    tags: [],
    descriptions: [
      {
        label: "Max tokens",
        value: `${numberWithCommas(8192, 0)} tokens`
      },
      {
        label: "Description",
        value: `More capable than any GPT-3.5 model, able to do more complex tasks, and optimized for chat. Will be updated with OpenAI's latest model iteration 2 weeks after it is released.`
      },
      {
        label: "Training date",
        value: `Up to ${(0, import_dayjs.default)("2021-09-01").format("MMM YYYY")}`
      }
    ]
    // TODO - bing的文件上传需要校验origin和referrer，需要新的chrome extension permission, 目前搁置
    // uploadFileConfig: {
    //   accept: 'image/gif, image/jpeg, image/png, image/webp',
    //   acceptTooltip: 'Add an image',
    //   maxFileSize: 5 * 1024 * 1024,
    //   maxCount: 1,
    // },
  }
];

// src/background/src/chat/ClaudeChat/claude/types.ts
var CLAUDE_MODELS = [
  {
    title: "claude-2-100k",
    titleTag: "",
    value: "claude-2.0",
    maxTokens: 100 * 1e3,
    tags: [],
    descriptions: [
      {
        label: "Max tokens",
        value: `${numberWithCommas(100 * 1e3, 0)} tokens`
      },
      {
        label: "Description",
        value: "Superior performance on tasks that require complex reasoning. Claude 2 is Anthropic's best-in-class offering."
      }
    ],
    uploadFileConfig: {
      accept: ".pdf,.doc,.docx,.rtf,.epub,.odt,.odp,.pptx,.txt,.py,.ipynb,.js,.jsx,.html,.css,.java,.cs,.php,.c,.cpp,.cxx,.h,.hpp,.rs,.R,.Rmd,.swift,.go,.rb,.kt,.kts,.ts,.tsx,.m,.scala,.rs,.dart,.lua,.pl,.pm,.t,.sh,.bash,.zsh,.csv,.log,.ini,.config,.json,.yaml,.yml,.toml,.lua,.sql,.bat,.md,.coffee",
      acceptTooltip: "Add files (5 max, 10MB each). Accepts pdf, txt, csv, etc.",
      maxFileSize: 10 * 1024 * 1024,
      maxCount: 5
    }
  }
];

// src/utils/userConfig.ts
var import_webextension_polyfill = __toESM(require_browser_polyfill());

// src/features/webAccess/constants/webAccessPrompt.ts
var WEB_ACCESS_PROMPT_DEFAULT = `You are a knowledgeable and helpful person that can answer any questions. Your task is to answer questions.

It's possible that the question, or just a portion of it, requires relevant information from the internet to give a satisfactory answer. The relevant search results provided below, delimited by <search_results></search_results>, are the necessary information already obtained from the internet. The search results set the context for addressing the question, so you don't need to access the internet to answer the question.

Write a comprehensive answer to the question in the best way you can. If necessary, use the provided search results.

Search results:
<search_results>
{web_results}
</search_results>

Each search result item provides the following information in this format:
Number: [Index number of the search result]
URL: [URL of the search result]
Title: [Page title of the search result]
Content: [Page content of the search result]

If you can't find enough information in the search results and you're not sure about the answer, try your best to give a helpful response by using all the information you have from the search results.

For your reference, today's date is {current_date}.

---

You should always respond using the following Markdown format delimited by:

# {query}

## \u{1F5D2}\uFE0F Answer
<answer to the question>

## \u{1F310} Sources
<numbered list of all the provided search results>

---

Here are more requirements for the response Markdown format described above:

For <answer to the question> part in the above Markdown format:
If you use any of the search results in <answer to the question>, always cite the sources at the end of the corresponding line, similar to how Wikipedia.org cites information. Use the citation format [[NUMBER](URL)], where both the NUMBER and URL correspond to the provided search results in <numbered list of all the provided search results>.

Present the answer in a clear format.
Use a numbered list if it clarifies things
Make the answer as short as possible, ideally no more than 200 words.

For <numbered list of all the provided search results> part in the above Markdown format:
Always list all the search results provided above, delimited by <search_results></search_results>.
Do not miss any search result items, regardless if there are duplicated ones in the provided search results.
Use the following format for each search result item:
[the domain of the URL - TITLE](URL)
Ensure the bullet point's number matches the 'NUMBER' of the corresponding search result item.`;
var WEB_ACCESS_PROMPT_GPT4 = `You are a knowledgeable and helpful person that can answer any questions. Your task is to answer questions.

It's possible that the question, or just a portion of it, requires relevant information from the internet to give a satisfactory answer. The relevant search results provided below, delimited by <search_results></search_results>, are the necessary information already obtained from the internet. The search results set the context for addressing the question, so you don't need to access the internet to answer the question.

Write a comprehensive answer to the question in the best way you can. If necessary, use the provided search results.

Search results:
<search_results>
{web_results}
</search_results>

Each search result item provides the following information in this format:
Number: [Index number of the search result]
URL: [URL of the search result]
Title: [Page title of the search result]
Content: [Page content of the search result]

If you can't find enough information in the search results and you're not sure about the answer, try your best to give a helpful response by using all the information you have from the search results.

For your reference, today's date is {current_date}.

---

You should always respond using the following Markdown format:

# {query}

## \u{1F5D2}\uFE0F Answer
<answer to the question>

## \u{1F310} Sources
<numbered list of all the provided search results>

---

Here are more requirements for the response Markdown format described above:

For <answer to the question> part in the above Markdown format:
If you use any of the search results in <answer to the question>, always cite the sources at the end of the corresponding line, similar to how Wikipedia.org cites information. Use the citation format [[NUMBER](URL)], where both the NUMBER and URL correspond to the provided search results in <numbered list of all the provided search results>.

Present the answer in a clear format.
Use a numbered list if it clarifies things
Make the answer as short as possible, ideally no more than 200 words.

For <numbered list of all the provided search results> part in the above Markdown format:
Always list all the search results provided above, delimited by <search_results></search_results>.
Do not miss any search result items, regardless if there are duplicated ones in the provided search results.
Use the following format for each search result item:
[the domain of the URL - TITLE](URL)
Ensure the bullet point's number matches the 'NUMBER' of the corresponding search result item.`;
var WEB_ACCESS_PROMPT_CLAUDE = `You are a knowledgeable and helpful person that can answer any questions. Your task is to answer questions.

It's possible that the question, or just a portion of it, requires relevant information from the internet to give a satisfactory answer. The relevant search results provided below, delimited by <search_results></search_results>, are the necessary information already obtained from the internet. The search results set the context for addressing the question, so you don't need to access the internet to answer the question.

Write a comprehensive answer to the question in the best way you can. If necessary, use the provided search results.

Search results:
<search_results>
{web_results}
</search_results>

Each search result item provides the following information in this format:
Number: [Index number of the search result]
URL: [URL of the search result]
Title: [Page title of the search result]
Content: [Page content of the search result]

If you can't find enough information in the search results and you're not sure about the answer, try your best to give a helpful response by using all the information you have from the search results.

For your reference, today's date is {current_date}.

---

You should always respond using the following Markdown format delimited by:

# {query}

## \u{1F5D2}\uFE0F Answer
<answer to the question>

## \u{1F310} Sources
<numbered list of all the provided search results>

---

Here are more requirements for the response Markdown format described above:

For <answer to the question> part in the above Markdown format:
If you use any of the search results in <answer to the question>, always cite the sources at the end of the corresponding line, similar to how Wikipedia.org cites information. Use the citation format [[NUMBER](URL)], where both the NUMBER and URL correspond to the provided search results in <numbered list of all the provided search results>.

Present the answer in a clear format.
Use a numbered list if it clarifies things
Make the answer as short as possible, ideally no more than 200 words.

For <numbered list of all the provided search results> part in the above Markdown format:
Always list all the search results provided above, delimited by <search_results></search_results>.
Do not miss any search result items, regardless if there are duplicated ones in the provided search results.
Use the following format for each search result item:
[the domain of the URL - TITLE](URL)
Ensure the bullet point's number matches the 'NUMBER' of the corresponding search result item.`;
var WEB_ACCESS_PROMPT_BARD = `You are a knowledgeable and helpful person that can answer any questions. Your task is to answer questions.

It's possible that the question, or just a portion of it, requires relevant information from the internet to give a satisfactory answer. The relevant search results provided below, delimited by <search_results></search_results>, are the necessary information already obtained from the internet. The search results set the context for addressing the question, so you don't need to access the internet to answer the question.

Write a comprehensive answer to the question in the best way you can. If necessary, use the provided search results.

Search results:
<search_results>
{web_results}
</search_results>

Each search result item provides the following information in this format:
Number: [Index number of the search result]
URL: [URL of the search result]
Title: [Page title of the search result]
Content: [Page content of the search result]

If you can't find enough information in the search results and you're not sure about the answer, try your best to give a helpful response by using all the information you have from the search results.

For your reference, today's date is {current_date}.

---

You should always respond using the following Markdown format delimited by:

# {query}

## \u{1F5D2}\uFE0F Answer
<answer to the question>

## \u{1F310} Sources
<numbered list of all the provided search results>

---

Here are more requirements for the response Markdown format described above:

For <answer to the question> part in the above Markdown format:
If you use any of the search results in <answer to the question>, always cite the sources at the end of the corresponding line, similar to how Wikipedia.org cites information. Use the citation format [[NUMBER](URL)], where both the NUMBER and URL correspond to the provided search results in <numbered list of all the provided search results>.

Present the answer in a clear format.
Use a numbered list if it clarifies things
Make the answer as short as possible, ideally no more than 200 words.

For <numbered list of all the provided search results> part in the above Markdown format:
Always list all the search results provided above, delimited by <search_results></search_results>.
Do not miss any search result items, regardless if there are duplicated ones in the provided search results.
Use the following format for each search result item:
[the domain of the URL - TITLE](URL)
Ensure the bullet point's number matches the 'NUMBER' of the corresponding search result item.`;
var WEB_ACCESS_PROMPT_GEMINI = WEB_ACCESS_PROMPT_BARD;

// src/features/webAccess/constants/smartSearchPrompt.ts
var import_dayjs2 = __toESM(require_dayjs_min());
var SMART_SEARCH_PROMPT_OUTPUT_MULTIPLE = `You are a research expert who is good at coming up with the perfect search query to help find answers to any question. Your task is to think of the most effective search query for the following question delimited by <question></question>:

<question>
{{current_question}}
</question>

The question is the final one in a series of previous questions and answers. Here are the earlier questions listed in the order they were asked, from the very first to the one before the final question, delimited by <previous_questions></previous_questions>:
<previous_questions>
{{previous_questions}}
</previous_questions>

For your reference, today's date is {{CURRENT_DATE}}.

Output 3 search queries as JSON Array format without additional number, context, explanation, or extra wording, site information, just 3 text search queries as JSON Array format.`;
var SMART_SEARCH_PROMPT_OUTPUT_SINGLE = `You are a research expert who is good at coming up with the perfect search query to help find answers to any question. Your task is to think of the most effective search query for the following question delimited by <question></question>:

<question>
{{current_question}}
</question>

The question is the final one in a series of previous questions and answers. Here are the earlier questions listed in the order they were asked, from the very first to the one before the final question, delimited by <previous_questions></previous_questions>:
<previous_questions>
{{previous_questions}}
</previous_questions>

For your reference, today's date is {{CURRENT_DATE}}.

Output 1 search query as JSON Array format without additional number, context, explanation, or extra wording, site information, just 1 text search query as JSON Array format.`;
var CHATGPT_STRENGTHEN_SMART_SEARCH_PROMPT_OUTPUT_MULTIPLE = `You are a research expert specializing in crafting optimal search queries to find answers to questions with context. Your task is to generate effective search queries based on the current question and previous questions.

First, review the previous questions:
<previous_questions>
{{previous_questions}}
</previous_questions>

Now, consider the current question and today's date:
<current_question>
{{current_question}}
</current_question>

Today's date: {{CURRENT_DATE}}

Your objective is to create 4 effective search queries for the current question, learning from the context provided by the previous questions.

Follow these steps:
1. Add the current question as the first search query.
2. Analyze the current question and the previous questions to understand the context and potential search patterns.
3. Rewrite the current question into a effective concise search query, incorporating relevant context from previous questions if applicable.
4. Repeat step 3 to generate a total of 3 more unique, concise and effective search queries.
5. Format the search queries as a valid JSON array.
 

Output your response in the following JSON format, without any additional commentary:
[current_question,"query 2",...,"query 4"]

Remember to focus solely on generating the search queries. Do not provide any explanations or additional text outside of the JSON array.`;
var CHATGPT_STRENGTHEN_SMART_SEARCH_PROMPT_OUTPUT_SINGLE = `You are a research expert specializing in crafting optimal search queries to find answers to questions with context. Your task is to generate effective search queries based on the current question.

Consider the current question and today's date:
<current_question>
{{current_question}}
</current_question>

Today's date: {{CURRENT_DATE}}

Your objective is to create 4 effective search queries for the current question, learning from the context provided by the previous questions.

Follow these steps:
1. Add the current question as the first search query.
2. Analyze the current question and the previous questions to understand the context and potential search patterns.
3. Rewrite the current question into a effective concise search query, incorporating relevant context from previous questions if applicable.
4. Repeat step 3 to generate a total of 3 more unique, concise and effective search queries.
5. Format the search queries as a valid JSON array.
 

Output your response in the following JSON format, without any additional commentary:
[current_question,"query 2",...,"query 4"]

Remember to focus solely on generating the search queries. Do not provide any explanations or additional text outside of the JSON array.`;
var SMART_SEARCH_RESPONSE_DELIMITER = ",";
var SMART_SEARCH_QUERY_COUNT_LIMIT = 3;
var CHATGPT_STRENGTHEN_SMART_SEARCH_QUERY_COUNT_LIMIT = 4;
var smartSearchPromptTemplate = {
  single: SMART_SEARCH_PROMPT_OUTPUT_SINGLE,
  multiple: SMART_SEARCH_PROMPT_OUTPUT_MULTIPLE,
  strengthen_no_history: CHATGPT_STRENGTHEN_SMART_SEARCH_PROMPT_OUTPUT_SINGLE,
  //无聊天记录的时候
  strengthen_have_history: CHATGPT_STRENGTHEN_SMART_SEARCH_PROMPT_OUTPUT_MULTIPLE
  //有聊天记录的时候
};
var generateSmartSearchPromptWithPreviousQuestion = (questions, type = "single") => {
  let currentType = type;
  if (type === "chatgpt_strengthen") {
    if (questions.length > 1) {
      currentType = "strengthen_have_history";
    } else {
      currentType = "strengthen_no_history";
    }
  }
  let template = smartSearchPromptTemplate[currentType];
  template = template.replaceAll(
    "{{CURRENT_DATE}}",
    (0, import_dayjs2.default)().format("YYYY-MM-DD HH:mm:ss")
  );
  const currentQuestion = questions[questions.length - 1];
  const previousQuestions = questions.slice(0, -1);
  template = template.replaceAll("{{current_question}}", currentQuestion);
  let previousQuestionsStr = "";
  previousQuestions.forEach((preQuestion, index) => {
    previousQuestionsStr += `${index + 1}) ${preQuestion}${index < previousQuestions.length - 1 ? "\n" : ""}`;
  });
  template = template.replaceAll("{{previous_questions}}", previousQuestionsStr);
  return template;
};

// src/features/webAccess/constants/index.ts
var SEARCH_ENGINE_OPTIONS = [
  {
    value: "sogou",
    label: "Sogou Search"
  },
  {
    value: "brave",
    label: "Brave Search"
  },
  {
    value: "yandex",
    label: "Yandex Search"
  },
  // {
  //   value: 'duckduckgo',
  //   label: 'Duckduckgo Search',
  // },
  {
    value: "naver",
    label: "Naver Search"
  },
  {
    value: "bing",
    label: "Bing Search"
  },
  {
    value: "yahoo",
    label: "Yahoo Search"
  },
  {
    value: "baidu",
    label: "Baidu Search"
  },
  {
    value: "google",
    label: "Google Search"
  }
];
var numResultsOptions = Array.from({ length: 10 }, (_, i) => i + 1).map(
  (num) => ({
    value: num,
    label: `${num} result${num === 1 ? "" : "s"}`
  })
);
numResultsOptions.push({
  value: 15,
  label: "Max results"
});
var NUM_RESULTS_OPTIONS = numResultsOptions;
var SUMMARIZE_OPTIONS_DEFAULT = "NO_SUMMARIZE";
var SUMMARIZE_OPTIONS = [
  {
    value: "MAP_REDUCE",
    label: "Pro search"
  },
  {
    value: SUMMARIZE_OPTIONS_DEFAULT,
    label: "Quick search"
  }
];
var TIME_PERIOD_OPTIONS = [
  { value: "m", label: "Past month" },
  { value: "w", label: "Past week" },
  { value: "d", label: "Past day" },
  { value: "any", label: "Any time" }
];
var SUMMARIZE_STRENGTHEN_OPTIONS_DEFAULT = "IN_DEPTH";
var SUMMARIZE_STRENGTHEN_OPTIONS_BRIEF = "BRIEF";
var WEBACCESS_STRENGTHEN_RESPONSE_STYLE_OPTIONS = [
  {
    value: SUMMARIZE_STRENGTHEN_OPTIONS_DEFAULT,
    label: "Comprehensive"
  },
  {
    value: SUMMARIZE_STRENGTHEN_OPTIONS_BRIEF,
    label: "Concise"
  }
];

// src/utils/userConfig.ts
var defaultUserConfig = {
  loaded: false,
  // 系统配置语言
  language: "en",
  // chatgpt web access 功能相关
  numWebResults: 6,
  webAccess: true,
  webAccessDisabled: false,
  isHaveChatgptSearchButton: false,
  // 是否拥有chatgpt搜索按钮
  chatgptWebAccess: null,
  // 是否打开chatgpt自带的 搜索按钮，为null说明是第一次打开插件
  chatgptNumWebResults: 10,
  //chatgpt自带的搜索按钮的搜索结果数量
  isWebAccessPassivelyClosed: false,
  // 是否被动关闭webAccess,当为true时，用户打开chatgpt search，那么webAccess为ture
  region: "wt-wt",
  timePeriod: "any",
  aiResponseLanguage: "auto",
  promptUUID: "default",
  searchEngine: "google",
  trimLongText: false,
  summarizeType: "NO_SUMMARIZE",
  chatgptSummarizeType: SUMMARIZE_STRENGTHEN_OPTIONS_DEFAULT,
  // one-click prompt 开关
  promptLibrary: true,
  // theme
  colorSchema: "auto",
  // ai provider
  conversationId: "",
  currentProvider: AI_PROVIDER_MAP.OPENAI,
  currentModel: "",
  thirdProviderSettings: {
    [AI_PROVIDER_MAP.BING]: {
      conversationStyle: "balanced" /* Balanced */,
      model: BING_MODELS[0].value
    },
    [AI_PROVIDER_MAP.CLAUDE]: {
      model: CLAUDE_MODELS[0].value
    },
    [AI_PROVIDER_MAP.BARD]: {
      model: BARD_MODELS[0].value
    },
    [AI_PROVIDER_MAP.OPENAI]: {
      model: CHATGPT_3_5_MODEL_NAME
    },
    [AI_PROVIDER_MAP.FREE_AI]: {
      model: FREE_AI_MODELS[0].value
    },
    [AI_PROVIDER_MAP.GEMINI]: {
      model: GEMINI_MODELS[0].value
    }
  }
};
async function getCacheUserConfig() {
  const config = await import_webextension_polyfill.default.storage.sync.get(defaultUserConfig);
  return defaults_default(config, defaultUserConfig);
}
async function updateCacheUserConfig(config) {
  await import_webextension_polyfill.default.storage.sync.set(config);
}
async function setCacheUserConfig(settingsOrUpdateFunction) {
  try {
    if (settingsOrUpdateFunction instanceof Function) {
      const oldSettings = await getCacheUserConfig();
      await import_webextension_polyfill.default.storage.sync.set(settingsOrUpdateFunction(oldSettings));
    } else {
      await updateCacheUserConfig(settingsOrUpdateFunction);
    }
    return true;
  } catch (e) {
    return false;
  }
}
function syncUserConfigStore() {
  window.dispatchEvent(new CustomEvent(SYNC_USER_CONFIG_STORE_EVENT, {}));
}

export {
  FREE_AI_MODELS,
  WEB_ACCESS_PROMPT_DEFAULT,
  WEB_ACCESS_PROMPT_GPT4,
  WEB_ACCESS_PROMPT_CLAUDE,
  WEB_ACCESS_PROMPT_BARD,
  WEB_ACCESS_PROMPT_GEMINI,
  SMART_SEARCH_RESPONSE_DELIMITER,
  SMART_SEARCH_QUERY_COUNT_LIMIT,
  CHATGPT_STRENGTHEN_SMART_SEARCH_QUERY_COUNT_LIMIT,
  generateSmartSearchPromptWithPreviousQuestion,
  SEARCH_ENGINE_OPTIONS,
  NUM_RESULTS_OPTIONS,
  SUMMARIZE_OPTIONS,
  TIME_PERIOD_OPTIONS,
  SUMMARIZE_STRENGTHEN_OPTIONS_DEFAULT,
  SUMMARIZE_STRENGTHEN_OPTIONS_BRIEF,
  WEBACCESS_STRENGTHEN_RESPONSE_STYLE_OPTIONS,
  defaultUserConfig,
  getCacheUserConfig,
  updateCacheUserConfig,
  setCacheUserConfig,
  syncUserConfigStore
};
