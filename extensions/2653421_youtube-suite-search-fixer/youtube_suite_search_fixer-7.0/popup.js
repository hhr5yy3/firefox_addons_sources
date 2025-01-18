function onOpened() {
  console.log(`Options page opened`);
  window.close();
}

function onError(error) {
  console.log(`Error: ${error}`);
}

var opening = browser.runtime.openOptionsPage();
opening.then(onOpened, onError);
