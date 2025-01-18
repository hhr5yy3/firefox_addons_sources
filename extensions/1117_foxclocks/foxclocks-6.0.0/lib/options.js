/* Copyright (c) 2020 Andy McDonald. All rights reserved. */

/*jshint esversion: 6, module: true */

// ---------------------------------------------------------
const utils = window.foxclocks.utils;
const info = window.foxclocks.info;
import watchlist from "./watchlist.js";

// ---------------------------------------------------------
const _ITEM_INFO_OFFSET_PX = { left: 0, top: 0 };
const _ZONE_PICKER_ANIMATION_MILLIS = 100;

const _STATUSBAR_CONFIG = [
  { name: "enabled" },
  { name: "vertical_position", values: ["top", "bottom"] },
  { name: "text_alignment", values: ["left", "right"] },
  { name: "priority" },
  { name: "font_size" },
];

const _data = {};
let _menuItemIndex = null;

// ---------------------------------------------------------
const closeMenu = () => {
  $("#watchlist_menu").hide();
  _menuItemIndex = null;
};

//---------------------------------------------------------
const setStorage = (name, value) => {
  // Callers tend not to worry about this failing
  //
  utils.onStorageChanged.removeListener(onStorageChangedEvent);

  // Current version of Edge doesn't support finally()
  // https://github.com/Microsoft/ChakraCore/issues/3520
  //
  // return utils.setStorage({[name]: value}).finally(() => utils.onStorageChanged.addListener(onStorageChangedEvent));

  return utils
    .setStorage({ [name]: value })
    .then((storageObj) => {
      utils.onStorageChanged.addListener(onStorageChangedEvent);
      return storageObj;
    })
    .catch((err) => {
      utils.onStorageChanged.addListener(onStorageChangedEvent);
      throw new Error("Failed to set storage");
    });
};

//---------------------------------------------------------
const addItemsToWatchlist = (items, atIndex) => {
  if (items.length === 0) return;

  const watchlistCopy = $.extend(true, [], watchlist.get().watchlist);
  const defaultSettings = utils.getConfig("defaults").watchlist_item_settings;
  const spliceArgs = [
    typeof atIndex === "number" ? atIndex : watchlistCopy.length,
    0,
  ];

  for (let i = 0; i < items.length; i++) {
    spliceArgs.push($.extend(true, items[i], defaultSettings));
  }

  Array.prototype.splice.apply(watchlistCopy, spliceArgs);

  setStorage("watchlist", watchlistCopy).then((storageObj) =>
    watchlist.update({ watchlist: storageObj.watchlist })
  );
};

// ---------------------------------------------------------
const createWatchlistItemFromAnchor = (anchor) => {
  const eAnchor = $(anchor);
  const obj = { tz_id: eAnchor.attr("tz_id"), name: $.trim(eAnchor.text()) };

  const coords = eAnchor.attr("coords");
  if (typeof coords !== "undefined") {
    const coordsMatch = coords.match(/^([+\-]?[0-9|\.]+), *([+\-]?[0-9|\.]+)$/); // leave heavy lifting to parseFloat()

    if (coordsMatch !== null)
      obj.coords = {
        lat_decimal: parseFloat(coordsMatch[1]),
        long_decimal: parseFloat(coordsMatch[2]),
      };
    else obj.coords = coords; // keyword
  }
  return obj;
};

