const STORAGE = browser.storage.local;

const FilterType = Object.freeze({
	BLOCKED_USERS: 0,
	TITLE_REGEXS: 1,
	NAME_REGEXS: 2,
	COMMENT_REGEXS: 3,
	EXCLUDED_USERS: 4
});

const RegExType = Object.freeze({
	CASE_INSENSITIVE: 0,
	CASE_SENSITIVE: 1
});

const YTContext = Object.freeze({
	HOME: 0,
	VIDEO: 1,
	SEARCH: 2,
	TRENDING: 3,
	CHANNEL_HOME: 4,
	CHANNEL_VIDEOS: 5,
	OTHER: 6
});

const CONTENT_UI_STORAGE_ID = "content_ui";

const ContentUI = Object.freeze({
	BLOCK_BTN_VISIBILITY: 0,
	BLOCK_BTN_COLOR: 1,
	BLOCK_BTN_SIZE: 2,
	ANIMATION_SPEED: 3
});

const DEFAULT_CONTENT_UI_CONFIG = Object.freeze({
	[ContentUI.BLOCK_BTN_VISIBILITY]: true,
	[ContentUI.BLOCK_BTN_COLOR]: "#717171",
	[ContentUI.BLOCK_BTN_SIZE]: 120,
	[ContentUI.ANIMATION_SPEED]: 200
});

const SETTINGS_UI_STORAGE_ID = "settings_ui";

const SettingsUI = Object.freeze({
	PAGE_DESIGN: 0,
	ADVANCED_VIEW: 1,
	POPUP: 2
});

const DEFAULT_SETTINGS_UI_CONFIG = Object.freeze({
	[SettingsUI.PAGE_DESIGN]: 0,
	[SettingsUI.ADVANCED_VIEW]: false,
	[SettingsUI.POPUP]: false
});

const DeprecatedConfig = Object.freeze({
	PAGE_DESIGN: 0,
	ADVANCED_VIEW: 1,
	BLOCK_BTN_VISIBILITY: 2,
	BLOCK_BTN_COLOR: 4,
	BLOCK_BTN_SIZE: 5,
	ANIMATION_SPEED: 6,
	POPUP: 7
});

const DeprecatedConfigToConfigMapping = Object.freeze({
	[DeprecatedConfig.PAGE_DESIGN]: 			{storageID: SETTINGS_UI_STORAGE_ID, ID: SettingsUI.PAGE_DESIGN},
	[DeprecatedConfig.ADVANCED_VIEW]: 			{storageID: SETTINGS_UI_STORAGE_ID, ID: SettingsUI.ADVANCED_VIEW},
	[DeprecatedConfig.BLOCK_BTN_VISIBILITY]:	{storageID: CONTENT_UI_STORAGE_ID, 	ID: ContentUI.BLOCK_BTN_VISIBILITY},
	[DeprecatedConfig.BLOCK_BTN_COLOR]:			{storageID: CONTENT_UI_STORAGE_ID, 	ID: ContentUI.BLOCK_BTN_COLOR},
	[DeprecatedConfig.BLOCK_BTN_SIZE]: 			{storageID: CONTENT_UI_STORAGE_ID, 	ID: ContentUI.BLOCK_BTN_SIZE},
	[DeprecatedConfig.ANIMATION_SPEED]: 		{storageID: CONTENT_UI_STORAGE_ID, 	ID: ContentUI.ANIMATION_SPEED},
	[DeprecatedConfig.POPUP]: 					{storageID: SETTINGS_UI_STORAGE_ID, ID: SettingsUI.POPUP}
});
