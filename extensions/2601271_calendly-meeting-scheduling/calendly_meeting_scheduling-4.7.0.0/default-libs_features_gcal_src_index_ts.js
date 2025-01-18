"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["default-libs_features_gcal_src_index_ts"],{

/***/ "../../libs/features/gcal/src/index.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Bar: () => (/* reexport safe */ _lib_components_bar__WEBPACK_IMPORTED_MODULE_1__.Bar),
/* harmony export */   BarActionsMenu: () => (/* reexport safe */ _lib_components_barActionsMenu__WEBPACK_IMPORTED_MODULE_2__.BarActionsMenu),
/* harmony export */   ConfigBar: () => (/* reexport safe */ _lib_components_configBar__WEBPACK_IMPORTED_MODULE_3__.ConfigBar),
/* harmony export */   FollowUpActionsPopover: () => (/* reexport safe */ _lib_components_followUpActionsPopover__WEBPACK_IMPORTED_MODULE_5__.FollowUpActionsPopover),
/* harmony export */   FrameManager: () => (/* reexport safe */ _lib_FrameManager__WEBPACK_IMPORTED_MODULE_0__.FrameManager),
/* harmony export */   ReschedulePopover: () => (/* reexport safe */ _lib_components_reschedulePopover__WEBPACK_IMPORTED_MODULE_4__.ReschedulePopover)
/* harmony export */ });
/* harmony import */ var _lib_FrameManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../libs/features/gcal/src/lib/FrameManager.ts");
/* harmony import */ var _lib_components_bar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../libs/features/gcal/src/lib/components/bar.tsx");
/* harmony import */ var _lib_components_barActionsMenu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../libs/features/gcal/src/lib/components/barActionsMenu.tsx");
/* harmony import */ var _lib_components_configBar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../libs/features/gcal/src/lib/components/configBar.tsx");
/* harmony import */ var _lib_components_reschedulePopover__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../libs/features/gcal/src/lib/components/reschedulePopover.tsx");
/* harmony import */ var _lib_components_followUpActionsPopover__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../libs/features/gcal/src/lib/components/followUpActionsPopover.tsx");







/***/ }),

/***/ "../../libs/features/gcal/src/lib/FrameManager.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FrameManager: () => (/* binding */ FrameManager)
/* harmony export */ });
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/buffer/index.js");
/* harmony import */ var luxon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/luxon/src/luxon.js");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/webextension-polyfill/dist/browser-polyfill.js");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(webextension_polyfill__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _client_core_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../libs/helpers/src/index.ts");
/* harmony import */ var _client_core_platform__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../libs/platform/src/index.ts");
/* harmony import */ var _client_core_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../libs/store/src/index.ts");
/* harmony import */ var _components_EventDetails__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../libs/features/gcal/src/lib/components/EventDetails.ts");
/* harmony import */ var _components_EventDetector__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../../libs/features/gcal/src/lib/components/EventDetector.ts");
/* harmony import */ var _components_EventEdit__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("../../libs/features/gcal/src/lib/components/EventEdit.ts");
/* harmony import */ var _components_EventIcon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("../../libs/features/gcal/src/lib/components/EventIcon.ts");
/* harmony import */ var _components_OptionsColumn__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("../../libs/features/gcal/src/lib/components/OptionsColumn.ts");











class FrameManager {
  constructor(tabId, store, platform) {
    var _document$getElementB,
      _this = this;
    this.observer = void 0;
    this.viewFamily = null;
    this.viewKey = null;
    this.timezone = void 0;
    this.scheduledEvents = new Map();
    this.eventDetails = null;
    this.eventEdit = null;
    this.eventIcons = [];
    this.optionsColumn = null;
    this.eventDetector = void 0;
    this.showMeetingIntel = false;
    this.started = false;
    this.user = null;
    this._loggedIn = false;
    this._eventColorsEnabled = false;
    this._dateRange = null;
    this._darkThemeClass = 'CcsDpe';
    this._darkTheme = false;
    this.tabId = tabId;
    this.store = store;
    this.platform = platform;
    this.timezone = (_document$getElementB = document.getElementById('xTimezone')) == null ? void 0 : _document$getElementB.innerText;
    this.observer = this.makeMutationObserver();
    this.onUnload = this.onUnload.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.handleWindowMessage = this.handleWindowMessage.bind(this);
    this.handleScheduledEventsChange = this.handleScheduledEventsChange.bind(this);
    this.eventDetector = new _components_EventDetector__WEBPACK_IMPORTED_MODULE_7__.EventDetector({
      refreshScheduledEvents: () => this.refreshScheduledEvents(),
      platform: this.platform
    });
    this.store.getState().updateUserStatus();
    const checkEnabled = state => {
      this.user = state.user;
      const gcalIntegration = state.integrations[_client_core_store__WEBPACK_IMPORTED_MODULE_5__.IntegrationId.gcalv1];
      if (!this.started && gcalIntegration.enabled) {
        this.start();
      }
      if (this.started && !gcalIntegration.enabled) {
        this.stop();
      }
      this.showMeetingIntel = state.flags[_client_core_store__WEBPACK_IMPORTED_MODULE_5__.FeatureFlagName.clients_gcal_meeting_intel_feature].enabled && state.flags[_client_core_store__WEBPACK_IMPORTED_MODULE_5__.FeatureFlagName.meeting_intelligence].enabled;
    };
    checkEnabled(this.store.getState());
    this.store.subscribe((state, lastState) => {
      if (lastState.user === null && state.user !== null) {
        this.refreshScheduledEvents();
      }
      platform.analytics.setUser(state.user);
      checkEnabled(state);
    });

    // init
    const setup = async function setup() {
      const config = await platform.settings.get();
      _this.onSettingChange(config);
    };
    setup();
    platform.session.addEventListener(setup);
  }
  get darkTheme() {
    // This getter is used for triggering the check
    this._darkTheme = document.body.classList.contains(this._darkThemeClass);
    return this._darkTheme; // This class variable is used for storing last computed state
  }

  get loggedIn() {
    return this._loggedIn;
  }
  set loggedIn(l) {
    if (l && !this._loggedIn) {
      this.start();
    } else if (!l && this._loggedIn) {
      this.stop();
    }
    this._loggedIn = l;
  }
  get eventColorsEnabled() {
    return this._eventColorsEnabled;
  }
  set eventColorsEnabled(arg) {
    if (this._eventColorsEnabled !== arg) {
      this._eventColorsEnabled = arg;
      this.eventIcons.forEach(eventIcon => eventIcon.updateEventColor(arg));
    }
  }
  get dateRange() {
    return this._dateRange;
  }
  set dateRange(arg) {
    var _this$_dateRange;
    if (!arg) {
      this._dateRange = null;
      return;
    }
    const start = arg[0].startOf('day');
    const end = arg[1].endOf('day');
    const now = luxon__WEBPACK_IMPORTED_MODULE_1__.DateTime.now();
    const [prevStart, prevEnd] = (_this$_dateRange = this._dateRange) != null ? _this$_dateRange : [now, now];
    if (+start !== +prevStart || +end !== +prevEnd) {
      this.eventDetector.onReset();
      this.platform.scheduledEvents.fetchScheduledEvents(start, end, this.store.getState().user);
    }
    this._dateRange = [start, end];
  }
  handleScheduledEventsChange(values, meta) {
    this.scheduledEvents = this.convertScheduledEventsToMap(((meta == null ? void 0 : meta.newValue) || []).map(e => _client_core_platform__WEBPACK_IMPORTED_MODULE_4__.ScheduledEvent.fromStorage(e)));
    this.processDOM();
  }
  handleMessage(data, sender, sendResponse) {
    if (!data) return;
    if (data.action === 'invitee_rescheduled') {
      if (data.source === 'details' || data.source === 'agenda') {
        var _this$eventDetails;
        if (this.dateRange) {
          this.platform.scheduledEvents.fetchScheduledEvents(this.dateRange[0], this.dateRange[1], this.store.getState().user);
        }
        (_this$eventDetails = this.eventDetails) == null || _this$eventDetails.close();
      } else if (data.source === 'edit') {
        var _this$eventEdit;
        (_this$eventEdit = this.eventEdit) == null || _this$eventEdit.close();
      }
    } else if (data.action && data.barId && data.component === 'reschedule_modal') {
      var _this$eventDetails2, _this$eventEdit2;
      let iframe;
      if (((_this$eventDetails2 = this.eventDetails) == null ? void 0 : _this$eventDetails2.id) === data.barId) {
        var _this$eventDetails3;
        (_this$eventDetails3 = this.eventDetails) == null || _this$eventDetails3.handleRescheduleModal(data.action, data.inviteeAction, data.guests);
        iframe = document.getElementById(`calendly-event-details-frame-${data.barId}`);
      } else if (((_this$eventEdit2 = this.eventEdit) == null ? void 0 : _this$eventEdit2.id) === data.barId) {
        var _this$eventEdit3;
        (_this$eventEdit3 = this.eventEdit) == null || _this$eventEdit3.handleRescheduleModal(data.action, data.inviteeAction, data.guests);
        iframe = document.getElementById(`calendly-event-edit-frame-${data.barId}`);
      }
      if (iframe instanceof HTMLIFrameElement) {
        var _iframe$contentWindow;
        (_iframe$contentWindow = iframe.contentWindow) == null || _iframe$contentWindow.postMessage(data, '*');
      }
    } else if (data.action && data.barId && data.component === 'follow_up_actions_modal') {
      var _this$eventDetails4, _this$eventEdit4;
      let iframe;
      if (((_this$eventDetails4 = this.eventDetails) == null ? void 0 : _this$eventDetails4.id) === data.barId) {
        var _this$eventDetails5;
        (_this$eventDetails5 = this.eventDetails) == null || _this$eventDetails5.handleFollowUpActionsModal(data.action);
        iframe = document.getElementById(`calendly-event-details-frame-${data.barId}`);
      } else if (((_this$eventEdit4 = this.eventEdit) == null ? void 0 : _this$eventEdit4.id) === data.barId) {
        var _this$eventEdit5;
        (_this$eventEdit5 = this.eventEdit) == null || _this$eventEdit5.handleFollowUpActionsModal(data.action);
        iframe = document.getElementById(`calendly-event-edit-frame-${data.barId}`);
      }
      if (iframe instanceof HTMLIFrameElement) {
        var _iframe$contentWindow2;
        (_iframe$contentWindow2 = iframe.contentWindow) == null || _iframe$contentWindow2.postMessage(data, '*');
      }
    } else if (data.action && data.barId && data.component === 'gcal_bar_actions_menu') {
      var _this$eventDetails6, _this$eventEdit6;
      let iframe;
      if (((_this$eventDetails6 = this.eventDetails) == null ? void 0 : _this$eventDetails6.id) === data.barId) {
        var _this$eventDetails7;
        (_this$eventDetails7 = this.eventDetails) == null || _this$eventDetails7.handleBarActionsMenu(data.action);
        iframe = document.getElementById(`calendly-event-details-frame-${data.barId}`);
      } else if (((_this$eventEdit6 = this.eventEdit) == null ? void 0 : _this$eventEdit6.id) === data.barId) {
        var _this$eventEdit7;
        (_this$eventEdit7 = this.eventEdit) == null || _this$eventEdit7.handleBarActionsMenu(data.action);
        iframe = document.getElementById(`calendly-event-edit-frame-${data.barId}`);
      }
      if (iframe instanceof HTMLIFrameElement) {
        var _iframe$contentWindow3;
        (_iframe$contentWindow3 = iframe.contentWindow) == null || _iframe$contentWindow3.postMessage(data, '*');
      }
    } else if (data.action === 'focusGcalBar') {
      if (data.component === 'prevSibling' && data.barId) {
        var _this$eventDetails8, _this$eventEdit8;
        if (((_this$eventDetails8 = this.eventDetails) == null ? void 0 : _this$eventDetails8.id) === data.barId) {
          const bar = document.querySelector('.calendly-event-details-bar-handled');
          (0,_client_core_helpers__WEBPACK_IMPORTED_MODULE_3__.focusPrevSibling)(bar);
        } else if (((_this$eventEdit8 = this.eventEdit) == null ? void 0 : _this$eventEdit8.id) === data.barId) {
          const prevEl = document.querySelector('.La3I1');
          (0,_client_core_helpers__WEBPACK_IMPORTED_MODULE_3__.focusLastChild)(prevEl);
        }
      } else if (data.component === 'nextSibling') {
        var _this$eventDetails9, _this$eventEdit9;
        let bar;
        if (((_this$eventDetails9 = this.eventDetails) == null ? void 0 : _this$eventDetails9.id) === data.barId) {
          bar = document.querySelector('.calendly-event-details-bar-handled');
        } else if (((_this$eventEdit9 = this.eventEdit) == null ? void 0 : _this$eventEdit9.id) === data.barId) {
          bar = document.querySelector('.calendly-event-edit-bar-handled');
        }
        (0,_client_core_helpers__WEBPACK_IMPORTED_MODULE_3__.focusNextSibling)(bar);
      } else if (['moreButton', 'bookButton', 'rescheduleButton'].includes(data.component)) {
        var _this$eventDetails10, _this$eventEdit10;
        let iframe;
        if (((_this$eventDetails10 = this.eventDetails) == null ? void 0 : _this$eventDetails10.id) === data.barId) {
          iframe = document.getElementById(`calendly-event-details-frame-${data.barId}`);
        } else if (((_this$eventEdit10 = this.eventEdit) == null ? void 0 : _this$eventEdit10.id) === data.barId) {
          iframe = document.getElementById(`calendly-event-edit-frame-${data.barId}`);
        }
        if (iframe instanceof HTMLIFrameElement) {
          var _iframe$contentWindow4;
          (_iframe$contentWindow4 = iframe.contentWindow) == null || _iframe$contentWindow4.postMessage(data, '*');
        }
      } else if (data.component === 'inviteesBookModal' && data.barId) {
        var _this$eventDetails11, _this$eventEdit11;
        let menuId;
        if (((_this$eventDetails11 = this.eventDetails) == null ? void 0 : _this$eventDetails11.id) === data.barId) {
          var _this$eventDetails12;
          menuId = (_this$eventDetails12 = this.eventDetails) == null || (_this$eventDetails12 = _this$eventDetails12.inviteesBookModal) == null ? void 0 : _this$eventDetails12.id;
        } else if (((_this$eventEdit11 = this.eventEdit) == null ? void 0 : _this$eventEdit11.id) === data.barId) {
          var _this$eventEdit12;
          menuId = (_this$eventEdit12 = this.eventEdit) == null || (_this$eventEdit12 = _this$eventEdit12.inviteesBookModal) == null ? void 0 : _this$eventEdit12.id;
        }
        const iframe = document.getElementById(`calendly-popover-frame-${menuId}`);
        if (iframe instanceof HTMLIFrameElement) {
          var _iframe$contentWindow5;
          (_iframe$contentWindow5 = iframe.contentWindow) == null || _iframe$contentWindow5.postMessage(data, '*');
        }
      } else if (data.component === 'rescheduleModal' && data.barId) {
        var _this$eventDetails13, _this$eventEdit13;
        let menuId;
        if (((_this$eventDetails13 = this.eventDetails) == null ? void 0 : _this$eventDetails13.id) === data.barId) {
          var _this$eventDetails14;
          menuId = (_this$eventDetails14 = this.eventDetails) == null || (_this$eventDetails14 = _this$eventDetails14.rescheduleModal) == null ? void 0 : _this$eventDetails14.id;
        } else if (((_this$eventEdit13 = this.eventEdit) == null ? void 0 : _this$eventEdit13.id) === data.barId) {
          var _this$eventEdit14;
          menuId = (_this$eventEdit14 = this.eventEdit) == null || (_this$eventEdit14 = _this$eventEdit14.rescheduleModal) == null ? void 0 : _this$eventEdit14.id;
        }
        const iframe = document.getElementById(`calendly-popover-frame-${menuId}`);
        if (iframe instanceof HTMLIFrameElement) {
          var _iframe$contentWindow6;
          (_iframe$contentWindow6 = iframe.contentWindow) == null || _iframe$contentWindow6.postMessage(data, '*');
        }
      } else if (data.component === 'barActionsMenu' && data.barId) {
        var _this$eventDetails15, _this$eventEdit15;
        let menuId;
        if (((_this$eventDetails15 = this.eventDetails) == null ? void 0 : _this$eventDetails15.id) === data.barId) {
          var _this$eventDetails16;
          menuId = (_this$eventDetails16 = this.eventDetails) == null || (_this$eventDetails16 = _this$eventDetails16.barActionsMenu) == null ? void 0 : _this$eventDetails16.id;
        } else if (((_this$eventEdit15 = this.eventEdit) == null ? void 0 : _this$eventEdit15.id) === data.barId) {
          var _this$eventEdit16;
          menuId = (_this$eventEdit16 = this.eventEdit) == null || (_this$eventEdit16 = _this$eventEdit16.barActionsMenu) == null ? void 0 : _this$eventEdit16.id;
        }
        const iframe = document.getElementById(`calendly-gcal-bar-menu-frame-${menuId}`);
        if (iframe instanceof HTMLIFrameElement) {
          var _iframe$contentWindow7;
          (_iframe$contentWindow7 = iframe.contentWindow) == null || _iframe$contentWindow7.postMessage(data, '*');
        }
      } else if (data.component === 'followUpActionsModal' && data.barId) {
        var _this$eventDetails17, _this$eventEdit17;
        let menuId;
        if (((_this$eventDetails17 = this.eventDetails) == null ? void 0 : _this$eventDetails17.id) === data.barId) {
          var _this$eventDetails18;
          menuId = (_this$eventDetails18 = this.eventDetails) == null || (_this$eventDetails18 = _this$eventDetails18.followUpActionsModal) == null ? void 0 : _this$eventDetails18.id;
        } else if (((_this$eventEdit17 = this.eventEdit) == null ? void 0 : _this$eventEdit17.id) === data.barId) {
          var _this$eventEdit18;
          menuId = (_this$eventEdit18 = this.eventEdit) == null || (_this$eventEdit18 = _this$eventEdit18.followUpActionsModal) == null ? void 0 : _this$eventEdit18.id;
        }
        const iframe = document.getElementById(`calendly-popover-frame-${menuId}`);
        if (iframe instanceof HTMLIFrameElement) {
          var _iframe$contentWindow8;
          (_iframe$contentWindow8 = iframe.contentWindow) == null || _iframe$contentWindow8.postMessage(data, '*');
        }
      }
    }
  }
  handleWindowMessage(msg) {
    this.handleMessage(msg.data);
  }
  onUnload() {
    this.stop();
    if (window.chrome) {
      window.chrome.runtime.onMessage.removeListener(this.handleMessage);
    } else {
      webextension_polyfill__WEBPACK_IMPORTED_MODULE_2___default().runtime.onMessage.removeListener(this.handleMessage);
    }
  }
  async onSettingChange(newSettings) {
    this.eventColorsEnabled = newSettings.gCalEventColorsEnabled;
  }
  getEventData(el) {
    const dataEventId = el.getAttribute('data-eventid');
    if (dataEventId) {
      try {
        return buffer__WEBPACK_IMPORTED_MODULE_0__.Buffer.from(dataEventId, 'base64').toString().split(' ');
      } catch (e) {
        this.platform.errorManager.notify(e, this.user);
      }
    }
    const jslog = el.getAttribute('jslog');
    if (jslog) {
      try {
        const match = jslog.match(/2:\["(.*?)","(.*?)"/);
        if (match && match.length && match[1]) {
          return [match[1], match[2]];
        }
      } catch (e) {
        this.platform.errorManager.notify(e, this.user);
      }
    }
    this.platform.errorManager.notify({
      error: 'unable to get event id from element',
      el
    }, this.user);
    return [];
  }

  // https://stackoverflow.com/questions/58080616/googlecalendar-datekey
  dateKeyToDate(key) {
    const day = key & 0b11111;
    const month = key >> 5 & 0b1111;
    const year = (key >> 9) + 1970;
    return luxon__WEBPACK_IMPORTED_MODULE_1__.DateTime.fromObject({
      year,
      month,
      day
    }, {
      zone: this.timezone
    });
  }
  dateStringToDate(date) {
    return luxon__WEBPACK_IMPORTED_MODULE_1__.DateTime.fromISO(date, {
      zone: this.timezone
    }).toUTC();
  }
  getDateRangeKeysByStartEnd() {
    const keysEl = document.querySelector('[data-start-date-key]');
    const startKey = parseInt((keysEl == null ? void 0 : keysEl.getAttribute('data-start-date-key')) || '');
    const endKey = parseInt((keysEl == null ? void 0 : keysEl.getAttribute('data-end-date-key')) || '');
    return [startKey, endKey];
  }
  getDateRangeKeysByDate() {
    let startKey = NaN;
    let endKey = NaN;
    const keyEls = document.querySelectorAll('[data-datekey]');
    if (keyEls.length) {
      startKey = parseInt(keyEls[0].getAttribute('data-datekey') || '');
      endKey = parseInt(keyEls[keyEls.length - 1].getAttribute('data-datekey') || '');
    }
    return [startKey, endKey];
  }
  getDateRangeFromDOM() {
    let startKey = NaN;
    let endKey = NaN;
    if (this.viewFamily === 'EVENT' && (this.viewKey === 'DAY' || this.viewKey === 'WEEK' || this.viewKey === 'MONTH' || this.viewKey === 'CUSTOM_DAYS' || this.viewKey === 'CUSTOM_WEEKS') || this.viewFamily === 'SCHEDULE') {
      [startKey, endKey] = this.getDateRangeKeysByStartEnd();
    } else if (this.viewFamily === 'EVENT' && this.viewKey === 'AGENDA') {
      const startKeyEl = document.querySelector('[data-start-date-key]');
      // wait for the start date key to be removed from the DOM
      if (!startKeyEl) {
        [startKey, endKey] = this.getDateRangeKeysByDate();
      }
    } else if (this.viewFamily === 'EVENT' && this.viewKey === 'YEAR') {
      const dateKeyEl = document.querySelector('[data-date-key]');
      if (dateKeyEl) {
        // in the year view when the day modal is opened
        const dateKey = parseInt(dateKeyEl.getAttribute('data-date-key') || '');
        startKey = dateKey;
        endKey = dateKey;
      }
    } else if (this.viewFamily === 'EVENT_EDIT') {
      [startKey, endKey] = this.getDateRangeKeysByStartEnd();
      if (isNaN(startKey) || isNaN(endKey)) {
        // in the event edit page when the `Find a Time` tab is visible
        [startKey, endKey] = this.getDateRangeKeysByDate();
      }
      if ((isNaN(startKey) || isNaN(endKey)) && document.querySelector('[data-is-create="false"]')) {
        // in the event edit page when the page is first loaded we get the date range of the event
        const startDate = document.querySelector('[id=xStDaRo][data-date]');
        const endDate = document.querySelector('[id=xEnDaRo][data-date]');
        if (startDate && endDate) {
          const startDateValue = startDate.getAttribute('data-date');
          const endDateValue = endDate.getAttribute('data-date');
          if (!startDateValue || !endDateValue) {
            throw new Error('Unable to get date range from event edit page. Missing `data-date` attribute');
          }
          this.dateRange = [this.dateStringToDate(startDateValue), this.dateStringToDate(endDateValue)];
          return;
        }
      }
    }
    if (!isNaN(startKey) && !isNaN(endKey)) {
      this.dateRange = [this.dateKeyToDate(startKey), this.dateKeyToDate(endKey)];
    }
  }
  processDOM(mutations) {
    this.viewFamily = document.body.getAttribute('data-viewfamily');
    this.viewKey = document.body.getAttribute('data-viewkey');
    if (mutations) {
      this.eventDetector.onMutation(mutations);
    }
    this.cleanup();
    this.getDateRangeFromDOM();
    this.handleEventIcon();
    this.handleEventDetails();
    this.handleEventEdit();
    this.handleOptionsColumn();
    this.handleAppearance();
  }
  refreshScheduledEvents() {
    if (this.dateRange) {
      this.platform.scheduledEvents.fetchScheduledEvents(this.dateRange[0], this.dateRange[1], this.store.getState().user);
    }
  }
  handleAppearance() {
    if (this.viewFamily === 'EVENT') {
      if (this._darkTheme !== this.darkTheme && this.optionsColumn) {
        this.optionsColumn.setDarkTheme(this._darkTheme);
      }
    }
  }
  handleOptionsColumn() {
    if (this.viewFamily === 'EVENT') {
      const searchOptionEl = document.querySelector('.ZtL5hd');
      const optionsColumnHandledEl = document.querySelector('.calendly-options-column-handled');
      if (searchOptionEl && !optionsColumnHandledEl) {
        this.optionsColumn = new _components_OptionsColumn__WEBPACK_IMPORTED_MODULE_10__.OptionsColumn(searchOptionEl, this.darkTheme);
      }
    }
  }
  handleEventIcon() {
    if (this.viewFamily === 'EVENT' || this.viewFamily === 'EVENT_EDIT' || this.viewFamily === 'SCHEDULE') {
      Array.from(document.querySelectorAll('[data-eventid][data-eventchip]')).forEach(node => {
        const [eventId] = this.getEventData(node);
        if (eventId) {
          const scheduledEvent = this.scheduledEvents.get(eventId);
          this.eventDetector.onEventDetected(eventId);
          if (!node.querySelector('.calendly-event-icon-handled')) {
            if (scheduledEvent) {
              const eventIcon = new _components_EventIcon__WEBPACK_IMPORTED_MODULE_9__.EventIcon({
                node,
                viewKey: this.viewKey,
                scheduledEvent,
                eventColorsEnabled: this.eventColorsEnabled
              });
              this.eventIcons = [...this.eventIcons, eventIcon];
            }
          } else {
            if (!scheduledEvent) {
              this.eventIcons = this.eventIcons.filter(i => {
                if (i.exists() && i.scheduledEvent.externalId !== eventId) {
                  return true;
                }
                i.cleanup();
                return false;
              });
            }
          }
        }
      });
    }
  }
  handleEventDetails() {
    if (this.viewFamily === 'EVENT') {
      const detDlg = document.getElementById('xDetDlg');
      if (detDlg) {
        const [eventId] = this.getEventData(detDlg);
        const scheduledEvent = this.scheduledEvents.get(eventId);
        if (!detDlg.querySelector('.calendly-event-details-bar-handled')) {
          if (scheduledEvent) {
            if (!this.eventDetails || this.eventDetails.scheduledEvent.externalId !== eventId) {
              this.platform.scheduledEvents.fetchScheduledEvent(scheduledEvent.uuid, !scheduledEvent.isCanceled);
            }
            this.eventDetails = new _components_EventDetails__WEBPACK_IMPORTED_MODULE_6__.EventDetails({
              el: detDlg,
              tabId: this.tabId,
              scheduledEvent,
              showMeetingIntel: this.showMeetingIntel,
              darkTheme: this.darkTheme
            });
          }
        } else {
          if (!scheduledEvent && this.eventDetails && (!this.eventDetails.exists() || this.eventDetails.scheduledEvent.externalId === eventId)) {
            this.eventDetails.cleanup();
            this.eventDetails = null;
          }
        }
      }
    }
  }
  handleEventEdit() {
    if (this.viewFamily === 'EVENT_EDIT') {
      const editContainerEl = document.querySelector('[data-is-create="false"]');
      if (editContainerEl) {
        const [eventId] = this.getEventData(editContainerEl);
        const scheduledEvent = this.scheduledEvents.get(eventId);
        if (!editContainerEl.querySelector('.calendly-event-edit-bar-handled')) {
          if (scheduledEvent) {
            if (!this.eventEdit || this.eventEdit.scheduledEvent.externalId !== eventId) {
              this.platform.scheduledEvents.fetchScheduledEvent(scheduledEvent.uuid, !scheduledEvent.isCanceled);
            }
            this.eventEdit = new _components_EventEdit__WEBPACK_IMPORTED_MODULE_8__.EventEdit({
              el: editContainerEl,
              tabId: this.tabId,
              scheduledEvent,
              isFirefox: this.platform.info.name === 'firefox',
              darkTheme: this.darkTheme
            });
          }
        } else {
          if (!scheduledEvent && this.eventEdit && (!this.eventEdit.exists() || this.eventEdit.scheduledEvent.externalId === eventId)) {
            this.eventEdit.cleanup();
            this.eventEdit = null;
          }
        }
      }
    }
  }
  cleanup() {
    var _this$eventEdit19, _this$eventDetails19;
    if (((_this$eventEdit19 = this.eventEdit) == null ? void 0 : _this$eventEdit19.exists()) === false) {
      this.eventEdit.cleanup();
      this.eventEdit = null;
    }
    if (((_this$eventDetails19 = this.eventDetails) == null ? void 0 : _this$eventDetails19.exists()) === false) {
      this.eventDetails.cleanup();
      this.eventDetails = null;
    }
    this.eventIcons = this.eventIcons.filter(i => {
      const valid = i.valid();
      if (valid && i.exists()) {
        return true;
      }
      i.cleanup(valid);
      return false;
    });
  }
  makeMutationObserver() {
    return new MutationObserver(mutations => {
      this.processDOM(mutations);
    });
  }
  async start() {
    window.addEventListener('beforeunload', this.onUnload);
    this.scheduledEvents = this.convertScheduledEventsToMap(await this.platform.scheduledEvents.get());
    this.platform.scheduledEvents.addEventListener(this.handleScheduledEventsChange);
    if (window.chrome) {
      window.chrome.runtime.onMessage.addListener(this.handleMessage);
    } else {
      webextension_polyfill__WEBPACK_IMPORTED_MODULE_2___default().runtime.onMessage.addListener(this.handleMessage);
    }
    window.addEventListener('message', this.handleWindowMessage);
    this.processDOM();
    this.observer.observe(document.body, {
      attributes: false,
      childList: true,
      subtree: true
    });
    this.started = true;
  }
  stop() {
    if (this.eventDetails) {
      this.eventDetails.cleanup();
      this.eventDetails = null;
    }
    if (this.eventEdit) {
      this.eventEdit.cleanup();
      this.eventEdit = null;
    }
    if (this.optionsColumn) {
      this.optionsColumn.cleanup();
      this.optionsColumn = null;
    }
    this.eventIcons.forEach(eventIcon => eventIcon.cleanup());
    this.eventIcons = [];
    this.platform.scheduledEvents.removeEventListener(this.handleScheduledEventsChange);
    window.removeEventListener('message', this.handleWindowMessage);
    this.observer.disconnect();
    this.started = false;
  }
  convertScheduledEventsToMap(scheduledEvents) {
    return scheduledEvents.reduce((map, se) => se.externalId ? map.set(se.externalId, se) : map, new Map());
  }
}

/***/ }),

