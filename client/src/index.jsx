import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './Components/AppRouter.jsx'

window.onload = () => {	
	ReactDOM.render(<AppRouter />, document.getElementById('app'));
};