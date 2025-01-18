// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".container[data-v-7bf8d2cf] {\n  display: flex;\n  align-items: start;\n  gap: 0.2rem;\n  height: 50px;\n  font-size: 1.4rem;\n}\n.tab[data-v-7bf8d2cf] {\n  border: none;\n  background-color: hsl(var(--clr-secondary), 0.8);\n  color: white;\n  cursor: pointer;\n  border-bottom: 1px solid hsl(var(--clr-secondary), 0.5);\n  opacity: 0.6;\n}\n.tab[data-v-7bf8d2cf]:hover {\n  opacity: 0.8;\n  background-color: hsl(var(--clr-primary), 0.1);\n}\n.tab--selected[data-v-7bf8d2cf] {\n  border-bottom: 2px solid hsl(var(--clr-primary));\n  opacity: 1;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}