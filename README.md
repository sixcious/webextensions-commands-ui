**Note: This is still an experimental and unfinished component. Please do not use it yet.**

# web-extensions-commands-ui

*Note: The following information was accurate as of September 2018. Please look at the [MDN web docs Commands API](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/commands) for the most current information.*

This is a small component that can be used by Web Extensions authors to provide an intuitive UI for users to configure commands (keyboard shortcuts).
Firefox does not currently offer a built-in UI for configuring commands like Chrome does. Firefox currently expects users to type out the commands letter by letter, which is not ideal.
This simulates the Chrome UI behavior by translating [KeyboardEvent.code](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code) input to [Web Extensions Commands](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/commands).

### TODO
Clean up and finalize JS and fully implement both Photon and Material UI look and feels in the CSS. Fully test demo.

### Installation
First, make sure you have your commands defined in manifest.json. [See here for instructions](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/commands).
*Note: Do not define `suggested_key`s in your `commands`. See the **Clearing Commands** section for why.

1. Copy `web-extensions-commands-ui.js` and `web-extensions-commands-ui.css` from the `src` directory to your extension's source directory.
2. Include the above-mentioned CSS and JS in your `options.html`.
3. Include the following HTML `div` in your `options.html`: `<div id="web-extensions-commands-ui"></div>`
4. In `web-extensions-commands-ui.js`, change the reset icon path and other configurable properties at the top.

Done! :)

### Demo
The `src` directory contains a demo extension you can install as a temporary add-on in Firefox.
The demo changes the extension's toolbar icon when you issue a command.

### Clearing Commands
Firefox does not currently have a way to clear a command. Instead, they offer an API to `reset` a command back to its default `suggested_key` in the manifest.json.

There is a workaround to this: if you don't put in a `suggested_key` and a reset is performed, the command is cleared.
**So, in order to allow users to clear commands, you should never specify a `suggested_key`**

In other words, do **not** define commands like this:

    "commands": { "increment": { "suggested_key": { "default": "Ctrl+Shift+Up"}, "description": "Increment [+]" }}

Instead, define them like this:

    "commands": { "increment": { "description": "Increment [+]" }}

### Collisions with other Extensions' Commands
TODO