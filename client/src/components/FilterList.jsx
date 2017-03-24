import React from 'react';
import FilterListEntry from './FilterListEntry.jsx';
import GeoLocation from './../utils/geoLocation.jsx';

export default class FilterList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isFiltering: false
		}

		this.getFilterType = this.getFilterType.bind(this);
		this.showFilters = this.showFilters.bind(this);
		this.setBudget = this.setBudget.bind(this);
		this.setDuration = this.setDuration.bind(this);
		this.setLocation = this.setLocation.bind(this);
		this.getCurrentLocation = this.getCurrentLocation.bind(this);
	}

	getCurrentLocation(event) {
		let locationType = event.target.name;
		GeoLocation.getCurrentPosition((label, coords, err) => {
			this.props.updateLimits({
				[locationType]: {
					place: label,
					coords
				}
			})
		})
	}

	getFilterType(filters, type) {
		filters = filters || [];
		return filters.filter(filter => (
			filter.type === type
		));
	}

	showFilters() {
		this.setState({
			isFiltering: !this.state.isFiltering
		})
	}

	setDuration(event) {
		this.props.updateLimits({
			duration: event.target.value
		})
	}

	setBudget(event) {
		this.props.updateLimits({
			budget: event.target.value
		});
	}

	setLocation(event) {
		this.props.updateLimits({
			[event.target.name]: event.target.value
		});
	}

	render() {
		return (
			 <div className="eight wide column">
		    <div className="ui styled fluid accordion"
		    	style={{margin: '25px 0 0 0'}} >
				  <div className="title active"
				  	onClick={this.showFilters}>
				    Filters
					  <i className="dropdown icon"></i>
				  </div>
				  {
				  	this.state.isFiltering &&
					  <div className="content active">
						  <h5 className="ui top attached header">
							  Location &amp; Time
							</h5>
					  	<div className="ui attached stackable three column segment grid">
					  		<div className="column">
						  		<label>Duration (h)</label>
						  		<div className="ui input fluid">
							  		<input type="text" placeholder="Time in hours"
							  			onChange={ this.setDuration } />
							  	</div>
					  		</div>
					  		
					  		<div className="column">
					  			<label>Location</label>
      							<div className="ui right action input fluid mini">      								
								  		<input type="text" placeholder="start at..." 
								  			name="startLocation" 
								  			value={ this.props.limitsStartLocation }
								  			onChange={ this.setLocation } />
								  		<button className="ui button mini"
								  			name="startLocation"
						            onClick={ this.getCurrentLocation } >
						            Use GPS
						          </button>	
								  	</div>
      							<div className="ui right action input fluid mini">
								  		<input type="text" placeholder="end at..." 
								  			name="endLocation"
								  			onChange={ this.setLocation } />
								  		<button className="ui button mini"
								  			name="endLocation"
						            onClick={ this.getCurrentLocation } >
						            Use GPS
						          </button>
								  	</div>
					  		</div>

					  		<div className="column">
					  			<div onChange={ this.setBudget } >
							  		<label>Budget</label>
							  		<label>
							  			<input type="radio" name="budget" value="$" />
	        						$</label>
	        					<label>
							  			<input type="radio" name="budget" value="$$" />
	        						$$</label>	
	        					<label>
							  			<input type="radio" name="budget" value="$$$" />
	        						$$$</label>
	        					<label>
							  			<input type="radio" name="budget" value="$$$$" />
	        						$$$$</label>
	        				</div>
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
				  }
				 </div>
		  </div>
		)
	}
}