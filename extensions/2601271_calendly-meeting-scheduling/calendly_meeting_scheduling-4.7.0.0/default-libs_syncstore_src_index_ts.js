"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["default-libs_syncstore_src_index_ts"],{

/***/ "../../libs/store/src/index.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BottomSheetType: () => (/* reexport safe */ _lib_slices_frames_framesSlice__WEBPACK_IMPORTED_MODULE_6__.BottomSheetType),
/* harmony export */   DataStoreContext: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.DataStoreContext),
/* harmony export */   DataStoreName: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.DataStoreName),
/* harmony export */   DataStoreVersion: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.DataStoreVersion),
/* harmony export */   DrawerType: () => (/* reexport safe */ _lib_slices_drawer_drawerSlice__WEBPACK_IMPORTED_MODULE_7__.DrawerType),
/* harmony export */   FeatureFlagName: () => (/* reexport safe */ _lib_slices_featureFlags_featureFlagsSlice__WEBPACK_IMPORTED_MODULE_9__.FeatureFlagName),
/* harmony export */   IntegrationId: () => (/* reexport safe */ _lib_slices_integrations_integrationsSlice__WEBPACK_IMPORTED_MODULE_8__.IntegrationId),
/* harmony export */   ModalType: () => (/* reexport safe */ _lib_slices_modal_modalSlice__WEBPACK_IMPORTED_MODULE_10__.ModalType),
/* harmony export */   PlatformMiddleware: () => (/* reexport safe */ _lib_middleware__WEBPACK_IMPORTED_MODULE_2__.PlatformMiddleware),
/* harmony export */   StoreNames: () => (/* reexport safe */ _lib_storeTypes__WEBPACK_IMPORTED_MODULE_3__.StoreNames),
/* harmony export */   UiStoreContext: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.UiStoreContext),
/* harmony export */   UiStoreName: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.UiStoreName),
/* harmony export */   UiStoreVersion: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.UiStoreVersion),
/* harmony export */   agendaFrameTabSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.agendaFrameTabSelector),
/* harmony export */   agendaViewTabSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.agendaViewTabSelector),
/* harmony export */   ascHasNextSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.ascHasNextSelector),
/* harmony export */   ascLoadingSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.ascLoadingSelector),
/* harmony export */   ascNextPageTokenSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.ascNextPageTokenSelector),
/* harmony export */   changeDefaultLegacyViewSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.changeDefaultLegacyViewSelector),
/* harmony export */   clearIntegrationNewStatusSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.clearIntegrationNewStatusSelector),
/* harmony export */   closeAllDrawersSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.closeAllDrawersSelector),
/* harmony export */   closeDrawerSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.closeDrawerSelector),
/* harmony export */   closeModalSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.closeModalSelector),
/* harmony export */   contactMeetingHistoryByEmailSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.contactMeetingHistoryByEmailSelector),
/* harmony export */   contactsByIdSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.contactsByIdSelector),
/* harmony export */   contactsCountSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.contactsCountSelector),
/* harmony export */   contactsSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.contactsSelector),
/* harmony export */   createAgendaSlice: () => (/* reexport safe */ _lib_slices_agenda_agendaSlice__WEBPACK_IMPORTED_MODULE_5__.createAgendaSlice),
/* harmony export */   createDrawerSlice: () => (/* reexport safe */ _lib_slices_drawer_drawerSlice__WEBPACK_IMPORTED_MODULE_7__.createDrawerSlice),
/* harmony export */   createFeatureFlagsSlice: () => (/* reexport safe */ _lib_slices_featureFlags_featureFlagsSlice__WEBPACK_IMPORTED_MODULE_9__.createFeatureFlagsSlice),
/* harmony export */   createFramesSlice: () => (/* reexport safe */ _lib_slices_frames_framesSlice__WEBPACK_IMPORTED_MODULE_6__.createFramesSlice),
/* harmony export */   createIntegrationsSlice: () => (/* reexport safe */ _lib_slices_integrations_integrationsSlice__WEBPACK_IMPORTED_MODULE_8__.createIntegrationsSlice),
/* harmony export */   createModalSlice: () => (/* reexport safe */ _lib_slices_modal_modalSlice__WEBPACK_IMPORTED_MODULE_10__.createModalSlice),
/* harmony export */   dataStateCreator: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.dataStateCreator),
/* harmony export */   defaultLegacyViewSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.defaultLegacyViewSelector),
/* harmony export */   defaultStore: () => (/* reexport safe */ _lib_store__WEBPACK_IMPORTED_MODULE_1__.defaultStore),
/* harmony export */   descHasNextSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.descHasNextSelector),
/* harmony export */   descLoadingSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.descLoadingSelector),
/* harmony export */   descNextPageTokenSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.descNextPageTokenSelector),
/* harmony export */   drawerStackSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.drawerStackSelector),
/* harmony export */   editInternalNoteSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.editInternalNoteSelector),
/* harmony export */   eventByIdSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.eventByIdSelector),
/* harmony export */   eventTypeByIdSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.eventTypeByIdSelector),
/* harmony export */   eventTypesSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.eventTypesSelector),
/* harmony export */   eventsCountSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.eventsCountSelector),
/* harmony export */   eventsGroupedByDateSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.eventsGroupedByDateSelector),
/* harmony export */   eventsSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.eventsSelector),
/* harmony export */   favoriteContactsSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.favoriteContactsSelector),
/* harmony export */   fetchContactMeetingHistorySelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.fetchContactMeetingHistorySelector),
/* harmony export */   fetchContactSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.fetchContactSelector),
/* harmony export */   fetchContactsSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.fetchContactsSelector),
/* harmony export */   fetchEventTypesSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.fetchEventTypesSelector),
/* harmony export */   fetchEventsSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.fetchEventsSelector),
/* harmony export */   fetchInitialContactsSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.fetchInitialContactsSelector),
/* harmony export */   fetchInitialDataSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.fetchInitialDataSelector),
/* harmony export */   fetchOnContactsSearchSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.fetchOnContactsSearchSelector),
/* harmony export */   fetchScheduledEventWithInvitees: () => (/* reexport safe */ _lib_slices_agenda_agendaSlice__WEBPACK_IMPORTED_MODULE_5__.fetchScheduledEventWithInvitees),
/* harmony export */   gmailLegacyBarSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.gmailLegacyBarSelector),
/* harmony export */   gmailPopoverComposeIdSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.gmailPopoverComposeIdSelector),
/* harmony export */   gmailShowingComposePopoverSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.gmailShowingComposePopoverSelector),
/* harmony export */   gongPopoverComposeIdSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.gongPopoverComposeIdSelector),
/* harmony export */   gongShowingComposePopoverSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.gongShowingComposePopoverSelector),
/* harmony export */   hasDataSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.hasDataSelector),
/* harmony export */   hasInternalConflictSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.hasInternalConflictSelector),
/* harmony export */   hasNewIntegrationsSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.hasNewIntegrationsSelector),
/* harmony export */   hasNextPageSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.hasNextPageSelector),
/* harmony export */   isDateBetween: () => (/* reexport safe */ _lib_slices_agenda_agendaSlice__WEBPACK_IMPORTED_MODULE_5__.isDateBetween),
/* harmony export */   isFilteredContactsListLoadingSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.isFilteredContactsListLoadingSelector),
/* harmony export */   isFrameRole: () => (/* reexport safe */ _lib_slices_frames_framesSlice__WEBPACK_IMPORTED_MODULE_6__.isFrameRole),
/* harmony export */   isInitialContactsLoadingSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.isInitialContactsLoadingSelector),
/* harmony export */   isInitialEventsLoadingSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.isInitialEventsLoadingSelector),
/* harmony export */   isLoadingContactsNextPageSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.isLoadingContactsNextPageSelector),
/* harmony export */   isLoadingEventTypesSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.isLoadingEventTypesSelector),
/* harmony export */   isRefetchingContactsSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.isRefetchingContactsSelector),
/* harmony export */   linkedinPopoverComposeIdSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.linkedinPopoverComposeIdSelector),
/* harmony export */   linkedinShowingComposePopoverSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.linkedinShowingComposePopoverSelector),
/* harmony export */   loginSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.loginSelector),
/* harmony export */   logoutSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.logoutSelector),
/* harmony export */   markEventTypeRecentlyUsedSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.markEventTypeRecentlyUsedSelector),
/* harmony export */   newIntegrationIdsSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.newIntegrationIdsSelector),
/* harmony export */   nextPageTokenSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.nextPageTokenSelector),
/* harmony export */   nextUpEventId: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.nextUpEventId),
/* harmony export */   openDrawerForTabSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.openDrawerForTabSelector),
/* harmony export */   openDrawerSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.openDrawerSelector),
/* harmony export */   openModalSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.openModalSelector),
/* harmony export */   openedModalSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.openedModalSelector),
/* harmony export */   organizationMembersSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.organizationMembersSelector),
/* harmony export */   profileByIdSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.profileByIdSelector),
/* harmony export */   profilesSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.profilesSelector),
/* harmony export */   recentlyUsedEventTypesSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.recentlyUsedEventTypesSelector),
/* harmony export */   refetchContactsSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.refetchContactsSelector),
/* harmony export */   replaceDrawerContentSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.replaceDrawerContentSelector),
/* harmony export */   setUserTokenSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.setUserTokenSelector),
/* harmony export */   toggleFavoriteContactSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.toggleFavoriteContactSelector),
/* harmony export */   toggleFavoriteEventTypeSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.toggleFavoriteEventTypeSelector),
/* harmony export */   toggleFavoriteProfileSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.toggleFavoriteProfileSelector),
/* harmony export */   toggleUnfavoriteContactSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.toggleUnfavoriteContactSelector),
/* harmony export */   topDrawerSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.topDrawerSelector),
/* harmony export */   uiStateCreator: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.uiStateCreator),
/* harmony export */   uiStore: () => (/* reexport safe */ _lib_store__WEBPACK_IMPORTED_MODULE_1__.uiStore),
/* harmony export */   updatePopoverDataSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.updatePopoverDataSelector),
/* harmony export */   useAgendaViewTab: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.useAgendaViewTab),
/* harmony export */   useCombinedStore: () => (/* reexport safe */ _lib_storeHooks__WEBPACK_IMPORTED_MODULE_4__.useCombinedStore),
/* harmony export */   useDataStore: () => (/* reexport safe */ _lib_storeHooks__WEBPACK_IMPORTED_MODULE_4__.useDataStore),
/* harmony export */   useUiStore: () => (/* reexport safe */ _lib_storeHooks__WEBPACK_IMPORTED_MODULE_4__.useUiStore),
/* harmony export */   userLoadedSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.userLoadedSelector),
/* harmony export */   userSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.userSelector),
/* harmony export */   userTokenSelector: () => (/* reexport safe */ _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__.userTokenSelector)
/* harmony export */ });
/* harmony import */ var _lib_sharedStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../libs/store/src/lib/sharedStore.ts");
/* harmony import */ var _lib_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../libs/store/src/lib/store.ts");
/* harmony import */ var _lib_middleware__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../libs/store/src/lib/middleware.ts");
/* harmony import */ var _lib_storeTypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../libs/store/src/lib/storeTypes.ts");
/* harmony import */ var _lib_storeHooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../libs/store/src/lib/storeHooks.ts");
/* harmony import */ var _lib_slices_agenda_agendaSlice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../libs/store/src/lib/slices/agenda/agendaSlice.ts");
/* harmony import */ var _lib_slices_frames_framesSlice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../libs/store/src/lib/slices/frames/framesSlice.ts");
/* harmony import */ var _lib_slices_drawer_drawerSlice__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../../libs/store/src/lib/slices/drawer/drawerSlice.ts");
/* harmony import */ var _lib_slices_integrations_integrationsSlice__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("../../libs/store/src/lib/slices/integrations/integrationsSlice.ts");
/* harmony import */ var _lib_slices_featureFlags_featureFlagsSlice__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("../../libs/store/src/lib/slices/featureFlags/featureFlagsSlice.ts");
/* harmony import */ var _lib_slices_modal_modalSlice__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("../../libs/store/src/lib/slices/modal/modalSlice.ts");












/***/ }),

/***/ "../../libs/store/src/lib/middleware.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlatformMiddleware: () => (/* binding */ PlatformMiddleware)
/* harmony export */ });
const PlatformMiddleware = create => (set, get, api) => {
  let options = {};
  api.platformMiddleware = {
    getPlatform: () => options,
    setPlatform: opts => {
      options = opts;
    }
  };
  const state = create(set, get, api);
  return state;
};

/***/ }),

