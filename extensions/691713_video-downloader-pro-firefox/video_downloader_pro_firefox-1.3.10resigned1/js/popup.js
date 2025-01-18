class Popup {
    constructor() {
        this.tabId  = null;
        this.page   = {};
        this.videos = {};
        this.$contentEl = $('#content');

        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
            if (!tabs.length) return;
            this.tabId  = tabs[0].id;
            this.tabUrl = tabs[0].url;
            const useProvider = [
                'dailymotion.com',
                'facebook.com',
                'instagram.com',
                'twitter.com',
                'vk.com',
                'vimeo.com',
                'youtube.com',
            ].some(site => tabs[0]['url'].includes(site));

            if (useProvider) {
                chrome.tabs.sendMessage(tabs[0].id, {action: 'getVideo'}, res => {
                    //console.log('getVideo: ', res);
                    this.fetchVideos({fetchedVideos: {videos: res, page: tabs[0]}})
                });

            } else {
                chrome.runtime.sendMessage({msg: 'fetchVideos', tabId: this.tabId}, r => this.fetchVideos(r));
            }
        });
    }

    fetchVideos(response) {
        if (response.fetchedVideos) {
            this.page   = response.fetchedVideos.page;
            this.videos = response.fetchedVideos.videos || [];
        }
        this.renderPage();
        this.initHandlers();
    }

    initHandlers() {
        const $b = $(document.body);
        $b.on('click', '.download', e => {
            const $btn = $(e.target).closest('button.download');
            chrome.runtime.sendMessage({
                msg:      'startDownloading',
                tabId:    this.tabId,
                url:      $btn.attr('url'),
                filename: $btn.attr('filename'),
            });
        });
    }

    renderPage() {
        if(Object.keys(this.videos).length) this.renderVideosPage();
        else this.renderNoVideoPage();
    }

    renderVideosPage() {
        let ul_list_html = '';

        for (let i in this.videos) {
            const video = this.videos[i];
            const quality = video.quality ? `(${video.quality})` : '';

            ul_list_html += `
                <li class="video-item">
                    <video src="${video.url}" class="preview"></video>
                    <div class="video-title" title="${video.filename}">${quality} ${video.filename}</div>
                    <button class="download" url="${video.url}" filename="${video.filename}"> 
                        <span>Download - ${video.formattedSize}</span>
                    </button>
                </li>
                <li class="hr"></li>
            `;
        }
        this.$contentEl.html(`
            <ul class="video-list" id="ul_list">${ul_list_html}</ul>    
        `);
        $('li.hr').last().remove();
    }

    renderNoVideoPage() {
        this.$contentEl.html(`
            <div class="main-top">
                <img src="/img/128.png">
                <div class="main-top-title">No videos found</div>
            </div>
            <div class="main-bottom">
                <div class="main-bottom-text">Please try to <span style="color:green">start a playback</span><br>
                    if you see a video on the page <br>
                    <span class="small">This will help to grab the right video file</span>
                    <span class="thank">Thank you for understanding!</span>
                </div>
            </div>
        `);
    }

}

// noinspection JSUnusedGlobalSymbols
const  p = new Popup();
