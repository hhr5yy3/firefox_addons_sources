chrome.runtime.sendMessage({ cd: "showSomething" });
// Auto Captcha Loading ---------------------
setInterval(() => {
  const captchaValue = document.getElementById("captchaText");
  const captchaInput = document.getElementById("drawText1");
  if(captchaValue){
    captchaInput.value = captchaValue.value;
  }
}, 1000);
setInterval(() => {
  const captchaValue = document.getElementById("captchaText");
  const captchaInput = document.getElementById("txtDrawText");
  if(captchaValue){
    captchaInput.value = captchaValue.value;
  }
}, 1100);
setInterval(() => {
  const captchaValue = document.getElementById("captchaText");
  const captchaInput = document.getElementById("drawText");
  if(captchaValue){
    captchaInput.value = captchaValue.value;
  }
}, 1300);
// Plot Details Measurement---------------------------
setInterval(() => {
  const khdetails = document.querySelector("#khdetails table tbody tr td");
  const khdetailsTable = document.querySelectorAll("#khdetails table")[2];
  const plotDetails = document.querySelectorAll("#plotdetails div")[3];
  if (plotDetails) {
    plotDetails.firstChild.classList.remove("tables-fixed");
  }
  if (khdetailsTable) {
    khdetails.setAttribute("width", "100%");
    khdetailsTable.classList.remove("table-fixed");
  }
}, 900);
// Login Captcha Loading
setInterval(() => {
  const txtCaptcha = document.getElementById("txtCaptcha");
  const txtInput = document.getElementById("txtInput");
  txtInput.value = txtCaptcha.value;
}, 1200);

// Forgot passowrd Captcha Loading----------------
setInterval(() => {
  const dText = document.getElementById("dText");
  const captaText = document.getElementById("captaText");
  dText.value = captaText.value;
}, 1500);

function autoClick() {
  // Get the button element
  const button = document.getElementById('close-popup');
  // Create a click event
  const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
  });
  // Dispatch the click event
  button.dispatchEvent(clickEvent);
}
// Auto-click every 2 seconds
setInterval(autoClick, 1900);

function autoClick1() {
  // Get the first button element with the class name
  const button = document.getElementsByClassName('btn btn-default ng-scope')[0]; // Replace 'close-popup' with your actual class name
  // Ensure the button exists before dispatching the event
  if (button) {
    // Create a click event
    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    });
    // Dispatch the click event
    button.dispatchEvent(clickEvent);
  }
}

// Auto-click every 2 seconds
setInterval(autoClick1, 800);