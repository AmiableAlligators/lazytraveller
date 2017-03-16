import React from 'react';
import {render} from 'react-dom';
import LazyList from './Components/LazyList.jsx'

class App extends React.Component {
  constructor(props) {
  	super(props);

  	this.state = {
  	  lazyData: [{name: "Golden Gate Bridge", img: "http://www.planetware.com/photos-large/USCA/california-san-francisco-golden-gate-bridge.jpg", type: "Price"},
  	  {name: "Palace of Fine Arts", img: "http://resources.touropia.com/gfx/d/tourist-attractions-in-san-francisco/palace_of_fine_arts.jpg", type: "Distance"},
  	  {name: "Testing", img: "https://i.ytimg.com/vi/PI-v0x6MOyg/maxresdefault.jpg", type: "Time"}]
  	}

    this.filterData = this.filterData.bind(this)

  }

  filterData(dataObject) {
    this.state.lazyData.filter()
  }

  render() {
    return(
    <div>
      <h1>Price</h1>

      <LazyList 
        lazyData={ this.state.lazyData.filter((item) => {return item.type === "Price"}) } />
      <h1>Distance</h1>
      <LazyList lazyData={this.state.lazyData.filter((item) => {return item.type === "Distance"})} />
      <h1>Time</h1>
      <LazyList lazyData={this.state.lazyData.filter((item) => {return item.type === "Time"})} />
    </div>
    )
  }

  
}

render(<App/>, document.getElementById('app'));