/***/ "../../libs/features/gcal/src/lib/components/BarActionsMenuClass.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BarActionsMenuClass: () => (/* binding */ BarActionsMenuClass)
/* harmony export */ });
/* harmony import */ var _floating_ui_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs");
/* harmony import */ var _floating_ui_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.mjs");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/webextension-polyfill/dist/browser-polyfill.js");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__);


class BarActionsMenuClass {
  constructor({
    id,
    tabId,
    parent,
    scheduledEvent,
    source,
    placement,
    darkTheme
  }) {
    this.id = void 0;
    this.tabId = void 0;
    this.parent = void 0;
    this.popoverContent = void 0;
    this.placement = void 0;
    this.scheduledEvent = void 0;
    this.source = void 0;
    this.darkTheme = false;
    this.onClick = ev => {
      if (this.popoverContent.style.display === 'block' && document.contains(this.popoverContent) && !this.popoverContent.contains(ev.target)) {
        var _window$top;
        this.hide();
        (_window$top = window.top) == null || _window$top.postMessage({
          action: 'close',
          component: 'gcal_bar_actions_menu',
          barId: this.id
        }, '*');
      }
    };
    this.id = id;
    this.tabId = tabId;
    this.parent = parent;
    this.scheduledEvent = scheduledEvent;
    this.source = source;
    this.placement = placement != null ? placement : 'top-end';
    this.darkTheme = darkTheme;
    const params = new URLSearchParams();
    params.set('source', this.source);
    params.set('barid', this.id);
    params.set('tabid', this.tabId.toString());
    params.set('uuid', this.scheduledEvent.uuid);
    params.set('placement', this.placement || 'top-end');
    if (this.darkTheme) {
      params.set('darkTheme', 'true');
    }
    const popoverFrame = document.createElement('iframe');
    popoverFrame.id = `calendly-gcal-bar-menu-frame-${this.id}`;
    popoverFrame.src = `${webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.getURL(`/pages/iframe_gCalBarActionsMenu.html?${params.toString()}`)}`;
    Object.assign(popoverFrame.style, {
      border: '0',
      display: 'block',
      height: '57px',
      width: '190px',
      overflow: 'hidden'
    });
    this.popoverContent = document.createElement('div');
    this.popoverContent.id = `calendly-gcal-bar-menu-popover-${this.id}`;
    Object.assign(this.popoverContent.style, {
      display: 'none',
      position: 'absolute',
      width: 'max-content',
      top: '0',
      left: '0',
      zIndex: 5
    });
    this.popoverContent.appendChild(popoverFrame);
    this.parent.appendChild(this.popoverContent);
    window.addEventListener('click', this.onClick);
  }
  async update() {
    const {
      x,
      y
    } = await (0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_1__.computePosition)(this.parent, this.popoverContent, {
      placement: this.placement,
      middleware: [(0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_2__.flip)(), (0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_2__.shift)()]
    });
    Object.assign(this.popoverContent.style, {
      left: `${x}px`,
      top: `${y}px`
    });
  }
  show() {
    this.popoverContent.style.display = 'block';
    this.update();
  }
  hide() {
    this.popoverContent.style.display = 'none';
    this.update();
  }
  toggle() {
    if (this.popoverContent.style.display === 'block') {
      this.hide();
    } else {
      this.show();
    }
  }
  cleanup() {
    window.removeEventListener('click', this.onClick);
  }
}

/***/ }),

/***/ "../../libs/features/gcal/src/lib/components/EventDetails.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EventDetails: () => (/* binding */ EventDetails)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/react-dom/client.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("../../node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/webextension-polyfill/dist/browser-polyfill.js");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(webextension_polyfill__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _client_core_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../libs/helpers/src/index.ts");
/* harmony import */ var _client_core_theme__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../libs/theme/src/index.ts");
/* harmony import */ var _BarActionsMenuClass__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../libs/features/gcal/src/lib/components/BarActionsMenuClass.ts");
/* harmony import */ var _RescheduleModal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../libs/features/gcal/src/lib/components/RescheduleModal.tsx");
/* harmony import */ var _followUpActionsModal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../../libs/features/gcal/src/lib/components/followUpActionsModal.tsx");
/* harmony import */ var _zoomBotBar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("../../libs/features/gcal/src/lib/components/zoomBotBar.tsx");










