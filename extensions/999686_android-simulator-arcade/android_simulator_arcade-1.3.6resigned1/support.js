browser.contextMenus.create({
  		title: "Open ApkOnline Android online for Arcade Games",
        id: "ArcadeGamesApkOnline",
        contexts: ["selection", "link", "editable", "image"]
});


browser.contextMenus.onClicked.addListener(function(info, tab){
    if (info.menuItemId === "ArcadeGamesApkOnline") {
        ArcadeGamesApkOnline();
    }
});


function ArcadeGamesApkOnline() 
{   
  		gourl =  "https://www.apkonline.net/games/arcade";
    	chrome.tabs.create({url: gourl});
}


