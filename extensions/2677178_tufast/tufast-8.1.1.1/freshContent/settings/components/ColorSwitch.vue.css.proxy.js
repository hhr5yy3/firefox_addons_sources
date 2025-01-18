// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".color-switch[data-v-dc52de82] {\n  width: 40%;\n  cursor: pointer;\n  display: flex;\n  position: relative;\n  flex-direction: column;\n  justify-content: center;\n  align-items: space-between;\n}\n.color-switch__text[data-v-dc52de82] {\n  z-index: -1;\n  color: currentColor;\n  text-align: center;\n  transform: translateY(0%);\n  opacity: 0;\n  transition: transform 225ms ease, opacity 250ms ease;\n  position: absolute;\n  user-select: none;\n}\n.color-switch:hover .color-switch__text[data-v-dc52de82] {\n  transform: translateY(40%);\n  opacity: 1;\n}\n.light .color-switch:hover .color-switch__text[data-v-dc52de82] {\n  transform: translateY(75%);\n}\npath[data-v-dc52de82] {\n  fill: transparent;\n}\ntext[data-v-dc52de82] {\n  fill: hsl(var(--clr-primary));\n  font-size: 70px;\n  font-weight: 700;\n  letter-spacing: 6px;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}