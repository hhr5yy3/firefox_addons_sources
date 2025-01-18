const AbstractProvider = class {
    constructor() {
        this.ids = {};
        this.videos = [];
        this.setBadge();
        setInterval(() => this.search(), 1000);
    }

    search() {}

    addVideo(vid) {
        this.ids[vid] = true;
        this.getVideoData(vid, videos => {
            this.videos = this.videos.concat(videos);
            //console.log('Added new video', videos);
            this.setBadge();
        });
    }

    getVideoData() {}

    setBadge() {
        chrome.runtime.sendMessage({msg: 'setBadge', value: this.videos.length});
    }
};
