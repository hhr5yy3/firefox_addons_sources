const getConst = {
  // More

  myOtherAppsData: "socialFocus_myOtherAppsData",

  // Shortcuts

  shortcuts: ["socialFocus_shortcuts_disable_enable"],

  // Opening Timers

  openingTimerIsActiveData: "socialFocus_openingTimerIsActiveData",
  openingTimerValueData: "socialFocus_openingTimerValueData",
  openingTimerMessageData: "socialFocus_openingTimerMessageData",

  // Password Locking

  passwordLockingIsActiveData: "socialFocus_passwordLockingIsActiveData",
  passwordLockingPasswordData: "socialFocus_passwordLockingPasswordData",
  passwordLockingPromptData: "socialFocus_passwordLockingPromptData",

  // Password Reset Data

  passwordLockingResetIsActiveData:
    "socialFocus_passwordLockingResetIsActiveData",
  passwordLockingResetPeriodData: "socialFocus_passwordLockingResetPeriodData",
  passwordLockingResetFinalDateData:
    "socialFocus_passwordLockingResetFinalDateData",

  dailyLimitDuration: {
    youtube: "socialFocus_youtube_dailyLimitDuration",
    facebook: "socialFocus_facebook_dailyLimitDuration",
    instagram: "socialFocus_instagram_dailyLimitDuration",
    linkedin: "socialFocus_linkedin_dailyLimitDuration",
    reddit: "socialFocus_reddit_dailyLimitDuration",
    twitter: "socialFocus_twitter_dailyLimitDuration",
    gmail: "socialFocus_gmail_dailyLimitDuration",
    "hacker-news": "socialFocus_hacker-news_dailyLimitDuration",
    twitch: "socialFocus_twitch_dailyLimitDuration",
    pinterest: "socialFocus_pinterest_dailyLimitDuration",
    netflix: "socialFocus_netflix_dailyLimitDuration",
    tikTok: "socialFocus_tikTok_dailyLimitDuration",
  },

  dailyLimitLastedTime: {
    youtube: "socialFocus_youtube_dailyLimitLastedTime",
    facebook: "socialFocus_facebook_dailyLimitLastedTime",
    instagram: "socialFocus_instagram_dailyLimitLastedTime",
    linkedin: "socialFocus_linkedin_dailyLimitLastedTime",
    reddit: "socialFocus_reddit_dailyLimitLastedTime",
    twitter: "socialFocus_twitter_dailyLimitLastedTime",
    gmail: "socialFocus_gmail_dailyLimitLastedTime",
    "hacker-news": "socialFocus_hacker-news_dailyLimitLastedTime",
    twitch: "socialFocus_twitch_dailyLimitLastedTime",
    pinterest: "socialFocus_pinterest_dailyLimitLastedTime",
    netflix: "socialFocus_netflix_dailyLimitLastedTime",
    tikTok: "socialFocus_tikTok_dailyLimitLastedTime",
  },

  dailyCurrentDate: {
    youtube: "socialFocus_youtube_dailyCurrentDate",
    facebook: "socialFocus_facebook_dailyCurrentDate",
    instagram: "socialFocus_instagram_dailyCurrentDate",
    linkedin: "socialFocus_linkedin_dailyCurrentDate",
    reddit: "socialFocus_reddit_dailyCurrentDate",
    twitter: "socialFocus_twitter_dailyCurrentDate",
    gmail: "socialFocus_gmail_dailyCurrentDate",
    "hacker-news": "socialFocus_hacker-news_dailyCurrentDate",
    twitch: "socialFocus_twitch_dailyCurrentDate",
    pinterest: "socialFocus_pinterest_dailyCurrentDate",
    netflix: "socialFocus_netflix_dailyCurrentDate",
    tikTok: "socialFocus_tikTok_dailyCurrentDate",
  },
};

