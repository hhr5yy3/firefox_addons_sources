browser.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    browser.tabs.create({ url: "https://chatgptpdf.tech/welcome" });
  } else if (details.reason === "update") {
  }
});

browser.runtime.setUninstallURL("https://chatgptpdf.tech/see-you-soon").catch((error) => {
  console.error(`Failed to set uninstall URL: ${error}`);
});

browser.runtime.onMessage.addListener(async (request, sender) => {
  if (request.action === "convertHTMLToPDF") {
    try {
      const response = await fetch("https://chatgptpdf.tech/api/convert-html-to-pdf-gpt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request.data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Network response was not ok.");
      }

      const blob = await response.blob();
      return { blob };
    } catch (error) {
      return { error: error.message };
    }
  }

  return Promise.resolve();
});
