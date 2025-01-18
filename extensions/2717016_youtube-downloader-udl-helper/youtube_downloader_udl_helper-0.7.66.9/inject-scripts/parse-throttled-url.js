(() => {
  const container = document.currentScript;

  try {
    const { url } = JSON.parse(container.getAttribute("data-params"));

    // Find method for calc new 'n'
    const [fData] = Object.entries(window._yt_player).filter(([, f]) => f?.prototype?.get && f.length > 1 && /\.url/.test(f.toString()));
    const [name1] = fData;

    const holder = new window._yt_player[name1](url, true);
    if (holder) {
      const newN = holder.get("n");
      container.setAttribute("data-response", JSON.stringify({ n: newN }));
      container.setAttribute("data-status", "fulfilled");
    } else {
      container.setAttribute("data-response", new Error(`${name1} not found`));
      container.setAttribute("data-status", "rejected");
    }
  } catch (e) {
    container.setAttribute("data-response", JSON.stringify(e));
    container.setAttribute("data-status", "rejected");
  }
})();
