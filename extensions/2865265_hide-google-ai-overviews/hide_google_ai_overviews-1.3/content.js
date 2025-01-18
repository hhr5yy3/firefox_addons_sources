const observer = new MutationObserver(() => {
  // each time there's a mutation in the document see if there's an ai overview to hide
  const aiOverviewH1 = [...document.querySelectorAll('h1')].find(h1 => /ai overview/i.test(h1.innerText));

  if(aiOverviewH1?.parentElement) {
    aiOverviewH1.parentElement.style.display = 'none';
  }
});

observer.observe(document, {
  childList: true,
  subtree: true,
});
