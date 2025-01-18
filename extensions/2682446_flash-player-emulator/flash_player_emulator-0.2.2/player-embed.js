var queryParams = new URLSearchParams(window.location.search);
var src = queryParams.get('src');
var width = queryParams.get('width');
var height = queryParams.get('height');
var flashvars = queryParams.get('flashvars');
//console.info('Source:', src);

var srcData = '';

var fetchSource = () => {
    fetch(src)
    .then((response) => response.blob() )
    .then((blob) => {
      var reader = new FileReader();

      reader.addEventListener('load', () => {
        srcData = reader.result;
        //console.info('srcData:', srcData);
        
        loadSource();
      });

      reader.readAsDataURL(blob);
    });
}

var loadSource = () => {
    if (srcData != '') {
        var playerElem = document.getElementById('player');
        playerElem.contentWindow.postMessage({action: "loadPlayer", src: srcData, width: width, height: height, flashvars: flashvars || src}, '*');
    } else {
        setTimeout(loadSource, 100);
    }
}

window.addEventListener('message', (msg) => {
    
    //console.info('Message from player.html:', msg);
    
    if (!msg.isTrusted) {
        console.error('Untrusted message received.');
        return;
    }
    
    if (msg.data.action == 'playbackRequested') {
        fetchSource();
    }
});
