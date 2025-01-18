"use strict";

// src/content/handlers/submitSigninForm.ts
var submitSigninForm = (form, locationHref) => {
  const url = new URL(locationHref);
  const key = "_fromAWSRoleSwitchExtension";
  const isExtension = url.searchParams.get(key) === "true";
  if (isExtension && form) {
    document.body.style.display = "none";
    setTimeout(() => form.submit(), 0);
  }
};

// src/content/aws-signin.ts
submitSigninForm(
  document.getElementById("switchrole_form"),
  location.href
);
