class Action {
  constructor(name, btnId) {
    this.name = name;
    this.active = false;
    this.btn = document.getElementById(btnId);
    this.target = this.btn.getAttribute('data-target');
    this.btn.addEventListener('click', this.onActionBtnClick.bind(this), false);
  }

  static enableOption(option, state) {
    if (state) {
      option.classList.remove('hide');
    } else {
      option.classList.add('hide');
    }
  }

  onActionBtnClick(e) {
    const option = document.getElementById(this.target);
    if (this.active === false) {
      this.active = true;
      e.target.classList.add('active');
      Action.enableOption(option, true);
    } else {
      this.active = false;
      e.target.classList.remove('active');
      Action.enableOption(option, false);
    }
  }
}

class LocalStorage {
  static saveOptions(name, inp) {
    const setItem = browser.storage.local.set({
      [name]: inp.value
    });
  }

  static restoreOptions(name, inp) {
    const getItem = browser.storage.local.get();
    getItem.then(res => {
      inp.value = res[name] || '';
    });
  }
}

class BookmarksManager {
  constructor() {
    // storage
    this.folders = {
      all: [],
      removed: [],
      excluded: []
    };
    // get elements
    this.loggerEl = document.getElementById('log');
    this.backupBtn = document.getElementById('backup_btn');
    this.sortBtn = document.getElementById('sortBtn');
    this.sortFirstEl = document.querySelector(
      '#option_sort select[name="sortFirst"]'
    );
    this.sortByEl = document.querySelector(
      '#option_sort select[name="sortBy"]'
    );
    this.orderByEl = document.querySelector(
      '#option_sort select[name="orderBy"]'
    );
    this.excludeFoldersInput = document.getElementById('exclude_folders_input');
    this.removeEmptyFoldersBtn = document.getElementById('rm_ef_btn');
    // set actions
    this.actionBackupAndRestore = new Action(
      'Backup and restore',
      'backup_and_restore_btn'
    );
    this.actionSort = new Action('Sort', 'sort_btn');
    this.actionRemoveEmptyFolders = new Action(
      'Remove empty folders',
      'remove_empty_folders_btn'
    );
    this.actionAbout = new Action('Remove empty folders', 'about_btn');
    //
    this.backupBtn.addEventListener('click', this.backupMain.bind(this));
    this.sortBtn.addEventListener('click', this.sortBookmarksMain.bind(this));
    this.removeEmptyFoldersBtn.addEventListener(
      'click',
      this.removeEmptyFoldersMain.bind(this)
    );
    // init logger
    this.createLogLine('> Bookmarks Manager is initialized');
    // progress
    this.bookmarksCounter = 0;
  }

  static onMoved(bookmarkItem) {
    console.log(bookmarkItem.index);
  }

  static onRejected(error) {
    console.log(`An error: ${error}`);
  }

  createLogLine(text) {
    const elp = document.createElement('div');
    const txt = document.createTextNode(text);
    elp.appendChild(txt);
    this.loggerEl.appendChild(elp);
  }

  showProgress(text) {
    this.loggerEl.lastChild.innerText = text;
  }

  async calcBookmarks(id) {
    const res = await browser.bookmarks.getSubTree(id);
    if (res && res.length > 0) {
      const children = res[0].children;
      if (children) {
        this.bookmarksCounter += res[0].children.length;
        this.showProgress(this.bookmarksCounter);
        const proms = children.map(async (child, i) => {
          if (child.children && child.children.length > 0) {
            const cb = await this.calcBookmarks(child.id);
            return cb;
          } else {
            return false;
          }
        });
        const promsRes = await Promise.all(proms);
        return true;
      }
    }
    return false;
  }

  getSortedBookmarks(children) {
    return children.sort((a, b) => {
      if (
        this.sortByEl.value === 'By titles' &&
        this.orderByEl.value === 'Asc'
      ) {
        if (a.title < b.title) {
          return -1;
        } else if (a.title > b.title) {
          return 1;
        }
        return 0;
      } else if (
        this.sortByEl.value === 'By titles' &&
        this.orderByEl.value === 'Desc'
      ) {
        if (a.title > b.title) {
          return -1;
        } else if (a.title < b.title) {
          return 1;
        }
        return 0;
      } else if (
        this.sortByEl.value === 'By links' &&
        this.orderByEl.value === 'Asc'
      ) {
        if (a.url < b.url) {
          return -1;
        } else if (a.url > b.url) {
          return 1;
        }
        return 0;
      } else if (
        this.sortByEl.value === 'By links' &&
        this.orderByEl.value === 'Desc'
      ) {
        if (a.url > b.url) {
          return -1;
        } else if (a.url < b.url) {
          return 1;
        }
        return 0;
      } else {
        if (a.title < b.title) {
          return -1;
        } else if (a.title > b.title) {
          return 1;
        }
        return 0;
      }
    });
  }

