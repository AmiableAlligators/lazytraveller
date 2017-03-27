import React from 'react';
import LazyListEntry from './LazyListEntry.jsx'

const LazyList = ({ data, state, selector }) => {
  return (
  	<div className="ui cards scroll" style={{display: '-webkit-box'}}>
	    {
	    	data &&
	    	data.map((item, index) => (
	    		<LazyListEntry 
	    			key={ item._id }
	    			index={ index + 1 }
	    			activity={ item._activity } 
            state= { state } 
            selector={ selector } />
	    	))
	    }
  	</div>
  )
};

export default LazyList;