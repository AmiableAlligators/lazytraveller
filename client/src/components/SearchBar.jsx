import React from 'react';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
    }
    this.submission = this.submission.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  submission () {
    this.props.submitHandler();
  }

  handleChange(event) {
    this.setState({
      searchQuery: event.target.value,
    });

    this.props.stateHandler({ query: event.target.value });
  }

  render () {
    return (
      <div className="ui left action input">
        <button className="ui button">
          Use GPS
        </button>
        <input type="text" 
          name="searchQuery"
          value={ this.state.searchQuery } 
          onChange={ this.handleChange } 
          placeholder="Enter location or use GPS" />
        <button name="submit" 
          style={{'display': 'block'}}
          className="ui primary button"
          onClick={ this.submission }>
          Search</button>
      </div>
    );
  }
}