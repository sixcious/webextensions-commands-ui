# web-extensions-commands-ui
This is a component that can be used by WebExtension developers to provide their users with a UI to configure commands (keyboard shortcuts) in their Options Page.
It works by translating [KeyboardEvent.code](https://developer.mozilla.org/docs/Web/API/KeyboardEvent/code) input into [WebExtensions Commands](https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/API/commands) strings.

### Styles
There are three types of UI styles you can choose from:

1. [Material-UI Paper](https://material-ui.com/demos/text-fields/) (e.g. Chrome Pre-69)
2. [Material Design](https://material.io/design/components/text-fields.html) (e.g. Chrome 69+)
3. Photon - Coming Soon (Maybe!)

### Installation
1. [Define the commands in your manifest.json](https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/manifest.json/commands). *Note: Do not define `suggested_key`s in your `commands`.
2. Copy `web-extensions-commands-ui.js` and `web-extensions-commands-ui.css` from this repo's `src` directory to your extension's source directory.
3. In your `options.html`, include the CSS in the head and the JS in the body, and add the following HTML in the body:
`<div id="web-extensions-commands-ui" class="paper"></div>` (Change the class to either `paper`, `material`, or `photon` for the style you want)
4. In `web-extensions-commands-ui.js`, adjust the `RESET_INPUT_IMG_PATH` to the reset img and optionally adjust the `I18N` messages (e.g. if your extension supports multiple locales, you can use `browser.i18n.getMessage()`) 

### Demo
The `src` directory contains a demo extension you can install as a temporary add-on in Firefox.
The demo lets you issue commands to change the UI design and get a feel for how it works before deciding to add it into your extension.

### Clearing Commands
Currently (as of September 2018), Firefox does not offer a way to `clear` a command. Instead, they offer an API to `reset` a command back to its default `suggested_key` in the `manifest.json`.
There is a workaround to this: if you don't put in a `suggested_key` and a reset is performed, the command is cleared.
So, in order to allow users to clear commands, you should never specify a `suggested_key`.

### Command Collisions
TODO

### TODO
1. Clean up and finalize JS (fix bugs, implement media keys support, test MAC/meta key modifier?, add numpad support?, detect command collisions?)
2. Add Material UI Paper, Material Design, and Photon icons and styles in CSS.