const getConstNotSyncing = {
  // Extension Is Enabled

  extensionIsEnabledData: "socialFocus_global_enable",

  // Extension block time

  extensionBlockTime: "socialFocus_extension_blockTime",
  extensionBlockLastedTime: "socialFocus_extension_block_lasted_time",

  // Extension enable time

  extensionEnableTime: "socialFocus_extension_enableTime",
  extensionEnableLastedTime: "socialFocus_extension_enable_lasted_time",

  // PRO Status

  pro_usernameData: "socialFocus_pro_username",
  pro_passwordData: "socialFocus_pro_password",

  // Syncing

  isCloudSyncingData: "socialFocus_isCloudSyncingData",
  lastSyncingDateData: "socialFocus_cloudLastSyncingDateData",

  // Extension Theme

  extensionThemeData: "socialFocus_extensionThemeData",
};

// Websites Detection

const WEBSITES = [
  {
    name: "facebook",
    domain: ["facebook."],
    displayName: "Facebook",
    mobileSelectorCheck: ["#app-body", "#MChromeHeader"],
    desktopSelectorCheck: ["div[id*='mount']"],
  },

  {
    name: "netflix",
    domain: ["netflix.com"],
    displayName: "Netflix",
    mobileSelectorCheck: ["div.footer.has-inline-gutter"],
    desktopSelectorCheck: ["div.volatile-billboard-animations-container"],
  },

  {
    name: "instagram",
    domain: ["instagram."],
    displayName: "Instagram",
    mobileSelectorCheck: ["a[href*='explore']:has(path)"],
    desktopSelectorCheck: ["a[href*='explore']:has(polygon)"],
  },

  {
    name: "youtube",
    domain: ["www.youtube.com", "m.youtube.com"],
    displayName: "YouTube",
    mobileSelectorCheck: ["ytm-app"],
    desktopSelectorCheck: ["ytd-app"],
  },

  {
    name: "linkedin",
    domain: ["linkedin."],
    displayName: "LinkedIn",
    mobileSelectorCheck: ["nav.mobile-nav"],
    desktopSelectorCheck: ["#global-nav"],
  },

  {
    name: "twitter",
    domain: ["twitter.", "x."],
    displayName: "X",
    mobileSelectorCheck: ['div[data-testid="BottomBar"] > div'],
    desktopSelectorCheck: ["nav[role='navigation']:has(a[href*='bookmarks'])"],
  },

  {
    name: "reddit",
    domain: ["reddit."],
    displayName: "Reddit",
    mobileSelectorCheck: ["reddit-header-small"],
    desktopSelectorCheck: ["reddit-header-large"],
  },

  {
    name: "gmail",
    domain: ["mail."],
    displayName: "Gmail",
    mobileSelectorCheck: ["#apploadingdiv"],
    desktopSelectorCheck: ["header"],
  },

  {
    name: "hacker-news",
    domain: ["news.ycombinator."],
    displayName: "HackerNews",
    mobileSelectorCheck: [],
    desktopSelectorCheck: [],
  },

  {
    name: "twitch",
    domain: ["twitch."],
    displayName: "Twitch",
    mobileSelectorCheck: [
      `main#page-main-content-wrapper`,
      `path[d="M9.171 4.171A4 4 0 0 0 6.343 3H6a4 4 0 0 0-4 4v.343a4 4 0 0 0 1.172 2.829L10 17l6.828-6.828A4 4 0 0 0 18 7.343V7a4 4 0 0 0-4-4h-.343a4 4 0 0 0-2.829 1.172L10 5l-.829-.829z"]`,
    ],
    desktopSelectorCheck: ["div.side-bar-contents"],
  },

  {
    name: "pinterest",
    domain: ["pinterest.com"],
    displayName: "Pinterest",
    mobileSelectorCheck: [
      `div[data-test-id="footer"]:has(div[data-test-id="nav-bar-profile"])`,
    ],
    desktopSelectorCheck: ["div#HeaderContent"],
  },

  {
    name: "tikTok",
    domain: ["tiktok.com"],
    displayName: "TikTok",
    mobileSelectorCheck: [],
    desktopSelectorCheck: [],
  },
];
