import React from 'react';
import $ from 'jquery';
import ActivityView from './ActivityView.jsx'

export default class ShortlistView extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    let formData = {
      completed: true,
      query: {
        id: '0107e2b8-f3ab-4081-8c0d-c98b53bdc9e6'
      }
    }
    $.ajax({
      url: '/shortlist', 
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(formData),
      success: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render() {
    return (
      <div className="eight wide column">
        <h1>ShortList</h1>
        Shortlisted { this.props.shortlisted && this.props.shortlisted.length } activities.
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
