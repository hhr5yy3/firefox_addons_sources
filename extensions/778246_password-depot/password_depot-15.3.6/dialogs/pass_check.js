var checker_manager = {
  init: function () {
    var that = this;
    $("#pass_check_panel #btn_password_show_hide").on("click", function () {
      $("#pass_check_panel #btn_password_show_hide span").hasClass("fa-eye")
        ? that.showPassword()
        : that.hidePassword();
    });
    $("#pass_check_panel #password_result").on("input change", function () {
      that.draw();
    });
  },
  showPassword: function () {
    $("#pass_check_panel #btn_password_show_hide span").removeClass("fa-eye");
    $("#pass_check_panel #btn_password_show_hide span").addClass(
      "fa-eye-slash"
    );
    $("#pass_check_panel #password_result").attr("type", "text");
  },
  hidePassword: function () {
    $("#pass_check_panel #btn_password_show_hide span").removeClass(
      "fa-eye-slash"
    );
    $("#pass_check_panel #btn_password_show_hide span").addClass("fa-eye");
    $("#pass_check_panel #password_result").attr("type", "password");
  },
  draw: function () {
    let pass = $("#pass_check_panel #password_result").val();
    $("#pass_check_panel div.config-title").html(
      pass.length + chrome.i18n.getMessage("pd_pass_check_char_contains")
    );
    this.drawInfoLabels(pass);
    if (pass) {
      let entropy = password_checker_manager.calculateEntropy(pass);
      let progress = entropy > 100 ? 100 : parseInt(entropy);
      let color =
        "rgb(" +
        (193.75 - progress * 1.6875) +
        "," +
        (19.42 + progress * 1.146) +
        ", " +
        (22.75 + progress * 0.3125) +
        ")";
      // let color = 'rgb(' + (255 - progress * 2.55) + ',' + progress * 2.55 + ', '+ progress * 1.5 + ')';
      $("#pass_check_panel #password_input_wrapper").css(
        "background-color",
        color
      );
      $("#pass_check_panel #password_strength_label").html(
        password_checker_manager.getStrengthLabel(pass)
      );
    } else {
      $("#pass_check_panel #password_input_wrapper").css(
        "background-color",
        "#a5a5a5"
      );
      $("#pass_check_panel #password_strength_label").html(
        chrome.i18n.getMessage("pd_pass_check_no_password")
      );
    }
    $("#pass_check_panel #info_broke_time").html(
      password_checker_manager.getBrokeTimeLabel(pass)
    );
    $("#pass_check_panel #info_entropy").html(
      parseInt(password_checker_manager.calculateEntropy(pass)) +
        chrome.i18n.getMessage("pd_pass_check_bits")
    );
  },
  drawInfoLabels: function (password) {
    if (password_checker_manager.hasUpper(password)) {
      $("#pass_check_panel #info_label_upper").removeClass(
        "info-label-deactive"
      );
      $("#pass_check_panel #info_label_upper").addClass("info-label-active");
      $("#pass_check_panel #info_label_upper").html(
        "&#10003 " + chrome.i18n.getMessage("pd_pass_check_uppercase")
      );
    } else {
      $("#pass_check_panel #info_label_upper").addClass("info-label-deactive");
      $("#pass_check_panel #info_label_upper").removeClass("info-label-active");
      $("#pass_check_panel #info_label_upper").html(
        "&#x2717; " + chrome.i18n.getMessage("pd_pass_check_uppercase")
      );
    }

    if (password_checker_manager.hasLower(password)) {
      $("#pass_check_panel #info_label_lower").removeClass(
        "info-label-deactive"
      );
      $("#pass_check_panel #info_label_lower").addClass("info-label-active");
      $("#pass_check_panel #info_label_lower").html(
        "&#10003 " + chrome.i18n.getMessage("pd_pass_check_lowercase")
      );
    } else {
      $("#pass_check_panel #info_label_lower").addClass("info-label-deactive");
      $("#pass_check_panel #info_label_lower").removeClass("info-label-active");
      $("#pass_check_panel #info_label_lower").html(
        "&#x2717; " + chrome.i18n.getMessage("pd_pass_check_lowercase")
      );
    }

    if (password_checker_manager.hasNumber(password)) {
      $("#pass_check_panel #info_label_number").removeClass(
        "info-label-deactive"
      );
      $("#pass_check_panel #info_label_number").addClass("info-label-active");
      $("#pass_check_panel #info_label_number").html(
        "&#10003 " + chrome.i18n.getMessage("pd_pass_check_number")
      );
    } else {
      $("#pass_check_panel #info_label_number").addClass("info-label-deactive");
      $("#pass_check_panel #info_label_number").removeClass(
        "info-label-active"
      );
      $("#pass_check_panel #info_label_number").html(
        "&#x2717; " + chrome.i18n.getMessage("pd_pass_check_number")
      );
    }

    if (password_checker_manager.hasSymbol(password)) {
      $("#pass_check_panel #info_label_symbol").removeClass(
        "info-label-deactive"
      );
      $("#pass_check_panel #info_label_symbol").addClass("info-label-active");
      $("#pass_check_panel #info_label_symbol").html(
        "&#10003 " + chrome.i18n.getMessage("pd_pass_check_symbol")
      );
    } else {
      $("#pass_check_panel #info_label_symbol").addClass("info-label-deactive");
      $("#pass_check_panel #info_label_symbol").removeClass(
        "info-label-active"
      );
      $("#pass_check_panel #info_label_symbol").html(
        "&#x2717; " + chrome.i18n.getMessage("pd_pass_check_symbol")
      );
    }
  },
};
