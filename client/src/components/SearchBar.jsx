import React from 'react';
import $ from 'jquery';

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
    this.getCurrentPosition = this.getCurrentPosition.bind(this);
    this.reverseGeocode = this.reverseGeocode.bind(this);
  }

  componentDidMount() {
    if (navigator.geolocation) {
      this.setState({ isGeolocationSupported: true })
    }
  }

  getCurrentPosition() {
    if (!this.state.isGeolocationSupported) {
      return console.log('Your browser does not support geolocation.');
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        this.reverseGeocode(position.coords.latitude, position.coords.longitude)
      },
      error => {
        console.log('Error occurred. Error code: ', error.code);
      });
  }

  reverseGeocode(lat, lon) {
    $.ajax({
      url: `https://search.mapzen.com/v1/reverse?api_key=${process.env.MAPZEN_KEY}&point.lat=${lat}&point.lon=${lon}&size=1&sources=osm`,
      method: 'GET',
      success: function(results) {
        this.setState(prevState => {
          this.props.updateQuery(results.features[0].properties.label);
          return {
            currentPosition: {
              latitude: lat,
              longitude: lon,
              location: results.features[0].properties.label
            },
            searchQuery: results.features[0].properties.label
          }
        })
      }.bind(this)
    })
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
      <div className="ui left action input">
        {
          this.state.isGeolocationSupported &&
          <button className="ui button"
            onClick={this.getCurrentPosition} >
            Use GPS
          </button>
        }
        <input type="text" 
          name="searchQuery"
          value={ this.state.searchQuery } 
          onChange={ this.handleChange } 
          placeholder="Enter location or use GPS" />
        <button name="submit" 
          style={{'display': 'block'}}
          className="ui primary button"
          onClick={ this.submission }>
          Search</button>
      </div>
    );
  }
}