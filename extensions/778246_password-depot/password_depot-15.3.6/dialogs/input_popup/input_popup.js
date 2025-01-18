$(document).ready(function () {
  // $('.main-container').css('max-height',)
  var setLocale = (function () {
    document.getElementById("info_no_result").innerHTML =
      "<i>" + chrome.i18n.getMessage("pd_input_popup_no_result") + "</i>";
    document.getElementById("info_no_search_result").innerHTML =
      "<i>" +
      chrome.i18n.getMessage("pd_input_popup_no_search_result") +
      "</i>";

    // pass gen panel
    document
      .getElementById("input_popup_pass_gen")
      .setAttribute(
        "data-original-title",
        chrome.i18n.getMessage("pd_main_panel_generate_password")
      );
    document
      .getElementById("input_popup_pass_check")
      .setAttribute(
        "data-original-title",
        chrome.i18n.getMessage("pd_main_panel_how_secure")
      );
    document
      .getElementById("input_popup_pass_gen_copy")
      .setAttribute(
        "data-original-title",
        chrome.i18n.getMessage("pd_pass_gen_panel_copy")
      );
    document
      .getElementById("input_popup_pass_gen_refresh")
      .setAttribute(
        "data-original-title",
        chrome.i18n.getMessage("pd_pass_gen_panel_refresh")
      );
    document
      .getElementById("input_popup_pass_gen_copy")
      .setAttribute("title", chrome.i18n.getMessage("pd_pass_gen_panel_copy"));
    document
      .getElementById("input_popup_pass_gen_refresh")
      .setAttribute(
        "title",
        chrome.i18n.getMessage("pd_pass_gen_panel_refresh")
      );

    document.getElementById("input_popup_pass_gen_title").innerHTML =
      chrome.i18n.getMessage("pd_pass_gen_panel_customize");
    document.getElementById("input_popup_pass_gen_length").innerHTML =
      chrome.i18n.getMessage("pd_pass_gen_panel_length");

    document.getElementById("input_popup_pass_gen_easy_to_say").innerHTML =
      chrome.i18n.getMessage("pd_pass_gen_panel_easy_to_say");
    document.getElementById("input_popup_pass_gen_easy_to_read").innerHTML =
      chrome.i18n.getMessage("pd_pass_gen_panel_easy_to_read");
    document.getElementById("input_popup_pass_gen_all").innerHTML =
      chrome.i18n.getMessage("pd_pass_gen_panel_all");
    document.getElementById("input_popup_pass_gen_uppercase").innerHTML =
      chrome.i18n.getMessage("pd_pass_gen_panel_uppercase");
    document.getElementById("input_popup_pass_gen_lowercase").innerHTML =
      chrome.i18n.getMessage("pd_pass_gen_panel_lowercase");
    document.getElementById("input_popup_pass_gen_numbers").innerHTML =
      chrome.i18n.getMessage("pd_pass_gen_panel_numbers");
    document.getElementById("input_popup_pass_gen_symbols").innerHTML =
      chrome.i18n.getMessage("pd_pass_gen_panel_symbols");

    document
      .getElementById("input_popup_pass_gen_say_tip")
      .setAttribute(
        "data-original-title",
        chrome.i18n.getMessage("pd_pass_gen_panel_say_tip")
      );
    document
      .getElementById("input_popup_pass_gen_read_tip")
      .setAttribute(
        "data-original-title",
        chrome.i18n.getMessage("pd_pass_gen_panel_read_tip")
      );
    document
      .getElementById("input_popup_pass_gen_all_tip")
      .setAttribute(
        "data-original-title",
        chrome.i18n.getMessage("pd_pass_gen_panel_all_tip")
      );

    document.getElementById("btn_copy_password").innerHTML =
      chrome.i18n.getMessage("pd_input_popup_fill_pass");

    // pass check panel
    document.getElementById("input_popup_pass_check_time_crack").innerHTML =
      chrome.i18n.getMessage("pd_pass_check_panel_time_crack");
    document.getElementById("input_popup_pass_check_entropy").innerHTML =
      chrome.i18n.getMessage("pd_pass_check_panel_entropy");
    document
      .getElementById("btn_password_show_hide_title")
      .setAttribute(
        "title",
        chrome.i18n.getMessage("pd_pass_check_panel_show")
      );
  })();

  $(".input_popup_logo").attr("src", chrome.runtime.getURL("icons/white.png"));
  // $('.entry-card-image img').attr('src', getFavicon());
  $("#btn_pass_gen").on("click", function () {
    // $('#main_panel').hide();
    // $('#pass_gen_panel').show();
    chrome.runtime.sendMessage(
      { action: "addonMgr.genPassword", data: null },
      (response) => {}
    );
  });
  $("#btn_how_secure").on("click", function () {
    $("#main_panel").hide();
    $("#pass_check_panel").show();
  });
  $(".back-button").on("click", function () {
    $(this).parent().parent().hide();
    $("#main_panel").show();
  });
  $("body").on("click", ".entry-card", function () {
    parent.postMessage(
      { call: "pd_select_entry_send_uuid_from_input_popup", value: this.id },
      "*"
    );
  });
  $("#btn_copy_password").on("click", function () {
    parent.postMessage(
      {
        call: "pd_fill_password_from_input_popup",
        value: $("#pass_gen_panel #password_result").val(),
      },
      "*"
    );
  });
  $("#search_text").on("input", function () {
    if (this.value != "") {
      let query = this.value.toLowerCase();
      $(this).parent().addClass("expanded");
      if ($(".entry-card").length == 0) {
        return;
      }
      let disp_count = 0;
      $(".entry-card").each(function (ind) {
        if (
          $(this).find(".title").html().toLowerCase().indexOf(query) > -1 ||
          $(this).find(".description").html().toLowerCase().indexOf(query) > -1
        ) {
          $(this).css({ display: "flex" });
          disp_count += 1;
        } else {
          $(this).css({ display: "none" });
        }
      });
      if (disp_count == 0) {
        $("#info_no_search_result").show();
      } else {
        $("#info_no_search_result").hide();
      }
    } else {
      $(this).parent().removeClass("expanded");
      $("#info_no_search_result").hide();
      $(".entry-card").each(function (ind) {
        $(this).css({ display: "flex" });
      });
    }
  });
  $("#btn_search_cancel").on("click", function () {
    $("#search_text").val("");
    $("#search_text").trigger("input");
  });
  $("body").on("mousemove", ".copy-dropdown", function () {
    let top = $(this).offset().top;
    let left = $(this).offset().left;
    $(this)
      .children(".copy-dropdown-content")
      .css({ top: top + 35, left: left - 80 });
  });
  $("body").on("click", ".copy-dropdown-content .copy-username", function (e) {
    e.stopPropagation();
    copyToClipboard(
      $(this).parent().parent().parent().parent().attr("data-user")
    );
    parent.postMessage({ call: "pd_copy_text_from_input_popup" }, "*");
  });
  $("body").on("click", ".copy-dropdown-content .copy-url", function (e) {
    e.stopPropagation();
    copyToClipboard(
      $(this).parent().parent().parent().parent().attr("data-url")
    );
    parent.postMessage({ call: "pd_copy_text_from_input_popup" }, "*");
  });
  $(".floating-buton").on("click", function () {
    parent.postMessage(
      {
        call: "pd_create_password_from_input_popup",
        value: { username: "", password: "" },
      },
      "*"
    );
  });
  $("body").on("click", ".edit-in-native", function () {
    let uuid = $(this).parent().attr("id");
    chrome.runtime.sendMessage(
      { action: "addonMgr.editEntry", data: { uuid: uuid } },
      (response) => {}
    );
  });
});

