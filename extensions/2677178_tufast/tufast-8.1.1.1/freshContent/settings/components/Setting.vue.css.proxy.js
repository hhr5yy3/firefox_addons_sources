// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".setting[data-v-45a0b3d0] {\n  display: flex;\n  align-items: center;\n  gap: 1.5rem;\n}\n.setting__toggle[data-v-45a0b3d0] {\n  margin-right: 1rem;\n}\n.setting--column[data-v-45a0b3d0] {\n  flex-direction: column;\n  font-size: 1.4rem;\n}\n.setting--column .setting__toggle[data-v-45a0b3d0] {\n  margin-right: 0;\n  width: 80px;\n  height: 80px;\n}\n.setting--column span[data-v-45a0b3d0] {\n  text-align: center;\n}\n.light .setting--column .setting__toggle[data-v-45a0b3d0] {\n  background-color: hsl(var(--clr-black));\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}