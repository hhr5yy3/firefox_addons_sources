// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".search-terms[data-v-5313a16f] {\n  line-height: 1.75;\n  margin-left: 1rem;\n  color: hsl(var(--clr-white), 0.7);\n}\n@media (prefers-color-scheme: light) {\n.search-terms[data-v-5313a16f] {\n    color: hsl(var(--clr-grey), 0.9);\n}\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}