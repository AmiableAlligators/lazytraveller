import React from 'react';
import $ from 'jquery';
import uuid from 'uuid/v4';
import SearchView from './SearchView.jsx';
import ShortlistView from './ShortlistView.jsx';
import LazyView from './LazyView.jsx';

export default class Layout extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      results: null,
      filters: [],
      shortlist: [],
      discarded: [],
      query: '',
      budget: '',
      duration: '',
      startLocation: {
        place: ''
      },
      endLocation: {
        place: ''
      }
    }
    this.fetch = this.fetch.bind(this);
    this.fetchCategories = this.fetchCategories.bind(this);
    this.shortListing = this.shortListing.bind(this);
    this.discard = this.discard.bind(this);
    this.updateLimits = this.updateLimits.bind(this);
	}

  componentDidMount() {
    this.fetchCategories();
  }

  fetch(query, filters) {
    let queryWithFilters = {
      query: query,
      filters: filters,
      limits: {
        budget: this.state.budget,
        duration: this.state.duration,
        location: {
          start: this.state.startLocation,
          end: this.state.endLocation
        }
      }
    }
    $.ajax({
      url: '/query',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(queryWithFilters),
      dataType: 'json',
      success: function(data) {
        this.setState({
          results: data,
          currentQuery: {
            id: uuid(),
            string: query
          }
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

  discard(activityId) {
    let discarded = this.state.discarded;
    discarded.push(activityId);
    this.setState({
      discarded: discarded
    })
    this.removeFromResults(activityId);
  }

  removeFromResults(activityId) {
    // remove from results, immutable-style
    let results = this.state.results.filter(result => (
      result._id !== activityId
    ));
    this.setState({
      results: results
    });
  }

  shortListing(activityId) {
    // get activity from results
    let activity = this.state.results.filter(activity => (
      activity._id === activityId
    ))[0];
    // push activity into shortlist state
    this.setState((prevState) => {
      let arr = prevState.shortlist;
      arr.push(activity);
      return {
        shortlist: arr
      }
    });

    this.removeFromResults(activityId);
    let formData = {
      user_id: 1,
      activity_id: activityId,
      like: true,
      query: {
        id: this.state.currentQuery.id,
        string: this.state.currentQuery.string
      },
      completed: false,
      limits: {
        budget: this.state.budget,
        duration: this.state.duration,
        location: {
          start: this.state.startLocation,
          end: this.state.endLocation
        }
      }
    }
    $.ajax({
      url: '/shortlist', 
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(formData),
      success: (data) => {

      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  updateLimits(limits) {
    console.log(limits);
    this.setState(limits);
  }

  // temporarily making the columns beside each other for development
  render () {
    return (
      <div className="ui two column centered grid">
        <div className="ten wide column">
          <SearchView sendHandler={ this.fetch }
            updateLimits={ this.updateLimits }
            startLocation={ this.state.startLocation.place }
            endLocation={ this.state.endLocation.place }
            filters={ this.state.filters } />
          {
            this.state.results &&
            <ShortlistView data={ this.state.results } 
              shortlisted={ this.state.shortlist }
              shortlist={ this.shortListing }
              discard={ this.discard } 
              />
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
