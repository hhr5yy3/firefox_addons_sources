import {
  useTranslation
} from "./DLRZRKOT.js";
import {
  getCurrentChatWebSite
} from "./2W4EJGTF.js";
import {
  Button_default,
  Modal_default,
  Modal_exports,
  Paper_default
} from "./2FH7W2EF.js";
import {
  Stack_default,
  Typography_default,
  require_jsx_runtime
} from "./JCIZV2AT.js";
import {
  SUMMARIZE_STRENGTHEN_OPTIONS_DEFAULT,
  WEB_ACCESS_PROMPT_BARD,
  WEB_ACCESS_PROMPT_CLAUDE,
  WEB_ACCESS_PROMPT_DEFAULT,
  WEB_ACCESS_PROMPT_GEMINI,
  WEB_ACCESS_PROMPT_GPT4,
  getCacheUserConfig
} from "./LDFHRBBH.js";
import {
  getCurrentModelName
} from "./KFVZFM6T.js";
import {
  require_browser_polyfill
} from "./XOBJISN3.js";
import {
  __toESM
} from "./ERZ5UWI7.js";

// src/features/webAccess/utils/promptManager.ts
var import_webextension_polyfill = __toESM(require_browser_polyfill());

// src/features/webAccess/constants/webAccessStrengthenPrompt.ts
var WEB_ACCESS_STRENGTHEN_PROMPT_IN_DEPTH = "You are an advanced language model with integrated web search, visualization tools, and interactive widgets to deliver structured, well-organized responses. For each user request, generate a comprehensive, well-informed answer with at least six citations from different sources, using both provided and new web search data to ensure accuracy and relevance. Employ all available visual widgets and relevant tools to enhance clarity and interactivity, ensuring responses are accurate, detailed, and engaging.\n\n# Steps\n\n1. **Understand the User's Request** `<request>{query}</request>`:\n   - Carefully read the input provided by the user.\n   - Identify the core question, main themes, key terms, and any implicit information needs.\n\n2. **Examine the Provided Web Search Data**:\n\n   - Review the provided web search data below (in JSON format).\n   - Note any key points that are directly relevant to the user's question.\n   - Save citation markers for use in your response.\n\n   `<provided_web_search_data>{web_results}</provided_web_search_data>`\n\n3. **Analyze Themes and Concepts**:\n\n   - Break down the user's input and the supplied data to determine common themes.\n   - Identify whether additional context or updated information could enhance the final response.\n\n4. **Generate and Execute Multiple Targeted Web Searches**:\n\n   - Formulate multiple search queries to retrieve as much relevant information as possible.\n   - Adapt your queries to get credible and current resources with high relevance to the user's question.\n   - Assess the returned results and select those that provide valuable, new, or critical insights.\n\n5. **Create a Comprehensive Response**:\n\n   - Use a combination of information from the above provided web search data and the newly searched results.\n   - Issue a comprehensive response that directly addresses the user's request while providing a mix of perspectives to ensure accuracy and completeness.\n   - Directly address the user's request.\n   - Incorporate data from provided sources.\n   - Include insights from new search results.\n   - Provide a balanced view, noting any recent developments or updates on the topic.\n\n6. **Citation and Formatting**:\n\n   - Cite the sources continually where information is used, using the format: ([source name](URL)).\n   - For each sentence or paragraph, add at least one citation at the end.\n   - Cite at least 6 different sources in your response.\n\n7. **Activate Visual Enhancements Where Possible**:\n\n   - **Use Multiple Headings/Subheadings** to segment different topics.\n   - **Bullet Points, Lists, or Tables**: To  organize detailed data.\n   - **Embedded Media**: Automatically include images, videos, or links where they contribute value (e.g., embedded videos).\n   - **Highlighted Quotes or Important Statements**: Emphasize critical points.\n   - **Activate Widgets/Tools**: Automatically activate any visual add-ons, tools, or widgets (e.g., charts, graphs, preview panels) that could enhance the user experience based on the user's request.\n\n8. **Neutral Tone & Presentation**:\n   - Maintain a neutral, informative tone.\n   - Balance technical details with clarity for broader comprehension. Aim for good readability with a good balance of perplexity and burstiness.\n\n\n**Note: Each response must be at least 500 words, divided into more than four main sections, and must cite at least six different sources. This requirement must be strictly followed to ensure thoroughness and accuracy.**";
var WEB_ACCESS_STRENGTHEN_PROMPT_BRIEF = "You are an advanced language model with integrated web search, visualization tools, and interactive widgets to deliver structured, well-organized responses. For each user request, generate a concise, well-informed answer with at least six citations from different sources, using both provided and new web search data to ensure accuracy and relevance. Employ all available visual widgets and relevant tools to enhance clarity and interactivity, ensuring responses are accurate, detailed, and engaging.\n\n# Steps\n\n1. **Understand the User's Request** `<request>{query}</request>`:\n   - Carefully read the input provided by the user.\n   - Identify the core question, main themes, key terms, and any implicit information needs.\n\n2. **Examine the Provided Web Search Data**:\n\n   - Review the provided web search data below (in JSON format).\n   - Note any key points that are directly relevant to the user's question.\n   - Save citation markers for use in your response.\n\n   `<provided_web_search_data>{web_results}</provided_web_search_data>`\n\n3. **Analyze Themes and Concepts**:\n\n   - Break down the user's input and the supplied data to determine common themes.\n   - Identify whether additional context or updated information could enhance the final response.\n\n4. **Generate and Execute Multiple Targeted Web Searches**:\n\n   - Formulate multiple search queries to retrieve as much relevant information as possible.\n   - Adapt your queries to get credible and current resources with high relevance to the user's question.\n   - Assess the returned results and select those that provide valuable, new, or critical insights.\n\n5. **Create a Comprehensive Response**:\n\n   - Use a combination of information from the above provided web search data and the newly searched results.\n   - Issue a comprehensive response that directly addresses the user's request while providing a mix of perspectives to ensure accuracy and completeness.\n   - Directly address the user's request.\n   - Incorporate data from provided sources.\n   - Include insights from new search results.\n   - Provide a balanced view, noting any recent developments or updates on the topic.\n\n6. **Citation and Formatting**:\n\n   - Cite the sources continually where information is used, using the format: ([source name](URL)).\n   - For each sentence or paragraph, add at least one citation at the end.\n   - Cite at least 6 different sources in your response.\n\n7. **Activate Visual Enhancements Where Possible**:\n\n   - **Use Multiple Headings/Subheadings** to segment different topics.\n   - **Bullet Points, Lists, or Tables**: To  organize detailed data.\n   - **Embedded Media**: Automatically include images, videos, or links where they contribute value (e.g., embedded videos).\n   - **Highlighted Quotes or Important Statements**: Emphasize critical points.\n   - **Activate Widgets/Tools**: Automatically activate any visual add-ons, tools, or widgets (e.g., charts, graphs, preview panels) that could enhance the user experience based on the user's request.\n\n8. **Neutral Tone & Presentation**:\n   - Maintain a neutral, informative tone.\n   - Balance technical details with clarity for broader comprehension. Aim for good readability with a good balance of perplexity and burstiness.\n\n\n**Note: Each response must be no more than 260 words and cite at least six different sources. This requirement must be strictly followed to ensure both thoroughness and accuracy.**";

