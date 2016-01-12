/* global React, Note, KeyStore */

(function(root) {
  'use strict';

  if (typeof root.Key === "undefined") {
    root.Key = {};
  }

  var Key = root.Key = React.createClass({
    getInitialState: function() {
      return {
        pressed: false
      };
    },
    componentDidMount: function() {
      var freq = window.UPPER_TONES[this.props.noteName];
      if(!freq) freq = window.LOWER_TONES[this.props.noteName];
      this.note = new Note(freq);
      KeyStore.addChangeHandler("CHANGE", this.handleKeyPress);
    },
    handleKeyPress: function () {
      if (KeyStore.noteInStore(this.props.noteName)) {
            this.note.start();
            this.setState({pressed: true});
      } else if (!KeyStore.noteInStore(this.props.noteName) &&
                 this.state.pressed){
        this.setState({pressed: false});
        this.note.stop();
      }
    },

    render: function () {
      if (this.props.noteName.indexOf("#") !== -1) {
        var black = "black ";
      } else {
        var black = "";
      }

      return (
        <div className={"key " + black + this.state.pressed.toString()}>
          <p>{this.props.noteName}</p></div>
      );
    }
  });
}(this));
