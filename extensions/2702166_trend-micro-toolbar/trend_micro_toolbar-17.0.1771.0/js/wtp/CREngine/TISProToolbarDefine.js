/*
 * Define image information
 */

/********************************************************************
 ** MAYBE NEED L10N this section, If not, Don't modify above code  **
 ********************************************************************/
var g_oImgDefine = {
    Nolink: {
        Tail: {
            TopRight: 'red_bottom_left.png',
            TopLeft: 'red_bottom_right.png',
            BottomRight: 'red_top_left.png',
            BottomLeft: 'red_top_right.png'
        },
        Content: {
            Icon: 'icon_nolink.png',
            TextColor: '#333',
            SiteUrlColor: '#999',
            LevelString: g_oRatingLevelToolTipString.LevelString.Nolink,
            HelpString: g_oRatingLevelToolTipString.HelpString.Nolink
        },
        WebIcon: 'webicon_nolink.png',
        Highlight: '189,189,189', //'#BDBDBD'
        DarkHeighlight: '66, 66, 66', //'#424242'
        DarkBaiduHeightlight: '85, 85, 85', //'#555555'
    },
    Safe: {
        Tail: {
            TopRight: 'red_bottom_left.png',
            TopLeft: 'red_bottom_right.png',
            BottomRight: 'red_top_left.png',
            BottomLeft: 'red_top_right.png'
        },
        Content: {
            Icon: 'icon_green.png',
            TextColor: '#333',
            SiteUrlColor: '#999',
            LevelString: g_oRatingLevelToolTipString.LevelString.Safe,
            HelpString: g_oRatingLevelToolTipString.HelpString.Safe
        },
        WebIcon: 'webicon_green.png',
        Highlight: '184,234,184', //'#b8eab8'
        DarkHeighlight: '0, 86, 15', //'#00560F'
        DarkBaiduHeightlight: '0, 120, 20', //'#007814'
    },
    Neutral: {
        Tail: {
            TopRight: 'red_bottom_left.png',
            TopLeft: 'red_bottom_right.png',
            BottomRight: 'red_top_left.png',
            BottomLeft: 'red_top_right.png'
        },
        Content: {
            Icon: 'icon_green.png',
            TextColor: '#333',
            SiteUrlColor: '#999',
            LevelString: g_oRatingLevelToolTipString.LevelString.Neutral,
            HelpString: g_oRatingLevelToolTipString.HelpString.Neutral
        },
        WebIcon: 'webicon_green.png',
        Highlight: '184,234,184', //'#b8eab8'
        DarkHeighlight: '0, 86, 15', //'#00560F'
        DarkBaiduHeightlight: '0, 120, 20', //'#007814'
    },
    Dangerous: {
        Tail: {
            TopRight: 'red_bottom_left.png',
            TopLeft: 'red_bottom_right.png',
            BottomRight: 'red_top_left.png',
            BottomLeft: 'red_top_right.png'
        },
        Content: {
            Icon: 'icon_red.png',
            TextColor: '#333',
            SiteUrlColor: '#ed1c24',
            LevelString: g_oRatingLevelToolTipString.LevelString.Dangerous,
            HelpString: g_oRatingLevelToolTipString.HelpString.Dangerous
        },
        WebIcon: 'webicon_red.png',
        Highlight: '250,143,143', //'#FA8F8F'
        DarkHeighlight: '184, 0, 6', //'#B80006'
        DarkBaiduHeightlight: '211, 0, 7', //'#D30007'
    },
    Suspicious: {
        Tail: {
            TopRight: 'red_bottom_left.png',
            TopLeft: 'red_bottom_right.png',
            BottomRight: 'red_top_left.png',
            BottomLeft: 'red_top_right.png'
        },
        Content: {
            Icon: 'icon_yellow.png',
            TextColor: '#333',
            SiteUrlColor: '#999',
            LevelString: g_oRatingLevelToolTipString.LevelString.Suspicious,
            HelpString: g_oRatingLevelToolTipString.HelpString.Suspicious
        },
        WebIcon: 'webicon_yellow.png',
        Highlight: '252,196,101', //'#FCC465'
        DarkHeighlight: '125, 46, 0', //'#7D2E00'
        DarkBaiduHeightlight: '183, 67, 0', //'#B74300'
    },
    Untested: {
        Tail: {
            TopRight: 'red_bottom_left.png',
            TopLeft: 'red_bottom_right.png',
            BottomRight: 'red_top_left.png',
            BottomLeft: 'red_top_right.png'
        },
        Content: {
            Icon: 'icon_gray.png',
            TextColor: '#333',
            SiteUrlColor: '#999',
            LevelString: g_oRatingLevelToolTipString.LevelString.Untested,
            HelpString: g_oRatingLevelToolTipString.HelpString.Untested
        },
        WebIcon: 'webicon_gray.png',
        Highlight: '189,189,189', //'#BDBDBD'
        DarkHeighlight: '66, 66, 66', //'#424242'
        DarkBaiduHeightlight: '85, 85, 85', //'#555555'
    },
    Trusted: {
        Tail: {
            TopRight: 'red_bottom_left.png',
            TopLeft: 'red_bottom_right.png',
            BottomRight: 'red_top_left.png',
            BottomLeft: 'red_top_right.png'
        },
        Content: {
            Icon: 'icon_green.png',
            TextColor: '#333',
            SiteUrlColor: '#999',
            LevelString: g_oRatingLevelToolTipString.LevelString.Trusted,
            HelpString: g_oRatingLevelToolTipString.HelpString.Trusted
        },
        WebIcon: 'webicon_green.png',
        Highlight: '184,234,184', //'#b8eab8'
        DarkHeighlight: '0, 86, 15', //'#00560F'
        DarkBaiduHeightlight: '0, 120, 20', //'#007814'
    },
    Blocked: {
        Tail: {
            TopRight: 'red_bottom_left.png',
            TopLeft: 'red_bottom_right.png',
            BottomRight: 'red_top_left.png',
            BottomLeft: 'red_top_right.png'
        },
        Content: {
            Icon: 'icon_red.png',
            TextColor: '#333',
            SiteUrlColor: '#999',
            LevelString: g_oRatingLevelToolTipString.LevelString.Blocked,
            HelpString: g_oRatingLevelToolTipString.HelpString.Blocked
        },
        WebIcon: 'webicon_red.png',
        Highlight: '250,143,143', //'#FA8F8F'
        DarkHeighlight: '184, 0, 6', //'#B80006',
        DarkBaiduHeightlight: '211, 0, 7', //'#D30007'
    },
    PCBlocked: {
        Tail: {
            TopRight: 'red_bottom_left.png',
            TopLeft: 'red_bottom_right.png',
            BottomRight: 'red_top_left.png',
            BottomLeft: 'red_top_right.png'
        },
        Content: {
            Icon: 'icon_red.png',
            TextColor: '#333',
            SiteUrlColor: '#999',
            LevelString: g_oRatingLevelToolTipString.LevelString.PCBlocked,
            HelpString: g_oRatingLevelToolTipString.HelpString.PCBlocked
        },
        WebIcon: 'webicon_red.png',
        Highlight: '250,143,143', //'#FA8F8F'
        DarkHeighlight: '184, 0, 6', //'#B80006'
        DarkBaiduHeightlight: '211, 0, 7', //'#D30007'
    },
    Limited: {
        Tail: {
            TopRight: 'red_bottom_left.png',
            TopLeft: 'red_bottom_right.png',
            BottomRight: 'red_top_left.png',
            BottomLeft: 'red_top_right.png'
        },
        Content: {
            Icon: 'icon_lock.png',
            TextColor: '#333',
            SiteUrlColor: '#999',
            LevelString: g_oRatingLevelToolTipString.LevelString.Limited,
            HelpString: g_oRatingLevelToolTipString.HelpString.Limited
        },
        WebIcon: 'webicon_lock.png',
        Highlight: '189,189,189', //'#BDBDBD'
        DarkHeighlight: '66, 66, 66', //'#424242'
        DarkBaiduHeightlight: '85, 85, 85', //'#555555'
    },
    ImgSize: {
        WebIcon: {
            width: 16,
            height: 16
        },
        Icon: {
            width: 46,
            height: 46
        },
        Tail: {
            width: 30,
            height: 60
        },
        PopupBodySize: {
            width: 300,
            height: 250 // max height
        },
        WarningIcon: {
            width: 16,
            height: 16
        }
    },
    LinkIcon: 'arrow_blue.gif',
    CloseIcon: 'close_pop.png',
    DotLine: 'dotline.gif',
    ShareIcon: 'trendlogo.png',
    LogoIcon: 'PC_Icon_Guide_16.png',
    CarbonLogoIcon: 'logo_icon16.png',
};