  async sortFolderBookmarks(id) {
    const res = await browser.bookmarks.getSubTree(id)
    if (res) {
      this.showProgress(res[0].title);
      if (res[0].children) {
        let newChildren = [...res[0].children];
        let folders = [];
        let bookmarks = [];
        newChildren.forEach(item => {
          if (item.children) {
            folders.push(item);
          } else {
            bookmarks.push(item);
          }
        });
        folders = this.getSortedBookmarks(folders);
        bookmarks = this.getSortedBookmarks(bookmarks);
        if (this.sortFirstEl.value === 'Folders first') {
          newChildren = [...folders, ...bookmarks];
        } else if (this.sortFirstEl.value === 'Bookmarks first') {
          newChildren = [...bookmarks, ...folders];
        }
        const rmProms = [];
        const proms = newChildren.map(async (child, i) => {
          const bbm = await browser.bookmarks.move(child.id, { index: i });
          rmProms.push(bbm);
          if (child.children && child.children.length > 0) {
            const sfb = await this.sortFolderBookmarks(child.id);
            return sfb;
          }
          return false;
        });
        const rmPromsRes = await Promise.all(rmProms);
        const promsRes = await Promise.all(proms);
        return true;
      }
    }
    return false;
  }

  removeEmptyFolders() {
    if (this.folders.all.length) {
      this.folders.all.forEach(el => {
        if (this.searchFoldersForRemove(el)) {
          browser.bookmarks.removeTree(el.id);
          this.folders.removed.push(el.title);
        }
      });
    }
  }

  static getExcludedFolders() {
    const exFoldersEl = document.getElementById('exclude_folders_input');
    return exFoldersEl.value
      ? exFoldersEl.value.split(';').map(folder => folder.trim())
      : [];
  }

  findFolders(item) {
    if (item.children) {
      item.children.forEach(el => {
        if (el.type === 'folder') {
          this.folders.all.push(el);
          this.findFolders(el);
        }
      });
    }
  }

  searchFoldersForRemove(item) {
    return (
      item.children &&
      item.children.length === 0 &&
      this.folders.excluded.indexOf(item.title) === -1 &&
      item.id !== 'menu________' &&
      item.id !== 'toolbar_____' &&
      item.id !== 'unfiled_____' &&
      item.id !== 'mobile______'
    );
  }

  backupMain() {
    this.createLogLine('Backup bookmarks: Start');
  }

  removeEmptyFoldersMain() {
    this.createLogLine('> REMOVING EMPTY FOLDDERS: Start');
    this.folders.excluded = BookmarksManager.getExcludedFolders();
    this.createLogLine(
      `> Excluded folders: [ ${this.folders.excluded.join(', ')} ]`
    );
    this.setOptionState = new Promise((resolve, reject) => {
      LocalStorage.saveOptions('exclude_folders', this.excludeFoldersInput);
      resolve('success');
    });
    this.setOptionState.then(() => {
      browser.bookmarks
        .getSubTree('root________')
        .then((res, rej) => {
          this.folders.all = [];
          this.folders.removed = [];
          res[0].children.forEach(partition => {
            this.findFolders(partition);
          });
        })
        .then(() => {
          this.createLogLine(`Found ${this.folders.all.length} Folders`);
          this.removeEmptyFolders();
          this.createLogLine(
            `> Removed Folders: ${this.folders.removed.length}`
          );
          if (this.folders.removed.length) {
            this.createLogLine(`...[ ${this.folders.removed.join(', ')} ]`);
          }
          this.createLogLine('> REMOVING EMPTY FOLDDERS ...end');
        });
    });
  }

  async sortBookmarksMain() {
    const rootFolder = 'toolbar_____';
    this.createLogLine('> SORTING BOOKMARKS ...start');
    this.createLogLine('> Calculating Bookmarks');
    this.createLogLine('...');
    const calcBookmarksRes = await this.calcBookmarks(rootFolder);
    if (calcBookmarksRes) {
      this.createLogLine(`> Found ${this.bookmarksCounter} Bookmarks`);
      this.bookmarksCounter = 0;
    }
    this.createLogLine('> Sorting Bookmarks');
    this.createLogLine('...');
    const sortFolderBookmarksRes = await this.sortFolderBookmarks(rootFolder);
    if (sortFolderBookmarksRes) {
      this.createLogLine('> SORTING BOOKMARKS ...end');
    }
  }
}

const bm = new BookmarksManager();

document.addEventListener(
  'DOMContentLoaded',
  LocalStorage.restoreOptions('exclude_folders', bm.excludeFoldersInput)
);
