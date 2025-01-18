const handleSourceViewerLoad = () => {
  const seoExtensionAPI = typeof browser !== "undefined" ? browser : chrome;
  const button = document.querySelector(".source-icon");

  button.addEventListener("click", () => {
    console.log("clicked");
    seoExtensionAPI.runtime.sendMessage({ action: "getSource" });
  });
};

document.addEventListener("DOMContentLoaded", handleSourceViewerLoad);
