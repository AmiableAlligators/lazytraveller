import React from 'react';
import $ from 'jquery';
import GeoLocation from './../utils/geoLocation.jsx';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      isGeolocationSupported: false,
      currentPosition: {
        latitude: null,
        longitude: null,
        location: ''
      }
    }
    this.submission = this.submission.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getCurrentLocation = this.getCurrentLocation.bind(this);
  }

  componentDidMount() {
    GeoLocation.isSupported((isSupported, errorMessage) => {
      this.setState({
        isGeolocationSupported: isSupported,
        geolocationSupportError: errorMessage
      });
    });
  }

  getCurrentLocation() {
    GeoLocation.getCurrentPosition(function (label, coords, err) {
      this.setState(prevState => {
        this.props.updateQuery(label);
        return {
          currentPosition: {
            latitude: coords.lat,
            longitude: coords.lon,
            location: label
          },
          searchQuery: label
        }
      })
    }.bind(this));
  }

  submission () {
    this.props.submitHandler(this.state.searchQuery);
  }

  handleChange(event) {
    this.setState({
      searchQuery: event.target.value
    });
    this.props.updateQuery(event.target.value);
  }

  render () {
    return (
      <div className="ui left action input fluid">
        {
          this.state.isGeolocationSupported &&
          <button className="ui button"
            onClick={ this.getCurrentLocation } >
            Use GPS
          </button>
        }
        <input type="text" 
          name="searchQuery"
          value={ this.state.searchQuery } 
          onChange={ this.handleChange } 
          placeholder="Enter location or use GPS" />
        <button name="submit" 
          className="ui primary button"
          onClick={ this.submission }>
          Search</button>
      </div>
    );
  }
}