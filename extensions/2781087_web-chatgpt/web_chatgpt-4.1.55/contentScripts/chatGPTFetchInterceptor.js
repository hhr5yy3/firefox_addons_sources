import {
  getSystemPrompt
} from "../chunks/IWVLJCW7.js";
import {
  clone_default
} from "../chunks/TOGVC2JX.js";
import {
  v4_default
} from "../chunks/2RTBHBIC.js";
import "../chunks/ERZ5UWI7.js";

// src/contentScripts/chatGPTFetchInterceptor.ts
var injectOriginFetch = window.fetch;
var injectFetch = async (url, options) => {
  var _a, _b;
  const cloneOptions = clone_default(options);
  if ([
    "https://chat.openai.com/backend-api/conversation",
    "https://chatgpt.com/backend-api/conversation",
    "https://chatgpt.com/backend-anon/conversation"
  ].includes(url) && options.method === "POST" && options.headers.accept === "text/event-stream") {
    let bodyStr = cloneOptions.body;
    try {
      const bodyJson = JSON.parse(bodyStr);
      const systemPrompt = await getSystemPrompt();
      if (systemPrompt) {
        try {
          const userMessage = (_a = bodyJson == null ? void 0 : bodyJson.messages) == null ? void 0 : _a.find(
            (msg) => {
              var _a2;
              return ((_a2 = msg == null ? void 0 : msg.author) == null ? void 0 : _a2.role) === "user";
            }
          );
          if (userMessage && window) {
            window == null ? void 0 : window.postMessage(
              {
                type: "ADD_SYSTEM_PROMPT_USER_MESSAGE_ID",
                messageId: userMessage == null ? void 0 : userMessage.id
              },
              window.location.origin
            );
          }
        } catch (error) {
        }
        bodyJson.messages.unshift({
          author: { role: "system" },
          content: {
            content_type: "text",
            parts: [systemPrompt]
          },
          id: v4_default(),
          metadata: {}
        });
      }
      bodyStr = JSON.stringify(bodyJson);
    } catch (error) {
    }
    cloneOptions.body = bodyStr;
  }
  if (["https://chatgpt.com/ces/v1/t"].includes(url) && options.method === "post") {
    try {
      const body = JSON.parse(cloneOptions.body);
      const messageId = (_b = body == null ? void 0 : body.properties) == null ? void 0 : _b.message_id;
      if (messageId) {
        window == null ? void 0 : window.postMessage(
          {
            type: "WEB_GPT_CURRENT_OPEN_SOURCE_MESSAGE_ID",
            messageId
          },
          window.location.origin
        );
      }
    } catch (error) {
    }
  }
  return injectOriginFetch(url, cloneOptions != null ? cloneOptions : options).then(function(response) {
    return new Promise((resolve) => {
      resolve(response);
    });
  });
};
window.fetch = injectFetch;
