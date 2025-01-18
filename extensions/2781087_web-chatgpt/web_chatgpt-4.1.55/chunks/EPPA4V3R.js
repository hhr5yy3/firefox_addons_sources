import {
  DEFAULT_SEARCH_WITH_AI_SETTING
} from "./M6PYVE3O.js";
import {
  Recoil_index_8
} from "./FQZJQWJR.js";

// src/features/searchWithAI/store/index.ts
var SourcesStatusAtom = Recoil_index_8({
  key: "SourcesStatusAtom",
  default: {
    loading: false,
    sources: []
  }
});
var SearchWithAISettingsAtom = Recoil_index_8({
  key: "SearchWithAISettingsAtom",
  default: {
    loaded: false,
    ...DEFAULT_SEARCH_WITH_AI_SETTING
  }
});
var AutoTriggerAskEnableAtom = Recoil_index_8({
  key: "AutoTriggerAskEnableAtom",
  default: true
});
var SearchWithAIProviderLoadingAtom = Recoil_index_8({
  key: "SearchWithAIProviderLoadingAtom",
  default: false
});
var SearchWithAIConversationAtom = Recoil_index_8(
  {
    key: "SearchWithAIConversationAtom",
    default: {
      conversationId: "",
      loading: false,
      writingMessage: "",
      completedMessage: "",
      errorMessage: ""
    }
  }
);

export {
  SourcesStatusAtom,
  SearchWithAISettingsAtom,
  AutoTriggerAskEnableAtom,
  SearchWithAIProviderLoadingAtom,
  SearchWithAIConversationAtom
};
