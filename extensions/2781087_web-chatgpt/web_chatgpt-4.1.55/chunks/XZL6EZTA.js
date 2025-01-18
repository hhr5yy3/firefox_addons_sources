import {
  fetchAdapter,
  require_dist
} from "./4GUJBY7U.js";
import {
  BaseLanguageModel,
  CallbackManager,
  getModelNameForTiktoken,
  isNode
} from "./BNXUMZ5F.js";
import {
  AIChatMessage,
  ChatMessage,
  HumanChatMessage,
  RUN_KEY,
  SystemChatMessage
} from "./UK6YILTB.js";
import "./2RTBHBIC.js";
import {
  __toESM
} from "./ERZ5UWI7.js";

// node_modules/.pnpm/langchain@0.0.81_axios@1.3.3_cheerio@1.0.0-rc.12_ignore@5.3.2/node_modules/langchain/dist/chat_models/openai.js
var import_openai = __toESM(require_dist(), 1);

// node_modules/.pnpm/langchain@0.0.81_axios@1.3.3_cheerio@1.0.0-rc.12_ignore@5.3.2/node_modules/langchain/dist/chat_models/base.js
var BaseChatModel = class extends BaseLanguageModel {
  constructor(fields) {
    super(fields);
  }
  async generate(messages, options, callbacks) {
    var _a;
    const generations = [];
    const llmOutputs = [];
    let parsedOptions;
    if (Array.isArray(options)) {
      parsedOptions = { stop: options };
    } else if ((options == null ? void 0 : options.timeout) && !options.signal) {
      parsedOptions = {
        ...options,
        signal: AbortSignal.timeout(options.timeout)
      };
    } else {
      parsedOptions = options != null ? options : {};
    }
    const callbackManager_ = await CallbackManager.configure(callbacks, this.callbacks, { verbose: this.verbose });
    const invocationParams = { invocation_params: this == null ? void 0 : this.invocationParams() };
    const runManager = await (callbackManager_ == null ? void 0 : callbackManager_.handleChatModelStart({ name: this._llmType() }, messages, void 0, void 0, invocationParams));
    try {
      const results = await Promise.all(messages.map((messageList) => this._generate(messageList, parsedOptions, runManager)));
      for (const result of results) {
        if (result.llmOutput) {
          llmOutputs.push(result.llmOutput);
        }
        generations.push(result.generations);
      }
    } catch (err) {
      await (runManager == null ? void 0 : runManager.handleLLMError(err));
      throw err;
    }
    const output = {
      generations,
      llmOutput: llmOutputs.length ? (_a = this._combineLLMOutput) == null ? void 0 : _a.call(this, ...llmOutputs) : void 0
    };
    await (runManager == null ? void 0 : runManager.handleLLMEnd(output));
    Object.defineProperty(output, RUN_KEY, {
      value: runManager ? { runId: runManager == null ? void 0 : runManager.runId } : void 0,
      configurable: true
    });
    return output;
  }
  /**
   * Get the parameters used to invoke the model
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  invocationParams() {
    return {};
  }
  _modelType() {
    return "base_chat_model";
  }
  async generatePrompt(promptValues, options, callbacks) {
    const promptMessages = promptValues.map((promptValue) => promptValue.toChatMessages());
    return this.generate(promptMessages, options, callbacks);
  }
  async call(messages, options, callbacks) {
    const result = await this.generate([messages], options, callbacks);
    const generations = result.generations;
    return generations[0][0].message;
  }
  async callPrompt(promptValue, options, callbacks) {
    const promptMessages = promptValue.toChatMessages();
    return this.call(promptMessages, options, callbacks);
  }
  async predictMessages(messages, options, callbacks) {
    return this.call(messages, options, callbacks);
  }
  async predict(text, options, callbacks) {
    const message = new HumanChatMessage(text);
    const result = await this.call([message], options, callbacks);
    return result.text;
  }
};

// node_modules/.pnpm/langchain@0.0.81_axios@1.3.3_cheerio@1.0.0-rc.12_ignore@5.3.2/node_modules/langchain/dist/chat_models/openai.js
function messageTypeToOpenAIRole(type) {
  switch (type) {
    case "system":
      return "system";
    case "ai":
      return "assistant";
    case "human":
      return "user";
    default:
      throw new Error(`Unknown message type: ${type}`);
  }
}
function openAIResponseToChatMessage(role, text) {
  switch (role) {
    case "user":
      return new HumanChatMessage(text);
    case "assistant":
      return new AIChatMessage(text);
    case "system":
      return new SystemChatMessage(text);
    default:
      return new ChatMessage(text, role != null ? role : "unknown");
  }
}
var ChatOpenAI = class extends BaseChatModel {
  get callKeys() {
    return ["stop", "signal", "timeout", "options"];
  }
  constructor(fields, configuration) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
    super(fields != null ? fields : {});
    Object.defineProperty(this, "temperature", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 1
    });
    Object.defineProperty(this, "topP", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 1
    });
    Object.defineProperty(this, "frequencyPenalty", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
    Object.defineProperty(this, "presencePenalty", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
    Object.defineProperty(this, "n", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 1
    });
    Object.defineProperty(this, "logitBias", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "modelName", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "gpt-3.5-turbo"
    });
    Object.defineProperty(this, "modelKwargs", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "stop", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "timeout", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "streaming", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: false
    });
    Object.defineProperty(this, "maxTokens", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "azureOpenAIApiVersion", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "azureOpenAIApiKey", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "azureOpenAIApiInstanceName", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "azureOpenAIApiDeploymentName", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "client", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "clientConfig", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    const apiKey = (_b = fields == null ? void 0 : fields.openAIApiKey) != null ? _b : typeof process !== "undefined" ? (
      // eslint-disable-next-line no-process-env
      (_a = process.env) == null ? void 0 : _a.OPENAI_API_KEY
    ) : void 0;
    const azureApiKey = (_d = fields == null ? void 0 : fields.azureOpenAIApiKey) != null ? _d : typeof process !== "undefined" ? (
      // eslint-disable-next-line no-process-env
      (_c = process.env) == null ? void 0 : _c.AZURE_OPENAI_API_KEY
    ) : void 0;
    if (!azureApiKey && !apiKey) {
      throw new Error("(Azure) OpenAI API key not found");
    }
    const azureApiInstanceName = (_f = fields == null ? void 0 : fields.azureOpenAIApiInstanceName) != null ? _f : typeof process !== "undefined" ? (
      // eslint-disable-next-line no-process-env
      (_e = process.env) == null ? void 0 : _e.AZURE_OPENAI_API_INSTANCE_NAME
    ) : void 0;
    const azureApiDeploymentName = (_h = fields == null ? void 0 : fields.azureOpenAIApiDeploymentName) != null ? _h : typeof process !== "undefined" ? (
      // eslint-disable-next-line no-process-env
      (_g = process.env) == null ? void 0 : _g.AZURE_OPENAI_API_DEPLOYMENT_NAME
    ) : void 0;
    const azureApiVersion = (_j = fields == null ? void 0 : fields.azureOpenAIApiVersion) != null ? _j : typeof process !== "undefined" ? (
      // eslint-disable-next-line no-process-env
      (_i = process.env) == null ? void 0 : _i.AZURE_OPENAI_API_VERSION
    ) : void 0;
    this.modelName = (_k = fields == null ? void 0 : fields.modelName) != null ? _k : this.modelName;
    this.modelKwargs = (_l = fields == null ? void 0 : fields.modelKwargs) != null ? _l : {};
    this.timeout = fields == null ? void 0 : fields.timeout;
    this.temperature = (_m = fields == null ? void 0 : fields.temperature) != null ? _m : this.temperature;
    this.topP = (_n = fields == null ? void 0 : fields.topP) != null ? _n : this.topP;
    this.frequencyPenalty = (_o = fields == null ? void 0 : fields.frequencyPenalty) != null ? _o : this.frequencyPenalty;
    this.presencePenalty = (_p = fields == null ? void 0 : fields.presencePenalty) != null ? _p : this.presencePenalty;
    this.maxTokens = fields == null ? void 0 : fields.maxTokens;
    this.n = (_q = fields == null ? void 0 : fields.n) != null ? _q : this.n;
    this.logitBias = fields == null ? void 0 : fields.logitBias;
    this.stop = fields == null ? void 0 : fields.stop;
    this.streaming = (_r = fields == null ? void 0 : fields.streaming) != null ? _r : false;
    this.azureOpenAIApiVersion = azureApiVersion;
    this.azureOpenAIApiKey = azureApiKey;
    this.azureOpenAIApiInstanceName = azureApiInstanceName;
    this.azureOpenAIApiDeploymentName = azureApiDeploymentName;
    if (this.streaming && this.n > 1) {
      throw new Error("Cannot stream results when n > 1");
    }
    if (this.azureOpenAIApiKey) {
      if (!this.azureOpenAIApiInstanceName) {
        throw new Error("Azure OpenAI API instance name not found");
      }
      if (!this.azureOpenAIApiDeploymentName) {
        throw new Error("Azure OpenAI API deployment name not found");
      }
      if (!this.azureOpenAIApiVersion) {
        throw new Error("Azure OpenAI API version not found");
      }
    }
    this.clientConfig = {
      apiKey,
      ...configuration
    };
  }
  /**
   * Get the parameters used to invoke the model
   */
  invocationParams() {
    return {
      model: this.modelName,
      temperature: this.temperature,
      top_p: this.topP,
      frequency_penalty: this.frequencyPenalty,
      presence_penalty: this.presencePenalty,
      max_tokens: this.maxTokens === -1 ? void 0 : this.maxTokens,
      n: this.n,
      logit_bias: this.logitBias,
      stop: this.stop,
      stream: this.streaming,
      ...this.modelKwargs
    };
  }
  /** @ignore */
  _identifyingParams() {
    return {
      model_name: this.modelName,
      ...this.invocationParams(),
      ...this.clientConfig
    };
  }
  /**
   * Get the identifying parameters for the model
   */
  identifyingParams() {
    return this._identifyingParams();
  }
  /** @ignore */
  async _generate(messages, options, runManager) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i;
    const tokenUsage = {};
    if (this.stop && (options == null ? void 0 : options.stop)) {
      throw new Error("Stop found in input and default params");
    }
    const params = this.invocationParams();
    params.stop = (_a = options == null ? void 0 : options.stop) != null ? _a : params.stop;
    const messagesMapped = messages.map((message) => ({
      role: messageTypeToOpenAIRole(message._getType()),
      content: message.text,
      name: message.name
    }));
    const data = params.stream ? await new Promise((resolve, reject) => {
      let response;
      let rejected = false;
      let resolved = false;
      this.completionWithRetry({
        ...params,
        messages: messagesMapped
      }, {
        signal: options == null ? void 0 : options.signal,
        ...options == null ? void 0 : options.options,
        adapter: fetchAdapter,
        responseType: "stream",
        onmessage: (event) => {
          var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j;
          if (((_b2 = (_a2 = event.data) == null ? void 0 : _a2.trim) == null ? void 0 : _b2.call(_a2)) === "[DONE]") {
            if (resolved) {
              return;
            }
            resolved = true;
            resolve(response);
          } else {
            const message = JSON.parse(event.data);
            if (!response) {
              response = {
                id: message.id,
                object: message.object,
                created: message.created,
                model: message.model,
                choices: []
              };
            }
            for (const part of message.choices) {
              if (part != null) {
                let choice = response.choices.find((c) => c.index === part.index);
                if (!choice) {
                  choice = {
                    index: part.index,
                    finish_reason: (_c2 = part.finish_reason) != null ? _c2 : void 0
                  };
                  response.choices[part.index] = choice;
                }
                if (!choice.message) {
                  choice.message = {
                    role: (_d2 = part.delta) == null ? void 0 : _d2.role,
                    content: (_f2 = (_e2 = part.delta) == null ? void 0 : _e2.content) != null ? _f2 : ""
                  };
                }
                choice.message.content += (_h2 = (_g2 = part.delta) == null ? void 0 : _g2.content) != null ? _h2 : "";
                void (runManager == null ? void 0 : runManager.handleLLMNewToken((_j = (_i2 = part.delta) == null ? void 0 : _i2.content) != null ? _j : ""));
              }
            }
            if (!resolved && message.choices.every((c) => c.finish_reason != null)) {
              resolved = true;
              resolve(response);
            }
          }
        }
      }).catch((error) => {
        if (!rejected) {
          rejected = true;
          reject(error);
        }
      });
    }) : await this.completionWithRetry({
      ...params,
      messages: messagesMapped
    }, {
      signal: options == null ? void 0 : options.signal,
      ...options == null ? void 0 : options.options
    });
    const { completion_tokens: completionTokens, prompt_tokens: promptTokens, total_tokens: totalTokens } = (_b = data.usage) != null ? _b : {};
    if (completionTokens) {
      tokenUsage.completionTokens = ((_c = tokenUsage.completionTokens) != null ? _c : 0) + completionTokens;
    }
    if (promptTokens) {
      tokenUsage.promptTokens = ((_d = tokenUsage.promptTokens) != null ? _d : 0) + promptTokens;
    }
    if (totalTokens) {
      tokenUsage.totalTokens = ((_e = tokenUsage.totalTokens) != null ? _e : 0) + totalTokens;
    }
    const generations = [];
    for (const part of data.choices) {
      const role = (_g = (_f = part.message) == null ? void 0 : _f.role) != null ? _g : void 0;
      const text = (_i = (_h = part.message) == null ? void 0 : _h.content) != null ? _i : "";
      generations.push({
        text,
        message: openAIResponseToChatMessage(role, text)
      });
    }
    return {
      generations,
      llmOutput: { tokenUsage }
    };
  }
  async getNumTokensFromMessages(messages) {
    let totalCount = 0;
    let tokensPerMessage = 0;
    let tokensPerName = 0;
    if (getModelNameForTiktoken(this.modelName) === "gpt-3.5-turbo") {
      tokensPerMessage = 4;
      tokensPerName = -1;
    } else if (getModelNameForTiktoken(this.modelName).startsWith("gpt-4")) {
      tokensPerMessage = 3;
      tokensPerName = 1;
    }
    const countPerMessage = await Promise.all(messages.map(async (message) => {
      const textCount = await this.getNumTokens(message.text);
      const roleCount = await this.getNumTokens(messageTypeToOpenAIRole(message._getType()));
      const nameCount = message.name !== void 0 ? tokensPerName + await this.getNumTokens(message.name) : 0;
      const count = textCount + tokensPerMessage + roleCount + nameCount;
      totalCount += count;
      return count;
    }));
    totalCount += 3;
    return { totalCount, countPerMessage };
  }
  /** @ignore */
  async completionWithRetry(request, options) {
    if (!this.client) {
      const endpoint = this.azureOpenAIApiKey ? `https://${this.azureOpenAIApiInstanceName}.openai.azure.com/openai/deployments/${this.azureOpenAIApiDeploymentName}` : this.clientConfig.basePath;
      const clientConfig = new import_openai.Configuration({
        ...this.clientConfig,
        basePath: endpoint,
        baseOptions: {
          timeout: this.timeout,
          ...this.clientConfig.baseOptions
        }
      });
      this.client = new import_openai.OpenAIApi(clientConfig);
    }
    const axiosOptions = {
      adapter: isNode() ? void 0 : fetchAdapter,
      ...this.clientConfig.baseOptions,
      ...options
    };
    if (this.azureOpenAIApiKey) {
      axiosOptions.headers = {
        "api-key": this.azureOpenAIApiKey,
        ...axiosOptions.headers
      };
      axiosOptions.params = {
        "api-version": this.azureOpenAIApiVersion,
        ...axiosOptions.params
      };
    }
    return this.caller.call(this.client.createChatCompletion.bind(this.client), request, axiosOptions).then((res) => res.data);
  }
  _llmType() {
    return "openai";
  }
  /** @ignore */
  _combineLLMOutput(...llmOutputs) {
    return llmOutputs.reduce((acc, llmOutput) => {
      var _a, _b, _c;
      if (llmOutput && llmOutput.tokenUsage) {
        acc.tokenUsage.completionTokens += (_a = llmOutput.tokenUsage.completionTokens) != null ? _a : 0;
        acc.tokenUsage.promptTokens += (_b = llmOutput.tokenUsage.promptTokens) != null ? _b : 0;
        acc.tokenUsage.totalTokens += (_c = llmOutput.tokenUsage.totalTokens) != null ? _c : 0;
      }
      return acc;
    }, {
      tokenUsage: {
        completionTokens: 0,
        promptTokens: 0,
        totalTokens: 0
      }
    });
  }
};
export {
  ChatOpenAI
};
