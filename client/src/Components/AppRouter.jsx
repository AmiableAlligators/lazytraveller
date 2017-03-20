import React from 'react';
import { Router, IndexRoute, Route } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import Layout from './Layout.jsx';
import SearchView from './SearchView.jsx';

const history = createHistory();

export default class AppRouter extends React.Component {
	constructor(props) {
		super(props);
	}

	render () {
    return (
			<Router history={ history }>
				<Route exact path="/" component={ Layout }>
				</Route>
			</Router>
    );
  }
}

				// <IndexRoute component={ SearchView } />

