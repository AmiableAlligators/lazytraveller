import React from 'react';
import $ from 'jquery';
import SearchView from './SearchView.jsx';
import ShortlistView from './ShortlistView.jsx';
import LazyView from './LazyView.jsx';

export default class Layout extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      results: null,
      filters: []
    }
    this.fetch = this.fetch.bind(this);
    this.fetchCategories = this.fetchCategories.bind(this);
	}

  componentDidMount() {
    this.fetchCategories();
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
          results: data
        })
      }.bind(this),
      error: function(err) {
        console.log('err', err);
      }
    });
  }

  fetchCategories() {
    $.ajax({
      url: '/categories', 
      method: 'GET',
      success: (data) => {
        data = data.map(filter => {
          filter.checked = false;
          return filter;
        })
        this.setState({
          filters: data
        });
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  shortListing(input) {
    $.ajax({
      url: '/shortlist', 
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
      <div className="ui two column centered grid">
        <div className="ten wide column">
          <SearchView sendHandler={ this.fetch }
            filters={ this.state.filters } />
          <ShortlistView data={ this.state.results } />
        </div>
      </div>
    );
  }
}
