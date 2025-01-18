document.getElementById('topstories').addEventListener('click', function () {
    onLoad("top");
})
document.getElementById('livenews').addEventListener('click', function () {
    onLoad("live");
})
window.addEventListener("load", function () {
    onLoad("top");
});
async function onLoad(type) {
    document.getElementById('overlay-loader').style.display = 'block'
    document.getElementById('news').innerHTML = "";
    if (type != 'top') {
        await fetch('https://streamlivenews.com/firefox/public/top_stories')
            .then(res => res.json())
            .then(data => {
                document.getElementById('overlay-loader').style.display = 'none'
                if (type == "top" || type == "live") {
                    newsStream(data, type)
                }
            })
            .catch((function (e) {
                console.log(e)
            }))
    } else {
        await fetch('https://streamlivenews.com/firefoxwebsitedatabase/fetch_api.php?type=extension')
            .then(res => res.json())
            .then(data => {
                document.getElementById('overlay-loader').style.display = 'none'
                newsStream(data, type)
            })
            .catch((function (e) {
                console.log(e)
            }))
    }
}
function newsStream(result, type) {
    let data;
    if (type != 'top') {
        data = result.results[type]
    } else {
        data = result;
    }
    data.map(function (newsData) {
        const title = newsData.title.length > 64 ? newsData.title.substring(0, 64) + "..." : newsData.title;
        const staticDiv = document.createElement('div');
        const aTag = document.createElement('a');
        const newsDiv = document.createElement('div');
        const pTag = document.createElement('p');
        const imgTag = document.createElement('img');
        const newsContent = document.createElement('div');
        const h6 = document.createElement('h6');
        const sourceP = document.createElement('p');

        newsDiv.classList.add("news_img");

        imgTag.src = newsData.thumbnail;
        imgTag.width = "100";
        imgTag.height = "75";

        newsContent.classList.add('news_content');
        h6.textContent = title;
        sourceP.textContent = newsData.chanelname;
        aTag.setAttribute("href", newsData.url);
        aTag.setAttribute("target", "_blank");
        staticDiv.classList.add('staticNews');

        newsDiv.appendChild(imgTag);
        if (type === 'live') {
            pTag.classList.add('livebtn');
            pTag.textContent = 'LIVE';
            newsDiv.appendChild(pTag);
        }
        newsContent.appendChild(h6);
        newsContent.appendChild(sourceP);
        aTag.appendChild(newsDiv);
        aTag.appendChild(newsContent);
        staticDiv.appendChild(aTag);
        let cleanHTML = DOMPurify.sanitize(staticDiv);
        document.getElementById("news").innerHTML += cleanHTML;
    });
}