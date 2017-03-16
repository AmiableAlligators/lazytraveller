import React from 'react';
import OptimizationItem from './OptimizationItem.jsx'

const OptimizationList = ({optimizationData}) => (
  <ul>
    {optimizationData.map((item) => 
    <OptimizationItem optimizationItem = {item} />
    )}
  </ul>
);

export default OptimizationList;