// ---------------------------------------------------------
const initZonePickerHandlers = () => {
  const eZp = $("#zonepicker");

  $("#zonepicker div.widget_body").on("select_node.jstree", (event, data) => {
    const eAnchor = $(data.event.currentTarget);

    if (!eAnchor.is("a")) return;

    if (typeof eAnchor.attr("tz_id") === "string") {
      eAnchor.toggleClass("selected");
      eZp.trigger("zonepickerselectchange.foxclocks");
    } else {
      data.instance.toggle_node(data.node);
    }
  });

  eZp.on("mouseenter", "a[tz_id]", (e) => {
    const eAnchor = $(e.currentTarget);

    if (eAnchor.hasClass("ui-draggable") === true) return;

    eAnchor.draggable({
      connectToSortable: "#watchlist_table > tbody",
      cursor: "pointer", // no-drop is better but seems buggy in Chrome
      appendTo: "#container",
      helper() {
        eAnchor.addClass("selected");
        const watchlistTableCols = $("#watchlist_table > thead th").length;

        return $('<tr id="zonepicker_drag"/>').append(
          $("<td/>", { colspan: watchlistTableCols }).append(
            $("<ul/>").append(
              eZp.find("a[tz_id].selected").parent("li").clone()
            )
          )
        );
      },
    });
  });

  eZp.on("click", "button.add", (event, data) => {
    const newItems = [];

    eZp
      .find("a[tz_id].selected")
      .removeClass("selected")
      .each((index, el) => {
        newItems.push(createWatchlistItemFromAnchor(el));
      });

    eZp.trigger("zonepickerselectchange.foxclocks");
    addItemsToWatchlist(newItems);
  });

  eZp.on("dblclick", "a[tz_id]", (e) =>
    addItemsToWatchlist([createWatchlistItemFromAnchor(e.currentTarget)])
  );
  eZp.on("zonepickerselectchange.foxclocks", () =>
    eZp
      .find("button.add")
      .attr("disabled", $("#zonepicker a[tz_id].selected").length === 0)
  );
};

// ---------------------------------------------------------
const initWatchlistMenuHandler = () => {
  const $menu = $("#watchlist_menu");

  $("#watchlist_menu a, #watchlist_menu tr.colour input").on(
    "click keyup",
    (event) => {
      event.preventDefault();

      if (_menuItemIndex === null) return;

      const watchlistCopy = $.extend(true, [], watchlist.get().watchlist);
      let watchlistCopyChanged = false;

      const target = $(event.target);
      const eClosestTr = target.closest("tr");
      const index = _menuItemIndex;
      const item = watchlistCopy[index];

      if (event.type === "click") {
        if (eClosestTr.hasClass("information")) {
          info.set(item, _data.tz_db.zones[item.tz_id], {
            left: event.pageX + _ITEM_INFO_OFFSET_PX.left,
            top: event.pageY + _ITEM_INFO_OFFSET_PX.top,
            mode: "foxclocks-mode-watchlist",
          });

          closeMenu();
        } else if (eClosestTr.hasClass("delete")) {
          watchlistCopy.splice(index, 1);
          watchlistCopyChanged = true;

          closeMenu();
        } else if (eClosestTr.hasClass("flag")) {
          if ($menu.hasClass("has_flag")) {
            item.statusbar.show_flag = $menu
              .toggleClass("show_flag")
              .hasClass("show_flag");
            watchlistCopyChanged = true;
          }
        } else if (eClosestTr.hasClass("bold")) {
          item.statusbar.bold = $menu
            .toggleClass("is_bold")
            .hasClass("is_bold");
          watchlistCopyChanged = true;
        } else if (eClosestTr.hasClass("italic")) {
          item.statusbar.italic = $menu
            .toggleClass("is_italic")
            .hasClass("is_italic");
          watchlistCopyChanged = true;
        } else if (eClosestTr.hasClass("underline")) {
          item.statusbar.underline = $menu
            .toggleClass("is_underline")
            .hasClass("is_underline");
          watchlistCopyChanged = true;
        }
      } else if (event.type === "keyup") {
        if (eClosestTr.hasClass("colour") && event.keyCode === 13) {
          const val = $.trim(target.val());
          target.blur();

          item.statusbar.colour = val === "" ? null : val;

          if (item.statusbar.colour) $menu.addClass("has_colour");
          else $menu.removeClass("has_colour");

          watchlistCopyChanged = true;
        }
      }

      if (watchlistCopyChanged === true)
        setStorage("watchlist", watchlistCopy).then((storageObj) =>
          watchlist.update({ watchlist: storageObj.watchlist })
        );
    }
  );
};

