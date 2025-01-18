// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".info[data-v-665fc7c2] {\n  margin-top: 0.8rem;\n  width: 70%;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}