/***/ "../../libs/store/src/lib/sharedStore.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DataStoreContext: () => (/* binding */ DataStoreContext),
/* harmony export */   DataStoreName: () => (/* binding */ DataStoreName),
/* harmony export */   DataStoreVersion: () => (/* binding */ DataStoreVersion),
/* harmony export */   UiStoreContext: () => (/* binding */ UiStoreContext),
/* harmony export */   UiStoreName: () => (/* binding */ UiStoreName),
/* harmony export */   UiStoreVersion: () => (/* binding */ UiStoreVersion),
/* harmony export */   agendaFrameTabSelector: () => (/* reexport safe */ _slices_frames_framesSelector__WEBPACK_IMPORTED_MODULE_20__.agendaFrameTabSelector),
/* harmony export */   agendaViewTabSelector: () => (/* reexport safe */ _slices_agenda_agendaSelectors__WEBPACK_IMPORTED_MODULE_13__.agendaViewTabSelector),
/* harmony export */   ascHasNextSelector: () => (/* reexport safe */ _slices_agenda_agendaSelectors__WEBPACK_IMPORTED_MODULE_13__.ascHasNextSelector),
/* harmony export */   ascLoadingSelector: () => (/* reexport safe */ _slices_agenda_agendaSelectors__WEBPACK_IMPORTED_MODULE_13__.ascLoadingSelector),
/* harmony export */   ascNextPageTokenSelector: () => (/* reexport safe */ _slices_agenda_agendaSelectors__WEBPACK_IMPORTED_MODULE_13__.ascNextPageTokenSelector),
/* harmony export */   changeDefaultLegacyViewSelector: () => (/* reexport safe */ _slices_settings_settingsSelectors__WEBPACK_IMPORTED_MODULE_18__.changeDefaultLegacyViewSelector),
/* harmony export */   clearIntegrationNewStatusSelector: () => (/* reexport safe */ _slices_integrations_integrationsSelectors__WEBPACK_IMPORTED_MODULE_19__.clearIntegrationNewStatusSelector),
/* harmony export */   closeAllDrawersSelector: () => (/* reexport safe */ _slices_drawer_drawerSelectors__WEBPACK_IMPORTED_MODULE_15__.closeAllDrawersSelector),
/* harmony export */   closeDrawerSelector: () => (/* reexport safe */ _slices_drawer_drawerSelectors__WEBPACK_IMPORTED_MODULE_15__.closeDrawerSelector),
/* harmony export */   closeModalSelector: () => (/* reexport safe */ _slices_modal_modalSelectors__WEBPACK_IMPORTED_MODULE_21__.closeModalSelector),
/* harmony export */   contactMeetingHistoryByEmailSelector: () => (/* reexport safe */ _slices_contacts_contactsSelectors__WEBPACK_IMPORTED_MODULE_16__.contactMeetingHistoryByEmailSelector),
/* harmony export */   contactsByIdSelector: () => (/* reexport safe */ _slices_contacts_contactsSelectors__WEBPACK_IMPORTED_MODULE_16__.contactsByIdSelector),
/* harmony export */   contactsCountSelector: () => (/* reexport safe */ _slices_contacts_contactsSelectors__WEBPACK_IMPORTED_MODULE_16__.contactsCountSelector),
/* harmony export */   contactsSelector: () => (/* reexport safe */ _slices_contacts_contactsSelectors__WEBPACK_IMPORTED_MODULE_16__.contactsSelector),
/* harmony export */   dataStateCreator: () => (/* binding */ dataStateCreator),
/* harmony export */   defaultLegacyViewSelector: () => (/* reexport safe */ _slices_settings_settingsSelectors__WEBPACK_IMPORTED_MODULE_18__.defaultLegacyViewSelector),
/* harmony export */   descHasNextSelector: () => (/* reexport safe */ _slices_agenda_agendaSelectors__WEBPACK_IMPORTED_MODULE_13__.descHasNextSelector),
/* harmony export */   descLoadingSelector: () => (/* reexport safe */ _slices_agenda_agendaSelectors__WEBPACK_IMPORTED_MODULE_13__.descLoadingSelector),
/* harmony export */   descNextPageTokenSelector: () => (/* reexport safe */ _slices_agenda_agendaSelectors__WEBPACK_IMPORTED_MODULE_13__.descNextPageTokenSelector),
/* harmony export */   drawerStackSelector: () => (/* reexport safe */ _slices_drawer_drawerSelectors__WEBPACK_IMPORTED_MODULE_15__.drawerStackSelector),
/* harmony export */   editInternalNoteSelector: () => (/* reexport safe */ _slices_eventTypes_eventTypesSelectors__WEBPACK_IMPORTED_MODULE_14__.editInternalNoteSelector),
/* harmony export */   eventByIdSelector: () => (/* reexport safe */ _slices_agenda_agendaSelectors__WEBPACK_IMPORTED_MODULE_13__.eventByIdSelector),
/* harmony export */   eventTypeByIdSelector: () => (/* reexport safe */ _slices_eventTypes_eventTypesSelectors__WEBPACK_IMPORTED_MODULE_14__.eventTypeByIdSelector),
/* harmony export */   eventTypesSelector: () => (/* reexport safe */ _slices_eventTypes_eventTypesSelectors__WEBPACK_IMPORTED_MODULE_14__.eventTypesSelector),
/* harmony export */   eventsCountSelector: () => (/* reexport safe */ _slices_agenda_agendaSelectors__WEBPACK_IMPORTED_MODULE_13__.eventsCountSelector),
/* harmony export */   eventsGroupedByDateSelector: () => (/* reexport safe */ _slices_agenda_agendaSelectors__WEBPACK_IMPORTED_MODULE_13__.eventsGroupedByDateSelector),
/* harmony export */   eventsSelector: () => (/* reexport safe */ _slices_agenda_agendaSelectors__WEBPACK_IMPORTED_MODULE_13__.eventsSelector),
/* harmony export */   favoriteContactsSelector: () => (/* reexport safe */ _slices_contacts_contactsSelectors__WEBPACK_IMPORTED_MODULE_16__.favoriteContactsSelector),
/* harmony export */   fetchContactMeetingHistorySelector: () => (/* reexport safe */ _slices_contacts_contactsSelectors__WEBPACK_IMPORTED_MODULE_16__.fetchContactMeetingHistorySelector),
/* harmony export */   fetchContactSelector: () => (/* reexport safe */ _slices_contacts_contactsSelectors__WEBPACK_IMPORTED_MODULE_16__.fetchContactSelector),
/* harmony export */   fetchContactsSelector: () => (/* reexport safe */ _slices_contacts_contactsSelectors__WEBPACK_IMPORTED_MODULE_16__.fetchContactsSelector),
/* harmony export */   fetchEventTypesSelector: () => (/* reexport safe */ _slices_eventTypes_eventTypesSelectors__WEBPACK_IMPORTED_MODULE_14__.fetchEventTypesSelector),
/* harmony export */   fetchEventsSelector: () => (/* reexport safe */ _slices_agenda_agendaSelectors__WEBPACK_IMPORTED_MODULE_13__.fetchEventsSelector),
/* harmony export */   fetchInitialContactsSelector: () => (/* reexport safe */ _slices_contacts_contactsSelectors__WEBPACK_IMPORTED_MODULE_16__.fetchInitialContactsSelector),
/* harmony export */   fetchInitialDataSelector: () => (/* reexport safe */ _slices_agenda_agendaSelectors__WEBPACK_IMPORTED_MODULE_13__.fetchInitialDataSelector),
/* harmony export */   fetchOnContactsSearchSelector: () => (/* reexport safe */ _slices_contacts_contactsSelectors__WEBPACK_IMPORTED_MODULE_16__.fetchOnContactsSearchSelector),
/* harmony export */   gmailLegacyBarSelector: () => (/* reexport safe */ _slices_integrations_integrationsSelectors__WEBPACK_IMPORTED_MODULE_19__.gmailLegacyBarSelector),
/* harmony export */   gmailPopoverComposeIdSelector: () => (/* reexport safe */ _slices_integrations_integrationsSelectors__WEBPACK_IMPORTED_MODULE_19__.gmailPopoverComposeIdSelector),
/* harmony export */   gmailShowingComposePopoverSelector: () => (/* reexport safe */ _slices_integrations_integrationsSelectors__WEBPACK_IMPORTED_MODULE_19__.gmailShowingComposePopoverSelector),
/* harmony export */   gongPopoverComposeIdSelector: () => (/* reexport safe */ _slices_integrations_integrationsSelectors__WEBPACK_IMPORTED_MODULE_19__.gongPopoverComposeIdSelector),
/* harmony export */   gongShowingComposePopoverSelector: () => (/* reexport safe */ _slices_integrations_integrationsSelectors__WEBPACK_IMPORTED_MODULE_19__.gongShowingComposePopoverSelector),
/* harmony export */   hasDataSelector: () => (/* reexport safe */ _slices_user_userSelectors__WEBPACK_IMPORTED_MODULE_17__.hasDataSelector),
/* harmony export */   hasInternalConflictSelector: () => (/* reexport safe */ _slices_agenda_agendaSelectors__WEBPACK_IMPORTED_MODULE_13__.hasInternalConflictSelector),
/* harmony export */   hasNewIntegrationsSelector: () => (/* reexport safe */ _slices_integrations_integrationsSelectors__WEBPACK_IMPORTED_MODULE_19__.hasNewIntegrationsSelector),
/* harmony export */   hasNextPageSelector: () => (/* reexport safe */ _slices_contacts_contactsSelectors__WEBPACK_IMPORTED_MODULE_16__.hasNextPageSelector),
/* harmony export */   isFilteredContactsListLoadingSelector: () => (/* reexport safe */ _slices_contacts_contactsSelectors__WEBPACK_IMPORTED_MODULE_16__.isFilteredContactsListLoadingSelector),
/* harmony export */   isInitialContactsLoadingSelector: () => (/* reexport safe */ _slices_contacts_contactsSelectors__WEBPACK_IMPORTED_MODULE_16__.isInitialContactsLoadingSelector),
/* harmony export */   isInitialEventsLoadingSelector: () => (/* reexport safe */ _slices_agenda_agendaSelectors__WEBPACK_IMPORTED_MODULE_13__.isInitialEventsLoadingSelector),
/* harmony export */   isLoadingContactsNextPageSelector: () => (/* reexport safe */ _slices_contacts_contactsSelectors__WEBPACK_IMPORTED_MODULE_16__.isLoadingContactsNextPageSelector),
/* harmony export */   isLoadingEventTypesSelector: () => (/* reexport safe */ _slices_eventTypes_eventTypesSelectors__WEBPACK_IMPORTED_MODULE_14__.isLoadingEventTypesSelector),
/* harmony export */   isRefetchingContactsSelector: () => (/* reexport safe */ _slices_contacts_contactsSelectors__WEBPACK_IMPORTED_MODULE_16__.isRefetchingContactsSelector),
/* harmony export */   linkedinPopoverComposeIdSelector: () => (/* reexport safe */ _slices_integrations_integrationsSelectors__WEBPACK_IMPORTED_MODULE_19__.linkedinPopoverComposeIdSelector),
/* harmony export */   linkedinShowingComposePopoverSelector: () => (/* reexport safe */ _slices_integrations_integrationsSelectors__WEBPACK_IMPORTED_MODULE_19__.linkedinShowingComposePopoverSelector),
/* harmony export */   loginSelector: () => (/* reexport safe */ _slices_user_userSelectors__WEBPACK_IMPORTED_MODULE_17__.loginSelector),
/* harmony export */   logoutSelector: () => (/* reexport safe */ _slices_user_userSelectors__WEBPACK_IMPORTED_MODULE_17__.logoutSelector),
/* harmony export */   markEventTypeRecentlyUsedSelector: () => (/* reexport safe */ _slices_eventTypes_eventTypesSelectors__WEBPACK_IMPORTED_MODULE_14__.markEventTypeRecentlyUsedSelector),
/* harmony export */   newIntegrationIdsSelector: () => (/* reexport safe */ _slices_integrations_integrationsSelectors__WEBPACK_IMPORTED_MODULE_19__.newIntegrationIdsSelector),
/* harmony export */   nextPageTokenSelector: () => (/* reexport safe */ _slices_contacts_contactsSelectors__WEBPACK_IMPORTED_MODULE_16__.nextPageTokenSelector),
/* harmony export */   nextUpEventId: () => (/* reexport safe */ _slices_agenda_agendaSelectors__WEBPACK_IMPORTED_MODULE_13__.nextUpEventId),
/* harmony export */   openDrawerForTabSelector: () => (/* reexport safe */ _slices_agenda_agendaSelectors__WEBPACK_IMPORTED_MODULE_13__.openDrawerForTabSelector),
/* harmony export */   openDrawerSelector: () => (/* reexport safe */ _slices_drawer_drawerSelectors__WEBPACK_IMPORTED_MODULE_15__.openDrawerSelector),
/* harmony export */   openModalSelector: () => (/* reexport safe */ _slices_modal_modalSelectors__WEBPACK_IMPORTED_MODULE_21__.openModalSelector),
/* harmony export */   openedModalSelector: () => (/* reexport safe */ _slices_modal_modalSelectors__WEBPACK_IMPORTED_MODULE_21__.openedModalSelector),
/* harmony export */   organizationMembersSelector: () => (/* reexport safe */ _slices_agenda_agendaSelectors__WEBPACK_IMPORTED_MODULE_13__.organizationMembersSelector),
/* harmony export */   profileByIdSelector: () => (/* reexport safe */ _slices_eventTypes_eventTypesSelectors__WEBPACK_IMPORTED_MODULE_14__.profileByIdSelector),
/* harmony export */   profilesSelector: () => (/* reexport safe */ _slices_eventTypes_eventTypesSelectors__WEBPACK_IMPORTED_MODULE_14__.profilesSelector),
/* harmony export */   recentlyUsedEventTypesSelector: () => (/* reexport safe */ _slices_eventTypes_eventTypesSelectors__WEBPACK_IMPORTED_MODULE_14__.recentlyUsedEventTypesSelector),
/* harmony export */   refetchContactsSelector: () => (/* reexport safe */ _slices_contacts_contactsSelectors__WEBPACK_IMPORTED_MODULE_16__.refetchContactsSelector),
/* harmony export */   replaceDrawerContentSelector: () => (/* reexport safe */ _slices_drawer_drawerSelectors__WEBPACK_IMPORTED_MODULE_15__.replaceDrawerContentSelector),
/* harmony export */   setUserTokenSelector: () => (/* reexport safe */ _slices_user_userSelectors__WEBPACK_IMPORTED_MODULE_17__.setUserTokenSelector),
/* harmony export */   toggleFavoriteContactSelector: () => (/* reexport safe */ _slices_contacts_contactsSelectors__WEBPACK_IMPORTED_MODULE_16__.toggleFavoriteContactSelector),
/* harmony export */   toggleFavoriteEventTypeSelector: () => (/* reexport safe */ _slices_eventTypes_eventTypesSelectors__WEBPACK_IMPORTED_MODULE_14__.toggleFavoriteEventTypeSelector),
/* harmony export */   toggleFavoriteProfileSelector: () => (/* reexport safe */ _slices_eventTypes_eventTypesSelectors__WEBPACK_IMPORTED_MODULE_14__.toggleFavoriteProfileSelector),
/* harmony export */   toggleUnfavoriteContactSelector: () => (/* reexport safe */ _slices_contacts_contactsSelectors__WEBPACK_IMPORTED_MODULE_16__.toggleUnfavoriteContactSelector),
/* harmony export */   topDrawerSelector: () => (/* reexport safe */ _slices_drawer_drawerSelectors__WEBPACK_IMPORTED_MODULE_15__.topDrawerSelector),
/* harmony export */   uiStateCreator: () => (/* binding */ uiStateCreator),
/* harmony export */   updatePopoverDataSelector: () => (/* reexport safe */ _slices_integrations_integrationsSelectors__WEBPACK_IMPORTED_MODULE_19__.updatePopoverDataSelector),
/* harmony export */   useAgendaViewTab: () => (/* reexport safe */ _slices_agenda_agendaHooks__WEBPACK_IMPORTED_MODULE_22__.useAgendaViewTab),
/* harmony export */   userLoadedSelector: () => (/* reexport safe */ _slices_user_userSelectors__WEBPACK_IMPORTED_MODULE_17__.userLoadedSelector),
/* harmony export */   userSelector: () => (/* reexport safe */ _slices_user_userSelectors__WEBPACK_IMPORTED_MODULE_17__.userSelector),
/* harmony export */   userTokenSelector: () => (/* reexport safe */ _slices_user_userSelectors__WEBPACK_IMPORTED_MODULE_17__.userTokenSelector)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _slices_agenda_agendaSlice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../libs/store/src/lib/slices/agenda/agendaSlice.ts");
/* harmony import */ var _slices_contacts_contactsSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../libs/store/src/lib/slices/contacts/contactsSlice.ts");
/* harmony import */ var _slices_drawer_drawerSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../libs/store/src/lib/slices/drawer/drawerSlice.ts");
/* harmony import */ var _slices_eventTypes_eventTypesSlice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../libs/store/src/lib/slices/eventTypes/eventTypesSlice.ts");
/* harmony import */ var _slices_featureFlags_featureFlagsSlice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../libs/store/src/lib/slices/featureFlags/featureFlagsSlice.ts");
/* harmony import */ var _slices_frames_framesSlice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../libs/store/src/lib/slices/frames/framesSlice.ts");
/* harmony import */ var _slices_integrations_integrationsSlice__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../../libs/store/src/lib/slices/integrations/integrationsSlice.ts");
/* harmony import */ var _slices_keywordDetection_keywordDetectionSlice__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("../../libs/store/src/lib/slices/keywordDetection/keywordDetectionSlice.ts");
/* harmony import */ var _slices_modal_modalSlice__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("../../libs/store/src/lib/slices/modal/modalSlice.ts");
/* harmony import */ var _slices_optibutton_optibuttonSlice__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("../../libs/store/src/lib/slices/optibutton/optibuttonSlice.ts");
/* harmony import */ var _slices_settings_settingsSlice__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("../../libs/store/src/lib/slices/settings/settingsSlice.ts");
/* harmony import */ var _slices_user_userSlice__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("../../libs/store/src/lib/slices/user/userSlice.ts");
/* harmony import */ var _slices_agenda_agendaSelectors__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("../../libs/store/src/lib/slices/agenda/agendaSelectors.ts");
/* harmony import */ var _slices_eventTypes_eventTypesSelectors__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("../../libs/store/src/lib/slices/eventTypes/eventTypesSelectors.ts");
/* harmony import */ var _slices_drawer_drawerSelectors__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("../../libs/store/src/lib/slices/drawer/drawerSelectors.ts");
/* harmony import */ var _slices_contacts_contactsSelectors__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("../../libs/store/src/lib/slices/contacts/contactsSelectors.ts");
/* harmony import */ var _slices_user_userSelectors__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("../../libs/store/src/lib/slices/user/userSelectors.ts");
/* harmony import */ var _slices_settings_settingsSelectors__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("../../libs/store/src/lib/slices/settings/settingsSelectors.ts");
/* harmony import */ var _slices_integrations_integrationsSelectors__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__("../../libs/store/src/lib/slices/integrations/integrationsSelectors.ts");
/* harmony import */ var _slices_frames_framesSelector__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__("../../libs/store/src/lib/slices/frames/framesSelector.ts");
/* harmony import */ var _slices_modal_modalSelectors__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__("../../libs/store/src/lib/slices/modal/modalSelectors.ts");
/* harmony import */ var _slices_agenda_agendaHooks__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__("../../libs/store/src/lib/slices/agenda/agendaHooks.ts");













const DataStoreName = 'calendly-store';
const DataStoreVersion = 2;
const UiStoreName = 'calendly-internal-store';
const UiStoreVersion = 1;
const DataStoreContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({});
const UiStoreContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({});
const uiStateCreator = (...args) => Object.assign({}, (0,_slices_frames_framesSlice__WEBPACK_IMPORTED_MODULE_6__.createFramesSlice)(...args), (0,_slices_drawer_drawerSlice__WEBPACK_IMPORTED_MODULE_3__.createDrawerSlice)(...args), (0,_slices_settings_settingsSlice__WEBPACK_IMPORTED_MODULE_11__.createSettingsSlice)(...args), (0,_slices_modal_modalSlice__WEBPACK_IMPORTED_MODULE_9__.createModalSlice)(...args));
const dataStateCreator = (...args) => Object.assign({}, (0,_slices_eventTypes_eventTypesSlice__WEBPACK_IMPORTED_MODULE_4__.createEventTypesSlice)(...args), (0,_slices_agenda_agendaSlice__WEBPACK_IMPORTED_MODULE_1__.createAgendaSlice)(...args), (0,_slices_contacts_contactsSlice__WEBPACK_IMPORTED_MODULE_2__.createContactsSlice)(...args), (0,_slices_optibutton_optibuttonSlice__WEBPACK_IMPORTED_MODULE_10__.createOptibuttonSlice)(...args), (0,_slices_user_userSlice__WEBPACK_IMPORTED_MODULE_12__.createUserSlice)(...args), (0,_slices_integrations_integrationsSlice__WEBPACK_IMPORTED_MODULE_7__.createIntegrationsSlice)(...args), (0,_slices_user_userSlice__WEBPACK_IMPORTED_MODULE_12__.createUserSlice)(...args), (0,_slices_featureFlags_featureFlagsSlice__WEBPACK_IMPORTED_MODULE_5__.createFeatureFlagsSlice)(...args), (0,_slices_keywordDetection_keywordDetectionSlice__WEBPACK_IMPORTED_MODULE_8__.createKeywordDetectionSlice)(...args));

// Selectors








 // Hooks


/***/ }),

/***/ "../../libs/store/src/lib/slices/agenda/agendaHooks.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useAgendaViewTab: () => (/* binding */ useAgendaViewTab)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/zustand/esm/index.mjs");
/* harmony import */ var _storeHooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../libs/store/src/lib/storeHooks.ts");
/* harmony import */ var _frames_framesSelector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../libs/store/src/lib/slices/frames/framesSelector.ts");




// Agenda Hooks

const useAgendaViewTab = frameId => {
  const {
    uiStore
  } = (0,_storeHooks__WEBPACK_IMPORTED_MODULE_0__.useCombinedStore)();
  const agendaFrameTab = (0,zustand__WEBPACK_IMPORTED_MODULE_2__.useStore)(uiStore, state => (0,_frames_framesSelector__WEBPACK_IMPORTED_MODULE_1__.agendaFrameTabSelector)(state, frameId));
  const agendaViewTab = (0,zustand__WEBPACK_IMPORTED_MODULE_2__.useStore)(uiStore, state => state.agendaViewTab);
  return agendaFrameTab || agendaViewTab;
};

/***/ }),

/***/ "../../libs/store/src/lib/slices/agenda/agendaSelectors.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   agendaViewTabSelector: () => (/* binding */ agendaViewTabSelector),
/* harmony export */   ascHasNextSelector: () => (/* binding */ ascHasNextSelector),
/* harmony export */   ascLoadingSelector: () => (/* binding */ ascLoadingSelector),
/* harmony export */   ascNextPageTokenSelector: () => (/* binding */ ascNextPageTokenSelector),
/* harmony export */   descHasNextSelector: () => (/* binding */ descHasNextSelector),
/* harmony export */   descLoadingSelector: () => (/* binding */ descLoadingSelector),
/* harmony export */   descNextPageTokenSelector: () => (/* binding */ descNextPageTokenSelector),
/* harmony export */   eventByIdSelector: () => (/* binding */ eventByIdSelector),
/* harmony export */   eventsCountSelector: () => (/* binding */ eventsCountSelector),
/* harmony export */   eventsGroupedByDateSelector: () => (/* binding */ eventsGroupedByDateSelector),
/* harmony export */   eventsSelector: () => (/* binding */ eventsSelector),
/* harmony export */   fetchEventsSelector: () => (/* binding */ fetchEventsSelector),
/* harmony export */   fetchInitialDataSelector: () => (/* binding */ fetchInitialDataSelector),
/* harmony export */   hasInternalConflictSelector: () => (/* binding */ hasInternalConflictSelector),
/* harmony export */   isInitialEventsLoadingSelector: () => (/* binding */ isInitialEventsLoadingSelector),
/* harmony export */   nextUpEventId: () => (/* binding */ nextUpEventId),
/* harmony export */   openDrawerForTabSelector: () => (/* binding */ openDrawerForTabSelector),
/* harmony export */   organizationMembersSelector: () => (/* binding */ organizationMembersSelector)
/* harmony export */ });
/* harmony import */ var luxon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/luxon/src/luxon.js");
/* harmony import */ var _frames_framesSlice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../libs/store/src/lib/slices/frames/framesSlice.ts");


const nextUpEventId = state => {
  var _state$nextUpEvent;
  return ((_state$nextUpEvent = state.nextUpEvent) == null ? void 0 : _state$nextUpEvent.uuid) || null;
};
const organizationMembersSelector = state => state.organizationMembers;
const fetchEventsSelector = state => state.fetchEvents;
const fetchInitialDataSelector = state => state.fetchInitialData;
const eventsSelector = state => Object.values(state.events).filter(item => !state.initialEventsLoading || item.initialLoad);
const eventsCountSelector = state => Object.values(state.events).filter(item => !state.initialEventsLoading || item.initialLoad).length;
const isInitialEventsLoadingSelector = state => state.initialEventsLoading;
const ascNextPageTokenSelector = state => state.ascNextPageToken;
const ascLoadingSelector = state => state.ascLoading;
const ascHasNextSelector = state => Boolean(state.ascNextPageToken);
const descNextPageTokenSelector = state => state.descNextPageToken;
const descLoadingSelector = state => state.descLoading;
const descHasNextSelector = state => Boolean(state.descNextPageToken);
const hasInternalConflictSelector = (state, internalConflictEventUuids = [], isCancelled = false) => {
  if (isCancelled) {
    return false;
  }
  return internalConflictEventUuids.length > 0;
};
const agendaViewTabSelector = (state, frameId) => {
  const frame = state.frames.find(f => f.id === frameId);
  return frame && (0,_frames_framesSlice__WEBPACK_IMPORTED_MODULE_1__.isFrameRole)(frame, 'agenda_view') && frame.roleData.tab ? frame.roleData.tab : state.agendaViewTab;
};
const eventsGroupedByDateSelector = state => {
  const groupedItems = {};
  Object.values(state.events).filter(item => !state.initialEventsLoading || item.initialLoad).forEach(item => {
    const day = luxon__WEBPACK_IMPORTED_MODULE_0__.DateTime.fromISO(item.start);
    if (!day.isValid) {
      throw new Error(`Invalid date ${day.toString()}: ${day.invalidReason}, ${day.invalidExplanation}`);
    }
    const dayKey = day.toISODate();
    if (!groupedItems[dayKey]) {
      groupedItems[dayKey] = [];
    }
    groupedItems[dayKey].push(item);
  });

  // Always adds the today date
  const todayKey = luxon__WEBPACK_IMPORTED_MODULE_0__.DateTime.now().toISODate();
  if (!groupedItems[todayKey] && Object.keys(groupedItems).length) {
    groupedItems[todayKey] = [];
  }
  return groupedItems;
};
const eventByIdSelector = (state, eventId) => {
  if (!eventId) {
    return null;
  }
  return state.events[eventId] || null;
};

// This function is primarily used for integrations where we need to open the sidebar with the correct drawer.
// - If the sidebar isn't open, it opens the sidebar and the selected drawer.
// - If the sidebar is open with the same drawer type, it replaces the drawer content with the selected content.
// - If the sidebar is open with a different view, it will only open this drawer type.
const openDrawerForTabSelector = state => {
  return (tabId, type, data) => {
    const {
      frames,
      addAgendaFrame,
      replaceDrawerContent,
      openDrawer
    } = state;
    const sidebarFrame = frames.find(f => f.tabId === tabId && f.role === 'agenda_view');
    const drawerOpen = sidebarFrame && sidebarFrame.roleData.drawerStack.some(drawer => drawer.type === type);
    if (!(sidebarFrame != null && sidebarFrame.id)) {
      addAgendaFrame(tabId, {
        roleData: {
          drawerStack: [{
            type,
            data
          }]
        }
      });
    } else if (drawerOpen) {
      replaceDrawerContent(sidebarFrame.id, type, data);
    } else {
      openDrawer(sidebarFrame.id, type, data);
    }
  };
};

/***/ }),

/***/ "../../libs/store/src/lib/slices/agenda/agendaSlice.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createAgendaSlice: () => (/* binding */ createAgendaSlice),
/* harmony export */   fetchScheduledEventWithInvitees: () => (/* binding */ fetchScheduledEventWithInvitees),
/* harmony export */   isDateBetween: () => (/* binding */ isDateBetween)
/* harmony export */ });
/* harmony import */ var luxon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/luxon/src/luxon.js");
/* harmony import */ var _client_core_platform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../libs/platform/src/index.ts");


