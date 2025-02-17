globalThis.chrome = globalThis.browser;

import logger from './logger.js';
import { randBetween, clamp } from './utils.js';
import SelfCheck from './self-check.js';

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


const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;

/**
 * If you need to introduce incompatible changes to the the state
 * persistence, you can bump this number to clear the persisted cache.
 * It will be as if you start with a fresh installation of the extension.
 *
 * (If you are not sure whether the change is incompatible, it is
 * a good idea to be conservative and bump this number anyway; it will
 * only introduce little overhead.)
 */
const DB_VERSION = 1;

/**
 * Responsible for keeping the patterns up-to-date by polling
 * the backend for changes. By design, it supports situations where
 * the extension is frequently restarted; in other words, it is
 * designed to work in an empheral service worker model and
 * does not required a persistent background.
 *
 * The current implementation assumes that the "update" function
 * gets triggered frequently enough to check for new patterns
 * within the configured intervals.
 */
class PatternsUpdater {
  constructor({ config, patterns, storage, storageKey }) {
    this.patterns = patterns;
    this.storage = storage;
    this.storageKey = storageKey;
    this.patternUpdateUrl = config.PATTERNS_URL;
    if (!this.patternUpdateUrl) {
      logger.warn(
        'PATTERNS_URL is not configured. Pattern updates will be skipped and empty patterns will be used instead.',
      );
    }

    // Update intervals:
    // 1) standard polling interval
    //   (it can be configured conservatively to save bandwidth)
    this.defaultUpdateInterval = {
      min: 8 * HOUR,
      max: 24 * HOUR,
    };

    // 2) accelerated polling intervals
    // It can happen that a pattern update is followed quickly by another one;
    // so, temporarily switch to a faster polling frequency to see these
    // as fast as possible. It is desirable that clients do not fall into
    // different populations with different patterns version.
    this.fastUpdateInterval = {
      min: 30 * MINUTE,
      max: 2 * HOUR,
    };
    this._initEmptyCache();
  }

  _initEmptyCache() {
    this._persistedState = {
      patterns: null, // string (unmodified as it came from the server)
      skipAttemptsUntil: 0, // Unix epoch
      lastFetchAttempt: 0, // Unix epoch
      lastConfirmedModification: 0, // Unix epoch
      failedAttemptsInARow: 0,
      dbVersion: DB_VERSION,
    };
  }

  async _savePersistedState() {
    return this.storage.set(this.storageKey, this._persistedState);
  }

  async init({ now = Date.now() } = {}) {
    let force = false;
    try {
      let persistedState = await this.storage.get(this.storageKey);
      if (persistedState && persistedState.dbVersion !== DB_VERSION) {
        logger.info('DB_VERSION changed. Discarding the cache...');
        persistedState = null;
      }
      if (persistedState && !this._timestampsLookValid(persistedState, now)) {
        logger.warn(
          'The timestamps in the pattern cache show indications that the system clock was off. Discarding the cache:',
          persistedState,
        );
        persistedState = null;
      }

      if (persistedState) {
        if (persistedState.patterns) {
          this.patterns.updatePatterns(JSON.parse(persistedState.patterns));
        }
        this._persistedState = persistedState;
      } else {
        logger.info(
          'Pattern cache does not exist. This should only happen on the first time the extension is started.',
        );
        force = true;
      }
    } catch (e) {
      logger.warn(
        'Failed to load cached patterns from disk. Forcing an update.',
      );
      force = true;
    }

    try {
      await this.update({ force, now });
    } catch (e) {
      logger.warn('Failed to fetch patterns', e);
    }
  }

  /**
   * Poll for pattern updates. It will block until the update operation
   * is finished.
   *
   * Cooldowns:
   * ----------
   * To make this function easier to use, the caller is not responsible
   * for throttling updates. In fact, it is better if the update function
   * is called as often as possible.
   *
   * Error handling:
   * ---------------
   * It is not the responsibility of the caller to schedule retry attemps,
   * but only to guarantee that the "update" function is called regurarily.
   * As it is generally not useful to learn about failure, the returned
   * promise will always resolve. But if you want to know whether it really
   * succeeded or not - for logging or debugging purposes - you can overwrite
   * the default by passing the "ignoreError" flag.
   */
  async update({ force = false, ignoreErrors = true, now = Date.now() } = {}) {
    try {
      await this._update({ force, now });
    } catch (e) {
      if (!ignoreErrors) {
        throw e;
      }
      logger.debug('Failed to update patterns. It is safe to continue.');
    }
  }

