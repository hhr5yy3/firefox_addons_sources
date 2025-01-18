function extractConversation() {
  let mdContent = '';
  let listLevel = 0;
  let orderedListIndex = [0];
  const indentSpaces = 2;
  const lowerCaseACharCode = 97; // ASCII character code for 'a'

  const isChatGPT = window.location.hostname.includes('chat.openai.com') || window.location.hostname.includes('chatgpt.com');
  let assistantName = 'ChatGPT';
  if (window.location.hostname.includes('claude.ai')) {
    assistantName = 'Claude';
  } else if (window.location.hostname.includes('chat.mistral.ai')) {
    assistantName = 'Mistral';
  }


  const getIndent = () => `${' '.repeat(listLevel * indentSpaces)}`;
  const getOrderedListMarker = (level) => {
    if (level === 1) {
      return `${orderedListIndex[level]}.`;
    } else if (level === 2) {
      return `${String.fromCharCode(lowerCaseACharCode + orderedListIndex[level] - 1)}.`;
    } else if (level === 3) {
      const romanNumerals = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix'];
      return `${romanNumerals[orderedListIndex[level] - 1]}.`;
    } else {
      return `${orderedListIndex[level]}.`;
    }
  };

  const processNode = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      mdContent += `${node.textContent}`;
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.tagName.startsWith('H')) {
        const headerLevel = node.tagName.slice(1);
        mdContent += `\n${'#'.repeat(headerLevel)} `;
        node.childNodes.forEach(processNode);
        mdContent += '\n';
      } else if (isChatGPT && node.tagName === 'PRE') {
        const codeBlock = node.querySelector('div.dark');
        if (codeBlock) {
          const language = codeBlock.querySelector('div > span:first-child').textContent.trim();
          const code = codeBlock.querySelector('div.p-4 > code').textContent.trim();
          mdContent += `\n\`\`\`${language}\n${code}\n\`\`\`\n`;
        }
      } else if (!isChatGPT && node.tagName === 'PRE') {
        const codeBlock = node.querySelector('code');
        if (codeBlock) {
          const code = codeBlock.innerText.trim();
          const classes = codeBlock.classList;
          let language = '';
          for (let i = 0; i < classes.length; i++) {
            if (classes[i].startsWith('language-')) {
              language = classes[i].slice(9);
              break;
            }
          }
          mdContent += `\n\`\`\`${language}\n${code}\n\`\`\`\n`;
        }
      } else if (node.tagName === 'CODE') {
        mdContent += `\`${node.textContent}\``;
      } else if (node.tagName === 'B' || node.tagName === 'STRONG') {
        mdContent += `**${node.textContent}**`;
      } else if (node.tagName === 'A') {
        mdContent += `[${node.textContent}](${node.href})`;
      } else if (node.tagName === 'OL') {
        listLevel++;
        orderedListIndex[listLevel] = 1;
        node.childNodes.forEach((li) => {
          if (li.textContent.trim() !== '') {
            mdContent += `\n${getIndent()}${getOrderedListMarker(listLevel)} `;
            orderedListIndex[listLevel]++;
          }
          li.childNodes.forEach(processNode);
        });
        listLevel--;
      } else if (node.tagName === 'UL') {
        listLevel++;
        node.childNodes.forEach((li) => {
          if (li.textContent.trim() !== '') {
            mdContent += `\n${getIndent()}- `;
          }
          li.childNodes.forEach(processNode);
        });
        listLevel--;
      } else if (node.tagName === 'LI') {
        // Skip processing <li> tags as they are handled in <ol> and <ul> tags
      } else if (node.tagName === 'P') {
        node.childNodes.forEach(processNode);
      } else if (node.tagName === 'BR') {
        mdContent += '\n';
      } else {
        node.childNodes.forEach(processNode);
      }
    }
  };

  const userMessages = document.querySelectorAll('.font-user-message, [data-message-author-role="user"], .group.relative.flex:has(> .flex-row > .rounded-full) > .flex-col');
  const assistantMessages = document.querySelectorAll('.font-claude-message, [data-message-author-role="assistant"], .group.relative.flex:has(> svg)');
  for (let i = 0; i < userMessages.length; i++) {
    const userMessage = userMessages[i];
    const assistantMessage = assistantMessages[i];

    const userText = userMessage.textContent.trim();
    mdContent += `***You***: ${userText}\n`;
    mdContent += `***${assistantName}***: `;
    assistantMessage.childNodes.forEach(processNode);
    mdContent += '\n';
  }

  return mdContent.trim();
}

function downloadMDFile(content) {
  const blob = new Blob([content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;

  const chatName = document.querySelector('li > div.bg-token-sidebar-surface-secondary:not(:hover) > a > div[class*="relative"')
    || document.querySelector('button[data-testid="chat-menu-trigger"]')
    || document.querySelector('div > a.text-primary');
  const chatNameText = chatName ? chatName.textContent : 'conversation';
  a.download = `${chatNameText}.md`;
  a.click();
  URL.revokeObjectURL(url);
}

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'extractConversation') {
    const markdownContent = extractConversation();
    if (markdownContent) {
      downloadMDFile(markdownContent);
    } else {
      alert('No conversation found on the current page.');
    }
    sendResponse({ success: true });
  }
});
