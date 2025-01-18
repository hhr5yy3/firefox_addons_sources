function findUnreadCount() {
  const nodeList = document.querySelectorAll('div[role="treeitem"]');
  for (const node of nodeList) {
    const nameNode = node.querySelector("span[title]");
    if (!nameNode)
      continue;
    const name = nameNode.getAttribute("title");
    if (name === "Inbox" || name === "Posteingang") {
      return nameNode.nextElementSibling;
    }
  }
  return null;
}
function onCharacterChanged(mutationRecord, _observer) {
  const count = Number.parseInt(mutationRecord[0]?.target?.textContent || "") || 0;
  chrome.runtime.sendMessage({cmd: "read_mail_owa", nrOfUnreadMail: count});
}
const checkInterval = setInterval(() => {
  const unreadCountNode = findUnreadCount();
  if (unreadCountNode) {
    clearInterval(checkInterval);
    new MutationObserver(onCharacterChanged).observe(unreadCountNode, {subtree: true, characterData: true});
  }
}, 100);
