import {
  AuthStatusMessageInit,
  BardChat,
  BingChat,
  ChatSystem,
  ClaudeChat,
  FreeAIChat,
  GeminiChat,
  MaxAIClaudeChat,
  OpenAIChat,
  UseChatGPTPlusChat,
  getWebpageOriginHtml,
  getWebpageTitleAndText,
  getWebpageUrlContent
} from "../chunks/EXMRMXD4.js";
import {
  cacheSearchAdCrxInfo
} from "../chunks/DNY3YXVK.js";
import {
  remoteControllerInit
} from "../chunks/7HUAIRIN.js";
import {
  SEARCH_WITH_AI_PROVIDER_MAP,
  getSearchWithAISettings,
  setSearchWithAISettings
} from "../chunks/M6PYVE3O.js";
import {
  convertBlobToBase64,
  sendLarkBotMessageInBgScript
} from "../chunks/JIT7C3KR.js";
import {
  promiseTimeout
} from "../chunks/IHKLZ7RH.js";
import "../chunks/PMGMIR4S.js";
import {
  Log_default
} from "../chunks/JLH3KCIT.js";
import "../chunks/LDFHRBBH.js";
import {
  isManifestVersionV2,
  require_aes
} from "../chunks/42XSBB7P.js";
import {
  proxyFetchRequester
} from "../chunks/U2LMMUIH.js";
import {
  backgroundRestartChromeExtension,
  createBackgroundMessageListener,
  createChromeExtensionOptionsPage
} from "../chunks/RBTIXGC2.js";
import "../chunks/AMCWABVH.js";
import "../chunks/QVVA4RGO.js";
import "../chunks/KFVZFM6T.js";
import "../chunks/4NOIXOKC.js";
import {
  AI_PROVIDER_MAP,
  APP_IS_PROD,
  APP_USE_CHAT_GPT_API_HOST,
  CHROME_EXTENSION_POST_MESSAGE_ID
} from "../chunks/XVTLOGGR.js";
import {
  require_browser_polyfill
} from "../chunks/XOBJISN3.js";
import "../chunks/TOGVC2JX.js";
import {
  v4_default
} from "../chunks/2RTBHBIC.js";
import {
  __publicField,
  __toESM
} from "../chunks/ERZ5UWI7.js";

// src/features/shortcuts/background/index.ts
var ShortcutMessageInit = () => {
  createBackgroundMessageListener(async (runtime, event, data, sender) => {
    if (runtime === "shortcut") {
      switch (event) {
        case "ShortCuts_getContentOfURL": {
          const { URL, timeOut, withSnapshot } = data;
          const webpageData = await promiseTimeout(
            getWebpageTitleAndText(URL, "", withSnapshot),
            timeOut != null ? timeOut : 999999,
            // 没设置 timeout 时给一个很大的值
            {
              title: "",
              body: "",
              url: URL,
              success: false
            }
          );
          return {
            data: webpageData,
            success: webpageData.success,
            message: "ok"
          };
        }
        case "ShortCuts_getHtmlOfURL": {
          const { URL } = data;
          const webpageData = await getWebpageOriginHtml(URL);
          return {
            data: webpageData,
            success: webpageData.success,
            message: "ok"
          };
        }
        case "ShortCuts_getContentOfSearchEngine": {
          const { URL, proxyFetch } = data;
          const webpageContent = await getWebpageUrlContent(URL, proxyFetch);
          return {
            data: webpageContent,
            success: webpageContent.success,
            message: "ok"
          };
        }
        default:
          break;
      }
    }
    return void 0;
  });
};

// src/background/bg.ts
var import_webextension_polyfill12 = __toESM(require_browser_polyfill());

