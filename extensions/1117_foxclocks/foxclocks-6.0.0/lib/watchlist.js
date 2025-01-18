/* Copyright (c) 2020 Andy McDonald. All rights reserved. */

/*jshint esversion: 6, module: true */

// ---------------------------------------------------------
const utils = window.foxclocks.utils;

// ---------------------------------------------------------
const _data = {};
let _editable = false;

//---------------------------------------------------------
const updateUIClocks = (watchlistData, watchlistZones, globalTimeFormat) => {
  const nowEpoch = new Date().getTime();

  $("#watchlist_table td.time").each((index, eTimeTd) => {
    const item = watchlistData[index]; // works because order of td.times iterated over will be the same as in the DOM

    // prettier-ignore
    const timeFormat = typeof item.statusbar.time_format === "string" ? item.statusbar.time_format : globalTimeFormat;

    eTimeTd.innerText = utils.getFormattedTime(
      watchlistZones[item.tz_id],
      nowEpoch,
      timeFormat
    );
  });
};

// ---------------------------------------------------------
const createUI = (watchlistData, watchlistZones, globalTimeFormat) => {
  const eWatchlistBody = $("#watchlist_table tbody").empty();

  for (const item of watchlistData) {
    const itemZone = watchlistZones[item.tz_id];

    const eTr = $("<tr/>");

    if (item.statusbar.show_flag && typeof itemZone.country_code === "string")
      eTr.addClass("show_flag");

    if (item.statusbar.bold === true) eTr.addClass("bold");

    if (item.statusbar.italic === true) eTr.addClass("italic");

    if (item.statusbar.underline === true) eTr.addClass("underline");

    if (item.statusbar.colour && !_editable)
      eTr.css("color", item.statusbar.colour);

    const eTdFlagImage = $("<td/>", { class: "flag" }).append(
      $("<img/>", { class: "delete", src: "/images/cross.png" })
    );

    if (typeof itemZone.country_code === "string")
      $("<img/>", {
        class: "flag",
        src: `/images/flags/${itemZone.country_code.toLowerCase()}.png`,
      }).appendTo(eTdFlagImage);

    eTdFlagImage.appendTo(eTr);

    const eTdName = $("<td/>", { class: "name" });

    if (_editable === true) {
      $("<input/>", {
        name: "name",
        type: "text",
        value: item.name,
        "data-i18n-placeholder": "o_watchlist_name_placeholder",
      }).appendTo(eTdName);
      $("<img/>", {
        class: "item_settings item_control",
        src: "/images/cog_edit.png",
      }).appendTo(eTdName);
    } else {
      $("<span/>", {
        text: item.name,
        "data-i18n-placeholder": "o_watchlist_name_placeholder",
      }).appendTo(eTdName);
    }

    eTdName.appendTo(eTr);

    $("<td/>", { class: "time" }).appendTo(eTr);

    if (_editable === true) {
      const eTdTimeFormat = $("<td/>", { class: "time_format" });
      $("<input/>", {
        name: "time_format",
        type: "text",
        "data-i18n-placeholder": "o_watchlist_time_format_placeholder",
        // prettier-ignore
        value: typeof item.statusbar.time_format === "string" ? item.statusbar.time_format : ""
      }).appendTo(eTdTimeFormat);

      $("<img/>", {
        class: "time_format_help item_control",
        src: "/images/help.png",
      }).appendTo(eTdTimeFormat);
      eTdTimeFormat.appendTo(eTr);
    }

    eTr.appendTo(eWatchlistBody);
  }

  utils.localizeHtml(eWatchlistBody);

  updateUIClocks(watchlistData, watchlistZones, globalTimeFormat);
};

//---------------------------------------------------------
const init = (
  watchlistData,
  tzDb,
  globalTimeFormat,
  watchlistEventHandler,
  editable
) => {
  _data.watchlist = watchlistData;
  _data.global_time_format = globalTimeFormat;
  _editable = editable;

  utils
    .getZonesForWatchlist(_data.watchlist, tzDb.zones)
    .then((watchlist_zones) => {
      _data.watchlist_zones = watchlist_zones;

      $(() => {
        const tableBody = $("#watchlist_table > tbody");

        const setOddEven = (excludePlaceholder) => {
          let i = 0;
          tableBody
            .find("tr")
            .removeClass("sortable_odd sortable_even")
            .each((badIndex, element) => {
              const elt = $(element);

              // css position only reliable way to detect tr.ui-sortable-helper; class not on tr in start(), e.g.
              //
              if (
                elt.css("position") !== "absolute" &&
                (excludePlaceholder === true &&
                  elt.hasClass("sortable_placeholder")) === false
              ) {
                elt.addClass(i % 2 === 0 ? "sortable_odd" : "sortable_even");
                i++;
              }
            });
        };

        tableBody.sortable({
          cursor: "pointer",
          axis: "y",
          scroll: true,
          containment: "#watchlist div.widget_body",
          placeholder: "sortable_placeholder",
          forcePlaceholderSize: true,

          update(event, ui) {
            watchlistEventHandler(event, ui);
          },
          change(event, ui) {
            setOddEven();
          },
          out(event, ui) {
            setOddEven($("#zonepicker_drag").length === 1);
          }, // exclude if dragging - just about to be removed from the DOM
          over(event, ui) {
            ui.placeholder.height(ui.item.height());
          },

          start(event, ui) {
            setOddEven();

            ui.item.data("sort_start_row_index", ui.item.prevAll().length);
          },

          stop(event, ui) {
            tableBody.find("tr").removeClass("sortable_even sortable_odd");

            ui.item.removeData("sort_start_row_index");
          },
        });

        tableBody.on("change click", watchlistEventHandler);

        // Catch drops below #watchlist_table
        //
        $("#watchlist .widget_body").droppable({
          hoverClass: "drop_hover",
          drop(event, ui) {
            watchlistEventHandler(event, ui);
          },
        });

        createUI(
          _data.watchlist,
          _data.watchlist_zones,
          _data.global_time_format
        );

        window.setInterval(
          () =>
            updateUIClocks(
              _data.watchlist,
              _data.watchlist_zones,
              _data.global_time_format
            ),
          utils.getConfig("time_update_interval_millis")
        );
      });
    });
};

//---------------------------------------------------------
const update = (data) => {
  if (data.hasOwnProperty("watchlist")) _data.watchlist = data.watchlist;

  if (data.hasOwnProperty("global_time_format"))
    _data.global_time_format = data.global_time_format;

  if (data.hasOwnProperty("watchlist") || data.hasOwnProperty("tz_db")) {
    // prettier-ignore
    const zones = data.hasOwnProperty("tz_db") ? data.tz_db.zones : _data.watchlist_zones;

    utils
      .getZonesForWatchlist(_data.watchlist, zones)
      .then((watchlist_zones) => {
        _data.watchlist_zones = watchlist_zones;
        createUI(
          _data.watchlist,
          _data.watchlist_zones,
          _data.global_time_format
        );
      });
  } else {
    updateUIClocks(
      _data.watchlist,
      _data.watchlist_zones,
      _data.global_time_format
    );
  }
};

// ---------------------------------------------------------
export default {
  init,
  update,
  get() {
    return _data;
  },
};
