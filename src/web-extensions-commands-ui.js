/**
 * Web Extensions Commands UI
 * @file web-extensions-commands-ui.js
 * @author Roy Six
 * @license TBD
 */

var WebExtensionsCommandsUI = function () {

  const I18N = {
      "commandActivate":     "Activate the extension",
      "typeShortcut":        "Type a shortcut",
      "errorIncludeCtrlAlt": "Include either Ctrl or Alt",
      "errorUseCtrlAlt":     "Use either Ctrl or Alt",
      "errorTypeLetter":     "Type a letter"
    },
    RESET_INPUT_IMG_PATH = "img/material/baseline_cancel_black_18dp.png",
    DOM_ID = "web-extensions-commands-ui",
    DOM = {},
    KEYBOARDEVENT_CODE_TO_COMMAND_KEYS = new Map([
      ["Digit0","0"],["Digit1","1"],["Digit2","2"],["Digit3","3"],["Digit4","4"],["Digit5","5"],["Digit6","6"],["Digit7","7"],["Digit8","8"],["Digit9","9"],
      ["KeyA","A"],["KeyB","B"],["KeyC","C"],["KeyD","D"],["KeyE","E"],["KeyF","F"],["KeyG","G"],["KeyH","H"],["KeyI","I"],["KeyJ","J"],["KeyK","K"],["KeyL","L"],["KeyM","M"],
      ["KeyN","N"],["KeyO","O"],["KeyP","P"],["KeyQ","Q"],["KeyR","R"],["KeyS","S"],["KeyT","T"],["KeyU","U"],["KeyV","V"],["KeyW","W"],["KeyX","X"],["KeyY","Y"],["KeyZ","Z"],
      ["F1","F1"],["F2","F2"],["F3","F3"],["F4","F4"],["F5","F5"],["F6","F6"],["F7","F7"],["F8","F8"],["F9","F9"],["F10","F10"],["F11","F11"],["F12","F12"],
      ["Comma","Comma"],["Period","Period"],["Home","Home"],["End","End"],["PageUp","PageUp"],["PageDown","PageDown"],["Space","Space"],["Insert","Insert"],["Delete","Delete"],
      ["ArrowUp", "Up"],["ArrowDown", "Down"],["ArrowLeft", "Left"],["ArrowRight", "Right"],
      ["MediaTrackNext", "MediaNextTrack"],["MediaTrackPrevious", "MediaPrevTrack"],["MediaPlayPause", "MediaPlayPause"],["MediaStop", "MediaStop"]
    ]);

  let key = { "modifiers": {}, "code": "" }, // Reusable key to stores the key's event modifiers and code
   allowed = false,
   error = "";

  /**
   * Loads the DOM content needed to display the options page.
   *
   * DOMContentLoaded will fire when the DOM is loaded. Unlike the conventional
   * "load", it does not wait for images and media.
   *
   * @public
   */
  function DOMContentLoaded() {
    DOM["#" + DOM_ID] = document.getElementById(DOM_ID);
    browser.commands.getAll(commands => {
      console.log(commands);
      generateHTML(commands);
      cacheDOM();
      addEventListeners(commands);
    });
  }

  /**
   * Generates the commands table HTML.
   *
   * @param commands the commands
   * @private
   */
  function generateHTML(commands) {
    const table = document.createElement("div");
    table.className = "table";
    for (const command of commands) {
      const row = document.createElement("div");
      row.className = "row";
      table.appendChild(row);
      const column1 = document.createElement("div");
      column1.className = "column";
      row.appendChild(column1);
      const label = document.createElement("label");
      label.id = DOM_ID + "-label-" + command.name;
      label.className = DOM_ID + "-label";
      label.textContent = (command.name === "_execute_browser_action" || !command.description) ? I18N.commandActivate : command.description;
      column1.appendChild(label);
      const column2 = document.createElement("div");
      column2.className = "column";
      row.appendChild(column2);
      const input = document.createElement("input");
      input.id = DOM_ID + "-input-" + command.name;
      input.className = DOM_ID + "-input";
      input.type = "text";
      input.value = command.shortcut ? command.shortcut : "";
      input.placeholder = "";
      input.dataset.name = command.name;
      input.dataset.shortcut = command.shortcut;
      column2.appendChild(input);
      const underline = document.createElement("div");
      underline.id = DOM_ID + "-underline-" + command.name;
      underline.className = DOM_ID + "-underline";
      column2.appendChild(underline);
      const error = document.createElement("div");
      error.id = DOM_ID + "-error-" + command.name;
      error.className = DOM_ID + "-error";
      column2.appendChild(error);
      const reset = document.createElement("input");
      reset.id = DOM_ID + "-reset-" + command.name;
      reset.className = DOM_ID + "-reset";
      reset.type = "image";
      reset.src = RESET_INPUT_IMG_PATH;
      reset.alt = "reset";
      reset.width = "16";
      reset.height = "16";
      reset.dataset.name = command.name;
      column2.appendChild(reset);
    }
    DOM["#" + DOM_ID].appendChild(table);
  }

  /**
   * Caches the DOM elements that have IDs to avoid using document query selectors.
   *
   * @private
   */
  function cacheDOM() {
    const elements = document.querySelectorAll("#" + DOM_ID + " [id]");
    for (let element of elements) {
      DOM["#" + element.id] = element;
    }
  }

  /**
   * Adds event listeners to the command inputs.
   *
   * @param commands the commands
   * @private
   */
  function addEventListeners(commands) {
    for (const command of commands) {
      DOM["#" + DOM_ID + "-input-" + command.name].addEventListener("focus", focus);
      DOM["#" + DOM_ID + "-input-" + command.name].addEventListener("blur", blur);
      DOM["#" + DOM_ID + "-input-" + command.name].addEventListener("keydown", keydown);
      DOM["#" + DOM_ID + "-input-" + command.name].addEventListener("keyup", keyup);
      DOM["#" + DOM_ID + "-reset-" + command.name].addEventListener("click", reset);
    }
  }

  function focus() {
    this.value = "";
    this.placeholder = I18N.typeShortcut;
    error = "";
    key = { "modifiers": {}, "code": "" };
    updateError(this);
  }

  function blur() {
    this.value = this.dataset.shortcut;
    this.placeholder = "";
    error = "";
    key = { "modifiers": {}, "code": "" };
    updateError(this);
  }

  function keydown(event) {
    event.preventDefault();
    setKey(event);
    writeInput(this, key);
    updateError(this);
  }

  function keyup(event) {
    if (!allowed) {
      this.value = "";
      error = "";
      updateError(this);
      return;
    }
    console.log("keyup!" + key + ", " + this.dataset.name + ", " + this.value);
    if (browser.commands.update) {
      browser.commands.update({
        name: this.dataset.name,
        shortcut: this.value
      });
    }
    this.dataset.shortcut = this.value;
    this.blur();
  }

  function reset() {
    console.log("reset clicked! for " + this.dataset.name);
    if (browser.commands.reset) {
      browser.commands.reset(this.dataset.name);
    }
    DOM["#" + DOM_ID + "-input-" + this.dataset.name].value = "";
  }

  /**
   * Sets the key that was pressed on a keydown event. This is needed afterwards
   * to write the key to the input value and save the key to storage on keyup.
   *
   * @param event the key event fired
   * @private
   */
  function setKey(event) {
    error = "";
    key = { "modifiers": {}, "code": "" };

    const modifiers = { "altKey": event.altKey, "ctrlKey": event.ctrlKey, "shiftKey": event.shiftKey, "metaKey": event.metaKey };
    const code = KEYBOARDEVENT_CODE_TO_COMMAND_KEYS.get(event.code);

    // Allowed modifier combinations: Alt, Ctrl, Alt+Shift, Ctrl+Shift
    if (!modifiers.altKey && !modifiers.ctrlKey) {
      error = I18N.errorIncludeCtrlAlt;
      return;
    } else if (modifiers.altKey && modifiers.ctrlKey) {
      error = I18N.errorUseCtrlAlt;
      return;
    } else if (!code) {
      error = I18N.errorTypeLetter;
    }

    allowed = !error;
    key = { "modifiers": modifiers, "code": code };
  }

  /**
   * Writes the key(s) that were pressed to the text input.
   *
   * @param input the input to write to
   * @param key the key object to write
   * @private
   */
  function writeInput(input, key) {
    // Write the input value based on the key event modifier bits and key code
    // Note1: KeyboardEvent.code will output the text-representation of the key code, e.g.  the key "A" would output "KeyA"
    // Note2: If the key code is in the KEY_MODIFIER_CODE_ARRAY (e.g. Alt, Ctrl), it is not written a second time
    let text = "";
    if (!key) { text = browser.i18n.getMessage("key_notset_option"); }
    else {
      if (key.modifiers.altKey)   { text += "Alt+";   }
      if (key.modifiers.ctrlKey)  { text += "Ctrl+";  }
      if (key.modifiers.shiftKey) { text += "Shift+"; }
    //if (key.modifiers.metaKey)  { text += "Meta+";  }
      if (key.code /*&& !KEY_MODIFIER_CODE_ARRAY.includes(key.code)*/) { text += key.code; }
    }
    input.value = text;
  }

  function updateError(that) {
    if (error) {
      DOM["#" + DOM_ID + "-underline-" + that.dataset.name].classList.add("error");
      DOM["#" + DOM_ID + "-error-" + that.dataset.name].textContent = error;
    } else {
      DOM["#" + DOM_ID + "-underline-" + that.dataset.name].classList.remove("error");
      DOM["#" + DOM_ID + "-error-" + that.dataset.name].textContent = "";
    }
  }

  // Return Public Functions
  return {
    DOMContentLoaded: DOMContentLoaded
  };
}();

// Chrome: Compatibility to recognize browser namespace
if (typeof browser === "undefined") {
  browser = chrome;
}

// Firefox Android: browser.commands is currently unsupported
if (typeof browser !== "undefined" && browser.commands) {
  document.addEventListener("DOMContentLoaded", WebExtensionsCommandsUI.DOMContentLoaded);
}