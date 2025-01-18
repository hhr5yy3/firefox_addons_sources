/* globals exports */
function Constants() { //jshint ignore : line
    //Common constants
    this.accepted_photos_index = "acceptedPhotosIdx";
    this.cache_threshold_number = 5;
    this.next_cache_size = 10;
    this.bgphotos_json_path = "https://sxh.yimg.com/jf/flickr-assets/json/o_flickr_page_{page}.json";
    this.bgphotos_photos_path = "https://sxh.yimg.com/jf/flickr-assets/photos/";
    this.tn_url = "https://search.yahoo.com/trending/us_general.json";
    this.tnFrCode = "yset_chr_syc_tn";
    this.befrugal_url = "http://www.befrugal.com/lp/yahoo";
    this.weather_url = "https://query.yahooapis.com/v1/public/yql?q=";
    this.weatherUI = false;
    this.tn_interval = 300000; //Trending Now stories will be updated every 5 mins
    this.tn_enable_value = "2";
    this.finance_interval = 1200000; //Finance stories will be updated every 20 minutes
    this.accept_beacon_timeout = 180000;
    this.accept_beacon_interval = 120000;
    this.twoWeeks = 14*24*3600*1000;
    this.aWeek = 7*24*3600*1000;
    this.footerUpdatedStart = 1523289600000; //april 3rd 2018
    this.footerUpdatedEnd = 1543104000000; //november 25th 2018
    this.video_media = "video";
    this.ratio_min = 1.0;//1.4;
    this.ratio_max = 1.85;
    this.width5 = 1175;
    this.width4 = 920;
    this.width3 = 580;
    this.timeout_serverError = 1800000;
    this.timeout_ffOffline = 60000;
    this.uiContainerWidth = 360;
    this.uiContainerWithSearchProtectWidth = 420;
    this.topSitesRefreshTime = 3600000; //1 hour
    this.historyRefreshTime = 600000; //10 minutes
    this.refreshPhotosTimeLimit = 14*24*3600*1000; //2 weeks
    this.titleStringLength = 18;
    this.ffTopSites = 20;
    this.tracker_page_info = "page_info";
    this.tracker_click_info = "click_info";
    this.tracker_accept = "accept";
    this.tracker_type_newtab = "newtab";
    this.tracker_type_search = "search";
    this.tracker_type_interval = "interval_{N}";
    this.tracker_link_view = "link_view";
    this.tracker_install = 'install';
    this.tracker_upgrade = 'upgrade';
    this.tracker_uninstall = 'uninstall';
    this.tracker_alive = 'live';
    this.tracker_search_modified = 'modified';
    this.tracker_alive_ping_interval = 28800000 ;// 8 hrs = 8 * 60 * 60 * 1000 milli sec.
    this.tracker_alive_ping_interval_we = 86400000;
    this.tracker_gpos_topsites = 1;
    this.tracker_gpos_search_protect_panel = 2;
    this.tracker_gpos_flickr = 3;
    this.tracker_gpos_feedback = 5;
    this.tracker_gpos_search_box = 4;
    this.tracker_flickrArea_p_owner = 1;
    this.tracker_flickrArea_p_flickrlogo =2;
    this.tracker_searchArea_p_search_box = 1;
    this.tracker_searchArea_p_search_suggestion = 2;
    this.tracker_feedbackArea_p_feedback = 1;
    this.tracker_topSitesArea_p_edit = 11;
    this.tracker_topSitesArea_p_done = 12;
    this.tracker_searchArea_slk_search_box = "newtab_search_box";
    this.tracker_searchArea_slk_search_suggestion = "newtab_search_suggestion";
    this.tracker_vtestid = "default";
    this.keycode_up = 38;
    this.keycode_down = 40;
    this.keycode_left = 37;
    this.keycode_right = 39;
    this.keycode_enter = 13;
    this.keycode_control = 17;
    this.keycode_command_l = 91;
    this.keycode_command_r = 93;
    this.keycode_delete = 8;
    this.suggestionDisplayCount = 6;
    this.suggestionSitesCount = 2;
    this.initialSuggestIndex = -1;
    this.tracker_browser_chr = "chr";
    this.tracker_browser_ff = "ff";
    this.tracker_browser_sf = "sf";
    this.maxBgPhotosStored = 50;
    this.splicePercent = 0.5;
    this.acceptedPhotosRemaining = 20;
    this.rightToggleViewDistance = 25;
    this.iconToggleDistance = 4;
    this.iconsPerRow = 9;
    this.shortenStringLength = 25;

    this.distributionDefaultChannel = "external-oo";
    this.beaconDefaultPath = "p";
    this.installDateTag = "(d)";
    this.remoteConfigPath = "https://search.yahoo.com/jf/ext/conf/newtab/";

    this.defaultConfig = {
      "searchConfig": {
        "searchType": "fr",
        "frCode": {
          "chrome": "yset_chr_cnewtab",
          "firefox": "yset_ff_hp_cnewtab",
          "safari": "yset_sf_cnewtab"
        },
        "hsimp": "yhs-102",
        "hspart": "mozilla",
        "subCampaigns": true
      },
      "spaceid": {
        "chrome": 151340124,
        "firefox": 151340125,
        "safari": 151340134
      },
      "trendingNow": {
        "type": "ono"
      },
      "tracker": {
        "frCode": {
          "chrome": "yset_chr_cnewtab",
          "firefox": "yset_ff_hp_cnewtab",
          "safari": "yset_sf_cnewtab"
        }
      },
      "partnerCode": "yahoo",
      "amp_desc_dist": "oo"
    };

    this.amp_desc_type = "newtab";
    this.amp_desc_dist_default = "oo";

    this.headerExtName = "x-extensions-installed";
    this.headerExtValue = "newtab-v2";

    //Common distribution variables
    this.typeParam = "newtabv2Aug27";
    this.typeDefault = "newtabv2Aug27";
    this.typeIcon = "icon";
    this.typeHomePage = "hpset";
    this.chrome_space_id = 151340124;
    this.firefox_space_id = 151340125;
    this.safari_space_id = 151340134;

    this.mktg_external = "external-mktgsem";
    this.mktg_url = "https://6824905.fls.doubleclick.net/activityi;src=6824905;type=nwtb;cat=nwtbconf;u1={GUID};u2={USERTYPE};u4={BROWSER};dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;ord=1?";

    //Firefox Specific Constants
    this.yahoo_url_regexp = ".*.yahoo.*";
    this.chrome_ext_url_pattern = "*://chrome.google.com/webstore/detail/search-and-new-tab-by-yah*";
    this.amo_pattern_url = "*://addons.mozilla.org/*/firefox/addon/search-and-new-tab-by-yahoo*"; //used by webExtension
    this.befrugal_pattern_url = "*://*.couponviewer.com/*";
    this.yahoo_pattern_url = "https://*.yahoo.com/*"; //used by webExtension
    this.browser_newtab_url = "browser.yahoo.newtab.url";
    this.privacy_url = "https://policies.yahoo.com/us/en/yahoo/privacy/index.htm";
    this.terms_url = "https://policies.yahoo.com/us/en/yahoo/terms/utos/index.htm";
    this.privacy_dashboard_label = "Privacy Dashboard";
    this.privacy_dashboard_url = "https://yahoo.mydashboard.oath.com/";
    this.protect_interval = 1296000000; // = 15 days = 15 * 24 * 60 * 60 * 1000 milli sec.
    this.search_protect_accept = "acceptDiv";
    this.search_protect_decline = "declineButton";
    this.tracker_searchProtectArea_p_accept = 1;
    this.tracker_searchProtectArea_p_decline = 2;
    this.tracker_gpos_searchSetDialog = 5;
    this.tracker_searchSetDialog_p_okay = 1;
    this.tracker_searchSetDialog_p_cancel = 2;
    this.tracker_searchSetDialog_sec_okay = "ff_searchset_dialog_okay";
    this.tracker_searchSetDialog_sec_cancel = "ff_searchset_dialog_cancel";
    this.tracker_searchSetDialog_slk_okay = "okay";
    this.tracker_searchSetDialog_slk_cancel = "cancel";
    this.tracker_searchSet_delc = "ext_ss";
    this.tracker_reject = "reject";

    this.offlinePhotos = [
        {
            title: "New Mexico Sands",
            owner: "126360766@N06",
            url_l: "offlinephotos/newmexico.JPG",
            dataURL: "offlinephotos/newmexico.JPG",
            ownername: "Suraj Saripalli"
        }
    ];

    this.finance_quotes_url = "https://partner-query.finance.yahoo.com/v6/finance/quote/?symbols={QUOTES}&formatted=true&lang={lang}&region={region}&modules=quoteType,summaryDetail,description,quoteDetail,price";
    this.finance_basic_quotes_url = "https://partner-query.finance.yahoo.com/v6/finance/basicQuote/?symbols={QUOTES}&formatted=true&lang={lang}&region={region}&debug=true&crumb={CRUMB}";
    //this.finance_trending_url = "http://finance-yql.v1.production.manhattan.gq1.yahoo.com/v1/finance/trending/us?debug=true";
    this.finance_news_url = "https://partner-query.finance.yahoo.com/ws/newsfeed/v2/finance/partner/quotefeeds?count=20&symbols={QUOTES}&lang={lang}&region={region}&yext=1";
    //this.finance_top_news_url = "https://finance.mobile.yahoo.com/dp/v2/newsfeed?category=generalnews&count=20";
    this.finance_autosuggest_quote = 'https://partner-query.finance.yahoo.com/v6/finance/autocomplete?query={QUERY}&region={region}&lang={lang}';
    this.finance_watchlist_url = "https://partner-query.finance.yahoo.com/v6/finance/portfolio";
    this.finance_crumb_url = "https://partner-query.finance.yahoo.com/v1/test/getcrumb";
    this.finance_property_url = "https://{region}finance.yahoo.com";
    this.finance_quote_page = "https://{region}finance.yahoo.com/quote/";
    this.finance_default_lang = "en-US";
    this.finance_default_region = "US";
    this.defaultQuotes = {
        "US": ["^DJI", "^GSPC", "^IXIC", "FB", "AAPL", "VZ"],
        "TW": ["^TWII", "2330.TW", "6505.TW", "2317.TW", "2412.TW", "1326.TW", "1301.TW", "1303.TW", "2882.TW", "2881.TW", "3008.TW", "1216.TW", "2891.TW", "2002.TW", "2454.TW", "3045.TW", "2886.TW", "2912.TW", "3711.TW", "2308.TW"],
        "HK": ["0700.HK", "0939.HK", "0941.HK", "0005.HK", "1299.HK", "0883.HK", "2318.HK", "1398.HK", "0267.HK", "0011.HK", "0016.HK", "2388.HK", "0001.HK", "0388.HK", "3988.HK", "0688.HK", "0762.HK", "1928.HK", "0066.HK", "0003.HK"]
    };
    this.finance_add_new_quote = "addNewQuote";
    this.finance_add_symbol_button = "addSymbolBtn";
    this.finance_log_out_button = "logOutBtn";
    this.finance_more_news_button = "moreNewsBtn";
    this.finance_news_article = "newsArticle";
    this.finance_quote_link = "quoteLink";
    this.finance_delete_quote_btn = "deleteQuoteBtn";
    this.finance_portfolio_link = "portfolioLink";
    this.finance_portfolio_url = "https://{region}finance.yahoo.com/portfolio/{p_id}/view/v1";
    this.normalAnimation = 400;
    this.slowAnimation = 600;
    this.financeUI = false;
    this.aolUI = false;
    this.feelGoodUI = false;
    this.financeQuotesShowMax = 6;
    this.financeNewsShowMax = 8;
    this.financeQuotesSuggestMax = 6;

    //AOL specific constants
    this.aolNewsApi = "https://releases.aol.com/api/v2/buffet/us_news_browser_ext";
    this.aolFinanceApi = "https://releases.aol.com/api/v2/buffet/us_finance_browser_ext";
    this.aolSportsApi = "https://releases.aol.com/api/v2/buffet/us_sports_browser_ext";
    this.aolArticlesShowMax = 8;

    //FeelGood API
    this.feelGoodStoryAPI = "https://sxh.yimg.com/jf/feelgood/story_latest.json";
    this.feelGoodQueryAPI = "https://sxh.yimg.com/jf/feelgood/query_latest.json";
    this.feelGoodSRP = "https://search.yahoo.com/search?p=feel good stories";

    //Chrome Specific Contstants
    this.clueAttemptCount = 5;
    this.clueAttemptTimeout = 5 * 1000;
    this.extensionUninstallUrl = "https://downloads.yahoo.com/goodbye";

    //sports specific constant for Chrome
    this.sportsUI = false;
    this.sports_home = "https://sports.yahoo.com";
    this.sports_trendingID_url = "https://api-secure.sports.yahoo.com/v1/editorial/s/trending_game_ids?trending_config=new_tab&ysp_new_tab=1";//works on IP address
    this.default_gameType= "mlb";
    //sports scoreBoard
    this.scoreBoard_url = "https://api-secure.sports.yahoo.com/v1/editorial/s/scoreboard?lang=en-US&region=US&tz=America%2FLos_Angeles&ysp_redesign=1&leagues={GAME}&date=current&v=2&ysp_enable_last_update=1&ssl=true&ysp_new_tab=1";

    this.sports_interval = 900000;// 15 mins
    this.mlb_standing = {
        'conference_abbr': 'AL',
        'conference': 'American League',
        'division': 'East'
    };
    this.nfl_standing = {
        'conference_abbr': 'AFC',
        'conference': 'American',
        'division': 'East'
    };
    this.nhl_standing = {
        'conference_abbr': '',
        'conference': 'Eastern',
        'division': 'Atlantic'
    };
    this.nba_standing = {
        'conference_abbr': '',
        'conference': 'Eastern',
        'division': 'Atlantic'
    };

    //sports standings
    this.standings_url = "https://api-secure.sports.yahoo.com/v1/editorial/league/{STANDINGS};enable_structure=1;out=seasons;season=standings/teams;season=;division=;top_division_only=;conf_id=;out=images:only_type=image.type.team_logo_sportacular_white_bg,standings/stat_categories;alias=full_standings;season=;season_period=/stat_types/stats?lang=en-US&region=US&tz=America%2FLos_Angeles&ysp_grand_slam=1&ysp_redesign=1&format=json&ssl=true&ysp_new_tab=1";
    this.more_standings_url = "https://sports.yahoo.com/{GAME}/standings/";

    //trendingPlayers
    this.player_part1 = "https://api-secure.sports.yahoo.com/v1/editorial/team/";
    this.player_part2 = "/players;out=bio,positions,depth_chart_positions/images;width=124;height=172;type=large_cutout_hd?ysp_grand_slam=1&lang=en-US&format=json&ysp_new_tab=1";

    //trendingNews
    this.news_part1 = "https://api-secure.sports.yahoo.com/v1/editorial/article_index;use_top_headlines=1;out=text;count=4;content_types=lgns;leagues=";
    this.news_part2 = "?ssl=1&lang=&format=json&ysp_new_tab=1";

    //For the beacon
    this.sports_standings_link = 'standings';
    this.sports_live_link = 'live';
    this.sports_upcoming = 'upcoming';
    
}

