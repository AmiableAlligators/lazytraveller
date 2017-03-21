import React from 'react';
import ActivityView from './ActivityView.jsx'
import Data from '../../../data/sampleData.js'

export default class ShortlistView extends React.Component {
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
        <h1>ShortList</h1>
        {
          this.props.data &&
          this.props.data.map(item => (
            <ActivityView
              key= { item.id }
              activity={ item }
              handleClick={ this.handleClick } />
          ))
        }
      </div>
    )
  }
}
