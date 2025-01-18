// Select the input and output textareas
const input = document.querySelector('#input');
const output = document.querySelector('#output');

// Select the buttons
const lowercaseBtn = document.querySelector('#lowercase');
const uppercaseBtn = document.querySelector('#uppercase');
const capitalizeBtn = document.querySelector('#capitalize');
const sentencecaseBtn = document.querySelector('#sentencecase');
const copyBtn = document.querySelector('#copyBtn');

// Add event listeners to the buttons
lowercaseBtn.addEventListener('click', convertToLowercase);
uppercaseBtn.addEventListener('click', convertToUppercase);
capitalizeBtn.addEventListener('click', convertToCapitalizedCase);
sentencecaseBtn.addEventListener('click', convertToSentenceCase);
copyBtn.addEventListener('click', copyToClipboard);

// Convert input text to lower case
function convertToLowercase() {
  output.value = input.value.toLowerCase();
}

// Convert input text to upper case
function convertToUppercase() {
  output.value = input.value.toUpperCase();
}

// Convert input text to capitalized case
function convertToCapitalizedCase() {
  output.value = input.value.toLowerCase().replace(/(^|\s)\S/g, (letter) => letter.toUpperCase());
}

// Convert input text to sentence case
function convertToSentenceCase() {
  output.value = input.value.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (letter) => letter.toUpperCase());
}

// Copy output text to clipboard
function copyToClipboard() {
  const copyText = output.value;
  const tempInput = document.createElement('textarea');
  tempInput.value = copyText;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);
}
