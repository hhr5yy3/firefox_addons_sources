(self["webpackChunk"] = self["webpackChunk"] || []).push([["default-libs_platform_src_index_ts"],{

/***/ "../../libs/platform/src/index.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Analytics: () => (/* reexport safe */ _lib_analytics__WEBPACK_IMPORTED_MODULE_2__.Analytics),
/* harmony export */   AnalyticsNode: () => (/* reexport safe */ _lib_util_analyticsNodePatched__WEBPACK_IMPORTED_MODULE_7__["default"]),
/* harmony export */   ApiEventTypeKind: () => (/* reexport safe */ _lib_calendly__WEBPACK_IMPORTED_MODULE_4__.ApiEventTypeKind),
/* harmony export */   ApiEventTypePoolingType: () => (/* reexport safe */ _lib_calendly__WEBPACK_IMPORTED_MODULE_4__.ApiEventTypePoolingType),
/* harmony export */   ApiEventTypeType: () => (/* reexport safe */ _lib_calendly__WEBPACK_IMPORTED_MODULE_4__.ApiEventTypeType),
/* harmony export */   ApiScheduledEventLocationStatus: () => (/* reexport safe */ _lib_calendly__WEBPACK_IMPORTED_MODULE_4__.ApiScheduledEventLocationStatus),
/* harmony export */   ApiScheduledEventLocationType: () => (/* reexport safe */ _lib_calendly__WEBPACK_IMPORTED_MODULE_4__.ApiScheduledEventLocationType),
/* harmony export */   AppContext: () => (/* reexport safe */ _lib_AppContext__WEBPACK_IMPORTED_MODULE_0__.AppContext),
/* harmony export */   BearerAuthedRequest: () => (/* reexport safe */ _lib_network__WEBPACK_IMPORTED_MODULE_1__.BearerAuthedRequest),
/* harmony export */   CalendlyApi: () => (/* reexport safe */ _lib_calendly__WEBPACK_IMPORTED_MODULE_4__.CalendlyApi),
/* harmony export */   ConsoleAnalytics: () => (/* reexport safe */ _lib_analytics__WEBPACK_IMPORTED_MODULE_2__.ConsoleAnalytics),
/* harmony export */   Currency: () => (/* reexport safe */ _lib_calendly__WEBPACK_IMPORTED_MODULE_4__.Currency),
/* harmony export */   ErrorManager: () => (/* reexport safe */ _lib_errorManager__WEBPACK_IMPORTED_MODULE_9__.ErrorManager),
/* harmony export */   EventTimeStatus: () => (/* reexport safe */ _lib_calendly__WEBPACK_IMPORTED_MODULE_4__.EventTimeStatus),
/* harmony export */   EventTypeEnum: () => (/* reexport safe */ _lib_calendly__WEBPACK_IMPORTED_MODULE_4__.EventTypeEnum),
/* harmony export */   EventTypeType: () => (/* reexport safe */ _lib_calendly__WEBPACK_IMPORTED_MODULE_4__.EventTypeType),
/* harmony export */   MakeFormDataRequest: () => (/* reexport safe */ _lib_network__WEBPACK_IMPORTED_MODULE_1__.MakeFormDataRequest),
/* harmony export */   MakeJsonRequest: () => (/* reexport safe */ _lib_network__WEBPACK_IMPORTED_MODULE_1__.MakeJsonRequest),
/* harmony export */   NoopAnalytics: () => (/* reexport safe */ _lib_analytics__WEBPACK_IMPORTED_MODULE_2__.NoopAnalytics),
/* harmony export */   OAuthGenericPKCE: () => (/* reexport safe */ _lib_oauthGenericPKCE__WEBPACK_IMPORTED_MODULE_8__.OAuthGenericPKCE),
/* harmony export */   PaymentProvider: () => (/* reexport safe */ _lib_calendly__WEBPACK_IMPORTED_MODULE_4__.PaymentProvider),
/* harmony export */   ScheduledEvent: () => (/* reexport safe */ _lib_calendly__WEBPACK_IMPORTED_MODULE_4__.ScheduledEvent),
/* harmony export */   ScheduledEventGuest: () => (/* reexport safe */ _lib_calendly__WEBPACK_IMPORTED_MODULE_4__.ScheduledEventGuest),
/* harmony export */   ScheduledEventInvitee: () => (/* reexport safe */ _lib_calendly__WEBPACK_IMPORTED_MODULE_4__.ScheduledEventInvitee),
/* harmony export */   ScheduledEventLocation: () => (/* reexport safe */ _lib_calendly__WEBPACK_IMPORTED_MODULE_4__.ScheduledEventLocation),
/* harmony export */   ScheduledEventMembership: () => (/* reexport safe */ _lib_calendly__WEBPACK_IMPORTED_MODULE_4__.ScheduledEventMembership),
/* harmony export */   ScheduledEventsManager: () => (/* reexport safe */ _lib_calendly__WEBPACK_IMPORTED_MODULE_4__.ScheduledEventsManager),
/* harmony export */   SessionManager: () => (/* reexport safe */ _lib_session__WEBPACK_IMPORTED_MODULE_5__.SessionManager),
/* harmony export */   SettingsManager: () => (/* reexport safe */ _lib_settings__WEBPACK_IMPORTED_MODULE_6__.SettingsManager),
/* harmony export */   VersionedRequest: () => (/* reexport safe */ _lib_network__WEBPACK_IMPORTED_MODULE_1__.VersionedRequest),
/* harmony export */   educationVersion: () => (/* reexport safe */ _lib_settings__WEBPACK_IMPORTED_MODULE_6__.educationVersion),
/* harmony export */   getEventTypeType: () => (/* reexport safe */ _lib_calendly__WEBPACK_IMPORTED_MODULE_4__.getEventTypeType),
/* harmony export */   isProxiedFlow: () => (/* reexport safe */ _lib_flow__WEBPACK_IMPORTED_MODULE_3__.isProxiedFlow),
/* harmony export */   isProxiedRequest: () => (/* reexport safe */ _lib_network__WEBPACK_IMPORTED_MODULE_1__.isProxiedRequest),
/* harmony export */   notEmpty: () => (/* reexport safe */ _lib_calendly__WEBPACK_IMPORTED_MODULE_4__.notEmpty)
/* harmony export */ });
/* harmony import */ var _lib_AppContext__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../libs/platform/src/lib/AppContext.ts");
/* harmony import */ var _lib_network__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../libs/platform/src/lib/network.ts");
/* harmony import */ var _lib_analytics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../libs/platform/src/lib/analytics.ts");
/* harmony import */ var _lib_flow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../libs/platform/src/lib/flow.ts");
/* harmony import */ var _lib_calendly__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../libs/platform/src/lib/calendly/index.ts");
/* harmony import */ var _lib_session__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../libs/platform/src/lib/session/index.ts");
/* harmony import */ var _lib_settings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../libs/platform/src/lib/settings/index.ts");
/* harmony import */ var _lib_util_analyticsNodePatched__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../../libs/platform/src/lib/util/analyticsNodePatched.js");
/* harmony import */ var _lib_oauthGenericPKCE__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("../../libs/platform/src/lib/oauthGenericPKCE.ts");
/* harmony import */ var _lib_errorManager__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("../../libs/platform/src/lib/errorManager.ts");











/***/ }),

/***/ "../../libs/platform/src/lib/AppContext.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppContext: () => (/* binding */ AppContext)
/* harmony export */ });
const AppContext = {
  searchQuery: ''
};

/***/ }),

/***/ "../../libs/platform/src/lib/analytics.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Analytics: () => (/* binding */ Analytics),
/* harmony export */   ConsoleAnalytics: () => (/* binding */ ConsoleAnalytics),
/* harmony export */   NoopAnalytics: () => (/* binding */ NoopAnalytics)
/* harmony export */ });
/* harmony import */ var _AppContext__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../libs/platform/src/lib/AppContext.ts");
/* harmony import */ var _analyticsMappings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../libs/platform/src/lib/analyticsMappings.ts");
/* harmony import */ var _util_analyticsNodePatched__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../libs/platform/src/lib/util/analyticsNodePatched.js");



class Analytics {
  constructor(platformInfo, segmentKey, calendlyApi) {
    this.currentUserId = void 0;
    this.currentOrgId = void 0;
    this.platformType = void 0;
    this.platformVersion = void 0;
    this.analytics = void 0;
    this.buildTraits = traits => {
      return Object.assign({
        [`clients.${this.platformInfo.name}.installed`]: true,
        [`clients.${this.platformInfo.name}.version`]: this.platformInfo.version.replace(/\./g, '-')
      }, traits);
    };
    this.buildProperties = (event, properties) => {
      const props = {
        id: this.currentUserId,
        orgId: this.currentOrgId,
        platform: this.platformInfo.name,
        version: this.platformInfo.version.replace(/\./g, '-'),
        platformType: this.platformType,
        platformVersion: this.platformVersion
      };
      if (_AppContext__WEBPACK_IMPORTED_MODULE_0__.AppContext.searchQuery && searchViewAnalyticsEvents.includes(event)) {
        props.sidebar_view = 'search';
      }
      return Object.assign({}, props, properties);
    };
    this.platformInfo = platformInfo;
    this.segmentKey = segmentKey;
    this.calendlyApi = calendlyApi;
    this.analytics = new _util_analyticsNodePatched__WEBPACK_IMPORTED_MODULE_2__["default"](this.segmentKey, {
      flushAt: 1 // Force immediate sending
    });
  }

  async configure() {
    const office = window.Office; // eslint-disable-line @typescript-eslint/no-explicit-any
    if (office && this.platformInfo.name === 'outlook') {
      var _office$context, _office$context2;
      await (office.onReady == null ? void 0 : office.onReady());
      this.platformType = (_office$context = office.context) == null || (_office$context = _office$context.mailbox) == null || (_office$context = _office$context.diagnostics) == null ? void 0 : _office$context.hostName;
      this.platformVersion = (_office$context2 = office.context) == null || (_office$context2 = _office$context2.mailbox) == null || (_office$context2 = _office$context2.diagnostics) == null ? void 0 : _office$context2.hostVersion;
    }
  }
  async identify(id, traits, options) {
    this.analytics.identify({
      userId: id,
      traits: this.buildTraits(traits || {}),
      context: options
    });
  }
  async track(event, properties, options) {
    const trackId = this.currentUserId;
    if (!trackId) {
      console.warn('No userid available for segment (loggedout) - not tracking ' + event);
      return;
    }
    try {
      // Convert supported events to new format and send to calendly analytics service
      const newEvent = (0,_analyticsMappings__WEBPACK_IMPORTED_MODULE_1__.convert)(this.platformInfo, this.platformVersion, this.currentUserId, event, properties, options);
      if (newEvent) {
        this.calendlyApi.calendlyAnalytics(newEvent);
      }
    } catch (error) {
      console.error('Error during event conversion:', error);
    }
    this.analytics.track({
      event,
      userId: trackId,
      properties: this.buildProperties(event, Object.assign({}, properties || {})),
      context: options
    });
  }
  setUser(user) {
    this.currentUserId = String(user == null ? void 0 : user.internal_id);
    this.currentOrgId = String(user == null ? void 0 : user.current_organization_id);
  }
}
class ConsoleAnalytics {
  async identify(id, traits, options) {
    console.log('identify was called but not passed to segment - ', id, traits, options);
  }
  async track(event, properties, options) {
    console.log('track was called but not passed to segment - ', event, properties, options);
  }
  setUser(user) {
    console.log('setUser was called but not respected - ', user);
  }
}

// Turning off Firefox analytics
// We can re-enable collection of technical analytics without breaking policy guidelines by implementing an opt
// out button somewhere in the addon.
// See:  https://extensionworkshop.com/documentation/publish/add-on-policies/#Data_Disclosure_Collection_and_Management
// Under the section: "Technical & User Interaction Data (opt-out)"
class NoopAnalytics {
  async configure() {} // eslint-disable-line @typescript-eslint/no-empty-function
  async identify() {} // eslint-disable-line @typescript-eslint/no-empty-function
  async track() {} // eslint-disable-line @typescript-eslint/no-empty-function
  setUser() {} // eslint-disable-line @typescript-eslint/no-empty-function
}

const searchViewAnalyticsEvents = ['extension_user.copy_link', 'extension_user.event_type_star', 'extension_user.event_type_unstar', 'extension_user.event_type_edit', 'extension_user.event_type_preview', 'extension_user.team_star', 'extension_user.team_unstar', 'extension_user.profile_copy_link', 'extension_user.profile_create_event_type', 'extension_email_embed.attempt', 'extension_email_embed.success', 'extension_email_embed.configure', 'internal_note.client_cancel', 'internal_note.client_save', 'book_on_behalf.start'];

/***/ }),

/***/ "../../libs/platform/src/lib/analyticsMappings.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   agendaViewMeetingActionConvert: () => (/* binding */ agendaViewMeetingActionConvert),
/* harmony export */   agendaViewSwitchTabConvert: () => (/* binding */ agendaViewSwitchTabConvert),
/* harmony export */   bookOnBehalfStartConvert: () => (/* binding */ bookOnBehalfStartConvert),
/* harmony export */   contactsManagementCreateContactConvert: () => (/* binding */ contactsManagementCreateContactConvert),
/* harmony export */   contactsManagementFavoriteContactConvert: () => (/* binding */ contactsManagementFavoriteContactConvert),
/* harmony export */   contactsManagementRemoveContactConvert: () => (/* binding */ contactsManagementRemoveContactConvert),
/* harmony export */   contactsManagementUpdateContactConvert: () => (/* binding */ contactsManagementUpdateContactConvert),
/* harmony export */   contactsManagementViewContactsConvert: () => (/* binding */ contactsManagementViewContactsConvert),
/* harmony export */   convert: () => (/* binding */ convert),
/* harmony export */   eventTypePreviewLinkConvert: () => (/* binding */ eventTypePreviewLinkConvert),
/* harmony export */   eventTypeStarConvert: () => (/* binding */ eventTypeStarConvert),
/* harmony export */   followUpEmailConvert: () => (/* binding */ followUpEmailConvert),
/* harmony export */   followUpShareConvert: () => (/* binding */ followUpShareConvert),
/* harmony export */   gMenuCloseConvert: () => (/* binding */ gMenuCloseConvert),
/* harmony export */   gMenuCopyLinkConvert: () => (/* binding */ gMenuCopyLinkConvert),
/* harmony export */   gMenuOpenConvert: () => (/* binding */ gMenuOpenConvert),
/* harmony export */   gMenuToggleEventTypeListConvert: () => (/* binding */ gMenuToggleEventTypeListConvert),
/* harmony export */   gcalEventBarShownConvert: () => (/* binding */ gcalEventBarShownConvert),
/* harmony export */   gcalEventDetailsViewConvert: () => (/* binding */ gcalEventDetailsViewConvert),
/* harmony export */   gcalRescheduleClickConvert: () => (/* binding */ gcalRescheduleClickConvert),
/* harmony export */   globalCreateEventTypeConvert: () => (/* binding */ globalCreateEventTypeConvert),
/* harmony export */   globalCreateOneOffConvert: () => (/* binding */ globalCreateOneOffConvert),
/* harmony export */   gmenuOpenOneOffConvert: () => (/* binding */ gmenuOpenOneOffConvert),
/* harmony export */   gmenuOpenPollConvert: () => (/* binding */ gmenuOpenPollConvert),
/* harmony export */   gmenuShowMoreEventTypesConvert: () => (/* binding */ gmenuShowMoreEventTypesConvert),
/* harmony export */   gongAddTimesConvert: () => (/* binding */ gongAddTimesConvert),
/* harmony export */   gongCopyLinkConvert: () => (/* binding */ gongCopyLinkConvert),
/* harmony export */   gongOpenConvert: () => (/* binding */ gongOpenConvert),
/* harmony export */   gongOpenOneOffConvert: () => (/* binding */ gongOpenOneOffConvert),
/* harmony export */   gongShowMoreEventTypesConvert: () => (/* binding */ gongShowMoreEventTypesConvert),
/* harmony export */   integrationsConfigureConvert: () => (/* binding */ integrationsConfigureConvert),
/* harmony export */   integrationsConvert: () => (/* binding */ integrationsConvert),
/* harmony export */   keywordDetectionInteractedConvert: () => (/* binding */ keywordDetectionInteractedConvert),
/* harmony export */   keywordDetectionSettingsUpdatedConvert: () => (/* binding */ keywordDetectionSettingsUpdatedConvert),
/* harmony export */   keywordDetectionShownConvert: () => (/* binding */ keywordDetectionShownConvert),
/* harmony export */   linkedinCopyLinkConvert: () => (/* binding */ linkedinCopyLinkConvert),
/* harmony export */   linkedinCopySulConvert: () => (/* binding */ linkedinCopySulConvert),
/* harmony export */   linkedinOpenConvert: () => (/* binding */ linkedinOpenConvert),
/* harmony export */   linkedinOpenOneOffConvert: () => (/* binding */ linkedinOpenOneOffConvert),
/* harmony export */   linkedinOpenPollConvert: () => (/* binding */ linkedinOpenPollConvert),
/* harmony export */   linkedinShowMoreEventTypesConvert: () => (/* binding */ linkedinShowMoreEventTypesConvert),
/* harmony export */   loadSidebarConvert: () => (/* binding */ loadSidebarConvert),
/* harmony export */   searchConvert: () => (/* binding */ searchConvert),
/* harmony export */   shareAvailabilityStartConvert: () => (/* binding */ shareAvailabilityStartConvert),
/* harmony export */   sidebarCopyLinkConvert: () => (/* binding */ sidebarCopyLinkConvert),
/* harmony export */   sidebarEmailEmbedAttemptConvert: () => (/* binding */ sidebarEmailEmbedAttemptConvert),
/* harmony export */   sidebarEmailEmbedConfigureConvert: () => (/* binding */ sidebarEmailEmbedConfigureConvert),
/* harmony export */   sidebarEmailEmbedSuccessConvert: () => (/* binding */ sidebarEmailEmbedSuccessConvert),
/* harmony export */   sidebarLoginConvert: () => (/* binding */ sidebarLoginConvert)
/* harmony export */ });
/* harmony import */ var _client_core_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../libs/types/src/index.ts");

