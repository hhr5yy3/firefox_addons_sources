const YTProvider = class extends AbstractProvider {
    search() {
        const vid = this.getIdFromLocation();
        if(vid) {
            if(this.ids[vid]) return;
            this.addVideo(vid);

        } else {
            this.ids = {};
            this.videos = [];
        }
    }

    getIdFromLocation() {
        const url = document.location.href;
        let vid   = url.match(/\/watch\?(?:.+&)?v=([\w\-]+)/i);
        vid       = vid && vid[1];

        return vid || null;
    }

    getVideoData(vid, cb) {
        //console.log(vid);
        const req = {action: 'getYoutubeLinks', extVideoId: vid};
        YT.getYoutubeLinks(req, res => {
            const _links = res.links || {};
            const title  = res.title;
            const videos = [];
            const variants = [
                {quality: '360p', url: _links['18']},
                {quality: '480p', url: _links['59']},
                {quality: '720p', url: _links['22']},
            ];
            //console.log(variants);
            variants.forEach(v => {
                if(!v.url) return;
                videos.push(new Video(title, v.url, v.quality));
            });

            //console.log(videos);
            cb(videos);
        });
    }
};
