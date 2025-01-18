// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".shortcuts[data-v-342ebfb3] {\n  line-height: 1.75;\n  margin-left: 1rem;\n  color: hsl(var(--clr-white), 0.7);\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}