function convert(info, platformVersion, currentUserId, event, properties, options) {
  const baseProperties = {
    platform_type: 'extension',
    platform_details: info.name,
    platform_version: platformVersion,
    client_version: info.version
  };
  switch (event) {
    case _client_core_types__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEvent.SidebarOpen:
      return loadSidebarConvert(baseProperties, currentUserId, properties, options);
    case _client_core_types__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEvent.GCalEventBarShown:
      return gcalEventBarShownConvert(baseProperties, currentUserId, properties, options);
      break;
    case _client_core_types__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEvent.SidebarCopyLink:
      return sidebarCopyLinkConvert(baseProperties, currentUserId, properties, options);
      break;
    case _client_core_types__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEvent.SidebarLogin:
      return sidebarLoginConvert(baseProperties, currentUserId, properties, options);
      break;
    case _client_core_types__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEvent.Search:
      return searchConvert(baseProperties, currentUserId, properties, options);
      break;
    case _client_core_types__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEvent.KeywordDetectionShown:
      return keywordDetectionShownConvert(baseProperties, currentUserId, properties, options);
    case _client_core_types__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEvent.GMenuOpen:
      return gMenuOpenConvert(baseProperties, currentUserId, properties, options);
    case _client_core_types__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEvent.AgendaViewSwitchTab:
      return agendaViewSwitchTabConvert(baseProperties, currentUserId, properties, options);
    case _client_core_types__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEvent.SidebarEmailEmbedConfigure:
      return sidebarEmailEmbedConfigureConvert(baseProperties, currentUserId, properties, options);
    case _client_core_types__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEvent.GMenuClose:
      return gMenuCloseConvert(baseProperties, currentUserId, properties, options);
    case _client_core_types__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEvent.GMenuCopyLink:
      return gMenuCopyLinkConvert(baseProperties, currentUserId, properties, options);
    case _client_core_types__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEvent.LinkedInOpen:
      return linkedinOpenConvert(baseProperties, currentUserId, properties, options);
    case _client_core_types__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEvent.GMenuToggleEventTypeList:
      return gMenuToggleEventTypeListConvert(baseProperties, currentUserId, properties, options);
    case _client_core_types__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEvent.AgendaViewMeetingAction:
      return agendaViewMeetingActionConvert(baseProperties, currentUserId, properties, options);
    case _client_core_types__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEvent.SidebarEmailEmbedAttempt:
      return sidebarEmailEmbedAttemptConvert(baseProperties, currentUserId, properties, options);
    case _client_core_types__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEvent.EventTypePreviewLink:
      return eventTypePreviewLinkConvert(baseProperties, currentUserId, properties, options);
    case _client_core_types__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEvent.BookOnBehalfStart:
      return bookOnBehalfStartConvert(baseProperties, currentUserId, properties, options);
    case _client_core_types__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEvent.SidebarEmailEmbedSuccess:
      return sidebarEmailEmbedSuccessConvert(baseProperties, currentUserId, properties, options);
    case _client_core_types__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEvent.IntegrationsConfigure:
      return integrationsConfigureConvert(baseProperties, currentUserId, properties, options);
    case _client_core_types__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEvent.LinkedInCopyLink:
      return linkedinCopyLinkConvert(baseProperties, currentUserId, properties, options);
    case _client_core_types__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEvent.GlobalCreateOneOff:
      return globalCreateOneOffConvert(baseProperties, currentUserId, properties, options);
    case _client_core_types__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEvent.GMenuOpenOneOff:
      return gmenuOpenOneOffConvert(baseProperties, currentUserId, properties, options);
    case _client_core_types__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEvent.KeywordDetectionInteracted:
      return keywordDetectionInteractedConvert(baseProperties, currentUserId, properties, options);
    case _client_core_types__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEvent.GMenuShowMoreEventTypes:
      return gmenuShowMoreEventTypesConvert(baseProperties, currentUserId, properties, options);
    case _client_core_types__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEvent.GlobalCreateEventType:
      return globalCreateEventTypeConvert(baseProperties, currentUserId, properties, options);
    case _client_core_types__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEvent.GCalRescheduleClick:
      return gcalRescheduleClickConvert(baseProperties, currentUserId, properties, options);
    case _client_core_types__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEvent.ContactsManagementViewContact:
      return contactsManagementViewContactsConvert(baseProperties, currentUserId, properties, options);
    case _client_core_types__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEvent.LinkedInShowMoreEventTypes:
      return linkedinShowMoreEventTypesConvert(baseProperties, currentUserId, properties, options);
    case _client_core_types__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEvent.LinkedInCopySUL:
      return linkedinCopySulConvert(baseProperties, currentUserId, properties, options);
    case _client_core_types__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEvent.GMenuOpenPoll:
      return gmenuOpenPollConvert(baseProperties, currentUserId, properties, options);
    case _client_core_types__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEvent.EventTypeStar:
      return eventTypeStarConvert(baseProperties, currentUserId, properties, options);
    case _client_core_types__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEvent.LinkedInOpenOneOff:
      return linkedinOpenOneOffConvert(baseProperties, currentUserId, properties, options);
    case _client_core_types__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEvent.FollowUpEmail:
      return followUpEmailConvert(baseProperties, currentUserId, properties, options);
    case _client_core_types__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEvent.ContactsManagementCreateContact:
      return contactsManagementCreateContactConvert(baseProperties, currentUserId, properties, options);
    case _client_core_types__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEvent.GongOpen:
      return gongOpenConvert(baseProperties, currentUserId, properties, options);
    case _client_core_types__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEvent.FollowUpShare:
      return followUpShareConvert(baseProperties, currentUserId, properties, options);
    case _client_core_types__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEvent.ShareAvailabilityStart:
      return shareAvailabilityStartConvert(baseProperties, currentUserId, properties, options);
    case _client_core_types__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEvent.KeywordDetectionSettingsUpdated:
      return keywordDetectionSettingsUpdatedConvert(baseProperties, currentUserId, properties, options);
    case _client_core_types__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEvent.GongCopyLink:
      return gongCopyLinkConvert(baseProperties, currentUserId, properties, options);
    case _client_core_types__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEvent.ContactsManagementRemoveContact:
      return contactsManagementRemoveContactConvert(baseProperties, currentUserId, properties, options);
    case _client_core_types__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEvent.ContactsManagementUpdateContact:
      return contactsManagementUpdateContactConvert(baseProperties, currentUserId, properties, options);
    case _client_core_types__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEvent.GCalEventDetailsView:
      return gcalEventDetailsViewConvert(baseProperties, currentUserId, properties, options);
    case _client_core_types__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEvent.LinkedInOpenPoll:
      return linkedinOpenPollConvert(baseProperties, currentUserId, properties, options);
    case _client_core_types__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEvent.ContactsManagementFavoriteContact:
      return contactsManagementFavoriteContactConvert(baseProperties, currentUserId, properties, options);
    case _client_core_types__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEvent.GongShowMoreEventTypes:
      return gongShowMoreEventTypesConvert(baseProperties, currentUserId, properties, options);
    case _client_core_types__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEvent.GongAddTimes:
      return gongAddTimesConvert(baseProperties, currentUserId, properties, options);
    case _client_core_types__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEvent.GongOpenOneOff:
      return gongOpenOneOffConvert(baseProperties, currentUserId, properties, options);
    case _client_core_types__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEvent.IntegrationsEnableLinkedin:
      return integrationsConvert(baseProperties, currentUserId, {
        edit_type: 'enable',
        setting_name: 'linkedin'
      }, options);
    case _client_core_types__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEvent.IntegrationsEnableGong:
      return integrationsConvert(baseProperties, currentUserId, {
        edit_type: 'enable',
        setting_name: 'gong'
      }, options);
    case _client_core_types__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEvent.IntegrationsEnableGmail:
      return integrationsConvert(baseProperties, currentUserId, {
        edit_type: 'enable',
        setting_name: 'gmail'
      }, options);
    case _client_core_types__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEvent.IntegrationsEnableGcal:
      return integrationsConvert(baseProperties, currentUserId, {
        edit_type: 'enable',
        setting_name: 'gcal'
      }, options);
    case _client_core_types__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEvent.IntegrationsDisableLinkedin:
      return integrationsConvert(baseProperties, currentUserId, {
        edit_type: 'disable',
        setting_name: 'linkedin'
      }, options);
    case _client_core_types__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEvent.IntegrationsDisableGong:
      return integrationsConvert(baseProperties, currentUserId, {
        edit_type: 'disable',
        setting_name: 'gong'
      }, options);
    case _client_core_types__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEvent.IntegrationsDisableGmail:
      return integrationsConvert(baseProperties, currentUserId, {
        edit_type: 'disable',
        setting_name: 'gmail'
      }, options);
    case _client_core_types__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEvent.IntegrationsDisableGcal:
      return integrationsConvert(baseProperties, currentUserId, {
        edit_type: 'disable',
        setting_name: 'gcal'
      }, options);
      break;
  }
  return undefined;
}
const loadSidebarConvert = (baseProperties, currentUserId, properties, options) => {
  var _properties$sidebar_t;
  const location = properties && properties['source'] ? properties['source'] : 'user_click';
  return {
    event: {
      name: 'Extension Sidebar Loaded',
      version: 1,
      dependencies: {
        user_id: currentUserId
      },
      entities: ['organization', 'user'],
      properties: Object.assign({}, baseProperties, {
        location,
        destination: (_properties$sidebar_t = properties == null ? void 0 : properties['sidebar_tab']) != null ? _properties$sidebar_t : undefined
      })
    }
  };
};
const gcalEventBarShownConvert = (baseProperties, currentUserId, properties, options) => {
  var _properties$source;
  return {
    event: {
      name: 'Event Bar Shown',
      version: 1,
      dependencies: {
        user_id: currentUserId
      },
      entities: ['organization', 'user'],
      properties: Object.assign({}, baseProperties, {
        location: 'gcal',
        location_details: (_properties$source = properties == null ? void 0 : properties['source']) != null ? _properties$source : undefined
      })
    }
  };
};
const sidebarCopyLinkConvert = (baseProperties, currentUserId, properties, options) => {
  var _properties$event_typ;
  let shareLocation = properties == null ? void 0 : properties['source'];
  if ((properties == null ? void 0 : properties['sidebar_view']) === 'search') {
    shareLocation = 'sidebar_search';
  }
  return {
    event: {
      name: 'Booking Page Shared',
      version: 1,
      dependencies: {
        user_id: currentUserId
      },
      entities: ['organization', 'user'],
      properties: Object.assign({}, baseProperties, {
        is_customized_at_share: false,
        share_method: 'copy_link',
        share_object: 'event_type',
        share_location: shareLocation,
        is_single_use: (properties == null ? void 0 : properties['type']) === 'single-use link',
        share_object_uuid: (_properties$event_typ = properties == null ? void 0 : properties['event_type_uuid']) != null ? _properties$event_typ : undefined
      })
    }
  };
};
const sidebarLoginConvert = (baseProperties, currentUserId, properties, options) => {
  return {
    event: {
      name: 'Signed In',
      version: 1,
      dependencies: {
        user_id: currentUserId
      },
      entities: ['organization', 'user'],
      properties: Object.assign({}, baseProperties)
    }
  };
};
const searchConvert = (baseProperties, currentUserId, properties, options) => {
  var _properties$string, _properties$result_et, _properties$trigger, _properties$source2;
  return {
    event: {
      name: 'Search Performed',
      version: 1,
      dependencies: {
        user_id: currentUserId
      },
      entities: ['organization', 'user'],
      properties: Object.assign({}, baseProperties, {
        search_text: (_properties$string = properties == null ? void 0 : properties['string']) != null ? _properties$string : undefined,
        results_count: (_properties$result_et = properties == null ? void 0 : properties['result_et_count']) != null ? _properties$result_et : undefined,
        search_type: (_properties$trigger = properties == null ? void 0 : properties['trigger']) != null ? _properties$trigger : undefined,
        location: (_properties$source2 = properties == null ? void 0 : properties['source']) != null ? _properties$source2 : undefined
      })
    }
  };
};
const keywordDetectionShownConvert = (baseProperties, currentUserId, properties, options) => {
  var _properties$keywords;
  return {
    event: {
      name: 'Keyword Detected',
      version: 1,
      dependencies: {
        user_id: currentUserId
      },
      entities: ['organization', 'user'],
      properties: Object.assign({}, baseProperties, {
        action: 'shown',
        keywords: (_properties$keywords = properties == null ? void 0 : properties['keywords']) != null ? _properties$keywords : undefined
      })
    }
  };
};
const gMenuOpenConvert = (baseProperties, currentUserId, properties, options) => {
  return {
    event: {
      name: 'CTA Clicked',
      version: 1,
      dependencies: {
        user_id: currentUserId
      },
      entities: ['organization', 'user'],
      properties: Object.assign({}, baseProperties, {
        cta_details: 'compose',
        cta_key: 'gmenu',
        cta_text: 'opened'
      })
    }
  };
};
const agendaViewSwitchTabConvert = (baseProperties, currentUserId, properties, options) => {
  var _properties$sidebar_t2;
  return {
    event: {
      name: 'Navigation Link Clicked',
      version: 1,
      dependencies: {
        user_id: currentUserId
      },
      entities: ['organization', 'user'],
      properties: Object.assign({}, baseProperties, {
        navigation_location: 'extension_nav',
        navigation_link: (_properties$sidebar_t2 = properties == null ? void 0 : properties['sidebar_tab']) != null ? _properties$sidebar_t2 : undefined
      })
    }
  };
};
const sidebarEmailEmbedConfigureConvert = (baseProperties, currentUserId, properties, options) => {
  let flowLocation = properties == null ? void 0 : properties['source'];
  if ((properties == null ? void 0 : properties['sidebar_view']) === 'search') {
    flowLocation = 'sidebar_search';
  }
  return {
    event: {
      name: 'Flow Step Clicked',
      version: 1,
      dependencies: {
        user_id: currentUserId
      },
      entities: ['organization', 'user'],
      properties: Object.assign({}, baseProperties, {
        flow_version: 'v1',
        flow_name: 'add_times_to_email',
        completion_method: 'add_times_to_email_configure',
        flow_step: 'add_times_to_email_configure',
        flow_location: flowLocation
      })
    }
  };
};
const gMenuCloseConvert = (baseProperties, currentUserId, properties, options) => {
  return {
    event: {
      name: 'CTA Clicked',
      version: 1,
      dependencies: {
        user_id: currentUserId
      },
      entities: ['organization', 'user'],
      properties: Object.assign({}, baseProperties, {
        cta_details: 'compose',
        cta_key: 'gmenu',
        cta_text: 'closed'
      })
    }
  };
};
const gMenuCopyLinkConvert = (baseProperties, currentUserId, properties, options) => {
  var _properties$id;
  return {
    event: {
      name: 'Booking Page Shared',
      version: 1,
      dependencies: {
        user_id: currentUserId
      },
      entities: ['organization', 'user'],
      properties: Object.assign({}, baseProperties, {
        is_customized_at_share: false,
        is_single_use: false,
        share_location: 'gmenu',
        share_method: 'insert_link',
        share_object: 'event_type',
        share_object_uuid: (_properties$id = properties == null ? void 0 : properties['id']) != null ? _properties$id : undefined
      })
    }
  };
};
const linkedinOpenConvert = (baseProperties, currentUserId, properties, options) => {
  var _properties$source3;
  return {
    event: {
      name: 'CTA Clicked',
      version: 1,
      dependencies: {
        user_id: currentUserId
      },
      entities: ['organization', 'user'],
      properties: Object.assign({}, baseProperties, {
        cta_key: 'linkedin',
        cta_text: 'opened',
        cta_details: (_properties$source3 = properties == null ? void 0 : properties['source']) != null ? _properties$source3 : undefined
      })
    }
  };
};
const gMenuToggleEventTypeListConvert = (baseProperties, currentUserId, properties, options) => {
  return {
    event: {
      name: 'CTA Clicked',
      version: 1,
      dependencies: {
        user_id: currentUserId
      },
      entities: ['organization', 'user'],
      properties: Object.assign({}, baseProperties, {
        cta_details: 'compose',
        cta_key: 'gmenu',
        cta_text: 'event_type'
      })
    }
  };
};
const agendaViewMeetingActionConvert = (baseProperties, currentUserId, properties, options) => {
  var _properties$action, _properties$meeting_s, _properties$source4;
  return {
    event: {
      name: 'Meeting Interaction',
      version: 1,
      dependencies: {
        user_id: currentUserId
      },
      entities: ['organization', 'user'],
      properties: Object.assign({}, baseProperties, {
        action: (_properties$action = properties == null ? void 0 : properties['action']) != null ? _properties$action : undefined,
        meeting_status: (_properties$meeting_s = properties == null ? void 0 : properties['meeting_status']) != null ? _properties$meeting_s : undefined,
        location: (_properties$source4 = properties == null ? void 0 : properties['source']) != null ? _properties$source4 : undefined
      })
    }
  };
};
const sidebarEmailEmbedAttemptConvert = (baseProperties, currentUserId, properties, options) => {
  let flowLocation = properties == null ? void 0 : properties['source'];
  if ((properties == null ? void 0 : properties['sidebar_view']) === 'search') {
    flowLocation = 'sidebar_search';
  }
  return {
    event: {
      name: 'Flow Started',
      version: 1,
      dependencies: {
        user_id: currentUserId
      },
      entities: ['organization', 'user'],
      properties: Object.assign({}, baseProperties, {
        flow_location: flowLocation,
        flow_version: 'v1',
        flow_name: 'add_times_to_email'
      })
    }
  };
};
const eventTypePreviewLinkConvert = (baseProperties, currentUserId, properties, options) => {
  let ctaKey = properties == null ? void 0 : properties['source'];
  if ((properties == null ? void 0 : properties['sidebar_view']) === 'search') {
    ctaKey = 'sidebar_search';
  }
  return {
    event: {
      name: 'CTA Clicked',
      version: 1,
      dependencies: {
        user_id: currentUserId
      },
      entities: ['organization', 'user'],
      properties: Object.assign({}, baseProperties, {
        cta_key: ctaKey,
        cta_text: 'event_type_preview'
      })
    }
  };
};
const bookOnBehalfStartConvert = (baseProperties, currentUserId, properties, options) => {
  var _properties$source5;
  return {
    event: {
      name: 'Flow Started',
      version: 1,
      dependencies: {
        user_id: currentUserId
      },
      entities: ['organization', 'user'],
      properties: Object.assign({}, baseProperties, {
        flow_location: (_properties$source5 = properties == null ? void 0 : properties['source']) != null ? _properties$source5 : undefined,
        flow_name: 'schedule_in_real_time',
        flow_version: 'v1'
      })
    }
  };
};
const sidebarEmailEmbedSuccessConvert = (baseProperties, currentUserId, properties, options) => {
  var _properties$event_typ2;
  let shareLocation = properties == null ? void 0 : properties['source'];
  if ((properties == null ? void 0 : properties['sidebar_view']) === 'search') {
    shareLocation = 'sidebar_search';
  }
  return {
    event: {
      name: 'Booking Page Shared',
      version: 1,
      dependencies: {
        user_id: currentUserId
      },
      entities: ['organization', 'user'],
      properties: Object.assign({}, baseProperties, {
        is_customized_at_share: false,
        is_single_use: false,
        share_location: shareLocation,
        share_method: 'add_times_to_email',
        share_object: 'event_type',
        share_object_uuid: (_properties$event_typ2 = properties == null ? void 0 : properties['event_type_uuid']) != null ? _properties$event_typ2 : undefined
      })
    }
  };
};
const integrationsConfigureConvert = (baseProperties, currentUserId, properties, options) => {
  var _properties$setting_n;
  return {
    event: {
      name: 'Setting Updated',
      version: 1,
      dependencies: {
        user_id: currentUserId
      },
      entities: ['organization', 'user'],
      properties: Object.assign({}, baseProperties, {
        setting_name: (_properties$setting_n = properties == null ? void 0 : properties['setting_name']) != null ? _properties$setting_n : undefined,
        edit_type: properties != null && properties['edit_type'] ? [properties == null ? void 0 : properties['edit_type']] : []
      })
    }
  };
};
const linkedinCopyLinkConvert = (baseProperties, currentUserId, properties, options) => {
  var _properties$id2;
  return {
    event: {
      name: 'Booking Page Shared',
      version: 1,
      dependencies: {
        user_id: currentUserId
      },
      entities: ['organization', 'user'],
      properties: Object.assign({}, baseProperties, {
        is_customized_at_share: false,
        is_single_use: false,
        share_location: 'linkedin',
        share_method: 'insert_link',
        share_object: 'event_type',
        share_object_uuid: (_properties$id2 = properties == null ? void 0 : properties['id']) != null ? _properties$id2 : undefined
      })
    }
  };
};
const globalCreateOneOffConvert = (baseProperties, currentUserId, properties, options) => {
  return {
    event: {
      name: 'CTA Clicked',
      version: 1,
      dependencies: {
        user_id: currentUserId
      },
      entities: ['organization', 'user'],
      properties: Object.assign({}, baseProperties, {
        cta_key: 'global',
        cta_text: 'create_one_off_meeting'
      })
    }
  };
};
const gmenuOpenOneOffConvert = (baseProperties, currentUserId, properties, options) => {
  return {
    event: {
      name: 'CTA Clicked',
      version: 1,
      dependencies: {
        user_id: currentUserId
      },
      entities: ['organization', 'user'],
      properties: Object.assign({}, baseProperties, {
        cta_key: 'gmenu',
        cta_text: 'one_off_meeting',
        cta_details: 'compose'
      })
    }
  };
};
const keywordDetectionInteractedConvert = (baseProperties, currentUserId, properties, options) => {
  var _properties$action2;
  return {
    event: {
      name: 'Keyword Detected',
      version: 1,
      dependencies: {
        user_id: currentUserId
      },
      entities: ['organization', 'user'],
      properties: Object.assign({}, baseProperties, {
        action: (_properties$action2 = properties == null ? void 0 : properties['action']) != null ? _properties$action2 : undefined
      })
    }
  };
};
const gmenuShowMoreEventTypesConvert = (baseProperties, currentUserId, properties, options) => {
  return {
    event: {
      name: 'CTA Clicked',
      version: 1,
      dependencies: {
        user_id: currentUserId
      },
      entities: ['organization', 'user'],
      properties: Object.assign({}, baseProperties, {
        cta_key: 'gmenu',
        cta_text: 'event_type_show_all',
        cta_details: 'compose'
      })
    }
  };
};
const globalCreateEventTypeConvert = (baseProperties, currentUserId, properties, options) => {
  return {
    event: {
      name: 'CTA Clicked',
      version: 1,
      dependencies: {
        user_id: currentUserId
      },
      entities: ['organization', 'user'],
      properties: Object.assign({}, baseProperties, {
        cta_key: 'global',
        cta_text: 'create_event_type'
      })
    }
  };
};
const gcalRescheduleClickConvert = (baseProperties, currentUserId, properties, options) => {
  return {
    event: {
      name: 'CTA Clicked',
      version: 1,
      dependencies: {
        user_id: currentUserId
      },
      entities: ['organization', 'user'],
      properties: Object.assign({}, baseProperties, {
        cta_key: 'gcal',
        cta_text: 'reschedule_event',
        cta_details: 'event_bar'
      })
    }
  };
};
const contactsManagementViewContactsConvert = (baseProperties, currentUserId, properties, options) => {
  var _properties$contact_u;
  return {
    event: {
      name: 'Contact Interaction',
      version: 1,
      dependencies: {
        user_id: currentUserId
      },
      entities: ['organization', 'user'],
      properties: Object.assign({}, baseProperties, {
        action: 'profile_view',
        location: 'contact_sidebar',
        contact_uuid: (_properties$contact_u = properties == null ? void 0 : properties['contact_uuid']) != null ? _properties$contact_u : undefined
      })
    }
  };
};
const linkedinShowMoreEventTypesConvert = (baseProperties, currentUserId, properties, options) => {
  var _properties$source6;
  return {
    event: {
      name: 'CTA Clicked',
      version: 1,
      dependencies: {
        user_id: currentUserId
      },
      entities: ['organization', 'user'],
      properties: Object.assign({}, baseProperties, {
        cta_key: 'linkedin',
        cta_text: 'event_type_show_all',
        cta_details: (_properties$source6 = properties == null ? void 0 : properties['source']) != null ? _properties$source6 : undefined
      })
    }
  };
};
const linkedinCopySulConvert = (baseProperties, currentUserId, properties, options) => {
  var _properties$id3;
  return {
    event: {
      name: 'Booking Page Shared',
      version: 1,
      dependencies: {
        user_id: currentUserId
      },
      entities: ['organization', 'user'],
      properties: Object.assign({}, baseProperties, {
        is_customized_at_share: false,
        is_single_use: true,
        share_location: 'linkedin',
        share_method: 'insert_link',
        share_object: 'event_type',
        share_object_uuid: (_properties$id3 = properties == null ? void 0 : properties['id']) != null ? _properties$id3 : undefined
      })
    }
  };
};
const gmenuOpenPollConvert = (baseProperties, currentUserId, properties, options) => {
  return {
    event: {
      name: 'CTA Clicked',
      version: 1,
      dependencies: {
        user_id: currentUserId
      },
      entities: ['organization', 'user'],
      properties: Object.assign({}, baseProperties, {
        cta_key: 'gmenu',
        cta_text: 'poll',
        cta_details: 'compose'
      })
    }
  };
};
const eventTypeStarConvert = (baseProperties, currentUserId, properties, options) => {
  var _properties$event_typ3;
  return {
    event: {
      name: 'Event Type Updated',
      version: 1,
      dependencies: {
        user_id: currentUserId
      },
      entities: ['organization', 'user'],
      properties: Object.assign({}, baseProperties, {
        count_fields_updated: 1,
        event_type_name: (_properties$event_typ3 = properties == null ? void 0 : properties['event_type_name']) != null ? _properties$event_typ3 : undefined,
        fields_updated: 'favorite'
        // event_type_role: '', // TODO: Check these 2 fields
        // is_event_type_host: true,
      })
    }
  };
};

