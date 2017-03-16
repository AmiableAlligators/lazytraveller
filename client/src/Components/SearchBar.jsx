import React from 'react';

const SearchBar = (props) => (
  <div className="SearchBar">
      <form action="#" id="send" method="post">
        <input type="text" name="query" id="query"/>
        <input type="submit" name="submit" className="submit"/>
      </form>
  </div>
)

export default SearchBar;