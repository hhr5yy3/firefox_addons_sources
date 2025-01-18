

/////////////////////////

// Version 1.0

// In Gmail message details

////////////////////////

APIURL = 'https://app.emailtracker.cc/api';
WEBURL = 'https://app.emailtracker.cc';
IMAGEURL = 'https://app.emailtracker.cc/images';
track_link_class = '';
visible_class = '';
// $(
//   '<link rel="stylesheet" type="text/css" href="' +
//   WEBURL +
//   '/css/extension.css" >'
// ).appendTo("head");

$(
  '<link rel="stylesheet" type="text/css" href="' +
  WEBURL +
  '/css/jquery.modal.css" >'
).appendTo("head");
window.showMenu = 0; // global var


$("<div class='rebump_menu_InboxSDK' style='display: none'></div>").appendTo(
  "body"
);

$("<div class='jboxTooltipContent' style='display: none'></div>").appendTo(
  "body"
);
// new Modal 


InboxSDK.load(2, "sdk_Rebump_0a9d411433").then(function (sdk) {


  var all_data_array = [];
  window.custom_track_feature = false;
  window.set_tracking = 0;

  var uid = sdk.User.getEmailAddress();
  update_default();
  async function update_default() {

    var tacker_type = await get_storage("tracker_type");
    if (!tacker_type) {

      set_storage({ tracker_type: "1" })
    }
  }
  function findReadTimesByThreadId(threadId) {
    for (var i = 0; i < all_data_array.length; i++) {
      if (all_data_array[i].thread_id === threadId) {
        return {
          first_read: all_data_array[i].first_read,
          latest_read: all_data_array[i].latest_read,
          link_visited: all_data_array[i].link_visited,
          first_read_country: all_data_array[i].first_read_country,
          first_read_device: all_data_array[i].first_read_device,
          latest_read_country: all_data_array[i].latest_read_country,
          latest_read_device: all_data_array[i].latest_read_device
        };
      }
    }
    return null; // If no match found
  }
  function UpdateReadTimesByThreadId(threadId, response) {
    for (var i = 0; i < all_data_array.length; i++) {
      if (all_data_array[i].thread_id == threadId) {
        all_data_array[i] = response;
      }
      else {
        var already_exist = all_data_array.find((item) => { return item.thread_id === threadId });
        if (!already_exist) {
          all_data_array.push(response)
        }
      }
    }
    return null; // If no match found
  }

  // throttle the request in multiple time in a 5 seconds.
  let lastUpdateTimestamp = 0;
  let throttleInterval = 2000;

  async function UpdateInformationDataFromApi(threadId) {

    const currentTime = new Date().getTime();
    if (currentTime - lastUpdateTimestamp >= throttleInterval) {
      lastUpdateTimestamp = currentTime;
      await callApi(threadId);
    }
  }

  async function callApi(threadId) {
    try {
      const response = await $.ajax({
        async: true,
        crossDomain: true,
        url: APIURL + "/get_email_details?id=" + threadId,
        method: "POST"
      });
      UpdateReadTimesByThreadId(threadId, response);
    } catch (error) {
    }
  }

  async function UpdateMenu() {

  }

  window.tracker_status = "";
  window.progressWidth = 0;
  window.links_status = 0;

  /////////////////////
  //       Tracker Menu
  /////////////////////
  sdk.Toolbars.addToolbarButtonForApp({
    title: "",
    iconUrl: IMAGEURL + '/email_tracker.png',
    arrowColor: "#dd3636",
    onClick: function (event) {
      var tracker_checked = user_setting_detail.tracker_enabled == 1 ? 'checked' : '';
      var default_checked = user_setting_detail.default_enabled == 1 ? 'checked' : '';
      var notification_checked = user_setting_detail.notifications == 1 ? 'checked' : '';
      var invisible_checked = user_setting_detail.invisible_tracker == 1 ? 'checked' : '';
      var link_checked = user_setting_detail.link_tracker == 1 ? 'checked' : '';
      var checkbox_disabled = user_setting_detail.plan_name == 'free' ? '' : '';
      var plan_class = user_setting_detail.plan_name == 'free' ? 'show_upgrade_account' : '';
      if (user_setting_detail.tracker_enabled == 1) {

        if (tracker_status) {
          links_status = 20 - Number(tracker_status.available);
        }
        else {
          links_status = 20;

        }
        if (tracker_status.useable) {
          var show_track = 'block';
        }
        else {
          var show_track = 'none';
        }

        window.progressWidth = (links_status / 20) * 100; // Calculate the percentage
        if (user_setting_detail.plan_name == 'free') {
          $(".rebump_menu_InboxSDK").html(
            '<div class="wrapper">' +
            '<div class="logo"><img src="' + IMAGEURL + '/emailtracker_white_new.svg"></div>' +
            '<div class="content-box">' +
            '<div class="second_child_content redirect_dashboard">' +
            '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">' +
            '<path d="M8.00004 1.33331C11.6819 1.33331 14.6667 4.31808 14.6667 7.99998C14.6667 11.6818 11.6819 14.6666 8.00004 14.6666C4.31814 14.6666 1.33337 11.6818 1.33337 7.99998C1.33337 4.31808 4.31814 1.33331 8.00004 1.33331ZM8.00004 2.66665C5.05452 2.66665 2.66671 5.05446 2.66671 7.99998C2.66671 10.9455 5.05452 13.3333 8.00004 13.3333C10.9456 13.3333 13.3334 10.9455 13.3334 7.99998C13.3334 5.05446 10.9456 2.66665 8.00004 2.66665ZM8.00004 3.33331C8.67871 3.33331 9.32351 3.47819 9.90531 3.73869L8.86364 4.77961C8.58817 4.70593 8.29871 4.66665 8.00004 4.66665C6.15909 4.66665 4.66671 6.15903 4.66671 7.99998C4.66671 8.92045 5.0398 9.75378 5.64302 10.357L4.70021 11.2998L4.59634 11.1926C3.81309 10.3578 3.33337 9.23498 3.33337 7.99998C3.33337 5.42265 5.42271 3.33331 8.00004 3.33331ZM12.2616 6.09539C12.522 6.67698 12.6667 7.32158 12.6667 7.99998C12.6667 9.28865 12.1444 10.4553 11.2998 11.2998L10.357 10.357C10.9603 9.75378 11.3334 8.92045 11.3334 7.99998C11.3334 7.70131 11.2941 7.41185 11.2204 7.13638L12.2616 6.09539ZM10.8284 4.22875L11.7713 5.17155L9.28837 7.65531C9.31771 7.76525 9.33337 7.88078 9.33337 7.99998C9.33337 8.73638 8.73644 9.33331 8.00004 9.33331C7.26364 9.33331 6.66671 8.73638 6.66671 7.99998C6.66671 7.26358 7.26364 6.66665 8.00004 6.66665C8.11924 6.66665 8.23477 6.68231 8.34471 6.71165L10.8284 4.22875Z" fill="#1A85E4"/>' +
            '</svg>' +
            '<p class="">Dashboard</p>' +
            '</div>' +
            '<div class="third_child_div">' +
            '<h2>Settings</h2>' +
            '<div class="custom-toggle"><p>Email tracker enabled</p><div class="check-box"><input type="checkbox" class="compose_checkbox setting_checkbox change" id="tracker_enabled" name="tracker" ' + tracker_checked + '></div></div>' +
            '<div class="custom-toggle"><p>Track emails by default</p><div class="check-box"><input type="checkbox" class="compose_checkbox setting_checkbox change" name="default" id="default_email" ' + default_checked + '></div></div>' +
            '<div class="custom-toggle"><p>Chrome notifications<span>Pro</span></p><div class="check-box"><input type="checkbox" class="compose_checkbox setting_checkbox change pro_checkbox ' + plan_class + '" name="notification" id="notification" ' + notification_checked + checkbox_disabled + '></div></div>' +
            '<div class="custom-toggle"><p>Invisible tracker<span>Pro</span></p><div class="check-box"><input type="checkbox" name="invisible" class="compose_checkbox setting_checkbox change pro_checkbox ' + plan_class + '" id="invisible_tracker" ' + invisible_checked + checkbox_disabled + '></div></div>' +
            '<div class="custom-toggle"><p>Link tracker<span>Pro</span></p><div class="check-box"><input type="checkbox" class="compose_checkbox setting_checkbox change pro_checkbox ' + plan_class + '" name="link" id="link_tracker" ' + link_checked + checkbox_disabled + '></div></div>' +
            '<div>' +
            '</div>' +
            '</div>' +
            '<div class="fourth_child_content">' +
            '<p class="timezone_change"><img src="' + IMAGEURL + '/timezone_icon.svg" > Timezone</p>' +
            '<p class="help_support"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">' +
            '<path d="M3.84192 11.3333H13.3334V3.33333H2.66671V12.2567L3.84192 11.3333ZM4.30307 12.6667L1.33337 15V2.66667C1.33337 2.29848 1.63185 2 2.00004 2H14C14.3682 2 14.6667 2.29848 14.6667 2.66667V12C14.6667 12.3682 14.3682 12.6667 14 12.6667H4.30307ZM7.33337 9.33333H8.66671V10.6667H7.33337V9.33333ZM5.71158 5.87564C5.92429 4.80613 6.86804 4 8.00004 4C9.28871 4 10.3334 5.04467 10.3334 6.33333C10.3334 7.622 9.28871 8.66667 8.00004 8.66667H7.33337V7.33333H8.00004C8.55231 7.33333 9.00004 6.8856 9.00004 6.33333C9.00004 5.78105 8.55231 5.33333 8.00004 5.33333C7.51491 5.33333 7.11044 5.67882 7.01924 6.13718L5.71158 5.87564Z" fill="#1A85E4"/>' +
            '</svg>Help & Support</p>' +
            '<p class="account_setting"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">' +
            '<g clip-path="url(#clip0_44_486)">' +
            '<path d="M5.79157 2.66673L7.52933 0.928999C7.78967 0.668646 8.21173 0.668646 8.47213 0.928999L10.2099 2.66673H12.6674C13.0355 2.66673 13.3341 2.96521 13.3341 3.3334V5.79093L15.0718 7.52868C15.3321 7.78901 15.3321 8.21115 15.0718 8.47148L13.3341 10.2092V12.6667C13.3341 13.0349 13.0355 13.3334 12.6674 13.3334H10.2099L8.47213 15.0711C8.21173 15.3315 7.78967 15.3315 7.52933 15.0711L5.79157 13.3334H3.33404C2.96585 13.3334 2.66737 13.0349 2.66737 12.6667V10.2092L0.92964 8.47148C0.669287 8.21115 0.669287 7.78901 0.92964 7.52868L2.66737 5.79093V3.3334C2.66737 2.96521 2.96585 2.66673 3.33404 2.66673H5.79157ZM4.00071 4.00007V6.34321L2.34385 8.00008L4.00071 9.65695V12.0001H6.34385L8.00073 13.6569L9.65753 12.0001H12.0007V9.65695L13.6575 8.00008L12.0007 6.34321V4.00007H9.65753L8.00073 2.34321L6.34385 4.00007H4.00071ZM8.00073 10.6667C6.52795 10.6667 5.33404 9.47281 5.33404 8.00008C5.33404 6.52731 6.52795 5.3334 8.00073 5.3334C9.47347 5.3334 10.6674 6.52731 10.6674 8.00008C10.6674 9.47281 9.47347 10.6667 8.00073 10.6667ZM8.00073 9.33341C8.73707 9.33341 9.33407 8.73648 9.33407 8.00008C9.33407 7.26368 8.73707 6.66675 8.00073 6.66675C7.26433 6.66675 6.6674 7.26368 6.6674 8.00008C6.6674 8.73648 7.26433 9.33341 8.00073 9.33341Z" fill="#1A85E4"/>' +
            '</g>' +
            '+<defs><clipPath id="clip0_44_486"><rect width="16" height="16" fill="white"/></clipPath></defs></svg>Account & Settings</p>' +
            '</div>' +
            '<div class="last_child_div">' +
            '<div style="display:' + show_track + '">' +
            '<p>20 Free Invisible Tracker Emails: <b><span class="link_count">' + links_status + '</span>/20</b></p>' +
            '<div class="links_progress" ><div class="total"><div class="filled" style="width:' + progressWidth + '%"></div></div></div>' +
            '</div>' +
            // '<p>You’re currently on the FREE plan</p>' +
            '<button class="show_upgrade_account white_hover">UPGRADE TO PRO</button>' +
            '</div>' +
            '</div>' +
            '</div>'
          );
        }
        else {
          $(".rebump_menu_InboxSDK").html(
            '<div class="wrapper">' +
            '<div class="logo"><img src="' + IMAGEURL + '/emailtracker_white_new.svg"> <span class="image_side_pro">Pro</span> </div>' +
            '<div class="content-box">' +
            '<div class="second_child_content redirect_dashboard">' +
            '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">' +
            '<path d="M8.00004 1.33331C11.6819 1.33331 14.6667 4.31808 14.6667 7.99998C14.6667 11.6818 11.6819 14.6666 8.00004 14.6666C4.31814 14.6666 1.33337 11.6818 1.33337 7.99998C1.33337 4.31808 4.31814 1.33331 8.00004 1.33331ZM8.00004 2.66665C5.05452 2.66665 2.66671 5.05446 2.66671 7.99998C2.66671 10.9455 5.05452 13.3333 8.00004 13.3333C10.9456 13.3333 13.3334 10.9455 13.3334 7.99998C13.3334 5.05446 10.9456 2.66665 8.00004 2.66665ZM8.00004 3.33331C8.67871 3.33331 9.32351 3.47819 9.90531 3.73869L8.86364 4.77961C8.58817 4.70593 8.29871 4.66665 8.00004 4.66665C6.15909 4.66665 4.66671 6.15903 4.66671 7.99998C4.66671 8.92045 5.0398 9.75378 5.64302 10.357L4.70021 11.2998L4.59634 11.1926C3.81309 10.3578 3.33337 9.23498 3.33337 7.99998C3.33337 5.42265 5.42271 3.33331 8.00004 3.33331ZM12.2616 6.09539C12.522 6.67698 12.6667 7.32158 12.6667 7.99998C12.6667 9.28865 12.1444 10.4553 11.2998 11.2998L10.357 10.357C10.9603 9.75378 11.3334 8.92045 11.3334 7.99998C11.3334 7.70131 11.2941 7.41185 11.2204 7.13638L12.2616 6.09539ZM10.8284 4.22875L11.7713 5.17155L9.28837 7.65531C9.31771 7.76525 9.33337 7.88078 9.33337 7.99998C9.33337 8.73638 8.73644 9.33331 8.00004 9.33331C7.26364 9.33331 6.66671 8.73638 6.66671 7.99998C6.66671 7.26358 7.26364 6.66665 8.00004 6.66665C8.11924 6.66665 8.23477 6.68231 8.34471 6.71165L10.8284 4.22875Z" fill="#1A85E4"/>' +
            '</svg>' +
            '<p class="">Dashboard</p>' +
            '</div>' +
            '<div class="third_child_div">' +
            '<h2>Settings</h2>' +
            '<div class="custom-toggle"><p>Email tracker enabled</p><div class="check-box"><input type="checkbox" class="compose_checkbox setting_checkbox change" id="tracker_enabled" name="tracker" ' + tracker_checked + '></div></div>' +
            '<div class="custom-toggle"><p>Track emails by default</p><div class="check-box"><input type="checkbox" class="compose_checkbox setting_checkbox change" name="default" id="default_email" ' + default_checked + '></div></div>' +
            '<div class="custom-toggle"><p>Chrome notifications</p><div class="check-box"><input type="checkbox" class="compose_checkbox setting_checkbox change pro_checkbox ' + plan_class + '" name="notification" id="notification" ' + notification_checked + checkbox_disabled + '></div></div>' +
            '<div class="custom-toggle"><p>Invisible tracker</p><div class="check-box"><input type="checkbox" name="invisible" class="compose_checkbox setting_checkbox change pro_checkbox ' + plan_class + '" id="invisible_tracker" ' + invisible_checked + checkbox_disabled + '></div></div>' +
            '<div class="custom-toggle"><p>Link tracker</p><div class="check-box"><input type="checkbox" class="compose_checkbox setting_checkbox change pro_checkbox ' + plan_class + '" name="link" id="link_tracker" ' + link_checked + checkbox_disabled + '></div></div>' +
            '<div>' +
            '</div>' +
            '</div>' +
            '<div class="fourth_child_content">' +
            '<p class="timezone_change"><img src="' + IMAGEURL + '/timezone_icon.svg"> Timezone</p>' +
            '<p class="help_support"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">' +
            '<path d="M3.84192 11.3333H13.3334V3.33333H2.66671V12.2567L3.84192 11.3333ZM4.30307 12.6667L1.33337 15V2.66667C1.33337 2.29848 1.63185 2 2.00004 2H14C14.3682 2 14.6667 2.29848 14.6667 2.66667V12C14.6667 12.3682 14.3682 12.6667 14 12.6667H4.30307ZM7.33337 9.33333H8.66671V10.6667H7.33337V9.33333ZM5.71158 5.87564C5.92429 4.80613 6.86804 4 8.00004 4C9.28871 4 10.3334 5.04467 10.3334 6.33333C10.3334 7.622 9.28871 8.66667 8.00004 8.66667H7.33337V7.33333H8.00004C8.55231 7.33333 9.00004 6.8856 9.00004 6.33333C9.00004 5.78105 8.55231 5.33333 8.00004 5.33333C7.51491 5.33333 7.11044 5.67882 7.01924 6.13718L5.71158 5.87564Z" fill="#1A85E4"/>' +
            '</svg>Help & Support</p>' +
            '<p class="account_setting"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">' +
            '<g clip-path="url(#clip0_44_486)">' +
            '<path d="M5.79157 2.66673L7.52933 0.928999C7.78967 0.668646 8.21173 0.668646 8.47213 0.928999L10.2099 2.66673H12.6674C13.0355 2.66673 13.3341 2.96521 13.3341 3.3334V5.79093L15.0718 7.52868C15.3321 7.78901 15.3321 8.21115 15.0718 8.47148L13.3341 10.2092V12.6667C13.3341 13.0349 13.0355 13.3334 12.6674 13.3334H10.2099L8.47213 15.0711C8.21173 15.3315 7.78967 15.3315 7.52933 15.0711L5.79157 13.3334H3.33404C2.96585 13.3334 2.66737 13.0349 2.66737 12.6667V10.2092L0.92964 8.47148C0.669287 8.21115 0.669287 7.78901 0.92964 7.52868L2.66737 5.79093V3.3334C2.66737 2.96521 2.96585 2.66673 3.33404 2.66673H5.79157ZM4.00071 4.00007V6.34321L2.34385 8.00008L4.00071 9.65695V12.0001H6.34385L8.00073 13.6569L9.65753 12.0001H12.0007V9.65695L13.6575 8.00008L12.0007 6.34321V4.00007H9.65753L8.00073 2.34321L6.34385 4.00007H4.00071ZM8.00073 10.6667C6.52795 10.6667 5.33404 9.47281 5.33404 8.00008C5.33404 6.52731 6.52795 5.3334 8.00073 5.3334C9.47347 5.3334 10.6674 6.52731 10.6674 8.00008C10.6674 9.47281 9.47347 10.6667 8.00073 10.6667ZM8.00073 9.33341C8.73707 9.33341 9.33407 8.73648 9.33407 8.00008C9.33407 7.26368 8.73707 6.66675 8.00073 6.66675C7.26433 6.66675 6.6674 7.26368 6.6674 8.00008C6.6674 8.73648 7.26433 9.33341 8.00073 9.33341Z" fill="#1A85E4"/>' +
            '</g>' +
            '+<defs><clipPath id="clip0_44_486"><rect width="16" height="16" fill="white"/></clipPath></defs></svg>Account & Settings</p>' +
            '</div>' +
            '</div>'
          );
        }
      }



      event.dropdown.el.innerHTML = "<div class='rebump_menu_container'></div>";

      $(".rebump_menu_container").append($(".rebump_menu_InboxSDK").clone());
      $(".rebump_menu_container > .rebump_menu_InboxSDK").show();
    },
  });
  $('<div class="modal" style="display: none;"></div>').prependTo("body");
  // try connecting to emailtracker to see if user has a  account
  chrome.runtime.sendMessage(
    {
      type: "check_account",
      data: {
        email: sdk.User.getEmailAddress(),
      },
    },
    (response) => {
      window.user_setting_detail = JSON.parse(response);

      if (user_setting_detail.ERRORCODE === 200) {
        window.showMenu = 3;
        if (user_setting_detail.tracker_enabled == 0) {
          window.showMenu = 1;
          $('.inboxsdk__button_iconImg').css('filter', 'grayscale(1)');
        }
        else {



          sdk.Lists.registerThreadRowViewHandler(threadRowView => {

            var current_thread_id = '';
            threadRowView.getThreadIDAsync().then(function (id) {
              current_thread_id = id;
            })
            setTimeout(() => {
              $.ajax({
                async: true,
                crossDomain: true,
                url:
                  APIURL + "/get_email_details?id=" + current_thread_id,
                method: "POST",
                success: function (response) {
                  all_data_array.push(response);
                  if (response.thread_id) {
                    if (response.first_read == 'N/A') {
                      threadRowView.addImage({
                        imageUrl: IMAGEURL + '/gmail_label.png',
                        imageClass: 'uncheck_image ' + current_thread_id,
                        attributes: {
                          attributeName: current_thread_id  // Add your attribute here
                        }
                      });
                    }
                    else {
                      threadRowView.addImage({
                        imageUrl: IMAGEURL + '/HoverCheckMarks.svg',
                        imageClass: 'check_image ' + current_thread_id,
                        attributes: {
                          attributeName: current_thread_id  // Add your attribute here
                        }
                      });
                    }
                  }
                },

                error: function () {
                  all_data_array.push({});
                },
              });
              // Add your code to apply label to all threads

              var informationParentHovered = false;
              var information_emptyParentHovered = false;
              var check_imageImageHovered = false;
              setTimeout(() => {
                $(".check_image").hover(
                  async function () {
                    check_imageImageHovered = true;
                    var classes = $(this).attr("class").split(" ");
                    var lastClass = classes[classes.length - 1];
                    var threadIdToFind = lastClass;
                    UpdateInformationDataFromApi(threadIdToFind);
                    var readTimes = findReadTimesByThreadId(threadIdToFind);
                    if (readTimes) {
                      if ($(this).closest("tr").next(".information_parent").length == 0) {
                        if ($(this).closest("tr").prev().length != 0 && $(this).closest("tr").offset().top > 170) {
                          var aboveTop = $(this).closest("tr").offset().top - 150;
                        }
                        else {
                          var aboveTop = 25;
                        }
                        var information_html = `<div class="information_parent" style="top:${aboveTop}px" >
                        <div class="information_child">
                          <div class="information_wrapper">
                              <div class="left-content">
                                <img src="`+ IMAGEURL + `/first_read.png">
                                <p>
                                    Read:
                                    <span>` + readTimes.latest_read + `</span>
                                </p>
                              </div>
                              <div class="right-content"><span>` + readTimes.latest_read_country + `</span><img src="` + IMAGEURL + `/` + readTimes.latest_read_device + `"></div>
                          </div>
                          <div class="information_wrapper">
                              <div class="left-content">
                                <img src="`+ IMAGEURL + `/visit_link.png">
                                <p> Visited link : <span>` + readTimes.link_visited + `</span></p>
                              </div>
                              <div class="right-content">
                                <span>` + readTimes.first_read_country + `</span>
                                <img src="`+ IMAGEURL + `/` + readTimes.first_read_device + `">
                              </div>
                          </div>
                          <div class="information_wrapper">
                              <div class="left-content">
                                <img src="`+ IMAGEURL + `/latest_read.png">
                                <p> First read: <span>` + readTimes.first_read + `</span></p>
                              </div>
                              <div class="right-content">
                                <span>` + readTimes.first_read_country + `</span>
                                <img src="`+ IMAGEURL + `/` + readTimes.first_read_device + `">
                              </div>
                          </div>
                        </div>
                        <a href="`+ WEBURL + `/dashboard" target="_blank" >View more</a>
                      </div>`;

                        $(this).closest("tr").after(information_html);
                        var parent = $(this).closest("tr").next(".information_parent");
                        parent.mouseenter(function (e) {
                          e.stopPropagation();
                          $(".information_parent").hide();
                          $(this).show();
                        });
                        parent.mouseleave(function () {
                          $(this).remove();
                        });
                      }
                      else {
                        $(this).closest("tr").next(".information_parent").show();
                      }
                    }
                  },
                  function () {
                    $(this).closest("tr").next(".information_parent").hide();
                    uncheckImageHovered = false;
                  }
                );
                var uncheckImageHovered = false;

                $(".uncheck_image").hover(
                  function () {
                    if ($(this).closest("tr").next(".information_empty").length == 0) {
                      uncheckImageHovered = true;
                      if ($(this).closest("tr").prev().length != 0 && $(this).closest("tr").offset().top > 170) {
                        var aboveTop = $(this).closest("tr").offset().top - 145;
                      }
                      else {
                        var aboveTop = 30;
                      }
                      var information_html = `<div class="information_empty" style="top:${aboveTop}px" >
                        <p>Email was delivered, <br> but not opened yet</p>
                      </div>`;
                      $(this).closest("tr").after(information_html);
                      var parent = $(this).closest("tr").next(".information_empty")
                      parent.mouseenter(function (e) {
                        e.stopPropagation();
                        $(".information_empty").hide();
                        $(this).show();
                      });
                      parent.mouseleave(function () {
                        $(this).hide();
                      });
                    }
                    else {
                      $(this).closest("tr").next(".information_empty").show();
                    }
                  },
                  function () {
                    $(this).closest("tr").next(".information_empty").hide();
                    uncheckImageHovered = false;
                  }
                );
              }, 1500);


            }, 900); // add delay to load the image


          });
        }
        loadMenu();
        setTimeout(() => {
          $('#tracker_enabled').prop("checked", user_setting_detail.tracker_enabled == 1);
          $('#invisible_tracker').prop("checked", user_setting_detail.invisible_tracker == 1);
          $('#link_tracker').prop("checked", user_setting_detail.link_tracker == 1);
          $('#notification').prop("checked", user_setting_detail.notifications == 1);
          $('#default_email').prop("checked", user_setting_detail.default_enabled == 1);
        }, 2000);
        if(user_setting_detail.first_time == 1){
          window.open(WEBURL + '/authorized/google', '_blank');
        }
        if (user_setting_detail.onboarding != 1) {
          // Onboarding 1
          $(".modal").html(
            '<div class="dialog dailog-bg link_wrapper onboarding_main_div onborading-first" tabindex="0" role="dialog" aria-labelledby=":y0" style="left: 50%; top: 50%;"id="dialog3" >' +
            '<div class="outer-modal-text">' +
            '<img src="' + IMAGEURL + '/emailtracker_white_new.svg">' +
            '<img src="' + IMAGEURL + '/preview_1.png" style="position:relative !important">' +
            '<h1>Track Emails from Gmail</h1>' +
            '<p>Click the Email Tracker icon when <br>composing emails in Gmail to turn tracking on or off</p>' +
            // '<p>You can click the <u>emailtracker.cc</u> icon when <br>  composing emails in Gmail to turn tracking on or off</p>' +
            '<a href="#" class="onboarding_one white_hover">NEXT</a>' +
            '</div>' +
            '</div>'
          )
          $(".modal").modal();


        }
        if (user_setting_detail.plan_name == 'free') {
          track_link_class = 'insert_link_upgrade';
          visible_class = 'track_link_upgrade';
        }
        else {
          track_link_class = 'track_link_modal';
          visible_class = '';
          if (user_setting_detail.upgrade_popup == 0) {
            $(".modal").html(
              '<div class="dialog dailog-bg link_wrapper pro congratulation-div" tabindex="0" role="dialog" aria-labelledby=":y0" style="left: 50%; top: 50%;"id="dialog3" >' +
              '<div class="outer-modal-text">' +
              '<img class="main-img" src="' + IMAGEURL + '/emailtracker_white_new.svg">' +
              '<img class="center-img" src="' + IMAGEURL + '/upgrade_done.png" style="position:static !important">' +
              '<h1><span>Congratulations!</span> You are now PRO member!</h1>' +
              // '<div class="pro_second_child">' +
              // '<p><img src="' + IMAGEURL + '/Frame39816.png"><span>Unlimited Emails Tracked</span></p>' +
              // '<p><img src="' + IMAGEURL + '/Frame39816.png"><span>emailtracker.cc Signature</span></p>' +
              // '<p><img src="' + IMAGEURL + '/Frame39816.png"><span>Full Tracking History</span></p>' +
              // '<p><img src="' + IMAGEURL + '/Frame39816.png"><span>Email Alerts</span></p>' +
              // '<p><img src="' + IMAGEURL + '/Frame39816.png"><span>Chrome Notifications</span></p>' +
              // '<p><img src="' + IMAGEURL + '/Frame39816.png"><span>Unlimited Link Tracking</span></p>' +
              // '<p><img src="' + IMAGEURL + '/Frame39816.png"><span>Advanced Notifications</span></p>' +
              // '<p><img src="' + IMAGEURL + '/Frame39816.png"><span>Team Billing</span></p>' +
              // '</div>' +
              '<div><a href="#" class="payment_onboarding white_hover">BACK TO WORK</a></div>' +
              '</div>' +
              '</div>'
            )
            $(".modal").modal();

            window.open(WEBURL + "/notification.php?user_id=" + user_setting_detail.userId, "_blank")
          }
        }


        runTheExtension();

        //showJoinModal();
      } else if (user_setting_detail.ERRORCODE == 404) {
        // has a tracker account
        window.showMenu = 2;
        loadMenu();
        $.ajax({
          async: true,
          crossDomain: true,
          url:
            APIURL + "/show_popup?email=" + uid,
          method: "GET",
          success: function (check_popup_status) {
            if (check_popup_status == 1) {
              $(".modal").html(
                '<div class="dialog dailog-bg link_wrapper login_popup" tabindex="0" role="dialog" aria-labelledby=":y0" style="left: 50%; top: 50%;">' +
                '<p class="close_modal">X</p>' +
                '<div class="outer-modal-text">' +
                '<img src="' + IMAGEURL + '/emailtracker_white_new.svg">' +
                '<h1 class="enable_text">Enable email tracking for ' + uid + '</h1>' +
                '<a href="#"  class="registered_track_user white_hover">ENABLE EMAIL TRACKER</a>' +
                '<p><span class="login_action remind_later">Remind Me Next Time</span><span class="login_action never_account">Never for this account</span></p>' +
                '</div>' +
                '</div>'
              )
              $(".modal").modal();
            }
          },

          error: function () {
          },
        });
      }
    });


  function generateUniquePixelUrl(recipientEmail) {
    const secretKey = "sadaac151514515"; // Replace with a secure secret key
    const uniqueId = recipientEmail;
    return APIURL + "/insert_visit_link?recipient_email=" + uniqueId + "&user_id=" + user_setting_detail.userId;
  }

  function runTheExtension() {

    sdk.Compose.registerComposeViewHandler(async function (composeView) {

      set_storage({ click_to_remove: false });
      var bodyElement = composeView.getBodyElement();
      if (window.showMenu == 3) {
        await $.ajax({
          async: true,
          crossDomain: true,
          url:
            APIURL + "/free_tacker_status?user_id=" + user_setting_detail.userId,
          method: "POST",
          success: function (response) {
            window.tracker_status = response;
          },

          error: function () {
          },
        });

        var existingSignature = $('.emailtrack_signature', bodyElement);
        var hrefToCheck = "https://www.emailtracker.cc/";

        // Check if any anchor tag has the specified href value
        var anchorWithTagHref = $('a[href="' + hrefToCheck + '"]');

        // If anchor tag found with the specified href value
        if (anchorWithTagHref.length > 0) {
          anchorWithTagHref.parent().parent().parent().parent().parent().parent().find('br').remove();
          anchorWithTagHref.parent().parent().parent().parent().parent().remove();
        }

        var tacker_type = await get_storage("tracker_type");
        if (user_setting_detail.default_enabled == 1 && !existingSignature.length && tacker_type == "1") {
          // If the signature is not present, add it to the body
          var signature = '<br><br><br><br><br>' +
            '<div class="emailtrack_signature" contenteditable="false" g_editable="false">' +
            '<table border="0" cellpadding="8" cellspacing="0" contenteditable="false" g_editable="false" data-signature-template="senderNotified" data-signature-version="11" style="user-select: none;">' +
            '<tbody>' +
            '<tr class="signature_div" style="border: 1px solid gainsboro;display: block;border-radius: 5px;font-size:10px;">' +
            '<td><img class="inboxsdk__button_iconImg signature_image" src="' + IMAGEURL + '/email_tracker.png" style="height: 22px !important;width: auto !important;"></td>' +
            '<td>Sender notified by <br><a href="https://www.emailtracker.cc/" target="_blank" style="">Email Tracker</a></td>' +
            '</tr>' +
            '<tr><td><p class="signature_popup_unpaid" style="color:red;margin:0;cursor:pointer"><u>Click to remove</u></p></td></tr>' +
            '</tbody>' +
            '</table>' +
            '</div>';
          var emailBody = composeView.getHTMLContent();
          emailBody += signature;
          composeView.setBodyHTML(emailBody);
          // Disable the compose view to prevent further editing after the signature
        }
        $("div.AD * td.inboxsdk__compose_actionToolbar.gU").width(48);

        if ($("div").hasClass("inboxsdk__menuContent")) {
          // $('.inboxsdk__composeButton').css('display','none');
          $('.inboxsdk__menuContent').destroy();
        }
        composeView.addButton({
          title: "Email Tracker",
          type: "MODIFIER",
          iconUrl: IMAGEURL + "/email_tracker.png",
          iconClass: "DDButton",
          hasDropdown: true,
          orderHint: 1,
          onClick: async function (event) {
            if (!$(composeView.getBodyElement()).data("ddHTML")) {

              $(".DDButton").find('img').css("filter", 'grayscale(0)')
              var tacker_type = await get_storage("tracker_type");
              var sequncesList = "";
              var visible = tacker_type != "0" ? "checked" : "";
              var invisible = tacker_type == "0" ? "checked" : "";
              var trackShow = tracker_status.useable ? "none" : "";

              trackShow = user_setting_detail.plan_name == "paid" ? "none" : trackShow;
              visible_class = (tracker_status.useable && tracker_status.available != 0) ? "" : visible_class;
              sequncesList = '<div class="DDRow"><div class="compose_menu_text ' + track_link_class + '"><img class="icon_class" src="' + IMAGEURL + '/insert_icon.png">Insert tracked link</div><div class="compose_menu_text"><label for="visible"><img class="icon_class" src="' + IMAGEURL + '/eye.svg">Visible Tracker <input style="float:right;transform:translateY(6px)" type="radio" value="1" class="visible_track_radio" name="check_visible_tracker" id="visible" ' + visible + ' ></div><div class="compose_menu_text"><label for="invisible"><img class="icon_class" src="' + IMAGEURL + '/new_invisible_icon.svg" style="width:18px">Invisible Tracker <input style="float:right;transform:translateY(6px)" type="radio" id="invisible" name="check_visible_tracker" value="0" ' + invisible + ' class="visible_track_radio ' + visible_class + '" ></div> <div class="compose_menu_text" style="display: ' + trackShow + ' "><a href="#" style="color: #1A85E4;" class="invisible_track_modal" ><img class="icon_class" src="' + IMAGEURL + '/invisible_free_icon.png">20 free invisible tracker</a></div></div>';

              var finalHTML =
                "<div class='RebumpDDDiv'><div class='DDRow'></div>" +
                sequncesList +
                "</div>";
              event.dropdown.el.innerHTML = finalHTML;
              var existingSignature = $('.emailtrack_signature', bodyElement);

              var tacker_type = await get_storage("tracker_type");
              if (user_setting_detail.default_enabled == 0 && !existingSignature.length && tacker_type == "1") {
                var signature = '<br><br><br><br><br>' +
                  '<div class="emailtrack_signature" contenteditable="false" g_editable="false">' +
                  '<table border="0" cellpadding="8" cellspacing="0" contenteditable="false" g_editable="false" data-signature-template="senderNotified" data-signature-version="11" style="user-select: none;">' +
                  '<tbody>' +
                  '<tr class="signature_div" style="border: 1px solid gainsboro;display: block;border-radius: 5px;font-size:10px;">' +
                  '<td><img class="inboxsdk__button_iconImg signature_image" src="' + IMAGEURL + '/email_tracker.png" style="height: 22px !important;width: auto !important;"></td>' +
                  '<td>Sender notified by <br><a href="https://www.emailtracker.cc/" target="_blank" style="">Email Tracker</a></td>' +
                  '</tr>' +
                  '<tr><td><p class="signature_popup_unpaid" style="color:red;margin:0;cursor:pointer"><u>Click to remove</u></p></td></tr>' +
                  '</tbody>' +
                  '</table>' +
                  '</div>';
                var emailBody = composeView.getHTMLContent();
                emailBody += signature;
                composeView.setBodyHTML(emailBody);
                window.custom_track_feature = true;
              }
            } else {
              event.dropdown.el.innerHTML = $(
                composeView.getBodyElement()
              ).data("ddHTML");

            }
          }, // End of composeView.addButton onClick
        }); // End of composeView.addButton
        if (user_setting_detail.default_enabled == "0") {
          $(".DDButton").find('img').css("filter", 'grayscale(1)')
        }
        else {
          $(".DDButton").find('img').css("filter", 'grayscale(0)')
        }

        composeView.on("presending", async function (event) {
          subjectElement = composeView.getSubject();
          getTolist = composeView.getToRecipients();
          thread_id = composeView.getThreadID();
          gmail_id = composeView.getDraftID();
          const emailAddressesextract = getTolist.map(recipient => recipient.emailAddress);
          const recipientsString = emailAddressesextract.join(",");
          var signaturePopupUnpaidElement = bodyElement.querySelector('.signature_popup_unpaid');
          var trackHrefElements = bodyElement.querySelectorAll('.track_href');
          var code = '';
          var update_recipientEmail = getTolist[0].emailAddress
          // Check if any elements are found
          if (trackHrefElements.length > 0) {
            // Iterate over each found element
            trackHrefElements.forEach(function (element) {
              // Get the current value of the href attribute
              var href = element.getAttribute('href');
              code = href.split('=')[1];

              $.ajax({
                async: true,
                crossDomain: true,
                url:
                  APIURL + "/insert_recipient?unique_id=" + code + "&recipient_email=" + update_recipientEmail,
                method: "GET",
                success: function (track_link_id) {
                },
                error: function () {
                },
              });

              // Append recipient email at the end of href

              //  href += '&recipient_email=' + update_recipientEmail; // Replace with the actual recipient email
              // Update the href attribute with the modified value
              //  element.setAttribute('href', href);
            });
          }
          if (signaturePopupUnpaidElement) {
            // Remove the element
            signaturePopupUnpaidElement.remove();
          }
          trackerExists = $(bodyElement).find('img[id="emailbot"]').length;
          if (trackerExists) {
          } else {
            if (user_setting_detail.default_enabled == 1 || custom_track_feature) {
              var randomNumber = '';
              for (var i = 0; i < 16; i++) {
                randomNumber += Math.floor(Math.random() * 10);
              }
              pixelHTML = '<img src="' + APIURL + '/insert_visit_link?tracking_pixel=' + randomNumber + '&recipient_email=' + update_recipientEmail + '&user_id=' + user_setting_detail.userId + '" style="display:none">'
              currentMessageBodyHTML = composeView.getHTMLContent();
              currentMessageBodyHTML += pixelHTML
              $.ajax({
                async: true,
                crossDomain: true,
                url:
                  APIURL + "/email_details?user_id=" + user_setting_detail.userId + "&thread_id=" + thread_id + "&link_track_code=" + code + "&email_track_code=" + randomNumber + "&subject=" + subjectElement + "&email=" + update_recipientEmail,
                method: "GET",
                success: function (track_link_id) {
                },
                error: function () {
                },
              });
              composeView.setBodyHTML(currentMessageBodyHTML);
            }
          }


          click_to_remove = await get_storage("click_to_remove");
          var trackedValue = await get_storage("tracker_type");
          if (user_setting_detail.default_enabled == 1 && trackedValue == "0" && user_setting_detail.plan_name == "free") {
            $.ajax({
              async: true,
              crossDomain: true,
              url:
                APIURL + "/free_tacker_debit?user_id=" + user_setting_detail.userId,
              method: "GET",
              success: function (track_link_id) {
                tracker_status.available = track_link_id
                links_status = 20 - track_link_id;
                progressWidth = (links_status / 20) * 100;
                $('.link_count').text(links_status);
                $('.filled').css('width', progressWidth + '%')
              },
              error: function () {
              },
            });

          }
          else if (click_to_remove && user_setting_detail.plan_name == "free") {
            $.ajax({
              async: true,
              crossDomain: true,
              url:
                APIURL + "/free_tacker_debit?user_id=" + user_setting_detail.userId,
              method: "GET",
              success: function (track_link_id) {
                tracker_status.available = track_link_id
                links_status = 20 - track_link_id;
                progressWidth = (links_status / 20) * 100;
                $('.link_count').text(links_status);
                $('.filled').css('width', progressWidth + '%')
              },
              error: function () {
              },
            });
          }

        });
      }
      $(document).on("input", ".href_text", function (e) {
        $('.ok_button').removeAttr('disabled')
        $('.ok_button').css('background', 'rgb(20, 133, 228)');
        $('.ok_button').css('color', '#fff');
      })
      $(document).on("click", ".test_link", function (e) {
        //e.preventDefault();
        var href_text = $('.linkmodal_second_child .href_text').val();
        if (href_text == '') {
          $('.link_error').text('Please enter the URL first')
        }
        else {
          $('.link_error').text('')
          if (!href_text.startsWith('http://') && !href_text.startsWith('https://') && !href_text.startsWith('//')) {
            // If it doesn't start with any of those, prepend '//'
            href_text = '//' + href_text;
          }
          //alert(href_text);
          window.open(href_text, '_blank');
        }
      })
      $(document).on("change", "#linkdialog-onweb-tab-input", function (e) {
        window.gmail_href = $(this).val();
        window.gmail_text = $('#linkdialog-text').val();
      })
      $(document).on("change", "#linkdialog-onweb-tab-input", function (e) {
        window.gmail_text = $('#linkdialog-text').val();
      })
      $(document).on("change", "#track_link_status2", function (e) {
        if (window.set_tracking == 1) {
          window.set_tracking = 0;
        }
        else {
          window.set_tracking = 1;
        }
      })
      $(document).on("click", ".J-at1-auR", function (e) {
        var display_text = gmail_text;
        var href_text = gmail_href;
        if (!href_text.startsWith('http://') && !href_text.startsWith('https://') && !href_text.startsWith('//')) {
          // If it doesn't start with any of those, prepend '//'
          href_text = '//' + href_text;
        }
        var checkbox = $("#track_link_status2");
        // Check if the checkbox is checked
        if (set_tracking == 1 && user_setting_detail.plan_name == 'paid') {
          $.ajax({
            async: true,
            crossDomain: true,
            url:
              APIURL + "/insert_user_track_link?user_id=" + user_setting_detail.userId + "&display_text=" + display_text + "&href_text=" + href_text,
            method: "GET",
            success: function (track_link_id) {
              setTimeout(function () {
                href = 'https://tracking.ohhey.co/?code=' + track_link_id;
                var emailBody = composeView.getBodyElement();
                $(emailBody).find('a').each(function () {
                  var $anchor = $(this);
                  var parts = $anchor.attr('href').split("//");
                  var textAfterDoubleSlash = parts[1].trim();
                  var parts_new = href_text.split("//");
                  var textAfterSlash = parts_new[1].trim();
                  if ($anchor.text() == display_text && textAfterDoubleSlash == textAfterSlash) {
                    $anchor.attr('href', href);
                    $anchor.addClass('track_href');
                  }
                });

                // Set the modified HTML content back to the compose view
                composeView.setBodyHTML(emailBody.innerHTML);
              }, 2000)
            },
            error: function () {
            },
          });
        } else {
          $.modal.close();
          trackerHTML = `<p><a href='${href_text}' target="_blank">${display_text}</a></p>`;
          var linkContent =
            composeView.insertHTMLIntoBodyAtCursor(trackerHTML);
        }
      })
      $(document).on("click", ".ok_button", function (e) {
        var display_text = $('.linkmodal_second_child .display_text').val();
        var href_text = $('.linkmodal_second_child .href_text').val();
        if (display_text == '') {
          $('.link_error').text('Please enter the text first')
        }
        else if (href_text == '') {
          $('.link_error').text('Please enter the URL first')
        }
        else {
          $('.link_error').text('')

          if (!href_text.startsWith('http://') && !href_text.startsWith('https://') && !href_text.startsWith('//')) {
            // If it doesn't start with any of those, prepend '//'
            href_text = '//' + href_text;
          }
          var checkbox = $("#track_link_status");

          // Check if the checkbox is checked
          if (checkbox.prop("checked")) {
            $.ajax({
              async: true,
              crossDomain: true,
              url:
                APIURL + "/insert_user_track_link?user_id=" + user_setting_detail.userId + "&display_text=" + display_text + "&href_text=" + href_text,
              method: "GET",
              success: function (track_link_id) {

                $.modal.close();
                //   href = 'https://ohhey.co/api/track_user_link?recipient_email=testemailtrack@mailinator.com&id=' + track_link_id;
                href = 'https://tracking.ohhey.co/?code=' + track_link_id;

                trackerHTML = `<p><a href='${href}' target="_blank" class="track_href">${display_text}</a></p>`;
                var linkContent =
                  composeView.insertHTMLIntoBodyAtCursor(trackerHTML);

              },
              error: function () {
              },
            });
          } else {
            $.modal.close();
            trackerHTML = `<p><a href='${href_text}' target="_blank">${display_text}</a></p>`;
            var linkContent =
              composeView.insertHTMLIntoBodyAtCursor(trackerHTML);
          }
        }
      })
      $(document).on("click", ".track_link_modal", function (e) {
        var highlightext = composeView.getSelectedBodyText();
        $(".modal").html(
          '<div class="dialog  link_wrapper" tabindex="0" role="dialog" aria-labelledby=":y0" style="left: 50%; top: 50%;"id="dialog2" >' +
          '<div class="linkmodal_first_child">' +
          '<p>Edit Link</p>' +
          '</div>' +
          '<div class="linkmodal_second_child">' +
          '<span>Text to display</span><input type="text" class="display_text" value="' + highlightext + '">' +
          '</div>' +
          '<div class="linkmodal_second_child">' +
          '<span>To what URL should this link go?</span>' +
          '<input type="text" class="href_text">' +
          '</div>' +
          '<div class="enable_track_link">' +
          '<p class="test_link" style="color:rgb(129, 124, 252);cursor:pointer"><u>Test this link</u></p>' +
          '<div class="track-toggle">' +
          '<img src="' + IMAGEURL + '/email_tracker.png">' +
          '<span>Track this link</span>' +
          '<div class="check-box"><input type="checkbox" class="compose_checkbox" id="track_link_status" checked></div>' +
          '</div>' +
          '</div>' +
          '<p>' +
          '<b>Not sure what to put in the box?</b> First find the page on the web that you want to link to(A <a href="https://www.google.com/" target="_blank"> search engine</a> might be useful) then the copy the web address from the box in your browsers address bar, and paste it into the box above.' +
          '</p>' +
          '<p><span style="color:red;margin:3px;" class="link_error"></span></p>' +
          '<div class="linkmodal_fourth_child">' +
          '<span class="cancel_button">Cancel</span> <button class="ok_button" disabled>ok</button>' +
          '</div>' +
          '</div>'
        )
        $(".modal").modal();
      })
      $(document).on("click", ".invisible_track_modal", function (e) {
        $(".modal").html(
          '<div class="dialog dailog-bg link_wrapper" tabindex="0" role="dialog" aria-labelledby=":y0" style="left: 50%; top: 50%;"id="dialog3" >' +
          '<div class="outer-modal-text" style="position:relative">' +
          '<p class="close_modal" style="top:4px !important;">X</p>' +
          '<img class="main-img" src="' + IMAGEURL + '/emailtracker_white_new.svg">' +
          '<svg class="center-img" xmlns="http://www.w3.org/2000/svg" width="152" height="152" viewBox="0 0 152 152" fill="none">' +
          '<path d="M76.0041 101.131L102.9 116.186L96.8927 85.9541L119.522 65.0269L88.914 61.3975L76.0041 33.4085V101.131ZM76.0041 115.647L31.3323 140.652L41.3094 90.4394L3.72363 55.6814L54.5616 49.6537L76.0041 3.16669L97.4463 49.6537L148.284 55.6814L110.699 90.4394L120.676 140.652L76.0041 115.647Z" fill="white"/>' +
          '</svg>' +
          '<h1>Free Invisible <br> Tracking Upgrade</h1>' +
          '<p>Leave us a 5-star review and get 20 <br>Invisible Tracker emails for free!</p>' +
          '<a id="give_free_links" class="white_hover">RATE US</a>' +
          '</div>' +
          '</div>'
        )
        $(".modal").modal();
      })
      $(document).on("click", "#give_free_links", function (e) {
        $.ajax({
          async: true,
          crossDomain: true,
          url:
            APIURL + "/free_tacker?user_id=" + user_setting_detail.userId,
          method: "GET",
          success: function (track_link_id) {
          },
          error: function () {
          },
        });
        window.open("https://chromewebstore.google.com/detail/email-tracker-free-email/mmkkkedfpenlibbhepgncmmoclhbaafo", "_blank");
        location.reload();
      });

      $(document).on("click", ".visible_remove_signature", function (e) {
        $('.emailtrack_signature').remove();
      });

      $(document).on("change", ".visible_track_radio", function (e) {
        var trackedValue = $("input[name='check_visible_tracker']:checked").val();
        if (trackedValue == 0) {
          set_storage({ tracker_type: "0" })
          $('.emailtrack_signature').css('display', 'none')
        }
        else {
          set_storage({ tracker_type: "1" })
          var existingSignature = $('.emailtrack_signature', bodyElement);
          if (!existingSignature.length) {
            // If the signature is not present, add it to the body
            var signature = '<br><br><br><br><br>' +
              '<div class="emailtrack_signature" contenteditable="false" g_editable="false">' +
              '<table border="0" cellpadding="8" cellspacing="0" contenteditable="false" g_editable="false" data-signature-template="senderNotified" data-signature-version="11" style="user-select: none;">' +
              '<tbody>' +
              '<tr class="signature_div" style="border: 1px solid gainsboro;display: block;border-radius: 5px;font-size:10px;">' +
              '<td><img class="inboxsdk__button_iconImg signature_image" src="' + IMAGEURL + '/email_tracker.png" style="height: 22px !important;width: auto !important;"></td>' +
              '<td>Sender notified by <br><a href="https://www.emailtracker.cc/" target="_blank" style="">Email Tracker</a></td>' +
              '</tr>' +
              '<tr><td><p class="signature_popup_unpaid" style="color:red;margin:0;cursor:pointer"><u>Click to remove</u></p></td></tr>' +
              '</tbody>' +
              '</table>' +
              '</div>';
            composeView.insertHTMLIntoBodyAtCursor(signature);
          }
          $('.emailtrack_signature').css('display', 'block')
        }
      })

      $(document).on("click", ".signature_popup_unpaid", function (e) {
        if (user_setting_detail.plan_name == 'paid') {
          $('.emailtrack_signature').remove();
          set_storage({ tracker_type: "0" })
          $('#invisible').prop('checked', true);
        }
        else if (tracker_status.useable && tracker_status.available != 0) {
          $('.emailtrack_signature').remove();
          set_storage({ tracker_type: "0" })
          set_storage({ click_to_remove: true });
          $('#invisible').prop('checked', true);
        }
        else {
          $(".modal").html(
            '<div class="dialog dailog-bg link_wrapper" tabindex="0" role="dialog" aria-labelledby=":y0" style="left: 50%; top: 50%;"id="dialog3" >' +
            '<div class="outer-modal-text" style="position:relative;">' +
            '<p class="close_modal" style="top:4px !important;">X</p>' +
            '<img src="' + IMAGEURL + '/emailtracker_white_new.svg">' +
            '<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128" fill="none">' +
            '<path d="M64.0003 0.666687C98.9781 0.666687 127.334 29.022 127.334 64C127.334 98.9777 98.9781 127.333 64.0003 127.333C29.0223 127.333 0.666992 98.9777 0.666992 64C0.666992 29.022 29.0223 0.666687 64.0003 0.666687ZM64.0003 13.3334C36.0179 13.3334 13.3337 36.0176 13.3337 64C13.3337 91.9826 36.0179 114.667 64.0003 114.667C91.9829 114.667 114.667 91.9826 114.667 64C114.667 36.0176 91.9829 13.3334 64.0003 13.3334ZM64.0003 32.3334C81.4892 32.3334 95.667 46.511 95.667 64C95.667 81.4889 81.4892 95.6667 64.0003 95.6667C46.5113 95.6667 32.3337 81.4889 32.3337 64C32.3337 60.7523 32.8225 57.6192 33.7306 54.6698C36.2081 60.1709 41.7404 64 48.167 64C56.9114 64 64.0003 56.9111 64.0003 48.1667C64.0003 41.7401 60.1712 36.2078 54.6707 33.7264C57.6195 32.8222 60.7526 32.3334 64.0003 32.3334Z" fill="white"/>' +
            '</svg>' +
            '<h1>Invisible Tracking in only <br> available to Pro users</h1>' +
            '<p>Remove the Email Tracker signature and <br> get unlimited invisible tracking</p>' +
            '<a href="" >UPGRADE TO PRO</a>' +
            '</div>' +
            '</div>'
          )
          $(".modal").modal();
        }
      })
    }); // sdk.Compose.registerComposeViewHandler
  }
  $(document).on("click", ".registered_track_user", function (e) {
    $.ajax({
      async: true,
      crossDomain: true,
      url:
        APIURL + "/register_user?email=" + uid,
      method: "GET",
      success: function (track_link_id) {
        location.reload();
      },

      error: function () {
      },
    });
  });
  // $(document).on("click", ".save_user_setting", function (e) {

  //   var tracker_enabled = $("#tracker_enabled:checked").val() == 'on' ? 1 : 0;
  //   var default_email = $("#default_email:checked").val() == 'on' ? 1 : 0;
  //   var notification = $("#notification:checked").val() == 'on' ? 1 : 0;
  //   var invisible_tracker = $("#invisible_tracker:checked").val() == 'on' ? 1 : 0;
  //   var link_tracker = $("#link_tracker:checked").val() == 'on' ? 1 : 0;
  //   $.ajax({
  //     async: true,
  //     crossDomain: true,
  //     url:
  //       APIURL + "/update_user",
  //     method: "POST",
  //     data: {
  //       email: uid, // Your POST data goes here
  //       tracker_enabled: tracker_enabled, // Your POST data goes here
  //       default_email: default_email, // Your POST data goes here
  //       notification: notification, // Your POST data goes here
  //       invisible_tracker: invisible_tracker, // Your POST data goes here
  //       link_tracker: link_tracker, // Your POST data goes here
  //     },
  //     success: function (track_link_id) {
  //       location.reload();
  //     },
  //     error: function () {
  //     },
  //   });
  // });
  $(document).on("click", ".never_account", function (e) {
    $.ajax({
      async: true,
      crossDomain: true,
      url:
        APIURL + "/update_popup_status",
      method: "POST",
      data: {
        email: uid, // Your POST data goes here
      },
      success: function (track_link_id) {
        $.modal.close();
      },
      error: function () {
      },
    });
  });
  $(document).on("click", ".remind_later", function (e) {
    $.modal.close();
  });


  $(document).on("change", ".compose_checkbox.setting_checkbox.change", function (e) {
    checkboxName = e.target.name;
    var checkbox = $('input[name="' + checkboxName + '"]');
    if (checkbox.prop("checked")) {
    } else {
      checkbox.removeAttr('checked');
    }
    var tracker_enabled = $("#tracker_enabled:checked").val() == 'on' ? 1 : 0;
    var default_email = $("#default_email:checked").val() == 'on' ? 1 : 0;
    var notification = $("#notification:checked").val() == 'on' ? 1 : 0;
    var invisible_tracker = $("#invisible_tracker:checked").val() == 'on' ? 1 : 0;
    var link_tracker = $("#link_tracker:checked").val() == 'on' ? 1 : 0;
    $.ajax({
      async: true,
      crossDomain: true,
      url:
        APIURL + "/update_user",
      method: "POST",
      data: {
        email: uid, // Your POST data goes here
        tracker_enabled: tracker_enabled, // Your POST data goes here
        default_email: default_email, // Your POST data goes here
        notification: notification, // Your POST data goes here
        invisible_tracker: invisible_tracker, // Your POST data goes here
        link_tracker: link_tracker, // Your POST data goes here
      },
      success: function (track_link_id) {
        //var tracker_checked = user_setting_detail.tracker_enabled == 1 ? 'checked' : '';
        user_setting_detail.tracker_enabled = tracker_enabled;
        user_setting_detail.default_enabled = default_email;
        user_setting_detail.notifications = notification;
        user_setting_detail.invisible_tracker = invisible_tracker;
        user_setting_detail.link_tracker = link_tracker;
        console.log('user_setting_detail', user_setting_detail)
        if (tracker_enabled == 0)
          location.reload();
      },
      error: function () {
      },
    });
  });
  $(document).on("change", ".compose_checkbox.setting_checkbox.enable_tracker", function (e) {
    var tracker_enabled = $("#tracker_enabled:checked").val() == 'on' ? 1 : 0;
    var default_email = $("#default_email:checked").val() == 'on' ? 1 : 0;
    var notification = $("#notification:checked").val() == 'on' ? 1 : 0;
    var invisible_tracker = $("#invisible_tracker:checked").val() == 'on' ? 1 : 0;
    var link_tracker = $("#link_tracker:checked").val() == 'on' ? 1 : 0;
    $.ajax({
      async: true,
      crossDomain: true,
      url:
        APIURL + "/update_user",
      method: "POST",
      data: {
        email: uid, // Your POST data goes here
        tracker_enabled: tracker_enabled, // Your POST data goes here
        default_email: default_email, // Your POST data goes here
        notification: notification, // Your POST data goes here
        invisible_tracker: invisible_tracker, // Your POST data goes here
        link_tracker: link_tracker, // Your POST data goes here
      },
      success: function (track_link_id) {
        location.reload();
      },
      error: function () {
      },
    });
  });



  function loadMenu(i) {
    $.ajax({
      async: true,
      crossDomain: true,
      url:
        APIURL + "/free_tacker_status?user_id=" + user_setting_detail.userId,
      method: "POST",
      success: function (response) {
        window.tracker_status = response;
      },

      error: function () {
      },
    });
    $(document).ready(function () {
      $(".rebump_menu").on("click", function () {
        $(".arrow_box").toggle();
      });
      // close the menu when clicking anywhere on the page
      $("html").click(function () {
        $(".arrow_box").hide();
      });
      $(".rebump_menu").click(function (event) {
        event.stopPropagation();
      });

      if (window.showMenu == 1) {
        $('.inboxsdk__button_iconImg').css('filter', 'grayscale(1)');
        $(".rebump_menu_InboxSDK").append(
          '<div class="wrapper">' +
          '<div class="logo"><img src="' + IMAGEURL + '/emailtracker_white_new.svg"></div>' +
          '<div class="content-box">' +
          '<div class="second_child_content redirect_dashboard">' +
          '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">' +
          '<path d="M8.00004 1.33331C11.6819 1.33331 14.6667 4.31808 14.6667 7.99998C14.6667 11.6818 11.6819 14.6666 8.00004 14.6666C4.31814 14.6666 1.33337 11.6818 1.33337 7.99998C1.33337 4.31808 4.31814 1.33331 8.00004 1.33331ZM8.00004 2.66665C5.05452 2.66665 2.66671 5.05446 2.66671 7.99998C2.66671 10.9455 5.05452 13.3333 8.00004 13.3333C10.9456 13.3333 13.3334 10.9455 13.3334 7.99998C13.3334 5.05446 10.9456 2.66665 8.00004 2.66665ZM8.00004 3.33331C8.67871 3.33331 9.32351 3.47819 9.90531 3.73869L8.86364 4.77961C8.58817 4.70593 8.29871 4.66665 8.00004 4.66665C6.15909 4.66665 4.66671 6.15903 4.66671 7.99998C4.66671 8.92045 5.0398 9.75378 5.64302 10.357L4.70021 11.2998L4.59634 11.1926C3.81309 10.3578 3.33337 9.23498 3.33337 7.99998C3.33337 5.42265 5.42271 3.33331 8.00004 3.33331ZM12.2616 6.09539C12.522 6.67698 12.6667 7.32158 12.6667 7.99998C12.6667 9.28865 12.1444 10.4553 11.2998 11.2998L10.357 10.357C10.9603 9.75378 11.3334 8.92045 11.3334 7.99998C11.3334 7.70131 11.2941 7.41185 11.2204 7.13638L12.2616 6.09539ZM10.8284 4.22875L11.7713 5.17155L9.28837 7.65531C9.31771 7.76525 9.33337 7.88078 9.33337 7.99998C9.33337 8.73638 8.73644 9.33331 8.00004 9.33331C7.26364 9.33331 6.66671 8.73638 6.66671 7.99998C6.66671 7.26358 7.26364 6.66665 8.00004 6.66665C8.11924 6.66665 8.23477 6.68231 8.34471 6.71165L10.8284 4.22875Z" fill="#1A85E4"/>' +
          '</svg>' +
          '<p class="">Dashboard</p>' +
          '</div>' +
          '<div class="third_child_div">' +
          '<h2>Settings</h2>' +
          '<div class="custom-toggle"><p>Email tracker enabled</p><div class="check-box"><input type="checkbox" class="compose_checkbox setting_checkbox enable_tracker" id="tracker_enabled"></div></div>' +
          '<div>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>'
        );
      } else if (window.showMenu == 2) {
        $(".rebump_menu_InboxSDK").append(
          '<div class="wrapper">' +
          '<div class="logo"><img src="' + IMAGEURL + '/emailtracker_white_new.svg"></div>' +
          '<div class="content-box">' +
          '<div class="second_child_div" style="margin:20px">' +
          '<button class="registered_track_user white_hover">Enable Extension</button>' +
          '</div>' +
          '</div>' +
          '</div>'
        );
      } else {
        if (tracker_status) {
          links_status = 20 - Number(tracker_status.available);
        }
        else {
          links_status = 20;

        }
        if (tracker_status.useable) {
          var show_track = 'block';
        }
        else {
          var show_track = 'none';
        }

        progressWidth = (links_status / 20) * 100; // Calculate the percentage

        $('.inboxsdk__button_iconImg').css('filter', 'grayscale(0)');
        var tracker_checked = user_setting_detail.tracker_enabled == 1 ? 'checked' : '';
        var default_checked = user_setting_detail.default_enabled == 1 ? 'checked' : '';
        var notification_checked = user_setting_detail.notifications == 1 ? 'checked' : '';
        var invisible_checked = user_setting_detail.invisible_tracker == 1 ? 'checked' : '';
        var link_checked = user_setting_detail.link_tracker == 1 ? 'checked' : '';
        var checkbox_disabled = user_setting_detail.plan_name == 'free' ? '' : '';
        var plan_class = user_setting_detail.plan_name == 'free' ? 'show_upgrade_account' : '';
        console.log('new', user_setting_detail);
        if (user_setting_detail.plan_name == 'free') {
          $(".rebump_menu_InboxSDK").append(
            '<div class="wrapper">' +
            '<div class="logo"><img src="' + IMAGEURL + '/emailtracker_white_new.svg"></div>' +
            '<div class="content-box">' +
            '<div class="second_child_content redirect_dashboard">' +
            '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">' +
            '<path d="M8.00004 1.33331C11.6819 1.33331 14.6667 4.31808 14.6667 7.99998C14.6667 11.6818 11.6819 14.6666 8.00004 14.6666C4.31814 14.6666 1.33337 11.6818 1.33337 7.99998C1.33337 4.31808 4.31814 1.33331 8.00004 1.33331ZM8.00004 2.66665C5.05452 2.66665 2.66671 5.05446 2.66671 7.99998C2.66671 10.9455 5.05452 13.3333 8.00004 13.3333C10.9456 13.3333 13.3334 10.9455 13.3334 7.99998C13.3334 5.05446 10.9456 2.66665 8.00004 2.66665ZM8.00004 3.33331C8.67871 3.33331 9.32351 3.47819 9.90531 3.73869L8.86364 4.77961C8.58817 4.70593 8.29871 4.66665 8.00004 4.66665C6.15909 4.66665 4.66671 6.15903 4.66671 7.99998C4.66671 8.92045 5.0398 9.75378 5.64302 10.357L4.70021 11.2998L4.59634 11.1926C3.81309 10.3578 3.33337 9.23498 3.33337 7.99998C3.33337 5.42265 5.42271 3.33331 8.00004 3.33331ZM12.2616 6.09539C12.522 6.67698 12.6667 7.32158 12.6667 7.99998C12.6667 9.28865 12.1444 10.4553 11.2998 11.2998L10.357 10.357C10.9603 9.75378 11.3334 8.92045 11.3334 7.99998C11.3334 7.70131 11.2941 7.41185 11.2204 7.13638L12.2616 6.09539ZM10.8284 4.22875L11.7713 5.17155L9.28837 7.65531C9.31771 7.76525 9.33337 7.88078 9.33337 7.99998C9.33337 8.73638 8.73644 9.33331 8.00004 9.33331C7.26364 9.33331 6.66671 8.73638 6.66671 7.99998C6.66671 7.26358 7.26364 6.66665 8.00004 6.66665C8.11924 6.66665 8.23477 6.68231 8.34471 6.71165L10.8284 4.22875Z" fill="#1A85E4"/>' +
            '</svg>' +
            '<p class="">Dashboard</p>' +
            '</div>' +
            '<div class="third_child_div">' +
            '<h2>Settings</h2>' +
            '<div class="custom-toggle"><p>Email tracker enabled</p><div class="check-box"><input type="checkbox" class="compose_checkbox setting_checkbox change" id="tracker_enabled" name="tracker" ' + tracker_checked + '></div></div>' +
            '<div class="custom-toggle"><p>Track emails by default</p><div class="check-box"><input type="checkbox" class="compose_checkbox setting_checkbox change" name="default" id="default_email" ' + default_checked + '></div></div>' +
            '<div class="custom-toggle"><p>Chrome notifications<span>Pro</span></p><div class="check-box"><input type="checkbox" class="compose_checkbox setting_checkbox change pro_checkbox ' + plan_class + '" name="notification" id="notification" ' + notification_checked + checkbox_disabled + '></div></div>' +
            '<div class="custom-toggle"><p>Invisible tracker<span>Pro</span></p><div class="check-box"><input type="checkbox" name="invisible" class="compose_checkbox setting_checkbox change pro_checkbox ' + plan_class + '" id="invisible_tracker" ' + invisible_checked + checkbox_disabled + '></div></div>' +
            '<div class="custom-toggle"><p>Link tracker<span>Pro</span></p><div class="check-box"><input type="checkbox" class="compose_checkbox setting_checkbox change pro_checkbox ' + plan_class + '" name="link" id="link_tracker" ' + link_checked + checkbox_disabled + '></div></div>' +
            '<div>' +
            '</div>' +
            '</div>' +
            '<div class="fourth_child_content">' +
            '<p class="timezone_change"><img src="' + IMAGEURL + '/timezone_icon.svg" > Timezone</p>' +
            '<p class="help_support"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">' +
            '<path d="M3.84192 11.3333H13.3334V3.33333H2.66671V12.2567L3.84192 11.3333ZM4.30307 12.6667L1.33337 15V2.66667C1.33337 2.29848 1.63185 2 2.00004 2H14C14.3682 2 14.6667 2.29848 14.6667 2.66667V12C14.6667 12.3682 14.3682 12.6667 14 12.6667H4.30307ZM7.33337 9.33333H8.66671V10.6667H7.33337V9.33333ZM5.71158 5.87564C5.92429 4.80613 6.86804 4 8.00004 4C9.28871 4 10.3334 5.04467 10.3334 6.33333C10.3334 7.622 9.28871 8.66667 8.00004 8.66667H7.33337V7.33333H8.00004C8.55231 7.33333 9.00004 6.8856 9.00004 6.33333C9.00004 5.78105 8.55231 5.33333 8.00004 5.33333C7.51491 5.33333 7.11044 5.67882 7.01924 6.13718L5.71158 5.87564Z" fill="#1A85E4"/>' +
            '</svg>Help & Support</p>' +
            '<p class="account_setting"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">' +
            '<g clip-path="url(#clip0_44_486)">' +
            '<path d="M5.79157 2.66673L7.52933 0.928999C7.78967 0.668646 8.21173 0.668646 8.47213 0.928999L10.2099 2.66673H12.6674C13.0355 2.66673 13.3341 2.96521 13.3341 3.3334V5.79093L15.0718 7.52868C15.3321 7.78901 15.3321 8.21115 15.0718 8.47148L13.3341 10.2092V12.6667C13.3341 13.0349 13.0355 13.3334 12.6674 13.3334H10.2099L8.47213 15.0711C8.21173 15.3315 7.78967 15.3315 7.52933 15.0711L5.79157 13.3334H3.33404C2.96585 13.3334 2.66737 13.0349 2.66737 12.6667V10.2092L0.92964 8.47148C0.669287 8.21115 0.669287 7.78901 0.92964 7.52868L2.66737 5.79093V3.3334C2.66737 2.96521 2.96585 2.66673 3.33404 2.66673H5.79157ZM4.00071 4.00007V6.34321L2.34385 8.00008L4.00071 9.65695V12.0001H6.34385L8.00073 13.6569L9.65753 12.0001H12.0007V9.65695L13.6575 8.00008L12.0007 6.34321V4.00007H9.65753L8.00073 2.34321L6.34385 4.00007H4.00071ZM8.00073 10.6667C6.52795 10.6667 5.33404 9.47281 5.33404 8.00008C5.33404 6.52731 6.52795 5.3334 8.00073 5.3334C9.47347 5.3334 10.6674 6.52731 10.6674 8.00008C10.6674 9.47281 9.47347 10.6667 8.00073 10.6667ZM8.00073 9.33341C8.73707 9.33341 9.33407 8.73648 9.33407 8.00008C9.33407 7.26368 8.73707 6.66675 8.00073 6.66675C7.26433 6.66675 6.6674 7.26368 6.6674 8.00008C6.6674 8.73648 7.26433 9.33341 8.00073 9.33341Z" fill="#1A85E4"/>' +
            '</g>' +
            '+<defs><clipPath id="clip0_44_486"><rect width="16" height="16" fill="white"/></clipPath></defs></svg>Account & Settings</p>' +
            '</div>' +
            '<div class="last_child_div">' +
            '<div style="display:' + show_track + '">' +
            '<p>20 Free Invisible Tracker Emails: <span class="link_count">' + links_status + '</span>/20</p>' +
            '<div class="links_progress" ><div class="total"><div class="filled" style="width:' + progressWidth + '%"></div></div></div>' +
            '</div>' +
            // '<p>You’re currently on the FREE plan</p>' +
            '<button class="show_upgrade_account white_hover">UPGRADE TO PRO</button>' +
            '</div>' +
            '</div>' +
            '</div>'
          );
        }
        else {
          $(".rebump_menu_InboxSDK").append(
            '<div class="wrapper">' +
            '<div class="logo"><img src="' + IMAGEURL + '/emailtracker_white_new.svg"> <span class="image_side_pro">Pro</span> </div>' +
            '<div class="content-box">' +
            '<div class="second_child_content redirect_dashboard">' +
            '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">' +
            '<path d="M8.00004 1.33331C11.6819 1.33331 14.6667 4.31808 14.6667 7.99998C14.6667 11.6818 11.6819 14.6666 8.00004 14.6666C4.31814 14.6666 1.33337 11.6818 1.33337 7.99998C1.33337 4.31808 4.31814 1.33331 8.00004 1.33331ZM8.00004 2.66665C5.05452 2.66665 2.66671 5.05446 2.66671 7.99998C2.66671 10.9455 5.05452 13.3333 8.00004 13.3333C10.9456 13.3333 13.3334 10.9455 13.3334 7.99998C13.3334 5.05446 10.9456 2.66665 8.00004 2.66665ZM8.00004 3.33331C8.67871 3.33331 9.32351 3.47819 9.90531 3.73869L8.86364 4.77961C8.58817 4.70593 8.29871 4.66665 8.00004 4.66665C6.15909 4.66665 4.66671 6.15903 4.66671 7.99998C4.66671 8.92045 5.0398 9.75378 5.64302 10.357L4.70021 11.2998L4.59634 11.1926C3.81309 10.3578 3.33337 9.23498 3.33337 7.99998C3.33337 5.42265 5.42271 3.33331 8.00004 3.33331ZM12.2616 6.09539C12.522 6.67698 12.6667 7.32158 12.6667 7.99998C12.6667 9.28865 12.1444 10.4553 11.2998 11.2998L10.357 10.357C10.9603 9.75378 11.3334 8.92045 11.3334 7.99998C11.3334 7.70131 11.2941 7.41185 11.2204 7.13638L12.2616 6.09539ZM10.8284 4.22875L11.7713 5.17155L9.28837 7.65531C9.31771 7.76525 9.33337 7.88078 9.33337 7.99998C9.33337 8.73638 8.73644 9.33331 8.00004 9.33331C7.26364 9.33331 6.66671 8.73638 6.66671 7.99998C6.66671 7.26358 7.26364 6.66665 8.00004 6.66665C8.11924 6.66665 8.23477 6.68231 8.34471 6.71165L10.8284 4.22875Z" fill="#1A85E4"/>' +
            '</svg>' +
            '<p class="">Dashboard</p>' +
            '</div>' +
            '<div class="third_child_div">' +
            '<h2>Settings</h2>' +
            '<div class="custom-toggle"><p>Email tracker enabled</p><div class="check-box"><input type="checkbox" class="compose_checkbox setting_checkbox change" id="tracker_enabled" name="tracker" ' + tracker_checked + '></div></div>' +
            '<div class="custom-toggle"><p>Track emails by default</p><div class="check-box"><input type="checkbox" class="compose_checkbox setting_checkbox change" name="default" id="default_email" ' + default_checked + '></div></div>' +
            '<div class="custom-toggle"><p>Chrome notifications</p><div class="check-box"><input type="checkbox" class="compose_checkbox setting_checkbox change pro_checkbox ' + plan_class + '" name="notification" id="notification" ' + notification_checked + checkbox_disabled + '></div></div>' +
            '<div class="custom-toggle"><p>Invisible tracker</p><div class="check-box"><input type="checkbox" name="invisible" class="compose_checkbox setting_checkbox change pro_checkbox ' + plan_class + '" id="invisible_tracker" ' + invisible_checked + checkbox_disabled + '></div></div>' +
            '<div class="custom-toggle"><p>Link tracker</p><div class="check-box"><input type="checkbox" class="compose_checkbox setting_checkbox change pro_checkbox ' + plan_class + '" name="link" id="link_tracker" ' + link_checked + checkbox_disabled + '></div></div>' +
            '<div>' +
            '</div>' +
            '</div>' +
            '<div class="fourth_child_content">' +
            '<p class="timezone_change"><img src="' + IMAGEURL + '/timezone_icon.svg"> Timezone</p>' +
            '<p class="help_support"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">' +
            '<path d="M3.84192 11.3333H13.3334V3.33333H2.66671V12.2567L3.84192 11.3333ZM4.30307 12.6667L1.33337 15V2.66667C1.33337 2.29848 1.63185 2 2.00004 2H14C14.3682 2 14.6667 2.29848 14.6667 2.66667V12C14.6667 12.3682 14.3682 12.6667 14 12.6667H4.30307ZM7.33337 9.33333H8.66671V10.6667H7.33337V9.33333ZM5.71158 5.87564C5.92429 4.80613 6.86804 4 8.00004 4C9.28871 4 10.3334 5.04467 10.3334 6.33333C10.3334 7.622 9.28871 8.66667 8.00004 8.66667H7.33337V7.33333H8.00004C8.55231 7.33333 9.00004 6.8856 9.00004 6.33333C9.00004 5.78105 8.55231 5.33333 8.00004 5.33333C7.51491 5.33333 7.11044 5.67882 7.01924 6.13718L5.71158 5.87564Z" fill="#1A85E4"/>' +
            '</svg>Help & Support</p>' +
            '<p class="account_setting"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">' +
            '<g clip-path="url(#clip0_44_486)">' +
            '<path d="M5.79157 2.66673L7.52933 0.928999C7.78967 0.668646 8.21173 0.668646 8.47213 0.928999L10.2099 2.66673H12.6674C13.0355 2.66673 13.3341 2.96521 13.3341 3.3334V5.79093L15.0718 7.52868C15.3321 7.78901 15.3321 8.21115 15.0718 8.47148L13.3341 10.2092V12.6667C13.3341 13.0349 13.0355 13.3334 12.6674 13.3334H10.2099L8.47213 15.0711C8.21173 15.3315 7.78967 15.3315 7.52933 15.0711L5.79157 13.3334H3.33404C2.96585 13.3334 2.66737 13.0349 2.66737 12.6667V10.2092L0.92964 8.47148C0.669287 8.21115 0.669287 7.78901 0.92964 7.52868L2.66737 5.79093V3.3334C2.66737 2.96521 2.96585 2.66673 3.33404 2.66673H5.79157ZM4.00071 4.00007V6.34321L2.34385 8.00008L4.00071 9.65695V12.0001H6.34385L8.00073 13.6569L9.65753 12.0001H12.0007V9.65695L13.6575 8.00008L12.0007 6.34321V4.00007H9.65753L8.00073 2.34321L6.34385 4.00007H4.00071ZM8.00073 10.6667C6.52795 10.6667 5.33404 9.47281 5.33404 8.00008C5.33404 6.52731 6.52795 5.3334 8.00073 5.3334C9.47347 5.3334 10.6674 6.52731 10.6674 8.00008C10.6674 9.47281 9.47347 10.6667 8.00073 10.6667ZM8.00073 9.33341C8.73707 9.33341 9.33407 8.73648 9.33407 8.00008C9.33407 7.26368 8.73707 6.66675 8.00073 6.66675C7.26433 6.66675 6.6674 7.26368 6.6674 8.00008C6.6674 8.73648 7.26433 9.33341 8.00073 9.33341Z" fill="#1A85E4"/>' +
            '</g>' +
            '+<defs><clipPath id="clip0_44_486"><rect width="16" height="16" fill="white"/></clipPath></defs></svg>Account & Settings</p>' +
            '</div>' +
            '</div>'
          );
        }
      }
    }); // end - $( document ).ready(function() {
  }
  $(document).on("click", ".stipe_monthly_redirect", function (e) {
    var url = APIURL + '/stripe_monthly?user_id=' + user_setting_detail.userId;

    // Open the link in a new tab
    window.open(url, '_self');
  })
  $(document).on("click", ".stipe_yearly_redirect", function (e) {
    var url = APIURL + '/stripe_yearly?user_id=' + user_setting_detail.userId;

    // Open the link in a new tab
    window.open(url, '_self');
  })

  $(document).on("click", ".close_modal", function (e) {
    $.modal.close();
  })
  $(document).on("click", ".close_timezone", function (e) {
    $.modal.close();
  })
  $(document).on("click", ".cancel_button", function (e) {
    $.modal.close();
  })
  // onboarding 3
  $(document).on("click", ".onboarding_two", function (e) {
    $(".modal").html(
      '<div class="dialog dailog-bg link_wrapper onboarding_main_div" tabindex="0" role="dialog" aria-labelledby=":y0" style="left: 50%; top: 50%;"id="dialog3" >' +
      '<div class="outer-modal-text">' +
      '<img src="' + IMAGEURL + '/emailtracker_white_new.svg">' +
      '<img class="onboarding_three_img" src="' + IMAGEURL + '/preview_2.png" style="position:relative !important">' +
      '<h1 class="p-tag">See if your emails were <br> opened</h1>' +
      '<p class="p-tag">Find your sent email and hover over the checkmarks to see <br>the email tracking history for that email</p>' +
      '<a href="#" class="onboarding_three white_hover">NEXT</a>' +
      '</div>' +
      '</div>'
    )
    $(".modal").modal();
  })
  // onboarding 4
  $(document).on("click", ".onboarding_three", function (e) {
    $(".modal").html(
      '<div class="dialog dailog-bg link_wrapper onboarding_main_div" tabindex="0" role="dialog" aria-labelledby=":y0" style="left: 50%; top: 50%;"id="dialog3" >' +
      '<div class="outer-modal-text">' +
      '<img src="' + IMAGEURL + '/emailtracker_white_new.svg">' +
      '<img class="edit-link_img" src="' + IMAGEURL + '/preview_3.png" style="position:relative !important">' +
      '<h1 class="insert_h1">Insert a Tracked Link</h1>' +
      '<p>Insert a tracked link into your email and see when <br> your links are clicked</p>' +
      '<a href="#" class="onboarding_four white_hover">BACK TO WORK</a>' +
      '</div>' +
      '</div>'
    )
    $(".modal").modal();
  })
  // onboarding 2
  $(document).on("click", ".onboarding_one", function (e) {
    $(".modal").html(
      '<div class="dialog dailog-bg link_wrapper onboarding_main_div" tabindex="0" role="dialog" aria-labelledby=":y0" style="left: 50%; top: 50%;"id="dialog3" >' +
      '<div class="outer-modal-text">' +
      '<img src="' + IMAGEURL + '/emailtracker_white_new.svg">' +
      '<img src="' + IMAGEURL + '/Frame_55.png" style="position:relative !important">' +
      '<h1 class="title-onb">Choose Between Visible or <bt>Invisible Tracker</h1>' +
      "<p>Get 40% more replys with the Visible Tracker.<br>Or opt for the Invisible Tracker when you don't want recipients<br>to  know you're tracking</p>" +
      '<a href="#" class="onboarding_two white_hover">NEXT</a>' +
      '</div>' +
      '</div>'
    )
    $(".modal").modal();
  })
  $(document).on("click", ".track_link_upgrade", function (e) {
    e.preventDefault();
    $(".modal").html(
      '<div class="dialog dailog-bg link_wrapper" tabindex="0" role="dialog" aria-labelledby=":y0" style="left: 50%; top: 50%;"id="dialog3" >' +
      '<div class="outer-modal-text" style="position:relative">' +
      '<p class="close_modal" style="top:4px !important;">X</p>' +
      '<img src="' + IMAGEURL + '/emailtracker_white_new.svg">' +
      '<img src="' + IMAGEURL + '/link_visible_invisible.png" style="position:relative !important">' +
      '<h1>Invisible tracking is only <br> available to Pro users</h1>' +
      '<p>Remove the Email Tracker signature and get <br>unlimited Invisible tracking</p>' +
      '<a href="#" class="show_upgrade_account white_hover">UPGRADE TO PRO</a>' +
      '</div>' +
      '</div>'
    )
    $(".modal").modal();
  })
  $(document).on("click", ".insert_link_upgrade", function (e) {
    e.preventDefault();
    $(".modal").html(
      '<div class="dialog dailog-bg link_wrapper" tabindex="0" role="dialog" aria-labelledby=":y0" style="left: 50%; top: 50%;"id="dialog3" >' +
      '<div class="outer-modal-text" style="position:relative">' +
      '<p class="close_modal" style="top:4px !important;">X</p>' +
      '<img class="main-img" src="' + IMAGEURL + '/emailtracker_white_new.svg">' +
      '<img class="insert-center-img" src="' + IMAGEURL + '/track_link.png" style="position:relative !important">' +
      '<h1 class="heading-tracking">Link tracking is only <br> available to Pro users</h1>' +
      '<p class="paragraph-tracking">Know exactly when someone clicks your links</p>' +
      '<a href="#" class="show_upgrade_account white_hover">UPGRADE TO PRO</a>' +
      '</div>' +
      '</div>'
    )
    $(".modal").modal();
  })
  function populateDropdown(data) {
    var dropdown = document.getElementById("timezone-dropdown");

    // Iterate through the JSON data and create options
    data.forEach(function (item) {
      var option = document.createElement("option");
      option.text = item.name + " " + item.gmt;
      option.value = item.zone;
      dropdown.appendChild(option);
    });
  }
  $(document).on("click", ".timezone_change", function (e) {
    var selected_text = user_setting_detail.timezone_text == null ? '' : user_setting_detail.timezone_text;

    //  populateDropdown(timezone);
    $(".modal").html(
      '<div class="dialog link_wrapper timezone" tabindex="0" role="dialog" aria-labelledby=":y0" style="left: 50%; top: 50%;"id="dialog3" >' +
      '<p class="close_modal" style="top:0 !important;">X</p>' +
      '<div class="timezone_outermodal">' +
      '<div class="dropdown_div">' +
      '<h3 class="dropdown_heading">Select Timezone</h3>' +
      '<select id="timezone-dropdown">' +
      '<option value="UTC">Coordinated Universal Time (UTC)</option>' +
      '</select>' +
      '</div>' +
      '<div class="text_dropdown">' +
      '<p class="selected_timezone">' + selected_text + '</p>' +
      '<p class="time_as_timezone"></p>' +
      '</div>' +
      '<div class="dropdown_buttons">' +
      '<p class="close_timezone">Cancel</p>' +
      '<p class="save_timezone blue_hover">Set Timezone</p>' +
      '</div>' +
      '</div>' +
      '</div>'
    )
    $(".modal").modal();
    $(".inboxsdk__tooltip.inboxsdk__appButton_tooltip").hide();
    var dropdown = document.getElementById("timezone-dropdown");
    if (user_setting_detail.timezone_value != null) {
      var currentTime = new Date().toLocaleString('en-US', { timeZone: user_setting_detail.timezone_value });
      var formattedTime = formatDate(new Date(currentTime));
      $('.time_as_timezone').text(formattedTime);
    }
    else {
      var currentTime = new Date().toUTCString();
      var formattedTime = formatDate(new Date(currentTime));
      $('.time_as_timezone').text(formattedTime + (' (UTC)'));
    }
    // Iterate through the JSON data and create options
    timezone.forEach(function (item) {
      var dropdown_checked = user_setting_detail.timezone_value == item.zone ? 'selected' : '';
      var option = document.createElement("option");
      var cityName = item.zone.split("/")[0];
      option.text = item.name + ", " + cityName + ' ' + item.gmt;
      option.value = item.zone;
      option.selected = dropdown_checked;
      dropdown.appendChild(option);
    });
  })
  function formatDate(date) {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return days[date.getDay()] + ' ' + months[date.getMonth()] + ' ' + date.getDate() + ' ' + date.getFullYear() + ' ' + pad(date.getHours()) + ':' + pad(date.getMinutes()) + ':' + pad(date.getSeconds());
  }

  // Function to pad single digits with leading zero
  function pad(n) {
    return (n < 10) ? '0' + n : n;
  }
  $(document).on("change", "#timezone-dropdown", function (e) {
    var selectedZone = $(this).val();
    var selectText = $('#timezone-dropdown option:selected').text();
    if (selectedZone) {
      var currentTime = new Date().toLocaleString('en-US', { timeZone: selectedZone });
      var formattedTime = formatDate(new Date(currentTime));
      $('.time_as_timezone').text(formattedTime);
      $('.selected_timezone').text(selectText)
    } else {
      $('.time_as_timezone').text('');
    }
  });
  $(document).on("click", ".save_timezone", function (e) {
    var selectedValue = $('#timezone-dropdown').val();
    var selectedText = $('#timezone-dropdown option:selected').text();
    if (selectedValue != '') {
      $.ajax({
        async: true,
        crossDomain: true,
        url:
          APIURL + "/update_timezone",
        method: "POST",
        data: {
          email: uid, // Your POST data goes here
          value: selectedValue,
          text: selectedText,

        },
        success: function (track_link_id) {
          user_setting_detail.timezone_value = selectedValue
          user_setting_detail.timezone_text = selectedText
          //$('#timezone-dropdown').val(selectedValue); 
          $.modal.close();
          location.reload();
        },
        error: function () {
        },
      });
    }
    else {
      alert('please select the timezone first.')
    }
  })
  $(document).on("click", ".onboarding_four", function (e) {
    $.ajax({
      async: true,
      crossDomain: true,
      url:
        APIURL + "/update_onboarding_status",
      method: "POST",
      data: {
        email: uid, // Your POST data goes here
      },
      success: function (track_link_id) {
        $.modal.close();
      },
      error: function () {
      },
    });
  })
  $(document).on("click", ".payment_onboarding", function (e) {
    $.ajax({
      async: true,
      crossDomain: true,
      url:
        APIURL + "/update_payment_popup_status",
      method: "POST",
      data: {
        email: uid, // Your POST data goes here
      },
      success: function (track_link_id) {
        $.modal.close();
      },
      error: function () {
      },
    });
  })

  function handleClick(event) {
    if (user_setting_detail.plan_name == 'paid') {
      var className = $(event.target).attr('class');
      if (className != '' && className != undefined && className.includes('inboxsdk__gmail_density_default')) {
        window.set_tracking = 1;
        setTimeout(function () {
          $('#linkdialog-onweb-tab-input').parent().append('<div class="enable_track_link" style="float:right;margin-top:10px">' +
            '<div class="track-toggle">' +
            '<img src="' + IMAGEURL + '/email_tracker.png">' +
            '<span>Track this link</span>' +
            '<div class="check-box"><input type="checkbox" class="compose_checkbox" id="track_link_status2" checked></div>' +
            '</div>' +
            '</div>');
        }, 700);

      }
    }
  }

  document.addEventListener("click", handleClick);
  $(document).on("click", ".redirect_dashboard", function (e) {
    var url = WEBURL + '/dashboard';

    // Open the link in a new tab
    window.open(url, '_blank');
  })
  $(document).on("click", ".help_support", function (e) {
    var url = 'https://email-tracker.gitbook.io/email-tracker-knowledge-base';

    // Open the link in a new tab
    window.open(url, '_blank');
  })
  $(document).on("click", ".account_setting", function (e) {
    var url = WEBURL + '/setting';

    // Open the link in a new tab
    window.open(url, '_blank');
  })
  $(document).ready(function () {
    // Assuming radio buttons have class "radio-btn"
    $(document).on("change", ".radio-btn", function (e) {
      // Get the value of the checked radio button
      var selectedValue = $("input[name='switch']:checked").val();
      if (selectedValue == 0) {
        $('.pro_child_number').text("8.99").append('<span>$/month</span>');
        $('.pro_plan_wrapper .show_upgrade_accounts').addClass("stipe_monthly_redirect");
        $('.pro_plan_wrapper .show_upgrade_accounts').removeClass("stipe_yearly_redirect");
        
      }
      else {
        $('.pro_child_number').text("3.99").append('<span>$/month</span>');
        $('.pro_plan_wrapper .show_upgrade_accounts').removeClass("stipe_monthly_redirect");
        $('.pro_plan_wrapper .show_upgrade_accounts').addClass("stipe_yearly_redirect");
      }
    });
  });
  $(document).on("click", ".show_upgrade_account", function (e) {
    e.preventDefault();
    $(".modal").html(
      '<div class="dialog billing_wraper dialog-pro" tabindex="0" role="dialog" aria-labelledby=":y0" style="left: 50%; top: 35%;">' +
      '<div class="free_plan_wrapper">' +
      '<div class="free_first_child">' +
      '<p class="first_child_text">Free Plan</p>' +
      '<p class="first_child_number">0<span>$/month</span></p>' +
      '</div>' +
      '<div class="free_second_child">' +
      '<p><img src="' + IMAGEURL + '/email_tracker.png"><span>Unlimited Emails Tracked</span></p>' +
      '<p><img src="' + IMAGEURL + '/email_tracker.png"><span>Email Tracker Signature</span></p>' +
      '<p><img src="' + IMAGEURL + '/email_tracker.png"><span>Full Tracking History</span></p>' +
      '<p><img src="' + IMAGEURL + '/email_tracker.png"><span>Email Alerts</span></p>' +
      '</div>' +
      '<div class="free_third_child"><img src="' + IMAGEURL + '/emailtracker_black_new.svg"></div>' +
      '</div>' +
      '<div class="pro_plan_wrapper">' +
      '<div class="pro_first_child">' +
      '<p class="close_modal" style="top: 0px !important;right: 15px !important;">X</p>' +
      '<p class="pro_child_text">Pro Plan</p>' +
      '<p class="pro_child_number">3.99<span>$/month</span></p>' +
      '</div>' +
      '<div class="container">' +
      '<div class="switch-wrapperr">' +
      '<input id="monthly" type="radio" name="switch" class="radio-btn" value="0">' +
      '<input id="yearly" type="radio"  checked name="switch" class="radio-btn" value="1">' +
      '<label for="monthly">MONTHLY</label>' +
      '<label for="yearly">YEARLY(55% OFF)</label>' +
      ' <span class="highlighter"></span>' +
      '</div>' +
      '</div>' +
      '<div class="pro_second_child">' +
      '<p><img src="' + IMAGEURL + '/Frame39816.png"><span>Unlimited Emails Tracked</span></p>' +
      '<p><img src="' + IMAGEURL + '/Frame39816.png"><span>Unlimited Link Tracking</span></p>' +
      '<p><img src="' + IMAGEURL + '/Frame39816.png"><span>Visible + Invisible Tracker</span></p>' +
      '<p><img src="' + IMAGEURL + '/Frame39816.png"><span>Full Tracking History</span></p>' +
      '<p><img src="' + IMAGEURL + '/Frame39816.png"><span>Advanced Notifications</span></p>' +
      '<p><img src="' + IMAGEURL + '/Frame39816.png"><span>Chrome Notifications</span></p>' +
      '<p><img src="' + IMAGEURL + '/Frame39816.png"><span>Email Alerts</span></p>' +
      '<p><img src="' + IMAGEURL + '/Frame39816.png"><span>Team Billing</span></p>' +
      '</div>' +
      '<div class="pro_third_child"><button class="show_upgrade_accounts stipe_yearly_redirect white_hover upgradeTo_pro_btn">UPGRADE TO PRO</button></div>' +
      '</div>' +
      '</div>'
    );
    $(".modal").modal();
    $(".inboxsdk__tooltip.inboxsdk__appButton_tooltip").hide();
  });
}); // InboxSDK.load





async function get_storage(key) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(key, function (data) {
      if (data && Object.keys(data).length !== 0 && data.hasOwnProperty(key)) {
        resolve(data[key]);
      } else {
        resolve(null);
      }
    });
  });
}

async function set_storage(object) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set(object, function () {
      resolve(true);
    });
  });
}
