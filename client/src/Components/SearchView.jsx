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
        <h1>Lazy Traveller</h1>
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