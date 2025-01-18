export async function sendOptionsMessage(type, data = {}) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(
      {
        type,
        ...data
      },
      function (value) {
        resolve(value);
      }
    );
  });
}
