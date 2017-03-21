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
      <div className="SearchBar">
        <input type="text" 
          name="searchQuery"
          value={ this.state.searchQuery } 
          onChange={ this.handleChange } />
        <button name="submit" 
          className="submit" 
          onClick={ this.submission }>
        submit</button>
      </div>
    );
  }
}