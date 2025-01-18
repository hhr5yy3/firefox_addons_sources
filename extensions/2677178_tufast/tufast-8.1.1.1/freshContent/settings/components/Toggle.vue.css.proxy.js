// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".toggle[data-v-3797b0bc] {\n  position: relative;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background-color: hsl(var(--clr-white));\n  width: 40px;\n  height: 40px;\n  border-radius: 100%;\n  cursor: pointer;\n}\n.toggle[data-v-3797b0bc]::before {\n  position: absolute;\n  transform: translate(50%);\n  content: \"\";\n  width: 5%;\n  height: 5%;\n  opacity: 0;\n  border-radius: 100%;\n  transition: transform 200ms ease, opacity 200ms ease;\n  transform-origin: center;\n  background-color: hsl(var(--clr-primary), 0.8);\n}\n.toggle[data-v-3797b0bc]:hover:not(.toggle--toggled)::before {\n  opacity: 1;\n  transform: scale(1000%);\n}\n.toggle--toggled[data-v-3797b0bc] {\n  background-color: hsl(var(--clr-primary)) !important;\n}\n.toggle--toggled[data-v-3797b0bc]:hover {\n  background-color: hsl(var(--clr-primary), 0.8);\n}\n.toggle--disabled[data-v-3797b0bc] {\n  background-color: hsl(var(--clr-white), 0.5);\n  cursor: not-allowed !important;\n}\n.toggle--disabled[data-v-3797b0bc]:hover::before {\n  opacity: 0 !important;\n  transform: none !important;\n}\n.toggle__icon[data-v-3797b0bc] {\n  width: 80%;\n  height: 80%;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}