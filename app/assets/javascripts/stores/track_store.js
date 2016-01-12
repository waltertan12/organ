/* global EventEmitter */
/* global AppDispatcher */

(function(root) {
  'use strict';

  var _tracks = [];
  var _currentTrack = new Track({});

  const CHANGE_EVENT = "CHANGE_EVENT";

  root.TrackStore = $.extend({}, EventEmitter.prototype, {
    all: function () {
      return _tracks.slice();
    },

    currentTrack: function () {
      return _currentTrack;
    },

    storeCurrentTrack: function (track) {
      _currentTrack = track;
    },

    fetchAllTracks: function (tracks) {
      _tracks = tracks.slice();
    },

    addTrack: function (track) {
      _tracks.push(track);
    },

    addChangeListener: function (callback) {
      this.on(CHANGE_EVENT, callback)
    },

    removeChangeListener: function (callback) {
      this.removeListener(CHANGE_EVENT, callback)
    },

    dispatcherID: AppDispatcher.register(function(payload) {
      switch(payload.actionType) {
        case "SET_TRACK":
          TrackStore.storeCurrentTrack(payload.track);
          TrackStore.emit(CHANGE_EVENT);
          break;
        case "FETCH_TRACKS":
          TrackStore.fetchAllTracks(payload.tracks);
          TrackStore.emit(CHANGE_EVENT);
          break;
        case "SAVE_TRACK":
          TrackStore.addTrack(payload.track);
          TrackStore.emit(CHANGE_EVENT);
          break;
        case "STORE_TRACK":
          TrackStore.storeCurrentTrack(payload.track);
          TrackStore.emit(CHANGE_EVENT);
          break;
      }
    })
  });
}(this));
