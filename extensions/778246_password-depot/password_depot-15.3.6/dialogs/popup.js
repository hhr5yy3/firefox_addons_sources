// popup.js
var optMgr = {
  _options: {},
  init: function () {
    return Options.get().then((options) => {
      this._options = options;
      this.render(options);
    });
  },
  render: function (options) {
    $("#websocket_port").val(options.socketPortNumber);
    $("#auto_fill_switch").prop("checked", options.isAutoFill);

    $( "#ignored_urls_wrapper" ).empty();
    for (let i = 0; i < options.ignoredUrls.length; i += 1) appendIgnoreUrlElement(options.ignoredUrls[i]);
  },
};

$(document).ready(function () {
  var setLocale = (function () {
    // alert('here');
    document
      .getElementById("txt_search")
      .setAttribute(
        "placeholder",
        chrome.i18n.getMessage("pd_search_your_depot")
      );
    document.getElementById("popup_right_title").innerHTML =
      chrome.i18n.getMessage("pd_popup_right_title");
    document.getElementById("main_panel_open_client").innerHTML =
      chrome.i18n.getMessage("pd_main_panel_open_client");
    document.getElementById("main_panel_add_bookmark").innerHTML =
      chrome.i18n.getMessage("pd_main_panel_add_bookmark");
    document.getElementById("main_panel_settings").innerHTML =
      chrome.i18n.getMessage("pd_main_panel_settings");
    document.getElementById("main_panel_generate_password").innerHTML =
      chrome.i18n.getMessage("pd_main_panel_generate_password");
    document.getElementById("main_panel_how_secure").innerHTML =
      chrome.i18n.getMessage("pd_main_panel_how_secure");
    document.getElementById("main_panel_visite_website").innerHTML =
      chrome.i18n.getMessage("pd_main_panel_visite_website");
    document.getElementById("main_panel_rate_us").innerHTML =
      chrome.i18n.getMessage("pd_main_panel_rate_us");

    document.getElementById("setting_panel_back").innerHTML =
      chrome.i18n.getMessage("pd_setting_panel_back");
    document.getElementById("setting_panel_save").innerHTML =
      chrome.i18n.getMessage("pd_setting_panel_save");
    document.getElementById("setting_panel_websocket_port").innerHTML =
      chrome.i18n.getMessage("pd_setting_panel_websocket_port");

    document.getElementById("pass_gen_panel_back").innerHTML =
      chrome.i18n.getMessage("pd_pass_gen_panel_back");
    document.getElementById("pass_gen_panel_customize").innerHTML =
      chrome.i18n.getMessage("pd_pass_gen_panel_customize");
    document.getElementById("pass_gen_panel_length").innerHTML =
      chrome.i18n.getMessage("pd_pass_gen_panel_length");
    document.getElementById("pass_gen_panel_easy_to_say").innerHTML =
      chrome.i18n.getMessage("pd_pass_gen_panel_easy_to_say");
    document.getElementById("pass_gen_panel_easy_to_read").innerHTML =
      chrome.i18n.getMessage("pd_pass_gen_panel_easy_to_read");
    document.getElementById("pass_gen_panel_all").innerHTML =
      chrome.i18n.getMessage("pd_pass_gen_panel_all");
    document.getElementById("pass_gen_panel_uppercase").innerHTML =
      chrome.i18n.getMessage("pd_pass_gen_panel_uppercase");
    document.getElementById("pass_gen_panel_lowercase").innerHTML =
      chrome.i18n.getMessage("pd_pass_gen_panel_lowercase");
    document.getElementById("pass_gen_panel_numbers").innerHTML =
      chrome.i18n.getMessage("pd_pass_gen_panel_numbers");
    document.getElementById("pass_gen_panel_symbols").innerHTML =
      chrome.i18n.getMessage("pd_pass_gen_panel_symbols");
    document.getElementById("btn_copy_password").innerHTML =
      chrome.i18n.getMessage("pd_btn_copy_password");
    document.getElementById("btn_ignored_urls").innerHTML =
      chrome.i18n.getMessage("pd_btn_ignored_urls");
    document.getElementById("setting_panel_ignored_urls").innerHTML =
      chrome.i18n.getMessage("pd_setting_panel_ignored_urls");
    document
      .getElementById("pass_gen_panel_say_tip")
      .setAttribute(
        "data-original-title",
        chrome.i18n.getMessage("pd_pass_gen_panel_say_tip")
      );
    document
      .getElementById("pass_gen_panel_read_tip")
      .setAttribute(
        "data-original-title",
        chrome.i18n.getMessage("pd_pass_gen_panel_read_tip")
      );
    document
      .getElementById("pass_gen_panel_all_tip")
      .setAttribute(
        "data-original-title",
        chrome.i18n.getMessage("pd_pass_gen_panel_all_tip")
      );
    document
      .getElementById("pass_gen_panel_copy")
      .setAttribute(
        "data-original-title",
        chrome.i18n.getMessage("pd_pass_gen_panel_copy")
      );
    document
      .getElementById("pass_gen_panel_refresh")
      .setAttribute(
        "data-original-title",
        chrome.i18n.getMessage("pd_pass_gen_panel_refresh")
      );

    document
      .getElementById("pass_gen_panel_say_tip")
      .setAttribute(
        "title",
        chrome.i18n.getMessage("pd_pass_gen_panel_say_tip")
      );
    document
      .getElementById("pass_gen_panel_read_tip")
      .setAttribute(
        "title",
        chrome.i18n.getMessage("pd_pass_gen_panel_read_tip")
      );
    document
      .getElementById("pass_gen_panel_all_tip")
      .setAttribute(
        "title",
        chrome.i18n.getMessage("pd_pass_gen_panel_all_tip")
      );
    document
      .getElementById("pass_gen_panel_copy")
      .setAttribute("title", chrome.i18n.getMessage("pd_pass_gen_panel_copy"));
    document
      .getElementById("pass_gen_panel_refresh")
      .setAttribute(
        "title",
        chrome.i18n.getMessage("pd_pass_gen_panel_refresh")
      );

    document.getElementById("pass_check_panel_back").innerHTML =
      chrome.i18n.getMessage("pd_pass_check_panel_back");
    document
      .getElementById("pass_check_panel_show")
      .setAttribute(
        "data-original-title",
        chrome.i18n.getMessage("pd_pass_check_panel_show")
      );
    document
      .getElementById("pass_check_panel_show")
      .setAttribute(
        "title",
        chrome.i18n.getMessage("pd_pass_check_panel_show")
      );
    // document.getElementById('pass_check_password_result').setAttribute('placeholder', chrome.i18n.getMessage('pd_pass_check_enter_pass'));
    $(".pass-check-result#password_result").attr(
      "placeholder",
      chrome.i18n.getMessage("pd_pass_check_enter_pass")
    );
    document.getElementById("pass_check_panel_time_crack").innerHTML =
      chrome.i18n.getMessage("pd_pass_check_panel_time_crack");
    document.getElementById("pass_check_panel_entropy").innerHTML =
      chrome.i18n.getMessage("pd_pass_check_panel_entropy");

    document.getElementById("info_no_result_text").innerHTML =
      chrome.i18n.getMessage("pd_input_popup_no_search_result");

    var d = new Date();
    var year = d.getFullYear();
    document.getElementById("popup_left_copyright").innerHTML =
      chrome.i18n.getMessage("pd_popup_copyright") +
      " &#169; 1998-" +
      year +
      " " +
      chrome.i18n.getMessage("pd_popup_by") +
      " <a href='#'>AceBIT GmbH</a> - " +
      chrome.i18n.getMessage("pd_popup_all_right");
  })();

  $("#popup_logo").attr("src", chrome.runtime.getURL("icons/full_white_logo.png"));

  $("#showPD").on("click", function (e) {
    try {
      // ask Password Depot to show itself
      chrome.runtime.sendMessage({ action: "proxyMgr.showPD" }, (response) => {
        // window.close();
      });
    } catch (e) {
      log(e);
    }
  });

  $("#addBookmark").on("click", function (e) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {
          message: "add_bookmark_from_popup",
        });
      }
    });
  });

  $("#btn_ignored_urls").on("click", function () {
    appendIgnoreUrlElement('');
  });

  $("#setting_panel_save_btn").on("click", function () {
    let socketnumber = $("#websocket_port").val();
    let isAutoFill = $("#auto_fill_switch").prop("checked");
    let urlElements = [];
    // get ignored urls from input elements
    const urlInputs = $("#ignored_urls_wrapper").find(".txt-ignored-urls");
    for (let i = 0; i < urlInputs.length; i += 1) {
      urlElements.push({
        id: urlInputs[i].id.split('txt_ignored_urls_')[1],
        url: urlInputs[i].value,
      });
    }

    const urlCheckRes = checkIfUrlValid(urlElements);
    if (urlCheckRes.duplicated.length > 0 || urlCheckRes.empty.length > 0 || urlCheckRes.invalid.length > 0) {
      for (let i = 0; i < urlCheckRes.duplicated.length; i += 1) {
        $(`#ignored_url_warnning_${urlElements[urlCheckRes.duplicated[i]].id}`).html(chrome.i18n.getMessage("pd_warn_duplicated_url"));
        $(`#ignored_url_warnning_${urlElements[urlCheckRes.duplicated[i]].id}`).css('margin-bottom', '3px');
        $(`#txt_ignored_urls_${urlElements[urlCheckRes.duplicated[i]].id}`).css('border-color', 'red');
        $(`#txt_ignored_urls_${urlElements[urlCheckRes.duplicated[i]].id}`).css('border-style', 'solid');
      }

      for (let i = 0; i < urlCheckRes.empty.length; i += 1) {
        $(`#ignored_url_warnning_${urlElements[urlCheckRes.empty[i]].id}`).html(chrome.i18n.getMessage("pd_warn_empty_url"));
        $(`#ignored_url_warnning_${urlElements[urlCheckRes.empty[i]].id}`).css('margin-bottom', '3px');
        $(`#txt_ignored_urls_${urlElements[urlCheckRes.empty[i]].id}`).css('border-color', 'red');
        $(`#txt_ignored_urls_${urlElements[urlCheckRes.empty[i]].id}`).css('border-style', 'solid');
      }

      for (let i = 0; i < urlCheckRes.invalid.length; i += 1) {
        $(`#ignored_url_warnning_${urlElements[urlCheckRes.invalid[i]].id}`).html(chrome.i18n.getMessage("pd_warn_invalid_url"));
        $(`#ignored_url_warnning_${urlElements[urlCheckRes.invalid[i]].id}`).css('margin-bottom', '3px');
        $(`#txt_ignored_urls_${urlElements[urlCheckRes.invalid[i]].id}`).css('border-color', 'red');
        $(`#txt_ignored_urls_${urlElements[urlCheckRes.invalid[i]].id}`).css('border-style', 'solid');
      }

      return;
    }

    optMgr._options.socketPortNumber = socketnumber;
    optMgr._options.isAutoFill = isAutoFill;
    optMgr._options.ignoredUrls = urlElements.map((item) => item.url);
    Options.set(optMgr._options).then(() => {
      $(".back-button").trigger("click");
    });
  });
  $("#setting").on("click", function () {
    $("#setting_panel").show();
    optMgr.init();
  });

  $("#generate").on("click", function () {
    // $('#pass_gen_panel').show();
    chrome.runtime.sendMessage(
      { action: "addonMgr.genPassword", data: null },
      (response) => {}
    );
  });

  $("#how_secure").on("click", function () {
    $("#pass_check_panel").show();
  });

  $("#visit_website").on("click", function () {
    chrome.tabs.create({ url: "https://www.password-depot.de" });
  });

  $("#rate").on("click", function () {
    var url = "https://addons.mozilla.org/en-US/firefox/addon/password-depot/";
    chrome.tabs.create({ url: url });
  });

  $(".back-button").on("click", function () {
    $(this).parent().parent().hide();
  });

  $("#txt_search").on("input", function () {
    let val = this.value;
    if (val == "") {
      $("#btn_search_cancel").addClass("hidden");
    } else {
      $("#btn_search_cancel").removeClass("hidden");
    }
    setTimeout(function () {
      if ($("#txt_search").val() == val) {
        if (val == "") {
          $("#main_panel_menu_container").show();
          $("#main_panel_search_result_container").hide();
          $(".search-result-item").remove();
        } else {
          $("#main_panel_menu_container").hide();
          $("#main_panel_search_result_container").show();
          chrome.runtime.sendMessage(
            { action: "addonMgr.searchEntries", data: { term: val } },
            (response) => {
              if (response.ok == true && response.data) {
                $(".search-result-item").remove();
                if (response.data.matches > 0) {
                  $("#info_no_search_result").addClass("hidden");
                  drawSearchResult(response.data.entries);
                } else {
                  $("#info_no_search_result").removeClass("hidden");
                }
              }
            }
          );
        }
      }
    }, 500);
  });

  $("#btn_search_cancel").on("click", function () {
    $("#txt_search").val("");
    $("#txt_search").trigger("input");
  });
  $("body").on("mousemove", ".copy-dropdown", function () {
    let top = $(this).offset().top;
    let left = $(this).offset().left;
    if (top > 280) {
      $(this)
        .children(".copy-dropdown-content")
        .css({ top: top - 60, left: left - 80 });
    } else {
      $(this)
        .children(".copy-dropdown-content")
        .css({ top: top + 30, left: left - 80 });
    }
  });
  $(".popup-left-copyright a").on("click", function () {
    chrome.tabs.create({ url: "https://www.acebit.de/en/" });
    return false;
  });
  $("body").on("click", ".copy-dropdown-content .copy-username", function (e) {
    e.stopPropagation();
    copyToClipboard(
      $(this).parent().parent().parent().parent().attr("data-user")
    );
    // window.close();
  });
  $("body").on("click", ".copy-dropdown-content .copy-url", function (e) {
    e.stopPropagation();
    copyToClipboard(
      $(this).parent().parent().parent().parent().attr("data-url")
    );
    // window.close();
  });
  $("body").on("click", ".edit-in-native", function () {
    let uuid = $(this).parent().attr("id");
    chrome.runtime.sendMessage(
      { action: "addonMgr.editEntry", data: { uuid: uuid } },
      (response) => {}
    );
  });
  $("body").on("click", ".launch", function () {
    let url = $(this).parent().attr("data-url");
    chrome.tabs.create({ url: url });
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

  var drawSearchResult = function (entries) {
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].url) {
        $("#main_panel_search_result_container").append(
          createEntryCard(entries[i])
        );
      }
    }
  };

  var createEntryCard = function (entry) {
    return (
      "<div class='search-result-item' id='" +
      entry.uuid +
      "' data-url='" +
      entry.url +
      "' data-user='" +
      entry.user +
      "'>\
                    <div class='entry-card-image'>\
                        <span class='fa fa-lock'></span>\
                    </div>\
                    <div class='entry-card-content'>\
                        <span class='title'>" +
      entry.name +
      "</span>\
                        <span class='description'>" +
      entry.user +
      "</span>\
                    </div>\
                    <div class='entry-card-action launch'>\
                        <div class='circle'>\
                            <span class='fa fa-external-link' aria-hidden='true'  data-toggle='tooltip' data-placement='right' title='" +
      chrome.i18n.getMessage("pd_launch") +
      "'></span>\
                        </div>\
                    </div>\
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
  };
});

