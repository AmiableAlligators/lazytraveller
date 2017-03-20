var assert = require('assert');
var expect = require('chai').expect;

import React from 'react';
import { shallow, mount } from 'enzyme';
import LazyView from '../client/src/components/LazyView.jsx';

describe('Components: ', function() {
	describe('<LazyView />', () => {
		it('should render without crashing', () => {
			const wrapper = shallow(<LazyView />);
		});
	})
});