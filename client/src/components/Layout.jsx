import React from 'react';
import $ from 'jquery';
import SearchView from './SearchView.jsx';
import ShortListView from './ShortListView.jsx';
import LazyView from './LazyView.jsx';

export default class Layout extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      results: null
    }
    this.fetch = this.fetch.bind(this);
	}

  fetch(query, filters) {
    let queryWithFilters = {
      query: query,
      filters: filters
    }
    $.ajax({
      url: '/query',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(queryWithFilters),
      dataType: 'json',
      success: function(data) {
        this.setState({
          results: JSON.parse(data)['results']['locations']
        })
      }.bind(this),
      error: function(err) {
        console.log('err', err);
      }
    });
  }

  shortListing(input) {
    $.ajax({
      url: 'http://localhost:3000/shortlist', 
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      success: (data) => {
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render () {
    return (
      <div className="container">
        <SearchView sendHandler={ this.fetch } />
        <ShortListView data={ this.state.results } />
      </div>
    );
  }
}
