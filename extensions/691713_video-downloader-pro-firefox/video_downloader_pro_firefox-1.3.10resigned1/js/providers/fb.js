const FBProvider = class extends AbstractProvider {
    search() {
        $('video').not('.fvd-mtz-init2').each((i, videoEl) => {
            const el = videoEl.closest('[data-testid="fbfeed_story"], [role="article"], [data-bt], ._5asm, ._5-yb._5_63, ._4-u2.mbm._4mrt._5jmm, ._5-yb._5_63');
            const vid = this.getVideoIdByHtml(el);
            if(vid && !this.ids[vid]) this.addVideo(vid);
            videoEl.classList.add('fvd-mtz-init2');
        });
    }

    getVideoIdByHtml(el) {
        if(!el) return console.warn('No parent target selector.');
        const m = /\/videos\/(\d+)[^\/?]?/g.exec(el.outerHTML);
        if (m && m[1]) return m[1];

        const m2 = /\/videos\/[a-z]{2,3}\.\d+\/(\d+)\/?/g.exec(el.outerHTML);
        if (m2 && m2[1]) return m2[1];

        const m3 = /ajaxify=".+?&amp;id=(\d+)&amp;/.exec(el.outerHTML);
        if (m3 && m3[1]) return m3[1];

        const m4 = /ajaxify="\/ajax\/sharer\/\?s=\d+&amp;appid=\d+&amp;id=(\d+)&/g.exec(html);
        if (m4 && m4[1]){ return m4[1];}

        const m5 = /;mf_story_key&quot;:&quot;(\d+)&/g.exec(html);
        if (m5 && m5[1]){ return m5[1];}

        //console.warn('video id not found.', el);
        return false;
    }

    getVideoData(vid, cb) {
        const url = 'https://www.facebook.com/video.php?v=' + vid;
        const request = new Request(url, {method: 'GET', redirect: 'follow'});

        fetch(request).then(r => r.text()).then(data => {
            const title = this.getVideoTitle(data);
            const hdSrc = this.getHDSrc(data);
            const sdSrc = this.getSDSrc(data);
            const videos = [];

            if(hdSrc) videos.push(new Video(title, hdSrc, '360p'));
            if(sdSrc) videos.push(new Video(title, sdSrc, '720p'));
            cb(videos);
        });
    }

    getHDSrc(html) {
        const m = /hd_src_no_ratelimit:"([^"]+)"/.exec(html);
        return m && m[1] ? m[1] : null;
    }

    getSDSrc(html) {
        const m = /sd_src_no_ratelimit:"([^"]+)"/.exec(html);
        return m && m[1] ? m[1] : null;
    }

    getVideoTitle(html) {
        const m1 = /h2 class="uiHeaderTitle"?[^>]+>(.+?)<\/h2>/.exec(html);
        if(m1 && m1[1]) return m1[1];

        const m2 = /title id="pageTitle">([\s\S]+?)<\/title>/.exec(html);
        if(m2 && m2[1]) return m2[1];

        return '';
    }
};
