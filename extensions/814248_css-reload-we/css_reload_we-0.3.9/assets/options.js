const STATE = internalState()

class Options {
  constructor() {
    this.integrations = [
      {
        el: document.getElementById('has-page-action'),
        prop: 'checked',
        key: 'hasPageAction',
      },
      {
        el: document.getElementById('has-context-menu'),
        prop: 'checked',
        key: 'hasContextMenu',
      },
      {
        el: document.getElementById('has-hot-key'),
        prop: 'checked',
        key: 'hasHotKey',
        cb: 'toggleHotKeyChange',
      },
    ]

    this.hotkeys = [
      {
        el: document.getElementById('hot-key-value'),
        prop: 'value',
        name: 'reload-css',
      },
    ]

    this.buttons = [
      {
        el: document.getElementById('hot-key-change'),
        key: this.hotkeys[0],
        cb: 'hotkeySave',
      },
      {
        el: document.getElementById('hot-key-reset'),
        key: this.hotkeys[0],
        cb: 'hotkeyReset',
      },
    ]

    this.callbacks = {
      hotkeySave: async (name, value) => {
        await browser.commands.update({name, shortcut: value})
      },

      hotkeyReset: async (name) => {
        await browser.commands.reset(name)
        this.init()
      },

      toggleHotKeyChange: (value) => {
        const action = value ? 'remove' : 'set'
        const query = '[data-section="hot-key-change"] input, [data-section="hot-key-change"] button'
        document.querySelectorAll(query).forEach((el) => {
          el[`${action}Attribute`]('disabled', 'disabled')
        })
      },
    }
  }

  async init() {
    const branch = await browser.storage.sync.get(STATE.getDefaultIntegrations())

    if (Object.keys(branch).length === 0) {
      return this
    }

    this.integrations.forEach(({el, prop, key, cb}) => {
      el[prop] = branch[key]

      if (cb) {
        this.callbacks[cb](el[prop])
      }
    })

    const commands = await browser.commands.getAll()
    commands.forEach(command => {
      this.hotkeys.forEach(({el, name}) => {
        if (name === command.name) {
          el.value = command.shortcut
        }
      })
    })

    return this
  }

  listen() {
    this.integrations.forEach(({el, prop, key, cb}) => {
      el.addEventListener('change', () => {
        const settings = {
          [key]: el[prop],
        }
        browser.storage.sync.set(settings)

        if (cb) {
          this.callbacks[cb](el[prop])
        }
      })
    })

    this.buttons.forEach(({el, key, cb}) => {
      el.addEventListener('click', () => {
        this.callbacks[cb](key.name, key.el.value)
      })
    })

    return this
  }
}

const options = new Options()
options.init().then(() => {
  options.listen()
})
