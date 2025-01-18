const INProvider = class extends AbstractProvider {
    search() {
        $('.v1Nh3.kIKUG').not('.fvd-mtz-init').each((i, el) => {
            const $el  = $(el);
            const href = $el.children('a').attr('href');

            if(href && !this.ids[href]) this.addVideo(href);
            $el.addClass('fvd-mtz-init');
        });

        $('article video').not('.fvd-mtz-init').each((i, el) => {
            const $el  = $(el);
            const href = $el.closest('article').find('a.c-Yi7').attr('href');

            if(href && !this.ids[href]) this.addVideo(href);
            $el.addClass('fvd-mtz-init');
        });
    }

    getVideoData(href, cb) {
        $.get(href, res => {
            const title   = this.getVideoTitle(res);
            const url     = this.getVideoUrl(res);
            const quality = '640p';
            const videos = [];
            if(url) videos.push(new Video(title, url, quality));
            cb(videos);
        });
    }

    getVideoTitle(html) {
        const m = html.match(/<title>([\s\S]+?)<\/title>/);
        return m && m[1] ? m[1] : '';
    }

    getVideoUrl(html) {
        const m = html.match(/<meta property="og:video"\s+content="(.+)"\s+\/>/);
        return m && m[1] ? m[1] : null;
    }
};
