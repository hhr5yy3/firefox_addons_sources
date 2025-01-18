// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".button[data-v-7fc5fd9a] {\n  border: none;\n  border-radius: 12px;\n  padding: 0.8rem 2rem;\n  background-color: hsl(var(--clr-primary));\n  color: hsl(var(--clr-white));\n  cursor: pointer;\n  transition: all 150ms ease;\n  font-size: 1.2em;\n  font-weight: 600;\n}\n@media (prefers-color-scheme: light) {\n.button[data-v-7fc5fd9a] {\n    color: hsl(var(--clr-grey));\n}\n.button[data-v-7fc5fd9a]:hover, .button[data-v-7fc5fd9a]:active {\n    outline-color: hsl(var(--clr-grey)) !important;\n}\n}\n.button[data-v-7fc5fd9a]:hover {\n  outline: 1px solid hsl(var(--clr-white));\n  outline-offset: 0.5rem;\n}\n.button[data-v-7fc5fd9a]:active {\n  transform: scale(0.95);\n  outline-offset: 0.25rem;\n}\n.button[data-v-7fc5fd9a]:disabled {\n  background-color: hsl(var(--clr-primary), 0.5);\n  cursor: not-allowed;\n}\n.button[data-v-7fc5fd9a]:disabled:hover {\n  outline: none;\n}\n.button--secondary[data-v-7fc5fd9a] {\n  background-color: hsl(var(--clr-grey), 0.8);\n}\n.button--secondary[data-v-7fc5fd9a]:hover {\n  outline: none;\n}\n.button--secondary[data-v-7fc5fd9a]:disabled {\n  background-color: hsl(var(--clr-grey), 0.6);\n}\n.button--warn[data-v-7fc5fd9a] {\n  background-color: hsl(var(--clr-alert), 0.8);\n}\n.button--warn[data-v-7fc5fd9a]:hover {\n  outline: none;\n  background-color: hsl(var(--clr-alert), 1);\n}\n.button--warn[data-v-7fc5fd9a]:disabled {\n  background-color: hsl(var(--clr-alert), 0.4);\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}