/*****************************************
 ** ATTENTION!! Don't modify above code **
 *****************************************/

/*
 * Define common constant
 */
var D_TSRSpanIDPrefix = 'TSRSpan_';
var D_TSRToolTipID = 'TSRToolTipLayer';
var D_TSRToolTipTailID = 'TSRToolTipTail';
var D_TSRToolTipBodyID = 'TSRToolTipBody';
var D_TSRToolTipTitleID = 'TSRToolTipTitle';
var D_TSRToolTipCloseSpanID = 'TSRToolTipCloseSpan';
var D_TSRToolTipLogoSpanID = 'TSRToolTipLogoSpan';
var D_TSRToolTipCloseID = 'TSRToolTipClose';
var D_TSRToolTipIconID = 'TSRToolTipIcon';
var D_TSRToolTipRLStringID = 'TSRToolTipRLString';
var D_TSRToolTipRLDetailedID = 'TSRToolTipRLDetailed';
var D_TSRToolTipRLDetailedShareID = 'TSRToolTipRLDetailedShare';
var D_TSRToolTipCheckUrlID = 'TSRCheckUrl';
var D_TSRToolTipSiteNameID = 'TSRToolTipSiteName';
var D_TSRToolTipSiteUrlID = 'TSRToolTipSiteUrl';
var D_TSRToolTipPhishingID = 'TSRToolTipPhishing';
var D_TSRToolTipTrustPageID = 'TSRToolTipTrustPage';
var D_TSRToolTipTrustPageLinkID = 'TSRToolTipTrustPageLink';
var D_TSRToolTipBGIkbLinkID = 'D_TSRToolTipBGIkbLinkID';
var D_TSRExplainHowToolbarWorksIkbLinkID = 'D_TSRExplainHowToolbarWorksIkbLinkID';

