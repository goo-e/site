import React, { Component } from "react";

class SavePrefs extends Component {
  render() {
    return (
      <div>
        <button 
          onClick={this.props.onClick}
          class='save-prefs'
        >
          SAVE CHANGES
        </button>
      </div>
    );
  }
}

export default SavePrefs;
