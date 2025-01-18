/* Copyright (c) 2020 Andy McDonald. All rights reserved. */

/*jshint esversion: 6 */

// ---------------------------------------------------------
(() => {
  "use strict";

  // ---------------------------------------------------------
  const utils = window.foxclocks.utils;

  // ---------------------------------------------------------
  const _INFO_LEEWAY_PX = 30;

  let _territories = null;
  let _eInfo = null;

  // ---------------------------------------------------------
  const getZoneOffsetString = (offsetMins) => {
    const hrs = Math.floor(Math.abs(offsetMins) / 60);
    const mins = Math.abs(offsetMins) % 60;

    return `${(offsetMins < 0 ? "-" : "+") + (hrs < 10 ? "0" + hrs : hrs)}:${
      mins < 10 ? "0" + mins : mins
    }`;
  };

  //---------------------------------------------------------
  const getTerritoryText = (itemZone) => {
    return new Promise((resolve, reject) => {
      if (typeof itemZone.country_code !== "string") resolve(null);
      else if (_territories !== null) resolve(_territories);
      else
        utils
          .getStorage(["locale"])
          .then((storageItems) =>
            resolve((_territories = storageItems.locale.territories))
          )
          .catch((err) => reject(err));
    }).then((territories) =>
      // prettier-ignore
      territories !== null && territories.hasOwnProperty(itemZone.country_code) ? territories[itemZone.country_code] : null
    );
  };

  // ---------------------------------------------------------
  const set = (item, itemZone, position) => {
    if (_eInfo === null) {
      const infoHtml = `
			<div id="foxclocks-info" class="foxclocks-content">
				<span class="foxclocks-nowrap">
					<span class="foxclocks-flag"/>
					<span class="foxclocks-name"/>
					<span class="foxclocks-map">
						<a target="_blank" href="#">${utils.getI18nMessage("misc_map")}</a>
					</span>
				<span>

				<div class="foxclocks-fixed"/>
				<table class="foxclocks-transitions"/>

				<div class="foxclocks-details">
					<div class="foxclocks-territory"/>
					<span class="foxclocks-tzid"/>
					<span class="foxclocks-comments"/>
				</div>
			</div>
		`;

      _eInfo = $(infoHtml).appendTo(document.documentElement);
    }

    _eInfo.show();

    const mapUrl = utils.getMapUrl(item, itemZone);
    const langCode = utils.getUILanguage().split(/[\-_]/)[0];

    _eInfo
      .find(
        ".foxclocks-flag, .foxclocks-fixed, .foxclocks-transitions, .foxclocks-territory, .foxclocks-comments"
      )
      .empty()
      .end()
      .find(".foxclocks-name")
      .text(
        // prettier-ignore
        item.name !== "" ? item.name : `(${utils.getI18nMessage("o_watchlist_name_placeholder")})`
      )
      .end()
      .find(".foxclocks-map a")
      .attr("href", mapUrl === null ? "#" : mapUrl)
      .end()
      .find(".foxclocks-tzid")
      .text(`id '${item.tz_id}'`);

    if (typeof itemZone.country_code === "string")
      _eInfo.find(".foxclocks-flag").append(
        $("<img/>", {
          src: utils.getExtensionUrl(
            `/images/flags/${itemZone.country_code.toLowerCase()}.png`
          ),
        })
      );

    if (
      typeof itemZone.comments === "object" &&
      itemZone.comments.hasOwnProperty(langCode) &&
      itemZone.comments[langCode] !== item.name
    )
      _eInfo.find(".foxclocks-comments").text(itemZone.comments[langCode]);

    getTerritoryText(itemZone).then((territoryText) =>
      _eInfo.find(".foxclocks-territory").text(territoryText)
    );

    if (typeof itemZone.transitions !== "undefined") {
      const nowEpoch = new Date().getTime();

      if (itemZone.transitions.length === 1) {
        const firstTrans = itemZone.transitions[0];
        if (nowEpoch > firstTrans.epoch)
          // treat single past transition as fixed
          _eInfo
            .find(".foxclocks-fixed")
            .text(
              `GMT${getZoneOffsetString(firstTrans.offset_mins)} (${
                firstTrans.name
              })`
            );
      } else {
        const transIndex = utils.getZoneTransitionIndex(itemZone, nowEpoch);
        const eTransitions = _eInfo.find(".foxclocks-transitions");
        const transFormat = utils.getConfig("transition_format");

        for (let m = 0; m < itemZone.transitions.length; m++) {
          // The first transition is represented in the 'old' time zone, which we don't know (transDate, transTime below will be null),
          // so don't display this unless it's the active transition - just looks a bit odd
          //
          if (m === 0 && m !== transIndex) continue;

          const trans = itemZone.transitions[m];

          const classArray = [
            m === transIndex ? "foxclocks-active" : "foxclocks-inactive",
            trans.is_dst ? "foxclocks-dst" : "foxclocks-standard",
          ];

          const transDate = utils.getFormattedTime(
            itemZone,
            trans.epoch,
            transFormat.date
          );
          const transTime = utils.getFormattedTime(
            itemZone,
            trans.epoch,
            transFormat.time
          );

          const tr = `
					<tr class="${classArray.join(" ")}">
						<td><span class="foxclocks-offset">GMT${getZoneOffsetString(
              trans.offset_mins
            )} (${trans.name})</span></td>
						<td><span class="foxclocks-date">${
              transDate !== null ? transDate : ""
            }</span></td>
						<td><span class="foxclocks-time">${
              transTime !== null ? transTime : ""
            }</span></td>
					</tr>
				`;

          eTransitions.append($(tr));
        }
      }
    } else {
      _eInfo
        .find(".foxclocks-fixed")
        .text(
          `GMT${getZoneOffsetString(itemZone.fixed.offset_mins)} (${
            itemZone.fixed.name
          })`
        );
    }

    if (typeof position === "object") {
      _eInfo
        .removeClass("foxclocks-mode-statusbar foxclocks-mode-watchlist")
        .removeAttr("style");

      if (
        position.hasOwnProperty("mode") &&
        (position.mode === "foxclocks-mode-statusbar" ||
          position.mode === "foxclocks-mode-watchlist")
      )
        _eInfo.addClass(position.mode);

      let styleString = "";

      if (position.hasOwnProperty("left")) {
        const leftPx =
          position.left -
          Math.max(
            position.left +
              _eInfo.outerWidth() +
              _INFO_LEEWAY_PX -
              window.innerWidth,
            0
          );
        styleString += `left: ${leftPx}px !important;`;
      }

      if (position.hasOwnProperty("top")) {
        const topPx =
          position.top -
          Math.max(
            position.top +
              _eInfo.outerHeight() +
              _INFO_LEEWAY_PX -
              window.innerHeight,
            0
          );
        styleString += `top: ${topPx}px !important;`;
      }

      if (styleString !== "") _eInfo.attr("style", styleString);
    }
  };

  // ---------------------------------------------------------
  window.foxclocks.info = {
    set,
    get() {
      return _eInfo;
    },
  };
})();
