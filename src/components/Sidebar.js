import React from 'react';
import './Sidebar.css'; // Import the CSS file for styling

const Sidebar = ({ onChartSelect }) => {
  return (
    <div className="sidebar">
      <h2>Chart Selector</h2>
      <ul>
        <li onClick={() => onChartSelect('bar')}>Bar Chart</li>
        <li onClick={() => onChartSelect('doughnut')}>Doughnut Chart</li>
        <li onClick={() => onChartSelect('line')}>Line Chart</li>
        <li onClick={() => onChartSelect('pie')}>Pie Chart</li>
      </ul>
    </div>
  );
};

export default Sidebar;
