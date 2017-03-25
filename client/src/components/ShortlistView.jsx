import React from 'react';
import ActivityView from './ActivityView.jsx'

export default class ShortlistView extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="eight wide column">
        <h1>ShortList</h1>
        Shortlisted { this.props.shortlisted.length } activities.
        <button onClick={ this.handleClick } >Done shortlisting</button>
        {
          this.props.data &&
          this.props.data.map(item => (
            <ActivityView
              key= { item._id }
              activity={ item }
              shortlist={ this.props.shortlist }
              discard={ this.props.discard } />
          ))
        }
      </div>
    )
  }
}
