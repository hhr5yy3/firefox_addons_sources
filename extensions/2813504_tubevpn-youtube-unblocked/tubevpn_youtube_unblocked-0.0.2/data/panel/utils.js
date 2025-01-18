/* globals app */
'use strict'

var app = {}
var _ = chrome.i18n.getMessage

var prefs = {}
var isconnect = false
const STATE_LOGIN = 'login'
const STATE_MAIN = 'main'

let originalIp = ''

var connetStatus = ''

app.activeIp = false
app.lastAuthAttempt = false
//app.state = STATE_LOGIN;
app.conf = {}
app.notes = {}
app.lastState = false

app.callbacks = {
  on: {},
  once: {},
}
app.onces = {}

app.on = (id, callback) => {
  app.callbacks.on[id] = app.callbacks.on[id] || []
  app.callbacks.on[id].push(callback)
}

app.once = (id, callback) => {
  app.callbacks.once[id] = app.callbacks.once[id] || []
  app.callbacks.once[id].push(callback)
}
app.emit = (id, value) => {
  ;(app.callbacks.on[id] || []).forEach((c) => c(value))
  ;(app.callbacks.once[id] || []).forEach((c) => c(value))
  app.callbacks.once[id] = []

  if (id == 'update-description') {
    chrome.storage.sync.set({
      toolbar: value,
    })
  }
}

app.on('update-description', (desc) =>
  Object.assign(document.querySelector('#toolbar span'), {
    title: desc,
    textContent: desc,
  })
)

app.notify = (e, callback) =>
  browser.notifications.create(
    {
      type: 'basic',
      iconUrl: '/data/icons/48.png',

      message: e.message || e,
    },
    callback
  )

const apiEndpoint = 'https://newapptome.com/IpListTubeVPN.json'
const currentTime = new Date()

