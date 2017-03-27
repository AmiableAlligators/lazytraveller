import React from 'react';
import $ from 'jquery';
import uuid from 'uuid/v4';
import ImageGallery from 'react-image-gallery';
import GeoLocation from './../utils/geoLocation.jsx';
import SearchView from './SearchView.jsx';
import ShortlistView from './ShortlistView.jsx';
import LazyView from './LazyView.jsx';

export default class Layout extends React.Component {
	constructor(props) {
		super(props);

    this.state = {
      displaySearch: true,
      displayLazy: false,
      showGallery: false,
      results: null,
      currentActivity: '',
      filters: [],
      shortlist: [],
      discarded: [],
      query: '',
      budget: '',
      duration: '',
      startLocation: {
        place: ''
      },
      endLocation: {
        place: ''
      },
      galleryPhotos: [
        {
          original: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CoQBdwAAAMjKmzXHygvijg-C6orNqQKHhmdU7l_rtTbgtAtaaJ3NOitRJfNQrnxGCziPzqfg2quXDjJqCwbCliIqn1WjkZT3A33mMzeJ4Fwk7gE8zKc6Qz79YElMPMKUZGUuWw7GrCfN_Jm896jpADgsfVvWUI4vUqZbmCo5DZ-WixfpJgQHEhCOan05-xCyTn3itdnwz_XkGhRo4bArLaI0gcKTtlQddImY2flbgQ&key=AIzaSyBf-gH8u8JBDlSYspZFsrOO6x9iCFLkxjE',
        },
        {
         original: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CoQBdwAAANwxnv-7PuZTueA5ngwFVQDcL07c6_1dQICbdz4PIkiaxcjGmk3nLsNNxKw0giL0cdb8iLzd5aL0nYnc1235EHVxJY0nioRUUEO0q_N1eVQDcIpyogFO97o0piZFBUbEQih4a-T6eQ-M2f51yukos-h99766Prfz4aqurZYbHihREhC2-zu6T1DH_heMoeEuaq6uGhT_3CwETUDCbI03XoG0GRppyhLNqQ&key=AIzaSyBf-gH8u8JBDlSYspZFsrOO6x9iCFLkxjE',
        },
        {
         original: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CoQBdwAAAK56znUVcSqsyRDBKE-ioreDJfUiscHuRGyFQVMtKiq2UH_QBJZ25R6hF_hvMCMixX1gsvG84LazPijojXYlAmr2mNjm5EArMg0r3G1AB5shgE6se4m0x1dAV5eZ5hJBooJUp0O5F3DzIXvj3gsP_ghSYlVo5tw7gIfVV4DhWxaQEhC_A4bD0SWlMiZ_B4LaCtVjGhREql8BCJVebIj36kLJ7QvumMEJ9g&key=AIzaSyBf-gH8u8JBDlSYspZFsrOO6x9iCFLkxjE',
        },
        {
         original: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CoQBdwAAAOyPDNyhFXsZB1o9GCl3ZY5Lu4HcS0GS67mCytTTvHxfUS4eXBm2tDj4IEY6qQIeIAF0EkSsCw3kR2okl3FYFbhC9mbvczmm_7LaBOAF8UbYI5Qpm8MkT3-WtnUv5VyET4_SbvyfSzG8_QTYSeAE_m44VhSyqSM6tjCyCX-OHu_nEhBvmeuEsyRGbYLmpTerOTYoGhR8IoLd_bOMLE7mUBImheNaPubDBQ&key=AIzaSyBf-gH8u8JBDlSYspZFsrOO6x9iCFLkxjE',
        },
        {
         original: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CoQBdwAAAOE26J3j_Tia5yO7lxYMbgZWClF8YeCDyVxUsyuTIeYJbstgmqXMJOFFQcZXuqHdZoUMtz1phRa7Zt9DB8GZZGl92AA0xVogtTgpbbBZcLsqkwXlTAvyfXYC2HQzPZSVjIqPJZjNC70Z-MJO4I9GeRfg8ee7aJ2y5OTcxq2OHZy3EhCGtLqNqPL7sJkWGx3ChVY8GhTMnUiVWhQOZRQXY1kibthIvxEi_A&key=AIzaSyBf-gH8u8JBDlSYspZFsrOO6x9iCFLkxjE',
        },
        {
         original: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CoQBdwAAAHooG5xuO2Og1nawmKphxWaXUaUB_gjvNxOogeini9L2_NWC1lAEMZ0w7yUPQeCm5A2HPLWkbptXKfpHYhaF-6gSBCdxRyqbx-YWJd5hnfko3iZBBIQue_Mr5Lbf05q8fNl6CCpC9rNtwlNDWUa3u_ghK8OxOxzhhz75gLJ-VzZMEhADr3bozrojoYAI95t49UxUGhRyGzzdSJfGU4ge37zanpESL6-cpg&key=AIzaSyBf-gH8u8JBDlSYspZFsrOO6x9iCFLkxjE',
        },
        {
         original: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CoQBdwAAAOHfKpzdX1R9oBkrEY1Da1OyruQoQoFHX9FWRGW_UC1xFnuKBuljpCgDYkbSzWFMqMWgANoTKw9sJSUw_FV_TkMD0dAxh8tSrXtHOezEbjcVqyJQwoBOda2gIbpe2ybjgQV6NxEmExJvlfOSscRlMc-ffVqTBbYPXVIbdDgBOB18EhAN0nNC99xzKNfbURS3oAEjGhQZ562Wjip6gdcMw20Z_2D_GTnM4A&key=AIzaSyBf-gH8u8JBDlSYspZFsrOO6x9iCFLkxjE',
        },
        {
         original: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CoQBdwAAAE1gnMjGYc7X_xcpCy51tuyL7Se_fhSGFFWbcsBEdl9X3q6z4s86GM1FxFE8I71JxBkhiJ7M5EypgN5-_ljVZ1neTI9WiiOs2Pfc56QAQ7dqqc8CWgvn7hddoGB_fXTCcbcg6TrQ25EpWl5tGZzODG-SDEsGKQtlFB6sYXrDPOGKEhC42IFJmMo5ttjrF3zLBT5pGhRTmxidOWQczwHcEyA_2kIxAbomPQ&key=AIzaSyBf-gH8u8JBDlSYspZFsrOO6x9iCFLkxjE',
        },
        {
         original: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CoQBdwAAAIThFPn2nM-ngGksTsrdsbIK_6uEQxS9jBOa5HQSKwsyXISKBmx5aYuCUe8pitANr7F-AS-7ulc9chiUdWBUFebj3jQ-AHUjLXT09guVJrn6u_wQVPF2AAQcseItjqqPCKlnQ679h4j-CUhWi3VEnAzSaao20J3UOM3_7e_Qt5PEEhCKyo8XXivzzQb6SbjpaIy2GhRL7FcJeRPA1sB2LgydZD2fPUl82w&key=AIzaSyBf-gH8u8JBDlSYspZFsrOO6x9iCFLkxjE',
        },
        {
         original: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CoQBdwAAABQIRZu91gEyG5GUoZe0PX20FxMGVG_I8FD_UHkBqGawCZP5rBWhtHjqTMK4Bm46sJkcErBboEbW4_IHuy70FGvjqcjb731NDYz_AHym1IJSkVYI6wUw2Nl1cR4kEKYZ8lYrAt8M4-OtMBGJrv5wPqr8bd140dVuTUaUhfzSfV17EhBClgesgBeIZfw9TaHm9Q2RGhSxR1FcsG9RWLDitHfsLhHp7hFkHg&key=AIzaSyBf-gH8u8JBDlSYspZFsrOO6x9iCFLkxjE'
        }
      ]
    }
    this.fetch = this.fetch.bind(this);
    this.showNextActivity = this.showNextActivity.bind(this);
    this.fetchCategories = this.fetchCategories.bind(this);
    this.shortlist = this.shortlist.bind(this);
    this.discard = this.discard.bind(this);
    this.updateLimits = this.updateLimits.bind(this);
    this.sendShortlist = this.sendShortlist.bind(this);
    this.showGallery = this.showGallery.bind(this);
    this.makeGalleryPhotos = this.makeGalleryPhotos.bind(this);
	}