var D_TSRToolTipReviewPageID = 'TSRToolTipReviewPage';
var D_TSRToolTipReviewPageLinkID = 'TSRToolTipReviewPageLink';

var D_TSRToolTipShowClass = 'TSRshow';
var D_TSRToolTipHideClass = 'TSRhide';

var D_TSRHIGHLIGHT_COLOR_OFF = 'transparent';

var D_HTTP_PREFIX = 'http://';
var D_PIXEL_UNIT = 'px';

var D_SITE_MSG_TRUNCATE_LIMIT = 35;
var D_SITE_MSG_TRUNCATE_SUFFIC = '...';
var D_GAP_BETWEEN_ICON_TITLE = '2px';

var D_TOOLBAR_CALLBACK_ACTIVEX_PROG_ID = 'ProToolbarIMRatingActiveX.ToolbarCB';

/*
 * Define Rating Level mapping to Image Information Array
 * Don't feel free to modify this. It must map to plugin definition
 */
var g_oRatingLevel = {
    0: g_oImgDefine.Nolink,
    1: g_oImgDefine.Safe,
    2: g_oImgDefine.Neutral,
    3: g_oImgDefine.Dangerous,
    4: g_oImgDefine.Suspicious,
    5: g_oImgDefine.Untested,
    6: g_oImgDefine.Trusted,
    7: g_oImgDefine.Blocked,
    8: g_oImgDefine.PCBlocked,
    9: g_oImgDefine.Suspicious,
    100: g_oImgDefine.Limited
};

var g_oRatingLevel_mapping = [
    {
        id: 0,
        key: 'Nolink'
    },
    {
        id: 1,
        key: 'Safe'
    },
    {
        id: 2,
        key: 'Neutral'
    },
    {
        id: 3,
        key: 'Dangerous'
    },
    {
        id: 4,
        key: 'Suspicious'
    },
    {
        id: 5,
        key: 'Untested'
    },
    {
        id: 6,
        key: 'Trusted'
    },
    {
        id: 7,
        key: 'Blocked'
    },
    {
        id: 8,
        key: 'PCBlocked'
    },
    {
        id: 9,
        key: 'Suspicious'
    },
    {
        id: 100,
        key: 'Limited'
    },
    
];

var g_categoryUbmNameTable = {
    '1': 'Unknown',
    '2': 'SearchResult',
    '3': 'WebMail',
    '4': 'SNS',
    '5': 'ManualRating',
    '6': 'End'
};