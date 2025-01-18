import { getStorage, setStorage } from "../utils/storage.js";

import { sendOptionsMessage } from "../utils/messages.js";

const currentStepHash = window.location.hash || "#step-1";
let currentStep = +currentStepHash.split("-")[1];

let debounce = 0;
let trainingStatus;

function updateCurrentStep(step) {
  const $step = document.querySelector(`.step-${step}`);
  if (!$step) {
    updateCurrentStep(1);
  } else {
    currentStep = step;
    document.querySelector(".onboarding").setAttribute("data-step", step);
    [...document.querySelectorAll(`.step`)].forEach((el) =>
      el.classList.remove("active")
    );
    document.querySelector(`.step-${step}`).classList.add("active");
  }
}

function tryLoadUser() {
  chrome.runtime.sendMessage({
    type: "load-user"
  });
}

async function getStatus() {
  const status = await sendOptionsMessage("options-get-finetune-status");
  return status;
}

async function updateTrainingStatusText() {
  const status = await getStatus();
  if (status) {
    const {
      emailsReceivedCount = 0, // total emails received
      processingMessages = 0, // processing right now
      messageCount = 0, // valid messages
      trainingEmail = "Something went wrong"
    } = status;

    document.querySelector("#ellie-email-address").value = trainingEmail;
    document.querySelectorAll(".email-count").forEach((el) => {
      el.textContent = emailsReceivedCount;
    });
    document.querySelectorAll(".emails-processing").forEach((el) => {
      el.textContent = processingMessages;
    });

    if (emailsReceivedCount > 0) {
      document.querySelector("#training-emails-waiting").style.display = "none";
      document.querySelector("#training-emails-received").style.display =
        "block";
      document.querySelector(".send-more").style.display = "inline";
      setStepValid(2, true);
    }
  }
}

async function onStepOneChange(e) {
  setStepValid(1, false);

  // check and set the validity of the input that was changed
  const { target } = e;
  const { value } = target;

  clearTimeout(debounce);

  // every time the form changes
  // remove validity state of the form
  target.parentElement.classList.remove("valid");
  target.parentElement.classList.remove("invalid");

  // grab both fields and validate them
  const $replyFromName = document.querySelector("#your-name");
  const $licenceKey = document.querySelector("#licence-key");

  const replyFromName = $replyFromName.value;
  const licenceKey = $licenceKey.value;
  debounce = setTimeout(async () => {
    const nameValid = !!replyFromName.length;
    if (e.target.name === "your-name") {
      setInputFieldValid($replyFromName, nameValid);
    }
    const keyValid = await sendOptionsMessage("options-check-key", {
      licenceKey
    });

    if (e.target.name === "licence-key") {
      setLicenceKeyError($licenceKey, keyValid);
      setInputFieldValid($licenceKey, keyValid.valid);
    }

    const formValid = nameValid && keyValid.valid;
    if (formValid) {
      await setStorage({
        replyFromName,
        licenceKey
      });

      await tryLoadUser();
      await setOnboardingStarted();
      setStepValid(1, true);
    } else {
      setStepValid(1, false);
    }
  }, 1000);
}

function isUserLoaded() {
  return document.body.classList.contains("user-loaded");
}
function setLicenceKeyError($el, { valid, reason, text }) {
  if (!valid) {
    let msg = "That licence key is not valid";
    if (reason === "invalid-licence") {
      msg = `That licence key is not valid. Try again or click
      <a rel="noopener noreferrer" target="_ellie-website" href="https://tryellie.com/downloads">here</a> to get
      one</span>.`;
    } else if (reason === "licence-overused") {
      msg = `Your licence key is being used on too many devices, if you want to de-register a device or upgrade your plan please <a href="mailto:hi@tryellie.com">contact us</a>.`;
    }
    $el.parentElement.querySelector("#input-error").innerHTML = msg;
  }
}
function setInputFieldValid($el, isValid) {
  if (isValid) {
    $el.parentElement.classList.remove("invalid");
    $el.parentElement.classList.add("valid");
  } else {
    $el.parentElement.classList.remove("valid");
    $el.parentElement.classList.add("invalid");
  }
}

function setStepValid(step, isValid) {
  document
    .querySelector(`.step-${step}`)
    .setAttribute("data-valid", `${isValid}`);
}

async function setOnboardingStarted() {
  await sendOptionsMessage("options-onboarding-started");
}
async function setOnboardingCompleted() {
  await sendOptionsMessage("options-onboarding-completed");
  window.location = "/src/options/index.html";
}

function updateUsageElements({ emailTrainingLimit = 10 }) {
  // email training
  document
    .querySelectorAll(".email-training-max-limit")
    .forEach((e) => (e.textContent = emailTrainingLimit));
}
function updatePricingLinks({ uuid, email }) {
  [...document.querySelectorAll(".pricing-link")].forEach(($link) => {
    const p = new URLSearchParams(new URL($link.href).search);
    p.set("e", email);
    p.set("u", uuid);
    $link.href = `${$link.href.split("?")[0]}?${p.toString()}`;
  });
}

function onLoad() {
  document
    .querySelector("#step-1-form")
    .addEventListener("input", onStepOneChange);

  [...document.querySelectorAll(".next-btn, .skip-btn")].forEach((el) =>
    el.addEventListener("click", (e) => {
      updateCurrentStep(currentStep + 1);
    })
  );
  [...document.querySelectorAll(".back-btn")].forEach((el) =>
    el.addEventListener("click", (e) => {
      updateCurrentStep(currentStep - 1);
    })
  );

  document
    .querySelector("#submit-step-3")
    .addEventListener("click", async () => {
      setOnboardingCompleted();
    });

  updateCurrentStep(currentStep);
  tryLoadUser();

  trainingStatus = setInterval(updateTrainingStatusText, 5000);
  updateTrainingStatusText();
}

chrome.runtime.onMessage.addListener(async function (message) {
  if (message.type === "user") {
    const { user } = message;

    document.querySelector("body").classList.add("user-loaded");

    const { billing, planLimits = {} } = user;
    if (billing && billing.paid) {
      document.querySelector("body").classList.add("is-paid-user");
    } else {
      document.querySelector("body").classList.add("is-free-user");
    }

    const $replyFromName = document.querySelector("#your-name");
    const $licenceKey = document.querySelector("#licence-key");

    const { licenceKey, replyFromName } = await getStorage(
      "licenceKey",
      "replyFromName"
    );
    $licenceKey.value = licenceKey;
    setInputFieldValid($licenceKey, true);
    $replyFromName.value = replyFromName;
    setInputFieldValid($replyFromName, true);
    setStepValid(1, true);

    updateUsageElements({
      emailTrainingLimit: planLimits ? planLimits.emailTrainingLimit : 10
    });
    updatePricingLinks({ uuid: user.uuid, email: user.email });

    trainingStatus = setInterval(updateTrainingStatusText, 5000);
    updateTrainingStatusText();
  }
});
document.addEventListener("DOMContentLoaded", onLoad);
