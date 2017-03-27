import React from 'react';

const LazyListEntry = ({ activity, index, state, selector }) => {
	
  return(	<div className="card" onClick={ function() { selector(index) } }>
	    <div className="image">
	    	<a className="ui left corner label">
	    		<i className="heart icon">{ index }</i>
	    	</a>
	      <img src={ activity.image } />
	    </div>
	    <div className="content">
	      <a className="header">{ activity.name }</a>
	      <div className="meta">
	        <span className="">Rating: { activity.rating }</span>
	        <span className="">{ activity.price }</span>
	      </div>
	      <div className="description">
	        { activity.description }
	      </div>
	    </div>
	  </div>)
};

export default LazyListEntry;