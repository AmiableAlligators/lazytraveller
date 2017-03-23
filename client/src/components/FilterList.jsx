import React from 'react';
import FilterListEntry from './FilterListEntry.jsx'

export default class FilterList extends React.Component {
	constructor(props) {
		super(props);

		this.getFilterType = this.getFilterType.bind(this);
	}

	getFilterType(filters, type) {
		filters = filters || [];
		return filters.filter(filter => (
			filter.type === type
		));
	}

	render() {
		return (
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
				  	<div className="ui attached stackable three column segment grid">
				  		<div className="column">
					  		<label>Duration</label>
					  		<input type="text" placeholder="duration" />
				  		</div>
				  		
				  		<div className="column">
				  			<label>Location</label>
					  		<input type="text" placeholder="start" />
					  		<input type="text" placeholder="end" />
				  		</div>
				  		<div className="column">
					  		<label>Budget</label>
					  		<input type="text" placeholder="budget" />
				  		</div>
				  	</div>

				  	<h5 className="ui top attached header">
				  		<label>
				  			<input type="checkbox" value="city"
				  				onClick={ this.props.updateFilter } />
						  	City Activities
						  </label>
						</h5>
				  	<div className="ui attached stackable three column segment grid">
				  		{	
				  			this.props.filters &&
					      this.getFilterType(this.props.filters, 'city').map(filter => (
					        <FilterListEntry 
					        	isChecked={ filter.checked }
					        	key={ filter._id } 
					        	filter={ filter } 
					        	updateFilter={ this.props.updateFilter } />
					      ))
					    }
				  	</div>
				  	<h5 className="ui top attached header">
				  		<label>
					  		<input type="checkbox" value="outdoor"
					  			onClick={ this.props.updateFilter } />
						  	Outdoor Activities
						  </label>
						</h5>
				  	<div className="ui attached stackable three column segment grid">
				  		{	
				  			this.props.filters &&
					      this.getFilterType(this.props.filters, 'outdoor').map(filter => (
					        <FilterListEntry 
					        	isChecked={ filter.checked }
					        	key={ filter._id } 
					        	filter={ filter }
					        	updateFilter={ this.props.updateFilter } />
					      ))
					    }
				  	</div>
				  </div>
				 </div>
		  </div>
		)
	}
}