// ---------------------------------------------------------
const onWatchlistEvent = (event, data) => {
  if (event.type === "drop") {
    if (data.helper.hasClass("ui-sortable-helper"))
      // Raw drop event onto sortable table - will be handled by separate sortupdate event
      return;

    data.item = data.helper; // normalize event types
  }

  const watchlistCopy = $.extend(true, [], watchlist.get().watchlist);
  let watchlistCopyChanged = false;

  if (event.type === "sortupdate" || event.type === "drop") {
    if (data.item.attr("id") === "zonepicker_drag") {
      // Drag from Zone Picker onto Watchlist table (sortupdate), or below (drop)
      //
      const newItems = [];
      data.item
        .find("a[tz_id]")
        .each((index, el) => newItems.push(createWatchlistItemFromAnchor(el)));

      $("#zonepicker")
        .find("a[tz_id].selected")
        .removeClass("selected")
        .end()
        .trigger("zonepickerselectchange.foxclocks");
      addItemsToWatchlist(
        newItems,
        event.type === "sortupdate" ? data.item.prevAll().length : null
      );
    } else {
      // Re-order from Watchlist
      //
      const startRowIndex = data.item.data("sort_start_row_index");
      watchlistCopy.splice(
        data.item.prevAll().length,
        0,
        watchlistCopy.splice(startRowIndex, 1)[0]
      );
      watchlistCopyChanged = true;
    }
  } else {
    const target = $(event.target);
    const index = target.closest("tr").prevAll().length;
    const item = watchlistCopy[index];

    if (target.is("input") && event.type === "change") {
      const targetName = target.attr("name");

      if (targetName === "name") {
        item.name = $.trim(target.val());
        watchlistCopyChanged = true;
      } else if (targetName === "time_format") {
        const timeFormat = $.trim(target.val());

        if (timeFormat !== "") item.statusbar.time_format = timeFormat;
        else delete item.statusbar.time_format;

        watchlistCopyChanged = true;
      }
    } else if (
      target.is("img") &&
      event.type === "click" &&
      target.hasClass("item_settings")
    ) {
      const $menu = $("#watchlist_menu");

      if (!$menu.is(":visible") || _menuItemIndex !== index) {
        const itemZone = watchlist.get().watchlist_zones[item.tz_id];

        $menu.removeClass(
          "has_flag show_flag is_bold is_italic is_underline has_colour"
        );

        if (typeof itemZone.country_code === "string")
          $menu.addClass("has_flag");

        if (item.statusbar.show_flag === true) $menu.addClass("show_flag");

        if (item.statusbar.bold === true) $menu.addClass("is_bold");

        if (item.statusbar.italic === true) $menu.addClass("is_italic");

        if (item.statusbar.underline === true) $menu.addClass("is_underline");

        if (item.statusbar.colour) $menu.addClass("has_colour");

        $menu.find("tr.colour input").val(item.statusbar.colour);

        $menu.css({ display: "inline-block" }).position({
          my: "left top",
          at: "right top",
          of: target,
        });

        _menuItemIndex = index;
      } else {
        closeMenu();
      }
    } else if (
      target.is("img") &&
      event.type === "click" &&
      target.hasClass("delete")
    ) {
      watchlistCopy.splice(index, 1);
      watchlistCopyChanged = true;
    }
  }

  if (watchlistCopyChanged === true)
    setStorage("watchlist", watchlistCopy).then((storageObj) =>
      watchlist.update({ watchlist: storageObj.watchlist })
    );
};

// ---------------------------------------------------------
const onDbUpdateButtonEvent = (event, data) => {
  if (event.type !== "click") return;

  const target = $(event.currentTarget).attr("disabled", true);
  const eMessage = $("#tz_db .update span.message").text(
    utils.getI18nMessage("o_tz_db_update_message_pending")
  );

  utils.sendMessage({ action: "update_tz_database" }, (response) => {
    if (response === null)
      eMessage.text(
        utils.getI18nMessage("o_tz_db_update_message_not_available")
      );
    else if (response === false)
      eMessage.text(utils.getI18nMessage("misc_error_try_later"));
    else eMessage.text(utils.getI18nMessage("o_tz_db_update_message_success"));

    target.attr("disabled", false);
  });
};