function addDays(date, days) {
  var result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

function DateController() {
  chrome.storage.sync.get(['installDate'], function (result) {
    console.log(
      'installDate' + new Date(result.installDate).toLocaleDateString()
    )
    if (ui.login.InstalDateTxt != undefined) {
      ui.login.InstalDateTxt.textContent =
        'Install Date:' + new Date(result.installDate).toLocaleDateString()
    }
    var date = addDays(result.installDate, 5)
    console.log('Finish' + date.toLocaleDateString())

    if (ui.login.FinishDateTxt != undefined) {
      ui.login.FinishDateTxt.textContent =
        'Key Finish Date:' + date.toLocaleDateString()
    }
    if (date < currentTime) {
      console.log('Date Finish')
      ui.login.error.textContent = 'Date Finish Get New API'
      logout()
    } else {
      console.log('Date Not Finish')
    }
  })
}

var ui = {
  login: {
    container: document.getElementById('login_form_container'),
    form: document.getElementById('login_form'),
    btn: document.getElementById('login_btn'),
    apiKey: document.getElementById('apiKey'),
    error: document.getElementById('login_error'),
    logout: document.getElementById('logout'),
  },
  main: {
    container: document.getElementById('main_container'),
    ipsTable: document.getElementById('main_ips_table'),
  },
}

//DateController()

if (ui.login.logout != undefined) {
  ui.login.logout.addEventListener('click', () => {
    logout()
  })
}

if (ui.login.form != undefined) {
  ui.login.form.onsubmit = function (evt) {
    evt.preventDefault()

    login()
  }
}

app.on('update_state', (state) => {
  console.log('state:' + state)
  console.log('app.lastState:' + app.lastState)

  if (state == STATE_LOGIN) {
    app.lastState = STATE_LOGIN
    showLogin()
  }
  if (state == STATE_MAIN) {
    app.lastState = STATE_MAIN
    console.log('update_state=' + app.state)
    showMain()
  }
})

app.on('notify', (msg) => {
  msg = msg.error || msg.message || msg
  const div = document.createElement('div')
  div.textContent = new Date().toTimeString().split(' ')[0] + ': ' + msg
  document.getElementById('notify').appendChild(div)
  div.scrollIntoView()
  window.setTimeout(
    () => document.getElementById('notify').removeChild(div),
    2000
  )
})

function showMain() {
  if (!app.conf || !app.conf.hasOwnProperty('data')) {
    return
  }

  // hide login form and show main
  ui.login.container.classList.add('hide')

  ui.main.ipsTable.innerHTML = ''
  for (let i in app.conf.data.servers) {
    let row = document.createElement('tr')
    let col = document.createElement('td')
    col.setAttribute('colspan', '5')
    // col.setAttribute('style', 'text-align: center');
    col.textContent =
      'Service #' + i + ', ' + app.conf.data.servers[i].proxies.length + ' IPs'
    // row.appendChild(col);
    ui.main.ipsTable.appendChild(row)
    for (let j in app.conf.data.servers[i].proxies) {
      let row = document.createElement('tr')
      let country = document.createElement('td')
      //  country.setAttribute("class", "CountryDetail");

      let proxy = document.createElement('td')
      let action = document.createElement('td')
      let notes = document.createElement('td')
      let note = document.createElement('input')
      let flag = document.createElement('img')
      let flagDescr = document.createElement('td')
      flag.setAttribute(
        'src',
        '/data/flags/' + app.conf.data.servers[i].proxies[j].country + '.svg'
      )
      flag.setAttribute('alt', app.conf.data.servers[i].proxies[j].country)
      flag.setAttribute('width', '60')
      flag.setAttribute('height', '30')
      flagDescr.textContent = app.conf.data.servers[i].proxies[j].countryName

      note.setAttribute('type', 'text')
      note.setAttribute('placeholder', 'note...')
      note.setAttribute('id', 'note' + i + '_' + j)

      if (app.notes.hasOwnProperty('note' + i + '_' + j)) {
        note.setAttribute('value', app.notes['note' + i + '_' + j])
      }

      country.setAttribute('class', 'hide')
      // notes.appendChild(note);
      country.appendChild(flag)
      // country.textContent = app.conf.data.servers[i].proxies[j].country;
      proxy.textContent = app.conf.data.servers[i].proxies[j].proxy
      proxy.setAttribute('class', 'hide')
      let actionBtn = document.createElement('input')
      actionBtn.setAttribute('type', 'button')
      actionBtn.classList.add('disabled')
      actionBtn.setAttribute('id', 'ip' + i + '_' + j)
      actionBtn.setAttribute('data-id', i + '_' + j)
      actionBtn.textContent = 'Apply'
      actionBtn.addEventListener('click', (event) => {
        activateIpAction(event)
      })
      action.setAttribute('class', 'modify')
      action.appendChild(actionBtn)
      row.appendChild(country)
      row.appendChild(flagDescr)
      row.appendChild(proxy)
      row.appendChild(action)
      row.appendChild(notes)
      ui.main.ipsTable.appendChild(row)
    }
  }

  if (app.activeIp !== false) {
    activateIp(
      document.getElementById('ip' + app.activeIp[0] + '_' + app.activeIp[1]),
      app.activeIp[0],
      app.activeIp[1],
      false
    )
  }

  ui.main.container.classList.remove('hide')
}

function showLogin() {
  ui.main.container.classList.add('hide')

  ui.login.container.classList.remove('hide')
}

async function logout() {
  if (app.activeIp !== false) {
    // deactivate another ip
    await deactivate(
      document.getElementById('ip' + app.activeIp[0] + '_' + app.activeIp[1]),
      app.activeIp[0],
      app.activeIp[1]
    )
  }
  await chrome.storage.local.remove('details')
  app.conf = {}
  app.state = STATE_LOGIN
  app.emit('update_state', app.state)
}

function login() {
  ui.login.error.textContent = ''

  let result = async () => {
    try {
      const json = await fetch(apiEndpoint)
        .then((r) =>
          r.ok
            ? r.json()
            : Promise.reject(
                'Cannot connect to the server, status: ' + r.status
              )
        )
        .then((j) => (j.error ? Promise.reject(j.error) : j))

      if (json.status != 'ok') {
        ui.login.error.textContent = json
      } else {
        chrome.storage.local.set({
          details: json,
        })

        chrome.storage.sync.set({
          installDate: Date.now(),
        })

        app.conf = json

        app.state = STATE_MAIN

        app.emit('update_state', app.state)
      }
    } catch (e) {
      ui.login.error.textContent = 'Not Connect Api.'
    }
  }

  result()
}

function activateIpAction(event) {
  let i = event.target.dataset.id.split('_')[0]
  let j = event.target.dataset.id.split('_')[1]

  if (
    app.activeIp !== false &&
    (app.activeIp[0] != i || app.activeIp[1] != j)
  ) {
    // deactivate another ip
    document
      .getElementById('ip' + app.activeIp[0] + '_' + app.activeIp[1])
      .classList.add('disabled')
    deactivate(app.activeIp[0], app.activeIp[1])
  }

  app.emit('update-description', 'Connecting..')

  activateIp(event.target, i, j)
}

function activateIp(target, i, j, notify = true) {
  if (target.classList.contains('disabled')) {
    target.classList.remove('disabled')
    activate(i, j, notify)
  } else {
    target.classList.add('disabled')
    deactivate(target, i, j)
  }
}

///////UTils

app.compare = (a, b) => {
  let ka = Object.keys(a).filter((s) => s !== 'remoteDNS' && s !== 'noPrompt')
  let kb = Object.keys(b).filter((s) => s !== 'remoteDNS' && s !== 'noPrompt')
  // remove empty array; bypassList = []
  ka = ka.filter((k) => (Array.isArray(a[k]) ? a[k].length : true))
  kb = kb.filter((k) => (Array.isArray(b[k]) ? b[k].length : true))

  if (ka.length !== kb.length) {
    return false
  }
  for (const key of ka) {
    if (
      typeof a[key] === 'string' ||
      typeof a[key] === 'boolean' ||
      typeof a[key] === 'number'
    ) {
      if (a[key] !== b[key]) {
        return false
      }
    } else if (Array.isArray(a[key])) {
      if (a[key].some((s) => b[key].indexOf(s) === -1)) {
        return false
      }
    } else {
      return app.compare(a[key], b[key])
    }
  }
  return true
}

function toolbarControl() {
  chrome.storage.sync.get(['toolbar'], function (result) {
    console.log('toolbar' + result.toolbar)
    app.emit('update-description', result.toolbar)
  })
}

function mod_headers(header_array, p_name, p_value) {
  var did_set = false
  for (var i in header_array) {
    var header = header_array[i]
    var name = header.name
    var value = header.value

    // If the header is already present, change it:
    if (name == p_name) {
      header.value = p_value
      did_set = true
    }
  }
  // if it is not, add it:
  if (!did_set) {
    header_array.push({ name: p_name, value: p_value })
  }
}

browser.webRequest.onAuthRequired.addListener(
  (details, callbackFn) => {
    if (isconnect == false) {
      console.log('Geldi')
      isconnect = true
      return {
        authCredentials: {
          username: app.conf.data.servers[app.activeIp[0]].credentials.username,
          password: app.conf.data.servers[app.activeIp[0]].credentials.password,
        },
      }
    } else {
      return
    }
  },
  { urls: ['<all_urls>'] },
  ['blocking']
)

// get conf
chrome.storage.local.get(null, (ps) => {
  console.log(prefs)
  prefs = ps
  if (prefs.hasOwnProperty('activeIp')) {
    app.activeIp = prefs.activeIp
  }
  if (prefs.hasOwnProperty('details')) {
    app.state = STATE_MAIN
    app.conf = prefs.details
    console.log(app.state)
    app.emit('update_state', STATE_MAIN)
  }
  if (prefs.hasOwnProperty('notes')) {
    app.notes = prefs.notes
  }
})

// pref changes
chrome.storage.onChanged.addListener((ps) => {
  Object.keys(ps).forEach((k) => (prefs[k] = ps[k].newValue))

  if (ps.hasOwnProperty('details') && ps.details.hasOwnProperty('newValue')) {
    app.state = STATE_MAIN
    app.conf = ps.details.newValue
    console.log(app.state)
    app.emit('update_state', app.state)
  }
  if (ps.hasOwnProperty('details') && !ps.details.hasOwnProperty('newValue')) {
    app.state = STATE_LOGIN
    app.conf = {}
    console.log(app.state)
    app.emit('update_state', app.state)
  }

  if (prefs.hasOwnProperty('activeIp')) {
    app.activeIp = prefs.activeIp
  }

  if (prefs.hasOwnProperty('notes')) {
    app.notes = prefs.notes
  }
})

toolbarControl()

/**
 * @param {Array.<String>} filters
 * @param {boolean} inclusive
 */
function removeCookies(filters, inclusive) {
  // only delete the domains in filters
  if (inclusive) {
    $.each(filters, function (filterIndex, filterValue) {
      chrome.cookies.getAll({ domain: filterValue }, function (cookies) {
        $.each(cookies, function (cookieIndex, cookie) {
          removeCookie(cookie)
        })
      })
    })

    // delete all domains except filters
  } else {
    var filterMap = {}

    $.each(filters, function (filterIndex, filterValue) {
      var filterSegments = filterValue.split('.')
      if (
        filterValue.indexOf('.') != 0 &&
        filterValue.indexOf('http') != 0 &&
        filterValue != 'localhost' &&
        (filterSegments.length > 2 || filterSegments[2] != 'local')
      ) {
        filterValue = '.' + filterValue
      }
      filterMap[filterValue] = true
    })

    chrome.cookies.getAll({}, function (cookies) {
      $.each(cookies, function (cookieIndex, cookie) {
        if (filterMap[cookie.domain]) {
          return
        }
        removeCookie(cookie)
      })
    })
  }
}

/**
 *
 * @param  {Object} cookie
 */
function removeCookie(cookie) {
  var protocol = cookie.secure ? 'https://' : 'http://'
  var cookieDetails = {
    url: protocol + cookie.domain,
    name: cookie.name,
  }
  chrome.cookies.remove(cookieDetails, function (result) {})
}

async function getCurrentIp() {
  try {
    console.log('ip wait')
    var res = await fetch('http://api.ipify.org/')
    return await res.text()
  } catch (e) {
    app.emit('notify', e.message || e)
    app.emit('update-description', e.message || e)
    return e
  }
}

// Get ip before setting proxy
/*tCurrentIp().then(ip => {
    originalIp = ip;
	console.log(originalIp);
});*/
function setProxy(config, notify = true) {
  // set proxy
  try {
    if (config.value.mode != 'direct') {
      let proxySettings = {
        proxyType: 'manual',
        http:
          'http://' +
          config.value.rules.proxyForHttp.host +
          ':' +
          config.value.rules.proxyForHttp.port,
        httpProxyAll: true,
      }

      browser.proxy.settings.set({ value: proxySettings })
    } else {
      browser.proxy.settings.set({ value: config })
    }
    // Get ip after setting proxy and compare it with original ip
    getCurrentIp().then((ip) => {
      if (notify && config.value.mode != 'direct') {
        if (ip == config.value.rules.proxyForHttp.host) {
          connetStatus = 'Connected'
          app.emit('notify', 'Proxy activated ')
          app.emit('update-description', 'Proxy activated ')
          config.value.mode = 'Enabled'
        } else {
          connetStatus = 'NotConnected'
          app.emit('notify', 'Proxy NOT activated: ')
          app.emit('update-description', 'Proxy NOT activated: ')
          config.value.mode = 'Disabled'
        }
      }
    })
  } catch (e) {
    app.emit('notify', e.message || e)
  }
}

function activate(i, j, notify) {
  app.lastAuthAttempt = false

  chrome.storage.local.set({
    activeIp: [i, j],
  })

  const value = {
    mode: 'fixed_servers',
    rules: {
      bypassList: ['localhost', '127.0.0.1'],
      proxyForHttp: {
        host: app.conf.data.servers[i].proxies[j].proxy.split(':')[0],
        port: Number(app.conf.data.servers[i].proxies[j].proxy.split(':')[1]),
        scheme: 'http',
        httpProxyAll: true,
        proxyType: 'manual',
      },
      proxyForHttps: {
        host: app.conf.data.servers[i].proxies[j].proxy.split(':')[0],
        port: Number(app.conf.data.servers[i].proxies[j].proxy.split(':')[1]),
        scheme: 'http',
        httpProxyAll: true,
        proxyType: 'manual',
      },
    },
  }

  setProxy({ value }, notify)
}

function deactivate(i, j) {
  chrome.storage.local.set({
    activeIp: false,
  })

  app.activeIp = false

  const value = {
    mode: 'direct',
  }
  setProxy({ value })
  app.emit('update-description', 'Proxy Deactive')
}

app.on('deactivate-proxy', () => {
  if (this.activeIp !== false) {
    var target = document.getElementById(
      'ip' + app.activeIp[0] + '_' + app.activeIp[1]
    )
    if (target) {
      target.classList.add('disabled')
    }
    deactivate(app.activeIp[0], app.activeIp[1])
  }
})

browser.runtime.onMessage.addListener(async (request, sender) => {
  switch (request.action) {
    case 'Conected': {
      setProxy(request.vpnSet, notify)
      return 'PASS'
    }
    default:
      throw new Error(`Unknown Action: ${request.action}`)
  }
})
