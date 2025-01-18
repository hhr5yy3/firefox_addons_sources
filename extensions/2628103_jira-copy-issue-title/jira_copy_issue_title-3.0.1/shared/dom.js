class DOM {
  static insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }

  static fromHtml(html) {
    const container = document.createElement("div");
    container.innerHTML = html.trim();
    return container.firstChild;
  }

  static injectScript(file, elementName) {
    const node = document.getElementsByTagName(elementName)[0];
    const script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", file);
    node.appendChild(script);
  }

  static typeInTextarea(newText, el = document.activeElement) {
    const [start, end] = [el.selectionStart, el.selectionEnd];
    el.setRangeText(newText, start, end, "select");
    el.focus();
    el.selectionStart = el.selectionStart + newText.length;
  }
}