const linkedinOpenOneOffConvert = (baseProperties, currentUserId, properties, options) => {
  var _properties$source7;
  return {
    event: {
      name: 'CTA Clicked',
      version: 1,
      dependencies: {
        user_id: currentUserId
      },
      entities: ['organization', 'user'],
      properties: Object.assign({}, baseProperties, {
        cta_key: 'linkedin',
        cta_text: 'one_off_meeting',
        cta_details: (_properties$source7 = properties == null ? void 0 : properties['source']) != null ? _properties$source7 : undefined
      })
    }
  };
};
const followUpEmailConvert = (baseProperties, currentUserId, properties, options) => {
  return {
    event: {
      name: 'CTA Clicked',
      version: 1,
      dependencies: {
        user_id: currentUserId
      },
      entities: ['organization', 'user'],
      properties: Object.assign({}, baseProperties, {
        cta_key: 'gcal',
        cta_text: 'email_user',
        cta_details: 'event_bar'
      })
    }
  };
};
const contactsManagementCreateContactConvert = (baseProperties, currentUserId, properties, options) => {
  var _properties$contact_u2;
  return {
    event: {
      name: 'Contact Updated',
      version: 1,
      dependencies: {
        user_id: currentUserId
      },
      entities: ['organization', 'user'],
      properties: Object.assign({}, baseProperties, {
        contact_uuid: (_properties$contact_u2 = properties == null ? void 0 : properties['contact_uuid']) != null ? _properties$contact_u2 : undefined,
        update_type: 'create',
        contact_source: 'contact_list'
      })
    }
  };
};
const gongOpenConvert = (baseProperties, currentUserId, properties, options) => {
  return {
    event: {
      name: 'CTA Clicked',
      version: 1,
      dependencies: {
        user_id: currentUserId
      },
      entities: ['organization', 'user'],
      properties: Object.assign({}, baseProperties, {
        cta_key: 'gong',
        cta_text: 'opened'
      })
    }
  };
};
const followUpShareConvert = (baseProperties, currentUserId, properties, options) => {
  return {
    event: {
      name: 'CTA Clicked',
      version: 1,
      dependencies: {
        user_id: currentUserId
      },
      entities: ['organization', 'user'],
      properties: Object.assign({}, baseProperties, {
        cta_key: 'gcal',
        cta_text: 'share_availability',
        cta_details: 'event_bar'
      })
    }
  };
};
const shareAvailabilityStartConvert = (baseProperties, currentUserId, properties, options) => {
  var _properties$contact_u3;
  return {
    event: {
      name: 'Contact Interaction',
      version: 1,
      dependencies: {
        user_id: currentUserId
      },
      entities: ['organization', 'user'],
      properties: Object.assign({}, baseProperties, {
        action: 'share_availability',
        location: 'contact_sidebar',
        contact_uuid: (_properties$contact_u3 = properties == null ? void 0 : properties['contact_uuid']) != null ? _properties$contact_u3 : undefined
      })
    }
  };
};
const keywordDetectionSettingsUpdatedConvert = (baseProperties, currentUserId, properties, options) => {
  let editType = [];
  if ((properties == null ? void 0 : properties['update_type']) === 'enabled') {
    editType = ['enable'];
  } else if ((properties == null ? void 0 : properties['update_type']) === 'disabled') {
    editType = ['disable'];
  }
  return {
    event: {
      name: 'Setting Updated',
      version: 1,
      dependencies: {
        user_id: currentUserId
      },
      entities: ['organization', 'user'],
      properties: Object.assign({}, baseProperties, {
        edit_type: editType,
        setting_name: 'keyword_detection'
      })
    }
  };
};
const gongCopyLinkConvert = (baseProperties, currentUserId, properties, options) => {
  var _properties$id4;
  return {
    event: {
      name: 'Booking Page Shared',
      version: 1,
      dependencies: {
        user_id: currentUserId
      },
      entities: ['organization', 'user'],
      properties: Object.assign({}, baseProperties, {
        is_customized_at_share: false,
        is_single_use: false,
        share_location: 'gong',
        share_method: 'insert_link',
        share_object: 'event_type',
        share_object_uuid: (_properties$id4 = properties == null ? void 0 : properties['id']) != null ? _properties$id4 : undefined
      })
    }
  };
};
const contactsManagementRemoveContactConvert = (baseProperties, currentUserId, properties, options) => {
  var _properties$contact_s, _properties$contact_u4;
  return {
    event: {
      name: 'Contact Updated',
      version: 1,
      dependencies: {
        user_id: currentUserId
      },
      entities: ['organization', 'user'],
      properties: Object.assign({}, baseProperties, {
        update_type: 'remove',
        contact_source: (_properties$contact_s = properties == null ? void 0 : properties['contact_source']) != null ? _properties$contact_s : undefined,
        contact_uuid: (_properties$contact_u4 = properties == null ? void 0 : properties['contact_uuid']) != null ? _properties$contact_u4 : undefined
      })
    }
  };
};
const contactsManagementUpdateContactConvert = (baseProperties, currentUserId, properties, options) => {
  var _properties$contact_s2, _properties$contact_u5;
  return {
    event: {
      name: 'Contact Updated',
      version: 1,
      dependencies: {
        user_id: currentUserId
      },
      entities: ['organization', 'user'],
      properties: Object.assign({}, baseProperties, {
        update_type: 'edit',
        contact_source: (_properties$contact_s2 = properties == null ? void 0 : properties['contact_source']) != null ? _properties$contact_s2 : undefined,
        contact_uuid: (_properties$contact_u5 = properties == null ? void 0 : properties['contact_uuid']) != null ? _properties$contact_u5 : undefined
      })
    }
  };
};
const gcalEventDetailsViewConvert = (baseProperties, currentUserId, properties, options) => {
  return {
    event: {
      name: 'CTA Clicked',
      version: 1,
      dependencies: {
        user_id: currentUserId
      },
      entities: ['organization', 'user'],
      properties: Object.assign({}, baseProperties, {
        cta_key: 'gcal',
        cta_text: 'view_details',
        cta_details: 'event_bar'
      })
    }
  };
};
const linkedinOpenPollConvert = (baseProperties, currentUserId, properties, options) => {
  var _properties$source8;
  return {
    event: {
      name: 'CTA Clicked',
      version: 1,
      dependencies: {
        user_id: currentUserId
      },
      entities: ['organization', 'user'],
      properties: Object.assign({}, baseProperties, {
        cta_key: 'linkedin',
        cta_text: 'poll',
        cta_details: (_properties$source8 = properties == null ? void 0 : properties['source']) != null ? _properties$source8 : undefined
      })
    }
  };
};
const contactsManagementFavoriteContactConvert = (baseProperties, currentUserId, properties, options) => {
  var _properties$contact_s3, _properties$contact_u6;
  return {
    event: {
      name: 'Contact Updated',
      version: 1,
      dependencies: {
        user_id: currentUserId
      },
      entities: ['organization', 'user'],
      properties: Object.assign({}, baseProperties, {
        update_type: 'favorite',
        contact_source: (_properties$contact_s3 = properties == null ? void 0 : properties['contact_source']) != null ? _properties$contact_s3 : undefined,
        contact_uuid: (_properties$contact_u6 = properties == null ? void 0 : properties['contact_uuid']) != null ? _properties$contact_u6 : undefined
      })
    }
  };
};
const gongShowMoreEventTypesConvert = (baseProperties, currentUserId, properties, options) => {
  return {
    event: {
      name: 'CTA Clicked',
      version: 1,
      dependencies: {
        user_id: currentUserId
      },
      entities: ['organization', 'user'],
      properties: Object.assign({}, baseProperties, {
        cta_key: 'gong',
        cta_text: 'event_type_show_all'
      })
    }
  };
};
const gongAddTimesConvert = (baseProperties, currentUserId, properties, options) => {
  return {
    event: {
      name: 'CTA Clicked',
      version: 1,
      dependencies: {
        user_id: currentUserId
      },
      entities: ['organization', 'user'],
      properties: Object.assign({}, baseProperties, {
        cta_key: 'gong',
        cta_text: 'event_type'
      })
    }
  };
};
const gongOpenOneOffConvert = (baseProperties, currentUserId, properties, options) => {
  return {
    event: {
      name: 'CTA Clicked',
      version: 1,
      dependencies: {
        user_id: currentUserId
      },
      entities: ['organization', 'user'],
      properties: Object.assign({}, baseProperties, {
        cta_key: 'gong',
        cta_text: 'one_off_meeting'
      })
    }
  };
};
const integrationsConvert = (baseProperties, currentUserId, properties, options) => {
  var _properties$setting_n2;
  return {
    event: {
      name: 'Setting Updated',
      version: 1,
      dependencies: {
        user_id: currentUserId
      },
      entities: ['organization', 'user'],
      properties: Object.assign({}, baseProperties, {
        update_type: 'favorite',
        setting_name: (_properties$setting_n2 = properties == null ? void 0 : properties['setting_name']) != null ? _properties$setting_n2 : undefined,
        edit_type: properties != null && properties['edit_type'] ? [properties == null ? void 0 : properties['edit_type']] : []
      })
    }
  };
};

