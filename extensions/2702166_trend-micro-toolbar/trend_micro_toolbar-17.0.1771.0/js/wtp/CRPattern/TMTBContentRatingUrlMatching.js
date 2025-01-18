// Define individual engine type and parser rule

export var TCategary = {
    E_CATEGARY_WTP:0,
    E_CATEGARY_BEP:1,
    E_CATEGARY_SEARCHRESULT:2,
    E_CATEGARY_WEBMAIL:3,
    E_CATEGARY_SNS:4,
    E_CATEGORY_MANUAL_RATING:5,
    E_CATEGARY_IM:6
};

var CREngineTypeNum = 1;
var CREngineType = {
/////SR/////
    SR_GOOGLE_ENGINE_IMAGE: {
        EngineType: CREngineTypeNum++,//1
        ParserRule: "TISProSRGoogleImage.js",
        NeedJQuery: true,
        ImageFilter: true,
        Categary:TCategary.E_CATEGARY_SEARCHRESULT
    },
	
    SR_GOOGLE_ENGINE_TRANSLATE: {
        EngineType: CREngineTypeNum++,//2
        ParserRule: "TISProSRGoogleTranslate.js",
        Categary:TCategary.E_CATEGARY_SEARCHRESULT
    },	
	SR_GOOGLE_ENGINE_SEARCH: {
        EngineType: CREngineTypeNum++,//3
        ParserRule: "TISProSRGoogle.js",
        Categary:TCategary.E_CATEGARY_SEARCHRESULT,
        GeneralSearch: true
    },

    SR_GOOGLE_ENGINE: {
        EngineType: CREngineTypeNum++,//4
        ParserRule: "TISProSRGoogle.js",
        Categary:TCategary.E_CATEGARY_SEARCHRESULT
    },
       
    SR_YAHOO_ENGINE_IMAGE: {
        EngineType: CREngineTypeNum++,//5
        ParserRule: "TISProSRYahooImage.js",
        NeedJQuery: true,
        ImageFilter: true,
        Categary:TCategary.E_CATEGARY_SEARCHRESULT
    },
    
    SR_YAHOO_ENGINE_JP_IMAGE: {
        EngineType: CREngineTypeNum++,//6
        ParserRule: "TISProSRYahooImage.js",
        NeedJQuery: true,
        ImageFilter: true,
        Categary:TCategary.E_CATEGARY_SEARCHRESULT
    },
    
    SR_YAHOO_ENGINE_TW: {
        EngineType: CREngineTypeNum++,//7
        ParserRule: "TISProSRYahooTW.js",
        Categary:TCategary.E_CATEGARY_SEARCHRESULT,
        GeneralSearch: true
    },
    
    SR_YAHOO_ENGINE_CN: {
        EngineType: CREngineTypeNum++,//8
        ParserRule: "TISProSRYahooCN.js",
        Categary:TCategary.E_CATEGARY_SEARCHRESULT,
        GeneralSearch: true
    },
    
    SR_YAHOO_ENGINE_JP: {
        EngineType: CREngineTypeNum++,//9
        ParserRule: "TISProSRYahooJP.js",
        Categary:TCategary.E_CATEGARY_SEARCHRESULT,
        GeneralSearch: true
    },
    
    SR_YAHOO_ENGINE_KR: {
        EngineType: CREngineTypeNum++,//10
        ParserRule: "TISProSRYahooKR.js",
        Categary:TCategary.E_CATEGARY_SEARCHRESULT,
        GeneralSearch: true
    },
    
    SR_YAHOO_ENGINE_EN: {
        EngineType: CREngineTypeNum++,//11
        ParserRule: "TISProSRYahooEN.js",
        Categary:TCategary.E_CATEGARY_SEARCHRESULT,
        GeneralSearch: true
    },
    
    SR_YAHOO_ENGINE_ATT: {
        EngineType: CREngineTypeNum++,//12
        ParserRule: "TISProSRYahooEN.js",
        Categary:TCategary.E_CATEGARY_SEARCHRESULT,
        GeneralSearch: true
    },
    
    SR_BIGLOBE_ENGINE: {
        EngineType: CREngineTypeNum++,//13
        ParserRule: "TISProSRBiglobe.js",
        Categary:TCategary.E_CATEGARY_SEARCHRESULT,
        GeneralSearch: true
    },
    
    SR_INFOSEEK_ENGINE: {
        EngineType: CREngineTypeNum++,//14
        ParserRule: "TISProSRJPInfoSeek.js",
        Categary:TCategary.E_CATEGARY_SEARCHRESULT,
        GeneralSearch: true
    },
    
    SR_INFOSEEK_NEWENGINE: {
        EngineType: CREngineTypeNum++,//15
        ParserRule: "TISProSRJPInfoSeek.js",
        Categary:TCategary.E_CATEGARY_SEARCHRESULT,
        GeneralSearch: true
    },
    
    SR_MSBING_ENGINE_IMAGE: {
        EngineType: CREngineTypeNum++,//16
        ParserRule: "TISProSRBingImage.js",
        NeedJQuery: true,
        ImageFilter: true,
        Categary:TCategary.E_CATEGARY_SEARCHRESULT
    },
    
    SR_MSBING_ENGINE: {
        EngineType: CREngineTypeNum++,//17
        ParserRule: "TISProSRBing.js",
        Categary:TCategary.E_CATEGARY_SEARCHRESULT,
        GeneralSearch: true
    },
    
    SR_MSBINGKR_ENGINE: {
        EngineType: CREngineTypeNum++,//18
        ParserRule: "TISProSRBingKR.js",
        Categary:TCategary.E_CATEGARY_SEARCHRESULT,
        GeneralSearch: true
    },
    
    SR_MSNLIVE_ENGINE: {
        EngineType: CREngineTypeNum++,//19
        ParserRule: "TISProSRMSNLive.js",
        Categary:TCategary.E_CATEGARY_SEARCHRESULT,
        GeneralSearch: true
    },
    
    SR_GOO_ENGINE: {
        EngineType: CREngineTypeNum++,//20
        ParserRule: "TISProSRGoo.js",
        Categary:TCategary.E_CATEGARY_SEARCHRESULT,
        GeneralSearch: true
    },
    
    SR_OCN_JP_ENGINE: {
        EngineType: CREngineTypeNum++,//21
        ParserRule: "TISProSROCN.js",
        Categary:TCategary.E_CATEGARY_SEARCHRESULT,
        GeneralSearch: true
    },
    
    SR_BAIDU_ENGINE: {
        EngineType: CREngineTypeNum++,//22
        ParserRule: "TISProSRBaidu.js",
        Categary:TCategary.E_CATEGARY_SEARCHRESULT,
        GeneralSearch: true
    },
 /////WM/////   
    WM_GMAIL_HTML_ENGINE: {
        EngineType: CREngineTypeNum++,//23
        ParserRule: "TISProGMailHTML.js",
        Categary:TCategary.E_CATEGARY_WEBMAIL
    },
    
    WM_YAHOO_EN_CLASSIC_ENGINE: {
        EngineType: CREngineTypeNum++,//24
        ParserRule: "TISProWMYahooENClassic.js",
        Categary:TCategary.E_CATEGARY_WEBMAIL
    },
    
    WM_YAHOO_EN_DELUXE_ENGINE: {
        EngineType: CREngineTypeNum++,//25
        ParserRule: "TISProWMYahooENDeluxe.js",
        Categary:TCategary.E_CATEGARY_WEBMAIL
    },
    
    WM_OLWEBMAIL_SIMPLE_ENGINE: {
        EngineType: CREngineTypeNum++,//26
        ParserRule: "TISProOLWebMailSimple.js",
        Categary:TCategary.E_CATEGARY_WEBMAIL
    },

    WM_OLWEBMAIL_OFFICE_ENGINE: {
        EngineType: CREngineTypeNum++,//27
        ParserRule: "TISProOLWebMailOffice.js",
        Categary:TCategary.E_CATEGARY_WEBMAIL
    },


    WM_GAMAIL_FULL_ENGINE: {
        EngineType: CREngineTypeNum++,//28
        ParserRule: "TISProGMailFull.js",
        Categary:TCategary.E_CATEGARY_WEBMAIL
    },
    
    WM_GAMAIL_FULL2_ENGINE: {
        EngineType: CREngineTypeNum++,//29
        ParserRule: "TISProGMailFull2.js",
        Categary:TCategary.E_CATEGARY_WEBMAIL
    },
/////SNS/////
    WM_FACEBOOK_ENGINE:{
        EngineType: CREngineTypeNum++,//30
        ParserRule: "TISProFacebook.js",
        SupportShareToFriend: 0,
        EnableFeedbackSnsUnsafeUrl: 1,
        NeedJQuery: true,
        Categary:TCategary.E_CATEGARY_SNS
    },
    
    WM_TWITTER_ENGINE:{
        EngineType: CREngineTypeNum++,//31
        ParserRule: "TISProTwitter.js",
        EnableFeedbackSnsUnsafeUrl: 1,
        Categary:TCategary.E_CATEGARY_SNS
    },
    
    WM_MYSPACE_ENGINE:{
        EngineType: CREngineTypeNum++,//32
        ParserRule: "TISProMyspace.js",
        Categary:TCategary.E_CATEGARY_SNS
    },
    
    WM_MIXI_ENGINE:{
        EngineType: CREngineTypeNum++,//33
        ParserRule: "TISProMixi.js",
        Categary:TCategary.E_CATEGARY_SNS
    },
    
    WM_GOOGLE_PLUS_ENGINE:{
        EngineType: CREngineTypeNum++,//34
        ParserRule: "TISProGooglePlus.js",
        Categary:TCategary.E_CATEGARY_SNS
    },
    
    WM_LINKED_IN_ENGINE:{
        EngineType: CREngineTypeNum++,//35
        ParserRule: "TISProLinkedin.js",
        Categary:TCategary.E_CATEGARY_SNS
    },
    
    WM_PINTEREST_ENGINE:{
        EngineType: CREngineTypeNum++,//36
        ParserRule: "TISProPinterest.js",
        Categary:TCategary.E_CATEGARY_SNS
    },
    
    WM_SINA_ENGINE:{
        EngineType: CREngineTypeNum++,//37
        ParserRule: "TISProSina.js",
        Categary:TCategary.E_CATEGARY_SNS
    },
        
    SR_UNKNOWN: {
        EngineType: 0
    }
};

