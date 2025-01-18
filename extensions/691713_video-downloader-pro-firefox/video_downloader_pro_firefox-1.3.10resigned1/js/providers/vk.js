const VKProvider = class extends AbstractProvider {
    search() {
        $(`video:not(.fvd-mtz-init)`).each((i, el) => {
            const vid = this.getVideoIdByHtml(el);
            if(vid && !this.ids[vid]) this.addVideo(vid);
            $(el).addClass('mtz-init');
        });

        $('.page_post_thumb_video[data-video]:not(.mtz-init)').each((i, el) => {
            const vid = $(el).attr('data-video');
            if(vid && !this.ids[vid]) this.addVideo(vid);
            $(el).addClass('mtz-init');
        });
    }

    getVideoIdByHtml(video) {
        const wrap = video.closest('.video_box_wrap');
        if(!wrap) return;

        const vid = wrap.id.replace('video_box_wrap', '');
        if (!vid){ console.warn('video id not found'); return;}

        return vid;
    }

    getVideoData(vid, cb) {
        const url = 'https://vk.com/al_video.php?act=show_inline&al=1&video=' + vid;
        $.get(url, res => {
            var data = new RegExp("<!json>(.*)").exec(res), t;
            if(!data) return;
            t = data[1];
            t = t.split('<!>')[0];
            t = JSON.parse(t);
            if(!t) return;
            const params = t['player']['params'][0];
            const extra  = params['extra_data'];
            const videos = [];
            const title  = params['md_title'];

            if(params['url360']) videos.push(new Video(title, params['url360'], '360p'));
            if(params['url480']) videos.push(new Video(title, params['url480'], '480p'));
            if(params['url720']) videos.push(new Video(title, params['url720'], '720p'));

            if(extra && extra.includes('instagram')){
                const url = 'https:' + extra;
                videos.push(new Video(title, url, '640p'));

            } else if(extra && /^[a-zA-Z0-9\-_]+$/.test(extra)){
                //console.log('extra video', vid, params);

            } else {
                //console.log('unknown video', vid, params);
            }

            cb(videos);
        });
    }
};