class EventDetails {
  constructor({
    el,
    tabId,
    scheduledEvent,
    showMeetingIntel,
    darkTheme
  }) {
    this.id = void 0;
    this.tabId = void 0;
    this.el = void 0;
    this.scheduledEvent = void 0;
    this.bar = void 0;
    this.calbotButton = void 0;
    this.barPopover = void 0;
    this.rescheduleModal = void 0;
    this.inviteesBookModal = void 0;
    this.followUpActionsModal = void 0;
    this.barActionsMenu = void 0;
    this.visibleGuestsEmails = [];
    this.darkTheme = false;
    this.id = (0,uuid__WEBPACK_IMPORTED_MODULE_9__["default"])();
    this.el = el;
    this.tabId = tabId;
    this.scheduledEvent = scheduledEvent;
    this.darkTheme = darkTheme;
    this.getVisibleGuests();
    this.bar = this.showBar();
    if (showMeetingIntel) {
      this.calbotButton = this.addZoomBotButton();
    }
  }
  addZoomBotButton() {
    const botEl = document.createElement('div');
    botEl.style.display = 'block';
    botEl.style.height = '48px';
    botEl.style.width = '100%';
    botEl.id = `calendly-event-details-bot-button-${this.id}`;
    const zoomButton = this.content().find('.zoom-join-link');
    const zoomLink = zoomButton.find('.zoom-pop-link .btn-meeting').attr('href');
    const root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot)(botEl);
    root.render((0,_zoomBotBar__WEBPACK_IMPORTED_MODULE_8__.ZoomBotBar)({
      zoomLink: zoomLink,
      scheduledEventUUID: this.scheduledEvent.uuid,
      externalEventId: this.scheduledEvent.externalId,
      externalSource: 'google_calendar'
    }));
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(botEl).insertBefore(zoomButton);
    return botEl;
  }
  showBar() {
    const barEl = document.createElement('div');
    barEl.id = `calendly-event-details-bar-${this.id}`;
    barEl.classList.add('calendly-event-details-bar-handled');
    this.content().after(barEl);
    const barPlaceholder = document.createElement('div');
    barPlaceholder.style.display = 'block';
    barPlaceholder.style.height = '64px';
    barPlaceholder.style.width = '100%';
    barPlaceholder.style.overflow = 'hidden';
    if (this.darkTheme) {
      barPlaceholder.style.backgroundColor = _client_core_theme__WEBPACK_IMPORTED_MODULE_4__.gcalDarkBgColor;
    }
    barEl.appendChild(barPlaceholder);
    this.handleBarPopover();
    return barEl;
  }
  createActionsMenu() {
    return new _BarActionsMenuClass__WEBPACK_IMPORTED_MODULE_5__.BarActionsMenuClass({
      id: this.id,
      tabId: this.tabId,
      parent: this.bar,
      scheduledEvent: this.scheduledEvent,
      source: 'details',
      darkTheme: this.darkTheme
    });
  }
  createRescheduleModal(inviteeAction, guests) {
    return new _RescheduleModal__WEBPACK_IMPORTED_MODULE_6__.RescheduleModal({
      id: this.id,
      tabId: this.tabId,
      parent: this.bar,
      scheduledEvent: this.scheduledEvent,
      source: 'details',
      inviteeAction,
      guests
    });
  }
  getVisibleGuests() {
    this.el.querySelectorAll('[data-id][data-email]:not(#xDtlDlgOrg):not([data-is-expandable=true])').forEach(el => this.visibleGuestsEmails.push(el.getAttribute('data-email') || ''));
  }
  content() {
    return jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.el).find('.hMdQi');
  }
  barPopoverContent() {
    var _this$el$parentElemen;
    // If the popover is placed inside the [jsslot] (parentElement) div
    // The DOM event handlers are affected in a way that clicking outside doesn't function properly
    return (_this$el$parentElemen = this.el.parentElement) == null ? void 0 : _this$el$parentElemen.parentElement;
  }
  exists() {
    return document.body.contains(this.el);
  }
  handleBarPopover() {
    var _this$barPopoverConte;
    const existingBarPopover = (_this$barPopoverConte = this.barPopoverContent()) == null ? void 0 : _this$barPopoverConte.querySelector('.calendly-event-details-popover-handled');
    if (existingBarPopover) {
      this.id = existingBarPopover.id.replace('calendly-event-details-frame-', '');
      this.barPopover = existingBarPopover;
      this.setupAdjacentElements();
    } else {
      this.createBarPopover();
    }
  }
  createBarPopover() {
    const params = new URLSearchParams();
    params.set('source', 'details');
    params.set('barid', this.id);
    params.set('tabid', this.tabId.toString());
    params.set('uuid', this.scheduledEvent.uuid);
    if (this.darkTheme) {
      params.set('darkTheme', 'true');
    }
    if (this.visibleGuestsEmails.length) {
      params.set('guests', this.visibleGuestsEmails.join());
    }
    const barFrame = document.createElement('iframe');
    barFrame.id = `calendly-event-details-frame-${this.id}`;
    barFrame.classList.add('calendly-event-details-popover-handled');
    barFrame.src = `${webextension_polyfill__WEBPACK_IMPORTED_MODULE_2___default().runtime.getURL('/pages/iframe_gCalBar.html')}?${params.toString()}`;
    barFrame.tabIndex = -1;
    barFrame.style.border = '0';
    barFrame.style.display = 'block';
    barFrame.style.height = '64px';
    barFrame.style.width = '100%';
    barFrame.style.overflow = 'hidden';
    barFrame.style.position = 'absolute';
    barFrame.style.bottom = '0';
    barFrame.style.pointerEvents = 'all';
    barFrame.style.backgroundColor = this.darkTheme ? _client_core_theme__WEBPACK_IMPORTED_MODULE_4__.gcalDarkBgColor : 'transparent';
    barFrame.style.opacity = this.darkTheme ? '0' : '1';
    barFrame.onload = () => {
      setTimeout(() => {
        barFrame.style.opacity = '1';
      }, 45);
    };

    // Prevent gcal actions being below Calendly actions when expanded
    const bottomActionsEl = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.el).find('.FKqJcf');
    if (bottomActionsEl.length && bottomActionsEl[0].textContent) {
      bottomActionsEl[0].style.zIndex = '1';
      barFrame.style.bottom = '49px';
    }
    const declinedFooterEl = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.el).find('.McOO2b');
    if (declinedFooterEl.length && declinedFooterEl[0].textContent && declinedFooterEl[0].parentElement) {
      declinedFooterEl[0].parentElement.style.zIndex = '1';
      barFrame.style.bottom = '49px';
    }
    const barPopoverContent = this.barPopoverContent();
    if (barPopoverContent) {
      barPopoverContent.appendChild(barFrame);
      barPopoverContent.style.position = 'relative';
      barPopoverContent.addEventListener('transitionend', evt => {
        setTimeout(() => {
          if (barPopoverContent) {
            barPopoverContent.style.position = 'relative';
          }
        }, 75);
      });
    }
    setTimeout(() => {
      var _getPrevSibling, _getNextSibling;
      const bar = document.querySelector('.calendly-event-details-bar-handled');
      (_getPrevSibling = (0,_client_core_helpers__WEBPACK_IMPORTED_MODULE_3__.getPrevSibling)(bar)) == null || _getPrevSibling.addEventListener('keydown', e => {
        if (e.code === 'Tab' && !e.shiftKey) {
          var _barFrame$contentWind;
          e.preventDefault();
          (_barFrame$contentWind = barFrame.contentWindow) == null || _barFrame$contentWind.postMessage({
            action: 'focusGcalBar',
            component: 'firstChild'
          }, '*');
        }
      });
      (_getNextSibling = (0,_client_core_helpers__WEBPACK_IMPORTED_MODULE_3__.getNextSibling)(bar)) == null || _getNextSibling.addEventListener('keydown', e => {
        if (e.code === 'Tab' && e.shiftKey) {
          var _barFrame$contentWind2;
          e.preventDefault();
          (_barFrame$contentWind2 = barFrame.contentWindow) == null || _barFrame$contentWind2.postMessage({
            action: 'focusGcalBar',
            component: 'lastChild'
          }, '*');
        }
      });
    }, 1000);
    this.barPopover = barFrame;
  }
  setupAdjacentElements() {
    // Prevent gcal actions being below Calendly actions when expanded
    const bottomActionsEl = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.el).find('.FKqJcf');
    if (bottomActionsEl.length && bottomActionsEl[0].textContent) {
      bottomActionsEl[0].style.zIndex = '1';
    }
    const declinedFooterEl = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.el).find('.McOO2b');
    if (declinedFooterEl.length && declinedFooterEl[0].textContent && declinedFooterEl[0].parentElement) {
      declinedFooterEl[0].parentElement.style.zIndex = '1';
    }
  }
  handleFollowUpActionsModal(action) {
    if (!this.followUpActionsModal) {
      this.followUpActionsModal = new _followUpActionsModal__WEBPACK_IMPORTED_MODULE_7__.FollowUpActionsModal({
        id: this.id,
        tabId: this.tabId,
        parent: this.bar,
        scheduledEvent: this.scheduledEvent,
        source: 'details',
        darkTheme: this.darkTheme
      });
    }
    if (this.followUpActionsModal) {
      switch (action) {
        case 'open':
          this.followUpActionsModal.show();
          break;
        case 'close':
          this.followUpActionsModal.hide();
          break;
        case 'toggle_modal':
          this.followUpActionsModal.toggle();
          break;
        default:
          console.warn('Unknown action:', action);
      }
    }
  }
  handleRescheduleModal(action, inviteeAction, guests) {
    if (!this.inviteesBookModal && inviteeAction === 'book') {
      this.inviteesBookModal = this.createRescheduleModal(inviteeAction, guests);
    }
    if (!this.rescheduleModal && inviteeAction !== 'book') {
      this.rescheduleModal = this.createRescheduleModal(inviteeAction, guests);
    }
    if (this.inviteesBookModal && inviteeAction === 'book') {
      switch (action) {
        case 'open':
          this.inviteesBookModal.show();
          break;
        case 'close':
          this.inviteesBookModal.hide();
          break;
        case 'toggle_modal':
          this.inviteesBookModal.toggle();
          break;
      }
    } else if (this.rescheduleModal && inviteeAction !== 'book') {
      switch (action) {
        case 'open':
          this.rescheduleModal.show();
          break;
        case 'close':
          this.rescheduleModal.hide();
          break;
        case 'toggle_modal':
          this.rescheduleModal.toggle();
          break;
      }
    }
  }
  handleBarActionsMenu(action) {
    if (!this.barActionsMenu) {
      this.barActionsMenu = this.createActionsMenu();
    }
    switch (action) {
      case 'open':
        this.barActionsMenu.show();
        break;
      case 'close':
        this.barActionsMenu.hide();
        break;
      case 'toggle_menu':
        this.barActionsMenu.toggle();
        break;
    }
  }
  close() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.el).find('#xDetDlgCloseBu').trigger('click');
  }
  cleanup() {
    if (this.bar) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.bar).remove();
    }
    if (this.barPopover) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.barPopover).remove();
    }
    if (this.rescheduleModal) {
      this.rescheduleModal.cleanup();
    }
    if (this.followUpActionsModal) {
      this.followUpActionsModal.cleanup();
    }
    if (this.inviteesBookModal) {
      this.inviteesBookModal.cleanup();
    }
  }
}

/***/ }),

/***/ "../../libs/features/gcal/src/lib/components/EventDetector.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EventDetector: () => (/* binding */ EventDetector)
/* harmony export */ });
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/buffer/index.js");

class EventDetector {
  // Time in ms since last event mutation, to consider gcal DOM stable in terms of events rendered

  constructor({
    refreshScheduledEvents,
    platform
  }) {
    var _this = this;
    this.platform = void 0;
    this.isEnabled = false;
    this.refreshScheduledEvents = void 0;
    // Function to trigger scheduled events fetching
    this.lastRefreshScheduledEventsTime = null;
    // When the function above was triggered the last time
    this.refreshSchedulesEventsTreshold = 60000;
    // Ratelimit in ms for calling the function above
    this.detectedEventIds = new Set();
    // List of detected eventIds in gcal
    this.lastDetectedEventTime = null;
    // When last mutation for an event was detected in the DOM
    this.detectedEventTreshold = 15000;
    this.refreshScheduledEvents = refreshScheduledEvents;
    this.platform = platform;
    const setup = async function setup() {
      _this.isEnabled = true;
    };
    setup();
    platform.session.addEventListener(setup);
  }
  onReset() {
    this.detectedEventIds = new Set();
    this.lastDetectedEventTime = new Date();
  }
  onEventDetected(eventId) {
    if (!this.isEnabled) return;
    // Sometimes the event mutation for adding an event node is not triggered at initial load
    // Specially if you had loaded the same gcal events recently
    // We are relying on the querySelector on FrameManager for not missing any eventId.
    this.detectedEventIds.add(eventId);
    if (!this.lastDetectedEventTime) {
      this.lastDetectedEventTime = new Date();
    }
  }
  onMutation(mutations) {
    if (!this.isEnabled || !mutations) return;
    mutations.forEach(mutation => {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        const dataset = mutation.addedNodes[0].dataset;
        if (dataset && dataset['eventid'] && dataset['eventchip'] === '') {
          const eventId = buffer__WEBPACK_IMPORTED_MODULE_0__.Buffer.from(dataset['eventid'], 'base64').toString().split(' ')[0];
          const detectedEventTime = new Date();
          if (!this.lastDetectedEventTime) {
            this.lastDetectedEventTime = detectedEventTime;
            this.detectedEventIds.add(eventId);
          } else {
            const diffInMs = detectedEventTime.getTime() - this.lastDetectedEventTime.getTime();
            this.lastDetectedEventTime = detectedEventTime;
            if (diffInMs > this.detectedEventTreshold && !this.detectedEventIds.has(eventId) && !this.isEdgeCase(mutation.addedNodes[0]) && !this.isRateLimited(detectedEventTime)) {
              this.refreshScheduledEvents();
            }
            this.detectedEventIds.add(eventId);
          }
        }
      }
    });
  }
  isRateLimited(date) {
    if (!this.lastRefreshScheduledEventsTime) {
      this.lastRefreshScheduledEventsTime = date;
      return false;
    } else {
      const diffInMs = date.getTime() - this.lastRefreshScheduledEventsTime.getTime();
      if (diffInMs > this.refreshSchedulesEventsTreshold) {
        this.lastRefreshScheduledEventsTime = date;
        return false;
      } else {
        return true;
      }
    }
  }

  /*
   * Used for handling edge cases where we want to avoid fetching scheduled events
   */
  isEdgeCase(node) {
    const titleElem = node.querySelector('.FAxxKc');
    if ((titleElem == null ? void 0 : titleElem.innerHTML) === '(No title)') {
      return true; // It's a draft event
    }

    return false;
  }
}

/***/ }),

/***/ "../../libs/features/gcal/src/lib/components/EventEdit.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EventEdit: () => (/* binding */ EventEdit)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../../node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/webextension-polyfill/dist/browser-polyfill.js");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(webextension_polyfill__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _client_core_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../libs/helpers/src/index.ts");
/* harmony import */ var _client_core_theme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../libs/theme/src/index.ts");
/* harmony import */ var _BarActionsMenuClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../libs/features/gcal/src/lib/components/BarActionsMenuClass.ts");
/* harmony import */ var _RescheduleModal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../libs/features/gcal/src/lib/components/RescheduleModal.tsx");
/* harmony import */ var _followUpActionsModal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../libs/features/gcal/src/lib/components/followUpActionsModal.tsx");








class EventEdit {
  constructor({
    el,
    tabId,
    scheduledEvent,
    isFirefox = false,
    darkTheme
  }) {
    this.id = void 0;
    this.tabId = void 0;
    this.el = void 0;
    this.scheduledEvent = void 0;
    this.isFirefox = void 0;
    this.bar = void 0;
    this.rescheduleModal = void 0;
    this.inviteesBookModal = void 0;
    this.followUpActionsModal = void 0;
    this.barActionsMenu = void 0;
    this.visibleGuestsEmails = [];
    this.darkTheme = false;
    this.id = (0,uuid__WEBPACK_IMPORTED_MODULE_7__["default"])();
    this.el = el;
    this.tabId = tabId;
    this.scheduledEvent = scheduledEvent;
    this.isFirefox = isFirefox;
    this.darkTheme = darkTheme;
    this.getVisibleGuests();
    this.showBar();
    this.createActionsMenu();
  }
  showBar() {
    if (!this.el.querySelector('.calendly-event-edit-bar-handled')) {
      const params = new URLSearchParams();
      params.set('source', 'edit');
      params.set('barid', this.id);
      params.set('tabid', this.tabId.toString());
      params.set('uuid', this.scheduledEvent.uuid);
      if (this.visibleGuestsEmails.length) {
        params.set('guests', this.visibleGuestsEmails.join());
      }
      if (this.darkTheme) {
        params.set('darkTheme', 'true');
      }
      const barEl = document.createElement('div');
      barEl.id = `calendly-event-edit-bar-${this.id}`;
      barEl.classList.add('calendly-event-edit-bar-handled');
      this.guestList().first().before(barEl);
      const barFrame = document.createElement('iframe');
      barFrame.id = `calendly-event-edit-frame-${this.id}`;
      barFrame.src = `${webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default().runtime.getURL('/pages/iframe_gCalBar.html')}?${params.toString()}`;
      barFrame.style.border = '0';
      barFrame.style.display = 'block';
      barFrame.style.height = '64px';
      barFrame.style.width = '100%';
      barFrame.style.overflow = 'hidden';
      barFrame.style.backgroundColor = this.darkTheme ? _client_core_theme__WEBPACK_IMPORTED_MODULE_3__.gcalDarkerBgColor : 'transparent';
      barFrame.style.opacity = this.darkTheme ? '0' : '1';
      barFrame.onload = () => {
        setTimeout(() => {
          barFrame.style.opacity = '1';
        }, 50);
      };
      barEl.appendChild(barFrame);
      if (this.isFirefox) {
        var _getLastFocusableChil;
        // Firefox focuses on the iframe before going to the next element inside the iframe.
        // So we prevent this behavior and manually focus the next element inside it.
        (_getLastFocusableChil = (0,_client_core_helpers__WEBPACK_IMPORTED_MODULE_2__.getLastFocusableChild)(document.querySelector('.La3I1'))) == null || _getLastFocusableChil.addEventListener('keydown', e => {
          if (e.code === 'Tab' && !e.shiftKey) {
            var _barFrame$contentWind;
            e.preventDefault();
            (_barFrame$contentWind = barFrame.contentWindow) == null || _barFrame$contentWind.postMessage({
              action: 'focusGcalBar',
              component: 'firstChild'
            }, '*');
          }
        });
      }
      this.bar = barEl;
    }
  }
  createActionsMenu() {
    if (this.bar) {
      this.barActionsMenu = new _BarActionsMenuClass__WEBPACK_IMPORTED_MODULE_4__.BarActionsMenuClass({
        id: this.id,
        tabId: this.tabId,
        parent: this.bar,
        placement: 'bottom-end',
        scheduledEvent: this.scheduledEvent,
        source: 'edit',
        darkTheme: this.darkTheme
      });
    }
  }
  createRescheduleModal(inviteeAction, guests) {
    if (!this.bar) return undefined;
    return new _RescheduleModal__WEBPACK_IMPORTED_MODULE_5__.RescheduleModal({
      id: this.id,
      tabId: this.tabId,
      parent: this.bar,
      placement: 'bottom-end',
      scheduledEvent: this.scheduledEvent,
      source: 'edit',
      inviteeAction,
      guests
    });
  }
  getVisibleGuests() {
    this.el.querySelectorAll('[data-id][data-email]:not(#xDtlDlgOrg):not([data-is-expandable=true])').forEach(el => this.visibleGuestsEmails.push(el.getAttribute('data-email') || ''));
  }
  handleRescheduleModal(action, inviteeAction, guests) {
    if (!this.inviteesBookModal && inviteeAction === 'book') {
      this.inviteesBookModal = this.createRescheduleModal(inviteeAction, guests);
    }
    if (!this.rescheduleModal && inviteeAction !== 'book') {
      this.rescheduleModal = this.createRescheduleModal(inviteeAction, guests);
    }
    if (this.inviteesBookModal && inviteeAction === 'book') {
      switch (action) {
        case 'open':
          this.inviteesBookModal.show();
          break;
        case 'close':
          this.inviteesBookModal.hide();
          break;
        case 'toggle_modal':
          this.inviteesBookModal.toggle();
          break;
      }
    } else if (this.rescheduleModal && inviteeAction !== 'book') {
      switch (action) {
        case 'open':
          this.rescheduleModal.show();
          break;
        case 'close':
          this.rescheduleModal.hide();
          break;
        case 'toggle_modal':
          this.rescheduleModal.toggle();
          break;
      }
    }
  }
  handleBarActionsMenu(action) {
    if (this.barActionsMenu) {
      switch (action) {
        case 'open':
          this.barActionsMenu.show();
          break;
        case 'close':
          this.barActionsMenu.hide();
          break;
        case 'toggle_menu':
          this.barActionsMenu.toggle();
          break;
      }
    }
  }
  handleFollowUpActionsModal(action) {
    if (!this.followUpActionsModal && this.bar) {
      this.followUpActionsModal = new _followUpActionsModal__WEBPACK_IMPORTED_MODULE_6__.FollowUpActionsModal({
        id: this.id,
        tabId: this.tabId,
        parent: this.bar,
        placement: 'bottom-end',
        scheduledEvent: this.scheduledEvent,
        source: 'edit',
        darkTheme: this.darkTheme
      });
    }
    if (this.followUpActionsModal) {
      switch (action) {
        case 'open':
          this.followUpActionsModal.show();
          break;
        case 'close':
          this.followUpActionsModal.hide();
          break;
        case 'toggle_modal':
          this.followUpActionsModal.toggle();
          break;
        default:
          console.warn('Unknown action:', action);
      }
    }
  }
  guestList() {
    return jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.el).find('*[id=xGstLst]');
  }
  exists() {
    return document.body.contains(this.el);
  }
  close() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.el).find('#xCancelBu').trigger('click');
    let maxTries = 5;
    const timer = setInterval(() => {
      const discardButton = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#xDiscDiscBu');
      if (maxTries-- > 0 && !discardButton.length) return;
      clearInterval(timer);
      discardButton.trigger('click');
    }, 50);
  }
  cleanup() {
    if (this.bar) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.bar).remove();
    }
    if (this.rescheduleModal) {
      this.rescheduleModal.cleanup();
    }
    if (this.inviteesBookModal) {
      this.inviteesBookModal.cleanup();
    }
    if (this.followUpActionsModal) {
      this.followUpActionsModal.cleanup();
    }
  }
}