/***/ }),

/***/ "../../libs/platform/src/lib/calendly/api.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CalendlyApi: () => (/* binding */ CalendlyApi),
/* harmony export */   notEmpty: () => (/* binding */ notEmpty)
/* harmony export */ });
function notEmpty(value) {
  return value !== null && value !== undefined;
}
class CalendlyApi {
  constructor(network, settings) {
    this.network = network;
    this.settings = settings;
  }
  async makeApiV1Url(path) {
    const settings = await this.settings.get();
    return `${settings.apiHost}/api/apps/extension/v1${path}`;
  }
  async makeApiV2Url(path) {
    const settings = await this.settings.get();
    return `${settings.apiHost}/api/apps/extension/v2${path}`;
  }
  async getLoginStatus(useCache = false) {
    try {
      const user = await this.network.get(await this.makeApiV1Url('/users/me'));
      return {
        user,
        loggedIn: true
      };
    } catch (err) {
      if (typeof err === 'object' && err !== null) {
        const e = err;
        if (e.status && e.status === 401) {
          return {
            user: null,
            loggedIn: false
          };
        } else {
          console.warn('Request for user failed unexpectedly - falling back to cache', err);
          const user = await this.network.get(await this.makeApiV1Url('/users/me'));
          return {
            user: user,
            loggedIn: user ? true : false
          };
        }
      }
      throw err;
    }
  }
  async calendlyAnalytics(payload) {
    try {
      const response = await this.network.post(await this.makeApiV1Url('/analytics/track'), payload);
      if (response.status === 401) {
        throw new Error('Invalid or expired authentication token');
      } else if (response.status < 200 || response.status >= 300) {
        throw new Error(`Unexpected status code: ${response.status}`);
      }
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
  async ensureCookieSession() {
    try {
      const response = await this.network.post(await this.makeApiV1Url('/authentication/convert'), {
        platform: 'clients'
      }, {
        credentials: 'include'
      });
      if (response.status === 401) {
        throw new Error('Invalid or expired authentication token');
      } else if (response.status < 200 || response.status >= 300) {
        throw new Error(`Unexpected status code: ${response.status}`);
      }
    } catch (err) {
      const apiUser = await this.getUser();
      const cookieUser = await this.getCookieUser();
      if (!cookieUser || apiUser.internal_id !== cookieUser.internal_id) {
        console.error('Unexpected error converting JWT to Cookie:', err);
        // TODO: Add Airbrake error reporting
        return Promise.reject(err);
      }
    }
    return true;
  }
  async getUser() {
    const res = await this.network.get(await this.makeApiV1Url('/users/me'));
    return res;
  }
  async getCookieUser() {
    const res = await this.network.get(await this.makeApiV1Url('/users/me'), {
      credentials: 'include',
      noAuth: true
    });
    return res;
  }
  async getEBNF(context) {
    const params = new URLSearchParams();
    params.append('context', context);
    const settings = await this.settings.get();
    const url = `${settings.ebnfUrl}?${params}`;
    const result = await this.network.get(url, {
      noAuth: true
    });
    return result;
  }
  async getFlag(name, analytics = false) {
    const params = new URLSearchParams();
    params.append('send_analytics', String(analytics));
    const url = await this.makeApiV2Url(`/feature_flags/${name}?${params}`);
    const result = await this.network.get(url);
    return result;
  }
  async getPaginatedEventTypes(pageNumber = 1, pageSize = 50) {
    const params = new URLSearchParams();
    params.append('page_number', String(pageNumber));
    params.append('page_size', String(pageSize));
    const url = await this.makeApiV1Url(`/users/me/event_types?${params}`);
    const res = await this.network.get(url);
    return res;
  }
  async getAgendaScheduledEvents(start, end, userUri, userId, options) {
    const params = new URLSearchParams();
    params.append('min_start_time', start);
    params.append('max_start_time', end);
    params.append('count', String((options == null ? void 0 : options.pageSize) || 50));
    params.append('user', userUri || '');
    params.append('user_uuid', userId || '');
    params.append('event_type_details', 'true');
    params.append('sort', `start_time:${(options == null ? void 0 : options.sortOrder) || 'asc'}`);
    if (options != null && options.status) {
      params.append('status', options.status);
    }
    if (options != null && options.pageToken) {
      params.append('page_token', options.pageToken);
    }
    return await this.network.get(await this.makeApiV2Url(`/agenda?${params}`));
  }
  async getScheduledEvents(start, end, userUri, options) {
    const params = new URLSearchParams();
    params.append('min_start_time', start);
    params.append('max_start_time', end);
    params.append('count', String((options == null ? void 0 : options.pageSize) || 50));
    params.append('user', userUri || '');
    params.append('et_details', 'false');
    if (options != null && options.status) {
      params.append('status', options.status);
    }
    if (options != null && options.pageToken) {
      params.append('page_token', options.pageToken);
    }
    return await this.network.get(await this.makeApiV2Url(`/scheduled_events?${params}`));
  }
  async getScheduledEventInvitees(uuid, options) {
    const params = new URLSearchParams();
    params.append('count', String((options == null ? void 0 : options.pageSize) || 50));
    if (options != null && options.status) {
      params.append('status', options.status);
    }
    if (options != null && options.pageToken) {
      params.append('page_token', options.pageToken);
    }
    return await this.network.get(await this.makeApiV2Url(`/scheduled_events/${uuid}/invitees?${params}`));
  }
  async getScheduledEvent(uuid) {
    return await this.network.get(await this.makeApiV2Url(`/scheduled_events/${uuid}`));
  }
  async getGlobalFeatureFlags() {
    return this.network.get(await this.makeApiV1Url('/feature_flags'), {
      noAuth: true
    });
  }
  async postEventTypeStar(eventTypeId) {
    const bodyFormData = new FormData();
    bodyFormData.set('event_type_uuid', eventTypeId + '');
    return await this.network.post(await this.makeApiV1Url('/users/me/event_type_stars'), {
      event_type_uuid: String(eventTypeId)
    }, {
      asFormData: true
    });
  }
  async deleteEventTypeStar(eventTypeId) {
    await this.network.delete(await this.makeApiV1Url(`/users/me/event_type_stars/${eventTypeId}`));
  }
  async getOrganizationMembers() {
    return this.network.get(await this.makeApiV1Url('/organizations/current/members'));
  }
  async postProfileStar(profileId) {
    return await this.network.post(await this.makeApiV1Url('/users/me/profile_stars'), {
      profile_id: String(profileId)
    }, {
      asFormData: true
    });
  }
  async deleteProfileStar(profileId) {
    await this.network.delete(await this.makeApiV1Url(`/users/me/profile_stars/${profileId}`));
  }
  async postSingleUseLink(eventTypeId) {
    const res = await this.network.post(await this.makeApiV1Url('/users/me/event_type_single_use_links'), {
      event_type_uuid: eventTypeId + ''
    });
    return res;
  }
  async putInternalNote(eventTypeId, internalNote) {
    return await this.network.put(await this.makeApiV1Url(`/users/me/event_types/${eventTypeId}/internal_note`), {
      internal_note: internalNote
    }, {
      asFormData: true
    });
  }
  async getEventTypeAvailability(eventTypeId, date, timezone) {
    const tz = encodeURIComponent(timezone);
    const d = encodeURIComponent(date);
    const etId = encodeURIComponent(eventTypeId);
    return await this.network.get(await this.makeApiV1Url(`/users/me/event_types/${etId}/availability?date=${d}&timezone=${tz}`));
  }
  async getFlashMessages(platform, version) {
    try {
      const settings = await this.settings.get();
      const url = `${settings.flashUrl}?time=${new Date().getTime()}`;
      const response = await this.network.get(url, {
        noAuth: true
      });
      let global, globalVersion, plat, platVersion;
      if (response.allPlatforms) {
        global = response.allPlatforms.allVersions;
        if (response.allPlatforms.version) {
          globalVersion = response.allPlatforms.version[version];
        }
      }
      const platformResponse = response[platform];
      if (platformResponse) {
        plat = platformResponse.allVersions;
        if (platformResponse.version) {
          platVersion = platformResponse.version[version];
        }
      }
      return [global, globalVersion, plat, platVersion].filter(notEmpty);
    } catch (e) {
      console.warn('Error fetching flash messages:', e);
      return [];
    }
  }
  async getErrorMessages() {
    const settings = await this.settings.get();
    const url = `${settings.errorMessagesUrl}`;
    const result = await this.network.get(url, {
      noAuth: true
    });
    return result;
  }
  async getKeywordDetectionPhrases() {
    const settings = await this.settings.get();
    const url = `${settings.keywordDetectionPhrasesUrl}`;
    const result = await this.network.get(url, {
      noAuth: true
    });
    return result;
  }
  async postMarkNoShow(inviteeId) {
    return await this.network.post(await this.makeApiV2Url('/invitee_no_shows'), {
      invitee_uuid: String(inviteeId)
    }, {
      asFormData: true
    });
  }
  async deleteMarkNoShow(noShowUri) {
    const parts = noShowUri.split('/');
    const uuid = parts[parts.length - 1];
    return await this.network.delete(await this.makeApiV2Url(`/invitee_no_shows/${uuid}`));
  }
  async getContactsList(options) {
    const params = new URLSearchParams();
    params.append('count', String((options == null ? void 0 : options.count) || 50));
    if (options != null && options.email) {
      params.append('email', options.email);
    }
    if (options != null && options.sortField && options.sortOrder) {
      params.append('sort', `${options.sortField}:${options.sortOrder}`);
    }
    if ((options == null ? void 0 : options.favorite) !== undefined) {
      params.append('favorite', String(options.favorite));
    }
    if (options != null && options.pageToken) {
      params.append('page_token', options.pageToken);
    }
    if ((options == null ? void 0 : options.visible) !== undefined) {
      params.append('visible', String(options.visible));
    }
    if (options != null && options.resource) {
      params.append('resource', options.resource);
    }
    return await this.network.get(await this.makeApiV2Url(`/contacts?${params}`));
  }
  async getContact(uuid) {
    return await this.network.get(await this.makeApiV2Url(`/contacts/${uuid}`));
  }
  async getContactsBySearchQuery(searchQuery, userId, options) {
    const params = new URLSearchParams();
    params.append('query', searchQuery);
    params.append('user_uuid', userId || '');
    if ((options == null ? void 0 : options.visible) !== undefined) {
      params.append('visible', String(options.visible));
    }
    return await this.network.get(await this.makeApiV2Url(`/contacts/search?${params}`), {});
  }
  async patchContactFavorites(uuid, isFavorite) {
    return await this.network.patch(await this.makeApiV2Url(`/contacts/${uuid}`), {
      favorite: String(isFavorite)
    });
  }
  async getContactMeetingHistory(email, user_uuid, organization_uuid) {
    const url = new URL(await this.makeApiV2Url('/contact_meeting_history'));
    url.searchParams.append('email', email);
    if (user_uuid) {
      url.searchParams.append('user_uuid', user_uuid);
    }
    if (organization_uuid) {
      url.searchParams.append('organization_uuid', organization_uuid);
    }
    return await this.network.get(url.toString());
  }
  async createContact(contact, userUuid) {
    const contactData = Object.assign({}, contact, {
      user_uuid: userUuid || ''
    });
    return await this.network.post(await this.makeApiV2Url('/contacts'), contactData);
  }
  async deleteContact(uuid) {
    return await this.network.delete(await this.makeApiV2Url(`/contacts/${uuid}`));
  }
  async patchContact(uuid, contact) {
    return await this.network.patch(await this.makeApiV2Url(`/contacts/${uuid}`), contact);
  }
  async postEventCancellation(scheduled_event_uuid, reason) {
    const data = {
      reason: reason
    };
    return await this.network.post(await this.makeApiV2Url(`/scheduled_events/${scheduled_event_uuid}/cancellations`), data);
  }
  async hrrReschedule(inviteeId, message) {
    return await this.network.post(await this.makeApiV2Url(`/invitees/host_reschedule`), {
      invitee_uuids: [inviteeId],
      body: message
    });
  }
  async getEventTypeAvailableSpots(uuid, options, cancellationId) {
    const params = new URLSearchParams();
    params.append('end_date', options.end_date);
    params.append('start_date', options.start_date);
    params.append('timezone', options.timezone);
    if (options.invitee_email) {
      params.append('invitee_email', options.invitee_email);
    }
    if (options.invitee_name) {
      params.append('invitee_name', options.invitee_name);
    }
    if (options.show_unavailable_spots) {
      params.append('show_unavailable_spots', String(options.show_unavailable_spots));
    }
    return await this.network.get(await this.makeApiV2Url(`/event_types/${uuid}/availability?${params}`), {
      cancellationId: cancellationId
    });
  }
}

/***/ }),

