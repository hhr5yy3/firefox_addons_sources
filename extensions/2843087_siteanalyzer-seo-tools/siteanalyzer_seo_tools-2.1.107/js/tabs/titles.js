async function renderTitles(filter) {
  const container = document.querySelector(".headers_container");
  container.innerHTML = "";

  executeOnActiveTab(() => {
    const titles = Array.from(
      document.querySelectorAll("h1, h2, h3, h4, h5, h6")
    ).map((item) => item.cloneNode(true));

    return titles.map((title) => {
      return {
        tag: title.tagName,
        content: title.textContent,
      };
    });
  }).then((titles) => {
    let filteredTitles = [];

    const doubleTitles = titles.filter(title => {
      return titles.filter(t => t.content === title.content).length > 1;
    });

    switch (filter) {
      case "doubles":
        filteredTitles = doubleTitles;
        break;
      default:
        filteredTitles = filter
          ? titles.filter((title) => title.tag === filter)
          : titles;
        break;
    }

    filteredTitles.forEach((title) => {
      const titleElement = document.createElement("div");
      titleElement.classList.add("headers_item", title.tag.toLocaleLowerCase());
      titleElement.innerHTML = `<span>&lt;${title.tag}&gt;</span> ${title.content}`;
      container.append(titleElement);
    });

    print(
      "h1-headers-counter",
      titles.filter((title) => title.tag === "H1").length
    );
    print(
      "h2-headers-counter",
      titles.filter((title) => title.tag === "H2").length
    );
    print(
      "h3-headers-counter",
      titles.filter((title) => title.tag === "H3").length
    );
    print(
      "h4-headers-counter",
      titles.filter((title) => title.tag === "H4").length
    );
    print(
      "h5-headers-counter",
      titles.filter((title) => title.tag === "H5").length
    );
    print(
      "h6-headers-counter",
      titles.filter((title) => title.tag === "H6").length
    );
    print("all-headers-counter", titles.length);
    print("double-titles-counter", doubleTitles.length);
  });
}

let headersHighlighted = false;
function handleHeadersHighlight() {
  /** @type {HTMLButtonElement} */
  const headersHighlightButton = document.querySelector(
    'button[name="highlightHeaders"]'
  );
  headersHighlightButton.addEventListener("click", () => {
    headersHighlighted = !headersHighlighted;
    headersHighlightButton.classList.toggle(
      "button--selected",
      headersHighlighted
    );
    api.storage.local
      .set({
        isHeadersHighlighted: headersHighlighted,
      })
      .then(() => {
        executeOnActiveTab(() => {
          document.dispatchEvent(new CustomEvent("changeHeadersHighlight"));
        });
      });
  });

  api.storage.local
    .get("isHeadersHighlighted")
    .then(({ isHeadersHighlighted }) => {
      headersHighlighted = isHeadersHighlighted || false;
      headersHighlightButton.classList.toggle(
        "button--selected",
        headersHighlighted
      );
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll("[data-filter]");
  filterButtons.forEach((button) =>
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) =>
        btn.classList.remove("headers__counter--selected")
      );
      const filter = button.getAttribute("data-filter");
      button.classList.add("headers__counter--selected");
      executeOnActiveTab(
        (tagName) => {
          document.dispatchEvent(
            new CustomEvent("changeHeadersHighlight", {
              detail: {
                tagName: tagName,
              },
            })
          );
        },
        [filter]
      );
      renderTitles(filter);
    })
  );

  handleHeadersHighlight();
  renderTitles();
});