const normalizeEvents = (events, currentEvents) => {
  return events.reduce((acc, item) => Object.assign({}, acc, {
    [item.uuid]: item
  }), currentEvents);
};
const ASC_PAGE_SIZE = 10;
const DESC_PAGE_SIZE = 10;
// @TODO: move this to proper place when module boundaries are fixed
function isDateBetween(date, start, end) {
  return start < date && date < end;
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
const defaultAgendaState = {
  initialEventsLoading: false,
  events: {},
  ascStartTime: '',
  ascEndTime: '',
  ascLoading: false,
  ascNextPageToken: '',
  descStartTime: '',
  descEndTime: '',
  descLoading: false,
  descNextPageToken: '',
  organizationMembers: {},
  nextUpEvent: null
};
const createAgendaSlice = (set, get, api) => Object.assign({}, defaultAgendaState, {
  purgeAgenda: () => {
    set(Object.assign({}, defaultAgendaState));
  },
  fetchEventInTimeRange: async eventId => {
    const platform = api.platformMiddleware.getPlatform().platform;
    const {
      ascEndTime,
      descStartTime,
      events,
      organizationMembers,
      getNextUpEvent,
      ascNextPageToken,
      user
    } = get();
    const event = await fetchScheduledEventWithInvitees(eventId, platform, organizationMembers);
    if (!event) return;

    // Check if the user is a host of the event, if not we shouldn't save it
    // since events in 'Meetings' tab should only be events where the user is a host
    if (!event.memberships.find(host => host.email === (user == null ? void 0 : user.email))) return;
    const descStart = luxon__WEBPACK_IMPORTED_MODULE_0__.DateTime.fromISO(descStartTime);
    const ascEnd = luxon__WEBPACK_IMPORTED_MODULE_0__.DateTime.fromISO(ascEndTime);
    const eventStart = luxon__WEBPACK_IMPORTED_MODULE_0__.DateTime.fromISO(event.start);
    if (isDateBetween(eventStart, descStart, ascEnd)) {
      // Check if event is inside the first loaded time range
      const initialLoadedEvents = Object.values(events).filter(item => item.initialLoad);
      if (initialLoadedEvents.length === 0 || !ascNextPageToken) {
        event.initialLoad = true;
      } else {
        const lastInitialLoadedEvent = initialLoadedEvents.reduce((latest, currentItem) => {
          const currentStart = luxon__WEBPACK_IMPORTED_MODULE_0__.DateTime.fromISO(currentItem.start);
          const latestStart = luxon__WEBPACK_IMPORTED_MODULE_0__.DateTime.fromISO(latest.start);
          if (currentStart > latestStart) {
            return currentItem;
          } else {
            return latest;
          }
        }, initialLoadedEvents[0]);
        const lastInitialLoadedEventStart = luxon__WEBPACK_IMPORTED_MODULE_0__.DateTime.fromISO(lastInitialLoadedEvent.start);
        // If our item is before the latest initial loaded event
        if (lastInitialLoadedEvent && eventStart < lastInitialLoadedEventStart) {
          event.initialLoad = true;
        }
      }
      const stateChange = {
        events: Object.assign({}, events, {
          [event.uuid]: event
        })
      };

      // Now let's redo the next up event calculation
      const {
        nextUpEvent
      } = await getNextUpEvent(stateChange.events);
      stateChange.nextUpEvent = nextUpEvent;
      set(stateChange);
    }
  },
  fetchRescheduledEvent: async (oldEventId, newEventId) => {
    const platform = api.platformMiddleware.getPlatform().platform;
    const {
      events,
      ascEndTime,
      descStartTime,
      organizationMembers,
      getNextUpEvent
    } = get();
    const updatedOldEvent = await fetchScheduledEventWithInvitees(oldEventId, platform, organizationMembers);
    const updatedNewEvent = await fetchScheduledEventWithInvitees(newEventId, platform, organizationMembers);
    if (updatedOldEvent && updatedNewEvent) {
      const updatedOldEventStart = luxon__WEBPACK_IMPORTED_MODULE_0__.DateTime.fromISO(updatedOldEvent.start);
      const updatedNewEventStart = luxon__WEBPACK_IMPORTED_MODULE_0__.DateTime.fromISO(updatedNewEvent.start);
      const descStart = luxon__WEBPACK_IMPORTED_MODULE_0__.DateTime.fromISO(descStartTime);
      const ascEnd = luxon__WEBPACK_IMPORTED_MODULE_0__.DateTime.fromISO(ascEndTime);
      if (isDateBetween(updatedOldEventStart, descStart, ascEnd) && isDateBetween(updatedNewEventStart, descStart, ascEnd)) {
        const stateChange = {
          events: Object.assign({}, events, {
            [oldEventId]: updatedOldEvent,
            [newEventId]: updatedNewEvent
          })
        };

        // Now let's redo the next up event calculation
        const {
          nextUpEvent
        } = await getNextUpEvent(stateChange.events);
        stateChange.nextUpEvent = nextUpEvent;
        set(stateChange);
        set(stateChange);
      }
    }
  },
  fetchInitialData: async (userId, onlyEvents = false) => {
    const {
      fetchEventTypes,
      fetchEvents,
      fetchInitialContacts,
      getNextUpEvent,
      fetchOrganizationMembers
    } = get();
    const currentDate = luxon__WEBPACK_IMPORTED_MODULE_0__.DateTime.now().startOf('day');
    const startDate = currentDate.minus({
      months: 1
    });
    const endDate = currentDate.plus({
      months: 1
    });
    set({
      ascStartTime: formatDate(currentDate),
      ascEndTime: formatDate(endDate),
      descStartTime: formatDate(startDate),
      descEndTime: formatDate(currentDate),
      descNextPageToken: '',
      ascNextPageToken: '',
      initialEventsLoading: true
    });
    if (!onlyEvents) {
      const {
        organizationMembers
      } = await fetchOrganizationMembers();
      set({
        organizationMembers: mapOrganizationMembers(organizationMembers)
      });
      fetchEventTypes();
      fetchInitialContacts();
    }
    const results = await Promise.all([fetchEvents('asc', true), fetchEvents('desc', true)]);
    const {
      events: futureEvents,
      stateUpdate: futureStateUpdate
    } = results[0];
    const {
      events: pastEvents,
      stateUpdate: pastStateUpdate
    } = results[1];
    const combinedEvents = normalizeEvents([...pastEvents, ...futureEvents], {});
    const {
      nextUpEvent
    } = await getNextUpEvent(combinedEvents);
    set(state => Object.assign({}, state, futureStateUpdate, pastStateUpdate, {
      initialEventsLoading: false,
      events: combinedEvents,
      nextUpEvent,
      userId
    }));
  },
  fetchEvents: async (sortOrder, initialData) => {
    const platform = api.platformMiddleware.getPlatform().platform;
    const {
      ascStartTime,
      ascEndTime,
      descStartTime,
      descEndTime,
      ascNextPageToken,
      descNextPageToken,
      ascLoading,
      descLoading,
      events,
      organizationMembers,
      user,
      fetchInitialData
    } = get();
    const start = sortOrder === 'asc' ? ascStartTime : descStartTime;
    const end = sortOrder === 'asc' ? ascEndTime : descEndTime;
    const pageSize = sortOrder === 'asc' ? ASC_PAGE_SIZE : DESC_PAGE_SIZE;
    const pageToken = sortOrder === 'asc' ? ascNextPageToken : descNextPageToken;
    if (!initialData && sortOrder === 'asc' && (!ascNextPageToken || ascLoading)) {
      return {
        events: [],
        stateUpdate: {}
      };
    }
    if (!initialData && sortOrder === 'desc' && (!descNextPageToken || descLoading)) {
      return {
        events: [],
        stateUpdate: {}
      };
    }
    if (sortOrder === 'asc') {
      set({
        ascLoading: true
      });
    } else {
      set({
        descLoading: true
      });
    }
    let result;
    try {
      var _get$user, _get$user2;
      result = await platform.calendlyApi.getAgendaScheduledEvents(start, end, (_get$user = get().user) == null ? void 0 : _get$user.resource_uri, (_get$user2 = get().user) == null ? void 0 : _get$user2.id, {
        sortOrder,
        pageSize,
        pageToken: initialData ? '' : pageToken,
        status: 'active'
      });
    } catch (e) {
      // Fetching next page failed, the page token is probably expired
      // Trigger a re-fetch
      if (!initialData && user != null && user.id) {
        fetchInitialData(user.id, true);
      }
      return {
        events: [],
        stateUpdate: {}
      };
    }
    const scheduledEvents = result.collection.reduce((arr, apiEvent) => {
      const event = _client_core_platform__WEBPACK_IMPORTED_MODULE_1__.ScheduledEvent.fromApi(apiEvent, Boolean(initialData));
      const extendedMemberships = assignAvatarsAndNames(event, organizationMembers);
      const updatedEvent = Object.assign({}, event, {
        memberships: extendedMemberships,
        isCanceled: event.isCanceled,
        eventTypeType: event.eventTypeType,
        timeStatus: event.timeStatus,
        eventTypeTypeDescription: event.eventTypeTypeDescription
      });
      arr.push(updatedEvent);
      return arr;
    }, []);
    const pagination = result.pagination;
    let stateUpdate = {};
    if (sortOrder === 'asc') {
      var _pagination$next_page;
      stateUpdate = {
        ascLoading: false,
        ascNextPageToken: (_pagination$next_page = pagination.next_page_token) != null ? _pagination$next_page : ''
      };
    } else {
      var _pagination$next_page2;
      stateUpdate = {
        descLoading: false,
        descNextPageToken: (_pagination$next_page2 = pagination.next_page_token) != null ? _pagination$next_page2 : ''
      };
    }
    if (!initialData) {
      stateUpdate.events = normalizeEvents(scheduledEvents, events);
      set(stateUpdate);
    }
    return {
      events: scheduledEvents,
      stateUpdate
    };
  },
  nextUpEvent: null,
  getNextUpEvent: async events => {
    const now = luxon__WEBPACK_IMPORTED_MODULE_0__.DateTime.now();
    const filterFnc = event => {
      const eventStart = luxon__WEBPACK_IMPORTED_MODULE_0__.DateTime.fromISO(event.start);
      return !event.isCanceled && eventStart > now;
    };
    const reduceFnc = (prev, curr) => {
      return prev.start < curr.start ? prev : curr;
    };
    const nextUpEvents = Object.values(events).filter(filterFnc);
    const nextUpEvent = nextUpEvents.length > 0 ? nextUpEvents.reduce(reduceFnc) : null;
    return {
      nextUpEvent: nextUpEvent
    };
  },
  fetchOrganizationMembers: async () => {
    const platform = api.platformMiddleware.getPlatform().platform;
    const organizationResponse = await platform.calendlyApi.getOrganizationMembers();
    return {
      organizationMembers: organizationResponse
    };
  },
  removeInternalConflicts: (eventUuid, conflictUuids) => {
    const {
      events
    } = get();
    const updatedEvents = {};

    // for all events that were in conflict with the canceled event we need to remove it from their internal conflicts
    for (const conflictUuid of conflictUuids) {
      const event = events[conflictUuid];
      event.internalConflictEventUuids = event.internalConflictEventUuids.filter(uuid => uuid !== eventUuid);
      updatedEvents[conflictUuid] = event;
    }

    // for the canceled event we need to remove all internal conflicts
    const updatedEvent = Object.assign({}, events[eventUuid]);
    updatedEvent.internalConflictEventUuids = [];
    set({
      events: Object.assign({}, events, updatedEvents, {
        [eventUuid]: updatedEvent
      })
    });
  }
});
async function fetchScheduledEventWithInvitees(eventId, platform, organizationMembersMap) {
  const eventRes = await platform.calendlyApi.getScheduledEvent(eventId);
  if (!eventRes) {
    return null;
  }
  const inviteesRes = await platform.calendlyApi.getScheduledEventInvitees(eventId, {
    status: 'active'
  });
  const event = _client_core_platform__WEBPACK_IMPORTED_MODULE_1__.ScheduledEvent.fromApi(Object.assign({}, eventRes.resource, {
    invitees: inviteesRes.collection
  }));
  const extendedMemberships = assignAvatarsAndNames(event, organizationMembersMap);
  return Object.assign({}, event, {
    memberships: extendedMemberships,
    isCanceled: event.isCanceled,
    eventTypeType: event.eventTypeType,
    timeStatus: event.timeStatus,
    eventTypeTypeDescription: event.eventTypeTypeDescription
  });
}
function extractIdFromUrl(url) {
  const parts = url.split('/');
  return parts[parts.length - 1];
}
function mapOrganizationMembers(organizationMembers) {
  return organizationMembers.reduce((obj, member) => {
    obj[member.id] = {
      name: member.name,
      avatar: member.avatar.url
    };
    return obj;
  }, {});
}
function assignAvatarsAndNames(event, organizationMembers) {
  return event.memberships.map(membership => {
    const userId = extractIdFromUrl(membership.user);
    const orgMember = organizationMembers[userId];
    return orgMember ? Object.assign({}, membership, {
      avatar: orgMember.avatar || null,
      name: orgMember.name
    }) : Object.assign({}, membership, {
      avatar: null,
      name: ''
    });
  });
}

/***/ }),

/***/ "../../libs/store/src/lib/slices/contacts/contactsSelectors.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   contactMeetingHistoryByEmailSelector: () => (/* binding */ contactMeetingHistoryByEmailSelector),
/* harmony export */   contactsByIdSelector: () => (/* binding */ contactsByIdSelector),
/* harmony export */   contactsCountSelector: () => (/* binding */ contactsCountSelector),
/* harmony export */   contactsSelector: () => (/* binding */ contactsSelector),
/* harmony export */   favoriteContactsSelector: () => (/* binding */ favoriteContactsSelector),
/* harmony export */   fetchContactMeetingHistorySelector: () => (/* binding */ fetchContactMeetingHistorySelector),
/* harmony export */   fetchContactSelector: () => (/* binding */ fetchContactSelector),
/* harmony export */   fetchContactsSelector: () => (/* binding */ fetchContactsSelector),
/* harmony export */   fetchInitialContactsSelector: () => (/* binding */ fetchInitialContactsSelector),
/* harmony export */   fetchOnContactsSearchSelector: () => (/* binding */ fetchOnContactsSearchSelector),
/* harmony export */   hasNextPageSelector: () => (/* binding */ hasNextPageSelector),
/* harmony export */   isFilteredContactsListLoadingSelector: () => (/* binding */ isFilteredContactsListLoadingSelector),
/* harmony export */   isInitialContactsLoadingSelector: () => (/* binding */ isInitialContactsLoadingSelector),
/* harmony export */   isLoadingContactsNextPageSelector: () => (/* binding */ isLoadingContactsNextPageSelector),
/* harmony export */   isRefetchingContactsSelector: () => (/* binding */ isRefetchingContactsSelector),
/* harmony export */   nextPageTokenSelector: () => (/* binding */ nextPageTokenSelector),
/* harmony export */   refetchContactsSelector: () => (/* binding */ refetchContactsSelector),
/* harmony export */   toggleFavoriteContactSelector: () => (/* binding */ toggleFavoriteContactSelector),
/* harmony export */   toggleUnfavoriteContactSelector: () => (/* binding */ toggleUnfavoriteContactSelector)
/* harmony export */ });
const fetchInitialContactsSelector = state => state.fetchInitialContacts;
const fetchContactsSelector = state => state.fetchContacts;
const toggleFavoriteContactSelector = state => state.toggleFavoriteContact;
const toggleUnfavoriteContactSelector = state => state.toggleUnfavoriteContact;
const contactsSelector = state => state.contacts;
const favoriteContactsSelector = state => state.favoriteContacts;
const isInitialContactsLoadingSelector = state => state.isInitialContactsLoading;
const isLoadingContactsNextPageSelector = state => state.isLoadingContactsNextPage;
const nextPageTokenSelector = state => state.contactsNextPageToken;
const hasNextPageSelector = state => Boolean(state.contactsNextPageToken);
const contactsCountSelector = state => Object.values(state.contacts.entities).length + Object.values(state.favoriteContacts.entities).length;
const isFilteredContactsListLoadingSelector = state => state.isFilteredContactsLoading;
const isRefetchingContactsSelector = state => state.isRefetchingContacts;
const refetchContactsSelector = state => state.refetchContacts;
const fetchOnContactsSearchSelector = state => state.fetchOnContactsSearch;
const fetchContactSelector = state => state.fetchContact;
const fetchContactMeetingHistorySelector = state => state.fetchContactMeetingHistory;
const contactsByIdSelector = (state, id) => {
  if (!id) {
    return null;
  }
  const contact = state.contacts.entities[id] || state.favoriteContacts.entities[id];
  return contact != null ? contact : null;
};
const contactMeetingHistoryByEmailSelector = (state, email) => {
  var _state$contactsMeetin;
  if (!email) {
    return null;
  }
  return (_state$contactsMeetin = state.contactsMeetingHistory[email]) != null ? _state$contactsMeetin : null;
};

/***/ }),

/***/ "../../libs/store/src/lib/slices/contacts/contactsSlice.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createContactsSlice: () => (/* binding */ createContactsSlice)
/* harmony export */ });
/* harmony import */ var luxon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/luxon/src/luxon.js");
/* harmony import */ var normalizr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/normalizr/dist/normalizr.es.js");


const contactsSchema = new normalizr__WEBPACK_IMPORTED_MODULE_1__.schema.Entity('contacts', {}, {
  idAttribute: 'uuid'
});
const favoriteContactsSchema = new normalizr__WEBPACK_IMPORTED_MODULE_1__.schema.Entity('favoriteContacts', {}, {
  idAttribute: 'uuid'
});
const defaultContactsState = {
  contacts: {
    entities: {},
    ids: []
  },
  contactsMeetingHistory: {},
  favoriteContacts: {
    entities: {},
    ids: []
  },
  contactsLastFetchedAt: null,
  isInitialContactsLoading: false,
  isLoadingContactsNextPage: false,
  isRefetchingContacts: false,
  isFilteredContactsLoading: false,
  contactsNextPageToken: '',
  contactsSearchQuery: ''
};
const createContactsSlice = (set, get, api) => Object.assign({}, defaultContactsState, {
  purgeContacts: () => {
    set(Object.assign({}, defaultContactsState));
  },
  fetchInitialContacts: async () => {
    var _contacts$pagination$, _favoriteContacts$pag;
    const platform = api.platformMiddleware.getPlatform().platform;
    const {
      isInitialContactsLoading,
      contactsLastFetchedAt
    } = get();
    const currentDate = luxon__WEBPACK_IMPORTED_MODULE_0__.DateTime.now();
    const contactsLastFetchedAtDate = contactsLastFetchedAt ? luxon__WEBPACK_IMPORTED_MODULE_0__.DateTime.fromISO(contactsLastFetchedAt) : luxon__WEBPACK_IMPORTED_MODULE_0__.DateTime.now();
    if (isInitialContactsLoading && contactsLastFetchedAt) {
      // Failsafe check to prevent a scenario where Contacts are never fetched again
      const diffMinutes = currentDate.diff(contactsLastFetchedAtDate).as('minutes');
      if (Math.abs(diffMinutes) < 3) return;
    }
    set({
      isInitialContactsLoading: true,
      contactsLastFetchedAt: currentDate.toISO()
    });
    const options = {
      visible: true,
      favorite: false
    };
    const contacts = await platform.calendlyApi.getContactsList(options);
    const favoriteContacts = await platform.calendlyApi.getContactsList(Object.assign({}, options, {
      favorite: true
    }));
    const contactsCollection = contacts.collection;
    const contactsNextPageToken = (_contacts$pagination$ = contacts.pagination.next_page_token) != null ? _contacts$pagination$ : '';
    let favoriteContactsNextPageToken = (_favoriteContacts$pag = favoriteContacts.pagination.next_page_token) != null ? _favoriteContacts$pag : '';
    while (favoriteContactsNextPageToken) {
      var _favoriteContactsResp;
      const favoriteContactsResponse = await platform.calendlyApi.getContactsList(Object.assign({}, options, {
        favorite: true,
        pageToken: favoriteContactsNextPageToken
      }));
      favoriteContactsNextPageToken = (_favoriteContactsResp = favoriteContactsResponse.pagination.next_page_token) != null ? _favoriteContactsResp : '';
      favoriteContacts.collection = favoriteContacts.collection.concat(favoriteContactsResponse.collection);
    }
    const fetchContactsCompleted = get().fetchContactsCompleted;
    fetchContactsCompleted(contactsCollection, favoriteContacts.collection);
    set({
      contactsNextPageToken,
      isLoadingContactsNextPage: false,
      isInitialContactsLoading: false
    });
  },
  fetchContactsCompleted: async (contactsCollection, favoriteContacts) => {
    const normalizedContacts = (0,normalizr__WEBPACK_IMPORTED_MODULE_1__.normalize)(contactsCollection, [contactsSchema]);
    const normalizedFavoriteContacts = (0,normalizr__WEBPACK_IMPORTED_MODULE_1__.normalize)(favoriteContacts, [favoriteContactsSchema]);
    set({
      contacts: {
        entities: normalizedContacts.entities['contacts'] || {},
        ids: normalizedContacts.result
      },
      favoriteContacts: {
        entities: normalizedFavoriteContacts.entities['favoriteContacts'] || {},
        ids: normalizedFavoriteContacts.result
      }
    });
  },
  fetchContacts: async () => {
    var _contactsResponse$pag;
    const platform = api.platformMiddleware.getPlatform().platform;
    set({
      isLoadingContactsNextPage: true
    });
    const {
      contactsNextPageToken,
      contacts
    } = get();
    const options = {
      visible: true,
      pageToken: contactsNextPageToken,
      favorite: false
    };
    const contactsResponse = await platform.calendlyApi.getContactsList(options);
    const contactsCollection = contactsResponse.collection;
    const normalizedContacts = (0,normalizr__WEBPACK_IMPORTED_MODULE_1__.normalize)(contactsCollection, [contactsSchema]);
    const contactsEntity = {
      entities: Object.assign({}, contacts.entities, normalizedContacts.entities['contacts'] || {}),
      ids: contacts.ids.concat(normalizedContacts.result)
    };
    set({
      contactsNextPageToken: (_contactsResponse$pag = contactsResponse.pagination.next_page_token) != null ? _contactsResponse$pag : '',
      isLoadingContactsNextPage: false,
      contacts: contactsEntity
    });
  },
  toggleFavoriteContact: async uuid => {
    const platform = api.platformMiddleware.getPlatform().platform;
    const {
      contacts,
      favoriteContacts
    } = get();
    const updatedResponse = await platform.calendlyApi.patchContactFavorites(uuid, true);
    const updatedContact = updatedResponse == null ? void 0 : updatedResponse.resource;
    const newContactsList = Object.assign({}, contacts.entities);
    delete newContactsList[uuid];
    const contactsIds = contacts.ids.filter(id => id !== uuid);
    const newFavoriteContactsEntitiesList = Object.assign({}, favoriteContacts.entities, {
      [uuid]: updatedContact
    });
    const newFavoriteContactsIds = Object.keys(newFavoriteContactsEntitiesList);
    newFavoriteContactsIds.sort((a, b) => {
      const contactA = newFavoriteContactsEntitiesList[a];
      const contactB = newFavoriteContactsEntitiesList[b];
      return contactA.name.localeCompare(contactB.name);
    });
    set({
      contacts: {
        entities: newContactsList,
        ids: contactsIds
      },
      favoriteContacts: {
        entities: newFavoriteContactsEntitiesList,
        ids: newFavoriteContactsIds
      }
    });
  },
  toggleUnfavoriteContact: async uuid => {
    const platform = api.platformMiddleware.getPlatform().platform;
    const {
      contacts,
      favoriteContacts
    } = get();
    const updatedResponse = await platform.calendlyApi.patchContactFavorites(uuid, false);
    const updatedContact = updatedResponse == null ? void 0 : updatedResponse.resource;
    const newFavoriteContactsList = Object.assign({}, favoriteContacts.entities);
    delete newFavoriteContactsList[uuid];
    const favoriteContactsIds = favoriteContacts.ids.filter(id => id !== uuid);
    const newContactsList = Object.assign({}, contacts.entities, {
      [uuid]: updatedContact
    });
    const newContactsIds = Object.keys(newContactsList);
    newContactsIds.sort((a, b) => {
      const contactA = newContactsList[a];
      const contactB = newContactsList[b];
      return contactA.name.localeCompare(contactB.name);
    });
    set({
      contacts: {
        entities: newContactsList,
        ids: newContactsIds
      },
      favoriteContacts: {
        entities: newFavoriteContactsList,
        ids: favoriteContactsIds
      }
    });
  },
  fetchOnContactsSearch: async contactsSearchQuery => {
    var _get$user;
    const platform = api.platformMiddleware.getPlatform().platform;
    if (contactsSearchQuery && !contactsSearchQuery.trim()) {
      return;
    }
    if (!contactsSearchQuery) {
      const refetchContacts = get().refetchContacts;
      refetchContacts();
      return;
    }
    set({
      isFilteredContactsLoading: true
    });
    const options = {
      visible: true
    };
    const contacts = await platform.calendlyApi.getContactsBySearchQuery(contactsSearchQuery, (_get$user = get().user) == null ? void 0 : _get$user.id, options);
    const contactsCollection = contacts.collection.filter(contact => !contact.favorite);
    const favoriteContacts = contacts.collection.filter(contact => contact.favorite);
    const fetchContactsCompleted = get().fetchContactsCompleted;
    fetchContactsCompleted(contactsCollection, favoriteContacts);
    set({
      isFilteredContactsLoading: false
    });
  },
  refetchContacts: () => {
    set({
      isRefetchingContacts: true
    });
    const fetchInitialContacts = get().fetchInitialContacts;
    fetchInitialContacts();
    set({
      isRefetchingContacts: false
    });
  },
  fetchContact: async uuid => {
    const platform = api.platformMiddleware.getPlatform().platform;
    const contact = await platform.calendlyApi.getContact(uuid);
    set(_setContact(uuid, contact.resource));
  },
  fetchContactMeetingHistory: async email => {
    const platform = api.platformMiddleware.getPlatform().platform;
    const meetingHistoryResponse = await platform.calendlyApi.getContactMeetingHistory(email);
    set(_setContactMeetingHistory(email, meetingHistoryResponse.resource));
  }
});
const _setContact = (uuid, updatedContact) => state => {
  return Object.assign({}, state, {
    contacts: Object.assign({}, state.contacts, {
      entities: Object.assign({}, state.contacts.entities, {
        [uuid]: updatedContact
      })
    })
  });
};
const _setContactMeetingHistory = (email, meetingHistory) => state => {
  return Object.assign({}, state, {
    contactsMeetingHistory: Object.assign({}, state.contactsMeetingHistory, {
      [email]: meetingHistory
    })
  });
};

