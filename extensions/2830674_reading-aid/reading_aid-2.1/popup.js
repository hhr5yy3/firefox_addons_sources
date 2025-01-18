// popup.js

document.addEventListener('DOMContentLoaded', function () {
  const enableBackgroundCheckbox = document.getElementById('enableBackground');
  const enableFontCheckbox = document.getElementById('enableFont');
  const enableCursorCheckbox = document.getElementById('enableCursor');
  const enableLineSpacingCheckbox = document.getElementById('enableLineSpacing');
  const enableWordSpacingCheckbox = document.getElementById('enableWordSpacing');

  // Retrieve and set initial options
  chrome.runtime.sendMessage({ action: 'getOptions' }, function (response) {
    const options = response || {};
    enableBackgroundCheckbox.checked = options.enableBackground || false;
    enableFontCheckbox.checked = options.enableFont || false;
    enableCursorCheckbox.checked = options.enableCursor || false;
    enableLineSpacingCheckbox.checked = options.enableLineSpacing || false;
    enableWordSpacingCheckbox.checked = options.enableWordSpacing || false;
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

  enableLineSpacingCheckbox.addEventListener('change', function () {
    const isChecked = this.checked;
    updateOptions({ enableLineSpacing: isChecked });
  });

  enableWordSpacingCheckbox.addEventListener('change', function () {
    const isChecked = this.checked;
    updateOptions({ enableWordSpacing: isChecked });
  });

  // Function to update options
  function updateOptions(options) {
    chrome.runtime.sendMessage({ action: 'updateOptions', options: options });
  }
});

