# Testing

## Requirements

1. [Mocha - Test runner](https://mochajs.org/)
2. [Chai - Assertions](http://chaijs.com/)

```javascript
expect(foo).to.be.a('string');
expect(foo).to.equal('bar');
expect(foo).to.have.lengthOf(3);
expect(tea).to.have.property('flavors').with.lengthOf(3);
```

3. [Enzyme - React Component Testing](https://github.com/airbnb/enzyme)

## Running Tests
`npm run test`

Webpack will bundle and transpile code. Mocha will run all the tests that have been defined.

### Configuration
Any test related configuration can be found in webpack.config-test.js.

## File Naming Convention & Folder Structure
Tests are arranged based on their sections. Files are named based on the parent section's component name and suffixed with .test.js.

/test
- SearchView.test.js
- ShortlistView.test.js
- LazyView.test.js
- /server
-- server.test.js

## How to Test?
1. Import necessary dependencies as required by your component
2. Import your component from '.../src/components...'
3. Write tests under the appropriate Describe sections

### Sample Tests
These are common tests that you might want to write for your components.

1. Smoke Test, testing if a component renders
```javascript
it('should render without crashing', () => {
	const wrapper = shallow(<ShortlistView />);
});
```

2. If an element exists
```javascript
it('should have an image to display the gravatar', function () {
  const wrapper = shallow(<Avatar/>);
  expect(wrapper.find('img')).to.have.length(1);
});
```

3. Testing for certain props
```javascript
it('should have props for email and src', function () {
  const wrapper = shallow(<Avatar/>);
  expect(wrapper.props().email).to.be.defined;
  expect(wrapper.props().src).to.be.defined;
});
```

4. Checking if a component contains another component
```javascript
it('contains an <Avatar/> component', function () {
  const wrapper = mount(<Gravatar/>);
  expect(wrapper.find(Avatar)).to.have.length(1);
});
```

5. Checking if something happens after a click
```javascript
it('should update the src state on clicking fetch', function () {
  const wrapper = mount(<Gravatar/>);
  wrapper.setState({ email: 'hello@ifelse.io' });
  wrapper.find('button').simulate('click');
  expect(wrapper.state('email')).to.equal('hello@ifelse.io');
});
```





