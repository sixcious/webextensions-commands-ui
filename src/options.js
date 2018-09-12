// Chrome: Compatibility to recognize browser namespace
if (typeof browser === "undefined") {
  browser = chrome;
}

// Change the UI style to what's currently set in storage
browser.storage.local.get(null, function(items) {
  document.getElementById("web-extensions-commands-ui").className = items.style;
  document.getElementById("style").textContent = items.style[0].toUpperCase() + items.style.substring(1) + " Style";
});