import React from 'react';
import $ from 'jquery';
import ActivityView from './ActivityView.jsx'

export default class ShortlistView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="sixteen wide column">
        <h1>ShortList</h1>
        Shortlisted { this.props.shortlisted > 0 ? this.props.shortlisted : '' } activities.
        {
          this.props.currentActivity &&
          <ActivityView
            key={ this.props.currentActivity._id }
            activity={ this.props.currentActivity }
            photos={ this.props.photos }
            shortlist={ this.props.shortlist }
            discard={ this.props.discard }
            showGallery={ this.props.showGallery } />
        }
      </div>
    )
  }
}
