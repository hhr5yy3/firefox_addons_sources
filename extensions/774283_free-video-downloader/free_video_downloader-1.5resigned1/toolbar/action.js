var tabId, page, videos;

function escapeHTML(str) { 
    return str.replace(/[&"'<>]/g, (m) => ({ "&": "&amp;", '"': "&quot;", "'": "&#39;", "<": "&lt;", ">": "&gt;" })[m]); 
}

function blockedPage(content, y) {
    /* Pages where extension can't work for security reasons */
    var div_main = document.createElement('div');
    div_main.className = 'title-video-list';
    var inner = '<div style="text-align: center"><h2><img src="/icons/128.png" alt="Icon"></h2><h1>Save Video As</h1>';
    if (!y)
        inner += '<p>Please refresh the page one time to enable extension on this page. <img src="img/refresh.jpg" alt="" style="position: absolute"></p>';
    inner += "<br><br><span class=\"small\">Extension can be disabled by your browser on some pages for security or policy reasons.<span class=\"thank\">Thank you for understanding!</span></span></div>";
    div_main.innerHTML = inner;
    content.innerHTML = '';
    content.appendChild(div_main);
}

var renderPage = function () {
    var content = document.getElementById('content'),
        inserted = 0, div, div2, div3, newUl = false;

    if (!page) {
        clearInterval(renderInterval);
        return blockedPage(content);
    }

/*
    //youtube block
    if (page.url.indexOf("https://www.youtube.com") === 0) {
        clearInterval(renderInterval);
        return blockedPage(content, 1);
    }
*/

    var ul = document.getElementById('ul_list');
    if (!ul) {
        newUl = true;
        ul = document.createElement('ul');
        ul.className = 'video-list';
        ul.setAttribute('id', 'ul_list');
    }
    var li2 = document.createElement('li');
    li2.innerHTML = '<p>Please refresh the page on any problems.</p>';


    for (var i in videos) {
        var video = videos[i],
            format = video.ext.toUpperCase(),
            p = document.createElement('p'),

            button = document.createElement('button');

        var li = document.getElementById('li' + video.video_id);
        if (!li) {
            li = document.createElement('li');
            li.setAttribute('id', 'li' + video.video_id);
        }

        div = document.createElement('div');
        div2 = document.createElement('div');
        div3 = document.createElement('div');

        div.className = 'video-list-li';
        div2.className = 'format';
        div3.className = 'video-title-list';
        button.className = 'download';

        div2.innerText = format;
        div.appendChild(div2);

        var fname = video.filename;
        p.innerText = fname.substr(0, 30);

        div3.appendChild(p);
        div.appendChild(div3);

        button.id = "button" + video.video_id;
        button.innerHTML = 'Download<br>' + escapeHTML(video.formattedSize);
        button.addEventListener('click', startDownloading, true);
        div.appendChild(button);

        li.innerHTML = '';

        li.appendChild(div);
        ul.appendChild(li);

        if (video.started)
            mark_started(button);

        inserted++;
    }
    var div_main = document.createElement('div');
    if (inserted) {
        if (newUl) {

            div_main.className = 'title-video-list';
            div_main.innerHTML = 'Video files on this page:';
            content.appendChild(div_main);
            content.appendChild(ul);

        } else {
            var ch = ul.children;
            for (var child in ch) {
                var found = false;
                for (var vi in videos) {
                    if (ch[child].id == 'li' + videos[vi].video_id)
                        found = true;
                }
                if (!found && li2 != ch[child]) {
                    ch[child].outerHTML = '';
                }
            }
        }
        ul.appendChild(li2);
    } else {
        content.innerHTML = '<h3 style="text-align: center">Save Video As</h3>';
        div_main.className = 'title-video-list';
        content.appendChild(div_main);

        div = document.createElement('div');
        div.className = 'main-top';
        div.innerHTML = '<img src="img/novideos.png" width="200" height="200">';

        content.appendChild(div);

        div3 = document.createElement('div');
        div3.className = 'main-bottom';

        var div4 = document.createElement('div');
        div4.className = 'main-bottom-text';
        div4.innerHTML = "Please try to <span style=\"color:green\">start a playback</span></br> if you see a video on the page </br><span class=\"small\">This will help us to find video file</span><span class=\"thank\">Thank you for understanding!</span>";
        div3.appendChild(div4);
        content.appendChild(div3);
    }
};

function mark_started(b) {

    if (!b.getAttribute('disabled')) {
        b.setAttribute('disabled', 'disabled');
        b.innerHTML = '<div class=\'uil-ellipsis-css\' style=\'transform:scale(0.37);\'><div class="ib"><div class="circle"><div></div></div><div class="circle"><div></div></div><div class="circle"><div></div></div><div class="circle"><div></div></div></div></div>';
        b.previousSibling.innerHTML = '<p>Loading video fragments.<br>Please wait...</p>';
    }
}
/*
function blockedYouTube(content) {
    var div_main = document.createElement('div');
    div_main.className = 'title-video-list';

    content.innerHTML = '';

    content.appendChild(div_main);

    var div = document.createElement('div');
    div.className = 'main-top';
    div.innerHTML = '<img src="img/no-youtube.jpg" alt="no youtube">';

    var div2 = document.createElement('div');
    div2.className = 'main-top-title';
    div2.innerHTML = "Google Chrome policy  <span style=\"color:red;\">does not allow</span></br>downloading streaming content directly from YouTube</br><span style='font-size: 16px'>Try to find this video on another site<br></span>";
    div.appendChild(div2);

    content.appendChild(div);

    var div3 = document.createElement('div');
    div3.className = 'main-bottom';

    var div4 = document.createElement('div');
    div4.className = 'main-bottom-text';
    div4.innerHTML = "<span class=\"small\">Please do not rate us bad because of that</span><span class=\"thank\">Thank you for understanding!</span>";
    div3.appendChild(div4);

    content.appendChild(div3);
}*/


var startDownloading = function (e) {
    var videoId = e.target.getAttribute('id').split('ton')[1];
    console.log("Clicked on #" + videoId);
    chrome.runtime.sendMessage({msg: 'startDownloading', tabId: tabId, videoId: videoId}, function (response) {
        if (response.started) {
            mark_started(e.target)
        } else {
            alert("Can't download this video! Try again.")
        }
    });
};

var render = function () {
    chrome.tabs.query({active: true, currentWindow: true}, function (result) {
        if (!result.length)
            return;

        tabId = result[0].id;
        chrome.runtime.sendMessage({msg: 'getVideos', tabId: tabId}, function (response) {
            if (response.fetchedVideos) {

                page = response.fetchedVideos.page;

                videos = [];
                for (var uid in response.fetchedVideos.videos)
                    videos.push(response.fetchedVideos.videos[uid]);

                videos.sort(function (a, b) {
                    return b.size - a.size
                });

            }
            renderPage();
        });
    });
};

var renderInterval = setInterval(render, 2500);

render();