// ---------------------------------------------------------
const onStorageChangedEvent = (changes, namespace) => {
  // Changes external to this page - see setStorage()
  //

  const watchlistUpdateData = {};

  if (typeof changes.watchlist !== "undefined")
    watchlistUpdateData.watchlist = changes.watchlist.newValue;

  if (typeof changes.tz_db !== "undefined") {
    _data.tz_db = changes.tz_db.newValue;
    watchlistUpdateData.tz_db = _data.tz_db;
  }

  if (typeof changes.global_time_format !== "undefined") {
    _data.global_time_format = changes.global_time_format.newValue;
    watchlistUpdateData.global_time_format = _data.global_time_format;
  }

  if ($.isEmptyObject(watchlistUpdateData) === false)
    watchlist.update(watchlistUpdateData);

  if (typeof changes.tz_db !== "undefined") setUITzDatabaseInfo(_data.tz_db);

  if (typeof changes.global_time_format !== "undefined")
    updateUITimeFormats(_data.global_time_format);

  if (typeof changes.statusbar !== "undefined")
    setUIStatusbar(changes.statusbar.newValue);

  if (typeof changes.config_override !== "undefined")
    createUIConfigOverride(changes.config_override.newValue);
};

// ---------------------------------------------------------
const onAutocompleteEvent = (event, ui, err) => {
  let retVal = false;

  if (typeof err !== "undefined") {
    utils.console.warn("foxclocks.options.onAutocompleteEvent(): failed:", err);
    $("#search").addClass("error");
    $("#search input").val("");
  } else if (event.type === "autocompleteselect") {
    if (_data.tz_db && typeof _data.tz_db.zones[ui.item.tz_id] === "object") {
      const item = { name: ui.item.name, tz_id: ui.item.tz_id };
      if (typeof ui.item.coords !== "undefined") item.coords = ui.item.coords;

      addItemsToWatchlist([item]);
    } else {
      utils.console.warn(
        "foxclocks.options.onAutocompleteEvent(): unknown tz_id",
        ui.item.tz_id
      );
      $("#search").addClass("error");
    }

    $("#search input").val("");
  } else if (event.type === "autocompletesearch") {
    $("#search").removeClass("error");
    retVal = true;
  } else if (event.type === "autocompleteopen") {
    $("html").addClass("autocomplete-open");
    retVal = true;
  } else if (event.type === "autocompleteclose") {
    $("html").removeClass("autocomplete-open");
    retVal = true;
  }

  return retVal;
};

// ---------------------------------------------------------
const initTimeFormatHandlers = () => {
  const eCustomFormat = $("#custom_format");

  $("#time_format select").on("change", (e) => {
    const selectedOptionValue = $(e.currentTarget).val();
    let timeFormatString = "";

    if (selectedOptionValue === "") {
      eCustomFormat.attr("disabled", false);
      timeFormatString = eCustomFormat.val();
    } else {
      eCustomFormat.attr("disabled", true);
      timeFormatString = selectedOptionValue;
    }

    if (timeFormatString !== "") {
      setStorage("global_time_format", timeFormatString).then((storageObj) => {
        _data.global_time_format = storageObj.global_time_format;
        watchlist.update({ global_time_format: _data.global_time_format });
      });
    }
  });

  eCustomFormat.on("change", () => {
    const timeFormatString = eCustomFormat.val();

    if (timeFormatString !== "") {
      setStorage("global_time_format", timeFormatString).then((storageObj) => {
        _data.global_time_format = storageObj.global_time_format;
        watchlist.update({ global_time_format: _data.global_time_format });
      });
    } else {
      utils
        .getStorage(["global_time_format"])
        .then((storageItems) =>
          eCustomFormat.val(storageItems.global_time_format)
        );
    }
  });
};

