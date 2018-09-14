// Chrome: Compatibility to recognize browser namespace
if (typeof browser === "undefined") {
  browser = chrome;
}

// Change the UI style to what's currently set in storage
browser.storage.local.get(null, function(items) {
  document.getElementById("wecui").className = items.style;
  document.getElementById("style").textContent = items.style[0].toUpperCase() + items.style.substring(1) + " Style";
});

// Reload Options Page after the command listener's message has been received
browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.greeting === "reloadOptionsPage") {
    window.location.reload();
  }
});