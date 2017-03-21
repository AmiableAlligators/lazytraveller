import React from 'react';
import { render } from 'react-dom';
import LazyList from './LazyList.jsx'

export default class LazyView extends React.Component {
  constructor(props) {
  	super(props);

  	// this.state = {
  	//   lazyData: [{name: "Golden Gate Bridge", img: "http://www.planetware.com/photos-large/USCA/california-san-francisco-golden-gate-bridge.jpg", type: "Price"},
  	//   {name: "Palace of Fine Arts", img: "http://resources.touropia.com/gfx/d/tourist-attractions-in-san-francisco/palace_of_fine_arts.jpg", type: "Distance"},
  	//   {name: "Testing", img: "https://i.ytimg.com/vi/PI-v0x6MOyg/maxresdefault.jpg", type: "Time"}]
  	// };

    this.filterData = this.filterData.bind(this);
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
        <h3>Price</h3>
        <LazyList 
          data={ this.filterData('Price') } />
        <h3>Distance</h3>
        <LazyList 
          data={ this.filterData('Distance') } />
        <h3>Time</h3>
        <LazyList 
          data={ this.filterData('Time') } />
      </div>
    )
  }
}
