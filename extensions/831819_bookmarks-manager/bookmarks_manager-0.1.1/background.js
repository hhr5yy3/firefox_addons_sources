// import removeEmptyFolders from './removeEmptyFolders';

const makeIndent = indentLength => '.'.repeat(indentLength);

const logItems = (bookmarkItem, indent) => {
  if (bookmarkItem.url) {
    console.log(makeIndent(indent) + bookmarkItem.url);
  } else {
    console.log(`${makeIndent(indent) }Folder`);
    indent++;
  }
  if (bookmarkItem.children) {
    for (child of bookmarkItem.children) {
      logItems(child, indent);
    }
  }
  indent--;
};

const logTree = (bookmarkItems, action) => {
  console.log(bookmarkItems);
};

const onError = (error) => {
  console.log(`An error: ${error}`);
};

const gettingTree = browser.bookmarks.getTree();
gettingTree.then(logTree, onError);
