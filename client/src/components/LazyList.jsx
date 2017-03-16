import React from 'react';
import LazyListEntry from './LazyListEntry.jsx'

const LazyList = ({ data }) => (
  <ul>
    {
    	data.map((item) => (
    		<LazyListEntry 
    			activity={ item } />
    	))
    }
  </ul>
);

export default LazyList;