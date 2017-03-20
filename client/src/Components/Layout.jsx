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
      Searching: false,
      ShortListing: false,
      Lazying: true,
    }
	}

  fetch() {
    $.ajax({
      url: '/items', 
      success: (data) => {
        this.setState({
          results: data
        })
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
            <SearchView />
          </div>
        );
      } else if (this.state.ShortListing) {
        return (
          <div className="container">
            <ShortListView />
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