  componentDidMount() {
    this.fetchCategories();
  }

  fetch(query, filters) {
    let queryWithFilters = {
      query: query,
      filters: filters,
      limits: {
        budget: this.state.budget,
        duration: this.state.duration,
        location: {
          start: this.state.startLocation,
          end: this.state.endLocation
        }
      }
    }
    $.ajax({
      url: '/query',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(queryWithFilters),
      dataType: 'json',
      success: function(data) {
        GeoLocation.search(query, (coords) => {
          this.setState({
            results: data,
            currentQuery: {
              id: uuid(),
              string: query,
              coords: coords
            }
          })
          this.showNextActivity();
        })
      }.bind(this),
      error: function(err) {
        console.log('err', err);
      }
    });
  }

  showNextActivity() {
    this.setState((prevState) => {
      let activity = prevState.results.shift();
      let photos = activity ? this.makeGalleryPhotos(activity.photos) : [];
      return {
        currentActivity: activity,
        galleryPhotos: photos
      }
    });
  }

  makeGalleryPhotos(photos) {
    return photos.map(photo => {
      return {
        original: photo
      }
    });
  }

  fetchCategories() {
    $.ajax({
      url: '/categories',
      method: 'GET',
      success: (data) => {
        data = data.map(filter => {
          filter.checked = false;
          return filter;
        })
        this.setState({
          filters: data
        });
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  discard(activityId) {
    let discarded = this.state.discarded;
    discarded.push(activityId);
    this.setState({
      discarded: discarded
    })
    this.removeFromResults(activityId);
    this.showNextActivity();

    if (this.state.results.length === 0) {
      let formData = {
        user_id: 1,
        // activity_id: activityId,
        // like: true,
        query: {
          id: this.state.currentQuery.id,
          string: this.state.currentQuery.string,
          coords: this.state.currentQuery.coords
        },
        completed: this.state.results.length ? false : true,
        limits: {
          budget: this.state.budget,
          duration: this.state.duration,
          location: {
            start: this.state.startLocation,
            end: this.state.endLocation
          }
        }
      }

      this.sendShortlist(formData, (err, results) => {
        if (err) { return console.log(err) };
        if (results.status) {
          this.setState({
            displayLazy: true,
            shortlist: results.activities
          })
        }
      });
    }
  }

  sendShortlist(data, callback) {
    $.ajax({
      url: '/shortlist',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function(data) {
        callback(null, data);
      },
      error: (err) => {
        console.log('err', err);
        callback(err, null);
      }
    });
  }

  removeFromResults(activityId) {
    // remove from results, immutable-style
    let results = this.state.results.filter(result => (
      result._id !== activityId
    ));
    this.setState({
      results: results
    });
  }

  shortlist(activityId) {
    this.removeFromResults(activityId);
    this.showNextActivity();
    let formData = {
      user_id: 1,
      activity_id: activityId,
      like: true,
      query: {
        id: this.state.currentQuery.id,
        string: this.state.currentQuery.string,
        coords: this.state.currentQuery.coords
      },
      completed: this.state.results.length ? false : true,
      limits: {
        budget: this.state.budget,
        duration: this.state.duration,
        location: {
          start: this.state.startLocation,
          end: this.state.endLocation
        }
      }
    }
    this.sendShortlist(formData, (err, results) => {
      if (err) { return console.log(err) };
      if (results.status) {
        this.setState({
          displayLazy: true,
          shortlist: results.activities
        })
      }
    });
  }

  updateLimits(limits) {
    this.setState(limits);
  }

  showGallery(imageIndex) {
    let isShowing = this.state.showGallery;
    this.setState({
      showGallery: !isShowing
    }, () => {
      if (imageIndex && this._imageGallery) {
        this._imageGallery.slideToIndex(imageIndex);
      }
    });
  }

  render () {
    return (
      <div className="ui middle aligned center aligned grid container">
        <div className="sixteen wide column">
          {
            !this.state.results &&
            <SearchView sendHandler={ this.fetch }
              updateLimits={ this.updateLimits }
              startLocation={ this.state.startLocation.place }
              endLocation={ this.state.endLocation.place }
              filters={ this.state.filters } />
          }
          {
            this.state.results &&
            !this.state.displayLazy &&
            <ShortlistView activities={ this.state.results }
              currentActivity={ this.state.currentActivity }
              shortlisted={ this.state.shortlist }
              shortlist={ this.shortlist }
              discard={ this.discard }
              photos={ this.state.galleryPhotos }
              showGallery={ this.showGallery} />
          }
          {
            this.state.shortlist &&
            this.state.displayLazy &&
            <LazyView data={ this.state.shortlist }
              startLocation={ this.state.startLocation }
              endLocation={ this.state.endLocation }
              currentQuery={ this.state.currentQuery } />
          }
          {
            this.state.showGallery &&
            <div className="image-gallery-container">
              <span className="image-gallery-close"
                onClick={ this.showGallery }>
                <i className="remove icon"></i>
              </span>
              <ImageGallery ref={i => {this._imageGallery = i;} }
                items={ this.state.galleryPhotos }
                showGallery={ this.showGallery }
                showThumbnails={ false }
                showBullets={ true } />
            </div>
          }
        </div>
      </div>
    );
  }
}
