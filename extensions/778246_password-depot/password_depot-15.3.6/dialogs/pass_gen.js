var manager = {
  init: function () {
    var that = this;
    $('[data-toggle="tooltip"]').tooltip();
    $("#password_length_slider").on("input change", function () {
      this.style.background =
        "linear-gradient(to right, #0f4c81 0%, #0f4c81 " +
        this.value * 2 +
        "%, #e4e4e4 " +
        this.value +
        "%, #e4e4e4 100%)";
      $("#password_length_input").val(this.value);
      that.generate();
    });
    $("#password_length_input").on("change", function () {
      $("#password_length_slider").val(this.value);
      $("#password_length_slider").trigger("change");
    });
    $('input[name="config-radio"]').on("change", function () {
      if (this.id === "config_radio_say") {
        $("#config_check_uppercase").prop("checked", true);
        $("#config_check_lowercase").prop("checked", true);
        $("#config_check_numbers").prop("checked", false);
        $("#config_check_symbols").prop("checked", false);
        $("#config_check_numbers").attr("disabled", true);
        $("#config_check_symbols").attr("disabled", true);
      } else if (this.id === "config_radio_read") {
        $("#config_check_numbers").attr("disabled", false);
        $("#config_check_symbols").attr("disabled", false);
      } else if (this.id === "config_radio_all") {
        $("#config_check_numbers").attr("disabled", false);
        $("#config_check_symbols").attr("disabled", false);
        $("#config_check_uppercase").prop("checked", true);
        $("#config_check_lowercase").prop("checked", true);
        $("#config_check_numbers").prop("checked", true);
        $("#config_check_symbols").prop("checked", true);
      }
      that.generate();
    });
    $('input[type="checkbox"]').on("change", function (event) {
      if ($(".config-checkbox:checkbox:checked").length == 0) {
        $(this).prop("checked", true);
      }
      that.generate();
    });
    $("#btn_password_refresh").on("click", function () {
      that.generate();
    });

    $("#btn_password_copy, #btn_copy_password").on("click", function () {
      that.copyToClipboard();
      window.close();
      // parent.postMessage({call:"pd_copy_text_from_input_popup"} ,"*");
    });
  },
  setOptions: function () {
    password_manager.length = parseInt($("#password_length_input").val());
    password_manager.isUpper = $("#config_check_uppercase").prop("checked");
    password_manager.isLower = $("#config_check_lowercase").prop("checked");
    password_manager.isNumber = $("#config_check_numbers").prop("checked");
    password_manager.isSymbol = $("#config_check_symbols").prop("checked");
    password_manager.isEasyRead = $("#config_radio_read").prop("checked");
  },
  generate: function () {
    this.setOptions();
    let pass = password_manager.generate();
    $("#pass_gen_panel #password_result").val(pass);
    this.drawProgress(pass);
  },
  drawProgress: function (pass) {
    let entropy = password_manager.calculateEntropy(pass);
    let progress = entropy > 100 ? 100 : parseInt(entropy);
    // start: 187, 24, 24
    // end: 25, 134, 54
    let color =
      "rgb(" +
      (193.75 - progress * 1.6875) +
      "," +
      (19.42 + progress * 1.146) +
      ", " +
      (22.75 + progress * 0.3125) +
      ")";
    let color_alpha =
      "rgba(" +
      (193.75 - progress * 1.6875) +
      "," +
      (19.42 + progress * 1.146) +
      ", " +
      (22.75 + progress * 0.3125) +
      ", 0.1)";
    $("#password_strength_progress").css("background-color", color_alpha);
    $("#password_strength_progress .password-strength-progress").css(
      "background-color",
      color
    );
    $("#password_strength_progress .password-strength-progress").css(
      "width",
      progress + "%"
    );
  },
  copyToClipboard: function () {
    let text = $("#pass_gen_panel #password_result").val();
    var input = document.createElement("input");
    input.setAttribute("value", text);
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
    chrome.runtime.sendMessage(
      { action: "addonMgr.clearClipboard", data: { interval: 60000 } },
      (response) => {}
    );
  },
};

$(document).ready(function () {
  manager.init();
  manager.generate();
  checker_manager.init();
  checker_manager.draw();
});
