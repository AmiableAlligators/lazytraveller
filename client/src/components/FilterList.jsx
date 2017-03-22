import React from 'react';
import FilterListEntry from './FilterListEntry.jsx'

const FilterList = (props) => (
  <div className="eight wide column">
    <div className="ui styled fluid accordion">
		  <div className="title active">
		    Filters
		    <i className="dropdown icon"></i>
		  </div>
		  <div className="content active">
			  <h5 className="ui top attached header">
				  Location &amp; Time
				</h5>
		  	<div className="ui attached segment" style={{overflow: 'hidden'}}>
		  		<div style={{display: 'block', width: '30%', float: 'left', overflow: 'hidden'}}>
			  		<label >Duration</label>
			  		<input type="text" placeholder="duration" />
		  		</div>
		  		
		  		<div style={{display: 'block', width: '30%', float: 'left', overflow: 'hidden'}}>
		  			<label>Location</label>
			  		<input type="text" placeholder="start" />
			  		<input type="text" placeholder="end" />
		  		</div>
		  		<div style={{display: 'block', width: '30%', float: 'left', overflow: 'hidden'}}>
			  		<label>Budget</label>
			  		<input type="text" placeholder="budget" />
		  		</div>
		  	</div>
		  	<h5 className="ui top attached header">
		  		<input type="checkbox" />
				  City Activities
				</h5>
		  	<div className="ui attached segment">
		  		{
			      props.filters.map(filter => (
			        <FilterListEntry key={filter.id} filter={filter} />
			      ))
			    }
		  	</div>
		  	<h5 className="ui top attached header">
		  		<input type="checkbox" />
				  Outdoor Activities
				</h5>
		  	<div className="ui attached segment">
		  		fjkdlsfs
		  	</div>
		    <p className="transition"></p>
		  </div>
		 </div>
  </div>
);

export default FilterList;