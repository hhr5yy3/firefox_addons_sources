/* eslint-env node */
const path = require('path')

const fs = require('fs-extra')
const {convert} = require('convert-svg-to-png')

const assetsDir = path.resolve(__dirname, 'assets')
const svgPath = require.resolve('@jetbrains/logos/teamcity/teamcity.svg')
const maskSvgPath = require.resolve('@jetbrains/logos/teamcity/apple-mask-icon.svg')
const polyfillPath = require.resolve('webextension-polyfill/dist/browser-polyfill.js')
const variables = require('@jetbrains/ring-ui/extract-css-vars')

const copyToDir = (file, dir) => fs.copy(file, path.join(dir, path.basename(file)))

async function png(svg, destName, sizes, transform) {
  let source = await fs.readFile(svg, 'utf8')
  if (transform != null) {
    source = transform(source)
  }
  return Promise.all(
    sizes.map(async size => {
      const buffer = await convert(source, {
        width: size,
        height: size,
        puppeteer: {args: ['--no-sandbox']},
      })
      return fs.writeFile(path.join(assetsDir, `${destName}-${size}.png`), buffer)
    }),
  )
}

const compose = (...fns) => arg => fns.reduceRight((acc, fn) => fn(acc), arg)
const adjustViewBox = svg => svg.replace(/viewBox="0 0 16 16"/, 'viewBox="1 1 14 14"')
const adjustStatusIconSize = svg =>
  svg.replace(/width="16"/, 'width="192"').replace(/height="16"/, 'height="192"')
const setFill = color => svg => svg.replace(/^<svg/, `<svg fill="${color}"`)

async function copyPatchedSvg(src, transform) {
  const resolvedSrc = require.resolve(src)
  const source = await fs.readFile(resolvedSrc, 'utf8')
  const result = transform(source)
  return fs.writeFile(path.join(assetsDir, path.basename(resolvedSrc)), result)
}

const copyStatusIcon = (src, color) =>
  copyPatchedSvg(src, compose(setFill(color), adjustStatusIconSize))

async function run() {
  await fs.emptyDir(assetsDir)
  return Promise.all([
    copyToDir(svgPath, assetsDir),
    copyToDir(polyfillPath, assetsDir),
    copyStatusIcon('@jetbrains/icons/ok.svg', variables['--ring-icon-success-color']),
    copyStatusIcon('@jetbrains/icons/exception.svg', variables['--ring-icon-error-color']),
    copyStatusIcon('@jetbrains/icons/investigation.svg', variables['--ring-icon-error-color']),
    copyStatusIcon('@jetbrains/icons/warning.svg', variables['--ring-icon-warning-color']),
    copyStatusIcon('@jetbrains/icons/muted.svg', variables['--ring-icon-error-color']),
    png(svgPath, 'icon', [32, 48, 64, 96, 128, 300]),
    png(maskSvgPath, 'action-icon', [16, 24, 32], adjustViewBox),
    png(
      maskSvgPath,
      'action-icon-disabled',
      [16, 24, 32],
      compose(setFill(variables['--ring-icon-disabled-color']), adjustViewBox),
    ),
    png(
      maskSvgPath,
      'action-icon-dark',
      [16, 24, 32],
      compose(setFill(variables['--ring-dark-text-color']), adjustViewBox),
    ),
    png(
      maskSvgPath,
      'action-icon-dark-disabled',
      [16, 24, 32],
      compose(setFill(variables['--ring-dark-secondary-color']), adjustViewBox),
    ),
  ])
}

run()
