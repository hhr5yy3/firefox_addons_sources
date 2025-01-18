function generateLoremIpsum(length) {
  const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla bibendum massa diam, et laoreet tortor fermentum at. Nullam dignissim tincidunt ligula quis scelerisque. Donec sollicitudin venenatis libero et fringilla. Morbi ut ante vitae risus ullamcorper luctus. Sed vel nisi eu tellus vestibulum tristique. Maecenas non tellus at nibh suscipit auctor vel vel risus. Suspendisse ultricies consectetur sapien sit amet lacinia. In vestibulum aliquet dolor, a lacinia mauris malesuada eu.';

  const words = loremIpsum.split(' ');

  let result = '';
  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * words.length);
    result += words[index] + ' ';
  }
  return result;
}

document.addEventListener('DOMContentLoaded', function() {
  const lengthSlider = document.getElementById('length');
  const lengthValue = document.getElementById('length-value');
  lengthSlider.addEventListener('input', function() {
    lengthValue.innerHTML = lengthSlider.value;
  });

  document.getElementById('generate').addEventListener('click', function() {
    const length = parseInt(lengthSlider.value);
    const result = generateLoremIpsum(length);
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = result;
    navigator.clipboard.writeText(result).then(function() {
      console.log('Generated Lorem Ipsum text has been copied to clipboard');
    }, function() {
      console.error('Failed to copy generated Lorem Ipsum text to clipboard');
    });
  });
});