// src/features/webAccess/utils/promptManager.ts
var SAVED_PROMPTS_KEY = "saved_prompts";
var SAVED_PROMPTS_MOVED_KEY = "saved_prompts_moved_to_local";
var promptContainsWebResults = async () => {
  const currentPrompt = await getCurrentPrompt();
  return currentPrompt.text.includes("{web_results}");
};
var getDefaultPrompt = () => {
  const currentChatWebSite = getCurrentChatWebSite();
  if (currentChatWebSite === "Claude") {
    return {
      uuid: "default",
      name: "Default prompt",
      text: WEB_ACCESS_PROMPT_CLAUDE
    };
  }
  if (currentChatWebSite === "Bard") {
    return {
      uuid: "default",
      name: "Default prompt",
      text: WEB_ACCESS_PROMPT_BARD
    };
  }
  if (currentChatWebSite === "Gemini") {
    return {
      uuid: "default",
      name: "Default prompt",
      text: WEB_ACCESS_PROMPT_GEMINI
    };
  }
  try {
    const model = getCurrentModelName();
    if (model.includes("gpt-4")) {
      return {
        uuid: "default",
        name: "Default prompt",
        text: WEB_ACCESS_PROMPT_GPT4
      };
    } else {
      return {
        uuid: "default",
        name: "Default prompt",
        text: WEB_ACCESS_PROMPT_DEFAULT
      };
    }
  } catch (error) {
    return {
      uuid: "default",
      name: "Default prompt",
      text: WEB_ACCESS_PROMPT_DEFAULT
    };
  }
};
var getCurrentPrompt = async (config) => {
  const userConfig = await getCacheUserConfig();
  const currentPromptUuid = userConfig.promptUUID;
  if (currentPromptUuid === "default" && (config == null ? void 0 : config.chatgptSummarizeType)) {
    return {
      uuid: "default",
      name: "Default prompt",
      text: config.chatgptSummarizeType === SUMMARIZE_STRENGTHEN_OPTIONS_DEFAULT ? WEB_ACCESS_STRENGTHEN_PROMPT_IN_DEPTH : WEB_ACCESS_STRENGTHEN_PROMPT_BRIEF
    };
  }
  const savedPrompts = await getSavedPrompts();
  return savedPrompts.find(
    (i) => i.uuid === currentPromptUuid
  ) || getDefaultPrompt();
};
var getSavedPrompts = async (addDefaults = true) => {
  var _a;
  const {
    [SAVED_PROMPTS_KEY]: localPrompts,
    [SAVED_PROMPTS_MOVED_KEY]: promptsMoved
  } = await import_webextension_polyfill.default.storage.local.get({
    [SAVED_PROMPTS_KEY]: [],
    [SAVED_PROMPTS_MOVED_KEY]: false
  });
  let savedPrompts = localPrompts;
  if (!promptsMoved) {
    const syncStorage = await import_webextension_polyfill.default.storage.sync.get({
      [SAVED_PROMPTS_KEY]: []
    });
    const syncPrompts = (_a = syncStorage == null ? void 0 : syncStorage[SAVED_PROMPTS_KEY]) != null ? _a : [];
    savedPrompts = localPrompts.reduce((prompts, prompt) => {
      if (!prompts.some(({ uuid }) => uuid === prompt.uuid))
        prompts.push(prompt);
      return prompts;
    }, syncPrompts);
    await import_webextension_polyfill.default.storage.local.set({
      [SAVED_PROMPTS_KEY]: savedPrompts,
      [SAVED_PROMPTS_MOVED_KEY]: true
    });
    await import_webextension_polyfill.default.storage.sync.set({ [SAVED_PROMPTS_KEY]: [] });
  }
  return addDefaults ? addDefaultPrompts(savedPrompts) : savedPrompts;
};
function addDefaultPrompts(prompts) {
  addPrompt(prompts, getDefaultPrompt());
  return prompts;
  function addPrompt(prompts2, prompt) {
    const index = prompts2.findIndex((i) => i.uuid === prompt.uuid);
    if (index >= 0) {
      prompts2[index] = prompt;
    } else {
      prompts2.unshift(prompt);
    }
  }
}
var savePrompt = async (prompt) => {
  const savedPrompts = await getSavedPrompts(false);
  const index = savedPrompts.findIndex((i) => i.uuid === prompt.uuid);
  if (index >= 0) {
    savedPrompts[index] = prompt;
  } else {
    savedPrompts.push(prompt);
  }
  await import_webextension_polyfill.default.storage.local.set({ [SAVED_PROMPTS_KEY]: savedPrompts });
};
var deletePrompt = async (prompt) => {
  let savedPrompts = await getSavedPrompts();
  savedPrompts = savedPrompts.filter((i) => i.uuid !== prompt.uuid);
  await import_webextension_polyfill.default.storage.local.set({ [SAVED_PROMPTS_KEY]: savedPrompts });
};

