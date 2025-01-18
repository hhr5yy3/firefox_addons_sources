let onchange = (()=>{
  'use strict';
  let onchange = document.createEvent('HTMLEvents');
   onchange.initEvent('change', false, true);
   return onchange;
})(),
replaceSelect = function (el) {
  'use strict';
  let replacementSelector = document.createElement('div'),
      left = document.createElement('span'),
      right = document.createElement('span'),
      value = document.createElement('span'),
      options = [],
      setOptions = () => {
        options = [];
        for(let option of el.querySelectorAll('option')) {
          if (window.getComputedStyle(option).display !== 'none') {
            options.push({key: option.value, value:option.innerText});
          }
        }
      },
      indexOfKey = (key) => {
        for (let i = 0, n = options.length; i < n; ++i) {
          if (options[i].key === key) {
            return i;
          }
        }
        return -1;
      },
      updateValue = () => {
        setOptions();
        setValue(indexOfKey(el.value));
      },
      setValue = (optionIndex) => {
        value.innerText = (options[optionIndex] || {}).value || '';
        el.value = (options[optionIndex] || {}).key || null;
      },
      currentKey = () => {
        return indexOfKey(el.value);
      },
      isDisabled = () => {
        return el.disabled;
      },
      previous = () => {
        setOptions();
        if (isDisabled()) {
          return;
        }
        let previousIndex = (currentKey()) - 1;
        if (previousIndex < 0) {
          previousIndex = options.length -1;
        }
        setValue(previousIndex);
        el.dispatchEvent(onchange);
      },
      next = () => {
        setOptions();
        if (isDisabled()) {
          return;
        }
        let nextIndex = (currentKey()) + 1;
        if (nextIndex >= options.length) {
          nextIndex = 0;
        }
        setValue(nextIndex);
        el.dispatchEvent(onchange);
      };

  addClassName(replacementSelector, 'replacement-selector');
  addClassName(left, 'left');
  addClassName(value, 'value');
  addClassName(right, 'right');

  replacementSelector.appendChild(left);
  replacementSelector.appendChild(value);
  replacementSelector.appendChild(right);
  el.addEventListener('change', updateValue);
  updateValue();
  left.addEventListener('click', previous);
  right.addEventListener('click', next);
  el.parentNode.insertBefore(replacementSelector, el.nextSibling);
  el.style.display = 'none';
  el.updateReplacement = updateValue;
  return replacementSelector;
},
updateSelect = (select, value) => {
  'use strict';
  if (select.value !== value) {
    select.value = value;
    select.updateReplacement();
  }
};
