// src/features/webAccess/utils/systemPromptManager.ts
var TEMPORARY_CACHE_SYSTEM_PROMPT = "TEMPORARY_CACHE_SYSTEM_PROMPT";
var cacheSystemPrompt = (prompt) => {
  const text = document.createElement("span");
  text.id = TEMPORARY_CACHE_SYSTEM_PROMPT;
  text.style.display = "none";
  text.textContent = prompt;
  document.body.appendChild(text);
};
var getSystemPrompt = (autoClear = true) => {
  const cacheEl = document.querySelector(
    `span#${TEMPORARY_CACHE_SYSTEM_PROMPT}`
  );
  if (cacheEl) {
    autoClear && cacheEl.remove();
    return cacheEl.textContent;
  }
  return "";
};

export {
  cacheSystemPrompt,
  getSystemPrompt
};