/***/ }),

/***/ "../../libs/features/gcal/src/lib/components/EventIcon.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EventIcon: () => (/* binding */ EventIcon)
/* harmony export */ });
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/buffer/index.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/webextension-polyfill/dist/browser-polyfill.js");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(webextension_polyfill__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _client_core_assets__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../libs/assets/src/index.ts");





var viewKeys = /*#__PURE__*/function (viewKeys) {
  viewKeys["day"] = "DAY";
  viewKeys["customDays"] = "CUSTOM_DAYS";
  viewKeys["week"] = "WEEK";
  viewKeys["customWeeks"] = "CUSTOM_WEEKS";
  viewKeys["month"] = "MONTH";
  viewKeys["year"] = "YEAR";
  viewKeys["agenda"] = "AGENDA";
  viewKeys["schedule"] = "SCHEDULE";
  viewKeys["eventEdit"] = "EVENTEDIT";
  return viewKeys;
}(viewKeys || {});
class EventIcon {
  constructor({
    node,
    viewKey,
    scheduledEvent,
    eventColorsEnabled
  }) {
    this.id = void 0;
    this.node = void 0;
    this.viewKey = void 0;
    this.scheduledEvent = void 0;
    this.icon = void 0;
    this.eventColorsEnabled = void 0;
    this.originalColor = '';
    this.originalStyles = '';
    this.id = (0,uuid__WEBPACK_IMPORTED_MODULE_4__["default"])();
    this.node = node;
    this.viewKey = viewKey;
    this.scheduledEvent = scheduledEvent;
    this.eventColorsEnabled = eventColorsEnabled;
    this.showIcon();
  }
  get isHorizontalView() {
    return ![viewKeys.month, viewKeys.year, viewKeys.agenda, viewKeys.customWeeks].some(viewKey => viewKey === this.viewKey);
  }
  showIcon() {
    const content = this.content();
    if (!content.length) return;
    const wrapperEl = document.createElement('div');
    wrapperEl.classList.add('calendly-event-icon-handled');
    if (this.isHorizontalView) {
      content.prepend(wrapperEl);
    } else {
      content.before(wrapperEl);
    }
    const iconEl = document.createElement('img');
    iconEl.id = `calendly-event-icon-${this.id}`;
    let iconSize = '12px';
    let iconMarginRight = '4px';
    let iconSrc = _client_core_assets__WEBPACK_IMPORTED_MODULE_3__.calendlyLogo_legacy;
    const elStyles = this.node.getAttribute('style');
    if (elStyles) {
      if (this.isHorizontalView && (elStyles.includes('height: 8px') || elStyles.includes('height: 10px'))) {
        iconSize = '7px';
      }
      if (elStyles.includes('background-color')) {
        const [classicColorSet, brightPastEvent] = this.getContentMeta();
        if (classicColorSet || brightPastEvent) {
          iconSrc = _client_core_assets__WEBPACK_IMPORTED_MODULE_3__.calendlyLogoDark_legacy;
        } else {
          iconSrc = _client_core_assets__WEBPACK_IMPORTED_MODULE_3__.calendlyLogoWhite_legacy;
        }
      }
      this.originalStyles = elStyles;
    }
    if (this.eventColorsEnabled) {
      this.updateEventColor(true);
    }
    if (this.viewKey === viewKeys.agenda) {
      iconMarginRight = '8px';
    }
    iconEl.style.height = iconSize;
    iconEl.style.width = iconSize;
    iconEl.style.fontSize = iconSize;
    iconEl.style.overflow = 'hidden';
    iconEl.style.marginRight = iconMarginRight;
    const is = iconSrc.replace('?legacy', '');
    iconEl.src = `${webextension_polyfill__WEBPACK_IMPORTED_MODULE_2___default().runtime.getURL(is)}`;
    wrapperEl.style.display = 'flex';
    wrapperEl.style.alignItems = 'center';
    wrapperEl.appendChild(iconEl);
    this.icon = wrapperEl;
  }
  updateEventColor(eventColorsEnabled) {
    var _this$originalStyles;
    this.eventColorsEnabled = eventColorsEnabled;
    const isBg = (_this$originalStyles = this.originalStyles) == null ? void 0 : _this$originalStyles.includes('background-color');
    if (eventColorsEnabled) {
      const [classicColorSet, brightPastEvent] = this.getContentMeta();
      let colorClass = isBg ? 'calendly-bg-blue' : 'calendly-border-blue';
      let textColorClass = 'calendly-color-blue';
      if (classicColorSet && brightPastEvent) {
        colorClass += '-brighter';
        textColorClass += '-brighter';
      } else if (classicColorSet || brightPastEvent) {
        colorClass += '-bright';
        textColorClass += '-bright';
      }
      if (isBg) {
        jquery__WEBPACK_IMPORTED_MODULE_1___default()(this.node).removeClass(bgColorClasses).addClass(colorClass);
      } else {
        this.colorNode().removeClass(borderColorClasses).addClass(colorClass);
        jquery__WEBPACK_IMPORTED_MODULE_1___default()(this.node).find('.fFwDnf').removeClass(colorClasses).addClass(textColorClass);
      }
    } else {
      if (isBg) {
        jquery__WEBPACK_IMPORTED_MODULE_1___default()(this.node).removeClass(bgColorClasses);
      } else {
        this.colorNode().removeClass(borderColorClasses);
        jquery__WEBPACK_IMPORTED_MODULE_1___default()(this.node).find('.fFwDnf').removeClass(colorClasses);
      }
    }
  }
  colorNode() {
    switch (this.viewKey) {
      case viewKeys.month:
      case viewKeys.year:
      case viewKeys.customWeeks:
        return jquery__WEBPACK_IMPORTED_MODULE_1___default()(this.node).find('.VlNR9e');
      case viewKeys.agenda:
        return jquery__WEBPACK_IMPORTED_MODULE_1___default()(this.node).find('.poxnAc');
      default:
        return jquery__WEBPACK_IMPORTED_MODULE_1___default()(this.node);
    }
  }
  content() {
    let contentSelector = '.KcY3wb'; // Horizontal view

    switch (this.viewKey) {
      case viewKeys.month:
      case viewKeys.year:
      case viewKeys.customWeeks:
        contentSelector = '.WBi6vc';
        break;
      case viewKeys.agenda:
        contentSelector = '[data-eventid]';
        break;
    }
    return jquery__WEBPACK_IMPORTED_MODULE_1___default()(this.node).find(contentSelector);
  }
  getContentMeta() {
    var _this$colorNode$attr;
    const content = this.content();
    const parent = content.parent();
    const grandParent = parent.parent();
    const classicColorSet = content.hasClass('qqMC3e') || parent.hasClass('qqMC3e') || grandParent.hasClass('qqMC3e') || this.viewKey === viewKeys.agenda && (
    //  Google doesn't add the qqMC3e class in the Schedule view so we need to check by border-color
    ((_this$colorNode$attr = this.colorNode().attr('style')) == null ? void 0 : _this$colorNode$attr.toLowerCase().replace(/\s/g, '').split(';').some(e => {
      const [key, value] = e.split(':');
      return key === 'border-color' && (classicEventColors.includes(value) || classicEventColorsBright.includes(value));
    })) || false);
    const brightPastEvent = content.hasClass('UflSff') || parent.hasClass('UflSff') || grandParent.hasClass('UflSff');
    return [classicColorSet, brightPastEvent];
  }
  valid() {
    const dataEventId = this.node.getAttribute('data-eventid');
    if (!dataEventId) return false;
    const eventId = buffer__WEBPACK_IMPORTED_MODULE_0__.Buffer.from(dataEventId, 'base64').toString().split(' ')[0];
    return eventId === this.scheduledEvent.externalId;
  }
  exists() {
    return this.icon && document.body.contains(this.icon);
  }
  cleanup(removeIcon = true) {
    this.updateEventColor(false);
    if (removeIcon && this.icon) {
      jquery__WEBPACK_IMPORTED_MODULE_1___default()(this.icon).remove();
    }
  }
}
const bgColorClasses = ['calendly-bg-blue', 'calendly-bg-blue-bright', 'calendly-bg-blue-brighter'];
const borderColorClasses = ['calendly-border-blue', 'calendly-border-blue-bright', 'calendly-border-blue-brighter'];
const colorClasses = ['calendly-color-blue', 'calendly-color-blue-bright', 'calendly-color-blue-brighter'];
const classicEventColors = ['rgb(204,166,172)',
// Radicchio
'rgb(250,87,60)',
// Tangerine
'rgb(251,233,131)',
// Citron
'rgb(22,167,101)',
// Basil
'rgb(73,134,231)',
// Blueberry
'rgb(205,116,230)',
// Grape
'rgb(246,145,178)',
// Cherry Blossom
'rgb(255,117,55)',
// Pumpkin
'rgb(179,220,108)',
// Avocado
'rgb(66,214,146)',
// Eucalyptus
'rgb(154,156,255)',
// Lavender
'rgb(172,114,94)',
// Cocoa
'rgb(248,58,34)',
// Tomato
'rgb(255,173,70)',
// Mango
'rgb(123,209,72)',
// Pistachio
'rgb(159,225,231)',
// Peacock
'rgb(185,154,255)',
// Wisteria
'rgb(194,194,194)',
// Graphite
'rgb(208,107,100)',
// Flamingo
'rgb(250,209,101)',
// Banana
'rgb(146,225,192)',
// Sage
'rgb(159,198,231)',
// Cobalt
'rgb(164,122,226)',
// Amethyst
'rgb(202,189,191)' // Birch
];

const classicEventColorsBright = ['rgb(240,228,230)',
// Radicchio
'rgb(254,205,197)',
// Tangerine
'rgb(254,248,218)',
// Citron
'rgb(185,229,209)',
// Basil
'rgb(200,219,248)',
// Blueberry
'rgb(240,213,248)',
// Grape
'rgb(252,222,232)',
// Cherry Blossom
'rgb(255,214,195)',
// Pumpkin
'rgb(232,245,211)',
// Avocado
'rgb(198,243,222)',
// Eucalyptus
'rgb(225,225,255)',
// Lavender
'rgb(230,213,207)',
// Cocoa
'rgb(253,196,189)',
// Tomato
'rgb(255,230,200)',
// Mango
'rgb(215,241,200)',
// Pistachio
'rgb(226,246,248)',
// Peacock
'rgb(234,225,255)',
// Wisteria
'rgb(237,237,237)',
// Graphite
'rgb(241,211,209)',
// Flamingo
'rgb(254,241,209)',
// Banana
'rgb(222,246,236)',
// Sage
'rgb(226,238,248)',
// Cobalt
'rgb(228,215,246)',
// Amethyst
'rgb(239,235,236)' // Birch
];

/***/ }),

/***/ "../../libs/features/gcal/src/lib/components/OptionsColumn.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OptionsColumn: () => (/* binding */ OptionsColumn)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/webextension-polyfill/dist/browser-polyfill.js");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(webextension_polyfill__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _client_core_theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../libs/theme/src/index.ts");




class OptionsColumn {
  constructor(el, darkTheme) {
    this.id = void 0;
    this.bar = void 0;
    this.barFrame = void 0;
    this.darkTheme = false;
    this.el = el;
    this.id = (0,uuid__WEBPACK_IMPORTED_MODULE_3__["default"])();
    this.darkTheme = darkTheme;
    this.showConfigBar();
  }
  showConfigBar() {
    const params = new URLSearchParams();
    if (this.darkTheme) {
      params.set('darkTheme', 'true');
    }
    const barEl = document.createElement('div');
    barEl.id = `calendly-options-config-bar-${this.id}`;
    barEl.classList.add('calendly-options-column-handled');
    if (this.darkTheme) {
      barEl.style.backgroundColor = _client_core_theme__WEBPACK_IMPORTED_MODULE_2__.gcalDarkSidebarColor;
    }
    this.content().after(barEl);
    const barFrame = document.createElement('iframe');
    barFrame.id = `calendly-options-config-frame-${this.id}`;
    barFrame.frameBorder = '0';
    barFrame.src = `${webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default().runtime.getURL('/pages/iframe_gCalConfigBar.html')}?${params.toString()}`;
    barFrame.style.display = 'block';
    barFrame.style.height = '74px';
    barFrame.style.width = '100%';
    barFrame.style.overflow = 'hidden';
    if (this.darkTheme) {
      barFrame.style.opacity = '0';
    }
    barFrame.onload = () => {
      setTimeout(() => {
        barFrame.style.opacity = '1';
      }, 30);
    };
    barEl.appendChild(barFrame);
    this.barFrame = barFrame;
    this.bar = barEl;
  }
  content() {
    return jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.el);
  }
  setDarkTheme(val) {
    if (val !== this.darkTheme && this.barFrame) {
      var _this$barFrame$conten;
      this.darkTheme = val;
      (_this$barFrame$conten = this.barFrame.contentWindow) == null || _this$barFrame$conten.postMessage({
        action: 'setDarkTheme',
        component: 'configBar',
        value: val
      }, '*');
    }
  }
  cleanup() {
    if (this.bar) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.bar).remove();
    }
  }
}

/***/ }),

/***/ "../../libs/features/gcal/src/lib/components/RescheduleModal.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RescheduleModal: () => (/* binding */ RescheduleModal)
/* harmony export */ });
/* harmony import */ var _floating_ui_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs");
/* harmony import */ var _floating_ui_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.mjs");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/webextension-polyfill/dist/browser-polyfill.js");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__);


