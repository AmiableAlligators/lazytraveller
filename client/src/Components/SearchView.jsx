import React from 'react';
import SearchBar from './SearchBar.jsx'
import FilterList from './FilterList.jsx'

export default class SearchView extends React.Component {
	constructor(props) {
		super(props);
	}

	render () {
		return (
			<div className="appNav">
				<div>
					<SearchBar />
				</div>
				<div>
					<FilterList />
				</div>
			</div>
		);
	}
}