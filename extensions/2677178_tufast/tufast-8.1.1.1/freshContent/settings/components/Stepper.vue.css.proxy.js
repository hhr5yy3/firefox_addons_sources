// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".stepper {\n  display: flex;\n  min-height: 0.5rem;\n  height: 0.5rem;\n  gap: 0.5rem;\n}\n.stepper__step {\n  list-style: none;\n  border-radius: 0.6rem;\n  background-color: hsl(var(--clr-white), 0.4);\n  flex: 1 0 auto;\n  transition: all 500ms ease;\n}\n.stepper__step--current {\n  flex: 2 0 auto;\n  background-color: hsl(var(--clr-white), 0.8);\n}\n.light .stepper__step {\n  background-color: hsl(var(--clr-black), 0.4);\n}\n.light .stepper__step--current {\n  background-color: hsl(var(--clr-black), 0.8);\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}