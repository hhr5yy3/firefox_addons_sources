// options.js

document.addEventListener('DOMContentLoaded', function () {
  const enableBackgroundCheckbox = document.getElementById('enableBackground');
  const enableFontCheckbox = document.getElementById('enableFont');
  const enableCursorCheckbox = document.getElementById('enableCursor');

  // Retrieve and set initial options
  chrome.runtime.sendMessage({ action: 'getOptions' }, function (response) {
    const options = response || {};
    enableBackgroundCheckbox.checked = options.enableBackground || false;
    enableFontCheckbox.checked = options.enableFont || false;
    enableCursorCheckbox.checked = options.enableCursor || false;
  });

  // Handle checkbox changes and update options
  enableBackgroundCheckbox.addEventListener('change', function () {
    const isChecked = this.checked;
    updateOptions({ enableBackground: isChecked });
  });

  enableFontCheckbox.addEventListener('change', function () {
    const isChecked = this.checked;
    updateOptions({ enableFont: isChecked });
  });

  enableCursorCheckbox.addEventListener('change', function () {
    const isChecked = this.checked;
    updateOptions({ enableCursor: isChecked });
  });

  // Remove color picker event listener
  // const cursorColorInput = document.getElementById('cursorColor');
  // cursorColorInput.addEventListener('input', function () {
  //   const color = this.value;
  //   updateOptions({ cursorColor: color });
  // });

  // Function to update options
  function updateOptions(options) {
    chrome.runtime.sendMessage({ action: 'updateOptions', options: options });
  }
});

