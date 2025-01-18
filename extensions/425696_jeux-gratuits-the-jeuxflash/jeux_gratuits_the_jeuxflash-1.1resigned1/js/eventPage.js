cacheData   = '';
refreshInfo = 1000 * 30; // milliseconds * seconds
lastLoad    = (new Date().getTime()) + refreshInfo;

function loadGames(callback) {   

    var now         = new Date().getTime();
    var nextRefresh = lastLoad + refreshInfo;
    console.log(now - nextRefresh);

    if (now >= nextRefresh) {
        cacheData  = '';
    }

    if(cacheData instanceof Object) {
        console.log('-> get cache');
        console.log(cacheData);

        callback(cacheData);
        return false;
    }
    
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://www.the-jeuxflash.com/api/games.json', true);
                      
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 400) {
            var response = JSON.parse(xhr.responseText);

            if(response.status.success === true) {

                cacheData = response.data;
                console.log('-> xhr success');
                console.log(cacheData);
            
                lastLoad = new Date().getTime();
                console.log(lastLoad);

                callback(cacheData);
            }
            
        }
    };

    xhr.send();
}
