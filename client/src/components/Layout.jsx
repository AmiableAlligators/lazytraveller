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
      filters: [],
      shortlist: []
    }
    this.fetch = this.fetch.bind(this);
    this.fetchCategories = this.fetchCategories.bind(this);
    this.shortListing = this.shortListing.bind(this);
	}

  componentDidMount() {
    this.fetchCategories();
  }

  fetch(query, filters, limits) {
    let queryWithFilters = {
      query: query,
      filters: filters,
      limits: limits
    }
    $.ajax({
      url: '/query',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(queryWithFilters),
      dataType: 'json',
      success: function(data) {
        // Temporarily assign an ID to the activity
        // TODO Remove after activities have been saved to db
        let modifiedData = data.map(activity => {
          activity.id = Math.random() * 1000;
          return activity;
        });
        this.setState({
          results: modifiedData
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
    console.log(input);
    // get activity from results
    let activity = this.state.results.filter(activity => (
      activity.id === input
    ))[0];
    // push activity into shortlist state
    this.setState((prevState) => {
      let arr = prevState.shortlist;
      arr.push(activity);
      return {
        shortlist: arr
      }
    });
    // $.ajax({
    //   url: '/shortlist', 
    //   method: 'POST',
    //   headers: { 'Content-type': 'application/json' },
    //   success: (data) => {
    //   },
    //   error: (err) => {
    //     console.log('err', err);
    //   }
    // });
  }

  // temporarily making the columns beside each other for development
  render () {
    return (
      <div className="ui two column centered grid">
        <div className="ten wide column">
          <SearchView sendHandler={ this.fetch }
            filters={ this.state.filters } />
          {
            this.state.results &&
            <ShortlistView data={ this.state.results } 
              shortlist={ this.shortListing } />
          }
        </div>
        <div className="six wide column">
          {
            this.state.shortlist &&
            <LazyView data={ this.state.shortlist } />
          }
        </div>
      </div>
    );
  }
}