/***/ }),

/***/ "../../libs/store/src/lib/slices/drawer/drawerSelectors.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeAllDrawersSelector: () => (/* binding */ closeAllDrawersSelector),
/* harmony export */   closeDrawerSelector: () => (/* binding */ closeDrawerSelector),
/* harmony export */   drawerStackSelector: () => (/* binding */ drawerStackSelector),
/* harmony export */   openDrawerSelector: () => (/* binding */ openDrawerSelector),
/* harmony export */   replaceDrawerContentSelector: () => (/* binding */ replaceDrawerContentSelector),
/* harmony export */   topDrawerSelector: () => (/* binding */ topDrawerSelector)
/* harmony export */ });
/* harmony import */ var _frames_framesSlice__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../libs/store/src/lib/slices/frames/framesSlice.ts");

const drawerStackSelector = (uiState, frameId) => {
  const frame = uiState.frames.find(f => f.id === frameId);
  return frame && (0,_frames_framesSlice__WEBPACK_IMPORTED_MODULE_0__.isFrameRole)(frame, 'agenda_view') ? frame == null ? void 0 : frame.roleData.drawerStack : [];
};
const openDrawerSelector = state => state.openDrawer;
const closeDrawerSelector = state => state.closeDrawer;
const closeAllDrawersSelector = state => state.closeAllDrawers;
const replaceDrawerContentSelector = state => state.replaceDrawerContent;
const topDrawerSelector = (uiState, frameId, drawerType) => {
  const stack = drawerStackSelector(uiState, frameId);
  const topItem = stack.length > 0 ? stack[stack.length - 1] : undefined;
  if ((topItem == null ? void 0 : topItem.type) === drawerType) {
    return topItem;
  }
  return undefined;
};

/***/ }),

/***/ "../../libs/store/src/lib/slices/drawer/drawerSlice.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DrawerType: () => (/* binding */ DrawerType),
/* harmony export */   createDrawerSlice: () => (/* binding */ createDrawerSlice)
/* harmony export */ });
/* harmony import */ var lodash_isequal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/lodash.isequal/index.js");
/* harmony import */ var lodash_isequal__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isequal__WEBPACK_IMPORTED_MODULE_0__);

let DrawerType = /*#__PURE__*/function (DrawerType) {
  DrawerType["Meeting"] = "meeting";
  DrawerType["CancelMeeting"] = "cancelMeeting";
  DrawerType["Contact"] = "contact";
  DrawerType["RemoveContact"] = "remove_contact";
  DrawerType["ContactEditForm"] = "contact_edit_form";
  DrawerType["ContactCreateForm"] = "contact_create_form";
  DrawerType["Settings"] = "settings";
  DrawerType["HrrReschedule"] = "hrr_reschedule";
  DrawerType["AddTimesToEmail"] = "add_times_to_email";
  DrawerType["ShareAvailability"] = "share_availability";
  DrawerType["EventTypeSelector"] = "event_type_selector";
  DrawerType["RescheduleRequestEmail"] = "reschedule_request_email";
  DrawerType["SingleUseLink"] = "single_use_link";
  return DrawerType;
}({});
const createDrawerSlice = (set, get) => ({
  openDrawer: (frameId, type, data) => {
    set(addDrawerToStack(frameId, type, data));
  },
  replaceDrawerContent: (frameId, type, data) => {
    set(replaceDrawerContent(frameId, type, data));
  },
  closeDrawer: frameId => {
    set(removeDrawerFromStack(frameId));
  },
  closeAllDrawers: (frameId, filter) => {
    set(clearDrawersFromStack(frameId, filter));
  }
});
const addDrawerToStack = (frameId, type, data) => state => {
  const {
    frames
  } = state;
  const currentStack = getDrawerStack(frames, frameId);
  if (isDrawerAlreadyAtTop(currentStack, type, data)) {
    return {};
  }
  const newItem = {
    type,
    data
  };
  const newStack = [...currentStack, newItem];
  const updatedFrames = updateDrawerStack(frames, frameId, newStack);
  return {
    frames: updatedFrames
  };
};
const replaceDrawerContent = (frameId, type, data) => state => {
  const {
    frames
  } = state;
  const currentStack = getDrawerStack(frames, frameId);
  const newStack = currentStack.map((drawer, index) => {
    if (drawer.type === type && index === currentStack.length - 1) {
      return Object.assign({}, drawer, {
        data
      });
    }
    return drawer;
  });
  const updatedFrames = updateDrawerStack(frames, frameId, newStack);
  return {
    frames: updatedFrames
  };
};
const removeDrawerFromStack = frameId => state => {
  const {
    frames
  } = state;
  const currentStack = getDrawerStack(frames, frameId);
  const newStack = currentStack.length > 0 ? currentStack.slice(0, -1) : [];
  const updatedFrames = updateDrawerStack(frames, frameId, newStack);
  return {
    frames: updatedFrames
  };
};
const hasKey = (obj, key) => {
  return key in obj;
};
const clearDrawersFromStack = (frameId, filter) => state => {
  const {
    frames
  } = state;
  const currentStack = getDrawerStack(frames, frameId);
  if (!filter) {
    const _updatedFrames = updateDrawerStack(frames, frameId, []);
    return {
      frames: _updatedFrames
    };
  }
  const filteredStack = currentStack.filter(drawer => {
    if (filter.data) {
      for (const key in filter.data) {
        if (drawer.data && hasKey(drawer.data, key) && hasKey(filter.data, key) && drawer.data[key] === filter.data[key]) {
          return false;
        }
      }
    }
    return true;
  });
  const updatedFrames = updateDrawerStack(frames, frameId, filteredStack);
  return {
    frames: updatedFrames
  };
};
const getDrawerStack = (frames, frameId) => {
  const frame = frames.find(frame => {
    const {
      id
    } = frame;
    return id === frameId;
  });
  return frame ? frame.roleData.drawerStack : [];
};
const updateDrawerStack = (frames, frameId, newStack) => {
  return frames.map(frame => {
    if (frame.id === frameId) {
      return Object.assign({}, frame, {
        roleData: Object.assign({}, frame.roleData, {
          drawerStack: newStack
        })
      });
    }
    return frame;
  });
};
const isDrawerAlreadyAtTop = (stack, type, data) => {
  const lastItem = stack[stack.length - 1];
  return lastItem && lastItem.type === type && lodash_isequal__WEBPACK_IMPORTED_MODULE_0___default()(lastItem.data, data);
};

/***/ }),

/***/ "../../libs/store/src/lib/slices/eventTypes/eventTypesSelectors.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   editInternalNoteSelector: () => (/* binding */ editInternalNoteSelector),
/* harmony export */   eventTypeByIdSelector: () => (/* binding */ eventTypeByIdSelector),
/* harmony export */   eventTypesSelector: () => (/* binding */ eventTypesSelector),
/* harmony export */   fetchEventTypesSelector: () => (/* binding */ fetchEventTypesSelector),
/* harmony export */   isLoadingEventTypesSelector: () => (/* binding */ isLoadingEventTypesSelector),
/* harmony export */   markEventTypeRecentlyUsedSelector: () => (/* binding */ markEventTypeRecentlyUsedSelector),
/* harmony export */   profileByIdSelector: () => (/* binding */ profileByIdSelector),
/* harmony export */   profilesSelector: () => (/* binding */ profilesSelector),
/* harmony export */   recentlyUsedEventTypesSelector: () => (/* binding */ recentlyUsedEventTypesSelector),
/* harmony export */   toggleFavoriteEventTypeSelector: () => (/* binding */ toggleFavoriteEventTypeSelector),
/* harmony export */   toggleFavoriteProfileSelector: () => (/* binding */ toggleFavoriteProfileSelector)
/* harmony export */ });
const fetchEventTypesSelector = state => state.fetchEventTypes;
const toggleFavoriteEventTypeSelector = state => state.toggleFavoriteEventType;
const toggleFavoriteProfileSelector = state => state.toggleFavoriteProfile;
const editInternalNoteSelector = state => state.editInternalNote;
const eventTypesSelector = state => state.eventTypes;
const profilesSelector = state => state.profiles;
const isLoadingEventTypesSelector = state => state.loadingEventTypes;
const markEventTypeRecentlyUsedSelector = state => state.markEventTypeRecentlyUsed;
const recentlyUsedEventTypesSelector = state => state.recentlyUsedEventTypes;
const eventTypeByIdSelector = (state, id) => {
  var _state$eventTypes$ent;
  if (!id) {
    return null;
  }
  return (_state$eventTypes$ent = state.eventTypes.entities[id]) != null ? _state$eventTypes$ent : null;
};
const profileByIdSelector = (state, id) => {
  var _state$profiles$entit;
  if (!id) {
    return null;
  }
  return (_state$profiles$entit = state.profiles.entities[id]) != null ? _state$profiles$entit : null;
};

/***/ }),

/***/ "../../libs/store/src/lib/slices/eventTypes/eventTypesSlice.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createEventTypesSlice: () => (/* binding */ createEventTypesSlice)
/* harmony export */ });
/* harmony import */ var immer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/immer/dist/immer.mjs");
/* harmony import */ var luxon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/luxon/src/luxon.js");
/* harmony import */ var normalizr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/normalizr/dist/normalizr.es.js");



const eventTypeSchema = new normalizr__WEBPACK_IMPORTED_MODULE_1__.schema.Entity('eventTypes', {
  profile: new normalizr__WEBPACK_IMPORTED_MODULE_1__.schema.Entity('profiles')
});
const defaultEventTypesState = {
  recentlyUsedEventTypes: [],
  eventTypes: {
    ids: [],
    entities: {}
  },
  profiles: {
    ids: [],
    entities: {}
  },
  loadingEventTypes: false,
  lastFetchedAt: null
};
const createEventTypesSlice = (set, get, api) => Object.assign({}, defaultEventTypesState, {
  purgeEventTypes: () => {
    set(Object.assign({}, defaultEventTypesState));
  },
  fetchEventTypes: async () => {
    const platform = api.platformMiddleware.getPlatform().platform;
    const {
      loadingEventTypes,
      lastFetchedAt
    } = get();
    const currentDate = luxon__WEBPACK_IMPORTED_MODULE_0__.DateTime.now();

    // We load all event types at the same time
    // This is to prevent running this action simultaneously while ETs are still being loaded
    if (loadingEventTypes && lastFetchedAt) {
      const lastFetchedAtDate = luxon__WEBPACK_IMPORTED_MODULE_0__.DateTime.fromISO(lastFetchedAt);
      // Failsafe check to prevent a scenario where ETs are never fetched again
      const diffMinutes = currentDate.diff(lastFetchedAtDate).as('minutes');
      if (Math.abs(diffMinutes) < 3) return;
    }
    set({
      loadingEventTypes: true,
      lastFetchedAt: currentDate.toISO()
    });
    const eventTypesResponse = await platform.calendlyApi.getPaginatedEventTypes(1, 50);
    let collection = eventTypesResponse.collection;
    const pagination = eventTypesResponse.pagination;
    let nextpage = 2;
    const allEventPromises = [];
    while (nextpage <= pagination.total_pages) {
      allEventPromises.push(platform.calendlyApi.getPaginatedEventTypes(nextpage));
      nextpage = nextpage + 1;
    }
    const allResponses = await Promise.all(allEventPromises);
    allResponses.forEach(r => {
      collection = collection.concat(r.collection);
    });
    collection = collection.map(c => {
      var _c$profile;
      return Object.assign({}, c, {
        owner_id: (_c$profile = c.profile) == null ? void 0 : _c$profile.owner_id
      });
    });
    const normalized = (0,normalizr__WEBPACK_IMPORTED_MODULE_1__.normalize)(collection, [eventTypeSchema]);
    const allApiEventTypes = normalized.entities['eventTypes'];
    const allApiProfiles = normalized.entities['profiles'];
    set((0,immer__WEBPACK_IMPORTED_MODULE_2__.produce)(get(), draft => {
      if (allApiEventTypes) {
        draft.eventTypes.entities = allApiEventTypes;
        draft.eventTypes.ids = Object.keys(allApiEventTypes);
      } else {
        draft.eventTypes.entities = {};
        draft.eventTypes.ids = [];
      }
      if (allApiProfiles) {
        draft.profiles.entities = allApiProfiles;
        draft.profiles.ids = Object.keys(allApiProfiles);
      } else {
        draft.profiles.entities = {};
        draft.profiles.ids = [];
      }
      draft.loadingEventTypes = false;
    }));
    // Handle updating recentlyUsed ETs on fetch
    // 1. Don't allow deleted ETs to remain in list
    // 2. Fill up empty slots as needed
    const state = get();
    const validRecentlyUsed = state.recentlyUsedEventTypes.filter(ruET => {
      var _state$eventTypes$ent;
      return state.eventTypes.ids.includes(ruET.id) && ((_state$eventTypes$ent = state.eventTypes.entities[ruET.id]) == null ? void 0 : _state$eventTypes$ent.active);
    } // 1.
    );

    const validReplacements = state.eventTypes.ids.filter(id => {
      var _state$eventTypes$ent2;
      return (_state$eventTypes$ent2 = state.eventTypes.entities[id]) == null ? void 0 : _state$eventTypes$ent2.active;
    });
    while (validRecentlyUsed.length < 3 && validReplacements.length > validRecentlyUsed.length) {
      const newValidETId = validReplacements.find(etId => validRecentlyUsed.find(ruEt => ruEt.id === etId) === undefined);
      if (newValidETId) {
        const etToAdd = state.eventTypes.entities[newValidETId];
        if (etToAdd) {
          validRecentlyUsed.push(etToAdd);
        }
      }
    }
    set({
      recentlyUsedEventTypes: validRecentlyUsed
    });
  },
  markEventTypeRecentlyUsed: id => {
    const currentRecentlyUsed = [...get().recentlyUsedEventTypes];
    const targetEt = get().eventTypes.entities[id];
    const existing = currentRecentlyUsed.find(et => et.id === id);
    if (existing || !targetEt) return; // Don't allow double adding or empty entry

    currentRecentlyUsed.unshift(targetEt);
    while (currentRecentlyUsed.length > 3) {
      currentRecentlyUsed.pop(); // limit to 3
    }

    set({
      recentlyUsedEventTypes: currentRecentlyUsed
    });
  },
  toggleFavoriteEventType: id => {
    set((0,immer__WEBPACK_IMPORTED_MODULE_2__.produce)(get(), draft => {
      const et = draft.eventTypes.entities[id];
      if (et) {
        et.starred = !et.starred;
      }
    }));
  },
  toggleFavoriteProfile: id => {
    set((0,immer__WEBPACK_IMPORTED_MODULE_2__.produce)(get(), draft => {
      const profile = draft.profiles.entities[id];
      if (profile) {
        profile.starred = !profile.starred;
      }
    }));
  },
  editInternalNote: (id, note) => {
    set((0,immer__WEBPACK_IMPORTED_MODULE_2__.produce)(get(), draft => {
      const et = draft.eventTypes.entities[id];
      if (et) {
        et.internal_note = note;
      }
    }));
  }
});

/***/ }),

/***/ "../../libs/store/src/lib/slices/featureFlags/featureFlagsSlice.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FeatureFlagName: () => (/* binding */ FeatureFlagName),
/* harmony export */   createFeatureFlagsSlice: () => (/* binding */ createFeatureFlagsSlice)
/* harmony export */ });
/* harmony import */ var immer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/immer/dist/immer.mjs");

let FeatureFlagName = /*#__PURE__*/function (FeatureFlagName) {
  FeatureFlagName["invitee_experience_extension_hrr"] = "invitee_experience_extension_hrr";
  FeatureFlagName["meeting_intelligence"] = "meeting_intelligence";
  FeatureFlagName["clients_gcal_meeting_intel_feature"] = "clients_gcal_meeting_intel_feature";
  FeatureFlagName["clients_q3_et_cards_sul_feature"] = "clients_q3_et_cards_sul_feature";
  FeatureFlagName["clients_meeting_intel_feature"] = "clients_meeting_intel_feature";
  return FeatureFlagName;
}({});
const defaultFeatureFlags = {
  [FeatureFlagName.invitee_experience_extension_hrr]: {
    name: FeatureFlagName.invitee_experience_extension_hrr,
    enabled: false,
    loading: false,
    last_checked: null
  },
  [FeatureFlagName.clients_q3_et_cards_sul_feature]: {
    name: FeatureFlagName.clients_q3_et_cards_sul_feature,
    enabled: false,
    loading: false,
    last_checked: null
  },
  [FeatureFlagName.meeting_intelligence]: {
    name: FeatureFlagName.meeting_intelligence,
    enabled: false,
    loading: false,
    last_checked: null
  },
  [FeatureFlagName.clients_gcal_meeting_intel_feature]: {
    name: FeatureFlagName.clients_gcal_meeting_intel_feature,
    enabled: false,
    loading: false,
    last_checked: null
  },
  [FeatureFlagName.clients_meeting_intel_feature]: {
    name: FeatureFlagName.clients_meeting_intel_feature,
    enabled: false,
    loading: false,
    last_checked: null
  }
};
function isFiveMinutesOld(unixTimestamp) {
  const start = Number(unixTimestamp);
  const millis = Date.now() - start;
  return Math.floor(millis / 1000) > 300;
}
const createFeatureFlagsSlice = (set, get, api) => ({
  flags: defaultFeatureFlags,
  checkFlag: async (name, analytics = false) => {
    const state = get();
    let flagData = state.flags[name];
    const loggedIn = state.user !== null;
    if (!flagData) {
      flagData = defaultFeatureFlags[name];
      set((0,immer__WEBPACK_IMPORTED_MODULE_0__.produce)(get(), draft => {
        draft.flags[name] = flagData;
      }));
    }
    if (!loggedIn || flagData.loading || !isFiveMinutesOld(flagData.last_checked || '0')) {
      // Do not allow checks when loggedout
      // Avoid pounding this endpoint - assume 5 minutes is reasonable.
      return;
    }
    const platform = api.platformMiddleware.getPlatform().platform;
    set((0,immer__WEBPACK_IMPORTED_MODULE_0__.produce)(get(), draft => {
      draft.flags[name].loading = true;
    }));
    const flag = await platform.calendlyApi.getFlag(name, analytics);
    set((0,immer__WEBPACK_IMPORTED_MODULE_0__.produce)(get(), draft => {
      draft.flags[name].loading = false;
      draft.flags[name].enabled = flag.resource.enabled;
      draft.flags[name].last_checked = String(Date.now());
    }));
  },
  purgeFlags: () => {
    set({
      flags: defaultFeatureFlags
    });
  }
});

