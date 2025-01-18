import {
  PromptTemplate
} from "./K4E3HDTJ.js";
import {
  LLMChain
} from "./OPEYTZKR.js";
import {
  BaseChain
} from "./DV6DE7ER.js";

// node_modules/.pnpm/langchain@0.0.81_axios@1.3.3_cheerio@1.0.0-rc.12_ignore@5.3.2/node_modules/langchain/dist/chains/combine_docs_chain.js
var StuffDocumentsChain = class extends BaseChain {
  get inputKeys() {
    return [this.inputKey, ...this.llmChain.inputKeys];
  }
  get outputKeys() {
    return this.llmChain.outputKeys;
  }
  constructor(fields) {
    var _a, _b;
    super(fields);
    Object.defineProperty(this, "llmChain", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "inputKey", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "input_documents"
    });
    Object.defineProperty(this, "documentVariableName", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "context"
    });
    this.llmChain = fields.llmChain;
    this.documentVariableName = (_a = fields.documentVariableName) != null ? _a : this.documentVariableName;
    this.inputKey = (_b = fields.inputKey) != null ? _b : this.inputKey;
  }
  /** @ignore */
  async _call(values, runManager) {
    if (!(this.inputKey in values)) {
      throw new Error(`Document key ${this.inputKey} not found.`);
    }
    const { [this.inputKey]: docs, ...rest } = values;
    const texts = docs.map(({ pageContent }) => pageContent);
    const text = texts.join("\n\n");
    const result = await this.llmChain.call({
      ...rest,
      [this.documentVariableName]: text
    }, runManager == null ? void 0 : runManager.getChild());
    return result;
  }
  _chainType() {
    return "stuff_documents_chain";
  }
  static async deserialize(data) {
    if (!data.llm_chain) {
      throw new Error("Missing llm_chain");
    }
    return new StuffDocumentsChain({
      llmChain: await LLMChain.deserialize(data.llm_chain)
    });
  }
  serialize() {
    return {
      _type: this._chainType(),
      llm_chain: this.llmChain.serialize()
    };
  }
};
var MapReduceDocumentsChain = class extends BaseChain {
  get inputKeys() {
    return [this.inputKey, ...this.combineDocumentChain.inputKeys];
  }
  get outputKeys() {
    return this.combineDocumentChain.outputKeys;
  }
  constructor(fields) {
    var _a, _b, _c, _d, _e, _f;
    super(fields);
    Object.defineProperty(this, "llmChain", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "inputKey", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "input_documents"
    });
    Object.defineProperty(this, "documentVariableName", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "context"
    });
    Object.defineProperty(this, "returnIntermediateSteps", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: false
    });
    Object.defineProperty(this, "maxTokens", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 3e3
    });
    Object.defineProperty(this, "maxIterations", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 10
    });
    Object.defineProperty(this, "ensureMapStep", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: false
    });
    Object.defineProperty(this, "combineDocumentChain", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.llmChain = fields.llmChain;
    this.combineDocumentChain = fields.combineDocumentChain;
    this.documentVariableName = (_a = fields.documentVariableName) != null ? _a : this.documentVariableName;
    this.ensureMapStep = (_b = fields.ensureMapStep) != null ? _b : this.ensureMapStep;
    this.inputKey = (_c = fields.inputKey) != null ? _c : this.inputKey;
    this.maxTokens = (_d = fields.maxTokens) != null ? _d : this.maxTokens;
    this.maxIterations = (_e = fields.maxIterations) != null ? _e : this.maxIterations;
    this.returnIntermediateSteps = (_f = fields.returnIntermediateSteps) != null ? _f : false;
  }
  /** @ignore */
  async _call(values, runManager) {
    if (!(this.inputKey in values)) {
      throw new Error(`Document key ${this.inputKey} not found.`);
    }
    const { [this.inputKey]: docs, ...rest } = values;
    let currentDocs = docs;
    let intermediateSteps = [];
    for (let i = 0; i < this.maxIterations; i += 1) {
      const inputs = currentDocs.map((d) => ({
        [this.documentVariableName]: d.pageContent,
        ...rest
      }));
      const promises = inputs.map(async (i2) => {
        const prompt = await this.llmChain.prompt.format(i2);
        return this.llmChain.llm.getNumTokens(prompt);
      });
      const length = await Promise.all(promises).then((results2) => results2.reduce((a, b) => a + b, 0));
      const canSkipMapStep = i !== 0 || !this.ensureMapStep;
      const withinTokenLimit = length < this.maxTokens;
      if (canSkipMapStep && withinTokenLimit) {
        break;
      }
      const results = await this.llmChain.apply(inputs, runManager ? [runManager.getChild()] : void 0);
      const { outputKey } = this.llmChain;
      if (this.returnIntermediateSteps) {
        intermediateSteps = intermediateSteps.concat(results.map((r) => r[outputKey]));
      }
      currentDocs = results.map((r) => ({
        pageContent: r[outputKey]
      }));
    }
    const newInputs = { input_documents: currentDocs, ...rest };
    const result = await this.combineDocumentChain.call(newInputs, runManager == null ? void 0 : runManager.getChild());
    if (this.returnIntermediateSteps) {
      return { ...result, intermediateSteps };
    }
    return result;
  }
  _chainType() {
    return "map_reduce_documents_chain";
  }
  static async deserialize(data) {
    if (!data.llm_chain) {
      throw new Error("Missing llm_chain");
    }
    if (!data.combine_document_chain) {
      throw new Error("Missing combine_document_chain");
    }
    return new MapReduceDocumentsChain({
      llmChain: await LLMChain.deserialize(data.llm_chain),
      combineDocumentChain: await BaseChain.deserialize(data.combine_document_chain)
    });
  }
  serialize() {
    return {
      _type: this._chainType(),
      llm_chain: this.llmChain.serialize(),
      combine_document_chain: this.combineDocumentChain.serialize()
    };
  }
};
var RefineDocumentsChain = class extends BaseChain {
  get defaultDocumentPrompt() {
    return new PromptTemplate({
      inputVariables: ["page_content"],
      template: "{page_content}"
    });
  }
  get inputKeys() {
    return [this.inputKey, ...this.refineLLMChain.inputKeys];
  }
  get outputKeys() {
    return [this.outputKey];
  }
  constructor(fields) {
    var _a, _b, _c, _d, _e;
    super(fields);
    Object.defineProperty(this, "llmChain", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "inputKey", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "input_documents"
    });
    Object.defineProperty(this, "outputKey", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "output_text"
    });
    Object.defineProperty(this, "documentVariableName", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "context"
    });
    Object.defineProperty(this, "initialResponseName", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "existing_answer"
    });
    Object.defineProperty(this, "refineLLMChain", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "documentPrompt", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: this.defaultDocumentPrompt
    });
    this.llmChain = fields.llmChain;
    this.refineLLMChain = fields.refineLLMChain;
    this.documentVariableName = (_a = fields.documentVariableName) != null ? _a : this.documentVariableName;
    this.inputKey = (_b = fields.inputKey) != null ? _b : this.inputKey;
    this.outputKey = (_c = fields.outputKey) != null ? _c : this.outputKey;
    this.documentPrompt = (_d = fields.documentPrompt) != null ? _d : this.documentPrompt;
    this.initialResponseName = (_e = fields.initialResponseName) != null ? _e : this.initialResponseName;
  }
  /** @ignore */
  async _constructInitialInputs(doc, rest) {
    const baseInfo = {
      page_content: doc.pageContent,
      ...doc.metadata
    };
    const documentInfo = {};
    this.documentPrompt.inputVariables.forEach((value) => {
      documentInfo[value] = baseInfo[value];
    });
    const baseInputs = {
      [this.documentVariableName]: await this.documentPrompt.format({
        ...documentInfo
      })
    };
    const inputs = { ...baseInputs, ...rest };
    return inputs;
  }
  /** @ignore */
  async _constructRefineInputs(doc, res) {
    const baseInfo = {
      page_content: doc.pageContent,
      ...doc.metadata
    };
    const documentInfo = {};
    this.documentPrompt.inputVariables.forEach((value) => {
      documentInfo[value] = baseInfo[value];
    });
    const baseInputs = {
      [this.documentVariableName]: await this.documentPrompt.format({
        ...documentInfo
      })
    };
    const inputs = { [this.initialResponseName]: res, ...baseInputs };
    return inputs;
  }
  /** @ignore */
  async _call(values, runManager) {
    if (!(this.inputKey in values)) {
      throw new Error(`Document key ${this.inputKey} not found.`);
    }
    const { [this.inputKey]: docs, ...rest } = values;
    const currentDocs = docs;
    const initialInputs = await this._constructInitialInputs(currentDocs[0], rest);
    let res = await this.llmChain.predict({ ...initialInputs }, runManager == null ? void 0 : runManager.getChild());
    const refineSteps = [res];
    for (let i = 1; i < currentDocs.length; i += 1) {
      const refineInputs = await this._constructRefineInputs(currentDocs[i], res);
      const inputs = { ...refineInputs, ...rest };
      res = await this.refineLLMChain.predict({ ...inputs }, runManager == null ? void 0 : runManager.getChild());
      refineSteps.push(res);
    }
    return { [this.outputKey]: res };
  }
  _chainType() {
    return "refine_documents_chain";
  }
  static async deserialize(data) {
    const SerializedLLMChain = data.llm_chain;
    if (!SerializedLLMChain) {
      throw new Error("Missing llm_chain");
    }
    const SerializedRefineDocumentChain = data.refine_llm_chain;
    if (!SerializedRefineDocumentChain) {
      throw new Error("Missing refine_llm_chain");
    }
    return new RefineDocumentsChain({
      llmChain: await LLMChain.deserialize(SerializedLLMChain),
      refineLLMChain: await LLMChain.deserialize(SerializedRefineDocumentChain)
    });
  }
  serialize() {
    return {
      _type: this._chainType(),
      llm_chain: this.llmChain.serialize(),
      refine_llm_chain: this.refineLLMChain.serialize()
    };
  }
};

export {
  StuffDocumentsChain,
  MapReduceDocumentsChain,
  RefineDocumentsChain
};
