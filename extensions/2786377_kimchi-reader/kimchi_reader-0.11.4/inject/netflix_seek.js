(() => {
  const params = new URLSearchParams(document.currentScript.src.split("?")[1]);
  const videoPlayer = window.netflix.appContext.state.playerApp.getAPI().videoPlayer;
  const playerSessionIds = videoPlayer.getAllPlayerSessionIds();
  const playerSessionId = playerSessionIds.find(o => o.startsWith("watch-")) ?? playerSessionIds[0];
  const player = videoPlayer.getVideoPlayerBySessionId(playerSessionId);
  player.seek(parseFloat(params.get("t")) * 1000);
})();
