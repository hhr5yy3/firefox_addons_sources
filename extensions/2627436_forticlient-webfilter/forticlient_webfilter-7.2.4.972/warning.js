/**
 * Copyright (c) 2015 Fortinet Technologies (Canada) Inc. All rights reserved.
 *
 *   FortiClient Web Filter for google Chromebook
 *
 * @format
 */

function clear_cache() {
  var message = { action: 'clearcache' };
  chrome.runtime.sendMessage(message, function (response) {
    console.log('clear cache message has been sent');
  });
}

document.addEventListener('DOMContentLoaded', function () {
  //var clear = document.getElementById('clearcache');

  //clear.addEventListener('click', function() {
  //    clear_cache();
  //});

  /*
    var message = {action:"config_request"};
    chrome.runtime.sendMessage(message, function(response) {
        var select = document.getElementById('mode');
        var rate_option_div = document.getElementById("rate_option_div");
        var rate_option = document.getElementById("rate_option");

        console.log("config request message has been sent");
        console.log("response:" + response);

        if (response.mode == "sync"){
            select.value = "sync";
            rate_option_div.style.visibility = "hidden";
        }
        else{
            select.value = "async";
            rate_option_div.style.visibility = "visible";
            if (response.main_url_rate_only)
                rate_option.checked = true;
            else
                rate_option.checked = false;
        }
      }
    );
    */

  // get tab id
  var url = window.location.href;
  var position;
  var tabid;

  position = url.indexOf('?tabid=');
  if (position == -1) return;

  tabid = Number(url.substr(position + 7));

  // get information for this tab id(url, rate category name/group name, )
  var message = { action: 'get_warning_web_page_info', id: 0 };
  var rating_url;
  message.id = tabid;
  chrome.runtime.sendMessage(message, function (response) {
    var info;

    console.log('get_block_web_page_info has been sent');

    console.log('response.rating_url:' + response.rating_url);
    console.log('response.home_url:' + response.home_url);
    console.log('response.category:' + response.category);
    console.log('response.time:' + response.time);

    document
      .getElementsByClassName('url')[0]
      .setAttribute('title', response.rating_url);
    document.getElementsByClassName('url')[0].innerHTML = decodeURIComponent(
      response.rating_url
    );

    document.getElementsByClassName('category')[0].innerHTML =
      response.category;

    info = 'Click <b>Proceed</b> to stop blocking access to "';
    info += response.category;
    info += '" until ';
    info += response.time;

    document.getElementById('bypass_warning_info').innerHTML = info;

    var proceed = document.getElementById('button_proceed');

    proceed.addEventListener('click', function () {
      var request = { action: 'set_igore_category', id: tabid };

      document.location = response.home_url;
      chrome.runtime.sendMessage(request, function (response0) {});
      return false;
    });

    var goback = document.getElementById('button_back');

    goback.addEventListener('click', function () {
      var request = {
        action: 'block_warning_page',
        id: tabid,
        rating_url: response.rating_url,
        home_url: response.home_url,
        rating: response.rating,
      };

      chrome.runtime.sendMessage(request, function (response0) {
        if (response.rating_url == response.home_url) history.go(-1);
        else history.go(-2);
      });

      return false;
    });
  });
});