  async _update({ force = false, now = Date.now() } = {}) {
    const url = this.patternUpdateUrl;
    if (!url) {
      logger.debug('Pattern updates skipped (update URL not configured)');
      return;
    }

    if (!force && now < this._persistedState.skipAttemptsUntil) {
      logger.debug(
        'Cooldown not reached yet. Need to wait until',
        this._persistedState.skipAttemptsUntil,
        'before updating patterns again.',
      );
      if (this._persistedState.failedAttemptsInARow > 0) {
        throw new Error(
          'Unable to fetch patterns. Need to wait for the cooldown to finish before retrying...',
        );
      }
      return;
    }

    const otherUpdate = this._pendingUpdate;
    if (otherUpdate) {
      logger.debug('Pattern update already in progress...');
      await otherUpdate;
      return;
    }

    let done;
    this._pendingUpdate = new Promise((resolve) => {
      done = resolve;
    });
    try {
      this._persistedState.lastFetchAttempt = now;
      const response = await fetch(url, {
        method: 'GET',
        cache: 'no-cache',
        credentials: 'omit',
      });
      if (!response.ok) {
        throw new Error(
          `Failed to fetch patterns (${response.statusText}) from url=${url}`,
        );
      }
      const newPatterns = await response.text();
      const rules = JSON.parse(newPatterns);

      // Bookkeeping to detect if the server just released an update.
      // It is useful for debugging, but it also means we should
      // temporarily poll more frequently for updates.
      const oldPatterns = this._persistedState.patterns;
      this._persistedState.patterns = newPatterns;
      const detectedModification = oldPatterns && oldPatterns !== newPatterns;
      if (detectedModification) {
        logger.info('The server released new patterns:', rules);
        this._persistedState.lastConfirmedModification = now;
      }

      // successful update: set cooldown
      this._persistedState.failedAttemptsInARow = 0;
      const { min, max } = detectedModification
        ? this.fastUpdateInterval
        : this.defaultUpdateInterval;
      this._persistedState.skipAttemptsUntil = now + randBetween(min, max);

      // apply the pattern update
      if (!oldPatterns || detectedModification) {
        this.patterns.updatePatterns(rules);
      }
    } catch (e) {
      // the update failed: we have to retry, but approximate an
      // exponential backoff to prevent a burst HTTP calls.
      this._persistedState.failedAttemptsInARow += 1;
      const avgCooldown =
        this._persistedState.failedAttemptsInARow * (10 * SECOND);
      const noisyCooldown = randBetween(avgCooldown / 1.5, 1.5 * avgCooldown);
      const finalCooldown = clamp({
        value: noisyCooldown,
        min: 3 * SECOND,
        max: 8 * HOUR,
      });
      this._persistedState.skipAttemptsUntil = now + finalCooldown;
      logger.warn(
        'Failed to fetch pattern. Cooldown until:',
        new Date(this._persistedState.skipAttemptsUntil),
        e,
      );
      throw e;
    } finally {
      try {
        await this._savePersistedState();
      } catch (e) {
        logger.warn('Failed to update patterns cache.', e);
      }
      this._pendingUpdate = null;
      done();
    }
  }

  /**
   * Run some sanity checks on the timestamps. If any of the timestamps
   * were produced from a clock that was in the future, updates will
   * stop working. If we detect such a case, we should purge the cache
   * and start from scratch.
   *
   * Staying forever on outdated patterns would also increase the risk
   * of sticking out from the crowd.
   */
  _timestampsLookValid(persistedState, now = Date.now()) {
    const maxCooldown = Math.max(
      this.defaultUpdateInterval.min,
      this.defaultUpdateInterval.max,
      this.fastUpdateInterval.min,
      this.fastUpdateInterval.max,
    );

    // Small jumps are not a concern (some minutes). But it becomes a
    // problem if the clock jumped too in the future (months).
    // The systems were the system clock is off are rare, but they
    // can happen (e.g. https://github.com/systemd/systemd/issues/6036).
    const allowedDrift = 5 * MINUTE;
    const isOK = (ts) => ts < now + allowedDrift;

    return (
      isOK(persistedState.skipAttemptsUntil - maxCooldown) &&
      isOK(persistedState.lastConfirmedModification) &&
      isOK(persistedState.lastFetchAttempt)
    );
  }

  async selfChecks(check = new SelfCheck()) {
    if (this._persistedState.failedAttemptsInARow > 0) {
      check.warn('unable to update patterns', {
        errorsInARow: this._persistedState.failedAttemptsInARow,
      });
    }

    const patternAge = Date.now() - this._persistedState.lastFetchAttempt;
    if (patternAge > this.defaultUpdateInterval.max) {
      check.fail('patterns are outdated', {
        ageInHours: patternAge / HOUR,
        maxAgeInHours: this.defaultUpdateInterval.max / HOUR,
      });
    } else {
      check.pass('patterns are up to date', {
        lastUpdated: `${patternAge / HOUR} hours ago`,
      });
    }
    return check;
  }
}

export { PatternsUpdater as default };
