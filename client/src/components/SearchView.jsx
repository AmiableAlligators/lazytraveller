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
      query: '',
    }
    this.submitHandler = this.submitHandler.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
  }

  submitHandler(query) {
    this.props.sendHandler(this.state.query, this.state.filters);
  }

  updateQuery(query) {
    this.setState({
      query: query
    });
  }

  render () {
    return (
      <div className="eight wide column">
        <h1 style={{'textAlign': 'center'}}>Lazy Traveller</h1>
        <div>
          <SearchBar updateQuery={ this.updateQuery }
            submitHandler={ this.submitHandler } />
        </div>
        <div>
          <FilterList filters={this.tmp} />
        </div>
      </div>
    );
  }
}