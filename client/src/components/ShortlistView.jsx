import React from 'react';
import $ from 'jquery';
import ActivityView from './ActivityView.jsx'

export default class ShortlistView extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="sixteen wide column">
        <h1>ShortList</h1>
        Shortlisted { this.props.shortlisted && this.props.shortlisted.length } activities.
        {
          this.props.currentActivity &&
          <ActivityView
            key={ this.props.currentActivity._id }
            activity={ this.props.currentActivity }
            shortlist={ this.props.shortlist }
            discard={ this.props.discard } />
        }
      </div>
    )
  }
}
