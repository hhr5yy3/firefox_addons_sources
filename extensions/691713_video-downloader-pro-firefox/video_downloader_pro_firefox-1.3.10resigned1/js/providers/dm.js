const DMProvider = class extends AbstractProvider {
    search() {
        const vid = this.getIdFromLocation();
        if(vid && !this.ids[vid]) this.addVideo(vid);
    }

    getIdFromLocation() {
        if(/^\/\w{0,2}$/.test(location.pathname)) return null; // игнорим "/us" итд.
        return location.pathname.replace('/video/', '');
    }

    getVideoData(vid, cb) {
        const url = 'https://www.dailymotion.com/video/' + vid;
        chrome.runtime.sendMessage({msg: 'ajaxGet', url: url}, res => {
            const videos = this.getVideoDataFromHTML(res);
            videos && cb(videos);
        });
    }

    getVideoDataFromHTML(str) {
        if(!str) { console.warn('!str for parsing'); return; }

        const startStr   = "var __PLAYER_CONFIG__ = {";
        const endStr     = "};";
        const startIndex = str.indexOf(startStr);
        const endIndex   = str.indexOf(endStr, startIndex);

        const json = str.substr(startIndex + startStr.length - 1, endIndex - startIndex - startStr.length + endStr.length);
        const config = JSON.parse(json);
        const title  = config.metadata.title;
        const videos = [];

        ['380', '480', '720@60'].forEach(quality => {
            const url = this.getUrlFromConfig(config, quality);
            if(url) videos.push(new Video(title, url, quality));
        });

        return videos;
    }

    getUrlFromConfig(config, quality) {
        const item = config.metadata['qualities'][quality];
        if(!item) return;

        const mp4 = item.find(i => i.type === 'video/mp4');
        if(!mp4) return;

        return mp4.url;
    }
};