/***/ "../../libs/platform/src/lib/calendly/apiTypes.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ApiEventTypeKind: () => (/* binding */ ApiEventTypeKind),
/* harmony export */   ApiEventTypePoolingType: () => (/* binding */ ApiEventTypePoolingType),
/* harmony export */   ApiEventTypeType: () => (/* binding */ ApiEventTypeType),
/* harmony export */   ApiScheduledEventLocationStatus: () => (/* binding */ ApiScheduledEventLocationStatus),
/* harmony export */   ApiScheduledEventLocationType: () => (/* binding */ ApiScheduledEventLocationType),
/* harmony export */   Currency: () => (/* binding */ Currency),
/* harmony export */   EventTypeType: () => (/* binding */ EventTypeType),
/* harmony export */   PaymentProvider: () => (/* binding */ PaymentProvider),
/* harmony export */   getEventTypeType: () => (/* binding */ getEventTypeType)
/* harmony export */ });
let ApiEventTypeType = /*#__PURE__*/function (ApiEventTypeType) {
  ApiEventTypeType["AdhocEventType"] = "AdhocEventType";
  ApiEventTypeType["StandardEventType"] = "StandardEventType";
  return ApiEventTypeType;
}({});
let ApiEventTypePoolingType = /*#__PURE__*/function (ApiEventTypePoolingType) {
  ApiEventTypePoolingType["RoundRobin"] = "round_robin";
  ApiEventTypePoolingType["Collective"] = "collective";
  ApiEventTypePoolingType["MultiPool"] = "multi_pool";
  return ApiEventTypePoolingType;
}({});
let ApiEventTypeKind = /*#__PURE__*/function (ApiEventTypeKind) {
  ApiEventTypeKind["Solo"] = "solo";
  ApiEventTypeKind["Group"] = "group";
  return ApiEventTypeKind;
}({});
let EventTypeType = /*#__PURE__*/function (EventTypeType) {
  EventTypeType["OneOff"] = "one_off";
  EventTypeType["Poll"] = "poll";
  return EventTypeType;
}({});
const getEventTypeType = eventType => {
  if (eventType === null) {
    return EventTypeType.OneOff;
  }
  if (eventType.type === ApiEventTypeType.AdhocEventType) {
    if (eventType.kind === ApiEventTypeKind.Solo) {
      return EventTypeType.OneOff;
    } else {
      return EventTypeType.Poll;
    }
  }
  if (eventType.pooling_type) {
    return eventType.pooling_type;
  }
  return eventType.kind;
};
let ApiScheduledEventLocationStatus = /*#__PURE__*/function (ApiScheduledEventLocationStatus) {
  ApiScheduledEventLocationStatus["Pushed"] = "pushed";
  ApiScheduledEventLocationStatus["Failed"] = "failed";
  ApiScheduledEventLocationStatus["Processing"] = "processing";
  ApiScheduledEventLocationStatus["Initiated"] = "initiated";
  ApiScheduledEventLocationStatus["Null"] = "null";
  return ApiScheduledEventLocationStatus;
}({});
let ApiScheduledEventLocationType = /*#__PURE__*/function (ApiScheduledEventLocationType) {
  ApiScheduledEventLocationType["Physical"] = "physical";
  ApiScheduledEventLocationType["InboundCall"] = "inbound_call";
  ApiScheduledEventLocationType["OutboundCall"] = "outbound_call";
  ApiScheduledEventLocationType["ZoomConference"] = "zoom";
  ApiScheduledEventLocationType["GoogleConference"] = "google_conference";
  ApiScheduledEventLocationType["MicrosoftTeamsConference"] = "microsoft_teams_conference";
  ApiScheduledEventLocationType["WebexConference"] = "webex_conference";
  ApiScheduledEventLocationType["GotomeetingConference"] = "gotomeeting";
  ApiScheduledEventLocationType["AskInvitee"] = "ask_invitee";
  ApiScheduledEventLocationType["Custom"] = "custom";
  return ApiScheduledEventLocationType;
}({});
let PaymentProvider = /*#__PURE__*/function (PaymentProvider) {
  PaymentProvider["Stripe"] = "stripe";
  PaymentProvider["PayPal"] = "paypal";
  return PaymentProvider;
}({});
let Currency = /*#__PURE__*/function (Currency) {
  Currency["AUD"] = "AUD";
  Currency["CAD"] = "CAD";
  Currency["EUR"] = "EUR";
  Currency["GBP"] = "GBP";
  Currency["USD"] = "USD";
  return Currency;
}({});

/***/ }),

/***/ "../../libs/platform/src/lib/calendly/index.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ApiEventTypeKind: () => (/* reexport safe */ _apiTypes__WEBPACK_IMPORTED_MODULE_1__.ApiEventTypeKind),
/* harmony export */   ApiEventTypePoolingType: () => (/* reexport safe */ _apiTypes__WEBPACK_IMPORTED_MODULE_1__.ApiEventTypePoolingType),
/* harmony export */   ApiEventTypeType: () => (/* reexport safe */ _apiTypes__WEBPACK_IMPORTED_MODULE_1__.ApiEventTypeType),
/* harmony export */   ApiScheduledEventLocationStatus: () => (/* reexport safe */ _apiTypes__WEBPACK_IMPORTED_MODULE_1__.ApiScheduledEventLocationStatus),
/* harmony export */   ApiScheduledEventLocationType: () => (/* reexport safe */ _apiTypes__WEBPACK_IMPORTED_MODULE_1__.ApiScheduledEventLocationType),
/* harmony export */   CalendlyApi: () => (/* reexport safe */ _api__WEBPACK_IMPORTED_MODULE_0__.CalendlyApi),
/* harmony export */   Currency: () => (/* reexport safe */ _apiTypes__WEBPACK_IMPORTED_MODULE_1__.Currency),
/* harmony export */   EventTimeStatus: () => (/* reexport safe */ _scheduledEvents__WEBPACK_IMPORTED_MODULE_2__.EventTimeStatus),
/* harmony export */   EventTypeEnum: () => (/* reexport safe */ _scheduledEvents__WEBPACK_IMPORTED_MODULE_2__.EventTypeEnum),
/* harmony export */   EventTypeType: () => (/* reexport safe */ _apiTypes__WEBPACK_IMPORTED_MODULE_1__.EventTypeType),
/* harmony export */   PaymentProvider: () => (/* reexport safe */ _apiTypes__WEBPACK_IMPORTED_MODULE_1__.PaymentProvider),
/* harmony export */   ScheduledEvent: () => (/* reexport safe */ _scheduledEvents__WEBPACK_IMPORTED_MODULE_2__.ScheduledEvent),
/* harmony export */   ScheduledEventGuest: () => (/* reexport safe */ _scheduledEvents__WEBPACK_IMPORTED_MODULE_2__.ScheduledEventGuest),
/* harmony export */   ScheduledEventInvitee: () => (/* reexport safe */ _scheduledEvents__WEBPACK_IMPORTED_MODULE_2__.ScheduledEventInvitee),
/* harmony export */   ScheduledEventLocation: () => (/* reexport safe */ _scheduledEvents__WEBPACK_IMPORTED_MODULE_2__.ScheduledEventLocation),
/* harmony export */   ScheduledEventMembership: () => (/* reexport safe */ _scheduledEvents__WEBPACK_IMPORTED_MODULE_2__.ScheduledEventMembership),
/* harmony export */   ScheduledEventsManager: () => (/* reexport safe */ _scheduledEvents__WEBPACK_IMPORTED_MODULE_2__.ScheduledEventsManager),
/* harmony export */   getEventTypeType: () => (/* reexport safe */ _apiTypes__WEBPACK_IMPORTED_MODULE_1__.getEventTypeType),
/* harmony export */   notEmpty: () => (/* reexport safe */ _api__WEBPACK_IMPORTED_MODULE_0__.notEmpty)
/* harmony export */ });
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../libs/platform/src/lib/calendly/api.ts");
/* harmony import */ var _apiTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../libs/platform/src/lib/calendly/apiTypes.ts");
/* harmony import */ var _scheduledEvents__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../libs/platform/src/lib/calendly/scheduledEvents.ts");




/***/ }),

/***/ "../../libs/platform/src/lib/calendly/scheduledEvents.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EventTimeStatus: () => (/* binding */ EventTimeStatus),
/* harmony export */   EventTypeEnum: () => (/* binding */ EventTypeEnum),
/* harmony export */   ScheduledEvent: () => (/* binding */ ScheduledEvent),
/* harmony export */   ScheduledEventGuest: () => (/* binding */ ScheduledEventGuest),
/* harmony export */   ScheduledEventInvitee: () => (/* binding */ ScheduledEventInvitee),
/* harmony export */   ScheduledEventLocation: () => (/* binding */ ScheduledEventLocation),
/* harmony export */   ScheduledEventMembership: () => (/* binding */ ScheduledEventMembership),
/* harmony export */   ScheduledEventsManager: () => (/* binding */ ScheduledEventsManager)
/* harmony export */ });
/* harmony import */ var luxon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/luxon/src/luxon.js");
/* harmony import */ var _apiTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../libs/platform/src/lib/calendly/apiTypes.ts");


class ScheduledEventsManager {
  constructor(storage, api) {
    this.storage = storage;
    this.api = api;
  }
  async fetchScheduledEvents(startTime, endTime, user) {
    const start = formatDate(startTime);
    const end = formatDate(endTime);
    let result = await this.api.getScheduledEvents(start, end, user == null ? void 0 : user.resource_uri);
    let scheduledEvents = result.collection.reduce((arr, e) => {
      if (e.calendar_event) {
        arr.push(ScheduledEvent.fromApi(e));
      }
      return arr;
    }, Array());
    let pagination = result.pagination;
    while (pagination.next_page_token) {
      result = await this.api.getScheduledEvents(start, end, user == null ? void 0 : user.resource_uri, {
        pageToken: pagination.next_page_token
      });
      scheduledEvents = result.collection.reduce((arr, e) => {
        if (e.calendar_event) {
          arr.push(ScheduledEvent.fromApi(e));
        }
        return arr;
      }, scheduledEvents);
      pagination = result.pagination;
    }
    const localScheduledEvents = await this.get();
    await this.set(localScheduledEvents.reduce((arr, e) => {
      if (e.start < start || e.start > end) {
        arr.push(e);
      } else {
        const idx = scheduledEvents.findIndex(e2 => e2.uuid === e.uuid);
        if (idx >= 0) {
          const evt = scheduledEvents.splice(idx, 1)[0];
          evt.eventType = e.eventType;
          evt.invitees = e.invitees;
          arr.push(evt);
        }
      }
      return arr;
    }, Array()).concat(scheduledEvents));
  }
  async fetchScheduledEvent(uuid, fetchInvitees) {
    const [event, invitees] = await Promise.all([this._fetchScheduledEvent(uuid), fetchInvitees ? this._fetchScheduledEventAndInvitees(uuid) : null]);
    if (!event) return;
    if (invitees) {
      event.invitees = invitees;
    }
    const localScheduledEvents = await this.get();
    const idx = localScheduledEvents.findIndex(e => e.uuid === uuid);
    if (idx >= 0) {
      localScheduledEvents.splice(idx, 1);
    }
    localScheduledEvents.push(event);
    await this.set(localScheduledEvents);
  }
  async _fetchScheduledEvent(uuid) {
    const result = await this.api.getScheduledEvent(uuid);
    if (!result.resource.calendar_event) return null;
    return ScheduledEvent.fromApi(result.resource);
  }
  async _fetchScheduledEventAndInvitees(uuid) {
    let result = await this.api.getScheduledEventInvitees(uuid, {
      status: 'active'
    });
    let invitees = result.collection.map(e => ScheduledEventInvitee.fromApi(e));
    let pagination = result.pagination;
    while (pagination.next_page_token) {
      result = await this.api.getScheduledEventInvitees(uuid, {
        status: 'active',
        pageToken: pagination.next_page_token
      });
      invitees = invitees.concat(result.collection.map(e => ScheduledEventInvitee.fromApi(e)));
      pagination = result.pagination;
    }
    return invitees;
  }
  async cleanup() {
    const now = luxon__WEBPACK_IMPORTED_MODULE_0__.DateTime.now().toUTC();
    const startOfMonth = now.startOf('month');
    const endOfMonth = now.endOf('month');
    const localScheduledEvents = await this.get();
    await this.set(localScheduledEvents.filter(e => luxon__WEBPACK_IMPORTED_MODULE_0__.DateTime.fromISO(e.start) >= startOfMonth && luxon__WEBPACK_IMPORTED_MODULE_0__.DateTime.fromISO(e.start) <= endOfMonth));
  }
  purge() {
    this.set([]);
  }
  async get() {
    const scheduledEvents = await this.storage.get('scheduled_events');
    if (Array.isArray(scheduledEvents)) {
      return scheduledEvents.map(e => ScheduledEvent.fromStorage(e));
    }
    return [];
  }
  async set(scheduledEvents) {
    return this.storage.set('scheduled_events', scheduledEvents.map(e => e.toStorage()));
  }
  addEventListener(listener) {
    this.storage.addListener(listener, 'scheduled_events');
  }
  removeEventListener(listener) {
    this.storage.removeListener(listener, 'scheduled_events');
  }
}

/**
 * Formats a date to the format expected by the Calendly API.
 * The API expects a date in the format of "YYYY-MM-DDTHH:mm:ss.SSSSSS[Z]"
 * which includes units smaller than milliseconds
 * (this is why we add 3 zeros at the end).
 *
 * @example
 * ```ts
 * const date = DateTime.fromISO('2020-01-03T01:00:00.123');
 * const formattedDate = formatDate(date);
 * console.log(formattedDate); // 2020-01-03T01:00:00.123000Z
 * ```
 *
 * @param date
 */
