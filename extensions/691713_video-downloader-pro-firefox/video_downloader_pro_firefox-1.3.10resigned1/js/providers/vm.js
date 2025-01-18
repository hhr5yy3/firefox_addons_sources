const VMProvider = class extends AbstractProvider {
    search() {
        const $p = $('.player_container');
        if(!$p.length) return;
        const vid = this.getVideoIdByHtml($p[0]);
        if(vid && !this.ids[vid]) this.addVideo(vid);
    }

    getVideoIdByHtml(el) { return el.id.replace('clip_', ''); }

    getVideoData(vid, cb) {
        const url = `https://player.vimeo.com/video/${vid}/config`;
        $.get(url, res => {
            const title  = $('h1').text();
            const params = res.request.files['progressive'];
            const videos = [];

            ['360p', '480p', '720p', '1080p'].forEach(quality => {
                const item = params.find(p => p.quality === quality);
                if(item) videos.push(new Video(title, item.url, quality));
            });

            cb(videos);
        });
    }
};
