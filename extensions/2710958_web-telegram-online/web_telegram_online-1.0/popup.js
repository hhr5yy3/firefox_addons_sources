function innewwindow() {
var height = screen.height*0.7;
var width = screen.width*0.5;
window.open("max.html", "Web Telegram", "width="+width+",height="+height+", left=0, top=0, screenX="+width/2+", screenY="+height/4+"");
}

document.addEventListener('DOMContentLoaded', function() {
  var link = document.getElementById('max');
  link.addEventListener('click', function() {
    window.close();
    innewwindow();
  });
});