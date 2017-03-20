var assert = require('assert');
var expect = require('chai').expect;

import React from 'react';
import { shallow, mount } from 'enzyme';
import ShortlistView from '../client/src/components/ShortlistView.jsx';

describe('Components: ', function() {
	describe('<ShortlistView />', () => {
		it('should render without crashing', () => {
			const wrapper = shallow(<ShortlistView />);
		});
	})
});