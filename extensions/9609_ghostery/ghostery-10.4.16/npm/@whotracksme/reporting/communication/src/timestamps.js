globalThis.chrome = globalThis.browser;

/**
 * WhoTracks.Me
 * https://whotracks.me/
 *
 * Copyright 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0
 */

/**
 * Contains functions to generate timestamps used in WhoTracksMe messages.
 * As a general rule, all timestamps in the context of WhoTracksMe will be in UTC.
 *
 * To mitigate the risk of fingerprinting based on clock drift, messages
 * should not include high resolution timestamps, but instead should be rounded.
 */

function getTrustedUtcTime() {
  // Note: the approach that is used on Desktop to prevent messages
  // being sent out with a wrong system clock cannot be ported
  // as it is inheritely based on frequent wakeups.
  //
  // For now, assume that the system clock is accurate enough.
  // The reason for this function is only to have all sensitive time operations
  // at one place if we want to add some heuristics here.
  return new Date();
}

function getTimeAsYYYYMMDD(now) {
  const ts = getTrustedUtcTime();
  return ts
    .toISOString()
    .replace(/[^0-9]/g, '')
    .slice(0, 8);
}

export { getTimeAsYYYYMMDD, getTrustedUtcTime };
