var windowsId = 0, windowsFlag = false;
browser.commands.onCommand.addListener(async function(command) {
  if(command === 'opentxt'){
    browser.windows.create({url: '/panel.html', 'type': 'panel','top':(window.screen.availHeight - 520),'left': (window.screen.availWidth - 620), 'width':620, 'height':    520}, function(e){
      windowsId = e.id;
    });
  }
});

browser.windows.onRemoved.addListener(function(e){
  if(windowsId === e){
    windowsId = 0;
    windowsFlag = false;
  }
});

browser.windows.onFocusChanged.addListener(function(e){

  if(windowsId === e){
    windowsFlag = true;

    }
    if(windowsFlag && e !== windowsId){

        browser.windows.remove(windowsId);


      windowsId = 0;
      windowsFlag = false;
      return false;
    }



});
