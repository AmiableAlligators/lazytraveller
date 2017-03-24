import React from 'react';
import LazyListEntry from './LazyListEntry.jsx'

const LazyList = ({ data }) => {
  return (
  	<ul>
	    {
	    	data &&
	    	data.map((item) => (
	    		<LazyListEntry 
	    			key={ item.id }
	    			activity={ item } />
	    	))
	    }
  	</ul>
  )
};

export default LazyList;