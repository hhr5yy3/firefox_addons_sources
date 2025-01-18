/* globals module, $, prefWindow, openHelp, defaultValues */
'use strict';

// eslint-disable-next-line no-unused-vars
const filetypeModal = {
  empty: null,

  init() {
    this.modal = $('filetype-modal');
    this.closeBtn = this.modal.getElementsByClassName('close')[0];
    this.modal.addEventListener('click', this);
    this.modal.addEventListener('keypress', this);

    this.list = $('filetype-list');
    this.list.addEventListener('change', this);

    this.newEntry = $('filetype-entry');
    this.newEntry.addEventListener('input', this);
  },

  handleEvent(event) {
    switch (event.type) {
      case 'change':
        this.updateSelectedItem();
        break;
      case 'click':
        this.handleClick(event);
        break;
      case 'input':
        this.input();
        break;
      case 'keypress':
        if (event.keyCode == 13) {
          this.save();
          this.close();
        } else if (event.keyCode == 27) {
          this.close();
        }
        break;
      default:
        throw new Error(`Tabmix Error: unknown event ${event.type}`);
    }
  },

  handleClick(event) {
    const item = event.target;

    // console.log(item.id || null, item.localName, item.parentNode.localName, event.type, 'outside', item == this.modal, '<span> (x)', item == this.closeBtn);
    if (item == this.modal || item == this.closeBtn) {
      // When the user clicks anywhere outside of the modal, close it
      // When the user clicks on <span> (x), close the modal
      this.close();
    } else if (item.localName != 'button') {
      // console.log('Tabmix: clicked not on a button');
      return;
    }

    // handle button click
    switch (item.id) {
      case 'filetype-add':
        this.add();
        break;
      case 'filetype-edit':
        this.mod();
        break;
      case 'filetype-delete':
        this.del();
        break;
      case 'filetype-restore':
        this.restore();
        break;
      case 'filetype-save':
        this.save();
        this.close();
        break;
      case 'filetype-close':
        this.close();
        break;
      case 'filetype-help': {
        const helpTopic = item.getAttribute('helpTopic');
        openHelp(helpTopic);
        break;
      }
    }
  },

  async open() {
    if (!this.modal) {
      this.init();
    }

    this.empty = false;
    await this.populateFiletypeList();

    this.modal.style.display = 'block';
    this.selectItemAt(0, true);
  },

  close() {
    this.modal.style.display = 'none';
    this.modal.removeEventListener('click', this);
    this.modal.removeEventListener('keypress', this);
    this.modal = null;
    this.closeBtn = null;

    this.list.removeEventListener('change', this);
    this.list = null;

    this.newEntry.removeEventListener('input', this);
    this.newEntry = null;
  },

  defaultValue: defaultValues.filetype,

  async populateFiletypeList(restore) {
    // create filetype list
    const data = restore || await browser.storage.local.get('filetype');
    // console.log('Tabmix filetype data', typeof data, data);
    const filetype = data.hasOwnProperty('filetype') ?
      data.filetype : this.defaultValue;

    // console.log('Tabmix filetype', typeof filetype, filetype);

    if (!filetype.length) {
      this.setButtonDisable('delete', true);
      this.insertPlaceholder();
      return;
    }

    // remove all existing items
    Array.from(this.list.childNodes).forEach(item => item.remove());

    // add new items
    filetype.split(' ').forEach(type => {
      const value = type.trim().toLowerCase();
      const option = document.createElement('option');
      option.value = value;
      option.text = value;
      this.list.add(option);
    });
  },

  save() {
    // console.log('Tabmix:\nsave', this.list.options);
    const filetype = this.empty ? '' :
      Array.from(this.list.options).map(item => item.text).join(' ');
    // console.log('Tabmix:\nsave filetype', filetype);
    browser.storage.local.set({filetype})
        // .then(() => console.log('Tabmix: filetype preference was saved successfully'))
        .catch(err => console.error('Tabmix: Error occurred when trying to save filetype preference\n', err));
  },

  // sets the textbox to the currently selected item, if any
  updateSelectedItem() {
    this.setButtonDisable('edit', true);
    this.setButtonDisable('add', true);

    const selected = this.list.selectedOptions;
    // console.log('Tabmix list.selectedItem', selected[0]);
    if (!selected.length) {
      this.setButtonDisable('delete', true);
      return;
    }
    this.newEntry.value = selected[0].value;
    this.setButtonDisable('delete', false);
  },

  add() {
    // check for data in the textbox
    const value = this.newEntryValue;
    if (!value) {
      return;
    }

    if (this.empty) {
      this.empty = false;
      this.list.innerHTML = '';
    }

    const option = document.createElement('option');
    option.value = value;
    option.text = value;
    this.list.add(option);

    this.selectItemAt(option.index, true);
    this.setButtonDisable('delete', false);
  },

  mod() {
    // console.log('Tabmix', 'mod');
    // check for data in the textbox
    const value = this.newEntryValue;
    if (!value) {
      return;
    }

    // make sure an item is selected, else create a new item
    const selected = this.list.selectedOptions;
    if (!selected.length) {
      this.add();
      return;
    }

    // change the text
    const option = selected[0];
    option.value = value;
    option.text = value;
    this.selectItemAt(option.index, false);

    this.setButtonDisable('edit', true);
    this.setButtonDisable('add', true);
  },

  input() {
    const value = this.newEntryValue;
    if (!value) {
      this.setButtonDisable('edit', true);
      this.setButtonDisable('add', true);
    } else {
      // check if the input value is in the list
      const item = document.querySelector(`option[value="${value.replace(/\\/g, '\\\\')}"]`);
      if (item) {
        this.selectItemAt(item.index, false);
        this.setButtonDisable('edit', true);
        this.setButtonDisable('add', true);
      } else {
        if (this.list.selectedOptions[0]) {
          this.setButtonDisable('edit', false);
        }
        this.setButtonDisable('add', false);
      }
    }
  },

  del() {
    // console.log('Tabmix', 'del', this.list);
    var item = this.list.selectedOptions[0];
    if (!item) {
      return;
    }
    const index = item.index;
    const count = this.list.length;
    // console.log('this.list.length', this.list.length);
    // if the list is not empty select next item or if we at the end the last item
    if (count > 1) {
      this.selectItemAt(index == count - 1 ? index - 1 : index + 1, true);
    } else {
      this.newEntry.value = '';
      this.setButtonDisable('delete', true);
      this.insertPlaceholder();
    }
    item.remove();
  },

  restore() {
    // console.log('Tabmix', 'restore');
    this.populateFiletypeList(true);
    this.selectItemAt(0, true);
    this.save();
  },

  // select new item and focus the list
  selectItemAt(index, focus) {
    if (!this.empty) {
      this.list.selectedIndex = index;
      this.updateSelectedItem();
    }
    if (focus) {
      this.list.focus();
    }
  },

  // Select list shrinks when empty
  insertPlaceholder() {
    this.empty = true;
    this.list.innerHTML = '<option style="visibility:hidden;" value="0">0</option>';
  },

  get newEntryValue() {
    return this.newEntry.value.trim().toLowerCase();
  },

  setButtonDisable(id, set) {
    prefWindow.setDisabled($(`filetype-${id}`), set);
  },
};

if (typeof module == 'object' && typeof module.exports == 'object') {
  module.exports = filetypeModal;
}
