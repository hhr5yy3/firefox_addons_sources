const { defineConfig } = require("cypress");
const execa = require("execa")
const findBrowser = () => {
  // the path is hard-coded for simplicity
  const browserPath =
    "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser"

  return execa(browserPath, ["--version"]).then((result) => {
    // STDOUT will be like "Brave Browser 77.0.69.135"
    const [, version] = /Brave Browser (\d+\.\d+\.\d+\.\d+)/.exec(result.stdout)
    const majorVersion = parseInt(version.split(".")[0])

    return {
      name: "brave",
      channel: "stable",
      family: "chromium",
      displayName: "Brave",
      version,
      path: browserPath,
      majorVersion,
    }
  })
}

module.exports = defineConfig({
  numTestsKeptInMemory: 1,
  e2e: {
    setupNodeEvents(on, config) {

      on("before:browser:launch", (_browser, launchOptions) => {
        launchOptions.extensions.push(config.projectRoot);

        return launchOptions;
      })

      return findBrowser().then(browser => {
        return {
          browsers: config.browsers.concat(browser)
        };
      });
    },
  },
});
