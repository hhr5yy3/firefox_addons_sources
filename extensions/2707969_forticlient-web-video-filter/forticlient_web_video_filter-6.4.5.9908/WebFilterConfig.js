var VideoFilterConfig = {
    enabled: false,
    siteSettings: {
        youtube: {
            hideComment: false,
            safeSearch: false,
            restrictionLevel: '1'
        }
    }
}

var WebFilterConfig = {
    async_mode:false,
    main_url_rate_only: false, // It will rate url from address bar only.
    safesearch:false,
    log_all_URLs: false,
    ems_version: null,
    restrictionLevel: '0',
    videoFilterConfig: VideoFilterConfig,
    SetDefault: function() {
        this.safesearch = false;
        this.videoFilterConfig.siteSettings.youtube.safeSearch = false;
        this.videoFilterConfig.siteSettings.youtube.hideComment = false;
    }
};

export {WebFilterConfig};
