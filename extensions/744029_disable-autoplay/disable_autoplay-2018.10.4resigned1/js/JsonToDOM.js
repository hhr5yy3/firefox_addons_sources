/* eslint-disable-next-line no-unused-vars */
class JsonToDOM {
  static parse(json) {
    if (!Array.isArray(json)) {
      return document.createTextNode(json);
    }
    return JsonToDOM.hasSingleRootElement(json)
      ? JsonToDOM.createSingleElement(json)
      : JsonToDOM.createMultipleElements(json);
  }

  static hasSingleRootElement([tagName, attributes]) {
    return typeof tagName === 'string' && attributes && attributes.constructor === Object;
  }

  static createMultipleElements(data) {
    const dom = document.createDocumentFragment();
    data.forEach(item => item && dom.appendChild(JsonToDOM.parse(item)));
    return dom;
  }

  static createSingleElement([tagName, attributes, children]) {
    const element = document.createElement(tagName);
    Object.keys(attributes).forEach((key) => {
      if (typeof attributes[key] === 'function') {
        element.addEventListener(key.replace(/^on/, ''), attributes[key], false);
      } else if (attributes[key] !== false) {
        element.setAttribute(key, attributes[key]);
      }
    });
    if (children !== undefined) {
      element.appendChild(JsonToDOM.parse(children));
    }
    return element;
  }
}
