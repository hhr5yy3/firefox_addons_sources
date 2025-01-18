const path = require('path')

const fs = require('fs-extra')
const tsm = require('teamcity-service-messages')

const packagePath = path.resolve(__dirname, '../package.json')
const manifestPath = path.resolve(__dirname, '../manifest.json')

async function updateVersion() {
  try {
    const {version} = await fs.readJson(packagePath)
    tsm.buildNumber(version)
    const manifest = await fs.readJson(manifestPath)
    await fs.writeJson(manifestPath, {...manifest, version}, {spaces: 2})
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
    process.exit(1)
  }
}
updateVersion()