class RescheduleModal {
  constructor({
    id,
    tabId,
    parent,
    placement,
    scheduledEvent,
    source,
    inviteeAction,
    guests
  }) {
    this.id = void 0;
    this.tabId = void 0;
    this.parent = void 0;
    this.popoverContent = void 0;
    this.scheduledEvent = void 0;
    this.source = void 0;
    this.inviteeAction = void 0;
    this.guests = void 0;
    this.placement = void 0;
    this.onClick = ev => {
      if (this.popoverContent.style.display === 'block' && document.contains(this.popoverContent) && !this.popoverContent.contains(ev.target)) {
        var _window$top;
        this.hide();
        (_window$top = window.top) == null || _window$top.postMessage({
          action: 'close',
          component: 'reschedule_modal',
          barId: this.id,
          inviteeAction: this.inviteeAction
        }, '*');
      }
    };
    this.id = id;
    this.tabId = tabId;
    this.parent = parent;
    this.scheduledEvent = scheduledEvent;
    this.source = source;
    this.inviteeAction = inviteeAction;
    this.guests = guests;
    this.placement = placement != null ? placement : 'top-end';
    const params = new URLSearchParams();
    params.set('source', this.source);
    params.set('barid', this.id);
    params.set('tabid', this.tabId.toString());
    params.set('uuid', this.scheduledEvent.uuid);
    params.set('placement', this.placement);
    params.set('inviteeAction', this.inviteeAction || '');
    params.set('guests', this.guests || '');
    const popoverFrame = document.createElement('iframe');
    popoverFrame.id = `calendly-popover-frame-${this.id}`;
    popoverFrame.src = `${webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.getURL(`/pages/iframe_gCalReschedulePopover.html?${params.toString()}`)}`;
    Object.assign(popoverFrame.style, {
      border: '0',
      display: 'block',
      height: '374px',
      width: '260px',
      overflow: 'hidden'
    });
    this.popoverContent = document.createElement('div');
    this.popoverContent.id = `calendly-event-popover-${this.id}`;
    Object.assign(this.popoverContent.style, {
      display: 'none',
      position: 'absolute',
      width: 'max-content',
      top: '0',
      left: '0',
      zIndex: '5'
    });
    this.popoverContent.appendChild(popoverFrame);
    this.parent.appendChild(this.popoverContent);
    window.addEventListener('click', this.onClick);
  }
  async update() {
    const {
      x,
      y
    } = await (0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_1__.computePosition)(this.parent, this.popoverContent, {
      placement: this.placement,
      middleware: [(0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_2__.flip)(), (0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_2__.shift)()]
    });
    Object.assign(this.popoverContent.style, {
      left: `${x}px`,
      top: `${y}px`
    });
  }
  show() {
    this.popoverContent.style.display = 'block';
    this.update();
  }
  hide() {
    this.popoverContent.style.display = 'none';
    this.update();
  }
  toggle() {
    if (this.popoverContent.style.display === 'block') {
      this.hide();
    } else {
      this.show();
    }
  }
  cleanup() {
    window.removeEventListener('click', this.onClick);
  }
}

/***/ }),

/***/ "../../libs/features/gcal/src/lib/components/bar.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Bar: () => (/* binding */ Bar)
/* harmony export */ });
/* harmony import */ var _calendly_ui_components_icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../@calendly/ui/dist/components/icons/index.js");
/* harmony import */ var _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../@calendly/ui/dist/theme.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("../../node_modules/zustand/esm/index.mjs");
/* harmony import */ var _client_core_assets__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../libs/assets/src/index.ts");
/* harmony import */ var _client_core_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../libs/helpers/src/index.ts");
/* harmony import */ var _client_core_hooks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../libs/hooks/src/index.ts");
/* harmony import */ var _client_core_platform__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../libs/platform/src/index.ts");
/* harmony import */ var _client_core_shared_components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../../libs/shared/components/src/index.ts");
/* harmony import */ var _client_core_store__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("../../libs/store/src/index.ts");
/* harmony import */ var _client_core_theme__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("../../libs/theme/src/index.ts");
/* harmony import */ var _client_core_types__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("../../libs/types/src/index.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("../../node_modules/react/jsx-dev-runtime.js");
var _jsxFileName = "/app/libs/features/gcal/src/lib/components/bar.tsx";
















const Bar = props => {
  const tabId = props.tabId;
  const {
    dataStore,
    uiStore
  } = (0,_client_core_store__WEBPACK_IMPORTED_MODULE_8__.useCombinedStore)();
  const user = (0,zustand__WEBPACK_IMPORTED_MODULE_12__.useStore)(dataStore, _client_core_store__WEBPACK_IMPORTED_MODULE_8__.userSelector);
  const openDrawerForTab = (0,zustand__WEBPACK_IMPORTED_MODULE_12__.useStore)(uiStore, _client_core_store__WEBPACK_IMPORTED_MODULE_8__.openDrawerForTabSelector);
  const params = new URL(window.location.href).searchParams;
  const source = params.get('source') || 'unknown';
  const uuid = params.get('uuid');
  const barId = params.get('barid');
  const darkTheme = Boolean(params.get('darkTheme'));
  const platform = (0,_client_core_hooks__WEBPACK_IMPORTED_MODULE_5__.usePlatform)();
  const {
    scheduledEvent
  } = (0,_client_core_hooks__WEBPACK_IMPORTED_MODULE_5__.useGetScheduledEvent)(uuid);
  const eventTimeStatus = (0,_client_core_hooks__WEBPACK_IMPORTED_MODULE_5__.useEventTimeStatus)(scheduledEvent);
  const HrrRescheduleFlag = (0,_client_core_hooks__WEBPACK_IMPORTED_MODULE_5__.useFlag)(_client_core_store__WEBPACK_IMPORTED_MODULE_8__.FeatureFlagName.invitee_experience_extension_hrr).enabled;
  const prevUserIdRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)();
  const isMoreMenuOpen = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(false);
  const isRescheduleModalOpen = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(false);
  const isInviteesBookModalOpen = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(false);
  const containerRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
  const [isFollowUpActionsModalOpen, setIsFollowUpActionsModalOpen] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  const bookButtonRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
  const followUpActionsButtonRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
  (0,_client_core_hooks__WEBPACK_IMPORTED_MODULE_5__.useClickOutside)(followUpActionsButtonRef, () => {
    var _window$top;
    (_window$top = window.top) == null || _window$top.postMessage({
      action: 'close',
      component: 'follow_up_actions_modal',
      barId
    }, '*');
  });
  (0,_client_core_hooks__WEBPACK_IMPORTED_MODULE_5__.useClickOutside)(bookButtonRef, () => {
    var _window$top2;
    (_window$top2 = window.top) == null || _window$top2.postMessage({
      action: 'close',
      component: 'reschedule_modal',
      inviteeAction: 'book',
      barId
    }, '*');
  });
  const rescheduleButtonRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
  (0,_client_core_hooks__WEBPACK_IMPORTED_MODULE_5__.useClickOutside)(rescheduleButtonRef, () => {
    var _window$top3;
    (_window$top3 = window.top) == null || _window$top3.postMessage({
      action: 'close',
      component: 'reschedule_modal',
      barId
    }, '*');
  });
  const moreButtonRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
  (0,_client_core_hooks__WEBPACK_IMPORTED_MODULE_5__.useClickOutside)(moreButtonRef, () => {
    var _window$top4;
    (_window$top4 = window.top) == null || _window$top4.postMessage({
      action: 'close',
      component: 'gcal_bar_actions_menu',
      barId
    }, '*');
  });
  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    if (user != null && user.id && prevUserIdRef.current !== user.id) {
      platform.analytics.setUser(user);
      platform.analytics.track(_client_core_types__WEBPACK_IMPORTED_MODULE_10__.AnalyticsEvent.GCalEventBarShown, {
        source
      });
      prevUserIdRef.current = user.id;
    } else if (!user) {
      prevUserIdRef.current = undefined;
    }
  }, [platform.analytics, source, user]);
  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    const handleMesssage = msg => {
      const {
        action,
        component
      } = msg.data || {};
      if (action === 'focusGcalBar') {
        if (component === 'firstChild') {
          (0,_client_core_helpers__WEBPACK_IMPORTED_MODULE_4__.focusFirstChild)(containerRef.current);
        } else if (component === 'lastChild') {
          (0,_client_core_helpers__WEBPACK_IMPORTED_MODULE_4__.focusLastChild)(containerRef.current);
        } else if (component === 'moreButton') {
          var _moreButtonRef$curren;
          (_moreButtonRef$curren = moreButtonRef.current) == null || _moreButtonRef$curren.focus();
        } else if (component === 'bookButton') {
          var _bookButtonRef$curren;
          (_bookButtonRef$curren = bookButtonRef.current) == null || _bookButtonRef$curren.focus();
        } else if (component === 'rescheduleButton') {
          var _rescheduleButtonRef$;
          (_rescheduleButtonRef$ = rescheduleButtonRef.current) == null || _rescheduleButtonRef$.focus();
        }
      } else if (component === 'gcal_bar_actions_menu') {
        switch (action) {
          case 'open':
            isMoreMenuOpen.current = true;
            break;
          case 'close':
            isMoreMenuOpen.current = false;
            break;
          case 'toggle_menu':
            isMoreMenuOpen.current = !isMoreMenuOpen.current;
            break;
        }
      } else if (component === 'reschedule_modal') {
        if (msg.data.inviteeAction === 'book') {
          switch (action) {
            case 'open':
              isInviteesBookModalOpen.current = true;
              break;
            case 'close':
              isInviteesBookModalOpen.current = false;
              break;
            case 'toggle_modal':
              isInviteesBookModalOpen.current = !isInviteesBookModalOpen.current;
              break;
          }
        } else {
          switch (action) {
            case 'open':
              isRescheduleModalOpen.current = true;
              break;
            case 'close':
              isRescheduleModalOpen.current = false;
              break;
            case 'toggle_modal':
              isRescheduleModalOpen.current = !isRescheduleModalOpen.current;
              break;
          }
        }
      } else if (component === 'follow_up_actions_modal') {
        switch (action) {
          case 'open':
            setIsFollowUpActionsModalOpen(true);
            break;
          case 'close':
            setIsFollowUpActionsModalOpen(false);
            break;
          case 'toggle_modal':
            setIsFollowUpActionsModalOpen(prevState => !prevState);
            break;
        }
      }
    };
    window.addEventListener('message', handleMesssage);
    return () => {
      window.removeEventListener('message', handleMesssage);
    };
  }, []);
  const {
    rescheduleButtonLabel,
    showFollowUpActionsButton
  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(() => {
    let rescheduleButtonLabel = null;
    let showFollowUpActionsButton = false;
    if (scheduledEvent) {
      const eventTypeType = scheduledEvent.eventTypeType;
      showFollowUpActionsButton = !scheduledEvent.isCanceled && eventTimeStatus !== _client_core_platform__WEBPACK_IMPORTED_MODULE_6__.EventTimeStatus.future;
      if (!showFollowUpActionsButton && !scheduledEvent.isCanceled && eventTimeStatus !== _client_core_platform__WEBPACK_IMPORTED_MODULE_6__.EventTimeStatus.past) {
        switch (eventTypeType) {
          case 'solo':
          case 'collective':
          case 'round_robin':
          case 'multi_pool':
            rescheduleButtonLabel = 'Reschedule event';
            break;
          case 'group':
            rescheduleButtonLabel = 'Reschedule invitees';
            break;
        }
      }
    }
    return {
      rescheduleButtonLabel,
      showFollowUpActionsButton
    };
  }, [scheduledEvent, eventTimeStatus]);
  if (!scheduledEvent) {
    return null;
  }
  if (!scheduledEvent.eventType) {
    return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(Container, {
      darkTheme: darkTheme,
      source: source,
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(_client_core_shared_components__WEBPACK_IMPORTED_MODULE_7__.LoaderDots, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 242,
        columnNumber: 9
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 241,
      columnNumber: 7
    }, undefined);
  }
  const eventTypeType = scheduledEvent.eventTypeType;
  const handleReschedule = () => {
    if (HrrRescheduleFlag) {
      openDrawerForTab(tabId, _client_core_store__WEBPACK_IMPORTED_MODULE_8__.DrawerType.HrrReschedule, {
        meetingId: scheduledEvent.uuid,
        source: 'gcal'
      });
    } else {
      platform.analytics.track(_client_core_types__WEBPACK_IMPORTED_MODULE_10__.AnalyticsEvent.GCalRescheduleClick, {
        source
      });
      if (scheduledEvent.eventTypeType === 'group') {
        var _window$top5;
        (_window$top5 = window.top) == null || _window$top5.postMessage({
          action: 'toggle_modal',
          component: 'reschedule_modal',
          barId
        }, '*');
      } else {
        if (scheduledEvent.invitees.length) {
          platform.flow.webReschedulings({
            inviteeUuid: scheduledEvent.invitees[0].uuid,
            rescheduleUrl: scheduledEvent.invitees[0].rescheduleUrl,
            source
          });
        }
      }
    }
  };
  const handleMoreButton = () => {
    var _window$top6;
    (_window$top6 = window.top) == null || _window$top6.postMessage({
      action: 'toggle_menu',
      component: 'gcal_bar_actions_menu',
      barId
    }, '*');
  };
  const handleKeyDownReschedule = e => {
    if (e.code === 'Tab') {
      if (e.shiftKey) {
        e.preventDefault();
        window.parent.postMessage({
          action: 'focusGcalBar',
          component: 'prevSibling',
          barId
        }, '*');
        if (isRescheduleModalOpen.current) {
          var _window$top7;
          (_window$top7 = window.top) == null || _window$top7.postMessage({
            action: 'close',
            component: 'reschedule_modal',
            barId,
            inviteeAction: 'reschedule'
          }, '*');
        }
      } else {
        if (isRescheduleModalOpen.current) {
          e.preventDefault();
          window.parent.postMessage({
            action: 'focusGcalBar',
            component: 'rescheduleModal',
            barId
          }, '*');
        }
      }
    }
  };
  const handleKeyDownMoreButton = e => {
    if (e.code === 'Tab') {
      if (e.shiftKey) {
        if (isMoreMenuOpen.current) {
          var _window$top8;
          (_window$top8 = window.top) == null || _window$top8.postMessage({
            action: 'close',
            component: 'gcal_bar_actions_menu',
            barId
          }, '*');
        }
        if (!rescheduleButtonLabel) {
          e.preventDefault();
          window.parent.postMessage({
            action: 'focusGcalBar',
            component: 'prevSibling',
            barId
          }, '*');
        }
      } else {
        e.preventDefault();
        if (isMoreMenuOpen.current) {
          window.parent.postMessage({
            action: 'focusGcalBar',
            component: 'barActionsMenu',
            barId
          }, '*');
        } else {
          window.parent.postMessage({
            action: 'focusGcalBar',
            component: 'nextSibling',
            barId
          }, '*');
        }
      }
    }
  };
  const handleFollowUpActionsButton = () => {
    var _window$top9;
    (_window$top9 = window.top) == null || _window$top9.postMessage({
      action: 'toggle_modal',
      component: 'follow_up_actions_modal',
      barId
    }, '*');
  };
  const handleKeyDownFollowUpActionsButton = e => {
    if (e.code === 'Tab') {
      e.preventDefault();
      if (isFollowUpActionsModalOpen) {
        e.preventDefault();
        window.parent.postMessage({
          action: 'focusGcalBar',
          component: 'followUpActionsModal',
          barId
        }, '*');
      } else {
        e.preventDefault();
        window.parent.postMessage({
          action: 'focusGcalBar',
          component: 'nextSibling',
          barId
        }, '*');
      }
    }
  };
  const etContent = scheduledEvent.isCanceled ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(TitleLabel, {
      darkTheme: darkTheme,
      children: eventTypeType === 'one_off' || eventTypeType === 'poll' ? scheduledEvent.eventTypeTypeDescription : scheduledEvent.eventType.name
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 398,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(TypeLabel, {
      children: "Canceled event"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 403,
      columnNumber: 7
    }, undefined)]
  }, void 0, true) : eventTypeType === 'one_off' || eventTypeType === 'poll' ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(TitleLabel, {
    darkTheme: darkTheme,
    children: scheduledEvent.eventTypeTypeDescription
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 406,
    columnNumber: 5
  }, undefined) : /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(TitleContainer, {
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(TitleLabel, {
        darkTheme: darkTheme,
        children: scheduledEvent.eventType.name
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 412,
        columnNumber: 9
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 411,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(TypeLabel, {
      children: scheduledEvent.eventTypeTypeDescription
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 416,
      columnNumber: 7
    }, undefined)]
  }, void 0, true);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(Container, {
    darkTheme: darkTheme,
    source: source,
    ref: containerRef,
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(CalendlyLogo, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 422,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(ETContainer, {
      children: etContent
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 423,
      columnNumber: 7
    }, undefined), showFollowUpActionsButton && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(Button, {
      darkTheme: darkTheme,
      ref: followUpActionsButtonRef,
      onClick: handleFollowUpActionsButton,
      onKeyDown: handleKeyDownFollowUpActionsButton,
      children: ["Follow-up actions", isFollowUpActionsModalOpen ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(_calendly_ui_components_icons__WEBPACK_IMPORTED_MODULE_0__.ArrowChevronUpMiniIcon, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 433,
        columnNumber: 13
      }, undefined) : /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(_calendly_ui_components_icons__WEBPACK_IMPORTED_MODULE_0__.ArrowChevronDownMiniIcon, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 435,
        columnNumber: 13
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 425,
      columnNumber: 9
    }, undefined), rescheduleButtonLabel && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(Button, {
      darkTheme: darkTheme,
      ref: rescheduleButtonRef,
      onClick: handleReschedule,
      onKeyDown: handleKeyDownReschedule,
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(_calendly_ui_components_icons__WEBPACK_IMPORTED_MODULE_0__.ArrowSyncIcon, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 446,
        columnNumber: 11
      }, undefined), rescheduleButtonLabel]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 440,
      columnNumber: 9
    }, undefined), !scheduledEvent.isCanceled && !showFollowUpActionsButton && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(MoreButton, {
      darkTheme: darkTheme,
      ref: moreButtonRef,
      onClick: handleMoreButton,
      onKeyDown: handleKeyDownMoreButton
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 451,
      columnNumber: 9
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 421,
    columnNumber: 5
  }, undefined);
};
const Container = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_13__["default"].div.withConfig({
  displayName: "bar__Container",
  componentId: "sc-1t7f8y6-0"
})(["display:flex;align-items:center;justify-content:center;height:64px;", " ", " ", " ", ""], ({
  source,
  darkTheme
}) => darkTheme && source === 'details' && `background-color: ${_client_core_theme__WEBPACK_IMPORTED_MODULE_9__.gcalDarkBgColor};`, ({
  source,
  darkTheme
}) => darkTheme && source === 'edit' && `background-color: ${_client_core_theme__WEBPACK_IMPORTED_MODULE_9__.gcalDarkerBgColor};`, ({
  darkTheme
}) => darkTheme && `color: ${_client_core_theme__WEBPACK_IMPORTED_MODULE_9__.gcalDarkFontColor};`, ({
  source,
  darkTheme
}) => source === 'details' ? (0,styled_components__WEBPACK_IMPORTED_MODULE_13__.css)(["padding:0 8px 0 12px;border-top:", " 1px solid;"], darkTheme ? _client_core_theme__WEBPACK_IMPORTED_MODULE_9__.gcalDarkBorderColor : _client_core_theme__WEBPACK_IMPORTED_MODULE_9__.gcalBorderColor) : (0,styled_components__WEBPACK_IMPORTED_MODULE_13__.css)(["padding:0 0 0 16px;"]));
const ETContainer = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_13__["default"].div.withConfig({
  displayName: "bar__ETContainer",
  componentId: "sc-1t7f8y6-1"
})(["display:flex;flex:1;flex-direction:column;padding:0 16px;overflow:hidden;"]);
const TitleContainer = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_13__["default"].div.withConfig({
  displayName: "bar__TitleContainer",
  componentId: "sc-1t7f8y6-2"
})(["display:flex;"]);
const TitleLabel = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_13__["default"].span.withConfig({
  displayName: "bar__TitleLabel",
  componentId: "sc-1t7f8y6-3"
})(["margin-right:8px;font-size:14px;line-height:16px;color:", ";white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"], props => props.darkTheme ? _client_core_theme__WEBPACK_IMPORTED_MODULE_9__.gcalDarkMutedFontColor : _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_1__.textColorSecondary1);
const TypeLabel = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_13__["default"].span.withConfig({
  displayName: "bar__TypeLabel",
  componentId: "sc-1t7f8y6-4"
})(["margin-top:3px;font-size:12px;line-height:14px;color:", ";"], props => props.darkTheme ? _client_core_theme__WEBPACK_IMPORTED_MODULE_9__.gcalDarkFontColor : _client_core_theme__WEBPACK_IMPORTED_MODULE_9__.textColorL1_5);
const CalendlyLogo = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_13__["default"].img.attrs(props => ({
  src: _client_core_assets__WEBPACK_IMPORTED_MODULE_3__.calendlyLogo_legacy,
  alt: 'Calendly logo'
})).withConfig({
  displayName: "bar__CalendlyLogo",
  componentId: "sc-1t7f8y6-5"
})(["width:24px;height:24px;"]);
const Button = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_13__["default"].button.withConfig({
  displayName: "bar__Button",
  componentId: "sc-1t7f8y6-6"
})(["display:flex;align-items:center;gap:8px;width:auto;height:30px;padding:0 16px;font-family:'Google Sans',Roboto,Arial,sans-serif;font-weight:500;font-size:12px;line-height:14px;border:1px solid ", ";border:1px solid ", ";border-radius:24px;cursor:pointer;background-color:transparent;&:hover:not(:disabled){background-color:", ";background-color:", ";}&:focus-visible{outline-width:2px;outline-style:solid;outline-color:", ";outline-offset:-2px;}"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_1__.colorGrey3, ({
  darkTheme
}) => darkTheme ? _client_core_theme__WEBPACK_IMPORTED_MODULE_9__.gcalDarkBorderColor : _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_1__.colorGrey3, _client_core_theme__WEBPACK_IMPORTED_MODULE_9__.gcalHoverBgColor, ({
  darkTheme
}) => darkTheme ? _client_core_theme__WEBPACK_IMPORTED_MODULE_9__.gcalDarkHoverColor : _client_core_theme__WEBPACK_IMPORTED_MODULE_9__.gcalHoverBgColor, _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_1__.primaryColorL1);
const MoreButton = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_13__["default"].button.attrs({
  children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(_calendly_ui_components_icons__WEBPACK_IMPORTED_MODULE_0__.SettingsMenuVerticalIcon, {}, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 557,
    columnNumber: 13
  }, undefined)
}).withConfig({
  displayName: "bar__MoreButton",
  componentId: "sc-1t7f8y6-7"
})(["border:none;outline:none;padding:8px;margin-left:4px;background:inherit;cursor:pointer;white-space:nowrap;display:flex;align-items:center;color:", ";border-radius:4px;&:hover:not(:disabled){background-color:", ";}&:focus-visible{outline-width:2px;outline-style:solid;outline-color:", ";outline-offset:-2px;}"], props => props.darkTheme ? _client_core_theme__WEBPACK_IMPORTED_MODULE_9__.gcalDarkFontColor : _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_1__.textColorL1, props => props.darkTheme ? _client_core_theme__WEBPACK_IMPORTED_MODULE_9__.gcalDarkHoverColor : _client_core_theme__WEBPACK_IMPORTED_MODULE_9__.gcalHoverBgColor, props => props.darkTheme ? _client_core_theme__WEBPACK_IMPORTED_MODULE_9__.gcalDarkBorderColor : _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_1__.primaryColorL1);

/***/ }),

/***/ "../../libs/features/gcal/src/lib/components/barActionsMenu.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BarActionsMenu: () => (/* binding */ BarActionsMenu)
/* harmony export */ });
/* harmony import */ var _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../@calendly/ui/dist/theme.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("../../node_modules/zustand/esm/index.mjs");
/* harmony import */ var _client_core_assets__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../libs/assets/src/index.ts");
/* harmony import */ var _client_core_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../libs/helpers/src/index.ts");
/* harmony import */ var _client_core_hooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../libs/hooks/src/index.ts");
/* harmony import */ var _client_core_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../libs/store/src/index.ts");
/* harmony import */ var _client_core_theme__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../libs/theme/src/index.ts");
/* harmony import */ var _client_core_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../../libs/types/src/index.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("../../node_modules/react/jsx-dev-runtime.js");
var _jsxFileName = "/app/libs/features/gcal/src/lib/components/barActionsMenu.tsx";











