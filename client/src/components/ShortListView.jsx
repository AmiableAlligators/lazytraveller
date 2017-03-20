import React from 'react';
import ActivityView from './ActivityView.jsx'
import Data from '../../../data/sampleData.js'

export default class ShortListView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      current: Data.results.locations.shift(),
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(isLike, activityId) {
    var end = this.state.current ? false : true;
    // Need to build a service founction somewhere, then:
    // POST activityId & isLike & end to server
  }

  

  render() {
    return (
      <div>
        <ActivityView
          activity={ this.state.current }
          handleClick={ this.handleClick } />
      </div>
    )
  }
}