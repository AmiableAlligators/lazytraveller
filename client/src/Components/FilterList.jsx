import React from 'react';
import FilterListEntry from './FilterListEntry.jsx'

const FilterList = (props) => (
  <div class="FilterList">
    <div class="ui toggle checkbox">
      <input type="checkbox" name="DisplayFilters"></input>
      <label>Display Filters</label>
    </div>

    <table class="ui celled table">
      <tbody>
        <tr>
          <td><FilterListEntry /></td>
          <td><FilterListEntry /></td>
          <td class="negative"><FilterListEntry /></td>
        </tr>
        <tr class="positive">
          <td>Jimmy</td>
          <td><i class="icon checkmark"></i> Approved</td>
          <td><FilterListEntry /></td>
        </tr>
        <tr>
          <td>Jamie</td>
          <td><FilterListEntry /></td>
          <td class="positive"><i class="icon close"></i> Requires call</td>
        </tr>
        <tr class="negative">
          <td>Jill</td>
          <td><FilterListEntry /></td>
          <td><FilterListEntry /></td>
        </tr>
      </tbody>
    </table>
  </div>
)

export default FilterList;