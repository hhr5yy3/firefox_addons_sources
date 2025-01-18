const notificationContainer = document.createElement("div");
notificationContainer.classList.add("notifications");
document.body.append(notificationContainer);
export const notify = (msg) => {
  const notification = document.createElement("div");
  const closeButton = document.createElement("div");
  const logo = document.createElement("img");
  notification.classList.add("notifications__notification");
  notification.innerHTML = `<span>${msg}</span>`;
  closeButton.classList.add("notifications__close-button");
  closeButton.innerText = "X";
  closeButton.onclick = () => {
    notification.classList.add("fade-out");
    setTimeout(() => notification.remove(), 500);
  };
  logo.src = chrome.runtime.getURL("/assets/images/tufast48.png");
  notification.prepend(logo, closeButton);
  notificationContainer.prepend(notification);
  setTimeout(() => {
    notification.classList.add("fade-out");
    setTimeout(() => notification.remove(), 500);
  }, 5e4);
};
