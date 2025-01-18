// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".link[data-v-6a5c533c] {\n  display: flex;\n  align-items: center;\n  color: hsl(var(--clr-primary));\n  font-weight: 600;\n  user-select: none;\n  cursor: pointer;\n  width: max-content;\n  text-decoration: none;\n}\n.link__arrow[data-v-6a5c533c] {\n  width: 28px;\n  height: 28px;\n  margin-left: 0.25rem;\n  transition: all 250ms ease;\n}\n.link:hover .link__text[data-v-6a5c533c] {\n  border-bottom: 1px solid;\n  border-color: currentColor;\n}\n.link:hover .link__arrow[data-v-6a5c533c] {\n  margin-left: 0.5rem;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}