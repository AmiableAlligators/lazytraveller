var assert = require('assert');
var expect = require('chai').expect;

import React from 'react';
import { shallow, mount } from 'enzyme';
import SearchBar from '../client/src/components/SearchBar.jsx';

describe('Components: ', function() {
	describe('<SearchBar />', () => {
		it('should render without crashing', () => {
			const wrapper = shallow(<SearchBar />);
		});
	})
});