(function (root) {
  'use strict';
  if (typeof root.RecordingIndexItem === "undefined") {
    root.RecordingIndexItem = {};
  }

  root.RecordingIndexItem = React.createClass({
    loadTrack: function (e) {
      e.preventDefault();
      console.log("this.props.track");
      console.log(this.props.track);
      TrackActions.storeCurrentTrack(this.props.track);
    },

    render: function () {
      var track = this.props.track;

      return (
        <li onClick={this.loadTrack} className="recording-index-item">
          {track.name}
          <em> created {track.created} ago</em>
        </li>
      );
    }
  });
})(this);