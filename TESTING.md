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

## General Component Best Practices

1. Always declare PropTypes and/or defaultProps on Components
```javascript
// propTypes
Component.propTypes = {
  name: React.PropTypes.string
}
// defaultProps
CustomButton.defaultProps = {
  color: 'blue'
};
```
[More on type checking with propTypes](https://facebook.github.io/react/docs/typechecking-with-proptypes.html)

2. Dealing with Async State Changes
```javascript
this.setState(prevState => ({ expanded: !prevState.expanded }))
```

3. Use Short-Circuit Evaluation for Conditional Rendering
```javascript
{
  isTrue && 
    <p>True!</p>
}
```

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

[Great resource on testing React Components with Mocha & Enzyme](https://medium.freecodecamp.com/react-unit-testing-with-mocha-and-enzyme-77d18b6875cb#.xos1h93qw)

## What to Test?
Here is a list of possible tests for React Components

1. It must render
    * Make sure the component renders without error. This verifies there are no JSX syntax errors, that all variables are defined, etc. This could be as simple as verifying that the rendered output is not null.

2. Test the output
    * Check that the component renders the correct thing. Given a set of props, what output is expected?

3. Test the states
    * Every conditional should be accounted for. If the classNames are conditional (e.g. enabled/disabled, success/warning/error, etc.), make sure to test that the className-deciding logic is working well. Likewise for conditionally-rendered children: if the Logout button is only visible when the user is logged in, for instance, make sure to test for that.

4. Test the events
    * If the component can be interacted with, e.g. an input or button with an onClick or onChange or onAnything, test that the events work as expected and call the specified functions with the correct arguments, including binding this, if it matters.

5. Test the edge cases
    * Anything that operates on an array could have boundary cases — an empty array, an array with 1 element, a paginated list that should truncate at 25 items, and so on. Try out every edge case you can think of, and make sure they all work correctly.

#### Testing the Server (NodeJS, Express)
1. Start and Stop the server for each Unit Test
Aside from testing a complex scenario, we want to always test a clean server without any residue from the previous unit tests. Otherwise our tests will pass or fail depending on the order, which is an extremely undesirable and flaky testing approach. Starting and stopping the server for each unit test makes them order-independent.



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

it('renders items', () => {        
  const props = {items: { id: 1', title: 'foo'}};
  const list = shallow(<Release {...props} />);
  expect(list.find('.item').length).toBe(1);
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

it('toggles the completed status of an item when clicking', () => {
    const app = mount(<Root />);
    const item = app.find('#item-1');
    item.simulate('click');
    expect(app.find('.completed').length).toBe(1);
    item.simulate('click');
    expect(app.find('.completed').length).toBe(0);
});
```

6. Testing for State
```javascript
it('should start with an empty list', () => {
  const wrapper = shallow(<BeerListContainer/>);
  expect(wrapper.state('beers')).to.equal([]);
});
```

7. Checking if a HTML element has a specific class
```javascript
expect(<Component />).to.have.className('my-class');
```





