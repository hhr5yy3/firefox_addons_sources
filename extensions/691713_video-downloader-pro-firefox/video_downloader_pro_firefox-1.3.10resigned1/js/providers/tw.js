const TWProvider = class extends AbstractProvider {
    constructor() {
        super();
        this.oauth2_access_token = null;
        this.getAccessToken();
    }

    getAccessToken(cb) {
        const pr = this;
        $.ajax({
            type: 'POST',
            url: TWProvider.OAUTH2_TOKEN_API_URL,
            headers: {
                'Authorization': 'Basic ' + TWProvider.ENCODED_TOKEN_CREDENTIAL,
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            data: {'grant_type': 'client_credentials'},
            dataType: 'json',
            xhrFields: {withCredentials: false},
            success: res => {pr.oauth2_access_token = res['access_token']; cb && cb(); }
        });
    }

    search() {
        if(!this.oauth2_access_token) return;

        $('video').not('.fvd-mtz-init').each((i, el) => {
            const $el = $(el);
            const tweetId = $el.closest('[data-item-id]').attr('data-item-id');
            if(tweetId && !this.ids[tweetId]) this.addVideo(tweetId);
            $el.addClass('fvd-mtz-init');
        });
    }

    getVideoData(tweetId, cb) {
        const url = `https://api.twitter.com/1.1/statuses/show.json?id=${tweetId}&include_profile_interstitial_type=1&include_blocking=1&include_blocked_by=1&include_followed_by=1&include_want_retweets=1&skip_status=1&cards_platform=Web-12&include_cards=1&include_ext_alt_text=true&include_reply_count=1&tweet_mode=extended&trim_user=false&include_ext_media_color=true`;

        $.ajax({
            type: 'GET', url, dataType: 'json',
            headers: {'Authorization': 'Bearer ' + this.oauth2_access_token},
            success: res => {
                const title = res['full_text'];
                const videos = [];
                res['extended_entities']['media'][0]['video_info']['variants']
                    .filter(v => v['content_type'] === 'video/mp4')
                    .forEach(v => {
                        const url     = v.url;
                        const m       = url.match(/vid\/(.+)\//);
                        const quality = m && m[1] ? m[1] : '';

                        videos.push(new Video(title, url, quality));
                    });

                cb(videos);
            }
        });
    }
};

TWProvider.OAUTH2_TOKEN_API_URL     = 'https://api.twitter.com/oauth2/token';
TWProvider.ENCODED_TOKEN_CREDENTIAL = 'd2duSVAyeVVLQllUYVdRamg2MUYzR3NCbTpBeXNpdVFuclRYOG51UlNJWUp4OE1zaTdXbTAxTnJrNVBlNVptOTVXZXZFQU83Z0xzMw==';
