// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".rocket-select[data-v-7db3e458] {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  min-width: max-content;\n  width: 125px;\n}\n.rocket-select__selector[data-v-7db3e458] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  transition: all 200ms ease-out;\n  height: 4rem;\n  width: 4rem;\n  padding: 0.3rem;\n  border: 2px solid hsl(var(--clr-primary));\n  border-radius: 100%;\n  transform: translateY(var(--pos));\n}\n.rocket-select__rockets[data-v-7db3e458] {\n  padding-left: 0.8rem;\n  padding-top: 0.2rem;\n  user-select: none;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\n.rocket-select__rocket[data-v-7db3e458] {\n  display: flex;\n  align-items: center;\n  height: 4rem;\n  padding-right: 0.2rem;\n}\n.rocket-select__image[data-v-7db3e458] {\n  margin-right: 0.8rem;\n  height: 2.5rem;\n  cursor: pointer;\n  transition: transform 200ms ease;\n}\n.rocket-select__image[data-v-7db3e458]:hover:not(.rocket-select__image--beforeUnlocked) {\n  transform: scale(1.15);\n}\n.rocket-select__image--beforeUnlocked[data-v-7db3e458] {\n  filter: grayscale(1);\n}\n.rocket-select__image--invert[data-v-7db3e458] {\n  filter: invert(1);\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}