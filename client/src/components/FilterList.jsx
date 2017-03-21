import React from 'react';
import FilterListEntry from './FilterListEntry.jsx'

const FilterList = (props) => (
  <div>
    <h3>Filters: </h3>
    {
      props.filters.map(filter => (
        <FilterListEntry key={filter.id} filter={filter} />
      ))
    }
  </div>
);

export default FilterList;