// ---------------------------------------------------------
const initStatusbarHandlers = () => {
  $("#statusbar :input").on("change", () => {
    const newStatusbarData = {};

    for (let i = 0; i < _STATUSBAR_CONFIG.length; i++) {
      const name = _STATUSBAR_CONFIG[i].name;
      const elt = $(`#${name}`);

      if (elt.is("select")) {
        newStatusbarData[name] = elt.val();
      } else if (elt.length === 0 || elt.is("input")) {
        const inputType = elt.attr("type");

        if (inputType === "checkbox") {
          newStatusbarData[name] = elt.prop("checked") ? "true" : "false";
        } else if (inputType === "text" || inputType === "number") {
          newStatusbarData[name] = elt.val();
        } else {
          // assume radio
          const values = _STATUSBAR_CONFIG[i].values;

          for (let j = 0; j < values.length; j++) {
            if ($(`#${name}_${values[j]}`).prop("checked")) {
              newStatusbarData[name] = values[j];
              break;
            }
          }
        }
      }
    }

    $(".statusbar_options :input").prop(
      "disabled",
      newStatusbarData.enabled === "false"
    );

    setStorage("statusbar", newStatusbarData);
  });
};

// ---------------------------------------------------------
const setUITzDatabaseInfo = (tzDbData) => {
  $("#tz_db span.version").text(tzDbData.source.version);
  $("#tz_db span.date").text(tzDbData.source.date);
};

// ---------------------------------------------------------
const createUITimeFormats = () => {
  const eTimeFormats = $("#time_format select").empty();

  const nowEpoch = new Date().getTime();
  const standardFormats = utils
    .getI18nMessage("o_standard_time_formats")
    .split("|");

  $.each(standardFormats, (index, timeFormat) => {
    $("<option/>", { value: timeFormat, class: "standard", title: timeFormat })
      .text(utils.getFormattedTime(null, nowEpoch, timeFormat))
      .appendTo(eTimeFormats);
  });

  $("<option/>", { value: "", class: "custom" })
    .text(utils.getI18nMessage("o_custom_format_option"))
    .appendTo(eTimeFormats);

  $("#custom_format").attr("disabled", true);
};

// ---------------------------------------------------------
const updateUITimeFormats = (globalTimeFormat) => {
  let globalTimeFormatIsStandard = true;

  try {
    globalTimeFormatIsStandard =
      $(`#time_format option[value="${globalTimeFormat}"].standard`).length ===
      1;
  } catch (ex) {
    utils.console.warn("foxclocks.options.updateUITimeFormats() failed:", ex);
  }

  $("#time_format select").val(
    globalTimeFormatIsStandard ? globalTimeFormat : ""
  );
  const eCustomFormat = $("#custom_format").attr(
    "disabled",
    globalTimeFormatIsStandard
  );

  if (globalTimeFormatIsStandard === false) eCustomFormat.val(globalTimeFormat);
};

// ---------------------------------------------------------
const setUIStatusbar = (statusbarData) => {
  for (let i = 0; i < _STATUSBAR_CONFIG.length; i++) {
    const name = _STATUSBAR_CONFIG[i].name;
    const elt = $(`#${name}`);
    const data = statusbarData[name];

    if (elt.is("select")) {
      elt.val(data);
    } else if (elt.length === 0 || elt.is("input")) {
      const inputType = elt.attr("type");

      if (inputType === "checkbox") {
        elt.prop("checked", data === "true");
      } else if (inputType === "text" || inputType === "number") {
        elt.val(data);
      } else {
        // assume radio
        const values = _STATUSBAR_CONFIG[i].values;

        for (let j = 0; j < values.length; j++) {
          $(`#${name}_${values[j]}`).prop("checked", data === values[j]);
        }
      }
    }
  }

  $(".statusbar_options :input").prop(
    "disabled",
    statusbarData.enabled === "false"
  );
};