/***/ }),

/***/ "../../libs/store/src/lib/slices/frames/framesSelector.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   agendaFrameTabSelector: () => (/* binding */ agendaFrameTabSelector)
/* harmony export */ });
/* harmony import */ var _framesSlice__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../libs/store/src/lib/slices/frames/framesSlice.ts");

const agendaFrameTabSelector = (uiState, frameId) => {
  const frame = uiState.frames.find(f => f.id === frameId);
  return frame && (0,_framesSlice__WEBPACK_IMPORTED_MODULE_0__.isFrameRole)(frame, 'agenda_view') && frame.roleData.tab ? frame.roleData.tab : null;
};

/***/ }),

/***/ "../../libs/store/src/lib/slices/frames/framesSlice.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BottomSheetType: () => (/* binding */ BottomSheetType),
/* harmony export */   createFramesSlice: () => (/* binding */ createFramesSlice),
/* harmony export */   isFrameRole: () => (/* binding */ isFrameRole)
/* harmony export */ });
/* harmony import */ var _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../@calendly/ui/dist/theme.js");
/* harmony import */ var immer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/immer/dist/immer.mjs");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var _client_core_theme__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../libs/theme/src/index.ts");




let BottomSheetType = /*#__PURE__*/function (BottomSheetType) {
  BottomSheetType["TimezonePicker"] = "TimezonePicker";
  BottomSheetType["OfferAvailability"] = "Offer availability";
  BottomSheetType["TimeSlotsPicker"] = "TimeSlotsPicker";
  return BottomSheetType;
}({});
function isFrameRole(frame, role) {
  return frame.role === role;
}
const createFramesSlice = (set, get) => ({
  frames: [],
  makeFrame: (id, tabId, parentSelector, styles, role, roleData) => {
    get().setFrames([...get().frames, {
      id,
      parentSelector,
      styles,
      tabId,
      role,
      roleData
    }]);
  },
  addFrame: frame => {
    get().setFrames([...get().frames, frame]);
  },
  removeFrames: ids => {
    get().setFrames(get().frames.filter(f => f.id && !ids.includes(f.id)));
  },
  setFrames: frames => {
    set({
      frames: [...frames]
    });
  },
  addAgendaFrame: (tabId, custom) => {
    const toKeep = get().frames.filter(f => !['sidebar', 'agenda_view'].includes(f.role));
    get().setFrames([...toKeep, Object.assign({}, makeAgendaView(tabId), custom)]);
  },
  addAlertFrame: (tabId, alert) => {
    // If an alert is already showing, close it down to avoid multiple alert frames
    const alertFrame = get().frames.find(f => f.tabId === tabId && f.role === 'alert');
    if (alertFrame) {
      get().removeFrame(alertFrame.id);
    }
    get().setFrames([...get().frames, makeAlert(tabId, alert)]);
  },
  addPopupFrame: (tabId, popup) => {
    const toKeep = get().frames.filter(f => f.role !== 'popup');
    get().setFrames([...toKeep, makePopup(tabId, popup)]);
  },
  removeFrame: frameId => {
    get().setFrames([...get().frames.filter(f => f.id !== frameId)]);
  },
  updateFrame: (frameId, update) => {
    const current = get();
    const next = (0,immer__WEBPACK_IMPORTED_MODULE_2__.produce)(current, draft => {
      draft.frames = draft.frames.map(f => {
        if (f.id !== frameId) {
          return f;
        } else {
          return Object.assign({}, f, update);
        }
      });
    });
    set(next);
  }
});
function makeAgendaView(tabId) {
  return {
    id: (0,uuid__WEBPACK_IMPORTED_MODULE_3__["default"])(),
    tabId,
    role: 'agenda_view',
    roleData: {
      drawerStack: []
    },
    parentSelector: 'body',
    styles: {
      display: 'inline',
      border: `1px solid ${_calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.colorGrey3}`,
      zIndex: '2000000001',
      background: '#fff',
      position: 'fixed',
      width: '380px',
      height: 'calc(100% - 24px)',
      top: '0',
      right: '0',
      bottom: '0',
      colorScheme: 'auto',
      borderRadius: '24px',
      boxSizing: 'border-box',
      margin: '12px 12px 12px 0',
      boxShadow: _client_core_theme__WEBPACK_IMPORTED_MODULE_1__.agendaViewShadow
    }
  };
}
function makeAlert(tabId, alert) {
  return {
    id: (0,uuid__WEBPACK_IMPORTED_MODULE_3__["default"])(),
    tabId,
    role: 'alert',
    roleData: alert,
    parentSelector: 'body',
    styles: {
      position: 'fixed',
      top: '32px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: '2000000001',
      width: '100%',
      height: '56px',
      border: '0'
    }
  };
}
function makePopup(tabId, popupArgs) {
  return {
    id: (0,uuid__WEBPACK_IMPORTED_MODULE_3__["default"])(),
    tabId,
    role: 'popup',
    roleData: popupArgs,
    parentSelector: 'body',
    styles: Object.assign({
      position: 'fixed',
      zIndex: '2000000000',
      right: '400px',
      bottom: '12px',
      width: '456px',
      height: '238px'
    }, popupArgs.frameStyle)
  };
}

/***/ }),

/***/ "../../libs/store/src/lib/slices/integrations/integrationsSelectors.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearIntegrationNewStatusSelector: () => (/* binding */ clearIntegrationNewStatusSelector),
/* harmony export */   gmailLegacyBarSelector: () => (/* binding */ gmailLegacyBarSelector),
/* harmony export */   gmailPopoverComposeIdSelector: () => (/* binding */ gmailPopoverComposeIdSelector),
/* harmony export */   gmailShowingComposePopoverSelector: () => (/* binding */ gmailShowingComposePopoverSelector),
/* harmony export */   gongPopoverComposeIdSelector: () => (/* binding */ gongPopoverComposeIdSelector),
/* harmony export */   gongShowingComposePopoverSelector: () => (/* binding */ gongShowingComposePopoverSelector),
/* harmony export */   hasNewIntegrationsSelector: () => (/* binding */ hasNewIntegrationsSelector),
/* harmony export */   linkedinPopoverComposeIdSelector: () => (/* binding */ linkedinPopoverComposeIdSelector),
/* harmony export */   linkedinShowingComposePopoverSelector: () => (/* binding */ linkedinShowingComposePopoverSelector),
/* harmony export */   newIntegrationIdsSelector: () => (/* binding */ newIntegrationIdsSelector),
/* harmony export */   updatePopoverDataSelector: () => (/* binding */ updatePopoverDataSelector)
/* harmony export */ });
/* harmony import */ var _integrationsSlice__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../libs/store/src/lib/slices/integrations/integrationsSlice.ts");

const showingLegacyBarSelector = id => {
  const selector = state => {
    const int = state.integrations[id];
    if (!int.popoverData || !int.popoverData.showBar) return false;
    return int.popoverData.showBar;
  };
  return selector;
};
const showingPopoverSelector = id => {
  const selector = state => {
    const int = state.integrations[id];
    if (!int.popoverData || !int.popoverData.showPopover) return false;
    return int.popoverData.showPopover;
  };
  return selector;
};
const popoverComposeIdSelector = id => {
  const selector = state => {
    const int = state.integrations[id];
    if (!int.popoverData || !int.popoverData.popoverComposeId) return undefined;
    return int.popoverData.popoverComposeId;
  };
  return selector;
};
const newIntegrationIdsSelector = state => {
  return Object.keys(state.integrations).filter(id => {
    const integrationId = id;
    return state.integrations[integrationId].showNewBadge;
  });
};
const hasNewIntegrationsSelector = state => {
  return newIntegrationIdsSelector(state).length > 0;
};
const clearIntegrationNewStatusSelector = state => {
  return state.clearIntegrationNewStatus;
};
const updatePopoverDataSelector = state => state.updatePopoverData;
const gmailLegacyBarSelector = showingLegacyBarSelector(_integrationsSlice__WEBPACK_IMPORTED_MODULE_0__.IntegrationId.gmailv1);
const gmailShowingComposePopoverSelector = showingPopoverSelector(_integrationsSlice__WEBPACK_IMPORTED_MODULE_0__.IntegrationId.gmailv1);
const gmailPopoverComposeIdSelector = popoverComposeIdSelector(_integrationsSlice__WEBPACK_IMPORTED_MODULE_0__.IntegrationId.gmailv1);
const linkedinShowingComposePopoverSelector = showingPopoverSelector(_integrationsSlice__WEBPACK_IMPORTED_MODULE_0__.IntegrationId.linkedinv1);
const linkedinPopoverComposeIdSelector = popoverComposeIdSelector(_integrationsSlice__WEBPACK_IMPORTED_MODULE_0__.IntegrationId.linkedinv1);
const gongShowingComposePopoverSelector = showingPopoverSelector(_integrationsSlice__WEBPACK_IMPORTED_MODULE_0__.IntegrationId.gongv1);
const gongPopoverComposeIdSelector = popoverComposeIdSelector(_integrationsSlice__WEBPACK_IMPORTED_MODULE_0__.IntegrationId.gongv1);

/***/ }),

/***/ "../../libs/store/src/lib/slices/integrations/integrationsSlice.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IntegrationId: () => (/* binding */ IntegrationId),
/* harmony export */   createIntegrationsSlice: () => (/* binding */ createIntegrationsSlice)
/* harmony export */ });
/* harmony import */ var immer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/immer/dist/immer.mjs");

let IntegrationId = /*#__PURE__*/function (IntegrationId) {
  IntegrationId["gcalv1"] = "gcalv1";
  IntegrationId["gmailv1"] = "gmailv1";
  IntegrationId["linkedinv1"] = "linkedinv1";
  IntegrationId["gongv1"] = "gongv1";
  return IntegrationId;
}({});
const defaultIntegrations = {
  [IntegrationId.gmailv1]: {
    id: IntegrationId.gmailv1,
    title: 'Gmail',
    description: 'Access Calendly and share meeting links directly from Gmail.',
    showNewBadge: false,
    enabled: true,
    permitted: true,
    helpInfo: {
      chrome: 'https://help.calendly.com/hc/en-us/articles/10148720238871-Using-the-Calendly-extension-for-Gmail#using-the-calendly-extension-for-gmail-0-0',
      firefox: 'https://help.calendly.com/hc/en-us/articles/10148720238871-Using-the-Calendly-extension-for-Gmail#using-the-calendly-extension-for-gmail-0-0'
    },
    analytics: {
      onEnable: 'extension_integrations.enable_gmail',
      onDisable: 'extension_integrations.disable_gmail'
    },
    popoverData: {
      showPopover: false,
      popoverComposeId: undefined,
      showBar: false
    }
  },
  [IntegrationId.gongv1]: {
    id: IntegrationId.gongv1,
    title: 'Gong',
    description: 'Access Calendly and share meeting links directly from Gong.',
    showNewBadge: false,
    enabled: true,
    permitted: true,
    helpInfo: {
      chrome: 'https://help.calendly.com/hc/en-us/articles/15254486497943',
      firefox: 'https://help.calendly.com/hc/en-us/articles/15254486497943'
    },
    analytics: {
      onEnable: 'extension_integrations.enable_gong',
      onDisable: 'extension_integrations.disable_gong'
    },
    popoverData: {
      showPopover: false,
      popoverComposeId: undefined
    }
  },
  [IntegrationId.gcalv1]: {
    id: IntegrationId.gcalv1,
    // Content script Id, used for registering/unregistering https://developer.chrome.com/docs/extensions/reference/scripting
    title: 'Google Calendar',
    description: 'View and manage Calendly events in Google Calendar.',
    showNewBadge: false,
    enabled: true,
    permitted: true,
    helpInfo: {
      chrome: 'https://help.calendly.com/hc/en-us/articles/10636762934679#using-the-calendly-extension-for-google-calendar-0-0',
      firefox: 'https://help.calendly.com/hc/en-us/articles/10636762934679#using-the-calendly-extension-for-google-calendar-0-0'
    },
    analytics: {
      onEnable: 'extension_integrations.enable_gcal',
      onDisable: 'extension_integrations.disable_gcal'
    },
    popoverData: {
      showPopover: false,
      popoverComposeId: undefined
    }
  },
  [IntegrationId.linkedinv1]: {
    id: IntegrationId.linkedinv1,
    title: 'LinkedIn Messaging',
    description: 'Get meetings booked quickly right from where you message people on LinkedIn.',
    showNewBadge: false,
    enabled: true,
    permitted: true,
    helpInfo: {
      chrome: 'https://help.calendly.com/hc/en-us/articles/4500734570263-Calendly-for-LinkedIn-Messaging-Extension-',
      firefox: 'https://help.calendly.com/hc/en-us/articles/4500734570263-Calendly-for-LinkedIn-Messaging-Extension-'
    },
    analytics: {
      onEnable: 'extension_integrations.enable_linkedin',
      onDisable: 'extension_integrations.disable_linkedin'
    },
    popoverData: {
      showPopover: false,
      popoverComposeId: undefined
    }
  }
};
const createIntegrationsSlice = (set, get, api) => ({
  integrations: defaultIntegrations,
  purgeIntegrationData: () => {
    set({
      integrations: defaultIntegrations
    });
  },
  enableIntegration: id => {
    const current = get();
    const next = (0,immer__WEBPACK_IMPORTED_MODULE_0__.produce)(current, draft => {
      draft.integrations[id].enabled = true;
    });
    set(next);
  },
  disableIntegration: id => {
    const current = get();
    const next = (0,immer__WEBPACK_IMPORTED_MODULE_0__.produce)(current, draft => {
      draft.integrations[id].enabled = false;
    });
    set(next);
  },
  clearIntegrationNewStatus: () => {
    set((0,immer__WEBPACK_IMPORTED_MODULE_0__.produce)(get(), draft => {
      Object.keys(draft.integrations).forEach(key => {
        const intId = key;
        draft.integrations[intId].showNewBadge = false;
      });
    }));
  },
  updateIntegration: integration => {
    const current = get();
    const next = (0,immer__WEBPACK_IMPORTED_MODULE_0__.produce)(current, draft => {
      draft.integrations[integration.id] = Object.assign({}, draft.integrations[integration.id], integration);
    });
    set(next);
  },
  updatePopoverData(id, pd) {
    set((0,immer__WEBPACK_IMPORTED_MODULE_0__.produce)(get(), draft => {
      draft.integrations[id].popoverData = Object.assign({}, draft.integrations[id].popoverData, pd);
    }));
  }
});

/***/ }),

/***/ "../../libs/store/src/lib/slices/keywordDetection/keywordDetectionSlice.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createKeywordDetectionSlice: () => (/* binding */ createKeywordDetectionSlice)
/* harmony export */ });
/* harmony import */ var luxon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/luxon/src/luxon.js");

const createKeywordDetectionSlice = (set, get, api) => ({
  keywordDetectionEnabled: true,
  setKeywordDetectionEnabled: enabled => {
    set({
      keywordDetectionEnabled: enabled
    });
  },
  keywordDetectionPhrases: [],
  phrasesLastFetchedAt: null,
  fetchKeywordDetectionPhrases: async () => {
    const platform = api.platformMiddleware.getPlatform().platform;
    const {
      phrasesLastFetchedAt
    } = get();
    const currentDate = luxon__WEBPACK_IMPORTED_MODULE_0__.DateTime.now();
    if (phrasesLastFetchedAt) {
      const phrasesLastFetchedAtDate = luxon__WEBPACK_IMPORTED_MODULE_0__.DateTime.fromISO(phrasesLastFetchedAt);
      // Failsafe check to prevent a scenario where ETs are never fetched again
      const diffMinutes = currentDate.diff(phrasesLastFetchedAtDate).as('minutes');
      if (Math.abs(diffMinutes) < 3) return;
    }
    try {
      const response = await platform.calendlyApi.getKeywordDetectionPhrases();
      if (response != null && response['phrases']) {
        set({
          keywordDetectionPhrases: response['phrases'],
          phrasesLastFetchedAt: currentDate.toISO()
        });
      }
    } catch (e) {
      // Keep using what's in state, try refetching after 3 minutes
      set({
        phrasesLastFetchedAt: currentDate.toISO()
      });
    }
  }
});

/***/ }),

/***/ "../../libs/store/src/lib/slices/modal/modalSelectors.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModalSelector: () => (/* binding */ closeModalSelector),
/* harmony export */   openModalSelector: () => (/* binding */ openModalSelector),
/* harmony export */   openedModalSelector: () => (/* binding */ openedModalSelector)
/* harmony export */ });
/* harmony import */ var _frames_framesSlice__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../libs/store/src/lib/slices/frames/framesSlice.ts");

const openedModalSelector = (state, frameId) => {
  const frame = state.frames.find(f => f.id === frameId);
  return frame && (0,_frames_framesSlice__WEBPACK_IMPORTED_MODULE_0__.isFrameRole)(frame, 'agenda_view') ? frame == null ? void 0 : frame.roleData.modal : undefined;
};
const openModalSelector = state => state.openModal;
const closeModalSelector = state => state.closeModal;

/***/ }),

/***/ "../../libs/store/src/lib/slices/modal/modalSlice.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ModalType: () => (/* binding */ ModalType),
/* harmony export */   createModalSlice: () => (/* binding */ createModalSlice)
/* harmony export */ });
let ModalType = /*#__PURE__*/function (ModalType) {
  ModalType["AtteSuccessModal"] = "atte_success_modal";
  ModalType["CopySingleUseLink"] = "copy_single_use_link_modal";
  return ModalType;
}({});
const createModalSlice = (set, get) => ({
  openModal: (frameId, type, data) => {
    set(addModalToFrame(frameId, type, data));
  },
  closeModal: frameId => {
    set(removeModalFromFrame(frameId));
  }
});
const addModalToFrame = (frameId, type, data) => state => {
  return {
    frames: state.frames.map(frame => {
      if (frame.id === frameId) {
        return Object.assign({}, frame, {
          roleData: Object.assign({}, frame.roleData, {
            modal: {
              type,
              data
            }
          })
        });
      }
      return frame;
    })
  };
};
const removeModalFromFrame = frameId => state => {
  return {
    frames: state.frames.map(frame => {
      if (frame.id === frameId) {
        return Object.assign({}, frame, {
          roleData: Object.assign({}, frame.roleData, {
            modal: undefined
          })
        });
      }
      return frame;
    })
  };
};

/***/ }),

/***/ "../../libs/store/src/lib/slices/optibutton/optibuttonSlice.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createOptibuttonSlice: () => (/* binding */ createOptibuttonSlice)
/* harmony export */ });
const createOptibuttonSlice = (set, get, api) => ({
  isClosed: false,
  wallspot: {
    wall: 'right',
    spot: 150
  },
  saveState: (wallspot, closed) => {
    set({
      isClosed: closed,
      wallspot
    });
  },
  setIsFloatingButtonClosed: closed => {
    set({
      isClosed: closed
    });
  },
  setWallSpot: wallspot => {
    set({
      wallspot
    });
  }
});

/***/ }),

/***/ "../../libs/store/src/lib/slices/settings/settingsSelectors.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   changeDefaultLegacyViewSelector: () => (/* binding */ changeDefaultLegacyViewSelector),
/* harmony export */   defaultLegacyViewSelector: () => (/* binding */ defaultLegacyViewSelector)
/* harmony export */ });
const changeDefaultLegacyViewSelector = state => state.changeDefaultLegacySidebarView;
const defaultLegacyViewSelector = state => state.defaultLegacySidebarView;

/***/ }),

/***/ "../../libs/store/src/lib/slices/settings/settingsSlice.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createSettingsSlice: () => (/* binding */ createSettingsSlice)
/* harmony export */ });
const createSettingsSlice = (set, get, api) => ({
  defaultView: 'agenda_view',
  agendaViewTab: 'meetings',
  defaultLegacySidebarView: 'all',
  isUpdate: false,
  changeDefaultLegacySidebarView: view => {
    set({
      defaultLegacySidebarView: view
    });
  },
  changeDefaultView: def => {
    set({
      defaultView: def
    });
  },
  changeAgendaViewTab: (def, frameId) => {
    set(state => {
      const {
        frames: existingFrames
      } = state;
      const frames = existingFrames.map(frame => {
        if (frame.id === frameId) {
          return Object.assign({}, frame, {
            roleData: Object.assign({}, frame.roleData, {
              tab: def
            })
          });
        }
        return frame;
      });
      return {
        frames,
        agendaViewTab: def
      };
    });
  },
  setIsUpdate() {
    set({
      isUpdate: true,
      agendaViewTab: 'event_types'
    });
  }
});

