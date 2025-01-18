const $id = id => document.getElementById(id);
const $className = className => document.getElementsByClassName(className);
const $create = elem => document.createElement(elem);
const $append = (parentElem, childElem) => parentElem.appendChild(childElem);
const $addToClassList = (elem, ...classNames) =>
  elem.classList.add(...classNames);
const $removeFromClassList = (elem, ...classNames) =>
  elem.classList.remove(...classNames);