const BarActionsMenu = props => {
  const tabId = props.tabId;
  const {
    uiStore
  } = (0,_client_core_store__WEBPACK_IMPORTED_MODULE_5__.useCombinedStore)();
  const params = new URL(window.location.href).searchParams;
  const source = params.get('source') || 'unknown';
  const uuid = params.get('uuid');
  const barId = params.get('barid');
  const placement = params.get('placement');
  const darkTheme = Boolean(params.get('darkTheme'));
  const handleClose = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    var _window$top;
    (_window$top = window.top) == null || _window$top.postMessage({
      action: 'close',
      component: 'gcal_bar_actions_menu',
      barId
    }, '*');
  }, [barId]);
  const platform = (0,_client_core_hooks__WEBPACK_IMPORTED_MODULE_4__.usePlatform)();
  const modalRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const {
    scheduledEvent
  } = (0,_client_core_hooks__WEBPACK_IMPORTED_MODULE_4__.useGetScheduledEvent)(uuid);
  (0,_client_core_hooks__WEBPACK_IMPORTED_MODULE_4__.useClickOutside)(modalRef, handleClose);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (darkTheme) {
      document.body.style.background = _client_core_theme__WEBPACK_IMPORTED_MODULE_6__.gcalDarkBgColor;
    }
  }, [darkTheme]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    let firstEl;
    let lastEl;
    const handleFirstEl = e => {
      if (e instanceof KeyboardEvent && e.code === 'Tab' && e.shiftKey) {
        e.preventDefault();
        window.parent.postMessage({
          action: 'focusGcalBar',
          component: 'moreButton',
          barId
        }, '*');
      }
    };
    const handleLastEl = e => {
      if (e instanceof KeyboardEvent && e.code === 'Tab' && !e.shiftKey) {
        e.preventDefault();
        const target = e.target;
        if (target instanceof HTMLElement) {
          target.blur();
        }
        handleClose();
        window.parent.postMessage({
          action: 'focusGcalBar',
          component: 'nextSibling',
          barId
        }, '*');
      }
    };
    if (scheduledEvent) {
      requestAnimationFrame(() => {
        const focusableElements = (0,_client_core_helpers__WEBPACK_IMPORTED_MODULE_3__.getFocusableElements)(modalRef.current);
        if (focusableElements != null && focusableElements.length) {
          var _firstEl, _lastEl, _firstEl2, _lastEl2;
          (_firstEl = firstEl) == null || _firstEl.removeEventListener('keydown', handleFirstEl);
          (_lastEl = lastEl) == null || _lastEl.removeEventListener('keydown', handleLastEl);
          firstEl = focusableElements.item(0);
          lastEl = focusableElements.item(focusableElements.length - 1);
          (_firstEl2 = firstEl) == null || _firstEl2.addEventListener('keydown', handleFirstEl);
          (_lastEl2 = lastEl) == null || _lastEl2.addEventListener('keydown', handleLastEl);
        }
      });
    }
    const handleMesssage = msg => {
      const {
        action,
        component
      } = msg.data || {};
      if (action === 'focusGcalBar') {
        if (component === 'barActionsMenu') {
          (0,_client_core_helpers__WEBPACK_IMPORTED_MODULE_3__.focusFirstChild)(modalRef.current);
        }
      }
    };
    window.addEventListener('message', handleMesssage);
    return () => {
      if (firstEl) firstEl.removeEventListener('keydown', handleFirstEl);
      if (lastEl) lastEl.removeEventListener('keydown', handleLastEl);
      window.removeEventListener('message', handleMesssage);
    };
  }, [barId, handleClose, scheduledEvent]);
  const openDrawerForTab = (0,zustand__WEBPACK_IMPORTED_MODULE_9__.useStore)(uiStore, _client_core_store__WEBPACK_IMPORTED_MODULE_5__.openDrawerForTabSelector);
  if (!scheduledEvent || !tabId) return null;
  const handleViewDetails = async event => {
    event.stopPropagation();
    event.preventDefault();
    openDrawerForTab(tabId, _client_core_store__WEBPACK_IMPORTED_MODULE_5__.DrawerType.Meeting, {
      meetingId: scheduledEvent.uuid
    });
    await platform.analytics.track(_client_core_types__WEBPACK_IMPORTED_MODULE_7__.AnalyticsEvent.GCalEventDetailsView, {
      source
    });
    handleClose();
  };
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(Container, {
    placement: placement || 'top-end',
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(MenuContainer, {
      ref: modalRef,
      darkTheme: darkTheme,
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(MenuLink, {
        onClick: handleViewDetails,
        darkTheme: darkTheme,
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(_client_core_assets__WEBPACK_IMPORTED_MODULE_2__.OpenIcon, {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 147,
          columnNumber: 11
        }, undefined), "View details"]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 146,
        columnNumber: 9
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 145,
      columnNumber: 7
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 144,
    columnNumber: 5
  }, undefined);
};
const Container = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_10__["default"].div.withConfig({
  displayName: "barActionsMenu__Container",
  componentId: "sc-1levlmc-0"
})(["display:flex;flex-direction:column;justify-content:", ";bottom:2px;position:absolute;right:0;"], props => props.placement.includes('top') ? 'flex-end' : 'flex-start');
const MenuContainer = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_10__["default"].div.withConfig({
  displayName: "barActionsMenu__MenuContainer",
  componentId: "sc-1levlmc-1"
})(["display:flex;flex-direction:column;width:186px;max-height:calc(100% - 28px);background:", ";padding:8px 0px;border:1px solid ", ";box-shadow:", ";border-radius:6px;overflow:hidden;"], props => props.darkTheme ? _client_core_theme__WEBPACK_IMPORTED_MODULE_6__.gcalDarkBgColor : _client_core_theme__WEBPACK_IMPORTED_MODULE_6__.gcalHoverBgColor, props => props.darkTheme ? _client_core_theme__WEBPACK_IMPORTED_MODULE_6__.gcalDarkBorderColor : _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.colorGrey3, _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.overlayShadow);
const MenuLink = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_10__["default"].button.withConfig({
  displayName: "barActionsMenu__MenuLink",
  componentId: "sc-1levlmc-2"
})(["display:flex;align-items:center;padding:0 16px;height:36px;background:inherit;color:", ";font-size:14px;line-height:20px;border:none;outline:none;cursor:pointer;", " &:hover{background:", ";}&:focus-visible{background:", ";}&:disabled{color:", ";cursor:not-allowed;svg path{fill:", ";}}svg{margin-right:8px;}"], props => props.darkTheme ? _client_core_theme__WEBPACK_IMPORTED_MODULE_6__.gcalDarkFontColor : _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.textColorL1, props => props.darkTheme && `svg path {
    fill: ${_client_core_theme__WEBPACK_IMPORTED_MODULE_6__.gcalDarkFontColor};
  }`, props => props.darkTheme ? _client_core_theme__WEBPACK_IMPORTED_MODULE_6__.gcalDarkHoverColor : _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.primaryColorL4, props => props.darkTheme ? _client_core_theme__WEBPACK_IMPORTED_MODULE_6__.gcalDarkHoverColor : _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.primaryColorL4, _client_core_theme__WEBPACK_IMPORTED_MODULE_6__.gcalTextColorDisabled, _client_core_theme__WEBPACK_IMPORTED_MODULE_6__.gcalTextColorDisabled);

/***/ }),

/***/ "../../libs/features/gcal/src/lib/components/configBar.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ConfigBar: () => (/* binding */ ConfigBar)
/* harmony export */ });
/* harmony import */ var _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../@calendly/ui/dist/theme.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _client_core_hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../libs/hooks/src/index.ts");
/* harmony import */ var _client_core_theme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../libs/theme/src/index.ts");
/* harmony import */ var _client_core_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../libs/types/src/index.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../node_modules/react/jsx-dev-runtime.js");
var _jsxFileName = "/app/libs/features/gcal/src/lib/components/configBar.tsx";







