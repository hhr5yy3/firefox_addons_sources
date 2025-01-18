// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".icon[data-v-1116143c] {\n  filter: invert(100%);\n  display: inline-block;\n}\n.example-row[data-v-1116143c] {\n  display: flex;\n  align-items: center;\n  margin: 0.5rem 0;\n}\n.setting[data-v-1116143c] {\n  display: flex;\n  align-items: center;\n  margin: 1.5rem 0;\n}\n.setting__toggle[data-v-1116143c] {\n  margin-right: 1rem;\n}\n.msg[data-v-1116143c] {\n  font-weight: 600;\n  color: hsl(var(--clr-alert));\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}