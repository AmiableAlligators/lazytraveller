import React from 'react';
import $ from 'jquery';
import uuid from 'uuid/v4';
import GeoLocation from './../utils/geoLocation.jsx';
import SearchView from './SearchView.jsx';
import ShortlistView from './ShortlistView.jsx';
import LazyView from './LazyView.jsx';

export default class Layout extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      displaySearch: true,
      displayLazy: false,
      results: null,
      currentActivity: '',
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
    this.showNextActivity = this.showNextActivity.bind(this);
    this.fetchCategories = this.fetchCategories.bind(this);
    this.shortlist = this.shortlist.bind(this);
    this.discard = this.discard.bind(this);
    this.updateLimits = this.updateLimits.bind(this);
    this.sendShortlist = this.sendShortlist.bind(this);
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
        GeoLocation.search(query, (coords) => {
          this.setState({
            results: data.splice(0, 5),
            currentQuery: {
              id: uuid(),
              string: query,
              coords: coords
            }
          })
          this.showNextActivity();
        })
      }.bind(this),
      error: function(err) {
        console.log('err', err);
      }
    });
  }

  showNextActivity() {
    this.setState((prevState) => {
      let activity = prevState.results.shift();
      return {
        currentActivity: activity
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
    this.showNextActivity();

    if (this.state.results.length === 0) {
      let formData = {
        user_id: 1,
        // activity_id: activityId,
        // like: true,
        query: {
          id: this.state.currentQuery.id,
          string: this.state.currentQuery.string
        },
        completed: this.state.results.length ? false : true,
        limits: {
          budget: this.state.budget,
          duration: this.state.duration,
          location: {
            start: this.state.startLocation,
            end: this.state.endLocation
          }
        }
      }

      this.sendShortlist(formData, (err, results) => {
        if (err) { return console.log(err) };
        if (results.status) {
          this.setState({
            displayLazy: true,
            shortlist: results.activities
          })
        } 
      });
    }
  }

  sendShortlist(data, callback) {
    $.ajax({
      url: '/shortlist', 
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function(data) {
        callback(null, data);
      },
      error: (err) => {
        console.log('err', err);
        callback(err, null);
      }
    });
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

  shortlist(activityId) {
    this.removeFromResults(activityId);
    this.showNextActivity();
    let formData = {
      user_id: 1,
      activity_id: activityId,
      like: true,
      query: {
        id: this.state.currentQuery.id,
        string: this.state.currentQuery.string
      },
      completed: this.state.results.length ? false : true,
      limits: {
        budget: this.state.budget,
        duration: this.state.duration,
        location: {
          start: this.state.startLocation,
          end: this.state.endLocation
        }
      }
    }
    this.sendShortlist(formData, (err, results) => {
      if (err) { return console.log(err) };
      if (results.status) {
        this.setState({
          displayLazy: true,
          shortlist: results.activities
        })
      } 
    });
  }

  updateLimits(limits) {
    this.setState(limits);
  }

  render () {
    return (
      <div className="ui middle aligned center aligned grid container">
        <div className="sixteen wide column">
          {
            !this.state.results &&
            <SearchView sendHandler={ this.fetch }
              updateLimits={ this.updateLimits }
              startLocation={ this.state.startLocation.place }
              endLocation={ this.state.endLocation.place }
              filters={ this.state.filters } />
          }
          {
            this.state.results &&
            !this.state.displayLazy &&
            <ShortlistView activities={ this.state.results } 
              currentActivity={ this.state.currentActivity }
              shortlisted={ this.state.shortlist }
              shortlist={ this.shortlist }
              discard={ this.discard } />
          }
          {
            this.state.shortlist &&
            this.state.displayLazy &&
            <LazyView data={ this.state.shortlist }
              currentQuery={ this.state.currentQuery } />
          }
        </div>
      </div>
    );
  }
}