function formatDate(date) {
  return date.toUTC().toISO({
    includeOffset: false
  }) + '000Z';
}
const EventTypeEnum = Object.assign({}, _apiTypes__WEBPACK_IMPORTED_MODULE_1__.ApiEventTypePoolingType, _apiTypes__WEBPACK_IMPORTED_MODULE_1__.ApiEventTypeKind, _apiTypes__WEBPACK_IMPORTED_MODULE_1__.EventTypeType);
let EventTimeStatus = /*#__PURE__*/function (EventTimeStatus) {
  EventTimeStatus["past"] = "past";
  EventTimeStatus["inProgress"] = "inProgress";
  EventTimeStatus["future"] = "future";
  return EventTimeStatus;
}({});
class ScheduledEvent {
  constructor(args) {
    this.uuid = void 0;
    this.externalId = void 0;
    this.start = void 0;
    this.end = void 0;
    this.name = void 0;
    this.initialLoad = void 0;
    this.status = void 0;
    this.uri = void 0;
    this.eventType = void 0;
    this.inviteesCounter = void 0;
    this.invitees = void 0;
    this.memberships = void 0;
    this.guests = void 0;
    this.location = void 0;
    this.internalConflictEventUuids = void 0;
    this.meeting_notes_plain = void 0;
    this.meeting_notes_html = void 0;
    this.uuid = args.uuid;
    this.externalId = args.externalId;
    this.start = args.start;
    this.end = args.end;
    this.status = args.status;
    this.name = args.name;
    this.uri = args.uri;
    this.eventType = args.eventType;
    this.inviteesCounter = args.inviteesCounter;
    this.internalConflictEventUuids = args.internalConflictEventUuids;
    this.invitees = args.invitees || [];
    this.memberships = args.memberships || [];
    this.guests = args.guests || [];
    this.initialLoad = args.initialLoad || false;
    this.location = args.location;
    this.meeting_notes_plain = args.meeting_notes_plain;
    this.meeting_notes_html = args.meeting_notes_html;
  }
  get eventTypeType() {
    if (!this.eventType) return null;
    if (this.eventType.type === _apiTypes__WEBPACK_IMPORTED_MODULE_1__.ApiEventTypeType.AdhocEventType) {
      if (this.eventType.kind === _apiTypes__WEBPACK_IMPORTED_MODULE_1__.ApiEventTypeKind.Solo) {
        return _apiTypes__WEBPACK_IMPORTED_MODULE_1__.EventTypeType.OneOff;
      } else {
        return _apiTypes__WEBPACK_IMPORTED_MODULE_1__.EventTypeType.Poll;
      }
    }
    if (this.eventType.poolingType) {
      return this.eventType.poolingType;
    }
    return this.eventType.kind;
  }
  get eventTypeTypeDescription() {
    if (!this.eventType) {
      return null;
    }
    switch (this.eventTypeType) {
      case 'solo':
        return 'One-on-one';
      case 'one_off':
        return 'One-off meeting';
      case 'poll':
        return 'Meeting poll';
      default:
        return this.eventType.kindDescription;
    }
  }
  get isCanceled() {
    return this.status === 'canceled';
  }
  get timeStatus() {
    const now = luxon__WEBPACK_IMPORTED_MODULE_0__.DateTime.now();
    if (luxon__WEBPACK_IMPORTED_MODULE_0__.DateTime.fromISO(this.end) <= now) return EventTimeStatus.past;
    if (luxon__WEBPACK_IMPORTED_MODULE_0__.DateTime.fromISO(this.start) > now) return EventTimeStatus.future;
    return EventTimeStatus.inProgress;
  }
  static fromApi(event, initialLoad = false) {
    var _event$calendar_event, _event$invitees, _event$event_membersh, _event$event_guests;
    return new ScheduledEvent({
      uuid: event.uuid,
      externalId: (_event$calendar_event = event.calendar_event) == null ? void 0 : _event$calendar_event.external_id,
      start: event.start_time,
      end: event.end_time,
      status: event.status,
      initialLoad,
      name: event.name,
      uri: event.uri,
      eventType: event.event_type ? {
        uuid: event.event_type.uuid,
        name: event.event_type.name,
        type: event.event_type.type,
        kind: event.event_type.kind,
        kindDescription: event.event_type.kind_description,
        poolingType: event.event_type.pooling_type,
        color: event.event_type.color,
        bookingMethod: event.event_type.booking_method,
        schedulingUrl: event.event_type.scheduling_url
      } : undefined,
      inviteesCounter: {
        total: event.invitees_counter.total,
        active: event.invitees_counter.active,
        limit: event.invitees_counter.limit
      },
      invitees: (_event$invitees = event.invitees) == null ? void 0 : _event$invitees.map(i => ScheduledEventInvitee.fromApi(i)),
      memberships: (_event$event_membersh = event.event_memberships) == null ? void 0 : _event$event_membersh.map(m => ScheduledEventMembership.fromApi(m)),
      guests: (_event$event_guests = event.event_guests) == null ? void 0 : _event$event_guests.map(g => ScheduledEventGuest.fromApi(g)),
      location: ScheduledEventLocation.fromApi(event.location),
      internalConflictEventUuids: event.internal_conflict_event_uuids,
      meeting_notes_html: event.meeting_notes_html,
      meeting_notes_plain: event.meeting_notes_plain
    });
  }
  static fromStorage(event) {
    var _event$k, _event$l;
    return new ScheduledEvent({
      uuid: event.a,
      externalId: event.b,
      start: event.c,
      end: event.d,
      status: event.f,
      uri: event.g,
      eventType: event.h ? {
        uuid: event.h.a,
        name: event.h.b,
        type: event.h.c,
        kind: event.h.d,
        kindDescription: event.h.e,
        poolingType: event.h.f,
        color: event.h.g,
        bookingMethod: event.h.h,
        schedulingUrl: event.h.i
      } : undefined,
      inviteesCounter: {
        total: event.i.a,
        active: event.i.b,
        limit: event.i.c
      },
      invitees: event.j.map(i => ScheduledEventInvitee.fromStorage(i)),
      memberships: (_event$k = event.k) == null ? void 0 : _event$k.map(m => ScheduledEventMembership.fromStorage(m)),
      guests: (_event$l = event.l) == null ? void 0 : _event$l.map(g => ScheduledEventGuest.fromStorage(g)),
      location: event.m,
      internalConflictEventUuids: event.n,
      meeting_notes_html: event.o,
      meeting_notes_plain: event.p
    });
  }
  toStorage() {
    return {
      a: this.uuid,
      b: this.externalId,
      c: this.start,
      d: this.end,
      f: this.status,
      g: this.uri,
      h: this.eventType ? {
        a: this.eventType.uuid,
        b: this.eventType.name,
        c: this.eventType.type,
        d: this.eventType.kind,
        e: this.eventType.kindDescription,
        f: this.eventType.poolingType,
        g: this.eventType.color,
        h: this.eventType.bookingMethod,
        i: this.eventType.schedulingUrl
      } : undefined,
      i: {
        a: this.inviteesCounter.total,
        b: this.inviteesCounter.active,
        c: this.inviteesCounter.limit
      },
      j: this.invitees.map(i => i.toStorage()),
      k: this.memberships.map(m => m.toStorage()),
      l: this.guests.map(g => g.toStorage()),
      m: this.location,
      n: this.internalConflictEventUuids,
      o: this.meeting_notes_html,
      p: this.meeting_notes_plain
    };
  }
}
class ScheduledEventInvitee {
  constructor({
    uuid,
    uri,
    email,
    name,
    timezone,
    status,
    rescheduled,
    rescheduleUrl,
    cancelUrl,
    cancellation,
    created_at,
    payment,
    questions_and_answers,
    no_show,
    invitee_scheduled_by
  }) {
    this.uuid = void 0;
    this.uri = void 0;
    this.email = void 0;
    this.name = void 0;
    this.timezone = void 0;
    this.status = void 0;
    this.rescheduled = void 0;
    this.rescheduleUrl = void 0;
    this.cancelUrl = void 0;
    this.cancellation = void 0;
    this.created_at = void 0;
    this.payment = void 0;
    this.questions_and_answers = void 0;
    this.no_show = void 0;
    this.invitee_scheduled_by = void 0;
    this.uuid = uuid;
    this.uri = uri;
    this.email = email;
    this.name = name;
    this.timezone = timezone;
    this.status = status;
    this.rescheduled = rescheduled;
    this.rescheduleUrl = rescheduleUrl;
    this.cancelUrl = cancelUrl;
    this.cancellation = cancellation;
    this.created_at = created_at;
    this.payment = payment;
    this.questions_and_answers = questions_and_answers;
    this.no_show = no_show;
    this.invitee_scheduled_by = invitee_scheduled_by;
  }
  static fromApi(event) {
    return new ScheduledEventInvitee({
      uuid: event.uuid,
      uri: event.uri,
      email: event.email,
      name: event.name,
      timezone: event.timezone,
      status: event.status,
      rescheduled: event.rescheduled,
      rescheduleUrl: event.reschedule_url,
      cancelUrl: event.cancel_url,
      cancellation: event.cancellation,
      created_at: event.created_at,
      payment: event.payment,
      questions_and_answers: event.questions_and_answers,
      no_show: event.no_show,
      invitee_scheduled_by: event.invitee_scheduled_by
    });
  }
  static fromStorage(event) {
    return new ScheduledEventInvitee({
      uuid: event.a,
      email: event.b,
      name: event.c,
      status: event.d,
      rescheduled: event.e,
      rescheduleUrl: event.f,
      timezone: event.g,
      created_at: event.h,
      payment: event.i,
      questions_and_answers: event.j,
      uri: event.k,
      no_show: event.l,
      invitee_scheduled_by: event.m
    });
  }
  toStorage() {
    return {
      a: this.uuid,
      b: this.email,
      c: this.name,
      d: this.status,
      e: this.rescheduled,
      f: this.rescheduleUrl,
      g: this.timezone,
      h: this.created_at,
      i: this.payment,
      j: this.questions_and_answers,
      k: this.uri,
      l: this.no_show,
      m: this.invitee_scheduled_by
    };
  }
}
class ScheduledEventMembership {
  constructor({
    user,
    email
  }) {
    this.user = void 0;
    this.email = void 0;
    this.user = user;
    this.email = email;
  }
  static fromApi(membership) {
    return new ScheduledEventMembership({
      user: membership.user,
      email: membership.user_email
    });
  }
  static fromStorage(membership) {
    return new ScheduledEventMembership({
      user: membership.a,
      email: membership.b
    });
  }
  toStorage() {
    return {
      a: this.user,
      b: this.email
    };
  }
}
class ScheduledEventGuest {
  constructor({
    email
  }) {
    this.email = void 0;
    this.email = email;
  }
  static fromApi(guest) {
    return new ScheduledEventGuest({
      email: guest.email
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromStorage(guest) {
    return new ScheduledEventGuest({
      email: guest.a
    });
  }
  toStorage() {
    return {
      a: this.email
    };
  }
}
class ScheduledEventLocation {
  constructor({
    join_url,
    status,
    type,
    location,
    data,
    additional_info
  }) {
    this.join_url = void 0;
    this.status = void 0;
    this.type = void 0;
    this.location = void 0;
    this.data = void 0;
    this.additional_info = void 0;
    this.join_url = join_url || null;
    this.status = status || null;
    this.type = type;
    this.location = location || undefined;
    this.data = data || {};
    this.additional_info = additional_info;
  }
  static fromApi(location) {
    return new ScheduledEventLocation(location);
  }
  static fromStorage(location) {
    return new ScheduledEventLocation({
      join_url: location.b,
      status: location.c,
      type: location.d,
      location: location.e,
      data: location.f,
      additional_info: location.g
    });
  }
  toStorage() {
    return {
      b: this.join_url,
      c: this.status,
      d: this.type,
      e: this.location,
      f: this.data,
      g: this.additional_info
    };
  }
}

/***/ }),

/***/ "../../libs/platform/src/lib/errorManager.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ErrorManager: () => (/* binding */ ErrorManager)
/* harmony export */ });
/* harmony import */ var _airbrake_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@airbrake/browser/esm/index.js");
/// <reference types="user-agent-data-types" />

class ErrorManager {
  constructor(env, info, calendlyApi, user) {
    this.notifier = void 0;
    this.userAgentData = void 0;
    this.ignoredErrors = null;
    this.env = env;
    this.info = info;
    this.calendlyApi = calendlyApi;
    this.user = user;
    // we can't initialize it here because that would enable it on content scripts as well
    // so we need to call init() wherever we want it enabled
    this.getIgnoredErrors();
  }
  noisyNotice(notice) {
    if (notice.errors) {
      const errorMessage = notice.errors[0].message;
      if (errorMessage === 'Could not establish connection. Receiving end does not exist.') {
        return true;
      } else if (this.ignoredErrorMessages.some(item => errorMessage && errorMessage.includes(item))) {
        return true;
      }
    }
    return false;
  }
  init(user) {
    var _this$user;
    if ((user == null ? void 0 : user.email) !== ((_this$user = this.user) == null ? void 0 : _this$user.email) || !this.notifier && this.env.airbrakeId && this.env.airbrakeKey) {
      this.handleUserAgentData();
      this.notifier = new _airbrake_browser__WEBPACK_IMPORTED_MODULE_0__.Notifier({
        projectId: this.env.airbrakeId,
        projectKey: this.env.airbrakeKey,
        environment: this.env.environment
      });
      this.notifier.addFilter(notice => {
        notice.context.component = this.info.name;
        notice.context.version = this.info.version;
        if (navigator.userAgent) {
          notice.context.userAgent = navigator.userAgent;
        }
        if (this.userAgentData) {
          // using a different name to avoid conflicts if Airbrake starts using this property
          notice.context.userAgentCustom = this.userAgentData;
        }
        notice.context.user = {
          id: user == null ? void 0 : user.id,
          tier: user == null ? void 0 : user.tier,
          orgId: user == null ? void 0 : user.current_organization_id
        };
        if (!this.noisyNotice(notice)) {
          return notice;
        } else {
          console.warn('Filtering notice: ', notice);
          return null;
        }
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  notify(error, user) {
    this.init(user);
    if (this.notifier) {
      this.notifier.notify(error);
    } else {
      console.error(error);
    }
  }
  handleUserAgentData() {
    if (navigator.userAgentData) {
      const chromiumVersion = this.getChromiumVersion(navigator.userAgentData.brands);
      const brandData = this.getBrandData(navigator.userAgentData.brands);
      this.userAgentData = {
        platform: navigator.userAgentData.platform,
        chromiumVersion,
        brand: (brandData == null ? void 0 : brandData.brand) || 'Chromium',
        brandVersion: (brandData == null ? void 0 : brandData.brandVersion) || `Chromium ${chromiumVersion}`
      };
    }
  }
  getChromiumVersion(brands) {
    var _brands$find;
    return brands == null || (_brands$find = brands.find(b => b.brand.toLowerCase() === 'chromium')) == null ? void 0 : _brands$find.version;
  }
  getBrandData(brands) {
    return brands == null ? void 0 : brands.reduce((acc, b, i) => {
      const lowerBrand = b.brand.toLowerCase();
      if (lowerBrand !== 'chromium' && !(lowerBrand.includes('not') && lowerBrand.includes('brand'))) {
        if (acc.brand.length > 0) {
          acc.brand += '; ';
          acc.brandVersion += '; ';
        }
        acc.brand += b.brand;
        acc.brandVersion += `${b.brand} ${b.version}`;
      }
      return acc;
    }, {
      brand: '',
      brandVersion: ''
    });
  }
  async getIgnoredErrors() {
    if (!this.ignoredErrors) {
      try {
        const errorMessages = await this.calendlyApi.getErrorMessages();
        const items = [];
        if (errorMessages != null && errorMessages['errors']) {
          errorMessages['errors'].forEach(item => {
            if (item.message) {
              items.push(item);
            }
          });
        }
        this.ignoredErrors = items;
      } catch (e) {
        this.ignoredErrors = [];
      }
    }
  }
  get ignoredErrorMessages() {
    if (!this.ignoredErrors) {
      return [];
    }
    return this.ignoredErrors.map(item => item.message);
  }
}

/***/ }),

/***/ "../../libs/platform/src/lib/flow.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isProxiedFlow: () => (/* binding */ isProxiedFlow)
/* harmony export */ });
function isProxiedFlow(arg) {
  return typeof arg === 'object' && arg !== null && arg['action'] === 'proxy_flow';
}

/***/ }),

