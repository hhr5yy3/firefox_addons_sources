;(async () => {
  const chunks = ["/runtime.js",
"/cleanup.content.js",
];

  for(const c of chunks) {
    await import(browser.runtime.getURL(c));
  }
})();
