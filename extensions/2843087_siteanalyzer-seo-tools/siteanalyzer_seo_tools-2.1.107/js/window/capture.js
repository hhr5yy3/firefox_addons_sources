const handleCaptureClick = () => {
  const button = document.querySelector("#export_to_png");

  button.addEventListener("click", () => {
    executeOnActiveTab(() => {
      return location.hostname;
    }).then((host) => {
      html2canvas(document.querySelector('[data-tab-content="analyze"]')).then(
        (canvas) => {
          const link = document.createElement("a");

          link.href = canvas.toDataURL("image/png");
          link.download = `${host}_seo-report.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      );
    });
  });
};

document.addEventListener("DOMContentLoaded", handleCaptureClick);