var appendIgnoreUrlElement = function (url) {
  const newUrlIndex = Math.floor(Math.random() * 1000000);
  $( "#ignored_urls_wrapper" ).append(`
    <div id='url_row_${newUrlIndex}' style='width: 100%;'>
      <div class='url-row'>
        <input type='text' id='txt_ignored_urls_${newUrlIndex}' class='txt-ignored-urls' placeholder='' value='${url}'>
        <svg id='remove_url_${newUrlIndex}' class='svg-icon' viewBox='0 0 24 24'>
          <path fill='#f44336' d='M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 8.7070312 7.2929688 L 7.2929688 8.7070312 L 10.585938 12 L 7.2929688 15.292969 L 8.7070312 16.707031 L 12 13.414062 L 15.292969 16.707031 L 16.707031 15.292969 L 13.414062 12 L 16.707031 8.7070312 L 15.292969 7.2929688 L 12 10.585938 L 8.7070312 7.2929688 z'></path>
        </svg>
      </div>
      <p class="ignored-url-warnning" id='ignored_url_warnning_${newUrlIndex}'></p>
    </div>` );

  $(`#remove_url_${newUrlIndex}`).on('click', function() {
    const currentUrlIndex = $(this).attr('id').split('remove_url_')[1];
    $(`#url_row_${currentUrlIndex}`).remove();
  });
  $(`#txt_ignored_urls_${newUrlIndex}`).attr('placeholder', chrome.i18n.getMessage("pd_ignored_url_placeholder"));
}

