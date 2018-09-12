# WebExtensions Commands UI
This is a small component that can be used by WebExtension developers to provide users with a UI to configure commands (keyboard shortcuts).
It works by translating [KeyboardEvent.code](https://developer.mozilla.org/docs/Web/API/KeyboardEvent/code) input into [WebExtensions Commands](https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/API/commands) strings.

## Styles
There are three types of UI styles you can choose from:

1. `paper` based on [Material-UI Paper](https://material-ui.com/demos/text-fields/) and Chrome Pre-69
2. `material` based on [Material Design](https://material.io/design/components/text-fields.html) and Chrome 69+
3. `photon` based on [Photon Design](https://design.firefox.com/photon/components/input-fields.html) and Firefox

## Installation
1. [Define the commands in your manifest.json](https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/manifest.json/commands) (but don't define a `suggested_key`)
2. Copy 3 files: `webextensions-commands-ui.css`, `webextensions-commands-ui.js`, and one of the `webextensions-commands-ui-reset-{style}.png`s from this repo's `src` directory.
3. In your `options.html`, include links to the CSS in the head and the JS in the body, and add the following HTML in the body:
`<div id="webextensions-commands-ui" class="paper"></div>` (Change the class to either `paper`, `material`, or `photon` for the style you want)

*Optional: In the CSS file, you may want to change the `reset` url path variables, adjust the colors/styles, or in the JS file, change the `I18N`.*

## Demo
The `src` directory contains a demo extension you can install as a temporary add-on in Firefox or load unpacked in Chrome.
The demo lets you issue commands to change the UI design and get a feel for how it works.

## Supported Keys
Shortcuts must match this [list of supported key combinations](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/commands#Shortcut_values).

## Clearing Commands
Currently (as of September 2018), Firefox does not offer a way to `clear` a command. Instead, they offer an API to `reset` a command back to its default `suggested_key` in the `manifest.json`.
But there is a workaround to this! If you don't put in a `suggested_key` and a reset is performed, the command is cleared.
So, in order to allow users to clear commands, just don't enter a `suggested_key`.

## Command Collisions
If the user enters a shortcut for a command that already exists, the component will gracefully handle collisions within your extension by clearing the old command's shortcut.
Commands from other extensions can't be accessed, so unfortunately collisions can't be handled in those cases. 

## Untested or Unimplemented
1. Mac is untested (`Command` and `MacCtrl` keys)
2. Media Keys are untested, but the code is in place and should work
3. Numpad is unimplemented (Chromium seems to always default to using Home/End/Page instead of number keys even if Num Lock is on)