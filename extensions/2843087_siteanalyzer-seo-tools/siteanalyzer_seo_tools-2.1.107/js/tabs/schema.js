const noSchemasData = () =>
  `<span data-translation="noneData" class="no-data">${translate(
    "noneData"
  )}</span>`;

function createListFromJson(json, child = false) {
  const ul = document.createElement("ul");
  ul.classList.add("schema__ul");
  ul.classList.toggle("schema__ul--child", child);

  for (const key in json) {
    if (json.hasOwnProperty(key)) {
      const li = document.createElement("li");
      li.classList.add("schema__li");
      const value = json[key];

      if (typeof value === "object" && !Array.isArray(value)) {
        li.classList.add("schema__li--parent");
        li.innerHTML = `<span class="schema__key schema__key--disabled">${key}</span>`;
        li.appendChild(createListFromJson(value, true));
      } else if (Array.isArray(value)) {
        li.classList.add("schema__li--parent");
        li.innerHTML = `<span class="schema__key schema__key--disabled">${key}</span>`;
        const nestedUl = document.createElement("ul");
        nestedUl.classList.add("schema__ul");
        nestedUl.classList.add("schema__ul--child");

        value.forEach((item) => {
          const nestedLi = document.createElement("li");
          nestedLi.classList.add("schema__li");

          if (typeof item === "object") {
            nestedLi.appendChild(createListFromJson(item, true));
          } else {
            nestedLi.innerHTML = `<span></span><span class="schema__value">${item}</span>`;
          }
          nestedUl.appendChild(nestedLi);
        });
        li.appendChild(nestedUl);
      } else {
        li.classList.add("schema__li--lined");
        li.innerHTML = `<span class="schema__key">${key}</span><span class="schema__value">${value}</span>`;
      }
      ul.appendChild(li);
    }
  }

  return ul;
}

function renderSchema() {
  const schemaContainer = document.querySelector(".schema-container");
  schemaContainer.innerHTML = "";

  executeOnActiveTab(() => {
    /**
     * @param {HTMLElement} element
     * @returns {HTMLElement|null}
     */
    const getParentItemScope = (element) => {
      const parentElement = element.parentElement;
      if (!parentElement) return null;
      if (parentElement.hasAttribute("itemscope")) return parentElement;
      return getParentItemScope(parentElement);
    };

    /**
     * @param {HTMLElement} itemscope
     * @returns {boolean}
     */
    const isRootItemScope = (itemscope) => {
      return !getParentItemScope(itemscope);
    };

    /**
     * @param {HTMLElement} itemscope
     */
    const parseItemscope = (itemscope) => {
      const data = {};

      data["@type"] = itemscope
        .getAttribute("itemtype")
        .replace("https://schema.org/", "");

      Array.from(itemscope.querySelectorAll("[itemprop]"))
        .filter((itemprop) => getParentItemScope(itemprop) === itemscope)
        .forEach(
          /**
           * @param {HTMLElement} itemprop
           */
          (itemprop) => {
            const propName = itemprop.getAttribute("itemprop");

            let propValue = null;
            if (itemprop.hasAttribute("itemscope")) {
              propValue = parseItemscope(itemprop);
            } else if (itemprop.tagName === "META") {
              propValue = itemprop.getAttribute("content");
            } else {
              propValue = itemprop.innerText;
            }

            if (data[propName] && Array.isArray(data[propName])) {
              data[propName].push(propValue);
            } else if (data[propName]) {
              data[propName] = [data[propName], propValue];
            } else {
              data[propName] = propValue;
            }
          }
        );

      return data;
    };

    const microdataTree = [];

    /** @type {HTMLElement[]} */
    const itemscopes = Array.from(document.querySelectorAll("[itemscope]"));
    const rootItemScopes = itemscopes.filter(isRootItemScope);

    rootItemScopes.forEach((itemscope) => {
      microdataTree.push(parseItemscope(itemscope));
    });

    const schemas = [...microdataTree];

    /** @type {HTMLScriptElement[]} */
    const jsonSchemas = document.querySelectorAll(
      'script[type="application/ld+json"]'
    );

    jsonSchemas.forEach((jsonSchema) => {
      const inner = JSON.parse(jsonSchema.innerText);
      if (Array.isArray(inner)) {
        schemas.push(...inner);
      } else {
        schemas.push(inner);
      }
    });

    return JSON.stringify(schemas);
  }).then((json) => {
    const data = JSON.parse(json);

    data?.forEach((schema) => {
      const accordion = document.createElement("div");
      accordion.innerHTML = document.querySelector(
        'template[id="schema-accordion"]'
      ).innerHTML;

      const title = schema["@type"]
        ? schema["@type"]
        : Array.from(schema["@graph"])
            .map((graph) => graph["@type"])
            .join(", ");
      accordion.querySelector(".accordion__title").innerHTML = title;
      accordion
        .querySelector(".accordion__content")
        .append(createListFromJson(schema));

      schemaContainer.append(accordion);
    });

    if (!data.length) {
      schemaContainer.innerHTML = noSchemasData();
    }

    document.dispatchEvent(new CustomEvent("AccordionsUpdate"));
  });
}

document.addEventListener("SchemaTabOpen", () => {
  renderSchema();
});
