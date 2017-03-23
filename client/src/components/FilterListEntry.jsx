import React from 'react';

export default class FilterListEntry extends React.Component {
  constructor(props) {
    super(props);
   
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.updateFilter(event.target.value);
  }  

  render() {
    return (
      <label className="column">
        <input type="checkbox" 
          value={ this.props.filter._id }
          checked={ this.props.isChecked }
          onClick={ this.handleClick } />
          { this.props.filter.name }
      </label>
    );
  }
}