export var ContentRatingURLPatternType = [
    {
        Engine: CREngineType.SR_GOOGLE_ENGINE_IMAGE,
        Pattern: "^https?://www\\.google(.*)/search\\?(.*)tbm=isch(.*)"
    },
	
    {
        Engine: CREngineType.SR_GOOGLE_ENGINE_TRANSLATE,
        Pattern: "^https?://translate\\.google\\.[a-z\\.]+/translate_s\\?"
    },	
    {
        Engine: CREngineType.SR_GOOGLE_ENGINE_SEARCH,
        Pattern: "^https?://((w+(\-\\w+\\.\\w+)?)|ipv6)\\.google.(com|co)(.*)\/search\\?"
    },	
   
	{
        Engine: CREngineType.SR_GOOGLE_ENGINE,
        Pattern: "^https?://((w+(\-\\w+\\.\\w+)?)|ipv6)\\.google\\.[a-z\\.]+"
    },
      
    {
        Engine: CREngineType.SR_YAHOO_ENGINE_IMAGE,
        Pattern: "^https?://(.*)images\\.search\\.yahoo\\.com/search/images"
    },
    
    {
        Engine: CREngineType.SR_YAHOO_ENGINE_JP_IMAGE,
        Pattern: "^https?://image\\.search\\.yahoo\\.co\\.jp/search"
    },
    
    {
        Engine: CREngineType.SR_YAHOO_ENGINE_TW,
        Pattern: "^https?://tw\\.search\\.yahoo\\.com/(search|custom)"
    },
    
    {
        Engine: CREngineType.SR_YAHOO_ENGINE_CN,
        Pattern: "^https?://www\.yahoo\.cn/(search|s)\\?"
    },
    
    {
        Engine: CREngineType.SR_YAHOO_ENGINE_JP,
        Pattern: "^https?://(\\w+\\.)?search\\.yahoo\\.co\\.jp/(search|custom)"
    },
    
    {
        Engine: CREngineType.SR_YAHOO_ENGINE_KR,
        Pattern: "^https?://kr\\.search\\.yahoo\\.com/(search|custom)"
    },
    
    {
        Engine: CREngineType.SR_YAHOO_ENGINE_EN,
        Pattern: "^https?://((\\w{2}|asia|malaysia)\\.)?(www|search|myweb|myweb2\\.search|espanol\\.search)\\.yahoo\\.[a-z\\.]+/(search|custom)"
    },

    {
        Engine: CREngineType.SR_YAHOO_ENGINE_ATT,
        Pattern: "^https?://(.*)\\.(.*)\\.search\\.yahoo\\.com/yhs/search"
    },
    
    {
        Engine: CREngineType.SR_BIGLOBE_ENGINE,
        Pattern: "^https?://cgi\\.search\\.biglobe\\.ne\\.jp/cgi-bin/search"
    },
    
    {
        Engine: CREngineType.SR_INFOSEEK_ENGINE,
        Pattern: "^https?://search\\.www\\.infoseek\\.co\\.jp/Web\\?((qt=)|(svx=))"
    },
    
    {
        Engine: CREngineType.SR_INFOSEEK_NEWENGINE,
        Pattern: "^https?://websearch\\.rakuten\\.co\\.jp/(WebIS|Web)?\\?(.*)((qt=)|(svx=))"
    },
    
    {
        Engine: CREngineType.SR_MSBING_ENGINE_IMAGE,
        Pattern: "^https?://(.*).bing\\.com/images/search\\?"
    },
    
    {
        Engine: CREngineType.SR_MSBING_ENGINE,
        Pattern: "^https?://\\w+\\.bing\\.com/"
    },
    
    {
        Engine: CREngineType.SR_MSBINGKR_ENGINE,
        Pattern: "^https?://bing\\.search\\.daum\\.net"
    },
    
    {
        Engine: CREngineType.SR_MSNLIVE_ENGINE,
        Pattern: "^https?://(\\w+\\.)?search\\.(msn|live)\\.([a-z\\.]+|com)/results\\.aspx\\?"
    },
    
    {
        Engine: CREngineType.SR_GOO_ENGINE,
        Pattern: "^https?://(.*)search\.goo\.ne\.jp"
    },
    
    {
        Engine: CREngineType.SR_OCN_JP_ENGINE,
        Pattern: "^https?://wsearch\\.ocn\\.ne\\.jp/(.*/)?ocn\\.jsp"
    },
    
    {
        Engine: CREngineType.SR_BAIDU_ENGINE,
        Pattern: "^https?://((news)|(www))\\.baidu\\.com(/(.*)((wd=)|(word=)))?"
    },
    
    {
        Engine: CREngineType.WM_GMAIL_HTML_ENGINE,
        Pattern: "^((https)|(http))://mail\\.google\\.com/mail(.*)&v="
    },
    
    {
        Engine: CREngineType.WM_YAHOO_EN_CLASSIC_ENGINE,
        Pattern: "^https?://(\\w+\\.){2}mail\\.yahoo\\.((com)|(co\\.jp))/(ym|mc)/(ShowLetter|showMessage|welcome|showFolder)(\\?|;)[^?]*(_pg=showMessage)?"            
    },
    
    {
        Engine: CREngineType.WM_YAHOO_EN_DELUXE_ENGINE,
        Pattern: "^https?://(.*)mail\\.yahoo\\.(.*)",
        InnerPattern: "^https?://(\\w+\\.){2}mail\\.yahoo\\.((com)|(co\\.jp))/((fc/fc)|(dc/blank\\.html))\\?"
    },
    
    {
        Engine: CREngineType.WM_OLWEBMAIL_SIMPLE_ENGINE,
        Pattern: "^https?://outlook\.live\.com"
    },

    {
        Engine: CREngineType.WM_OLWEBMAIL_OFFICE_ENGINE,
        Pattern: "^https?://outlook\.(office|office365)\.com"
    },

    {
        Engine: CREngineType.WM_GAMAIL_FULL_ENGINE,
        Pattern: "^((https)|(http))://mail\\.google\\.com/mail/\\?(shva=1&)?ui=1"
    },
    
    
    {
        Engine: CREngineType.WM_GAMAIL_FULL2_ENGINE,
        Pattern:  "^((https)|(http))://mail\\.google\\.com/mail.*((ca$)|(0/$)|(/$)|(/u/0/\\?ui)|(/\?tab=)|(shva=1$)|(#)|(popout))"            
    },
    
    {
        Engine: CREngineType.WM_FACEBOOK_ENGINE,
        Pattern: "^(https?)://((\\w)|(-))+.facebook.com"
    },
    
    {
        Engine: CREngineType.WM_TWITTER_ENGINE,
        Pattern: "^https?://twitter\.com"
    },
    
    {
        Engine: CREngineType.WM_MYSPACE_ENGINE,
        Pattern: "^https?://(\\w+\.)?myspace\.com"
    },
    
    {
        Engine: CREngineType.WM_MIXI_ENGINE,
        Pattern: "^https?://(((photo)|(video))\.)?mixi\.jp"
    },
    
    {
        Engine: CREngineType.WM_GOOGLE_PLUS_ENGINE,
        Pattern: "^https?://plus\.google\.com"
    },
    
    {
        Engine: CREngineType.WM_LINKED_IN_ENGINE,
        Pattern: "^https?://www\.linkedin\.com"
    },
    
    {
        Engine: CREngineType.WM_PINTEREST_ENGINE,
        Pattern: "^(https?://((www|jp)\.)?)?pinterest\.(com|jp)"
    },
    
    {
        Engine: CREngineType.WM_SINA_ENGINE,
        Pattern: "^https?://(\\w+\\.)?weibo\.com"
    }
];