var copyToClipboard = function (text) {
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
};

window.addEventListener(
  "message",
  function (event) {
    // var origin = event.origin || event.originalEvent.origin;
    // if (origin !== /*the container's domain url*/)
    //     return;
    if (
      typeof event.data == "object" &&
      event.data.call == "sendValueFromPD_input_popup_entries"
    ) {
      let entries = event.data.value.entries;
      let pass = event.data.value.password;
      let ispass = event.data.value.ispass;
      if (!ispass) {
        $("#btn_pass_gen").hide();
        $("#btn_how_secure").hide();
      }
      $("#pass_check_panel #password_result").val(pass);
      $("#pass_check_panel #password_result").trigger("input");
      if (!entries || entries.length == 0) {
        $("#info_no_result").show();
      }
      entries.forEach((ent) => {
        $("#entry_card_container").append(createCard(ent));
      });
    }
    if (typeof event.data == "object" && event.data.call == "setRightAlign") {
      $("#pd_popup_top_arrow").css({ left: 35 });
    }
  },
  false
);

function createCard(entry) {
  return (
    "<div id='" +
    entry.uuid +
    "' data-user='" +
    entry.user +
    "' data-url='" +
    entry.url +
    "' class='entry-card'>\
            <div class='entry-card-image'>\
                <span class='fa fa-lock'></span>\
            </div>\
            <div class='entry-card-content'>\
                <span class='title' data-toggle='tooltip' data-placement='top'  title='" +
    entry.desc +
    "'>" +
    entry.desc +
    "</span>\
                <span class='description' data-toggle='tooltip' data-placement='top'  title='" +
    entry.user +
    "'>" +
    entry.user +
    "</span>" +
    (entry.path
      ? "<span class='path' data-toggle='tooltip' data-placement='top'  title='" +
        entry.path +
        "'>" +
        entry.path +
        "</span>"
      : "") +
    "</div>\
            <div class='entry-card-action'>\
            <div class='copy-dropdown' style='position: relative;'>\
                <div class='circle'>\
                    <span class='fa fa-clone'></span>\
                    <span class='copy-dropdown-arrow fa fa-caret-down' ></span>\
                </div>\
                <div class='copy-dropdown-content'>\
                    <span class='copy-username'>" +
    chrome.i18n.getMessage("pd_copy_username") +
    "</span>\
                    <span class='copy-url'>" +
    chrome.i18n.getMessage("pd_copy_url") +
    "</span>\
                </div>\
            </div>\
            </div>\
            <div class='entry-card-action edit-in-native'>\
                <div class='circle'>\
                    <span class='fa fa-edit' aria-hidden='true'  data-toggle='tooltip' data-placement='right' title='" +
    chrome.i18n.getMessage("pd_edit_in_client") +
    "'></span>\
                </div>\
            </div>\
        </div>"
  );
}
