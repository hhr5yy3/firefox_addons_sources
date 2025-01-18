# `wext-options`

 – A unified options panel for WebExtensions

![Smart Referer options panel Screenshot](screenshots/smart-referer.jpeg)

A tiny framework that aims to serve as an easy-to-use replacement for the `options.xul` file in
Bootstrapped Add-ons and the `simple-prefs` mechanism in JetPack Add-ons.

Main goals include:

  * Lightweight
     - Less than 50kB to ship
  * Ease of use
     - [Check out the example](https://gitlab.com/ntninja/wext-options/-/tree/master/example)!
  * Native Look and Feel
     - Make options pages look like a natural extension of the built-in add-on preferences
     - Fully compatible with the `browser-style` manifest directive
  * Fully stateless
     - All state is managed through the `browser.storage.local` API
  * Fully reactive
     - Any state changes in the extension's storage will immediately be visible
  * Extensible
     - Need more advanced widgets? Use the API to react to state changes and render important parts of the UI yourself

## Quick Start

The [example](https://gitlab.com/ntninja/wext-options/-/tree/master/example) also has instructions on how to quickly get going.

## Real-world examples

 * [Smart Referer](https://addons.mozilla.org/firefox/addon/smart-referer/) ([Code](https://gitlab.com/smart-referer/smart-referer/-/tree/master/content))
 * [User Agent Switcher](https://addons.mozilla.org/firefox/addon/uaswitcher/) ([Code](https://gitlab.com/ntninja/user-agent-switcher/-/tree/master/ui/options))
