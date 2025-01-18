let controlsKey = {
  'player1': {
    'buttonA': 'Space', 
    'buttonB': 'KeyN', 
    'buttonStart': 'Enter', 
    'buttonSelect': 'Tab', 
    'buttonLeft': 'ArrowLeft', 
    'buttonRight': 'ArrowRight', 
    'buttonDown': 'ArrowDown', 
    'buttonUp': 'ArrowUp'
  },
  'player2': {
    'buttonA': 'ShiftLeft', 
    'buttonB': 'ControlLeft', 
    'buttonStart': 'Enter', 
    'buttonSelect': 'Tab', 
    'buttonLeft': 'KeyA', 
    'buttonRight': 'KeyD', 
    'buttonDown': 'KeyS', 
    'buttonUp': 'KeyW'
  }
};

function changeKey(playerId, buttonId, code) {
  if (!isExist(code)) {
    controlsKey[playerId][buttonId] = code;
    document.querySelectorAll(`#${playerId} #${buttonId}`)[0].textContent = code;
  } else {
    var error = document.querySelectorAll(`#${playerId} #${buttonId}`)[0].parentNode;
    error = error.querySelectorAll('td')[2];
    error.textContent = `${code} exist`;
    setTimeout(() => {
      error.textContent = '';
    }, 1000);
  }
}

function isExist(code) {
  for (let playerId in controlsKey) {
    for (let buttonId in controlsKey[playerId]) {
      if (controlsKey[playerId][buttonId] === code)
        return true;
    }
  }
  return false;
}

function setDefaultOptions() {
  controlsKey = {
    'player1': {
      'buttonA': 'Space', 
      'buttonB': 'KeyN', 
      'buttonStart': 'Enter', 
      'buttonSelect': 'Tab', 
      'buttonLeft': 'ArrowLeft', 
      'buttonRight': 'ArrowRight', 
      'buttonDown': 'ArrowDown', 
      'buttonUp': 'ArrowUp'
    },
    'player2': {
      'buttonA': 'ShiftLeft', 
      'buttonB': 'ControlLeft', 
      'buttonStart': 'Enter', 
      'buttonSelect': 'Tab', 
      'buttonLeft': 'KeyA', 
      'buttonRight': 'KeyD', 
      'buttonDown': 'KeyS', 
      'buttonUp': 'KeyW'
    }
  };
  for (let playerId in controlsKey) {
    for (let buttonId in controlsKey[playerId]) {
      document.querySelectorAll(`#${playerId} #${buttonId}`)[0].textContent = controlsKey[playerId][buttonId];
    }
  }
}

function saveOptions() {
  chrome.storage.sync.set({
    controls: controlsKey
  }, function() {
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(() => {
      status.textContent = '';
    }, 750);
  });
}

function restoreOptions() {
  chrome.storage.sync.get({
    controls: controlsKey
  }, function(items) {
    controlsKey = items.controls;
    for (let playerId in items.controls) {
      for (let buttonId in items.controls[playerId]) {
        document.querySelectorAll(`#${playerId} #${buttonId}`)[0].textContent = items.controls[playerId][buttonId];
        document.querySelectorAll(`#${playerId} #${buttonId}`)[0].addEventListener('keydown', (event) => {
          changeKey(playerId, buttonId, event.code);
        });
      }
    }
  });
}
document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('reset').addEventListener('click', setDefaultOptions);