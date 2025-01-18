document.body.addEventListener('click', function(){click()}, false);
document.onkeydown = function(e){
  e = e || window.event;
  if (e.keyCode == 32) click();
}
document.querySelector('#mute').addEventListener('click', function(event){
	event.stopPropagation();
	event.preventDefault();
	muted = !muted;
	Storage.setValue('muted', muted);
	document.querySelector('#mute').className = `sound ${muted? 'unmute': 'mute'}`;
	document.querySelector('#canvas').focus();
	muted ? audioBg.pause() : audioBg.play();
});

document.addEventListener('DOMContentLoaded', ()=>{ document.querySelector('#canvas').focus(); init(); });