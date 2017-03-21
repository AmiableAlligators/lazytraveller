import React from 'react';

export default class FilterListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkBoxState: false,
    }
    this.onEventCheck = this.onEventCheck.bind(this);
  }

  onEventCheck (callback) {

    // need to create an obj to pass into the callback.
    
    this.setState({ checkBoxState: this.checkBoxState });
    callback()
  }  

  render () {
    return (
     <div className="FilterListEntry">
         <div className="ui checkbox">
           <input type="checkbox" name="Filter"></input>
           <label>label</label>
         </div>
     </div>
    );
  }
}