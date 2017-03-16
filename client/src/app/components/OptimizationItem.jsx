import React from 'react';

const OptimizationItem = ({optimizationItem}) => (
  <li>
    <img src={optimizationItem.img} />
    <div>{optimizationItem.name}</div>
  </li>
);

export default OptimizationItem;