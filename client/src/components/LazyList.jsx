import React from 'react';
import LazyListEntry from './LazyListEntry.jsx'

const LazyList = ({ data }) => {
  return (
  	<div className="ui cards scroll" style={{display: '-webkit-box'}}>
	    {
	    	data &&
	    	data.map((item) => (
	    		<LazyListEntry 
	    			key={ item._id }
	    			activity={ item } />
	    	))
	    }
  	</div>
  )
};

export default LazyList;