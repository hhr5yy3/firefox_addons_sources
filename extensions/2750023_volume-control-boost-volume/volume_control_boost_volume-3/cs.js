var tc = {
  settings: {
    logLevel: 0,
    defaultLogLevel: 4,
  },
  vars: {
    dB: 0,
    mono: false,
    audioCtx: new (window.AudioContext || window.webkitAudioContext)(),
    gainNode: undefined,
  },
};

const logTypes = ["ERROR", "WARNING", "INFO", "DEBUG"];

function log(message, level = tc.settings.defaultLogLevel) {
  if (tc.settings.logLevel >= level) {
    console.log(`${logTypes[level - 2]}: ${message}`);
  }
}

function connectOutput(element) {
  log("Begin connectOutput", 5);
  log(`Element found ${element.toString()}`, 5);
  tc.vars.audioCtx.createMediaElementSource(element).connect(tc.vars.gainNode);
  tc.vars.gainNode.connect(tc.vars.audioCtx.destination);
  log("End connectOutput", 5);
}

function setVolume(dB) {
  tc.vars.gainNode.gain.value = Math.pow(10, dB / 20);
}

function enableMono() {
  tc.vars.mono = true;
  tc.vars.gainNode.channelCountMode = "explicit";
  tc.vars.gainNode.channelCount = 1;
}

function disableMono() {
  tc.vars.mono = false;
  tc.vars.gainNode.channelCountMode = "max";
  tc.vars.gainNode.channelCount = 2;
}

function init(document) {
  log("Begin init", 5);
  if (!document.body || document.body.classList.contains("volumecontrol-initialized")) {
    log("Already initialized", 5);
    return;
  }
  if (!tc.vars.audioCtx) {
    tc.vars.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  tc.vars.gainNode = tc.vars.audioCtx.createGain();
  tc.vars.gainNode.channelInterpretation = "speakers";
  document.querySelectorAll("audio, video").forEach(connectOutput);
  document.arrive("audio, video", function (newElem) {
    connectOutput(newElem);
  });

  document.addEventListener("click", function () {
    if (tc.vars.audioCtx.state === "suspended") {
      tc.vars.audioCtx.resume();
    }
  });

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch (message.command) {
      case "setVolume":
        tc.vars.dB = message.dB;
        setVolume(message.dB);
        break;
      case "getVolume":
        sendResponse({ response: tc.vars.dB });
        break;
      case "setMono":
        if (message.mono) {
          enableMono();
        } else {
          disableMono();
        }
        break;
      case "getMono":
        sendResponse({ response: tc.vars.mono });
        break;
    }
  });
  document.body.classList.add("volumecontrol-initialized");
  log("End init", 5);
}

function initWhenReady(document) {
  log("Begin initWhenReady", 5);
  window.onload = () => {
    if (!tc.vars.audioCtx) {
      tc.vars.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    init(window.document);
  };
  if (document) {
    if (document.readyState === "complete") {
      if (!tc.vars.audioCtx) {
        tc.vars.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      init(document);
    } else {
      document.onreadystatechange = () => {
        if (document.readyState === "complete") {
          if (!tc.vars.audioCtx) {
            tc.vars.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
          }
          init(document);
        }
      };
    }
  }
  log("End initWhenReady", 5);
}

function checkExclusion() {
  browser.storage.local.get({ fqdns: [] }).then(data => {
      const currentFqdn = new URL(window.location.href).hostname;
      const normalizedFqdn = currentFqdn.startsWith("www.") ? currentFqdn : "www." + currentFqdn;
      if (data.fqdns.includes(normalizedFqdn)) {
          alert("This site is in the exclusion list.");
      } else {
          initWhenReady(document);
      }
  });
}

checkExclusion();
const urlFqdnRegex = /^(https?:\/\/)?([a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?)$/i;

document.getElementById('newFqdn').addEventListener('keydown', function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    const userInput = document.getElementById('newFqdn').value;
    if (isValidURL(userInput)) {
      const fqdn = userInput.startsWith("www.") ? userInput : "www." + userInput;
      addFqdn(fqdn);
    } else {
      alert('Invalid URL or FQDN');
    }
    document.getElementById('newFqdn').value = '';
  }
});

document.getElementById('addFqdn').addEventListener('click', function() {
  const userInput = document.getElementById('newFqdn').value;
  if (isValidURL(userInput)) {
    const fqdn = userInput.startsWith("www.") ? userInput : "www." + userInput;
    addFqdn(fqdn);
  } else {
    alert('Invalid URL or FQDN');
  }
  document.getElementById('newFqdn').value = '';
});

document.getElementById('fqdnList').addEventListener('click', function(e) {
  if (e.target.classList.contains('remove-entry')) {
    const entry = e.target.parentNode;
    const index = entry.dataset.index;
    const fqdn = entry.textContent.trim();
    removeFqdn(index, fqdn);
    entry.remove();
  }
});

function addFqdn(fqdn) {
  browser.storage.local.get({ fqdns: [] })
      .then(data => {
          const { fqdns } = data;
          if (!fqdns.includes(fqdn)) {
              fqdns.push(fqdn);
              browser.storage.local.set({ fqdns }).then(updateFqdnList);
          }
      });
}

function removeFqdn(index, fqdn) {
  browser.storage.local.get({ fqdns: [] })
      .then(data => {
          const { fqdns } = data;
          fqdns.splice(index, 1); 
          return browser.storage.local.set({ fqdns });
      })
      .then(() => {
          updateFqdnList(); 
      })
      .catch(error => {
          console.error('Error removing FQDN:', error);
      });
}

function isValidURL(urlString) {
  return urlFqdnRegex.test(urlString);
}

function updateFqdnList() {
  browser.storage.local.get({ fqdns: [] }).then(data => {
      const fqdnList = document.getElementById('fqdnList');
      fqdnList.innerHTML = '';
      data.fqdns.forEach((fqdn, index) => { 
          const entry = document.createElement('div');
          entry.classList.add('fqdn-entry');
          entry.textContent = fqdn;
          entry.dataset.index = index; 
          const removeButton = document.createElement('span');
          removeButton.classList.add('remove-entry');
          removeButton.textContent = 'x';
          entry.appendChild(removeButton);
          fqdnList.appendChild(entry);
      });
  });
}

updateFqdnList();
