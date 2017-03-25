import React from 'react';

const LazyListEntry = ({ activity }) => (
  	<div className="card" >
	    <div className="image">
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
	  </div>
);

export default LazyListEntry;