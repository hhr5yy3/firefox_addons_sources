// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".link[data-v-81618e34] {\n  text-decoration: none;\n  color: hsl(var(--clr-primary));\n}\n.heading[data-v-81618e34] {\n  font-weight: 600;\n  margin-bottom: 0.3rem;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}