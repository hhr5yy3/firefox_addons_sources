chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  const url = new URL(details.url);
  const searchQuery = url.searchParams.get('q') || url.searchParams.get('query');

  if (searchQuery && searchQuery.toLowerCase().startsWith('ask ')) {
    const gptQuery = searchQuery.slice(4); // Remove 'gpt ' prefix
    const chatGptUrl = `https://perplexity.ai/?q=${encodeURIComponent(gptQuery)}`;
    
    chrome.tabs.update(details.tabId, { url: chatGptUrl });
  }
}, {
  url: [
    { schemes: ['http', 'https'] },
    { hostContains: '.google.' },
    { pathContains: '/search' }
  ]
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url.startsWith('https://www.perplexity.ai/')) {
    chrome.tabs.sendMessage(tabId, { action: 'fillChatGPT', query: new URL(tab.url).searchParams.get('q') });
  }
});