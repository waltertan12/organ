/* global KeyStore */

(function(root) {
  'use strict';

  if (typeof root.Track === "undefined") {
    root.Track = {};
  }

  var Track = root.Track = function (attributes) {
    this.id      = attributes.id       || -1;
    this.created = attributes.created  || "undefined";
    this.name    = attributes.name     || "";
    this.roll    = attributes.roll     || [];
  };

  Track.prototype.startRecording = function () {
    this.time = Date.now();
    this.roll = [];
  };

  Track.prototype.stopRecording = function () {
    this.roll.push({timeSlice: 0, notes: []});
  };

  Track.prototype.addNotes = function (notes) {
    this.roll.push({timeSlice: Date.now() - this.time, notes: notes});
  };

  Track.prototype.play = function () {
    var playBackStartTime = Date.now(),
        currentNote = 0;

    var playBack = setInterval(() => {
      if (currentNote < this.roll.length) {
        if (Date.now() - playBackStartTime >= this.roll[currentNote].timeSlice) {
          KeyActions.playbackUpdate(this.roll[currentNote].notes.slice());
          currentNote++;
        }
      } else {
        clearInterval(playBack);
      }
    }, 10);

  };
}(this));