// src/features/chatgpt/utils/callApiRecorderBg.ts
var import_aes = __toESM(require_aes());
var backgroundCallApiListener = async (infoObject) => {
  try {
    const isFirefox = globalThis.navigator.userAgent.indexOf("Firefox") > -1;
    if (isFirefox)
      return;
    if (!infoObject.email) {
      return null;
    }
    const text = import_aes.default.encrypt(JSON.stringify(infoObject), "MaxAI").toString();
    const result = await fetch(`${APP_USE_CHAT_GPT_API_HOST}/user/vote`, {
      method: "POST",
      body: JSON.stringify({
        info_object: text
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    return await result.json();
  } catch (error) {
    return null;
  }
};

// src/features/chatgpt/background/index.ts
var ChatGPTMessageInit = () => {
  createBackgroundMessageListener(async (runtime, event, data, sender) => {
    if (runtime === "client") {
      switch (event) {
        case "Client_logCallApiRequest": {
          backgroundCallApiListener(data);
          return {
            success: true,
            message: "ok",
            data: {}
          };
          break;
        }
        default:
          break;
      }
    }
    return void 0;
  });
};

// src/background/provider/chat/BardChatProvider.ts
var import_webextension_polyfill = __toESM(require_browser_polyfill());
var BardChatProvider = class {
  constructor(bardChat) {
    __publicField(this, "bardChat");
    __publicField(this, "sendQuestion", async (taskId, sender, question, options) => {
      const messageId = v4_default();
      await this.bardChat.askChatGPT(
        question.question,
        {
          taskId: question.messageId,
          regenerate: options.regenerate,
          include_history: options.includeHistory,
          max_history_message_cnt: options.maxHistoryMessageCnt
        },
        async ({ type, done, error, data }) => {
          var _a;
          if ((_a = sender.tab) == null ? void 0 : _a.id) {
            await this.sendResponseToClient(sender.tab.id, {
              taskId,
              data: {
                text: data.text,
                parentMessageId: question.messageId,
                conversationId: data.conversationId,
                messageId
              },
              error,
              done
            });
          }
        }
      );
    });
    this.bardChat = bardChat;
  }
  async auth(authTabId) {
    await this.bardChat.auth();
  }
  async preAuth() {
    await this.bardChat.checkAuth();
  }
  get status() {
    return this.bardChat.status;
  }
  async createConversation() {
    return Promise.resolve("");
  }
  async removeConversation(conversationId) {
    await this.bardChat.reset();
    return Promise.resolve(true);
  }
  async abortAskQuestion(messageId) {
    return await this.bardChat.abortTask(messageId);
  }
  async destroy() {
    await this.bardChat.destroy();
  }
  async sendResponseToClient(tabId, data) {
    await import_webextension_polyfill.default.tabs.sendMessage(tabId, {
      id: CHROME_EXTENSION_POST_MESSAGE_ID,
      event: "Client_askChatGPTQuestionResponse",
      data
    });
  }
};

// src/background/provider/chat/BingChatProvider.ts
var import_webextension_polyfill2 = __toESM(require_browser_polyfill());
var BingChatProvider = class {
  constructor(bingChat) {
    __publicField(this, "bingChat");
    __publicField(this, "sendQuestion", async (taskId, sender, question, options) => {
      var _a;
      const messageId = v4_default();
      await this.bingChat.askChatGPT(
        question.question,
        {
          taskId: question.messageId,
          regenerate: options.regenerate,
          include_history: options.includeHistory,
          max_history_message_cnt: options.maxHistoryMessageCnt,
          clientTabId: (_a = sender == null ? void 0 : sender.tab) == null ? void 0 : _a.id
        },
        async ({ type, done, error, data }) => {
          var _a2;
          if ((_a2 = sender.tab) == null ? void 0 : _a2.id) {
            await this.sendResponseToClient(sender.tab.id, {
              taskId,
              data: {
                text: data.text,
                parentMessageId: question.messageId,
                conversationId: data.conversationId,
                messageId
              },
              error,
              done
            });
          }
        }
      );
    });
    this.bingChat = bingChat;
  }
  async auth(authTabId) {
    await this.bingChat.auth();
  }
  async preAuth() {
    await this.bingChat.auth();
  }
  get status() {
    return this.bingChat.status;
  }
  async createConversation() {
    return Promise.resolve("");
  }
  async removeConversation(conversationId) {
    await this.bingChat.removeConversation(conversationId);
    return Promise.resolve(true);
  }
  async abortAskQuestion(messageId) {
    return await this.bingChat.abortTask(messageId);
  }
  async destroy() {
    await this.bingChat.destroy();
  }
  async sendResponseToClient(tabId, data) {
    await import_webextension_polyfill2.default.tabs.sendMessage(tabId, {
      id: CHROME_EXTENSION_POST_MESSAGE_ID,
      event: "Client_askChatGPTQuestionResponse",
      data
    });
  }
};

// src/background/provider/chat/ChatAdapter.ts
var ChatAdapter = class {
  constructor(chatAdapter) {
    __publicField(this, "chatAdapter");
    __publicField(this, "sendQuestion", (taskId, sender, question, options) => {
      return this.chatAdapter.sendQuestion(taskId, sender, question, options);
    });
    this.chatAdapter = chatAdapter;
  }
  async preAuth() {
    await this.chatAdapter.preAuth();
  }
  async auth(authTabId) {
    await this.chatAdapter.auth(authTabId);
  }
  get status() {
    return this.chatAdapter.status;
  }
  async abortAskQuestion(messageId) {
    return await this.chatAdapter.abortAskQuestion(messageId);
  }
  async destroy() {
    await this.chatAdapter.destroy();
  }
  async createConversation() {
    return await this.chatAdapter.createConversation();
  }
  async removeConversation(conversationId) {
    return await this.chatAdapter.removeConversation(conversationId);
  }
  // get chatFiles() {
  //   return this.chatAdapter.chatFiles
  // }
  // async getUploadFileToken() {
  //   return await this.chatAdapter.getUploadFileToken()
  // }
  // async updateFiles(updateFiles: IChatUploadFile[]) {
  //   await this.chatAdapter.updateFiles(updateFiles)
  // }
  // async uploadFiles(files: IChatUploadFile[]) {
  //   return await this.chatAdapter.uploadFiles(files)
  // }
  // async abortUploadFiles(fileIds: string[]) {
  //   return await this.chatAdapter.abortUploadFiles(fileIds)
  // }
  // async removeFiles(fileIds: string[]) {
  //   return await this.chatAdapter.removeFiles(fileIds)
  // }
  // async getFiles() {
  //   return await this.chatAdapter.getFiles()
  // }
  // async clearFiles() {
  //   return await this.chatAdapter.clearFiles()
  // }
};

// src/background/provider/chat/ClaudeChatProvider.ts
var import_webextension_polyfill3 = __toESM(require_browser_polyfill());
var ClaudeChatProvider = class {
  constructor(claudeChat) {
    __publicField(this, "claudeChat");
    __publicField(this, "sendQuestion", async (taskId, sender, question, options) => {
      const messageId = v4_default();
      await this.claudeChat.askChatGPT(
        question.question,
        {
          taskId: question.messageId,
          regenerate: options.regenerate,
          include_history: options.includeHistory,
          max_history_message_cnt: options.maxHistoryMessageCnt
        },
        async ({ type, done, error, data }) => {
          var _a;
          if ((_a = sender.tab) == null ? void 0 : _a.id) {
            await this.sendResponseToClient(sender.tab.id, {
              taskId,
              data: {
                text: data.text,
                parentMessageId: question.messageId,
                conversationId: data.conversationId,
                messageId
              },
              error,
              done
            });
          }
        }
      );
    });
    this.claudeChat = claudeChat;
  }
  async auth(authTabId) {
    await this.claudeChat.auth();
  }
  async preAuth() {
    await this.claudeChat.preAuth();
  }
  get status() {
    return this.claudeChat.status;
  }
  async createConversation() {
    return await this.claudeChat.createConversation();
  }
  async removeConversation(conversationId) {
    await this.claudeChat.removeConversation(conversationId);
    return Promise.resolve(true);
  }
  async abortAskQuestion(messageId) {
    return await this.claudeChat.abortTask(messageId);
  }
  async destroy() {
    await this.claudeChat.destroy();
  }
  async sendResponseToClient(tabId, data) {
    await import_webextension_polyfill3.default.tabs.sendMessage(tabId, {
      id: CHROME_EXTENSION_POST_MESSAGE_ID,
      event: "Client_askChatGPTQuestionResponse",
      data
    });
  }
};

// src/background/provider/chat/OpenAIChatProvider.ts
var import_webextension_polyfill4 = __toESM(require_browser_polyfill());
var OpenAIChatProvider = class {
  constructor(openAIChat) {
    __publicField(this, "openAIChat");
    __publicField(this, "sendQuestion", async (taskId, sender, question, options) => {
      var _a;
      const messageId = v4_default();
      await this.openAIChat.askChatGPT(
        question.question,
        {
          taskId: question.messageId,
          regenerate: options.regenerate,
          include_history: options.includeHistory,
          max_history_message_cnt: options.maxHistoryMessageCnt,
          newConversation: !!((_a = options.meta) == null ? void 0 : _a.newConversation)
        },
        async ({ type, done, error, data }) => {
          var _a2;
          if ((_a2 = sender.tab) == null ? void 0 : _a2.id) {
            await this.sendResponseToClient(sender.tab.id, {
              taskId,
              data: {
                text: data.text,
                parentMessageId: question.messageId,
                conversationId: data.conversationId,
                messageId
              },
              error,
              done
            });
          }
        }
      );
    });
    this.openAIChat = openAIChat;
  }
  async preAuth() {
    return this.openAIChat.preAuth();
  }
  async auth(authTabId) {
    await this.openAIChat.auth(authTabId);
  }
  get status() {
    return this.openAIChat.status;
  }
  async abortAskQuestion(messageId) {
    try {
      await this.openAIChat.abortAskQuestion(messageId);
      return true;
    } catch (error) {
      return false;
    }
  }
  async createConversation() {
    const conversation = await this.openAIChat.createConversation();
    if (conversation && conversation.conversationId) {
      return conversation.conversationId;
    }
    return Promise.resolve("");
  }
  async removeConversation(conversationId) {
    return await this.openAIChat.removeConversation(conversationId);
  }
  destroy() {
    return this.openAIChat.destroy();
  }
  async sendResponseToClient(tabId, data) {
    await import_webextension_polyfill4.default.tabs.sendMessage(tabId, {
      id: CHROME_EXTENSION_POST_MESSAGE_ID,
      event: "Client_askChatGPTQuestionResponse",
      data
    });
  }
};

// src/background/provider/chat/FreeAIChatProvider.ts
var import_webextension_polyfill5 = __toESM(require_browser_polyfill());
var FreeAIChatProvider = class {
  constructor(freeAIChat) {
    __publicField(this, "freeAIChat");
    __publicField(this, "sendQuestion", async (taskId, sender, question, options) => {
      var _a;
      const messageId = v4_default();
      const chat_history = [];
      await this.freeAIChat.askChatGPT(
        question.question,
        {
          backendAPI: "get_freeai_web_response",
          taskId: question.messageId,
          chat_history,
          streaming: (_a = options.meta) == null ? void 0 : _a.streaming
        },
        async ({ type, done, error, data }) => {
          var _a2;
          if ((_a2 = sender.tab) == null ? void 0 : _a2.id) {
            await this.sendResponseToClient(sender.tab.id, {
              taskId,
              data: {
                text: data.text,
                parentMessageId: question.messageId,
                conversationId: data.conversationId,
                messageId
              },
              error,
              done
            });
          }
        }
      );
    });
    this.freeAIChat = freeAIChat;
  }
  async auth(authTabId) {
    await this.freeAIChat.auth(authTabId);
  }
  async preAuth() {
    await this.freeAIChat.preAuth();
  }
  get status() {
    return this.freeAIChat.status;
  }
  async createConversation() {
    return await this.freeAIChat.createConversation();
  }
  async removeConversation(conversationId) {
    await this.freeAIChat.removeConversation();
    return Promise.resolve(true);
  }
  async abortAskQuestion(messageId) {
    return await this.freeAIChat.abortTask(messageId);
  }
  async destroy() {
    await this.freeAIChat.destroy();
  }
  async sendResponseToClient(tabId, data) {
    await import_webextension_polyfill5.default.tabs.sendMessage(tabId, {
      id: CHROME_EXTENSION_POST_MESSAGE_ID,
      event: "Client_askChatGPTQuestionResponse",
      data
    });
  }
};

// src/background/provider/chat/GeminiChatProvider.ts
var import_webextension_polyfill6 = __toESM(require_browser_polyfill());
var GeminiChatProvider = class {
  constructor(geminiChat) {
    __publicField(this, "geminiChat");
    __publicField(this, "sendQuestion", async (taskId, sender, question, options) => {
      const messageId = v4_default();
      await this.geminiChat.askChatGPT(
        question.question,
        {
          taskId: question.messageId,
          regenerate: options.regenerate,
          include_history: options.includeHistory,
          max_history_message_cnt: options.maxHistoryMessageCnt
        },
        async ({ type, done, error, data }) => {
          var _a;
          if ((_a = sender.tab) == null ? void 0 : _a.id) {
            await this.sendResponseToClient(sender.tab.id, {
              taskId,
              data: {
                text: data.text,
                parentMessageId: question.messageId,
                conversationId: data.conversationId,
                messageId
              },
              error,
              done
            });
          }
        }
      );
    });
    this.geminiChat = geminiChat;
  }
  async auth(authTabId) {
    await this.geminiChat.auth();
  }
  async preAuth() {
    await this.geminiChat.checkAuth();
  }
  get status() {
    return this.geminiChat.status;
  }
  async createConversation() {
    return Promise.resolve("");
  }
  async removeConversation(conversationId) {
    await this.geminiChat.reset();
    return Promise.resolve(true);
  }
  async abortAskQuestion(messageId) {
    return await this.geminiChat.abortTask(messageId);
  }
  async destroy() {
    await this.geminiChat.destroy();
  }
  async sendResponseToClient(tabId, data) {
    await import_webextension_polyfill6.default.tabs.sendMessage(tabId, {
      id: CHROME_EXTENSION_POST_MESSAGE_ID,
      event: "Client_askChatGPTQuestionResponse",
      data
    });
  }
};

// src/background/utils/BackgroundAbortFetch.ts
var log = new Log_default("BackgroundAbortFetch");
var BackgroundAbortFetch = class {
  constructor() {
    __publicField(this, "fetchMap");
    this.fetchMap = /* @__PURE__ */ new Map();
  }
  fetch(url, options, taskId) {
    const controller = new AbortController();
    const signal = controller.signal;
    if (taskId) {
      if (this.fetchMap.has(taskId)) {
        const existingController = this.fetchMap.get(taskId);
        existingController == null ? void 0 : existingController.abort();
      }
      this.fetchMap.set(taskId, controller);
      log.info(`start [task]`, url, taskId);
    } else {
      log.info(`start [no task]`, url);
    }
    options = { ...options, signal };
    return fetch(url, options).finally(() => {
      if (taskId) {
        this.fetchMap.delete(taskId);
      }
    });
  }
  abort(taskId) {
    const controller = this.fetchMap.get(taskId);
    controller == null ? void 0 : controller.abort();
    this.fetchMap.delete(taskId);
    log.info(`abort task`, taskId);
    return true;
  }
};
var BackgroundAbortFetch_default = new BackgroundAbortFetch();

// src/background/src/client/index.ts
var import_webextension_polyfill7 = __toESM(require_browser_polyfill());
var ClientMessageInit = () => {
  const isManifestV22 = isManifestVersionV2();
  createBackgroundMessageListener(async (runtime, event, data, sender) => {
    var _a, _b;
    if (runtime === "client") {
      switch (event) {
        case "Client_openUrl":
          {
            const { url, key, query = "" } = data;
            if (url) {
              await import_webextension_polyfill7.default.tabs.create({
                url
              });
              return {
                data: true,
                success: true,
                message: "ok"
              };
            } else if (key) {
              if (key === "current_page") {
                if ((_a = sender.tab) == null ? void 0 : _a.id) {
                  await import_webextension_polyfill7.default.tabs.update(sender.tab.id, {
                    active: true
                  });
                }
              } else if (key === "shortcuts") {
                if (isManifestV22) {
                  await import_webextension_polyfill7.default.runtime.openOptionsPage();
                } else {
                  await import_webextension_polyfill7.default.tabs.create({
                    url: "chrome://extensions/shortcuts",
                    active: true
                  });
                }
              } else if (key === "options") {
                if (isManifestV22) {
                  await import_webextension_polyfill7.default.runtime.openOptionsPage();
                } else {
                  await createChromeExtensionOptionsPage(query);
                }
              } else if (key === "chat_hub_search") {
                import_webextension_polyfill7.default.tabs.create({
                  url: import_webextension_polyfill7.default.runtime.getURL("pages/chat/index.html") + `?${query}`
                });
              } else if (key === "manage_extension") {
                if (isManifestV22) {
                  await import_webextension_polyfill7.default.runtime.openOptionsPage();
                } else {
                  const url2 = `chrome://extensions`;
                  await import_webextension_polyfill7.default.tabs.create({
                    url: `${url2}${query ? `?${query}` : ""}`,
                    active: true
                  });
                }
              }
              return {
                data: true,
                success: true,
                message: "ok"
              };
            }
          }
          break;
        case "Client_restartApp":
          {
            await backgroundRestartChromeExtension();
            return {
              data: true,
              success: true,
              message: "ok"
            };
          }
          break;
        case "Client_getChromeExtensionCommands":
          {
            const commands = await import_webextension_polyfill7.default.commands.getAll() || [];
            return {
              data: commands,
              success: true,
              message: "ok"
            };
          }
          break;
        case "Client_getTabInfo":
          {
            let currentTab = sender.tab;
            if (!((_b = sender.tab) == null ? void 0 : _b.id)) {
              const tabs = await import_webextension_polyfill7.default.tabs.query({
                active: true,
                currentWindow: true
              });
              currentTab = tabs[0];
            }
            return {
              data: currentTab,
              success: true,
              message: "ok"
            };
          }
          break;
        case "Client_proxyFetchAPI": {
          try {
            const { url, options, abortTaskId } = data;
            const { parse = "json", ...parseOptions } = options;
            const result = await BackgroundAbortFetch_default.fetch(
              url,
              parseOptions,
              abortTaskId
            );
            let resultData = null;
            if (parse === "json") {
              resultData = await result.json();
            } else if (parse === "blob") {
              const blob = await result.blob();
              resultData = {
                base64: await convertBlobToBase64(blob),
                contentType: blob.type
              };
            } else {
              resultData = await result.text();
            }
            return {
              success: true,
              data: {
                response: {
                  ok: result.ok,
                  status: result.status,
                  statusText: result.statusText,
                  url: result.url,
                  redirected: result.redirected
                },
                data: resultData
              },
              message: "ok"
            };
          } catch (e) {
            return {
              success: false,
              data: e,
              message: "ok"
            };
          }
        }
        default:
          break;
      }
    }
    return void 0;
  });
};

// src/features/requester/background/index.ts
var RequesterMessageInit = () => {
  createBackgroundMessageListener(async (runtime, event, data, sender) => {
    if (runtime === "client") {
      switch (event) {
        case "Requester_proxyFetch": {
          const result = await proxyFetchRequester.fetch(
            data.url,
            data.options,
            data.proxySettings
          );
          return result;
          break;
        }
        default:
          break;
      }
    }
    return void 0;
  });
};

// src/features/larkBot/background/index.ts
var LarkBotMessageInit = () => {
  createBackgroundMessageListener(async (runtime, event, data, sender) => {
    if (runtime === "client") {
      switch (event) {
        case "LarkBot_sendMessage": {
          await sendLarkBotMessageInBgScript(
            data.title,
            data.message,
            data.attr
          );
          return {
            success: true,
            message: "ok",
            data: {}
          };
          break;
        }
        default:
          break;
      }
    }
    return void 0;
  });
};

// src/background/provider/chat/MaxAIClaudeChatProvider.ts
var import_webextension_polyfill8 = __toESM(require_browser_polyfill());
var MaxAIClaudeChatProvider = class {
  constructor(maxAIClaudeChat) {
    __publicField(this, "maxAIClaudeChat");
    __publicField(this, "sendQuestion", async (taskId, sender, question, options) => {
      var _a;
      const messageId = v4_default();
      await this.maxAIClaudeChat.askChatGPT(
        question.question,
        {
          taskId: question.messageId,
          regenerate: options.regenerate,
          streaming: (_a = options.meta) == null ? void 0 : _a.streaming
        },
        async ({ type, done, error, data }) => {
          var _a2;
          if ((_a2 = sender.tab) == null ? void 0 : _a2.id) {
            await this.sendResponseToClient(sender.tab.id, {
              taskId,
              data: {
                text: data.text,
                parentMessageId: question.messageId,
                conversationId: data.conversationId,
                messageId
              },
              error,
              done
            });
          }
        }
      );
    });
    this.maxAIClaudeChat = maxAIClaudeChat;
  }
  async auth(authTabId) {
    await this.maxAIClaudeChat.auth(authTabId);
  }
  async preAuth() {
    await this.maxAIClaudeChat.preAuth();
  }
  get status() {
    return this.maxAIClaudeChat.status;
  }
  async createConversation() {
    return await this.maxAIClaudeChat.createConversation();
  }
  async removeConversation(conversationId) {
    await this.maxAIClaudeChat.removeConversation();
    return Promise.resolve(true);
  }
  async abortAskQuestion(messageId) {
    return await this.maxAIClaudeChat.abortTask(messageId);
  }
  async destroy() {
    await this.maxAIClaudeChat.destroy();
  }
  async sendResponseToClient(tabId, data) {
    await import_webextension_polyfill8.default.tabs.sendMessage(tabId, {
      id: CHROME_EXTENSION_POST_MESSAGE_ID,
      event: "Client_askChatGPTQuestionResponse",
      data
    });
  }
  // get chatFiles() {
  //   return this.maxAIClaudeChat.chatFiles
  // }
  // async uploadFiles(files: IChatUploadFile[]) {
  //   return await this.maxAIClaudeChat.uploadFiles(files)
  // }
  // async updateFiles(files: IChatUploadFile[]) {
  //   return await this.maxAIClaudeChat.updateFiles(files)
  // }
  // async getUploadFileToken() {
  //   return await this.maxAIClaudeChat.getUploadFileToken()
  // }
  // async removeFiles(fileIds: string[]) {
  //   return await this.maxAIClaudeChat.removeFiles(fileIds)
  // }
  // async getFiles() {
  //   return await this.maxAIClaudeChat.getFiles()
  // }
  // async abortUploadFiles(fileIds: string[]) {
  //   return await this.maxAIClaudeChat.abortUploadFiles(fileIds)
  // }
  // async clearFiles() {
  //   return await this.maxAIClaudeChat.clearFiles()
  // }
};

// src/background/provider/chat/UseChatGPTPlusChatProvider.ts
var import_webextension_polyfill9 = __toESM(require_browser_polyfill());
var UseChatGPTPlusChatProvider = class {
  constructor(useChatGPTPlusChat) {
    __publicField(this, "useChatGPTPlusChat");
    __publicField(this, "sendQuestion", async (taskId, sender, question, options) => {
      var _a;
      const messageId = v4_default();
      const chat_history = [];
      await this.useChatGPTPlusChat.askChatGPT(
        question.question,
        {
          backendAPI: "webchatgpt_gpt_response",
          taskId: question.messageId,
          chat_history,
          streaming: (_a = options.meta) == null ? void 0 : _a.streaming
        },
        async ({ type, done, error, data }) => {
          var _a2;
          if ((_a2 = sender.tab) == null ? void 0 : _a2.id) {
            await this.sendResponseToClient(sender.tab.id, {
              taskId,
              data: {
                text: data.text,
                parentMessageId: question.messageId,
                conversationId: data.conversationId,
                messageId
              },
              error,
              done
            });
          }
        }
      );
    });
    this.useChatGPTPlusChat = useChatGPTPlusChat;
  }
  async auth(authTabId) {
    await this.useChatGPTPlusChat.auth(authTabId);
  }
  async preAuth() {
    await this.useChatGPTPlusChat.preAuth();
  }
  get status() {
    return this.useChatGPTPlusChat.status;
  }
  async createConversation() {
    return await this.useChatGPTPlusChat.createConversation();
  }
  async removeConversation(conversationId) {
    await this.useChatGPTPlusChat.removeConversation();
    return Promise.resolve(true);
  }
  async abortAskQuestion(messageId) {
    return await this.useChatGPTPlusChat.abortTask(messageId);
  }
  async destroy() {
    await this.useChatGPTPlusChat.destroy();
  }
  async sendResponseToClient(tabId, data) {
    await import_webextension_polyfill9.default.tabs.sendMessage(tabId, {
      id: CHROME_EXTENSION_POST_MESSAGE_ID,
      event: "Client_askChatGPTQuestionResponse",
      data
    });
  }
};

// src/features/searchWithAI/background/utils/index.ts
var initProviderChatAdapters = () => {
  const openAIChatAdapter2 = new ChatAdapter(
    new OpenAIChatProvider(new OpenAIChat())
  );
  const bardChatAdapter2 = new ChatAdapter(new BardChatProvider(new BardChat()));
  const geminiChatAdapter2 = new ChatAdapter(new GeminiChatProvider(new GeminiChat()));
  const bingChatAdapter2 = new ChatAdapter(new BingChatProvider(new BingChat()));
  const claudeChatAdapter2 = new ChatAdapter(
    new ClaudeChatProvider(new ClaudeChat())
  );
  return {
    [SEARCH_WITH_AI_PROVIDER_MAP.OPENAI]: openAIChatAdapter2,
    [SEARCH_WITH_AI_PROVIDER_MAP.BARD]: bardChatAdapter2,
    [SEARCH_WITH_AI_PROVIDER_MAP.BING]: bingChatAdapter2,
    [SEARCH_WITH_AI_PROVIDER_MAP.CLAUDE]: claudeChatAdapter2,
    [SEARCH_WITH_AI_PROVIDER_MAP.GEMINI]: geminiChatAdapter2
  };
};

// src/features/searchWithAI/background/chat/SearchWIthAIChatSystem.ts
var SearchWIthAIChatSystem = class {
  constructor() {
    __publicField(this, "currentProvider");
    __publicField(this, "conversationId");
    __publicField(this, "adapters", {});
    __publicField(this, "sendQuestion", (taskId, sender, data, options) => {
      var _a;
      return ((_a = this.currentAdapter) == null ? void 0 : _a.sendQuestion(taskId, sender, data, options)) || Promise.resolve();
    });
    this.adapters = initProviderChatAdapters();
    this.initChatSystem();
    getSearchWithAISettings().then((settings) => {
      this.currentProvider = settings.aiProvider;
    });
  }
  get currentAdapter() {
    return this.currentProvider ? this.adapters[this.currentProvider] : void 0;
  }
  initChatSystem() {
    createBackgroundMessageListener(async (runtime, event, data, sender) => {
      var _a;
      if (runtime === "client") {
        switch (event) {
          case "SWAI_switchAIProvider": {
            const { provider } = data;
            await this.switchAdapter(provider);
            await this.preAuth();
            return {
              success: true,
              data: provider,
              message: ""
            };
            break;
          }
          case "SWAI_askAIQuestion": {
            await this.auth(((_a = sender.tab) == null ? void 0 : _a.id) || 0);
            if (this.conversationId) {
              await this.removeConversation(this.conversationId);
            }
            const taskId = data.taskId;
            const question = data.question;
            const options = data.options;
            const conversationId = await this.createConversation();
            options.meta = {
              newConversation: true
            };
            this.conversationId = conversationId;
            await this.sendQuestion(taskId, sender, question, options);
            break;
          }
          case "SWAI_abortAskChatGPTQuestion": {
            const { taskId } = data;
            await this.abortAskQuestion(taskId);
            return {
              success: true,
              data: {},
              message: ""
            };
          }
          case "SWAI_getConversationId": {
            return {
              success: true,
              data: {
                conversationId: this.conversationId
              },
              message: ""
            };
          }
          default:
            break;
        }
      }
      return void 0;
    });
  }
  async switchAdapter(provider) {
    await this.destroy();
    this.currentProvider = provider;
    await setSearchWithAISettings({ aiProvider: provider });
    return this.currentAdapter;
  }
  async auth(authTabId) {
    if (this.currentAdapter) {
      await this.currentAdapter.auth(authTabId);
    }
  }
  async preAuth() {
    if (this.currentAdapter) {
      await this.currentAdapter.preAuth();
    }
  }
  async abortAskQuestion(taskId) {
    if (this.currentAdapter) {
      return await this.currentAdapter.abortAskQuestion(taskId);
    }
    return false;
  }
  async createConversation(conversationId) {
    var _a;
    if (!this.currentAdapter) {
      return "";
    }
    return await ((_a = this.currentAdapter) == null ? void 0 : _a.createConversation(conversationId)) || "";
  }
  async removeConversation(conversationId) {
    var _a;
    if (!this.currentAdapter || !conversationId) {
      return false;
    }
    return await ((_a = this.currentAdapter) == null ? void 0 : _a.removeConversation(conversationId));
  }
  async destroy() {
    var _a, _b;
    await ((_a = this.currentAdapter) == null ? void 0 : _a.removeConversation(""));
    await ((_b = this.currentAdapter) == null ? void 0 : _b.destroy());
  }
};
var SearchWIthAIChatSystem_default = SearchWIthAIChatSystem;

// src/features/searchWithAI/background/index.ts
var SearchWithAIMessageInit = () => {
  new SearchWIthAIChatSystem_default();
};

// src/features/promotion/bg.ts
var import_webextension_polyfill10 = __toESM(require_browser_polyfill());

// src/features/promotion/constants/index.ts
var MAXAI_EXTENSION_IDS = APP_IS_PROD ? [
  "mhnlakgilnojmhinhkckjpncpbhabphi",
  // chrome
  "ngphehpfehdmjellohmlojkplilekadg"
  // edge
] : [
  "gloekbmifleoijoldhopjhfkpibbhocd",
  // dev
  "ggbhngjbmfdpfdopebodgdfpioeoocdb",
  // dev
  "mlgkgchhjnaccpjjniijnkjhkmfiopal",
  // dev
  "mhnlakgilnojmhinhkckjpncpbhabphi",
  // chrome
  "ngphehpfehdmjellohmlojkplilekadg"
  // edge
];
var DEFAULT_UPDATE_LINK = "https://www.extensions-hub.com/partners/updated?name=WebChatGPT";

// src/features/promotion/bg.ts
var checkInstallMaxAI = async () => {
  const results = await Promise.all(
    MAXAI_EXTENSION_IDS.map(
      (id) => promiseTimeout(
        import_webextension_polyfill10.default.runtime.sendMessage(id, {
          event: "GET_MAXAI_USERINFO"
        }),
        5e3,
        // 5s
        {
          isLogin: false,
          success: false
        }
      )
    )
  );
  if (results.every((result) => !result || !result.success)) {
    return false;
  }
  return true;
};
import_webextension_polyfill10.default.runtime.onInstalled.addListener(async (object) => {
  if (object.reason === "update") {
    if (!await checkInstallMaxAI()) {
      import_webextension_polyfill10.default.tabs.create({
        url: DEFAULT_UPDATE_LINK,
        active: true
      });
    }
  }
});

// src/rules/chatHub/index.ts
var _DeclarativeNetRequestRuleIds = class {
  static getNextId() {
    return _DeclarativeNetRequestRuleIds.current_id++;
  }
};
var DeclarativeNetRequestRuleIds = _DeclarativeNetRequestRuleIds;
__publicField(DeclarativeNetRequestRuleIds, "current_id", 100);
var createRemoveXFrameOptionsRule = (urlFilter, tabId) => {
  return {
    id: DeclarativeNetRequestRuleIds.getNextId(),
    priority: 1,
    action: {
      type: "modifyHeaders",
      responseHeaders: [
        {
          header: "content-security-policy",
          operation: "remove"
        },
        {
          header: "x-frame-options",
          operation: "remove"
        }
      ]
    },
    condition: {
      urlFilter,
      isUrlFilterCaseSensitive: false,
      resourceTypes: ["sub_frame"],
      tabIds: [tabId]
    }
  };
};
var createChatHubRule = (tabId) => {
  const rules = [
    // createRemoveXFrameOptionsRule('||google.com', tabId), // www.google.com / accounts.google.com / ogs.google.com 等
    // createRemoveXFrameOptionsRule('||perplexity.ai', tabId),
    // createRemoveXFrameOptionsRule('||chatgpt.com', tabId),
    // createRemoveXFrameOptionsRule('||openai.com', tabId),
    // createRemoveXFrameOptionsRule('||bing.com', tabId),
    // createRemoveXFrameOptionsRule('||baidu.com', tabId),
    createRemoveXFrameOptionsRule("*", tabId)
    // 移除所有页面的 X-Frame-Options 头，避免搜索结果点击后不能访问
  ];
  return {
    rules,
    ruleIds: rules.map((rule) => rule.id)
  };
};

// src/features/searchChatHub/background/SearchChatHubDynamicRulesManager.ts
var import_webextension_polyfill11 = __toESM(require_browser_polyfill());
var _SearchChatHubDynamicRulesFactory = class {
  static instance(tabId) {
    if (_SearchChatHubDynamicRulesFactory.tabIds[tabId]) {
      return _SearchChatHubDynamicRulesFactory.tabIds[tabId];
    }
    const manager = new SearchChatHubDynamicRulesManager(tabId);
    _SearchChatHubDynamicRulesFactory.tabIds[tabId] = manager;
    return manager;
  }
};
var SearchChatHubDynamicRulesFactory = _SearchChatHubDynamicRulesFactory;
__publicField(SearchChatHubDynamicRulesFactory, "tabIds", {});
var SearchChatHubDynamicRulesManager = class {
  constructor(tabId) {
    __publicField(this, "isAlive", false);
    __publicField(this, "timerRemoveRule");
    __publicField(this, "ruleIds");
    __publicField(this, "rules");
    __publicField(this, "tabId");
    this.tabId = tabId;
    const { rules, ruleIds } = createChatHubRule(this.tabId);
    this.ruleIds = ruleIds;
    this.rules = rules;
  }
  async emitHeartbeat() {
    if (!this.isAlive) {
      this.isAlive = true;
      await this.addRule();
    }
    if (this.timerRemoveRule) {
      clearTimeout(this.timerRemoveRule);
    }
    this.timerRemoveRule = setTimeout(async () => {
      this.isAlive = false;
      await this.removeRule();
    }, 8e3);
  }
  // 添加规则
  async addRule() {
    try {
      await this.removeRule();
      await import_webextension_polyfill11.default.declarativeNetRequest.updateSessionRules({
        addRules: this.rules
      });
      const currentRules = await import_webextension_polyfill11.default.declarativeNetRequest.getSessionRules();
      return true;
    } catch (e) {
      return false;
    }
  }
  // 删除规则
  async removeRule() {
    try {
      await import_webextension_polyfill11.default.declarativeNetRequest.updateSessionRules({
        removeRuleIds: this.ruleIds
      });
      const currentRules = await import_webextension_polyfill11.default.declarativeNetRequest.getSessionRules();
    } catch (e) {
    }
  }
};

// src/features/searchChatHub/background/index.ts
var SearchChatHubMessageInit = () => {
  createBackgroundMessageListener(async (runtime, event, data, sender) => {
    var _a;
    const tabId = (_a = sender.tab) == null ? void 0 : _a.id;
    if (runtime === "client") {
      switch (event) {
        case "Client_allSearchChatHubHeartbeat": {
          if (!tabId) {
            return {
              success: false
            };
          }
          const searchChatHubDynamicRulesManager = SearchChatHubDynamicRulesFactory.instance(tabId);
          await searchChatHubDynamicRulesManager.emitHeartbeat();
          return {
            success: true
          };
        }
        default:
          break;
      }
    }
    return void 0;
  });
};

// src/background/bg.ts
var isManifestV2 = isManifestVersionV2();
import_webextension_polyfill12.default.runtime.onInstalled.addListener(async (object) => {
  if (object.reason === "install") {
    openChatGPTWebpage();
    openInstallPage();
  }
});
import_webextension_polyfill12.default.runtime.setUninstallURL(
  "https://www.extensions-hub.com/partners/uninstalled?name=WebChatGPT"
);
function openChatGPTWebpage() {
  import_webextension_polyfill12.default.tabs.create({
    url: import_webextension_polyfill12.default.runtime.getURL("pages/chat/index.html")
  });
}
function openInstallPage() {
  import_webextension_polyfill12.default.tabs.create({
    active: false,
    url: "https://www.extensions-hub.com/partners/installed?name=WebChatGPT"
  });
}
if (isManifestV2) {
  import_webextension_polyfill12.default.browserAction.onClicked.addListener(openChatGPTWebpage);
} else {
  import_webextension_polyfill12.default.action.onClicked.addListener(openChatGPTWebpage);
}
import_webextension_polyfill12.default.commands.onCommand.addListener(async (command) => {
  if (command === "toggle-web-access") {
    import_webextension_polyfill12.default.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      const tab = tabs[0];
      if (tab.url && tab.id && tab.url.startsWith("https://chatgpt.com/")) {
        import_webextension_polyfill12.default.tabs.sendMessage(tab.id, {
          id: CHROME_EXTENSION_POST_MESSAGE_ID,
          event: "Client_ToggleWebAccess"
        });
      }
    });
  }
});
import_webextension_polyfill12.default.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url && tab.url.includes("google")) {
    cacheSearchAdCrxInfo();
  }
});
APP_IS_PROD && cacheSearchAdCrxInfo();
ClientMessageInit();
ShortcutMessageInit();
AuthStatusMessageInit();
ChatGPTMessageInit();
RequesterMessageInit();
LarkBotMessageInit();
remoteControllerInit();
SearchChatHubMessageInit();
var chatSystem = new ChatSystem();
var openAIChatAdapter = new ChatAdapter(
  new OpenAIChatProvider(new OpenAIChat())
);
var bardChatAdapter = new ChatAdapter(new BardChatProvider(new BardChat()));
var bingChatAdapter = new ChatAdapter(new BingChatProvider(new BingChat()));
var claudeChatAdapter = new ChatAdapter(
  new ClaudeChatProvider(new ClaudeChat())
);
var maxAIClaudeAdapter = new ChatAdapter(
  new MaxAIClaudeChatProvider(new MaxAIClaudeChat())
);
var useChatGPTPlusAdapter = new ChatAdapter(
  new UseChatGPTPlusChatProvider(new UseChatGPTPlusChat())
);
var freeAIChatAdapter = new ChatAdapter(
  new FreeAIChatProvider(new FreeAIChat())
);
var geminiChatAdapter = new ChatAdapter(
  new GeminiChatProvider(new GeminiChat())
);
chatSystem.addAdapter(AI_PROVIDER_MAP.OPENAI, openAIChatAdapter);
chatSystem.addAdapter(AI_PROVIDER_MAP.BING, bingChatAdapter);
chatSystem.addAdapter(AI_PROVIDER_MAP.BARD, bardChatAdapter);
chatSystem.addAdapter(AI_PROVIDER_MAP.CLAUDE, claudeChatAdapter);
chatSystem.addAdapter(AI_PROVIDER_MAP.MAXAI_CLAUDE, maxAIClaudeAdapter);
chatSystem.addAdapter(AI_PROVIDER_MAP.USE_CHAT_GPT_PLUS, useChatGPTPlusAdapter);
chatSystem.addAdapter(AI_PROVIDER_MAP.FREE_AI, freeAIChatAdapter);
chatSystem.addAdapter(AI_PROVIDER_MAP.GEMINI, geminiChatAdapter);
SearchWithAIMessageInit();
