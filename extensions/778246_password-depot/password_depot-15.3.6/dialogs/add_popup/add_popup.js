$(document).ready(function () {
  $(".add-popup-buttons .logo img").attr(
    "src",
    chrome.runtime.getURL("icons/128.png")
  );
  $("#password_visible_toggle").on("click", function () {
    $("span#password_visible_toggle").hasClass("fa-eye")
      ? showPassword()
      : hidePassword();
  });
  var showPassword = function () {
    $("span#password_visible_toggle").removeClass("fa-eye");
    $("span#password_visible_toggle").addClass("fa-eye-slash");
    $("#add_popup_password").attr("type", "text");
  };
  var hidePassword = function () {
    $("span#password_visible_toggle").removeClass("fa-eye-slash");
    $("span#password_visible_toggle").addClass("fa-eye");
    $("#add_popup_password").attr("type", "password");
  };

  $("#btn_not_now").on("click", function () {
    parent.postMessage(
      {
        call: "pd_not_now_from_add_password",
        value: { username: "", password: "" },
      },
      "*"
    );
  });
  $("#btn_add").on("click", function () {
    let id = $("#add_popup_name").val();
    let username = $("#add_popup_username").val();
    let pass = $("#add_popup_password").val();
    parent.postMessage(
      {
        call: "pd_add_new_from_add_password",
        value: { name: id, username: username, password: pass },
      },
      "*"
    );
  });
  $(".ignore-website").on("click", function () {
    parent.postMessage({ call: "pd_ignore_from_add_password" }, "*");
  });
});

window.addEventListener(
  "message",
  function (event) {
    // var origin = event.origin || event.originalEvent.origin;
    // if (origin !== /*the container's domain url*/)
    //     return;
    if (
      typeof event.data == "object" &&
      event.data.call == "sendValueFromPD_add_popup"
    ) {
      let username = event.data.value.username;
      let pass = event.data.value.password;
      $("#add_popup_username").val(username);
      $("#add_popup_password").val(pass);
    }
  },
  false
);
