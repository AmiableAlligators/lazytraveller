import React from 'react';
import $ from 'jquery';
import SearchView from './SearchView.jsx';
import ShortListView from './ShortListView.jsx';
import LazyView from './LazyView.jsx';

export default class Layout extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      results: null,
      Searching: true,
      ShortListing: false,
      Lazying: false,
    }
	}

  fetch(query, filters) {
    console.log('fetching', query, filters);
    // $.ajax({
    //   url: '/items', 
    //   success: (data) => {
    //     this.setState({
    //       results: data
    //     })
    //   },
    //   error: (err) => {
    //     console.log('err', err);
    //   }
    // });
  }

  shortListing(input) {
    $.ajax({
      url: 'http://localhost:3000/shortlist', 
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      success: (data) => {
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  // pathing (props) {
  //   console.log(this);
  //   if (props.Searching) {
  //     <SearchView />
  //   } else if (this.state.ShortListing) {
  //     <ShortListView />
  //   } else if (this.state.Lazying) {
  //     <LazyView />
  //   }
  // }

  render () {
      if (this.state.Searching) {
        return (
          <div className="container">
            <SearchView sendHandler={ this.fetch }/>
          </div>
        );
      } else if (this.state.ShortListing) {
        return (
          <div className="container">
            <ShortListView shortListing={ this.shortListing } />
          </div>
        );
      } else if (this.state.Lazying) {
        return (
          <div className="container">
            <LazyView />
          </div>
        );
      }
  }
}
        // {this.props.children}