// ---------------------------------------------------------
const queryGeonames = (term, langCode) => {
  // See https://secure.geonames.org/export/geonames-search.html
  //
  const url = new URL("https://secure.geonames.org/searchJSON");

  const params = [
    { name: "username", value: "foxclocks" },
    { name: "featureCode", value: "PCLI" }, // independent political entity (AFM: sometimes doesn't have time zone data, even when possible)
    { name: "featureCode", value: "ADM1" }, // first-order administrative division - a primary administrative division of a country, such as a state in the United States
    { name: "featureCode", value: "ADM2" }, // second-order administrative division - a subdivision of a first-order administrative division
    { name: "featureCode", value: "PPLC" },
    { name: "featureCode", value: "PPLG" },
    { name: "featureCode", value: "PPLA" },
    { name: "featureCode", value: "PPLA2" },
    { name: "featureCode", value: "PPLA3" },
    { name: "featureCode", value: "PPLA4" },
    { name: "featureCode", value: "PPL" },
    { name: "featureCode", value: "AIRP" },
    { name: "style", value: "FULL" }, // needed for timeZoneId
    { name: "maxRows", value: 15 },
    { name: "lang", value: langCode }, // ISO_639-1
    { name: "q", value: term },
  ];

  // No Edge support yet: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/8993198/
  // params.forEach(key => url.searchParams.append(key.name, key.value));

  url.search = "?";
  params.forEach(
    (key) =>
      (url.search +=
        "&" +
        encodeURIComponent(key.name) +
        "=" +
        encodeURIComponent(key.value))
  );

  return fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error(response.statusText);

      return response.json();
    })
    .then((data) => {
      const responseData = [];
      const labels = {};

      for (const item of data.geonames) {
        if (
          typeof item.timezone !== "object" ||
          typeof item.timezone.timeZoneId !== "string"
        )
          continue;

        let itemName = item.name || item.toponymName;

        if (item.fcode === "AIRP" && Array.isArray(item.alternateNames)) {
          for (const altName of item.alternateNames) {
            if (altName.lang === "iata") {
              itemName = `${altName.name} - ${itemName}`;
              break;
            }
          }
        }

        let label = itemName;

        if (
          item.fcode !== "ADM1" &&
          item.adminName1 &&
          itemName !== item.adminName1
        )
          label += ", " + item.adminName1;

        // Assume PCLI means country - not completely certain
        //
        if (
          item.fcode !== "PCLI" &&
          item.countryName &&
          itemName !== item.countryName
        )
          label += ", " + item.countryName;

        if (labels.hasOwnProperty(label))
          // dupe
          continue;

        labels[label] = true;

        responseData.push({
          label,
          name: itemName,
          tz_id: item.timezone.timeZoneId,
          coords:
            // prettier-ignore
            typeof item.lat === "number" && typeof item.lng === "number" ? { lat_decimal: item.lat, long_decimal: item.lng } : "na",
        });
      }

      return responseData;
    });
};

// ---------------------------------------------------------
const createUIAutocomplete = ($input, eventHandler, langCode) =>
  $input.autocomplete({
    minLength: 3,
    delay: 0, // search immediately on having 3 characters
    autoFocus: false, // auto-focus first element - possibly useful but ugly
    search: eventHandler,
    select: eventHandler,
    open: eventHandler,
    close: eventHandler,

    source(request, response) {
      queryGeonames(request.term, langCode)
        .then((data) => response(data))
        .catch((err) => {
          eventHandler(null, null, err); // synthesize error event
          response([]);
        });
    },
  });

// ---------------------------------------------------------
const createUIConfigOverride = (configData) => {
  // Self-contained along with html, including event handlers - no css, no i18n
  //
  const eConfig = $("#config_override");
  const urlParams = utils.parseUrlSearch(window.location.search);

  if (
    $.isEmptyObject(configData) &&
    urlParams.hasOwnProperty("config_override") === false
  ) {
    eConfig.hide();
    return;
  }

  eConfig.show();
  const eInput = eConfig.find("input").val(JSON.stringify(configData));

  eConfig.find("button").on("click", (e) => {
    const eTarget = $(e.currentTarget);

    try {
      setStorage(
        "config_override",
        JSON.parse(eInput.val())
      ).then((storageObj) => eTarget.css("color", "inherit"));
    } catch (ex) {
      eTarget.css("color", "red");
    }
  });
};

