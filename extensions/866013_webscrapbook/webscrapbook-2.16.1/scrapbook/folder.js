/******************************************************************************
 *
 * Script for postit.html.
 *
 * @require {Object} scrapbook
 * @require {Object} server
 * @public {Object} controller
 *****************************************************************************/

(function (global, factory) {
  // Browser globals
  global.controller = factory(
    global.isDebug,
    global.scrapbook,
    global.server,
  );
}(this, function (isDebug, scrapbook, server) {

  'use strict';

  const controller = {
    id: null,
    bookId: null,
    target: null,

    async init() {
      try {
        const params = new URL(document.URL).searchParams;
        const id = this.id = params.get('id') || 'root';
        const bookId = this.bookId = params.get('bookId') || '';

        await scrapbook.loadOptionsAuto;
        await server.init();

        const book = server.books[bookId];
        if (!book) {
          throw new Error(`Specified book "${bookId}" does not exist.`);
        }

        const meta = await book.loadMeta();

        const item = meta[id];

        if (book.isSpecialItem(id)) {
          document.title = id;
        } else if (item) {
          document.title = item.title || ' ';
        } else {
          throw new Error(`Specified item "${id}" does not exist.`);
        }

        const toc = await book.loadToc();

        this.treeElem = document.getElementById('items');
        this.tree = new BookTree({
          treeElem: this.treeElem,
        });

        this.tree.init({
          book,
          rootId: id,
          allowSelect: true,
          allowAnchorClick: true,
          allowContextMenu: true,
          allowKeyboardNavigation: true,
        });
        await this.tree.rebuild();
      } catch (ex) {
        console.error(ex);
        alert(`Error: ${ex.message}`);
      }
    },

  };

  document.addEventListener('DOMContentLoaded', (event) => {
    scrapbook.loadLanguages(document);

    controller.init();
  });

  return controller;

}));
