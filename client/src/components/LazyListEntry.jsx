import React from 'react';

const LazyListEntry = ({ activity, index, state, selector }) => {
	
  return(	
  	<div className={  state.selected === index ? 'card selected' : 'card'  }
  		onClick={ function() { selector(index) } }>
	    <div className="image">
	    	<a className="ui left corner label">
	    		<i className="heart icon">{ index }</i>
	    	</a>
	      <img src={ activity.image } />
	    </div>
	    <div className="content">
	      <a className="header">{ activity.name }</a>
	      <p>{ `${activity.address.street} ${activity.address.city}, ${activity.address.state} ${activity.address.postal_code}` }</p>
	      <div className="meta">
	        <span className="">Rating: { activity.rating }</span>
	        <span className="">{ activity.price }</span>
	      </div>
	    </div>
	  </div>
	)
};

export default LazyListEntry;