import React from 'react';
import FilterListEntry from './FilterListEntry.jsx'

const FilterList = (props) => (
  <div className="FilterList">
    <div className="ui toggle checkbox">
      <input type="checkbox" name="DisplayFilters"></input>
      <label>Display Filters</label>
    </div>

    <table className="ui celled table">
      <tbody>
        <tr>
          <td><FilterListEntry /></td>
          <td><FilterListEntry /></td>
          <td className="negative"><FilterListEntry /></td>
        </tr>
        <tr className="positive">
          <td>Jimmy</td>
          <td><i className="icon checkmark"></i> Approved</td>
          <td><FilterListEntry /></td>
        </tr>
        <tr>
          <td>Jamie</td>
          <td><FilterListEntry /></td>
          <td className="positive"><i className="icon close"></i> Requires call</td>
        </tr>
        <tr className="negative">
          <td>Jill</td>
          <td><FilterListEntry /></td>
          <td><FilterListEntry /></td>
        </tr>
      </tbody>
    </table>
  </div>
)

export default FilterList;