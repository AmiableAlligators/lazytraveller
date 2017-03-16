import React from 'react';
import { Router, browserHistory, IndexRoute, Route } from 'react-router';
import Layout from './Layout.jsx';
import SearchView from './SearchView.jsx';

export default class AppRouter extends React.Component {
	constructor(props) {
		super(props);
	}

	render () {
    return (
			<Router history={ browserHistory }>
				<Route path="/" component={ Layout }>
					<IndexRoute component={ SearchView } />
				</Route>
			</Router>
    );
  }
}
    // <div>
    //   <Layout />
    //   <SearchView />
    // </div>
