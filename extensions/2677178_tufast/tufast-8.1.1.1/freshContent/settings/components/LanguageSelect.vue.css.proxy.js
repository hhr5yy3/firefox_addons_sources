// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".language-select[data-v-35e767dc] {\n  position: relative;\n  display: grid;\n  grid-template-columns: min-content auto;\n  height: min-content;\n  min-width: min-content;\n  width: 125px;\n}\n.light .language-select .language-select__languages[data-v-35e767dc] {\n  color: hsl(var(--clr-black));\n}\n.language-select__selector[data-v-35e767dc] {\n  transition: all 200ms ease-out;\n  cursor: pointer;\n  color: hsl(var(--clr-primary));\n  width: 2rem;\n  height: 2rem;\n}\n.language-select__selector--german[data-v-35e767dc] {\n  transform: translateY(0);\n}\n.language-select__selector--english[data-v-35e767dc] {\n  transform: translateY(100%);\n}\n.language-select__languages[data-v-35e767dc] {\n  padding-left: 0.5rem;\n  line-height: 2rem;\n  user-select: none;\n}\n.language-select__languages--selected[data-v-35e767dc] {\n  font-weight: 600;\n  font-size: 1.2em;\n}\n.language-select__languages[data-v-35e767dc] :not(.language-select__languages--selected) {\n  cursor: pointer;\n}\n.soon[data-v-35e767dc] {\n  position: absolute;\n  left: 30%;\n  top: 15%;\n  transform: rotate(-45deg);\n  font-weight: 800;\n  color: hsl(var(--clr-white));\n  font-size: 1.5rem;\n  background-color: black;\n}\n*[disabled][data-v-35e767dc]:not(.soon) {\n  color: hsl(var(--clr-white), 0.6);\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}