const path = require('path')

const fs = require('fs-extra')
const {Webstore, TokenManager} = require('@hypnosphi/chrome-store-api')
require('dotenv').config()

const {version} = require('../manifest.json')

const tokens = {
  [process.env.CHROME_APP_CODE]: {
    access_token: process.env.CHROME_ACCESS_TOKEN,
    refresh_token: process.env.CHROME_REFRESH_TOKEN,
  },
}

const storage = {
  get: async code => tokens[code],
  async set(code, access_token, refresh_token) {
    tokens[code] = {access_token, refresh_token}
  },
}
const tokenManager = new TokenManager(
  process.env.CHROME_APP_CODE,
  process.env.CHROME_CLIENT_ID,
  process.env.CHROME_CLIENT_SECRET,
  storage,
)
const api = new Webstore(tokenManager)

const extId = process.env.CHROME_EXT_ID
async function publish() {
  try {
    const blob = await fs.readFile(
      path.resolve(__dirname, `../web-ext-artifacts/teamcity_notifier-${version}.zip`),
    )
    await api.update(extId, blob)
    await api.publish(extId)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
    process.exit(1)
  }
}
publish()
