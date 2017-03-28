import React from 'react';
import { render } from 'react-dom';
import LazyList from './LazyList.jsx'

export default class LazyView extends React.Component {
  constructor(props) {
  	super(props);

    this.state = {
      map: '',
      selected: '',
      markerList: [],
      initialMarker: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 4,
        strokeColor: 'red',

      },
      selectedMarker: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 8,
        fillColor: 'white',
        fillOpacity: 1.0,
        strokeColor: '#74C7E3',
      }
    }

    this.filterData = this.filterData.bind(this);
    this.placeMarkers = this.placeMarkers.bind(this);
    this.selectionHandler = this.selectionHandler.bind(this);
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
    let markerArray = [];
    places.forEach((place, index) => {
      let marker = new google.maps.Marker({
        position: {
          lat: place._activity.location.latitude,
          lng: place._activity.location.longitude
        },
        icon: this.state.initialMarker,
        map: this.state.map,
        label: {
          text: `${index+1}`,
          fontSize: '22px',
        },
        title: 'Hello world',
      })

      let context = this;

      marker.addListener('click', function(event) {
        if (context.state.selected === '') {
          context.setState({ selected: this.label.text });
        } else {
          let state = context.state
          state.markerList[state.selected - 1].setIcon(context.state.initialMarker);
          context.setState({ selected: this.label.text });
        }
        marker.setIcon(context.state.selectedMarker);
      })
      markerArray.push(marker);
    })
    this.setState({ markerList: markerArray });
    this.directionRoutes();
  }

  selectionHandler(selectionId) {
    if (this.state.selected === '') {
      this.setState({ selected: selectionId });
    } else {
      this.state.markerList[this.state.selected - 1].setIcon(this.state.initialMarker);
      this.setState({ selected: selectionId });
    }
    this.state.markerList[selectionId - 1].setIcon(this.state.selectedMarker);
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
      optimizeWaypoints: false
    }

    let path = directionsService.route(directionsRequest, function(directionsResult, directionsStatus) { 

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
      <div style={{paddingTop: '30px'}}>
        <div className="ui message" style={{height: '450px'}}>
          <div id="map" style={{height: '100%'}}></div>
        </div>
        <LazyList
          data={ this.props.data }
          state={ this.state }
          selector = { this.selectionHandler }/>
      </div>
    )
  }
}
