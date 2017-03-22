import React from 'react';
import SearchBar from './SearchBar.jsx'
import FilterList from './FilterList.jsx'

export default class SearchView extends React.Component {
  constructor(props) {
    super(props);

    this.tmp = [
      {
        id: 1,
        name: 'City Activities'
      },
      {
        id: 2,
        name: 'Outdoor Activities'
      }
    ];

    this.state = {
      filters: [],
      query: null,
    }
    this.submitHandler = this.submitHandler.bind(this);
    this.stateHandler = this.stateHandler.bind(this);
  }

  submitHandler() {
    this.props.sendHandler(this.state.query, this.state.filters);
  }

  stateHandler(stateObj) {
    this.setState(stateObj);
  }


  render () {
    return (
      <div className="appNav">
        <h1>Lazy Traveller</h1>
        <div>
          <SearchBar stateHandler={ this.stateHandler } 
            submitHandler={ this.submitHandler } />
        </div>
        <div>
          <FilterList filters={this.tmp} />
        </div>
      </div>
    );
  }
}