/***/ "../../libs/platform/src/lib/network.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BearerAuthedRequest: () => (/* binding */ BearerAuthedRequest),
/* harmony export */   MakeFormDataRequest: () => (/* binding */ MakeFormDataRequest),
/* harmony export */   MakeJsonRequest: () => (/* binding */ MakeJsonRequest),
/* harmony export */   VersionedRequest: () => (/* binding */ VersionedRequest),
/* harmony export */   isProxiedRequest: () => (/* binding */ isProxiedRequest)
/* harmony export */ });
function isProxiedRequest(arg) {
  return typeof arg === 'object' && arg !== null && arg['action'] === 'proxy_request';
}
async function VersionedRequest(info, input, init, signal) {
  const req = new Request(input, Object.assign({}, init, {
    signal
  }));
  req.headers.append('Calendly-Client-ID', `${info.name}-${info.version}`);
  return req;
}
async function BearerAuthedRequest(info, tokenData, onTokenChange, settings, oauth, input, init, signal) {
  const req = new Request(input, Object.assign({}, init, {
    signal
  }));
  const ensuredToken = await oauth.ensureToken(info, tokenData, settings);
  const token = ensuredToken == null ? void 0 : ensuredToken.access_token;
  if (token) {
    req.headers.append('Authorization', `Bearer ${token}`);
  }
  if (tokenData !== ensuredToken && ensuredToken) {
    onTokenChange(ensuredToken);
  }
  return req;
}
function MakeFormDataRequest(url, data, method, credentials) {
  const bodyData = new URLSearchParams();
  Object.keys(data).forEach(key => {
    const value = data[key];
    if (Array.isArray(value)) {
      value.forEach(item => {
        bodyData.append(key, item);
      });
    } else {
      bodyData.append(key, String(value));
    }
  });
  return new Request(url, {
    method,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: bodyData,
    credentials: credentials || 'omit'
  });
}
function MakeJsonRequest(url, data, method, credentials) {
  return new Request(url, {
    method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: credentials || 'omit'
  });
}

/***/ }),

/***/ "../../libs/platform/src/lib/oauthGenericPKCE.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OAuthGenericPKCE: () => (/* binding */ OAuthGenericPKCE)
/* harmony export */ });
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/buffer/index.js");
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/qs/lib/index.js");
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(qs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _network__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../libs/platform/src/lib/network.ts");



class OAuthGenericPKCE {
  constructor() {
    this.tokenRefreshPromises = new Map();
    this.tokenExpirationBuffer = 60;
  }
  // seconds

  async createAuthorizeUri(params) {
    const nonce = this.randomBase64Url({
      byteLength: 32
    });
    const state = this.randomBase64Url({
      byteLength: 32
    });
    const codeVerifier = this.randomBase64Url({
      byteLength: 32
    });
    const code_challenge = await this.codeChallenge(codeVerifier);
    const requestParams = this.makeParams({
      response_type: 'code',
      client_id: params.clientId,
      redirect_uri: params.redirectUri,
      state,
      code_challenge,
      nonce,
      code_challenge_method: 'S256'
    });
    return {
      uri: `${this.authorizeUri(params.host)}${requestParams}`,
      state,
      nonce,
      codeVerifier
    };
  }
  async upgradeAuthorizationCode(info, params) {
    if (params.state !== params.stateParam) {
      throw new Error(`Unable to verify state during Authorization code redirect - Expected ${params.state}, Got ${params.stateParam}`);
    }
    const data = {
      grant_type: 'authorization_code',
      code: params.codeParam,
      redirect_uri: params.redirectUri,
      client_id: params.clientId,
      code_verifier: params.codeVerifier
    };
    let request = (0,_network__WEBPACK_IMPORTED_MODULE_2__.MakeFormDataRequest)(this.tokenUri(params.host), data, 'POST');
    request = await (0,_network__WEBPACK_IMPORTED_MODULE_2__.VersionedRequest)(info, request);
    const response = await fetch(request);
    const token = await response.json();
    return token;
  }
  async upgradeRefreshToken(info, params) {
    const data = {
      grant_type: 'refresh_token',
      client_id: params.clientId,
      refresh_token: params.refreshToken
    };
    let request = (0,_network__WEBPACK_IMPORTED_MODULE_2__.MakeFormDataRequest)(this.tokenUri(params.host), data, 'POST');
    request = await (0,_network__WEBPACK_IMPORTED_MODULE_2__.VersionedRequest)(info, request);
    try {
      const response = await fetch(request);
      if (!response.ok) {
        throw new Error(`Failed to refresh token: ${response.status} ${response.statusText}`);
      }
      const token = await response.json();
      return token;
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw error;
    }
  }
  async ensureToken(info, token, settings) {
    if (token === null) {
      return null;
    }
    const refreshToken = token.refresh_token;
    if (this.tokenRefreshPromises.has(refreshToken)) {
      // If a token refresh is already in progress, return the ongoing promise
      return this.tokenRefreshPromises.get(refreshToken) || null;
    }
    if (!this.hasExpired(token)) {
      return token;
    }
    const refreshPromise = this.upgradeRefreshToken(info, {
      host: settings.apiHost,
      clientId: settings.oauthClientId,
      refreshToken: token.refresh_token
    }).finally(() => {
      // Clear the token refresh promise once the refresh is complete
      this.tokenRefreshPromises.delete(refreshToken);
    });
    this.tokenRefreshPromises.set(refreshToken, refreshPromise);
    return refreshPromise;
  }

  // PRIVATE

  crypto() {
    if (typeof window !== 'undefined') {
      return window.crypto;
    } else {
      // eslint-disable-next-line no-restricted-globals
      return self.crypto;
    }
  }
  authorizeUri(host) {
    return `${host}/oauth/authorize`;
  }
  tokenUri(host) {
    return `${host}/oauth/token`;
  }
  async codeChallenge(codeVerifier) {
    const data = buffer__WEBPACK_IMPORTED_MODULE_0__.Buffer.from(codeVerifier);
    const digest = await this.crypto().subtle.digest('SHA-256', data);
    return this.base64Url(buffer__WEBPACK_IMPORTED_MODULE_0__.Buffer.from(digest).toString('base64'));
  }
  base64Url(base64) {
    return base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  }
  randomBase64Url({
    byteLength
  }) {
    const array = new Uint8Array(byteLength);
    this.crypto().getRandomValues(array);
    return this.base64Url(buffer__WEBPACK_IMPORTED_MODULE_0__.Buffer.from(array).toString('base64'));
  }
  makeParams(hash) {
    return `?${qs__WEBPACK_IMPORTED_MODULE_1___default().stringify(hash)}`;
  }
  hasExpired(tokenData) {
    return Date.now() - (tokenData.created_at + tokenData.expires_in - this.tokenExpirationBuffer) * 1000 > 0;
  }
}

/***/ }),

/***/ "../../libs/platform/src/lib/session/index.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SessionManager: () => (/* binding */ SessionManager)
/* harmony export */ });
class SessionManager {
  constructor(storage) {
    this.defaultSession = {
      sidebarBrowserTabId: null
    };
    this.storage = storage;
  }
  async get() {
    const storedString = (await this.storage.get('user_session')) || '{}';
    const stored = JSON.parse(storedString);
    return Object.assign({}, this.defaultSession, stored);
  }
  async set(session) {
    const current = await this.get();
    const stored = JSON.stringify(Object.assign({}, current, session));
    await this.storage.set('user_session', stored);
  }

  // TODO - consider limiting event triggers here to only changes for the session key in storage
  // currently it will trigger for any storage change event
  addEventListener(listener) {
    this.storage.addListener(listener);
  }
  removeEventListener(listener) {
    this.storage.removeListener(listener);
  }
}

/***/ }),

/***/ "../../libs/platform/src/lib/settings/index.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SettingsManager: () => (/* binding */ SettingsManager),
/* harmony export */   educationVersion: () => (/* binding */ educationVersion)
/* harmony export */ });
const educationVersion = 2;
class SettingsManager {
  constructor(defaultEnv, defaultConfig, storage) {
    this.defaultSettings = void 0;
    this.defaultEnv = defaultEnv;
    this.defaultConfig = defaultConfig;
    this.storage = storage;
    this.defaultSettings = Object.assign({}, this.defaultEnv, this.defaultConfig);
  }
  async get() {
    const storedString = (await this.storage.get('calendly_settings')) || '{}';
    const stored = JSON.parse(storedString);
    const educationValues = {
      educatedVersion: 0,
      educationStep: 1,
      educationExistingUser: false,
      educationDismissedIntegrationsNewBadge: false,
      educationDismissedIntegrationsGcalNewBadge: false
    };
    if (stored.educated && !stored.educatedVersion) {
      educationValues.educatedVersion = 1;
      educationValues.educationStep = 2;
      educationValues.educationExistingUser = true;
    }
    return Object.assign({}, this.defaultSettings, educationValues, stored);
  }
  async set(config) {
    const current = await this.get();
    const stored = JSON.stringify(Object.assign({}, current, config));
    await this.storage.set('calendly_settings', stored);
  }
  addEventListener(listener) {
    this.storage.addListener(listener);
  }
  removeEventListener(listener) {
    this.storage.removeListener(listener);
  }
}

/***/ }),

/***/ "../../libs/types/src/index.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AnalyticsEvent: () => (/* reexport safe */ _lib_analytics_types__WEBPACK_IMPORTED_MODULE_1__.AnalyticsEvent),
/* harmony export */   Component: () => (/* reexport safe */ _lib_types__WEBPACK_IMPORTED_MODULE_0__.Component),
/* harmony export */   ComponentAction: () => (/* reexport safe */ _lib_types__WEBPACK_IMPORTED_MODULE_0__.ComponentAction),
/* harmony export */   EventTypeFilter: () => (/* reexport safe */ _lib_types__WEBPACK_IMPORTED_MODULE_0__.EventTypeFilter),
/* harmony export */   LocationType: () => (/* reexport safe */ _lib_types__WEBPACK_IMPORTED_MODULE_0__.LocationType),
/* harmony export */   MeasureEvent: () => (/* reexport safe */ _lib_types__WEBPACK_IMPORTED_MODULE_0__.MeasureEvent)
/* harmony export */ });
/* harmony import */ var _lib_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../libs/types/src/lib/types.ts");
/* harmony import */ var _lib_analytics_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../libs/types/src/lib/analytics.types.ts");



/***/ }),

/***/ "../../libs/types/src/lib/analytics.types.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AnalyticsEvent: () => (/* binding */ AnalyticsEvent)
/* harmony export */ });
let AnalyticsEvent = /*#__PURE__*/function (AnalyticsEvent) {
  AnalyticsEvent["GCalEventBarShown"] = "extension_user.event_bar_shown";
  AnalyticsEvent["GCalInviteeRescheduleClick"] = "extension_user.invitee_reschedule";
  AnalyticsEvent["GCalRescheduleClick"] = "extension_user.event_reschedule";
  AnalyticsEvent["GCalEventDetailsView"] = "extension_user.event_details_view";
  AnalyticsEvent["GMenuCopyLink"] = "extension_user.gmenu_et_copied";
  AnalyticsEvent["GMenuAddTimes"] = "extension_user.gmenu_add_times_to_email_click";
  AnalyticsEvent["GMenuToggleEventTypeList"] = "extension_user.gmenu_eventtypes";
  AnalyticsEvent["GMenuOpenOneOff"] = "extension_user.gmenu_one_off";
  AnalyticsEvent["GMenuOpenPoll"] = "extension_user.gmenu_poll";
  AnalyticsEvent["GMenuOpenAddTimes"] = "extension_user.gmenu_add_times";
  AnalyticsEvent["GMenuShowMoreEventTypes"] = "extension_user.gmenu_showmore_click";
  AnalyticsEvent["GMenuClose"] = "extension_user.gmenu_close";
  AnalyticsEvent["GMenuOpen"] = "extension_user.gmenu_open";
  AnalyticsEvent["GMenuOpenSidebar"] = "extension_user.gmenu_sidebar_open";
  AnalyticsEvent["GongOpen"] = "extension_user.gong_open";
  AnalyticsEvent["GongOpenSidebar"] = "extension_user.gong_sidebar_open";
  AnalyticsEvent["GongCopyLink"] = "extension_user.gong_et_copied";
  AnalyticsEvent["GongCopySUL"] = "extension_user.gong_sul_copied";
  AnalyticsEvent["GongAddTimes"] = "extension_user.gong_add_times_to_email_click";
  AnalyticsEvent["GongOpenOneOff"] = "extension_user.gong_one_off";
  AnalyticsEvent["GongOpenPoll"] = "extension_user.gong_poll";
  AnalyticsEvent["GongShowMoreEventTypes"] = "extension_user.gong_showmore_click";
  AnalyticsEvent["LinkedInCopyLink"] = "extension_user.linkedin_et_copied";
  AnalyticsEvent["LinkedInCopySUL"] = "extension_user.linkedin_sul_copied";
  AnalyticsEvent["LinkedInOpen"] = "extension_user.linkedin_open";
  AnalyticsEvent["LinkedInOpenOneOff"] = "extension_user.linkedin_one_off";
  AnalyticsEvent["LinkedInOpenPoll"] = "extension_user.linkedin_poll";
  AnalyticsEvent["LinkedInShowMoreEventTypes"] = "extension_user.linkedin_showmore_click";
  AnalyticsEvent["LinkedInShowPromptAllowAccess"] = "extension_user.linkedin_show_prompt_allow_access";
  AnalyticsEvent["LinkedInShowPromptDontAsk"] = "extension_user.linkedin_show_prompt_dont_ask";
  AnalyticsEvent["LinkedInShowPromptClose"] = "extension_user.linkedin_show_prompt_close";
  AnalyticsEvent["LinkedInShowPromptAccessGranted"] = "extension_user.linkedin_access_granted";
  AnalyticsEvent["LinkedInShowPromptAccessDenied"] = "extension_user.linkedin_access_denied";
  AnalyticsEvent["SidebarCopyLink"] = "extension_user.copy_link";
  AnalyticsEvent["SidebarCopySingleUseLink"] = "extension_user.copy_link";
  AnalyticsEvent["EventTypeEditLink"] = "extension_user.event_type_edit";
  AnalyticsEvent["EventTypePreviewLink"] = "extension_user.event_type_preview";
  AnalyticsEvent["EventTypeStar"] = "extension_user.event_type_star";
  AnalyticsEvent["EventTypeUnstar"] = "extension_user.event_type_unstar";
  AnalyticsEvent["TeamStar"] = "extension_user.team_star";
  AnalyticsEvent["TeamUnstar"] = "extension_user.team_unstar";
  AnalyticsEvent["SidebarOpen"] = "extension_user.load_sidebar";
  AnalyticsEvent["SidebarLogin"] = "extension_user.authentication";
  AnalyticsEvent["SidebarMenuHome"] = "extension_home.click";
  AnalyticsEvent["SidebarMenuScheduleMeetings"] = "extension_scheduled_meetings.click";
  AnalyticsEvent["SidebarMenuGetHelp"] = "extension_help_article.click";
  AnalyticsEvent["SidebarMenuSendFeedback"] = "extension_send_feedback.click";
  AnalyticsEvent["SidebarMenuLogout"] = "extension_logout.click";
  AnalyticsEvent["SidebarStarTab"] = "extension_user.switch_to_starred_tab";
  AnalyticsEvent["SidebarAllTab"] = "extension_user.switch_to_all_tab";
  AnalyticsEvent["SidebarIntegrationsTab"] = "extension_user.switch_to_integrations_tab";
  AnalyticsEvent["SidebarCancelEditInternalNote"] = "internal_note.client_cancel";
  AnalyticsEvent["SidebarSaveEditInternalNote"] = "internal_note.client_save";
  AnalyticsEvent["SidebarProfileMenuCopyLink"] = "extension_user.profile_copy_link";
  AnalyticsEvent["SidebarProfileMenuCreate"] = "extension_user.profile_create_event_type";
  AnalyticsEvent["SidebarEmailEmbedAttempt"] = "extension_email_embed.attempt";
  AnalyticsEvent["SidebarEmailEmbedSuccess"] = "extension_email_embed.success";
  AnalyticsEvent["SidebarEmailEmbedConfigure"] = "extension_email_embed.configure";
  AnalyticsEvent["Search"] = "extension_user.search";
  AnalyticsEvent["GlobalCreateEventType"] = "extension_user.global_create_event_type";
  AnalyticsEvent["GlobalCreateOneOff"] = "extension_user.global_create_oneoff";
  AnalyticsEvent["GlobalCreatePoll"] = "extension_user.global_create_poll";
  AnalyticsEvent["IntegrationsConfigure"] = "extension_integrations.configure";
  AnalyticsEvent["IntegrationsEnableAll"] = "extension_integrations.enable_all";
  AnalyticsEvent["IntegrationsEnableGcal"] = "extension_integrations.enable_gcal";
  AnalyticsEvent["IntegrationsDisableGcal"] = "extension_integrations.disable_gcal";
  AnalyticsEvent["IntegrationsEnableGmail"] = "extension_integrations.enable_gmail";
  AnalyticsEvent["IntegrationsDisableGmail"] = "extension_integrations.disable_gmail";
  AnalyticsEvent["IntegrationsEnableLinkedin"] = "extension_integrations.enable_linkedin";
  AnalyticsEvent["IntegrationsDisableLinkedin"] = "extension_integrations.disable_linkedin";
  AnalyticsEvent["IntegrationsEnableGong"] = "extension_integrations.enable_gong";
  AnalyticsEvent["IntegrationsDisableGong"] = "extension_integrations.disable_gong";
  AnalyticsEvent["EducationStep1Close"] = "extension_user.step1_close";
  AnalyticsEvent["EducationStep1Next"] = "extension_user.step1_next";
  AnalyticsEvent["EducationStep2Back"] = "extension_user.step2_back";
  AnalyticsEvent["EducationStep2GotIt"] = "extension_user.step2_got_it";
  AnalyticsEvent["BookOnBehalfStart"] = "book_on_behalf.start";
  AnalyticsEvent["BookOnBehalfETSelected"] = "book_on_behalf.event_type_selected";
  AnalyticsEvent["AgendaViewOpen"] = "extension_user.load_sidebar";
  AnalyticsEvent["AgendaViewSwitchTab"] = "extension_user.switch_tab";
  AnalyticsEvent["AgendaViewMeetingAction"] = "extension.meeting_action";
  AnalyticsEvent["SidebarMenuOpen"] = "extension_menu.click";
  AnalyticsEvent["ContactsManagementViewContact"] = "contact_management.user.viewed_contact";
  AnalyticsEvent["ContactsManagementFavoriteContact"] = "contact_management.user.favorited_contact";
  AnalyticsEvent["ContactsManagementCreateContact"] = "contact_management.user.created_contact";
  AnalyticsEvent["ContactsManagementUpdateContact"] = "contact_management.user.updated_contact";
  AnalyticsEvent["ContactsManagementRemoveContact"] = "contact_management.user.removed_contact";
  AnalyticsEvent["ProfileLinkPreview"] = "extension_user.profile_link_preview";
  AnalyticsEvent["FloatingButtonConfigure"] = "extension_user.floating_button_configure";
  AnalyticsEvent["KeywordDetectionShown"] = "extension_user.keyword_detection_shown";
  AnalyticsEvent["KeywordDetectionInteracted"] = "extension_user.keyword_detection_interacted";
  AnalyticsEvent["KeywordDetectionSettingsUpdated"] = "extension_user.keyword_detection_settings_updated";
  AnalyticsEvent["ShareAvailabilityStart"] = "extension_user_share_availability.start";
  AnalyticsEvent["FollowUpShare"] = "extension_user.follow_up_share";
  AnalyticsEvent["FollowUpEmail"] = "extension_user.follow_up_email";
  return AnalyticsEvent;
}({});

