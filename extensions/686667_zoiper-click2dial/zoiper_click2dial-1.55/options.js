'use strict';

const displayLogoCheckbox = document.getElementById('display-logo');
const displayRegionFlagCheckbox = document.getElementById('display-region-flag');
const defaultRegionSelect = document.getElementById('default-region');
const matchPatternInput = document.getElementById('match-pattern');

function changeDisplayLogo(ev) {
  chrome.storage.local.set({displayLogo: ev.target.checked});
}

function changeDisplayRegionFlag(ev) {
  chrome.storage.local.set({displayRegionFlag: ev.target.checked});
}

function changeDefaultCountry() {
  const defaultRegionIndex = defaultRegionSelect.selectedIndex;
  const defaultRegion = defaultRegionSelect.options[defaultRegionIndex].value;
  chrome.storage.local.set({defaultRegion});
}

function displayErrorMessage(message) {
  const errorMessageElement = document.getElementById('error-message');

  errorMessageElement.style.display = 'block';
  errorMessageElement.textContent = message;
  setTimeout(() => {
    errorMessageElement.style.display = null;
    errorMessageElement.textContent = '';
  }, 2000);
}

function displayException(matchPattern) {
  const exceptionContainer = document.querySelector('#exceptions > ul');
  const exceptionItem = document.createElement('li');
  const exceptionMatchPattern = document.createElement('p');
  const removeExceptionButton = document.createElement('div');
  const removeExceptionButtonCross = document.createElement('div');

  exceptionMatchPattern.textContent = matchPattern;
  removeExceptionButton.setAttribute('class', 'delete');

  removeExceptionButton.append(removeExceptionButtonCross);
  exceptionItem.append(exceptionMatchPattern);
  exceptionItem.append(removeExceptionButton);
  exceptionContainer.prepend(exceptionItem);

  removeExceptionButton.addEventListener('click', () => {
    getOptions(({exceptions}) => {
      exceptionItem.remove();
      chrome.storage.local.set({
        exceptions: exceptions.filter(exception => exception !== matchPattern)
      });
    });
  });
}

document.querySelector('.btn-add-exception').addEventListener('click', () => {
  const matchPattern = matchPatternInput.value;

  if (isValidMatchPattern(matchPattern)) {
    getOptions(({exceptions}) => {
      if (!exceptions.includes(matchPattern)) {
        displayException(matchPattern);
        exceptions.unshift(matchPattern);
        chrome.storage.local.set({exceptions});
      } else {
        displayErrorMessage('This match pattern already exists');
      }
    });
  } else {
    displayErrorMessage('Invalid match pattern, please try again');
  }

  matchPatternInput.value = '';
});

getOptions((options) => {
  const {exceptions, defaultRegion, displayLogo, displayRegionFlag} = options;

  fetch(chrome.runtime.getURL('country-list.json'))
    .then((resp) => resp.json())
    .then((countryList) => {
      const country = defaultRegion || navigator.language.substr(-2).toUpperCase();
      for (let i = 0; i < countryList.length; i++) {
        const option = document.createElement('option');
        option.text = countryList[i].name;
        option.value = countryList[i].code;
        defaultRegionSelect.add(option);

        if (countryList[i].code === country) {
          defaultRegionSelect.options.selectedIndex = i;
        }
      }
    });

  displayLogoCheckbox.checked = displayLogo;
  displayRegionFlagCheckbox.checked = displayRegionFlag;

  for (let i = exceptions.length - 1; i >= 0; i--) {
    displayException(exceptions[i]);
  }

  displayLogoCheckbox.addEventListener('change', changeDisplayLogo);
  displayRegionFlagCheckbox.addEventListener('change', changeDisplayRegionFlag);
  defaultRegionSelect.addEventListener('change', changeDefaultCountry);
});