// src/components/CustomConfirm.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime());
var CustomConfirm = ({
  open,
  confirmText,
  confirmButtonText,
  cancelButtonText,
  onClose,
  onConfirm,
  children
}) => {
  const { t } = useTranslation(["settings", "common"]);
  const handleConfirm = () => {
    onConfirm && onConfirm();
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal_default, { open, onClose, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    Paper_default,
    {
      sx: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 360,
        bgcolor: "background.paper",
        boxShadow: " 0px 4px 16px rgba(0, 0, 0, 0.08);",
        p: 2
      },
      children: [
        children ? children : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography_default, { children: confirmText }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack_default, { direction: "row-reverse", gap: 1, mt: 2, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button_default, { variant: "contained", onClick: onClose, children: cancelButtonText != null ? cancelButtonText : t("common:cancel") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            Button_default,
            {
              variant: "contained",
              sx: {
                bgcolor: (t2) => t2.palette.mode === "dark" ? "#4f4f4f" : "#f5f5f5",
                color: (t2) => t2.palette.mode === "dark" ? "#f5f5f5" : "#626262",
                ":hover": {
                  bgcolor: "#666",
                  color: "#fff"
                }
              },
              onClick: handleConfirm,
              children: confirmButtonText != null ? confirmButtonText : t("common:confirm")
            }
          )
        ] })
      ]
    }
  ) });
};
var CustomConfirm_default = CustomConfirm;

export {
  promptContainsWebResults,
  getCurrentPrompt,
  getSavedPrompts,
  savePrompt,
  deletePrompt,
  CustomConfirm_default
};
