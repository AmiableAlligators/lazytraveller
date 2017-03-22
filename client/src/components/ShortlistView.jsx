import React from 'react';
import ActivityView from './ActivityView.jsx'

export default class ShortlistView extends React.Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(isLike, activityId) {
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
              key= { Math.random() }
              activity={ item }
              handleClick={ this.handleClick } />
          ))
        }
      </div>
    )
  }
}
