(function (root) {
  'use strict';
  if (typeof root.SaveModal === "undefined") {
    root.SaveModal = {};
  }

  root.SaveModal = React.createClass({
    getInitialState: function () {
      return { name: "" };
    },

    handleTrackName: function (e) {
      e.preventDefault();
      this.setState({name: e.target.value });
    },

    save: function (e) {
      e.preventDefault();
      // Validation
      var name = this.state.name,
          track = TrackStore.currentTrack();
      if (name.length === 0) {
        console.log("nononono name");
      } else if (!track || track.roll.length < 2) {
        console.log("nononono sounds");
      } else {
        var trackObject = {
          name: name,
          roll: JSON.stringify(track.roll)
        }
        TrackActions.saveTrack(trackObject);
        this.setState({name: ""});
        this.close(e);
      }
    },

    close: function (e) {
      e.preventDefault();
      var modal = document.getElementById("modal");
      modal.classList.remove("active");
    },

    render: function () {
      return (
        <div id="modal" className="save-modal ">
          <h3>Save Your Masterpiece</h3>
          <form>
            <label>Track Name</label><br/>
            <input className="form-control" 
                   type="text"
                   onChange={this.handleTrackName}/>
            <br/>
            <input className="btn btn-success"
                   onClick={this.save} 
                   type="submit" value="Save" />
            <button className="btn btn-danger" onClick={this.close}>
              Close
            </button>
            <br/>
          </form>
        </div>
      );
    }
  });
})(this);