const ConfigBar = props => {
  const platform = (0,_client_core_hooks__WEBPACK_IMPORTED_MODULE_2__.usePlatform)();
  const [gCalEventColorsEnabled, changeSettings] = (0,_client_core_hooks__WEBPACK_IMPORTED_MODULE_2__.useSettings)(state => state.gCalEventColorsEnabled);
  const params = new URL(window.location.href).searchParams;
  const [darkTheme, setDarkTheme] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(Boolean(params.get('darkTheme')));
  const handleMesssage = msg => {
    const {
      action,
      component,
      value
    } = msg.data || {};
    if (action === 'setDarkTheme' && typeof value === 'boolean') {
      if (component === 'configBar') {
        setDarkTheme(value);
      }
    }
  };
  window.addEventListener('message', handleMesssage);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(Container, {
    darkTheme: darkTheme,
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(TitleContainer, {
      darkTheme: darkTheme,
      children: "Calendly"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(OptionContainer, {
      darkTheme: darkTheme,
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(OptionLabel, {
        className: "row",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(Checkbox, {
          type: "checkbox",
          id: "gMenuEnabled",
          checked: Boolean(gCalEventColorsEnabled),
          onChange: () => {
            changeSettings({
              gCalEventColorsEnabled: Boolean(!gCalEventColorsEnabled)
            });
            platform.analytics.track(_client_core_types__WEBPACK_IMPORTED_MODULE_4__.AnalyticsEvent.IntegrationsConfigure, {
              source: 'google calendar',
              setting: `color code ${gCalEventColorsEnabled ? 'off' : 'on'}`,
              setting_name: 'gcal_color',
              edit_type: gCalEventColorsEnabled ? 'disable' : 'enable'
            });
          }
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 40,
          columnNumber: 11
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(OptionLabelText, {
          darkTheme: darkTheme,
          children: "Highlight Calendly events"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 56,
          columnNumber: 11
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 39,
        columnNumber: 9
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 36,
    columnNumber: 5
  }, undefined);
};
const Checkbox = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_6__["default"].input.withConfig({
  displayName: "configBar__Checkbox",
  componentId: "mmxm4i-0"
})(["accent-color:", ";"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.primaryColorL1);
const Container = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_6__["default"].div.withConfig({
  displayName: "configBar__Container",
  componentId: "mmxm4i-1"
})(["display:flex;flex-direction:column;padding-top:16px;", ""], props => props.darkTheme && `background-color: ${_client_core_theme__WEBPACK_IMPORTED_MODULE_3__.gcalDarkSidebarColor};`);
const TitleContainer = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_6__["default"].div.withConfig({
  displayName: "configBar__TitleContainer",
  componentId: "mmxm4i-2"
})(["display:flex;font-size:15px;font-style:normal;font-weight:500;letter-spacing:0.04em;line-height:18px;color:", ";color:", ";font-family:'Google Sans',Roboto,Arial,sans-serif;padding-left:28px;"], _client_core_theme__WEBPACK_IMPORTED_MODULE_3__.gcalTextColor, props => props.darkTheme ? _client_core_theme__WEBPACK_IMPORTED_MODULE_3__.gcalDarkFontColor : _client_core_theme__WEBPACK_IMPORTED_MODULE_3__.gcalTextColor);
const OptionContainer = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_6__["default"].div.withConfig({
  displayName: "configBar__OptionContainer",
  componentId: "mmxm4i-3"
})(["display:flex;margin-top:8px;padding-left:24px;&:hover{background-color:", ";}"], props => props.darkTheme ? _client_core_theme__WEBPACK_IMPORTED_MODULE_3__.gcalDarkHoverColor : _client_core_theme__WEBPACK_IMPORTED_MODULE_3__.gcalHoverBgColor);
const OptionLabel = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_6__["default"].label.withConfig({
  displayName: "configBar__OptionLabel",
  componentId: "mmxm4i-4"
})(["display:flex;align-items:center;font-size:14px;cursor:pointer;line-height:32px;input{width:18px;height:18px;cursor:pointer;}"]);
const OptionLabelText = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_6__["default"].span.withConfig({
  displayName: "configBar__OptionLabelText",
  componentId: "mmxm4i-5"
})(["margin-left:7px;font-style:normal;font-weight:400;font-size:14px;font-family:Roboto,Arial,sans-serif;color:", ";-webkit-font-smoothing:antialiased;"], props => props.darkTheme ? _client_core_theme__WEBPACK_IMPORTED_MODULE_3__.gcalDarkFontColor : _client_core_theme__WEBPACK_IMPORTED_MODULE_3__.gcalTextColor);

/***/ }),

/***/ "../../libs/features/gcal/src/lib/components/followUpActionsModal.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FollowUpActionsModal: () => (/* binding */ FollowUpActionsModal)
/* harmony export */ });
/* harmony import */ var _floating_ui_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs");
/* harmony import */ var _floating_ui_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.mjs");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/webextension-polyfill/dist/browser-polyfill.js");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _client_core_theme__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../libs/theme/src/index.ts");



class FollowUpActionsModal {
  constructor({
    id,
    tabId,
    parent,
    placement,
    scheduledEvent,
    source,
    darkTheme
  }) {
    this.id = void 0;
    this.tabId = void 0;
    this.parent = void 0;
    this.popoverContent = void 0;
    this.scheduledEvent = void 0;
    this.source = void 0;
    this.popoverFrame = void 0;
    this.placement = void 0;
    this.darkTheme = false;
    this.popoverCleanup = void 0;
    this.handleMessage = msg => {
      var _msg$data;
      if (((_msg$data = msg.data) == null ? void 0 : _msg$data.action) === 'setGcalPopoverHeight') {
        this.popoverFrame.style.height = `${msg.data.height}px`;
      }
    };
    this.onClick = ev => {
      if (this.popoverContent.style.display === 'block' && document.contains(this.popoverContent) && !this.popoverContent.contains(ev.target)) {
        var _window$top;
        this.hide();
        (_window$top = window.top) == null || _window$top.postMessage({
          action: 'close',
          component: 'follow_up_actions_modal',
          barId: this.id
        }, '*');
      }
    };
    this.id = id;
    this.tabId = tabId;
    this.parent = parent;
    this.scheduledEvent = scheduledEvent;
    this.source = source;
    this.placement = placement != null ? placement : 'top-end';
    this.darkTheme = darkTheme;
    const params = new URLSearchParams();
    params.set('source', this.source);
    params.set('barid', this.id);
    params.set('tabid', this.tabId.toString());
    params.set('uuid', this.scheduledEvent.uuid);
    params.set('placement', this.placement || 'top-end');
    if (this.darkTheme) {
      params.set('darkTheme', 'true');
    }
    this.popoverFrame = document.createElement('iframe');
    this.popoverFrame.id = `calendly-popover-frame-${this.id}`;
    this.popoverFrame.src = `${webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.getURL(`/pages/iframe_followUpActionsPopover.html?${params.toString()}`)}`;
    Object.assign(this.popoverFrame.style, {
      border: 0,
      display: 'block',
      width: '343px',
      overflow: 'hidden',
      position: 'relative',
      'z-index': '10000000',
      backgroundColor: this.darkTheme ? _client_core_theme__WEBPACK_IMPORTED_MODULE_1__.gcalDarkBgColor : 'transparent',
      opacity: this.darkTheme ? '0' : '1'
    });
    this.popoverFrame.onload = () => {
      setTimeout(() => {
        this.popoverFrame.style.opacity = '1';
      }, 45);
    };
    this.popoverContent = document.createElement('div');
    this.popoverContent.id = `calendly-event-popover-${this.id}`;
    Object.assign(this.popoverContent.style, {
      display: 'none',
      width: 'max-content',
      position: 'absolute',
      left: 0,
      top: 0,
      backgroundColor: 'transparent'
    });
    this.popoverContent.appendChild(this.popoverFrame);
    this.parent.appendChild(this.popoverContent);
    window.addEventListener('message', this.handleMessage);
    window.addEventListener('click', this.onClick);
  }
  async update() {
    var _this = this;
    /* Need to use autoUpdate here because the popover adjusts its height
       dynamically based on the content inside the iframe. */
    this.popoverCleanup = (0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_2__.autoUpdate)(this.parent, this.popoverContent, async function () {
      const {
        x,
        y
      } = await (0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_2__.computePosition)(_this.parent, _this.popoverContent, {
        placement: _this.placement,
        middleware: [(0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_3__.flip)(), (0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_3__.shift)()]
      });
      Object.assign(_this.popoverContent.style, {
        left: `${x}px`,
        top: `${y}px`
      });
    });
  }
  show() {
    this.popoverContent.style.display = 'block';
    this.update();
  }
  hide() {
    this.popoverContent.style.display = 'none';
    this.update();
  }
  toggle() {
    if (this.popoverContent.style.display === 'block') {
      this.hide();
    } else {
      this.show();
    }
  }
  cleanup() {
    var _this$popoverCleanup;
    (_this$popoverCleanup = this.popoverCleanup) == null || _this$popoverCleanup.call(this);
    window.removeEventListener('click', this.onClick);
    window.removeEventListener('message', this.handleMessage);
  }
}

/***/ }),

/***/ "../../libs/features/gcal/src/lib/components/followUpActionsPopover.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FollowUpActionsPopover: () => (/* binding */ FollowUpActionsPopover)
/* harmony export */ });
/* harmony import */ var _calendly_ui_components_icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../@calendly/ui/dist/components/icons/index.js");
/* harmony import */ var _calendly_ui_components_menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../@calendly/ui/dist/components/menu/index.js");
/* harmony import */ var _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../@calendly/ui/dist/theme.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("../../node_modules/zustand/esm/index.mjs");
/* harmony import */ var _client_core_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../libs/helpers/src/index.ts");
/* harmony import */ var _client_core_hooks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../libs/hooks/src/index.ts");
/* harmony import */ var _client_core_store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../libs/store/src/index.ts");
/* harmony import */ var _client_core_theme__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../../libs/theme/src/index.ts");
/* harmony import */ var _client_core_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("../../libs/types/src/index.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("../../node_modules/react/jsx-dev-runtime.js");
var _jsxFileName = "/app/libs/features/gcal/src/lib/components/followUpActionsPopover.tsx";












const FollowUpActionsPopover = () => {
  var _existingFrame$roleDa;
  const params = new URL(window.location.href).searchParams;
  const uuid = params.get('uuid');
  const barId = params.get('barid');
  const tabId = parseInt(params.get('tabid') || '0');
  const darkTheme = Boolean(params.get('darkTheme'));
  const {
    dataStore,
    uiStore
  } = (0,_client_core_store__WEBPACK_IMPORTED_MODULE_6__.useCombinedStore)();
  const prevUserIdRef = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)();
  const user = (0,zustand__WEBPACK_IMPORTED_MODULE_10__.useStore)(dataStore, _client_core_store__WEBPACK_IMPORTED_MODULE_6__.userSelector);
  const fetchEventInTimeRange = (0,zustand__WEBPACK_IMPORTED_MODULE_10__.useStore)(dataStore, s => s.fetchEventInTimeRange);
  const openDrawer = (0,zustand__WEBPACK_IMPORTED_MODULE_10__.useStore)(uiStore, _client_core_store__WEBPACK_IMPORTED_MODULE_6__.openDrawerSelector);
  const replaceDrawerContent = (0,zustand__WEBPACK_IMPORTED_MODULE_10__.useStore)(uiStore, _client_core_store__WEBPACK_IMPORTED_MODULE_6__.replaceDrawerContentSelector);
  const addAgendaFrame = (0,zustand__WEBPACK_IMPORTED_MODULE_10__.useStore)(uiStore, state => state.addAgendaFrame);
  const closeAllDrawers = (0,zustand__WEBPACK_IMPORTED_MODULE_10__.useStore)(uiStore, _client_core_store__WEBPACK_IMPORTED_MODULE_6__.closeAllDrawersSelector);
  const platform = (0,_client_core_hooks__WEBPACK_IMPORTED_MODULE_5__.usePlatform)();
  (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    if (user != null && user.id && prevUserIdRef.current !== user.id) {
      platform.analytics.setUser(user);
      prevUserIdRef.current = user.id;
    } else if (!user) {
      prevUserIdRef.current = undefined;
    }
  }, [platform.analytics, user]);
  const handleClose = (0,react__WEBPACK_IMPORTED_MODULE_3__.useCallback)(() => {
    var _window$top;
    (_window$top = window.top) == null || _window$top.postMessage({
      action: 'close',
      component: 'follow_up_actions_modal',
      barId
    }, '*');
  }, [barId]);
  const containerRef = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)(null);
  const {
    scheduledEvent,
    refetchScheduledEvent
  } = (0,_client_core_hooks__WEBPACK_IMPORTED_MODULE_5__.useGetScheduledEvent)(uuid);
  const isGroupOrPollEventType = ['group', 'poll'].includes((scheduledEvent == null ? void 0 : scheduledEvent.eventTypeType) || '');
  (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    let firstEl;
    let lastEl;
    const handleFirstEl = e => {
      if (e instanceof KeyboardEvent && e.code === 'Tab' && e.shiftKey) {
        e.preventDefault();
        window.parent.postMessage({
          action: 'focusGcalBar',
          component: 'prevSibling',
          barId
        }, '*');
      }
    };
    const handleLastEl = e => {
      if (e instanceof KeyboardEvent && e.code === 'Tab' && !e.shiftKey) {
        e.preventDefault();
        const target = e.target;
        if (target instanceof HTMLElement) {
          target.blur();
        }
        handleClose();
        window.parent.postMessage({
          action: 'focusGcalBar',
          component: 'nextSibling'
        }, '*');
      }
    };
    if (scheduledEvent) {
      requestAnimationFrame(() => {
        const focusableElements = (0,_client_core_helpers__WEBPACK_IMPORTED_MODULE_4__.getFocusableElements)(containerRef.current);
        if (focusableElements != null && focusableElements.length) {
          var _firstEl, _lastEl, _firstEl2, _lastEl2;
          (_firstEl = firstEl) == null || _firstEl.removeEventListener('keydown', handleFirstEl);
          (_lastEl = lastEl) == null || _lastEl.removeEventListener('keydown', handleLastEl);
          firstEl = focusableElements.item(0);
          lastEl = focusableElements.item(focusableElements.length - 1);
          (_firstEl2 = firstEl) == null || _firstEl2.addEventListener('keydown', handleFirstEl);
          (_lastEl2 = lastEl) == null || _lastEl2.addEventListener('keydown', handleLastEl);
        }
      });
    }
    const handleMesssage = msg => {
      const {
        action,
        component
      } = msg.data || {};
      if (action === 'focusGcalBar') {
        if (component === 'followUpActionsModal') {
          (0,_client_core_helpers__WEBPACK_IMPORTED_MODULE_4__.focusFirstChild)(containerRef.current);
        }
      }
    };
    window.addEventListener('message', handleMesssage);
    return () => {
      if (firstEl) firstEl.removeEventListener('keydown', handleFirstEl);
      if (lastEl) lastEl.removeEventListener('keydown', handleLastEl);
      window.removeEventListener('message', handleMesssage);
    };
  }, [barId, handleClose, scheduledEvent]);
  const existingFrame = (0,zustand__WEBPACK_IMPORTED_MODULE_10__.useStore)(uiStore, state => state.frames.find(f => f.tabId === String(tabId) && f.role === 'agenda_view'));
  if (!scheduledEvent || !scheduledEvent.invitees.length) {
    return null;
  }
  const isDrawerOnTop = drawerType => existingFrame && existingFrame.roleData.drawerStack.length > 0 && existingFrame.roleData.drawerStack[existingFrame.roleData.drawerStack.length - 1].type === drawerType;
  const numOpenedDrawers = (_existingFrame$roleDa = existingFrame == null ? void 0 : existingFrame.roleData.drawerStack.length) != null ? _existingFrame$roleDa : 0;
  const isOnlyMeetingDetailsOpened = isDrawerOnTop(_client_core_store__WEBPACK_IMPORTED_MODULE_6__.DrawerType.Meeting) && numOpenedDrawers === 1;
  const isOnlyShareAvailabilityOpened = isDrawerOnTop(_client_core_store__WEBPACK_IMPORTED_MODULE_6__.DrawerType.ShareAvailability) && numOpenedDrawers === 1;
  const isOnlyETSelectorOpened = isDrawerOnTop(_client_core_store__WEBPACK_IMPORTED_MODULE_6__.DrawerType.EventTypeSelector) && numOpenedDrawers === 1;
  const handleOpenMeetingDetailsDrawer = () => {
    const data = {
      meetingId: scheduledEvent.uuid
    };
    platform.analytics.track(_client_core_types__WEBPACK_IMPORTED_MODULE_8__.AnalyticsEvent.AgendaViewMeetingAction, {
      action: 'view',
      source: 'gcal_followups',
      meeting_status: scheduledEvent.timeStatus
    });
    if (!existingFrame) {
      addAgendaFrame(String(tabId), {
        roleData: {
          drawerStack: [{
            type: _client_core_store__WEBPACK_IMPORTED_MODULE_6__.DrawerType.Meeting,
            data
          }]
        }
      });
    } else if (isOnlyMeetingDetailsOpened) {
      replaceDrawerContent(existingFrame.id, _client_core_store__WEBPACK_IMPORTED_MODULE_6__.DrawerType.Meeting, data);
    } else {
      closeAllDrawers(existingFrame.id);
      openDrawer(existingFrame == null ? void 0 : existingFrame.id, _client_core_store__WEBPACK_IMPORTED_MODULE_6__.DrawerType.Meeting, data);
    }
  };
  const handleOpenShareAvailabilityPickerDrawer = () => {
    platform.analytics.track(_client_core_types__WEBPACK_IMPORTED_MODULE_8__.AnalyticsEvent.FollowUpShare, {
      source: 'gcal'
    });
    const invitee = getInviteeData(scheduledEvent.invitees);
    const source = 'gcal_followups';
    if (!existingFrame) {
      addAgendaFrame(String(tabId), {
        roleData: {
          drawerStack: [{
            type: _client_core_store__WEBPACK_IMPORTED_MODULE_6__.DrawerType.ShareAvailability,
            data: {
              invitee,
              source
            }
          }]
        }
      });
    } else if (isOnlyShareAvailabilityOpened) {
      replaceDrawerContent(existingFrame.id, _client_core_store__WEBPACK_IMPORTED_MODULE_6__.DrawerType.ShareAvailability, {
        invitee,
        source
      });
    } else {
      closeAllDrawers(existingFrame.id);
      openDrawer(existingFrame.id, _client_core_store__WEBPACK_IMPORTED_MODULE_6__.DrawerType.ShareAvailability, {
        invitee,
        source
      });
    }
  };
  const handleEmailInvitee = inviteeEmail => {
    platform.analytics.track(_client_core_types__WEBPACK_IMPORTED_MODULE_8__.AnalyticsEvent.FollowUpEmail, {
      source: 'gcal'
    });
    window.open(`mailto:${inviteeEmail}`);
  };
  const handleOpenBookMeetingPickerDrawer = () => {
    const guestsEmails = scheduledEvent == null ? void 0 : scheduledEvent.guests.map(g => g.email);
    const guests = guestsEmails == null ? void 0 : guestsEmails.slice(0, 10).join();
    const invitee = getInviteeData(scheduledEvent.invitees);
    const data = {
      invitee,
      guests,
      meetingUuid: scheduledEvent.uuid,
      source: 'gcal_followups'
    };
    if (!existingFrame) {
      addAgendaFrame(String(tabId), {
        roleData: {
          drawerStack: [{
            type: _client_core_store__WEBPACK_IMPORTED_MODULE_6__.DrawerType.EventTypeSelector,
            data
          }]
        }
      });
    } else if (isOnlyETSelectorOpened) {
      replaceDrawerContent(existingFrame.id, _client_core_store__WEBPACK_IMPORTED_MODULE_6__.DrawerType.EventTypeSelector, data);
    } else {
      closeAllDrawers(existingFrame.id);
      openDrawer(existingFrame.id, _client_core_store__WEBPACK_IMPORTED_MODULE_6__.DrawerType.EventTypeSelector, data);
    }
  };
  const closePopoverAfterAction = action => () => {
    var _window$top2;
    action == null || action();
    (_window$top2 = window.top) == null || _window$top2.postMessage({
      action: 'close',
      component: 'follow_up_actions_modal',
      barId
    }, '*');
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };
  const handleKeyDown = action => e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      closePopoverAfterAction(action)();
    }
  };
  const handleMarkNoShow = async invitee => {
    try {
      if (invitee && !invitee.no_show) {
        platform.analytics.track(_client_core_types__WEBPACK_IMPORTED_MODULE_8__.AnalyticsEvent.AgendaViewMeetingAction, {
          action: 'mark_no-show',
          source: 'gcal_followups',
          meeting_status: scheduledEvent.timeStatus
        });
        await platform.calendlyApi.postMarkNoShow(invitee.uuid);
      } else if (invitee && invitee.no_show) {
        await platform.calendlyApi.deleteMarkNoShow(invitee.no_show.uri);
      }
      await refetchScheduledEvent(scheduledEvent.uuid);
      await fetchEventInTimeRange(scheduledEvent.uuid);
    } catch (error) {
      platform.flow.flashMessage('Failed to mark no-show, please try again.', 'error');
    }
  };
  const scheduleActions = [];
  const moreActions = [];
  const sections = [];
  if (!isGroupOrPollEventType) {
    scheduleActions.push({
      title: 'Share availability',
      icon: _calendly_ui_components_icons__WEBPACK_IMPORTED_MODULE_0__.OneOffMeetingIcon,
      onClick: () => handleOpenShareAvailabilityPickerDrawer()
    });
    scheduleActions.push({
      title: 'Book next meeting',
      icon: _calendly_ui_components_icons__WEBPACK_IMPORTED_MODULE_0__.CalendarAddIcon,
      onClick: () => handleOpenBookMeetingPickerDrawer()
    });
  }
  if (scheduleActions.length > 0) {
    sections.push({
      title: 'Schedule another meeting',
      options: scheduleActions
    });
  }
  if (!isGroupOrPollEventType) {
    moreActions.push({
      title: scheduledEvent != null && scheduledEvent.invitees[0].no_show ? `Undo ${scheduledEvent == null ? void 0 : scheduledEvent.invitees[0].name} as a no-show` : `Mark ${scheduledEvent == null ? void 0 : scheduledEvent.invitees[0].name} as a no-show`,
      icon: _calendly_ui_components_icons__WEBPACK_IMPORTED_MODULE_0__.BlockIcon,
      onClick: () => handleMarkNoShow(scheduledEvent == null ? void 0 : scheduledEvent.invitees[0])
    });
    moreActions.push({
      title: `Email ${scheduledEvent == null ? void 0 : scheduledEvent.invitees[0].name}`,
      icon: _calendly_ui_components_icons__WEBPACK_IMPORTED_MODULE_0__.MailSendEnvelopeIcon,
      onClick: () => handleEmailInvitee(scheduledEvent == null ? void 0 : scheduledEvent.invitees[0].email)
    });
  }
  moreActions.push({
    title: 'View meeting details',
    icon: _calendly_ui_components_icons__WEBPACK_IMPORTED_MODULE_0__.CalendarDetailsIcon,
    onClick: () => handleOpenMeetingDetailsDrawer()
  });
  sections.push({
    title: sections.length > 0 ? 'More actions' : 'Actions',
    options: moreActions
  });

  // Make popover height dynamic based on content
  const buttonHeight = 48;
  const titleHeight = 32.8;
  const padding = 18;
  const actionsHeight = buttonHeight * (scheduleActions.length + moreActions.length);
  const popoverHeight = titleHeight * sections.length + actionsHeight + padding;
  window.parent.postMessage({
    action: 'setGcalPopoverHeight',
    height: popoverHeight
  }, '*');
  const renderOption = option => {
    const {
      title,
      icon: Icon,
      onClick,
      href
    } = option;
    if (onClick) {
      return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(Option, {
        darktheme: darkTheme ? 'true' : undefined,
        onKeyDown: handleKeyDown(onClick),
        onClick: closePopoverAfterAction(onClick),
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(Icon, {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 422,
          columnNumber: 11
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(OptionLabel, {
          children: title
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 423,
          columnNumber: 11
        }, undefined)]
      }, title, true, {
        fileName: _jsxFileName,
        lineNumber: 416,
        columnNumber: 9
      }, undefined);
    } else {
      return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(Option, {
        darktheme: darkTheme ? 'true' : undefined,
        href: href,
        target: "_blank",
        onClick: closePopoverAfterAction(),
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(Icon, {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 435,
          columnNumber: 11
        }, undefined), title]
      }, title, true, {
        fileName: _jsxFileName,
        lineNumber: 428,
        columnNumber: 9
      }, undefined);
    }
  };
  const darkThemeProps = {};
  if (darkTheme) {
    darkThemeProps.darktheme = 'true';
  }
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(Container, Object.assign({
    ref: containerRef
  }, darkThemeProps, {
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(MenuContainer, Object.assign({}, darkThemeProps, {
      children: sections.map(({
        title,
        options
      }, index) => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(Section, {
        className: "section-menu",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(SectionTitle, Object.assign({}, darkThemeProps, {
          children: title.toUpperCase()
        }), void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 451,
          columnNumber: 13
        }, undefined), options.map(o => renderOption(o))]
      }, index, true, {
        fileName: _jsxFileName,
        lineNumber: 450,
        columnNumber: 11
      }, undefined))
    }), void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 448,
      columnNumber: 7
    }, undefined)
  }), void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 447,
    columnNumber: 5
  }, undefined);
};
const getInviteeData = invitees => {
  const primaryInvitee = invitees.find(i => i.status === 'active');
  if (!primaryInvitee) {
    return;
  }
  return {
    inviteeName: primaryInvitee.name,
    inviteeEmail: primaryInvitee.email,
    inviteeTimezone: primaryInvitee.timezone
  };
};
const Container = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_11__["default"].div.withConfig({
  displayName: "followUpActionsPopover__Container",
  componentId: "sc-1lu3k40-0"
})(["", ""], props => props.darktheme && `background: ${_client_core_theme__WEBPACK_IMPORTED_MODULE_7__.gcalDarkBgColor};`);
const Section = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_11__["default"])(_calendly_ui_components_menu__WEBPACK_IMPORTED_MODULE_1__.Group).withConfig({
  displayName: "followUpActionsPopover__Section",
  componentId: "sc-1lu3k40-1"
})(["&.section-menu{border-top:none;padding:0;}"]);
const SectionTitle = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_11__["default"])(_calendly_ui_components_menu__WEBPACK_IMPORTED_MODULE_1__.GroupTitle).withConfig({
  displayName: "followUpActionsPopover__SectionTitle",
  componentId: "sc-1lu3k40-2"
})(["", " font-weight:700;font-size:12px;line-height:16.8px;letter-spacing:0.1em;"], props => props.darktheme && `color: ${_client_core_theme__WEBPACK_IMPORTED_MODULE_7__.gcalDarkMutedFontColor};`);
const MenuContainer = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_11__["default"])(_calendly_ui_components_menu__WEBPACK_IMPORTED_MODULE_1__.Menu).withConfig({
  displayName: "followUpActionsPopover__MenuContainer",
  componentId: "sc-1lu3k40-3"
})(["", " background:", ""], props => props.darktheme && `border-color: ${_client_core_theme__WEBPACK_IMPORTED_MODULE_7__.gcalDarkBorderColor};`, ({
  darktheme
}) => darktheme ? _client_core_theme__WEBPACK_IMPORTED_MODULE_7__.gcalDarkBgColor : _client_core_theme__WEBPACK_IMPORTED_MODULE_7__.gcalLightBgColor);
const Option = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_11__["default"])(_calendly_ui_components_menu__WEBPACK_IMPORTED_MODULE_1__.Item).withConfig({
  displayName: "followUpActionsPopover__Option",
  componentId: "sc-1lu3k40-4"
})(["height:48px;font-size:14px;padding:14px 16px;", " &:focus-visible{outline:2px solid ", ";outline-offset:-2px;}&:focus{background:", ";", "}&:hover{background:", ";", "}"], props => props.darktheme && `color: ${_client_core_theme__WEBPACK_IMPORTED_MODULE_7__.gcalDarkFontColor};`, _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_2__.primaryColor, props => props.darktheme ? _client_core_theme__WEBPACK_IMPORTED_MODULE_7__.gcalDarkHoverColor : _client_core_theme__WEBPACK_IMPORTED_MODULE_7__.gcalHoverBgColor, props => props.darktheme && `color: ${_client_core_theme__WEBPACK_IMPORTED_MODULE_7__.gcalDarkFontColor};`, props => props.darktheme ? _client_core_theme__WEBPACK_IMPORTED_MODULE_7__.gcalDarkHoverColor : _client_core_theme__WEBPACK_IMPORTED_MODULE_7__.gcalHoverBgColor, props => props.darktheme && `color: ${_client_core_theme__WEBPACK_IMPORTED_MODULE_7__.gcalDarkFontColor};`);
const OptionLabel = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_11__["default"].span.withConfig({
  displayName: "followUpActionsPopover__OptionLabel",
  componentId: "sc-1lu3k40-5"
})(["overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"]);