/***/ }),

/***/ "../../libs/store/src/lib/slices/user/userSelectors.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hasDataSelector: () => (/* binding */ hasDataSelector),
/* harmony export */   loginSelector: () => (/* binding */ loginSelector),
/* harmony export */   logoutSelector: () => (/* binding */ logoutSelector),
/* harmony export */   setUserTokenSelector: () => (/* binding */ setUserTokenSelector),
/* harmony export */   userLoadedSelector: () => (/* binding */ userLoadedSelector),
/* harmony export */   userSelector: () => (/* binding */ userSelector),
/* harmony export */   userTokenSelector: () => (/* binding */ userTokenSelector)
/* harmony export */ });
const logoutSelector = state => state.logout;
const loginSelector = state => state.login;
const userSelector = state => state.user;
const userLoadedSelector = state => state.userLoaded;
const hasDataSelector = state => Object.keys(state.events).length > 0 || Object.keys(state.eventTypes).length > 0 || state.contacts.ids.length > 0;
const userTokenSelector = state => state.userToken;
const setUserTokenSelector = state => state.setUserToken;

/***/ }),

/***/ "../../libs/store/src/lib/slices/user/userSlice.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createUserSlice: () => (/* binding */ createUserSlice)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/axios/index.js");

const createUserSlice = (set, get, api) => ({
  purge: () => {
    const platform = api.platformMiddleware.getPlatform().platform;
    const {
      purgeAgenda,
      purgeEventTypes,
      purgeContacts,
      purgeUser,
      purgeFlags,
      purgeIntegrationData
    } = get();
    purgeAgenda();
    purgeEventTypes();
    purgeContacts();
    purgeUser();
    purgeFlags();
    purgeIntegrationData();
    platform.scheduledEvents.purge();
  },
  user: null,
  userLoaded: false,
  userToken: null,
  userLastUsed: null,
  loginWindowId: undefined,
  setLoginWindowId: w => {
    set({
      loginWindowId: w
    });
  },
  setUserLastUsed: t => {
    set({
      userLastUsed: t
    });
  },
  setUserToken: t => {
    set({
      userToken: t
    });
  },
  organization: null,
  logout: async () => {
    const platform = api.platformMiddleware.getPlatform().platform;
    platform.analytics.track('extension_logout.click');
    try {
      await platform.flow.logout();
      get().purge();
    } catch (e) {
      if (e !== 'user exited process') console.error(e);
    }
  },
  purgeUser: () => {
    set({
      user: null,
      userToken: null
    });
  },
  login: async () => {
    const platform = api.platformMiddleware.getPlatform().platform;
    await platform.flow.login(get().loginWindowId, get().setLoginWindowId);
    const user = await platform.calendlyApi.getUser();
    set({
      user
    });
    return user;
  },
  updateUserStatus: async (silent = false) => {
    if (!silent) {
      set({
        userLoaded: false
      });
    }
    const platform = api.platformMiddleware.getPlatform().platform;
    try {
      const status = await platform.calendlyApi.getLoginStatus();
      if (status.loggedIn === false) {
        get().purge();
      }
      set({
        userLoaded: true,
        user: status.user
      });
    } catch (err) {
      if ((0,axios__WEBPACK_IMPORTED_MODULE_0__.isAxiosError)(err)) {
        if (err.status === 401) {
          get().logout();
        }
      } else {
        console.warn('Unexpected error loading user', err);
      }
      set({
        userLoaded: true
      });
    }
  }
});

/***/ }),

/***/ "../../libs/store/src/lib/store.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultStore: () => (/* binding */ defaultStore),
/* harmony export */   uiStore: () => (/* binding */ uiStore)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/zustand/esm/vanilla.mjs");
/* harmony import */ var zustand_middleware__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../node_modules/zustand/esm/middleware.mjs");
/* harmony import */ var _middleware__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../libs/store/src/lib/middleware.ts");
/* harmony import */ var _sharedStore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../libs/store/src/lib/sharedStore.ts");




const uiStore = (0,zustand__WEBPACK_IMPORTED_MODULE_2__.createStore)()((0,zustand_middleware__WEBPACK_IMPORTED_MODULE_3__.persist)((0,_middleware__WEBPACK_IMPORTED_MODULE_0__.PlatformMiddleware)(_sharedStore__WEBPACK_IMPORTED_MODULE_1__.uiStateCreator), {
  name: _sharedStore__WEBPACK_IMPORTED_MODULE_1__.UiStoreName,
  version: _sharedStore__WEBPACK_IMPORTED_MODULE_1__.UiStoreVersion,
  storage: (0,zustand_middleware__WEBPACK_IMPORTED_MODULE_3__.createJSONStorage)(() => localStorage)
}));
const defaultStore = (0,zustand__WEBPACK_IMPORTED_MODULE_2__.createStore)()((0,zustand_middleware__WEBPACK_IMPORTED_MODULE_3__.persist)((0,_middleware__WEBPACK_IMPORTED_MODULE_0__.PlatformMiddleware)(_sharedStore__WEBPACK_IMPORTED_MODULE_1__.dataStateCreator), {
  name: _sharedStore__WEBPACK_IMPORTED_MODULE_1__.DataStoreName,
  version: _sharedStore__WEBPACK_IMPORTED_MODULE_1__.DataStoreVersion,
  storage: (0,zustand_middleware__WEBPACK_IMPORTED_MODULE_3__.createJSONStorage)(() => localStorage)
}));

/***/ }),

/***/ "../../libs/store/src/lib/storeHooks.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useCombinedStore: () => (/* binding */ useCombinedStore),
/* harmony export */   useDataStore: () => (/* binding */ useDataStore),
/* harmony export */   useUiStore: () => (/* binding */ useUiStore)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _sharedStore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../libs/store/src/lib/sharedStore.ts");


const useCombinedStore = () => {
  const uiStore = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_sharedStore__WEBPACK_IMPORTED_MODULE_1__.UiStoreContext);
  const dataStore = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_sharedStore__WEBPACK_IMPORTED_MODULE_1__.DataStoreContext);
  if (!dataStore || !uiStore) {
    throw new Error('useCombinedStore must be used within a StoreProvider');
  }
  return {
    dataStore,
    uiStore
  };
};
const useDataStore = () => {
  const store = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_sharedStore__WEBPACK_IMPORTED_MODULE_1__.DataStoreContext);
  if (!store) {
    throw new Error('useDataStore must be used within a StoreProvider');
  }
  return store;
};
const useUiStore = () => {
  const store = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_sharedStore__WEBPACK_IMPORTED_MODULE_1__.UiStoreContext);
  if (!store) {
    throw new Error('useUiStore must be used within a StoreProvider');
  }
  return store;
};

/***/ }),

/***/ "../../libs/store/src/lib/storeTypes.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StoreNames: () => (/* binding */ StoreNames)
/* harmony export */ });
let StoreNames = /*#__PURE__*/function (StoreNames) {
  StoreNames["dataStore"] = "default_store";
  StoreNames["uiStore"] = "ui_store";
  return StoreNames;
}({});

// Middleware

/***/ }),

/***/ "../../libs/syncstore/src/index.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   connectProxyStores: () => (/* reexport safe */ _lib_storeMain__WEBPACK_IMPORTED_MODULE_1__.connectProxyStores),
/* harmony export */   createProxyStore: () => (/* reexport safe */ _lib_storeProxy__WEBPACK_IMPORTED_MODULE_2__.createProxyStore),
/* harmony export */   makeProxyStores: () => (/* reexport safe */ _lib_storeProxy__WEBPACK_IMPORTED_MODULE_2__.makeProxyStores),
/* harmony export */   sharedDataStore: () => (/* reexport safe */ _lib_syncStore__WEBPACK_IMPORTED_MODULE_0__.sharedDataStore),
/* harmony export */   sharedUiStore: () => (/* reexport safe */ _lib_syncStore__WEBPACK_IMPORTED_MODULE_0__.sharedUiStore)
/* harmony export */ });
/* harmony import */ var _lib_syncStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../libs/syncstore/src/lib/syncStore.ts");
/* harmony import */ var _lib_storeMain__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../libs/syncstore/src/lib/storeMain.ts");
/* harmony import */ var _lib_storeProxy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../libs/syncstore/src/lib/storeProxy.ts");




/***/ }),

/***/ "../../libs/syncstore/src/lib/storeConstants.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StoreMessages: () => (/* binding */ StoreMessages)
/* harmony export */ });
let StoreMessages = /*#__PURE__*/function (StoreMessages) {
  StoreMessages["proxyAction"] = "proxy_action_";
  StoreMessages["stateChange"] = "state_change_";
  StoreMessages["initStore"] = "init_store_";
  return StoreMessages;
}({});

/***/ }),

/***/ "../../libs/syncstore/src/lib/storeMain.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   connectProxyStores: () => (/* binding */ connectProxyStores)
/* harmony export */ });
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/webextension-polyfill/dist/browser-polyfill.js");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _storeConstants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../libs/syncstore/src/lib/storeConstants.ts");
/* eslint-disable @typescript-eslint/no-explicit-any */


const connectProxyStores = (name, store) => {
  store.subscribe(async (state, prevState) => {
    const tabs = await webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().tabs.query({
      active: true
    });
    if (tabs.length === 0) {
      // Prevent state parsing if there's no tab to be notified
      return;
    }
    let newState;

    // console.time('state_update');
    try {
      newState = JSON.parse(JSON.stringify(state));
    } catch (e) {
      return;
    }
    // console.timeEnd('state_update');
    tabs.forEach(t => {
      if (!t.id || !t.active || !newState) return;
      try {
        const port = webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().tabs.connect(t.id, {
          name: `${_storeConstants__WEBPACK_IMPORTED_MODULE_1__.StoreMessages.stateChange}${name}`
        });
        port.postMessage({
          newState
        });
      } catch (err) {
        // do nothing for now
      }
    });
  });
  webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().tabs.onActivated.addListener(async tab => {
    try {
      const port = webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().tabs.connect(tab.tabId, {
        name: `${_storeConstants__WEBPACK_IMPORTED_MODULE_1__.StoreMessages.stateChange}${name}`
      });
      const fullState = store.getState();
      port.postMessage({
        state: JSON.parse(JSON.stringify(fullState))
      });
    } catch (err) {
      console.log('something went wrong', err);
      // do nothing for now
    }
  });

  webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.onConnect.addListener(port => {
    if (port.name === `${_storeConstants__WEBPACK_IMPORTED_MODULE_1__.StoreMessages.proxyAction}${name}`) {
      port.onMessage.addListener(async msg => {
        if (msg.action_name && msg.action_args) {
          const action = msg;
          const s = store.getState();
          const val = s[action.action_name];
          if (typeof val === 'function') {
            // eslint-disable-next-line prefer-spread
            try {
              const result = await s[action.action_name].apply(undefined, action.action_args);
              port.postMessage({
                type: 'action_response',
                result
              });
            } catch (error) {
              port.postMessage({
                type: 'action_response',
                error: error.message || error
              });
            }
          } else {
            console.warn(`Asked to proxy action ${msg.action_name} on store ${name}, but no matching action found`, s);
          }
        }
      });
    }
    if (port.name === `${_storeConstants__WEBPACK_IMPORTED_MODULE_1__.StoreMessages.initStore}${name}`) {
      const fullState = store.getState();
      const actionNames = [];
      for (const prop in fullState) {
        if (typeof fullState[prop] === 'function') {
          actionNames.push(prop);
        }
      }
      port.postMessage({
        init_state: JSON.parse(JSON.stringify(fullState)),
        init_actions: actionNames
      });
    }
  });
  return store;
};

/***/ }),

/***/ "../../libs/syncstore/src/lib/storeProxy.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createProxyStore: () => (/* binding */ createProxyStore),
/* harmony export */   makeProxyStores: () => (/* binding */ makeProxyStores)
/* harmony export */ });
/* harmony import */ var fast_json_patch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/fast-json-patch/index.mjs");
/* harmony import */ var immer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../node_modules/immer/dist/immer.mjs");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/webextension-polyfill/dist/browser-polyfill.js");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(webextension_polyfill__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../node_modules/zustand/esm/vanilla.mjs");
/* harmony import */ var _client_core_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../libs/store/src/index.ts");
/* harmony import */ var _storeConstants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../libs/syncstore/src/lib/storeConstants.ts");
/* eslint-disable @typescript-eslint/no-explicit-any */






function noop(...args) {
  return undefined;
}
const generatePatch = (prevState, state) => {
  const patch = (0,fast_json_patch__WEBPACK_IMPORTED_MODULE_0__.compare)(prevState, state);
  return patch;
};
async function getInitialState(name) {
  return new Promise((resolve, reject) => {
    const initHandler = msg => {
      if (msg.init_state) {
        const state = msg.init_state;
        const actionNames = msg.init_actions;
        actionNames.forEach(name => {
          state[name] = noop;
        });
        resolve(state);
        port.onMessage.removeListener(initHandler);
        port.disconnect();
      }
    };
    const port = webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default().runtime.connect({
      name: `${_storeConstants__WEBPACK_IMPORTED_MODULE_3__.StoreMessages.initStore}${name}`
    });
    port.onMessage.addListener(initHandler);
  });
}
function makeProxyAction(action_name, store_name) {
  return (...args) => {
    return new Promise((resolve, reject) => {
      const port = webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default().runtime.connect({
        name: `${_storeConstants__WEBPACK_IMPORTED_MODULE_3__.StoreMessages.proxyAction}${store_name}`
      });
      const msg = {
        action_name,
        action_args: args
      };
      port.onMessage.addListener(response => {
        if (response.type === 'action_response') {
          if (response.error) {
            console.warn('store failed for ', action_name, store_name);
            reject(response.error);
          } else {
            resolve(response.result);
          }
        }
      });
      port.postMessage(msg);
    });
  };
}
const makeProxyStores = async () => {
  const [dataStore, uiStore] = await Promise.all([createProxyStore(_client_core_store__WEBPACK_IMPORTED_MODULE_2__.StoreNames.dataStore), createProxyStore(_client_core_store__WEBPACK_IMPORTED_MODULE_2__.StoreNames.uiStore)]);
  return [dataStore, uiStore];
};
const createProxyStore = async storeName => {
  const existingProxyActions = {};
  const defaultState = await getInitialState(storeName);
  const handler = {
    get(target, prop, reciever) {
      if (typeof defaultState[prop] === 'function') {
        // Clean up reference bugs that introduce extra renders in react
        if (typeof existingProxyActions[prop] === 'undefined') {
          existingProxyActions[prop] = makeProxyAction(prop, storeName);
        }
        return existingProxyActions[prop];
      }
      return Reflect.get(target, prop, reciever);
    }
  };
  const storeimpl = new Proxy(defaultState, handler);
  const contentStore = (0,zustand__WEBPACK_IMPORTED_MODULE_4__.createStore)((set, get, storeApi) => {
    return storeimpl;
  });
  webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default().runtime.onConnect.addListener(port => {
    if (port.name === `${_storeConstants__WEBPACK_IMPORTED_MODULE_3__.StoreMessages.stateChange}${storeName}`) {
      const stateChangeHandler = msg => {
        if (msg.newState) {
          // console.time('state_update');
          try {
            const currentState = contentStore.getState();
            const patch = generatePatch(currentState, msg.newState);
            const newState = (0,immer__WEBPACK_IMPORTED_MODULE_5__.produce)(currentState, draft => {
              (0,fast_json_patch__WEBPACK_IMPORTED_MODULE_0__.applyPatch)(draft, patch, false, true);
            });
            contentStore.setState(newState);
          } catch (error) {
            console.error('Failed to apply patch:', error);
            // do nothing for now
          }

          port.onMessage.removeListener(stateChangeHandler);
          port.disconnect();
          // console.timeEnd('state_update');
        } else if (msg.state) {
          // console.time('state_update');
          contentStore.setState(msg.state);
          port.onMessage.removeListener(stateChangeHandler);
          port.disconnect();
          // console.timeEnd('state_update');
        }
      };

      port.onMessage.addListener(stateChangeHandler);
    }
  });
  return contentStore;
};

/***/ }),

/***/ "../../libs/syncstore/src/lib/syncStore.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   sharedDataStore: () => (/* binding */ sharedDataStore),
/* harmony export */   sharedUiStore: () => (/* binding */ sharedUiStore)
/* harmony export */ });
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/webextension-polyfill/dist/browser-polyfill.js");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/zustand/esm/vanilla.mjs");
/* harmony import */ var zustand_middleware__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../node_modules/zustand/esm/middleware.mjs");
/* harmony import */ var _client_core_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../libs/store/src/index.ts");




const storage = (webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().storage).local;
const s = {
  getItem: async key => {
    const obj = await storage.get(key);
    if (obj && obj[key]) {
      return obj[key];
    } else return Promise.reject('unable to find key');
  },
  setItem: async (key, value) => {
    return storage.set({
      [key]: value
    });
  },
  removeItem: storage.remove
};
const sharedDataStore = (0,zustand__WEBPACK_IMPORTED_MODULE_2__.createStore)()((0,zustand_middleware__WEBPACK_IMPORTED_MODULE_3__.persist)((0,_client_core_store__WEBPACK_IMPORTED_MODULE_1__.PlatformMiddleware)(_client_core_store__WEBPACK_IMPORTED_MODULE_1__.dataStateCreator), {
  name: _client_core_store__WEBPACK_IMPORTED_MODULE_1__.DataStoreName,
  version: _client_core_store__WEBPACK_IMPORTED_MODULE_1__.DataStoreVersion,
  storage: (0,zustand_middleware__WEBPACK_IMPORTED_MODULE_3__.createJSONStorage)(() => s)
}));
const sharedUiStore = (0,zustand__WEBPACK_IMPORTED_MODULE_2__.createStore)()((0,zustand_middleware__WEBPACK_IMPORTED_MODULE_3__.persist)(_client_core_store__WEBPACK_IMPORTED_MODULE_1__.uiStateCreator, {
  name: _client_core_store__WEBPACK_IMPORTED_MODULE_1__.UiStoreName,
  version: _client_core_store__WEBPACK_IMPORTED_MODULE_1__.UiStoreVersion,
  storage: (0,zustand_middleware__WEBPACK_IMPORTED_MODULE_3__.createJSONStorage)(() => s)
}));

/***/ }),

/***/ "../../libs/theme/src/index.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GlobalStyles: () => (/* reexport safe */ _lib_globalStyles_globalStyles__WEBPACK_IMPORTED_MODULE_0__.GlobalStyles),
/* harmony export */   agendaViewShadow: () => (/* reexport safe */ _lib_boxShadow__WEBPACK_IMPORTED_MODULE_2__.agendaViewShadow),
/* harmony export */   backdropColor: () => (/* reexport safe */ _lib_colors__WEBPACK_IMPORTED_MODULE_1__.backdropColor),
/* harmony export */   composePopoverItemShadow: () => (/* reexport safe */ _lib_boxShadow__WEBPACK_IMPORTED_MODULE_2__.composePopoverItemShadow),
/* harmony export */   composePopoverShadow: () => (/* reexport safe */ _lib_boxShadow__WEBPACK_IMPORTED_MODULE_2__.composePopoverShadow),
/* harmony export */   gcalBorderColor: () => (/* reexport safe */ _lib_colors__WEBPACK_IMPORTED_MODULE_1__.gcalBorderColor),
/* harmony export */   gcalDarkBgColor: () => (/* reexport safe */ _lib_colors__WEBPACK_IMPORTED_MODULE_1__.gcalDarkBgColor),
/* harmony export */   gcalDarkBorderColor: () => (/* reexport safe */ _lib_colors__WEBPACK_IMPORTED_MODULE_1__.gcalDarkBorderColor),
/* harmony export */   gcalDarkFontColor: () => (/* reexport safe */ _lib_colors__WEBPACK_IMPORTED_MODULE_1__.gcalDarkFontColor),
/* harmony export */   gcalDarkHoverColor: () => (/* reexport safe */ _lib_colors__WEBPACK_IMPORTED_MODULE_1__.gcalDarkHoverColor),
/* harmony export */   gcalDarkMutedFontColor: () => (/* reexport safe */ _lib_colors__WEBPACK_IMPORTED_MODULE_1__.gcalDarkMutedFontColor),
/* harmony export */   gcalDarkSidebarColor: () => (/* reexport safe */ _lib_colors__WEBPACK_IMPORTED_MODULE_1__.gcalDarkSidebarColor),
/* harmony export */   gcalDarkerBgColor: () => (/* reexport safe */ _lib_colors__WEBPACK_IMPORTED_MODULE_1__.gcalDarkerBgColor),
/* harmony export */   gcalHoverBgColor: () => (/* reexport safe */ _lib_colors__WEBPACK_IMPORTED_MODULE_1__.gcalHoverBgColor),
/* harmony export */   gcalLightBgColor: () => (/* reexport safe */ _lib_colors__WEBPACK_IMPORTED_MODULE_1__.gcalLightBgColor),
/* harmony export */   gcalLoaderColor: () => (/* reexport safe */ _lib_colors__WEBPACK_IMPORTED_MODULE_1__.gcalLoaderColor),
/* harmony export */   gcalTextColor: () => (/* reexport safe */ _lib_colors__WEBPACK_IMPORTED_MODULE_1__.gcalTextColor),
/* harmony export */   gcalTextColorDisabled: () => (/* reexport safe */ _lib_colors__WEBPACK_IMPORTED_MODULE_1__.gcalTextColorDisabled),
/* harmony export */   integrationCardBorderColor: () => (/* reexport safe */ _lib_colors__WEBPACK_IMPORTED_MODULE_1__.integrationCardBorderColor),
/* harmony export */   keywordDetectorHighlightColor: () => (/* reexport safe */ _lib_colors__WEBPACK_IMPORTED_MODULE_1__.keywordDetectorHighlightColor),
/* harmony export */   textColorL1_5: () => (/* reexport safe */ _lib_colors__WEBPACK_IMPORTED_MODULE_1__.textColorL1_5),
/* harmony export */   zoomBotBtnBgColor: () => (/* reexport safe */ _lib_colors__WEBPACK_IMPORTED_MODULE_1__.zoomBotBtnBgColor),
/* harmony export */   zoomBotBtnBgColorHover: () => (/* reexport safe */ _lib_colors__WEBPACK_IMPORTED_MODULE_1__.zoomBotBtnBgColorHover)
/* harmony export */ });
/* harmony import */ var _lib_globalStyles_globalStyles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../libs/theme/src/lib/globalStyles/globalStyles.tsx");
/* harmony import */ var _lib_colors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../libs/theme/src/lib/colors.ts");
/* harmony import */ var _lib_boxShadow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../libs/theme/src/lib/boxShadow.ts");




