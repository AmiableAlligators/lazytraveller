import React from 'react';

const LazyListEntry = ({ activity }) => (
  <li>
    <img src={ activity.img } />
    <div>{ activity.name }</div>
  </li>
);

export default LazyListEntry;