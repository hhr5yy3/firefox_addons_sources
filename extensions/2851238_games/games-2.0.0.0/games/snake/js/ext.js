
function getTheme () {
    function changeTheme(themeUrl) {
      var elm = document.getElementById("style");
      elm && elm.remove();

      var newCss = document.createElement("link");
      newCss.id = "style";
      newCss.rel = "stylesheet";
      newCss.type = "text/css";
      newCss.href = themeUrl;
      document.head.appendChild(newCss);
    }
    var index = document.getElementById("select").selectedIndex;
    switch (index) {
        case 0: 
          changeTheme('css/light-snake.css?' + Math.random());
          break;
        case 1: 
          changeTheme('css/main-snake.css?' + Math.random());
          break;
        case 2: 
          changeTheme('css/dark-snake.css?' + Math.random());
          break;
        case 3: 
          changeTheme('css/green-snake.css?' + Math.random());
          break;
        case 4: 
          changeTheme('css/matrix-snake.css?' + Math.random());
          break;
        case 5: 
          changeTheme('css/Senura-snake.css?' + Math.random());
          break;
          case 6: 
          changeTheme('css/head-snake.css?' + Math.random());
          break;
        default:
          changeTheme('css/main-snake.css?' + Math.random());
          break;
    }
    setTimeout(function() {
        document.getElementById('game-area').focus();
    }, 10);
}

document.addEventListener("DOMContentLoaded", function()
{
	document.getElementById("select").onchange = getTheme
})