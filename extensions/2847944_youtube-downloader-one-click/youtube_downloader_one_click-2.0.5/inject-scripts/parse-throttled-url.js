(() => {
  const container = document.currentScript;

  try {
    const { name1, name2, url } = JSON.parse(container.getAttribute("data-params"));
    const holder = new window._yt_player[name1](url, true);
    if (holder) {
      holder[name2]();
      container.setAttribute("data-response", JSON.stringify({ n: holder.j.n }));
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
