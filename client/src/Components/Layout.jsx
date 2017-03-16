import React from 'react';
import $ from 'jquery';

export default class Layout extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      results: null
    }
	}

  fetch() {
    $.ajax({
      url: '/items', 
      success: (data) => {
        this.setState({
          results: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

	render () {
		return (
			<div className="container">
				stuff
			</div>
		);
	}
}