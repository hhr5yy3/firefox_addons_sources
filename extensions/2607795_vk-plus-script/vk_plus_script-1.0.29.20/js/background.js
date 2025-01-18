   var s = localStorage;
   
   var browser = browser || chrome
   var extension = browser.extension || browser.runtime
   
   if (!extension.onMessage) extension = browser.runtime

   window.addEventListener("load", function(){

      loadUserConfig()

   }, false);

   function loadUserConfig() {
      if (s.header == undefined) s.header = true
      if (s.wall == undefined) s.wall = true
      if (s.nocounters == undefined) s.nocounters = false
      if (s.photo_comments == undefined) s.photo_comments = true
      if (s.photo_fullscreen == undefined) s.photo_fullscreen = true
      if (s.audio_flash == undefined) s.audio_flash = false
      if (s.audio_largeblock == undefined) s.audio_largeblock = false
      if (s.do_not_save_pictures == undefined) s.do_not_save_pictures = true
      if (s.disable_download_icon == undefined) s.disable_download_icon = false
      if (s.old_im == undefined) s.old_im = true
      if (s.square_pics == undefined) s.square_pics = true
      if (s.old_navbar == undefined) s.old_navbar = true
      if (s.night_mode == undefined) s.night_mode = false

      browser.storage.local.set({ header: s.header != "false", wall: s.wall != "false", old_im: s.old_im != "false", square_pics: s.square_pics != "false", old_navbar: s.old_navbar != "false", night_mode: s.night_mode != "false", nocounters: s.nocounters != "false", photo_comments: s.photo_comments != "false", photo_fullscreen: s.photo_fullscreen != "false", audio_flash: s.audio_flash != "false", audio_largeblock: s.audio_largeblock != "false" })
   }

   function updateUserConfig(data) {
      for (var field in data) {
         s[field] = data[field]
         browser.storage.local.set(data)
      }
   }

   extension.onMessage.addListener(function(request, sender, sendResponse) {
      if (request.operation == 'update') {
         updateUserConfig(request.data)
         browser.tabs.query({}, function(tabs) {
            for (var i = 0; i < tabs.length; i++) {
               browser.tabs.sendMessage(tabs[i].id, { operation: 'update', data: request.data }, null)
            }
         })
      }
      if (request.operation == "download") {
         try {
            browser.downloads.download({ url: request.url, filename: request.filename })
         } catch(ex) {
            browser.tabs.create({ url: request.url })
         }
      }
   })


   browser.downloads.onCreated.addListener(function(download) {
      if (s.do_not_save_pictures == "true" && download.url.match(/(userapi|vk)\.(com|me)\/[a-zA-Z0-9/_-]+\.jpg/)) {
         browser.downloads.onChanged.addListener((function(download_id) {
            setTimeout(function() {
	           browser.downloads.search({ id: download_id }, function(downloads) {
	              if (downloads && downloads[0] && downloads[0].state == "complete") {
	                 browser.downloads.erase({ id: downloads[0].id }, null)
	                 if (s.disable_download_icon != "true") {
	                    browser.tabs.query({ active: true, windowId: browser.windows.WINDOW_ID_CURRENT }, function(tabs) {
	                       browser.tabs.sendMessage(tabs[0].id, { operation: 'download' })
	                    })
	                 }
	              } else {
	                 setTimeout(arguments.callee, 400)
	              }
	           })
            }, 700)
         }).bind(null, download.id))
      }
   })