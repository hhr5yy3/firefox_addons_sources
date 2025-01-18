// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".title[data-v-c2084b86] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.inputs[data-v-c2084b86] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.8rem;\n  max-width: 90%;\n}\n.info[data-v-c2084b86] {\n  margin-top: 0.8rem;\n  width: 70%;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}