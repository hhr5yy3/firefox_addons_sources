// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".form[data-v-ca5ac980] {\n  width: 300px;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  gap: 1rem;\n  margin-left: 1rem;\n}\n.important[data-v-ca5ac980] {\n  font-weight: 600;\n  font-size: 1.1em;\n}\n.state[data-v-ca5ac980] {\n  font-weight: 600;\n}\n.state--active[data-v-ca5ac980] {\n  color: hsl(var(--clr-primary));\n}\n.state--inactive[data-v-ca5ac980] {\n  color: hsl(var(--clr-alert));\n}\n.tabs[data-v-ca5ac980] {\n  display: flex;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}