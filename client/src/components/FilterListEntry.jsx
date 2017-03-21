import React from 'react';

export default class FilterListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({ checked: event.target.checked });
  }  

  render() {
    return (
      <label>
        <input type="checkbox" 
          name={this.props.filter.id} 
          value={this.props.filter.id}
          checked={this.state.checked}
          onClick={this.handleClick} />
          {this.props.filter.name}
      </label>
    );
  }
}