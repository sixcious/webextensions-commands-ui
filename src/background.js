// Chrome: Compatibility to recognize browser namespace
if (typeof browser === "undefined") {
  browser = chrome;
}

// Installed Listener
browser.runtime.onInstalled.addListener(function(details) {
  if (details.reason === "install" || details.reason === "update") {
    browser.storage.local.set({"style": "photon"}, function() {
      browser.runtime.openOptionsPage();
    });
  }
});

// Command Listener (Firefox Android: browser.commands is currently unsupported)
if (browser.commands && browser.commands.onCommand) {
  browser.commands.onCommand.addListener(function(command) {
    browser.storage.local.set({"style": command}, function() {
      browser.runtime.sendMessage({greeting: "reloadOptionsPage"});
    });
  });
}

// Clicked Listener
browser.browserAction.onClicked.addListener(function(tab) {
  browser.runtime.openOptionsPage();
});