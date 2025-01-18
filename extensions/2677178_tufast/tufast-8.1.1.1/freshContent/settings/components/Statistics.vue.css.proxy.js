// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".txt-bold[data-v-4fa53f0b] {\n  font-weight: 600;\n}\n.statistics__clicks[data-v-4fa53f0b] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n}\n.statistics__minutes[data-v-4fa53f0b] {\n  display: flex;\n  justify-content: space-between;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}