/***/ }),

/***/ "../../libs/theme/src/lib/boxShadow.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   agendaViewShadow: () => (/* binding */ agendaViewShadow),
/* harmony export */   composePopoverItemShadow: () => (/* binding */ composePopoverItemShadow),
/* harmony export */   composePopoverShadow: () => (/* binding */ composePopoverShadow)
/* harmony export */ });
const composePopoverShadow = '0px 2px 2px rgba(0, 0, 0, 0.25)';
const composePopoverItemShadow = '0px 2px 4px rgba(0, 0, 0, 0.25)';
const agendaViewShadow = '0px 4px 92px 0px rgba(0, 0, 0, 0.33)';

/***/ }),

/***/ "../../libs/theme/src/lib/colors.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   backdropColor: () => (/* binding */ backdropColor),
/* harmony export */   gcalBorderColor: () => (/* binding */ gcalBorderColor),
/* harmony export */   gcalDarkBgColor: () => (/* binding */ gcalDarkBgColor),
/* harmony export */   gcalDarkBorderColor: () => (/* binding */ gcalDarkBorderColor),
/* harmony export */   gcalDarkFontColor: () => (/* binding */ gcalDarkFontColor),
/* harmony export */   gcalDarkHoverColor: () => (/* binding */ gcalDarkHoverColor),
/* harmony export */   gcalDarkMutedFontColor: () => (/* binding */ gcalDarkMutedFontColor),
/* harmony export */   gcalDarkSidebarColor: () => (/* binding */ gcalDarkSidebarColor),
/* harmony export */   gcalDarkerBgColor: () => (/* binding */ gcalDarkerBgColor),
/* harmony export */   gcalHoverBgColor: () => (/* binding */ gcalHoverBgColor),
/* harmony export */   gcalLightBgColor: () => (/* binding */ gcalLightBgColor),
/* harmony export */   gcalLoaderColor: () => (/* binding */ gcalLoaderColor),
/* harmony export */   gcalTextColor: () => (/* binding */ gcalTextColor),
/* harmony export */   gcalTextColorDisabled: () => (/* binding */ gcalTextColorDisabled),
/* harmony export */   integrationCardBorderColor: () => (/* binding */ integrationCardBorderColor),
/* harmony export */   keywordDetectorHighlightColor: () => (/* binding */ keywordDetectorHighlightColor),
/* harmony export */   textColorL1_5: () => (/* binding */ textColorL1_5),
/* harmony export */   zoomBotBtnBgColor: () => (/* binding */ zoomBotBtnBgColor),
/* harmony export */   zoomBotBtnBgColorHover: () => (/* binding */ zoomBotBtnBgColorHover)
/* harmony export */ });
// Typography
const textColorL1_5 = '#666666';

// Gcal
const gcalTextColor = '#3c4043';
const gcalTextColorDisabled = '#d0d0d0';
const gcalBorderColor = '#dadce0';
const gcalLightBgColor = '#f1f4f8';
const gcalHoverBgColor = '#e9eef6';
const gcalLoaderColor = '#9d9d9d';
const gcalDarkFontColor = '#c4c7c5';
const gcalDarkMutedFontColor = '#a7a9a7';
const gcalDarkBgColor = '#1e1f20';
const gcalDarkerBgColor = '#131314';
const gcalDarkBorderColor = '#444746';
const gcalDarkHoverColor = '#2a2d31';
const gcalDarkSidebarColor = '#1B1B1B';

// Extension options page
const integrationCardBorderColor = '#e1e1e1';

// Modals
const backdropColor = 'rgba(31, 31, 31, 0.1)';

// Zoom bot
const zoomBotBtnBgColor = 'rgb(14, 114, 237)';
const zoomBotBtnBgColorHover = 'rgb(66, 133, 244)';

// Keyword detection
const keywordDetectorHighlightColor = 'rgba(10, 233, 239, 0.50)';

/***/ }),

/***/ "../../libs/theme/src/lib/globalStyles/base.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Base: () => (/* binding */ Base)
/* harmony export */ });
/* harmony import */ var _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../@calendly/ui/dist/theme.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");
let _ = t => t,
  _t;


const Base = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_1__.createGlobalStyle)(_t || (_t = _`
  body {
    font-family: "Proxima Nova", Arial, sans-serif;
    line-height: 1.5;
    font-size: 14px;
    color: ${0};
    margin: 0;
    overflow: hidden;
  }

  *, *::before, *::after {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    text-align: inherit;
    pointer-events: inherit;
    white-space: inherit;
    color: inherit;
  }

  a {
    text-decoration: none;
    color: ${0};
    outline: none;
    cursor: pointer;
  }

  p {
    margin-bottom: 1.5em;
  }

  h1 {
    font-size: 24px;
    line-height: 1em;
    margin-bottom: 1em;
  }

  h2 {
    font-size: 22px;
  }

  h3 {
    font-size: 18px;
  }

  h4 {
    font-size: 16px;
  }

  h5 {
    font-size: 14px;
  }
`), _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.textColorL1, _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.textColorSecondary2);

/***/ }),

/***/ "../../libs/theme/src/lib/globalStyles/globalStyles.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GlobalStyles: () => (/* binding */ GlobalStyles)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../libs/theme/src/lib/globalStyles/base.ts");
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../libs/theme/src/lib/globalStyles/icons.ts");
/* harmony import */ var _tooltip__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../libs/theme/src/lib/globalStyles/tooltip.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../node_modules/react/jsx-dev-runtime.js");
var _jsxFileName = "/app/libs/theme/src/lib/globalStyles/globalStyles.tsx";






const GlobalStyles = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.memo)(() => {
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)(() => {
    const palette = "p17l6er4";
    document.body.classList.add(palette);
    return () => document.body.classList.remove(palette);
  }, []);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(_icons__WEBPACK_IMPORTED_MODULE_2__.Icons, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 12,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(_tooltip__WEBPACK_IMPORTED_MODULE_3__.Tooltip, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(_base__WEBPACK_IMPORTED_MODULE_1__.Base, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 14,
      columnNumber: 7
    }, undefined)]
  }, void 0, true);
});
__webpack_require__("../../libs/theme/src/lib/globalStyles/globalStyles.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../libs/theme/src/lib/globalStyles/globalStyles.tsx");

/***/ }),

/***/ "../../libs/theme/src/lib/globalStyles/icons.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Icons: () => (/* binding */ Icons)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");
let _ = t => t,
  _t;

const Icons = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_0__.createGlobalStyle)(_t || (_t = _`

.calendly-icon {
  display: inline-block;
  font-family: 'icomoon' !important;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;

  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  &:hover:before {
    text-decoration: none;
  }
}

.icon-ask-invitee, .icon-location {
  color: #FD8787;
}
.icon-custom-input {
  color: #898BC3;
}
.icon-inbound-call, .icon-outbound-call {
  color: #4CBCFC;
}
.icon-google-meet {
  color: #74E195;
}
.icon-zoom-icon {
  color: #39B2F8;
}
.icon-gotomeeting-logo {
  color: #EFAC74;
}
.icon-microsoft-teams {
  color: #6264A6;
}

.icon-event-types:before {
  content: "\\e947";
}
.icon-gotomeeting-logo:before {
  content: "\\e934";
}
.icon-error-exclamation-circle:before {
  content: "\\e9a5";
}
.icon-microsoft-teams:before {
  content: "\\e9a2";
}
.icon-google-meet:before {
  content: "\\e95a";
}
.icon-location:before {
  content: "\\e906";
}
.icon-phone:before {
  content: "\\e98e";
}

.icon-zoom-icon:before {
  content: "\\e98f";
}
.icon-custom-input:before {
  content: "\\e990";
}
.icon-ask-invitee:before {
  content: "\\e991";
}
.icon-sul:before {
  content: "\\e994";
}
.icon-inbound-call:before {
  content: "\\e9a8";
}
.icon-outbound-call:before {
  content: "\\e9ab";
}
.icon-full-star:before {
  content: "\\e615";
}
.icon-hollow-star:before {
  content: "\\e611";
}
.icon-done:before {
  content: "\\e605";
}
.icon-angle-left:before {
  content: "\\f104";
}
.icon-angle-right:before {
  content: "\\f106";
}
.icon-angle-down:before {
  content: "\\f107";
}
.icon-angle-up:before {
  content: "\\f105";
}
.icon-globe:before {
  content: "\\e903";
}
.icon-new-team:before {
  content: "\\e979";
}
.icon-redo:before {
  content: "\\e900";
}
.icon-undo:before {
  content: "\\e901";
}
`));

/***/ }),

/***/ "../../libs/theme/src/lib/globalStyles/tooltip.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Tooltip: () => (/* binding */ Tooltip)
/* harmony export */ });
/* harmony import */ var _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../@calendly/ui/dist/theme.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");
let _ = t => t,
  _t;


const Tooltip = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_1__.createGlobalStyle)(_t || (_t = _`
[data-cui-tooltip] {
  &::after {
    position: absolute;
    display: none;
    padding: 6px 10px;
    max-width: 550px;
    background-color: ${0};
    font-size: 11px;
    line-height: 1.36;
    border-radius: 4px;
    color: #fff;
    overflow-wrap: break-word;
    cursor: default;
    content: attr(data-cui-tooltip);
    transform: translateX(-50%);
    white-space: break-spaces;
    pointer-events: none;
    z-index: 11;
  }

  &.small {
    &::after {
      max-width: 125px;
    }
  }

  &:hover::after {
    display: block;
  }

  &[cui-tooltip-down] {
    position: relative;
    &::after {
      margin-top: 6px;
    }
  }

  &[cui-tooltip-right] {
    &::after {
      transform: none;
      right: auto;
      left: 0;
    }
  }

  &[cui-tooltip-far-right] {
    &::after {
      transform: none;
      right: auto;
      left: 25px;
    }
  }

  &[cui-tooltip-left] {
    &::after {
      transform: none;
      right: 0;
      left: auto;
    }
  }

  &[cui-tooltip-slight-left] {
    &::after {
      transform: none;
      right: -25px;
      left: auto;
    }
  }

  &.wrap {
    &::after {
      white-space: normal;
      width: 200px;
    }
  }
}
`), _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.colorNiceNavy);

/***/ }),

/***/ "../../@calendly/ui/dist/theme.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   backgroundGreyColor: () => (/* binding */ backgroundGreyColor),
/* harmony export */   cardShadow: () => (/* binding */ cardShadow),
/* harmony export */   colorAccentGreenHeavy: () => (/* binding */ colorAccentGreenHeavy),
/* harmony export */   colorAccentGreenLight: () => (/* binding */ colorAccentGreenLight),
/* harmony export */   colorAccentGreenMedium: () => (/* binding */ colorAccentGreenMedium),
/* harmony export */   colorAccentOrangeHeavy: () => (/* binding */ colorAccentOrangeHeavy),
/* harmony export */   colorAccentOrangeLight: () => (/* binding */ colorAccentOrangeLight),
/* harmony export */   colorAccentOrangeMedium: () => (/* binding */ colorAccentOrangeMedium),
/* harmony export */   colorAccentPinkHeavy: () => (/* binding */ colorAccentPinkHeavy),
/* harmony export */   colorAccentPinkLight: () => (/* binding */ colorAccentPinkLight),
/* harmony export */   colorAccentPinkMedium: () => (/* binding */ colorAccentPinkMedium),
/* harmony export */   colorAccentPurpleHeavy: () => (/* binding */ colorAccentPurpleHeavy),
/* harmony export */   colorAccentPurpleLight: () => (/* binding */ colorAccentPurpleLight),
/* harmony export */   colorAccentPurpleMedium: () => (/* binding */ colorAccentPurpleMedium),
/* harmony export */   colorAccentRedHeavy: () => (/* binding */ colorAccentRedHeavy),
/* harmony export */   colorAccentRedLight: () => (/* binding */ colorAccentRedLight),
/* harmony export */   colorAccentRedMedium: () => (/* binding */ colorAccentRedMedium),
/* harmony export */   colorAlert: () => (/* binding */ colorAlert),
/* harmony export */   colorAlert2: () => (/* binding */ colorAlert2),
/* harmony export */   colorAlertLighter90: () => (/* binding */ colorAlertLighter90),
/* harmony export */   colorBackgroundDestructive: () => (/* binding */ colorBackgroundDestructive),
/* harmony export */   colorBackgroundInverseSecondary: () => (/* binding */ colorBackgroundInverseSecondary),
/* harmony export */   colorBackgroundInverseStandard: () => (/* binding */ colorBackgroundInverseStandard),
/* harmony export */   colorBackgroundInverseTertiary: () => (/* binding */ colorBackgroundInverseTertiary),
/* harmony export */   colorBackgroundMeetingIntelligence: () => (/* binding */ colorBackgroundMeetingIntelligence),
/* harmony export */   colorBackgroundSecondary: () => (/* binding */ colorBackgroundSecondary),
/* harmony export */   colorBackgroundStandard: () => (/* binding */ colorBackgroundStandard),
/* harmony export */   colorBackgroundSuccess: () => (/* binding */ colorBackgroundSuccess),
/* harmony export */   colorBackgroundTertiary: () => (/* binding */ colorBackgroundTertiary),
/* harmony export */   colorBackgroundWarning: () => (/* binding */ colorBackgroundWarning),
/* harmony export */   colorBeachyBlue: () => (/* binding */ colorBeachyBlue),
/* harmony export */   colorBgGrey1: () => (/* binding */ colorBgGrey1),
/* harmony export */   colorBgGrey2: () => (/* binding */ colorBgGrey2),
/* harmony export */   colorBgWhiteL1: () => (/* binding */ colorBgWhiteL1),
/* harmony export */   colorBgWhiteL2: () => (/* binding */ colorBgWhiteL2),
/* harmony export */   colorETBubblegumPink: () => (/* binding */ colorETBubblegumPink),
/* harmony export */   colorETLivelyLemon: () => (/* binding */ colorETLivelyLemon),
/* harmony export */   colorETLoudLime: () => (/* binding */ colorETLoudLime),
/* harmony export */   colorETOutrageousOrange: () => (/* binding */ colorETOutrageousOrange),
/* harmony export */   colorETPrincelyPlum: () => (/* binding */ colorETPrincelyPlum),
/* harmony export */   colorETProudlyPink: () => (/* binding */ colorETProudlyPink),
/* harmony export */   colorETRambunctiousRed: () => (/* binding */ colorETRambunctiousRed),
/* harmony export */   colorETRegalRoyal: () => (/* binding */ colorETRegalRoyal),
/* harmony export */   colorETSpritelySky: () => (/* binding */ colorETSpritelySky),
/* harmony export */   colorETYellinYellow: () => (/* binding */ colorETYellinYellow),
/* harmony export */   colorError: () => (/* binding */ colorError),
/* harmony export */   colorErrorDarker10: () => (/* binding */ colorErrorDarker10),
/* harmony export */   colorErrorDarker30: () => (/* binding */ colorErrorDarker30),
/* harmony export */   colorGrey1: () => (/* binding */ colorGrey1),
/* harmony export */   colorGrey2: () => (/* binding */ colorGrey2),
/* harmony export */   colorGrey3: () => (/* binding */ colorGrey3),
/* harmony export */   colorGrey4: () => (/* binding */ colorGrey4),
/* harmony export */   colorIconActive: () => (/* binding */ colorIconActive),
/* harmony export */   colorIconDestructive: () => (/* binding */ colorIconDestructive),
/* harmony export */   colorIconDisabled: () => (/* binding */ colorIconDisabled),
/* harmony export */   colorIconHover: () => (/* binding */ colorIconHover),
/* harmony export */   colorIconInverseActive: () => (/* binding */ colorIconInverseActive),
/* harmony export */   colorIconInverseDisabled: () => (/* binding */ colorIconInverseDisabled),
/* harmony export */   colorIconInverseHover: () => (/* binding */ colorIconInverseHover),
/* harmony export */   colorIconInverseSecondary: () => (/* binding */ colorIconInverseSecondary),
/* harmony export */   colorIconInverseStandard: () => (/* binding */ colorIconInverseStandard),
/* harmony export */   colorIconMeetingIntelligence: () => (/* binding */ colorIconMeetingIntelligence),
/* harmony export */   colorIconSecondary: () => (/* binding */ colorIconSecondary),
/* harmony export */   colorIconStandard: () => (/* binding */ colorIconStandard),
/* harmony export */   colorLovelyLavender: () => (/* binding */ colorLovelyLavender),
/* harmony export */   colorNiceNavy: () => (/* binding */ colorNiceNavy),
/* harmony export */   colorStrokeDestructive: () => (/* binding */ colorStrokeDestructive),
/* harmony export */   colorStrokeDisabled: () => (/* binding */ colorStrokeDisabled),
/* harmony export */   colorStrokeFocus: () => (/* binding */ colorStrokeFocus),
/* harmony export */   colorStrokeHover: () => (/* binding */ colorStrokeHover),
/* harmony export */   colorStrokeInverseDisabled: () => (/* binding */ colorStrokeInverseDisabled),
/* harmony export */   colorStrokeInverseFocus: () => (/* binding */ colorStrokeInverseFocus),
/* harmony export */   colorStrokeInverseHover: () => (/* binding */ colorStrokeInverseHover),
/* harmony export */   colorStrokeInverseMedium: () => (/* binding */ colorStrokeInverseMedium),
/* harmony export */   colorStrokeInverseMediumHover: () => (/* binding */ colorStrokeInverseMediumHover),
/* harmony export */   colorStrokeInverseStandard: () => (/* binding */ colorStrokeInverseStandard),
/* harmony export */   colorStrokeInverseStrong: () => (/* binding */ colorStrokeInverseStrong),
/* harmony export */   colorStrokeInverseStrongHover: () => (/* binding */ colorStrokeInverseStrongHover),
/* harmony export */   colorStrokeMedium: () => (/* binding */ colorStrokeMedium),
/* harmony export */   colorStrokeMediumHover: () => (/* binding */ colorStrokeMediumHover),
/* harmony export */   colorStrokeMeetingIntelligence: () => (/* binding */ colorStrokeMeetingIntelligence),
/* harmony export */   colorStrokeStandard: () => (/* binding */ colorStrokeStandard),
/* harmony export */   colorStrokeStrong: () => (/* binding */ colorStrokeStrong),
/* harmony export */   colorStrokeStrongHover: () => (/* binding */ colorStrokeStrongHover),
/* harmony export */   colorStrokeSuccess: () => (/* binding */ colorStrokeSuccess),
/* harmony export */   colorStrokeWarning: () => (/* binding */ colorStrokeWarning),
/* harmony export */   colorSuccess: () => (/* binding */ colorSuccess),
/* harmony export */   colorSurfaceAction: () => (/* binding */ colorSurfaceAction),
/* harmony export */   colorSurfaceActionActive: () => (/* binding */ colorSurfaceActionActive),
/* harmony export */   colorSurfaceActionHover: () => (/* binding */ colorSurfaceActionHover),
/* harmony export */   colorSurfaceActionMeetingIntelligence: () => (/* binding */ colorSurfaceActionMeetingIntelligence),
/* harmony export */   colorSurfaceActionMeetingIntelligenceActive: () => (/* binding */ colorSurfaceActionMeetingIntelligenceActive),
/* harmony export */   colorSurfaceActionMeetingIntelligenceHover: () => (/* binding */ colorSurfaceActionMeetingIntelligenceHover),
/* harmony export */   colorSurfaceActionSecondary: () => (/* binding */ colorSurfaceActionSecondary),
/* harmony export */   colorSurfaceActionSecondaryActive: () => (/* binding */ colorSurfaceActionSecondaryActive),
/* harmony export */   colorSurfaceActionSecondaryHover: () => (/* binding */ colorSurfaceActionSecondaryHover),
/* harmony export */   colorSurfaceDestructive: () => (/* binding */ colorSurfaceDestructive),
/* harmony export */   colorSurfaceDestructiveActive: () => (/* binding */ colorSurfaceDestructiveActive),
/* harmony export */   colorSurfaceDestructiveHover: () => (/* binding */ colorSurfaceDestructiveHover),
/* harmony export */   colorSurfaceDisabled: () => (/* binding */ colorSurfaceDisabled),
/* harmony export */   colorSurfaceInfo: () => (/* binding */ colorSurfaceInfo),
/* harmony export */   colorSurfaceInverseDisabled: () => (/* binding */ colorSurfaceInverseDisabled),
/* harmony export */   colorSurfaceInverseSecondary: () => (/* binding */ colorSurfaceInverseSecondary),
/* harmony export */   colorSurfaceInverseStandard: () => (/* binding */ colorSurfaceInverseStandard),
/* harmony export */   colorSurfaceSecondary: () => (/* binding */ colorSurfaceSecondary),
/* harmony export */   colorSurfaceStandard: () => (/* binding */ colorSurfaceStandard),
/* harmony export */   colorSurfaceSuccess: () => (/* binding */ colorSurfaceSuccess),
/* harmony export */   colorSurfaceTertiary: () => (/* binding */ colorSurfaceTertiary),
/* harmony export */   colorTextAction: () => (/* binding */ colorTextAction),
/* harmony export */   colorTextActionContrast: () => (/* binding */ colorTextActionContrast),
/* harmony export */   colorTextDestructive: () => (/* binding */ colorTextDestructive),
/* harmony export */   colorTextDisabled: () => (/* binding */ colorTextDisabled),
/* harmony export */   colorTextInverseAction: () => (/* binding */ colorTextInverseAction),
/* harmony export */   colorTextInverseActionContrast: () => (/* binding */ colorTextInverseActionContrast),
/* harmony export */   colorTextInverseDestructive: () => (/* binding */ colorTextInverseDestructive),
/* harmony export */   colorTextInverseDisabled: () => (/* binding */ colorTextInverseDisabled),
/* harmony export */   colorTextInverseSecondary: () => (/* binding */ colorTextInverseSecondary),
/* harmony export */   colorTextInverseStandard: () => (/* binding */ colorTextInverseStandard),
/* harmony export */   colorTextInverseSuccess: () => (/* binding */ colorTextInverseSuccess),
/* harmony export */   colorTextSecondary: () => (/* binding */ colorTextSecondary),
/* harmony export */   colorTextStandard: () => (/* binding */ colorTextStandard),
/* harmony export */   colorTextSuccess: () => (/* binding */ colorTextSuccess),
/* harmony export */   containerBackgroundColor: () => (/* binding */ containerBackgroundColor),
/* harmony export */   errorColor: () => (/* binding */ errorColor),
/* harmony export */   greyLevel3: () => (/* binding */ greyLevel3),
/* harmony export */   greyLevel4: () => (/* binding */ greyLevel4),
/* harmony export */   greyLevel5: () => (/* binding */ greyLevel5),
/* harmony export */   greyLevel6: () => (/* binding */ greyLevel6),
/* harmony export */   modalShadow: () => (/* binding */ modalShadow),
/* harmony export */   overlayShadow: () => (/* binding */ overlayShadow),
/* harmony export */   primaryColor: () => (/* binding */ primaryColor),
/* harmony export */   primaryColorAlternative: () => (/* binding */ primaryColorAlternative),
/* harmony export */   primaryColorDarker10: () => (/* binding */ primaryColorDarker10),
/* harmony export */   primaryColorDarker30: () => (/* binding */ primaryColorDarker30),
/* harmony export */   primaryColorL1: () => (/* binding */ primaryColorL1),
/* harmony export */   primaryColorL2: () => (/* binding */ primaryColorL2),
/* harmony export */   primaryColorL3: () => (/* binding */ primaryColorL3),
/* harmony export */   primaryColorL4: () => (/* binding */ primaryColorL4),
/* harmony export */   primaryColorLevel2: () => (/* binding */ primaryColorLevel2),
/* harmony export */   primaryColorLevel3: () => (/* binding */ primaryColorLevel3),
/* harmony export */   primaryColorLevel4: () => (/* binding */ primaryColorLevel4),
/* harmony export */   primaryTextColor: () => (/* binding */ primaryTextColor),
/* harmony export */   spotlightShadow: () => (/* binding */ spotlightShadow),
/* harmony export */   staticTextColor: () => (/* binding */ staticTextColor),
/* harmony export */   staticTextColorL2: () => (/* binding */ staticTextColorL2),
/* harmony export */   successColor: () => (/* binding */ successColor),
/* harmony export */   textColor: () => (/* binding */ textColor),
/* harmony export */   textColorL1: () => (/* binding */ textColorL1),
/* harmony export */   textColorL2: () => (/* binding */ textColorL2),
/* harmony export */   textColorL3: () => (/* binding */ textColorL3),
/* harmony export */   textColorLevel2: () => (/* binding */ textColorLevel2),
/* harmony export */   textColorLevel3: () => (/* binding */ textColorLevel3),
/* harmony export */   textColorSecondary1: () => (/* binding */ textColorSecondary1),
/* harmony export */   textColorSecondary2: () => (/* binding */ textColorSecondary2),
/* harmony export */   textColorSecondary3: () => (/* binding */ textColorSecondary3),
/* harmony export */   textColorSecondary4: () => (/* binding */ textColorSecondary4),
/* harmony export */   warningColor: () => (/* binding */ warningColor)
/* harmony export */ });
// Base colors

