import React, { Component } from 'react';
import AllTagsContainer from '../containers/AllTagsContainer';

class App extends Component {
  render() {
    return (
      <div className="app-container cover">
        <AllTagsContainer />
      </div>
    );
  }
}

export default App;