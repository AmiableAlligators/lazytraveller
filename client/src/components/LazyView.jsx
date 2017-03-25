import React from 'react';
import { render } from 'react-dom';
import LazyList from './LazyList.jsx'

export default class LazyView extends React.Component {
  constructor(props) {
  	super(props);

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
        <div className="ui message" style={{height: '450px'}}>
          <div className="header">
            Here will be a map
          </div>
          <p>Winston will draw a map with your shortlisted items!</p>
        </div>
        <LazyList 
          data={ this.props.data } />
      </div>
    )
  }
}
