/**
 * Listen for commands (Browser Extension shortcuts) and perform the command's action.
 *
 * @param command the shortcut command that was performed
 * @public
 */
function commandListener(command) {
  console.log ("WebExtensionsCommandsUIDemo - command=" + command);
  browser.browserAction.setIcon({ "path": { "16": "/img/" + command + "/16.png"}});
}

/**
 * Listen for installation changes and do initialization work.
 *
 * @param details the installation details
 * @public
 */
function installedListener(details) {
  if (details.reason === "install") {
    console.log("WebExtensionsCommandsUIDemo - details=" + details);
    browser.runtime.openOptionsPage();
  }
}

// Chrome: Compatibility to recognize browser namespace
if (typeof browser === "undefined") {
  browser = chrome;
}

// Installed Listener
browser.runtime.onInstalled.addListener(installedListener);

// Firefox Android: browser.commands is currently unsupported
if (browser.commands && browser.commands.onCommand) {
  browser.commands.onCommand.addListener(commandListener);
}