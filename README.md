# web-extensions-commands-ui


![URL Incrementer](screenshot.png?raw=true "Example")

**Important: This is still unfinished! It is currently functional however.**

This is a component that can be used by WebExtensions authors to provide a UI in their Options for users to configure commands (keyboard shortcuts).
Firefox does not currently offer a built-in UI for configuring commands like Chrome does.
It works by translating [KeyboardEvent.code](https://developer.mozilla.org/docs/Web/API/KeyboardEvent/code) input to [WebExtensions Commands](https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/API/commands) strings.

*Note: This was written in September 2018. Please look at the [MDN Commands API](https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/API/commands) for the most current information.*

### TODO
1. Clean up and finalize JS (fix bugs, implement media keys support, test MAC/meta key modifier?, detect command collisions?)
2. Implement Photon and Material UI styles/icons in CSS.

### Installation
1. [Define the commands in your manifest.json](https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/manifest.json/commands). *Note: Do not define `suggested_key`s in your `commands`.
2. Copy `web-extensions-commands-ui.js` and `web-extensions-commands-ui.css` from this repo's `src` directory to your extension's source directory.
3. In your `options.html`, include the CSS in the head and the JS in the body, and add the following HTML in the body: `<div id="web-extensions-commands-ui"></div>`
4. In `web-extensions-commands-ui.js`, adjust the `I18N` messages (optional) and adjust the `RESET_INPUT_IMG_PATH`  to the reset img.

### Demo
The `src` directory contains a demo extension you can install as a temporary add-on in Firefox.
The demo changes the extension's toolbar icon when you issue a command.

### Clearing Commands
Firefox does not currently have a way to clear a command. Instead, they offer an API to `reset` a command back to its default `suggested_key` in the `manifest.json`.

There is a workaround to this: if you don't put in a `suggested_key` and a reset is performed, the command is cleared.
So, in order to allow users to clear commands, you should never specify a `suggested_key`.

In other words, do **not** define commands like this:

    "commands": { "jump": { "description": "Jump", "suggested_key": { "default": "Ctrl+Shift+Up"} }}

Instead, define them like this:

    "commands": { "jump": { "description": "Jump" }}

### Collisions with other Extensions' Commands
TODO