// eslint-disable-next-line @typescript-eslint/no-empty-interface

/***/ }),

/***/ "../../libs/types/src/lib/types.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Component: () => (/* binding */ Component),
/* harmony export */   ComponentAction: () => (/* binding */ ComponentAction),
/* harmony export */   EventTypeFilter: () => (/* binding */ EventTypeFilter),
/* harmony export */   LocationType: () => (/* binding */ LocationType),
/* harmony export */   MeasureEvent: () => (/* binding */ MeasureEvent)
/* harmony export */ });
/* eslint-disable @typescript-eslint/no-explicit-any */

let EventTypeFilter = /*#__PURE__*/function (EventTypeFilter) {
  EventTypeFilter["Starred"] = "starred";
  EventTypeFilter["All"] = "all";
  EventTypeFilter["Integrations"] = "integrations";
  return EventTypeFilter;
}({});
let MeasureEvent = /*#__PURE__*/function (MeasureEvent) {
  MeasureEvent["ToggleSidebarStart"] = "bg_sidebar_toggle_start";
  MeasureEvent["CloseSidebarStart"] = "bg_sidebar_close_start";
  return MeasureEvent;
}({});
let ComponentAction = /*#__PURE__*/function (ComponentAction) {
  ComponentAction["Open"] = "open";
  ComponentAction["Close"] = "close";
  ComponentAction["Toggle"] = "toggle";
  return ComponentAction;
}({});
let Component = /*#__PURE__*/function (Component) {
  Component["Adhoc"] = "adhoc";
  Component["Sidebar"] = "sidebar";
  Component["GMenu"] = "gmenu";
  Component["OneOff"] = "one_off";
  Component["Welcome"] = "welcome";
  Component["AddTimes"] = "add_times";
  Component["AgendaView"] = "agendaView";
  return Component;
}({});
let LocationType = /*#__PURE__*/function (LocationType) {
  LocationType["InPerson"] = "physical";
  LocationType["InBoundCall"] = "inbound_call";
  LocationType["OutboundCall"] = "outbound_call";
  LocationType["Custom"] = "custom";
  LocationType["Zoom"] = "zoom_conference";
  LocationType["MSTeams"] = "microsoft_teams_conference";
  LocationType["AskInvitee"] = "ask_invitee";
  LocationType["GoogleMeet"] = "google_conference";
  LocationType["GotoMeeting"] = "gotomeeting_conference";
  LocationType["Unknown"] = "unknown";
  LocationType["Placeholder"] = "placeholder";
  return LocationType;
}({});

/***/ }),

/***/ "../../libs/platform/src/lib/util/analyticsNodePatched.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_web_immediate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/core-js/modules/web.immediate.js");
/* harmony import */ var core_js_modules_web_immediate_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_immediate_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_esnext_global_this_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/core-js/modules/esnext.global-this.js");
/* harmony import */ var core_js_modules_esnext_global_this_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_global_this_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/core-js/modules/es.object.assign.js");
/* harmony import */ var core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_reduce_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../node_modules/core-js/modules/es.array.reduce.js");
/* harmony import */ var core_js_modules_es_array_reduce_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_reduce_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("../../node_modules/axios/lib/axios.js");
/* harmony import */ var axios_retry__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../node_modules/axios-retry/index.js");
/* harmony import */ var axios_retry__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(axios_retry__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var lodash_isstring__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../node_modules/lodash.isstring/index.js");
/* harmony import */ var lodash_isstring__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash_isstring__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var md5__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../../node_modules/md5/md5.js");
/* harmony import */ var md5__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(md5__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var ms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("../../node_modules/ms/index.js");
/* harmony import */ var ms__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(ms__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var remove_trailing_slash__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("../../node_modules/remove-trailing-slash/index.js");
/* harmony import */ var remove_trailing_slash__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(remove_trailing_slash__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("../../node_modules/uuid/dist/esm-browser/v4.js");












var version = '6.1.0';

// eslint-disable-next-line no-undef
var setImmediate = globalThis.setImmediate;
// eslint-disable-next-line @typescript-eslint/no-empty-function
var noop = function noop() {};
var AnalyticsNode = /*#__PURE__*/function () {
  /**
   * Initialize a new `Analytics` with your Segment project's `writeKey` and an
   * optional dictionary of `options`.
   *
   * @param {String} writeKey
   * @param {Object} [options] (optional)
   *   @property {Number} [flushAt] (default: 20)
   *   @property {Number} [flushInterval] (default: 10000)
   *   @property {String} [host] (default: 'https://api.segment.io')
   *   @property {Boolean} [enable] (default: true)
   *   @property {Object} [axiosConfig] (optional)
   *   @property {Object} [axiosInstance] (default: axios.create(options.axiosConfig))
   *   @property {Object} [axiosRetryConfig] (optional)
   *   @property {Number} [retryCount] (default: 3)
   *   @property {Function} [errorHandler] (optional)
   */

  function AnalyticsNode(writeKey, options) {
    options = options || {};
    this.queue = [];
    this.writeKey = writeKey;
    this.host = remove_trailing_slash__WEBPACK_IMPORTED_MODULE_9___default()(options.host || 'https://api.segment.io');
    this.path = remove_trailing_slash__WEBPACK_IMPORTED_MODULE_9___default()(options.path || '/v1/batch');
    var axiosInstance = options.axiosInstance;
    if (axiosInstance == null) {
      axiosInstance = axios__WEBPACK_IMPORTED_MODULE_10__["default"].create(options.axiosConfig);
    }
    this.axiosInstance = axiosInstance;
    this.timeout = options.timeout || false;
    this.flushAt = Math.max(options.flushAt, 1) || 20;
    this.maxQueueSize = options.maxQueueSize || 1024 * 450; // 500kb is the API limit, if we approach the limit i.e., 450kb, we'll flush
    this.flushInterval = options.flushInterval || 10000;
    this.flushed = false;
    this.errorHandler = options.errorHandler;
    Object.defineProperty(this, 'enable', {
      configurable: false,
      writable: false,
      enumerable: true,
      value: typeof options.enable === 'boolean' ? options.enable : true
    });
    if (options.retryCount !== 0) {
      axios_retry__WEBPACK_IMPORTED_MODULE_5___default()(this.axiosInstance, Object.assign({
        retries: options.retryCount || 3,
        retryDelay: axios_retry__WEBPACK_IMPORTED_MODULE_5__.exponentialDelay
      }, options.axiosRetryConfig, {
        // retryCondition is below optional config to ensure it does not get overridden
        retryCondition: this._isErrorRetryable
      }));
    }
  }
  var _proto = AnalyticsNode.prototype;
  _proto._validate = function _validate(message, type) {
    // do nothing
  }

  /**
   * Send an identify `message`.
   *
   * @param {Object} message
   * @param {Function} [callback] (optional)
   * @return {Analytics}
   */;
  _proto.identify = function identify(message, callback) {
    this._validate(message, 'identify');
    this.enqueue('identify', message, callback);
    return this;
  }

  /**
   * Send a group `message`.
   *
   * @param {Object} message
   * @param {Function} [callback] (optional)
   * @return {Analytics}
   */;
  _proto.group = function group(message, callback) {
    this._validate(message, 'group');
    this.enqueue('group', message, callback);
    return this;
  }

  /**
   * Send a track `message`.
   *
   * @param {Object} message
   * @param {Function} [callback] (optional)
   * @return {Analytics}
   */;
  _proto.track = function track(message, callback) {
    this._validate(message, 'track');
    this.enqueue('track', message, callback);
    return this;
  }

  /**
   * Send a page `message`.
   *
   * @param {Object} message
   * @param {Function} [callback] (optional)
   * @return {Analytics}
   */;
  _proto.page = function page(message, callback) {
    this._validate(message, 'page');
    this.enqueue('page', message, callback);
    return this;
  }

  /**
   * Send a screen `message`.
   *
   * @param {Object} message
   * @param {Function} [callback] (optional)
   * @return {Analytics}
   */;
  _proto.screen = function screen(message, callback) {
    this._validate(message, 'screen');
    this.enqueue('screen', message, callback);
    return this;
  }

  /**
   * Send an alias `message`.
   *
   * @param {Object} message
   * @param {Function} [callback] (optional)
   * @return {Analytics}
   */;
  _proto.alias = function alias(message, callback) {
    this._validate(message, 'alias');
    this.enqueue('alias', message, callback);
    return this;
  }

  /**
   * Add a `message` of type `type` to the queue and
   * check whether it should be flushed.
   *
   * @param {String} type
   * @param {Object} message
   * @param {Function} [callback] (optional)
   * @api private
   */;
  _proto.enqueue = function enqueue(type, message, callback) {
    callback = callback || noop;
    if (!this.enable) {
      return setImmediate(callback);
    }
    message = Object.assign({}, message);
    message.type = type;
    message.context = Object.assign({
      library: {
        name: 'analytics-node',
        version: version
      }
    }, message.context);
    if (!message.timestamp) {
      message.timestamp = new Date();
    }
    if (!message.messageId) {
      // We md5 the messaage to add more randomness. This is primarily meant
      // for use in the browser where the uuid package falls back to Math.random()
      // which is not a great source of randomness.
      // Borrowed from analytics.js (https://github.com/segment-integrations/analytics.js-integration-segmentio/blob/a20d2a2d222aeb3ab2a8c7e72280f1df2618440e/lib/index.js#L255-L256).
      message.messageId = "node-" + md5__WEBPACK_IMPORTED_MODULE_7___default()(JSON.stringify(message)) + "-" + (0,uuid__WEBPACK_IMPORTED_MODULE_11__["default"])();
    }

    // Historically this library has accepted strings and numbers as IDs.
    // However, our spec only allows strings. To avoid breaking compatibility,
    // we'll coerce these to strings if they aren't already.
    if (message.anonymousId && !lodash_isstring__WEBPACK_IMPORTED_MODULE_6___default()(message.anonymousId)) {
      message.anonymousId = JSON.stringify(message.anonymousId);
    }
    if (message.userId && !lodash_isstring__WEBPACK_IMPORTED_MODULE_6___default()(message.userId)) {
      message.userId = JSON.stringify(message.userId);
    }
    this.queue.push({
      message: message,
      callback: callback
    });
    if (!this.flushed) {
      this.flushed = true;
      this.flush();
      return;
    }
    var hasReachedFlushAt = this.queue.length >= this.flushAt;
    var hasReachedQueueSize = this.queue.reduce(function (acc, item) {
      return acc + JSON.stringify(item).length;
    }, 0) >= this.maxQueueSize;
    if (hasReachedFlushAt || hasReachedQueueSize) {
      this.flush();
      return;
    }
    if (this.flushInterval && !this.timer) {
      this.timer = setTimeout(this.flush.bind(this), this.flushInterval);
    }
  }

  /**
   * Flush the current queue
   *
   * @param {Function} [callback] (optional)
   * @return {Analytics}
   */;
  _proto.flush = function flush(callback) {
    var _this = this;
    callback = callback || noop;
    if (!this.enable) {
      setImmediate(callback);
      return Promise.resolve();
    }
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (!this.queue.length) {
      setImmediate(callback);
      return Promise.resolve();
    }
    var items = this.queue.splice(0, this.flushAt);
    var callbacks = items.map(function (item) {
      return item.callback;
    });
    var messages = items.map(function (item) {
      return item.message;
    });
    var data = {
      batch: messages,
      timestamp: new Date(),
      sentAt: new Date()
    };
    var done = function done(err) {
      setImmediate(function () {
        callbacks.forEach(function (callback) {
          return callback(err, data);
        });
        callback(err, data);
      });
    };

    // Don't set the user agent if we're on a browser. The latest spec allows
    // the User-Agent header (see https://fetch.spec.whatwg.org/#terminology-headers
    // and https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/setRequestHeader),
    // but browsers such as Chrome and Safari have not caught up.
    var headers = {};
    if (typeof window === 'undefined') {
      headers['user-agent'] = "analytics-node/" + version;
    }
    var req = {
      auth: {
        username: this.writeKey
      },
      headers: headers
    };
    if (this.timeout) {
      req.timeout = typeof this.timeout === 'string' ? ms__WEBPACK_IMPORTED_MODULE_8___default()(this.timeout) : this.timeout;
    }
    return this.axiosInstance.post("" + this.host + this.path, data, req).then(function () {
      done();
      return Promise.resolve(data);
    })["catch"](function (err) {
      if (typeof _this.errorHandler === 'function') {
        return _this.errorHandler(err);
      }
      if (err.response) {
        var error = new Error(err.response.statusText);
        done(error);
        throw error;
      }
      done(err);
      throw err;
    });
  };
  _proto._isErrorRetryable = function _isErrorRetryable(error) {
    // Retry Network Errors.
    if ((0,axios_retry__WEBPACK_IMPORTED_MODULE_5__.isNetworkError)(error)) {
      return true;
    }
    if (!error.response) {
      // Cannot determine if the request can be retried
      return false;
    }

    // Retry Server Errors (5xx).
    if (error.response.status >= 500 && error.response.status <= 599) {
      return true;
    }

    // Retry if rate limited.
    if (error.response.status === 429) {
      return true;
    }
    return false;
  };
  return AnalyticsNode;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AnalyticsNode);

/***/ }),

/***/ "?ce98":
/***/ (() => {

/* (ignored) */

/***/ })

}]);