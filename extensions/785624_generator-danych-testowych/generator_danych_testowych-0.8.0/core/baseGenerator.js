function generateRandomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomNumber(length) {
  var randomNumber = "";
  for (var i = 0; i < length; i++) {
    randomNumber += Math.floor(Math.random() * 10).toString();
  }
  return randomNumber;
}

function generateRandomString(length) {
  var randomString = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for (var i = 0; i < length; i++)
    randomString += possible.charAt(Math.floor(Math.random() * possible.length));

  return randomString;
}

function generateRandomNumberString(length) {
  var randomString = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";

  for (var i = 0; i < length; i++)
    randomString += possible.charAt(Math.floor(Math.random() * possible.length));

  return randomString;
}

function generateRandomHexadecimal(length) {
  var randomString = "";
  var possible = "ABCDEF1234567890";

  for (var i = 0; i < length; i++)
    randomString += possible.charAt(Math.floor(Math.random() * possible.length));

  return randomString;
}