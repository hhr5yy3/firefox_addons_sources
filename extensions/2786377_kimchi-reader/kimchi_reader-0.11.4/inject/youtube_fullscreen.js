document.onfullscreenchange = () => {
  window.innerWidth = document.querySelector("#movie_player")?.offsetWidth ?? window.innerWidth;
}