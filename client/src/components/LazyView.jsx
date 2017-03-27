import React from 'react';
import { render } from 'react-dom';
import LazyList from './LazyList.jsx'

export default class LazyView extends React.Component {
  constructor(props) {
  	super(props);

    this.state = {
      map: ''
    }

    this.filterData = this.filterData.bind(this);
    this.placeMarkers = this.placeMarkers.bind(this);
  }

  componentDidMount() {
    this.initMap();
  }

  initMap() {
   let map = new google.maps.Map(document.getElementById('map'), {
      center: { 
        lat: this.props.currentQuery.coords.lat, 
        lng: this.props.currentQuery.coords.lon
      },
      zoom: 10
    });
    this.setState({
      map: map
    }, function() {
      this.placeMarkers(this.props.data);
    });

  }

  placeMarkers(places) {
    places.forEach((place, index) => {
      let marker = new google.maps.Marker({
        position: {
          lat: place._activity.location.latitude,
          lng: place._activity.location.longitude
        },
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 4
        },
        map: this.state.map,
        label: `${index+1}`,
        title: 'Hello world'
      })
      marker.addListener('click', function(event) {
        marker.setIcon({
          path: google.maps.SymbolPath.CIRCLE,
          scale: 6
        })
      })
    }) 
    this.directionRoutes();
  }

  directionRoutes() {
    let origin = {
      lat: this.props.data[0]._activity.location.latitude,
      lng: this.props.data[0]._activity.location.longitude
    }
    let destination = {
      lat: this.props.data[this.props.data.length-1]._activity.location.latitude,
      lng: this.props.data[this.props.data.length-1]._activity.location.longitude
    }
    let waypoints = [];
    this.props.data.forEach(point => {
      waypoints.push({location: {lat: point._activity.location.latitude, lng: point._activity.location.longitude} })
    });

    let directionsService = new google.maps.DirectionsService();

    let directionsRequest = {
      origin: this.props.startLocation.place || origin,
      destination: this.props.endLocation.place || destination,
      travelMode: 'WALKING',
      waypoints: waypoints,
      optimizeWaypoints: true
    }

    let path = directionsService.route(directionsRequest, function(directionsResult, directionsStatus) { 
      console.log(directionsResult, directionsStatus)

      let directionsRenderer = new google.maps.DirectionsRenderer({
        directions: directionsResult,
        map: this.state.map
      
      })
    }.bind(this))

  }

  filterData(type) {
    return this.state.lazyData.filter(item => (
      item.type === type
    ));
  }

  render() {
    return(
      <div>
        <h2>Lazy View</h2>
        <div className="ui message" style={{height: '450px'}}>
          <div id="map" style={{height: '100%'}}></div>
        </div>
        <LazyList 
          data={ this.props.data } />
      </div>
    )
  }
}