// Text
const colorTextStandard = 'var(--colorTextStandard, var(--coreColorNeutral900))';
const colorTextSecondary = 'var(--colorTextSecondary, var(--coreColorNeutral600))';
const colorTextDisabled = 'var(--colorTextDisabled, var(--coreColorNeutral500))';
const colorTextAction = 'var(--colorTextAction, var(--coreColorBlue600))';
const colorTextActionContrast = 'var(--colorTextActionContrast, var(--coreColorBlue700))';
const colorTextInverseStandard = 'var(--colorTextInverseStandard, var(--coreColorNeutral0))';
const colorTextInverseSecondary = 'var(--colorTextInverseSecondary, var(--coreColorNeutral500))';
const colorTextInverseDisabled = 'var(--colorTextInverseDisabled, var(--coreColorNeutral600))';
const colorTextInverseAction = 'var(--colorTextInverseAction, var(--coreColorBlue500))';
const colorTextInverseActionContrast = 'var(--colorTextInverseActionContrast, var(--coreColorBlue400))';
const colorTextSuccess = 'var(--colorTextSuccess, var(--coreColorGreen700))';
const colorTextInverseSuccess = 'var(--colorTextInverseSuccess, var(--coreColorGreen500))';
const colorTextDestructive = 'var(--colorTextDestructive, var(--coreColorRed700))';
const colorTextInverseDestructive = 'var(--colorTextInverseDestructive, var(--coreColorRed400))';
// Background
// Large, more recessed areas like the page or a card.
const colorBackgroundStandard = 'var(--colorBackgroundStandard, var(--coreColorNeutral0))';
const colorBackgroundSecondary = 'var(--colorBackgroundSecondary, var(--coreColorNeutral100))';
const colorBackgroundTertiary = 'var(--colorBackgroundTertiary, var(--coreColorNeutral300))';
const colorBackgroundSuccess = 'var(--colorBackgroundSuccess, var(--coreColorGreen100))';
const colorBackgroundWarning = 'var(--colorBackgroundDestructive, var(--coreColorOrange100))';
const colorBackgroundDestructive = 'var(--colorBackgroundDestructive, var(--coreColorRed200))';
const colorBackgroundInverseStandard = 'var(--colorBackgroundInverseStandard, var(--coreColorNeutral900))';
const colorBackgroundInverseSecondary = 'var(--colorBackgroundInverseSecondary, var(--coreColorNeutral800))';
const colorBackgroundInverseTertiary = 'var(--colorBackgroundInverseTertiary, var(--coreColorNeutral700))';
const colorBackgroundMeetingIntelligence = 'var(--colorBackgroundMeetingIntelligence, var(--coreColorPurple200))';

// Surface
// Smaller, stronger areas like button fills.
const colorSurfaceStandard = 'var(--colorSurfaceStandard, var(--coreColorNeutral0))';
const colorSurfaceSecondary = 'var(--colorSurfaceSecondary, var(--coreColorNeutral100))';
const colorSurfaceTertiary = 'var(--colorSurfaceTertiary, var(--coreColorNeutral300))';
const colorSurfaceDisabled = 'var(--colorSurfaceDisabled, var(--coreColorNeutral300))';
const colorSurfaceSuccess = 'var(--colorSurfaceSuccess, var(--coreColorGreen700))';
const colorSurfaceDestructive = 'var(--colorSurfaceDestructive, var(--coreColorRed600))';
const colorSurfaceDestructiveHover = 'var(--colorSurfaceDestructiveHover, var(--coreColorRed700))';
const colorSurfaceDestructiveActive = 'var(--colorSurfaceDestructiveActive, var(--coreColorRed800))';
const colorSurfaceInfo = 'var(--colorSurfaceInfo, var(--coreColorBlue300))';
const colorSurfaceAction = 'var(--colorSurfaceAction, var(--coreColorBlue600))';
const colorSurfaceActionHover = 'var(--colorSurfaceActionHover, var(--coreColorBlue700))';
const colorSurfaceActionActive = 'var(--colorSurfaceActionActive, var(--coreColorBlue800))';
const colorSurfaceActionSecondary = 'var(--colorSurfaceActionSecondary, var(--coreColorBlue100))';
const colorSurfaceActionSecondaryHover = 'var(--colorSurfaceActionSecondaryHover, var(--coreColorBlue200))';
const colorSurfaceActionSecondaryActive = 'var(--colorSurfaceActionSecondaryActive, var(--coreColorBlue300))';
const colorSurfaceInverseStandard = 'var(--colorSurfaceInverseStandard, var(--coreColorNeutral900))';
const colorSurfaceInverseSecondary = 'var(--colorSurfaceInverseSecondary, var(--coreColorNeutral800))';
const colorSurfaceInverseDisabled = 'var(--colorSurfaceInverseDisabled, var(--coreColorNeutral600))';
const colorSurfaceActionMeetingIntelligence = 'var(--colorSurfaceActionMeetingIntelligence, var(--coreColorPurple700))';
const colorSurfaceActionMeetingIntelligenceHover = 'var(--colorSurfaceActionMeetingIntelligenceHover, var(--coreColorPurple800))';
const colorSurfaceActionMeetingIntelligenceActive = 'var(--colorSurfaceActionMeetingIntelligenceActive, var(--coreColorPurple900))';
// Stroke
const colorStrokeStandard = 'var(--colorStrokeStandard, var(--coreColorNeutral400))';
const colorStrokeHover = 'var(--colorStrokeHover, var(--coreColorNeutral500))';
const colorStrokeMedium = 'var(--colorStrokeMedium, var(--coreColorNeutral500))';
const colorStrokeMediumHover = 'var(--colorStrokeMediumHover, var(--coreColorNeutral600))';
const colorStrokeStrong = 'var(--colorStrokeStrong, var(--coreColorNeutral600))';
const colorStrokeStrongHover = 'var(--colorStrokeStrongHover, var(--coreColorNeutral700))';
const colorStrokeFocus = 'var(--colorStrokeFocus, var(--coreColorBlue600))';
const colorStrokeDisabled = 'var(--colorStrokeDisabled, var(--coreColorNeutral200))';
const colorStrokeSuccess = 'var(--colorStrokeSuccess, var(--coreColorGreen600))';
const colorStrokeWarning = 'var(--colorStrokeWarning, var(--coreColorOrange400))';
const colorStrokeDestructive = 'var(--colorStrokeDestructive, var(--coreColorRed600))';
const colorStrokeInverseStandard = 'var(--colorStrokeInverseStandard, var(--coreColorNeutral700))';
const colorStrokeInverseHover = 'var(--colorStrokeInverseHover, var(--coreColorNeutral600))';
const colorStrokeInverseMedium = 'var(--colorStrokeInverseMedium, var(--coreColorNeutral600))';
const colorStrokeInverseMediumHover = 'var(--colorStrokeInverseMediumHover, var(--coreColorNeutral500))';
const colorStrokeInverseStrong = 'var(--colorStrokeInverseStrong, var(--coreColorNeutral300))';
const colorStrokeInverseStrongHover = 'var(--colorStrokeInverseStrongHover, var(--coreColorNeutral100))';
const colorStrokeInverseFocus = 'var(--colorStrokeInverseFocus, var(--coreColorNeutral500))';
const colorStrokeInverseDisabled = 'var(--colorStrokeInverseDisabled, var(--coreColorNeutral900))';
const colorStrokeMeetingIntelligence = 'var(--colorStrokeMeetingIntelligence, var(--coreColorPurple300))';

// Icons
const colorIconStandard = 'var(--colorIconStandard, var(--coreColorNeutral800))';
const colorIconHover = 'var(--colorIconHover, var(--coreColorNeutral900))';
const colorIconSecondary = 'var(--colorIconSecondary, var(--coreColorNeutral600))';
const colorIconDestructive = 'var(--colorIconSecondary, var(--coreColorRed600))';
const colorIconActive = 'var(--colorIconActive, var(--coreColorBlue600))';
const colorIconDisabled = 'var(--colorIconDisabled, var(--coreColorNeutral500))';
const colorIconInverseStandard = 'var(--colorIconInverseStandard, var(--coreColorNeutral0))';
const colorIconInverseHover = 'var(--colorIconInverseHover, var(--coreColorNeutral100))';
const colorIconInverseSecondary = 'var(--colorIconInverseSecondary, var(--coreColorNeutral300))';
const colorIconInverseActive = 'var(--colorIconInverseActive, var(--coreColorBlue500))';
const colorIconInverseDisabled = 'var(--colorIconInverseDisabled, var(--coreColorNeutral500))';
const colorIconMeetingIntelligence = 'var(--colorIconMeetingIntelligence, var(--coreColorPurple700))';

// Accents
// Raw colors not tied to intent. Naming variants refer to strength of color ie. light is fainter and heavy is more bold.
const colorAccentPurpleLight = 'var(--colorAccentPurpleLight, var(--coreColorPurple200))';
const colorAccentPurpleMedium = 'var(--colorAccentPurpleMedium, var(--coreColorPurple600))';
const colorAccentPurpleHeavy = 'var(--colorAccentPurpleHeavy, var(--coreColorPurple900))';
const colorAccentPinkLight = 'var(--colorAccentPinkLight, var(--coreColorPink100))';
const colorAccentPinkMedium = 'var(--colorAccentPinkMedium, var(--coreColorPink500))';
const colorAccentPinkHeavy = 'var(--colorAccentPinkHeavy, var(--coreColorPink900))';
const colorAccentGreenLight = 'var(--colorAccentGreenLight, var(--coreColorGreen200))';
const colorAccentGreenMedium = 'var(--colorAccentGreenMedium, var(--coreColorGreen500))';
const colorAccentGreenHeavy = 'var(--colorAccentGreenHeavy, var(--coreColorGreen900))';
const colorAccentOrangeLight = 'var(--colorAccentOrangeLight, var(--coreColorOrange200))';
const colorAccentOrangeMedium = 'var(--colorAccentOrangeMedium, var(--coreColorOrange400))';
const colorAccentOrangeHeavy = 'var(--colorAccentOrangeHeavy, var(--coreColorOrange700))';
const colorAccentRedLight = 'var(--colorAccentRedLight, var(--coreColorRed200))';
const colorAccentRedMedium = 'var(--colorAccentRedMedium, var(--coreColorRed500))';
const colorAccentRedHeavy = 'var(--colorAccentRedHeavy, var(--coreColorRed700))';
const calendlyPrimaryColor = '0, 105, 255';
const calendlyText = '26, 26, 26';

// Primary Color and Shades
const primaryColorL1 = `var(--primary-color, rgb(${calendlyPrimaryColor}))`;
const primaryColorL2 = `var(--primary-color-level2, rgba(${calendlyPrimaryColor}, 0.5))`;
const primaryColorL3 = `var(--primary-color-level3, rgba(${calendlyPrimaryColor}, 0.15))`;
const primaryColorL4 = `var(--primary-color-level4, rgba(${calendlyPrimaryColor}, 0.05))`;

// Primary Color darker tones
const primaryColorDarker10 = 'var(--primary-color-darker-10, rgba(0, 95, 230, 1))';
const primaryColorDarker30 = 'var(--primary-color-darker-30, rgba(0, 74, 179, 1))';

// Primary Text colors
const textColorL1 = `var(--text-color, rgb(${calendlyText}))`;
const textColorL2 = `var(--text-color-level2, rgba(${calendlyText}, 0.61))`;
const textColorL3 = `var(--text-color-level3, rgba(${calendlyText}, 0.1))`;

// Secondary Text colors
const textColorSecondary1 = 'var(--text-color-secondary-1, rgba(51, 51, 51, 1))';
const textColorSecondary2 = 'var(--text-color-secondary-2, rgba(0, 105, 255, 1))';
const textColorSecondary3 = 'var(--text-color-secondary-3, rgba(0, 102, 230, 1))';
const textColorSecondary4 = 'var(--text-color-secondary-4, rgba(255, 255, 255, 1))';

// Background colors
const colorBgWhiteL1 = 'var(--color-bg-white-l-1, rgba(255, 255, 255, 1))';
const colorBgWhiteL2 = 'var(--color-bg-white-l-2, rgba(255, 255, 255, 0.7))';
const colorBgGrey1 = 'var(--color-bg-grey-1, #333333)';
const colorBgGrey2 = 'var(--color-bg-grey-2, #FAFAFA)';
const colorGrey1 = 'var(--color-grey-1, #666A73)';
const colorGrey2 = 'var(--color-grey-2, #B2B2B2)';
const colorGrey3 = 'var(--color-grey-3, #CCCCCC)';
const colorGrey4 = 'var(--color-grey-4, #F2F2F2)';

// Secondary Colors
const colorSuccess = 'var(--color-success, #038164)';
const colorError = 'var(--color-error, #C84545)';
const colorAlert = 'var(--color-alert, #F2CE0E)';
const colorAlert2 = 'var(--color-alert-2, #F0811E)';
const colorNiceNavy = '#004796';
const colorLovelyLavender = '#BFB0FF';
const colorBeachyBlue = '#F2F8FF';

// ColorError darker tones
const colorErrorDarker10 = 'var(--color-error-darker-10, #B43E3E)';
const colorErrorDarker30 = 'var(--color-error-darker-10, #8C3030)';

// ColorAlert lighter tones
const colorAlertLighter90 = 'var(--color-alert-lighter-90, #FEFBEB)';

// Event Type colors
const colorETRambunctiousRed = '#FF4F00';
const colorETBubblegumPink = '#FF758E';
const colorETProudlyPink = '#E55CFF';
const colorETPrincelyPlum = '#8247F5';
const colorETRegalRoyal = '#0099FF';
const colorETSpritelySky = '#0AE8F0';
const colorETLoudLime = '#17E885';
const colorETLivelyLemon = '#CCF000';
const colorETYellinYellow = '#F8E436';
const colorETOutrageousOrange = '#FFA600';

// Shadows
const cardShadow = '0 1px 6px rgba(0, 0, 0, 0.1)';
const modalShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
const overlayShadow = '0 1px 5px rgba(0, 74, 16, 0.15)';
const spotlightShadow = '0 2px 6px rgba(0, 0, 0, 0.3)';

// Engineering only colors
const staticTextColor = `rgb(${calendlyText})`;
const staticTextColorL2 = `rgba(${calendlyText}, 0.61)`;

// All variables bellow this should be deprecated.
const primaryColor = `var(--primary-color, rgb(${calendlyPrimaryColor}))`;
const primaryColorLevel2 = `var(--primary-color-level2, rgba(${calendlyPrimaryColor}, 0.5))`;
const primaryColorLevel3 = `var(--primary-color-level3, rgba(${calendlyPrimaryColor}, 0.15))`;
const primaryColorLevel4 = `var(--primary-color-level4, rgba(${calendlyPrimaryColor}, 0.065))`;
const textColor = `var(--text-color, rgb(${calendlyText}))`;
const textColorLevel2 = `var(--text-color-level2, rgba(${calendlyText}, 0.61))`;
const textColorLevel3 = `var(--text-color-level3, rgba(${calendlyText}, 0.1))`;
const primaryColorAlternative = '#0060e6';
const primaryTextColor = 'var(--primary-text-color, #ffffff)';
const containerBackgroundColor = 'var(--container-background-color, #ffffff)';
const backgroundGreyColor = 'var(--color-bg-grey-2, #FAFAFA)';
const greyLevel3 = '#666666';
const greyLevel4 = 'var(--color-grey-2, #B2B2B2)';
const greyLevel5 = 'var(--color-grey-3, #CCCCCC)';
const greyLevel6 = 'var(--color-grey-4, #F2F2F2)';
const successColor = 'var(--color-success, #038164)';
const errorColor = 'var(--color-error, #C84545)';
const warningColor = 'var(--color-alert, #F2CE0E)';

/***/ }),

/***/ "../../libs/theme/src/lib/globalStyles/globalStyles.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../libs/theme/src/lib/globalStyles/globalStyles.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

}]);