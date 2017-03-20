# Testing

## Requirements

1. Mocha - Test runner
2. Chai - Assertions
3. Enzyme - React Component Testing

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

1. Smoke Test