/***/ }),

/***/ "../../libs/features/gcal/src/lib/components/reschedulePopover.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReschedulePopover: () => (/* binding */ ReschedulePopover)
/* harmony export */ });
/* harmony import */ var _calendly_ui_components_bare_button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../@calendly/ui/dist/components/bare-button/index.js");
/* harmony import */ var _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../@calendly/ui/dist/theme.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("../../node_modules/zustand/esm/index.mjs");
/* harmony import */ var _client_core_assets__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../libs/assets/src/index.ts");
/* harmony import */ var _client_core_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../libs/helpers/src/index.ts");
/* harmony import */ var _client_core_hooks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../libs/hooks/src/index.ts");
/* harmony import */ var _client_core_store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../libs/store/src/index.ts");
/* harmony import */ var _client_core_theme__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../../libs/theme/src/index.ts");
/* harmony import */ var _client_core_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("../../libs/types/src/index.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("../../node_modules/react/jsx-dev-runtime.js");
var _jsxFileName = "/app/libs/features/gcal/src/lib/components/reschedulePopover.tsx";












const ReschedulePopover = props => {
  const {
    uiStore
  } = (0,_client_core_store__WEBPACK_IMPORTED_MODULE_6__.useCombinedStore)();
  const params = new URL(window.location.href).searchParams;
  const source = params.get('source') || 'unknown';
  const uuid = params.get('uuid');
  const barId = params.get('barid');
  const tabId = parseInt(params.get('tabid') || '0');
  const placement = params.get('placement');
  const inviteeAction = params.get('inviteeAction');
  const guests = params.get('guests');
  const openDrawerForTab = (0,zustand__WEBPACK_IMPORTED_MODULE_10__.useStore)(uiStore, _client_core_store__WEBPACK_IMPORTED_MODULE_6__.openDrawerForTabSelector);
  const handleClose = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)(() => {
    var _window$top;
    (_window$top = window.top) == null || _window$top.postMessage({
      action: 'close',
      component: 'reschedule_modal',
      barId,
      inviteeAction
    }, '*');
  }, [barId, inviteeAction]);
  const platform = (0,_client_core_hooks__WEBPACK_IMPORTED_MODULE_5__.usePlatform)();
  const modalRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
  const {
    scheduledEvent
  } = (0,_client_core_hooks__WEBPACK_IMPORTED_MODULE_5__.useGetScheduledEvent)(uuid);
  (0,_client_core_hooks__WEBPACK_IMPORTED_MODULE_5__.useClickOutside)(modalRef, handleClose);
  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    let firstEl;
    let lastEl;
    const handleFirstEl = e => {
      if (e instanceof KeyboardEvent && e.code === 'Tab' && e.shiftKey) {
        e.preventDefault();
        window.parent.postMessage({
          action: 'focusGcalBar',
          component: inviteeAction === 'book' ? 'bookButton' : 'rescheduleButton',
          barId
        }, '*');
      }
    };
    const handleLastEl = e => {
      if (e instanceof KeyboardEvent && e.code === 'Tab' && !e.shiftKey) {
        e.preventDefault();
        const target = e.target;
        if (target instanceof HTMLElement) {
          target.blur();
        }
        handleClose();
        window.parent.postMessage({
          action: 'focusGcalBar',
          component: 'moreButton',
          barId
        }, '*');
      }
    };
    if (scheduledEvent && scheduledEvent.invitees.length) {
      requestAnimationFrame(() => {
        const focusableElements = (0,_client_core_helpers__WEBPACK_IMPORTED_MODULE_4__.getFocusableElements)(modalRef.current);
        if (focusableElements != null && focusableElements.length) {
          var _firstEl, _lastEl, _firstEl2, _lastEl2;
          (_firstEl = firstEl) == null || _firstEl.removeEventListener('keydown', handleFirstEl);
          (_lastEl = lastEl) == null || _lastEl.removeEventListener('keydown', handleLastEl);
          firstEl = focusableElements.item(0);
          lastEl = focusableElements.item(focusableElements.length - 1);
          (_firstEl2 = firstEl) == null || _firstEl2.addEventListener('keydown', handleFirstEl);
          (_lastEl2 = lastEl) == null || _lastEl2.addEventListener('keydown', handleLastEl);
        }
      });
    }
    const handleMesssage = msg => {
      const {
        action,
        component
      } = msg.data || {};
      if (action === 'focusGcalBar') {
        if (component === 'inviteesBookModal' || component === 'rescheduleModal') {
          (0,_client_core_helpers__WEBPACK_IMPORTED_MODULE_4__.focusFirstChild)(modalRef.current);
        }
      }
    };
    window.addEventListener('message', handleMesssage);
    return () => {
      if (firstEl) firstEl.removeEventListener('keydown', handleFirstEl);
      if (lastEl) lastEl.removeEventListener('keydown', handleLastEl);
      window.removeEventListener('message', handleMesssage);
    };
  }, [barId, handleClose, inviteeAction, scheduledEvent]);
  if (!scheduledEvent || !scheduledEvent.invitees.length) {
    return null;
  }
  const handleClick = invitee => {
    if (inviteeAction === 'book') {
      handleClose();
      platform.analytics.track(_client_core_types__WEBPACK_IMPORTED_MODULE_8__.AnalyticsEvent.BookOnBehalfStart, {
        source: 'gcal',
        gcal_source: source,
        et_kind: null,
        et_ownership: null,
        et_pooling: null,
        event_type_id: null
      });
      openDrawerForTab(tabId.toString(), _client_core_store__WEBPACK_IMPORTED_MODULE_6__.DrawerType.EventTypeSelector, {
        source: 'gcal',
        invitee: {
          inviteeName: invitee.name,
          inviteeEmail: invitee.email,
          inviteeTimezone: invitee.timezone
        },
        guests: guests || undefined
      });
    } else {
      platform.analytics.track(_client_core_types__WEBPACK_IMPORTED_MODULE_8__.AnalyticsEvent.GCalInviteeRescheduleClick, {
        invitee_count: scheduledEvent.inviteesCounter.active.toString(),
        source
      });
      platform.flow.webReschedulings({
        inviteeUuid: invitee.uuid,
        rescheduleUrl: invitee.rescheduleUrl,
        source,
        barId,
        tabId,
        closeRescheduleModal: true
      });
    }
  };
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(Container, {
    placement: placement || 'top-end',
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(RescheduleModal, {
      ref: modalRef,
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(RescheduleModalHeader, {
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(RescheduleModalTitle, {
          children: ["Which invitee do you want", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)("br", {}, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 175,
            columnNumber: 13
          }, undefined), " to ", inviteeAction === 'book' ? 'schedule' : 'reschedule', "?"]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 173,
          columnNumber: 11
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(CloseButton, {
          onClick: handleClose,
          "aria-label": "Close",
          children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(CloseLogo, {}, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 178,
            columnNumber: 13
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 177,
          columnNumber: 11
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 172,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(RescheduleModalAttendeesWrapper, {
        children: scheduledEvent.invitees.map(invitee => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(RescheduleModalAttendeeItem, {
          onClick: () => handleClick(invitee),
          children: invitee.name
        }, invitee.uuid, false, {
          fileName: _jsxFileName,
          lineNumber: 183,
          columnNumber: 13
        }, undefined))
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 181,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 171,
      columnNumber: 7
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 170,
    columnNumber: 5
  }, undefined);
};
const Container = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_11__["default"].div.withConfig({
  displayName: "reschedulePopover__Container",
  componentId: "sc-1mhz3cj-0"
})(["display:flex;flex-direction:column;justify-content:", ";bottom:2px;position:absolute;right:17px;height:calc(100% - 4px);"], props => props.placement.includes('top') ? 'flex-end' : 'flex-start');
const RescheduleModal = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_11__["default"].div.withConfig({
  displayName: "reschedulePopover__RescheduleModal",
  componentId: "sc-1mhz3cj-1"
})(["display:flex;flex-direction:column;width:223px;background:#ffffff;border:1px solid ", ";box-shadow:", ";border-radius:8px;padding:16px 0 10px 8px;max-height:calc(100% - 28px);"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_1__.colorGrey3, _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_1__.overlayShadow);
const RescheduleModalTitle = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_11__["default"].div.withConfig({
  displayName: "reschedulePopover__RescheduleModalTitle",
  componentId: "sc-1mhz3cj-2"
})(["display:flex;font-style:normal;font-weight:700;font-size:14px;line-height:17px;color:", ";"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_1__.textColorL1);
const RescheduleModalHeader = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_11__["default"].div.withConfig({
  displayName: "reschedulePopover__RescheduleModalHeader",
  componentId: "sc-1mhz3cj-3"
})(["display:flex;align-items:flex-start;gap:19px;padding:0 0 8px 8px;"]);
const RescheduleModalAttendeesWrapper = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_11__["default"].div.withConfig({
  displayName: "reschedulePopover__RescheduleModalAttendeesWrapper",
  componentId: "sc-1mhz3cj-4"
})(["display:flex;flex-direction:column;max-height:300px;overflow:auto;"]);
const RescheduleModalAttendeeItem = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_11__["default"].button.withConfig({
  displayName: "reschedulePopover__RescheduleModalAttendeeItem",
  componentId: "sc-1mhz3cj-5"
})(["display:flex;flex:1;height:30px;line-height:30px;border-radius:24px;padding-left:8px;align-items:center;font-style:normal;font-weight:400;font-size:14px;color:", ";margin-right:16px;cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;border:none;outline:none;background-color:transparent;&:hover,&:focus-visible{background-color:", ";}"], _client_core_theme__WEBPACK_IMPORTED_MODULE_7__.gcalTextColor, _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_1__.primaryColorL3);
const CloseButton = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_11__["default"])(_calendly_ui_components_bare_button__WEBPACK_IMPORTED_MODULE_0__.BareButton).withConfig({
  displayName: "reschedulePopover__CloseButton",
  componentId: "sc-1mhz3cj-6"
})(["cursor:pointer;padding:4px;line-height:1;"]);
const CloseLogo = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_11__["default"])(_client_core_assets__WEBPACK_IMPORTED_MODULE_3__.CloseIcon).withConfig({
  displayName: "reschedulePopover__CloseLogo",
  componentId: "sc-1mhz3cj-7"
})(["width:9px;height:9px;"]);

/***/ }),

/***/ "../../libs/features/gcal/src/lib/components/zoomBotBar.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ZoomBotBar: () => (/* binding */ ZoomBotBar)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _client_core_assets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../libs/assets/src/index.ts");
/* harmony import */ var _client_core_theme__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../libs/theme/src/index.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/react/jsx-dev-runtime.js");
var _jsxFileName = "/app/libs/features/gcal/src/lib/components/zoomBotBar.tsx";




const CalendlyLogo = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_3__["default"])(_client_core_assets__WEBPACK_IMPORTED_MODULE_0__.calendlyLogo).withConfig({
  displayName: "zoomBotBar__CalendlyLogo",
  componentId: "r96wob-0"
})(["height:24px;width:24px;padding-right:14px;"]);
const ButtonBot = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].button.withConfig({
  displayName: "zoomBotBar__ButtonBot",
  componentId: "r96wob-1"
})(["background-color:", ";color:rgb(255,255,255);display:inline-block;font-family:'Google Sans',Roboto,Helvetica,Arial,sans-serif;font-size:14px;font-weight:500;line-height:36px;border-width:0px;border-style:initial;border-color:initial;border-image:initial;border-radius:4px;padding:0px 16px;cursor:pointer;&:hover{background-color:", ";}"], _client_core_theme__WEBPACK_IMPORTED_MODULE_1__.zoomBotBtnBgColor, _client_core_theme__WEBPACK_IMPORTED_MODULE_1__.zoomBotBtnBgColorHover);
const Container = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div.withConfig({
  displayName: "zoomBotBar__Container",
  componentId: "r96wob-2"
})(["padding-left:28px;display:flex;flex-direction:row;align-items:center;"]);
const ZoomBotBar = props => {
  const handleClick = () => {
    console.warn('ZoomBot not implemented yet');
  };
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(Container, {
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(CalendlyLogo, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 53,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(ButtonBot, {
      onClick: handleClick,
      children: "Add Cal Bot to meeting"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 54,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 52,
    columnNumber: 5
  }, undefined);
};

/***/ })

}]);