var checkIfUrlValid = function (urlElements) {
  let returnVal = {
    empty: [],
    duplicated: [],
    invalid: []
  };

  const seen = new Map();
  urlElements.forEach((value, index) => {
    // check empty urls
    if (!value.url) {
      returnVal.empty.push(index);
      return;
    }

    // check invalid urls
    if (!isValidURL(value.url)) {
      returnVal.invalid.push(index);
      return;
    };

    // check duplicated urls
    let purifiedUrl_1 = value.url.includes('https://') ? value.url.split('https://')[1] : value.url;
    let purifiedUrl_2 = purifiedUrl_1.includes('http://') ? purifiedUrl_1.split('http://')[1] : purifiedUrl_1;
    const last10Chars = purifiedUrl_2.substr(purifiedUrl_2.length - 10);
    if (seen.has(last10Chars)) {
      // If the value is already seen, add both the first occurrence index and the current index
      const firstIndex = seen.get(last10Chars);
      if (!returnVal.duplicated.includes(firstIndex)) {
        returnVal.duplicated.push(firstIndex);
      }
      returnVal.duplicated.push(index);
    } else {
      // Store the index of the first occurrence of the value
      seen.set(last10Chars, index);
    }
  });

  return returnVal;
}

var isValidURL = function (string) {
  try {
    new URL(string);
    return true;
  } catch (error) {
    if (!string.includes('https://') && !string.includes('http://')) {
      // it should return true for www.<domain>.<tld> or <domain>.<tld>
      const regex1 = /^(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
      if (regex1.test(string)) return true;

      // it should return true for ip address
      const regex2 = /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])$/;
      if (regex2.test(string)) return true;
    }
    return false;
  }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.msg === "onClientState") {
    if (
      (request.data.version != "V12" && request.data.version != "V14") ||
      request.data.value.clientState == "ready"
    ) {
      $("#client_state").html("Ready");
      $("#client_state").removeClass("offline");
    } else {
      $("#client_state").html(request.data.value.clientState);
      $("#client_state").addClass("offline");
    }
  }
});
