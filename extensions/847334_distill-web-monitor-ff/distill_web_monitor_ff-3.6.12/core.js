const ID = (function(x) {
  return function() {
    return x++;
  };
})(1);

const DBG = 0;

// Generate four random hex digits.
function S4() {
  return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}

// Generate a pseudo-GUID by concatenating random hexadecimal.
function guid() {
  return (S4()+S4()+'-'+S4()+'-'+S4()+'-'+S4()+'-'+S4()+S4()+S4());
}

window.Supports = {
  tabForXFrame: true,
  tabForDynamic: true,
};

