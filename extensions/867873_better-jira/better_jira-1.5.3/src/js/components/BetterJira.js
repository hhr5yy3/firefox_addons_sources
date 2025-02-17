import Standup from './Standup';
import Jira from './Jira';
import OpenGithubInNewTab from './OpenGithubInNewTab';

export default class BetterJira {
  static initialize() {
    return new this();
  }

  constructor() {
    this.data = {};
    this.Storage = chrome.storage.sync;
    this.running = true;

    if (Jira.isNotPresent()) {
      this.running = false;
      return;
    }

    this._initialColumnResize();
    this.Storage.get('standup', (storage) => {
      this._initiateStandup(storage.standup);
    });
    this._openGithubLinksInNewTabs();
  }

  update(event) {
    this._updateColumnWidths(event.detail);
    this._initiateStandup(event.detail.standup);
  }

  _updateColumnWidths(detail) {
    if (!this.running) {
      return;
    }

    if (!detail.enabled) {
      document.body.classList.remove('better-jira');
      document.getElementById('ghx-pool').style.width = 'auto';
      return;
    }
    document.body.classList.add('better-jira');
    this._getPreferredWidth(detail);
  }

  _ifEnabled(enabledCallback, disabledCallback = () => {}) {
    if (!this.running) {
      return;
    }

    this.Storage.get('enabled', (storage) => {
      if (!storage.enabled) {
        disabledCallback();
        return;
      }

      enabledCallback();
    });
  }

  _initialColumnResize() {
    if (!this.running) {
      return;
    }

    setTimeout(() => {
      if (Jira.hasNotLoadedSwimlanes()) {
        // console.log('🔧: Swimlanes not present, waiting 100ms.');
        return this._initialColumnResize();
      }
      // console.log('🔧: Swimlanes are present, resizing now.');

      let enabled = () => {
        document.body.classList.add('better-jira');
        this.Storage.get('columnWidth', this._getPreferredWidth.bind(this));
        this._protectAgainstReactBoardReloading();
      };

      //-- Disallow setting columns if the plugin is not enabled
      let disabled = () => {
        document.body.classList.remove('better-jira');
        document.getElementById('ghx-pool').style.width = 'auto';
      };
      this._ifEnabled(enabled, disabled);
    }, 100);
  }

  _getPreferredWidth(storage) {
    if (!this.running) {
      return;
    }

    this.data.columnWidth = storage.columnWidth;

    if (isNaN(this.data.columnWidth)) {
      this.data.columnWidth = 200;
    }

    this._setPreferredWidth();
  }

  _setPreferredWidth() {
    if (!this.running) {
      return;
    }

    let preferredWidth, columnCount, padding, width;

    preferredWidth = this.data.columnWidth;

    columnCount = Jira.columns().length;

    padding = columnCount * 12;
    width = columnCount * preferredWidth + padding;

    if (width < 10) {
      return;
    }

    //-- Handle Smaller Boards
    if (width < window.innerWidth) {
      width = 'auto';
    }

    try {
      let items = { poolWidth: width };
      this.Storage.set(items);

      this._setPoolWidth(width);
    } catch (e) {
      console.error(e);
    }
  }

  _setPoolWidth(width) {
    if (width === 'auto') {
      document.getElementById('ghx-pool').style.width = 'auto';
    } else {
      document.getElementById('ghx-pool').style.width = 'var(--viewport-width)';
      document.documentElement.style.setProperty(
        '--viewport-width',
        `${width}px`
      );
    }
  }

  _setDetailViewWidth(width) {
    document.documentElement.style.setProperty('--detail-view-width', width);
  }

  _initiateStandup(config) {
    Standup.run(config);
  }

  _protectAgainstReactBoardReloading() {
    var mutationObserver = new MutationObserver((mutations) => {
      let contentHasBeenDeleted = mutations.find((mutation) => {
        if (mutation.removedNodes < 1) {
          return false;
        }

        let removedNodes = [...mutation.removedNodes];
        return removedNodes.find((node) => {
          return node.id === 'ghx-pool-column';
        });
      });

      if (contentHasBeenDeleted) {
        mutationObserver.disconnect();
        this._initialColumnResize();
      }
    });
    mutationObserver.observe(Jira.content(), {
      childList: true,
      subtree: true
    });
  }

  _openGithubLinksInNewTabs() {
    OpenGithubInNewTab.initialize();
  }
}
