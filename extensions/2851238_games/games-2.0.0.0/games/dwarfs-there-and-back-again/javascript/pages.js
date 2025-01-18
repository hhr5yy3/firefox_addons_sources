function show(shown, hidden) {
  document.getElementById(shown).style.display='block';
  document.getElementById(hidden).style.display='none';
  return false;
}

var about = document.getElementById("about")
if ( about )
{
	about.addEventListener("click", function(){
		alert("Dwarfs 2019\nGPLv3\nMade with love by mvasilkov and yutyo.")
	})
}

var quit_game = document.getElementById("quit-game")
if ( quit_game )
{
	quit_game.addEventListener("click", function(){
		  window.close()
	})
}