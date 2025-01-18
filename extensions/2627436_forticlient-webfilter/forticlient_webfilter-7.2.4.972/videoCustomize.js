/**
 * /*
 * Copyright (c) 2015 Fortinet Technologies (Canada) Inc. All rights reserved.
 *
 *   FortiClient Web Filter for google Chromebook
 *
 * @format
 */

document.addEventListener('DOMContentLoaded', function () {
  var message = { action: 'video' };
  chrome.runtime.sendMessage(message, function (response) {
    console.log('video customize message sent');

    document.documentElement.innerHTML = response.customizePage;
  });
});
