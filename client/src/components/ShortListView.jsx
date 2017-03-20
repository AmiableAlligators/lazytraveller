import React from 'react';
import ActivityView from './ActivityView.jsx'

export default class ShortListView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      current: this.props.shortList.shift(),
    };
  }

  decide(isLike, activityId) {
    var end = this.state.current ? false : true;
    // Need to build a service founction somewhere, then:
    // POST activityId & isLike & end to server
  }

  render() {
    return (
      <div>
        <ActivityView
          activity={ this.state.current }
          handleLikeClick={ this.decide.bind(this) } />
      </div>
    )
  }
}