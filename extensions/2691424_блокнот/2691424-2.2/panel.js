
browser.storage.local.get(['txt', 'scrollTop'], function(e){
  if('txt' in e){
    document.querySelector('textarea').value = e.txt;
  }

  if('scrollTop' in e){
    document.querySelector('textarea').scrollTop = e['scrollTop'];
  }
});

document.querySelector('textarea').addEventListener('keyup', function(){
  setData();
});

document.querySelector('textarea').addEventListener('copy', function(){
  setData();
});

document.querySelector('textarea').addEventListener('cut', function(){
  setData();
});

document.querySelector('textarea').addEventListener('paste', function(){
  setData();
});

document.querySelector('textarea').addEventListener('scroll', function(){
  browser.storage.local.set({'scrollTop': document.querySelector('textarea').scrollTop});
});
function setData(){
  var text = document.querySelector('textarea').value.trim();
  browser.storage.local.set({'txt': text});

}
