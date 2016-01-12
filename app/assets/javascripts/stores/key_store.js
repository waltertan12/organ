/* global EventEmitter */
/* global AppDispatcher */

(function(root) {
  'use strict';

  var _keys = [];

  root.KeyStore = $.extend({}, EventEmitter.prototype, {
    all: function () {
      return _keys.slice();
    },

    addKey: function (key) {
      _keys.push(key);
      this.changed();
    },

    removeKey: function (key) {
      var idx = _keys.indexOf(key);

      if (idx !== -1) {
        _keys.splice(idx, 1);
        this.changed();
      }
    },

    changed: function () {
      this.emit("CHANGE");
    },

    replace: function (newNotes) {
      _keys = newNotes;
      this.changed();
    },

    addChangeHandler: function (noteName, handler) {
      this.on(noteName, handler);
    },

    noteInStore: function (noteName) {
      var idx = _keys.indexOf(noteName);

      return idx !== -1;
    }
  });

  AppDispatcher.register(function(action) {
    switch(action.actionType) {
      case "KEY_PRESS":
        root.KeyStore.addKey(action.noteName);
        break;
      case "KEY_RELEASE":
        root.KeyStore.removeKey(action.noteName);
        break;
      case "KEY_PRESSES":
        root.KeyStore.replace(action.notes);
        break;
    }
  });
}(this));