//---------------------------------------------------------
const init = () => {
  window.scrollTo(0, 0); // otherwise Options UI scrolled to bottom in Chrome

  const isPopup =
    $("html").addClass(utils.getApplicationName()).attr("id") === "popup";

  const urlParams = utils.parseUrlSearch(window.location.search);
  if (
    urlParams.hasOwnProperty("install_state") === true &&
    (urlParams.install_state[0] === "new" ||
      urlParams.install_state[0] === "updated")
  )
    $("html").addClass(`install_state_${urlParams.install_state[0]}`);

  const docReadyPromise = new Promise((resolve, reject) => {
    $(() => {
      const autoComplete = createUIAutocomplete(
        $("#search input"),
        onAutocompleteEvent,
        utils.getUILanguage().split(/[\-_]/)[0]
      );

      if (!isPopup) {
        $("span.foxclocks_version_number").text(utils.getExtensionVersion());
        $("#zonepicker button.add").attr("disabled", true);

        const urls = utils.getConfig("urls");
        $("a.foxclocks_help").attr("href", urls.extension_help);
        $("span.foxclocks_updated a")
          .attr("href", urls.extension_updated)
          .find("span.link_text")
          .text(urls.extension_updated.replace(/^[a-z]+?:\/\//, ""));

        createUITimeFormats();

        autoComplete.focus(); // distracting in popup
      }

      utils.localizeHtml();
      resolve();
    });
  });

  utils
    .getStorage([
      "tz_db",
      "watchlist",
      "global_time_format",
      "statusbar",
      "locale",
      "config_override",
    ])
    .then((storageItems) => {
      _data.tz_db = storageItems.tz_db;
      _data.global_time_format = storageItems.global_time_format;

      docReadyPromise.then(() => {
        watchlist.init(
          storageItems.watchlist,
          storageItems.tz_db,
          _data.global_time_format,
          onWatchlistEvent,
          !isPopup
        );

        if (!isPopup) {
          $("#zonepicker div.widget_body").jstree({
            core: {
              data: storageItems.locale.zone_picker,
              themes: { dots: false, icons: false, dblclick_toggle: false },
              animation: _ZONE_PICKER_ANIMATION_MILLIS,
              worker: false, // Will not use Blob, which requires 'blob:' in CSP for Firefox 58 (at least), though not 57 or Chrome
            },
          });

          setUIStatusbar(storageItems.statusbar);
          setUITzDatabaseInfo(_data.tz_db);
          updateUITimeFormats(_data.global_time_format);
          createUIConfigOverride(storageItems.config_override);

          // All event handlers below, except onAutocompleteEvent, which is set up in createUIAutocomplete() above so has to be defensive about _data being available
          //
          initWatchlistMenuHandler(); // should be in watchlist object?
          initZonePickerHandlers();
          initTimeFormatHandlers();
          initStatusbarHandlers();

          $("#tz_db .update button").on("click", onDbUpdateButtonEvent);

          $(document).on("click", (e) => {
            // Need something better than this to close pop-ups - fragile
            //
            const eTarget = $(e.target);

            const eInfo = info.get();
            if (
              eInfo !== null &&
              eInfo.is(":visible") &&
              !eTarget.closest("tr").hasClass("information")
            )
              eInfo.hide();

            const eTimeFormatHelp = $("#time_format_help");
            if (
              eTarget.closest("img.time_format_help, #time_format_help")
                .length !== 0
            )
              eTimeFormatHelp.toggle();
            else eTimeFormatHelp.hide();

            const $menu = $("#watchlist_menu");
            if (
              !eTarget.hasClass("item_settings") &&
              $menu.is(":visible") &&
              eTarget.closest($menu).length === 0
            )
              closeMenu();
          });
        } else {
          $("#open_options").on("click", (e) =>
            utils.sendMessage({ action: "open_options" }, (response) => {
              /* do nothing */
            })
          );
        }

        utils.onStorageChanged.addListener(onStorageChangedEvent);
      });
    });
};

// ---------------------------------------------------------
// ENTRYPOINT
// ---------------------------------------------------------
utils.sendMessage({ action: "init" }, (response) => {
  if (response === true) init();
});
